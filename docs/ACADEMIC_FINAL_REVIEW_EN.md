# Homework 5 — Academic Final Review and Oral Discussion

## Exercise 1 — Riemann versus Lebesgue integration

Riemann sums divide the domain into subintervals and approximate area using function values at sample points. The software implements left, right and midpoint sums. For smooth functions, finer partitions generally reduce the error; midpoint sums can be substantially more accurate than endpoint sums for the same number of subintervals.

Lebesgue integration partitions the range of function values, measures their preimages in the domain, and combines each value level with its preimage measure. For a bounded nonnegative function, the application approximates this idea with value bins. It samples the domain at cell midpoints to estimate the measure of each preimage. **This is not an exact Lebesgue integral algorithm for arbitrary measurable functions.** The lower and upper displayed values bracket a sampled, quantized representation, not necessarily the true integral.

### Analytical reference cases

| Function and domain | Exact integral | Notes |
|---|---:|---|
| x² on [0,1] | 1/3 | continuous |
| sin(x) on [0,pi] | 2 | continuous |
| 1 for x<0.5, 3 otherwise on [0,1] | 2 | one discontinuity |
| |x-0.5| on [0,1] | 1/4 | continuous, corner |
| 1 for x<0.5, 0 otherwise on [0,1] | 1/2 | one discontinuity |
| sin(x)/x on [0,pi] | Si(pi) ≈ 1.851937051982466 | define f(0)=1 by continuity |
| 1/sqrt(x) on (0,1] | 2 | improper Riemann and Lebesgue integral |

For Riemann-integrable functions, the Lebesgue integral exists and has the same value. The two numerical schemes need not converge at the same speed, because their discretization parameters and preimage-estimation errors differ.

### Pathological functions

Dirichlet's indicator of the rationals is discontinuous everywhere. Every nonempty subinterval contains rational and irrational numbers, so its Riemann lower sums are 0 and upper sums are 1. It is not Riemann-integrable. The rationals are countable and have Lebesgue measure zero, so its Lebesgue integral on [0,1] is 0.

Thomae's function equals 1/q at a rational p/q in lowest terms and 0 at irrational points. It is continuous at irrational points and discontinuous at rationals. It is Riemann-integrable with integral 0 and also Lebesgue-integrable with integral 0. Floating-point sampling cannot correctly decide rationality of arbitrary real inputs; these results are therefore demonstrated analytically.

### Unbounded function and monotone convergence

Let f(x)=1/sqrt(x) on (0,1] and f_M(x)=min(f(x),M), M>=1. On (0,1/M²], f_M=M; elsewhere f_M=1/sqrt(x). Therefore

integral_0^1 f_M(x)dx = M(1/M²) + 2(1-1/M) = 2-1/M.

As M increases, f_M(x) increases pointwise to f(x), and the Monotone Convergence Theorem yields integral f = lim_M (2-1/M)=2. The UI separately displays the exact truncated value and a sampled value-bin estimate. The latter can be nonmonotonic because of discretization.

### Experimental convergence design

Hold domain samples at 16,384 while varying value levels 8, 16, 32, 64, 128. Then hold value levels at 64 while varying domain samples 1,024, 4,096, 16,384, 65,536. Record absolute error against the analytical integral. Increasing the value-level count decreases quantization width, but does not remove preimage sampling error. Increasing domain samples refines preimage estimates, but does not remove value quantization error. Absolute error need not decrease monotonically for every finite setting.

## Exercise 2 — Standard normal CDF

For Z~N(0,1), Phi(x)=P(Z<=x)=integral_-infinity^x exp(-t²/2)/sqrt(2pi) dt. By symmetry Phi(x)=1/2 + integral_0^x phi(t)dt. This avoids arbitrary truncation of the lower infinite integration bound in the numerical quadrature.

The Gaussian density has no elementary antiderivative. Liouville's theorem on elementary integration underlies this statement; it does not imply that the integral has no exact representation. The error function erf(z)=2/sqrt(pi) integral_0^z exp(-t²)dt gives the exact identity Phi(x)=(1+erf(x/sqrt(2)))/2. Computing erf numerically still requires an algorithm.

Implemented approaches: composite trapezoidal rule, composite Simpson's rule (even number of subintervals), Taylor series for erf, and Abramowitz–Stegun polynomial erf approximation. Tabulated reference values are independent of the compared algorithms.

### Representative numerical result at x=1

Reference Phi(1)≈0.8413447460685429. With 100 integration partitions and 100 Taylor terms, the user-observed results were approximately:

| Method | Absolute error | Median runtime / call on user's machine |
|---|---:|---:|
| Trapezoidal | 2.016e-6 | 0.006 ms |
| Simpson | 2.688e-11 | 0.005 ms |
| Taylor | 1.110e-16 | 0.002 ms |
| erf approximation | 9.901e-9 | 0.001 ms |

These runtimes are illustrative measurements from one browser session, not universal algorithmic rankings. Simpson achieves far smaller error than trapezoidal for the same number of PDF evaluations. Taylor is exceptionally accurate near x=1 but may lose stability for large |x| because alternating terms cancel. The fixed erf approximation is fast but has a finite approximation error.

## Overall conclusions

1. Riemann and Lebesgue integration agree on Riemann-integrable functions, but Lebesgue also integrates some functions that are not Riemann-integrable.
2. Numerical level-set grouping illustrates Lebesgue's definition but cannot compute exact preimage measures for arbitrary measurable sets using floating-point sampling.
3. Accuracy, convergence and computational efficiency depend on the function, numerical method and discretization parameters; there is no single universally best method.
4. The standard normal CDF admits an exact special-function representation using erf, even though it lacks an elementary antiderivative.
5. Reliable numerical conclusions require independent reference values, transparent error measures, repeated benchmarks and discussion of stability limitations.

## Suggested oral explanation

"In the first exercise, I compared domain partitioning, which is the Riemann approach, with value-range partitioning, which is inspired by Lebesgue integration. I tested continuous, discontinuous, improper and pathological functions. I explicitly distinguish exact mathematical results from approximations based on finite sampling. In the second exercise, I implemented four methods for computing the standard normal CDF. I compared their accuracy against tabulated references, analyzed convergence and benchmarked runtime. The main conclusion is that mathematical correctness, numerical accuracy and computational efficiency are related but distinct properties."
