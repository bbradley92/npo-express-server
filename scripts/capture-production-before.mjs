import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: chromePath, headless: true });

try {
  await mkdir("artifacts/screenshots", { recursive: true });
  for (const [name, viewport] of Object.entries({
    "desktop-1440": { width: 1440, height: 1000 },
    "mobile-375": { width: 375, height: 812 }
  })) {
    const page = await browser.newPage({ viewport });
    await page.goto("https://www.npograntwriting.com/", { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(1_000);
    await page.screenshot({ path: `artifacts/screenshots/production-before-home-${name}.png`, fullPage: true });
    await page.close();
  }
} finally {
  await browser.close();
}
