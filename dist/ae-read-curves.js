var r,i=(r=require("bezier-easing"))&&"object"==typeof r&&"default"in r?r.default:r,n={HOLD:0,LINEAR:1,BEZIER:2},t={badDataObj:function(){return"Unable to read curves data object."}};function a(r,i,n){return r*(1-n)+i*n}function e(r,i,t){if(!t)return i[1];var e=Math.min(Math.max((r-i[0])/(t[0]-i[0]),0),1);return i[2]===n.BEZIER?a(i[1],t[1],i[4](e)):i[2]===n.HOLD?i[1]:i[2]===n.LINEAR?a(i[1],t[1],e):0}function o(r,i,n,t){isNaN(r)&&(r=0),r=Math.min(Math.max(r,0),1);var a=t[n],o=i[a];if(r===o[0])return e(r,o,i[a+1]);var f=r>=o[0]?1:-1,u=a,v=o,d=i.length-1;if(r<=i[0][0])return t[n]=0,i[0][1];if(r>=i[d][0])return t[n]=d,i[d][1];for(;;){var c=u+f,h=i[c];if(1===f&&(void 0===h||h[0]>r))return t[n]=u,e(r,v,i[u+1]);if(-1===f&&(void 0===h||h[0]<=r))return c<0&&(c=0,h=i[0]),t[n]=c,e(r,h,i[c+1]);u=c,v=h}}module.exports=function(r,n){void 0===r&&(r={}),void 0===n&&(n={});var a=JSON.parse(JSON.stringify(r));!function(r){if(!r||void 0===r.d||void 0===r.w||void 0===r.h||void 0===r.k)throw new Error(t.badDataObj)}(a);var e=a.d,f=a.w,u=a.h,v=a.k;if(n.props)for(var d in v)~n.props.indexOf(d)||delete v[d];var c={},h={};for(var s in v)h[s]=0;return function(r){for(var n in r)r[n].map(function(r){if(!r[3])return r;r[4]=i(r[3][0],r[3][1],r[3][2],r[3][3])})}(v),b(0),{seek:b,val:c,values:c,v:c,duration:e,width:f,height:u};function b(r){for(var i in void 0===r&&(r=0),v)c[i]=o(r,v[i],i,h)}};
//# sourceMappingURL=ae-read-curves.js.map
