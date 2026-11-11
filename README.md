# Homework 5 — Numerical Integration & Normal CDF Lab

Interactive mathematical computing project. **Phase 1** implements Exercise 1 (Riemann quadrature); the Lebesgue and Normal CDF modules will be implemented in later phases.

## Requirements
Node.js 20+ and npm.

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173/).

## Tests and production build
```bash
npm test
npm run build
```

## Implemented
- Riemann left, right and midpoint sums
- Seven functions, including a discontinuous step, removable singularity and improper integral
- Interactive SVG rectangles and convergence plot
- Exact reference values, absolute errors and CSV export
- Automated tests for numerical methods

## Mathematical notes
- The `1/sqrt(x)` case is an **improper integral**, not a proper Riemann integral on [0,1]. The left endpoint rule is deliberately marked not applicable.
- The `sin(x)/x` function is continuously extended at zero by defining its value as 1.
- The exact reference for the sine integral is `Si(pi) ≈ 1.851937051982466`.
- For rendering, the SVG displays at most 250 rectangles; the integration calculation uses all selected partitions.

## Planned
- Lebesgue-style value-layer integration with preimage-measure approximations
- Dirichlet and Thomae: mathematically faithful handling of measure and numerical sampling limitations
- Standard normal CDF via Simpson, trapezoidal, erf series and reference comparison
- Performance benchmarks, reports and GitHub Pages deployment

## GitHub Pages
The Vite base path is preconfigured for `Project-numerical-integration-cdf-lab`. GitHub Pages deployment will be added in the final phase.

## Phase 2 — Lebesgue level-set demonstration

The second tab partitions the **range** into value bins and approximates each bin's preimage measure by uniform domain-cell midpoint sampling. It reports lower/upper level approximations and their midpoint, and compares against a Riemann midpoint sum. **Important:** finite samples cannot compute the exact Lebesgue measure of arbitrary sets. The reported lower/upper quantities are bounds for the sampled discretization, not rigorous bounds on the true integral without additional assumptions. For Dirichlet and Thomae, the application instead shows the rigorous mathematical conclusions, without pretending floating-point rationality tests are meaningful.

The unbounded inverse-square-root function is deliberately excluded from the bounded-function level-set implementation; its Lebesgue integral needs truncation/monotone-convergence treatment, which is a later extension.

## Phase 3 — Normal CDF (Homework 5, Exercise 2)

The third tab implements composite trapezoidal integration, composite Simpson integration, an erf Taylor series, and an Abramowitz–Stegun erf approximation. The normal-CDF integration uses symmetry to avoid truncating the lower infinite integration limit. A reference table enables error comparisons and a convergence chart; the CDF plot and CSV export are interactive. See `docs/NORMAL_CDF_THEORY_EN.md` for derivations and numerical limitations.

Run `npm test`, `npm run build`, and `npm run dev` after extracting/copying this archive over the Phase 2 project.


## Phase 4 — Accuracy and Efficiency
A fourth tab runs repeated-batch benchmarks for Normal CDF methods and Riemann versus sampled Lebesgue, showing median runtime, absolute error and evaluation count. A stability table compares CDF errors across reference points. CSV export is available for both experiments. Read `docs/ACCURACY_PERFORMANCE_EN.md` for limitations and oral discussion.
