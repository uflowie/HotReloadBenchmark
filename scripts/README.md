# Scenario Authoring Guide

This document describes how to add and configure new scenarios for the Angular hot-reload benchmark.

## Files to edit

- **scripts/scenarios.<framework>.js**: exports an array of scenario objects.
- **scripts/scenarios.md**: a markdown summary list matching the order and descriptions of your scenarios.

---

## Scenario Object Structure (scenarios.<framework>.js)

Each scenario is an object with the following properties:

- **name** (string)
  - Human-readable description, e.g. `"Scenario 12 (Orders List: two grid variants...)"`.
- **url** (string)
  - The route to visit before applying patches, e.g. `http://localhost:4200/orders`.
- **patches** (Array)
  - **filePath**: absolute path via `path.resolve(__dirname, '...')` to the target component file.
  - **search**: literal string or regex snippet to locate in the file.
  - **replaceWith**: the code to insert or replace, as a string (use backticks for multi-line).
- **selector** (string)
  - CSS selector to locate the element for validation after patch.
- **expectedText** (string)
  - A substring that must appear in the selected element's textContent.

### Optional Hooks

- **preEval** (async function)
  - Runs before patching to prepare UI state (e.g., open a dropdown).
- **postPatchEval** (async function)
  - Runs after patching, before validation.
- **waitForFn** (object)
  - **fn**: a synchronous function run in the browser to poll a condition.
  - **args**: pass-through arguments (usually `undefined`).
  - **timeout**: milliseconds before failing this check.

---

## Markdown Summary (scenarios.md)

Maintain a numbered list matching each scenario in `scenarios.<framework>.js`:

1. Brief description
2. …

Example entry:

```markdown
12. Orders List – add two variant grids below the main grid: one with "Qty" as the quantity column header, and one with "PID" as the product ID column header.
```

---

## How to add a new scenario

1. Open `scripts/scenarios.<framework>.js` and append a new object at the end of the array.
2. Follow the structure above, including `name`, `url`, `patches`, `selector`, and validation fields.
3. Insert any `preEval`, `postPatchEval`, or `waitForFn` hooks if your scenario needs it.
4. Update `scripts/scenarios.md` with a matching numbered entry.
5. Do NOT apply the scenario changes to the component file directly. The scenario itself should describe the changes to be applied.

