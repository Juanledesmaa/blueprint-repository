// Render a blueprint string to a PNG with the hosted Factorio Blueprint Editor.
//
//   node tools/render.js <file with the blueprint string> <out.png> [scale 1|2|4]
//
// Opens https://fbe.factorygamefan.com/#source=<string> in headless Chromium, waits for
// the blueprint to load, and saves the picture the editor's own "save image" action
// (Ctrl+S) produces. Needs Playwright and network access to fbe.factorygamefan.com.
const fs = require('fs');
const { chromium } = require('playwright');

const EDITOR = 'https://fbe.factorygamefan.com/';

(async () => {
  const [, , inFile, outFile, scale] = process.argv;
  if (!inFile || !outFile) { console.error('usage: node tools/render.js <string file> <out.png> [scale 1|2|4]'); process.exit(2); }
  const bp = fs.readFileSync(inFile, 'utf8').trim();

  const launch = {};
  if (process.env.HTTPS_PROXY) {   // cloud sessions reach the internet through a proxy
    const p = new URL(process.env.HTTPS_PROXY);
    launch.proxy = { server: p.protocol + '//' + p.host, username: decodeURIComponent(p.username), password: decodeURIComponent(p.password) };
  }
  const browser = await chromium.launch(launch);
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, acceptDownloads: true });
  // The editor reads its image export scale from localStorage (1x = 32 px per tile).
  if (scale) await page.addInitScript(v => localStorage.setItem('pictureResolution', v), String(scale));
  const problems = [];
  page.on('pageerror', e => problems.push('page error: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') problems.push('console: ' + m.text().slice(0, 200)); });

  await page.goto(EDITOR + '#source=' + bp, { waitUntil: 'load', timeout: 120000 });
  // The loading screen goes away once game data and the blueprint are in.
  await page.waitForFunction(() => {
    const l = document.getElementById('loadingScreen');
    return !l || getComputedStyle(l).display === 'none' || !l.classList.contains('active');
  }, null, { timeout: 180000 }).catch(() => problems.push('loading screen never cleared'));
  await page.waitForTimeout(6000);
  await page.screenshot({ path: outFile.replace(/\.png$/, '') + '.page.png' });

  await page.locator('#editor').click({ position: { x: 5, y: 5 } }).catch(() => {});
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 120000 }),
    page.keyboard.press('Control+S'),
  ]);
  await download.saveAs(outFile);
  console.log(JSON.stringify({ saved: outFile, bytes: fs.statSync(outFile).size, suggested: download.suggestedFilename(), problems }));
  await browser.close();
})().catch(e => { console.error('render failed:', e.message); process.exit(1); });
