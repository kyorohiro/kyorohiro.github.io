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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ise)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bO"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bO"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bO(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b8=function(){}
var dart=[["","",,H,{
"^":"",
iQ:{
"^":"a;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bc:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b9:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bR==null){H.hX()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.cY("Return interceptor for "+H.b(y(a,z))))}w=H.i5(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.z
else return C.A}return w},
e:{
"^":"a;",
l:function(a,b){return a===b},
gp:function(a){return H.Y(a)},
i:["cG",function(a){return H.aX(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
eE:{
"^":"e;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$isbN:1},
eG:{
"^":"e;",
l:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
ci:{
"^":"e;",
gp:function(a){return 0},
$iseH:1},
eT:{
"^":"ci;"},
bE:{
"^":"ci;",
i:function(a){return String(a)}},
ax:{
"^":"e;",
bR:function(a,b){if(!!a.immutable$list)throw H.f(new P.K(b))},
bQ:function(a,b){if(!!a.fixed$length)throw H.f(new P.K(b))},
aW:function(a,b){var z,y
this.bQ(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.af)(b),++y)a.push(b[y])},
G:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.F(a))}},
a6:function(a,b){return H.d(new H.bu(a,b),[null,null])},
bW:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
T:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
gdY:function(a){if(a.length>0)return a[0]
throw H.f(H.bp())},
ga5:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(H.bp())},
bi:function(a,b,c,d,e){var z,y,x
this.bR(a,"set range")
P.cA(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.w(P.aA(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.f(H.eC())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aN(a,"[","]")},
gF:function(a){return new J.e4(a,a.length,0,null)},
gp:function(a){return H.Y(a)},
gj:function(a){return a.length},
sj:function(a,b){this.bQ(a,"set length")
if(b<0)throw H.f(P.aA(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.u(a,b))
if(b>=a.length||b<0)throw H.f(H.u(a,b))
return a[b]},
u:function(a,b,c){this.bR(a,"indexed set")
if(b>=a.length||b<0)throw H.f(H.u(a,b))
a[b]=c},
$isaO:1,
$isj:1,
$asj:null,
$isp:1},
iP:{
"^":"ax;"},
e4:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(new P.F(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ay:{
"^":"e;",
b7:function(a,b){return a%b},
a8:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.K(""+a))},
w:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.K(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.f(H.ad(b))
return a+b},
cL:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a8(a/b)},
ae:function(a,b){return(a|0)===a?a/b|0:this.a8(a/b)},
aU:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
az:function(a,b){if(typeof b!=="number")throw H.f(H.ad(b))
return a<b},
$isaG:1},
ch:{
"^":"ay;",
$isaG:1,
$iso:1},
eF:{
"^":"ay;",
$isaG:1},
aP:{
"^":"e;",
dE:function(a,b){if(b>=a.length)throw H.f(H.u(a,b))
return a.charCodeAt(b)},
k:function(a,b){if(typeof b!=="string")throw H.f(P.e3(b,null,null))
return a+b},
cF:function(a,b,c){H.dg(b)
if(c==null)c=a.length
H.dg(c)
if(b<0)throw H.f(P.aY(b,null,null))
if(typeof c!=="number")return H.R(c)
if(b>c)throw H.f(P.aY(b,null,null))
if(c>a.length)throw H.f(P.aY(c,null,null))
return a.substring(b,c)},
cE:function(a,b){return this.cF(a,b,null)},
gK:function(a){return a.length===0},
i:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.u(a,b))
if(b>=a.length||b<0)throw H.f(H.u(a,b))
return a[b]},
$isaO:1,
$isV:1}}],["","",,H,{
"^":"",
aC:function(a,b){var z=a.ah(b)
if(!init.globalState.d.cy)init.globalState.f.al()
return z},
bb:function(){--init.globalState.f.b},
du:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.f(P.bi("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hh(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cf()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.fT(P.bs(null,H.aB),0)
y.z=P.aR(null,null,null,P.o,H.bJ)
y.ch=P.aR(null,null,null,P.o,null)
if(y.x===!0){x=new H.hg()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.ev,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hi)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aR(null,null,null,P.o,H.aZ)
w=P.ah(null,null,null,P.o)
v=new H.aZ(0,null,!1)
u=new H.bJ(y,x,w,init.createNewIsolate(),v,new H.a6(H.bd()),new H.a6(H.bd()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
w.a2(0,0)
u.bl(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aE()
x=H.ae(y,[y]).W(a)
if(x)u.ah(new H.i8(z,a))
else{y=H.ae(y,[y,y]).W(a)
if(y)u.ah(new H.i9(z,a))
else u.ah(a)}init.globalState.f.al()},
ez:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eA()
return},
eA:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.K("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.K("Cannot extract URI from \""+H.b(z)+"\""))},
ev:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b2(!0,[]).X(b.data)
y=J.Q(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b2(!0,[]).X(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b2(!0,[]).X(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aR(null,null,null,P.o,H.aZ)
p=P.ah(null,null,null,P.o)
o=new H.aZ(0,null,!1)
n=new H.bJ(y,q,p,init.createNewIsolate(),o,new H.a6(H.bd()),new H.a6(H.bd()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
p.a2(0,0)
n.bl(0,o)
init.globalState.f.a.S(new H.aB(n,new H.ew(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.al()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").V(y.h(z,"msg"))
init.globalState.f.al()
break
case"close":init.globalState.ch.a7(0,$.$get$cg().h(0,a))
a.terminate()
init.globalState.f.al()
break
case"log":H.eu(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a8(["command","print","msg",z])
q=new H.a9(!0,P.a7(null,P.o)).I(q)
y.toString
self.postMessage(q)}else P.aH(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},
eu:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a8(["command","log","msg",a])
x=new H.a9(!0,P.a7(null,P.o)).I(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.y(w)
z=H.v(w)
throw H.f(P.aM(z))}},
ex:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cw=$.cw+("_"+y)
$.cx=$.cx+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.V(["spawned",new H.b4(y,x),w,z.r])
x=new H.ey(a,b,c,d,z)
if(e===!0){z.bN(w,w)
init.globalState.f.a.S(new H.aB(z,x,"start isolate"))}else x.$0()},
hB:function(a){return new H.b2(!0,[]).X(new H.a9(!1,P.a7(null,P.o)).I(a))},
i8:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
i9:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hh:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hi:function(a){var z=P.a8(["command","print","msg",a])
return new H.a9(!0,P.a7(null,P.o)).I(z)}}},
bJ:{
"^":"a;a,b,c,eb:d<,dI:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bN:function(a,b){if(!this.f.l(0,a))return
if(this.Q.a2(0,b)&&!this.y)this.y=!0
this.aV()},
ej:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a7(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.h(z,0)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.h(v,w)
v[w]=x
if(w===y.c)y.bu();++y.d}this.y=!1}this.aV()},
dn:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ei:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.w(new P.K("removeRange"))
P.cA(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cA:function(a,b){if(!this.r.l(0,a))return
this.db=b},
e1:function(a,b,c){var z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){a.V(c)
return}z=this.cx
if(z==null){z=P.bs(null,null)
this.cx=z}z.S(new H.ha(a,c))},
e_:function(a,b){var z
if(!this.r.l(0,a))return
z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){this.b2()
return}z=this.cx
if(z==null){z=P.bs(null,null)
this.cx=z}z.S(this.gee())},
e2:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aH(a)
if(b!=null)P.aH(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.as(a)
y[1]=b==null?null:J.as(b)
for(x=new P.ck(z,z.r,null,null),x.c=z.e;x.n();)x.d.V(y)},
ah:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.y(u)
w=t
v=H.v(u)
this.e2(w,v)
if(this.db===!0){this.b2()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geb()
if(this.cx!=null)for(;t=this.cx,!t.gK(t);)this.cx.c9().$0()}return y},
bZ:function(a){return this.b.h(0,a)},
bl:function(a,b){var z=this.b
if(z.au(a))throw H.f(P.aM("Registry: ports must be registered only once."))
z.u(0,a,b)},
aV:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.b2()},
b2:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.P(0)
for(z=this.b,y=z.gci(z),y=y.gF(y);y.n();)y.gt().cX()
z.P(0)
this.c.P(0)
init.globalState.z.a7(0,this.a)
this.dx.P(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.V(z[v])}this.ch=null}},"$0","gee",0,0,1]},
ha:{
"^":"c:1;a,b",
$0:function(){this.a.V(this.b)}},
fT:{
"^":"a;a,b",
dO:function(){var z=this.a
if(z.b===z.c)return
return z.c9()},
cd:function(){var z,y,x
z=this.dO()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.au(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gK(y)}else y=!1
else y=!1
else y=!1
if(y)H.w(P.aM("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gK(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a8(["command","close"])
x=new H.a9(!0,P.a7(null,P.o)).I(x)
y.toString
self.postMessage(x)}return!1}z.eh()
return!0},
bF:function(){if(self.window!=null)new H.fU(this).$0()
else for(;this.cd(););},
al:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bF()
else try{this.bF()}catch(x){w=H.y(x)
z=w
y=H.v(x)
w=init.globalState.Q
v=P.a8(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.a9(!0,P.a7(null,P.o)).I(v)
w.toString
self.postMessage(v)}}},
fU:{
"^":"c:1;a",
$0:function(){if(!this.a.cd())return
P.cI(C.f,this)}},
aB:{
"^":"a;a,b,c",
eh:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ah(this.b)}},
hg:{
"^":"a;"},
ew:{
"^":"c:0;a,b,c,d,e,f",
$0:function(){H.ex(this.a,this.b,this.c,this.d,this.e,this.f)}},
ey:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aE()
w=H.ae(x,[x,x]).W(y)
if(w)y.$2(this.b,this.c)
else{x=H.ae(x,[x]).W(y)
if(x)y.$1(this.b)
else y.$0()}}z.aV()}},
d_:{
"^":"a;"},
b4:{
"^":"d_;b,a",
V:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbx())return
x=H.hB(a)
if(z.gdI()===y){y=J.Q(x)
switch(y.h(x,0)){case"pause":z.bN(y.h(x,1),y.h(x,2))
break
case"resume":z.ej(y.h(x,1))
break
case"add-ondone":z.dn(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.ei(y.h(x,1))
break
case"set-errors-fatal":z.cA(y.h(x,1),y.h(x,2))
break
case"ping":z.e1(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.e_(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a2(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a7(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.S(new H.aB(z,new H.hk(this,x),w))},
l:function(a,b){if(b==null)return!1
return b instanceof H.b4&&J.a4(this.b,b.b)},
gp:function(a){return this.b.gaP()}},
hk:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbx())z.cT(this.b)}},
bK:{
"^":"d_;b,c,a",
V:function(a){var z,y,x
z=P.a8(["command","message","port",this,"msg",a])
y=new H.a9(!0,P.a7(null,P.o)).I(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
l:function(a,b){if(b==null)return!1
return b instanceof H.bK&&J.a4(this.b,b.b)&&J.a4(this.a,b.a)&&J.a4(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cB()
y=this.a
if(typeof y!=="number")return y.cB()
x=this.c
if(typeof x!=="number")return H.R(x)
return(z<<16^y<<8^x)>>>0}},
aZ:{
"^":"a;aP:a<,b,bx:c<",
cX:function(){this.c=!0
this.b=null},
cT:function(a){if(this.c)return
this.d6(a)},
d6:function(a){return this.b.$1(a)},
$iseV:1},
fe:{
"^":"a;a,b,c",
cN:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.S(new H.aB(y,new H.fg(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ap(new H.fh(this,b),0),a)}else throw H.f(new P.K("Timer greater than 0."))},
static:{ff:function(a,b){var z=new H.fe(!0,!1,null)
z.cN(a,b)
return z}}},
fg:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fh:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
H.bb()
this.b.$0()}},
a6:{
"^":"a;aP:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.ev()
z=C.a.aU(z,0)^C.a.ae(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
l:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a6){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
a9:{
"^":"a;a,b",
I:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gj(z))
z=J.l(a)
if(!!z.$isco)return["buffer",a]
if(!!z.$isby)return["typed",a]
if(!!z.$isaO)return this.cu(a)
if(!!z.$iset){x=this.gcr()
w=a.gbX()
w=H.aU(w,x,H.H(w,"J",0),null)
w=P.bt(w,!0,H.H(w,"J",0))
z=z.gci(a)
z=H.aU(z,x,H.H(z,"J",0),null)
return["map",w,P.bt(z,!0,H.H(z,"J",0))]}if(!!z.$iseH)return this.cv(a)
if(!!z.$ise)this.cg(a)
if(!!z.$iseV)this.am(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb4)return this.cw(a)
if(!!z.$isbK)return this.cz(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.am(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa6)return["capability",a.a]
if(!(a instanceof P.a))this.cg(a)
return["dart",init.classIdExtractor(a),this.ct(init.classFieldsExtractor(a))]},"$1","gcr",2,0,2],
am:function(a,b){throw H.f(new P.K(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cg:function(a){return this.am(a,null)},
cu:function(a){var z=this.cs(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.am(a,"Can't serialize indexable: ")},
cs:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.I(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
ct:function(a){var z
for(z=0;z<a.length;++z)C.b.u(a,z,this.I(a[z]))
return a},
cv:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.am(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.I(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cz:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cw:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaP()]
return["raw sendport",a]}},
b2:{
"^":"a;a,b",
X:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.bi("Bad serialized message: "+H.b(a)))
switch(C.b.gdY(a)){case"ref":if(1>=a.length)return H.h(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.h(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.af(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.af(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.af(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.af(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.dR(a)
case"sendport":return this.dS(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dQ(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.a6(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.af(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.b(a))}},"$1","gdP",2,0,2],
af:function(a){var z,y,x
z=J.Q(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.R(x)
if(!(y<x))break
z.u(a,y,this.X(z.h(a,y)));++y}return a},
dR:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aS()
this.b.push(w)
y=J.e0(y,this.gdP()).bb(0)
for(z=J.Q(y),v=J.Q(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.u(0,y[u],this.X(v.h(x,u)))}return w},
dS:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.a4(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bZ(w)
if(u==null)return
t=new H.b4(u,x)}else t=new H.bK(y,w,x)
this.b.push(t)
return t},
dQ:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.Q(y)
v=J.Q(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.R(t)
if(!(u<t))break
w[z.h(y,u)]=this.X(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eb:function(){throw H.f(new P.K("Cannot modify unmodifiable Map"))},
hS:function(a){return init.types[a]},
i4:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaQ},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.as(a)
if(typeof z!=="string")throw H.f(H.ad(a))
return z},
Y:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cy:function(a){var z,y
z=C.h(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.dE(z,0)===36)z=C.e.cE(z,1)
return(z+H.dn(H.bP(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aX:function(a){return"Instance of '"+H.cy(a)+"'"},
B:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cv:function(a){return a.b?H.B(a).getUTCMilliseconds()+0:H.B(a).getMilliseconds()+0},
aW:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.ad(a))
return a[b]},
bz:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.ad(a))
a[b]=c},
R:function(a){throw H.f(H.ad(a))},
h:function(a,b){if(a==null)J.ar(a)
throw H.f(H.u(a,b))},
u:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a5(!0,b,"index",null)
z=J.ar(a)
if(!(b<0)){if(typeof z!=="number")return H.R(z)
y=b>=z}else y=!0
if(y)return P.bo(b,a,"index",null,z)
return P.aY(b,"index",null)},
ad:function(a){return new P.a5(!0,a,null,null)},
dh:function(a){return a},
dg:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(H.ad(a))
return a},
f:function(a){var z
if(a==null)a=new P.cu()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dw})
z.name=""}else z.toString=H.dw
return z},
dw:function(){return J.as(this.dartException)},
w:function(a){throw H.f(a)},
af:function(a){throw H.f(new P.F(a))},
y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ib(a)
if(a==null)return
if(a instanceof H.bn)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.aU(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bq(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.ct(v,null))}}if(a instanceof TypeError){u=$.$get$cM()
t=$.$get$cN()
s=$.$get$cO()
r=$.$get$cP()
q=$.$get$cT()
p=$.$get$cU()
o=$.$get$cR()
$.$get$cQ()
n=$.$get$cW()
m=$.$get$cV()
l=u.M(y)
if(l!=null)return z.$1(H.bq(y,l))
else{l=t.M(y)
if(l!=null){l.method="call"
return z.$1(H.bq(y,l))}else{l=s.M(y)
if(l==null){l=r.M(y)
if(l==null){l=q.M(y)
if(l==null){l=p.M(y)
if(l==null){l=o.M(y)
if(l==null){l=r.M(y)
if(l==null){l=n.M(y)
if(l==null){l=m.M(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.ct(y,l==null?null:l.method))}}return z.$1(new H.fD(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cD()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a5(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cD()
return a},
v:function(a){var z
if(a instanceof H.bn)return a.b
if(a==null)return new H.d4(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d4(a,null)},
i7:function(a){if(a==null||typeof a!='object')return J.z(a)
else return H.Y(a)},
dj:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
hZ:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.l(c,0))return H.aC(b,new H.i_(a))
else if(z.l(c,1))return H.aC(b,new H.i0(a,d))
else if(z.l(c,2))return H.aC(b,new H.i1(a,d,e))
else if(z.l(c,3))return H.aC(b,new H.i2(a,d,e,f))
else if(z.l(c,4))return H.aC(b,new H.i3(a,d,e,f,g))
else throw H.f(P.aM("Unsupported number of arguments for wrapped closure"))},
ap:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.hZ)
a.$identity=z
return z},
e9:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.eY(z).r}else x=c
w=d?Object.create(new H.f2().constructor.prototype):Object.create(new H.bj(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.N
$.N=J.aq(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.c7(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.hS(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.c6:H.bk
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.c7(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
e6:function(a,b,c,d){var z=H.bk
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
c7:function(a,b,c){var z,y,x,w,v,u
if(c)return H.e8(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.e6(y,!w,z,b)
if(y===0){w=$.ag
if(w==null){w=H.aL("self")
$.ag=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.N
$.N=J.aq(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ag
if(v==null){v=H.aL("self")
$.ag=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.N
$.N=J.aq(w,1)
return new Function(v+H.b(w)+"}")()},
e7:function(a,b,c,d){var z,y
z=H.bk
y=H.c6
switch(b?-1:a){case 0:throw H.f(new H.eZ("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
e8:function(a,b){var z,y,x,w,v,u,t,s
z=H.e5()
y=$.c5
if(y==null){y=H.aL("receiver")
$.c5=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.e7(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.N
$.N=J.aq(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.N
$.N=J.aq(u,1)
return new Function(y+H.b(u)+"}")()},
bO:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.e9(a,b,z,!!d,e,f)},
ia:function(a){throw H.f(new P.ed("Cyclic initialization for static "+H.b(a)))},
ae:function(a,b,c){return new H.f_(a,b,c,null)},
aE:function(){return C.o},
bd:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a3:function(a,b,c){var z
if(b===0){J.dH(c,a)
return}else if(b===1){c.dG(H.y(a),H.v(a))
return}if(!!J.l(a).$isT)z=a
else{z=H.d(new P.D(0,$.k,null),[null])
z.aG(a)}z.ba(H.dc(b,0),new H.hL(b))
return c.gdZ()},
dc:function(a,b){return new H.hI(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
d:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bP:function(a){if(a==null)return
return a.$builtinTypeInfo},
dl:function(a,b){return H.dv(a["$as"+H.b(b)],H.bP(a))},
H:function(a,b,c){var z=H.dl(a,b)
return z==null?null:z[c]},
t:function(a,b){var z=H.bP(a)
return z==null?null:z[b]},
bU:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dn(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dn:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bA("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.bU(u,c))}return w?"":"<"+H.b(z)+">"},
dv:function(a,b){if(typeof a=="function"){a=H.bS(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bS(a,null,b)}return b},
hK:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.I(a[y],b[y]))return!1
return!0},
b6:function(a,b,c){return H.bS(a,b,H.dl(b,c))},
I:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dm(a,b)
if('func' in a)return b.builtin$cls==="iK"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bU(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.bU(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hK(H.dv(v,z),x)},
de:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.I(z,v)||H.I(v,z)))return!1}return!0},
hJ:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.I(v,u)||H.I(u,v)))return!1}return!0},
dm:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.I(z,y)||H.I(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.de(x,w,!1))return!1
if(!H.de(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.I(o,n)||H.I(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.I(o,n)||H.I(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.I(o,n)||H.I(n,o)))return!1}}return H.hJ(a.named,b.named)},
bS:function(a,b,c){return a.apply(b,c)},
jB:function(a){var z=$.bQ
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jz:function(a){return H.Y(a)},
jy:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
i5:function(a){var z,y,x,w,v,u
z=$.bQ.$1(a)
y=$.b7[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.ba[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dd.$2(a,z)
if(z!=null){y=$.b7[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.ba[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bT(x)
$.b7[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.ba[z]=x
return x}if(v==="-"){u=H.bT(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dq(a,x)
if(v==="*")throw H.f(new P.cY(z))
if(init.leafTags[z]===true){u=H.bT(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dq(a,x)},
dq:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bc(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bT:function(a){return J.bc(a,!1,null,!!a.$isaQ)},
i6:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bc(z,!1,null,!!z.$isaQ)
else return J.bc(z,c,null,null)},
hX:function(){if(!0===$.bR)return
$.bR=!0
H.hY()},
hY:function(){var z,y,x,w,v,u,t,s
$.b7=Object.create(null)
$.ba=Object.create(null)
H.hT()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.ds.$1(v)
if(u!=null){t=H.i6(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
hT:function(){var z,y,x,w,v,u,t
z=C.u()
z=H.ac(C.q,H.ac(C.w,H.ac(C.i,H.ac(C.i,H.ac(C.v,H.ac(C.r,H.ac(C.t(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bQ=new H.hU(v)
$.dd=new H.hV(u)
$.ds=new H.hW(t)},
ac:function(a,b){return a(b)||b},
ea:{
"^":"a;",
i:function(a){return P.cn(this)},
u:function(a,b,c){return H.eb()}},
ce:{
"^":"ea;a",
aO:function(){var z=this.$map
if(z==null){z=new H.az(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dj(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aO().h(0,b)},
G:function(a,b){this.aO().G(0,b)},
gj:function(a){var z=this.aO()
return z.gj(z)}},
eX:{
"^":"a;a,b,c,d,e,f,r,x",
static:{eY:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.eX(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fC:{
"^":"a;a,b,c,d,e,f",
M:function(a){var z,y,x
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
static:{P:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fC(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b1:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},cS:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
ct:{
"^":"x;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
eJ:{
"^":"x;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bq:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.eJ(a,y,z?null:b.receiver)}}},
fD:{
"^":"x;a",
i:function(a){var z=this.a
return C.e.gK(z)?"Error":"Error: "+z}},
ib:{
"^":"c:2;a",
$1:function(a){if(!!J.l(a).$isx)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
d4:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
i_:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
i0:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
i1:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
i2:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
i3:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"a;",
i:function(a){return"Closure '"+H.cy(this)+"'"},
gcj:function(){return this},
gcj:function(){return this}},
cG:{
"^":"c;"},
f2:{
"^":"cG;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bj:{
"^":"cG;a,b,c,d",
l:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bj))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.Y(this.a)
else y=typeof z!=="object"?J.z(z):H.Y(z)
z=H.Y(this.b)
if(typeof y!=="number")return y.ew()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aX(z)},
static:{bk:function(a){return a.a},c6:function(a){return a.c},e5:function(){var z=$.ag
if(z==null){z=H.aL("self")
$.ag=z}return z},aL:function(a){var z,y,x,w,v
z=new H.bj("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eZ:{
"^":"x;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
cC:{
"^":"a;"},
f_:{
"^":"cC;a,b,c,d",
W:function(a){var z=this.d2(a)
return z==null?!1:H.dm(z,this.a9())},
d2:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
a9:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isji)z.void=true
else if(!x.$isca)z.ret=y.a9()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cB(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cB(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.di(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a9()}z.named=w}return z},
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
t=H.di(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].a9())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cB:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a9())
return z}}},
ca:{
"^":"cC;",
i:function(a){return"dynamic"},
a9:function(){return}},
bn:{
"^":"a;a,N:b<"},
hL:{
"^":"c:5;a",
$2:function(a,b){H.dc(this.a,1).$1(new H.bn(a,b))}},
hI:{
"^":"c:2;a,b",
$1:function(a){this.b(this.a,a)}},
az:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gK:function(a){return this.a===0},
gbX:function(){return H.d(new H.eL(this),[H.t(this,0)])},
gci:function(a){return H.aU(this.gbX(),new H.eI(this),H.t(this,0),H.t(this,1))},
au:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.d_(z,a)}else return this.e6(a)},
e6:function(a){var z=this.d
if(z==null)return!1
return this.aj(this.O(z,this.ai(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.O(z,b)
return y==null?null:y.gY()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.O(x,b)
return y==null?null:y.gY()}else return this.e7(b)},
e7:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.O(z,this.ai(a))
x=this.aj(y,a)
if(x<0)return
return y[x].gY()},
u:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aR()
this.b=z}this.bk(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aR()
this.c=y}this.bk(y,b,c)}else this.e9(b,c)},
e9:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aR()
this.d=z}y=this.ai(a)
x=this.O(z,y)
if(x==null)this.aT(z,y,[this.aS(a,b)])
else{w=this.aj(x,a)
if(w>=0)x[w].sY(b)
else x.push(this.aS(a,b))}},
a7:function(a,b){if(typeof b==="string")return this.bE(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bE(this.c,b)
else return this.e8(b)},
e8:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.O(z,this.ai(a))
x=this.aj(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bL(w)
return w.gY()},
P:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.F(this))
z=z.c}},
bk:function(a,b,c){var z=this.O(a,b)
if(z==null)this.aT(a,b,this.aS(b,c))
else z.sY(c)},
bE:function(a,b){var z
if(a==null)return
z=this.O(a,b)
if(z==null)return
this.bL(z)
this.br(a,b)
return z.gY()},
aS:function(a,b){var z,y
z=new H.eK(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bL:function(a){var z,y
z=a.gdg()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ai:function(a){return J.z(a)&0x3ffffff},
aj:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gbU(),b))return y
return-1},
i:function(a){return P.cn(this)},
O:function(a,b){return a[b]},
aT:function(a,b,c){a[b]=c},
br:function(a,b){delete a[b]},
d_:function(a,b){return this.O(a,b)!=null},
aR:function(){var z=Object.create(null)
this.aT(z,"<non-identifier-key>",z)
this.br(z,"<non-identifier-key>")
return z},
$iset:1},
eI:{
"^":"c:2;a",
$1:function(a){return this.a.h(0,a)}},
eK:{
"^":"a;bU:a<,Y:b@,c,dg:d<"},
eL:{
"^":"J;a",
gj:function(a){return this.a.a},
gF:function(a){var z,y
z=this.a
y=new H.eM(z,z.r,null,null)
y.c=z.e
return y},
G:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.F(z))
y=y.c}},
$isp:1},
eM:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.F(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hU:{
"^":"c:2;a",
$1:function(a){return this.a(a)}},
hV:{
"^":"c:9;a",
$2:function(a,b){return this.a(a,b)}},
hW:{
"^":"c:10;a",
$1:function(a){return this.a(a)}}}],["","",,D,{
"^":"",
eU:{
"^":"cK;e,f,a,b,c,d",
b3:function(a,b){var z=F.b_(null)
z.a=F.aj(85,255,68,68)
b.a4(null,new F.M(0,0,400,300),z)
b.a3(null,new F.M(10,10,380,280))
b.a4(null,new F.M(0,0,400,300),z)
b.a3(null,new F.M(100,20,100,300))
b.a4(null,new F.M(0,0,400,300),z)
b.av(0)
b.r=1
J.bW(b.d,0)
b.a3(null,new F.M(0,150,400,150))
z=F.b_(null)
z.a=F.aj(255,68,68,255)
b.a4(null,new F.M(0,150,400,300),z)}}}],["","",,H,{
"^":"",
bp:function(){return new P.ai("No element")},
eC:function(){return new P.ai("Too few elements")},
fc:function(a){return a.geB()},
aT:{
"^":"J;",
gF:function(a){return new H.cl(this,this.gj(this),0,null)},
G:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.T(0,y))
if(z!==this.gj(this))throw H.f(new P.F(this))}},
a6:function(a,b){return H.d(new H.bu(this,b),[null,null])},
bc:function(a,b){var z,y,x
if(b){z=H.d([],[H.H(this,"aT",0)])
C.b.sj(z,this.gj(this))}else z=H.d(Array(this.gj(this)),[H.H(this,"aT",0)])
for(y=0;y<this.gj(this);++y){x=this.T(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bb:function(a){return this.bc(a,!0)},
$isp:1},
cl:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z,y,x,w
z=this.a
y=J.Q(z)
x=y.gj(z)
if(this.b!==x)throw H.f(new P.F(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.T(z,w);++this.c
return!0}},
cm:{
"^":"J;a,b",
gF:function(a){var z=new H.eP(null,J.bh(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.ar(this.a)},
$asJ:function(a,b){return[b]},
static:{aU:function(a,b,c,d){if(!!J.l(a).$isp)return H.d(new H.cb(a,b),[c,d])
return H.d(new H.cm(a,b),[c,d])}}},
cb:{
"^":"cm;a,b",
$isp:1},
eP:{
"^":"eD;a,b,c",
n:function(){var z=this.b
if(z.n()){this.a=this.aN(z.gt())
return!0}this.a=null
return!1},
gt:function(){return this.a},
aN:function(a){return this.c.$1(a)}},
bu:{
"^":"aT;a,b",
gj:function(a){return J.ar(this.a)},
T:function(a,b){return this.aN(J.dN(this.a,b))},
aN:function(a){return this.b.$1(a)},
$asaT:function(a,b){return[b]},
$asJ:function(a,b){return[b]},
$isp:1},
cd:{
"^":"a;"}}],["","",,H,{
"^":"",
di:function(a){var z=H.d(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
fF:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hM()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ap(new P.fH(z),1)).observe(y,{childList:true})
return new P.fG(z,y,x)}else if(self.setImmediate!=null)return P.hN()
return P.hO()},
jk:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ap(new P.fI(a),0))},"$1","hM",2,0,4],
jl:[function(a){++init.globalState.f.b
self.setImmediate(H.ap(new P.fJ(a),0))},"$1","hN",2,0,4],
jm:[function(a){P.bB(C.f,a)},"$1","hO",2,0,4],
d7:function(a,b){var z=H.aE()
z=H.ae(z,[z,z]).W(a)
if(z){b.toString
return a}else{b.toString
return a}},
em:function(a,b,c){var z=new P.D(0,$.k,null)
z.$builtinTypeInfo=[c]
P.cI(a,new P.en(b,z))
return z},
c8:function(a){return H.d(new P.fE(H.d(new P.D(0,$.k,null),[a])),[a])},
hC:function(a,b,c){$.k.toString
a.J(b,c)},
hE:function(){var z,y
for(;z=$.aa,z!=null;){$.an=null
y=z.c
$.aa=y
if(y==null)$.am=null
$.k=z.b
z.dw()}},
jx:[function(){$.bL=!0
try{P.hE()}finally{$.k=C.c
$.an=null
$.bL=!1
if($.aa!=null)$.$get$bG().$1(P.df())}},"$0","df",0,0,1],
db:function(a){if($.aa==null){$.am=a
$.aa=a
if(!$.bL)$.$get$bG().$1(P.df())}else{$.am.c=a
$.am=a}},
dt:function(a){var z,y
z=$.k
if(C.c===z){P.ab(null,null,C.c,a)
return}z.toString
if(C.c.gb1()===z){P.ab(null,null,z,a)
return}y=$.k
P.ab(null,null,y,y.aX(a,!0))},
ja:function(a,b){var z,y,x
z=H.d(new P.d5(null,null,null,0),[b])
y=z.gda()
x=z.gdd()
z.a=a.Z(y,!0,z.gdc(),x)
return z},
hG:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.y(u)
z=t
y=H.v(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.S(x)
w=t
v=x.gN()
c.$2(w,v)}}},
hx:function(a,b,c,d){var z=a.aZ()
if(!!J.l(z).$isT)z.bf(new P.hA(b,c,d))
else b.J(c,d)},
hy:function(a,b){return new P.hz(a,b)},
cI:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bB(a,b)}return P.bB(a,z.aX(b,!0))},
bB:function(a,b){var z=C.d.ae(a.a,1000)
return H.ff(z<0?0:z,b)},
bF:function(a){var z=$.k
$.k=a
return z},
aD:function(a,b,c,d,e){var z,y,x
z=new P.cZ(new P.hF(d,e),C.c,null)
y=$.aa
if(y==null){P.db(z)
$.an=$.am}else{x=$.an
if(x==null){z.c=y
$.an=z
$.aa=z}else{z.c=x.c
x.c=z
$.an=z
if(z.c==null)$.am=z}}},
d8:function(a,b,c,d){var z,y
if($.k===c)return d.$0()
z=P.bF(c)
try{y=d.$0()
return y}finally{$.k=z}},
da:function(a,b,c,d,e){var z,y
if($.k===c)return d.$1(e)
z=P.bF(c)
try{y=d.$1(e)
return y}finally{$.k=z}},
d9:function(a,b,c,d,e,f){var z,y
if($.k===c)return d.$2(e,f)
z=P.bF(c)
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ab:function(a,b,c,d){var z=C.c!==c
if(z){d=c.aX(d,!(!z||C.c.gb1()===c))
c=C.c}P.db(new P.cZ(d,c,null))},
fH:{
"^":"c:2;a",
$1:function(a){var z,y
H.bb()
z=this.a
y=z.a
z.a=null
y.$0()}},
fG:{
"^":"c:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fI:{
"^":"c:0;a",
$0:function(){H.bb()
this.a.$0()}},
fJ:{
"^":"c:0;a",
$0:function(){H.bb()
this.a.$0()}},
hu:{
"^":"W;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hv:function(a,b){if(b!=null)return b
if(!!J.l(a).$isx)return a.gN()
return}}},
T:{
"^":"a;"},
en:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a_(null)}catch(x){w=H.y(x)
z=w
y=H.v(x)
P.hC(this.b,z,y)}}},
fN:{
"^":"a;dZ:a<",
dG:function(a,b){a=a!=null?a:new P.cu()
if(this.a.a!==0)throw H.f(new P.ai("Future already completed"))
$.k.toString
this.J(a,b)}},
fE:{
"^":"fN;a",
bS:function(a,b){var z=this.a
if(z.a!==0)throw H.f(new P.ai("Future already completed"))
z.aG(b)},
J:function(a,b){this.a.cW(a,b)}},
ak:{
"^":"a;by:a<,ek:b>,c,d,e",
ga1:function(){return this.b.b},
gbT:function(){return(this.c&1)!==0},
ge4:function(){return this.c===6},
ge3:function(){return this.c===8},
gdf:function(){return this.d},
gdm:function(){return this.d}},
D:{
"^":"a;as:a?,a1:b<,c",
gd7:function(){return this.a===8},
sd8:function(a){if(a)this.a=2
else this.a=0},
ba:function(a,b){var z,y
z=H.d(new P.D(0,$.k,null),[null])
y=z.b
if(y!==C.c){y.toString
if(b!=null)b=P.d7(b,y)}this.aD(new P.ak(null,z,b==null?1:3,a,b))
return z},
bf:function(a){var z,y
z=$.k
y=new P.D(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aD(new P.ak(null,y,8,a,null))
return y},
aQ:function(){if(this.a!==0)throw H.f(new P.ai("Future already completed"))
this.a=1},
gdl:function(){return this.c},
gac:function(){return this.c},
bK:function(a){this.a=4
this.c=a},
bJ:function(a){this.a=8
this.c=a},
dj:function(a,b){this.bJ(new P.W(a,b))},
aD:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ab(null,null,z,new P.fY(this,a))}else{a.a=this.c
this.c=a}},
ar:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gby()
z.a=y}return y},
a_:function(a){var z,y
z=J.l(a)
if(!!z.$isT)if(!!z.$isD)P.b3(a,this)
else P.bI(a,this)
else{y=this.ar()
this.bK(a)
P.a1(this,y)}},
bq:function(a){var z=this.ar()
this.bK(a)
P.a1(this,z)},
J:[function(a,b){var z=this.ar()
this.bJ(new P.W(a,b))
P.a1(this,z)},function(a){return this.J(a,null)},"ex","$2","$1","gaK",2,2,12,0],
aG:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isT){if(!!z.$isD){z=a.a
if(z>=4&&z===8){this.aQ()
z=this.b
z.toString
P.ab(null,null,z,new P.h_(this,a))}else P.b3(a,this)}else P.bI(a,this)
return}}this.aQ()
z=this.b
z.toString
P.ab(null,null,z,new P.h0(this,a))},
cW:function(a,b){var z
this.aQ()
z=this.b
z.toString
P.ab(null,null,z,new P.fZ(this,a,b))},
$isT:1,
static:{bI:function(a,b){var z,y,x,w
b.sas(2)
try{a.ba(new P.h1(b),new P.h2(b))}catch(x){w=H.y(x)
z=w
y=H.v(x)
P.dt(new P.h3(b,z,y))}},b3:function(a,b){var z
b.a=2
z=new P.ak(null,b,0,null,null)
if(a.a>=4)P.a1(a,z)
else a.aD(z)},a1:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gd7()
if(b==null){if(w){v=z.a.gac()
y=z.a.ga1()
x=J.S(v)
u=v.gN()
y.toString
P.aD(null,null,y,x,u)}return}for(;b.gby()!=null;b=t){t=b.a
b.a=null
P.a1(z.a,b)}x.a=!0
s=w?null:z.a.gdl()
x.b=s
x.c=!1
y=!w
if(!y||b.gbT()||b.c===8){r=b.ga1()
if(w){u=z.a.ga1()
u.toString
if(u==null?r!=null:u!==r){u=u.gb1()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gac()
y=z.a.ga1()
x=J.S(v)
u=v.gN()
y.toString
P.aD(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gbT())x.a=new P.h5(x,b,s,r).$0()}else new P.h4(z,x,b,r).$0()
if(b.ge3())new P.h6(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isT}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.D)if(p.a>=4){o.a=2
z.a=p
b=new P.ak(null,o,0,null,null)
y=p
continue}else P.b3(p,o)
else P.bI(p,o)
return}}o=b.b
b=o.ar()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
fY:{
"^":"c:0;a,b",
$0:function(){P.a1(this.a,this.b)}},
h1:{
"^":"c:2;a",
$1:function(a){this.a.bq(a)}},
h2:{
"^":"c:6;a",
$2:function(a,b){this.a.J(a,b)},
$1:function(a){return this.$2(a,null)}},
h3:{
"^":"c:0;a,b,c",
$0:function(){this.a.J(this.b,this.c)}},
h_:{
"^":"c:0;a,b",
$0:function(){P.b3(this.b,this.a)}},
h0:{
"^":"c:0;a,b",
$0:function(){this.a.bq(this.b)}},
fZ:{
"^":"c:0;a,b,c",
$0:function(){this.a.J(this.b,this.c)}},
h5:{
"^":"c:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.ax(this.b.gdf(),this.c)
return!0}catch(x){w=H.y(x)
z=w
y=H.v(x)
this.a.b=new P.W(z,y)
return!1}}},
h4:{
"^":"c:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gac()
y=!0
r=this.c
if(r.ge4()){x=r.d
try{y=this.d.ax(x,J.S(z))}catch(q){r=H.y(q)
w=r
v=H.v(q)
r=J.S(z)
p=w
o=(r==null?p==null:r===p)?z:new P.W(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aE()
p=H.ae(p,[p,p]).W(r)
n=this.d
m=this.b
if(p)m.b=n.em(u,J.S(z),z.gN())
else m.b=n.ax(u,J.S(z))}catch(q){r=H.y(q)
t=r
s=H.v(q)
r=J.S(z)
p=t
o=(r==null?p==null:r===p)?z:new P.W(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
h6:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cb(this.d.gdm())
z.a=w
v=w}catch(u){z=H.y(u)
y=z
x=H.v(u)
if(this.c){z=J.S(this.a.a.gac())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gac()
else v.b=new P.W(y,x)
v.a=!1
return}if(!!J.l(v).$isT){t=this.d
s=t.gek(t)
s.sd8(!0)
this.b.c=!0
v.ba(new P.h7(this.a,s),new P.h8(z,s))}}},
h7:{
"^":"c:2;a,b",
$1:function(a){P.a1(this.a.a,new P.ak(null,this.b,0,null,null))}},
h8:{
"^":"c:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.D)){y=H.d(new P.D(0,$.k,null),[null])
z.a=y
y.dj(a,b)}P.a1(z.a,new P.ak(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
cZ:{
"^":"a;a,b,c",
dw:function(){return this.a.$0()}},
a_:{
"^":"a;",
a6:function(a,b){return H.d(new P.hj(b,this),[H.H(this,"a_",0),null])},
G:function(a,b){var z,y
z={}
y=H.d(new P.D(0,$.k,null),[null])
z.a=null
z.a=this.Z(new P.f6(z,this,b,y),!0,new P.f7(y),y.gaK())
return y},
gj:function(a){var z,y
z={}
y=H.d(new P.D(0,$.k,null),[P.o])
z.a=0
this.Z(new P.f8(z),!0,new P.f9(z,y),y.gaK())
return y},
bb:function(a){var z,y
z=H.d([],[H.H(this,"a_",0)])
y=H.d(new P.D(0,$.k,null),[[P.j,H.H(this,"a_",0)]])
this.Z(new P.fa(this,z),!0,new P.fb(z,y),y.gaK())
return y}},
f6:{
"^":"c;a,b,c,d",
$1:function(a){P.hG(new P.f4(this.c,a),new P.f5(),P.hy(this.a.a,this.d))},
$signature:function(){return H.b6(function(a){return{func:1,args:[a]}},this.b,"a_")}},
f4:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
f5:{
"^":"c:2;",
$1:function(a){}},
f7:{
"^":"c:0;a",
$0:function(){this.a.a_(null)}},
f8:{
"^":"c:2;a",
$1:function(a){++this.a.a}},
f9:{
"^":"c:0;a,b",
$0:function(){this.b.a_(this.a.a)}},
fa:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b6(function(a){return{func:1,args:[a]}},this.a,"a_")}},
fb:{
"^":"c:0;a,b",
$0:function(){this.b.a_(this.a)}},
f3:{
"^":"a;"},
jq:{
"^":"a;"},
fK:{
"^":"a;a1:d<,as:e?",
b5:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bP()
if((z&4)===0&&(this.e&32)===0)this.bv(this.gbA())},
ak:function(a){return this.b5(a,null)},
ca:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gK(z)}else z=!1
if(z)this.r.aA(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bv(this.gbC())}}}},
aZ:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aH()
return this.f},
aH:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bP()
if((this.e&32)===0)this.r=null
this.f=this.bz()},
aF:["cJ",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bG(a)
else this.aE(new P.fQ(a,null))}],
aC:["cK",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bI(a,b)
else this.aE(new P.fS(a,b,null))}],
cV:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bH()
else this.aE(C.p)},
bB:[function(){},"$0","gbA",0,0,1],
bD:[function(){},"$0","gbC",0,0,1],
bz:function(){return},
aE:function(a){var z,y
z=this.r
if(z==null){z=new P.ht(null,null,0)
this.r=z}z.a2(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aA(this)}},
bG:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.b9(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aI((z&4)!==0)},
bI:function(a,b){var z,y
z=this.e
y=new P.fM(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aH()
z=this.f
if(!!J.l(z).$isT)z.bf(y)
else y.$0()}else{y.$0()
this.aI((z&4)!==0)}},
bH:function(){var z,y
z=new P.fL(this)
this.aH()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isT)y.bf(z)
else z.$0()},
bv:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aI((z&4)!==0)},
aI:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gK(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gK(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bB()
else this.bD()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aA(this)},
cR:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.d7(b,z)
this.c=c}},
fM:{
"^":"c:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aE()
x=H.ae(x,[x,x]).W(y)
w=z.d
v=this.b
u=z.b
if(x)w.en(u,v,this.c)
else w.b9(u,v)
z.e=(z.e&4294967263)>>>0}},
fL:{
"^":"c:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cc(z.c)
z.e=(z.e&4294967263)>>>0}},
d0:{
"^":"a;aw:a@"},
fQ:{
"^":"d0;b,a",
b6:function(a){a.bG(this.b)}},
fS:{
"^":"d0;ag:b>,N:c<,a",
b6:function(a){a.bI(this.b,this.c)}},
fR:{
"^":"a;",
b6:function(a){a.bH()},
gaw:function(){return},
saw:function(a){throw H.f(new P.ai("No events after a done."))}},
hl:{
"^":"a;as:a?",
aA:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dt(new P.hm(this,a))
this.a=1},
bP:function(){if(this.a===1)this.a=3}},
hm:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.e0(this.b)}},
ht:{
"^":"hl;b,c,a",
gK:function(a){return this.c==null},
a2:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saw(b)
this.c=b}},
e0:function(a){var z,y
z=this.b
y=z.gaw()
this.b=y
if(y==null)this.c=null
z.b6(a)}},
d5:{
"^":"a;a,b,c,as:d?",
bm:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eC:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a_(!0)
return}this.a.ak(0)
this.c=a
this.d=3},"$1","gda",2,0,function(){return H.b6(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"d5")}],
de:[function(a,b){var z
if(this.d===2){z=this.c
this.bm(0)
z.J(a,b)
return}this.a.ak(0)
this.c=new P.W(a,b)
this.d=4},function(a){return this.de(a,null)},"eE","$2","$1","gdd",2,2,14,0],
eD:[function(){if(this.d===2){var z=this.c
this.bm(0)
z.a_(!1)
return}this.a.ak(0)
this.c=null
this.d=5},"$0","gdc",0,0,1]},
hA:{
"^":"c:0;a,b,c",
$0:function(){return this.a.J(this.b,this.c)}},
hz:{
"^":"c:5;a,b",
$2:function(a,b){return P.hx(this.a,this.b,a,b)}},
bH:{
"^":"a_;",
Z:function(a,b,c,d){return this.d0(a,d,c,!0===b)},
bY:function(a,b,c){return this.Z(a,null,b,c)},
d0:function(a,b,c,d){return P.fX(this,a,b,c,d,H.H(this,"bH",0),H.H(this,"bH",1))},
bw:function(a,b){b.aF(a)},
$asa_:function(a,b){return[b]}},
d1:{
"^":"fK;x,y,a,b,c,d,e,f,r",
aF:function(a){if((this.e&2)!==0)return
this.cJ(a)},
aC:function(a,b){if((this.e&2)!==0)return
this.cK(a,b)},
bB:[function(){var z=this.y
if(z==null)return
z.ak(0)},"$0","gbA",0,0,1],
bD:[function(){var z=this.y
if(z==null)return
z.ca()},"$0","gbC",0,0,1],
bz:function(){var z=this.y
if(z!=null){this.y=null
z.aZ()}return},
ey:[function(a){this.x.bw(a,this)},"$1","gd3",2,0,function(){return H.b6(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"d1")}],
eA:[function(a,b){this.aC(a,b)},"$2","gd5",4,0,15],
ez:[function(){this.cV()},"$0","gd4",0,0,1],
cS:function(a,b,c,d,e,f,g){var z,y
z=this.gd3()
y=this.gd5()
this.y=this.x.a.bY(z,this.gd4(),y)},
static:{fX:function(a,b,c,d,e,f,g){var z=$.k
z=H.d(new P.d1(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cR(b,c,d,e)
z.cS(a,b,c,d,e,f,g)
return z}}},
hj:{
"^":"bH;b,a",
bw:function(a,b){var z,y,x,w,v
z=null
try{z=this.dk(a)}catch(w){v=H.y(w)
y=v
x=H.v(w)
$.k.toString
b.aC(y,x)
return}b.aF(z)},
dk:function(a){return this.b.$1(a)}},
W:{
"^":"a;ag:a>,N:b<",
i:function(a){return H.b(this.a)},
$isx:1},
hw:{
"^":"a;"},
hF:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.f(new P.hu(z,P.hv(z,this.b)))}},
ho:{
"^":"hw;",
gb1:function(){return this},
cc:function(a){var z,y,x,w
try{if(C.c===$.k){x=a.$0()
return x}x=P.d8(null,null,this,a)
return x}catch(w){x=H.y(w)
z=x
y=H.v(w)
return P.aD(null,null,this,z,y)}},
b9:function(a,b){var z,y,x,w
try{if(C.c===$.k){x=a.$1(b)
return x}x=P.da(null,null,this,a,b)
return x}catch(w){x=H.y(w)
z=x
y=H.v(w)
return P.aD(null,null,this,z,y)}},
en:function(a,b,c){var z,y,x,w
try{if(C.c===$.k){x=a.$2(b,c)
return x}x=P.d9(null,null,this,a,b,c)
return x}catch(w){x=H.y(w)
z=x
y=H.v(w)
return P.aD(null,null,this,z,y)}},
aX:function(a,b){if(b)return new P.hp(this,a)
else return new P.hq(this,a)},
ds:function(a,b){if(b)return new P.hr(this,a)
else return new P.hs(this,a)},
h:function(a,b){return},
cb:function(a){if($.k===C.c)return a.$0()
return P.d8(null,null,this,a)},
ax:function(a,b){if($.k===C.c)return a.$1(b)
return P.da(null,null,this,a,b)},
em:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.d9(null,null,this,a,b,c)}},
hp:{
"^":"c:0;a,b",
$0:function(){return this.a.cc(this.b)}},
hq:{
"^":"c:0;a,b",
$0:function(){return this.a.cb(this.b)}},
hr:{
"^":"c:2;a,b",
$1:function(a){return this.a.b9(this.b,a)}},
hs:{
"^":"c:2;a,b",
$1:function(a){return this.a.ax(this.b,a)}}}],["","",,P,{
"^":"",
aS:function(){return H.d(new H.az(0,null,null,null,null,null,0),[null,null])},
a8:function(a){return H.dj(a,H.d(new H.az(0,null,null,null,null,null,0),[null,null]))},
eB:function(a,b,c){var z,y
if(P.bM(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ao()
y.push(a)
try{P.hD(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cE(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aN:function(a,b,c){var z,y,x
if(P.bM(a))return b+"..."+c
z=new P.bA(b)
y=$.$get$ao()
y.push(a)
try{x=z
x.a=P.cE(x.ga0(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga0()+c
y=z.ga0()
return y.charCodeAt(0)==0?y:y},
bM:function(a){var z,y
for(z=0;y=$.$get$ao(),z<y.length;++z)if(a===y[z])return!0
return!1},
hD:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gF(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.n())return
w=H.b(z.gt())
b.push(w)
y+=w.length+2;++x}if(!z.n()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gt();++x
if(!z.n()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gt();++x
for(;z.n();t=s,s=r){r=z.gt();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.h(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.h(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aR:function(a,b,c,d,e){return H.d(new H.az(0,null,null,null,null,null,0),[d,e])},
a7:function(a,b){return P.he(a,b)},
ah:function(a,b,c,d){return H.d(new P.hb(0,null,null,null,null,null,0),[d])},
cn:function(a){var z,y,x
z={}
if(P.bM(a))return"{...}"
y=new P.bA("")
try{$.$get$ao().push(a)
x=y
x.a=x.ga0()+"{"
z.a=!0
J.dO(a,new P.eQ(z,y))
z=y
z.a=z.ga0()+"}"}finally{z=$.$get$ao()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga0()
return z.charCodeAt(0)==0?z:z},
hd:{
"^":"az;a,b,c,d,e,f,r",
ai:function(a){return H.i7(a)&0x3ffffff},
aj:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbU()
if(x==null?b==null:x===b)return y}return-1},
static:{he:function(a,b){return H.d(new P.hd(0,null,null,null,null,null,0),[a,b])}}},
hb:{
"^":"h9;a,b,c,d,e,f,r",
gF:function(a){var z=new P.ck(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dH:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.cZ(b)},
cZ:function(a){var z=this.d
if(z==null)return!1
return this.aq(z[this.ap(a)],a)>=0},
bZ:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dH(0,a)?a:null
else return this.d9(a)},
d9:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ap(a)]
x=this.aq(y,a)
if(x<0)return
return J.bV(y,x).gbs()},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.f(new P.F(this))
z=z.b}},
a2:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bn(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bn(x,b)}else return this.S(b)},
S:function(a){var z,y,x
z=this.d
if(z==null){z=P.hc()
this.d=z}y=this.ap(a)
x=z[y]
if(x==null)z[y]=[this.aJ(a)]
else{if(this.aq(x,a)>=0)return!1
x.push(this.aJ(a))}return!0},
a7:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bo(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bo(this.c,b)
else return this.dh(b)},
dh:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ap(a)]
x=this.aq(y,a)
if(x<0)return!1
this.bp(y.splice(x,1)[0])
return!0},
P:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bn:function(a,b){if(a[b]!=null)return!1
a[b]=this.aJ(b)
return!0},
bo:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bp(z)
delete a[b]
return!0},
aJ:function(a){var z,y
z=new P.eN(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bp:function(a){var z,y
z=a.gcY()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ap:function(a){return J.z(a)&0x3ffffff},
aq:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gbs(),b))return y
return-1},
$isp:1,
static:{hc:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
eN:{
"^":"a;bs:a<,b,cY:c<"},
ck:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.F(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
h9:{
"^":"f0;"},
br:{
"^":"a;",
gF:function(a){return new H.cl(a,this.gj(a),0,null)},
T:function(a,b){return this.h(a,b)},
G:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.f(new P.F(a))}},
a6:function(a,b){return H.d(new H.bu(a,b),[null,null])},
i:function(a){return P.aN(a,"[","]")},
$isj:1,
$asj:null,
$isp:1},
eQ:{
"^":"c:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
eO:{
"^":"J;a,b,c,d",
gF:function(a){return new P.hf(this,this.c,this.d,this.b,null)},
G:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.w(new P.F(this))}},
gK:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
P:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aN(this,"{","}")},
c9:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.bp());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
S:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bu();++this.d},
bu:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.d(z,[H.t(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bi(y,0,w,z,x)
C.b.bi(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cM:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.d(z,[b])},
$isp:1,
static:{bs:function(a,b){var z=H.d(new P.eO(null,0,0,0),[b])
z.cM(a,b)
return z}}},
hf:{
"^":"a;a,b,c,d,e",
gt:function(){return this.e},
n:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.w(new P.F(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
f1:{
"^":"a;",
a6:function(a,b){return H.d(new H.cb(this,b),[H.t(this,0),null])},
i:function(a){return P.aN(this,"{","}")},
G:function(a,b){var z
for(z=this.gF(this);z.n();)b.$1(z.d)},
$isp:1},
f0:{
"^":"f1;"}}],["","",,P,{
"^":"",
hH:function(a){return H.fc(a)},
bl:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.as(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ej(a)},
ej:function(a){var z=J.l(a)
if(!!z.$isc)return z.i(a)
return H.aX(a)},
aM:function(a){return new P.fW(a)},
bt:function(a,b,c){var z,y
z=H.d([],[c])
for(y=J.bh(a);y.n();)z.push(y.gt())
if(b)return z
z.fixed$length=Array
return z},
aH:function(a){var z=H.b(a)
H.dr(z)},
j2:{
"^":"c:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.hH(a)}},
bN:{
"^":"a;"},
"+bool":0,
c9:{
"^":"a;a,b",
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.c9))return!1
return this.a===b.a&&this.b===b.b},
gp:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ee(z?H.B(this).getUTCFullYear()+0:H.B(this).getFullYear()+0)
x=P.at(z?H.B(this).getUTCMonth()+1:H.B(this).getMonth()+1)
w=P.at(z?H.B(this).getUTCDate()+0:H.B(this).getDate()+0)
v=P.at(z?H.B(this).getUTCHours()+0:H.B(this).getHours()+0)
u=P.at(z?H.B(this).getUTCMinutes()+0:H.B(this).getMinutes()+0)
t=P.at(z?H.B(this).getUTCSeconds()+0:H.B(this).getSeconds()+0)
s=P.ef(H.cv(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{ee:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},ef:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},at:function(a){if(a>=10)return""+a
return"0"+a}}},
be:{
"^":"aG;"},
"+double":0,
au:{
"^":"a;a",
k:function(a,b){return new P.au(C.d.k(this.a,b.gd1()))},
az:function(a,b){return C.d.az(this.a,b.gd1())},
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.au))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.ei()
y=this.a
if(y<0)return"-"+new P.au(-y).i(0)
x=z.$1(C.d.b7(C.d.ae(y,6e7),60))
w=z.$1(C.d.b7(C.d.ae(y,1e6),60))
v=new P.eh().$1(C.d.b7(y,1e6))
return""+C.d.ae(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
eh:{
"^":"c:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
ei:{
"^":"c:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
x:{
"^":"a;",
gN:function(){return H.v(this.$thrownJsError)}},
cu:{
"^":"x;",
i:function(a){return"Throw of null."}},
a5:{
"^":"x;a,b,c,d",
gaM:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaL:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaM()+y+x
if(!this.a)return w
v=this.gaL()
u=P.bl(this.b)
return w+v+": "+H.b(u)},
static:{bi:function(a){return new P.a5(!1,null,null,a)},e3:function(a,b,c){return new P.a5(!0,a,b,c)}}},
cz:{
"^":"a5;e,f,a,b,c,d",
gaM:function(){return"RangeError"},
gaL:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.eu()
if(typeof z!=="number")return H.R(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{aY:function(a,b,c){return new P.cz(null,null,!0,a,b,"Value not in range")},aA:function(a,b,c,d,e){return new P.cz(b,c,!0,a,d,"Invalid value")},cA:function(a,b,c,d,e,f){if(0>a||a>c)throw H.f(P.aA(a,0,c,"start",f))
if(a>b||b>c)throw H.f(P.aA(b,a,c,"end",f))
return b}}},
ep:{
"^":"a5;e,j:f>,a,b,c,d",
gaM:function(){return"RangeError"},
gaL:function(){P.bl(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dx(this.b,0)?": index must not be negative":z},
static:{bo:function(a,b,c,d,e){var z=e!=null?e:J.ar(b)
return new P.ep(b,z,!0,a,c,"Index out of range")}}},
K:{
"^":"x;a",
i:function(a){return"Unsupported operation: "+this.a}},
cY:{
"^":"x;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
ai:{
"^":"x;a",
i:function(a){return"Bad state: "+this.a}},
F:{
"^":"x;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bl(z))+"."}},
cD:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gN:function(){return},
$isx:1},
ed:{
"^":"x;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
fW:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
ek:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aW(b,"expando$values")
return z==null?null:H.aW(z,this.bt())},
u:function(a,b,c){var z=H.aW(b,"expando$values")
if(z==null){z=new P.a()
H.bz(b,"expando$values",z)}H.bz(z,this.bt(),c)},
bt:function(){var z,y
z=H.aW(this,"expando$key")
if(z==null){y=$.cc
$.cc=y+1
z="expando$key$"+y
H.bz(this,"expando$key",z)}return z}},
o:{
"^":"aG;"},
"+int":0,
J:{
"^":"a;",
a6:function(a,b){return H.aU(this,b,H.H(this,"J",0),null)},
G:function(a,b){var z
for(z=this.gF(this);z.n();)b.$1(z.gt())},
bc:function(a,b){return P.bt(this,b,H.H(this,"J",0))},
bb:function(a){return this.bc(a,!0)},
gj:function(a){var z,y
z=this.gF(this)
for(y=0;z.n();)++y
return y},
T:function(a,b){var z,y,x
if(b<0)H.w(P.aA(b,0,null,"index",null))
for(z=this.gF(this),y=0;z.n();){x=z.gt()
if(b===y)return x;++y}throw H.f(P.bo(b,this,"index",null,y))},
i:function(a){return P.eB(this,"(",")")}},
eD:{
"^":"a;"},
j:{
"^":"a;",
$asj:null,
$isp:1},
"+List":0,
j3:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aG:{
"^":"a;"},
"+num":0,
a:{
"^":";",
l:function(a,b){return this===b},
gp:function(a){return H.Y(this)},
i:function(a){return H.aX(this)}},
Z:{
"^":"a;"},
V:{
"^":"a;"},
"+String":0,
bA:{
"^":"a;a0:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cE:function(a,b,c){var z=J.bh(b)
if(!z.n())return a
if(c.length===0){do a+=H.b(z.gt())
while(z.n())}else{a+=H.b(z.gt())
for(;z.n();)a=a+c+H.b(z.gt())}return a}}},
cF:{
"^":"a;"}}],["","",,W,{
"^":"",
a2:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d2:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
d6:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.fP(a)
if(!!J.l(z).$isL)return z
return}else return a},
E:function(a){var z=$.k
if(z===C.c)return a
return z.ds(a,!0)},
A:{
"^":"av;",
$isA:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
ie:{
"^":"A;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
ih:{
"^":"A;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
ii:{
"^":"A;",
$isL:1,
$ise:1,
"%":"HTMLBodyElement"},
ij:{
"^":"A;v:height},A:width}",
bg:function(a,b,c){return a.getContext(b,P.hP(c))},
cn:function(a,b,c,d,e,f,g){var z,y
z=P.a8(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bg(a,"webgl",z)
return y==null?this.bg(a,"experimental-webgl",z):y},
cm:function(a,b){return this.cn(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
il:{
"^":"aV;j:length=",
$ise:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
im:{
"^":"eq;j:length=",
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eq:{
"^":"e+ec;"},
ec:{
"^":"a;"},
io:{
"^":"aV;",
$ise:1,
"%":"DocumentFragment|ShadowRoot"},
ip:{
"^":"e;",
i:function(a){return String(a)},
"%":"DOMException"},
eg:{
"^":"e;aY:bottom=,v:height=,L:left=,b8:right=,aa:top=,A:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gA(a))+" x "+H.b(this.gv(a))},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isU)return!1
y=a.left
x=z.gL(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaa(b)
if(y==null?x==null:y===x){y=this.gA(a)
x=z.gA(b)
if(y==null?x==null:y===x){y=this.gv(a)
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w
z=J.z(a.left)
y=J.z(a.top)
x=J.z(this.gA(a))
w=J.z(this.gv(a))
return W.d2(W.a2(W.a2(W.a2(W.a2(0,z),y),x),w))},
gbd:function(a){return H.d(new P.G(a.left,a.top),[null])},
$isU:1,
$asU:I.b8,
"%":";DOMRectReadOnly"},
av:{
"^":"aV;",
gH:function(a){return P.eW(C.a.w(a.offsetLeft),C.a.w(a.offsetTop),C.a.w(a.offsetWidth),C.a.w(a.offsetHeight),null)},
i:function(a){return a.localName},
cl:function(a){return a.getBoundingClientRect()},
gc_:function(a){return H.d(new W.r(a,"mousedown",!1),[null])},
gc0:function(a){return H.d(new W.r(a,"mouseenter",!1),[null])},
gc1:function(a){return H.d(new W.r(a,"mouseleave",!1),[null])},
gc2:function(a){return H.d(new W.r(a,"mousemove",!1),[null])},
gc3:function(a){return H.d(new W.r(a,"mouseout",!1),[null])},
gc4:function(a){return H.d(new W.r(a,"mouseover",!1),[null])},
gc5:function(a){return H.d(new W.r(a,"mouseup",!1),[null])},
$isav:1,
$ise:1,
$isL:1,
"%":";Element"},
iq:{
"^":"A;v:height},A:width}",
"%":"HTMLEmbedElement"},
ir:{
"^":"bm;ag:error=",
"%":"ErrorEvent"},
bm:{
"^":"e;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
L:{
"^":"e;",
cU:function(a,b,c,d){return a.addEventListener(b,H.ap(c,1),d)},
di:function(a,b,c,d){return a.removeEventListener(b,H.ap(c,1),d)},
$isL:1,
"%":"MediaStream;EventTarget"},
iJ:{
"^":"A;j:length=",
"%":"HTMLFormElement"},
iL:{
"^":"A;v:height},A:width}",
"%":"HTMLIFrameElement"},
iM:{
"^":"A;v:height},A:width}",
bS:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
iO:{
"^":"A;v:height},A:width}",
$isav:1,
$ise:1,
$isL:1,
"%":"HTMLInputElement"},
eR:{
"^":"A;ag:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
bv:{
"^":"cX;",
gH:function(a){var z,y
if(!!a.offsetX)return H.d(new P.G(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.d6(a.target)).$isav)throw H.f(new P.K("offsetX is only supported on elements"))
z=W.d6(a.target)
y=H.d(new P.G(a.clientX,a.clientY),[null]).aB(0,J.dW(J.dY(z)))
return H.d(new P.G(J.c3(y.a),J.c3(y.b)),[null])}},
$isbv:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
j1:{
"^":"e;",
$ise:1,
"%":"Navigator"},
aV:{
"^":"L;",
i:function(a){var z=a.nodeValue
return z==null?this.cG(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
j4:{
"^":"A;v:height},A:width}",
"%":"HTMLObjectElement"},
j8:{
"^":"A;j:length=",
"%":"HTMLSelectElement"},
j9:{
"^":"bm;ag:error=",
"%":"SpeechRecognitionError"},
bC:{
"^":"e;",
$isa:1,
"%":"Touch"},
bD:{
"^":"cX;dz:changedTouches=",
$isbD:1,
$isa:1,
"%":"TouchEvent"},
je:{
"^":"es;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.bo(b,a,null,null,null))
return a[b]},
u:function(a,b,c){throw H.f(new P.K("Cannot assign element of immutable List."))},
T:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bC]},
$isp:1,
$isaQ:1,
$isaO:1,
"%":"TouchList"},
er:{
"^":"e+br;",
$isj:1,
$asj:function(){return[W.bC]},
$isp:1},
es:{
"^":"er+eo;",
$isj:1,
$asj:function(){return[W.bC]},
$isp:1},
cX:{
"^":"bm;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
jg:{
"^":"eR;v:height},A:width}",
"%":"HTMLVideoElement"},
jj:{
"^":"L;",
$ise:1,
$isL:1,
"%":"DOMWindow|Window"},
jn:{
"^":"e;aY:bottom=,v:height=,L:left=,b8:right=,aa:top=,A:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isU)return!1
y=a.left
x=z.gL(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaa(b)
if(y==null?x==null:y===x){y=a.width
x=z.gA(b)
if(y==null?x==null:y===x){y=a.height
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w
z=J.z(a.left)
y=J.z(a.top)
x=J.z(a.width)
w=J.z(a.height)
return W.d2(W.a2(W.a2(W.a2(W.a2(0,z),y),x),w))},
gbd:function(a){return H.d(new P.G(a.left,a.top),[null])},
$isU:1,
$asU:I.b8,
"%":"ClientRect"},
jo:{
"^":"aV;",
$ise:1,
"%":"DocumentType"},
jp:{
"^":"eg;",
gv:function(a){return a.height},
gA:function(a){return a.width},
"%":"DOMRect"},
js:{
"^":"A;",
$isL:1,
$ise:1,
"%":"HTMLFrameSetElement"},
fV:{
"^":"a_;",
Z:function(a,b,c,d){var z=new W.C(0,this.a,this.b,W.E(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.D()
return z},
bY:function(a,b,c){return this.Z(a,null,b,c)}},
r:{
"^":"fV;a,b,c"},
C:{
"^":"f3;a,b,c,d,e",
aZ:function(){if(this.b==null)return
this.bM()
this.b=null
this.d=null
return},
b5:function(a,b){if(this.b==null)return;++this.a
this.bM()},
ak:function(a){return this.b5(a,null)},
ca:function(){if(this.b==null||this.a<=0)return;--this.a
this.D()},
D:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dy(x,this.c,z,this.e)}},
bM:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dz(x,this.c,z,this.e)}}},
eo:{
"^":"a;",
gF:function(a){return new W.el(a,this.gj(a),-1,null)},
$isj:1,
$asj:null,
$isp:1},
el:{
"^":"a;a,b,c,d",
n:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bV(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gt:function(){return this.d}},
fO:{
"^":"a;a",
$isL:1,
$ise:1,
static:{fP:function(a){if(a===window)return a
else return new W.fO(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ic:{
"^":"aw;",
$ise:1,
"%":"SVGAElement"},
id:{
"^":"fd;",
$ise:1,
"%":"SVGAltGlyphElement"},
ig:{
"^":"n;",
$ise:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
is:{
"^":"n;",
$ise:1,
"%":"SVGFEBlendElement"},
it:{
"^":"n;",
$ise:1,
"%":"SVGFEColorMatrixElement"},
iu:{
"^":"n;",
$ise:1,
"%":"SVGFEComponentTransferElement"},
iv:{
"^":"n;",
$ise:1,
"%":"SVGFECompositeElement"},
iw:{
"^":"n;",
$ise:1,
"%":"SVGFEConvolveMatrixElement"},
ix:{
"^":"n;",
$ise:1,
"%":"SVGFEDiffuseLightingElement"},
iy:{
"^":"n;",
$ise:1,
"%":"SVGFEDisplacementMapElement"},
iz:{
"^":"n;",
$ise:1,
"%":"SVGFEFloodElement"},
iA:{
"^":"n;",
$ise:1,
"%":"SVGFEGaussianBlurElement"},
iB:{
"^":"n;",
$ise:1,
"%":"SVGFEImageElement"},
iC:{
"^":"n;",
$ise:1,
"%":"SVGFEMergeElement"},
iD:{
"^":"n;",
$ise:1,
"%":"SVGFEMorphologyElement"},
iE:{
"^":"n;",
$ise:1,
"%":"SVGFEOffsetElement"},
iF:{
"^":"n;",
$ise:1,
"%":"SVGFESpecularLightingElement"},
iG:{
"^":"n;",
$ise:1,
"%":"SVGFETileElement"},
iH:{
"^":"n;",
$ise:1,
"%":"SVGFETurbulenceElement"},
iI:{
"^":"n;",
$ise:1,
"%":"SVGFilterElement"},
aw:{
"^":"n;",
$ise:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
iN:{
"^":"aw;",
$ise:1,
"%":"SVGImageElement"},
iR:{
"^":"n;",
$ise:1,
"%":"SVGMarkerElement"},
iS:{
"^":"n;",
$ise:1,
"%":"SVGMaskElement"},
j5:{
"^":"n;",
$ise:1,
"%":"SVGPatternElement"},
j7:{
"^":"n;",
$ise:1,
"%":"SVGScriptElement"},
n:{
"^":"av;",
gc_:function(a){return H.d(new W.r(a,"mousedown",!1),[null])},
gc0:function(a){return H.d(new W.r(a,"mouseenter",!1),[null])},
gc1:function(a){return H.d(new W.r(a,"mouseleave",!1),[null])},
gc2:function(a){return H.d(new W.r(a,"mousemove",!1),[null])},
gc3:function(a){return H.d(new W.r(a,"mouseout",!1),[null])},
gc4:function(a){return H.d(new W.r(a,"mouseover",!1),[null])},
gc5:function(a){return H.d(new W.r(a,"mouseup",!1),[null])},
$isL:1,
$ise:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jb:{
"^":"aw;",
$ise:1,
"%":"SVGSVGElement"},
jc:{
"^":"n;",
$ise:1,
"%":"SVGSymbolElement"},
cH:{
"^":"aw;",
"%":";SVGTextContentElement"},
jd:{
"^":"cH;",
$ise:1,
"%":"SVGTextPathElement"},
fd:{
"^":"cH;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jf:{
"^":"aw;",
$ise:1,
"%":"SVGUseElement"},
jh:{
"^":"n;",
$ise:1,
"%":"SVGViewElement"},
jr:{
"^":"n;",
$ise:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jt:{
"^":"n;",
$ise:1,
"%":"SVGCursorElement"},
ju:{
"^":"n;",
$ise:1,
"%":"SVGFEDropShadowElement"},
jv:{
"^":"n;",
$ise:1,
"%":"SVGGlyphRefElement"},
jw:{
"^":"n;",
$ise:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
j6:{
"^":"e;",
dq:function(a,b,c){return a.bindBuffer(b,c)},
dr:function(a,b,c){return a.bindTexture(b,c)},
dt:function(a,b){return a.blendEquation(b)},
du:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dv:function(a,b,c,d){return a.bufferData(b,c,d)},
dA:function(a,b){return a.clear(b)},
dB:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dC:function(a,b){return a.clearDepth(b)},
dD:function(a,b){return a.clearStencil(b)},
dF:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dJ:function(a){return a.createBuffer()},
dK:function(a){return a.createProgram()},
dL:function(a,b){return a.createShader(b)},
dM:function(a,b){return a.depthFunc(b)},
dN:function(a,b){return a.depthMask(b)},
dU:function(a,b){return a.disableVertexAttribArray(b)},
dV:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
dW:function(a,b){return a.enable(b)},
dX:function(a,b){return a.enableVertexAttribArray(b)},
ck:function(a,b,c){return a.getAttribLocation(b,c)},
cp:function(a,b){return a.getParameter(b)},
cq:function(a,b,c){return a.getUniformLocation(b,c)},
cC:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cD:function(a,b,c,d){return a.stencilOp(b,c,d)},
eq:function(a,b){return a.useProgram(b)},
er:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ik:{
"^":"a;"}}],["","",,P,{
"^":"",
al:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d3:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
G:{
"^":"a;B:a>,E:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
l:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.G))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gp:function(a){var z,y
z=J.z(this.a)
y=J.z(this.b)
return P.d3(P.al(P.al(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gB(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gE(b)
if(typeof z!=="number")return z.k()
y=new P.G(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aB:function(a,b){var z,y,x,w
z=this.a
y=J.dX(b)
if(typeof z!=="number")return z.aB()
if(typeof y!=="number")return H.R(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aB()
if(typeof w!=="number")return H.R(w)
w=new P.G(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hn:{
"^":"a;",
gb8:function(a){return this.gL(this)+this.c},
gaY:function(a){return this.gaa(this)+this.d},
i:function(a){return"Rectangle ("+this.gL(this)+", "+this.b+") "+this.c+" x "+this.d},
l:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isU)return!1
if(this.gL(this)===z.gL(b)){y=this.b
z=y===z.gaa(b)&&this.a+this.c===z.gb8(b)&&y+this.d===z.gaY(b)}else z=!1
return z},
gp:function(a){var z=this.b
return P.d3(P.al(P.al(P.al(P.al(0,this.gL(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbd:function(a){var z=new P.G(this.gL(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
U:{
"^":"hn;L:a>,aa:b>,A:c>,v:d>",
$asU:null,
static:{eW:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.d(new P.U(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
m:function(a){return a},
b5:function(a){return a},
co:{
"^":"e;",
$isco:1,
"%":"ArrayBuffer"},
by:{
"^":"e;",
$isby:1,
"%":"DataView;ArrayBufferView;bw|cp|cr|bx|cq|cs|X"},
bw:{
"^":"by;",
gj:function(a){return a.length},
$isaQ:1,
$isaO:1},
bx:{
"^":"cr;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
return a[b]},
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
a[b]=c}},
cp:{
"^":"bw+br;",
$isj:1,
$asj:function(){return[P.be]},
$isp:1},
cr:{
"^":"cp+cd;"},
X:{
"^":"cs;",
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.o]},
$isp:1},
cq:{
"^":"bw+br;",
$isj:1,
$asj:function(){return[P.o]},
$isp:1},
cs:{
"^":"cq+cd;"},
iT:{
"^":"bx;",
$isj:1,
$asj:function(){return[P.be]},
$isp:1,
"%":"Float32Array"},
iU:{
"^":"bx;",
$isj:1,
$asj:function(){return[P.be]},
$isp:1,
"%":"Float64Array"},
iV:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Int16Array"},
iW:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Int32Array"},
iX:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Int8Array"},
iY:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Uint16Array"},
iZ:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Uint32Array"},
j_:{
"^":"X;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
j0:{
"^":"X;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dr:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
hP:function(a){var z={}
a.G(0,new P.hQ(z))
return z},
hQ:{
"^":"c:18;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
jA:[function(){var z,y,x,w,v
z=new G.fk(700,500,P.aS(),P.aS())
y=new E.O(new Float64Array(H.m(16)))
y.R()
x=new F.fl(400,300,1,1,1,0,0,null,!0,"none",null,y,!1)
x.b=[]
x.ch=F.aj(255,238,238,255)
y=new E.O(new Float64Array(H.m(16)))
y.R()
w=new G.fs(null,0,0,!1,0,z,!1,!1,!1,0,null,!1,!1,[y])
w.a=G.fr(400,600)
w.sel(x)
w.eg()
w.ep()
w.x=!0
if(!w.d){w.d=!0
w.ao()}y=new E.O(new Float64Array(H.m(16)))
y.R()
v=new D.eU(z,null,"none",null,y,!1)
v.b=[]
x.at(v)},"$0","dp",0,0,1]},1],["","",,F,{
"^":"",
cj:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.af)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.aU(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fi:{
"^":"a;"},
cK:{
"^":"a;",
at:function(a){var z=0,y=new P.c8(),x=1,w,v=this,u,t,s,r
function $async$at(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.d(new s.D(0,r.k,null),[null])
t=u
t.aG(null)
z=2
return H.a3(u,$async$at,y)
case 2:t=v
t=t.b
t.push(a)
return H.a3(null,0,y,null)
case 1:return H.a3(w,1,y)}}return H.a3(null,$async$at,y,null)},
bV:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.af)(z),++x)z[x].bV(a)},
c6:function(a,b){},
ce:function(a,b){var z,y,x
this.b0()
this.c6(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.af)(z),++x)z[x].ce(a,b)},
b3:function(a,b){},
b4:["cH",function(a,b){var z,y,x,w,v,u
this.b0()
this.b3(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.af)(z),++w){v=z[w]
u=v.c
x.push(C.b.ga5(x).q(0,u))
b.ay()
v.b4(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.ay()}}],
eo:["cI",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b0()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.c8(v.c)
u=v.eo(a,b,c,d,e)
a.c7()
if(u)return!0}t=a.co().b_(0)
t.ea()
y=new E.q(new Float64Array(H.m(3)))
y.C(d,e,0)
s=t.q(0,y)
s.gB(s)
s.gE(s)
return!1}],
b0:function(){if(!this.d)this.d=!0}},
fj:{
"^":"a;"},
M:{
"^":"a;a,b,c,d",
l:function(a,b){if(b==null)return!1
return b instanceof F.M&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gp:function(a){return F.cj([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+this.a+", y:"+this.b+", w:"+this.c+", h:"+this.d}},
fn:{
"^":"a;a",
i:function(a){return C.x.h(0,this.a)}},
fm:{
"^":"a;a,b,c",
cP:function(a){if(this.a==null)this.a=F.aj(255,255,255,255)},
static:{b_:function(a){var z=new F.fm(a,C.j,1)
z.cP(a)
return z}}},
cJ:{
"^":"a;a",
l:function(a,b){if(b==null)return!1
return b instanceof F.cJ&&b.a===this.a},
gp:function(a){return F.cj([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
cO:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{aj:function(a,b,c,d){var z=new F.cJ(0)
z.cO(a,b,c,d)
return z}}},
fl:{
"^":"cK;e,f,r,x,y,z,Q,ch,cx,a,b,c,d",
c6:function(a,b){var z,y,x,w
z=this.e
y=(a.gbe()-0)/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.O(new Float64Array(H.m(16)))
y.R()
this.c=y
y.cf(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bh(0,z,z,1)},
b4:function(a,b){var z,y
z=new F.M(0,0,this.e,this.f)
y=this.cx
if(y){b.b.push(z)
b.a3(a,z)}this.cH(a,b)
if(y){y=b.b
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.a3(a,C.b.ga5(y))
else{y=a.a
b.a3(a,new F.M(0,0,y.c,y.d))}}},
b3:function(a,b){var z=F.b_(null)
z.a=this.ch
b.a4(a,new F.M(0,0,this.e,this.f),z)}},
b0:{
"^":"a;a",
i:function(a){return C.y.h(0,this.a)}},
fo:{
"^":"a;",
sel:function(a){this.c$=a},
ec:function(a){if(!this.e$){this.c$.bV(this)
this.e$=!0}this.c$.ce(this,a)
this.ef()},
ed:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.ga5(y).q(0,z))
b.ay()
this.c$.b4(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
b.ay()},
U:function(a,b,c,d,e){a.c8(this.c$.c)
this.c$.cI(a,b,c,d,e)
a.c7()},
c8:function(a){var z=this.f$
z.push(C.b.ga5(z).q(0,a))},
c7:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
co:function(){return C.b.ga5(this.f$)}}}],["","",,G,{
"^":"",
cL:function(a,b,c){var z,y
z=J.dJ(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.f(y+"\n")}return z},
fq:{
"^":"a;a,b,c,d",
cQ:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a8(b)
y=C.d.a8(a)
x=document.createElement("canvas",null)
J.e2(x,z)
J.e1(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.dZ(this.b,!0)},
static:{fr:function(a,b){var z=new G.fq(null,null,null,null)
z.cQ(a,b)
return z}}},
fk:{
"^":"fj;c,d,a,b"},
fp:{
"^":"fi;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
e5:function(){var z,y,x,w,v,u
P.aH("#[A]# "+H.b(J.c0(this.d,35660)))
P.aH("#[B]# "+H.b(J.c0(this.d,33901)))
z=C.b.bW(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.bW(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.cL(x,35633,z)
v=G.cL(x,35632,y)
u=J.dI(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
P:function(a){this.r=1
this.ch=-0.5
J.bZ(this.d,2960)
J.dK(this.d,515)
J.dF(this.d,0,0,0,1)
J.dG(this.d,1)
J.bW(this.d,0)
J.bZ(this.d,3042)
switch(-1){case-1:J.dB(this.d,32774)
J.dC(this.d,770,771,770,32772)
break}J.dE(this.d,17664)
C.b.sj(this.x,0)
C.b.sj(this.y,0)
C.b.sj(this.z,0)
this.Q=null},
av:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.x
if(z.length!==0){y=this.y
F.aj(170,255,170,170)
J.c4(this.d,this.f)
x=J.aJ(this.d,this.f,"a_tex")
w=J.bg(this.d)
J.bf(this.d,34962,w)
v=this.z
J.dD(this.d,34962,new Float32Array(H.b5(v)),35044)
J.aI(this.d,x)
J.aK(this.d,x,2,5126,!1,0,0)
u=this.d
t=J.bg(u)
u.bindBuffer(34962,t)
u.bufferData(34962,new Float32Array(H.b5(z)),35044)
u.bindBuffer(34962,null)
J.bf(this.d,34962,t)
u=this.d
t=J.bg(u)
u.bindBuffer(34963,t)
u.bufferData(34963,new Uint16Array(H.b5(y)),35044)
u.bindBuffer(34963,null)
J.bf(this.d,34963,t)
u=this.d
u.uniformMatrix4fv(J.e_(u,this.f,"u_mat"),!1,new Float32Array(H.b5(this.cx.a)))
s=J.aJ(this.d,this.f,"color")
r=J.aJ(this.d,this.f,"vp")
q=J.aJ(this.d,this.f,"useTex")
J.aK(this.d,r,3,5126,!1,32,0)
J.aK(this.d,s,4,5126,!1,32,12)
J.aK(this.d,q,1,5126,!1,32,28)
J.aI(this.d,r)
J.aI(this.d,s)
J.aI(this.d,q)
J.dM(this.d,4,y.length,5123,0)
if(x!==0){J.dL(this.d,x)
J.dA(this.d,3553,null)}J.c4(this.d,null)
C.b.sj(z,0)
C.b.sj(y,0)
C.b.sj(v,0)
this.Q=null}},
a4:function(a,b,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=b.a
y=b.b
x=b.c
w=b.d
if(a0.b===C.j){v=this.bO()
u=z+x
t=y+w
x=new E.q(new Float64Array(H.m(3)))
x.C(z,y,0)
s=v.q(0,x)
x=new E.q(new Float64Array(H.m(3)))
x.C(z,t,0)
r=v.q(0,x)
x=new E.q(new Float64Array(H.m(3)))
x.C(u,y,0)
q=v.q(0,x)
x=new E.q(new Float64Array(H.m(3)))
x.C(u,t,0)
p=v.q(0,x)
x=a0.a.a
this.ad(a,s,r,q,p,(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255)}else{v=this.bO()
o=a0.c
n=o/2
m=z+n
l=y+n
u=z+x-n
t=y+w-n
n=new E.q(new Float64Array(H.m(3)))
n.C(m,l,0)
s=v.q(0,n)
n=m-o
w=l-o
x=new E.q(new Float64Array(H.m(3)))
x.C(n,w,0)
k=v.q(0,x)
x=new E.q(new Float64Array(H.m(3)))
x.C(m,t,0)
r=v.q(0,x)
x=t+o
j=new E.q(new Float64Array(H.m(3)))
j.C(n,x,0)
i=v.q(0,j)
j=new E.q(new Float64Array(H.m(3)))
j.C(u,l,0)
q=v.q(0,j)
o=u+o
j=new E.q(new Float64Array(H.m(3)))
j.C(o,w,0)
h=v.q(0,j)
j=new E.q(new Float64Array(H.m(3)))
j.C(u,t,0)
p=v.q(0,j)
j=new E.q(new Float64Array(H.m(3)))
j.C(o,x,0)
g=v.q(0,j)
j=a0.a.a
f=(j>>>16&255)/255
e=(j>>>8&255)/255
d=(j>>>0&255)/255
c=(j>>>24&255)/255
this.ad(a,k,i,s,r,f,e,d,c)
this.ad(a,i,g,r,p,f,e,d,c)
this.ad(a,g,h,p,q,f,e,d,c)
this.ad(a,h,k,q,s,f,e,d,c)}},
ad:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.x
y=z.length/8|0
C.b.aW(z,[b.gB(b),b.gE(b),this.ch,f,g,h,i,-1,c.gB(c),c.gE(c),this.ch,f,g,h,i,-1,d.gB(d),d.gE(d),this.ch,f,g,h,i,-1,e.gB(e),e.gE(e),this.ch,f,g,h,i,-1])
C.b.aW(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.b.aW(this.y,[y,z,x,z,y+3,x])},
a3:function(a,b){var z
this.av(0)
J.bX(this.d,!1,!1,!1,!1)
J.bY(this.d,!1)
J.c2(this.d,7680,7681,7681)
J.c1(this.d,519,this.r,255)
z=F.b_(null)
z.a=F.aj(255,255,255,255)
this.a4(null,b,z)
this.av(0)
J.bX(this.d,!0,!0,!0,!0)
J.bY(this.d,!0)
J.c2(this.d,7680,7680,7680)
J.c1(this.d,515,this.r,255);++this.r},
ay:function(){},
bO:function(){var z,y
this.cy.R()
z=this.cy.cf(0,-1,1,0)
this.cy=z
y=this.e
y=z.bh(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.q(0,C.b.ga5(this.a))
this.cy=y
return y}},
fs:{
"^":"eS;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gbe:function(){return this.a.c},
ef:function(){this.r=!0},
ao:function(){var z=0,y=new P.c8(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
function $async$ao(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cv(new h.c9(Date.now(),!1))
i=v
t=i.a
i=E
i=i
h=Float64Array
g=H
s=new i.O(new h(g.m(16)))
i=s
i.R()
i=E
i=i
h=Float64Array
g=H
r=new i.O(new h(g.m(16)))
i=r
i.R()
i=E
i=i
h=Float64Array
g=H
q=new i.O(new h(g.m(16)))
i=q
i.R()
i=G
p=new i.fp(10,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.e5()
i=p
i.P(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return H.a3(i.em(new h.au(15e3),null,null),$async$ao,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.ec(h.a8(u+k))
o+=k
n+=k
if(k<0);else ;++m
i=v
i.r=!0
z=n>40?6:7
break
case 6:i=p
i.P(0)
i=v
i.ed(v,p)
i=p
i.av(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.cL(o,m)
i=H
i.dr(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return H.a3(null,0,y,null)
case 1:return H.a3(w,1,y)}}return H.a3(null,$async$ao,y,null)},
ep:function(){var z,y,x,w
z=P.aS()
y=new G.fB(this,z)
x=new G.fA(this,z)
w=this.a.b
w.toString
w=H.d(new W.r(w,"touchcancel",!1),[null])
H.d(new W.C(0,w.a,w.b,W.E(x),w.c),[H.t(w,0)]).D()
w=this.a.b
w.toString
w=H.d(new W.r(w,"touchend",!1),[null])
H.d(new W.C(0,w.a,w.b,W.E(x),w.c),[H.t(w,0)]).D()
w=this.a.b
w.toString
w=H.d(new W.r(w,"touchenter",!1),[null])
H.d(new W.C(0,w.a,w.b,W.E(y),w.c),[H.t(w,0)]).D()
w=this.a.b
w.toString
w=H.d(new W.r(w,"touchleave",!1),[null])
H.d(new W.C(0,w.a,w.b,W.E(y),w.c),[H.t(w,0)]).D()
w=this.a.b
w.toString
w=H.d(new W.r(w,"touchmove",!1),[null])
H.d(new W.C(0,w.a,w.b,W.E(y),w.c),[H.t(w,0)]).D()
w=this.a.b
w.toString
w=H.d(new W.r(w,"touchstart",!1),[null])
H.d(new W.C(0,w.a,w.b,W.E(y),w.c),[H.t(w,0)]).D()},
eg:function(){var z,y
z={}
z.a=!1
y=J.dP(this.a.b)
H.d(new W.C(0,y.a,y.b,W.E(new G.ft(z,this)),y.c),[H.t(y,0)]).D()
y=J.dV(this.a.b)
H.d(new W.C(0,y.a,y.b,W.E(new G.fu(z,this)),y.c),[H.t(y,0)]).D()
y=J.dQ(this.a.b)
H.d(new W.C(0,y.a,y.b,W.E(new G.fv(z,this)),y.c),[H.t(y,0)]).D()
y=J.dR(this.a.b)
H.d(new W.C(0,y.a,y.b,W.E(new G.fw(z,this)),y.c),[H.t(y,0)]).D()
y=J.dS(this.a.b)
H.d(new W.C(0,y.a,y.b,W.E(new G.fx(z,this)),y.c),[H.t(y,0)]).D()
y=J.dT(this.a.b)
H.d(new W.C(0,y.a,y.b,W.E(new G.fy(z,this)),y.c),[H.t(y,0)]).D()
y=J.dU(this.a.b)
H.d(new W.C(0,y.a,y.b,W.E(new G.fz(z,this)),y.c),[H.t(y,0)]).D()}},
eS:{
"^":"a+fo;"},
fB:{
"^":"c:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c_(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.af)(y),++v){u=y[v]
t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.G(t,s).$builtinTypeInfo=[null]
r=t-C.a.w(z.a.b.offsetLeft)
t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.G(t,s).$builtinTypeInfo=[null]
q=s-C.a.w(z.a.b.offsetTop)
t=w.au(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.k()
z.U(z,s+1,C.n,r,q)}else{w.u(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.k()
z.U(z,t+1,C.m,r,q)}}}},
fA:{
"^":"c:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c_(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.af)(y),++v){u=y[v]
if(w.au(u.identifier)){t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.G(t,s).$builtinTypeInfo=[null]
s=C.a.w(z.a.b.offsetLeft)
r=C.a.w(u.pageX)
q=C.a.w(u.pageY)
new P.G(r,q).$builtinTypeInfo=[null]
r=C.a.w(z.a.b.offsetTop)
w.a7(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.k()
z.U(z,p+1,C.l,t-s,q-r)}}}},
ft:{
"^":"c:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gH(a)
x=x.gB(x)
x.toString
y=y.gH(a)
y=y.gE(y)
y.toString
z.U(z,0,C.m,x,y)}}},
fu:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gB(w)
w.toString
x=x.gH(a)
x=x.gE(x)
x.toString
z.U(z,0,C.l,w,x)
y.a=!1}}}},
fv:{
"^":"c:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fw:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gB(w)
w.toString
x=x.gH(a)
x=x.gE(x)
x.toString
z.U(z,0,C.k,w,x)
y.a=!1}}}},
fx:{
"^":"c:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gH(a)
x=x.gB(x)
x.toString
y=y.gH(a)
y=y.gE(y)
y.toString
z.U(z,0,C.n,x,y)}}},
fy:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gB(w)
w.toString
x=x.gH(a)
x=x.gE(x)
x.toString
z.U(z,0,C.k,w,x)
y.a=!1}}}},
fz:{
"^":"c:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}}}],["","",,E,{
"^":"",
O:{
"^":"a;a",
ab:function(a){var z,y
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
i:function(a){return"[0] "+this.an(0).i(0)+"\n[1] "+this.an(1).i(0)+"\n[2] "+this.an(2).i(0)+"\n[3] "+this.an(3).i(0)+"\n"},
gdT:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
an:function(a){var z,y,x
z=new Float64Array(H.m(4))
y=this.a
if(a>=16)return H.h(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.h(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.h(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.h(y,x)
z[3]=y[x]
return new E.a0(z)},
b_:function(a){var z=new E.O(new Float64Array(H.m(16)))
z.ab(this)
return z},
q:function(a,b){var z,y,x
if(!!b.$isa0){z=new Float64Array(H.m(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a0(z)}if(!!b.$isq){z=new Float64Array(H.m(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.q(z)}if(4===b.gdT()){z=new Float64Array(H.m(16))
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
return new E.O(z)}throw H.f(P.bi(b))},
k:function(a,b){var z,y
z=new Float64Array(H.m(16))
y=this.a
z[0]=C.a.k(y[0],b.gm().h(0,0))
z[1]=C.a.k(y[1],b.gm().h(0,1))
z[2]=C.a.k(y[2],b.gm().h(0,2))
z[3]=C.a.k(y[3],b.gm().h(0,3))
z[4]=C.a.k(y[4],b.gm().h(0,4))
z[5]=C.a.k(y[5],b.gm().h(0,5))
z[6]=C.a.k(y[6],b.gm().h(0,6))
z[7]=C.a.k(y[7],b.gm().h(0,7))
z[8]=C.a.k(y[8],b.gm().h(0,8))
z[9]=C.a.k(y[9],b.gm().h(0,9))
z[10]=C.a.k(y[10],b.gm().h(0,10))
z[11]=C.a.k(y[11],b.gm().h(0,11))
z[12]=C.a.k(y[12],b.gm().h(0,12))
z[13]=C.a.k(y[13],b.gm().h(0,13))
z[14]=C.a.k(y[14],b.gm().h(0,14))
z[15]=C.a.k(y[15],b.gm().h(0,15))
return new E.O(z)},
cf:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isa0
x=y?b.gbe():1
if(!!z.$isq||y){w=z.gB(b)
v=z.gE(b)
u=z.ges(b)}else{u=d
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
bh:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isa0
x=y?b.gbe():1
if(!!z.$isq||y){w=z.gB(b)
v=z.gE(b)
u=z.ges(b)}else{u=d
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
R:function(){var z=this.a
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
ea:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
q:{
"^":"a;a",
C:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ab:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
k:function(a,b){var z,y,x,w
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
z=C.a.k(z[2],b.gm().h(0,2))
w=new E.q(new Float64Array(H.m(3)))
w.C(y,x,z)
return w},
q:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.R(b)
x=z[1]
z=z[2]
w=new E.q(new Float64Array(H.m(3)))
w.C(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dh(y*y+x*x+z*z))},
b_:function(a){var z=new E.q(new Float64Array(H.m(3)))
z.ab(this)
return z},
gB:function(a){return this.a[0]},
gE:function(a){return this.a[1]}},
a0:{
"^":"a;a",
bj:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ab:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
k:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
w=C.a.k(z[2],b.gm().h(0,2))
z=C.a.k(z[3],b.gm().h(0,3))
v=new E.a0(new Float64Array(H.m(4)))
v.bj(y,x,w,z)
return v},
q:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.R(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a0(new Float64Array(H.m(4)))
v.bj(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dh(y*y+x*x+w*w+z*z))},
b_:function(a){var z=new E.a0(new Float64Array(H.m(4)))
z.ab(this)
return z},
gB:function(a){return this.a[0]},
gE:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ch.prototype
return J.eF.prototype}if(typeof a=="string")return J.aP.prototype
if(a==null)return J.eG.prototype
if(typeof a=="boolean")return J.eE.prototype
if(a.constructor==Array)return J.ax.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b9(a)}
J.Q=function(a){if(typeof a=="string")return J.aP.prototype
if(a==null)return a
if(a.constructor==Array)return J.ax.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b9(a)}
J.aF=function(a){if(a==null)return a
if(a.constructor==Array)return J.ax.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b9(a)}
J.dk=function(a){if(typeof a=="number")return J.ay.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bE.prototype
return a}
J.hR=function(a){if(typeof a=="number")return J.ay.prototype
if(typeof a=="string")return J.aP.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bE.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b9(a)}
J.aq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.hR(a).k(a,b)}
J.a4=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).l(a,b)}
J.dx=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dk(a).az(a,b)}
J.bV=function(a,b){if(a.constructor==Array||typeof a=="string"||H.i4(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.Q(a).h(a,b)}
J.dy=function(a,b,c,d){return J.i(a).cU(a,b,c,d)}
J.dz=function(a,b,c,d){return J.i(a).di(a,b,c,d)}
J.bf=function(a,b,c){return J.i(a).dq(a,b,c)}
J.dA=function(a,b,c){return J.i(a).dr(a,b,c)}
J.dB=function(a,b){return J.i(a).dt(a,b)}
J.dC=function(a,b,c,d,e){return J.i(a).du(a,b,c,d,e)}
J.dD=function(a,b,c,d){return J.i(a).dv(a,b,c,d)}
J.dE=function(a,b){return J.aF(a).dA(a,b)}
J.dF=function(a,b,c,d,e){return J.i(a).dB(a,b,c,d,e)}
J.dG=function(a,b){return J.i(a).dC(a,b)}
J.bW=function(a,b){return J.i(a).dD(a,b)}
J.bX=function(a,b,c,d,e){return J.i(a).dF(a,b,c,d,e)}
J.dH=function(a,b){return J.i(a).bS(a,b)}
J.bg=function(a){return J.i(a).dJ(a)}
J.dI=function(a){return J.i(a).dK(a)}
J.dJ=function(a,b){return J.i(a).dL(a,b)}
J.dK=function(a,b){return J.i(a).dM(a,b)}
J.bY=function(a,b){return J.i(a).dN(a,b)}
J.dL=function(a,b){return J.i(a).dU(a,b)}
J.dM=function(a,b,c,d,e){return J.i(a).dV(a,b,c,d,e)}
J.dN=function(a,b){return J.aF(a).T(a,b)}
J.bZ=function(a,b){return J.i(a).dW(a,b)}
J.aI=function(a,b){return J.i(a).dX(a,b)}
J.dO=function(a,b){return J.aF(a).G(a,b)}
J.c_=function(a){return J.i(a).gdz(a)}
J.S=function(a){return J.i(a).gag(a)}
J.z=function(a){return J.l(a).gp(a)}
J.bh=function(a){return J.aF(a).gF(a)}
J.ar=function(a){return J.Q(a).gj(a)}
J.dP=function(a){return J.i(a).gc_(a)}
J.dQ=function(a){return J.i(a).gc0(a)}
J.dR=function(a){return J.i(a).gc1(a)}
J.dS=function(a){return J.i(a).gc2(a)}
J.dT=function(a){return J.i(a).gc3(a)}
J.dU=function(a){return J.i(a).gc4(a)}
J.dV=function(a){return J.i(a).gc5(a)}
J.dW=function(a){return J.i(a).gbd(a)}
J.dX=function(a){return J.i(a).gB(a)}
J.aJ=function(a,b,c){return J.i(a).ck(a,b,c)}
J.dY=function(a){return J.i(a).cl(a)}
J.dZ=function(a,b){return J.i(a).cm(a,b)}
J.c0=function(a,b){return J.i(a).cp(a,b)}
J.e_=function(a,b,c){return J.i(a).cq(a,b,c)}
J.e0=function(a,b){return J.aF(a).a6(a,b)}
J.e1=function(a,b){return J.i(a).sv(a,b)}
J.e2=function(a,b){return J.i(a).sA(a,b)}
J.c1=function(a,b,c,d){return J.i(a).cC(a,b,c,d)}
J.c2=function(a,b,c,d){return J.i(a).cD(a,b,c,d)}
J.c3=function(a){return J.dk(a).a8(a)}
J.as=function(a){return J.l(a).i(a)}
J.c4=function(a,b){return J.i(a).eq(a,b)}
J.aK=function(a,b,c,d,e,f,g){return J.i(a).er(a,b,c,d,e,f,g)}
var $=I.p
C.b=J.ax.prototype
C.d=J.ch.prototype
C.a=J.ay.prototype
C.e=J.aP.prototype
C.z=J.eT.prototype
C.A=J.bE.prototype
C.o=new H.ca()
C.p=new P.fR()
C.c=new P.ho()
C.f=new P.au(0)
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
C.h=function getTagFallback(o) {
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
C.i=function(hooks) { return hooks; }

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
C.x=new H.ce([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.y=new H.ce([0,"TinyStagePointerType.CANCEL",1,"TinyStagePointerType.UP",2,"TinyStagePointerType.DOWN",3,"TinyStagePointerType.MOVE"])
C.j=new F.fn(0)
C.k=new F.b0(0)
C.l=new F.b0(1)
C.m=new F.b0(2)
C.n=new F.b0(3)
$.cw="$cachedFunction"
$.cx="$cachedInvocation"
$.N=0
$.ag=null
$.c5=null
$.bQ=null
$.dd=null
$.ds=null
$.b7=null
$.ba=null
$.bR=null
$.aa=null
$.am=null
$.an=null
$.bL=!1
$.k=C.c
$.cc=0
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
I.$lazy(y,x,w)}})(["cf","$get$cf",function(){return H.ez()},"cg","$get$cg",function(){return new P.ek(null)},"cM","$get$cM",function(){return H.P(H.b1({toString:function(){return"$receiver$"}}))},"cN","$get$cN",function(){return H.P(H.b1({$method$:null,toString:function(){return"$receiver$"}}))},"cO","$get$cO",function(){return H.P(H.b1(null))},"cP","$get$cP",function(){return H.P(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cT","$get$cT",function(){return H.P(H.b1(void 0))},"cU","$get$cU",function(){return H.P(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cR","$get$cR",function(){return H.P(H.cS(null))},"cQ","$get$cQ",function(){return H.P(function(){try{null.$method$}catch(z){return z.message}}())},"cW","$get$cW",function(){return H.P(H.cS(void 0))},"cV","$get$cV",function(){return H.P(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bG","$get$bG",function(){return P.fF()},"ao","$get$ao",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bv]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.Z]},{func:1,args:[,],opt:[,]},{func:1,ret:P.V,args:[P.o]},{func:1,args:[W.bD]},{func:1,args:[,P.V]},{func:1,args:[P.V]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.Z]},{func:1,ret:P.bN},{func:1,void:true,args:[P.a],opt:[P.Z]},{func:1,void:true,args:[,P.Z]},{func:1,args:[,,]},{func:1,args:[P.cF,,]},{func:1,args:[P.V,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.ia(d||a)
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
Isolate.b8=a.b8
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.du(F.dp(),b)},[])
else (function(b){H.du(F.dp(),b)})([])})})()