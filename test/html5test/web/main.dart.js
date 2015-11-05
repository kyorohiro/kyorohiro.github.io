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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bG"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bG"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bG(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.dd=function(){}
var dart=[["","",,H,{
"^":"",
io:{
"^":"a;a"}}],["","",,J,{
"^":"",
m:function(a){return void 0},
b0:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aY:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bJ==null){H.ht()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.cT("Return interceptor for "+H.b(y(a,z))))}w=H.hC(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.w
else return C.x}return w},
e:{
"^":"a;",
p:function(a,b){return a===b},
gw:function(a){return H.M(a)},
i:["c9",function(a){return H.aN(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLTexture|WebGLUniformLocation"},
eq:{
"^":"e;",
i:function(a){return String(a)},
gw:function(a){return a?519018:218159},
$isbF:1},
es:{
"^":"e;",
p:function(a,b){return null==b},
i:function(a){return"null"},
gw:function(a){return 0}},
cd:{
"^":"e;",
gw:function(a){return 0},
$iset:1},
eE:{
"^":"cd;"},
bt:{
"^":"cd;",
i:function(a){return String(a)}},
ak:{
"^":"e;",
bC:function(a,b){if(!!a.immutable$list)throw H.c(new P.J(b))},
cW:function(a,b){if(!!a.fixed$length)throw H.c(new P.J(b))},
v:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.A(a))}},
U:function(a,b){return H.h(new H.bl(a,b),[null,null])},
ah:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.f(y,x)
y[x]=w}return y.join(b)},
N:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
gdq:function(a){if(a.length>0)return a[0]
throw H.c(H.bf())},
gbH:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.bf())},
b0:function(a,b,c,d,e){var z,y,x
this.bC(a,"set range")
P.cv(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.c(H.eo())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aG(a,"[","]")},
gA:function(a){return new J.dU(a,a.length,0,null)},
gw:function(a){return H.M(a)},
gj:function(a){return a.length},
sj:function(a,b){this.cW(a,"set length")
if(b<0)throw H.c(P.ao(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.q(a,b))
if(b>=a.length||b<0)throw H.c(H.q(a,b))
return a[b]},
u:function(a,b,c){this.bC(a,"indexed set")
if(b>=a.length||!1)throw H.c(H.q(a,b))
a[b]=c},
$isbg:1,
$isk:1,
$ask:null,
$iso:1},
im:{
"^":"ak;"},
dU:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
q:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(new P.A(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
al:{
"^":"e;",
aS:function(a,b){return a%b},
aV:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.c(new P.J(""+a))},
dQ:function(a){return a},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.c(H.a0(b))
return a+b},
Y:function(a,b){return(a|0)===a?a/b|0:this.aV(a/b)},
bw:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
am:function(a,b){if(typeof b!=="number")throw H.c(H.a0(b))
return a<b},
$isax:1},
cc:{
"^":"al;",
$isax:1,
$isn:1},
er:{
"^":"al;",
$isax:1},
aH:{
"^":"e;",
d0:function(a,b){if(b>=a.length)throw H.c(H.q(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.c(P.dT(b,null,null))
return a+b},
c8:function(a,b,c){H.da(b)
if(c==null)c=a.length
H.da(c)
if(b<0)throw H.c(P.aO(b,null,null))
if(typeof c!=="number")return H.Q(c)
if(b>c)throw H.c(P.aO(b,null,null))
if(c>a.length)throw H.c(P.aO(c,null,null))
return a.substring(b,c)},
c7:function(a,b){return this.c8(a,b,null)},
d4:function(a,b,c){if(c>a.length)throw H.c(P.ao(c,0,a.length,null,null))
return H.hI(a,b,c)},
gC:function(a){return a.length===0},
i:function(a){return a},
gw:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.q(a,b))
if(b>=a.length||b<0)throw H.c(H.q(a,b))
return a[b]},
$isbg:1,
$isI:1}}],["","",,H,{
"^":"",
at:function(a,b){var z=a.a0(b)
if(!init.globalState.d.cy)init.globalState.f.a5()
return z},
b_:function(){--init.globalState.f.b},
dm:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isk)throw H.c(P.aB("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.fP(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$ca()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.fr(P.bj(null,H.as),0)
y.z=P.aI(null,null,null,P.n,H.bz)
y.ch=P.aI(null,null,null,P.n,null)
if(y.x===!0){x=new H.fO()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eh,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.fQ)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aI(null,null,null,P.n,H.aP)
w=P.a5(null,null,null,P.n)
v=new H.aP(0,null,!1)
u=new H.bz(y,x,w,init.createNewIsolate(),v,new H.T(H.b1()),new H.T(H.b1()),!1,!1,[],P.a5(null,null,null,null),null,null,!1,!0,P.a5(null,null,null,null))
w.T(0,0)
u.b4(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.av()
x=H.a1(y,[y]).L(a)
if(x)u.a0(new H.hG(z,a))
else{y=H.a1(y,[y,y]).L(a)
if(y)u.a0(new H.hH(z,a))
else u.a0(a)}init.globalState.f.a5()},
el:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.em()
return},
em:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.J("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.J("Cannot extract URI from \""+H.b(z)+"\""))},
eh:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.aS(!0,[]).M(b.data)
y=J.D(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.aS(!0,[]).M(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.aS(!0,[]).M(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aI(null,null,null,P.n,H.aP)
p=P.a5(null,null,null,P.n)
o=new H.aP(0,null,!1)
n=new H.bz(y,q,p,init.createNewIsolate(),o,new H.T(H.b1()),new H.T(H.b1()),!1,!1,[],P.a5(null,null,null,null),null,null,!1,!0,P.a5(null,null,null,null))
p.T(0,0)
n.b4(0,o)
init.globalState.f.a.J(new H.as(n,new H.ei(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.a5()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").K(y.h(z,"msg"))
init.globalState.f.a5()
break
case"close":init.globalState.ch.a4(0,$.$get$cb().h(0,a))
a.terminate()
init.globalState.f.a5()
break
case"log":H.eg(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.W(["command","print","msg",z])
q=new H.X(!0,P.V(null,P.n)).B(q)
y.toString
self.postMessage(q)}else P.ay(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
eg:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.W(["command","log","msg",a])
x=new H.X(!0,P.V(null,P.n)).B(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.w(w)
z=H.u(w)
throw H.c(P.aF(z))}},
ej:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cr=$.cr+("_"+y)
$.cs=$.cs+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.K(["spawned",new H.aU(y,x),w,z.r])
x=new H.ek(a,b,c,d,z)
if(e===!0){z.bz(w,w)
init.globalState.f.a.J(new H.as(z,x,"start isolate"))}else x.$0()},
h7:function(a){return new H.aS(!0,[]).M(new H.X(!1,P.V(null,P.n)).B(a))},
hG:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
hH:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
fP:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{fQ:function(a){var z=P.W(["command","print","msg",a])
return new H.X(!0,P.V(null,P.n)).B(z)}}},
bz:{
"^":"a;a,b,c,dF:d<,d5:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bz:function(a,b){if(!this.f.p(0,a))return
if(this.Q.T(0,b)&&!this.y)this.y=!0
this.aG()},
dJ:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a4(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,0)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.f(v,w)
v[w]=x
if(w===y.c)y.bf();++y.d}this.y=!1}this.aG()},
cP:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
dI:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.v(new P.J("removeRange"))
P.cv(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
c3:function(a,b){if(!this.r.p(0,a))return
this.db=b},
du:function(a,b,c){var z=J.m(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){a.K(c)
return}z=this.cx
if(z==null){z=P.bj(null,null)
this.cx=z}z.J(new H.fJ(a,c))},
ds:function(a,b){var z
if(!this.r.p(0,a))return
z=J.m(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){this.aN()
return}z=this.cx
if(z==null){z=P.bj(null,null)
this.cx=z}z.J(this.gdG())},
dv:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ay(a)
if(b!=null)P.ay(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aj(a)
y[1]=b==null?null:J.aj(b)
for(x=new P.cf(z,z.r,null,null),x.c=z.e;x.q();)x.d.K(y)},
a0:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.w(u)
w=t
v=H.u(u)
this.dv(w,v)
if(this.db===!0){this.aN()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gdF()
if(this.cx!=null)for(;t=this.cx,!t.gC(t);)this.cx.bL().$0()}return y},
bK:function(a){return this.b.h(0,a)},
b4:function(a,b){var z=this.b
if(z.aK(a))throw H.c(P.aF("Registry: ports must be registered only once."))
z.u(0,a,b)},
aG:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.aN()},
aN:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.H(0)
for(z=this.b,y=z.gbR(z),y=y.gA(y);y.q();)y.gt().cn()
z.H(0)
this.c.H(0)
init.globalState.z.a4(0,this.a)
this.dx.H(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.K(z[v])}this.ch=null}},"$0","gdG",0,0,1]},
fJ:{
"^":"d:1;a,b",
$0:function(){this.a.K(this.b)}},
fr:{
"^":"a;a,b",
dd:function(){var z=this.a
if(z.b===z.c)return
return z.bL()},
bP:function(){var z,y,x
z=this.dd()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aK(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gC(y)}else y=!1
else y=!1
else y=!1
if(y)H.v(P.aF("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gC(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.W(["command","close"])
x=new H.X(!0,P.V(null,P.n)).B(x)
y.toString
self.postMessage(x)}return!1}z.dH()
return!0},
bq:function(){if(self.window!=null)new H.fs(this).$0()
else for(;this.bP(););},
a5:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bq()
else try{this.bq()}catch(x){w=H.w(x)
z=w
y=H.u(x)
w=init.globalState.Q
v=P.W(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.X(!0,P.V(null,P.n)).B(v)
w.toString
self.postMessage(v)}}},
fs:{
"^":"d:1;a",
$0:function(){if(!this.a.bP())return
P.f1(C.h,this)}},
as:{
"^":"a;a,b,c",
dH:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.a0(this.b)}},
fO:{
"^":"a;"},
ei:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.ej(this.a,this.b,this.c,this.d,this.e,this.f)}},
ek:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.av()
w=H.a1(x,[x,x]).L(y)
if(w)y.$2(this.b,this.c)
else{x=H.a1(x,[x]).L(y)
if(x)y.$1(this.b)
else y.$0()}}z.aG()}},
cX:{
"^":"a;"},
aU:{
"^":"cX;b,a",
K:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbi())return
x=H.h7(a)
if(z.gd5()===y){y=J.D(x)
switch(y.h(x,0)){case"pause":z.bz(y.h(x,1),y.h(x,2))
break
case"resume":z.dJ(y.h(x,1))
break
case"add-ondone":z.cP(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.dI(y.h(x,1))
break
case"set-errors-fatal":z.c3(y.h(x,1),y.h(x,2))
break
case"ping":z.du(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ds(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.T(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a4(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.J(new H.as(z,new H.fS(this,x),w))},
p:function(a,b){if(b==null)return!1
return b instanceof H.aU&&J.R(this.b,b.b)},
gw:function(a){return this.b.gaB()}},
fS:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbi())z.cj(this.b)}},
bB:{
"^":"cX;b,c,a",
K:function(a){var z,y,x
z=P.W(["command","message","port",this,"msg",a])
y=new H.X(!0,P.V(null,P.n)).B(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
p:function(a,b){if(b==null)return!1
return b instanceof H.bB&&J.R(this.b,b.b)&&J.R(this.a,b.a)&&J.R(this.c,b.c)},
gw:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.c4()
y=this.a
if(typeof y!=="number")return y.c4()
x=this.c
if(typeof x!=="number")return H.Q(x)
return(z<<16^y<<8^x)>>>0}},
aP:{
"^":"a;aB:a<,b,bi:c<",
cn:function(){this.c=!0
this.b=null},
cj:function(a){if(this.c)return
this.cz(a)},
cz:function(a){return this.b.$1(a)},
$iseF:1},
eY:{
"^":"a;a,b,c",
cd:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.J(new H.as(y,new H.f_(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ae(new H.f0(this,b),0),a)}else throw H.c(new P.J("Timer greater than 0."))},
static:{eZ:function(a,b){var z=new H.eY(!0,!1,null)
z.cd(a,b)
return z}}},
f_:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
f0:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
H.b_()
this.b.$0()}},
T:{
"^":"a;aB:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.dX()
z=C.a.bw(z,0)^C.a.Y(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
p:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.T){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
X:{
"^":"a;a,b",
B:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gj(z))
z=J.m(a)
if(!!z.$isck)return["buffer",a]
if(!!z.$isbo)return["typed",a]
if(!!z.$isbg)return this.c_(a)
if(!!z.$isef){x=this.gbX()
w=a.gbG()
w=H.aK(w,x,H.y(w,"B",0),null)
w=P.bk(w,!0,H.y(w,"B",0))
z=z.gbR(a)
z=H.aK(z,x,H.y(z,"B",0),null)
return["map",w,P.bk(z,!0,H.y(z,"B",0))]}if(!!z.$iset)return this.c0(a)
if(!!z.$ise)this.bQ(a)
if(!!z.$iseF)this.a6(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isaU)return this.c1(a)
if(!!z.$isbB)return this.c2(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.a6(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isT)return["capability",a.a]
if(!(a instanceof P.a))this.bQ(a)
return["dart",init.classIdExtractor(a),this.bZ(init.classFieldsExtractor(a))]},"$1","gbX",2,0,2],
a6:function(a,b){throw H.c(new P.J(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
bQ:function(a){return this.a6(a,null)},
c_:function(a){var z=this.bY(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.a6(a,"Can't serialize indexable: ")},
bY:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.B(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bZ:function(a){var z
for(z=0;z<a.length;++z)C.c.u(a,z,this.B(a[z]))
return a},
c0:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.a6(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.B(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
c2:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
c1:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaB()]
return["raw sendport",a]}},
aS:{
"^":"a;a,b",
M:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.aB("Bad serialized message: "+H.b(a)))
switch(C.c.gdq(a)){case"ref":if(1>=a.length)return H.f(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.f(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.Z(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.Z(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.Z(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.Z(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.dg(a)
case"sendport":return this.dh(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.df(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.T(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.Z(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gde",2,0,2],
Z:function(a){var z,y,x
z=J.D(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.Q(x)
if(!(y<x))break
z.u(a,y,this.M(z.h(a,y)));++y}return a},
dg:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.ce()
this.b.push(w)
y=J.dM(y,this.gde()).aW(0)
for(z=J.D(y),v=J.D(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.f(y,u)
w.u(0,y[u],this.M(v.h(x,u)))}return w},
dh:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.R(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bK(w)
if(u==null)return
t=new H.aU(u,x)}else t=new H.bB(y,w,x)
this.b.push(t)
return t},
df:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.D(y)
v=J.D(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.Q(t)
if(!(u<t))break
w[z.h(y,u)]=this.M(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
e1:function(){throw H.c(new P.J("Cannot modify unmodifiable Map"))},
ho:function(a){return init.types[a]},
hB:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isbh},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aj(a)
if(typeof z!=="string")throw H.c(H.a0(a))
return z},
M:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
ct:function(a){var z,y
z=C.i(J.m(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.d0(z,0)===36)z=C.e.c7(z,1)
return(z+H.dh(H.bH(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aN:function(a){return"Instance of '"+H.ct(a)+"'"},
aM:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.a0(a))
return a[b]},
bp:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.a0(a))
a[b]=c},
Q:function(a){throw H.c(H.a0(a))},
f:function(a,b){if(a==null)J.ah(a)
throw H.c(H.q(a,b))},
q:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.S(!0,b,"index",null)
z=J.ah(a)
if(!(b<0)){if(typeof z!=="number")return H.Q(z)
y=b>=z}else y=!0
if(y)return P.c9(b,a,"index",null,z)
return P.aO(b,"index",null)},
a0:function(a){return new P.S(!0,a,null,null)},
aV:function(a){return a},
da:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.a0(a))
return a},
c:function(a){var z
if(a==null)a=new P.cq()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dp})
z.name=""}else z.toString=H.dp
return z},
dp:function(){return J.aj(this.dartException)},
v:function(a){throw H.c(a)},
w:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hK(a)
if(a==null)return
if(a instanceof H.be)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bw(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bi(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cp(v,null))}}if(a instanceof TypeError){u=$.$get$cI()
t=$.$get$cJ()
s=$.$get$cK()
r=$.$get$cL()
q=$.$get$cP()
p=$.$get$cQ()
o=$.$get$cN()
$.$get$cM()
n=$.$get$cS()
m=$.$get$cR()
l=u.D(y)
if(l!=null)return z.$1(H.bi(y,l))
else{l=t.D(y)
if(l!=null){l.method="call"
return z.$1(H.bi(y,l))}else{l=s.D(y)
if(l==null){l=r.D(y)
if(l==null){l=q.D(y)
if(l==null){l=p.D(y)
if(l==null){l=o.D(y)
if(l==null){l=r.D(y)
if(l==null){l=n.D(y)
if(l==null){l=m.D(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cp(y,l==null?null:l.method))}}return z.$1(new H.fe(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cy()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.S(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cy()
return a},
u:function(a){var z
if(a instanceof H.be)return a.b
if(a==null)return new H.d_(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d_(a,null)},
hE:function(a){if(a==null||typeof a!='object')return J.az(a)
else return H.M(a)},
dc:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
hv:function(a,b,c,d,e,f,g){var z=J.m(c)
if(z.p(c,0))return H.at(b,new H.hw(a))
else if(z.p(c,1))return H.at(b,new H.hx(a,d))
else if(z.p(c,2))return H.at(b,new H.hy(a,d,e))
else if(z.p(c,3))return H.at(b,new H.hz(a,d,e,f))
else if(z.p(c,4))return H.at(b,new H.hA(a,d,e,f,g))
else throw H.c(P.aF("Unsupported number of arguments for wrapped closure"))},
ae:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.hv)
a.$identity=z
return z},
e_:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isk){z.$reflectionInfo=c
x=H.eH(z).r}else x=c
w=d?Object.create(new H.eM().constructor.prototype):Object.create(new H.bb(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.E
$.E=J.af(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.bW(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ho(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.bU:H.bc
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bW(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
dX:function(a,b,c,d){var z=H.bc
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bW:function(a,b,c){var z,y,x,w,v,u
if(c)return H.dZ(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.dX(y,!w,z,b)
if(y===0){w=$.a4
if(w==null){w=H.aC("self")
$.a4=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.E
$.E=J.af(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.a4
if(v==null){v=H.aC("self")
$.a4=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.E
$.E=J.af(w,1)
return new Function(v+H.b(w)+"}")()},
dY:function(a,b,c,d){var z,y
z=H.bc
y=H.bU
switch(b?-1:a){case 0:throw H.c(new H.eI("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
dZ:function(a,b){var z,y,x,w,v,u,t,s
z=H.dV()
y=$.bT
if(y==null){y=H.aC("receiver")
$.bT=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.dY(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.E
$.E=J.af(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.E
$.E=J.af(u,1)
return new Function(y+H.b(u)+"}")()},
bG:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.e_(a,b,z,!!d,e,f)},
hJ:function(a){throw H.c(new P.e4("Cyclic initialization for static "+H.b(a)))},
a1:function(a,b,c){return new H.eJ(a,b,c,null)},
av:function(){return C.l},
b1:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
t:function(a,b,c){var z
if(b===0){J.dB(c,a)
return}else if(b===1){c.bD(H.w(a),H.u(a))
return}if(!!J.m(a).$isH)z=a
else{z=H.h(new P.x(0,$.j,null),[null])
z.b5(a)}z.aU(H.d6(b,0),new H.hg(b))
return c.gdr()},
d6:function(a,b){return new H.hd(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
h:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bH:function(a){if(a==null)return
return a.$builtinTypeInfo},
df:function(a,b){return H.dn(a["$as"+H.b(b)],H.bH(a))},
y:function(a,b,c){var z=H.df(a,b)
return z==null?null:z[c]},
a2:function(a,b){var z=H.bH(a)
return z==null?null:z[b]},
bM:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dh(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dh:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bq("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.bM(u,c))}return w?"":"<"+H.b(z)+">"},
dn:function(a,b){if(typeof a=="function"){a=H.bK(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bK(a,null,b)}return b},
hf:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.z(a[y],b[y]))return!1
return!0},
aW:function(a,b,c){return H.bK(a,b,H.df(b,c))},
z:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dg(a,b)
if('func' in a)return b.builtin$cls==="ea"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bM(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.bM(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hf(H.dn(v,z),x)},
d8:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.z(z,v)||H.z(v,z)))return!1}return!0},
he:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.z(v,u)||H.z(u,v)))return!1}return!0},
dg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.z(z,y)||H.z(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.d8(x,w,!1))return!1
if(!H.d8(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.z(o,n)||H.z(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.z(o,n)||H.z(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.z(o,n)||H.z(n,o)))return!1}}return H.he(a.named,b.named)},
bK:function(a,b,c){return a.apply(b,c)},
j9:function(a){var z=$.bI
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
j7:function(a){return H.M(a)},
j6:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hC:function(a){var z,y,x,w,v,u
z=$.bI.$1(a)
y=$.aX[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aZ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.d7.$2(a,z)
if(z!=null){y=$.aX[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aZ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bL(x)
$.aX[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.aZ[z]=x
return x}if(v==="-"){u=H.bL(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dj(a,x)
if(v==="*")throw H.c(new P.cT(z))
if(init.leafTags[z]===true){u=H.bL(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dj(a,x)},
dj:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.b0(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bL:function(a){return J.b0(a,!1,null,!!a.$isbh)},
hD:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.b0(z,!1,null,!!z.$isbh)
else return J.b0(z,c,null,null)},
ht:function(){if(!0===$.bJ)return
$.bJ=!0
H.hu()},
hu:function(){var z,y,x,w,v,u,t,s
$.aX=Object.create(null)
$.aZ=Object.create(null)
H.hp()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dk.$1(v)
if(u!=null){t=H.hD(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
hp:function(){var z,y,x,w,v,u,t
z=C.q()
z=H.a_(C.n,H.a_(C.t,H.a_(C.j,H.a_(C.j,H.a_(C.r,H.a_(C.o,H.a_(C.p(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bI=new H.hq(v)
$.d7=new H.hr(u)
$.dk=new H.hs(t)},
a_:function(a,b){return a(b)||b},
hI:function(a,b,c){return a.indexOf(b,c)>=0},
e0:{
"^":"a;",
i:function(a){return P.cj(this)},
u:function(a,b,c){return H.e1()}},
eb:{
"^":"e0;a",
aA:function(){var z=this.$map
if(z==null){z=new H.am(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dc(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aA().h(0,b)},
v:function(a,b){this.aA().v(0,b)},
gj:function(a){var z=this.aA()
return z.gj(z)}},
eG:{
"^":"a;a,b,c,d,e,f,r,x",
static:{eH:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.eG(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fd:{
"^":"a;a,b,c,d,e,f",
D:function(a){var z,y,x
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
static:{F:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fd(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},aQ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},cO:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cp:{
"^":"r;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
ev:{
"^":"r;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bi:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ev(a,y,z?null:b.receiver)}}},
fe:{
"^":"r;a",
i:function(a){var z=this.a
return C.e.gC(z)?"Error":"Error: "+z}},
hK:{
"^":"d:2;a",
$1:function(a){if(!!J.m(a).$isr)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
d_:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
hw:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
hx:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
hy:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
hz:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
hA:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"a;",
i:function(a){return"Closure '"+H.ct(this)+"'"},
gbS:function(){return this},
gbS:function(){return this}},
cB:{
"^":"d;"},
eM:{
"^":"cB;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bb:{
"^":"cB;a,b,c,d",
p:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bb))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.M(this.a)
else y=typeof z!=="object"?J.az(z):H.M(z)
z=H.M(this.b)
if(typeof y!=="number")return y.dY()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aN(z)},
static:{bc:function(a){return a.a},bU:function(a){return a.c},dV:function(){var z=$.a4
if(z==null){z=H.aC("self")
$.a4=z}return z},aC:function(a){var z,y,x,w,v
z=new H.bb("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eI:{
"^":"r;a",
i:function(a){return"RuntimeError: "+this.a}},
cx:{
"^":"a;"},
eJ:{
"^":"cx;a,b,c,d",
L:function(a){var z=this.cs(a)
return z==null?!1:H.dg(z,this.V())},
cs:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
V:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$isiT)z.void=true
else if(!x.$isc1)z.ret=y.V()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cw(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cw(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.db(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].V()}z.named=w}return z},
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
t=H.db(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].V())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cw:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].V())
return z}}},
c1:{
"^":"cx;",
i:function(a){return"dynamic"},
V:function(){return}},
be:{
"^":"a;a,E:b<"},
hg:{
"^":"d:4;a",
$2:function(a,b){H.d6(this.a,1).$1(new H.be(a,b))}},
hd:{
"^":"d:2;a,b",
$1:function(a){this.b(this.a,a)}},
am:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gC:function(a){return this.a===0},
gbG:function(){return H.h(new H.ex(this),[H.a2(this,0)])},
gbR:function(a){return H.aK(this.gbG(),new H.eu(this),H.a2(this,0),H.a2(this,1))},
aK:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bb(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bb(y,a)}else return this.dB(a)},
dB:function(a){var z=this.d
if(z==null)return!1
return this.a2(this.G(z,this.a1(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.G(z,b)
return y==null?null:y.gO()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.G(x,b)
return y==null?null:y.gO()}else return this.dC(b)},
dC:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.G(z,this.a1(a))
x=this.a2(y,a)
if(x<0)return
return y[x].gO()},
u:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aD()
this.b=z}this.b3(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aD()
this.c=y}this.b3(y,b,c)}else this.dE(b,c)},
dE:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aD()
this.d=z}y=this.a1(a)
x=this.G(z,y)
if(x==null)this.aF(z,y,[this.aE(a,b)])
else{w=this.a2(x,a)
if(w>=0)x[w].sO(b)
else x.push(this.aE(a,b))}},
a4:function(a,b){if(typeof b==="string")return this.bp(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bp(this.c,b)
else return this.dD(b)},
dD:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.G(z,this.a1(a))
x=this.a2(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bx(w)
return w.gO()},
H:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
v:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.A(this))
z=z.c}},
b3:function(a,b,c){var z=this.G(a,b)
if(z==null)this.aF(a,b,this.aE(b,c))
else z.sO(c)},
bp:function(a,b){var z
if(a==null)return
z=this.G(a,b)
if(z==null)return
this.bx(z)
this.bc(a,b)
return z.gO()},
aE:function(a,b){var z,y
z=new H.ew(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bx:function(a){var z,y
z=a.gcI()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
a1:function(a){return J.az(a)&0x3ffffff},
a2:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.R(a[y].gbF(),b))return y
return-1},
i:function(a){return P.cj(this)},
G:function(a,b){return a[b]},
aF:function(a,b,c){a[b]=c},
bc:function(a,b){delete a[b]},
bb:function(a,b){return this.G(a,b)!=null},
aD:function(){var z=Object.create(null)
this.aF(z,"<non-identifier-key>",z)
this.bc(z,"<non-identifier-key>")
return z},
$isef:1},
eu:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
ew:{
"^":"a;bF:a<,O:b@,c,cI:d<"},
ex:{
"^":"B;a",
gj:function(a){return this.a.a},
gA:function(a){var z,y
z=this.a
y=new H.ey(z,z.r,null,null)
y.c=z.e
return y},
v:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.A(z))
y=y.c}},
$iso:1},
ey:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
q:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.A(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hq:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
hr:{
"^":"d:7;a",
$2:function(a,b){return this.a(a,b)}},
hs:{
"^":"d:8;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bf:function(){return new P.a6("No element")},
eo:function(){return new P.a6("Too few elements")},
eW:function(a){return a.ge2()},
aJ:{
"^":"B;",
gA:function(a){return new H.cg(this,this.gj(this),0,null)},
v:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.N(0,y))
if(z!==this.gj(this))throw H.c(new P.A(this))}},
U:function(a,b){return H.h(new H.bl(this,b),[null,null])},
aX:function(a,b){var z,y,x
if(b){z=H.h([],[H.y(this,"aJ",0)])
C.c.sj(z,this.gj(this))}else z=H.h(Array(this.gj(this)),[H.y(this,"aJ",0)])
for(y=0;y<this.gj(this);++y){x=this.N(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
aW:function(a){return this.aX(a,!0)},
$iso:1},
cg:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
q:function(){var z,y,x,w
z=this.a
y=J.D(z)
x=y.gj(z)
if(this.b!==x)throw H.c(new P.A(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.N(z,w);++this.c
return!0}},
ci:{
"^":"B;a,b",
gA:function(a){var z=new H.eB(null,J.b7(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.ah(this.a)},
$asB:function(a,b){return[b]},
static:{aK:function(a,b,c,d){if(!!J.m(a).$iso)return H.h(new H.c2(a,b),[c,d])
return H.h(new H.ci(a,b),[c,d])}}},
c2:{
"^":"ci;a,b",
$iso:1},
eB:{
"^":"ep;a,b,c",
q:function(){var z=this.b
if(z.q()){this.a=this.az(z.gt())
return!0}this.a=null
return!1},
gt:function(){return this.a},
az:function(a){return this.c.$1(a)}},
bl:{
"^":"aJ;a,b",
gj:function(a){return J.ah(this.a)},
N:function(a,b){return this.az(J.dG(this.a,b))},
az:function(a){return this.b.$1(a)},
$asaJ:function(a,b){return[b]},
$asB:function(a,b){return[b]},
$iso:1},
c7:{
"^":"a;"}}],["","",,H,{
"^":"",
db:function(a){var z=H.h(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
ff:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hh()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ae(new P.fh(z),1)).observe(y,{childList:true})
return new P.fg(z,y,x)}else if(self.setImmediate!=null)return P.hi()
return P.hj()},
iV:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ae(new P.fi(a),0))},"$1","hh",2,0,3],
iW:[function(a){++init.globalState.f.b
self.setImmediate(H.ae(new P.fj(a),0))},"$1","hi",2,0,3],
iX:[function(a){P.br(C.h,a)},"$1","hj",2,0,3],
d1:function(a,b){var z=H.av()
z=H.a1(z,[z,z]).L(a)
if(z){b.toString
return a}else{b.toString
return a}},
aD:function(a){return H.h(new P.cW(H.h(new P.x(0,$.j,null),[a])),[a])},
h9:function(){var z,y
for(;z=$.Y,z!=null;){$.ac=null
y=z.c
$.Y=y
if(y==null)$.ab=null
$.j=z.b
z.cV()}},
j5:[function(){$.bC=!0
try{P.h9()}finally{$.j=C.b
$.ac=null
$.bC=!1
if($.Y!=null)$.$get$bv().$1(P.d9())}},"$0","d9",0,0,1],
d5:function(a){if($.Y==null){$.ab=a
$.Y=a
if(!$.bC)$.$get$bv().$1(P.d9())}else{$.ab.c=a
$.ab=a}},
dl:function(a){var z,y
z=$.j
if(C.b===z){P.Z(null,null,C.b,a)
return}z.toString
if(C.b.gaM()===z){P.Z(null,null,z,a)
return}y=$.j
P.Z(null,null,y,y.aH(a,!0))},
iM:function(a,b){var z,y,x
z=H.h(new P.d0(null,null,null,0),[b])
y=z.gcD()
x=z.gcF()
z.a=a.P(y,!0,z.gcE(),x)
return z},
hb:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.w(u)
z=t
y=H.u(u)
$.j.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.G(x)
w=t
v=x.gE()
c.$2(w,v)}}},
h3:function(a,b,c,d){var z=a.aI()
if(!!J.m(z).$isH)z.aY(new P.h6(b,c,d))
else b.F(c,d)},
h4:function(a,b){return new P.h5(a,b)},
f1:function(a,b){var z=$.j
if(z===C.b){z.toString
return P.br(a,b)}return P.br(a,z.aH(b,!0))},
br:function(a,b){var z=C.d.Y(a.a,1000)
return H.eZ(z<0?0:z,b)},
bu:function(a){var z=$.j
$.j=a
return z},
au:function(a,b,c,d,e){var z,y,x
z=new P.cV(new P.ha(d,e),C.b,null)
y=$.Y
if(y==null){P.d5(z)
$.ac=$.ab}else{x=$.ac
if(x==null){z.c=y
$.ac=z
$.Y=z}else{z.c=x.c
x.c=z
$.ac=z
if(z.c==null)$.ab=z}}},
d2:function(a,b,c,d){var z,y
if($.j===c)return d.$0()
z=P.bu(c)
try{y=d.$0()
return y}finally{$.j=z}},
d4:function(a,b,c,d,e){var z,y
if($.j===c)return d.$1(e)
z=P.bu(c)
try{y=d.$1(e)
return y}finally{$.j=z}},
d3:function(a,b,c,d,e,f){var z,y
if($.j===c)return d.$2(e,f)
z=P.bu(c)
try{y=d.$2(e,f)
return y}finally{$.j=z}},
Z:function(a,b,c,d){var z=C.b!==c
if(z){d=c.aH(d,!(!z||C.b.gaM()===c))
c=C.b}P.d5(new P.cV(d,c,null))},
fh:{
"^":"d:2;a",
$1:function(a){var z,y
H.b_()
z=this.a
y=z.a
z.a=null
y.$0()}},
fg:{
"^":"d:9;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fi:{
"^":"d:0;a",
$0:function(){H.b_()
this.a.$0()}},
fj:{
"^":"d:0;a",
$0:function(){H.b_()
this.a.$0()}},
h0:{
"^":"K;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{h1:function(a,b){if(b!=null)return b
if(!!J.m(a).$isr)return a.gE()
return}}},
H:{
"^":"a;"},
fn:{
"^":"a;dr:a<",
bD:function(a,b){a=a!=null?a:new P.cq()
if(this.a.a!==0)throw H.c(new P.a6("Future already completed"))
$.j.toString
this.F(a,b)},
d2:function(a){return this.bD(a,null)}},
cW:{
"^":"fn;a",
aJ:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.a6("Future already completed"))
z.b5(b)},
F:function(a,b){this.a.cm(a,b)}},
a9:{
"^":"a;bj:a<,dK:b>,c,d,e",
gS:function(){return this.b.b},
gbE:function(){return(this.c&1)!==0},
gdz:function(){return this.c===6},
gdw:function(){return this.c===8},
gcH:function(){return this.d},
gcO:function(){return this.d}},
x:{
"^":"a;ad:a?,S:b<,c",
gcA:function(){return this.a===8},
scB:function(a){if(a)this.a=2
else this.a=0},
aU:function(a,b){var z,y
z=H.h(new P.x(0,$.j,null),[null])
y=z.b
if(y!==C.b){y.toString
if(b!=null)b=P.d1(b,y)}this.aq(new P.a9(null,z,b==null?1:3,a,b))
return z},
aY:function(a){var z,y
z=$.j
y=new P.x(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.b)z.toString
this.aq(new P.a9(null,y,8,a,null))
return y},
aC:function(){if(this.a!==0)throw H.c(new P.a6("Future already completed"))
this.a=1},
gcN:function(){return this.c},
gX:function(){return this.c},
bv:function(a){this.a=4
this.c=a},
bu:function(a){this.a=8
this.c=a},
cL:function(a,b){this.bu(new P.K(a,b))},
aq:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.Z(null,null,z,new P.fw(this,a))}else{a.a=this.c
this.c=a}},
ac:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbj()
z.a=y}return y},
W:function(a){var z,y
z=J.m(a)
if(!!z.$isH)if(!!z.$isx)P.aT(a,this)
else P.by(a,this)
else{y=this.ac()
this.bv(a)
P.P(this,y)}},
ba:function(a){var z=this.ac()
this.bv(a)
P.P(this,z)},
F:[function(a,b){var z=this.ac()
this.bu(new P.K(a,b))
P.P(this,z)},function(a){return this.F(a,null)},"dZ","$2","$1","gaw",2,2,10,0],
b5:function(a){var z
if(a==null);else{z=J.m(a)
if(!!z.$isH){if(!!z.$isx){z=a.a
if(z>=4&&z===8){this.aC()
z=this.b
z.toString
P.Z(null,null,z,new P.fy(this,a))}else P.aT(a,this)}else P.by(a,this)
return}}this.aC()
z=this.b
z.toString
P.Z(null,null,z,new P.fz(this,a))},
cm:function(a,b){var z
this.aC()
z=this.b
z.toString
P.Z(null,null,z,new P.fx(this,a,b))},
$isH:1,
static:{by:function(a,b){var z,y,x,w
b.sad(2)
try{a.aU(new P.fA(b),new P.fB(b))}catch(x){w=H.w(x)
z=w
y=H.u(x)
P.dl(new P.fC(b,z,y))}},aT:function(a,b){var z
b.a=2
z=new P.a9(null,b,0,null,null)
if(a.a>=4)P.P(a,z)
else a.aq(z)},P:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gcA()
if(b==null){if(w){v=z.a.gX()
y=z.a.gS()
x=J.G(v)
u=v.gE()
y.toString
P.au(null,null,y,x,u)}return}for(;b.gbj()!=null;b=t){t=b.a
b.a=null
P.P(z.a,b)}x.a=!0
s=w?null:z.a.gcN()
x.b=s
x.c=!1
y=!w
if(!y||b.gbE()||b.c===8){r=b.gS()
if(w){u=z.a.gS()
u.toString
if(u==null?r!=null:u!==r){u=u.gaM()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gX()
y=z.a.gS()
x=J.G(v)
u=v.gE()
y.toString
P.au(null,null,y,x,u)
return}q=$.j
if(q==null?r!=null:q!==r)$.j=r
else q=null
if(y){if(b.gbE())x.a=new P.fE(x,b,s,r).$0()}else new P.fD(z,x,b,r).$0()
if(b.gdw())new P.fF(z,x,w,b,r).$0()
if(q!=null)$.j=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.m(y).$isH}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.x)if(p.a>=4){o.a=2
z.a=p
b=new P.a9(null,o,0,null,null)
y=p
continue}else P.aT(p,o)
else P.by(p,o)
return}}o=b.b
b=o.ac()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
fw:{
"^":"d:0;a,b",
$0:function(){P.P(this.a,this.b)}},
fA:{
"^":"d:2;a",
$1:function(a){this.a.ba(a)}},
fB:{
"^":"d:5;a",
$2:function(a,b){this.a.F(a,b)},
$1:function(a){return this.$2(a,null)}},
fC:{
"^":"d:0;a,b,c",
$0:function(){this.a.F(this.b,this.c)}},
fy:{
"^":"d:0;a,b",
$0:function(){P.aT(this.b,this.a)}},
fz:{
"^":"d:0;a,b",
$0:function(){this.a.ba(this.b)}},
fx:{
"^":"d:0;a,b,c",
$0:function(){this.a.F(this.b,this.c)}},
fE:{
"^":"d:11;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.al(this.b.gcH(),this.c)
return!0}catch(x){w=H.w(x)
z=w
y=H.u(x)
this.a.b=new P.K(z,y)
return!1}}},
fD:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gX()
y=!0
r=this.c
if(r.gdz()){x=r.d
try{y=this.d.al(x,J.G(z))}catch(q){r=H.w(q)
w=r
v=H.u(q)
r=J.G(z)
p=w
o=(r==null?p==null:r===p)?z:new P.K(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.av()
p=H.a1(p,[p,p]).L(r)
n=this.d
m=this.b
if(p)m.b=n.dL(u,J.G(z),z.gE())
else m.b=n.al(u,J.G(z))}catch(q){r=H.w(q)
t=r
s=H.u(q)
r=J.G(z)
p=t
o=(r==null?p==null:r===p)?z:new P.K(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
fF:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.bN(this.d.gcO())
z.a=w
v=w}catch(u){z=H.w(u)
y=z
x=H.u(u)
if(this.c){z=J.G(this.a.a.gX())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gX()
else v.b=new P.K(y,x)
v.a=!1
return}if(!!J.m(v).$isH){t=this.d
s=t.gdK(t)
s.scB(!0)
this.b.c=!0
v.aU(new P.fG(this.a,s),new P.fH(z,s))}}},
fG:{
"^":"d:2;a,b",
$1:function(a){P.P(this.a.a,new P.a9(null,this.b,0,null,null))}},
fH:{
"^":"d:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.x)){y=H.h(new P.x(0,$.j,null),[null])
z.a=y
y.cL(a,b)}P.P(z.a,new P.a9(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
cV:{
"^":"a;a,b,c",
cV:function(){return this.a.$0()}},
O:{
"^":"a;",
U:function(a,b){return H.h(new P.fR(b,this),[H.y(this,"O",0),null])},
v:function(a,b){var z,y
z={}
y=H.h(new P.x(0,$.j,null),[null])
z.a=null
z.a=this.P(new P.eQ(z,this,b,y),!0,new P.eR(y),y.gaw())
return y},
gj:function(a){var z,y
z={}
y=H.h(new P.x(0,$.j,null),[P.n])
z.a=0
this.P(new P.eS(z),!0,new P.eT(z,y),y.gaw())
return y},
aW:function(a){var z,y
z=H.h([],[H.y(this,"O",0)])
y=H.h(new P.x(0,$.j,null),[[P.k,H.y(this,"O",0)]])
this.P(new P.eU(this,z),!0,new P.eV(z,y),y.gaw())
return y}},
eQ:{
"^":"d;a,b,c,d",
$1:function(a){P.hb(new P.eO(this.c,a),new P.eP(),P.h4(this.a.a,this.d))},
$signature:function(){return H.aW(function(a){return{func:1,args:[a]}},this.b,"O")}},
eO:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
eP:{
"^":"d:2;",
$1:function(a){}},
eR:{
"^":"d:0;a",
$0:function(){this.a.W(null)}},
eS:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
eT:{
"^":"d:0;a,b",
$0:function(){this.b.W(this.a.a)}},
eU:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.aW(function(a){return{func:1,args:[a]}},this.a,"O")}},
eV:{
"^":"d:0;a,b",
$0:function(){this.b.W(this.a)}},
eN:{
"^":"a;"},
iZ:{
"^":"a;"},
fk:{
"^":"a;S:d<,ad:e?",
aQ:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bB()
if((z&4)===0&&(this.e&32)===0)this.bg(this.gbl())},
a3:function(a){return this.aQ(a,null)},
bM:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gC(z)}else z=!1
if(z)this.r.an(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bg(this.gbn())}}}},
aI:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.at()
return this.f},
at:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bB()
if((this.e&32)===0)this.r=null
this.f=this.bk()},
as:["ca",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.br(a)
else this.ar(new P.fo(a,null))}],
ap:["cb",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bt(a,b)
else this.ar(new P.fq(a,b,null))}],
cl:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bs()
else this.ar(C.m)},
bm:[function(){},"$0","gbl",0,0,1],
bo:[function(){},"$0","gbn",0,0,1],
bk:function(){return},
ar:function(a){var z,y
z=this.r
if(z==null){z=new P.h_(null,null,0)
this.r=z}z.T(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.an(this)}},
br:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.aT(this.a,a)
this.e=(this.e&4294967263)>>>0
this.au((z&4)!==0)},
bt:function(a,b){var z,y
z=this.e
y=new P.fm(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.at()
z=this.f
if(!!J.m(z).$isH)z.aY(y)
else y.$0()}else{y.$0()
this.au((z&4)!==0)}},
bs:function(){var z,y
z=new P.fl(this)
this.at()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isH)y.aY(z)
else z.$0()},
bg:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.au((z&4)!==0)},
au:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gC(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gC(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bm()
else this.bo()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.an(this)},
cg:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.d1(b,z)
this.c=c}},
fm:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.av()
x=H.a1(x,[x,x]).L(y)
w=z.d
v=this.b
u=z.b
if(x)w.dM(u,v,this.c)
else w.aT(u,v)
z.e=(z.e&4294967263)>>>0}},
fl:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.bO(z.c)
z.e=(z.e&4294967263)>>>0}},
cY:{
"^":"a;ak:a@"},
fo:{
"^":"cY;b,a",
aR:function(a){a.br(this.b)}},
fq:{
"^":"cY;a_:b>,E:c<,a",
aR:function(a){a.bt(this.b,this.c)}},
fp:{
"^":"a;",
aR:function(a){a.bs()},
gak:function(){return},
sak:function(a){throw H.c(new P.a6("No events after a done."))}},
fT:{
"^":"a;ad:a?",
an:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dl(new P.fU(this,a))
this.a=1},
bB:function(){if(this.a===1)this.a=3}},
fU:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.dt(this.b)}},
h_:{
"^":"fT;b,c,a",
gC:function(a){return this.c==null},
T:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sak(b)
this.c=b}},
dt:function(a){var z,y
z=this.b
y=z.gak()
this.b=y
if(y==null)this.c=null
z.aR(a)}},
d0:{
"^":"a;a,b,c,ad:d?",
b6:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
e3:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.W(!0)
return}this.a.a3(0)
this.c=a
this.d=3},"$1","gcD",2,0,function(){return H.aW(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"d0")}],
cG:[function(a,b){var z
if(this.d===2){z=this.c
this.b6(0)
z.F(a,b)
return}this.a.a3(0)
this.c=new P.K(a,b)
this.d=4},function(a){return this.cG(a,null)},"e5","$2","$1","gcF",2,2,12,0],
e4:[function(){if(this.d===2){var z=this.c
this.b6(0)
z.W(!1)
return}this.a.a3(0)
this.c=null
this.d=5},"$0","gcE",0,0,1]},
h6:{
"^":"d:0;a,b,c",
$0:function(){return this.a.F(this.b,this.c)}},
h5:{
"^":"d:4;a,b",
$2:function(a,b){return P.h3(this.a,this.b,a,b)}},
bx:{
"^":"O;",
P:function(a,b,c,d){return this.cq(a,d,c,!0===b)},
bJ:function(a,b,c){return this.P(a,null,b,c)},
cq:function(a,b,c,d){return P.fv(this,a,b,c,d,H.y(this,"bx",0),H.y(this,"bx",1))},
bh:function(a,b){b.as(a)},
$asO:function(a,b){return[b]}},
cZ:{
"^":"fk;x,y,a,b,c,d,e,f,r",
as:function(a){if((this.e&2)!==0)return
this.ca(a)},
ap:function(a,b){if((this.e&2)!==0)return
this.cb(a,b)},
bm:[function(){var z=this.y
if(z==null)return
z.a3(0)},"$0","gbl",0,0,1],
bo:[function(){var z=this.y
if(z==null)return
z.bM()},"$0","gbn",0,0,1],
bk:function(){var z=this.y
if(z!=null){this.y=null
z.aI()}return},
e_:[function(a){this.x.bh(a,this)},"$1","gcu",2,0,function(){return H.aW(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"cZ")}],
e1:[function(a,b){this.ap(a,b)},"$2","gcw",4,0,13],
e0:[function(){this.cl()},"$0","gcv",0,0,1],
ci:function(a,b,c,d,e,f,g){var z,y
z=this.gcu()
y=this.gcw()
this.y=this.x.a.bJ(z,this.gcv(),y)},
static:{fv:function(a,b,c,d,e,f,g){var z=$.j
z=H.h(new P.cZ(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cg(b,c,d,e)
z.ci(a,b,c,d,e,f,g)
return z}}},
fR:{
"^":"bx;b,a",
bh:function(a,b){var z,y,x,w,v
z=null
try{z=this.cM(a)}catch(w){v=H.w(w)
y=v
x=H.u(w)
$.j.toString
b.ap(y,x)
return}b.as(z)},
cM:function(a){return this.b.$1(a)}},
K:{
"^":"a;a_:a>,E:b<",
i:function(a){return H.b(this.a)},
$isr:1},
h2:{
"^":"a;"},
ha:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.c(new P.h0(z,P.h1(z,this.b)))}},
fV:{
"^":"h2;",
gaM:function(){return this},
bO:function(a){var z,y,x,w
try{if(C.b===$.j){x=a.$0()
return x}x=P.d2(null,null,this,a)
return x}catch(w){x=H.w(w)
z=x
y=H.u(w)
return P.au(null,null,this,z,y)}},
aT:function(a,b){var z,y,x,w
try{if(C.b===$.j){x=a.$1(b)
return x}x=P.d4(null,null,this,a,b)
return x}catch(w){x=H.w(w)
z=x
y=H.u(w)
return P.au(null,null,this,z,y)}},
dM:function(a,b,c){var z,y,x,w
try{if(C.b===$.j){x=a.$2(b,c)
return x}x=P.d3(null,null,this,a,b,c)
return x}catch(w){x=H.w(w)
z=x
y=H.u(w)
return P.au(null,null,this,z,y)}},
aH:function(a,b){if(b)return new P.fW(this,a)
else return new P.fX(this,a)},
cS:function(a,b){if(b)return new P.fY(this,a)
else return new P.fZ(this,a)},
h:function(a,b){return},
bN:function(a){if($.j===C.b)return a.$0()
return P.d2(null,null,this,a)},
al:function(a,b){if($.j===C.b)return a.$1(b)
return P.d4(null,null,this,a,b)},
dL:function(a,b,c){if($.j===C.b)return a.$2(b,c)
return P.d3(null,null,this,a,b,c)}},
fW:{
"^":"d:0;a,b",
$0:function(){return this.a.bO(this.b)}},
fX:{
"^":"d:0;a,b",
$0:function(){return this.a.bN(this.b)}},
fY:{
"^":"d:2;a,b",
$1:function(a){return this.a.aT(this.b,a)}},
fZ:{
"^":"d:2;a,b",
$1:function(a){return this.a.al(this.b,a)}}}],["","",,P,{
"^":"",
ce:function(){return H.h(new H.am(0,null,null,null,null,null,0),[null,null])},
W:function(a){return H.dc(a,H.h(new H.am(0,null,null,null,null,null,0),[null,null]))},
en:function(a,b,c){var z,y
if(P.bD(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ad()
y.push(a)
try{P.h8(a,z)}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=P.cz(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aG:function(a,b,c){var z,y,x
if(P.bD(a))return b+"..."+c
z=new P.bq(b)
y=$.$get$ad()
y.push(a)
try{x=z
x.a=P.cz(x.gR(),a,", ")}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=z
y.a=y.gR()+c
y=z.gR()
return y.charCodeAt(0)==0?y:y},
bD:function(a){var z,y
for(z=0;y=$.$get$ad(),z<y.length;++z)if(a===y[z])return!0
return!1},
h8:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.q())return
w=H.b(z.gt())
b.push(w)
y+=w.length+2;++x}if(!z.q()){if(x<=5)return
if(0>=b.length)return H.f(b,0)
v=b.pop()
if(0>=b.length)return H.f(b,0)
u=b.pop()}else{t=z.gt();++x
if(!z.q()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gt();++x
for(;z.q();t=s,s=r){r=z.gt();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aI:function(a,b,c,d,e){return H.h(new H.am(0,null,null,null,null,null,0),[d,e])},
V:function(a,b){return P.fM(a,b)},
a5:function(a,b,c,d){return H.h(new P.fK(0,null,null,null,null,null,0),[d])},
cj:function(a){var z,y,x
z={}
if(P.bD(a))return"{...}"
y=new P.bq("")
try{$.$get$ad().push(a)
x=y
x.a=x.gR()+"{"
z.a=!0
J.dH(a,new P.eC(z,y))
z=y
z.a=z.gR()+"}"}finally{z=$.$get$ad()
if(0>=z.length)return H.f(z,0)
z.pop()}z=y.gR()
return z.charCodeAt(0)==0?z:z},
fL:{
"^":"am;a,b,c,d,e,f,r",
a1:function(a){return H.hE(a)&0x3ffffff},
a2:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbF()
if(x==null?b==null:x===b)return y}return-1},
static:{fM:function(a,b){return H.h(new P.fL(0,null,null,null,null,null,0),[a,b])}}},
fK:{
"^":"fI;a,b,c,d,e,f,r",
gA:function(a){var z=new P.cf(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
d3:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.cp(b)},
cp:function(a){var z=this.d
if(z==null)return!1
return this.ab(z[this.aa(a)],a)>=0},
bK:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.d3(0,a)?a:null
else return this.cC(a)},
cC:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aa(a)]
x=this.ab(y,a)
if(x<0)return
return J.dr(y,x).gbd()},
v:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.A(this))
z=z.b}},
T:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bA()
this.b=z}return this.b7(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bA()
this.c=y}return this.b7(y,b)}else return this.J(b)},
J:function(a){var z,y,x
z=this.d
if(z==null){z=P.bA()
this.d=z}y=this.aa(a)
x=z[y]
if(x==null)z[y]=[this.av(a)]
else{if(this.ab(x,a)>=0)return!1
x.push(this.av(a))}return!0},
a4:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.b8(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.b8(this.c,b)
else return this.cJ(b)},
cJ:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aa(a)]
x=this.ab(y,a)
if(x<0)return!1
this.b9(y.splice(x,1)[0])
return!0},
H:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
b7:function(a,b){if(a[b]!=null)return!1
a[b]=this.av(b)
return!0},
b8:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.b9(z)
delete a[b]
return!0},
av:function(a){var z,y
z=new P.ez(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
b9:function(a){var z,y
z=a.gco()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aa:function(a){return J.az(a)&0x3ffffff},
ab:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.R(a[y].gbd(),b))return y
return-1},
$iso:1,
static:{bA:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
ez:{
"^":"a;bd:a<,b,co:c<"},
cf:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
q:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.A(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
fI:{
"^":"eK;"},
ch:{
"^":"a;",
gA:function(a){return new H.cg(a,this.gj(a),0,null)},
N:function(a,b){return this.h(a,b)},
v:function(a,b){var z,y,x,w
z=this.gj(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.f(a,w)
b.$1(a[w])
if(x)throw H.c(new P.A(a))}},
U:function(a,b){return H.h(new H.bl(a,b),[null,null])},
i:function(a){return P.aG(a,"[","]")},
$isk:1,
$ask:null,
$iso:1},
eC:{
"^":"d:14;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
eA:{
"^":"B;a,b,c,d",
gA:function(a){return new P.fN(this,this.c,this.d,this.b,null)},
v:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.v(new P.A(this))}},
gC:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
H:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aG(this,"{","}")},
bL:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.bf());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
J:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bf();++this.d},
bf:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.h(z,[H.a2(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.b0(y,0,w,z,x)
C.c.b0(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cc:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.h(z,[b])},
$iso:1,
static:{bj:function(a,b){var z=H.h(new P.eA(null,0,0,0),[b])
z.cc(a,b)
return z}}},
fN:{
"^":"a;a,b,c,d,e",
gt:function(){return this.e},
q:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.v(new P.A(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
eL:{
"^":"a;",
U:function(a,b){return H.h(new H.c2(this,b),[H.a2(this,0),null])},
i:function(a){return P.aG(this,"{","}")},
v:function(a,b){var z
for(z=this.gA(this);z.q();)b.$1(z.d)},
$iso:1},
eK:{
"^":"eL;"}}],["","",,P,{
"^":"",
hc:function(a){return H.eW(a)},
bd:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aj(a)
if(typeof a==="string")return JSON.stringify(a)
return P.e8(a)},
e8:function(a){var z=J.m(a)
if(!!z.$isd)return z.i(a)
return H.aN(a)},
aF:function(a){return new P.fu(a)},
bk:function(a,b,c){var z,y
z=H.h([],[c])
for(y=J.b7(a);y.q();)z.push(y.gt())
if(b)return z
z.fixed$length=Array
return z},
ay:function(a){var z=H.b(a)
H.hF(z)},
iB:{
"^":"d:15;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.hc(a)}},
bF:{
"^":"a;"},
"+bool":0,
hV:{
"^":"a;"},
b3:{
"^":"ax;"},
"+double":0,
aE:{
"^":"a;a",
m:function(a,b){return new P.aE(C.d.m(this.a,b.gcr()))},
am:function(a,b){return C.d.am(this.a,b.gcr())},
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.aE))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.e7()
y=this.a
if(y<0)return"-"+new P.aE(-y).i(0)
x=z.$1(C.d.aS(C.d.Y(y,6e7),60))
w=z.$1(C.d.aS(C.d.Y(y,1e6),60))
v=new P.e6().$1(C.d.aS(y,1e6))
return""+C.d.Y(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
e6:{
"^":"d:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
e7:{
"^":"d:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
r:{
"^":"a;",
gE:function(){return H.u(this.$thrownJsError)}},
cq:{
"^":"r;",
i:function(a){return"Throw of null."}},
S:{
"^":"r;a,b,c,d",
gay:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gax:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gay()+y+x
if(!this.a)return w
v=this.gax()
u=P.bd(this.b)
return w+v+": "+H.b(u)},
static:{aB:function(a){return new P.S(!1,null,null,a)},dT:function(a,b,c){return new P.S(!0,a,b,c)}}},
cu:{
"^":"S;e,f,a,b,c,d",
gay:function(){return"RangeError"},
gax:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.dW()
if(typeof z!=="number")return H.Q(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{aO:function(a,b,c){return new P.cu(null,null,!0,a,b,"Value not in range")},ao:function(a,b,c,d,e){return new P.cu(b,c,!0,a,d,"Invalid value")},cv:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.ao(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.ao(b,a,c,"end",f))
return b}}},
ed:{
"^":"S;e,j:f>,a,b,c,d",
gay:function(){return"RangeError"},
gax:function(){P.bd(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dq(this.b,0)?": index must not be negative":z},
static:{c9:function(a,b,c,d,e){var z=e!=null?e:J.ah(b)
return new P.ed(b,z,!0,a,c,"Index out of range")}}},
J:{
"^":"r;a",
i:function(a){return"Unsupported operation: "+this.a}},
cT:{
"^":"r;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
a6:{
"^":"r;a",
i:function(a){return"Bad state: "+this.a}},
A:{
"^":"r;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bd(z))+"."}},
cy:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gE:function(){return},
$isr:1},
e4:{
"^":"r;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
fu:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
e9:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aM(b,"expando$values")
return z==null?null:H.aM(z,this.be())},
u:function(a,b,c){var z=H.aM(b,"expando$values")
if(z==null){z=new P.a()
H.bp(b,"expando$values",z)}H.bp(z,this.be(),c)},
be:function(){var z,y
z=H.aM(this,"expando$key")
if(z==null){y=$.c6
$.c6=y+1
z="expando$key$"+y
H.bp(this,"expando$key",z)}return z}},
ea:{
"^":"a;"},
n:{
"^":"ax;"},
"+int":0,
B:{
"^":"a;",
U:function(a,b){return H.aK(this,b,H.y(this,"B",0),null)},
v:function(a,b){var z
for(z=this.gA(this);z.q();)b.$1(z.gt())},
aX:function(a,b){return P.bk(this,b,H.y(this,"B",0))},
aW:function(a){return this.aX(a,!0)},
gj:function(a){var z,y
z=this.gA(this)
for(y=0;z.q();)++y
return y},
N:function(a,b){var z,y,x
if(b<0)H.v(P.ao(b,0,null,"index",null))
for(z=this.gA(this),y=0;z.q();){x=z.gt()
if(b===y)return x;++y}throw H.c(P.c9(b,this,"index",null,y))},
i:function(a){return P.en(this,"(",")")}},
ep:{
"^":"a;"},
k:{
"^":"a;",
$ask:null,
$iso:1},
"+List":0,
iC:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
ax:{
"^":"a;"},
"+num":0,
a:{
"^":";",
p:function(a,b){return this===b},
gw:function(a){return H.M(this)},
i:function(a){return H.aN(this)}},
N:{
"^":"a;"},
I:{
"^":"a;"},
"+String":0,
bq:{
"^":"a;R:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cz:function(a,b,c){var z=J.b7(b)
if(!z.q())return a
if(c.length===0){do a+=H.b(z.gt())
while(z.q())}else{a+=H.b(z.gt())
for(;z.q();)a=a+c+H.b(z.gt())}return a}}},
cA:{
"^":"a;"}}],["","",,W,{
"^":"",
dW:function(a,b){var z=document.createElement("canvas",null)
J.dP(z,b)
J.dN(z,a)
return z},
e3:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.u)},
bE:function(a){var z=$.j
if(z===C.b)return a
return z.cS(a,!0)},
p:{
"^":"c3;",
$isp:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
hN:{
"^":"p;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
hP:{
"^":"p;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
hQ:{
"^":"p;",
gaO:function(a){return H.h(new W.a8(a,"error",!1),[null])},
gaP:function(a){return H.h(new W.a8(a,"load",!1),[null])},
$ise:1,
"%":"HTMLBodyElement"},
bV:{
"^":"p;k:height%,l:width%",
aZ:function(a,b,c){return a.getContext(b,P.hk(c))},
bV:function(a,b,c,d,e,f,g){var z,y
z=P.W(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.aZ(a,"webgl",z)
return y==null?this.aZ(a,"experimental-webgl",z):y},
bU:function(a,b){return this.bV(a,!0,!0,!0,!0,!1,b)},
$isbV:1,
"%":"HTMLCanvasElement"},
hR:{
"^":"e;",
bI:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
hT:{
"^":"aL;j:length=",
$ise:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
hU:{
"^":"ee;j:length=",
b_:function(a,b){var z=this.ct(a,b)
return z!=null?z:""},
ct:function(a,b){if(W.e3(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.e5()+b)},
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
ee:{
"^":"e+e2;"},
e2:{
"^":"a;",
gk:function(a){return this.b_(a,"height")},
gl:function(a){return this.b_(a,"width")}},
hW:{
"^":"aL;",
$ise:1,
"%":"DocumentFragment|ShadowRoot"},
hX:{
"^":"e;",
i:function(a){return String(a)},
"%":"DOMException"},
c3:{
"^":"aL;",
i:function(a){return a.localName},
gaO:function(a){return H.h(new W.a8(a,"error",!1),[null])},
gaP:function(a){return H.h(new W.a8(a,"load",!1),[null])},
$ise:1,
"%":";Element"},
hY:{
"^":"p;k:height%,I:src},l:width%",
"%":"HTMLEmbedElement"},
hZ:{
"^":"c4;a_:error=",
"%":"ErrorEvent"},
c4:{
"^":"e;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CompositionEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ExtendableEvent|FetchEvent|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MSPointerEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PointerEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SVGZoomEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|WheelEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
c5:{
"^":"e;",
ck:function(a,b,c,d){return a.addEventListener(b,H.ae(c,1),d)},
cK:function(a,b,c,d){return a.removeEventListener(b,H.ae(c,1),d)},
"%":"MediaStream;EventTarget"},
ii:{
"^":"p;j:length=",
"%":"HTMLFormElement"},
ij:{
"^":"p;k:height%,I:src},l:width%",
"%":"HTMLIFrameElement"},
c8:{
"^":"p;k:height%,I:src},l:width%",
aJ:function(a,b){return a.complete.$1(b)},
$isc8:1,
"%":"HTMLImageElement"},
il:{
"^":"p;k:height%,I:src},l:width%",
$ise:1,
"%":"HTMLInputElement"},
eD:{
"^":"p;a_:error=,I:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
iA:{
"^":"e;",
$ise:1,
"%":"Navigator"},
aL:{
"^":"c5;",
i:function(a){var z=a.nodeValue
return z==null?this.c9(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
iD:{
"^":"p;k:height%,l:width%",
"%":"HTMLObjectElement"},
iH:{
"^":"p;I:src}",
"%":"HTMLScriptElement"},
iJ:{
"^":"p;j:length=",
"%":"HTMLSelectElement"},
iK:{
"^":"p;I:src}",
"%":"HTMLSourceElement"},
iL:{
"^":"c4;a_:error=",
"%":"SpeechRecognitionError"},
iQ:{
"^":"p;I:src}",
"%":"HTMLTrackElement"},
cU:{
"^":"eD;k:height%,l:width%",
$iscU:1,
"%":"HTMLVideoElement"},
iU:{
"^":"c5;",
$ise:1,
"%":"DOMWindow|Window"},
iY:{
"^":"aL;",
$ise:1,
"%":"DocumentType"},
j0:{
"^":"p;",
$ise:1,
"%":"HTMLFrameSetElement"},
ft:{
"^":"O;",
P:function(a,b,c,d){var z=new W.bw(0,this.a,this.b,W.bE(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.ae()
return z},
bJ:function(a,b,c){return this.P(a,null,b,c)}},
a8:{
"^":"ft;a,b,c"},
bw:{
"^":"eN;a,b,c,d,e",
aI:function(){if(this.b==null)return
this.by()
this.b=null
this.d=null
return},
aQ:function(a,b){if(this.b==null)return;++this.a
this.by()},
a3:function(a){return this.aQ(a,null)},
bM:function(){if(this.b==null||this.a<=0)return;--this.a
this.ae()},
ae:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.ds(x,this.c,z,this.e)}},
by:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dt(x,this.c,z,this.e)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
hL:{
"^":"U;",
$ise:1,
"%":"SVGAElement"},
hM:{
"^":"eX;",
$ise:1,
"%":"SVGAltGlyphElement"},
hO:{
"^":"l;",
$ise:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
i_:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEBlendElement"},
i0:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEColorMatrixElement"},
i1:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEComponentTransferElement"},
i2:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFECompositeElement"},
i3:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEConvolveMatrixElement"},
i4:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEDiffuseLightingElement"},
i5:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEDisplacementMapElement"},
i6:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEFloodElement"},
i7:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEGaussianBlurElement"},
i8:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEImageElement"},
i9:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEMergeElement"},
ia:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEMorphologyElement"},
ib:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFEOffsetElement"},
ic:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFESpecularLightingElement"},
id:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFETileElement"},
ie:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFETurbulenceElement"},
ig:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGFilterElement"},
ih:{
"^":"U;k:height=,l:width=",
"%":"SVGForeignObjectElement"},
ec:{
"^":"U;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
U:{
"^":"l;",
$ise:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
ik:{
"^":"U;k:height=,l:width=",
$ise:1,
"%":"SVGImageElement"},
ip:{
"^":"l;",
$ise:1,
"%":"SVGMarkerElement"},
iq:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGMaskElement"},
iE:{
"^":"l;k:height=,l:width=",
$ise:1,
"%":"SVGPatternElement"},
iF:{
"^":"ec;k:height=,l:width=",
"%":"SVGRectElement"},
iI:{
"^":"l;",
$ise:1,
"%":"SVGScriptElement"},
l:{
"^":"c3;",
gaO:function(a){return H.h(new W.a8(a,"error",!1),[null])},
gaP:function(a){return H.h(new W.a8(a,"load",!1),[null])},
$ise:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
iN:{
"^":"U;k:height=,l:width=",
$ise:1,
"%":"SVGSVGElement"},
iO:{
"^":"l;",
$ise:1,
"%":"SVGSymbolElement"},
cC:{
"^":"U;",
"%":";SVGTextContentElement"},
iP:{
"^":"cC;",
$ise:1,
"%":"SVGTextPathElement"},
eX:{
"^":"cC;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
iR:{
"^":"U;k:height=,l:width=",
$ise:1,
"%":"SVGUseElement"},
iS:{
"^":"l;",
$ise:1,
"%":"SVGViewElement"},
j_:{
"^":"l;",
$ise:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
j1:{
"^":"l;",
$ise:1,
"%":"SVGCursorElement"},
j2:{
"^":"l;",
$ise:1,
"%":"SVGFEDropShadowElement"},
j3:{
"^":"l;",
$ise:1,
"%":"SVGGlyphRefElement"},
j4:{
"^":"l;",
$ise:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iG:{
"^":"e;",
cQ:function(a,b,c){return a.bindBuffer(b,c)},
cR:function(a,b,c){return a.bindTexture(b,c)},
cT:function(a,b,c){return a.blendFunc(b,c)},
cU:function(a,b,c,d){return a.bufferData(b,c,d)},
cX:function(a,b){return a.clear(b)},
cY:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
cZ:function(a,b){return a.clearDepth(b)},
d_:function(a,b){return a.clearStencil(b)},
d1:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
d6:function(a){return a.createBuffer()},
d7:function(a){return a.createProgram()},
d8:function(a,b){return a.createShader(b)},
d9:function(a){return a.createTexture()},
da:function(a,b){return a.depthFunc(b)},
dc:function(a,b){return a.depthMask(b)},
dj:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
dm:function(a,b){return a.enable(b)},
dn:function(a,b){return a.enableVertexAttribArray(b)},
bT:function(a,b,c){return a.getAttribLocation(b,c)},
bW:function(a,b,c){return a.getUniformLocation(b,c)},
bI:function(a,b){return a.lineWidth(b)},
c5:function(a,b,c,d){return a.stencilFunc(b,c,d)},
c6:function(a,b,c,d){return a.stencilOp(b,c,d)},
dO:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.hm(g))
return}z=J.m(g)
if(!!z.$isc8)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isbV)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscU)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.c(P.aB("Incorrect number or type of arguments"))},
dN:function(a,b,c,d,e,f,g){return this.dO(a,b,c,d,e,f,g,null,null,null)},
dP:function(a,b,c,d){return a.texParameteri(b,c,d)},
dR:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
dS:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
dU:function(a,b){return a.useProgram(b)},
dV:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
hS:{
"^":"a;"}}],["","",,H,{
"^":"",
C:function(a){return a},
aa:function(a){return a},
ck:{
"^":"e;",
$isck:1,
"%":"ArrayBuffer"},
bo:{
"^":"e;",
$isbo:1,
"%":"DataView;ArrayBufferView;bm|cl|cn|bn|cm|co|L"},
bm:{
"^":"bo;",
gj:function(a){return a.length},
$isbh:1,
$isbg:1},
bn:{
"^":"cn;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
return a[b]},
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
a[b]=c}},
cl:{
"^":"bm+ch;",
$isk:1,
$ask:function(){return[P.b3]},
$iso:1},
cn:{
"^":"cl+c7;"},
L:{
"^":"co;",
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
a[b]=c},
$isk:1,
$ask:function(){return[P.n]},
$iso:1},
cm:{
"^":"bm+ch;",
$isk:1,
$ask:function(){return[P.n]},
$iso:1},
co:{
"^":"cm+c7;"},
ir:{
"^":"bn;",
$isk:1,
$ask:function(){return[P.b3]},
$iso:1,
"%":"Float32Array"},
is:{
"^":"bn;",
$isk:1,
$ask:function(){return[P.b3]},
$iso:1,
"%":"Float64Array"},
it:{
"^":"L;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$iso:1,
"%":"Int16Array"},
iu:{
"^":"L;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$iso:1,
"%":"Int32Array"},
iv:{
"^":"L;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$iso:1,
"%":"Int8Array"},
iw:{
"^":"L;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$iso:1,
"%":"Uint16Array"},
ix:{
"^":"L;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$iso:1,
"%":"Uint32Array"},
iy:{
"^":"L;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$iso:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
iz:{
"^":"L;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.v(H.q(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$iso:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
hF:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
hk:function(a){var z={}
a.v(0,new P.hl(z))
return z},
hm:function(a){return a},
c0:function(){var z=$.c_
if(z==null){z=J.b4(window.navigator.userAgent,"Opera",0)
$.c_=z}return z},
e5:function(){var z,y
z=$.bX
if(z!=null)return z
y=$.bY
if(y==null){y=J.b4(window.navigator.userAgent,"Firefox",0)
$.bY=y}if(y===!0)z="-moz-"
else{y=$.bZ
if(y==null){y=P.c0()!==!0&&J.b4(window.navigator.userAgent,"Trident/",0)
$.bZ=y}if(y===!0)z="-ms-"
else z=P.c0()===!0?"-o-":"-webkit-"}$.bX=z
return z},
hl:{
"^":"d:16;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
j8:[function(){P.ay("--------1-dart hello ( 1 )")
F.b2()
P.ay("--------1-dart hello ( 2 ) ")},"$0","di",0,0,1],
b2:function(){var z=0,y=new P.aD(),x=1,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
function $async$b2(b4,b5){if(b4===1){w=b5
z=x}while(true)switch(z){case 0:a7=G
a7=a7
a8=P
a7=new a7.f5(700,500,a8.ce())
z=2
return H.t(a7.ai("./assets/test.jpg"),$async$b2,y)
case 2:v=b5
a7=G
u=new a7.f9(null,null,null,null)
a7=u
a7.c=600
a7=u
a7.d=400
a7=C
a7=a7.d
t=a7.aV(600)
a7=W
a7=a7
a8=C
a8=a8.d
t=a7.dW(a8.aV(400),t)
a7=u
a7.b=t
a7=document
a7=a7.body
a7.appendChild(t)
a7=J
t=a7.dK(t,!0)
a7=u
a7.a=t
a7=E
a7=a7
a8=Float64Array
a9=H
s=new a7.an(new a8(a9.C(16)))
a7=s
a7.ao()
s=[s]
a7=G
r=new a7.f8(null,null,null,null,s,[])
a7=r
a7.c=t
a7=r
a7.d=u
a7=r
a7.dA()
a7=r
a7.H(0)
a7=F
q=a7.ap(null)
a7=r
a7.H(0)
a7=J
a7=a7
a8=r
a7.bN(a8.c,!1,!1,!1,!1)
a7=J
a7=a7
a8=r
a7.bO(a8.c,!1)
a7=J
a7=a7
a8=r
a7.bS(a8.c,7680,7681,7681)
a7=J
a7=a7
a8=r
a7.bR(a8.c,519,1,255)
a7=F
p=a7.ap(null)
a7=p
a8=F
a7.a=a8.a7(255,255,255,255)
a7=r
a7=a7
a8=F
a7.af(null,new a8.aq(50,100,150,280),p)
a7=J
a7=a7
a8=r
a7.bN(a8.c,!0,!0,!0,!0)
a7=J
a7=a7
a8=r
a7.bO(a8.c,!0)
a7=J
a7=a7
a8=r
a7.bS(a8.c,7680,7680,7680)
a7=J
a7=a7
a8=r
a7.bR(a8.c,514,1,255)
a7=r
a7=a7
a8=F
a7.af(null,new a8.aq(50,50,100,100),q)
a7=F
q=a7.ap(null)
a7=q
a8=F
a7.a=a8.a7(255,255,255,0)
a7=Float64Array
a8=H
t=new a7(a8.C(16))
a7=E
o=new a7.an(t)
a7=o
a7.ao()
a7=Math
a8=H
n=a7.cos(a8.aV(0.39269908169872414))
a7=Math
a8=H
m=a7.sin(a8.aV(0.39269908169872414))
l=t[0]
k=t[4]
j=t[1]
i=t[5]
h=t[2]
g=t[6]
f=t[3]
e=t[7]
d=-m
t[0]=l*n+k*m
t[1]=j*n+i*m
t[2]=h*n+g*m
t[3]=f*n+e*m
t[4]=l*d+k*n
t[5]=j*d+i*n
t[6]=h*d+g*n
t[7]=f*d+e*n
a7=s
a7=a7
a8=C
a8=a8.c
a8=a8.gbH(s)
a7.push(a8.a9(0,o))
a7=r
a7.dT()
a7=r
a7=a7
a8=F
a7.af(null,new a8.aq(50,50,100,100),q)
a7=q
a8=F
a7.a=a8.a7(255,0,255,255)
a7=q
a8=C
a7.b=a8.k
a7=q
a7.c=2.5
a7=r
a7=a7
a8=F
a7.af(null,new a8.aq(150,150,100,100),q)
a7=q
a8=C
a7.b=a8.f
a7=r
a7=a7
a8=F
a7.dk(null,new a8.aq(150,150,100,100),q)
a7=F
q=a7.ap(null)
a7=q
a8=F
a7.a=a8.a7(255,255,255,0)
a7=J
a7=a7
a8=v
a7.a3(a8.ga7())
a7=J
a7=a7
a8=v
a7.a3(a8.gag())
a7=J
a7=a7
a8=v
o=a7.a3(a8.ga7())
a7=J
a7=a7
a8=v
s=a7.a3(a8.gag())
a7=J
a7=a7
a8=r
a8=a8.c
a9=r
a7.b9(a8,a9.f)
a7=J
a7=a7
a8=r
a8=a8.c
a9=r
c=a7.b8(a8,a9.f,"a_tex")
a7=J
a7=a7
a8=r
b=a7.b5(a8.c)
a7=J
a7=a7
a8=r
a7.ag(a8.c,34962,b)
a7=J
a7=a7
a8=r
a8=a8.c
a9=Float32Array
b0=H
a7.dw(a8,34962,new a9(b0.aa([0,0,0,1,1,0,1,1])),35044)
a7=J
a7=a7
a8=r
a7.b6(a8.c,c)
a7=J
a7=a7
a8=r
a7.ba(a8.c,c,2,5126,!1,0,0)
a7=J
a7=a7
a8=r
a=a7.dE(a8.c)
a7=J
a7=a7
a8=r
a7.du(a8.c,3553,a)
a7=J
a7=a7
a8=r
a7.aA(a8.c,3553,10242,33071)
a7=J
a7=a7
a8=r
a7.aA(a8.c,3553,10243,33071)
a7=J
a7=a7
a8=r
a7.aA(a8.c,3553,10241,9728)
a7=J
a7=a7
a8=r
a7.aA(a8.c,3553,10240,9728)
a7=J
a7=a7
a8=r
a8=a8.c
a9=v
a7.dQ(a8,3553,0,6408,6408,5121,a9.gdl())
a0=250+o/2
a1=250+s/2
a7=G
a7=a7
a8=r
a2=a7.cF(a8.c,[250,250,0,250,a1,0,a0,250,0,a0,a1,0])
a7=J
a7=a7
a8=r
a7.ag(a8.c,34962,a2)
a7=G
a7=a7
a8=r
a3=a7.cG(a8.c,[0,1,2,1,3,2])
a7=J
a7=a7
a8=r
a7.ag(a8.c,34963,a3)
a7=J
a7=a7
a8=r
a8=a8.c
a9=r
a4=a7.b8(a8,a9.f,"vp")
a7=J
a7=a7
a8=r
a8=a8.c
a9=r
a5=a7.ai(a8,a9.f,"u_mat")
a7=J
a7=a7
a8=r
a8=a8.c
a9=a5
b0=!1
b1=Float32Array
b2=H
b2=b2
b3=r
b3=b3.bA()
a7.dS(a8,a9,b0,new b1(b2.aa(b3.gn())))
a7=J
a7=a7
a8=r
a7.ba(a8.c,a4,3,5126,!1,0,0)
a7=J
a7=a7
a8=r
a8=a8.c
a9=r
a6=a7.ai(a8,a9.f,"color")
a7=r
s=a7.c
a7=q
a7=a7.a
o=a7.a
a7=J
a7.dR(s,a6,(o>>>16&255)/255,(o>>>8&255)/255,(o>>>0&255)/255,(o>>>24&255)/255)
a7=J
a7=a7
a8=r
a7.b6(a8.c,a4)
a7=J
a7=a7
a8=r
a7.bP(a8.c,4,6,5123,0)
a7=F
q=a7.ap(null)
a7=q
a8=F
a7.a=a8.a7(255,255,255,0)
a7=J
a7=a7
a8=v
a7.a3(a8.ga7())
a7=J
a7=a7
a8=v
a7.a3(a8.gag())
a7=r
a7=a7
a8=[200,200,0,500,200,0]
a9=[0,1]
b0=q
b0=b0.a
b1=C
b1=b1.k
b2=q
a7.aL(null,a8,a9,b0,b1,b2.c)
return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$b2,y,null)}},1],["","",,F,{
"^":"",
f2:{
"^":"a;"},
f4:{
"^":"a;",
ai:function(a){var z=0,y=new P.aD(),x,w=2,v,u=this,t,s,r,q
function $async$ai(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.aK(a)?3:4
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
return H.t(q.aj(a),$async$ai,y)
case 5:s.u(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$ai,y,null)}},
aq:{
"^":"a;a,b,a7:c<,ag:d<"},
cD:{
"^":"a;a",
i:function(a){return C.v.h(0,this.a)}},
f7:{
"^":"a;a,b,c",
cf:function(a){if(this.a==null)this.a=F.a7(255,255,255,255)},
static:{ap:function(a){var z=new F.f7(a,C.f,1)
z.cf(a)
return z}}},
f3:{
"^":"a;a",
ce:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{a7:function(a,b,c,d){var z=new F.f3(0)
z.ce(a,b,c,d)
return z}}},
f6:{
"^":"a;"}}],["","",,G,{
"^":"",
bs:function(a){var z=0,y=new P.aD(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bs(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.h(new p.cW(o.h(new n.x(0,m.j,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.dO(t,a)
q=J
s=q.i(t)
q=s
r=q.gaP(t)
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
m=m.bE(new l.fb(u,t))
l=r
p=new p.bw(0,o,n,m,l.c)
o=H
q=q.h(p,[o.a2(r,0)])
q.ae()
q=s
s=q.gaO(t)
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
m=m.bE(new l.fc(a,u))
l=s
p=new p.bw(0,o,n,m,l.c)
o=H
q=q.h(p,[o.a2(s,0)])
q.ae()
q=u
x=q.a
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$bs,y,null)},
cE:function(a,b,c){var z,y,x
z=G.cH(a,35633,b)
y=G.cH(a,35632,c)
x=J.dC(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
cH:function(a,b,c){var z,y
z=J.dD(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.c(y+"\n")}return z},
cF:function(a,b){var z=J.b5(a)
a.bindBuffer(34962,z)
a.bufferData(34962,new Float32Array(H.aa(b)),35044)
a.bindBuffer(34962,null)
return z},
cG:function(a,b){var z=J.b5(a)
a.bindBuffer(34963,z)
a.bufferData(34963,new Uint16Array(H.aa(b)),35044)
a.bindBuffer(34963,null)
return z},
f5:{
"^":"f4;l:b>,k:c>,a",
aj:function(a){var z=0,y=new P.aD(),x,w=2,v,u,t
function $async$aj(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.t(t.bs(a),$async$aj,y)
case 3:x=new u.fa(c)
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$aj,y,null)}},
fa:{
"^":"f6;dl:a<",
ga7:function(){return J.dJ(this.a)},
gag:function(){return J.dI(this.a)}},
f9:{
"^":"a;a,b,c,k:d>"},
f8:{
"^":"f2;c,d,e,f,a,b",
dA:function(){var z,y
z=C.c.ah(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.c.ah(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cE(this.c,z,y)
z=C.c.ah(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.c.ah(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cE(this.c,z,y)},
H:function(a){J.bQ(this.c,2960)
J.dF(this.c,515)
J.dy(this.c,0,0,0,1)
J.dz(this.c,1)
J.dA(this.c,0)
J.bQ(this.c,3042)
J.dv(this.c,770,771)
J.dx(this.c,17664)},
bA:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=new Float64Array(H.C(16))
y=new E.an(z)
y.ao()
x=z[0]
w=z[4]
v=z[8]
u=z[12]
t=z[1]
s=z[5]
r=z[9]
q=z[13]
p=z[2]
o=z[6]
n=z[10]
m=z[14]
l=z[3]
k=z[7]
j=z[11]
i=z[15]
z[12]=x*-1+w+v*0+u
z[13]=t*-1+s+r*0+q
z[14]=p*-1+o+n*0+m
z[15]=l*-1+k+j*0+i
i=this.d
h=2/i.c
i=-2/i.d
z[0]=z[0]*h
z[1]=z[1]*h
z[2]=z[2]*h
z[3]=z[3]*h
z[4]=z[4]*i
z[5]=z[5]*i
z[6]=z[6]*i
z[7]=z[7]*i
z[8]=z[8]
z[9]=z[9]
z[10]=z[10]
z[11]=z[11]
z[12]=z[12]
z[13]=z[13]
z[14]=z[14]
z[15]=z[15]
return y.a9(0,C.c.gbH(this.a))},
af:function(a,b,c){var z,y,x,w
z=b.a
y=b.b
x=z+b.c
w=y+b.d
this.aL(a,[z,y,0,z,w,0,x,y,0,x,w,0],[0,1,3,2],c.a,c.b,c.c)},
dk:function(a,b,c){var z,y,x,w,v,u,t,s
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
v.push(0)}this.aL(a,v,u,c.a,c.b,c.c)},
aL:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
J.b9(this.c,this.e)
z=G.cF(this.c,b)
J.ag(this.c,34962,z)
y=G.cG(this.c,c)
J.ag(this.c,34963,y)
x=this.c
w=this.e
v=this.bA()
x.uniformMatrix4fv(J.ai(x,w,"u_mat"),!1,new Float32Array(H.aa(v.gn())))
v=this.c
w=this.e
x=d.a
v.uniform4fv(J.ai(v,w,"color"),new Float32Array(H.aa([(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255])))
x=this.c
x.uniform1f(J.ai(x,this.e,"u_point_size"),f)
u=J.b8(this.c,this.e,"vp")
J.ba(this.c,u,3,5126,!1,0,0)
J.b6(this.c,u)
if(e===C.f)t=6
else{J.dL(this.c,f)
t=2}J.bP(this.c,t,b.length/3|0,5123,0)
J.b9(this.c,null)},
dT:function(){}},
fb:{
"^":"d:2;a,b",
$1:function(a){this.a.aJ(0,this.b)}},
fc:{
"^":"d:2;a,b",
$1:function(a){this.b.d2("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
an:{
"^":"a;n:a<",
i:function(a){return"[0] "+this.a8(0).i(0)+"\n[1] "+this.a8(1).i(0)+"\n[2] "+this.a8(2).i(0)+"\n[3] "+this.a8(3).i(0)+"\n"},
gdi:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.f(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=16)return H.f(z,b)
z[b]=c},
a8:function(a){var z,y,x
z=new Float64Array(H.C(4))
y=this.a
if(a>=16)return H.f(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.f(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.f(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.f(y,x)
z[3]=y[x]
return new E.ar(z)},
a9:function(a,b){var z,y,x
if(!!b.$isar){z=new Float64Array(H.C(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ar(z)}if(!!b.$isaR){z=new Float64Array(H.C(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.aR(z)}if(4===b.gdi()){z=new Float64Array(H.C(16))
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
return new E.an(z)}throw H.c(P.aB(b))},
m:function(a,b){var z,y
z=new Float64Array(H.C(16))
y=this.a
z[0]=C.a.m(y[0],b.gn().h(0,0))
z[1]=C.a.m(y[1],b.gn().h(0,1))
z[2]=C.a.m(y[2],b.gn().h(0,2))
z[3]=C.a.m(y[3],b.gn().h(0,3))
z[4]=C.a.m(y[4],b.gn().h(0,4))
z[5]=C.a.m(y[5],b.gn().h(0,5))
z[6]=C.a.m(y[6],b.gn().h(0,6))
z[7]=C.a.m(y[7],b.gn().h(0,7))
z[8]=C.a.m(y[8],b.gn().h(0,8))
z[9]=C.a.m(y[9],b.gn().h(0,9))
z[10]=C.a.m(y[10],b.gn().h(0,10))
z[11]=C.a.m(y[11],b.gn().h(0,11))
z[12]=C.a.m(y[12],b.gn().h(0,12))
z[13]=C.a.m(y[13],b.gn().h(0,13))
z[14]=C.a.m(y[14],b.gn().h(0,14))
z[15]=C.a.m(y[15],b.gn().h(0,15))
return new E.an(z)},
ao:function(){var z=this.a
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
return this}},
aR:{
"^":"a;n:a<",
b1:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
i:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
m:function(a,b){var z,y,x,w
z=this.a
y=C.a.m(z[0],b.gn().h(0,0))
x=C.a.m(z[1],b.gn().h(0,1))
z=C.a.m(z[2],b.gn().h(0,2))
w=new E.aR(new Float64Array(H.C(3)))
w.b1(y,x,z)
return w},
a9:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.Q(b)
x=z[1]
z=z[2]
w=new E.aR(new Float64Array(H.C(3)))
w.b1(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.f(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=3)return H.f(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.aV(y*y+x*x+z*z))}},
ar:{
"^":"a;n:a<",
b2:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
i:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
m:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.m(z[0],b.gn().h(0,0))
x=C.a.m(z[1],b.gn().h(0,1))
w=C.a.m(z[2],b.gn().h(0,2))
z=C.a.m(z[3],b.gn().h(0,3))
v=new E.ar(new Float64Array(H.C(4)))
v.b2(y,x,w,z)
return v},
a9:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.Q(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ar(new Float64Array(H.C(4)))
v.b2(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.f(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>=4)return H.f(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.aV(y*y+x*x+w*w+z*z))},
ga7:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cc.prototype
return J.er.prototype}if(typeof a=="string")return J.aH.prototype
if(a==null)return J.es.prototype
if(typeof a=="boolean")return J.eq.prototype
if(a.constructor==Array)return J.ak.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.aY(a)}
J.D=function(a){if(typeof a=="string")return J.aH.prototype
if(a==null)return a
if(a.constructor==Array)return J.ak.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.aY(a)}
J.aw=function(a){if(a==null)return a
if(a.constructor==Array)return J.ak.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.aY(a)}
J.de=function(a){if(typeof a=="number")return J.al.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bt.prototype
return a}
J.hn=function(a){if(typeof a=="number")return J.al.prototype
if(typeof a=="string")return J.aH.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bt.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.aY(a)}
J.af=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.hn(a).m(a,b)}
J.R=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).p(a,b)}
J.dq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.de(a).am(a,b)}
J.dr=function(a,b){if(a.constructor==Array||typeof a=="string"||H.hB(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.D(a).h(a,b)}
J.ds=function(a,b,c,d){return J.i(a).ck(a,b,c,d)}
J.dt=function(a,b,c,d){return J.i(a).cK(a,b,c,d)}
J.ag=function(a,b,c){return J.i(a).cQ(a,b,c)}
J.du=function(a,b,c){return J.i(a).cR(a,b,c)}
J.dv=function(a,b,c){return J.i(a).cT(a,b,c)}
J.dw=function(a,b,c,d){return J.i(a).cU(a,b,c,d)}
J.dx=function(a,b){return J.aw(a).cX(a,b)}
J.dy=function(a,b,c,d,e){return J.i(a).cY(a,b,c,d,e)}
J.dz=function(a,b){return J.i(a).cZ(a,b)}
J.dA=function(a,b){return J.i(a).d_(a,b)}
J.bN=function(a,b,c,d,e){return J.i(a).d1(a,b,c,d,e)}
J.dB=function(a,b){return J.i(a).aJ(a,b)}
J.b4=function(a,b,c){return J.D(a).d4(a,b,c)}
J.b5=function(a){return J.i(a).d6(a)}
J.dC=function(a){return J.i(a).d7(a)}
J.dD=function(a,b){return J.i(a).d8(a,b)}
J.dE=function(a){return J.i(a).d9(a)}
J.dF=function(a,b){return J.i(a).da(a,b)}
J.bO=function(a,b){return J.i(a).dc(a,b)}
J.bP=function(a,b,c,d,e){return J.i(a).dj(a,b,c,d,e)}
J.dG=function(a,b){return J.aw(a).N(a,b)}
J.bQ=function(a,b){return J.i(a).dm(a,b)}
J.b6=function(a,b){return J.i(a).dn(a,b)}
J.dH=function(a,b){return J.aw(a).v(a,b)}
J.G=function(a){return J.i(a).ga_(a)}
J.az=function(a){return J.m(a).gw(a)}
J.dI=function(a){return J.i(a).gk(a)}
J.b7=function(a){return J.aw(a).gA(a)}
J.ah=function(a){return J.D(a).gj(a)}
J.dJ=function(a){return J.i(a).gl(a)}
J.b8=function(a,b,c){return J.i(a).bT(a,b,c)}
J.dK=function(a,b){return J.i(a).bU(a,b)}
J.ai=function(a,b,c){return J.i(a).bW(a,b,c)}
J.dL=function(a,b){return J.i(a).bI(a,b)}
J.dM=function(a,b){return J.aw(a).U(a,b)}
J.dN=function(a,b){return J.i(a).sk(a,b)}
J.dO=function(a,b){return J.i(a).sI(a,b)}
J.dP=function(a,b){return J.i(a).sl(a,b)}
J.bR=function(a,b,c,d){return J.i(a).c5(a,b,c,d)}
J.bS=function(a,b,c,d){return J.i(a).c6(a,b,c,d)}
J.dQ=function(a,b,c,d,e,f,g){return J.i(a).dN(a,b,c,d,e,f,g)}
J.aA=function(a,b,c,d){return J.i(a).dP(a,b,c,d)}
J.a3=function(a){return J.de(a).dQ(a)}
J.aj=function(a){return J.m(a).i(a)}
J.dR=function(a,b,c,d,e,f){return J.i(a).dR(a,b,c,d,e,f)}
J.dS=function(a,b,c,d){return J.i(a).dS(a,b,c,d)}
J.b9=function(a,b){return J.i(a).dU(a,b)}
J.ba=function(a,b,c,d,e,f,g){return J.i(a).dV(a,b,c,d,e,f,g)}
var $=I.p
C.c=J.ak.prototype
C.d=J.cc.prototype
C.a=J.al.prototype
C.e=J.aH.prototype
C.w=J.eE.prototype
C.x=J.bt.prototype
C.l=new H.c1()
C.m=new P.fp()
C.b=new P.fV()
C.h=new P.aE(0)
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
C.v=new H.eb([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.f=new F.cD(0)
C.k=new F.cD(1)
$.cr="$cachedFunction"
$.cs="$cachedInvocation"
$.E=0
$.a4=null
$.bT=null
$.bI=null
$.d7=null
$.dk=null
$.aX=null
$.aZ=null
$.bJ=null
$.Y=null
$.ab=null
$.ac=null
$.bC=!1
$.j=C.b
$.c6=0
$.c_=null
$.bZ=null
$.bY=null
$.bX=null
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
I.$lazy(y,x,w)}})(["ca","$get$ca",function(){return H.el()},"cb","$get$cb",function(){return new P.e9(null)},"cI","$get$cI",function(){return H.F(H.aQ({toString:function(){return"$receiver$"}}))},"cJ","$get$cJ",function(){return H.F(H.aQ({$method$:null,toString:function(){return"$receiver$"}}))},"cK","$get$cK",function(){return H.F(H.aQ(null))},"cL","$get$cL",function(){return H.F(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cP","$get$cP",function(){return H.F(H.aQ(void 0))},"cQ","$get$cQ",function(){return H.F(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cN","$get$cN",function(){return H.F(H.cO(null))},"cM","$get$cM",function(){return H.F(function(){try{null.$method$}catch(z){return z.message}}())},"cS","$get$cS",function(){return H.F(H.cO(void 0))},"cR","$get$cR",function(){return H.F(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bv","$get$bv",function(){return P.ff()},"ad","$get$ad",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.N]},{func:1,args:[,],opt:[,]},{func:1,ret:P.I,args:[P.n]},{func:1,args:[,P.I]},{func:1,args:[P.I]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.N]},{func:1,ret:P.bF},{func:1,void:true,args:[P.a],opt:[P.N]},{func:1,void:true,args:[,P.N]},{func:1,args:[,,]},{func:1,args:[P.cA,,]},{func:1,args:[P.I,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.hJ(d||a)
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
Isolate.dd=a.dd
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dm(F.di(),b)},[])
else (function(b){H.dm(F.di(),b)})([])})})()