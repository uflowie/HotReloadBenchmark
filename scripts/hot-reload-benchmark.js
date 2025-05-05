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
  // Prepare for results
  const results = [];
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.]/g, '-').slice(0,19);
  const resultsDir = path.join(__dirname, 'benchmark-results');
  if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);
  const resultsFile = path.join(resultsDir, `benchmark-results-${timestamp}.txt`);
    // Select framework from command line (default: angular)
  const framework = process.argv[2] === 'blazor' ? 'blazor' : 'angular';
  const scenarios = require(`./scenarios.${framework}.js`);
  console.log(`Running benchmark for framework: ${framework}`);

  // Framework dev server config
  const devServerConfig = {
    angular: {
      cmd: 'npx',
      args: ['ng', 'serve'],
      cwd: path.resolve(__dirname, '../clients/angular'),
      url: 'http://localhost:4200',
    },
    blazor: {
      cmd: 'dotnet',
      args: ['watch', 'run'],
      cwd: path.resolve(__dirname, '../clients/blazor'),
      url: 'http://localhost:5000',
    },
    // Add more frameworks here as needed
  };

  if (!devServerConfig[framework]) {
    throw new Error(`Unsupported framework: ${framework}`);
  }

  // Start the appropriate dev server
  const { cmd, args, cwd, url } = devServerConfig[framework];
  const devServer = spawn(cmd, args, {
    cwd,
    shell: true,
    stdio: 'inherit',
  });

  console.log(`Waiting for dev server at ${url}...`);
  await waitOn({ resources: [url], timeout: 60000 });

  // Launch Playwright browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);

  for (const [idx, s] of scenarios.entries()) {
    console.log(`Running scenario ${idx + 1}`);
    await page.goto(s.url);
    // sleep here because blazor doesn't hot reload properly otherwise
    await new Promise((r) => setTimeout(r, 5000));

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

      const duration = Date.now() - start;
      const resultLine = `Scenario ${idx + 1} (${s.url}, ${s.selector}, '${s.expectedText}'): ${duration} ms`;
      console.log(resultLine);
      results.push(resultLine);
    } catch (e) {
      const errorLine = `Scenario ${idx + 1} failed: ${e}`;
      console.error(errorLine);
      results.push(errorLine);
    }


    // Revert file
    fs.writeFileSync(s.filePath, original, 'utf8');
    // Small pause for HMR to revert
    await new Promise((r) => setTimeout(r, 500));
  }

  await browser.close();
  devServer.kill();
  // Write results to file
  fs.writeFileSync(resultsFile, `Benchmark Results (${new Date().toISOString()})\n\n` + results.join('\n') + '\n', 'utf8');
  console.log(`Benchmark complete. Results written to ${resultsFile}`);
})();
