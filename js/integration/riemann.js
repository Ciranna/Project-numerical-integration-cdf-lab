/** Uniform-partition Riemann quadrature. The inverse-square-root case is improper. */
export function riemannSum(fn,a,b,n,method='midpoint'){
 if(typeof fn!=='function'||!Number.isFinite(a)||!Number.isFinite(b)||!(b>a)) throw new TypeError('Invalid function or interval');
 if(!Number.isSafeInteger(n)||n<1||n>1000000) throw new RangeError('n must be an integer from 1 to 1,000,000');
 if(!['left','right','midpoint'].includes(method))throw new RangeError('Invalid method');
 const h=(b-a)/n;
 const offset=method==='left'?0:method==='right'?1:.5;
 let sum=0;
 for(let i=0;i<n;i++){
  const y=fn(a+(i+offset)*h);
  if(!Number.isFinite(y))throw new RangeError('Non-finite function value: endpoint rule not applicable for this function');
  sum+=y;
 }
 return sum*h;
}
export function evaluateAll(fn,a,b,n){
 const result={};
 for(const method of ['left','right','midpoint']){
  try{result[method]=riemannSum(fn,a,b,n,method)}catch{result[method]=null}
 }
 return result;
}
