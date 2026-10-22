// Winslow Pantry: renders the 1200 x 630 Open Graph share images, one per
// page per language, into public/assets/og/<lang>/<page>.jpg.
//
// Needs Playwright with Chromium, which is not a project dependency:
//   npm i --no-save playwright && npx playwright install chromium
//   npm run og
// Re-run it whenever a page title or a language changes, then commit the images.

import { mkdirSync, writeFileSync, rmSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { root, site, locales, PAGES, t, esc } from "./lib.mjs";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is not installed. Run: npm i --no-save playwright && npx playwright install chromium");
  process.exit(1);
}

const pub = join(root, "public");
const file = (p) => pathToFileURL(join(pub, p)).href;
const host = new URL(site.url).host.replace(/^www\./, "");

const ART = {
  home: `<div class="frame" style="transform:rotate(2deg)"><img src="${file("assets/img/photos/market.webp")}"></div>
         <img class="spot" style="width:190px;left:-40px;bottom:30px" src="${file("assets/img/fruit/blueberries.webp")}">`,
  collection: `<img class="pkg" style="height:430px;left:20px;top:40px;transform:rotate(-6deg)" src="${file("assets/img/products/bag-clips.webp")}">
         <img class="pkg" style="height:360px;left:190px;top:30px;transform:rotate(3deg)" src="${file("assets/img/products/utensil-rest.webp")}">
         <img class="pkg" style="height:360px;left:220px;top:150px;transform:rotate(8deg)" src="${file("assets/img/products/funnels.webp")}">`,
  story: `<div class="frame" style="transform:rotate(-2deg)"><img src="${file("assets/img/photos/market.webp")}"></div>
         <img class="spot" style="width:150px;right:-6px;top:-20px" src="${file("assets/img/fruit/cherries.webp")}">`,
  contact: `<img class="pkg" style="width:420px;left:40px;top:150px;transform:rotate(-4deg)" src="${file("assets/img/products/board-engraved.webp")}">
         <img class="spot" style="width:210px;left:250px;top:10px" src="${file("assets/img/fruit/blueberries.webp")}">`,
};

const html = (L, key) => {
  const ns = key === "home" ? "home" : key;
  return `<!doctype html><html lang="${L}"><head><meta charset="utf-8"><style>
  @font-face { font-family: Playfair; src: url(${file("assets/fonts/playfair-latin.woff2")}) format("woff2"); font-weight: 400 900; }
  @font-face { font-family: Playfair; src: url(${file("assets/fonts/playfair-latin-ext.woff2")}) format("woff2"); font-weight: 400 900; unicode-range: U+0100-024F; }
  @font-face { font-family: Script; src: url(${file("assets/fonts/yellowtail-latin.woff2")}) format("woff2"); }
  @font-face { font-family: Script; src: url(${file("assets/fonts/yellowtail-latin-ext.woff2")}) format("woff2"); unicode-range: U+0100-024F; }
  @font-face { font-family: Sans; src: url(${file("assets/fonts/instrument-sans-latin.woff2")}) format("woff2"); font-weight: 400 700; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #9BB4CB; color: #1C252E; font-family: Sans, sans-serif; position: relative; }
  .copy { position: absolute; left: 64px; top: 52px; width: 600px; }
  .logo { width: 170px; display: block; margin-bottom: 34px; }
  .kicker { font-family: Script, cursive; font-size: 40px; line-height: 1; margin-bottom: 10px; }
  h1 { font-family: Playfair, serif; font-weight: 400; font-size: 62px; line-height: 1.04; letter-spacing: -0.01em; }
  .host { position: absolute; left: 64px; bottom: 92px; font-weight: 600; font-size: 22px; letter-spacing: 0.04em; }
  .art { position: absolute; right: 50px; top: 40px; width: 470px; height: 470px; }
  .frame { position: absolute; inset: 20px 10px 30px 30px; background: #fff; padding: 12px; border-radius: 16px; box-shadow: 0 20px 40px -14px rgba(28,37,46,.45); }
  .frame img { width: 100%; height: 100%; object-fit: cover; border-radius: 9px; }
  .pkg, .spot { position: absolute; filter: drop-shadow(0 16px 18px rgba(28,37,46,.3)); }
  .plaid { position: absolute; left: 0; right: 0; bottom: 0; height: 64px; background: url(${file("assets/img/brand/plaid.svg")}) 0 0 / 100px 100px; }
  </style></head><body>
  <div class="copy">
    <img class="logo" src="${file("assets/img/brand/logo.svg")}">
    <p class="kicker">${esc(t(L, `${ns}.heroKicker`))}</p>
    <h1>${esc(t(L, `${ns}.heroTitle`))}</h1>
  </div>
  <p class="host">${esc(host)}</p>
  <div class="art">${ART[key]}</div>
  <div class="plaid"></div>
  </body></html>`;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
// Loaded from a file:// URL so the template can read the local fonts and images.
const tmp = mkdtempSync(join(tmpdir(), "wp-og-"));
const tmpFile = join(tmp, "og.html");
for (const { code: L } of locales) {
  mkdirSync(join(pub, "assets/og", L), { recursive: true });
  for (const { key } of PAGES) {
    writeFileSync(tmpFile, html(L, key));
    await page.goto(pathToFileURL(tmpFile).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const out = join(pub, "assets/og", L, `${key}.jpg`);
    await page.screenshot({ path: out, type: "jpeg", quality: 86 });
    console.log("  wrote", out.slice(pub.length + 1));
  }
}
await browser.close();
rmSync(tmp, { recursive: true, force: true });
