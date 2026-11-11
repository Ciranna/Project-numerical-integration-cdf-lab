// Homework 5, Exercise 2. Pure, dependency-free numerical algorithms.
export const SQRT2=Math.SQRT2;
export const INV_SQRT_2PI=1/Math.sqrt(2*Math.PI);
export function normalPDF(x){if(!Number.isFinite(x))throw new RangeError('x must be finite');return Math.exp(-x*x/2)*INV_SQRT_2PI;}
function validate(x,n){if(!Number.isFinite(x))throw new RangeError('x must be finite');if(!Number.isSafeInteger(n)||n<2||n>1000000)throw new RangeError('n must be an integer in [2, 1000000]');}
// Phi(x) = 1/2 + integral_0^x phi(t) dt. Symmetry removes the infinite integration limit.
export function cdfTrapezoid(x,n=100){validate(x,n);if(x===0)return .5;const a=Math.abs(x),h=a/n;let sum=(normalPDF(0)+normalPDF(a))/2;for(let i=1;i<n;i++)sum+=normalPDF(i*h);const value=.5+Math.sign(x)*h*sum;return Math.max(0,Math.min(1,value));}
export function cdfSimpson(x,n=100){validate(x,n);if(n%2!==0)throw new RangeError('Simpson requires an even n');if(x===0)return .5;const a=Math.abs(x),h=a/n;let sum=normalPDF(0)+normalPDF(a);for(let i=1;i<n;i++)sum+=(i%2?4:2)*normalPDF(i*h);return Math.max(0,Math.min(1,.5+Math.sign(x)*h*sum/3));}
// erf(z) = 2/sqrt(pi) * sum (-1)^k z^(2k+1)/(k! (2k+1)).
// Recurrence avoids factorial overflow. Alternating cancellation limits large-|z| accuracy.
export function erfTaylor(z,terms=30){if(!Number.isFinite(z))throw new RangeError('z must be finite');if(!Number.isSafeInteger(terms)||terms<1||terms>500)throw new RangeError('terms must be 1..500');let term=z,sum=z;for(let k=1;k<terms;k++){term*=(-z*z)/k;sum+=term/(2*k+1);}return 2*sum/Math.sqrt(Math.PI);}
export function cdfTaylor(x,terms=30){if(!Number.isFinite(x))throw new RangeError('x must be finite');const v=.5*(1+erfTaylor(x/SQRT2,terms));return v;}
// Abramowitz & Stegun 7.1.26; maximum absolute erf error ~1.5e-7.
export function erfApprox(z){if(!Number.isFinite(z))throw new RangeError('z must be finite');const s=Math.sign(z),a=Math.abs(z),t=1/(1+0.3275911*a);const p=(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t;return s*(1-p*Math.exp(-a*a));}
export function cdfErfApprox(x){if(!Number.isFinite(x))throw new RangeError('x must be finite');return .5*(1+erfApprox(x/SQRT2));}
export const REFERENCES=Object.freeze([
 {x:-4,cdf:0.00003167124183311992},{x:-3,cdf:0.0013498980316300959},
 {x:-2,cdf:0.022750131948179195},{x:-1,cdf:0.15865525393145707},
 {x:-.5,cdf:0.3085375387259869},{x:0,cdf:.5},
 {x:.5,cdf:0.6914624612740131},{x:1,cdf:0.8413447460685429},
 {x:2,cdf:0.9772498680518208},{x:3,cdf:0.9986501019683699},
 {x:4,cdf:0.9999683287581669}
]);
export function referenceCDF(x){const row=REFERENCES.find(r=>r.x===x);return row?row.cdf:null;}
export function evaluateCDF(x,{partitions=100,terms=30}={}){return {trapezoid:cdfTrapezoid(x,partitions),simpson:cdfSimpson(x,partitions),taylor:cdfTaylor(x,terms),erf:cdfErfApprox(x)};}
