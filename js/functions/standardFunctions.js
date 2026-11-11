/** Functions and exact reference values for Homework 5, Exercise 1. */
const siPi = 1.85193705198246617036;
export const functions = {
  square: {label:'x²', a:0, b:1, fn:x=>x*x, exact:1/3, note:'Continuous polynomial.'},
  sine: {label:'sin(x)', a:0, b:Math.PI, fn:Math.sin, exact:2, note:'Smooth function.'},
  step13: {label:'1 if x < 0.5, otherwise 3', a:0, b:1, fn:x=>x<.5?1:3, exact:2, note:'Single jump discontinuity.'},
  absolute: {label:'|x − 0.5|', a:0, b:1, fn:x=>Math.abs(x-.5), exact:.25, note:'Continuous, with a corner at 0.5.'},
  step10: {label:'1 if x < 0.5, otherwise 0', a:0, b:1, fn:x=>x<.5?1:0, exact:.5, note:'Single jump discontinuity.'},
  sinc: {label:'sin(x)/x', a:0, b:Math.PI, fn:x=>x===0?1:Math.sin(x)/x, exact:siPi, note:'Removable singularity at zero, defined by continuity.'},
  inverseSqrt: {label:'1/√x (improper)', a:0, b:1, fn:x=>x===0?Infinity:1/Math.sqrt(x), exact:2, note:'Improper integral: unbounded near zero. Midpoint approximation is finite; endpoint rules are not directly valid.'}
};
export function getFunction(key){if(!(key in functions))throw new RangeError('Unknown function');return functions[key];}
