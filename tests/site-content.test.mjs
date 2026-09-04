import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { site } from "../site.config.mjs";

const root = process.cwd();
const dist = resolve(root, "dist");
assert.ok(existsSync(dist), "dist must exist; run the build first");

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const location = join(directory, entry.name);
    return entry.isDirectory() ? walk(location) : [location];
  });
}

const htmlFiles = walk(dist).filter((file) => extname(file) === ".html");
const sourceRoots = [
  resolve(root, "index.html"),
  resolve(root, "grant-growth-system.html"),
  resolve(root, "about.html"),
  resolve(root, "contact.html"),
  resolve(root, "privacy.html"),
  resolve(root, "thankyou.html"),
  resolve(root, "404.html"),
  resolve(root, "partials"),
  resolve(root, "src"),
  resolve(root, "site.config.mjs")
];
const sourceFiles = sourceRoots.flatMap((location) => existsSync(location) && extname(location) ? [location] : walk(location));

const combinedSource = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n");
for (const prohibited of ["—", "–", "non-profit", "non-profits", "autopilot", "custom-coded", "My Partners", "Recent Wins"]) {
  assert.ok(!combinedSource.includes(prohibited), `prohibited wording found: ${prohibited}`);
}

const titles = new Set();
const descriptions = new Set();
const excludedFromSeoUniqueness = new Set(["process.html"]);

for (const file of htmlFiles) {
  const relative = file.slice(dist.length + 1);
  const html = readFileSync(file, "utf8");
  if (relative !== "process.html") {
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${relative} must contain exactly one h1`);
  }

  if (!excludedFromSeoUniqueness.has(relative)) {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    assert.ok(title, `${relative} needs a title`);
    assert.ok(description, `${relative} needs a description`);
    assert.ok(!titles.has(title), `duplicate title: ${title}`);
    assert.ok(!descriptions.has(description), `duplicate description: ${description}`);
    titles.add(title);
    descriptions.add(description);
  }

  for (const image of html.match(/<img\b[^>]*>/g) || []) {
    assert.match(image, /\balt="[^"]*"/, `${relative} image is missing alt text: ${image}`);
    assert.match(image, /\bwidth="\d+"/, `${relative} image is missing width: ${image}`);
    assert.match(image, /\bheight="\d+"/, `${relative} image is missing height: ${image}`);
  }

  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    assert.doesNotThrow(() => JSON.parse(script[1]), `${relative} contains invalid JSON-LD`);
  }

  for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
    const rawTarget = match[1];
    if (rawTarget.startsWith("//")) continue;
    const target = rawTarget.split(/[?#]/)[0];
    if (!target || target === "/") continue;
    const candidate = resolve(dist, target.slice(1));
    assert.ok(existsSync(candidate), `${relative} references missing local target ${rawTarget}`);
  }
}

const notFound = readFileSync(resolve(dist, "404.html"), "utf8");
assert.match(notFound, /name="robots" content="noindex, follow"/);
assert.ok(!notFound.includes('rel="canonical"'), "404 page must not include a canonical URL");

const processRedirect = readFileSync(resolve(dist, "process.html"), "utf8");
assert.match(processRedirect, /http-equiv="refresh" content="0; url=\/grant-growth-system\.html"/);

const contact = readFileSync(resolve(dist, "contact.html"), "utf8");
for (const field of ["name", "organization", "email", "phone", "organization_website", "service_interest", "current_grant_capacity", "funding_priorities", "timeline", "message"]) {
  assert.ok(contact.includes(`name="${field}"`), `contact form missing ${field}`);
}
assert.ok(contact.includes('name="_honey"'), "contact form needs a honeypot");
assert.ok(contact.includes("Privacy Notice"), "contact form needs a privacy notice");

const about = readFileSync(resolve(dist, "about.html"), "utf8");
assert.ok(about.includes("/images/team/brendan-bradley.webp"), "Brendan photo missing");
assert.ok(about.includes("/images/team/heidi-roux.webp"), "Heidi photo missing");

const home = readFileSync(resolve(dist, "index.html"), "utf8");
const homeSchemas = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
const faqSchema = homeSchemas.find((schema) => schema["@type"] === "FAQPage");
assert.ok(faqSchema, "home page needs FAQPage structured data");
assert.equal(faqSchema.mainEntity.length, (home.match(/<details>/g) || []).length, "FAQPage entries must match the visible FAQ items");
assert.equal(faqSchema.mainEntity.length, site.faq.length);
const organizationSchema = homeSchemas.find((schema) => schema["@type"] === "ProfessionalService");
assert.ok(organizationSchema?.hasOfferCatalog?.itemListElement?.length === site.services.length, "organization schema must list every service");
assert.ok(!homeSchemas.some((schema) => schema["@type"] === "BreadcrumbList"), "home page must not carry breadcrumbs");

for (const client of site.clients) {
  assert.ok(home.includes(`alt="${client.name} logo"`), `home page missing ${client.name} logo`);
  assert.ok(existsSync(resolve(dist, client.file.slice(1))), `client logo file missing: ${client.file}`);
}
assert.ok(existsSync(resolve(dist, site.socialImage.slice(1))), "social sharing image missing from dist");

for (const route of ["grant-growth-system.html", "about.html", "contact.html"]) {
  assert.ok(readFileSync(resolve(dist, route), "utf8").includes('"@type":"BreadcrumbList"'), `${route} needs BreadcrumbList structured data`);
}
for (const route of ["privacy.html", "thankyou.html", "404.html"]) {
  assert.ok(!readFileSync(resolve(dist, route), "utf8").includes("BreadcrumbList"), `${route} must not carry breadcrumbs`);
}

for (const removed of ["NPOGrantWritingSample.pdf", "pp-page1.png", "openfield.jpg", "elwinlogo.png", "emmaus.png", "bloom logo.png"]) {
  assert.ok(!walk(dist).some((file) => file.endsWith(removed)), `removed legacy asset was published: ${removed}`);
}

const sitemap = readFileSync(resolve(dist, "sitemap.xml"), "utf8");
for (const route of ["/", "/grant-growth-system.html", "/about.html", "/contact.html"]) {
  assert.ok(sitemap.includes(`https://www.npograntwriting.com${route}`), `sitemap missing ${route}`);
}

for (const retiredRoute of ["/services.html", "/insights.html", "/insights/a-strong-mission-is-not-a-grant-strategy.html"]) {
  assert.ok(!sitemap.includes(`https://www.npograntwriting.com${retiredRoute}`), `sitemap still includes retired route ${retiredRoute}`);
}

const privacy = readFileSync(resolve(dist, "privacy.html"), "utf8");
assert.match(privacy, /name="robots" content="noindex, follow"/);
assert.ok(!sitemap.includes("https://www.npograntwriting.com/privacy.html"), "utility privacy page must not be in the four-page sitemap");

console.log(`Content QA passed: ${htmlFiles.length} HTML files, ${titles.size} unique indexed-page titles.`);
