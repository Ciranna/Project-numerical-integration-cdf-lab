# Homework 5 — Conclusions and Findings

## Exercise 1: Riemann and Lebesgue Integration

Riemann integration partitions the domain and forms weighted sums of function values. Lebesgue integration groups function values and measures their preimages. Every bounded Riemann-integrable function on a compact interval is Lebesgue-integrable with the same value. This is a mathematical theorem, not a consequence of the numerical plots.

The Dirichlet indicator of the rationals is not Riemann-integrable, but its Lebesgue integral is zero because the rationals are countable and have measure zero. Thomae's function is Riemann-integrable with integral zero because its discontinuities form a measure-zero set. Neither function should be classified by naive floating-point rationality tests.

For f(x) = 1/sqrt(x), x in (0,1], the improper integral and Lebesgue integral both equal 2. Truncating at M >= 1 gives f_M(x) = min(1/sqrt(x), M) and the exact integral 2 - 1/M. These exact integrals increase monotonically to 2, by monotone convergence. The numerical sampled level-set estimates need not increase monotonically: the experiment at M = 64, for example, can exceed 2 due to sampling and value quantization.

The program's Lebesgue-inspired numerical approximation uses midpoint sampling to estimate preimage measures. Its lower and upper values bound only the sampled, quantized integral; they do not rigorously bound the exact Lebesgue integral for arbitrary functions. Varying the number of value levels and the number of domain samples reveals two distinct discretization effects.

## Exercise 2: Numerical Normal CDF

The standard normal CDF is Phi(x) = integral from -infinity to x of exp(-t^2/2)/sqrt(2*pi) dt. Symmetry yields Phi(x) = 1/2 + integral from 0 to x of phi(t) dt. The Gaussian density has no elementary antiderivative, as established through the theory of elementary integration associated with Liouville's theorem. The exact special-function representation Phi(x) = (1 + erf(x/sqrt(2)))/2 still requires numerical evaluation.

At x = 1 with 100 integration partitions and 100 Taylor terms, observed absolute errors were approximately: trapezoidal 2.016e-6, Simpson 2.688e-11, Taylor 1.110e-16, and erf approximation 9.901e-9. In a particular browser benchmark (nine batches, 100 calls each), rounded median milliseconds per call were 0.006, 0.005, 0.002, and 0.001 respectively. These timings are experimental, not theoretical complexity guarantees. The number of density evaluations is 101 for each quadrature method; the Taylor and polynomial methods perform different types of work and cannot be compared by raw evaluation counts alone.

Simpson offers high accuracy for a smooth density at moderate partition counts. Taylor can approach floating-point precision for moderate x but may suffer catastrophic cancellation for large |x|. The fixed erf approximation is computationally economical but has a nonzero approximation error. For extreme normal tails, stable complementary-CDF or erfc-based methods would be preferable.

## Limitations and future work

1. Finite sampling is not exact measure theory. Analytically computable preimages or interval methods would make selected comparisons more rigorous.
2. Floating-point precision and cancellation can limit convergence even when a mathematical series converges.
3. Browser timing is sensitive to JIT, timer resolution, background load, and thermal effects; repeated batches and medians reduce noise but cannot remove it.
4. Adaptive quadrature, stable normal-tail approximations, and benchmark confidence intervals are possible extensions.

## Oral conclusion (B2–C1)

In this homework, I investigated numerical integration and the computation of the standard normal cumulative distribution function. The first exercise showed how Riemann and Lebesgue integration approach the same mathematical problem from different perspectives. For ordinary Riemann-integrable functions, the two integrals agree. Pathological examples explain why Lebesgue integration is more general. The second exercise compared four methods for computing the normal CDF. Simpson's rule achieved high accuracy, the Taylor series was extremely accurate at moderate values, and the error-function approximation was the fastest in one measured benchmark. The main lesson is that numerical accuracy, mathematical convergence, and computational efficiency are different properties. A reliable implementation must explain both its results and its limitations.
