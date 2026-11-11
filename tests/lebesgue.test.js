import test from 'node:test';import assert from 'node:assert/strict';
import {levelSetIntegral} from '../js/integration/lebesgue.js';
import {functions} from '../js/functions/standardFunctions.js';
import {pathologicalCases} from '../js/functions/pathologicalFunctions.js';
test('constant level sets bracket integral',()=>{const r=levelSetIntegral(()=>2,0,1,20,1024,2);assert.ok(r.lower<=2&&r.upper>=2);assert.ok(r.upper-r.lower<=.101);});
test('square function: bounds bracket numerical integral approximately',()=>{const r=levelSetIntegral(functions.square.fn,0,1,128,32768,1);assert.ok(r.lower<1/3&&r.upper>1/3);assert.ok(Math.abs(r.estimate-1/3)<.005);});
test('step function: estimate approaches 2',()=>{const r=levelSetIntegral(functions.step13.fn,0,1,200,16384,3);assert.ok(Math.abs(r.estimate-2)<.01);});
test('pathological classification',()=>{assert.equal(pathologicalCases.dirichlet.lebesgue,0);assert.equal(pathologicalCases.thomae.riemann,'Riemann-integrable');});
test('reject negative values',()=>assert.throws(()=>levelSetIntegral(()=>-1,0,1,10,100),RangeError));
