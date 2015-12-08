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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bV"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bV"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bV(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bb=function(){}
var dart=[["","",,H,{
"^":"",
j9:{
"^":"b;a"}}],["","",,J,{
"^":"",
n:function(a){return void 0},
be:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bc:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bY==null){H.ig()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.d6("Return interceptor for "+H.c(y(a,z))))}w=H.iq(a)
if(w==null){if(typeof a=="function")return C.x
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.z
else return C.A}return w},
f:{
"^":"b;",
m:function(a,b){return a===b},
gA:function(a){return H.a1(a)},
i:["cY",function(a){return H.b_(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
eZ:{
"^":"f;",
i:function(a){return String(a)},
gA:function(a){return a?519018:218159},
$isbU:1},
f0:{
"^":"f;",
m:function(a,b){return null==b},
i:function(a){return"null"},
gA:function(a){return 0}},
bs:{
"^":"f;",
gA:function(a){return 0},
i:["cZ",function(a){return String(a)}],
$isf1:1},
ff:{
"^":"bs;"},
b3:{
"^":"bs;"},
aD:{
"^":"bs;",
i:function(a){var z=a[$.$get$cg()]
return z==null?this.cZ(a):J.ah(z)}},
aB:{
"^":"f;",
c8:function(a,b){if(!!a.immutable$list)throw H.d(new P.F(b))},
c7:function(a,b){if(!!a.fixed$length)throw H.d(new P.F(b))},
D:function(a,b){var z,y
this.c7(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.Q)(b),++y)a.push(b[y])},
H:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.H(a))}},
a8:function(a,b){return H.a(new H.by(a,b),[null,null])},
cg:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.c(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
W:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
gem:function(a){if(a.length>0)return a[0]
throw H.d(H.br())},
ga7:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.br())},
bz:function(a,b,c,d,e){var z,y,x
this.c8(a,"set range")
P.cK(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.v(P.al(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.eX())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
cT:function(a,b){var z,y,x,w
this.c8(a,"shuffle")
z=a.length
for(;z>1;){y=C.f.eH(z);--z
x=a.length
if(z>=x)return H.h(a,z)
w=a[z]
if(y<0||y>=x)return H.h(a,y)
this.w(a,z,a[y])
this.w(a,y,w)}},
cS:function(a){return this.cT(a,null)},
i:function(a){return P.aT(a,"[","]")},
gE:function(a){return new J.ek(a,a.length,0,null)},
gA:function(a){return H.a1(a)},
gj:function(a){return a.length},
sj:function(a,b){this.c7(a,"set length")
if(b<0)throw H.d(P.al(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.u(a,b))
if(b>=a.length||b<0)throw H.d(H.u(a,b))
return a[b]},
w:function(a,b,c){if(!!a.immutable$list)H.v(new P.F("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.u(a,b))
if(b>=a.length||b<0)throw H.d(H.u(a,b))
a[b]=c},
$isaU:1,
$isk:1,
$ask:null,
$isq:1},
j8:{
"^":"aB;"},
ek:{
"^":"b;a,b,c,d",
gC:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.Q(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aC:{
"^":"f;",
bm:function(a,b){return a%b},
aa:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.F(""+a))},
F:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.F(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.d(H.af(b))
return a+b},
d3:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aa(a/b)},
ag:function(a,b){return(a|0)===a?a/b|0:this.aa(a/b)},
b2:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aL:function(a,b){if(typeof b!=="number")throw H.d(H.af(b))
return a<b},
$isaM:1},
cu:{
"^":"aC;",
$isaM:1,
$iso:1},
f_:{
"^":"aC;",
$isaM:1},
aV:{
"^":"f;",
k:function(a,b){if(typeof b!=="string")throw H.d(P.ej(b,null,null))
return a+b},
cX:function(a,b,c){H.dq(b)
if(c==null)c=a.length
H.dq(c)
if(b<0)throw H.d(P.b0(b,null,null))
if(typeof c!=="number")return H.U(c)
if(b>c)throw H.d(P.b0(b,null,null))
if(c>a.length)throw H.d(P.b0(c,null,null))
return a.substring(b,c)},
cW:function(a,b){return this.cX(a,b,null)},
e1:function(a,b,c){if(c>a.length)throw H.d(P.al(c,0,a.length,null,null))
return H.iv(a,b,c)},
gM:function(a){return a.length===0},
i:function(a){return a},
gA:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.u(a,b))
if(b>=a.length||b<0)throw H.d(H.u(a,b))
return a[b]},
$isaU:1,
$isN:1}}],["","",,H,{
"^":"",
aI:function(a,b){var z=a.aj(b)
if(!init.globalState.d.cy)init.globalState.f.an()
return z},
dD:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isk)throw H.d(P.bk("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.hA(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cs()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.he(P.bw(null,H.aH),0)
y.z=H.a(new H.a_(0,null,null,null,null,null,0),[P.o,H.bP])
y.ch=H.a(new H.a_(0,null,null,null,null,null,0),[P.o,null])
if(y.x===!0){x=new H.hz()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eQ,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hB)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.a(new H.a_(0,null,null,null,null,null,0),[P.o,H.b1])
w=P.ak(null,null,null,P.o)
v=new H.b1(0,null,!1)
u=new H.bP(y,x,w,init.createNewIsolate(),v,new H.aa(H.bf()),new H.aa(H.bf()),!1,!1,[],P.ak(null,null,null,null),null,null,!1,!0,P.ak(null,null,null,null))
w.a6(0,0)
u.bC(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aK()
x=H.ag(y,[y]).a0(a)
if(x)u.aj(new H.it(z,a))
else{y=H.ag(y,[y,y]).a0(a)
if(y)u.aj(new H.iu(z,a))
else u.aj(a)}init.globalState.f.an()},
eU:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eV()
return},
eV:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.F("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.F("Cannot extract URI from \""+H.c(z)+"\""))},
eQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b5(!0,[]).a1(b.data)
y=J.P(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b5(!0,[]).a1(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b5(!0,[]).a1(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.a(new H.a_(0,null,null,null,null,null,0),[P.o,H.b1])
p=P.ak(null,null,null,P.o)
o=new H.b1(0,null,!1)
n=new H.bP(y,q,p,init.createNewIsolate(),o,new H.aa(H.bf()),new H.aa(H.bf()),!1,!1,[],P.ak(null,null,null,null),null,null,!1,!0,P.ak(null,null,null,null))
p.a6(0,0)
n.bC(0,o)
init.globalState.f.a.V(new H.aH(n,new H.eR(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.an()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").Z(y.h(z,"msg"))
init.globalState.f.an()
break
case"close":init.globalState.ch.a9(0,$.$get$ct().h(0,a))
a.terminate()
init.globalState.f.an()
break
case"log":H.eP(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ab(["command","print","msg",z])
q=new H.ac(!0,P.ap(null,P.o)).J(q)
y.toString
self.postMessage(q)}else P.aN(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
eP:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ab(["command","log","msg",a])
x=new H.ac(!0,P.ap(null,P.o)).J(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.w(w)
throw H.d(P.aS(z))}},
eS:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cH=$.cH+("_"+y)
$.cI=$.cI+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.Z(["spawned",new H.b7(y,x),w,z.r])
x=new H.eT(a,b,c,d,z)
if(e===!0){z.c2(w,w)
init.globalState.f.a.V(new H.aH(z,x,"start isolate"))}else x.$0()},
hV:function(a){return new H.b5(!0,[]).a1(new H.ac(!1,P.ap(null,P.o)).J(a))},
it:{
"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iu:{
"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hA:{
"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hB:function(a){var z=P.ab(["command","print","msg",a])
return new H.ac(!0,P.ap(null,P.o)).J(z)}}},
bP:{
"^":"b;a,b,c,eB:d<,e2:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
c2:function(a,b){if(!this.f.m(0,a))return
if(this.Q.a6(0,b)&&!this.y)this.y=!0
this.b4()},
eQ:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a9(0,a)
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
if(w===y.c)y.bL();++y.d}this.y=!1}this.b4()},
dM:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eP:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.v(new P.F("removeRange"))
P.cK(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cQ:function(a,b){if(!this.r.m(0,a))return
this.db=b},
eq:function(a,b,c){var z=J.n(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){a.Z(c)
return}z=this.cx
if(z==null){z=P.bw(null,null)
this.cx=z}z.V(new H.hu(a,c))},
eo:function(a,b){var z
if(!this.r.m(0,a))return
z=J.n(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){this.bd()
return}z=this.cx
if(z==null){z=P.bw(null,null)
this.cx=z}z.V(this.geE())},
er:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aN(a)
if(b!=null)P.aN(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.ah(a)
y[1]=b==null?null:J.ah(b)
for(x=new P.cw(z,z.r,null,null),x.c=z.e;x.v();)x.d.Z(y)},
aj:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.z(u)
w=t
v=H.w(u)
this.er(w,v)
if(this.db===!0){this.bd()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geB()
if(this.cx!=null)for(;t=this.cx,!t.gM(t);)this.cx.cq().$0()}return y},
cl:function(a){return this.b.h(0,a)},
bC:function(a,b){var z=this.b
if(z.ay(a))throw H.d(P.aS("Registry: ports must be registered only once."))
z.w(0,a,b)},
b4:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.w(0,this.a,this)
else this.bd()},
bd:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.S(0)
for(z=this.b,y=z.gcA(z),y=y.gE(y);y.v();)y.gC().di()
z.S(0)
this.c.S(0)
init.globalState.z.a9(0,this.a)
this.dx.S(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.Z(z[v])}this.ch=null}},"$0","geE",0,0,1]},
hu:{
"^":"e:1;a,b",
$0:function(){this.a.Z(this.b)}},
he:{
"^":"b;a,b",
ea:function(){var z=this.a
if(z.b===z.c)return
return z.cq()},
cu:function(){var z,y,x
z=this.ea()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ay(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gM(y)}else y=!1
else y=!1
else y=!1
if(y)H.v(P.aS("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gM(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ab(["command","close"])
x=new H.ac(!0,H.a(new P.dd(0,null,null,null,null,null,0),[null,P.o])).J(x)
y.toString
self.postMessage(x)}return!1}z.eO()
return!0},
bX:function(){if(self.window!=null)new H.hf(this).$0()
else for(;this.cu(););},
an:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bX()
else try{this.bX()}catch(x){w=H.z(x)
z=w
y=H.w(x)
w=init.globalState.Q
v=P.ab(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.ac(!0,P.ap(null,P.o)).J(v)
w.toString
self.postMessage(v)}}},
hf:{
"^":"e:1;a",
$0:function(){if(!this.a.cu())return
P.cR(C.h,this)}},
aH:{
"^":"b;a,b,c",
eO:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aj(this.b)}},
hz:{
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
x=H.aK()
w=H.ag(x,[x,x]).a0(y)
if(w)y.$2(this.b,this.c)
else{x=H.ag(x,[x]).a0(y)
if(x)y.$1(this.b)
else y.$0()}}z.b4()}},
d8:{
"^":"b;"},
b7:{
"^":"d8;b,a",
Z:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbO())return
x=H.hV(a)
if(z.ge2()===y){y=J.P(x)
switch(y.h(x,0)){case"pause":z.c2(y.h(x,1),y.h(x,2))
break
case"resume":z.eQ(y.h(x,1))
break
case"add-ondone":z.dM(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eP(y.h(x,1))
break
case"set-errors-fatal":z.cQ(y.h(x,1),y.h(x,2))
break
case"ping":z.eq(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.eo(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a6(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a9(0,y)
break}return}y=init.globalState.f
w="receive "+H.c(a)
y.a.V(new H.aH(z,new H.hD(this,x),w))},
m:function(a,b){if(b==null)return!1
return b instanceof H.b7&&J.Y(this.b,b.b)},
gA:function(a){return this.b.gaZ()}},
hD:{
"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbO())z.dd(this.b)}},
bQ:{
"^":"d8;b,c,a",
Z:function(a){var z,y,x
z=P.ab(["command","message","port",this,"msg",a])
y=new H.ac(!0,P.ap(null,P.o)).J(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
m:function(a,b){if(b==null)return!1
return b instanceof H.bQ&&J.Y(this.b,b.b)&&J.Y(this.a,b.a)&&J.Y(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cR()
y=this.a
if(typeof y!=="number")return y.cR()
x=this.c
if(typeof x!=="number")return H.U(x)
return(z<<16^y<<8^x)>>>0}},
b1:{
"^":"b;aZ:a<,b,bO:c<",
di:function(){this.c=!0
this.b=null},
dd:function(a){if(this.c)return
this.du(a)},
du:function(a){return this.b.$1(a)},
$isfi:1},
fB:{
"^":"b;a,b,c",
d6:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.V(new H.aH(y,new H.fD(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.au(new H.fE(this,b),0),a)}else throw H.d(new P.F("Timer greater than 0."))},
static:{fC:function(a,b){var z=new H.fB(!0,!1,null)
z.d6(a,b)
return z}}},
fD:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fE:{
"^":"e:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aa:{
"^":"b;aZ:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.eZ()
z=C.a.b2(z,0)^C.a.ag(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
m:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aa){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ac:{
"^":"b;a,b",
J:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.w(0,a,z.gj(z))
z=J.n(a)
if(!!z.$iscA)return["buffer",a]
if(!!z.$isbC)return["typed",a]
if(!!z.$isaU)return this.cM(a)
if(!!z.$iseO){x=this.gcJ()
w=a.gci()
w=H.aY(w,x,H.L(w,"I",0),null)
w=P.bx(w,!0,H.L(w,"I",0))
z=z.gcA(a)
z=H.aY(z,x,H.L(z,"I",0),null)
return["map",w,P.bx(z,!0,H.L(z,"I",0))]}if(!!z.$isf1)return this.cN(a)
if(!!z.$isf)this.cz(a)
if(!!z.$isfi)this.ao(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb7)return this.cO(a)
if(!!z.$isbQ)return this.cP(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.ao(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaa)return["capability",a.a]
if(!(a instanceof P.b))this.cz(a)
return["dart",init.classIdExtractor(a),this.cL(init.classFieldsExtractor(a))]},"$1","gcJ",2,0,2],
ao:function(a,b){throw H.d(new P.F(H.c(b==null?"Can't transmit:":b)+" "+H.c(a)))},
cz:function(a){return this.ao(a,null)},
cM:function(a){var z=this.cK(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ao(a,"Can't serialize indexable: ")},
cK:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.J(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cL:function(a){var z
for(z=0;z<a.length;++z)C.b.w(a,z,this.J(a[z]))
return a},
cN:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ao(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.J(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cP:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cO:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaZ()]
return["raw sendport",a]}},
b5:{
"^":"b;a,b",
a1:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.bk("Bad serialized message: "+H.c(a)))
switch(C.b.gem(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=H.a(this.ah(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return H.a(this.ah(x),[null])
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ah(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.a(this.ah(x),[null])
y.fixed$length=Array
return y
case"map":return this.ed(a)
case"sendport":return this.ee(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.ec(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.aa(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ah(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.c(a))}},"$1","geb",2,0,2],
ah:function(a){var z,y,x
z=J.P(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.U(x)
if(!(y<x))break
z.w(a,y,this.a1(z.h(a,y)));++y}return a},
ed:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aX()
this.b.push(w)
y=J.eg(y,this.geb()).br(0)
for(z=J.P(y),v=J.P(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.w(0,y[u],this.a1(v.h(x,u)))}return w},
ee:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.Y(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cl(w)
if(u==null)return
t=new H.b7(u,x)}else t=new H.bQ(y,w,x)
this.b.push(t)
return t},
ec:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.P(y)
v=J.P(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.U(t)
if(!(u<t))break
w[z.h(y,u)]=this.a1(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
er:function(){throw H.d(new P.F("Cannot modify unmodifiable Map"))},
ia:function(a){return init.types[a]},
ip:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.n(a).$isaW},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ah(a)
if(typeof z!=="string")throw H.d(H.af(a))
return z},
a1:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cJ:function(a){var z,y,x,w,v,u,t,s
z=J.n(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.o||!!J.n(a).$isb3){v=C.j(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof t==="string"&&/^\w+$/.test(t))w=t}if(w==null)w=v}else w=v}w=w
if(w.length>1)s=w.charCodeAt(0)===36
else s=!1
if(s)w=C.i.cW(w,1)
return(w+H.dw(H.bW(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b_:function(a){return"Instance of '"+H.cJ(a)+"'"},
D:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cG:function(a){return a.b?H.D(a).getUTCMilliseconds()+0:H.D(a).getMilliseconds()+0},
aZ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.af(a))
return a[b]},
bE:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.af(a))
a[b]=c},
U:function(a){throw H.d(H.af(a))},
h:function(a,b){if(a==null)J.aw(a)
throw H.d(H.u(a,b))},
u:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a9(!0,b,"index",null)
z=J.aw(a)
if(!(b<0)){if(typeof z!=="number")return H.U(z)
y=b>=z}else y=!0
if(y)return P.bq(b,a,"index",null,z)
return P.b0(b,"index",null)},
af:function(a){return new P.a9(!0,a,null,null)},
a7:function(a){return a},
dq:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.af(a))
return a},
d:function(a){var z
if(a==null)a=new P.bD()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dF})
z.name=""}else z.toString=H.dF
return z},
dF:function(){return J.ah(this.dartException)},
v:function(a){throw H.d(a)},
Q:function(a){throw H.d(new P.H(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ix(a)
if(a==null)return
if(a instanceof H.bp)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.b2(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bt(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.cF(v,null))}}if(a instanceof TypeError){u=$.$get$cV()
t=$.$get$cW()
s=$.$get$cX()
r=$.$get$cY()
q=$.$get$d1()
p=$.$get$d2()
o=$.$get$d_()
$.$get$cZ()
n=$.$get$d4()
m=$.$get$d3()
l=u.O(y)
if(l!=null)return z.$1(H.bt(y,l))
else{l=t.O(y)
if(l!=null){l.method="call"
return z.$1(H.bt(y,l))}else{l=s.O(y)
if(l==null){l=r.O(y)
if(l==null){l=q.O(y)
if(l==null){l=p.O(y)
if(l==null){l=o.O(y)
if(l==null){l=r.O(y)
if(l==null){l=n.O(y)
if(l==null){l=m.O(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cF(y,l==null?null:l.method))}}return z.$1(new H.fZ(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cN()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a9(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cN()
return a},
w:function(a){var z
if(a instanceof H.bp)return a.b
if(a==null)return new H.de(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.de(a,null)},
is:function(a){if(a==null||typeof a!='object')return J.A(a)
else return H.a1(a)},
ds:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.w(0,a[y],a[x])}return b},
ii:function(a,b,c,d,e,f,g){var z=J.n(c)
if(z.m(c,0))return H.aI(b,new H.ij(a))
else if(z.m(c,1))return H.aI(b,new H.ik(a,d))
else if(z.m(c,2))return H.aI(b,new H.il(a,d,e))
else if(z.m(c,3))return H.aI(b,new H.im(a,d,e,f))
else if(z.m(c,4))return H.aI(b,new H.io(a,d,e,f,g))
else throw H.d(P.aS("Unsupported number of arguments for wrapped closure"))},
au:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ii)
a.$identity=z
return z},
ep:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isk){z.$reflectionInfo=c
x=H.fl(z).r}else x=c
w=d?Object.create(new H.fq().constructor.prototype):Object.create(new H.bl(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.R
$.R=J.av(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ce(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ia(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cd:H.bm
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ce(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
em:function(a,b,c,d){var z=H.bm
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ce:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eo(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.em(y,!w,z,b)
if(y===0){w=$.ai
if(w==null){w=H.aR("self")
$.ai=w}w="return function(){return this."+H.c(w)+"."+H.c(z)+"();"
v=$.R
$.R=J.av(v,1)
return new Function(w+H.c(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ai
if(v==null){v=H.aR("self")
$.ai=v}v=w+H.c(v)+"."+H.c(z)+"("+u+");"
w=$.R
$.R=J.av(w,1)
return new Function(v+H.c(w)+"}")()},
en:function(a,b,c,d){var z,y
z=H.bm
y=H.cd
switch(b?-1:a){case 0:throw H.d(new H.fm("Intercepted function with no arguments."))
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
y=$.cc
if(y==null){y=H.aR("receiver")
$.cc=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.en(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.R
$.R=J.av(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.R
$.R=J.av(u,1)
return new Function(y+H.c(u)+"}")()},
bV:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.ep(a,b,z,!!d,e,f)},
iw:function(a){throw H.d(new P.eu("Cyclic initialization for static "+H.c(a)))},
ag:function(a,b,c){return new H.fn(a,b,c,null)},
aK:function(){return C.l},
bf:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a:function(a,b){a.$builtinTypeInfo=b
return a},
bW:function(a){if(a==null)return
return a.$builtinTypeInfo},
du:function(a,b){return H.dE(a["$as"+H.c(b)],H.bW(a))},
L:function(a,b,c){var z=H.du(a,b)
return z==null?null:z[c]},
x:function(a,b){var z=H.bW(a)
return z==null?null:z[b]},
c_:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dw(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dw:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bG("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.c(H.c_(u,c))}return w?"":"<"+H.c(z)+">"},
dE:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
i3:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.G(a[y],b[y]))return!1
return!0},
b9:function(a,b,c){return a.apply(b,H.du(b,c))},
G:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dv(a,b)
if('func' in a)return b.builtin$cls==="j3"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c_(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.c(H.c_(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.i3(H.dE(v,z),x)},
dn:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.G(z,v)||H.G(v,z)))return!1}return!0},
i2:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.G(v,u)||H.G(u,v)))return!1}return!0},
dv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.G(z,y)||H.G(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dn(x,w,!1))return!1
if(!H.dn(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.G(o,n)||H.G(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.G(o,n)||H.G(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.G(o,n)||H.G(n,o)))return!1}}return H.i2(a.named,b.named)},
jT:function(a){var z=$.bX
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jS:function(a){return H.a1(a)},
jR:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iq:function(a){var z,y,x,w,v,u
z=$.bX.$1(a)
y=$.ba[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bd[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dm.$2(a,z)
if(z!=null){y=$.ba[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bd[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bZ(x)
$.ba[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bd[z]=x
return x}if(v==="-"){u=H.bZ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dz(a,x)
if(v==="*")throw H.d(new P.d6(z))
if(init.leafTags[z]===true){u=H.bZ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dz(a,x)},
dz:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.be(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bZ:function(a){return J.be(a,!1,null,!!a.$isaW)},
ir:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.be(z,!1,null,!!z.$isaW)
else return J.be(z,c,null,null)},
ig:function(){if(!0===$.bY)return
$.bY=!0
H.ih()},
ih:function(){var z,y,x,w,v,u,t,s
$.ba=Object.create(null)
$.bd=Object.create(null)
H.ib()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dB.$1(v)
if(u!=null){t=H.ir(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ib:function(){var z,y,x,w,v,u,t
z=C.t()
z=H.ae(C.p,H.ae(C.v,H.ae(C.k,H.ae(C.k,H.ae(C.u,H.ae(C.q,H.ae(C.r(C.j),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bX=new H.ic(v)
$.dm=new H.id(u)
$.dB=new H.ie(t)},
ae:function(a,b){return a(b)||b},
iv:function(a,b,c){return a.indexOf(b,c)>=0},
eq:{
"^":"b;",
i:function(a){return P.cz(this)},
w:function(a,b,c){return H.er()}},
eH:{
"^":"eq;a",
aY:function(){var z=this.$map
if(z==null){z=new H.a_(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.ds(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aY().h(0,b)},
H:function(a,b){this.aY().H(0,b)},
gj:function(a){var z=this.aY()
return z.gj(z)}},
fk:{
"^":"b;a,b,c,d,e,f,r,x",
static:{fl:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fk(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fY:{
"^":"b;a,b,c,d,e,f",
O:function(a){var z,y,x
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
return new H.fY(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b2:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d0:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cF:{
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
fZ:{
"^":"B;a",
i:function(a){var z=this.a
return C.i.gM(z)?"Error":"Error: "+z}},
bp:{
"^":"b;a,U:b<"},
ix:{
"^":"e:2;a",
$1:function(a){if(!!J.n(a).$isB)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
de:{
"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ij:{
"^":"e:0;a",
$0:function(){return this.a.$0()}},
ik:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
il:{
"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
im:{
"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
io:{
"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{
"^":"b;",
i:function(a){return"Closure '"+H.cJ(this)+"'"},
gcB:function(){return this},
gcB:function(){return this}},
cP:{
"^":"e;"},
fq:{
"^":"cP;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bl:{
"^":"cP;a,b,c,d",
m:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bl))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.a1(this.a)
else y=typeof z!=="object"?J.A(z):H.a1(z)
z=H.a1(this.b)
if(typeof y!=="number")return y.f_()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.b_(z)},
static:{bm:function(a){return a.a},cd:function(a){return a.c},el:function(){var z=$.ai
if(z==null){z=H.aR("self")
$.ai=z}return z},aR:function(a){var z,y,x,w,v
z=new H.bl("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fm:{
"^":"B;a",
i:function(a){return"RuntimeError: "+H.c(this.a)}},
cM:{
"^":"b;"},
fn:{
"^":"cM;a,b,c,d",
a0:function(a){var z=this.dq(a)
return z==null?!1:H.dv(z,this.ab())},
dq:function(a){var z=J.n(a)
return"$signature" in z?z.$signature():null},
ab:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.n(y)
if(!!x.$isjB)z.v=true
else if(!x.$iscn)z.ret=y.ab()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cL(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cL(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dr(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ab()}z.named=w}return z},
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
t=H.dr(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.c(z[s].ab())+" "+s}x+="}"}}return x+(") -> "+H.c(this.a))},
static:{cL:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ab())
return z}}},
cn:{
"^":"cM;",
i:function(a){return"dynamic"},
ab:function(){return}},
a_:{
"^":"b;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gM:function(a){return this.a===0},
gci:function(){return H.a(new H.f5(this),[H.x(this,0)])},
gcA:function(a){return H.aY(this.gci(),new H.f2(this),H.x(this,0),H.x(this,1))},
ay:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.dl(z,a)}else return this.ew(a)},
ew:function(a){var z=this.d
if(z==null)return!1
return this.al(this.R(z,this.ak(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.R(z,b)
return y==null?null:y.ga2()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.R(x,b)
return y==null?null:y.ga2()}else return this.ex(b)},
ex:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.R(z,this.ak(a))
x=this.al(y,a)
if(x<0)return
return y[x].ga2()},
w:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.b_()
this.b=z}this.bB(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.b_()
this.c=y}this.bB(y,b,c)}else{x=this.d
if(x==null){x=this.b_()
this.d=x}w=this.ak(b)
v=this.R(x,w)
if(v==null)this.b1(x,w,[this.b0(b,c)])
else{u=this.al(v,b)
if(u>=0)v[u].sa2(c)
else v.push(this.b0(b,c))}}},
a9:function(a,b){if(typeof b==="string")return this.bW(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bW(this.c,b)
else return this.ey(b)},
ey:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.R(z,this.ak(a))
x=this.al(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.c0(w)
return w.ga2()},
S:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.d(new P.H(this))
z=z.c}},
bB:function(a,b,c){var z=this.R(a,b)
if(z==null)this.b1(a,b,this.b0(b,c))
else z.sa2(c)},
bW:function(a,b){var z
if(a==null)return
z=this.R(a,b)
if(z==null)return
this.c0(z)
this.bI(a,b)
return z.ga2()},
b0:function(a,b){var z,y
z=new H.f4(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c0:function(a){var z,y
z=a.gdF()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ak:function(a){return J.A(a)&0x3ffffff},
al:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Y(a[y].gce(),b))return y
return-1},
i:function(a){return P.cz(this)},
R:function(a,b){return a[b]},
b1:function(a,b,c){a[b]=c},
bI:function(a,b){delete a[b]},
dl:function(a,b){return this.R(a,b)!=null},
b_:function(){var z=Object.create(null)
this.b1(z,"<non-identifier-key>",z)
this.bI(z,"<non-identifier-key>")
return z},
$iseO:1},
f2:{
"^":"e:2;a",
$1:function(a){return this.a.h(0,a)}},
f4:{
"^":"b;ce:a<,a2:b@,c,dF:d<"},
f5:{
"^":"I;a",
gj:function(a){return this.a.a},
gE:function(a){var z,y
z=this.a
y=new H.f6(z,z.r,null,null)
y.c=z.e
return y},
H:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.H(z))
y=y.c}},
$isq:1},
f6:{
"^":"b;a,b,c,d",
gC:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.H(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ic:{
"^":"e:2;a",
$1:function(a){return this.a(a)}},
id:{
"^":"e:10;a",
$2:function(a,b){return this.a(a,b)}},
ie:{
"^":"e:11;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
br:function(){return new P.am("No element")},
eX:function(){return new P.am("Too few elements")},
bu:{
"^":"I;",
gE:function(a){return new H.cx(this,this.gj(this),0,null)},
H:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.W(0,y))
if(z!==this.gj(this))throw H.d(new P.H(this))}},
a8:function(a,b){return H.a(new H.by(this,b),[null,null])},
bs:function(a,b){var z,y,x
z=H.a([],[H.L(this,"bu",0)])
C.b.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.W(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
br:function(a){return this.bs(a,!0)},
$isq:1},
cx:{
"^":"b;a,b,c,d",
gC:function(){return this.d},
v:function(){var z,y,x,w
z=this.a
y=J.P(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.H(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.W(z,w);++this.c
return!0}},
cy:{
"^":"I;a,b",
gE:function(a){var z=new H.f9(null,J.bj(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.aw(this.a)},
$asI:function(a,b){return[b]},
static:{aY:function(a,b,c,d){if(!!J.n(a).$isq)return H.a(new H.co(a,b),[c,d])
return H.a(new H.cy(a,b),[c,d])}}},
co:{
"^":"cy;a,b",
$isq:1},
f9:{
"^":"eY;a,b,c",
v:function(){var z=this.b
if(z.v()){this.a=this.aX(z.gC())
return!0}this.a=null
return!1},
gC:function(){return this.a},
aX:function(a){return this.c.$1(a)}},
by:{
"^":"bu;a,b",
gj:function(a){return J.aw(this.a)},
W:function(a,b){return this.aX(J.dX(this.a,b))},
aX:function(a){return this.b.$1(a)},
$asbu:function(a,b){return[b]},
$asI:function(a,b){return[b]},
$isq:1},
cr:{
"^":"b;"}}],["","",,H,{
"^":"",
dr:function(a){var z=H.a(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
h0:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.i4()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.au(new P.h2(z),1)).observe(y,{childList:true})
return new P.h1(z,y,x)}else if(self.setImmediate!=null)return P.i5()
return P.i6()},
jD:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.au(new P.h3(a),0))},"$1","i4",2,0,4],
jE:[function(a){++init.globalState.f.b
self.setImmediate(H.au(new P.h4(a),0))},"$1","i5",2,0,4],
jF:[function(a){P.bH(C.h,a)},"$1","i6",2,0,4],
O:function(a,b,c){if(b===0){J.dR(c,a)
return}else if(b===1){c.e_(H.z(a),H.w(a))
return}P.hO(a,b)
return c.gen()},
hO:function(a,b){var z,y,x,w
z=new P.hP(b)
y=new P.hQ(b)
x=J.n(a)
if(!!x.$isy)a.b3(z,y)
else if(!!x.$isW)a.bq(z,y)
else{w=H.a(new P.y(0,$.l,null),[null])
w.a=4
w.c=a
w.b3(z,null)}},
bT:function(a){var z=function(b,c){while(true)try{a(b,c)
break}catch(y){c=y
b=1}}
$.l.toString
return new P.i1(z)},
dh:function(a,b){var z=H.aK()
z=H.ag(z,[z,z]).a0(a)
if(z){b.toString
return a}else{b.toString
return a}},
eF:function(a,b,c){var z=H.a(new P.y(0,$.l,null),[c])
P.cR(a,new P.eG(b,z))
return z},
bn:function(a){return H.a(new P.hM(H.a(new P.y(0,$.l,null),[a])),[a])},
hW:function(a,b,c){$.l.toString
a.L(b,c)},
hY:function(){var z,y
for(;z=$.ad,z!=null;){$.ar=null
y=z.c
$.ad=y
if(y==null)$.aq=null
$.l=z.b
z.dT()}},
jQ:[function(){$.bR=!0
try{P.hY()}finally{$.l=C.c
$.ar=null
$.bR=!1
if($.ad!=null)$.$get$bM().$1(P.dp())}},"$0","dp",0,0,1],
dl:function(a){if($.ad==null){$.aq=a
$.ad=a
if(!$.bR)$.$get$bM().$1(P.dp())}else{$.aq.c=a
$.aq=a}},
dC:function(a){var z,y
z=$.l
if(C.c===z){P.as(null,null,C.c,a)
return}z.toString
if(C.c.gbb()===z){P.as(null,null,z,a)
return}y=$.l
P.as(null,null,y,y.b5(a,!0))},
jt:function(a,b){var z,y,x
z=H.a(new P.df(null,null,null,0),[b])
y=z.gdA()
x=z.gdC()
z.a=a.Y(y,!0,z.gdB(),x)
return z},
i0:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.z(u)
z=t
y=H.w(u)
$.l.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.V(x)
w=t
v=x.gU()
c.$2(w,v)}}},
hR:function(a,b,c,d){var z=a.b7()
if(!!J.n(z).$isW)z.bv(new P.hU(b,c,d))
else b.L(c,d)},
hS:function(a,b){return new P.hT(a,b)},
cR:function(a,b){var z=$.l
if(z===C.c){z.toString
return P.bH(a,b)}return P.bH(a,z.b5(b,!0))},
bH:function(a,b){var z=C.d.ag(a.a,1000)
return H.fC(z<0?0:z,b)},
aJ:function(a,b,c,d,e){var z,y,x
z={}
z.a=d
y=new P.d7(new P.i_(z,e),C.c,null)
z=$.ad
if(z==null){P.dl(y)
$.ar=$.aq}else{x=$.ar
if(x==null){y.c=z
$.ar=y
$.ad=y}else{y.c=x.c
x.c=y
$.ar=y
if(y.c==null)$.aq=y}}},
hZ:function(a,b){throw H.d(new P.Z(a,b))},
di:function(a,b,c,d){var z,y
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
dk:function(a,b,c,d,e){var z,y
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
dj:function(a,b,c,d,e,f){var z,y
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
as:function(a,b,c,d){var z=C.c!==c
if(z){d=c.b5(d,!(!z||C.c.gbb()===c))
c=C.c}P.dl(new P.d7(d,c,null))},
h2:{
"^":"e:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
h1:{
"^":"e:12;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
h3:{
"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
h4:{
"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
hP:{
"^":"e:2;a",
$1:function(a){return this.a.$2(0,a)}},
hQ:{
"^":"e:5;a",
$2:function(a,b){this.a.$2(1,new H.bp(a,b))}},
i1:{
"^":"e:13;a",
$2:function(a,b){this.a(a,b)}},
W:{
"^":"b;"},
eG:{
"^":"e:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a_(null)}catch(x){w=H.z(x)
z=w
y=H.w(x)
P.hW(this.b,z,y)}}},
h8:{
"^":"b;en:a<",
e_:function(a,b){a=a!=null?a:new P.bD()
if(this.a.a!==0)throw H.d(new P.am("Future already completed"))
$.l.toString
this.L(a,b)}},
hM:{
"^":"h8;a",
ca:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.am("Future already completed"))
z.a_(b)},
L:function(a,b){this.a.L(a,b)}},
an:{
"^":"b;bQ:a<,eR:b>,c,d,e",
ga5:function(){return this.b.b},
gcd:function(){return(this.c&1)!==0},
geu:function(){return this.c===6},
ges:function(){return this.c===8},
gdE:function(){return this.d},
gdL:function(){return this.d}},
y:{
"^":"b;av:a?,a5:b<,c",
gdv:function(){return this.a===8},
sdw:function(a){this.a=2},
bq:function(a,b){var z=$.l
if(z!==C.c){z.toString
if(b!=null)b=P.dh(b,z)}return this.b3(a,b)},
b3:function(a,b){var z=H.a(new P.y(0,$.l,null),[null])
this.aO(new P.an(null,z,b==null?1:3,a,b))
return z},
bv:function(a){var z,y
z=$.l
y=new P.y(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aO(new P.an(null,y,8,a,null))
return y},
bP:function(){if(this.a!==0)throw H.d(new P.am("Future already completed"))
this.a=1},
gdK:function(){return this.c},
gaf:function(){return this.c},
dI:function(a,b){this.a=8
this.c=new P.Z(a,b)},
aO:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.as(null,null,z,new P.hi(this,a))}else{a.a=this.c
this.c=a}},
au:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbQ()
z.a=y}return y},
a_:function(a){var z,y
z=J.n(a)
if(!!z.$isW)if(!!z.$isy)P.b6(a,this)
else P.bO(a,this)
else{y=this.au()
this.a=4
this.c=a
P.a5(this,y)}},
bH:function(a){var z=this.au()
this.a=4
this.c=a
P.a5(this,z)},
L:[function(a,b){var z=this.au()
this.a=8
this.c=new P.Z(a,b)
P.a5(this,z)},function(a){return this.L(a,null)},"f0","$2","$1","gaU",2,2,14,0],
dg:function(a){var z
if(a==null);else{z=J.n(a)
if(!!z.$isW){if(!!z.$isy){z=a.a
if(z>=4&&z===8){this.bP()
z=this.b
z.toString
P.as(null,null,z,new P.hj(this,a))}else P.b6(a,this)}else P.bO(a,this)
return}}this.bP()
z=this.b
z.toString
P.as(null,null,z,new P.hk(this,a))},
$isW:1,
static:{bO:function(a,b){var z,y,x,w
b.sav(2)
try{a.bq(new P.hl(b),new P.hm(b))}catch(x){w=H.z(x)
z=w
y=H.w(x)
P.dC(new P.hn(b,z,y))}},b6:function(a,b){var z
b.a=2
z=new P.an(null,b,0,null,null)
if(a.a>=4)P.a5(a,z)
else a.aO(z)},a5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdv()
if(b==null){if(w){v=z.a.gaf()
y=z.a.ga5()
x=J.V(v)
u=v.gU()
y.toString
P.aJ(null,null,y,x,u)}return}for(;b.gbQ()!=null;b=t){t=b.a
b.a=null
P.a5(z.a,b)}x.a=!0
s=w?null:z.a.gdK()
x.b=s
x.c=!1
y=!w
if(!y||b.gcd()||b.c===8){r=b.ga5()
if(w){u=z.a.ga5()
u.toString
if(u==null?r!=null:u!==r){u=u.gbb()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaf()
y=z.a.ga5()
x=J.V(v)
u=v.gU()
y.toString
P.aJ(null,null,y,x,u)
return}q=$.l
if(q==null?r!=null:q!==r)$.l=r
else q=null
if(y){if(b.gcd())x.a=new P.hp(x,b,s,r).$0()}else new P.ho(z,x,b,r).$0()
if(b.ges())new P.hq(z,x,w,b,r).$0()
if(q!=null)$.l=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.n(y).$isW}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.y)if(p.a>=4){o.a=2
z.a=p
b=new P.an(null,o,0,null,null)
y=p
continue}else P.b6(p,o)
else P.bO(p,o)
return}}o=b.b
b=o.au()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hi:{
"^":"e:0;a,b",
$0:function(){P.a5(this.a,this.b)}},
hl:{
"^":"e:2;a",
$1:function(a){this.a.bH(a)}},
hm:{
"^":"e:6;a",
$2:function(a,b){this.a.L(a,b)},
$1:function(a){return this.$2(a,null)}},
hn:{
"^":"e:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
hj:{
"^":"e:0;a,b",
$0:function(){P.b6(this.b,this.a)}},
hk:{
"^":"e:0;a,b",
$0:function(){this.a.bH(this.b)}},
hp:{
"^":"e:15;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.bo(this.b.gdE(),this.c)
return!0}catch(x){w=H.z(x)
z=w
y=H.w(x)
this.a.b=new P.Z(z,y)
return!1}}},
ho:{
"^":"e:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaf()
y=!0
r=this.c
if(r.geu()){x=r.d
try{y=this.d.bo(x,J.V(z))}catch(q){r=H.z(q)
w=r
v=H.w(q)
r=J.V(z)
p=w
o=(r==null?p==null:r===p)?z:new P.Z(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aK()
p=H.ag(p,[p,p]).a0(r)
n=this.d
m=this.b
if(p)m.b=n.eT(u,J.V(z),z.gU())
else m.b=n.bo(u,J.V(z))}catch(q){r=H.z(q)
t=r
s=H.w(q)
r=J.V(z)
p=t
o=(r==null?p==null:r===p)?z:new P.Z(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hq:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cs(this.d.gdL())
z.a=w
v=w}catch(u){z=H.z(u)
y=z
x=H.w(u)
if(this.c){z=J.V(this.a.a.gaf())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaf()
else v.b=new P.Z(y,x)
v.a=!1
return}if(!!J.n(v).$isW){t=this.d
s=t.geR(t)
s.sdw(!0)
this.b.c=!0
v.bq(new P.hr(this.a,s),new P.hs(z,s))}}},
hr:{
"^":"e:2;a,b",
$1:function(a){P.a5(this.a.a,new P.an(null,this.b,0,null,null))}},
hs:{
"^":"e:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.y)){y=H.a(new P.y(0,$.l,null),[null])
z.a=y
y.dI(a,b)}P.a5(z.a,new P.an(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
d7:{
"^":"b;a,b,c",
dT:function(){return this.a.$0()}},
a3:{
"^":"b;",
a8:function(a,b){return H.a(new P.hC(b,this),[H.L(this,"a3",0),null])},
H:function(a,b){var z,y
z={}
y=H.a(new P.y(0,$.l,null),[null])
z.a=null
z.a=this.Y(new P.fu(z,this,b,y),!0,new P.fv(y),y.gaU())
return y},
gj:function(a){var z,y
z={}
y=H.a(new P.y(0,$.l,null),[P.o])
z.a=0
this.Y(new P.fw(z),!0,new P.fx(z,y),y.gaU())
return y},
br:function(a){var z,y
z=H.a([],[H.L(this,"a3",0)])
y=H.a(new P.y(0,$.l,null),[[P.k,H.L(this,"a3",0)]])
this.Y(new P.fy(this,z),!0,new P.fz(z,y),y.gaU())
return y}},
fu:{
"^":"e;a,b,c,d",
$1:function(a){P.i0(new P.fs(this.c,a),new P.ft(),P.hS(this.a.a,this.d))},
$signature:function(){return H.b9(function(a){return{func:1,args:[a]}},this.b,"a3")}},
fs:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ft:{
"^":"e:2;",
$1:function(a){}},
fv:{
"^":"e:0;a",
$0:function(){this.a.a_(null)}},
fw:{
"^":"e:2;a",
$1:function(a){++this.a.a}},
fx:{
"^":"e:0;a,b",
$0:function(){this.b.a_(this.a.a)}},
fy:{
"^":"e;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b9(function(a){return{func:1,args:[a]}},this.a,"a3")}},
fz:{
"^":"e:0;a,b",
$0:function(){this.b.a_(this.a)}},
fr:{
"^":"b;"},
jJ:{
"^":"b;"},
h5:{
"^":"b;a5:d<,av:e?",
bk:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c5()
if((z&4)===0&&(this.e&32)===0)this.bM(this.gbS())},
am:function(a){return this.bk(a,null)},
cr:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gM(z)}else z=!1
if(z)this.r.aM(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bM(this.gbU())}}}},
b7:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aR()
return this.f},
aR:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c5()
if((this.e&32)===0)this.r=null
this.f=this.bR()},
aQ:["d1",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bY(a)
else this.aP(new P.hb(a,null))}],
aN:["d2",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.c_(a,b)
else this.aP(new P.hd(a,b,null))}],
df:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bZ()
else this.aP(C.m)},
bT:[function(){},"$0","gbS",0,0,1],
bV:[function(){},"$0","gbU",0,0,1],
bR:function(){return},
aP:function(a){var z,y
z=this.r
if(z==null){z=new P.hL(null,null,0)
this.r=z}z.a6(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aM(this)}},
bY:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bp(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aS((z&4)!==0)},
c_:function(a,b){var z,y
z=this.e
y=new P.h7(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aR()
z=this.f
if(!!J.n(z).$isW)z.bv(y)
else y.$0()}else{y.$0()
this.aS((z&4)!==0)}},
bZ:function(){var z,y
z=new P.h6(this)
this.aR()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isW)y.bv(z)
else z.$0()},
bM:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aS((z&4)!==0)},
aS:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gM(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gM(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bT()
else this.bV()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aM(this)},
da:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dh(b,z)
this.c=c}},
h7:{
"^":"e:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aK()
x=H.ag(x,[x,x]).a0(y)
w=z.d
v=this.b
u=z.b
if(x)w.eU(u,v,this.c)
else w.bp(u,v)
z.e=(z.e&4294967263)>>>0}},
h6:{
"^":"e:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ct(z.c)
z.e=(z.e&4294967263)>>>0}},
d9:{
"^":"b;az:a@"},
hb:{
"^":"d9;b,a",
bl:function(a){a.bY(this.b)}},
hd:{
"^":"d9;ai:b>,U:c<,a",
bl:function(a){a.c_(this.b,this.c)}},
hc:{
"^":"b;",
bl:function(a){a.bZ()},
gaz:function(){return},
saz:function(a){throw H.d(new P.am("No events after a done."))}},
hE:{
"^":"b;av:a?",
aM:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dC(new P.hF(this,a))
this.a=1},
c5:function(){if(this.a===1)this.a=3}},
hF:{
"^":"e:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.ep(this.b)}},
hL:{
"^":"hE;b,c,a",
gM:function(a){return this.c==null},
a6:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saz(b)
this.c=b}},
ep:function(a){var z,y
z=this.b
y=z.gaz()
this.b=y
if(y==null)this.c=null
z.bl(a)}},
df:{
"^":"b;a,b,c,av:d?",
bD:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
f4:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a_(!0)
return}this.a.am(0)
this.c=a
this.d=3},"$1","gdA",2,0,function(){return H.b9(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"df")}],
dD:[function(a,b){var z
if(this.d===2){z=this.c
this.bD(0)
z.L(a,b)
return}this.a.am(0)
this.c=new P.Z(a,b)
this.d=4},function(a){return this.dD(a,null)},"f6","$2","$1","gdC",2,2,16,0],
f5:[function(){if(this.d===2){var z=this.c
this.bD(0)
z.a_(!1)
return}this.a.am(0)
this.c=null
this.d=5},"$0","gdB",0,0,1]},
hU:{
"^":"e:0;a,b,c",
$0:function(){return this.a.L(this.b,this.c)}},
hT:{
"^":"e:5;a,b",
$2:function(a,b){return P.hR(this.a,this.b,a,b)}},
bN:{
"^":"a3;",
Y:function(a,b,c,d){return this.dm(a,d,c,!0===b)},
ck:function(a,b,c){return this.Y(a,null,b,c)},
dm:function(a,b,c,d){return P.hh(this,a,b,c,d,H.L(this,"bN",0),H.L(this,"bN",1))},
bN:function(a,b){b.aQ(a)},
$asa3:function(a,b){return[b]}},
da:{
"^":"h5;x,y,a,b,c,d,e,f,r",
aQ:function(a){if((this.e&2)!==0)return
this.d1(a)},
aN:function(a,b){if((this.e&2)!==0)return
this.d2(a,b)},
bT:[function(){var z=this.y
if(z==null)return
z.am(0)},"$0","gbS",0,0,1],
bV:[function(){var z=this.y
if(z==null)return
z.cr()},"$0","gbU",0,0,1],
bR:function(){var z=this.y
if(z!=null){this.y=null
return z.b7()}return},
f1:[function(a){this.x.bN(a,this)},"$1","gdr",2,0,function(){return H.b9(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"da")}],
f3:[function(a,b){this.aN(a,b)},"$2","gdt",4,0,17],
f2:[function(){this.df()},"$0","gds",0,0,1],
dc:function(a,b,c,d,e,f,g){var z,y
z=this.gdr()
y=this.gdt()
this.y=this.x.a.ck(z,this.gds(),y)},
static:{hh:function(a,b,c,d,e,f,g){var z=$.l
z=H.a(new P.da(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.da(b,c,d,e)
z.dc(a,b,c,d,e,f,g)
return z}}},
hC:{
"^":"bN;b,a",
bN:function(a,b){var z,y,x,w,v
z=null
try{z=this.dJ(a)}catch(w){v=H.z(w)
y=v
x=H.w(w)
$.l.toString
b.aN(y,x)
return}b.aQ(z)},
dJ:function(a){return this.b.$1(a)}},
Z:{
"^":"b;ai:a>,U:b<",
i:function(a){return H.c(this.a)},
$isB:1},
hN:{
"^":"b;"},
i_:{
"^":"e:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bD()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
P.hZ(z,y)}},
hH:{
"^":"hN;",
gbb:function(){return this},
ct:function(a){var z,y,x,w
try{if(C.c===$.l){x=a.$0()
return x}x=P.di(null,null,this,a)
return x}catch(w){x=H.z(w)
z=x
y=H.w(w)
return P.aJ(null,null,this,z,y)}},
bp:function(a,b){var z,y,x,w
try{if(C.c===$.l){x=a.$1(b)
return x}x=P.dk(null,null,this,a,b)
return x}catch(w){x=H.z(w)
z=x
y=H.w(w)
return P.aJ(null,null,this,z,y)}},
eU:function(a,b,c){var z,y,x,w
try{if(C.c===$.l){x=a.$2(b,c)
return x}x=P.dj(null,null,this,a,b,c)
return x}catch(w){x=H.z(w)
z=x
y=H.w(w)
return P.aJ(null,null,this,z,y)}},
b5:function(a,b){if(b)return new P.hI(this,a)
else return new P.hJ(this,a)},
dP:function(a,b){return new P.hK(this,a)},
h:function(a,b){return},
cs:function(a){if($.l===C.c)return a.$0()
return P.di(null,null,this,a)},
bo:function(a,b){if($.l===C.c)return a.$1(b)
return P.dk(null,null,this,a,b)},
eT:function(a,b,c){if($.l===C.c)return a.$2(b,c)
return P.dj(null,null,this,a,b,c)}},
hI:{
"^":"e:0;a,b",
$0:function(){return this.a.ct(this.b)}},
hJ:{
"^":"e:0;a,b",
$0:function(){return this.a.cs(this.b)}},
hK:{
"^":"e:2;a,b",
$1:function(a){return this.a.bp(this.b,a)}}}],["","",,P,{
"^":"",
aX:function(){return H.a(new H.a_(0,null,null,null,null,null,0),[null,null])},
ab:function(a){return H.ds(a,H.a(new H.a_(0,null,null,null,null,null,0),[null,null]))},
eW:function(a,b,c){var z,y
if(P.bS(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$at()
y.push(a)
try{P.hX(a,z)}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=P.cO(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aT:function(a,b,c){var z,y,x
if(P.bS(a))return b+"..."+c
z=new P.bG(b)
y=$.$get$at()
y.push(a)
try{x=z
x.a=P.cO(x.ga3(),a,", ")}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=z
y.a=y.ga3()+c
y=z.ga3()
return y.charCodeAt(0)==0?y:y},
bS:function(a){var z,y
for(z=0;y=$.$get$at(),z<y.length;++z)if(a===y[z])return!0
return!1},
hX:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gE(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.c(z.gC())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.h(b,-1)
v=b.pop()
if(0>=b.length)return H.h(b,-1)
u=b.pop()}else{t=z.gC();++x
if(!z.v()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.h(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gC();++x
for(;z.v();t=s,s=r){r=z.gC();++x
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
ak:function(a,b,c,d){return H.a(new P.hw(0,null,null,null,null,null,0),[d])},
cz:function(a){var z,y,x
z={}
if(P.bS(a))return"{...}"
y=new P.bG("")
try{$.$get$at().push(a)
x=y
x.a=x.ga3()+"{"
z.a=!0
J.dY(a,new P.fa(z,y))
z=y
z.a=z.ga3()+"}"}finally{z=$.$get$at()
if(0>=z.length)return H.h(z,-1)
z.pop()}z=y.ga3()
return z.charCodeAt(0)==0?z:z},
dd:{
"^":"a_;a,b,c,d,e,f,r",
ak:function(a){return H.is(a)&0x3ffffff},
al:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gce()
if(x==null?b==null:x===b)return y}return-1},
static:{ap:function(a,b){return H.a(new P.dd(0,null,null,null,null,null,0),[a,b])}}},
hw:{
"^":"ht;a,b,c,d,e,f,r",
gE:function(a){var z=new P.cw(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
e0:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dk(b)},
dk:function(a){var z=this.d
if(z==null)return!1
return this.at(z[this.as(a)],a)>=0},
cl:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.e0(0,a)?a:null
else return this.dz(a)},
dz:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.as(a)]
x=this.at(y,a)
if(x<0)return
return J.c0(y,x).gbJ()},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.H(this))
z=z.b}},
a6:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bE(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bE(x,b)}else return this.V(b)},
V:function(a){var z,y,x
z=this.d
if(z==null){z=P.hx()
this.d=z}y=this.as(a)
x=z[y]
if(x==null)z[y]=[this.aT(a)]
else{if(this.at(x,a)>=0)return!1
x.push(this.aT(a))}return!0},
a9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bF(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bF(this.c,b)
else return this.dG(b)},
dG:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.as(a)]
x=this.at(y,a)
if(x<0)return!1
this.bG(y.splice(x,1)[0])
return!0},
S:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bE:function(a,b){if(a[b]!=null)return!1
a[b]=this.aT(b)
return!0},
bF:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bG(z)
delete a[b]
return!0},
aT:function(a){var z,y
z=new P.f7(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bG:function(a){var z,y
z=a.gdj()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
as:function(a){return J.A(a)&0x3ffffff},
at:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Y(a[y].gbJ(),b))return y
return-1},
$isq:1,
static:{hx:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f7:{
"^":"b;bJ:a<,b,dj:c<"},
cw:{
"^":"b;a,b,c,d",
gC:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.H(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
ht:{
"^":"fo;"},
bv:{
"^":"b;",
gE:function(a){return new H.cx(a,this.gj(a),0,null)},
W:function(a,b){return this.h(a,b)},
H:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.d(new P.H(a))}},
a8:function(a,b){return H.a(new H.by(a,b),[null,null])},
i:function(a){return P.aT(a,"[","]")},
$isk:1,
$ask:null,
$isq:1},
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
"^":"I;a,b,c,d",
gE:function(a){return new P.hy(this,this.c,this.d,this.b,null)},
H:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.v(new P.H(this))}},
gM:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
S:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aT(this,"{","}")},
cq:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.br());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
V:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bL();++this.d},
bL:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.a(z,[H.x(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bz(y,0,w,z,x)
C.b.bz(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
d4:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.a(z,[b])},
$isq:1,
static:{bw:function(a,b){var z=H.a(new P.f8(null,0,0,0),[b])
z.d4(a,b)
return z}}},
hy:{
"^":"b;a,b,c,d,e",
gC:function(){return this.e},
v:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.v(new P.H(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fp:{
"^":"b;",
a8:function(a,b){return H.a(new H.co(this,b),[H.x(this,0),null])},
i:function(a){return P.aT(this,"{","}")},
H:function(a,b){var z
for(z=this.gE(this);z.v();)b.$1(z.d)},
$isq:1},
fo:{
"^":"fp;"}}],["","",,P,{
"^":"",
cp:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ah(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eC(a)},
eC:function(a){var z=J.n(a)
if(!!z.$ise)return z.i(a)
return H.b_(a)},
aS:function(a){return new P.hg(a)},
bx:function(a,b,c){var z,y
z=H.a([],[c])
for(y=J.bj(a);y.v();)z.push(y.gC())
return z},
aN:function(a){var z=H.c(a)
H.dA(z)},
bU:{
"^":"b;"},
"+bool":0,
ch:{
"^":"b;a,b",
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.ch))return!1
return this.a===b.a&&this.b===b.b},
gA:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ev(z?H.D(this).getUTCFullYear()+0:H.D(this).getFullYear()+0)
x=P.ax(z?H.D(this).getUTCMonth()+1:H.D(this).getMonth()+1)
w=P.ax(z?H.D(this).getUTCDate()+0:H.D(this).getDate()+0)
v=P.ax(z?H.D(this).getUTCHours()+0:H.D(this).getHours()+0)
u=P.ax(z?H.D(this).getUTCMinutes()+0:H.D(this).getMinutes()+0)
t=P.ax(z?H.D(this).getUTCSeconds()+0:H.D(this).getSeconds()+0)
s=P.ew(H.cG(this))
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
return"00"+a},ax:function(a){if(a>=10)return""+a
return"0"+a}}},
a8:{
"^":"aM;"},
"+double":0,
ay:{
"^":"b;a",
k:function(a,b){return new P.ay(C.d.k(this.a,b.gdn()))},
aL:function(a,b){return C.d.aL(this.a,b.gdn())},
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.ay))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eB()
y=this.a
if(y<0)return"-"+new P.ay(-y).i(0)
x=z.$1(C.d.bm(C.d.ag(y,6e7),60))
w=z.$1(C.d.bm(C.d.ag(y,1e6),60))
v=new P.eA().$1(C.d.bm(y,1e6))
return""+C.d.ag(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)}},
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
gU:function(){return H.w(this.$thrownJsError)}},
bD:{
"^":"B;",
i:function(a){return"Throw of null."}},
a9:{
"^":"B;a,b,c,d",
gaW:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaV:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.c(z)+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gaW()+y+x
if(!this.a)return w
v=this.gaV()
u=P.cp(this.b)
return w+v+": "+H.c(u)},
static:{bk:function(a){return new P.a9(!1,null,null,a)},ej:function(a,b,c){return new P.a9(!0,a,b,c)}}},
bF:{
"^":"a9;e,f,a,b,c,d",
gaW:function(){return"RangeError"},
gaV:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else{if(typeof x!=="number")return x.eY()
if(typeof z!=="number")return H.U(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{fh:function(a){return new P.bF(null,null,!1,null,null,a)},b0:function(a,b,c){return new P.bF(null,null,!0,a,b,"Value not in range")},al:function(a,b,c,d,e){return new P.bF(b,c,!0,a,d,"Invalid value")},cK:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.al(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.al(b,a,c,"end",f))
return b}}},
eK:{
"^":"a9;e,j:f>,a,b,c,d",
gaW:function(){return"RangeError"},
gaV:function(){if(J.dG(this.b,0))return": index must not be negative"
var z=this.f
if(J.Y(z,0))return": no indices are valid"
return": index should be less than "+H.c(z)},
static:{bq:function(a,b,c,d,e){var z=e!=null?e:J.aw(b)
return new P.eK(b,z,!0,a,c,"Index out of range")}}},
F:{
"^":"B;a",
i:function(a){return"Unsupported operation: "+this.a}},
d6:{
"^":"B;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
am:{
"^":"B;a",
i:function(a){return"Bad state: "+this.a}},
H:{
"^":"B;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.cp(z))+"."}},
cN:{
"^":"b;",
i:function(a){return"Stack Overflow"},
gU:function(){return},
$isB:1},
eu:{
"^":"B;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hg:{
"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
eD:{
"^":"b;a",
i:function(a){return"Expando:"+H.c(this.a)},
h:function(a,b){var z=H.aZ(b,"expando$values")
return z==null?null:H.aZ(z,this.bK())},
w:function(a,b,c){var z=H.aZ(b,"expando$values")
if(z==null){z=new P.b()
H.bE(b,"expando$values",z)}H.bE(z,this.bK(),c)},
bK:function(){var z,y
z=H.aZ(this,"expando$key")
if(z==null){y=$.cq
$.cq=y+1
z="expando$key$"+y
H.bE(this,"expando$key",z)}return z}},
o:{
"^":"aM;"},
"+int":0,
I:{
"^":"b;",
a8:function(a,b){return H.aY(this,b,H.L(this,"I",0),null)},
H:function(a,b){var z
for(z=this.gE(this);z.v();)b.$1(z.gC())},
bs:function(a,b){return P.bx(this,!0,H.L(this,"I",0))},
br:function(a){return this.bs(a,!0)},
gj:function(a){var z,y
z=this.gE(this)
for(y=0;z.v();)++y
return y},
W:function(a,b){var z,y,x
if(b<0)H.v(P.al(b,0,null,"index",null))
for(z=this.gE(this),y=0;z.v();){x=z.gC()
if(b===y)return x;++y}throw H.d(P.bq(b,this,"index",null,y))},
i:function(a){return P.eW(this,"(",")")}},
eY:{
"^":"b;"},
k:{
"^":"b;",
$ask:null,
$isq:1},
"+List":0,
jm:{
"^":"b;",
i:function(a){return"null"}},
"+Null":0,
aM:{
"^":"b;"},
"+num":0,
b:{
"^":";",
m:function(a,b){return this===b},
gA:function(a){return H.a1(this)},
i:function(a){return H.b_(this)},
toString:function(){return this.i(this)}},
a2:{
"^":"b;"},
N:{
"^":"b;"},
"+String":0,
bG:{
"^":"b;a3:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cO:function(a,b,c){var z=J.bj(b)
if(!z.v())return a
if(c.length===0){do a+=H.c(z.gC())
while(z.v())}else{a+=H.c(z.gC())
for(;z.v();)a=a+c+H.c(z.gC())}return a}}}}],["","",,W,{
"^":"",
et:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.w)},
a6:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
db:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dg:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.ha(a)
if(!!J.n(z).$isM)return z
return}else return a},
K:function(a){var z=$.l
if(z===C.c)return a
return z.dP(a,!0)},
C:{
"^":"az;",
$isC:1,
$isb:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iA:{
"^":"C;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iC:{
"^":"C;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iD:{
"^":"C;",
$isM:1,
$isf:1,
"%":"HTMLBodyElement"},
iE:{
"^":"C;u:height},B:width}",
bw:function(a,b,c){return a.getContext(b,P.i7(c,null))},
cF:function(a,b,c,d,e,f,g){var z,y
z=P.ab(["alpha",!0,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.bw(a,"webgl",z)
return y==null?this.bw(a,"experimental-webgl",z):y},
cE:function(a,b){return this.cF(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
iG:{
"^":"aE;j:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iH:{
"^":"eL;j:length=",
by:function(a,b,c,d){var z=this.dh(a,b)
a.setProperty(z,c,d)
return},
dh:function(a,b){var z,y
z=$.$get$cf()
y=z[b]
if(typeof y==="string")return y
y=W.et(b) in a?b:P.ex()+b
z[b]=y
return y},
su:function(a,b){a.height=b},
sB:function(a,b){a.width=b},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eL:{
"^":"f+es;"},
es:{
"^":"b;",
su:function(a,b){this.by(a,"height",b,"")},
sB:function(a,b){this.by(a,"width",b,"")}},
ey:{
"^":"aE;",
gaB:function(a){return H.a(new W.r(a,"mousedown",!1),[null])},
gaC:function(a){return H.a(new W.r(a,"mouseenter",!1),[null])},
gaD:function(a){return H.a(new W.r(a,"mouseleave",!1),[null])},
gaE:function(a){return H.a(new W.r(a,"mousemove",!1),[null])},
gaF:function(a){return H.a(new W.r(a,"mouseout",!1),[null])},
gaG:function(a){return H.a(new W.r(a,"mouseover",!1),[null])},
gaH:function(a){return H.a(new W.r(a,"mouseup",!1),[null])},
gbh:function(a){return H.a(new W.r(a,"touchcancel",!1),[null])},
gaI:function(a){return H.a(new W.r(a,"touchend",!1),[null])},
gbi:function(a){return H.a(new W.r(a,"touchmove",!1),[null])},
gaJ:function(a){return H.a(new W.r(a,"touchstart",!1),[null])},
e5:function(a,b,c){return a.createElement(b)},
e4:function(a,b){return this.e5(a,b,null)},
"%":"XMLDocument;Document"},
iI:{
"^":"aE;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iJ:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
ez:{
"^":"f;b6:bottom=,u:height=,N:left=,bn:right=,ac:top=,B:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(this.gB(a))+" x "+H.c(this.gu(a))},
m:function(a,b){var z,y,x
if(b==null)return!1
z=J.n(b)
if(!z.$isX)return!1
y=a.left
x=z.gN(b)
if(y==null?x==null:y===x){y=a.top
x=z.gac(b)
if(y==null?x==null:y===x){y=this.gB(a)
x=z.gB(b)
if(y==null?x==null:y===x){y=this.gu(a)
z=z.gu(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){var z,y,x,w
z=J.A(a.left)
y=J.A(a.top)
x=J.A(this.gB(a))
w=J.A(this.gu(a))
return W.db(W.a6(W.a6(W.a6(W.a6(0,z),y),x),w))},
gbt:function(a){return H.a(new P.E(a.left,a.top),[null])},
$isX:1,
$asX:I.bb,
"%":";DOMRectReadOnly"},
az:{
"^":"aE;",
gI:function(a){return P.fj(C.a.F(a.offsetLeft),C.a.F(a.offsetTop),C.a.F(a.offsetWidth),C.a.F(a.offsetHeight),null)},
i:function(a){return a.localName},
geJ:function(a){return C.a.F(a.offsetLeft)},
geK:function(a){return C.a.F(a.offsetTop)},
cD:function(a){return a.getBoundingClientRect()},
gaB:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gaC:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gaD:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gaE:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gaF:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gaG:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gaH:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
gbh:function(a){return H.a(new W.t(a,"touchcancel",!1),[null])},
gaI:function(a){return H.a(new W.t(a,"touchend",!1),[null])},
geL:function(a){return H.a(new W.t(a,"touchenter",!1),[null])},
geM:function(a){return H.a(new W.t(a,"touchleave",!1),[null])},
gbi:function(a){return H.a(new W.t(a,"touchmove",!1),[null])},
gaJ:function(a){return H.a(new W.t(a,"touchstart",!1),[null])},
$isaz:1,
$isf:1,
$isM:1,
"%":";Element"},
iK:{
"^":"C;u:height},B:width}",
"%":"HTMLEmbedElement"},
iL:{
"^":"bo;ai:error=",
"%":"ErrorEvent"},
bo:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
M:{
"^":"f;",
de:function(a,b,c,d){return a.addEventListener(b,H.au(c,1),!1)},
dH:function(a,b,c,d){return a.removeEventListener(b,H.au(c,1),!1)},
$isM:1,
"%":"MediaStream;EventTarget"},
j2:{
"^":"C;j:length=",
"%":"HTMLFormElement"},
eI:{
"^":"ey;",
"%":"HTMLDocument"},
j4:{
"^":"C;u:height},B:width}",
"%":"HTMLIFrameElement"},
j5:{
"^":"C;u:height},B:width}",
ca:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
j7:{
"^":"C;u:height},B:width}",
$isaz:1,
$isf:1,
$isM:1,
"%":"HTMLInputElement"},
fb:{
"^":"C;ai:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
bz:{
"^":"d5;",
gI:function(a){var z,y,x
if(!!a.offsetX)return H.a(new P.E(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.n(W.dg(z)).$isaz)throw H.d(new P.F("offsetX is only supported on elements"))
y=W.dg(z)
x=H.a(new P.E(a.clientX,a.clientY),[null]).K(0,J.eb(J.ed(y)))
return H.a(new P.E(J.ca(x.a),J.ca(x.b)),[null])}},
$isbz:1,
$isb:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jl:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aE:{
"^":"M;",
i:function(a){var z=a.nodeValue
return z==null?this.cY(a):z},
"%":"Attr;Node"},
jn:{
"^":"C;u:height},B:width}",
"%":"HTMLObjectElement"},
jr:{
"^":"C;j:length=",
"%":"HTMLSelectElement"},
js:{
"^":"bo;ai:error=",
"%":"SpeechRecognitionError"},
bK:{
"^":"f;",
$isb:1,
"%":"Touch"},
bL:{
"^":"d5;dU:changedTouches=",
$isbL:1,
$isb:1,
"%":"TouchEvent"},
jx:{
"^":"eN;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bq(b,a,null,null,null))
return a[b]},
w:function(a,b,c){throw H.d(new P.F("Cannot assign element of immutable List."))},
W:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isk:1,
$ask:function(){return[W.bK]},
$isq:1,
$isaW:1,
$isaU:1,
"%":"TouchList"},
eM:{
"^":"f+bv;",
$isk:1,
$ask:function(){return[W.bK]},
$isq:1},
eN:{
"^":"eM+eJ;",
$isk:1,
$ask:function(){return[W.bK]},
$isq:1},
d5:{
"^":"bo;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
jz:{
"^":"fb;u:height},B:width}",
"%":"HTMLVideoElement"},
jC:{
"^":"M;",
gaB:function(a){return H.a(new W.r(a,"mousedown",!1),[null])},
gaC:function(a){return H.a(new W.r(a,"mouseenter",!1),[null])},
gaD:function(a){return H.a(new W.r(a,"mouseleave",!1),[null])},
gaE:function(a){return H.a(new W.r(a,"mousemove",!1),[null])},
gaF:function(a){return H.a(new W.r(a,"mouseout",!1),[null])},
gaG:function(a){return H.a(new W.r(a,"mouseover",!1),[null])},
gaH:function(a){return H.a(new W.r(a,"mouseup",!1),[null])},
gbh:function(a){return H.a(new W.r(a,"touchcancel",!1),[null])},
gaI:function(a){return H.a(new W.r(a,"touchend",!1),[null])},
gbi:function(a){return H.a(new W.r(a,"touchmove",!1),[null])},
gaJ:function(a){return H.a(new W.r(a,"touchstart",!1),[null])},
$isf:1,
$isM:1,
"%":"DOMWindow|Window"},
jG:{
"^":"f;b6:bottom=,u:height=,N:left=,bn:right=,ac:top=,B:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
m:function(a,b){var z,y,x
if(b==null)return!1
z=J.n(b)
if(!z.$isX)return!1
y=a.left
x=z.gN(b)
if(y==null?x==null:y===x){y=a.top
x=z.gac(b)
if(y==null?x==null:y===x){y=a.width
x=z.gB(b)
if(y==null?x==null:y===x){y=a.height
z=z.gu(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){var z,y,x,w
z=J.A(a.left)
y=J.A(a.top)
x=J.A(a.width)
w=J.A(a.height)
return W.db(W.a6(W.a6(W.a6(W.a6(0,z),y),x),w))},
gbt:function(a){return H.a(new P.E(a.left,a.top),[null])},
$isX:1,
$asX:I.bb,
"%":"ClientRect"},
jH:{
"^":"aE;",
$isf:1,
"%":"DocumentType"},
jI:{
"^":"ez;",
gu:function(a){return a.height},
su:function(a,b){a.height=b},
gB:function(a){return a.width},
sB:function(a,b){a.width=b},
"%":"DOMRect"},
jL:{
"^":"C;",
$isM:1,
$isf:1,
"%":"HTMLFrameSetElement"},
r:{
"^":"a3;a,b,c",
Y:function(a,b,c,d){var z=new W.J(0,this.a,this.b,W.K(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.G()
return z},
cj:function(a){return this.Y(a,null,null,null)},
ck:function(a,b,c){return this.Y(a,null,b,c)}},
t:{
"^":"r;a,b,c"},
J:{
"^":"fr;a,b,c,d,e",
b7:function(){if(this.b==null)return
this.c1()
this.b=null
this.d=null
return},
bk:function(a,b){if(this.b==null)return;++this.a
this.c1()},
am:function(a){return this.bk(a,null)},
cr:function(){if(this.b==null||this.a<=0)return;--this.a
this.G()},
G:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dH(x,this.c,z,!1)}},
c1:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dI(x,this.c,z,!1)}}},
eJ:{
"^":"b;",
gE:function(a){return new W.eE(a,this.gj(a),-1,null)},
$isk:1,
$ask:null,
$isq:1},
eE:{
"^":"b;a,b,c,d",
v:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c0(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gC:function(){return this.d}},
h9:{
"^":"b;a",
$isM:1,
$isf:1,
static:{ha:function(a){if(a===window)return a
else return new W.h9(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iy:{
"^":"aA;",
$isf:1,
"%":"SVGAElement"},
iz:{
"^":"fA;",
$isf:1,
"%":"SVGAltGlyphElement"},
iB:{
"^":"p;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iM:{
"^":"p;",
$isf:1,
"%":"SVGFEBlendElement"},
iN:{
"^":"p;",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iO:{
"^":"p;",
$isf:1,
"%":"SVGFEComponentTransferElement"},
iP:{
"^":"p;",
$isf:1,
"%":"SVGFECompositeElement"},
iQ:{
"^":"p;",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
iR:{
"^":"p;",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
iS:{
"^":"p;",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
iT:{
"^":"p;",
$isf:1,
"%":"SVGFEFloodElement"},
iU:{
"^":"p;",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
iV:{
"^":"p;",
$isf:1,
"%":"SVGFEImageElement"},
iW:{
"^":"p;",
$isf:1,
"%":"SVGFEMergeElement"},
iX:{
"^":"p;",
$isf:1,
"%":"SVGFEMorphologyElement"},
iY:{
"^":"p;",
$isf:1,
"%":"SVGFEOffsetElement"},
iZ:{
"^":"p;",
$isf:1,
"%":"SVGFESpecularLightingElement"},
j_:{
"^":"p;",
$isf:1,
"%":"SVGFETileElement"},
j0:{
"^":"p;",
$isf:1,
"%":"SVGFETurbulenceElement"},
j1:{
"^":"p;",
$isf:1,
"%":"SVGFilterElement"},
aA:{
"^":"p;",
$isf:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
j6:{
"^":"aA;",
$isf:1,
"%":"SVGImageElement"},
ja:{
"^":"p;",
$isf:1,
"%":"SVGMarkerElement"},
jb:{
"^":"p;",
$isf:1,
"%":"SVGMaskElement"},
jo:{
"^":"p;",
$isf:1,
"%":"SVGPatternElement"},
jq:{
"^":"p;",
$isf:1,
"%":"SVGScriptElement"},
p:{
"^":"az;",
gaB:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gaC:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gaD:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gaE:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gaF:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gaG:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gaH:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
$isM:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
ju:{
"^":"aA;",
$isf:1,
"%":"SVGSVGElement"},
jv:{
"^":"p;",
$isf:1,
"%":"SVGSymbolElement"},
cQ:{
"^":"aA;",
"%":";SVGTextContentElement"},
jw:{
"^":"cQ;",
$isf:1,
"%":"SVGTextPathElement"},
fA:{
"^":"cQ;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jy:{
"^":"aA;",
$isf:1,
"%":"SVGUseElement"},
jA:{
"^":"p;",
$isf:1,
"%":"SVGViewElement"},
jK:{
"^":"p;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jM:{
"^":"p;",
$isf:1,
"%":"SVGCursorElement"},
jN:{
"^":"p;",
$isf:1,
"%":"SVGFEDropShadowElement"},
jO:{
"^":"p;",
$isf:1,
"%":"SVGGlyphRefElement"},
jP:{
"^":"p;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jp:{
"^":"f;",
dN:function(a,b,c){return a.bindBuffer(b,c)},
dO:function(a,b,c){return a.bindTexture(b,c)},
dQ:function(a,b){return a.blendEquation(b)},
dR:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dS:function(a,b,c,d){return a.bufferData(b,c,d)},
dV:function(a,b){return a.clear(b)},
dW:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dX:function(a,b){return a.clearDepth(b)},
dY:function(a,b){return a.clearStencil(b)},
dZ:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
e3:function(a){return a.createBuffer()},
e6:function(a){return a.createProgram()},
e7:function(a,b){return a.createShader(b)},
e8:function(a,b){return a.depthFunc(b)},
e9:function(a,b){return a.depthMask(b)},
eg:function(a,b){return a.disableVertexAttribArray(b)},
eh:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
ek:function(a,b){return a.enable(b)},
el:function(a,b){return a.enableVertexAttribArray(b)},
cC:function(a,b,c){return a.getAttribLocation(b,c)},
cH:function(a,b){return a.getParameter(b)},
cI:function(a,b,c){return a.getUniformLocation(b,c)},
cU:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cV:function(a,b,c,d){return a.stencilOp(b,c,d)},
eW:function(a,b){return a.useProgram(b)},
eX:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iF:{
"^":"b;"}}],["","",,P,{
"^":"",
ao:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dc:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
hv:{
"^":"b;",
eH:function(a){if(a<=0||a>4294967296)throw H.d(P.fh("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
be:function(){return Math.random()}},
E:{
"^":"b;n:a>,p:b>",
i:function(a){return"Point("+H.c(this.a)+", "+H.c(this.b)+")"},
m:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.E))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){var z,y
z=J.A(this.a)
y=J.A(this.b)
return P.dc(P.ao(P.ao(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gn(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gp(b)
if(typeof z!=="number")return z.k()
y=new P.E(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
K:function(a,b){var z,y,x,w
z=this.a
y=J.ec(b)
if(typeof z!=="number")return z.K()
if(typeof y!=="number")return H.U(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.K()
if(typeof w!=="number")return H.U(w)
w=new P.E(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hG:{
"^":"b;",
gbn:function(a){return this.gN(this)+this.c},
gb6:function(a){return this.gac(this)+this.d},
i:function(a){return"Rectangle ("+this.gN(this)+", "+this.b+") "+this.c+" x "+this.d},
m:function(a,b){var z,y
if(b==null)return!1
z=J.n(b)
if(!z.$isX)return!1
if(this.gN(this)===z.gN(b)){y=this.b
z=y===z.gac(b)&&this.a+this.c===z.gbn(b)&&y+this.d===z.gb6(b)}else z=!1
return z},
gA:function(a){var z=this.b
return P.dc(P.ao(P.ao(P.ao(P.ao(0,this.gN(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbt:function(a){var z=new P.E(this.gN(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
X:{
"^":"hG;N:a>,ac:b>,B:c>,u:d>",
$asX:null,
static:{fj:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.a(new P.X(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
j:function(a){return a},
b8:function(a){return a},
cA:{
"^":"f;",
$iscA:1,
"%":"ArrayBuffer"},
bC:{
"^":"f;",
$isbC:1,
"%":"DataView;ArrayBufferView;bA|cB|cD|bB|cC|cE|a0"},
bA:{
"^":"bC;",
gj:function(a){return a.length},
$isaW:1,
$isaU:1},
bB:{
"^":"cD;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
return a[b]},
w:function(a,b,c){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
a[b]=c}},
cB:{
"^":"bA+bv;",
$isk:1,
$ask:function(){return[P.a8]},
$isq:1},
cD:{
"^":"cB+cr;"},
a0:{
"^":"cE;",
w:function(a,b,c){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
a[b]=c},
$isk:1,
$ask:function(){return[P.o]},
$isq:1},
cC:{
"^":"bA+bv;",
$isk:1,
$ask:function(){return[P.o]},
$isq:1},
cE:{
"^":"cC+cr;"},
jc:{
"^":"bB;",
$isk:1,
$ask:function(){return[P.a8]},
$isq:1,
"%":"Float32Array"},
jd:{
"^":"bB;",
$isk:1,
$ask:function(){return[P.a8]},
$isq:1,
"%":"Float64Array"},
je:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.o]},
$isq:1,
"%":"Int16Array"},
jf:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.o]},
$isq:1,
"%":"Int32Array"},
jg:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.o]},
$isq:1,
"%":"Int8Array"},
jh:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.o]},
$isq:1,
"%":"Uint16Array"},
ji:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.o]},
$isq:1,
"%":"Uint32Array"},
jj:{
"^":"a0;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.o]},
$isq:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jk:{
"^":"a0;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.u(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.o]},
$isq:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dA:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
fd:{
"^":"cT;e,f,r,x,y,a,b,c,d",
bg:function(a,b){var z,y,x
z=this.r
y=z.a.a
y[0]=2*this.x/50
y[1]=2*this.y/50
for(x=0;x<5;++x)z.aA(0.2)
a.cm()},
bf:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=F.bI(null)
z.a=F.aF(170,255,255,170)
for(y=this.r.b,x=y.length,w=z.b===C.e,v=0;v<y.length;y.length===x||(0,H.Q)(y),++v){u=y[v]
t=u.gcp()
s=u.b.a
r=t*2
q=new F.aG(s[0]-t,s[1]-t,r,r)
if(w)b.ei(a,q,z)
else b.ej(a,q,z)}},
d5:function(a){var z,y,x,w,v,u,t
for(z=this.f,y=this.r.b,x=0;x<40;++x){w=z.be()*12+5
v=new Float64Array(3)
u=new Float64Array(3)
u[0]=0
u[1]=0
u[2]=0
t=new S.aj(10,"none",new E.m(v),new E.m(u),1,!1,0.6,0,0,0.8,"none")
v[0]=v[0]+200
v[1]=v[1]+200
u[1]=z.be()*5
u[0]=z.be()*5
t.Q=w
t.d=w/10
y.push(t)}for(x=0;x<20;++x){z=new Float64Array(3)
v=new Float64Array(3)
v[0]=0
v[1]=0
v[2]=0
v=new S.aj(10,"none",new E.m(z),new E.m(v),1,!1,0.6,0,0,0.8,"none")
z[0]=z[0]+(20+x*20)
z[1]=z[1]+0
v.Q=9
v.d=50
v.e=!0
y.push(v)}for(x=0;x<20;++x){z=new Float64Array(3)
v=new Float64Array(3)
v[0]=0
v[1]=0
v[2]=0
v=new S.aj(10,"none",new E.m(z),new E.m(v),1,!1,0.6,0,0,0.8,"none")
z[0]=z[0]+20
z[1]=z[1]+x*20
v.Q=9
v.e=!0
y.push(v)}for(x=0;x<20;++x){z=new Float64Array(3)
v=new Float64Array(3)
v[0]=0
v[1]=0
v[2]=0
v=new S.aj(10,"none",new E.m(z),new E.m(v),1,!1,0.6,0,0,0.8,"none")
z[0]=z[0]+420
z[1]=z[1]+x*20
v.Q=9
v.e=!0
y.push(v)}for(x=0;x<20;++x){z=new Float64Array(3)
v=new Float64Array(3)
v[0]=0
v[1]=0
v[2]=0
v=new S.aj(10,"none",new E.m(z),new E.m(v),1,!1,0.6,0,0,0.8,"none")
z[0]=z[0]+(20+x*20)
z[1]=z[1]+400
v.Q=9
v.e=!0
y.push(v)}},
static:{fe:function(a){var z,y
z=new E.m(new Float64Array(H.j(3)))
z.q(0,0,0)
y=new E.S(new Float64Array(H.j(16)))
y.T()
y=new F.fd(a,C.f,new S.h_(z,[]),0,1,"none",null,y,!1)
y.b=[]
y.d5(a)
return y}}}}],["","",,P,{
"^":"",
i7:function(a,b){var z={}
a.H(0,new P.i8(z))
return z},
cm:function(){var z=$.cl
if(z==null){z=J.bh(window.navigator.userAgent,"Opera",0)
$.cl=z}return z},
ex:function(){var z,y
z=$.ci
if(z!=null)return z
y=$.cj
if(y==null){y=J.bh(window.navigator.userAgent,"Firefox",0)
$.cj=y}if(y===!0)z="-moz-"
else{y=$.ck
if(y==null){y=P.cm()!==!0&&J.bh(window.navigator.userAgent,"Trident/",0)
$.ck=y}if(y===!0)z="-ms-"
else z=P.cm()===!0?"-o-":"-webkit-"}$.ci=z
return z},
i8:{
"^":"e:19;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
dx:[function(){var z=0,y=new P.bn(),x=1,w,v,u,t,s,r,q,p,o
var $async$dx=P.bT(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
p=p.aX()
o=P
v=new q.fH(700,500,p,o.aX())
q=F
u=q.aF(170,0,0,0)
q=E
q=q
p=Float64Array
o=H
t=new q.S(new p(o.j(16)))
q=t
q.T()
q=F
s=new q.fI(450,450,1,1,1,0,0,u,!0,"none",null,t,!1)
q=s
q.b=[]
q=E
q=q
p=Float64Array
o=H
u=new q.S(new p(o.j(16)))
q=u
q.T()
q=G
r=new q.fO(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
q=r
p=G
q.a=p.fN(400,600)
q=r
q.seS(s)
q=r
q.eF()
q=r
q.eV()
q=r
q.x=!0
q=r
z=!q.d?2:3
break
case 2:q=r
q.d=!0
q=r
q.ar()
case 3:q=s
q=q
p=F
q.aw(p.fe(v))
return P.O(null,0,y,null)
case 1:return P.O(w,1,y)}})
return P.O(null,$async$dx,y,null)},"$0","dy",0,0,0]},1],["","",,F,{
"^":"",
cv:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.Q)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.b2(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fF:{
"^":"b;"},
cT:{
"^":"b;",
aw:function(a){var z=0,y=new P.bn(),x=1,w,v=this,u,t,s,r
var $async$aw=P.bT(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.a(new s.y(0,r.l,null),[null])
t=u
t.dg(null)
z=2
return P.O(u,$async$aw,y)
case 2:t=v
t=t.b
t.push(a)
return P.O(null,0,y,null)
case 1:return P.O(w,1,y)}})
return P.O(null,$async$aw,y,null)},
cf:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.Q)(z),++x)z[x].cf(a)},
bg:function(a,b){},
cv:function(a,b){var z,y,x
this.ba()
this.bg(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.Q)(z),++x)z[x].cv(a,b)},
bf:function(a,b){},
bj:["d_",function(a,b){var z,y,x,w,v,u
this.ba()
this.bf(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.Q)(z),++w){v=z[w]
u=v.c
x.push(C.b.ga7(x).l(0,u))
b.aK()
v.bj(a,b)
if(0>=x.length)return H.h(x,-1)
x.pop()
b.aK()}}],
f9:["d0",function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
this.ba()
for(z=3*(d/450-0.5),y=3*(e/450-0.5),x=0;w=this.b,v=w.length,x<v;){++x
u=v-x
if(u<0)return H.h(w,u)
t=w[u]
a.co(t.c)
t.x=z
t.y=y
a.cn()}s=a.cG().b9(0)
s.ez()
z=new E.m(new Float64Array(H.j(3)))
z.q(d,e,0)
r=s.l(0,z)
r.gn(r)
r.gp(r)
return!1}],
f8:[function(a,b,c,d,e,f){},"$5","gaJ",10,0,8],
f7:[function(a,b,c,d,e,f){},"$5","gaI",10,0,8],
ba:function(){if(!this.d)this.d=!0}},
fG:{
"^":"b;"},
aG:{
"^":"b;a,b,c,d",
m:function(a,b){if(b==null)return!1
return b instanceof F.aG&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gA:function(a){return F.cv([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+H.c(this.a)+", y:"+H.c(this.b)+", w:"+H.c(this.c)+", h:"+H.c(this.d)}},
fK:{
"^":"b;a",
i:function(a){return C.y.h(0,this.a)}},
fJ:{
"^":"b;a,b,c",
d8:function(a){if(this.a==null)this.a=F.aF(255,255,255,255)},
static:{bI:function(a){var z=new F.fJ(a,C.e,1)
z.d8(a)
return z}}},
cS:{
"^":"b;a",
m:function(a,b){if(b==null)return!1
return b instanceof F.cS&&b.a===this.a},
gA:function(a){return F.cv([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
d7:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{aF:function(a,b,c,d){var z=new F.cS(0)
z.d7(a,b,c,d)
return z}}},
fI:{
"^":"cT;e,f,r,x,y,z,Q,ch,cx,a,b,c,d",
bg:function(a,b){var z,y,x,w
z=this.e
y=(a.gbu()-a.geN(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.S(new Float64Array(H.j(16)))
y.T()
this.c=y
y.cw(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bx(0,z,z,1)},
bj:function(a,b){var z,y
z=new F.aG(0,0,this.e,this.f)
b.b.push(z)
b.b8(a,z)
this.d_(a,b)
y=b.b
if(0>=y.length)return H.h(y,-1)
y.pop()
if(y.length>0)b.b8(a,C.b.ga7(y))
else{y=a.a
b.b8(a,new F.aG(0,0,y.c,y.d))}},
bf:function(a,b){var z=F.bI(null)
z.a=this.ch
b.cc(a,new F.aG(0,0,this.e,this.f),z)}},
bJ:{
"^":"b;",
seS:function(a){this.c$=a},
eC:function(a){if(!this.e$){this.c$.cf(this)
this.e$=!0}this.c$.cv(this,a)
this.cm()},
eD:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.ga7(y).l(0,z))
b.aK()
this.c$.bj(a,b)
if(0>=y.length)return H.h(y,-1)
y.pop()
b.aK()},
X:function(a,b,c,d,e){a.co(this.c$.c)
this.c$.d0(a,b,c,d,e)
a.cn()},
co:function(a){var z=this.f$
z.push(C.b.ga7(z).l(0,a))},
cn:function(){var z=this.f$
if(0>=z.length)return H.h(z,-1)
z.pop()},
cG:function(){return C.b.ga7(this.f$)}}}],["","",,G,{
"^":"",
cU:function(a,b,c){var z,y
z=J.dT(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.c(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
fM:{
"^":"b;a,b,c,u:d'",
d9:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.aa(b)
y=C.d.aa(a)
x=C.n.e4(document,"canvas")
J.ei(x,z)
J.eh(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.ee(this.b,!0)},
static:{fN:function(a,b){var z=new G.fM(null,null,null,null)
z.d9(a,b)
return z}}},
fH:{
"^":"fG;B:c',u:d',a,b"},
fL:{
"^":"fF;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
ev:function(){var z,y,x,w,v,u
P.aN("#[A]# "+H.c(J.c7(this.d,35660)))
P.aN("#[B]# "+H.c(J.c7(this.d,33901)))
z=C.b.cg(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.cg(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.cU(x,35633,z)
v=G.cU(x,35632,y)
u=J.dS(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
S:function(a){this.r=1
this.ch=-0.5
J.c3(this.d,2960)
J.dU(this.d,515)
J.dO(this.d,0,0,0,1)
J.dP(this.d,1)
J.dQ(this.d,0)
J.c3(this.d,3042)
switch(-1){case-1:J.dK(this.d,32774)
J.dL(this.d,770,771,770,32772)
break}J.dN(this.d,17664)
C.b.sj(this.x,0)
C.b.sj(this.y,0)
C.b.sj(this.z,0)
this.Q=null},
bc:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.x
if(z.length!==0){y=this.y
F.aF(170,255,170,170)
J.cb(this.d,this.f)
x=J.aP(this.d,this.f,"a_tex")
w=J.bi(this.d)
J.bg(this.d,34962,w)
v=this.z
J.dM(this.d,34962,new Float32Array(H.b8(v)),35044)
J.aO(this.d,x)
J.aQ(this.d,x,2,5126,!1,0,0)
u=this.d
t=J.bi(u)
u.bindBuffer(34962,t)
u.bufferData(34962,new Float32Array(H.b8(z)),35044)
u.bindBuffer(34962,null)
J.bg(this.d,34962,t)
u=this.d
t=J.bi(u)
u.bindBuffer(34963,t)
u.bufferData(34963,new Uint16Array(H.b8(y)),35044)
u.bindBuffer(34963,null)
J.bg(this.d,34963,t)
u=this.d
u.uniformMatrix4fv(J.ef(u,this.f,"u_mat"),!1,new Float32Array(H.b8(this.cx.a)))
s=J.aP(this.d,this.f,"color")
r=J.aP(this.d,this.f,"vp")
q=J.aP(this.d,this.f,"useTex")
J.aQ(this.d,r,3,5126,!1,32,0)
J.aQ(this.d,s,4,5126,!1,32,12)
J.aQ(this.d,q,1,5126,!1,32,28)
J.aO(this.d,r)
J.aO(this.d,s)
J.aO(this.d,q)
J.dW(this.d,4,y.length,5123,0)
if(x!==0){J.dV(this.d,x)
J.dJ(this.d,3553,null)}J.cb(this.d,null)
C.b.sj(z,0)
C.b.sj(y,0)
C.b.sj(v,0)
this.Q=null}},
ei:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.c/2
y=b.a+z
x=b.d/2
w=b.b+x
v=this.ax()
u=new E.m(new Float64Array(H.j(3)))
u.q(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=this.c,o=this.x,n=this.z,m=this.y,l=0;l<t;){k=o.length/8|0
u.sn(0,y)
u.sp(0,w)
u.sP(0,this.ch)
u=v.l(0,u)
C.b.D(o,[u.gn(u),u.gp(u),this.ch])
C.b.D(o,[s,r,q,p])
C.b.D(o,[-1])
C.b.D(n,[0,0])
j=6.283185307179586*(l/t)
u.sn(0,y+Math.cos(j)*z)
u.sp(0,w+Math.sin(j)*x)
u.sP(0,this.ch)
u=v.l(0,u)
C.b.D(o,[u.gn(u),u.gp(u),this.ch])
C.b.D(o,[s,r,q,p])
C.b.D(o,[-1])
C.b.D(n,[0,0]);++l
j=6.283185307179586*(l/t)
u.sn(0,y+Math.cos(j)*z)
u.sp(0,w+Math.sin(j)*x)
u.sP(0,this.ch)
u=v.l(0,u)
C.b.D(o,[u.gn(u),u.gp(u),this.ch])
C.b.D(o,[s,r,q,p])
C.b.D(o,[-1])
C.b.D(n,[0,0])
C.b.D(m,[k,k+1,k+2])
this.ch+=0.0001}},
ej:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b.c
y=b.a+z/2
x=b.d
w=b.b+x/2
v=c.c
u=(z+v)/2
t=(x+v)/2
s=(z-v)/2
r=(x-v)/2
q=this.ax()
p=new E.m(new Float64Array(H.j(3)))
p.q(0,0,0)
o=new E.m(new Float64Array(H.j(3)))
o.q(0,0,0)
n=new E.m(new Float64Array(H.j(3)))
n.q(0,0,0)
m=new E.m(new Float64Array(H.j(3)))
m.q(0,0,0)
v=c.a.a
l=(v>>>16&255)/255
k=(v>>>8&255)/255
j=(v>>>0&255)/255
i=(v>>>24&255)/255
for(h=0;h<25;){z=6.283185307179586*(h/25)
p.sn(0,y+Math.cos(z)*s)
p.sp(0,w+Math.sin(z)*r)
p.sP(0,this.ch)
p=q.l(0,p)
o.sn(0,y+Math.cos(z)*u)
o.sp(0,w+Math.sin(z)*t)
o.sP(0,this.ch)
o=q.l(0,o);++h
z=6.283185307179586*(h/25)
n.sn(0,y+Math.cos(z)*u)
n.sp(0,w+Math.sin(z)*t)
n.sP(0,this.ch)
n=q.l(0,n)
m.sn(0,y+Math.cos(z)*s)
m.sp(0,w+Math.sin(z)*r)
m.sP(0,this.ch)
m=q.l(0,m)
this.a4(a,p,o,m,n,l,k,j,i)
this.ch+=0.0001}},
cc:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=b.c
y=b.d
if(c.b===C.e){x=this.ax()
w=b.a
v=b.b
u=w+z
t=v+y
z=new E.m(new Float64Array(H.j(3)))
z.q(w,v,0)
s=x.l(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.q(w,t,0)
r=x.l(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.q(u,v,0)
q=x.l(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.q(u,t,0)
p=x.l(0,z)
z=c.a.a
this.a4(a,s,r,q,p,(z>>>16&255)/255,(z>>>8&255)/255,(z>>>0&255)/255,(z>>>24&255)/255)}else{x=this.ax()
o=b.a
n=c.c
m=n/2
w=o+m
l=b.b
v=l+m
u=o+z-m
t=l+y-m
m=new E.m(new Float64Array(H.j(3)))
m.q(w,v,0)
s=x.l(0,m)
m=w-n
y=v-n
l=new E.m(new Float64Array(H.j(3)))
l.q(m,y,0)
k=x.l(0,l)
l=new E.m(new Float64Array(H.j(3)))
l.q(w,t,0)
r=x.l(0,l)
l=t+n
z=new E.m(new Float64Array(H.j(3)))
z.q(m,l,0)
j=x.l(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.q(u,v,0)
q=x.l(0,z)
n=u+n
z=new E.m(new Float64Array(H.j(3)))
z.q(n,y,0)
i=x.l(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.q(u,t,0)
p=x.l(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.q(n,l,0)
h=x.l(0,z)
z=c.a.a
g=(z>>>16&255)/255
f=(z>>>8&255)/255
e=(z>>>0&255)/255
d=(z>>>24&255)/255
this.a4(a,k,j,s,r,g,f,e,d)
this.a4(a,j,h,r,p,g,f,e,d)
this.a4(a,h,i,p,q,g,f,e,d)
this.a4(a,i,k,q,s,g,f,e,d)}},
a4:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.x
y=z.length/8|0
C.b.D(z,[b.gn(b),b.gp(b),this.ch,f,g,h,i,-1,c.gn(c),c.gp(c),this.ch,f,g,h,i,-1,d.gn(d),d.gp(d),this.ch,f,g,h,i,-1,e.gn(e),e.gp(e),this.ch,f,g,h,i,-1])
C.b.D(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.b.D(this.y,[y,z,x,z,y+3,x])},
b8:function(a,b){var z
this.bc(0)
J.c1(this.d,!1,!1,!1,!1)
J.c2(this.d,!1)
J.c9(this.d,7680,7681,7681)
J.c8(this.d,519,this.r,255)
z=F.bI(null)
z.a=F.aF(255,255,255,255)
this.cc(null,b,z)
this.bc(0)
J.c1(this.d,!0,!0,!0,!0)
J.c2(this.d,!0)
J.c9(this.d,7680,7680,7680)
J.c8(this.d,515,this.r,255);++this.r},
aK:function(){},
ax:function(){var z,y
this.cy.T()
z=this.cy.cw(0,-1,1,0)
this.cy=z
y=this.e
y=z.bx(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.l(0,C.b.ga7(this.a))
this.cy=y
return y}},
fO:{
"^":"fc;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gbu:function(){return this.a.c},
geN:function(a){return 0},
cm:function(){this.r=!0},
ar:function(){var z=0,y=new P.bn(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
var $async$ar=P.bT(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cG(new h.ch(Date.now(),!1))
i=v
t=i.a
i=E
i=i
h=Float64Array
g=H
s=new i.S(new h(g.j(16)))
i=s
i.T()
i=E
i=i
h=Float64Array
g=H
r=new i.S(new h(g.j(16)))
i=r
i.T()
i=E
i=i
h=Float64Array
g=H
q=new i.S(new h(g.j(16)))
i=q
i.T()
i=G
p=new i.fL(50,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.ev()
i=p
i.S(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return P.O(i.eF(new h.ay(15e3),null,null),$async$ar,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.eC(h.aa(u+k))
o+=k
n+=k
if(k<0);else ;++m
i=v
i.r=!0
z=n>40?6:7
break
case 6:i=p
i.S(0)
i=v
i.eD(v,p)
i=p
i.bc(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.d3(o,m)
i=H
i.dA(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return P.O(null,0,y,null)
case 1:return P.O(w,1,y)}})
return P.O(null,$async$ar,y,null)},
eV:function(){var z,y,x,w
z=P.aX()
y=new G.fX(this,z)
x=new G.fW(this,z)
w=J.e5(this.a.b)
H.a(new W.J(0,w.a,w.b,W.K(x),!1),[H.x(w,0)]).G()
J.e6(this.a.b).cj(x)
x=J.e7(this.a.b)
H.a(new W.J(0,x.a,x.b,W.K(y),!1),[H.x(x,0)]).G()
x=J.e8(this.a.b)
H.a(new W.J(0,x.a,x.b,W.K(y),!1),[H.x(x,0)]).G()
x=J.e9(this.a.b)
H.a(new W.J(0,x.a,x.b,W.K(y),!1),[H.x(x,0)]).G()
J.ea(this.a.b).cj(y)},
eF:function(){var z,y
z={}
z.a=!1
y=J.dZ(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fP(z,this)),!1),[H.x(y,0)]).G()
y=J.e4(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fQ(z,this)),!1),[H.x(y,0)]).G()
y=J.e_(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fR(z,this)),!1),[H.x(y,0)]).G()
y=J.e0(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fS(z,this)),!1),[H.x(y,0)]).G()
y=J.e1(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fT(z,this)),!1),[H.x(y,0)]).G()
y=J.e2(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fU(z,this)),!1),[H.x(y,0)]).G()
y=J.e3(this.a.b)
H.a(new W.J(0,y.a,y.b,W.K(new G.fV(z,this)),!1),[H.x(y,0)]).G()}},
fc:{
"^":"b+bJ;"},
fX:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c4(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.Q)(y),++v){u=y[v]
t=H.a(new P.E(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).a
s=J.c5(z.a.b)
if(typeof t!=="number")return t.K()
r=t-s
s=H.a(new P.E(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).b
t=J.c6(z.a.b)
if(typeof s!=="number")return s.K()
q=s-t
t=w.ay(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.k()
z.X(z,s+1,"pointermove",r,q)}else{w.w(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.k()
z.X(z,t+1,"pointerdown",r,q)}}}},
fW:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c4(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.Q)(y),++v){u=y[v]
if(w.ay(u.identifier)){t=H.a(new P.E(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).a
s=J.c5(z.a.b)
if(typeof t!=="number")return t.K()
r=H.a(new P.E(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).b
q=J.c6(z.a.b)
if(typeof r!=="number")return r.K()
w.a9(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.k()
z.X(z,p+1,"pointerup",t-s,r-q)}}}},
fP:{
"^":"e:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gI(a)
x=x.gn(x)
x.toString
y=y.gI(a)
y=y.gp(y)
y.toString
z.X(z,0,"pointerdown",x,y)}}},
fQ:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gn(w)
w.toString
x=x.gI(a)
x=x.gp(x)
x.toString
z.X(z,0,"pointerup",w,x)
y.a=!1}}}},
fR:{
"^":"e:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fS:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gn(w)
w.toString
x=x.gI(a)
x=x.gp(x)
x.toString
z.X(z,0,"pointercancel",w,x)
y.a=!1}}}},
fT:{
"^":"e:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gI(a)
x=x.gn(x)
x.toString
y=y.gI(a)
y=y.gp(y)
y.toString
z.X(z,0,"pointermove",x,y)}}},
fU:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gn(w)
w.toString
x=x.gI(a)
x=x.gp(x)
x.toString
z.X(z,0,"pointercancel",w,x)
y.a=!1}}}},
fV:{
"^":"e:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}}}],["","",,S,{
"^":"",
fg:{
"^":"b;ap:b<,eA:e<",
c6:function(a){return!1},
eG:function(a,b){var z
if(!this.e){z=this.b.a
z[0]=z[0]+a
z[1]=z[1]+b}},
aA:function(a){},
c9:function(a){}},
aj:{
"^":"fg;cp:Q<,a,b,c,d,e,f,r,x,y,z",
aA:function(a){var z=this.c.a
this.eG(z[0]*a,z[1]*a)
z=this.x
z-=0.01*z
this.x=z
if(!this.e)this.r+=z*a*10},
c6:function(a){var z=this.c3(a)
if(this.Q+a.gcp()>z)return!0
else return!1},
c3:function(a){var z,y
z=a.gap()
z=z.gn(z)-this.b.a[0]
H.a7(z)
H.a7(2)
y=Math.pow(z,2)
z=a.gap()
z=z.gp(z)-this.b.a[1]
H.a7(z)
H.a7(2)
return Math.sqrt(H.a7(y+Math.pow(z,2)))},
c4:function(a){return a.b.K(0,this.b).eI()},
c9:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.e){z=this.c.a
z[0]=0
z[1]=0}if(a instanceof S.aj){y=this.c3(a)
z=this.Q
x=a.Q
w=this.c4(a)
v=this.c4(a)
u=a.c.K(0,this.c).a
t=v.a
s=-1*(1+(this.y+a.y)/2)*(u[0]*t[0]+u[1]*t[1]+u[2]*t[2])/(1/a.d+1/this.d)
r=v.l(0,s).ad(0,a.d)
q=v.l(0,-1).l(0,s).ad(0,this.d)
p=w.l(0,-1).l(0,this.Q).cb(v.l(0,1).l(0,s)).ad(0,5e-8)
o=w.l(0,1).l(0,this.Q).cb(v.l(0,-1).l(0,s)).ad(0,5e-8)
if(!this.e){this.c=this.c.k(0,q)
this.x=this.x+o.a[2]*1000}if(!a.e){a.b=a.b.k(0,w.l(0,z+x-y).ad(0,1))
a.c=a.c.k(0,r)
a.x=a.x+p.a[2]*1000}}}},
h_:{
"^":"b;a,b",
aA:function(a){var z,y,x,w,v,u,t,s,r
z=this.b
C.b.cS(z)
for(y=z.length,x=this.a.a,w=0;v=z.length,w<v;z.length===y||(0,H.Q)(z),++w){u=z[w]
for(t=J.n(u),s=0;s<z.length;z.length===v||(0,H.Q)(z),++s){r=z[s]
if(!t.m(u,r)&&u.c6(r))u.c9(r)}if(!u.geA()){v=u.c.a
v[0]=v[0]+x[0]
v[1]=v[1]+x[1]}u.aA(a)}}}}],["","",,E,{
"^":"",
S:{
"^":"b;a",
ae:function(a){var z,y
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
i:function(a){return"[0] "+this.aq(0).i(0)+"\n[1] "+this.aq(1).i(0)+"\n[2] "+this.aq(2).i(0)+"\n[3] "+this.aq(3).i(0)+"\n"},
gef:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
w:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
z[b]=c},
aq:function(a){var z,y,x
z=new Float64Array(H.j(4))
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
return new E.a4(z)},
b9:function(a){var z=new E.S(new Float64Array(H.j(16)))
z.ae(this)
return z},
l:function(a,b){var z,y,x
if(!!b.$isa4){z=new Float64Array(H.j(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a4(z)}if(!!b.$ism){z=new Float64Array(H.j(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.m(z)}if(4===b.gef()){z=new Float64Array(H.j(16))
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
return new E.S(z)}throw H.d(P.bk(b))},
k:function(a,b){var z,y
z=new Float64Array(H.j(16))
y=this.a
z[0]=C.a.k(y[0],b.gt().h(0,0))
z[1]=C.a.k(y[1],b.gt().h(0,1))
z[2]=C.a.k(y[2],b.gt().h(0,2))
z[3]=C.a.k(y[3],b.gt().h(0,3))
z[4]=C.a.k(y[4],b.gt().h(0,4))
z[5]=C.a.k(y[5],b.gt().h(0,5))
z[6]=C.a.k(y[6],b.gt().h(0,6))
z[7]=C.a.k(y[7],b.gt().h(0,7))
z[8]=C.a.k(y[8],b.gt().h(0,8))
z[9]=C.a.k(y[9],b.gt().h(0,9))
z[10]=C.a.k(y[10],b.gt().h(0,10))
z[11]=C.a.k(y[11],b.gt().h(0,11))
z[12]=C.a.k(y[12],b.gt().h(0,12))
z[13]=C.a.k(y[13],b.gt().h(0,13))
z[14]=C.a.k(y[14],b.gt().h(0,14))
z[15]=C.a.k(y[15],b.gt().h(0,15))
return new E.S(z)},
cw:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.n(b)
y=!!z.$isa4
x=y?b.gbu():1
if(!!z.$ism||y){w=z.gn(b)
v=z.gp(b)
u=z.gP(b)}else{u=d
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
bx:function(a,b,c,d){var z,y,x,w,v,u
z=J.n(b)
y=!!z.$isa4
x=y?b.gbu():1
if(!!z.$ism||y){w=z.gn(b)
v=z.gp(b)
u=z.gP(b)}else{u=d
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
T:function(){var z=this.a
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
ez:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
b4:{
"^":"b;a",
i:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+"]"},
k:function(a,b){var z,y,x
z=this.a
y=C.a.k(z[0],b.gt().h(0,0))
z=C.a.k(z[1],b.gt().h(0,1))
x=new Float64Array(H.j(2))
x[0]=y
x[1]=z
return new E.b4(x)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.h(z,b)
return z[b]},
w:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(H.a7(y*y+z*z))},
gap:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.j(2))
x[0]=y
x[1]=z
return new E.b4(x)},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}},
m:{
"^":"b;t:a<",
q:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ae:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+"]"},
K:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gt()[0]
w=z[1]
v=b.a
u=v[1]
z=z[2]
v=v[2]
t=new E.m(new Float64Array(H.j(3)))
t.q(y-x,w-u,z-v)
return t},
k:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gt()[0]
w=z[1]
v=b.a
u=v[1]
z=z[2]
v=v[2]
t=new E.m(new Float64Array(H.j(3)))
t.q(y+x,w+u,z+v)
return t},
ad:function(a,b){var z,y,x,w,v
z=1/b
y=this.a
x=y[0]
w=y[1]
y=y[2]
v=new E.m(new Float64Array(H.j(3)))
v.q(x*z,w*z,y*z)
return v},
l:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.U(b)
x=z[1]
z=z[2]
w=new E.m(new Float64Array(H.j(3)))
w.q(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
w:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.a7(y*y+x*x+z*z))},
eI:function(){var z,y
z=this.gj(this)
if(z===0)return this
z=1/z
y=this.a
y[0]=y[0]*z
y[1]=y[1]*z
y[2]=y[2]*z
return this},
cb:function(a){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=a.a
v=z[0]
u=z[1]
t=z[2]
z=new E.m(new Float64Array(H.j(3)))
z.q(x*t-w*u,w*v-y*t,y*u-x*v)
return z},
b9:function(a){var z=new E.m(new Float64Array(H.j(3)))
z.ae(this)
return z},
sn:function(a,b){this.a[0]=b
return b},
sp:function(a,b){this.a[1]=b
return b},
sP:function(a,b){this.a[2]=b
return b},
gap:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.j(2))
x[0]=y
x[1]=z
return new E.b4(x)},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}},
a4:{
"^":"b;a",
bA:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ae:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+","+H.c(z[3])},
k:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.k(z[0],b.gt().h(0,0))
x=C.a.k(z[1],b.gt().h(0,1))
w=C.a.k(z[2],b.gt().h(0,2))
z=C.a.k(z[3],b.gt().h(0,3))
v=new E.a4(new Float64Array(H.j(4)))
v.bA(y,x,w,z)
return v},
l:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.U(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a4(new Float64Array(H.j(4)))
v.bA(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
w:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.a7(y*y+x*x+w*w+z*z))},
b9:function(a){var z=new E.a4(new Float64Array(H.j(4)))
z.ae(this)
return z},
sn:function(a,b){this.a[0]=b
return b},
sp:function(a,b){this.a[1]=b
return b},
sP:function(a,b){this.a[2]=b
return b},
gap:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.j(2))
x[0]=y
x[1]=z
return new E.b4(x)},
gn:function(a){return this.a[0]},
gp:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cu.prototype
return J.f_.prototype}if(typeof a=="string")return J.aV.prototype
if(a==null)return J.f0.prototype
if(typeof a=="boolean")return J.eZ.prototype
if(a.constructor==Array)return J.aB.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aD.prototype
return a}if(a instanceof P.b)return a
return J.bc(a)}
J.P=function(a){if(typeof a=="string")return J.aV.prototype
if(a==null)return a
if(a.constructor==Array)return J.aB.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aD.prototype
return a}if(a instanceof P.b)return a
return J.bc(a)}
J.aL=function(a){if(a==null)return a
if(a.constructor==Array)return J.aB.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aD.prototype
return a}if(a instanceof P.b)return a
return J.bc(a)}
J.dt=function(a){if(typeof a=="number")return J.aC.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b3.prototype
return a}
J.i9=function(a){if(typeof a=="number")return J.aC.prototype
if(typeof a=="string")return J.aV.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b3.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aD.prototype
return a}if(a instanceof P.b)return a
return J.bc(a)}
J.av=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.i9(a).k(a,b)}
J.Y=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).m(a,b)}
J.dG=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dt(a).aL(a,b)}
J.c0=function(a,b){if(a.constructor==Array||typeof a=="string"||H.ip(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.P(a).h(a,b)}
J.dH=function(a,b,c,d){return J.i(a).de(a,b,c,d)}
J.dI=function(a,b,c,d){return J.i(a).dH(a,b,c,d)}
J.bg=function(a,b,c){return J.i(a).dN(a,b,c)}
J.dJ=function(a,b,c){return J.i(a).dO(a,b,c)}
J.dK=function(a,b){return J.i(a).dQ(a,b)}
J.dL=function(a,b,c,d,e){return J.i(a).dR(a,b,c,d,e)}
J.dM=function(a,b,c,d){return J.i(a).dS(a,b,c,d)}
J.dN=function(a,b){return J.aL(a).dV(a,b)}
J.dO=function(a,b,c,d,e){return J.i(a).dW(a,b,c,d,e)}
J.dP=function(a,b){return J.i(a).dX(a,b)}
J.dQ=function(a,b){return J.i(a).dY(a,b)}
J.c1=function(a,b,c,d,e){return J.i(a).dZ(a,b,c,d,e)}
J.dR=function(a,b){return J.i(a).ca(a,b)}
J.bh=function(a,b,c){return J.P(a).e1(a,b,c)}
J.bi=function(a){return J.i(a).e3(a)}
J.dS=function(a){return J.i(a).e6(a)}
J.dT=function(a,b){return J.i(a).e7(a,b)}
J.dU=function(a,b){return J.i(a).e8(a,b)}
J.c2=function(a,b){return J.i(a).e9(a,b)}
J.dV=function(a,b){return J.i(a).eg(a,b)}
J.dW=function(a,b,c,d,e){return J.i(a).eh(a,b,c,d,e)}
J.dX=function(a,b){return J.aL(a).W(a,b)}
J.c3=function(a,b){return J.i(a).ek(a,b)}
J.aO=function(a,b){return J.i(a).el(a,b)}
J.dY=function(a,b){return J.aL(a).H(a,b)}
J.c4=function(a){return J.i(a).gdU(a)}
J.V=function(a){return J.i(a).gai(a)}
J.A=function(a){return J.n(a).gA(a)}
J.bj=function(a){return J.aL(a).gE(a)}
J.aw=function(a){return J.P(a).gj(a)}
J.c5=function(a){return J.i(a).geJ(a)}
J.c6=function(a){return J.i(a).geK(a)}
J.dZ=function(a){return J.i(a).gaB(a)}
J.e_=function(a){return J.i(a).gaC(a)}
J.e0=function(a){return J.i(a).gaD(a)}
J.e1=function(a){return J.i(a).gaE(a)}
J.e2=function(a){return J.i(a).gaF(a)}
J.e3=function(a){return J.i(a).gaG(a)}
J.e4=function(a){return J.i(a).gaH(a)}
J.e5=function(a){return J.i(a).gbh(a)}
J.e6=function(a){return J.i(a).gaI(a)}
J.e7=function(a){return J.i(a).geL(a)}
J.e8=function(a){return J.i(a).geM(a)}
J.e9=function(a){return J.i(a).gbi(a)}
J.ea=function(a){return J.i(a).gaJ(a)}
J.eb=function(a){return J.i(a).gbt(a)}
J.ec=function(a){return J.i(a).gn(a)}
J.aP=function(a,b,c){return J.i(a).cC(a,b,c)}
J.ed=function(a){return J.i(a).cD(a)}
J.ee=function(a,b){return J.i(a).cE(a,b)}
J.c7=function(a,b){return J.i(a).cH(a,b)}
J.ef=function(a,b,c){return J.i(a).cI(a,b,c)}
J.eg=function(a,b){return J.aL(a).a8(a,b)}
J.eh=function(a,b){return J.i(a).su(a,b)}
J.ei=function(a,b){return J.i(a).sB(a,b)}
J.c8=function(a,b,c,d){return J.i(a).cU(a,b,c,d)}
J.c9=function(a,b,c,d){return J.i(a).cV(a,b,c,d)}
J.ca=function(a){return J.dt(a).aa(a)}
J.ah=function(a){return J.n(a).i(a)}
J.cb=function(a,b){return J.i(a).eW(a,b)}
J.aQ=function(a,b,c,d,e,f,g){return J.i(a).eX(a,b,c,d,e,f,g)}
var $=I.p
C.n=W.eI.prototype
C.o=J.f.prototype
C.b=J.aB.prototype
C.d=J.cu.prototype
C.a=J.aC.prototype
C.i=J.aV.prototype
C.x=J.aD.prototype
C.z=J.ff.prototype
C.A=J.b3.prototype
C.l=new H.cn()
C.m=new P.hc()
C.f=new P.hv()
C.c=new P.hH()
C.h=new P.ay(0)
C.p=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.q=function(hooks) {
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
C.j=function getTagFallback(o) {
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
C.k=function(hooks) { return hooks; }

C.r=function(getTagFallback) {
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
C.t=function() {
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
C.v=function(hooks) {
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
C.w=function(_, letter) { return letter.toUpperCase(); }
C.y=new H.eH([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.fK(0)
$.cH="$cachedFunction"
$.cI="$cachedInvocation"
$.R=0
$.ai=null
$.cc=null
$.bX=null
$.dm=null
$.dB=null
$.ba=null
$.bd=null
$.bY=null
$.ad=null
$.aq=null
$.ar=null
$.bR=!1
$.l=C.c
$.cq=0
$.cl=null
$.ck=null
$.cj=null
$.ci=null
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
I.$lazy(y,x,w)}})(["cg","$get$cg",function(){return init.getIsolateTag("_$dart_dartClosure")},"cs","$get$cs",function(){return H.eU()},"ct","$get$ct",function(){return new P.eD(null)},"cV","$get$cV",function(){return H.T(H.b2({toString:function(){return"$receiver$"}}))},"cW","$get$cW",function(){return H.T(H.b2({$method$:null,toString:function(){return"$receiver$"}}))},"cX","$get$cX",function(){return H.T(H.b2(null))},"cY","$get$cY",function(){return H.T(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d1","$get$d1",function(){return H.T(H.b2(void 0))},"d2","$get$d2",function(){return H.T(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d_","$get$d_",function(){return H.T(H.d0(null))},"cZ","$get$cZ",function(){return H.T(function(){try{null.$method$}catch(z){return z.message}}())},"d4","$get$d4",function(){return H.T(H.d0(void 0))},"d3","$get$d3",function(){return H.T(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bM","$get$bM",function(){return P.h0()},"at","$get$at",function(){return[]},"cf","$get$cf",function(){return{}}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[W.bz]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,P.a2]},{func:1,args:[,],opt:[,]},{func:1,ret:P.N,args:[P.o]},{func:1,v:true,args:[F.bJ,P.o,P.N,P.a8,P.a8]},{func:1,args:[W.bL]},{func:1,args:[,P.N]},{func:1,args:[P.N]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.o,,]},{func:1,v:true,args:[,],opt:[P.a2]},{func:1,ret:P.bU},{func:1,v:true,args:[P.b],opt:[P.a2]},{func:1,v:true,args:[,P.a2]},{func:1,args:[,,]},{func:1,args:[P.N,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iw(d||a)
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
Isolate.bb=a.bb
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