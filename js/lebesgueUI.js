import {functions} from './functions/standardFunctions.js';
import {levelSetIntegral} from './integration/lebesgue.js';
import {pathologicalCases} from './functions/pathologicalFunctions.js';
import {riemannSum} from './integration/riemann.js';
import {improperLebesgue,truncationStudy,levelConvergenceStudy,sampleConvergenceStudy} from './integration/improperLebesgue.js';
import {downloadCsv} from './utils/csv.js';
const $=id=>document.getElementById(id);
const select=$('leb-function');
for(const [key,f] of Object.entries(functions)){
 if(key==='inverseSqrt')continue; // separate truncation experiment below
 const o=document.createElement('option');o.value=key;o.textContent=f.label;select.append(o);
}
select.value='square';let last;
function makeChart(bins){
 const svg=$('leb-chart'),ns='http://www.w3.org/2000/svg';svg.replaceChildren();svg.setAttribute('viewBox','0 0 700 220');
 const shown=bins.slice(0,64),max=Math.max(1e-15,...shown.map(b=>b.measure));
 for(let i=0;i<shown.length;i++){
  const r=document.createElementNS(ns,'rect');r.setAttribute('x',String(36+i*630/shown.length));r.setAttribute('y',String(185-160*shown[i].measure/max));r.setAttribute('width',String(Math.max(.5,630/shown.length-1)));r.setAttribute('height',String(160*shown[i].measure/max));r.setAttribute('fill','#14b8a6');r.setAttribute('opacity','.7');svg.append(r);
 }
 const t=document.createElementNS(ns,'text');t.setAttribute('x','36');t.setAttribute('y','210');t.setAttribute('fill','#a7b6cc');t.setAttribute('font-size','12');t.textContent='Function-value bins →';svg.append(t);
}
function render(){
 const f=functions[select.value],levels=Number($('leb-levels').value),samples=Number($('leb-samples').value);
 $('leb-level-value').textContent=levels;
 const result=levelSetIntegral(f.fn,f.a,f.b,levels,samples);
 $('leb-exact').textContent=f.exact.toFixed(10);$('leb-lower').textContent=result.lower.toFixed(10);$('leb-upper').textContent=result.upper.toFixed(10);$('leb-estimate').textContent=result.estimate.toFixed(10);
 $('leb-note').textContent=`Value-bin width: ${result.binWidth.toPrecision(4)}. Approximate preimage measures use ${samples.toLocaleString()} domain samples. For discontinuous functions, grid alignment can affect the result.`;
 makeChart(result.bins);
 const comparison=[['Lebesgue lower',result.lower],['Lebesgue upper',result.upper],['Lebesgue midpoint',result.estimate],['Riemann midpoint',riemannSum(f.fn,f.a,f.b,levels,'midpoint')]];
 $('leb-comparison').replaceChildren();for(const [name,value] of comparison){const tr=document.createElement('tr');for(const cell of [name,value.toFixed(10),Math.abs(value-f.exact).toExponential(3)]){const td=document.createElement('td');td.textContent=cell;tr.append(td)}$('leb-comparison').append(tr)}
 last={f,levels,samples,result};
}
function pathology(){const x=pathologicalCases[$('pathological').value];$('path-label').textContent=x.label;$('path-riemann').textContent=x.riemann;$('path-lebesgue').textContent=x.lebesgue.toString();$('path-reason').textContent=x.reason;}
for(const id of ['leb-function','leb-levels','leb-samples'])$(id).addEventListener('input',render);
$('pathological').addEventListener('change',pathology);
$('leb-export').addEventListener('click',()=>{const {f,levels,samples,result}=last;downloadCsv('homework5-lebesgue-levelsets.csv',[['Homework','5'],['Function',f.label],['Value levels',levels],['Domain samples',samples],['Lower',result.lower],['Upper',result.upper],[],['value_from','value_to','sample_count','estimated_preimage_measure'],...result.bins.map(b=>[b.from,b.to,b.count,b.measure])]);});
$('tab-riemann').addEventListener('click',()=>show('riemann'));
$('tab-lebesgue').addEventListener('click',()=>show('lebesgue'));
$('tab-cdf').addEventListener('click',()=>show('cdf'));
$('tab-analysis').addEventListener('click',()=>show('analysis'));
$('tab-conclusions').addEventListener('click',()=>show('conclusions'));
function show(which){for(const name of ['riemann','lebesgue','cdf','analysis','conclusions']){$(`${name}-lab`).hidden=name!==which;$(`tab-${name}`).classList.toggle('active',name===which);}}
render();pathology();

// Academic review: independent value-level and domain-sample convergence experiments.
const convergenceFunction=$('leb-conv-function');
for(const [key,f] of Object.entries(functions)){
 if(key==='inverseSqrt')continue;
 const option=document.createElement('option');option.value=key;option.textContent=f.label;convergenceFunction.append(option);
}
convergenceFunction.value='square';
function rowsToTable(id,rows){
 const body=$(id);body.replaceChildren();
 for(const row of rows){
  const tr=document.createElement('tr');
  for(const val of row){const td=document.createElement('td');td.textContent=String(val);tr.append(td);}
  body.append(tr);
 }
}
function renderConvergence(){
 const f=functions[convergenceFunction.value];
 const levels=levelConvergenceStudy(f.fn,f.a,f.b,f.exact,[8,16,32,64,128],16384);
 const samples=sampleConvergenceStudy(f.fn,f.a,f.b,f.exact,64,[1024,4096,16384,65536]);
 rowsToTable('leb-level-study',levels.map(r=>[r.levels,r.estimate.toFixed(9),r.error.toExponential(3)]));
 rowsToTable('leb-sample-study',samples.map(r=>[r.samples.toLocaleString(),r.estimate.toFixed(9),r.error.toExponential(3)]));
}
convergenceFunction.addEventListener('change',renderConvergence);
renderConvergence();
function renderImproper(){
 const M=Number($('leb-truncation').value),levels=Number($('leb-improper-levels').value),samples=Number($('leb-improper-samples').value);
 const r=improperLebesgue(M,levels,samples);
 $('leb-truncation-value').textContent=M;
 $('leb-improper-result').textContent=r.estimate.toFixed(9);
 $('leb-improper-reference').textContent=r.truncatedExact.toFixed(9);
 $('leb-improper-gap').textContent=r.truncationError.toFixed(6);
 $('leb-improper-note').textContent=`Sampled value-level estimate for min(1/√x, ${M}). The exact truncated integral is 2 − 1/${M}; the original Lebesgue integral is 2. Level/sample discretization can cause non-monotone numerical estimates even though the exact truncated integrals increase monotonically.`;
 rowsToTable('leb-truncation-study',truncationStudy(levels,samples).map(row=>[row.M,row.truncatedExact.toFixed(6),row.estimate.toFixed(6),row.samplingAndLevelError.toExponential(2)]));
}
for(const id of ['leb-truncation','leb-improper-levels','leb-improper-samples'])$(id).addEventListener('input',renderImproper);
renderImproper();
