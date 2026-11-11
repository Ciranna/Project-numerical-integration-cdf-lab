/** Mathematical facts, not floating-point rationality tests. */
export const pathologicalCases={
 dirichlet:{label:'Dirichlet: 1 on rationals, 0 on irrationals',riemann:'Not Riemann-integrable',lebesgue:0,reason:'Every interval contains rational and irrational points. Lower Darboux sums are 0 and upper sums are 1. Rationals are countable and have Lebesgue measure zero.'},
 thomae:{label:'Thomae: 1/q for reduced p/q, 0 on irrationals',riemann:'Riemann-integrable',lebesgue:0,reason:'Continuous at every irrational and discontinuous at every rational. The discontinuity set has measure zero; the Riemann and Lebesgue integrals are both zero.'}
};
/** Rational-grid demonstration: NOT an integral estimate. */
export function dirichletRationalGrid(n){if(!Number.isInteger(n)||n<1)throw new RangeError('n');return {gridValue:1,lowerDarboux:0,upperDarboux:1};}
