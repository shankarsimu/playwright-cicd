# 🎭 Playwright CI with GitHub Actions

This repository demonstrates how to run **Playwright end‑to‑end tests** in a GitHub Actions CI pipeline.  
Every push or pull request triggers automated browser tests to ensure application stability.

---

## 🚀 Overview
Playwright is a Node.js library for browser automation. Integrating it with GitHub Actions ensures:
- Tests run headlessly in CI.
- Browser dependencies are installed automatically.
- Reports are generated and uploaded for review.

---

## 📂 Project Structure
.github/
workflows/
playwright.yml   # CI workflow definition
tests/
example.spec.ts    # Sample Playwright test

---

## ⚙️ GitHub Actions Workflow

Here’s the CI configuration used in this repo:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # Checkout repo
      - uses: actions/checkout@v4

      # Setup Node.js (latest supported version)
      - uses: actions/setup-node@v4
        with:
          node-version: 24

      # Install dependencies
      - run: npm ci

      # Install Playwright browsers + system deps
      - run: npx playwright install --with-deps

      # Run Playwright tests
      - run: npx playwright test

      # Upload HTML report (optional)
      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run tests
npx playwright test



---

This README is **all‑in‑one**: it explains the workflow, shows the YAML config, gives local run instructions, and includes troubleshooting + references.  

Would you like me to also add **status badges** (e.g., CI build status, Node.js version, Playwright version) at the top so your repo looks more professional?


---
```
## Happy testing 🎉
