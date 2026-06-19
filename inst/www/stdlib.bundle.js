(()=>{var sD=Object.create;var Wf=Object.defineProperty;var oD=Object.getOwnPropertyDescriptor;var vD=Object.getOwnPropertyNames;var fD=Object.getPrototypeOf,lD=Object.prototype.hasOwnProperty;var s=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);var cD=(r,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of vD(e))!lD.call(r,a)&&a!==t&&Wf(r,a,{get:()=>e[a],enumerable:!(i=oD(e,a))||i.enumerable});return r};var ce=(r,e,t)=>(t=r!=null?sD(fD(r)):{},cD(e||!r||!r.__esModule?Wf(t,"default",{value:r,enumerable:!0}):t,r));var Kf=s((kTr,Yf)=>{"use strict";var pD=typeof Object.defineProperty=="function"?Object.defineProperty:null;Yf.exports=pD});var Zf=s((GTr,Qf)=>{"use strict";var mD=Kf();function hD(){try{return mD({},"x",{}),!0}catch{return!1}}Qf.exports=hD});var $f=s((UTr,Jf)=>{"use strict";var gD=Object.defineProperty;Jf.exports=gD});var P0=s((DTr,Xf)=>{"use strict";function qD(r){return typeof r=="number"}Xf.exports=qD});var R0=s((HTr,xf)=>{"use strict";function yD(r){return r[0]==="-"}function zf(r){var e="",t;for(t=0;t<r;t++)e+="0";return e}function wD(r,e,t){var i=!1,a=e-r.length;return a<0||(yD(r)&&(i=!0,r=r.substr(1)),r=t?r+zf(a):zf(a)+r,i&&(r="-"+r)),r}xf.exports=wD});var i1=s((WTr,t1)=>{"use strict";var bD=P0(),r1=R0(),dD=String.prototype.toLowerCase,e1=String.prototype.toUpperCase;function _D(r){var e,t,i;switch(r.specifier){case"b":e=2;break;case"o":e=8;break;case"x":case"X":e=16;break;default:e=10;break}if(t=r.arg,i=parseInt(t,10),!isFinite(i)){if(!bD(t))throw new Error("invalid integer. Value: "+t);i=0}return i<0&&(r.specifier==="u"||e!==10)&&(i=4294967295+i+1),i<0?(t=(-i).toString(e),r.precision&&(t=r1(t,r.precision,r.padRight)),t="-"+t):(t=i.toString(e),!i&&!r.precision?t="":r.precision&&(t=r1(t,r.precision,r.padRight)),r.sign&&(t=r.sign+t)),e===16&&(r.alternate&&(t="0x"+t),t=r.specifier===e1.call(r.specifier)?e1.call(t):dD.call(t)),e===8&&r.alternate&&t.charAt(0)!=="0"&&(t="0"+t),t}t1.exports=_D});var n1=s((YTr,a1)=>{"use strict";function ED(r){return typeof r=="string"}a1.exports=ED});var o1=s((KTr,s1)=>{"use strict";var TD=Math.abs,AD=String.prototype.toLowerCase,u1=String.prototype.toUpperCase,bt=String.prototype.replace,OD=/e\+(\d)$/,SD=/e-(\d)$/,ID=/^(\d+)$/,ND=/^(\d+)e/,FD=/\.0$/,LD=/\.0*e/,PD=/(\..*[^0])0*e/;function RD(r,e){var t,i;switch(e.specifier){case"e":case"E":i=r.toExponential(e.precision);break;case"f":case"F":i=r.toFixed(e.precision);break;case"g":case"G":TD(r)<1e-4?(t=e.precision,t>0&&(t-=1),i=r.toExponential(t)):i=r.toPrecision(e.precision),e.alternate||(i=bt.call(i,PD,"$1e"),i=bt.call(i,LD,"e"),i=bt.call(i,FD,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return i=bt.call(i,OD,"e+0$1"),i=bt.call(i,SD,"e-0$1"),e.alternate&&(i=bt.call(i,ID,"$1."),i=bt.call(i,ND,"$1.e")),r>=0&&e.sign&&(i=e.sign+i),i=e.specifier===u1.call(e.specifier)?u1.call(i):AD.call(i),i}s1.exports=RD});var l1=s((QTr,f1)=>{"use strict";function v1(r){var e="",t;for(t=0;t<r;t++)e+=" ";return e}function MD(r,e,t){var i=e-r.length;return i<0||(r=t?r+v1(i):v1(i)+r),r}f1.exports=MD});var p1=s((ZTr,c1)=>{"use strict";var VD=i1(),CD=n1(),jD=P0(),BD=o1(),kD=l1(),GD=R0(),UD=String.fromCharCode,DD=Array.isArray;function da(r){return r!==r}function HD(r){var e={};return e.specifier=r.specifier,e.precision=r.precision===void 0?1:r.precision,e.width=r.width,e.flags=r.flags||"",e.mapping=r.mapping,e}function WD(r){var e,t,i,a,n,u,o,v,f,l;if(!DD(r))throw new TypeError("invalid argument. First argument must be an array. Value: `"+r+"`.");for(u="",o=1,f=0;f<r.length;f++)if(i=r[f],CD(i))u+=i;else{if(e=i.precision!==void 0,i=HD(i),!i.specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+f+"`. Value: `"+i+"`.");for(i.mapping&&(o=i.mapping),t=i.flags,l=0;l<t.length;l++)switch(a=t.charAt(l),a){case" ":i.sign=" ";break;case"+":i.sign="+";break;case"-":i.padRight=!0,i.padZeros=!1;break;case"0":i.padZeros=t.indexOf("-")<0;break;case"#":i.alternate=!0;break;default:throw new Error("invalid flag: "+a)}if(i.width==="*"){if(i.width=parseInt(arguments[o],10),o+=1,da(i.width))throw new TypeError("the argument for * width at position "+o+" is not a number. Value: `"+i.width+"`.");i.width<0&&(i.padRight=!0,i.width=-i.width)}if(e&&i.precision==="*"){if(i.precision=parseInt(arguments[o],10),o+=1,da(i.precision))throw new TypeError("the argument for * precision at position "+o+" is not a number. Value: `"+i.precision+"`.");i.precision<0&&(i.precision=1,e=!1)}switch(i.arg=arguments[o],i.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":e&&(i.padZeros=!1),i.arg=VD(i);break;case"s":i.maxWidth=e?i.precision:-1,i.arg=String(i.arg);break;case"c":if(!da(i.arg)){if(n=parseInt(i.arg,10),n<0||n>127)throw new Error("invalid character code. Value: "+i.arg);i.arg=da(n)?String(i.arg):UD(n)}break;case"e":case"E":case"f":case"F":case"g":case"G":if(e||(i.precision=6),v=parseFloat(i.arg),!isFinite(v)){if(!jD(i.arg))throw new Error("invalid floating-point number. Value: "+u);v=i.arg,i.padZeros=!1}i.arg=BD(v,i);break;default:throw new Error("invalid specifier: "+i.specifier)}i.maxWidth>=0&&i.arg.length>i.maxWidth&&(i.arg=i.arg.substring(0,i.maxWidth)),i.padZeros?i.arg=GD(i.arg,i.width||i.precision,i.padRight):i.width&&(i.arg=kD(i.arg,i.width,i.padRight)),u+=i.arg||"",o+=1}return u}c1.exports=WD});var h1=s((JTr,m1)=>{"use strict";var YD=p1();m1.exports=YD});var q1=s(($Tr,g1)=>{"use strict";var _a=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function KD(r){var e={mapping:r[1]?parseInt(r[1],10):void 0,flags:r[2],width:r[3],precision:r[5],specifier:r[6]};return r[4]==="."&&r[5]===void 0&&(e.precision="1"),e}function QD(r){var e,t,i,a;for(t=[],a=0,i=_a.exec(r);i;)e=r.slice(a,_a.lastIndex-i[0].length),e.length&&t.push(e),i[6]==="%"?t.push("%"):t.push(KD(i)),a=_a.lastIndex,i=_a.exec(r);return e=r.slice(a),e.length&&t.push(e),t}g1.exports=QD});var w1=s((XTr,y1)=>{"use strict";var ZD=q1();y1.exports=ZD});var d1=s((zTr,b1)=>{"use strict";function JD(r){return typeof r=="string"}b1.exports=JD});var T1=s((xTr,E1)=>{"use strict";var $D=h1(),XD=w1(),zD=d1();function _1(r){var e,t;if(!zD(r))throw new TypeError(_1("invalid argument. First argument must be a string. Value: `%s`.",r));for(e=[XD(r)],t=1;t<arguments.length;t++)e.push(arguments[t]);return $D.apply(null,e)}E1.exports=_1});var S=s((rAr,A1)=>{"use strict";var xD=T1();A1.exports=xD});var L1=s((eAr,F1)=>{"use strict";var O1=S(),Vt=Object.prototype,S1=Vt.toString,I1=Vt.__defineGetter__,N1=Vt.__defineSetter__,rH=Vt.__lookupGetter__,eH=Vt.__lookupSetter__;function tH(r,e,t){var i,a,n,u;if(typeof r!="object"||r===null||S1.call(r)==="[object Array]")throw new TypeError(O1("invalid argument. First argument must be an object. Value: `%s`.",r));if(typeof t!="object"||t===null||S1.call(t)==="[object Array]")throw new TypeError(O1("invalid argument. Property descriptor must be an object. Value: `%s`.",t));if(a="value"in t,a&&(rH.call(r,e)||eH.call(r,e)?(i=r.__proto__,r.__proto__=Vt,delete r[e],r[e]=t.value,r.__proto__=i):r[e]=t.value),n="get"in t,u="set"in t,a&&(n||u))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return n&&I1&&I1.call(r,e,t.get),u&&N1&&N1.call(r,e,t.set),r}F1.exports=tH});var mi=s((tAr,P1)=>{"use strict";var iH=Zf(),aH=$f(),nH=L1(),M0;iH()?M0=aH:M0=nH;P1.exports=M0});var M1=s((iAr,R1)=>{"use strict";var uH=mi();function sH(r,e,t){uH(r,e,{configurable:!1,enumerable:!1,writable:!1,value:t})}R1.exports=sH});var O=s((aAr,V1)=>{"use strict";var oH=M1();V1.exports=oH});var V0=s((nAr,C1)=>{"use strict";function vH(r){return typeof r=="number"}C1.exports=vH});var B1=s((uAr,j1)=>{"use strict";function fH(){return typeof Symbol=="function"&&typeof Symbol("foo")=="symbol"}j1.exports=fH});var G1=s((sAr,k1)=>{"use strict";var lH=B1();k1.exports=lH});var D1=s((oAr,U1)=>{"use strict";var cH=G1(),pH=cH();function mH(){return pH&&typeof Symbol.toStringTag=="symbol"}U1.exports=mH});var Ct=s((vAr,H1)=>{"use strict";var hH=D1();H1.exports=hH});var C0=s((fAr,W1)=>{"use strict";var gH=Object.prototype.toString;W1.exports=gH});var K1=s((lAr,Y1)=>{"use strict";var qH=C0();function yH(r){return qH.call(r)}Y1.exports=yH});var Z1=s((cAr,Q1)=>{"use strict";var wH=Object.prototype.hasOwnProperty;function bH(r,e){return r==null?!1:wH.call(r,e)}Q1.exports=bH});var z=s((pAr,J1)=>{"use strict";var dH=Z1();J1.exports=dH});var X1=s((mAr,$1)=>{"use strict";var _H=typeof Symbol=="function"?Symbol:void 0;$1.exports=_H});var j0=s((hAr,z1)=>{"use strict";var EH=X1();z1.exports=EH});var el=s((gAr,rl)=>{"use strict";var x1=j0(),TH=typeof x1=="function"?x1.toStringTag:"";rl.exports=TH});var il=s((qAr,tl)=>{"use strict";var AH=z(),hi=el(),B0=C0();function OH(r){var e,t,i;if(r==null)return B0.call(r);t=r[hi],e=AH(r,hi);try{r[hi]=void 0}catch{return B0.call(r)}return i=B0.call(r),e?r[hi]=t:delete r[hi],i}tl.exports=OH});var sr=s((yAr,al)=>{"use strict";var SH=Ct(),IH=K1(),NH=il(),k0;SH()?k0=NH:k0=IH;al.exports=k0});var ul=s((wAr,nl)=>{"use strict";nl.exports=Number});var Ea=s((bAr,sl)=>{"use strict";var FH=ul();sl.exports=FH});var vl=s((dAr,ol)=>{"use strict";var LH=Ea(),PH=LH.prototype.toString;ol.exports=PH});var ll=s((_Ar,fl)=>{"use strict";var RH=vl();function MH(r){try{return RH.call(r),!0}catch{return!1}}fl.exports=MH});var G0=s((EAr,cl)=>{"use strict";var VH=Ct(),CH=sr(),jH=Ea(),BH=ll(),kH=VH();function GH(r){return typeof r=="object"?r instanceof jH?!0:kH?BH(r):CH(r)==="[object Number]":!1}cl.exports=GH});var ml=s((TAr,pl)=>{"use strict";var UH=V0(),DH=G0();function HH(r){return UH(r)||DH(r)}pl.exports=HH});var qr=s((AAr,gl)=>{"use strict";var hl=O(),U0=ml(),WH=V0(),YH=G0();hl(U0,"isPrimitive",WH);hl(U0,"isObject",YH);gl.exports=U0});var Q=s((OAr,ql)=>{"use strict";var KH=Number.POSITIVE_INFINITY;ql.exports=KH});var or=s((SAr,yl)=>{"use strict";var QH=Ea(),ZH=QH.NEGATIVE_INFINITY;yl.exports=ZH});var bl=s((IAr,wl)=>{"use strict";var JH=Math.floor;wl.exports=JH});var tr=s((NAr,dl)=>{"use strict";var $H=bl();dl.exports=$H});var El=s((FAr,_l)=>{"use strict";var XH=tr();function zH(r){return XH(r)===r}_l.exports=zH});var Ir=s((LAr,Tl)=>{"use strict";var xH=El();Tl.exports=xH});var D0=s((PAr,Al)=>{"use strict";var rW=Q(),eW=or(),tW=Ir();function iW(r){return r<rW&&r>eW&&tW(r)}Al.exports=iW});var H0=s((RAr,Ol)=>{"use strict";var aW=qr().isPrimitive,nW=D0();function uW(r){return aW(r)&&nW(r)}Ol.exports=uW});var W0=s((MAr,Sl)=>{"use strict";var sW=qr().isObject,oW=D0();function vW(r){return sW(r)&&oW(r.valueOf())}Sl.exports=vW});var Nl=s((VAr,Il)=>{"use strict";var fW=H0(),lW=W0();function cW(r){return fW(r)||lW(r)}Il.exports=cW});var dr=s((CAr,Ll)=>{"use strict";var Fl=O(),Y0=Nl(),pW=H0(),mW=W0();Fl(Y0,"isPrimitive",pW);Fl(Y0,"isObject",mW);Ll.exports=Y0});var K0=s((jAr,Pl)=>{"use strict";var hW=dr().isPrimitive;function gW(r){return hW(r)&&r>=0}Pl.exports=gW});var Q0=s((BAr,Rl)=>{"use strict";var qW=dr().isObject;function yW(r){return qW(r)&&r.valueOf()>=0}Rl.exports=yW});var Vl=s((kAr,Ml)=>{"use strict";var wW=K0(),bW=Q0();function dW(r){return wW(r)||bW(r)}Ml.exports=dW});var Re=s((GAr,jl)=>{"use strict";var Cl=O(),Z0=Vl(),_W=K0(),EW=Q0();Cl(Z0,"isPrimitive",_W);Cl(Z0,"isObject",EW);jl.exports=Z0});var J0=s((UAr,Bl)=>{"use strict";function TW(r){return typeof r=="boolean"}Bl.exports=TW});var Gl=s((DAr,kl)=>{"use strict";var AW=Boolean;kl.exports=AW});var dt=s((HAr,Ul)=>{"use strict";var OW=Gl();Ul.exports=OW});var Hl=s((WAr,Dl)=>{"use strict";var SW=Boolean.prototype.toString;Dl.exports=SW});var Yl=s((YAr,Wl)=>{"use strict";var IW=Hl();function NW(r){try{return IW.call(r),!0}catch{return!1}}Wl.exports=NW});var $0=s((KAr,Kl)=>{"use strict";var FW=Ct(),LW=sr(),PW=dt(),RW=Yl(),MW=FW();function VW(r){return typeof r=="object"?r instanceof PW?!0:MW?RW(r):LW(r)==="[object Boolean]":!1}Kl.exports=VW});var Zl=s((QAr,Ql)=>{"use strict";var CW=J0(),jW=$0();function BW(r){return CW(r)||jW(r)}Ql.exports=BW});var Nr=s((ZAr,$l)=>{"use strict";var Jl=O(),X0=Zl(),kW=J0(),GW=$0();Jl(X0,"isPrimitive",kW);Jl(X0,"isObject",GW);$l.exports=X0});var zl=s((JAr,Xl)=>{"use strict";function UW(){return new Function("return this;")()}Xl.exports=UW});var r2=s(($Ar,xl)=>{"use strict";var DW=typeof self=="object"?self:null;xl.exports=DW});var t2=s((XAr,e2)=>{"use strict";var HW=typeof window=="object"?window:null;e2.exports=HW});var a2=s((zAr,i2)=>{"use strict";var WW=typeof globalThis=="object"?globalThis:null;i2.exports=WW});var z0=s((xAr,o2)=>{"use strict";var YW=Nr().isPrimitive,KW=S(),QW=zl(),n2=r2(),u2=t2(),s2=a2();function ZW(r){if(arguments.length){if(!YW(r))throw new TypeError(KW("invalid argument. Must provide a boolean. Value: `%s`.",r));if(r)return QW()}if(s2)return s2;if(n2)return n2;if(u2)return u2;throw new Error("unexpected error. Unable to resolve global object.")}o2.exports=ZW});var l2=s((rOr,f2)=>{"use strict";var JW=z0(),v2=JW();function $W(){return typeof v2.BigInt=="function"&&typeof BigInt=="function"&&typeof v2.BigInt("1")=="bigint"&&typeof BigInt("1")=="bigint"}f2.exports=$W});var p2=s((eOr,c2)=>{"use strict";var XW=l2();c2.exports=XW});var h2=s((tOr,m2)=>{"use strict";var zW=mi();function xW(r,e,t){zW(r,e,{configurable:!1,enumerable:!1,get:t})}m2.exports=xW});var _t=s((iOr,g2)=>{"use strict";var rY=h2();g2.exports=rY});var x0=s((aOr,q2)=>{"use strict";function eY(r){return typeof r=="string"}q2.exports=eY});var w2=s((nOr,y2)=>{"use strict";var tY=String.prototype.valueOf;y2.exports=tY});var d2=s((uOr,b2)=>{"use strict";var iY=w2();function aY(r){try{return iY.call(r),!0}catch{return!1}}b2.exports=aY});var ru=s((sOr,_2)=>{"use strict";var nY=Ct(),uY=sr(),sY=d2(),oY=nY();function vY(r){return typeof r=="object"?r instanceof String?!0:oY?sY(r):uY(r)==="[object String]":!1}_2.exports=vY});var T2=s((oOr,E2)=>{"use strict";var fY=x0(),lY=ru();function cY(r){return fY(r)||lY(r)}E2.exports=cY});var hr=s((vOr,O2)=>{"use strict";var A2=O(),eu=T2(),pY=x0(),mY=ru();A2(eu,"isPrimitive",pY);A2(eu,"isObject",mY);O2.exports=eu});var tu=s((fOr,S2)=>{"use strict";var hY=dr().isPrimitive;function gY(r){return hY(r)&&r>0}S2.exports=gY});var iu=s((lOr,I2)=>{"use strict";var qY=dr().isObject;function yY(r){return qY(r)&&r.valueOf()>0}I2.exports=yY});var F2=s((cOr,N2)=>{"use strict";var wY=tu(),bY=iu();function dY(r){return wY(r)||bY(r)}N2.exports=dY});var Xr=s((pOr,P2)=>{"use strict";var L2=O(),au=F2(),_Y=tu(),EY=iu();L2(au,"isPrimitive",_Y);L2(au,"isObject",EY);P2.exports=au});var Ta=s((mOr,R2)=>{"use strict";function TY(r){return Object.keys(Object(r))}R2.exports=TY});var V2=s((hOr,M2)=>{"use strict";var AY=Ta();function OY(){return(AY(arguments)||"").length!==2}function SY(){return OY(1,2)}M2.exports=SY});var j2=s((gOr,C2)=>{"use strict";var IY=typeof Object.keys<"u";C2.exports=IY});var nu=s((qOr,B2)=>{"use strict";var NY=sr();function FY(r){return NY(r)==="[object Arguments]"}B2.exports=FY});var U2=s((yOr,G2)=>{"use strict";var LY=nu(),k2;function PY(){return LY(arguments)}k2=PY();G2.exports=k2});var H2=s((wOr,D2)=>{"use strict";function RY(r){return r!==r}D2.exports=RY});var F=s((bOr,W2)=>{"use strict";var MY=H2();W2.exports=MY});var uu=s((dOr,Y2)=>{"use strict";var VY=qr().isPrimitive,CY=F();function jY(r){return VY(r)&&CY(r)}Y2.exports=jY});var su=s((_Or,K2)=>{"use strict";var BY=qr().isObject,kY=F();function GY(r){return BY(r)&&kY(r.valueOf())}K2.exports=GY});var Z2=s((EOr,Q2)=>{"use strict";var UY=uu(),DY=su();function HY(r){return UY(r)||DY(r)}Q2.exports=HY});var Ke=s((TOr,$2)=>{"use strict";var J2=O(),ou=Z2(),WY=uu(),YY=su();J2(ou,"isPrimitive",WY);J2(ou,"isObject",YY);$2.exports=ou});var vu=s((AOr,X2)=>{"use strict";var KY=Object.prototype.propertyIsEnumerable;X2.exports=KY});var rc=s((OOr,x2)=>{"use strict";var QY=vu(),z2;function ZY(){return!QY.call("beep","0")}z2=ZY();x2.exports=z2});var tc=s((SOr,ec)=>{"use strict";var JY=hr(),$Y=Ke().isPrimitive,XY=dr().isPrimitive,zY=vu(),xY=rc();function rK(r,e){var t;return r==null?!1:(t=zY.call(r,e),!t&&xY&&JY(r)?(e=+e,!$Y(e)&&XY(e)&&e>=0&&e<r.length):t)}ec.exports=rK});var Aa=s((IOr,ic)=>{"use strict";var eK=tc();ic.exports=eK});var nc=s((NOr,ac)=>{"use strict";var tK=sr(),fu;function iK(r){return tK(r)==="[object Array]"}Array.isArray?fu=Array.isArray:fu=iK;ac.exports=fu});var pe=s((FOr,uc)=>{"use strict";var aK=nc();uc.exports=aK});var lu=s((LOr,sc)=>{"use strict";var nK=4294967295;sc.exports=nK});var vc=s((POr,oc)=>{"use strict";var uK=z(),sK=Aa(),oK=pe(),vK=Ir(),fK=lu();function lK(r){return r!==null&&typeof r=="object"&&!oK(r)&&typeof r.length=="number"&&vK(r.length)&&r.length>=0&&r.length<=fK&&uK(r,"callee")&&!sK(r,"callee")}oc.exports=lK});var pu=s((ROr,fc)=>{"use strict";var cK=U2(),pK=nu(),mK=vc(),cu;cK?cu=pK:cu=mK;fc.exports=cu});var pc=s((MOr,cc)=>{"use strict";var hK=pu(),lc=Ta(),gK=Array.prototype.slice;function qK(r){return hK(r)?lc(gK.call(r)):lc(r)}cc.exports=qK});var hc=s((VOr,mc)=>{"use strict";var yK=pe(),wK=S();function bK(r){if(typeof r!="function")throw new TypeError(wK("invalid argument. Must provide a function. Value: `%s`.",r));return e;function e(t){var i,a;if(!yK(t)||(i=t.length,i===0))return!1;for(a=0;a<i;a++)if(r(t[a])===!1)return!1;return!0}}mc.exports=bK});var mu=s((COr,gc)=>{"use strict";var dK=hc();gc.exports=dK});var yc=s((jOr,qc)=>{"use strict";function _K(r){return r!==null&&typeof r=="object"}qc.exports=_K});var Oa=s((BOr,wc)=>{"use strict";var EK=O(),TK=mu(),hu=yc(),AK=TK(hu);EK(hu,"isObjectLikeArray",AK);wc.exports=hu});var dc=s((kOr,bc)=>{"use strict";function OK(){}bc.exports=OK});var Ec=s((GOr,_c)=>{"use strict";var SK=dc();_c.exports=SK});var Ac=s((UOr,Tc)=>{"use strict";var IK=Aa(),NK=Ec(),FK=IK(NK,"prototype");Tc.exports=FK});var Sc=s((DOr,Oc)=>{"use strict";var LK=Aa(),PK={toString:null},RK=!LK(PK,"toString");Oc.exports=RK});var gu=s((HOr,Ic)=>{"use strict";var MK=9007199254740991;Ic.exports=MK});var Fc=s((WOr,Nc)=>{"use strict";var VK=Ir(),CK=gu();function jK(r){return typeof r=="object"&&r!==null&&typeof r.length=="number"&&VK(r.length)&&r.length>=0&&r.length<=CK}Nc.exports=jK});var Cr=s((YOr,Lc)=>{"use strict";var BK=Fc();Lc.exports=BK});var Vc=s((KOr,Mc)=>{"use strict";var Pc=Ke(),kK=Cr(),GK=hr().isPrimitive,UK=dr().isPrimitive,Rc=S();function DK(r,e,t){var i,a;if(!kK(r)&&!GK(r))throw new TypeError(Rc("invalid argument. First argument must be an array-like object. Value: `%s`.",r));if(i=r.length,i===0)return-1;if(arguments.length===3){if(!UK(t))throw new TypeError(Rc("invalid argument. Third argument must be an integer. Value: `%s`.",t));if(t>=0){if(t>=i)return-1;a=t}else a=i+t,a<0&&(a=0)}else a=0;if(Pc(e)){for(;a<i;a++)if(Pc(r[a]))return a}else for(;a<i;a++)if(r[a]===e)return a;return-1}Mc.exports=DK});var Sa=s((QOr,Cc)=>{"use strict";var HK=Vc();Cc.exports=HK});var Bc=s((ZOr,jc)=>{"use strict";var WK=/./;jc.exports=WK});var Uc=s((JOr,Gc)=>{"use strict";var YK=z0(),kc=YK(),KK=kc.document&&kc.document.childNodes;Gc.exports=KK});var Hc=s(($Or,Dc)=>{"use strict";var QK=Int8Array;Dc.exports=QK});var Yc=s((XOr,Wc)=>{"use strict";var ZK=Bc(),JK=Uc(),$K=Hc();function XK(){return typeof ZK=="function"||typeof $K=="object"||typeof JK=="function"}Wc.exports=XK});var qu=s((zOr,Kc)=>{"use strict";function zK(){return/^\s*function\s*([^(]*)/i}Kc.exports=zK});var Zc=s((xOr,Qc)=>{"use strict";var xK=qu(),rQ=xK();Qc.exports=rQ});var Xc=s((rSr,$c)=>{"use strict";var eQ=O(),Jc=qu(),tQ=Zc();eQ(Jc,"REGEXP",tQ);$c.exports=Jc});var xc=s((eSr,zc)=>{"use strict";var iQ=Oa();function aQ(r){return iQ(r)&&(r._isBuffer||r.constructor&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r))}zc.exports=aQ});var yu=s((tSr,r3)=>{"use strict";var nQ=xc();r3.exports=nQ});var t3=s((iSr,e3)=>{"use strict";var uQ=sr(),sQ=Xc().REGEXP,oQ=yu();function vQ(r){var e,t,i;if(t=uQ(r).slice(8,-1),(t==="Object"||t==="Error")&&r.constructor){if(i=r.constructor,typeof i.name=="string")return i.name;if(e=sQ.exec(i.toString()),e)return e[1]}return oQ(r)?"Buffer":t}e3.exports=vQ});var Ia=s((aSr,i3)=>{"use strict";var fQ=t3();i3.exports=fQ});var n3=s((nSr,a3)=>{"use strict";var lQ=Ia();function cQ(r){var e;return r===null?"null":(e=typeof r,e==="object"?lQ(r).toLowerCase():e)}a3.exports=cQ});var s3=s((uSr,u3)=>{"use strict";var pQ=Ia();function mQ(r){return pQ(r).toLowerCase()}u3.exports=mQ});var wu=s((sSr,o3)=>{"use strict";var hQ=Yc(),gQ=n3(),qQ=s3(),yQ=hQ()?qQ:gQ;o3.exports=yQ});var bu=s((oSr,v3)=>{"use strict";function wQ(r){return r.constructor&&r.constructor.prototype===r}v3.exports=wQ});var f3=s((vSr,bQ)=>{bQ.exports=["console","external","frame","frameElement","frames","innerHeight","innerWidth","outerHeight","outerWidth","pageXOffset","pageYOffset","parent","scrollLeft","scrollTop","scrollX","scrollY","self","webkitIndexedDB","webkitStorageInfo","window"]});var c3=s((fSr,l3)=>{"use strict";var dQ=typeof window>"u"?void 0:window;l3.exports=dQ});var g3=s((lSr,h3)=>{"use strict";var _Q=z(),EQ=Sa(),p3=wu(),TQ=bu(),AQ=f3(),jt=c3(),m3;function OQ(){var r;if(p3(jt)==="undefined")return!1;for(r in jt)try{EQ(AQ,r)===-1&&_Q(jt,r)&&jt[r]!==null&&p3(jt[r])==="object"&&TQ(jt[r])}catch{return!0}return!1}m3=OQ();h3.exports=m3});var y3=s((cSr,q3)=>{"use strict";var SQ=typeof window<"u";q3.exports=SQ});var d3=s((pSr,b3)=>{"use strict";var IQ=g3(),w3=bu(),NQ=y3();function FQ(r){if(NQ===!1&&!IQ)return w3(r);try{return w3(r)}catch{return!1}}b3.exports=FQ});var _3=s((mSr,LQ)=>{LQ.exports=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]});var A3=s((hSr,T3)=>{"use strict";var PQ=Oa(),du=z(),RQ=pu(),MQ=Ac(),VQ=Sc(),CQ=d3(),E3=_3();function jQ(r){var e,t,i,a,n,u,o;if(a=[],RQ(r)){for(o=0;o<r.length;o++)a.push(o.toString());return a}if(typeof r=="string"){if(r.length>0&&!du(r,"0"))for(o=0;o<r.length;o++)a.push(o.toString())}else{if(i=typeof r=="function",i===!1&&!PQ(r))return a;t=MQ&&i}for(n in r)!(t&&n==="prototype")&&du(r,n)&&a.push(String(n));if(VQ)for(e=CQ(r),o=0;o<E3.length;o++)u=E3[o],!(e&&u==="constructor")&&du(r,u)&&a.push(String(u));return a}T3.exports=jQ});var S3=s((gSr,O3)=>{"use strict";var BQ=V2(),kQ=j2(),GQ=Ta(),UQ=pc(),DQ=A3(),Na;kQ?BQ()?Na=UQ:Na=GQ:Na=DQ;O3.exports=Na});var N3=s((qSr,I3)=>{"use strict";var HQ=S3();I3.exports=HQ});var L3=s((ySr,F3)=>{"use strict";var WQ=pe();function YQ(r){return typeof r=="object"&&r!==null&&!WQ(r)}F3.exports=YQ});var Bt=s((wSr,P3)=>{"use strict";var KQ=L3();P3.exports=KQ});var M3=s((bSr,R3)=>{"use strict";var QQ=wu();function ZQ(r){return QQ(r)==="function"}R3.exports=ZQ});var jr=s((dSr,V3)=>{"use strict";var JQ=M3();V3.exports=JQ});var j3=s((_Sr,C3)=>{"use strict";var $Q=Object;C3.exports=$Q});var _u=s((ESr,B3)=>{"use strict";var XQ=j3();B3.exports=XQ});var G3=s((TSr,k3)=>{"use strict";var zQ=Object.getPrototypeOf;k3.exports=zQ});var D3=s((ASr,U3)=>{"use strict";function xQ(r){return r.__proto__}U3.exports=xQ});var Y3=s((OSr,W3)=>{"use strict";var rZ=sr(),H3=_u(),eZ=D3();function tZ(r){var e=eZ(r);return e||e===null?e:rZ(r.constructor)==="[object Function]"?r.constructor.prototype:r instanceof H3?H3.prototype:null}W3.exports=tZ});var Q3=s((SSr,K3)=>{"use strict";var iZ=jr(),aZ=G3(),nZ=Y3(),Eu;iZ(Object.getPrototypeOf)?Eu=aZ:Eu=nZ;K3.exports=Eu});var J3=s((ISr,Z3)=>{"use strict";var uZ=_u(),sZ=Q3();function oZ(r){return r==null?null:(r=uZ(r),sZ(r))}Z3.exports=oZ});var X3=s((NSr,$3)=>{"use strict";var vZ=J3();$3.exports=vZ});var r6=s((FSr,x3)=>{"use strict";var fZ=Bt(),z3=jr(),lZ=X3(),Fa=z(),cZ=sr(),pZ=Object.prototype;function mZ(r){var e;for(e in r)if(!Fa(r,e))return!1;return!0}function hZ(r){var e;return fZ(r)?(e=lZ(r),e?!Fa(r,"constructor")&&Fa(e,"constructor")&&z3(e.constructor)&&cZ(e.constructor)==="[object Function]"&&Fa(e,"isPrototypeOf")&&z3(e.isPrototypeOf)&&(e===pZ||mZ(r)):!0):!1}x3.exports=hZ});var gr=s((LSr,e6)=>{"use strict";var gZ=r6();e6.exports=gZ});var a6=s((PSr,i6)=>{"use strict";var qZ=N3(),yZ=pe(),wZ=gr(),bZ=Oa(),dZ=Nr().isPrimitive,t6=z(),Tu=S();function _Z(r,e){var t=!0,i,a,n,u,o,v,f;if(!bZ(r))throw new TypeError(Tu("invalid argument. First argument must be an object (except null). Value: `%s`.",r));if(arguments.length>1){if(!wZ(e))throw new TypeError(Tu("invalid argument. Options argument must be an object. Value: `%s`.",e));if(t6(e,"duplicates")&&(t=e.duplicates,!dZ(t)))throw new TypeError(Tu("invalid option. `%s` option must be a boolean. Option: `%s`.","duplicates",t))}if(i=qZ(r),a=i.length,o={},t)for(f=0;f<a;f++){if(n=i[f],u=r[n],!t6(o,u)){o[u]=n;continue}v=o[u],yZ(v)?o[u].push(n):o[u]=[v,n]}else for(f=0;f<a;f++)n=i[f],o[r[n]]=n;return o}i6.exports=_Z});var u6=s((RSr,n6)=>{"use strict";var EZ=a6();n6.exports=EZ});var o6=s((MSr,s6)=>{"use strict";function TZ(){return{bool:0,int8:1,uint8:2,uint8c:3,int16:4,uint16:5,int32:6,uint32:7,int64:8,uint64:9,float16:10,float32:11,float64:12,complex32:13,complex64:14,complex128:15,binary:16,generic:17,notype:18,userdefined_type:256}}s6.exports=TZ});var gi=s((VSr,v6)=>{"use strict";var AZ=o6();v6.exports=AZ});var l6=s((CSr,f6)=>{"use strict";var OZ=hr().isPrimitive,SZ=u6(),IZ=gi(),NZ=SZ(IZ(),{duplicates:!1});function FZ(r){var e=NZ[r];return OZ(e)?e:null}f6.exports=FZ});var La=s((jSr,c6)=>{"use strict";var LZ=l6();c6.exports=LZ});var p6=s((BSr,PZ)=>{PZ.exports={binary:1,bool:1,complex64:8,complex128:16,float16:2,bfloat16:2,float32:4,float64:8,float128:16,generic:null,int8:1,int16:2,int32:4,int64:8,int128:16,int256:32,uint8:1,uint8c:1,uint16:2,uint32:4,uint64:8,uint128:16,uint256:32}});var g6=s((kSr,h6)=>{"use strict";var RZ=hr().isPrimitive,MZ=qr().isPrimitive,VZ=Xr().isPrimitive,CZ=La(),m6=p6();function jZ(r){var e;return RZ(r)?m6[r]||null:MZ(r)?m6[CZ(r)]||null:r&&(e=r.byteLength,VZ(e))?e:null}h6.exports=jZ});var Au=s((GSr,q6)=>{"use strict";var BZ=g6();q6.exports=BZ});var w6=s((USr,y6)=>{"use strict";function kZ(r){var e,t;for(e=0,t=0;t<r.length;t++)r[t]<0&&(e+=1);return e===0?1:e===r.length?-1:0}y6.exports=kZ});var d6=s((DSr,b6)=>{"use strict";var GZ=w6();b6.exports=GZ});var E6=s((HSr,_6)=>{"use strict";function UZ(r){return Math.abs(r)}_6.exports=UZ});var k=s((WSr,T6)=>{"use strict";var DZ=E6();T6.exports=DZ});var S6=s((YSr,O6)=>{"use strict";var A6=k();function HZ(r){var e,t,i,a,n,u;if(t=r.length,t===0)return 0;for(e=!0,i=!0,a=A6(r[0]),u=1;u<t;u++)if(n=A6(r[u]),e&&n<a?e=!1:i&&n>a&&(i=!1),i||e)a=n;else return 0;return i&&e?3:i?1:2}O6.exports=HZ});var N6=s((KSr,I6)=>{"use strict";var WZ=S6();I6.exports=WZ});var P6=s((QSr,L6)=>{"use strict";var F6="function";function YZ(r){return typeof r.get===F6&&typeof r.set===F6}L6.exports=YZ});var qi=s((ZSr,R6)=>{"use strict";var KZ=P6();R6.exports=KZ});var C6=s((JSr,V6)=>{"use strict";var M6={float64:QZ,float32:ZZ,int32:JZ,int16:$Z,int8:XZ,uint32:zZ,uint16:xZ,uint8:rJ,uint8c:eJ,generic:tJ,default:iJ};function QZ(r,e){return r[e]}function ZZ(r,e){return r[e]}function JZ(r,e){return r[e]}function $Z(r,e){return r[e]}function XZ(r,e){return r[e]}function zZ(r,e){return r[e]}function xZ(r,e){return r[e]}function rJ(r,e){return r[e]}function eJ(r,e){return r[e]}function tJ(r,e){return r[e]}function iJ(r,e){return r[e]}function aJ(r){var e=M6[r];return typeof e=="function"?e:M6.default}V6.exports=aJ});var Et=s(($Sr,j6)=>{"use strict";var nJ=C6();j6.exports=nJ});var G6=s((XSr,k6)=>{"use strict";var B6={float64:uJ,float32:sJ,int32:oJ,int16:vJ,int8:fJ,uint32:lJ,uint16:cJ,uint8:pJ,uint8c:mJ,generic:hJ,default:gJ};function uJ(r,e,t){r[e]=t}function sJ(r,e,t){r[e]=t}function oJ(r,e,t){r[e]=t}function vJ(r,e,t){r[e]=t}function fJ(r,e,t){r[e]=t}function lJ(r,e,t){r[e]=t}function cJ(r,e,t){r[e]=t}function pJ(r,e,t){r[e]=t}function mJ(r,e,t){r[e]=t}function hJ(r,e,t){r[e]=t}function gJ(r,e,t){r[e]=t}function qJ(r){var e=B6[r];return typeof e=="function"?e:B6.default}k6.exports=qJ});var D6=s((zSr,U6)=>{"use strict";var yJ=G6();U6.exports=yJ});var Y6=s((xSr,W6)=>{"use strict";var H6={complex128:wJ,complex64:bJ,default:dJ};function wJ(r,e){return r.get(e)}function bJ(r,e){return r.get(e)}function dJ(r,e){return r.get(e)}function _J(r){var e=H6[r];return typeof e=="function"?e:H6.default}W6.exports=_J});var Qe=s((rIr,K6)=>{"use strict";var EJ=Y6();K6.exports=EJ});var J6=s((eIr,Z6)=>{"use strict";var Q6={complex128:TJ,complex64:AJ,default:OJ};function TJ(r,e,t){r.set(t,e)}function AJ(r,e,t){r.set(t,e)}function OJ(r,e,t){r.set(t,e)}function SJ(r){var e=Q6[r];return typeof e=="function"?e:Q6.default}Z6.exports=SJ});var X6=s((tIr,$6)=>{"use strict";var IJ=J6();$6.exports=IJ});var x6=s((iIr,z6)=>{"use strict";var NJ={Float32Array:"float32",Float64Array:"float64",Array:"generic",Int16Array:"int16",Int32Array:"int32",Int8Array:"int8",Uint16Array:"uint16",Uint32Array:"uint32",Uint8Array:"uint8",Uint8ClampedArray:"uint8c",Complex64Array:"complex64",Complex128Array:"complex128",BooleanArray:"bool"};z6.exports=NJ});var e4=s((aIr,r4)=>{"use strict";var FJ=sr(),LJ=typeof Float64Array=="function";function PJ(r){return LJ&&r instanceof Float64Array||FJ(r)==="[object Float64Array]"}r4.exports=PJ});var i4=s((nIr,t4)=>{"use strict";var RJ=e4();t4.exports=RJ});var n4=s((uIr,a4)=>{"use strict";var MJ=typeof Float64Array=="function"?Float64Array:null;a4.exports=MJ});var o4=s((sIr,s4)=>{"use strict";var VJ=i4(),u4=n4();function CJ(){var r,e;if(typeof u4!="function")return!1;try{e=new u4([1,3.14,-3.14,NaN]),r=VJ(e)&&e[0]===1&&e[1]===3.14&&e[2]===-3.14&&e[3]!==e[3]}catch{r=!1}return r}s4.exports=CJ});var f4=s((oIr,v4)=>{"use strict";var jJ=o4();v4.exports=jJ});var c4=s((vIr,l4)=>{"use strict";var BJ=typeof Float64Array=="function"?Float64Array:void 0;l4.exports=BJ});var m4=s((fIr,p4)=>{"use strict";function kJ(){throw new Error("not implemented")}p4.exports=kJ});var Tr=s((lIr,h4)=>{"use strict";var GJ=f4(),UJ=c4(),DJ=m4(),Ou;GJ()?Ou=UJ:Ou=DJ;h4.exports=Ou});var q4=s((cIr,g4)=>{"use strict";var HJ=sr(),WJ=typeof Float32Array=="function";function YJ(r){return WJ&&r instanceof Float32Array||HJ(r)==="[object Float32Array]"}g4.exports=YJ});var w4=s((pIr,y4)=>{"use strict";var KJ=q4();y4.exports=KJ});var d4=s((mIr,b4)=>{"use strict";var QJ=typeof Float32Array=="function"?Float32Array:null;b4.exports=QJ});var T4=s((hIr,E4)=>{"use strict";var ZJ=w4(),JJ=Q(),_4=d4();function $J(){var r,e;if(typeof _4!="function")return!1;try{e=new _4([1,3.14,-3.14,5e40]),r=ZJ(e)&&e[0]===1&&e[1]===3.140000104904175&&e[2]===-3.140000104904175&&e[3]===JJ}catch{r=!1}return r}E4.exports=$J});var O4=s((gIr,A4)=>{"use strict";var XJ=T4();A4.exports=XJ});var I4=s((qIr,S4)=>{"use strict";var zJ=typeof Float32Array=="function"?Float32Array:void 0;S4.exports=zJ});var F4=s((yIr,N4)=>{"use strict";function xJ(){throw new Error("not implemented")}N4.exports=xJ});var yi=s((wIr,L4)=>{"use strict";var r$=O4(),e$=I4(),t$=F4(),Su;r$()?Su=e$:Su=t$;L4.exports=Su});var R4=s((bIr,P4)=>{"use strict";var i$=sr(),a$=typeof Uint32Array=="function";function n$(r){return a$&&r instanceof Uint32Array||i$(r)==="[object Uint32Array]"}P4.exports=n$});var V4=s((dIr,M4)=>{"use strict";var u$=R4();M4.exports=u$});var j4=s((_Ir,C4)=>{"use strict";var s$=typeof Uint32Array=="function"?Uint32Array:null;C4.exports=s$});var G4=s((EIr,k4)=>{"use strict";var o$=V4(),Iu=lu(),B4=j4();function v$(){var r,e;if(typeof B4!="function")return!1;try{e=[1,3.14,-3.14,Iu+1,Iu+2],e=new B4(e),r=o$(e)&&e[0]===1&&e[1]===3&&e[2]===Iu-2&&e[3]===0&&e[4]===1}catch{r=!1}return r}k4.exports=v$});var D4=s((TIr,U4)=>{"use strict";var f$=G4();U4.exports=f$});var W4=s((AIr,H4)=>{"use strict";var l$=typeof Uint32Array=="function"?Uint32Array:void 0;H4.exports=l$});var K4=s((OIr,Y4)=>{"use strict";function c$(){throw new Error("not implemented")}Y4.exports=c$});var Ze=s((SIr,Q4)=>{"use strict";var p$=D4(),m$=W4(),h$=K4(),Nu;p$()?Nu=m$:Nu=h$;Q4.exports=Nu});var J4=s((IIr,Z4)=>{"use strict";var g$=sr(),q$=typeof Int32Array=="function";function y$(r){return q$&&r instanceof Int32Array||g$(r)==="[object Int32Array]"}Z4.exports=y$});var X4=s((NIr,$4)=>{"use strict";var w$=J4();$4.exports=w$});var Pa=s((FIr,z4)=>{"use strict";var b$=2147483647;z4.exports=b$});var rp=s((LIr,x4)=>{"use strict";var d$=-2147483648;x4.exports=d$});var tp=s((PIr,ep)=>{"use strict";var _$=typeof Int32Array=="function"?Int32Array:null;ep.exports=_$});var np=s((RIr,ap)=>{"use strict";var E$=X4(),T$=Pa(),A$=rp(),ip=tp();function O$(){var r,e;if(typeof ip!="function")return!1;try{e=new ip([1,3.14,-3.14,T$+1]),r=E$(e)&&e[0]===1&&e[1]===3&&e[2]===-3&&e[3]===A$}catch{r=!1}return r}ap.exports=O$});var sp=s((MIr,up)=>{"use strict";var S$=np();up.exports=S$});var vp=s((VIr,op)=>{"use strict";var I$=typeof Int32Array=="function"?Int32Array:void 0;op.exports=I$});var lp=s((CIr,fp)=>{"use strict";function N$(){throw new Error("not implemented")}fp.exports=N$});var pp=s((jIr,cp)=>{"use strict";var F$=sp(),L$=vp(),P$=lp(),Fu;F$()?Fu=L$:Fu=P$;cp.exports=Fu});var hp=s((BIr,mp)=>{"use strict";var R$=sr(),M$=typeof Uint16Array=="function";function V$(r){return M$&&r instanceof Uint16Array||R$(r)==="[object Uint16Array]"}mp.exports=V$});var qp=s((kIr,gp)=>{"use strict";var C$=hp();gp.exports=C$});var wp=s((GIr,yp)=>{"use strict";var j$=65535;yp.exports=j$});var dp=s((UIr,bp)=>{"use strict";var B$=typeof Uint16Array=="function"?Uint16Array:null;bp.exports=B$});var Tp=s((DIr,Ep)=>{"use strict";var k$=qp(),Lu=wp(),_p=dp();function G$(){var r,e;if(typeof _p!="function")return!1;try{e=[1,3.14,-3.14,Lu+1,Lu+2],e=new _p(e),r=k$(e)&&e[0]===1&&e[1]===3&&e[2]===Lu-2&&e[3]===0&&e[4]===1}catch{r=!1}return r}Ep.exports=G$});var Op=s((HIr,Ap)=>{"use strict";var U$=Tp();Ap.exports=U$});var Ip=s((WIr,Sp)=>{"use strict";var D$=typeof Uint16Array=="function"?Uint16Array:void 0;Sp.exports=D$});var Fp=s((YIr,Np)=>{"use strict";function H$(){throw new Error("not implemented")}Np.exports=H$});var Ru=s((KIr,Lp)=>{"use strict";var W$=Op(),Y$=Ip(),K$=Fp(),Pu;W$()?Pu=Y$:Pu=K$;Lp.exports=Pu});var Rp=s((QIr,Pp)=>{"use strict";var Q$=sr(),Z$=typeof Int16Array=="function";function J$(r){return Z$&&r instanceof Int16Array||Q$(r)==="[object Int16Array]"}Pp.exports=J$});var Vp=s((ZIr,Mp)=>{"use strict";var $$=Rp();Mp.exports=$$});var jp=s((JIr,Cp)=>{"use strict";var X$=32767;Cp.exports=X$});var kp=s(($Ir,Bp)=>{"use strict";var z$=-32768;Bp.exports=z$});var Up=s((XIr,Gp)=>{"use strict";var x$=typeof Int16Array=="function"?Int16Array:null;Gp.exports=x$});var Wp=s((zIr,Hp)=>{"use strict";var rX=Vp(),eX=jp(),tX=kp(),Dp=Up();function iX(){var r,e;if(typeof Dp!="function")return!1;try{e=new Dp([1,3.14,-3.14,eX+1]),r=rX(e)&&e[0]===1&&e[1]===3&&e[2]===-3&&e[3]===tX}catch{r=!1}return r}Hp.exports=iX});var Kp=s((xIr,Yp)=>{"use strict";var aX=Wp();Yp.exports=aX});var Zp=s((rNr,Qp)=>{"use strict";var nX=typeof Int16Array=="function"?Int16Array:void 0;Qp.exports=nX});var $p=s((eNr,Jp)=>{"use strict";function uX(){throw new Error("not implemented")}Jp.exports=uX});var zp=s((tNr,Xp)=>{"use strict";var sX=Kp(),oX=Zp(),vX=$p(),Mu;sX()?Mu=oX:Mu=vX;Xp.exports=Mu});var r8=s((iNr,xp)=>{"use strict";var fX=sr(),lX=typeof Uint8Array=="function";function cX(r){return lX&&r instanceof Uint8Array||fX(r)==="[object Uint8Array]"}xp.exports=cX});var t8=s((aNr,e8)=>{"use strict";var pX=r8();e8.exports=pX});var a8=s((nNr,i8)=>{"use strict";var mX=255;i8.exports=mX});var u8=s((uNr,n8)=>{"use strict";var hX=typeof Uint8Array=="function"?Uint8Array:null;n8.exports=hX});var v8=s((sNr,o8)=>{"use strict";var gX=t8(),Vu=a8(),s8=u8();function qX(){var r,e;if(typeof s8!="function")return!1;try{e=[1,3.14,-3.14,Vu+1,Vu+2],e=new s8(e),r=gX(e)&&e[0]===1&&e[1]===3&&e[2]===Vu-2&&e[3]===0&&e[4]===1}catch{r=!1}return r}o8.exports=qX});var l8=s((oNr,f8)=>{"use strict";var yX=v8();f8.exports=yX});var p8=s((vNr,c8)=>{"use strict";var wX=typeof Uint8Array=="function"?Uint8Array:void 0;c8.exports=wX});var h8=s((fNr,m8)=>{"use strict";function bX(){throw new Error("not implemented")}m8.exports=bX});var Je=s((lNr,g8)=>{"use strict";var dX=l8(),_X=p8(),EX=h8(),Cu;dX()?Cu=_X:Cu=EX;g8.exports=Cu});var y8=s((cNr,q8)=>{"use strict";var TX=sr(),AX=typeof Uint8ClampedArray=="function";function OX(r){return AX&&r instanceof Uint8ClampedArray||TX(r)==="[object Uint8ClampedArray]"}q8.exports=OX});var b8=s((pNr,w8)=>{"use strict";var SX=y8();w8.exports=SX});var _8=s((mNr,d8)=>{"use strict";var IX=typeof Uint8ClampedArray=="function"?Uint8ClampedArray:null;d8.exports=IX});var A8=s((hNr,T8)=>{"use strict";var NX=b8(),E8=_8();function FX(){var r,e;if(typeof E8!="function")return!1;try{e=new E8([-1,0,1,3.14,4.99,255,256]),r=NX(e)&&e[0]===0&&e[1]===0&&e[2]===1&&e[3]===3&&e[4]===5&&e[5]===255&&e[6]===255}catch{r=!1}return r}T8.exports=FX});var S8=s((gNr,O8)=>{"use strict";var LX=A8();O8.exports=LX});var N8=s((qNr,I8)=>{"use strict";var PX=typeof Uint8ClampedArray=="function"?Uint8ClampedArray:void 0;I8.exports=PX});var L8=s((yNr,F8)=>{"use strict";function RX(){throw new Error("not implemented")}F8.exports=RX});var R8=s((wNr,P8)=>{"use strict";var MX=S8(),VX=N8(),CX=L8(),ju;MX()?ju=VX:ju=CX;P8.exports=ju});var V8=s((bNr,M8)=>{"use strict";var jX=sr(),BX=typeof Int8Array=="function";function kX(r){return BX&&r instanceof Int8Array||jX(r)==="[object Int8Array]"}M8.exports=kX});var j8=s((dNr,C8)=>{"use strict";var GX=V8();C8.exports=GX});var k8=s((_Nr,B8)=>{"use strict";var UX=127;B8.exports=UX});var U8=s((ENr,G8)=>{"use strict";var DX=-128;G8.exports=DX});var H8=s((TNr,D8)=>{"use strict";var HX=typeof Int8Array=="function"?Int8Array:null;D8.exports=HX});var K8=s((ANr,Y8)=>{"use strict";var WX=j8(),YX=k8(),KX=U8(),W8=H8();function QX(){var r,e;if(typeof W8!="function")return!1;try{e=new W8([1,3.14,-3.14,YX+1]),r=WX(e)&&e[0]===1&&e[1]===3&&e[2]===-3&&e[3]===KX}catch{r=!1}return r}Y8.exports=QX});var Z8=s((ONr,Q8)=>{"use strict";var ZX=K8();Q8.exports=ZX});var $8=s((SNr,J8)=>{"use strict";var JX=typeof Int8Array=="function"?Int8Array:void 0;J8.exports=JX});var z8=s((INr,X8)=>{"use strict";function $X(){throw new Error("not implemented")}X8.exports=$X});var r5=s((NNr,x8)=>{"use strict";var XX=Z8(),zX=$8(),xX=z8(),Bu;XX()?Bu=zX:Bu=xX;x8.exports=Bu});var ku=s((FNr,e5)=>{"use strict";var rz=4294967295;e5.exports=rz});var i5=s((LNr,t5)=>{"use strict";var ez=Ir(),tz=ku();function iz(r){return typeof r=="object"&&r!==null&&typeof r.length=="number"&&ez(r.length)&&r.length>=0&&r.length<=tz}t5.exports=iz});var Me=s((PNr,a5)=>{"use strict";var az=i5();a5.exports=az});var u5=s((RNr,n5)=>{"use strict";var nz=sr(),uz=typeof ArrayBuffer=="function";function sz(r){return uz&&r instanceof ArrayBuffer||nz(r)==="[object ArrayBuffer]"}n5.exports=sz});var wi=s((MNr,s5)=>{"use strict";var oz=u5();s5.exports=oz});var Ra=s((VNr,v5)=>{"use strict";var o5=O(),Gu=mu(),Uu=hr(),vz=Gu(Uu.isPrimitive),fz=Gu(Uu.isObject),Du=Gu(Uu);o5(Du,"primitives",vz);o5(Du,"objects",fz);v5.exports=Du});var l5=s((CNr,f5)=>{"use strict";var lz=mi();function cz(r,e,t){lz(r,e,{configurable:!1,enumerable:!0,writable:!1,value:t})}f5.exports=cz});var $e=s((jNr,c5)=>{"use strict";var pz=l5();c5.exports=pz});var m5=s((BNr,p5)=>{"use strict";function mz(){var r=""+this.re;return this.im<0?r+=" - "+-this.im:r+=" + "+this.im,r+="i",r}p5.exports=mz});var g5=s((kNr,h5)=>{"use strict";function hz(){var r={};return r.type="Complex128",r.re=this.re,r.im=this.im,r}h5.exports=hz});var d5=s((GNr,b5)=>{"use strict";var q5=qr().isPrimitive,y5=$e(),kt=O(),w5=S(),gz=m5(),qz=g5();function Xe(r,e){if(!(this instanceof Xe))throw new TypeError("invalid invocation. Constructor must be called with the `new` keyword.");if(!q5(r))throw new TypeError(w5("invalid argument. Real component must be a number. Value: `%s`.",r));if(!q5(e))throw new TypeError(w5("invalid argument. Imaginary component must be a number. Value: `%s`.",e));return y5(this,"re",r),y5(this,"im",e),this}kt(Xe,"name","Complex128");kt(Xe,"BYTES_PER_ELEMENT",8);kt(Xe.prototype,"BYTES_PER_ELEMENT",8);kt(Xe.prototype,"byteLength",16);kt(Xe.prototype,"toString",gz);kt(Xe.prototype,"toJSON",qz);b5.exports=Xe});var Hu=s((UNr,_5)=>{"use strict";var yz=d5();_5.exports=yz});var T5=s((DNr,E5)=>{"use strict";var wz=typeof Math.fround=="function"?Math.fround:null;E5.exports=wz});var S5=s((HNr,O5)=>{"use strict";var bz=yi(),A5=new bz(1);function dz(r){return A5[0]=r,A5[0]}O5.exports=dz});var F5=s((WNr,N5)=>{"use strict";var I5=T5(),_z=S5(),Wu;typeof I5=="function"?Wu=I5:Wu=_z;N5.exports=Wu});var P5=s((YNr,L5)=>{"use strict";function Ez(){var r=""+this.re;return this.im<0?r+=" - "+-this.im:r+=" + "+this.im,r+="i",r}L5.exports=Ez});var M5=s((KNr,R5)=>{"use strict";function Tz(){var r={};return r.type="Complex64",r.re=this.re,r.im=this.im,r}R5.exports=Tz});var G5=s((QNr,k5)=>{"use strict";var V5=qr().isPrimitive,C5=$e(),Gt=O(),j5=F5(),B5=S(),Az=P5(),Oz=M5();function ze(r,e){if(!(this instanceof ze))throw new TypeError("invalid invocation. Constructor must be called with the `new` keyword.");if(!V5(r))throw new TypeError(B5("invalid argument. Real component must be a number. Value: `%s`.",r));if(!V5(e))throw new TypeError(B5("invalid argument. Imaginary component must be a number. Value: `%s`.",e));return C5(this,"re",j5(r)),C5(this,"im",j5(e)),this}Gt(ze,"name","Complex64");Gt(ze,"BYTES_PER_ELEMENT",4);Gt(ze.prototype,"BYTES_PER_ELEMENT",4);Gt(ze.prototype,"byteLength",8);Gt(ze.prototype,"toString",Az);Gt(ze.prototype,"toJSON",Oz);k5.exports=ze});var Yu=s((ZNr,U5)=>{"use strict";var Sz=G5();U5.exports=Sz});var H5=s((JNr,D5)=>{"use strict";var Iz=Hu(),Nz=Yu();function Fz(r){return r instanceof Iz||r instanceof Nz?!0:typeof r=="object"&&r!==null&&typeof r.re=="number"&&typeof r.im=="number"}D5.exports=Fz});var zr=s(($Nr,W5)=>{"use strict";var Lz=H5();W5.exports=Lz});var K5=s((XNr,Y5)=>{"use strict";var Pz=Ir();function Rz(r){return Pz(r/2)}Y5.exports=Rz});var Ma=s((zNr,Q5)=>{"use strict";var Mz=K5();Q5.exports=Mz});var J5=s((xNr,Z5)=>{"use strict";var Vz=8;function Cz(r){return typeof r=="object"&&r!==null&&r.constructor.name==="Complex64Array"&&r.BYTES_PER_ELEMENT===Vz}Z5.exports=Cz});var Va=s((rFr,$5)=>{"use strict";var jz=J5();$5.exports=jz});var z5=s((eFr,X5)=>{"use strict";var Bz=16;function kz(r){return typeof r=="object"&&r!==null&&r.constructor.name==="Complex128Array"&&r.BYTES_PER_ELEMENT===Bz}X5.exports=kz});var Ca=s((tFr,x5)=>{"use strict";var Gz=z5();x5.exports=Gz});var e7=s((iFr,r7)=>{"use strict";var Uz=z(),ja=j0();function Dz(){return typeof ja=="function"&&typeof ja("foo")=="symbol"&&Uz(ja,"iterator")&&typeof ja.iterator=="symbol"}r7.exports=Dz});var bi=s((aFr,t7)=>{"use strict";var Hz=e7();t7.exports=Hz});var a7=s((nFr,i7)=>{"use strict";var Wz=bi(),Yz=Wz()?Symbol.iterator:null;i7.exports=Yz});var Ba=s((uFr,n7)=>{"use strict";var Kz=a7();n7.exports=Kz});var s7=s((sFr,u7)=>{"use strict";function Qz(r){return r.re}u7.exports=Qz});var di=s((oFr,o7)=>{"use strict";var Zz=s7();o7.exports=Zz});var f7=s((vFr,v7)=>{"use strict";function Jz(r){return r.im}v7.exports=Jz});var _i=s((fFr,l7)=>{"use strict";var $z=f7();l7.exports=$z});var p7=s((lFr,c7)=>{"use strict";var Xz=yi();function zz(r,e){return new Xz(r.buffer,r.byteOffset+r.BYTES_PER_ELEMENT*e,2*(r.length-e))}c7.exports=zz});var ka=s((cFr,m7)=>{"use strict";var xz=p7();m7.exports=xz});var g7=s((pFr,h7)=>{"use strict";var rx=Tr();function ex(r,e){return new rx(r.buffer,r.byteOffset+r.BYTES_PER_ELEMENT*e,2*(r.length-e))}h7.exports=ex});var Ga=s((mFr,q7)=>{"use strict";var tx=g7();q7.exports=tx});var w7=s((hFr,y7)=>{"use strict";var ix=Me(),ax=zr(),nx=di(),ux=_i(),sx=S();function ox(r){var e,t,i;for(e=[];t=r.next(),!t.done;)if(i=t.value,ix(i)&&i.length>=2)e.push(i[0],i[1]);else if(ax(i))e.push(nx(i),ux(i));else return new TypeError(sx("invalid argument. An iterator must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",i));return e}y7.exports=ox});var d7=s((gFr,b7)=>{"use strict";var vx=Me(),fx=zr(),lx=di(),cx=_i(),px=S();function mx(r,e,t){var i,a,n,u;for(i=[],u=-1;a=r.next(),!a.done;)if(u+=1,n=e.call(t,a.value,u),vx(n)&&n.length>=2)i.push(n[0],n[1]);else if(fx(n))i.push(lx(n),cx(n));else return new TypeError(px("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",n));return i}b7.exports=mx});var E7=s((qFr,_7)=>{"use strict";var hx=zr(),gx=di(),qx=_i();function yx(r,e){var t,i,a,n;for(t=e.length,n=0,a=0;a<t;a++){if(i=e[a],!hx(i))return null;r[n]=gx(i),r[n+1]=qx(i),n+=2}return r}_7.exports=yx});var F7=s((yFr,N7)=>{"use strict";var Ei=Re().isPrimitive,Ku=Me(),Qu=Cr(),T7=wi(),Zu=Bt(),wx=pe(),bx=Ra().primitives,A7=hr().isPrimitive,lr=jr(),kr=zr(),Ua=Ma(),Fr=Ir(),dx=Va(),_x=Ca(),Ex=bi(),me=Ba(),V=O(),Da=_t(),Br=yi(),Tx=Yu(),I=S(),xr=di(),re=_i(),Ax=tr(),Ox=ka(),Sx=Ga(),Ix=Et(),Nx=Qe(),O7=w7(),Fx=d7(),Lx=E7(),Rr=Br.BYTES_PER_ELEMENT*2,S7=Ex();function H(r){return r instanceof L||typeof r=="object"&&r!==null&&(r.constructor.name==="Complex64Array"||r.constructor.name==="Complex128Array")&&typeof r._length=="number"&&typeof r._buffer=="object"}function I7(r){return r===L||r.name==="Complex128Array"}function ur(r,e){return e*=2,new Tx(r[e],r[e+1])}function L(){var r,e,t,i;if(e=arguments.length,!(this instanceof L))return e===0?new L:e===1?new L(arguments[0]):e===2?new L(arguments[0],arguments[1]):new L(arguments[0],arguments[1],arguments[2]);if(e===0)t=new Br(0);else if(e===1)if(Ei(arguments[0]))t=new Br(arguments[0]*2);else if(Qu(arguments[0]))if(t=arguments[0],i=t.length,i&&wx(t)&&kr(t[0])){if(t=Lx(new Br(i*2),t),t===null){if(!Ua(i))throw new RangeError(I("invalid argument. Array-like object arguments must have a length which is a multiple of two. Length: `%u`.",i));t=new Br(arguments[0])}}else{if(dx(t))t=Ox(t,0);else if(_x(t))t=Sx(t,0);else if(!Ua(i))throw new RangeError(I("invalid argument. Array-like object and typed array arguments must have a length which is a multiple of two. Length: `%u`.",i));t=new Br(t)}else if(T7(arguments[0])){if(t=arguments[0],!Fr(t.byteLength/Rr))throw new RangeError(I("invalid argument. ArrayBuffer byte length must be a multiple of %u. Byte length: `%u`.",Rr,t.byteLength));t=new Br(t)}else if(Zu(arguments[0])){if(t=arguments[0],S7===!1)throw new TypeError(I("invalid argument. Environment lacks Symbol.iterator support. Must provide a length, ArrayBuffer, typed array, or array-like object. Value: `%s`.",t));if(!lr(t[me]))throw new TypeError(I("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",t));if(t=t[me](),!lr(t.next))throw new TypeError(I("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",t));if(t=O7(t),t instanceof Error)throw t;t=new Br(t)}else throw new TypeError(I("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",arguments[0]));else{if(t=arguments[0],!T7(t))throw new TypeError(I("invalid argument. First argument must be an ArrayBuffer. Value: `%s`.",t));if(r=arguments[1],!Ei(r))throw new TypeError(I("invalid argument. Byte offset must be a nonnegative integer. Value: `%s`.",r));if(!Fr(r/Rr))throw new RangeError(I("invalid argument. Byte offset must be a multiple of %u. Value: `%u`.",Rr,r));if(e===2){if(i=t.byteLength-r,!Fr(i/Rr))throw new RangeError(I("invalid arguments. ArrayBuffer view byte length must be a multiple of %u. View byte length: `%u`.",Rr,i));t=new Br(t,r)}else{if(i=arguments[2],!Ei(i))throw new TypeError(I("invalid argument. Length must be a nonnegative integer. Value: `%s`.",i));if(i*Rr>t.byteLength-r)throw new RangeError(I("invalid arguments. ArrayBuffer has insufficient capacity. Either decrease the array length or provide a bigger buffer. Minimum capacity: `%u`.",i*Rr));t=new Br(t,r,i*2)}}return V(this,"_buffer",t),V(this,"_length",t.length/2),this}V(L,"BYTES_PER_ELEMENT",Rr);V(L,"name","Complex64Array");V(L,"from",function(e){var t,i,a,n,u,o,v,f,l,c,p,m;if(!lr(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!I7(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(i=arguments.length,i>1){if(a=arguments[1],!lr(a))throw new TypeError(I("invalid argument. Second argument must be a function. Value: `%s`.",a));i>2&&(t=arguments[2])}if(H(e)){if(f=e.length,a){for(n=new this(f),u=n._buffer,m=0,p=0;p<f;p++){if(c=a.call(t,e.get(p),p),kr(c))u[m]=xr(c),u[m+1]=re(c);else if(Ku(c)&&c.length>=2)u[m]=c[0],u[m+1]=c[1];else throw new TypeError(I("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",c));m+=2}return n}return new this(e)}if(Qu(e)){if(a){for(f=e.length,e.get&&e.set?v=Nx("default"):v=Ix("default"),p=0;p<f;p++)if(!kr(v(e,p))){l=!0;break}if(l){if(!Ua(f))throw new RangeError(I("invalid argument. First argument must have a length which is a multiple of %u. Length: `%u`.",2,f));for(n=new this(f/2),u=n._buffer,p=0;p<f;p++)u[p]=a.call(t,v(e,p),p);return n}for(n=new this(f),u=n._buffer,m=0,p=0;p<f;p++){if(c=a.call(t,v(e,p),p),kr(c))u[m]=xr(c),u[m+1]=re(c);else if(Ku(c)&&c.length>=2)u[m]=c[0],u[m+1]=c[1];else throw new TypeError(I("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",c));m+=2}return n}return new this(e)}if(Zu(e)&&S7&&lr(e[me])){if(u=e[me](),!lr(u.next))throw new TypeError(I("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",e));if(a?o=Fx(u,a,t):o=O7(u),o instanceof Error)throw o;for(f=o.length/2,n=new this(f),u=n._buffer,p=0;p<f;p++)u[p]=o[p];return n}throw new TypeError(I("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",e))});V(L,"of",function(){var e,t;if(!lr(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!I7(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);return new this(e)});V(L.prototype,"at",function(e){if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Fr(e))throw new TypeError(I("invalid argument. Must provide an integer. Value: `%s`.",e));if(e<0&&(e+=this._length),!(e<0||e>=this._length))return ur(this._buffer,e)});Da(L.prototype,"buffer",function(){return this._buffer.buffer});Da(L.prototype,"byteLength",function(){return this._buffer.byteLength});Da(L.prototype,"byteOffset",function(){return this._buffer.byteOffset});V(L.prototype,"BYTES_PER_ELEMENT",L.BYTES_PER_ELEMENT);V(L.prototype,"copyWithin",function(e,t){if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return arguments.length===2?this._buffer.copyWithin(e*2,t*2):this._buffer.copyWithin(e*2,t*2,arguments[2]*2),this});V(L.prototype,"entries",function(){var e,t,i,a,n,u;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return e=this,a=this._buffer,i=this._length,u=-1,t={},V(t,"next",o),V(t,"return",v),me&&V(t,me,f),t;function o(){return u+=1,n||u>=i?{done:!0}:{value:[u,ur(a,u)],done:!1}}function v(l){return n=!0,arguments.length?{value:l,done:!0}:{done:!0}}function f(){return e.entries()}});V(L.prototype,"every",function(e,t){var i,a;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(!e.call(t,ur(i,a),a,this))return!1;return!0});V(L.prototype,"fill",function(e,t,i){var a,n,u,o,v,f;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!kr(e))throw new TypeError(I("invalid argument. First argument must be a complex number. Value: `%s`.",e));if(a=this._buffer,n=this._length,arguments.length>1){if(!Fr(t))throw new TypeError(I("invalid argument. Second argument must be an integer. Value: `%s`.",t));if(t<0&&(t+=n,t<0&&(t=0)),arguments.length>2){if(!Fr(i))throw new TypeError(I("invalid argument. Third argument must be an integer. Value: `%s`.",i));i<0&&(i+=n,i<0&&(i=0)),i>n&&(i=n)}else i=n}else t=0,i=n;for(o=xr(e),v=re(e),f=t;f<i;f++)u=2*f,a[u]=o,a[u+1]=v;return this});V(L.prototype,"filter",function(e,t){var i,a,n,u;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=[],n=0;n<this._length;n++)u=ur(i,n),e.call(t,u,n,this)&&a.push(u);return new this.constructor(a)});V(L.prototype,"find",function(e,t){var i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(n=ur(i,a),e.call(t,n,a,this))return n});V(L.prototype,"findIndex",function(e,t){var i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(n=ur(i,a),e.call(t,n,a,this))return a;return-1});V(L.prototype,"findLast",function(e,t){var i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=this._length-1;a>=0;a--)if(n=ur(i,a),e.call(t,n,a,this))return n});V(L.prototype,"findLastIndex",function(e,t){var i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=this._length-1;a>=0;a--)if(n=ur(i,a),e.call(t,n,a,this))return a;return-1});V(L.prototype,"forEach",function(e,t){var i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)n=ur(i,a),e.call(t,n,a,this)});V(L.prototype,"get",function(e){if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ei(e))throw new TypeError(I("invalid argument. Must provide a nonnegative integer. Value: `%s`.",e));if(!(e>=this._length))return ur(this._buffer,e)});V(L.prototype,"includes",function(e,t){var i,a,n,u,o;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!kr(e))throw new TypeError(I("invalid argument. First argument must be a complex number. Value: `%s`.",e));if(arguments.length>1){if(!Fr(t))throw new TypeError(I("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0&&(t+=this._length,t<0&&(t=0))}else t=0;for(n=xr(e),u=re(e),i=this._buffer,o=t;o<this._length;o++)if(a=2*o,n===i[a]&&u===i[a+1])return!0;return!1});V(L.prototype,"indexOf",function(e,t){var i,a,n,u,o;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!kr(e))throw new TypeError(I("invalid argument. First argument must be a complex number. Value: `%s`.",e));if(arguments.length>1){if(!Fr(t))throw new TypeError(I("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0&&(t+=this._length,t<0&&(t=0))}else t=0;for(n=xr(e),u=re(e),i=this._buffer,o=t;o<this._length;o++)if(a=2*o,n===i[a]&&u===i[a+1])return o;return-1});V(L.prototype,"join",function(e){var t,i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(arguments.length===0)a=",";else if(A7(e))a=e;else throw new TypeError(I("invalid argument. First argument must be a string. Value: `%s`.",e));for(t=[],i=this._buffer,n=0;n<this._length;n++)t.push(ur(i,n).toString());return t.join(a)});V(L.prototype,"keys",function(){var e,t,i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return e=this,i=this._length,n=-1,t={},V(t,"next",u),V(t,"return",o),me&&V(t,me,v),t;function u(){return n+=1,a||n>=i?{done:!0}:{value:n,done:!1}}function o(f){return a=!0,arguments.length?{value:f,done:!0}:{done:!0}}function v(){return e.keys()}});V(L.prototype,"lastIndexOf",function(e,t){var i,a,n,u,o;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!kr(e))throw new TypeError(I("invalid argument. First argument must be a complex number. Value: `%s`.",e));if(arguments.length>1){if(!Fr(t))throw new TypeError(I("invalid argument. Second argument must be an integer. Value: `%s`.",t));t>=this._length?t=this._length-1:t<0&&(t+=this._length)}else t=this._length-1;for(n=xr(e),u=re(e),i=this._buffer,o=t;o>=0;o--)if(a=2*o,n===i[a]&&u===i[a+1])return o;return-1});Da(L.prototype,"length",function(){return this._length});V(L.prototype,"map",function(e,t){var i,a,n,u,o;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(a=this._buffer,n=new this.constructor(this._length),i=n._buffer,u=0;u<this._length;u++)if(o=e.call(t,ur(a,u),u,this),kr(o))i[2*u]=xr(o),i[2*u+1]=re(o);else if(Ku(o)&&o.length===2)i[2*u]=o[0],i[2*u+1]=o[1];else throw new TypeError(I("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",o));return n});V(L.prototype,"reduce",function(e,t){var i,a,n,u,o;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));if(i=this._buffer,n=this._length,arguments.length>1)a=t,o=0;else{if(n===0)throw new Error("invalid operation. If not provided an initial value, an array must contain at least one element.");a=ur(i,0),o=1}for(;o<n;o++)u=ur(i,o),a=e(a,u,o,this);return a});V(L.prototype,"reduceRight",function(e,t){var i,a,n,u,o;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));if(i=this._buffer,n=this._length,arguments.length>1)a=t,o=n-1;else{if(n===0)throw new Error("invalid operation. If not provided an initial value, an array must contain at least one element.");a=ur(i,n-1),o=n-2}for(;o>=0;o--)u=ur(i,o),a=e(a,u,o,this);return a});V(L.prototype,"reverse",function(){var e,t,i,a,n,u;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(i=this._length,e=this._buffer,a=Ax(i/2),n=0;n<a;n++)u=i-n-1,t=e[2*n],e[2*n]=e[2*u],e[2*u]=t,t=e[2*n+1],e[2*n+1]=e[2*u+1],e[2*u+1]=t;return this});V(L.prototype,"set",function(e){var t,i,a,n,u,o,v,f,l;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(a=this._buffer,arguments.length>1){if(i=arguments[1],!Ei(i))throw new TypeError(I("invalid argument. Index argument must be a nonnegative integer. Value: `%s`.",i))}else i=0;if(kr(e)){if(i>=this._length)throw new RangeError(I("invalid argument. Index argument is out-of-bounds. Value: `%u`.",i));i*=2,a[i]=xr(e),a[i+1]=re(e);return}if(H(e)){if(o=e._length,i+o>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(t=e._buffer,l=a.byteOffset+i*Rr,t.buffer===a.buffer&&t.byteOffset<l&&t.byteOffset+t.byteLength>l){for(n=new Br(t.length),f=0;f<t.length;f++)n[f]=t[f];t=n}for(i*=2,l=0,f=0;f<o;f++)a[i]=t[l],a[i+1]=t[l+1],i+=2,l+=2;return}if(Qu(e)){for(o=e.length,f=0;f<o;f++)if(!kr(e[f])){u=!0;break}if(u){if(!Ua(o))throw new RangeError(I("invalid argument. Array-like object arguments must have a length which is a multiple of two. Length: `%u`.",o));if(i+o/2>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(t=e,l=a.byteOffset+i*Rr,t.buffer===a.buffer&&t.byteOffset<l&&t.byteOffset+t.byteLength>l){for(n=new Br(o),f=0;f<o;f++)n[f]=t[f];t=n}for(i*=2,o/=2,l=0,f=0;f<o;f++)a[i]=t[l],a[i+1]=t[l+1],i+=2,l+=2;return}if(i+o>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");for(i*=2,f=0;f<o;f++)v=e[f],a[i]=xr(v),a[i+1]=re(v),i+=2;return}throw new TypeError(I("invalid argument. First argument must be either a complex number, an array-like object, or a complex number array. Value: `%s`.",e))});V(L.prototype,"slice",function(e,t){var i,a,n,u,o,v,f;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(o=this._buffer,v=this._length,arguments.length===0)e=0,t=v;else{if(!Fr(e))throw new TypeError(I("invalid argument. First argument must be an integer. Value: `%s`.",e));if(e<0&&(e+=v,e<0&&(e=0)),arguments.length===1)t=v;else{if(!Fr(t))throw new TypeError(I("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0?(t+=v,t<0&&(t=0)):t>v&&(t=v)}}for(e<t?i=t-e:i=0,n=new this.constructor(i),a=n._buffer,f=0;f<i;f++)u=2*(f+e),a[2*f]=o[u],a[2*f+1]=o[u+1];return n});V(L.prototype,"some",function(e,t){var i,a;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(e.call(t,ur(i,a),a,this))return!0;return!1});V(L.prototype,"sort",function(e){var t,i,a,n,u;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=this._length,t=[],n=0;n<a;n++)t.push(ur(i,n));for(t.sort(e),n=0;n<a;n++)u=2*n,i[u]=xr(t[n]),i[u+1]=re(t[n]);return this});V(L.prototype,"subarray",function(e,t){var i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(a=this._buffer,n=this._length,arguments.length===0)e=0,t=n;else{if(!Fr(e))throw new TypeError(I("invalid argument. First argument must be an integer. Value: `%s`.",e));if(e<0&&(e+=n,e<0&&(e=0)),arguments.length===1)t=n;else{if(!Fr(t))throw new TypeError(I("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n)}}return e>=n?(n=0,i=a.byteLength):e>=t?(n=0,i=a.byteOffset+e*Rr):(n=t-e,i=a.byteOffset+e*Rr),new this.constructor(a.buffer,i,n<0?0:n)});V(L.prototype,"toLocaleString",function(e,t){var i,a,n,u,o;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(arguments.length===0)a=[];else if(A7(e)||bx(e))a=e;else throw new TypeError(I("invalid argument. First argument must be a string or an array of strings. Value: `%s`.",e));if(arguments.length<2)i={};else if(Zu(t))i=t;else throw new TypeError(I("invalid argument. Options argument must be an object. Value: `%s`.",t));for(u=this._buffer,n=[],o=0;o<this._length;o++)n.push(ur(u,o).toLocaleString(a,i));return n.join(",")});V(L.prototype,"toReversed",function(){var e,t,i,a,n,u;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(i=this._length,t=new this.constructor(i),a=this._buffer,e=t._buffer,n=0;n<i;n++)u=i-n-1,e[2*n]=a[2*u],e[2*n+1]=a[2*u+1];return t});V(L.prototype,"toSorted",function(e){var t,i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!lr(e))throw new TypeError(I("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=this._length,t=[],n=0;n<a;n++)t.push(ur(i,n));return t.sort(e),new L(t)});V(L.prototype,"toString",function(){var e,t,i;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(e=[],t=this._buffer,i=0;i<this._length;i++)e.push(ur(t,i).toString());return e.join(",")});V(L.prototype,"values",function(){var e,t,i,a,n,u;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return t=this,n=this._buffer,i=this._length,u=-1,e={},V(e,"next",o),V(e,"return",v),me&&V(e,me,f),e;function o(){return u+=1,a||u>=i?{done:!0}:{value:ur(n,u),done:!1}}function v(l){return a=!0,arguments.length?{value:l,done:!0}:{done:!0}}function f(){return t.values()}});V(L.prototype,"with",function(e,t){var i,a,n;if(!H(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Fr(e))throw new TypeError(I("invalid argument. First argument must be an integer. Value: `%s`.",e));if(n=this._length,e<0&&(e+=n),e<0||e>=n)throw new RangeError(I("invalid argument. Index argument is out-of-bounds. Value: `%s`.",e));if(!kr(t))throw new TypeError(I("invalid argument. Second argument must be a complex number. Value: `%s`.",t));return a=new this.constructor(this._buffer),i=a._buffer,i[2*e]=xr(t),i[2*e+1]=re(t),a});N7.exports=L});var P7=s((wFr,L7)=>{"use strict";var Px=F7();L7.exports=Px});var M7=s((bFr,R7)=>{"use strict";function Rx(r){return r.re}R7.exports=Rx});var xe=s((dFr,V7)=>{"use strict";var Mx=M7();V7.exports=Mx});var j7=s((_Fr,C7)=>{"use strict";function Vx(r){return r.im}C7.exports=Vx});var rt=s((EFr,B7)=>{"use strict";var Cx=j7();B7.exports=Cx});var G7=s((TFr,k7)=>{"use strict";var jx=Me(),Bx=zr(),kx=S(),Gx=xe(),Ux=rt();function Dx(r){var e,t,i;for(e=[];t=r.next(),!t.done;)if(i=t.value,jx(i)&&i.length>=2)e.push(i[0],i[1]);else if(Bx(i))e.push(Gx(i),Ux(i));else return new TypeError(kx("invalid argument. An iterator must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",i));return e}k7.exports=Dx});var D7=s((AFr,U7)=>{"use strict";var Hx=Me(),Wx=zr(),Yx=S(),Kx=xe(),Qx=rt();function Zx(r,e,t){var i,a,n,u;for(i=[],u=-1;a=r.next(),!a.done;)if(u+=1,n=e.call(t,a.value,u),Hx(n)&&n.length>=2)i.push(n[0],n[1]);else if(Wx(n))i.push(Kx(n),Qx(n));else return new TypeError(Yx("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",n));return i}U7.exports=Zx});var W7=s((OFr,H7)=>{"use strict";var Jx=zr(),$x=xe(),Xx=rt();function zx(r,e){var t,i,a,n;for(t=e.length,n=0,a=0;a<t;a++){if(i=e[a],!Jx(i))return null;r[n]=$x(i),r[n+1]=Xx(i),n+=2}return r}H7.exports=zx});var z7=s((SFr,X7)=>{"use strict";var Ti=Re().isPrimitive,Ju=Me(),$u=Cr(),Y7=wi(),Xu=Bt(),xx=pe(),rrr=Ra().primitives,K7=hr(),cr=jr(),Ur=zr(),Ha=Ma(),Lr=Ir(),err=Va(),trr=Ca(),irr=bi(),he=Ba(),C=O(),Wa=_t(),Gr=Tr(),Q7=Hu(),ee=xe(),te=rt(),arr=tr(),nrr=ka(),urr=Ga(),srr=Et(),orr=Qe(),N=S(),Z7=G7(),vrr=D7(),frr=W7(),Mr=Gr.BYTES_PER_ELEMENT*2,J7=irr();function W(r){return r instanceof P||typeof r=="object"&&r!==null&&(r.constructor.name==="Complex64Array"||r.constructor.name==="Complex128Array")&&typeof r._length=="number"&&typeof r._buffer=="object"}function $7(r){return r===P||r.name==="Complex64Array"}function vr(r,e){return e*=2,new Q7(r[e],r[e+1])}function P(){var r,e,t,i;if(e=arguments.length,!(this instanceof P))return e===0?new P:e===1?new P(arguments[0]):e===2?new P(arguments[0],arguments[1]):new P(arguments[0],arguments[1],arguments[2]);if(e===0)t=new Gr(0);else if(e===1)if(Ti(arguments[0]))t=new Gr(arguments[0]*2);else if($u(arguments[0]))if(t=arguments[0],i=t.length,i&&xx(t)&&Ur(t[0])){if(t=frr(new Gr(i*2),t),t===null){if(!Ha(i))throw new RangeError(N("invalid argument. Array-like object arguments must have a length which is a multiple of two. Length: `%u`.",i));t=new Gr(arguments[0])}}else{if(err(t))t=nrr(t,0);else if(trr(t))t=urr(t,0);else if(!Ha(i))throw new RangeError(N("invalid argument. Array-like object and typed array arguments must have a length which is a multiple of two. Length: `%u`.",i));t=new Gr(t)}else if(Y7(arguments[0])){if(t=arguments[0],!Lr(t.byteLength/Mr))throw new RangeError(N("invalid argument. ArrayBuffer byte length must be a multiple of %u. Byte length: `%u`.",Mr,t.byteLength));t=new Gr(t)}else if(Xu(arguments[0])){if(t=arguments[0],J7===!1)throw new TypeError(N("invalid argument. Environment lacks Symbol.iterator support. Must provide a length, ArrayBuffer, typed array, or array-like object. Value: `%s`.",t));if(!cr(t[he]))throw new TypeError(N("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",t));if(t=t[he](),!cr(t.next))throw new TypeError(N("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",t));if(t=Z7(t),t instanceof Error)throw t;t=new Gr(t)}else throw new TypeError(N("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",arguments[0]));else{if(t=arguments[0],!Y7(t))throw new TypeError(N("invalid argument. First argument must be an ArrayBuffer. Value: `%s`.",t));if(r=arguments[1],!Ti(r))throw new TypeError(N("invalid argument. Byte offset must be a nonnegative integer. Value: `%s`.",r));if(!Lr(r/Mr))throw new RangeError(N("invalid argument. Byte offset must be a multiple of %u. Value: `%u`.",Mr,r));if(e===2){if(i=t.byteLength-r,!Lr(i/Mr))throw new RangeError(N("invalid arguments. ArrayBuffer view byte length must be a multiple of %u. View byte length: `%u`.",Mr,i));t=new Gr(t,r)}else{if(i=arguments[2],!Ti(i))throw new TypeError(N("invalid argument. Length must be a nonnegative integer. Value: `%s`.",i));if(i*Mr>t.byteLength-r)throw new RangeError(N("invalid arguments. ArrayBuffer has insufficient capacity. Either decrease the array length or provide a bigger buffer. Minimum capacity: `%u`.",i*Mr));t=new Gr(t,r,i*2)}}return C(this,"_buffer",t),C(this,"_length",t.length/2),this}C(P,"BYTES_PER_ELEMENT",Mr);C(P,"name","Complex128Array");C(P,"from",function(e){var t,i,a,n,u,o,v,f,l,c,p,m;if(!cr(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!$7(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(i=arguments.length,i>1){if(a=arguments[1],!cr(a))throw new TypeError(N("invalid argument. Second argument must be a function. Value: `%s`.",a));i>2&&(t=arguments[2])}if(W(e)){if(f=e.length,a){for(n=new this(f),u=n._buffer,m=0,p=0;p<f;p++){if(c=a.call(t,e.get(p),p),Ur(c))u[m]=ee(c),u[m+1]=te(c);else if(Ju(c)&&c.length>=2)u[m]=c[0],u[m+1]=c[1];else throw new TypeError(N("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",c));m+=2}return n}return new this(e)}if($u(e)){if(a){for(f=e.length,e.get&&e.set?v=orr("default"):v=srr("default"),p=0;p<f;p++)if(!Ur(v(e,p))){l=!0;break}if(l){if(!Ha(f))throw new RangeError(N("invalid argument. First argument must have a length which is a multiple of two. Length: `%u`.",f));for(n=new this(f/2),u=n._buffer,p=0;p<f;p++)u[p]=a.call(t,v(e,p),p);return n}for(n=new this(f),u=n._buffer,m=0,p=0;p<f;p++){if(c=a.call(t,v(e,p),p),Ur(c))u[m]=ee(c),u[m+1]=te(c);else if(Ju(c)&&c.length>=2)u[m]=c[0],u[m+1]=c[1];else throw new TypeError(N("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",c));m+=2}return n}return new this(e)}if(Xu(e)&&J7&&cr(e[he])){if(u=e[he](),!cr(u.next))throw new TypeError(N("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",e));if(a?o=vrr(u,a,t):o=Z7(u),o instanceof Error)throw o;for(f=o.length/2,n=new this(f),u=n._buffer,p=0;p<f;p++)u[p]=o[p];return n}throw new TypeError(N("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",e))});C(P,"of",function(){var e,t;if(!cr(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!$7(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);return new this(e)});C(P.prototype,"at",function(e){if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Lr(e))throw new TypeError(N("invalid argument. Must provide an integer. Value: `%s`.",e));if(e<0&&(e+=this._length),!(e<0||e>=this._length))return vr(this._buffer,e)});Wa(P.prototype,"buffer",function(){return this._buffer.buffer});Wa(P.prototype,"byteLength",function(){return this._buffer.byteLength});Wa(P.prototype,"byteOffset",function(){return this._buffer.byteOffset});C(P.prototype,"BYTES_PER_ELEMENT",P.BYTES_PER_ELEMENT);C(P.prototype,"copyWithin",function(e,t){if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return arguments.length===2?this._buffer.copyWithin(e*2,t*2):this._buffer.copyWithin(e*2,t*2,arguments[2]*2),this});C(P.prototype,"entries",function(){var e,t,i,a,n,u,o;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return t=this,e=this._buffer,a=this._length,u=-1,o=-2,i={},C(i,"next",v),C(i,"return",f),he&&C(i,he,l),i;function v(){var c;return u+=1,n||u>=a?{done:!0}:(o+=2,c=new Q7(e[o],e[o+1]),{value:[u,c],done:!1})}function f(c){return n=!0,arguments.length?{value:c,done:!0}:{done:!0}}function l(){return t.entries()}});C(P.prototype,"every",function(e,t){var i,a;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(!e.call(t,vr(i,a),a,this))return!1;return!0});C(P.prototype,"fill",function(e,t,i){var a,n,u,o,v,f;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ur(e))throw new TypeError(N("invalid argument. First argument must be a complex number. Value: `%s`.",e));if(a=this._buffer,n=this._length,arguments.length>1){if(!Lr(t))throw new TypeError(N("invalid argument. Second argument must be an integer. Value: `%s`.",t));if(t<0&&(t+=n,t<0&&(t=0)),arguments.length>2){if(!Lr(i))throw new TypeError(N("invalid argument. Third argument must be an integer. Value: `%s`.",i));i<0&&(i+=n,i<0&&(i=0)),i>n&&(i=n)}else i=n}else t=0,i=n;for(o=ee(e),v=te(e),f=t;f<i;f++)u=2*f,a[u]=o,a[u+1]=v;return this});C(P.prototype,"filter",function(e,t){var i,a,n,u;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=[],n=0;n<this._length;n++)u=vr(i,n),e.call(t,u,n,this)&&a.push(u);return new this.constructor(a)});C(P.prototype,"find",function(e,t){var i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(n=vr(i,a),e.call(t,n,a,this))return n});C(P.prototype,"findIndex",function(e,t){var i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(n=vr(i,a),e.call(t,n,a,this))return a;return-1});C(P.prototype,"findLast",function(e,t){var i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=this._length-1;a>=0;a--)if(n=vr(i,a),e.call(t,n,a,this))return n});C(P.prototype,"findLastIndex",function(e,t){var i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=this._length-1;a>=0;a--)if(n=vr(i,a),e.call(t,n,a,this))return a;return-1});C(P.prototype,"forEach",function(e,t){var i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)n=vr(i,a),e.call(t,n,a,this)});C(P.prototype,"get",function(e){if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ti(e))throw new TypeError(N("invalid argument. Must provide a nonnegative integer. Value: `%s`.",e));if(!(e>=this._length))return vr(this._buffer,e)});Wa(P.prototype,"length",function(){return this._length});C(P.prototype,"includes",function(e,t){var i,a,n,u,o;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ur(e))throw new TypeError(N("invalid argument. First argument must be a complex number. Value: `%s`.",e));if(arguments.length>1){if(!Lr(t))throw new TypeError(N("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0&&(t+=this._length,t<0&&(t=0))}else t=0;for(n=ee(e),u=te(e),i=this._buffer,o=t;o<this._length;o++)if(a=2*o,n===i[a]&&u===i[a+1])return!0;return!1});C(P.prototype,"indexOf",function(e,t){var i,a,n,u,o;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ur(e))throw new TypeError(N("invalid argument. First argument must be a complex number. Value: `%s`.",e));if(arguments.length>1){if(!Lr(t))throw new TypeError(N("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0&&(t+=this._length,t<0&&(t=0))}else t=0;for(n=ee(e),u=te(e),i=this._buffer,o=t;o<this._length;o++)if(a=2*o,n===i[a]&&u===i[a+1])return o;return-1});C(P.prototype,"join",function(e){var t,i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(arguments.length===0)a=",";else if(K7(e))a=e;else throw new TypeError(N("invalid argument. First argument must be a string. Value: `%s`.",e));for(t=[],i=this._buffer,n=0;n<this._length;n++)t.push(vr(i,n).toString());return t.join(a)});C(P.prototype,"keys",function(){var e,t,i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return e=this,i=this._length,n=-1,t={},C(t,"next",u),C(t,"return",o),he&&C(t,he,v),t;function u(){return n+=1,a||n>=i?{done:!0}:{value:n,done:!1}}function o(f){return a=!0,arguments.length?{value:f,done:!0}:{done:!0}}function v(){return e.keys()}});C(P.prototype,"lastIndexOf",function(e,t){var i,a,n,u,o;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Ur(e))throw new TypeError(N("invalid argument. First argument must be a complex number. Value: `%s`.",e));if(arguments.length>1){if(!Lr(t))throw new TypeError(N("invalid argument. Second argument must be an integer. Value: `%s`.",t));t>=this._length?t=this._length-1:t<0&&(t+=this._length)}else t=this._length-1;for(n=ee(e),u=te(e),i=this._buffer,o=t;o>=0;o--)if(a=2*o,n===i[a]&&u===i[a+1])return o;return-1});C(P.prototype,"map",function(e,t){var i,a,n,u,o;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(a=this._buffer,n=new this.constructor(this._length),i=n._buffer,u=0;u<this._length;u++)if(o=e.call(t,vr(a,u),u,this),Ur(o))i[2*u]=ee(o),i[2*u+1]=te(o);else if(Ju(o)&&o.length===2)i[2*u]=o[0],i[2*u+1]=o[1];else throw new TypeError(N("invalid argument. Callback must return either a two-element array containing real and imaginary components or a complex number. Value: `%s`.",o));return n});C(P.prototype,"reduce",function(e,t){var i,a,n,u,o;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));if(i=this._buffer,n=this._length,arguments.length>1)a=t,o=0;else{if(n===0)throw new Error("invalid operation. If not provided an initial value, an array must contain at least one element.");a=vr(i,0),o=1}for(;o<n;o++)u=vr(i,o),a=e(a,u,o,this);return a});C(P.prototype,"reduceRight",function(e,t){var i,a,n,u,o;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));if(i=this._buffer,n=this._length,arguments.length>1)a=t,o=n-1;else{if(n===0)throw new Error("invalid operation. If not provided an initial value, an array must contain at least one element.");a=vr(i,n-1),o=n-2}for(;o>=0;o--)u=vr(i,o),a=e(a,u,o,this);return a});C(P.prototype,"reverse",function(){var e,t,i,a,n,u;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(i=this._length,e=this._buffer,a=arr(i/2),n=0;n<a;n++)u=i-n-1,t=e[2*n],e[2*n]=e[2*u],e[2*u]=t,t=e[2*n+1],e[2*n+1]=e[2*u+1],e[2*u+1]=t;return this});C(P.prototype,"set",function(e){var t,i,a,n,u,o,v,f,l;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(a=this._buffer,arguments.length>1){if(i=arguments[1],!Ti(i))throw new TypeError(N("invalid argument. Index argument must be a nonnegative integer. Value: `%s`.",i))}else i=0;if(Ur(e)){if(i>=this._length)throw new RangeError(N("invalid argument. Index argument is out-of-bounds. Value: `%u`.",i));i*=2,a[i]=ee(e),a[i+1]=te(e);return}if(W(e)){if(o=e._length,i+o>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(t=e._buffer,l=a.byteOffset+i*Mr,t.buffer===a.buffer&&t.byteOffset<l&&t.byteOffset+t.byteLength>l){for(n=new Gr(t.length),f=0;f<t.length;f++)n[f]=t[f];t=n}for(i*=2,l=0,f=0;f<o;f++)a[i]=t[l],a[i+1]=t[l+1],i+=2,l+=2;return}if($u(e)){for(o=e.length,f=0;f<o;f++)if(!Ur(e[f])){u=!0;break}if(u){if(!Ha(o))throw new RangeError(N("invalid argument. Array-like object arguments must have a length which is a multiple of two. Length: `%u`.",o));if(i+o/2>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(t=e,l=a.byteOffset+i*Mr,t.buffer===a.buffer&&t.byteOffset<l&&t.byteOffset+t.byteLength>l){for(n=new Gr(o),f=0;f<o;f++)n[f]=t[f];t=n}for(i*=2,o/=2,l=0,f=0;f<o;f++)a[i]=t[l],a[i+1]=t[l+1],i+=2,l+=2;return}if(i+o>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");for(i*=2,f=0;f<o;f++)v=e[f],a[i]=ee(v),a[i+1]=te(v),i+=2;return}throw new TypeError(N("invalid argument. First argument must be either a complex number, an array-like object, or a complex number array. Value: `%s`.",e))});C(P.prototype,"slice",function(e,t){var i,a,n,u,o,v,f;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(o=this._buffer,v=this._length,arguments.length===0)e=0,t=v;else{if(!Lr(e))throw new TypeError(N("invalid argument. First argument must be an integer. Value: `%s`.",e));if(e<0&&(e+=v,e<0&&(e=0)),arguments.length===1)t=v;else{if(!Lr(t))throw new TypeError(N("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0?(t+=v,t<0&&(t=0)):t>v&&(t=v)}}for(e<t?i=t-e:i=0,n=new this.constructor(i),a=n._buffer,f=0;f<i;f++)u=2*(f+e),a[2*f]=o[u],a[2*f+1]=o[u+1];return n});C(P.prototype,"some",function(e,t){var i,a;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(e.call(t,vr(i,a),a,this))return!0;return!1});C(P.prototype,"sort",function(e){var t,i,a,n,u;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=this._length,t=[],n=0;n<a;n++)t.push(vr(i,n));for(t.sort(e),n=0;n<a;n++)u=2*n,i[u]=ee(t[n]),i[u+1]=te(t[n]);return this});C(P.prototype,"subarray",function(e,t){var i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(a=this._buffer,n=this._length,arguments.length===0)e=0,t=n;else{if(!Lr(e))throw new TypeError(N("invalid argument. First argument must be an integer. Value: `%s`.",e));if(e<0&&(e+=n,e<0&&(e=0)),arguments.length===1)t=n;else{if(!Lr(t))throw new TypeError(N("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n)}}return e>=n?(n=0,i=a.byteLength):e>=t?(n=0,i=a.byteOffset+e*Mr):(n=t-e,i=a.byteOffset+e*Mr),new this.constructor(a.buffer,i,n<0?0:n)});C(P.prototype,"toLocaleString",function(e,t){var i,a,n,u,o;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(arguments.length===0)a=[];else if(K7(e)||rrr(e))a=e;else throw new TypeError(N("invalid argument. First argument must be a string or an array of strings. Value: `%s`.",e));if(arguments.length<2)i={};else if(Xu(t))i=t;else throw new TypeError(N("invalid argument. Options argument must be an object. Value: `%s`.",t));for(u=this._buffer,n=[],o=0;o<this._length;o++)n.push(vr(u,o).toLocaleString(a,i));return n.join(",")});C(P.prototype,"toReversed",function(){var e,t,i,a,n,u;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(i=this._length,t=new this.constructor(i),a=this._buffer,e=t._buffer,n=0;n<i;n++)u=i-n-1,e[2*n]=a[2*u],e[2*n+1]=a[2*u+1];return t});C(P.prototype,"toSorted",function(e){var t,i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!cr(e))throw new TypeError(N("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=this._length,t=[],n=0;n<a;n++)t.push(vr(i,n));return t.sort(e),new P(t)});C(P.prototype,"toString",function(){var e,t,i;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");for(e=[],t=this._buffer,i=0;i<this._length;i++)e.push(vr(t,i).toString());return e.join(",")});C(P.prototype,"values",function(){var e,t,i,a,n,u;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");return t=this,n=this._buffer,i=this._length,u=-1,e={},C(e,"next",o),C(e,"return",v),he&&C(e,he,f),e;function o(){return u+=1,a||u>=i?{done:!0}:{value:vr(n,u),done:!1}}function v(l){return a=!0,arguments.length?{value:l,done:!0}:{done:!0}}function f(){return t.values()}});C(P.prototype,"with",function(e,t){var i,a,n;if(!W(this))throw new TypeError("invalid invocation. `this` is not a complex number array.");if(!Lr(e))throw new TypeError(N("invalid argument. First argument must be an integer. Value: `%s`.",e));if(n=this._length,e<0&&(e+=n),e<0||e>=n)throw new RangeError(N("invalid argument. Index argument is out-of-bounds. Value: `%s`.",e));if(!Ur(t))throw new TypeError(N("invalid argument. Second argument must be a complex number. Value: `%s`.",t));return a=new this.constructor(this._buffer),i=a._buffer,i[2*e]=ee(t),i[2*e+1]=te(t),a});X7.exports=P});var rm=s((IFr,x7)=>{"use strict";var lrr=z7();x7.exports=lrr});var tm=s((NFr,em)=>{"use strict";var crr=dt();function prr(r){var e,t;for(e=[];t=r.next(),!t.done;)e.push(crr(t.value));return e}em.exports=prr});var am=s((FFr,im)=>{"use strict";var mrr=dt();function hrr(r,e,t){var i,a,n;for(i=[],n=-1;a=r.next(),!a.done;)n+=1,i.push(mrr(e.call(t,a.value,n)));return i}im.exports=hrr});var um=s((LFr,nm)=>{"use strict";var grr=dt();function qrr(r,e){var t,i;for(t=e.length,i=0;i<t;i++)r[i]=grr(e[i]);return r}nm.exports=qrr});var pm=s((PFr,cm)=>{"use strict";var Ai=Re().isPrimitive,zu=Cr(),sm=wi(),xu=Bt(),pr=jr(),Oi=Nr().isPrimitive,ie=dr().isPrimitive,om=hr().isPrimitive,yrr=Ra().primitives,wrr=bi(),ge=Ba(),j=O(),Ya=_t(),Ve=Je(),X=dt(),brr=Et(),drr=tr(),_rr=Qe(),B=S(),vm=tm(),Err=am(),Trr=um(),Tt=Ve.BYTES_PER_ELEMENT,fm=wrr();function K(r){return typeof r=="object"&&r!==null&&r.constructor.name==="BooleanArray"&&r.BYTES_PER_ELEMENT===Tt}function lm(r){return r===M}function M(){var r,e,t,i,a;if(e=arguments.length,!(this instanceof M))return e===0?new M:e===1?new M(arguments[0]):e===2?new M(arguments[0],arguments[1]):new M(arguments[0],arguments[1],arguments[2]);if(e===0)t=new Ve(0);else if(e===1)if(a=arguments[0],Ai(a))t=new Ve(a);else if(zu(a))t=Trr(new Ve(a.length),a);else if(sm(a))t=new Ve(a);else if(xu(a)){if(fm===!1)throw new TypeError(B("invalid argument. Environment lacks Symbol.iterator support. Must provide a length, ArrayBuffer, typed array, or array-like object. Value: `%s`.",a));if(!pr(a[ge]))throw new TypeError(B("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",a));if(t=a[ge](),!pr(t.next))throw new TypeError(B("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",a));t=new Ve(vm(t))}else throw new TypeError(B("invalid argument. Must provide a length, ArrayBuffer, typed array, array-like object, or an iterable. Value: `%s`.",a));else{if(t=arguments[0],!sm(t))throw new TypeError(B("invalid argument. First argument must be an ArrayBuffer. Value: `%s`.",t));if(r=arguments[1],!Ai(r))throw new TypeError(B("invalid argument. Byte offset must be a nonnegative integer. Value: `%s`.",r));if(e===2)t=new Ve(t,r);else{if(i=arguments[2],!Ai(i))throw new TypeError(B("invalid argument. Length must be a nonnegative integer. Value: `%s`.",i));if(i*Tt>t.byteLength-r)throw new RangeError(B("invalid arguments. ArrayBuffer has insufficient capacity. Either decrease the array length or provide a bigger buffer. Minimum capacity: `%u`.",i*Tt));t=new Ve(t,r,i)}}return j(this,"_buffer",t),j(this,"_length",t.length),this}j(M,"BYTES_PER_ELEMENT",Tt);j(M,"name","BooleanArray");j(M,"from",function(e){var t,i,a,n,u,o,v,f,l;if(!pr(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!lm(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(i=arguments.length,i>1){if(a=arguments[1],!pr(a))throw new TypeError(B("invalid argument. Second argument must be a function. Value: `%s`.",a));i>2&&(t=arguments[2])}if(zu(e)){if(a){for(f=e.length,e.get&&e.set?v=_rr("default"):v=brr("default"),n=new this(f),u=n._buffer,l=0;l<f;l++)u[l]=X(a.call(t,v(e,l),l));return n}return new this(e)}if(xu(e)&&fm&&pr(e[ge])){if(u=e[ge](),!pr(u.next))throw new TypeError(B("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",e));for(a?o=Err(u,a,t):o=vm(u),f=o.length,n=new this(f),u=n._buffer,l=0;l<f;l++)u[l]=o[l];return n}throw new TypeError(B("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",e))});j(M,"of",function(){var e,t;if(!pr(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!lm(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");for(e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);return new this(e)});j(M.prototype,"at",function(e){var t,i;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!ie(e))throw new TypeError(B("invalid argument. Must provide an integer. Value: `%s`.",e));if(i=this._length,t=this._buffer,e<0&&(e+=i),!(e<0||e>=i))return X(t[e])});Ya(M.prototype,"buffer",function(){return this._buffer.buffer});Ya(M.prototype,"byteLength",function(){return this._buffer.byteLength});Ya(M.prototype,"byteOffset",function(){return this._buffer.byteOffset});j(M.prototype,"BYTES_PER_ELEMENT",M.BYTES_PER_ELEMENT);j(M.prototype,"copyWithin",function(e,t){if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");return arguments.length===2?this._buffer.copyWithin(e,t):this._buffer.copyWithin(e,t,arguments[2]),this});j(M.prototype,"entries",function(){var e,t,i,a,n,u;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");return e=this,a=this._buffer,i=this._length,u=-1,t={},j(t,"next",o),j(t,"return",v),ge&&j(t,ge,f),t;function o(){return u+=1,n||u>=i?{done:!0}:{value:[u,X(a[u])],done:!1}}function v(l){return n=!0,arguments.length?{value:l,done:!0}:{done:!0}}function f(){return e.entries()}});j(M.prototype,"every",function(e,t){var i,a;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(!e.call(t,X(i[a]),a,this))return!1;return!0});j(M.prototype,"fill",function(e,t,i){var a,n,u,o;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!Oi(e))throw new TypeError(B("invalid argument. First argument must be a boolean. Value: `%s`.",e));if(a=this._buffer,n=this._length,arguments.length>1){if(!ie(t))throw new TypeError(B("invalid argument. Second argument must be an integer. Value: `%s`.",t));if(t<0&&(t+=n,t<0&&(t=0)),arguments.length>2){if(!ie(i))throw new TypeError(B("invalid argument. Third argument must be an integer. Value: `%s`.",i));i<0&&(i+=n,i<0&&(i=0)),i>n&&(i=n)}else i=n}else t=0,i=n;for(e?u=1:u=0,o=t;o<i;o++)a[o]=u;return this});j(M.prototype,"filter",function(e,t){var i,a,n,u;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=[],n=0;n<this._length;n++)u=X(i[n]),e.call(t,u,n,this)&&a.push(u);return new this.constructor(a)});j(M.prototype,"find",function(e,t){var i,a,n;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,n=0;n<this._length;n++)if(a=X(i[n]),e.call(t,a,n,this))return a});j(M.prototype,"findIndex",function(e,t){var i,a,n;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,n=0;n<this._length;n++)if(a=X(i[n]),e.call(t,a,n,this))return n;return-1});j(M.prototype,"findLast",function(e,t){var i,a,n;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,n=this._length-1;n>=0;n--)if(a=X(i[n]),e.call(t,a,n,this))return a});j(M.prototype,"findLastIndex",function(e,t){var i,a,n;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,n=this._length-1;n>=0;n--)if(a=X(i[n]),e.call(t,a,n,this))return n;return-1});j(M.prototype,"forEach",function(e,t){var i,a;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)e.call(t,X(i[a]),a,this)});j(M.prototype,"get",function(e){if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!Ai(e))throw new TypeError(B("invalid argument. Must provide a nonnegative integer. Value: `%s`.",e));if(!(e>=this._length))return X(this._buffer[e])});j(M.prototype,"includes",function(e,t){var i,a;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!Oi(e))throw new TypeError(B("invalid argument. First argument must be a boolean. Value: `%s`.",e));if(arguments.length>1){if(!ie(t))throw new TypeError(B("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0&&(t+=this._length,t<0&&(t=0))}else t=0;for(i=this._buffer,a=t;a<this._length;a++)if(e===X(i[a]))return!0;return!1});j(M.prototype,"indexOf",function(e,t){var i,a;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!Oi(e))throw new TypeError(B("invalid argument. First argument must be a boolean. Value: `%s`.",e));if(arguments.length>1){if(!ie(t))throw new TypeError(B("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0&&(t+=this._length,t<0&&(t=0))}else t=0;for(i=this._buffer,a=t;a<this._length;a++)if(e===X(i[a]))return a;return-1});j(M.prototype,"join",function(e){var t,i,a;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(arguments.length>0){if(!om(e))throw new TypeError(B("invalid argument. First argument must be a string. Value: `%s`.",e))}else e=",";for(t=this._buffer,i=[],a=0;a<this._length;a++)t[a]?i.push("true"):i.push("false");return i.join(e)});j(M.prototype,"keys",function(){var e,t,i,a,n;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");return e=this,i=this._length,n=-1,t={},j(t,"next",u),j(t,"return",o),ge&&j(t,ge,v),t;function u(){return n+=1,a||n>=i?{done:!0}:{value:n,done:!1}}function o(f){return a=!0,arguments.length?{value:f,done:!0}:{done:!0}}function v(){return e.keys()}});j(M.prototype,"lastIndexOf",function(e,t){var i,a;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!Oi(e))throw new TypeError(B("invalid argument. First argument must be a boolean. Value: `%s`.",e));if(arguments.length>1){if(!ie(t))throw new TypeError(B("invalid argument. Second argument must be an integer. Value: `%s`.",t));t>=this._length?t=this._length-1:t<0&&(t+=this._length)}else t=this._length-1;for(i=this._buffer,a=t;a>=0;a--)if(e===X(i[a]))return a;return-1});Ya(M.prototype,"length",function(){return this._length});j(M.prototype,"map",function(e,t){var i,a,n,u;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError("invalid argument. First argument must be a function. Value: `%s`.",e);for(n=this._buffer,a=new this.constructor(this._length),i=a._buffer,u=0;u<this._length;u++)i[u]=X(e.call(t,X(n[u]),u,this));return a});j(M.prototype,"reduce",function(e,t){var i,a,n,u;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));if(i=this._buffer,a=this._length,arguments.length>1)n=t,u=0;else{if(a===0)throw new Error("invalid operation. If not provided an initial value, an array must contain at least one element.");n=X(i[0]),u=1}for(;u<a;u++)n=e(n,X(i[u]),u,this);return n});j(M.prototype,"reduceRight",function(e,t){var i,a,n,u;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));if(i=this._buffer,a=this._length,arguments.length>1)n=t,u=a-1;else{if(a===0)throw new Error("invalid operation. If not provided an initial value, an array must contain at least one element.");n=X(i[a-1]),u=a-2}for(;u>=0;u--)n=e(n,X(i[u]),u,this);return n});j(M.prototype,"reverse",function(){var e,t,i,a,n,u;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");for(e=this._buffer,i=this._length,a=drr(i/2),n=0;n<a;n++)u=i-n-1,t=e[n],e[n]=e[u],e[u]=t;return this});j(M.prototype,"set",function(e){var t,i,a,n,u,o,v;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(a=this._buffer,arguments.length>1){if(i=arguments[1],!Ai(i))throw new TypeError(B("invalid argument. Index argument must be a nonnegative integer. Value: `%s`.",i))}else i=0;if(zu(e)){if(u=e.length,i+u>this._length)throw new RangeError("invalid arguments. Target array lacks sufficient storage to accommodate source values.");if(K(e)?t=e._buffer:t=e,v=a.byteOffset+i*Tt,t.buffer===a.buffer&&t.byteOffset<v&&t.byteOffset+t.byteLength>v){for(n=new Ve(t.length),o=0;o<t.length;o++)n[o]=t[o];t=n}for(o=0;o<u;i++,o++)a[i]=t[o]?1:0;return}if(i>=this._length)throw new RangeError(B("invalid argument. Index argument is out-of-bounds. Value: `%u`.",i));a[i]=e?1:0});j(M.prototype,"slice",function(e,t){var i,a,n,u,o,v;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(u=this._buffer,o=this._length,arguments.length===0)e=0,t=o;else{if(!ie(e))throw new TypeError(B("invalid argument. First argument must be an integer. Value: `%s`.",e));if(e<0&&(e+=o,e<0&&(e=0)),arguments.length===1)t=o;else{if(!ie(t))throw new TypeError(B("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0?(t+=o,t<0&&(t=0)):t>o&&(t=o)}}for(e<t?i=t-e:i=0,n=new this.constructor(i),a=n._buffer,v=0;v<i;v++)a[v]=u[v+e];return n});j(M.prototype,"some",function(e,t){var i,a;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));for(i=this._buffer,a=0;a<this._length;a++)if(e.call(t,X(i[a]),a,this))return!0;return!1});j(M.prototype,"sort",function(e){var t;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(t=this._buffer,arguments.length===0)return t.sort(),this;if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));return t.sort(i),this;function i(a,n){return e(X(a),X(n))}});j(M.prototype,"subarray",function(e,t){var i,a,n;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(a=this._buffer,n=this._length,arguments.length===0)e=0,t=n;else{if(!ie(e))throw new TypeError(B("invalid argument. First argument must be an integer. Value: `%s`.",e));if(e<0&&(e+=n,e<0&&(e=0)),arguments.length===1)t=n;else{if(!ie(t))throw new TypeError(B("invalid argument. Second argument must be an integer. Value: `%s`.",t));t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n)}}return e>=n?(n=0,i=a.byteLength):e>=t?(n=0,i=a.byteOffset+e*Tt):(n=t-e,i=a.byteOffset+e*Tt),new this.constructor(a.buffer,i,n<0?0:n)});j(M.prototype,"toLocaleString",function(e,t){var i,a,n,u,o;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(arguments.length===0)a=[];else if(om(e)||yrr(e))a=e;else throw new TypeError(B("invalid argument. First argument must be a string or an array of strings. Value: `%s`.",e));if(arguments.length<2)i={};else if(xu(t))i=t;else throw new TypeError(B("invalid argument. Options argument must be an object. Value: `%s`.",t));for(u=this._buffer,n=[],o=0;o<this._length;o++)n.push(X(u[o]).toLocaleString(a,i));return n.join(",")});j(M.prototype,"toReversed",function(){var e,t,i,a,n;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");for(i=this._length,t=new this.constructor(i),a=this._buffer,e=t._buffer,n=0;n<i;n++)e[n]=a[i-n-1];return t});j(M.prototype,"toSorted",function(e){var t,i,a,n,u;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");for(a=this._length,i=new this.constructor(a),n=this._buffer,t=i._buffer,u=0;u<a;u++)t[u]=n[u];if(arguments.length===0)return t.sort(),i;if(!pr(e))throw new TypeError(B("invalid argument. First argument must be a function. Value: `%s`.",e));return t.sort(o),i;function o(v,f){return e(X(v),X(f))}});j(M.prototype,"toString",function(){var e,t,i;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");for(e=[],t=this._buffer,i=0;i<this._length;i++)t[i]?e.push("true"):e.push("false");return e.join(",")});j(M.prototype,"values",function(){var e,t,i,a,n,u;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");return t=this,n=this._buffer,i=this._length,u=-1,e={},j(e,"next",o),j(e,"return",v),ge&&j(e,ge,f),e;function o(){return u+=1,a||u>=i?{done:!0}:{value:X(n[u]),done:!1}}function v(l){return a=!0,arguments.length?{value:l,done:!0}:{done:!0}}function f(){return t.values()}});j(M.prototype,"with",function(e,t){var i,a,n;if(!K(this))throw new TypeError("invalid invocation. `this` is not a boolean array.");if(!ie(e))throw new TypeError(B("invalid argument. First argument must be an integer. Value: `%s`.",e));if(n=this._length,e<0&&(e+=n),e<0||e>=n)throw new RangeError(B("invalid argument. Index argument is out-of-bounds. Value: `%s`.",e));if(!Oi(t))throw new TypeError(B("invalid argument. Second argument must be a boolean. Value: `%s`.",t));return a=new this.constructor(this._buffer),i=a._buffer,t?i[e]=1:i[e]=0,a});cm.exports=M});var hm=s((RFr,mm)=>{"use strict";var Arr=pm();mm.exports=Arr});var qm=s((MFr,gm)=>{"use strict";var Orr=Tr(),Srr=yi(),Irr=Ze(),Nrr=pp(),Frr=Ru(),Lrr=zp(),Prr=Je(),Rrr=R8(),Mrr=r5(),Vrr=P7(),Crr=rm(),jrr=hm(),Brr=[Orr,Srr,Nrr,Irr,Lrr,Frr,Mrr,Prr,Rrr,Vrr,Crr,jrr];gm.exports=Brr});var wm=s((VFr,ym)=>{"use strict";var krr=["float64","float32","int32","uint32","int16","uint16","int8","uint8","uint8c","complex64","complex128","bool"];ym.exports=krr});var _m=s((CFr,dm)=>{"use strict";var Grr=yu(),Urr=pe(),Drr=Ia(),Hrr=x6(),Wrr=qm(),bm=wm(),Yrr=bm.length;function Krr(r){var e;if(Urr(r))return"generic";if(Grr(r))return null;for(e=0;e<Yrr;e++)if(r instanceof Wrr[e])return bm[e];return Hrr[Drr(r)]||null}dm.exports=Krr});var Si=s((jFr,Em)=>{"use strict";var Qrr=_m();Em.exports=Qrr});var Am=s((BFr,Tm)=>{"use strict";var Zrr=qi(),Jrr=Et(),$rr=D6(),Xrr=Qe(),zrr=X6(),xrr=Si();function rer(r){var e=xrr(r);return Zrr(r)?{data:r,dtype:e,accessorProtocol:!0,accessors:[Xrr(e),zrr(e)]}:{data:r,dtype:e,accessorProtocol:!1,accessors:[Jrr(e),$rr(e)]}}Tm.exports=rer});var Ce=s((kFr,Om)=>{"use strict";var eer=Am();Om.exports=eer});var Im=s((GFr,Sm)=>{"use strict";var ter=Ce(),ier=Array.prototype.slice;function aer(r,e){return typeof r[e]=="function"}function ner(r,e,t){return ier.call(r,e,t)}function uer(r,e,t){var i,a,n,u;for(i=r.data,a=r.accessors[0],n=[],u=e;u<t;u++)n.push(a(i,u));return n}function ser(r,e,t){var i;return aer(r,"slice")?r.slice(e,t):(i=ter(r),i.accessorProtocol?uer(i,e,t):ner(r,e,t))}Sm.exports=ser});var Fm=s((UFr,Nm)=>{"use strict";var oer=Im();Nm.exports=oer});var Pm=s((DFr,Lm)=>{"use strict";function ver(r,e){return e&&(r===2||r===3)}Lm.exports=ver});var Mm=s((HFr,Rm)=>{"use strict";function fer(r,e){return e&&(r===1||r===3)}Rm.exports=fer});var Cm=s((WFr,Vm)=>{"use strict";function ler(r,e,t){var i,a,n,u,o;for(i=r.length,a=t,n=t,o=0;o<i;o++){if(r[o]===0)return[t,t];u=e[o],u>0?n+=u*(r[o]-1):u<0&&(a+=u*(r[o]-1))}return[a,n]}Vm.exports=ler});var Bm=s((YFr,jm)=>{"use strict";function cer(r,e,t,i){var a,n,u,o,v;for(a=r.length,n=t,u=t,v=0;v<a;v++){if(r[v]===0)return i[0]=t,i[1]=t,i;o=e[v],o>0?u+=o*(r[v]-1):o<0&&(n+=o*(r[v]-1))}return i[0]=n,i[1]=u,i}jm.exports=cer});var rs=s((KFr,Gm)=>{"use strict";var per=O(),km=Cm(),mer=Bm();per(km,"assign",mer);Gm.exports=km});var Dm=s((QFr,Um)=>{"use strict";var her=rs();function ger(r,e,t,i,a){var n;return r===0||a===0?!1:(n=her(e,t,i),r===n[1]-n[0]+1)}Um.exports=ger});var Wm=s((ZFr,Hm)=>{"use strict";function qer(r){return{ROW_MAJOR_CONTIGUOUS:r.ROW_MAJOR_CONTIGUOUS,COLUMN_MAJOR_CONTIGUOUS:r.COLUMN_MAJOR_CONTIGUOUS,READONLY:r.READONLY}}Hm.exports=qer});var Km=s((JFr,Ym)=>{"use strict";function yer(r){return r==="column-major"}Ym.exports=yer});var Ii=s(($Fr,Qm)=>{"use strict";var wer=Km();Qm.exports=wer});var Jm=s((XFr,Zm)=>{"use strict";var ber=Ii();function der(r){var e,t,i,a,n,u;if(i=this._ndims,i===0)return this._accessors?this._buffer.get(this._offset):this._buffer[this._offset];if(this._flags.ROW_MAJOR_CONTIGUOUS||this._flags.COLUMN_MAJOR_CONTIGUOUS){if(this._iterationOrder===1)return this._accessors?this._buffer.get(this._offset+r):this._buffer[this._offset+r];if(this._iterationOrder===-1)return this._accessors?this._buffer.get(this.offset-r):this._buffer[this._offset-r]}if(t=this._shape,e=this._strides,a=this._offset,ber(this._order)){for(u=0;u<i;u++)n=r%t[u],r-=n,r/=t[u],a+=n*e[u];return this._accessors?this._buffer.get(a):this._buffer[a]}for(u=i-1;u>=0;u--)n=r%t[u],r-=n,r/=t[u],a+=n*e[u];return this._accessors?this._buffer.get(a):this._buffer[a]}Zm.exports=der});var Xm=s((zFr,$m)=>{"use strict";var _er=Ii();function Eer(r,e){var t,i,a,n,u,o;if(a=this._ndims,a===0)return this._accessors?this._buffer.set(r,this._offset):this._buffer[this._offset]=r,this;if(this._flags.ROW_MAJOR_CONTIGUOUS||this._flags.COLUMN_MAJOR_CONTIGUOUS){if(this._iterationOrder===1)return this._accessors?this._buffer.set(e,this._offset+r):this._buffer[this._offset+r]=e,this;if(this._iterationOrder===-1)return this._accessors?this._buffer.set(e,this._offset-r):this._buffer[this._offset-r]=e,this}if(i=this._shape,t=this._strides,n=this._offset,_er(this._order)){for(o=0;o<a;o++)u=r%i[o],r-=u,r/=i[o],n+=u*t[o];return this._accessors?this._buffer.set(e,n):this._buffer[n]=e,this}for(o=a-1;o>=0;o--)u=r%i[o],r-=u,r/=i[o],n+=u*t[o];return this._accessors?this._buffer.set(e,n):this._buffer[n]=e,this}$m.exports=Eer});var xm=s((xFr,zm)=>{"use strict";function Ter(){var r,e;for(r=this._offset,e=0;e<arguments.length-1;e++)r+=this._strides[e]*arguments[e];return this._accessors?this._buffer.set(arguments[e],r):this._buffer[r]=arguments[e],this}zm.exports=Ter});var e9=s((rLr,r9)=>{"use strict";function Aer(){var r,e;for(r=this._offset,e=0;e<arguments.length;e++)r+=this._strides[e]*arguments[e];return this._accessors?this._buffer.get(r):this._buffer[r]}r9.exports=Aer});var i9=s((eLr,t9)=>{"use strict";function Oer(){return this._ndims===0?this.iget():this}t9.exports=Oer});var n9=s((tLr,a9)=>{"use strict";var Ser=xe(),Ier=rt();function Ner(){var r,e,t,i;for(e=this._length,r={},r.type="ndarray",r.dtype=this.dtype,r.flags={READONLY:this._flags.READONLY},r.order=this._order,r.shape=this._shape.slice(),r.strides=this._strides.slice(),i=0;i<r.strides.length;i++)r.strides[i]<0&&(r.strides[i]*=-1);if(r.data=[],r.dtype==="complex64"||r.dtype==="complex128")for(i=0;i<e;i++)t=this.iget(i),r.data.push(Ser(t),Ier(t));else for(i=0;i<e;i++)r.data.push(this.iget(i));return r}a9.exports=Ner});var o9=s((iLr,s9)=>{"use strict";var Fer=hr().isPrimitive,Ler=S(),u9=/[-\/\\^$*+?.()|[\]{}]/g;function Per(r){var e,t,i;if(!Fer(r))throw new TypeError(Ler("invalid argument. Must provide a regular expression string. Value: `%s`.",r));if(r[0]==="/")for(e=r.length,i=e-1;i>=0&&r[i]!=="/";i--);return i===void 0||i<=0?r.replace(u9,"\\$&"):(t=r.substring(1,i),t=t.replace(u9,"\\$&"),r=r[0]+t+r.substring(i),r)}s9.exports=Per});var f9=s((aLr,v9)=>{"use strict";var Rer=o9();v9.exports=Rer});var c9=s((nLr,l9)=>{"use strict";var Mer=RegExp.prototype.exec;l9.exports=Mer});var m9=s((uLr,p9)=>{"use strict";var Ver=c9();function Cer(r){try{return Ver.call(r),!0}catch{return!1}}p9.exports=Cer});var g9=s((sLr,h9)=>{"use strict";var jer=Ct(),Ber=sr(),ker=m9(),Ger=jer();function Uer(r){return typeof r=="object"?r instanceof RegExp?!0:Ger?ker(r):Ber(r)==="[object RegExp]":!1}h9.exports=Uer});var y9=s((oLr,q9)=>{"use strict";var Der=g9();q9.exports=Der});var b9=s((vLr,w9)=>{"use strict";function Her(r,e,t){return r.replace(e,t)}w9.exports=Her});var es=s((fLr,d9)=>{"use strict";var Wer=b9();d9.exports=Wer});var E9=s((lLr,_9)=>{"use strict";var Yer=f9(),Ker=jr(),ts=hr().isPrimitive,Qer=y9(),is=S(),Zer=es();function Jer(r,e,t){if(!ts(r))throw new TypeError(is("invalid argument. First argument must be a string. Value: `%s`.",r));if(ts(e))e=new RegExp(Yer(e),"g");else if(!Qer(e))throw new TypeError(is("invalid argument. Second argument must be a string or regular expression. Value: `%s`.",e));if(!ts(t)&&!Ker(t))throw new TypeError(is("invalid argument. Third argument must be a string or replacement function. Value: `%s`.",t));return Zer(r,e,t)}_9.exports=Jer});var A9=s((cLr,T9)=>{"use strict";var $er=E9();T9.exports=$er});var S9=s((pLr,O9)=>{"use strict";var Xer=A9(),as=xe(),ns=rt(),zer={int8:"new Int8Array( [ {{data}} ] )",uint8:"new Uint8Array( [ {{data}} ] )",uint8c:"new Uint8ClampedArray( [ {{data}} ] )",int16:"new Int16Array( [ {{data}} ] )",uint16:"new Uint16Array( [ {{data}} ] )",int32:"new Int32Array( [ {{data}} ] )",uint32:"new Uint32Array( [ {{data}} ] )",float32:"new Float32Array( [ {{data}} ] )",float64:"new Float64Array( [ {{data}} ] )",generic:"[ {{data}} ]",binary:"new Buffer( [ {{data}} ] )",complex64:"new Complex64Array( [ {{data}} ] )",complex128:"new Complex128Array( [ {{data}} ] )",bool:"new BooleanArray( [ {{data}} ] )"};function xer(){var r,e,t,i,a,n,u;if(e=this._shape.length,a=this._dtype,i="ndarray( '"+a+"', ",r="",this._length<=100)if(a==="complex64"||a==="complex128")for(u=0;u<this._length;u++)n=this.iget(u),r+=as(n)+", "+ns(n),u<this._length-1&&(r+=", ");else for(u=0;u<this._length;u++)r+=this.iget(u),u<this._length-1&&(r+=", ");else{if(a==="complex64"||a==="complex128")for(u=0;u<3;u++)n=this.iget(u),r+=as(n)+", "+ns(n),u<2&&(r+=", ");else for(u=0;u<3;u++)r+=this.iget(u),u<2&&(r+=", ");if(r+=", ..., ",a==="complex64"||a==="complex128")for(u=2;u>=0;u--)n=this.iget(this._length-1-u),r+=as(n)+", "+ns(n),u>0&&(r+=", ");else for(u=2;u>=0;u--)r+=this.iget(this._length-1-u),u>0&&(r+=", ")}if(t=zer[this.dtype],i+=Xer(t,"{{data}}",r),i+=", ",e===0?i+="[]":i+="[ "+this._shape.join(", ")+" ]",i+=", ",i+="[ ",e===0)i+="0";else for(u=0;u<e;u++)this._strides[u]<0?i+=-this._strides[u]:i+=this._strides[u],u<e-1&&(i+=", ");return i+=" ]",i+=", ",i+="0",i+=", ",i+="'"+this._order+"'",i+=" )",i}O9.exports=xer});var N9=s((mLr,I9)=>{"use strict";var rtr=Je(),etr=Ru(),ttr={uint16:etr,uint8:rtr};I9.exports=ttr});var R9=s((hLr,P9)=>{"use strict";var F9=N9(),L9;function itr(){var r,e;return r=new F9.uint16(1),r[0]=4660,e=new F9.uint8(r.buffer),e[0]===52}L9=itr();P9.exports=L9});var ae=s((gLr,M9)=>{"use strict";var atr=R9();M9.exports=atr});var C9=s((qLr,V9)=>{"use strict";var ntr=typeof ArrayBuffer=="function"?ArrayBuffer:null;V9.exports=ntr});var B9=s((yLr,j9)=>{"use strict";var utr=wi(),str=Tr(),Ka=C9();function otr(){var r,e,t;if(typeof Ka!="function")return!1;try{t=new Ka(16),r=utr(t)&&typeof Ka.isView=="function",r&&(e=new str(t),e[0]=-3.14,e[1]=NaN,r=r&&Ka.isView(e)&&t.byteLength===16&&e[0]===-3.14&&e[1]!==e[1])}catch{r=!1}return r}j9.exports=otr});var G9=s((wLr,k9)=>{"use strict";var vtr=B9();k9.exports=vtr});var D9=s((bLr,U9)=>{"use strict";var ftr=typeof ArrayBuffer=="function"?ArrayBuffer:void 0;U9.exports=ftr});var W9=s((dLr,H9)=>{"use strict";function ltr(){throw new Error("not implemented")}H9.exports=ltr});var Qa=s((_Lr,Y9)=>{"use strict";var ctr=G9(),ptr=D9(),mtr=W9(),us;ctr()?us=ptr:us=mtr;Y9.exports=us});var Q9=s((ELr,K9)=>{"use strict";var htr=sr(),gtr=typeof DataView=="function";function qtr(r){return gtr&&r instanceof DataView||htr(r)==="[object DataView]"}K9.exports=qtr});var J9=s((TLr,Z9)=>{"use strict";var ytr=Q9();Z9.exports=ytr});var X9=s((ALr,$9)=>{"use strict";var wtr=typeof DataView=="function"?DataView:null;$9.exports=wtr});var rh=s((OLr,x9)=>{"use strict";var btr=J9(),dtr=Qa(),z9=X9();function _tr(){var r,e,t;if(typeof z9!="function")return!1;try{t=new dtr(24),e=new z9(t,8),r=btr(e)&&typeof e.getFloat64=="function"&&typeof e.setFloat64=="function",r&&(e.setFloat64(0,-3.14),e.setFloat64(8,NaN),r=r&&e.buffer===t&&e.byteLength===16&&e.byteOffset===8&&e.getFloat64(0)===-3.14&&e.getFloat64(8)!==e.getFloat64(8))}catch{r=!1}return r}x9.exports=_tr});var th=s((SLr,eh)=>{"use strict";var Etr=rh();eh.exports=Etr});var ah=s((ILr,ih)=>{"use strict";var Ttr=typeof DataView=="function"?DataView:void 0;ih.exports=Ttr});var uh=s((NLr,nh)=>{"use strict";function Atr(){throw new Error("not implemented")}nh.exports=Atr});var Ni=s((FLr,sh)=>{"use strict";var Otr=th(),Str=ah(),Itr=uh(),ss;Otr()?ss=Str:ss=Itr;sh.exports=ss});var vh=s((LLr,oh)=>{"use strict";var Ntr=typeof BigInt=="function"?BigInt:void 0;oh.exports=Ntr});var lh=s((PLr,fh)=>{"use strict";var Ftr=vh();fh.exports=Ftr});var ch=s((RLr,Ltr)=>{Ltr.exports=["row-major","column-major"]});var mh=s((MLr,ph)=>{"use strict";var Ptr=ch();function Rtr(){return Ptr.slice()}ph.exports=Rtr});var hh=s((VLr,Mtr)=>{Mtr.exports=["row-major","column-major"]});var qh=s((CLr,gh)=>{"use strict";var Vtr=hh();function Ctr(){return Vtr.slice()}gh.exports=Ctr});var wh=s((jLr,yh)=>{"use strict";function jtr(){return{"row-major":101,"column-major":102}}yh.exports=jtr});var _h=s((BLr,dh)=>{"use strict";var Btr=O(),bh=qh(),ktr=wh();Btr(bh,"enum",ktr);dh.exports=bh});var Ah=s((kLr,Th)=>{"use strict";var Gtr=_h().enum,Eh=Gtr();function Utr(){return{"row-major":Eh["row-major"],"column-major":Eh["column-major"]}}Th.exports=Utr});var Za=s((GLr,Sh)=>{"use strict";var Dtr=O(),Oh=mh(),Htr=Ah();Dtr(Oh,"enum",Htr);Sh.exports=Oh});var Ih=s((ULr,Wtr)=>{Wtr.exports=["throw","normalize","clamp","wrap"]});var Fh=s((DLr,Nh)=>{"use strict";var Ytr=Ih();function Ktr(){return Ytr.slice()}Nh.exports=Ktr});var Ph=s((HLr,Lh)=>{"use strict";function Qtr(){return{throw:1,clamp:2,wrap:3,normalize:4}}Lh.exports=Qtr});var Ja=s((WLr,Mh)=>{"use strict";var Ztr=O(),Rh=Fh(),Jtr=Ph();Ztr(Rh,"enum",Jtr);Mh.exports=Rh});var jh=s((YLr,Ch)=>{"use strict";var et=ae(),$tr=Qa(),Xtr=Ni(),Fi=lh(),ztr=gi(),xtr=Za().enum,rir=Ja().enum,eir=ztr(),tir=xtr(),Vh=rir();function iir(){var r,e,t,i,a,n,u,o,v,f,l,c,p,m;if(v=this._mode||"throw",u=this._submode||[v],c=this._ndims,p=u.length,t=33+c*16+p,o=this.__meta_dataview__,o&&o.byteLength===t)return o;for(o=new Xtr(new $tr(t)),a=this._shape,n=this._strides,i=this._dtype,r=this._bytesPerElement,f=0,o.setInt8(f,et?1:0),f+=1,o.setInt16(f,eir[i],et),f+=2,o.setBigInt64(f,Fi(c),et),l=c*8,f+=8,m=0;m<c;m++)o.setBigInt64(f,Fi(a[m]),et),o.setBigInt64(f+l,Fi(n[m]*r),et),f+=8;for(f+=l,o.setBigInt64(f,Fi(this._offset*r),et),f+=8,o.setInt8(f,tir[this._order]),f+=1,o.setInt8(f,Vh[v]),f+=1,o.setBigInt64(f,Fi(p),et),f+=8,m=0;m<p;m++)o.setInt8(f,Vh[u[m]]),f+=1;return e=0,e|=this._flags.READONLY?4:0,o.setInt32(f,e,et),this.__meta_dataview__=o,o}Ch.exports=iir});var kh=s((KLr,Bh)=>{"use strict";var Li=ae(),air=Je(),nir=Ni(),uir=tr(),sir=4294967295,oir=4294967296;function vir(r){var e,t,i,a;return e=new air(8),r===0||(a=(r&sir)>>>0,i=uir(r/oir),t=new nir(e.buffer),Li?(t.setUint32(0,a,Li),t.setUint32(4,i,Li)):(t.setUint32(0,i,Li),t.setUint32(4,a,Li))),e}Bh.exports=vir});var Uh=s((QLr,Gh)=>{"use strict";var Pi=ae(),fir=Je(),lir=Ni(),cir=tr(),pir=4294967295,mir=4294967296,Xa=new fir(8),$a=new lir(Xa.buffer);function hir(r,e,t,i){var a,n,u;if(r===0){for(u=0;u<Xa.length;u++)e[i]=0,i+=t;return e}for(n=(r&pir)>>>0,a=cir(r/mir),Pi?($a.setUint32(0,n,Pi),$a.setUint32(4,a,Pi)):($a.setUint32(0,a,Pi),$a.setUint32(4,n,Pi)),u=0;u<Xa.length;u++)e[i]=Xa[u],i+=t;return e}Gh.exports=hir});var Wh=s((ZLr,Hh)=>{"use strict";var gir=O(),Dh=kh(),qir=Uh();gir(Dh,"assign",qir);Hh.exports=Dh});var Qh=s((JLr,Kh)=>{"use strict";var os=ae(),yir=Qa(),wir=Ni(),bir=Je(),dir=gi(),_ir=Za().enum,Eir=Ja().enum,Ri=Wh().assign,Tir=dir(),Air=_ir(),Yh=Eir();function Oir(){var r,e,t,i,a,n,u,o,v,f,l,c,p,m,h;if(f=this._mode||"throw",o=this._submode||[f],p=this._ndims,m=o.length,i=33+p*16+m,v=this.__meta_dataview__,v&&v.byteLength===i)return v;for(v=new wir(new yir(i)),e=new bir(v.buffer),n=this._shape,u=this._strides,a=this._dtype,r=this._bytesPerElement,l=0,v.setInt8(l,os?1:0),l+=1,v.setInt16(l,Tir[a],os),l+=2,Ri(p,e,1,l),c=p*8,l+=8,h=0;h<p;h++)Ri(n[h],e,1,l),Ri(u[h]*r,e,1,l+c),l+=8;for(l+=c,Ri(this._offset*r,e,1,l),l+=8,v.setInt8(l,Air[this._order]),l+=1,v.setInt8(l,Yh[f]),l+=1,Ri(m,e,1,l),l+=8,h=0;h<m;h++)v.setInt8(l,Yh[o[h]]),l+=1;return t=0,t|=this._flags.READONLY?4:0,v.setInt32(l,t,os),this.__meta_dataview__=v,v}Kh.exports=Oir});var $h=s(($Lr,Jh)=>{"use strict";var Sir=p2(),je=O(),ne=_t(),Iir=Au(),Nir=d6(),Fir=N6(),Zh=Fm(),Lir=dt(),Pir=Pm(),Rir=Mm(),Mir=Dm(),Vir=Wm(),Cir=Jm(),jir=Xm(),Bir=xm(),kir=e9(),Gir=i9(),Uir=n9(),Dir=S9(),Hir=jh(),Wir=Qh();function nr(r,e,t,i,a,n){var u,o,v,f,l;if(!(this instanceof nr))return new nr(r,e,t,i,a,n);for(f=1,l=0;l<t.length;l++)f*=t[l];return e.BYTES_PER_ELEMENT?o=e.BYTES_PER_ELEMENT*f:o=null,this._byteLength=o,this._bytesPerElement=Iir(r),this._buffer=e,this._dtype=r,this._length=f,this._ndims=t.length,this._offset=a,this._order=n,this._shape=t,this._strides=i,this._accessors=Lir(e.get&&e.set),this._iterationOrder=Nir(i),u=Mir(f,t,i,a,this._iterationOrder),v=Fir(i),this._flags={ROW_MAJOR_CONTIGUOUS:Rir(v,u),COLUMN_MAJOR_CONTIGUOUS:Pir(v,u),READONLY:!1},this.__meta_dataview__=null,this}je(nr,"name","ndarray");ne(nr.prototype,"byteLength",function(){return this._byteLength});ne(nr.prototype,"BYTES_PER_ELEMENT",function(){return this._bytesPerElement});ne(nr.prototype,"data",function(){return this._buffer});ne(nr.prototype,"dtype",function(){return this._dtype});ne(nr.prototype,"flags",function(){return Vir(this._flags)});ne(nr.prototype,"length",function(){return this._length});ne(nr.prototype,"ndims",function(){return this._ndims});ne(nr.prototype,"offset",function(){return this._offset});ne(nr.prototype,"order",function(){return this._order});ne(nr.prototype,"shape",function(){return Zh(this._shape,0,this._shape.length)});ne(nr.prototype,"strides",function(){return Zh(this._strides,0,this._strides.length)});je(nr.prototype,"get",kir);je(nr.prototype,"iget",Cir);je(nr.prototype,"set",Bir);je(nr.prototype,"iset",jir);je(nr.prototype,"toString",Dir);je(nr.prototype,"toJSON",Uir);je(nr.prototype,"valueOf",Gir);je(nr.prototype,"__array_meta_dataview__",Sir()?Hir:Wir);Jh.exports=nr});var Mi=s((XLr,Xh)=>{"use strict";var Yir=$h();Xh.exports=Yir});var xh=s((zLr,zh)=>{"use strict";var Kir=Mi();function Qir(r){return r instanceof Kir||r!==null&&typeof r=="object"&&typeof r.data=="object"&&typeof r.shape=="object"&&typeof r.strides=="object"&&typeof r.offset=="number"&&typeof r.order=="string"&&typeof r.ndims=="number"&&r.dtype&&typeof r.length=="number"&&typeof r.flags=="object"&&typeof r.get=="function"&&typeof r.set=="function"}zh.exports=Qir});var eg=s((xLr,rg)=>{"use strict";var Zir=xh();rg.exports=Zir});var ig=s((rPr,tg)=>{"use strict";function Jir(r,e,t,i,a){var n,u,o,v,f,l;if(u=e[1],o=e[0],n=[],t){for(v=0;v<u;v++)for(f=0;f<o;f++)n.push(i.call(a,r[f][v],[f,v],r));return n}for(f=0;f<o;f++)for(l=r[f],v=0;v<u;v++)n.push(i.call(a,l[v],[f,v],r));return n}tg.exports=Jir});var ng=s((ePr,ag)=>{"use strict";function $ir(r,e,t,i,a,n,u,o){var v,f,l,c,p,m;if(v=e[1],f=e[0],m=n,t){for(l=0;l<v;l++)for(c=0;c<f;c++)i[m]=u.call(o,r[c][l],[c,l],r),m+=a;return i}for(c=0;c<f;c++)for(p=r[c],l=0;l<v;l++)i[m]=u.call(o,p[l],[c,l],r),m+=a;return i}ag.exports=$ir});var og=s((tPr,sg)=>{"use strict";var Xir=O(),ug=ig(),zir=ng();Xir(ug,"assign",zir);sg.exports=ug});var cg=s((iPr,lg)=>{"use strict";var vs=Me(),xir=S();function vg(r,e){var t=e[0];return vs(t)&&(r.push(t.length),vg(r,t)),r}function fg(r,e,t,i,a){var n,u,o;for(n=e[t],o=0;o<i.length;o++){if(u=i[o],!vs(u)||u.length!==n)return t;if(a&&(u=fg(r,e,t+1,u,t+1<r-1),u<r))return u}return r}function rar(r){var e,t;if(!vs(r))throw new TypeError(xir("invalid argument. Must provide an array-like object. Value: `%s`.",r));return e=[r.length],vg(e,r),t=e.length,t>1&&(e.length=fg(t,e,1,r,t>2)),e}lg.exports=rar});var mg=s((aPr,pg)=>{"use strict";var ear=cg();pg.exports=ear});var gg=s((nPr,hg)=>{"use strict";var tar=Ir(),iar=ku();function aar(r){return r!=null&&typeof r!="function"&&typeof r.length=="number"&&tar(r.length)&&r.length>=0&&r.length<=iar}hg.exports=aar});var yg=s((uPr,qg)=>{"use strict";var nar=gg();qg.exports=nar});var bg=s((sPr,wg)=>{"use strict";var uar=yg(),sar=S();function oar(r){if(typeof r!="function")throw new TypeError(sar("invalid argument. Must provide a function. Value: `%s`.",r));return e;function e(t){var i,a;if(!uar(t)||(i=t.length,i===0))return!1;for(a=0;a<i;a++)if(r(t[a])===!1)return!1;return!0}}wg.exports=oar});var za=s((oPr,dg)=>{"use strict";var far=bg();dg.exports=far});var Tg=s((vPr,Eg)=>{"use strict";var fs=Re(),_g=O(),ls=za(),lar=ls(fs.isPrimitive),car=ls(fs.isObject),cs=ls(fs);_g(cs,"primitives",lar);_g(cs,"objects",car);Eg.exports=cs});var Sg=s((fPr,Og)=>{"use strict";var ps=dr(),Ag=O(),ms=za(),par=ms(ps.isPrimitive),mar=ms(ps.isObject),hs=ms(ps);Ag(hs,"primitives",par);Ag(hs,"objects",mar);Og.exports=hs});var Ng=s((lPr,Ig)=>{"use strict";var har=qi(),gar=Qe(),qar=Et(),yar=Si();function war(r,e){var t,i,a,n;for(a=yar(r),har(r)?i=gar(a):i=qar(a),t=r.length,n=0;n<t;n++)if(i(r,n)===e)return!0;return!1}Ig.exports=war});var Lg=s((cPr,Fg)=>{"use strict";var bar=Cr(),dar=qi(),_ar=Qe(),Ear=Si(),Tar=S();function Aar(r){var e,t,i;if(!bar(r))throw new TypeError(Tar("invalid argument. Must provide an array-like object. Value: `%s`.",r));return i=Ear(r),dar(r)&&(e=_ar(i)),t=r.length,e===void 0?a:n;function a(u){var o;for(o=0;o<t;o++)if(r[o]===u)return!0;return!1}function n(u){var o;for(o=0;o<t;o++)if(e(r,o)===u)return!0;return!1}}Fg.exports=Aar});var Ut=s((pPr,Rg)=>{"use strict";var Oar=O(),Pg=Ng(),Sar=Lg();Oar(Pg,"factory",Sar);Rg.exports=Pg});var Vg=s((mPr,Mg)=>{"use strict";var Iar=Ut().factory,Nar=Za(),Far=Iar(Nar());Mg.exports=Far});var jg=s((hPr,Cg)=>{"use strict";var Lar=Vg();Cg.exports=Lar});var Bg=s((gPr,Par)=>{Par.exports={all:["binary","bool","complex32","complex64","complex128","float16","float32","float64","generic","int16","int32","int8","uint16","uint32","uint8","uint8c"],typed:["binary","bool","complex32","complex64","complex128","float16","float32","float64","int16","int32","int8","uint16","uint32","uint8","uint8c"],floating_point:["complex32","complex64","complex128","float16","float32","float64"],real_floating_point:["float16","float32","float64"],complex_floating_point:["complex32","complex64","complex128"],boolean:["bool"],integer:["int16","int32","int8","uint16","uint32","uint8","uint8c"],signed_integer:["int16","int32","int8"],unsigned_integer:["uint16","uint32","uint8","uint8c"],real:["float16","float32","float64","int16","int32","int8","uint16","uint32","uint8","uint8c"],numeric:["complex32","complex64","complex128","float16","float32","float64","int16","int32","int8","uint16","uint32","uint8","uint8c"],index:["int32","uint8","bool","generic"],integer_index:["int32"],boolean_index:["bool"],mask_index:["uint8"],typed_index:["int32","uint8","bool"]}});var Dg=s((qPr,Ug)=>{"use strict";var Rar=es(),kg=Bg(),Gg=/_and_generic$/;function Mar(){var r,e,t;return arguments.length===0?kg.all.slice():(t=!1,r=arguments[0],Gg.test(r)&&(r=Rar(r,Gg,""),r!=="all"&&r!=="index"&&(t=!0)),e=kg[r],e=e?e.slice():[],t&&e.length>0&&e.push("generic"),e)}Ug.exports=Mar});var Wg=s((yPr,Hg)=>{"use strict";var Var=Dg();Hg.exports=Var});var Kg=s((wPr,Yg)=>{"use strict";var Car=Ut().factory,jar=Wg(),Bar=Car(jar());Yg.exports=Bar});var gs=s((bPr,Qg)=>{"use strict";var kar=Kg();Qg.exports=kar});var Jg=s((dPr,Zg)=>{"use strict";function Gar(r,e){return r==null?!1:typeof e=="symbol"?e in Object(r):String(e)in Object(r)}Zg.exports=Gar});var qs=s((_Pr,$g)=>{"use strict";var Uar=Jg();$g.exports=Uar});var rq=s((EPr,xg)=>{"use strict";var Xg=Xr().isPrimitive,Dt=jr(),zg=z();function Dar(r){return Dt(r)&&Xg(r.alignment)&&Xg(r.byteLength)&&Dt(r.byteLengthOf)&&Dt(r.byteOffsetOf)&&Dt(r.bufferOf)&&Dt(r.isStruct)&&Dt(r.viewOf)&&zg(r,"fields")&&zg(r,"layout")}xg.exports=Dar});var xa=s((TPr,eq)=>{"use strict";var Har=rq();eq.exports=Har});var iq=s((APr,tq)=>{"use strict";var War=qr().isPrimitive,Yar=gi(),Kar=Yar();function Qar(r){var e=Kar[r];return War(e)?e:null}tq.exports=Qar});var ys=s((OPr,aq)=>{"use strict";var Zar=iq();aq.exports=Zar});var sq=s((SPr,uq)=>{"use strict";var Jar=xa(),$ar=dr().isPrimitive,Xar=La(),nq=ys();function zar(r){var e=typeof r;return e==="number"?Xar(r)?r:null:e==="string"?nq(r):e==="object"&&r&&$ar(r.enum)?r.enum:Jar(r)?nq("userdefined_type"):null}uq.exports=zar});var vq=s((IPr,oq)=>{"use strict";var xar=sq();oq.exports=xar});var lq=s((NPr,fq)=>{"use strict";var rnr=xa(),enr=La(),tnr=ys();function inr(r){var e=typeof r;return e==="string"?tnr(r)===null?null:r:e==="number"?enr(r):e==="object"&&r?String(r):rnr(r)?r.layout:null}fq.exports=inr});var rn=s((FPr,cq)=>{"use strict";var anr=lq();cq.exports=anr});var mq=s((LPr,pq)=>{"use strict";function nnr(){return{binary:"byte",bool:"boolean",complex32:"half-precision floating-point complex number",complex64:"single-precision floating-point complex number",complex128:"double-precision floating-point complex number",float16:"half-precision floating-point number",bfloat16:"brain floating-point number",float32:"single-precision floating-point number",float64:"double-precision floating-point number",float128:"quadruple-precision floating-point number",generic:"generic array value",int8:"signed 8-bit integer",int16:"signed 16-bit integer",int32:"signed 32-bit integer",int64:"signed 64-bit integer",int128:"signed 128-bit integer",int256:"signed 256-bit integer",uint8:"unsigned 8-bit integer",uint8c:"unsigned 8-bit integer (clamped)",uint16:"unsigned 16-bit integer",uint32:"unsigned 32-bit integer",uint64:"unsigned 64-bit integer",uint128:"unsigned 128-bit integer",uint256:"unsigned 256-bit integer"}}pq.exports=nnr});var qq=s((PPr,gq)=>{"use strict";var unr=rn(),hq=mq(),ws;function snr(r){return arguments.length===0?hq():(ws===void 0&&(ws=hq()),ws[unr(r)]||null)}gq.exports=snr});var wq=s((RPr,yq)=>{"use strict";var onr=qq();yq.exports=onr});var dq=s((MPr,bq)=>{"use strict";function vnr(){return{binary:"r",bool:"x",complex32:"j",complex64:"c",complex128:"z",float16:"h",bfloat16:"e",float32:"f",float64:"d",float128:"g",generic:"o",int8:"s",int16:"k",int32:"i",int64:"l",int128:"m",int256:"n",uint8:"b",uint8c:"a",uint16:"t",uint32:"u",uint64:"v",uint128:"w",uint256:"y"}}bq.exports=vnr});var Tq=s((VPr,Eq)=>{"use strict";var fnr=rn(),_q=dq(),bs;function lnr(r){return arguments.length===0?_q():(bs===void 0&&(bs=_q()),bs[fnr(r)]||null)}Eq.exports=lnr});var Oq=s((CPr,Aq)=>{"use strict";var cnr=Tq();Aq.exports=cnr});var Iq=s((jPr,Sq)=>{"use strict";function pnr(){return{binary:1,bool:1,complex32:2,complex64:4,complex128:8,float16:2,bfloat16:2,float32:4,float64:8,float128:16,generic:null,int8:1,int16:2,int32:4,int64:8,int128:16,int256:32,uint8:1,uint8c:1,uint16:2,uint32:4,uint64:8,uint128:16,uint256:32}}Sq.exports=pnr});var Lq=s((BPr,Fq)=>{"use strict";var mnr=Xr().isPrimitive,hnr=rn(),Nq=Iq(),ds;function gnr(r){var e;return arguments.length===0?Nq():(ds===void 0&&(ds=Nq()),r?(e=r.alignment,mnr(e)?e:ds[hnr(r)]||null):null)}Fq.exports=gnr});var Rq=s((kPr,Pq)=>{"use strict";var qnr=Lq();Pq.exports=qnr});var Vq=s((GPr,Mq)=>{"use strict";var ynr=xa(),wnr=gr(),en=hr().isPrimitive,bnr=gs(),dnr=z(),_nr=qs(),At=_t(),Dr=O(),Enr=vq(),Tnr=wq(),Anr=Oq(),Onr=Rq(),Snr=Au(),_s=S();function Inr(r){return r instanceof yr||typeof r=="object"&&r!==null&&r.constructor.name==="DataType"&&en(r.char)&&en(r.description)&&en(r.byteOrder)&&_nr(r,"value")}function yr(r,e){var t,i,a;if(t=arguments.length,!(this instanceof yr))return t<2?new yr(r):new yr(r,e);if(bnr(r))i="builtin";else{if(Inr(r))return new yr(r.value,{description:r.description});if(ynr(r))i="struct";else throw new TypeError(_s("invalid argument. First argument must be either a supported data type string, a struct constructor, or another data type instance. Value: `%s`.",r))}if(t>1){if(a=e,!wnr(a))throw new TypeError(_s("invalid argument. Options argument must be an object. Value: `%s`.",a));if(dnr(a,"description")&&!en(a.description))throw new TypeError(_s("invalid option. `%s` option must be a string. Option: `%s`.","description",a.description))}else a={};return Dr(this,"_value",r),Dr(this,"_description",a.description||Tnr(r)||""),Dr(this,"_char",Anr(r)||""),Dr(this,"_enum",Enr(r)||-1),Dr(this,"_alignment",Onr(r)||-1),Dr(this,"_byteLength",Snr(r)||-1),Dr(this,"_byteOrder","host"),Dr(this,"_type",i),this}Dr(yr,"name","DataType");At(yr.prototype,"alignment",function(){return this._alignment});At(yr.prototype,"byteLength",function(){return this._byteLength});At(yr.prototype,"byteOrder",function(){return this._byteOrder});At(yr.prototype,"char",function(){return this._char});At(yr.prototype,"description",function(){return this._description});At(yr.prototype,"enum",function(){return this._enum});At(yr.prototype,"value",function(){return this._value});Dr(yr.prototype,"toJSON",function(){return{type:"DataType",value:this.toString(),byteOrder:this._byteOrder,description:this._description}});Dr(yr.prototype,"toString",function(){return this._type==="struct"?this._value.layout:String(this._value)});Dr(yr.prototype,"valueOf",function(){return this.toString()});Mq.exports=yr});var jq=s((UPr,Cq)=>{"use strict";var Nnr=Vq();Cq.exports=Nnr});var Gq=s((DPr,kq)=>{"use strict";var Es=dr().isPrimitive,Bq=hr().isPrimitive,Fnr=qs(),Lnr=jq();function Pnr(r){return r instanceof Lnr||typeof r=="object"&&r!==null&&Es(r.alignment)&&Es(r.byteLength)&&Bq(r.byteOrder)&&Bq(r.char)&&Es(r.enum)&&Fnr(r,"value")}kq.exports=Pnr});var Ts=s((HPr,Uq)=>{"use strict";var Rnr=Gq();Uq.exports=Rnr});var Yq=s((WPr,Wq)=>{"use strict";var Mnr=Ts(),Dq=Xr().isPrimitive,Vi=jr();function Hq(r){return Vi(r)&&Dq(r.alignment)&&Dq(r.byteLength)&&Vi(r.byteLengthOf)&&Vi(r.byteOffsetOf)&&Vi(r.bufferOf)&&Vi(r.viewOf)||Mnr(r)&&Hq(r.value)}Wq.exports=Hq});var Qq=s((YPr,Kq)=>{"use strict";var Vnr=Yq();Kq.exports=Vnr});var Jq=s((KPr,Zq)=>{"use strict";var Cnr=gs(),jnr=Ts(),Bnr=Qq();function knr(r){return Cnr(r)||jnr(r)||Bnr(r)}Zq.exports=knr});var Xq=s((QPr,$q)=>{"use strict";var Gnr=Jq();$q.exports=Gnr});var xq=s((ZPr,zq)=>{"use strict";var Unr=rs();function Dnr(r,e,t,i){var a=Unr(e,t,i);return a[0]>=0&&a[1]<r}zq.exports=Dnr});var ey=s((JPr,ry)=>{"use strict";var Hnr=xq();ry.exports=Hnr});var iy=s(($Pr,ty)=>{"use strict";function Wnr(r){var e,t,i;if(e=r.length,e===0)return 0;for(t=1,i=0;i<e;i++)t*=r[i];return t}ty.exports=Wnr});var As=s((XPr,ay)=>{"use strict";var Ynr=iy();ay.exports=Ynr});var Os=s((zPr,ny)=>{"use strict";function Knr(){return{dtypes:{default:"float64",numeric:"float64",real:"float64",floating_point:"float64",real_floating_point:"float64",complex_floating_point:"complex128",integer:"int32",signed_integer:"int32",unsigned_integer:"uint32",boolean:"bool",index:"int32",integer_index:"int32",boolean_index:"bool",mask_index:"uint8"},order:"row-major",casting:"safe",index_mode:"throw"}}ny.exports=Knr});var sy=s((xPr,uy)=>{"use strict";var Qnr=Os(),wr=Qnr(),Znr={"dtypes.default":wr.dtypes.default,"dtypes.numeric":wr.dtypes.numeric,"dtypes.real":wr.dtypes.real,"dtypes.floating_point":wr.dtypes.floating_point,"dtypes.real_floating_point":wr.dtypes.real_floating_point,"dtypes.complex_floating_point":wr.dtypes.complex_floating_point,"dtypes.integer":wr.dtypes.integer,"dtypes.signed_integer":wr.dtypes.signed_integer,"dtypes.unsigned_integer":wr.dtypes.unsigned_integer,"dtypes.boolean":wr.dtypes.boolean,"dtypes.index":wr.dtypes.index,"dtypes.integer_index":wr.dtypes.integer_index,"dtypes.boolean_index":wr.dtypes.boolean_index,"dtypes.mask_index":wr.dtypes.mask_index,order:wr.order,casting:wr.casting,index_mode:wr.index_mode};function Jnr(r){var e=Znr[r];return e===void 0?null:e}uy.exports=Jnr});var fy=s((rRr,vy)=>{"use strict";var $nr=O(),oy=Os(),Xnr=sy();$nr(oy,"get",Xnr);vy.exports=oy});var cy=s((eRr,ly)=>{"use strict";var znr=S();function xnr(r){var e=typeof r;return r===null||e!=="object"&&e!=="function"?new TypeError(znr("invalid argument. A provided constructor must be either an object (except null) or a function. Value: `%s`.",r)):null}ly.exports=xnr});var my=s((tRr,py)=>{"use strict";py.exports=Object.create});var qy=s((iRr,gy)=>{"use strict";function hy(){}function r0r(r){return hy.prototype=r,new hy}gy.exports=r0r});var by=s((aRr,wy)=>{"use strict";var yy=my(),e0r=qy(),Ss;typeof yy=="function"?Ss=yy:Ss=e0r;wy.exports=Ss});var Ey=s((nRr,_y)=>{"use strict";var t0r=mi(),i0r=S(),dy=cy(),a0r=by();function n0r(r,e){var t=dy(r);if(t||(t=dy(e),t))throw t;if(typeof e.prototype>"u")throw new TypeError(i0r("invalid argument. Second argument must have a prototype from which another object can inherit. Value: `%s`.",e.prototype));return r.prototype=a0r(e.prototype),t0r(r.prototype,"constructor",{configurable:!0,enumerable:!1,writable:!0,value:r}),r}_y.exports=n0r});var Ay=s((uRr,Ty)=>{"use strict";var u0r=Ey();Ty.exports=u0r});var Sy=s((sRr,Oy)=>{"use strict";function s0r(r,e){return r<0?0:r>e?e:r}Oy.exports=s0r});var Is=s((oRr,Iy)=>{"use strict";var o0r=Sy();Iy.exports=o0r});var Fy=s((vRr,Ny)=>{"use strict";function v0r(r,e){var t=e+1;return r<0?(r+=t,r<0&&(r%=t,r!==0&&(r+=t)),r):(r>e&&(r-=t,r>e&&(r%=t)),r)}Ny.exports=v0r});var Ns=s((fRr,Ly)=>{"use strict";var f0r=Fy();Ly.exports=f0r});var Ry=s((lRr,Py)=>{"use strict";function l0r(r,e){return r<0?(r+=e+1,r<0?-1:r):r>e?-1:r}Py.exports=l0r});var Fs=s((cRr,My)=>{"use strict";var c0r=Ry();My.exports=c0r});var Cy=s((pRr,Vy)=>{"use strict";var p0r=Ut().factory,m0r=Ja(),h0r=p0r(m0r());Vy.exports=h0r});var Ls=s((mRr,jy)=>{"use strict";var g0r=Cy();jy.exports=g0r});var ky=s((hRr,By)=>{"use strict";var q0r=Is(),y0r=Ns(),w0r=Fs(),b0r=Ls(),Ps=S(),d0r={wrap:y0r,clamp:q0r,normalize:E0r,throw:_0r};function _0r(r,e){if(r<0||r>e)throw new RangeError(Ps("invalid argument. Index must resolve to a value on the interval: [0, %d]. Value: `%d`.",e,r));return r}function E0r(r,e){var t=w0r(r,e);if(t<0||t>e)throw new RangeError(Ps("invalid argument. Index must resolve to a value on the interval: [0, %d]. Value: `%d`.",e,r));return t}function T0r(r){if(!b0r(r))throw new TypeError(Ps("invalid argument. First argument must be a recognized index mode. Value: `%s`.",r));return d0r[r]}By.exports=T0r});var Uy=s((gRr,Gy)=>{"use strict";var A0r=Is(),O0r=Ns(),S0r=Fs(),I0r=S();function N0r(r,e,t){var i;if(t==="clamp")return A0r(r,e);if(t==="wrap")return O0r(r,e);if(i=r,t==="normalize"&&(i=S0r(i,e)),i<0||i>e)throw new RangeError(I0r("invalid argument. Index must resolve to a value on the interval: [0, %d]. Value: `%d`.",e,r));return i}Gy.exports=N0r});var Ci=s((qRr,Hy)=>{"use strict";var F0r=O(),L0r=ky(),Dy=Uy();F0r(Dy,"factory",L0r);Hy.exports=Dy});var Ky=s((yRr,Yy)=>{"use strict";var P0r=dr().isPrimitive,R0r=Ci(),M0r=Mi(),V0r=S(),Wy=M0r.prototype.iget;function C0r(r){if(this._ndims>0){if(!P0r(r))throw new TypeError(V0r("invalid argument. Index must be an integer. Value: `%s`.",r));return r=R0r(r,this._length-1,this._mode),Wy.call(this,r)}return Wy.call(this)}Yy.exports=C0r});var Jy=s((wRr,Zy)=>{"use strict";var j0r=dr().isPrimitive,B0r=Ci(),k0r=Mi(),G0r=S(),Qy=k0r.prototype.iset;function U0r(r,e){if(this._flags.READONLY)throw new Error("invalid invocation. Cannot write to a read-only array.");if(this._ndims>0){if(!j0r(r))throw new TypeError(G0r("invalid argument. Index must be an integer. Value: `%s`.",r));r=B0r(r,this._length-1,this._mode),Qy.call(this,r,e)}else Qy.call(this,r);return this}Zy.exports=U0r});var zy=s((bRr,Xy)=>{"use strict";var D0r=dr().isPrimitive,H0r=Ci(),$y=S();function W0r(){var r,e,t,i;if(arguments.length!==this._ndims)throw new RangeError($y("invalid arguments. Number of indices must match the number of dimensions. ndims: `%u`. nargs: `%u`.",this._ndims,arguments.length));for(r=this._offset,t=this._submode.length,i=0;i<arguments.length;i++){if(!D0r(arguments[i]))throw new TypeError($y("invalid argument. Indices must be integer valued. Argument: `%u`. Value: `%s`.",i,arguments[i]));e=H0r(arguments[i],this._shape[i]-1,this._submode[i%t]),r+=this._strides[i]*e}return this._accessors?this._buffer.get(r):this._buffer[r]}Xy.exports=W0r});var ew=s((dRr,rw)=>{"use strict";var Y0r=dr().isPrimitive,K0r=Ci(),xy=S();function Q0r(){var r,e,t,i;if(this._flags.READONLY)throw new Error("invalid invocation. Cannot write to a read-only array.");if(arguments.length!==this._ndims+1)throw new RangeError(xy("invalid arguments. Number of indices must match the number of dimensions. ndims: `%u`. nargs: `%u`.",this._ndims,arguments.length));for(r=this._offset,t=this._submode.length,i=0;i<arguments.length-1;i++){if(!Y0r(arguments[i]))throw new TypeError(xy("invalid argument. Indices must be integer valued. Argument: `%i`. Value: `%s`.",i,arguments[i]));e=K0r(arguments[i],this._shape[i]-1,this._submode[i%t]),r+=this._strides[i]*e}return this._accessors?this._buffer.set(arguments[i],r):this._buffer[r]=arguments[i],this}rw.exports=Q0r});var iw=s((_Rr,tw)=>{"use strict";function Z0r(r,e){var t,i;for(t=[],i=0;i<e;i++)t.push(r[i]);return t}tw.exports=Z0r});var uw=s((ERr,nw)=>{"use strict";var J0r=gr(),Rs=z(),$0r=Me(),aw=Ls(),X0r=Nr().isPrimitive,Ht=S();function z0r(r,e){var t;if(!J0r(e))return new TypeError(Ht("invalid argument. Options argument must be an object. Value: `%s`.",e));if(Rs(e,"mode")&&(r.mode=e.mode,!aw(r.mode)))return new TypeError(Ht("invalid option. `%s` option must be a recognized mode. Option: `%s`.","mode",r.mode));if(Rs(e,"submode")){if(r.submode=e.submode,!$0r(r.submode))return new TypeError(Ht("invalid option. `%s` option must be an array containing recognized modes. Option: `%s`.","submode",r.submode));if(r.submode.length===0)return new TypeError(Ht("invalid option. `%s` option must be an array containing recognized modes. Option: `%s`.","submode",r.submode.join(",")));for(t=0;t<r.submode.length;t++)if(!aw(r.submode[t]))return new TypeError(Ht("invalid option. Each submode must be a recognized mode. Option: `%s`.",r.submode[t]));r.submode=r.submode.slice()}return Rs(e,"readonly")&&(r.readonly=e.readonly,!X0r(r.readonly))?new TypeError(Ht("invalid option. `%s` option must be a boolean. Option: `%s`.","readonly",r.readonly)):null}nw.exports=z0r});var pw=s((TRr,cw)=>{"use strict";var ji=O(),sw=Cr(),x0r=Tg().primitives,rur=Re().isPrimitive,eur=Sg().primitives,ow=jr(),tur=jg(),iur=Xq(),aur=ey(),nur=As(),lw=Mi(),uur=fy(),sur=Ay(),qe=S(),our=Ky(),vur=Jy(),fur=zy(),lur=ew(),vw=iw(),cur=uw(),fw=32767,pur=uur.get("index_mode"),mur=!1;function ye(r,e,t,i,a,n,u){var o,v,f,l,c;if(!(this instanceof ye))return arguments.length<7?new ye(r,e,t,i,a,n):new ye(r,e,t,i,a,n,u);if(!iur(r))throw new TypeError(qe("invalid argument. First argument must be a supported ndarray data type. Value: `%s`.",r));if(sw(e)){if(e.get&&e.set&&(!ow(e.get)||!ow(e.set)))throw new TypeError(qe("invalid argument. Second argument `get` and `set` properties must be functions. Value: `%s`.",e))}else throw new TypeError(qe("invalid argument. Second argument must be an array-like object, typed-array-like, or a Buffer. Value: `%s`.",e));if(!x0r(t)&&(!sw(t)||t.length>0))throw new TypeError(qe("invalid argument. Third argument must be an array-like object containing nonnegative integers. Value: `%s`.",t));if(o=t.length,o>fw)throw new RangeError(qe("invalid argument. Number of dimensions must not exceed %u due to stack limits. Value: `%u`.",fw,o));if(!eur(i))throw new TypeError(qe("invalid argument. Fourth argument must be an array-like object containing integers. Value: `%s`.",i));if(o>0){if(i.length!==o)throw new RangeError(qe("invalid argument. Fourth argument length must match the number of dimensions. Expected number of dimensions: `%u`. Strides length: `%u`.",o,i.length))}else{if(i.length!==1)throw new RangeError("invalid argument. Fourth argument length must be equal to 1 when creating a zero-dimensional ndarray.");if(i[0]!==0)throw new RangeError(qe("invalid argument. Fourth argument must contain a single element equal to 0. Value: `%d`.",i[0]))}if(!rur(a))throw new TypeError(qe("invalid argument. Fifth argument must be a nonnegative integer. Value: `%s`.",a));if(!tur(n))throw new TypeError(qe("invalid argument. Sixth argument must be a supported order. Value: `%s`.",n));if(o>0&&!aur(e.length,t,i,a)&&nur(t)>0)throw new Error("invalid arguments. Input buffer is incompatible with the specified meta data. Ensure that the offset is valid with regard to the strides array and that the buffer has enough elements to satisfy the desired array shape.");if(v={},v.mode=pur,v.readonly=mur,arguments.length>6&&(f=cur(v,u),f))throw f;return this._mode=v.mode,v.submode===void 0&&(v.submode=[this._mode]),this._submode=v.submode,l=vw(t,o),c=vw(i,o||1),lw.call(this,r,e,l,c,a,n),this._flags.READONLY=v.readonly,this}sur(ye,lw);ji(ye,"name","ndarray");ji(ye.prototype,"get",fur);ji(ye.prototype,"iget",our);ji(ye.prototype,"set",lur);ji(ye.prototype,"iset",vur);cw.exports=ye});var hw=s((ARr,mw)=>{"use strict";var hur=pw();mw.exports=hur});var qw=s((ORr,gw)=>{"use strict";var gur=Ii(),qur=S();function yur(r,e,t,i,a,n){var u,o,v,f,l;for(u=r.length,o=1,l=0;l<u;l++)o*=r[l];if(n==="clamp")a<0?a=0:a>=o&&(a=o-1);else if(n==="wrap")a<0?(a+=o,a<0&&(a%=o,a!==0&&(a+=o))):a>=o&&(a-=o,a>=o&&(a%=o));else if(n==="normalize"&&a<0&&(a+=o),a<0||a>=o)throw new RangeError(qur("invalid argument. Linear index must not exceed array dimensions. Number of array elements: `%u`. Value: `%d`.",o,a));if(v=t,gur(i)){for(l=0;l<u;l++)f=a%r[l],a-=f,a/=r[l],v+=f*e[l];return v}for(l=u-1;l>=0;l--)f=a%r[l],a-=f,a/=r[l],v+=f*e[l];return v}gw.exports=yur});var ww=s((SRr,yw)=>{"use strict";var wur=qw();yw.exports=wur});var dw=s((IRr,bw)=>{"use strict";function bur(r,e){var t,i;for(t=[],i=0;i<e;i++)t.push(r);return t}bw.exports=bur});var Ms=s((NRr,_w)=>{"use strict";var dur=dw();_w.exports=dur});var Tw=s((FRr,Ew)=>{"use strict";var _ur=Ms();function Eur(r){return _ur(0,r)}Ew.exports=Eur});var tn=s((LRr,Aw)=>{"use strict";var Tur=Tw();Aw.exports=Tur});var Sw=s((PRr,Ow)=>{"use strict";var Aur=Math.ceil;Ow.exports=Aur});var Nw=s((RRr,Iw)=>{"use strict";var Our=Sw();Iw.exports=Our});var Lw=s((MRr,Fw)=>{"use strict";var Sur=tr(),Iur=Nw();function Nur(r){return r<0?Iur(r):Sur(r)}Fw.exports=Nur});var Bi=s((VRr,Pw)=>{"use strict";var Fur=Lw();Pw.exports=Fur});var Vs=s((CRr,Mw)=>{"use strict";var Rw=Ii(),an=Bi(),Lur=S();function Pur(r,e,t,i,a,n,u){var o,v,f,l,c;for(o=r.length,v=1,c=0;c<o;c++)v*=r[c];if(n==="clamp")a<0?a=0:a>=v&&(a=v-1);else if(n==="wrap")a<0?(a+=v,a<0&&(a%=v,a!==0&&(a+=v))):a>=v&&(a-=v,a>=v&&(a%=v));else if(n==="normalize"&&a<0&&(a+=v),a<0||a>=v)throw new RangeError(Lur("invalid argument. Linear index must not exceed array dimensions. Number of array elements: `%u`. Value: `%d`.",v,a));if(t===0){if(Rw(i)){for(c=0;c<o;c++)l=a%r[c],a-=l,a/=r[c],u[c]=l;return u}for(c=o-1;c>=0;c--)l=a%r[c],a-=l,a/=r[c],u[c]=l;return u}if(Rw(i)){for(c=o-1;c>=0;c--)l=e[c],l<0?(f=an(a/l),a-=f*l,u[c]=r[c]-1+f):(f=an(a/l),a-=f*l,u[c]=f);return u}for(c=0;c<o;c++)l=e[c],l<0?(f=an(a/l),a-=f*l,u[c]=r[c]-1+f):(f=an(a/l),a-=f*l,u[c]=f);return u}Mw.exports=Pur});var Cw=s((jRr,Vw)=>{"use strict";var Rur=tn(),Mur=Vs();function Vur(r,e,t,i,a,n){return Mur(r,e,t,i,a,n,Rur(r.length))}Vw.exports=Vur});var kw=s((BRr,Bw)=>{"use strict";var Cur=O(),jw=Cw(),jur=Vs();Cur(jw,"assign",jur);Bw.exports=jw});var Uw=s((kRr,Gw)=>{"use strict";function Bur(r,e){return e>0?0:(1-r)*e}Gw.exports=Bur});var we=s((GRr,Dw)=>{"use strict";var kur=Uw();Dw.exports=kur});var js=s((URr,Hw)=>{"use strict";var Gur=tr(),Uur=128;function Cs(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g;if(r<=0)return 0;if(a=i,t===0)return r*e[a];if(r<8){for(h=e[a],a+=t,g=1;g<r;g++)h+=e[a],a+=t;return h}if(r<=Uur){for(n=e[a],u=e[a+t],o=e[a+2*t],v=e[a+3*t],f=e[a+4*t],l=e[a+5*t],c=e[a+6*t],p=e[a+7*t],a+=8*t,m=r%8,g=8;g<r-m;g+=8)n+=e[a],u+=e[a+t],o+=e[a+2*t],v+=e[a+3*t],f+=e[a+4*t],l+=e[a+5*t],c+=e[a+6*t],p+=e[a+7*t],a+=8*t;for(h=n+u+(o+v)+(f+l+(c+p));g<r;g++)h+=e[a],a+=t;return h}return q=Gur(r/2),q-=q%8,Cs(q,e,t,a)+Cs(r-q,e,t,a+q*t)}Hw.exports=Cs});var Yw=s((DRr,Ww)=>{"use strict";var Dur=we(),Hur=js();function Wur(r,e,t){return Hur(r,e,t,Dur(r,t))}Ww.exports=Wur});var Zw=s((HRr,Qw)=>{"use strict";var Yur=O(),Kw=Yw(),Kur=js();Yur(Kw,"ndarray",Kur);Qw.exports=Kw});var Bs=s((WRr,Jw)=>{"use strict";var nn=5;function Qur(r,e,t,i,a){var n,u,o;if(r<=0||e===1)return t;if(n=a,i===1){if(u=r%nn,u>0)for(o=0;o<u;o++)t[n]*=e,n+=i;if(r<nn)return t;for(o=u;o<r;o+=nn)t[n]*=e,t[n+1]*=e,t[n+2]*=e,t[n+3]*=e,t[n+4]*=e,n+=nn;return t}for(o=0;o<r;o++)t[n]*=e,n+=i;return t}Jw.exports=Qur});var Xw=s((YRr,$w)=>{"use strict";var Zur=we(),Jur=Bs();function $ur(r,e,t,i){var a=Zur(r,i);return Jur(r,e,t,i,a)}$w.exports=$ur});var rb=s((KRr,xw)=>{"use strict";var Xur=O(),zw=Xw(),zur=Bs();Xur(zw,"ndarray",zur);xw.exports=zw});var ks=s((QRr,eb)=>{"use strict";var un=5;function xur(r,e,t,i,a){var n,u,o;if(r<=0||e===0)return t;if(n=a,i===1){if(u=r%un,u>0)for(o=0;o<u;o++)t[n]+=e,n+=i;if(r<un)return t;for(o=u;o<r;o+=un)t[n]+=e,t[n+1]+=e,t[n+2]+=e,t[n+3]+=e,t[n+4]+=e,n+=un;return t}for(o=0;o<r;o++)t[n]+=e,n+=i;return t}eb.exports=xur});var ib=s((ZRr,tb)=>{"use strict";var rsr=we(),esr=ks();function tsr(r,e,t,i){return esr(r,e,t,i,rsr(r,i))}tb.exports=tsr});var ub=s((JRr,nb)=>{"use strict";var isr=O(),ab=ib(),asr=ks();isr(ab,"ndarray",asr);nb.exports=ab});var ob=s(($Rr,sb)=>{"use strict";var nsr=or();function usr(r){return r===0&&1/r===nsr}sb.exports=usr});var sn=s((XRr,vb)=>{"use strict";var ssr=ob();vb.exports=ssr});var Gs=s((zRr,fb)=>{"use strict";var osr=F(),vsr=sn();function fsr(r,e,t,i){var a,n,u,o;if(r<=0)return NaN;if(r===1||t===0)return e[i];for(n=i,a=e[n],o=1;o<r;o++){if(n+=t,u=e[n],osr(u))return u;(u<a||u===a&&vsr(u))&&(a=u)}return a}fb.exports=fsr});var cb=s((xRr,lb)=>{"use strict";var lsr=we(),csr=Gs();function psr(r,e,t){return csr(r,e,t,lsr(r,t))}lb.exports=psr});var hb=s((rMr,mb)=>{"use strict";var msr=O(),pb=cb(),hsr=Gs();msr(pb,"ndarray",hsr);mb.exports=pb});var yb=s((eMr,qb)=>{"use strict";var gsr=sn(),gb=F(),Us=or();function qsr(r,e){return gb(r)||gb(e)?NaN:r===Us||e===Us?Us:r===e&&r===0?gsr(r)?r:e:r<e?r:e}qb.exports=qsr});var ue=s((tMr,wb)=>{"use strict";var ysr=yb();wb.exports=ysr});var db=s((iMr,bb)=>{"use strict";var wsr=Q(),bsr=or();function dsr(r){return r===wsr||r===bsr}bb.exports=dsr});var tt=s((aMr,_b)=>{"use strict";var _sr=db();_b.exports=_sr});var Tb=s((nMr,Eb)=>{"use strict";var Esr=ae(),Ds;Esr===!0?Ds=1:Ds=0;Eb.exports=Ds});var Sb=s((uMr,Ob)=>{"use strict";var Tsr=Ze(),Asr=Tr(),Osr=Tb(),Ab=new Asr(1),Ssr=new Tsr(Ab.buffer);function Isr(r){return Ab[0]=r,Ssr[Osr]}Ob.exports=Isr});var Vr=s((sMr,Ib)=>{"use strict";var Nsr=Sb();Ib.exports=Nsr});var Fb=s((oMr,Nb)=>{"use strict";var Fsr=ae(),Hs;Fsr===!0?Hs=1:Hs=0;Nb.exports=Hs});var Pb=s((vMr,Lb)=>{"use strict";var Lsr=Ze(),Psr=Tr(),Rsr=Fb(),Ws=new Psr(1),Msr=new Lsr(Ws.buffer);function Vsr(r,e){return Ws[0]=r,Msr[Rsr]=e>>>0,Ws[0]}Lb.exports=Vsr});var Wt=s((fMr,Rb)=>{"use strict";var Csr=Pb();Rb.exports=Csr});var it=s((lMr,Mb)=>{"use strict";var jsr=1023;Mb.exports=jsr});var Cb=s((cMr,Vb)=>{"use strict";function Bsr(r){return r===0?.3999999999940942:.3999999999940942+r*(.22222198432149784+r*.15313837699209373)}Vb.exports=Bsr});var Bb=s((pMr,jb)=>{"use strict";function ksr(r){return r===0?.6666666666666735:.6666666666666735+r*(.2857142874366239+r*(.1818357216161805+r*.14798198605116586))}jb.exports=ksr});var Db=s((mMr,Ub)=>{"use strict";var kb=Vr(),Gsr=Wt(),Usr=F(),Dsr=it(),Hsr=or(),Wsr=Cb(),Ysr=Bb(),on=.6931471803691238,vn=19082149292705877e-26,Ksr=0x40000000000000,Qsr=.3333333333333333,Gb=1048575,Zsr=2146435072,Jsr=1048576,$sr=1072693248;function Xsr(r){var e,t,i,a,n,u,o,v,f,l,c,p;return r===0?Hsr:Usr(r)||r<0?NaN:(t=kb(r),n=0,t<Jsr&&(n-=54,r*=Ksr,t=kb(r)),t>=Zsr?r+r:(n+=(t>>20)-Dsr|0,t&=Gb,v=t+614244&1048576|0,r=Gsr(r,t|v^$sr),n+=v>>20|0,o=r-1,(Gb&2+t)<3?o===0?n===0?0:n*on+n*vn:(u=o*o*(.5-Qsr*o),n===0?o-u:n*on-(u-n*vn-o)):(l=o/(2+o),p=l*l,v=t-398458|0,c=p*p,f=440401-t|0,a=c*Wsr(c),i=p*Ysr(c),v|=f,u=i+a,v>0?(e=.5*o*o,n===0?o-(e-l*(e+u)):n*on-(e-(l*(e+u)+n*vn)-o)):n===0?o-l*(o-u):n*on-(l*(o-u)-n*vn-o))))}Ub.exports=Xsr});var $=s((hMr,Hb)=>{"use strict";var zsr=Db();Hb.exports=zsr});var Yb=s((gMr,Wb)=>{"use strict";function xsr(r){return r===0?.0416666666666666:.0416666666666666+r*(-.001388888888887411+r*2480158728947673e-20)}Wb.exports=xsr});var Qb=s((qMr,Kb)=>{"use strict";function ror(r){return r===0?-27557314351390663e-23:-27557314351390663e-23+r*(2087572321298175e-24+r*-11359647557788195e-27)}Kb.exports=ror});var Jb=s((yMr,Zb)=>{"use strict";var eor=Yb(),tor=Qb();function ior(r,e){var t,i,a,n;return n=r*r,a=n*n,i=n*eor(n),i+=a*a*tor(n),t=.5*n,a=1-t,a+(1-a-t+(n*i-r*e))}Zb.exports=ior});var Ys=s((wMr,$b)=>{"use strict";var aor=Jb();$b.exports=aor});var xb=s((bMr,zb)=>{"use strict";var Xb=-.16666666666666632,nor=.00833333333332249,uor=-.0001984126982985795,sor=27557313707070068e-22,oor=-25050760253406863e-24,vor=158969099521155e-24;function lor(r,e){var t,i,a,n;return n=r*r,a=n*n,t=nor+n*(uor+n*sor)+n*a*(oor+n*vor),i=n*r,e===0?r+i*(Xb+n*t):r-(n*(.5*e-i*t)-e-i*Xb)}zb.exports=lor});var Ks=s((dMr,rd)=>{"use strict";var cor=xb();rd.exports=cor});var at=s((_Mr,ed)=>{"use strict";var por=2147483647;ed.exports=por});var ki=s((EMr,td)=>{"use strict";var mor=2146435072;td.exports=mor});var Qs=s((TMr,id)=>{"use strict";var hor=1048575;id.exports=hor});var nd=s((AMr,ad)=>{"use strict";var gor=ae(),Zs;gor===!0?Zs=0:Zs=1;ad.exports=Zs});var od=s((OMr,sd)=>{"use strict";var qor=Ze(),yor=Tr(),wor=nd(),ud=new yor(1),bor=new qor(ud.buffer);function dor(r){return ud[0]=r,bor[wor]}sd.exports=dor});var fd=s((SMr,vd)=>{"use strict";var _or=od();vd.exports=_or});var pd=s((IMr,cd)=>{"use strict";var Eor=ae(),ld,Js,$s;Eor===!0?(Js=1,$s=0):(Js=0,$s=1);ld={HIGH:Js,LOW:$s};cd.exports=ld});var yd=s((NMr,qd)=>{"use strict";var Tor=Ze(),Aor=Tr(),hd=pd(),gd=new Aor(1),md=new Tor(gd.buffer),Oor=hd.HIGH,Sor=hd.LOW;function Ior(r,e){return md[Oor]=r,md[Sor]=e,gd[0]}qd.exports=Ior});var Gi=s((FMr,wd)=>{"use strict";var Nor=yd();wd.exports=Nor});var dd=s((LMr,bd)=>{"use strict";var For=1023;bd.exports=For});var Ed=s((PMr,_d)=>{"use strict";var Lor=-1023;_d.exports=Lor});var Ad=s((RMr,Td)=>{"use strict";var Por=-1074;Td.exports=Por});var Sd=s((MMr,Od)=>{"use strict";var Ror=2147483648;Od.exports=Ror});var Fd=s((VMr,Nd)=>{"use strict";var Mor=ae(),Id,Xs,zs;Mor===!0?(Xs=1,zs=0):(Xs=0,zs=1);Id={HIGH:Xs,LOW:zs};Nd.exports=Id});var xs=s((CMr,Md)=>{"use strict";var Vor=Ze(),Cor=Tr(),Pd=Fd(),Rd=new Cor(1),Ld=new Vor(Rd.buffer),jor=Pd.HIGH,Bor=Pd.LOW;function kor(r,e,t,i){return Rd[0]=r,e[i]=Ld[jor],e[i+t]=Ld[Bor],e}Md.exports=kor});var Cd=s((jMr,Vd)=>{"use strict";var Gor=xs();function Uor(r){return Gor(r,[0,0],1,0)}Vd.exports=Uor});var fn=s((BMr,Bd)=>{"use strict";var Dor=O(),jd=Cd(),Hor=xs();Dor(jd,"assign",Hor);Bd.exports=jd});var Gd=s((kMr,kd)=>{"use strict";var Wor=Sd(),Yor=at(),Kor=fn(),Qor=Vr(),Zor=Gi(),ro=[0,0];function Jor(r,e){var t,i;return Kor.assign(r,ro,1,0),t=ro[0],t&=Yor,i=Qor(e),i&=Wor,t|=i,Zor(t,ro[1])}kd.exports=Jor});var ln=s((GMr,Ud)=>{"use strict";var $or=Gd();Ud.exports=$or});var nt=s((UMr,Dd)=>{"use strict";var Xor=22250738585072014e-324;Dd.exports=Xor});var eo=s((DMr,Hd)=>{"use strict";var zor=nt(),xor=tt(),rvr=F(),evr=k(),tvr=4503599627370496;function ivr(r,e,t,i){return rvr(r)||xor(r)?(e[i]=r,e[i+t]=0,e):r!==0&&evr(r)<zor?(e[i]=r*tvr,e[i+t]=-52,e):(e[i]=r,e[i+t]=0,e)}Hd.exports=ivr});var Yd=s((HMr,Wd)=>{"use strict";var avr=eo();function nvr(r){return avr(r,[0,0],1,0)}Wd.exports=nvr});var Zd=s((WMr,Qd)=>{"use strict";var uvr=O(),Kd=Yd(),svr=eo();uvr(Kd,"assign",svr);Qd.exports=Kd});var $d=s((YMr,Jd)=>{"use strict";var ovr=Vr(),vvr=ki(),fvr=it();function lvr(r){var e=ovr(r);return e=(e&vvr)>>>20,e-fvr|0}Jd.exports=lvr});var zd=s((KMr,Xd)=>{"use strict";var cvr=$d();Xd.exports=cvr});var r_=s((QMr,xd)=>{"use strict";var pvr=Q(),mvr=or(),hvr=it(),gvr=dd(),qvr=Ed(),yvr=Ad(),wvr=F(),bvr=tt(),dvr=ln(),_vr=Zd().assign,Evr=zd(),Tvr=fn(),Avr=Gi(),Ovr=2220446049250313e-31,Svr=2148532223,to=[0,0],io=[0,0];function Ivr(r,e){var t,i;return e===0||r===0||wvr(r)||bvr(r)?r:(_vr(r,to,1,0),r=to[0],e+=to[1],e+=Evr(r),e<yvr?dvr(0,r):e>gvr?r<0?mvr:pvr:(e<=qvr?(e+=52,i=Ovr):i=1,Tvr.assign(r,io,1,0),t=io[0],t&=Svr,t|=e+hvr<<20,i*Avr(t,io[1])))}xd.exports=Ivr});var Ot=s((ZMr,e_)=>{"use strict";var Nvr=r_();e_.exports=Nvr});var u_=s((JMr,n_)=>{"use strict";var Fvr=tr(),cn=Ot(),hn=tn(),i_=[10680707,7228996,1387004,2578385,16069853,12639074,9804092,4427841,16666979,11263675,12935607,2387514,4345298,14681673,3074569,13734428,16653803,1880361,10960616,8533493,3062596,8710556,7349940,6258241,3772886,3769171,3798172,8675211,12450088,3874808,9961438,366607,15675153,9132554,7151469,3571407,2607881,12013382,4155038,6285869,7677882,13102053,15825725,473591,9065106,15363067,6271263,9264392,5636912,4652155,7056368,13614112,10155062,1944035,9527646,15080200,6658437,6231200,6832269,16767104,5075751,3212806,1398474,7579849,6349435,12618859],Lvr=[1.570796251296997,7549789415861596e-23,5390302529957765e-30,3282003415807913e-37,1270655753080676e-44,12293330898111133e-52,27337005381646456e-60,21674168387780482e-67],ao=16777216,no=5960464477539063e-23,pn=hn(20),t_=hn(20),mn=hn(20),br=hn(20);function a_(r,e,t,i,a,n,u,o,v){var f,l,c,p,m,h,q,g,y;for(p=n,y=i[t],g=t,m=0;g>0;m++)l=no*y|0,br[m]=y-ao*l|0,y=i[g-1]+l,g-=1;if(y=cn(y,a),y-=8*Fvr(y*.125),q=y|0,y-=q,c=0,a>0?(m=br[t-1]>>24-a,q+=m,br[t-1]-=m<<24-a,c=br[t-1]>>23-a):a===0?c=br[t-1]>>23:y>=.5&&(c=2),c>0){for(q+=1,f=0,m=0;m<t;m++)g=br[m],f===0?g!==0&&(f=1,br[m]=16777216-g):br[m]=16777215-g;if(a>0)switch(a){case 1:br[t-1]&=8388607;break;case 2:br[t-1]&=4194303;break}c===2&&(y=1-y,f!==0&&(y-=cn(1,a)))}if(y===0){for(g=0,m=t-1;m>=n;m--)g|=br[m];if(g===0){for(h=1;br[n-h]===0;h++);for(m=t+1;m<=t+h;m++){for(v[o+m]=i_[u+m],l=0,g=0;g<=o;g++)l+=r[g]*v[o+(m-g)];i[m]=l}return t+=h,a_(r,e,t,i,a,n,u,o,v)}for(t-=1,a-=24;br[t]===0;)t-=1,a-=24}else y=cn(y,-a),y>=ao?(l=no*y|0,br[t]=y-ao*l|0,t+=1,a+=24,br[t]=l):br[t]=y|0;for(l=cn(1,a),m=t;m>=0;m--)i[m]=l*br[m],l*=no;for(m=t;m>=0;m--){for(l=0,h=0;h<=p&&h<=t-m;h++)l+=Lvr[h]*i[m+h];mn[t-m]=l}for(l=0,m=t;m>=0;m--)l+=mn[m];for(c===0?e[0]=l:e[0]=-l,l=mn[0]-l,m=1;m<=t;m++)l+=mn[m];return c===0?e[1]=l:e[1]=-l,q&7}function Pvr(r,e,t,i){var a,n,u,o,v,f,l,c,p;for(n=4,o=i-1,u=(t-3)/24|0,u<0&&(u=0),f=t-24*(u+1),c=u-o,p=o+n,l=0;l<=p;l++)c<0?pn[l]=0:pn[l]=i_[c],c+=1;for(l=0;l<=n;l++){for(a=0,c=0;c<=o;c++)a+=r[c]*pn[o+(l-c)];t_[l]=a}return v=n,a_(r,e,v,t_,f,n,u,o,pn)}n_.exports=Pvr});var o_=s(($Mr,s_)=>{"use strict";var Rvr=Math.round;s_.exports=Rvr});var Yt=s((XMr,v_)=>{"use strict";var Mvr=o_();v_.exports=Mvr});var p_=s((zMr,c_)=>{"use strict";var Vvr=Yt(),f_=Vr(),Cvr=.6366197723675814,jvr=1.5707963267341256,Bvr=6077100506506192e-26,kvr=6077100506303966e-26,Gvr=20222662487959506e-37,Uvr=20222662487111665e-37,Dvr=84784276603689e-45,l_=2047;function Hvr(r,e,t){var i,a,n,u,o,v,f;return a=Vvr(r*Cvr),u=r-a*jvr,o=a*Bvr,f=e>>20|0,t[0]=u-o,i=f_(t[0]),v=f-(i>>20&l_),v>16&&(n=u,o=a*kvr,u=n-o,o=a*Gvr-(n-u-o),t[0]=u-o,i=f_(t[0]),v=f-(i>>20&l_),v>49&&(n=u,o=a*Uvr,u=n-o,o=a*Dvr-(n-u-o),t[0]=u-o)),t[1]=u-t[0]-o,a}c_.exports=Hvr});var h_=s((xMr,m_)=>{"use strict";var Wvr=at(),Yvr=ki(),Kvr=Qs(),Qvr=Vr(),Zvr=fd(),Jvr=Gi(),$vr=u_(),gn=p_(),Xvr=0,zvr=16777216,ut=1.5707963267341256,St=6077100506506192e-26,qn=2*St,yn=3*St,wn=4*St,xvr=598523,rfr=1072243195,efr=1073928572,tfr=1074752122,ifr=1074977148,afr=1075183036,nfr=1075388923,ufr=1075594811,sfr=1094263291,Ui=[0,0,0],Di=[0,0];function ofr(r,e){var t,i,a,n,u,o,v,f;if(a=Qvr(r)|0,n=a&Wvr|0,n<=rfr)return e[0]=r,e[1]=0,0;if(n<=tfr)return(n&Kvr)===xvr?gn(r,n,e):n<=efr?a>0?(f=r-ut,e[0]=f-St,e[1]=f-e[0]-St,1):(f=r+ut,e[0]=f+St,e[1]=f-e[0]+St,-1):a>0?(f=r-2*ut,e[0]=f-qn,e[1]=f-e[0]-qn,2):(f=r+2*ut,e[0]=f+qn,e[1]=f-e[0]+qn,-2);if(n<=ufr)return n<=afr?n===ifr?gn(r,n,e):a>0?(f=r-3*ut,e[0]=f-yn,e[1]=f-e[0]-yn,3):(f=r+3*ut,e[0]=f+yn,e[1]=f-e[0]+yn,-3):n===nfr?gn(r,n,e):a>0?(f=r-4*ut,e[0]=f-wn,e[1]=f-e[0]-wn,4):(f=r+4*ut,e[0]=f+wn,e[1]=f-e[0]+wn,-4);if(n<sfr)return gn(r,n,e);if(n>=Yvr)return e[0]=NaN,e[1]=NaN,0;for(t=Zvr(r),i=(n>>20)-1046,f=Jvr(n-(i<<20|0),t),o=0;o<2;o++)Ui[o]=f|0,f=(f-Ui[o])*zvr;for(Ui[2]=f,u=3;Ui[u-1]===Xvr;)u-=1;return v=$vr(Ui,Di,i,u,1),a<0?(e[0]=-Di[0],e[1]=-Di[1],-v):(e[0]=Di[0],e[1]=Di[1],v)}m_.exports=ofr});var uo=s((rVr,g_)=>{"use strict";var vfr=h_();g_.exports=vfr});var w_=s((eVr,y_)=>{"use strict";var ffr=Vr(),so=Ys(),q_=Ks(),lfr=uo(),cfr=at(),pfr=ki(),Be=[0,0],mfr=1072243195,hfr=1044381696;function gfr(r){var e,t;if(e=ffr(r),e&=cfr,e<=mfr)return e<hfr?1:so(r,0);if(e>=pfr)return NaN;switch(t=lfr(r,Be),t&3){case 0:return so(Be[0],Be[1]);case 1:return-q_(Be[0],Be[1]);case 2:return-so(Be[0],Be[1]);default:return q_(Be[0],Be[1])}}y_.exports=gfr});var bn=s((tVr,b_)=>{"use strict";var qfr=w_();b_.exports=qfr});var E_=s((iVr,__)=>{"use strict";var yfr=at(),wfr=ki(),bfr=Vr(),d_=Ys(),oo=Ks(),dfr=uo(),_fr=1072243195,Efr=1045430272,ke=[0,0];function Tfr(r){var e,t;if(e=bfr(r),e&=yfr,e<=_fr)return e<Efr?r:oo(r,0);if(e>=wfr)return NaN;switch(t=dfr(r,ke),t&3){case 0:return oo(ke[0],ke[1]);case 1:return d_(ke[0],ke[1]);case 2:return-oo(ke[0],ke[1]);default:return-d_(ke[0],ke[1])}}__.exports=Tfr});var Kt=s((aVr,T_)=>{"use strict";var Afr=E_();T_.exports=Afr});var Ge=s((nVr,A_)=>{"use strict";var Ofr=3.141592653589793;A_.exports=Ofr});var I_=s((uVr,S_)=>{"use strict";var Sfr=F(),Ifr=tt(),O_=bn(),vo=Kt(),Nfr=k(),Hi=ln(),Wi=Ge();function Ffr(r){var e,t;return Sfr(r)?NaN:Ifr(r)?NaN:(t=r%2,e=Nfr(t),e===0||e===1?Hi(0,t):e<.25?vo(Wi*t):e<.75?(e=.5-e,Hi(O_(Wi*e),t)):e<1.25?(t=Hi(1,t)-t,vo(Wi*t)):e<1.75?(e-=1.5,-Hi(O_(Wi*e),t)):(t-=Hi(2,t),vo(Wi*t)))}S_.exports=Ffr});var F_=s((sVr,N_)=>{"use strict";var Lfr=I_();N_.exports=Lfr});var P_=s((oVr,L_)=>{"use strict";function Pfr(r){return r===0?.06735230105312927:.06735230105312927+r*(.007385550860814029+r*(.0011927076318336207+r*(.00022086279071390839+r*25214456545125733e-21)))}L_.exports=Pfr});var M_=s((vVr,R_)=>{"use strict";function Rfr(r){return r===0?.020580808432516733:.020580808432516733+r*(.0028905138367341563+r*(.0005100697921535113+r*(.00010801156724758394+r*44864094961891516e-21)))}R_.exports=Rfr});var C_=s((fVr,V_)=>{"use strict";function Mfr(r){return r===0?1.3920053346762105:1.3920053346762105+r*(.7219355475671381+r*(.17193386563280308+r*(.01864591917156529+r*(.0007779424963818936+r*7326684307446256e-21))))}V_.exports=Mfr});var B_=s((lVr,j_)=>{"use strict";function Vfr(r){return r===0?.21498241596060885:.21498241596060885+r*(.325778796408931+r*(.14635047265246445+r*(.02664227030336386+r*(.0018402845140733772+r*3194753265841009e-20))))}j_.exports=Vfr});var G_=s((cVr,k_)=>{"use strict";function Cfr(r){return r===0?-.032788541075985965:-.032788541075985965+r*(.006100538702462913+r*(-.0014034646998923284+r*.00031563207090362595))}k_.exports=Cfr});var D_=s((pVr,U_)=>{"use strict";function jfr(r){return r===0?.01797067508118204:.01797067508118204+r*(-.0036845201678113826+r*(.000881081882437654+r*-.00031275416837512086))}U_.exports=jfr});var W_=s((mVr,H_)=>{"use strict";function Bfr(r){return r===0?-.010314224129834144:-.010314224129834144+r*(.0022596478090061247+r*(-.0005385953053567405+r*.0003355291926355191))}H_.exports=Bfr});var K_=s((hVr,Y_)=>{"use strict";function kfr(r){return r===0?.6328270640250934:.6328270640250934+r*(1.4549225013723477+r*(.9777175279633727+r*(.22896372806469245+r*.013381091853678766)))}Y_.exports=kfr});var Z_=s((gVr,Q_)=>{"use strict";function Gfr(r){return r===0?2.4559779371304113:2.4559779371304113+r*(2.128489763798934+r*(.7692851504566728+r*(.10422264559336913+r*.003217092422824239)))}Q_.exports=Gfr});var $_=s((qVr,J_)=>{"use strict";function Ufr(r){return r===0?.08333333333333297:.08333333333333297+r*(-.0027777777772877554+r*(.0007936505586430196+r*(-.00059518755745034+r*(.0008363399189962821+r*-.0016309293409657527))))}J_.exports=Ufr});var x_=s((yVr,z_)=>{"use strict";var Dfr=F(),Hfr=tt(),Wfr=k(),Qt=$(),Yfr=Bi(),Kfr=F_(),Qfr=Ge(),fo=Q(),Zfr=P_(),Jfr=M_(),$fr=C_(),Xfr=B_(),zfr=G_(),xfr=D_(),r1r=W_(),e1r=K_(),t1r=Z_(),i1r=$_(),a1r=.07721566490153287,n1r=.3224670334241136,u1r=1,s1r=-.07721566490153287,o1r=.48383612272381005,v1r=-.1475877229945939,f1r=.06462494023913339,l1r=-.07721566490153287,c1r=1,p1r=.4189385332046727,dn=1.4616321449683622,m1r=4503599627370496,h1r=72057594037927940,g1r=13877787807814457e-33,X_=1.4616321449683622,q1r=-.12148629053584961,y1r=-3638676997039505e-33;function w1r(r){var e,t,i,a,n,u,o,v,f,l,c,p,m;if(Dfr(r)||Hfr(r))return r;if(r===0)return fo;if(r<0?(e=!0,r=-r):e=!1,r<g1r)return-Qt(r);if(e){if(r>=m1r||(f=Kfr(r),f===0))return fo;t=Qt(Qfr/Wfr(f*r))}if(r===1||r===2)return 0;if(r<2)switch(r<=.9?(m=-Qt(r),r>=dn-1+.27?(c=1-r,i=0):r>=dn-1-.27?(c=r-(X_-1),i=1):(c=r,i=2)):(m=0,r>=dn+.27?(c=2-r,i=0):r>=dn-.27?(c=r-X_,i=1):(c=r-1,i=2)),i){case 0:p=c*c,u=a1r+p*Zfr(p),n=p*(n1r+p*Jfr(p)),o=c*u+n,m+=o-.5*c;break;case 1:p=c*c,l=p*c,u=o1r+l*zfr(l),n=v1r+l*xfr(l),a=f1r+l*r1r(l),o=p*u-(y1r-l*(n+c*a)),m+=q1r+o;break;case 2:u=c*(l1r+c*e1r(c)),n=c1r+c*t1r(c),m+=-.5*c+u/n;break}else if(r<8)switch(i=Yfr(r),c=r-i,o=c*(s1r+c*Xfr(c)),v=u1r+c*$fr(c),m=.5*c+o/v,p=1,i){case 7:p*=c+6;case 6:p*=c+5;case 5:p*=c+4;case 4:p*=c+3;case 3:p*=c+2,m+=Qt(p)}else r<h1r?(f=Qt(r),p=1/r,c=p*p,l=p1r+p*i1r(c),m=(r-.5)*(f-1)+l):m=r*(Qt(r)-1);return e&&(m=t-m),m}z_.exports=w1r});var Zt=s((wVr,rE)=>{"use strict";var b1r=x_();rE.exports=b1r});var tE=s((bVr,eE)=>{"use strict";function d1r(r){return r===0?.16666666666666602:.16666666666666602+r*(-.0027777777777015593+r*(6613756321437934e-20+r*(-16533902205465252e-22+r*41381367970572385e-24)))}eE.exports=d1r});var aE=s((dVr,iE)=>{"use strict";var _1r=Ot(),E1r=tE();function T1r(r,e,t){var i,a,n,u;return i=r-e,a=i*i,n=i-a*E1r(a),u=1-(e-i*n/(2-n)-r),_1r(u,t)}iE.exports=T1r});var fE=s((_Vr,vE)=>{"use strict";var A1r=F(),nE=Bi(),O1r=or(),uE=Q(),S1r=aE(),I1r=.6931471803691238,N1r=19082149292705877e-26,sE=1.4426950408889634,F1r=709.782712893384,L1r=-745.1332191019411,oE=1/(1<<28),P1r=-oE;function R1r(r){var e,t,i;return A1r(r)||r===uE?r:r===O1r?0:r>F1r?uE:r<L1r?0:r>P1r&&r<oE?1+r:(r<0?i=nE(sE*r-.5):i=nE(sE*r+.5),e=r-i*I1r,t=i*N1r,S1r(e,t,i))}vE.exports=R1r});var x=s((EVr,lE)=>{"use strict";var M1r=fE();lE.exports=M1r});var Yi=s((TVr,cE)=>{"use strict";var V1r=2.5066282746310007;cE.exports=V1r});var Ue=s((AVr,pE)=>{"use strict";var C1r=709.782712893384;pE.exports=C1r});var Ki=s((OVr,mE)=>{"use strict";var j1r=170;mE.exports=j1r});var qE=s((SVr,gE)=>{"use strict";var hE=Ma();function B1r(r){return r>0?hE(r-1):hE(r+1)}gE.exports=B1r});var _n=s((IVr,yE)=>{"use strict";var k1r=qE();yE.exports=k1r});var bE=s((NVr,wE)=>{"use strict";var G1r=Math.sqrt;wE.exports=G1r});var G=s((FVr,dE)=>{"use strict";var U1r=bE();dE.exports=U1r});var EE=s((LVr,_E)=>{"use strict";var D1r=ae(),lo;D1r===!0?lo=0:lo=1;_E.exports=lo});var AE=s((PVr,TE)=>{"use strict";var H1r=Ze(),W1r=Tr(),Y1r=EE(),co=new W1r(1),K1r=new H1r(co.buffer);function Q1r(r,e){return co[0]=r,K1r[Y1r]=e>>>0,co[0]}TE.exports=Q1r});var Jt=s((RVr,OE)=>{"use strict";var Z1r=AE();OE.exports=Z1r});var IE=s((MVr,SE)=>{"use strict";function J1r(r){return r|0}SE.exports=J1r});var po=s((VVr,NE)=>{"use strict";var $1r=IE();NE.exports=$1r});var PE=s((CVr,LE)=>{"use strict";var FE=_n(),X1r=ln(),z1r=or(),En=Q();function x1r(r,e){return e===z1r?En:e===En?0:e>0?FE(e)?r:0:FE(e)?X1r(En,r):En}LE.exports=x1r});var ME=s((jVr,RE)=>{"use strict";var rlr=at(),elr=Vr(),tlr=1072693247,Tn=1e300,An=1e-300;function ilr(r,e){var t,i;return i=elr(r),t=i&rlr,t<=tlr?e<0?Tn*Tn:An*An:e>0?Tn*Tn:An*An}RE.exports=ilr});var jE=s((BVr,CE)=>{"use strict";var alr=k(),VE=Q();function nlr(r,e){return r===-1?(r-r)/(r-r):r===1?1:alr(r)<1==(e===VE)?0:VE}CE.exports=nlr});var mo=s((kVr,BE)=>{"use strict";var ulr=20;BE.exports=ulr});var GE=s((GVr,kE)=>{"use strict";function slr(r){return r===0?.5999999999999946:.5999999999999946+r*(.4285714285785502+r*(.33333332981837743+r*(.272728123808534+r*(.23066074577556175+r*.20697501780033842))))}kE.exports=slr});var WE=s((UVr,HE)=>{"use strict";var olr=Vr(),On=Jt(),UE=Wt(),vlr=it(),flr=mo(),llr=GE(),clr=1048575,DE=1048576,plr=1072693248,mlr=536870912,hlr=524288,glr=9007199254740992,qlr=.9617966939259756,ylr=.9617967009544373,wlr=-7028461650952758e-24,blr=[1,1.5],dlr=[0,.5849624872207642],_lr=[0,1350039202129749e-23];function Elr(r,e,t){var i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E,d,R;return E=0,t<DE&&(e*=glr,E-=53,t=olr(e)),E+=(t>>flr)-vlr|0,d=t&clr|0,t=d|plr|0,d<=235662?R=0:d<767610?R=1:(R=0,E+=1,t-=DE),e=UE(e,t),l=blr[R],T=e-l,_=1/(e+l),a=T*_,u=On(a,0),i=(t>>1|mlr)+hlr,i+=R<<18,v=UE(0,i),f=e-(v-l),o=_*(T-u*v-u*f),n=a*a,b=n*n*llr(n),b+=o*(u+a),n=u*u,v=3+n+b,v=On(v,0),f=b-(v-3-n),T=u*v,_=o*v+f*a,p=T+_,p=On(p,0),m=_-(p-T),h=ylr*p,q=wlr*p+m*qlr+_lr[R],c=dlr[R],w=E,g=h+q+c+w,g=On(g,0),y=q-(g-w-c-h),r[0]=g,r[1]=y,r}HE.exports=Elr});var KE=s((DVr,YE)=>{"use strict";function Tlr(r){return r===0?.5:.5+r*(-.3333333333333333+r*.25)}YE.exports=Tlr});var ZE=s((HVr,QE)=>{"use strict";var Alr=Jt(),Olr=KE(),Slr=1.4426950408889634,Ilr=1.4426950216293335,Nlr=19259629911266175e-24;function Flr(r,e){var t,i,a,n,u,o;return a=e-1,n=a*a*Olr(a),u=Ilr*a,o=a*Nlr-n*Slr,i=u+o,i=Alr(i,0),t=o-(i-u),r[0]=i,r[1]=t,r}QE.exports=Flr});var Sn=s((WVr,JE)=>{"use strict";var Llr=.6931471805599453;JE.exports=Llr});var XE=s((YVr,$E)=>{"use strict";function Plr(r){return r===0?.16666666666666602:.16666666666666602+r*(-.0027777777777015593+r*(6613756321437934e-20+r*(-16533902205465252e-22+r*41381367970572385e-24)))}$E.exports=Plr});var aT=s((KVr,iT)=>{"use strict";var Rlr=Vr(),zE=Wt(),Mlr=Jt(),Vlr=po(),Clr=Ot(),jlr=Sn(),xE=it(),rT=at(),eT=Qs(),Qi=mo(),Blr=XE(),tT=1048576,klr=1071644672,Glr=.6931471824645996,Ulr=-1904654299957768e-24;function Dlr(r,e,t){var i,a,n,u,o,v,f,l,c,p,m;return p=r&rT|0,m=(p>>Qi)-xE|0,c=0,p>klr&&(c=r+(tT>>m+1)>>>0,m=((c&rT)>>Qi)-xE|0,i=(c&~(eT>>m))>>>0,n=zE(0,i),c=(c&eT|tT)>>Qi-m>>>0,r<0&&(c=-c),e-=n),n=t+e,n=Mlr(n,0),o=n*Glr,v=(t-(n-e))*jlr+n*Ulr,l=o+v,f=v-(l-o),n=l*l,a=l-n*Blr(n),u=l*a/(a-2)-(f+l*f),l=1-(u-l),r=Rlr(l),r=Vlr(r),r+=c<<Qi>>>0,r>>Qi<=0?l=Clr(l,c):l=zE(l,r),l}iT.exports=Dlr});var hT=s((QVr,mT)=>{"use strict";var nT=F(),uT=_n(),sT=tt(),Hlr=Ir(),oT=G(),Wlr=k(),ho=fn(),Ylr=Jt(),vT=po(),Klr=or(),Qlr=Q(),go=at(),Zlr=PE(),Jlr=ME(),$lr=jE(),Xlr=WE(),zlr=ZE(),xlr=aT(),r2r=1072693247,e2r=1105199104,t2r=1139802112,fT=1083179008,i2r=1072693248,a2r=1083231232,n2r=3230714880,lT=31,st=1e300,ot=1e-300,u2r=8008566259537294e-32,De=[0,0],cT=[0,0];function pT(r,e){var t,i,a,n,u,o,v,f,l,c,p,m,h,q,g,y;if(nT(r)||nT(e))return NaN;if(ho.assign(e,De,1,0),o=De[0],v=De[1],v===0){if(e===0)return 1;if(e===1)return r;if(e===-1)return 1/r;if(e===.5)return oT(r);if(e===-.5)return 1/oT(r);if(e===2)return r*r;if(e===3)return r*r*r;if(e===4)return r*=r,r*r;if(sT(e))return $lr(r,e)}if(ho.assign(r,De,1,0),n=De[0],u=De[1],u===0){if(n===0)return Zlr(r,e);if(r===1)return 1;if(r===-1&&uT(e))return-1;if(sT(r))return r===Klr?pT(-0,-e):e<0?0:Qlr}if(r<0&&Hlr(e)===!1)return(r-r)/(r-r);if(a=Wlr(r),t=n&go|0,i=o&go|0,f=n>>>lT|0,l=o>>>lT|0,f&&uT(e)?f=-1:f=1,i>e2r){if(i>t2r)return Jlr(r,e);if(t<r2r)return l===1?f*st*st:f*ot*ot;if(t>i2r)return l===0?f*st*st:f*ot*ot;h=zlr(cT,a)}else h=Xlr(cT,a,t);if(c=Ylr(e,0),m=(e-c)*h[0]+e*h[1],p=c*h[0],q=m+p,ho.assign(q,De,1,0),g=vT(De[0]),y=vT(De[1]),g>=fT){if((g-fT|y)!==0||m+u2r>q-p)return f*st*st}else if((g&go)>=a2r&&((g-n2r|y)!==0||m<=q-p))return f*ot*ot;return q=xlr(g,p,m),f*q}mT.exports=pT});var ir=s((ZVr,gT)=>{"use strict";var s2r=hT();gT.exports=s2r});var yT=s((JVr,qT)=>{"use strict";function o2r(r){return r===0?.08333333333334822:.08333333333334822+r*(.0034722222160545866+r*(-.0026813261780578124+r*(-.00022954996161337813+r*.0007873113957930937)))}qT.exports=o2r});var dT=s(($Vr,bT)=>{"use strict";var v2r=Yi(),wT=ir(),f2r=x(),l2r=yT(),c2r=143.01608;function p2r(r){var e,t,i;return e=1/r,e=1+e*l2r(e),t=f2r(r),r>c2r?(i=wT(r,.5*r-.25),t=i*(i/t)):t=wT(r,r-.5)/t,v2r*t*e}bT.exports=p2r});var ET=s((XVr,_T)=>{"use strict";var m2r=.5772156649015329;_T.exports=m2r});var AT=s((zVr,TT)=>{"use strict";var h2r=ET();function g2r(r,e){return e/((1+h2r*r)*r)}TT.exports=g2r});var ST=s((xVr,OT)=>{"use strict";function q2r(r){var e,t,i;return r===0?1:(r<0?e=-r:e=r,e<=1?(t=1+r*(.4942148268014971+r*(.20744822764843598+r*(.04763678004571372+r*(.010421379756176158+r*(.0011913514700658638+r*(.00016011952247675185+r*0)))))),i=1+r*(.0714304917030273+r*(-.23459179571824335+r*(.035823639860549865+r*(.011813978522206043+r*(-.004456419138517973+r*(.0005396055804933034+r*-23158187332412014e-21))))))):(r=1/r,t=0+r*(.00016011952247675185+r*(.0011913514700658638+r*(.010421379756176158+r*(.04763678004571372+r*(.20744822764843598+r*(.4942148268014971+r*1)))))),i=-23158187332412014e-21+r*(.0005396055804933034+r*(-.004456419138517973+r*(.011813978522206043+r*(.035823639860549865+r*(-.23459179571824335+r*(.0714304917030273+r*1))))))),t/i)}OT.exports=q2r});var VT=s((rCr,MT)=>{"use strict";var y2r=F(),w2r=Ir(),b2r=sn(),IT=k(),d2r=tr(),_2r=Kt(),NT=Q(),FT=or(),LT=Ge(),PT=dT(),RT=AT(),E2r=ST();function T2r(r){var e,t,i,a;if(w2r(r)&&r<0||r===FT||y2r(r))return NaN;if(r===0)return b2r(r)?FT:NT;if(r>171.61447887182297)return NT;if(r<-170.5674972726612)return 0;if(t=IT(r),t>33)return r>=0?PT(r):(i=d2r(t),(i&1)===0?e=-1:e=1,a=t-i,a>.5&&(i+=1,a=t-i),a=t*_2r(LT*a),e*LT/(IT(a)*PT(t)));for(a=1;r>=3;)r-=1,a*=r;for(;r<0;){if(r>-1e-9)return RT(r,a);a/=r,r+=1}for(;r<2;){if(r<1e-9)return RT(r,a);a/=r,r+=1}return r===2?a:(r-=2,a*E2r(r))}MT.exports=T2r});var be=s((eCr,CT)=>{"use strict";var A2r=VT();CT.exports=A2r});var BT=s((tCr,jT)=>{"use strict";var O2r=14901161193847656e-24;jT.exports=O2r});var vt=s((iCr,kT)=>{"use strict";var S2r=17976931348623157e292;kT.exports=S2r});var UT=s((aCr,GT)=>{"use strict";var I2r=eval;GT.exports=I2r});var HT=s((nCr,DT)=>{"use strict";var N2r=UT();function F2r(){var r;try{N2r('"use strict"; (function* () {})'),r=!0}catch{r=!1}return r}DT.exports=F2r});var qo=s((uCr,WT)=>{"use strict";var L2r=HT();WT.exports=L2r});var se=s((sCr,YT)=>{"use strict";var P2r=2220446049250313e-31;YT.exports=P2r});var QT=s((oCr,KT)=>{"use strict";var In=k(),R2r=se(),M2r=1e6;function V2r(r,e){var t,i,a,n,u,o;if(o={},arguments.length>1&&(o=e),i=o.tolerance||R2r,n=o.maxTerms||M2r,u=o.initialValue||0,t=typeof r.next=="function",t===!0){for(a of r)if(u+=a,In(i*u)>=In(a)||--n===0)break}else do a=r(),u+=a;while(In(i*u)<In(a)&&--n);return u}KT.exports=V2r});var $T=s((vCr,JT)=>{"use strict";var ZT=k(),C2r=se(),j2r=1e6;function B2r(r,e){var t,i,a,n,u;u={},arguments.length>1&&(u=e),t=u.tolerance||C2r,a=u.maxTerms||j2r,n=u.initialValue||0;do i=r(),n+=i;while(ZT(t*n)<ZT(i)&&--a);return n}JT.exports=B2r});var $t=s((fCr,XT)=>{"use strict";var k2r=qo(),G2r=QT(),U2r=$T(),yo;k2r()?yo=G2r:yo=U2r;XT.exports=yo});var xT=s((lCr,zT)=>{"use strict";function D2r(r,e){var t=1,i=r,a=e;return n;function n(){var u=t;return t*=i/a,i-=1,u}}zT.exports=D2r});var eA=s((cCr,rA)=>{"use strict";var H2r=$t(),W2r=xT();function Y2r(r,e){var t,i;return i=W2r(r,e),t=H2r(i),t}rA.exports=Y2r});var iA=s((pCr,tA)=>{"use strict";var K2r=x();function Q2r(r,e){var t,i,a,n;if(a=K2r(-e),i=a,i!==0)for(t=i,n=1;n<r;++n)t/=n,t*=e,i+=t;return i}tA.exports=Q2r});var nA=s((mCr,aA)=>{"use strict";function Z2r(r){return r===0?-.3250421072470015:-.3250421072470015+r*(-.02848174957559851+r*(-.005770270296489442+r*-23763016656650163e-21))}aA.exports=Z2r});var sA=s((hCr,uA)=>{"use strict";function J2r(r){return r===0?.39791722395915535:.39791722395915535+r*(.0650222499887673+r*(.005081306281875766+r*(.00013249473800432164+r*-3960228278775368e-21)))}uA.exports=J2r});var vA=s((gCr,oA)=>{"use strict";function $2r(r){return r===0?.41485611868374833:.41485611868374833+r*(-.3722078760357013+r*(.31834661990116175+r*(-.11089469428239668+r*(.035478304325618236+r*-.002166375594868791))))}oA.exports=$2r});var lA=s((qCr,fA)=>{"use strict";function X2r(r){return r===0?.10642088040084423:.10642088040084423+r*(.540397917702171+r*(.07182865441419627+r*(.12617121980876164+r*(.01363708391202905+r*.011984499846799107))))}fA.exports=X2r});var pA=s((yCr,cA)=>{"use strict";function z2r(r){return r===0?-.6938585727071818:-.6938585727071818+r*(-10.558626225323291+r*(-62.375332450326006+r*(-162.39666946257347+r*(-184.60509290671104+r*(-81.2874355063066+r*-9.814329344169145)))))}cA.exports=z2r});var hA=s((wCr,mA)=>{"use strict";function x2r(r){return r===0?19.651271667439257:19.651271667439257+r*(137.65775414351904+r*(434.56587747522923+r*(645.3872717332679+r*(429.00814002756783+r*(108.63500554177944+r*(6.570249770319282+r*-.0604244152148581))))))}mA.exports=x2r});var qA=s((bCr,gA)=>{"use strict";function rcr(r){return r===0?-.799283237680523:-.799283237680523+r*(-17.757954917754752+r*(-160.63638485582192+r*(-637.5664433683896+r*(-1025.0951316110772+r*-483.5191916086514))))}gA.exports=rcr});var wA=s((dCr,yA)=>{"use strict";function ecr(r){return r===0?30.33806074348246:30.33806074348246+r*(325.7925129965739+r*(1536.729586084437+r*(3199.8582195085955+r*(2553.0504064331644+r*(474.52854120695537+r*-22.44095244658582)))))}yA.exports=ecr});var EA=s((_Cr,_A)=>{"use strict";var tcr=F(),bA=x(),icr=Jt(),acr=Q(),ncr=or(),ucr=nA(),scr=sA(),ocr=vA(),vcr=lA(),fcr=pA(),lcr=hA(),ccr=qA(),pcr=wA(),Nn=1e-300,mcr=13877787807814457e-33,dA=.8450629115104675,hcr=.12837916709551256,gcr=1,qcr=-.0023621185607526594,ycr=1,wcr=-.009864944034847148,bcr=1,dcr=-.0098649429247001,_cr=1;function Ecr(r){var e,t,i,a,n,u,o,v;if(tcr(r))return NaN;if(r===acr)return 0;if(r===ncr)return 2;if(r===0)return 1;if(r<0?(e=!0,t=-r):(e=!1,t=r),t<.84375)return t<mcr?1-r:(i=r*r,a=hcr+i*ucr(i),n=gcr+i*scr(i),u=a/n,r<.25?1-(r+r*u):(a=r*u,a+=r-.5,.5-a));if(t<1.25)return n=t-1,o=qcr+n*ocr(n),v=ycr+n*vcr(n),e?1+dA+o/v:1-dA-o/v;if(t<28){if(n=1/(t*t),t<2.857142857142857)a=wcr+n*fcr(n),n=bcr+n*lcr(n);else{if(r<-6)return 2-Nn;a=dcr+n*ccr(n),n=_cr+n*pcr(n)}return i=icr(t,0),a=bA(-(i*i)-.5625)*bA((i-t)*(i+t)+a/n),e?2-a/t:a/t}return e?2-Nn:Nn*Nn}_A.exports=Ecr});var Zi=s((ECr,TA)=>{"use strict";var Tcr=EA();TA.exports=Tcr});var SA=s((TCr,OA)=>{"use strict";var Acr=Zi(),AA=G(),Ocr=x(),Scr=Ge();function Icr(r,e){var t,i,a,n,u;if(n=Acr(AA(e)),n!==0&&r>1){for(i=Ocr(-e)/AA(Scr*e),i*=e,t=.5,i/=t,a=i,u=2;u<r;++u)i/=u-t,i*=e,a+=i;n+=a}return n}OA.exports=Icr});var It=s((ACr,IA)=>{"use strict";var Ncr=-708.3964185322641;IA.exports=Ncr});var PA=s((OCr,LA)=>{"use strict";var Xt=x(),Fn=ir(),Fcr=$(),NA=Ue(),FA=It();function Lcr(r,e){var t,i;return i=r*Fcr(e),e>=1?i<NA&&-e>FA?t=Fn(e,r)*Xt(-e):r>=1?t=Fn(e/Xt(e/r),r):t=Xt(i-e):i>FA?t=Fn(e,r)*Xt(-e):e/r<NA?t=Fn(e/Xt(e/r),r):t=Xt(i-e),t}LA.exports=Lcr});var wo=s((SCr,RA)=>{"use strict";function Pcr(r,e){var t,i;if(i=r.length,i<2||e===0)return i===0?0:r[0];for(i-=1,t=r[i]*e+r[i-1],i-=2;i>=0;)t=t*e+r[i],i-=1;return t}RA.exports=Pcr});var VA=s((ICr,MA)=>{"use strict";var Rcr=Function;MA.exports=Rcr});var jA=s((NCr,CA)=>{"use strict";var Mcr=VA();CA.exports=Mcr});var kA=s((FCr,BA)=>{"use strict";var Vcr=jA(),Ccr=wo();function jcr(r){var e,t,i,a;if(r.length>500)return n;if(e="return function evalpoly(x){",t=r.length,t===0)e+="return 0.0;";else if(t===1)e+="return "+r[0]+";";else{for(e+="if(x===0.0){return "+r[0]+";}",e+="return "+r[0],i=t-1,a=1;a<t;a++)e+="+x*",a<i&&(e+="("),e+=r[a];for(a=0;a<i-1;a++)e+=")";e+=";"}return e+="}",e+="//# sourceURL=evalpoly.factory.js",new Vcr(e)();function n(u){return Ccr(r,u)}}BA.exports=jcr});var He=s((LCr,UA)=>{"use strict";var Bcr=O(),GA=wo(),kcr=kA();Bcr(GA,"factory",kcr);UA.exports=GA});var HA=s((PCr,DA)=>{"use strict";function Gcr(r){var e=-r,t=-1,i=0;return a;function a(){return t*=e,i+=1,t/i}}DA.exports=Gcr});var YA=s((RCr,WA)=>{"use strict";var Ucr=k(),Dcr=$(),Hcr=se(),Wcr=$t(),Ycr=HA();function Kcr(r){var e,t;return r<=-1?NaN:(t=Ucr(r),t>.95?Dcr(1+r)-r:t<Hcr?-r*r/2:(e={initialValue:-r},Wcr(Ycr(r),e)))}WA.exports=Kcr});var bo=s((MCr,KA)=>{"use strict";var Qcr=YA();KA.exports=Qcr});var _o=s((VCr,QA)=>{"use strict";var Zcr=6.283185307179586;QA.exports=Zcr});var JA=s((CCr,ZA)=>{"use strict";function Jcr(r){return r===0?-.3333333333333333:-.3333333333333333+r*(.08333333333333333+r*(-.014814814814814815+r*(.0011574074074074073+r*(.0003527336860670194+r*(-.0001787551440329218+r*(3919263178522438e-20+r*(-21854485106799924e-22+r*(-185406221071516e-20+r*(8296711340953087e-22+r*(-17665952736826078e-23+r*(6707853543401498e-24+r*(10261809784240309e-24+r*(-4382036018453353e-24+r*914769958223679e-24)))))))))))))}ZA.exports=Jcr});var XA=s((jCr,$A)=>{"use strict";function $cr(r){return r===0?-.001851851851851852:-.001851851851851852+r*(-.003472222222222222+r*(.0026455026455026454+r*(-.0009902263374485596+r*(.00020576131687242798+r*(-4018775720164609e-22+r*(-18098550334489977e-21+r*(764916091608111e-20+r*(-16120900894563446e-22+r*(4647127802807434e-24+r*(1378633446915721e-22+r*(-5752545603517705e-23+r*11951628599778148e-24)))))))))))}$A.exports=$cr});var xA=s((BCr,zA)=>{"use strict";function Xcr(r){return r===0?.004133597883597883:.004133597883597883+r*(-.0026813271604938273+r*(.0007716049382716049+r*(20093878600823047e-22+r*(-.00010736653226365161+r*(52923448829120125e-21+r*(-12760635188618728e-21+r*(3423578734096138e-23+r*(13721957309062932e-22+r*(-6298992138380055e-22+r*14280614206064242e-23)))))))))}zA.exports=Xcr});var eO=s((kCr,rO)=>{"use strict";function zcr(r){return r===0?.0006494341563786008:.0006494341563786008+r*(.00022947209362139917+r*(-.0004691894943952557+r*(.00026772063206283885+r*(-7561801671883977e-20+r*(-2396505113867297e-22+r*(11082654115347302e-21+r*(-56749528269915965e-22+r*14230900732435883e-22)))))))}rO.exports=zcr});var iO=s((GCr,tO)=>{"use strict";function xcr(r){return r===0?-.0008618882909167117:-.0008618882909167117+r*(.0007840392217200666+r*(-.0002990724803031902+r*(-14638452578843418e-22+r*(6641498215465122e-20+r*(-3968365047179435e-20+r*11375726970678419e-21)))))}tO.exports=xcr});var nO=s((UCr,aO)=>{"use strict";function r3r(r){return r===0?-.00033679855336635813:-.00033679855336635813+r*(-6972813758365858e-20+r*(.0002772753244959392+r*(-.00019932570516188847+r*(6797780477937208e-20+r*(1419062920643967e-22+r*(-13594048189768693e-21+r*(8018470256334202e-21+r*-2291481176508095e-21)))))))}aO.exports=r3r});var sO=s((DCr,uO)=>{"use strict";function e3r(r){return r===0?.0005313079364639922:.0005313079364639922+r*(-.0005921664373536939+r*(.0002708782096718045+r*(7902353232660328e-22+r*(-8153969367561969e-20+r*(561168275310625e-19+r*-18329116582843375e-21)))))}uO.exports=e3r});var vO=s((HCr,oO)=>{"use strict";function t3r(r){return r===0?.00034436760689237765:.00034436760689237765+r*(5171790908260592e-20+r*(-.00033493161081142234+r*(.0002812695154763237+r*-.00010976582244684731)))}oO.exports=t3r});var lO=s((WCr,fO)=>{"use strict";function i3r(r){return r===0?-.0006526239185953094:-.0006526239185953094+r*(.0008394987206720873+r*-.000438297098541721)}fO.exports=i3r});var pO=s((YCr,cO)=>{"use strict";var a3r=He(),n3r=bo(),u3r=Zi(),Eo=G(),s3r=x(),o3r=_o(),v3r=JA(),f3r=XA(),l3r=xA(),c3r=eO(),p3r=iO(),m3r=nO(),h3r=sO(),g3r=vO(),q3r=lO(),oe=[0,0,0,0,0,0,0,0,0,0];function y3r(r,e){var t,i,a,n,u;return i=(e-r)/r,a=-n3r(i),n=r*a,u=Eo(2*a),e<r&&(u=-u),oe[0]=v3r(u),oe[1]=f3r(u),oe[2]=l3r(u),oe[3]=c3r(u),oe[4]=p3r(u),oe[5]=m3r(u),oe[6]=h3r(u),oe[7]=g3r(u),oe[8]=q3r(u),oe[9]=-.0005967612901927463,t=a3r(oe,1/r),t*=s3r(-n)/Eo(o3r*r),e<r&&(t=-t),t+=u3r(Eo(n))/2,t}cO.exports=y3r});var hO=s((KCr,mO)=>{"use strict";function w3r(r,e){var t=1,i=r,a=e;return n;function n(){var u=t;return i+=1,t*=a/i,u}}mO.exports=w3r});var To=s((QCr,gO)=>{"use strict";var b3r=$t(),d3r=hO();function _3r(r,e,t){var i,a;return t=t||0,a=d3r(r,e),i=b3r(a,{initialValue:t}),i}gO.exports=_3r});var yO=s((ZCr,qO)=>{"use strict";function E3r(r){var e,t,i;return r===0?1/0:(r<0?e=-r:e=r,e<=1?(t=709811.662581658+r*(679979.8474157227+r*(293136.7857211597+r*(74887.54032914672+r*(12555.290582413863+r*(1443.4299244417066+r*(115.24194596137347+r*(6.309239205732627+r*(.22668404630224365+r*(.004826466289237662+r*4624429436045379e-20))))))))),i=0+r*(362880+r*(1026576+r*(1172700+r*(723680+r*(269325+r*(63273+r*(9450+r*(870+r*(45+r*1)))))))))):(r=1/r,t=4624429436045379e-20+r*(.004826466289237662+r*(.22668404630224365+r*(6.309239205732627+r*(115.24194596137347+r*(1443.4299244417066+r*(12555.290582413863+r*(74887.54032914672+r*(293136.7857211597+r*(679979.8474157227+r*709811.662581658))))))))),i=1+r*(45+r*(870+r*(9450+r*(63273+r*(269325+r*(723680+r*(1172700+r*(1026576+r*(362880+r*0)))))))))),t/i)}qO.exports=E3r});var bO=s((JCr,wO)=>{"use strict";var T3r=yO();wO.exports=T3r});var Ji=s(($Cr,dO)=>{"use strict";var A3r=bO();dO.exports=A3r});var EO=s((XCr,_O)=>{"use strict";var O3r=Q();function S3r(r){return r===0&&1/r===O3r}_O.exports=S3r});var AO=s((zCr,TO)=>{"use strict";var I3r=EO();TO.exports=I3r});var IO=s((xCr,SO)=>{"use strict";var N3r=AO(),OO=F(),Ao=Q();function F3r(r,e){return OO(r)||OO(e)?NaN:r===Ao||e===Ao?Ao:r===e&&r===0?N3r(r)?r:e:r>e?r:e}SO.exports=F3r});var We=s((rjr,NO)=>{"use strict";var L3r=IO();NO.exports=L3r});var zt=s((ejr,FO)=>{"use strict";var P3r=10.900511;FO.exports=P3r});var Nt=s((tjr,LO)=>{"use strict";var R3r=2.718281828459045;LO.exports=R3r});var MO=s((ijr,RO)=>{"use strict";var M3r=Ji(),V3r=Zt(),C3r=be(),j3r=bo(),B3r=G(),k3r=k(),ft=x(),$i=ir(),Oo=We(),So=ue(),PO=$(),G3r=vt(),Ln=Ue(),Xi=It(),Io=zt(),U3r=Nt();function D3r(r,e){var t,i,a,n,u,o,v;return a=r+Io-.5,v=(e-r-Io+.5)/a,r<1?e<=Xi||r<1/G3r?ft(r*PO(e)-e-V3r(r)):$i(e,r)*ft(-e)/C3r(r):(k3r(v*v*r)<=100&&r>150?(t=r*j3r(v)+e*(.5-Io)/a,t=ft(t)):(n=r*PO(e/a),u=r-e,So(n,u)<=Xi||Oo(n,u)>=Ln?(i=u/r,So(n,u)/2>Xi&&Oo(n,u)/2<Ln?(o=$i(e/a,r/2)*ft(u/2),t=o*o):So(n,u)/4>Xi&&Oo(n,u)/4<Ln&&e>r?(o=$i(e/a,r/4)*ft(u/4),t=o*o,t*=t):i>Xi&&i<Ln?t=$i(e*ft(i)/a,r):t=ft(n+u)):t=$i(e/a,r)*ft(u)),t*=B3r(a/U3r)/M3r(r),t)}RO.exports=D3r});var CO=s((ajr,VO)=>{"use strict";var H3r=.34657359027997264;VO.exports=H3r});var BO=s((njr,jO)=>{"use strict";function W3r(r){return r===0?-.03333333333333313:-.03333333333333313+r*(.0015873015872548146+r*(-793650757867488e-19+r*(4008217827329362e-21+r*-20109921818362437e-23)))}jO.exports=W3r});var WO=s((ujr,HO)=>{"use strict";var Y3r=F(),kO=Vr(),No=Wt(),K3r=Gi(),GO=Q(),Q3r=or(),UO=it(),Z3r=CO(),J3r=BO(),$3r=709.782712893384,Fo=.6931471803691238,Lo=19082149292705877e-26,DO=1.4426950408889634,X3r=38.816242111356935,z3r=1.0397207708399179;function x3r(r){var e,t,i,a,n,u,o,v,f,l,c,p,m;if(r===GO||Y3r(r))return r;if(r===Q3r)return-1;if(r===0)return r;if(r<0?(i=!0,v=-r):(i=!1,v=r),v>=X3r){if(i)return-1;if(v>=$3r)return GO}if(u=kO(v)|0,v>Z3r)v<z3r?i?(a=r+Fo,n=-Lo,m=-1):(a=r-Fo,n=Lo,m=1):(i?m=DO*r-.5:m=DO*r+.5,m|=0,c=m,a=r-c*Fo,n=c*Lo),r=a-n,l=a-r-n;else{if(u<1016070144)return r;m=0}return e=.5*r,f=r*e,o=1+f*J3r(f),c=3-o*e,p=f*((o-c)/(6-r*c)),m===0?r-(r*p-f):(t=K3r(UO+m<<20,0),p=r*(p-l)-l,p-=f,m===-1?.5*(r-p)-.5:m===1?r<-.25?-2*(p-(r+.5)):1+2*(r-p):m<=-2||m>56?(v=1-(p-r),m===1024?(a=kO(v)+(m<<20)|0,v=No(v,a)):v*=t,v-1):(c=1,m<20?(a=1072693248-(2097152>>m)|0,c=No(c,a),v=c-(p-r)):(a=UO-m<<20|0,c=No(c,a),v=r-(p+c),v+=1),v*=t,v))}HO.exports=x3r});var Ft=s((sjr,YO)=>{"use strict";var r6r=WO();YO.exports=r6r});var ZO=s((ojr,QO)=>{"use strict";var Po=F(),e6r=tt(),KO=k(),t6r=Ft(),i6r=$(),a6r=ir(),n6r=Bi();function u6r(r,e){var t,i;if(Po(r)||Po(e))return NaN;if(e===0)return 0;if(r===0)return-1;if(r<0&&e%2===0&&(r=-r),r>0){if((KO(e*(r-1))<.5||KO(e)<.2)&&(i=i6r(r)*e,i<.5))return t6r(i)}else if(n6r(e)!==e)return NaN;return t=a6r(r,e)-1,e6r(t)||Po(t)?NaN:t}QO.exports=u6r});var $O=s((vjr,JO)=>{"use strict";var s6r=ZO();JO.exports=s6r});var zO=s((fjr,XO)=>{"use strict";function o6r(r){return r===0?.6666666666666735:.6666666666666735+r*(.3999999999940942+r*(.2857142874366239+r*(.22222198432149784+r*(.1818357216161805+r*(.15313837699209373+r*.14798198605116586)))))}XO.exports=o6r});var iS=s((ljr,tS)=>{"use strict";var v6r=F(),xO=Vr(),rS=Wt(),f6r=Q(),l6r=or(),eS=it(),c6r=zO(),Ro=.6931471803691238,Mo=19082149292705877e-26,p6r=.41421356237309503,m6r=-.2928932188134525,h6r=1862645149230957e-24,g6r=5551115123125783e-32,q6r=9007199254740992,y6r=.6666666666666666;function w6r(r){var e,t,i,a,n,u,o,v,f,l;if(r<-1||v6r(r))return NaN;if(r===-1)return l6r;if(r===f6r||r===0)return r;if(r<0?i=-r:i=r,l=1,i<p6r){if(i<h6r)return i<g6r?r:r-r*r*.5;r>m6r&&(l=0,a=r,t=1)}return l!==0&&(i<q6r?(f=1+r,t=xO(f),l=(t>>20)-eS,l>0?n=1-(f-r):n=r-(f-1),n/=f):(f=r,t=xO(f),l=(t>>20)-eS,n=0),t&=1048575,t<434334?f=rS(f,t|1072693248):(l+=1,f=rS(f,t|1071644672),t=1048576-t>>2),a=f-1),e=.5*a*a,t===0?a===0?(n+=l*Mo,l*Ro+n):(v=e*(1-y6r*a),l*Ro-(v-(l*Mo+n)-a)):(u=a/(2+a),o=u*u,v=o*c6r(o),l===0?a-(e-u*(e+v)):l*Ro-(e-(u*(e+v)+(l*Mo+n))-a))}tS.exports=w6r});var ve=s((cjr,aS)=>{"use strict";var b6r=iS();aS.exports=b6r});var uS=s((pjr,nS)=>{"use strict";function d6r(r){var e,t,i;return r===0?-.01803556856784494:(r<0?e=-r:e=r,e<=1?(t=-.01803556856784494+r*(.02512664961998968+r*(.049410315156753225+r*(.0172491608709614+r*(-.0002594535632054381+r*(-.0005410098692152044+r*(-3245886498259485e-20+r*0)))))),i=1+r*(1.962029871977952+r*(1.4801966942423133+r*(.5413914320717209+r*(.09885042511280101+r*(.008213096746488934+r*(.00022493629192211576+r*-22335276320861708e-23))))))):(r=1/r,t=0+r*(-3245886498259485e-20+r*(-.0005410098692152044+r*(-.0002594535632054381+r*(.0172491608709614+r*(.049410315156753225+r*(.02512664961998968+r*-.01803556856784494)))))),i=-22335276320861708e-23+r*(.00022493629192211576+r*(.008213096746488934+r*(.09885042511280101+r*(.5413914320717209+r*(1.4801966942423133+r*(1.962029871977952+r*1))))))),t/i)}nS.exports=d6r});var oS=s((mjr,sS)=>{"use strict";function _6r(r){var e,t,i;return r===0?.04906224540690395:(r<0?e=-r:e=r,e<=1?(t=.04906224540690395+r*(-.09691175301595212+r*(-.4149833583594954+r*(-.4065671242119384+r*(-.1584135863906922+r*(-.024014982064857155+r*-.0010034668769627955))))),i=1+r*(3.0234982984646304+r*(3.4873958536072385+r*(1.9141558827442668+r*(.5071377386143635+r*(.05770397226904519+r*.001957681026011072)))))):(r=1/r,t=-.0010034668769627955+r*(-.024014982064857155+r*(-.1584135863906922+r*(-.4065671242119384+r*(-.4149833583594954+r*(-.09691175301595212+r*.04906224540690395))))),i=.001957681026011072+r*(.05770397226904519+r*(.5071377386143635+r*(1.9141558827442668+r*(3.4873958536072385+r*(3.0234982984646304+r*1)))))),t/i)}sS.exports=_6r});var fS=s((hjr,vS)=>{"use strict";function E6r(r){var e,t,i;return r===0?-.029232972183027003:(r<0?e=-r:e=r,e<=1?(t=-.029232972183027003+r*(.14421626775719232+r*(-.14244039073863127+r*(.05428096940550536+r*(-.008505359768683364+r*(.0004311713426792973+r*0))))),i=1+r*(-1.5016935605448505+r*(.846973248876495+r*(-.22009515181499575+r*(.02558279715597587+r*(-.0010066679553914337+r*-8271935218912905e-22)))))):(r=1/r,t=0+r*(.0004311713426792973+r*(-.008505359768683364+r*(.05428096940550536+r*(-.14244039073863127+r*(.14421626775719232+r*-.029232972183027003))))),i=-8271935218912905e-22+r*(-.0010066679553914337+r*(.02558279715597587+r*(-.22009515181499575+r*(.846973248876495+r*(-1.5016935605448505+r*1)))))),t/i)}vS.exports=E6r});var cS=s((gjr,lS)=>{"use strict";var Vo=$(),T6r=se(),A6r=uS(),O6r=oS(),S6r=fS(),I6r=.15896368026733398,N6r=.5281534194946289,F6r=.45201730728149414;function L6r(r,e,t){var i,a,n,u;if(r<T6r)return-Vo(r);if(e===0||t===0)return 0;if(a=0,r>2){if(r>=3){do r-=1,t-=1,a+=Vo(r);while(r>=3);t=r-2}return n=t*(r+1),u=A6r(t),a+=n*I6r+n*u,a}return r<1&&(a+=-Vo(r),t=e,e=r,r+=1),r<=1.5?(n=O6r(e),i=e*t,a+=i*N6r+i*n,a):(n=t*e,u=S6r(-t),a+=n*F6r+n*u,a)}lS.exports=L6r});var qS=s((qjr,gS)=>{"use strict";var pS=be(),mS=Ft(),P6r=ve(),R6r=F(),hS=cS();function M6r(r){return R6r(r)?NaN:r<0?r<-.5?pS(1+r)-1:mS(-P6r(r)+hS(r+2,r+1,r)):r<2?mS(hS(r+1,r,r-1)):pS(1+r)-1}gS.exports=M6r});var wS=s((yjr,yS)=>{"use strict";var V6r=qS();yS.exports=V6r});var dS=s((wjr,bS)=>{"use strict";function C6r(r,e){var t,i,a,n;return t=-e,e=-e,i=r+1,a=1,u;function u(){return n=t/i,t*=e,a+=1,t/=a,i+=1,n}}bS.exports=C6r});var ES=s((bjr,_S)=>{"use strict";var j6r=$O(),B6r=$t(),k6r=wS(),G6r=dS();function U6r(r,e,t){var i,a,n,u,o;return a=k6r(r),n=(a+1)/r,u=j6r(e,r),a-=u,a/=r,o=G6r(r,e),u+=1,i=t?n:0,a=-u*B6r(o,{initialValue:(i-a)/u}),t&&(a=-a),[a,n]}_S.exports=U6r});var zi=s((djr,TS)=>{"use strict";var D6r=11754943508222875e-54;TS.exports=D6r});var OS=s((_jr,AS)=>{"use strict";var Pn=k(),de=zi(),H6r=se(),W6r=1e6;function Y6r(r,e,t){var i,a,n,u,o,v,f;if(i=typeof r.next=="function",f=i?r.next().value:r(),u=f[1],n=f[0],u===0&&(u=de),o=u,v=0,i===!0)do f=r.next().value,f&&(v=f[1]+f[0]*v,v===0&&(v=de),o=f[1]+f[0]/o,o===0&&(o=de),v=1/v,a=o*v,u*=a);while(Pn(a-1)>e&&--t);else do f=r(),f&&(v=f[1]+f[0]*v,v===0&&(v=de),o=f[1]+f[0]/o,o===0&&(o=de),v=1/v,a=o*v,u*=a);while(f&&Pn(a-1)>e&&--t);return n/u}function K6r(r,e,t){var i,a,n,u,o,v;if(i=typeof r.next=="function",v=i?r.next().value:r(),n=v[1],n===0&&(n=de),u=n,o=0,i===!0)do v=r.next().value,v&&(o=v[1]+v[0]*o,o===0&&(o=de),u=v[1]+v[0]/u,u===0&&(u=de),o=1/o,a=u*o,n*=a);while(v&&Pn(a-1)>e&&--t);else do v=r(),v&&(o=v[1]+v[0]*o,o===0&&(o=de),u=v[1]+v[0]/u,u===0&&(u=de),o=1/o,a=u*o,n*=a);while(v&&Pn(a-1)>e&&--t);return n}function Q6r(r,e){var t,i,a;return i={},arguments.length>1&&(i=e),t=i.maxIter||W6r,a=i.tolerance||H6r,i.keep?K6r(r,a,t):Y6r(r,a,t)}AS.exports=Q6r});var NS=s((Ejr,IS)=>{"use strict";var SS=k(),Z6r=se(),xt=zi(),J6r=1e6;function $6r(r,e,t){var i,a,n,u,o,v;v=r(),o=v[1],a=v[0],o===0&&(o=xt),n=o,u=0;do v=r(),v&&(u=v[1]+v[0]*u,u===0&&(u=xt),n=v[1]+v[0]/n,n===0&&(n=xt),u=1/u,i=n*u,o*=i);while(v&&SS(i-1)>e&&--t);return a/o}function X6r(r,e,t){var i,a,n,u,o;o=r(),u=o[1],u===0&&(u=xt),a=u,n=0;do o=r(),o&&(n=o[1]+o[0]*n,n===0&&(n=xt),a=o[1]+o[0]/a,a===0&&(a=xt),n=1/n,i=a*n,u*=i);while(o&&SS(i-1)>e&&--t);return u}function z6r(r,e){var t,i,a;return i={},arguments.length>1&&(i=e),a=i.tolerance||Z6r,t=i.maxIter||J6r,i.keep?X6r(r,a,t):$6r(r,a,t)}IS.exports=z6r});var jo=s((Tjr,FS)=>{"use strict";var x6r=qo(),r4r=OS(),e4r=NS(),Co;x6r()?Co=r4r:Co=e4r;FS.exports=Co});var PS=s((Ajr,LS)=>{"use strict";function t4r(r,e){var t=e-r+1,i=r,a=0;return n;function n(){return a+=1,t+=2,[a*(i-a),t]}}LS.exports=t4r});var Bo=s((Ojr,RS)=>{"use strict";var i4r=jo(),a4r=PS();function n4r(r,e){var t=a4r(r,e);return 1/(e-r+1+i4r(t))}RS.exports=n4r});var jS=s((Sjr,CS)=>{"use strict";var u4r=tr(),xi=be(),ko=k(),MS=ir(),s4r=$(),o4r=BT(),VS=vt(),v4r=Ue(),f4r=eA(),l4r=iA(),c4r=SA(),Go=PA(),p4r=pO(),m4r=To(),Uo=MO(),h4r=ES(),g4r=Bo();function q4r(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g,y;switch(l=0,c=i,f=e<30&&e<=r+1&&r<v4r,f?(g=u4r(e),p=g===e,u=p?!1:ko(g-e)===.5):(p=!1,u=!1),p&&r>.6?(c=!c,n=0):u&&r>.2?(c=!c,n=1):r<o4r&&e>1?n=6:r>1e3&&(e<r||ko(e-50)/r<1)?(c=!c,n=7):r<.5?-.4/s4r(r)<e?n=2:n=3:r<1.1?r*.75<e?n=2:n=3:(v=!1,t&&e>20&&(m=ko((r-e)/e),e>200?20/e>m*m&&(v=!0):m<.4&&(v=!0)),v?n=5:r-1/(3*r)<e?n=2:(n=4,c=!c)),n){case 0:l=l4r(e,r),t===!1&&(l*=xi(e));break;case 1:l=c4r(e,r),t===!1&&(l*=xi(e));break;case 2:l=t?Uo(e,r):Go(e,r),l!==0&&(o=0,a=!1,c&&(o=t?1:xi(e),t||l>=1||VS*l>o?(o/=l,t||e<1||VS/e>o?(o*=-e,a=!0):o=0):o=0),l*=m4r(e,r,o)/e,a&&(c=!1,l=-l));break;case 3:c=!c,h=h4r(e,r,c),l=h[0],y=h[1],c=!1,t&&(l/=y);break;case 4:l=t?Uo(e,r):Go(e,r),l!==0&&(l*=g4r(e,r));break;case 5:l=p4r(e,r),r>=e&&(c=!c);break;case 6:l=t?MS(r,e)/xi(e+1):MS(r,e)/e,l*=1-e*r/(e+1);break;case 7:l=t?Uo(e,r):Go(e,r),l/=r,l!==0&&(l*=f4r(e,r));break}return t&&l>1&&(l=1),c&&(q=t?1:xi(e),l=q-l),l}CS.exports=q4r});var US=s((Ijr,GS)=>{"use strict";var y4r=Zt(),w4r=x(),_e=$(),b4r=Yi(),d4r=Ue(),_4r=Q(),E4r=Ki(),BS=jS(),kS=To(),T4r=Bo();function A4r(r,e,t,i){var a,n,u,o;return r<0||e<=0?NaN:(a=t===void 0?!0:t,u=i,e>=E4r&&!a?(u&&e*4<r?(o=e*_e(r)-r,o+=_e(T4r(e,r))):!u&&e>4*r?(o=e*_e(r)-r,n=0,o+=_e(kS(e,r,n)/e)):(o=BS(r,e,!0,u),o===0?u?(o=1+1/(12*e)+1/(288*e*e),o=_e(o)-e+(e-.5)*_e(e),o+=_e(b4r)):(o=e*_e(r)-r,n=0,o+=_e(kS(e,r,n)/e)):o=_e(o)+y4r(e)),o>d4r?_4r:w4r(o)):BS(r,e,a,u))}GS.exports=A4r});var ra=s((Njr,DS)=>{"use strict";var O4r=US();DS.exports=O4r});var WS=s((Fjr,HS)=>{"use strict";var S4r=ra(),Do=F(),I4r=Q();function N4r(r,e,t){return Do(r)||Do(e)||Do(t)||e<0||t<=0?NaN:e===0?r<0?0:1:r<=0?0:r===I4r?1:S4r(r*t,e)}HS.exports=N4r});var KS=s((Ljr,YS)=>{"use strict";function F4r(r){return e;function e(){return r}}YS.exports=F4r});var Ee=s((Pjr,QS)=>{"use strict";var L4r=KS();QS.exports=L4r});var $S=s((Rjr,JS)=>{"use strict";var ZS=F();function P4r(r,e){return ZS(r)||ZS(e)?NaN:r<e?0:1}JS.exports=P4r});var xS=s((Mjr,zS)=>{"use strict";var R4r=Ee(),XS=F();function M4r(r){if(XS(r))return R4r(NaN);return e;function e(t){return XS(t)?NaN:t<r?0:1}}zS.exports=M4r});var Ho=s((Vjr,eI)=>{"use strict";var V4r=O(),rI=$S(),C4r=xS();V4r(rI,"factory",C4r);eI.exports=rI});var aI=s((Cjr,iI)=>{"use strict";var j4r=Ee(),B4r=Ho().factory,k4r=ra(),tI=F(),G4r=Q();function U4r(r,e){if(tI(r)||tI(e)||r<0||e<=0)return j4r(NaN);if(r===0)return B4r(0);return t;function t(i){return i<=0?0:i===G4r?1:k4r(i*e,r)}}iI.exports=U4r});var Wo=s((jjr,uI)=>{"use strict";var D4r=O(),nI=WS(),H4r=aI();D4r(nI,"factory",H4r);uI.exports=nI});var oI=s((Bjr,sI)=>{"use strict";var W4r=Wo();function Y4r(r,e){return W4r(r,e/2,.5)}sI.exports=Y4r});var fI=s((kjr,vI)=>{"use strict";var K4r=Wo().factory;function Q4r(r){return K4r(r/2,.5)}vI.exports=Q4r});var pI=s((Gjr,cI)=>{"use strict";var Z4r=O(),lI=oI(),J4r=fI();Z4r(lI,"factory",J4r);cI.exports=lI});var hI=s((Ujr,mI)=>{"use strict";function $4r(){return{alpha:.05,correct:!0}}mI.exports=$4r});var yI=s((Djr,qI)=>{"use strict";var X4r=Nr().isPrimitive,z4r=qr().isPrimitive,x4r=gr(),rpr=Ke(),gI=z(),Rn=S();function epr(r,e){if(!x4r(e))return new TypeError(Rn("invalid argument. Options argument must be an object. Value: `%s`.",e));if(gI(e,"alpha")){if(r.alpha=e.alpha,!z4r(r.alpha)||rpr(r.alpha))return new TypeError(Rn("invalid option. `%s` option must be a number. Option: `%s`.","alpha",r.alpha));if(r.alpha<0||r.alpha>1)return new RangeError(Rn("invalid option. `%s` option must be a number on the interval: [0, 1]. Value: `%s`.","alpha",r.alpha))}return gI(e,"correct")&&(r.correct=e.correct,!X4r(r.correct))?new TypeError(Rn("invalid option. `%s` option must be a boolean. Option: `%s`.","correct",r.simulate)):null}qI.exports=epr});var Yo=s((Hjr,wI)=>{"use strict";var tpr=9007199254740991;wI.exports=tpr});var dI=s((Wjr,bI)=>{"use strict";var ipr=308;bI.exports=ipr});var EI=s((Yjr,_I)=>{"use strict";var apr=-308;_I.exports=apr});var AI=s((Kjr,TI)=>{"use strict";var npr=-324;TI.exports=npr});var PI=s((Qjr,LI)=>{"use strict";var OI=F(),Mn=tt(),SI=ir(),upr=k(),II=Yt(),spr=Yo(),NI=dI(),opr=EI(),vpr=AI(),fpr=spr+1,FI=1e308;function lpr(r,e){var t,i;return OI(r)||OI(e)||Mn(e)?NaN:Mn(r)||r===0||e<vpr||upr(r)>fpr&&e<=0?r:e>NI?0*r:e<opr?(t=SI(10,-(e+NI)),i=r*FI*t,Mn(i)?r:II(i)/FI/t):(t=SI(10,-e),i=r*t,Mn(i)?r:II(i)/t)}LI.exports=lpr});var Lt=s((Zjr,RI)=>{"use strict";var cpr=PI();RI.exports=cpr});var CI=s((Jjr,VI)=>{"use strict";function MI(r,e,t,i,a,n){var u,o,v,f,l;if(n>=e.length)return r.accessors[0](r.data,i);for(v=[],f=e[n],u=t[n],l=0;l<f;l++)o=MI(r,e,t,i,a,n+1),v.push(o),i+=u;return v}VI.exports=MI});var BI=s(($jr,jI)=>{"use strict";var ppr=Ce(),mpr=CI();function hpr(r,e,t,i,a){var n;if(e.length===0)return[];for(n=0;n<e.length;n++)if(e[n]===0)return[];return mpr(ppr(r),e,t,i,a,0)}jI.exports=hpr});var GI=s((Xjr,kI)=>{"use strict";var gpr=BI();kI.exports=gpr});var WI=s((zjr,HI)=>{"use strict";var qpr=Xr(),ypr=gr(),wpr=Nr().isPrimitive,UI=z(),DI=Lt(),Qo=O(),ri=_t(),bpr=GI(),Ko=S();function Hr(r,e,t,i,a){return this instanceof Hr?(this._pValue=r,this._alpha=e,this._statistic=t,this._df=i,this._expected=a,this):new Hr(r,e,t,i,a)}ri(Hr.prototype,"alpha",function(){return this._alpha});ri(Hr.prototype,"df",function(){return this._df});ri(Hr.prototype,"expected",function(){return this._expected});Qo(Hr.prototype,"method","Chi-square independence test");ri(Hr.prototype,"pValue",function(){return this._pValue});ri(Hr.prototype,"rejected",function(){return this._pValue<=this._alpha});ri(Hr.prototype,"statistic",function(){return this._statistic});Qo(Hr.prototype,"toString",function(e){var t,i,a;if(i=4,t=!0,arguments.length>0){if(!ypr(e))throw new TypeError(Ko("invalid argument. Must provide an object. Value: `%s`.",e));if(UI(e,"digits")){if(!qpr(e.digits))throw new TypeError(Ko("invalid option. `%s` option must be a positive integer. Option: `%s`.","digits",e.digits));i=e.digits}if(UI(e,"decision")){if(!wpr(e.decision))throw new TypeError(Ko("invalid option. `%s` option must be a boolean. Option: `%s`.","decision",e.decision));t=e.decision}}return a=[this.method,"","","Null hypothesis: the two variables are independent","","","    pValue: "+DI(this._pValue,-i),"    statistic: "+DI(this._statistic,-i),"    degrees of freedom: "+this._df,""],t&&(a.push("Test Decision: "+(this.rejected?"Reject":"Fail to reject")+" null in favor of alternative at "+this._alpha*100+"% significance level"),a.push("")),a.join(`
`)});Qo(Hr.prototype,"toJSON",function(){var e=this._expected;return{rejected:this.rejected,alpha:this._alpha,pValue:this._pValue,df:this._df,statistic:this._statistic,expected:bpr(e.data,e.shape,e.strides,e.offset,e.order),method:this.method}});HI.exports=Hr});var $I=s((xjr,JI)=>{"use strict";var QI=Re().isPrimitive,dpr=eg(),_pr=Cr(),Epr=og().assign,ta=Tr(),Tpr=mg(),Apr=hw(),ZI=As(),Opr=ww(),Spr=kw(),Zo=Zw(),Ipr=rb(),Npr=ub(),Fpr=hb(),Lpr=k(),Ppr=ue(),ea=S(),Rpr=pI(),Mpr=hI(),Vpr=yI(),Cpr=WI(),YI="throw";function jpr(r,e){if(!QI(r))throw new TypeError(ea("invalid argument. First argument must contain nonnegative integers. Indices: (%s). Value: `%s`.",e.join(", "),String(r)));return r}function Bpr(r,e){var t,i,a,n,u,o,v,f,l;for(i=r.data,n=r.order,u=r.strides,o=r.offset,v=ZI(e),t=new ta(v),l=0;l<v;l++){if(a=Opr(e,u,o,n,l,YI),f=i[a],!QI(f))throw new TypeError(ea("invalid argument. First argument must contain nonnegative integers. Indices: (%s). Value: `%s`.",Spr(e,u,o,n,l,YI),String(f)));t[l]=f}return t}function KI(r,e,t,i){var a,n,u,o,v,f,l;for(i===0?(v=t,f=e,u=1,o=t):(v=e,f=t,u=t,o=1),n=new ta(f),a=0,l=0;l<f;l++)n[l]=Zo.ndarray(v,r,u,a),a+=o;return n}function kpr(r,e){var t,i,a,n,u,o,v;for(a=r.length,n=e.length,t=new ta(a*n),i=0,o=0;o<a;o++)for(u=r[o],v=0;v<n;v++)t[i]=u*e[v],i+=1;return t}function Gpr(r,e){var t,i;for(t=new ta(r.length),i=0;i<r.length;i++)t[i]=Lpr(r[i]-e[i]);return t}function Upr(r,e){var t;for(t=0;t<r.length;t++)r[t]=r[t]*r[t]/e[t];return Zo(r.length,r,1)}function Dpr(r,e){var t,i,a,n,u,o,v,f,l,c,p,m,h,q,g;if(dpr(r)){if(h=r.shape,h.length!==2)throw new TypeError(ea("invalid argument. First argument must be an array of arrays or a two-dimensional ndarray-like object. Number of input array dimensions: %u.",h.length));p=Bpr(r,h)}else if(_pr(r)){if(h=Tpr(r),h.length!==2)throw new TypeError(ea("invalid argument. First argument must be an array of arrays or a two-dimensional ndarray-like object. Number of input array dimensions: %u.",h.length));p=new ta(ZI(h)),Epr(r,h,!1,p,1,0,jpr)}else throw new TypeError(ea("invalid argument. First argument must be an array of arrays or a two-dimensional ndarray-like object. Value: `%s`.",r));if(o=Mpr(),arguments.length>1&&(l=Vpr(o,e),l))throw l;return q=h[0],g=h[1],c=Zo(q*g,p,1),n=KI(p,q,g,0),a=KI(p,q,g,1),u=kpr(n,a),u=Ipr(u.length,1/c,u,1),i=Gpr(p,u),q===2&&g===2&&o.correct&&(t=Ppr(.5,Fpr(i.length,i,1)),Npr(i.length,-t,i,1)),f=Upr(i,u),m=(q-1)*(g-1),v=1-Rpr(f,m),u=new Apr("float64",u,[q,g],[g,1],0,"row-major",{readonly:!0}),new Cpr(v,o.alpha,f,m,u)}JI.exports=Dpr});var zI=s((rBr,XI)=>{"use strict";var Hpr=$I();XI.exports=Hpr});var ei=s((eBr,rN)=>{"use strict";var xI=O(),Jo=za(),$o=qr(),Wpr=Jo($o.isPrimitive),Ypr=Jo($o.isObject),Xo=Jo($o);xI(Xo,"primitives",Wpr);xI(Xo,"objects",Ypr);rN.exports=Xo});var tN=s((tBr,eN)=>{"use strict";var Kpr=Re().isPrimitive,Qpr=gu();function Zpr(r){return r!==null&&typeof r=="object"&&Kpr(r.length)&&r.length<=Qpr&&typeof r.BYTES_PER_ELEMENT=="number"&&typeof r.byteOffset=="number"&&typeof r.byteLength=="number"}eN.exports=Zpr});var ti=s((iBr,iN)=>{"use strict";var Jpr=tN();iN.exports=Jpr});var uN=s((aBr,nN)=>{"use strict";var $pr=Cr(),aN=jr();function Xpr(r){return $pr(r)&&aN(r.get)&&aN(r.set)}nN.exports=Xpr});var oN=s((nBr,sN)=>{"use strict";var zpr=uN();sN.exports=zpr});var fN=s((uBr,vN)=>{"use strict";var xpr=Ca(),r8r=Va(),e8r=Ga(),t8r=ka(),i8r=S();function a8r(r,e){if(xpr(r))return e8r(r,e);if(r8r(r))return t8r(r,e);throw new TypeError(i8r("invalid argument. First argument must be a complex-valued floating-point array. Value: `%s`.",r))}vN.exports=a8r});var cN=s((sBr,lN)=>{"use strict";var n8r=fN();lN.exports=n8r});var mN=s((oBr,pN)=>{"use strict";var u8r=Je();function s8r(r,e){return new u8r(r.buffer,r.byteOffset+r.BYTES_PER_ELEMENT*e,r.length-e)}pN.exports=s8r});var gN=s((vBr,hN)=>{"use strict";var o8r=mN();hN.exports=o8r});var yN=s((fBr,qN)=>{"use strict";var v8r=8,f8r=16;function l8r(r){return typeof r=="object"&&r!==null&&(r.constructor.name==="Complex128Array"&&r.BYTES_PER_ELEMENT===f8r||r.constructor.name==="Complex64Array"&&r.BYTES_PER_ELEMENT===v8r)}qN.exports=l8r});var bN=s((lBr,wN)=>{"use strict";var c8r=yN();wN.exports=c8r});var _N=s((cBr,dN)=>{"use strict";var p8r=1;function m8r(r){return typeof r=="object"&&r!==null&&r.constructor.name==="BooleanArray"&&r.BYTES_PER_ELEMENT===p8r}dN.exports=m8r});var TN=s((pBr,EN)=>{"use strict";var h8r=_N();EN.exports=h8r});var ON=s((mBr,AN)=>{"use strict";var g8r=qi(),q8r=Qe(),y8r=Et(),w8r=Si();function b8r(r){var e=w8r(r);return g8r(r)?q8r(e):y8r(e)}AN.exports=b8r});var IN=s((hBr,SN)=>{"use strict";var d8r=ON();SN.exports=d8r});var FN=s((gBr,NN)=>{"use strict";function _8r(r,e){return r===e?r===0?1/r===1/e:!0:r!==r&&e!==e}NN.exports=_8r});var PN=s((qBr,LN)=>{"use strict";var E8r=FN();LN.exports=E8r});var MN=s((yBr,RN)=>{"use strict";var T8r=Tr();function A8r(r){var e=new T8r(2);return e[0]=r.re,e[1]=r.im,e}RN.exports=A8r});var CN=s((wBr,VN)=>{"use strict";var O8r=MN();VN.exports=O8r});var GN=s((bBr,kN)=>{"use strict";var jN=PN(),BN=CN();function S8r(r,e){var t=BN(r),i=BN(e);return jN(t[0],i[0])&&jN(t[1],i[1])}kN.exports=S8r});var DN=s((dBr,UN)=>{"use strict";var I8r=GN();UN.exports=I8r});var YN=s((_Br,WN)=>{"use strict";var N8r=DN(),HN=zr();function F8r(r,e){return r===e?r===0?1/r===1/e:!0:r!==r&&e!==e?!0:HN(r)&&HN(e)?N8r(r,e):!1}WN.exports=F8r});var QN=s((EBr,KN)=>{"use strict";var L8r=YN();KN.exports=L8r});var JN=s((TBr,ZN)=>{"use strict";var P8r=oN(),R8r=zr(),M8r=Nr().isPrimitive,V8r=cN(),C8r=gN(),j8r=bN(),B8r=TN(),k8r=IN(),Vn=QN(),G8r=xe(),U8r=rt();function D8r(r,e,t){var i;for(i=t;i<r.length;i++)if(Vn(e,r[i]))return i;return-1}function H8r(r,e,t){var i,a;for(i=k8r(r),a=t;a<r.length;a++)if(Vn(e,i(r,a)))return a;return-1}function W8r(r,e,t){var i,a,n,u;if(!R8r(e))return-1;for(i=V8r(r,0),a=G8r(e),n=U8r(e),u=t*2;u<i.length;u+=2)if(Vn(i[u],a)&&Vn(i[u+1],n))return u/2;return-1}function Y8r(r,e,t){var i,a,n;if(!M8r(e))return-1;for(i=C8r(r,0),a=e?1:0,n=t;n<i.length;n++)if(i[n]===a)return n;return-1}function K8r(r,e,t){return t<0&&(t+=r.length,t<0&&(t=0)),P8r(r)?j8r(r)?W8r(r,e,t):B8r(r)?Y8r(r,e,t):H8r(r,e,t):D8r(r,e,t)}ZN.exports=K8r});var XN=s((ABr,$N)=>{"use strict";var Q8r=JN();$N.exports=Q8r});var rF=s((OBr,xN)=>{"use strict";var Z8r=Cr(),J8r=dr().isPrimitive,zN=hr().isPrimitive,$8r=XN(),zo=S();function X8r(r,e,t){var i,a;if(i=zN(r),!Z8r(r)&&!i)throw new TypeError(zo("invalid argument. First argument must be array-like. Value: `%s`.",r));if(arguments.length<2)throw new Error("insufficient arguments. Must provide a search value.");if(arguments.length>2){if(!J8r(t))throw new TypeError(zo("invalid argument. Third argument must be an integer. Value: `%s`.",t));a=t,a<0&&(a=0)}else a=0;if(i){if(!zN(e))throw new TypeError(zo("invalid argument. Second argument must be a string. Value: `%s`.",e));return r.indexOf(e,a)!==-1}return $8r(r,e,a)!==-1}xN.exports=X8r});var Cn=s((SBr,eF)=>{"use strict";var z8r=rF();eF.exports=z8r});var iF=s((IBr,tF)=>{"use strict";function x8r(r){var e,t,i;for(e=r.length,t=0,i=0;i<e;i++)t+=r[i];return t}tF.exports=x8r});var nF=s((NBr,aF)=>{"use strict";function r5r(r,e){return r<e?-1:r>e?1:0}function e5r(r){var e,t;for(e=[],t=0;t<r.length;t++)e.push(t);return e.sort(i);function i(a,n){return r5r(r[a],r[n])}}aF.exports=e5r});var sF=s((FBr,uF)=>{"use strict";var t5r=Cn(),i5r=Ms();function a5r(r,e){var t,i,a;for(t=r.length,i=i5r(!1,t),a=0;a<t;a++)i[a]=t5r(e,r[a]);return i}uF.exports=a5r});var pF=s((LBr,cF)=>{"use strict";var vF=Ut().factory,n5r=pe(),u5r=Bt(),oF=hr().isPrimitive,xo=z(),jn=S(),fF=["min","max","average","dense","ordinal"],lF=["last","first","remove"],s5r=vF(fF),o5r=vF(lF);function v5r(r,e){return u5r(e)?xo(e,"encoding")&&(r.encoding=e.encoding,!n5r(r.encoding))?new TypeError(jn("invalid option. `%s` option must be an array. Option: `%s`.","encoding",r.encoding)):xo(e,"method")&&(r.method=e.method,!oF(r.method)||!s5r(r.method))?new TypeError(jn('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"method",fF.join('", "'),r.method)):xo(e,"missing")&&(r.missing=e.missing,!oF(r.missing)||!o5r(r.missing))?new TypeError(jn('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"missing",lF.join('", "'),r.missing)):null:new TypeError(jn("invalid argument. Options argument must be an object. Value: `%s`.",e))}cF.exports=v5r});var hF=s((PBr,mF)=>{"use strict";var f5r=Cr(),l5r=Cn(),c5r=tn(),p5r=S(),m5r=iF(),h5r=nF(),g5r=sF(),q5r=pF();function y5r(r,e){var t,i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b;if(!f5r(r))throw new TypeError(p5r("invalid argument. First argument must be an array-like object. Value: `%s`.",r));if(h={},arguments.length>1&&(g=q5r(h,e),g))throw g;for(p=h.method||"average",o=h.encoding||[null,NaN],l=h.missing||"last",y=r.length,q=[],w=0;w<y;w++)l5r(o,r[w])||q.push(r[w]);if(t=g5r(r,o),y=q.length,n=0,f=h5r(q),m=c5r(y),p==="ordinal")for(w=0;w<y;w++)m[f[w]]=w+1;else for(i=0,w=0;w<y;w++)if(v=w+1,w===y-1||q[f[w]]!==q[f[v]]){switch(p){case"min":c=v-i;break;case"max":c=v;break;case"dense":c=v-i-n,n+=i;break;default:c=v-.5*i;break}for(b=w-i;b<v;b++)m[f[b]]=c;i=0}else i+=1;if(l==="first"){for(a=m5r(t),b=1,u=[],w=0;w<t.length;w++)t[w]?(u.push(b),b+=1):u.push(m.shift()+a);return u}if(l==="last"){for(u=[],w=0;w<t.length;w++)t[w]?u.push(w+m.length+1):u.push(m.shift());return u}return m}mF.exports=y5r});var rv=s((RBr,gF)=>{"use strict";var w5r=hF();gF.exports=w5r});var yF=s((MBr,qF)=>{"use strict";var b5r=Zi(),d5r=G(),ev=F();function _5r(r,e,t){var i,a;return ev(r)||ev(e)||ev(t)||t<0?NaN:t===0?r<e?0:1:(i=t*d5r(2),a=r-e,.5*b5r(-a/i))}qF.exports=_5r});var bF=s((VBr,wF)=>{"use strict";var E5r=Ee(),T5r=Ho().factory,tv=F(),A5r=G(),O5r=Zi();function S5r(r,e){var t;if(tv(r)||tv(e)||e<0)return E5r(NaN);if(e===0)return T5r(r);return t=e*A5r(2),i;function i(a){var n;return tv(a)?NaN:(n=a-r,.5*O5r(-n/t))}}wF.exports=S5r});var Bn=s((CBr,_F)=>{"use strict";var I5r=O(),dF=yF(),N5r=bF();I5r(dF,"factory",N5r);_F.exports=dF});var TF=s((jBr,EF)=>{"use strict";var F5r=tr();function L5r(r){return F5r(r)===r&&r>0}EF.exports=L5r});var iv=s((BBr,AF)=>{"use strict";var P5r=TF();AF.exports=P5r});var SF=s((kBr,OF)=>{"use strict";var R5r=Q(),M5r=or();function V5r(r){return r===r&&r>M5r&&r<R5r}OF.exports=V5r});var av=s((GBr,IF)=>{"use strict";var C5r=SF();IF.exports=C5r});var FF=s((UBr,NF)=>{"use strict";function j5r(r){return r}NF.exports=j5r});var PF=s((DBr,LF)=>{"use strict";var B5r=FF();LF.exports=B5r});var CF=s((HBr,VF)=>{"use strict";var RF=jr(),k5r=O(),G5r=PF(),U5r=z(),MF=S();function D5r(r,e){var t,i;if(!RF(r))throw new TypeError(MF("invalid argument. First argument must be a function. Value: `%s`.",r));if(arguments.length<2)t=G5r;else if(t=e,!RF(t))throw new TypeError(MF("invalid argument. Hash function argument must be a function. Value: `%s`.",t));return i={},k5r(a,"cache",i),a;function a(){var n,u,o,v;for(n=new Array(arguments.length),v=0;v<arguments.length;v++)n[v]=arguments[v];return o=t(n).toString(),U5r(i,o)?i[o]:(u=r.apply(null,n),i[o]=u,u)}}VF.exports=D5r});var BF=s((WBr,jF)=>{"use strict";var H5r=CF();jF.exports=H5r});var nv=s((YBr,kF)=>{"use strict";var W5r=BF(),kn;function Y5r(r,e){var t;return e===0?r===0?1:0:(t=e*(e+1)/2,r<0||r>t?0:(r>t/2&&(r=t-r),kn(r-e,e-1)+kn(r,e-1)))}kn=W5r(Y5r);kF.exports=kn});var UF=s((KBr,GF)=>{"use strict";var K5r=iv(),Q5r=av(),Z5r=F(),J5r=Yt(),$5r=x(),X5r=Sn(),z5r=nv();function x5r(r,e){var t,i,a,n;if(Z5r(r)||!K5r(e)||!Q5r(e))return NaN;if(r<0)return 0;if(r=J5r(r),t=e*(e+1)/2,r>=t)return 1;for(i=$5r(-e*X5r),n=0,a=0;a<=r;a++)n+=z5r(a,e)*i;return n}GF.exports=x5r});var HF=s((QBr,DF)=>{"use strict";var r7r=iv(),e7r=Ee(),t7r=av(),i7r=Yt(),a7r=F(),n7r=x(),u7r=Sn(),s7r=nv();function o7r(r){var e,t;if(!r7r(r)||!t7r(r))return e7r(NaN);return t=n7r(-r*u7r),e=r*(r+1)/2,i;function i(a){var n,u;if(a7r(a))return NaN;if(a<0)return 0;if(a=i7r(a),a>=e)return 1;for(u=0,n=0;n<=a;n++)u+=s7r(n,r)*t;return u}}DF.exports=o7r});var KF=s((ZBr,YF)=>{"use strict";var v7r=O(),WF=UF(),f7r=HF();v7r(WF,"factory",f7r);YF.exports=WF});var ZF=s((JBr,QF)=>{"use strict";var l7r=Cr(),c7r=Sa(),p7r=S();function m7r(r){var e,t,i,a,n,u,o;if(!l7r(r))throw new TypeError(p7r("invalid argument. First argument must be a collection. Value: `%s`.",r));for(e=0,t=[],a=[],i=r.length,u=0;u<i;u++)n=r[u],e+=1,o=c7r(t,n),o===-1?(t.push(n),a.push([n,1,0])):a[o][1]+=1;for(i=a.length,u=0;u<i;u++)a[u][2]=a[u][1]/e;return a}QF.exports=m7r});var $F=s(($Br,JF)=>{"use strict";var h7r=ZF();JF.exports=h7r});var zF=s((XBr,XF)=>{"use strict";var g7r=F();function q7r(r){return r===0||g7r(r)?r:r<0?-1:1}XF.exports=q7r});var ii=s((zBr,xF)=>{"use strict";var y7r=zF();xF.exports=y7r});var sL=s((xBr,uL)=>{"use strict";var iL=Ut().factory,rL=Nr().isPrimitive,eL=qr().isPrimitive,w7r=gr(),tL=hr().isPrimitive,Gn=Ke(),ai=z(),Te=S(),aL=["two-sided","less","greater"],nL=["pratt","wilcox","zsplit"],b7r=iL(aL),d7r=iL(nL);function _7r(r,e){if(!w7r(e))return new TypeError(Te("invalid argument. Options argument must be an object. Value: `%s`.",e));if(ai(e,"alpha")){if(r.alpha=e.alpha,!eL(r.alpha)||Gn(r.alpha))return new TypeError(Te("invalid option. `%s` option must be a number. Option: `%s`.","alpha",r.alpha));if(r.alpha<0||r.alpha>1)return new RangeError(Te("invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%f`.","alpha",r.alpha))}if(ai(e,"alternative")){if(r.alternative=e.alternative,!tL(r.alternative))return new TypeError(Te("invalid option. `%s` option must be a string. Option: `%s`.","alternative",r.alternative));if(!b7r(r.alternative))return new Error(Te('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"alternative",aL.join('", "'),r.alternative))}if(ai(e,"correction")&&(r.correction=e.correction,!rL(r.correction)||Gn(r.correction)))return new TypeError(Te("invalid option. `%s` option must be a boolean. Option: `%s`.","correction",r.alpha));if(ai(e,"exact")&&(r.exact=e.exact,!rL(r.exact)||Gn(r.exact)))return new TypeError(Te("invalid option. `%s` option must be a boolean. Option: `%s`.","exact",r.alpha));if(ai(e,"mu")&&(r.mu=e.mu,!eL(r.mu)||Gn(r.mu)))return new TypeError(Te("invalid option. `%s` option must be a number. Option: `%s`.","mu",r.mu));if(ai(e,"zeroMethod")){if(r.zeroMethod=e.zeroMethod,!tL(r.zeroMethod))return new TypeError(Te("invalid option. `%s` option must be a string. Option: `%s`.","zeroMethod",r.alternative));if(!d7r(r.zeroMethod))return new Error(Te('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"zeroMethod",nL.join('", "'),r.zeroMethod))}return null}uL.exports=_7r});var vL=s((rkr,oL)=>{"use strict";function E7r(r,e){return r-e}function T7r(r){var e,t,i,a;for(r=r.slice(),r.sort(E7r),e=r.length,i=1,a=0;i<e;i++)t=r[i],r[a]!==t&&(a+=1,r[a]=t);return r.length=a+1,r}oL.exports=T7r});var pL=s((ekr,cL)=>{"use strict";var A7r=Xr(),O7r=gr(),S7r=Nr().isPrimitive,fL=z(),lL=Lt(),uv=S();function I7r(r){var e,t,i;if(t=4,e=!0,arguments.length>0){if(!O7r(r))throw new TypeError(uv("invalid argument. First argument must be an object. Value: `%s`.",r));if(fL(r,"digits")){if(!A7r(r.digits))throw new TypeError(uv("invalid option. `%s` option must be a positive integer. Option: `%s`.","digits",r.digits));t=r.digits}if(fL(r,"decision")){if(!S7r(r.decision))throw new TypeError(uv("invalid option. `%s` option must be a boolean. Option: `%s`.","decision",r.decision));e=r.decision}}switch(i="",i+=this.method,i+=`

`,i+="Alternative hypothesis: ",this.method==="Paired Wilcoxon signed rank test"?i+="Median of the difference `x - y` is ":i+="Median of `x` is ",this.alternative){case"less":i+="less than ";break;case"greater":i+="greater than ";break;default:i+="not equal to ";break}return i+=this.nullValue,i+=`

`,i+="    pValue: "+lL(this.pValue,-t)+`
`,i+="    statistic: "+lL(this.statistic,-t)+`
`,i+=`
`,e&&(i+="Test Decision: ",this.rejected?i+="Reject null in favor of alternative at "+this.alpha*100+"% significance level":i+="Fail to reject null in favor of alternative at "+this.alpha*100+"% significance level",i+=`
`),i}cL.exports=I7r});var wL=s((tkr,yL)=>{"use strict";var mL=ei().primitives,hL=ti(),lt=$e(),N7r=gr(),F7r=rv(),L7r=Bn().factory,Un=KF(),P7r=$F(),R7r=ii(),M7r=G(),gL=k(),qL=Tr(),sv=S(),V7r=sL(),C7r=vL(),j7r=pL(),ov=L7r(0,1);function B7r(){var r,e,t,i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E,d,R,U,rr,er,J;if(er=arguments[0],!hL(er)&&!mL(er))throw new TypeError(sv("invalid argument. First argument must be a numeric array. Value: `%s`.",er));if(q=er.length,arguments.length>1)if(N7r(arguments[1]))t=arguments[1];else{if(J=arguments[1],!hL(J)&&!mL(J))throw new TypeError(sv("invalid argument. `%s` argument must be a numeric array. Value: `%s`.","y",J));if(q!==J.length)throw new Error("invalid arguments. First and second arguments must have the same length.");arguments.length>2&&(t=arguments[2])}if(c={},t&&(h=V7r(c,t),h))throw h;if(b=c.mu||0,c.correction===void 0?r=!0:r=c.correction,c.alpha===void 0?f=.05:f=c.alpha,q<2)throw new Error(sv("invalid argument. First argument must contain at least two elements. Value: `%s`.",er));if(m=c.alternative||"two-sided",e=c.zeroMethod||"wilcox",e==="wilcox"){if(E=[],J)for(d=0;d<q;d++)rr=er[d]-J[d]-b,rr!==0&&E.push(rr);else for(d=0;d<q;d++)er[d]!==0&&E.push(er[d]-b);o=er.length-E.length}else if(E=new qL(q),o=0,J)for(d=0;d<q;d++)E[d]=er[d]-J[d]-b,E[d]===0&&(o+=1);else for(d=0;d<q;d++)E[d]=er[d]-b,E[d]===0&&(o+=1);if(o===q)throw new Error("`x` or `x - y` cannot be zero for all elements.");for(q=E.length,w=new qL(q),d=0;d<q;d++)w[d]=gL(E[d]);for(R=F7r(w),u=0,v=0,d=0;d<q;d++)E[d]>0?u+=R[d]:E[d]===0&&(v+=R[d]);if(i=C7r(R).length!==R.length,e==="zsplit"&&(u+=v/2),U=u,T=q*(q+1)*.25,_=q*(q+1)*(2*q+1),e==="pratt"){for(g=[],d=0;d<q;d++)E[d]!==0&&g.push(R[d]);R=g,T-=o*(o+1)*.25,_-=o*(o+1)*(2*o+1)}for(a=P7r(R),n=0,d=0;d<a.length;d++)a[d][1]>1&&(rr=a[d][1],n+=rr*(rr*rr-1));if(n>0&&(_-=.5*n),_=M7r(_/24),q>50&&!c.exact||o>0||i){if(E=0,r)switch(m){case"two-sided":E=.5*R7r(U-T);break;case"less":E=-.5;break;default:E=.5;break}p=(U-T-E)/_,m==="two-sided"?l=2*(1-ov(gL(p))):m==="greater"?l=1-ov(p):l=ov(p)}else p=U,m==="two-sided"?p>q*(q+1)/4?l=2*(1-Un(p-1,q)):l=2*Un(p,q):m==="greater"?l=1-Un(p-1,q):l=Un(p,q);return y={},lt(y,"rejected",l<=f),lt(y,"alpha",f),lt(y,"pValue",l),lt(y,"statistic",U),lt(y,"nullValue",b),lt(y,"alternative",m),lt(y,"method",(J?"Paired":"One-Sample")+" Wilcoxon signed rank test"),lt(y,"print",j7r),y}yL.exports=B7r});var dL=s((ikr,bL)=>{"use strict";var k7r=wL();bL.exports=k7r});var vv=s((akr,_L)=>{"use strict";var G7r=.7853981633974483;_L.exports=G7r});var TL=s((nkr,EL)=>{"use strict";function U7r(r){var e,t,i;return r===0?.16666666666666713:(r<0?e=-r:e=r,e<=1?(t=-8.198089802484825+r*(19.562619833175948+r*(-16.262479672107002+r*(5.444622390564711+r*(-.6019598008014124+r*.004253011369004428)))),i=-49.18853881490881+r*(139.51056146574857+r*(-147.1791292232726+r*(70.49610280856842+r*(-14.740913729888538+r*1))))):(r=1/r,t=.004253011369004428+r*(-.6019598008014124+r*(5.444622390564711+r*(-16.262479672107002+r*(19.562619833175948+r*-8.198089802484825)))),i=1+r*(-14.740913729888538+r*(70.49610280856842+r*(-147.1791292232726+r*(139.51056146574857+r*-49.18853881490881))))),t/i)}EL.exports=U7r});var OL=s((ukr,AL)=>{"use strict";function D7r(r){var e,t,i;return r===0?.08333333333333809:(r<0?e=-r:e=r,e<=1?(t=28.536655482610616+r*(-25.56901049652825+r*(6.968710824104713+r*(-.5634242780008963+r*.002967721961301243))),i=342.43986579130785+r*(-383.8770957603691+r*(147.0656354026815+r*(-21.947795316429207+r*1)))):(r=1/r,t=.002967721961301243+r*(-.5634242780008963+r*(6.968710824104713+r*(-25.56901049652825+r*28.536655482610616))),i=1+r*(-21.947795316429207+r*(147.0656354026815+r*(-383.8770957603691+r*342.43986579130785)))),t/i)}AL.exports=D7r});var NL=s((skr,IL)=>{"use strict";var H7r=F(),W7r=G(),SL=vv(),Y7r=TL(),K7r=OL(),Q7r=6123233995736766e-32;function Z7r(r){var e,t,i,a,n;if(H7r(r))return NaN;if(r>0?i=r:(e=!0,i=-r),i>1)return NaN;if(i>.625)t=1-i,a=t*K7r(t),t=W7r(t+t),n=SL-t,t=t*a-Q7r,n-=t,n+=SL;else{if(i<1e-8)return r;t=i*i,n=t*Y7r(t),n=i*n+i}return e?-n:n}IL.exports=Z7r});var Dn=s((okr,FL)=>{"use strict";var J7r=NL();FL.exports=J7r});var PL=s((vkr,LL)=>{"use strict";function $7r(r){var e,t,i;return r===0?1/0:(r<0?e=-r:e=r,e<=1?(t=709811.662581658+r*(679979.8474157227+r*(293136.7857211597+r*(74887.54032914672+r*(12555.290582413863+r*(1443.4299244417066+r*(115.24194596137347+r*(6.309239205732627+r*(.22668404630224365+r*(.004826466289237662+r*4624429436045379e-20))))))))),i=0+r*(362880+r*(1026576+r*(1172700+r*(723680+r*(269325+r*(63273+r*(9450+r*(870+r*(45+r*1)))))))))):(r=1/r,t=4624429436045379e-20+r*(.004826466289237662+r*(.22668404630224365+r*(6.309239205732627+r*(115.24194596137347+r*(1443.4299244417066+r*(12555.290582413863+r*(74887.54032914672+r*(293136.7857211597+r*(679979.8474157227+r*709811.662581658))))))))),i=1+r*(45+r*(870+r*(9450+r*(63273+r*(269325+r*(723680+r*(1172700+r*(1026576+r*(362880+r*0)))))))))),t/i)}LL.exports=$7r});var VL=s((fkr,ML)=>{"use strict";var RL=F(),X7r=ve(),z7r=G(),x7r=k(),rmr=x(),fv=ir(),emr=Nt(),lv=se(),cv=PL(),pv=10.900511;function tmr(r,e){var t,i,a,n,u,o,v;return RL(r)||RL(e)?NaN:r<0||e<0?NaN:e===1?1/r:r===1?1/e:(v=r+e,v<lv?(u=v/r,u/=e,u):v===r&&e<lv?1/e:v===e&&r<lv?1/r:(r<e&&(o=e,e=r,r=o),i=r+pv-.5,a=e+pv-.5,n=v+pv-.5,u=cv(r)*(cv(e)/cv(v)),t=r-.5-e,x7r(e*t)<n*100&&r>100?u*=rmr(t*X7r(-e/n)):u*=fv(i/n,t),n>1e10?u*=fv(i/n*(a/n),e):u*=fv(i*a/(n*n),e),u*=z7r(emr/a),u))}ML.exports=tmr});var mv=s((lkr,CL)=>{"use strict";var imr=VL();CL.exports=imr});var Hn=s((ckr,jL)=>{"use strict";var amr=1.5707963267948966;jL.exports=amr});var BL=s((pkr,nmr)=>{nmr.exports=[1,1,2,6,24,120,720,5040,40320,362880,3628800,39916800,479001600,6227020800,87178291200,1307674368e3,20922789888e3,355687428096e3,6402373705728e3,121645100408832e3,243290200817664e4,5109094217170944e4,11240007277776077e5,2585201673888498e7,6204484017332394e8,15511210043330986e9,40329146112660565e10,10888869450418352e12,30488834461171387e13,8841761993739702e15,26525285981219107e16,8222838654177922e18,2631308369336935e20,8683317618811886e21,29523279903960416e22,10333147966386145e24,37199332678990125e25,13763753091226346e27,5230226174666011e29,20397882081197444e30,8159152832478977e32,3345252661316381e34,140500611775288e37,6041526306337383e37,2658271574788449e39,11962222086548019e40,5502622159812089e42,25862324151116818e43,12413915592536073e45,6082818640342675e47,30414093201713376e48,15511187532873822e50,8065817517094388e52,42748832840600255e53,2308436973392414e56,12696403353658276e57,7109985878048635e59,40526919504877214e60,23505613312828785e62,13868311854568984e64,832098711274139e67,5075802138772248e68,3146997326038794e70,198260831540444e73,12688693218588417e73,8247650592082472e75,5443449390774431e77,3647111091818868e79,24800355424368305e80,1711224524281413e83,11978571669969892e84,8504785885678623e86,61234458376886085e87,44701154615126844e89,3307885441519386e92,248091408113954e95,18854947016660504e95,14518309202828587e97,11324281178206297e99,8946182130782976e101,7156945704626381e103,5797126020747368e105,4753643337012842e107,3945523969720659e109,3314240134565353e111,281710411438055e114,24227095383672734e114,2107757298379528e117,18548264225739844e118,1650795516090846e121,14857159644817615e122,1352001527678403e125,12438414054641308e126,11567725070816416e128,1087366156656743e131,1032997848823906e133,9916779348709496e134,9619275968248212e136,9426890448883248e138,9332621544394415e140,9332621544394415e142,942594775983836e145,9614466715035127e146,990290071648618e149,10299016745145628e150,1081396758240291e153,11462805637347084e154,1226520203196138e157,1324641819451829e159,14438595832024937e160,1588245541522743e163,17629525510902446e164,1974506857221074e167,22311927486598138e168,25435597334721877e170,2925093693493016e173,3393108684451898e175,3969937160808721e177,4684525849754291e179,5574585761207606e181,6689502913449127e183,8094298525273444e185,9875044200833601e187,1214630436702533e190,1506141741511141e192,1882677176888926e194,2372173242880047e196,30126600184576594e197,3856204823625804e200,4974504222477287e202,6466855489220474e204,847158069087882e207,11182486511960043e208,14872707060906857e210,19929427461615188e212,26904727073180504e214,3659042881952549e217,5012888748274992e219,6917786472619489e221,9615723196941089e223,13462012475717526e225,1898143759076171e228,2695364137888163e230,3854370717180073e232,55502938327393044e233,8047926057471992e236,11749972043909107e238,1727245890454639e241,25563239178728654e242,380892263763057e246,5713383956445855e247,862720977423324e250,13113358856834524e251,20063439050956823e253,30897696138473508e255,4789142901463394e258,7471062926282894e260,11729568794264145e262,1853271869493735e265,29467022724950384e266,47147236359920616e268,7590705053947219e271,12296942187394494e273,20044015765453026e275,3287218585534296e278,5423910666131589e280,9003691705778438e282,1503616514864999e285,25260757449731984e286,4269068009004705e289,7257415615307999e291]});var GL=s((mkr,kL)=>{"use strict";var umr=F(),smr=Ir(),omr=be(),vmr=Q(),fmr=Ki(),lmr=BL();function cmr(r){return umr(r)?NaN:smr(r)?r<0?NaN:r<=fmr?lmr[r]:vmr:omr(r+1)}kL.exports=cmr});var hv=s((hkr,UL)=>{"use strict";var pmr=GL();UL.exports=pmr});var HL=s((gkr,DL)=>{"use strict";function mmr(r){var e,t,i;return r===0?1/0:(r<0?e=-r:e=r,e<=1?(t=3847467039331777e-5+r*(3685766504351951e-5+r*(1588920245372942e-5+r*(4059208354298835e-6+r*(6805476611834733e-7+r*(7823975500312005e-8+r*(6246580776401795e-9+r*(341986.3488721347+r*(12287.194511824551+r*(261.61404416416684+r*2.5066282746310007))))))))),i=0+r*(362880+r*(1026576+r*(1172700+r*(723680+r*(269325+r*(63273+r*(9450+r*(870+r*(45+r*1)))))))))):(r=1/r,t=2.5066282746310007+r*(261.61404416416684+r*(12287.194511824551+r*(341986.3488721347+r*(6246580776401795e-9+r*(7823975500312005e-8+r*(6805476611834733e-7+r*(4059208354298835e-6+r*(1588920245372942e-5+r*(3685766504351951e-5+r*3847467039331777e-5))))))))),i=1+r*(45+r*(870+r*(9450+r*(63273+r*(269325+r*(723680+r*(1172700+r*(1026576+r*(362880+r*0)))))))))),t/i)}DL.exports=mmr});var YL=s((qkr,WL)=>{"use strict";var hmr=HL();WL.exports=hmr});var QL=s((ykr,KL)=>{"use strict";var gmr=YL();KL.exports=gmr});var tP=s((wkr,eP)=>{"use strict";var ZL=QL(),qmr=be(),ymr=ve(),JL=k(),$L=x(),XL=ir(),zL=se(),wmr=Nt(),bmr=zt(),xL=Ki(),dmr=4269068009004705e289;function rP(r,e){var t,i,a;return r<zL?e>=xL?(i=rP(e,xL-e),i*=r,i*=dmr,1/i):1/(r*qmr(r+e)):(a=r+bmr-.5,r+e===r?JL(e/a)<zL?t=$L(-e):t=1:(JL(e)<10?t=$L((.5-r)*ymr(e/a)):t=XL(a/(a+e),r-.5),t*=ZL(r)/ZL(r+e)),t*=XL(wmr/(a+e),e),t)}eP.exports=rP});var oP=s((bkr,sP)=>{"use strict";var _mr=k(),iP=tr(),aP=be(),nP=hv(),uP=Ki(),Emr=tP();function Tmr(r,e){var t,i,a;if(r<=0||r+e<=0)return aP(r)/aP(r+e);if(i=iP(e),i===e){if(a=iP(r),a===r&&r<=uP&&r+e<=uP)return nP(a-1)/nP(i+a-1);if(_mr(e)<20){if(e===0)return 1;if(e<0){for(r-=1,t=r,e+=1;e!==0;)r-=1,t*=r,e+=1;return t}for(t=1/r,e-=1;e!==0;)r+=1,t/=r,e-=1;return t}}return Emr(r,e)}sP.exports=Tmr});var Wn=s((dkr,vP)=>{"use strict";var Amr=oP();vP.exports=Amr});var pP=s((_kr,cP)=>{"use strict";var ni=x(),Yn=ir(),Omr=$(),fP=Ue(),lP=It();function Smr(r,e){var t,i;return i=r*Omr(e),e>=1?i<fP&&-e>lP?t=Yn(e,r)*ni(-e):r>=1?t=Yn(e/ni(e/r),r):t=ni(i-e):i>lP?t=Yn(e,r)*ni(-e):e/r<fP?t=Yn(e/ni(e/r),r):t=ni(i-e),t}cP.exports=Smr});var gP=s((Ekr,hP)=>{"use strict";var Imr=Ji(),Nmr=Zt(),Fmr=be(),Lmr=ve(),Pmr=G(),Rmr=k(),ct=x(),ia=ir(),gv=We(),qv=ue(),mP=$(),Kn=Ue(),aa=It(),yv=zt(),Mmr=Nt();function Vmr(r,e){var t,i,a,n,u,o,v;return a=r+yv-.5,v=(e-r-yv+.5)/a,r<1?e<=aa?ct(r*mP(e)-e-Nmr(r)):ia(e,r)*ct(-e)/Fmr(r):(Rmr(v*v*r)<=100&&r>150?(t=r*(Lmr(v)-v)+e*(.5-yv)/a,t=ct(t)):(n=r*mP(e/a),u=r-e,qv(n,u)<=aa||gv(n,u)>=Kn?(i=u/r,qv(n,u)/2>aa&&gv(n,u)/2<Kn?(o=ia(e/a,r/2)*ct(u/2),t=o*o):qv(n,u)/4>aa&&gv(n,u)/4<Kn&&e>r?(o=ia(e/a,r/4)*ct(u/4),t=o*o,t*=t):i>aa&&i<Kn?t=ia(e*ct(i)/a,r):t=ct(n+u)):t=ia(e/a,r)*ct(u)),t*=Pmr(a/Mmr)/Imr(r),t)}hP.exports=Vmr});var dP=s((Tkr,bP)=>{"use strict";var Cmr=Wn(),qP=hv(),jmr=ra(),Bmr=ve(),Qn=k(),yP=ir(),kmr=$(),Gmr=nt(),wP=se(),Umr=pP(),Dmr=gP(),pt=new Array(30);function Hmr(r,e,t,i,a,n,u){var o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E,d,R;if(p=e-1,d=r+p/2,i<.35?g=Bmr(-i):g=kmr(t),R=-d*g,w=Dmr(e,R),w<=Gmr)return a;for(u?(o=w/Cmr(r,e),o/=yP(d,e)):o=Umr(e,R)/yP(d,e),o*=n,pt[0]=1,b=jmr(R,e,!0,!0),b/=w,l=a+o*b,f=1,m=g/2,m*=m,h=1,y=4*d*d,c=e,_=1;_<pt.length;++_){for(f+=2,pt[_]=0,q=e-_,v=3,T=1;T<_;++T)q=T*e-_,pt[_]+=q*pt[_-T]/qP(v),v+=2;if(pt[_]/=_,pt[_]+=p/qP(f),b=(c*(c+1)*b+(R+c+1)*h)/y,h*=m,c+=2,E=o*pt[_]*b,l+=E,E>1){if(Qn(E)<Qn(wP*l))break}else if(Qn(E/wP)<Qn(l))break}return l}bP.exports=Hmr});var EP=s((Akr,_P)=>{"use strict";function Wmr(r,e,t){var i,a;if(t===0)return 1;for(i=1,a=0;a<t;a++)i*=(r+a)/(e+a);return i}_P.exports=Wmr});var OP=s((Okr,AP)=>{"use strict";var TP=k(),Ymr=We();function Kmr(r,e){return Ymr(TP(r),TP(e))}AP.exports=Kmr});var IP=s((Skr,SP)=>{"use strict";var Qmr=OP();SP.exports=Qmr});var LP=s((Ikr,FP)=>{"use strict";var NP=k(),Zmr=ue();function Jmr(r,e){return Zmr(NP(r),NP(e))}FP.exports=Jmr});var RP=s((Nkr,PP)=>{"use strict";var $mr=LP();PP.exports=$mr});var Jn=s((Fkr,CP)=>{"use strict";var wv=Ji(),Xmr=IP(),zmr=RP(),MP=Ft(),mt=ve(),VP=G(),Zn=k(),Ae=x(),Oe=ir(),xmr=ue(),Wr=$(),Se=Ue(),ui=It(),bv=zt(),r9r=Nt();function e9r(r,e,t,i,a){var n,u,o,v,f,l,c,p,m,h,q,g,y,w;if(!a)return Oe(t,r)*Oe(i,e);if(y=r+e,v=r+bv-.5,f=e+bv-.5,l=y+bv-.5,n=wv(y),n/=wv(r)*wv(e),n*=VP(f/r9r),n*=VP(v/l),c=(t*e-i*v)/v,p=(i*r-t*f)/f,zmr(c,p)<.2)if(c*p>0||xmr(r,e)<1)Zn(c)<.1?n*=Ae(r*mt(c)):n*=Oe(t*l/v,r),Zn(p)<.1?n*=Ae(e*mt(p)):n*=Oe(i*l/f,e);else if(Xmr(c,p)<.5)u=r<e,o=e/r,u&&o*p<.1||!u&&c/o>.1?(m=MP(o*mt(p)),m=c+m+m*c,m=r*mt(m),n*=Ae(m)):(m=MP(mt(c)/o),m=p+m+m*p,m=e*mt(m),n*=Ae(m));else if(Zn(c)<Zn(p))if(w=r*mt(c)+e*Wr(i*l/f),w<=ui||w>=Se){if(w+=Wr(n),w>=Se)return NaN;n=Ae(w)}else n*=Ae(w);else if(w=e*mt(p)+r*Wr(t*l/v),w<=ui||w>=Se){if(w+=Wr(n),w>=Se)return NaN;n=Ae(w)}else n*=Ae(w);else if(q=t*l/v,g=i*l/f,c=r*Wr(q),p=e*Wr(g),c>=Se||c<=ui||p>=Se||p<=ui)if(r<e)if(h=Oe(g,e/r),m=r*(Wr(q)+Wr(h)),m<Se&&m>ui)n*=Oe(h*q,r);else{if(p+=c+Wr(n),p>=Se)return NaN;n=Ae(p)}else if(h=Oe(q,r/e),m=(Wr(h)+Wr(g))*e,m<Se&&m>ui)n*=Oe(h*g,e);else{if(p+=c+Wr(n),p>=Se)return NaN;n=Ae(p)}else n*=Oe(q,r)*Oe(g,e);return n}CP.exports=e9r});var BP=s((Lkr,jP)=>{"use strict";var t9r=jo(),i9r=Jn(),a9r={keep:!0,maxIter:1e3};function n9r(r,e,t,i){var a=0;return n;function n(){var u,o,v;return o=(r+a-1)*(r+e+a-1)*a*(e-a)*t*t,u=r+2*a-1,o/=u*u,v=a,v+=a*(e-a)*t/(r+2*a-1),v+=(r+a)*(r*i-e*t+1+a*(2-t))/(r+2*a+1),a+=1,[o,v]}}function u9r(r,e,t,i,a,n){var u,o,v;return u=i9r(r,e,t,i,a),n&&(n[1]=u),u===0?u:(v=n9r(r,e,t,i),o=t9r(v,a9r),u/o)}jP.exports=u9r});var GP=s((Pkr,kP)=>{"use strict";function s9r(r,e){var t=0,i;if(r===0)return e;if(e===0)return r;for(;(r&1)===0&&(e&1)===0;)r>>>=1,e>>>=1,t+=1;for(;(r&1)===0;)r>>>=1;for(;e;){for(;(e&1)===0;)e>>>=1;r>e&&(i=e,e=r,r=i),e-=r}return r<<t}kP.exports=s9r});var DP=s((Rkr,UP)=>{"use strict";function o9r(r,e){var t=1,i;if(r===0)return e;if(e===0)return r;for(;r%2===0&&e%2===0;)r/=2,e/=2,t*=2;for(;r%2===0;)r/=2;for(;e;){for(;e%2===0;)e/=2;r>e&&(i=e,e=r,r=i),e-=r}return t*r}UP.exports=o9r});var JP=s((Mkr,ZP)=>{"use strict";var HP=F(),WP=Ir(),YP=Q(),KP=or(),QP=Pa(),v9r=GP(),f9r=DP();function l9r(r,e){return HP(r)||HP(e)?NaN:r===YP||e===YP||r===KP||e===KP?NaN:WP(r)&&WP(e)?(r<0&&(r=-r),e<0&&(e=-e),r<=QP&&e<=QP?v9r(r,e):f9r(r,e)):NaN}ZP.exports=l9r});var XP=s((Vkr,$P)=>{"use strict";var c9r=JP();$P.exports=c9r});var eR=s((Ckr,rR)=>{"use strict";var p9r=Yo(),m9r=Q(),zP=Ir(),xP=F(),h9r=_n(),g9r=tr(),q9r=XP();function dv(r,e){var t,i,a,n,u,o,v;if(xP(r)||xP(e))return NaN;if(!zP(r)||!zP(e))return NaN;if(e<0||(i=1,r<0&&(r=-r+e-1,h9r(e)&&(i*=-1)),e>r))return 0;if(e===0||e===r)return i;if(e===1||e===r-1)return i*r;for(r-e<e&&(e=r-e),v=g9r(p9r/r),t=1,u=1;u<=e&&!(t>v);u++)t*=r,t/=u,r-=1;return u>e?i*t:(a=dv(r,e-u+1),a===m9r?i*a:(n=dv(e,e-u+1),o=q9r(a,n),a/=o,n/=o,t/=n,i*t*a))}rR.exports=dv});var iR=s((jkr,tR)=>{"use strict";var y9r=eR();tR.exports=y9r});var uR=s((Bkr,nR)=>{"use strict";var aR=iR(),Pt=tr(),na=ir(),w9r=nt();function b9r(r,e,t,i){var a,n,u,o,v;if(n=na(t,r),n>w9r)for(o=n,v=Pt(r-1);v>e;v--)o*=(v+1)*i/((r-v)*t),n+=o;else if(u=Pt(r*t),u<=e+1&&(u=Pt(e+2)),n=na(t,u)*na(i,r-u),n*=aR(Pt(r),Pt(u)),n===0)for(v=u-1;v>e;v--)n+=na(t,v)*na(i,r-v),n*=aR(Pt(r),Pt(v));else{for(o=n,a=n,v=u-1;v>e;v--)o*=(v+1)*i/((r-v)*t),n+=o;for(o=a,v=u+1;v<=r;v++)o*=(r-v+1)*t/(v*i),n+=o}return n}nR.exports=b9r});var oR=s((kkr,sR)=>{"use strict";var d9r=Jn();function _9r(r,e,t,i,a,n,u){var o,v,f,l;if(o=d9r(r,e,t,i,n),u&&(u[1]=o),o/=r,o===0)return o;for(f=1,v=1,l=0;l<a-1;++l)v*=(r+e+l)*t/(r+l+1),f+=v;return o*=f,o}sR.exports=_9r});var pR=s((Gkr,cR)=>{"use strict";var _v=Ji(),E9r=$t(),T9r=ve(),A9r=G(),Ev=x(),$n=ir(),ua=$(),O9r=nt(),vR=Ue(),fR=It(),Tv=zt(),S9r=Nt(),lR={maxTerms:100};function I9r(r,e,t,i){var a=1-e,n=1;return u;function u(){var o=i/r;return r+=1,i*=a*t/n,n+=1,a+=1,o}}function N9r(r,e,t,i,a,n,u){var o,v,f,l,c,p,m,h;return a?(m=r+e,v=r+Tv-.5,f=e+Tv-.5,l=m+Tv-.5,o=_v(m)/(_v(r)*_v(e)),c=ua(l/f)*(e-.5),p=ua(t*l/v)*r,c>fR&&c<vR&&p>fR&&p<vR?(r*e<f*10?o*=Ev((e-.5)*T9r(r/f)):o*=$n(l/f,e-.5),o*=$n(t*l/v,r),o*=A9r(v/S9r),n&&(n[1]=o*$n(u,e))):(o=ua(o)+c+p+(ua(v)-1)/2,n&&(n[1]=Ev(o+e*ua(u))),o=Ev(o))):o=$n(t,r),o<O9r?i:(h=I9r(r,e,t,o),lR.initialValue=i,E9r(h,lR))}cR.exports=N9r});var Sv=s((Ukr,bR)=>{"use strict";var F9r=F(),L9r=Ft(),Xn=tr(),mR=ve(),hR=Dn(),Yr=mv(),Av=G(),P9r=x(),sa=ir(),R9r=We(),gR=ue(),zn=vt(),qR=nt(),M9r=Pa(),V9r=Hn(),wR=Ge(),ht=dP(),Ov=EP(),C9r=Jn(),yR=BP(),j9r=uR(),oa=oR(),Ie=pR(),B9r=1/wR;function k9r(r,e,t,i,a,n,u,o){var v,f,l,c,p,m,h,q,g,y,w,b;if(b=1-r,h=o,q=o+u,n[q]=-1,F9r(r)||r<0||r>1)return n[h]=NaN,n[q]=NaN,n;if(i){if(e<0||t<0)return n[h]=NaN,n[q]=NaN,n;if(e===0){if(t===0)return n[h]=NaN,n[q]=NaN,n;if(t>0)return n[h]=a?0:1,n}else if(t===0&&e>0)return n[h]=a?1:0,n}else if(e<=0||t<=0)return n[h]=NaN,n[q]=NaN,n;return r===0?(e===1?n[q]=1:n[q]=e<1?zn/2:qR*2,a?(n[h]=i?1:Yr(e,t),n):(n[h]=0,n)):r===1?(t===1?n[q]=1:n[q]=t<1?zn/2:qR*2,a?n[h]=0:n[h]=i?1:Yr(e,t),n):e===.5&&t===.5?(n[q]=B9r*Av(b*r),w=hR(Av(a?b:r)),w/=V9r,i||(w*=wR),n[h]=w,n):(e===1&&(m=t,t=e,e=m,m=b,b=r,r=m,a=!a),t===1?e===1?(n[h]=a?b:r,n[q]=1,n):(n[q]=e*sa(r,e-1),b<.5?w=a?-L9r(e*mR(-b)):P9r(e*mR(-b)):w=a?-(sa(r,e)-1):sa(r,e),i||(w/=e),n[h]=w,n):(gR(e,t)<=1?(r>.5&&(m=t,t=e,e=m,m=b,b=r,r=m,a=!a),R9r(e,t)<=1?e>=gR(.2,t)||sa(r,e)<=.9?a?(l=-(i?1:Yr(e,t)),a=!1,l=-Ie(e,t,r,l,i,n,b)):l=Ie(e,t,r,0,i,n,b):(m=t,t=e,e=m,m=b,b=r,r=m,a=!a,b>=.3?a?(l=-(i?1:Yr(e,t)),a=!1,l=-Ie(e,t,r,l,i,n,b)):l=Ie(e,t,r,0,i,n,b):(i?f=1:f=Ov(e+t,e,20),l=oa(e,t,r,b,20,i,n),a?(l-=i?1:Yr(e,t),a=!1,l=-ht(e+20,t,r,b,l,f,i)):l=ht(e+20,t,r,b,l,f,i))):t<=1||r<.1&&sa(t*r,e)<=.7?a?(l=-(i?1:Yr(e,t)),a=!1,l=-Ie(e,t,r,l,i,n,b)):l=Ie(e,t,r,0,i,n,b):(m=t,t=e,e=m,m=b,b=r,r=m,a=!a,b>=.3?a?(l=-(i?1:Yr(e,t)),a=!1,l=-Ie(e,t,r,l,i,n,b)):l=Ie(e,t,r,0,i,n,b):e>=15?a?(l=-(i?1:Yr(e,t)),a=!1,l=-ht(e,t,r,b,l,1,i)):l=ht(e,t,r,b,0,1,i):(i?f=1:f=Ov(e+t,e,20),l=oa(e,t,r,b,20,i,n),a?(l-=i?1:Yr(e,t),a=!1,l=-ht(e+20,t,r,b,l,f,i)):l=ht(e+20,t,r,b,l,f,i)))):(e<t?v=e-(e+t)*r:v=(e+t)*b-t,v<0&&(m=t,t=e,e=m,m=b,b=r,r=m,a=!a),t<40?Xn(e)===e&&Xn(t)===t&&e<M9r-100?(g=e-1,y=t+g,l=j9r(y,g,r,b),i||(l*=Yr(e,t))):t*r<=.7?a?(l=-(i?1:Yr(e,t)),a=!1,l=-Ie(e,t,r,l,i,n,b)):l=Ie(e,t,r,0,i,n,b):e>15?(y=Xn(t),y===t&&(y-=1),c=t-y,i?f=1:f=Ov(e+c,c,y),l=oa(c,e,b,r,y,i),l=ht(e,c,r,b,l,1,i),l/=f):i?(y=Xn(t),c=t-y,c<=0&&(y-=1,c+=1),l=oa(c,e,b,r,y,i),l+=oa(e,c,r,b,20,i),a&&(l-=1),l=ht(e+20,c,r,b,l,1,i),a&&(l=-l,a=!1)):l=yR(e,t,r,b,i,n):l=yR(e,t,r,b,i,n)),n[q]<0&&(n[q]=C9r(e,t,r,b,!0)),p=b*r,n[q]!==0&&(zn*p<n[q]?n[q]=zn/2:n[q]/=p),n[h]=a?(i?1:Yr(e,t))-l:l,n))}bR.exports=k9r});var _R=s((Dkr,dR)=>{"use strict";var G9r=Sv();function U9r(r,e,t,i,a){return G9r(r,e,t,i,a,[0,0],1,0)}dR.exports=U9r});var Iv=s((Hkr,TR)=>{"use strict";var D9r=O(),ER=_R(),H9r=Sv();D9r(ER,"assign",H9r);TR.exports=ER});var OR=s((Wkr,AR)=>{"use strict";var W9r=Iv().assign;function Y9r(r,e,t,i,a){var n=[0,0];return i=i!==!1,a=a===!0,W9r(r,e,t,i,a,n,1,0),n[0]}AR.exports=Y9r});var si=s((Ykr,SR)=>{"use strict";var K9r=OR();SR.exports=K9r});var LR=s((Kkr,FR)=>{"use strict";var IR=si(),NR=F(),Q9r=ir();function Z9r(r,e){var t,i,a;return NR(r)||NR(e)||e<=0?NaN:r===0?.5:(t=Q9r(r,2),e>2*t?(a=t/(e+t),i=IR(a,.5,e/2,!0,!0)/2):(a=e/(e+t),i=IR(a,e/2,.5,!0,!1)/2),r>0?1-i:i)}FR.exports=Z9r});var VR=s((Qkr,MR)=>{"use strict";var J9r=Ee(),PR=si(),RR=F(),$9r=ir();function X9r(r){if(RR(r)||r<=0)return J9r(NaN);return e;function e(t){var i,a,n;return RR(t)?NaN:t===0?.5:(i=$9r(t,2),r>2*i?(n=i/(r+i),a=PR(n,.5,r/2,!0,!0)/2):(n=r/(r+i),a=PR(n,r/2,.5,!0,!1)/2),t>0?1-a:a)}}MR.exports=X9r});var xn=s((Zkr,jR)=>{"use strict";var z9r=O(),CR=LR(),x9r=VR();z9r(CR,"factory",x9r);jR.exports=CR});var kR=s((Jkr,BR)=>{"use strict";function rhr(r){var e,t,i;return r===0?-.0005087819496582806:(r<0?e=-r:e=r,e<=1?(t=-.0005087819496582806+r*(-.008368748197417368+r*(.03348066254097446+r*(-.012692614766297404+r*(-.03656379714117627+r*(.02198786811111689+r*(.008226878746769157+r*(-.005387729650712429+r*(0+r*0)))))))),i=1+r*(-.9700050433032906+r*(-1.5657455823417585+r*(1.5622155839842302+r*(.662328840472003+r*(-.7122890234154284+r*(-.05273963823400997+r*(.07952836873415717+r*(-.0023339375937419+r*.0008862163904564247))))))))):(r=1/r,t=0+r*(0+r*(-.005387729650712429+r*(.008226878746769157+r*(.02198786811111689+r*(-.03656379714117627+r*(-.012692614766297404+r*(.03348066254097446+r*(-.008368748197417368+r*-.0005087819496582806)))))))),i=.0008862163904564247+r*(-.0023339375937419+r*(.07952836873415717+r*(-.05273963823400997+r*(-.7122890234154284+r*(.662328840472003+r*(1.5622155839842302+r*(-1.5657455823417585+r*(-.9700050433032906+r*1))))))))),t/i)}BR.exports=rhr});var UR=s(($kr,GR)=>{"use strict";function ehr(r){var e,t,i;return r===0?-.20243350835593876:(r<0?e=-r:e=r,e<=1?(t=-.20243350835593876+r*(.10526468069939171+r*(8.3705032834312+r*(17.644729840837403+r*(-18.851064805871424+r*(-44.6382324441787+r*(17.445385985570866+r*(21.12946554483405+r*-3.6719225470772936))))))),i=1+r*(6.242641248542475+r*(3.971343795334387+r*(-28.66081804998+r*(-20.14326346804852+r*(48.560921310873994+r*(10.826866735546016+r*(-22.643693341313973+r*1.7211476576120028)))))))):(r=1/r,t=-3.6719225470772936+r*(21.12946554483405+r*(17.445385985570866+r*(-44.6382324441787+r*(-18.851064805871424+r*(17.644729840837403+r*(8.3705032834312+r*(.10526468069939171+r*-.20243350835593876))))))),i=1.7211476576120028+r*(-22.643693341313973+r*(10.826866735546016+r*(48.560921310873994+r*(-20.14326346804852+r*(-28.66081804998+r*(3.971343795334387+r*(6.242641248542475+r*1)))))))),t/i)}GR.exports=ehr});var HR=s((Xkr,DR)=>{"use strict";function thr(r){var e,t,i;return r===0?-.1311027816799519:(r<0?e=-r:e=r,e<=1?(t=-.1311027816799519+r*(-.16379404719331705+r*(.11703015634199525+r*(.38707973897260434+r*(.3377855389120359+r*(.14286953440815717+r*(.029015791000532906+r*(.0021455899538880526+r*(-6794655751811263e-22+r*(28522533178221704e-24+r*-681149956853777e-24))))))))),i=1+r*(3.4662540724256723+r*(5.381683457070069+r*(4.778465929458438+r*(2.5930192162362027+r*(.848854343457902+r*(.15226433829533179+r*(.011059242293464892+r*(0+r*(0+r*0)))))))))):(r=1/r,t=-681149956853777e-24+r*(28522533178221704e-24+r*(-6794655751811263e-22+r*(.0021455899538880526+r*(.029015791000532906+r*(.14286953440815717+r*(.3377855389120359+r*(.38707973897260434+r*(.11703015634199525+r*(-.16379404719331705+r*-.1311027816799519))))))))),i=0+r*(0+r*(0+r*(.011059242293464892+r*(.15226433829533179+r*(.848854343457902+r*(2.5930192162362027+r*(4.778465929458438+r*(5.381683457070069+r*(3.4662540724256723+r*1)))))))))),t/i)}DR.exports=thr});var YR=s((zkr,WR)=>{"use strict";function ihr(r){var e,t,i;return r===0?-.0350353787183178:(r<0?e=-r:e=r,e<=1?(t=-.0350353787183178+r*(-.0022242652921344794+r*(.018557330651423107+r*(.009508047013259196+r*(.0018712349281955923+r*(.00015754461742496055+r*(460469890584318e-20+r*(-2304047769118826e-25+r*26633922742578204e-28))))))),i=1+r*(1.3653349817554064+r*(.7620591645536234+r*(.22009110576413124+r*(.03415891436709477+r*(.00263861676657016+r*(7646752923027944e-20+r*(0+r*0)))))))):(r=1/r,t=26633922742578204e-28+r*(-2304047769118826e-25+r*(460469890584318e-20+r*(.00015754461742496055+r*(.0018712349281955923+r*(.009508047013259196+r*(.018557330651423107+r*(-.0022242652921344794+r*-.0350353787183178))))))),i=0+r*(0+r*(7646752923027944e-20+r*(.00263861676657016+r*(.03415891436709477+r*(.22009110576413124+r*(.7620591645536234+r*(1.3653349817554064+r*1)))))))),t/i)}WR.exports=ihr});var QR=s((xkr,KR)=>{"use strict";function ahr(r){var e,t,i;return r===0?-.016743100507663373:(r<0?e=-r:e=r,e<=1?(t=-.016743100507663373+r*(-.0011295143874558028+r*(.001056288621524929+r*(.00020938631748758808+r*(14962478375834237e-21+r*(44969678992770644e-23+r*(4625961635228786e-24+r*(-2811287356288318e-29+r*9905570997331033e-32))))))),i=1+r*(.5914293448864175+r*(.1381518657490833+r*(.016074608709367652+r*(.0009640118070051656+r*(27533547476472603e-21+r*(282243172016108e-21+r*(0+r*0)))))))):(r=1/r,t=9905570997331033e-32+r*(-2811287356288318e-29+r*(4625961635228786e-24+r*(44969678992770644e-23+r*(14962478375834237e-21+r*(.00020938631748758808+r*(.001056288621524929+r*(-.0011295143874558028+r*-.016743100507663373))))))),i=0+r*(0+r*(282243172016108e-21+r*(27533547476472603e-21+r*(.0009640118070051656+r*(.016074608709367652+r*(.1381518657490833+r*(.5914293448864175+r*1)))))))),t/i)}KR.exports=ahr});var XR=s((rGr,$R)=>{"use strict";var nhr=F(),ZR=G(),JR=$(),uhr=Q(),shr=or(),ohr=kR(),vhr=UR(),fhr=HR(),lhr=YR(),chr=QR(),phr=.08913147449493408,mhr=2.249481201171875,hhr=.807220458984375,ghr=.9399557113647461,qhr=.9836282730102539;function yhr(r){var e,t,i,a,n;return nhr(r)?NaN:r===0?uhr:r===2?shr:r===1?0:r>2||r<0?NaN:(r>1?(e=-1,i=2-r):(e=1,i=r),r=1-i,r<=.5?(a=r*(r+10),n=ohr(r),e*(a*phr+a*n)):i>=.25?(a=ZR(-2*JR(i)),i-=.25,n=vhr(i),e*(a/(mhr+n))):(i=ZR(-JR(i)),i<3?(t=i-1.125,n=fhr(t),e*(hhr*i+n*i)):i<6?(t=i-3,n=lhr(t),e*(ghr*i+n*i)):(t=i-6,n=chr(t),e*(qhr*i+n*i))))}$R.exports=yhr});var oi=s((eGr,zR)=>{"use strict";var whr=XR();zR.exports=whr});var tM=s((tGr,eM)=>{"use strict";var bhr=F(),xR=Dn(),dhr=G(),rM=vv(),_hr=6123233995736766e-32;function Ehr(r){var e;return bhr(r)?NaN:r<-1||r>1?NaN:r>.5?2*xR(dhr(.5-.5*r)):(e=rM-xR(r),e+=_hr,e+=rM,e)}eM.exports=Ehr});var aM=s((iGr,iM)=>{"use strict";var Thr=tM();iM.exports=Thr});var r0=s((aGr,nM)=>{"use strict";var Ahr=1.4142135623730951;nM.exports=Ahr});var sM=s((nGr,uM)=>{"use strict";function Ohr(r){return r===0?.16666666666666666:.16666666666666666+r*.16666666666666666}uM.exports=Ohr});var vM=s((uGr,oM)=>{"use strict";function Shr(r){return r===0?.058333333333333334:.058333333333333334+r*(.06666666666666667+r*.008333333333333333)}oM.exports=Shr});var lM=s((sGr,fM)=>{"use strict";function Ihr(r){return r===0?.0251984126984127:.0251984126984127+r*(.026785714285714284+r*(.0017857142857142857+r*.0001984126984126984))}fM.exports=Ihr});var pM=s((oGr,cM)=>{"use strict";function Nhr(r){return r===0?.012039792768959435:.012039792768959435+r*(.010559964726631394+r*(-.0011078042328042327+r*(.0003747795414462081+r*27557319223985893e-22)))}cM.exports=Nhr});var hM=s((vGr,mM)=>{"use strict";function Fhr(r){return r===0?.003837005972422639:.003837005972422639+r*(.00610392115600449+r*(-.0016095979637646305+r*(.0005945867404200738+r*(-6270542728876062e-20+r*2505210838544172e-23))))}mM.exports=Fhr});var qM=s((fGr,gM)=>{"use strict";function Lhr(r){return r===0?.0032177478835464946:.0032177478835464946+r*(.0010898206731540065+r*(-.0012579159844784845+r*(.0006908420797309686+r*(-.00016376804137220805+r*(154012654012654e-19+r*16059043836821613e-26)))))}gM.exports=Lhr});var wM=s((lGr,yM)=>{"use strict";function Phr(r){return r===0?.001743826229834001:.001743826229834001+r*(3353097688001788e-20+r*(-.0007624513544032393+r*(.0006451304695145635+r*(-.000249472580470431+r*(49255746366361444e-21+r*(-39851014346715405e-22+r*7647163731819816e-28))))))}yM.exports=Phr});var dM=s((cGr,bM)=>{"use strict";function Rhr(r){return r===0?.0009647274732138864:.0009647274732138864+r*(-.0003110108632631878+r*(-.00036307660358786886+r*(.0005140660578834113+r*(-.00029133414466938067+r*(9086710793521991e-20+r*(-15303004486655377e-21+r*(10914179173496788e-22+r*28114572543455206e-31)))))))}bM.exports=Rhr});var EM=s((pGr,_M)=>{"use strict";function Mhr(r){return r===0?.0005422926281312969:.0005422926281312969+r*(-.0003694266780000966+r*(-.00010230378073700413+r*(.00035764655430568635+r*(-.00028690924218514614+r*(.00012645437628698076+r*(-33202652391372056e-21+r*(4890304529197534e-21+r*(-3123956959982987e-22+r*822063524662433e-32))))))))}_M.exports=Mhr});var AM=s((mGr,TM)=>{"use strict";var Vhr=Wn(),Chr=He(),jhr=G(),Bhr=Ge(),khr=sM(),Ghr=vM(),Uhr=lM(),Dhr=pM(),Hhr=hM(),Whr=qM(),Yhr=wM(),Khr=dM(),Qhr=EM(),Zhr=0,Ne=[1,0,0,0,0,0,0,0,0,0];function Jhr(r,e){var t,i;return i=Vhr(r/2,.5)*jhr(r*Bhr)*(e-.5),t=1/r,Ne[1]=khr(t),Ne[2]=Ghr(t),Ne[3]=Uhr(t),Ne[4]=Dhr(t),Ne[5]=Hhr(t),Ne[6]=Whr(t),Ne[7]=Yhr(t),Ne[8]=Khr(t),Ne[9]=Qhr(t),Zhr+i*Chr(Ne,i*i)}TM.exports=Jhr});var IM=s((hGr,SM)=>{"use strict";var $hr=Wn(),Xhr=He(),OM=G(),zhr=ir(),xhr=Ge(),gt=[0,0,0,0,0,0,0];function rgr(r,e){var t,i,a,n,u,o,v,f;return f=$hr(r/2,.5)*OM(r*xhr)*e,n=r+2,u=r+4,o=r+6,gt[0]=1,gt[1]=-(r+1)/(2*n),n*=r+2,gt[2]=-r*(r+1)*(r+3)/(8*n*u),n*=r+2,gt[3]=-r*(r+1)*(r+5)*((3*r+7)*r-2)/(48*n*u*o),n*=r+2,u*=r+4,gt[4]=-r*(r+1)*(r+7)*(((((15*r+154)*r+465)*r+286)*r-336)*r+64)/(384*n*u*o*(r+8)),n*=r+2,gt[5]=-r*(r+1)*(r+3)*(r+9)*((((((35*r+452)*r+1573)*r+600)*r-2020)*r+928)*r-128)/(1280*n*u*o*(r+8)*(r+10)),n*=r+2,u*=r+4,o*=r+6,gt[6]=-r*(r+1)*(r+11)*(((((((((((945*r+31506)*r+425858)*r+2980236)*r+11266745)*r+20675018)*r+7747124)*r-22574632)*r-8565600)*r+18108416)*r-7099392)*r+884736)/(46080*n*u*o*(r+8)*(r+10)*(r+12)),v=OM(r),a=zhr(v*f,1/r),i=a*a,t=Xhr(gt,i),t*=v,t/=a,-t}SM.exports=rgr});var RM=s((gGr,PM)=>{"use strict";var NM=oi(),egr=Ft(),FM=G(),tgr=ir(),igr=Hn(),LM=r0();function agr(r,e){var t,i,a,n,u,o,v;return r>1e20?-NM(2*e)*LM:(t=1/(r-.5),i=48/(t*t),a=((20700*t/i-98)*t-16)*t+96.36,n=((94.5/(i+a)-3)/i+1)*FM(t*igr)*r,v=tgr(n*2*e,2/r),v>.05+t?(o=-NM(2*e)*LM,v=o*o,r<5&&(a+=.3*(r-4.5)*(o+.6)),a+=(((.05*n*o-5)*o-7)*o-2)*o+i,v=(((((.4*v+6.3)*v+36)*v+94.5)/a-v-3)/i+1)*o,v=egr(t*v*v)):v=((1/(((r+6)/(r*v)-.089*n-.822)*(r+2)*3)+.5/(r+4))*v-1)*(r+1)/(r+2)+1/v,u=FM(r*v),-u)}PM.exports=agr});var HM=s((qGr,DM)=>{"use strict";var MM=oi(),VM=tr(),Nv=Ot(),CM=Yt(),ngr=aM(),e0=G(),ugr=k(),jM=bn(),sgr=ir(),ogr=Kt(),BM=r0(),kM=Ge(),GM=AM(),t0=IM(),Fv=RM(),UM=268435456,vgr=1/3,fgr=106/3,lgr=.8549879733383485;function cgr(r,e,t){var i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w;if(o=0,e>t?(f=t,t=e,e=f,u=!0):u=!1,VM(r)===r&&r<20)switch(a=Nv(1,fgr),VM(r)){case 1:e===.5?o=0:o=-jM(kM*e)/ogr(kM*e);break;case 2:o=(2*e-1)/e0(2*e*t);break;case 4:v=4*e*t,n=e0(v),q=4*jM(ngr(n)/3)/n,g=e0(q-4),o=e-.5<0?-g:g;break;case 6:if(e<1e-150)return(u?-1:1)*Fv(r,e);y=4*(e-e*e),w=sgr(y,vgr),h=6*(1+lgr*(1/w-1));do c=h*h,p=c*c,m=h*p,l=h,h=2*(8*y*m-270*c+2187)/(5*(4*y*p-216*h-243));while(ugr((h-l)/h)>a);h=e0(h-r),o=e-.5<0?-h:h;break;default:r>UM?o=MM(2*e)*BM:r<3?(i=.2742-r*.0242143,e>i?o=GM(r,e):o=t0(r,e)):(i=Nv(1,CM(r/-.654)),e>i?o=Fv(r,e):o=t0(r,e))}else r>UM?o=-MM(2*e)*BM:r<3?(i=.2742-r*.0242143,e>i?o=GM(r,e):o=t0(r,e)):(i=Nv(1,CM(r/-.654)),e>i?o=Fv(r,e):o=t0(r,e));return u?-o:o}DM.exports=cgr});var YM=s((yGr,WM)=>{"use strict";var pgr=HM();function mgr(r,e,t){var i,a,n,u;return a=e/2,n=1-a,i=r*2,u=pgr(i,a,n),t&&(t.value=u*u/(i+u*u)),i/(i+u*u)}WM.exports=mgr});var ZM=s((wGr,QM)=>{"use strict";var i0=He(),hgr=oi(),KM=G(),ggr=x(),Ye=r0(),ar=[0,0,0,0,0,0,0],va=[0,0,0,0];function qgr(r,e,t){var i,a,n,u,o,v,f;return i=hgr(2*t),i/=-KM(r/2),va[0]=i,v=e-r,u=v*v,o=u*v,ar[0]=-v*Ye/2,ar[1]=(1-2*v)/8,ar[2]=-(v*Ye/48),ar[3]=-1/192,ar[4]=-v*Ye/3840,ar[5]=0,ar[6]=0,va[1]=i0(ar,i),ar[0]=v*Ye*(3*v-2)/12,ar[1]=(20*u-12*v+1)/128,ar[2]=v*Ye*(20*v-1)/960,ar[3]=(16*u+30*v-15)/4608,ar[4]=v*Ye*(21*v+32)/53760,ar[5]=(-(32*u)+63)/368640,ar[6]=-v*Ye*(120*v+17)/25804480,va[2]=i0(ar,i),ar[0]=v*Ye*(-75*u+80*v-16)/480,ar[1]=(-1080*o+868*u-90*v-45)/9216,ar[2]=v*Ye*(-1190*u+84*v+373)/53760,ar[3]=(-2240*o-2508*u+2100*v-165)/368640,ar[4]=0,ar[5]=0,ar[6]=0,va[3]=i0(ar,i),n=i0(va,1/r),a=n*n,f=-ggr(-a/2),a===0?.5:(1+n*KM((1+f)/a))/2}QM.exports=qgr});var Lv=s((bGr,$M)=>{"use strict";var JM=$(),ygr=vt(),a0=ygr/4;function wgr(r,e){return t;function t(i){var a,n,u;return u=1-i,u===0?[-a0,-a0]:i===0?[-a0,-a0]:(n=JM(i)+e*JM(u)+r,a=1/i-e/u,[n,a])}}$M.exports=wgr});var Rv=s((dGr,zM)=>{"use strict";var XM=ii(),n0=k(),bgr=Ot(),Pv=vt();function dgr(r,e,t,i,a,n){var u,o,v,f,l,c,p,m,h,q;h=0,u=0,l=e,f=bgr(1,1-a),p=Pv,o=Pv,v=Pv,c=n;do{if(u=h,v=o,o=p,m=r(l),h=m[0],q=m[1],c-=1,h===0)break;if(q===0?(u===0&&(l===t?e=i:e=t,u=r(e),p=e-l),XM(u)*XM(h)<0?p<0?p=(l-t)/2:p=(l-i)/2:p<0?p=(l-i)/2:p=(l-t)/2):p=h/q,n0(p*2)>n0(v)&&(p=p>0?(l-t)/2:(l-i)/2),e=l,l-=p,l<=t){if(p=.5*(e-t),l=e-p,l===t||l===i)break}else if(l>=i&&(p=.5*(e-i),l=e-p,l===t||l===i))break;p>0?i=e:t=e}while(c&&n0(l*f)<n0(p));return l}zM.exports=dgr});var rV=s((_Gr,xM)=>{"use strict";function _gr(r){return r===0?-1:-1+r*(-5+r*5)}xM.exports=_gr});var tV=s((EGr,eV)=>{"use strict";function Egr(r){return r===0?1:1+r*(21+r*(-69+r*46))}eV.exports=Egr});var aV=s((TGr,iV)=>{"use strict";function Tgr(r){return r===0?7:7+r*(-2+r*(33+r*(-62+r*31)))}iV.exports=Tgr});var uV=s((AGr,nV)=>{"use strict";function Agr(r){return r===0?25:25+r*(-52+r*(-17+r*(88+r*(-115+r*46))))}nV.exports=Agr});var oV=s((OGr,sV)=>{"use strict";function Ogr(r){return r===0?7:7+r*(12+r*(-78+r*52))}sV.exports=Ogr});var fV=s((SGr,vV)=>{"use strict";function Sgr(r){return r===0?-7:-7+r*(2+r*(183+r*(-370+r*185)))}vV.exports=Sgr});var cV=s((IGr,lV)=>{"use strict";function Igr(r){return r===0?-533:-533+r*(776+r*(-1835+r*(10240+r*(-13525+r*5410))))}lV.exports=Igr});var mV=s((NGr,pV)=>{"use strict";function Ngr(r){return r===0?-1579:-1579+r*(3747+r*(-3372+r*(-15821+r*(45588+r*(-45213+r*15071)))))}pV.exports=Ngr});var gV=s((FGr,hV)=>{"use strict";function Fgr(r){return r===0?449:449+r*(-1259+r*(-769+r*(6686+r*(-9260+r*3704))))}hV.exports=Fgr});var yV=s((LGr,qV)=>{"use strict";function Lgr(r){return r===0?63149:63149+r*(-151557+r*(140052+r*(-727469+r*(2239932+r*(-2251437+r*750479)))))}qV.exports=Lgr});var bV=s((PGr,wV)=>{"use strict";function Pgr(r){return r===0?29233:29233+r*(-78755+r*(105222+r*(146879+r*(-1602610+r*(3195183+r*(-2554139+r*729754))))))}wV.exports=Pgr});var _V=s((RGr,dV)=>{"use strict";function Rgr(r){return r===0?1:1+r*(-13+r*13)}dV.exports=Rgr});var TV=s((MGr,EV)=>{"use strict";function Mgr(r){return r===0?1:1+r*(21+r*(-69+r*46))}EV.exports=Mgr});var SV=s((VGr,OV)=>{"use strict";var vi=He(),Vgr=oi(),Cgr=k(),jgr=x(),AV=$(),Bgr=G(),kgr=Kt(),Ggr=bn(),Ugr=Lv(),Dgr=Rv(),Hgr=rV(),Wgr=tV(),Ygr=aV(),Kgr=uV(),Qgr=oV(),Zgr=fV(),Jgr=cV(),$gr=mV(),Xgr=gV(),zgr=yV(),xgr=bV(),rqr=_V(),eqr=TV(),D=[0,0,0,0,0,0],fa=[0,0,0,0];function tqr(r,e,t){var i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E;return o=Vgr(2*r)/-Bgr(e/2),T=kgr(t),b=Ggr(t),fa[0]=o,y=T*T,w=b*b,q=T*b,h=q*q,m=h*q,p=h*h,c=h*m,l=m*m,f=p*m,D[0]=(2*y-1)/(3*q),D[1]=-Hgr(y)/(36*h),D[2]=Wgr(y)/(1620*m),D[3]=Ygr(y)/(6480*p),D[4]=Kgr(y)/(90720*c),D[5]=0,fa[1]=vi(D,o),D[0]=-Qgr(y)/(405*m),D[1]=Zgr(y)/(2592*p),D[2]=-Jgr(y)/(204120*c),D[3]=-$gr(y)/(2099520*l),D[4]=0,D[5]=0,fa[2]=vi(D,o),D[0]=Xgr(y)/(102060*c),D[1]=-zgr(y)/(20995200*l),D[2]=xgr(y)/(36741600*f),D[3]=0,D[4]=0,D[5]=0,fa[3]=vi(D,o),v=vi(fa,1/e),n=b/T,n*=n,g=-(v*v)/(2*y)+AV(y)+w*AV(w)/y,Cgr(v)<.7?(D[0]=y,D[1]=q,D[2]=(1-2*y)/3,D[3]=rqr(y)/(36*q),D[4]=eqr(y)/(270*h),D[5]=0,E=vi(D,v)):(_=jgr(g),D[0]=_,D[1]=n,D[2]=0,D[3]=3*n*(3*n+1)/6,D[4]=4*n*(4*n+1)*(4*n+2)/24,D[5]=5*n*(5*n+1)*(5*n+2)*(5*n+3)/120,E=vi(D,_),(E-y)*v<0&&(E=1-E)),v<0?(a=0,i=y):(a=y,i=1),(E<a||E>i)&&(E=(a+i)/2),u=Ugr(-g,n),E=Dgr(u,E,a,i,32,100),E}OV.exports=tqr});var NV=s((CGr,IV)=>{var la=1e3,ca=la*60,pa=ca*60,ma=pa*24,iqr=ma*365.25;IV.exports=function(r,e){e=e||{};var t=typeof r;if(t==="string"&&r.length>0)return aqr(r);if(t==="number"&&isNaN(r)===!1)return e.long?uqr(r):nqr(r);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(r))};function aqr(r){if(r=String(r),!(r.length>100)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(r);if(e){var t=parseFloat(e[1]),i=(e[2]||"ms").toLowerCase();switch(i){case"years":case"year":case"yrs":case"yr":case"y":return t*iqr;case"days":case"day":case"d":return t*ma;case"hours":case"hour":case"hrs":case"hr":case"h":return t*pa;case"minutes":case"minute":case"mins":case"min":case"m":return t*ca;case"seconds":case"second":case"secs":case"sec":case"s":return t*la;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return t;default:return}}}}function nqr(r){return r>=ma?Math.round(r/ma)+"d":r>=pa?Math.round(r/pa)+"h":r>=ca?Math.round(r/ca)+"m":r>=la?Math.round(r/la)+"s":r+"ms"}function uqr(r){return u0(r,ma,"day")||u0(r,pa,"hour")||u0(r,ca,"minute")||u0(r,la,"second")||r+" ms"}function u0(r,e,t){if(!(r<e))return r<e*1.5?Math.floor(r/e)+" "+t:Math.ceil(r/e)+" "+t+"s"}});var LV=s((Z,FV)=>{Z=FV.exports=Vv.debug=Vv.default=Vv;Z.coerce=lqr;Z.disable=vqr;Z.enable=oqr;Z.enabled=fqr;Z.humanize=NV();Z.names=[];Z.skips=[];Z.formatters={};var Mv;function sqr(r){var e=0,t;for(t in r)e=(e<<5)-e+r.charCodeAt(t),e|=0;return Z.colors[Math.abs(e)%Z.colors.length]}function Vv(r){function e(){if(e.enabled){var t=e,i=+new Date,a=i-(Mv||i);t.diff=a,t.prev=Mv,t.curr=i,Mv=i;for(var n=new Array(arguments.length),u=0;u<n.length;u++)n[u]=arguments[u];n[0]=Z.coerce(n[0]),typeof n[0]!="string"&&n.unshift("%O");var o=0;n[0]=n[0].replace(/%([a-zA-Z%])/g,function(f,l){if(f==="%%")return f;o++;var c=Z.formatters[l];if(typeof c=="function"){var p=n[o];f=c.call(t,p),n.splice(o,1),o--}return f}),Z.formatArgs.call(t,n);var v=e.log||Z.log||console.log.bind(console);v.apply(t,n)}}return e.namespace=r,e.enabled=Z.enabled(r),e.useColors=Z.useColors(),e.color=sqr(r),typeof Z.init=="function"&&Z.init(e),e}function oqr(r){Z.save(r),Z.names=[],Z.skips=[];for(var e=(typeof r=="string"?r:"").split(/[\s,]+/),t=e.length,i=0;i<t;i++)e[i]&&(r=e[i].replace(/\*/g,".*?"),r[0]==="-"?Z.skips.push(new RegExp("^"+r.substr(1)+"$")):Z.names.push(new RegExp("^"+r+"$")))}function vqr(){Z.enable("")}function fqr(r){var e,t;for(e=0,t=Z.skips.length;e<t;e++)if(Z.skips[e].test(r))return!1;for(e=0,t=Z.names.length;e<t;e++)if(Z.names[e].test(r))return!0;return!1}function lqr(r){return r instanceof Error?r.stack||r.message:r}});var Cv=s((Ar,RV)=>{Ar=RV.exports=LV();Ar.log=mqr;Ar.formatArgs=pqr;Ar.save=hqr;Ar.load=PV;Ar.useColors=cqr;Ar.storage=typeof chrome<"u"&&typeof chrome.storage<"u"?chrome.storage.local:gqr();Ar.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function cqr(){return typeof window<"u"&&window.process&&window.process.type==="renderer"?!0:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}Ar.formatters.j=function(r){try{return JSON.stringify(r)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}};function pqr(r){var e=this.useColors;if(r[0]=(e?"%c":"")+this.namespace+(e?" %c":" ")+r[0]+(e?"%c ":" ")+"+"+Ar.humanize(this.diff),!!e){var t="color: "+this.color;r.splice(1,0,t,"color: inherit");var i=0,a=0;r[0].replace(/%[a-zA-Z%]/g,function(n){n!=="%%"&&(i++,n==="%c"&&(a=i))}),r.splice(a,0,t)}}function mqr(){return typeof console=="object"&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function hqr(r){try{r==null?Ar.storage.removeItem("debug"):Ar.storage.debug=r}catch{}}function PV(){var r;try{r=Ar.storage.debug}catch{}return!r&&typeof process<"u"&&"env"in process&&(r=process.env.DEBUG),r}Ar.enable(PV());function gqr(){try{return window.localStorage}catch{}}});var ha=s((jGr,MV)=>{"use strict";var qqr=34028234663852886e22;MV.exports=qqr});var kV=s((BGr,BV)=>{"use strict";var yqr=Cv(),VV=ra(),wqr=k(),bqr=x(),CV=$(),dqr=ha(),jV=yqr("gammaincinv:higher_newton");function _qr(r,e,t,i,a,n,u,o){var v,f,l,c,p,m,h,q,g,y,w,b,T,_;_=r,w=1,b=1,m=e*e,f=r;do{if(_=r,h=_*_,t===0){if(v=(1-e)*CV(_)+_+n,v>CV(dqr))return jV("Warning: overflow problems in one or more steps of the computation. The initial approximation to the root is returned."),f;T=bqr(v)}else T=-u*_;o?(q=VV(_,e,!0,!1),l=-T*(q-i)):(g=VV(_,e,!0,!0),l=T*(g-a)),T=l,i>1e-120||b>1?(c=.5*(_-e+1)/_,p=(2*h-4*_*e+4*_+2*m-3*e+1)/h,p/=6,r=_+T*(1+T*(c+T*p))):r=_+T,w=wqr(_/r-1),b+=1,_=r,_<0&&(_=f,b=100)}while(w>2e-14&&b<35);return(w>2e-14||b>99)&&jV("Warning: the number of iterations in the Newton method reached the upper limit N=35. The last value obtained for the root is given as output."),y=_||0,y}BV.exports=_qr});var UV=s((kGr,GV)=>{"use strict";function Eqr(r){return r===0?0:0+r*(1+r*(1+r*(1.5+r*(2.6666666666666665+r*(5.208333333333333+r*10.8)))))}GV.exports=Eqr});var HV=s((GGr,DV)=>{"use strict";function Tqr(r){return r===0?1:1+r*(1+r*(.3333333333333333+r*(.027777777777777776+r*(-.003703703703703704+r*(.0002314814814814815+r*5878894767783657e-20)))))}DV.exports=Tqr});var jv=s((UGr,YV)=>{"use strict";var Aqr=k(),Oqr=x(),WV=$(),Sqr=He(),Iqr=UV(),Nqr=HV(),Fqr=1e-8,Lqr=.08333333333333333,Pqr=.008333333333333333,fi=[1,0,0,0,0,0];function Rqr(r){var e,t,i,a,n,u,o,v,f;if(f=r*r*.5,r===0?n=0:r<-1?(v=Oqr(-1-f),n=Iqr(v)):r<1?(v=r,n=Nqr(v)):(v=11+f,u=WV(v),n=v+u,v=1/v,e=u*u,t=e*u,i=t*u,a=i*u,fi[1]=(2-u)*.5,fi[2]=(-9*u+6+2*e)/6,fi[3]=-(3*t+36*u-22*e-12)*Lqr,fi[4]=(60+350*e-300*u-125*t+12*i)/60,fi[5]=-(-120-274*i+900*u-1700*e+1125*t+20*a)*Pqr,n+=u*v*Sqr(fi,v)),v=1,r>-3.5&&r<-.03||r>.03&&r<40){v=1,o=n;do n=o*(f+WV(o))/(o-1),v=Aqr(o/n-1),o=n;while(v>Fqr)}return n}YV.exports=Rqr});var QV=s((DGr,KV)=>{"use strict";var Mqr=.9189385332046728;KV.exports=Mqr});var JV=s((HGr,ZV)=>{"use strict";var Vqr=[1.9963790515900766,-.0017971032528832887,13129285796384672e-21,-2340875228178749e-22,72291210671127e-22,-3280997607821e-22,19875070901e-21,-1509214183e-21,1375340084e-22,-145728923e-22,17532367e-22,-2351465e-22,346551e-22,-55471e-22,9548e-22,-1748e-22,332e-22,-58e-22];function Cqr(r,e){var t,i,a,n,u;i=0,a=0,t=e+e,u=r;do n=a,a=i,i=t*a-n+Vqr[u],u-=1;while(u>=0);return(i-n)/2}ZV.exports=Cqr});var XV=s((WGr,$V)=>{"use strict";function jqr(r){return r===0?.025721014990011306:.025721014990011306+r*(.08247596616699963+r*(-.0025328157302663564+r*(.0006099292666946337+r*(-.00033543297638406+r*.000250505279903))))}$V.exports=jqr});var xV=s((YGr,zV)=>{"use strict";function Bqr(r){return r===0?.08333333333333333:.08333333333333333+r*(-.002777777777777778+r*(.0007936507936507937+r*-.0005952380952380953))}zV.exports=Bqr});var eC=s((KGr,rC)=>{"use strict";var Bv=Zt(),s0=$(),kv=QV(),kqr=zi(),Gqr=ha(),Uqr=JV(),Dqr=XV(),Hqr=xV(),Wqr=.30865217988013566;function Yqr(r){var e;return r<kqr?Gqr:r<1?Bv(r+1)-(r+.5)*s0(r)+r-kv:r<2?Bv(r)-(r-.5)*s0(r)+r-kv:r<3?Bv(r-1)-(r-.5)*s0(r)+r-kv+s0(r-1):r<12?(e=18/(r*r)-1,Uqr(17,e)/(12*r)):(e=1/(r*r),r<1e3?Dqr(e)/(Wqr+e)/r:Hqr(e)/r)}rC.exports=Yqr});var aC=s((QGr,iC)=>{"use strict";var tC=x(),Kqr=be(),Qqr=$(),Zqr=ha(),Jqr=Yi(),$qr=eC();function Xqr(r){return r>=3?tC($qr(r)):r>0?Kqr(r)/(tC(-r+(r-.5)*Qqr(r))*Jqr):Zqr}iC.exports=Xqr});var uC=s((ZGr,nC)=>{"use strict";function zqr(r){var e,t,i;return r===0?-.3333333333438:(r<0?e=-r:e=r,e<=1?(t=-.3333333333438+r*(-.2070740359969+r*(-.05041806657154+r*(-.004923635739372+r*-4293658292782e-17))),i=1+r*(.7045554412463+r*(.2118190062224+r*(.03048648397436+r*.001605037988091)))):(r=1/r,t=-4293658292782e-17+r*(-.004923635739372+r*(-.05041806657154+r*(-.2070740359969+r*-.3333333333438))),i=.001605037988091+r*(.03048648397436+r*(.2118190062224+r*(.7045554412463+r*1)))),t/i)}nC.exports=zqr});var oC=s((JGr,sC)=>{"use strict";var xqr=k(),ryr=$(),eyr=jv(),tyr=uC();function iyr(r){var e;return xqr(r)<1?tyr(r):(e=eyr(r),ryr(r/(e-1))/r)}sC.exports=iyr});var fC=s(($Gr,vC)=>{"use strict";function ayr(r){var e,t,i;return r===0?-.0172847633523:(r<0?e=-r:e=r,e<=1?(t=-.0172847633523+r*(-.0159372646475+r*(-.00464910887221+r*(-.00060683488776+r*-614830384279e-17))),i=1+r*(.764050615669+r*(.297143406325+r*(.0579490176079+r*.00574558524851)))):(r=1/r,t=-614830384279e-17+r*(-.00060683488776+r*(-.00464910887221+r*(-.0159372646475+r*-.0172847633523))),i=.00574558524851+r*(.0579490176079+r*(.297143406325+r*(.764050615669+r*1)))),t/i)}vC.exports=ayr});var cC=s((XGr,lC)=>{"use strict";function nyr(r){var e,t,i;return r===0?-.0172839517431:(r<0?e=-r:e=r,e<=1?(t=-.0172839517431+r*(-.0146362417966+r*(-.00357406772616+r*(-.000391032032692+r*249634036069e-17))),i=1+r*(.690560400696+r*(.249962384741+r*(.0443843438769+r*.00424073217211)))):(r=1/r,t=249634036069e-17+r*(-.000391032032692+r*(-.00357406772616+r*(-.0146362417966+r*-.0172839517431))),i=.00424073217211+r*(.0443843438769+r*(.249962384741+r*(.690560400696+r*1)))),t/i)}lC.exports=nyr});var mC=s((zGr,pC)=>{"use strict";function uyr(r){var e,t,i;return r===0?.99994466948:(r<0?e=-r:e=r,e<=1?(t=.99994466948+r*(104.649839762+r*(857.204033806+r*(731.901559577+r*45.5174411671))),i=1+r*(104.526456943+r*(823.313447808+r*(3119.93802124+r*3970.03311219)))):(r=1/r,t=45.5174411671+r*(731.901559577+r*(857.204033806+r*(104.649839762+r*.99994466948))),i=3970.03311219+r*(3119.93802124+r*(823.313447808+r*(104.526456943+r*1)))),t/i)}pC.exports=uyr});var gC=s((xGr,hC)=>{"use strict";var syr=$(),oyr=fC(),vyr=cC(),fyr=mC();function lyr(r){var e,t;return r<-5?(t=r*r,e=syr(-r),(12-t-6*(e*e))/(12*t*r)):r<-2?oyr(r):r<2?vyr(r):r<1e3?(t=1/r,fyr(r)/(-12*r)):-1/(12*r)}hC.exports=lyr});var yC=s((rUr,qC)=>{"use strict";function cyr(r){var e,t,i;return r===0?.0495346498136:(r<0?e=-r:e=r,e<=1?(t=.0495346498136+r*(.0299521337141+r*(.00688296911516+r*(.000512634846317+r*-201411722031e-16))),i=1+r*(.759803615283+r*(.261547111595+r*(.0464854522477+r*.00403751193496)))):(r=1/r,t=-201411722031e-16+r*(.000512634846317+r*(.00688296911516+r*(.0299521337141+r*.0495346498136))),i=.00403751193496+r*(.0464854522477+r*(.261547111595+r*(.759803615283+r*1)))),t/i)}qC.exports=cyr});var bC=s((eUr,wC)=>{"use strict";function pyr(r){var e,t,i;return r===0?.00452313583942:(r<0?e=-r:e=r,e<=1?(t=.00452313583942+r*(.00120744920113+r*(-789724156582e-16+r*(-504476066942e-16+r*-535770949796e-17))),i=1+r*(.912203410349+r*(.405368773071+r*(.0901638932349+r*.00948935714996)))):(r=1/r,t=-535770949796e-17+r*(-504476066942e-16+r*(-789724156582e-16+r*(.00120744920113+r*.00452313583942))),i=.00948935714996+r*(.0901638932349+r*(.405368773071+r*(.912203410349+r*1)))),t/i)}wC.exports=pyr});var _C=s((tUr,dC)=>{"use strict";function myr(r){var e,t,i;return r===0?.00439937562904:(r<0?e=-r:e=r,e<=1?(t=.00439937562904+r*(.000487225670639+r*(-.000128470657374+r*(529110969589e-17+r*15716677175e-17))),i=1+r*(.794435257415+r*(.333094721709+r*(.0703527806143+r*.00806110846078)))):(r=1/r,t=15716677175e-17+r*(529110969589e-17+r*(-.000128470657374+r*(.000487225670639+r*.00439937562904))),i=.00806110846078+r*(.0703527806143+r*(.333094721709+r*(.794435257415+r*1)))),t/i)}dC.exports=myr});var TC=s((iUr,EC)=>{"use strict";function hyr(r){var e,t,i;return r===0?-.0011481191232:(r<0?e=-r:e=r,e<=1?(t=-.0011481191232+r*(-.112850923276+r*(1.51623048511+r*(-.218472031183+r*.0730002451555))),i=1+r*(14.2482206905+r*(69.7360396285+r*(218.938950816+r*277.067027185)))):(r=1/r,t=.0730002451555+r*(-.218472031183+r*(1.51623048511+r*(-.112850923276+r*-.0011481191232))),i=277.067027185+r*(218.938950816+r*(69.7360396285+r*(14.2482206905+r*1)))),t/i)}EC.exports=hyr});var OC=s((aUr,AC)=>{"use strict";function gyr(r){var e,t,i;return r===0?-.000145727889667:(r<0?e=-r:e=r,e<=1?(t=-.000145727889667+r*(-.290806748131+r*(-13.308504545+r*(199.722374056+r*-11.4311378756))),i=1+r*(139.612587808+r*(2189.01116348+r*(7115.24019009+r*45574.6081453)))):(r=1/r,t=-11.4311378756+r*(199.722374056+r*(-13.308504545+r*(-.290806748131+r*-.000145727889667))),i=45574.6081453+r*(7115.24019009+r*(2189.01116348+r*(139.612587808+r*1)))),t/i)}AC.exports=gyr});var NC=s((nUr,IC)=>{"use strict";var SC=$(),qyr=yC(),yyr=bC(),wyr=_C(),byr=TC(),dyr=OC();function _yr(r){var e,t;return r<-8?(e=r*r,t=SC(-r)/r,(-30+r*t*(6*e*t*t-12+e))/(12*r*e*e)):r<-4?qyr(r)/(r*r):r<-2?yyr(r):r<2?wyr(r):r<10?(e=1/r,byr(e)/(r*r)):r<100?(e=1/r,dyr(e)/(r*r)):-SC(r)/(12*r*r*r)}IC.exports=_yr});var BC=s((uUr,jC)=>{"use strict";var Eyr=Cv(),FC=He(),fe=Zt(),Tyr=oi(),LC=be(),o0=G(),PC=k(),li=x(),Ayr=ue(),Oyr=ir(),Kr=$(),Syr=Yi(),Iyr=ha(),Nyr=_o(),Fyr=kV(),RC=jv(),MC=aC(),Lyr=oC(),Pyr=gC(),Ryr=NC(),Myr=Eyr("gammaincinv:compute"),qt=.5,Gv=.3333333333333333,Vyr=.25,VC=.2,CC=.16666666666666666,Cyr=.08333333333333333,jyr=.041666666666666664,Qr=[0,0,0,0,0];function Byr(r,e,t){var i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E,d,R,U,rr,er,J,Pr,Sr,A,Y,Mt,A0,O0,S0,Hf,_r,fr,I0,Er,Pe,$r,N0,F0,L0;if(e<qt?(u=!0,o=e,N0=-1):(u=!1,o=t,N0=1),Er=0,PC(r-1)<1e-4&&(Pe=0,u?e<.001?(A0=e*e,Sr=A0*e,Mt=Sr*e,E=Mt*e,_=E*e,d=e+A0*qt+Sr*Gv+Mt*Vyr+E*VC+_*CC):d=-Kr(1-e):d=-Kr(t),r===1?(Er=2,S0=d):(n=fe(r),Er=1)),t<1e-30&&r<qt&&(Pe=0,d=-Kr(t*LC(r))+(r-1)*Kr(-Kr(t*LC(r))),Er=1,n=fe(r)),r>1&&r<500&&e<1e-80){for(Pe=0,v=1/r,i=1/(r+1),d=(fe(r+1)+Kr(e))*v,d=li(d),g=d,I0=0;I0<10;I0++)d=g*li(d*v)*Oyr(1-d*i,v);Er=1,n=fe(r)}if(f=1/r*(Kr(e)+fe(r+1)),f<Kr(VC*(1+r))&&Er===0&&($r=li(f),Pe=0,R=r*r,O0=R*r,A=O0*r,y=r+1,m=y*y,p=y*m,c=m*m,w=r+2,l=w*w,b=r+3,Qr[0]=1,Qr[1]=1/y,Qr[2]=qt*(3*r+5)/(m*w),Qr[3]=Gv*(31+8*R+33*r)/(p*w*b),Qr[4]=jyr*(2888+1179*O0+125*A+3971*R+5661*r)/(c*l*b*(r+4)),d=$r*FC(Qr,$r),n=fe(r),Er=1),r<10&&Er===0&&(h=o0(r)/(MC(r)*Syr),q=Ayr(.02,h),t<q&&(Pe=0,_r=1-r,J=_r*_r,Pr=J*_r,T=o0(-2/r*Kr(t/h)),d=r*RC(T),fr=Kr(d),d>5?(U=fr*fr,rr=U*fr,er=rr*fr,$r=1/d,Qr[0]=fr-1,Qr[1]=(3*_r-2*_r*fr+U-2*fr+2)*qt,Qr[2]=(24*_r*fr-11*J-24*_r-6*U+12*fr-12-9*_r*U+6*J*fr+2*rr)*CC,Qr[3]=(-12*Pr*fr+8.04*_r*U-114*J*fr+(72+36*U)+(3*er-72*fr+162)*(_r-168*_r*fr)-(12*rr+25*Pr)-(22*_r*rr+36*J*U+120*J))*Cyr,Qr[4]=0,d=d-fr+_r*$r*FC(Qr,$r)):($r=1/d,U=fr*fr,Hf=fr-1,F0=fr-_r*$r*Hf,F0<d&&(d-=F0)),n=fe(r),Er=1)),PC(o-qt)<1e-5&&Er===0&&(Pe=0,v=1/r,d=r-Gv+(.019753086419753086+.007211444248481286*v)*v,n=fe(r),Er=1),r<1&&Er===0&&(Pe=0,u?d=li(1/r*(Kr(o)+fe(r+1))):d=li(1/r*(Kr(1-o)+fe(r+1))),n=fe(r),Er=1),Er===0)if(Pe=1,v=1/r,$r=Tyr(2*o),T=N0*$r/o0(r*qt),$r<Iyr)T+=(Lyr(T)+(Pyr(T)+Ryr(T)*v)*v)*v,d=r*RC(T),L0=T,Y=-o0(r/Nyr)*li(-qt*r*L0*L0)/MC(r),a=1/Y;else return Myr("Warning: Overflow problems in one or more steps of the computation."),NaN;return Er<2&&(S0=Fyr(d,r,Pe,e,t,n,a,u)),S0}jC.exports=Byr});var HC=s((sUr,DC)=>{"use strict";var kC=F(),kyr=zi(),GC=Q(),UC=BC();function Gyr(r,e,t){return kC(r)||kC(e)?NaN:e<kyr?NaN:r>1||r<0?NaN:t===!0?r===0?GC:r===1?0:UC(e,1-r,r):r===0?0:r===1?GC:UC(e,r,1-r)}DC.exports=Gyr});var YC=s((oUr,WC)=>{"use strict";var Uyr=HC();WC.exports=Uyr});var QC=s((vUr,KC)=>{"use strict";var Dyr=5e-324;KC.exports=Dyr});var XC=s((fUr,$C)=>{"use strict";var ZC=YC(),JC=$(),Hyr=G(),Wyr=QC(),Yyr=Lv(),Kyr=Rv();function Qyr(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E,d,R,U,rr,er,J,Pr,Sr,A,Y,Mt;return t<i?v=ZC(t,e,!0):v=ZC(i,e,!1),v/=r,y=e/r,A=Hyr(1+y),_=A*A,E=_*A,d=_*_,R=E*_,U=E*E,rr=d*E,er=d*d,J=R*d,l=R*R,Sr=v-y,w=Sr*Sr,b=w*Sr,T=w*w,Pr=A+1,c=Pr*Pr,p=Pr*c,m=c*c,h=(A+2)*(A-1)/(3*A),h+=(E+9*_+21*A+5)*Sr/(36*_*Pr),h-=(d-13*E+69*_+167*A+46)*w/(1620*c*E),h-=(7*R+21*d+70*E+26*_-93*A-31)*b/(6480*p*d),h-=(75*U+202*R+188*d-888*E-1345*_+118*A+138)*T/(272160*m*R),q=(28*d+131*E+402*_+581*A+208)*(A-1)/(1620*Pr*E),q-=(35*U-154*R-623*d-1636*E-3983*_-3514*A-925)*Sr/(12960*c*d),q-=(2132*rr+7915*U+16821*R+35066*d+87490*E+141183*_+95993*A+21640)*w/(816480*R*p),q-=(11053*er+53308*rr+117010*U+163924*R+116188*d-258428*E-677042*_-481940*A-105497)*b/(14696640*m*U),g=-((3592*rr+8375*U-1323*R-29198*d-89578*E-154413*_-116063*A-29632)*(A-1))/(816480*R*c),g-=(442043*J+2054169*er+3803094*rr+3470754*U+2141568*R-2393568*d-19904934*E-34714674*_-23128299*A-5253353)*Sr/(146966400*U*p),g-=(116932*l+819281*J+2378172*er+4341330*rr+6806004*U+10622748*R+18739500*d+30651894*E+30869976*_+15431867*A+2919016)*w/(146966400*m*rr),f=v+h/r+q/(r*r)+g/(r*r*r),f<=0&&(f=Wyr),Y=f-y*JC(f)+(1+y)*JC(1+y)-y,a=1/(1+y),u=f<y?a:0,o=f<y?1:a,Mt=(u+o)/2,n=Yyr(Y,y),Kyr(n,Mt,u,o,32,100)}$C.exports=Qyr});var xC=s((lUr,zC)=>{"use strict";var mr=k(),Zyr=Ot(),Uv=ii(),Jyr=We(),Dv=vt();function $yr(r,e,t,i,a,n){var u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_;b=0,o=!1,c=e,l=Zyr(1,1-a),h=Jyr(1e7*e,1e7),p=0,v=h,f=h,m=n;do{if(p=b,f=v,v=h,w=r(c),b=w[0],T=w[1],_=w[2],m-=1,b===0)break;if(T===0?(p===0&&(c===t?e=i:e=t,p=r(e),h=e-c),Uv(p)*Uv(b)<0?h<0?h=(c-t)/2:h=(c-i)/2:h<0?h=(c-i)/2:h=(c-t)/2):_===0?h=b/T:(q=2*b,y=2*T-b*(_/T),mr(y)<1&&mr(q)>=mr(y)*Dv?h=b/T:h=q/y,h*T/b<0&&(h=b/T,mr(h)>2*mr(e)&&(h=(h<0?-1:1)*2*mr(e)))),u=mr(h/f),u>.8&&u<2&&(h=h>0?(c-t)/2:(c-i)/2,mr(h)>c&&(h=Uv(h)*c),f=h*3),e=c,c-=h,c<t){if(mr(t)<1&&mr(c)>1&&Dv/mr(c)<mr(t)?g=1e3:g=c/t,mr(g)<1&&(g=1/g),!o&&g>0&&g<3)h=.99*(e-t),c=e-h,o=!0;else if(h=(e-t)/2,c=e-h,c===t||c===i)break}else if(c>i){if(mr(i)<1&&mr(c)>1&&Dv/mr(c)<mr(i)?g=1e3:g=c/i,mr(g)<1&&(g=1/g),!o&&g>0&&g<3)h=.99*(e-i),c=e-h,o=!0;else if(h=(e-i)/2,c=e-h,c===t||c===i)break}h>0?i=e:t=e}while(m&&mr(c*l)<mr(h));return c}zC.exports=$yr});var ej=s((cUr,rj)=>{"use strict";var Xyr=Iv().assign,zyr=k(),xyr=vt(),Hv=nt();function rwr(r,e,t,i){return a;function a(n){var u,o,v,f,l;return l=1-n,u=[0,0],Xyr(n,r,e,!0,i,u,1,0),f=u[0]-t,o=u[1],i&&(o=-o),l===0&&(l=Hv*64),n===0&&(n=Hv*64),v=o*(-(l*r)+(e-2)*n+1),zyr(v)<l*n*xyr&&(v/=l*n),i&&(v=-v),o===0&&(o=(i?-1:1)*Hv*64),[f,o,v]}}rj.exports=rwr});var lj=s((pUr,fj)=>{"use strict";var ewr=He(),tj=si(),Wv=Ft(),ij=ve(),twr=Dn(),ci=mv(),aj=G(),iwr=k(),nj=x(),Fe=ir(),uj=Kt(),awr=We(),nwr=ue(),sj=$(),Yv=nt(),oj=Hn(),vj=se(),uwr=YM(),swr=ZM(),owr=SV(),vwr=XC(),fwr=xC(),lwr=ej(),cwr=32,pwr=1e3,Rt=[0,0,0,0,0];function mwr(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E,d,R,U,rr,er,J,Pr,Sr,A,Y;if(n=!1,i===0)return[1,0];if(t===0)return[0,1];if(r===1){if(e===1)return[t,1-t];q=e,e=r,r=q,q=i,i=t,t=q,n=!0}if(A=0,o=0,f=1,r===.5){if(e===.5)return A=uj(t*oj),A*=A,Y=uj(i*oj),Y*=Y,[A,Y];e>.5&&(q=e,e=r,r=q,q=i,i=t,t=q,n=!n)}if(e===.5&&r>=.5&&t!==1)R={},A=uwr(r,t,R),Y=R.value;else{if(e===1)return t<i?r>1?(A=Fe(t,1/r),Y=-Wv(sj(t)/r)):(A=Fe(t,1/r),Y=1-A):(A=nj(ij(-i)/r),Y=-Wv(ij(-i)/r)),n&&(q=Y,Y=A,A=q),[A,Y];if(r+e>5)t>.5&&(q=e,e=r,r=q,q=i,i=t,t=q,n=!n),p=nwr(r,e),c=awr(r,e),aj(p)>c-p&&p>5?(A=swr(r,e,t),Y=1-A):(J=r+e,v=twr(aj(r/J)),u=p/J,u>=.2&&u<=.8&&J>=10?(h=Fe(t,1/r),h<.0025&&r+e<200?A=h*Fe(r*ci(r,e),1/r):A=owr(t,J,v),Y=1-A):(r<e&&(q=e,e=r,r=q,q=i,i=t,t=q,n=!n),m=0,e<2&&(m=ci(r,e)),m===0?Y=1:(Y=Fe(e*i*m,1/e),A=1-Y)),Y>1e-5&&(A=vwr(r,e,t,i),Y=1-A));else if(r<1&&e<1){if(d=(1-r)/(2-r-e),b=tj(d,r,e)-t,iwr(b)/t<vj*3)return n?[1-d,d]:[d,1-d];b<0&&(q=e,e=r,r=q,q=i,i=t,t=q,n=!n,d=1-d),E=Fe(r*t*ci(r,e),1/r),A=E/(1+E),Y=1/(1+E),A>d&&(A=d),f=d}else r>1&&e>1?(d=(r-1)/(r+e-2),g=(e-1)/(r+e-2),_=tj(d,r,e)-t,_<0&&(q=e,e=r,r=q,q=i,i=t,t=q,q=g,g=d,d=q,n=!n),T=sj(t*r*ci(r,e))/r,A=nj(T),Y=A<.9?1-A:-Wv(T),e<r&&A<.2&&(y=r-1,w=e-1,U=r*r,rr=r*U,er=e*e,Rt[0]=0,Rt[1]=1,Rt[2]=w/y,y*=y,Rt[3]=w*(3*r*e+5*e+U-r-4)/(2*(r+2)*y),y*=r+1,Rt[4]=w*(33*r*er+31*er+8*U*er-30*r*e-47*e+11*U*e+6*rr*e+18+4*r-rr+U*U-10*U),Rt[4]/=3*(r+3)*(r+2)*y,A=ewr(Rt,A)),A>d&&(A=d),f=d):(e<r&&(q=e,e=r,r=q,q=i,i=t,t=q,n=!n),Fe(t,1/r)<.5?(A=Fe(t*r*ci(r,e),1/r),A===0&&(A=Yv),Y=1-A):(Y=Fe(1-Fe(t,e*ci(r,e)),1/e),Y===0&&(Y=Yv),A=1-Y))}return A>.5&&(q=e,e=r,r=q,q=i,i=t,t=q,q=Y,Y=A,A=q,n=!n,Pr=1-f,Sr=1-o,o=Pr,f=Sr),o===0&&(n?(o=vj,A<o&&(A=o)):o=Yv,A<o&&(A=o)),a=cwr,A<1e-50&&(r<1||e<1)&&(a*=3,a/=2),l=lwr(r,e,t<i?t:i,t>=i),A=fwr(l,A,o,f,a,pwr),A===o&&(A=0),n?[1-A,A]:[A,1-A]}fj.exports=mwr});var Kv=s((mUr,cj)=>{"use strict";var hwr=lj();cj.exports=hwr});var hj=s((hUr,mj)=>{"use strict";var gwr=Kv(),pj=F(),qwr=ii(),ywr=G();function wwr(r,e){var t,i;return pj(e)||pj(r)||e<=0||r<0||r>1?NaN:(t=r>.5?1-r:r,i=gwr(e/2,.5,2*t,1-2*t),qwr(r-.5)*ywr(e*i[1]/i[0]))}mj.exports=wwr});var yj=s((gUr,qj)=>{"use strict";var bwr=Ee(),dwr=Kv(),gj=F(),_wr=ii(),Ewr=G();function Twr(r){if(gj(r)||r<=0)return bwr(NaN);return e;function e(t){var i,a;return gj(t)||t<0||t>1?NaN:(i=t>.5?1-t:t,a=dwr(r/2,.5,2*i,1-2*i),_wr(t-.5)*Ewr(r*a[1]/a[0]))}}qj.exports=Twr});var Qv=s((qUr,bj)=>{"use strict";var Awr=O(),wj=hj(),Owr=yj();Awr(wj,"factory",Owr);bj.exports=wj});var _j=s((yUr,dj)=>{"use strict";var Swr=tr(),Iwr=128;function Zv(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g,y,w;if(a=e.data,n=e.accessors[0],u=i,t===0)return r*n(a,u);if(r<=8){for(y=n(a,u),u+=t,w=1;w<r;w++)y+=n(a,u),u+=t;return y}if(r<=Iwr){for(o=n(a,u),v=n(a,u+t),f=n(a,u+2*t),l=n(a,u+3*t),c=n(a,u+4*t),p=n(a,u+5*t),m=n(a,u+6*t),h=n(a,u+7*t),u+=8*t,q=r%8,w=8;w<r-q;w+=8)o+=n(a,u),v+=n(a,u+t),f+=n(a,u+2*t),l+=n(a,u+3*t),c+=n(a,u+4*t),p+=n(a,u+5*t),m+=n(a,u+6*t),h+=n(a,u+7*t),u+=8*t;for(y=o+v+(f+l)+(c+p+(m+h)),w;w<r;w++)y+=n(a,u),u+=t;return y}return g=Swr(r/2),g-=g%8,Zv(g,e,t,u)+Zv(r-g,e,t,u+g*t)}dj.exports=Zv});var $v=s((wUr,Ej)=>{"use strict";var Nwr=tr(),Fwr=Ce(),Lwr=_j(),Pwr=128;function Jv(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g,y;if(r<=0)return 0;if(q=Fwr(e),q.accessorProtocol)return Lwr(r,q,t,i);if(a=i,t===0)return r*e[a];if(r<8){for(h=e[a],a+=t,y=1;y<r;y++)h+=e[a],a+=t;return h}if(r<=Pwr){for(n=e[a],u=e[a+t],o=e[a+2*t],v=e[a+3*t],f=e[a+4*t],l=e[a+5*t],c=e[a+6*t],p=e[a+7*t],a+=8*t,m=r%8,y=8;y<r-m;y+=8)n+=e[a],u+=e[a+t],o+=e[a+2*t],v+=e[a+3*t],f+=e[a+4*t],l+=e[a+5*t],c+=e[a+6*t],p+=e[a+7*t],a+=8*t;for(h=n+u+(o+v)+(f+l+(c+p)),y;y<r;y++)h+=e[a],a+=t;return h}return g=Nwr(r/2),g-=g%8,Jv(g,e,t,a)+Jv(r-g,e,t,a+g*t)}Ej.exports=Jv});var Aj=s((bUr,Tj)=>{"use strict";var Rwr=we(),Mwr=$v();function Vwr(r,e,t){return Mwr(r,e,t,Rwr(r,t))}Tj.exports=Vwr});var v0=s((dUr,Sj)=>{"use strict";var Cwr=O(),Oj=Aj(),jwr=$v();Cwr(Oj,"ndarray",jwr);Sj.exports=Oj});var Xv=s((_Ur,Ij)=>{"use strict";var Bwr=v0().ndarray;function kwr(r,e,t,i,a){return r<=0?0:r*e+Bwr(r,t,i,a)}Ij.exports=kwr});var Fj=s((EUr,Nj)=>{"use strict";var Gwr=we(),Uwr=Xv();function Dwr(r,e,t,i){return Uwr(r,e,t,i,Gwr(r,i))}Nj.exports=Dwr});var zv=s((TUr,Pj)=>{"use strict";var Hwr=O(),Lj=Fj(),Wwr=Xv();Hwr(Lj,"ndarray",Wwr);Pj.exports=Lj});var Mj=s((AUr,Rj)=>{"use strict";var Ywr=v0().ndarray,Kwr=zv().ndarray;function Qwr(r,e,t,i){var a,n,u,o;return a=e.data,n=e.accessors[0],r===1||t===0?n(a,i):(u=Ywr(r,a,t,i)/r,o=Kwr(r,-u,a,t,i)/r,u+o)}Rj.exports=Qwr});var xv=s((OUr,Vj)=>{"use strict";var Zwr=v0().ndarray,Jwr=zv().ndarray,$wr=Ce(),Xwr=Mj();function zwr(r,e,t,i){var a,n,u;return r<=0?NaN:(u=$wr(e),u.accessorProtocol?Xwr(r,u,t,i):r===1||t===0?e[i]:(a=Zwr(r,e,t,i)/r,n=Jwr(r,-a,e,t,i)/r,a+n))}Vj.exports=zwr});var jj=s((SUr,Cj)=>{"use strict";var xwr=we(),rbr=xv();function ebr(r,e,t){return rbr(r,e,t,xwr(r,t))}Cj.exports=ebr});var Gj=s((IUr,kj)=>{"use strict";var tbr=O(),Bj=jj(),ibr=xv();tbr(Bj,"ndarray",ibr);kj.exports=Bj});var rf=s((NUr,Uj)=>{"use strict";var abr=Gj();Uj.exports=abr});var Hj=s((FUr,Dj)=>{"use strict";var nbr=rf();function ubr(r,e,t){return nbr(r,e,t)}Dj.exports=ubr});var Yj=s((LUr,Wj)=>{"use strict";var sbr=rf().ndarray;function obr(r,e,t,i){return sbr(r,e,t,i)}Wj.exports=obr});var Zj=s((PUr,Qj)=>{"use strict";var vbr=O(),Kj=Hj(),fbr=Yj();vbr(Kj,"ndarray",fbr);Qj.exports=Kj});var f0=s((RUr,Jj)=>{"use strict";var lbr=Zj();Jj.exports=lbr});var Xj=s((MUr,$j)=>{"use strict";var cbr=tr(),pbr=128;function ef(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g,y,w;if(a=e.data,n=e.accessors[0],u=i,t===0)return r*n(a,u);if(r<=8){for(y=n(a,u),u+=t,w=1;w<r;w++)y+=n(a,u),u+=t;return y}if(r<=pbr){for(o=n(a,u),v=n(a,u+t),f=n(a,u+2*t),l=n(a,u+3*t),c=n(a,u+4*t),p=n(a,u+5*t),m=n(a,u+6*t),h=n(a,u+7*t),u+=8*t,q=r%8,w=8;w<r-q;w+=8)o+=n(a,u),v+=n(a,u+t),f+=n(a,u+2*t),l+=n(a,u+3*t),c+=n(a,u+4*t),p+=n(a,u+5*t),m+=n(a,u+6*t),h+=n(a,u+7*t),u+=8*t;for(y=o+v+(f+l)+(c+p+(m+h)),w;w<r;w++)y+=n(a,u),u+=t;return y}return g=cbr(r/2),g-=g%8,ef(g,e,t,u)+ef(r-g,e,t,u+g*t)}$j.exports=ef});var af=s((VUr,zj)=>{"use strict";var mbr=tr(),hbr=Ce(),gbr=Xj(),qbr=128;function tf(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g,y;if(r<=0)return 0;if(q=hbr(e),q.accessorProtocol)return gbr(r,q,t,i);if(a=i,t===0)return r*e[a];if(r<8){for(h=e[a],a+=t,y=1;y<r;y++)h+=e[a],a+=t;return h}if(r<=qbr){for(n=e[a],u=e[a+t],o=e[a+2*t],v=e[a+3*t],f=e[a+4*t],l=e[a+5*t],c=e[a+6*t],p=e[a+7*t],a+=8*t,m=r%8,y=8;y<r-m;y+=8)n+=e[a],u+=e[a+t],o+=e[a+2*t],v+=e[a+3*t],f+=e[a+4*t],l+=e[a+5*t],c+=e[a+6*t],p+=e[a+7*t],a+=8*t;for(h=n+u+(o+v)+(f+l+(c+p)),y;y<r;y++)h+=e[a],a+=t;return h}return g=mbr(r/2),g-=g%8,tf(g,e,t,a)+tf(r-g,e,t,a+g*t)}zj.exports=tf});var rB=s((CUr,xj)=>{"use strict";var ybr=we(),wbr=af();function bbr(r,e,t){return wbr(r,e,t,ybr(r,t))}xj.exports=bbr});var nf=s((jUr,tB)=>{"use strict";var dbr=O(),eB=rB(),_br=af();dbr(eB,"ndarray",_br);tB.exports=eB});var aB=s((BUr,iB)=>{"use strict";var Ebr=nf().ndarray;function Tbr(r,e,t,i,a){var n,u,o,v,f,l,c,p,m;for(n=t.data,u=t.accessors[0],o=Ebr(r,n,i,a)/r,p=r-e,v=a,f=0,l=0,m=0;m<r;m++)c=u(n,v)-o,f+=c*c,l+=c,v+=i;return f/p-l/r*(l/p)}iB.exports=Tbr});var uf=s((kUr,nB)=>{"use strict";var Abr=nf().ndarray,Obr=Ce(),Sbr=aB();function Ibr(r,e,t,i,a){var n,u,o,v,f,l,c,p;if(c=r-e,r<=0||c<=0)return NaN;if(r===1||i===0)return 0;if(v=Obr(t),v.accessorProtocol)return Sbr(r,e,v,i,a);for(n=Abr(r,t,i,a)/r,u=a,o=0,f=0,p=0;p<r;p++)l=t[u]-n,o+=l*l,f+=l,u+=i;return o/c-f/r*(f/c)}nB.exports=Ibr});var sB=s((GUr,uB)=>{"use strict";var Nbr=we(),Fbr=uf();function Lbr(r,e,t,i){return Fbr(r,e,t,i,Nbr(r,i))}uB.exports=Lbr});var sf=s((UUr,vB)=>{"use strict";var Pbr=O(),oB=sB(),Rbr=uf();Pbr(oB,"ndarray",Rbr);vB.exports=oB});var lB=s((DUr,fB)=>{"use strict";var Mbr=sf();function Vbr(r,e,t,i){return Mbr(r,e,t,i)}fB.exports=Vbr});var pB=s((HUr,cB)=>{"use strict";var Cbr=sf().ndarray;function jbr(r,e,t,i,a){return Cbr(r,e,t,i,a)}cB.exports=jbr});var gB=s((WUr,hB)=>{"use strict";var Bbr=O(),mB=lB(),kbr=pB();Bbr(mB,"ndarray",kbr);hB.exports=mB});var l0=s((YUr,qB)=>{"use strict";var Gbr=gB();qB.exports=Gbr});var of=s((KUr,yB)=>{"use strict";function Ubr(r,e,t,i,a,n,u){var o,v,f,l,c,p,m;for(o=e.data,v=a.data,l=e.accessors[0],f=a.accessors[1],c=i,p=u,m=0;m<r;m++)f(v,p,l(o,c)),c+=t,p+=n;return a}yB.exports=Ubr});var dB=s((QUr,bB)=>{"use strict";var wB=Ce(),Dbr=of(),vf=8;function Hbr(r,e,t,i,a){var n,u,o,v,f,l;if(r<=0)return i;if(o=wB(e),v=wB(i),o.accessorProtocol||v.accessorProtocol)return t<0?n=(1-r)*t:n=0,a<0?u=(1-r)*a:u=0,Dbr(r,o,t,n,v,a,u),v.data;if(t===1&&a===1){if(f=r%vf,f>0)for(l=0;l<f;l++)i[l]=e[l];if(r<vf)return i;for(l=f;l<r;l+=vf)i[l]=e[l],i[l+1]=e[l+1],i[l+2]=e[l+2],i[l+3]=e[l+3],i[l+4]=e[l+4],i[l+5]=e[l+5],i[l+6]=e[l+6],i[l+7]=e[l+7];return i}for(t<0?n=(1-r)*t:n=0,a<0?u=(1-r)*a:u=0,l=0;l<r;l++)i[u]=e[n],n+=t,u+=a;return i}bB.exports=Hbr});var TB=s((ZUr,EB)=>{"use strict";var _B=Ce(),Wbr=of(),ga=8;function Ybr(r,e,t,i,a,n,u){var o,v,f,l,c,p;if(r<=0)return a;if(f=_B(e),l=_B(a),f.accessorProtocol||l.accessorProtocol)return Wbr(r,f,t,i,l,n,u),l.data;if(o=i,v=u,t===1&&n===1){if(c=r%ga,c>0)for(p=0;p<c;p++)a[v]=e[o],o+=t,v+=n;if(r<ga)return a;for(p=c;p<r;p+=ga)a[v]=e[o],a[v+1]=e[o+1],a[v+2]=e[o+2],a[v+3]=e[o+3],a[v+4]=e[o+4],a[v+5]=e[o+5],a[v+6]=e[o+6],a[v+7]=e[o+7],o+=ga,v+=ga;return a}for(p=0;p<r;p++)a[v]=e[o],o+=t,v+=n;return a}EB.exports=Ybr});var SB=s((JUr,OB)=>{"use strict";var Kbr=O(),AB=dB(),Qbr=TB();Kbr(AB,"ndarray",Qbr);OB.exports=AB});var PB=s(($Ur,LB)=>{"use strict";var IB=qr().isPrimitive,Zbr=gr(),Jbr=hr().isPrimitive,NB=F(),ff=z(),$br=Cn(),pi=S(),FB=["two-sided","less","greater"];function Xbr(r,e){if(!Zbr(e))return new TypeError(pi("invalid argument. Options argument must be an object. Value: `%s`.",e));if(ff(e,"alpha")){if(r.alpha=e.alpha,!IB(r.alpha)||NB(r.alpha))return new TypeError(pi("invalid option. `%s` option must be a number. Option: `%s`.","alpha",r.alpha));if(r.alpha<0||r.alpha>1)return new RangeError(pi("invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%f`.","alpha",r.alpha))}if(ff(e,"alternative")){if(r.alternative=e.alternative,!Jbr(r.alternative))return new TypeError(pi("invalid option. `%s` option must be a string. Option: `%s`.","alternative",r.alternative));if(!$br(FB,r.alternative))return new Error(pi('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"alternative",FB.join('", "'),r.alternative))}return ff(e,"mu")&&(r.mu=e.mu,!IB(r.mu)||NB(r.mu))?new TypeError(pi("invalid option. `%s` option must be a number. Option: `%s`.","mu",r.mu)):null}LB.exports=Xbr});var VB=s((XUr,MB)=>{"use strict";var zbr=Xr(),xbr=gr(),rdr=Nr().isPrimitive,RB=z(),c0=Lt(),lf=S();function edr(r){var e,t,i;if(t=4,e=!0,arguments.length>0){if(!xbr(r))throw new TypeError(lf("invalid argument. First argument must be an object. Value: `%s`.",r));if(RB(r,"digits")){if(!zbr(r.digits))throw new TypeError(lf("invalid option. `%s` option must be a positive integer. Option: `%s`.","digits",r.digits));t=r.digits}if(RB(r,"decision")){if(!rdr(r.decision))throw new TypeError(lf("invalid option. `%s` option must be a boolean. Option: `%s`.","decision",r.decision));e=r.decision}}switch(i="",i+=this.method,i+=`

`,i+="Alternative hypothesis: ",this.method==="Paired t-test"?i+="True difference in means is ":i+="True mean is ",this.alternative){case"less":i+="less than ";break;case"greater":i+="greater than ";break;default:i+="not equal to ";break}return i+=this.nullValue,i+=`

`,i+="    pValue: "+c0(this.pValue,-t)+`
`,i+="    statistic: "+c0(this.statistic,-t)+`
`,i+="    df: "+this.df+`
`,i+="    "+(1-this.alpha)*100+"% confidence interval: ["+c0(this.ci[0],-t)+","+c0(this.ci[1],-t)+"]",i+=`

`,e&&(i+="Test Decision: ",this.rejected?i+="Reject null in favor of alternative at "+this.alpha*100+"% significance level":i+="Fail to reject null in favor of alternative at "+this.alpha*100+"% significance level",i+=`
`),i}MB.exports=edr});var BB=s((zUr,jB)=>{"use strict";var cf=ei().primitives,pf=ti(),Zr=$e(),tdr=gr(),mf=xn(),hf=Qv(),p0=S(),idr=G(),adr=k(),ndr=f0(),udr=l0(),sdr=SB(),odr=or(),vdr=Q(),fdr=Tr(),CB=PB(),ldr=VB();function cdr(r){var e,t,i,a,n,u,o,v,f,l,c,p,m;if(!pf(r)&&!cf(r))throw new TypeError(p0("invalid argument. First argument must be a numeric array. Value: `%s`.",r));if(v=r.length,v<2)throw new Error(p0("invalid argument. First argument must contain at least two elements. Value: `%s`.",r));if(n={mu:0,alpha:.05,alternative:"two-sided"},arguments.length===2){if(tdr(arguments[1])){if(o=CB(n,arguments[1]),o)throw o}else if(p=arguments[1],!pf(p)&&!cf(p))throw new TypeError(p0("invalid argument. Second argument must be either a numeric array or an options object. Value: `%s`.",p))}else if(arguments.length>2){if(p=arguments[1],!pf(p)&&!cf(p))throw new TypeError(p0("invalid argument. Second argument must be a numeric array. Value: `%s`.",p));if(o=CB(n,arguments[2]),o)throw o}if(p){if(p.length!==v)throw new Error("invalid arguments. First and second arguments must have the same length.");for(r=sdr(v,r,1,new fdr(v),1),m=0;m<v;m++)r[m]-=p[m]}return e=idr(udr(v,1,r,1)/v),t=ndr(v,r,1),u=(t-n.mu)/e,l=v-1,n.alternative==="two-sided"?(a=2*mf(-adr(u),l),c=hf(1-n.alpha/2,l),i=[n.mu+(u-c)*e,n.mu+(u+c)*e]):n.alternative==="greater"?(a=1-mf(u,l),c=hf(1-n.alpha,l),i=[n.mu+(u-c)*e,vdr]):(a=mf(u,l),c=hf(1-n.alpha,l),i=[odr,n.mu+(u+c)*e]),f={},Zr(f,"rejected",a<=n.alpha),Zr(f,"alpha",n.alpha),Zr(f,"pValue",a),Zr(f,"statistic",u),Zr(f,"ci",i),Zr(f,"df",l),Zr(f,"nullValue",n.mu),Zr(f,"mean",t),Zr(f,"sd",e),Zr(f,"alternative",n.alternative),Zr(f,"method",p?"Paired t-test":"One-sample t-test"),Zr(f,"print",ldr),f}jB.exports=cdr});var GB=s((xUr,kB)=>{"use strict";var pdr=BB();kB.exports=pdr});var YB=s((rDr,WB)=>{"use strict";var UB=qr().isPrimitive,mdr=gr(),DB=hr().isPrimitive,HB=Ke(),m0=z(),qa=S();function hdr(r,e){return mdr(e)?m0(e,"alpha")&&(r.alpha=e.alpha,!UB(r.alpha)||HB(r.alpha))?new TypeError(qa("invalid option. `%s` option must be a number. Option: `%s`.","alpha",r.alpha)):m0(e,"alternative")&&(r.alternative=e.alternative,!DB(r.alternative))?new TypeError(qa("invalid option. `%s` option must be a string. Option: `%s`.","alternative",r.alternative)):m0(e,"difference")&&(r.difference=e.difference,!UB(r.difference)||HB(r.difference))?new TypeError(qa("invalid option. `%s` option must be a number. Option: `%s`.","difference",r.difference)):m0(e,"variance")&&(r.variance=e.variance,!DB(r.variance))?new TypeError(qa("invalid option. `%s` option must be a string. Option: `%s`.","variance",r.variance)):null:new TypeError(qa("invalid argument. Options argument must be an object. Value: `%s`.",e))}WB.exports=hdr});var ZB=s((eDr,QB)=>{"use strict";var gdr=Xr(),qdr=gr(),ydr=Nr().isPrimitive,KB=z(),ya=Lt(),gf=S();function wdr(r){var e,t,i;if(t=4,e=!0,arguments.length>0){if(!qdr(r))throw new TypeError(gf("invalid argument. First argument must be an object. Value: `%s`.",r));if(KB(r,"digits")){if(!gdr(r.digits))throw new TypeError(gf("invalid option. `%s` option must be a positive integer. Option: `%s`.","digits",r.digits));t=r.digits}if(KB(r,"decision")){if(!ydr(r.decision))throw new TypeError(gf("invalid option. `%s` option must be a boolean. Option: `%s`.","decision",r.decision));e=r.decision}}switch(i="",i+=this.method,i+=`

`,i+="Alternative hypothesis: ",i+="True difference in means is ",this.alternative){case"less":i+="less than ";break;case"greater":i+="greater than ";break;default:i+="not equal to ";break}return i+=this.nullValue,i+=`

`,i+="    pValue: "+ya(this.pValue,-t)+`
`,i+="    statistic: "+ya(this.statistic,-t)+`
`,i+="    df: "+ya(this.df,-t)+`
`,i+="    "+(1-this.alpha)*100+"% confidence interval: ["+ya(this.ci[0],-t)+","+ya(this.ci[1],-t)+"]",i+=`

`,e&&(i+="Test Decision: ",this.rejected?i+="Reject null in favor of alternative at "+this.alpha*100+"% significance level":i+="Fail to reject null in favor of alternative at "+this.alpha*100+"% significance level",i+=`
`),i}QB.exports=wdr});var rk=s((tDr,xB)=>{"use strict";var JB=ei().primitives,$B=ti(),Jr=$e(),qf=xn(),h0=Qv(),g0=G(),bdr=k(),yf=ir(),XB=f0(),zB=l0(),wa=S(),ddr=or(),_dr=Q(),Edr=YB(),Tdr=ZB();function Adr(r,e,t){var i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E,d;if(!$B(r)&&!JB(r))throw new TypeError(wa("invalid argument. First argument must be a numeric array. Value: `%s`.",r));if(!$B(e)&&!JB(e))throw new TypeError(wa("invalid argument. Second argument must be a numeric array. Value: `%s`.",e));if(l={},t&&(w=Edr(l,t),w))throw w;if(f=l.difference||0,l.alpha===void 0?a=.05:a=l.alpha,a<0||a>1)throw new RangeError(wa("invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%f`.","alpha",a));if(T=r.length,_=e.length,p=zB(T,1,r,1),m=zB(_,1,e,1),o=l.variance||"unequal",o==="equal")E=T+_-2,d=(T-1)*p+(_-1)*m,d/=E,i=g0(d*(1/T+1/_));else if(o==="unequal")q=g0(p/T),g=g0(m/_),i=g0(q*q+g*g),d=yf(q,4)/(T-1),d+=yf(g,4)/(_-1),E=yf(i,4)/d;else throw new Error(wa('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"variance",["equal","unequal"].join('", "'),o));switch(n=XB(T,r,1),u=XB(_,e,1),h=(n-u-f)/i,y=l.alternative||"two-sided",y){case"two-sided":c=2*qf(-bdr(h),E),v=[h-h0(1-a/2,E),h+h0(1-a/2,E)],v[0]=f+v[0]*i,v[1]=f+v[1]*i;break;case"greater":c=1-qf(h,E),v=[h-h0(1-a,E),_dr],v[0]=f+v[0]*i;break;case"less":c=qf(h,E),v=[ddr,h+h0(1-a,E)],v[1]=f+v[1]*i;break;default:throw new Error(wa('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"alternative",["two-sided","less","greater"].join('", "'),y))}return b={},Jr(b,"rejected",c<=a),Jr(b,"alpha",a),Jr(b,"pValue",c),Jr(b,"statistic",h),Jr(b,"ci",v),Jr(b,"alternative",y),Jr(b,"df",E),Jr(b,"method",o==="equal"?"Two-sample t-test":"Welch two-sample t-test"),Jr(b,"nullValue",f),Jr(b,"xmean",n),Jr(b,"ymean",u),Jr(b,"print",Tdr),b}xB.exports=Adr});var tk=s((iDr,ek)=>{"use strict";var Odr=rk();ek.exports=Odr});var ak=s((aDr,ik)=>{"use strict";function Sdr(r){var e,t,i;return r===0?-.0005087819496582806:(r<0?e=-r:e=r,e<=1?(t=-.0005087819496582806+r*(-.008368748197417368+r*(.03348066254097446+r*(-.012692614766297404+r*(-.03656379714117627+r*(.02198786811111689+r*(.008226878746769157+r*(-.005387729650712429+r*(0+r*0)))))))),i=1+r*(-.9700050433032906+r*(-1.5657455823417585+r*(1.5622155839842302+r*(.662328840472003+r*(-.7122890234154284+r*(-.05273963823400997+r*(.07952836873415717+r*(-.0023339375937419+r*.0008862163904564247))))))))):(r=1/r,t=0+r*(0+r*(-.005387729650712429+r*(.008226878746769157+r*(.02198786811111689+r*(-.03656379714117627+r*(-.012692614766297404+r*(.03348066254097446+r*(-.008368748197417368+r*-.0005087819496582806)))))))),i=.0008862163904564247+r*(-.0023339375937419+r*(.07952836873415717+r*(-.05273963823400997+r*(-.7122890234154284+r*(.662328840472003+r*(1.5622155839842302+r*(-1.5657455823417585+r*(-.9700050433032906+r*1))))))))),t/i)}ik.exports=Sdr});var uk=s((nDr,nk)=>{"use strict";function Idr(r){var e,t,i;return r===0?-.20243350835593876:(r<0?e=-r:e=r,e<=1?(t=-.20243350835593876+r*(.10526468069939171+r*(8.3705032834312+r*(17.644729840837403+r*(-18.851064805871424+r*(-44.6382324441787+r*(17.445385985570866+r*(21.12946554483405+r*-3.6719225470772936))))))),i=1+r*(6.242641248542475+r*(3.971343795334387+r*(-28.66081804998+r*(-20.14326346804852+r*(48.560921310873994+r*(10.826866735546016+r*(-22.643693341313973+r*1.7211476576120028)))))))):(r=1/r,t=-3.6719225470772936+r*(21.12946554483405+r*(17.445385985570866+r*(-44.6382324441787+r*(-18.851064805871424+r*(17.644729840837403+r*(8.3705032834312+r*(.10526468069939171+r*-.20243350835593876))))))),i=1.7211476576120028+r*(-22.643693341313973+r*(10.826866735546016+r*(48.560921310873994+r*(-20.14326346804852+r*(-28.66081804998+r*(3.971343795334387+r*(6.242641248542475+r*1)))))))),t/i)}nk.exports=Idr});var ok=s((uDr,sk)=>{"use strict";function Ndr(r){var e,t,i;return r===0?-.1311027816799519:(r<0?e=-r:e=r,e<=1?(t=-.1311027816799519+r*(-.16379404719331705+r*(.11703015634199525+r*(.38707973897260434+r*(.3377855389120359+r*(.14286953440815717+r*(.029015791000532906+r*(.0021455899538880526+r*(-6794655751811263e-22+r*(28522533178221704e-24+r*-681149956853777e-24))))))))),i=1+r*(3.4662540724256723+r*(5.381683457070069+r*(4.778465929458438+r*(2.5930192162362027+r*(.848854343457902+r*(.15226433829533179+r*(.011059242293464892+r*(0+r*(0+r*0)))))))))):(r=1/r,t=-681149956853777e-24+r*(28522533178221704e-24+r*(-6794655751811263e-22+r*(.0021455899538880526+r*(.029015791000532906+r*(.14286953440815717+r*(.3377855389120359+r*(.38707973897260434+r*(.11703015634199525+r*(-.16379404719331705+r*-.1311027816799519))))))))),i=0+r*(0+r*(0+r*(.011059242293464892+r*(.15226433829533179+r*(.848854343457902+r*(2.5930192162362027+r*(4.778465929458438+r*(5.381683457070069+r*(3.4662540724256723+r*1)))))))))),t/i)}sk.exports=Ndr});var fk=s((sDr,vk)=>{"use strict";function Fdr(r){var e,t,i;return r===0?-.0350353787183178:(r<0?e=-r:e=r,e<=1?(t=-.0350353787183178+r*(-.0022242652921344794+r*(.018557330651423107+r*(.009508047013259196+r*(.0018712349281955923+r*(.00015754461742496055+r*(460469890584318e-20+r*(-2304047769118826e-25+r*26633922742578204e-28))))))),i=1+r*(1.3653349817554064+r*(.7620591645536234+r*(.22009110576413124+r*(.03415891436709477+r*(.00263861676657016+r*(7646752923027944e-20+r*(0+r*0)))))))):(r=1/r,t=26633922742578204e-28+r*(-2304047769118826e-25+r*(460469890584318e-20+r*(.00015754461742496055+r*(.0018712349281955923+r*(.009508047013259196+r*(.018557330651423107+r*(-.0022242652921344794+r*-.0350353787183178))))))),i=0+r*(0+r*(7646752923027944e-20+r*(.00263861676657016+r*(.03415891436709477+r*(.22009110576413124+r*(.7620591645536234+r*(1.3653349817554064+r*1)))))))),t/i)}vk.exports=Fdr});var ck=s((oDr,lk)=>{"use strict";function Ldr(r){var e,t,i;return r===0?-.016743100507663373:(r<0?e=-r:e=r,e<=1?(t=-.016743100507663373+r*(-.0011295143874558028+r*(.001056288621524929+r*(.00020938631748758808+r*(14962478375834237e-21+r*(44969678992770644e-23+r*(4625961635228786e-24+r*(-2811287356288318e-29+r*9905570997331033e-32))))))),i=1+r*(.5914293448864175+r*(.1381518657490833+r*(.016074608709367652+r*(.0009640118070051656+r*(27533547476472603e-21+r*(282243172016108e-21+r*(0+r*0)))))))):(r=1/r,t=9905570997331033e-32+r*(-2811287356288318e-29+r*(4625961635228786e-24+r*(44969678992770644e-23+r*(14962478375834237e-21+r*(.00020938631748758808+r*(.001056288621524929+r*(-.0011295143874558028+r*-.016743100507663373))))))),i=0+r*(0+r*(282243172016108e-21+r*(27533547476472603e-21+r*(.0009640118070051656+r*(.016074608709367652+r*(.1381518657490833+r*(.5914293448864175+r*1)))))))),t/i)}lk.exports=Ldr});var gk=s((vDr,hk)=>{"use strict";var Pdr=F(),pk=G(),mk=$(),Rdr=Q(),Mdr=or(),Vdr=ak(),Cdr=uk(),jdr=ok(),Bdr=fk(),kdr=ck(),Gdr=.08913147449493408,Udr=2.249481201171875,Ddr=.807220458984375,Hdr=.9399557113647461,Wdr=.9836282730102539;function Ydr(r){var e,t,i,a,n,u;return Pdr(r)?NaN:r===1?Rdr:r===-1?Mdr:r===0?r:r>1||r<-1?NaN:(r<0?(e=-1,t=-r):(e=1,t=r),a=1-t,t<=.5?(n=t*(t+10),u=Vdr(t),e*(n*Gdr+n*u)):a>=.25?(n=pk(-2*mk(a)),a-=.25,u=Cdr(a),e*(n/(Udr+u))):(a=pk(-mk(a)),a<3?(i=a-1.125,u=jdr(i),e*(Ddr*a+u*a)):a<6?(i=a-3,u=Bdr(i),e*(Hdr*a+u*a)):(i=a-6,u=kdr(i),e*(Wdr*a+u*a))))}hk.exports=Ydr});var wf=s((fDr,qk)=>{"use strict";var Kdr=gk();qk.exports=Kdr});var wk=s((lDr,yk)=>{"use strict";var Qdr=wf(),bf=F(),Zdr=G();function Jdr(r,e,t){var i,a;return bf(e)||bf(t)||bf(r)||t<0||r<0||r>1?NaN:t===0?e:(i=e,a=t*Zdr(2),i+a*Qdr(2*r-1))}yk.exports=Jdr});var dk=s((cDr,bk)=>{"use strict";var $dr=F();function Xdr(r,e){return $dr(r)||r<0||r>1?NaN:e}bk.exports=Xdr});var Tk=s((pDr,Ek)=>{"use strict";var zdr=Ee(),_k=F();function xdr(r){if(_k(r))return zdr(NaN);return e;function e(t){return _k(t)||t<0||t>1?NaN:r}}Ek.exports=xdr});var Sk=s((mDr,Ok)=>{"use strict";var r_r=O(),Ak=dk(),e_r=Tk();r_r(Ak,"factory",e_r);Ok.exports=Ak});var Nk=s((hDr,Ik)=>{"use strict";var t_r=Ee(),i_r=Sk().factory,a_r=wf(),df=F(),n_r=G();function u_r(r,e){var t,i;if(df(r)||df(e)||e<0)return t_r(NaN);return e===0&&i_r(r),t=r,i=e*n_r(2),a;function a(n){return df(n)||n<0||n>1?NaN:t+i*a_r(2*n-1)}}Ik.exports=u_r});var Pk=s((gDr,Lk)=>{"use strict";var s_r=O(),Fk=wk(),o_r=Nk();s_r(Fk,"factory",o_r);Lk.exports=Fk});var Vk=s((qDr,Mk)=>{"use strict";var v_r=F(),Rk=ve(),f_r=Q(),l_r=or(),c_r=1/(1<<28);function p_r(r){var e,t;return v_r(r)||r<-1||r>1?NaN:r===1?f_r:r===-1?l_r:(r<0&&(e=!0,r=-r),r<c_r?e?-r:r:(r<.5?(t=r+r,t=.5*Rk(t+t*r/(1-r))):t=.5*Rk((r+r)/(1-r)),e?-t:t))}Mk.exports=p_r});var jk=s((yDr,Ck)=>{"use strict";var m_r=Vk();Ck.exports=m_r});var kk=s((wDr,Bk)=>{"use strict";function h_r(r){var e,t,i;return r===0?-.3333333333333332:(r<0?e=-r:e=r,e<=1?(t=-1614.6876844170845+r*(-99.28772310019185+r*(-.9643991794250523+r*0)),i=4844.063053251255+r*(2235.4883906010045+r*(112.81167849163293+r*1))):(r=1/r,t=0+r*(-.9643991794250523+r*(-99.28772310019185+r*-1614.6876844170845)),i=1+r*(112.81167849163293+r*(2235.4883906010045+r*4844.063053251255))),t/i)}Bk.exports=h_r});var Uk=s((bDr,Gk)=>{"use strict";var g_r=k(),q_r=x(),y_r=kk(),w_r=88.02969193111305;function b_r(r){var e,t;if(t=g_r(r),t>.5*w_r)return r<0?-1:1;if(t>=.625)e=q_r(2*t),t=1-2/(e+1),r<0&&(t=-t);else{if(r===0)return r;e=r*r,t=r+r*e*y_r(e)}return t}Gk.exports=b_r});var Hk=s((dDr,Dk)=>{"use strict";var d_r=Uk();Dk.exports=d_r});var Kk=s((_Dr,Yk)=>{"use strict";var __r=Xr(),E_r=gr(),T_r=Nr().isPrimitive,Wk=z(),q0=Lt(),_f=S();function A_r(r){var e,t,i;if(t=4,e=!0,arguments.length>0){if(!E_r(r))throw new TypeError(_f("invalid argument. First argument must be an object. Value: `%s`.",r));if(Wk(r,"digits")){if(!__r(r.digits))throw new TypeError(_f("invalid option. `%s` option must be a positive integer. Option: `%s`.","digits",r.digits));t=r.digits}if(Wk(r,"decision")){if(!T_r(r.decision))throw new TypeError(_f("invalid option. `%s` option must be a boolean. Option: `%s`.","decision",r.decision));e=r.decision}}switch(i="",i+=this.method,i+=`

`,i+="Alternative hypothesis: ",i+="True correlation coefficient is ",this.alternative){case"less":i+="less than ";break;case"greater":i+="greater than ";break;default:i+="not equal to ";break}return i+=this.nullValue,i+=`

`,i+="    pValue: "+q0(this.pValue,-t)+`
`,i+="    statistic: "+q0(this.statistic,-t)+`
`,i+="    "+(1-this.alpha)*100+"% confidence interval: ["+q0(this.ci[0],-t)+","+q0(this.ci[1],-t)+"]",i+=`

`,e&&(i+="Test Decision: ",this.rejected?i+="Reject null in favor of alternative at "+this.alpha*100+"% significance level":i+="Fail to reject null in favor of alternative at "+this.alpha*100+"% significance level",i+=`
`),i}Yk.exports=A_r});var Xk=s((EDr,$k)=>{"use strict";var O_r=We(),S_r=ue(),Qk=G(),Zk=l0(),Jk=f0();function I_r(r,e){var t,i,a,n,u,o,v,f;for(f=r.length,u=Jk(f,r,1),o=Jk(f,e,1),n=0,v=0;v<f;v++)n+=r[v]*e[v];return i=n-f*u*o,t=(f-1)*Qk(Zk(f,1,r,1))*Qk(Zk(f,1,e,1)),a=i/t,O_r(S_r(a,1),-1)}$k.exports=I_r});var tG=s((TDr,eG)=>{"use strict";var zk=qr().isPrimitive,N_r=gr(),xk=Ke(),F_r=Sa(),Ef=z(),y0=S(),rG=["two-sided","less","greater"];function L_r(r,e){return N_r(e)?Ef(e,"alpha")&&(r.alpha=e.alpha,!zk(r.alpha)||xk(r.alpha)||r.alpha<0||r.alpha>1)?new TypeError(y0("invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%s`.","alpha",r.alpha)):Ef(e,"alternative")&&(r.alternative=e.alternative,F_r(rG,r.alternative)===-1)?new TypeError(y0('invalid option. `%s` option must be one of the following: "%s". Option: `%s`.',"alternative",rG.join('", "'),r.alternative)):Ef(e,"rho")&&(r.rho=e.rho,!zk(r.rho)||xk(r.rho)||r.rho<-1||r.rho>1)?new TypeError(y0("invalid option. `%s` option must be a number on the interval: [-1, 1]. Option: `%s`.","rho",r.rho)):null:new TypeError(y0("invalid argument. Options argument must be an object. Value: `%s`.",e))}eG.exports=L_r});var vG=s((ADr,oG)=>{"use strict";var iG=ei().primitives,aG=ti(),Le=$e(),P_r=Pk().factory,R_r=Bn().factory,nG=S(),uG=jk(),w0=Hk(),b0=xn(),d0=G(),sG=ue(),M_r=Kk(),V_r=Xk(),C_r=tG(),Tf=P_r(0,1),_0=R_r(0,1);function j_r(r,e,t){var i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w;if(!aG(r)&&!iG(r))throw new TypeError(nG("invalid argument. First argument must be a numeric array. Value: `%s`.",r));if(!aG(e)&&!iG(e))throw new TypeError(nG("invalid argument. Second argument must be a numeric array. Value: `%s`.",e));if(g=r.length,g!==e.length)throw new RangeError("invalid arguments. First and second arguments must be arrays having the same length.");if(u={},t&&(l=C_r(u,t),l))throw l;if(u.alpha===void 0?a=.05:a=u.alpha,g<4)throw new Error("invalid arguments. Not enough observations. First and second arguments must contain at least four observations.");if(u.rho===void 0?p=0:p=u.rho,u.alternative===void 0?f="two-sided":f=u.alternative,y=V_r(r,e),w=uG(y),q=1/d0(g-3),p===0)switch(i="t-test for Pearson correlation coefficient",h=g-2,v=d0(h)*y/d0(1-y*y),f){case"greater":o=1-b0(v,h);break;case"less":o=b0(v,h);break;default:o=2*sG(b0(v,h),1-b0(v,h));break}else switch(i="Fisher's z transform test for Pearson correlation coefficient",v=(w-uG(p))*d0(g-3),f){case"greater":o=_0(-v);break;case"less":o=1-_0(-v);break;default:o=2*sG(_0(-v),1-_0(-v));break}switch(f){case"greater":n=[w0(w-q*Tf(1-a)),1];break;case"less":n=[-1,w0(w+q*Tf(1-a))];break;default:m=q*Tf(1-a/2),n=[w0(w-m),w0(w+m)];break}return c={},Le(c,"rejected",o<=a),Le(c,"alpha",a),Le(c,"pValue",o),Le(c,"statistic",v),Le(c,"ci",n),Le(c,"alternative",f),Le(c,"method",i),Le(c,"nullValue",p),Le(c,"pcorr",y),Le(c,"print",M_r),c}oG.exports=j_r});var lG=s((ODr,fG)=>{"use strict";var B_r=vG();fG.exports=B_r});var Of=s((SDr,cG)=>{"use strict";var k_r=tr(),G_r=128;function Af(r,e,t,i){var a,n,u,o,v,f,l,c,p,m,h,q,g;if(r<=0)return 0;if(r===1||t===0)return e[i];if(a=i,r<8){for(h=0,g=0;g<r;g++)h+=e[a],a+=t;return h}if(r<=G_r){for(n=e[a],u=e[a+t],o=e[a+2*t],v=e[a+3*t],f=e[a+4*t],l=e[a+5*t],c=e[a+6*t],p=e[a+7*t],a+=8*t,m=r%8,g=8;g<r-m;g+=8)n+=e[a],u+=e[a+t],o+=e[a+2*t],v+=e[a+3*t],f+=e[a+4*t],l+=e[a+5*t],c+=e[a+6*t],p+=e[a+7*t],a+=8*t;for(h=n+u+(o+v)+(f+l+(c+p)),g;g<r;g++)h+=e[a],a+=t;return h}return q=k_r(r/2),q-=q%8,Af(q,e,t,a)+Af(r-q,e,t,a+q*t)}cG.exports=Af});var mG=s((IDr,pG)=>{"use strict";var U_r=Of();function D_r(r,e,t){var i,a,n;if(r<=0)return 0;if(r===1||t===0)return e[0];if(t<0?i=(1-r)*t:i=0,r<8){for(a=0,n=0;n<r;n++)a+=e[i],i+=t;return a}return U_r(r,e,t,i)}pG.exports=D_r});var ba=s((NDr,gG)=>{"use strict";var H_r=O(),hG=mG(),W_r=Of();H_r(hG,"ndarray",W_r);gG.exports=hG});var If=s((FDr,qG)=>{"use strict";var Y_r=tr(),K_r=128;function Sf(r,e,t,i,a){var n,u,o,v,f,l,c,p,m,h,q,g,y;if(r<=0)return 0;if(r===1||i===0)return e+t[a];if(n=a,r<8){for(q=0,y=0;y<r;y++)q+=e+t[n],n+=i;return q}if(r<=K_r){for(u=e+t[n],o=e+t[n+i],v=e+t[n+2*i],f=e+t[n+3*i],l=e+t[n+4*i],c=e+t[n+5*i],p=e+t[n+6*i],m=e+t[n+7*i],n+=8*i,h=r%8,y=8;y<r-h;y+=8)u+=e+t[n],o+=e+t[n+i],v+=e+t[n+2*i],f+=e+t[n+3*i],l+=e+t[n+4*i],c+=e+t[n+5*i],p+=e+t[n+6*i],m+=e+t[n+7*i],n+=8*i;for(q=u+o+(v+f)+(l+c+(p+m)),y;y<r;y++)q+=e+t[n],n+=i;return q}return g=Y_r(r/2),g-=g%8,Sf(g,e,t,i,n)+Sf(r-g,e,t,i,n+g*i)}qG.exports=Sf});var wG=s((LDr,yG)=>{"use strict";var Q_r=If();function Z_r(r,e,t,i){var a,n,u;if(r<=0)return 0;if(r===1||i===0)return e+t[0];if(i<0?a=(1-r)*i:a=0,r<8){for(n=0,u=0;u<r;u++)n+=e+t[a],a+=i;return n}return Q_r(r,e,t,i,a)}yG.exports=Z_r});var Nf=s((PDr,dG)=>{"use strict";var J_r=O(),bG=wG(),$_r=If();J_r(bG,"ndarray",$_r);dG.exports=bG});var EG=s((RDr,_G)=>{"use strict";var X_r=ba(),z_r=Nf();function x_r(r,e,t){var i,a;return r<=0?NaN:r===1||t===0?e[0]:(i=X_r(r,e,t)/r,a=z_r(r,-i,e,t)/r,i+a)}_G.exports=x_r});var AG=s((MDr,TG)=>{"use strict";var rEr=ba().ndarray,eEr=Nf().ndarray;function tEr(r,e,t,i){var a,n;return r<=0?NaN:r===1||t===0?e[i]:(a=rEr(r,e,t,i)/r,n=eEr(r,-a,e,t,i)/r,a+n)}TG.exports=tEr});var IG=s((VDr,SG)=>{"use strict";var iEr=O(),OG=EG(),aEr=AG();iEr(OG,"ndarray",aEr);SG.exports=OG});var Ff=s((CDr,NG)=>{"use strict";var nEr=IG();NG.exports=nEr});var LG=s((jDr,FG)=>{"use strict";var uEr=Ff();function sEr(r,e,t){return uEr(r,e,t)}FG.exports=sEr});var RG=s((BDr,PG)=>{"use strict";var oEr=Ff().ndarray;function vEr(r,e,t,i){return oEr(r,e,t,i)}PG.exports=vEr});var CG=s((kDr,VG)=>{"use strict";var fEr=O(),MG=LG(),lEr=RG();fEr(MG,"ndarray",lEr);VG.exports=MG});var BG=s((GDr,jG)=>{"use strict";var cEr=CG();jG.exports=cEr});var GG=s((UDr,kG)=>{"use strict";var pEr=ba();function mEr(r,e,t,i){var a,n,u,o,v,f,l;if(f=r-e,r<=0||f<=0)return NaN;if(r===1||i===0)return 0;for(a=pEr(r,t,i)/r,i<0?n=(1-r)*i:n=0,u=0,o=0,l=0;l<r;l++)v=t[n]-a,u+=v*v,o+=v,n+=i;return u/f-o/r*(o/f)}kG.exports=mEr});var DG=s((DDr,UG)=>{"use strict";var hEr=ba().ndarray;function gEr(r,e,t,i,a){var n,u,o,v,f,l,c;if(l=r-e,r<=0||l<=0)return NaN;if(r===1||i===0)return 0;for(n=hEr(r,t,i,a)/r,u=a,o=0,v=0,c=0;c<r;c++)f=t[u]-n,o+=f*f,v+=f,u+=i;return o/l-v/r*(v/l)}UG.exports=gEr});var YG=s((HDr,WG)=>{"use strict";var qEr=O(),HG=GG(),yEr=DG();qEr(HG,"ndarray",yEr);WG.exports=HG});var Lf=s((WDr,KG)=>{"use strict";var wEr=YG();KG.exports=wEr});var ZG=s((YDr,QG)=>{"use strict";var bEr=Lf(),dEr=G();function _Er(r,e,t,i){return dEr(bEr(r,e,t,i))}QG.exports=_Er});var $G=s((KDr,JG)=>{"use strict";var EEr=Lf().ndarray,TEr=G();function AEr(r,e,t,i,a){return TEr(EEr(r,e,t,i,a))}JG.exports=AEr});var xG=s((QDr,zG)=>{"use strict";var OEr=O(),XG=ZG(),SEr=$G();OEr(XG,"ndarray",SEr);zG.exports=XG});var Pf=s((ZDr,rU)=>{"use strict";var IEr=xG();rU.exports=IEr});var tU=s((JDr,eU)=>{"use strict";var NEr=Pf();function FEr(r,e,t,i){return NEr(r,e,t,i)}eU.exports=FEr});var aU=s(($Dr,iU)=>{"use strict";var LEr=Pf().ndarray;function PEr(r,e,t,i,a){return LEr(r,e,t,i,a)}iU.exports=PEr});var sU=s((XDr,uU)=>{"use strict";var REr=O(),nU=tU(),MEr=aU();REr(nU,"ndarray",MEr);uU.exports=nU});var vU=s((zDr,oU)=>{"use strict";var VEr=sU();oU.exports=VEr});var cU=s((xDr,lU)=>{"use strict";var fU=si(),Rf=F(),CEr=Q();function jEr(r,e,t){return Rf(r)||Rf(e)||Rf(t)||e<=0||t<=0?NaN:r<=0?0:r===CEr?1:e*r>t?fU(e*r/(t+e*r),e/2,t/2,!0,!1):fU(t/(t+e*r),t/2,e/2,!0,!0)}lU.exports=jEr});var hU=s((rHr,mU)=>{"use strict";var BEr=Ee(),pU=si(),Mf=F(),kEr=Q();function GEr(r,e){if(Mf(r)||Mf(e)||r<=0||e<=0)return BEr(NaN);return t;function t(i){return Mf(i)?NaN:i<=0?0:i===kEr?1:r*i>e?pU(r*i/(e+r*i),r/2,e/2,!0,!1):pU(e/(e+r*i),e/2,r/2,!0,!0)}}mU.exports=GEr});var yU=s((eHr,qU)=>{"use strict";var UEr=O(),gU=cU(),DEr=hU();UEr(gU,"factory",DEr);qU.exports=gU});var bU=s((tHr,wU)=>{"use strict";function HEr(){return{alpha:.05}}wU.exports=HEr});var _U=s((iHr,dU)=>{"use strict";var WEr=z(),YEr=gr(),KEr=qr().isPrimitive,Vf=S(),QEr=Ke();function ZEr(r,e){if(!YEr(e))return new TypeError(Vf("invalid argument. Options argument must be an object. Value: `%s`.",e));if(WEr(e,"alpha")){if(r.alpha=e.alpha,!KEr(r.alpha)||QEr(r.alpha))return new TypeError(Vf("invalid option. `%s` option must be a number. Option: `%s`.","alpha",r.alpha));if(r.alpha<0||r.alpha>1)return new RangeError(Vf("invalid option. `%s` option must be a number on the interval: [0, 1]. Option: `%f`.","alpha",r.alpha))}return null}dU.exports=ZEr});var TU=s((aHr,EU)=>{"use strict";var JEr={numeric:!0};function $Er(r,e){return String(r).localeCompare(String(e),void 0,JEr)}function XEr(r){var e,t,i,a,n;for(t=Array.prototype.slice.call(r),e=t.length,t.sort($Er),a=1,n=0;a<e;a++)i=t[a],t[n]!==i&&(n+=1,t[n]=i);return t.length=n+1,t}EU.exports=XEr});var SU=s((nHr,OU)=>{"use strict";var zEr=qr().isPrimitive,E0=G(),AU=F(),xEr=S();function rTr(r){var e,t,i,a;if(i=0,a=0,arguments.length){if(!zEr(r))throw new TypeError(xEr("invalid argument. Must provide a number. Value: `%s`.",r));return t=r,u}return t=0,n;function n(o){return arguments.length===0?a===0?null:a===1?AU(i)?NaN:0:E0(i/(a-1)):(a+=1,e=o-t,t+=e/a,i+=e*(o-t),a<2?AU(i)?NaN:0:E0(i/(a-1)))}function u(o){return arguments.length===0?a===0?null:E0(i/a):(a+=1,e=o-t,i+=e*e,E0(i/a))}}OU.exports=rTr});var NU=s((uHr,IU)=>{"use strict";var eTr=SU();IU.exports=eTr});var LU=s((sHr,FU)=>{"use strict";var tTr=NU();function iTr(r,e,t){var i,a,n,u,o,v,f;for(a=t.length,i={},o=0;o<a;o++)for(n=tTr(),i[t[o]]={mean:0,sampleSize:0,SD:n},v=0;v<r.length;v++)e[v]===t[o]&&(i[t[o]].SD=n(r[v]));for(v=0;v<r.length;v++)i[e[v]].mean+=r[v],i[e[v]].sampleSize+=1;for(f=0;f<a;f++)u=i[t[f]].mean/i[t[f]].sampleSize,i[t[f]].mean=u;return i}FU.exports=iTr});var RU=s((oHr,PU)=>{"use strict";function aTr(r){var e,t,i,a;for(i=0,t=r.length,a=0;a<t;a++)e=r[a]-i,i+=e/(a+1);return i}PU.exports=aTr});var VU=s((vHr,MU)=>{"use strict";var nTr=typeof String.prototype.repeat<"u";MU.exports=nTr});var jU=s((fHr,CU)=>{"use strict";function uTr(r,e){var t,i;if(r.length===0||e===0)return"";for(t="",i=e;(i&1)===1&&(t+=r),i>>>=1,i!==0;)r+=r;return t}CU.exports=uTr});var kU=s((lHr,BU)=>{"use strict";var sTr=String.prototype.repeat;BU.exports=sTr});var UU=s((cHr,GU)=>{"use strict";var oTr=kU();function vTr(r,e){return oTr.call(r,e)}GU.exports=vTr});var HU=s((pHr,DU)=>{"use strict";var fTr=VU(),lTr=jU(),cTr=UU(),Cf;fTr?Cf=cTr:Cf=lTr;DU.exports=Cf});var KU=s((mHr,YU)=>{"use strict";var pTr=Re().isPrimitive,mTr=hr().isPrimitive,WU=S(),hTr=HU();function gTr(r,e){if(!mTr(r))throw new TypeError(WU("invalid argument. First argument must be a string. Value: `%s`.",r));if(!pTr(e))throw new TypeError(WU("invalid argument. Second argument must be a nonnegative integer. Value: `%s`.",e));return hTr(r,e)}YU.exports=gTr});var ZU=s((hHr,QU)=>{"use strict";var qTr=KU();QU.exports=qTr});var XU=s((gHr,$U)=>{"use strict";var yTr=Xr(),wTr=gr(),JU=z(),yt=Lt(),bTr=ZU(),wt=We(),dTr=Nr().isPrimitive,jf=S();function le(r){return r<=0?"":bTr(" ",r)}function _Tr(r){return e;function e(t){var i,a,n,u,o,v,f,l,c,p,m,h,q,g;if(q=4,a=!0,arguments.length>0){if(!wTr(t))throw new TypeError(jf("invalid argument. First argument must be an object. Value: `%s`.",t));if(JU(t,"digits")){if(!yTr(t.digits))throw new TypeError(jf("invalid option. `%s` option must be a positive integer. Option: `%s`.","digits",t.digits));q=t.digits}if(JU(t,"decision")){if(!dTr(t.decision))throw new TypeError(jf("invalid option. `%s` option must be a boolean. Option: `%s`.","decision",t.decision));a=t.decision}}return h=-q,g="",g+=r.method,g+=`

`,g+="Null Hypothesis: All Means Equal",g+=`
`,g+="Alternate Hypothesis: At Least one Mean not Equal",g+=`

`,o=yt(r.treatment.ss,h).toString(),m=yt(r.error.ss,h).toString(),n=yt(r.treatment.ms,h).toString(),c=yt(r.error.ms,h).toString(),u=r.treatment.df.toString(),p=r.error.df.toString(),i=yt(r.statistic,h).toString(),v=wt(wt(u.length,p.length),2),f=wt(wt(o.length,m.length),2),l=wt(wt(n.length,c.length),3),g+="              ",g+="df",g+=le(1+v),g+="SS",g+=le(2+f),g+="MS",g+=le(1+l),g+="F Score",g+=le(wt(7,i.length)-7+2),g+="P Value",g+=`
`,g+="Treatment",g+=le(5),g+=r.treatment.df,g+=le(3+v-u.length),g+=o,g+=le(4+f-o.length),g+=n,g+=le(3+l-n.length),g+=i,g+=le(wt(7,i.length)-i.length+2),g+=yt(r.pValue,h),g+=`
`,g+="Errors",g+="        ",g+=r.error.df,g+=le(3+v-p.length),g+=m,g+=le(4+f-m.length),g+=c,a&&(g+=`

`,r.rejected?(g+="Reject Null: ",g+=yt(r.pValue,h),g+=" <= ",g+=r.alpha):(g+="Fail to Reject Null: ",g+=yt(r.pValue,h),g+=" >= ",g+=r.alpha)),g}}$U.exports=_Tr});var xU=s((qHr,zU)=>{"use strict";var ETr=ei().primitives,TTr=ti(),ATr=pe(),Or=$e(),OTr=z(),T0=S(),STr=yU(),ITr=bU(),NTr=_U(),FTr=TU(),LTr=LU(),PTr=RU(),RTr=XU();function MTr(r,e,t){var i,a,n,u,o,v,f,l,c,p,m,h,q,g,y,w,b,T,_,E;if(!TTr(r)&&!ETr(r))throw new TypeError(T0("invalid argument. First argument must be a numeric array. Value: `%s`.",r));if(w=ITr(),arguments.length>2&&(b=NTr(w,t),b))throw b;if(g=r.length,g<=1)throw new RangeError(T0("invalid argument. First argument must contain at least two elements. Value: `%s`.",r));if(!ATr(e))throw new TypeError(T0("invalid argument. Second argument must be an array. Value: `%s`.",p));if(p=FTr(e),l=p.length,l<=1)throw new RangeError(T0("invalid argument. Second argument must contain at least two unique elements. Value: `%s`.",p));if(g!==e.length)throw new RangeError("invalid arguments. First and second arguments must be arrays having the same length.");for(u=0,n=0,m=LTr(r,e,p),f=PTr(r),E=0;E<g;E++)_=(r[E]-f)*(r[E]-f),u+=_;_=0;for(v in m)OTr(m,v)&&(_=(m[v].mean-f)*(m[v].mean-f),n+=m[v].sampleSize*_);return h=l-1,q=g-l,o=u-n,i=n/h,a=o/q,c=i/a,y=1-STr(c,h,q),T={},v={},Or(v,"df",h),Or(v,"ss",n),Or(v,"ms",i),Or(T,"treatment",v),b={},Or(b,"df",q),Or(b,"ss",o),Or(b,"ms",a),Or(T,"error",b),Or(T,"statistic",c),Or(T,"pValue",y),Or(T,"means",m),Or(T,"method","One-Way ANOVA"),Or(T,"alpha",w.alpha),Or(T,"rejected",y<=w.alpha),Or(T,"print",RTr(T)),T}zU.exports=MTr});var eD=s((yHr,rD)=>{"use strict";var VTr=xU();rD.exports=VTr});var tD=ce(zI()),iD=ce(dL()),aD=ce(GB()),nD=ce(tk()),Bf=ce(lG()),kf=ce(rv()),Gf=ce(BG()),Uf=ce(vU()),Df=ce(Bn()),uD=ce(eD());function CTr(r){let e=r.length,t=r.sort(function(f,l){return f-l}),i=(0,Gf.default)(e,t,1),a=(0,Uf.default)(e,1,t,1),n=0;for(let f=0;f<e;f++){let l=(f+1)/e,c=(0,Df.default)(t[f],i,a),p=Math.abs(l-c);p>n&&(n=p)}let u=Math.sqrt(e),o=(u+.12+.11/u)*n,v=2*Math.exp(-2*o*o);return{statistic:n,pValue:Math.min(Math.max(v,0),1),mean:i,std:a}}function jTr(r,e,t){var i=r.slice(),a=e.slice(),n=i.length,u=a.length,o=[],v;for(v=0;v<n;v++)o.push({value:i[v],group:1});for(v=0;v<u;v++)o.push({value:a[v],group:2});o.sort(function(d,R){return d.value-R.value});for(var f=new Array(o.length),l=0;l<o.length;){for(var c=l,p=l;p+1<o.length&&o[p+1].value===o[c].value;)p++;var m=(c+p+2)/2;for(v=c;v<=p;v++)f[v]=m;l=p+1}var h=0,q=0;for(v=0;v<o.length;v++)o[v].group===1?h+=f[v]:q+=f[v];var g=h-n*(n+1)/2,y=q-u*(u+1)/2,w=Math.min(g,y),b=n*u/2,T=n*u*(n+u+1)/12,_;t?_=(w-b+.5*(w<b?1:-1))/Math.sqrt(T):_=(w-b)/Math.sqrt(T);var E=2*(1-(0,Df.default)(Math.abs(_),0,1));return{U1:g,U2:y,U:w,z:_,pValue:E}}window.stdlib={stats:{chi2test:tD.default,wilcoxon:iD.default,ttest:aD.default,ttest2:nD.default,anova1:uD.default,pearson:Bf.default,spearman:function(r,e,t){return(0,Bf.default)((0,kf.default)(r),(0,kf.default)(e),t)},ksNormalTest:CTr,stdev:Uf.default,mean:Gf.default,mannWhitneyU:jTr}};})();
/*! Bundled license information:

@stdlib/utils-define-property/lib/define_property.js:
@stdlib/utils-define-property/lib/has_define_property_support.js:
@stdlib/assert-has-bigint-support/lib/main.js:
@stdlib/assert-has-bigint-support/lib/index.js:
@stdlib/regexp-function-name/lib/main.js:
@stdlib/regexp-function-name/lib/index.js:
@stdlib/ndarray-base-dtype-enum2str/lib/main.js:
@stdlib/ndarray-base-dtype-enum2str/lib/index.js:
@stdlib/math-base-special-abs/lib/main.js:
@stdlib/complex-float32-real/lib/main.js:
@stdlib/complex-float32-real/lib/index.js:
@stdlib/complex-float32-imag/lib/main.js:
@stdlib/complex-float32-imag/lib/index.js:
@stdlib/strided-base-reinterpret-complex64/lib/main.js:
@stdlib/strided-base-reinterpret-complex64/lib/index.js:
@stdlib/strided-base-reinterpret-complex128/lib/main.js:
@stdlib/strided-base-reinterpret-complex128/lib/index.js:
@stdlib/assert-is-dataview/lib/main.js:
@stdlib/assert-is-dataview/lib/index.js:
@stdlib/assert-has-dataview-support/lib/dataview.js:
@stdlib/assert-has-dataview-support/lib/main.js:
@stdlib/assert-has-dataview-support/lib/index.js:
@stdlib/array-dataview/lib/main.js:
@stdlib/array-dataview/lib/polyfill.js:
@stdlib/array-dataview/lib/index.js:
@stdlib/bigint-ctor/lib/main.js:
@stdlib/bigint-ctor/lib/index.js:
@stdlib/ndarray-orders/lib/enum.js:
@stdlib/ndarray-index-modes/lib/enum.js:
@stdlib/ndarray-base-ctor/lib/meta2dataview.js:
@stdlib/number-float64-base-to-int64-bytes/lib/main.js:
@stdlib/number-float64-base-to-int64-bytes/lib/assign.js:
@stdlib/number-float64-base-to-int64-bytes/lib/index.js:
@stdlib/ndarray-base-ctor/lib/meta2dataview.polyfill.js:
@stdlib/ndarray-base-dtype-str2enum/lib/main.js:
@stdlib/ndarray-base-dtype-str2enum/lib/index.js:
@stdlib/ndarray-base-dtype-resolve-enum/lib/main.js:
@stdlib/ndarray-base-dtype-resolve-enum/lib/index.js:
@stdlib/ndarray-base-dtype-resolve-str/lib/main.js:
@stdlib/ndarray-base-dtype-resolve-str/lib/index.js:
@stdlib/ndarray-base-dtype-desc/lib/table.js:
@stdlib/ndarray-base-dtype-desc/lib/index.js:
@stdlib/ndarray-base-dtype-char/lib/table.js:
@stdlib/array-base-filled/lib/main.js:
@stdlib/array-base-filled/lib/index.js:
@stdlib/array-base-zeros/lib/main.js:
@stdlib/array-base-zeros/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2021 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/utils-define-property/lib/builtin.js:
@stdlib/utils-define-property/lib/polyfill.js:
@stdlib/utils-define-property/lib/index.js:
@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js:
@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js:
@stdlib/assert-is-number/lib/primitive.js:
@stdlib/assert-has-symbol-support/lib/main.js:
@stdlib/assert-has-symbol-support/lib/index.js:
@stdlib/assert-has-tostringtag-support/lib/main.js:
@stdlib/assert-has-tostringtag-support/lib/index.js:
@stdlib/utils-native-class/lib/tostring.js:
@stdlib/utils-native-class/lib/main.js:
@stdlib/assert-has-own-property/lib/main.js:
@stdlib/assert-has-own-property/lib/index.js:
@stdlib/symbol-ctor/lib/main.js:
@stdlib/symbol-ctor/lib/index.js:
@stdlib/utils-native-class/lib/tostringtag.js:
@stdlib/utils-native-class/lib/polyfill.js:
@stdlib/utils-native-class/lib/index.js:
@stdlib/number-ctor/lib/main.js:
@stdlib/number-ctor/lib/index.js:
@stdlib/assert-is-number/lib/tostring.js:
@stdlib/assert-is-number/lib/try2serialize.js:
@stdlib/assert-is-number/lib/object.js:
@stdlib/assert-is-number/lib/main.js:
@stdlib/assert-is-number/lib/index.js:
@stdlib/constants-float64-pinf/lib/index.js:
@stdlib/constants-float64-ninf/lib/index.js:
@stdlib/math-base-special-floor/lib/main.js:
@stdlib/math-base-special-floor/lib/index.js:
@stdlib/math-base-assert-is-integer/lib/main.js:
@stdlib/math-base-assert-is-integer/lib/index.js:
@stdlib/assert-is-integer/lib/integer.js:
@stdlib/assert-is-integer/lib/primitive.js:
@stdlib/assert-is-integer/lib/object.js:
@stdlib/assert-is-integer/lib/main.js:
@stdlib/assert-is-integer/lib/index.js:
@stdlib/assert-is-nonnegative-integer/lib/primitive.js:
@stdlib/assert-is-nonnegative-integer/lib/object.js:
@stdlib/assert-is-nonnegative-integer/lib/main.js:
@stdlib/assert-is-nonnegative-integer/lib/index.js:
@stdlib/assert-is-boolean/lib/primitive.js:
@stdlib/assert-is-boolean/lib/tostring.js:
@stdlib/assert-is-boolean/lib/try2serialize.js:
@stdlib/assert-is-boolean/lib/object.js:
@stdlib/assert-is-boolean/lib/main.js:
@stdlib/assert-is-boolean/lib/index.js:
@stdlib/utils-global/lib/codegen.js:
@stdlib/utils-global/lib/self.js:
@stdlib/utils-global/lib/window.js:
@stdlib/utils-define-nonenumerable-read-only-accessor/lib/main.js:
@stdlib/utils-define-nonenumerable-read-only-accessor/lib/index.js:
@stdlib/assert-is-string/lib/primitive.js:
@stdlib/assert-is-string/lib/valueof.js:
@stdlib/assert-is-string/lib/try2valueof.js:
@stdlib/assert-is-string/lib/object.js:
@stdlib/assert-is-string/lib/main.js:
@stdlib/assert-is-string/lib/index.js:
@stdlib/assert-is-positive-integer/lib/primitive.js:
@stdlib/assert-is-positive-integer/lib/object.js:
@stdlib/assert-is-positive-integer/lib/main.js:
@stdlib/assert-is-positive-integer/lib/index.js:
@stdlib/utils-keys/lib/builtin.js:
@stdlib/utils-keys/lib/has_arguments_bug.js:
@stdlib/utils-keys/lib/has_builtin.js:
@stdlib/assert-is-arguments/lib/main.js:
@stdlib/assert-is-arguments/lib/detect.js:
@stdlib/math-base-assert-is-nan/lib/main.js:
@stdlib/math-base-assert-is-nan/lib/index.js:
@stdlib/assert-is-nan/lib/primitive.js:
@stdlib/assert-is-nan/lib/object.js:
@stdlib/assert-is-nan/lib/main.js:
@stdlib/assert-is-nan/lib/index.js:
@stdlib/assert-is-enumerable-property/lib/native.js:
@stdlib/assert-is-enumerable-property/lib/has_string_enumerability_bug.js:
@stdlib/assert-is-enumerable-property/lib/main.js:
@stdlib/assert-is-enumerable-property/lib/index.js:
@stdlib/assert-is-array/lib/main.js:
@stdlib/assert-is-array/lib/index.js:
@stdlib/constants-uint32-max/lib/index.js:
@stdlib/assert-is-arguments/lib/polyfill.js:
@stdlib/assert-is-arguments/lib/index.js:
@stdlib/utils-keys/lib/builtin_wrapper.js:
@stdlib/assert-tools-array-function/lib/main.js:
@stdlib/assert-tools-array-function/lib/index.js:
@stdlib/assert-is-object-like/lib/main.js:
@stdlib/assert-is-object-like/lib/index.js:
@stdlib/utils-noop/lib/main.js:
@stdlib/utils-noop/lib/index.js:
@stdlib/utils-keys/lib/has_enumerable_prototype_bug.js:
@stdlib/utils-keys/lib/has_non_enumerable_properties_bug.js:
@stdlib/constants-array-max-typed-array-length/lib/index.js:
@stdlib/assert-is-collection/lib/main.js:
@stdlib/assert-is-collection/lib/index.js:
@stdlib/utils-index-of/lib/main.js:
@stdlib/utils-index-of/lib/index.js:
@stdlib/utils-type-of/lib/fixtures/re.js:
@stdlib/utils-type-of/lib/fixtures/nodelist.js:
@stdlib/utils-type-of/lib/fixtures/typedarray.js:
@stdlib/utils-type-of/lib/check.js:
@stdlib/regexp-function-name/lib/regexp.js:
@stdlib/assert-is-buffer/lib/main.js:
@stdlib/assert-is-buffer/lib/index.js:
@stdlib/utils-constructor-name/lib/main.js:
@stdlib/utils-constructor-name/lib/index.js:
@stdlib/utils-type-of/lib/main.js:
@stdlib/utils-type-of/lib/polyfill.js:
@stdlib/utils-type-of/lib/index.js:
@stdlib/utils-keys/lib/is_constructor_prototype.js:
@stdlib/utils-keys/lib/window.js:
@stdlib/utils-keys/lib/has_automation_equality_bug.js:
@stdlib/utils-keys/lib/has_window.js:
@stdlib/utils-keys/lib/is_constructor_prototype_wrapper.js:
@stdlib/utils-keys/lib/polyfill.js:
@stdlib/utils-keys/lib/main.js:
@stdlib/utils-keys/lib/index.js:
@stdlib/assert-is-object/lib/main.js:
@stdlib/assert-is-object/lib/index.js:
@stdlib/assert-is-function/lib/main.js:
@stdlib/assert-is-function/lib/index.js:
@stdlib/utils-get-prototype-of/lib/native.js:
@stdlib/utils-get-prototype-of/lib/proto.js:
@stdlib/utils-get-prototype-of/lib/polyfill.js:
@stdlib/utils-get-prototype-of/lib/detect.js:
@stdlib/utils-get-prototype-of/lib/main.js:
@stdlib/utils-get-prototype-of/lib/index.js:
@stdlib/assert-is-plain-object/lib/main.js:
@stdlib/assert-is-plain-object/lib/index.js:
@stdlib/object-inverse/lib/main.js:
@stdlib/object-inverse/lib/index.js:
@stdlib/ndarray-base-bytes-per-element/lib/main.js:
@stdlib/ndarray-base-bytes-per-element/lib/index.js:
@stdlib/ndarray-base-iteration-order/lib/main.js:
@stdlib/ndarray-base-iteration-order/lib/index.js:
@stdlib/math-base-special-abs/lib/index.js:
@stdlib/ndarray-base-strides2order/lib/main.js:
@stdlib/ndarray-base-strides2order/lib/index.js:
@stdlib/assert-is-float64array/lib/main.js:
@stdlib/assert-is-float64array/lib/index.js:
@stdlib/assert-has-float64array-support/lib/float64array.js:
@stdlib/assert-has-float64array-support/lib/main.js:
@stdlib/assert-has-float64array-support/lib/index.js:
@stdlib/array-float64/lib/main.js:
@stdlib/array-float64/lib/polyfill.js:
@stdlib/array-float64/lib/index.js:
@stdlib/assert-is-float32array/lib/main.js:
@stdlib/assert-is-float32array/lib/index.js:
@stdlib/assert-has-float32array-support/lib/float32array.js:
@stdlib/assert-has-float32array-support/lib/main.js:
@stdlib/assert-has-float32array-support/lib/index.js:
@stdlib/array-float32/lib/main.js:
@stdlib/array-float32/lib/polyfill.js:
@stdlib/array-float32/lib/index.js:
@stdlib/assert-is-uint32array/lib/main.js:
@stdlib/assert-is-uint32array/lib/index.js:
@stdlib/assert-has-uint32array-support/lib/uint32array.js:
@stdlib/assert-has-uint32array-support/lib/main.js:
@stdlib/assert-has-uint32array-support/lib/index.js:
@stdlib/array-uint32/lib/main.js:
@stdlib/array-uint32/lib/polyfill.js:
@stdlib/array-uint32/lib/index.js:
@stdlib/assert-is-int32array/lib/main.js:
@stdlib/assert-is-int32array/lib/index.js:
@stdlib/constants-int32-max/lib/index.js:
@stdlib/constants-int32-min/lib/index.js:
@stdlib/assert-has-int32array-support/lib/int32array.js:
@stdlib/assert-has-int32array-support/lib/main.js:
@stdlib/assert-has-int32array-support/lib/index.js:
@stdlib/array-int32/lib/main.js:
@stdlib/array-int32/lib/polyfill.js:
@stdlib/array-int32/lib/index.js:
@stdlib/assert-is-uint16array/lib/main.js:
@stdlib/assert-is-uint16array/lib/index.js:
@stdlib/constants-uint16-max/lib/index.js:
@stdlib/assert-has-uint16array-support/lib/uint16array.js:
@stdlib/assert-has-uint16array-support/lib/main.js:
@stdlib/assert-has-uint16array-support/lib/index.js:
@stdlib/array-uint16/lib/main.js:
@stdlib/array-uint16/lib/polyfill.js:
@stdlib/array-uint16/lib/index.js:
@stdlib/assert-is-int16array/lib/main.js:
@stdlib/assert-is-int16array/lib/index.js:
@stdlib/constants-int16-max/lib/index.js:
@stdlib/constants-int16-min/lib/index.js:
@stdlib/assert-has-int16array-support/lib/int16array.js:
@stdlib/assert-has-int16array-support/lib/main.js:
@stdlib/assert-has-int16array-support/lib/index.js:
@stdlib/array-int16/lib/main.js:
@stdlib/array-int16/lib/polyfill.js:
@stdlib/array-int16/lib/index.js:
@stdlib/assert-is-uint8array/lib/main.js:
@stdlib/assert-is-uint8array/lib/index.js:
@stdlib/constants-uint8-max/lib/index.js:
@stdlib/assert-has-uint8array-support/lib/uint8array.js:
@stdlib/assert-has-uint8array-support/lib/main.js:
@stdlib/assert-has-uint8array-support/lib/index.js:
@stdlib/array-uint8/lib/main.js:
@stdlib/array-uint8/lib/polyfill.js:
@stdlib/array-uint8/lib/index.js:
@stdlib/assert-is-uint8clampedarray/lib/main.js:
@stdlib/assert-is-uint8clampedarray/lib/index.js:
@stdlib/assert-has-uint8clampedarray-support/lib/uint8clampedarray.js:
@stdlib/assert-has-uint8clampedarray-support/lib/main.js:
@stdlib/assert-has-uint8clampedarray-support/lib/index.js:
@stdlib/array-uint8c/lib/main.js:
@stdlib/array-uint8c/lib/polyfill.js:
@stdlib/array-uint8c/lib/index.js:
@stdlib/assert-is-int8array/lib/main.js:
@stdlib/assert-is-int8array/lib/index.js:
@stdlib/constants-int8-max/lib/index.js:
@stdlib/constants-int8-min/lib/index.js:
@stdlib/assert-has-int8array-support/lib/int8array.js:
@stdlib/assert-has-int8array-support/lib/main.js:
@stdlib/assert-has-int8array-support/lib/index.js:
@stdlib/array-int8/lib/main.js:
@stdlib/array-int8/lib/polyfill.js:
@stdlib/array-int8/lib/index.js:
@stdlib/constants-array-max-array-length/lib/index.js:
@stdlib/assert-is-array-like-object/lib/main.js:
@stdlib/assert-is-array-like-object/lib/index.js:
@stdlib/assert-is-arraybuffer/lib/main.js:
@stdlib/assert-is-arraybuffer/lib/index.js:
@stdlib/assert-is-string-array/lib/index.js:
@stdlib/utils-define-read-only-property/lib/main.js:
@stdlib/utils-define-read-only-property/lib/index.js:
@stdlib/complex-float64-ctor/lib/tostring.js:
@stdlib/complex-float64-ctor/lib/tojson.js:
@stdlib/complex-float64-ctor/lib/main.js:
@stdlib/complex-float64-ctor/lib/index.js:
@stdlib/number-float64-base-to-float32/lib/main.js:
@stdlib/number-float64-base-to-float32/lib/polyfill.js:
@stdlib/number-float64-base-to-float32/lib/index.js:
@stdlib/complex-float32-ctor/lib/tostring.js:
@stdlib/complex-float32-ctor/lib/tojson.js:
@stdlib/complex-float32-ctor/lib/main.js:
@stdlib/complex-float32-ctor/lib/index.js:
@stdlib/assert-is-complex-like/lib/main.js:
@stdlib/assert-is-complex-like/lib/index.js:
@stdlib/math-base-assert-is-even/lib/main.js:
@stdlib/math-base-assert-is-even/lib/index.js:
@stdlib/assert-has-iterator-symbol-support/lib/main.js:
@stdlib/assert-has-iterator-symbol-support/lib/index.js:
@stdlib/symbol-iterator/lib/main.js:
@stdlib/symbol-iterator/lib/index.js:
@stdlib/array-complex64/lib/from_iterator.js:
@stdlib/array-complex64/lib/from_iterator_map.js:
@stdlib/array-complex64/lib/from_array.js:
@stdlib/array-complex64/lib/main.js:
@stdlib/array-complex64/lib/index.js:
@stdlib/complex-float64-real/lib/main.js:
@stdlib/complex-float64-real/lib/index.js:
@stdlib/complex-float64-imag/lib/main.js:
@stdlib/complex-float64-imag/lib/index.js:
@stdlib/array-complex128/lib/from_iterator.js:
@stdlib/array-complex128/lib/from_iterator_map.js:
@stdlib/array-complex128/lib/from_array.js:
@stdlib/array-complex128/lib/index.js:
@stdlib/array-dtype/lib/main.js:
@stdlib/array-dtype/lib/index.js:
@stdlib/ndarray-base-ctor/lib/is_column_major_contiguous.js:
@stdlib/ndarray-base-ctor/lib/is_row_major_contiguous.js:
@stdlib/ndarray-base-minmax-view-buffer-index/lib/main.js:
@stdlib/ndarray-base-minmax-view-buffer-index/lib/assign.js:
@stdlib/ndarray-base-minmax-view-buffer-index/lib/index.js:
@stdlib/ndarray-base-ctor/lib/is_contiguous.js:
@stdlib/ndarray-base-ctor/lib/copy_flags.js:
@stdlib/ndarray-base-ctor/lib/iget.js:
@stdlib/ndarray-base-ctor/lib/iset.js:
@stdlib/ndarray-base-ctor/lib/set.js:
@stdlib/ndarray-base-ctor/lib/get.js:
@stdlib/ndarray-base-ctor/lib/tojson.js:
@stdlib/utils-escape-regexp-string/lib/main.js:
@stdlib/utils-escape-regexp-string/lib/index.js:
@stdlib/assert-is-regexp/lib/exec.js:
@stdlib/assert-is-regexp/lib/try2exec.js:
@stdlib/assert-is-regexp/lib/main.js:
@stdlib/assert-is-regexp/lib/index.js:
@stdlib/string-replace/lib/main.js:
@stdlib/string-replace/lib/index.js:
@stdlib/ndarray-base-ctor/lib/tostring.js:
@stdlib/assert-is-little-endian/lib/ctors.js:
@stdlib/assert-is-little-endian/lib/main.js:
@stdlib/assert-is-little-endian/lib/index.js:
@stdlib/assert-has-arraybuffer-support/lib/arraybuffer.js:
@stdlib/assert-has-arraybuffer-support/lib/main.js:
@stdlib/assert-has-arraybuffer-support/lib/index.js:
@stdlib/array-buffer/lib/main.js:
@stdlib/array-buffer/lib/polyfill.js:
@stdlib/array-buffer/lib/index.js:
@stdlib/ndarray-orders/lib/main.js:
@stdlib/ndarray-orders/lib/index.js:
@stdlib/ndarray-index-modes/lib/main.js:
@stdlib/ndarray-index-modes/lib/index.js:
@stdlib/ndarray-base-ctor/lib/main.js:
@stdlib/ndarray-base-ctor/lib/index.js:
@stdlib/assert-is-ndarray-like/lib/main.js:
@stdlib/assert-is-ndarray-like/lib/index.js:
@stdlib/array-shape/lib/main.js:
@stdlib/array-shape/lib/index.js:
@stdlib/assert-is-array-like/lib/main.js:
@stdlib/assert-is-array-like/lib/index.js:
@stdlib/assert-tools-array-like-function/lib/main.js:
@stdlib/assert-tools-array-like-function/lib/index.js:
@stdlib/assert-is-nonnegative-integer-array/lib/index.js:
@stdlib/assert-is-integer-array/lib/index.js:
@stdlib/ndarray-base-assert-is-order/lib/main.js:
@stdlib/ndarray-base-assert-is-order/lib/index.js:
@stdlib/assert-has-property/lib/main.js:
@stdlib/assert-has-property/lib/index.js:
@stdlib/ndarray-base-dtype-desc/lib/main.js:
@stdlib/ndarray-base-dtype-char/lib/main.js:
@stdlib/ndarray-base-dtype-char/lib/index.js:
@stdlib/ndarray-base-assert-is-data-type/lib/main.js:
@stdlib/ndarray-base-assert-is-data-type/lib/index.js:
@stdlib/ndarray-base-assert-is-buffer-length-compatible/lib/main.js:
@stdlib/ndarray-base-assert-is-buffer-length-compatible/lib/index.js:
@stdlib/ndarray-base-numel/lib/main.js:
@stdlib/ndarray-base-numel/lib/index.js:
@stdlib/utils-inherit/lib/validate.js:
@stdlib/utils-inherit/lib/native.js:
@stdlib/utils-inherit/lib/polyfill.js:
@stdlib/utils-inherit/lib/detect.js:
@stdlib/utils-inherit/lib/main.js:
@stdlib/utils-inherit/lib/index.js:
@stdlib/ndarray-base-clamp-index/lib/main.js:
@stdlib/ndarray-base-clamp-index/lib/index.js:
@stdlib/ndarray-base-wrap-index/lib/main.js:
@stdlib/ndarray-base-wrap-index/lib/index.js:
@stdlib/ndarray-base-assert-is-index-mode/lib/main.js:
@stdlib/ndarray-base-assert-is-index-mode/lib/index.js:
@stdlib/ndarray-base-ind/lib/main.js:
@stdlib/ndarray-base-ind/lib/index.js:
@stdlib/ndarray-ctor/lib/iget.js:
@stdlib/ndarray-ctor/lib/iset.js:
@stdlib/ndarray-ctor/lib/get.js:
@stdlib/ndarray-ctor/lib/set.js:
@stdlib/ndarray-ctor/lib/copy_array.js:
@stdlib/ndarray-ctor/lib/validate.js:
@stdlib/ndarray-ctor/lib/main.js:
@stdlib/ndarray-ctor/lib/index.js:
@stdlib/ndarray-base-vind2bind/lib/main.js:
@stdlib/ndarray-base-vind2bind/lib/index.js:
@stdlib/math-base-special-ceil/lib/main.js:
@stdlib/math-base-special-ceil/lib/index.js:
@stdlib/math-base-special-trunc/lib/main.js:
@stdlib/math-base-special-trunc/lib/index.js:
@stdlib/ndarray-base-ind2sub/lib/assign.js:
@stdlib/ndarray-base-ind2sub/lib/main.js:
@stdlib/ndarray-base-ind2sub/lib/index.js:
@stdlib/math-base-assert-is-negative-zero/lib/main.js:
@stdlib/math-base-assert-is-negative-zero/lib/index.js:
@stdlib/math-base-special-min/lib/main.js:
@stdlib/math-base-special-min/lib/index.js:
@stdlib/math-base-assert-is-infinite/lib/main.js:
@stdlib/math-base-assert-is-infinite/lib/index.js:
@stdlib/number-float64-base-get-high-word/lib/high.js:
@stdlib/number-float64-base-get-high-word/lib/main.js:
@stdlib/number-float64-base-get-high-word/lib/index.js:
@stdlib/number-float64-base-set-high-word/lib/high.js:
@stdlib/number-float64-base-set-high-word/lib/main.js:
@stdlib/number-float64-base-set-high-word/lib/index.js:
@stdlib/constants-float64-exponent-bias/lib/index.js:
@stdlib/math-base-special-ln/lib/index.js:
@stdlib/math-base-special-kernel-cos/lib/index.js:
@stdlib/math-base-special-kernel-sin/lib/index.js:
@stdlib/constants-float64-high-word-exponent-mask/lib/index.js:
@stdlib/constants-float64-high-word-significand-mask/lib/index.js:
@stdlib/number-float64-base-get-low-word/lib/low.js:
@stdlib/number-float64-base-get-low-word/lib/main.js:
@stdlib/number-float64-base-get-low-word/lib/index.js:
@stdlib/number-float64-base-from-words/lib/indices.js:
@stdlib/number-float64-base-from-words/lib/main.js:
@stdlib/number-float64-base-from-words/lib/index.js:
@stdlib/constants-float64-max-base2-exponent/lib/index.js:
@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js:
@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js:
@stdlib/number-float64-base-to-words/lib/indices.js:
@stdlib/number-float64-base-to-words/lib/assign.js:
@stdlib/number-float64-base-to-words/lib/main.js:
@stdlib/number-float64-base-to-words/lib/index.js:
@stdlib/math-base-special-copysign/lib/main.js:
@stdlib/math-base-special-copysign/lib/index.js:
@stdlib/constants-float64-smallest-normal/lib/index.js:
@stdlib/number-float64-base-normalize/lib/assign.js:
@stdlib/number-float64-base-normalize/lib/main.js:
@stdlib/number-float64-base-normalize/lib/index.js:
@stdlib/number-float64-base-exponent/lib/main.js:
@stdlib/number-float64-base-exponent/lib/index.js:
@stdlib/math-base-special-ldexp/lib/main.js:
@stdlib/math-base-special-ldexp/lib/index.js:
@stdlib/math-base-special-round/lib/main.js:
@stdlib/math-base-special-round/lib/index.js:
@stdlib/math-base-special-rempio2/lib/index.js:
@stdlib/math-base-special-cos/lib/index.js:
@stdlib/math-base-special-sin/lib/index.js:
@stdlib/constants-float64-pi/lib/index.js:
@stdlib/math-base-special-sinpi/lib/main.js:
@stdlib/math-base-special-sinpi/lib/index.js:
@stdlib/math-base-special-gammaln/lib/index.js:
@stdlib/math-base-special-exp/lib/index.js:
@stdlib/constants-float64-sqrt-two-pi/lib/index.js:
@stdlib/constants-float64-max-ln/lib/index.js:
@stdlib/math-base-assert-is-odd/lib/main.js:
@stdlib/math-base-assert-is-odd/lib/index.js:
@stdlib/math-base-special-sqrt/lib/main.js:
@stdlib/math-base-special-sqrt/lib/index.js:
@stdlib/number-float64-base-set-low-word/lib/low.js:
@stdlib/number-float64-base-set-low-word/lib/main.js:
@stdlib/number-float64-base-set-low-word/lib/index.js:
@stdlib/number-uint32-base-to-int32/lib/main.js:
@stdlib/number-uint32-base-to-int32/lib/index.js:
@stdlib/math-base-special-pow/lib/y_is_infinite.js:
@stdlib/constants-float64-ln-two/lib/index.js:
@stdlib/math-base-special-pow/lib/index.js:
@stdlib/constants-float64-eulergamma/lib/index.js:
@stdlib/math-base-special-gamma/lib/index.js:
@stdlib/constants-float64-sqrt-eps/lib/index.js:
@stdlib/constants-float64-max/lib/index.js:
@stdlib/utils-eval/lib/index.js:
@stdlib/assert-has-generator-support/lib/main.js:
@stdlib/assert-has-generator-support/lib/index.js:
@stdlib/constants-float64-eps/lib/index.js:
@stdlib/math-base-tools-sum-series/lib/generators.js:
@stdlib/math-base-tools-sum-series/lib/basic.js:
@stdlib/math-base-tools-sum-series/lib/index.js:
@stdlib/math-base-special-erfc/lib/index.js:
@stdlib/constants-float64-min-ln/lib/index.js:
@stdlib/math-base-tools-evalpoly/lib/main.js:
@stdlib/math-base-tools-evalpoly/lib/factory.js:
@stdlib/math-base-tools-evalpoly/lib/index.js:
@stdlib/constants-float64-two-pi/lib/index.js:
@stdlib/math-base-special-gamma-lanczos-sum-expg-scaled/lib/index.js:
@stdlib/math-base-assert-is-positive-zero/lib/main.js:
@stdlib/math-base-assert-is-positive-zero/lib/index.js:
@stdlib/math-base-special-max/lib/main.js:
@stdlib/math-base-special-max/lib/index.js:
@stdlib/constants-float64-gamma-lanczos-g/lib/index.js:
@stdlib/constants-float64-e/lib/index.js:
@stdlib/constants-float64-half-ln-two/lib/index.js:
@stdlib/math-base-special-expm1/lib/index.js:
@stdlib/math-base-special-powm1/lib/index.js:
@stdlib/math-base-special-log1p/lib/index.js:
@stdlib/math-base-special-gamma1pm1/lib/index.js:
@stdlib/constants-float32-smallest-normal/lib/index.js:
@stdlib/math-base-tools-continued-fraction/lib/generators.js:
@stdlib/math-base-tools-continued-fraction/lib/basic.js:
@stdlib/math-base-tools-continued-fraction/lib/index.js:
@stdlib/math-base-special-gammainc/lib/index.js:
@stdlib/stats-base-dists-gamma-cdf/lib/main.js:
@stdlib/utils-constant-function/lib/main.js:
@stdlib/utils-constant-function/lib/index.js:
@stdlib/stats-base-dists-degenerate-cdf/lib/main.js:
@stdlib/stats-base-dists-degenerate-cdf/lib/factory.js:
@stdlib/stats-base-dists-degenerate-cdf/lib/index.js:
@stdlib/stats-base-dists-gamma-cdf/lib/factory.js:
@stdlib/stats-base-dists-gamma-cdf/lib/index.js:
@stdlib/stats-base-dists-chisquare-cdf/lib/main.js:
@stdlib/stats-base-dists-chisquare-cdf/lib/factory.js:
@stdlib/stats-base-dists-chisquare-cdf/lib/index.js:
@stdlib/constants-float64-max-safe-integer/lib/index.js:
@stdlib/constants-float64-max-base10-exponent/lib/index.js:
@stdlib/constants-float64-min-base10-exponent/lib/index.js:
@stdlib/constants-float64-min-base10-exponent-subnormal/lib/index.js:
@stdlib/math-base-special-roundn/lib/main.js:
@stdlib/math-base-special-roundn/lib/index.js:
@stdlib/ndarray-base-to-array/lib/recurse.js:
@stdlib/ndarray-base-to-array/lib/main.js:
@stdlib/ndarray-base-to-array/lib/index.js:
@stdlib/assert-is-number-array/lib/index.js:
@stdlib/assert-is-typed-array-like/lib/main.js:
@stdlib/assert-is-typed-array-like/lib/index.js:
@stdlib/complex-float64-reim/lib/main.js:
@stdlib/complex-float64-reim/lib/index.js:
@stdlib/assert-is-same-value/lib/main.js:
@stdlib/assert-is-same-value/lib/index.js:
@stdlib/assert-contains/lib/main.js:
@stdlib/assert-contains/lib/index.js:
@stdlib/stats-ranks/lib/sum.js:
@stdlib/stats-ranks/lib/order.js:
@stdlib/stats-ranks/lib/is_missing.js:
@stdlib/stats-ranks/lib/validate.js:
@stdlib/stats-ranks/lib/main.js:
@stdlib/stats-ranks/lib/index.js:
@stdlib/stats-base-dists-normal-cdf/lib/main.js:
@stdlib/stats-base-dists-normal-cdf/lib/factory.js:
@stdlib/stats-base-dists-normal-cdf/lib/index.js:
@stdlib/math-base-assert-is-positive-integer/lib/main.js:
@stdlib/math-base-assert-is-positive-integer/lib/index.js:
@stdlib/math-base-assert-is-finite/lib/main.js:
@stdlib/math-base-assert-is-finite/lib/index.js:
@stdlib/utils-identity-function/lib/main.js:
@stdlib/utils-identity-function/lib/index.js:
@stdlib/utils-memoize/lib/main.js:
@stdlib/utils-memoize/lib/index.js:
@stdlib/utils-tabulate/lib/main.js:
@stdlib/utils-tabulate/lib/index.js:
@stdlib/math-base-special-signum/lib/main.js:
@stdlib/math-base-special-signum/lib/index.js:
@stdlib/constants-float64-fourth-pi/lib/index.js:
@stdlib/math-base-special-asin/lib/index.js:
@stdlib/math-base-special-beta/lib/index.js:
@stdlib/constants-float64-half-pi/lib/index.js:
@stdlib/math-base-special-factorial/lib/main.js:
@stdlib/math-base-special-factorial/lib/index.js:
@stdlib/math-base-special-gamma-lanczos-sum/lib/index.js:
@stdlib/math-base-special-gamma-delta-ratio/lib/index.js:
@stdlib/math-base-special-maxabs/lib/main.js:
@stdlib/math-base-special-maxabs/lib/index.js:
@stdlib/math-base-special-minabs/lib/main.js:
@stdlib/math-base-special-minabs/lib/index.js:
@stdlib/math-base-special-gcd/lib/bitwise_binary_gcd.js:
@stdlib/math-base-special-gcd/lib/binary_gcd.js:
@stdlib/math-base-special-gcd/lib/main.js:
@stdlib/math-base-special-gcd/lib/index.js:
@stdlib/math-base-special-binomcoef/lib/main.js:
@stdlib/math-base-special-binomcoef/lib/index.js:
@stdlib/math-base-special-kernel-betainc/lib/main.js:
@stdlib/math-base-special-kernel-betainc/lib/index.js:
@stdlib/math-base-special-betainc/lib/main.js:
@stdlib/math-base-special-betainc/lib/index.js:
@stdlib/stats-base-dists-t-cdf/lib/main.js:
@stdlib/stats-base-dists-t-cdf/lib/factory.js:
@stdlib/stats-base-dists-t-cdf/lib/index.js:
@stdlib/math-base-special-erfcinv/lib/index.js:
@stdlib/math-base-special-acos/lib/index.js:
@stdlib/constants-float64-sqrt-two/lib/index.js:
@stdlib/constants-float32-max/lib/index.js:
@stdlib/math-base-special-gammaincinv/lib/higher_newton.js:
@stdlib/math-base-special-gammaincinv/lib/lambdaeta.js:
@stdlib/constants-float64-ln-sqrt-two-pi/lib/index.js:
@stdlib/math-base-special-gammaincinv/lib/chepolsum.js:
@stdlib/math-base-special-gammaincinv/lib/stirling.js:
@stdlib/math-base-special-gammaincinv/lib/gamstar.js:
@stdlib/math-base-special-gammaincinv/lib/eps1.js:
@stdlib/math-base-special-gammaincinv/lib/eps2.js:
@stdlib/math-base-special-gammaincinv/lib/eps3.js:
@stdlib/math-base-special-gammaincinv/lib/compute.js:
@stdlib/math-base-special-gammaincinv/lib/main.js:
@stdlib/math-base-special-gammaincinv/lib/index.js:
@stdlib/constants-float64-smallest-subnormal/lib/index.js:
@stdlib/math-base-special-kernel-betaincinv/lib/index.js:
@stdlib/stats-base-dists-t-quantile/lib/main.js:
@stdlib/stats-base-dists-t-quantile/lib/factory.js:
@stdlib/stats-base-dists-t-quantile/lib/index.js:
@stdlib/blas-base-gcopy/lib/main.js:
@stdlib/blas-base-gcopy/lib/ndarray.js:
@stdlib/blas-base-gcopy/lib/index.js:
@stdlib/stats-ttest/lib/validate.js:
@stdlib/stats-ttest/lib/print.js:
@stdlib/stats-ttest/lib/main.js:
@stdlib/stats-ttest/lib/index.js:
@stdlib/stats-ttest2/lib/validate.js:
@stdlib/stats-ttest2/lib/print.js:
@stdlib/stats-ttest2/lib/main.js:
@stdlib/stats-ttest2/lib/index.js:
@stdlib/math-base-special-erfinv/lib/index.js:
@stdlib/stats-base-dists-normal-quantile/lib/main.js:
@stdlib/stats-base-dists-degenerate-quantile/lib/main.js:
@stdlib/stats-base-dists-degenerate-quantile/lib/factory.js:
@stdlib/stats-base-dists-degenerate-quantile/lib/index.js:
@stdlib/stats-base-dists-normal-quantile/lib/factory.js:
@stdlib/stats-base-dists-normal-quantile/lib/index.js:
@stdlib/math-base-special-atanh/lib/index.js:
@stdlib/math-base-special-tanh/lib/index.js:
@stdlib/stats-pcorrtest/lib/print.js:
@stdlib/stats-pcorrtest/lib/pcorr.js:
@stdlib/stats-pcorrtest/lib/validate.js:
@stdlib/stats-pcorrtest/lib/main.js:
@stdlib/stats-pcorrtest/lib/index.js:
@stdlib/stats-base-dists-f-cdf/lib/main.js:
@stdlib/stats-base-dists-f-cdf/lib/factory.js:
@stdlib/stats-base-dists-f-cdf/lib/index.js:
@stdlib/stats-anova1/lib/validate.js:
@stdlib/stats-anova1/lib/unique.js:
@stdlib/stats-incr-stdev/lib/main.js:
@stdlib/stats-incr-stdev/lib/index.js:
@stdlib/stats-anova1/lib/mean_table.js:
@stdlib/stats-anova1/lib/mean.js:
@stdlib/string-repeat/lib/main.js:
@stdlib/string-repeat/lib/index.js:
@stdlib/stats-anova1/lib/print.js:
@stdlib/stats-anova1/lib/main.js:
@stdlib/stats-anova1/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/string-base-format-interpolate/lib/is_number.js:
@stdlib/string-base-format-interpolate/lib/zero_pad.js:
@stdlib/string-base-format-interpolate/lib/format_integer.js:
@stdlib/string-base-format-interpolate/lib/is_string.js:
@stdlib/string-base-format-interpolate/lib/format_double.js:
@stdlib/string-base-format-interpolate/lib/space_pad.js:
@stdlib/string-base-format-interpolate/lib/main.js:
@stdlib/string-base-format-interpolate/lib/index.js:
@stdlib/string-base-format-tokenize/lib/main.js:
@stdlib/string-base-format-tokenize/lib/index.js:
@stdlib/string-format/lib/is_string.js:
@stdlib/string-format/lib/main.js:
@stdlib/string-format/lib/index.js:
@stdlib/boolean-ctor/lib/main.js:
@stdlib/boolean-ctor/lib/index.js:
@stdlib/utils-global/lib/global_this.js:
@stdlib/utils-global/lib/browser.js:
@stdlib/object-ctor/lib/main.js:
@stdlib/object-ctor/lib/index.js:
@stdlib/array-base-assert-is-accessor-array/lib/main.js:
@stdlib/array-base-assert-is-accessor-array/lib/index.js:
@stdlib/array-base-getter/lib/main.js:
@stdlib/array-base-getter/lib/index.js:
@stdlib/array-base-setter/lib/main.js:
@stdlib/array-base-setter/lib/index.js:
@stdlib/array-base-accessor-getter/lib/main.js:
@stdlib/array-base-accessor-getter/lib/index.js:
@stdlib/array-base-accessor-setter/lib/main.js:
@stdlib/array-base-accessor-setter/lib/index.js:
@stdlib/array-base-arraylike2object/lib/main.js:
@stdlib/array-base-arraylike2object/lib/index.js:
@stdlib/string-base-replace/lib/main.js:
@stdlib/string-base-replace/lib/index.js:
@stdlib/math-base-special-ln/lib/polyval_p.js:
@stdlib/math-base-special-ln/lib/polyval_q.js:
@stdlib/math-base-special-kernel-cos/lib/polyval_c13.js:
@stdlib/math-base-special-kernel-cos/lib/polyval_c46.js:
@stdlib/constants-float64-high-word-abs-mask/lib/index.js:
@stdlib/constants-float64-high-word-sign-mask/lib/index.js:
@stdlib/math-base-special-exp/lib/polyval_p.js:
@stdlib/math-base-special-erfc/lib/polyval_pp.js:
@stdlib/math-base-special-erfc/lib/polyval_qq.js:
@stdlib/math-base-special-erfc/lib/polyval_pa.js:
@stdlib/math-base-special-erfc/lib/polyval_qa.js:
@stdlib/math-base-special-erfc/lib/polyval_ra.js:
@stdlib/math-base-special-erfc/lib/polyval_sa.js:
@stdlib/math-base-special-erfc/lib/polyval_rb.js:
@stdlib/math-base-special-erfc/lib/polyval_sb.js:
@stdlib/function-ctor/lib/main.js:
@stdlib/function-ctor/lib/index.js:
@stdlib/math-base-special-gammainc/lib/polyval_c0.js:
@stdlib/math-base-special-gammainc/lib/polyval_c1.js:
@stdlib/math-base-special-gammainc/lib/polyval_c2.js:
@stdlib/math-base-special-gammainc/lib/polyval_c3.js:
@stdlib/math-base-special-gammainc/lib/polyval_c4.js:
@stdlib/math-base-special-gammainc/lib/polyval_c5.js:
@stdlib/math-base-special-gammainc/lib/polyval_c6.js:
@stdlib/math-base-special-gammainc/lib/polyval_c7.js:
@stdlib/math-base-special-gammainc/lib/polyval_c8.js:
@stdlib/math-base-special-gamma-lanczos-sum-expg-scaled/lib/rational_pq.js:
@stdlib/math-base-special-expm1/lib/polyval_q.js:
@stdlib/math-base-special-log1p/lib/polyval_lp.js:
@stdlib/assert-is-accessor-array/lib/main.js:
@stdlib/assert-is-accessor-array/lib/index.js:
@stdlib/math-base-special-asin/lib/rational_pq.js:
@stdlib/math-base-special-asin/lib/rational_rs.js:
@stdlib/math-base-special-erfcinv/lib/rational_p1q1.js:
@stdlib/math-base-special-erfcinv/lib/rational_p2q2.js:
@stdlib/math-base-special-erfcinv/lib/rational_p3q3.js:
@stdlib/math-base-special-erfcinv/lib/rational_p4q4.js:
@stdlib/math-base-special-erfcinv/lib/rational_p5q5.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co14.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co15.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co16.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co17.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co18.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co19.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co20.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co21.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co22.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co1.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co2.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co3.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co4.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co5.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co6.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co7.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co8.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co9.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co10.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co11.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co12.js:
@stdlib/math-base-special-kernel-betaincinv/lib/polyval_co13.js:
@stdlib/math-base-special-gammaincinv/lib/polyval_ak1.js:
@stdlib/math-base-special-gammaincinv/lib/polyval_ak2.js:
@stdlib/math-base-special-gammaincinv/lib/polyval_c.js:
@stdlib/math-base-special-gammaincinv/lib/polyval_d.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak0bk0.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak1bk1.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak2bk2.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak3bk3.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak4bk4.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak5bk5.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak6bk6.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak7bk7.js:
@stdlib/math-base-special-gammaincinv/lib/rational_ak8bk8.js:
@stdlib/blas-base-gcopy/lib/accessors.js:
@stdlib/math-base-special-erfinv/lib/rational_p1q1.js:
@stdlib/math-base-special-erfinv/lib/rational_p2q2.js:
@stdlib/math-base-special-erfinv/lib/rational_p3q3.js:
@stdlib/math-base-special-erfinv/lib/rational_p4q4.js:
@stdlib/math-base-special-erfinv/lib/rational_p5q5.js:
@stdlib/math-base-special-tanh/lib/rational_pq.js:
@stdlib/string-base-repeat/lib/has_builtin.js:
@stdlib/string-base-repeat/lib/polyfill.js:
@stdlib/string-base-repeat/lib/builtin.js:
@stdlib/string-base-repeat/lib/main.js:
@stdlib/string-base-repeat/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2022 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/ndarray-base-dtype-enums/lib/main.js:
@stdlib/ndarray-base-dtype-enums/lib/index.js:
@stdlib/ndarray-base-assert-is-column-major-string/lib/main.js:
@stdlib/ndarray-base-assert-is-column-major-string/lib/index.js:
@stdlib/ndarray-base-ctor/lib/valueof.js:
@stdlib/ndarray-base-dtype-strings/lib/main.js:
@stdlib/ndarray-base-dtype-strings/lib/index.js:
@stdlib/ndarray-base-assert-is-data-type-string/lib/main.js:
@stdlib/ndarray-base-assert-is-data-type-string/lib/index.js:
@stdlib/assert-is-struct-constructor-like/lib/main.js:
@stdlib/assert-is-struct-constructor-like/lib/index.js:
@stdlib/ndarray-base-dtype-alignment/lib/table.js:
@stdlib/ndarray-base-dtype-alignment/lib/main.js:
@stdlib/ndarray-base-dtype-alignment/lib/index.js:
@stdlib/ndarray-dtype-ctor/lib/main.js:
@stdlib/ndarray-dtype-ctor/lib/index.js:
@stdlib/ndarray-base-assert-is-data-type-object/lib/main.js:
@stdlib/ndarray-base-assert-is-data-type-object/lib/index.js:
@stdlib/ndarray-base-assert-is-struct-data-type/lib/main.js:
@stdlib/ndarray-base-assert-is-struct-data-type/lib/index.js:
@stdlib/constants-float64-max-nth-factorial/lib/index.js:
@stdlib/array-base-index-of-same-value/lib/main.js:
@stdlib/array-base-index-of-same-value/lib/index.js:
@stdlib/blas-ext-base-gsumpw/lib/accessors.js:
@stdlib/stats-strided-meanpn/lib/accessors.js:
@stdlib/stats-strided-meanpn/lib/ndarray.js:
@stdlib/stats-strided-meanpn/lib/meanpn.js:
@stdlib/blas-ext-base-gsumpw/lib/accessors.js:
@stdlib/stats-strided-variancepn/lib/accessors.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2025 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/array-dtype/lib/ctor2dtype.js:
@stdlib/array-base-assert-is-complex64array/lib/main.js:
@stdlib/array-base-assert-is-complex64array/lib/index.js:
@stdlib/array-base-assert-is-complex128array/lib/main.js:
@stdlib/array-base-assert-is-complex128array/lib/index.js:
@stdlib/array-complex128/lib/main.js:
@stdlib/array-bool/lib/from_iterator.js:
@stdlib/array-bool/lib/from_iterator_map.js:
@stdlib/array-bool/lib/from_array.js:
@stdlib/array-bool/lib/main.js:
@stdlib/array-bool/lib/index.js:
@stdlib/array-dtype/lib/ctors.js:
@stdlib/array-dtype/lib/dtypes.js:
@stdlib/blas-base-layouts/lib/main.js:
@stdlib/blas-base-layouts/lib/enum.js:
@stdlib/blas-base-layouts/lib/index.js:
@stdlib/ndarray-defaults/lib/main.js:
@stdlib/ndarray-defaults/lib/get.js:
@stdlib/strided-base-stride2offset/lib/main.js:
@stdlib/strided-base-stride2offset/lib/index.js:
@stdlib/math-base-special-gammaln/lib/polyval_a1.js:
@stdlib/math-base-special-gammaln/lib/polyval_a2.js:
@stdlib/math-base-special-gammaln/lib/polyval_r.js:
@stdlib/math-base-special-gammaln/lib/polyval_s.js:
@stdlib/math-base-special-gammaln/lib/polyval_t1.js:
@stdlib/math-base-special-gammaln/lib/polyval_t2.js:
@stdlib/math-base-special-gammaln/lib/polyval_t3.js:
@stdlib/math-base-special-gammaln/lib/polyval_u.js:
@stdlib/math-base-special-gammaln/lib/polyval_v.js:
@stdlib/math-base-special-gammaln/lib/polyval_w.js:
@stdlib/constants-float64-num-high-word-significand-bits/lib/index.js:
@stdlib/math-base-special-pow/lib/polyval_l.js:
@stdlib/math-base-special-pow/lib/polyval_w.js:
@stdlib/math-base-special-pow/lib/polyval_p.js:
@stdlib/math-base-special-gamma/lib/polyval_s.js:
@stdlib/math-base-special-gamma/lib/rational_pq.js:
@stdlib/math-base-special-gamma1pm1/lib/rational_p1q1.js:
@stdlib/math-base-special-gamma1pm1/lib/rational_p2q2.js:
@stdlib/math-base-special-gamma1pm1/lib/rational_p3q3.js:
@stdlib/strided-base-reinterpret-complex/lib/main.js:
@stdlib/strided-base-reinterpret-complex/lib/index.js:
@stdlib/strided-base-reinterpret-boolean/lib/main.js:
@stdlib/strided-base-reinterpret-boolean/lib/index.js:
@stdlib/array-base-assert-is-complex-typed-array/lib/main.js:
@stdlib/array-base-assert-is-complex-typed-array/lib/index.js:
@stdlib/array-base-assert-is-booleanarray/lib/main.js:
@stdlib/array-base-assert-is-booleanarray/lib/index.js:
@stdlib/number-float64-base-assert-is-same-value/lib/main.js:
@stdlib/number-float64-base-assert-is-same-value/lib/index.js:
@stdlib/complex-float64-base-assert-is-same-value/lib/main.js:
@stdlib/complex-float64-base-assert-is-same-value/lib/index.js:
@stdlib/math-base-special-beta/lib/lanczos_sum_expg_scaled.js:
@stdlib/math-base-special-gamma-lanczos-sum/lib/rational_pq.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2024 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/array-base-slice/lib/main.js:
@stdlib/array-base-slice/lib/index.js:
@stdlib/array-base-flatten2d-by/lib/main.js:
@stdlib/array-base-flatten2d-by/lib/assign.js:
@stdlib/array-base-flatten2d-by/lib/index.js:
@stdlib/array-base-assert-contains/lib/main.js:
@stdlib/array-base-assert-contains/lib/factory.js:
@stdlib/array-base-assert-contains/lib/index.js:
@stdlib/ndarray-defaults/lib/index.js:
@stdlib/ndarray-base-normalize-index/lib/main.js:
@stdlib/ndarray-base-normalize-index/lib/index.js:
@stdlib/ndarray-base-ind/lib/factory.js:
@stdlib/math-base-special-log1pmx/lib/index.js:
@stdlib/stats-chi2test/lib/defaults.js:
@stdlib/stats-chi2test/lib/results.js:
@stdlib/array-base-resolve-getter/lib/main.js:
@stdlib/array-base-resolve-getter/lib/index.js:
@stdlib/stats-anova1/lib/defaults.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2023 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/blas-ext-base-dsumpw/lib/ndarray.js:
@stdlib/blas-ext-base-dsumpw/lib/dsumpw.js:
@stdlib/blas-ext-base-dsumpw/lib/main.js:
@stdlib/blas-base-dscal/lib/ndarray.js:
@stdlib/blas-base-dscal/lib/dscal.js:
@stdlib/blas-base-dscal/lib/main.js:
@stdlib/blas-ext-base-dapx/lib/ndarray.js:
@stdlib/blas-ext-base-dapx/lib/dapx.js:
@stdlib/blas-ext-base-dapx/lib/main.js:
@stdlib/stats-strided-dmin/lib/ndarray.js:
@stdlib/stats-strided-dmin/lib/dmin.js:
@stdlib/stats-strided-dmin/lib/main.js:
@stdlib/stats-chi2test/lib/validate.js:
@stdlib/stats-chi2test/lib/main.js:
@stdlib/stats-chi2test/lib/index.js:
@stdlib/stats-base-dists-signrank-cdf/lib/weights.js:
@stdlib/stats-base-dists-signrank-cdf/lib/main.js:
@stdlib/stats-base-dists-signrank-cdf/lib/factory.js:
@stdlib/stats-base-dists-signrank-cdf/lib/index.js:
@stdlib/stats-wilcoxon/lib/validate.js:
@stdlib/stats-wilcoxon/lib/unique.js:
@stdlib/stats-wilcoxon/lib/print.js:
@stdlib/stats-wilcoxon/lib/main.js:
@stdlib/stats-wilcoxon/lib/index.js:
@stdlib/blas-ext-base-gsumpw/lib/ndarray.js:
@stdlib/blas-ext-base-gsumpw/lib/main.js:
@stdlib/blas-ext-base-gsumpw/lib/index.js:
@stdlib/blas-ext-base-gapxsumpw/lib/ndarray.js:
@stdlib/blas-ext-base-gapxsumpw/lib/main.js:
@stdlib/blas-ext-base-gapxsumpw/lib/index.js:
@stdlib/stats-strided-meanpn/lib/main.js:
@stdlib/stats-strided-meanpn/lib/index.js:
@stdlib/stats-strided-mean/lib/mean.js:
@stdlib/stats-strided-mean/lib/ndarray.js:
@stdlib/stats-strided-mean/lib/main.js:
@stdlib/stats-strided-mean/lib/index.js:
@stdlib/blas-ext-base-gsumpw/lib/ndarray.js:
@stdlib/blas-ext-base-gsumpw/lib/main.js:
@stdlib/blas-ext-base-gsumpw/lib/index.js:
@stdlib/stats-strided-variancepn/lib/ndarray.js:
@stdlib/stats-strided-variancepn/lib/main.js:
@stdlib/stats-strided-variancepn/lib/index.js:
@stdlib/stats-strided-variance/lib/variance.js:
@stdlib/stats-strided-variance/lib/ndarray.js:
@stdlib/stats-strided-variance/lib/main.js:
@stdlib/stats-strided-variance/lib/index.js:
@stdlib/blas-ext-base-gsumpw/lib/ndarray.js:
@stdlib/blas-ext-base-gsumpw/lib/main.js:
@stdlib/blas-ext-base-gsumpw/lib/index.js:
@stdlib/blas-ext-base-gapxsumpw/lib/ndarray.js:
@stdlib/blas-ext-base-gapxsumpw/lib/main.js:
@stdlib/blas-ext-base-gapxsumpw/lib/index.js:
@stdlib/stats-base-meanpn/lib/meanpn.js:
@stdlib/stats-base-meanpn/lib/ndarray.js:
@stdlib/stats-base-meanpn/lib/main.js:
@stdlib/stats-base-meanpn/lib/index.js:
@stdlib/stats-base-mean/lib/mean.js:
@stdlib/stats-base-mean/lib/ndarray.js:
@stdlib/stats-base-mean/lib/main.js:
@stdlib/stats-base-mean/lib/index.js:
@stdlib/stats-base-variancepn/lib/variancepn.js:
@stdlib/stats-base-variancepn/lib/ndarray.js:
@stdlib/stats-base-variancepn/lib/main.js:
@stdlib/stats-base-variancepn/lib/index.js:
@stdlib/stats-base-stdevpn/lib/stdevpn.js:
@stdlib/stats-base-stdevpn/lib/ndarray.js:
@stdlib/stats-base-stdevpn/lib/main.js:
@stdlib/stats-base-stdevpn/lib/index.js:
@stdlib/stats-base-stdev/lib/stdev.js:
@stdlib/stats-base-stdev/lib/ndarray.js:
@stdlib/stats-base-stdev/lib/main.js:
@stdlib/stats-base-stdev/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2020 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/math-base-special-ln/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-kernel-cos/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/k_cos.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-kernel-sin/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-rempio2/lib/kernel_rempio2.js:
@stdlib/math-base-special-rempio2/lib/rempio2_medium.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-rempio2/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  *
  * Optimized by Bruce D. Evans.
  * ```
  *)

@stdlib/math-base-special-cos/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cos.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-sin/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-gammaln/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/e_lgamma_r.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-exp/lib/expmulti.js:
@stdlib/math-base-special-exp/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (c) 2009 The Go Authors. All rights reserved.
  *
  * Redistribution and use in source and binary forms, with or without
  * modification, are permitted provided that the following conditions are
  * met:
  *
  *    * Redistributions of source code must retain the above copyright
  * notice, this list of conditions and the following disclaimer.
  *    * Redistributions in binary form must reproduce the above
  * copyright notice, this list of conditions and the following disclaimer
  * in the documentation and/or other materials provided with the
  * distribution.
  *    * Neither the name of Google Inc. nor the names of its
  * contributors may be used to endorse or promote products derived from
  * this software without specific prior written permission.
  *
  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  * ```
  *
  * ```text
  * Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-pow/lib/x_is_zero.js:
@stdlib/math-base-special-pow/lib/y_is_huge.js:
@stdlib/math-base-special-pow/lib/log2ax.js:
@stdlib/math-base-special-pow/lib/logx.js:
@stdlib/math-base-special-pow/lib/pow2.js:
@stdlib/math-base-special-pow/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-gamma/lib/stirling_approximation.js:
@stdlib/math-base-special-gamma/lib/small_approximation.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C code, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
  *
  * Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
  *
  * Stephen L. Moshier
  * moshier@na-net.ornl.gov
  * ```
  *)

@stdlib/math-base-special-gamma/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
  *
  * Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
  *
  * Stephen L. Moshier
  * moshier@na-net.ornl.gov
  * ```
  *)

@stdlib/math-base-special-gammainc/lib/tgamma_i_large_x_series.js:
@stdlib/math-base-special-gammainc/lib/tgamma_i_large_x.js:
@stdlib/math-base-special-gammainc/lib/igamma_final.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2025 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link https://www.boost.org/doc/libs/1_88_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  * (C) Copyright Paul A. Bristow 2007.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-gammainc/lib/finite_gamma_q.js:
@stdlib/math-base-special-gammainc/lib/finite_half_gamma_q.js:
@stdlib/math-base-special-gammainc/lib/full_igamma_prefix.js:
@stdlib/math-base-special-gammainc/lib/igamma_temme_large.js:
@stdlib/math-base-special-gammainc/lib/lower_incomplete_gamma_series.js:
@stdlib/math-base-special-gammainc/lib/lower_gamma_series.js:
@stdlib/math-base-special-gammainc/lib/small_gamma2_series.js:
@stdlib/math-base-special-gammainc/lib/tgamma_small_upper_part.js:
@stdlib/math-base-special-gammainc/lib/upper_incomplete_gamma_fract.js:
@stdlib/math-base-special-gammainc/lib/upper_gamma_fraction.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link https://www.boost.org/doc/libs/1_88_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  * (C) Copyright Paul A. Bristow 2007.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-erfc/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-log1pmx/lib/log1p_series.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2023 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link https://www.boost.org/doc/libs/1_83_0/boost/math/special_functions/log1p.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2005-2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  *)

@stdlib/math-base-special-log1pmx/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2023 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link https://www.boost.org/doc/libs/1_83_0/boost/math/special_functions/log1p.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2005-2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-gamma-lanczos-sum-expg-scaled/lib/main.js:
@stdlib/math-base-special-gamma-lanczos-sum/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-gammainc/lib/regularised_gamma_prefix.js:
@stdlib/math-base-special-kernel-betainc/lib/regularized_gamma_prefix.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * Copyright John Maddock 2006-7, 2013-14.
  * Copyright Paul A. Bristow 2007, 2013-14.
  * Copyright Nikhar Agrawal 2013-14.
  * Copyright Christopher Kormanyos 2013-14.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-expm1/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_expm1.c} and [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/s_expm1.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-powm1/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_85_0/boost/math/special_functions/powm1.hpp}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-log1p/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_log1p.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-gamma1pm1/lib/lgamma_small_imp.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_85_0/boost/math/special_functions/detail/lgamma_small.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006-7, 2013-14.
  * (C) Copyright Paul A. Bristow 2007, 2013-14.
  * (C) Copyright Nikhar Agrawal 2013-14.
  * (C) Copyright Christopher Kormanyos 2013-14.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-gamma1pm1/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_85_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006-7, 2013-14.
  * (C) Copyright Paul A. Bristow 2007, 2013-14.
  * (C) Copyright Nikhar Agrawal 2013-14.
  * (C) Copyright Christopher Kormanyos 2013-14.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-gammainc/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link https://www.boost.org/doc/libs/1_88_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006-7, 2013-14.
  * (C) Copyright Paul A. Bristow 2007, 2013-14.
  * (C) Copyright Nikhar Agrawal 2013-14.
  * (C) Christopher Kormanyos 2013-14.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-asin/lib/main.js:
@stdlib/math-base-special-acos/lib/main.js:
@stdlib/math-base-special-tanh/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright 1984, 1995, 2000 by Stephen L. Moshier
  *
  * Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
  *
  * Stephen L. Moshier
  * moshier@na-net.ornl.gov
  * ```
  *)

@stdlib/math-base-special-beta/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{http://www.boost.org/doc/libs/1_85_0/boost/math/special_functions/beta.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-gamma-delta-ratio/lib/gamma_delta_ratio_lanczos.js:
@stdlib/math-base-special-gamma-delta-ratio/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_85_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * Copyright John Maddock 2006-7, 2013-14.
  * Copyright Paul A. Bristow 2007, 2013-14.
  * Copyright Nikhar Agrawal 2013-14.
  * Copyright Christopher Kormanyos 2013-14.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betainc/lib/full_igamma_prefix.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  * (C) Copyright Paul A. Bristow 2007.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betainc/lib/beta_small_b_large_a_series.js:
@stdlib/math-base-special-kernel-betainc/lib/ibeta_fraction2.js:
@stdlib/math-base-special-kernel-betainc/lib/binomial_ccdf.js:
@stdlib/math-base-special-kernel-betainc/lib/ibeta_a_step.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betainc/lib/rising_factorial_ratio.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/beta.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betainc/lib/ibeta_power_terms.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/beta.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betainc/lib/ibeta_series.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/beta.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betainc/lib/assign.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  * (C) Copyright Paul A. Bristow 2007.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-erfcinv/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_81_0/boost/math/special_functions/detail/erf_inv.hpp}. This implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betaincinv/lib/inverse_students_t_body_series.js:
@stdlib/math-base-special-kernel-betaincinv/lib/inverse_students_t.js:
@stdlib/math-base-special-kernel-betaincinv/lib/find_ibeta_inv_from_t_dist.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/detail/t_distribution_inv.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * Copyright John Maddock 2006.
  * Copyright Paul A. Bristow 2007.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betaincinv/lib/inverse_students_t_tail_series.js:
@stdlib/math-base-special-kernel-betaincinv/lib/inverse_students_t_hill.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/detail/t_distribution_inv.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * Copyright John Maddock 2006.
  * Copyright Paul A. Bristow 2007.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betaincinv/lib/temme1.js:
@stdlib/math-base-special-kernel-betaincinv/lib/temme2.js:
@stdlib/math-base-special-kernel-betaincinv/lib/temme3.js:
@stdlib/math-base-special-kernel-betaincinv/lib/ibeta_roots.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/detail/ibeta_inverse.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * Copyright John Maddock 2006.
  * Copyright Paul A. Bristow 2007.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betaincinv/lib/root_finder.js:
@stdlib/math-base-special-kernel-betaincinv/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/detail/ibeta_inverse.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * Copyright John Maddock 2006.
  * Copyright Paul A. Bristow 2007.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-kernel-betaincinv/lib/newton_raphson.js:
@stdlib/math-base-special-kernel-betaincinv/lib/halley_iterate.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/tools/roots.hpp}. The implementation has been modified for JavaScript.
  *
  * ```text
  * Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-erfinv/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The original C++ code and copyright notice are from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/detail/erf_inv.hpp}. This implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * (C) Copyright John Maddock 2006.
  *
  * Use, modification and distribution are subject to the
  * Boost Software License, Version 1.0. (See accompanying file
  * LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
  * ```
  *)

@stdlib/math-base-special-atanh/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_atanh.c?view=markup}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)
*/
