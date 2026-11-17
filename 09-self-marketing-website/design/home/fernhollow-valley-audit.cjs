"use strict";
/**
 * DJMRN / P3-H public reference-behavior audit.
 * Owner-approved: read-only public webpage interaction and local observation.
 * DOES NOT download/copy web bundles, shaders, GLB, textures, audio or cookies.
 * Uses the already-installed Playwright Core and an isolated Microsoft Edge session.
 * This script is an inspection utility, NOT part of the DJMRN production website.
 * Rerun: node design/home/fernhollow-valley-audit.cjs
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const out = path.join(os.homedir(), "Desktop", "DJMRN-Website-Reference-Evidence", "fernhollow-gladeye-20261117");
const modulePath = path.join(os.homedir(), "Desktop", "DJMRN-ChatGPT-Downloads", "installed", "playwright-mcp", "node_modules", "playwright-core");
const pw = require(modulePath);
const SOURCE = "https://www.gladeye.com/";
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
function safePath(s) { try { const u = new URL(s); return u.origin + u.pathname; } catch { return "unknown"; } }
async function picture(page, name) {
  const buf = await page.screenshot({ type: "jpeg", quality: 65, timeout: 18000 });
  const filename = name + ".jpg";
  fs.writeFileSync(path.join(out, filename), buf);
  return { filename, bytes: buf.length, sha256: hash(buf) };
}
async function status(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const gl = canvas && (canvas.getContext("webgl2") || canvas.getContext("webgl"));
    return {
      url: location.origin + location.pathname,
      title: document.title,
      canvasCount: document.querySelectorAll("canvas").length,
      viewport: { width: innerWidth, height: innerHeight, scrollY, documentHeight: document.documentElement.scrollHeight },
      webgl: gl ? { version: gl.getParameter(gl.VERSION), width: gl.drawingBufferWidth, height: gl.drawingBufferHeight } : null,
      controls: Array.from(document.querySelectorAll("button,a")).filter(e => e.getBoundingClientRect().width > 0)
        .map(e => ({ type: e.tagName, label: (e.innerText || e.getAttribute("aria-label") || "").trim().slice(0,70),
          href: e.getAttribute("href") })).slice(0,15),
      prefersReducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches
    };
  });
}
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const report = { dateUTC: new Date().toISOString(), source: SOURCE, purpose: "P3 reference interaction audit ONLY", rights: "unverified third-party assets; no copied source/assets", screenshots: [], errors: [], failedRequests: [], resources: [] };
  const browser = await pw.chromium.launch({ channel: "msedge", headless: false, args: ["--disable-extensions"], timeout: 25000 });
  try {
    const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await desktop.newPage();
    page.on("pageerror", e => report.errors.push(e.message.slice(0,180)));
    page.on("requestfailed", r => report.failedRequests.push({ path: safePath(r.url()), error: r.failure()?.errorText }));
    page.on("response", r => {
      const mime = (r.headers()["content-type"] || "").split(";")[0];
      report.resources.push({ path: safePath(r.url()), status: r.status(), mime,
        declaredLength: Number(r.headers()["content-length"] || 0) });
    });
    const response = await page.goto(SOURCE, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(9000);
    report.desktop = { status: response?.status(), initial: await status(page) };
    report.screenshots.push(await picture(page, "recheck-desktop-loaded"));
    await page.mouse.move(180,570, { steps: 10 }); await page.waitForTimeout(900);
    report.screenshots.push(await picture(page, "recheck-pointer-left"));
    await page.mouse.move(940,610, { steps: 12 }); await page.waitForTimeout(900);
    report.screenshots.push(await picture(page, "recheck-pointer-right"));
    await page.mouse.wheel(0,600); await page.waitForTimeout(1700);
    report.desktop.afterWheel = await status(page);
    report.screenshots.push(await picture(page, "recheck-wheel"));
    const cta = page.getByText("Explore our work", { exact: true });
    if (await cta.count()) {
      await cta.hover({ timeout: 5000 }); await page.waitForTimeout(1100);
      report.screenshots.push(await picture(page, "recheck-cta-hover"));
    }
    await desktop.close();
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, screen: { width: 390, height: 844 },
      deviceScaleFactor: 1, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
    const mobilePage = await mobile.newPage();
    const mobileResponse = await mobilePage.goto(SOURCE, { waitUntil: "domcontentloaded", timeout: 30000 });
    await mobilePage.waitForTimeout(8000);
    report.mobile = { http: mobileResponse?.status(), state: await status(mobilePage) };
    report.screenshots.push(await picture(mobilePage, "recheck-mobile"));
    await mobile.close();
    const jsonPath = path.join(out, "browser-audit-recheck.json");
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
    console.log(JSON.stringify({ saved: jsonPath, screenshots: report.screenshots.length, resources: report.resources.length,
      failed: report.failedRequests.length, jsErrors: report.errors.length,
      desktopWebGL: report.desktop?.initial?.webgl?.version, mobileWebGL: report.mobile?.state?.webgl?.version }));
  } finally { await browser.close(); }
})().catch(e => { console.error("AUDIT_ERROR", e.message); process.exitCode = 1; });
