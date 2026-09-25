import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("projects filter honestly; dialog traps focus and restores it", async ({
  page,
}) => {
  await page.goto("/#projects");
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page
    .getByRole("button", { name: "Client projects", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(0);
  await expect(
    page.getByText("Good work deserves a proper introduction."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Explore our projects", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  const trigger = page
    .getByRole("button", { name: "View details", exact: true })
    .first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Orbit", exact: true }),
  ).toBeVisible();
  await expect(
    dialog.getByText("The challenge", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close project details" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(
      () => document.activeElement.closest("dialog") !== null,
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
});

test("mobile menu, direct section navigation and reduced motion work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".floating-plate")).toHaveCSS(
    "animation-name",
    "none",
  );
  const toggle = page.locator("#menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.reload();
  await expect(page.locator("#projects")).toBeInViewport();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
});

test("all viewports fit without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
  }
});

test("production renders all local assets without browser errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator(".project-image img")).toHaveCount(3);
  await expect
    .poll(() =>
      page
        .locator(".project-image img")
        .evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0),
        ),
    )
    .toBe(true);
  await expect(page).toHaveTitle(/DYUTERA/);
  await expect(page.locator("h1")).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("unconfigured contact is honest and contains no fake links", async ({
  page,
}) => {
  await page.goto("/#contact");
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeDisabled();
  await expect(
    page.getByText("Project inquiries will open soon.", { exact: false }),
  ).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator(".project-links a")).toHaveCount(0);
});

test("desktop and mobile accessibility checks", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    // Reveal sections before auditing contrast.
    for (const section of await page.locator("main>section").all())
      await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});

test("capture desktop and mobile previews", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  for (const section of await page.locator("main>section").all())
    await section.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
});
