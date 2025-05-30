# Roadmap for Hot Reload Benchmark

This document outlines the sequential steps to implement a quantifiable performance benchmark for hot reload comparing Blazor and Angular.

## 1. Project Structure & Setup

1. Create directory layout:
   - [ ] `/backend` – Python Django mock API
   - [x] `/clients/blazor` – Blazor WASM + Radzen
   - [x] `/clients/angular` – Angular CLI + Angular Material
   - [x] `/scripts` – automation & benchmarks
   - [x] `/tests` – Playwright tests & utilities

2. Initialize each client using templates:
   - [x] Blazor: `dotnet new blazorwasm`, add Radzen NuGet & CSS
   - [x] Angular: `ng new`, install `@angular/material` & HMR

3. [x] Add common configuration (CORS, base URLs).

## 2. Backend API Implementation

- [x] Scaffold Django project & app (`backend`, `api`)
- [x] Implement GET and POST endpoints for 10 resources, returning mock data
- [x] No database setup; uses in-memory lists
- [x] Configure URL routes in `backend/urls.py` and `api/urls.py`
- [x] Document run instructions in `/backend/README.md`
- [x] Add `requirements.txt` for backend dependencies
- [x] Add Python/Django ignores to root `.gitignore`
- [x] Initial integration tests for backend endpoints (created and tested)

**The backend is now fully scaffolded and ready for frontend integration and benchmarking.**

## 3. Frontend Page Creation

1. Plan 10 pages per client (mix of forms & grids):
   - 5 CRUD grids (data table + paging)
   - 5 CRUD forms (create/edit)
2. Blazor:
   - Use Radzen DataGrid & Form components
   - Configure `HttpClient` for API calls
3. Angular:
   - Use `MatTable` & `MatFormField` + `ReactiveForms`
   - Configure `HttpClientModule` and service layer
4. Verify both apps against backend.

## 4. Hot Reload Setup

1. Enable hot reload/watch:
   - Blazor: `dotnet watch run --watch`
   - Angular: `ng serve --configuration hmr`
2. Define code-edit scenarios:
   - Text change in component template
   - Style/CSS update
   - Logic change in code-behind
3. Create small patch files or scriptable edits for each scenario.

## 5. Benchmark Automation

1. Write Playwright scripts (`/tests/playwright`):
   - Launch app URL
   - Apply code edit via file write or Git patch
   - Start timer immediately after patch
   - Wait for UI change selector
   - Stop timer and log duration
2. Parameterize client type, scenario, iteration count.
3. Store results in structured JSON/CSV.

## 6. Test Execution & Data Aggregation

1. Create a runner script (`/scripts/run-benchmarks`):
   - Iterate over clients, scenarios, iterations
   - Invoke Playwright tests programmatically
   - Collect and append results
2. Calculate summary statistics (mean, median, stdev)
3. Export charts (e.g., via Python `matplotlib` or JS library).

## 7. Reporting & Documentation

1. Generate a final report in `/reports`: tables, graphs
2. Update `README.md` with instructions and benchmark results
3. Highlight key findings and recommendations
