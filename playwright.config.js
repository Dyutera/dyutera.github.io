import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "npm run preview -- --port 4173",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
    {
      command: "node tests/fixture-server.js form 4174",
      url: "http://127.0.0.1:4174",
      timeout: 60000,
    },
    {
      command: "node tests/fixture-server.js email 4175",
      url: "http://127.0.0.1:4175",
      timeout: 60000,
    },
  ],
});
