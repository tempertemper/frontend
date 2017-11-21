var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,f,g){c!=Array.prototype&&c!=Object.prototype&&(c[f]=g.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var c=0;return function(f){return $jscomp.SYMBOL_PREFIX+(f||"")+c++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(c){var f=0;return $jscomp.iteratorPrototype(function(){return f<c.length?{done:!1,value:c[f++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};$jscomp.makeIterator=function(c){$jscomp.initSymbolIterator();var f=c[Symbol.iterator];return f?f.call(c):$jscomp.arrayIterator(c)};
$jscomp.polyfill=function(c,f,g,l){if(f){g=$jscomp.global;c=c.split(".");for(l=0;l<c.length-1;l++){var d=c[l];d in g||(g[d]={});g=g[d]}c=c[c.length-1];l=g[c];f=f(l);f!=l&&null!=f&&$jscomp.defineProperty(g,c,{configurable:!0,writable:!0,value:f})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(c){function f(){this.batch_=null}function g(a){return a instanceof d?a:new d(function(b,e){b(a)})}if(c&&!$jscomp.FORCE_POLYFILL_PROMISE)return c;f.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};f.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var l=$jscomp.global.setTimeout;f.prototype.asyncExecuteFunction=function(a){l(a,
0)};f.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var e=a[b];delete a[b];try{e()}catch(y){this.asyncThrow_(y)}}}this.batch_=null};f.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var d=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(e){b.reject(e)}};d.prototype.createResolveAndReject_=
function(){function a(a){return function(c){e||(e=!0,a.call(b,c))}}var b=this,e=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};d.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof d)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};d.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(e){this.reject_(e);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};d.prototype.reject_=function(a){this.settle_(2,a)};d.prototype.fulfill_=function(a){this.settle_(1,a)};d.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};d.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var h=new f;d.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};d.prototype.settleSameAsThenable_=function(a,b){var e=this.createResolveAndReject_();try{a.call(b,e.resolve,e.reject)}catch(y){e.reject(y)}};d.prototype.then=function(a,b){function e(b,a){return"function"==typeof b?function(a){try{c(b(a))}catch(u){f(u)}}:a}var c,f,k=new d(function(b,
a){c=b;f=a});this.callWhenSettled_(e(a,c),e(b,f));return k};d.prototype.catch=function(a){return this.then(void 0,a)};d.prototype.callWhenSettled_=function(a,b){function e(){switch(c.state_){case 1:a(c.result_);break;case 2:b(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?h.asyncExecute(e):this.onSettledCallbacks_.push(function(){h.asyncExecute(e)})};d.resolve=g;d.reject=function(a){return new d(function(b,e){e(a)})};d.race=function(a){return new d(function(b,
e){for(var c=$jscomp.makeIterator(a),f=c.next();!f.done;f=c.next())g(f.value).callWhenSettled_(b,e)})};d.all=function(a){var b=$jscomp.makeIterator(a),e=b.next();return e.done?g([]):new d(function(a,c){function f(b){return function(e){d[b]=e;m--;0==m&&a(d)}}var d=[],m=0;do d.push(void 0),m++,g(e.value).callWhenSettled_(f(d.length-1),c),e=b.next();while(!e.done)})};return d},"es6","es3");
(function(){function c(b,a){return Array.prototype.slice.call((a||document).querySelectorAll(b))}function f(b){return c(a.join(","),b).filter(function(b){return!!(b.offsetWidth||b.offsetHeight||b.getClientRects().length)})}function g(){try{return document.activeElement}catch(b){}}function l(b,a,c,d){b&&27===d.which&&(d.preventDefault(),a());if(b&&9===d.which){b=f(c);var e;0<b.length&&(a=b.indexOf(g()),d.shiftKey&&0===a?e=b[b.length-1]:d.shiftKey||a!==b.length-1||(e=b[0]));e&&(e.focus(),d.preventDefault())}}
function d(b){var a;(a=f(b)[0])||(a=document.createElement("div"),a.setAttribute("tabindex","0"),a.style.cssText="outline:none;",b.insertBefore(a,b.firstChild));(b=a)&&b.focus()}var h=function(a,c){return c={exports:{}},a(c,c.exports),c.exports}(function(a){(function(){function b(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function c(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function F(){document.removeEventListener("DOMContentLoaded",
F);a()}):document.attachEvent("onreadystatechange",function G(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",G),a()})}function d(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText=
"max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);
this.a.appendChild(this.b);this.a.appendChild(this.c)}function f(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function g(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function l(a,c){function d(){var a=f;g(a)&&a.a.parentNode&&c(a.g)}var f=
a;b(a.b,d);b(a.c,d);g(a)}function p(a,b){b=b||{};this.family=a;this.style=b.style||"normal";this.weight=b.weight||"normal";this.stretch=b.stretch||"normal"}function h(){if(null===B)if(A()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);B=!!a&&603>parseInt(a[1],10)}else B=!1;return B}function A(){null===C&&(C=!!document.fonts);return C}function r(){if(null===D){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(H){}D=
""!==a.style.font}return D}function z(a,b){return[a.style,a.weight,r()?a.stretch:"","100px",b].join(" ")}var E=null,B=null,D=null,C=null;p.prototype.load=function(a,b){var e=this,g=a||"BESbswy",y=0,m=b||3E3,p=(new Date).getTime();return new Promise(function(a,b){if(A()&&!h()){var k=new Promise(function(a,b){function c(){(new Date).getTime()-p>=m?b():document.fonts.load(z(e,'"'+e.family+'"'),g).then(function(b){1<=b.length?a():setTimeout(c,25)},function(){b()})}c()}),r=new Promise(function(a,b){y=
setTimeout(b,m)});Promise.race([r,k]).then(function(){clearTimeout(y);a(e)},function(){b(e)})}else c(function(){function c(){var b;if(b=-1!=v&&-1!=w||-1!=v&&-1!=x||-1!=w&&-1!=x)(b=v!=w&&v!=x&&w!=x)||(null===E&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),E=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=E&&(v==n&&w==n&&x==n||v==t&&w==t&&x==t||v==u&&w==u&&x==u)),b=!b;b&&(q.parentNode&&q.parentNode.removeChild(q),clearTimeout(y),a(e))}function A(){if((new Date).getTime()-
p>=m)q.parentNode&&q.parentNode.removeChild(q),b(e);else{var a=document.hidden;if(!0===a||void 0===a)v=k.a.offsetWidth,w=r.a.offsetWidth,x=h.a.offsetWidth,c();y=setTimeout(A,50)}}var k=new d(g),r=new d(g),h=new d(g),v=-1,w=-1,x=-1,n=-1,t=-1,u=-1,q=document.createElement("div");q.dir="ltr";f(k,z(e,"sans-serif"));f(r,z(e,"serif"));f(h,z(e,"monospace"));q.appendChild(k.a);q.appendChild(r.a);q.appendChild(h.a);document.body.appendChild(q);n=k.a.offsetWidth;t=r.a.offsetWidth;u=h.a.offsetWidth;A();l(k,
function(a){v=a;c()});f(k,z(e,'"'+e.family+'",sans-serif'));l(r,function(a){w=a;c()});f(r,z(e,'"'+e.family+'",serif'));l(h,function(a){x=a;c()});f(h,z(e,'"'+e.family+'",monospace'))})})};a.exports=p})()}),a='a[href] area[href] input:not([disabled]) select:not([disabled]) textarea:not([disabled]) button:not([disabled]) iframe object embed [contenteditable] [tabindex]:not([tabindex^\x3d"-"])'.split(" ");(function(){function a(){c.classList.add("fonts-loaded");sessionStorage["fonts-loaded"]=!0}var c=
document.documentElement,d=[(new h("Source Sans Pro",{weight:"normal",style:"normal"})).load(),(new h("Source Sans Pro",{weight:"700",style:"normal"})).load(),(new h("Source Serif Pro",{weight:"normal",style:"normal"})).load(),(new h("Source Code Pro",{weight:"normal",style:"normal"})).load()];(function(){Promise.all(d).then(a).catch(function(a){console.error(a)})})()})();(function(){function a(a){l(!0,function(){h()},p,a)}function c(a){p.contains(a.target)||d(p)}function h(){document.removeEventListener("keydown",
a);document.body.removeEventListener("focus",c,!0);var b=f(p);if(0<b.length){var d=b.indexOf(g());-1!==d&&b[d].blur()}u.focus()}function m(b){n.setAttribute("aria-expanded",b);k.setAttribute("aria-hidden",!b);document.body.setAttribute("data-menu-expanded",b);"true"===b?(u=g(),d(p),document.addEventListener("keydown",a),document.body.addEventListener("focus",c,!0),k.hidden=!1):(h(),k.hidden=!0)}var k=document.querySelector(".c-menu__drawer");k.hidden=!0;k.setAttribute("role","dialog");var n=document.querySelector(".c-menu__button");
n.setAttribute("aria-expanded",!1);var t=document.createElement("div");document.body.appendChild(t);t.className="c-backdrop";t.setAttribute("tabindex",-1);var p=k,u;n&&(n.addEventListener("click",function(a){var b="false"===n.getAttribute("aria-expanded")?"true":"false";m(b);a.preventDefault()}),window.addEventListener("keyup",function(a){27===a.keyCode&&(m(!1),h())}),t.addEventListener("click",function(a){var b="false"===n.getAttribute("aria-expanded")?"true":"false";m(b);a.preventDefault()}))})()})();
//# sourceMappingURL=app.js.map
