import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/en", "/en/services", "/en/projects", "/en/contact"];

for (const path of pages) {
    test(`a11y — ${path} has no critical/serious axe violations`, async ({ page }) => {
        // Disable animations so AnimateIn opacity:0 elements don't skew contrast checks
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(path);
        const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();

        const blocking = results.violations.filter((v) =>
            ["critical", "serious"].includes(v.impact ?? "")
        );

        if (blocking.length > 0) {
            // Helpful diagnostic in the report
            console.log(JSON.stringify(blocking, null, 2));
        }
        expect(blocking, "WCAG critical/serious violations").toHaveLength(0);
    });
}
