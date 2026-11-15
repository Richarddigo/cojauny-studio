import { test, expect } from "@playwright/test";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import de from "../../messages/de.json";
import fr from "../../messages/fr.json";
const messages = { en, es, de, fr };

const locales = ["en", "es", "de", "fr"] as const;

test.describe("smoke — locale home", () => {
    for (const locale of locales) {
        test(`renders /${locale} with H1 and CTA`, async ({ page }) => {
            const response = await page.goto(`/${locale}`);
            expect(response?.status()).toBeLessThan(400);

            await expect(page.locator("h1")).toBeVisible();
            await expect(
                page.getByRole("navigation", {
                    name: messages[locale].nav.main_nav,
                }),
            ).toBeVisible();
            // hreflang alternates injected
            const alt = page.locator(
                'link[rel="alternate"][hreflang="x-default"]',
            );
            await expect(alt).toHaveCount(1);
        });
    }

    test("root / serves the default locale without a redirect loop", async ({
        page,
    }) => {
        const response = await page.goto("/");
        expect(new URL(response!.url()).pathname).toBe("/");
        await expect(page.locator("html")).toHaveAttribute("lang", "en");
        await expect(page.locator("h1")).toBeVisible();
    });
});

test.describe("smoke — main routes (en)", () => {
    const routes = ["/en/services", "/en/projects", "/en/contact"];
    for (const route of routes) {
        test(`GET ${route} returns 2xx and has h1`, async ({ page }) => {
            const response = await page.goto(route);
            expect(response?.status()).toBeLessThan(400);
            await expect(page.locator("h1")).toBeVisible();
        });
    }
});

test("404 page renders", async ({ page }) => {
    const response = await page.goto("/en/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
});

test("/api/health returns 200 + ok", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("ok");
});
