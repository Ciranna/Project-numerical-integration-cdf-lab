# Homework 5 — Lebesgue integration

Riemann partitions the domain, while Lebesgue integration can be introduced by approximating a measurable function with simple functions that partition its range.

For bounded nonnegative f, choose a range bin width h and define s_h(x)=h floor(f(x)/h), with a suitable cap for the top bin. Then s_h is a simple function and its integral equals sum_k (kh) * lambda({x: kh <= f(x) < (k+1)h}). Under appropriate conditions, s_h increases toward f as the resolution improves, and the Lebesgue integral is the limit of these simple-function integrals.

The browser demonstration approximates each preimage measure with a count of midpoints on a finite domain grid. Consequently, these are *sampling-based approximations*, not exact measures. The reported lower and upper values bound only the discretized sample average, not necessarily the true integral. Accuracy depends on both the number of range levels and the number and location of domain samples.

Dirichlet: D(x)=1 on rationals, 0 on irrationals. Every interval has infimum 0 and supremum 1, so the lower and upper Darboux integrals are 0 and 1. It is not Riemann integrable. The rationals are countable and have Lebesgue measure zero, hence the Lebesgue integral is 0.

Thomae: T(p/q)=1/q for reduced rational p/q, and T(x)=0 for irrationals. T is continuous at every irrational and discontinuous at every rational. The discontinuity set has measure zero, so T is Riemann integrable; its Riemann and Lebesgue integrals both equal 0.

For an unbounded function such as 1/sqrt(x), the correct theory involves nonnegative measurable functions and monotone convergence, or an improper Riemann integral; a bounded level-set implementation is insufficient without truncation.
