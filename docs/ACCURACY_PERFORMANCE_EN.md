# Homework 5 — Phase 4: Accuracy and Computational Efficiency

## Purpose
The experiment compares numerical integration algorithms by (1) absolute error relative to a known reference, (2) number of function evaluations and (3) median wall-clock time per call. No single metric captures all costs.

## Benchmark methodology
Each method is warmed up, then measured in multiple batches. A batch calls the same algorithm repeatedly; elapsed milliseconds are divided by calls per batch. The median across batches is reported to reduce sensitivity to occasional scheduling delays. Results depend on browser, processor, JIT, power settings and background tasks. They are **empirical measurements**, not formal asymptotic complexity proofs.

## Normal CDF
Phi(x) = 1/2 + integral from 0 to x of exp(-t²/2)/sqrt(2pi) dt. This identity avoids truncating the lower limit -infinity. Trapezoid and Simpson use n+1 PDF evaluations. Taylor's erf series uses k terms and may suffer cancellation at large |x|. Abramowitz–Stegun 7.1.26 uses a fixed polynomial/rational expression and has a nonzero approximation error (erf absolute error about 1.5e-7). The CDF reference table is stored independently of the compared algorithms.

For smooth functions on a fixed finite interval, the composite trapezoidal rule typically has O(h²) global error, and composite Simpson's rule O(h⁴), subject to sufficient derivatives. A Taylor truncation error depends on the number of terms and x; the fixed erf approximation has no refinement parameter.

## Riemann vs Lebesgue
For bounded nonnegative functions, the numerical Lebesgue-inspired method partitions function values into bins and estimates the measure of each preimage from uniformly sampled domain-cell midpoints. These are not exact preimage measures. The benchmark deliberately shows the evaluation budgets: Riemann midpoint uses n evaluations; Lebesgue uses 4096 evaluations plus binning. It is not a fair equal-budget speed comparison; it illustrates the cost of this specific implementation.

The Dirichlet function is Lebesgue-integrable with integral 0 but not Riemann-integrable. Thomae's function is integrable in both senses with integral 0. Floating-point classification of rational versus irrational real numbers is not a valid numerical proof.

## Numerical stability and caveats
Absolute error is |approximation - reference|. At x=0 the methods return exactly 0.5, so a zero error is not evidence of superior global accuracy. For large |x|, naive Taylor erf series has large alternating terms and catastrophic cancellation; errors can grow or results may leave [0,1]. The finite set of tabulated references does not certify all real x. Relative error is not used because it can be misleading near zero probabilities. Timing data are not automatically reproducible across machines; export CSV and report machine/browser, batch size and run settings in a written analysis.

## Oral summary
"We compared the methods using accuracy, function-evaluation counts and median runtime. Simpson's rule typically converges faster than the trapezoidal rule for smooth integrands. The Taylor series is accurate near the origin but can lose numerical stability for large arguments. The fixed erf approximation is efficient but has an intrinsic error bound. Our Lebesgue-inspired implementation approximates the measures of level-set preimages by sampling; it is a numerical illustration rather than an exact measure calculation."
