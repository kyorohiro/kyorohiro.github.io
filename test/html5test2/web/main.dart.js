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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isd)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bH"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bH"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bH(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b1=function(){}
var dart=[["","",,H,{
"^":"",
iD:{
"^":"a;a"}}],["","",,J,{
"^":"",
k:function(a){return void 0},
b5:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b2:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bK==null){H.hI()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.cO("Return interceptor for "+H.b(y(a,z))))}w=H.hR(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.u
else return C.v}return w},
d:{
"^":"a;",
l:function(a,b){return a===b},
gp:function(a){return H.U(a)},
i:["cF",function(a){return H.aQ(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLUniformLocation"},
eq:{
"^":"d;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$isbG:1},
es:{
"^":"d;",
l:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
c9:{
"^":"d;",
gp:function(a){return 0},
$iset:1},
eF:{
"^":"c9;"},
bw:{
"^":"c9;",
i:function(a){return String(a)}},
aw:{
"^":"d;",
bP:function(a,b){if(!!a.immutable$list)throw H.e(new P.H(b))},
dr:function(a,b){if(!!a.fixed$length)throw H.e(new P.H(b))},
w:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.B(a))}},
a2:function(a,b){return H.h(new H.bm(a,b),[null,null])},
at:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.f(y,x)
y[x]=w}return y.join(b)},
U:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
gdS:function(a){if(a.length>0)return a[0]
throw H.e(H.bg())},
ga1:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bg())},
bh:function(a,b,c,d,e){var z,y,x
this.bP(a,"set range")
P.cr(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.e(H.eo())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aJ(a,"[","]")},
gA:function(a){return new J.dU(a,a.length,0,null)},
gp:function(a){return H.U(a)},
gj:function(a){return a.length},
sj:function(a,b){this.dr(a,"set length")
if(b<0)throw H.e(P.aR(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.q(a,b))
if(b>=a.length||b<0)throw H.e(H.q(a,b))
return a[b]},
v:function(a,b,c){this.bP(a,"indexed set")
if(b>=a.length||!1)throw H.e(H.q(a,b))
a[b]=c},
$isbh:1,
$isl:1,
$asl:null,
$iso:1},
iC:{
"^":"aw;"},
dU:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ax:{
"^":"d;",
b6:function(a,b){return a%b},
a5:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.H(""+a))},
av:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.H(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.e(H.ac(b))
return a+b},
ab:function(a,b){return(a|0)===a?a/b|0:this.a5(a/b)},
bK:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ay:function(a,b){if(typeof b!=="number")throw H.e(H.ac(b))
return a<b},
$isaF:1},
c8:{
"^":"ax;",
$isaF:1,
$isn:1},
er:{
"^":"ax;",
$isaF:1},
aK:{
"^":"d;",
dw:function(a,b){if(b>=a.length)throw H.e(H.q(a,b))
return a.charCodeAt(b)},
k:function(a,b){if(typeof b!=="string")throw H.e(P.dT(b,null,null))
return a+b},
cE:function(a,b,c){H.d6(b)
if(c==null)c=a.length
H.d6(c)
if(b<0)throw H.e(P.aS(b,null,null))
if(typeof c!=="number")return H.L(c)
if(b>c)throw H.e(P.aS(b,null,null))
if(c>a.length)throw H.e(P.aS(c,null,null))
return a.substring(b,c)},
cD:function(a,b){return this.cE(a,b,null)},
gG:function(a){return a.length===0},
i:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.q(a,b))
if(b>=a.length||b<0)throw H.e(H.q(a,b))
return a[b]},
$isbh:1,
$isR:1}}],["","",,H,{
"^":"",
aB:function(a,b){var z=a.ae(b)
if(!init.globalState.d.cy)init.globalState.f.aj()
return z},
b4:function(){--init.globalState.f.b},
dh:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.k(y).$isl)throw H.e(P.ba("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.h2(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$c6()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.fF(P.bk(null,H.aA),0)
y.z=P.aL(null,null,null,P.n,H.bB)
y.ch=P.aL(null,null,null,P.n,null)
if(y.x===!0){x=new H.h1()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eh,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.h3)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aL(null,null,null,P.n,H.aT)
w=P.af(null,null,null,P.n)
v=new H.aT(0,null,!1)
u=new H.bB(y,x,w,init.createNewIsolate(),v,new H.a5(H.b6()),new H.a5(H.b6()),!1,!1,[],P.af(null,null,null,null),null,null,!1,!0,P.af(null,null,null,null))
w.a0(0,0)
u.bk(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aD()
x=H.ad(y,[y]).S(a)
if(x)u.ae(new H.hV(z,a))
else{y=H.ad(y,[y,y]).S(a)
if(y)u.ae(new H.hW(z,a))
else u.ae(a)}init.globalState.f.aj()},
el:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.em()
return},
em:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.H("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.H("Cannot extract URI from \""+H.b(z)+"\""))},
eh:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.aV(!0,[]).T(b.data)
y=J.K(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.aV(!0,[]).T(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.aV(!0,[]).T(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aL(null,null,null,P.n,H.aT)
p=P.af(null,null,null,P.n)
o=new H.aT(0,null,!1)
n=new H.bB(y,q,p,init.createNewIsolate(),o,new H.a5(H.b6()),new H.a5(H.b6()),!1,!1,[],P.af(null,null,null,null),null,null,!1,!0,P.af(null,null,null,null))
p.a0(0,0)
n.bk(0,o)
init.globalState.f.a.M(new H.aA(n,new H.ei(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aj()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").R(y.h(z,"msg"))
init.globalState.f.aj()
break
case"close":init.globalState.ch.ai(0,$.$get$c7().h(0,a))
a.terminate()
init.globalState.f.aj()
break
case"log":H.eg(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a7(["command","print","msg",z])
q=new H.a8(!0,P.a6(null,P.n)).E(q)
y.toString
self.postMessage(q)}else P.ao(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
eg:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a7(["command","log","msg",a])
x=new H.a8(!0,P.a6(null,P.n)).E(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.v(w)
z=H.r(w)
throw H.e(P.aI(z))}},
ej:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cn=$.cn+("_"+y)
$.co=$.co+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.R(["spawned",new H.aX(y,x),w,z.r])
x=new H.ek(a,b,c,d,z)
if(e===!0){z.bN(w,w)
init.globalState.f.a.M(new H.aA(z,x,"start isolate"))}else x.$0()},
hm:function(a){return new H.aV(!0,[]).T(new H.a8(!1,P.a6(null,P.n)).E(a))},
hV:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
hW:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
h2:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{h3:function(a){var z=P.a7(["command","print","msg",a])
return new H.a8(!0,P.a6(null,P.n)).E(z)}}},
bB:{
"^":"a;a,b,c,e5:d<,dC:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bN:function(a,b){if(!this.f.l(0,a))return
if(this.Q.a0(0,b)&&!this.y)this.y=!0
this.aU()},
ea:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ai(0,a)
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
if(w===y.c)y.bt();++y.d}this.y=!1}this.aU()},
dk:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.k(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
e9:function(a){var z,y,x
if(this.ch==null)return
for(z=J.k(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.u(new P.H("removeRange"))
P.cr(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cz:function(a,b){if(!this.r.l(0,a))return
this.db=b},
dW:function(a,b,c){var z=J.k(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){a.R(c)
return}z=this.cx
if(z==null){z=P.bk(null,null)
this.cx=z}z.M(new H.fX(a,c))},
dU:function(a,b){var z
if(!this.r.l(0,a))return
z=J.k(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){this.b1()
return}z=this.cx
if(z==null){z=P.bk(null,null)
this.cx=z}z.M(this.ge6())},
dX:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ao(a)
if(b!=null)P.ao(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.ar(a)
y[1]=b==null?null:J.ar(b)
for(x=new P.cb(z,z.r,null,null),x.c=z.e;x.n();)x.d.R(y)},
ae:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.v(u)
w=t
v=H.r(u)
this.dX(w,v)
if(this.db===!0){this.b1()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ge5()
if(this.cx!=null)for(;t=this.cx,!t.gG(t);)this.cx.c9().$0()}return y},
c_:function(a){return this.b.h(0,a)},
bk:function(a,b){var z=this.b
if(z.bR(a))throw H.e(P.aI("Registry: ports must be registered only once."))
z.v(0,a,b)},
aU:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.v(0,this.a,this)
else this.b1()},
b1:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.N(0)
for(z=this.b,y=z.gci(z),y=y.gA(y);y.n();)y.gq().cU()
z.N(0)
this.c.N(0)
init.globalState.z.ai(0,this.a)
this.dx.N(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
w.R(z[v])}this.ch=null}},"$0","ge6",0,0,1]},
fX:{
"^":"c:1;a,b",
$0:function(){this.a.R(this.b)}},
fF:{
"^":"a;a,b",
dI:function(){var z=this.a
if(z.b===z.c)return
return z.c9()},
cd:function(){var z,y,x
z=this.dI()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bR(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gG(y)}else y=!1
else y=!1
else y=!1
if(y)H.u(P.aI("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gG(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a7(["command","close"])
x=new H.a8(!0,P.a6(null,P.n)).E(x)
y.toString
self.postMessage(x)}return!1}z.e8()
return!0},
bE:function(){if(self.window!=null)new H.fG(this).$0()
else for(;this.cd(););},
aj:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bE()
else try{this.bE()}catch(x){w=H.v(x)
z=w
y=H.r(x)
w=init.globalState.Q
v=P.a7(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.a8(!0,P.a6(null,P.n)).E(v)
w.toString
self.postMessage(v)}}},
fG:{
"^":"c:1;a",
$0:function(){if(!this.a.cd())return
P.cz(C.f,this)}},
aA:{
"^":"a;a,b,c",
e8:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ae(this.b)}},
h1:{
"^":"a;"},
ei:{
"^":"c:0;a,b,c,d,e,f",
$0:function(){H.ej(this.a,this.b,this.c,this.d,this.e,this.f)}},
ek:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aD()
w=H.ad(x,[x,x]).S(y)
if(w)y.$2(this.b,this.c)
else{x=H.ad(x,[x]).S(y)
if(x)y.$1(this.b)
else y.$0()}}z.aU()}},
cQ:{
"^":"a;"},
aX:{
"^":"cQ;b,a",
R:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbw())return
x=H.hm(a)
if(z.gdC()===y){y=J.K(x)
switch(y.h(x,0)){case"pause":z.bN(y.h(x,1),y.h(x,2))
break
case"resume":z.ea(y.h(x,1))
break
case"add-ondone":z.dk(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.e9(y.h(x,1))
break
case"set-errors-fatal":z.cz(y.h(x,1),y.h(x,2))
break
case"ping":z.dW(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.dU(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a0(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ai(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.M(new H.aA(z,new H.h5(this,x),w))},
l:function(a,b){if(b==null)return!1
return b instanceof H.aX&&J.a3(this.b,b.b)},
gp:function(a){return this.b.gaP()}},
h5:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbw())z.cQ(this.b)}},
bD:{
"^":"cQ;b,c,a",
R:function(a){var z,y,x
z=P.a7(["command","message","port",this,"msg",a])
y=new H.a8(!0,P.a6(null,P.n)).E(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
l:function(a,b){if(b==null)return!1
return b instanceof H.bD&&J.a3(this.b,b.b)&&J.a3(this.a,b.a)&&J.a3(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cA()
y=this.a
if(typeof y!=="number")return y.cA()
x=this.c
if(typeof x!=="number")return H.L(x)
return(z<<16^y<<8^x)>>>0}},
aT:{
"^":"a;aP:a<,b,bw:c<",
cU:function(){this.c=!0
this.b=null},
cQ:function(a){if(this.c)return
this.d3(a)},
d3:function(a){return this.b.$1(a)},
$iseH:1},
f0:{
"^":"a;a,b,c",
cK:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.M(new H.aA(y,new H.f2(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.an(new H.f3(this,b),0),a)}else throw H.e(new P.H("Timer greater than 0."))},
static:{f1:function(a,b){var z=new H.f0(!0,!1,null)
z.cK(a,b)
return z}}},
f2:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
f3:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
H.b4()
this.b.$0()}},
a5:{
"^":"a;aP:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.el()
z=C.a.bK(z,0)^C.a.ab(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
l:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a5){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
a8:{
"^":"a;a,b",
E:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.v(0,a,z.gj(z))
z=J.k(a)
if(!!z.$iscg)return["buffer",a]
if(!!z.$isbq)return["typed",a]
if(!!z.$isbh)return this.ct(a)
if(!!z.$isef){x=this.gcq()
w=a.gbW()
w=H.aN(w,x,H.C(w,"E",0),null)
w=P.bl(w,!0,H.C(w,"E",0))
z=z.gci(a)
z=H.aN(z,x,H.C(z,"E",0),null)
return["map",w,P.bl(z,!0,H.C(z,"E",0))]}if(!!z.$iset)return this.cu(a)
if(!!z.$isd)this.cg(a)
if(!!z.$iseH)this.ak(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isaX)return this.cv(a)
if(!!z.$isbD)return this.cw(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.ak(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa5)return["capability",a.a]
if(!(a instanceof P.a))this.cg(a)
return["dart",init.classIdExtractor(a),this.cs(init.classFieldsExtractor(a))]},"$1","gcq",2,0,2],
ak:function(a,b){throw H.e(new P.H(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cg:function(a){return this.ak(a,null)},
ct:function(a){var z=this.cr(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ak(a,"Can't serialize indexable: ")},
cr:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.E(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
cs:function(a){var z
for(z=0;z<a.length;++z)C.c.v(a,z,this.E(a[z]))
return a},
cu:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ak(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.E(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
cw:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cv:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaP()]
return["raw sendport",a]}},
aV:{
"^":"a;a,b",
T:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.ba("Bad serialized message: "+H.b(a)))
switch(C.c.gdS(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=this.ac(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.ac(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.ac(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.ac(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.dL(a)
case"sendport":return this.dM(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dK(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.a5(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ac(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","gdJ",2,0,2],
ac:function(a){var z,y,x
z=J.K(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.L(x)
if(!(y<x))break
z.v(a,y,this.T(z.h(a,y)));++y}return a},
dL:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.ca()
this.b.push(w)
y=J.dP(y,this.gdJ()).ba(0)
for(z=J.K(y),v=J.K(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.f(y,u)
w.v(0,y[u],this.T(v.h(x,u)))}return w},
dM:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.a3(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c_(w)
if(u==null)return
t=new H.aX(u,x)}else t=new H.bD(y,w,x)
this.b.push(t)
return t},
dK:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.K(y)
v=J.K(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.L(t)
if(!(u<t))break
w[z.h(y,u)]=this.T(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
e0:function(){throw H.e(new P.H("Cannot modify unmodifiable Map"))},
hD:function(a){return init.types[a]},
hQ:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.k(a).$isbi},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ar(a)
if(typeof z!=="string")throw H.e(H.ac(a))
return z},
U:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cp:function(a){var z,y
z=C.h(J.k(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.dw(z,0)===36)z=C.e.cD(z,1)
return(z+H.dc(H.bI(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aQ:function(a){return"Instance of '"+H.cp(a)+"'"},
y:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
br:function(a){return a.b?H.y(a).getUTCMilliseconds()+0:H.y(a).getMilliseconds()+0},
aP:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ac(a))
return a[b]},
bs:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ac(a))
a[b]=c},
L:function(a){throw H.e(H.ac(a))},
f:function(a,b){if(a==null)J.aq(a)
throw H.e(H.q(a,b))},
q:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a4(!0,b,"index",null)
z=J.aq(a)
if(!(b<0)){if(typeof z!=="number")return H.L(z)
y=b>=z}else y=!0
if(y)return P.c5(b,a,"index",null,z)
return P.aS(b,"index",null)},
ac:function(a){return new P.a4(!0,a,null,null)},
aZ:function(a){return a},
d6:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.ac(a))
return a},
e:function(a){var z
if(a==null)a=new P.cm()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dj})
z.name=""}else z.toString=H.dj
return z},
dj:function(){return J.ar(this.dartException)},
u:function(a){throw H.e(a)},
bO:function(a){throw H.e(new P.B(a))},
v:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hY(a)
if(a==null)return
if(a instanceof H.bf)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bK(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bj(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cl(v,null))}}if(a instanceof TypeError){u=$.$get$cD()
t=$.$get$cE()
s=$.$get$cF()
r=$.$get$cG()
q=$.$get$cK()
p=$.$get$cL()
o=$.$get$cI()
$.$get$cH()
n=$.$get$cN()
m=$.$get$cM()
l=u.I(y)
if(l!=null)return z.$1(H.bj(y,l))
else{l=t.I(y)
if(l!=null){l.method="call"
return z.$1(H.bj(y,l))}else{l=s.I(y)
if(l==null){l=r.I(y)
if(l==null){l=q.I(y)
if(l==null){l=p.I(y)
if(l==null){l=o.I(y)
if(l==null){l=r.I(y)
if(l==null){l=n.I(y)
if(l==null){l=m.I(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cl(y,l==null?null:l.method))}}return z.$1(new H.fp(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cu()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a4(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cu()
return a},
r:function(a){var z
if(a instanceof H.bf)return a.b
if(a==null)return new H.cV(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.cV(a,null)},
hT:function(a){if(a==null||typeof a!='object')return J.w(a)
else return H.U(a)},
d8:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.v(0,a[y],a[x])}return b},
hK:function(a,b,c,d,e,f,g){var z=J.k(c)
if(z.l(c,0))return H.aB(b,new H.hL(a))
else if(z.l(c,1))return H.aB(b,new H.hM(a,d))
else if(z.l(c,2))return H.aB(b,new H.hN(a,d,e))
else if(z.l(c,3))return H.aB(b,new H.hO(a,d,e,f))
else if(z.l(c,4))return H.aB(b,new H.hP(a,d,e,f,g))
else throw H.e(P.aI("Unsupported number of arguments for wrapped closure"))},
an:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.hK)
a.$identity=z
return z},
dZ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.k(c).$isl){z.$reflectionInfo=c
x=H.eK(z).r}else x=c
w=d?Object.create(new H.eP().constructor.prototype):Object.create(new H.bb(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.I
$.I=J.ap(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.c_(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.hD(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.bZ:H.bc
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.c_(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
dW:function(a,b,c,d){var z=H.bc
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
c_:function(a,b,c){var z,y,x,w,v,u
if(c)return H.dY(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.dW(y,!w,z,b)
if(y===0){w=$.ae
if(w==null){w=H.aG("self")
$.ae=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.I
$.I=J.ap(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ae
if(v==null){v=H.aG("self")
$.ae=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.I
$.I=J.ap(w,1)
return new Function(v+H.b(w)+"}")()},
dX:function(a,b,c,d){var z,y
z=H.bc
y=H.bZ
switch(b?-1:a){case 0:throw H.e(new H.eL("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
dY:function(a,b){var z,y,x,w,v,u,t,s
z=H.dV()
y=$.bY
if(y==null){y=H.aG("receiver")
$.bY=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.dX(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.I
$.I=J.ap(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.I
$.I=J.ap(u,1)
return new Function(y+H.b(u)+"}")()},
bH:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.k(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.dZ(a,b,z,!!d,e,f)},
hX:function(a){throw H.e(new P.e2("Cyclic initialization for static "+H.b(a)))},
ad:function(a,b,c){return new H.eM(a,b,c,null)},
aD:function(){return C.k},
b6:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a2:function(a,b,c){var z
if(b===0){J.du(c,a)
return}else if(b===1){c.dA(H.v(a),H.r(a))
return}if(!!J.k(a).$isN)z=a
else{z=H.h(new P.A(0,$.j,null),[null])
z.aG(a)}z.b9(H.d2(b,0),new H.hw(b))
return c.gdT()},
d2:function(a,b){return new H.ht(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
h:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bI:function(a){if(a==null)return
return a.$builtinTypeInfo},
da:function(a,b){return H.di(a["$as"+H.b(b)],H.bI(a))},
C:function(a,b,c){var z=H.da(a,b)
return z==null?null:z[c]},
F:function(a,b){var z=H.bI(a)
return z==null?null:z[b]},
bN:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dc(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dc:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bt("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.bN(u,c))}return w?"":"<"+H.b(z)+">"},
di:function(a,b){if(typeof a=="function"){a=H.bL(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bL(a,null,b)}return b},
hv:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.D(a[y],b[y]))return!1
return!0},
b_:function(a,b,c){return H.bL(a,b,H.da(b,c))},
D:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.db(a,b)
if('func' in a)return b.builtin$cls==="ix"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bN(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.bN(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hv(H.di(v,z),x)},
d4:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.D(z,v)||H.D(v,z)))return!1}return!0},
hu:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.D(v,u)||H.D(u,v)))return!1}return!0},
db:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.D(z,y)||H.D(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.d4(x,w,!1))return!1
if(!H.d4(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.D(o,n)||H.D(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.D(o,n)||H.D(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.D(o,n)||H.D(n,o)))return!1}}return H.hu(a.named,b.named)},
bL:function(a,b,c){return a.apply(b,c)},
jn:function(a){var z=$.bJ
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jl:function(a){return H.U(a)},
jk:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hR:function(a){var z,y,x,w,v,u
z=$.bJ.$1(a)
y=$.b0[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b3[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.d3.$2(a,z)
if(z!=null){y=$.b0[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b3[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bM(x)
$.b0[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.b3[z]=x
return x}if(v==="-"){u=H.bM(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.de(a,x)
if(v==="*")throw H.e(new P.cO(z))
if(init.leafTags[z]===true){u=H.bM(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.de(a,x)},
de:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.b5(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bM:function(a){return J.b5(a,!1,null,!!a.$isbi)},
hS:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.b5(z,!1,null,!!z.$isbi)
else return J.b5(z,c,null,null)},
hI:function(){if(!0===$.bK)return
$.bK=!0
H.hJ()},
hJ:function(){var z,y,x,w,v,u,t,s
$.b0=Object.create(null)
$.b3=Object.create(null)
H.hE()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.df.$1(v)
if(u!=null){t=H.hS(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
hE:function(){var z,y,x,w,v,u,t
z=C.p()
z=H.ab(C.m,H.ab(C.r,H.ab(C.i,H.ab(C.i,H.ab(C.q,H.ab(C.n,H.ab(C.o(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bJ=new H.hF(v)
$.d3=new H.hG(u)
$.df=new H.hH(t)},
ab:function(a,b){return a(b)||b},
e_:{
"^":"a;",
i:function(a){return P.cf(this)},
v:function(a,b,c){return H.e0()}},
ec:{
"^":"e_;a",
aO:function(){var z=this.$map
if(z==null){z=new H.ay(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.d8(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aO().h(0,b)},
w:function(a,b){this.aO().w(0,b)},
gj:function(a){var z=this.aO()
return z.gj(z)}},
eJ:{
"^":"a;a,b,c,d,e,f,r,x",
static:{eK:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.eJ(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fn:{
"^":"a;a,b,c,d,e,f",
I:function(a){var z,y,x
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
static:{J:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fn(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},aU:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},cJ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cl:{
"^":"t;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
ev:{
"^":"t;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bj:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ev(a,y,z?null:b.receiver)}}},
fp:{
"^":"t;a",
i:function(a){var z=this.a
return C.e.gG(z)?"Error":"Error: "+z}},
hY:{
"^":"c:2;a",
$1:function(a){if(!!J.k(a).$ist)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
cV:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
hL:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
hM:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
hN:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
hO:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
hP:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"a;",
i:function(a){return"Closure '"+H.cp(this)+"'"},
gcj:function(){return this},
gcj:function(){return this}},
cx:{
"^":"c;"},
eP:{
"^":"cx;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bb:{
"^":"cx;a,b,c,d",
l:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bb))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.U(this.a)
else y=typeof z!=="object"?J.w(z):H.U(z)
z=H.U(this.b)
if(typeof y!=="number")return y.em()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aQ(z)},
static:{bc:function(a){return a.a},bZ:function(a){return a.c},dV:function(){var z=$.ae
if(z==null){z=H.aG("self")
$.ae=z}return z},aG:function(a){var z,y,x,w,v
z=new H.bb("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eL:{
"^":"t;a",
i:function(a){return"RuntimeError: "+this.a}},
ct:{
"^":"a;"},
eM:{
"^":"ct;a,b,c,d",
S:function(a){var z=this.d_(a)
return z==null?!1:H.db(z,this.a6())},
d_:function(a){var z=J.k(a)
return"$signature" in z?z.$signature():null},
a6:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.k(y)
if(!!x.$isj4)z.void=true
else if(!x.$isc1)z.ret=y.a6()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cs(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cs(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.d7(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a6()}z.named=w}return z},
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
t=H.d7(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].a6())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cs:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a6())
return z}}},
c1:{
"^":"ct;",
i:function(a){return"dynamic"},
a6:function(){return}},
bf:{
"^":"a;a,J:b<"},
hw:{
"^":"c:5;a",
$2:function(a,b){H.d2(this.a,1).$1(new H.bf(a,b))}},
ht:{
"^":"c:2;a,b",
$1:function(a){this.b(this.a,a)}},
ay:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gG:function(a){return this.a===0},
gbW:function(){return H.h(new H.ex(this),[H.F(this,0)])},
gci:function(a){return H.aN(this.gbW(),new H.eu(this),H.F(this,0),H.F(this,1))},
bR:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.cX(z,a)}else return this.e0(a)},
e0:function(a){var z=this.d
if(z==null)return!1
return this.ag(this.K(z,this.af(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.K(z,b)
return y==null?null:y.gV()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.K(x,b)
return y==null?null:y.gV()}else return this.e1(b)},
e1:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.K(z,this.af(a))
x=this.ag(y,a)
if(x<0)return
return y[x].gV()},
v:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aR()
this.b=z}this.bj(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aR()
this.c=y}this.bj(y,b,c)}else this.e3(b,c)},
e3:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aR()
this.d=z}y=this.af(a)
x=this.K(z,y)
if(x==null)this.aT(z,y,[this.aS(a,b)])
else{w=this.ag(x,a)
if(w>=0)x[w].sV(b)
else x.push(this.aS(a,b))}},
ai:function(a,b){if(typeof b==="string")return this.bD(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bD(this.c,b)
else return this.e2(b)},
e2:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.K(z,this.af(a))
x=this.ag(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bL(w)
return w.gV()},
N:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
w:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.B(this))
z=z.c}},
bj:function(a,b,c){var z=this.K(a,b)
if(z==null)this.aT(a,b,this.aS(b,c))
else z.sV(c)},
bD:function(a,b){var z
if(a==null)return
z=this.K(a,b)
if(z==null)return
this.bL(z)
this.bq(a,b)
return z.gV()},
aS:function(a,b){var z,y
z=new H.ew(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bL:function(a){var z,y
z=a.gdd()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
af:function(a){return J.w(a)&0x3ffffff},
ag:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a3(a[y].gbU(),b))return y
return-1},
i:function(a){return P.cf(this)},
K:function(a,b){return a[b]},
aT:function(a,b,c){a[b]=c},
bq:function(a,b){delete a[b]},
cX:function(a,b){return this.K(a,b)!=null},
aR:function(){var z=Object.create(null)
this.aT(z,"<non-identifier-key>",z)
this.bq(z,"<non-identifier-key>")
return z},
$isef:1},
eu:{
"^":"c:2;a",
$1:function(a){return this.a.h(0,a)}},
ew:{
"^":"a;bU:a<,V:b@,c,dd:d<"},
ex:{
"^":"E;a",
gj:function(a){return this.a.a},
gA:function(a){var z,y
z=this.a
y=new H.ey(z,z.r,null,null)
y.c=z.e
return y},
w:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.B(z))
y=y.c}},
$iso:1},
ey:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hF:{
"^":"c:2;a",
$1:function(a){return this.a(a)}},
hG:{
"^":"c:8;a",
$2:function(a,b){return this.a(a,b)}},
hH:{
"^":"c:9;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bg:function(){return new P.ag("No element")},
eo:function(){return new P.ag("Too few elements")},
eZ:function(a){return a.ger()},
aM:{
"^":"E;",
gA:function(a){return new H.cc(this,this.gj(this),0,null)},
w:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.U(0,y))
if(z!==this.gj(this))throw H.e(new P.B(this))}},
a2:function(a,b){return H.h(new H.bm(this,b),[null,null])},
bb:function(a,b){var z,y,x
if(b){z=H.h([],[H.C(this,"aM",0)])
C.c.sj(z,this.gj(this))}else z=H.h(Array(this.gj(this)),[H.C(this,"aM",0)])
for(y=0;y<this.gj(this);++y){x=this.U(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
ba:function(a){return this.bb(a,!0)},
$iso:1},
cc:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z,y,x,w
z=this.a
y=J.K(z)
x=y.gj(z)
if(this.b!==x)throw H.e(new P.B(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.U(z,w);++this.c
return!0}},
ce:{
"^":"E;a,b",
gA:function(a){var z=new H.eB(null,J.b8(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.aq(this.a)},
$asE:function(a,b){return[b]},
static:{aN:function(a,b,c,d){if(!!J.k(a).$iso)return H.h(new H.c2(a,b),[c,d])
return H.h(new H.ce(a,b),[c,d])}}},
c2:{
"^":"ce;a,b",
$iso:1},
eB:{
"^":"ep;a,b,c",
n:function(){var z=this.b
if(z.n()){this.a=this.aN(z.gq())
return!0}this.a=null
return!1},
gq:function(){return this.a},
aN:function(a){return this.c.$1(a)}},
bm:{
"^":"aM;a,b",
gj:function(a){return J.aq(this.a)},
U:function(a,b){return this.aN(J.dz(this.a,b))},
aN:function(a){return this.b.$1(a)},
$asaM:function(a,b){return[b]},
$asE:function(a,b){return[b]},
$iso:1},
c4:{
"^":"a;"}}],["","",,H,{
"^":"",
d7:function(a){var z=H.h(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
fr:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hx()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.an(new P.ft(z),1)).observe(y,{childList:true})
return new P.fs(z,y,x)}else if(self.setImmediate!=null)return P.hy()
return P.hz()},
j6:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.an(new P.fu(a),0))},"$1","hx",2,0,4],
j7:[function(a){++init.globalState.f.b
self.setImmediate(H.an(new P.fv(a),0))},"$1","hy",2,0,4],
j8:[function(a){P.bu(C.f,a)},"$1","hz",2,0,4],
cY:function(a,b){var z=H.aD()
z=H.ad(z,[z,z]).S(a)
if(z){b.toString
return a}else{b.toString
return a}},
ea:function(a,b,c){var z=new P.A(0,$.j,null)
z.$builtinTypeInfo=[c]
P.cz(a,new P.eb(b,z))
return z},
c0:function(a){return H.h(new P.fq(H.h(new P.A(0,$.j,null),[a])),[a])},
hn:function(a,b,c){$.j.toString
a.F(b,c)},
hp:function(){var z,y
for(;z=$.a9,z!=null;){$.al=null
y=z.c
$.a9=y
if(y==null)$.ak=null
$.j=z.b
z.dq()}},
jj:[function(){$.bE=!0
try{P.hp()}finally{$.j=C.b
$.al=null
$.bE=!1
if($.a9!=null)$.$get$by().$1(P.d5())}},"$0","d5",0,0,1],
d1:function(a){if($.a9==null){$.ak=a
$.a9=a
if(!$.bE)$.$get$by().$1(P.d5())}else{$.ak.c=a
$.ak=a}},
dg:function(a){var z,y
z=$.j
if(C.b===z){P.aa(null,null,C.b,a)
return}z.toString
if(C.b.gb0()===z){P.aa(null,null,z,a)
return}y=$.j
P.aa(null,null,y,y.aV(a,!0))},
iY:function(a,b){var z,y,x
z=H.h(new P.cW(null,null,null,0),[b])
y=z.gd7()
x=z.gd9()
z.a=a.W(y,!0,z.gd8(),x)
return z},
hr:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.v(u)
z=t
y=H.r(u)
$.j.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.M(x)
w=t
v=x.gJ()
c.$2(w,v)}}},
hi:function(a,b,c,d){var z=a.aX()
if(!!J.k(z).$isN)z.be(new P.hl(b,c,d))
else b.F(c,d)},
hj:function(a,b){return new P.hk(a,b)},
cz:function(a,b){var z=$.j
if(z===C.b){z.toString
return P.bu(a,b)}return P.bu(a,z.aV(b,!0))},
bu:function(a,b){var z=C.d.ab(a.a,1000)
return H.f1(z<0?0:z,b)},
bx:function(a){var z=$.j
$.j=a
return z},
aC:function(a,b,c,d,e){var z,y,x
z=new P.cP(new P.hq(d,e),C.b,null)
y=$.a9
if(y==null){P.d1(z)
$.al=$.ak}else{x=$.al
if(x==null){z.c=y
$.al=z
$.a9=z}else{z.c=x.c
x.c=z
$.al=z
if(z.c==null)$.ak=z}}},
cZ:function(a,b,c,d){var z,y
if($.j===c)return d.$0()
z=P.bx(c)
try{y=d.$0()
return y}finally{$.j=z}},
d0:function(a,b,c,d,e){var z,y
if($.j===c)return d.$1(e)
z=P.bx(c)
try{y=d.$1(e)
return y}finally{$.j=z}},
d_:function(a,b,c,d,e,f){var z,y
if($.j===c)return d.$2(e,f)
z=P.bx(c)
try{y=d.$2(e,f)
return y}finally{$.j=z}},
aa:function(a,b,c,d){var z=C.b!==c
if(z){d=c.aV(d,!(!z||C.b.gb0()===c))
c=C.b}P.d1(new P.cP(d,c,null))},
ft:{
"^":"c:2;a",
$1:function(a){var z,y
H.b4()
z=this.a
y=z.a
z.a=null
y.$0()}},
fs:{
"^":"c:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fu:{
"^":"c:0;a",
$0:function(){H.b4()
this.a.$0()}},
fv:{
"^":"c:0;a",
$0:function(){H.b4()
this.a.$0()}},
hf:{
"^":"S;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hg:function(a,b){if(b!=null)return b
if(!!J.k(a).$ist)return a.gJ()
return}}},
N:{
"^":"a;"},
eb:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.Y(null)}catch(x){w=H.v(x)
z=w
y=H.r(x)
P.hn(this.b,z,y)}}},
fz:{
"^":"a;dT:a<",
dA:function(a,b){a=a!=null?a:new P.cm()
if(this.a.a!==0)throw H.e(new P.ag("Future already completed"))
$.j.toString
this.F(a,b)}},
fq:{
"^":"fz;a",
bQ:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.ag("Future already completed"))
z.aG(b)},
F:function(a,b){this.a.cT(a,b)}},
ai:{
"^":"a;bx:a<,eb:b>,c,d,e",
ga_:function(){return this.b.b},
gbT:function(){return(this.c&1)!==0},
gdZ:function(){return this.c===6},
gdY:function(){return this.c===8},
gdc:function(){return this.d},
gdj:function(){return this.d}},
A:{
"^":"a;aq:a?,a_:b<,c",
gd4:function(){return this.a===8},
sd5:function(a){if(a)this.a=2
else this.a=0},
b9:function(a,b){var z,y
z=H.h(new P.A(0,$.j,null),[null])
y=z.b
if(y!==C.b){y.toString
if(b!=null)b=P.cY(b,y)}this.aD(new P.ai(null,z,b==null?1:3,a,b))
return z},
be:function(a){var z,y
z=$.j
y=new P.A(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.b)z.toString
this.aD(new P.ai(null,y,8,a,null))
return y},
aQ:function(){if(this.a!==0)throw H.e(new P.ag("Future already completed"))
this.a=1},
gdi:function(){return this.c},
gaa:function(){return this.c},
bJ:function(a){this.a=4
this.c=a},
bI:function(a){this.a=8
this.c=a},
dg:function(a,b){this.bI(new P.S(a,b))},
aD:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aa(null,null,z,new P.fK(this,a))}else{a.a=this.c
this.c=a}},
ap:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbx()
z.a=y}return y},
Y:function(a){var z,y
z=J.k(a)
if(!!z.$isN)if(!!z.$isA)P.aW(a,this)
else P.bA(a,this)
else{y=this.ap()
this.bJ(a)
P.a_(this,y)}},
bp:function(a){var z=this.ap()
this.bJ(a)
P.a_(this,z)},
F:[function(a,b){var z=this.ap()
this.bI(new P.S(a,b))
P.a_(this,z)},function(a){return this.F(a,null)},"en","$2","$1","gaK",2,2,11,0],
aG:function(a){var z
if(a==null);else{z=J.k(a)
if(!!z.$isN){if(!!z.$isA){z=a.a
if(z>=4&&z===8){this.aQ()
z=this.b
z.toString
P.aa(null,null,z,new P.fM(this,a))}else P.aW(a,this)}else P.bA(a,this)
return}}this.aQ()
z=this.b
z.toString
P.aa(null,null,z,new P.fN(this,a))},
cT:function(a,b){var z
this.aQ()
z=this.b
z.toString
P.aa(null,null,z,new P.fL(this,a,b))},
$isN:1,
static:{bA:function(a,b){var z,y,x,w
b.saq(2)
try{a.b9(new P.fO(b),new P.fP(b))}catch(x){w=H.v(x)
z=w
y=H.r(x)
P.dg(new P.fQ(b,z,y))}},aW:function(a,b){var z
b.a=2
z=new P.ai(null,b,0,null,null)
if(a.a>=4)P.a_(a,z)
else a.aD(z)},a_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gd4()
if(b==null){if(w){v=z.a.gaa()
y=z.a.ga_()
x=J.M(v)
u=v.gJ()
y.toString
P.aC(null,null,y,x,u)}return}for(;b.gbx()!=null;b=t){t=b.a
b.a=null
P.a_(z.a,b)}x.a=!0
s=w?null:z.a.gdi()
x.b=s
x.c=!1
y=!w
if(!y||b.gbT()||b.c===8){r=b.ga_()
if(w){u=z.a.ga_()
u.toString
if(u==null?r!=null:u!==r){u=u.gb0()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaa()
y=z.a.ga_()
x=J.M(v)
u=v.gJ()
y.toString
P.aC(null,null,y,x,u)
return}q=$.j
if(q==null?r!=null:q!==r)$.j=r
else q=null
if(y){if(b.gbT())x.a=new P.fS(x,b,s,r).$0()}else new P.fR(z,x,b,r).$0()
if(b.gdY())new P.fT(z,x,w,b,r).$0()
if(q!=null)$.j=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.k(y).$isN}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.A)if(p.a>=4){o.a=2
z.a=p
b=new P.ai(null,o,0,null,null)
y=p
continue}else P.aW(p,o)
else P.bA(p,o)
return}}o=b.b
b=o.ap()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
fK:{
"^":"c:0;a,b",
$0:function(){P.a_(this.a,this.b)}},
fO:{
"^":"c:2;a",
$1:function(a){this.a.bp(a)}},
fP:{
"^":"c:6;a",
$2:function(a,b){this.a.F(a,b)},
$1:function(a){return this.$2(a,null)}},
fQ:{
"^":"c:0;a,b,c",
$0:function(){this.a.F(this.b,this.c)}},
fM:{
"^":"c:0;a,b",
$0:function(){P.aW(this.b,this.a)}},
fN:{
"^":"c:0;a,b",
$0:function(){this.a.bp(this.b)}},
fL:{
"^":"c:0;a,b,c",
$0:function(){this.a.F(this.b,this.c)}},
fS:{
"^":"c:12;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aw(this.b.gdc(),this.c)
return!0}catch(x){w=H.v(x)
z=w
y=H.r(x)
this.a.b=new P.S(z,y)
return!1}}},
fR:{
"^":"c:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaa()
y=!0
r=this.c
if(r.gdZ()){x=r.d
try{y=this.d.aw(x,J.M(z))}catch(q){r=H.v(q)
w=r
v=H.r(q)
r=J.M(z)
p=w
o=(r==null?p==null:r===p)?z:new P.S(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aD()
p=H.ad(p,[p,p]).S(r)
n=this.d
m=this.b
if(p)m.b=n.ed(u,J.M(z),z.gJ())
else m.b=n.aw(u,J.M(z))}catch(q){r=H.v(q)
t=r
s=H.r(q)
r=J.M(z)
p=t
o=(r==null?p==null:r===p)?z:new P.S(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
fT:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cb(this.d.gdj())
z.a=w
v=w}catch(u){z=H.v(u)
y=z
x=H.r(u)
if(this.c){z=J.M(this.a.a.gaa())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaa()
else v.b=new P.S(y,x)
v.a=!1
return}if(!!J.k(v).$isN){t=this.d
s=t.geb(t)
s.sd5(!0)
this.b.c=!0
v.b9(new P.fU(this.a,s),new P.fV(z,s))}}},
fU:{
"^":"c:2;a,b",
$1:function(a){P.a_(this.a.a,new P.ai(null,this.b,0,null,null))}},
fV:{
"^":"c:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.A)){y=H.h(new P.A(0,$.j,null),[null])
z.a=y
y.dg(a,b)}P.a_(z.a,new P.ai(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
cP:{
"^":"a;a,b,c",
dq:function(){return this.a.$0()}},
W:{
"^":"a;",
a2:function(a,b){return H.h(new P.h4(b,this),[H.C(this,"W",0),null])},
w:function(a,b){var z,y
z={}
y=H.h(new P.A(0,$.j,null),[null])
z.a=null
z.a=this.W(new P.eT(z,this,b,y),!0,new P.eU(y),y.gaK())
return y},
gj:function(a){var z,y
z={}
y=H.h(new P.A(0,$.j,null),[P.n])
z.a=0
this.W(new P.eV(z),!0,new P.eW(z,y),y.gaK())
return y},
ba:function(a){var z,y
z=H.h([],[H.C(this,"W",0)])
y=H.h(new P.A(0,$.j,null),[[P.l,H.C(this,"W",0)]])
this.W(new P.eX(this,z),!0,new P.eY(z,y),y.gaK())
return y}},
eT:{
"^":"c;a,b,c,d",
$1:function(a){P.hr(new P.eR(this.c,a),new P.eS(),P.hj(this.a.a,this.d))},
$signature:function(){return H.b_(function(a){return{func:1,args:[a]}},this.b,"W")}},
eR:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
eS:{
"^":"c:2;",
$1:function(a){}},
eU:{
"^":"c:0;a",
$0:function(){this.a.Y(null)}},
eV:{
"^":"c:2;a",
$1:function(a){++this.a.a}},
eW:{
"^":"c:0;a,b",
$0:function(){this.b.Y(this.a.a)}},
eX:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b_(function(a){return{func:1,args:[a]}},this.a,"W")}},
eY:{
"^":"c:0;a,b",
$0:function(){this.b.Y(this.a)}},
eQ:{
"^":"a;"},
jc:{
"^":"a;"},
fw:{
"^":"a;a_:d<,aq:e?",
b4:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bO()
if((z&4)===0&&(this.e&32)===0)this.bu(this.gbz())},
ah:function(a){return this.b4(a,null)},
ca:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gG(z)}else z=!1
if(z)this.r.az(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bu(this.gbB())}}}},
aX:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aH()
return this.f},
aH:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bO()
if((this.e&32)===0)this.r=null
this.f=this.by()},
aF:["cH",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bF(a)
else this.aE(new P.fC(a,null))}],
aC:["cI",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bH(a,b)
else this.aE(new P.fE(a,b,null))}],
cS:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bG()
else this.aE(C.l)},
bA:[function(){},"$0","gbz",0,0,1],
bC:[function(){},"$0","gbB",0,0,1],
by:function(){return},
aE:function(a){var z,y
z=this.r
if(z==null){z=new P.he(null,null,0)
this.r=z}z.a0(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.az(this)}},
bF:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.b8(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aI((z&4)!==0)},
bH:function(a,b){var z,y
z=this.e
y=new P.fy(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aH()
z=this.f
if(!!J.k(z).$isN)z.be(y)
else y.$0()}else{y.$0()
this.aI((z&4)!==0)}},
bG:function(){var z,y
z=new P.fx(this)
this.aH()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.k(y).$isN)y.be(z)
else z.$0()},
bu:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aI((z&4)!==0)},
aI:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gG(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gG(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bA()
else this.bC()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.az(this)},
cO:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.cY(b,z)
this.c=c}},
fy:{
"^":"c:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aD()
x=H.ad(x,[x,x]).S(y)
w=z.d
v=this.b
u=z.b
if(x)w.ee(u,v,this.c)
else w.b8(u,v)
z.e=(z.e&4294967263)>>>0}},
fx:{
"^":"c:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cc(z.c)
z.e=(z.e&4294967263)>>>0}},
cR:{
"^":"a;au:a@"},
fC:{
"^":"cR;b,a",
b5:function(a){a.bF(this.b)}},
fE:{
"^":"cR;ad:b>,J:c<,a",
b5:function(a){a.bH(this.b,this.c)}},
fD:{
"^":"a;",
b5:function(a){a.bG()},
gau:function(){return},
sau:function(a){throw H.e(new P.ag("No events after a done."))}},
h6:{
"^":"a;aq:a?",
az:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dg(new P.h7(this,a))
this.a=1},
bO:function(){if(this.a===1)this.a=3}},
h7:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.dV(this.b)}},
he:{
"^":"h6;b,c,a",
gG:function(a){return this.c==null},
a0:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sau(b)
this.c=b}},
dV:function(a){var z,y
z=this.b
y=z.gau()
this.b=y
if(y==null)this.c=null
z.b5(a)}},
cW:{
"^":"a;a,b,c,aq:d?",
bl:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
es:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.Y(!0)
return}this.a.ah(0)
this.c=a
this.d=3},"$1","gd7",2,0,function(){return H.b_(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"cW")}],
da:[function(a,b){var z
if(this.d===2){z=this.c
this.bl(0)
z.F(a,b)
return}this.a.ah(0)
this.c=new P.S(a,b)
this.d=4},function(a){return this.da(a,null)},"ev","$2","$1","gd9",2,2,13,0],
eu:[function(){if(this.d===2){var z=this.c
this.bl(0)
z.Y(!1)
return}this.a.ah(0)
this.c=null
this.d=5},"$0","gd8",0,0,1]},
hl:{
"^":"c:0;a,b,c",
$0:function(){return this.a.F(this.b,this.c)}},
hk:{
"^":"c:5;a,b",
$2:function(a,b){return P.hi(this.a,this.b,a,b)}},
bz:{
"^":"W;",
W:function(a,b,c,d){return this.cY(a,d,c,!0===b)},
bZ:function(a,b,c){return this.W(a,null,b,c)},
cY:function(a,b,c,d){return P.fJ(this,a,b,c,d,H.C(this,"bz",0),H.C(this,"bz",1))},
bv:function(a,b){b.aF(a)},
$asW:function(a,b){return[b]}},
cS:{
"^":"fw;x,y,a,b,c,d,e,f,r",
aF:function(a){if((this.e&2)!==0)return
this.cH(a)},
aC:function(a,b){if((this.e&2)!==0)return
this.cI(a,b)},
bA:[function(){var z=this.y
if(z==null)return
z.ah(0)},"$0","gbz",0,0,1],
bC:[function(){var z=this.y
if(z==null)return
z.ca()},"$0","gbB",0,0,1],
by:function(){var z=this.y
if(z!=null){this.y=null
z.aX()}return},
eo:[function(a){this.x.bv(a,this)},"$1","gd0",2,0,function(){return H.b_(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"cS")}],
eq:[function(a,b){this.aC(a,b)},"$2","gd2",4,0,14],
ep:[function(){this.cS()},"$0","gd1",0,0,1],
cP:function(a,b,c,d,e,f,g){var z,y
z=this.gd0()
y=this.gd2()
this.y=this.x.a.bZ(z,this.gd1(),y)},
static:{fJ:function(a,b,c,d,e,f,g){var z=$.j
z=H.h(new P.cS(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cO(b,c,d,e)
z.cP(a,b,c,d,e,f,g)
return z}}},
h4:{
"^":"bz;b,a",
bv:function(a,b){var z,y,x,w,v
z=null
try{z=this.dh(a)}catch(w){v=H.v(w)
y=v
x=H.r(w)
$.j.toString
b.aC(y,x)
return}b.aF(z)},
dh:function(a){return this.b.$1(a)}},
S:{
"^":"a;ad:a>,J:b<",
i:function(a){return H.b(this.a)},
$ist:1},
hh:{
"^":"a;"},
hq:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.hf(z,P.hg(z,this.b)))}},
h9:{
"^":"hh;",
gb0:function(){return this},
cc:function(a){var z,y,x,w
try{if(C.b===$.j){x=a.$0()
return x}x=P.cZ(null,null,this,a)
return x}catch(w){x=H.v(w)
z=x
y=H.r(w)
return P.aC(null,null,this,z,y)}},
b8:function(a,b){var z,y,x,w
try{if(C.b===$.j){x=a.$1(b)
return x}x=P.d0(null,null,this,a,b)
return x}catch(w){x=H.v(w)
z=x
y=H.r(w)
return P.aC(null,null,this,z,y)}},
ee:function(a,b,c){var z,y,x,w
try{if(C.b===$.j){x=a.$2(b,c)
return x}x=P.d_(null,null,this,a,b,c)
return x}catch(w){x=H.v(w)
z=x
y=H.r(w)
return P.aC(null,null,this,z,y)}},
aV:function(a,b){if(b)return new P.ha(this,a)
else return new P.hb(this,a)},
dm:function(a,b){if(b)return new P.hc(this,a)
else return new P.hd(this,a)},
h:function(a,b){return},
cb:function(a){if($.j===C.b)return a.$0()
return P.cZ(null,null,this,a)},
aw:function(a,b){if($.j===C.b)return a.$1(b)
return P.d0(null,null,this,a,b)},
ed:function(a,b,c){if($.j===C.b)return a.$2(b,c)
return P.d_(null,null,this,a,b,c)}},
ha:{
"^":"c:0;a,b",
$0:function(){return this.a.cc(this.b)}},
hb:{
"^":"c:0;a,b",
$0:function(){return this.a.cb(this.b)}},
hc:{
"^":"c:2;a,b",
$1:function(a){return this.a.b8(this.b,a)}},
hd:{
"^":"c:2;a,b",
$1:function(a){return this.a.aw(this.b,a)}}}],["","",,P,{
"^":"",
ca:function(){return H.h(new H.ay(0,null,null,null,null,null,0),[null,null])},
a7:function(a){return H.d8(a,H.h(new H.ay(0,null,null,null,null,null,0),[null,null]))},
en:function(a,b,c){var z,y
if(P.bF(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$am()
y.push(a)
try{P.ho(a,z)}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=P.cv(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aJ:function(a,b,c){var z,y,x
if(P.bF(a))return b+"..."+c
z=new P.bt(b)
y=$.$get$am()
y.push(a)
try{x=z
x.a=P.cv(x.gZ(),a,", ")}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=z
y.a=y.gZ()+c
y=z.gZ()
return y.charCodeAt(0)==0?y:y},
bF:function(a){var z,y
for(z=0;y=$.$get$am(),z<y.length;++z)if(a===y[z])return!0
return!1},
ho:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.n())return
w=H.b(z.gq())
b.push(w)
y+=w.length+2;++x}if(!z.n()){if(x<=5)return
if(0>=b.length)return H.f(b,0)
v=b.pop()
if(0>=b.length)return H.f(b,0)
u=b.pop()}else{t=z.gq();++x
if(!z.n()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gq();++x
for(;z.n();t=s,s=r){r=z.gq();++x
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
aL:function(a,b,c,d,e){return H.h(new H.ay(0,null,null,null,null,null,0),[d,e])},
a6:function(a,b){return P.h_(a,b)},
af:function(a,b,c,d){return H.h(new P.fY(0,null,null,null,null,null,0),[d])},
cf:function(a){var z,y,x
z={}
if(P.bF(a))return"{...}"
y=new P.bt("")
try{$.$get$am().push(a)
x=y
x.a=x.gZ()+"{"
z.a=!0
J.dB(a,new P.eC(z,y))
z=y
z.a=z.gZ()+"}"}finally{z=$.$get$am()
if(0>=z.length)return H.f(z,0)
z.pop()}z=y.gZ()
return z.charCodeAt(0)==0?z:z},
fZ:{
"^":"ay;a,b,c,d,e,f,r",
af:function(a){return H.hT(a)&0x3ffffff},
ag:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbU()
if(x==null?b==null:x===b)return y}return-1},
static:{h_:function(a,b){return H.h(new P.fZ(0,null,null,null,null,null,0),[a,b])}}},
fY:{
"^":"fW;a,b,c,d,e,f,r",
gA:function(a){var z=new P.cb(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dB:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.cW(b)},
cW:function(a){var z=this.d
if(z==null)return!1
return this.ao(z[this.an(a)],a)>=0},
c_:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dB(0,a)?a:null
else return this.d6(a)},
d6:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.an(a)]
x=this.ao(y,a)
if(x<0)return
return J.dl(y,x).gbr()},
w:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.B(this))
z=z.b}},
a0:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bC()
this.b=z}return this.bm(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bC()
this.c=y}return this.bm(y,b)}else return this.M(b)},
M:function(a){var z,y,x
z=this.d
if(z==null){z=P.bC()
this.d=z}y=this.an(a)
x=z[y]
if(x==null)z[y]=[this.aJ(a)]
else{if(this.ao(x,a)>=0)return!1
x.push(this.aJ(a))}return!0},
ai:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bn(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bn(this.c,b)
else return this.de(b)},
de:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.an(a)]
x=this.ao(y,a)
if(x<0)return!1
this.bo(y.splice(x,1)[0])
return!0},
N:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bm:function(a,b){if(a[b]!=null)return!1
a[b]=this.aJ(b)
return!0},
bn:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bo(z)
delete a[b]
return!0},
aJ:function(a){var z,y
z=new P.ez(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bo:function(a){var z,y
z=a.gcV()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
an:function(a){return J.w(a)&0x3ffffff},
ao:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a3(a[y].gbr(),b))return y
return-1},
$iso:1,
static:{bC:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
ez:{
"^":"a;br:a<,b,cV:c<"},
cb:{
"^":"a;a,b,c,d",
gq:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
fW:{
"^":"eN;"},
cd:{
"^":"a;",
gA:function(a){return new H.cc(a,this.gj(a),0,null)},
U:function(a,b){return this.h(a,b)},
w:function(a,b){var z,y,x,w
z=this.gj(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.f(a,w)
b.$1(a[w])
if(x)throw H.e(new P.B(a))}},
a2:function(a,b){return H.h(new H.bm(a,b),[null,null])},
i:function(a){return P.aJ(a,"[","]")},
$isl:1,
$asl:null,
$iso:1},
eC:{
"^":"c:15;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
eA:{
"^":"E;a,b,c,d",
gA:function(a){return new P.h0(this,this.c,this.d,this.b,null)},
w:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.u(new P.B(this))}},
gG:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
N:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aJ(this,"{","}")},
c9:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bg());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
M:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bt();++this.d},
bt:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.h(z,[H.F(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.bh(y,0,w,z,x)
C.c.bh(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cJ:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.h(z,[b])},
$iso:1,
static:{bk:function(a,b){var z=H.h(new P.eA(null,0,0,0),[b])
z.cJ(a,b)
return z}}},
h0:{
"^":"a;a,b,c,d,e",
gq:function(){return this.e},
n:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.u(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
eO:{
"^":"a;",
a2:function(a,b){return H.h(new H.c2(this,b),[H.F(this,0),null])},
i:function(a){return P.aJ(this,"{","}")},
w:function(a,b){var z
for(z=this.gA(this);z.n();)b.$1(z.d)},
$iso:1},
eN:{
"^":"eO;"}}],["","",,P,{
"^":"",
hs:function(a){return H.eZ(a)},
bd:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ar(a)
if(typeof a==="string")return JSON.stringify(a)
return P.e8(a)},
e8:function(a){var z=J.k(a)
if(!!z.$isc)return z.i(a)
return H.aQ(a)},
aI:function(a){return new P.fI(a)},
bl:function(a,b,c){var z,y
z=H.h([],[c])
for(y=J.b8(a);y.n();)z.push(y.gq())
if(b)return z
z.fixed$length=Array
return z},
ao:function(a){var z=H.b(a)
H.hU(z)},
iQ:{
"^":"c:16;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.hs(a)}},
bG:{
"^":"a;"},
"+bool":0,
aH:{
"^":"a;a,b",
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.aH))return!1
return this.a===b.a&&this.b===b.b},
gp:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.e3(z?H.y(this).getUTCFullYear()+0:H.y(this).getFullYear()+0)
x=P.as(z?H.y(this).getUTCMonth()+1:H.y(this).getMonth()+1)
w=P.as(z?H.y(this).getUTCDate()+0:H.y(this).getDate()+0)
v=P.as(z?H.y(this).getUTCHours()+0:H.y(this).getHours()+0)
u=P.as(z?H.y(this).getUTCMinutes()+0:H.y(this).getMinutes()+0)
t=P.as(z?H.y(this).getUTCSeconds()+0:H.y(this).getSeconds()+0)
s=P.e4(H.br(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{e3:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},e4:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},as:function(a){if(a>=10)return""+a
return"0"+a}}},
b7:{
"^":"aF;"},
"+double":0,
at:{
"^":"a;a",
k:function(a,b){return new P.at(C.d.k(this.a,b.gcZ()))},
ay:function(a,b){return C.d.ay(this.a,b.gcZ())},
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.at))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.e7()
y=this.a
if(y<0)return"-"+new P.at(-y).i(0)
x=z.$1(C.d.b6(C.d.ab(y,6e7),60))
w=z.$1(C.d.b6(C.d.ab(y,1e6),60))
v=new P.e6().$1(C.d.b6(y,1e6))
return""+C.d.ab(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
e6:{
"^":"c:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
e7:{
"^":"c:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
t:{
"^":"a;",
gJ:function(){return H.r(this.$thrownJsError)}},
cm:{
"^":"t;",
i:function(a){return"Throw of null."}},
a4:{
"^":"t;a,b,c,d",
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
u=P.bd(this.b)
return w+v+": "+H.b(u)},
static:{ba:function(a){return new P.a4(!1,null,null,a)},dT:function(a,b,c){return new P.a4(!0,a,b,c)}}},
cq:{
"^":"a4;e,f,a,b,c,d",
gaM:function(){return"RangeError"},
gaL:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.ek()
if(typeof z!=="number")return H.L(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{aS:function(a,b,c){return new P.cq(null,null,!0,a,b,"Value not in range")},aR:function(a,b,c,d,e){return new P.cq(b,c,!0,a,d,"Invalid value")},cr:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.aR(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.aR(b,a,c,"end",f))
return b}}},
ed:{
"^":"a4;e,j:f>,a,b,c,d",
gaM:function(){return"RangeError"},
gaL:function(){P.bd(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dk(this.b,0)?": index must not be negative":z},
static:{c5:function(a,b,c,d,e){var z=e!=null?e:J.aq(b)
return new P.ed(b,z,!0,a,c,"Index out of range")}}},
H:{
"^":"t;a",
i:function(a){return"Unsupported operation: "+this.a}},
cO:{
"^":"t;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
ag:{
"^":"t;a",
i:function(a){return"Bad state: "+this.a}},
B:{
"^":"t;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bd(z))+"."}},
cu:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gJ:function(){return},
$ist:1},
e2:{
"^":"t;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
fI:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
e9:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aP(b,"expando$values")
return z==null?null:H.aP(z,this.bs())},
v:function(a,b,c){var z=H.aP(b,"expando$values")
if(z==null){z=new P.a()
H.bs(b,"expando$values",z)}H.bs(z,this.bs(),c)},
bs:function(){var z,y
z=H.aP(this,"expando$key")
if(z==null){y=$.c3
$.c3=y+1
z="expando$key$"+y
H.bs(this,"expando$key",z)}return z}},
n:{
"^":"aF;"},
"+int":0,
E:{
"^":"a;",
a2:function(a,b){return H.aN(this,b,H.C(this,"E",0),null)},
w:function(a,b){var z
for(z=this.gA(this);z.n();)b.$1(z.gq())},
bb:function(a,b){return P.bl(this,b,H.C(this,"E",0))},
ba:function(a){return this.bb(a,!0)},
gj:function(a){var z,y
z=this.gA(this)
for(y=0;z.n();)++y
return y},
U:function(a,b){var z,y,x
if(b<0)H.u(P.aR(b,0,null,"index",null))
for(z=this.gA(this),y=0;z.n();){x=z.gq()
if(b===y)return x;++y}throw H.e(P.c5(b,this,"index",null,y))},
i:function(a){return P.en(this,"(",")")}},
ep:{
"^":"a;"},
l:{
"^":"a;",
$asl:null,
$iso:1},
"+List":0,
iR:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aF:{
"^":"a;"},
"+num":0,
a:{
"^":";",
l:function(a,b){return this===b},
gp:function(a){return H.U(this)},
i:function(a){return H.aQ(this)}},
V:{
"^":"a;"},
R:{
"^":"a;"},
"+String":0,
bt:{
"^":"a;Z:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cv:function(a,b,c){var z=J.b8(b)
if(!z.n())return a
if(c.length===0){do a+=H.b(z.gq())
while(z.n())}else{a+=H.b(z.gq())
for(;z.n();)a=a+c+H.b(z.gq())}return a}}},
cw:{
"^":"a;"}}],["","",,W,{
"^":"",
a0:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
cT:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
cX:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.fB(a)
if(!!J.k(z).$isG)return z
return}else return a},
a1:function(a){var z=$.j
if(z===C.b)return a
return z.dm(a,!0)},
x:{
"^":"au;",
$isx:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
i0:{
"^":"x;",
i:function(a){return String(a)},
$isd:1,
"%":"HTMLAnchorElement"},
i2:{
"^":"x;",
i:function(a){return String(a)},
$isd:1,
"%":"HTMLAreaElement"},
i3:{
"^":"x;",
$isG:1,
$isd:1,
"%":"HTMLBodyElement"},
i4:{
"^":"x;t:height},u:width}",
bf:function(a,b,c){return a.getContext(b,P.hA(c))},
cn:function(a,b,c,d,e,f,g){var z,y
z=P.a7(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bf(a,"webgl",z)
return y==null?this.bf(a,"experimental-webgl",z):y},
cm:function(a,b){return this.cn(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
i5:{
"^":"d;",
bY:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
i7:{
"^":"aO;j:length=",
$isd:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
i8:{
"^":"ee;j:length=",
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
ee:{
"^":"d+e1;"},
e1:{
"^":"a;"},
i9:{
"^":"aO;",
$isd:1,
"%":"DocumentFragment|ShadowRoot"},
ia:{
"^":"d;",
i:function(a){return String(a)},
"%":"DOMException"},
e5:{
"^":"d;aW:bottom=,t:height=,H:left=,b7:right=,a7:top=,u:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gu(a))+" x "+H.b(this.gt(a))},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.k(b)
if(!z.$isQ)return!1
y=a.left
x=z.gH(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga7(b)
if(y==null?x==null:y===x){y=this.gu(a)
x=z.gu(b)
if(y==null?x==null:y===x){y=this.gt(a)
z=z.gt(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w
z=J.w(a.left)
y=J.w(a.top)
x=J.w(this.gu(a))
w=J.w(this.gt(a))
return W.cT(W.a0(W.a0(W.a0(W.a0(0,z),y),x),w))},
gbc:function(a){return H.h(new P.P(a.left,a.top),[null])},
$isQ:1,
$asQ:I.b1,
"%":";DOMRectReadOnly"},
au:{
"^":"aO;",
gC:function(a){return P.eI(C.a.av(a.offsetLeft),C.a.av(a.offsetTop),C.a.av(a.offsetWidth),C.a.av(a.offsetHeight),null)},
i:function(a){return a.localName},
cl:function(a){return a.getBoundingClientRect()},
gc0:function(a){return H.h(new W.z(a,"mousedown",!1),[null])},
gc1:function(a){return H.h(new W.z(a,"mouseenter",!1),[null])},
gc2:function(a){return H.h(new W.z(a,"mouseleave",!1),[null])},
gc3:function(a){return H.h(new W.z(a,"mousemove",!1),[null])},
gc4:function(a){return H.h(new W.z(a,"mouseout",!1),[null])},
gc5:function(a){return H.h(new W.z(a,"mouseover",!1),[null])},
gc6:function(a){return H.h(new W.z(a,"mouseup",!1),[null])},
$isau:1,
$isd:1,
$isG:1,
"%":";Element"},
ib:{
"^":"x;t:height},u:width}",
"%":"HTMLEmbedElement"},
ic:{
"^":"be;ad:error=",
"%":"ErrorEvent"},
be:{
"^":"d;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
G:{
"^":"d;",
cR:function(a,b,c,d){return a.addEventListener(b,H.an(c,1),d)},
df:function(a,b,c,d){return a.removeEventListener(b,H.an(c,1),d)},
$isG:1,
"%":"MediaStream;EventTarget"},
iw:{
"^":"x;j:length=",
"%":"HTMLFormElement"},
iy:{
"^":"x;t:height},u:width}",
"%":"HTMLIFrameElement"},
iz:{
"^":"x;t:height},u:width}",
bQ:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
iB:{
"^":"x;t:height},u:width}",
$isau:1,
$isd:1,
$isG:1,
"%":"HTMLInputElement"},
eD:{
"^":"x;ad:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
bn:{
"^":"fo;",
gC:function(a){var z,y
if(!!a.offsetX)return H.h(new P.P(a.offsetX,a.offsetY),[null])
else{if(!J.k(W.cX(a.target)).$isau)throw H.e(new P.H("offsetX is only supported on elements"))
z=W.cX(a.target)
y=H.h(new P.P(a.clientX,a.clientY),[null]).aB(0,J.dJ(J.dM(z)))
return H.h(new P.P(J.bW(y.a),J.bW(y.b)),[null])}},
$isbn:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
iP:{
"^":"d;",
$isd:1,
"%":"Navigator"},
aO:{
"^":"G;",
i:function(a){var z=a.nodeValue
return z==null?this.cF(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
iS:{
"^":"x;t:height},u:width}",
"%":"HTMLObjectElement"},
iW:{
"^":"x;j:length=",
"%":"HTMLSelectElement"},
iX:{
"^":"be;ad:error=",
"%":"SpeechRecognitionError"},
fo:{
"^":"be;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
j2:{
"^":"eD;t:height},u:width}",
"%":"HTMLVideoElement"},
j5:{
"^":"G;",
$isd:1,
$isG:1,
"%":"DOMWindow|Window"},
j9:{
"^":"d;aW:bottom=,t:height=,H:left=,b7:right=,a7:top=,u:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.k(b)
if(!z.$isQ)return!1
y=a.left
x=z.gH(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga7(b)
if(y==null?x==null:y===x){y=a.width
x=z.gu(b)
if(y==null?x==null:y===x){y=a.height
z=z.gt(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w
z=J.w(a.left)
y=J.w(a.top)
x=J.w(a.width)
w=J.w(a.height)
return W.cT(W.a0(W.a0(W.a0(W.a0(0,z),y),x),w))},
gbc:function(a){return H.h(new P.P(a.left,a.top),[null])},
$isQ:1,
$asQ:I.b1,
"%":"ClientRect"},
ja:{
"^":"aO;",
$isd:1,
"%":"DocumentType"},
jb:{
"^":"e5;",
gt:function(a){return a.height},
gu:function(a){return a.width},
"%":"DOMRect"},
je:{
"^":"x;",
$isG:1,
$isd:1,
"%":"HTMLFrameSetElement"},
fH:{
"^":"W;",
W:function(a,b,c,d){var z=new W.Z(0,this.a,this.b,W.a1(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.L()
return z},
bZ:function(a,b,c){return this.W(a,null,b,c)}},
z:{
"^":"fH;a,b,c"},
Z:{
"^":"eQ;a,b,c,d,e",
aX:function(){if(this.b==null)return
this.bM()
this.b=null
this.d=null
return},
b4:function(a,b){if(this.b==null)return;++this.a
this.bM()},
ah:function(a){return this.b4(a,null)},
ca:function(){if(this.b==null||this.a<=0)return;--this.a
this.L()},
L:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dm(x,this.c,z,this.e)}},
bM:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dn(x,this.c,z,this.e)}}},
fA:{
"^":"a;a",
$isG:1,
$isd:1,
static:{fB:function(a){if(a===window)return a
else return new W.fA(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
hZ:{
"^":"av;",
$isd:1,
"%":"SVGAElement"},
i_:{
"^":"f_;",
$isd:1,
"%":"SVGAltGlyphElement"},
i1:{
"^":"m;",
$isd:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
id:{
"^":"m;",
$isd:1,
"%":"SVGFEBlendElement"},
ie:{
"^":"m;",
$isd:1,
"%":"SVGFEColorMatrixElement"},
ig:{
"^":"m;",
$isd:1,
"%":"SVGFEComponentTransferElement"},
ih:{
"^":"m;",
$isd:1,
"%":"SVGFECompositeElement"},
ii:{
"^":"m;",
$isd:1,
"%":"SVGFEConvolveMatrixElement"},
ij:{
"^":"m;",
$isd:1,
"%":"SVGFEDiffuseLightingElement"},
ik:{
"^":"m;",
$isd:1,
"%":"SVGFEDisplacementMapElement"},
il:{
"^":"m;",
$isd:1,
"%":"SVGFEFloodElement"},
im:{
"^":"m;",
$isd:1,
"%":"SVGFEGaussianBlurElement"},
io:{
"^":"m;",
$isd:1,
"%":"SVGFEImageElement"},
ip:{
"^":"m;",
$isd:1,
"%":"SVGFEMergeElement"},
iq:{
"^":"m;",
$isd:1,
"%":"SVGFEMorphologyElement"},
ir:{
"^":"m;",
$isd:1,
"%":"SVGFEOffsetElement"},
is:{
"^":"m;",
$isd:1,
"%":"SVGFESpecularLightingElement"},
it:{
"^":"m;",
$isd:1,
"%":"SVGFETileElement"},
iu:{
"^":"m;",
$isd:1,
"%":"SVGFETurbulenceElement"},
iv:{
"^":"m;",
$isd:1,
"%":"SVGFilterElement"},
av:{
"^":"m;",
$isd:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
iA:{
"^":"av;",
$isd:1,
"%":"SVGImageElement"},
iE:{
"^":"m;",
$isd:1,
"%":"SVGMarkerElement"},
iF:{
"^":"m;",
$isd:1,
"%":"SVGMaskElement"},
iT:{
"^":"m;",
$isd:1,
"%":"SVGPatternElement"},
iV:{
"^":"m;",
$isd:1,
"%":"SVGScriptElement"},
m:{
"^":"au;",
gc0:function(a){return H.h(new W.z(a,"mousedown",!1),[null])},
gc1:function(a){return H.h(new W.z(a,"mouseenter",!1),[null])},
gc2:function(a){return H.h(new W.z(a,"mouseleave",!1),[null])},
gc3:function(a){return H.h(new W.z(a,"mousemove",!1),[null])},
gc4:function(a){return H.h(new W.z(a,"mouseout",!1),[null])},
gc5:function(a){return H.h(new W.z(a,"mouseover",!1),[null])},
gc6:function(a){return H.h(new W.z(a,"mouseup",!1),[null])},
$isG:1,
$isd:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
iZ:{
"^":"av;",
$isd:1,
"%":"SVGSVGElement"},
j_:{
"^":"m;",
$isd:1,
"%":"SVGSymbolElement"},
cy:{
"^":"av;",
"%":";SVGTextContentElement"},
j0:{
"^":"cy;",
$isd:1,
"%":"SVGTextPathElement"},
f_:{
"^":"cy;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
j1:{
"^":"av;",
$isd:1,
"%":"SVGUseElement"},
j3:{
"^":"m;",
$isd:1,
"%":"SVGViewElement"},
jd:{
"^":"m;",
$isd:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jf:{
"^":"m;",
$isd:1,
"%":"SVGCursorElement"},
jg:{
"^":"m;",
$isd:1,
"%":"SVGFEDropShadowElement"},
jh:{
"^":"m;",
$isd:1,
"%":"SVGGlyphRefElement"},
ji:{
"^":"m;",
$isd:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iU:{
"^":"d;",
dl:function(a,b,c){return a.bindBuffer(b,c)},
dn:function(a,b,c){return a.blendFunc(b,c)},
ds:function(a,b){return a.clear(b)},
dt:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
du:function(a,b){return a.clearDepth(b)},
dv:function(a,b){return a.clearStencil(b)},
dz:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dD:function(a){return a.createBuffer()},
dE:function(a){return a.createProgram()},
dF:function(a,b){return a.createShader(b)},
dG:function(a,b){return a.depthFunc(b)},
dH:function(a,b){return a.depthMask(b)},
dO:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
dQ:function(a,b){return a.enable(b)},
dR:function(a,b){return a.enableVertexAttribArray(b)},
ck:function(a,b,c){return a.getAttribLocation(b,c)},
cp:function(a,b,c){return a.getUniformLocation(b,c)},
bY:function(a,b){return a.lineWidth(b)},
cB:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cC:function(a,b,c,d){return a.stencilOp(b,c,d)},
eh:function(a,b){return a.useProgram(b)},
ei:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
i6:{
"^":"a;"}}],["","",,P,{
"^":"",
aj:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
cU:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
P:{
"^":"a;B:a>,D:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
l:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.P))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gp:function(a){var z,y
z=J.w(this.a)
y=J.w(this.b)
return P.cU(P.aj(P.aj(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gB(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gD(b)
if(typeof z!=="number")return z.k()
y=new P.P(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aB:function(a,b){var z,y,x,w
z=this.a
y=J.dK(b)
if(typeof z!=="number")return z.aB()
if(typeof y!=="number")return H.L(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aB()
if(typeof w!=="number")return H.L(w)
w=new P.P(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
h8:{
"^":"a;",
gb7:function(a){return this.gH(this)+this.c},
gaW:function(a){return this.ga7(this)+this.d},
i:function(a){return"Rectangle ("+this.gH(this)+", "+this.b+") "+this.c+" x "+this.d},
l:function(a,b){var z,y
if(b==null)return!1
z=J.k(b)
if(!z.$isQ)return!1
if(this.gH(this)===z.gH(b)){y=this.b
z=y===z.ga7(b)&&this.a+this.c===z.gb7(b)&&y+this.d===z.gaW(b)}else z=!1
return z},
gp:function(a){var z=this.b
return P.cU(P.aj(P.aj(P.aj(P.aj(0,this.gH(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbc:function(a){var z=new P.P(this.gH(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
Q:{
"^":"h8;H:a>,a7:b>,u:c>,t:d>",
$asQ:null,
static:{eI:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.h(new P.Q(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
p:function(a){return a},
aY:function(a){return a},
cg:{
"^":"d;",
$iscg:1,
"%":"ArrayBuffer"},
bq:{
"^":"d;",
$isbq:1,
"%":"DataView;ArrayBufferView;bo|ch|cj|bp|ci|ck|T"},
bo:{
"^":"bq;",
gj:function(a){return a.length},
$isbi:1,
$isbh:1},
bp:{
"^":"cj;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
return a[b]},
v:function(a,b,c){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
a[b]=c}},
ch:{
"^":"bo+cd;",
$isl:1,
$asl:function(){return[P.b7]},
$iso:1},
cj:{
"^":"ch+c4;"},
T:{
"^":"ck;",
v:function(a,b,c){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.n]},
$iso:1},
ci:{
"^":"bo+cd;",
$isl:1,
$asl:function(){return[P.n]},
$iso:1},
ck:{
"^":"ci+c4;"},
iG:{
"^":"bp;",
$isl:1,
$asl:function(){return[P.b7]},
$iso:1,
"%":"Float32Array"},
iH:{
"^":"bp;",
$isl:1,
$asl:function(){return[P.b7]},
$iso:1,
"%":"Float64Array"},
iI:{
"^":"T;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$iso:1,
"%":"Int16Array"},
iJ:{
"^":"T;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$iso:1,
"%":"Int32Array"},
iK:{
"^":"T;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$iso:1,
"%":"Int8Array"},
iL:{
"^":"T;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$iso:1,
"%":"Uint16Array"},
iM:{
"^":"T;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$iso:1,
"%":"Uint32Array"},
iN:{
"^":"T;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$iso:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
iO:{
"^":"T;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.u(H.q(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$iso:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
hU:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
hA:function(a){var z={}
a.w(0,new P.hB(z))
return z},
hB:{
"^":"c:17;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
jm:[function(){var z,y,x,w
P.ao("--------1-dart hello ( 1 )")
z=P.ca()
y=new E.O(new Float64Array(H.p(16)))
y.X()
x=new F.f8(400,300,1,1,1,0,0,null,"none",null,y,!1)
x.b=[]
x.ch=F.ah(255,238,238,255)
y=new E.O(new Float64Array(H.p(16)))
y.X()
w=new G.ff(null,!1,0,new G.f7(700,500,z),!1,!1,0,null,!1,!1,[y])
P.ao("--------new stage")
w.a=G.fe(400,600)
w.sO(x)
w.eg()
if(!w.b){w.b=!0
w.am()}z=new E.O(new Float64Array(H.p(16)))
z.X()
y=new F.eG(0,0,!1,"none",null,z,!1)
y.b=[]
z.ec(0.3141592653589793)
x.ar(y)
P.ao("--------1-dart hello ( 2 ) ")},"$0","dd",0,0,1],
eG:{
"^":"cA;e,f,r,a,b,c,d",
b2:function(a,b){var z=F.bv(null)
if(this.r)z.a=F.ah(170,0,0,255)
else z.a=F.ah(170,255,170,170)
b.b_(a,new F.az(50,50,300,200),z)
z.a=F.ah(255,255,0,0)
b.dP(a,new F.az(this.e-15,this.f-15,30,30),z)},
c8:function(a,b,c,d,e,f,g){this.e=d
this.f=e
this.r=!1
if(50<d&&d<350)if(50<e&&e<250)this.r=!0
return!1}}},1],["","",,F,{
"^":"",
f4:{
"^":"a;"},
cA:{
"^":"a;",
ar:function(a){var z=0,y=new P.c0(),x=1,w,v=this,u,t,s,r
function $async$ar(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.h(new s.A(0,r.j,null),[null])
t=u
t.aG(null)
z=2
return H.a2(u,$async$ar,y)
case 2:t=v
t=t.b
t.push(a)
return H.a2(null,0,y,null)
case 1:return H.a2(w,1,y)}}return H.a2(null,$async$ar,y,null)},
bV:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.bO)(z),++x)z[x].bV(a)},
c7:function(a,b){},
ce:function(a,b){var z,y,x
this.aZ()
this.c7(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.bO)(z),++x)z[x].ce(a,b)},
b2:function(a,b){},
b3:["cG",function(a,b){var z,y,x,w,v,u
this.aZ()
this.b2(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.bO)(z),++w){v=z[w]
u=v.c
x.push(C.c.ga1(x).P(0,u))
b.ax()
v.b3(a,b)
if(0>=x.length)return H.f(x,0)
x.pop()
b.ax()}}],
ef:["a9",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.aZ()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.f(y,w)
v=y[w]
a.a4(v.c)
u=v.ef(a,b,c,d,e)
a.a3()
if(u)return!0}t=a.co().aY(0)
t.e4()
y=new E.X(new Float64Array(H.p(3)))
y.aA(d,e,0)
s=t.P(0,y)
return this.c8(a,b,c,s.gB(s),s.gD(s),d,e)}],
c8:function(a,b,c,d,e,f,g){return!1},
aZ:function(){if(!this.d)this.d=!0}},
f6:{
"^":"a;"},
az:{
"^":"a;a,b,c,d"},
fa:{
"^":"a;a",
i:function(a){return C.t.h(0,this.a)}},
f9:{
"^":"a;a,b,c",
cM:function(a){if(this.a==null)this.a=F.ah(255,255,255,255)},
static:{bv:function(a){var z=new F.f9(a,C.j,1)
z.cM(a)
return z}}},
f5:{
"^":"a;a",
cL:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{ah:function(a,b,c,d){var z=new F.f5(0)
z.cL(a,b,c,d)
return z}}},
f8:{
"^":"cA;e,f,r,x,y,z,Q,ch,a,b,c,d",
c7:function(a,b){var z,y,x,w
z=this.e
y=(a.gbd()-0)/z
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
y.cf(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bg(0,z,z,1)},
b3:function(a,b){var z,y,x
z=new F.az(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.c.ga1(x).P(0,y))
b.ax()
y=b.b
y.push(z)
b.as(a,z)
this.cG(a,b)
if(0>=y.length)return H.f(y,0)
y.pop()
if(y.length>0)b.as(a,C.c.ga1(y))
else{y=a.a
b.as(a,new F.az(0,0,y.c,y.d))}if(0>=x.length)return H.f(x,0)
x.pop()
b.ax()},
b2:function(a,b){var z,y
z=new F.az(0,0,this.e,this.f)
y=F.bv(null)
y.a=this.ch
b.as(a,z)
b.b_(a,z,y)}},
fb:{
"^":"a;",
gO:function(){return this.c$},
sO:function(a){this.c$=a},
bX:function(a){if(!this.e$){this.c$.bV(this)
this.e$=!0}this.c$.ce(this,a)
this.e7()},
a4:function(a){var z=this.f$
z.push(C.c.ga1(z).P(0,a))},
a3:function(){var z=this.f$
if(0>=z.length)return H.f(z,0)
z.pop()},
co:function(){return C.c.ga1(this.f$)}}}],["","",,G,{
"^":"",
cB:function(a,b,c){var z,y,x
z=G.cC(a,35633,b)
y=G.cC(a,35632,c)
x=J.dv(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
cC:function(a,b,c){var z,y
z=J.dw(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
f7:{
"^":"f6;b,c,a"},
ff:{
"^":"eE;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gbd:function(){return this.a.c},
e7:function(){this.e=!0},
am:function(){var z=0,y=new P.c0(),x=1,w,v=this,u,t,s,r,q,p,o,n,m
function $async$am(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:n=H
n=n
m=P
u=n.br(new m.aH(Date.now(),!1))
n=H
n=n
m=P
t=n.br(new m.aH(Date.now(),!1))
case 2:n=v
if(!n.b){z=4
break}n=P
n=n
m=P
z=5
return H.a2(n.ea(new m.at(4e4),null,null),$async$am,y)
case 5:s=Date.now()
n=P
r=new n.aH(s,!1)
if(r.date===void 0)r.date=new Date(s)
else ;q=r.date.getMilliseconds()+0
p=(q-t)/2
s=t-u
n=v
n=n
m=C
m=m.a
n.bX(m.a5(s+p))
n=v
n=n
m=C
m=m.a
n.bX(m.a5(s+p*2))
n=v
n.e=!0
n=v
s=n.gO()
n=v
r=n.a
n=E
o=new n.O(new Float64Array(16))
n=o
n.X()
n=G
o=new n.fc(null,null,null,null,[o],[])
n=o
m=r
n.c=m.a
n=o
n.d=r
n=o
n.e_()
n=o
n.N(0)
n=s
n.b3(v,o)
n=v
n.e=!1
case 3:t=q
z=2
break
case 4:return H.a2(null,0,y,null)
case 1:return H.a2(w,1,y)}}return H.a2(null,$async$am,y,null)},
eg:function(){var z,y
z={}
z.a=!1
y=J.dC(this.a.b)
H.h(new W.Z(0,y.a,y.b,W.a1(new G.fg(z,this)),y.c),[H.F(y,0)]).L()
y=J.dI(this.a.b)
H.h(new W.Z(0,y.a,y.b,W.a1(new G.fh(z,this)),y.c),[H.F(y,0)]).L()
y=J.dD(this.a.b)
H.h(new W.Z(0,y.a,y.b,W.a1(new G.fi(z)),y.c),[H.F(y,0)]).L()
y=J.dE(this.a.b)
H.h(new W.Z(0,y.a,y.b,W.a1(new G.fj(z,this)),y.c),[H.F(y,0)]).L()
y=J.dF(this.a.b)
H.h(new W.Z(0,y.a,y.b,W.a1(new G.fk(z,this)),y.c),[H.F(y,0)]).L()
y=J.dG(this.a.b)
H.h(new W.Z(0,y.a,y.b,W.a1(new G.fl(z,this)),y.c),[H.F(y,0)]).L()
y=J.dH(this.a.b)
H.h(new W.Z(0,y.a,y.b,W.a1(new G.fm(z)),y.c),[H.F(y,0)]).L()}},
eE:{
"^":"a+fb;"},
fg:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gO()
x=J.i(a)
w=x.gC(a)
w=w.gB(w)
w.toString
x=x.gC(a)
x=x.gD(x)
x.toString
z.a4(y.c)
y.a9(z,0,"pointerdown",w,x)
z.a3()}},
fh:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gO()
w=J.i(a)
v=w.gC(a)
v=v.gB(v)
v.toString
w=w.gC(a)
w=w.gD(w)
w.toString
y.a4(x.c)
x.a9(y,0,"pointerup",v,w)
y.a3()
z.a=!1}}},
fi:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fj:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gO()
w=J.i(a)
v=w.gC(a)
v=v.gB(v)
v.toString
w=w.gC(a)
w=w.gD(w)
w.toString
y.a4(x.c)
x.a9(y,0,"pointercancel",v,w)
y.a3()
z.a=!1}}},
fk:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gO()
x=J.i(a)
w=x.gC(a)
w=w.gB(w)
w.toString
x=x.gC(a)
x=x.gD(x)
x.toString
z.a4(y.c)
y.a9(z,0,"pointermove",w,x)
z.a3()}}},
fl:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gO()
w=J.i(a)
v=w.gC(a)
v=v.gB(v)
v.toString
w=w.gC(a)
w=w.gD(w)
w.toString
y.a4(x.c)
x.a9(y,0,"pointercancel",v,w)
y.a3()
z.a=!1}}},
fm:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fd:{
"^":"a;a,b,c,d",
cN:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a5(b)
y=C.d.a5(a)
x=document.createElement("canvas",null)
J.dR(x,z)
J.dQ(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.dN(this.b,!0)},
static:{fe:function(a,b){var z=new G.fd(null,null,null,null)
z.cN(a,b)
return z}}},
fc:{
"^":"f4;c,d,e,f,a,b",
e_:function(){var z,y
z=C.c.at(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.c.at(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cB(this.c,z,y)
z=C.c.at(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.c.at(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cB(this.c,z,y)},
N:function(a){J.bT(this.c,2960)
J.dx(this.c,515)
J.dr(this.c,0,0,0,1)
J.ds(this.c,1)
J.dt(this.c,0)
J.bT(this.c,3042)
J.dp(this.c,770,771)
J.dq(this.c,17664)},
b_:function(a,b,c){var z,y,x,w
z=b.a
y=b.b
x=z+b.c
w=y+b.d
this.bS(a,[z,y,0,z,w,0,x,y,0,x,w,0],[0,1,3,2],c.a,c.b,c.c)},
dP:function(a,b,c){var z,y,x,w,v,u,t,s
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
v.push(0)}this.bS(a,v,u,c.a,c.b,c.c)},
bS:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
J.bX(this.c,this.e)
z=this.c
y=J.bR(z)
z.bindBuffer(34962,y)
z.bufferData(34962,new Float32Array(H.aY(b)),35044)
z.bindBuffer(34962,null)
J.bP(this.c,34962,y)
z=this.c
y=J.bR(z)
z.bindBuffer(34963,y)
z.bufferData(34963,new Uint16Array(H.aY(c)),35044)
z.bindBuffer(34963,null)
J.bP(this.c,34963,y)
z=this.c
x=this.e
w=new E.O(new Float64Array(H.p(16)))
w.X()
w=w.cf(0,-1,1,0)
v=this.d
w=w.bg(0,2/v.c,-2/v.d,1).P(0,C.c.ga1(this.a))
z.uniformMatrix4fv(J.b9(z,x,"u_mat"),!1,new Float32Array(H.aY(w.gm())))
x=this.c
z=this.e
v=d.a
x.uniform4fv(J.b9(x,z,"color"),new Float32Array(H.aY([(v>>>16&255)/255,(v>>>8&255)/255,(v>>>0&255)/255,(v>>>24&255)/255])))
v=this.c
v.uniform1f(J.b9(v,this.e,"u_point_size"),f)
u=J.dL(this.c,this.e,"vp")
J.dS(this.c,u,3,5126,!1,0,0)
J.dA(this.c,u)
if(e===C.j)t=6
else{J.dO(this.c,f)
t=2}J.dy(this.c,t,b.length/3|0,5123,0)
J.bX(this.c,null)},
as:function(a,b){var z
J.bQ(this.c,!1,!1,!1,!1)
J.bS(this.c,!1)
J.bV(this.c,7680,7681,7681)
J.bU(this.c,519,1,255)
z=F.bv(null)
z.a=F.ah(255,255,255,255)
this.b_(null,b,z)
J.bQ(this.c,!0,!0,!0,!0)
J.bS(this.c,!0)
J.bV(this.c,7680,7680,7680)
J.bU(this.c,514,1,255)},
ax:function(){}}}],["","",,E,{
"^":"",
O:{
"^":"a;m:a<",
a8:function(a){var z,y
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
i:function(a){return"[0] "+this.al(0).i(0)+"\n[1] "+this.al(1).i(0)+"\n[2] "+this.al(2).i(0)+"\n[3] "+this.al(3).i(0)+"\n"},
gdN:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.f(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=16)return H.f(z,b)
z[b]=c},
al:function(a){var z,y,x
z=new Float64Array(H.p(4))
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
return new E.Y(z)},
aY:function(a){var z=new E.O(new Float64Array(H.p(16)))
z.a8(this)
return z},
P:function(a,b){var z,y,x
if(!!b.$isY){z=new Float64Array(H.p(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.Y(z)}if(!!b.$isX){z=new Float64Array(H.p(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.X(z)}if(4===b.gdN()){z=new Float64Array(H.p(16))
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
return new E.O(z)}throw H.e(P.ba(b))},
k:function(a,b){var z,y
z=new Float64Array(H.p(16))
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
z=J.k(b)
y=!!z.$isY
x=y?b.gbd():1
if(!!z.$isX||y){w=z.gB(b)
v=z.gD(b)
u=z.gej(b)}else{u=d
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
ec:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.cos(H.aZ(a))
y=Math.sin(H.aZ(a))
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
bg:function(a,b,c,d){var z,y,x,w,v,u
z=J.k(b)
y=!!z.$isY
x=y?b.gbd():1
if(!!z.$isX||y){w=z.gB(b)
v=z.gD(b)
u=z.gej(b)}else{u=d
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
e4:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
X:{
"^":"a;m:a<",
aA:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
a8:function(a){var z,y
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
w=new E.X(new Float64Array(H.p(3)))
w.aA(y,x,z)
return w},
P:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.L(b)
x=z[1]
z=z[2]
w=new E.X(new Float64Array(H.p(3)))
w.aA(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.f(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=3)return H.f(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.aZ(y*y+x*x+z*z))},
aY:function(a){var z=new E.X(new Float64Array(H.p(3)))
z.a8(this)
return z},
gB:function(a){return this.a[0]},
gD:function(a){return this.a[1]}},
Y:{
"^":"a;m:a<",
bi:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
a8:function(a){var z,y
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
v=new E.Y(new Float64Array(H.p(4)))
v.bi(y,x,w,z)
return v},
P:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.L(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.Y(new Float64Array(H.p(4)))
v.bi(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.f(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=4)return H.f(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.aZ(y*y+x*x+w*w+z*z))},
aY:function(a){var z=new E.Y(new Float64Array(H.p(4)))
z.a8(this)
return z},
gB:function(a){return this.a[0]},
gD:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.k=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.c8.prototype
return J.er.prototype}if(typeof a=="string")return J.aK.prototype
if(a==null)return J.es.prototype
if(typeof a=="boolean")return J.eq.prototype
if(a.constructor==Array)return J.aw.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b2(a)}
J.K=function(a){if(typeof a=="string")return J.aK.prototype
if(a==null)return a
if(a.constructor==Array)return J.aw.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b2(a)}
J.aE=function(a){if(a==null)return a
if(a.constructor==Array)return J.aw.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b2(a)}
J.d9=function(a){if(typeof a=="number")return J.ax.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bw.prototype
return a}
J.hC=function(a){if(typeof a=="number")return J.ax.prototype
if(typeof a=="string")return J.aK.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bw.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b2(a)}
J.ap=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.hC(a).k(a,b)}
J.a3=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.k(a).l(a,b)}
J.dk=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.d9(a).ay(a,b)}
J.dl=function(a,b){if(a.constructor==Array||typeof a=="string"||H.hQ(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.K(a).h(a,b)}
J.dm=function(a,b,c,d){return J.i(a).cR(a,b,c,d)}
J.dn=function(a,b,c,d){return J.i(a).df(a,b,c,d)}
J.bP=function(a,b,c){return J.i(a).dl(a,b,c)}
J.dp=function(a,b,c){return J.i(a).dn(a,b,c)}
J.dq=function(a,b){return J.aE(a).ds(a,b)}
J.dr=function(a,b,c,d,e){return J.i(a).dt(a,b,c,d,e)}
J.ds=function(a,b){return J.i(a).du(a,b)}
J.dt=function(a,b){return J.i(a).dv(a,b)}
J.bQ=function(a,b,c,d,e){return J.i(a).dz(a,b,c,d,e)}
J.du=function(a,b){return J.i(a).bQ(a,b)}
J.bR=function(a){return J.i(a).dD(a)}
J.dv=function(a){return J.i(a).dE(a)}
J.dw=function(a,b){return J.i(a).dF(a,b)}
J.dx=function(a,b){return J.i(a).dG(a,b)}
J.bS=function(a,b){return J.i(a).dH(a,b)}
J.dy=function(a,b,c,d,e){return J.i(a).dO(a,b,c,d,e)}
J.dz=function(a,b){return J.aE(a).U(a,b)}
J.bT=function(a,b){return J.i(a).dQ(a,b)}
J.dA=function(a,b){return J.i(a).dR(a,b)}
J.dB=function(a,b){return J.aE(a).w(a,b)}
J.M=function(a){return J.i(a).gad(a)}
J.w=function(a){return J.k(a).gp(a)}
J.b8=function(a){return J.aE(a).gA(a)}
J.aq=function(a){return J.K(a).gj(a)}
J.dC=function(a){return J.i(a).gc0(a)}
J.dD=function(a){return J.i(a).gc1(a)}
J.dE=function(a){return J.i(a).gc2(a)}
J.dF=function(a){return J.i(a).gc3(a)}
J.dG=function(a){return J.i(a).gc4(a)}
J.dH=function(a){return J.i(a).gc5(a)}
J.dI=function(a){return J.i(a).gc6(a)}
J.dJ=function(a){return J.i(a).gbc(a)}
J.dK=function(a){return J.i(a).gB(a)}
J.dL=function(a,b,c){return J.i(a).ck(a,b,c)}
J.dM=function(a){return J.i(a).cl(a)}
J.dN=function(a,b){return J.i(a).cm(a,b)}
J.b9=function(a,b,c){return J.i(a).cp(a,b,c)}
J.dO=function(a,b){return J.i(a).bY(a,b)}
J.dP=function(a,b){return J.aE(a).a2(a,b)}
J.dQ=function(a,b){return J.i(a).st(a,b)}
J.dR=function(a,b){return J.i(a).su(a,b)}
J.bU=function(a,b,c,d){return J.i(a).cB(a,b,c,d)}
J.bV=function(a,b,c,d){return J.i(a).cC(a,b,c,d)}
J.bW=function(a){return J.d9(a).a5(a)}
J.ar=function(a){return J.k(a).i(a)}
J.bX=function(a,b){return J.i(a).eh(a,b)}
J.dS=function(a,b,c,d,e,f,g){return J.i(a).ei(a,b,c,d,e,f,g)}
var $=I.p
C.c=J.aw.prototype
C.d=J.c8.prototype
C.a=J.ax.prototype
C.e=J.aK.prototype
C.u=J.eF.prototype
C.v=J.bw.prototype
C.k=new H.c1()
C.l=new P.fD()
C.b=new P.h9()
C.f=new P.at(0)
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
C.t=new H.ec([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.j=new F.fa(0)
$.cn="$cachedFunction"
$.co="$cachedInvocation"
$.I=0
$.ae=null
$.bY=null
$.bJ=null
$.d3=null
$.df=null
$.b0=null
$.b3=null
$.bK=null
$.a9=null
$.ak=null
$.al=null
$.bE=!1
$.j=C.b
$.c3=0
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
I.$lazy(y,x,w)}})(["c6","$get$c6",function(){return H.el()},"c7","$get$c7",function(){return new P.e9(null)},"cD","$get$cD",function(){return H.J(H.aU({toString:function(){return"$receiver$"}}))},"cE","$get$cE",function(){return H.J(H.aU({$method$:null,toString:function(){return"$receiver$"}}))},"cF","$get$cF",function(){return H.J(H.aU(null))},"cG","$get$cG",function(){return H.J(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cK","$get$cK",function(){return H.J(H.aU(void 0))},"cL","$get$cL",function(){return H.J(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cI","$get$cI",function(){return H.J(H.cJ(null))},"cH","$get$cH",function(){return H.J(function(){try{null.$method$}catch(z){return z.message}}())},"cN","$get$cN",function(){return H.J(H.cJ(void 0))},"cM","$get$cM",function(){return H.J(function(){try{(void 0).$method$}catch(z){return z.message}}())},"by","$get$by",function(){return P.fr()},"am","$get$am",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bn]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.V]},{func:1,args:[,],opt:[,]},{func:1,ret:P.R,args:[P.n]},{func:1,args:[,P.R]},{func:1,args:[P.R]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.V]},{func:1,ret:P.bG},{func:1,void:true,args:[P.a],opt:[P.V]},{func:1,void:true,args:[,P.V]},{func:1,args:[,,]},{func:1,args:[P.cw,,]},{func:1,args:[P.R,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.hX(d||a)
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
Isolate.b1=a.b1
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dh(F.dd(),b)},[])
else (function(b){H.dh(F.dd(),b)})([])})})()