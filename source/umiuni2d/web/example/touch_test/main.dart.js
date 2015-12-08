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
b5.$isb=b4
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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
var d=supportsDirectProtoAccess&&b1!="b"
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bT"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bT"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bT(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bc=function(){}
var dart=[["","",,H,{
"^":"",
j2:{
"^":"b;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bf:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bd:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bW==null){H.i8()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.d7("Return interceptor for "+H.c(y(a,z))))}w=H.ii(a)
if(w==null){if(typeof a=="function")return C.w
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.y
else return C.A}return w},
f:{
"^":"b;",
n:function(a,b){return a===b},
gt:function(a){return H.a0(a)},
i:["cO",function(a){return H.b0(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
eZ:{
"^":"f;",
i:function(a){return String(a)},
gt:function(a){return a?519018:218159},
$isbS:1},
f0:{
"^":"f;",
n:function(a,b){return null==b},
i:function(a){return"null"},
gt:function(a){return 0}},
bs:{
"^":"f;",
gt:function(a){return 0},
i:["cP",function(a){return String(a)}],
$isf1:1},
fd:{
"^":"bs;"},
b4:{
"^":"bs;"},
aB:{
"^":"bs;",
i:function(a){var z=a[$.$get$cf()]
return z==null?this.cP(a):J.ah(z)}},
az:{
"^":"f;",
c1:function(a,b){if(!!a.immutable$list)throw H.d(new P.I(b))},
c0:function(a,b){if(!!a.fixed$length)throw H.d(new P.I(b))},
b0:function(a,b){var z,y
this.c0(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.a7)(b),++y)a.push(b[y])},
H:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.G(a))}},
a6:function(a,b){return H.a(new H.by(a,b),[null,null])},
c9:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.c(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
U:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
ge8:function(a){if(a.length>0)return a[0]
throw H.d(H.br())},
ga5:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.br())},
bu:function(a,b,c,d,e){var z,y,x
this.c1(a,"set range")
P.cK(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.y(P.al(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.eX())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aV(a,"[","]")},
gD:function(a){return new J.ek(a,a.length,0,null)},
gt:function(a){return H.a0(a)},
gj:function(a){return a.length},
sj:function(a,b){this.c0(a,"set length")
if(b<0)throw H.d(P.al(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.u(a,b))
if(b>=a.length||b<0)throw H.d(H.u(a,b))
return a[b]},
A:function(a,b,c){this.c1(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.u(a,b))
if(b>=a.length||b<0)throw H.d(H.u(a,b))
a[b]=c},
$isaW:1,
$isj:1,
$asj:null,
$isp:1},
j1:{
"^":"az;"},
ek:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.a7(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aA:{
"^":"f;",
bg:function(a,b){return a%b},
a7:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.I(""+a))},
F:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.I(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.d(H.a6(b))
return a+b},
m:function(a,b){if(typeof b!=="number")throw H.d(H.a6(b))
return a-b},
cU:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a7(a/b)},
ad:function(a,b){return(a|0)===a?a/b|0:this.a7(a/b)},
aY:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aF:function(a,b){if(typeof b!=="number")throw H.d(H.a6(b))
return a<b},
$isaN:1},
ct:{
"^":"aA;",
$isaN:1,
$isn:1},
f_:{
"^":"aA;",
$isaN:1},
aX:{
"^":"f;",
k:function(a,b){if(typeof b!=="string")throw H.d(P.ej(b,null,null))
return a+b},
cN:function(a,b,c){H.ds(b)
if(c==null)c=a.length
H.ds(c)
if(b<0)throw H.d(P.b1(b,null,null))
if(typeof c!=="number")return H.Q(c)
if(b>c)throw H.d(P.b1(b,null,null))
if(c>a.length)throw H.d(P.b1(c,null,null))
return a.substring(b,c)},
cM:function(a,b){return this.cN(a,b,null)},
dQ:function(a,b,c){if(c>a.length)throw H.d(P.al(c,0,a.length,null,null))
return H.io(a,b,c)},
gL:function(a){return a.length===0},
i:function(a){return a},
gt:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.u(a,b))
if(b>=a.length||b<0)throw H.d(H.u(a,b))
return a[b]},
$isaW:1,
$isP:1}}],["","",,H,{
"^":"",
aH:function(a,b){var z=a.ag(b)
if(!init.globalState.d.cy)init.globalState.f.ak()
return z},
dD:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.d(P.bl("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.hu(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cr()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.h9(P.bw(null,H.aG),0)
y.z=H.a(new H.Z(0,null,null,null,null,null,0),[P.n,H.bO])
y.ch=H.a(new H.Z(0,null,null,null,null,null,0),[P.n,null])
if(y.x===!0){x=new H.ht()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eQ,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hv)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.a(new H.Z(0,null,null,null,null,null,0),[P.n,H.b2])
w=P.ak(null,null,null,P.n)
v=new H.b2(0,null,!1)
u=new H.bO(y,x,w,init.createNewIsolate(),v,new H.ab(H.bg()),new H.ab(H.bg()),!1,!1,[],P.ak(null,null,null,null),null,null,!1,!0,P.ak(null,null,null,null))
w.a4(0,0)
u.bw(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aJ()
x=H.ag(y,[y]).Z(a)
if(x)u.ag(new H.il(z,a))
else{y=H.ag(y,[y,y]).Z(a)
if(y)u.ag(new H.im(z,a))
else u.ag(a)}init.globalState.f.ak()},
eU:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eV()
return},
eV:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.I("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.I("Cannot extract URI from \""+H.c(z)+"\""))},
eQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b5(!0,[]).a_(b.data)
y=J.L(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b5(!0,[]).a_(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b5(!0,[]).a_(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.a(new H.Z(0,null,null,null,null,null,0),[P.n,H.b2])
p=P.ak(null,null,null,P.n)
o=new H.b2(0,null,!1)
n=new H.bO(y,q,p,init.createNewIsolate(),o,new H.ab(H.bg()),new H.ab(H.bg()),!1,!1,[],P.ak(null,null,null,null),null,null,!1,!0,P.ak(null,null,null,null))
p.a4(0,0)
n.bw(0,o)
init.globalState.f.a.T(new H.aG(n,new H.eR(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ak()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").X(y.h(z,"msg"))
init.globalState.f.ak()
break
case"close":init.globalState.ch.a1(0,$.$get$cs().h(0,a))
a.terminate()
init.globalState.f.ak()
break
case"log":H.eP(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ac(["command","print","msg",z])
q=new H.ad(!0,P.ap(null,P.n)).J(q)
y.toString
self.postMessage(q)}else P.aO(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
eP:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ac(["command","log","msg",a])
x=new H.ad(!0,P.ap(null,P.n)).J(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.w(w)
throw H.d(P.aU(z))}},
eS:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cG=$.cG+("_"+y)
$.cH=$.cH+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.X(["spawned",new H.b7(y,x),w,z.r])
x=new H.eT(a,b,c,d,z)
if(e===!0){z.bY(w,w)
init.globalState.f.a.T(new H.aG(z,x,"start isolate"))}else x.$0()},
hP:function(a){return new H.b5(!0,[]).a_(new H.ad(!1,P.ap(null,P.n)).J(a))},
il:{
"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
im:{
"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hu:{
"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hv:function(a){var z=P.ac(["command","print","msg",a])
return new H.ad(!0,P.ap(null,P.n)).J(z)}}},
bO:{
"^":"b;a,b,c,el:d<,dR:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bY:function(a,b){if(!this.f.n(0,a))return
if(this.Q.a4(0,b)&&!this.y)this.y=!0
this.b_()},
ey:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a1(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.h(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.h(v,w)
v[w]=x
if(w===y.c)y.bG();++y.d}this.y=!1}this.b_()},
dA:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ex:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.y(new P.I("removeRange"))
P.cK(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cI:function(a,b){if(!this.r.n(0,a))return
this.db=b},
ec:function(a,b,c){var z=J.l(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){a.X(c)
return}z=this.cx
if(z==null){z=P.bw(null,null)
this.cx=z}z.T(new H.hp(a,c))},
ea:function(a,b){var z
if(!this.r.n(0,a))return
z=J.l(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.b9()
return}z=this.cx
if(z==null){z=P.bw(null,null)
this.cx=z}z.T(this.geo())},
ed:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aO(a)
if(b!=null)P.aO(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.ah(a)
y[1]=b==null?null:J.ah(b)
for(x=new P.cv(z,z.r,null,null),x.c=z.e;x.p();)x.d.X(y)},
ag:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.A(u)
w=t
v=H.w(u)
this.ed(w,v)
if(this.db===!0){this.b9()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gel()
if(this.cx!=null)for(;t=this.cx,!t.gL(t);)this.cx.cj().$0()}return y},
cd:function(a){return this.b.h(0,a)},
bw:function(a,b){var z=this.b
if(z.at(a))throw H.d(P.aU("Registry: ports must be registered only once."))
z.A(0,a,b)},
b_:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.A(0,this.a,this)
else this.b9()},
b9:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.P(0)
for(z=this.b,y=z.gbo(z),y=y.gD(y);y.p();)y.gw().d6()
z.P(0)
this.c.P(0)
init.globalState.z.a1(0,this.a)
this.dx.P(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.X(z[v])}this.ch=null}},"$0","geo",0,0,1]},
hp:{
"^":"e:1;a,b",
$0:function(){this.a.X(this.b)}},
h9:{
"^":"b;a,b",
dZ:function(){var z=this.a
if(z.b===z.c)return
return z.cj()},
cn:function(){var z,y,x
z=this.dZ()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.at(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gL(y)}else y=!1
else y=!1
else y=!1
if(y)H.y(P.aU("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gL(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ac(["command","close"])
x=new H.ad(!0,H.a(new P.de(0,null,null,null,null,null,0),[null,P.n])).J(x)
y.toString
self.postMessage(x)}return!1}z.ew()
return!0},
bS:function(){if(self.window!=null)new H.ha(this).$0()
else for(;this.cn(););},
ak:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bS()
else try{this.bS()}catch(x){w=H.A(x)
z=w
y=H.w(x)
w=init.globalState.Q
v=P.ac(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.ad(!0,P.ap(null,P.n)).J(v)
w.toString
self.postMessage(v)}}},
ha:{
"^":"e:1;a",
$0:function(){if(!this.a.cn())return
P.cR(C.f,this)}},
aG:{
"^":"b;a,b,c",
ew:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ag(this.b)}},
ht:{
"^":"b;"},
eR:{
"^":"e:0;a,b,c,d,e,f",
$0:function(){H.eS(this.a,this.b,this.c,this.d,this.e,this.f)}},
eT:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aJ()
w=H.ag(x,[x,x]).Z(y)
if(w)y.$2(this.b,this.c)
else{x=H.ag(x,[x]).Z(y)
if(x)y.$1(this.b)
else y.$0()}}z.b_()}},
d9:{
"^":"b;"},
b7:{
"^":"d9;b,a",
X:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbJ())return
x=H.hP(a)
if(z.gdR()===y){y=J.L(x)
switch(y.h(x,0)){case"pause":z.bY(y.h(x,1),y.h(x,2))
break
case"resume":z.ey(y.h(x,1))
break
case"add-ondone":z.dA(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.ex(y.h(x,1))
break
case"set-errors-fatal":z.cI(y.h(x,1),y.h(x,2))
break
case"ping":z.ec(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ea(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a4(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a1(0,y)
break}return}y=init.globalState.f
w="receive "+H.c(a)
y.a.T(new H.aG(z,new H.hx(this,x),w))},
n:function(a,b){if(b==null)return!1
return b instanceof H.b7&&J.R(this.b,b.b)},
gt:function(a){return this.b.gaU()}},
hx:{
"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbJ())z.d1(this.b)}},
bP:{
"^":"d9;b,c,a",
X:function(a){var z,y,x
z=P.ac(["command","message","port",this,"msg",a])
y=new H.ad(!0,P.ap(null,P.n)).J(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.bP&&J.R(this.b,b.b)&&J.R(this.a,b.a)&&J.R(this.c,b.c)},
gt:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cJ()
y=this.a
if(typeof y!=="number")return y.cJ()
x=this.c
if(typeof x!=="number")return H.Q(x)
return(z<<16^y<<8^x)>>>0}},
b2:{
"^":"b;aU:a<,b,bJ:c<",
d6:function(){this.c=!0
this.b=null},
d1:function(a){if(this.c)return
this.dg(a)},
dg:function(a){return this.b.$1(a)},
$isff:1},
fy:{
"^":"b;a,b,c",
cW:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.T(new H.aG(y,new H.fA(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.au(new H.fB(this,b),0),a)}else throw H.d(new P.I("Timer greater than 0."))},
static:{fz:function(a,b){var z=new H.fy(!0,!1,null)
z.cW(a,b)
return z}}},
fA:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fB:{
"^":"e:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ab:{
"^":"b;aU:a<",
gt:function(a){var z=this.a
if(typeof z!=="number")return z.eK()
z=C.a.aY(z,0)^C.a.ad(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ab){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ad:{
"^":"b;a,b",
J:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.A(0,a,z.gj(z))
z=J.l(a)
if(!!z.$iscz)return["buffer",a]
if(!!z.$isbC)return["typed",a]
if(!!z.$isaW)return this.cE(a)
if(!!z.$iseO){x=this.gcB()
w=a.gca()
w=H.aZ(w,x,H.M(w,"H",0),null)
w=P.bx(w,!0,H.M(w,"H",0))
z=z.gbo(a)
z=H.aZ(z,x,H.M(z,"H",0),null)
return["map",w,P.bx(z,!0,H.M(z,"H",0))]}if(!!z.$isf1)return this.cF(a)
if(!!z.$isf)this.cq(a)
if(!!z.$isff)this.al(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb7)return this.cG(a)
if(!!z.$isbP)return this.cH(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.al(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isab)return["capability",a.a]
if(!(a instanceof P.b))this.cq(a)
return["dart",init.classIdExtractor(a),this.cD(init.classFieldsExtractor(a))]},"$1","gcB",2,0,2],
al:function(a,b){throw H.d(new P.I(H.c(b==null?"Can't transmit:":b)+" "+H.c(a)))},
cq:function(a){return this.al(a,null)},
cE:function(a){var z=this.cC(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.al(a,"Can't serialize indexable: ")},
cC:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.J(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cD:function(a){var z
for(z=0;z<a.length;++z)C.b.A(a,z,this.J(a[z]))
return a},
cF:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.al(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.J(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cH:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cG:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaU()]
return["raw sendport",a]}},
b5:{
"^":"b;a,b",
a_:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.bl("Bad serialized message: "+H.c(a)))
switch(C.b.ge8(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=H.a(this.ae(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return H.a(this.ae(x),[null])
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ae(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.a(this.ae(x),[null])
y.fixed$length=Array
return y
case"map":return this.e1(a)
case"sendport":return this.e2(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.e0(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.ab(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ae(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.c(a))}},"$1","ge_",2,0,2],
ae:function(a){var z,y,x
z=J.L(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.Q(x)
if(!(y<x))break
z.A(a,y,this.a_(z.h(a,y)));++y}return a},
e1:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aC()
this.b.push(w)
y=J.eg(y,this.ge_()).bl(0)
for(z=J.L(y),v=J.L(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.A(0,y[u],this.a_(v.h(x,u)))}return w},
e2:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.R(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cd(w)
if(u==null)return
t=new H.b7(u,x)}else t=new H.bP(y,w,x)
this.b.push(t)
return t},
e0:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.L(y)
v=J.L(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.Q(t)
if(!(u<t))break
w[z.h(y,u)]=this.a_(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
er:function(){throw H.d(new P.I("Cannot modify unmodifiable Map"))},
i3:function(a){return init.types[a]},
ih:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaY},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ah(a)
if(typeof z!=="string")throw H.d(H.a6(a))
return z},
a0:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cI:function(a){var z,y,x,w,v,u,t,s
z=J.l(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.n||!!J.l(a).$isb4){v=C.i(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof t==="string"&&/^\w+$/.test(t))w=t}if(w==null)w=v}else w=v}w=w
if(w.length>1)s=w.charCodeAt(0)===36
else s=!1
if(s)w=C.h.cM(w,1)
return(w+H.dx(H.bU(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b0:function(a){return"Instance of '"+H.cI(a)+"'"},
D:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cF:function(a){return a.b?H.D(a).getUTCMilliseconds()+0:H.D(a).getMilliseconds()+0},
b_:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.a6(a))
return a[b]},
bE:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.a6(a))
a[b]=c},
Q:function(a){throw H.d(H.a6(a))},
h:function(a,b){if(a==null)J.av(a)
throw H.d(H.u(a,b))},
u:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aa(!0,b,"index",null)
z=J.av(a)
if(!(b<0)){if(typeof z!=="number")return H.Q(z)
y=b>=z}else y=!0
if(y)return P.bq(b,a,"index",null,z)
return P.b1(b,"index",null)},
a6:function(a){return new P.aa(!0,a,null,null)},
b9:function(a){return a},
ds:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.a6(a))
return a},
d:function(a){var z
if(a==null)a=new P.bD()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dF})
z.name=""}else z.toString=H.dF
return z},
dF:function(){return J.ah(this.dartException)},
y:function(a){throw H.d(a)},
a7:function(a){throw H.d(new P.G(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iq(a)
if(a==null)return
if(a instanceof H.bp)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.aY(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bt(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.cE(v,null))}}if(a instanceof TypeError){u=$.$get$cW()
t=$.$get$cX()
s=$.$get$cY()
r=$.$get$cZ()
q=$.$get$d2()
p=$.$get$d3()
o=$.$get$d0()
$.$get$d_()
n=$.$get$d5()
m=$.$get$d4()
l=u.N(y)
if(l!=null)return z.$1(H.bt(y,l))
else{l=t.N(y)
if(l!=null){l.method="call"
return z.$1(H.bt(y,l))}else{l=s.N(y)
if(l==null){l=r.N(y)
if(l==null){l=q.N(y)
if(l==null){l=p.N(y)
if(l==null){l=o.N(y)
if(l==null){l=r.N(y)
if(l==null){l=n.N(y)
if(l==null){l=m.N(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cE(y,l==null?null:l.method))}}return z.$1(new H.fV(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cN()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aa(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cN()
return a},
w:function(a){var z
if(a instanceof H.bp)return a.b
if(a==null)return new H.df(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.df(a,null)},
ik:function(a){if(a==null||typeof a!='object')return J.v(a)
else return H.a0(a)},
du:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.A(0,a[y],a[x])}return b},
ia:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.n(c,0))return H.aH(b,new H.ib(a))
else if(z.n(c,1))return H.aH(b,new H.ic(a,d))
else if(z.n(c,2))return H.aH(b,new H.id(a,d,e))
else if(z.n(c,3))return H.aH(b,new H.ie(a,d,e,f))
else if(z.n(c,4))return H.aH(b,new H.ig(a,d,e,f,g))
else throw H.d(P.aU("Unsupported number of arguments for wrapped closure"))},
au:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ia)
a.$identity=z
return z},
ep:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.fi(z).r}else x=c
w=d?Object.create(new H.fn().constructor.prototype):Object.create(new H.bm(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.S
$.S=J.a9(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cc(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.i3(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cb:H.bn
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cc(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
em:function(a,b,c,d){var z=H.bn
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cc:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eo(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.em(y,!w,z,b)
if(y===0){w=$.ai
if(w==null){w=H.aT("self")
$.ai=w}w="return function(){return this."+H.c(w)+"."+H.c(z)+"();"
v=$.S
$.S=J.a9(v,1)
return new Function(w+H.c(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ai
if(v==null){v=H.aT("self")
$.ai=v}v=w+H.c(v)+"."+H.c(z)+"("+u+");"
w=$.S
$.S=J.a9(w,1)
return new Function(v+H.c(w)+"}")()},
en:function(a,b,c,d){var z,y
z=H.bn
y=H.cb
switch(b?-1:a){case 0:throw H.d(new H.fj("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eo:function(a,b){var z,y,x,w,v,u,t,s
z=H.el()
y=$.ca
if(y==null){y=H.aT("receiver")
$.ca=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.en(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.S
$.S=J.a9(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.S
$.S=J.a9(u,1)
return new Function(y+H.c(u)+"}")()},
bT:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.ep(a,b,z,!!d,e,f)},
ip:function(a){throw H.d(new P.eu("Cyclic initialization for static "+H.c(a)))},
ag:function(a,b,c){return new H.fk(a,b,c,null)},
aJ:function(){return C.k},
bg:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a:function(a,b){a.$builtinTypeInfo=b
return a},
bU:function(a){if(a==null)return
return a.$builtinTypeInfo},
dv:function(a,b){return H.dE(a["$as"+H.c(b)],H.bU(a))},
M:function(a,b,c){var z=H.dv(a,b)
return z==null?null:z[c]},
x:function(a,b){var z=H.bU(a)
return z==null?null:z[b]},
bY:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dx(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dx:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bF("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.c(H.bY(u,c))}return w?"":"<"+H.c(z)+">"},
dE:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
hY:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.F(a[y],b[y]))return!1
return!0},
ba:function(a,b,c){return a.apply(b,H.dv(b,c))},
F:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dw(a,b)
if('func' in a)return b.builtin$cls==="iX"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bY(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.c(H.bY(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hY(H.dE(v,z),x)},
dq:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.F(z,v)||H.F(v,z)))return!1}return!0},
hX:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.F(v,u)||H.F(u,v)))return!1}return!0},
dw:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.F(z,y)||H.F(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dq(x,w,!1))return!1
if(!H.dq(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.F(o,n)||H.F(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.F(o,n)||H.F(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.F(o,n)||H.F(n,o)))return!1}}return H.hX(a.named,b.named)},
jN:function(a){var z=$.bV
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jL:function(a){return H.a0(a)},
jK:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ii:function(a){var z,y,x,w,v,u
z=$.bV.$1(a)
y=$.bb[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.be[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dp.$2(a,z)
if(z!=null){y=$.bb[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.be[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bX(x)
$.bb[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.be[z]=x
return x}if(v==="-"){u=H.bX(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dz(a,x)
if(v==="*")throw H.d(new P.d7(z))
if(init.leafTags[z]===true){u=H.bX(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dz(a,x)},
dz:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bf(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bX:function(a){return J.bf(a,!1,null,!!a.$isaY)},
ij:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bf(z,!1,null,!!z.$isaY)
else return J.bf(z,c,null,null)},
i8:function(){if(!0===$.bW)return
$.bW=!0
H.i9()},
i9:function(){var z,y,x,w,v,u,t,s
$.bb=Object.create(null)
$.be=Object.create(null)
H.i4()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dB.$1(v)
if(u!=null){t=H.ij(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
i4:function(){var z,y,x,w,v,u,t
z=C.r()
z=H.af(C.o,H.af(C.u,H.af(C.j,H.af(C.j,H.af(C.t,H.af(C.p,H.af(C.q(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bV=new H.i5(v)
$.dp=new H.i6(u)
$.dB=new H.i7(t)},
af:function(a,b){return a(b)||b},
io:function(a,b,c){return a.indexOf(b,c)>=0},
eq:{
"^":"b;",
i:function(a){return P.cy(this)},
A:function(a,b,c){return H.er()}},
eH:{
"^":"eq;a",
aT:function(){var z=this.$map
if(z==null){z=new H.Z(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.du(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aT().h(0,b)},
H:function(a,b){this.aT().H(0,b)},
gj:function(a){var z=this.aT()
return z.gj(z)}},
fh:{
"^":"b;a,b,c,d,e,f,r,x",
static:{fi:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fh(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fU:{
"^":"b;a,b,c,d,e,f",
N:function(a){var z,y,x
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
static:{T:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fU(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b3:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d1:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cE:{
"^":"B;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
f3:{
"^":"B;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.c(z)+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.c(z)+"' on '"+H.c(y)+"' ("+H.c(this.a)+")"},
static:{bt:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.f3(a,y,z?null:b.receiver)}}},
fV:{
"^":"B;a",
i:function(a){var z=this.a
return C.h.gL(z)?"Error":"Error: "+z}},
bp:{
"^":"b;a,S:b<"},
iq:{
"^":"e:2;a",
$1:function(a){if(!!J.l(a).$isB)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
df:{
"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ib:{
"^":"e:0;a",
$0:function(){return this.a.$0()}},
ic:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
id:{
"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ie:{
"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ig:{
"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{
"^":"b;",
i:function(a){return"Closure '"+H.cI(this)+"'"},
gcr:function(){return this},
gcr:function(){return this}},
cP:{
"^":"e;"},
fn:{
"^":"cP;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bm:{
"^":"cP;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bm))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gt:function(a){var z,y
z=this.c
if(z==null)y=H.a0(this.a)
else y=typeof z!=="object"?J.v(z):H.a0(z)
z=H.a0(this.b)
if(typeof y!=="number")return y.eL()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.b0(z)},
static:{bn:function(a){return a.a},cb:function(a){return a.c},el:function(){var z=$.ai
if(z==null){z=H.aT("self")
$.ai=z}return z},aT:function(a){var z,y,x,w,v
z=new H.bm("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fj:{
"^":"B;a",
i:function(a){return"RuntimeError: "+this.a}},
cM:{
"^":"b;"},
fk:{
"^":"cM;a,b,c,d",
Z:function(a){var z=this.dc(a)
return z==null?!1:H.dw(z,this.a8())},
dc:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
a8:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isju)z.v=true
else if(!x.$iscm)z.ret=y.a8()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cL(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cL(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dt(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a8()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.c(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.c(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.dt(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.c(z[s].a8())+" "+s}x+="}"}}return x+(") -> "+H.c(this.a))},
static:{cL:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a8())
return z}}},
cm:{
"^":"cM;",
i:function(a){return"dynamic"},
a8:function(){return}},
Z:{
"^":"b;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gL:function(a){return this.a===0},
gca:function(){return H.a(new H.f5(this),[H.x(this,0)])},
gbo:function(a){return H.aZ(this.gca(),new H.f2(this),H.x(this,0),H.x(this,1))},
at:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.d9(z,a)}else return this.eh(a)},
eh:function(a){var z=this.d
if(z==null)return!1
return this.ai(this.O(z,this.ah(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.O(z,b)
return y==null?null:y.ga0()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.O(x,b)
return y==null?null:y.ga0()}else return this.ei(b)},
ei:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.O(z,this.ah(a))
x=this.ai(y,a)
if(x<0)return
return y[x].ga0()},
A:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.aV()
this.b=z}this.bv(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aV()
this.c=y}this.bv(y,b,c)}else{x=this.d
if(x==null){x=this.aV()
this.d=x}w=this.ah(b)
v=this.O(x,w)
if(v==null)this.aX(x,w,[this.aW(b,c)])
else{u=this.ai(v,b)
if(u>=0)v[u].sa0(c)
else v.push(this.aW(b,c))}}},
a1:function(a,b){if(typeof b==="string")return this.bR(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bR(this.c,b)
else return this.ej(b)},
ej:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.O(z,this.ah(a))
x=this.ai(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bW(w)
return w.ga0()},
P:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.G(this))
z=z.c}},
bv:function(a,b,c){var z=this.O(a,b)
if(z==null)this.aX(a,b,this.aW(b,c))
else z.sa0(c)},
bR:function(a,b){var z
if(a==null)return
z=this.O(a,b)
if(z==null)return
this.bW(z)
this.bC(a,b)
return z.ga0()},
aW:function(a,b){var z,y
z=new H.f4(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bW:function(a){var z,y
z=a.gdr()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ah:function(a){return J.v(a)&0x3ffffff},
ai:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.R(a[y].gc7(),b))return y
return-1},
i:function(a){return P.cy(this)},
O:function(a,b){return a[b]},
aX:function(a,b,c){a[b]=c},
bC:function(a,b){delete a[b]},
d9:function(a,b){return this.O(a,b)!=null},
aV:function(){var z=Object.create(null)
this.aX(z,"<non-identifier-key>",z)
this.bC(z,"<non-identifier-key>")
return z},
$iseO:1},
f2:{
"^":"e:2;a",
$1:function(a){return this.a.h(0,a)}},
f4:{
"^":"b;c7:a<,a0:b@,c,dr:d<"},
f5:{
"^":"H;a",
gj:function(a){return this.a.a},
gD:function(a){var z,y
z=this.a
y=new H.f6(z,z.r,null,null)
y.c=z.e
return y},
H:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.G(z))
y=y.c}},
$isp:1},
f6:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
i5:{
"^":"e:2;a",
$1:function(a){return this.a(a)}},
i6:{
"^":"e:10;a",
$2:function(a,b){return this.a(a,b)}},
i7:{
"^":"e:11;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
br:function(){return new P.am("No element")},
eX:function(){return new P.am("Too few elements")},
bu:{
"^":"H;",
gD:function(a){return new H.cw(this,this.gj(this),0,null)},
H:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.U(0,y))
if(z!==this.gj(this))throw H.d(new P.G(this))}},
a6:function(a,b){return H.a(new H.by(this,b),[null,null])},
bm:function(a,b){var z,y,x
z=H.a([],[H.M(this,"bu",0)])
C.b.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.U(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bl:function(a){return this.bm(a,!0)},
$isp:1},
cw:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.L(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.G(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.U(z,w);++this.c
return!0}},
cx:{
"^":"H;a,b",
gD:function(a){var z=new H.f9(null,J.bk(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.av(this.a)},
$asH:function(a,b){return[b]},
static:{aZ:function(a,b,c,d){if(!!J.l(a).$isp)return H.a(new H.cn(a,b),[c,d])
return H.a(new H.cx(a,b),[c,d])}}},
cn:{
"^":"cx;a,b",
$isp:1},
f9:{
"^":"eY;a,b,c",
p:function(){var z=this.b
if(z.p()){this.a=this.aS(z.gw())
return!0}this.a=null
return!1},
gw:function(){return this.a},
aS:function(a){return this.c.$1(a)}},
by:{
"^":"bu;a,b",
gj:function(a){return J.av(this.a)},
U:function(a,b){return this.aS(J.dX(this.a,b))},
aS:function(a){return this.b.$1(a)},
$asbu:function(a,b){return[b]},
$asH:function(a,b){return[b]},
$isp:1},
cq:{
"^":"b;"}}],["","",,H,{
"^":"",
dt:function(a){var z=H.a(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
fW:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hZ()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.au(new P.fY(z),1)).observe(y,{childList:true})
return new P.fX(z,y,x)}else if(self.setImmediate!=null)return P.i_()
return P.i0()},
jw:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.au(new P.fZ(a),0))},"$1","hZ",2,0,4],
jx:[function(a){++init.globalState.f.b
self.setImmediate(H.au(new P.h_(a),0))},"$1","i_",2,0,4],
jy:[function(a){P.bG(C.f,a)},"$1","i0",2,0,4],
a5:function(a,b,c){if(b===0){J.dR(c,a)
return}else if(b===1){c.dO(H.A(a),H.w(a))
return}P.hI(a,b)
return c.ge9()},
hI:function(a,b){var z,y,x,w
z=new P.hJ(b)
y=new P.hK(b)
x=J.l(a)
if(!!x.$isz)a.aZ(z,y)
else if(!!x.$isV)a.bk(z,y)
else{w=H.a(new P.z(0,$.k,null),[null])
w.a=4
w.c=a
w.aZ(z,null)}},
dn:function(a){var z=function(b,c){while(true)try{a(b,c)
break}catch(y){c=y
b=1}}
$.k.toString
return new P.hW(z)},
di:function(a,b){var z=H.aJ()
z=H.ag(z,[z,z]).Z(a)
if(z){b.toString
return a}else{b.toString
return a}},
eF:function(a,b,c){var z=H.a(new P.z(0,$.k,null),[c])
P.cR(a,new P.eG(b,z))
return z},
cd:function(a){return H.a(new P.hG(H.a(new P.z(0,$.k,null),[a])),[a])},
hQ:function(a,b,c){$.k.toString
a.K(b,c)},
hS:function(){var z,y
for(;z=$.ae,z!=null;){$.ar=null
y=z.c
$.ae=y
if(y==null)$.aq=null
$.k=z.b
z.dH()}},
jJ:[function(){$.bQ=!0
try{P.hS()}finally{$.k=C.c
$.ar=null
$.bQ=!1
if($.ae!=null)$.$get$bL().$1(P.dr())}},"$0","dr",0,0,1],
dm:function(a){if($.ae==null){$.aq=a
$.ae=a
if(!$.bQ)$.$get$bL().$1(P.dr())}else{$.aq.c=a
$.aq=a}},
dC:function(a){var z,y
z=$.k
if(C.c===z){P.as(null,null,C.c,a)
return}z.toString
if(C.c.gb7()===z){P.as(null,null,z,a)
return}y=$.k
P.as(null,null,y,y.b1(a,!0))},
jm:function(a,b){var z,y,x
z=H.a(new P.dg(null,null,null,0),[b])
y=z.gdk()
x=z.gdm()
z.a=a.W(y,!0,z.gdl(),x)
return z},
hV:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.A(u)
z=t
y=H.w(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.U(x)
w=t
v=x.gS()
c.$2(w,v)}}},
hL:function(a,b,c,d){var z=a.b3()
if(!!J.l(z).$isV)z.bq(new P.hO(b,c,d))
else b.K(c,d)},
hM:function(a,b){return new P.hN(a,b)},
cR:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bG(a,b)}return P.bG(a,z.b1(b,!0))},
bG:function(a,b){var z=C.d.ad(a.a,1000)
return H.fz(z<0?0:z,b)},
aI:function(a,b,c,d,e){var z,y,x
z={}
z.a=d
y=new P.d8(new P.hU(z,e),C.c,null)
z=$.ae
if(z==null){P.dm(y)
$.ar=$.aq}else{x=$.ar
if(x==null){y.c=z
$.ar=y
$.ae=y}else{y.c=x.c
x.c=y
$.ar=y
if(y.c==null)$.aq=y}}},
hT:function(a,b){throw H.d(new P.Y(a,b))},
dj:function(a,b,c,d){var z,y
y=$.k
if(y===c)return d.$0()
$.k=c
z=y
try{y=d.$0()
return y}finally{$.k=z}},
dl:function(a,b,c,d,e){var z,y
y=$.k
if(y===c)return d.$1(e)
$.k=c
z=y
try{y=d.$1(e)
return y}finally{$.k=z}},
dk:function(a,b,c,d,e,f){var z,y
y=$.k
if(y===c)return d.$2(e,f)
$.k=c
z=y
try{y=d.$2(e,f)
return y}finally{$.k=z}},
as:function(a,b,c,d){var z=C.c!==c
if(z){d=c.b1(d,!(!z||C.c.gb7()===c))
c=C.c}P.dm(new P.d8(d,c,null))},
fY:{
"^":"e:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
fX:{
"^":"e:12;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fZ:{
"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
h_:{
"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
hJ:{
"^":"e:2;a",
$1:function(a){return this.a.$2(0,a)}},
hK:{
"^":"e:5;a",
$2:function(a,b){this.a.$2(1,new H.bp(a,b))}},
hW:{
"^":"e:13;a",
$2:function(a,b){this.a(a,b)}},
V:{
"^":"b;"},
eG:{
"^":"e:0;a,b",
$0:function(){var z,y,x,w
try{this.b.Y(null)}catch(x){w=H.A(x)
z=w
y=H.w(x)
P.hQ(this.b,z,y)}}},
h3:{
"^":"b;e9:a<",
dO:function(a,b){a=a!=null?a:new P.bD()
if(this.a.a!==0)throw H.d(new P.am("Future already completed"))
$.k.toString
this.K(a,b)}},
hG:{
"^":"h3;a",
c2:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.am("Future already completed"))
z.Y(b)},
K:function(a,b){this.a.K(a,b)}},
an:{
"^":"b;bL:a<,ez:b>,c,d,e",
ga3:function(){return this.b.b},
gc6:function(){return(this.c&1)!==0},
gef:function(){return this.c===6},
gee:function(){return this.c===8},
gdq:function(){return this.d},
gdz:function(){return this.d}},
z:{
"^":"b;ar:a?,a3:b<,c",
gdh:function(){return this.a===8},
sdi:function(a){this.a=2},
bk:function(a,b){var z=$.k
if(z!==C.c){z.toString
if(b!=null)b=P.di(b,z)}return this.aZ(a,b)},
aZ:function(a,b){var z=H.a(new P.z(0,$.k,null),[null])
this.aJ(new P.an(null,z,b==null?1:3,a,b))
return z},
bq:function(a){var z,y
z=$.k
y=new P.z(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aJ(new P.an(null,y,8,a,null))
return y},
bK:function(){if(this.a!==0)throw H.d(new P.am("Future already completed"))
this.a=1},
gdw:function(){return this.c},
gab:function(){return this.c},
du:function(a,b){this.a=8
this.c=new P.Y(a,b)},
aJ:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.as(null,null,z,new P.hd(this,a))}else{a.a=this.c
this.c=a}},
aq:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbL()
z.a=y}return y},
Y:function(a){var z,y
z=J.l(a)
if(!!z.$isV)if(!!z.$isz)P.b6(a,this)
else P.bN(a,this)
else{y=this.aq()
this.a=4
this.c=a
P.a3(this,y)}},
bB:function(a){var z=this.aq()
this.a=4
this.c=a
P.a3(this,z)},
K:[function(a,b){var z=this.aq()
this.a=8
this.c=new P.Y(a,b)
P.a3(this,z)},function(a){return this.K(a,null)},"eM","$2","$1","gaP",2,2,14,0],
d4:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isV){if(!!z.$isz){z=a.a
if(z>=4&&z===8){this.bK()
z=this.b
z.toString
P.as(null,null,z,new P.he(this,a))}else P.b6(a,this)}else P.bN(a,this)
return}}this.bK()
z=this.b
z.toString
P.as(null,null,z,new P.hf(this,a))},
$isV:1,
static:{bN:function(a,b){var z,y,x,w
b.sar(2)
try{a.bk(new P.hg(b),new P.hh(b))}catch(x){w=H.A(x)
z=w
y=H.w(x)
P.dC(new P.hi(b,z,y))}},b6:function(a,b){var z
b.a=2
z=new P.an(null,b,0,null,null)
if(a.a>=4)P.a3(a,z)
else a.aJ(z)},a3:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdh()
if(b==null){if(w){v=z.a.gab()
y=z.a.ga3()
x=J.U(v)
u=v.gS()
y.toString
P.aI(null,null,y,x,u)}return}for(;b.gbL()!=null;b=t){t=b.a
b.a=null
P.a3(z.a,b)}x.a=!0
s=w?null:z.a.gdw()
x.b=s
x.c=!1
y=!w
if(!y||b.gc6()||b.c===8){r=b.ga3()
if(w){u=z.a.ga3()
u.toString
if(u==null?r!=null:u!==r){u=u.gb7()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gab()
y=z.a.ga3()
x=J.U(v)
u=v.gS()
y.toString
P.aI(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gc6())x.a=new P.hk(x,b,s,r).$0()}else new P.hj(z,x,b,r).$0()
if(b.gee())new P.hl(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isV}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.z)if(p.a>=4){o.a=2
z.a=p
b=new P.an(null,o,0,null,null)
y=p
continue}else P.b6(p,o)
else P.bN(p,o)
return}}o=b.b
b=o.aq()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hd:{
"^":"e:0;a,b",
$0:function(){P.a3(this.a,this.b)}},
hg:{
"^":"e:2;a",
$1:function(a){this.a.bB(a)}},
hh:{
"^":"e:6;a",
$2:function(a,b){this.a.K(a,b)},
$1:function(a){return this.$2(a,null)}},
hi:{
"^":"e:0;a,b,c",
$0:function(){this.a.K(this.b,this.c)}},
he:{
"^":"e:0;a,b",
$0:function(){P.b6(this.b,this.a)}},
hf:{
"^":"e:0;a,b",
$0:function(){this.a.bB(this.b)}},
hk:{
"^":"e:15;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.bi(this.b.gdq(),this.c)
return!0}catch(x){w=H.A(x)
z=w
y=H.w(x)
this.a.b=new P.Y(z,y)
return!1}}},
hj:{
"^":"e:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gab()
y=!0
r=this.c
if(r.gef()){x=r.d
try{y=this.d.bi(x,J.U(z))}catch(q){r=H.A(q)
w=r
v=H.w(q)
r=J.U(z)
p=w
o=(r==null?p==null:r===p)?z:new P.Y(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aJ()
p=H.ag(p,[p,p]).Z(r)
n=this.d
m=this.b
if(p)m.b=n.eC(u,J.U(z),z.gS())
else m.b=n.bi(u,J.U(z))}catch(q){r=H.A(q)
t=r
s=H.w(q)
r=J.U(z)
p=t
o=(r==null?p==null:r===p)?z:new P.Y(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hl:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cl(this.d.gdz())
z.a=w
v=w}catch(u){z=H.A(u)
y=z
x=H.w(u)
if(this.c){z=J.U(this.a.a.gab())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gab()
else v.b=new P.Y(y,x)
v.a=!1
return}if(!!J.l(v).$isV){t=this.d
s=t.gez(t)
s.sdi(!0)
this.b.c=!0
v.bk(new P.hm(this.a,s),new P.hn(z,s))}}},
hm:{
"^":"e:2;a,b",
$1:function(a){P.a3(this.a.a,new P.an(null,this.b,0,null,null))}},
hn:{
"^":"e:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.z)){y=H.a(new P.z(0,$.k,null),[null])
z.a=y
y.du(a,b)}P.a3(z.a,new P.an(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
d8:{
"^":"b;a,b,c",
dH:function(){return this.a.$0()}},
a2:{
"^":"b;",
a6:function(a,b){return H.a(new P.hw(b,this),[H.M(this,"a2",0),null])},
H:function(a,b){var z,y
z={}
y=H.a(new P.z(0,$.k,null),[null])
z.a=null
z.a=this.W(new P.fr(z,this,b,y),!0,new P.fs(y),y.gaP())
return y},
gj:function(a){var z,y
z={}
y=H.a(new P.z(0,$.k,null),[P.n])
z.a=0
this.W(new P.ft(z),!0,new P.fu(z,y),y.gaP())
return y},
bl:function(a){var z,y
z=H.a([],[H.M(this,"a2",0)])
y=H.a(new P.z(0,$.k,null),[[P.j,H.M(this,"a2",0)]])
this.W(new P.fv(this,z),!0,new P.fw(z,y),y.gaP())
return y}},
fr:{
"^":"e;a,b,c,d",
$1:function(a){P.hV(new P.fp(this.c,a),new P.fq(),P.hM(this.a.a,this.d))},
$signature:function(){return H.ba(function(a){return{func:1,args:[a]}},this.b,"a2")}},
fp:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fq:{
"^":"e:2;",
$1:function(a){}},
fs:{
"^":"e:0;a",
$0:function(){this.a.Y(null)}},
ft:{
"^":"e:2;a",
$1:function(a){++this.a.a}},
fu:{
"^":"e:0;a,b",
$0:function(){this.b.Y(this.a.a)}},
fv:{
"^":"e;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.ba(function(a){return{func:1,args:[a]}},this.a,"a2")}},
fw:{
"^":"e:0;a,b",
$0:function(){this.b.Y(this.a)}},
fo:{
"^":"b;"},
jC:{
"^":"b;"},
h0:{
"^":"b;a3:d<,ar:e?",
be:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c_()
if((z&4)===0&&(this.e&32)===0)this.bH(this.gbN())},
aj:function(a){return this.be(a,null)},
ck:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gL(z)}else z=!1
if(z)this.r.aG(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bH(this.gbP())}}}},
b3:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aM()
return this.f},
aM:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c_()
if((this.e&32)===0)this.r=null
this.f=this.bM()},
aL:["cS",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bT(a)
else this.aK(new P.h6(a,null))}],
aI:["cT",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bV(a,b)
else this.aK(new P.h8(a,b,null))}],
d3:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bU()
else this.aK(C.l)},
bO:[function(){},"$0","gbN",0,0,1],
bQ:[function(){},"$0","gbP",0,0,1],
bM:function(){return},
aK:function(a){var z,y
z=this.r
if(z==null){z=new P.hF(null,null,0)
this.r=z}z.a4(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aG(this)}},
bT:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bj(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aN((z&4)!==0)},
bV:function(a,b){var z,y
z=this.e
y=new P.h2(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aM()
z=this.f
if(!!J.l(z).$isV)z.bq(y)
else y.$0()}else{y.$0()
this.aN((z&4)!==0)}},
bU:function(){var z,y
z=new P.h1(this)
this.aM()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isV)y.bq(z)
else z.$0()},
bH:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aN((z&4)!==0)},
aN:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gL(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gL(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bO()
else this.bQ()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aG(this)},
d_:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.di(b,z)
this.c=c}},
h2:{
"^":"e:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aJ()
x=H.ag(x,[x,x]).Z(y)
w=z.d
v=this.b
u=z.b
if(x)w.eD(u,v,this.c)
else w.bj(u,v)
z.e=(z.e&4294967263)>>>0}},
h1:{
"^":"e:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cm(z.c)
z.e=(z.e&4294967263)>>>0}},
da:{
"^":"b;au:a@"},
h6:{
"^":"da;b,a",
bf:function(a){a.bT(this.b)}},
h8:{
"^":"da;af:b>,S:c<,a",
bf:function(a){a.bV(this.b,this.c)}},
h7:{
"^":"b;",
bf:function(a){a.bU()},
gau:function(){return},
sau:function(a){throw H.d(new P.am("No events after a done."))}},
hy:{
"^":"b;ar:a?",
aG:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dC(new P.hz(this,a))
this.a=1},
c_:function(){if(this.a===1)this.a=3}},
hz:{
"^":"e:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.eb(this.b)}},
hF:{
"^":"hy;b,c,a",
gL:function(a){return this.c==null},
a4:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sau(b)
this.c=b}},
eb:function(a){var z,y
z=this.b
y=z.gau()
this.b=y
if(y==null)this.c=null
z.bf(a)}},
dg:{
"^":"b;a,b,c,ar:d?",
bx:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eQ:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.Y(!0)
return}this.a.aj(0)
this.c=a
this.d=3},"$1","gdk",2,0,function(){return H.ba(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dg")}],
dn:[function(a,b){var z
if(this.d===2){z=this.c
this.bx(0)
z.K(a,b)
return}this.a.aj(0)
this.c=new P.Y(a,b)
this.d=4},function(a){return this.dn(a,null)},"eS","$2","$1","gdm",2,2,16,0],
eR:[function(){if(this.d===2){var z=this.c
this.bx(0)
z.Y(!1)
return}this.a.aj(0)
this.c=null
this.d=5},"$0","gdl",0,0,1]},
hO:{
"^":"e:0;a,b,c",
$0:function(){return this.a.K(this.b,this.c)}},
hN:{
"^":"e:5;a,b",
$2:function(a,b){return P.hL(this.a,this.b,a,b)}},
bM:{
"^":"a2;",
W:function(a,b,c,d){return this.da(a,d,c,!0===b)},
cc:function(a,b,c){return this.W(a,null,b,c)},
da:function(a,b,c,d){return P.hc(this,a,b,c,d,H.M(this,"bM",0),H.M(this,"bM",1))},
bI:function(a,b){b.aL(a)},
$asa2:function(a,b){return[b]}},
db:{
"^":"h0;x,y,a,b,c,d,e,f,r",
aL:function(a){if((this.e&2)!==0)return
this.cS(a)},
aI:function(a,b){if((this.e&2)!==0)return
this.cT(a,b)},
bO:[function(){var z=this.y
if(z==null)return
z.aj(0)},"$0","gbN",0,0,1],
bQ:[function(){var z=this.y
if(z==null)return
z.ck()},"$0","gbP",0,0,1],
bM:function(){var z=this.y
if(z!=null){this.y=null
return z.b3()}return},
eN:[function(a){this.x.bI(a,this)},"$1","gdd",2,0,function(){return H.ba(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"db")}],
eP:[function(a,b){this.aI(a,b)},"$2","gdf",4,0,17],
eO:[function(){this.d3()},"$0","gde",0,0,1],
d0:function(a,b,c,d,e,f,g){var z,y
z=this.gdd()
y=this.gdf()
this.y=this.x.a.cc(z,this.gde(),y)},
static:{hc:function(a,b,c,d,e,f,g){var z=$.k
z=H.a(new P.db(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.d_(b,c,d,e)
z.d0(a,b,c,d,e,f,g)
return z}}},
hw:{
"^":"bM;b,a",
bI:function(a,b){var z,y,x,w,v
z=null
try{z=this.dv(a)}catch(w){v=H.A(w)
y=v
x=H.w(w)
$.k.toString
b.aI(y,x)
return}b.aL(z)},
dv:function(a){return this.b.$1(a)}},
Y:{
"^":"b;af:a>,S:b<",
i:function(a){return H.c(this.a)},
$isB:1},
hH:{
"^":"b;"},
hU:{
"^":"e:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bD()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
P.hT(z,y)}},
hB:{
"^":"hH;",
gb7:function(){return this},
cm:function(a){var z,y,x,w
try{if(C.c===$.k){x=a.$0()
return x}x=P.dj(null,null,this,a)
return x}catch(w){x=H.A(w)
z=x
y=H.w(w)
return P.aI(null,null,this,z,y)}},
bj:function(a,b){var z,y,x,w
try{if(C.c===$.k){x=a.$1(b)
return x}x=P.dl(null,null,this,a,b)
return x}catch(w){x=H.A(w)
z=x
y=H.w(w)
return P.aI(null,null,this,z,y)}},
eD:function(a,b,c){var z,y,x,w
try{if(C.c===$.k){x=a.$2(b,c)
return x}x=P.dk(null,null,this,a,b,c)
return x}catch(w){x=H.A(w)
z=x
y=H.w(w)
return P.aI(null,null,this,z,y)}},
b1:function(a,b){if(b)return new P.hC(this,a)
else return new P.hD(this,a)},
dD:function(a,b){return new P.hE(this,a)},
h:function(a,b){return},
cl:function(a){if($.k===C.c)return a.$0()
return P.dj(null,null,this,a)},
bi:function(a,b){if($.k===C.c)return a.$1(b)
return P.dl(null,null,this,a,b)},
eC:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.dk(null,null,this,a,b,c)}},
hC:{
"^":"e:0;a,b",
$0:function(){return this.a.cm(this.b)}},
hD:{
"^":"e:0;a,b",
$0:function(){return this.a.cl(this.b)}},
hE:{
"^":"e:2;a,b",
$1:function(a){return this.a.bj(this.b,a)}}}],["","",,P,{
"^":"",
aC:function(){return H.a(new H.Z(0,null,null,null,null,null,0),[null,null])},
ac:function(a){return H.du(a,H.a(new H.Z(0,null,null,null,null,null,0),[null,null]))},
eW:function(a,b,c){var z,y
if(P.bR(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$at()
y.push(a)
try{P.hR(a,z)}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=P.cO(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aV:function(a,b,c){var z,y,x
if(P.bR(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$at()
y.push(a)
try{x=z
x.a=P.cO(x.ga2(),a,", ")}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=z
y.a=y.ga2()+c
y=z.ga2()
return y.charCodeAt(0)==0?y:y},
bR:function(a){var z,y
for(z=0;y=$.$get$at(),z<y.length;++z)if(a===y[z])return!0
return!1},
hR:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gD(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.p())return
w=H.c(z.gw())
b.push(w)
y+=w.length+2;++x}if(!z.p()){if(x<=5)return
if(0>=b.length)return H.h(b,-1)
v=b.pop()
if(0>=b.length)return H.h(b,-1)
u=b.pop()}else{t=z.gw();++x
if(!z.p()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.h(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gw();++x
for(;z.p();t=s,s=r){r=z.gw();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ak:function(a,b,c,d){return H.a(new P.hq(0,null,null,null,null,null,0),[d])},
cy:function(a){var z,y,x
z={}
if(P.bR(a))return"{...}"
y=new P.bF("")
try{$.$get$at().push(a)
x=y
x.a=x.ga2()+"{"
z.a=!0
J.dY(a,new P.fa(z,y))
z=y
z.a=z.ga2()+"}"}finally{z=$.$get$at()
if(0>=z.length)return H.h(z,-1)
z.pop()}z=y.ga2()
return z.charCodeAt(0)==0?z:z},
de:{
"^":"Z;a,b,c,d,e,f,r",
ah:function(a){return H.ik(a)&0x3ffffff},
ai:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gc7()
if(x==null?b==null:x===b)return y}return-1},
static:{ap:function(a,b){return H.a(new P.de(0,null,null,null,null,null,0),[a,b])}}},
hq:{
"^":"ho;a,b,c,d,e,f,r",
gD:function(a){var z=new P.cv(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dP:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.d8(b)},
d8:function(a){var z=this.d
if(z==null)return!1
return this.ap(z[this.ao(a)],a)>=0},
cd:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dP(0,a)?a:null
else return this.dj(a)},
dj:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ao(a)]
x=this.ap(y,a)
if(x<0)return
return J.bZ(y,x).gbE()},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.G(this))
z=z.b}},
a4:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.by(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.by(x,b)}else return this.T(b)},
T:function(a){var z,y,x
z=this.d
if(z==null){z=P.hr()
this.d=z}y=this.ao(a)
x=z[y]
if(x==null)z[y]=[this.aO(a)]
else{if(this.ap(x,a)>=0)return!1
x.push(this.aO(a))}return!0},
a1:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bz(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bz(this.c,b)
else return this.ds(b)},
ds:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ao(a)]
x=this.ap(y,a)
if(x<0)return!1
this.bA(y.splice(x,1)[0])
return!0},
P:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
by:function(a,b){if(a[b]!=null)return!1
a[b]=this.aO(b)
return!0},
bz:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bA(z)
delete a[b]
return!0},
aO:function(a){var z,y
z=new P.f7(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bA:function(a){var z,y
z=a.gd7()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ao:function(a){return J.v(a)&0x3ffffff},
ap:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.R(a[y].gbE(),b))return y
return-1},
$isp:1,
static:{hr:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f7:{
"^":"b;bE:a<,b,d7:c<"},
cv:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
ho:{
"^":"fl;"},
bv:{
"^":"b;",
gD:function(a){return new H.cw(a,this.gj(a),0,null)},
U:function(a,b){return this.h(a,b)},
H:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.d(new P.G(a))}},
a6:function(a,b){return H.a(new H.by(a,b),[null,null])},
i:function(a){return P.aV(a,"[","]")},
$isj:1,
$asj:null,
$isp:1},
fa:{
"^":"e:18;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.c(a)
z.a=y+": "
z.a+=H.c(b)}},
f8:{
"^":"H;a,b,c,d",
gD:function(a){return new P.hs(this,this.c,this.d,this.b,null)},
H:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.y(new P.G(this))}},
gL:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
P:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aV(this,"{","}")},
cj:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.br());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
T:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bG();++this.d},
bG:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.a(z,[H.x(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bu(y,0,w,z,x)
C.b.bu(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cV:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.a(z,[b])},
$isp:1,
static:{bw:function(a,b){var z=H.a(new P.f8(null,0,0,0),[b])
z.cV(a,b)
return z}}},
hs:{
"^":"b;a,b,c,d,e",
gw:function(){return this.e},
p:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.y(new P.G(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fm:{
"^":"b;",
a6:function(a,b){return H.a(new H.cn(this,b),[H.x(this,0),null])},
i:function(a){return P.aV(this,"{","}")},
H:function(a,b){var z
for(z=this.gD(this);z.p();)b.$1(z.d)},
$isp:1},
fl:{
"^":"fm;"}}],["","",,P,{
"^":"",
co:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ah(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eC(a)},
eC:function(a){var z=J.l(a)
if(!!z.$ise)return z.i(a)
return H.b0(a)},
aU:function(a){return new P.hb(a)},
bx:function(a,b,c){var z,y
z=H.a([],[c])
for(y=J.bk(a);y.p();)z.push(y.gw())
return z},
aO:function(a){var z=H.c(a)
H.dA(z)},
bS:{
"^":"b;"},
"+bool":0,
cg:{
"^":"b;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.cg))return!1
return this.a===b.a&&this.b===b.b},
gt:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ev(z?H.D(this).getUTCFullYear()+0:H.D(this).getFullYear()+0)
x=P.aw(z?H.D(this).getUTCMonth()+1:H.D(this).getMonth()+1)
w=P.aw(z?H.D(this).getUTCDate()+0:H.D(this).getDate()+0)
v=P.aw(z?H.D(this).getUTCHours()+0:H.D(this).getHours()+0)
u=P.aw(z?H.D(this).getUTCMinutes()+0:H.D(this).getMinutes()+0)
t=P.aw(z?H.D(this).getUTCSeconds()+0:H.D(this).getSeconds()+0)
s=P.ew(H.cF(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{ev:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.c(z)
if(z>=10)return y+"00"+H.c(z)
return y+"000"+H.c(z)},ew:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aw:function(a){if(a>=10)return""+a
return"0"+a}}},
a8:{
"^":"aN;"},
"+double":0,
aj:{
"^":"b;a",
k:function(a,b){return new P.aj(C.d.k(this.a,b.gbD()))},
m:function(a,b){return new P.aj(C.d.m(this.a,b.gbD()))},
aF:function(a,b){return C.d.aF(this.a,b.gbD())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.aj))return!1
return this.a===b.a},
gt:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eB()
y=this.a
if(y<0)return"-"+new P.aj(-y).i(0)
x=z.$1(C.d.bg(C.d.ad(y,6e7),60))
w=z.$1(C.d.bg(C.d.ad(y,1e6),60))
v=new P.eA().$1(C.d.bg(y,1e6))
return""+C.d.ad(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)}},
eA:{
"^":"e:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eB:{
"^":"e:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
B:{
"^":"b;",
gS:function(){return H.w(this.$thrownJsError)}},
bD:{
"^":"B;",
i:function(a){return"Throw of null."}},
aa:{
"^":"B;a,b,c,d",
gaR:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaQ:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.c(z)+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gaR()+y+x
if(!this.a)return w
v=this.gaQ()
u=P.co(this.b)
return w+v+": "+H.c(u)},
static:{bl:function(a){return new P.aa(!1,null,null,a)},ej:function(a,b,c){return new P.aa(!0,a,b,c)}}},
cJ:{
"^":"aa;e,f,a,b,c,d",
gaR:function(){return"RangeError"},
gaQ:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else{if(typeof x!=="number")return x.eJ()
if(typeof z!=="number")return H.Q(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b1:function(a,b,c){return new P.cJ(null,null,!0,a,b,"Value not in range")},al:function(a,b,c,d,e){return new P.cJ(b,c,!0,a,d,"Invalid value")},cK:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.al(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.al(b,a,c,"end",f))
return b}}},
eK:{
"^":"aa;e,j:f>,a,b,c,d",
gaR:function(){return"RangeError"},
gaQ:function(){if(J.dG(this.b,0))return": index must not be negative"
var z=this.f
if(J.R(z,0))return": no indices are valid"
return": index should be less than "+H.c(z)},
static:{bq:function(a,b,c,d,e){var z=e!=null?e:J.av(b)
return new P.eK(b,z,!0,a,c,"Index out of range")}}},
I:{
"^":"B;a",
i:function(a){return"Unsupported operation: "+this.a}},
d7:{
"^":"B;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
am:{
"^":"B;a",
i:function(a){return"Bad state: "+this.a}},
G:{
"^":"B;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.co(z))+"."}},
cN:{
"^":"b;",
i:function(a){return"Stack Overflow"},
gS:function(){return},
$isB:1},
eu:{
"^":"B;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hb:{
"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
eD:{
"^":"b;a",
i:function(a){return"Expando:"+H.c(this.a)},
h:function(a,b){var z=H.b_(b,"expando$values")
return z==null?null:H.b_(z,this.bF())},
A:function(a,b,c){var z=H.b_(b,"expando$values")
if(z==null){z=new P.b()
H.bE(b,"expando$values",z)}H.bE(z,this.bF(),c)},
bF:function(){var z,y
z=H.b_(this,"expando$key")
if(z==null){y=$.cp
$.cp=y+1
z="expando$key$"+y
H.bE(this,"expando$key",z)}return z}},
n:{
"^":"aN;"},
"+int":0,
H:{
"^":"b;",
a6:function(a,b){return H.aZ(this,b,H.M(this,"H",0),null)},
H:function(a,b){var z
for(z=this.gD(this);z.p();)b.$1(z.gw())},
bm:function(a,b){return P.bx(this,!0,H.M(this,"H",0))},
bl:function(a){return this.bm(a,!0)},
gj:function(a){var z,y
z=this.gD(this)
for(y=0;z.p();)++y
return y},
U:function(a,b){var z,y,x
if(b<0)H.y(P.al(b,0,null,"index",null))
for(z=this.gD(this),y=0;z.p();){x=z.gw()
if(b===y)return x;++y}throw H.d(P.bq(b,this,"index",null,y))},
i:function(a){return P.eW(this,"(",")")}},
eY:{
"^":"b;"},
j:{
"^":"b;",
$asj:null,
$isp:1},
"+List":0,
jf:{
"^":"b;",
i:function(a){return"null"}},
"+Null":0,
aN:{
"^":"b;"},
"+num":0,
b:{
"^":";",
n:function(a,b){return this===b},
gt:function(a){return H.a0(this)},
i:function(a){return H.b0(this)},
toString:function(){return this.i(this)}},
a1:{
"^":"b;"},
P:{
"^":"b;"},
"+String":0,
bF:{
"^":"b;a2:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cO:function(a,b,c){var z=J.bk(b)
if(!z.p())return a
if(c.length===0){do a+=H.c(z.gw())
while(z.p())}else{a+=H.c(z.gw())
for(;z.p();)a=a+c+H.c(z.gw())}return a}}}}],["","",,W,{
"^":"",
et:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.v)},
a4:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dc:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dh:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.h5(a)
if(!!J.l(z).$isN)return z
return}else return a},
K:function(a){var z=$.k
if(z===C.c)return a
return z.dD(a,!0)},
C:{
"^":"ax;",
$isC:1,
$isb:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
it:{
"^":"C;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iv:{
"^":"C;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iw:{
"^":"C;",
$isN:1,
$isf:1,
"%":"HTMLBodyElement"},
ix:{
"^":"C;q:height},u:width}",
br:function(a,b,c){return a.getContext(b,P.i1(c,null))},
cv:function(a,b,c,d,e,f,g){var z,y
z=P.ac(["alpha",!0,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.br(a,"webgl",z)
return y==null?this.br(a,"experimental-webgl",z):y},
cu:function(a,b){return this.cv(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
iz:{
"^":"aD;j:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iA:{
"^":"eL;j:length=",
bt:function(a,b,c,d){var z=this.d5(a,b)
a.setProperty(z,c,d)
return},
d5:function(a,b){var z,y
z=$.$get$ce()
y=z[b]
if(typeof y==="string")return y
y=W.et(b) in a?b:P.ex()+b
z[b]=y
return y},
sq:function(a,b){a.height=b},
su:function(a,b){a.width=b},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eL:{
"^":"f+es;"},
es:{
"^":"b;",
sq:function(a,b){this.bt(a,"height",b,"")},
su:function(a,b){this.bt(a,"width",b,"")}},
ey:{
"^":"aD;",
gav:function(a){return H.a(new W.q(a,"mousedown",!1),[null])},
gaw:function(a){return H.a(new W.q(a,"mouseenter",!1),[null])},
gax:function(a){return H.a(new W.q(a,"mouseleave",!1),[null])},
gay:function(a){return H.a(new W.q(a,"mousemove",!1),[null])},
gaz:function(a){return H.a(new W.q(a,"mouseout",!1),[null])},
gaA:function(a){return H.a(new W.q(a,"mouseover",!1),[null])},
gaB:function(a){return H.a(new W.q(a,"mouseup",!1),[null])},
gbb:function(a){return H.a(new W.q(a,"touchcancel",!1),[null])},
gaC:function(a){return H.a(new W.q(a,"touchend",!1),[null])},
gbc:function(a){return H.a(new W.q(a,"touchmove",!1),[null])},
gaD:function(a){return H.a(new W.q(a,"touchstart",!1),[null])},
dU:function(a,b,c){return a.createElement(b)},
dT:function(a,b){return this.dU(a,b,null)},
"%":"XMLDocument;Document"},
iB:{
"^":"aD;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iC:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
ez:{
"^":"f;b2:bottom=,q:height=,M:left=,bh:right=,a9:top=,u:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(this.gu(a))+" x "+H.c(this.gq(a))},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isW)return!1
y=a.left
x=z.gM(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga9(b)
if(y==null?x==null:y===x){y=this.gu(a)
x=z.gu(b)
if(y==null?x==null:y===x){y=this.gq(a)
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.v(a.left)
y=J.v(a.top)
x=J.v(this.gu(a))
w=J.v(this.gq(a))
return W.dc(W.a4(W.a4(W.a4(W.a4(0,z),y),x),w))},
gbn:function(a){return H.a(new P.E(a.left,a.top),[null])},
$isW:1,
$asW:I.bc,
"%":";DOMRectReadOnly"},
ax:{
"^":"aD;",
gI:function(a){return P.fg(C.a.F(a.offsetLeft),C.a.F(a.offsetTop),C.a.F(a.offsetWidth),C.a.F(a.offsetHeight),null)},
i:function(a){return a.localName},
ger:function(a){return C.a.F(a.offsetLeft)},
ges:function(a){return C.a.F(a.offsetTop)},
ct:function(a){return a.getBoundingClientRect()},
gav:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gaw:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gax:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gay:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gaz:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gaA:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gaB:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
gbb:function(a){return H.a(new W.t(a,"touchcancel",!1),[null])},
gaC:function(a){return H.a(new W.t(a,"touchend",!1),[null])},
geu:function(a){return H.a(new W.t(a,"touchenter",!1),[null])},
gev:function(a){return H.a(new W.t(a,"touchleave",!1),[null])},
gbc:function(a){return H.a(new W.t(a,"touchmove",!1),[null])},
gaD:function(a){return H.a(new W.t(a,"touchstart",!1),[null])},
$isax:1,
$isf:1,
$isN:1,
"%":";Element"},
iD:{
"^":"C;q:height},u:width}",
"%":"HTMLEmbedElement"},
iE:{
"^":"bo;af:error=",
"%":"ErrorEvent"},
bo:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
N:{
"^":"f;",
d2:function(a,b,c,d){return a.addEventListener(b,H.au(c,1),!1)},
dt:function(a,b,c,d){return a.removeEventListener(b,H.au(c,1),!1)},
$isN:1,
"%":"MediaStream;EventTarget"},
iW:{
"^":"C;j:length=",
"%":"HTMLFormElement"},
eI:{
"^":"ey;",
"%":"HTMLDocument"},
iY:{
"^":"C;q:height},u:width}",
"%":"HTMLIFrameElement"},
iZ:{
"^":"C;q:height},u:width}",
c2:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
j0:{
"^":"C;q:height},u:width}",
$isax:1,
$isf:1,
$isN:1,
"%":"HTMLInputElement"},
fb:{
"^":"C;af:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
bz:{
"^":"d6;",
gI:function(a){var z,y,x
if(!!a.offsetX)return H.a(new P.E(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.l(W.dh(z)).$isax)throw H.d(new P.I("offsetX is only supported on elements"))
y=W.dh(z)
x=H.a(new P.E(a.clientX,a.clientY),[null]).m(0,J.eb(J.ed(y)))
return H.a(new P.E(J.c8(x.a),J.c8(x.b)),[null])}},
$isbz:1,
$isb:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
je:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aD:{
"^":"N;",
i:function(a){var z=a.nodeValue
return z==null?this.cO(a):z},
"%":"Attr;Node"},
jg:{
"^":"C;q:height},u:width}",
"%":"HTMLObjectElement"},
jk:{
"^":"C;j:length=",
"%":"HTMLSelectElement"},
jl:{
"^":"bo;af:error=",
"%":"SpeechRecognitionError"},
bJ:{
"^":"f;",
$isb:1,
"%":"Touch"},
bK:{
"^":"d6;dI:changedTouches=",
$isbK:1,
$isb:1,
"%":"TouchEvent"},
jq:{
"^":"eN;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bq(b,a,null,null,null))
return a[b]},
A:function(a,b,c){throw H.d(new P.I("Cannot assign element of immutable List."))},
U:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bJ]},
$isp:1,
$isaY:1,
$isaW:1,
"%":"TouchList"},
eM:{
"^":"f+bv;",
$isj:1,
$asj:function(){return[W.bJ]},
$isp:1},
eN:{
"^":"eM+eJ;",
$isj:1,
$asj:function(){return[W.bJ]},
$isp:1},
d6:{
"^":"bo;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
js:{
"^":"fb;q:height},u:width}",
"%":"HTMLVideoElement"},
jv:{
"^":"N;",
gav:function(a){return H.a(new W.q(a,"mousedown",!1),[null])},
gaw:function(a){return H.a(new W.q(a,"mouseenter",!1),[null])},
gax:function(a){return H.a(new W.q(a,"mouseleave",!1),[null])},
gay:function(a){return H.a(new W.q(a,"mousemove",!1),[null])},
gaz:function(a){return H.a(new W.q(a,"mouseout",!1),[null])},
gaA:function(a){return H.a(new W.q(a,"mouseover",!1),[null])},
gaB:function(a){return H.a(new W.q(a,"mouseup",!1),[null])},
gbb:function(a){return H.a(new W.q(a,"touchcancel",!1),[null])},
gaC:function(a){return H.a(new W.q(a,"touchend",!1),[null])},
gbc:function(a){return H.a(new W.q(a,"touchmove",!1),[null])},
gaD:function(a){return H.a(new W.q(a,"touchstart",!1),[null])},
$isf:1,
$isN:1,
"%":"DOMWindow|Window"},
jz:{
"^":"f;b2:bottom=,q:height=,M:left=,bh:right=,a9:top=,u:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isW)return!1
y=a.left
x=z.gM(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga9(b)
if(y==null?x==null:y===x){y=a.width
x=z.gu(b)
if(y==null?x==null:y===x){y=a.height
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.v(a.left)
y=J.v(a.top)
x=J.v(a.width)
w=J.v(a.height)
return W.dc(W.a4(W.a4(W.a4(W.a4(0,z),y),x),w))},
gbn:function(a){return H.a(new P.E(a.left,a.top),[null])},
$isW:1,
$asW:I.bc,
"%":"ClientRect"},
jA:{
"^":"aD;",
$isf:1,
"%":"DocumentType"},
jB:{
"^":"ez;",
gq:function(a){return a.height},
sq:function(a,b){a.height=b},
gu:function(a){return a.width},
su:function(a,b){a.width=b},
"%":"DOMRect"},
jE:{
"^":"C;",
$isN:1,
$isf:1,
"%":"HTMLFrameSetElement"},
q:{
"^":"a2;a,b,c",
W:function(a,b,c,d){var z=new W.J(0,this.a,this.b,W.K(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.G()
return z},
cb:function(a){return this.W(a,null,null,null)},
cc:function(a,b,c){return this.W(a,null,b,c)}},
t:{
"^":"q;a,b,c"},
J:{
"^":"fo;a,b,c,d,e",
b3:function(){if(this.b==null)return
this.bX()
this.b=null
this.d=null
return},
be:function(a,b){if(this.b==null)return;++this.a
this.bX()},
aj:function(a){return this.be(a,null)},
ck:function(){if(this.b==null||this.a<=0)return;--this.a
this.G()},
G:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dH(x,this.c,z,!1)}},
bX:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dI(x,this.c,z,!1)}}},
eJ:{
"^":"b;",
gD:function(a){return new W.eE(a,this.gj(a),-1,null)},
$isj:1,
$asj:null,
$isp:1},
eE:{
"^":"b;a,b,c,d",
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bZ(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gw:function(){return this.d}},
h4:{
"^":"b;a",
$isN:1,
$isf:1,
static:{h5:function(a){if(a===window)return a
else return new W.h4(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ir:{
"^":"ay;",
$isf:1,
"%":"SVGAElement"},
is:{
"^":"fx;",
$isf:1,
"%":"SVGAltGlyphElement"},
iu:{
"^":"o;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iF:{
"^":"o;",
$isf:1,
"%":"SVGFEBlendElement"},
iG:{
"^":"o;",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iH:{
"^":"o;",
$isf:1,
"%":"SVGFEComponentTransferElement"},
iI:{
"^":"o;",
$isf:1,
"%":"SVGFECompositeElement"},
iJ:{
"^":"o;",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
iK:{
"^":"o;",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
iL:{
"^":"o;",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
iM:{
"^":"o;",
$isf:1,
"%":"SVGFEFloodElement"},
iN:{
"^":"o;",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
iO:{
"^":"o;",
$isf:1,
"%":"SVGFEImageElement"},
iP:{
"^":"o;",
$isf:1,
"%":"SVGFEMergeElement"},
iQ:{
"^":"o;",
$isf:1,
"%":"SVGFEMorphologyElement"},
iR:{
"^":"o;",
$isf:1,
"%":"SVGFEOffsetElement"},
iS:{
"^":"o;",
$isf:1,
"%":"SVGFESpecularLightingElement"},
iT:{
"^":"o;",
$isf:1,
"%":"SVGFETileElement"},
iU:{
"^":"o;",
$isf:1,
"%":"SVGFETurbulenceElement"},
iV:{
"^":"o;",
$isf:1,
"%":"SVGFilterElement"},
ay:{
"^":"o;",
$isf:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
j_:{
"^":"ay;",
$isf:1,
"%":"SVGImageElement"},
j3:{
"^":"o;",
$isf:1,
"%":"SVGMarkerElement"},
j4:{
"^":"o;",
$isf:1,
"%":"SVGMaskElement"},
jh:{
"^":"o;",
$isf:1,
"%":"SVGPatternElement"},
jj:{
"^":"o;",
$isf:1,
"%":"SVGScriptElement"},
o:{
"^":"ax;",
gav:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gaw:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gax:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gay:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gaz:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gaA:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gaB:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
$isN:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jn:{
"^":"ay;",
$isf:1,
"%":"SVGSVGElement"},
jo:{
"^":"o;",
$isf:1,
"%":"SVGSymbolElement"},
cQ:{
"^":"ay;",
"%":";SVGTextContentElement"},
jp:{
"^":"cQ;",
$isf:1,
"%":"SVGTextPathElement"},
fx:{
"^":"cQ;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jr:{
"^":"ay;",
$isf:1,
"%":"SVGUseElement"},
jt:{
"^":"o;",
$isf:1,
"%":"SVGViewElement"},
jD:{
"^":"o;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jF:{
"^":"o;",
$isf:1,
"%":"SVGCursorElement"},
jG:{
"^":"o;",
$isf:1,
"%":"SVGFEDropShadowElement"},
jH:{
"^":"o;",
$isf:1,
"%":"SVGGlyphRefElement"},
jI:{
"^":"o;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ji:{
"^":"f;",
dB:function(a,b,c){return a.bindBuffer(b,c)},
dC:function(a,b,c){return a.bindTexture(b,c)},
dE:function(a,b){return a.blendEquation(b)},
dF:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dG:function(a,b,c,d){return a.bufferData(b,c,d)},
dJ:function(a,b){return a.clear(b)},
dK:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dL:function(a,b){return a.clearDepth(b)},
dM:function(a,b){return a.clearStencil(b)},
dN:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dS:function(a){return a.createBuffer()},
dV:function(a){return a.createProgram()},
dW:function(a,b){return a.createShader(b)},
dX:function(a,b){return a.depthFunc(b)},
dY:function(a,b){return a.depthMask(b)},
e4:function(a,b){return a.disableVertexAttribArray(b)},
e5:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
e6:function(a,b){return a.enable(b)},
e7:function(a,b){return a.enableVertexAttribArray(b)},
cs:function(a,b,c){return a.getAttribLocation(b,c)},
cz:function(a,b){return a.getParameter(b)},
cA:function(a,b,c){return a.getUniformLocation(b,c)},
cK:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cL:function(a,b,c,d){return a.stencilOp(b,c,d)},
eG:function(a,b){return a.useProgram(b)},
eH:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iy:{
"^":"b;"}}],["","",,P,{
"^":"",
ao:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dd:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
E:{
"^":"b;C:a>,E:b>",
i:function(a){return"Point("+H.c(this.a)+", "+H.c(this.b)+")"},
n:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.E))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gt:function(a){var z,y
z=J.v(this.a)
y=J.v(this.b)
return P.dd(P.ao(P.ao(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gC(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gE(b)
if(typeof z!=="number")return z.k()
y=new P.E(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
m:function(a,b){var z,y,x,w
z=this.a
y=J.ec(b)
if(typeof z!=="number")return z.m()
if(typeof y!=="number")return H.Q(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.m()
if(typeof w!=="number")return H.Q(w)
w=new P.E(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hA:{
"^":"b;",
gbh:function(a){return this.gM(this)+this.c},
gb2:function(a){return this.ga9(this)+this.d},
i:function(a){return"Rectangle ("+this.gM(this)+", "+this.b+") "+this.c+" x "+this.d},
n:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isW)return!1
if(this.gM(this)===z.gM(b)){y=this.b
z=y===z.ga9(b)&&this.a+this.c===z.gbh(b)&&y+this.d===z.gb2(b)}else z=!1
return z},
gt:function(a){var z=this.b
return P.dd(P.ao(P.ao(P.ao(P.ao(0,this.gM(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbn:function(a){var z=new P.E(this.gM(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
W:{
"^":"hA;M:a>,a9:b>,u:c>,q:d>",
$asW:null,
static:{fg:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.a(new P.W(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
m:function(a){return a},
b8:function(a){return a},
cz:{
"^":"f;",
$iscz:1,
"%":"ArrayBuffer"},
bC:{
"^":"f;",
$isbC:1,
"%":"DataView;ArrayBufferView;bA|cA|cC|bB|cB|cD|a_"},
bA:{
"^":"bC;",
gj:function(a){return a.length},
$isaY:1,
$isaW:1},
bB:{
"^":"cC;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
A:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
a[b]=c}},
cA:{
"^":"bA+bv;",
$isj:1,
$asj:function(){return[P.a8]},
$isp:1},
cC:{
"^":"cA+cq;"},
a_:{
"^":"cD;",
A:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.n]},
$isp:1},
cB:{
"^":"bA+bv;",
$isj:1,
$asj:function(){return[P.n]},
$isp:1},
cD:{
"^":"cB+cq;"},
j5:{
"^":"bB;",
$isj:1,
$asj:function(){return[P.a8]},
$isp:1,
"%":"Float32Array"},
j6:{
"^":"bB;",
$isj:1,
$asj:function(){return[P.a8]},
$isp:1,
"%":"Float64Array"},
j7:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$isp:1,
"%":"Int16Array"},
j8:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$isp:1,
"%":"Int32Array"},
j9:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$isp:1,
"%":"Int8Array"},
ja:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$isp:1,
"%":"Uint16Array"},
jb:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$isp:1,
"%":"Uint32Array"},
jc:{
"^":"a_;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$isp:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jd:{
"^":"a_;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$isp:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dA:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
i1:function(a,b){var z={}
a.H(0,new P.i2(z))
return z},
cl:function(){var z=$.ck
if(z==null){z=J.bi(window.navigator.userAgent,"Opera",0)
$.ck=z}return z},
ex:function(){var z,y
z=$.ch
if(z!=null)return z
y=$.ci
if(y==null){y=J.bi(window.navigator.userAgent,"Firefox",0)
$.ci=y}if(y===!0)z="-moz-"
else{y=$.cj
if(y==null){y=P.cl()!==!0&&J.bi(window.navigator.userAgent,"Trident/",0)
$.cj=y}if(y===!0)z="-ms-"
else z=P.cl()===!0?"-o-":"-webkit-"}$.ch=z
return z},
i2:{
"^":"e:19;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
jM:[function(){var z,y,x,w,v,u
z=new G.fE(700,500,P.aC(),P.aC())
y=new E.O(new Float64Array(H.m(16)))
y.R()
x=new F.fF(400,300,1,1,1,0,0,null,!0,"none",null,y,!1)
x.b=[]
x.ch=F.aE(255,238,238,255)
y=new E.O(new Float64Array(H.m(16)))
y.R()
w=new G.fK(null,0,0,!1,0,z,!1,!1,!1,0,null,!1,!1,[y])
w.a=G.fJ(400,600)
w.seA(x)
w.eq()
w.eF()
if(!w.d){w.d=!0
w.an()}y=P.aC()
v=new E.O(new Float64Array(H.m(16)))
v.R()
u=new O.fe(z,y,"none",null,v,!1)
u.b=[]
v.eB(0.3141592653589793)
x.as(u)},"$0","dy",0,0,1]},1],["","",,F,{
"^":"",
cu:function(a){var z,y,x,w,v
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.a7)(a),++x){v=a[x]
if(typeof v!=="number")return H.Q(v)
y+=v
y+=y<<10>>>0
y=(y^C.a.aY(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fC:{
"^":"b;"},
cT:{
"^":"b;",
as:function(a){var z=0,y=new P.cd(),x=1,w,v=this,u,t,s,r
var $async$as=P.dn(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.a(new s.z(0,r.k,null),[null])
t=u
t.d4(null)
z=2
return P.a5(u,$async$as,y)
case 2:t=v
t=t.b
t.push(a)
return P.a5(null,0,y,null)
case 1:return P.a5(w,1,y)}})
return P.a5(null,$async$as,y,null)},
c8:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a7)(z),++x)z[x].c8(a)},
ce:function(a,b){},
co:function(a,b){var z,y,x
this.b6()
this.ce(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a7)(z),++x)z[x].co(a,b)},
ba:function(a,b){},
bd:["cQ",function(a,b){var z,y,x,w,v,u
this.b6()
this.ba(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.a7)(z),++w){v=z[w]
u=v.c
x.push(C.b.ga5(x).v(0,u))
b.aE()
v.bd(a,b)
if(0>=x.length)return H.h(x,-1)
x.pop()
b.aE()}}],
eE:["cR",function(a,b,c,d,e){var z,y,x,w,v,u,t
this.b6()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.ci(v.c)
v.eE(a,b,c,d,e)
a.cg()}u=a.cw().b5(0)
u.ek()
y=new E.r(new Float64Array(H.m(3)))
y.B(d,e,0)
t=u.v(0,y)
this.cf(a,b,c,t.gC(t),t.gE(t),d,e)
return!1}],
cf:function(a,b,c,d,e,f,g){return!1},
eU:[function(a,b,c,d,e,f){},"$5","gaD",10,0,8],
eT:[function(a,b,c,d,e,f){},"$5","gaC",10,0,8],
b6:function(){if(!this.d)this.d=!0}},
fD:{
"^":"b;"},
aF:{
"^":"b;a,b,c,d",
n:function(a,b){if(b==null)return!1
return b instanceof F.aF&&J.R(b.a,this.a)&&J.R(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gt:function(a){return F.cu([J.v(this.a),J.v(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+H.c(this.a)+", y:"+H.c(this.b)+", w:"+this.c+", h:"+this.d}},
cU:{
"^":"b;a",
i:function(a){return C.x.h(0,this.a)}},
fG:{
"^":"b;a,b,c",
cY:function(a){if(this.a==null)this.a=F.aE(255,255,255,255)},
static:{bH:function(a){var z=new F.fG(a,C.e,1)
z.cY(a)
return z}}},
cS:{
"^":"b;a",
n:function(a,b){if(b==null)return!1
return b instanceof F.cS&&b.a===this.a},
gt:function(a){return F.cu([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
cX:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{aE:function(a,b,c,d){var z=new F.cS(0)
z.cX(a,b,c,d)
return z}}},
fF:{
"^":"cT;e,f,r,x,y,z,Q,ch,cx,a,b,c,d",
ce:function(a,b){var z,y,x,w
z=this.e
y=(a.gbp()-0)/z
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
y.cp(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bs(0,z,z,1)},
bd:function(a,b){var z,y
z=new F.aF(0,0,this.e,this.f)
b.b.push(z)
b.b4(a,z)
this.cQ(a,b)
y=b.b
if(0>=y.length)return H.h(y,-1)
y.pop()
if(y.length>0)b.b4(a,C.b.ga5(y))
else{y=a.a
b.b4(a,new F.aF(0,0,y.c,y.d))}},
ba:function(a,b){var z=F.bH(null)
z.a=this.ch
b.c4(a,new F.aF(0,0,this.e,this.f),z)}},
bI:{
"^":"b;",
seA:function(a){this.c$=a},
em:function(a){if(!this.e$){this.c$.c8(this)
this.e$=!0}this.c$.co(this,a)
this.ep()},
en:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.ga5(y).v(0,z))
b.aE()
this.c$.bd(a,b)
if(0>=y.length)return H.h(y,-1)
y.pop()
b.aE()},
V:function(a,b,c,d,e){a.ci(this.c$.c)
this.c$.cR(a,b,c,d,e)
a.cg()},
ci:function(a){var z=this.f$
z.push(C.b.ga5(z).v(0,a))},
cg:function(){var z=this.f$
if(0>=z.length)return H.h(z,-1)
z.pop()},
cw:function(){return C.b.ga5(this.f$)}}}],["","",,G,{
"^":"",
cV:function(a,b,c){var z,y
z=J.dT(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.c(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
fI:{
"^":"b;a,b,c,q:d'",
cZ:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a7(b)
y=C.d.a7(a)
x=C.m.dT(document,"canvas")
J.ei(x,z)
J.eh(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.ee(this.b,!0)},
static:{fJ:function(a,b){var z=new G.fI(null,null,null,null)
z.cZ(a,b)
return z}}},
fE:{
"^":"fD;u:c',q:d',a,b"},
fH:{
"^":"fC;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
eg:function(){var z,y,x,w,v,u
P.aO("#[A]# "+H.c(J.c5(this.d,35660)))
P.aO("#[B]# "+H.c(J.c5(this.d,33901)))
z=C.b.c9(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.c9(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.cV(x,35633,z)
v=G.cV(x,35632,y)
u=J.dS(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
P:function(a){this.r=1
this.ch=-0.5
J.c1(this.d,2960)
J.dU(this.d,515)
J.dO(this.d,0,0,0,1)
J.dP(this.d,1)
J.dQ(this.d,0)
J.c1(this.d,3042)
switch(-1){case-1:J.dK(this.d,32774)
J.dL(this.d,770,771,770,32772)
break}J.dN(this.d,17664)
C.b.sj(this.x,0)
C.b.sj(this.y,0)
C.b.sj(this.z,0)
this.Q=null},
b8:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.x
if(z.length!==0){y=this.y
F.aE(170,255,170,170)
J.c9(this.d,this.f)
x=J.aR(this.d,this.f,"a_tex")
w=J.bj(this.d)
J.bh(this.d,34962,w)
v=this.z
J.dM(this.d,34962,new Float32Array(H.b8(v)),35044)
J.aQ(this.d,x)
J.aS(this.d,x,2,5126,!1,0,0)
u=this.d
t=J.bj(u)
u.bindBuffer(34962,t)
u.bufferData(34962,new Float32Array(H.b8(z)),35044)
u.bindBuffer(34962,null)
J.bh(this.d,34962,t)
u=this.d
t=J.bj(u)
u.bindBuffer(34963,t)
u.bufferData(34963,new Uint16Array(H.b8(y)),35044)
u.bindBuffer(34963,null)
J.bh(this.d,34963,t)
u=this.d
u.uniformMatrix4fv(J.ef(u,this.f,"u_mat"),!1,new Float32Array(H.b8(this.cx.a)))
s=J.aR(this.d,this.f,"color")
r=J.aR(this.d,this.f,"vp")
q=J.aR(this.d,this.f,"useTex")
J.aS(this.d,r,3,5126,!1,32,0)
J.aS(this.d,s,4,5126,!1,32,12)
J.aS(this.d,q,1,5126,!1,32,28)
J.aQ(this.d,r)
J.aQ(this.d,s)
J.aQ(this.d,q)
J.dW(this.d,4,y.length,5123,0)
if(x!==0){J.dV(this.d,x)
J.dJ(this.d,3553,null)}J.c9(this.d,null)
C.b.sj(z,0)
C.b.sj(y,0)
C.b.sj(v,0)
this.Q=null}},
c4:function(a,b,c){if(c.b===C.e)this.c3(a,b,c)
else this.c5(a,b,c)},
c3:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=this.bZ()
y=b.a
x=b.b
w=J.a9(y,b.c)
v=J.a9(x,b.d)
u=new E.r(new Float64Array(H.m(3)))
u.B(y,x,0)
t=z.v(0,u)
u=new E.r(new Float64Array(H.m(3)))
u.B(y,v,0)
s=z.v(0,u)
u=new E.r(new Float64Array(H.m(3)))
u.B(w,x,0)
r=z.v(0,u)
u=new E.r(new Float64Array(H.m(3)))
u.B(w,v,0)
q=z.v(0,u)
u=c.a.a
this.ac(a,t,s,r,q,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)},
ac:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.x
y=z.length/8|0
C.b.b0(z,[b.gC(b),b.gE(b),this.ch,f,g,h,i,-1,c.gC(c),c.gE(c),this.ch,f,g,h,i,-1,d.gC(d),d.gE(d),this.ch,f,g,h,i,-1,e.gC(e),e.gE(e),this.ch,f,g,h,i,-1])
C.b.b0(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.b.b0(this.y,[y,z,x,z,y+3,x])},
c5:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.bZ()
y=b.a
x=J.aM(y)
w=x.k(y,c.c/2)
v=b.b
u=J.aM(v)
t=u.k(v,c.c/2)
s=J.aP(x.k(y,b.c),c.c/2)
r=J.aP(u.k(v,b.d),c.c/2)
v=new E.r(new Float64Array(H.m(3)))
v.B(w,t,0)
q=z.v(0,v)
v=J.aL(w)
u=v.m(w,c.c)
y=J.aL(t)
x=y.m(t,c.c)
p=new E.r(new Float64Array(H.m(3)))
p.B(u,x,0)
o=z.v(0,p)
p=new E.r(new Float64Array(H.m(3)))
p.B(w,r,0)
n=z.v(0,p)
v=v.m(w,c.c)
p=J.aM(r)
x=p.k(r,c.c)
u=new E.r(new Float64Array(H.m(3)))
u.B(v,x,0)
m=z.v(0,u)
u=new E.r(new Float64Array(H.m(3)))
u.B(s,t,0)
l=z.v(0,u)
u=J.aM(s)
x=u.k(s,c.c)
y=y.m(t,c.c)
v=new E.r(new Float64Array(H.m(3)))
v.B(x,y,0)
k=z.v(0,v)
v=new E.r(new Float64Array(H.m(3)))
v.B(s,r,0)
j=z.v(0,v)
u=u.k(s,c.c)
p=p.k(r,c.c)
v=new E.r(new Float64Array(H.m(3)))
v.B(u,p,0)
i=z.v(0,v)
v=c.a.a
h=(v>>>16&255)/255
g=(v>>>8&255)/255
f=(v>>>0&255)/255
e=(v>>>24&255)/255
this.ac(a,o,m,q,n,h,g,f,e)
this.ac(a,m,i,n,j,h,g,f,e)
this.ac(a,i,k,j,l,h,g,f,e)
this.ac(a,k,o,l,q,h,g,f,e)},
b4:function(a,b){var z
this.b8(0)
J.c_(this.d,!1,!1,!1,!1)
J.c0(this.d,!1)
J.c7(this.d,7680,7681,7681)
J.c6(this.d,519,this.r,255)
z=F.bH(null)
z.a=F.aE(255,255,255,255)
this.c4(null,b,z)
this.b8(0)
J.c_(this.d,!0,!0,!0,!0)
J.c0(this.d,!0)
J.c7(this.d,7680,7680,7680)
J.c6(this.d,515,this.r,255);++this.r},
aE:function(){},
bZ:function(){var z,y
this.cy.R()
z=this.cy.cp(0,-1,1,0)
this.cy=z
y=this.e
y=z.bs(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.v(0,C.b.ga5(this.a))
this.cy=y
return y}},
fK:{
"^":"fc;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gbp:function(){return this.a.c},
ep:function(){this.r=!0},
an:function(){var z=0,y=new P.cd(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
var $async$an=P.dn(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cF(new h.cg(Date.now(),!1))
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
p=new i.fH(50,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.eg()
i=p
i.P(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return P.a5(i.eF(new h.aj(15e3),null,null),$async$an,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.em(h.a7(u+k))
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
i.en(v,p)
i=p
i.b8(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.cU(o,m)
i=H
i.dA(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return P.a5(null,0,y,null)
case 1:return P.a5(w,1,y)}})
return P.a5(null,$async$an,y,null)},
eF:function(){var z,y,x,w
z=P.aC()
y=new G.fT(this,z)
x=new G.fS(this,z)
w=J.e5(this.a.b)
H.a(new W.J(0,w.a,w.b,W.K(x),!1),[H.x(w,0)]).G()
J.e6(this.a.b).cb(x)
x=J.e7(this.a.b)
H.a(new W.J(0,x.a,x.b,W.K(y),!1),[H.x(x,0)]).G()
x=J.e8(this.a.b)
H.a(new W.J(0,x.a,x.b,W.K(y),!1),[H.x(x,0)]).G()
x=J.e9(this.a.b)
H.a(new W.J(0,x.a,x.b,W.K(y),!1),[H.x(x,0)]).G()
J.ea(this.a.b).cb(y)},
eq:function(){var z,y
z={}
z.a=!1
y=J.dZ(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fL(z,this)),!1),[H.x(y,0)]).G()
y=J.e4(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fM(z,this)),!1),[H.x(y,0)]).G()
y=J.e_(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fN(z,this)),!1),[H.x(y,0)]).G()
y=J.e0(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fO(z,this)),!1),[H.x(y,0)]).G()
y=J.e1(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fP(z,this)),!1),[H.x(y,0)]).G()
y=J.e2(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fQ(z,this)),!1),[H.x(y,0)]).G()
y=J.e3(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fR(z,this)),!1),[H.x(y,0)]).G()}},
fc:{
"^":"b+bI;"},
fT:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c2(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.a7)(y),++v){u=y[v]
t=H.a(new P.E(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).a
s=J.c3(z.a.b)
if(typeof t!=="number")return t.m()
r=t-s
s=H.a(new P.E(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).b
t=J.c4(z.a.b)
if(typeof s!=="number")return s.m()
q=s-t
t=w.at(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.k()
z.V(z,s+1,"pointermove",r,q)}else{w.A(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.k()
z.V(z,t+1,"pointerdown",r,q)}}}},
fS:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c2(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.a7)(y),++v){u=y[v]
if(w.at(u.identifier)){t=H.a(new P.E(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).a
s=J.c3(z.a.b)
if(typeof t!=="number")return t.m()
r=H.a(new P.E(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).b
q=J.c4(z.a.b)
if(typeof r!=="number")return r.m()
w.a1(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.k()
z.V(z,p+1,"pointerup",t-s,r-q)}}}},
fL:{
"^":"e:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gI(a)
x=x.gC(x)
x.toString
y=y.gI(a)
y=y.gE(y)
y.toString
z.V(z,0,"pointerdown",x,y)}}},
fM:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gC(w)
w.toString
x=x.gI(a)
x=x.gE(x)
x.toString
z.V(z,0,"pointerup",w,x)
y.a=!1}}}},
fN:{
"^":"e:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fO:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gC(w)
w.toString
x=x.gI(a)
x=x.gE(x)
x.toString
z.V(z,0,"pointercancel",w,x)
y.a=!1}}}},
fP:{
"^":"e:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gI(a)
x=x.gC(x)
x.toString
y=y.gI(a)
y=y.gE(y)
y.toString
z.V(z,0,"pointermove",x,y)}}},
fQ:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gC(w)
w.toString
x=x.gI(a)
x=x.gE(x)
x.toString
z.V(z,0,"pointercancel",w,x)
y.a=!1}}}},
fR:{
"^":"e:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}}}],["","",,O,{
"^":"",
fe:{
"^":"cT;e,f,a,b,c,d",
cf:function(a,b,c,d,e,f,g){var z=this.f
z.A(0,b,[d,e])
if(c==="pointerup"||c==="pointercancel")z.a1(0,b)
return!1},
ba:function(a,b){var z,y,x,w
z=F.bH(null)
for(y=this.f,y=y.gbo(y),y=y.gD(y);y.p();){x=y.gw()
z.a=F.aE(255,0,255,255)
z.b=C.z
z.c=2.5
w=J.L(x)
w=new F.aF(J.aP(w.h(x,0),25),J.aP(w.h(x,1),25),50,50)
if(z.b===C.e)b.c3(null,w,z)
else b.c5(null,w,z)}}}}],["","",,E,{
"^":"",
O:{
"^":"b;a",
aa:function(a){var z,y
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
i:function(a){return"[0] "+this.am(0).i(0)+"\n[1] "+this.am(1).i(0)+"\n[2] "+this.am(2).i(0)+"\n[3] "+this.am(3).i(0)+"\n"},
ge3:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
A:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
z[b]=c},
am:function(a){var z,y,x
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
return new E.X(z)},
b5:function(a){var z=new E.O(new Float64Array(H.m(16)))
z.aa(this)
return z},
v:function(a,b){var z,y,x
if(!!b.$isX){z=new Float64Array(H.m(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.X(z)}if(!!b.$isr){z=new Float64Array(H.m(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.r(z)}if(4===b.ge3()){z=new Float64Array(H.m(16))
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
return new E.O(z)}throw H.d(P.bl(b))},
k:function(a,b){var z,y
z=new Float64Array(H.m(16))
y=this.a
z[0]=C.a.k(y[0],b.gl().h(0,0))
z[1]=C.a.k(y[1],b.gl().h(0,1))
z[2]=C.a.k(y[2],b.gl().h(0,2))
z[3]=C.a.k(y[3],b.gl().h(0,3))
z[4]=C.a.k(y[4],b.gl().h(0,4))
z[5]=C.a.k(y[5],b.gl().h(0,5))
z[6]=C.a.k(y[6],b.gl().h(0,6))
z[7]=C.a.k(y[7],b.gl().h(0,7))
z[8]=C.a.k(y[8],b.gl().h(0,8))
z[9]=C.a.k(y[9],b.gl().h(0,9))
z[10]=C.a.k(y[10],b.gl().h(0,10))
z[11]=C.a.k(y[11],b.gl().h(0,11))
z[12]=C.a.k(y[12],b.gl().h(0,12))
z[13]=C.a.k(y[13],b.gl().h(0,13))
z[14]=C.a.k(y[14],b.gl().h(0,14))
z[15]=C.a.k(y[15],b.gl().h(0,15))
return new E.O(z)},
m:function(a,b){var z,y
z=new Float64Array(H.m(16))
y=this.a
z[0]=C.a.m(y[0],b.gl().h(0,0))
z[1]=C.a.m(y[1],b.gl().h(0,1))
z[2]=C.a.m(y[2],b.gl().h(0,2))
z[3]=C.a.m(y[3],b.gl().h(0,3))
z[4]=C.a.m(y[4],b.gl().h(0,4))
z[5]=C.a.m(y[5],b.gl().h(0,5))
z[6]=C.a.m(y[6],b.gl().h(0,6))
z[7]=C.a.m(y[7],b.gl().h(0,7))
z[8]=C.a.m(y[8],b.gl().h(0,8))
z[9]=C.a.m(y[9],b.gl().h(0,9))
z[10]=C.a.m(y[10],b.gl().h(0,10))
z[11]=C.a.m(y[11],b.gl().h(0,11))
z[12]=C.a.m(y[12],b.gl().h(0,12))
z[13]=C.a.m(y[13],b.gl().h(0,13))
z[14]=C.a.m(y[14],b.gl().h(0,14))
z[15]=C.a.m(y[15],b.gl().h(0,15))
return new E.O(z)},
cp:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isX
x=y?b.gbp():1
if(!!z.$isr||y){w=z.gC(b)
v=z.gE(b)
u=z.geI(b)}else{u=d
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
eB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.cos(H.b9(a))
y=Math.sin(H.b9(a))
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
bs:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isX
x=y?b.gbp():1
if(!!z.$isr||y){w=z.gC(b)
v=z.gE(b)
u=z.geI(b)}else{u=d
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
ek:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
r:{
"^":"b;a",
B:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aa:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+"]"},
m:function(a,b){var z,y,x,w
z=this.a
y=C.a.m(z[0],b.gl().h(0,0))
x=C.a.m(z[1],b.gl().h(0,1))
z=C.a.m(z[2],b.gl().h(0,2))
w=new E.r(new Float64Array(H.m(3)))
w.B(y,x,z)
return w},
k:function(a,b){var z,y,x,w
z=this.a
y=C.a.k(z[0],b.gl().h(0,0))
x=C.a.k(z[1],b.gl().h(0,1))
z=C.a.k(z[2],b.gl().h(0,2))
w=new E.r(new Float64Array(H.m(3)))
w.B(y,x,z)
return w},
v:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.Q(b)
x=z[1]
z=z[2]
w=new E.r(new Float64Array(H.m(3)))
w.B(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
A:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.b9(y*y+x*x+z*z))},
b5:function(a){var z=new E.r(new Float64Array(H.m(3)))
z.aa(this)
return z},
gC:function(a){return this.a[0]},
gE:function(a){return this.a[1]}},
X:{
"^":"b;a",
aH:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aa:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+","+H.c(z[3])},
m:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.m(z[0],b.gl().h(0,0))
x=C.a.m(z[1],b.gl().h(0,1))
w=C.a.m(z[2],b.gl().h(0,2))
z=C.a.m(z[3],b.gl().h(0,3))
v=new E.X(new Float64Array(H.m(4)))
v.aH(y,x,w,z)
return v},
k:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.k(z[0],b.gl().h(0,0))
x=C.a.k(z[1],b.gl().h(0,1))
w=C.a.k(z[2],b.gl().h(0,2))
z=C.a.k(z[3],b.gl().h(0,3))
v=new E.X(new Float64Array(H.m(4)))
v.aH(y,x,w,z)
return v},
v:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.Q(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.X(new Float64Array(H.m(4)))
v.aH(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
A:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.b9(y*y+x*x+w*w+z*z))},
b5:function(a){var z=new E.X(new Float64Array(H.m(4)))
z.aa(this)
return z},
gC:function(a){return this.a[0]},
gE:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ct.prototype
return J.f_.prototype}if(typeof a=="string")return J.aX.prototype
if(a==null)return J.f0.prototype
if(typeof a=="boolean")return J.eZ.prototype
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aB.prototype
return a}if(a instanceof P.b)return a
return J.bd(a)}
J.L=function(a){if(typeof a=="string")return J.aX.prototype
if(a==null)return a
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aB.prototype
return a}if(a instanceof P.b)return a
return J.bd(a)}
J.aK=function(a){if(a==null)return a
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aB.prototype
return a}if(a instanceof P.b)return a
return J.bd(a)}
J.aL=function(a){if(typeof a=="number")return J.aA.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b4.prototype
return a}
J.aM=function(a){if(typeof a=="number")return J.aA.prototype
if(typeof a=="string")return J.aX.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b4.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aB.prototype
return a}if(a instanceof P.b)return a
return J.bd(a)}
J.a9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.aM(a).k(a,b)}
J.R=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).n(a,b)}
J.dG=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aL(a).aF(a,b)}
J.aP=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aL(a).m(a,b)}
J.bZ=function(a,b){if(a.constructor==Array||typeof a=="string"||H.ih(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).h(a,b)}
J.dH=function(a,b,c,d){return J.i(a).d2(a,b,c,d)}
J.dI=function(a,b,c,d){return J.i(a).dt(a,b,c,d)}
J.bh=function(a,b,c){return J.i(a).dB(a,b,c)}
J.dJ=function(a,b,c){return J.i(a).dC(a,b,c)}
J.dK=function(a,b){return J.i(a).dE(a,b)}
J.dL=function(a,b,c,d,e){return J.i(a).dF(a,b,c,d,e)}
J.dM=function(a,b,c,d){return J.i(a).dG(a,b,c,d)}
J.dN=function(a,b){return J.aK(a).dJ(a,b)}
J.dO=function(a,b,c,d,e){return J.i(a).dK(a,b,c,d,e)}
J.dP=function(a,b){return J.i(a).dL(a,b)}
J.dQ=function(a,b){return J.i(a).dM(a,b)}
J.c_=function(a,b,c,d,e){return J.i(a).dN(a,b,c,d,e)}
J.dR=function(a,b){return J.i(a).c2(a,b)}
J.bi=function(a,b,c){return J.L(a).dQ(a,b,c)}
J.bj=function(a){return J.i(a).dS(a)}
J.dS=function(a){return J.i(a).dV(a)}
J.dT=function(a,b){return J.i(a).dW(a,b)}
J.dU=function(a,b){return J.i(a).dX(a,b)}
J.c0=function(a,b){return J.i(a).dY(a,b)}
J.dV=function(a,b){return J.i(a).e4(a,b)}
J.dW=function(a,b,c,d,e){return J.i(a).e5(a,b,c,d,e)}
J.dX=function(a,b){return J.aK(a).U(a,b)}
J.c1=function(a,b){return J.i(a).e6(a,b)}
J.aQ=function(a,b){return J.i(a).e7(a,b)}
J.dY=function(a,b){return J.aK(a).H(a,b)}
J.c2=function(a){return J.i(a).gdI(a)}
J.U=function(a){return J.i(a).gaf(a)}
J.v=function(a){return J.l(a).gt(a)}
J.bk=function(a){return J.aK(a).gD(a)}
J.av=function(a){return J.L(a).gj(a)}
J.c3=function(a){return J.i(a).ger(a)}
J.c4=function(a){return J.i(a).ges(a)}
J.dZ=function(a){return J.i(a).gav(a)}
J.e_=function(a){return J.i(a).gaw(a)}
J.e0=function(a){return J.i(a).gax(a)}
J.e1=function(a){return J.i(a).gay(a)}
J.e2=function(a){return J.i(a).gaz(a)}
J.e3=function(a){return J.i(a).gaA(a)}
J.e4=function(a){return J.i(a).gaB(a)}
J.e5=function(a){return J.i(a).gbb(a)}
J.e6=function(a){return J.i(a).gaC(a)}
J.e7=function(a){return J.i(a).geu(a)}
J.e8=function(a){return J.i(a).gev(a)}
J.e9=function(a){return J.i(a).gbc(a)}
J.ea=function(a){return J.i(a).gaD(a)}
J.eb=function(a){return J.i(a).gbn(a)}
J.ec=function(a){return J.i(a).gC(a)}
J.aR=function(a,b,c){return J.i(a).cs(a,b,c)}
J.ed=function(a){return J.i(a).ct(a)}
J.ee=function(a,b){return J.i(a).cu(a,b)}
J.c5=function(a,b){return J.i(a).cz(a,b)}
J.ef=function(a,b,c){return J.i(a).cA(a,b,c)}
J.eg=function(a,b){return J.aK(a).a6(a,b)}
J.eh=function(a,b){return J.i(a).sq(a,b)}
J.ei=function(a,b){return J.i(a).su(a,b)}
J.c6=function(a,b,c,d){return J.i(a).cK(a,b,c,d)}
J.c7=function(a,b,c,d){return J.i(a).cL(a,b,c,d)}
J.c8=function(a){return J.aL(a).a7(a)}
J.ah=function(a){return J.l(a).i(a)}
J.c9=function(a,b){return J.i(a).eG(a,b)}
J.aS=function(a,b,c,d,e,f,g){return J.i(a).eH(a,b,c,d,e,f,g)}
var $=I.p
C.m=W.eI.prototype
C.n=J.f.prototype
C.b=J.az.prototype
C.d=J.ct.prototype
C.a=J.aA.prototype
C.h=J.aX.prototype
C.w=J.aB.prototype
C.y=J.fd.prototype
C.A=J.b4.prototype
C.k=new H.cm()
C.l=new P.h7()
C.c=new P.hB()
C.f=new P.aj(0)
C.o=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.p=function(hooks) {
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
C.i=function getTagFallback(o) {
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
C.j=function(hooks) { return hooks; }

C.q=function(getTagFallback) {
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
C.t=function(hooks) {
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
C.r=function() {
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
C.u=function(hooks) {
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
C.v=function(_, letter) { return letter.toUpperCase(); }
C.x=new H.eH([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.cU(0)
C.z=new F.cU(1)
$.cG="$cachedFunction"
$.cH="$cachedInvocation"
$.S=0
$.ai=null
$.ca=null
$.bV=null
$.dp=null
$.dB=null
$.bb=null
$.be=null
$.bW=null
$.ae=null
$.aq=null
$.ar=null
$.bQ=!1
$.k=C.c
$.cp=0
$.ck=null
$.cj=null
$.ci=null
$.ch=null
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
I.$lazy(y,x,w)}})(["cf","$get$cf",function(){return init.getIsolateTag("_$dart_dartClosure")},"cr","$get$cr",function(){return H.eU()},"cs","$get$cs",function(){return new P.eD(null)},"cW","$get$cW",function(){return H.T(H.b3({toString:function(){return"$receiver$"}}))},"cX","$get$cX",function(){return H.T(H.b3({$method$:null,toString:function(){return"$receiver$"}}))},"cY","$get$cY",function(){return H.T(H.b3(null))},"cZ","$get$cZ",function(){return H.T(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d2","$get$d2",function(){return H.T(H.b3(void 0))},"d3","$get$d3",function(){return H.T(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d0","$get$d0",function(){return H.T(H.d1(null))},"d_","$get$d_",function(){return H.T(function(){try{null.$method$}catch(z){return z.message}}())},"d5","$get$d5",function(){return H.T(H.d1(void 0))},"d4","$get$d4",function(){return H.T(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bL","$get$bL",function(){return P.fW()},"at","$get$at",function(){return[]},"ce","$get$ce",function(){return{}}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[W.bz]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,P.a1]},{func:1,args:[,],opt:[,]},{func:1,ret:P.P,args:[P.n]},{func:1,v:true,args:[F.bI,P.n,P.P,P.a8,P.a8]},{func:1,args:[W.bK]},{func:1,args:[,P.P]},{func:1,args:[P.P]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.n,,]},{func:1,v:true,args:[,],opt:[P.a1]},{func:1,ret:P.bS},{func:1,v:true,args:[P.b],opt:[P.a1]},{func:1,v:true,args:[,P.a1]},{func:1,args:[,,]},{func:1,args:[P.P,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.ip(d||a)
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
Isolate.bc=a.bc
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dD(F.dy(),b)},[])
else (function(b){H.dD(F.dy(),b)})([])})})()