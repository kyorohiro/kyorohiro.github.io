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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bP"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bP"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bP(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b5=function(){}
var dart=[["","",,H,{
"^":"",
j9:{
"^":"a;a"}}],["","",,J,{
"^":"",
k:function(a){return void 0},
b9:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b6:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bS==null){H.ig()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.bB("Return interceptor for "+H.b(y(a,z))))}w=H.iq(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.w
else return C.y}return w},
e:{
"^":"a;",
l:function(a,b){return a===b},
gp:function(a){return H.Z(a)},
i:["cK",function(a){return H.aU(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLUniformLocation"},
eO:{
"^":"e;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$isbO:1},
eQ:{
"^":"e;",
l:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
ch:{
"^":"e;",
gp:function(a){return 0},
$iseR:1},
f7:{
"^":"ch;"},
bC:{
"^":"ch;",
i:function(a){return String(a)}},
aA:{
"^":"e;",
bV:function(a,b){if(!!a.immutable$list)throw H.d(new P.J(b))},
dD:function(a,b){if(!!a.fixed$length)throw H.d(new P.J(b))},
w:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.E(a))}},
a4:function(a,b){return H.f(new H.br(a,b),[null,null])},
av:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
W:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
ge0:function(a){if(a.length>0)return a[0]
throw H.d(H.bk())},
ga3:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.bk())},
bn:function(a,b,c,d,e){var z,y,x
this.bV(a,"set range")
P.cz(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.d(H.eL())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aO(a,"[","]")},
gA:function(a){return new J.e7(a,a.length,0,null)},
gp:function(a){return H.Z(a)},
gj:function(a){return a.length},
sj:function(a,b){this.dD(a,"set length")
if(b<0)throw H.d(P.aV(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.r(a,b))
if(b>=a.length||b<0)throw H.d(H.r(a,b))
return a[b]},
q:function(a,b,c){this.bV(a,"indexed set")
if(b>=a.length||!1)throw H.d(H.r(a,b))
a[b]=c},
$isbl:1,
$isl:1,
$asl:null,
$isp:1,
static:{eN:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.d(P.av("Length must be a non-negative integer: "+H.b(a)))
z=H.f(new Array(a),[b])
z.fixed$length=Array
return z}}},
j8:{
"^":"aA;"},
e7:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(new P.E(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aB:{
"^":"e;",
bc:function(a,b){return a%b},
Z:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.J(""+a))},
ay:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.J(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.d(H.af(b))
return a+b},
cO:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.Z(a/b)},
ac:function(a,b){return(a|0)===a?a/b|0:this.Z(a/b)},
bQ:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aC:function(a,b){if(typeof b!=="number")throw H.d(H.af(b))
return a<b},
$isaK:1},
cg:{
"^":"aB;",
$isaK:1,
$ism:1},
eP:{
"^":"aB;",
$isaK:1},
aP:{
"^":"e;",
dI:function(a,b){if(b>=a.length)throw H.d(H.r(a,b))
return a.charCodeAt(b)},
k:function(a,b){if(typeof b!=="string")throw H.d(P.e6(b,null,null))
return a+b},
cJ:function(a,b,c){H.dd(b)
if(c==null)c=a.length
H.dd(c)
if(b<0)throw H.d(P.aW(b,null,null))
if(typeof c!=="number")return H.L(c)
if(b>c)throw H.d(P.aW(b,null,null))
if(c>a.length)throw H.d(P.aW(c,null,null))
return a.substring(b,c)},
cI:function(a,b){return this.cJ(a,b,null)},
gJ:function(a){return a.length===0},
i:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.r(a,b))
if(b>=a.length||b<0)throw H.d(H.r(a,b))
return a[b]},
$isbl:1,
$isV:1}}],["","",,H,{
"^":"",
aH:function(a,b){var z=a.ag(b)
if(!init.globalState.d.cy)init.globalState.f.ak()
return z},
b8:function(){--init.globalState.f.b},
ds:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.k(y).$isl)throw H.d(P.av("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hu(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$ce()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.h7(P.bp(null,H.aG),0)
y.z=P.aQ(null,null,null,P.m,H.bJ)
y.ch=P.aQ(null,null,null,P.m,null)
if(y.x===!0){x=new H.ht()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eE,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hv)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aQ(null,null,null,P.m,H.aX)
w=P.aj(null,null,null,P.m)
v=new H.aX(0,null,!1)
u=new H.bJ(y,x,w,init.createNewIsolate(),v,new H.a8(H.ba()),new H.a8(H.ba()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
w.a2(0,0)
u.bq(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aJ()
x=H.ag(y,[y]).U(a)
if(x)u.ag(new H.it(z,a))
else{y=H.ag(y,[y,y]).U(a)
if(y)u.ag(new H.iu(z,a))
else u.ag(a)}init.globalState.f.ak()},
eI:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eJ()
return},
eJ:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.J("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.J("Cannot extract URI from \""+H.b(z)+"\""))},
eE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b_(!0,[]).V(b.data)
y=J.K(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b_(!0,[]).V(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b_(!0,[]).V(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aQ(null,null,null,P.m,H.aX)
p=P.aj(null,null,null,P.m)
o=new H.aX(0,null,!1)
n=new H.bJ(y,q,p,init.createNewIsolate(),o,new H.a8(H.ba()),new H.a8(H.ba()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
p.a2(0,0)
n.bq(0,o)
init.globalState.f.a.S(new H.aG(n,new H.eF(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ak()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.ah(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.ak()
break
case"close":init.globalState.ch.aj(0,$.$get$cf().h(0,a))
a.terminate()
init.globalState.f.ak()
break
case"log":H.eD(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aa(["command","print","msg",z])
q=new H.ab(!0,P.a9(null,P.m)).G(q)
y.toString
self.postMessage(q)}else P.R(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
eD:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aa(["command","log","msg",a])
x=new H.ab(!0,P.a9(null,P.m)).G(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.y(w)
z=H.u(w)
throw H.d(P.aN(z))}},
eG:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cv=$.cv+("_"+y)
$.cw=$.cw+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.ah(f,["spawned",new H.b1(y,x),w,z.r])
x=new H.eH(a,b,c,d,z)
if(e===!0){z.bT(w,w)
init.globalState.f.a.S(new H.aG(z,x,"start isolate"))}else x.$0()},
hO:function(a){return new H.b_(!0,[]).V(new H.ab(!1,P.a9(null,P.m)).G(a))},
it:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iu:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hu:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hv:function(a){var z=P.aa(["command","print","msg",a])
return new H.ab(!0,P.a9(null,P.m)).G(z)}}},
bJ:{
"^":"a;a,b,c,ef:d<,dL:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bT:function(a,b){if(!this.f.l(0,a))return
if(this.Q.a2(0,b)&&!this.y)this.y=!0
this.aZ()},
el:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.aj(0,a)
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
dv:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.k(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ek:function(a){var z,y,x
if(this.ch==null)return
for(z=J.k(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.x(new P.J("removeRange"))
P.cz(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cD:function(a,b){if(!this.r.l(0,a))return
this.db=b},
e4:function(a,b,c){var z=J.k(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){J.ah(a,c)
return}z=this.cx
if(z==null){z=P.bp(null,null)
this.cx=z}z.S(new H.ho(a,c))},
e2:function(a,b){var z
if(!this.r.l(0,a))return
z=J.k(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){this.b7()
return}z=this.cx
if(z==null){z=P.bp(null,null)
this.cx=z}z.S(this.geg())},
e5:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.R(a)
if(b!=null)P.R(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.au(a)
y[1]=b==null?null:J.au(b)
for(x=new P.ci(z,z.r,null,null),x.c=z.e;x.n();)J.ah(x.d,y)},
ag:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.y(u)
w=t
v=H.u(u)
this.e5(w,v)
if(this.db===!0){this.b7()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gef()
if(this.cx!=null)for(;t=this.cx,!t.gJ(t);)this.cx.ce().$0()}return y},
c4:function(a){return this.b.h(0,a)},
bq:function(a,b){var z=this.b
if(z.bX(a))throw H.d(P.aN("Registry: ports must be registered only once."))
z.q(0,a,b)},
aZ:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.q(0,this.a,this)
else this.b7()},
b7:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.O(0)
for(z=this.b,y=z.gcm(z),y=y.gA(y);y.n();)y.gt().d1()
z.O(0)
this.c.O(0)
init.globalState.z.aj(0,this.a)
this.dx.O(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
J.ah(w,z[v])}this.ch=null}},"$0","geg",0,0,1]},
ho:{
"^":"c:1;a,b",
$0:function(){J.ah(this.a,this.b)}},
h7:{
"^":"a;a,b",
dS:function(){var z=this.a
if(z.b===z.c)return
return z.ce()},
cj:function(){var z,y,x
z=this.dS()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bX(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gJ(y)}else y=!1
else y=!1
else y=!1
if(y)H.x(P.aN("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gJ(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aa(["command","close"])
x=new H.ab(!0,P.a9(null,P.m)).G(x)
y.toString
self.postMessage(x)}return!1}z.ej()
return!0},
bK:function(){if(self.window!=null)new H.h8(this).$0()
else for(;this.cj(););},
ak:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bK()
else try{this.bK()}catch(x){w=H.y(x)
z=w
y=H.u(x)
w=init.globalState.Q
v=P.aa(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.ab(!0,P.a9(null,P.m)).G(v)
w.toString
self.postMessage(v)}}},
h8:{
"^":"c:1;a",
$0:function(){if(!this.a.cj())return
P.cH(C.i,this)}},
aG:{
"^":"a;a,b,c",
ej:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ag(this.b)}},
ht:{
"^":"a;"},
eF:{
"^":"c:0;a,b,c,d,e,f",
$0:function(){H.eG(this.a,this.b,this.c,this.d,this.e,this.f)}},
eH:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aJ()
w=H.ag(x,[x,x]).U(y)
if(w)y.$2(this.b,this.c)
else{x=H.ag(x,[x]).U(y)
if(x)y.$1(this.b)
else y.$0()}}z.aZ()}},
cX:{
"^":"a;"},
b1:{
"^":"cX;b,a",
aE:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbC())return
x=H.hO(b)
if(z.gdL()===y){y=J.K(x)
switch(y.h(x,0)){case"pause":z.bT(y.h(x,1),y.h(x,2))
break
case"resume":z.el(y.h(x,1))
break
case"add-ondone":z.dv(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.ek(y.h(x,1))
break
case"set-errors-fatal":z.cD(y.h(x,1),y.h(x,2))
break
case"ping":z.e4(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.e2(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a2(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aj(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(b)
y.a.S(new H.aG(z,new H.hx(this,x),w))},
l:function(a,b){if(b==null)return!1
return b instanceof H.b1&&J.a6(this.b,b.b)},
gp:function(a){return this.b.gaU()}},
hx:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbC())z.cY(this.b)}},
bL:{
"^":"cX;b,c,a",
aE:function(a,b){var z,y,x
z=P.aa(["command","message","port",this,"msg",b])
y=new H.ab(!0,P.a9(null,P.m)).G(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
l:function(a,b){if(b==null)return!1
return b instanceof H.bL&&J.a6(this.b,b.b)&&J.a6(this.a,b.a)&&J.a6(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cE()
y=this.a
if(typeof y!=="number")return y.cE()
x=this.c
if(typeof x!=="number")return H.L(x)
return(z<<16^y<<8^x)>>>0}},
aX:{
"^":"a;aU:a<,b,bC:c<",
d1:function(){this.c=!0
this.b=null},
cY:function(a){if(this.c)return
this.dd(a)},
dd:function(a){return this.b.$1(a)},
$isf8:1},
fs:{
"^":"a;a,b,c",
cS:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.S(new H.aG(y,new H.fu(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a5(new H.fv(this,b),0),a)}else throw H.d(new P.J("Timer greater than 0."))},
static:{ft:function(a,b){var z=new H.fs(!0,!1,null)
z.cS(a,b)
return z}}},
fu:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fv:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
H.b8()
this.b.$0()}},
a8:{
"^":"a;aU:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.ex()
z=C.a.bQ(z,0)^C.a.ac(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
l:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a8){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ab:{
"^":"a;a,b",
G:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.gj(z))
z=J.k(a)
if(!!z.$iscn)return["buffer",a]
if(!!z.$isbv)return["typed",a]
if(!!z.$isbl)return this.cz(a)
if(!!z.$iseC){x=this.gcu()
w=a.gc0()
w=H.aS(w,x,H.F(w,"H",0),null)
w=P.bq(w,!0,H.F(w,"H",0))
z=z.gcm(a)
z=H.aS(z,x,H.F(z,"H",0),null)
return["map",w,P.bq(z,!0,H.F(z,"H",0))]}if(!!z.$iseR)return this.cA(a)
if(!!z.$ise)this.cl(a)
if(!!z.$isf8)this.al(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb1)return this.cB(a)
if(!!z.$isbL)return this.cC(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.al(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa8)return["capability",a.a]
if(!(a instanceof P.a))this.cl(a)
return["dart",init.classIdExtractor(a),this.cw(init.classFieldsExtractor(a))]},"$1","gcu",2,0,2],
al:function(a,b){throw H.d(new P.J(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cl:function(a){return this.al(a,null)},
cz:function(a){var z=this.cv(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.al(a,"Can't serialize indexable: ")},
cv:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.G(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cw:function(a){var z
for(z=0;z<a.length;++z)C.c.q(a,z,this.G(a[z]))
return a},
cA:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.al(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.G(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cC:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cB:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaU()]
return["raw sendport",a]}},
b_:{
"^":"a;a,b",
V:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.av("Bad serialized message: "+H.b(a)))
switch(C.c.ge0(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
case"map":return this.dV(a)
case"sendport":return this.dW(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dU(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.a8(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ae(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.b(a))}},"$1","gdT",2,0,2],
ae:function(a){var z,y,x
z=J.K(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.L(x)
if(!(y<x))break
z.q(a,y,this.V(z.h(a,y)));++y}return a},
dV:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.bo()
this.b.push(w)
y=J.e0(y,this.gdT()).bf(0)
for(z=J.K(y),v=J.K(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.q(0,y[u],this.V(v.h(x,u)))}return w},
dW:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.a6(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c4(w)
if(u==null)return
t=new H.b1(u,x)}else t=new H.bL(y,w,x)
this.b.push(t)
return t},
dU:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.K(y)
v=J.K(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.L(t)
if(!(u<t))break
w[z.h(y,u)]=this.V(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
ej:function(){throw H.d(new P.J("Cannot modify unmodifiable Map"))},
ia:function(a){return init.types[a]},
ip:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.k(a).$isbm},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.au(a)
if(typeof z!=="string")throw H.d(H.af(a))
return z},
Z:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cx:function(a){var z,y
z=C.j(J.k(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.f.dI(z,0)===36)z=C.f.cI(z,1)
return(z+H.dk(H.bQ(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aU:function(a){return"Instance of '"+H.cx(a)+"'"},
B:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cu:function(a){return a.b?H.B(a).getUTCMilliseconds()+0:H.B(a).getMilliseconds()+0},
aT:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.af(a))
return a[b]},
bw:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.af(a))
a[b]=c},
L:function(a){throw H.d(H.af(a))},
h:function(a,b){if(a==null)J.at(a)
throw H.d(H.r(a,b))},
r:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a7(!0,b,"index",null)
z=J.at(a)
if(!(b<0)){if(typeof z!=="number")return H.L(z)
y=b>=z}else y=!0
if(y)return P.cd(b,a,"index",null,z)
return P.aW(b,"index",null)},
af:function(a){return new P.a7(!0,a,null,null)},
de:function(a){return a},
dd:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.af(a))
return a},
d:function(a){var z
if(a==null)a=new P.ct()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.du})
z.name=""}else z.toString=H.du
return z},
du:function(){return J.au(this.dartException)},
x:function(a){throw H.d(a)},
bb:function(a){throw H.d(new P.E(a))},
y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iw(a)
if(a==null)return
if(a instanceof H.bj)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bQ(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bn(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cs(v,null))}}if(a instanceof TypeError){u=$.$get$cL()
t=$.$get$cM()
s=$.$get$cN()
r=$.$get$cO()
q=$.$get$cS()
p=$.$get$cT()
o=$.$get$cQ()
$.$get$cP()
n=$.$get$cV()
m=$.$get$cU()
l=u.L(y)
if(l!=null)return z.$1(H.bn(y,l))
else{l=t.L(y)
if(l!=null){l.method="call"
return z.$1(H.bn(y,l))}else{l=s.L(y)
if(l==null){l=r.L(y)
if(l==null){l=q.L(y)
if(l==null){l=p.L(y)
if(l==null){l=o.L(y)
if(l==null){l=r.L(y)
if(l==null){l=n.L(y)
if(l==null){l=m.L(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cs(y,l==null?null:l.method))}}return z.$1(new H.fT(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cC()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cC()
return a},
u:function(a){var z
if(a instanceof H.bj)return a.b
if(a==null)return new H.d1(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d1(a,null)},
is:function(a){if(a==null||typeof a!='object')return J.z(a)
else return H.Z(a)},
dg:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
ii:function(a,b,c,d,e,f,g){var z=J.k(c)
if(z.l(c,0))return H.aH(b,new H.ij(a))
else if(z.l(c,1))return H.aH(b,new H.ik(a,d))
else if(z.l(c,2))return H.aH(b,new H.il(a,d,e))
else if(z.l(c,3))return H.aH(b,new H.im(a,d,e,f))
else if(z.l(c,4))return H.aH(b,new H.io(a,d,e,f,g))
else throw H.d(P.aN("Unsupported number of arguments for wrapped closure"))},
a5:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ii)
a.$identity=z
return z},
eh:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.k(c).$isl){z.$reflectionInfo=c
x=H.fb(z).r}else x=c
w=d?Object.create(new H.fg().constructor.prototype):Object.create(new H.bf(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.M
$.M=J.as(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.c7(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ia(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.c6:H.bg
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.c7(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ee:function(a,b,c,d){var z=H.bg
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
c7:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eg(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ee(y,!w,z,b)
if(y===0){w=$.ai
if(w==null){w=H.aL("self")
$.ai=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.M
$.M=J.as(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ai
if(v==null){v=H.aL("self")
$.ai=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.M
$.M=J.as(w,1)
return new Function(v+H.b(w)+"}")()},
ef:function(a,b,c,d){var z,y
z=H.bg
y=H.c6
switch(b?-1:a){case 0:throw H.d(new H.fc("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eg:function(a,b){var z,y,x,w,v,u,t,s
z=H.ed()
y=$.c5
if(y==null){y=H.aL("receiver")
$.c5=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ef(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.M
$.M=J.as(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.M
$.M=J.as(u,1)
return new Function(y+H.b(u)+"}")()},
bP:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.k(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.eh(a,b,z,!!d,e,f)},
iv:function(a){throw H.d(new P.el("Cyclic initialization for static "+H.b(a)))},
ag:function(a,b,c){return new H.fd(a,b,c,null)},
aJ:function(){return C.l},
ba:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
o:function(a,b,c){var z
if(b===0){J.dF(c,a)
return}else if(b===1){c.bW(H.y(a),H.u(a))
return}if(!!J.k(a).$isI)z=a
else{z=H.f(new P.t(0,$.j,null),[null])
z.aL(a)}z.aA(H.d9(b,0),new H.hZ(b))
return c.ge1()},
d9:function(a,b){return new H.hW(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
f:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bQ:function(a){if(a==null)return
return a.$builtinTypeInfo},
di:function(a,b){return H.dt(a["$as"+H.b(b)],H.bQ(a))},
F:function(a,b,c){var z=H.di(a,b)
return z==null?null:z[c]},
D:function(a,b){var z=H.bQ(a)
return z==null?null:z[b]},
bV:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dk(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dk:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bx("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.bV(u,c))}return w?"":"<"+H.b(z)+">"},
dt:function(a,b){if(typeof a=="function"){a=H.bT(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bT(a,null,b)}return b},
hY:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.G(a[y],b[y]))return!1
return!0},
b3:function(a,b,c){return H.bT(a,b,H.di(b,c))},
G:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dj(a,b)
if('func' in a)return b.builtin$cls==="eu"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bV(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.bV(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hY(H.dt(v,z),x)},
db:function(a,b,c){var z,y,x,w,v
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
if(!(H.G(v,u)||H.G(u,v)))return!1}return!0},
dj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
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
if(t===s){if(!H.db(x,w,!1))return!1
if(!H.db(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.G(o,n)||H.G(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.G(o,n)||H.G(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.G(o,n)||H.G(n,o)))return!1}}return H.hX(a.named,b.named)},
bT:function(a,b,c){return a.apply(b,c)},
jU:function(a){var z=$.bR
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jT:function(a){return H.Z(a)},
jS:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iq:function(a){var z,y,x,w,v,u
z=$.bR.$1(a)
y=$.b4[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b7[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.da.$2(a,z)
if(z!=null){y=$.b4[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b7[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bU(x)
$.b4[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.b7[z]=x
return x}if(v==="-"){u=H.bU(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dn(a,x)
if(v==="*")throw H.d(new P.bB(z))
if(init.leafTags[z]===true){u=H.bU(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dn(a,x)},
dn:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.b9(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bU:function(a){return J.b9(a,!1,null,!!a.$isbm)},
ir:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.b9(z,!1,null,!!z.$isbm)
else return J.b9(z,c,null,null)},
ig:function(){if(!0===$.bS)return
$.bS=!0
H.ih()},
ih:function(){var z,y,x,w,v,u,t,s
$.b4=Object.create(null)
$.b7=Object.create(null)
H.ib()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dq.$1(v)
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
z=C.r()
z=H.ae(C.o,H.ae(C.u,H.ae(C.k,H.ae(C.k,H.ae(C.t,H.ae(C.p,H.ae(C.q(C.j),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bR=new H.ic(v)
$.da=new H.id(u)
$.dq=new H.ie(t)},
ae:function(a,b){return a(b)||b},
ei:{
"^":"a;",
i:function(a){return P.cm(this)},
q:function(a,b,c){return H.ej()}},
ex:{
"^":"ei;a",
aT:function(){var z=this.$map
if(z==null){z=new H.aC(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dg(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aT().h(0,b)},
w:function(a,b){this.aT().w(0,b)},
gj:function(a){var z=this.aT()
return z.gj(z)}},
fa:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fb:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fa(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fR:{
"^":"a;a,b,c,d,e,f",
L:function(a){var z,y,x
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
static:{O:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fR(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},aZ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},cR:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cs:{
"^":"v;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
eT:{
"^":"v;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bn:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.eT(a,y,z?null:b.receiver)}}},
fT:{
"^":"v;a",
i:function(a){var z=this.a
return C.f.gJ(z)?"Error":"Error: "+z}},
iw:{
"^":"c:2;a",
$1:function(a){if(!!J.k(a).$isv)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
d1:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ij:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
ik:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
il:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
im:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
io:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"a;",
i:function(a){return"Closure '"+H.cx(this)+"'"},
gcn:function(){return this},
gcn:function(){return this}},
cF:{
"^":"c;"},
fg:{
"^":"cF;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bf:{
"^":"cF;a,b,c,d",
l:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bf))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.Z(this.a)
else y=typeof z!=="object"?J.z(z):H.Z(z)
z=H.Z(this.b)
if(typeof y!=="number")return y.ez()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aU(z)},
static:{bg:function(a){return a.a},c6:function(a){return a.c},ed:function(){var z=$.ai
if(z==null){z=H.aL("self")
$.ai=z}return z},aL:function(a){var z,y,x,w,v
z=new H.bf("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fc:{
"^":"v;a",
i:function(a){return"RuntimeError: "+this.a}},
cB:{
"^":"a;"},
fd:{
"^":"cB;a,b,c,d",
U:function(a){var z=this.d8(a)
return z==null?!1:H.dj(z,this.a7())},
d8:function(a){var z=J.k(a)
return"$signature" in z?z.$signature():null},
a7:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.k(y)
if(!!x.$isjC)z.void=true
else if(!x.$isc9)z.ret=y.a7()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cA(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cA(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.df(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a7()}z.named=w}return z},
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
t=H.df(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].a7())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cA:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a7())
return z}}},
c9:{
"^":"cB;",
i:function(a){return"dynamic"},
a7:function(){return}},
bj:{
"^":"a;a,M:b<"},
hZ:{
"^":"c:5;a",
$2:function(a,b){H.d9(this.a,1).$1(new H.bj(a,b))}},
hW:{
"^":"c:2;a,b",
$1:function(a){this.b(this.a,a)}},
aC:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gJ:function(a){return this.a===0},
gc0:function(){return H.f(new H.eY(this),[H.D(this,0)])},
gcm:function(a){return H.aS(this.gc0(),new H.eS(this),H.D(this,0),H.D(this,1))},
bX:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.d4(z,a)}else return this.e9(a)},
e9:function(a){var z=this.d
if(z==null)return!1
return this.ai(this.N(z,this.ah(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.N(z,b)
return y==null?null:y.gX()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.N(x,b)
return y==null?null:y.gX()}else return this.ea(b)},
ea:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.N(z,this.ah(a))
x=this.ai(y,a)
if(x<0)return
return y[x].gX()},
q:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aW()
this.b=z}this.bp(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aW()
this.c=y}this.bp(y,b,c)}else this.ec(b,c)},
ec:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aW()
this.d=z}y=this.ah(a)
x=this.N(z,y)
if(x==null)this.aY(z,y,[this.aX(a,b)])
else{w=this.ai(x,a)
if(w>=0)x[w].sX(b)
else x.push(this.aX(a,b))}},
aj:function(a,b){if(typeof b==="string")return this.bJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bJ(this.c,b)
else return this.eb(b)},
eb:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.N(z,this.ah(a))
x=this.ai(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bR(w)
return w.gX()},
O:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.d(new P.E(this))
z=z.c}},
bp:function(a,b,c){var z=this.N(a,b)
if(z==null)this.aY(a,b,this.aX(b,c))
else z.sX(c)},
bJ:function(a,b){var z
if(a==null)return
z=this.N(a,b)
if(z==null)return
this.bR(z)
this.bw(a,b)
return z.gX()},
aX:function(a,b){var z,y
z=new H.eX(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bR:function(a){var z,y
z=a.gdm()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ah:function(a){return J.z(a)&0x3ffffff},
ai:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a6(a[y].gbZ(),b))return y
return-1},
i:function(a){return P.cm(this)},
N:function(a,b){return a[b]},
aY:function(a,b,c){a[b]=c},
bw:function(a,b){delete a[b]},
d4:function(a,b){return this.N(a,b)!=null},
aW:function(){var z=Object.create(null)
this.aY(z,"<non-identifier-key>",z)
this.bw(z,"<non-identifier-key>")
return z},
$iseC:1},
eS:{
"^":"c:2;a",
$1:function(a){return this.a.h(0,a)}},
eX:{
"^":"a;bZ:a<,X:b@,c,dm:d<"},
eY:{
"^":"H;a",
gj:function(a){return this.a.a},
gA:function(a){var z,y
z=this.a
y=new H.eZ(z,z.r,null,null)
y.c=z.e
return y},
w:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.E(z))
y=y.c}},
$isp:1},
eZ:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.E(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ic:{
"^":"c:2;a",
$1:function(a){return this.a(a)}},
id:{
"^":"c:8;a",
$2:function(a,b){return this.a(a,b)}},
ie:{
"^":"c:9;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bk:function(){return new P.ak("No element")},
eL:function(){return new P.ak("Too few elements")},
fq:function(a){return a.geE()},
aR:{
"^":"H;",
gA:function(a){return new H.cj(this,this.gj(this),0,null)},
w:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.W(0,y))
if(z!==this.gj(this))throw H.d(new P.E(this))}},
a4:function(a,b){return H.f(new H.br(this,b),[null,null])},
bg:function(a,b){var z,y,x
if(b){z=H.f([],[H.F(this,"aR",0)])
C.c.sj(z,this.gj(this))}else z=H.f(Array(this.gj(this)),[H.F(this,"aR",0)])
for(y=0;y<this.gj(this);++y){x=this.W(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bf:function(a){return this.bg(a,!0)},
$isp:1},
cj:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z,y,x,w
z=this.a
y=J.K(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.E(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.W(z,w);++this.c
return!0}},
cl:{
"^":"H;a,b",
gA:function(a){var z=new H.f2(null,J.bd(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.at(this.a)},
$asH:function(a,b){return[b]},
static:{aS:function(a,b,c,d){if(!!J.k(a).$isp)return H.f(new H.ca(a,b),[c,d])
return H.f(new H.cl(a,b),[c,d])}}},
ca:{
"^":"cl;a,b",
$isp:1},
f2:{
"^":"eM;a,b,c",
n:function(){var z=this.b
if(z.n()){this.a=this.aS(z.gt())
return!0}this.a=null
return!1},
gt:function(){return this.a},
aS:function(a){return this.c.$1(a)}},
br:{
"^":"aR;a,b",
gj:function(a){return J.at(this.a)},
W:function(a,b){return this.aS(J.dL(this.a,b))},
aS:function(a){return this.b.$1(a)},
$asaR:function(a,b){return[b]},
$asH:function(a,b){return[b]},
$isp:1},
cc:{
"^":"a;"}}],["","",,H,{
"^":"",
df:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
fU:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.i_()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a5(new P.fW(z),1)).observe(y,{childList:true})
return new P.fV(z,y,x)}else if(self.setImmediate!=null)return P.i0()
return P.i1()},
jE:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a5(new P.fX(a),0))},"$1","i_",2,0,4],
jF:[function(a){++init.globalState.f.b
self.setImmediate(H.a5(new P.fY(a),0))},"$1","i0",2,0,4],
jG:[function(a){P.by(C.i,a)},"$1","i1",2,0,4],
d4:function(a,b){var z=H.aJ()
z=H.ag(z,[z,z]).U(a)
if(z){b.toString
return a}else{b.toString
return a}},
ev:function(a,b,c){var z=new P.t(0,$.j,null)
z.$builtinTypeInfo=[c]
P.cH(a,new P.ew(b,z))
return z},
X:function(a){return H.f(new P.bE(H.f(new P.t(0,$.j,null),[a])),[a])},
hP:function(a,b,c){$.j.toString
a.I(b,c)},
hS:function(){var z,y
for(;z=$.ac,z!=null;){$.ap=null
y=z.c
$.ac=y
if(y==null)$.ao=null
$.j=z.b
z.dC()}},
jR:[function(){$.bM=!0
try{P.hS()}finally{$.j=C.b
$.ap=null
$.bM=!1
if($.ac!=null)$.$get$bF().$1(P.dc())}},"$0","dc",0,0,1],
d8:function(a){if($.ac==null){$.ao=a
$.ac=a
if(!$.bM)$.$get$bF().$1(P.dc())}else{$.ao.c=a
$.ao=a}},
dr:function(a){var z,y
z=$.j
if(C.b===z){P.ad(null,null,C.b,a)
return}z.toString
if(C.b.gb5()===z){P.ad(null,null,z,a)
return}y=$.j
P.ad(null,null,y,y.b_(a,!0))},
jv:function(a,b){var z,y,x
z=H.f(new P.d2(null,null,null,0),[b])
y=z.gdh()
x=z.gdj()
z.a=a.Y(y,!0,z.gdi(),x)
return z},
hU:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.y(u)
z=t
y=H.u(u)
$.j.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.S(x)
w=t
v=x.gM()
c.$2(w,v)}}},
hK:function(a,b,c,d){var z=a.b1()
if(!!J.k(z).$isI)z.bk(new P.hN(b,c,d))
else b.I(c,d)},
hL:function(a,b){return new P.hM(a,b)},
cH:function(a,b){var z=$.j
if(z===C.b){z.toString
return P.by(a,b)}return P.by(a,z.b_(b,!0))},
by:function(a,b){var z=C.d.ac(a.a,1000)
return H.ft(z<0?0:z,b)},
bD:function(a){var z=$.j
$.j=a
return z},
aI:function(a,b,c,d,e){var z,y,x
z=new P.cW(new P.hT(d,e),C.b,null)
y=$.ac
if(y==null){P.d8(z)
$.ap=$.ao}else{x=$.ap
if(x==null){z.c=y
$.ap=z
$.ac=z}else{z.c=x.c
x.c=z
$.ap=z
if(z.c==null)$.ao=z}}},
d5:function(a,b,c,d){var z,y
if($.j===c)return d.$0()
z=P.bD(c)
try{y=d.$0()
return y}finally{$.j=z}},
d7:function(a,b,c,d,e){var z,y
if($.j===c)return d.$1(e)
z=P.bD(c)
try{y=d.$1(e)
return y}finally{$.j=z}},
d6:function(a,b,c,d,e,f){var z,y
if($.j===c)return d.$2(e,f)
z=P.bD(c)
try{y=d.$2(e,f)
return y}finally{$.j=z}},
ad:function(a,b,c,d){var z=C.b!==c
if(z){d=c.b_(d,!(!z||C.b.gb5()===c))
c=C.b}P.d8(new P.cW(d,c,null))},
fW:{
"^":"c:2;a",
$1:function(a){var z,y
H.b8()
z=this.a
y=z.a
z.a=null
y.$0()}},
fV:{
"^":"c:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fX:{
"^":"c:0;a",
$0:function(){H.b8()
this.a.$0()}},
fY:{
"^":"c:0;a",
$0:function(){H.b8()
this.a.$0()}},
hH:{
"^":"W;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hI:function(a,b){if(b!=null)return b
if(!!J.k(a).$isv)return a.gM()
return}}},
I:{
"^":"a;"},
ew:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a_(null)}catch(x){w=H.y(x)
z=w
y=H.u(x)
P.hP(this.b,z,y)}}},
h1:{
"^":"a;e1:a<",
bW:function(a,b){a=a!=null?a:new P.ct()
if(this.a.a!==0)throw H.d(new P.ak("Future already completed"))
$.j.toString
this.I(a,b)},
b3:function(a){return this.bW(a,null)}},
bE:{
"^":"h1;a",
at:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.ak("Future already completed"))
z.aL(b)},
I:function(a,b){this.a.d0(a,b)}},
am:{
"^":"a;bD:a<,em:b>,c,d,e",
ga1:function(){return this.b.b},
gbY:function(){return(this.c&1)!==0},
ge7:function(){return this.c===6},
ge6:function(){return this.c===8},
gdl:function(){return this.d},
gdu:function(){return this.d}},
t:{
"^":"a;ar:a?,a1:b<,c",
gde:function(){return this.a===8},
sdf:function(a){if(a)this.a=2
else this.a=0},
aA:function(a,b){var z,y
z=H.f(new P.t(0,$.j,null),[null])
y=z.b
if(y!==C.b){y.toString
if(b!=null)b=P.d4(b,y)}this.aI(new P.am(null,z,b==null?1:3,a,b))
return z},
ep:function(a){return this.aA(a,null)},
bk:function(a){var z,y
z=$.j
y=new P.t(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.b)z.toString
this.aI(new P.am(null,y,8,a,null))
return y},
aV:function(){if(this.a!==0)throw H.d(new P.ak("Future already completed"))
this.a=1},
gdt:function(){return this.c},
gab:function(){return this.c},
bP:function(a){this.a=4
this.c=a},
bO:function(a){this.a=8
this.c=a},
dr:function(a,b){this.bO(new P.W(a,b))},
aI:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ad(null,null,z,new P.hb(this,a))}else{a.a=this.c
this.c=a}},
aq:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbD()
z.a=y}return y},
a_:function(a){var z,y
z=J.k(a)
if(!!z.$isI)if(!!z.$ist)P.b0(a,this)
else P.bI(a,this)
else{y=this.aq()
this.bP(a)
P.a3(this,y)}},
bv:function(a){var z=this.aq()
this.bP(a)
P.a3(this,z)},
I:[function(a,b){var z=this.aq()
this.bO(new P.W(a,b))
P.a3(this,z)},function(a){return this.I(a,null)},"eA","$2","$1","gaP",2,2,11,0],
aL:function(a){var z
if(a==null);else{z=J.k(a)
if(!!z.$isI){if(!!z.$ist){z=a.a
if(z>=4&&z===8){this.aV()
z=this.b
z.toString
P.ad(null,null,z,new P.hd(this,a))}else P.b0(a,this)}else P.bI(a,this)
return}}this.aV()
z=this.b
z.toString
P.ad(null,null,z,new P.he(this,a))},
d0:function(a,b){var z
this.aV()
z=this.b
z.toString
P.ad(null,null,z,new P.hc(this,a,b))},
$isI:1,
static:{bI:function(a,b){var z,y,x,w
b.sar(2)
try{a.aA(new P.hf(b),new P.hg(b))}catch(x){w=H.y(x)
z=w
y=H.u(x)
P.dr(new P.hh(b,z,y))}},b0:function(a,b){var z
b.a=2
z=new P.am(null,b,0,null,null)
if(a.a>=4)P.a3(a,z)
else a.aI(z)},a3:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gde()
if(b==null){if(w){v=z.a.gab()
y=z.a.ga1()
x=J.S(v)
u=v.gM()
y.toString
P.aI(null,null,y,x,u)}return}for(;b.gbD()!=null;b=t){t=b.a
b.a=null
P.a3(z.a,b)}x.a=!0
s=w?null:z.a.gdt()
x.b=s
x.c=!1
y=!w
if(!y||b.gbY()||b.c===8){r=b.ga1()
if(w){u=z.a.ga1()
u.toString
if(u==null?r!=null:u!==r){u=u.gb5()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gab()
y=z.a.ga1()
x=J.S(v)
u=v.gM()
y.toString
P.aI(null,null,y,x,u)
return}q=$.j
if(q==null?r!=null:q!==r)$.j=r
else q=null
if(y){if(b.gbY())x.a=new P.hj(x,b,s,r).$0()}else new P.hi(z,x,b,r).$0()
if(b.ge6())new P.hk(z,x,w,b,r).$0()
if(q!=null)$.j=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.k(y).$isI}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.t)if(p.a>=4){o.a=2
z.a=p
b=new P.am(null,o,0,null,null)
y=p
continue}else P.b0(p,o)
else P.bI(p,o)
return}}o=b.b
b=o.aq()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hb:{
"^":"c:0;a,b",
$0:function(){P.a3(this.a,this.b)}},
hf:{
"^":"c:2;a",
$1:function(a){this.a.bv(a)}},
hg:{
"^":"c:6;a",
$2:function(a,b){this.a.I(a,b)},
$1:function(a){return this.$2(a,null)}},
hh:{
"^":"c:0;a,b,c",
$0:function(){this.a.I(this.b,this.c)}},
hd:{
"^":"c:0;a,b",
$0:function(){P.b0(this.b,this.a)}},
he:{
"^":"c:0;a,b",
$0:function(){this.a.bv(this.b)}},
hc:{
"^":"c:0;a,b,c",
$0:function(){this.a.I(this.b,this.c)}},
hj:{
"^":"c:12;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.az(this.b.gdl(),this.c)
return!0}catch(x){w=H.y(x)
z=w
y=H.u(x)
this.a.b=new P.W(z,y)
return!1}}},
hi:{
"^":"c:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gab()
y=!0
r=this.c
if(r.ge7()){x=r.d
try{y=this.d.az(x,J.S(z))}catch(q){r=H.y(q)
w=r
v=H.u(q)
r=J.S(z)
p=w
o=(r==null?p==null:r===p)?z:new P.W(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aJ()
p=H.ag(p,[p,p]).U(r)
n=this.d
m=this.b
if(p)m.b=n.en(u,J.S(z),z.gM())
else m.b=n.az(u,J.S(z))}catch(q){r=H.y(q)
t=r
s=H.u(q)
r=J.S(z)
p=t
o=(r==null?p==null:r===p)?z:new P.W(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hk:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cg(this.d.gdu())
z.a=w
v=w}catch(u){z=H.y(u)
y=z
x=H.u(u)
if(this.c){z=J.S(this.a.a.gab())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gab()
else v.b=new P.W(y,x)
v.a=!1
return}if(!!J.k(v).$isI){t=this.d
s=t.gem(t)
s.sdf(!0)
this.b.c=!0
v.aA(new P.hl(this.a,s),new P.hm(z,s))}}},
hl:{
"^":"c:2;a,b",
$1:function(a){P.a3(this.a.a,new P.am(null,this.b,0,null,null))}},
hm:{
"^":"c:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.t)){y=H.f(new P.t(0,$.j,null),[null])
z.a=y
y.dr(a,b)}P.a3(z.a,new P.am(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
cW:{
"^":"a;a,b,c",
dC:function(){return this.a.$0()}},
a0:{
"^":"a;",
a4:function(a,b){return H.f(new P.hw(b,this),[H.F(this,"a0",0),null])},
w:function(a,b){var z,y
z={}
y=H.f(new P.t(0,$.j,null),[null])
z.a=null
z.a=this.Y(new P.fk(z,this,b,y),!0,new P.fl(y),y.gaP())
return y},
gj:function(a){var z,y
z={}
y=H.f(new P.t(0,$.j,null),[P.m])
z.a=0
this.Y(new P.fm(z),!0,new P.fn(z,y),y.gaP())
return y},
bf:function(a){var z,y
z=H.f([],[H.F(this,"a0",0)])
y=H.f(new P.t(0,$.j,null),[[P.l,H.F(this,"a0",0)]])
this.Y(new P.fo(this,z),!0,new P.fp(z,y),y.gaP())
return y}},
fk:{
"^":"c;a,b,c,d",
$1:function(a){P.hU(new P.fi(this.c,a),new P.fj(),P.hL(this.a.a,this.d))},
$signature:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"a0")}},
fi:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fj:{
"^":"c:2;",
$1:function(a){}},
fl:{
"^":"c:0;a",
$0:function(){this.a.a_(null)}},
fm:{
"^":"c:2;a",
$1:function(a){++this.a.a}},
fn:{
"^":"c:0;a,b",
$0:function(){this.b.a_(this.a.a)}},
fo:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"a0")}},
fp:{
"^":"c:0;a,b",
$0:function(){this.b.a_(this.a)}},
fh:{
"^":"a;"},
jK:{
"^":"a;"},
fZ:{
"^":"a;a1:d<,ar:e?",
ba:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bU()
if((z&4)===0&&(this.e&32)===0)this.bA(this.gbF())},
E:function(a){return this.ba(a,null)},
cf:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gJ(z)}else z=!1
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
aK:["cM",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bL(a)
else this.aJ(new P.h4(a,null))}],
aH:["cN",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bN(a,b)
else this.aJ(new P.h6(a,b,null))}],
d_:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bM()
else this.aJ(C.m)},
bG:[function(){},"$0","gbF",0,0,1],
bI:[function(){},"$0","gbH",0,0,1],
bE:function(){return},
aJ:function(a){var z,y
z=this.r
if(z==null){z=new P.hG(null,null,0)
this.r=z}z.a2(0,a)
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
y=new P.h0(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aM()
z=this.f
if(!!J.k(z).$isI)z.bk(y)
else y.$0()}else{y.$0()
this.aN((z&4)!==0)}},
bM:function(){var z,y
z=new P.h_(this)
this.aM()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.k(y).$isI)y.bk(z)
else z.$0()},
bA:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aN((z&4)!==0)},
aN:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gJ(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gJ(z)}else z=!1
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
cW:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.d4(b,z)
this.c=c}},
h0:{
"^":"c:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aJ()
x=H.ag(x,[x,x]).U(y)
w=z.d
v=this.b
u=z.b
if(x)w.eo(u,v,this.c)
else w.be(u,v)
z.e=(z.e&4294967263)>>>0}},
h_:{
"^":"c:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ci(z.c)
z.e=(z.e&4294967263)>>>0}},
cY:{
"^":"a;aw:a@"},
h4:{
"^":"cY;b,a",
bb:function(a){a.bL(this.b)}},
h6:{
"^":"cY;af:b>,M:c<,a",
bb:function(a){a.bN(this.b,this.c)}},
h5:{
"^":"a;",
bb:function(a){a.bM()},
gaw:function(){return},
saw:function(a){throw H.d(new P.ak("No events after a done."))}},
hy:{
"^":"a;ar:a?",
aD:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dr(new P.hz(this,a))
this.a=1},
bU:function(){if(this.a===1)this.a=3}},
hz:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.e3(this.b)}},
hG:{
"^":"hy;b,c,a",
gJ:function(a){return this.c==null},
a2:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saw(b)
this.c=b}},
e3:function(a){var z,y
z=this.b
y=z.gaw()
this.b=y
if(y==null)this.c=null
z.bb(a)}},
d2:{
"^":"a;a,b,c,ar:d?",
br:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eF:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a_(!0)
return}this.a.E(0)
this.c=a
this.d=3},"$1","gdh",2,0,function(){return H.b3(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"d2")}],
dk:[function(a,b){var z
if(this.d===2){z=this.c
this.br(0)
z.I(a,b)
return}this.a.E(0)
this.c=new P.W(a,b)
this.d=4},function(a){return this.dk(a,null)},"eH","$2","$1","gdj",2,2,13,0],
eG:[function(){if(this.d===2){var z=this.c
this.br(0)
z.a_(!1)
return}this.a.E(0)
this.c=null
this.d=5},"$0","gdi",0,0,1]},
hN:{
"^":"c:0;a,b,c",
$0:function(){return this.a.I(this.b,this.c)}},
hM:{
"^":"c:5;a,b",
$2:function(a,b){return P.hK(this.a,this.b,a,b)}},
bH:{
"^":"a0;",
Y:function(a,b,c,d){return this.d5(a,d,c,!0===b)},
c3:function(a,b,c){return this.Y(a,null,b,c)},
d5:function(a,b,c,d){return P.ha(this,a,b,c,d,H.F(this,"bH",0),H.F(this,"bH",1))},
bB:function(a,b){b.aK(a)},
$asa0:function(a,b){return[b]}},
cZ:{
"^":"fZ;x,y,a,b,c,d,e,f,r",
aK:function(a){if((this.e&2)!==0)return
this.cM(a)},
aH:function(a,b){if((this.e&2)!==0)return
this.cN(a,b)},
bG:[function(){var z=this.y
if(z==null)return
z.E(0)},"$0","gbF",0,0,1],
bI:[function(){var z=this.y
if(z==null)return
z.cf()},"$0","gbH",0,0,1],
bE:function(){var z=this.y
if(z!=null){this.y=null
z.b1()}return},
eB:[function(a){this.x.bB(a,this)},"$1","gd9",2,0,function(){return H.b3(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"cZ")}],
eD:[function(a,b){this.aH(a,b)},"$2","gdc",4,0,14],
eC:[function(){this.d_()},"$0","gda",0,0,1],
cX:function(a,b,c,d,e,f,g){var z,y
z=this.gd9()
y=this.gdc()
this.y=this.x.a.c3(z,this.gda(),y)},
static:{ha:function(a,b,c,d,e,f,g){var z=$.j
z=H.f(new P.cZ(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cW(b,c,d,e)
z.cX(a,b,c,d,e,f,g)
return z}}},
hw:{
"^":"bH;b,a",
bB:function(a,b){var z,y,x,w,v
z=null
try{z=this.ds(a)}catch(w){v=H.y(w)
y=v
x=H.u(w)
$.j.toString
b.aH(y,x)
return}b.aK(z)},
ds:function(a){return this.b.$1(a)}},
W:{
"^":"a;af:a>,M:b<",
i:function(a){return H.b(this.a)},
$isv:1},
hJ:{
"^":"a;"},
hT:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.d(new P.hH(z,P.hI(z,this.b)))}},
hB:{
"^":"hJ;",
gb5:function(){return this},
ci:function(a){var z,y,x,w
try{if(C.b===$.j){x=a.$0()
return x}x=P.d5(null,null,this,a)
return x}catch(w){x=H.y(w)
z=x
y=H.u(w)
return P.aI(null,null,this,z,y)}},
be:function(a,b){var z,y,x,w
try{if(C.b===$.j){x=a.$1(b)
return x}x=P.d7(null,null,this,a,b)
return x}catch(w){x=H.y(w)
z=x
y=H.u(w)
return P.aI(null,null,this,z,y)}},
eo:function(a,b,c){var z,y,x,w
try{if(C.b===$.j){x=a.$2(b,c)
return x}x=P.d6(null,null,this,a,b,c)
return x}catch(w){x=H.y(w)
z=x
y=H.u(w)
return P.aI(null,null,this,z,y)}},
b_:function(a,b){if(b)return new P.hC(this,a)
else return new P.hD(this,a)},
dz:function(a,b){if(b)return new P.hE(this,a)
else return new P.hF(this,a)},
h:function(a,b){return},
cg:function(a){if($.j===C.b)return a.$0()
return P.d5(null,null,this,a)},
az:function(a,b){if($.j===C.b)return a.$1(b)
return P.d7(null,null,this,a,b)},
en:function(a,b,c){if($.j===C.b)return a.$2(b,c)
return P.d6(null,null,this,a,b,c)}},
hC:{
"^":"c:0;a,b",
$0:function(){return this.a.ci(this.b)}},
hD:{
"^":"c:0;a,b",
$0:function(){return this.a.cg(this.b)}},
hE:{
"^":"c:2;a,b",
$1:function(a){return this.a.be(this.b,a)}},
hF:{
"^":"c:2;a,b",
$1:function(a){return this.a.az(this.b,a)}}}],["","",,P,{
"^":"",
bo:function(){return H.f(new H.aC(0,null,null,null,null,null,0),[null,null])},
aa:function(a){return H.dg(a,H.f(new H.aC(0,null,null,null,null,null,0),[null,null]))},
eK:function(a,b,c){var z,y
if(P.bN(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aq()
y.push(a)
try{P.hR(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cD(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aO:function(a,b,c){var z,y,x
if(P.bN(a))return b+"..."+c
z=new P.bx(b)
y=$.$get$aq()
y.push(a)
try{x=z
x.a=P.cD(x.ga0(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga0()+c
y=z.ga0()
return y.charCodeAt(0)==0?y:y},
bN:function(a){var z,y
for(z=0;y=$.$get$aq(),z<y.length;++z)if(a===y[z])return!0
return!1},
hR:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
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
aQ:function(a,b,c,d,e){return H.f(new H.aC(0,null,null,null,null,null,0),[d,e])},
a9:function(a,b){return P.hr(a,b)},
aj:function(a,b,c,d){return H.f(new P.hp(0,null,null,null,null,null,0),[d])},
cm:function(a){var z,y,x
z={}
if(P.bN(a))return"{...}"
y=new P.bx("")
try{$.$get$aq().push(a)
x=y
x.a=x.ga0()+"{"
z.a=!0
J.dN(a,new P.f3(z,y))
z=y
z.a=z.ga0()+"}"}finally{z=$.$get$aq()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga0()
return z.charCodeAt(0)==0?z:z},
hq:{
"^":"aC;a,b,c,d,e,f,r",
ah:function(a){return H.is(a)&0x3ffffff},
ai:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbZ()
if(x==null?b==null:x===b)return y}return-1},
static:{hr:function(a,b){return H.f(new P.hq(0,null,null,null,null,null,0),[a,b])}}},
hp:{
"^":"hn;a,b,c,d,e,f,r",
gA:function(a){var z=new P.ci(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dK:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.d3(b)},
d3:function(a){var z=this.d
if(z==null)return!1
return this.ap(z[this.ao(a)],a)>=0},
c4:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dK(0,a)?a:null
else return this.dg(a)},
dg:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ao(a)]
x=this.ap(y,a)
if(x<0)return
return J.dw(y,x).gbx()},
w:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.E(this))
z=z.b}},
a2:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bK()
this.b=z}return this.bs(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bK()
this.c=y}return this.bs(y,b)}else return this.S(b)},
S:function(a){var z,y,x
z=this.d
if(z==null){z=P.bK()
this.d=z}y=this.ao(a)
x=z[y]
if(x==null)z[y]=[this.aO(a)]
else{if(this.ap(x,a)>=0)return!1
x.push(this.aO(a))}return!0},
aj:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bt(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bt(this.c,b)
else return this.dn(b)},
dn:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ao(a)]
x=this.ap(y,a)
if(x<0)return!1
this.bu(y.splice(x,1)[0])
return!0},
O:function(a){if(this.a>0){this.f=null
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
z=new P.f_(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bu:function(a){var z,y
z=a.gd2()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ao:function(a){return J.z(a)&0x3ffffff},
ap:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a6(a[y].gbx(),b))return y
return-1},
$isp:1,
static:{bK:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f_:{
"^":"a;bx:a<,b,d2:c<"},
ci:{
"^":"a;a,b,c,d",
gt:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.E(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hn:{
"^":"fe;"},
ck:{
"^":"a;",
gA:function(a){return new H.cj(a,this.gj(a),0,null)},
W:function(a,b){return this.h(a,b)},
w:function(a,b){var z,y,x,w
z=this.gj(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.h(a,w)
b.$1(a[w])
if(x)throw H.d(new P.E(a))}},
a4:function(a,b){return H.f(new H.br(a,b),[null,null])},
i:function(a){return P.aO(a,"[","]")},
$isl:1,
$asl:null,
$isp:1},
f3:{
"^":"c:15;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
f0:{
"^":"H;a,b,c,d",
gA:function(a){return new P.hs(this,this.c,this.d,this.b,null)},
w:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.x(new P.E(this))}},
gJ:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
O:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aO(this,"{","}")},
ce:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.bk());++this.d
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
if(y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bz();++this.d},
bz:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,[H.D(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.bn(y,0,w,z,x)
C.c.bn(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cR:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$isp:1,
static:{bp:function(a,b){var z=H.f(new P.f0(null,0,0,0),[b])
z.cR(a,b)
return z}}},
hs:{
"^":"a;a,b,c,d,e",
gt:function(){return this.e},
n:function(){var z,y,x
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
ff:{
"^":"a;",
a4:function(a,b){return H.f(new H.ca(this,b),[H.D(this,0),null])},
i:function(a){return P.aO(this,"{","}")},
w:function(a,b){var z
for(z=this.gA(this);z.n();)b.$1(z.d)},
$isp:1},
fe:{
"^":"ff;"}}],["","",,P,{
"^":"",
hV:function(a){return H.fq(a)},
bi:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.au(a)
if(typeof a==="string")return JSON.stringify(a)
return P.es(a)},
es:function(a){var z=J.k(a)
if(!!z.$isc)return z.i(a)
return H.aU(a)},
aN:function(a){return new P.h9(a)},
f1:function(a,b,c){var z=J.eN(a,c)
if(a!==0);return z},
bq:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.bd(a);y.n();)z.push(y.gt())
if(b)return z
z.fixed$length=Array
return z},
R:function(a){var z=H.b(a)
H.dp(z)},
jm:{
"^":"c:16;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.hV(a)}},
bO:{
"^":"a;"},
"+bool":0,
bh:{
"^":"a;a,b",
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.bh))return!1
return this.a===b.a&&this.b===b.b},
gp:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.en(z?H.B(this).getUTCFullYear()+0:H.B(this).getFullYear()+0)
x=P.aw(z?H.B(this).getUTCMonth()+1:H.B(this).getMonth()+1)
w=P.aw(z?H.B(this).getUTCDate()+0:H.B(this).getDate()+0)
v=P.aw(z?H.B(this).getUTCHours()+0:H.B(this).getHours()+0)
u=P.aw(z?H.B(this).getUTCMinutes()+0:H.B(this).getMinutes()+0)
t=P.aw(z?H.B(this).getUTCSeconds()+0:H.B(this).getSeconds()+0)
s=P.eo(H.cu(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
cP:function(a,b){if(Math.abs(a)>864e13)throw H.d(P.av(a))},
static:{em:function(a,b){var z=new P.bh(a,b)
z.cP(a,b)
return z},en:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},eo:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aw:function(a){if(a>=10)return""+a
return"0"+a}}},
bc:{
"^":"aK;"},
"+double":0,
ax:{
"^":"a;a",
k:function(a,b){return new P.ax(C.d.k(this.a,b.gd7()))},
aC:function(a,b){return C.d.aC(this.a,b.gd7())},
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.ax))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.er()
y=this.a
if(y<0)return"-"+new P.ax(-y).i(0)
x=z.$1(C.d.bc(C.d.ac(y,6e7),60))
w=z.$1(C.d.bc(C.d.ac(y,1e6),60))
v=new P.eq().$1(C.d.bc(y,1e6))
return""+C.d.ac(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
eq:{
"^":"c:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
er:{
"^":"c:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
v:{
"^":"a;",
gM:function(){return H.u(this.$thrownJsError)}},
ct:{
"^":"v;",
i:function(a){return"Throw of null."}},
a7:{
"^":"v;a,b,c,d",
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
u=P.bi(this.b)
return w+v+": "+H.b(u)},
static:{av:function(a){return new P.a7(!1,null,null,a)},e6:function(a,b,c){return new P.a7(!0,a,b,c)}}},
cy:{
"^":"a7;e,f,a,b,c,d",
gaR:function(){return"RangeError"},
gaQ:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.ew()
if(typeof z!=="number")return H.L(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
H:function(a){return this.e.$0()},
static:{aW:function(a,b,c){return new P.cy(null,null,!0,a,b,"Value not in range")},aV:function(a,b,c,d,e){return new P.cy(b,c,!0,a,d,"Invalid value")},cz:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.aV(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.aV(b,a,c,"end",f))
return b}}},
eA:{
"^":"a7;e,j:f>,a,b,c,d",
gcF:function(a){return 0},
gaR:function(){return"RangeError"},
gaQ:function(){P.bi(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dv(this.b,0)?": index must not be negative":z},
H:function(a){return this.gcF(this).$0()},
static:{cd:function(a,b,c,d,e){var z=e!=null?e:J.at(b)
return new P.eA(b,z,!0,a,c,"Index out of range")}}},
J:{
"^":"v;a",
i:function(a){return"Unsupported operation: "+this.a}},
bB:{
"^":"v;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
ak:{
"^":"v;a",
i:function(a){return"Bad state: "+this.a}},
E:{
"^":"v;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bi(z))+"."}},
cC:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gM:function(){return},
$isv:1},
el:{
"^":"v;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
h9:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
et:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aT(b,"expando$values")
return z==null?null:H.aT(z,this.by())},
q:function(a,b,c){var z=H.aT(b,"expando$values")
if(z==null){z=new P.a()
H.bw(b,"expando$values",z)}H.bw(z,this.by(),c)},
by:function(){var z,y
z=H.aT(this,"expando$key")
if(z==null){y=$.cb
$.cb=y+1
z="expando$key$"+y
H.bw(this,"expando$key",z)}return z}},
eu:{
"^":"a;"},
m:{
"^":"aK;"},
"+int":0,
H:{
"^":"a;",
a4:function(a,b){return H.aS(this,b,H.F(this,"H",0),null)},
w:function(a,b){var z
for(z=this.gA(this);z.n();)b.$1(z.gt())},
bg:function(a,b){return P.bq(this,b,H.F(this,"H",0))},
bf:function(a){return this.bg(a,!0)},
gj:function(a){var z,y
z=this.gA(this)
for(y=0;z.n();)++y
return y},
W:function(a,b){var z,y,x
if(b<0)H.x(P.aV(b,0,null,"index",null))
for(z=this.gA(this),y=0;z.n();){x=z.gt()
if(b===y)return x;++y}throw H.d(P.cd(b,this,"index",null,y))},
i:function(a){return P.eK(this,"(",")")}},
eM:{
"^":"a;"},
l:{
"^":"a;",
$asl:null,
$isp:1},
"+List":0,
jn:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aK:{
"^":"a;"},
"+num":0,
a:{
"^":";",
l:function(a,b){return this===b},
gp:function(a){return H.Z(this)},
i:function(a){return H.aU(this)}},
a_:{
"^":"a;"},
V:{
"^":"a;"},
"+String":0,
bx:{
"^":"a;a0:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cD:function(a,b,c){var z=J.bd(b)
if(!z.n())return a
if(c.length===0){do a+=H.b(z.gt())
while(z.n())}else{a+=H.b(z.gt())
for(;z.n();)a=a+c+H.b(z.gt())}return a}}},
cE:{
"^":"a;"}}],["","",,W,{
"^":"",
a4:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d_:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
d3:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.h3(a)
if(!!J.k(z).$isA)return z
return}else return a},
hQ:function(a){if(!!J.k(a).$isc8)return a
return P.i4(a,!0)},
Q:function(a){var z=$.j
if(z===C.b)return a
return z.dz(a,!0)},
w:{
"^":"ay;",
$isw:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iz:{
"^":"w;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
iB:{
"^":"w;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
iD:{
"^":"w;",
$isA:1,
$ise:1,
"%":"HTMLBodyElement"},
iE:{
"^":"w;u:height},v:width}",
bl:function(a,b,c){return a.getContext(b,P.i2(c))},
cr:function(a,b,c,d,e,f,g){var z,y
z=P.aa(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bl(a,"webgl",z)
return y==null?this.bl(a,"experimental-webgl",z):y},
cq:function(a,b){return this.cr(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
iF:{
"^":"e;",
c2:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
iH:{
"^":"aD;j:length=",
$ise:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iI:{
"^":"eB;j:length=",
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eB:{
"^":"e+ek;"},
ek:{
"^":"a;"},
c8:{
"^":"aD;",
$isc8:1,
"%":"Document|HTMLDocument|XMLDocument"},
iJ:{
"^":"aD;",
$ise:1,
"%":"DocumentFragment|ShadowRoot"},
iK:{
"^":"e;",
i:function(a){return String(a)},
"%":"DOMException"},
ep:{
"^":"e;b0:bottom=,u:height=,K:left=,bd:right=,a8:top=,v:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gv(a))+" x "+H.b(this.gu(a))},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.k(b)
if(!z.$isU)return!1
y=a.left
x=z.gK(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga8(b)
if(y==null?x==null:y===x){y=this.gv(a)
x=z.gv(b)
if(y==null?x==null:y===x){y=this.gu(a)
z=z.gu(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w
z=J.z(a.left)
y=J.z(a.top)
x=J.z(this.gv(a))
w=J.z(this.gu(a))
return W.d_(W.a4(W.a4(W.a4(W.a4(0,z),y),x),w))},
gbh:function(a){return H.f(new P.T(a.left,a.top),[null])},
$isU:1,
$asU:I.b5,
"%":";DOMRectReadOnly"},
ay:{
"^":"aD;",
gD:function(a){return P.f9(C.a.ay(a.offsetLeft),C.a.ay(a.offsetTop),C.a.ay(a.offsetWidth),C.a.ay(a.offsetHeight),null)},
i:function(a){return a.localName},
cp:function(a){return a.getBoundingClientRect()},
gc5:function(a){return H.f(new W.C(a,"mousedown",!1),[null])},
gc6:function(a){return H.f(new W.C(a,"mouseenter",!1),[null])},
gc7:function(a){return H.f(new W.C(a,"mouseleave",!1),[null])},
gc8:function(a){return H.f(new W.C(a,"mousemove",!1),[null])},
gc9:function(a){return H.f(new W.C(a,"mouseout",!1),[null])},
gca:function(a){return H.f(new W.C(a,"mouseover",!1),[null])},
gcb:function(a){return H.f(new W.C(a,"mouseup",!1),[null])},
$isay:1,
$ise:1,
$isA:1,
"%":";Element"},
iL:{
"^":"w;u:height},v:width}",
"%":"HTMLEmbedElement"},
iM:{
"^":"aM;af:error=",
"%":"ErrorEvent"},
aM:{
"^":"e;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
A:{
"^":"e;",
cZ:function(a,b,c,d){return a.addEventListener(b,H.a5(c,1),d)},
dq:function(a,b,c,d){return a.removeEventListener(b,H.a5(c,1),d)},
$isA:1,
"%":"MediaStream;EventTarget"},
j3:{
"^":"w;j:length=",
"%":"HTMLFormElement"},
ey:{
"^":"ez;",
eI:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
ei:function(a,b,c){return a.open(b,c)},
aE:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
ez:{
"^":"A;",
"%":";XMLHttpRequestEventTarget"},
j4:{
"^":"w;u:height},v:width}",
"%":"HTMLIFrameElement"},
j5:{
"^":"w;u:height},v:width}",
at:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
j7:{
"^":"w;u:height},v:width}",
$isay:1,
$ise:1,
$isA:1,
"%":"HTMLInputElement"},
f4:{
"^":"w;af:error=",
E:function(a){return a.pause()},
"%":"HTMLAudioElement;HTMLMediaElement"},
bs:{
"^":"fS;",
gD:function(a){var z,y
if(!!a.offsetX)return H.f(new P.T(a.offsetX,a.offsetY),[null])
else{if(!J.k(W.d3(a.target)).$isay)throw H.d(new P.J("offsetX is only supported on elements"))
z=W.d3(a.target)
y=H.f(new P.T(a.clientX,a.clientY),[null]).aG(0,J.dV(J.dY(z)))
return H.f(new P.T(J.c2(y.a),J.c2(y.b)),[null])}},
$isbs:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jl:{
"^":"e;",
$ise:1,
"%":"Navigator"},
aD:{
"^":"A;",
i:function(a){var z=a.nodeValue
return z==null?this.cK(a):z},
"%":"Attr;Node"},
jo:{
"^":"w;",
H:function(a){return a.start.$0()},
"%":"HTMLOListElement"},
jp:{
"^":"w;u:height},v:width}",
"%":"HTMLObjectElement"},
aE:{
"^":"aM;",
$isaE:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
jt:{
"^":"w;j:length=",
"%":"HTMLSelectElement"},
ju:{
"^":"aM;af:error=",
"%":"SpeechRecognitionError"},
fS:{
"^":"aM;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
jA:{
"^":"f4;u:height},v:width}",
"%":"HTMLVideoElement"},
jD:{
"^":"A;",
$ise:1,
$isA:1,
"%":"DOMWindow|Window"},
jH:{
"^":"e;b0:bottom=,u:height=,K:left=,bd:right=,a8:top=,v:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.k(b)
if(!z.$isU)return!1
y=a.left
x=z.gK(b)
if(y==null?x==null:y===x){y=a.top
x=z.ga8(b)
if(y==null?x==null:y===x){y=a.width
x=z.gv(b)
if(y==null?x==null:y===x){y=a.height
z=z.gu(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w
z=J.z(a.left)
y=J.z(a.top)
x=J.z(a.width)
w=J.z(a.height)
return W.d_(W.a4(W.a4(W.a4(W.a4(0,z),y),x),w))},
gbh:function(a){return H.f(new P.T(a.left,a.top),[null])},
$isU:1,
$asU:I.b5,
"%":"ClientRect"},
jI:{
"^":"aD;",
$ise:1,
"%":"DocumentType"},
jJ:{
"^":"ep;",
gu:function(a){return a.height},
gv:function(a){return a.width},
"%":"DOMRect"},
jM:{
"^":"w;",
$isA:1,
$ise:1,
"%":"HTMLFrameSetElement"},
bG:{
"^":"a0;a,b,c",
Y:function(a,b,c,d){var z=new W.P(0,this.a,this.b,W.Q(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.C()
return z},
c3:function(a,b,c){return this.Y(a,null,b,c)}},
C:{
"^":"bG;a,b,c"},
P:{
"^":"fh;a,b,c,d,e",
b1:function(){if(this.b==null)return
this.bS()
this.b=null
this.d=null
return},
ba:function(a,b){if(this.b==null)return;++this.a
this.bS()},
E:function(a){return this.ba(a,null)},
cf:function(){if(this.b==null||this.a<=0)return;--this.a
this.C()},
C:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dx(x,this.c,z,this.e)}},
bS:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dy(x,this.c,z,this.e)}}},
h2:{
"^":"a;a",
$isA:1,
$ise:1,
static:{h3:function(a){if(a===window)return a
else return new W.h2(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ix:{
"^":"az;",
$ise:1,
"%":"SVGAElement"},
iy:{
"^":"fr;",
$ise:1,
"%":"SVGAltGlyphElement"},
iA:{
"^":"n;",
$ise:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iN:{
"^":"n;",
$ise:1,
"%":"SVGFEBlendElement"},
iO:{
"^":"n;",
$ise:1,
"%":"SVGFEColorMatrixElement"},
iP:{
"^":"n;",
$ise:1,
"%":"SVGFEComponentTransferElement"},
iQ:{
"^":"n;",
$ise:1,
"%":"SVGFECompositeElement"},
iR:{
"^":"n;",
$ise:1,
"%":"SVGFEConvolveMatrixElement"},
iS:{
"^":"n;",
$ise:1,
"%":"SVGFEDiffuseLightingElement"},
iT:{
"^":"n;",
$ise:1,
"%":"SVGFEDisplacementMapElement"},
iU:{
"^":"n;",
$ise:1,
"%":"SVGFEFloodElement"},
iV:{
"^":"n;",
$ise:1,
"%":"SVGFEGaussianBlurElement"},
iW:{
"^":"n;",
$ise:1,
"%":"SVGFEImageElement"},
iX:{
"^":"n;",
$ise:1,
"%":"SVGFEMergeElement"},
iY:{
"^":"n;",
$ise:1,
"%":"SVGFEMorphologyElement"},
iZ:{
"^":"n;",
$ise:1,
"%":"SVGFEOffsetElement"},
j_:{
"^":"n;",
$ise:1,
"%":"SVGFESpecularLightingElement"},
j0:{
"^":"n;",
$ise:1,
"%":"SVGFETileElement"},
j1:{
"^":"n;",
$ise:1,
"%":"SVGFETurbulenceElement"},
j2:{
"^":"n;",
$ise:1,
"%":"SVGFilterElement"},
az:{
"^":"n;",
$ise:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
j6:{
"^":"az;",
$ise:1,
"%":"SVGImageElement"},
ja:{
"^":"n;",
$ise:1,
"%":"SVGMarkerElement"},
jb:{
"^":"n;",
$ise:1,
"%":"SVGMaskElement"},
jq:{
"^":"n;",
$ise:1,
"%":"SVGPatternElement"},
js:{
"^":"n;",
$ise:1,
"%":"SVGScriptElement"},
n:{
"^":"ay;",
gc5:function(a){return H.f(new W.C(a,"mousedown",!1),[null])},
gc6:function(a){return H.f(new W.C(a,"mouseenter",!1),[null])},
gc7:function(a){return H.f(new W.C(a,"mouseleave",!1),[null])},
gc8:function(a){return H.f(new W.C(a,"mousemove",!1),[null])},
gc9:function(a){return H.f(new W.C(a,"mouseout",!1),[null])},
gca:function(a){return H.f(new W.C(a,"mouseover",!1),[null])},
gcb:function(a){return H.f(new W.C(a,"mouseup",!1),[null])},
$isA:1,
$ise:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jw:{
"^":"az;",
$ise:1,
"%":"SVGSVGElement"},
jx:{
"^":"n;",
$ise:1,
"%":"SVGSymbolElement"},
cG:{
"^":"az;",
"%":";SVGTextContentElement"},
jy:{
"^":"cG;",
$ise:1,
"%":"SVGTextPathElement"},
fr:{
"^":"cG;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jz:{
"^":"az;",
$ise:1,
"%":"SVGUseElement"},
jB:{
"^":"n;",
$ise:1,
"%":"SVGViewElement"},
jL:{
"^":"n;",
$ise:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jN:{
"^":"n;",
$ise:1,
"%":"SVGCursorElement"},
jO:{
"^":"n;",
$ise:1,
"%":"SVGFEDropShadowElement"},
jP:{
"^":"n;",
$ise:1,
"%":"SVGGlyphRefElement"},
jQ:{
"^":"n;",
$ise:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":"",
c4:{
"^":"e;j:length=",
$isa:1,
"%":"AudioBuffer"},
e8:{
"^":"ec;",
"%":"AudioBufferSourceNode"},
iC:{
"^":"A;",
d6:function(a,b,c,d){return a.decodeAudioData(b,H.a5(c,1),H.a5(d,1))},
dP:function(a,b){var z=H.f(new P.bE(H.f(new P.t(0,$.j,null),[P.c4])),[P.c4])
this.d6(a,b,new P.e9(z),new P.ea(z))
return z.a},
"%":"AudioContext|OfflineAudioContext|webkitAudioContext"},
e9:{
"^":"c:2;a",
$1:function(a){this.a.at(0,a)}},
ea:{
"^":"c:2;a",
$1:function(a){var z=this.a
if(a==null)z.b3("")
else z.b3(a)}},
eb:{
"^":"A;",
"%":"AudioDestinationNode;AudioNode"},
ec:{
"^":"eb;",
"%":";AudioSourceNode"}}],["","",,P,{
"^":"",
jr:{
"^":"e;",
dw:function(a,b,c){return a.bindBuffer(b,c)},
dA:function(a,b){return a.blendEquation(b)},
dB:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dE:function(a,b){return a.clear(b)},
dF:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dG:function(a,b){return a.clearDepth(b)},
dH:function(a,b){return a.clearStencil(b)},
dJ:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dM:function(a){return a.createBuffer()},
dN:function(a){return a.createProgram()},
dO:function(a,b){return a.createShader(b)},
dQ:function(a,b){return a.depthFunc(b)},
dR:function(a,b){return a.depthMask(b)},
dY:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
dZ:function(a,b){return a.enable(b)},
e_:function(a,b){return a.enableVertexAttribArray(b)},
co:function(a,b,c){return a.getAttribLocation(b,c)},
ct:function(a,b,c){return a.getUniformLocation(b,c)},
c2:function(a,b){return a.lineWidth(b)},
cG:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cH:function(a,b,c,d){return a.stencilOp(b,c,d)},
es:function(a,b){return a.useProgram(b)},
eu:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iG:{
"^":"a;"}}],["","",,P,{
"^":"",
an:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d0:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
T:{
"^":"a;B:a>,F:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
l:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.T))return!1
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
return P.d0(P.an(P.an(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gB(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gF(b)
if(typeof z!=="number")return z.k()
y=new P.T(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aG:function(a,b){var z,y,x,w
z=this.a
y=J.dW(b)
if(typeof z!=="number")return z.aG()
if(typeof y!=="number")return H.L(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aG()
if(typeof w!=="number")return H.L(w)
w=new P.T(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hA:{
"^":"a;",
gbd:function(a){return this.gK(this)+this.c},
gb0:function(a){return this.ga8(this)+this.d},
i:function(a){return"Rectangle ("+this.gK(this)+", "+this.b+") "+this.c+" x "+this.d},
l:function(a,b){var z,y
if(b==null)return!1
z=J.k(b)
if(!z.$isU)return!1
if(this.gK(this)===z.gK(b)){y=this.b
z=y===z.ga8(b)&&this.a+this.c===z.gbd(b)&&y+this.d===z.gb0(b)}else z=!1
return z},
gp:function(a){var z=this.b
return P.d0(P.an(P.an(P.an(P.an(0,this.gK(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbh:function(a){var z=new P.T(this.gK(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
U:{
"^":"hA;K:a>,a8:b>,v:c>,u:d>",
$asU:null,
static:{f9:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.f(new P.U(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
q:function(a){return a},
b2:function(a){return a},
cn:{
"^":"e;",
$iscn:1,
"%":"ArrayBuffer"},
bv:{
"^":"e;",
$isbv:1,
"%":"DataView;ArrayBufferView;bt|co|cq|bu|cp|cr|Y"},
bt:{
"^":"bv;",
gj:function(a){return a.length},
$isbm:1,
$isbl:1},
bu:{
"^":"cq;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
return a[b]},
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
a[b]=c}},
co:{
"^":"bt+ck;",
$isl:1,
$asl:function(){return[P.bc]},
$isp:1},
cq:{
"^":"co+cc;"},
Y:{
"^":"cr;",
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.m]},
$isp:1},
cp:{
"^":"bt+ck;",
$isl:1,
$asl:function(){return[P.m]},
$isp:1},
cr:{
"^":"cp+cc;"},
jc:{
"^":"bu;",
$isl:1,
$asl:function(){return[P.bc]},
$isp:1,
"%":"Float32Array"},
jd:{
"^":"bu;",
$isl:1,
$asl:function(){return[P.bc]},
$isp:1,
"%":"Float64Array"},
je:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.m]},
$isp:1,
"%":"Int16Array"},
jf:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.m]},
$isp:1,
"%":"Int32Array"},
jg:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.m]},
$isp:1,
"%":"Int8Array"},
jh:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.m]},
$isp:1,
"%":"Uint16Array"},
ji:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.m]},
$isp:1,
"%":"Uint32Array"},
jj:{
"^":"Y;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.m]},
$isp:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jk:{
"^":"Y;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.r(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.m]},
$isp:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dp:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
i2:function(a){var z={}
a.w(0,new P.i3(z))
return z},
i4:function(a,b){var z=[]
return new P.i7(b,new P.i5([],z),new P.i6(z),new P.i8(z)).$1(a)},
i3:{
"^":"c:17;a",
$2:function(a,b){this.a[a]=b}},
i5:{
"^":"c:18;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
i6:{
"^":"c:19;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.h(z,a)
return z[a]}},
i8:{
"^":"c:20;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.h(z,a)
z[a]=b}},
i7:{
"^":"c:2;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.em(a.getTime(),!0)
if(a instanceof RegExp)throw H.d(new P.bB("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.bo()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.bb)(w),++u){t=w[u]
x.q(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.K(a)
s=w.gj(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.L(s)
v=J.ar(x)
r=0
for(;r<s;++r)v.q(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
dl:[function(){var z=0,y=new P.X(),x=1,w,v,u,t,s,r,q,p,o
function $async$dl(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
v=new q.fz(700,500,p.bo())
q=P
q.R("--n--")
q=E
q=q
p=Float64Array
o=H
u=new q.N(new p(o.q(16)))
q=u
q.R()
q=F
u=new q.fC(600,400,1,1,1,0,0,null,"none",null,u,!1)
q=u
q.b=[]
q=u
p=F
q.ch=p.al(255,238,238,255)
q=E
q=q
p=Float64Array
o=H
t=new q.N(new p(o.q(16)))
q=t
q.R()
q=G
s=new q.fJ(null,!1,0,v,!1,!1,0,null,!1,!1,[t])
q=s
p=G
q.a=p.fI(400,600)
q=s
q.sP(u)
q=s
q.er()
q=s
u=q.gP()
q=P
t=q.f1(6,null,null)
q=E
q=q
p=Float64Array
o=H
r=new q.N(new p(o.q(16)))
q=r
q.R()
q=F
r=new q.f6(v,t,"none",null,r,!1)
q=r
q.b=[]
q=r
q.b6()
q=u
q.ad(r)
q=s
q.H(0)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$dl,y,null)},"$0","dm",0,0,0],
eU:{
"^":"bA;e,f,r,a,b,c,d",
ax:function(a,b){var z=F.aY(null)
if(this.f!=null)z.a=F.al(153,0,0,0)
else z.a=F.al(153,255,170,170)
if(this.r||this.f==null)z.b=C.e
else z.b=C.x
b.au(a,new F.aF(0,0,100,200),z)},
ee:function(a,b){if(0<b&&b<200)if(0<a&&a<100){P.R("-t-isIn")
return!0}P.R("--isIn "+H.b(a)+" "+H.b(b))
return!1},
cd:function(a,b,c,d,e,f,g){var z
if((c==="pointerdown"||c==="pointermove")&&this.ee(d,e)){if(!this.r&&this.f!=null){P.R("--surce[1] "+H.b(this.f))
J.e4(this.f)
P.R("--surce[2]")}this.r=!0}else{this.r=!1
z=this.f
if(z!=null)J.e1(z)}return!1},
cQ:function(a,b){this.e.b8(b).ep(new F.eW(this))},
static:{eV:function(a,b){var z=new E.N(new Float64Array(H.q(16)))
z.R()
z=new F.eU(a,null,!1,"none",null,z,!1)
z.b=[]
z.cQ(a,b)
return z}}},
eW:{
"^":"c:21;a",
$1:function(a){this.a.f=a}},
f6:{
"^":"bA;e,f,a,b,c,d",
b6:function(){var z=0,y=new P.X(),x=1,w,v=this,u,t,s,r,q
function $async$b6(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=v
u=q.e,t=0
case 2:if(!(t<6)){z=4
break}s=t+1
q=F
r=q.eV(u,"assets/se_maoudamashii_retro0"+s+".ogg")
q=v
q.ad(r)
q=r
q=q.c
q.bi(0,t*100,150,0)
case 3:t=s
z=2
break
case 4:return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$b6,y,null)},
ax:function(a,b){var z=F.aY(null)
z.a=F.al(255,0,0,0)
z.b=C.e
b.au(a,new F.aF(0,0,600,150),z)}}},1],["","",,F,{
"^":"",
fw:{
"^":"a;"},
bA:{
"^":"a;",
ad:function(a){var z=0,y=new P.X(),x=1,w,v=this,u,t,s
function $async$ad(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.t(0,s.j,null)
u.$builtinTypeInfo=[null]
t=u
t.aL(null)
z=2
return H.o(u,$async$ad,y)
case 2:t=v
t=t.b
t.push(a)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$ad,y,null)},
c_:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.bb)(z),++x)z[x].c_(a)},
cc:function(a,b){},
ck:function(a,b){var z,y,x
this.b4()
this.cc(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.bb)(z),++x)z[x].ck(a,b)},
ax:function(a,b){},
b9:["cL",function(a,b){var z,y,x,w,v,u
this.b4()
this.ax(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.bb)(z),++w){v=z[w]
u=v.c
x.push(C.c.ga3(x).T(0,u))
b.aB()
v.b9(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aB()}}],
eq:["aa",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b4()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.a6(v.c)
u=v.eq(a,b,c,d,e)
a.a5()
if(u)return!0}t=a.cs().b2(0)
t.ed()
y=new E.a1(new Float64Array(H.q(3)))
y.aF(d,e,0)
s=t.T(0,y)
return this.cd(a,b,c,s.gB(s),s.gF(s),d,e)}],
cd:function(a,b,c,d,e,f,g){return!1},
b4:function(){if(!this.d)this.d=!0}},
fy:{
"^":"a;"},
bz:{
"^":"a;"},
aF:{
"^":"a;a,b,c,d"},
cI:{
"^":"a;a",
i:function(a){return C.v.h(0,this.a)}},
fD:{
"^":"a;a,b,c",
cU:function(a){if(this.a==null)this.a=F.al(255,255,255,255)},
static:{aY:function(a){var z=new F.fD(a,C.e,1)
z.cU(a)
return z}}},
fx:{
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
static:{al:function(a,b,c,d){var z=new F.fx(0)
z.cT(a,b,c,d)
return z}}},
fC:{
"^":"bA;e,f,r,x,y,z,Q,ch,a,b,c,d",
cc:function(a,b){var z,y,x,w
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
y=new E.N(new Float64Array(H.q(16)))
y.R()
this.c=y
y.bi(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bm(0,z,z,1)},
b9:function(a,b){var z,y,x
z=new F.aF(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.c.ga3(x).T(0,y))
b.aB()
y=b.b
y.push(z)
b.as(a,z)
this.cL(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.as(a,C.c.ga3(y))
else{y=a.a
b.as(a,new F.aF(0,0,y.c,y.d))}if(0>=x.length)return H.h(x,0)
x.pop()
b.aB()},
ax:function(a,b){var z,y
z=new F.aF(0,0,this.e,this.f)
y=F.aY(null)
y.a=this.ch
b.as(a,z)
b.au(a,z,y)}},
fE:{
"^":"a;",
gP:function(){return this.c$},
sP:function(a){this.c$=a},
c1:function(a){if(!this.e$){this.c$.c_(this)
this.e$=!0}this.c$.ck(this,a)
this.eh()},
a6:function(a){var z=this.f$
z.push(C.c.ga3(z).T(0,a))},
a5:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cs:function(){return C.c.ga3(this.f$)}}}],["","",,G,{
"^":"",
cJ:function(a,b,c){var z,y,x
z=G.cK(a,35633,b)
y=G.cK(a,35632,c)
x=J.dG(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
cK:function(a,b,c){var z,y
z=J.dH(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
fz:{
"^":"fy;b,c,a",
b8:function(a){var z=0,y=new P.X(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
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
u=q.f(new p.bE(o.f(new n.t(0,m.j,null),[null])),[null])
t=new (window.AudioContext||window.webkitAudioContext)()
s=new XMLHttpRequest()
q=C
q=q.n
q.ei(s,"GET",a)
q=s
q.responseType="arraybuffer"
q=P
q.R("---d-1--")
q=H
q=q
p=W
r=q.f(new p.bG(s,"load",!1),[null])
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
m=m.Q(new l.fA(u,t,s))
l=r
p=new p.P(0,o,n,m,l.c)
o=H
q=q.f(p,[o.D(r,0)])
q.C()
q=H
q=q
p=W
r=q.f(new p.bG(s,"error",!1),[null])
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
m=m.Q(new l.fB(u))
l=r
p=new p.P(0,o,n,m,l.c)
o=H
q=q.f(p,[o.D(r,0)])
q.C()
q=s
q.send()
q=u
x=q.a
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$b8,y,null)}},
fA:{
"^":"c:22;a,b,c",
$1:function(a){var z=0,y=new P.X(),x=1,w,v=this,u,t,s,r,q,p,o,n
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t.R("---d-2-")
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
return H.o(q.dI(p,o.hQ(n.response)),$async$$1,y)
case 2:t.at(0,new s.fF(r,c,null))
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$$1,y,null)}},
fB:{
"^":"c:23;a",
$1:function(a){this.a.b3(a)}},
fF:{
"^":"bz;a,b,c",
H:function(a){var z=0,y=new P.X(),x=1,w,v=this,u,t,s,r
function $async$H(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:s=v
z=2
return H.o(s.E(0),$async$H,y)
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
s=u
if(s){z=3
break}else c=s
z=4
break
case 3:s=C
c=s.h
case 4:s=c
s.H(u)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$H,y,null)},
E:function(a){var z=0,y=new P.X(),x=1,w,v=this,u,t
function $async$E(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=v
u=t.c
z=u!=null?2:3
break
case 2:t=u
if(t){z=4
break}else c=t
z=5
break
case 4:t=C
c=t.h
case 5:t=c
t.ey(u)
t=v
t.c=null
case 3:return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$E,y,null)}},
fJ:{
"^":"f5;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gbj:function(){return this.a.c},
eh:function(){this.e=!0},
H:function(a){if(!this.b){this.b=!0
this.an()}},
an:function(){var z=0,y=new P.X(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i
function $async$an(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:k=H
k=k
j=P
u=k.cu(new j.bh(Date.now(),!1))
k=v
t=k.a
k=E
k=k
j=Float64Array
i=H
s=new k.N(new j(i.q(16)))
k=s
k.R()
k=E
k=k
j=Float64Array
i=H
r=new k.N(new j(i.q(16)))
k=r
k.R()
k=G
q=new k.fG(null,null,null,null,s,[r],[])
k=q
j=t
k.c=j.a
k=q
k.d=t
k=q
k.e8()
k=q
k.O(0)
p=0,o=0
case 2:k=v
if(!k.b){z=4
break}k=P
k=k
j=P
z=5
return H.o(k.ev(new j.ax(3e4),null,null),$async$an,y)
case 5:n=Date.now()
m=n-u
t=u+m
k=v
k=k
j=C
j=j.d
k.c1(j.Z(t))
k=v
k=k
j=C
j=j.d
k.c1(j.Z(t))
p+=m
if(m<0);else ;++o
k=v
k.e=!0
z=p>40?6:7
break
case 6:k=q
k.O(0)
k=v
k=k.gP()
k.b9(v,q)
k=v
k.e=!1
case 7:z=o>60?8:9
break
case 8:k=C
k=k.d
l="###fps  "+k.cO(p,o)
k=H
k.dp(l)
p=0
o=0
case 9:case 3:u=n
z=2
break
case 4:return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$an,y,null)},
er:function(){var z,y
z={}
z.a=!1
y=J.dO(this.a.b)
H.f(new W.P(0,y.a,y.b,W.Q(new G.fK(z,this)),y.c),[H.D(y,0)]).C()
y=J.dU(this.a.b)
H.f(new W.P(0,y.a,y.b,W.Q(new G.fL(z,this)),y.c),[H.D(y,0)]).C()
y=J.dP(this.a.b)
H.f(new W.P(0,y.a,y.b,W.Q(new G.fM(z)),y.c),[H.D(y,0)]).C()
y=J.dQ(this.a.b)
H.f(new W.P(0,y.a,y.b,W.Q(new G.fN(z,this)),y.c),[H.D(y,0)]).C()
y=J.dR(this.a.b)
H.f(new W.P(0,y.a,y.b,W.Q(new G.fO(z,this)),y.c),[H.D(y,0)]).C()
y=J.dS(this.a.b)
H.f(new W.P(0,y.a,y.b,W.Q(new G.fP(z,this)),y.c),[H.D(y,0)]).C()
y=J.dT(this.a.b)
H.f(new W.P(0,y.a,y.b,W.Q(new G.fQ(z)),y.c),[H.D(y,0)]).C()}},
f5:{
"^":"a+fE;"},
fK:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gP()
x=J.i(a)
w=x.gD(a)
w=w.gB(w)
w.toString
x=x.gD(a)
x=x.gF(x)
x.toString
z.a6(y.c)
y.aa(z,0,"pointerdown",w,x)
z.a5()}},
fL:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gP()
w=J.i(a)
v=w.gD(a)
v=v.gB(v)
v.toString
w=w.gD(a)
w=w.gF(w)
w.toString
y.a6(x.c)
x.aa(y,0,"pointerup",v,w)
y.a5()
z.a=!1}}},
fM:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fN:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gP()
w=J.i(a)
v=w.gD(a)
v=v.gB(v)
v.toString
w=w.gD(a)
w=w.gF(w)
w.toString
y.a6(x.c)
x.aa(y,0,"pointercancel",v,w)
y.a5()
z.a=!1}}},
fO:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gP()
x=J.i(a)
w=x.gD(a)
w=w.gB(w)
w.toString
x=x.gD(a)
x=x.gF(x)
x.toString
z.a6(y.c)
y.aa(z,0,"pointermove",w,x)
z.a5()}}},
fP:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gP()
w=J.i(a)
v=w.gD(a)
v=v.gB(v)
v.toString
w=w.gD(a)
w=w.gF(w)
w.toString
y.a6(x.c)
x.aa(y,0,"pointercancel",v,w)
y.a5()
z.a=!1}}},
fQ:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fH:{
"^":"a;a,b,c,d",
cV:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.Z(b)
y=C.d.Z(a)
x=document.createElement("canvas",null)
J.e3(x,z)
J.e2(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.dZ(this.b,!0)},
static:{fI:function(a,b){var z=new G.fH(null,null,null,null)
z.cV(a,b)
return z}}},
fG:{
"^":"fw;c,d,e,f,r,a,b",
e8:function(){var z,y
z=C.c.av(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.c.av(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cJ(this.c,z,y)
z=C.c.av(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.c.av(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cJ(this.c,z,y)},
O:function(a){J.c_(this.c,2960)
J.dJ(this.c,515)
J.dC(this.c,0,0,0,1)
J.dD(this.c,1)
J.dE(this.c,0)
J.c_(this.c,3042)
switch(-1){case-1:J.dz(this.c,32774)
J.dA(this.c,770,771,770,32772)
break}J.dB(this.c,17664)},
au:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=b.a
y=b.b
x=z+b.c
w=y+b.d
v=[z,y,0,z,w,0,x,y,0,x,w,0]
u=c.a
t=c.b
s=c.c
J.c3(this.c,this.e)
r=this.c
q=J.bY(r)
r.bindBuffer(34962,q)
r.bufferData(34962,new Float32Array(H.b2(v)),35044)
r.bindBuffer(34962,null)
J.bW(this.c,34962,q)
r=this.c
q=J.bY(r)
r.bindBuffer(34963,q)
r.bufferData(34963,new Uint16Array(H.b2([0,1,3,2])),35044)
r.bindBuffer(34963,null)
J.bW(this.c,34963,q)
r=this.c
p=this.e
this.r.R()
o=this.r.bi(0,-1,1,0)
this.r=o
n=this.d
n=o.bm(0,2/n.c,-2/n.d,1)
this.r=n
n=n.T(0,C.c.ga3(this.a))
this.r=n
r.uniformMatrix4fv(J.be(r,p,"u_mat"),!1,new Float32Array(H.b2(n.gm())))
n=this.c
p=this.e
u=u.a
n.uniform4fv(J.be(n,p,"color"),new Float32Array(H.b2([(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255])))
u=this.c
u.uniform1f(J.be(u,this.e,"u_point_size"),s)
m=J.dX(this.c,this.e,"vp")
J.e5(this.c,m,3,5126,!1,0,0)
J.dM(this.c,m)
if(t===C.e)l=6
else{J.e_(this.c,s)
l=2}J.dK(this.c,l,v.length/3|0,5123,0)
J.c3(this.c,null)},
as:function(a,b){var z
J.bX(this.c,!1,!1,!1,!1)
J.bZ(this.c,!1)
J.c1(this.c,7680,7681,7681)
J.c0(this.c,519,1,255)
z=F.aY(null)
z.a=F.al(255,255,255,255)
this.au(null,b,z)
J.bX(this.c,!0,!0,!0,!0)
J.bZ(this.c,!0)
J.c1(this.c,7680,7680,7680)
J.c0(this.c,514,1,255)},
aB:function(){}}}],["","",,E,{
"^":"",
N:{
"^":"a;m:a<",
a9:function(a){var z,y
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
gdX:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
am:function(a){var z,y,x
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
return new E.a2(z)},
b2:function(a){var z=new E.N(new Float64Array(H.q(16)))
z.a9(this)
return z},
T:function(a,b){var z,y,x
if(!!b.$isa2){z=new Float64Array(H.q(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a2(z)}if(!!b.$isa1){z=new Float64Array(H.q(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.a1(z)}if(4===b.gdX()){z=new Float64Array(H.q(16))
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
return new E.N(z)}throw H.d(P.av(b))},
k:function(a,b){var z,y
z=new Float64Array(H.q(16))
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
return new E.N(z)},
bi:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.k(b)
y=!!z.$isa2
x=y?b.gbj():1
if(!!z.$isa1||y){w=z.gB(b)
v=z.gF(b)
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
z=J.k(b)
y=!!z.$isa2
x=y?b.gbj():1
if(!!z.$isa1||y){w=z.gB(b)
v=z.gF(b)
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
ed:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
a1:{
"^":"a;m:a<",
aF:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
a9:function(a){var z,y
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
w=new E.a1(new Float64Array(H.q(3)))
w.aF(y,x,z)
return w},
T:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.L(b)
x=z[1]
z=z[2]
w=new E.a1(new Float64Array(H.q(3)))
w.aF(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.de(y*y+x*x+z*z))},
b2:function(a){var z=new E.a1(new Float64Array(H.q(3)))
z.a9(this)
return z},
gB:function(a){return this.a[0]},
gF:function(a){return this.a[1]}},
a2:{
"^":"a;m:a<",
bo:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
a9:function(a){var z,y
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
v=new E.a2(new Float64Array(H.q(4)))
v.bo(y,x,w,z)
return v},
T:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.L(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a2(new Float64Array(H.q(4)))
v.bo(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.de(y*y+x*x+w*w+z*z))},
b2:function(a){var z=new E.a2(new Float64Array(H.q(4)))
z.a9(this)
return z},
gB:function(a){return this.a[0]},
gF:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.k=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cg.prototype
return J.eP.prototype}if(typeof a=="string")return J.aP.prototype
if(a==null)return J.eQ.prototype
if(typeof a=="boolean")return J.eO.prototype
if(a.constructor==Array)return J.aA.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b6(a)}
J.K=function(a){if(typeof a=="string")return J.aP.prototype
if(a==null)return a
if(a.constructor==Array)return J.aA.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b6(a)}
J.ar=function(a){if(a==null)return a
if(a.constructor==Array)return J.aA.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b6(a)}
J.dh=function(a){if(typeof a=="number")return J.aB.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bC.prototype
return a}
J.i9=function(a){if(typeof a=="number")return J.aB.prototype
if(typeof a=="string")return J.aP.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bC.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b6(a)}
J.as=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.i9(a).k(a,b)}
J.a6=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.k(a).l(a,b)}
J.dv=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dh(a).aC(a,b)}
J.dw=function(a,b){if(a.constructor==Array||typeof a=="string"||H.ip(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.K(a).h(a,b)}
J.dx=function(a,b,c,d){return J.i(a).cZ(a,b,c,d)}
J.dy=function(a,b,c,d){return J.i(a).dq(a,b,c,d)}
J.bW=function(a,b,c){return J.i(a).dw(a,b,c)}
J.dz=function(a,b){return J.i(a).dA(a,b)}
J.dA=function(a,b,c,d,e){return J.i(a).dB(a,b,c,d,e)}
J.dB=function(a,b){return J.ar(a).dE(a,b)}
J.dC=function(a,b,c,d,e){return J.i(a).dF(a,b,c,d,e)}
J.dD=function(a,b){return J.i(a).dG(a,b)}
J.dE=function(a,b){return J.i(a).dH(a,b)}
J.bX=function(a,b,c,d,e){return J.i(a).dJ(a,b,c,d,e)}
J.dF=function(a,b){return J.i(a).at(a,b)}
J.bY=function(a){return J.i(a).dM(a)}
J.dG=function(a){return J.i(a).dN(a)}
J.dH=function(a,b){return J.i(a).dO(a,b)}
J.dI=function(a,b){return J.i(a).dP(a,b)}
J.dJ=function(a,b){return J.i(a).dQ(a,b)}
J.bZ=function(a,b){return J.i(a).dR(a,b)}
J.dK=function(a,b,c,d,e){return J.i(a).dY(a,b,c,d,e)}
J.dL=function(a,b){return J.ar(a).W(a,b)}
J.c_=function(a,b){return J.i(a).dZ(a,b)}
J.dM=function(a,b){return J.i(a).e_(a,b)}
J.dN=function(a,b){return J.ar(a).w(a,b)}
J.S=function(a){return J.i(a).gaf(a)}
J.z=function(a){return J.k(a).gp(a)}
J.bd=function(a){return J.ar(a).gA(a)}
J.at=function(a){return J.K(a).gj(a)}
J.dO=function(a){return J.i(a).gc5(a)}
J.dP=function(a){return J.i(a).gc6(a)}
J.dQ=function(a){return J.i(a).gc7(a)}
J.dR=function(a){return J.i(a).gc8(a)}
J.dS=function(a){return J.i(a).gc9(a)}
J.dT=function(a){return J.i(a).gca(a)}
J.dU=function(a){return J.i(a).gcb(a)}
J.dV=function(a){return J.i(a).gbh(a)}
J.dW=function(a){return J.i(a).gB(a)}
J.dX=function(a,b,c){return J.i(a).co(a,b,c)}
J.dY=function(a){return J.i(a).cp(a)}
J.dZ=function(a,b){return J.i(a).cq(a,b)}
J.be=function(a,b,c){return J.i(a).ct(a,b,c)}
J.e_=function(a,b){return J.i(a).c2(a,b)}
J.e0=function(a,b){return J.ar(a).a4(a,b)}
J.e1=function(a){return J.i(a).E(a)}
J.ah=function(a,b){return J.i(a).aE(a,b)}
J.e2=function(a,b){return J.i(a).su(a,b)}
J.e3=function(a,b){return J.i(a).sv(a,b)}
J.e4=function(a){return J.i(a).H(a)}
J.c0=function(a,b,c,d){return J.i(a).cG(a,b,c,d)}
J.c1=function(a,b,c,d){return J.i(a).cH(a,b,c,d)}
J.c2=function(a){return J.dh(a).Z(a)}
J.au=function(a){return J.k(a).i(a)}
J.c3=function(a,b){return J.i(a).es(a,b)}
J.e5=function(a,b,c,d,e,f,g){return J.i(a).eu(a,b,c,d,e,f,g)}
var $=I.p
C.h=P.e8.prototype
C.n=W.ey.prototype
C.c=J.aA.prototype
C.d=J.cg.prototype
C.a=J.aB.prototype
C.f=J.aP.prototype
C.w=J.f7.prototype
C.y=J.bC.prototype
C.l=new H.c9()
C.m=new P.h5()
C.b=new P.hB()
C.i=new P.ax(0)
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
C.v=new H.ex([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.cI(0)
C.x=new F.cI(1)
$.cv="$cachedFunction"
$.cw="$cachedInvocation"
$.M=0
$.ai=null
$.c5=null
$.bR=null
$.da=null
$.dq=null
$.b4=null
$.b7=null
$.bS=null
$.ac=null
$.ao=null
$.ap=null
$.bM=!1
$.j=C.b
$.cb=0
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
I.$lazy(y,x,w)}})(["ce","$get$ce",function(){return H.eI()},"cf","$get$cf",function(){return new P.et(null)},"cL","$get$cL",function(){return H.O(H.aZ({toString:function(){return"$receiver$"}}))},"cM","$get$cM",function(){return H.O(H.aZ({$method$:null,toString:function(){return"$receiver$"}}))},"cN","$get$cN",function(){return H.O(H.aZ(null))},"cO","$get$cO",function(){return H.O(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cS","$get$cS",function(){return H.O(H.aZ(void 0))},"cT","$get$cT",function(){return H.O(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cQ","$get$cQ",function(){return H.O(H.cR(null))},"cP","$get$cP",function(){return H.O(function(){try{null.$method$}catch(z){return z.message}}())},"cV","$get$cV",function(){return H.O(H.cR(void 0))},"cU","$get$cU",function(){return H.O(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bF","$get$bF",function(){return P.fU()},"aq","$get$aq",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bs]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.a_]},{func:1,args:[,],opt:[,]},{func:1,ret:P.V,args:[P.m]},{func:1,args:[,P.V]},{func:1,args:[P.V]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.a_]},{func:1,ret:P.bO},{func:1,void:true,args:[P.a],opt:[P.a_]},{func:1,void:true,args:[,P.a_]},{func:1,args:[,,]},{func:1,args:[P.cE,,]},{func:1,args:[P.V,,]},{func:1,ret:P.m,args:[,]},{func:1,args:[P.m]},{func:1,args:[P.m,,]},{func:1,args:[F.bz]},{func:1,ret:P.I,args:[W.aE]},{func:1,args:[W.aE]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iv(d||a)
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
Isolate.b5=a.b5
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