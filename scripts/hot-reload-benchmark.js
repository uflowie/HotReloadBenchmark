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
  const timestamp = date.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const resultsDir = path.join(__dirname, 'benchmark-results');
  if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);
  const resultsFile = path.join(resultsDir, `benchmark-results-${timestamp}.txt`);
  // Select framework from command line (default: angular)
  const framework = process.argv[2] === 'blazor' ? 'blazor' : 'angular';
  const runCount = parseInt(process.argv[3], 10) || 5;
  const scenarioIdxRaw = process.argv[4];
  const scenariosAll = require(`./scenarios.${framework}.js`);
  let scenarios;
  if (scenarioIdxRaw !== undefined) {
    const idx = parseInt(scenarioIdxRaw, 10);
    if (isNaN(idx) || idx < 0 || idx >= scenariosAll.length) {
      throw new Error(`Invalid scenario index: ${scenarioIdxRaw}`);
    }
    scenarios = [scenariosAll[idx]];
    console.log(`Running ONLY scenario ${idx + 1} for framework: ${framework} (${runCount} runs)`);
  } else {
    scenarios = scenariosAll;
    console.log(`Running benchmark for framework: ${framework} (${runCount} runs per scenario)`);
  }

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
      args: ['watch'],
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

  if (framework === 'blazor') {
    // sleep here because blazor doesn't hot reload properly otherwise
    await new Promise((r) => setTimeout(r, 5000));
  }

  await page.goto(url);

  for (const [idx, s] of scenarios.entries()) {
    console.log(`Running scenario ${idx + 1}`);
    await page.goto(s.url);

    // Support patches array (new format) or single patch (legacy)
    const patches = s.patches || [{ filePath: s.filePath, search: s.search, replaceWith: s.replaceWith }];
    // Assume all patches target the same file; save and restore only the original content
    const targetFile = patches[0].filePath;
    const original = fs.readFileSync(targetFile, 'utf8');
    const applyPatches = () => {
      let patched = original;
      for (const patch of patches) {
        patched = patched.replace(patch.search, patch.replaceWith);
      }
      fs.writeFileSync(targetFile, patched, 'utf8');
    };
    const revertPatches = () => {
      fs.writeFileSync(targetFile, original, 'utf8');
    };



    const times = [];
    let failed = false;
    for (let run = 0; run < runCount; run++) {
      // If scenario has preEval, run it before checking
      if (s.preEval) {
        if (typeof s.preEval === 'function') {
          await s.preEval(page);
        } else if (typeof s.preEval === 'string') {
          await page.evaluate(s.preEval);
        }
      }
      applyPatches();
      // If scenario has postPatchEval, run it after patching
      if (s.postPatchEval) {
        if (typeof s.postPatchEval === 'function') {
          await s.postPatchEval(page);
        } else if (typeof s.postPatchEval === 'string') {
          await page.evaluate(s.postPatchEval);
        }
      }
      const start = Date.now();
      try {
        if (s.waitForFn) {
          // Use custom waitForFunction provided by scenario
          await page.waitForFunction(s.waitForFn.fn, s.waitForFn.args, { timeout: s.waitForFn.timeout || 10_000 });
        } else {
          await page.waitForFunction(
            ({ sel, text }) => {
              const el = document.querySelector(sel);
              if (!el) {
                window._hotReloadDebug = `Selector not found: ${sel}`;
                return false;
              }
              if (!el.textContent.includes(text)) {
                window._hotReloadDebug = `Selector '${sel}' found, but content is: '${el.textContent}' (expected to include '${text}')`;
                return false;
              }
              window._hotReloadDebug = '';
              return true;
            },
            { sel: s.selector, text: s.expectedText },
            { timeout: 10_000 }
          );
        }
        const duration = Date.now() - start;
        times.push(duration);
        console.log(`  Run ${run + 1}: ${duration} ms`);
      } catch (e) {
        console.error(`  Run ${run + 1} failed: ${e}`);
        // Print debug info from browser context
        const debugMsg = await page.evaluate(() => window._hotReloadDebug);
        if (debugMsg) {
          console.error(`    Debug: ${debugMsg}`);
        }
        times.push(Number.POSITIVE_INFINITY); // Mark as failed
        failed = true;
      }
      // Revert all patches after each run
      revertPatches();
      // Give time for hot reload to process revert
      await new Promise((r) => setTimeout(r, 2000));
    }
    // Calculate median (ignoring failed runs if possible)
    const validTimes = times.filter(t => isFinite(t));
    let median;
    if (validTimes.length > 0) {
      validTimes.sort((a, b) => a - b);
      const mid = Math.floor(validTimes.length / 2);
      median = validTimes.length % 2 !== 0 ? validTimes[mid] : (validTimes[mid - 1] + validTimes[mid]) / 2;
    } else {
      median = 'FAILED';
    }
    const resultLine = `Scenario ${idx + 1} (${s.url}, ${s.selector}, '${s.expectedText}'): median ${median} ms`;
    console.log(resultLine);
    results.push(resultLine);
  }

  await browser.close();
  devServer.kill();
  // Write results to file
  fs.writeFileSync(resultsFile, `Benchmark Results (${new Date().toISOString()})\n\n` + results.join('\n') + '\n', 'utf8');
  console.log(`Benchmark complete. Results written to ${resultsFile}`);
})();
