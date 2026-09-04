import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { mkdir, writeFile } from "node:fs/promises";

const target = process.env.LIGHTHOUSE_URL ?? "http://127.0.0.1:4173/";
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const chrome = await launch({ chromePath, chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });

try {
  const result = await lighthouse(target, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
  });
  await mkdir("artifacts/lighthouse", { recursive: true });
  await writeFile("artifacts/lighthouse/home.json", result.report);
  const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, category]) => [key, Math.round(category.score * 100)]));
  console.log(JSON.stringify(scores, null, 2));
  const targets = { performance: 90, accessibility: 95, "best-practices": 95, seo: 95 };
  const failures = Object.entries(targets).filter(([key, minimum]) => scores[key] < minimum);
  if (failures.length) {
    console.error(`Lighthouse targets missed: ${failures.map(([key, minimum]) => `${key} ${scores[key]} < ${minimum}`).join(", ")}`);
    process.exitCode = 1;
  }
} finally {
  await chrome.kill();
}
