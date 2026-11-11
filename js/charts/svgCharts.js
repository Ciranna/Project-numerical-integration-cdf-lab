const NS='http://www.w3.org/2000/svg';
function el(tag,attrs={},parent){const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));if(parent)parent.appendChild(n);return n;}
function text(parent,x,y,value,attrs={}){const t=el('text',{x,y,fill:'currentColor','font-size':11,...attrs},parent);t.textContent=value;return t;}
function clear(svg){svg.replaceChildren();svg.setAttribute('viewBox','0 0 720 310');}
export function functionChart(svg,f,n,method){
 clear(svg);const W=720,H=310,l=55,r=18,t=16,b=42,plotW=W-l-r,plotH=H-t-b;
 const sample=Array.from({length:401},(_,i)=>{const x=f.a+(f.b-f.a)*i/400;return {x,y:f.fn(x)};}).filter(v=>Number.isFinite(v.y));
 let ymin=Math.min(0,...sample.map(v=>v.y)),ymax=Math.max(0,...sample.map(v=>v.y));if(ymax-ymin<1e-12)ymax=ymin+1;
 const yRange=ymax-ymin; ymin-=.06*yRange;ymax+=.06*yRange;
 const X=x=>l+(x-f.a)/(f.b-f.a)*plotW,Y=y=>t+(ymax-y)/(ymax-ymin)*plotH;
 for(let i=0;i<=4;i++){const v=ymin+(ymax-ymin)*i/4;el('line',{x1:l,y1:Y(v),x2:W-r,y2:Y(v),stroke:'currentColor','stroke-opacity':.11},svg);text(svg,l-9,Y(v)+4,v.toFixed(2),{'text-anchor':'end'});}
 const shown=Math.min(n,250);const h=(f.b-f.a)/shown,offset=method==='left'?0:method==='right'?1:.5;
 for(let i=0;i<shown;i++){
 const x0=f.a+i*h,y=f.fn(x0+offset*h);
 if(!Number.isFinite(y))continue;
 const baseline=Y(0),yy=Y(y);
 el('rect',{x:X(x0),y:Math.min(yy,baseline),width:plotW/shown,height:Math.max(0.2,Math.abs(baseline-yy)),fill:'#14b8a6','fill-opacity':.24,stroke:'#0f766e','stroke-opacity':.65,'stroke-width':.6},svg);
 }
 let d='';for(const {x,y} of sample)d+=`${d?'L':'M'}${X(x).toFixed(2)},${Y(y).toFixed(2)} `;
 el('path',{d,fill:'none',stroke:'#60a5fa','stroke-width':2.5},svg);
 el('line',{x1:l,y1:Y(0),x2:W-r,y2:Y(0),stroke:'currentColor','stroke-opacity':.5},svg);
 text(svg,l,H-14,f.a.toFixed(2));text(svg,W-r,H-14,f.b.toFixed(2),{'text-anchor':'end'});
 if(n>250)text(svg,W-20,25,'Showing 250 rectangles (calculation uses full n)',{'text-anchor':'end','font-size':12});
}
export function convergenceChart(svg,series){
 clear(svg);const W=720,H=310,l=60,r=20,t=20,b=45,pw=W-l-r,ph=H-t-b;
 const data=series.filter(v=>v.error!==null);if(!data.length)return;
 const minN=Math.log2(data[0].n),maxN=Math.log2(data[data.length-1].n);
 const errors=data.map(v=>Math.max(v.error,1e-16));const minE=Math.floor(Math.log10(Math.min(...errors)))-.2,maxE=Math.max(-1,Math.ceil(Math.log10(Math.max(...errors)))+.2);
 const X=n=>l+(Math.log2(n)-minN)/Math.max(1,maxN-minN)*pw;
 const Y=e=>t+(maxE-Math.log10(Math.max(e,1e-16)))/Math.max(.1,maxE-minE)*ph;
 for(let i=0;i<=4;i++){const power=minE+(maxE-minE)*i/4;const y=Y(10**power);el('line',{x1:l,y1:y,x2:W-r,y2:y,stroke:'currentColor','stroke-opacity':.12},svg);text(svg,l-9,y+4,`1e${power.toFixed(1)}`,{'text-anchor':'end'});}
 let d='';for(const v of data)d+=`${d?'L':'M'}${X(v.n)},${Y(v.error)} `;
 el('path',{d,fill:'none',stroke:'#14b8a6','stroke-width':2.5},svg);
 for(const v of data){el('circle',{cx:X(v.n),cy:Y(v.error),r:4,fill:'#14b8a6'},svg);text(svg,X(v.n),H-18,String(v.n),{'text-anchor':'middle'});}
 text(svg,W/2,H-2,'Number of partitions (n)',{'text-anchor':'middle'});
}
