import { test, expect } from "@playwright/test";

async function fillInquiry(page) {
  await page.getByLabel("Full name").fill("Test Visitor");
  await page.getByLabel("Email address").fill("visitor@example.test");
  await page
    .getByLabel("Project type")
    .selectOption({ label: "Web development" });
  await page
    .getByLabel("Project description")
    .fill("A sample inquiry used only for automated browser verification.");
}

test("configured form validates, sends, and shows success", async ({
  page,
}) => {
  let requestBody = "";
  await page.route("https://forms.example.test/inquiry", async (route) => {
    requestBody = route.request().postData();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"ok":true}',
    });
  });
  await page.goto("http://127.0.0.1:4174/#contact");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByLabel("Full name")).toBeFocused();
  expect(requestBody).toBe("");
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByText("Thank you. Your inquiry has been sent.", { exact: false }),
  ).toBeVisible();
  expect(requestBody).toContain("visitor@example.test");
  expect(requestBody).toContain("Web development");
  await expect(page.getByLabel("Full name")).toHaveValue("");
});

test("form failure preserves inquiry and allows retry", async ({ page }) => {
  await page.route("https://forms.example.test/inquiry", (route) =>
    route.fulfill({ status: 503, body: "{}" }),
  );
  await page.goto("http://127.0.0.1:4174/#contact");
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByText("We couldn’t confirm delivery.", { exact: false }),
  ).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveValue("Test Visitor");
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeEnabled();
});

test("email fallback prepares a draft without claiming delivery", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4175/#contact");
  await expect(
    page.getByRole("link", { name: "inquiries@example.test" }),
  ).toHaveAttribute("href", "mailto:inquiries@example.test");
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByText("Your email draft is ready", { exact: false }),
  ).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveValue("Test Visitor");
  await expect(
    page.getByText("Your inquiry has been sent.", { exact: false }),
  ).toHaveCount(0);
});
