import{M as f,N as d,P as l,S as s,T as u,U as h,V as C,Y as g,Z as M,g as r,i as c,j as i,r as m,s as p,t as a}from"./chunk-JCXBWQ2B.js";var N=[{path:"home",component:u},{path:"about",component:h},{path:"contact",component:C},{path:"countries",loadChildren:()=>import("./chunk-LVMS2K53.js").then(o=>o.CountriesModule)},{path:"**",redirectTo:"home"}],y=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i({type:t}),t.\u0275inj=r({imports:[s.forRoot(N),s]});let o=t;return o})();var v=(()=>{let t=class t{constructor(){this.title="country-app"}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c({type:t,selectors:[["app-root"]],decls:5,vars:0,consts:[[1,"row","mt-4"],[1,"col-3"],[1,"col"]],template:function(e,j){e&1&&(m(0,"div",0)(1,"div",1),a(2,"shared-sidebar"),p(),m(3,"div",2),a(4,"router-outlet"),p()())},dependencies:[l,g]});let o=t;return o})();var w=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i({type:t,bootstrap:[v]}),t.\u0275inj=r({imports:[d,y,M]});let o=t;return o})();f().bootstrapModule(w).catch(o=>console.error(o));