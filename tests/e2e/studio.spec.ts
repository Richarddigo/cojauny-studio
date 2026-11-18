import { test, expect, type Page } from "@playwright/test";

const consentKey = "cojauny-studio-consent";
async function analyticsFixture(page: Page) {
    const captured = { scripts: 0, events: 0 };
    await page.route("**/__studio-analytics-fixture", async (route) => {
        captured.events++;
        await route.fulfill({ status: 204 });
    });
    await page.route("**/_vercel/insights/**", async (route) => {
        if (!route.request().url().includes("/script.js"))
            throw new Error(
                "Unexpected analytics endpoint; no live network is permitted",
            );
        captured.scripts++;
        await route.fulfill({
            contentType: "text/javascript",
            body: `(() => {
          let filter = null;
          const emit = async () => { const event = { type: 'pageview', url: location.href }; if (filter && filter(event) === null) return false; await fetch('/__studio-analytics-fixture', {method:'POST',body:JSON.stringify(event)}); return true; };
          const queue = window.vaq || [];
          window.va = (type, value) => { if (type === 'beforeSend') filter = value; else if (type === 'pageview' || type === 'event') void emit(); };
          queue.forEach(args => window.va(...args)); window.vaq = [];
          window.__studioEmit = emit;
        })();`,
        });
    });
    return captured;
}
async function emit(page: Page) {
    return page.evaluate(async () =>
        (
            window as unknown as { __studioEmit: () => Promise<boolean> }
        ).__studioEmit(),
    );
}

test("unknown, rejected and restored rejection load no analytics script or event", async ({
    page,
}) => {
    const captured = await analyticsFixture(page);
    await page.goto("/");
    await expect(page.locator(".cookie-banner")).toBeVisible();
    expect(captured).toEqual({ scripts: 0, events: 0 });
    await page.locator(".cookie-reject").click();
    await expect(page.locator(".cookie-banner")).not.toBeVisible();
    await page.goto("/services");
    await expect(page.locator("h1")).toBeVisible();
    await page.reload();
    await expect(page.locator(".cookie-banner")).not.toBeVisible();
    expect(
        await page.evaluate((key) => localStorage.getItem(key), consentKey),
    ).toBe("rejected");
    expect(captured).toEqual({ scripts: 0, events: 0 });
});

test("acceptance permits SDK events and footer withdrawal blocks the still-loaded SDK", async ({
    page,
}) => {
    const captured = await analyticsFixture(page);
    await page.goto("/");
    await page.locator(".cookie-accept").click();
    await expect.poll(() => captured.scripts).toBe(1);
    await expect
        .poll(() =>
            page.evaluate(
                () =>
                    typeof (window as unknown as { __studioEmit?: unknown })
                        .__studioEmit,
            ),
        )
        .toBe("function");
    expect(await emit(page)).toBe(true);
    const previous = captured.events;
    await page.locator(".consent-preferences").click();
    await expect(page.locator(".cookie-banner")).toBeVisible();
    expect(await emit(page)).toBe(false);
    await page.locator(".cookie-reject").click();
    expect(await emit(page)).toBe(false);
    expect(captured.events).toBe(previous);
    expect(
        await page.evaluate(
            () =>
                typeof (window as unknown as { __studioEmit?: unknown })
                    .__studioEmit,
        ),
    ).toBe("function");
});

test("restored acceptance cannot survive cleared, malformed or externally rejected storage", async ({
    page,
}) => {
    await page.addInitScript(
        (key) => localStorage.setItem(key, "accepted"),
        consentKey,
    );
    const captured = await analyticsFixture(page);
    await page.goto("/");
    await expect.poll(() => captured.scripts).toBe(1);
    await expect
        .poll(() =>
            page.evaluate(
                () =>
                    typeof (window as unknown as { __studioEmit?: unknown })
                        .__studioEmit,
            ),
        )
        .toBe("function");
    expect(await emit(page)).toBe(true);
    const before = captured.events;
    await page.evaluate((key) => localStorage.removeItem(key), consentKey);
    expect(await emit(page)).toBe(false);
    await page.evaluate(
        (key) => localStorage.setItem(key, "{invalid}"),
        consentKey,
    );
    expect(await emit(page)).toBe(false);
    await page.evaluate((key) => {
        localStorage.setItem(key, "rejected");
        window.dispatchEvent(
            new StorageEvent("storage", { key, newValue: "rejected" }),
        );
    }, consentKey);
    expect(await emit(page)).toBe(false);
    expect(captured.events).toBe(before);
});

test("failed writes and removals cannot overwrite a newer in-tab withdrawal with stale accepted storage", async ({
    page,
}) => {
    await page.addInitScript(
        (key) => localStorage.setItem(key, "accepted"),
        consentKey,
    );
    const captured = await analyticsFixture(page);
    await page.goto("/");
    await expect.poll(() => captured.scripts).toBe(1);
    await expect
        .poll(() =>
            page.evaluate(
                () =>
                    typeof (window as unknown as { __studioEmit?: unknown })
                        .__studioEmit,
            ),
        )
        .toBe("function");
    expect(await emit(page)).toBe(true);
    await page.evaluate(() => {
        Storage.prototype.setItem = () => {
            throw new DOMException("Read-only store", "QuotaExceededError");
        };
        Storage.prototype.removeItem = () => {
            throw new DOMException("Read-only store", "QuotaExceededError");
        };
    });
    const before = captured.events;
    await page.locator(".consent-preferences").click();
    await expect(page.locator(".cookie-banner")).toBeVisible();
    expect(
        await page.evaluate((key) => localStorage.getItem(key), consentKey),
    ).toBe("accepted");
    expect(await emit(page)).toBe(false);
    await page.locator(".cookie-reject").click();
    await expect(page.locator(".cookie-banner")).not.toBeVisible();
    expect(await emit(page)).toBe(false);
    expect(captured.events).toBe(before);
});

