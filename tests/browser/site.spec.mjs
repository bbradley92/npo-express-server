import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const pages = [
  "/",
  "/grant-growth-system.html",
  "/about.html",
  "/contact.html",
  "/privacy.html",
  "/404.html",
  "/thankyou.html"
];

test.beforeAll(async () => {
  await mkdir("artifacts/screenshots", { recursive: true });
});

test("required routes render with one visible h1 and no console errors", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  for (const route of pages) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("homepage exposes the GGS positioning and primary calls to action", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Build a Grant Pipeline That Does Not Depend on One Big Win");
  await expect(page.getByRole("link", { name: "See How GGS Works" })).toHaveAttribute("href", "/grant-growth-system.html");
  await expect(page.getByRole("link", { name: "Schedule a Grant Growth Review" }).first()).toHaveAttribute("href", "/contact.html");
  await expect(page.getByText("Technology strengthens the work. People direct it.")).toBeVisible();
});

test("navigation is keyboard accessible and mobile menu toggles", async ({ page }, testInfo) => {
  await page.goto("/");
  const toggle = page.locator("[data-nav-toggle]");
  if (testInfo.project.name === "desktop-1440") {
    await expect(toggle).toBeHidden();
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link")).toHaveCount(5);
    await expect(page.locator(".site-header__cta")).toBeHidden();
  } else {
    await expect(toggle).toBeVisible();
    await expect(page.locator(".site-header__cta")).toBeVisible();
    await expect(page.locator(".site-header__cta")).toHaveAttribute("href", "/contact.html");
    await expect(toggle).toHaveAccessibleName("Open navigation");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAccessibleName("Close navigation");
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Grant Growth System" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAccessibleName("Open navigation");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const viewport = page.viewportSize();
    await page.mouse.click(Math.round(viewport.width / 2), viewport.height - 10);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  }
});

test("homepage shows the client and partner logos", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Organizations NPO Grant Writing has supported." })).toBeVisible();
  const logos = page.locator(".client-grid img");
  await expect(logos).toHaveCount(3);
  for (const logo of await logos.all()) {
    await logo.scrollIntoViewIfNeeded();
    await expect.poll(() => logo.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator(".client-logo--dark img")).toHaveAttribute("alt", "Bloom logo");
});

test("about page uses the approved Brendan and Heidi images", async ({ page }) => {
  await page.goto("/about.html");
  await expect(page.getByRole("heading", { name: "Brendan Bradley" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Heidi Roux" })).toBeVisible();
  for (const image of await page.locator(".team-grid img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
  }
  const images = await page.locator(".team-grid img").evaluateAll((elements) => elements.map((image) => ({ src: image.getAttribute("src"), width: image.naturalWidth })));
  expect(images).toEqual([
    { src: "/images/team/brendan-bradley.webp", width: 960 },
    { src: "/images/team/heidi-roux.webp", width: 960 }
  ]);
});

test("contact form validates and succeeds without a real submission", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "One full form test is sufficient");
  await page.route("https://formsubmit.co/ajax/**", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) }));
  await page.goto("/contact.html");
  await page.getByRole("button", { name: "Request the Review" }).click();
  await expect(page.locator("#name:invalid")).toHaveCount(1);
  await page.getByLabel("Name *").fill("Test Visitor");
  await page.getByLabel("Organization *").fill("Example Nonprofit");
  await page.getByLabel("Email *").fill("test@example.org");
  await page.getByLabel("Organization website *").fill("https://example.org");
  await page.getByLabel("Primary service interest *").selectOption({ label: "Grant Growth Review" });
  await page.getByLabel("Approximate timeline *").selectOption({ label: "Within 90 days" });
  await page.getByLabel("Current grant capacity *").selectOption({ label: "Grant work is shared across roles" });
  await page.getByLabel("Funding priorities *").fill("General operating support and program growth.");
  await Promise.all([
    page.waitForURL("**/thankyou.html"),
    page.getByRole("button", { name: "Request the Review" }).click()
  ]);
  await expect(page.locator("h1")).toHaveText("Thank you for starting the conversation.");
});

test("contact form fails safely when its provider is unavailable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "One error-state test is sufficient");
  await page.route("https://formsubmit.co/ajax/**", (route) => route.fulfill({ status: 503, body: "Unavailable" }));
  await page.goto("/contact.html");
  await page.getByLabel("Name *").fill("Test Visitor");
  await page.getByLabel("Organization *").fill("Example Nonprofit");
  await page.getByLabel("Email *").fill("test@example.org");
  await page.getByLabel("Organization website *").fill("https://example.org");
  await page.getByLabel("Primary service interest *").selectOption({ label: "Grant Growth Review" });
  await page.getByLabel("Approximate timeline *").selectOption({ label: "Within 90 days" });
  await page.getByLabel("Current grant capacity *").selectOption({ label: "Grant work is shared across roles" });
  await page.getByLabel("Funding priorities *").fill("General operating support.");
  await page.getByRole("button", { name: "Request the Review" }).click();
  await expect(page.getByRole("status")).toContainText("We could not send the form");
  await expect(page.getByRole("button", { name: "Request the Review" })).toBeEnabled();
});

test("pages pass automated critical and serious accessibility checks", async ({ page }) => {
  for (const route of ["/", "/grant-growth-system.html", "/about.html", "/contact.html"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const material = results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact));
    expect(material, `${route}: ${material.map((item) => `${item.id} (${item.nodes.length})`).join(", ")}`).toEqual([]);
  }
});

test("reduced motion disables smooth scrolling and the footer year is current", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-current-year]").first()).toHaveText(String(new Date().getFullYear()));
  const scrollBehavior = await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior);
  expect(scrollBehavior).toBe("auto");
});

test("legacy process route resolves to the GGS page", async ({ page }) => {
  await page.goto("/process.html");
  await page.waitForURL("**/grant-growth-system.html");
  await expect(page.locator("h1")).toHaveText("A disciplined operating system for institutional funding.");
});

test("capture responsive staging screenshots", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.screenshot({ path: `artifacts/screenshots/staging-home-${testInfo.project.name}.png`, fullPage: true });
  await page.goto("/about.html");
  await page.screenshot({ path: `artifacts/screenshots/staging-about-${testInfo.project.name}.png`, fullPage: true });
});
