/**
 * Hot Reload Benchmark Prototype
 *
 * Usage:
 *   1. Install dependencies: `npm install playwright wait-on`
 *   2. Start this script: `node hot-reload-benchmark.js`
 *
 * This prototype launches the Angular dev server with HMR, opens a Playwright
 * browser session, applies file edits, and measures reload time until the
 * intended DOM changes appear.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const waitOn = require('wait-on');
const { spawn } = require('child_process');

(async () => {
  // Spawn Angular dev server with HMR (adjust for other frameworks as needed)
  const devServer = spawn('npx', ['ng', 'serve'], {
    cwd: path.resolve(__dirname, '../clients/angular'),
    shell: true,
    stdio: 'inherit',
  });

  const url = 'http://localhost:4200';
  console.log(`Waiting for dev server at ${url}...`);
  await waitOn({ resources: [url], timeout: 60000 });

  // Launch Playwright browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);

  // Define edit scenarios
  const scenarios = [
    {
      filePath: path.resolve(__dirname, '../clients/angular/src/app/components/users-list.component.ts'),
      search: '<h2>Users List</h2>',
      replaceWith: '<h2>All Users</h2>',
      selector: 'h2',
      expectedText: 'All Users',
      url: 'http://localhost:4200/users',
    },
    // TODO: add more scenario definitions matching page-plan-edits.md entries
  ];

  for (const [idx, s] of scenarios.entries()) {
    console.log(`Running scenario ${idx + 1}`);
    await page.goto(s.url);
    const original = fs.readFileSync(s.filePath, 'utf8');
    const patched = original.replace(s.search, s.replaceWith);
    fs.writeFileSync(s.filePath, patched, 'utf8');

    const start = Date.now();
    try {
      await page.waitForFunction(
        // 1️⃣ pageFunction
        ({ sel, text }) =>
          document.querySelector(sel)?.textContent.includes(text),

        // 2️⃣ arg: everything the pageFunction needs
        { sel: s.selector, text: s.expectedText },

        // 3️⃣ options
        { timeout: 10_000 }
      );

      console.log(`Scenario ${idx + 1} reload time: ${Date.now() - start} ms`);
    } catch (e) {
      console.error(`Scenario ${idx + 1} failed:`, e);
    }


    // Revert file
    fs.writeFileSync(s.filePath, original, 'utf8');
    // Small pause for HMR to revert
    await new Promise((r) => setTimeout(r, 500));
  }

  await browser.close();
  devServer.kill();
  console.log('Benchmark complete.');
})();
