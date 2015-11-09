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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b9=function(){}
var dart=[["","",,H,{
"^":"",
jd:{
"^":"a;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bd:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ba:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bW==null){H.ik()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.bF("Return interceptor for "+H.b(y(a,z))))}w=H.iu(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.v
else return C.x}return w},
f:{
"^":"a;",
l:function(a,b){return a===b},
gt:function(a){return H.X(a)},
i:["cI",function(a){return H.aY(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLUniformLocation"},
eR:{
"^":"f;",
i:function(a){return String(a)},
gt:function(a){return a?519018:218159},
$isbS:1},
eT:{
"^":"f;",
l:function(a,b){return null==b},
i:function(a){return"null"},
gt:function(a){return 0}},
cm:{
"^":"f;",
gt:function(a){return 0},
$iseU:1},
fa:{
"^":"cm;"},
bG:{
"^":"cm;",
i:function(a){return String(a)}},
aB:{
"^":"f;",
bV:function(a,b){if(!!a.immutable$list)throw H.e(new P.L(b))},
dC:function(a,b){if(!!a.fixed$length)throw H.e(new P.L(b))},
C:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.F(a))}},
a6:function(a,b){return H.d(new H.bt(a,b),[null,null])},
aw:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
S:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
ge_:function(a){if(a.length>0)return a[0]
throw H.e(H.bo())},
ga5:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bo())},
bn:function(a,b,c,d,e){var z,y,x
this.bV(a,"set range")
P.cD(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.e(H.eO())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aP(a,"[","]")},
gB:function(a){return new J.e9(a,a.length,0,null)},
gt:function(a){return H.X(a)},
gj:function(a){return a.length},
sj:function(a,b){this.dC(a,"set length")
if(b<0)throw H.e(P.aZ(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.u(a,b))
if(b>=a.length||b<0)throw H.e(H.u(a,b))
return a[b]},
p:function(a,b,c){this.bV(a,"indexed set")
if(b>=a.length||!1)throw H.e(H.u(a,b))
a[b]=c},
$isaQ:1,
$isj:1,
$asj:null,
$iso:1,
static:{eQ:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.e(P.aw("Length must be a non-negative integer: "+H.b(a)))
z=H.d(new Array(a),[b])
z.fixed$length=Array
return z}}},
jc:{
"^":"aB;"},
e9:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.F(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aC:{
"^":"f;",
bc:function(a,b){return a%b},
a0:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.L(""+a))},
w:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.L(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.e(H.ad(b))
return a+b},
cM:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a0(a/b)},
ac:function(a,b){return(a|0)===a?a/b|0:this.a0(a/b)},
bQ:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aC:function(a,b){if(typeof b!=="number")throw H.e(H.ad(b))
return a<b},
$isaL:1},
cl:{
"^":"aC;",
$isaL:1,
$ism:1},
eS:{
"^":"aC;",
$isaL:1},
aR:{
"^":"f;",
dH:function(a,b){if(b>=a.length)throw H.e(H.u(a,b))
return a.charCodeAt(b)},
k:function(a,b){if(typeof b!=="string")throw H.e(P.e8(b,null,null))
return a+b},
cH:function(a,b,c){H.di(b)
if(c==null)c=a.length
H.di(c)
if(b<0)throw H.e(P.b_(b,null,null))
if(typeof c!=="number")return H.O(c)
if(b>c)throw H.e(P.b_(b,null,null))
if(c>a.length)throw H.e(P.b_(c,null,null))
return a.substring(b,c)},
cG:function(a,b){return this.cH(a,b,null)},
gH:function(a){return a.length===0},
i:function(a){return a},
gt:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.u(a,b))
if(b>=a.length||b<0)throw H.e(H.u(a,b))
return a[b]},
$isaQ:1,
$isU:1}}],["","",,H,{
"^":"",
aI:function(a,b){var z=a.ag(b)
if(!init.globalState.d.cy)init.globalState.f.ak()
return z},
bc:function(){--init.globalState.f.b},
dx:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.e(P.aw("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hy(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cj()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hb(P.br(null,H.aH),0)
y.z=P.aT(null,null,null,P.m,H.bN)
y.ch=P.aT(null,null,null,P.m,null)
if(y.x===!0){x=new H.hx()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eH,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hz)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aT(null,null,null,P.m,H.b0)
w=P.aj(null,null,null,P.m)
v=new H.b0(0,null,!1)
u=new H.bN(y,x,w,init.createNewIsolate(),v,new H.a6(H.be()),new H.a6(H.be()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
w.a4(0,0)
u.bq(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aK()
x=H.ae(y,[y]).X(a)
if(x)u.ag(new H.ix(z,a))
else{y=H.ae(y,[y,y]).X(a)
if(y)u.ag(new H.iy(z,a))
else u.ag(a)}init.globalState.f.ak()},
eL:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eM()
return},
eM:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.L("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.L("Cannot extract URI from \""+H.b(z)+"\""))},
eH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b3(!0,[]).Y(b.data)
y=J.N(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b3(!0,[]).Y(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b3(!0,[]).Y(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aT(null,null,null,P.m,H.b0)
p=P.aj(null,null,null,P.m)
o=new H.b0(0,null,!1)
n=new H.bN(y,q,p,init.createNewIsolate(),o,new H.a6(H.be()),new H.a6(H.be()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
p.a4(0,0)
n.bq(0,o)
init.globalState.f.a.R(new H.aH(n,new H.eI(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ak()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.ag(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.ak()
break
case"close":init.globalState.ch.a7(0,$.$get$ck().h(0,a))
a.terminate()
init.globalState.f.ak()
break
case"log":H.eG(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a8(["command","print","msg",z])
q=new H.a9(!0,P.a7(null,P.m)).F(q)
y.toString
self.postMessage(q)}else P.af(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
eG:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a8(["command","log","msg",a])
x=new H.a9(!0,P.a7(null,P.m)).F(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.y(w)
throw H.e(P.aO(z))}},
eJ:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cz=$.cz+("_"+y)
$.cA=$.cA+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.ag(f,["spawned",new H.b5(y,x),w,z.r])
x=new H.eK(a,b,c,d,z)
if(e===!0){z.bT(w,w)
init.globalState.f.a.R(new H.aH(z,x,"start isolate"))}else x.$0()},
hS:function(a){return new H.b3(!0,[]).Y(new H.a9(!1,P.a7(null,P.m)).F(a))},
ix:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iy:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hy:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hz:function(a){var z=P.a8(["command","print","msg",a])
return new H.a9(!0,P.a7(null,P.m)).F(z)}}},
bN:{
"^":"a;a,b,c,ee:d<,dK:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bT:function(a,b){if(!this.f.l(0,a))return
if(this.Q.a4(0,b)&&!this.y)this.y=!0
this.aZ()},
el:function(a){var z,y,x,w,v,u
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
if(w===y.c)y.bz();++y.d}this.y=!1}this.aZ()},
dt:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ek:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.A(new P.L("removeRange"))
P.cD(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cC:function(a,b){if(!this.r.l(0,a))return
this.db=b},
e3:function(a,b,c){var z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){J.ag(a,c)
return}z=this.cx
if(z==null){z=P.br(null,null)
this.cx=z}z.R(new H.hs(a,c))},
e1:function(a,b){var z
if(!this.r.l(0,a))return
z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){this.b7()
return}z=this.cx
if(z==null){z=P.br(null,null)
this.cx=z}z.R(this.gef())},
e4:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.af(a)
if(b!=null)P.af(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.av(a)
y[1]=b==null?null:J.av(b)
for(x=new P.cn(z,z.r,null,null),x.c=z.e;x.n();)J.ag(x.d,y)},
ag:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.y(u)
this.e4(w,v)
if(this.db===!0){this.b7()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gee()
if(this.cx!=null)for(;t=this.cx,!t.gH(t);)this.cx.cd().$0()}return y},
c3:function(a){return this.b.h(0,a)},
bq:function(a,b){var z=this.b
if(z.au(a))throw H.e(P.aO("Registry: ports must be registered only once."))
z.p(0,a,b)},
aZ:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.b7()},
b7:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.N(0)
for(z=this.b,y=z.gcl(z),y=y.gB(y);y.n();)y.gq().d_()
z.N(0)
this.c.N(0)
init.globalState.z.a7(0,this.a)
this.dx.N(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
J.ag(w,z[v])}this.ch=null}},"$0","gef",0,0,1]},
hs:{
"^":"c:1;a,b",
$0:function(){J.ag(this.a,this.b)}},
hb:{
"^":"a;a,b",
dR:function(){var z=this.a
if(z.b===z.c)return
return z.cd()},
ci:function(){var z,y,x
z=this.dR()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.au(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gH(y)}else y=!1
else y=!1
else y=!1
if(y)H.A(P.aO("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gH(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a8(["command","close"])
x=new H.a9(!0,P.a7(null,P.m)).F(x)
y.toString
self.postMessage(x)}return!1}z.ej()
return!0},
bK:function(){if(self.window!=null)new H.hc(this).$0()
else for(;this.ci(););},
ak:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bK()
else try{this.bK()}catch(x){w=H.B(x)
z=w
y=H.y(x)
w=init.globalState.Q
v=P.a8(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.a9(!0,P.a7(null,P.m)).F(v)
w.toString
self.postMessage(v)}}},
hc:{
"^":"c:1;a",
$0:function(){if(!this.a.ci())return
P.cL(C.h,this)}},
aH:{
"^":"a;a,b,c",
ej:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ag(this.b)}},
hx:{
"^":"a;"},
eI:{
"^":"c:0;a,b,c,d,e,f",
$0:function(){H.eJ(this.a,this.b,this.c,this.d,this.e,this.f)}},
eK:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aK()
w=H.ae(x,[x,x]).X(y)
if(w)y.$2(this.b,this.c)
else{x=H.ae(x,[x]).X(y)
if(x)y.$1(this.b)
else y.$0()}}z.aZ()}},
d1:{
"^":"a;"},
b5:{
"^":"d1;b,a",
aE:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbC())return
x=H.hS(b)
if(z.gdK()===y){y=J.N(x)
switch(y.h(x,0)){case"pause":z.bT(y.h(x,1),y.h(x,2))
break
case"resume":z.el(y.h(x,1))
break
case"add-ondone":z.dt(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.ek(y.h(x,1))
break
case"set-errors-fatal":z.cC(y.h(x,1),y.h(x,2))
break
case"ping":z.e3(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.e1(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a4(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a7(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(b)
y.a.R(new H.aH(z,new H.hB(this,x),w))},
l:function(a,b){if(b==null)return!1
return b instanceof H.b5&&J.a4(this.b,b.b)},
gt:function(a){return this.b.gaU()}},
hB:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbC())z.cW(this.b)}},
bP:{
"^":"d1;b,c,a",
aE:function(a,b){var z,y,x
z=P.a8(["command","message","port",this,"msg",b])
y=new H.a9(!0,P.a7(null,P.m)).F(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
l:function(a,b){if(b==null)return!1
return b instanceof H.bP&&J.a4(this.b,b.b)&&J.a4(this.a,b.a)&&J.a4(this.c,b.c)},
gt:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cD()
y=this.a
if(typeof y!=="number")return y.cD()
x=this.c
if(typeof x!=="number")return H.O(x)
return(z<<16^y<<8^x)>>>0}},
b0:{
"^":"a;aU:a<,b,bC:c<",
d_:function(){this.c=!0
this.b=null},
cW:function(a){if(this.c)return
this.da(a)},
da:function(a){return this.b.$1(a)},
$isfb:1},
fv:{
"^":"a;a,b,c",
cQ:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.R(new H.aH(y,new H.fx(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a3(new H.fy(this,b),0),a)}else throw H.e(new P.L("Timer greater than 0."))},
static:{fw:function(a,b){var z=new H.fv(!0,!1,null)
z.cQ(a,b)
return z}}},
fx:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fy:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
H.bc()
this.b.$0()}},
a6:{
"^":"a;aU:a<",
gt:function(a){var z=this.a
if(typeof z!=="number")return z.ez()
z=C.a.bQ(z,0)^C.a.ac(z,4294967296)
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
F:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.p(0,a,z.gj(z))
z=J.l(a)
if(!!z.$iscr)return["buffer",a]
if(!!z.$isbx)return["typed",a]
if(!!z.$isaQ)return this.cw(a)
if(!!z.$iseF){x=this.gct()
w=a.gc_()
w=H.aW(w,x,H.I(w,"K",0),null)
w=P.bs(w,!0,H.I(w,"K",0))
z=z.gcl(a)
z=H.aW(z,x,H.I(z,"K",0),null)
return["map",w,P.bs(z,!0,H.I(z,"K",0))]}if(!!z.$iseU)return this.cz(a)
if(!!z.$isf)this.ck(a)
if(!!z.$isfb)this.al(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb5)return this.cA(a)
if(!!z.$isbP)return this.cB(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.al(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa6)return["capability",a.a]
if(!(a instanceof P.a))this.ck(a)
return["dart",init.classIdExtractor(a),this.cv(init.classFieldsExtractor(a))]},"$1","gct",2,0,2],
al:function(a,b){throw H.e(new P.L(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
ck:function(a){return this.al(a,null)},
cw:function(a){var z=this.cu(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.al(a,"Can't serialize indexable: ")},
cu:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.F(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cv:function(a){var z
for(z=0;z<a.length;++z)C.c.p(a,z,this.F(a[z]))
return a},
cz:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.al(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.F(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cB:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cA:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaU()]
return["raw sendport",a]}},
b3:{
"^":"a;a,b",
Y:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aw("Bad serialized message: "+H.b(a)))
switch(C.c.ge_(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=this.ae(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ae(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ae(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ae(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.dU(a)
case"sendport":return this.dV(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dT(a)
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
this.ae(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","gdS",2,0,2],
ae:function(a){var z,y,x
z=J.N(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.O(x)
if(!(y<x))break
z.p(a,y,this.Y(z.h(a,y)));++y}return a},
dU:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aU()
this.b.push(w)
y=J.e4(y,this.gdS()).bf(0)
for(z=J.N(y),v=J.N(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.p(0,y[u],this.Y(v.h(x,u)))}return w},
dV:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.a4(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c3(w)
if(u==null)return
t=new H.b5(u,x)}else t=new H.bP(y,w,x)
this.b.push(t)
return t},
dT:function(a){var z,y,x,w,v,u,t
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
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.O(t)
if(!(u<t))break
w[z.h(y,u)]=this.Y(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
ei:function(){throw H.e(new P.L("Cannot modify unmodifiable Map"))},
ie:function(a){return init.types[a]},
it:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaS},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.av(a)
if(typeof z!=="string")throw H.e(H.ad(a))
return z},
X:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cB:function(a){var z,y
z=C.j(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.f.dH(z,0)===36)z=C.f.cG(z,1)
return(z+H.dq(H.bU(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aY:function(a){return"Instance of '"+H.cB(a)+"'"},
E:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cy:function(a){return a.b?H.E(a).getUTCMilliseconds()+0:H.E(a).getMilliseconds()+0},
aX:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ad(a))
return a[b]},
by:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ad(a))
a[b]=c},
O:function(a){throw H.e(H.ad(a))},
h:function(a,b){if(a==null)J.au(a)
throw H.e(H.u(a,b))},
u:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a5(!0,b,"index",null)
z=J.au(a)
if(!(b<0)){if(typeof z!=="number")return H.O(z)
y=b>=z}else y=!0
if(y)return P.bn(b,a,"index",null,z)
return P.b_(b,"index",null)},
ad:function(a){return new P.a5(!0,a,null,null)},
dj:function(a){return a},
di:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.ad(a))
return a},
e:function(a){var z
if(a==null)a=new P.cx()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dz})
z.name=""}else z.toString=H.dz
return z},
dz:function(){return J.av(this.dartException)},
A:function(a){throw H.e(a)},
as:function(a){throw H.e(new P.F(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iA(a)
if(a==null)return
if(a instanceof H.bm)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bQ(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bp(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cw(v,null))}}if(a instanceof TypeError){u=$.$get$cP()
t=$.$get$cQ()
s=$.$get$cR()
r=$.$get$cS()
q=$.$get$cW()
p=$.$get$cX()
o=$.$get$cU()
$.$get$cT()
n=$.$get$cZ()
m=$.$get$cY()
l=u.J(y)
if(l!=null)return z.$1(H.bp(y,l))
else{l=t.J(y)
if(l!=null){l.method="call"
return z.$1(H.bp(y,l))}else{l=s.J(y)
if(l==null){l=r.J(y)
if(l==null){l=q.J(y)
if(l==null){l=p.J(y)
if(l==null){l=o.J(y)
if(l==null){l=r.J(y)
if(l==null){l=n.J(y)
if(l==null){l=m.J(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cw(y,l==null?null:l.method))}}return z.$1(new H.fX(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cG()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a5(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cG()
return a},
y:function(a){var z
if(a instanceof H.bm)return a.b
if(a==null)return new H.d6(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d6(a,null)},
iw:function(a){if(a==null||typeof a!='object')return J.C(a)
else return H.X(a)},
dl:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
im:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.l(c,0))return H.aI(b,new H.io(a))
else if(z.l(c,1))return H.aI(b,new H.ip(a,d))
else if(z.l(c,2))return H.aI(b,new H.iq(a,d,e))
else if(z.l(c,3))return H.aI(b,new H.ir(a,d,e,f))
else if(z.l(c,4))return H.aI(b,new H.is(a,d,e,f,g))
else throw H.e(P.aO("Unsupported number of arguments for wrapped closure"))},
a3:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.im)
a.$identity=z
return z},
eg:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.fe(z).r}else x=c
w=d?Object.create(new H.fj().constructor.prototype):Object.create(new H.bi(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.P
$.P=J.at(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cd(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ie(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cc:H.bj
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cd(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ed:function(a,b,c,d){var z=H.bj
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cd:function(a,b,c){var z,y,x,w,v,u
if(c)return H.ef(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ed(y,!w,z,b)
if(y===0){w=$.ah
if(w==null){w=H.aM("self")
$.ah=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.P
$.P=J.at(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ah
if(v==null){v=H.aM("self")
$.ah=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.P
$.P=J.at(w,1)
return new Function(v+H.b(w)+"}")()},
ee:function(a,b,c,d){var z,y
z=H.bj
y=H.cc
switch(b?-1:a){case 0:throw H.e(new H.ff("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ef:function(a,b){var z,y,x,w,v,u,t,s
z=H.ec()
y=$.cb
if(y==null){y=H.aM("receiver")
$.cb=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ee(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.P
$.P=J.at(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.P
$.P=J.at(u,1)
return new Function(y+H.b(u)+"}")()},
bT:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eg(a,b,z,!!d,e,f)},
iz:function(a){throw H.e(new P.ek("Cyclic initialization for static "+H.b(a)))},
ae:function(a,b,c){return new H.fg(a,b,c,null)},
aK:function(){return C.k},
be:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
p:function(a,b,c){var z
if(b===0){J.dJ(c,a)
return}else if(b===1){c.bW(H.B(a),H.y(a))
return}if(!!J.l(a).$isM)z=a
else{z=H.d(new P.w(0,$.k,null),[null])
z.aL(a)}z.aA(H.de(b,0),new H.i2(b))
return c.ge0()},
de:function(a,b){return new H.i_(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
d:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bU:function(a){if(a==null)return
return a.$builtinTypeInfo},
dn:function(a,b){return H.dy(a["$as"+H.b(b)],H.bU(a))},
I:function(a,b,c){var z=H.dn(a,b)
return z==null?null:z[c]},
t:function(a,b){var z=H.bU(a)
return z==null?null:z[b]},
bZ:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dq(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dq:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bz("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.bZ(u,c))}return w?"":"<"+H.b(z)+">"},
dy:function(a,b){if(typeof a=="function"){a=H.bX(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bX(a,null,b)}return b},
i1:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.J(a[y],b[y]))return!1
return!0},
b7:function(a,b,c){return H.bX(a,b,H.dn(b,c))},
J:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dp(a,b)
if('func' in a)return b.builtin$cls==="eu"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bZ(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.bZ(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.i1(H.dy(v,z),x)},
dg:function(a,b,c){var z,y,x,w,v
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
i0:function(a,b){var z,y,x,w,v,u
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
dp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.dg(x,w,!1))return!1
if(!H.dg(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}}return H.i0(a.named,b.named)},
bX:function(a,b,c){return a.apply(b,c)},
jY:function(a){var z=$.bV
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jX:function(a){return H.X(a)},
jW:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iu:function(a){var z,y,x,w,v,u
z=$.bV.$1(a)
y=$.b8[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bb[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.df.$2(a,z)
if(z!=null){y=$.b8[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bb[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bY(x)
$.b8[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bb[z]=x
return x}if(v==="-"){u=H.bY(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dt(a,x)
if(v==="*")throw H.e(new P.bF(z))
if(init.leafTags[z]===true){u=H.bY(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dt(a,x)},
dt:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bd(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bY:function(a){return J.bd(a,!1,null,!!a.$isaS)},
iv:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bd(z,!1,null,!!z.$isaS)
else return J.bd(z,c,null,null)},
ik:function(){if(!0===$.bW)return
$.bW=!0
H.il()},
il:function(){var z,y,x,w,v,u,t,s
$.b8=Object.create(null)
$.bb=Object.create(null)
H.ig()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dv.$1(v)
if(u!=null){t=H.iv(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ig:function(){var z,y,x,w,v,u,t
z=C.n()
z=H.ac(C.o,H.ac(C.p,H.ac(C.i,H.ac(C.i,H.ac(C.r,H.ac(C.q,H.ac(C.t(C.j),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bV=new H.ih(v)
$.df=new H.ii(u)
$.dv=new H.ij(t)},
ac:function(a,b){return a(b)||b},
eh:{
"^":"a;",
i:function(a){return P.cq(this)},
p:function(a,b,c){return H.ei()}},
ex:{
"^":"eh;a",
aT:function(){var z=this.$map
if(z==null){z=new H.aD(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dl(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aT().h(0,b)},
C:function(a,b){this.aT().C(0,b)},
gj:function(a){var z=this.aT()
return z.gj(z)}},
fd:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fe:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fd(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fW:{
"^":"a;a,b,c,d,e,f",
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
static:{R:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fW(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b2:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},cV:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cw:{
"^":"z;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
eW:{
"^":"z;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bp:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.eW(a,y,z?null:b.receiver)}}},
fX:{
"^":"z;a",
i:function(a){var z=this.a
return C.f.gH(z)?"Error":"Error: "+z}},
iA:{
"^":"c:2;a",
$1:function(a){if(!!J.l(a).$isz)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
d6:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
io:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
ip:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
iq:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ir:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
is:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"a;",
i:function(a){return"Closure '"+H.cB(this)+"'"},
gcm:function(){return this},
gcm:function(){return this}},
cJ:{
"^":"c;"},
fj:{
"^":"cJ;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bi:{
"^":"cJ;a,b,c,d",
l:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bi))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gt:function(a){var z,y
z=this.c
if(z==null)y=H.X(this.a)
else y=typeof z!=="object"?J.C(z):H.X(z)
z=H.X(this.b)
if(typeof y!=="number")return y.eA()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aY(z)},
static:{bj:function(a){return a.a},cc:function(a){return a.c},ec:function(){var z=$.ah
if(z==null){z=H.aM("self")
$.ah=z}return z},aM:function(a){var z,y,x,w,v
z=new H.bi("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
ff:{
"^":"z;a",
i:function(a){return"RuntimeError: "+this.a}},
cF:{
"^":"a;"},
fg:{
"^":"cF;a,b,c,d",
X:function(a){var z=this.d6(a)
return z==null?!1:H.dp(z,this.a8())},
d6:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
a8:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isjG)z.void=true
else if(!x.$iscf)z.ret=y.a8()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cE(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cE(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dk(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a8()}z.named=w}return z},
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
t=H.dk(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].a8())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cE:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a8())
return z}}},
cf:{
"^":"cF;",
i:function(a){return"dynamic"},
a8:function(){return}},
bm:{
"^":"a;a,L:b<"},
i2:{
"^":"c:5;a",
$2:function(a,b){H.de(this.a,1).$1(new H.bm(a,b))}},
i_:{
"^":"c:2;a,b",
$1:function(a){this.b(this.a,a)}},
aD:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gH:function(a){return this.a===0},
gc_:function(){return H.d(new H.f0(this),[H.t(this,0)])},
gcl:function(a){return H.aW(this.gc_(),new H.eV(this),H.t(this,0),H.t(this,1))},
au:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.d2(z,a)}else return this.e8(a)},
e8:function(a){var z=this.d
if(z==null)return!1
return this.ai(this.M(z,this.ah(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.M(z,b)
return y==null?null:y.gZ()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.M(x,b)
return y==null?null:y.gZ()}else return this.e9(b)},
e9:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.M(z,this.ah(a))
x=this.ai(y,a)
if(x<0)return
return y[x].gZ()},
p:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aW()
this.b=z}this.bp(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aW()
this.c=y}this.bp(y,b,c)}else this.eb(b,c)},
eb:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aW()
this.d=z}y=this.ah(a)
x=this.M(z,y)
if(x==null)this.aY(z,y,[this.aX(a,b)])
else{w=this.ai(x,a)
if(w>=0)x[w].sZ(b)
else x.push(this.aX(a,b))}},
a7:function(a,b){if(typeof b==="string")return this.bJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bJ(this.c,b)
else return this.ea(b)},
ea:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.M(z,this.ah(a))
x=this.ai(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bR(w)
return w.gZ()},
N:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.e(new P.F(this))
z=z.c}},
bp:function(a,b,c){var z=this.M(a,b)
if(z==null)this.aY(a,b,this.aX(b,c))
else z.sZ(c)},
bJ:function(a,b){var z
if(a==null)return
z=this.M(a,b)
if(z==null)return
this.bR(z)
this.bw(a,b)
return z.gZ()},
aX:function(a,b){var z,y
z=new H.f_(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bR:function(a){var z,y
z=a.gdk()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ah:function(a){return J.C(a)&0x3ffffff},
ai:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gbY(),b))return y
return-1},
i:function(a){return P.cq(this)},
M:function(a,b){return a[b]},
aY:function(a,b,c){a[b]=c},
bw:function(a,b){delete a[b]},
d2:function(a,b){return this.M(a,b)!=null},
aW:function(){var z=Object.create(null)
this.aY(z,"<non-identifier-key>",z)
this.bw(z,"<non-identifier-key>")
return z},
$iseF:1},
eV:{
"^":"c:2;a",
$1:function(a){return this.a.h(0,a)}},
f_:{
"^":"a;bY:a<,Z:b@,c,dk:d<"},
f0:{
"^":"K;a",
gj:function(a){return this.a.a},
gB:function(a){var z,y
z=this.a
y=new H.f1(z,z.r,null,null)
y.c=z.e
return y},
C:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.F(z))
y=y.c}},
$iso:1},
f1:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.F(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ih:{
"^":"c:2;a",
$1:function(a){return this.a(a)}},
ii:{
"^":"c:9;a",
$2:function(a,b){return this.a(a,b)}},
ij:{
"^":"c:10;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bo:function(){return new P.ak("No element")},
eO:function(){return new P.ak("Too few elements")},
ft:function(a){return a.geF()},
aV:{
"^":"K;",
gB:function(a){return new H.co(this,this.gj(this),0,null)},
C:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.S(0,y))
if(z!==this.gj(this))throw H.e(new P.F(this))}},
a6:function(a,b){return H.d(new H.bt(this,b),[null,null])},
bg:function(a,b){var z,y,x
if(b){z=H.d([],[H.I(this,"aV",0)])
C.c.sj(z,this.gj(this))}else z=H.d(Array(this.gj(this)),[H.I(this,"aV",0)])
for(y=0;y<this.gj(this);++y){x=this.S(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bf:function(a){return this.bg(a,!0)},
$iso:1},
co:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z,y,x,w
z=this.a
y=J.N(z)
x=y.gj(z)
if(this.b!==x)throw H.e(new P.F(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.S(z,w);++this.c
return!0}},
cp:{
"^":"K;a,b",
gB:function(a){var z=new H.f5(null,J.bg(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.au(this.a)},
$asK:function(a,b){return[b]},
static:{aW:function(a,b,c,d){if(!!J.l(a).$iso)return H.d(new H.cg(a,b),[c,d])
return H.d(new H.cp(a,b),[c,d])}}},
cg:{
"^":"cp;a,b",
$iso:1},
f5:{
"^":"eP;a,b,c",
n:function(){var z=this.b
if(z.n()){this.a=this.aS(z.gq())
return!0}this.a=null
return!1},
gq:function(){return this.a},
aS:function(a){return this.c.$1(a)}},
bt:{
"^":"aV;a,b",
gj:function(a){return J.au(this.a)},
S:function(a,b){return this.aS(J.dP(this.a,b))},
aS:function(a){return this.b.$1(a)},
$asaV:function(a,b){return[b]},
$asK:function(a,b){return[b]},
$iso:1},
ci:{
"^":"a;"}}],["","",,H,{
"^":"",
dk:function(a){var z=H.d(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
fY:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.i3()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a3(new P.h_(z),1)).observe(y,{childList:true})
return new P.fZ(z,y,x)}else if(self.setImmediate!=null)return P.i4()
return P.i5()},
jI:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a3(new P.h0(a),0))},"$1","i3",2,0,4],
jJ:[function(a){++init.globalState.f.b
self.setImmediate(H.a3(new P.h1(a),0))},"$1","i4",2,0,4],
jK:[function(a){P.bA(C.h,a)},"$1","i5",2,0,4],
d9:function(a,b){var z=H.aK()
z=H.ae(z,[z,z]).X(a)
if(z){b.toString
return a}else{b.toString
return a}},
ev:function(a,b,c){var z=new P.w(0,$.k,null)
z.$builtinTypeInfo=[c]
P.cL(a,new P.ew(b,z))
return z},
ai:function(a){return H.d(new P.bI(H.d(new P.w(0,$.k,null),[a])),[a])},
hT:function(a,b,c){$.k.toString
a.G(b,c)},
hW:function(){var z,y
for(;z=$.aa,z!=null;){$.ap=null
y=z.c
$.aa=y
if(y==null)$.ao=null
$.k=z.b
z.dA()}},
jV:[function(){$.bQ=!0
try{P.hW()}finally{$.k=C.b
$.ap=null
$.bQ=!1
if($.aa!=null)$.$get$bJ().$1(P.dh())}},"$0","dh",0,0,1],
dd:function(a){if($.aa==null){$.ao=a
$.aa=a
if(!$.bQ)$.$get$bJ().$1(P.dh())}else{$.ao.c=a
$.ao=a}},
dw:function(a){var z,y
z=$.k
if(C.b===z){P.ab(null,null,C.b,a)
return}z.toString
if(C.b.gb5()===z){P.ab(null,null,z,a)
return}y=$.k
P.ab(null,null,y,y.b_(a,!0))},
jy:function(a,b){var z,y,x
z=H.d(new P.d7(null,null,null,0),[b])
y=z.gdf()
x=z.gdh()
z.a=a.a_(y,!0,z.gdg(),x)
return z},
hY:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.B(u)
z=t
y=H.y(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.S(x)
w=t
v=x.gL()
c.$2(w,v)}}},
hO:function(a,b,c,d){var z=a.b1()
if(!!J.l(z).$isM)z.bk(new P.hR(b,c,d))
else b.G(c,d)},
hP:function(a,b){return new P.hQ(a,b)},
cL:function(a,b){var z=$.k
if(z===C.b){z.toString
return P.bA(a,b)}return P.bA(a,z.b_(b,!0))},
bA:function(a,b){var z=C.d.ac(a.a,1000)
return H.fw(z<0?0:z,b)},
bH:function(a){var z=$.k
$.k=a
return z},
aJ:function(a,b,c,d,e){var z,y,x
z=new P.d0(new P.hX(d,e),C.b,null)
y=$.aa
if(y==null){P.dd(z)
$.ap=$.ao}else{x=$.ap
if(x==null){z.c=y
$.ap=z
$.aa=z}else{z.c=x.c
x.c=z
$.ap=z
if(z.c==null)$.ao=z}}},
da:function(a,b,c,d){var z,y
if($.k===c)return d.$0()
z=P.bH(c)
try{y=d.$0()
return y}finally{$.k=z}},
dc:function(a,b,c,d,e){var z,y
if($.k===c)return d.$1(e)
z=P.bH(c)
try{y=d.$1(e)
return y}finally{$.k=z}},
db:function(a,b,c,d,e,f){var z,y
if($.k===c)return d.$2(e,f)
z=P.bH(c)
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ab:function(a,b,c,d){var z=C.b!==c
if(z){d=c.b_(d,!(!z||C.b.gb5()===c))
c=C.b}P.dd(new P.d0(d,c,null))},
h_:{
"^":"c:2;a",
$1:function(a){var z,y
H.bc()
z=this.a
y=z.a
z.a=null
y.$0()}},
fZ:{
"^":"c:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
h0:{
"^":"c:0;a",
$0:function(){H.bc()
this.a.$0()}},
h1:{
"^":"c:0;a",
$0:function(){H.bc()
this.a.$0()}},
hL:{
"^":"V;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hM:function(a,b){if(b!=null)return b
if(!!J.l(a).$isz)return a.gL()
return}}},
M:{
"^":"a;"},
ew:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a1(null)}catch(x){w=H.B(x)
z=w
y=H.y(x)
P.hT(this.b,z,y)}}},
h5:{
"^":"a;e0:a<",
bW:function(a,b){a=a!=null?a:new P.cx()
if(this.a.a!==0)throw H.e(new P.ak("Future already completed"))
$.k.toString
this.G(a,b)},
b3:function(a){return this.bW(a,null)}},
bI:{
"^":"h5;a",
at:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.ak("Future already completed"))
z.aL(b)},
G:function(a,b){this.a.cZ(a,b)}},
am:{
"^":"a;bD:a<,em:b>,c,d,e",
ga3:function(){return this.b.b},
gbX:function(){return(this.c&1)!==0},
ge6:function(){return this.c===6},
ge5:function(){return this.c===8},
gdj:function(){return this.d},
gds:function(){return this.d}},
w:{
"^":"a;ar:a?,a3:b<,c",
gdc:function(){return this.a===8},
sdd:function(a){if(a)this.a=2
else this.a=0},
aA:function(a,b){var z,y
z=H.d(new P.w(0,$.k,null),[null])
y=z.b
if(y!==C.b){y.toString
if(b!=null)b=P.d9(b,y)}this.aI(new P.am(null,z,b==null?1:3,a,b))
return z},
ep:function(a){return this.aA(a,null)},
bk:function(a){var z,y
z=$.k
y=new P.w(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.b)z.toString
this.aI(new P.am(null,y,8,a,null))
return y},
aV:function(){if(this.a!==0)throw H.e(new P.ak("Future already completed"))
this.a=1},
gdr:function(){return this.c},
gab:function(){return this.c},
bP:function(a){this.a=4
this.c=a},
bO:function(a){this.a=8
this.c=a},
dn:function(a,b){this.bO(new P.V(a,b))},
aI:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ab(null,null,z,new P.hf(this,a))}else{a.a=this.c
this.c=a}},
aq:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbD()
z.a=y}return y},
a1:function(a){var z,y
z=J.l(a)
if(!!z.$isM)if(!!z.$isw)P.b4(a,this)
else P.bM(a,this)
else{y=this.aq()
this.bP(a)
P.a1(this,y)}},
bv:function(a){var z=this.aq()
this.bP(a)
P.a1(this,z)},
G:[function(a,b){var z=this.aq()
this.bO(new P.V(a,b))
P.a1(this,z)},function(a){return this.G(a,null)},"eB","$2","$1","gaP",2,2,12,0],
aL:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isM){if(!!z.$isw){z=a.a
if(z>=4&&z===8){this.aV()
z=this.b
z.toString
P.ab(null,null,z,new P.hh(this,a))}else P.b4(a,this)}else P.bM(a,this)
return}}this.aV()
z=this.b
z.toString
P.ab(null,null,z,new P.hi(this,a))},
cZ:function(a,b){var z
this.aV()
z=this.b
z.toString
P.ab(null,null,z,new P.hg(this,a,b))},
$isM:1,
static:{bM:function(a,b){var z,y,x,w
b.sar(2)
try{a.aA(new P.hj(b),new P.hk(b))}catch(x){w=H.B(x)
z=w
y=H.y(x)
P.dw(new P.hl(b,z,y))}},b4:function(a,b){var z
b.a=2
z=new P.am(null,b,0,null,null)
if(a.a>=4)P.a1(a,z)
else a.aI(z)},a1:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdc()
if(b==null){if(w){v=z.a.gab()
y=z.a.ga3()
x=J.S(v)
u=v.gL()
y.toString
P.aJ(null,null,y,x,u)}return}for(;b.gbD()!=null;b=t){t=b.a
b.a=null
P.a1(z.a,b)}x.a=!0
s=w?null:z.a.gdr()
x.b=s
x.c=!1
y=!w
if(!y||b.gbX()||b.c===8){r=b.ga3()
if(w){u=z.a.ga3()
u.toString
if(u==null?r!=null:u!==r){u=u.gb5()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gab()
y=z.a.ga3()
x=J.S(v)
u=v.gL()
y.toString
P.aJ(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gbX())x.a=new P.hn(x,b,s,r).$0()}else new P.hm(z,x,b,r).$0()
if(b.ge5())new P.ho(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isM}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.w)if(p.a>=4){o.a=2
z.a=p
b=new P.am(null,o,0,null,null)
y=p
continue}else P.b4(p,o)
else P.bM(p,o)
return}}o=b.b
b=o.aq()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hf:{
"^":"c:0;a,b",
$0:function(){P.a1(this.a,this.b)}},
hj:{
"^":"c:2;a",
$1:function(a){this.a.bv(a)}},
hk:{
"^":"c:6;a",
$2:function(a,b){this.a.G(a,b)},
$1:function(a){return this.$2(a,null)}},
hl:{
"^":"c:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
hh:{
"^":"c:0;a,b",
$0:function(){P.b4(this.b,this.a)}},
hi:{
"^":"c:0;a,b",
$0:function(){this.a.bv(this.b)}},
hg:{
"^":"c:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
hn:{
"^":"c:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.az(this.b.gdj(),this.c)
return!0}catch(x){w=H.B(x)
z=w
y=H.y(x)
this.a.b=new P.V(z,y)
return!1}}},
hm:{
"^":"c:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gab()
y=!0
r=this.c
if(r.ge6()){x=r.d
try{y=this.d.az(x,J.S(z))}catch(q){r=H.B(q)
w=r
v=H.y(q)
r=J.S(z)
p=w
o=(r==null?p==null:r===p)?z:new P.V(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aK()
p=H.ae(p,[p,p]).X(r)
n=this.d
m=this.b
if(p)m.b=n.en(u,J.S(z),z.gL())
else m.b=n.az(u,J.S(z))}catch(q){r=H.B(q)
t=r
s=H.y(q)
r=J.S(z)
p=t
o=(r==null?p==null:r===p)?z:new P.V(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
ho:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cf(this.d.gds())
z.a=w
v=w}catch(u){z=H.B(u)
y=z
x=H.y(u)
if(this.c){z=J.S(this.a.a.gab())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gab()
else v.b=new P.V(y,x)
v.a=!1
return}if(!!J.l(v).$isM){t=this.d
s=t.gem(t)
s.sdd(!0)
this.b.c=!0
v.aA(new P.hp(this.a,s),new P.hq(z,s))}}},
hp:{
"^":"c:2;a,b",
$1:function(a){P.a1(this.a.a,new P.am(null,this.b,0,null,null))}},
hq:{
"^":"c:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.w)){y=H.d(new P.w(0,$.k,null),[null])
z.a=y
y.dn(a,b)}P.a1(z.a,new P.am(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
d0:{
"^":"a;a,b,c",
dA:function(){return this.a.$0()}},
Z:{
"^":"a;",
a6:function(a,b){return H.d(new P.hA(b,this),[H.I(this,"Z",0),null])},
C:function(a,b){var z,y
z={}
y=H.d(new P.w(0,$.k,null),[null])
z.a=null
z.a=this.a_(new P.fn(z,this,b,y),!0,new P.fo(y),y.gaP())
return y},
gj:function(a){var z,y
z={}
y=H.d(new P.w(0,$.k,null),[P.m])
z.a=0
this.a_(new P.fp(z),!0,new P.fq(z,y),y.gaP())
return y},
bf:function(a){var z,y
z=H.d([],[H.I(this,"Z",0)])
y=H.d(new P.w(0,$.k,null),[[P.j,H.I(this,"Z",0)]])
this.a_(new P.fr(this,z),!0,new P.fs(z,y),y.gaP())
return y}},
fn:{
"^":"c;a,b,c,d",
$1:function(a){P.hY(new P.fl(this.c,a),new P.fm(),P.hP(this.a.a,this.d))},
$signature:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"Z")}},
fl:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fm:{
"^":"c:2;",
$1:function(a){}},
fo:{
"^":"c:0;a",
$0:function(){this.a.a1(null)}},
fp:{
"^":"c:2;a",
$1:function(a){++this.a.a}},
fq:{
"^":"c:0;a,b",
$0:function(){this.b.a1(this.a.a)}},
fr:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"Z")}},
fs:{
"^":"c:0;a,b",
$0:function(){this.b.a1(this.a)}},
fk:{
"^":"a;"},
jO:{
"^":"a;"},
h2:{
"^":"a;a3:d<,ar:e?",
ba:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bU()
if((z&4)===0&&(this.e&32)===0)this.bA(this.gbF())},
aj:function(a){return this.ba(a,null)},
ce:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gH(z)}else z=!1
if(z)this.r.aD(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bA(this.gbH())}}}},
b1:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aM()
return this.f},
aM:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bU()
if((this.e&32)===0)this.r=null
this.f=this.bE()},
aK:["cK",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bL(a)
else this.aJ(new P.h8(a,null))}],
aH:["cL",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bN(a,b)
else this.aJ(new P.ha(a,b,null))}],
cY:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bM()
else this.aJ(C.l)},
bG:[function(){},"$0","gbF",0,0,1],
bI:[function(){},"$0","gbH",0,0,1],
bE:function(){return},
aJ:function(a){var z,y
z=this.r
if(z==null){z=new P.hK(null,null,0)
this.r=z}z.a4(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aD(this)}},
bL:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.be(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aN((z&4)!==0)},
bN:function(a,b){var z,y
z=this.e
y=new P.h4(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aM()
z=this.f
if(!!J.l(z).$isM)z.bk(y)
else y.$0()}else{y.$0()
this.aN((z&4)!==0)}},
bM:function(){var z,y
z=new P.h3(this)
this.aM()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isM)y.bk(z)
else z.$0()},
bA:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aN((z&4)!==0)},
aN:function(a){var z,y
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
if(y)this.bG()
else this.bI()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aD(this)},
cU:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.d9(b,z)
this.c=c}},
h4:{
"^":"c:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aK()
x=H.ae(x,[x,x]).X(y)
w=z.d
v=this.b
u=z.b
if(x)w.eo(u,v,this.c)
else w.be(u,v)
z.e=(z.e&4294967263)>>>0}},
h3:{
"^":"c:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cg(z.c)
z.e=(z.e&4294967263)>>>0}},
d2:{
"^":"a;ax:a@"},
h8:{
"^":"d2;b,a",
bb:function(a){a.bL(this.b)}},
ha:{
"^":"d2;af:b>,L:c<,a",
bb:function(a){a.bN(this.b,this.c)}},
h9:{
"^":"a;",
bb:function(a){a.bM()},
gax:function(){return},
sax:function(a){throw H.e(new P.ak("No events after a done."))}},
hC:{
"^":"a;ar:a?",
aD:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dw(new P.hD(this,a))
this.a=1},
bU:function(){if(this.a===1)this.a=3}},
hD:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.e2(this.b)}},
hK:{
"^":"hC;b,c,a",
gH:function(a){return this.c==null},
a4:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sax(b)
this.c=b}},
e2:function(a){var z,y
z=this.b
y=z.gax()
this.b=y
if(y==null)this.c=null
z.bb(a)}},
d7:{
"^":"a;a,b,c,ar:d?",
br:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eG:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a1(!0)
return}this.a.aj(0)
this.c=a
this.d=3},"$1","gdf",2,0,function(){return H.b7(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"d7")}],
di:[function(a,b){var z
if(this.d===2){z=this.c
this.br(0)
z.G(a,b)
return}this.a.aj(0)
this.c=new P.V(a,b)
this.d=4},function(a){return this.di(a,null)},"eI","$2","$1","gdh",2,2,14,0],
eH:[function(){if(this.d===2){var z=this.c
this.br(0)
z.a1(!1)
return}this.a.aj(0)
this.c=null
this.d=5},"$0","gdg",0,0,1]},
hR:{
"^":"c:0;a,b,c",
$0:function(){return this.a.G(this.b,this.c)}},
hQ:{
"^":"c:5;a,b",
$2:function(a,b){return P.hO(this.a,this.b,a,b)}},
bL:{
"^":"Z;",
a_:function(a,b,c,d){return this.d3(a,d,c,!0===b)},
c2:function(a,b,c){return this.a_(a,null,b,c)},
d3:function(a,b,c,d){return P.he(this,a,b,c,d,H.I(this,"bL",0),H.I(this,"bL",1))},
bB:function(a,b){b.aK(a)},
$asZ:function(a,b){return[b]}},
d3:{
"^":"h2;x,y,a,b,c,d,e,f,r",
aK:function(a){if((this.e&2)!==0)return
this.cK(a)},
aH:function(a,b){if((this.e&2)!==0)return
this.cL(a,b)},
bG:[function(){var z=this.y
if(z==null)return
z.aj(0)},"$0","gbF",0,0,1],
bI:[function(){var z=this.y
if(z==null)return
z.ce()},"$0","gbH",0,0,1],
bE:function(){var z=this.y
if(z!=null){this.y=null
z.b1()}return},
eC:[function(a){this.x.bB(a,this)},"$1","gd7",2,0,function(){return H.b7(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"d3")}],
eE:[function(a,b){this.aH(a,b)},"$2","gd9",4,0,15],
eD:[function(){this.cY()},"$0","gd8",0,0,1],
cV:function(a,b,c,d,e,f,g){var z,y
z=this.gd7()
y=this.gd9()
this.y=this.x.a.c2(z,this.gd8(),y)},
static:{he:function(a,b,c,d,e,f,g){var z=$.k
z=H.d(new P.d3(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cU(b,c,d,e)
z.cV(a,b,c,d,e,f,g)
return z}}},
hA:{
"^":"bL;b,a",
bB:function(a,b){var z,y,x,w,v
z=null
try{z=this.dq(a)}catch(w){v=H.B(w)
y=v
x=H.y(w)
$.k.toString
b.aH(y,x)
return}b.aK(z)},
dq:function(a){return this.b.$1(a)}},
V:{
"^":"a;af:a>,L:b<",
i:function(a){return H.b(this.a)},
$isz:1},
hN:{
"^":"a;"},
hX:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.hL(z,P.hM(z,this.b)))}},
hF:{
"^":"hN;",
gb5:function(){return this},
cg:function(a){var z,y,x,w
try{if(C.b===$.k){x=a.$0()
return x}x=P.da(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
be:function(a,b){var z,y,x,w
try{if(C.b===$.k){x=a.$1(b)
return x}x=P.dc(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
eo:function(a,b,c){var z,y,x,w
try{if(C.b===$.k){x=a.$2(b,c)
return x}x=P.db(null,null,this,a,b,c)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
b_:function(a,b){if(b)return new P.hG(this,a)
else return new P.hH(this,a)},
dv:function(a,b){if(b)return new P.hI(this,a)
else return new P.hJ(this,a)},
h:function(a,b){return},
cf:function(a){if($.k===C.b)return a.$0()
return P.da(null,null,this,a)},
az:function(a,b){if($.k===C.b)return a.$1(b)
return P.dc(null,null,this,a,b)},
en:function(a,b,c){if($.k===C.b)return a.$2(b,c)
return P.db(null,null,this,a,b,c)}},
hG:{
"^":"c:0;a,b",
$0:function(){return this.a.cg(this.b)}},
hH:{
"^":"c:0;a,b",
$0:function(){return this.a.cf(this.b)}},
hI:{
"^":"c:2;a,b",
$1:function(a){return this.a.be(this.b,a)}},
hJ:{
"^":"c:2;a,b",
$1:function(a){return this.a.az(this.b,a)}}}],["","",,P,{
"^":"",
aU:function(){return H.d(new H.aD(0,null,null,null,null,null,0),[null,null])},
a8:function(a){return H.dl(a,H.d(new H.aD(0,null,null,null,null,null,0),[null,null]))},
eN:function(a,b,c){var z,y
if(P.bR(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aq()
y.push(a)
try{P.hV(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cH(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aP:function(a,b,c){var z,y,x
if(P.bR(a))return b+"..."+c
z=new P.bz(b)
y=$.$get$aq()
y.push(a)
try{x=z
x.a=P.cH(x.ga2(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga2()+c
y=z.ga2()
return y.charCodeAt(0)==0?y:y},
bR:function(a){var z,y
for(z=0;y=$.$get$aq(),z<y.length;++z)if(a===y[z])return!0
return!1},
hV:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gB(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.n())return
w=H.b(z.gq())
b.push(w)
y+=w.length+2;++x}if(!z.n()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gq();++x
if(!z.n()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gq();++x
for(;z.n();t=s,s=r){r=z.gq();++x
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
aT:function(a,b,c,d,e){return H.d(new H.aD(0,null,null,null,null,null,0),[d,e])},
a7:function(a,b){return P.hv(a,b)},
aj:function(a,b,c,d){return H.d(new P.ht(0,null,null,null,null,null,0),[d])},
cq:function(a){var z,y,x
z={}
if(P.bR(a))return"{...}"
y=new P.bz("")
try{$.$get$aq().push(a)
x=y
x.a=x.ga2()+"{"
z.a=!0
J.dR(a,new P.f6(z,y))
z=y
z.a=z.ga2()+"}"}finally{z=$.$get$aq()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga2()
return z.charCodeAt(0)==0?z:z},
hu:{
"^":"aD;a,b,c,d,e,f,r",
ah:function(a){return H.iw(a)&0x3ffffff},
ai:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbY()
if(x==null?b==null:x===b)return y}return-1},
static:{hv:function(a,b){return H.d(new P.hu(0,null,null,null,null,null,0),[a,b])}}},
ht:{
"^":"hr;a,b,c,d,e,f,r",
gB:function(a){var z=new P.cn(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dJ:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.d1(b)},
d1:function(a){var z=this.d
if(z==null)return!1
return this.ap(z[this.ao(a)],a)>=0},
c3:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dJ(0,a)?a:null
else return this.de(a)},
de:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ao(a)]
x=this.ap(y,a)
if(x<0)return
return J.c_(y,x).gbx()},
C:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.F(this))
z=z.b}},
a4:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bO()
this.b=z}return this.bs(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bO()
this.c=y}return this.bs(y,b)}else return this.R(b)},
R:function(a){var z,y,x
z=this.d
if(z==null){z=P.bO()
this.d=z}y=this.ao(a)
x=z[y]
if(x==null)z[y]=[this.aO(a)]
else{if(this.ap(x,a)>=0)return!1
x.push(this.aO(a))}return!0},
a7:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bt(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bt(this.c,b)
else return this.dl(b)},
dl:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ao(a)]
x=this.ap(y,a)
if(x<0)return!1
this.bu(y.splice(x,1)[0])
return!0},
N:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bs:function(a,b){if(a[b]!=null)return!1
a[b]=this.aO(b)
return!0},
bt:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bu(z)
delete a[b]
return!0},
aO:function(a){var z,y
z=new P.f2(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bu:function(a){var z,y
z=a.gd0()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ao:function(a){return J.C(a)&0x3ffffff},
ap:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gbx(),b))return y
return-1},
$iso:1,
static:{bO:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f2:{
"^":"a;bx:a<,b,d0:c<"},
cn:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.F(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hr:{
"^":"fh;"},
bq:{
"^":"a;",
gB:function(a){return new H.co(a,this.gj(a),0,null)},
S:function(a,b){return this.h(a,b)},
C:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.F(a))}},
a6:function(a,b){return H.d(new H.bt(a,b),[null,null])},
i:function(a){return P.aP(a,"[","]")},
$isj:1,
$asj:null,
$iso:1},
f6:{
"^":"c:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
f3:{
"^":"K;a,b,c,d",
gB:function(a){return new P.hw(this,this.c,this.d,this.b,null)},
C:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.A(new P.F(this))}},
gH:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
N:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aP(this,"{","}")},
cd:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bo());++this.d
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
if(this.b===x)this.bz();++this.d},
bz:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.d(z,[H.t(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.bn(y,0,w,z,x)
C.c.bn(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cP:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.d(z,[b])},
$iso:1,
static:{br:function(a,b){var z=H.d(new P.f3(null,0,0,0),[b])
z.cP(a,b)
return z}}},
hw:{
"^":"a;a,b,c,d,e",
gq:function(){return this.e},
n:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.A(new P.F(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fi:{
"^":"a;",
a6:function(a,b){return H.d(new H.cg(this,b),[H.t(this,0),null])},
i:function(a){return P.aP(this,"{","}")},
C:function(a,b){var z
for(z=this.gB(this);z.n();)b.$1(z.d)},
$iso:1},
fh:{
"^":"fi;"}}],["","",,P,{
"^":"",
hZ:function(a){return H.ft(a)},
bl:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.av(a)
if(typeof a==="string")return JSON.stringify(a)
return P.er(a)},
er:function(a){var z=J.l(a)
if(!!z.$isc)return z.i(a)
return H.aY(a)},
aO:function(a){return new P.hd(a)},
f4:function(a,b,c){var z=J.eQ(a,c)
if(a!==0);return z},
bs:function(a,b,c){var z,y
z=H.d([],[c])
for(y=J.bg(a);y.n();)z.push(y.gq())
if(b)return z
z.fixed$length=Array
return z},
af:function(a){var z=H.b(a)
H.du(z)},
jq:{
"^":"c:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.hZ(a)}},
bS:{
"^":"a;"},
"+bool":0,
bk:{
"^":"a;a,b",
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.bk))return!1
return this.a===b.a&&this.b===b.b},
gt:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.em(z?H.E(this).getUTCFullYear()+0:H.E(this).getFullYear()+0)
x=P.ax(z?H.E(this).getUTCMonth()+1:H.E(this).getMonth()+1)
w=P.ax(z?H.E(this).getUTCDate()+0:H.E(this).getDate()+0)
v=P.ax(z?H.E(this).getUTCHours()+0:H.E(this).getHours()+0)
u=P.ax(z?H.E(this).getUTCMinutes()+0:H.E(this).getMinutes()+0)
t=P.ax(z?H.E(this).getUTCSeconds()+0:H.E(this).getSeconds()+0)
s=P.en(H.cy(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
cN:function(a,b){if(Math.abs(a)>864e13)throw H.e(P.aw(a))},
static:{el:function(a,b){var z=new P.bk(a,b)
z.cN(a,b)
return z},em:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},en:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},ax:function(a){if(a>=10)return""+a
return"0"+a}}},
bf:{
"^":"aL;"},
"+double":0,
ay:{
"^":"a;a",
k:function(a,b){return new P.ay(C.d.k(this.a,b.gd5()))},
aC:function(a,b){return C.d.aC(this.a,b.gd5())},
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.ay))return!1
return this.a===b.a},
gt:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eq()
y=this.a
if(y<0)return"-"+new P.ay(-y).i(0)
x=z.$1(C.d.bc(C.d.ac(y,6e7),60))
w=z.$1(C.d.bc(C.d.ac(y,1e6),60))
v=new P.ep().$1(C.d.bc(y,1e6))
return""+C.d.ac(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
ep:{
"^":"c:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eq:{
"^":"c:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
z:{
"^":"a;",
gL:function(){return H.y(this.$thrownJsError)}},
cx:{
"^":"z;",
i:function(a){return"Throw of null."}},
a5:{
"^":"z;a,b,c,d",
gaR:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaQ:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaR()+y+x
if(!this.a)return w
v=this.gaQ()
u=P.bl(this.b)
return w+v+": "+H.b(u)},
static:{aw:function(a){return new P.a5(!1,null,null,a)},e8:function(a,b,c){return new P.a5(!0,a,b,c)}}},
cC:{
"^":"a5;e,f,a,b,c,d",
gaR:function(){return"RangeError"},
gaQ:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.ew()
if(typeof z!=="number")return H.O(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b_:function(a,b,c){return new P.cC(null,null,!0,a,b,"Value not in range")},aZ:function(a,b,c,d,e){return new P.cC(b,c,!0,a,d,"Invalid value")},cD:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.aZ(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.aZ(b,a,c,"end",f))
return b}}},
eB:{
"^":"a5;e,j:f>,a,b,c,d",
gaR:function(){return"RangeError"},
gaQ:function(){P.bl(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dA(this.b,0)?": index must not be negative":z},
static:{bn:function(a,b,c,d,e){var z=e!=null?e:J.au(b)
return new P.eB(b,z,!0,a,c,"Index out of range")}}},
L:{
"^":"z;a",
i:function(a){return"Unsupported operation: "+this.a}},
bF:{
"^":"z;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
ak:{
"^":"z;a",
i:function(a){return"Bad state: "+this.a}},
F:{
"^":"z;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bl(z))+"."}},
cG:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gL:function(){return},
$isz:1},
ek:{
"^":"z;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hd:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
es:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aX(b,"expando$values")
return z==null?null:H.aX(z,this.by())},
p:function(a,b,c){var z=H.aX(b,"expando$values")
if(z==null){z=new P.a()
H.by(b,"expando$values",z)}H.by(z,this.by(),c)},
by:function(){var z,y
z=H.aX(this,"expando$key")
if(z==null){y=$.ch
$.ch=y+1
z="expando$key$"+y
H.by(this,"expando$key",z)}return z}},
eu:{
"^":"a;"},
m:{
"^":"aL;"},
"+int":0,
K:{
"^":"a;",
a6:function(a,b){return H.aW(this,b,H.I(this,"K",0),null)},
C:function(a,b){var z
for(z=this.gB(this);z.n();)b.$1(z.gq())},
bg:function(a,b){return P.bs(this,b,H.I(this,"K",0))},
bf:function(a){return this.bg(a,!0)},
gj:function(a){var z,y
z=this.gB(this)
for(y=0;z.n();)++y
return y},
S:function(a,b){var z,y,x
if(b<0)H.A(P.aZ(b,0,null,"index",null))
for(z=this.gB(this),y=0;z.n();){x=z.gq()
if(b===y)return x;++y}throw H.e(P.bn(b,this,"index",null,y))},
i:function(a){return P.eN(this,"(",")")}},
eP:{
"^":"a;"},
j:{
"^":"a;",
$asj:null,
$iso:1},
"+List":0,
jr:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aL:{
"^":"a;"},
"+num":0,
a:{
"^":";",
l:function(a,b){return this===b},
gt:function(a){return H.X(this)},
i:function(a){return H.aY(this)}},
Y:{
"^":"a;"},
U:{
"^":"a;"},
"+String":0,
bz:{
"^":"a;a2:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cH:function(a,b,c){var z=J.bg(b)
if(!z.n())return a
if(c.length===0){do a+=H.b(z.gq())
while(z.n())}else{a+=H.b(z.gq())
for(;z.n();)a=a+c+H.b(z.gq())}return a}}},
cI:{
"^":"a;"}}],["","",,W,{
"^":"",
a2:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d4:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
d8:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.h7(a)
if(!!J.l(z).$isG)return z
return}else return a},
hU:function(a){if(!!J.l(a).$isce)return a
return P.i8(a,!0)},
x:function(a){var z=$.k
if(z===C.b)return a
return z.dv(a,!0)},
D:{
"^":"az;",
$isD:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iD:{
"^":"D;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iF:{
"^":"D;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iH:{
"^":"D;",
$isG:1,
$isf:1,
"%":"HTMLBodyElement"},
iI:{
"^":"D;v:height},A:width}",
bl:function(a,b,c){return a.getContext(b,P.i6(c))},
cq:function(a,b,c,d,e,f,g){var z,y
z=P.a8(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bl(a,"webgl",z)
return y==null?this.bl(a,"experimental-webgl",z):y},
cp:function(a,b){return this.cq(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
iJ:{
"^":"f;",
c1:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
iL:{
"^":"aE;j:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iM:{
"^":"eC;j:length=",
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eC:{
"^":"f+ej;"},
ej:{
"^":"a;"},
ce:{
"^":"aE;",
$isce:1,
"%":"Document|HTMLDocument|XMLDocument"},
iN:{
"^":"aE;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iO:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
eo:{
"^":"f;b0:bottom=,v:height=,I:left=,bd:right=,a9:top=,A:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gA(a))+" x "+H.b(this.gv(a))},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga9(b)
if(y==null?x==null:y===x){y=this.gA(a)
x=z.gA(b)
if(y==null?x==null:y===x){y=this.gv(a)
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(this.gA(a))
w=J.C(this.gv(a))
return W.d4(W.a2(W.a2(W.a2(W.a2(0,z),y),x),w))},
gbh:function(a){return H.d(new P.H(a.left,a.top),[null])},
$isT:1,
$asT:I.b9,
"%":";DOMRectReadOnly"},
az:{
"^":"aE;",
gO:function(a){return P.fc(C.a.w(a.offsetLeft),C.a.w(a.offsetTop),C.a.w(a.offsetWidth),C.a.w(a.offsetHeight),null)},
i:function(a){return a.localName},
co:function(a){return a.getBoundingClientRect()},
gc4:function(a){return H.d(new W.q(a,"mousedown",!1),[null])},
gc5:function(a){return H.d(new W.q(a,"mouseenter",!1),[null])},
gc6:function(a){return H.d(new W.q(a,"mouseleave",!1),[null])},
gc7:function(a){return H.d(new W.q(a,"mousemove",!1),[null])},
gc8:function(a){return H.d(new W.q(a,"mouseout",!1),[null])},
gc9:function(a){return H.d(new W.q(a,"mouseover",!1),[null])},
gca:function(a){return H.d(new W.q(a,"mouseup",!1),[null])},
$isaz:1,
$isf:1,
$isG:1,
"%":";Element"},
iP:{
"^":"D;v:height},A:width}",
"%":"HTMLEmbedElement"},
iQ:{
"^":"aN;af:error=",
"%":"ErrorEvent"},
aN:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
G:{
"^":"f;",
cX:function(a,b,c,d){return a.addEventListener(b,H.a3(c,1),d)},
dm:function(a,b,c,d){return a.removeEventListener(b,H.a3(c,1),d)},
$isG:1,
"%":"AudioBufferSourceNode|AudioDestinationNode|AudioNode|AudioSourceNode|MediaStream;EventTarget"},
j7:{
"^":"D;j:length=",
"%":"HTMLFormElement"},
ey:{
"^":"ez;",
eN:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
ei:function(a,b,c){return a.open(b,c)},
aE:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
ez:{
"^":"G;",
"%":";XMLHttpRequestEventTarget"},
j8:{
"^":"D;v:height},A:width}",
"%":"HTMLIFrameElement"},
j9:{
"^":"D;v:height},A:width}",
at:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
jb:{
"^":"D;v:height},A:width}",
$isaz:1,
$isf:1,
$isG:1,
"%":"HTMLInputElement"},
f7:{
"^":"D;af:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
bu:{
"^":"d_;",
gO:function(a){var z,y
if(!!a.offsetX)return H.d(new P.H(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.d8(a.target)).$isaz)throw H.e(new P.L("offsetX is only supported on elements"))
z=W.d8(a.target)
y=H.d(new P.H(a.clientX,a.clientY),[null]).aG(0,J.dZ(J.e1(z)))
return H.d(new P.H(J.c8(y.a),J.c8(y.b)),[null])}},
$isbu:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jp:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aE:{
"^":"G;",
i:function(a){var z=a.nodeValue
return z==null?this.cI(a):z},
"%":"Attr;Node"},
js:{
"^":"D;v:height},A:width}",
"%":"HTMLObjectElement"},
aF:{
"^":"aN;",
$isaF:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
jw:{
"^":"D;j:length=",
"%":"HTMLSelectElement"},
jx:{
"^":"aN;af:error=",
"%":"SpeechRecognitionError"},
bD:{
"^":"f;",
$isa:1,
"%":"Touch"},
bE:{
"^":"d_;dB:changedTouches=",
$isbE:1,
$isa:1,
"%":"TouchEvent"},
jC:{
"^":"eE;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bn(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.e(new P.L("Cannot assign element of immutable List."))},
S:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bD]},
$iso:1,
$isaS:1,
$isaQ:1,
"%":"TouchList"},
eD:{
"^":"f+bq;",
$isj:1,
$asj:function(){return[W.bD]},
$iso:1},
eE:{
"^":"eD+eA;",
$isj:1,
$asj:function(){return[W.bD]},
$iso:1},
d_:{
"^":"aN;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
jE:{
"^":"f7;v:height},A:width}",
"%":"HTMLVideoElement"},
jH:{
"^":"G;",
$isf:1,
$isG:1,
"%":"DOMWindow|Window"},
jL:{
"^":"f;b0:bottom=,v:height=,I:left=,bd:right=,a9:top=,A:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga9(b)
if(y==null?x==null:y===x){y=a.width
x=z.gA(b)
if(y==null?x==null:y===x){y=a.height
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(a.width)
w=J.C(a.height)
return W.d4(W.a2(W.a2(W.a2(W.a2(0,z),y),x),w))},
gbh:function(a){return H.d(new P.H(a.left,a.top),[null])},
$isT:1,
$asT:I.b9,
"%":"ClientRect"},
jM:{
"^":"aE;",
$isf:1,
"%":"DocumentType"},
jN:{
"^":"eo;",
gv:function(a){return a.height},
gA:function(a){return a.width},
"%":"DOMRect"},
jQ:{
"^":"D;",
$isG:1,
$isf:1,
"%":"HTMLFrameSetElement"},
bK:{
"^":"Z;a,b,c",
a_:function(a,b,c,d){var z=new W.v(0,this.a,this.b,W.x(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.u()
return z},
c2:function(a,b,c){return this.a_(a,null,b,c)}},
q:{
"^":"bK;a,b,c"},
v:{
"^":"fk;a,b,c,d,e",
b1:function(){if(this.b==null)return
this.bS()
this.b=null
this.d=null
return},
ba:function(a,b){if(this.b==null)return;++this.a
this.bS()},
aj:function(a){return this.ba(a,null)},
ce:function(){if(this.b==null||this.a<=0)return;--this.a
this.u()},
u:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dB(x,this.c,z,this.e)}},
bS:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dC(x,this.c,z,this.e)}}},
eA:{
"^":"a;",
gB:function(a){return new W.et(a,this.gj(a),-1,null)},
$isj:1,
$asj:null,
$iso:1},
et:{
"^":"a;a,b,c,d",
n:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c_(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gq:function(){return this.d}},
h6:{
"^":"a;a",
$isG:1,
$isf:1,
static:{h7:function(a){if(a===window)return a
else return new W.h6(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iB:{
"^":"aA;",
$isf:1,
"%":"SVGAElement"},
iC:{
"^":"fu;",
$isf:1,
"%":"SVGAltGlyphElement"},
iE:{
"^":"n;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iR:{
"^":"n;",
$isf:1,
"%":"SVGFEBlendElement"},
iS:{
"^":"n;",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iT:{
"^":"n;",
$isf:1,
"%":"SVGFEComponentTransferElement"},
iU:{
"^":"n;",
$isf:1,
"%":"SVGFECompositeElement"},
iV:{
"^":"n;",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
iW:{
"^":"n;",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
iX:{
"^":"n;",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
iY:{
"^":"n;",
$isf:1,
"%":"SVGFEFloodElement"},
iZ:{
"^":"n;",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
j_:{
"^":"n;",
$isf:1,
"%":"SVGFEImageElement"},
j0:{
"^":"n;",
$isf:1,
"%":"SVGFEMergeElement"},
j1:{
"^":"n;",
$isf:1,
"%":"SVGFEMorphologyElement"},
j2:{
"^":"n;",
$isf:1,
"%":"SVGFEOffsetElement"},
j3:{
"^":"n;",
$isf:1,
"%":"SVGFESpecularLightingElement"},
j4:{
"^":"n;",
$isf:1,
"%":"SVGFETileElement"},
j5:{
"^":"n;",
$isf:1,
"%":"SVGFETurbulenceElement"},
j6:{
"^":"n;",
$isf:1,
"%":"SVGFilterElement"},
aA:{
"^":"n;",
$isf:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
ja:{
"^":"aA;",
$isf:1,
"%":"SVGImageElement"},
je:{
"^":"n;",
$isf:1,
"%":"SVGMarkerElement"},
jf:{
"^":"n;",
$isf:1,
"%":"SVGMaskElement"},
jt:{
"^":"n;",
$isf:1,
"%":"SVGPatternElement"},
jv:{
"^":"n;",
$isf:1,
"%":"SVGScriptElement"},
n:{
"^":"az;",
gc4:function(a){return H.d(new W.q(a,"mousedown",!1),[null])},
gc5:function(a){return H.d(new W.q(a,"mouseenter",!1),[null])},
gc6:function(a){return H.d(new W.q(a,"mouseleave",!1),[null])},
gc7:function(a){return H.d(new W.q(a,"mousemove",!1),[null])},
gc8:function(a){return H.d(new W.q(a,"mouseout",!1),[null])},
gc9:function(a){return H.d(new W.q(a,"mouseover",!1),[null])},
gca:function(a){return H.d(new W.q(a,"mouseup",!1),[null])},
$isG:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jz:{
"^":"aA;",
$isf:1,
"%":"SVGSVGElement"},
jA:{
"^":"n;",
$isf:1,
"%":"SVGSymbolElement"},
cK:{
"^":"aA;",
"%":";SVGTextContentElement"},
jB:{
"^":"cK;",
$isf:1,
"%":"SVGTextPathElement"},
fu:{
"^":"cK;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jD:{
"^":"aA;",
$isf:1,
"%":"SVGUseElement"},
jF:{
"^":"n;",
$isf:1,
"%":"SVGViewElement"},
jP:{
"^":"n;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jR:{
"^":"n;",
$isf:1,
"%":"SVGCursorElement"},
jS:{
"^":"n;",
$isf:1,
"%":"SVGFEDropShadowElement"},
jT:{
"^":"n;",
$isf:1,
"%":"SVGGlyphRefElement"},
jU:{
"^":"n;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":"",
ca:{
"^":"f;j:length=",
$isa:1,
"%":"AudioBuffer"},
iG:{
"^":"G;",
d4:function(a,b,c,d){return a.decodeAudioData(b,H.a3(c,1),H.a3(d,1))},
dO:function(a,b){var z=H.d(new P.bI(H.d(new P.w(0,$.k,null),[P.ca])),[P.ca])
this.d4(a,b,new P.ea(z),new P.eb(z))
return z.a},
"%":"AudioContext|OfflineAudioContext|webkitAudioContext"},
ea:{
"^":"c:2;a",
$1:function(a){this.a.at(0,a)}},
eb:{
"^":"c:2;a",
$1:function(a){var z=this.a
if(a==null)z.b3("")
else z.b3(a)}}}],["","",,P,{
"^":"",
ju:{
"^":"f;",
du:function(a,b,c){return a.bindBuffer(b,c)},
dw:function(a,b){return a.blendEquation(b)},
dz:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dD:function(a,b){return a.clear(b)},
dE:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dF:function(a,b){return a.clearDepth(b)},
dG:function(a,b){return a.clearStencil(b)},
dI:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dL:function(a){return a.createBuffer()},
dM:function(a){return a.createProgram()},
dN:function(a,b){return a.createShader(b)},
dP:function(a,b){return a.depthFunc(b)},
dQ:function(a,b){return a.depthMask(b)},
dX:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
dY:function(a,b){return a.enable(b)},
dZ:function(a,b){return a.enableVertexAttribArray(b)},
cn:function(a,b,c){return a.getAttribLocation(b,c)},
cs:function(a,b,c){return a.getUniformLocation(b,c)},
c1:function(a,b){return a.lineWidth(b)},
cE:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cF:function(a,b,c,d){return a.stencilOp(b,c,d)},
es:function(a,b){return a.useProgram(b)},
eu:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iK:{
"^":"a;"}}],["","",,P,{
"^":"",
an:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d5:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
H:{
"^":"a;E:a>,K:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
l:function(a,b){var z,y
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
z=J.C(this.a)
y=J.C(this.b)
return P.d5(P.an(P.an(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gE(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gK(b)
if(typeof z!=="number")return z.k()
y=new P.H(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aG:function(a,b){var z,y,x,w
z=this.a
y=J.e_(b)
if(typeof z!=="number")return z.aG()
if(typeof y!=="number")return H.O(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aG()
if(typeof w!=="number")return H.O(w)
w=new P.H(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hE:{
"^":"a;",
gbd:function(a){return this.gI(this)+this.c},
gb0:function(a){return this.ga9(this)+this.d},
i:function(a){return"Rectangle ("+this.gI(this)+", "+this.b+") "+this.c+" x "+this.d},
l:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
if(this.gI(this)===z.gI(b)){y=this.b
z=y===z.ga9(b)&&this.a+this.c===z.gbd(b)&&y+this.d===z.gb0(b)}else z=!1
return z},
gt:function(a){var z=this.b
return P.d5(P.an(P.an(P.an(P.an(0,this.gI(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbh:function(a){var z=new P.H(this.gI(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
T:{
"^":"hE;I:a>,a9:b>,A:c>,v:d>",
$asT:null,
static:{fc:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.d(new P.T(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
r:function(a){return a},
b6:function(a){return a},
cr:{
"^":"f;",
$iscr:1,
"%":"ArrayBuffer"},
bx:{
"^":"f;",
$isbx:1,
"%":"DataView;ArrayBufferView;bv|cs|cu|bw|ct|cv|W"},
bv:{
"^":"bx;",
gj:function(a){return a.length},
$isaS:1,
$isaQ:1},
bw:{
"^":"cu;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
return a[b]},
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
a[b]=c}},
cs:{
"^":"bv+bq;",
$isj:1,
$asj:function(){return[P.bf]},
$iso:1},
cu:{
"^":"cs+ci;"},
W:{
"^":"cv;",
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.m]},
$iso:1},
ct:{
"^":"bv+bq;",
$isj:1,
$asj:function(){return[P.m]},
$iso:1},
cv:{
"^":"ct+ci;"},
jg:{
"^":"bw;",
$isj:1,
$asj:function(){return[P.bf]},
$iso:1,
"%":"Float32Array"},
jh:{
"^":"bw;",
$isj:1,
$asj:function(){return[P.bf]},
$iso:1,
"%":"Float64Array"},
ji:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$iso:1,
"%":"Int16Array"},
jj:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$iso:1,
"%":"Int32Array"},
jk:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$iso:1,
"%":"Int8Array"},
jl:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$iso:1,
"%":"Uint16Array"},
jm:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$iso:1,
"%":"Uint32Array"},
jn:{
"^":"W;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$iso:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jo:{
"^":"W;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$iso:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
du:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
i6:function(a){var z={}
a.C(0,new P.i7(z))
return z},
i8:function(a,b){var z=[]
return new P.ib(b,new P.i9([],z),new P.ia(z),new P.ic(z)).$1(a)},
i7:{
"^":"c:18;a",
$2:function(a,b){this.a[a]=b}},
i9:{
"^":"c:19;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
ia:{
"^":"c:20;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.h(z,a)
return z[a]}},
ic:{
"^":"c:21;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.h(z,a)
z[a]=b}},
ib:{
"^":"c:2;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.el(a.getTime(),!0)
if(a instanceof RegExp)throw H.e(new P.bF("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.aU()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.as)(w),++u){t=w[u]
x.p(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.N(a)
s=w.gj(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.O(s)
v=J.ar(x)
r=0
for(;r<s;++r)v.p(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
dr:[function(){var z=0,y=new P.ai(),x=1,w,v,u,t,s,r,q,p,o
function $async$dr(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
v=new q.fC(700,500,p.aU())
q=P
q.af("--n--")
q=E
q=q
p=Float64Array
o=H
u=new q.Q(new p(o.r(16)))
q=u
q.P()
q=F
u=new q.fF(600,400,1,1,1,0,0,null,"none",null,u,!1)
q=u
q.b=[]
q=u
p=F
q.ch=p.al(255,238,238,255)
q=E
q=q
p=Float64Array
o=H
t=new q.Q(new p(o.r(16)))
q=t
q.P()
q=G
s=new q.fM(null,!1,0,v,!1,!1,0,null,!1,!1,[t])
q=s
p=G
q.a=p.fL(400,600)
q=s
q.sD(u)
q=s
q.eh()
q=s
q.er()
q=s
u=q.gD()
q=P
t=q.f4(6,null,null)
q=E
q=q
p=Float64Array
o=H
r=new q.Q(new p(o.r(16)))
q=r
q.P()
q=F
r=new q.f9(v,t,"none",null,r,!1)
q=r
q.b=[]
q=r
q.b6()
q=u
q.ad(r)
q=s
z=!q.b?2:3
break
case 2:q=s
q.b=!0
q=s
q.an()
case 3:return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$dr,y,null)},"$0","ds",0,0,0],
eX:{
"^":"bC;e,f,r,a,b,c,d",
ay:function(a,b){var z=F.b1(null)
if(this.f!=null)z.a=F.al(153,0,0,0)
else z.a=F.al(153,255,170,170)
if(this.r||this.f==null)z.b=C.e
else z.b=C.w
b.av(a,new F.aG(0,0,100,200),z)},
ed:function(a,b){if(0<b&&b<200)if(0<a&&a<100)return!0
return!1},
cc:function(a,b,c,d,e,f,g){if((c==="pointerdown"||c==="pointermove")&&this.ed(d,e)){if(!this.r&&this.f!=null);this.r=!0}else{this.r=!1
if(this.f!=null);}return!1},
cO:function(a,b){this.e.b8(b).ep(new F.eZ(this))},
static:{eY:function(a,b){var z=new E.Q(new Float64Array(H.r(16)))
z.P()
z=new F.eX(a,null,!1,"none",null,z,!1)
z.b=[]
z.cO(a,b)
return z}}},
eZ:{
"^":"c:22;a",
$1:function(a){this.a.f=a}},
f9:{
"^":"bC;e,f,a,b,c,d",
b6:function(){var z=0,y=new P.ai(),x=1,w,v=this,u,t,s,r,q
function $async$b6(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=v
u=q.e,t=0
case 2:if(!(t<6)){z=4
break}s=t+1
q=F
r=q.eY(u,"assets/se_maoudamashii_retro0"+s+".ogg")
q=v
q.ad(r)
q=r
q=q.c
q.bi(0,t*100,150,0)
case 3:t=s
z=2
break
case 4:return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$b6,y,null)},
ay:function(a,b){var z=F.b1(null)
z.a=F.al(255,0,0,0)
z.b=C.e
b.av(a,new F.aG(0,0,600,150),z)}}},1],["","",,F,{
"^":"",
fz:{
"^":"a;"},
bC:{
"^":"a;",
ad:function(a){var z=0,y=new P.ai(),x=1,w,v=this,u,t,s
function $async$ad(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.w(0,s.k,null)
u.$builtinTypeInfo=[null]
t=u
t.aL(null)
z=2
return H.p(u,$async$ad,y)
case 2:t=v
t=t.b
t.push(a)
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$ad,y,null)},
bZ:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.as)(z),++x)z[x].bZ(a)},
cb:function(a,b){},
cj:function(a,b){var z,y,x
this.b4()
this.cb(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.as)(z),++x)z[x].cj(a,b)},
ay:function(a,b){},
b9:["cJ",function(a,b){var z,y,x,w,v,u
this.b4()
this.ay(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.as)(z),++w){v=z[w]
u=v.c
x.push(C.c.ga5(x).V(0,u))
b.aB()
v.b9(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aB()}}],
eq:["W",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b4()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.U(v.c)
u=v.eq(a,b,c,d,e)
a.T()
if(u)return!0}t=a.cr().b2(0)
t.ec()
y=new E.a_(new Float64Array(H.r(3)))
y.aF(d,e,0)
s=t.V(0,y)
return this.cc(a,b,c,s.gE(s),s.gK(s),d,e)}],
cc:function(a,b,c,d,e,f,g){return!1},
b4:function(){if(!this.d)this.d=!0}},
fB:{
"^":"a;"},
bB:{
"^":"a;"},
aG:{
"^":"a;a,b,c,d"},
cM:{
"^":"a;a",
i:function(a){return C.u.h(0,this.a)}},
fG:{
"^":"a;a,b,c",
cS:function(a){if(this.a==null)this.a=F.al(255,255,255,255)},
static:{b1:function(a){var z=new F.fG(a,C.e,1)
z.cS(a)
return z}}},
fA:{
"^":"a;a",
cR:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{al:function(a,b,c,d){var z=new F.fA(0)
z.cR(a,b,c,d)
return z}}},
fF:{
"^":"bC;e,f,r,x,y,z,Q,ch,a,b,c,d",
cb:function(a,b){var z,y,x,w
z=this.e
y=(a.gbj()-0)/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.Q(new Float64Array(H.r(16)))
y.P()
this.c=y
y.bi(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bm(0,z,z,1)},
b9:function(a,b){var z,y,x
z=new F.aG(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.c.ga5(x).V(0,y))
b.aB()
y=b.b
y.push(z)
b.as(a,z)
this.cJ(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.as(a,C.c.ga5(y))
else{y=a.a
b.as(a,new F.aG(0,0,y.c,y.d))}if(0>=x.length)return H.h(x,0)
x.pop()
b.aB()},
ay:function(a,b){var z,y
z=new F.aG(0,0,this.e,this.f)
y=F.b1(null)
y.a=this.ch
b.as(a,z)
b.av(a,z,y)}},
fH:{
"^":"a;",
gD:function(){return this.c$},
sD:function(a){this.c$=a},
c0:function(a){if(!this.e$){this.c$.bZ(this)
this.e$=!0}this.c$.cj(this,a)
this.eg()},
U:function(a){var z=this.f$
z.push(C.c.ga5(z).V(0,a))},
T:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cr:function(){return C.c.ga5(this.f$)}}}],["","",,G,{
"^":"",
cN:function(a,b,c){var z,y,x
z=G.cO(a,35633,b)
y=G.cO(a,35632,c)
x=J.dK(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
cO:function(a,b,c){var z,y
z=J.dL(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
fI:{
"^":"bB;a,b,c"},
fK:{
"^":"a;a,b,c,d",
cT:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a0(b)
y=C.d.a0(a)
x=document.createElement("canvas",null)
J.e6(x,z)
J.e5(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.e2(this.b,!0)},
static:{fL:function(a,b){var z=new G.fK(null,null,null,null)
z.cT(a,b)
return z}}},
fJ:{
"^":"fz;c,d,e,f,r,a,b",
e7:function(){var z,y
z=C.c.aw(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.c.aw(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cN(this.c,z,y)
z=C.c.aw(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.c.aw(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cN(this.c,z,y)},
N:function(a){J.c4(this.c,2960)
J.dN(this.c,515)
J.dG(this.c,0,0,0,1)
J.dH(this.c,1)
J.dI(this.c,0)
J.c4(this.c,3042)
switch(-1){case-1:J.dD(this.c,32774)
J.dE(this.c,770,771,770,32772)
break}J.dF(this.c,17664)},
av:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=b.a
y=b.b
x=z+b.c
w=y+b.d
v=[z,y,0,z,w,0,x,y,0,x,w,0]
u=c.a
t=c.b
s=c.c
J.c9(this.c,this.e)
r=this.c
q=J.c2(r)
r.bindBuffer(34962,q)
r.bufferData(34962,new Float32Array(H.b6(v)),35044)
r.bindBuffer(34962,null)
J.c0(this.c,34962,q)
r=this.c
q=J.c2(r)
r.bindBuffer(34963,q)
r.bufferData(34963,new Uint16Array(H.b6([0,1,3,2])),35044)
r.bindBuffer(34963,null)
J.c0(this.c,34963,q)
r=this.c
p=this.e
this.r.P()
o=this.r.bi(0,-1,1,0)
this.r=o
n=this.d
n=o.bm(0,2/n.c,-2/n.d,1)
this.r=n
n=n.V(0,C.c.ga5(this.a))
this.r=n
r.uniformMatrix4fv(J.bh(r,p,"u_mat"),!1,new Float32Array(H.b6(n.gm())))
n=this.c
p=this.e
u=u.a
n.uniform4fv(J.bh(n,p,"color"),new Float32Array(H.b6([(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255])))
u=this.c
u.uniform1f(J.bh(u,this.e,"u_point_size"),s)
m=J.e0(this.c,this.e,"vp")
J.e7(this.c,m,3,5126,!1,0,0)
J.dQ(this.c,m)
if(t===C.e)l=6
else{J.e3(this.c,s)
l=2}J.dO(this.c,l,v.length/3|0,5123,0)
J.c9(this.c,null)},
as:function(a,b){var z
J.c1(this.c,!1,!1,!1,!1)
J.c3(this.c,!1)
J.c7(this.c,7680,7681,7681)
J.c6(this.c,519,1,255)
z=F.b1(null)
z.a=F.al(255,255,255,255)
this.av(null,b,z)
J.c1(this.c,!0,!0,!0,!0)
J.c3(this.c,!0)
J.c7(this.c,7680,7680,7680)
J.c6(this.c,514,1,255)},
aB:function(){}},
fC:{
"^":"fB;b,c,a",
b8:function(a){var z=0,y=new P.ai(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$b8(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.d(new p.bI(o.d(new n.w(0,m.k,null),[null])),[null])
t=new (window.AudioContext||window.webkitAudioContext)()
s=new XMLHttpRequest()
q=C
q=q.m
q.ei(s,"GET",a)
q=s
q.responseType="arraybuffer"
q=P
q.af("---d-1--")
q=H
q=q
p=W
r=q.d(new p.bK(s,"load",!1),[null])
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
m=m.x(new l.fD(u,t,s))
l=r
p=new p.v(0,o,n,m,l.c)
o=H
q=q.d(p,[o.t(r,0)])
q.u()
q=H
q=q
p=W
r=q.d(new p.bK(s,"error",!1),[null])
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
m=m.x(new l.fE(u))
l=r
p=new p.v(0,o,n,m,l.c)
o=H
q=q.d(p,[o.t(r,0)])
q.u()
q=s
q.send()
q=u
x=q.a
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$b8,y,null)}},
fD:{
"^":"c:23;a,b,c",
$1:function(a){var z=0,y=new P.ai(),x=1,w,v=this,u,t,s,r,q,p,o,n
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t.af("---d-2-")
t=v
u=t.b
t=v
t=t.a
t=t
s=G
s=s
r=u
q=J
q=q
p=u
o=W
o=o
n=v
n=n.c
z=2
return H.p(q.dM(p,o.hU(n.response)),$async$$1,y)
case 2:t.at(0,new s.fI(r,c,null))
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$$1,y,null)}},
fE:{
"^":"c:24;a",
$1:function(a){this.a.b3(a)}},
fM:{
"^":"f8;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gbj:function(){return this.a.c},
eg:function(){this.e=!0},
an:function(){var z=0,y=new P.ai(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i
function $async$an(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:k=H
k=k
j=P
u=k.cy(new j.bk(Date.now(),!1))
k=v
t=k.a
k=E
k=k
j=Float64Array
i=H
s=new k.Q(new j(i.r(16)))
k=s
k.P()
k=E
k=k
j=Float64Array
i=H
r=new k.Q(new j(i.r(16)))
k=r
k.P()
k=G
q=new k.fJ(null,null,null,null,s,[r],[])
k=q
j=t
k.c=j.a
k=q
k.d=t
k=q
k.e7()
k=q
k.N(0)
p=0,o=0
case 2:k=v
if(!k.b){z=4
break}k=P
k=k
j=P
z=5
return H.p(k.ev(new j.ay(3e4),null,null),$async$an,y)
case 5:n=Date.now()
m=n-u
t=u+m
k=v
k=k
j=C
j=j.d
k.c0(j.a0(t))
k=v
k=k
j=C
j=j.d
k.c0(j.a0(t))
p+=m
if(m<0);else ;++o
k=v
k.e=!0
z=p>40?6:7
break
case 6:k=q
k.N(0)
k=v
k=k.gD()
k.b9(v,q)
k=v
k.e=!1
case 7:z=o>300?8:9
break
case 8:k=C
k=k.d
l="###fps  "+k.cM(p,o)
k=H
k.du(l)
p=0
o=0
case 9:case 3:u=n
z=2
break
case 4:return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$an,y,null)},
er:function(){var z,y,x,w
z=P.aU()
y=new G.fV(this,z)
x=new G.fU(this,z)
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchcancel",!1),[null])
H.d(new W.v(0,w.a,w.b,W.x(x),w.c),[H.t(w,0)]).u()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchend",!1),[null])
H.d(new W.v(0,w.a,w.b,W.x(x),w.c),[H.t(w,0)]).u()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchenter",!1),[null])
H.d(new W.v(0,w.a,w.b,W.x(y),w.c),[H.t(w,0)]).u()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchleave",!1),[null])
H.d(new W.v(0,w.a,w.b,W.x(y),w.c),[H.t(w,0)]).u()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchmove",!1),[null])
H.d(new W.v(0,w.a,w.b,W.x(y),w.c),[H.t(w,0)]).u()
w=this.a.b
w.toString
w=H.d(new W.q(w,"touchstart",!1),[null])
H.d(new W.v(0,w.a,w.b,W.x(y),w.c),[H.t(w,0)]).u()},
eh:function(){var z,y
z={}
z.a=!1
y=J.dS(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fN(z,this)),y.c),[H.t(y,0)]).u()
y=J.dY(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fO(z,this)),y.c),[H.t(y,0)]).u()
y=J.dT(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fP(z)),y.c),[H.t(y,0)]).u()
y=J.dU(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fQ(z,this)),y.c),[H.t(y,0)]).u()
y=J.dV(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fR(z,this)),y.c),[H.t(y,0)]).u()
y=J.dW(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fS(z)),y.c),[H.t(y,0)]).u()
y=J.dX(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fT(z)),y.c),[H.t(y,0)]).u()}},
f8:{
"^":"a+fH;"},
fV:{
"^":"c:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
for(z=J.c5(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.as)(z),++v){u=z[v]
t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
r=t-C.a.w(w.a.b.offsetLeft)
t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
q=s-C.a.w(w.a.b.offsetTop)
if(x.au(u.identifier)){t=w.gD()
s=u.identifier
if(typeof s!=="number")return s.k()
w.U(t.c)
t.W(w,s+1,"pointermove",r,q)
w.T()}else{x.p(0,u.identifier,u)
t=w.gD()
s=u.identifier
if(typeof s!=="number")return s.k()
w.U(t.c)
t.W(w,s+1,"pointerdown",r,q)
w.T()}}}},
fU:{
"^":"c:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=J.c5(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.as)(z),++v){u=z[v]
if(x.au(u.identifier)){t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
s=C.a.w(w.a.b.offsetLeft)
r=C.a.w(u.pageX)
q=C.a.w(u.pageY)
new P.H(r,q).$builtinTypeInfo=[null]
r=C.a.w(w.a.b.offsetTop)
x.a7(0,u.identifier)
p=w.gD()
o=u.identifier
if(typeof o!=="number")return o.k()
w.U(p.c)
p.W(w,o+1,"pointerup",t-s,q-r)
w.T()}}}},
fN:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gD()
x=J.i(a)
w=x.gO(a)
w=w.gE(w)
w.toString
x=x.gO(a)
x=x.gK(x)
x.toString
z.U(y.c)
y.W(z,0,"pointerdown",w,x)
z.T()}},
fO:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gD()
w=J.i(a)
v=w.gO(a)
v=v.gE(v)
v.toString
w=w.gO(a)
w=w.gK(w)
w.toString
y.U(x.c)
x.W(y,0,"pointerup",v,w)
y.T()
z.a=!1}}},
fP:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fQ:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gD()
w=J.i(a)
v=w.gO(a)
v=v.gE(v)
v.toString
w=w.gO(a)
w=w.gK(w)
w.toString
y.U(x.c)
x.W(y,0,"pointercancel",v,w)
y.T()
z.a=!1}}},
fR:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gD()
x=J.i(a)
w=x.gO(a)
w=w.gE(w)
w.toString
x=x.gO(a)
x=x.gK(x)
x.toString
z.U(y.c)
y.W(z,0,"pointermove",w,x)
z.T()}}},
fS:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fT:{
"^":"c:3;a",
$1:function(a){P.af("over offset="+H.b(a.geL())+":"+H.b(a.geM())+"  client="+H.b(a.geJ())+":"+H.b(a.geK())+" screen="+H.b(a.gex(a))+":"+H.b(a.gey(a)))
if(this.a.a);}}}],["","",,E,{
"^":"",
Q:{
"^":"a;m:a<",
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
gdW:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
am:function(a){var z,y,x
z=new Float64Array(H.r(4))
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
b2:function(a){var z=new E.Q(new Float64Array(H.r(16)))
z.aa(this)
return z},
V:function(a,b){var z,y,x
if(!!b.$isa0){z=new Float64Array(H.r(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a0(z)}if(!!b.$isa_){z=new Float64Array(H.r(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.a_(z)}if(4===b.gdW()){z=new Float64Array(H.r(16))
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
return new E.Q(z)}throw H.e(P.aw(b))},
k:function(a,b){var z,y
z=new Float64Array(H.r(16))
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
return new E.Q(z)},
bi:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isa0
x=y?b.gbj():1
if(!!z.$isa_||y){w=z.gE(b)
v=z.gK(b)
u=z.gev(b)}else{u=d
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
bm:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isa0
x=y?b.gbj():1
if(!!z.$isa_||y){w=z.gE(b)
v=z.gK(b)
u=z.gev(b)}else{u=d
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
P:function(){var z=this.a
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
ec:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
a_:{
"^":"a;m:a<",
aF:function(a,b,c){var z=this.a
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
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
k:function(a,b){var z,y,x,w
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
z=C.a.k(z[2],b.gm().h(0,2))
w=new E.a_(new Float64Array(H.r(3)))
w.aF(y,x,z)
return w},
V:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.O(b)
x=z[1]
z=z[2]
w=new E.a_(new Float64Array(H.r(3)))
w.aF(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dj(y*y+x*x+z*z))},
b2:function(a){var z=new E.a_(new Float64Array(H.r(3)))
z.aa(this)
return z},
gE:function(a){return this.a[0]},
gK:function(a){return this.a[1]}},
a0:{
"^":"a;m:a<",
bo:function(a,b,c,d){var z=this.a
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
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
k:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
w=C.a.k(z[2],b.gm().h(0,2))
z=C.a.k(z[3],b.gm().h(0,3))
v=new E.a0(new Float64Array(H.r(4)))
v.bo(y,x,w,z)
return v},
V:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.O(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a0(new Float64Array(H.r(4)))
v.bo(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dj(y*y+x*x+w*w+z*z))},
b2:function(a){var z=new E.a0(new Float64Array(H.r(4)))
z.aa(this)
return z},
gE:function(a){return this.a[0]},
gK:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cl.prototype
return J.eS.prototype}if(typeof a=="string")return J.aR.prototype
if(a==null)return J.eT.prototype
if(typeof a=="boolean")return J.eR.prototype
if(a.constructor==Array)return J.aB.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.N=function(a){if(typeof a=="string")return J.aR.prototype
if(a==null)return a
if(a.constructor==Array)return J.aB.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.ar=function(a){if(a==null)return a
if(a.constructor==Array)return J.aB.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.dm=function(a){if(typeof a=="number")return J.aC.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bG.prototype
return a}
J.id=function(a){if(typeof a=="number")return J.aC.prototype
if(typeof a=="string")return J.aR.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bG.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.at=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.id(a).k(a,b)}
J.a4=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).l(a,b)}
J.dA=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dm(a).aC(a,b)}
J.c_=function(a,b){if(a.constructor==Array||typeof a=="string"||H.it(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.N(a).h(a,b)}
J.dB=function(a,b,c,d){return J.i(a).cX(a,b,c,d)}
J.dC=function(a,b,c,d){return J.i(a).dm(a,b,c,d)}
J.c0=function(a,b,c){return J.i(a).du(a,b,c)}
J.dD=function(a,b){return J.i(a).dw(a,b)}
J.dE=function(a,b,c,d,e){return J.i(a).dz(a,b,c,d,e)}
J.dF=function(a,b){return J.ar(a).dD(a,b)}
J.dG=function(a,b,c,d,e){return J.i(a).dE(a,b,c,d,e)}
J.dH=function(a,b){return J.i(a).dF(a,b)}
J.dI=function(a,b){return J.i(a).dG(a,b)}
J.c1=function(a,b,c,d,e){return J.i(a).dI(a,b,c,d,e)}
J.dJ=function(a,b){return J.i(a).at(a,b)}
J.c2=function(a){return J.i(a).dL(a)}
J.dK=function(a){return J.i(a).dM(a)}
J.dL=function(a,b){return J.i(a).dN(a,b)}
J.dM=function(a,b){return J.i(a).dO(a,b)}
J.dN=function(a,b){return J.i(a).dP(a,b)}
J.c3=function(a,b){return J.i(a).dQ(a,b)}
J.dO=function(a,b,c,d,e){return J.i(a).dX(a,b,c,d,e)}
J.dP=function(a,b){return J.ar(a).S(a,b)}
J.c4=function(a,b){return J.i(a).dY(a,b)}
J.dQ=function(a,b){return J.i(a).dZ(a,b)}
J.dR=function(a,b){return J.ar(a).C(a,b)}
J.c5=function(a){return J.i(a).gdB(a)}
J.S=function(a){return J.i(a).gaf(a)}
J.C=function(a){return J.l(a).gt(a)}
J.bg=function(a){return J.ar(a).gB(a)}
J.au=function(a){return J.N(a).gj(a)}
J.dS=function(a){return J.i(a).gc4(a)}
J.dT=function(a){return J.i(a).gc5(a)}
J.dU=function(a){return J.i(a).gc6(a)}
J.dV=function(a){return J.i(a).gc7(a)}
J.dW=function(a){return J.i(a).gc8(a)}
J.dX=function(a){return J.i(a).gc9(a)}
J.dY=function(a){return J.i(a).gca(a)}
J.dZ=function(a){return J.i(a).gbh(a)}
J.e_=function(a){return J.i(a).gE(a)}
J.e0=function(a,b,c){return J.i(a).cn(a,b,c)}
J.e1=function(a){return J.i(a).co(a)}
J.e2=function(a,b){return J.i(a).cp(a,b)}
J.bh=function(a,b,c){return J.i(a).cs(a,b,c)}
J.e3=function(a,b){return J.i(a).c1(a,b)}
J.e4=function(a,b){return J.ar(a).a6(a,b)}
J.ag=function(a,b){return J.i(a).aE(a,b)}
J.e5=function(a,b){return J.i(a).sv(a,b)}
J.e6=function(a,b){return J.i(a).sA(a,b)}
J.c6=function(a,b,c,d){return J.i(a).cE(a,b,c,d)}
J.c7=function(a,b,c,d){return J.i(a).cF(a,b,c,d)}
J.c8=function(a){return J.dm(a).a0(a)}
J.av=function(a){return J.l(a).i(a)}
J.c9=function(a,b){return J.i(a).es(a,b)}
J.e7=function(a,b,c,d,e,f,g){return J.i(a).eu(a,b,c,d,e,f,g)}
var $=I.p
C.m=W.ey.prototype
C.c=J.aB.prototype
C.d=J.cl.prototype
C.a=J.aC.prototype
C.f=J.aR.prototype
C.v=J.fa.prototype
C.x=J.bG.prototype
C.k=new H.cf()
C.l=new P.h9()
C.b=new P.hF()
C.h=new P.ay(0)
C.n=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.i=function(hooks) { return hooks; }
C.o=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.p=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.q=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.r=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.j=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.t=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.u=new H.ex([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.cM(0)
C.w=new F.cM(1)
$.cz="$cachedFunction"
$.cA="$cachedInvocation"
$.P=0
$.ah=null
$.cb=null
$.bV=null
$.df=null
$.dv=null
$.b8=null
$.bb=null
$.bW=null
$.aa=null
$.ao=null
$.ap=null
$.bQ=!1
$.k=C.b
$.ch=0
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
I.$lazy(y,x,w)}})(["cj","$get$cj",function(){return H.eL()},"ck","$get$ck",function(){return new P.es(null)},"cP","$get$cP",function(){return H.R(H.b2({toString:function(){return"$receiver$"}}))},"cQ","$get$cQ",function(){return H.R(H.b2({$method$:null,toString:function(){return"$receiver$"}}))},"cR","$get$cR",function(){return H.R(H.b2(null))},"cS","$get$cS",function(){return H.R(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cW","$get$cW",function(){return H.R(H.b2(void 0))},"cX","$get$cX",function(){return H.R(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cU","$get$cU",function(){return H.R(H.cV(null))},"cT","$get$cT",function(){return H.R(function(){try{null.$method$}catch(z){return z.message}}())},"cZ","$get$cZ",function(){return H.R(H.cV(void 0))},"cY","$get$cY",function(){return H.R(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bJ","$get$bJ",function(){return P.fY()},"aq","$get$aq",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bu]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.Y]},{func:1,args:[,],opt:[,]},{func:1,ret:P.U,args:[P.m]},{func:1,args:[W.bE]},{func:1,args:[,P.U]},{func:1,args:[P.U]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.Y]},{func:1,ret:P.bS},{func:1,void:true,args:[P.a],opt:[P.Y]},{func:1,void:true,args:[,P.Y]},{func:1,args:[,,]},{func:1,args:[P.cI,,]},{func:1,args:[P.U,,]},{func:1,ret:P.m,args:[,]},{func:1,args:[P.m]},{func:1,args:[P.m,,]},{func:1,args:[F.bB]},{func:1,ret:P.M,args:[W.aF]},{func:1,args:[W.aF]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iz(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dx(F.ds(),b)},[])
else (function(b){H.dx(F.ds(),b)})([])})})()