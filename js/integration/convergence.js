import {riemannSum} from './riemann.js';
export function convergenceStudy(f,method='midpoint',sizes=[4,8,16,32,64,128,256,512]){
 return sizes.map(n=>{
  try{const value=riemannSum(f.fn,f.a,f.b,n,method);return {n,value,error:Math.abs(value-f.exact)};}
  catch{return {n,value:null,error:null};}
 });
}
