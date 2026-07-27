import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
    testDir: "tests/e2e",
    testMatch: /(?:capture|final-capture)\.spec\.js/,
    timeout: 120000,
    workers: 1,
    reporter: [["list"], ["./tests/e2e/release-reporter.js"]],
    use: { baseURL: "http://127.0.0.1:3123", trace: "retain-on-failure", video: "off", screenshot: "only-on-failure" },
    webServer: { command: "npm start -- -p 3123", url: "http://127.0.0.1:3123", reuseExistingServer: false, timeout: 120000 },
    projects: [
        { name: "desktop", use: { ...devices["Desktop Chrome"] } },
        { name: "mobile", use: { ...devices["iPhone 13"] } }
    ]
});
