(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isa=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ish)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="static"){processStatics(init.statics[b1]=b2.static,b3)
delete b2.static}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.c6"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.c6"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.c6(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bj=function(){}
var dart=[["","",,H,{
"^":"",
jZ:{
"^":"a;a"}}],["","",,J,{
"^":"",
n:function(a){return void 0},
bn:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bk:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.ca==null){H.j6()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.ds("Return interceptor for "+H.b(y(a,z))))}w=H.jf(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.A
else return C.B}return w},
h:{
"^":"a;",
p:function(a,b){return a===b},
gB:function(a){return H.ad(a)},
i:["dH",function(a){return H.b9(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLTexture|WebGLUniformLocation"},
fq:{
"^":"h;",
i:function(a){return String(a)},
gB:function(a){return a?519018:218159},
$isc5:1},
fr:{
"^":"h;",
p:function(a,b){return null==b},
i:function(a){return"null"},
gB:function(a){return 0}},
cK:{
"^":"h;",
gB:function(a){return 0},
$isfs:1},
fF:{
"^":"cK;"},
bW:{
"^":"cK;",
i:function(a){return String(a)}},
aO:{
"^":"h;",
cA:function(a,b){if(!!a.immutable$list)throw H.f(new P.V(b))},
cz:function(a,b){if(!!a.fixed$length)throw H.f(new P.V(b))},
ar:function(a,b){var z
this.cz(a,"remove")
for(z=0;z<a.length;++z)if(J.a6(a[z],b)){a.splice(z,1)
return!0}return!1},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.O(a))}},
ax:function(a,b){return H.e(new H.bI(a,b),[null,null])},
b0:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.c(y,x)
y[x]=w}return y.join(b)},
am:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
gD:function(a){if(a.length>0)return a[0]
throw H.f(H.bC())},
gaa:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(H.bC())},
bR:function(a,b,c,d,e){var z,y,x
this.cA(a,"set range")
P.d1(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.f(H.fn())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.c(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.c(d,x)
a[b+y]=d[x]}},
dB:function(a,b){var z,y,x,w
this.cA(a,"shuffle")
z=a.length
for(;z>1;){y=C.p.fl(z);--z
x=a.length
if(z>=x)return H.c(a,z)
w=a[z]
if(y<0||y>=x)return H.c(a,y)
this.v(a,z,a[y])
this.v(a,y,w)}},
dA:function(a){return this.dB(a,null)},
aH:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a6(a[z],b))return!0
return!1},
i:function(a){return P.b2(a,"[","]")},
gM:function(a){return new J.eE(a,a.length,0,null)},
gB:function(a){return H.ad(a)},
gm:function(a){return a.length},
sm:function(a,b){this.cz(a,"set length")
if(b<0)throw H.f(P.aR(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.F(a,b))
if(b>=a.length||b<0)throw H.f(H.F(a,b))
return a[b]},
v:function(a,b,c){if(!!a.immutable$list)H.H(new P.V("indexed set"))
if(b>=a.length||b<0)throw H.f(H.F(a,b))
a[b]=c},
$isbD:1,
$isp:1,
$asp:null,
$isx:1,
static:{fp:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.f(P.aK("Length must be a non-negative integer: "+H.b(a)))
z=H.e(new Array(a),[b])
z.fixed$length=Array
return z}}},
jY:{
"^":"aO;"},
eE:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(new P.O(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aP:{
"^":"h;",
bD:function(a,b){return a%b},
a0:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.V(""+a))},
b4:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.V(""+a))},
fM:function(a){return a},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
j:function(a,b){if(typeof b!=="number")throw H.f(H.at(b))
return a+b},
dk:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
aE:function(a,b){return(a|0)===a?a/b|0:this.a0(a/b)},
cn:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
b7:function(a,b){if(typeof b!=="number")throw H.f(H.at(b))
return a<b},
$isaY:1},
cJ:{
"^":"aP;",
$isaY:1,
$isu:1},
cI:{
"^":"aP;",
$isaY:1},
b3:{
"^":"h;",
eI:function(a,b){if(b>=a.length)throw H.f(H.F(a,b))
return a.charCodeAt(b)},
j:function(a,b){if(typeof b!=="string")throw H.f(P.eD(b,null,null))
return a+b},
dF:function(a,b,c){H.dO(b)
if(c==null)c=a.length
H.dO(c)
if(b<0)throw H.f(P.ba(b,null,null))
if(typeof c!=="number")return H.k(c)
if(b>c)throw H.f(P.ba(b,null,null))
if(c>a.length)throw H.f(P.ba(c,null,null))
return a.substring(b,c)},
dE:function(a,b){return this.dF(a,b,null)},
eL:function(a,b,c){if(c>a.length)throw H.f(P.aR(c,0,a.length,null,null))
return H.jl(a,b,c)},
gX:function(a){return a.length===0},
i:function(a){return a},
gB:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gm:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.F(a,b))
if(b>=a.length||b<0)throw H.f(H.F(a,b))
return a[b]},
$isbD:1,
$isP:1}}],["","",,H,{
"^":"",
aU:function(a,b){var z=a.aK(b)
if(!init.globalState.d.cy)init.globalState.f.aQ()
return z},
bm:function(){--init.globalState.f.b},
dY:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isp)throw H.f(P.aK("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.ir(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cG()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.i0(P.bG(null,H.aT),0)
y.z=P.b4(null,null,null,P.u,H.c0)
y.ch=P.b4(null,null,null,P.u,null)
if(y.x===!0){x=new H.iq()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fg,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.is)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.b4(null,null,null,P.u,H.bb)
w=P.aw(null,null,null,P.u)
v=new H.bb(0,null,!1)
u=new H.c0(y,x,w,init.createNewIsolate(),v,new H.ak(H.bo()),new H.ak(H.bo()),!1,!1,[],P.aw(null,null,null,null),null,null,!1,!0,P.aw(null,null,null,null))
w.av(0,0)
u.bW(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aW()
x=H.au(y,[y]).ah(a)
if(x)u.aK(new H.jj(z,a))
else{y=H.au(y,[y,y]).ah(a)
if(y)u.aK(new H.jk(z,a))
else u.aK(a)}init.globalState.f.aQ()},
fk:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fl()
return},
fl:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.V("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.V("Cannot extract URI from \""+H.b(z)+"\""))},
fg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.be(!0,[]).ak(b.data)
y=J.Y(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.be(!0,[]).ak(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.be(!0,[]).ak(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.b4(null,null,null,P.u,H.bb)
p=P.aw(null,null,null,P.u)
o=new H.bb(0,null,!1)
n=new H.c0(y,q,p,init.createNewIsolate(),o,new H.ak(H.bo()),new H.ak(H.bo()),!1,!1,[],P.aw(null,null,null,null),null,null,!1,!0,P.aw(null,null,null,null))
p.av(0,0)
n.bW(0,o)
init.globalState.f.a.a8(new H.aT(n,new H.fh(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aQ()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").ae(y.h(z,"msg"))
init.globalState.f.aQ()
break
case"close":init.globalState.ch.ar(0,$.$get$cH().h(0,a))
a.terminate()
init.globalState.f.aQ()
break
case"log":H.ff(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ao(["command","print","msg",z])
q=new H.ap(!0,P.an(null,P.u)).U(q)
y.toString
self.postMessage(q)}else P.K(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},
ff:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ao(["command","log","msg",a])
x=new H.ap(!0,P.an(null,P.u)).U(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.I(w)
z=H.G(w)
throw H.f(P.b1(z))}},
fi:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cZ=$.cZ+("_"+y)
$.d_=$.d_+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.ae(["spawned",new H.bg(y,x),w,z.r])
x=new H.fj(a,b,c,d,z)
if(e===!0){z.cq(w,w)
init.globalState.f.a.a8(new H.aT(z,x,"start isolate"))}else x.$0()},
iL:function(a){return new H.be(!0,[]).ak(new H.ap(!1,P.an(null,P.u)).U(a))},
jj:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jk:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ir:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{is:function(a){var z=P.ao(["command","print","msg",a])
return new H.ap(!0,P.an(null,P.u)).U(z)}}},
c0:{
"^":"a;a,b,c,fh:d<,eM:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cq:function(a,b){if(!this.f.p(0,a))return
if(this.Q.av(0,b)&&!this.y)this.y=!0
this.bq()},
fE:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ar(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.c(z,0)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.c(v,w)
v[w]=x
if(w===y.c)y.c5();++y.d}this.y=!1}this.bq()},
es:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.c(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fD:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.H(new P.V("removeRange"))
P.d1(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dw:function(a,b){if(!this.r.p(0,a))return
this.db=b},
f7:function(a,b,c){var z=J.n(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){a.ae(c)
return}z=this.cx
if(z==null){z=P.bG(null,null)
this.cx=z}z.a8(new H.ij(a,c))},
f5:function(a,b){var z
if(!this.r.p(0,a))return
z=J.n(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){this.by()
return}z=this.cx
if(z==null){z=P.bG(null,null)
this.cx=z}z.a8(this.gfi())},
f8:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.K(a)
if(b!=null)P.K(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aJ(a)
y[1]=b==null?null:J.aJ(b)
for(x=new P.cM(z,z.r,null,null),x.c=z.e;x.u();)x.d.ae(y)},
aK:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.I(u)
w=t
v=H.G(u)
this.f8(w,v)
if(this.db===!0){this.by()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfh()
if(this.cx!=null)for(;t=this.cx,!t.gX(t);)this.cx.d1().$0()}return y},
cP:function(a){return this.b.h(0,a)},
bW:function(a,b){var z=this.b
if(z.b_(a))throw H.f(P.b1("Registry: ports must be registered only once."))
z.v(0,a,b)},
bq:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.v(0,this.a,this)
else this.by()},
by:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a9(0)
for(z=this.b,y=z.gdc(z),y=y.gM(y);y.u();)y.gC().e2()
z.a9(0)
this.c.a9(0)
init.globalState.z.ar(0,this.a)
this.dx.a9(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.c(z,v)
w.ae(z[v])}this.ch=null}},"$0","gfi",0,0,1]},
ij:{
"^":"d:1;a,b",
$0:function(){this.a.ae(this.b)}},
i0:{
"^":"a;a,b",
eT:function(){var z=this.a
if(z.b===z.c)return
return z.d1()},
d6:function(){var z,y,x
z=this.eT()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.b_(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gX(y)}else y=!1
else y=!1
else y=!1
if(y)H.H(P.b1("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gX(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ao(["command","close"])
x=new H.ap(!0,P.an(null,P.u)).U(x)
y.toString
self.postMessage(x)}return!1}z.fz()
return!0},
cg:function(){if(self.window!=null)new H.i1(this).$0()
else for(;this.d6(););},
aQ:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cg()
else try{this.cg()}catch(x){w=H.I(x)
z=w
y=H.G(x)
w=init.globalState.Q
v=P.ao(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.ap(!0,P.an(null,P.u)).U(v)
w.toString
self.postMessage(v)}}},
i1:{
"^":"d:1;a",
$0:function(){if(!this.a.d6())return
P.bR(C.h,this)}},
aT:{
"^":"a;a,b,c",
fz:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aK(this.b)}},
iq:{
"^":"a;"},
fh:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.fi(this.a,this.b,this.c,this.d,this.e,this.f)}},
fj:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aW()
w=H.au(x,[x,x]).ah(y)
if(w)y.$2(this.b,this.c)
else{x=H.au(x,[x]).ah(y)
if(x)y.$1(this.b)
else y.$0()}}z.bq()}},
dw:{
"^":"a;"},
bg:{
"^":"dw;b,a",
ae:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gc8())return
x=H.iL(a)
if(z.geM()===y){y=J.Y(x)
switch(y.h(x,0)){case"pause":z.cq(y.h(x,1),y.h(x,2))
break
case"resume":z.fE(y.h(x,1))
break
case"add-ondone":z.es(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fD(y.h(x,1))
break
case"set-errors-fatal":z.dw(y.h(x,1),y.h(x,2))
break
case"ping":z.f7(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.f5(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.av(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ar(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.a8(new H.aT(z,new H.iu(this,x),w))},
p:function(a,b){if(b==null)return!1
return b instanceof H.bg&&J.a6(this.b,b.b)},
gB:function(a){return this.b.gbl()}},
iu:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gc8())z.dZ(this.b)}},
c2:{
"^":"dw;b,c,a",
ae:function(a){var z,y,x
z=P.ao(["command","message","port",this,"msg",a])
y=new H.ap(!0,P.an(null,P.u)).U(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
p:function(a,b){if(b==null)return!1
return b instanceof H.c2&&J.a6(this.b,b.b)&&J.a6(this.a,b.a)&&J.a6(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.dz()
y=this.a
if(typeof y!=="number")return y.dz()
x=this.c
if(typeof x!=="number")return H.k(x)
return(z<<16^y<<8^x)>>>0}},
bb:{
"^":"a;bl:a<,b,c8:c<",
e2:function(){this.c=!0
this.b=null},
dZ:function(a){if(this.c)return
this.ec(a)},
ec:function(a){return this.b.$1(a)},
$isfS:1},
hf:{
"^":"a;a,b,c",
dS:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.a8(new H.aT(y,new H.hh(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aE(new H.hi(this,b),0),a)}else throw H.f(new P.V("Timer greater than 0."))},
static:{hg:function(a,b){var z=new H.hf(!0,!1,null)
z.dS(a,b)
return z}}},
hh:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
hi:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
H.bm()
this.b.$0()}},
ak:{
"^":"a;bl:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.fU()
z=C.b.cn(z,0)^C.b.aE(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
p:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ak){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ap:{
"^":"a;a,b",
U:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.v(0,a,z.gm(z))
z=J.n(a)
if(!!z.$iscR)return["buffer",a]
if(!!z.$isbM)return["typed",a]
if(!!z.$isbD)return this.ds(a)
if(!!z.$isfe){x=this.gdn()
w=a.gcK()
w=H.b6(w,x,H.Q(w,"U",0),null)
w=P.bH(w,!0,H.Q(w,"U",0))
z=z.gdc(a)
z=H.b6(z,x,H.Q(z,"U",0),null)
return["map",w,P.bH(z,!0,H.Q(z,"U",0))]}if(!!z.$isfs)return this.dt(a)
if(!!z.$ish)this.da(a)
if(!!z.$isfS)this.aS(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbg)return this.du(a)
if(!!z.$isc2)return this.dv(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aS(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isak)return["capability",a.a]
if(!(a instanceof P.a))this.da(a)
return["dart",init.classIdExtractor(a),this.dr(init.classFieldsExtractor(a))]},"$1","gdn",2,0,2],
aS:function(a,b){throw H.f(new P.V(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
da:function(a){return this.aS(a,null)},
ds:function(a){var z=this.dq(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aS(a,"Can't serialize indexable: ")},
dq:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.U(a[y])
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
dr:function(a){var z
for(z=0;z<a.length;++z)C.a.v(a,z,this.U(a[z]))
return a},
dt:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aS(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.U(a[z[x]])
if(x>=y.length)return H.c(y,x)
y[x]=w}return["js-object",z,y]},
dv:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
du:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbl()]
return["raw sendport",a]}},
be:{
"^":"a;a,b",
ak:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.aK("Bad serialized message: "+H.b(a)))
switch(C.a.gD(a)){case"ref":if(1>=a.length)return H.c(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.c(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aI(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aI(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return this.aI(x)
case"const":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aI(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.eW(a)
case"sendport":return this.eX(a)
case"raw sendport":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.eV(a)
case"function":if(1>=a.length)return H.c(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.c(a,1)
return new H.ak(a[1])
case"dart":y=a.length
if(1>=y)return H.c(a,1)
w=a[1]
if(2>=y)return H.c(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aI(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.b(a))}},"$1","geU",2,0,2],
aI:function(a){var z,y,x
z=J.Y(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.k(x)
if(!(y<x))break
z.v(a,y,this.ak(z.h(a,y)));++y}return a},
eW:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w=P.cL()
this.b.push(w)
y=J.ew(y,this.geU()).bG(0)
for(z=J.Y(y),v=J.Y(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.c(y,u)
w.v(0,y[u],this.ak(v.h(x,u)))}return w},
eX:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
if(3>=z)return H.c(a,3)
w=a[3]
if(J.a6(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cP(w)
if(u==null)return
t=new H.bg(u,x)}else t=new H.c2(y,w,x)
this.b.push(t)
return t},
eV:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.Y(y)
v=J.Y(x)
u=0
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.k(t)
if(!(u<t))break
w[z.h(y,u)]=this.ak(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eM:function(){throw H.f(new P.V("Cannot modify unmodifiable Map"))},
j1:function(a){return init.types[a]},
je:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.n(a).$isbE},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aJ(a)
if(typeof z!=="string")throw H.f(H.at(a))
return z},
ad:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
d0:function(a){var z,y
z=C.l(J.n(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.j.eI(z,0)===36)z=C.j.dE(z,1)
return(z+H.dT(H.c8(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b9:function(a){return"Instance of '"+H.d0(a)+"'"},
M:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
bN:function(a){return a.b?H.M(a).getUTCMilliseconds()+0:H.M(a).getMilliseconds()+0},
b8:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.at(a))
return a[b]},
bO:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.at(a))
a[b]=c},
k:function(a){throw H.f(H.at(a))},
c:function(a,b){if(a==null)J.aH(a)
throw H.f(H.F(a,b))},
F:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aj(!0,b,"index",null)
z=J.aH(a)
if(!(b<0)){if(typeof z!=="number")return H.k(z)
y=b>=z}else y=!0
if(y)return P.cF(b,a,"index",null,z)
return P.ba(b,"index",null)},
at:function(a){return new P.aj(!0,a,null,null)},
q:function(a){return a},
dO:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(H.at(a))
return a},
f:function(a){var z
if(a==null)a=new P.cX()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.e_})
z.name=""}else z.toString=H.e_
return z},
e_:function(){return J.aJ(this.dartException)},
H:function(a){throw H.f(a)},
a4:function(a){throw H.f(new P.O(a))},
I:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jn(a)
if(a==null)return
if(a instanceof H.bB)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.cn(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bF(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cW(v,null))}}if(a instanceof TypeError){u=$.$get$dg()
t=$.$get$dh()
s=$.$get$di()
r=$.$get$dj()
q=$.$get$dn()
p=$.$get$dp()
o=$.$get$dl()
$.$get$dk()
n=$.$get$dr()
m=$.$get$dq()
l=u.Z(y)
if(l!=null)return z.$1(H.bF(y,l))
else{l=t.Z(y)
if(l!=null){l.method="call"
return z.$1(H.bF(y,l))}else{l=s.Z(y)
if(l==null){l=r.Z(y)
if(l==null){l=q.Z(y)
if(l==null){l=p.Z(y)
if(l==null){l=o.Z(y)
if(l==null){l=r.Z(y)
if(l==null){l=n.Z(y)
if(l==null){l=m.Z(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cW(y,l==null?null:l.method))}}return z.$1(new H.hK(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.d4()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aj(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.d4()
return a},
G:function(a){var z
if(a instanceof H.bB)return a.b
if(a==null)return new H.dB(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dB(a,null)},
jh:function(a){if(a==null||typeof a!='object')return J.L(a)
else return H.ad(a)},
dQ:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.v(0,a[y],a[x])}return b},
j8:function(a,b,c,d,e,f,g){var z=J.n(c)
if(z.p(c,0))return H.aU(b,new H.j9(a))
else if(z.p(c,1))return H.aU(b,new H.ja(a,d))
else if(z.p(c,2))return H.aU(b,new H.jb(a,d,e))
else if(z.p(c,3))return H.aU(b,new H.jc(a,d,e,f))
else if(z.p(c,4))return H.aU(b,new H.jd(a,d,e,f,g))
else throw H.f(P.b1("Unsupported number of arguments for wrapped closure"))},
aE:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.j8)
a.$identity=z
return z},
eK:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isp){z.$reflectionInfo=c
x=H.fV(z).r}else x=c
w=d?Object.create(new H.h3().constructor.prototype):Object.create(new H.bw(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a_
$.a_=J.aF(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cp(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.j1(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cn:H.bx
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cp(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
eH:function(a,b,c,d){var z=H.bx
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cp:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eJ(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eH(y,!w,z,b)
if(y===0){w=$.av
if(w==null){w=H.b_("self")
$.av=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.a_
$.a_=J.aF(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.av
if(v==null){v=H.b_("self")
$.av=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.a_
$.a_=J.aF(w,1)
return new Function(v+H.b(w)+"}")()},
eI:function(a,b,c,d){var z,y
z=H.bx
y=H.cn
switch(b?-1:a){case 0:throw H.f(new H.fW("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eJ:function(a,b){var z,y,x,w,v,u,t,s
z=H.eF()
y=$.cm
if(y==null){y=H.b_("receiver")
$.cm=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eI(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.a_
$.a_=J.aF(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.a_
$.a_=J.aF(u,1)
return new Function(y+H.b(u)+"}")()},
c6:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isp){c.fixed$length=Array
z=c}else z=c
return H.eK(a,b,z,!!d,e,f)},
jm:function(a){throw H.f(new P.eP("Cyclic initialization for static "+H.b(a)))},
au:function(a,b,c){return new H.fX(a,b,c,null)},
aW:function(){return C.n},
bo:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
t:function(a,b,c){var z
if(b===0){J.eb(c,a)
return}else if(b===1){c.cC(H.I(a),H.G(a))
return}if(!!J.n(a).$isa8)z=a
else{z=H.e(new P.C(0,$.m,null),[null])
z.aC(a)}z.b6(H.dK(b,0),new H.iU(b))
return c.gf4()},
dK:function(a,b){return new H.iR(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
e:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
c8:function(a){if(a==null)return
return a.$builtinTypeInfo},
dR:function(a,b){return H.dZ(a["$as"+H.b(b)],H.c8(a))},
Q:function(a,b,c){var z=H.dR(a,b)
return z==null?null:z[c]},
N:function(a,b){var z=H.c8(a)
return z==null?null:z[b]},
cd:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dT(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.e.i(a)
else return},
dT:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bQ("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.cd(u,c))}return w?"":"<"+H.b(z)+">"},
dZ:function(a,b){if(typeof a=="function"){a=H.cb(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cb(a,null,b)}return b},
iT:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.R(a[y],b[y]))return!1
return!0},
bh:function(a,b,c){return H.cb(a,b,H.dR(b,c))},
R:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dS(a,b)
if('func' in a)return b.builtin$cls==="eY"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cd(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.cd(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.iT(H.dZ(v,z),x)},
dM:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.R(z,v)||H.R(v,z)))return!1}return!0},
iS:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.R(v,u)||H.R(u,v)))return!1}return!0},
dS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.R(z,y)||H.R(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dM(x,w,!1))return!1
if(!H.dM(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.R(o,n)||H.R(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.R(o,n)||H.R(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.R(o,n)||H.R(n,o)))return!1}}return H.iS(a.named,b.named)},
cb:function(a,b,c){return a.apply(b,c)},
kM:function(a){var z=$.c9
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kK:function(a){return H.ad(a)},
kJ:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jf:function(a){var z,y,x,w,v,u
z=$.c9.$1(a)
y=$.bi[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bl[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dL.$2(a,z)
if(z!=null){y=$.bi[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bl[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cc(x)
$.bi[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bl[z]=x
return x}if(v==="-"){u=H.cc(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dV(a,x)
if(v==="*")throw H.f(new P.ds(z))
if(init.leafTags[z]===true){u=H.cc(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dV(a,x)},
dV:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bn(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cc:function(a){return J.bn(a,!1,null,!!a.$isbE)},
jg:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bn(z,!1,null,!!z.$isbE)
else return J.bn(z,c,null,null)},
j6:function(){if(!0===$.ca)return
$.ca=!0
H.j7()},
j7:function(){var z,y,x,w,v,u,t,s
$.bi=Object.create(null)
$.bl=Object.create(null)
H.j2()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dW.$1(v)
if(u!=null){t=H.jg(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
j2:function(){var z,y,x,w,v,u,t
z=C.u()
z=H.as(C.q,H.as(C.w,H.as(C.m,H.as(C.m,H.as(C.v,H.as(C.r,H.as(C.t(C.l),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c9=new H.j3(v)
$.dL=new H.j4(u)
$.dW=new H.j5(t)},
as:function(a,b){return a(b)||b},
jl:function(a,b,c){return a.indexOf(b,c)>=0},
eL:{
"^":"a;",
i:function(a){return P.cQ(this)},
v:function(a,b,c){return H.eM()}},
cD:{
"^":"eL;a",
bk:function(){var z=this.$map
if(z==null){z=new H.aQ(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dQ(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.bk().h(0,b)},
L:function(a,b){this.bk().L(0,b)},
gm:function(a){var z=this.bk()
return z.gm(z)}},
fU:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fV:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fU(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hI:{
"^":"a;a,b,c,d,e,f",
Z:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
static:{a1:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hI(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bc:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},dm:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cW:{
"^":"J;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
fu:{
"^":"J;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bF:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fu(a,y,z?null:b.receiver)}}},
hK:{
"^":"J;a",
i:function(a){var z=this.a
return C.j.gX(z)?"Error":"Error: "+z}},
jn:{
"^":"d:2;a",
$1:function(a){if(!!J.n(a).$isJ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dB:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
j9:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
ja:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jb:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jc:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jd:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"a;",
i:function(a){return"Closure '"+H.d0(this)+"'"},
gdd:function(){return this},
gdd:function(){return this}},
d7:{
"^":"d;"},
h3:{
"^":"d7;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bw:{
"^":"d7;a,b,c,d",
p:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bw))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.ad(this.a)
else y=typeof z!=="object"?J.L(z):H.ad(z)
z=H.ad(this.b)
if(typeof y!=="number")return y.fV()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.b9(z)},
static:{bx:function(a){return a.a},cn:function(a){return a.c},eF:function(){var z=$.av
if(z==null){z=H.b_("self")
$.av=z}return z},b_:function(a){var z,y,x,w,v
z=new H.bw("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fW:{
"^":"J;a",
i:function(a){return"RuntimeError: "+this.a}},
d3:{
"^":"a;"},
fX:{
"^":"d3;a,b,c,d",
ah:function(a){var z=this.e7(a)
return z==null?!1:H.dS(z,this.ay())},
e7:function(a){var z=J.n(a)
return"$signature" in z?z.$signature():null},
ay:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.n(y)
if(!!x.$iskt)z.void=true
else if(!x.$iscv)z.ret=y.ay()
y=this.b
if(y!=null&&y.length!==0)z.args=H.d2(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.d2(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dP(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ay()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.b(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.b(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.dP(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].ay())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{d2:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ay())
return z}}},
cv:{
"^":"d3;",
i:function(a){return"dynamic"},
ay:function(){return}},
bB:{
"^":"a;a,a1:b<"},
iU:{
"^":"d:7;a",
$2:function(a,b){H.dK(this.a,1).$1(new H.bB(a,b))}},
iR:{
"^":"d:2;a,b",
$1:function(a){this.b(this.a,a)}},
aQ:{
"^":"a;a,b,c,d,e,f,r",
gm:function(a){return this.a},
gX:function(a){return this.a===0},
gcK:function(){return H.e(new H.fw(this),[H.N(this,0)])},
gdc:function(a){return H.b6(this.gcK(),new H.ft(this),H.N(this,0),H.N(this,1))},
b_:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.c1(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.c1(y,a)}else return this.fc(a)},
fc:function(a){var z=this.d
if(z==null)return!1
return this.aM(this.a3(z,this.aL(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a3(z,b)
return y==null?null:y.gan()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.a3(x,b)
return y==null?null:y.gan()}else return this.fd(b)},
fd:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a3(z,this.aL(a))
x=this.aM(y,a)
if(x<0)return
return y[x].gan()},
v:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bn()
this.b=z}this.bV(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bn()
this.c=y}this.bV(y,b,c)}else this.ff(b,c)},
ff:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bn()
this.d=z}y=this.aL(a)
x=this.a3(z,y)
if(x==null)this.bp(z,y,[this.bo(a,b)])
else{w=this.aM(x,a)
if(w>=0)x[w].san(b)
else x.push(this.bo(a,b))}},
ar:function(a,b){if(typeof b==="string")return this.cf(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cf(this.c,b)
else return this.fe(b)},
fe:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a3(z,this.aL(a))
x=this.aM(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.co(w)
return w.gan()},
a9:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.O(this))
z=z.c}},
bV:function(a,b,c){var z=this.a3(a,b)
if(z==null)this.bp(a,b,this.bo(b,c))
else z.san(c)},
cf:function(a,b){var z
if(a==null)return
z=this.a3(a,b)
if(z==null)return
this.co(z)
this.c2(a,b)
return z.gan()},
bo:function(a,b){var z,y
z=new H.fv(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
co:function(a){var z,y
z=a.gel()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aL:function(a){return J.L(a)&0x3ffffff},
aM:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a6(a[y].gcH(),b))return y
return-1},
i:function(a){return P.cQ(this)},
a3:function(a,b){return a[b]},
bp:function(a,b,c){a[b]=c},
c2:function(a,b){delete a[b]},
c1:function(a,b){return this.a3(a,b)!=null},
bn:function(){var z=Object.create(null)
this.bp(z,"<non-identifier-key>",z)
this.c2(z,"<non-identifier-key>")
return z},
$isfe:1},
ft:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
fv:{
"^":"a;cH:a<,an:b@,c,el:d<"},
fw:{
"^":"U;a",
gm:function(a){return this.a.a},
gM:function(a){var z,y
z=this.a
y=new H.fx(z,z.r,null,null)
y.c=z.e
return y},
L:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.O(z))
y=y.c}},
$isx:1},
fx:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.O(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
j3:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
j4:{
"^":"d:10;a",
$2:function(a,b){return this.a(a,b)}},
j5:{
"^":"d:11;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bC:function(){return new P.ax("No element")},
fn:function(){return new P.ax("Too few elements")},
hd:function(a){return a.gh_()},
b5:{
"^":"U;",
gM:function(a){return new H.cN(this,this.gm(this),0,null)},
L:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.am(0,y))
if(z!==this.gm(this))throw H.f(new P.O(this))}},
ax:function(a,b){return H.e(new H.bI(this,b),[null,null])},
bH:function(a,b){var z,y,x
if(b){z=H.e([],[H.Q(this,"b5",0)])
C.a.sm(z,this.gm(this))}else z=H.e(Array(this.gm(this)),[H.Q(this,"b5",0)])
for(y=0;y<this.gm(this);++y){x=this.am(0,y)
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
bG:function(a){return this.bH(a,!0)},
$isx:1},
cN:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
u:function(){var z,y,x,w
z=this.a
y=J.Y(z)
x=y.gm(z)
if(this.b!==x)throw H.f(new P.O(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.am(z,w);++this.c
return!0}},
cP:{
"^":"U;a,b",
gM:function(a){var z=new H.fB(null,J.bs(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gm:function(a){return J.aH(this.a)},
$asU:function(a,b){return[b]},
static:{b6:function(a,b,c,d){if(!!J.n(a).$isx)return H.e(new H.cw(a,b),[c,d])
return H.e(new H.cP(a,b),[c,d])}}},
cw:{
"^":"cP;a,b",
$isx:1},
fB:{
"^":"fo;a,b,c",
u:function(){var z=this.b
if(z.u()){this.a=this.bj(z.gC())
return!0}this.a=null
return!1},
gC:function(){return this.a},
bj:function(a){return this.c.$1(a)}},
bI:{
"^":"b5;a,b",
gm:function(a){return J.aH(this.a)},
am:function(a,b){return this.bj(J.eg(this.a,b))},
bj:function(a){return this.b.$1(a)},
$asb5:function(a,b){return[b]},
$asU:function(a,b){return[b]},
$isx:1},
cy:{
"^":"a;"}}],["","",,H,{
"^":"",
dP:function(a){var z=H.e(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
hN:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iV()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aE(new P.hP(z),1)).observe(y,{childList:true})
return new P.hO(z,y,x)}else if(self.setImmediate!=null)return P.iW()
return P.iX()},
kv:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aE(new P.hQ(a),0))},"$1","iV",2,0,6],
kw:[function(a){++init.globalState.f.b
self.setImmediate(H.aE(new P.hR(a),0))},"$1","iW",2,0,6],
kx:[function(a){P.bS(C.h,a)},"$1","iX",2,0,6],
dF:function(a,b){var z=H.aW()
z=H.au(z,[z,z]).ah(a)
if(z){b.toString
return a}else{b.toString
return a}},
eZ:function(a,b){var z=H.e(new P.C(0,$.m,null),[b])
P.bR(C.h,new P.f1(a,z))
return z},
f_:function(a,b,c){var z=new P.C(0,$.m,null)
z.$builtinTypeInfo=[c]
P.bR(a,new P.f0(b,z))
return z},
al:function(a){return H.e(new P.dv(H.e(new P.C(0,$.m,null),[a])),[a])},
dD:function(a,b,c){$.m.toString
a.V(b,c)},
iN:function(){var z,y
for(;z=$.aq,z!=null;){$.aC=null
y=z.c
$.aq=y
if(y==null)$.aB=null
$.m=z.b
z.eC()}},
kI:[function(){$.c3=!0
try{P.iN()}finally{$.m=C.c
$.aC=null
$.c3=!1
if($.aq!=null)$.$get$bY().$1(P.dN())}},"$0","dN",0,0,1],
dJ:function(a){if($.aq==null){$.aB=a
$.aq=a
if(!$.c3)$.$get$bY().$1(P.dN())}else{$.aB.c=a
$.aB=a}},
dX:function(a){var z,y
z=$.m
if(C.c===z){P.ar(null,null,C.c,a)
return}z.toString
if(C.c.gbx()===z){P.ar(null,null,z,a)
return}y=$.m
P.ar(null,null,y,y.br(a,!0))},
km:function(a,b){var z,y,x
z=H.e(new P.dC(null,null,null,0),[b])
y=z.geg()
x=z.gei()
z.a=a.ao(y,!0,z.geh(),x)
return z},
iP:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.I(u)
z=t
y=H.G(u)
$.m.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.a7(x)
w=t
v=x.ga1()
c.$2(w,v)}}},
iH:function(a,b,c,d){var z=a.bu()
if(!!J.n(z).$isa8)z.bK(new P.iK(b,c,d))
else b.V(c,d)},
iI:function(a,b){return new P.iJ(a,b)},
bR:function(a,b){var z=$.m
if(z===C.c){z.toString
return P.bS(a,b)}return P.bS(a,z.br(b,!0))},
bS:function(a,b){var z=C.e.aE(a.a,1000)
return H.hg(z<0?0:z,b)},
bX:function(a){var z=$.m
$.m=a
return z},
aV:function(a,b,c,d,e){var z,y,x
z=new P.du(new P.iO(d,e),C.c,null)
y=$.aq
if(y==null){P.dJ(z)
$.aC=$.aB}else{x=$.aC
if(x==null){z.c=y
$.aC=z
$.aq=z}else{z.c=x.c
x.c=z
$.aC=z
if(z.c==null)$.aB=z}}},
dG:function(a,b,c,d){var z,y
if($.m===c)return d.$0()
z=P.bX(c)
try{y=d.$0()
return y}finally{$.m=z}},
dI:function(a,b,c,d,e){var z,y
if($.m===c)return d.$1(e)
z=P.bX(c)
try{y=d.$1(e)
return y}finally{$.m=z}},
dH:function(a,b,c,d,e,f){var z,y
if($.m===c)return d.$2(e,f)
z=P.bX(c)
try{y=d.$2(e,f)
return y}finally{$.m=z}},
ar:function(a,b,c,d){var z=C.c!==c
if(z){d=c.br(d,!(!z||C.c.gbx()===c))
c=C.c}P.dJ(new P.du(d,c,null))},
hP:{
"^":"d:2;a",
$1:function(a){var z,y
H.bm()
z=this.a
y=z.a
z.a=null
y.$0()}},
hO:{
"^":"d:12;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hQ:{
"^":"d:0;a",
$0:function(){H.bm()
this.a.$0()}},
hR:{
"^":"d:0;a",
$0:function(){H.bm()
this.a.$0()}},
iE:{
"^":"ab;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{iF:function(a,b){if(b!=null)return b
if(!!J.n(a).$isJ)return a.ga1()
return}}},
a8:{
"^":"a;"},
f1:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.ag(this.a.$0())}catch(x){w=H.I(x)
z=w
y=H.G(x)
P.dD(this.b,z,y)}}},
f0:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.ag(null)}catch(x){w=H.I(x)
z=w
y=H.G(x)
P.dD(this.b,z,y)}}},
hV:{
"^":"a;f4:a<",
cC:function(a,b){a=a!=null?a:new P.cX()
if(this.a.a!==0)throw H.f(new P.ax("Future already completed"))
$.m.toString
this.V(a,b)},
eK:function(a){return this.cC(a,null)}},
dv:{
"^":"hV;a",
bv:function(a,b){var z=this.a
if(z.a!==0)throw H.f(new P.ax("Future already completed"))
z.aC(b)},
V:function(a,b){this.a.e1(a,b)}},
ay:{
"^":"a;c9:a<,fF:b>,c,d,e",
gau:function(){return this.b.b},
gcG:function(){return(this.c&1)!==0},
gfa:function(){return this.c===6},
gf9:function(){return this.c===8},
gek:function(){return this.d},
ger:function(){return this.d}},
C:{
"^":"a;aY:a?,au:b<,c",
ged:function(){return this.a===8},
see:function(a){if(a)this.a=2
else this.a=0},
b6:function(a,b){var z,y
z=H.e(new P.C(0,$.m,null),[null])
y=z.b
if(y!==C.c){y.toString
if(b!=null)b=P.dF(b,y)}this.ba(new P.ay(null,z,b==null?1:3,a,b))
return z},
aR:function(a){return this.b6(a,null)},
bK:function(a){var z,y
z=$.m
y=new P.C(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.ba(new P.ay(null,y,8,a,null))
return y},
bm:function(){if(this.a!==0)throw H.f(new P.ax("Future already completed"))
this.a=1},
geq:function(){return this.c},
gaD:function(){return this.c},
cm:function(a){this.a=4
this.c=a},
cl:function(a){this.a=8
this.c=a},
eo:function(a,b){this.cl(new P.ab(a,b))},
ba:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ar(null,null,z,new P.i5(this,a))}else{a.a=this.c
this.c=a}},
aX:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gc9()
z.a=y}return y},
ag:function(a){var z,y
z=J.n(a)
if(!!z.$isa8)if(!!z.$isC)P.bf(a,this)
else P.c_(a,this)
else{y=this.aX()
this.cm(a)
P.ah(this,y)}},
c0:function(a){var z=this.aX()
this.cm(a)
P.ah(this,z)},
V:[function(a,b){var z=this.aX()
this.cl(new P.ab(a,b))
P.ah(this,z)},function(a){return this.V(a,null)},"fW","$2","$1","gbg",2,2,13,0],
aC:function(a){var z
if(a==null);else{z=J.n(a)
if(!!z.$isa8){if(!!z.$isC){z=a.a
if(z>=4&&z===8){this.bm()
z=this.b
z.toString
P.ar(null,null,z,new P.i7(this,a))}else P.bf(a,this)}else P.c_(a,this)
return}}this.bm()
z=this.b
z.toString
P.ar(null,null,z,new P.i8(this,a))},
e1:function(a,b){var z
this.bm()
z=this.b
z.toString
P.ar(null,null,z,new P.i6(this,a,b))},
$isa8:1,
static:{c_:function(a,b){var z,y,x,w
b.saY(2)
try{a.b6(new P.i9(b),new P.ia(b))}catch(x){w=H.I(x)
z=w
y=H.G(x)
P.dX(new P.ib(b,z,y))}},bf:function(a,b){var z
b.a=2
z=new P.ay(null,b,0,null,null)
if(a.a>=4)P.ah(a,z)
else a.ba(z)},ah:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.ged()
if(b==null){if(w){v=z.a.gaD()
y=z.a.gau()
x=J.a7(v)
u=v.ga1()
y.toString
P.aV(null,null,y,x,u)}return}for(;b.gc9()!=null;b=t){t=b.a
b.a=null
P.ah(z.a,b)}x.a=!0
s=w?null:z.a.geq()
x.b=s
x.c=!1
y=!w
if(!y||b.gcG()||b.c===8){r=b.gau()
if(w){u=z.a.gau()
u.toString
if(u==null?r!=null:u!==r){u=u.gbx()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaD()
y=z.a.gau()
x=J.a7(v)
u=v.ga1()
y.toString
P.aV(null,null,y,x,u)
return}q=$.m
if(q==null?r!=null:q!==r)$.m=r
else q=null
if(y){if(b.gcG())x.a=new P.id(x,b,s,r).$0()}else new P.ic(z,x,b,r).$0()
if(b.gf9())new P.ie(z,x,w,b,r).$0()
if(q!=null)$.m=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.n(y).$isa8}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.C)if(p.a>=4){o.a=2
z.a=p
b=new P.ay(null,o,0,null,null)
y=p
continue}else P.bf(p,o)
else P.c_(p,o)
return}}o=b.b
b=o.aX()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
i5:{
"^":"d:0;a,b",
$0:function(){P.ah(this.a,this.b)}},
i9:{
"^":"d:2;a",
$1:function(a){this.a.c0(a)}},
ia:{
"^":"d:8;a",
$2:function(a,b){this.a.V(a,b)},
$1:function(a){return this.$2(a,null)}},
ib:{
"^":"d:0;a,b,c",
$0:function(){this.a.V(this.b,this.c)}},
i7:{
"^":"d:0;a,b",
$0:function(){P.bf(this.b,this.a)}},
i8:{
"^":"d:0;a,b",
$0:function(){this.a.c0(this.b)}},
i6:{
"^":"d:0;a,b,c",
$0:function(){this.a.V(this.b,this.c)}},
id:{
"^":"d:14;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.b5(this.b.gek(),this.c)
return!0}catch(x){w=H.I(x)
z=w
y=H.G(x)
this.a.b=new P.ab(z,y)
return!1}}},
ic:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaD()
y=!0
r=this.c
if(r.gfa()){x=r.d
try{y=this.d.b5(x,J.a7(z))}catch(q){r=H.I(q)
w=r
v=H.G(q)
r=J.a7(z)
p=w
o=(r==null?p==null:r===p)?z:new P.ab(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aW()
p=H.au(p,[p,p]).ah(r)
n=this.d
m=this.b
if(p)m.b=n.fH(u,J.a7(z),z.ga1())
else m.b=n.b5(u,J.a7(z))}catch(q){r=H.I(q)
t=r
s=H.G(q)
r=J.a7(z)
p=t
o=(r==null?p==null:r===p)?z:new P.ab(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
ie:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.d4(this.d.ger())
z.a=w
v=w}catch(u){z=H.I(u)
y=z
x=H.G(u)
if(this.c){z=J.a7(this.a.a.gaD())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaD()
else v.b=new P.ab(y,x)
v.a=!1
return}if(!!J.n(v).$isa8){t=this.d
s=t.gfF(t)
s.see(!0)
this.b.c=!0
v.b6(new P.ig(this.a,s),new P.ih(z,s))}}},
ig:{
"^":"d:2;a,b",
$1:function(a){P.ah(this.a.a,new P.ay(null,this.b,0,null,null))}},
ih:{
"^":"d:8;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.C)){y=H.e(new P.C(0,$.m,null),[null])
z.a=y
y.eo(a,b)}P.ah(z.a,new P.ay(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
du:{
"^":"a;a,b,c",
eC:function(){return this.a.$0()}},
af:{
"^":"a;",
ax:function(a,b){return H.e(new P.it(b,this),[H.Q(this,"af",0),null])},
L:function(a,b){var z,y
z={}
y=H.e(new P.C(0,$.m,null),[null])
z.a=null
z.a=this.ao(new P.h7(z,this,b,y),!0,new P.h8(y),y.gbg())
return y},
gm:function(a){var z,y
z={}
y=H.e(new P.C(0,$.m,null),[P.u])
z.a=0
this.ao(new P.h9(z),!0,new P.ha(z,y),y.gbg())
return y},
bG:function(a){var z,y
z=H.e([],[H.Q(this,"af",0)])
y=H.e(new P.C(0,$.m,null),[[P.p,H.Q(this,"af",0)]])
this.ao(new P.hb(this,z),!0,new P.hc(z,y),y.gbg())
return y}},
h7:{
"^":"d;a,b,c,d",
$1:function(a){P.iP(new P.h5(this.c,a),new P.h6(),P.iI(this.a.a,this.d))},
$signature:function(){return H.bh(function(a){return{func:1,args:[a]}},this.b,"af")}},
h5:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
h6:{
"^":"d:2;",
$1:function(a){}},
h8:{
"^":"d:0;a",
$0:function(){this.a.ag(null)}},
h9:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
ha:{
"^":"d:0;a,b",
$0:function(){this.b.ag(this.a.a)}},
hb:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bh(function(a){return{func:1,args:[a]}},this.a,"af")}},
hc:{
"^":"d:0;a,b",
$0:function(){this.b.ag(this.a)}},
h4:{
"^":"a;"},
kB:{
"^":"a;"},
hS:{
"^":"a;au:d<,aY:e?",
bB:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cu()
if((z&4)===0&&(this.e&32)===0)this.c6(this.gcb())},
aP:function(a){return this.bB(a,null)},
d2:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gX(z)}else z=!1
if(z)this.r.b8(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.c6(this.gcd())}}}},
bu:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bd()
return this.f},
bd:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cu()
if((this.e&32)===0)this.r=null
this.f=this.ca()},
bc:["dJ",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.ci(a)
else this.bb(new P.hY(a,null))}],
b9:["dK",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ck(a,b)
else this.bb(new P.i_(a,b,null))}],
e0:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cj()
else this.bb(C.o)},
cc:[function(){},"$0","gcb",0,0,1],
ce:[function(){},"$0","gcd",0,0,1],
ca:function(){return},
bb:function(a){var z,y
z=this.r
if(z==null){z=new P.iD(null,null,0)
this.r=z}z.av(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.b8(this)}},
ci:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bF(this.a,a)
this.e=(this.e&4294967263)>>>0
this.be((z&4)!==0)},
ck:function(a,b){var z,y
z=this.e
y=new P.hU(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bd()
z=this.f
if(!!J.n(z).$isa8)z.bK(y)
else y.$0()}else{y.$0()
this.be((z&4)!==0)}},
cj:function(){var z,y
z=new P.hT(this)
this.bd()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isa8)y.bK(z)
else z.$0()},
c6:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.be((z&4)!==0)},
be:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gX(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gX(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cc()
else this.ce()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.b8(this)},
dX:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dF(b,z)
this.c=c}},
hU:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aW()
x=H.au(x,[x,x]).ah(y)
w=z.d
v=this.b
u=z.b
if(x)w.fI(u,v,this.c)
else w.bF(u,v)
z.e=(z.e&4294967263)>>>0}},
hT:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.d5(z.c)
z.e=(z.e&4294967263)>>>0}},
dx:{
"^":"a;b2:a@"},
hY:{
"^":"dx;b,a",
bC:function(a){a.ci(this.b)}},
i_:{
"^":"dx;aJ:b>,a1:c<,a",
bC:function(a){a.ck(this.b,this.c)}},
hZ:{
"^":"a;",
bC:function(a){a.cj()},
gb2:function(){return},
sb2:function(a){throw H.f(new P.ax("No events after a done."))}},
iv:{
"^":"a;aY:a?",
b8:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dX(new P.iw(this,a))
this.a=1},
cu:function(){if(this.a===1)this.a=3}},
iw:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.f6(this.b)}},
iD:{
"^":"iv;b,c,a",
gX:function(a){return this.c==null},
av:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sb2(b)
this.c=b}},
f6:function(a){var z,y
z=this.b
y=z.gb2()
this.b=y
if(y==null)this.c=null
z.bC(a)}},
dC:{
"^":"a;a,b,c,aY:d?",
bX:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
h0:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.ag(!0)
return}this.a.aP(0)
this.c=a
this.d=3},"$1","geg",2,0,function(){return H.bh(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dC")}],
ej:[function(a,b){var z
if(this.d===2){z=this.c
this.bX(0)
z.V(a,b)
return}this.a.aP(0)
this.c=new P.ab(a,b)
this.d=4},function(a){return this.ej(a,null)},"h2","$2","$1","gei",2,2,15,0],
h1:[function(){if(this.d===2){var z=this.c
this.bX(0)
z.ag(!1)
return}this.a.aP(0)
this.c=null
this.d=5},"$0","geh",0,0,1]},
iK:{
"^":"d:0;a,b,c",
$0:function(){return this.a.V(this.b,this.c)}},
iJ:{
"^":"d:7;a,b",
$2:function(a,b){return P.iH(this.a,this.b,a,b)}},
bZ:{
"^":"af;",
ao:function(a,b,c,d){return this.e5(a,d,c,!0===b)},
cO:function(a,b,c){return this.ao(a,null,b,c)},
e5:function(a,b,c,d){return P.i4(this,a,b,c,d,H.Q(this,"bZ",0),H.Q(this,"bZ",1))},
c7:function(a,b){b.bc(a)},
$asaf:function(a,b){return[b]}},
dy:{
"^":"hS;x,y,a,b,c,d,e,f,r",
bc:function(a){if((this.e&2)!==0)return
this.dJ(a)},
b9:function(a,b){if((this.e&2)!==0)return
this.dK(a,b)},
cc:[function(){var z=this.y
if(z==null)return
z.aP(0)},"$0","gcb",0,0,1],
ce:[function(){var z=this.y
if(z==null)return
z.d2()},"$0","gcd",0,0,1],
ca:function(){var z=this.y
if(z!=null){this.y=null
z.bu()}return},
fX:[function(a){this.x.c7(a,this)},"$1","ge9",2,0,function(){return H.bh(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dy")}],
fZ:[function(a,b){this.b9(a,b)},"$2","geb",4,0,16],
fY:[function(){this.e0()},"$0","gea",0,0,1],
dY:function(a,b,c,d,e,f,g){var z,y
z=this.ge9()
y=this.geb()
this.y=this.x.a.cO(z,this.gea(),y)},
static:{i4:function(a,b,c,d,e,f,g){var z=$.m
z=H.e(new P.dy(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.dX(b,c,d,e)
z.dY(a,b,c,d,e,f,g)
return z}}},
it:{
"^":"bZ;b,a",
c7:function(a,b){var z,y,x,w,v
z=null
try{z=this.ep(a)}catch(w){v=H.I(w)
y=v
x=H.G(w)
$.m.toString
b.b9(y,x)
return}b.bc(z)},
ep:function(a){return this.b.$1(a)}},
ab:{
"^":"a;aJ:a>,a1:b<",
i:function(a){return H.b(this.a)},
$isJ:1},
iG:{
"^":"a;"},
iO:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.f(new P.iE(z,P.iF(z,this.b)))}},
iy:{
"^":"iG;",
gbx:function(){return this},
d5:function(a){var z,y,x,w
try{if(C.c===$.m){x=a.$0()
return x}x=P.dG(null,null,this,a)
return x}catch(w){x=H.I(w)
z=x
y=H.G(w)
return P.aV(null,null,this,z,y)}},
bF:function(a,b){var z,y,x,w
try{if(C.c===$.m){x=a.$1(b)
return x}x=P.dI(null,null,this,a,b)
return x}catch(w){x=H.I(w)
z=x
y=H.G(w)
return P.aV(null,null,this,z,y)}},
fI:function(a,b,c){var z,y,x,w
try{if(C.c===$.m){x=a.$2(b,c)
return x}x=P.dH(null,null,this,a,b,c)
return x}catch(w){x=H.I(w)
z=x
y=H.G(w)
return P.aV(null,null,this,z,y)}},
br:function(a,b){if(b)return new P.iz(this,a)
else return new P.iA(this,a)},
ey:function(a,b){if(b)return new P.iB(this,a)
else return new P.iC(this,a)},
h:function(a,b){return},
d4:function(a){if($.m===C.c)return a.$0()
return P.dG(null,null,this,a)},
b5:function(a,b){if($.m===C.c)return a.$1(b)
return P.dI(null,null,this,a,b)},
fH:function(a,b,c){if($.m===C.c)return a.$2(b,c)
return P.dH(null,null,this,a,b,c)}},
iz:{
"^":"d:0;a,b",
$0:function(){return this.a.d5(this.b)}},
iA:{
"^":"d:0;a,b",
$0:function(){return this.a.d4(this.b)}},
iB:{
"^":"d:2;a,b",
$1:function(a){return this.a.bF(this.b,a)}},
iC:{
"^":"d:2;a,b",
$1:function(a){return this.a.b5(this.b,a)}}}],["","",,P,{
"^":"",
cL:function(){return H.e(new H.aQ(0,null,null,null,null,null,0),[null,null])},
ao:function(a){return H.dQ(a,H.e(new H.aQ(0,null,null,null,null,null,0),[null,null]))},
fm:function(a,b,c){var z,y
if(P.c4(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aD()
y.push(a)
try{P.iM(a,z)}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=P.d5(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
b2:function(a,b,c){var z,y,x
if(P.c4(a))return b+"..."+c
z=new P.bQ(b)
y=$.$get$aD()
y.push(a)
try{x=z
x.a=P.d5(x.gat(),a,", ")}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=z
y.a=y.gat()+c
y=z.gat()
return y.charCodeAt(0)==0?y:y},
c4:function(a){var z,y
for(z=0;y=$.$get$aD(),z<y.length;++z)if(a===y[z])return!0
return!1},
iM:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gM(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.b(z.gC())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.c(b,0)
v=b.pop()
if(0>=b.length)return H.c(b,0)
u=b.pop()}else{t=z.gC();++x
if(!z.u()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.c(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gC();++x
for(;z.u();t=s,s=r){r=z.gC();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.c(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.c(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
b4:function(a,b,c,d,e){return H.e(new H.aQ(0,null,null,null,null,null,0),[d,e])},
an:function(a,b){return P.io(a,b)},
aw:function(a,b,c,d){return H.e(new P.il(0,null,null,null,null,null,0),[d])},
cQ:function(a){var z,y,x
z={}
if(P.c4(a))return"{...}"
y=new P.bQ("")
try{$.$get$aD().push(a)
x=y
x.a=x.gat()+"{"
z.a=!0
J.eh(a,new P.fC(z,y))
z=y
z.a=z.gat()+"}"}finally{z=$.$get$aD()
if(0>=z.length)return H.c(z,0)
z.pop()}z=y.gat()
return z.charCodeAt(0)==0?z:z},
im:{
"^":"aQ;a,b,c,d,e,f,r",
aL:function(a){return H.jh(a)&0x3ffffff},
aM:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcH()
if(x==null?b==null:x===b)return y}return-1},
static:{io:function(a,b){return H.e(new P.im(0,null,null,null,null,null,0),[a,b])}}},
il:{
"^":"ii;a,b,c,d,e,f,r",
gM:function(a){var z=new P.cM(this,this.r,null,null)
z.c=this.e
return z},
gm:function(a){return this.a},
aH:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.e4(b)},
e4:function(a){var z=this.d
if(z==null)return!1
return this.aW(z[this.aV(a)],a)>=0},
cP:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.aH(0,a)?a:null
else return this.ef(a)},
ef:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aV(a)]
x=this.aW(y,a)
if(x<0)return
return J.e1(y,x).gc3()},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.f(new P.O(this))
z=z.b}},
av:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.c1()
this.b=z}return this.bY(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.c1()
this.c=y}return this.bY(y,b)}else return this.a8(b)},
a8:function(a){var z,y,x
z=this.d
if(z==null){z=P.c1()
this.d=z}y=this.aV(a)
x=z[y]
if(x==null)z[y]=[this.bf(a)]
else{if(this.aW(x,a)>=0)return!1
x.push(this.bf(a))}return!0},
ar:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bZ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bZ(this.c,b)
else return this.em(b)},
em:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aV(a)]
x=this.aW(y,a)
if(x<0)return!1
this.c_(y.splice(x,1)[0])
return!0},
a9:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bY:function(a,b){if(a[b]!=null)return!1
a[b]=this.bf(b)
return!0},
bZ:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.c_(z)
delete a[b]
return!0},
bf:function(a){var z,y
z=new P.fy(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c_:function(a){var z,y
z=a.ge3()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aV:function(a){return J.L(a)&0x3ffffff},
aW:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a6(a[y].gc3(),b))return y
return-1},
$isx:1,
static:{c1:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fy:{
"^":"a;c3:a<,b,e3:c<"},
cM:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.O(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
ii:{
"^":"fY;"},
cO:{
"^":"a;",
gM:function(a){return new H.cN(a,this.gm(a),0,null)},
am:function(a,b){return this.h(a,b)},
L:function(a,b){var z,y,x,w
z=this.gm(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.c(a,w)
b.$1(a[w])
if(x)throw H.f(new P.O(a))}},
ax:function(a,b){return H.e(new H.bI(a,b),[null,null])},
i:function(a){return P.b2(a,"[","]")},
$isp:1,
$asp:null,
$isx:1},
fC:{
"^":"d:17;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
fz:{
"^":"U;a,b,c,d",
gM:function(a){return new P.ip(this,this.c,this.d,this.b,null)},
L:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.c(x,y)
b.$1(x[y])
if(z!==this.d)H.H(new P.O(this))}},
gX:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a9:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.c(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.b2(this,"{","}")},
d1:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.bC());++this.d
y=this.a
x=y.length
if(z>=x)return H.c(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
a8:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.c(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.c5();++this.d},
c5:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,[H.N(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.bR(y,0,w,z,x)
C.a.bR(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dN:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$isx:1,
static:{bG:function(a,b){var z=H.e(new P.fz(null,0,0,0),[b])
z.dN(a,b)
return z}}},
ip:{
"^":"a;a,b,c,d,e",
gC:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.H(new P.O(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.c(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fZ:{
"^":"a;",
ax:function(a,b){return H.e(new H.cw(this,b),[H.N(this,0),null])},
i:function(a){return P.b2(this,"{","}")},
L:function(a,b){var z
for(z=this.gM(this);z.u();)b.$1(z.d)},
$isx:1},
fY:{
"^":"fZ;"}}],["","",,P,{
"^":"",
iQ:function(a){return H.hd(a)},
bz:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aJ(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eW(a)},
eW:function(a){var z=J.n(a)
if(!!z.$isd)return z.i(a)
return H.b9(a)},
b1:function(a){return new P.i3(a)},
fA:function(a,b,c){var z,y,x
z=J.fp(a,c)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
bH:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.bs(a);y.u();)z.push(y.gC())
if(b)return z
z.fixed$length=Array
return z},
K:function(a){var z=H.b(a)
H.ji(z)},
kb:{
"^":"d:18;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.iQ(a)}},
c5:{
"^":"a;"},
"+bool":0,
b0:{
"^":"a;a,b",
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.b0))return!1
return this.a===b.a&&this.b===b.b},
gB:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.eQ(z?H.M(this).getUTCFullYear()+0:H.M(this).getFullYear()+0)
x=P.aL(z?H.M(this).getUTCMonth()+1:H.M(this).getMonth()+1)
w=P.aL(z?H.M(this).getUTCDate()+0:H.M(this).getDate()+0)
v=P.aL(z?H.M(this).getUTCHours()+0:H.M(this).getHours()+0)
u=P.aL(z?H.M(this).getUTCMinutes()+0:H.M(this).getMinutes()+0)
t=P.aL(z?H.M(this).getUTCSeconds()+0:H.M(this).getSeconds()+0)
s=P.eR(H.bN(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{eQ:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},eR:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aL:function(a){if(a>=10)return""+a
return"0"+a}}},
a5:{
"^":"aY;"},
"+double":0,
aM:{
"^":"a;a",
j:function(a,b){return new P.aM(C.e.j(this.a,b.ge6()))},
b7:function(a,b){return C.e.b7(this.a,b.ge6())},
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.aM))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eV()
y=this.a
if(y<0)return"-"+new P.aM(-y).i(0)
x=z.$1(C.e.bD(C.e.aE(y,6e7),60))
w=z.$1(C.e.bD(C.e.aE(y,1e6),60))
v=new P.eU().$1(C.e.bD(y,1e6))
return""+C.e.aE(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
eU:{
"^":"d:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eV:{
"^":"d:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
J:{
"^":"a;",
ga1:function(){return H.G(this.$thrownJsError)}},
cX:{
"^":"J;",
i:function(a){return"Throw of null."}},
aj:{
"^":"J;a,b,c,d",
gbi:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbh:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gbi()+y+x
if(!this.a)return w
v=this.gbh()
u=P.bz(this.b)
return w+v+": "+H.b(u)},
static:{aK:function(a){return new P.aj(!1,null,null,a)},eD:function(a,b,c){return new P.aj(!0,a,b,c)}}},
bP:{
"^":"aj;e,f,a,b,c,d",
gbi:function(){return"RangeError"},
gbh:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.fT()
if(typeof z!=="number")return H.k(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{fR:function(a){return new P.bP(null,null,!1,null,null,a)},ba:function(a,b,c){return new P.bP(null,null,!0,a,b,"Value not in range")},aR:function(a,b,c,d,e){return new P.bP(b,c,!0,a,d,"Invalid value")},d1:function(a,b,c,d,e,f){if(0>a||a>c)throw H.f(P.aR(a,0,c,"start",f))
if(a>b||b>c)throw H.f(P.aR(b,a,c,"end",f))
return b}}},
fc:{
"^":"aj;e,m:f>,a,b,c,d",
gbi:function(){return"RangeError"},
gbh:function(){P.bz(this.e)
var z=": index should be less than "+H.b(this.f)
return J.e0(this.b,0)?": index must not be negative":z},
static:{cF:function(a,b,c,d,e){var z=e!=null?e:J.aH(b)
return new P.fc(b,z,!0,a,c,"Index out of range")}}},
V:{
"^":"J;a",
i:function(a){return"Unsupported operation: "+this.a}},
ds:{
"^":"J;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
ax:{
"^":"J;a",
i:function(a){return"Bad state: "+this.a}},
O:{
"^":"J;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bz(z))+"."}},
d4:{
"^":"a;",
i:function(a){return"Stack Overflow"},
ga1:function(){return},
$isJ:1},
eP:{
"^":"J;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
i3:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eX:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.b8(b,"expando$values")
return z==null?null:H.b8(z,this.c4())},
v:function(a,b,c){var z=H.b8(b,"expando$values")
if(z==null){z=new P.a()
H.bO(b,"expando$values",z)}H.bO(z,this.c4(),c)},
c4:function(){var z,y
z=H.b8(this,"expando$key")
if(z==null){y=$.cx
$.cx=y+1
z="expando$key$"+y
H.bO(this,"expando$key",z)}return z}},
eY:{
"^":"a;"},
u:{
"^":"aY;"},
"+int":0,
U:{
"^":"a;",
ax:function(a,b){return H.b6(this,b,H.Q(this,"U",0),null)},
L:function(a,b){var z
for(z=this.gM(this);z.u();)b.$1(z.gC())},
bH:function(a,b){return P.bH(this,b,H.Q(this,"U",0))},
bG:function(a){return this.bH(a,!0)},
gm:function(a){var z,y
z=this.gM(this)
for(y=0;z.u();)++y
return y},
am:function(a,b){var z,y,x
if(b<0)H.H(P.aR(b,0,null,"index",null))
for(z=this.gM(this),y=0;z.u();){x=z.gC()
if(b===y)return x;++y}throw H.f(P.cF(b,this,"index",null,y))},
i:function(a){return P.fm(this,"(",")")}},
fo:{
"^":"a;"},
p:{
"^":"a;",
$asp:null,
$isx:1},
"+List":0,
kc:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aY:{
"^":"a;"},
"+num":0,
a:{
"^":";",
p:function(a,b){return this===b},
gB:function(a){return H.ad(this)},
i:function(a){return H.b9(this)}},
ae:{
"^":"a;"},
P:{
"^":"a;"},
"+String":0,
bQ:{
"^":"a;at:a<",
gm:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{d5:function(a,b,c){var z=J.bs(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gC())
while(z.u())}else{a+=H.b(z.gC())
for(;z.u();)a=a+c+H.b(z.gC())}return a}}},
d6:{
"^":"a;"}}],["","",,W,{
"^":"",
eG:function(a,b){var z=document.createElement("canvas",null)
J.ez(z,b)
J.ex(z,a)
return z},
eO:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.x)},
ai:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dz:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dE:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hX(a)
if(!!J.n(z).$isW)return z
return}else return a},
a3:function(a){var z=$.m
if(z===C.c)return a
return z.ey(a,!0)},
D:{
"^":"aN;",
$isD:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
jq:{
"^":"D;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
js:{
"^":"D;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
jt:{
"^":"D;",
gbz:function(a){return H.e(new W.B(a,"error",!1),[null])},
gbA:function(a){return H.e(new W.B(a,"load",!1),[null])},
$isW:1,
$ish:1,
"%":"HTMLBodyElement"},
co:{
"^":"D;k:height%,l:width%",
bL:function(a,b,c){return a.getContext(b,P.iY(c))},
dh:function(a,b,c,d,e,f,g){var z,y
z=P.ao(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bL(a,"webgl",z)
return y==null?this.bL(a,"experimental-webgl",z):y},
dg:function(a,b){return this.dh(a,!0,!0,!0,!0,!1,b)},
$isco:1,
"%":"HTMLCanvasElement"},
ju:{
"^":"h;",
cN:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
jw:{
"^":"b7;m:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jx:{
"^":"fd;m:length=",
bO:function(a,b){var z=this.e8(a,b)
return z!=null?z:""},
e8:function(a,b){if(W.eO(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.eS()+b)},
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fd:{
"^":"h+eN;"},
eN:{
"^":"a;",
gk:function(a){return this.bO(a,"height")},
gl:function(a){return this.bO(a,"width")}},
jy:{
"^":"b7;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
jz:{
"^":"h;",
i:function(a){return String(a)},
"%":"DOMException"},
eT:{
"^":"h;bs:bottom=,k:height=,Y:left=,bE:right=,az:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gl(a))+" x "+H.b(this.gk(a))},
p:function(a,b){var z,y,x
if(b==null)return!1
z=J.n(b)
if(!z.$isaa)return!1
y=a.left
x=z.gY(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaz(b)
if(y==null?x==null:y===x){y=this.gl(a)
x=z.gl(b)
if(y==null?x==null:y===x){y=this.gk(a)
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){var z,y,x,w
z=J.L(a.left)
y=J.L(a.top)
x=J.L(this.gl(a))
w=J.L(this.gk(a))
return W.dz(W.ai(W.ai(W.ai(W.ai(0,z),y),x),w))},
gbI:function(a){return H.e(new P.a9(a.left,a.top),[null])},
$isaa:1,
$asaa:I.bj,
"%":";DOMRectReadOnly"},
aN:{
"^":"b7;",
gS:function(a){return P.fT(C.b.b4(a.offsetLeft),C.b.b4(a.offsetTop),C.b.b4(a.offsetWidth),C.b.b4(a.offsetHeight),null)},
i:function(a){return a.localName},
df:function(a){return a.getBoundingClientRect()},
gbz:function(a){return H.e(new W.B(a,"error",!1),[null])},
gbA:function(a){return H.e(new W.B(a,"load",!1),[null])},
gcS:function(a){return H.e(new W.B(a,"mousedown",!1),[null])},
gcT:function(a){return H.e(new W.B(a,"mouseenter",!1),[null])},
gcU:function(a){return H.e(new W.B(a,"mouseleave",!1),[null])},
gcV:function(a){return H.e(new W.B(a,"mousemove",!1),[null])},
gcW:function(a){return H.e(new W.B(a,"mouseout",!1),[null])},
gcX:function(a){return H.e(new W.B(a,"mouseover",!1),[null])},
gcY:function(a){return H.e(new W.B(a,"mouseup",!1),[null])},
$isaN:1,
$ish:1,
$isW:1,
"%":";Element"},
jA:{
"^":"D;k:height%,a7:src},l:width%",
"%":"HTMLEmbedElement"},
jB:{
"^":"bA;aJ:error=",
"%":"ErrorEvent"},
bA:{
"^":"h;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
W:{
"^":"h;",
e_:function(a,b,c,d){return a.addEventListener(b,H.aE(c,1),d)},
en:function(a,b,c,d){return a.removeEventListener(b,H.aE(c,1),d)},
$isW:1,
"%":"MediaStream;EventTarget"},
jU:{
"^":"D;m:length=",
"%":"HTMLFormElement"},
jV:{
"^":"D;k:height%,a7:src},l:width%",
"%":"HTMLIFrameElement"},
cE:{
"^":"D;k:height%,a7:src},l:width%",
bv:function(a,b){return a.complete.$1(b)},
$iscE:1,
"%":"HTMLImageElement"},
jX:{
"^":"D;k:height%,a7:src},l:width%",
$isaN:1,
$ish:1,
$isW:1,
"%":"HTMLInputElement"},
fD:{
"^":"D;aJ:error=,a7:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bJ:{
"^":"hJ;",
gS:function(a){var z,y
if(!!a.offsetX)return H.e(new P.a9(a.offsetX,a.offsetY),[null])
else{if(!J.n(W.dE(a.target)).$isaN)throw H.f(new P.V("offsetX is only supported on elements"))
z=W.dE(a.target)
y=H.e(new P.a9(a.clientX,a.clientY),[null]).a2(0,J.eq(J.et(z)))
return H.e(new P.a9(J.cl(y.a),J.cl(y.b)),[null])}},
$isbJ:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
ka:{
"^":"h;",
$ish:1,
"%":"Navigator"},
b7:{
"^":"W;",
i:function(a){var z=a.nodeValue
return z==null?this.dH(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
kd:{
"^":"D;k:height%,l:width%",
"%":"HTMLObjectElement"},
kh:{
"^":"D;a7:src}",
"%":"HTMLScriptElement"},
kj:{
"^":"D;m:length=",
"%":"HTMLSelectElement"},
kk:{
"^":"D;a7:src}",
"%":"HTMLSourceElement"},
kl:{
"^":"bA;aJ:error=",
"%":"SpeechRecognitionError"},
kq:{
"^":"D;cM:kind=,a7:src}",
"%":"HTMLTrackElement"},
hJ:{
"^":"bA;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
dt:{
"^":"fD;k:height%,l:width%",
$isdt:1,
"%":"HTMLVideoElement"},
ku:{
"^":"W;",
$ish:1,
$isW:1,
"%":"DOMWindow|Window"},
ky:{
"^":"h;bs:bottom=,k:height=,Y:left=,bE:right=,az:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
p:function(a,b){var z,y,x
if(b==null)return!1
z=J.n(b)
if(!z.$isaa)return!1
y=a.left
x=z.gY(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaz(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){var z,y,x,w
z=J.L(a.left)
y=J.L(a.top)
x=J.L(a.width)
w=J.L(a.height)
return W.dz(W.ai(W.ai(W.ai(W.ai(0,z),y),x),w))},
gbI:function(a){return H.e(new P.a9(a.left,a.top),[null])},
$isaa:1,
$asaa:I.bj,
"%":"ClientRect"},
kz:{
"^":"b7;",
$ish:1,
"%":"DocumentType"},
kA:{
"^":"eT;",
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"DOMRect"},
kD:{
"^":"D;",
$isW:1,
$ish:1,
"%":"HTMLFrameSetElement"},
i2:{
"^":"af;",
ao:function(a,b,c,d){var z=new W.a2(0,this.a,this.b,W.a3(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.O()
return z},
cO:function(a,b,c){return this.ao(a,null,b,c)}},
B:{
"^":"i2;a,b,c"},
a2:{
"^":"h4;a,b,c,d,e",
bu:function(){if(this.b==null)return
this.cp()
this.b=null
this.d=null
return},
bB:function(a,b){if(this.b==null)return;++this.a
this.cp()},
aP:function(a){return this.bB(a,null)},
d2:function(){if(this.b==null||this.a<=0)return;--this.a
this.O()},
O:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.e2(x,this.c,z,this.e)}},
cp:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.e3(x,this.c,z,this.e)}}},
hW:{
"^":"a;a",
$isW:1,
$ish:1,
static:{hX:function(a){if(a===window)return a
else return new W.hW(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jo:{
"^":"am;",
$ish:1,
"%":"SVGAElement"},
jp:{
"^":"he;",
$ish:1,
"%":"SVGAltGlyphElement"},
jr:{
"^":"r;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
jC:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEBlendElement"},
jD:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
jE:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
jF:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFECompositeElement"},
jG:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
jH:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
jI:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
jJ:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEFloodElement"},
jK:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
jL:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEImageElement"},
jM:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEMergeElement"},
jN:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFEMorphologyElement"},
jO:{
"^":"r;A:dx=,w:dy=,k:height=,l:width=",
$ish:1,
"%":"SVGFEOffsetElement"},
jP:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
jQ:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFETileElement"},
jR:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFETurbulenceElement"},
jS:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGFilterElement"},
jT:{
"^":"am;k:height=,l:width=",
"%":"SVGForeignObjectElement"},
fb:{
"^":"am;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
am:{
"^":"r;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jW:{
"^":"am;k:height=,l:width=",
$ish:1,
"%":"SVGImageElement"},
k_:{
"^":"r;",
$ish:1,
"%":"SVGMarkerElement"},
k0:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGMaskElement"},
ke:{
"^":"r;k:height=,l:width=",
$ish:1,
"%":"SVGPatternElement"},
kf:{
"^":"fb;k:height=,l:width=",
"%":"SVGRectElement"},
ki:{
"^":"r;",
$ish:1,
"%":"SVGScriptElement"},
r:{
"^":"aN;",
gbz:function(a){return H.e(new W.B(a,"error",!1),[null])},
gbA:function(a){return H.e(new W.B(a,"load",!1),[null])},
gcS:function(a){return H.e(new W.B(a,"mousedown",!1),[null])},
gcT:function(a){return H.e(new W.B(a,"mouseenter",!1),[null])},
gcU:function(a){return H.e(new W.B(a,"mouseleave",!1),[null])},
gcV:function(a){return H.e(new W.B(a,"mousemove",!1),[null])},
gcW:function(a){return H.e(new W.B(a,"mouseout",!1),[null])},
gcX:function(a){return H.e(new W.B(a,"mouseover",!1),[null])},
gcY:function(a){return H.e(new W.B(a,"mouseup",!1),[null])},
$isW:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
kn:{
"^":"am;k:height=,l:width=",
$ish:1,
"%":"SVGSVGElement"},
ko:{
"^":"r;",
$ish:1,
"%":"SVGSymbolElement"},
d8:{
"^":"am;",
"%":";SVGTextContentElement"},
kp:{
"^":"d8;",
$ish:1,
"%":"SVGTextPathElement"},
he:{
"^":"d8;A:dx=,w:dy=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
kr:{
"^":"am;k:height=,l:width=",
$ish:1,
"%":"SVGUseElement"},
ks:{
"^":"r;",
$ish:1,
"%":"SVGViewElement"},
kC:{
"^":"r;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
kE:{
"^":"r;",
$ish:1,
"%":"SVGCursorElement"},
kF:{
"^":"r;",
$ish:1,
"%":"SVGFEDropShadowElement"},
kG:{
"^":"r;",
$ish:1,
"%":"SVGGlyphRefElement"},
kH:{
"^":"r;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kg:{
"^":"h;",
ew:function(a,b,c){return a.bindBuffer(b,c)},
ex:function(a,b,c){return a.bindTexture(b,c)},
ez:function(a,b,c){return a.blendFunc(b,c)},
eA:function(a,b,c,d){return a.bufferData(b,c,d)},
eE:function(a,b){return a.clear(b)},
eF:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
eG:function(a,b){return a.clearDepth(b)},
eH:function(a,b){return a.clearStencil(b)},
eJ:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
eN:function(a){return a.createBuffer()},
eO:function(a){return a.createProgram()},
eP:function(a,b){return a.createShader(b)},
eQ:function(a){return a.createTexture()},
eR:function(a,b){return a.depthFunc(b)},
eS:function(a,b){return a.depthMask(b)},
eZ:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
f2:function(a,b){return a.enable(b)},
f3:function(a,b){return a.enableVertexAttribArray(b)},
de:function(a,b,c){return a.getAttribLocation(b,c)},
dj:function(a,b,c){return a.getUniformLocation(b,c)},
cN:function(a,b){return a.lineWidth(b)},
dC:function(a,b,c,d){return a.stencilFunc(b,c,d)},
dD:function(a,b,c,d){return a.stencilOp(b,c,d)},
fK:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.j_(g))
return}z=J.n(g)
if(!!z.$iscE)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isco)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdt)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.f(P.aK("Incorrect number or type of arguments"))},
fJ:function(a,b,c,d,e,f,g){return this.fK(a,b,c,d,e,f,g,null,null,null)},
fL:function(a,b,c,d){return a.texParameteri(b,c,d)},
fO:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
fP:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
fQ:function(a,b){return a.useProgram(b)},
fR:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jv:{
"^":"a;"}}],["","",,P,{
"^":"",
az:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dA:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
ik:{
"^":"a;",
fl:function(a){if(a<=0||a>4294967296)throw H.f(P.fR("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
a9:{
"^":"a;F:a>,I:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.a9))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){var z,y
z=J.L(this.a)
y=J.L(this.b)
return P.dA(P.az(P.az(0,z),y))},
j:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gF(b)
if(typeof z!=="number")return z.j()
x=C.b.j(z,x)
z=this.b
y=y.gI(b)
if(typeof z!=="number")return z.j()
y=new P.a9(x,C.b.j(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
a2:function(a,b){var z,y,x,w
z=this.a
y=J.es(b)
if(typeof z!=="number")return z.a2()
if(typeof y!=="number")return H.k(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.a2()
if(typeof w!=="number")return H.k(w)
w=new P.a9(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
ix:{
"^":"a;",
gbE:function(a){return this.gY(this)+this.c},
gbs:function(a){return this.gaz(this)+this.d},
i:function(a){return"Rectangle ("+this.gY(this)+", "+this.b+") "+this.c+" x "+this.d},
p:function(a,b){var z,y
if(b==null)return!1
z=J.n(b)
if(!z.$isaa)return!1
if(this.gY(this)===z.gY(b)){y=this.b
z=y===z.gaz(b)&&this.a+this.c===z.gbE(b)&&y+this.d===z.gbs(b)}else z=!1
return z},
gB:function(a){var z=this.b
return P.dA(P.az(P.az(P.az(P.az(0,this.gY(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbI:function(a){var z=new P.a9(this.gY(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
aa:{
"^":"ix;Y:a>,az:b>,l:c>,k:d>",
$asaa:null,
static:{fT:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.e(new P.aa(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
j:function(a){return a},
aA:function(a){return a},
cR:{
"^":"h;",
$iscR:1,
"%":"ArrayBuffer"},
bM:{
"^":"h;",
$isbM:1,
"%":"DataView;ArrayBufferView;bK|cS|cU|bL|cT|cV|ac"},
bK:{
"^":"bM;",
gm:function(a){return a.length},
$isbE:1,
$isbD:1},
bL:{
"^":"cU;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
v:function(a,b,c){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
a[b]=c}},
cS:{
"^":"bK+cO;",
$isp:1,
$asp:function(){return[P.a5]},
$isx:1},
cU:{
"^":"cS+cy;"},
ac:{
"^":"cV;",
v:function(a,b,c){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
a[b]=c},
$isp:1,
$asp:function(){return[P.u]},
$isx:1},
cT:{
"^":"bK+cO;",
$isp:1,
$asp:function(){return[P.u]},
$isx:1},
cV:{
"^":"cT+cy;"},
k1:{
"^":"bL;",
$isp:1,
$asp:function(){return[P.a5]},
$isx:1,
"%":"Float32Array"},
k2:{
"^":"bL;",
$isp:1,
$asp:function(){return[P.a5]},
$isx:1,
"%":"Float64Array"},
k3:{
"^":"ac;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Int16Array"},
k4:{
"^":"ac;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Int32Array"},
k5:{
"^":"ac;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Int8Array"},
k6:{
"^":"ac;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Uint16Array"},
k7:{
"^":"ac;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Uint32Array"},
k8:{
"^":"ac;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
k9:{
"^":"ac;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
ji:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,M,{
"^":"",
fP:function(a){switch(a){case 4294967295:case 4289357414:case 4294901760:case 4289374890:case 4294963456:return
case 4278190320:return"assets/act_front.png"
case 4278190321:return"assets/act_right.png"
case 4278190322:return"assets/act_left.png"
case 4278190323:return"assets/act_back.png"
case 4294967210:return"assets/act_rotate_right.png"
case 4294967211:return"assets/act_rotate_left.png"
case 4294963713:return"assets/act_shoot.png"}return},
fN:{
"^":"a0;e,f,r,x,y,z,a,b,c,d",
dm:[function(a){var z,y
P.K("-------------"+a)
switch(a){case"assets/act_front.png":z=[]
y=new Y.w(0,null,null,z)
y.a=4278190320
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_right.png":z=[]
y=new Y.w(0,null,null,z)
y.a=4278190321
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_left.png":z=[]
y=new Y.w(0,null,null,z)
y.a=4278190322
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_back.png":z=[]
y=new Y.w(0,null,null,z)
y.a=4278190323
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_rotate_right.png":z=[]
y=new Y.cC(C.i,4294967210,null,null,z)
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_rotate_left.png":z=[]
y=new Y.fa(C.i,4294967211,null,null,z)
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_shoot.png":z=[]
y=new Y.f8(0,0.7853981633974483,0.8,1,4294963713,null,null,z)
z.push(new Y.z(0,1,4294901760))
break
default:y=null}if(y!=null)this.e.f.b.cx.J(this.y,this.z,y)},"$1","gT",2,0,4],
K:function(a,b){var z,y,x
z=this.f
if(z!=null){z=J.T(z.gH())
y=J.T(this.f.gR())
x=F.E(null)
b.aw(a,this.f,new F.v(0,0,z,y),new F.v(0,0,800,600),x)}this.f0(a,b)},
aq:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=(d-50)/70
y=(e-5)/70
x=this.b
if(!(x&&C.a).aH(x,this.r)){w=C.f.a0(z)
v=C.f.a0(y)
if(0<w){x=this.e.f.b.cx.d
if(typeof x!=="number")return x.a2()
x=w<x-1}else x=!1
if(x){if(0<v){x=this.e.f.b.cx.e
if(typeof x!=="number")return x.a2()
x=v<x-1}else x=!1
if(x){this.y=C.f.a0(z)
this.z=C.f.a0(y)}}}return!1},
f0:function(a,b){var z,y,x,w
z=this.e
y=0
while(!0){x=z.f.b.cx.e
if(typeof x!=="number")return H.k(x)
if(!(y<x))break
w=0
while(!0){x=z.f.b.cx.d
if(typeof x!=="number")return H.k(x)
if(!(w<x))break
this.f_(a,b,w,y);++w}++y}},
f_:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=new F.d9(null,C.k,1)
z.a=F.l(255,255,255,255)
z.c=2.5
z.b=C.d
y=50+c*70
x=5+d*70
w=new F.v(y,x,50,50)
v=this.e
u=v.f.b.cx
t=u.c
u=u.d
if(typeof u!=="number")return H.k(u)
u=c+d*u
if(u>=t.length)return H.c(t,u)
s=t[u]
z.a=new F.bT(s.a)
if(c===this.y&&d===this.z){z.b=C.d
z.c=10.5}else{z.b=C.d
z.c=2.5}b.W(a,w,z)
r=M.fP(s.a)
q=r!=null?v.a.di(r):null
if(q!=null)b.aw(a,q,new F.v(0,0,J.T(q.gH()),J.T(q.gR())),w,z)
for(u=s.d,t=u.length,p=b.a,o=0;o<u.length;u.length===t||(0,H.a4)(u),++o){n=u[o]
m=J.i(n)
if(m.gA(n)===1&&m.gw(n)===0);l=m.gA(n)===1&&m.gw(n)===1?45:0
if(m.gA(n)===0&&m.gw(n)===1)l=90
if(m.gA(n)===-1&&m.gw(n)===1)l=135
if(m.gA(n)===-1&&m.gw(n)===0)l=180
if(m.gA(n)===-1&&m.gw(n)===-1)l=215
if(m.gA(n)===0&&m.gw(n)===-1)l=260
if(m.gA(n)===1&&m.gw(n)===-1)l=315
F.l(255,255,255,255)
m=v.f.b.cx
k=m.c
m=m.d
if(typeof m!=="number")return H.k(m)
m=c+d*m
if(m>=k.length)return H.c(k,m)
m=new F.bT(k[m].a)
j=new E.o(new Float64Array(16))
j.n()
j.G(0,y+25,x+25,0)
j.d3(6.283185307179586*((l-90)/360))
p.push(C.a.gaa(p).t(0,j))
b.ad()
b.al(a,[-10,0,0,-10,41.66666666666667,0],[0,1],m,C.d,2.5)
b.al(a,[-10,41.66666666666667,0,-20,38.333333333333336,0],[0,1],m,C.d,2.5)
b.al(a,[-20,38.333333333333336,0,0,38.333333333333336,0],[0,1],m,C.d,2.5)
if(0>=p.length)return H.c(p,0)
p.pop()
b.ad()}},
cZ:[function(a){var z,y,x,w,v,u
P.K("id == "+a)
switch(a){case"select_button":z=this.b
if(!(z&&C.a).aH(z,this.r))this.b.push(this.r)
break
case"cha_button":z=this.b
if(!(z&&C.a).aH(z,this.x)){z=this.e.f.b.cx
y=this.y
x=this.z
w=z.c
z=z.d
if(typeof z!=="number")return H.k(z)
z=y+x*z
if(z<0||z>=w.length)return H.c(w,z)
v=w[z]
if(v.a===4294963713){this.x.sbT(v)
this.b.push(this.x)}}break
case"back_button":z=this.e
z.e.gE().aj()
z.e.gE().ai(z.b)
break
case"yes_button":z=this.e.f.b.cx
y=this.y
x=this.z
w=z.c
z=z.d
if(typeof z!=="number")return H.k(z)
z=y+x*z
if(z<0||z>=w.length)return H.c(w,z)
z=w[z].d
if(z.length>0){u=J.S(z[0])
if(0>=z.length)return H.c(z,0)
y=z[0]
x=J.i(y)
w=x.gw(y)
if(typeof w!=="number")return H.k(w)
x.sA(y,-1*w)
if(0>=z.length)return H.c(z,0)
J.ci(z[0],u)}break
case"no_button":z=this.e.f.b.cx
y=this.y
x=this.z
w=z.c
z=z.d
if(typeof z!=="number")return H.k(z)
z=y+x*z
if(z<0||z>=w.length)return H.c(w,z)
z=w[z].d
if(z.length>1){u=J.S(z[1])
if(1>=z.length)return H.c(z,1)
y=z[1]
x=J.i(y)
w=x.gw(y)
if(typeof w!=="number")return H.k(w)
x.sA(y,-1*w)
if(1>=z.length)return H.c(z,1)
J.ci(z[1],u)}break}},"$1","ga_",2,0,4],
dQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.e.a
z.a4("assets/bg_prog.png").aR(new M.fQ(this))
y=this.b
x=F.X(z,"cha_button","assets/con_cha.png",80,80,this.ga_())
w=new E.o(new Float64Array(H.j(16)))
w.n()
w.a6(400,500,0)
x.c=w
x.Q=F.l(34,255,0,0)
x.z=F.l(255,255,255,255)
x.ch=F.l(17,0,255,0)
y.push(x)
y=this.b
w=this.ga_()
v=F.l(170,255,170,204)
u=F.l(170,204,170,255)
t=F.l(170,204,255,170)
s=new E.o(new Float64Array(H.j(16)))
s.n()
x=new F.aS(200,120,!1,!1,"back_button",v,u,t,w,0,0,0,0,"none",null,s,!1)
x.b=[]
w=new E.o(new Float64Array(H.j(16)))
w.n()
w.a6(30,480,0)
x.c=w
x.Q=F.l(34,255,0,0)
x.z=F.l(0,0,0,255)
x.ch=F.l(17,0,255,0)
y.push(x)
y=this.b
x=F.X(z,"select_button","assets/con_sel.png",80,80,this.ga_())
w=new E.o(new Float64Array(H.j(16)))
w.n()
w.a6(500,500,0)
x.c=w
x.Q=F.l(34,255,0,0)
x.z=F.l(255,255,255,255)
x.ch=F.l(17,0,255,0)
y.push(x)
y=this.b
x=F.X(z,"yes_button","assets/con_yes_rot.png",80,80,this.ga_())
w=new E.o(new Float64Array(H.j(16)))
w.n()
w.a6(600,500,0)
x.c=w
x.Q=F.l(34,255,0,0)
x.z=F.l(255,255,255,255)
x.ch=F.l(17,0,255,0)
y.push(x)
y=this.b
x=F.X(z,"no_button","assets/con_no_rot.png",80,80,this.ga_())
w=new E.o(new Float64Array(H.j(16)))
w.n()
w.a6(700,500,0)
x.c=w
x.Q=F.l(34,255,0,0)
x.z=F.l(255,255,255,255)
x.ch=F.l(17,0,255,0)
y.push(x)
y=this.y
w=this.z
v=this.gT()
u=new E.o(new Float64Array(H.j(16)))
u.n()
u=new M.hH(y,w,this,z,v,0,0,0,0,600,600,600,840,0,0,"none",null,u,!1)
u.b=[]
r=F.X(z,"assets/act_front.png","assets/act_front.png",100,100,u.gT())
q=F.X(z,"assets/act_right.png","assets/act_right.png",100,100,u.gT())
p=F.X(z,"assets/act_left.png","assets/act_left.png",100,100,u.gT())
o=F.X(z,"assets/act_back.png","assets/act_back.png",100,100,u.gT())
n=F.X(z,"assets/act_rotate_right.png","assets/act_rotate_right.png",100,100,u.gT())
m=F.X(z,"assets/act_rotate_left.png","assets/act_rotate_left.png",100,100,u.gT())
l=F.X(z,"assets/act_shoot.png","assets/act_shoot.png",100,100,u.gT())
u.c.G(0,100,0,0)
r.c.G(0,0,0,0)
q.c.G(0,0,120,0)
p.c.G(0,0,240,0)
o.c.G(0,0,360,0)
n.c.G(0,0,480,0)
m.c.G(0,0,600,0)
l.c.G(0,0,720,0)
u.b.push(r)
u.b.push(q)
u.b.push(p)
u.b.push(o)
u.b.push(n)
u.b.push(m)
u.b.push(l)
this.r=u
y=this.y
w=this.z
v=this.gT()
u=new E.o(new Float64Array(H.j(16)))
u.n()
v=new M.h_(y,w,this,z,v,null,null,0,0,0,0,600,600,600,840,0,0,"none",null,u,!1)
v.b=[]
u.G(0,100,0,0)
z=v.gfn()
y=F.l(170,170,170,255)
w=new E.o(new Float64Array(H.j(16)))
w.n()
w=new F.hl("shoot",400,100,100,0,0.3,0.3,y,z,"none",null,w,!1)
w.b=[]
v.go=w
v.b.push(w)
z=F.l(170,170,170,255)
y=new E.o(new Float64Array(H.j(16)))
y.n()
k=new F.hr(400,100,0.3,z,"none",null,y,!1)
k.b=[]
y.G(0,0,450,0)
v.b.push(k)
v.sbT(v.fy)
this.x=v},
static:{fO:function(a){var z=new E.o(new Float64Array(H.j(16)))
z.n()
z=new M.fN(a,null,null,null,1,1,"none",null,z,!1)
z.b=[]
z.dQ(a)
return z}}},
fQ:{
"^":"d:5;a",
$1:function(a){this.a.f=a}},
hH:{
"^":"db;db,dx,dy,fr,fx,e,f,r,x,y,z,Q,ch,cx,cy,a,b,c,d",
K:function(a,b){var z=F.E(null)
z.a=F.l(102,170,170,170)
b.W(a,new F.v(0,0,600,600),z)},
aq:function(a,b,c,d,e,f,g){var z
if(c==="pointerup")z=d<0||600<d
else z=!1
if(z)this.dy.as(this)
return!0},
dm:[function(a){P.K("## selectTip ########## "+a)
this.eD(a)
this.dy.as(this)},"$1","gT",2,0,4],
eD:function(a){return this.fx.$1(a)}},
h_:{
"^":"db;db,dx,dy,fr,fx,fy,go,e,f,r,x,y,z,Q,ch,cx,cy,a,b,c,d",
sbT:function(a){var z
if(a!=null){this.fy=a
this.go.Q=a.gcE()
z=this.go
z.y=a.e
z.z=a.f}},
K:function(a,b){var z=F.E(null)
z.a=F.l(102,170,170,170)
b.W(a,new F.v(0,0,600,600),z)},
aq:function(a,b,c,d,e,f,g){var z
if(c==="pointerup")z=d<0||600<d
else z=!1
if(z)this.dy.as(this)
return!0},
h3:[function(a,b,c,d){var z=this.fy
if(z==null)return
z.saF(b)
this.fy.sfB(c)
this.fy.scE(d)},"$4","gfn",8,0,19]}}],["","",,Y,{
"^":"",
f3:{
"^":"a;a,b,c,d,e,f,r,x",
bM:function(a){var z,y
z=a.a
y=this.b.a
if(z!==y)return y
else{y=this.c.a
if(z!==y)return y}return},
ap:function(a){var z,y,x,w
z=[this.b,this.c]
for(y=0;y<2;++y){x=z[y]
w=x.cx
w.b=w.b.aN(w,this,x)}this.a.ap(1)},
dl:function(a,b,c,d,e){if(0<this.a.bQ(a,b,c,d,e,this.bM(a)).length)return!0
else return!1},
fC:function(){var z,y,x
z=this.c.cx
y=[]
x=new Y.w(0,null,null,y)
x.a=4289374890
y.push(new Y.z(0,1,4294901760))
z.J(1,1,x)
x=this.c.cx
z=[]
y=new Y.w(0,null,null,z)
y.a=4289374890
z.push(new Y.z(0,1,4294901760))
x.J(1,2,y)
y=this.c.cx
x=[]
z=new Y.w(0,null,null,x)
z.a=4289374890
x.push(new Y.z(0,1,4294901760))
y.J(1,3,z)
z=this.c.cx
y=[]
y.push(new Y.z(-1,0,4294901760))
z.J(1,4,new Y.cC(C.i,4294967210,null,null,y))
y=this.b.cx
z=[]
x=new Y.w(0,null,null,z)
x.a=4289374890
z.push(new Y.z(0,1,4294901760))
y.J(1,1,x)
x=this.b.cx
y=[]
z=new Y.w(0,null,null,y)
z.a=4289374890
y.push(new Y.z(0,1,4294901760))
x.J(1,2,z)
z=this.b.cx
x=[]
y=new Y.w(0,null,null,x)
y.a=4289374890
x.push(new Y.z(0,1,4294901760))
z.J(1,3,y)
y=this.b.cx
z=[]
x=new Y.w(0,null,null,z)
x.a=4289374890
z.push(new Y.z(0,1,4294901760))
y.J(1,4,x)
x=this.b.cx
y=[]
y.push(new Y.z(1,0,4294901760))
y.push(new Y.z(-1,0,4294901760))
x.J(1,5,new Y.f7(4294963456,null,null,y))
y=this.b.cx
x=[]
z=new Y.w(0,null,null,x)
z.a=4278190320
x.push(new Y.z(1,0,4294901760))
y.J(2,5,z)
z=this.b.cx
y=[]
x=new Y.w(0,null,null,y)
x.a=4278190320
y.push(new Y.z(1,0,4294901760))
z.J(3,5,x)
x=this.b.cx
z=[]
y=new Y.w(0,null,null,z)
y.a=4278190320
z.push(new Y.z(0,1,4294901760))
x.J(4,5,y)},
dL:function(){var z,y
z=new Float64Array(H.j(3))
y=new E.A(new Float64Array(H.j(3)))
y.N(0,0,0)
y=new Y.cB(this,0,null,10,"none",new E.A(z),y,1,!1,0.6,0,0,0.8,"none")
y.cx=Y.cA(10,7)
y.Q=50
y.a="red"
this.b=y
y=new Float64Array(H.j(3))
z=new E.A(new Float64Array(H.j(3)))
z.N(0,0,0)
z=new Y.cB(this,0,null,10,"none",new E.A(y),z,1,!1,0.6,0,0,0.8,"none")
z.cx=Y.cA(10,7)
z.Q=50
z.a="blue"
this.c=z
z=this.a.b
z.push(this.b)
z.push(this.c)
z=new Float64Array(H.j(3))
y=new E.A(new Float64Array(H.j(3)))
y.N(0,0,0)
y=new Y.cz(10,"none",new E.A(z),y,1,!1,0.6,0,0,0.8,"none")
z[0]=100
z[1]=100
y.Q=3.5
this.d.push(y)},
static:{f4:function(){var z=new E.A(new Float64Array(H.j(3)))
z.N(0,0,0)
z=new Y.f3(new S.hL(z,[]),null,null,[],50,50,700,500)
z.dL()
return z}}},
f2:{
"^":"a;a,b,c,d,e,f"},
f5:{
"^":"a;a,b,c,H:d<,R:e<",
J:function(a,b,c){var z,y
z=this.c
y=this.d
if(typeof y!=="number")return H.k(y)
y=a+b*y
if(y<0||y>=z.length)return H.c(z,y)
z[y]=c
c.b=a
c.c=b},
dM:function(a,b){var z,y,x,w,v,u,t
z=this.d
y=this.e
if(typeof z!=="number")return z.t()
if(typeof y!=="number")return H.k(y)
y=z*y
z=new Y.w(0,null,null,[])
z.a=4294967295
z=P.fA(y,z,null)
this.c=z
x=0
while(!0){w=this.d
if(typeof w!=="number")return H.k(w)
if(!(x<w))break
v=new Y.w(0,null,null,[])
v.a=4289357414
u=x+0*w
if(u>=y)return H.c(z,u)
z[u]=v
v.b=x
v.c=0
v=this.e
if(typeof v!=="number")return v.a2();--v
u=new Y.w(0,null,null,[])
u.a=4289357414
w=x+v*w
if(w<0||w>=y)return H.c(z,w)
z[w]=u
u.b=x
u.c=v;++x}x=0
while(!0){v=this.e
if(typeof v!=="number")return H.k(v)
if(!(x<v))break
v=new Y.w(0,null,null,[])
v.a=4289357414
u=x*w
if(u>=y)return H.c(z,u)
z[u]=v
v.b=0
v.c=x
v=w-1
u=new Y.w(0,null,null,[])
u.a=4289357414
t=v+x*w
if(t<0||t>=y)return H.c(z,t)
z[t]=u
u.b=v
u.c=x;++x}z=[]
y=new Y.w(0,null,null,z)
y.a=4294901760
z.push(new Y.z(0,1,4294901760))
this.a=y
this.b=y
this.J(1,0,y)},
static:{cA:function(a,b){var z=new Y.f5(null,null,null,a,b)
z.dM(a,b)
return z}}},
cB:{
"^":"f6;cy,ch,cx,Q,a,b,c,d,e,f,r,x,y,z",
ap:function(a){var z,y,x,w,v
this.dG(a)
z=this.cy
y=z.e
x=this.b.a
w=x[0]
v=this.Q
if(y>w-v)x[0]=y+v
y+=z.r
if(y<x[0]+v)x[0]=y-v
y=z.f
if(y>x[1]-v)x[1]=y+v
z=y+z.x
if(z<x[1]+v)x[1]=z-v},
eu:function(a){var z=Math.cos(H.q(this.ch))
this.c.a[0]=a*z
z=Math.sin(H.q(this.ch))
this.c.a[1]=a*z},
fG:function(a,b){var z=Math.sin(H.q(this.ch))
this.c.a[0]=-1*b*z
z=Math.cos(H.q(this.ch))
this.c.a[1]=b*z},
fj:function(a,b){var z=Math.sin(H.q(this.ch))
this.c.a[0]=b*z
z=Math.cos(H.q(this.ch))
this.c.a[1]=-1*b*z},
ev:function(a){var z,y
z=-1*a
y=Math.cos(H.q(this.ch))
this.c.a[0]=z*y
y=Math.sin(H.q(this.ch))
this.c.a[1]=z*y},
d8:function(a){this.ch+=a},
eB:function(a,b,c,d){var z,y,x,w,v
z=this.cy
if(z.a.bQ(this,a,b,0,c,z.bM(this)).length>0){P.K("-----------true")
y=new Float64Array(H.j(3))
x=new Float64Array(H.j(3))
w=new E.A(x)
w.N(0,0,0)
v=this.b.a
y[0]=v[0]
y[1]=v[1]
x[0]=Math.cos(H.q(a))
x[1]=Math.sin(H.q(a))
z.d.push(new Y.cz(10,"none",new E.A(y),w,1,!1,0.6,0,0,0.8,"none"))}else P.K("-----------false")}},
cz:{
"^":"by;Q,a,b,c,d,e,f,r,x,y,z",
gA:function(a){return this.c.a[0]},
gw:function(a){return this.c.a[1]},
sA:function(a,b){this.c.a[0]=b},
sw:function(a,b){this.c.a[1]=b}},
f6:{
"^":"by;aF:ch@",
gA:function(a){return this.c.a[0]},
gw:function(a){return this.c.a[1]},
sA:function(a,b){this.c.a[0]=b},
sw:function(a,b){this.c.a[1]=b}},
w:{
"^":"a;a,b,c,d",
aN:function(a,b,c){var z,y,x,w,v,u
switch(this.a){case 4294967295:case 4289357414:return a.a
case 4289374890:case 4294901760:z=this.b
y=this.d
x=J.S(C.a.gD(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.k(x)
w=this.c
y=J.Z(C.a.gD(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.k(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.k(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.c(v,u)
return v[u]
case 4278190320:c.eu(3)
z=this.b
y=this.d
x=J.S(C.a.gD(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.k(x)
w=this.c
y=J.Z(C.a.gD(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.k(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.k(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.c(v,u)
return v[u]
case 4278190321:c.fG(0,1)
z=this.b
y=this.d
x=J.S(C.a.gD(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.k(x)
w=this.c
y=J.Z(C.a.gD(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.k(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.k(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.c(v,u)
return v[u]
case 4278190322:c.fj(0,1)
z=this.b
y=this.d
x=J.S(C.a.gD(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.k(x)
w=this.c
y=J.Z(C.a.gD(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.k(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.k(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.c(v,u)
return v[u]
case 4278190323:c.ev(1.5)
z=this.b
y=this.d
x=J.S(C.a.gD(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.k(x)
w=this.c
y=J.Z(C.a.gD(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.k(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.k(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.c(v,u)
return v[u]}return}},
f9:{
"^":"a;a",
i:function(a){return C.y.h(0,this.a)}},
cC:{
"^":"w;e,a,b,c,d",
aN:function(a,b,c){var z,y,x,w,v,u
c.d8(0.07853981633974483)
z=this.b
y=this.d
x=J.S(C.a.gD(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.k(x)
w=this.c
y=J.Z(C.a.gD(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.k(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.k(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.c(v,u)
return v[u]}},
fa:{
"^":"w;e,a,b,c,d",
aN:function(a,b,c){var z,y,x,w,v,u
c.d8(-0.07853981633974483)
z=this.b
y=this.d
x=J.S(C.a.gD(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.k(x)
w=this.c
y=J.Z(C.a.gD(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.k(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.k(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.c(v,u)
return v[u]}},
f7:{
"^":"w;a,b,c,d",
aN:function(a,b,c){var z,y,x,w,v,u,t
z=b.dl(c,c.ch,0.7853981633974483,0,500)
y=this.b
x=this.d
if(z){if(0>=x.length)return H.c(x,0)
w=J.S(x[0])
if(typeof y!=="number")return y.j()
if(typeof w!=="number")return H.k(w)
v=this.c
if(0>=x.length)return H.c(x,0)
x=J.Z(x[0])
if(typeof v!=="number")return v.j()
if(typeof x!=="number")return H.k(x)
u=a.c
t=a.d
if(typeof t!=="number")return H.k(t)
t=y+w+(v+x)*t
if(t>>>0!==t||t>=u.length)return H.c(u,t)
return u[t]}else{if(1>=x.length)return H.c(x,1)
w=J.S(x[1])
if(typeof y!=="number")return y.j()
if(typeof w!=="number")return H.k(w)
v=this.c
if(1>=x.length)return H.c(x,1)
x=J.Z(x[1])
if(typeof v!=="number")return v.j()
if(typeof x!=="number")return H.k(x)
u=a.c
t=a.d
if(typeof t!=="number")return H.k(t)
t=y+w+(v+x)*t
if(t>>>0!==t||t>=u.length)return H.c(u,t)
return u[t]}}},
f8:{
"^":"w;aF:e?,fB:f?,cE:r@,x,a,b,c,d",
aN:function(a,b,c){var z,y,x,w,v,u
c.eB(this.e,this.f,this.r,this.x)
z=this.b
y=this.d
x=J.S(C.a.gD(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.k(x)
w=this.c
y=J.Z(C.a.gD(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.k(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.k(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.c(v,u)
return v[u]}},
z:{
"^":"a;A:a*,w:b*,c"}}],["","",,T,{
"^":"",
fG:{
"^":"a0;e,a,b,c,d",
K:function(a,b){var z,y,x,w,v,u,t,s
z=F.E(null)
z.a=F.l(255,255,255,0)
y=new F.v(-50,-50,100,100)
for(x=this.e.f.d,w=x.length,v=0;v<x.length;x.length===w||(0,H.a4)(x),++v){u=x[v]
t=u.b
t=t.gF(t)
s=u.r
y.a=t-s
y.b=u.b.a[1]-s
s=u.Q
y.c=s*2
y.d=s*2
b.cF(a,y,z)}}},
fH:{
"^":"a0;e,f,r,a,b,c,d",
K:function(a,b){var z,y,x,w
z=J.T(this.f.gH())
y=J.T(this.f.gR())
x=F.E(null)
w=this.f
if(w!=null)b.aw(a,w,new F.v(0,0,z,y),new F.v(-50,-50,100,100),x)},
aO:function(a,b){var z,y,x
z=new E.o(new Float64Array(H.j(16)))
z.n()
this.c=z
y=this.r
x=y.b.a
z.G(0,x[0],x[1],1)
this.c.d3(y.ch)},
dO:function(a,b,c){this.e.a.a4(c).aR(new T.fI(this))},
static:{cY:function(a,b,c){var z=new E.o(new Float64Array(H.j(16)))
z.n()
z=new T.fH(a,null,b,"none",null,z,!1)
z.b=[]
z.dO(a,b,c)
return z}}},
fI:{
"^":"d:5;a",
$1:function(a){this.a.f=a}},
fJ:{
"^":"a0;e,f,r,x,a,b,c,d",
cR:function(){var z,y,x
P.K("--------------------------init()")
z=this.e.f
y=z.b
y.ch=0
x=y.c.a
x[0]=0
x[1]=0
y=y.b.a
y[0]=200
y[1]=300
z=z.c
z.ch=3.141592653589793
y=z.c.a
y[0]=0
y[1]=0
z=z.b.a
z[0]=700
z[1]=300},
K:function(a,b){var z,y,x
z=this.f
if(z!=null){z=J.T(z.gH())
y=J.T(this.f.gR())
x=F.E(null)
b.aw(a,this.f,new F.v(0,0,z,y),new F.v(0,0,800,600),x)}z=this.e.f
x=F.E(null)
x.a=F.l(170,255,255,0)
x.b=C.d
x.c=5
b.W(a,new F.v(50,50,z.r,z.x),x)},
aO:function(a,b){this.e.f.ap(b)},
cZ:[function(a){var z
P.K("### "+a)
switch(a){case"back_button":z=this.e
z.e.gE().aj()
z.e.gE().ai(z.c)
break
case"prog_button":z=this.e
z.e.gE().aj()
z.e.gE().ai(z.d)
break}},"$1","ga_",2,0,4],
dP:function(a){var z,y,x,w,v,u,t
z=this.e
z.a.a4("assets/bg_play.png").aR(new T.fL(this))
this.r=T.cY(z,z.f.c,"assets/ch_iron.png")
this.x=T.cY(z,z.f.b,"assets/ch_iron2.png")
this.b.push(this.r)
this.b.push(this.x)
y=this.b
x=new E.o(new Float64Array(H.j(16)))
x.n()
x=new T.fG(z,"none",null,x,!1)
x.b=[]
y.push(x)
z=this.b
y=this.ga_()
x=F.l(170,255,170,204)
w=F.l(170,204,170,255)
v=F.l(170,204,255,170)
u=new E.o(new Float64Array(H.j(16)))
u.n()
t=new F.aS(200,120,!1,!1,"back_button",x,w,v,y,0,0,0,0,"none",null,u,!1)
t.b=[]
y=new E.o(new Float64Array(H.j(16)))
y.n()
y.a6(30,480,0)
t.c=y
t.Q=F.l(34,255,0,0)
t.z=F.l(0,0,0,255)
t.ch=F.l(17,0,255,0)
z.push(t)
z=this.b
y=this.ga_()
x=F.l(170,255,170,204)
w=F.l(170,204,170,255)
v=F.l(170,204,255,170)
u=new E.o(new Float64Array(H.j(16)))
u.n()
t=new F.aS(200,120,!1,!1,"prog_button",x,w,v,y,0,0,0,0,"none",null,u,!1)
t.b=[]
y=new E.o(new Float64Array(H.j(16)))
y.n()
y.a6(570,480,0)
t.c=y
t.Q=F.l(34,255,0,0)
t.z=F.l(0,0,0,255)
t.ch=F.l(17,0,255,0)
z.push(t)},
static:{fK:function(a){var z=new E.o(new Float64Array(H.j(16)))
z.n()
z=new T.fJ(a,null,null,null,"none",null,z,!1)
z.b=[]
z.dP(a)
return z}}},
fL:{
"^":"d:5;a",
$1:function(a){this.a.f=a}}}],["","",,P,{
"^":"",
iY:function(a){var z={}
a.L(0,new P.iZ(z))
return z},
j_:function(a){return a},
cu:function(){var z=$.ct
if(z==null){z=J.bp(window.navigator.userAgent,"Opera",0)
$.ct=z}return z},
eS:function(){var z,y
z=$.cq
if(z!=null)return z
y=$.cr
if(y==null){y=J.bp(window.navigator.userAgent,"Firefox",0)
$.cr=y}if(y===!0)z="-moz-"
else{y=$.cs
if(y==null){y=P.cu()!==!0&&J.bp(window.navigator.userAgent,"Trident/",0)
$.cs=y}if(y===!0)z="-ms-"
else z=P.cu()===!0?"-o-":"-webkit-"}$.cq=z
return z},
iZ:{
"^":"d:20;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
kL:[function(){var z,y,x
P.K("--------1-dart hello ( 1 )")
z=new G.hn(700,500,P.cL())
y=new Y.f2(z,null,null,null,null,null)
y.f=Y.f4()
y.b=T.fK(y)
y.c=U.h1(y)
y.d=M.fO(y)
x=new E.o(new Float64Array(H.j(16)))
x.n()
x=new F.ho(800,600,1,1,1,0,0,null,"none",null,x,!1)
x.b=[]
x.ch=F.l(255,238,238,255)
y.e=G.hz(z,x,400,600)
y.f.fC()
z=y.e
if(!z.b){z.b=!0
z.aU()}y.e.gE().b.push(y.c)
P.K("--------1-dart hello ( 2 ) ")},"$0","dU",0,0,1]},1],["","",,U,{
"^":"",
h0:{
"^":"a0;e,f,a,b,c,d",
K:function(a,b){var z,y,x
z=this.f
if(z!=null){z=J.T(z.gH())
y=J.T(this.f.gR())
x=F.E(null)
b.aw(a,this.f,new F.v(0,0,z,y),new F.v(0,0,800,600),x)}},
cZ:[function(a){var z=this.e
z.e.gE().aj()
z.e.gE().ai(z.b)},"$1","ga_",2,0,4],
dR:function(a){var z,y,x,w,v,u
z=this.ga_()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.o(new Float64Array(H.j(16)))
v.n()
u=new F.aS(600,200,!1,!1,"start_button",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
z=new E.o(new Float64Array(H.j(16)))
z.n()
z.a6(100,300,0)
u.c=z
u.Q=F.l(34,255,0,0)
u.z=F.l(0,0,0,255)
u.ch=F.l(17,0,255,0)
this.b.push(u)
this.e.a.a4("assets/bg_start.png").aR(new U.h2(this))},
static:{h1:function(a){var z=new E.o(new Float64Array(H.j(16)))
z.n()
z=new U.h0(a,null,"none",null,z,!1)
z.b=[]
z.dR(a)
return z}}},
h2:{
"^":"d:5;a",
$1:function(a){this.a.f=a}}}],["","",,F,{
"^":"",
aS:{
"^":"a0;H:e<,R:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
cw:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
aq:function(a,b,c,d,e,f,g){var z
switch(c){case"pointerdown":if(this.cw(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.cy=0
this.db=0}break
case"pointermove":if(this.cw(d,e)){this.x=!0
z=this.cy+(f-this.dx)
this.cy=z
this.db=this.db+(g-this.dy)
if(!(Math.sqrt(H.q(z*z))>this.e)){z=this.db
z=Math.sqrt(H.q(z*z))>this.f}else z=!0
if(z){this.r=!1
this.x=!1}}else{this.r=!1
this.x=!1}break
case"pointerup":if(this.r&&!0)P.eZ(new F.hj(this),null)
this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
K:["dI",function(a,b){var z=F.E(null)
if(this.r){z.a=this.Q
b.W(a,new F.v(0,0,this.e,this.f),z)}else if(this.x){z.a=this.ch
b.W(a,new F.v(0,0,this.e,this.f),z)}else{z.a=this.z
b.W(a,new F.v(0,0,this.e,this.f),z)}}],
fo:function(a){return this.cx.$1(a)}},
hj:{
"^":"d:0;a",
$0:function(){var z=this.a
z.fo(z.y)}},
hp:{
"^":"aS;fr,fx,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
K:function(a,b){var z,y,x,w,v
this.dI(a,b)
z=F.E(null)
z.a=F.l(102,170,170,170)
b.W(a,new F.v(100,0,600,600),z)
y=J.T(this.fr.gH())
x=J.T(this.fr.gR())
w=this.e
v=this.f
b.aw(a,this.fr,new F.v(0,0,y,x),new F.v(0,0,w,v),z)},
dU:function(a,b,c,d,e,f){this.z=F.l(255,170,170,170)
this.fx.a4(c).aR(new F.hq(this))},
static:{X:function(a,b,c,d,e,f){var z,y,x,w
z=F.l(170,255,170,204)
y=F.l(170,204,170,255)
x=F.l(170,204,255,170)
w=new E.o(new Float64Array(H.j(16)))
w.n()
w=new F.hp(null,a,d,e,!1,!1,b,z,y,x,f,0,0,0,0,"none",null,w,!1)
w.b=[]
w.dU(a,b,c,d,e,f)
return w}}},
hq:{
"^":"d:5;a",
$1:function(a){this.a.fr=a}},
hk:{
"^":"a;",
d0:function(a){var z=this.b
if(0>=z.length)return H.c(z,0)
z.pop()
if(z.length>0)this.aG(a,C.a.gaa(z))
else{z=a.a
this.aG(a,new F.v(0,0,z.c,z.d))}}},
hl:{
"^":"a0;e,f,r,x,y,z,Q,ch,cx,a,b,c,d",
aq:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=this.fp(a,b,c,d,e,f,g)
y=this.ft(a,b,c,d,e,f,g)
x=this.fq(a,b,c,d,e,f,g)
w=""+z+" "+y+" "
v=!z
P.K(w+(!v||y))
return!v||y||x},
fp:function(a,b,c,d,e,f,g){var z,y,x
z=this.f/2
y=d-z
x=e-z
if(Math.sqrt(H.q(y*y+x*x))<z){y=Math.atan2(H.q(x),H.q(y))+1.5707963267948966
this.y=y
this.bt(this.e,y,this.z,this.Q)
return!0}return!1},
ft:function(a,b,c,d,e,f,g){var z=this.f
if(z<d&&d<z+this.r)if(0<e&&e<z){z=e/z*3.141592653589793
this.z=z
this.bt(this.e,this.y,z,this.Q)
return!0}return!1},
fq:function(a,b,c,d,e,f,g){var z,y,x
z=this.f
y=this.r
x=z+y
if(x<d&&d<x+y)if(0<e&&e<z){z=e/z
this.Q=z
this.bt(this.e,this.y,this.z,z)
return!0}return!1},
K:function(a,b){var z,y,x,w,v,u,t,s
this.fw(a,b)
z=F.E(null)
z.b=C.d
y=this.r
x=y/3
z.c=x
w=this.ch
z.a=w
v=this.f
u=y/2
t=v+u
b.P(a,new F.y(t,0),new F.y(t,v),z)
s=0+v*(this.z/3.141592653589793)
b.P(a,new F.y(t,s-10),new F.y(t,s+10),z)
z=F.E(null)
z.b=C.d
z.c=x
z.a=w
t=v+y+u
b.P(a,new F.y(t,0),new F.y(t,v),z)
v=0+v*this.Q
b.P(a,new F.y(t,v-10),new F.y(t,v+10),z)},
fw:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=F.E(null)
z.b=C.d
y=this.f
b.cF(a,new F.v(0,0,y,y),z)
z.a=this.ch
x=y/2
z.c=15
b.P(a,new F.y(x,x),new F.y(x+this.Q*x*Math.cos(H.q(this.y-1.5707963267948966)),x+this.Q*x*Math.sin(H.q(this.y-1.5707963267948966))),z)
for(w=x,v=w,u=0;u<20;++u,w=p,v=q){z.c=2.5
y=this.Q
t=this.y
s=this.z
r=u/19
q=x+y*x*Math.cos(t-s+s*2*r-1.5707963267948966)
y=this.Q
t=this.y
s=this.z
p=x+y*x*Math.sin(t-s+s*2*r-1.5707963267948966)
b.al(a,[v,w,0,q,p,0],[0,1],z.a,C.d,z.c)}z.c=2.5
b.P(a,new F.y(x,x),new F.y(x+this.Q*x*Math.cos(H.q(this.y-this.z-1.5707963267948966)),x+this.Q*x*Math.sin(H.q(this.y-this.z-1.5707963267948966))),z)
z.c=2.5
b.P(a,new F.y(x,x),new F.y(x+this.Q*x*Math.cos(H.q(this.y+this.z-1.5707963267948966)),x+this.Q*x*Math.sin(H.q(this.y+this.z-1.5707963267948966))),z)},
bt:function(a,b,c,d){return this.cx.$4(a,b,c,d)}},
a0:{
"^":"a;cQ:c<",
ai:function(a){var z=0,y=new P.al(),x=1,w,v=this,u,t,s,r
function $async$ai(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.e(new s.C(0,r.m,null),[null])
t=u
t.aC(null)
z=2
return H.t(u,$async$ai,y)
case 2:t=v
t=t.b
t.push(a)
return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$ai,y,null)},
as:function(a){var z=0,y=new P.al(),x=1,w,v=this,u,t,s
function $async$as(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.C(0,s.m,null)
u.$builtinTypeInfo=[null]
t=u
t.aC(null)
z=2
return H.t(u,$async$as,y)
case 2:t=v
u=t.b
t=u
if(t){z=3
break}else c=t
z=4
break
case 3:t=C
c=t.a
case 4:t=c
t.ar(u,a)
t=a
t.d9()
return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$as,y,null)},
aj:function(){var z=0,y=new P.al(),x=1,w,v=this,u,t,s,r,q,p
function $async$aj(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.e(new q.C(0,p.m,null),[null])
r=u
r.aC(null)
z=2
return H.t(u,$async$aj,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.as(u[s])
case 4:r=u.length===t
if(r)b=r
else{z=6
break}z=7
break
case 6:r=H
b=(0,r.a4)(u)
case 7:b,++s
z=3
break
case 5:return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$aj,y,null)},
cI:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a4)(z),++x)z[x].cI(a)},
aO:function(a,b){},
d7:function(a,b){var z,y,x
this.bw()
this.aO(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a4)(z),++x)z[x].d7(a,b)},
K:function(a,b){},
b3:["bU",function(a,b){var z,y,x,w,v,u
this.bw()
this.K(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.a4)(z),++w){v=z[w]
u=v.gcQ()
x.push(C.a.gaa(x).t(0,u))
b.ad()
v.b3(a,b)
if(0>=x.length)return H.c(x,0)
x.pop()
b.ad()}}],
bJ:["af",function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
this.bw()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.c(y,w)
v=y[w]
a.ac(v.gcQ())
u=v.bJ(a,b,c,d,e)
a.ab()
if(u===!0)return u}t=a.bN().aZ(0)
t.cJ()
y=new E.A(new Float64Array(H.j(3)))
y.N(d,e,0)
s=t.t(0,y)
r=this.aq(a,b,c,s.gF(s),s.gI(s),d,e)
this.d_(0,a,b,c,d,e)
return r}],
aq:function(a,b,c,d,e,f,g){return!1},
d_:function(a,b,c,d,e,f){},
d9:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a4)(z),++x)z[x].d9()
this.d=!1},
cR:function(){},
bw:function(){if(!this.d){this.d=!0
this.cR()}}},
hm:{
"^":"a;",
a4:function(a){var z=0,y=new P.al(),x,w=2,v,u=this,t,s,r,q
function $async$a4(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.b_(a)?3:4
break
case 3:s=t
x=s.h(0,a)
z=1
break
case 4:s=t
s=s
r=a
q=u
z=5
return H.t(q.b1(a),$async$a4,y)
case 5:s.v(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$a4,y,null)},
di:function(a){var z=this.a
if(z.b_(a))return z.h(0,a)
this.a4(a)
return}},
v:{
"^":"a;a,b,H:c<,R:d<"},
y:{
"^":"a;a,b"},
da:{
"^":"a;a",
i:function(a){return C.z.h(0,this.a)}},
d9:{
"^":"a;a,b,c",
dV:function(a){if(this.a==null)this.a=F.l(255,255,255,255)},
static:{E:function(a){var z=new F.d9(a,C.k,1)
z.dV(a)
return z}}},
bT:{
"^":"a;a",
dT:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{l:function(a,b,c,d){var z=new F.bT(0)
z.dT(a,b,c,d)
return z}}},
bU:{
"^":"a;"},
ho:{
"^":"a0;H:e<,R:f<,r,x,y,z,Q,ch,a,b,c,d",
bJ:function(a,b,c,d,e){a.ac(this.c)
this.af(a,b,c,d,e)
a.ab()},
aO:function(a,b){var z,y,x,w
z=a.gH()
y=a.gfv(a)
x=this.e
y=(z-y)/x
this.r=y
z=a.a
w=(z.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(z.c-x*y)/2+0
y=new E.o(new Float64Array(H.j(16)))
y.n()
this.c=y
y.G(0,this.z,this.Q,0)
y=this.c
x=this.y
y.bP(0,x,x,1)},
b3:function(a,b){var z,y,x
z=new F.v(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.gaa(x).t(0,y))
b.ad()
b.b.push(z)
b.aG(a,z)
this.bU(a,b)
b.d0(a)
if(0>=x.length)return H.c(x,0)
x.pop()
b.ad()},
K:function(a,b){var z,y
z=new F.v(0,0,this.e,this.f)
y=F.E(null)
y.a=this.ch
b.aG(a,z)
b.W(a,z,y)}},
db:{
"^":"a0;A:e*,w:f*",
aO:function(a,b){var z,y,x
z=this.e*=0.9
y=this.f
if(typeof y!=="number")return y.t()
y*=0.9
this.f=y
z=this.r+=z
y=this.x+=y
x=-1*(this.Q-this.y)
if(z<x)this.e=(x-z)/10
x=-1*(this.ch-this.z)
if(y<x)this.f=(x-y)/10
if(y>0)this.f=(0-y)/10
if(z>0)this.e=(0-z)/10},
d_:function(a,b,c,d,e,f){var z,y
z=b.bN().aZ(0)
z.cJ()
y=new E.A(new Float64Array(H.j(3)))
y.N(e,f,0)
z.t(0,y)
switch(d){case"pointerdown":this.cx=e
this.cy=f
break
case"pointermove":this.e=(e-this.cx)*2.2
this.f=(f-this.cy)*2.2
this.cx=e
this.cy=f
break}},
bJ:function(a,b,c,d,e){var z,y
z=new E.o(new Float64Array(H.j(16)))
z.n()
z.G(0,this.r,this.x,0)
a.ac(z)
y=this.af(a,b,c,d,e)
a.ab()
P.K("---"+H.b(y))
return y},
b3:function(a,b){var z,y,x
z=new F.v(0,0,this.y,this.z)
b.b.push(z)
b.aG(a,z)
y=new E.o(new Float64Array(H.j(16)))
y.n()
y.G(0,this.r,this.x,0)
x=b.a
x.push(C.a.gaa(x).t(0,y))
b.ad()
this.bU(a,b)
if(0>=x.length)return H.c(x,0)
x.pop()
b.ad()
b.d0(a)},
K:function(a,b){}},
hr:{
"^":"a0;e,f,r,x,a,b,c,d",
aq:function(a,b,c,d,e,f,g){if(this.e<this.f)return this.fu(a,b,c,d,e,f,g)
else return this.fs(a,b,c,d,e,f,g)},
K:function(a,b){var z,y,x,w,v,u
z=this.e
y=this.f
x=this.x
if(z<y){w=F.E(null)
w.b=C.d
w.c=z
w.a=x
v=z/2
b.P(a,new F.y(v,0),new F.y(v,y),w)
z=0+y*this.r
b.P(a,new F.y(v,z-10),new F.y(v,z+10),w)}else{w=F.E(null)
w.b=C.d
w.c=y
w.a=x
u=y/2
b.P(a,new F.y(0,u),new F.y(z,u),w)
z=0+z*this.r
b.P(a,new F.y(z-10,u),new F.y(z+10,u),w)}},
fs:function(a,b,c,d,e,f,g){if(0<=d&&d<=this.e)if(0<=e&&e<=this.f){this.r=d/this.e
return!0}return!1},
fu:function(a,b,c,d,e,f,g){if(0<=d&&d<=this.e)if(0<=e&&e<=this.f){this.r=e/this.f
return!0}return!1}},
hs:{
"^":"a;",
gE:function(){return this.c$},
sE:function(a){this.c$=a},
cL:function(a){if(!this.e$){this.c$.cI(this)
this.e$=!0}this.c$.d7(this,a)
this.fk()},
ac:function(a){var z=this.f$
z.push(C.a.gaa(z).t(0,a))},
ab:function(){var z=this.f$
if(0>=z.length)return H.c(z,0)
z.pop()},
bN:function(){return C.a.gaa(this.f$)}}}],["","",,G,{
"^":"",
bV:function(a){var z=0,y=new P.al(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bV(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.e(new p.dv(o.e(new n.C(0,m.m,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.ey(t,a)
q=J
s=q.i(t)
q=s
r=q.gbA(t)
q=H
q=q
p=W
p=p
o=r
o=o.a
n=r
n=n.b
m=W
m=m
l=G
m=m.a3(new l.hw(u,t))
l=r
p=new p.a2(0,o,n,m,l.c)
o=H
q=q.e(p,[o.N(r,0)])
q.O()
q=s
s=q.gbz(t)
q=H
q=q
p=W
p=p
o=s
o=o.a
n=s
n=n.b
m=W
m=m
l=G
m=m.a3(new l.hx(a,u))
l=s
p=new p.a2(0,o,n,m,l.c)
o=H
q=q.e(p,[o.N(s,0)])
q.O()
q=u
x=q.a
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$bV,y,null)},
dc:function(a,b,c){var z,y,x
z=G.df(a,35633,b)
y=G.df(a,35632,c)
x=J.ec(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
df:function(a,b,c){var z,y
z=J.ed(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.f(y+"\n")}return z},
dd:function(a,b){var z=J.bq(a)
a.bindBuffer(34962,z)
a.bufferData(34962,new Float32Array(H.aA(b)),35044)
a.bindBuffer(34962,null)
return z},
de:function(a,b){var z=J.bq(a)
a.bindBuffer(34963,z)
a.bufferData(34963,new Uint16Array(H.aA(b)),35044)
a.bindBuffer(34963,null)
return z},
hn:{
"^":"hm;l:b>,k:c>,a",
b1:function(a){var z=0,y=new P.al(),x,w=2,v,u,t
function $async$b1(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.t(t.bV(a),$async$b1,y)
case 3:x=new u.hv(c)
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$b1,y,null)}},
hv:{
"^":"bU;f1:a<",
gH:function(){return J.er(this.a)},
gR:function(){return J.ei(this.a)}},
hy:{
"^":"fE;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gH:function(){return this.a.c},
gR:function(){return this.a.d},
gfv:function(a){return 0},
fk:function(){this.e=!0},
aU:function(){var z=0,y=new P.al(),x=1,w,v=this,u,t,s,r,q,p,o,n,m
function $async$aU(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:n=H
n=n
m=P
u=n.bN(new m.b0(Date.now(),!1))
n=H
n=n
m=P
t=n.bN(new m.b0(Date.now(),!1))
case 2:n=v
if(!n.b){z=4
break}n=P
n=n
m=P
z=5
return H.t(n.f_(new m.aM(4e4),null,null),$async$aU,y)
case 5:s=Date.now()
n=P
r=new n.b0(s,!1)
if(r.date===void 0)r.date=new Date(s)
else ;q=r.date.getMilliseconds()+0
p=(q-t)/2
s=t-u
n=v
n=n
m=C
m=m.b
n.cL(m.a0(s+p))
n=v
n=n
m=C
m=m.b
n.cL(m.a0(s+p*2))
n=v
n.e=!0
n=v
s=n.gE()
n=v
r=n.a
n=E
o=new n.o(new Float64Array(16))
n=o
n.n()
n=G
o=new n.ht(null,null,null,null,[o],[])
n=o
m=r
n.c=m.a
n=o
n.d=r
n=o
n.fb()
n=o
n.a9(0)
n=s
n.b3(v,o)
n=v
n.e=!1
case 3:t=q
z=2
break
case 4:return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$aU,y,null)},
fN:function(){var z,y
z={}
z.a=!1
y=J.ej(this.a.b)
H.e(new W.a2(0,y.a,y.b,W.a3(new G.hA(z,this)),y.c),[H.N(y,0)]).O()
y=J.ep(this.a.b)
H.e(new W.a2(0,y.a,y.b,W.a3(new G.hB(z,this)),y.c),[H.N(y,0)]).O()
y=J.ek(this.a.b)
H.e(new W.a2(0,y.a,y.b,W.a3(new G.hC(z)),y.c),[H.N(y,0)]).O()
y=J.el(this.a.b)
H.e(new W.a2(0,y.a,y.b,W.a3(new G.hD(z,this)),y.c),[H.N(y,0)]).O()
y=J.em(this.a.b)
H.e(new W.a2(0,y.a,y.b,W.a3(new G.hE(z,this)),y.c),[H.N(y,0)]).O()
y=J.en(this.a.b)
H.e(new W.a2(0,y.a,y.b,W.a3(new G.hF(z,this)),y.c),[H.N(y,0)]).O()
y=J.eo(this.a.b)
H.e(new W.a2(0,y.a,y.b,W.a3(new G.hG(z)),y.c),[H.N(y,0)]).O()},
dW:function(a,b,c,d){var z,y
P.K("--------new stage")
z=new G.hu(null,null,null,null)
z.c=d
z.d=c
y=C.e.a0(d)
y=W.eG(C.e.a0(c),y)
z.b=y
document.body.appendChild(y)
z.a=J.eu(y,!0)
this.a=z
this.sE(b)
this.fN()},
static:{hz:function(a,b,c,d){var z=new E.o(new Float64Array(H.j(16)))
z.n()
z=new G.hy(null,!1,0,a,!1,!1,0,null,!1,!1,[z])
z.dW(a,b,c,d)
return z}}},
fE:{
"^":"a+hs;"},
hA:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gE()
x=J.i(a)
w=x.gS(a)
w=w.gF(w)
w.toString
x=x.gS(a)
x=x.gI(x)
x.toString
z.ac(y.c)
y.af(z,0,"pointerdown",w,x)
z.ab()}},
hB:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gE()
w=J.i(a)
v=w.gS(a)
v=v.gF(v)
v.toString
w=w.gS(a)
w=w.gI(w)
w.toString
y.ac(x.c)
x.af(y,0,"pointerup",v,w)
y.ab()
z.a=!1}}},
hC:{
"^":"d:3;a",
$1:function(a){if(this.a.a);}},
hD:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gE()
w=J.i(a)
v=w.gS(a)
v=v.gF(v)
v.toString
w=w.gS(a)
w=w.gI(w)
w.toString
y.ac(x.c)
x.af(y,0,"pointercancel",v,w)
y.ab()
z.a=!1}}},
hE:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gE()
x=J.i(a)
w=x.gS(a)
w=w.gF(w)
w.toString
x=x.gS(a)
x=x.gI(x)
x.toString
z.ac(y.c)
y.af(z,0,"pointermove",w,x)
z.ab()}}},
hF:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gE()
w=J.i(a)
v=w.gS(a)
v=v.gF(v)
v.toString
w=w.gS(a)
w=w.gI(w)
w.toString
y.ac(x.c)
x.af(y,0,"pointercancel",v,w)
y.ab()
z.a=!1}}},
hG:{
"^":"d:3;a",
$1:function(a){if(this.a.a);}},
hu:{
"^":"a;a,b,c,k:d>"},
ht:{
"^":"hk;c,d,e,f,a,b",
fb:function(){var z,y
z=C.a.b0(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.a.b0(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.dc(this.c,z,y)
z=C.a.b0(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.a.b0(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.dc(this.c,z,y)},
a9:function(a){J.ch(this.c,2960)
J.ef(this.c,515)
J.e8(this.c,0,0,0,1)
J.e9(this.c,1)
J.ea(this.c,0)
J.ch(this.c,3042)
J.e5(this.c,770,771)
J.e7(this.c,17664)},
cr:function(){var z,y
z=new E.o(new Float64Array(H.j(16)))
z.n()
z=z.G(0,-1,1,0)
y=this.d
return z.bP(0,2/y.c,-2/y.d,1).t(0,C.a.gaa(this.a))},
W:function(a,b,c){var z,y,x,w
z=b.a
y=b.b
x=z+b.c
w=y+b.d
this.al(a,[z,y,0,z,w,0,x,y,0,x,w,0],[0,1,3,2],c.a,c.b,c.c)},
P:function(a,b,c,d){this.al(a,[b.a,b.b,0,c.a,c.b,0],[0,1],d.a,C.d,d.c)},
cF:function(a,b,c){var z,y,x,w,v,u,t,s
z=b.a
y=b.c/2
x=z+y
z=b.b
w=b.d/2
v=z+w
u=[]
t=[]
for(s=0;s<50;++s){t.push(s)
z=6.283185307179586*(s/50)
u.push(x+Math.cos(z)*y)
u.push(v+Math.sin(z)*w)
u.push(0)}this.al(a,u,t,c.a,c.b,c.c)},
al:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
J.bu(this.c,this.e)
z=G.dd(this.c,b)
J.aG(this.c,34962,z)
y=G.de(this.c,c)
J.aG(this.c,34963,y)
x=this.c
w=this.e
v=this.cr()
x.uniformMatrix4fv(J.aI(x,w,"u_mat"),!1,new Float32Array(H.aA(v.gq())))
v=this.c
w=this.e
x=d.a
v.uniform4fv(J.aI(v,w,"color"),new Float32Array(H.aA([(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255])))
x=this.c
x.uniform1f(J.aI(x,this.e,"u_point_size"),f)
u=J.bt(this.c,this.e,"vp")
J.bv(this.c,u,3,5126,!1,0,0)
J.br(this.c,u)
if(e===C.k)t=6
else{J.ev(this.c,f)
t=2}J.cg(this.c,t,b.length/3|0,5123,0)
J.bu(this.c,null)},
aG:function(a,b){var z
J.ce(this.c,!1,!1,!1,!1)
J.cf(this.c,!1)
J.ck(this.c,7680,7681,7681)
J.cj(this.c,519,1,255)
z=F.E(null)
z.a=F.l(255,255,255,255)
this.W(null,b,z)
J.ce(this.c,!0,!0,!0,!0)
J.cf(this.c,!0)
J.ck(this.c,7680,7680,7680)
J.cj(this.c,514,1,255)},
aw:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
J.bu(this.c,this.f)
z=J.bt(this.c,this.f,"a_tex")
y=J.bq(this.c)
J.aG(this.c,34962,y)
J.e6(this.c,34962,new Float32Array(H.aA([0,0,0,1,1,0,1,1])),35044)
J.br(this.c,z)
J.bv(this.c,z,2,5126,!1,0,0)
x=J.ee(this.c)
J.e4(this.c,3553,x)
J.aZ(this.c,3553,10242,33071)
J.aZ(this.c,3553,10243,33071)
J.aZ(this.c,3553,10241,9728)
J.aZ(this.c,3553,10240,9728)
J.eA(this.c,3553,0,6408,6408,5121,b.gf1())
w=d.a
v=d.b
u=w+d.c
t=v+d.d
s=G.dd(this.c,[w,v,0,w,t,0,u,v,0,u,t,0])
J.aG(this.c,34962,s)
r=G.de(this.c,[0,1,2,1,3,2])
J.aG(this.c,34963,r)
q=J.bt(this.c,this.f,"vp")
p=J.aI(this.c,this.f,"u_mat")
J.eC(this.c,p,!1,new Float32Array(H.aA(this.cr().gq())))
J.bv(this.c,q,3,5126,!1,0,0)
o=J.aI(this.c,this.f,"color")
n=this.c
m=e.a.a
J.eB(n,o,(m>>>16&255)/255,(m>>>8&255)/255,(m>>>0&255)/255,(m>>>24&255)/255)
J.br(this.c,q)
J.cg(this.c,4,6,5123,0)},
ad:function(){}},
hw:{
"^":"d:2;a,b",
$1:function(a){this.a.bv(0,this.b)}},
hx:{
"^":"d:2;a,b",
$1:function(a){this.b.eK("failed to load image "+this.a)}}}],["","",,S,{
"^":"",
fM:{
"^":"a;cM:a>,a5:b<,fg:e<,aF:r@",
cv:function(a){return!1},
ap:function(a){},
cB:function(a){}},
by:{
"^":"fM;fA:Q<,a,b,c,d,e,f,r,x,y,z",
ap:["dG",function(a){var z,y,x,w
z=this.c.a
y=z[0]
z=z[1]
x=!this.e
if(x){w=this.b.a
w[0]=w[0]+y*a
w[1]=w[1]+z*a}z=this.x
z-=0.01*z
this.x=z
if(x)this.saF(this.gaF()+z*a*10)}],
cv:function(a){var z=this.cs(a)
if(this.Q+a.gfA()>z)return!0
else return!1},
cs:function(a){var z,y
z=a.ga5()
z=z.gF(z)-this.b.a[0]
H.q(z)
H.q(2)
y=Math.pow(z,2)
z=a.ga5()
z=z.gI(z)-this.b.a[1]
H.q(z)
H.q(2)
return Math.sqrt(H.q(y+Math.pow(z,2)))},
ct:function(a){return a.b.a2(0,this.b).fm()},
cB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.e
if(z){y=this.c.a
y[0]=0
y[1]=0}if(a instanceof S.by){x=this.cs(a)
y=this.Q
w=a.Q
v=this.ct(a)
u=this.ct(a)
t=a.c.a2(0,this.c)
s=a.y
r=t.a
q=r[0]
p=u.a
o=p[0]
n=r[1]
m=p[1]
r=r[2]
p=p[2]
l=a.d
k=this.d
j=-1*(1+(this.y+s)/2)*(q*o+n*m+r*p)/(1/l+1/k)
i=u.t(0,j).aA(0,l)
h=u.t(0,-1).t(0,j).aA(0,k)
g=v.t(0,-1).t(0,this.Q).cD(u.t(0,1).t(0,j)).aA(0,5e-8)
f=v.t(0,1).t(0,this.Q).cD(u.t(0,-1).t(0,j)).aA(0,5e-8)
if(!z){this.c=this.c.j(0,h)
this.x=this.x+f.a[2]*1000}if(!a.e){a.b=a.b.j(0,v.t(0,y+w-x).aA(0,1))
a.c=a.c.j(0,i)
a.x=a.x+g.a[2]*1000}}}},
hL:{
"^":"a;a,b",
ap:function(a){var z,y,x,w,v,u,t,s,r
z=this.b
C.a.dA(z)
for(y=z.length,x=this.a.a,w=0;v=z.length,w<v;z.length===y||(0,H.a4)(z),++w){u=z[w]
for(t=J.n(u),s=0;s<z.length;z.length===v||(0,H.a4)(z),++s){r=z[s]
if(!t.p(u,r)&&u.cv(r))u.cB(r)}if(!u.gfg()){v=u.c.a
v[0]=v[0]+x[0]
v[1]=v[1]+x[1]}u.ap(a)}},
bQ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=S.hM(b)
y=z-c
x=z+c
w=[]
for(v=this.b,u=v.length,t=f!=null,s=0;s<v.length;v.length===u||(0,H.a4)(v),++s){r=v[s]
q=J.n(r)
if(q.p(r,a))continue
if(t&&f!==q.gcM(r))continue
q=a.b.a[0]
p=r.ga5()
o=q-p.gF(p)
p=a.b.a[1]
q=r.ga5()
n=p-q.gI(q)
m=Math.sqrt(o*o+n*n)
q=r.ga5()
q=q.gF(q)
p=a.b.a[0]
l=r.ga5()
l=l.gI(l)
k=a.b.a[1]
j=Math.atan2(l-k,q-p)
if(!(d<=m&&m<=e))continue
if(j-y>=0&&j-x<=0)w.push(r)}return w},
static:{hM:function(a){a=C.b.dk(a+25.132741228718345,6.283185307179586)
if(a<3.141592653589793)return a
else return-3.141592653589793+(a-3.141592653589793)}}}}],["","",,E,{
"^":"",
o:{
"^":"a;q:a<",
aB:function(a){var z,y
z=this.a
y=a.a
z[15]=y[15]
z[14]=y[14]
z[13]=y[13]
z[12]=y[12]
z[11]=y[11]
z[10]=y[10]
z[9]=y[9]
z[8]=y[8]
z[7]=y[7]
z[6]=y[6]
z[5]=y[5]
z[4]=y[4]
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){return"[0] "+this.aT(0).i(0)+"\n[1] "+this.aT(1).i(0)+"\n[2] "+this.aT(2).i(0)+"\n[3] "+this.aT(3).i(0)+"\n"},
geY:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.c(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=16)return H.c(z,b)
z[b]=c},
aT:function(a){var z,y,x
z=new Float64Array(H.j(4))
y=this.a
if(a>=16)return H.c(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.c(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.c(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.c(y,x)
z[3]=y[x]
return new E.ag(z)},
aZ:function(a){var z=new E.o(new Float64Array(H.j(16)))
z.aB(this)
return z},
t:function(a,b){var z,y,x
if(!!b.$isag){z=new Float64Array(H.j(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ag(z)}if(!!b.$isA){z=new Float64Array(H.j(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.A(z)}if(4===b.geY()){z=new Float64Array(H.j(16))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
z[4]=y[0]*x[4]+y[4]*x[5]+y[8]*x[6]+y[12]*x[7]
z[8]=y[0]*x[8]+y[4]*x[9]+y[8]*x[10]+y[12]*x[11]
z[12]=y[0]*x[12]+y[4]*x[13]+y[8]*x[14]+y[12]*x[15]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[5]=y[1]*x[4]+y[5]*x[5]+y[9]*x[6]+y[13]*x[7]
z[9]=y[1]*x[8]+y[5]*x[9]+y[9]*x[10]+y[13]*x[11]
z[13]=y[1]*x[12]+y[5]*x[13]+y[9]*x[14]+y[13]*x[15]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[6]=y[2]*x[4]+y[6]*x[5]+y[10]*x[6]+y[14]*x[7]
z[10]=y[2]*x[8]+y[6]*x[9]+y[10]*x[10]+y[14]*x[11]
z[14]=y[2]*x[12]+y[6]*x[13]+y[10]*x[14]+y[14]*x[15]
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[7]=y[3]*x[4]+y[7]*x[5]+y[11]*x[6]+y[15]*x[7]
z[11]=y[3]*x[8]+y[7]*x[9]+y[11]*x[10]+y[15]*x[11]
z[15]=y[3]*x[12]+y[7]*x[13]+y[11]*x[14]+y[15]*x[15]
return new E.o(z)}throw H.f(P.aK(b))},
j:function(a,b){var z,y
z=new Float64Array(H.j(16))
y=this.a
z[0]=C.b.j(y[0],b.gq().h(0,0))
z[1]=C.b.j(y[1],b.gq().h(0,1))
z[2]=C.b.j(y[2],b.gq().h(0,2))
z[3]=C.b.j(y[3],b.gq().h(0,3))
z[4]=C.b.j(y[4],b.gq().h(0,4))
z[5]=C.b.j(y[5],b.gq().h(0,5))
z[6]=C.b.j(y[6],b.gq().h(0,6))
z[7]=C.b.j(y[7],b.gq().h(0,7))
z[8]=C.b.j(y[8],b.gq().h(0,8))
z[9]=C.b.j(y[9],b.gq().h(0,9))
z[10]=C.b.j(y[10],b.gq().h(0,10))
z[11]=C.b.j(y[11],b.gq().h(0,11))
z[12]=C.b.j(y[12],b.gq().h(0,12))
z[13]=C.b.j(y[13],b.gq().h(0,13))
z[14]=C.b.j(y[14],b.gq().h(0,14))
z[15]=C.b.j(y[15],b.gq().h(0,15))
return new E.o(z)},
G:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.n(b)
y=!!z.$isag
x=y?b.gH():1
if(!!z.$isA||y){w=z.gF(b)
v=z.gI(b)
u=z.gfS(b)}else{u=d
v=c
w=b}z=this.a
y=z[0]
t=z[4]
s=z[8]
r=z[12]
q=z[1]
p=z[5]
o=z[9]
n=z[13]
m=z[2]
l=z[6]
k=z[10]
j=z[14]
i=z[3]
h=z[7]
g=z[11]
f=z[15]
z[12]=y*w+t*v+s*u+r*x
z[13]=q*w+p*v+o*u+n*x
z[14]=m*w+l*v+k*u+j*x
z[15]=i*w+h*v+g*u+f*x
return this},
d3:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.cos(H.q(a))
y=Math.sin(H.q(a))
x=this.a
w=x[0]
v=x[4]
u=x[1]
t=x[5]
s=x[2]
r=x[6]
q=x[3]
p=x[7]
o=-y
x[0]=w*z+v*y
x[1]=u*z+t*y
x[2]=s*z+r*y
x[3]=q*z+p*y
x[4]=w*o+v*z
x[5]=u*o+t*z
x[6]=s*o+r*z
x[7]=q*o+p*z
return this},
bP:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
y=!!z.$isag
x=y?b.gH():1
if(!!z.$isA||y){w=z.gF(b)
v=z.gI(b)
u=z.gfS(b)}else{u=d
v=c
w=b}z=this.a
z[0]=z[0]*w
z[1]=z[1]*w
z[2]=z[2]*w
z[3]=z[3]*w
z[4]=z[4]*v
z[5]=z[5]*v
z[6]=z[6]*v
z[7]=z[7]*v
z[8]=z[8]*u
z[9]=z[9]*u
z[10]=z[10]*u
z[11]=z[11]*u
z[12]=z[12]*x
z[13]=z[13]*x
z[14]=z[14]*x
z[15]=z[15]*x
return this},
n:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1
return this},
a6:function(a,b,c){var z=this.a
z[14]=c
z[13]=b
z[12]=a},
cJ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
s=z[6]
r=z[7]
q=z[8]
p=z[9]
o=z[10]
n=z[11]
m=z[12]
l=z[13]
k=z[14]
j=z[15]
i=y*t-x*u
h=y*s-w*u
g=y*r-v*u
f=x*s-w*t
e=x*r-v*t
d=w*r-v*s
c=q*l-p*m
b=q*k-o*m
a=q*j-n*m
a0=p*k-o*l
a1=p*j-n*l
a2=o*j-n*k
a3=i*a2-h*a1+g*a0+f*a-e*b+d*c
if(a3===0)return a3
a4=1/a3
z[0]=(t*a2-s*a1+r*a0)*a4
z[1]=(-x*a2+w*a1-v*a0)*a4
z[2]=(l*d-k*e+j*f)*a4
z[3]=(-p*d+o*e-n*f)*a4
a5=-u
z[4]=(a5*a2+s*a-r*b)*a4
z[5]=(y*a2-w*a+v*b)*a4
a6=-m
z[6]=(a6*d+k*g-j*h)*a4
z[7]=(q*d-o*g+n*h)*a4
z[8]=(u*a1-t*a+r*c)*a4
z[9]=(-y*a1+x*a-v*c)*a4
z[10]=(m*e-l*g+j*i)*a4
z[11]=(-q*e+p*g-n*i)*a4
z[12]=(a5*a0+t*b-s*c)*a4
z[13]=(y*a0-x*b+w*c)*a4
z[14]=(a6*f+l*h-k*i)*a4
z[15]=(q*f-p*h+o*i)*a4
return a3}},
bd:{
"^":"a;a",
i:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+"]"},
j:function(a,b){var z,y,x
z=this.a
y=C.b.j(z[0],b.gq().h(0,0))
z=C.b.j(z[1],b.gq().h(0,1))
x=new Float64Array(H.j(2))
x[0]=y
x[1]=z
return new E.bd(x)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.c(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=2)return H.c(z,b)
z[b]=c},
gm:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(H.q(y*y+z*z))},
ga5:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.j(2))
x[0]=y
x[1]=z
return new E.bd(x)},
gF:function(a){return this.a[0]},
gI:function(a){return this.a[1]}},
A:{
"^":"a;q:a<",
N:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aB:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
a2:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gq()[0]
w=z[1]
v=b.a
u=v[1]
z=z[2]
v=v[2]
t=new E.A(new Float64Array(H.j(3)))
t.N(y-x,w-u,z-v)
return t},
j:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gq()[0]
w=z[1]
v=b.a
u=v[1]
z=z[2]
v=v[2]
t=new E.A(new Float64Array(H.j(3)))
t.N(y+x,w+u,z+v)
return t},
aA:function(a,b){var z,y,x,w,v
z=1/b
y=this.a
x=y[0]
w=y[1]
y=y[2]
v=new E.A(new Float64Array(H.j(3)))
v.N(x*z,w*z,y*z)
return v},
t:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.k(b)
x=z[1]
z=z[2]
w=new E.A(new Float64Array(H.j(3)))
w.N(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.c(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=3)return H.c(z,b)
z[b]=c},
gm:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.q(y*y+x*x+z*z))},
fm:function(){var z,y
z=this.gm(this)
if(z===0)return this
z=1/z
y=this.a
y[0]=y[0]*z
y[1]=y[1]*z
y[2]=y[2]*z
return this},
cD:function(a){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=a.a
v=z[0]
u=z[1]
t=z[2]
z=new E.A(new Float64Array(H.j(3)))
z.N(x*t-w*u,w*v-y*t,y*u-x*v)
return z},
aZ:function(a){var z=new E.A(new Float64Array(H.j(3)))
z.aB(this)
return z},
ga5:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.j(2))
x[0]=y
x[1]=z
return new E.bd(x)},
gF:function(a){return this.a[0]},
gI:function(a){return this.a[1]}},
ag:{
"^":"a;q:a<",
bS:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aB:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
j:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.j(z[0],b.gq().h(0,0))
x=C.b.j(z[1],b.gq().h(0,1))
w=C.b.j(z[2],b.gq().h(0,2))
z=C.b.j(z[3],b.gq().h(0,3))
v=new E.ag(new Float64Array(H.j(4)))
v.bS(y,x,w,z)
return v},
t:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.k(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ag(new Float64Array(H.j(4)))
v.bS(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.c(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=4)return H.c(z,b)
z[b]=c},
gm:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.q(y*y+x*x+w*w+z*z))},
aZ:function(a){var z=new E.ag(new Float64Array(H.j(4)))
z.aB(this)
return z},
ga5:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.j(2))
x[0]=y
x[1]=z
return new E.bd(x)},
gF:function(a){return this.a[0]},
gI:function(a){return this.a[1]},
gH:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cJ.prototype
return J.cI.prototype}if(typeof a=="string")return J.b3.prototype
if(a==null)return J.fr.prototype
if(typeof a=="boolean")return J.fq.prototype
if(a.constructor==Array)return J.aO.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.Y=function(a){if(typeof a=="string")return J.b3.prototype
if(a==null)return a
if(a.constructor==Array)return J.aO.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.aX=function(a){if(a==null)return a
if(a.constructor==Array)return J.aO.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.c7=function(a){if(typeof a=="number")return J.aP.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bW.prototype
return a}
J.j0=function(a){if(typeof a=="number")return J.aP.prototype
if(typeof a=="string")return J.b3.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bW.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.aF=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.j0(a).j(a,b)}
J.a6=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).p(a,b)}
J.e0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.c7(a).b7(a,b)}
J.e1=function(a,b){if(a.constructor==Array||typeof a=="string"||H.je(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.Y(a).h(a,b)}
J.e2=function(a,b,c,d){return J.i(a).e_(a,b,c,d)}
J.e3=function(a,b,c,d){return J.i(a).en(a,b,c,d)}
J.aG=function(a,b,c){return J.i(a).ew(a,b,c)}
J.e4=function(a,b,c){return J.i(a).ex(a,b,c)}
J.e5=function(a,b,c){return J.i(a).ez(a,b,c)}
J.e6=function(a,b,c,d){return J.i(a).eA(a,b,c,d)}
J.e7=function(a,b){return J.aX(a).eE(a,b)}
J.e8=function(a,b,c,d,e){return J.i(a).eF(a,b,c,d,e)}
J.e9=function(a,b){return J.i(a).eG(a,b)}
J.ea=function(a,b){return J.i(a).eH(a,b)}
J.ce=function(a,b,c,d,e){return J.i(a).eJ(a,b,c,d,e)}
J.eb=function(a,b){return J.i(a).bv(a,b)}
J.bp=function(a,b,c){return J.Y(a).eL(a,b,c)}
J.bq=function(a){return J.i(a).eN(a)}
J.ec=function(a){return J.i(a).eO(a)}
J.ed=function(a,b){return J.i(a).eP(a,b)}
J.ee=function(a){return J.i(a).eQ(a)}
J.ef=function(a,b){return J.i(a).eR(a,b)}
J.cf=function(a,b){return J.i(a).eS(a,b)}
J.cg=function(a,b,c,d,e){return J.i(a).eZ(a,b,c,d,e)}
J.eg=function(a,b){return J.aX(a).am(a,b)}
J.ch=function(a,b){return J.i(a).f2(a,b)}
J.br=function(a,b){return J.i(a).f3(a,b)}
J.eh=function(a,b){return J.aX(a).L(a,b)}
J.S=function(a){return J.i(a).gA(a)}
J.Z=function(a){return J.i(a).gw(a)}
J.a7=function(a){return J.i(a).gaJ(a)}
J.L=function(a){return J.n(a).gB(a)}
J.ei=function(a){return J.i(a).gk(a)}
J.bs=function(a){return J.aX(a).gM(a)}
J.aH=function(a){return J.Y(a).gm(a)}
J.ej=function(a){return J.i(a).gcS(a)}
J.ek=function(a){return J.i(a).gcT(a)}
J.el=function(a){return J.i(a).gcU(a)}
J.em=function(a){return J.i(a).gcV(a)}
J.en=function(a){return J.i(a).gcW(a)}
J.eo=function(a){return J.i(a).gcX(a)}
J.ep=function(a){return J.i(a).gcY(a)}
J.eq=function(a){return J.i(a).gbI(a)}
J.er=function(a){return J.i(a).gl(a)}
J.es=function(a){return J.i(a).gF(a)}
J.bt=function(a,b,c){return J.i(a).de(a,b,c)}
J.et=function(a){return J.i(a).df(a)}
J.eu=function(a,b){return J.i(a).dg(a,b)}
J.aI=function(a,b,c){return J.i(a).dj(a,b,c)}
J.ev=function(a,b){return J.i(a).cN(a,b)}
J.ew=function(a,b){return J.aX(a).ax(a,b)}
J.ci=function(a,b){return J.i(a).sw(a,b)}
J.ex=function(a,b){return J.i(a).sk(a,b)}
J.ey=function(a,b){return J.i(a).sa7(a,b)}
J.ez=function(a,b){return J.i(a).sl(a,b)}
J.cj=function(a,b,c,d){return J.i(a).dC(a,b,c,d)}
J.ck=function(a,b,c,d){return J.i(a).dD(a,b,c,d)}
J.eA=function(a,b,c,d,e,f,g){return J.i(a).fJ(a,b,c,d,e,f,g)}
J.aZ=function(a,b,c,d){return J.i(a).fL(a,b,c,d)}
J.T=function(a){return J.c7(a).fM(a)}
J.cl=function(a){return J.c7(a).a0(a)}
J.aJ=function(a){return J.n(a).i(a)}
J.eB=function(a,b,c,d,e,f){return J.i(a).fO(a,b,c,d,e,f)}
J.eC=function(a,b,c,d){return J.i(a).fP(a,b,c,d)}
J.bu=function(a,b){return J.i(a).fQ(a,b)}
J.bv=function(a,b,c,d,e,f,g){return J.i(a).fR(a,b,c,d,e,f,g)}
var $=I.p
C.a=J.aO.prototype
C.f=J.cI.prototype
C.e=J.cJ.prototype
C.b=J.aP.prototype
C.j=J.b3.prototype
C.A=J.fF.prototype
C.B=J.bW.prototype
C.n=new H.cv()
C.o=new P.hZ()
C.p=new P.ik()
C.c=new P.iy()
C.h=new P.aM(0)
C.i=new Y.f9(0)
C.q=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.r=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.l=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.m=function(hooks) { return hooks; }

C.t=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.v=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.u=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.w=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.x=function(_, letter) { return letter.toUpperCase(); }
C.y=new H.cD([0,"GameTipTurningDirection.right",1,"GameTipTurningDirection.left"])
C.z=new H.cD([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.k=new F.da(0)
C.d=new F.da(1)
$.cZ="$cachedFunction"
$.d_="$cachedInvocation"
$.a_=0
$.av=null
$.cm=null
$.c9=null
$.dL=null
$.dW=null
$.bi=null
$.bl=null
$.ca=null
$.aq=null
$.aB=null
$.aC=null
$.c3=!1
$.m=C.c
$.cx=0
$.ct=null
$.cs=null
$.cr=null
$.cq=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["cG","$get$cG",function(){return H.fk()},"cH","$get$cH",function(){return new P.eX(null)},"dg","$get$dg",function(){return H.a1(H.bc({toString:function(){return"$receiver$"}}))},"dh","$get$dh",function(){return H.a1(H.bc({$method$:null,toString:function(){return"$receiver$"}}))},"di","$get$di",function(){return H.a1(H.bc(null))},"dj","$get$dj",function(){return H.a1(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dn","$get$dn",function(){return H.a1(H.bc(void 0))},"dp","$get$dp",function(){return H.a1(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dl","$get$dl",function(){return H.a1(H.dm(null))},"dk","$get$dk",function(){return H.a1(function(){try{null.$method$}catch(z){return z.message}}())},"dr","$get$dr",function(){return H.a1(H.dm(void 0))},"dq","$get$dq",function(){return H.a1(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bY","$get$bY",function(){return P.hN()},"aD","$get$aD",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bJ]},{func:1,void:true,args:[P.P]},{func:1,args:[F.bU]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.ae]},{func:1,args:[,],opt:[,]},{func:1,ret:P.P,args:[P.u]},{func:1,args:[,P.P]},{func:1,args:[P.P]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.ae]},{func:1,ret:P.c5},{func:1,void:true,args:[P.a],opt:[P.ae]},{func:1,void:true,args:[,P.ae]},{func:1,args:[,,]},{func:1,args:[P.d6,,]},{func:1,void:true,args:[P.P,P.a5,P.a5,P.a5]},{func:1,args:[P.P,,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.jm(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.bj=a.bj
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dY(F.dU(),b)},[])
else (function(b){H.dY(F.dU(),b)})([])})})()