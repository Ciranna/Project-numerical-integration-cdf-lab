/** Level-set (range partition) approximation for bounded, nonnegative functions.
 * Cell midpoint sampling approximates the Lebesgue measure of each preimage.
 * Thus this is a numerical demonstration, not an exact measure computation.
 */
export function levelSetIntegral(fn,a,b,levels=32,samples=8192,upperBound=null){
 if(!(b>a)||!Number.isInteger(levels)||levels<1||!Number.isInteger(samples)||samples<1)throw new RangeError('Invalid parameters');
 const values=new Float64Array(samples);let max=0;
 for(let j=0;j<samples;j++){
  const y=fn(a+(j+.5)*(b-a)/samples);
  if(!Number.isFinite(y)||y<0)throw new RangeError('Requires bounded nonnegative samples');
  values[j]=y;max=Math.max(max,y);
 }
 const top=upperBound??max;
 if(!Number.isFinite(top)||top<max)throw new RangeError('Upper bound must cover sampled values');
 if(top===0)return {lower:0,upper:0,estimate:0,binWidth:0,bins:[],samples,levels};
 const h=top/levels,counts=new Uint32Array(levels);
 for(const y of values){const k=Math.min(levels-1,Math.floor(y/h));counts[k]++;}
 let lower=0,upper=0;
 const bins=Array.from(counts,(count,k)=>{
  const measure=(b-a)*count/samples;
  lower+=k*h*measure;upper+=(k+1)*h*measure;
  return {from:k*h,to:(k+1)*h,count,measure};
 });
 return {lower,upper,estimate:(lower+upper)/2,binWidth:h,bins,samples,levels};
}
