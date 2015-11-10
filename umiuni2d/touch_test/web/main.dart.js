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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bK"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bK"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bK(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b2=function(){}
var dart=[["","",,H,{
"^":"",
iP:{
"^":"b;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
b6:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b3:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bO==null){H.hV()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.cX("Return interceptor for "+H.a(y(a,z))))}w=H.i3(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.u
else return C.w}return w},
e:{
"^":"b;",
n:function(a,b){return a===b},
gq:function(a){return H.Z(a)},
i:["cF",function(a){return H.aR(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLUniformLocation"},
eE:{
"^":"e;",
i:function(a){return String(a)},
gq:function(a){return a?519018:218159},
$isbJ:1},
eG:{
"^":"e;",
n:function(a,b){return null==b},
i:function(a){return"null"},
gq:function(a){return 0}},
cf:{
"^":"e;",
gq:function(a){return 0},
$iseH:1},
eT:{
"^":"cf;"},
bz:{
"^":"cf;",
i:function(a){return String(a)}},
av:{
"^":"e;",
bS:function(a,b){if(!!a.immutable$list)throw H.f(new P.J(b))},
dt:function(a,b){if(!!a.fixed$length)throw H.f(new P.J(b))},
D:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.E(a))}},
a9:function(a,b){return H.d(new H.bo(a,b),[null,null])},
ax:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.a(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
S:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
gdT:function(a){if(a.length>0)return a[0]
throw H.f(H.bj())},
ga8:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(H.bj())},
bl:function(a,b,c,d,e){var z,y,x
this.bS(a,"set range")
P.cx(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.f(H.eC())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aH(a,"[","]")},
gC:function(a){return new J.e3(a,a.length,0,null)},
gq:function(a){return H.Z(a)},
gk:function(a){return a.length},
sk:function(a,b){this.dt(a,"set length")
if(b<0)throw H.f(P.aS(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.t(a,b))
if(b>=a.length||b<0)throw H.f(H.t(a,b))
return a[b]},
u:function(a,b,c){this.bS(a,"indexed set")
if(b>=a.length||!1)throw H.f(H.t(a,b))
a[b]=c},
$isaI:1,
$isj:1,
$asj:null,
$iso:1},
iO:{
"^":"av;"},
e3:{
"^":"b;a,b,c,d",
gt:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(new P.E(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aw:{
"^":"e;",
b9:function(a,b){return a%b},
a3:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.J(""+a))},
w:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.J(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gq:function(a){return a&0x1FFFFFFF},
l:function(a,b){if(typeof b!=="number")throw H.f(H.a3(b))
return a+b},
m:function(a,b){if(typeof b!=="number")throw H.f(H.a3(b))
return a-b},
cJ:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a3(a/b)},
ae:function(a,b){return(a|0)===a?a/b|0:this.a3(a/b)},
aW:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aB:function(a,b){if(typeof b!=="number")throw H.f(H.a3(b))
return a<b},
$isaE:1},
ce:{
"^":"aw;",
$isaE:1,
$isn:1},
eF:{
"^":"aw;",
$isaE:1},
aJ:{
"^":"e;",
dA:function(a,b){if(b>=a.length)throw H.f(H.t(a,b))
return a.charCodeAt(b)},
l:function(a,b){if(typeof b!=="string")throw H.f(P.e2(b,null,null))
return a+b},
cE:function(a,b,c){H.df(b)
if(c==null)c=a.length
H.df(c)
if(b<0)throw H.f(P.aT(b,null,null))
if(typeof c!=="number")return H.M(c)
if(b>c)throw H.f(P.aT(b,null,null))
if(c>a.length)throw H.f(P.aT(c,null,null))
return a.substring(b,c)},
cD:function(a,b){return this.cE(a,b,null)},
gH:function(a){return a.length===0},
i:function(a){return a},
gq:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.t(a,b))
if(b>=a.length||b<0)throw H.f(H.t(a,b))
return a[b]},
$isaI:1,
$isU:1}}],["","",,H,{
"^":"",
aA:function(a,b){var z=a.ah(b)
if(!init.globalState.d.cy)init.globalState.f.al()
return z},
b5:function(){--init.globalState.f.b},
ds:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.f(P.bc("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.hf(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cc()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.fS(P.bm(null,H.az),0)
y.z=P.aL(null,null,null,P.n,H.bE)
y.ch=P.aL(null,null,null,P.n,null)
if(y.x===!0){x=new H.he()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.ev,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hg)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aL(null,null,null,P.n,H.aU)
w=P.ah(null,null,null,P.n)
v=new H.aU(0,null,!1)
u=new H.bE(y,x,w,init.createNewIsolate(),v,new H.a7(H.b8()),new H.a7(H.b8()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
w.a7(0,0)
u.bn(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aC()
x=H.ae(y,[y]).Z(a)
if(x)u.ah(new H.i6(z,a))
else{y=H.ae(y,[y,y]).Z(a)
if(y)u.ah(new H.i7(z,a))
else u.ah(a)}init.globalState.f.al()},
ez:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eA()
return},
eA:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.J("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.J("Cannot extract URI from \""+H.a(z)+"\""))},
ev:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.aX(!0,[]).a_(b.data)
y=J.L(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.aX(!0,[]).a_(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.aX(!0,[]).a_(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aL(null,null,null,P.n,H.aU)
p=P.ah(null,null,null,P.n)
o=new H.aU(0,null,!1)
n=new H.bE(y,q,p,init.createNewIsolate(),o,new H.a7(H.b8()),new H.a7(H.b8()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
p.a7(0,0)
n.bn(0,o)
init.globalState.f.a.R(new H.az(n,new H.ew(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.al()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").W(y.h(z,"msg"))
init.globalState.f.al()
break
case"close":init.globalState.ch.a2(0,$.$get$cd().h(0,a))
a.terminate()
init.globalState.f.al()
break
case"log":H.eu(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a9(["command","print","msg",z])
q=new H.aa(!0,P.a8(null,P.n)).F(q)
y.toString
self.postMessage(q)}else P.b7(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},
eu:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a9(["command","log","msg",a])
x=new H.aa(!0,P.a8(null,P.n)).F(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.y(w)
z=H.v(w)
throw H.f(P.aG(z))}},
ex:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.ct=$.ct+("_"+y)
$.cu=$.cu+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.W(["spawned",new H.aZ(y,x),w,z.r])
x=new H.ey(a,b,c,d,z)
if(e===!0){z.bQ(w,w)
init.globalState.f.a.R(new H.az(z,x,"start isolate"))}else x.$0()},
hz:function(a){return new H.aX(!0,[]).a_(new H.aa(!1,P.a8(null,P.n)).F(a))},
i6:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
i7:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hf:{
"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hg:function(a){var z=P.a9(["command","print","msg",a])
return new H.aa(!0,P.a8(null,P.n)).F(z)}}},
bE:{
"^":"b;a,b,c,e6:d<,dE:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bQ:function(a,b){if(!this.f.n(0,a))return
if(this.Q.a7(0,b)&&!this.y)this.y=!0
this.aX()},
ec:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a2(0,a)
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
if(w===y.c)y.bx();++y.d}this.y=!1}this.aX()},
dk:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eb:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.x(new P.J("removeRange"))
P.cx(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cz:function(a,b){if(!this.r.n(0,a))return
this.db=b},
dX:function(a,b,c){var z=J.l(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){a.W(c)
return}z=this.cx
if(z==null){z=P.bm(null,null)
this.cx=z}z.R(new H.h9(a,c))},
dV:function(a,b){var z
if(!this.r.n(0,a))return
z=J.l(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.b4()
return}z=this.cx
if(z==null){z=P.bm(null,null)
this.cx=z}z.R(this.ge7())},
dY:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.b7(a)
if(b!=null)P.b7(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.ar(a)
y[1]=b==null?null:J.ar(b)
for(x=new P.ch(z,z.r,null,null),x.c=z.e;x.p();)x.d.W(y)},
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
this.dY(w,v)
if(this.db===!0){this.b4()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ge6()
if(this.cx!=null)for(;t=this.cx,!t.gH(t);)this.cx.ca().$0()}return y},
c0:function(a){return this.b.h(0,a)},
bn:function(a,b){var z=this.b
if(z.aw(a))throw H.f(P.aG("Registry: ports must be registered only once."))
z.u(0,a,b)},
aX:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.b4()},
b4:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.O(0)
for(z=this.b,y=z.gbg(z),y=y.gC(y);y.p();)y.gt().cV()
z.O(0)
this.c.O(0)
init.globalState.z.a2(0,this.a)
this.dx.O(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.W(z[v])}this.ch=null}},"$0","ge7",0,0,1]},
h9:{
"^":"c:1;a,b",
$0:function(){this.a.W(this.b)}},
fS:{
"^":"b;a,b",
dK:function(){var z=this.a
if(z.b===z.c)return
return z.ca()},
ce:function(){var z,y,x
z=this.dK()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aw(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gH(y)}else y=!1
else y=!1
else y=!1
if(y)H.x(P.aG("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gH(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a9(["command","close"])
x=new H.aa(!0,P.a8(null,P.n)).F(x)
y.toString
self.postMessage(x)}return!1}z.ea()
return!0},
bI:function(){if(self.window!=null)new H.fT(this).$0()
else for(;this.ce(););},
al:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bI()
else try{this.bI()}catch(x){w=H.y(x)
z=w
y=H.v(x)
w=init.globalState.Q
v=P.a9(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.aa(!0,P.a8(null,P.n)).F(v)
w.toString
self.postMessage(v)}}},
fT:{
"^":"c:1;a",
$0:function(){if(!this.a.ce())return
P.cF(C.f,this)}},
az:{
"^":"b;a,b,c",
ea:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ah(this.b)}},
he:{
"^":"b;"},
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
x=H.aC()
w=H.ae(x,[x,x]).Z(y)
if(w)y.$2(this.b,this.c)
else{x=H.ae(x,[x]).Z(y)
if(x)y.$1(this.b)
else y.$0()}}z.aX()}},
cZ:{
"^":"b;"},
aZ:{
"^":"cZ;b,a",
W:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbA())return
x=H.hz(a)
if(z.gdE()===y){y=J.L(x)
switch(y.h(x,0)){case"pause":z.bQ(y.h(x,1),y.h(x,2))
break
case"resume":z.ec(y.h(x,1))
break
case"add-ondone":z.dk(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eb(y.h(x,1))
break
case"set-errors-fatal":z.cz(y.h(x,1),y.h(x,2))
break
case"ping":z.dX(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.dV(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a7(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a2(0,y)
break}return}y=init.globalState.f
w="receive "+H.a(a)
y.a.R(new H.az(z,new H.hi(this,x),w))},
n:function(a,b){if(b==null)return!1
return b instanceof H.aZ&&J.Q(this.b,b.b)},
gq:function(a){return this.b.gaR()}},
hi:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbA())z.cR(this.b)}},
bG:{
"^":"cZ;b,c,a",
W:function(a){var z,y,x
z=P.a9(["command","message","port",this,"msg",a])
y=new H.aa(!0,P.a8(null,P.n)).F(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.bG&&J.Q(this.b,b.b)&&J.Q(this.a,b.a)&&J.Q(this.c,b.c)},
gq:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cA()
y=this.a
if(typeof y!=="number")return y.cA()
x=this.c
if(typeof x!=="number")return H.M(x)
return(z<<16^y<<8^x)>>>0}},
aU:{
"^":"b;aR:a<,b,bA:c<",
cV:function(){this.c=!0
this.b=null},
cR:function(a){if(this.c)return
this.d3(a)},
d3:function(a){return this.b.$1(a)},
$iseV:1},
fe:{
"^":"b;a,b,c",
cL:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.R(new H.az(y,new H.fg(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ao(new H.fh(this,b),0),a)}else throw H.f(new P.J("Timer greater than 0."))},
static:{ff:function(a,b){var z=new H.fe(!0,!1,null)
z.cL(a,b)
return z}}},
fg:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fh:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
H.b5()
this.b.$0()}},
a7:{
"^":"b;aR:a<",
gq:function(a){var z=this.a
if(typeof z!=="number")return z.eo()
z=C.a.aW(z,0)^C.a.ae(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a7){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aa:{
"^":"b;a,b",
F:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gk(z))
z=J.l(a)
if(!!z.$iscl)return["buffer",a]
if(!!z.$isbs)return["typed",a]
if(!!z.$isaI)return this.ct(a)
if(!!z.$iset){x=this.gcq()
w=a.gbX()
w=H.aO(w,x,H.G(w,"I",0),null)
w=P.bn(w,!0,H.G(w,"I",0))
z=z.gbg(a)
z=H.aO(z,x,H.G(z,"I",0),null)
return["map",w,P.bn(z,!0,H.G(z,"I",0))]}if(!!z.$iseH)return this.cu(a)
if(!!z.$ise)this.ci(a)
if(!!z.$iseV)this.am(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isaZ)return this.cv(a)
if(!!z.$isbG)return this.cw(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.am(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa7)return["capability",a.a]
if(!(a instanceof P.b))this.ci(a)
return["dart",init.classIdExtractor(a),this.cs(init.classFieldsExtractor(a))]},"$1","gcq",2,0,2],
am:function(a,b){throw H.f(new P.J(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
ci:function(a){return this.am(a,null)},
ct:function(a){var z=this.cr(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.am(a,"Can't serialize indexable: ")},
cr:function(a){var z,y,x
z=[]
C.c.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.F(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cs:function(a){var z
for(z=0;z<a.length;++z)C.c.u(a,z,this.F(a[z]))
return a},
cu:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.am(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.F(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cw:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cv:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaR()]
return["raw sendport",a]}},
aX:{
"^":"b;a,b",
a_:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.bc("Bad serialized message: "+H.a(a)))
switch(C.c.gdT(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
case"map":return this.dN(a)
case"sendport":return this.dO(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dM(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.a7(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.af(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.a(a))}},"$1","gdL",2,0,2],
af:function(a){var z,y,x
z=J.L(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.M(x)
if(!(y<x))break
z.u(a,y,this.a_(z.h(a,y)));++y}return a},
dN:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aM()
this.b.push(w)
y=J.dZ(y,this.gdL()).bd(0)
for(z=J.L(y),v=J.L(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.h(y,u)
w.u(0,y[u],this.a_(v.h(x,u)))}return w},
dO:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.Q(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c0(w)
if(u==null)return
t=new H.aZ(u,x)}else t=new H.bG(y,w,x)
this.b.push(t)
return t},
dM:function(a){var z,y,x,w,v,u,t
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
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.M(t)
if(!(u<t))break
w[z.h(y,u)]=this.a_(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
ea:function(){throw H.f(new P.J("Cannot modify unmodifiable Map"))},
hQ:function(a){return init.types[a]},
i2:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaK},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ar(a)
if(typeof z!=="string")throw H.f(H.a3(a))
return z},
Z:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cv:function(a){var z,y
z=C.h(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.dA(z,0)===36)z=C.e.cD(z,1)
return(z+H.dl(H.bM(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aR:function(a){return"Instance of '"+H.cv(a)+"'"},
A:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cs:function(a){return a.b?H.A(a).getUTCMilliseconds()+0:H.A(a).getMilliseconds()+0},
aQ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.a3(a))
return a[b]},
bt:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.a3(a))
a[b]=c},
M:function(a){throw H.f(H.a3(a))},
h:function(a,b){if(a==null)J.aq(a)
throw H.f(H.t(a,b))},
t:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a6(!0,b,"index",null)
z=J.aq(a)
if(!(b<0)){if(typeof z!=="number")return H.M(z)
y=b>=z}else y=!0
if(y)return P.bi(b,a,"index",null,z)
return P.aT(b,"index",null)},
a3:function(a){return new P.a6(!0,a,null,null)},
dg:function(a){return a},
df:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(H.a3(a))
return a},
f:function(a){var z
if(a==null)a=new P.cr()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.du})
z.name=""}else z.toString=H.du
return z},
du:function(){return J.ar(this.dartException)},
x:function(a){throw H.f(a)},
ap:function(a){throw H.f(new P.E(a))},
y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.i9(a)
if(a==null)return
if(a instanceof H.bh)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.aW(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bk(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.cq(v,null))}}if(a instanceof TypeError){u=$.$get$cL()
t=$.$get$cM()
s=$.$get$cN()
r=$.$get$cO()
q=$.$get$cS()
p=$.$get$cT()
o=$.$get$cQ()
$.$get$cP()
n=$.$get$cV()
m=$.$get$cU()
l=u.J(y)
if(l!=null)return z.$1(H.bk(y,l))
else{l=t.J(y)
if(l!=null){l.method="call"
return z.$1(H.bk(y,l))}else{l=s.J(y)
if(l==null){l=r.J(y)
if(l==null){l=q.J(y)
if(l==null){l=p.J(y)
if(l==null){l=o.J(y)
if(l==null){l=r.J(y)
if(l==null){l=n.J(y)
if(l==null){l=m.J(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cq(y,l==null?null:l.method))}}return z.$1(new H.fC(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cA()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a6(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cA()
return a},
v:function(a){var z
if(a instanceof H.bh)return a.b
if(a==null)return new H.d3(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d3(a,null)},
i5:function(a){if(a==null||typeof a!='object')return J.u(a)
else return H.Z(a)},
di:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
hX:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.n(c,0))return H.aA(b,new H.hY(a))
else if(z.n(c,1))return H.aA(b,new H.hZ(a,d))
else if(z.n(c,2))return H.aA(b,new H.i_(a,d,e))
else if(z.n(c,3))return H.aA(b,new H.i0(a,d,e,f))
else if(z.n(c,4))return H.aA(b,new H.i1(a,d,e,f,g))
else throw H.f(P.aG("Unsupported number of arguments for wrapped closure"))},
ao:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.hX)
a.$identity=z
return z},
e8:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.eY(z).r}else x=c
w=d?Object.create(new H.f2().constructor.prototype):Object.create(new H.bd(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.N
$.N=J.a5(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.c5(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.hQ(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.c4:H.be
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.c5(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
e5:function(a,b,c,d){var z=H.be
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
c5:function(a,b,c){var z,y,x,w,v,u
if(c)return H.e7(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.e5(y,!w,z,b)
if(y===0){w=$.af
if(w==null){w=H.aF("self")
$.af=w}w="return function(){return this."+H.a(w)+"."+H.a(z)+"();"
v=$.N
$.N=J.a5(v,1)
return new Function(w+H.a(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.af
if(v==null){v=H.aF("self")
$.af=v}v=w+H.a(v)+"."+H.a(z)+"("+u+");"
w=$.N
$.N=J.a5(w,1)
return new Function(v+H.a(w)+"}")()},
e6:function(a,b,c,d){var z,y
z=H.be
y=H.c4
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
e7:function(a,b){var z,y,x,w,v,u,t,s
z=H.e4()
y=$.c3
if(y==null){y=H.aF("receiver")
$.c3=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.e6(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.N
$.N=J.a5(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.N
$.N=J.a5(u,1)
return new Function(y+H.a(u)+"}")()},
bK:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.e8(a,b,z,!!d,e,f)},
i8:function(a){throw H.f(new P.ec("Cyclic initialization for static "+H.a(a)))},
ae:function(a,b,c){return new H.f_(a,b,c,null)},
aC:function(){return C.k},
b8:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a4:function(a,b,c){var z
if(b===0){J.dE(c,a)
return}else if(b===1){c.dC(H.y(a),H.v(a))
return}if(!!J.l(a).$isS)z=a
else{z=H.d(new P.C(0,$.k,null),[null])
z.aI(a)}z.bc(H.db(b,0),new H.hJ(b))
return c.gdU()},
db:function(a,b){return new H.hG(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
d:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bM:function(a){if(a==null)return
return a.$builtinTypeInfo},
dj:function(a,b){return H.dt(a["$as"+H.a(b)],H.bM(a))},
G:function(a,b,c){var z=H.dj(a,b)
return z==null?null:z[c]},
r:function(a,b){var z=H.bM(a)
return z==null?null:z[b]},
bR:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dl(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dl:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bu("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.a(H.bR(u,c))}return w?"":"<"+H.a(z)+">"},
dt:function(a,b){if(typeof a=="function"){a=H.bP(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bP(a,null,b)}return b},
hI:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.H(a[y],b[y]))return!1
return!0},
b0:function(a,b,c){return H.bP(a,b,H.dj(b,c))},
H:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dk(a,b)
if('func' in a)return b.builtin$cls==="iJ"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bR(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.a(H.bR(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hI(H.dt(v,z),x)},
dd:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.H(z,v)||H.H(v,z)))return!1}return!0},
hH:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.H(v,u)||H.H(u,v)))return!1}return!0},
dk:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.H(z,y)||H.H(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dd(x,w,!1))return!1
if(!H.dd(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.H(o,n)||H.H(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.H(o,n)||H.H(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.H(o,n)||H.H(n,o)))return!1}}return H.hH(a.named,b.named)},
bP:function(a,b,c){return a.apply(b,c)},
jA:function(a){var z=$.bN
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jy:function(a){return H.Z(a)},
jx:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
i3:function(a){var z,y,x,w,v,u
z=$.bN.$1(a)
y=$.b1[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b4[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dc.$2(a,z)
if(z!=null){y=$.b1[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b4[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bQ(x)
$.b1[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.b4[z]=x
return x}if(v==="-"){u=H.bQ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dn(a,x)
if(v==="*")throw H.f(new P.cX(z))
if(init.leafTags[z]===true){u=H.bQ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dn(a,x)},
dn:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.b6(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bQ:function(a){return J.b6(a,!1,null,!!a.$isaK)},
i4:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.b6(z,!1,null,!!z.$isaK)
else return J.b6(z,c,null,null)},
hV:function(){if(!0===$.bO)return
$.bO=!0
H.hW()},
hW:function(){var z,y,x,w,v,u,t,s
$.b1=Object.create(null)
$.b4=Object.create(null)
H.hR()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dq.$1(v)
if(u!=null){t=H.i4(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
hR:function(){var z,y,x,w,v,u,t
z=C.p()
z=H.ad(C.m,H.ad(C.r,H.ad(C.i,H.ad(C.i,H.ad(C.q,H.ad(C.n,H.ad(C.o(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bN=new H.hS(v)
$.dc=new H.hT(u)
$.dq=new H.hU(t)},
ad:function(a,b){return a(b)||b},
e9:{
"^":"b;",
i:function(a){return P.ck(this)},
u:function(a,b,c){return H.ea()}},
en:{
"^":"e9;a",
aQ:function(){var z=this.$map
if(z==null){z=new H.ax(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.di(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aQ().h(0,b)},
D:function(a,b){this.aQ().D(0,b)},
gk:function(a){var z=this.aQ()
return z.gk(z)}},
eX:{
"^":"b;a,b,c,d,e,f,r,x",
static:{eY:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.eX(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fB:{
"^":"b;a,b,c,d,e,f",
J:function(a){var z,y,x
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
return new H.fB(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},aW:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},cR:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cq:{
"^":"w;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
eJ:{
"^":"w;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
static:{bk:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.eJ(a,y,z?null:b.receiver)}}},
fC:{
"^":"w;a",
i:function(a){var z=this.a
return C.e.gH(z)?"Error":"Error: "+z}},
i9:{
"^":"c:2;a",
$1:function(a){if(!!J.l(a).$isw)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
d3:{
"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
hY:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
hZ:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
i_:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
i0:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
i1:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"b;",
i:function(a){return"Closure '"+H.cv(this)+"'"},
gcj:function(){return this},
gcj:function(){return this}},
cD:{
"^":"c;"},
f2:{
"^":"cD;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bd:{
"^":"cD;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bd))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gq:function(a){var z,y
z=this.c
if(z==null)y=H.Z(this.a)
else y=typeof z!=="object"?J.u(z):H.Z(z)
z=H.Z(this.b)
if(typeof y!=="number")return y.ep()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.aR(z)},
static:{be:function(a){return a.a},c4:function(a){return a.c},e4:function(){var z=$.af
if(z==null){z=H.aF("self")
$.af=z}return z},aF:function(a){var z,y,x,w,v
z=new H.bd("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eZ:{
"^":"w;a",
i:function(a){return"RuntimeError: "+this.a}},
cz:{
"^":"b;"},
f_:{
"^":"cz;a,b,c,d",
Z:function(a){var z=this.d_(a)
return z==null?!1:H.dk(z,this.aa())},
d_:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
aa:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isjh)z.void=true
else if(!x.$isc8)z.ret=y.aa()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cy(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cy(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dh(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aa()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.dh(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].aa())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
static:{cy:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aa())
return z}}},
c8:{
"^":"cz;",
i:function(a){return"dynamic"},
aa:function(){return}},
bh:{
"^":"b;a,M:b<"},
hJ:{
"^":"c:5;a",
$2:function(a,b){H.db(this.a,1).$1(new H.bh(a,b))}},
hG:{
"^":"c:2;a,b",
$1:function(a){this.b(this.a,a)}},
ax:{
"^":"b;a,b,c,d,e,f,r",
gk:function(a){return this.a},
gH:function(a){return this.a===0},
gbX:function(){return H.d(new H.eL(this),[H.r(this,0)])},
gbg:function(a){return H.aO(this.gbX(),new H.eI(this),H.r(this,0),H.r(this,1))},
aw:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.cY(z,a)}else return this.e1(a)},
e1:function(a){var z=this.d
if(z==null)return!1
return this.aj(this.N(z,this.ai(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.N(z,b)
return y==null?null:y.ga0()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.N(x,b)
return y==null?null:y.ga0()}else return this.e2(b)},
e2:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.N(z,this.ai(a))
x=this.aj(y,a)
if(x<0)return
return y[x].ga0()},
u:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aT()
this.b=z}this.bm(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aT()
this.c=y}this.bm(y,b,c)}else this.e4(b,c)},
e4:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aT()
this.d=z}y=this.ai(a)
x=this.N(z,y)
if(x==null)this.aV(z,y,[this.aU(a,b)])
else{w=this.aj(x,a)
if(w>=0)x[w].sa0(b)
else x.push(this.aU(a,b))}},
a2:function(a,b){if(typeof b==="string")return this.bH(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bH(this.c,b)
else return this.e3(b)},
e3:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.N(z,this.ai(a))
x=this.aj(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bO(w)
return w.ga0()},
O:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
D:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.E(this))
z=z.c}},
bm:function(a,b,c){var z=this.N(a,b)
if(z==null)this.aV(a,b,this.aU(b,c))
else z.sa0(c)},
bH:function(a,b){var z
if(a==null)return
z=this.N(a,b)
if(z==null)return
this.bO(z)
this.bt(a,b)
return z.ga0()},
aU:function(a,b){var z,y
z=new H.eK(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bO:function(a){var z,y
z=a.gdd()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ai:function(a){return J.u(a)&0x3ffffff},
aj:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Q(a[y].gbV(),b))return y
return-1},
i:function(a){return P.ck(this)},
N:function(a,b){return a[b]},
aV:function(a,b,c){a[b]=c},
bt:function(a,b){delete a[b]},
cY:function(a,b){return this.N(a,b)!=null},
aT:function(){var z=Object.create(null)
this.aV(z,"<non-identifier-key>",z)
this.bt(z,"<non-identifier-key>")
return z},
$iset:1},
eI:{
"^":"c:2;a",
$1:function(a){return this.a.h(0,a)}},
eK:{
"^":"b;bV:a<,a0:b@,c,dd:d<"},
eL:{
"^":"I;a",
gk:function(a){return this.a.a},
gC:function(a){var z,y
z=this.a
y=new H.eM(z,z.r,null,null)
y.c=z.e
return y},
D:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.E(z))
y=y.c}},
$iso:1},
eM:{
"^":"b;a,b,c,d",
gt:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.E(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hS:{
"^":"c:2;a",
$1:function(a){return this.a(a)}},
hT:{
"^":"c:9;a",
$2:function(a,b){return this.a(a,b)}},
hU:{
"^":"c:10;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bj:function(){return new P.ai("No element")},
eC:function(){return new P.ai("Too few elements")},
fc:function(a){return a.gev()},
aN:{
"^":"I;",
gC:function(a){return new H.ci(this,this.gk(this),0,null)},
D:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.S(0,y))
if(z!==this.gk(this))throw H.f(new P.E(this))}},
a9:function(a,b){return H.d(new H.bo(this,b),[null,null])},
be:function(a,b){var z,y,x
if(b){z=H.d([],[H.G(this,"aN",0)])
C.c.sk(z,this.gk(this))}else z=H.d(Array(this.gk(this)),[H.G(this,"aN",0)])
for(y=0;y<this.gk(this);++y){x=this.S(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bd:function(a){return this.be(a,!0)},
$iso:1},
ci:{
"^":"b;a,b,c,d",
gt:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.L(z)
x=y.gk(z)
if(this.b!==x)throw H.f(new P.E(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.S(z,w);++this.c
return!0}},
cj:{
"^":"I;a,b",
gC:function(a){var z=new H.eP(null,J.ba(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gk:function(a){return J.aq(this.a)},
$asI:function(a,b){return[b]},
static:{aO:function(a,b,c,d){if(!!J.l(a).$iso)return H.d(new H.c9(a,b),[c,d])
return H.d(new H.cj(a,b),[c,d])}}},
c9:{
"^":"cj;a,b",
$iso:1},
eP:{
"^":"eD;a,b,c",
p:function(){var z=this.b
if(z.p()){this.a=this.aP(z.gt())
return!0}this.a=null
return!1},
gt:function(){return this.a},
aP:function(a){return this.c.$1(a)}},
bo:{
"^":"aN;a,b",
gk:function(a){return J.aq(this.a)},
S:function(a,b){return this.aP(J.dJ(this.a,b))},
aP:function(a){return this.b.$1(a)},
$asaN:function(a,b){return[b]},
$asI:function(a,b){return[b]},
$iso:1},
cb:{
"^":"b;"}}],["","",,H,{
"^":"",
dh:function(a){var z=H.d(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
fE:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hK()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ao(new P.fG(z),1)).observe(y,{childList:true})
return new P.fF(z,y,x)}else if(self.setImmediate!=null)return P.hL()
return P.hM()},
jj:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ao(new P.fH(a),0))},"$1","hK",2,0,4],
jk:[function(a){++init.globalState.f.b
self.setImmediate(H.ao(new P.fI(a),0))},"$1","hL",2,0,4],
jl:[function(a){P.bv(C.f,a)},"$1","hM",2,0,4],
d6:function(a,b){var z=H.aC()
z=H.ae(z,[z,z]).Z(a)
if(z){b.toString
return a}else{b.toString
return a}},
el:function(a,b,c){var z=new P.C(0,$.k,null)
z.$builtinTypeInfo=[c]
P.cF(a,new P.em(b,z))
return z},
c6:function(a){return H.d(new P.fD(H.d(new P.C(0,$.k,null),[a])),[a])},
hA:function(a,b,c){$.k.toString
a.G(b,c)},
hC:function(){var z,y
for(;z=$.ab,z!=null;){$.am=null
y=z.c
$.ab=y
if(y==null)$.al=null
$.k=z.b
z.dr()}},
jw:[function(){$.bH=!0
try{P.hC()}finally{$.k=C.b
$.am=null
$.bH=!1
if($.ab!=null)$.$get$bB().$1(P.de())}},"$0","de",0,0,1],
da:function(a){if($.ab==null){$.al=a
$.ab=a
if(!$.bH)$.$get$bB().$1(P.de())}else{$.al.c=a
$.al=a}},
dr:function(a){var z,y
z=$.k
if(C.b===z){P.ac(null,null,C.b,a)
return}z.toString
if(C.b.gb3()===z){P.ac(null,null,z,a)
return}y=$.k
P.ac(null,null,y,y.aY(a,!0))},
j9:function(a,b){var z,y,x
z=H.d(new P.d4(null,null,null,0),[b])
y=z.gd7()
x=z.gd9()
z.a=a.a1(y,!0,z.gd8(),x)
return z},
hE:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.y(u)
z=t
y=H.v(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.R(x)
w=t
v=x.gM()
c.$2(w,v)}}},
hv:function(a,b,c,d){var z=a.b_()
if(!!J.l(z).$isS)z.bi(new P.hy(b,c,d))
else b.G(c,d)},
hw:function(a,b){return new P.hx(a,b)},
cF:function(a,b){var z=$.k
if(z===C.b){z.toString
return P.bv(a,b)}return P.bv(a,z.aY(b,!0))},
bv:function(a,b){var z=C.d.ae(a.a,1000)
return H.ff(z<0?0:z,b)},
bA:function(a){var z=$.k
$.k=a
return z},
aB:function(a,b,c,d,e){var z,y,x
z=new P.cY(new P.hD(d,e),C.b,null)
y=$.ab
if(y==null){P.da(z)
$.am=$.al}else{x=$.am
if(x==null){z.c=y
$.am=z
$.ab=z}else{z.c=x.c
x.c=z
$.am=z
if(z.c==null)$.al=z}}},
d7:function(a,b,c,d){var z,y
if($.k===c)return d.$0()
z=P.bA(c)
try{y=d.$0()
return y}finally{$.k=z}},
d9:function(a,b,c,d,e){var z,y
if($.k===c)return d.$1(e)
z=P.bA(c)
try{y=d.$1(e)
return y}finally{$.k=z}},
d8:function(a,b,c,d,e,f){var z,y
if($.k===c)return d.$2(e,f)
z=P.bA(c)
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ac:function(a,b,c,d){var z=C.b!==c
if(z){d=c.aY(d,!(!z||C.b.gb3()===c))
c=C.b}P.da(new P.cY(d,c,null))},
fG:{
"^":"c:2;a",
$1:function(a){var z,y
H.b5()
z=this.a
y=z.a
z.a=null
y.$0()}},
fF:{
"^":"c:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fH:{
"^":"c:0;a",
$0:function(){H.b5()
this.a.$0()}},
fI:{
"^":"c:0;a",
$0:function(){H.b5()
this.a.$0()}},
hs:{
"^":"X;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.a(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.a(y)):z},
static:{ht:function(a,b){if(b!=null)return b
if(!!J.l(a).$isw)return a.gM()
return}}},
S:{
"^":"b;"},
em:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a4(null)}catch(x){w=H.y(x)
z=w
y=H.v(x)
P.hA(this.b,z,y)}}},
fM:{
"^":"b;dU:a<",
dC:function(a,b){a=a!=null?a:new P.cr()
if(this.a.a!==0)throw H.f(new P.ai("Future already completed"))
$.k.toString
this.G(a,b)}},
fD:{
"^":"fM;a",
bT:function(a,b){var z=this.a
if(z.a!==0)throw H.f(new P.ai("Future already completed"))
z.aI(b)},
G:function(a,b){this.a.cU(a,b)}},
aj:{
"^":"b;bB:a<,ed:b>,c,d,e",
ga6:function(){return this.b.b},
gbU:function(){return(this.c&1)!==0},
ge_:function(){return this.c===6},
gdZ:function(){return this.c===8},
gdc:function(){return this.d},
gdj:function(){return this.d}},
C:{
"^":"b;at:a?,a6:b<,c",
gd4:function(){return this.a===8},
sd5:function(a){if(a)this.a=2
else this.a=0},
bc:function(a,b){var z,y
z=H.d(new P.C(0,$.k,null),[null])
y=z.b
if(y!==C.b){y.toString
if(b!=null)b=P.d6(b,y)}this.aF(new P.aj(null,z,b==null?1:3,a,b))
return z},
bi:function(a){var z,y
z=$.k
y=new P.C(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.b)z.toString
this.aF(new P.aj(null,y,8,a,null))
return y},
aS:function(){if(this.a!==0)throw H.f(new P.ai("Future already completed"))
this.a=1},
gdi:function(){return this.c},
gad:function(){return this.c},
bN:function(a){this.a=4
this.c=a},
bM:function(a){this.a=8
this.c=a},
dg:function(a,b){this.bM(new P.X(a,b))},
aF:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ac(null,null,z,new P.fX(this,a))}else{a.a=this.c
this.c=a}},
as:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbB()
z.a=y}return y},
a4:function(a){var z,y
z=J.l(a)
if(!!z.$isS)if(!!z.$isC)P.aY(a,this)
else P.bD(a,this)
else{y=this.as()
this.bN(a)
P.a1(this,y)}},
bs:function(a){var z=this.as()
this.bN(a)
P.a1(this,z)},
G:[function(a,b){var z=this.as()
this.bM(new P.X(a,b))
P.a1(this,z)},function(a){return this.G(a,null)},"eq","$2","$1","gaM",2,2,12,0],
aI:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isS){if(!!z.$isC){z=a.a
if(z>=4&&z===8){this.aS()
z=this.b
z.toString
P.ac(null,null,z,new P.fZ(this,a))}else P.aY(a,this)}else P.bD(a,this)
return}}this.aS()
z=this.b
z.toString
P.ac(null,null,z,new P.h_(this,a))},
cU:function(a,b){var z
this.aS()
z=this.b
z.toString
P.ac(null,null,z,new P.fY(this,a,b))},
$isS:1,
static:{bD:function(a,b){var z,y,x,w
b.sat(2)
try{a.bc(new P.h0(b),new P.h1(b))}catch(x){w=H.y(x)
z=w
y=H.v(x)
P.dr(new P.h2(b,z,y))}},aY:function(a,b){var z
b.a=2
z=new P.aj(null,b,0,null,null)
if(a.a>=4)P.a1(a,z)
else a.aF(z)},a1:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gd4()
if(b==null){if(w){v=z.a.gad()
y=z.a.ga6()
x=J.R(v)
u=v.gM()
y.toString
P.aB(null,null,y,x,u)}return}for(;b.gbB()!=null;b=t){t=b.a
b.a=null
P.a1(z.a,b)}x.a=!0
s=w?null:z.a.gdi()
x.b=s
x.c=!1
y=!w
if(!y||b.gbU()||b.c===8){r=b.ga6()
if(w){u=z.a.ga6()
u.toString
if(u==null?r!=null:u!==r){u=u.gb3()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gad()
y=z.a.ga6()
x=J.R(v)
u=v.gM()
y.toString
P.aB(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gbU())x.a=new P.h4(x,b,s,r).$0()}else new P.h3(z,x,b,r).$0()
if(b.gdZ())new P.h5(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isS}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.C)if(p.a>=4){o.a=2
z.a=p
b=new P.aj(null,o,0,null,null)
y=p
continue}else P.aY(p,o)
else P.bD(p,o)
return}}o=b.b
b=o.as()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
fX:{
"^":"c:0;a,b",
$0:function(){P.a1(this.a,this.b)}},
h0:{
"^":"c:2;a",
$1:function(a){this.a.bs(a)}},
h1:{
"^":"c:6;a",
$2:function(a,b){this.a.G(a,b)},
$1:function(a){return this.$2(a,null)}},
h2:{
"^":"c:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
fZ:{
"^":"c:0;a,b",
$0:function(){P.aY(this.b,this.a)}},
h_:{
"^":"c:0;a,b",
$0:function(){this.a.bs(this.b)}},
fY:{
"^":"c:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
h4:{
"^":"c:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.az(this.b.gdc(),this.c)
return!0}catch(x){w=H.y(x)
z=w
y=H.v(x)
this.a.b=new P.X(z,y)
return!1}}},
h3:{
"^":"c:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gad()
y=!0
r=this.c
if(r.ge_()){x=r.d
try{y=this.d.az(x,J.R(z))}catch(q){r=H.y(q)
w=r
v=H.v(q)
r=J.R(z)
p=w
o=(r==null?p==null:r===p)?z:new P.X(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aC()
p=H.ae(p,[p,p]).Z(r)
n=this.d
m=this.b
if(p)m.b=n.ee(u,J.R(z),z.gM())
else m.b=n.az(u,J.R(z))}catch(q){r=H.y(q)
t=r
s=H.v(q)
r=J.R(z)
p=t
o=(r==null?p==null:r===p)?z:new P.X(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
h5:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cc(this.d.gdj())
z.a=w
v=w}catch(u){z=H.y(u)
y=z
x=H.v(u)
if(this.c){z=J.R(this.a.a.gad())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gad()
else v.b=new P.X(y,x)
v.a=!1
return}if(!!J.l(v).$isS){t=this.d
s=t.ged(t)
s.sd5(!0)
this.b.c=!0
v.bc(new P.h6(this.a,s),new P.h7(z,s))}}},
h6:{
"^":"c:2;a,b",
$1:function(a){P.a1(this.a.a,new P.aj(null,this.b,0,null,null))}},
h7:{
"^":"c:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.C)){y=H.d(new P.C(0,$.k,null),[null])
z.a=y
y.dg(a,b)}P.a1(z.a,new P.aj(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
cY:{
"^":"b;a,b,c",
dr:function(){return this.a.$0()}},
a0:{
"^":"b;",
a9:function(a,b){return H.d(new P.hh(b,this),[H.G(this,"a0",0),null])},
D:function(a,b){var z,y
z={}
y=H.d(new P.C(0,$.k,null),[null])
z.a=null
z.a=this.a1(new P.f6(z,this,b,y),!0,new P.f7(y),y.gaM())
return y},
gk:function(a){var z,y
z={}
y=H.d(new P.C(0,$.k,null),[P.n])
z.a=0
this.a1(new P.f8(z),!0,new P.f9(z,y),y.gaM())
return y},
bd:function(a){var z,y
z=H.d([],[H.G(this,"a0",0)])
y=H.d(new P.C(0,$.k,null),[[P.j,H.G(this,"a0",0)]])
this.a1(new P.fa(this,z),!0,new P.fb(z,y),y.gaM())
return y}},
f6:{
"^":"c;a,b,c,d",
$1:function(a){P.hE(new P.f4(this.c,a),new P.f5(),P.hw(this.a.a,this.d))},
$signature:function(){return H.b0(function(a){return{func:1,args:[a]}},this.b,"a0")}},
f4:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
f5:{
"^":"c:2;",
$1:function(a){}},
f7:{
"^":"c:0;a",
$0:function(){this.a.a4(null)}},
f8:{
"^":"c:2;a",
$1:function(a){++this.a.a}},
f9:{
"^":"c:0;a,b",
$0:function(){this.b.a4(this.a.a)}},
fa:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b0(function(a){return{func:1,args:[a]}},this.a,"a0")}},
fb:{
"^":"c:0;a,b",
$0:function(){this.b.a4(this.a)}},
f3:{
"^":"b;"},
jp:{
"^":"b;"},
fJ:{
"^":"b;a6:d<,at:e?",
b7:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bR()
if((z&4)===0&&(this.e&32)===0)this.by(this.gbD())},
ak:function(a){return this.b7(a,null)},
cb:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gH(z)}else z=!1
if(z)this.r.aC(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.by(this.gbF())}}}},
b_:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aJ()
return this.f},
aJ:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bR()
if((this.e&32)===0)this.r=null
this.f=this.bC()},
aH:["cH",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bJ(a)
else this.aG(new P.fP(a,null))}],
aE:["cI",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bL(a,b)
else this.aG(new P.fR(a,b,null))}],
cT:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bK()
else this.aG(C.l)},
bE:[function(){},"$0","gbD",0,0,1],
bG:[function(){},"$0","gbF",0,0,1],
bC:function(){return},
aG:function(a){var z,y
z=this.r
if(z==null){z=new P.hr(null,null,0)
this.r=z}z.a7(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aC(this)}},
bJ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bb(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aK((z&4)!==0)},
bL:function(a,b){var z,y
z=this.e
y=new P.fL(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aJ()
z=this.f
if(!!J.l(z).$isS)z.bi(y)
else y.$0()}else{y.$0()
this.aK((z&4)!==0)}},
bK:function(){var z,y
z=new P.fK(this)
this.aJ()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isS)y.bi(z)
else z.$0()},
by:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aK((z&4)!==0)},
aK:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gH(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gH(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bE()
else this.bG()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aC(this)},
cP:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.d6(b,z)
this.c=c}},
fL:{
"^":"c:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aC()
x=H.ae(x,[x,x]).Z(y)
w=z.d
v=this.b
u=z.b
if(x)w.ef(u,v,this.c)
else w.bb(u,v)
z.e=(z.e&4294967263)>>>0}},
fK:{
"^":"c:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cd(z.c)
z.e=(z.e&4294967263)>>>0}},
d_:{
"^":"b;ay:a@"},
fP:{
"^":"d_;b,a",
b8:function(a){a.bJ(this.b)}},
fR:{
"^":"d_;ag:b>,M:c<,a",
b8:function(a){a.bL(this.b,this.c)}},
fQ:{
"^":"b;",
b8:function(a){a.bK()},
gay:function(){return},
say:function(a){throw H.f(new P.ai("No events after a done."))}},
hj:{
"^":"b;at:a?",
aC:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dr(new P.hk(this,a))
this.a=1},
bR:function(){if(this.a===1)this.a=3}},
hk:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.dW(this.b)}},
hr:{
"^":"hj;b,c,a",
gH:function(a){return this.c==null},
a7:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.say(b)
this.c=b}},
dW:function(a){var z,y
z=this.b
y=z.gay()
this.b=y
if(y==null)this.c=null
z.b8(a)}},
d4:{
"^":"b;a,b,c,at:d?",
bo:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
ew:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a4(!0)
return}this.a.ak(0)
this.c=a
this.d=3},"$1","gd7",2,0,function(){return H.b0(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"d4")}],
da:[function(a,b){var z
if(this.d===2){z=this.c
this.bo(0)
z.G(a,b)
return}this.a.ak(0)
this.c=new P.X(a,b)
this.d=4},function(a){return this.da(a,null)},"ey","$2","$1","gd9",2,2,14,0],
ex:[function(){if(this.d===2){var z=this.c
this.bo(0)
z.a4(!1)
return}this.a.ak(0)
this.c=null
this.d=5},"$0","gd8",0,0,1]},
hy:{
"^":"c:0;a,b,c",
$0:function(){return this.a.G(this.b,this.c)}},
hx:{
"^":"c:5;a,b",
$2:function(a,b){return P.hv(this.a,this.b,a,b)}},
bC:{
"^":"a0;",
a1:function(a,b,c,d){return this.cZ(a,d,c,!0===b)},
c_:function(a,b,c){return this.a1(a,null,b,c)},
cZ:function(a,b,c,d){return P.fW(this,a,b,c,d,H.G(this,"bC",0),H.G(this,"bC",1))},
bz:function(a,b){b.aH(a)},
$asa0:function(a,b){return[b]}},
d0:{
"^":"fJ;x,y,a,b,c,d,e,f,r",
aH:function(a){if((this.e&2)!==0)return
this.cH(a)},
aE:function(a,b){if((this.e&2)!==0)return
this.cI(a,b)},
bE:[function(){var z=this.y
if(z==null)return
z.ak(0)},"$0","gbD",0,0,1],
bG:[function(){var z=this.y
if(z==null)return
z.cb()},"$0","gbF",0,0,1],
bC:function(){var z=this.y
if(z!=null){this.y=null
z.b_()}return},
er:[function(a){this.x.bz(a,this)},"$1","gd0",2,0,function(){return H.b0(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"d0")}],
eu:[function(a,b){this.aE(a,b)},"$2","gd2",4,0,15],
es:[function(){this.cT()},"$0","gd1",0,0,1],
cQ:function(a,b,c,d,e,f,g){var z,y
z=this.gd0()
y=this.gd2()
this.y=this.x.a.c_(z,this.gd1(),y)},
static:{fW:function(a,b,c,d,e,f,g){var z=$.k
z=H.d(new P.d0(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cP(b,c,d,e)
z.cQ(a,b,c,d,e,f,g)
return z}}},
hh:{
"^":"bC;b,a",
bz:function(a,b){var z,y,x,w,v
z=null
try{z=this.dh(a)}catch(w){v=H.y(w)
y=v
x=H.v(w)
$.k.toString
b.aE(y,x)
return}b.aH(z)},
dh:function(a){return this.b.$1(a)}},
X:{
"^":"b;ag:a>,M:b<",
i:function(a){return H.a(this.a)},
$isw:1},
hu:{
"^":"b;"},
hD:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.f(new P.hs(z,P.ht(z,this.b)))}},
hm:{
"^":"hu;",
gb3:function(){return this},
cd:function(a){var z,y,x,w
try{if(C.b===$.k){x=a.$0()
return x}x=P.d7(null,null,this,a)
return x}catch(w){x=H.y(w)
z=x
y=H.v(w)
return P.aB(null,null,this,z,y)}},
bb:function(a,b){var z,y,x,w
try{if(C.b===$.k){x=a.$1(b)
return x}x=P.d9(null,null,this,a,b)
return x}catch(w){x=H.y(w)
z=x
y=H.v(w)
return P.aB(null,null,this,z,y)}},
ef:function(a,b,c){var z,y,x,w
try{if(C.b===$.k){x=a.$2(b,c)
return x}x=P.d8(null,null,this,a,b,c)
return x}catch(w){x=H.y(w)
z=x
y=H.v(w)
return P.aB(null,null,this,z,y)}},
aY:function(a,b){if(b)return new P.hn(this,a)
else return new P.ho(this,a)},
dm:function(a,b){if(b)return new P.hp(this,a)
else return new P.hq(this,a)},
h:function(a,b){return},
cc:function(a){if($.k===C.b)return a.$0()
return P.d7(null,null,this,a)},
az:function(a,b){if($.k===C.b)return a.$1(b)
return P.d9(null,null,this,a,b)},
ee:function(a,b,c){if($.k===C.b)return a.$2(b,c)
return P.d8(null,null,this,a,b,c)}},
hn:{
"^":"c:0;a,b",
$0:function(){return this.a.cd(this.b)}},
ho:{
"^":"c:0;a,b",
$0:function(){return this.a.cc(this.b)}},
hp:{
"^":"c:2;a,b",
$1:function(a){return this.a.bb(this.b,a)}},
hq:{
"^":"c:2;a,b",
$1:function(a){return this.a.az(this.b,a)}}}],["","",,P,{
"^":"",
aM:function(){return H.d(new H.ax(0,null,null,null,null,null,0),[null,null])},
a9:function(a){return H.di(a,H.d(new H.ax(0,null,null,null,null,null,0),[null,null]))},
eB:function(a,b,c){var z,y
if(P.bI(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$an()
y.push(a)
try{P.hB(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cB(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aH:function(a,b,c){var z,y,x
if(P.bI(a))return b+"..."+c
z=new P.bu(b)
y=$.$get$an()
y.push(a)
try{x=z
x.a=P.cB(x.ga5(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga5()+c
y=z.ga5()
return y.charCodeAt(0)==0?y:y},
bI:function(a){var z,y
for(z=0;y=$.$get$an(),z<y.length;++z)if(a===y[z])return!0
return!1},
hB:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gC(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.p())return
w=H.a(z.gt())
b.push(w)
y+=w.length+2;++x}if(!z.p()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gt();++x
if(!z.p()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gt();++x
for(;z.p();t=s,s=r){r=z.gt();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.h(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.a(t)
v=H.a(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.h(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aL:function(a,b,c,d,e){return H.d(new H.ax(0,null,null,null,null,null,0),[d,e])},
a8:function(a,b){return P.hc(a,b)},
ah:function(a,b,c,d){return H.d(new P.ha(0,null,null,null,null,null,0),[d])},
ck:function(a){var z,y,x
z={}
if(P.bI(a))return"{...}"
y=new P.bu("")
try{$.$get$an().push(a)
x=y
x.a=x.ga5()+"{"
z.a=!0
J.dL(a,new P.eQ(z,y))
z=y
z.a=z.ga5()+"}"}finally{z=$.$get$an()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga5()
return z.charCodeAt(0)==0?z:z},
hb:{
"^":"ax;a,b,c,d,e,f,r",
ai:function(a){return H.i5(a)&0x3ffffff},
aj:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbV()
if(x==null?b==null:x===b)return y}return-1},
static:{hc:function(a,b){return H.d(new P.hb(0,null,null,null,null,null,0),[a,b])}}},
ha:{
"^":"h8;a,b,c,d,e,f,r",
gC:function(a){var z=new P.ch(this,this.r,null,null)
z.c=this.e
return z},
gk:function(a){return this.a},
dD:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.cX(b)},
cX:function(a){var z=this.d
if(z==null)return!1
return this.ar(z[this.aq(a)],a)>=0},
c0:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dD(0,a)?a:null
else return this.d6(a)},
d6:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aq(a)]
x=this.ar(y,a)
if(x<0)return
return J.bT(y,x).gbv()},
D:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.f(new P.E(this))
z=z.b}},
a7:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bF()
this.b=z}return this.bp(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bF()
this.c=y}return this.bp(y,b)}else return this.R(b)},
R:function(a){var z,y,x
z=this.d
if(z==null){z=P.bF()
this.d=z}y=this.aq(a)
x=z[y]
if(x==null)z[y]=[this.aL(a)]
else{if(this.ar(x,a)>=0)return!1
x.push(this.aL(a))}return!0},
a2:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bq(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bq(this.c,b)
else return this.de(b)},
de:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aq(a)]
x=this.ar(y,a)
if(x<0)return!1
this.br(y.splice(x,1)[0])
return!0},
O:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bp:function(a,b){if(a[b]!=null)return!1
a[b]=this.aL(b)
return!0},
bq:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.br(z)
delete a[b]
return!0},
aL:function(a){var z,y
z=new P.eN(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
br:function(a){var z,y
z=a.gcW()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aq:function(a){return J.u(a)&0x3ffffff},
ar:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Q(a[y].gbv(),b))return y
return-1},
$iso:1,
static:{bF:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
eN:{
"^":"b;bv:a<,b,cW:c<"},
ch:{
"^":"b;a,b,c,d",
gt:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.E(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
h8:{
"^":"f0;"},
bl:{
"^":"b;",
gC:function(a){return new H.ci(a,this.gk(a),0,null)},
S:function(a,b){return this.h(a,b)},
D:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.f(new P.E(a))}},
a9:function(a,b){return H.d(new H.bo(a,b),[null,null])},
i:function(a){return P.aH(a,"[","]")},
$isj:1,
$asj:null,
$iso:1},
eQ:{
"^":"c:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.a(a)
z.a=y+": "
z.a+=H.a(b)}},
eO:{
"^":"I;a,b,c,d",
gC:function(a){return new P.hd(this,this.c,this.d,this.b,null)},
D:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.x(new P.E(this))}},
gH:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
O:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aH(this,"{","}")},
ca:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.bj());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
R:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bx();++this.d},
bx:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.d(z,[H.r(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.bl(y,0,w,z,x)
C.c.bl(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cK:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.d(z,[b])},
$iso:1,
static:{bm:function(a,b){var z=H.d(new P.eO(null,0,0,0),[b])
z.cK(a,b)
return z}}},
hd:{
"^":"b;a,b,c,d,e",
gt:function(){return this.e},
p:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.x(new P.E(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
f1:{
"^":"b;",
a9:function(a,b){return H.d(new H.c9(this,b),[H.r(this,0),null])},
i:function(a){return P.aH(this,"{","}")},
D:function(a,b){var z
for(z=this.gC(this);z.p();)b.$1(z.d)},
$iso:1},
f0:{
"^":"f1;"}}],["","",,P,{
"^":"",
hF:function(a){return H.fc(a)},
bf:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ar(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ei(a)},
ei:function(a){var z=J.l(a)
if(!!z.$isc)return z.i(a)
return H.aR(a)},
aG:function(a){return new P.fV(a)},
bn:function(a,b,c){var z,y
z=H.d([],[c])
for(y=J.ba(a);y.p();)z.push(y.gt())
if(b)return z
z.fixed$length=Array
return z},
b7:function(a){var z=H.a(a)
H.dp(z)},
j1:{
"^":"c:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.hF(a)}},
bJ:{
"^":"b;"},
"+bool":0,
c7:{
"^":"b;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.c7))return!1
return this.a===b.a&&this.b===b.b},
gq:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ed(z?H.A(this).getUTCFullYear()+0:H.A(this).getFullYear()+0)
x=P.as(z?H.A(this).getUTCMonth()+1:H.A(this).getMonth()+1)
w=P.as(z?H.A(this).getUTCDate()+0:H.A(this).getDate()+0)
v=P.as(z?H.A(this).getUTCHours()+0:H.A(this).getHours()+0)
u=P.as(z?H.A(this).getUTCMinutes()+0:H.A(this).getMinutes()+0)
t=P.as(z?H.A(this).getUTCSeconds()+0:H.A(this).getSeconds()+0)
s=P.ee(H.cs(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{ed:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.a(z)
if(z>=10)return y+"00"+H.a(z)
return y+"000"+H.a(z)},ee:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},as:function(a){if(a>=10)return""+a
return"0"+a}}},
b9:{
"^":"aE;"},
"+double":0,
ag:{
"^":"b;a",
l:function(a,b){return new P.ag(C.d.l(this.a,b.gbu()))},
m:function(a,b){return new P.ag(C.d.m(this.a,b.gbu()))},
aB:function(a,b){return C.d.aB(this.a,b.gbu())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.ag))return!1
return this.a===b.a},
gq:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eh()
y=this.a
if(y<0)return"-"+new P.ag(-y).i(0)
x=z.$1(C.d.b9(C.d.ae(y,6e7),60))
w=z.$1(C.d.b9(C.d.ae(y,1e6),60))
v=new P.eg().$1(C.d.b9(y,1e6))
return""+C.d.ae(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)}},
eg:{
"^":"c:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eh:{
"^":"c:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
w:{
"^":"b;",
gM:function(){return H.v(this.$thrownJsError)}},
cr:{
"^":"w;",
i:function(a){return"Throw of null."}},
a6:{
"^":"w;a,b,c,d",
gaO:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaN:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.gaO()+y+x
if(!this.a)return w
v=this.gaN()
u=P.bf(this.b)
return w+v+": "+H.a(u)},
static:{bc:function(a){return new P.a6(!1,null,null,a)},e2:function(a,b,c){return new P.a6(!0,a,b,c)}}},
cw:{
"^":"a6;e,f,a,b,c,d",
gaO:function(){return"RangeError"},
gaN:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.el()
if(typeof z!=="number")return H.M(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{aT:function(a,b,c){return new P.cw(null,null,!0,a,b,"Value not in range")},aS:function(a,b,c,d,e){return new P.cw(b,c,!0,a,d,"Invalid value")},cx:function(a,b,c,d,e,f){if(0>a||a>c)throw H.f(P.aS(a,0,c,"start",f))
if(a>b||b>c)throw H.f(P.aS(b,a,c,"end",f))
return b}}},
ep:{
"^":"a6;e,k:f>,a,b,c,d",
gaO:function(){return"RangeError"},
gaN:function(){P.bf(this.e)
var z=": index should be less than "+H.a(this.f)
return J.dv(this.b,0)?": index must not be negative":z},
static:{bi:function(a,b,c,d,e){var z=e!=null?e:J.aq(b)
return new P.ep(b,z,!0,a,c,"Index out of range")}}},
J:{
"^":"w;a",
i:function(a){return"Unsupported operation: "+this.a}},
cX:{
"^":"w;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
ai:{
"^":"w;a",
i:function(a){return"Bad state: "+this.a}},
E:{
"^":"w;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.bf(z))+"."}},
cA:{
"^":"b;",
i:function(a){return"Stack Overflow"},
gM:function(){return},
$isw:1},
ec:{
"^":"w;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
fV:{
"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
ej:{
"^":"b;a",
i:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z=H.aQ(b,"expando$values")
return z==null?null:H.aQ(z,this.bw())},
u:function(a,b,c){var z=H.aQ(b,"expando$values")
if(z==null){z=new P.b()
H.bt(b,"expando$values",z)}H.bt(z,this.bw(),c)},
bw:function(){var z,y
z=H.aQ(this,"expando$key")
if(z==null){y=$.ca
$.ca=y+1
z="expando$key$"+y
H.bt(this,"expando$key",z)}return z}},
n:{
"^":"aE;"},
"+int":0,
I:{
"^":"b;",
a9:function(a,b){return H.aO(this,b,H.G(this,"I",0),null)},
D:function(a,b){var z
for(z=this.gC(this);z.p();)b.$1(z.gt())},
be:function(a,b){return P.bn(this,b,H.G(this,"I",0))},
bd:function(a){return this.be(a,!0)},
gk:function(a){var z,y
z=this.gC(this)
for(y=0;z.p();)++y
return y},
S:function(a,b){var z,y,x
if(b<0)H.x(P.aS(b,0,null,"index",null))
for(z=this.gC(this),y=0;z.p();){x=z.gt()
if(b===y)return x;++y}throw H.f(P.bi(b,this,"index",null,y))},
i:function(a){return P.eB(this,"(",")")}},
eD:{
"^":"b;"},
j:{
"^":"b;",
$asj:null,
$iso:1},
"+List":0,
j2:{
"^":"b;",
i:function(a){return"null"}},
"+Null":0,
aE:{
"^":"b;"},
"+num":0,
b:{
"^":";",
n:function(a,b){return this===b},
gq:function(a){return H.Z(this)},
i:function(a){return H.aR(this)}},
a_:{
"^":"b;"},
U:{
"^":"b;"},
"+String":0,
bu:{
"^":"b;a5:a<",
gk:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cB:function(a,b,c){var z=J.ba(b)
if(!z.p())return a
if(c.length===0){do a+=H.a(z.gt())
while(z.p())}else{a+=H.a(z.gt())
for(;z.p();)a=a+c+H.a(z.gt())}return a}}},
cC:{
"^":"b;"}}],["","",,W,{
"^":"",
a2:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d1:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
d5:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.fO(a)
if(!!J.l(z).$isK)return z
return}else return a},
D:function(a){var z=$.k
if(z===C.b)return a
return z.dm(a,!0)},
z:{
"^":"at;",
$isz:1,
$isb:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
ic:{
"^":"z;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
ie:{
"^":"z;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
ig:{
"^":"z;",
$isK:1,
$ise:1,
"%":"HTMLBodyElement"},
ih:{
"^":"z;v:height},A:width}",
bj:function(a,b,c){return a.getContext(b,P.hN(c))},
cn:function(a,b,c,d,e,f,g){var z,y
z=P.a9(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bj(a,"webgl",z)
return y==null?this.bj(a,"experimental-webgl",z):y},
cm:function(a,b){return this.cn(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
ii:{
"^":"e;",
bZ:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
ik:{
"^":"aP;k:length=",
$ise:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
il:{
"^":"eq;k:length=",
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eq:{
"^":"e+eb;"},
eb:{
"^":"b;"},
im:{
"^":"aP;",
$ise:1,
"%":"DocumentFragment|ShadowRoot"},
io:{
"^":"e;",
i:function(a){return String(a)},
"%":"DOMException"},
ef:{
"^":"e;aZ:bottom=,v:height=,I:left=,ba:right=,ab:top=,A:width=",
i:function(a){return"Rectangle ("+H.a(a.left)+", "+H.a(a.top)+") "+H.a(this.gA(a))+" x "+H.a(this.gv(a))},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=this.gA(a)
x=z.gA(b)
if(y==null?x==null:y===x){y=this.gv(a)
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gq:function(a){var z,y,x,w
z=J.u(a.left)
y=J.u(a.top)
x=J.u(this.gA(a))
w=J.u(this.gv(a))
return W.d1(W.a2(W.a2(W.a2(W.a2(0,z),y),x),w))},
gbf:function(a){return H.d(new P.F(a.left,a.top),[null])},
$isT:1,
$asT:I.b2,
"%":";DOMRectReadOnly"},
at:{
"^":"aP;",
gP:function(a){return P.eW(C.a.w(a.offsetLeft),C.a.w(a.offsetTop),C.a.w(a.offsetWidth),C.a.w(a.offsetHeight),null)},
i:function(a){return a.localName},
cl:function(a){return a.getBoundingClientRect()},
gc1:function(a){return H.d(new W.q(a,"mousedown",!1),[null])},
gc2:function(a){return H.d(new W.q(a,"mouseenter",!1),[null])},
gc3:function(a){return H.d(new W.q(a,"mouseleave",!1),[null])},
gc4:function(a){return H.d(new W.q(a,"mousemove",!1),[null])},
gc5:function(a){return H.d(new W.q(a,"mouseout",!1),[null])},
gc6:function(a){return H.d(new W.q(a,"mouseover",!1),[null])},
gc7:function(a){return H.d(new W.q(a,"mouseup",!1),[null])},
$isat:1,
$ise:1,
$isK:1,
"%":";Element"},
ip:{
"^":"z;v:height},A:width}",
"%":"HTMLEmbedElement"},
iq:{
"^":"bg;ag:error=",
"%":"ErrorEvent"},
bg:{
"^":"e;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
K:{
"^":"e;",
cS:function(a,b,c,d){return a.addEventListener(b,H.ao(c,1),d)},
df:function(a,b,c,d){return a.removeEventListener(b,H.ao(c,1),d)},
$isK:1,
"%":"MediaStream;EventTarget"},
iI:{
"^":"z;k:length=",
"%":"HTMLFormElement"},
iK:{
"^":"z;v:height},A:width}",
"%":"HTMLIFrameElement"},
iL:{
"^":"z;v:height},A:width}",
bT:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
iN:{
"^":"z;v:height},A:width}",
$isat:1,
$ise:1,
$isK:1,
"%":"HTMLInputElement"},
eR:{
"^":"z;ag:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
bp:{
"^":"cW;",
gP:function(a){var z,y
if(!!a.offsetX)return H.d(new P.F(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.d5(a.target)).$isat)throw H.f(new P.J("offsetX is only supported on elements"))
z=W.d5(a.target)
y=H.d(new P.F(a.clientX,a.clientY),[null]).m(0,J.dT(J.dW(z)))
return H.d(new P.F(J.c1(y.a),J.c1(y.b)),[null])}},
$isbp:1,
$isb:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
j0:{
"^":"e;",
$ise:1,
"%":"Navigator"},
aP:{
"^":"K;",
i:function(a){var z=a.nodeValue
return z==null?this.cF(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
j3:{
"^":"z;v:height},A:width}",
"%":"HTMLObjectElement"},
j7:{
"^":"z;k:length=",
"%":"HTMLSelectElement"},
j8:{
"^":"bg;ag:error=",
"%":"SpeechRecognitionError"},
bx:{
"^":"e;",
$isb:1,
"%":"Touch"},
by:{
"^":"cW;ds:changedTouches=",
$isby:1,
$isb:1,
"%":"TouchEvent"},
jd:{
"^":"es;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.bi(b,a,null,null,null))
return a[b]},
u:function(a,b,c){throw H.f(new P.J("Cannot assign element of immutable List."))},
S:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bx]},
$iso:1,
$isaK:1,
$isaI:1,
"%":"TouchList"},
er:{
"^":"e+bl;",
$isj:1,
$asj:function(){return[W.bx]},
$iso:1},
es:{
"^":"er+eo;",
$isj:1,
$asj:function(){return[W.bx]},
$iso:1},
cW:{
"^":"bg;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
jf:{
"^":"eR;v:height},A:width}",
"%":"HTMLVideoElement"},
ji:{
"^":"K;",
$ise:1,
$isK:1,
"%":"DOMWindow|Window"},
jm:{
"^":"e;aZ:bottom=,v:height=,I:left=,ba:right=,ab:top=,A:width=",
i:function(a){return"Rectangle ("+H.a(a.left)+", "+H.a(a.top)+") "+H.a(a.width)+" x "+H.a(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=a.width
x=z.gA(b)
if(y==null?x==null:y===x){y=a.height
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gq:function(a){var z,y,x,w
z=J.u(a.left)
y=J.u(a.top)
x=J.u(a.width)
w=J.u(a.height)
return W.d1(W.a2(W.a2(W.a2(W.a2(0,z),y),x),w))},
gbf:function(a){return H.d(new P.F(a.left,a.top),[null])},
$isT:1,
$asT:I.b2,
"%":"ClientRect"},
jn:{
"^":"aP;",
$ise:1,
"%":"DocumentType"},
jo:{
"^":"ef;",
gv:function(a){return a.height},
gA:function(a){return a.width},
"%":"DOMRect"},
jr:{
"^":"z;",
$isK:1,
$ise:1,
"%":"HTMLFrameSetElement"},
fU:{
"^":"a0;",
a1:function(a,b,c,d){var z=new W.B(0,this.a,this.b,W.D(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.B()
return z},
c_:function(a,b,c){return this.a1(a,null,b,c)}},
q:{
"^":"fU;a,b,c"},
B:{
"^":"f3;a,b,c,d,e",
b_:function(){if(this.b==null)return
this.bP()
this.b=null
this.d=null
return},
b7:function(a,b){if(this.b==null)return;++this.a
this.bP()},
ak:function(a){return this.b7(a,null)},
cb:function(){if(this.b==null||this.a<=0)return;--this.a
this.B()},
B:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dw(x,this.c,z,this.e)}},
bP:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dx(x,this.c,z,this.e)}}},
eo:{
"^":"b;",
gC:function(a){return new W.ek(a,this.gk(a),-1,null)},
$isj:1,
$asj:null,
$iso:1},
ek:{
"^":"b;a,b,c,d",
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bT(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gt:function(){return this.d}},
fN:{
"^":"b;a",
$isK:1,
$ise:1,
static:{fO:function(a){if(a===window)return a
else return new W.fN(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ia:{
"^":"au;",
$ise:1,
"%":"SVGAElement"},
ib:{
"^":"fd;",
$ise:1,
"%":"SVGAltGlyphElement"},
id:{
"^":"m;",
$ise:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
ir:{
"^":"m;",
$ise:1,
"%":"SVGFEBlendElement"},
is:{
"^":"m;",
$ise:1,
"%":"SVGFEColorMatrixElement"},
it:{
"^":"m;",
$ise:1,
"%":"SVGFEComponentTransferElement"},
iu:{
"^":"m;",
$ise:1,
"%":"SVGFECompositeElement"},
iv:{
"^":"m;",
$ise:1,
"%":"SVGFEConvolveMatrixElement"},
iw:{
"^":"m;",
$ise:1,
"%":"SVGFEDiffuseLightingElement"},
ix:{
"^":"m;",
$ise:1,
"%":"SVGFEDisplacementMapElement"},
iy:{
"^":"m;",
$ise:1,
"%":"SVGFEFloodElement"},
iz:{
"^":"m;",
$ise:1,
"%":"SVGFEGaussianBlurElement"},
iA:{
"^":"m;",
$ise:1,
"%":"SVGFEImageElement"},
iB:{
"^":"m;",
$ise:1,
"%":"SVGFEMergeElement"},
iC:{
"^":"m;",
$ise:1,
"%":"SVGFEMorphologyElement"},
iD:{
"^":"m;",
$ise:1,
"%":"SVGFEOffsetElement"},
iE:{
"^":"m;",
$ise:1,
"%":"SVGFESpecularLightingElement"},
iF:{
"^":"m;",
$ise:1,
"%":"SVGFETileElement"},
iG:{
"^":"m;",
$ise:1,
"%":"SVGFETurbulenceElement"},
iH:{
"^":"m;",
$ise:1,
"%":"SVGFilterElement"},
au:{
"^":"m;",
$ise:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
iM:{
"^":"au;",
$ise:1,
"%":"SVGImageElement"},
iQ:{
"^":"m;",
$ise:1,
"%":"SVGMarkerElement"},
iR:{
"^":"m;",
$ise:1,
"%":"SVGMaskElement"},
j4:{
"^":"m;",
$ise:1,
"%":"SVGPatternElement"},
j6:{
"^":"m;",
$ise:1,
"%":"SVGScriptElement"},
m:{
"^":"at;",
gc1:function(a){return H.d(new W.q(a,"mousedown",!1),[null])},
gc2:function(a){return H.d(new W.q(a,"mouseenter",!1),[null])},
gc3:function(a){return H.d(new W.q(a,"mouseleave",!1),[null])},
gc4:function(a){return H.d(new W.q(a,"mousemove",!1),[null])},
gc5:function(a){return H.d(new W.q(a,"mouseout",!1),[null])},
gc6:function(a){return H.d(new W.q(a,"mouseover",!1),[null])},
gc7:function(a){return H.d(new W.q(a,"mouseup",!1),[null])},
$isK:1,
$ise:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
ja:{
"^":"au;",
$ise:1,
"%":"SVGSVGElement"},
jb:{
"^":"m;",
$ise:1,
"%":"SVGSymbolElement"},
cE:{
"^":"au;",
"%":";SVGTextContentElement"},
jc:{
"^":"cE;",
$ise:1,
"%":"SVGTextPathElement"},
fd:{
"^":"cE;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
je:{
"^":"au;",
$ise:1,
"%":"SVGUseElement"},
jg:{
"^":"m;",
$ise:1,
"%":"SVGViewElement"},
jq:{
"^":"m;",
$ise:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
js:{
"^":"m;",
$ise:1,
"%":"SVGCursorElement"},
jt:{
"^":"m;",
$ise:1,
"%":"SVGFEDropShadowElement"},
ju:{
"^":"m;",
$ise:1,
"%":"SVGGlyphRefElement"},
jv:{
"^":"m;",
$ise:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
j5:{
"^":"e;",
dl:function(a,b,c){return a.bindBuffer(b,c)},
dn:function(a,b){return a.blendEquation(b)},
dq:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
du:function(a,b){return a.clear(b)},
dv:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dw:function(a,b){return a.clearDepth(b)},
dz:function(a,b){return a.clearStencil(b)},
dB:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dF:function(a){return a.createBuffer()},
dG:function(a){return a.createProgram()},
dH:function(a,b){return a.createShader(b)},
dI:function(a,b){return a.depthFunc(b)},
dJ:function(a,b){return a.depthMask(b)},
dQ:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
dR:function(a,b){return a.enable(b)},
dS:function(a,b){return a.enableVertexAttribArray(b)},
ck:function(a,b,c){return a.getAttribLocation(b,c)},
cp:function(a,b,c){return a.getUniformLocation(b,c)},
bZ:function(a,b){return a.lineWidth(b)},
cB:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cC:function(a,b,c,d){return a.stencilOp(b,c,d)},
ei:function(a,b){return a.useProgram(b)},
ej:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ij:{
"^":"b;"}}],["","",,P,{
"^":"",
ak:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d2:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
F:{
"^":"b;E:a>,L:b>",
i:function(a){return"Point("+H.a(this.a)+", "+H.a(this.b)+")"},
n:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.F))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gq:function(a){var z,y
z=J.u(this.a)
y=J.u(this.b)
return P.d2(P.ak(P.ak(0,z),y))},
l:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gE(b)
if(typeof z!=="number")return z.l()
x=C.a.l(z,x)
z=this.b
y=y.gL(b)
if(typeof z!=="number")return z.l()
y=new P.F(x,C.a.l(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
m:function(a,b){var z,y,x,w
z=this.a
y=J.dU(b)
if(typeof z!=="number")return z.m()
if(typeof y!=="number")return H.M(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.m()
if(typeof w!=="number")return H.M(w)
w=new P.F(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hl:{
"^":"b;",
gba:function(a){return this.gI(this)+this.c},
gaZ:function(a){return this.gab(this)+this.d},
i:function(a){return"Rectangle ("+this.gI(this)+", "+this.b+") "+this.c+" x "+this.d},
n:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
if(this.gI(this)===z.gI(b)){y=this.b
z=y===z.gab(b)&&this.a+this.c===z.gba(b)&&y+this.d===z.gaZ(b)}else z=!1
return z},
gq:function(a){var z=this.b
return P.d2(P.ak(P.ak(P.ak(P.ak(0,this.gI(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbf:function(a){var z=new P.F(this.gI(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
T:{
"^":"hl;I:a>,ab:b>,A:c>,v:d>",
$asT:null,
static:{eW:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.d(new P.T(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
p:function(a){return a},
b_:function(a){return a},
cl:{
"^":"e;",
$iscl:1,
"%":"ArrayBuffer"},
bs:{
"^":"e;",
$isbs:1,
"%":"DataView;ArrayBufferView;bq|cm|co|br|cn|cp|Y"},
bq:{
"^":"bs;",
gk:function(a){return a.length},
$isaK:1,
$isaI:1},
br:{
"^":"co;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
return a[b]},
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
a[b]=c}},
cm:{
"^":"bq+bl;",
$isj:1,
$asj:function(){return[P.b9]},
$iso:1},
co:{
"^":"cm+cb;"},
Y:{
"^":"cp;",
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.n]},
$iso:1},
cn:{
"^":"bq+bl;",
$isj:1,
$asj:function(){return[P.n]},
$iso:1},
cp:{
"^":"cn+cb;"},
iS:{
"^":"br;",
$isj:1,
$asj:function(){return[P.b9]},
$iso:1,
"%":"Float32Array"},
iT:{
"^":"br;",
$isj:1,
$asj:function(){return[P.b9]},
$iso:1,
"%":"Float64Array"},
iU:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Int16Array"},
iV:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Int32Array"},
iW:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Int8Array"},
iX:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Uint16Array"},
iY:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Uint32Array"},
iZ:{
"^":"Y;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
j_:{
"^":"Y;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.t(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dp:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
hN:function(a){var z={}
a.D(0,new P.hO(z))
return z},
hO:{
"^":"c:18;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
jz:[function(){var z,y,x,w,v,u
z=new G.fk(700,500,P.aM())
y=new E.O(new Float64Array(H.p(16)))
y.X()
x=new F.fl(400,300,1,1,1,0,0,null,"none",null,y,!1)
x.b=[]
x.ch=F.aV(255,238,238,255)
y=new E.O(new Float64Array(H.p(16)))
y.X()
w=new G.fr(null,!1,0,z,!1,!1,0,null,!1,!1,[y])
w.a=G.fq(400,600)
w.sK(x)
w.e9()
w.eh()
if(!w.b){w.b=!0
w.ap()}y=P.aM()
v=new E.O(new Float64Array(H.p(16)))
v.X()
u=new O.eU(z,y,"none",null,v,!1)
u.b=[]
x.au(u)},"$0","dm",0,0,1]},1],["","",,F,{
"^":"",
cg:function(a){var z,y,x,w,v
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.ap)(a),++x){v=a[x]
if(typeof v!=="number")return H.M(v)
y+=v
y+=y<<10>>>0
y=(y^C.a.aW(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fi:{
"^":"b;"},
cH:{
"^":"b;",
au:function(a){var z=0,y=new P.c6(),x=1,w,v=this,u,t,s,r
function $async$au(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.d(new s.C(0,r.k,null),[null])
t=u
t.aI(null)
z=2
return H.a4(u,$async$au,y)
case 2:t=v
t=t.b
t.push(a)
return H.a4(null,0,y,null)
case 1:return H.a4(w,1,y)}}return H.a4(null,$async$au,y,null)},
bW:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.ap)(z),++x)z[x].bW(a)},
c8:function(a,b){},
cf:function(a,b){var z,y,x
this.b1()
this.c8(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.ap)(z),++x)z[x].cf(a,b)},
b5:function(a,b){},
b6:["cG",function(a,b){var z,y,x,w,v,u
this.b1()
this.b5(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.ap)(z),++w){v=z[w]
u=v.c
x.push(C.c.ga8(x).V(0,u))
b.aA()
v.b6(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aA()}}],
eg:["Y",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b1()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.U(v.c)
u=v.eg(a,b,c,d,e)
a.T()
if(u)return!0}t=a.co().b0(0)
t.e5()
y=new E.V(new Float64Array(H.p(3)))
y.ao(d,e,0)
s=t.V(0,y)
return this.c9(a,b,c,s.gE(s),s.gL(s),d,e)}],
c9:function(a,b,c,d,e,f,g){return!1},
b1:function(){if(!this.d)this.d=!0}},
fj:{
"^":"b;"},
ay:{
"^":"b;a,b,c,d",
n:function(a,b){if(b==null)return!1
return b instanceof F.ay&&J.Q(b.a,this.a)&&J.Q(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gq:function(a){return F.cg([J.u(this.a),J.u(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+H.a(this.a)+", y:"+H.a(this.b)+", w:"+this.c+", h:"+this.d}},
cI:{
"^":"b;a",
i:function(a){return C.t.h(0,this.a)}},
fm:{
"^":"b;a,b,c",
cN:function(a){if(this.a==null)this.a=F.aV(255,255,255,255)},
static:{bw:function(a){var z=new F.fm(a,C.j,1)
z.cN(a)
return z}}},
cG:{
"^":"b;a",
n:function(a,b){if(b==null)return!1
return b instanceof F.cG&&b.a===this.a},
gq:function(a){return F.cg([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
cM:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{aV:function(a,b,c,d){var z=new F.cG(0)
z.cM(a,b,c,d)
return z}}},
fl:{
"^":"cH;e,f,r,x,y,z,Q,ch,a,b,c,d",
c8:function(a,b){var z,y,x,w
z=this.e
y=(a.gbh()-0)/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.O(new Float64Array(H.p(16)))
y.X()
this.c=y
y.cg(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bk(0,z,z,1)},
b6:function(a,b){var z,y,x
z=new F.ay(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.c.ga8(x).V(0,y))
b.aA()
y=b.b
y.push(z)
b.av(a,z)
this.cG(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.av(a,C.c.ga8(y))
else{y=a.a
b.av(a,new F.ay(0,0,y.c,y.d))}if(0>=x.length)return H.h(x,0)
x.pop()
b.aA()},
b5:function(a,b){var z,y
z=new F.ay(0,0,this.e,this.f)
y=F.bw(null)
y.a=this.ch
b.av(a,z)
b.b2(a,z,y)}},
fn:{
"^":"b;",
gK:function(){return this.c$},
sK:function(a){this.c$=a},
bY:function(a){if(!this.e$){this.c$.bW(this)
this.e$=!0}this.c$.cf(this,a)
this.e8()},
U:function(a){var z=this.f$
z.push(C.c.ga8(z).V(0,a))},
T:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
co:function(){return C.c.ga8(this.f$)}}}],["","",,G,{
"^":"",
cJ:function(a,b,c){var z,y,x
z=G.cK(a,35633,b)
y=G.cK(a,35632,c)
x=J.dF(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
cK:function(a,b,c){var z,y
z=J.dG(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.a(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.f(y+"\n")}return z},
fp:{
"^":"b;a,b,c,d",
cO:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a3(b)
y=C.d.a3(a)
x=document.createElement("canvas",null)
J.e0(x,z)
J.e_(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.dX(this.b,!0)},
static:{fq:function(a,b){var z=new G.fp(null,null,null,null)
z.cO(a,b)
return z}}},
fo:{
"^":"fi;c,d,e,f,r,x,a,b",
e0:function(){var z,y
z=C.c.ax(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.c.ax(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cJ(this.c,z,y)
z=C.c.ax(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.c.ax(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cJ(this.c,z,y)},
O:function(a){this.r=1
J.bY(this.c,2960)
J.dH(this.c,515)
J.dB(this.c,0,0,0,1)
J.dC(this.c,1)
J.dD(this.c,0)
J.bY(this.c,3042)
switch(-1){case-1:J.dy(this.c,32774)
J.dz(this.c,770,771,770,32772)
break}J.dA(this.c,17664)},
b2:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=b.a
y=b.b
x=J.a5(z,b.c)
w=J.a5(y,b.d)
v=[z,y,0,z,w,0,x,y,0,x,w,0]
u=c.a
t=c.b
s=c.c
J.c2(this.c,this.e)
r=this.c
q=J.bW(r)
r.bindBuffer(34962,q)
r.bufferData(34962,new Float32Array(H.b_(v)),35044)
r.bindBuffer(34962,null)
J.bU(this.c,34962,q)
r=this.c
q=J.bW(r)
r.bindBuffer(34963,q)
r.bufferData(34963,new Uint16Array(H.b_([0,1,3,2])),35044)
r.bindBuffer(34963,null)
J.bU(this.c,34963,q)
r=this.c
p=this.e
this.x.X()
o=this.x.cg(0,-1,1,0)
this.x=o
n=this.d
n=o.bk(0,2/n.c,-2/n.d,1)
this.x=n
n=n.V(0,C.c.ga8(this.a))
this.x=n
r.uniformMatrix4fv(J.bb(r,p,"u_mat"),!1,new Float32Array(H.b_(n.gj())))
n=this.c
p=this.e
u=u.a
n.uniform4fv(J.bb(n,p,"color"),new Float32Array(H.b_([(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255])))
u=this.c
u.uniform1f(J.bb(u,this.e,"u_point_size"),s)
m=J.dV(this.c,this.e,"vp")
J.e1(this.c,m,3,5126,!1,0,0)
J.dK(this.c,m)
if(t===C.j)l=6
else{J.dY(this.c,s)
l=2}J.dI(this.c,l,v.length/3|0,5123,0)
J.c2(this.c,null)},
av:function(a,b){var z
J.bV(this.c,!1,!1,!1,!1)
J.bX(this.c,!1)
J.c0(this.c,7680,7681,7681)
J.c_(this.c,519,this.r,255)
z=F.bw(null)
z.a=F.aV(255,255,255,255)
this.b2(null,b,z)
J.bV(this.c,!0,!0,!0,!0)
J.bX(this.c,!0)
J.c0(this.c,7680,7680,7680)
J.c_(this.c,515,this.r,255);++this.r},
aA:function(){}},
fk:{
"^":"fj;b,c,a"},
fr:{
"^":"eS;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gbh:function(){return this.a.c},
e8:function(){this.e=!0},
ap:function(){var z=0,y=new P.c6(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i
function $async$ap(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:k=H
k=k
j=P
u=k.cs(new j.c7(Date.now(),!1))
k=v
t=k.a
k=E
k=k
j=Float64Array
i=H
s=new k.O(new j(i.p(16)))
k=s
k.X()
k=E
k=k
j=Float64Array
i=H
r=new k.O(new j(i.p(16)))
k=r
k.X()
k=G
q=new k.fo(null,null,null,null,1,s,[r],[])
k=q
j=t
k.c=j.a
k=q
k.d=t
k=q
k.e0()
k=q
k.O(0)
p=0,o=0
case 2:k=v
if(!k.b){z=4
break}k=P
k=k
j=P
z=5
return H.a4(k.el(new j.ag(3e4),null,null),$async$ap,y)
case 5:n=Date.now()
m=n-u
t=u+m
k=v
k=k
j=C
j=j.d
k.bY(j.a3(t))
k=v
k=k
j=C
j=j.d
k.bY(j.a3(t))
p+=m
if(m<0);else ;++o
k=v
k.e=!0
z=p>40?6:7
break
case 6:k=q
k.O(0)
k=v
k=k.gK()
k.b6(v,q)
k=v
k.e=!1
case 7:z=o>300?8:9
break
case 8:k=C
k=k.d
l="###fps  "+k.cJ(p,o)
k=H
k.dp(l)
p=0
o=0
case 9:case 3:u=n
z=2
break
case 4:return H.a4(null,0,y,null)
case 1:return H.a4(w,1,y)}}return H.a4(null,$async$ap,y,null)},
eh:function(){var z,y,x,w
z=P.aM()
y=new G.fA(this,z)
x=new G.fz(this,z)
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchcancel",!1),[null])
H.d(new W.B(0,w.a,w.b,W.D(x),w.c),[H.r(w,0)]).B()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchend",!1),[null])
H.d(new W.B(0,w.a,w.b,W.D(x),w.c),[H.r(w,0)]).B()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchenter",!1),[null])
H.d(new W.B(0,w.a,w.b,W.D(y),w.c),[H.r(w,0)]).B()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchleave",!1),[null])
H.d(new W.B(0,w.a,w.b,W.D(y),w.c),[H.r(w,0)]).B()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchmove",!1),[null])
H.d(new W.B(0,w.a,w.b,W.D(y),w.c),[H.r(w,0)]).B()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchstart",!1),[null])
H.d(new W.B(0,w.a,w.b,W.D(y),w.c),[H.r(w,0)]).B()},
e9:function(){var z,y
z={}
z.a=!1
y=J.dM(this.a.b)
H.d(new W.B(0,y.a,y.b,W.D(new G.fs(z,this)),y.c),[H.r(y,0)]).B()
y=J.dS(this.a.b)
H.d(new W.B(0,y.a,y.b,W.D(new G.ft(z,this)),y.c),[H.r(y,0)]).B()
y=J.dN(this.a.b)
H.d(new W.B(0,y.a,y.b,W.D(new G.fu(z)),y.c),[H.r(y,0)]).B()
y=J.dO(this.a.b)
H.d(new W.B(0,y.a,y.b,W.D(new G.fv(z,this)),y.c),[H.r(y,0)]).B()
y=J.dP(this.a.b)
H.d(new W.B(0,y.a,y.b,W.D(new G.fw(z,this)),y.c),[H.r(y,0)]).B()
y=J.dQ(this.a.b)
H.d(new W.B(0,y.a,y.b,W.D(new G.fx(z)),y.c),[H.r(y,0)]).B()
y=J.dR(this.a.b)
H.d(new W.B(0,y.a,y.b,W.D(new G.fy(z)),y.c),[H.r(y,0)]).B()}},
eS:{
"^":"b+fn;"},
fA:{
"^":"c:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
for(z=J.bZ(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.ap)(z),++v){u=z[v]
t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.F(t,s).$builtinTypeInfo=[null]
r=t-C.a.w(w.a.b.offsetLeft)
t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.F(t,s).$builtinTypeInfo=[null]
q=s-C.a.w(w.a.b.offsetTop)
if(x.aw(u.identifier)){t=w.gK()
s=u.identifier
if(typeof s!=="number")return s.l()
w.U(t.c)
t.Y(w,s+1,"pointermove",r,q)
w.T()}else{x.u(0,u.identifier,u)
t=w.gK()
s=u.identifier
if(typeof s!=="number")return s.l()
w.U(t.c)
t.Y(w,s+1,"pointerdown",r,q)
w.T()}}}},
fz:{
"^":"c:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=J.bZ(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.ap)(z),++v){u=z[v]
if(x.aw(u.identifier)){t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.F(t,s).$builtinTypeInfo=[null]
s=C.a.w(w.a.b.offsetLeft)
r=C.a.w(u.pageX)
q=C.a.w(u.pageY)
new P.F(r,q).$builtinTypeInfo=[null]
r=C.a.w(w.a.b.offsetTop)
x.a2(0,u.identifier)
p=w.gK()
o=u.identifier
if(typeof o!=="number")return o.l()
w.U(p.c)
p.Y(w,o+1,"pointerup",t-s,q-r)
w.T()}}}},
fs:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gK()
x=J.i(a)
w=x.gP(a)
w=w.gE(w)
w.toString
x=x.gP(a)
x=x.gL(x)
x.toString
z.U(y.c)
y.Y(z,0,"pointerdown",w,x)
z.T()}},
ft:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gK()
w=J.i(a)
v=w.gP(a)
v=v.gE(v)
v.toString
w=w.gP(a)
w=w.gL(w)
w.toString
y.U(x.c)
x.Y(y,0,"pointerup",v,w)
y.T()
z.a=!1}}},
fu:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fv:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gK()
w=J.i(a)
v=w.gP(a)
v=v.gE(v)
v.toString
w=w.gP(a)
w=w.gL(w)
w.toString
y.U(x.c)
x.Y(y,0,"pointercancel",v,w)
y.T()
z.a=!1}}},
fw:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gK()
x=J.i(a)
w=x.gP(a)
w=w.gE(w)
w.toString
x=x.gP(a)
x=x.gL(x)
x.toString
z.U(y.c)
y.Y(z,0,"pointermove",w,x)
z.T()}}},
fx:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fy:{
"^":"c:3;a",
$1:function(a){P.b7("over offset="+H.a(a.geB())+":"+H.a(a.geC())+"  client="+H.a(a.gez())+":"+H.a(a.geA())+" screen="+H.a(a.gem(a))+":"+H.a(a.gen(a)))
if(this.a.a);}}}],["","",,O,{
"^":"",
eU:{
"^":"cH;e,f,a,b,c,d",
c9:function(a,b,c,d,e,f,g){var z=this.f
z.u(0,b,[d,e])
if(c==="pointerup"||c==="pointercancel")z.a2(0,b)
return!1},
b5:function(a,b){var z,y,x,w
z=F.bw(null)
for(y=this.f,y=y.gbg(y),y=y.gC(y);y.p();){x=y.gt()
z.a=F.aV(255,0,255,255)
z.b=C.v
z.c=2.5
w=J.L(x)
b.b2(null,new F.ay(J.bS(w.h(x,0),25),J.bS(w.h(x,1),25),50,50),z)}}}}],["","",,E,{
"^":"",
O:{
"^":"b;j:a<",
ac:function(a){var z,y
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
gdP:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
an:function(a){var z,y,x
z=new Float64Array(H.p(4))
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
return new E.W(z)},
b0:function(a){var z=new E.O(new Float64Array(H.p(16)))
z.ac(this)
return z},
V:function(a,b){var z,y,x
if(!!b.$isW){z=new Float64Array(H.p(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.W(z)}if(!!b.$isV){z=new Float64Array(H.p(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.V(z)}if(4===b.gdP()){z=new Float64Array(H.p(16))
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
return new E.O(z)}throw H.f(P.bc(b))},
l:function(a,b){var z,y
z=new Float64Array(H.p(16))
y=this.a
z[0]=C.a.l(y[0],b.gj().h(0,0))
z[1]=C.a.l(y[1],b.gj().h(0,1))
z[2]=C.a.l(y[2],b.gj().h(0,2))
z[3]=C.a.l(y[3],b.gj().h(0,3))
z[4]=C.a.l(y[4],b.gj().h(0,4))
z[5]=C.a.l(y[5],b.gj().h(0,5))
z[6]=C.a.l(y[6],b.gj().h(0,6))
z[7]=C.a.l(y[7],b.gj().h(0,7))
z[8]=C.a.l(y[8],b.gj().h(0,8))
z[9]=C.a.l(y[9],b.gj().h(0,9))
z[10]=C.a.l(y[10],b.gj().h(0,10))
z[11]=C.a.l(y[11],b.gj().h(0,11))
z[12]=C.a.l(y[12],b.gj().h(0,12))
z[13]=C.a.l(y[13],b.gj().h(0,13))
z[14]=C.a.l(y[14],b.gj().h(0,14))
z[15]=C.a.l(y[15],b.gj().h(0,15))
return new E.O(z)},
m:function(a,b){var z,y
z=new Float64Array(H.p(16))
y=this.a
z[0]=C.a.m(y[0],b.gj().h(0,0))
z[1]=C.a.m(y[1],b.gj().h(0,1))
z[2]=C.a.m(y[2],b.gj().h(0,2))
z[3]=C.a.m(y[3],b.gj().h(0,3))
z[4]=C.a.m(y[4],b.gj().h(0,4))
z[5]=C.a.m(y[5],b.gj().h(0,5))
z[6]=C.a.m(y[6],b.gj().h(0,6))
z[7]=C.a.m(y[7],b.gj().h(0,7))
z[8]=C.a.m(y[8],b.gj().h(0,8))
z[9]=C.a.m(y[9],b.gj().h(0,9))
z[10]=C.a.m(y[10],b.gj().h(0,10))
z[11]=C.a.m(y[11],b.gj().h(0,11))
z[12]=C.a.m(y[12],b.gj().h(0,12))
z[13]=C.a.m(y[13],b.gj().h(0,13))
z[14]=C.a.m(y[14],b.gj().h(0,14))
z[15]=C.a.m(y[15],b.gj().h(0,15))
return new E.O(z)},
cg:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isW
x=y?b.gbh():1
if(!!z.$isV||y){w=z.gE(b)
v=z.gL(b)
u=z.gek(b)}else{u=d
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
bk:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isW
x=y?b.gbh():1
if(!!z.$isV||y){w=z.gE(b)
v=z.gL(b)
u=z.gek(b)}else{u=d
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
X:function(){var z=this.a
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
e5:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
V:{
"^":"b;j:a<",
ao:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ac:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.a(z[0])+","+H.a(z[1])+","+H.a(z[2])+"]"},
m:function(a,b){var z,y,x,w
z=this.a
y=C.a.m(z[0],b.gj().h(0,0))
x=C.a.m(z[1],b.gj().h(0,1))
z=C.a.m(z[2],b.gj().h(0,2))
w=new E.V(new Float64Array(H.p(3)))
w.ao(y,x,z)
return w},
l:function(a,b){var z,y,x,w
z=this.a
y=C.a.l(z[0],b.gj().h(0,0))
x=C.a.l(z[1],b.gj().h(0,1))
z=C.a.l(z[2],b.gj().h(0,2))
w=new E.V(new Float64Array(H.p(3)))
w.ao(y,x,z)
return w},
V:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.M(b)
x=z[1]
z=z[2]
w=new E.V(new Float64Array(H.p(3)))
w.ao(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gk:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dg(y*y+x*x+z*z))},
b0:function(a){var z=new E.V(new Float64Array(H.p(3)))
z.ac(this)
return z},
gE:function(a){return this.a[0]},
gL:function(a){return this.a[1]}},
W:{
"^":"b;j:a<",
aD:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ac:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.a(z[0])+","+H.a(z[1])+","+H.a(z[2])+","+H.a(z[3])},
m:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.m(z[0],b.gj().h(0,0))
x=C.a.m(z[1],b.gj().h(0,1))
w=C.a.m(z[2],b.gj().h(0,2))
z=C.a.m(z[3],b.gj().h(0,3))
v=new E.W(new Float64Array(H.p(4)))
v.aD(y,x,w,z)
return v},
l:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.l(z[0],b.gj().h(0,0))
x=C.a.l(z[1],b.gj().h(0,1))
w=C.a.l(z[2],b.gj().h(0,2))
z=C.a.l(z[3],b.gj().h(0,3))
v=new E.W(new Float64Array(H.p(4)))
v.aD(y,x,w,z)
return v},
V:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.M(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.W(new Float64Array(H.p(4)))
v.aD(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gk:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dg(y*y+x*x+w*w+z*z))},
b0:function(a){var z=new E.W(new Float64Array(H.p(4)))
z.ac(this)
return z},
gE:function(a){return this.a[0]},
gL:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ce.prototype
return J.eF.prototype}if(typeof a=="string")return J.aJ.prototype
if(a==null)return J.eG.prototype
if(typeof a=="boolean")return J.eE.prototype
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.b3(a)}
J.L=function(a){if(typeof a=="string")return J.aJ.prototype
if(a==null)return a
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.b3(a)}
J.aD=function(a){if(a==null)return a
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.b3(a)}
J.bL=function(a){if(typeof a=="number")return J.aw.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bz.prototype
return a}
J.hP=function(a){if(typeof a=="number")return J.aw.prototype
if(typeof a=="string")return J.aJ.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bz.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.b3(a)}
J.a5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.hP(a).l(a,b)}
J.Q=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).n(a,b)}
J.dv=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bL(a).aB(a,b)}
J.bS=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.bL(a).m(a,b)}
J.bT=function(a,b){if(a.constructor==Array||typeof a=="string"||H.i2(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).h(a,b)}
J.dw=function(a,b,c,d){return J.i(a).cS(a,b,c,d)}
J.dx=function(a,b,c,d){return J.i(a).df(a,b,c,d)}
J.bU=function(a,b,c){return J.i(a).dl(a,b,c)}
J.dy=function(a,b){return J.i(a).dn(a,b)}
J.dz=function(a,b,c,d,e){return J.i(a).dq(a,b,c,d,e)}
J.dA=function(a,b){return J.aD(a).du(a,b)}
J.dB=function(a,b,c,d,e){return J.i(a).dv(a,b,c,d,e)}
J.dC=function(a,b){return J.i(a).dw(a,b)}
J.dD=function(a,b){return J.i(a).dz(a,b)}
J.bV=function(a,b,c,d,e){return J.i(a).dB(a,b,c,d,e)}
J.dE=function(a,b){return J.i(a).bT(a,b)}
J.bW=function(a){return J.i(a).dF(a)}
J.dF=function(a){return J.i(a).dG(a)}
J.dG=function(a,b){return J.i(a).dH(a,b)}
J.dH=function(a,b){return J.i(a).dI(a,b)}
J.bX=function(a,b){return J.i(a).dJ(a,b)}
J.dI=function(a,b,c,d,e){return J.i(a).dQ(a,b,c,d,e)}
J.dJ=function(a,b){return J.aD(a).S(a,b)}
J.bY=function(a,b){return J.i(a).dR(a,b)}
J.dK=function(a,b){return J.i(a).dS(a,b)}
J.dL=function(a,b){return J.aD(a).D(a,b)}
J.bZ=function(a){return J.i(a).gds(a)}
J.R=function(a){return J.i(a).gag(a)}
J.u=function(a){return J.l(a).gq(a)}
J.ba=function(a){return J.aD(a).gC(a)}
J.aq=function(a){return J.L(a).gk(a)}
J.dM=function(a){return J.i(a).gc1(a)}
J.dN=function(a){return J.i(a).gc2(a)}
J.dO=function(a){return J.i(a).gc3(a)}
J.dP=function(a){return J.i(a).gc4(a)}
J.dQ=function(a){return J.i(a).gc5(a)}
J.dR=function(a){return J.i(a).gc6(a)}
J.dS=function(a){return J.i(a).gc7(a)}
J.dT=function(a){return J.i(a).gbf(a)}
J.dU=function(a){return J.i(a).gE(a)}
J.dV=function(a,b,c){return J.i(a).ck(a,b,c)}
J.dW=function(a){return J.i(a).cl(a)}
J.dX=function(a,b){return J.i(a).cm(a,b)}
J.bb=function(a,b,c){return J.i(a).cp(a,b,c)}
J.dY=function(a,b){return J.i(a).bZ(a,b)}
J.dZ=function(a,b){return J.aD(a).a9(a,b)}
J.e_=function(a,b){return J.i(a).sv(a,b)}
J.e0=function(a,b){return J.i(a).sA(a,b)}
J.c_=function(a,b,c,d){return J.i(a).cB(a,b,c,d)}
J.c0=function(a,b,c,d){return J.i(a).cC(a,b,c,d)}
J.c1=function(a){return J.bL(a).a3(a)}
J.ar=function(a){return J.l(a).i(a)}
J.c2=function(a,b){return J.i(a).ei(a,b)}
J.e1=function(a,b,c,d,e,f,g){return J.i(a).ej(a,b,c,d,e,f,g)}
var $=I.p
C.c=J.av.prototype
C.d=J.ce.prototype
C.a=J.aw.prototype
C.e=J.aJ.prototype
C.u=J.eT.prototype
C.w=J.bz.prototype
C.k=new H.c8()
C.l=new P.fQ()
C.b=new P.hm()
C.f=new P.ag(0)
C.m=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.n=function(hooks) {
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

C.o=function(getTagFallback) {
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
C.p=function() {
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
C.q=function(hooks) {
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
C.r=function(hooks) {
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
C.t=new H.en([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.j=new F.cI(0)
C.v=new F.cI(1)
$.ct="$cachedFunction"
$.cu="$cachedInvocation"
$.N=0
$.af=null
$.c3=null
$.bN=null
$.dc=null
$.dq=null
$.b1=null
$.b4=null
$.bO=null
$.ab=null
$.al=null
$.am=null
$.bH=!1
$.k=C.b
$.ca=0
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
I.$lazy(y,x,w)}})(["cc","$get$cc",function(){return H.ez()},"cd","$get$cd",function(){return new P.ej(null)},"cL","$get$cL",function(){return H.P(H.aW({toString:function(){return"$receiver$"}}))},"cM","$get$cM",function(){return H.P(H.aW({$method$:null,toString:function(){return"$receiver$"}}))},"cN","$get$cN",function(){return H.P(H.aW(null))},"cO","$get$cO",function(){return H.P(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cS","$get$cS",function(){return H.P(H.aW(void 0))},"cT","$get$cT",function(){return H.P(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cQ","$get$cQ",function(){return H.P(H.cR(null))},"cP","$get$cP",function(){return H.P(function(){try{null.$method$}catch(z){return z.message}}())},"cV","$get$cV",function(){return H.P(H.cR(void 0))},"cU","$get$cU",function(){return H.P(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bB","$get$bB",function(){return P.fE()},"an","$get$an",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bp]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.a_]},{func:1,args:[,],opt:[,]},{func:1,ret:P.U,args:[P.n]},{func:1,args:[W.by]},{func:1,args:[,P.U]},{func:1,args:[P.U]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.a_]},{func:1,ret:P.bJ},{func:1,void:true,args:[P.b],opt:[P.a_]},{func:1,void:true,args:[,P.a_]},{func:1,args:[,,]},{func:1,args:[P.cC,,]},{func:1,args:[P.U,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.i8(d||a)
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
Isolate.b2=a.b2
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ds(F.dm(),b)},[])
else (function(b){H.ds(F.dm(),b)})([])})})()