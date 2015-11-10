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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bX"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bX"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bX(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b9=function(){}
var dart=[["","",,H,{
"^":"",
jj:{
"^":"b;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bd:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ba:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.c0==null){H.is()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.de("Return interceptor for "+H.a(y(a,z))))}w=H.iB(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.w
else return C.y}return w},
f:{
"^":"b;",
n:function(a,b){return a===b},
gt:function(a){return H.Y(a)},
i:["cP",function(a){return H.b_(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLTexture|WebGLUniformLocation"},
f3:{
"^":"f;",
i:function(a){return String(a)},
gt:function(a){return a?519018:218159},
$isbW:1},
f5:{
"^":"f;",
n:function(a,b){return null==b},
i:function(a){return"null"},
gt:function(a){return 0}},
cv:{
"^":"f;",
gt:function(a){return 0},
$isf6:1},
fi:{
"^":"cv;"},
bM:{
"^":"cv;",
i:function(a){return String(a)}},
aD:{
"^":"f;",
c0:function(a,b){if(!!a.immutable$list)throw H.e(new P.L(b))},
dJ:function(a,b){if(!!a.fixed$length)throw H.e(new P.L(b))},
C:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.G(a))}},
aa:function(a,b){return H.c(new H.bA(a,b),[null,null])},
aA:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.a(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
V:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
ge9:function(a){if(a.length>0)return a[0]
throw H.e(H.bu())},
ga3:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bu())},
bs:function(a,b,c,d,e){var z,y,x
this.c0(a,"set range")
P.cN(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.e(H.f1())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aR(a,"[","]")},
gB:function(a){return new J.ep(a,a.length,0,null)},
gt:function(a){return H.Y(a)},
gl:function(a){return a.length},
sl:function(a,b){this.dJ(a,"set length")
if(b<0)throw H.e(P.aG(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.v(a,b))
if(b>=a.length||b<0)throw H.e(H.v(a,b))
return a[b]},
u:function(a,b,c){this.c0(a,"indexed set")
if(b>=a.length||!1)throw H.e(H.v(a,b))
a[b]=c},
$isaS:1,
$isj:1,
$asj:null,
$iso:1},
ji:{
"^":"aD;"},
ep:{
"^":"b;a,b,c,d",
gv:function(){return this.d},
q:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.G(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aE:{
"^":"f;",
bi:function(a,b){return a%b},
a5:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.L(""+a))},
A:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.L(""+a))},
eD:function(a){return a},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.e(H.af(b))
return a+b},
cT:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a5(a/b)},
ah:function(a,b){return(a|0)===a?a/b|0:this.a5(a/b)},
b1:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aG:function(a,b){if(typeof b!=="number")throw H.e(H.af(b))
return a<b},
$isaM:1},
cu:{
"^":"aE;",
$isaM:1,
$isn:1},
f4:{
"^":"aE;",
$isaM:1},
aT:{
"^":"f;",
dO:function(a,b){if(b>=a.length)throw H.e(H.v(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.e(P.eo(b,null,null))
return a+b},
cO:function(a,b,c){H.dA(b)
if(c==null)c=a.length
H.dA(c)
if(b<0)throw H.e(P.b0(b,null,null))
if(typeof c!=="number")return H.F(c)
if(b>c)throw H.e(P.b0(b,null,null))
if(c>a.length)throw H.e(P.b0(c,null,null))
return a.substring(b,c)},
cN:function(a,b){return this.cO(a,b,null)},
dS:function(a,b,c){if(c>a.length)throw H.e(P.aG(c,0,a.length,null,null))
return H.iG(a,b,c)},
gH:function(a){return a.length===0},
i:function(a){return a},
gt:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gl:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.v(a,b))
if(b>=a.length||b<0)throw H.e(H.v(a,b))
return a[b]},
$isaS:1,
$isU:1}}],["","",,H,{
"^":"",
aI:function(a,b){var z=a.an(b)
if(!init.globalState.d.cy)init.globalState.f.ar()
return z},
bc:function(){--init.globalState.f.b},
dL:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.e(P.aO("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.hK(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cs()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hm(P.by(null,H.aH),0)
y.z=P.aV(null,null,null,P.n,H.bR)
y.ch=P.aV(null,null,null,P.n,null)
if(y.x===!0){x=new H.hJ()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eV,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hL)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aV(null,null,null,P.n,H.b1)
w=P.aj(null,null,null,P.n)
v=new H.b1(0,null,!1)
u=new H.bR(y,x,w,init.createNewIsolate(),v,new H.a6(H.bf()),new H.a6(H.bf()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
w.a9(0,0)
u.bv(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aK()
x=H.ag(y,[y]).a0(a)
if(x)u.an(new H.iE(z,a))
else{y=H.ag(y,[y,y]).a0(a)
if(y)u.an(new H.iF(z,a))
else u.an(a)}init.globalState.f.ar()},
eZ:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.f_()
return},
f_:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.L("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.L("Cannot extract URI from \""+H.a(z)+"\""))},
eV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b3(!0,[]).a1(b.data)
y=J.N(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b3(!0,[]).a1(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b3(!0,[]).a1(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aV(null,null,null,P.n,H.b1)
p=P.aj(null,null,null,P.n)
o=new H.b1(0,null,!1)
n=new H.bR(y,q,p,init.createNewIsolate(),o,new H.a6(H.bf()),new H.a6(H.bf()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
p.a9(0,0)
n.bv(0,o)
init.globalState.f.a.U(new H.aH(n,new H.eW(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ar()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").Z(y.h(z,"msg"))
init.globalState.f.ar()
break
case"close":init.globalState.ch.ab(0,$.$get$ct().h(0,a))
a.terminate()
init.globalState.f.ar()
break
case"log":H.eU(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a9(["command","print","msg",z])
q=new H.ab(!0,P.a8(null,P.n)).F(q)
y.toString
self.postMessage(q)}else P.be(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
eU:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a9(["command","log","msg",a])
x=new H.ab(!0,P.a8(null,P.n)).F(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.y(w)
throw H.e(P.aQ(z))}},
eX:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cJ=$.cJ+("_"+y)
$.cK=$.cK+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.Z(["spawned",new H.b5(y,x),w,z.r])
x=new H.eY(a,b,c,d,z)
if(e===!0){z.bY(w,w)
init.globalState.f.a.U(new H.aH(z,x,"start isolate"))}else x.$0()},
i3:function(a){return new H.b3(!0,[]).a1(new H.ab(!1,P.a8(null,P.n)).F(a))},
iE:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iF:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hK:{
"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hL:function(a){var z=P.a9(["command","print","msg",a])
return new H.ab(!0,P.a8(null,P.n)).F(z)}}},
bR:{
"^":"b;a,b,c,en:d<,dT:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bY:function(a,b){if(!this.f.n(0,a))return
if(this.Q.a9(0,b)&&!this.y)this.y=!0
this.b2()},
ev:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ab(0,a)
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
if(w===y.c)y.bF();++y.d}this.y=!1}this.b2()},
dA:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eu:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.B(new P.L("removeRange"))
P.cN(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cJ:function(a,b){if(!this.r.n(0,a))return
this.db=b},
ed:function(a,b,c){var z=J.l(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){a.Z(c)
return}z=this.cx
if(z==null){z=P.by(null,null)
this.cx=z}z.U(new H.hE(a,c))},
eb:function(a,b){var z
if(!this.r.n(0,a))return
z=J.l(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.bb()
return}z=this.cx
if(z==null){z=P.by(null,null)
this.cx=z}z.U(this.geo())},
ee:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.be(a)
if(b!=null)P.be(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.ay(a)
y[1]=b==null?null:J.ay(b)
for(x=new P.cx(z,z.r,null,null),x.c=z.e;x.q();)x.d.Z(y)},
an:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.C(u)
w=t
v=H.y(u)
this.ee(w,v)
if(this.db===!0){this.bb()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gen()
if(this.cx!=null)for(;t=this.cx,!t.gH(t);)this.cx.cj().$0()}return y},
c9:function(a){return this.b.h(0,a)},
bv:function(a,b){var z=this.b
if(z.aj(a))throw H.e(P.aQ("Registry: ports must be registered only once."))
z.u(0,a,b)},
b2:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.bb()},
bb:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.O(0)
for(z=this.b,y=z.gcr(z),y=y.gB(y);y.q();)y.gv().d5()
z.O(0)
this.c.O(0)
init.globalState.z.ab(0,this.a)
this.dx.O(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.Z(z[v])}this.ch=null}},"$0","geo",0,0,1]},
hE:{
"^":"d:1;a,b",
$0:function(){this.a.Z(this.b)}},
hm:{
"^":"b;a,b",
e_:function(){var z=this.a
if(z.b===z.c)return
return z.cj()},
cn:function(){var z,y,x
z=this.e_()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aj(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gH(y)}else y=!1
else y=!1
else y=!1
if(y)H.B(P.aQ("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gH(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a9(["command","close"])
x=new H.ab(!0,P.a8(null,P.n)).F(x)
y.toString
self.postMessage(x)}return!1}z.es()
return!0},
bQ:function(){if(self.window!=null)new H.hn(this).$0()
else for(;this.cn(););},
ar:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bQ()
else try{this.bQ()}catch(x){w=H.C(x)
z=w
y=H.y(x)
w=init.globalState.Q
v=P.a9(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.ab(!0,P.a8(null,P.n)).F(v)
w.toString
self.postMessage(v)}}},
hn:{
"^":"d:1;a",
$0:function(){if(!this.a.cn())return
P.cV(C.h,this)}},
aH:{
"^":"b;a,b,c",
es:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.an(this.b)}},
hJ:{
"^":"b;"},
eW:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.eX(this.a,this.b,this.c,this.d,this.e,this.f)}},
eY:{
"^":"d:1;a,b,c,d,e",
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
else y.$0()}}z.b2()}},
di:{
"^":"b;"},
b5:{
"^":"di;b,a",
Z:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbI())return
x=H.i3(a)
if(z.gdT()===y){y=J.N(x)
switch(y.h(x,0)){case"pause":z.bY(y.h(x,1),y.h(x,2))
break
case"resume":z.ev(y.h(x,1))
break
case"add-ondone":z.dA(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eu(y.h(x,1))
break
case"set-errors-fatal":z.cJ(y.h(x,1),y.h(x,2))
break
case"ping":z.ed(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.eb(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a9(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ab(0,y)
break}return}y=init.globalState.f
w="receive "+H.a(a)
y.a.U(new H.aH(z,new H.hN(this,x),w))},
n:function(a,b){if(b==null)return!1
return b instanceof H.b5&&J.a4(this.b,b.b)},
gt:function(a){return this.b.gaX()}},
hN:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbI())z.d1(this.b)}},
bT:{
"^":"di;b,c,a",
Z:function(a){var z,y,x
z=P.a9(["command","message","port",this,"msg",a])
y=new H.ab(!0,P.a8(null,P.n)).F(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.bT&&J.a4(this.b,b.b)&&J.a4(this.a,b.a)&&J.a4(this.c,b.c)},
gt:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cK()
y=this.a
if(typeof y!=="number")return y.cK()
x=this.c
if(typeof x!=="number")return H.F(x)
return(z<<16^y<<8^x)>>>0}},
b1:{
"^":"b;aX:a<,b,bI:c<",
d5:function(){this.c=!0
this.b=null},
d1:function(a){if(this.c)return
this.dg(a)},
dg:function(a){return this.b.$1(a)},
$isfm:1},
fH:{
"^":"b;a,b,c",
cW:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.U(new H.aH(y,new H.fJ(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.as(new H.fK(this,b),0),a)}else throw H.e(new P.L("Timer greater than 0."))},
static:{fI:function(a,b){var z=new H.fH(!0,!1,null)
z.cW(a,b)
return z}}},
fJ:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fK:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
H.bc()
this.b.$0()}},
a6:{
"^":"b;aX:a<",
gt:function(a){var z=this.a
if(typeof z!=="number")return z.eO()
z=C.a.b1(z,0)^C.a.ah(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a6){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ab:{
"^":"b;a,b",
F:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gl(z))
z=J.l(a)
if(!!z.$iscB)return["buffer",a]
if(!!z.$isbE)return["typed",a]
if(!!z.$isaS)return this.cF(a)
if(!!z.$iseT){x=this.gcC()
w=a.gc5()
w=H.aX(w,x,H.I(w,"K",0),null)
w=P.bz(w,!0,H.I(w,"K",0))
z=z.gcr(a)
z=H.aX(z,x,H.I(z,"K",0),null)
return["map",w,P.bz(z,!0,H.I(z,"K",0))]}if(!!z.$isf6)return this.cG(a)
if(!!z.$isf)this.cq(a)
if(!!z.$isfm)this.as(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb5)return this.cH(a)
if(!!z.$isbT)return this.cI(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.as(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa6)return["capability",a.a]
if(!(a instanceof P.b))this.cq(a)
return["dart",init.classIdExtractor(a),this.cE(init.classFieldsExtractor(a))]},"$1","gcC",2,0,2],
as:function(a,b){throw H.e(new P.L(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
cq:function(a){return this.as(a,null)},
cF:function(a){var z=this.cD(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.as(a,"Can't serialize indexable: ")},
cD:function(a){var z,y,x
z=[]
C.c.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.F(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cE:function(a){var z
for(z=0;z<a.length;++z)C.c.u(a,z,this.F(a[z]))
return a},
cG:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.as(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.F(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cI:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cH:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaX()]
return["raw sendport",a]}},
b3:{
"^":"b;a,b",
a1:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aO("Bad serialized message: "+H.a(a)))
switch(C.c.ge9(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=this.ak(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ak(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ak(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ak(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.e2(a)
case"sendport":return this.e3(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.e1(a)
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
this.ak(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.a(a))}},"$1","ge0",2,0,2],
ak:function(a){var z,y,x
z=J.N(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.F(x)
if(!(y<x))break
z.u(a,y,this.a1(z.h(a,y)));++y}return a},
e2:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.bw()
this.b.push(w)
y=J.ei(y,this.ge0()).bl(0)
for(z=J.N(y),v=J.N(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.h(y,u)
w.u(0,y[u],this.a1(v.h(x,u)))}return w},
e3:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.a4(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c9(w)
if(u==null)return
t=new H.b5(u,x)}else t=new H.bT(y,w,x)
this.b.push(t)
return t},
e1:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.N(y)
v=J.N(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.F(t)
if(!(u<t))break
w[z.h(y,u)]=this.a1(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
ew:function(){throw H.e(new P.L("Cannot modify unmodifiable Map"))},
im:function(a){return init.types[a]},
iA:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaU},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ay(a)
if(typeof z!=="string")throw H.e(H.af(a))
return z},
Y:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cL:function(a){var z,y
z=C.i(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.dO(z,0)===36)z=C.e.cN(z,1)
return(z+H.dF(H.bZ(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b_:function(a){return"Instance of '"+H.cL(a)+"'"},
E:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cI:function(a){return a.b?H.E(a).getUTCMilliseconds()+0:H.E(a).getMilliseconds()+0},
aZ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.af(a))
return a[b]},
bF:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.af(a))
a[b]=c},
F:function(a){throw H.e(H.af(a))},
h:function(a,b){if(a==null)J.aw(a)
throw H.e(H.v(a,b))},
v:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a5(!0,b,"index",null)
z=J.aw(a)
if(!(b<0)){if(typeof z!=="number")return H.F(z)
y=b>=z}else y=!0
if(y)return P.bt(b,a,"index",null,z)
return P.b0(b,"index",null)},
af:function(a){return new P.a5(!0,a,null,null)},
b6:function(a){return a},
dA:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.af(a))
return a},
e:function(a){var z
if(a==null)a=new P.cH()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dN})
z.name=""}else z.toString=H.dN
return z},
dN:function(){return J.ay(this.dartException)},
B:function(a){throw H.e(a)},
at:function(a){throw H.e(new P.G(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iI(a)
if(a==null)return
if(a instanceof H.bs)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.b1(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bv(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.cG(v,null))}}if(a instanceof TypeError){u=$.$get$d2()
t=$.$get$d3()
s=$.$get$d4()
r=$.$get$d5()
q=$.$get$d9()
p=$.$get$da()
o=$.$get$d7()
$.$get$d6()
n=$.$get$dc()
m=$.$get$db()
l=u.J(y)
if(l!=null)return z.$1(H.bv(y,l))
else{l=t.J(y)
if(l!=null){l.method="call"
return z.$1(H.bv(y,l))}else{l=s.J(y)
if(l==null){l=r.J(y)
if(l==null){l=q.J(y)
if(l==null){l=p.J(y)
if(l==null){l=o.J(y)
if(l==null){l=r.J(y)
if(l==null){l=n.J(y)
if(l==null){l=m.J(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cG(y,l==null?null:l.method))}}return z.$1(new H.h7(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cQ()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a5(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cQ()
return a},
y:function(a){var z
if(a instanceof H.bs)return a.b
if(a==null)return new H.dn(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dn(a,null)},
iD:function(a){if(a==null||typeof a!='object')return J.D(a)
else return H.Y(a)},
dC:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
iu:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.n(c,0))return H.aI(b,new H.iv(a))
else if(z.n(c,1))return H.aI(b,new H.iw(a,d))
else if(z.n(c,2))return H.aI(b,new H.ix(a,d,e))
else if(z.n(c,3))return H.aI(b,new H.iy(a,d,e,f))
else if(z.n(c,4))return H.aI(b,new H.iz(a,d,e,f,g))
else throw H.e(P.aQ("Unsupported number of arguments for wrapped closure"))},
as:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.iu)
a.$identity=z
return z},
eu:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.fp(z).r}else x=c
w=d?Object.create(new H.fv().constructor.prototype):Object.create(new H.bo(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.O
$.O=J.au(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cg(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.im(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.ce:H.bp
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cg(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
er:function(a,b,c,d){var z=H.bp
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cg:function(a,b,c){var z,y,x,w,v,u
if(c)return H.et(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.er(y,!w,z,b)
if(y===0){w=$.ai
if(w==null){w=H.aP("self")
$.ai=w}w="return function(){return this."+H.a(w)+"."+H.a(z)+"();"
v=$.O
$.O=J.au(v,1)
return new Function(w+H.a(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ai
if(v==null){v=H.aP("self")
$.ai=v}v=w+H.a(v)+"."+H.a(z)+"("+u+");"
w=$.O
$.O=J.au(w,1)
return new Function(v+H.a(w)+"}")()},
es:function(a,b,c,d){var z,y
z=H.bp
y=H.ce
switch(b?-1:a){case 0:throw H.e(new H.fr("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
et:function(a,b){var z,y,x,w,v,u,t,s
z=H.eq()
y=$.cd
if(y==null){y=H.aP("receiver")
$.cd=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.es(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.O
$.O=J.au(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.O
$.O=J.au(u,1)
return new Function(y+H.a(u)+"}")()},
bX:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eu(a,b,z,!!d,e,f)},
iH:function(a){throw H.e(new P.ez("Cyclic initialization for static "+H.a(a)))},
ag:function(a,b,c){return new H.fs(a,b,c,null)},
aK:function(){return C.l},
bf:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
t:function(a,b,c){var z
if(b===0){J.dZ(c,a)
return}else if(b===1){c.c1(H.C(a),H.y(a))
return}if(!!J.l(a).$isS)z=a
else{z=H.c(new P.A(0,$.k,null),[null])
z.aO(a)}z.aF(H.dw(b,0),new H.id(b))
return c.gea()},
dw:function(a,b){return new H.ia(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
c:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bZ:function(a){if(a==null)return
return a.$builtinTypeInfo},
dD:function(a,b){return H.dM(a["$as"+H.a(b)],H.bZ(a))},
I:function(a,b,c){var z=H.dD(a,b)
return z==null?null:z[c]},
r:function(a,b){var z=H.bZ(a)
return z==null?null:z[b]},
c3:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dF(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dF:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bG("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.a(H.c3(u,c))}return w?"":"<"+H.a(z)+">"},
dM:function(a,b){if(typeof a=="function"){a=H.c1(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.c1(a,null,b)}return b},
ic:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.J(a[y],b[y]))return!1
return!0},
b7:function(a,b,c){return H.c1(a,b,H.dD(b,c))},
J:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dE(a,b)
if('func' in a)return b.builtin$cls==="eJ"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c3(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.a(H.c3(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ic(H.dM(v,z),x)},
dy:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.J(z,v)||H.J(v,z)))return!1}return!0},
ib:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.J(v,u)||H.J(u,v)))return!1}return!0},
dE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.J(z,y)||H.J(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dy(x,w,!1))return!1
if(!H.dy(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}}return H.ib(a.named,b.named)},
c1:function(a,b,c){return a.apply(b,c)},
k6:function(a){var z=$.c_
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
k4:function(a){return H.Y(a)},
k3:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iB:function(a){var z,y,x,w,v,u
z=$.c_.$1(a)
y=$.b8[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bb[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dx.$2(a,z)
if(z!=null){y=$.b8[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bb[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c2(x)
$.b8[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bb[z]=x
return x}if(v==="-"){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dH(a,x)
if(v==="*")throw H.e(new P.de(z))
if(init.leafTags[z]===true){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dH(a,x)},
dH:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bd(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c2:function(a){return J.bd(a,!1,null,!!a.$isaU)},
iC:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bd(z,!1,null,!!z.$isaU)
else return J.bd(z,c,null,null)},
is:function(){if(!0===$.c0)return
$.c0=!0
H.it()},
it:function(){var z,y,x,w,v,u,t,s
$.b8=Object.create(null)
$.bb=Object.create(null)
H.io()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dJ.$1(v)
if(u!=null){t=H.iC(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
io:function(){var z,y,x,w,v,u,t
z=C.q()
z=H.ae(C.n,H.ae(C.t,H.ae(C.j,H.ae(C.j,H.ae(C.r,H.ae(C.o,H.ae(C.p(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c_=new H.ip(v)
$.dx=new H.iq(u)
$.dJ=new H.ir(t)},
ae:function(a,b){return a(b)||b},
iG:function(a,b,c){return a.indexOf(b,c)>=0},
ev:{
"^":"b;",
i:function(a){return P.cA(this)},
u:function(a,b,c){return H.ew()}},
eM:{
"^":"ev;a",
aW:function(){var z=this.$map
if(z==null){z=new H.aF(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dC(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aW().h(0,b)},
C:function(a,b){this.aW().C(0,b)},
gl:function(a){var z=this.aW()
return z.gl(z)}},
fo:{
"^":"b;a,b,c,d,e,f,r,x",
static:{fp:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fo(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
h6:{
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
static:{Q:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.h6(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b2:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d8:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cG:{
"^":"z;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
f8:{
"^":"z;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
static:{bv:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.f8(a,y,z?null:b.receiver)}}},
h7:{
"^":"z;a",
i:function(a){var z=this.a
return C.e.gH(z)?"Error":"Error: "+z}},
iI:{
"^":"d:2;a",
$1:function(a){if(!!J.l(a).$isz)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dn:{
"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
iv:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
iw:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ix:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
iy:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iz:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"b;",
i:function(a){return"Closure '"+H.cL(this)+"'"},
gcs:function(){return this},
gcs:function(){return this}},
cT:{
"^":"d;"},
fv:{
"^":"cT;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bo:{
"^":"cT;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bo))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gt:function(a){var z,y
z=this.c
if(z==null)y=H.Y(this.a)
else y=typeof z!=="object"?J.D(z):H.Y(z)
z=H.Y(this.b)
if(typeof y!=="number")return y.eP()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.b_(z)},
static:{bp:function(a){return a.a},ce:function(a){return a.c},eq:function(){var z=$.ai
if(z==null){z=H.aP("self")
$.ai=z}return z},aP:function(a){var z,y,x,w,v
z=new H.bo("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fr:{
"^":"z;a",
i:function(a){return"RuntimeError: "+this.a}},
cP:{
"^":"b;"},
fs:{
"^":"cP;a,b,c,d",
a0:function(a){var z=this.da(a)
return z==null?!1:H.dE(z,this.ac())},
da:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
ac:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isjO)z.void=true
else if(!x.$iscn)z.ret=y.ac()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cO(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cO(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dB(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ac()}z.named=w}return z},
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
t=H.dB(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].ac())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
static:{cO:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ac())
return z}}},
cn:{
"^":"cP;",
i:function(a){return"dynamic"},
ac:function(){return}},
bs:{
"^":"b;a,M:b<"},
id:{
"^":"d:5;a",
$2:function(a,b){H.dw(this.a,1).$1(new H.bs(a,b))}},
ia:{
"^":"d:2;a,b",
$1:function(a){this.b(this.a,a)}},
aF:{
"^":"b;a,b,c,d,e,f,r",
gl:function(a){return this.a},
gH:function(a){return this.a===0},
gc5:function(){return H.c(new H.fa(this),[H.r(this,0)])},
gcr:function(a){return H.aX(this.gc5(),new H.f7(this),H.r(this,0),H.r(this,1))},
aj:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bB(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bB(y,a)}else return this.ei(a)},
ei:function(a){var z=this.d
if(z==null)return!1
return this.ap(this.N(z,this.ao(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.N(z,b)
return y==null?null:y.ga2()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.N(x,b)
return y==null?null:y.ga2()}else return this.ej(b)},
ej:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.N(z,this.ao(a))
x=this.ap(y,a)
if(x<0)return
return y[x].ga2()},
u:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aZ()
this.b=z}this.bu(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aZ()
this.c=y}this.bu(y,b,c)}else this.el(b,c)},
el:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aZ()
this.d=z}y=this.ao(a)
x=this.N(z,y)
if(x==null)this.b0(z,y,[this.b_(a,b)])
else{w=this.ap(x,a)
if(w>=0)x[w].sa2(b)
else x.push(this.b_(a,b))}},
ab:function(a,b){if(typeof b==="string")return this.bP(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bP(this.c,b)
else return this.ek(b)},
ek:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.N(z,this.ao(a))
x=this.ap(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bW(w)
return w.ga2()},
O:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
C:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.G(this))
z=z.c}},
bu:function(a,b,c){var z=this.N(a,b)
if(z==null)this.b0(a,b,this.b_(b,c))
else z.sa2(c)},
bP:function(a,b){var z
if(a==null)return
z=this.N(a,b)
if(z==null)return
this.bW(z)
this.bC(a,b)
return z.ga2()},
b_:function(a,b){var z,y
z=new H.f9(a,b,null,null)
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
ao:function(a){return J.D(a)&0x3ffffff},
ap:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gc3(),b))return y
return-1},
i:function(a){return P.cA(this)},
N:function(a,b){return a[b]},
b0:function(a,b,c){a[b]=c},
bC:function(a,b){delete a[b]},
bB:function(a,b){return this.N(a,b)!=null},
aZ:function(){var z=Object.create(null)
this.b0(z,"<non-identifier-key>",z)
this.bC(z,"<non-identifier-key>")
return z},
$iseT:1},
f7:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
f9:{
"^":"b;c3:a<,a2:b@,c,dr:d<"},
fa:{
"^":"K;a",
gl:function(a){return this.a.a},
gB:function(a){var z,y
z=this.a
y=new H.fb(z,z.r,null,null)
y.c=z.e
return y},
C:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.G(z))
y=y.c}},
$iso:1},
fb:{
"^":"b;a,b,c,d",
gv:function(){return this.d},
q:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ip:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
iq:{
"^":"d:9;a",
$2:function(a,b){return this.a(a,b)}},
ir:{
"^":"d:10;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bu:function(){return new P.ak("No element")},
f1:function(){return new P.ak("Too few elements")},
fF:function(a){return a.geU()},
aW:{
"^":"K;",
gB:function(a){return new H.cy(this,this.gl(this),0,null)},
C:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.V(0,y))
if(z!==this.gl(this))throw H.e(new P.G(this))}},
aa:function(a,b){return H.c(new H.bA(this,b),[null,null])},
bm:function(a,b){var z,y,x
if(b){z=H.c([],[H.I(this,"aW",0)])
C.c.sl(z,this.gl(this))}else z=H.c(Array(this.gl(this)),[H.I(this,"aW",0)])
for(y=0;y<this.gl(this);++y){x=this.V(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bl:function(a){return this.bm(a,!0)},
$iso:1},
cy:{
"^":"b;a,b,c,d",
gv:function(){return this.d},
q:function(){var z,y,x,w
z=this.a
y=J.N(z)
x=y.gl(z)
if(this.b!==x)throw H.e(new P.G(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.V(z,w);++this.c
return!0}},
cz:{
"^":"K;a,b",
gB:function(a){var z=new H.fe(null,J.bk(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gl:function(a){return J.aw(this.a)},
$asK:function(a,b){return[b]},
static:{aX:function(a,b,c,d){if(!!J.l(a).$iso)return H.c(new H.co(a,b),[c,d])
return H.c(new H.cz(a,b),[c,d])}}},
co:{
"^":"cz;a,b",
$iso:1},
fe:{
"^":"f2;a,b,c",
q:function(){var z=this.b
if(z.q()){this.a=this.aV(z.gv())
return!0}this.a=null
return!1},
gv:function(){return this.a},
aV:function(a){return this.c.$1(a)}},
bA:{
"^":"aW;a,b",
gl:function(a){return J.aw(this.a)},
V:function(a,b){return this.aV(J.e2(this.a,b))},
aV:function(a){return this.b.$1(a)},
$asaW:function(a,b){return[b]},
$asK:function(a,b){return[b]},
$iso:1},
cq:{
"^":"b;"}}],["","",,H,{
"^":"",
dB:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
h8:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ie()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.as(new P.ha(z),1)).observe(y,{childList:true})
return new P.h9(z,y,x)}else if(self.setImmediate!=null)return P.ig()
return P.ih()},
jQ:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.as(new P.hb(a),0))},"$1","ie",2,0,4],
jR:[function(a){++init.globalState.f.b
self.setImmediate(H.as(new P.hc(a),0))},"$1","ig",2,0,4],
jS:[function(a){P.bH(C.h,a)},"$1","ih",2,0,4],
dr:function(a,b){var z=H.aK()
z=H.ag(z,[z,z]).a0(a)
if(z){b.toString
return a}else{b.toString
return a}},
eK:function(a,b,c){var z=new P.A(0,$.k,null)
z.$builtinTypeInfo=[c]
P.cV(a,new P.eL(b,z))
return z},
az:function(a){return H.c(new P.dh(H.c(new P.A(0,$.k,null),[a])),[a])},
i4:function(a,b,c){$.k.toString
a.G(b,c)},
i6:function(){var z,y
for(;z=$.ac,z!=null;){$.aq=null
y=z.c
$.ac=y
if(y==null)$.ap=null
$.k=z.b
z.dH()}},
k2:[function(){$.bU=!0
try{P.i6()}finally{$.k=C.b
$.aq=null
$.bU=!1
if($.ac!=null)$.$get$bO().$1(P.dz())}},"$0","dz",0,0,1],
dv:function(a){if($.ac==null){$.ap=a
$.ac=a
if(!$.bU)$.$get$bO().$1(P.dz())}else{$.ap.c=a
$.ap=a}},
dK:function(a){var z,y
z=$.k
if(C.b===z){P.ad(null,null,C.b,a)
return}z.toString
if(C.b.gba()===z){P.ad(null,null,z,a)
return}y=$.k
P.ad(null,null,y,y.b3(a,!0))},
jG:function(a,b){var z,y,x
z=H.c(new P.dp(null,null,null,0),[b])
y=z.gdk()
x=z.gdm()
z.a=a.a4(y,!0,z.gdl(),x)
return z},
i8:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.C(u)
z=t
y=H.y(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.R(x)
w=t
v=x.gM()
c.$2(w,v)}}},
i_:function(a,b,c,d){var z=a.b5()
if(!!J.l(z).$isS)z.bo(new P.i2(b,c,d))
else b.G(c,d)},
i0:function(a,b){return new P.i1(a,b)},
cV:function(a,b){var z=$.k
if(z===C.b){z.toString
return P.bH(a,b)}return P.bH(a,z.b3(b,!0))},
bH:function(a,b){var z=C.d.ah(a.a,1000)
return H.fI(z<0?0:z,b)},
bN:function(a){var z=$.k
$.k=a
return z},
aJ:function(a,b,c,d,e){var z,y,x
z=new P.dg(new P.i7(d,e),C.b,null)
y=$.ac
if(y==null){P.dv(z)
$.aq=$.ap}else{x=$.aq
if(x==null){z.c=y
$.aq=z
$.ac=z}else{z.c=x.c
x.c=z
$.aq=z
if(z.c==null)$.ap=z}}},
ds:function(a,b,c,d){var z,y
if($.k===c)return d.$0()
z=P.bN(c)
try{y=d.$0()
return y}finally{$.k=z}},
du:function(a,b,c,d,e){var z,y
if($.k===c)return d.$1(e)
z=P.bN(c)
try{y=d.$1(e)
return y}finally{$.k=z}},
dt:function(a,b,c,d,e,f){var z,y
if($.k===c)return d.$2(e,f)
z=P.bN(c)
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ad:function(a,b,c,d){var z=C.b!==c
if(z){d=c.b3(d,!(!z||C.b.gba()===c))
c=C.b}P.dv(new P.dg(d,c,null))},
ha:{
"^":"d:2;a",
$1:function(a){var z,y
H.bc()
z=this.a
y=z.a
z.a=null
y.$0()}},
h9:{
"^":"d:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hb:{
"^":"d:0;a",
$0:function(){H.bc()
this.a.$0()}},
hc:{
"^":"d:0;a",
$0:function(){H.bc()
this.a.$0()}},
hX:{
"^":"W;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.a(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.a(y)):z},
static:{hY:function(a,b){if(b!=null)return b
if(!!J.l(a).$isz)return a.gM()
return}}},
S:{
"^":"b;"},
eL:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a6(null)}catch(x){w=H.C(x)
z=w
y=H.y(x)
P.i4(this.b,z,y)}}},
hg:{
"^":"b;ea:a<",
c1:function(a,b){a=a!=null?a:new P.cH()
if(this.a.a!==0)throw H.e(new P.ak("Future already completed"))
$.k.toString
this.G(a,b)},
dQ:function(a){return this.c1(a,null)}},
dh:{
"^":"hg;a",
b7:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.ak("Future already completed"))
z.aO(b)},
G:function(a,b){this.a.d4(a,b)}},
am:{
"^":"b;bJ:a<,ew:b>,c,d,e",
ga8:function(){return this.b.b},
gc2:function(){return(this.c&1)!==0},
geg:function(){return this.c===6},
gef:function(){return this.c===8},
gdq:function(){return this.d},
gdz:function(){return this.d}},
A:{
"^":"b;ay:a?,a8:b<,c",
gdh:function(){return this.a===8},
sdi:function(a){if(a)this.a=2
else this.a=0},
aF:function(a,b){var z,y
z=H.c(new P.A(0,$.k,null),[null])
y=z.b
if(y!==C.b){y.toString
if(b!=null)b=P.dr(b,y)}this.aL(new P.am(null,z,b==null?1:3,a,b))
return z},
eC:function(a){return this.aF(a,null)},
bo:function(a){var z,y
z=$.k
y=new P.A(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.b)z.toString
this.aL(new P.am(null,y,8,a,null))
return y},
aY:function(){if(this.a!==0)throw H.e(new P.ak("Future already completed"))
this.a=1},
gdw:function(){return this.c},
gag:function(){return this.c},
bV:function(a){this.a=4
this.c=a},
bU:function(a){this.a=8
this.c=a},
du:function(a,b){this.bU(new P.W(a,b))},
aL:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ad(null,null,z,new P.hr(this,a))}else{a.a=this.c
this.c=a}},
ax:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbJ()
z.a=y}return y},
a6:function(a){var z,y
z=J.l(a)
if(!!z.$isS)if(!!z.$isA)P.b4(a,this)
else P.bQ(a,this)
else{y=this.ax()
this.bV(a)
P.a2(this,y)}},
bA:function(a){var z=this.ax()
this.bV(a)
P.a2(this,z)},
G:[function(a,b){var z=this.ax()
this.bU(new P.W(a,b))
P.a2(this,z)},function(a){return this.G(a,null)},"eQ","$2","$1","gaS",2,2,12,0],
aO:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isS){if(!!z.$isA){z=a.a
if(z>=4&&z===8){this.aY()
z=this.b
z.toString
P.ad(null,null,z,new P.ht(this,a))}else P.b4(a,this)}else P.bQ(a,this)
return}}this.aY()
z=this.b
z.toString
P.ad(null,null,z,new P.hu(this,a))},
d4:function(a,b){var z
this.aY()
z=this.b
z.toString
P.ad(null,null,z,new P.hs(this,a,b))},
$isS:1,
static:{bQ:function(a,b){var z,y,x,w
b.say(2)
try{a.aF(new P.hv(b),new P.hw(b))}catch(x){w=H.C(x)
z=w
y=H.y(x)
P.dK(new P.hx(b,z,y))}},b4:function(a,b){var z
b.a=2
z=new P.am(null,b,0,null,null)
if(a.a>=4)P.a2(a,z)
else a.aL(z)},a2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdh()
if(b==null){if(w){v=z.a.gag()
y=z.a.ga8()
x=J.R(v)
u=v.gM()
y.toString
P.aJ(null,null,y,x,u)}return}for(;b.gbJ()!=null;b=t){t=b.a
b.a=null
P.a2(z.a,b)}x.a=!0
s=w?null:z.a.gdw()
x.b=s
x.c=!1
y=!w
if(!y||b.gc2()||b.c===8){r=b.ga8()
if(w){u=z.a.ga8()
u.toString
if(u==null?r!=null:u!==r){u=u.gba()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gag()
y=z.a.ga8()
x=J.R(v)
u=v.gM()
y.toString
P.aJ(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gc2())x.a=new P.hz(x,b,s,r).$0()}else new P.hy(z,x,b,r).$0()
if(b.gef())new P.hA(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isS}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.A)if(p.a>=4){o.a=2
z.a=p
b=new P.am(null,o,0,null,null)
y=p
continue}else P.b4(p,o)
else P.bQ(p,o)
return}}o=b.b
b=o.ax()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hr:{
"^":"d:0;a,b",
$0:function(){P.a2(this.a,this.b)}},
hv:{
"^":"d:2;a",
$1:function(a){this.a.bA(a)}},
hw:{
"^":"d:6;a",
$2:function(a,b){this.a.G(a,b)},
$1:function(a){return this.$2(a,null)}},
hx:{
"^":"d:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
ht:{
"^":"d:0;a,b",
$0:function(){P.b4(this.b,this.a)}},
hu:{
"^":"d:0;a,b",
$0:function(){this.a.bA(this.b)}},
hs:{
"^":"d:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
hz:{
"^":"d:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aE(this.b.gdq(),this.c)
return!0}catch(x){w=H.C(x)
z=w
y=H.y(x)
this.a.b=new P.W(z,y)
return!1}}},
hy:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gag()
y=!0
r=this.c
if(r.geg()){x=r.d
try{y=this.d.aE(x,J.R(z))}catch(q){r=H.C(q)
w=r
v=H.y(q)
r=J.R(z)
p=w
o=(r==null?p==null:r===p)?z:new P.W(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aK()
p=H.ag(p,[p,p]).a0(r)
n=this.d
m=this.b
if(p)m.b=n.ex(u,J.R(z),z.gM())
else m.b=n.aE(u,J.R(z))}catch(q){r=H.C(q)
t=r
s=H.y(q)
r=J.R(z)
p=t
o=(r==null?p==null:r===p)?z:new P.W(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hA:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cl(this.d.gdz())
z.a=w
v=w}catch(u){z=H.C(u)
y=z
x=H.y(u)
if(this.c){z=J.R(this.a.a.gag())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gag()
else v.b=new P.W(y,x)
v.a=!1
return}if(!!J.l(v).$isS){t=this.d
s=t.gew(t)
s.sdi(!0)
this.b.c=!0
v.aF(new P.hB(this.a,s),new P.hC(z,s))}}},
hB:{
"^":"d:2;a,b",
$1:function(a){P.a2(this.a.a,new P.am(null,this.b,0,null,null))}},
hC:{
"^":"d:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.A)){y=H.c(new P.A(0,$.k,null),[null])
z.a=y
y.du(a,b)}P.a2(z.a,new P.am(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dg:{
"^":"b;a,b,c",
dH:function(){return this.a.$0()}},
a_:{
"^":"b;",
aa:function(a,b){return H.c(new P.hM(b,this),[H.I(this,"a_",0),null])},
C:function(a,b){var z,y
z={}
y=H.c(new P.A(0,$.k,null),[null])
z.a=null
z.a=this.a4(new P.fz(z,this,b,y),!0,new P.fA(y),y.gaS())
return y},
gl:function(a){var z,y
z={}
y=H.c(new P.A(0,$.k,null),[P.n])
z.a=0
this.a4(new P.fB(z),!0,new P.fC(z,y),y.gaS())
return y},
bl:function(a){var z,y
z=H.c([],[H.I(this,"a_",0)])
y=H.c(new P.A(0,$.k,null),[[P.j,H.I(this,"a_",0)]])
this.a4(new P.fD(this,z),!0,new P.fE(z,y),y.gaS())
return y}},
fz:{
"^":"d;a,b,c,d",
$1:function(a){P.i8(new P.fx(this.c,a),new P.fy(),P.i0(this.a.a,this.d))},
$signature:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"a_")}},
fx:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fy:{
"^":"d:2;",
$1:function(a){}},
fA:{
"^":"d:0;a",
$0:function(){this.a.a6(null)}},
fB:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
fC:{
"^":"d:0;a,b",
$0:function(){this.b.a6(this.a.a)}},
fD:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"a_")}},
fE:{
"^":"d:0;a,b",
$0:function(){this.b.a6(this.a)}},
fw:{
"^":"b;"},
jW:{
"^":"b;"},
hd:{
"^":"b;a8:d<,ay:e?",
bg:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c_()
if((z&4)===0&&(this.e&32)===0)this.bG(this.gbL())},
aq:function(a){return this.bg(a,null)},
ck:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gH(z)}else z=!1
if(z)this.r.aH(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bG(this.gbN())}}}},
b5:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aP()
return this.f},
aP:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c_()
if((this.e&32)===0)this.r=null
this.f=this.bK()},
aN:["cR",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bR(a)
else this.aM(new P.hj(a,null))}],
aK:["cS",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bT(a,b)
else this.aM(new P.hl(a,b,null))}],
d3:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bS()
else this.aM(C.m)},
bM:[function(){},"$0","gbL",0,0,1],
bO:[function(){},"$0","gbN",0,0,1],
bK:function(){return},
aM:function(a){var z,y
z=this.r
if(z==null){z=new P.hW(null,null,0)
this.r=z}z.a9(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aH(this)}},
bR:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bk(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aQ((z&4)!==0)},
bT:function(a,b){var z,y
z=this.e
y=new P.hf(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aP()
z=this.f
if(!!J.l(z).$isS)z.bo(y)
else y.$0()}else{y.$0()
this.aQ((z&4)!==0)}},
bS:function(){var z,y
z=new P.he(this)
this.aP()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isS)y.bo(z)
else z.$0()},
bG:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aQ((z&4)!==0)},
aQ:function(a){var z,y
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
if(y)this.bM()
else this.bO()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aH(this)},
d_:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dr(b,z)
this.c=c}},
hf:{
"^":"d:1;a,b,c",
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
if(x)w.ey(u,v,this.c)
else w.bk(u,v)
z.e=(z.e&4294967263)>>>0}},
he:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cm(z.c)
z.e=(z.e&4294967263)>>>0}},
dj:{
"^":"b;aD:a@"},
hj:{
"^":"dj;b,a",
bh:function(a){a.bR(this.b)}},
hl:{
"^":"dj;am:b>,M:c<,a",
bh:function(a){a.bT(this.b,this.c)}},
hk:{
"^":"b;",
bh:function(a){a.bS()},
gaD:function(){return},
saD:function(a){throw H.e(new P.ak("No events after a done."))}},
hO:{
"^":"b;ay:a?",
aH:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dK(new P.hP(this,a))
this.a=1},
c_:function(){if(this.a===1)this.a=3}},
hP:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.ec(this.b)}},
hW:{
"^":"hO;b,c,a",
gH:function(a){return this.c==null},
a9:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saD(b)
this.c=b}},
ec:function(a){var z,y
z=this.b
y=z.gaD()
this.b=y
if(y==null)this.c=null
z.bh(a)}},
dp:{
"^":"b;a,b,c,ay:d?",
bw:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eV:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a6(!0)
return}this.a.aq(0)
this.c=a
this.d=3},"$1","gdk",2,0,function(){return H.b7(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dp")}],
dn:[function(a,b){var z
if(this.d===2){z=this.c
this.bw(0)
z.G(a,b)
return}this.a.aq(0)
this.c=new P.W(a,b)
this.d=4},function(a){return this.dn(a,null)},"eX","$2","$1","gdm",2,2,14,0],
eW:[function(){if(this.d===2){var z=this.c
this.bw(0)
z.a6(!1)
return}this.a.aq(0)
this.c=null
this.d=5},"$0","gdl",0,0,1]},
i2:{
"^":"d:0;a,b,c",
$0:function(){return this.a.G(this.b,this.c)}},
i1:{
"^":"d:5;a,b",
$2:function(a,b){return P.i_(this.a,this.b,a,b)}},
bP:{
"^":"a_;",
a4:function(a,b,c,d){return this.d8(a,d,c,!0===b)},
c8:function(a,b,c){return this.a4(a,null,b,c)},
d8:function(a,b,c,d){return P.hq(this,a,b,c,d,H.I(this,"bP",0),H.I(this,"bP",1))},
bH:function(a,b){b.aN(a)},
$asa_:function(a,b){return[b]}},
dk:{
"^":"hd;x,y,a,b,c,d,e,f,r",
aN:function(a){if((this.e&2)!==0)return
this.cR(a)},
aK:function(a,b){if((this.e&2)!==0)return
this.cS(a,b)},
bM:[function(){var z=this.y
if(z==null)return
z.aq(0)},"$0","gbL",0,0,1],
bO:[function(){var z=this.y
if(z==null)return
z.ck()},"$0","gbN",0,0,1],
bK:function(){var z=this.y
if(z!=null){this.y=null
z.b5()}return},
eR:[function(a){this.x.bH(a,this)},"$1","gdd",2,0,function(){return H.b7(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dk")}],
eT:[function(a,b){this.aK(a,b)},"$2","gdf",4,0,15],
eS:[function(){this.d3()},"$0","gde",0,0,1],
d0:function(a,b,c,d,e,f,g){var z,y
z=this.gdd()
y=this.gdf()
this.y=this.x.a.c8(z,this.gde(),y)},
static:{hq:function(a,b,c,d,e,f,g){var z=$.k
z=H.c(new P.dk(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.d_(b,c,d,e)
z.d0(a,b,c,d,e,f,g)
return z}}},
hM:{
"^":"bP;b,a",
bH:function(a,b){var z,y,x,w,v
z=null
try{z=this.dv(a)}catch(w){v=H.C(w)
y=v
x=H.y(w)
$.k.toString
b.aK(y,x)
return}b.aN(z)},
dv:function(a){return this.b.$1(a)}},
W:{
"^":"b;am:a>,M:b<",
i:function(a){return H.a(this.a)},
$isz:1},
hZ:{
"^":"b;"},
i7:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.hX(z,P.hY(z,this.b)))}},
hR:{
"^":"hZ;",
gba:function(){return this},
cm:function(a){var z,y,x,w
try{if(C.b===$.k){x=a.$0()
return x}x=P.ds(null,null,this,a)
return x}catch(w){x=H.C(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
bk:function(a,b){var z,y,x,w
try{if(C.b===$.k){x=a.$1(b)
return x}x=P.du(null,null,this,a,b)
return x}catch(w){x=H.C(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
ey:function(a,b,c){var z,y,x,w
try{if(C.b===$.k){x=a.$2(b,c)
return x}x=P.dt(null,null,this,a,b,c)
return x}catch(w){x=H.C(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
b3:function(a,b){if(b)return new P.hS(this,a)
else return new P.hT(this,a)},
dD:function(a,b){if(b)return new P.hU(this,a)
else return new P.hV(this,a)},
h:function(a,b){return},
cl:function(a){if($.k===C.b)return a.$0()
return P.ds(null,null,this,a)},
aE:function(a,b){if($.k===C.b)return a.$1(b)
return P.du(null,null,this,a,b)},
ex:function(a,b,c){if($.k===C.b)return a.$2(b,c)
return P.dt(null,null,this,a,b,c)}},
hS:{
"^":"d:0;a,b",
$0:function(){return this.a.cm(this.b)}},
hT:{
"^":"d:0;a,b",
$0:function(){return this.a.cl(this.b)}},
hU:{
"^":"d:2;a,b",
$1:function(a){return this.a.bk(this.b,a)}},
hV:{
"^":"d:2;a,b",
$1:function(a){return this.a.aE(this.b,a)}}}],["","",,P,{
"^":"",
bw:function(){return H.c(new H.aF(0,null,null,null,null,null,0),[null,null])},
a9:function(a){return H.dC(a,H.c(new H.aF(0,null,null,null,null,null,0),[null,null]))},
f0:function(a,b,c){var z,y
if(P.bV(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ar()
y.push(a)
try{P.i5(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cR(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aR:function(a,b,c){var z,y,x
if(P.bV(a))return b+"..."+c
z=new P.bG(b)
y=$.$get$ar()
y.push(a)
try{x=z
x.a=P.cR(x.ga7(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga7()+c
y=z.ga7()
return y.charCodeAt(0)==0?y:y},
bV:function(a){var z,y
for(z=0;y=$.$get$ar(),z<y.length;++z)if(a===y[z])return!0
return!1},
i5:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gB(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.q())return
w=H.a(z.gv())
b.push(w)
y+=w.length+2;++x}if(!z.q()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gv();++x
if(!z.q()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gv();++x
for(;z.q();t=s,s=r){r=z.gv();++x
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
aV:function(a,b,c,d,e){return H.c(new H.aF(0,null,null,null,null,null,0),[d,e])},
a8:function(a,b){return P.hH(a,b)},
aj:function(a,b,c,d){return H.c(new P.hF(0,null,null,null,null,null,0),[d])},
cA:function(a){var z,y,x
z={}
if(P.bV(a))return"{...}"
y=new P.bG("")
try{$.$get$ar().push(a)
x=y
x.a=x.ga7()+"{"
z.a=!0
J.e3(a,new P.ff(z,y))
z=y
z.a=z.ga7()+"}"}finally{z=$.$get$ar()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga7()
return z.charCodeAt(0)==0?z:z},
hG:{
"^":"aF;a,b,c,d,e,f,r",
ao:function(a){return H.iD(a)&0x3ffffff},
ap:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gc3()
if(x==null?b==null:x===b)return y}return-1},
static:{hH:function(a,b){return H.c(new P.hG(0,null,null,null,null,null,0),[a,b])}}},
hF:{
"^":"hD;a,b,c,d,e,f,r",
gB:function(a){var z=new P.cx(this,this.r,null,null)
z.c=this.e
return z},
gl:function(a){return this.a},
dR:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.d7(b)},
d7:function(a){var z=this.d
if(z==null)return!1
return this.aw(z[this.av(a)],a)>=0},
c9:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dR(0,a)?a:null
else return this.dj(a)},
dj:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.av(a)]
x=this.aw(y,a)
if(x<0)return
return J.c4(y,x).gbD()},
C:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.G(this))
z=z.b}},
a9:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bS()
this.b=z}return this.bx(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bS()
this.c=y}return this.bx(y,b)}else return this.U(b)},
U:function(a){var z,y,x
z=this.d
if(z==null){z=P.bS()
this.d=z}y=this.av(a)
x=z[y]
if(x==null)z[y]=[this.aR(a)]
else{if(this.aw(x,a)>=0)return!1
x.push(this.aR(a))}return!0},
ab:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.by(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.by(this.c,b)
else return this.ds(b)},
ds:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.av(a)]
x=this.aw(y,a)
if(x<0)return!1
this.bz(y.splice(x,1)[0])
return!0},
O:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bx:function(a,b){if(a[b]!=null)return!1
a[b]=this.aR(b)
return!0},
by:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bz(z)
delete a[b]
return!0},
aR:function(a){var z,y
z=new P.fc(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bz:function(a){var z,y
z=a.gd6()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
av:function(a){return J.D(a)&0x3ffffff},
aw:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gbD(),b))return y
return-1},
$iso:1,
static:{bS:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fc:{
"^":"b;bD:a<,b,d6:c<"},
cx:{
"^":"b;a,b,c,d",
gv:function(){return this.d},
q:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hD:{
"^":"ft;"},
bx:{
"^":"b;",
gB:function(a){return new H.cy(a,this.gl(a),0,null)},
V:function(a,b){return this.h(a,b)},
C:function(a,b){var z,y
z=this.gl(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.G(a))}},
aa:function(a,b){return H.c(new H.bA(a,b),[null,null])},
i:function(a){return P.aR(a,"[","]")},
$isj:1,
$asj:null,
$iso:1},
ff:{
"^":"d:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.a(a)
z.a=y+": "
z.a+=H.a(b)}},
fd:{
"^":"K;a,b,c,d",
gB:function(a){return new P.hI(this,this.c,this.d,this.b,null)},
C:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.B(new P.G(this))}},
gH:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
O:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aR(this,"{","}")},
cj:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bu());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
U:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bF();++this.d},
bF:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.r(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.bs(y,0,w,z,x)
C.c.bs(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cU:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$iso:1,
static:{by:function(a,b){var z=H.c(new P.fd(null,0,0,0),[b])
z.cU(a,b)
return z}}},
hI:{
"^":"b;a,b,c,d,e",
gv:function(){return this.e},
q:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.B(new P.G(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fu:{
"^":"b;",
aa:function(a,b){return H.c(new H.co(this,b),[H.r(this,0),null])},
i:function(a){return P.aR(this,"{","}")},
C:function(a,b){var z
for(z=this.gB(this);z.q();)b.$1(z.d)},
$iso:1},
ft:{
"^":"fu;"}}],["","",,P,{
"^":"",
i9:function(a){return H.fF(a)},
bq:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ay(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eG(a)},
eG:function(a){var z=J.l(a)
if(!!z.$isd)return z.i(a)
return H.b_(a)},
aQ:function(a){return new P.hp(a)},
bz:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.bk(a);y.q();)z.push(y.gv())
if(b)return z
z.fixed$length=Array
return z},
be:function(a){var z=H.a(a)
H.dI(z)},
jw:{
"^":"d:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.i9(a)}},
bW:{
"^":"b;"},
"+bool":0,
ch:{
"^":"b;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.ch))return!1
return this.a===b.a&&this.b===b.b},
gt:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.eA(z?H.E(this).getUTCFullYear()+0:H.E(this).getFullYear()+0)
x=P.aA(z?H.E(this).getUTCMonth()+1:H.E(this).getMonth()+1)
w=P.aA(z?H.E(this).getUTCDate()+0:H.E(this).getDate()+0)
v=P.aA(z?H.E(this).getUTCHours()+0:H.E(this).getHours()+0)
u=P.aA(z?H.E(this).getUTCMinutes()+0:H.E(this).getMinutes()+0)
t=P.aA(z?H.E(this).getUTCSeconds()+0:H.E(this).getSeconds()+0)
s=P.eB(H.cI(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{eA:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.a(z)
if(z>=10)return y+"00"+H.a(z)
return y+"000"+H.a(z)},eB:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aA:function(a){if(a>=10)return""+a
return"0"+a}}},
bg:{
"^":"aM;"},
"+double":0,
aB:{
"^":"b;a",
m:function(a,b){return new P.aB(C.d.m(this.a,b.gd9()))},
aG:function(a,b){return C.d.aG(this.a,b.gd9())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.aB))return!1
return this.a===b.a},
gt:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eF()
y=this.a
if(y<0)return"-"+new P.aB(-y).i(0)
x=z.$1(C.d.bi(C.d.ah(y,6e7),60))
w=z.$1(C.d.bi(C.d.ah(y,1e6),60))
v=new P.eE().$1(C.d.bi(y,1e6))
return""+C.d.ah(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)}},
eE:{
"^":"d:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eF:{
"^":"d:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
z:{
"^":"b;",
gM:function(){return H.y(this.$thrownJsError)}},
cH:{
"^":"z;",
i:function(a){return"Throw of null."}},
a5:{
"^":"z;a,b,c,d",
gaU:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaT:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.gaU()+y+x
if(!this.a)return w
v=this.gaT()
u=P.bq(this.b)
return w+v+": "+H.a(u)},
static:{aO:function(a){return new P.a5(!1,null,null,a)},eo:function(a,b,c){return new P.a5(!0,a,b,c)}}},
cM:{
"^":"a5;e,f,a,b,c,d",
gaU:function(){return"RangeError"},
gaT:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.eL()
if(typeof z!=="number")return H.F(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b0:function(a,b,c){return new P.cM(null,null,!0,a,b,"Value not in range")},aG:function(a,b,c,d,e){return new P.cM(b,c,!0,a,d,"Invalid value")},cN:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.aG(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.aG(b,a,c,"end",f))
return b}}},
eP:{
"^":"a5;e,l:f>,a,b,c,d",
gaU:function(){return"RangeError"},
gaT:function(){P.bq(this.e)
var z=": index should be less than "+H.a(this.f)
return J.dO(this.b,0)?": index must not be negative":z},
static:{bt:function(a,b,c,d,e){var z=e!=null?e:J.aw(b)
return new P.eP(b,z,!0,a,c,"Index out of range")}}},
L:{
"^":"z;a",
i:function(a){return"Unsupported operation: "+this.a}},
de:{
"^":"z;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
ak:{
"^":"z;a",
i:function(a){return"Bad state: "+this.a}},
G:{
"^":"z;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.bq(z))+"."}},
cQ:{
"^":"b;",
i:function(a){return"Stack Overflow"},
gM:function(){return},
$isz:1},
ez:{
"^":"z;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hp:{
"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
eH:{
"^":"b;a",
i:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z=H.aZ(b,"expando$values")
return z==null?null:H.aZ(z,this.bE())},
u:function(a,b,c){var z=H.aZ(b,"expando$values")
if(z==null){z=new P.b()
H.bF(b,"expando$values",z)}H.bF(z,this.bE(),c)},
bE:function(){var z,y
z=H.aZ(this,"expando$key")
if(z==null){y=$.cp
$.cp=y+1
z="expando$key$"+y
H.bF(this,"expando$key",z)}return z}},
eJ:{
"^":"b;"},
n:{
"^":"aM;"},
"+int":0,
K:{
"^":"b;",
aa:function(a,b){return H.aX(this,b,H.I(this,"K",0),null)},
C:function(a,b){var z
for(z=this.gB(this);z.q();)b.$1(z.gv())},
bm:function(a,b){return P.bz(this,b,H.I(this,"K",0))},
bl:function(a){return this.bm(a,!0)},
gl:function(a){var z,y
z=this.gB(this)
for(y=0;z.q();)++y
return y},
V:function(a,b){var z,y,x
if(b<0)H.B(P.aG(b,0,null,"index",null))
for(z=this.gB(this),y=0;z.q();){x=z.gv()
if(b===y)return x;++y}throw H.e(P.bt(b,this,"index",null,y))},
i:function(a){return P.f0(this,"(",")")}},
f2:{
"^":"b;"},
j:{
"^":"b;",
$asj:null,
$iso:1},
"+List":0,
jx:{
"^":"b;",
i:function(a){return"null"}},
"+Null":0,
aM:{
"^":"b;"},
"+num":0,
b:{
"^":";",
n:function(a,b){return this===b},
gt:function(a){return H.Y(this)},
i:function(a){return H.b_(this)}},
Z:{
"^":"b;"},
U:{
"^":"b;"},
"+String":0,
bG:{
"^":"b;a7:a<",
gl:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cR:function(a,b,c){var z=J.bk(b)
if(!z.q())return a
if(c.length===0){do a+=H.a(z.gv())
while(z.q())}else{a+=H.a(z.gv())
for(;z.q();)a=a+c+H.a(z.gv())}return a}}},
cS:{
"^":"b;"}}],["","",,W,{
"^":"",
ey:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.u)},
a3:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dl:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dq:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hi(a)
if(!!J.l(z).$isM)return z
return}else return a},
x:function(a){var z=$.k
if(z===C.b)return a
return z.dD(a,!0)},
u:{
"^":"aC;",
$isu:1,
$isb:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iL:{
"^":"u;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iN:{
"^":"u;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iO:{
"^":"u;",
gbc:function(a){return H.c(new W.p(a,"error",!1),[null])},
gbd:function(a){return H.c(new W.p(a,"load",!1),[null])},
$isM:1,
$isf:1,
"%":"HTMLBodyElement"},
cf:{
"^":"u;j:height%,k:width%",
bp:function(a,b,c){return a.getContext(b,P.ii(c))},
cw:function(a,b,c,d,e,f,g){var z,y
z=P.a9(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bp(a,"webgl",z)
return y==null?this.bp(a,"experimental-webgl",z):y},
cv:function(a,b){return this.cw(a,!0,!0,!0,!0,!1,b)},
$iscf:1,
"%":"HTMLCanvasElement"},
iP:{
"^":"f;",
c7:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
iR:{
"^":"aY;l:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iS:{
"^":"eQ;l:length=",
bq:function(a,b){var z=this.dc(a,b)
return z!=null?z:""},
dc:function(a,b){if(W.ey(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.eC()+b)},
gj:function(a){return a.height},
gk:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eQ:{
"^":"f+ex;"},
ex:{
"^":"b;",
gj:function(a){return this.bq(a,"height")},
gk:function(a){return this.bq(a,"width")}},
iT:{
"^":"aY;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iU:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
eD:{
"^":"f;b4:bottom=,j:height=,I:left=,bj:right=,ad:top=,k:width=",
i:function(a){return"Rectangle ("+H.a(a.left)+", "+H.a(a.top)+") "+H.a(this.gk(a))+" x "+H.a(this.gj(a))},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gad(b)
if(y==null?x==null:y===x){y=this.gk(a)
x=z.gk(b)
if(y==null?x==null:y===x){y=this.gj(a)
z=z.gj(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.D(a.left)
y=J.D(a.top)
x=J.D(this.gk(a))
w=J.D(this.gj(a))
return W.dl(W.a3(W.a3(W.a3(W.a3(0,z),y),x),w))},
gbn:function(a){return H.c(new P.H(a.left,a.top),[null])},
$isT:1,
$asT:I.b9,
"%":";DOMRectReadOnly"},
aC:{
"^":"aY;",
gP:function(a){return P.fn(C.a.A(a.offsetLeft),C.a.A(a.offsetTop),C.a.A(a.offsetWidth),C.a.A(a.offsetHeight),null)},
i:function(a){return a.localName},
cu:function(a){return a.getBoundingClientRect()},
gbc:function(a){return H.c(new W.p(a,"error",!1),[null])},
gbd:function(a){return H.c(new W.p(a,"load",!1),[null])},
gca:function(a){return H.c(new W.p(a,"mousedown",!1),[null])},
gcb:function(a){return H.c(new W.p(a,"mouseenter",!1),[null])},
gcc:function(a){return H.c(new W.p(a,"mouseleave",!1),[null])},
gcd:function(a){return H.c(new W.p(a,"mousemove",!1),[null])},
gce:function(a){return H.c(new W.p(a,"mouseout",!1),[null])},
gcf:function(a){return H.c(new W.p(a,"mouseover",!1),[null])},
gcg:function(a){return H.c(new W.p(a,"mouseup",!1),[null])},
$isaC:1,
$isf:1,
$isM:1,
"%":";Element"},
iV:{
"^":"u;j:height%,T:src},k:width%",
"%":"HTMLEmbedElement"},
iW:{
"^":"br;am:error=",
"%":"ErrorEvent"},
br:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
M:{
"^":"f;",
d2:function(a,b,c,d){return a.addEventListener(b,H.as(c,1),d)},
dt:function(a,b,c,d){return a.removeEventListener(b,H.as(c,1),d)},
$isM:1,
"%":"MediaStream;EventTarget"},
je:{
"^":"u;l:length=",
"%":"HTMLFormElement"},
jf:{
"^":"u;j:height%,T:src},k:width%",
"%":"HTMLIFrameElement"},
cr:{
"^":"u;j:height%,T:src},k:width%",
b7:function(a,b){return a.complete.$1(b)},
$iscr:1,
"%":"HTMLImageElement"},
jh:{
"^":"u;j:height%,T:src},k:width%",
$isaC:1,
$isf:1,
$isM:1,
"%":"HTMLInputElement"},
fg:{
"^":"u;am:error=,T:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bB:{
"^":"dd;",
gP:function(a){var z,y
if(!!a.offsetX)return H.c(new P.H(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.dq(a.target)).$isaC)throw H.e(new P.L("offsetX is only supported on elements"))
z=W.dq(a.target)
y=H.c(new P.H(a.clientX,a.clientY),[null]).aJ(0,J.ec(J.ef(z)))
return H.c(new P.H(J.cc(y.a),J.cc(y.b)),[null])}},
$isbB:1,
$isb:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jv:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aY:{
"^":"M;",
i:function(a){var z=a.nodeValue
return z==null?this.cP(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
jy:{
"^":"u;j:height%,k:width%",
"%":"HTMLObjectElement"},
jB:{
"^":"u;T:src}",
"%":"HTMLScriptElement"},
jD:{
"^":"u;l:length=",
"%":"HTMLSelectElement"},
jE:{
"^":"u;T:src}",
"%":"HTMLSourceElement"},
jF:{
"^":"br;am:error=",
"%":"SpeechRecognitionError"},
bK:{
"^":"f;",
$isb:1,
"%":"Touch"},
bL:{
"^":"dd;dI:changedTouches=",
$isbL:1,
$isb:1,
"%":"TouchEvent"},
jK:{
"^":"eS;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bt(b,a,null,null,null))
return a[b]},
u:function(a,b,c){throw H.e(new P.L("Cannot assign element of immutable List."))},
V:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bK]},
$iso:1,
$isaU:1,
$isaS:1,
"%":"TouchList"},
eR:{
"^":"f+bx;",
$isj:1,
$asj:function(){return[W.bK]},
$iso:1},
eS:{
"^":"eR+eO;",
$isj:1,
$asj:function(){return[W.bK]},
$iso:1},
jL:{
"^":"u;T:src}",
"%":"HTMLTrackElement"},
dd:{
"^":"br;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
df:{
"^":"fg;j:height%,k:width%",
$isdf:1,
"%":"HTMLVideoElement"},
jP:{
"^":"M;",
$isf:1,
$isM:1,
"%":"DOMWindow|Window"},
jT:{
"^":"f;b4:bottom=,j:height=,I:left=,bj:right=,ad:top=,k:width=",
i:function(a){return"Rectangle ("+H.a(a.left)+", "+H.a(a.top)+") "+H.a(a.width)+" x "+H.a(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gad(b)
if(y==null?x==null:y===x){y=a.width
x=z.gk(b)
if(y==null?x==null:y===x){y=a.height
z=z.gj(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.D(a.left)
y=J.D(a.top)
x=J.D(a.width)
w=J.D(a.height)
return W.dl(W.a3(W.a3(W.a3(W.a3(0,z),y),x),w))},
gbn:function(a){return H.c(new P.H(a.left,a.top),[null])},
$isT:1,
$asT:I.b9,
"%":"ClientRect"},
jU:{
"^":"aY;",
$isf:1,
"%":"DocumentType"},
jV:{
"^":"eD;",
gj:function(a){return a.height},
gk:function(a){return a.width},
"%":"DOMRect"},
jY:{
"^":"u;",
$isM:1,
$isf:1,
"%":"HTMLFrameSetElement"},
ho:{
"^":"a_;",
a4:function(a,b,c,d){var z=new W.w(0,this.a,this.b,W.x(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.w()
return z},
c8:function(a,b,c){return this.a4(a,null,b,c)}},
p:{
"^":"ho;a,b,c"},
w:{
"^":"fw;a,b,c,d,e",
b5:function(){if(this.b==null)return
this.bX()
this.b=null
this.d=null
return},
bg:function(a,b){if(this.b==null)return;++this.a
this.bX()},
aq:function(a){return this.bg(a,null)},
ck:function(){if(this.b==null||this.a<=0)return;--this.a
this.w()},
w:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dP(x,this.c,z,this.e)}},
bX:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dQ(x,this.c,z,this.e)}}},
eO:{
"^":"b;",
gB:function(a){return new W.eI(a,this.gl(a),-1,null)},
$isj:1,
$asj:null,
$iso:1},
eI:{
"^":"b;a,b,c,d",
q:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c4(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gv:function(){return this.d}},
hh:{
"^":"b;a",
$isM:1,
$isf:1,
static:{hi:function(a){if(a===window)return a
else return new W.hh(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iJ:{
"^":"a7;",
$isf:1,
"%":"SVGAElement"},
iK:{
"^":"fG;",
$isf:1,
"%":"SVGAltGlyphElement"},
iM:{
"^":"m;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iX:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEBlendElement"},
iY:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iZ:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEComponentTransferElement"},
j_:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFECompositeElement"},
j0:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
j1:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
j2:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
j3:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEFloodElement"},
j4:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
j5:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEImageElement"},
j6:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEMergeElement"},
j7:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEMorphologyElement"},
j8:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEOffsetElement"},
j9:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFESpecularLightingElement"},
ja:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFETileElement"},
jb:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFETurbulenceElement"},
jc:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFilterElement"},
jd:{
"^":"a7;j:height=,k:width=",
"%":"SVGForeignObjectElement"},
eN:{
"^":"a7;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
a7:{
"^":"m;",
$isf:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jg:{
"^":"a7;j:height=,k:width=",
$isf:1,
"%":"SVGImageElement"},
jk:{
"^":"m;",
$isf:1,
"%":"SVGMarkerElement"},
jl:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGMaskElement"},
jz:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGPatternElement"},
jA:{
"^":"eN;j:height=,k:width=",
"%":"SVGRectElement"},
jC:{
"^":"m;",
$isf:1,
"%":"SVGScriptElement"},
m:{
"^":"aC;",
gbc:function(a){return H.c(new W.p(a,"error",!1),[null])},
gbd:function(a){return H.c(new W.p(a,"load",!1),[null])},
gca:function(a){return H.c(new W.p(a,"mousedown",!1),[null])},
gcb:function(a){return H.c(new W.p(a,"mouseenter",!1),[null])},
gcc:function(a){return H.c(new W.p(a,"mouseleave",!1),[null])},
gcd:function(a){return H.c(new W.p(a,"mousemove",!1),[null])},
gce:function(a){return H.c(new W.p(a,"mouseout",!1),[null])},
gcf:function(a){return H.c(new W.p(a,"mouseover",!1),[null])},
gcg:function(a){return H.c(new W.p(a,"mouseup",!1),[null])},
$isM:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jH:{
"^":"a7;j:height=,k:width=",
$isf:1,
"%":"SVGSVGElement"},
jI:{
"^":"m;",
$isf:1,
"%":"SVGSymbolElement"},
cU:{
"^":"a7;",
"%":";SVGTextContentElement"},
jJ:{
"^":"cU;",
$isf:1,
"%":"SVGTextPathElement"},
fG:{
"^":"cU;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jM:{
"^":"a7;j:height=,k:width=",
$isf:1,
"%":"SVGUseElement"},
jN:{
"^":"m;",
$isf:1,
"%":"SVGViewElement"},
jX:{
"^":"m;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jZ:{
"^":"m;",
$isf:1,
"%":"SVGCursorElement"},
k_:{
"^":"m;",
$isf:1,
"%":"SVGFEDropShadowElement"},
k0:{
"^":"m;",
$isf:1,
"%":"SVGGlyphRefElement"},
k1:{
"^":"m;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
fq:{
"^":"f;",
dB:function(a,b,c){return a.bindBuffer(b,c)},
dC:function(a,b,c){return a.bindTexture(b,c)},
dE:function(a,b){return a.blendEquation(b)},
dF:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dG:function(a,b,c,d){return a.bufferData(b,c,d)},
dK:function(a,b){return a.clear(b)},
dL:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dM:function(a,b){return a.clearDepth(b)},
dN:function(a,b){return a.clearStencil(b)},
dP:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dU:function(a){return a.createBuffer()},
dV:function(a){return a.createProgram()},
dW:function(a,b){return a.createShader(b)},
dX:function(a){return a.createTexture()},
dY:function(a,b){return a.depthFunc(b)},
dZ:function(a,b){return a.depthMask(b)},
e5:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
e7:function(a,b){return a.enable(b)},
e8:function(a,b){return a.enableVertexAttribArray(b)},
ct:function(a,b,c){return a.getAttribLocation(b,c)},
cB:function(a,b,c){return a.getUniformLocation(b,c)},
c7:function(a,b){return a.lineWidth(b)},
cL:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cM:function(a,b,c,d){return a.stencilOp(b,c,d)},
eA:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.ik(g))
return}z=J.l(g)
if(!!z.$iscr)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscf)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdf)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aO("Incorrect number or type of arguments"))},
ez:function(a,b,c,d,e,f,g){return this.eA(a,b,c,d,e,f,g,null,null,null)},
eB:function(a,b,c,d){return a.texParameteri(b,c,d)},
eG:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
eH:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
eI:function(a,b){return a.useProgram(b)},
eJ:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iQ:{
"^":"b;"}}],["","",,P,{
"^":"",
an:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dm:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
H:{
"^":"b;E:a>,L:b>",
i:function(a){return"Point("+H.a(this.a)+", "+H.a(this.b)+")"},
n:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.H))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gt:function(a){var z,y
z=J.D(this.a)
y=J.D(this.b)
return P.dm(P.an(P.an(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gE(b)
if(typeof z!=="number")return z.m()
x=C.a.m(z,x)
z=this.b
y=y.gL(b)
if(typeof z!=="number")return z.m()
y=new P.H(x,C.a.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aJ:function(a,b){var z,y,x,w
z=this.a
y=J.ee(b)
if(typeof z!=="number")return z.aJ()
if(typeof y!=="number")return H.F(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aJ()
if(typeof w!=="number")return H.F(w)
w=new P.H(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hQ:{
"^":"b;",
gbj:function(a){return this.gI(this)+this.c},
gb4:function(a){return this.gad(this)+this.d},
i:function(a){return"Rectangle ("+this.gI(this)+", "+this.b+") "+this.c+" x "+this.d},
n:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
if(this.gI(this)===z.gI(b)){y=this.b
z=y===z.gad(b)&&this.a+this.c===z.gbj(b)&&y+this.d===z.gb4(b)}else z=!1
return z},
gt:function(a){var z=this.b
return P.dm(P.an(P.an(P.an(P.an(0,this.gI(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbn:function(a){var z=new P.H(this.gI(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
T:{
"^":"hQ;I:a>,ad:b>,k:c>,j:d>",
$asT:null,
static:{fn:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.c(new P.T(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
q:function(a){return a},
ao:function(a){return a},
cB:{
"^":"f;",
$iscB:1,
"%":"ArrayBuffer"},
bE:{
"^":"f;",
$isbE:1,
"%":"DataView;ArrayBufferView;bC|cC|cE|bD|cD|cF|X"},
bC:{
"^":"bE;",
gl:function(a){return a.length},
$isaU:1,
$isaS:1},
bD:{
"^":"cE;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
return a[b]},
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
a[b]=c}},
cC:{
"^":"bC+bx;",
$isj:1,
$asj:function(){return[P.bg]},
$iso:1},
cE:{
"^":"cC+cq;"},
X:{
"^":"cF;",
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.n]},
$iso:1},
cD:{
"^":"bC+bx;",
$isj:1,
$asj:function(){return[P.n]},
$iso:1},
cF:{
"^":"cD+cq;"},
jm:{
"^":"bD;",
$isj:1,
$asj:function(){return[P.bg]},
$iso:1,
"%":"Float32Array"},
jn:{
"^":"bD;",
$isj:1,
$asj:function(){return[P.bg]},
$iso:1,
"%":"Float64Array"},
jo:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Int16Array"},
jp:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Int32Array"},
jq:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Int8Array"},
jr:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Uint16Array"},
js:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"Uint32Array"},
jt:{
"^":"X;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
ju:{
"^":"X;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.v(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.n]},
$iso:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dI:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
ii:function(a){var z={}
a.C(0,new P.ij(z))
return z},
ik:function(a){return a},
cm:function(){var z=$.cl
if(z==null){z=J.bh(window.navigator.userAgent,"Opera",0)
$.cl=z}return z},
eC:function(){var z,y
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
ij:{
"^":"d:18;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
k5:[function(){var z,y,x,w
z=new G.fN(700,500,P.bw())
y=new E.P(new Float64Array(H.q(16)))
y.S()
x=new F.fO(400,300,1,1,1,0,0,null,"none",null,y,!1)
x.b=[]
x.ch=F.aa(255,238,238,255)
y=new E.P(new Float64Array(H.q(16)))
y.S()
w=new G.fX(null,!1,0,z,!1,!1,0,null,!1,!1,[y])
w.a=G.fT(400,600)
w.sK(x)
w.eq()
w.eF()
if(!w.b){w.b=!0
w.au()}x.az(M.fk(z))},"$0","dG",0,0,1]},1],["","",,M,{
"^":"",
fj:{
"^":"cX;e,f,a,b,c,d",
be:function(a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(this.f==null)return
z=F.al(null)
a4.ai(null,new F.V(50,100,150,280))
a4.al(null,new F.V(50,50,100,100),z)
y=new Float64Array(H.q(16))
x=new E.P(y)
x.S()
w=Math.cos(H.b6(0.39269908169872414))
v=Math.sin(H.b6(0.39269908169872414))
u=y[0]
t=y[4]
s=y[1]
r=y[5]
q=y[2]
p=y[6]
o=y[3]
n=y[7]
m=-v
y[0]=u*w+t*v
y[1]=s*w+r*v
y[2]=q*w+p*v
y[3]=o*w+n*v
y[4]=u*m+t*w
y[5]=s*m+r*w
y[6]=q*m+p*w
y[7]=o*m+n*w
n=a4.a
n.push(C.c.ga3(n).R(0,x))
a4.ae()
z=F.al(null)
z.a=F.aa(255,255,255,0)
a4.al(null,new F.V(50,50,100,100),z)
z.a=F.aa(255,0,255,255)
z.b=C.k
z.c=2.5
a4.al(null,new F.V(150,150,100,100),z)
z.b=C.f
a4.e6(null,new F.V(150,150,100,100),z)
z=F.al(null)
z.a=F.aa(255,255,255,0)
x=J.ah(this.f.gD())
m=J.ah(this.f.gW())
l=this.f
o=J.ah(l.gD())
y=J.ah(this.f.gW())
J.bm(a4.c,a4.f)
k=J.bl(a4.c,a4.f,"a_tex")
j=J.bi(a4.c)
J.av(a4.c,34962,j)
p=l.gD()
if(typeof p!=="number")return H.F(p)
i=0/p
p=l.gW()
if(typeof p!=="number")return H.F(p)
h=0/p
p=l.gD()
if(typeof p!=="number")return H.F(p)
g=(0+x)/p
p=l.gW()
if(typeof p!=="number")return H.F(p)
f=(0+m)/p
J.dU(a4.c,34962,new Float32Array(H.ao([i,h,i,f,g,h,g,f])),35044)
J.bj(a4.c,k)
J.bn(a4.c,k,2,5126,!1,0,0)
e=l.cA(a4.c)
J.dR(a4.c,3553,e)
J.aN(a4.c,3553,10242,33071)
J.aN(a4.c,3553,10243,33071)
J.aN(a4.c,3553,10241,9728)
J.aN(a4.c,3553,10240,9728)
d=250+o/2
c=25+y/2
b=G.d_(a4.c,[250,25,0,250,c,0,d,25,0,d,c,0])
J.av(a4.c,34962,b)
a=G.d0(a4.c,[0,1,2,1,3,2])
J.av(a4.c,34963,a)
a0=J.bl(a4.c,a4.f,"vp")
a1=J.ax(a4.c,a4.f,"u_mat")
J.en(a4.c,a1,!1,new Float32Array(H.ao(a4.bZ().gp())))
J.bn(a4.c,a0,3,5126,!1,0,0)
a2=J.ax(a4.c,a4.f,"color")
y=a4.c
o=z.a.a
J.em(y,a2,(o>>>16&255)/255,(o>>>8&255)/255,(o>>>0&255)/255,(o>>>24&255)/255)
J.bj(a4.c,a0)
J.c7(a4.c,4,6,5123,0)
z=F.al(null)
z.a=F.aa(255,255,255,0)
J.ah(this.f.gD())
J.ah(this.f.gW())
a4.b9(null,[200,200,0,500,200,0],[0,1],z.a,C.k,z.c)
if(0>=n.length)return H.h(n,0)
n.pop()
a4.ae()},
cV:function(a){this.e.aB("assets/test.jpg").eC(new M.fl(this))},
static:{fk:function(a){var z=new E.P(new Float64Array(H.q(16)))
z.S()
z=new M.fj(a,null,"none",null,z,!1)
z.b=[]
z.cV(a)
return z}}},
fl:{
"^":"d:19;a",
$1:function(a){this.a.f=a}}}],["","",,F,{
"^":"",
cw:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.at)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.b1(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fL:{
"^":"b;"},
cX:{
"^":"b;",
az:function(a){var z=0,y=new P.az(),x=1,w,v=this,u,t,s,r
function $async$az(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.c(new s.A(0,r.k,null),[null])
t=u
t.aO(null)
z=2
return H.t(u,$async$az,y)
case 2:t=v
t=t.b
t.push(a)
return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$az,y,null)},
c4:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.at)(z),++x)z[x].c4(a)},
ci:function(a,b){},
co:function(a,b){var z,y,x
this.b8()
this.ci(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.at)(z),++x)z[x].co(a,b)},
be:function(a,b){},
bf:["cQ",function(a,b){var z,y,x,w,v,u
this.b8()
this.be(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.at)(z),++w){v=z[w]
u=v.c
x.push(C.c.ga3(x).R(0,u))
b.ae()
v.bf(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.ae()}}],
eE:["a_",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b8()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.Y(v.c)
u=v.eE(a,b,c,d,e)
a.X()
if(u)return!0}t=a.cz().b6(0)
t.em()
y=new E.a0(new Float64Array(H.q(3)))
y.aI(d,e,0)
s=t.R(0,y)
s.gE(s)
s.gL(s)
return!1}],
b8:function(){if(!this.d)this.d=!0}},
fM:{
"^":"b;",
aB:function(a){var z=0,y=new P.az(),x,w=2,v,u=this,t,s,r,q
function $async$aB(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.aj(a)?3:4
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
return H.t(q.aC(a),$async$aB,y)
case 5:s.u(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$aB,y,null)}},
V:{
"^":"b;a,b,D:c<,W:d<",
n:function(a,b){if(b==null)return!1
return b instanceof F.V&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gt:function(a){return F.cw([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+this.a+", y:"+this.b+", w:"+H.a(this.c)+", h:"+H.a(this.d)}},
cY:{
"^":"b;a",
i:function(a){return C.v.h(0,this.a)}},
fP:{
"^":"b;a,b,c",
cY:function(a){if(this.a==null)this.a=F.aa(255,255,255,255)},
static:{al:function(a){var z=new F.fP(a,C.f,1)
z.cY(a)
return z}}},
cW:{
"^":"b;a",
n:function(a,b){if(b==null)return!1
return b instanceof F.cW&&b.a===this.a},
gt:function(a){return F.cw([this.a&0x1FFFFFFF])},
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
static:{aa:function(a,b,c,d){var z=new F.cW(0)
z.cX(a,b,c,d)
return z}}},
bI:{
"^":"b;"},
fO:{
"^":"cX;D:e<,W:f<,r,x,y,z,Q,ch,a,b,c,d",
ci:function(a,b){var z,y,x,w
z=this.e
y=(a.gD()-a.ger(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.P(new Float64Array(H.q(16)))
y.S()
this.c=y
y.cp(0,this.z,this.Q,0)
y=this.c
z=this.y
y.br(0,z,z,1)},
bf:function(a,b){var z,y,x
z=new F.V(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.c.ga3(x).R(0,y))
b.ae()
y=b.b
y.push(z)
b.ai(a,z)
this.cQ(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.ai(a,C.c.ga3(y))
else{y=a.a
b.ai(a,new F.V(0,0,y.c,y.d))}if(0>=x.length)return H.h(x,0)
x.pop()
b.ae()},
be:function(a,b){var z,y
z=new F.V(0,0,this.e,this.f)
y=F.al(null)
y.a=this.ch
b.ai(a,z)
b.al(a,z,y)}},
fQ:{
"^":"b;",
gK:function(){return this.c$},
sK:function(a){this.c$=a},
c6:function(a){if(!this.e$){this.c$.c4(this)
this.e$=!0}this.c$.co(this,a)
this.ep()},
Y:function(a){var z=this.f$
z.push(C.c.ga3(z).R(0,a))},
X:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cz:function(){return C.c.ga3(this.f$)}}}],["","",,G,{
"^":"",
bJ:function(a){var z=0,y=new P.az(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bJ(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.c(new p.dh(o.c(new n.A(0,m.k,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.ek(t,a)
q=J
s=q.i(t)
q=s
r=q.gbd(t)
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
m=m.x(new l.fV(u,t))
l=r
p=new p.w(0,o,n,m,l.c)
o=H
q=q.c(p,[o.r(r,0)])
q.w()
q=s
s=q.gbc(t)
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
m=m.x(new l.fW(a,u))
l=s
p=new p.w(0,o,n,m,l.c)
o=H
q=q.c(p,[o.r(s,0)])
q.w()
q=u
x=q.a
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$bJ,y,null)},
cZ:function(a,b,c){var z,y,x
z=G.d1(a,35633,b)
y=G.d1(a,35632,c)
x=J.e_(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
d1:function(a,b,c){var z,y
z=J.e0(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.a(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
d_:function(a,b){var z=J.bi(a)
a.bindBuffer(34962,z)
a.bufferData(34962,new Float32Array(H.ao(b)),35044)
a.bindBuffer(34962,null)
return z},
d0:function(a,b){var z=J.bi(a)
a.bindBuffer(34963,z)
a.bufferData(34963,new Uint16Array(H.ao(b)),35044)
a.bindBuffer(34963,null)
return z},
fU:{
"^":"bI;a,b",
gD:function(){return J.ed(this.a)},
gW:function(){return J.e4(this.a)},
cA:function(a){var z
if(this.b==null){z=J.i(a).dX(a)
this.b=z
a.bindTexture(3553,z)
C.x.ez(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
fS:{
"^":"b;a,b,c,j:d>",
cZ:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a5(b)
y=C.d.a5(a)
x=document.createElement("canvas",null)
J.el(x,z)
J.ej(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.eg(this.b,!0)},
static:{fT:function(a,b){var z=new G.fS(null,null,null,null)
z.cZ(a,b)
return z}}},
fR:{
"^":"fL;c,d,e,f,r,x,a,b",
eh:function(){var z,y
z=C.c.aA(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.c.aA(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cZ(this.c,z,y)
z=C.c.aA(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.c.aA(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cZ(this.c,z,y)},
O:function(a){this.r=1
J.c8(this.c,2960)
J.e1(this.c,515)
J.dW(this.c,0,0,0,1)
J.dX(this.c,1)
J.dY(this.c,0)
J.c8(this.c,3042)
switch(-1){case-1:J.dS(this.c,32774)
J.dT(this.c,770,771,770,32772)
break}J.dV(this.c,17664)},
bZ:function(){var z,y
this.x.S()
z=this.x.cp(0,-1,1,0)
this.x=z
y=this.d
y=z.br(0,2/y.c,-2/y.d,1)
this.x=y
y=y.R(0,C.c.ga3(this.a))
this.x=y
return y},
al:function(a,b,c){var z,y,x,w
z=b.a
y=b.b
x=z+b.c
w=y+b.d
this.b9(a,[z,y,0,z,w,0,x,y,0,x,w,0],[0,1,3,2],c.a,c.b,c.c)},
e6:function(a,b,c){var z,y,x,w,v,u,t,s
z=b.c/2
y=b.a+z
x=b.d/2
w=b.b+x
v=[]
u=[]
for(t=0;t<50;++t){u.push(t)
s=6.283185307179586*(t/50)
v.push(y+Math.cos(s)*z)
v.push(w+Math.sin(s)*x)
v.push(0)}this.b9(a,v,u,c.a,c.b,c.c)},
b9:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
J.bm(this.c,this.e)
z=G.d_(this.c,b)
J.av(this.c,34962,z)
y=G.d0(this.c,c)
J.av(this.c,34963,y)
x=this.c
w=this.e
v=this.bZ()
x.uniformMatrix4fv(J.ax(x,w,"u_mat"),!1,new Float32Array(H.ao(v.gp())))
v=this.c
w=this.e
x=d.a
v.uniform4fv(J.ax(v,w,"color"),new Float32Array(H.ao([(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255])))
x=this.c
x.uniform1f(J.ax(x,this.e,"u_point_size"),f)
u=J.bl(this.c,this.e,"vp")
J.bn(this.c,u,3,5126,!1,0,0)
J.bj(this.c,u)
if(e===C.f)t=6
else{J.eh(this.c,f)
t=2}J.c7(this.c,t,b.length/3|0,5123,0)
J.bm(this.c,null)},
ai:function(a,b){var z
J.c5(this.c,!1,!1,!1,!1)
J.c6(this.c,!1)
J.cb(this.c,7680,7681,7681)
J.ca(this.c,519,this.r,255)
z=F.al(null)
z.a=F.aa(255,255,255,255)
this.al(null,b,z)
J.c5(this.c,!0,!0,!0,!0)
J.c6(this.c,!0)
J.cb(this.c,7680,7680,7680)
J.ca(this.c,515,this.r,255);++this.r},
ae:function(){}},
fN:{
"^":"fM;k:b>,j:c>,a",
aC:function(a){var z=0,y=new P.az(),x,w=2,v,u,t
function $async$aC(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.t(t.bJ(a),$async$aC,y)
case 3:x=new u.fU(c,null)
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$aC,y,null)}},
fX:{
"^":"fh;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gD:function(){return this.a.c},
gW:function(){return this.a.d},
ger:function(a){return 0},
ep:function(){this.e=!0},
au:function(){var z=0,y=new P.az(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i
function $async$au(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:k=H
k=k
j=P
u=k.cI(new j.ch(Date.now(),!1))
k=v
t=k.a
k=E
k=k
j=Float64Array
i=H
s=new k.P(new j(i.q(16)))
k=s
k.S()
k=E
k=k
j=Float64Array
i=H
r=new k.P(new j(i.q(16)))
k=r
k.S()
k=G
q=new k.fR(null,null,null,null,1,s,[r],[])
k=q
j=t
k.c=j.a
k=q
k.d=t
k=q
k.eh()
k=q
k.O(0)
p=0,o=0
case 2:k=v
if(!k.b){z=4
break}k=P
k=k
j=P
z=5
return H.t(k.eK(new j.aB(3e4),null,null),$async$au,y)
case 5:n=Date.now()
m=n-u
t=u+m
k=v
k=k
j=C
j=j.d
k.c6(j.a5(t))
k=v
k=k
j=C
j=j.d
k.c6(j.a5(t))
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
k.bf(v,q)
k=v
k.e=!1
case 7:z=o>300?8:9
break
case 8:k=C
k=k.d
l="###fps  "+k.cT(p,o)
k=H
k.dI(l)
p=0
o=0
case 9:case 3:u=n
z=2
break
case 4:return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$au,y,null)},
eF:function(){var z,y,x,w
z=P.bw()
y=new G.h5(this,z)
x=new G.h4(this,z)
w=this.a.b
w.toString
w=H.c(new W.p(w,"touchcancel",!1),[null])
H.c(new W.w(0,w.a,w.b,W.x(x),w.c),[H.r(w,0)]).w()
w=this.a.b
w.toString
w=H.c(new W.p(w,"touchend",!1),[null])
H.c(new W.w(0,w.a,w.b,W.x(x),w.c),[H.r(w,0)]).w()
w=this.a.b
w.toString
w=H.c(new W.p(w,"touchenter",!1),[null])
H.c(new W.w(0,w.a,w.b,W.x(y),w.c),[H.r(w,0)]).w()
w=this.a.b
w.toString
w=H.c(new W.p(w,"touchleave",!1),[null])
H.c(new W.w(0,w.a,w.b,W.x(y),w.c),[H.r(w,0)]).w()
w=this.a.b
w.toString
w=H.c(new W.p(w,"touchmove",!1),[null])
H.c(new W.w(0,w.a,w.b,W.x(y),w.c),[H.r(w,0)]).w()
w=this.a.b
w.toString
w=H.c(new W.p(w,"touchstart",!1),[null])
H.c(new W.w(0,w.a,w.b,W.x(y),w.c),[H.r(w,0)]).w()},
eq:function(){var z,y
z={}
z.a=!1
y=J.e5(this.a.b)
H.c(new W.w(0,y.a,y.b,W.x(new G.fY(z,this)),y.c),[H.r(y,0)]).w()
y=J.eb(this.a.b)
H.c(new W.w(0,y.a,y.b,W.x(new G.fZ(z,this)),y.c),[H.r(y,0)]).w()
y=J.e6(this.a.b)
H.c(new W.w(0,y.a,y.b,W.x(new G.h_(z)),y.c),[H.r(y,0)]).w()
y=J.e7(this.a.b)
H.c(new W.w(0,y.a,y.b,W.x(new G.h0(z,this)),y.c),[H.r(y,0)]).w()
y=J.e8(this.a.b)
H.c(new W.w(0,y.a,y.b,W.x(new G.h1(z,this)),y.c),[H.r(y,0)]).w()
y=J.e9(this.a.b)
H.c(new W.w(0,y.a,y.b,W.x(new G.h2(z)),y.c),[H.r(y,0)]).w()
y=J.ea(this.a.b)
H.c(new W.w(0,y.a,y.b,W.x(new G.h3(z)),y.c),[H.r(y,0)]).w()}},
fh:{
"^":"b+fQ;"},
h5:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
for(z=J.c9(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.at)(z),++v){u=z[v]
t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
r=t-C.a.A(w.a.b.offsetLeft)
t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
q=s-C.a.A(w.a.b.offsetTop)
if(x.aj(u.identifier)){t=w.gK()
s=u.identifier
if(typeof s!=="number")return s.m()
w.Y(t.c)
t.a_(w,s+1,"pointermove",r,q)
w.X()}else{x.u(0,u.identifier,u)
t=w.gK()
s=u.identifier
if(typeof s!=="number")return s.m()
w.Y(t.c)
t.a_(w,s+1,"pointerdown",r,q)
w.X()}}}},
h4:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=J.c9(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.at)(z),++v){u=z[v]
if(x.aj(u.identifier)){t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
s=C.a.A(w.a.b.offsetLeft)
r=C.a.A(u.pageX)
q=C.a.A(u.pageY)
new P.H(r,q).$builtinTypeInfo=[null]
r=C.a.A(w.a.b.offsetTop)
x.ab(0,u.identifier)
p=w.gK()
o=u.identifier
if(typeof o!=="number")return o.m()
w.Y(p.c)
p.a_(w,o+1,"pointerup",t-s,q-r)
w.X()}}}},
fY:{
"^":"d:3;a,b",
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
z.Y(y.c)
y.a_(z,0,"pointerdown",w,x)
z.X()}},
fZ:{
"^":"d:3;a,b",
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
y.Y(x.c)
x.a_(y,0,"pointerup",v,w)
y.X()
z.a=!1}}},
h_:{
"^":"d:3;a",
$1:function(a){if(this.a.a);}},
h0:{
"^":"d:3;a,b",
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
y.Y(x.c)
x.a_(y,0,"pointercancel",v,w)
y.X()
z.a=!1}}},
h1:{
"^":"d:3;a,b",
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
z.Y(y.c)
y.a_(z,0,"pointermove",w,x)
z.X()}}},
h2:{
"^":"d:3;a",
$1:function(a){if(this.a.a);}},
h3:{
"^":"d:3;a",
$1:function(a){P.be("over offset="+H.a(a.gf_())+":"+H.a(a.gf0())+"  client="+H.a(a.geY())+":"+H.a(a.geZ())+" screen="+H.a(a.geM(a))+":"+H.a(a.geN(a)))
if(this.a.a);}},
fV:{
"^":"d:2;a,b",
$1:function(a){this.a.b7(0,this.b)}},
fW:{
"^":"d:2;a,b",
$1:function(a){this.b.dQ("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
P:{
"^":"b;p:a<",
af:function(a){var z,y
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
i:function(a){return"[0] "+this.at(0).i(0)+"\n[1] "+this.at(1).i(0)+"\n[2] "+this.at(2).i(0)+"\n[3] "+this.at(3).i(0)+"\n"},
ge4:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
at:function(a){var z,y,x
z=new Float64Array(H.q(4))
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
return new E.a1(z)},
b6:function(a){var z=new E.P(new Float64Array(H.q(16)))
z.af(this)
return z},
R:function(a,b){var z,y,x
if(!!b.$isa1){z=new Float64Array(H.q(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a1(z)}if(!!b.$isa0){z=new Float64Array(H.q(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.a0(z)}if(4===b.ge4()){z=new Float64Array(H.q(16))
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
return new E.P(z)}throw H.e(P.aO(b))},
m:function(a,b){var z,y
z=new Float64Array(H.q(16))
y=this.a
z[0]=C.a.m(y[0],b.gp().h(0,0))
z[1]=C.a.m(y[1],b.gp().h(0,1))
z[2]=C.a.m(y[2],b.gp().h(0,2))
z[3]=C.a.m(y[3],b.gp().h(0,3))
z[4]=C.a.m(y[4],b.gp().h(0,4))
z[5]=C.a.m(y[5],b.gp().h(0,5))
z[6]=C.a.m(y[6],b.gp().h(0,6))
z[7]=C.a.m(y[7],b.gp().h(0,7))
z[8]=C.a.m(y[8],b.gp().h(0,8))
z[9]=C.a.m(y[9],b.gp().h(0,9))
z[10]=C.a.m(y[10],b.gp().h(0,10))
z[11]=C.a.m(y[11],b.gp().h(0,11))
z[12]=C.a.m(y[12],b.gp().h(0,12))
z[13]=C.a.m(y[13],b.gp().h(0,13))
z[14]=C.a.m(y[14],b.gp().h(0,14))
z[15]=C.a.m(y[15],b.gp().h(0,15))
return new E.P(z)},
cp:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isa1
x=y?b.gD():1
if(!!z.$isa0||y){w=z.gE(b)
v=z.gL(b)
u=z.geK(b)}else{u=d
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
br:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isa1
x=y?b.gD():1
if(!!z.$isa0||y){w=z.gE(b)
v=z.gL(b)
u=z.geK(b)}else{u=d
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
S:function(){var z=this.a
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
em:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
a0:{
"^":"b;p:a<",
aI:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
af:function(a){var z,y
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
y=C.a.m(z[0],b.gp().h(0,0))
x=C.a.m(z[1],b.gp().h(0,1))
z=C.a.m(z[2],b.gp().h(0,2))
w=new E.a0(new Float64Array(H.q(3)))
w.aI(y,x,z)
return w},
R:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.F(b)
x=z[1]
z=z[2]
w=new E.a0(new Float64Array(H.q(3)))
w.aI(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gl:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.b6(y*y+x*x+z*z))},
b6:function(a){var z=new E.a0(new Float64Array(H.q(3)))
z.af(this)
return z},
gE:function(a){return this.a[0]},
gL:function(a){return this.a[1]}},
a1:{
"^":"b;p:a<",
bt:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
af:function(a){var z,y
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
y=C.a.m(z[0],b.gp().h(0,0))
x=C.a.m(z[1],b.gp().h(0,1))
w=C.a.m(z[2],b.gp().h(0,2))
z=C.a.m(z[3],b.gp().h(0,3))
v=new E.a1(new Float64Array(H.q(4)))
v.bt(y,x,w,z)
return v},
R:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.F(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a1(new Float64Array(H.q(4)))
v.bt(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gl:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.b6(y*y+x*x+w*w+z*z))},
b6:function(a){var z=new E.a1(new Float64Array(H.q(4)))
z.af(this)
return z},
gE:function(a){return this.a[0]},
gL:function(a){return this.a[1]},
gD:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cu.prototype
return J.f4.prototype}if(typeof a=="string")return J.aT.prototype
if(a==null)return J.f5.prototype
if(typeof a=="boolean")return J.f3.prototype
if(a.constructor==Array)return J.aD.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.ba(a)}
J.N=function(a){if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(a.constructor==Array)return J.aD.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.ba(a)}
J.aL=function(a){if(a==null)return a
if(a.constructor==Array)return J.aD.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.ba(a)}
J.bY=function(a){if(typeof a=="number")return J.aE.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bM.prototype
return a}
J.il=function(a){if(typeof a=="number")return J.aE.prototype
if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bM.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.ba(a)}
J.au=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.il(a).m(a,b)}
J.a4=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).n(a,b)}
J.dO=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bY(a).aG(a,b)}
J.c4=function(a,b){if(a.constructor==Array||typeof a=="string"||H.iA(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.N(a).h(a,b)}
J.dP=function(a,b,c,d){return J.i(a).d2(a,b,c,d)}
J.dQ=function(a,b,c,d){return J.i(a).dt(a,b,c,d)}
J.av=function(a,b,c){return J.i(a).dB(a,b,c)}
J.dR=function(a,b,c){return J.i(a).dC(a,b,c)}
J.dS=function(a,b){return J.i(a).dE(a,b)}
J.dT=function(a,b,c,d,e){return J.i(a).dF(a,b,c,d,e)}
J.dU=function(a,b,c,d){return J.i(a).dG(a,b,c,d)}
J.dV=function(a,b){return J.aL(a).dK(a,b)}
J.dW=function(a,b,c,d,e){return J.i(a).dL(a,b,c,d,e)}
J.dX=function(a,b){return J.i(a).dM(a,b)}
J.dY=function(a,b){return J.i(a).dN(a,b)}
J.c5=function(a,b,c,d,e){return J.i(a).dP(a,b,c,d,e)}
J.dZ=function(a,b){return J.i(a).b7(a,b)}
J.bh=function(a,b,c){return J.N(a).dS(a,b,c)}
J.bi=function(a){return J.i(a).dU(a)}
J.e_=function(a){return J.i(a).dV(a)}
J.e0=function(a,b){return J.i(a).dW(a,b)}
J.e1=function(a,b){return J.i(a).dY(a,b)}
J.c6=function(a,b){return J.i(a).dZ(a,b)}
J.c7=function(a,b,c,d,e){return J.i(a).e5(a,b,c,d,e)}
J.e2=function(a,b){return J.aL(a).V(a,b)}
J.c8=function(a,b){return J.i(a).e7(a,b)}
J.bj=function(a,b){return J.i(a).e8(a,b)}
J.e3=function(a,b){return J.aL(a).C(a,b)}
J.c9=function(a){return J.i(a).gdI(a)}
J.R=function(a){return J.i(a).gam(a)}
J.D=function(a){return J.l(a).gt(a)}
J.e4=function(a){return J.i(a).gj(a)}
J.bk=function(a){return J.aL(a).gB(a)}
J.aw=function(a){return J.N(a).gl(a)}
J.e5=function(a){return J.i(a).gca(a)}
J.e6=function(a){return J.i(a).gcb(a)}
J.e7=function(a){return J.i(a).gcc(a)}
J.e8=function(a){return J.i(a).gcd(a)}
J.e9=function(a){return J.i(a).gce(a)}
J.ea=function(a){return J.i(a).gcf(a)}
J.eb=function(a){return J.i(a).gcg(a)}
J.ec=function(a){return J.i(a).gbn(a)}
J.ed=function(a){return J.i(a).gk(a)}
J.ee=function(a){return J.i(a).gE(a)}
J.bl=function(a,b,c){return J.i(a).ct(a,b,c)}
J.ef=function(a){return J.i(a).cu(a)}
J.eg=function(a,b){return J.i(a).cv(a,b)}
J.ax=function(a,b,c){return J.i(a).cB(a,b,c)}
J.eh=function(a,b){return J.i(a).c7(a,b)}
J.ei=function(a,b){return J.aL(a).aa(a,b)}
J.ej=function(a,b){return J.i(a).sj(a,b)}
J.ek=function(a,b){return J.i(a).sT(a,b)}
J.el=function(a,b){return J.i(a).sk(a,b)}
J.ca=function(a,b,c,d){return J.i(a).cL(a,b,c,d)}
J.cb=function(a,b,c,d){return J.i(a).cM(a,b,c,d)}
J.aN=function(a,b,c,d){return J.i(a).eB(a,b,c,d)}
J.ah=function(a){return J.bY(a).eD(a)}
J.cc=function(a){return J.bY(a).a5(a)}
J.ay=function(a){return J.l(a).i(a)}
J.em=function(a,b,c,d,e,f){return J.i(a).eG(a,b,c,d,e,f)}
J.en=function(a,b,c,d){return J.i(a).eH(a,b,c,d)}
J.bm=function(a,b){return J.i(a).eI(a,b)}
J.bn=function(a,b,c,d,e,f,g){return J.i(a).eJ(a,b,c,d,e,f,g)}
var $=I.p
C.c=J.aD.prototype
C.d=J.cu.prototype
C.a=J.aE.prototype
C.e=J.aT.prototype
C.w=J.fi.prototype
C.x=P.fq.prototype
C.y=J.bM.prototype
C.l=new H.cn()
C.m=new P.hk()
C.b=new P.hR()
C.h=new P.aB(0)
C.n=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.o=function(hooks) {
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

C.p=function(getTagFallback) {
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
C.r=function(hooks) {
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
C.q=function() {
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
C.t=function(hooks) {
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
C.u=function(_, letter) { return letter.toUpperCase(); }
C.v=new H.eM([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.f=new F.cY(0)
C.k=new F.cY(1)
$.cJ="$cachedFunction"
$.cK="$cachedInvocation"
$.O=0
$.ai=null
$.cd=null
$.c_=null
$.dx=null
$.dJ=null
$.b8=null
$.bb=null
$.c0=null
$.ac=null
$.ap=null
$.aq=null
$.bU=!1
$.k=C.b
$.cp=0
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
I.$lazy(y,x,w)}})(["cs","$get$cs",function(){return H.eZ()},"ct","$get$ct",function(){return new P.eH(null)},"d2","$get$d2",function(){return H.Q(H.b2({toString:function(){return"$receiver$"}}))},"d3","$get$d3",function(){return H.Q(H.b2({$method$:null,toString:function(){return"$receiver$"}}))},"d4","$get$d4",function(){return H.Q(H.b2(null))},"d5","$get$d5",function(){return H.Q(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d9","$get$d9",function(){return H.Q(H.b2(void 0))},"da","$get$da",function(){return H.Q(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d7","$get$d7",function(){return H.Q(H.d8(null))},"d6","$get$d6",function(){return H.Q(function(){try{null.$method$}catch(z){return z.message}}())},"dc","$get$dc",function(){return H.Q(H.d8(void 0))},"db","$get$db",function(){return H.Q(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bO","$get$bO",function(){return P.h8()},"ar","$get$ar",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bB]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.Z]},{func:1,args:[,],opt:[,]},{func:1,ret:P.U,args:[P.n]},{func:1,args:[W.bL]},{func:1,args:[,P.U]},{func:1,args:[P.U]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.Z]},{func:1,ret:P.bW},{func:1,void:true,args:[P.b],opt:[P.Z]},{func:1,void:true,args:[,P.Z]},{func:1,args:[,,]},{func:1,args:[P.cS,,]},{func:1,args:[P.U,,]},{func:1,args:[F.bI]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iH(d||a)
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
Isolate.b9=a.b9
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dL(F.dG(),b)},[])
else (function(b){H.dL(F.dG(),b)})([])})})()