test("unreadable browser storage starts denied and an explicit tab choice remains revocable", async ({
    page,
}) => {
    await page.addInitScript(() =>
        Object.defineProperty(window, "localStorage", {
            get() {
                throw new DOMException("Storage denied", "SecurityError");
            },
        }),
    );
    const captured = await analyticsFixture(page);
    await page.goto("/");
    await expect(page.locator(".cookie-banner")).toBeVisible();
    expect(captured.scripts).toBe(0);
    await page.locator(".cookie-accept").click();
    await expect.poll(() => captured.scripts).toBe(1);
    await expect
        .poll(() =>
            page.evaluate(
                () =>
                    typeof (window as unknown as { __studioEmit?: unknown })
                        .__studioEmit,
            ),
        )
        .toBe("function");
    expect(await emit(page)).toBe(true);
    await page.locator(".consent-preferences").click();
    expect(await emit(page)).toBe(false);
    await page.locator(".cookie-reject").click();
    expect(await emit(page)).toBe(false);
});

test("contact validation, retained error state and successful retry use only an intercepted API", async ({
    page,
}) => {
    let requests = 0;
    await page.route("**/api/contact", async (route) => {
        requests++;
        const body = route.request().postDataJSON();
        expect(body).toMatchObject({
            name: "Studio QA",
            email: "qa@example.com",
            type: "web",
            locale: "en",
            company: "",
        });
        expect(body.message.length).toBeGreaterThanOrEqual(20);
        await route.fulfill({
            status: requests === 1 ? 503 : 200,
            contentType: "application/json",
            body: JSON.stringify(
                requests === 1
                    ? { error: "Synthetic failure" }
                    : { success: true },
            ),
        });
    });
    await page.goto("/contact");
    await page.locator(".cookie-reject").click();
    await page
        .getByRole("button", { name: "Send message", exact: true })
        .click();
    await expect(page.locator("form").getByRole("alert").first()).toBeVisible();
    expect(requests).toBe(0);
    await page.getByLabel("Full name", { exact: true }).fill("Studio QA");
    await page
        .getByLabel("Email address", { exact: true })
        .fill("qa@example.com");
    await page.getByLabel("Project type", { exact: true }).selectOption("web");
    await page
        .getByLabel("Tell us about your project", { exact: true })
        .fill("A synthetic local website project for this isolated UI test.");
    await page
        .getByRole("button", { name: "Send message", exact: true })
        .click();
    await expect(page.locator("form").getByRole("alert")).toContainText(
        "Something went wrong",
    );
    await expect(page.getByLabel("Full name", { exact: true })).toHaveValue(
        "Studio QA",
    );
    await page
        .getByRole("button", { name: "Send message", exact: true })
        .click();
    await expect(
        page.getByRole("heading", { name: "Message sent!" }),
    ).toBeVisible();
    expect(requests).toBe(2);
    await page.getByRole("button", { name: "Send another message" }).click();
    await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("");
});

test("menu retains keyboard focus and locale selection preserves the current page", async ({
    page,
    isMobile,
}) => {
    await page.goto("/es/services");
    await page.locator(".cookie-reject").click();
    if (isMobile) {
        const trigger = page.locator(
            'header button[aria-controls="__menu_portal"]',
        );
        await expect(trigger).toHaveAccessibleName("Abrir menú");
        await trigger.click();
        await expect(trigger).toHaveAttribute("aria-expanded", "true");
        await page.keyboard.press("Escape");
        await expect(trigger).toBeFocused();
        await trigger.click();
    }
    const switcher = isMobile
        ? page
              .locator(".studio-menu-panel .language-trigger")
              .filter({ visible: true })
        : page.locator("header .language-trigger");
    await switcher.click();
    await page.getByRole("menuitem", { name: "Deutsch" }).click();
    await expect(page).toHaveURL(/\/de\/services$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    if (isMobile)
        await expect(
            page.getByRole("button", { name: "Menü öffnen" }),
        ).toHaveAttribute("aria-expanded", "false");
});

test("all primary surfaces fit small viewports and reduced motion exposes content", async ({
    page,
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(
        (key) => localStorage.setItem(key, "rejected"),
        consentKey,
    );
    for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        for (const path of [
            "/",
            "/projects",
            "/services",
            "/about",
            "/contact",
        ]) {
            await page.goto(path);
            await expect(page.locator("h1")).toBeVisible();
            expect(
                await page.evaluate(() => document.documentElement.scrollWidth),
                `${path} at ${width}`,
            ).toBeLessThanOrEqual(width);
        }
    }
});
