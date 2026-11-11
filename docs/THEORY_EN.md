# Homework 5 — Phase 1 Theory

For a bounded Riemann-integrable function on [a,b], uniform-partition sums approximate the integral by summing rectangle areas. For n subintervals, the width is h=(b-a)/n. Left, right and midpoint methods sample f at a+ih, a+(i+1)h and a+(i+1/2)h, respectively. The absolute error is |I_n-I_exact|.

The midpoint method is second-order for sufficiently smooth functions, while left and right rules are generally first-order. A jump discontinuity does not prevent Riemann integrability when there are only finitely many jumps. The integral of 1/sqrt(x) on (0,1] is improper and equals 2; endpoint evaluation at zero is not defined.

The Lebesgue comparison and the normal CDF will be implemented in subsequent phases. Numerical sampling alone cannot faithfully identify all rational versus irrational inputs in Dirichlet's function.
