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
jf:{
"^":"a;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bd:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ba:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bW==null){H.im()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.bF("Return interceptor for "+H.b(y(a,z))))}w=H.iw(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.v
else return C.x}return w},
f:{
"^":"a;",
l:function(a,b){return a===b},
gt:function(a){return H.Y(a)},
i:["cK",function(a){return H.aY(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLUniformLocation"},
eT:{
"^":"f;",
i:function(a){return String(a)},
gt:function(a){return a?519018:218159},
$isbS:1},
eV:{
"^":"f;",
l:function(a,b){return null==b},
i:function(a){return"null"},
gt:function(a){return 0}},
cm:{
"^":"f;",
gt:function(a){return 0},
$iseW:1},
fc:{
"^":"cm;"},
bG:{
"^":"cm;",
i:function(a){return String(a)}},
aB:{
"^":"f;",
bW:function(a,b){if(!!a.immutable$list)throw H.e(new P.L(b))},
dE:function(a,b){if(!!a.fixed$length)throw H.e(new P.L(b))},
C:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.F(a))}},
a8:function(a,b){return H.d(new H.bt(a,b),[null,null])},
ax:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
U:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
ge1:function(a){if(a.length>0)return a[0]
throw H.e(H.bo())},
ga7:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bo())},
bo:function(a,b,c,d,e){var z,y,x
this.bW(a,"set range")
P.cD(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.e(H.eQ())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aP(a,"[","]")},
gB:function(a){return new J.eb(a,a.length,0,null)},
gt:function(a){return H.Y(a)},
gj:function(a){return a.length},
sj:function(a,b){this.dE(a,"set length")
if(b<0)throw H.e(P.aZ(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.u(a,b))
if(b>=a.length||b<0)throw H.e(H.u(a,b))
return a[b]},
p:function(a,b,c){this.bW(a,"indexed set")
if(b>=a.length||!1)throw H.e(H.u(a,b))
a[b]=c},
$isaQ:1,
$isj:1,
$asj:null,
$isp:1,
static:{eS:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.e(P.aw("Length must be a non-negative integer: "+H.b(a)))
z=H.d(new Array(a),[b])
z.fixed$length=Array
return z}}},
je:{
"^":"aB;"},
eb:{
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
bd:function(a,b){return a%b},
a2:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.L(""+a))},
w:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.L(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.e(H.ae(b))
return a+b},
cO:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a2(a/b)},
ae:function(a,b){return(a|0)===a?a/b|0:this.a2(a/b)},
bR:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aD:function(a,b){if(typeof b!=="number")throw H.e(H.ae(b))
return a<b},
$isaL:1},
cl:{
"^":"aC;",
$isaL:1,
$ism:1},
eU:{
"^":"aC;",
$isaL:1},
aR:{
"^":"f;",
dJ:function(a,b){if(b>=a.length)throw H.e(H.u(a,b))
return a.charCodeAt(b)},
k:function(a,b){if(typeof b!=="string")throw H.e(P.ea(b,null,null))
return a+b},
cJ:function(a,b,c){H.di(b)
if(c==null)c=a.length
H.di(c)
if(b<0)throw H.e(P.b_(b,null,null))
if(typeof c!=="number")return H.O(c)
if(b>c)throw H.e(P.b_(b,null,null))
if(c>a.length)throw H.e(P.b_(c,null,null))
return a.substring(b,c)},
cI:function(a,b){return this.cJ(a,b,null)},
gI:function(a){return a.length===0},
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
aI:function(a,b){var z=a.ai(b)
if(!init.globalState.d.cy)init.globalState.f.al()
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
init.globalState=new H.hA(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cj()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hd(P.br(null,H.aH),0)
y.z=P.aT(null,null,null,P.m,H.bN)
y.ch=P.aT(null,null,null,P.m,null)
if(y.x===!0){x=new H.hz()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eJ,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hB)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aT(null,null,null,P.m,H.b0)
w=P.aj(null,null,null,P.m)
v=new H.b0(0,null,!1)
u=new H.bN(y,x,w,init.createNewIsolate(),v,new H.a7(H.be()),new H.a7(H.be()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
w.a6(0,0)
u.br(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aK()
x=H.af(y,[y]).Z(a)
if(x)u.ai(new H.iz(z,a))
else{y=H.af(y,[y,y]).Z(a)
if(y)u.ai(new H.iA(z,a))
else u.ai(a)}init.globalState.f.al()},
eN:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eO()
return},
eO:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.L("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.L("Cannot extract URI from \""+H.b(z)+"\""))},
eJ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b3(!0,[]).a_(b.data)
y=J.N(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b3(!0,[]).a_(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b3(!0,[]).a_(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aT(null,null,null,P.m,H.b0)
p=P.aj(null,null,null,P.m)
o=new H.b0(0,null,!1)
n=new H.bN(y,q,p,init.createNewIsolate(),o,new H.a7(H.be()),new H.a7(H.be()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
p.a6(0,0)
n.br(0,o)
init.globalState.f.a.T(new H.aH(n,new H.eK(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.al()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.ah(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.al()
break
case"close":init.globalState.ch.a9(0,$.$get$ck().h(0,a))
a.terminate()
init.globalState.f.al()
break
case"log":H.eI(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a9(["command","print","msg",z])
q=new H.aa(!0,P.a8(null,P.m)).G(q)
y.toString
self.postMessage(q)}else P.ag(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
eI:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a9(["command","log","msg",a])
x=new H.aa(!0,P.a8(null,P.m)).G(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.y(w)
throw H.e(P.aO(z))}},
eL:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cz=$.cz+("_"+y)
$.cA=$.cA+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.ah(f,["spawned",new H.b5(y,x),w,z.r])
x=new H.eM(a,b,c,d,z)
if(e===!0){z.bU(w,w)
init.globalState.f.a.T(new H.aH(z,x,"start isolate"))}else x.$0()},
hU:function(a){return new H.b3(!0,[]).a_(new H.aa(!1,P.a8(null,P.m)).G(a))},
iz:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iA:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hA:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hB:function(a){var z=P.a9(["command","print","msg",a])
return new H.aa(!0,P.a8(null,P.m)).G(z)}}},
bN:{
"^":"a;a,b,c,eg:d<,dM:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bU:function(a,b){if(!this.f.l(0,a))return
if(this.Q.a6(0,b)&&!this.y)this.y=!0
this.b_()},
en:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a9(0,a)
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
if(w===y.c)y.bA();++y.d}this.y=!1}this.b_()},
dv:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
em:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.B(new P.L("removeRange"))
P.cD(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cD:function(a,b){if(!this.r.l(0,a))return
this.db=b},
e5:function(a,b,c){var z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){J.ah(a,c)
return}z=this.cx
if(z==null){z=P.br(null,null)
this.cx=z}z.T(new H.hu(a,c))},
e3:function(a,b){var z
if(!this.r.l(0,a))return
z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){this.b8()
return}z=this.cx
if(z==null){z=P.br(null,null)
this.cx=z}z.T(this.geh())},
e6:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ag(a)
if(b!=null)P.ag(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.av(a)
y[1]=b==null?null:J.av(b)
for(x=new P.cn(z,z.r,null,null),x.c=z.e;x.n();)J.ah(x.d,y)},
ai:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.C(u)
w=t
v=H.y(u)
this.e6(w,v)
if(this.db===!0){this.b8()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geg()
if(this.cx!=null)for(;t=this.cx,!t.gI(t);)this.cx.ce().$0()}return y},
c4:function(a){return this.b.h(0,a)},
br:function(a,b){var z=this.b
if(z.av(a))throw H.e(P.aO("Registry: ports must be registered only once."))
z.p(0,a,b)},
b_:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.b8()},
b8:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.P(0)
for(z=this.b,y=z.gcm(z),y=y.gB(y);y.n();)y.gq().d1()
z.P(0)
this.c.P(0)
init.globalState.z.a9(0,this.a)
this.dx.P(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
J.ah(w,z[v])}this.ch=null}},"$0","geh",0,0,1]},
hu:{
"^":"c:1;a,b",
$0:function(){J.ah(this.a,this.b)}},
hd:{
"^":"a;a,b",
dT:function(){var z=this.a
if(z.b===z.c)return
return z.ce()},
cj:function(){var z,y,x
z=this.dT()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.av(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gI(y)}else y=!1
else y=!1
else y=!1
if(y)H.B(P.aO("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gI(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a9(["command","close"])
x=new H.aa(!0,P.a8(null,P.m)).G(x)
y.toString
self.postMessage(x)}return!1}z.el()
return!0},
bL:function(){if(self.window!=null)new H.he(this).$0()
else for(;this.cj(););},
al:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bL()
else try{this.bL()}catch(x){w=H.C(x)
z=w
y=H.y(x)
w=init.globalState.Q
v=P.a9(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.aa(!0,P.a8(null,P.m)).G(v)
w.toString
self.postMessage(v)}}},
he:{
"^":"c:1;a",
$0:function(){if(!this.a.cj())return
P.cL(C.h,this)}},
aH:{
"^":"a;a,b,c",
el:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ai(this.b)}},
hz:{
"^":"a;"},
eK:{
"^":"c:0;a,b,c,d,e,f",
$0:function(){H.eL(this.a,this.b,this.c,this.d,this.e,this.f)}},
eM:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aK()
w=H.af(x,[x,x]).Z(y)
if(w)y.$2(this.b,this.c)
else{x=H.af(x,[x]).Z(y)
if(x)y.$1(this.b)
else y.$0()}}z.b_()}},
d1:{
"^":"a;"},
b5:{
"^":"d1;b,a",
aF:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbD())return
x=H.hU(b)
if(z.gdM()===y){y=J.N(x)
switch(y.h(x,0)){case"pause":z.bU(y.h(x,1),y.h(x,2))
break
case"resume":z.en(y.h(x,1))
break
case"add-ondone":z.dv(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.em(y.h(x,1))
break
case"set-errors-fatal":z.cD(y.h(x,1),y.h(x,2))
break
case"ping":z.e5(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.e3(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a6(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a9(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(b)
y.a.T(new H.aH(z,new H.hD(this,x),w))},
l:function(a,b){if(b==null)return!1
return b instanceof H.b5&&J.a5(this.b,b.b)},
gt:function(a){return this.b.gaV()}},
hD:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbD())z.cY(this.b)}},
bP:{
"^":"d1;b,c,a",
aF:function(a,b){var z,y,x
z=P.a9(["command","message","port",this,"msg",b])
y=new H.aa(!0,P.a8(null,P.m)).G(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
l:function(a,b){if(b==null)return!1
return b instanceof H.bP&&J.a5(this.b,b.b)&&J.a5(this.a,b.a)&&J.a5(this.c,b.c)},
gt:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cE()
y=this.a
if(typeof y!=="number")return y.cE()
x=this.c
if(typeof x!=="number")return H.O(x)
return(z<<16^y<<8^x)>>>0}},
b0:{
"^":"a;aV:a<,b,bD:c<",
d1:function(){this.c=!0
this.b=null},
cY:function(a){if(this.c)return
this.dd(a)},
dd:function(a){return this.b.$1(a)},
$isfd:1},
fx:{
"^":"a;a,b,c",
cS:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.T(new H.aH(y,new H.fz(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a4(new H.fA(this,b),0),a)}else throw H.e(new P.L("Timer greater than 0."))},
static:{fy:function(a,b){var z=new H.fx(!0,!1,null)
z.cS(a,b)
return z}}},
fz:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fA:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
H.bc()
this.b.$0()}},
a7:{
"^":"a;aV:a<",
gt:function(a){var z=this.a
if(typeof z!=="number")return z.eB()
z=C.a.bR(z,0)^C.a.ae(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
l:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a7){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aa:{
"^":"a;a,b",
G:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.p(0,a,z.gj(z))
z=J.l(a)
if(!!z.$iscr)return["buffer",a]
if(!!z.$isbx)return["typed",a]
if(!!z.$isaQ)return this.cz(a)
if(!!z.$iseH){x=this.gcu()
w=a.gc0()
w=H.aW(w,x,H.I(w,"K",0),null)
w=P.bs(w,!0,H.I(w,"K",0))
z=z.gcm(a)
z=H.aW(z,x,H.I(z,"K",0),null)
return["map",w,P.bs(z,!0,H.I(z,"K",0))]}if(!!z.$iseW)return this.cA(a)
if(!!z.$isf)this.cl(a)
if(!!z.$isfd)this.am(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb5)return this.cB(a)
if(!!z.$isbP)return this.cC(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.am(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa7)return["capability",a.a]
if(!(a instanceof P.a))this.cl(a)
return["dart",init.classIdExtractor(a),this.cw(init.classFieldsExtractor(a))]},"$1","gcu",2,0,2],
am:function(a,b){throw H.e(new P.L(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cl:function(a){return this.am(a,null)},
cz:function(a){var z=this.cv(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.am(a,"Can't serialize indexable: ")},
cv:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.G(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cw:function(a){var z
for(z=0;z<a.length;++z)C.c.p(a,z,this.G(a[z]))
return a},
cA:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.am(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.G(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cC:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cB:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaV()]
return["raw sendport",a]}},
b3:{
"^":"a;a,b",
a_:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aw("Bad serialized message: "+H.b(a)))
switch(C.c.ge1(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=this.ag(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ag(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ag(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ag(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.dW(a)
case"sendport":return this.dX(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dV(a)
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
this.ag(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","gdU",2,0,2],
ag:function(a){var z,y,x
z=J.N(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.O(x)
if(!(y<x))break
z.p(a,y,this.a_(z.h(a,y)));++y}return a},
dW:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aU()
this.b.push(w)
y=J.e4(y,this.gdU()).bg(0)
for(z=J.N(y),v=J.N(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.p(0,y[u],this.a_(v.h(x,u)))}return w},
dX:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.a5(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c4(w)
if(u==null)return
t=new H.b5(u,x)}else t=new H.bP(y,w,x)
this.b.push(t)
return t},
dV:function(a){var z,y,x,w,v,u,t
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
w[z.h(y,u)]=this.a_(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
ek:function(){throw H.e(new P.L("Cannot modify unmodifiable Map"))},
ih:function(a){return init.types[a]},
iv:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaS},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.av(a)
if(typeof z!=="string")throw H.e(H.ae(a))
return z},
Y:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cB:function(a){var z,y
z=C.j(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.f.dJ(z,0)===36)z=C.f.cI(z,1)
return(z+H.dq(H.bU(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aY:function(a){return"Instance of '"+H.cB(a)+"'"},
E:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cy:function(a){return a.b?H.E(a).getUTCMilliseconds()+0:H.E(a).getMilliseconds()+0},
aX:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ae(a))
return a[b]},
by:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ae(a))
a[b]=c},
O:function(a){throw H.e(H.ae(a))},
h:function(a,b){if(a==null)J.au(a)
throw H.e(H.u(a,b))},
u:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a6(!0,b,"index",null)
z=J.au(a)
if(!(b<0)){if(typeof z!=="number")return H.O(z)
y=b>=z}else y=!0
if(y)return P.bn(b,a,"index",null,z)
return P.b_(b,"index",null)},
ae:function(a){return new P.a6(!0,a,null,null)},
dj:function(a){return a},
di:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.ae(a))
return a},
e:function(a){var z
if(a==null)a=new P.cx()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dz})
z.name=""}else z.toString=H.dz
return z},
dz:function(){return J.av(this.dartException)},
B:function(a){throw H.e(a)},
as:function(a){throw H.e(new P.F(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iC(a)
if(a==null)return
if(a instanceof H.bm)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bR(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bp(H.b(y)+" (Error "+w+")",null))
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
l=u.K(y)
if(l!=null)return z.$1(H.bp(y,l))
else{l=t.K(y)
if(l!=null){l.method="call"
return z.$1(H.bp(y,l))}else{l=s.K(y)
if(l==null){l=r.K(y)
if(l==null){l=q.K(y)
if(l==null){l=p.K(y)
if(l==null){l=o.K(y)
if(l==null){l=r.K(y)
if(l==null){l=n.K(y)
if(l==null){l=m.K(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cw(y,l==null?null:l.method))}}return z.$1(new H.fZ(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cG()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a6(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cG()
return a},
y:function(a){var z
if(a instanceof H.bm)return a.b
if(a==null)return new H.d6(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d6(a,null)},
iy:function(a){if(a==null||typeof a!='object')return J.D(a)
else return H.Y(a)},
dl:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
ip:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.l(c,0))return H.aI(b,new H.iq(a))
else if(z.l(c,1))return H.aI(b,new H.ir(a,d))
else if(z.l(c,2))return H.aI(b,new H.is(a,d,e))
else if(z.l(c,3))return H.aI(b,new H.it(a,d,e,f))
else if(z.l(c,4))return H.aI(b,new H.iu(a,d,e,f,g))
else throw H.e(P.aO("Unsupported number of arguments for wrapped closure"))},
a4:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ip)
a.$identity=z
return z},
ei:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.fg(z).r}else x=c
w=d?Object.create(new H.fl().constructor.prototype):Object.create(new H.bi(null,null,null,null).constructor.prototype)
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
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ih(g)}}(x)
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
ef:function(a,b,c,d){var z=H.bj
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cd:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eh(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ef(y,!w,z,b)
if(y===0){w=$.ai
if(w==null){w=H.aM("self")
$.ai=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.P
$.P=J.at(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ai
if(v==null){v=H.aM("self")
$.ai=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.P
$.P=J.at(w,1)
return new Function(v+H.b(w)+"}")()},
eg:function(a,b,c,d){var z,y
z=H.bj
y=H.cc
switch(b?-1:a){case 0:throw H.e(new H.fh("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eh:function(a,b){var z,y,x,w,v,u,t,s
z=H.ee()
y=$.cb
if(y==null){y=H.aM("receiver")
$.cb=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eg(w,!u,x,b)
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
return H.ei(a,b,z,!!d,e,f)},
iB:function(a){throw H.e(new P.em("Cyclic initialization for static "+H.b(a)))},
af:function(a,b,c){return new H.fi(a,b,c,null)},
aK:function(){return C.k},
be:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
o:function(a,b,c){var z
if(b===0){J.dJ(c,a)
return}else if(b===1){c.bX(H.C(a),H.y(a))
return}if(!!J.l(a).$isM)z=a
else{z=H.d(new P.w(0,$.k,null),[null])
z.aM(a)}z.aB(H.de(b,0),new H.i4(b))
return c.ge2()},
de:function(a,b){return new H.i1(b,function(c,d){while(true)try{a(c,d)
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
i3:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.J(a[y],b[y]))return!1
return!0},
b7:function(a,b,c){return H.bX(a,b,H.dn(b,c))},
J:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dp(a,b)
if('func' in a)return b.builtin$cls==="ew"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bZ(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.bZ(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.i3(H.dy(v,z),x)},
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
if(!(H.J(o,n)||H.J(n,o)))return!1}}return H.i2(a.named,b.named)},
bX:function(a,b,c){return a.apply(b,c)},
k0:function(a){var z=$.bV
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
k_:function(a){return H.Y(a)},
jZ:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iw:function(a){var z,y,x,w,v,u
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
ix:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bd(z,!1,null,!!z.$isaS)
else return J.bd(z,c,null,null)},
im:function(){if(!0===$.bW)return
$.bW=!0
H.io()},
io:function(){var z,y,x,w,v,u,t,s
$.b8=Object.create(null)
$.bb=Object.create(null)
H.ii()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dv.$1(v)
if(u!=null){t=H.ix(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ii:function(){var z,y,x,w,v,u,t
z=C.n()
z=H.ad(C.o,H.ad(C.p,H.ad(C.i,H.ad(C.i,H.ad(C.r,H.ad(C.q,H.ad(C.t(C.j),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bV=new H.ij(v)
$.df=new H.ik(u)
$.dv=new H.il(t)},
ad:function(a,b){return a(b)||b},
ej:{
"^":"a;",
i:function(a){return P.cq(this)},
p:function(a,b,c){return H.ek()}},
ez:{
"^":"ej;a",
aU:function(){var z=this.$map
if(z==null){z=new H.aD(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dl(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aU().h(0,b)},
C:function(a,b){this.aU().C(0,b)},
gj:function(a){var z=this.aU()
return z.gj(z)}},
ff:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fg:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.ff(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fY:{
"^":"a;a,b,c,d,e,f",
K:function(a){var z,y,x
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
return new H.fY(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b2:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},cV:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cw:{
"^":"z;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
eY:{
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
return new H.eY(a,y,z?null:b.receiver)}}},
fZ:{
"^":"z;a",
i:function(a){var z=this.a
return C.f.gI(z)?"Error":"Error: "+z}},
iC:{
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
iq:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
ir:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
is:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
it:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iu:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"a;",
i:function(a){return"Closure '"+H.cB(this)+"'"},
gcn:function(){return this},
gcn:function(){return this}},
cJ:{
"^":"c;"},
fl:{
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
if(z==null)y=H.Y(this.a)
else y=typeof z!=="object"?J.D(z):H.Y(z)
z=H.Y(this.b)
if(typeof y!=="number")return y.eC()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aY(z)},
static:{bj:function(a){return a.a},cc:function(a){return a.c},ee:function(){var z=$.ai
if(z==null){z=H.aM("self")
$.ai=z}return z},aM:function(a){var z,y,x,w,v
z=new H.bi("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fh:{
"^":"z;a",
i:function(a){return"RuntimeError: "+this.a}},
cF:{
"^":"a;"},
fi:{
"^":"cF;a,b,c,d",
Z:function(a){var z=this.d8(a)
return z==null?!1:H.dp(z,this.aa())},
d8:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
aa:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isjJ)z.void=true
else if(!x.$iscf)z.ret=y.aa()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cE(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cE(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dk(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aa()}z.named=w}return z},
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
x+=H.b(z[s].aa())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cE:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aa())
return z}}},
cf:{
"^":"cF;",
i:function(a){return"dynamic"},
aa:function(){return}},
bm:{
"^":"a;a,M:b<"},
i4:{
"^":"c:5;a",
$2:function(a,b){H.de(this.a,1).$1(new H.bm(a,b))}},
i1:{
"^":"c:2;a,b",
$1:function(a){this.b(this.a,a)}},
aD:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gI:function(a){return this.a===0},
gc0:function(){return H.d(new H.f2(this),[H.t(this,0)])},
gcm:function(a){return H.aW(this.gc0(),new H.eX(this),H.t(this,0),H.t(this,1))},
av:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.d4(z,a)}else return this.ea(a)},
ea:function(a){var z=this.d
if(z==null)return!1
return this.ak(this.O(z,this.aj(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.O(z,b)
return y==null?null:y.ga0()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.O(x,b)
return y==null?null:y.ga0()}else return this.eb(b)},
eb:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.O(z,this.aj(a))
x=this.ak(y,a)
if(x<0)return
return y[x].ga0()},
p:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aX()
this.b=z}this.bq(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aX()
this.c=y}this.bq(y,b,c)}else this.ed(b,c)},
ed:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aX()
this.d=z}y=this.aj(a)
x=this.O(z,y)
if(x==null)this.aZ(z,y,[this.aY(a,b)])
else{w=this.ak(x,a)
if(w>=0)x[w].sa0(b)
else x.push(this.aY(a,b))}},
a9:function(a,b){if(typeof b==="string")return this.bK(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bK(this.c,b)
else return this.ec(b)},
ec:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.O(z,this.aj(a))
x=this.ak(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bS(w)
return w.ga0()},
P:function(a){if(this.a>0){this.f=null
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
bq:function(a,b,c){var z=this.O(a,b)
if(z==null)this.aZ(a,b,this.aY(b,c))
else z.sa0(c)},
bK:function(a,b){var z
if(a==null)return
z=this.O(a,b)
if(z==null)return
this.bS(z)
this.bx(a,b)
return z.ga0()},
aY:function(a,b){var z,y
z=new H.f1(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bS:function(a){var z,y
z=a.gdm()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aj:function(a){return J.D(a)&0x3ffffff},
ak:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].gbZ(),b))return y
return-1},
i:function(a){return P.cq(this)},
O:function(a,b){return a[b]},
aZ:function(a,b,c){a[b]=c},
bx:function(a,b){delete a[b]},
d4:function(a,b){return this.O(a,b)!=null},
aX:function(){var z=Object.create(null)
this.aZ(z,"<non-identifier-key>",z)
this.bx(z,"<non-identifier-key>")
return z},
$iseH:1},
eX:{
"^":"c:2;a",
$1:function(a){return this.a.h(0,a)}},
f1:{
"^":"a;bZ:a<,a0:b@,c,dm:d<"},
f2:{
"^":"K;a",
gj:function(a){return this.a.a},
gB:function(a){var z,y
z=this.a
y=new H.f3(z,z.r,null,null)
y.c=z.e
return y},
C:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.F(z))
y=y.c}},
$isp:1},
f3:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.F(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ij:{
"^":"c:2;a",
$1:function(a){return this.a(a)}},
ik:{
"^":"c:9;a",
$2:function(a,b){return this.a(a,b)}},
il:{
"^":"c:10;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bo:function(){return new P.ak("No element")},
eQ:function(){return new P.ak("Too few elements")},
fv:function(a){return a.geH()},
aV:{
"^":"K;",
gB:function(a){return new H.co(this,this.gj(this),0,null)},
C:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.U(0,y))
if(z!==this.gj(this))throw H.e(new P.F(this))}},
a8:function(a,b){return H.d(new H.bt(this,b),[null,null])},
bh:function(a,b){var z,y,x
if(b){z=H.d([],[H.I(this,"aV",0)])
C.c.sj(z,this.gj(this))}else z=H.d(Array(this.gj(this)),[H.I(this,"aV",0)])
for(y=0;y<this.gj(this);++y){x=this.U(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bg:function(a){return this.bh(a,!0)},
$isp:1},
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
return!1}this.d=y.U(z,w);++this.c
return!0}},
cp:{
"^":"K;a,b",
gB:function(a){var z=new H.f7(null,J.bg(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.au(this.a)},
$asK:function(a,b){return[b]},
static:{aW:function(a,b,c,d){if(!!J.l(a).$isp)return H.d(new H.cg(a,b),[c,d])
return H.d(new H.cp(a,b),[c,d])}}},
cg:{
"^":"cp;a,b",
$isp:1},
f7:{
"^":"eR;a,b,c",
n:function(){var z=this.b
if(z.n()){this.a=this.aT(z.gq())
return!0}this.a=null
return!1},
gq:function(){return this.a},
aT:function(a){return this.c.$1(a)}},
bt:{
"^":"aV;a,b",
gj:function(a){return J.au(this.a)},
U:function(a,b){return this.aT(J.dP(this.a,b))},
aT:function(a){return this.b.$1(a)},
$asaV:function(a,b){return[b]},
$asK:function(a,b){return[b]},
$isp:1},
ci:{
"^":"a;"}}],["","",,H,{
"^":"",
dk:function(a){var z=H.d(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
h_:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.i5()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a4(new P.h1(z),1)).observe(y,{childList:true})
return new P.h0(z,y,x)}else if(self.setImmediate!=null)return P.i6()
return P.i7()},
jL:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a4(new P.h2(a),0))},"$1","i5",2,0,4],
jM:[function(a){++init.globalState.f.b
self.setImmediate(H.a4(new P.h3(a),0))},"$1","i6",2,0,4],
jN:[function(a){P.bA(C.h,a)},"$1","i7",2,0,4],
d9:function(a,b){var z=H.aK()
z=H.af(z,[z,z]).Z(a)
if(z){b.toString
return a}else{b.toString
return a}},
ex:function(a,b,c){var z=new P.w(0,$.k,null)
z.$builtinTypeInfo=[c]
P.cL(a,new P.ey(b,z))
return z},
W:function(a){return H.d(new P.bI(H.d(new P.w(0,$.k,null),[a])),[a])},
hV:function(a,b,c){$.k.toString
a.H(b,c)},
hY:function(){var z,y
for(;z=$.ab,z!=null;){$.ap=null
y=z.c
$.ab=y
if(y==null)$.ao=null
$.k=z.b
z.dC()}},
jY:[function(){$.bQ=!0
try{P.hY()}finally{$.k=C.b
$.ap=null
$.bQ=!1
if($.ab!=null)$.$get$bJ().$1(P.dh())}},"$0","dh",0,0,1],
dd:function(a){if($.ab==null){$.ao=a
$.ab=a
if(!$.bQ)$.$get$bJ().$1(P.dh())}else{$.ao.c=a
$.ao=a}},
dw:function(a){var z,y
z=$.k
if(C.b===z){P.ac(null,null,C.b,a)
return}z.toString
if(C.b.gb6()===z){P.ac(null,null,z,a)
return}y=$.k
P.ac(null,null,y,y.b0(a,!0))},
jB:function(a,b){var z,y,x
z=H.d(new P.d7(null,null,null,0),[b])
y=z.gdh()
x=z.gdj()
z.a=a.a1(y,!0,z.gdi(),x)
return z},
i_:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.C(u)
z=t
y=H.y(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.S(x)
w=t
v=x.gM()
c.$2(w,v)}}},
hQ:function(a,b,c,d){var z=a.b2()
if(!!J.l(z).$isM)z.bl(new P.hT(b,c,d))
else b.H(c,d)},
hR:function(a,b){return new P.hS(a,b)},
cL:function(a,b){var z=$.k
if(z===C.b){z.toString
return P.bA(a,b)}return P.bA(a,z.b0(b,!0))},
bA:function(a,b){var z=C.d.ae(a.a,1000)
return H.fy(z<0?0:z,b)},
bH:function(a){var z=$.k
$.k=a
return z},
aJ:function(a,b,c,d,e){var z,y,x
z=new P.d0(new P.hZ(d,e),C.b,null)
y=$.ab
if(y==null){P.dd(z)
$.ap=$.ao}else{x=$.ap
if(x==null){z.c=y
$.ap=z
$.ab=z}else{z.c=x.c
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
ac:function(a,b,c,d){var z=C.b!==c
if(z){d=c.b0(d,!(!z||C.b.gb6()===c))
c=C.b}P.dd(new P.d0(d,c,null))},
h1:{
"^":"c:2;a",
$1:function(a){var z,y
H.bc()
z=this.a
y=z.a
z.a=null
y.$0()}},
h0:{
"^":"c:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
h2:{
"^":"c:0;a",
$0:function(){H.bc()
this.a.$0()}},
h3:{
"^":"c:0;a",
$0:function(){H.bc()
this.a.$0()}},
hN:{
"^":"V;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hO:function(a,b){if(b!=null)return b
if(!!J.l(a).$isz)return a.gM()
return}}},
M:{
"^":"a;"},
ey:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a3(null)}catch(x){w=H.C(x)
z=w
y=H.y(x)
P.hV(this.b,z,y)}}},
h7:{
"^":"a;e2:a<",
bX:function(a,b){a=a!=null?a:new P.cx()
if(this.a.a!==0)throw H.e(new P.ak("Future already completed"))
$.k.toString
this.H(a,b)},
b4:function(a){return this.bX(a,null)}},
bI:{
"^":"h7;a",
au:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.ak("Future already completed"))
z.aM(b)},
H:function(a,b){this.a.d0(a,b)}},
am:{
"^":"a;bE:a<,eo:b>,c,d,e",
ga5:function(){return this.b.b},
gbY:function(){return(this.c&1)!==0},
ge8:function(){return this.c===6},
ge7:function(){return this.c===8},
gdl:function(){return this.d},
gdu:function(){return this.d}},
w:{
"^":"a;as:a?,a5:b<,c",
gde:function(){return this.a===8},
sdf:function(a){if(a)this.a=2
else this.a=0},
aB:function(a,b){var z,y
z=H.d(new P.w(0,$.k,null),[null])
y=z.b
if(y!==C.b){y.toString
if(b!=null)b=P.d9(b,y)}this.aJ(new P.am(null,z,b==null?1:3,a,b))
return z},
er:function(a){return this.aB(a,null)},
bl:function(a){var z,y
z=$.k
y=new P.w(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.b)z.toString
this.aJ(new P.am(null,y,8,a,null))
return y},
aW:function(){if(this.a!==0)throw H.e(new P.ak("Future already completed"))
this.a=1},
gdt:function(){return this.c},
gad:function(){return this.c},
bQ:function(a){this.a=4
this.c=a},
bP:function(a){this.a=8
this.c=a},
dr:function(a,b){this.bP(new P.V(a,b))},
aJ:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ac(null,null,z,new P.hh(this,a))}else{a.a=this.c
this.c=a}},
ar:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbE()
z.a=y}return y},
a3:function(a){var z,y
z=J.l(a)
if(!!z.$isM)if(!!z.$isw)P.b4(a,this)
else P.bM(a,this)
else{y=this.ar()
this.bQ(a)
P.a2(this,y)}},
bw:function(a){var z=this.ar()
this.bQ(a)
P.a2(this,z)},
H:[function(a,b){var z=this.ar()
this.bP(new P.V(a,b))
P.a2(this,z)},function(a){return this.H(a,null)},"eD","$2","$1","gaQ",2,2,12,0],
aM:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isM){if(!!z.$isw){z=a.a
if(z>=4&&z===8){this.aW()
z=this.b
z.toString
P.ac(null,null,z,new P.hj(this,a))}else P.b4(a,this)}else P.bM(a,this)
return}}this.aW()
z=this.b
z.toString
P.ac(null,null,z,new P.hk(this,a))},
d0:function(a,b){var z
this.aW()
z=this.b
z.toString
P.ac(null,null,z,new P.hi(this,a,b))},
$isM:1,
static:{bM:function(a,b){var z,y,x,w
b.sas(2)
try{a.aB(new P.hl(b),new P.hm(b))}catch(x){w=H.C(x)
z=w
y=H.y(x)
P.dw(new P.hn(b,z,y))}},b4:function(a,b){var z
b.a=2
z=new P.am(null,b,0,null,null)
if(a.a>=4)P.a2(a,z)
else a.aJ(z)},a2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gde()
if(b==null){if(w){v=z.a.gad()
y=z.a.ga5()
x=J.S(v)
u=v.gM()
y.toString
P.aJ(null,null,y,x,u)}return}for(;b.gbE()!=null;b=t){t=b.a
b.a=null
P.a2(z.a,b)}x.a=!0
s=w?null:z.a.gdt()
x.b=s
x.c=!1
y=!w
if(!y||b.gbY()||b.c===8){r=b.ga5()
if(w){u=z.a.ga5()
u.toString
if(u==null?r!=null:u!==r){u=u.gb6()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gad()
y=z.a.ga5()
x=J.S(v)
u=v.gM()
y.toString
P.aJ(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gbY())x.a=new P.hp(x,b,s,r).$0()}else new P.ho(z,x,b,r).$0()
if(b.ge7())new P.hq(z,x,w,b,r).$0()
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
b=o.ar()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hh:{
"^":"c:0;a,b",
$0:function(){P.a2(this.a,this.b)}},
hl:{
"^":"c:2;a",
$1:function(a){this.a.bw(a)}},
hm:{
"^":"c:6;a",
$2:function(a,b){this.a.H(a,b)},
$1:function(a){return this.$2(a,null)}},
hn:{
"^":"c:0;a,b,c",
$0:function(){this.a.H(this.b,this.c)}},
hj:{
"^":"c:0;a,b",
$0:function(){P.b4(this.b,this.a)}},
hk:{
"^":"c:0;a,b",
$0:function(){this.a.bw(this.b)}},
hi:{
"^":"c:0;a,b,c",
$0:function(){this.a.H(this.b,this.c)}},
hp:{
"^":"c:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aA(this.b.gdl(),this.c)
return!0}catch(x){w=H.C(x)
z=w
y=H.y(x)
this.a.b=new P.V(z,y)
return!1}}},
ho:{
"^":"c:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gad()
y=!0
r=this.c
if(r.ge8()){x=r.d
try{y=this.d.aA(x,J.S(z))}catch(q){r=H.C(q)
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
p=H.af(p,[p,p]).Z(r)
n=this.d
m=this.b
if(p)m.b=n.ep(u,J.S(z),z.gM())
else m.b=n.aA(u,J.S(z))}catch(q){r=H.C(q)
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
hq:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cg(this.d.gdu())
z.a=w
v=w}catch(u){z=H.C(u)
y=z
x=H.y(u)
if(this.c){z=J.S(this.a.a.gad())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gad()
else v.b=new P.V(y,x)
v.a=!1
return}if(!!J.l(v).$isM){t=this.d
s=t.geo(t)
s.sdf(!0)
this.b.c=!0
v.aB(new P.hr(this.a,s),new P.hs(z,s))}}},
hr:{
"^":"c:2;a,b",
$1:function(a){P.a2(this.a.a,new P.am(null,this.b,0,null,null))}},
hs:{
"^":"c:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.w)){y=H.d(new P.w(0,$.k,null),[null])
z.a=y
y.dr(a,b)}P.a2(z.a,new P.am(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
d0:{
"^":"a;a,b,c",
dC:function(){return this.a.$0()}},
a_:{
"^":"a;",
a8:function(a,b){return H.d(new P.hC(b,this),[H.I(this,"a_",0),null])},
C:function(a,b){var z,y
z={}
y=H.d(new P.w(0,$.k,null),[null])
z.a=null
z.a=this.a1(new P.fp(z,this,b,y),!0,new P.fq(y),y.gaQ())
return y},
gj:function(a){var z,y
z={}
y=H.d(new P.w(0,$.k,null),[P.m])
z.a=0
this.a1(new P.fr(z),!0,new P.fs(z,y),y.gaQ())
return y},
bg:function(a){var z,y
z=H.d([],[H.I(this,"a_",0)])
y=H.d(new P.w(0,$.k,null),[[P.j,H.I(this,"a_",0)]])
this.a1(new P.ft(this,z),!0,new P.fu(z,y),y.gaQ())
return y}},
fp:{
"^":"c;a,b,c,d",
$1:function(a){P.i_(new P.fn(this.c,a),new P.fo(),P.hR(this.a.a,this.d))},
$signature:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"a_")}},
fn:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fo:{
"^":"c:2;",
$1:function(a){}},
fq:{
"^":"c:0;a",
$0:function(){this.a.a3(null)}},
fr:{
"^":"c:2;a",
$1:function(a){++this.a.a}},
fs:{
"^":"c:0;a,b",
$0:function(){this.b.a3(this.a.a)}},
ft:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"a_")}},
fu:{
"^":"c:0;a,b",
$0:function(){this.b.a3(this.a)}},
fm:{
"^":"a;"},
jR:{
"^":"a;"},
h4:{
"^":"a;a5:d<,as:e?",
bb:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bV()
if((z&4)===0&&(this.e&32)===0)this.bB(this.gbG())},
D:function(a){return this.bb(a,null)},
cf:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gI(z)}else z=!1
if(z)this.r.aE(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bB(this.gbI())}}}},
b2:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aN()
return this.f},
aN:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bV()
if((this.e&32)===0)this.r=null
this.f=this.bF()},
aL:["cM",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bM(a)
else this.aK(new P.ha(a,null))}],
aI:["cN",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bO(a,b)
else this.aK(new P.hc(a,b,null))}],
d_:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bN()
else this.aK(C.l)},
bH:[function(){},"$0","gbG",0,0,1],
bJ:[function(){},"$0","gbI",0,0,1],
bF:function(){return},
aK:function(a){var z,y
z=this.r
if(z==null){z=new P.hM(null,null,0)
this.r=z}z.a6(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aE(this)}},
bM:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bf(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aO((z&4)!==0)},
bO:function(a,b){var z,y
z=this.e
y=new P.h6(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aN()
z=this.f
if(!!J.l(z).$isM)z.bl(y)
else y.$0()}else{y.$0()
this.aO((z&4)!==0)}},
bN:function(){var z,y
z=new P.h5(this)
this.aN()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isM)y.bl(z)
else z.$0()},
bB:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aO((z&4)!==0)},
aO:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gI(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gI(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bH()
else this.bJ()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aE(this)},
cW:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.d9(b,z)
this.c=c}},
h6:{
"^":"c:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aK()
x=H.af(x,[x,x]).Z(y)
w=z.d
v=this.b
u=z.b
if(x)w.eq(u,v,this.c)
else w.bf(u,v)
z.e=(z.e&4294967263)>>>0}},
h5:{
"^":"c:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ci(z.c)
z.e=(z.e&4294967263)>>>0}},
d2:{
"^":"a;ay:a@"},
ha:{
"^":"d2;b,a",
bc:function(a){a.bM(this.b)}},
hc:{
"^":"d2;ah:b>,M:c<,a",
bc:function(a){a.bO(this.b,this.c)}},
hb:{
"^":"a;",
bc:function(a){a.bN()},
gay:function(){return},
say:function(a){throw H.e(new P.ak("No events after a done."))}},
hE:{
"^":"a;as:a?",
aE:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dw(new P.hF(this,a))
this.a=1},
bV:function(){if(this.a===1)this.a=3}},
hF:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.e4(this.b)}},
hM:{
"^":"hE;b,c,a",
gI:function(a){return this.c==null},
a6:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.say(b)
this.c=b}},
e4:function(a){var z,y
z=this.b
y=z.gay()
this.b=y
if(y==null)this.c=null
z.bc(a)}},
d7:{
"^":"a;a,b,c,as:d?",
bs:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eI:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a3(!0)
return}this.a.D(0)
this.c=a
this.d=3},"$1","gdh",2,0,function(){return H.b7(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"d7")}],
dk:[function(a,b){var z
if(this.d===2){z=this.c
this.bs(0)
z.H(a,b)
return}this.a.D(0)
this.c=new P.V(a,b)
this.d=4},function(a){return this.dk(a,null)},"eK","$2","$1","gdj",2,2,14,0],
eJ:[function(){if(this.d===2){var z=this.c
this.bs(0)
z.a3(!1)
return}this.a.D(0)
this.c=null
this.d=5},"$0","gdi",0,0,1]},
hT:{
"^":"c:0;a,b,c",
$0:function(){return this.a.H(this.b,this.c)}},
hS:{
"^":"c:5;a,b",
$2:function(a,b){return P.hQ(this.a,this.b,a,b)}},
bL:{
"^":"a_;",
a1:function(a,b,c,d){return this.d5(a,d,c,!0===b)},
c3:function(a,b,c){return this.a1(a,null,b,c)},
d5:function(a,b,c,d){return P.hg(this,a,b,c,d,H.I(this,"bL",0),H.I(this,"bL",1))},
bC:function(a,b){b.aL(a)},
$asa_:function(a,b){return[b]}},
d3:{
"^":"h4;x,y,a,b,c,d,e,f,r",
aL:function(a){if((this.e&2)!==0)return
this.cM(a)},
aI:function(a,b){if((this.e&2)!==0)return
this.cN(a,b)},
bH:[function(){var z=this.y
if(z==null)return
z.D(0)},"$0","gbG",0,0,1],
bJ:[function(){var z=this.y
if(z==null)return
z.cf()},"$0","gbI",0,0,1],
bF:function(){var z=this.y
if(z!=null){this.y=null
z.b2()}return},
eE:[function(a){this.x.bC(a,this)},"$1","gd9",2,0,function(){return H.b7(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"d3")}],
eG:[function(a,b){this.aI(a,b)},"$2","gdc",4,0,15],
eF:[function(){this.d_()},"$0","gda",0,0,1],
cX:function(a,b,c,d,e,f,g){var z,y
z=this.gd9()
y=this.gdc()
this.y=this.x.a.c3(z,this.gda(),y)},
static:{hg:function(a,b,c,d,e,f,g){var z=$.k
z=H.d(new P.d3(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cW(b,c,d,e)
z.cX(a,b,c,d,e,f,g)
return z}}},
hC:{
"^":"bL;b,a",
bC:function(a,b){var z,y,x,w,v
z=null
try{z=this.ds(a)}catch(w){v=H.C(w)
y=v
x=H.y(w)
$.k.toString
b.aI(y,x)
return}b.aL(z)},
ds:function(a){return this.b.$1(a)}},
V:{
"^":"a;ah:a>,M:b<",
i:function(a){return H.b(this.a)},
$isz:1},
hP:{
"^":"a;"},
hZ:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.hN(z,P.hO(z,this.b)))}},
hH:{
"^":"hP;",
gb6:function(){return this},
ci:function(a){var z,y,x,w
try{if(C.b===$.k){x=a.$0()
return x}x=P.da(null,null,this,a)
return x}catch(w){x=H.C(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
bf:function(a,b){var z,y,x,w
try{if(C.b===$.k){x=a.$1(b)
return x}x=P.dc(null,null,this,a,b)
return x}catch(w){x=H.C(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
eq:function(a,b,c){var z,y,x,w
try{if(C.b===$.k){x=a.$2(b,c)
return x}x=P.db(null,null,this,a,b,c)
return x}catch(w){x=H.C(w)
z=x
y=H.y(w)
return P.aJ(null,null,this,z,y)}},
b0:function(a,b){if(b)return new P.hI(this,a)
else return new P.hJ(this,a)},
dz:function(a,b){if(b)return new P.hK(this,a)
else return new P.hL(this,a)},
h:function(a,b){return},
cg:function(a){if($.k===C.b)return a.$0()
return P.da(null,null,this,a)},
aA:function(a,b){if($.k===C.b)return a.$1(b)
return P.dc(null,null,this,a,b)},
ep:function(a,b,c){if($.k===C.b)return a.$2(b,c)
return P.db(null,null,this,a,b,c)}},
hI:{
"^":"c:0;a,b",
$0:function(){return this.a.ci(this.b)}},
hJ:{
"^":"c:0;a,b",
$0:function(){return this.a.cg(this.b)}},
hK:{
"^":"c:2;a,b",
$1:function(a){return this.a.bf(this.b,a)}},
hL:{
"^":"c:2;a,b",
$1:function(a){return this.a.aA(this.b,a)}}}],["","",,P,{
"^":"",
aU:function(){return H.d(new H.aD(0,null,null,null,null,null,0),[null,null])},
a9:function(a){return H.dl(a,H.d(new H.aD(0,null,null,null,null,null,0),[null,null]))},
eP:function(a,b,c){var z,y
if(P.bR(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aq()
y.push(a)
try{P.hX(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cH(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aP:function(a,b,c){var z,y,x
if(P.bR(a))return b+"..."+c
z=new P.bz(b)
y=$.$get$aq()
y.push(a)
try{x=z
x.a=P.cH(x.ga4(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga4()+c
y=z.ga4()
return y.charCodeAt(0)==0?y:y},
bR:function(a){var z,y
for(z=0;y=$.$get$aq(),z<y.length;++z)if(a===y[z])return!0
return!1},
hX:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
a8:function(a,b){return P.hx(a,b)},
aj:function(a,b,c,d){return H.d(new P.hv(0,null,null,null,null,null,0),[d])},
cq:function(a){var z,y,x
z={}
if(P.bR(a))return"{...}"
y=new P.bz("")
try{$.$get$aq().push(a)
x=y
x.a=x.ga4()+"{"
z.a=!0
J.dR(a,new P.f8(z,y))
z=y
z.a=z.ga4()+"}"}finally{z=$.$get$aq()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga4()
return z.charCodeAt(0)==0?z:z},
hw:{
"^":"aD;a,b,c,d,e,f,r",
aj:function(a){return H.iy(a)&0x3ffffff},
ak:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbZ()
if(x==null?b==null:x===b)return y}return-1},
static:{hx:function(a,b){return H.d(new P.hw(0,null,null,null,null,null,0),[a,b])}}},
hv:{
"^":"ht;a,b,c,d,e,f,r",
gB:function(a){var z=new P.cn(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dL:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.d3(b)},
d3:function(a){var z=this.d
if(z==null)return!1
return this.aq(z[this.ap(a)],a)>=0},
c4:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dL(0,a)?a:null
else return this.dg(a)},
dg:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ap(a)]
x=this.aq(y,a)
if(x<0)return
return J.c_(y,x).gby()},
C:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.F(this))
z=z.b}},
a6:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bO()
this.b=z}return this.bt(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bO()
this.c=y}return this.bt(y,b)}else return this.T(b)},
T:function(a){var z,y,x
z=this.d
if(z==null){z=P.bO()
this.d=z}y=this.ap(a)
x=z[y]
if(x==null)z[y]=[this.aP(a)]
else{if(this.aq(x,a)>=0)return!1
x.push(this.aP(a))}return!0},
a9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bu(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bu(this.c,b)
else return this.dn(b)},
dn:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ap(a)]
x=this.aq(y,a)
if(x<0)return!1
this.bv(y.splice(x,1)[0])
return!0},
P:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bt:function(a,b){if(a[b]!=null)return!1
a[b]=this.aP(b)
return!0},
bu:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bv(z)
delete a[b]
return!0},
aP:function(a){var z,y
z=new P.f4(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bv:function(a){var z,y
z=a.gd2()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ap:function(a){return J.D(a)&0x3ffffff},
aq:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].gby(),b))return y
return-1},
$isp:1,
static:{bO:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f4:{
"^":"a;by:a<,b,d2:c<"},
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
ht:{
"^":"fj;"},
bq:{
"^":"a;",
gB:function(a){return new H.co(a,this.gj(a),0,null)},
U:function(a,b){return this.h(a,b)},
C:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.F(a))}},
a8:function(a,b){return H.d(new H.bt(a,b),[null,null])},
i:function(a){return P.aP(a,"[","]")},
$isj:1,
$asj:null,
$isp:1},
f8:{
"^":"c:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
f5:{
"^":"K;a,b,c,d",
gB:function(a){return new P.hy(this,this.c,this.d,this.b,null)},
C:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.B(new P.F(this))}},
gI:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
P:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aP(this,"{","}")},
ce:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bo());++this.d
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
if(y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bA();++this.d},
bA:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.d(z,[H.t(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.bo(y,0,w,z,x)
C.c.bo(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cR:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.d(z,[b])},
$isp:1,
static:{br:function(a,b){var z=H.d(new P.f5(null,0,0,0),[b])
z.cR(a,b)
return z}}},
hy:{
"^":"a;a,b,c,d,e",
gq:function(){return this.e},
n:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.B(new P.F(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fk:{
"^":"a;",
a8:function(a,b){return H.d(new H.cg(this,b),[H.t(this,0),null])},
i:function(a){return P.aP(this,"{","}")},
C:function(a,b){var z
for(z=this.gB(this);z.n();)b.$1(z.d)},
$isp:1},
fj:{
"^":"fk;"}}],["","",,P,{
"^":"",
i0:function(a){return H.fv(a)},
bl:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.av(a)
if(typeof a==="string")return JSON.stringify(a)
return P.et(a)},
et:function(a){var z=J.l(a)
if(!!z.$isc)return z.i(a)
return H.aY(a)},
aO:function(a){return new P.hf(a)},
f6:function(a,b,c){var z=J.eS(a,c)
if(a!==0);return z},
bs:function(a,b,c){var z,y
z=H.d([],[c])
for(y=J.bg(a);y.n();)z.push(y.gq())
if(b)return z
z.fixed$length=Array
return z},
ag:function(a){var z=H.b(a)
H.du(z)},
js:{
"^":"c:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.i0(a)}},
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
y=P.eo(z?H.E(this).getUTCFullYear()+0:H.E(this).getFullYear()+0)
x=P.ax(z?H.E(this).getUTCMonth()+1:H.E(this).getMonth()+1)
w=P.ax(z?H.E(this).getUTCDate()+0:H.E(this).getDate()+0)
v=P.ax(z?H.E(this).getUTCHours()+0:H.E(this).getHours()+0)
u=P.ax(z?H.E(this).getUTCMinutes()+0:H.E(this).getMinutes()+0)
t=P.ax(z?H.E(this).getUTCSeconds()+0:H.E(this).getSeconds()+0)
s=P.ep(H.cy(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
cP:function(a,b){if(Math.abs(a)>864e13)throw H.e(P.aw(a))},
static:{en:function(a,b){var z=new P.bk(a,b)
z.cP(a,b)
return z},eo:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},ep:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},ax:function(a){if(a>=10)return""+a
return"0"+a}}},
bf:{
"^":"aL;"},
"+double":0,
ay:{
"^":"a;a",
k:function(a,b){return new P.ay(C.d.k(this.a,b.gd7()))},
aD:function(a,b){return C.d.aD(this.a,b.gd7())},
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.ay))return!1
return this.a===b.a},
gt:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.es()
y=this.a
if(y<0)return"-"+new P.ay(-y).i(0)
x=z.$1(C.d.bd(C.d.ae(y,6e7),60))
w=z.$1(C.d.bd(C.d.ae(y,1e6),60))
v=new P.er().$1(C.d.bd(y,1e6))
return""+C.d.ae(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
er:{
"^":"c:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
es:{
"^":"c:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
z:{
"^":"a;",
gM:function(){return H.y(this.$thrownJsError)}},
cx:{
"^":"z;",
i:function(a){return"Throw of null."}},
a6:{
"^":"z;a,b,c,d",
gaS:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaR:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaS()+y+x
if(!this.a)return w
v=this.gaR()
u=P.bl(this.b)
return w+v+": "+H.b(u)},
static:{aw:function(a){return new P.a6(!1,null,null,a)},ea:function(a,b,c){return new P.a6(!0,a,b,c)}}},
cC:{
"^":"a6;e,f,a,b,c,d",
gaS:function(){return"RangeError"},
gaR:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.ey()
if(typeof z!=="number")return H.O(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
N:function(a){return this.e.$0()},
static:{b_:function(a,b,c){return new P.cC(null,null,!0,a,b,"Value not in range")},aZ:function(a,b,c,d,e){return new P.cC(b,c,!0,a,d,"Invalid value")},cD:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.aZ(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.aZ(b,a,c,"end",f))
return b}}},
eD:{
"^":"a6;e,j:f>,a,b,c,d",
gcF:function(a){return 0},
gaS:function(){return"RangeError"},
gaR:function(){P.bl(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dA(this.b,0)?": index must not be negative":z},
N:function(a){return this.gcF(this).$0()},
static:{bn:function(a,b,c,d,e){var z=e!=null?e:J.au(b)
return new P.eD(b,z,!0,a,c,"Index out of range")}}},
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
gM:function(){return},
$isz:1},
em:{
"^":"z;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hf:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eu:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aX(b,"expando$values")
return z==null?null:H.aX(z,this.bz())},
p:function(a,b,c){var z=H.aX(b,"expando$values")
if(z==null){z=new P.a()
H.by(b,"expando$values",z)}H.by(z,this.bz(),c)},
bz:function(){var z,y
z=H.aX(this,"expando$key")
if(z==null){y=$.ch
$.ch=y+1
z="expando$key$"+y
H.by(this,"expando$key",z)}return z}},
ew:{
"^":"a;"},
m:{
"^":"aL;"},
"+int":0,
K:{
"^":"a;",
a8:function(a,b){return H.aW(this,b,H.I(this,"K",0),null)},
C:function(a,b){var z
for(z=this.gB(this);z.n();)b.$1(z.gq())},
bh:function(a,b){return P.bs(this,b,H.I(this,"K",0))},
bg:function(a){return this.bh(a,!0)},
gj:function(a){var z,y
z=this.gB(this)
for(y=0;z.n();)++y
return y},
U:function(a,b){var z,y,x
if(b<0)H.B(P.aZ(b,0,null,"index",null))
for(z=this.gB(this),y=0;z.n();){x=z.gq()
if(b===y)return x;++y}throw H.e(P.bn(b,this,"index",null,y))},
i:function(a){return P.eP(this,"(",")")}},
eR:{
"^":"a;"},
j:{
"^":"a;",
$asj:null,
$isp:1},
"+List":0,
jt:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aL:{
"^":"a;"},
"+num":0,
a:{
"^":";",
l:function(a,b){return this===b},
gt:function(a){return H.Y(this)},
i:function(a){return H.aY(this)}},
Z:{
"^":"a;"},
U:{
"^":"a;"},
"+String":0,
bz:{
"^":"a;a4:a<",
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
a3:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d4:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
d8:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.h9(a)
if(!!J.l(z).$isG)return z
return}else return a},
hW:function(a){if(!!J.l(a).$isce)return a
return P.ia(a,!0)},
x:function(a){var z=$.k
if(z===C.b)return a
return z.dz(a,!0)},
A:{
"^":"az;",
$isA:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iF:{
"^":"A;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iH:{
"^":"A;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iJ:{
"^":"A;",
$isG:1,
$isf:1,
"%":"HTMLBodyElement"},
iK:{
"^":"A;v:height},A:width}",
bm:function(a,b,c){return a.getContext(b,P.i8(c))},
cr:function(a,b,c,d,e,f,g){var z,y
z=P.a9(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bm(a,"webgl",z)
return y==null?this.bm(a,"experimental-webgl",z):y},
cq:function(a,b){return this.cr(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
iL:{
"^":"f;",
c2:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
iN:{
"^":"aE;j:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iO:{
"^":"eE;j:length=",
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eE:{
"^":"f+el;"},
el:{
"^":"a;"},
ce:{
"^":"aE;",
$isce:1,
"%":"Document|HTMLDocument|XMLDocument"},
iP:{
"^":"aE;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iQ:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
eq:{
"^":"f;b1:bottom=,v:height=,J:left=,be:right=,ab:top=,A:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gA(a))+" x "+H.b(this.gv(a))},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
y=a.left
x=z.gJ(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=this.gA(a)
x=z.gA(b)
if(y==null?x==null:y===x){y=this.gv(a)
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.D(a.left)
y=J.D(a.top)
x=J.D(this.gA(a))
w=J.D(this.gv(a))
return W.d4(W.a3(W.a3(W.a3(W.a3(0,z),y),x),w))},
gbi:function(a){return H.d(new P.H(a.left,a.top),[null])},
$isT:1,
$asT:I.b9,
"%":";DOMRectReadOnly"},
az:{
"^":"aE;",
gR:function(a){return P.fe(C.a.w(a.offsetLeft),C.a.w(a.offsetTop),C.a.w(a.offsetWidth),C.a.w(a.offsetHeight),null)},
i:function(a){return a.localName},
cp:function(a){return a.getBoundingClientRect()},
gc5:function(a){return H.d(new W.q(a,"mousedown",!1),[null])},
gc6:function(a){return H.d(new W.q(a,"mouseenter",!1),[null])},
gc7:function(a){return H.d(new W.q(a,"mouseleave",!1),[null])},
gc8:function(a){return H.d(new W.q(a,"mousemove",!1),[null])},
gc9:function(a){return H.d(new W.q(a,"mouseout",!1),[null])},
gca:function(a){return H.d(new W.q(a,"mouseover",!1),[null])},
gcb:function(a){return H.d(new W.q(a,"mouseup",!1),[null])},
$isaz:1,
$isf:1,
$isG:1,
"%":";Element"},
iR:{
"^":"A;v:height},A:width}",
"%":"HTMLEmbedElement"},
iS:{
"^":"aN;ah:error=",
"%":"ErrorEvent"},
aN:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
G:{
"^":"f;",
cZ:function(a,b,c,d){return a.addEventListener(b,H.a4(c,1),d)},
dq:function(a,b,c,d){return a.removeEventListener(b,H.a4(c,1),d)},
$isG:1,
"%":"AudioBufferSourceNode|AudioDestinationNode|AudioNode|AudioSourceNode|MediaStream;EventTarget"},
j9:{
"^":"A;j:length=",
"%":"HTMLFormElement"},
eA:{
"^":"eB;",
eP:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
ek:function(a,b,c){return a.open(b,c)},
aF:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
eB:{
"^":"G;",
"%":";XMLHttpRequestEventTarget"},
ja:{
"^":"A;v:height},A:width}",
"%":"HTMLIFrameElement"},
jb:{
"^":"A;v:height},A:width}",
au:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
jd:{
"^":"A;v:height},A:width}",
$isaz:1,
$isf:1,
$isG:1,
"%":"HTMLInputElement"},
f9:{
"^":"A;ah:error=",
D:function(a){return a.pause()},
"%":"HTMLAudioElement;HTMLMediaElement"},
bu:{
"^":"d_;",
gR:function(a){var z,y
if(!!a.offsetX)return H.d(new P.H(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.d8(a.target)).$isaz)throw H.e(new P.L("offsetX is only supported on elements"))
z=W.d8(a.target)
y=H.d(new P.H(a.clientX,a.clientY),[null]).aH(0,J.dZ(J.e1(z)))
return H.d(new P.H(J.c8(y.a),J.c8(y.b)),[null])}},
$isbu:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jr:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aE:{
"^":"G;",
i:function(a){var z=a.nodeValue
return z==null?this.cK(a):z},
"%":"Attr;Node"},
ju:{
"^":"A;",
N:function(a){return a.start.$0()},
"%":"HTMLOListElement"},
jv:{
"^":"A;v:height},A:width}",
"%":"HTMLObjectElement"},
aF:{
"^":"aN;",
$isaF:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
jz:{
"^":"A;j:length=",
"%":"HTMLSelectElement"},
jA:{
"^":"aN;ah:error=",
"%":"SpeechRecognitionError"},
bD:{
"^":"f;",
$isa:1,
"%":"Touch"},
bE:{
"^":"d_;dD:changedTouches=",
$isbE:1,
$isa:1,
"%":"TouchEvent"},
jF:{
"^":"eG;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bn(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.e(new P.L("Cannot assign element of immutable List."))},
U:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bD]},
$isp:1,
$isaS:1,
$isaQ:1,
"%":"TouchList"},
eF:{
"^":"f+bq;",
$isj:1,
$asj:function(){return[W.bD]},
$isp:1},
eG:{
"^":"eF+eC;",
$isj:1,
$asj:function(){return[W.bD]},
$isp:1},
d_:{
"^":"aN;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
jH:{
"^":"f9;v:height},A:width}",
"%":"HTMLVideoElement"},
jK:{
"^":"G;",
$isf:1,
$isG:1,
"%":"DOMWindow|Window"},
jO:{
"^":"f;b1:bottom=,v:height=,J:left=,be:right=,ab:top=,A:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
y=a.left
x=z.gJ(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=a.width
x=z.gA(b)
if(y==null?x==null:y===x){y=a.height
z=z.gv(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.D(a.left)
y=J.D(a.top)
x=J.D(a.width)
w=J.D(a.height)
return W.d4(W.a3(W.a3(W.a3(W.a3(0,z),y),x),w))},
gbi:function(a){return H.d(new P.H(a.left,a.top),[null])},
$isT:1,
$asT:I.b9,
"%":"ClientRect"},
jP:{
"^":"aE;",
$isf:1,
"%":"DocumentType"},
jQ:{
"^":"eq;",
gv:function(a){return a.height},
gA:function(a){return a.width},
"%":"DOMRect"},
jT:{
"^":"A;",
$isG:1,
$isf:1,
"%":"HTMLFrameSetElement"},
bK:{
"^":"a_;a,b,c",
a1:function(a,b,c,d){var z=new W.v(0,this.a,this.b,W.x(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.u()
return z},
c3:function(a,b,c){return this.a1(a,null,b,c)}},
q:{
"^":"bK;a,b,c"},
v:{
"^":"fm;a,b,c,d,e",
b2:function(){if(this.b==null)return
this.bT()
this.b=null
this.d=null
return},
bb:function(a,b){if(this.b==null)return;++this.a
this.bT()},
D:function(a){return this.bb(a,null)},
cf:function(){if(this.b==null||this.a<=0)return;--this.a
this.u()},
u:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dB(x,this.c,z,this.e)}},
bT:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dC(x,this.c,z,this.e)}}},
eC:{
"^":"a;",
gB:function(a){return new W.ev(a,this.gj(a),-1,null)},
$isj:1,
$asj:null,
$isp:1},
ev:{
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
h8:{
"^":"a;a",
$isG:1,
$isf:1,
static:{h9:function(a){if(a===window)return a
else return new W.h8(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iD:{
"^":"aA;",
$isf:1,
"%":"SVGAElement"},
iE:{
"^":"fw;",
$isf:1,
"%":"SVGAltGlyphElement"},
iG:{
"^":"n;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iT:{
"^":"n;",
$isf:1,
"%":"SVGFEBlendElement"},
iU:{
"^":"n;",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iV:{
"^":"n;",
$isf:1,
"%":"SVGFEComponentTransferElement"},
iW:{
"^":"n;",
$isf:1,
"%":"SVGFECompositeElement"},
iX:{
"^":"n;",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
iY:{
"^":"n;",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
iZ:{
"^":"n;",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
j_:{
"^":"n;",
$isf:1,
"%":"SVGFEFloodElement"},
j0:{
"^":"n;",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
j1:{
"^":"n;",
$isf:1,
"%":"SVGFEImageElement"},
j2:{
"^":"n;",
$isf:1,
"%":"SVGFEMergeElement"},
j3:{
"^":"n;",
$isf:1,
"%":"SVGFEMorphologyElement"},
j4:{
"^":"n;",
$isf:1,
"%":"SVGFEOffsetElement"},
j5:{
"^":"n;",
$isf:1,
"%":"SVGFESpecularLightingElement"},
j6:{
"^":"n;",
$isf:1,
"%":"SVGFETileElement"},
j7:{
"^":"n;",
$isf:1,
"%":"SVGFETurbulenceElement"},
j8:{
"^":"n;",
$isf:1,
"%":"SVGFilterElement"},
aA:{
"^":"n;",
$isf:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
jc:{
"^":"aA;",
$isf:1,
"%":"SVGImageElement"},
jg:{
"^":"n;",
$isf:1,
"%":"SVGMarkerElement"},
jh:{
"^":"n;",
$isf:1,
"%":"SVGMaskElement"},
jw:{
"^":"n;",
$isf:1,
"%":"SVGPatternElement"},
jy:{
"^":"n;",
$isf:1,
"%":"SVGScriptElement"},
n:{
"^":"az;",
gc5:function(a){return H.d(new W.q(a,"mousedown",!1),[null])},
gc6:function(a){return H.d(new W.q(a,"mouseenter",!1),[null])},
gc7:function(a){return H.d(new W.q(a,"mouseleave",!1),[null])},
gc8:function(a){return H.d(new W.q(a,"mousemove",!1),[null])},
gc9:function(a){return H.d(new W.q(a,"mouseout",!1),[null])},
gca:function(a){return H.d(new W.q(a,"mouseover",!1),[null])},
gcb:function(a){return H.d(new W.q(a,"mouseup",!1),[null])},
$isG:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jC:{
"^":"aA;",
$isf:1,
"%":"SVGSVGElement"},
jD:{
"^":"n;",
$isf:1,
"%":"SVGSymbolElement"},
cK:{
"^":"aA;",
"%":";SVGTextContentElement"},
jE:{
"^":"cK;",
$isf:1,
"%":"SVGTextPathElement"},
fw:{
"^":"cK;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jG:{
"^":"aA;",
$isf:1,
"%":"SVGUseElement"},
jI:{
"^":"n;",
$isf:1,
"%":"SVGViewElement"},
jS:{
"^":"n;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jU:{
"^":"n;",
$isf:1,
"%":"SVGCursorElement"},
jV:{
"^":"n;",
$isf:1,
"%":"SVGFEDropShadowElement"},
jW:{
"^":"n;",
$isf:1,
"%":"SVGGlyphRefElement"},
jX:{
"^":"n;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":"",
ca:{
"^":"f;j:length=",
$isa:1,
"%":"AudioBuffer"},
iI:{
"^":"G;",
d6:function(a,b,c,d){return a.decodeAudioData(b,H.a4(c,1),H.a4(d,1))},
dQ:function(a,b){var z=H.d(new P.bI(H.d(new P.w(0,$.k,null),[P.ca])),[P.ca])
this.d6(a,b,new P.ec(z),new P.ed(z))
return z.a},
"%":"AudioContext|OfflineAudioContext|webkitAudioContext"},
ec:{
"^":"c:2;a",
$1:function(a){this.a.au(0,a)}},
ed:{
"^":"c:2;a",
$1:function(a){var z=this.a
if(a==null)z.b4("")
else z.b4(a)}}}],["","",,P,{
"^":"",
jx:{
"^":"f;",
dw:function(a,b,c){return a.bindBuffer(b,c)},
dA:function(a,b){return a.blendEquation(b)},
dB:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dF:function(a,b){return a.clear(b)},
dG:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dH:function(a,b){return a.clearDepth(b)},
dI:function(a,b){return a.clearStencil(b)},
dK:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dN:function(a){return a.createBuffer()},
dO:function(a){return a.createProgram()},
dP:function(a,b){return a.createShader(b)},
dR:function(a,b){return a.depthFunc(b)},
dS:function(a,b){return a.depthMask(b)},
dZ:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
e_:function(a,b){return a.enable(b)},
e0:function(a,b){return a.enableVertexAttribArray(b)},
co:function(a,b,c){return a.getAttribLocation(b,c)},
ct:function(a,b,c){return a.getUniformLocation(b,c)},
c2:function(a,b){return a.lineWidth(b)},
cG:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cH:function(a,b,c,d){return a.stencilOp(b,c,d)},
ev:function(a,b){return a.useProgram(b)},
ew:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iM:{
"^":"a;"}}],["","",,P,{
"^":"",
an:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d5:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
H:{
"^":"a;F:a>,L:b>",
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
z=J.D(this.a)
y=J.D(this.b)
return P.d5(P.an(P.an(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gF(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gL(b)
if(typeof z!=="number")return z.k()
y=new P.H(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aH:function(a,b){var z,y,x,w
z=this.a
y=J.e_(b)
if(typeof z!=="number")return z.aH()
if(typeof y!=="number")return H.O(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aH()
if(typeof w!=="number")return H.O(w)
w=new P.H(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hG:{
"^":"a;",
gbe:function(a){return this.gJ(this)+this.c},
gb1:function(a){return this.gab(this)+this.d},
i:function(a){return"Rectangle ("+this.gJ(this)+", "+this.b+") "+this.c+" x "+this.d},
l:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isT)return!1
if(this.gJ(this)===z.gJ(b)){y=this.b
z=y===z.gab(b)&&this.a+this.c===z.gbe(b)&&y+this.d===z.gb1(b)}else z=!1
return z},
gt:function(a){var z=this.b
return P.d5(P.an(P.an(P.an(P.an(0,this.gJ(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbi:function(a){var z=new P.H(this.gJ(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
T:{
"^":"hG;J:a>,ab:b>,A:c>,v:d>",
$asT:null,
static:{fe:function(a,b,c,d,e){var z=c<0?-c*0:c
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
"%":"DataView;ArrayBufferView;bv|cs|cu|bw|ct|cv|X"},
bv:{
"^":"bx;",
gj:function(a){return a.length},
$isaS:1,
$isaQ:1},
bw:{
"^":"cu;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
return a[b]},
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
a[b]=c}},
cs:{
"^":"bv+bq;",
$isj:1,
$asj:function(){return[P.bf]},
$isp:1},
cu:{
"^":"cs+ci;"},
X:{
"^":"cv;",
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.m]},
$isp:1},
ct:{
"^":"bv+bq;",
$isj:1,
$asj:function(){return[P.m]},
$isp:1},
cv:{
"^":"ct+ci;"},
ji:{
"^":"bw;",
$isj:1,
$asj:function(){return[P.bf]},
$isp:1,
"%":"Float32Array"},
jj:{
"^":"bw;",
$isj:1,
$asj:function(){return[P.bf]},
$isp:1,
"%":"Float64Array"},
jk:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$isp:1,
"%":"Int16Array"},
jl:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$isp:1,
"%":"Int32Array"},
jm:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$isp:1,
"%":"Int8Array"},
jn:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$isp:1,
"%":"Uint16Array"},
jo:{
"^":"X;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$isp:1,
"%":"Uint32Array"},
jp:{
"^":"X;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$isp:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jq:{
"^":"X;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.u(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.m]},
$isp:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
du:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
i8:function(a){var z={}
a.C(0,new P.i9(z))
return z},
ia:function(a,b){var z=[]
return new P.id(b,new P.ib([],z),new P.ic(z),new P.ie(z)).$1(a)},
i9:{
"^":"c:18;a",
$2:function(a,b){this.a[a]=b}},
ib:{
"^":"c:19;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
ic:{
"^":"c:20;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.h(z,a)
return z[a]}},
ie:{
"^":"c:21;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.h(z,a)
z[a]=b}},
id:{
"^":"c:2;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.en(a.getTime(),!0)
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
dr:[function(){var z=0,y=new P.W(),x=1,w,v,u,t,s,r,q,p,o
function $async$dr(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
v=new q.fE(700,500,p.aU())
q=P
q.ag("--n--")
q=E
q=q
p=Float64Array
o=H
u=new q.Q(new p(o.r(16)))
q=u
q.S()
q=F
u=new q.fH(600,400,1,1,1,0,0,null,"none",null,u,!1)
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
q.S()
q=G
s=new q.fO(null,!1,0,v,!1,!1,0,null,!1,!1,[t])
q=s
p=G
q.a=p.fN(400,600)
q=s
q.sE(u)
q=s
q.ej()
q=s
q.eu()
q=s
u=q.gE()
q=P
t=q.f6(6,null,null)
q=E
q=q
p=Float64Array
o=H
r=new q.Q(new p(o.r(16)))
q=r
q.S()
q=F
r=new q.fb(v,t,"none",null,r,!1)
q=r
q.b=[]
q=r
q.b7()
q=u
q.af(r)
q=s
q.N(0)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$dr,y,null)},"$0","ds",0,0,0],
eZ:{
"^":"bC;e,f,r,a,b,c,d",
az:function(a,b){var z=F.b1(null)
if(this.f!=null)z.a=F.al(153,0,0,0)
else z.a=F.al(153,255,170,170)
if(this.r||this.f==null)z.b=C.e
else z.b=C.w
b.aw(a,new F.aG(0,0,100,200),z)},
ef:function(a,b){if(0<b&&b<200)if(0<a&&a<100)return!0
return!1},
cd:function(a,b,c,d,e,f,g){if((c==="pointerdown"||c==="pointermove")&&this.ef(d,e)){if(!this.r&&this.f!=null)J.e8(this.f)
this.r=!0}else{this.r=!1
J.e5(this.f)}return!1},
cQ:function(a,b){this.e.b9(b).er(new F.f0(this))},
static:{f_:function(a,b){var z=new E.Q(new Float64Array(H.r(16)))
z.S()
z=new F.eZ(a,null,!1,"none",null,z,!1)
z.b=[]
z.cQ(a,b)
return z}}},
f0:{
"^":"c:22;a",
$1:function(a){this.a.f=a}},
fb:{
"^":"bC;e,f,a,b,c,d",
b7:function(){var z=0,y=new P.W(),x=1,w,v=this,u,t,s,r,q
function $async$b7(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=v
u=q.e,t=0
case 2:if(!(t<6)){z=4
break}s=t+1
q=F
r=q.f_(u,"assets/se_maoudamashii_retro0"+s+".ogg")
q=v
q.af(r)
q=r
q=q.c
q.bj(0,t*100,150,0)
case 3:t=s
z=2
break
case 4:return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$b7,y,null)},
az:function(a,b){var z=F.b1(null)
z.a=F.al(255,0,0,0)
z.b=C.e
b.aw(a,new F.aG(0,0,600,150),z)}}},1],["","",,F,{
"^":"",
fB:{
"^":"a;"},
bC:{
"^":"a;",
af:function(a){var z=0,y=new P.W(),x=1,w,v=this,u,t,s
function $async$af(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.w(0,s.k,null)
u.$builtinTypeInfo=[null]
t=u
t.aM(null)
z=2
return H.o(u,$async$af,y)
case 2:t=v
t=t.b
t.push(a)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$af,y,null)},
c_:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.as)(z),++x)z[x].c_(a)},
cc:function(a,b){},
ck:function(a,b){var z,y,x
this.b5()
this.cc(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.as)(z),++x)z[x].ck(a,b)},
az:function(a,b){},
ba:["cL",function(a,b){var z,y,x,w,v,u
this.b5()
this.az(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.as)(z),++w){v=z[w]
u=v.c
x.push(C.c.ga7(x).X(0,u))
b.aC()
v.ba(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aC()}}],
es:["Y",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b5()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.W(v.c)
u=v.es(a,b,c,d,e)
a.V()
if(u)return!0}t=a.cs().b3(0)
t.ee()
y=new E.a0(new Float64Array(H.r(3)))
y.aG(d,e,0)
s=t.X(0,y)
return this.cd(a,b,c,s.gF(s),s.gL(s),d,e)}],
cd:function(a,b,c,d,e,f,g){return!1},
b5:function(){if(!this.d)this.d=!0}},
fD:{
"^":"a;"},
bB:{
"^":"a;"},
aG:{
"^":"a;a,b,c,d"},
cM:{
"^":"a;a",
i:function(a){return C.u.h(0,this.a)}},
fI:{
"^":"a;a,b,c",
cU:function(a){if(this.a==null)this.a=F.al(255,255,255,255)},
static:{b1:function(a){var z=new F.fI(a,C.e,1)
z.cU(a)
return z}}},
fC:{
"^":"a;a",
cT:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{al:function(a,b,c,d){var z=new F.fC(0)
z.cT(a,b,c,d)
return z}}},
fH:{
"^":"bC;e,f,r,x,y,z,Q,ch,a,b,c,d",
cc:function(a,b){var z,y,x,w
z=this.e
y=(a.gbk()-0)/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.Q(new Float64Array(H.r(16)))
y.S()
this.c=y
y.bj(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bn(0,z,z,1)},
ba:function(a,b){var z,y,x
z=new F.aG(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.c.ga7(x).X(0,y))
b.aC()
y=b.b
y.push(z)
b.at(a,z)
this.cL(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.at(a,C.c.ga7(y))
else{y=a.a
b.at(a,new F.aG(0,0,y.c,y.d))}if(0>=x.length)return H.h(x,0)
x.pop()
b.aC()},
az:function(a,b){var z,y
z=new F.aG(0,0,this.e,this.f)
y=F.b1(null)
y.a=this.ch
b.at(a,z)
b.aw(a,z,y)}},
fJ:{
"^":"a;",
gE:function(){return this.c$},
sE:function(a){this.c$=a},
c1:function(a){if(!this.e$){this.c$.c_(this)
this.e$=!0}this.c$.ck(this,a)
this.ei()},
W:function(a){var z=this.f$
z.push(C.c.ga7(z).X(0,a))},
V:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cs:function(){return C.c.ga7(this.f$)}}}],["","",,G,{
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
fK:{
"^":"bB;a,b,c",
N:function(a){var z=0,y=new P.W(),x=1,w,v=this,u,t,s,r
function $async$N(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:s=v
z=2
return H.o(s.D(0),$async$N,y)
case 2:s=v
u=s.a
s=u
t=s.createBufferSource()
s=v
s.c=t
s=t
r=v
s.buffer=r.b
s=t
s=s
r=u
s.connect(r.destination,0,0)
s=v
u=s.c
if(!!u.start)u.start(0)
else u.noteOn(0)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$N,y,null)},
D:function(a){var z=0,y=new P.W(),x=1,w,v=this,u,t
function $async$D(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=v
u=t.c
z=u!=null?2:3
break
case 2:if(!!u.stop)u.stop(0)
else u.noteOff(0)
t=v
t.c=null
case 3:return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$D,y,null)}},
fM:{
"^":"a;a,b,c,d",
cV:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a2(b)
y=C.d.a2(a)
x=document.createElement("canvas",null)
J.e7(x,z)
J.e6(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.e2(this.b,!0)},
static:{fN:function(a,b){var z=new G.fM(null,null,null,null)
z.cV(a,b)
return z}}},
fL:{
"^":"fB;c,d,e,f,r,a,b",
e9:function(){var z,y
z=C.c.ax(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.c.ax(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cN(this.c,z,y)
z=C.c.ax(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.c.ax(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cN(this.c,z,y)},
P:function(a){J.c4(this.c,2960)
J.dN(this.c,515)
J.dG(this.c,0,0,0,1)
J.dH(this.c,1)
J.dI(this.c,0)
J.c4(this.c,3042)
switch(-1){case-1:J.dD(this.c,32774)
J.dE(this.c,770,771,770,32772)
break}J.dF(this.c,17664)},
aw:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
this.r.S()
o=this.r.bj(0,-1,1,0)
this.r=o
n=this.d
n=o.bn(0,2/n.c,-2/n.d,1)
this.r=n
n=n.X(0,C.c.ga7(this.a))
this.r=n
r.uniformMatrix4fv(J.bh(r,p,"u_mat"),!1,new Float32Array(H.b6(n.gm())))
n=this.c
p=this.e
u=u.a
n.uniform4fv(J.bh(n,p,"color"),new Float32Array(H.b6([(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255])))
u=this.c
u.uniform1f(J.bh(u,this.e,"u_point_size"),s)
m=J.e0(this.c,this.e,"vp")
J.e9(this.c,m,3,5126,!1,0,0)
J.dQ(this.c,m)
if(t===C.e)l=6
else{J.e3(this.c,s)
l=2}J.dO(this.c,l,v.length/3|0,5123,0)
J.c9(this.c,null)},
at:function(a,b){var z
J.c1(this.c,!1,!1,!1,!1)
J.c3(this.c,!1)
J.c7(this.c,7680,7681,7681)
J.c6(this.c,519,1,255)
z=F.b1(null)
z.a=F.al(255,255,255,255)
this.aw(null,b,z)
J.c1(this.c,!0,!0,!0,!0)
J.c3(this.c,!0)
J.c7(this.c,7680,7680,7680)
J.c6(this.c,514,1,255)},
aC:function(){}},
fE:{
"^":"fD;b,c,a",
b9:function(a){var z=0,y=new P.W(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$b9(b,c){if(b===1){v=c
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
q.ek(s,"GET",a)
q=s
q.responseType="arraybuffer"
q=P
q.ag("---d-1--")
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
m=m.x(new l.fF(u,t,s))
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
m=m.x(new l.fG(u))
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
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$b9,y,null)}},
fF:{
"^":"c:23;a,b,c",
$1:function(a){var z=0,y=new P.W(),x=1,w,v=this,u,t,s,r,q,p,o,n
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t.ag("---d-2-")
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
return H.o(q.dM(p,o.hW(n.response)),$async$$1,y)
case 2:t.au(0,new s.fK(r,c,null))
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$$1,y,null)}},
fG:{
"^":"c:24;a",
$1:function(a){this.a.b4(a)}},
fO:{
"^":"fa;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gbk:function(){return this.a.c},
ei:function(){this.e=!0},
N:function(a){if(!this.b){this.b=!0
this.ao()}},
ao:function(){var z=0,y=new P.W(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i
function $async$ao(a,b){if(a===1){w=b
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
k.S()
k=E
k=k
j=Float64Array
i=H
r=new k.Q(new j(i.r(16)))
k=r
k.S()
k=G
q=new k.fL(null,null,null,null,s,[r],[])
k=q
j=t
k.c=j.a
k=q
k.d=t
k=q
k.e9()
k=q
k.P(0)
p=0,o=0
case 2:k=v
if(!k.b){z=4
break}k=P
k=k
j=P
z=5
return H.o(k.ex(new j.ay(3e4),null,null),$async$ao,y)
case 5:n=Date.now()
m=n-u
t=u+m
k=v
k=k
j=C
j=j.d
k.c1(j.a2(t))
k=v
k=k
j=C
j=j.d
k.c1(j.a2(t))
p+=m
if(m<0);else ;++o
k=v
k.e=!0
z=p>40?6:7
break
case 6:k=q
k.P(0)
k=v
k=k.gE()
k.ba(v,q)
k=v
k.e=!1
case 7:z=o>300?8:9
break
case 8:k=C
k=k.d
l="###fps  "+k.cO(p,o)
k=H
k.du(l)
p=0
o=0
case 9:case 3:u=n
z=2
break
case 4:return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$ao,y,null)},
eu:function(){var z,y,x,w
z=P.aU()
y=new G.fX(this,z)
x=new G.fW(this,z)
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
ej:function(){var z,y
z={}
z.a=!1
y=J.dS(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fP(z,this)),y.c),[H.t(y,0)]).u()
y=J.dY(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fQ(z,this)),y.c),[H.t(y,0)]).u()
y=J.dT(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fR(z)),y.c),[H.t(y,0)]).u()
y=J.dU(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fS(z,this)),y.c),[H.t(y,0)]).u()
y=J.dV(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fT(z,this)),y.c),[H.t(y,0)]).u()
y=J.dW(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fU(z)),y.c),[H.t(y,0)]).u()
y=J.dX(this.a.b)
H.d(new W.v(0,y.a,y.b,W.x(new G.fV(z)),y.c),[H.t(y,0)]).u()}},
fa:{
"^":"a+fJ;"},
fX:{
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
if(x.av(u.identifier)){t=w.gE()
s=u.identifier
if(typeof s!=="number")return s.k()
w.W(t.c)
t.Y(w,s+1,"pointermove",r,q)
w.V()}else{x.p(0,u.identifier,u)
t=w.gE()
s=u.identifier
if(typeof s!=="number")return s.k()
w.W(t.c)
t.Y(w,s+1,"pointerdown",r,q)
w.V()}}}},
fW:{
"^":"c:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=J.c5(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.as)(z),++v){u=z[v]
if(x.av(u.identifier)){t=C.a.w(u.pageX)
s=C.a.w(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
s=C.a.w(w.a.b.offsetLeft)
r=C.a.w(u.pageX)
q=C.a.w(u.pageY)
new P.H(r,q).$builtinTypeInfo=[null]
r=C.a.w(w.a.b.offsetTop)
x.a9(0,u.identifier)
p=w.gE()
o=u.identifier
if(typeof o!=="number")return o.k()
w.W(p.c)
p.Y(w,o+1,"pointerup",t-s,q-r)
w.V()}}}},
fP:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gE()
x=J.i(a)
w=x.gR(a)
w=w.gF(w)
w.toString
x=x.gR(a)
x=x.gL(x)
x.toString
z.W(y.c)
y.Y(z,0,"pointerdown",w,x)
z.V()}},
fQ:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gE()
w=J.i(a)
v=w.gR(a)
v=v.gF(v)
v.toString
w=w.gR(a)
w=w.gL(w)
w.toString
y.W(x.c)
x.Y(y,0,"pointerup",v,w)
y.V()
z.a=!1}}},
fR:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fS:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gE()
w=J.i(a)
v=w.gR(a)
v=v.gF(v)
v.toString
w=w.gR(a)
w=w.gL(w)
w.toString
y.W(x.c)
x.Y(y,0,"pointercancel",v,w)
y.V()
z.a=!1}}},
fT:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gE()
x=J.i(a)
w=x.gR(a)
w=w.gF(w)
w.toString
x=x.gR(a)
x=x.gL(x)
x.toString
z.W(y.c)
y.Y(z,0,"pointermove",w,x)
z.V()}}},
fU:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fV:{
"^":"c:3;a",
$1:function(a){P.ag("over offset="+H.b(a.geN())+":"+H.b(a.geO())+"  client="+H.b(a.geL())+":"+H.b(a.geM())+" screen="+H.b(a.gez(a))+":"+H.b(a.geA(a)))
if(this.a.a);}}}],["","",,E,{
"^":"",
Q:{
"^":"a;m:a<",
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
gdY:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
an:function(a){var z,y,x
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
return new E.a1(z)},
b3:function(a){var z=new E.Q(new Float64Array(H.r(16)))
z.ac(this)
return z},
X:function(a,b){var z,y,x
if(!!b.$isa1){z=new Float64Array(H.r(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a1(z)}if(!!b.$isa0){z=new Float64Array(H.r(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.a0(z)}if(4===b.gdY()){z=new Float64Array(H.r(16))
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
bj:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isa1
x=y?b.gbk():1
if(!!z.$isa0||y){w=z.gF(b)
v=z.gL(b)
u=z.gex(b)}else{u=d
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
bn:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isa1
x=y?b.gbk():1
if(!!z.$isa0||y){w=z.gF(b)
v=z.gL(b)
u=z.gex(b)}else{u=d
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
ee:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
"^":"a;m:a<",
aG:function(a,b,c){var z=this.a
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
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
k:function(a,b){var z,y,x,w
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
z=C.a.k(z[2],b.gm().h(0,2))
w=new E.a0(new Float64Array(H.r(3)))
w.aG(y,x,z)
return w},
X:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.O(b)
x=z[1]
z=z[2]
w=new E.a0(new Float64Array(H.r(3)))
w.aG(y*b,x*b,z*b)
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
b3:function(a){var z=new E.a0(new Float64Array(H.r(3)))
z.ac(this)
return z},
gF:function(a){return this.a[0]},
gL:function(a){return this.a[1]}},
a1:{
"^":"a;m:a<",
bp:function(a,b,c,d){var z=this.a
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
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
k:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
w=C.a.k(z[2],b.gm().h(0,2))
z=C.a.k(z[3],b.gm().h(0,3))
v=new E.a1(new Float64Array(H.r(4)))
v.bp(y,x,w,z)
return v},
X:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.O(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a1(new Float64Array(H.r(4)))
v.bp(y*b,x*b,w*b,z*b)
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
b3:function(a){var z=new E.a1(new Float64Array(H.r(4)))
z.ac(this)
return z},
gF:function(a){return this.a[0]},
gL:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cl.prototype
return J.eU.prototype}if(typeof a=="string")return J.aR.prototype
if(a==null)return J.eV.prototype
if(typeof a=="boolean")return J.eT.prototype
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
J.ig=function(a){if(typeof a=="number")return J.aC.prototype
if(typeof a=="string")return J.aR.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bG.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.at=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ig(a).k(a,b)}
J.a5=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).l(a,b)}
J.dA=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dm(a).aD(a,b)}
J.c_=function(a,b){if(a.constructor==Array||typeof a=="string"||H.iv(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.N(a).h(a,b)}
J.dB=function(a,b,c,d){return J.i(a).cZ(a,b,c,d)}
J.dC=function(a,b,c,d){return J.i(a).dq(a,b,c,d)}
J.c0=function(a,b,c){return J.i(a).dw(a,b,c)}
J.dD=function(a,b){return J.i(a).dA(a,b)}
J.dE=function(a,b,c,d,e){return J.i(a).dB(a,b,c,d,e)}
J.dF=function(a,b){return J.ar(a).dF(a,b)}
J.dG=function(a,b,c,d,e){return J.i(a).dG(a,b,c,d,e)}
J.dH=function(a,b){return J.i(a).dH(a,b)}
J.dI=function(a,b){return J.i(a).dI(a,b)}
J.c1=function(a,b,c,d,e){return J.i(a).dK(a,b,c,d,e)}
J.dJ=function(a,b){return J.i(a).au(a,b)}
J.c2=function(a){return J.i(a).dN(a)}
J.dK=function(a){return J.i(a).dO(a)}
J.dL=function(a,b){return J.i(a).dP(a,b)}
J.dM=function(a,b){return J.i(a).dQ(a,b)}
J.dN=function(a,b){return J.i(a).dR(a,b)}
J.c3=function(a,b){return J.i(a).dS(a,b)}
J.dO=function(a,b,c,d,e){return J.i(a).dZ(a,b,c,d,e)}
J.dP=function(a,b){return J.ar(a).U(a,b)}
J.c4=function(a,b){return J.i(a).e_(a,b)}
J.dQ=function(a,b){return J.i(a).e0(a,b)}
J.dR=function(a,b){return J.ar(a).C(a,b)}
J.c5=function(a){return J.i(a).gdD(a)}
J.S=function(a){return J.i(a).gah(a)}
J.D=function(a){return J.l(a).gt(a)}
J.bg=function(a){return J.ar(a).gB(a)}
J.au=function(a){return J.N(a).gj(a)}
J.dS=function(a){return J.i(a).gc5(a)}
J.dT=function(a){return J.i(a).gc6(a)}
J.dU=function(a){return J.i(a).gc7(a)}
J.dV=function(a){return J.i(a).gc8(a)}
J.dW=function(a){return J.i(a).gc9(a)}
J.dX=function(a){return J.i(a).gca(a)}
J.dY=function(a){return J.i(a).gcb(a)}
J.dZ=function(a){return J.i(a).gbi(a)}
J.e_=function(a){return J.i(a).gF(a)}
J.e0=function(a,b,c){return J.i(a).co(a,b,c)}
J.e1=function(a){return J.i(a).cp(a)}
J.e2=function(a,b){return J.i(a).cq(a,b)}
J.bh=function(a,b,c){return J.i(a).ct(a,b,c)}
J.e3=function(a,b){return J.i(a).c2(a,b)}
J.e4=function(a,b){return J.ar(a).a8(a,b)}
J.e5=function(a){return J.i(a).D(a)}
J.ah=function(a,b){return J.i(a).aF(a,b)}
J.e6=function(a,b){return J.i(a).sv(a,b)}
J.e7=function(a,b){return J.i(a).sA(a,b)}
J.e8=function(a){return J.i(a).N(a)}
J.c6=function(a,b,c,d){return J.i(a).cG(a,b,c,d)}
J.c7=function(a,b,c,d){return J.i(a).cH(a,b,c,d)}
J.c8=function(a){return J.dm(a).a2(a)}
J.av=function(a){return J.l(a).i(a)}
J.c9=function(a,b){return J.i(a).ev(a,b)}
J.e9=function(a,b,c,d,e,f,g){return J.i(a).ew(a,b,c,d,e,f,g)}
var $=I.p
C.m=W.eA.prototype
C.c=J.aB.prototype
C.d=J.cl.prototype
C.a=J.aC.prototype
C.f=J.aR.prototype
C.v=J.fc.prototype
C.x=J.bG.prototype
C.k=new H.cf()
C.l=new P.hb()
C.b=new P.hH()
C.h=new P.ay(0)
C.n=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.i=function(hooks) { return hooks; }
C.o=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.p=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.q=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.r=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.j=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.t=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.u=new H.ez([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.cM(0)
C.w=new F.cM(1)
$.cz="$cachedFunction"
$.cA="$cachedInvocation"
$.P=0
$.ai=null
$.cb=null
$.bV=null
$.df=null
$.dv=null
$.b8=null
$.bb=null
$.bW=null
$.ab=null
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
I.$lazy(y,x,w)}})(["cj","$get$cj",function(){return H.eN()},"ck","$get$ck",function(){return new P.eu(null)},"cP","$get$cP",function(){return H.R(H.b2({toString:function(){return"$receiver$"}}))},"cQ","$get$cQ",function(){return H.R(H.b2({$method$:null,toString:function(){return"$receiver$"}}))},"cR","$get$cR",function(){return H.R(H.b2(null))},"cS","$get$cS",function(){return H.R(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cW","$get$cW",function(){return H.R(H.b2(void 0))},"cX","$get$cX",function(){return H.R(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cU","$get$cU",function(){return H.R(H.cV(null))},"cT","$get$cT",function(){return H.R(function(){try{null.$method$}catch(z){return z.message}}())},"cZ","$get$cZ",function(){return H.R(H.cV(void 0))},"cY","$get$cY",function(){return H.R(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bJ","$get$bJ",function(){return P.h_()},"aq","$get$aq",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bu]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.Z]},{func:1,args:[,],opt:[,]},{func:1,ret:P.U,args:[P.m]},{func:1,args:[W.bE]},{func:1,args:[,P.U]},{func:1,args:[P.U]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.Z]},{func:1,ret:P.bS},{func:1,void:true,args:[P.a],opt:[P.Z]},{func:1,void:true,args:[,P.Z]},{func:1,args:[,,]},{func:1,args:[P.cI,,]},{func:1,args:[P.U,,]},{func:1,ret:P.m,args:[,]},{func:1,args:[P.m]},{func:1,args:[P.m,,]},{func:1,args:[F.bB]},{func:1,ret:P.M,args:[W.aF]},{func:1,args:[W.aF]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iB(d||a)
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