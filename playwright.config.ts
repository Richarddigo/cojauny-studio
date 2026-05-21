import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
    timeout: 30_000,
    expect: { timeout: 5_000 },
    use: {
        baseURL: BASE_URL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    ],
    webServer: process.env.PLAYWRIGHT_BASE_URL
        ? undefined
        : {
            command: "npm run build && npm run start",
            url: BASE_URL,
            timeout: 180_000,
            reuseExistingServer: !process.env.CI,
        },
});
