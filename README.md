# Homework 5 — Numerical Integration & Normal CDF Lab

A browser-based mathematical computing project for **Homework 5**, covering both assigned exercises: numerical Riemann/Lebesgue-inspired integration and numerical computation of the standard normal CDF.

## Features

1. **Riemann integration:** left, right, midpoint sums, function/rectangle plots, error and convergence tables, including a numerical improper-integral example.
2. **Lebesgue-inspired integration:** partition function values into bins, estimate measures of their preimages by domain midpoint sampling, compare with Riemann, and discuss Dirichlet and Thomae analytically.
3. **Monotone truncation:** explore `min(1/sqrt(x), M)` and its exact integral `2 - 1/M` as `M` increases, plus the sampled numerical estimate.
4. **Two convergence experiments:** vary value levels with fixed domain samples, or vary domain samples with fixed value levels.
5. **Standard normal CDF:** trapezoidal and Simpson quadrature, Taylor expansion of erf, and an erf polynomial approximation; compare against tabulated reference probabilities.
6. **Accuracy and efficiency:** repeated-batch benchmark, median runtime, algorithmic evaluation counts, stability table, and CSV exports.
7. **Conclusions & Findings:** fifth tab with both exercises’ mathematical findings, a clearly labeled measured benchmark example, limitations, and possible extensions.

## Run locally

Requires Node.js 20+ and npm.

```bash
npm install
npm test
npm run dev
npm run build
```

Open the local URL displayed by Vite, normally http://localhost:5173/.

## GitHub Pages

The Vite base is `/Project-numerical-integration-cdf-lab/`. A GitHub Actions workflow under `.github/workflows/deploy.yml` runs tests and builds the site, then deploys `dist/` to GitHub Pages. Set **Settings → Pages → Source: GitHub Actions** in the repository.

## Mathematical interpretation and limitations

- **Riemann vs. Lebesgue:** both agree on bounded Riemann-integrable functions. Dirichlet is not Riemann-integrable but has Lebesgue integral 0; Thomae is integrable in both senses with integral 0.
- **Numerical Lebesgue approximation:** domain-cell midpoint counts only approximate preimage measures. Its reported lower/upper estimates bound the sampled value quantization, **not necessarily the true integral**.
- **Unbounded integrand:** `1/sqrt(x)` has an improper integral and a Lebesgue integral equal to 2. The truncations `f_M=min(1/sqrt(x),M)` have exact integrals `2-1/M` for M≥1. Monotone convergence applies to the exact integrals; sampled numerical approximations need not be monotone.
- **Normal CDF:** `Phi(x)=1/2 + integral_0^x phi(t)dt` follows by symmetry; `Phi(x)=(1+erf(x/sqrt(2)))/2` is an exact special-function representation. The Gaussian has no elementary antiderivative (Liouville's theorem on elementary integration).
- **Efficiency:** timing depends on the browser, hardware, JIT and timer resolution; one polynomial call is not equivalent in CPU cost to one density evaluation. Compare accuracy and evaluation budgets as well as runtime.
- **Taylor:** alternating-series cancellation may limit numerical stability for large |x|. The plotted finite domain also truncates the displayed normal tails; it does not truncate the CDF integral calculation.

## Documentation

- `docs/THEORY_EN.md` — Riemann fundamentals
- `docs/LEBESGUE_THEORY_EN.md` — level sets, preimages, pathology
- `docs/NORMAL_CDF_THEORY_EN.md` — Gaussian CDF and erf
- `docs/ACCURACY_PERFORMANCE_EN.md` — error and runtime discussion
- `docs/ACADEMIC_FINAL_REVIEW_EN.md` — theoretical and numerical review
- `docs/CONCLUSIONS_AND_FINDINGS_EN.md` — full concluding discussion and oral presentation notes

## Testing

The automated suite covers numerical identities, convergence, pathological classifications, CDF methods, benchmark infrastructure and monotone truncation. Passing tests verifies these tested cases, not a mathematical proof of correctness for arbitrary inputs.
