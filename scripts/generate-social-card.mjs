// Render the code-native social graphic. Run after installing Playwright Chromium.
import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { site } from "../src/config/site.js";

const font = await readFile(
  new URL(
    "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
    import.meta.url,
  ),
);
const favicon = await readFile(
  new URL("../public/favicon.svg", import.meta.url),
  "utf8",
);
const escape = (text) =>
  text.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html><head><style>
  @font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font.toString("base64")})}
  *{box-sizing:border-box}body{margin:0;background:#090a10;color:#eeeaf7;font-family:Manrope;overflow:hidden}
  main{padding:65px 80px;width:1200px;height:630px;position:relative;background:radial-gradient(ellipse at 85% 50%,#48266870,transparent 65%)}
  header{display:flex;align-items:center;gap:15px;font-size:29px;letter-spacing:4px;font-weight:750}header svg{width:47px;height:47px}
  small{display:block;margin:48px 0 20px;color:#a58bc5;font-size:14px;letter-spacing:4px}h1{font-size:75px;line-height:1.22;letter-spacing:-3px;margin:0;font-weight:600}h1 span{color:#b69bff}
  p{font-size:18px;color:#a79cb8;margin-top:27px}.orbit{position:absolute;right:-40px;top:170px;width:350px;height:350px;border:1px solid #9870d04d;border-radius:60px;transform:rotate(35deg)}.orbit::before,.orbit::after{content:'';position:absolute;inset:40px;border:1px solid #b895f260;border-radius:50px}.orbit::after{inset:80px;background:#9c66e014}
  </style></head><body><main><header>${favicon}${escape(site.name)}.</header><small>YOUR IDEAS. OUR ENGINEERING.</small><h1>Ideas into impact.<br><span>Built with purpose.</span></h1><p>${escape(site.tagline)}</p><div class="orbit"></div></main></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/images/social-card.png" });
} finally {
  await browser.close();
}
