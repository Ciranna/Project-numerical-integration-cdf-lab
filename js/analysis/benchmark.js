import {cdfTrapezoid,cdfSimpson,cdfTaylor,cdfErfApprox,referenceCDF,REFERENCES} from '../probability/normalCDF.js';
import {functions} from '../functions/standardFunctions.js';
import {riemannSum} from '../integration/riemann.js';
import {levelSetIntegral} from '../integration/lebesgue.js';

export const CDF_METHODS=Object.freeze({trapezoid:(x,n)=>cdfTrapezoid(x,n),simpson:(x,n)=>cdfSimpson(x,n),taylor:(x,n)=>cdfTaylor(x,n),erf:x=>cdfErfApprox(x)});
export function evaluationCount(method,parameter){if(method==='trapezoid'||method==='simpson')return parameter+1;if(method==='taylor')return parameter; if(method==='erf')return 1;throw new RangeError('Unknown method');}
export function median(numbers){if(!numbers.length)throw new RangeError('Empty sample');const sorted=[...numbers].sort((a,b)=>a-b),mid=Math.floor(sorted.length/2);return sorted.length%2?sorted[mid]:(sorted[mid-1]+sorted[mid])/2;}
/** Warm-up then measure batches to reduce timer quantization; median of batches.
 * Clock injection permits deterministic tests. Time depends on hardware and browser.
 */
export function benchmark(fn,{repetitions=7,batchSize=100,clock=()=>performance.now()}={}){
 if(typeof fn!=='function'||!Number.isSafeInteger(repetitions)||repetitions<1||repetitions>100||!Number.isSafeInteger(batchSize)||batchSize<1||batchSize>100000)throw new RangeError('Invalid benchmark settings');
 for(let i=0;i<Math.min(100,batchSize);i++)fn();
 const durations=[];let checksum=0;
 for(let r=0;r<repetitions;r++){const start=clock();for(let i=0;i<batchSize;i++)checksum+=fn();const elapsed=clock()-start;if(!Number.isFinite(elapsed)||elapsed<0)throw new RangeError('Invalid clock');durations.push(elapsed/batchSize);}
 return {medianMs:median(durations),minMs:Math.min(...durations),maxMs:Math.max(...durations),repetitions,batchSize,checksum};
}
export function cdfBenchmark(x,parameter,{repetitions=7,batchSize=200,clock}={}){
 if(!Number.isFinite(x)||!Number.isSafeInteger(parameter)||parameter<2||parameter>500)throw new RangeError('Invalid x or parameter');
 const reference=referenceCDF(x);
 return Object.entries(CDF_METHODS).map(([method,fn])=>{const count=method==='erf'?1:parameter;const estimate=fn(x,count);const timing=benchmark(()=>fn(x,count),{repetitions,batchSize,...(clock?{clock}:{})});return {method,parameter:count,evaluations:evaluationCount(method,count),estimate,reference,error:reference===null?null:Math.abs(estimate-reference),...timing};});
}
export function cdfAccuracyGrid(points=[-4,-3,-2,-1,0,1,2,3,4],parameter=100){
 if(!Number.isSafeInteger(parameter)||parameter<2||parameter>500||parameter%2)throw new RangeError('Even parameter 2..500 required');
 return points.map(x=>{const ref=referenceCDF(x);if(ref===null)throw new RangeError('Point not tabulated');const row={x,reference:ref};for(const [name,fn] of Object.entries(CDF_METHODS)){const value=fn(x,parameter);row[name]=value;row[name+'Error']=Math.abs(value-ref);}return row;});
}
export function integrationBenchmark(key,parameter,{repetitions=7,batchSize=20,clock}={}){
 const f=functions[key];if(!f||key==='inverseSqrt'||!Number.isSafeInteger(parameter)||parameter<2||parameter>256)throw new RangeError('Choose bounded function and parameter 2..256');
 const n=parameter,samples=4096;
 const methods=[{method:'Riemann midpoint',evaluations:n,fn:()=>riemannSum(f.fn,f.a,f.b,n,'midpoint')},{method:'Lebesgue level sets',evaluations:samples,fn:()=>levelSetIntegral(f.fn,f.a,f.b,n,samples).estimate}];
 return methods.map(({method,evaluations,fn})=>{const estimate=fn(),timing=benchmark(fn,{repetitions,batchSize,...(clock?{clock}:{})});return {method,parameter:n,evaluations,estimate,reference:f.exact,error:Math.abs(estimate-f.exact),...timing};});
}
export function cdfStabilityGrid(parameter=100){return cdfAccuracyGrid(REFERENCES.map(r=>r.x),parameter);}
