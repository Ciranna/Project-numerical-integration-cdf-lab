import {levelSetIntegral} from './lebesgue.js';
/** Monotone truncation f_M(x)=min(x^-1/2,M), x in (0,1]. */
export function truncatedInverseSqrt(M){
 if(!Number.isFinite(M)||M<1)throw new RangeError('Truncation M must be >= 1');
 return x=>x<=0?M:Math.min(1/Math.sqrt(x),M);
}
export function improperLebesgue(M=16,levels=64,samples=16384){
 const f=truncatedInverseSqrt(M);
 const r=levelSetIntegral(f,0,1,levels,samples,M);
 return {...r,M,truncatedExact:2-1/M,fullExact:2,
  truncationError:1/M,samplingAndLevelError:Math.abs(r.estimate-(2-1/M))};
}
export function truncationStudy(levels=128,samples=16384){
 return [2,4,8,16,32,64].map(M=>improperLebesgue(M,levels,samples));
}
export function levelConvergenceStudy(fn,a,b,exact,levelCounts=[8,16,32,64,128],samples=16384,upperBound=null){
 return levelCounts.map(levels=>{
  const r=levelSetIntegral(fn,a,b,levels,samples,upperBound);
  return {levels,samples,estimate:r.estimate,error:Math.abs(r.estimate-exact),binWidth:r.binWidth};
 });
}
export function sampleConvergenceStudy(fn,a,b,exact,levels=64,sampleCounts=[1024,4096,16384,65536],upperBound=null){
 return sampleCounts.map(samples=>{
  const r=levelSetIntegral(fn,a,b,levels,samples,upperBound);
  return {levels,samples,estimate:r.estimate,error:Math.abs(r.estimate-exact),binWidth:r.binWidth};
 });
}
