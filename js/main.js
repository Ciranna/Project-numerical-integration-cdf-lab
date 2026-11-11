import {functions,getFunction} from './functions/standardFunctions.js';
import {evaluateAll} from './integration/riemann.js';
import {convergenceStudy} from './integration/convergence.js';
import {functionChart,convergenceChart} from './charts/svgCharts.js';
import {downloadCsv} from './utils/csv.js';
const $=id=>document.getElementById(id);
const select=$('function');for(const [key,f] of Object.entries(functions)){const option=document.createElement('option');option.value=key;option.textContent=f.label;select.append(option);}
let current=null;
function render(){
 const f=getFunction(select.value),n=Number($('partitions').value),method=$('method').value;
 $('n-value').textContent=n.toLocaleString('en-US');$('function-note').textContent=f.note;
 const values=evaluateAll(f.fn,f.a,f.b,n),value=values[method],series=convergenceStudy(f,method);
 $('exact').textContent=f.exact.toFixed(10);$('approx').textContent=value===null?'Not applicable':value.toFixed(10);
 $('error').textContent=value===null?'—':Math.abs(value-f.exact).toExponential(3);
 $('interval').textContent=`[${f.a.toFixed(3)}, ${f.b.toFixed(3)}]`;
 $('warning').textContent=f===functions.inverseSqrt?'Improper integral: left endpoint rule is undefined; midpoint is an approximation of the improper integral.':'';
 functionChart($('function-chart'),f,n,method);convergenceChart($('convergence-chart'),series);
 $('comparison').replaceChildren();for(const name of ['left','right','midpoint']){const tr=document.createElement('tr');const val=values[name];for(const cell of [name,val===null?'N/A':val.toFixed(10),val===null?'N/A':Math.abs(val-f.exact).toExponential(3)]){const td=document.createElement('td');td.textContent=cell;tr.append(td);} $('comparison').append(tr);}
 current={f,n,method,values,series};
}
select.value='square';$('partitions').addEventListener('input',render);select.addEventListener('change',render);$('method').addEventListener('change',render);
$('export').addEventListener('click',()=>{if(!current)return;const {f,method,series}=current;downloadCsv('homework5-riemann-results.csv', [['Homework','5'],['Function',f.label],['Method',method],['Exact',f.exact],[],['n','approximation','absolute_error'],...series.map(x=>[x.n,x.value,x.error])]);});
render();
import './lebesgueUI.js';

import './probability/cdfUI.js';

import './analysis/analysisUI.js';
