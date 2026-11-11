import test from 'node:test';
import assert from 'node:assert/strict';
import {truncatedInverseSqrt,improperLebesgue,truncationStudy,levelConvergenceStudy,sampleConvergenceStudy} from '../js/integration/improperLebesgue.js';
import {functions} from '../js/functions/standardFunctions.js';

test('truncated inverse square root respects the cap',()=>{
 const f=truncatedInverseSqrt(8);
 assert.equal(f(0),8);assert.equal(f(1/256),8);assert.equal(f(1),1);
});
test('invalid truncation rejected',()=>assert.throws(()=>truncatedInverseSqrt(.5),RangeError));
test('exact truncated integral converges monotonically to 2',()=>{
 const r=truncationStudy(32,4096);
 for(let i=1;i<r.length;i++)assert.ok(r[i].truncatedExact>r[i-1].truncatedExact);
 assert.equal(r.at(-1).truncatedExact,2-1/64);
});
test('numerical improper estimate approaches exact truncated value',()=>{
 const r=improperLebesgue(8,256,65536);
 assert.ok(Math.abs(r.estimate-r.truncatedExact)<.02);
});
test('value-level convergence table has expected structure',()=>{
 const f=functions.square;
 const r=levelConvergenceStudy(f.fn,f.a,f.b,f.exact,[8,16,32],16384);
 assert.equal(r.length,3);assert.ok(r[2].binWidth<r[0].binWidth);
});
test('domain-sample convergence table has expected structure',()=>{
 const f=functions.square;
 const r=sampleConvergenceStudy(f.fn,f.a,f.b,f.exact,64,[1024,4096]);
 assert.deepEqual(r.map(x=>x.samples),[1024,4096]);
});
