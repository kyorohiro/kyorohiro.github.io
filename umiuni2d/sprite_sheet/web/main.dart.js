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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ish)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cd"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cd"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cd(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bj=function(){}
var dart=[["","",,H,{
"^":"",
jY:{
"^":"b;a"}}],["","",,J,{
"^":"",
m:function(a){return void 0},
bp:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bl:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cf==null){H.j5()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.bZ("Return interceptor for "+H.a(y(a,z))))}w=H.je(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.y
else return C.A}return w},
h:{
"^":"b;",
n:function(a,b){return a===b},
gt:function(a){return H.a0(a)},
i:["d2",function(a){return H.b5(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLTexture|WebGLUniformLocation"},
fm:{
"^":"h;",
i:function(a){return String(a)},
gt:function(a){return a?519018:218159},
$iscb:1},
fo:{
"^":"h;",
n:function(a,b){return null==b},
i:function(a){return"null"},
gt:function(a){return 0}},
cM:{
"^":"h;",
gt:function(a){return 0},
$isfp:1},
fD:{
"^":"cM;"},
c_:{
"^":"cM;",
i:function(a){return String(a)}},
aH:{
"^":"h;",
c7:function(a,b){if(!!a.immutable$list)throw H.d(new P.J(b))},
e0:function(a,b){if(!!a.fixed$length)throw H.d(new P.J(b))},
B:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.G(a))}},
ab:function(a,b){return H.c(new H.bL(a,b),[null,null])},
aB:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.a(a[x])
if(x>=z)return H.f(y,x)
y[x]=w}return y.join(b)},
W:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
gep:function(a){if(a.length>0)return a[0]
throw H.d(H.bG())},
ga3:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.bG())},
bw:function(a,b,c,d,e){var z,y,x
this.c7(a,"set range")
P.b8(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.d(H.fk())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aX(a,"[","]")},
gC:function(a){return new J.eC(a,a.length,0,null)},
gt:function(a){return H.a0(a)},
gj:function(a){return a.length},
sj:function(a,b){this.e0(a,"set length")
if(b<0)throw H.d(P.ae(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.w(a,b))
if(b>=a.length||b<0)throw H.d(H.w(a,b))
return a[b]},
q:function(a,b,c){this.c7(a,"indexed set")
if(b>=a.length||!1)throw H.d(H.w(a,b))
a[b]=c},
$isaY:1,
$isj:1,
$asj:null,
$isp:1},
jX:{
"^":"aH;"},
eC:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(new P.G(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aI:{
"^":"h;",
bl:function(a,b){return a%b},
a5:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.J(""+a))},
A:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.J(""+a))},
eU:function(a){return a},
aH:function(a,b){var z,y,x,w
H.cc(b)
if(b<2||b>36)throw H.d(P.ae(b,2,36,"radix",null))
z=a.toString(b)
if(C.e.c8(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.A(new P.J("Unexpected toString result: "+z))
x=J.z(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.e.E("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.d(H.W(b))
return a+b},
cP:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
d6:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a5(a/b)},
ah:function(a,b){return(a|0)===a?a/b|0:this.a5(a/b)},
aw:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aI:function(a,b){if(typeof b!=="number")throw H.d(H.W(b))
return a<b},
ar:function(a,b){if(typeof b!=="number")throw H.d(H.W(b))
return a>b},
$isaR:1},
cL:{
"^":"aI;",
$isaR:1,
$isk:1},
fn:{
"^":"aI;",
$isaR:1},
aZ:{
"^":"h;",
c8:function(a,b){if(b<0)throw H.d(H.w(a,b))
if(b>=a.length)throw H.d(H.w(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.d(P.eB(b,null,null))
return a+b},
d1:function(a,b,c){H.cc(b)
if(c==null)c=a.length
H.cc(c)
if(b<0)throw H.d(P.b7(b,null,null))
if(typeof c!=="number")return H.D(c)
if(b>c)throw H.d(P.b7(b,null,null))
if(c>a.length)throw H.d(P.b7(c,null,null))
return a.substring(b,c)},
d0:function(a,b){return this.d1(a,b,null)},
E:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.m)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
e7:function(a,b,c){if(c>a.length)throw H.d(P.ae(c,0,a.length,null,null))
return H.jj(a,b,c)},
gI:function(a){return a.length===0},
i:function(a){return a},
gt:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.w(a,b))
if(b>=a.length||b<0)throw H.d(H.w(a,b))
return a[b]},
$isaY:1,
$isU:1}}],["","",,H,{
"^":"",
aO:function(a,b){var z=a.ak(b)
if(!init.globalState.d.cy)init.globalState.f.ao()
return z},
bo:function(){--init.globalState.f.b},
dX:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isj)throw H.d(P.aD("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.id(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cJ()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hQ(P.bJ(null,H.aN),0)
y.z=P.b1(null,null,null,P.k,H.c6)
y.ch=P.b1(null,null,null,P.k,null)
if(y.x===!0){x=new H.ic()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fd,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.ie)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.b1(null,null,null,P.k,H.b9)
w=P.an(null,null,null,P.k)
v=new H.b9(0,null,!1)
u=new H.c6(y,x,w,init.createNewIsolate(),v,new H.aa(H.br()),new H.aa(H.br()),!1,!1,[],P.an(null,null,null,null),null,null,!1,!0,P.an(null,null,null,null))
w.a9(0,0)
u.bA(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aQ()
x=H.aj(y,[y]).a0(a)
if(x)u.ak(new H.jh(z,a))
else{y=H.aj(y,[y,y]).a0(a)
if(y)u.ak(new H.ji(z,a))
else u.ak(a)}init.globalState.f.ao()},
fh:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fi()
return},
fi:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.J("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.J("Cannot extract URI from \""+H.a(z)+"\""))},
fd:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bd(!0,[]).a1(b.data)
y=J.z(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bd(!0,[]).a1(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bd(!0,[]).a1(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.b1(null,null,null,P.k,H.b9)
p=P.an(null,null,null,P.k)
o=new H.b9(0,null,!1)
n=new H.c6(y,q,p,init.createNewIsolate(),o,new H.aa(H.br()),new H.aa(H.br()),!1,!1,[],P.an(null,null,null,null),null,null,!1,!0,P.an(null,null,null,null))
p.a9(0,0)
n.bA(0,o)
init.globalState.f.a.V(new H.aN(n,new H.fe(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ao()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.ak(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.ao()
break
case"close":init.globalState.ch.Z(0,$.$get$cK().h(0,a))
a.terminate()
init.globalState.f.ao()
break
case"log":H.fc(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ad(["command","print","msg",z])
q=new H.af(!0,P.ac(null,P.k)).F(q)
y.toString
self.postMessage(q)}else P.bq(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
fc:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ad(["command","log","msg",a])
x=new H.af(!0,P.ac(null,P.k)).F(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.E(w)
z=H.C(w)
throw H.d(P.aW(z))}},
ff:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cY=$.cY+("_"+y)
$.cZ=$.cZ+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.ak(f,["spawned",new H.bf(y,x),w,z.r])
x=new H.fg(a,b,c,d,z)
if(e===!0){z.c4(w,w)
init.globalState.f.a.V(new H.aN(z,x,"start isolate"))}else x.$0()},
iC:function(a){return new H.bd(!0,[]).a1(new H.af(!1,P.ac(null,P.k)).F(a))},
jh:{
"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
ji:{
"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
id:{
"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{ie:function(a){var z=P.ad(["command","print","msg",a])
return new H.af(!0,P.ac(null,P.k)).F(z)}}},
c6:{
"^":"b;a,b,c,eE:d<,e8:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
c4:function(a,b){if(!this.f.n(0,a))return
if(this.Q.a9(0,b)&&!this.y)this.y=!0
this.b5()},
eN:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.Z(0,a)
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
if(w===y.c)y.bL();++y.d}this.y=!1}this.b5()},
dP:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eM:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.A(new P.J("removeRange"))
P.b8(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cX:function(a,b){if(!this.r.n(0,a))return
this.db=b},
eu:function(a,b,c){var z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){J.ak(a,c)
return}z=this.cx
if(z==null){z=P.bJ(null,null)
this.cx=z}z.V(new H.i6(a,c))},
er:function(a,b){var z
if(!this.r.n(0,a))return
z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.bd()
return}z=this.cx
if(z==null){z=P.bJ(null,null)
this.cx=z}z.V(this.geF())},
ev:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bq(a)
if(b!=null)P.bq(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aC(a)
y[1]=b==null?null:J.aC(b)
for(x=new P.cN(z,z.r,null,null),x.c=z.e;x.u();)J.ak(x.d,y)},
ak:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.E(u)
w=t
v=H.C(u)
this.ev(w,v)
if(this.db===!0){this.bd()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geE()
if(this.cx!=null)for(;t=this.cx,!t.gI(t);)this.cx.cw().$0()}return y},
cl:function(a){return this.b.h(0,a)},
bA:function(a,b){var z=this.b
if(z.S(a))throw H.d(P.aW("Registry: ports must be registered only once."))
z.q(0,a,b)},
b5:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.q(0,this.a,this)
else this.bd()},
bd:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.R(0)
for(z=this.b,y=z.gcG(z),y=y.gC(y);y.u();)y.gw().dl()
z.R(0)
this.c.R(0)
init.globalState.z.Z(0,this.a)
this.dx.R(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
J.ak(w,z[v])}this.ch=null}},"$0","geF",0,0,1]},
i6:{
"^":"e:1;a,b",
$0:function(){J.ak(this.a,this.b)}},
hQ:{
"^":"b;a,b",
eg:function(){var z=this.a
if(z.b===z.c)return
return z.cw()},
cC:function(){var z,y,x
z=this.eg()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.S(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gI(y)}else y=!1
else y=!1
else y=!1
if(y)H.A(P.aW("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gI(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ad(["command","close"])
x=new H.af(!0,P.ac(null,P.k)).F(x)
y.toString
self.postMessage(x)}return!1}z.eL()
return!0},
bW:function(){if(self.window!=null)new H.hR(this).$0()
else for(;this.cC(););},
ao:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bW()
else try{this.bW()}catch(x){w=H.E(x)
z=w
y=H.C(x)
w=init.globalState.Q
v=P.ad(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.af(!0,P.ac(null,P.k)).F(v)
w.toString
self.postMessage(v)}}},
hR:{
"^":"e:1;a",
$0:function(){if(!this.a.cC())return
P.d7(C.f,this)}},
aN:{
"^":"b;a,b,c",
eL:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ak(this.b)}},
ic:{
"^":"b;"},
fe:{
"^":"e:0;a,b,c,d,e,f",
$0:function(){H.ff(this.a,this.b,this.c,this.d,this.e,this.f)}},
fg:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aQ()
w=H.aj(x,[x,x]).a0(y)
if(w)y.$2(this.b,this.c)
else{x=H.aj(x,[x]).a0(y)
if(x)y.$1(this.b)
else y.$0()}}z.b5()}},
dv:{
"^":"b;"},
bf:{
"^":"dv;b,a",
aK:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbO())return
x=H.iC(b)
if(z.ge8()===y){y=J.z(x)
switch(y.h(x,0)){case"pause":z.c4(y.h(x,1),y.h(x,2))
break
case"resume":z.eN(y.h(x,1))
break
case"add-ondone":z.dP(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eM(y.h(x,1))
break
case"set-errors-fatal":z.cX(y.h(x,1),y.h(x,2))
break
case"ping":z.eu(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.er(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a9(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.Z(0,y)
break}return}y=init.globalState.f
w="receive "+H.a(b)
y.a.V(new H.aN(z,new H.ih(this,x),w))},
n:function(a,b){if(b==null)return!1
return b instanceof H.bf&&J.a8(this.b,b.b)},
gt:function(a){return this.b.gb0()}},
ih:{
"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbO())z.dh(this.b)}},
c8:{
"^":"dv;b,c,a",
aK:function(a,b){var z,y,x
z=P.ad(["command","message","port",this,"msg",b])
y=new H.af(!0,P.ac(null,P.k)).F(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.c8&&J.a8(this.b,b.b)&&J.a8(this.a,b.a)&&J.a8(this.c,b.c)},
gt:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cY()
y=this.a
if(typeof y!=="number")return y.cY()
x=this.c
if(typeof x!=="number")return H.D(x)
return(z<<16^y<<8^x)>>>0}},
b9:{
"^":"b;b0:a<,b,bO:c<",
dl:function(){this.c=!0
this.b=null},
dh:function(a){if(this.c)return
this.dw(a)},
dw:function(a){return this.b.$1(a)},
$isfF:1},
h6:{
"^":"b;a,b,c",
da:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.V(new H.aN(y,new H.h8(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.av(new H.h9(this,b),0),a)}else throw H.d(new P.J("Timer greater than 0."))},
static:{h7:function(a,b){var z=new H.h6(!0,!1,null)
z.da(a,b)
return z}}},
h8:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
h9:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
H.bo()
this.b.$0()}},
aa:{
"^":"b;b0:a<",
gt:function(a){var z=this.a
if(typeof z!=="number")return z.f3()
z=C.a.aw(z,0)^C.a.ah(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aa){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
af:{
"^":"b;a,b",
F:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.gj(z))
z=J.m(a)
if(!!z.$iscQ)return["buffer",a]
if(!!z.$isbQ)return["typed",a]
if(!!z.$isaY)return this.cT(a)
if(!!z.$isfb){x=this.gcQ()
w=a.gcg()
w=H.b3(w,x,H.K(w,"N",0),null)
w=P.bK(w,!0,H.K(w,"N",0))
z=z.gcG(a)
z=H.b3(z,x,H.K(z,"N",0),null)
return["map",w,P.bK(z,!0,H.K(z,"N",0))]}if(!!z.$isfp)return this.cU(a)
if(!!z.$ish)this.cF(a)
if(!!z.$isfF)this.ap(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbf)return this.cV(a)
if(!!z.$isc8)return this.cW(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.ap(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaa)return["capability",a.a]
if(!(a instanceof P.b))this.cF(a)
return["dart",init.classIdExtractor(a),this.cS(init.classFieldsExtractor(a))]},"$1","gcQ",2,0,2],
ap:function(a,b){throw H.d(new P.J(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
cF:function(a){return this.ap(a,null)},
cT:function(a){var z=this.cR(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ap(a,"Can't serialize indexable: ")},
cR:function(a){var z,y,x
z=[]
C.d.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.F(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
cS:function(a){var z
for(z=0;z<a.length;++z)C.d.q(a,z,this.F(a[z]))
return a},
cU:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ap(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.F(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
cW:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cV:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gb0()]
return["raw sendport",a]}},
bd:{
"^":"b;a,b",
a1:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.aD("Bad serialized message: "+H.a(a)))
switch(C.d.gep(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=this.ai(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.ai(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.ai(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.ai(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.ej(a)
case"sendport":return this.ek(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.ei(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.aa(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ai(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.a(a))}},"$1","geh",2,0,2],
ai:function(a){var z,y,x
z=J.z(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.D(x)
if(!(y<x))break
z.q(a,y,this.a1(z.h(a,y)));++y}return a},
ej:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.aK()
this.b.push(w)
y=J.ev(y,this.geh()).bo(0)
for(z=J.z(y),v=J.z(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.f(y,u)
w.q(0,y[u],this.a1(v.h(x,u)))}return w},
ek:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.a8(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cl(w)
if(u==null)return
t=new H.bf(u,x)}else t=new H.c8(y,w,x)
this.b.push(t)
return t},
ei:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.z(y)
v=J.z(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.D(t)
if(!(u<t))break
w[z.h(y,u)]=this.a1(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eL:function(){throw H.d(new P.J("Cannot modify unmodifiable Map"))},
j0:function(a){return init.types[a]},
jd:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isb_},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aC(a)
if(typeof z!=="string")throw H.d(H.W(a))
return z},
a0:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bR:function(a){var z,y
z=C.h(J.m(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.c8(z,0)===36)z=C.e.d0(z,1)
return(z+H.ch(H.bm(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b5:function(a){return"Instance of '"+H.bR(a)+"'"},
fE:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
b6:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.b.aw(z,10))>>>0,56320|z&1023)}throw H.d(P.ae(a,0,1114111,null,null))},
H:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cX:function(a){return a.b?H.H(a).getUTCMilliseconds()+0:H.H(a).getMilliseconds()+0},
b4:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.W(a))
return a[b]},
bS:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.W(a))
a[b]=c},
D:function(a){throw H.d(H.W(a))},
f:function(a,b){if(a==null)J.aA(a)
throw H.d(H.w(a,b))},
w:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a9(!0,b,"index",null)
z=J.aA(a)
if(!(b<0)){if(typeof z!=="number")return H.D(z)
y=b>=z}else y=!0
if(y)return P.bF(b,a,"index",null,z)
return P.b7(b,"index",null)},
W:function(a){return new P.a9(!0,a,null,null)},
dN:function(a){return a},
cc:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.W(a))
return a},
d:function(a){var z
if(a==null)a=new P.cW()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dY})
z.name=""}else z.toString=H.dY
return z},
dY:function(){return J.aC(this.dartException)},
A:function(a){throw H.d(a)},
a7:function(a){throw H.d(new P.G(a))},
E:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jm(a)
if(a==null)return
if(a instanceof H.bE)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.aw(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bH(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.cV(v,null))}}if(a instanceof TypeError){u=$.$get$dg()
t=$.$get$dh()
s=$.$get$di()
r=$.$get$dj()
q=$.$get$dn()
p=$.$get$dp()
o=$.$get$dl()
$.$get$dk()
n=$.$get$dr()
m=$.$get$dq()
l=u.K(y)
if(l!=null)return z.$1(H.bH(y,l))
else{l=t.K(y)
if(l!=null){l.method="call"
return z.$1(H.bH(y,l))}else{l=s.K(y)
if(l==null){l=r.K(y)
if(l==null){l=q.K(y)
if(l==null){l=p.K(y)
if(l==null){l=o.K(y)
if(l==null){l=r.K(y)
if(l==null){l=n.K(y)
if(l==null){l=m.K(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cV(y,l==null?null:l.method))}}return z.$1(new H.hA(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.d2()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a9(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.d2()
return a},
C:function(a){var z
if(a instanceof H.bE)return a.b
if(a==null)return new H.dA(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dA(a,null)},
jg:function(a){if(a==null||typeof a!='object')return J.F(a)
else return H.a0(a)},
dP:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
j7:function(a,b,c,d,e,f,g){var z=J.m(c)
if(z.n(c,0))return H.aO(b,new H.j8(a))
else if(z.n(c,1))return H.aO(b,new H.j9(a,d))
else if(z.n(c,2))return H.aO(b,new H.ja(a,d,e))
else if(z.n(c,3))return H.aO(b,new H.jb(a,d,e,f))
else if(z.n(c,4))return H.aO(b,new H.jc(a,d,e,f,g))
else throw H.d(P.aW("Unsupported number of arguments for wrapped closure"))},
av:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.j7)
a.$identity=z
return z},
eJ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isj){z.$reflectionInfo=c
x=H.fI(z).r}else x=c
w=d?Object.create(new H.fU().constructor.prototype):Object.create(new H.bA(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.P
$.P=J.ay(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cx(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.j0(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cv:H.bB
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cx(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
eG:function(a,b,c,d){var z=H.bB
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cx:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eI(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eG(y,!w,z,b)
if(y===0){w=$.al
if(w==null){w=H.aU("self")
$.al=w}w="return function(){return this."+H.a(w)+"."+H.a(z)+"();"
v=$.P
$.P=J.ay(v,1)
return new Function(w+H.a(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.al
if(v==null){v=H.aU("self")
$.al=v}v=w+H.a(v)+"."+H.a(z)+"("+u+");"
w=$.P
$.P=J.ay(w,1)
return new Function(v+H.a(w)+"}")()},
eH:function(a,b,c,d){var z,y
z=H.bB
y=H.cv
switch(b?-1:a){case 0:throw H.d(new H.fK("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eI:function(a,b){var z,y,x,w,v,u,t,s
z=H.eD()
y=$.cu
if(y==null){y=H.aU("receiver")
$.cu=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eH(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.P
$.P=J.ay(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.P
$.P=J.ay(u,1)
return new Function(y+H.a(u)+"}")()},
cd:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eJ(a,b,z,!!d,e,f)},
jl:function(a){throw H.d(new P.eP("Cyclic initialization for static "+H.a(a)))},
aj:function(a,b,c){return new H.fL(a,b,c,null)},
aQ:function(){return C.l},
br:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
o:function(a,b,c){var z
if(b===0){J.eb(c,a)
return}else if(b===1){c.ca(H.E(a),H.C(a))
return}if(!!J.m(a).$isO)z=a
else{z=H.c(new P.B(0,$.l,null),[null])
z.aR(a)}z.aG(H.dI(b,0),new H.iN(b))
return c.geq()},
dI:function(a,b){return new H.iL(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
c:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bm:function(a){if(a==null)return
return a.$builtinTypeInfo},
dQ:function(a,b){return H.cl(a["$as"+H.a(b)],H.bm(a))},
K:function(a,b,c){var z=H.dQ(a,b)
return z==null?null:z[c]},
r:function(a,b){var z=H.bm(a)
return z==null?null:z[b]},
ck:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.ch(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.b.i(a)
else return},
ch:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.ba("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.a(H.ck(u,c))}return w?"":"<"+H.a(z)+">"},
cl:function(a,b){if(typeof a=="function"){a=H.cg(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cg(a,null,b)}return b},
iR:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bm(a)
y=J.m(a)
if(y[b]==null)return!1
return H.dL(H.cl(y[d],z),c)},
jk:function(a,b,c,d){if(a!=null&&!H.iR(a,b,c,d))throw H.d(H.eF(H.bR(a),(b.substring(3)+H.ch(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
dL:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.L(a[y],b[y]))return!1
return!0},
bh:function(a,b,c){return H.cg(a,b,H.dQ(b,c))},
L:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dR(a,b)
if('func' in a)return b.builtin$cls==="f_"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.ck(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.a(H.ck(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.dL(H.cl(v,z),x)},
dK:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.L(z,v)||H.L(v,z)))return!1}return!0},
iM:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.L(v,u)||H.L(u,v)))return!1}return!0},
dR:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.L(z,y)||H.L(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dK(x,w,!1))return!1
if(!H.dK(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.L(o,n)||H.L(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.L(o,n)||H.L(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.L(o,n)||H.L(n,o)))return!1}}return H.iM(a.named,b.named)},
cg:function(a,b,c){return a.apply(b,c)},
kK:function(a){var z=$.ce
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kJ:function(a){return H.a0(a)},
kI:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
je:function(a){var z,y,x,w,v,u
z=$.ce.$1(a)
y=$.bi[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bn[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dJ.$2(a,z)
if(z!=null){y=$.bi[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bn[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cj(x)
$.bi[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bn[z]=x
return x}if(v==="-"){u=H.cj(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dU(a,x)
if(v==="*")throw H.d(new P.bZ(z))
if(init.leafTags[z]===true){u=H.cj(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dU(a,x)},
dU:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bp(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cj:function(a){return J.bp(a,!1,null,!!a.$isb_)},
jf:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bp(z,!1,null,!!z.$isb_)
else return J.bp(z,c,null,null)},
j5:function(){if(!0===$.cf)return
$.cf=!0
H.j6()},
j6:function(){var z,y,x,w,v,u,t,s
$.bi=Object.create(null)
$.bn=Object.create(null)
H.j1()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dV.$1(v)
if(u!=null){t=H.jf(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
j1:function(){var z,y,x,w,v,u,t
z=C.t()
z=H.ai(C.p,H.ai(C.v,H.ai(C.i,H.ai(C.i,H.ai(C.u,H.ai(C.q,H.ai(C.r(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.ce=new H.j2(v)
$.dJ=new H.j3(u)
$.dV=new H.j4(t)},
ai:function(a,b){return a(b)||b},
jj:function(a,b,c){return a.indexOf(b,c)>=0},
eK:{
"^":"b;",
i:function(a){return P.bM(this)},
q:function(a,b,c){return H.eL()}},
f2:{
"^":"eK;a",
b_:function(){var z=this.$map
if(z==null){z=new H.aJ(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dP(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.b_().h(0,b)},
B:function(a,b){this.b_().B(0,b)},
gj:function(a){var z=this.b_()
return z.gj(z)}},
fH:{
"^":"b;a,b,c,d,e,f,r,x",
static:{fI:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fH(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hz:{
"^":"b;a,b,c,d,e,f",
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
return new H.hz(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bc:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},dm:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cV:{
"^":"x;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
fr:{
"^":"x;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
static:{bH:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fr(a,y,z?null:b.receiver)}}},
hA:{
"^":"x;a",
i:function(a){var z=this.a
return C.e.gI(z)?"Error":"Error: "+z}},
jm:{
"^":"e:2;a",
$1:function(a){if(!!J.m(a).$isx)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dA:{
"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
j8:{
"^":"e:0;a",
$0:function(){return this.a.$0()}},
j9:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ja:{
"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jb:{
"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jc:{
"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{
"^":"b;",
i:function(a){return"Closure '"+H.bR(this)+"'"},
gcH:function(){return this},
gcH:function(){return this}},
d5:{
"^":"e;"},
fU:{
"^":"d5;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bA:{
"^":"d5;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bA))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gt:function(a){var z,y
z=this.c
if(z==null)y=H.a0(this.a)
else y=typeof z!=="object"?J.F(z):H.a0(z)
z=H.a0(this.b)
if(typeof y!=="number")return y.f4()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.b5(z)},
static:{bB:function(a){return a.a},cv:function(a){return a.c},eD:function(){var z=$.al
if(z==null){z=H.aU("self")
$.al=z}return z},aU:function(a){var z,y,x,w,v
z=new H.bA("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eE:{
"^":"x;a",
i:function(a){return this.a},
static:{eF:function(a,b){return new H.eE("CastError: Casting value of type "+H.a(a)+" to incompatible type "+H.a(b))}}},
fK:{
"^":"x;a",
i:function(a){return"RuntimeError: "+H.a(this.a)}},
d1:{
"^":"b;"},
fL:{
"^":"d1;a,b,c,d",
a0:function(a){var z=this.dr(a)
return z==null?!1:H.dR(z,this.ac())},
dr:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
ac:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$isks)z.void=true
else if(!x.$iscE)z.ret=y.ac()
y=this.b
if(y!=null&&y.length!==0)z.args=H.d0(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.d0(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dO(y)
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
t=H.dO(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].ac())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
static:{d0:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ac())
return z}}},
cE:{
"^":"d1;",
i:function(a){return"dynamic"},
ac:function(){return}},
bE:{
"^":"b;a,G:b<"},
iN:{
"^":"e:5;a",
$2:function(a,b){H.dI(this.a,1).$1(new H.bE(a,b))}},
iL:{
"^":"e:2;a,b",
$1:function(a){this.b(this.a,a)}},
aJ:{
"^":"b;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gI:function(a){return this.a===0},
gcg:function(){return H.c(new H.ft(this),[H.r(this,0)])},
gcG:function(a){return H.b3(this.gcg(),new H.fq(this),H.r(this,0),H.r(this,1))},
S:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bG(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bG(y,a)}else return this.ez(a)},
ez:function(a){var z=this.d
if(z==null)return!1
return this.am(this.P(z,this.al(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.P(z,b)
return y==null?null:y.ga2()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.P(x,b)
return y==null?null:y.ga2()}else return this.eA(b)},
eA:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.P(z,this.al(a))
x=this.am(y,a)
if(x<0)return
return y[x].ga2()},
q:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.b2()
this.b=z}this.bz(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.b2()
this.c=y}this.bz(y,b,c)}else this.eC(b,c)},
eC:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.b2()
this.d=z}y=this.al(a)
x=this.P(z,y)
if(x==null)this.b4(z,y,[this.b3(a,b)])
else{w=this.am(x,a)
if(w>=0)x[w].sa2(b)
else x.push(this.b3(a,b))}},
Z:function(a,b){if(typeof b==="string")return this.bV(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bV(this.c,b)
else return this.eB(b)},
eB:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.P(z,this.al(a))
x=this.am(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.c1(w)
return w.ga2()},
R:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
B:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.G(this))
z=z.c}},
bz:function(a,b,c){var z=this.P(a,b)
if(z==null)this.b4(a,b,this.b3(b,c))
else z.sa2(c)},
bV:function(a,b){var z
if(a==null)return
z=this.P(a,b)
if(z==null)return
this.c1(z)
this.bH(a,b)
return z.ga2()},
b3:function(a,b){var z,y
z=new H.fs(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c1:function(a){var z,y
z=a.gdH()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
al:function(a){return J.F(a)&0x3ffffff},
am:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a8(a[y].gce(),b))return y
return-1},
i:function(a){return P.bM(this)},
P:function(a,b){return a[b]},
b4:function(a,b,c){a[b]=c},
bH:function(a,b){delete a[b]},
bG:function(a,b){return this.P(a,b)!=null},
b2:function(){var z=Object.create(null)
this.b4(z,"<non-identifier-key>",z)
this.bH(z,"<non-identifier-key>")
return z},
$isfb:1},
fq:{
"^":"e:2;a",
$1:function(a){return this.a.h(0,a)}},
fs:{
"^":"b;ce:a<,a2:b@,c,dH:d<"},
ft:{
"^":"N;a",
gj:function(a){return this.a.a},
gC:function(a){var z,y
z=this.a
y=new H.fu(z,z.r,null,null)
y.c=z.e
return y},
B:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.G(z))
y=y.c}},
$isp:1},
fu:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
j2:{
"^":"e:2;a",
$1:function(a){return this.a(a)}},
j3:{
"^":"e:10;a",
$2:function(a,b){return this.a(a,b)}},
j4:{
"^":"e:6;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bG:function(){return new P.ao("No element")},
fk:function(){return new P.ao("Too few elements")},
h4:function(a){return a.gf9()},
b2:{
"^":"N;",
gC:function(a){return new H.cO(this,this.gj(this),0,null)},
B:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.W(0,y))
if(z!==this.gj(this))throw H.d(new P.G(this))}},
ab:function(a,b){return H.c(new H.bL(this,b),[null,null])},
bp:function(a,b){var z,y,x
if(b){z=H.c([],[H.K(this,"b2",0)])
C.d.sj(z,this.gj(this))}else z=H.c(Array(this.gj(this)),[H.K(this,"b2",0)])
for(y=0;y<this.gj(this);++y){x=this.W(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bo:function(a){return this.bp(a,!0)},
$isp:1},
cO:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
u:function(){var z,y,x,w
z=this.a
y=J.z(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.G(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.W(z,w);++this.c
return!0}},
cP:{
"^":"N;a,b",
gC:function(a){var z=new H.fy(null,J.aS(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.aA(this.a)},
$asN:function(a,b){return[b]},
static:{b3:function(a,b,c,d){if(!!J.m(a).$isp)return H.c(new H.cF(a,b),[c,d])
return H.c(new H.cP(a,b),[c,d])}}},
cF:{
"^":"cP;a,b",
$isp:1},
fy:{
"^":"fl;a,b,c",
u:function(){var z=this.b
if(z.u()){this.a=this.aZ(z.gw())
return!0}this.a=null
return!1},
gw:function(){return this.a},
aZ:function(a){return this.c.$1(a)}},
bL:{
"^":"b2;a,b",
gj:function(a){return J.aA(this.a)},
W:function(a,b){return this.aZ(J.ef(this.a,b))},
aZ:function(a){return this.b.$1(a)},
$asb2:function(a,b){return[b]},
$asN:function(a,b){return[b]},
$isp:1},
cH:{
"^":"b;"}}],["","",,H,{
"^":"",
dO:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
hC:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iO()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.av(new P.hE(z),1)).observe(y,{childList:true})
return new P.hD(z,y,x)}else if(self.setImmediate!=null)return P.iP()
return P.iQ()},
ku:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.av(new P.hF(a),0))},"$1","iO",2,0,4],
kv:[function(a){++init.globalState.f.b
self.setImmediate(H.av(new P.hG(a),0))},"$1","iP",2,0,4],
kw:[function(a){P.bT(C.f,a)},"$1","iQ",2,0,4],
dD:function(a,b){var z=H.aQ()
z=H.aj(z,[z,z]).a0(a)
if(z){b.toString
return a}else{b.toString
return a}},
f0:function(a,b,c){var z=new P.B(0,$.l,null)
z.$builtinTypeInfo=[c]
P.d7(a,new P.f1(b,z))
return z},
Z:function(a){return H.c(new P.c1(H.c(new P.B(0,$.l,null),[a])),[a])},
iD:function(a,b,c){$.l.toString
a.H(b,c)},
iG:function(){var z,y
for(;z=$.ag,z!=null;){$.at=null
y=z.c
$.ag=y
if(y==null)$.as=null
$.l=z.b
z.dZ()}},
kH:[function(){$.c9=!0
try{P.iG()}finally{$.l=C.c
$.at=null
$.c9=!1
if($.ag!=null)$.$get$c2().$1(P.dM())}},"$0","dM",0,0,1],
dH:function(a){if($.ag==null){$.as=a
$.ag=a
if(!$.c9)$.$get$c2().$1(P.dM())}else{$.as.c=a
$.as=a}},
dW:function(a){var z,y
z=$.l
if(C.c===z){P.ah(null,null,C.c,a)
return}z.toString
if(C.c.gbc()===z){P.ah(null,null,z,a)
return}y=$.l
P.ah(null,null,y,y.b6(a,!0))},
kk:function(a,b){var z,y,x
z=H.c(new P.dB(null,null,null,0),[b])
y=z.gdC()
x=z.gdE()
z.a=a.a4(y,!0,z.gdD(),x)
return z},
iJ:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.E(u)
z=t
y=H.C(u)
$.l.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.S(x)
w=t
v=x.gG()
c.$2(w,v)}}},
iy:function(a,b,c,d){var z=a.b8()
if(!!J.m(z).$isO)z.bs(new P.iB(b,c,d))
else b.H(c,d)},
iz:function(a,b){return new P.iA(a,b)},
d7:function(a,b){var z=$.l
if(z===C.c){z.toString
return P.bT(a,b)}return P.bT(a,z.b6(b,!0))},
bT:function(a,b){var z=C.b.ah(a.a,1000)
return H.h7(z<0?0:z,b)},
c0:function(a){var z=$.l
$.l=a
return z},
aP:function(a,b,c,d,e){var z,y,x
z=new P.du(new P.iI(d,e),C.c,null)
y=$.ag
if(y==null){P.dH(z)
$.at=$.as}else{x=$.at
if(x==null){z.c=y
$.at=z
$.ag=z}else{z.c=x.c
x.c=z
$.at=z
if(z.c==null)$.as=z}}},
dE:function(a,b,c,d){var z,y
if($.l===c)return d.$0()
z=P.c0(c)
try{y=d.$0()
return y}finally{$.l=z}},
dG:function(a,b,c,d,e){var z,y
if($.l===c)return d.$1(e)
z=P.c0(c)
try{y=d.$1(e)
return y}finally{$.l=z}},
dF:function(a,b,c,d,e,f){var z,y
if($.l===c)return d.$2(e,f)
z=P.c0(c)
try{y=d.$2(e,f)
return y}finally{$.l=z}},
ah:function(a,b,c,d){var z=C.c!==c
if(z){d=c.b6(d,!(!z||C.c.gbc()===c))
c=C.c}P.dH(new P.du(d,c,null))},
hE:{
"^":"e:2;a",
$1:function(a){var z,y
H.bo()
z=this.a
y=z.a
z.a=null
y.$0()}},
hD:{
"^":"e:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hF:{
"^":"e:0;a",
$0:function(){H.bo()
this.a.$0()}},
hG:{
"^":"e:0;a",
$0:function(){H.bo()
this.a.$0()}},
is:{
"^":"Y;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.a(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.a(y)):z},
static:{it:function(a,b){if(b!=null)return b
if(!!J.m(a).$isx)return a.gG()
return}}},
O:{
"^":"b;"},
f1:{
"^":"e:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a6(null)}catch(x){w=H.E(x)
z=w
y=H.C(x)
P.iD(this.b,z,y)}}},
hK:{
"^":"b;eq:a<",
ca:function(a,b){a=a!=null?a:new P.cW()
if(this.a.a!==0)throw H.d(new P.ao("Future already completed"))
$.l.toString
this.H(a,b)},
c9:function(a){return this.ca(a,null)}},
c1:{
"^":"hK;a",
aA:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.ao("Future already completed"))
z.aR(b)},
H:function(a,b){this.a.dk(a,b)}},
ap:{
"^":"b;bP:a<,eO:b>,c,d,e",
ga8:function(){return this.b.b},
gcd:function(){return(this.c&1)!==0},
gex:function(){return this.c===6},
gew:function(){return this.c===8},
gdG:function(){return this.d},
gdO:function(){return this.d}},
B:{
"^":"b;ax:a?,a8:b<,c",
gdz:function(){return this.a===8},
sdA:function(a){if(a)this.a=2
else this.a=0},
aG:function(a,b){var z,y
z=H.c(new P.B(0,$.l,null),[null])
y=z.b
if(y!==C.c){y.toString
if(b!=null)b=P.dD(b,y)}this.aO(new P.ap(null,z,b==null?1:3,a,b))
return z},
cD:function(a){return this.aG(a,null)},
bs:function(a){var z,y
z=$.l
y=new P.B(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aO(new P.ap(null,y,8,a,null))
return y},
b1:function(){if(this.a!==0)throw H.d(new P.ao("Future already completed"))
this.a=1},
gdN:function(){return this.c},
gag:function(){return this.c},
c0:function(a){this.a=4
this.c=a},
c_:function(a){this.a=8
this.c=a},
dL:function(a,b){this.c_(new P.Y(a,b))},
aO:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ah(null,null,z,new P.hU(this,a))}else{a.a=this.c
this.c=a}},
av:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbP()
z.a=y}return y},
a6:function(a){var z,y
z=J.m(a)
if(!!z.$isO)if(!!z.$isB)P.be(a,this)
else P.c5(a,this)
else{y=this.av()
this.c0(a)
P.a5(this,y)}},
bF:function(a){var z=this.av()
this.c0(a)
P.a5(this,z)},
H:[function(a,b){var z=this.av()
this.c_(new P.Y(a,b))
P.a5(this,z)},function(a){return this.H(a,null)},"f5","$2","$1","gaV",2,2,12,0],
aR:function(a){var z
if(a==null);else{z=J.m(a)
if(!!z.$isO){if(!!z.$isB){z=a.a
if(z>=4&&z===8){this.b1()
z=this.b
z.toString
P.ah(null,null,z,new P.hW(this,a))}else P.be(a,this)}else P.c5(a,this)
return}}this.b1()
z=this.b
z.toString
P.ah(null,null,z,new P.hX(this,a))},
dk:function(a,b){var z
this.b1()
z=this.b
z.toString
P.ah(null,null,z,new P.hV(this,a,b))},
$isO:1,
static:{c5:function(a,b){var z,y,x,w
b.sax(2)
try{a.aG(new P.hY(b),new P.hZ(b))}catch(x){w=H.E(x)
z=w
y=H.C(x)
P.dW(new P.i_(b,z,y))}},be:function(a,b){var z
b.a=2
z=new P.ap(null,b,0,null,null)
if(a.a>=4)P.a5(a,z)
else a.aO(z)},a5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdz()
if(b==null){if(w){v=z.a.gag()
y=z.a.ga8()
x=J.S(v)
u=v.gG()
y.toString
P.aP(null,null,y,x,u)}return}for(;b.gbP()!=null;b=t){t=b.a
b.a=null
P.a5(z.a,b)}x.a=!0
s=w?null:z.a.gdN()
x.b=s
x.c=!1
y=!w
if(!y||b.gcd()||b.c===8){r=b.ga8()
if(w){u=z.a.ga8()
u.toString
if(u==null?r!=null:u!==r){u=u.gbc()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gag()
y=z.a.ga8()
x=J.S(v)
u=v.gG()
y.toString
P.aP(null,null,y,x,u)
return}q=$.l
if(q==null?r!=null:q!==r)$.l=r
else q=null
if(y){if(b.gcd())x.a=new P.i1(x,b,s,r).$0()}else new P.i0(z,x,b,r).$0()
if(b.gew())new P.i2(z,x,w,b,r).$0()
if(q!=null)$.l=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.m(y).$isO}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.B)if(p.a>=4){o.a=2
z.a=p
b=new P.ap(null,o,0,null,null)
y=p
continue}else P.be(p,o)
else P.c5(p,o)
return}}o=b.b
b=o.av()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hU:{
"^":"e:0;a,b",
$0:function(){P.a5(this.a,this.b)}},
hY:{
"^":"e:2;a",
$1:function(a){this.a.bF(a)}},
hZ:{
"^":"e:7;a",
$2:function(a,b){this.a.H(a,b)},
$1:function(a){return this.$2(a,null)}},
i_:{
"^":"e:0;a,b,c",
$0:function(){this.a.H(this.b,this.c)}},
hW:{
"^":"e:0;a,b",
$0:function(){P.be(this.b,this.a)}},
hX:{
"^":"e:0;a,b",
$0:function(){this.a.bF(this.b)}},
hV:{
"^":"e:0;a,b,c",
$0:function(){this.a.H(this.b,this.c)}},
i1:{
"^":"e:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aF(this.b.gdG(),this.c)
return!0}catch(x){w=H.E(x)
z=w
y=H.C(x)
this.a.b=new P.Y(z,y)
return!1}}},
i0:{
"^":"e:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gag()
y=!0
r=this.c
if(r.gex()){x=r.d
try{y=this.d.aF(x,J.S(z))}catch(q){r=H.E(q)
w=r
v=H.C(q)
r=J.S(z)
p=w
o=(r==null?p==null:r===p)?z:new P.Y(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aQ()
p=H.aj(p,[p,p]).a0(r)
n=this.d
m=this.b
if(p)m.b=n.eP(u,J.S(z),z.gG())
else m.b=n.aF(u,J.S(z))}catch(q){r=H.E(q)
t=r
s=H.C(q)
r=J.S(z)
p=t
o=(r==null?p==null:r===p)?z:new P.Y(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
i2:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cA(this.d.gdO())
z.a=w
v=w}catch(u){z=H.E(u)
y=z
x=H.C(u)
if(this.c){z=J.S(this.a.a.gag())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gag()
else v.b=new P.Y(y,x)
v.a=!1
return}if(!!J.m(v).$isO){t=this.d
s=t.geO(t)
s.sdA(!0)
this.b.c=!0
v.aG(new P.i3(this.a,s),new P.i4(z,s))}}},
i3:{
"^":"e:2;a,b",
$1:function(a){P.a5(this.a.a,new P.ap(null,this.b,0,null,null))}},
i4:{
"^":"e:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.B)){y=H.c(new P.B(0,$.l,null),[null])
z.a=y
y.dL(a,b)}P.a5(z.a,new P.ap(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
du:{
"^":"b;a,b,c",
dZ:function(){return this.a.$0()}},
a2:{
"^":"b;",
ab:function(a,b){return H.c(new P.ig(b,this),[H.K(this,"a2",0),null])},
B:function(a,b){var z,y
z={}
y=H.c(new P.B(0,$.l,null),[null])
z.a=null
z.a=this.a4(new P.fY(z,this,b,y),!0,new P.fZ(y),y.gaV())
return y},
gj:function(a){var z,y
z={}
y=H.c(new P.B(0,$.l,null),[P.k])
z.a=0
this.a4(new P.h_(z),!0,new P.h0(z,y),y.gaV())
return y},
bo:function(a){var z,y
z=H.c([],[H.K(this,"a2",0)])
y=H.c(new P.B(0,$.l,null),[[P.j,H.K(this,"a2",0)]])
this.a4(new P.h1(this,z),!0,new P.h2(z,y),y.gaV())
return y}},
fY:{
"^":"e;a,b,c,d",
$1:function(a){P.iJ(new P.fW(this.c,a),new P.fX(),P.iz(this.a.a,this.d))},
$signature:function(){return H.bh(function(a){return{func:1,args:[a]}},this.b,"a2")}},
fW:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fX:{
"^":"e:2;",
$1:function(a){}},
fZ:{
"^":"e:0;a",
$0:function(){this.a.a6(null)}},
h_:{
"^":"e:2;a",
$1:function(a){++this.a.a}},
h0:{
"^":"e:0;a,b",
$0:function(){this.b.a6(this.a.a)}},
h1:{
"^":"e;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bh(function(a){return{func:1,args:[a]}},this.a,"a2")}},
h2:{
"^":"e:0;a,b",
$0:function(){this.b.a6(this.a)}},
fV:{
"^":"b;"},
kA:{
"^":"b;"},
hH:{
"^":"b;a8:d<,ax:e?",
bj:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c6()
if((z&4)===0&&(this.e&32)===0)this.bM(this.gbR())},
an:function(a){return this.bj(a,null)},
cz:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gI(z)}else z=!1
if(z)this.r.aJ(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bM(this.gbT())}}}},
b8:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aS()
return this.f},
aS:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c6()
if((this.e&32)===0)this.r=null
this.f=this.bQ()},
aQ:["d4",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bX(a)
else this.aP(new P.hN(a,null))}],
aN:["d5",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bZ(a,b)
else this.aP(new P.hP(a,b,null))}],
dj:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bY()
else this.aP(C.n)},
bS:[function(){},"$0","gbR",0,0,1],
bU:[function(){},"$0","gbT",0,0,1],
bQ:function(){return},
aP:function(a){var z,y
z=this.r
if(z==null){z=new P.ir(null,null,0)
this.r=z}z.a9(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aJ(this)}},
bX:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bn(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aT((z&4)!==0)},
bZ:function(a,b){var z,y
z=this.e
y=new P.hJ(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aS()
z=this.f
if(!!J.m(z).$isO)z.bs(y)
else y.$0()}else{y.$0()
this.aT((z&4)!==0)}},
bY:function(){var z,y
z=new P.hI(this)
this.aS()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isO)y.bs(z)
else z.$0()},
bM:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aT((z&4)!==0)},
aT:function(a){var z,y
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
if(y)this.bS()
else this.bU()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aJ(this)},
df:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dD(b,z)
this.c=c}},
hJ:{
"^":"e:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aQ()
x=H.aj(x,[x,x]).a0(y)
w=z.d
v=this.b
u=z.b
if(x)w.eQ(u,v,this.c)
else w.bn(u,v)
z.e=(z.e&4294967263)>>>0}},
hI:{
"^":"e:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cB(z.c)
z.e=(z.e&4294967263)>>>0}},
dw:{
"^":"b;aE:a@"},
hN:{
"^":"dw;b,a",
bk:function(a){a.bX(this.b)}},
hP:{
"^":"dw;aj:b>,G:c<,a",
bk:function(a){a.bZ(this.b,this.c)}},
hO:{
"^":"b;",
bk:function(a){a.bY()},
gaE:function(){return},
saE:function(a){throw H.d(new P.ao("No events after a done."))}},
ii:{
"^":"b;ax:a?",
aJ:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dW(new P.ij(this,a))
this.a=1},
c6:function(){if(this.a===1)this.a=3}},
ij:{
"^":"e:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.es(this.b)}},
ir:{
"^":"ii;b,c,a",
gI:function(a){return this.c==null},
a9:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saE(b)
this.c=b}},
es:function(a){var z,y
z=this.b
y=z.gaE()
this.b=y
if(y==null)this.c=null
z.bk(a)}},
dB:{
"^":"b;a,b,c,ax:d?",
bB:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
fa:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a6(!0)
return}this.a.an(0)
this.c=a
this.d=3},"$1","gdC",2,0,function(){return H.bh(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dB")}],
dF:[function(a,b){var z
if(this.d===2){z=this.c
this.bB(0)
z.H(a,b)
return}this.a.an(0)
this.c=new P.Y(a,b)
this.d=4},function(a){return this.dF(a,null)},"fc","$2","$1","gdE",2,2,14,0],
fb:[function(){if(this.d===2){var z=this.c
this.bB(0)
z.a6(!1)
return}this.a.an(0)
this.c=null
this.d=5},"$0","gdD",0,0,1]},
iB:{
"^":"e:0;a,b,c",
$0:function(){return this.a.H(this.b,this.c)}},
iA:{
"^":"e:5;a,b",
$2:function(a,b){return P.iy(this.a,this.b,a,b)}},
c4:{
"^":"a2;",
a4:function(a,b,c,d){return this.dq(a,d,c,!0===b)},
ck:function(a,b,c){return this.a4(a,null,b,c)},
dq:function(a,b,c,d){return P.hT(this,a,b,c,d,H.K(this,"c4",0),H.K(this,"c4",1))},
bN:function(a,b){b.aQ(a)},
$asa2:function(a,b){return[b]}},
dx:{
"^":"hH;x,y,a,b,c,d,e,f,r",
aQ:function(a){if((this.e&2)!==0)return
this.d4(a)},
aN:function(a,b){if((this.e&2)!==0)return
this.d5(a,b)},
bS:[function(){var z=this.y
if(z==null)return
z.an(0)},"$0","gbR",0,0,1],
bU:[function(){var z=this.y
if(z==null)return
z.cz()},"$0","gbT",0,0,1],
bQ:function(){var z=this.y
if(z!=null){this.y=null
z.b8()}return},
f6:[function(a){this.x.bN(a,this)},"$1","gdt",2,0,function(){return H.bh(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dx")}],
f8:[function(a,b){this.aN(a,b)},"$2","gdv",4,0,15],
f7:[function(){this.dj()},"$0","gdu",0,0,1],
dg:function(a,b,c,d,e,f,g){var z,y
z=this.gdt()
y=this.gdv()
this.y=this.x.a.ck(z,this.gdu(),y)},
static:{hT:function(a,b,c,d,e,f,g){var z=$.l
z=H.c(new P.dx(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.df(b,c,d,e)
z.dg(a,b,c,d,e,f,g)
return z}}},
ig:{
"^":"c4;b,a",
bN:function(a,b){var z,y,x,w,v
z=null
try{z=this.dM(a)}catch(w){v=H.E(w)
y=v
x=H.C(w)
$.l.toString
b.aN(y,x)
return}b.aQ(z)},
dM:function(a){return this.b.$1(a)}},
Y:{
"^":"b;aj:a>,G:b<",
i:function(a){return H.a(this.a)},
$isx:1},
ix:{
"^":"b;"},
iI:{
"^":"e:0;a,b",
$0:function(){var z=this.a
throw H.d(new P.is(z,P.it(z,this.b)))}},
il:{
"^":"ix;",
gbc:function(){return this},
cB:function(a){var z,y,x,w
try{if(C.c===$.l){x=a.$0()
return x}x=P.dE(null,null,this,a)
return x}catch(w){x=H.E(w)
z=x
y=H.C(w)
return P.aP(null,null,this,z,y)}},
bn:function(a,b){var z,y,x,w
try{if(C.c===$.l){x=a.$1(b)
return x}x=P.dG(null,null,this,a,b)
return x}catch(w){x=H.E(w)
z=x
y=H.C(w)
return P.aP(null,null,this,z,y)}},
eQ:function(a,b,c){var z,y,x,w
try{if(C.c===$.l){x=a.$2(b,c)
return x}x=P.dF(null,null,this,a,b,c)
return x}catch(w){x=H.E(w)
z=x
y=H.C(w)
return P.aP(null,null,this,z,y)}},
b6:function(a,b){if(b)return new P.im(this,a)
else return new P.io(this,a)},
dV:function(a,b){if(b)return new P.ip(this,a)
else return new P.iq(this,a)},
h:function(a,b){return},
cA:function(a){if($.l===C.c)return a.$0()
return P.dE(null,null,this,a)},
aF:function(a,b){if($.l===C.c)return a.$1(b)
return P.dG(null,null,this,a,b)},
eP:function(a,b,c){if($.l===C.c)return a.$2(b,c)
return P.dF(null,null,this,a,b,c)}},
im:{
"^":"e:0;a,b",
$0:function(){return this.a.cB(this.b)}},
io:{
"^":"e:0;a,b",
$0:function(){return this.a.cA(this.b)}},
ip:{
"^":"e:2;a,b",
$1:function(a){return this.a.bn(this.b,a)}},
iq:{
"^":"e:2;a,b",
$1:function(a){return this.a.aF(this.b,a)}}}],["","",,P,{
"^":"",
aK:function(){return H.c(new H.aJ(0,null,null,null,null,null,0),[null,null])},
ad:function(a){return H.dP(a,H.c(new H.aJ(0,null,null,null,null,null,0),[null,null]))},
fj:function(a,b,c){var z,y
if(P.ca(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$au()
y.push(a)
try{P.iF(a,z)}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=P.d3(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aX:function(a,b,c){var z,y,x
if(P.ca(a))return b+"..."+c
z=new P.ba(b)
y=$.$get$au()
y.push(a)
try{x=z
x.a=P.d3(x.ga7(),a,", ")}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=z
y.a=y.ga7()+c
y=z.ga7()
return y.charCodeAt(0)==0?y:y},
ca:function(a){var z,y
for(z=0;y=$.$get$au(),z<y.length;++z)if(a===y[z])return!0
return!1},
iF:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gC(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.a(z.gw())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.f(b,0)
v=b.pop()
if(0>=b.length)return H.f(b,0)
u=b.pop()}else{t=z.gw();++x
if(!z.u()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.f(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gw();++x
for(;z.u();t=s,s=r){r=z.gw();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.a(t)
v=H.a(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
b1:function(a,b,c,d,e){return H.c(new H.aJ(0,null,null,null,null,null,0),[d,e])},
ac:function(a,b){return P.ia(a,b)},
an:function(a,b,c,d){return H.c(new P.i8(0,null,null,null,null,null,0),[d])},
bM:function(a){var z,y,x
z={}
if(P.ca(a))return"{...}"
y=new P.ba("")
try{$.$get$au().push(a)
x=y
x.a=x.ga7()+"{"
z.a=!0
J.eg(a,new P.fz(z,y))
z=y
z.a=z.ga7()+"}"}finally{z=$.$get$au()
if(0>=z.length)return H.f(z,0)
z.pop()}z=y.ga7()
return z.charCodeAt(0)==0?z:z},
i9:{
"^":"aJ;a,b,c,d,e,f,r",
al:function(a){return H.jg(a)&0x3ffffff},
am:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gce()
if(x==null?b==null:x===b)return y}return-1},
static:{ia:function(a,b){return H.c(new P.i9(0,null,null,null,null,null,0),[a,b])}}},
i8:{
"^":"i5;a,b,c,d,e,f,r",
gC:function(a){var z=new P.cN(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
e6:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dn(b)},
dn:function(a){var z=this.d
if(z==null)return!1
return this.au(z[this.at(a)],a)>=0},
cl:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.e6(0,a)?a:null
else return this.dB(a)},
dB:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.at(a)]
x=this.au(y,a)
if(x<0)return
return J.bt(y,x).gbJ()},
B:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.G(this))
z=z.b}},
a9:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.c7()
this.b=z}return this.bC(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.c7()
this.c=y}return this.bC(y,b)}else return this.V(b)},
V:function(a){var z,y,x
z=this.d
if(z==null){z=P.c7()
this.d=z}y=this.at(a)
x=z[y]
if(x==null)z[y]=[this.aU(a)]
else{if(this.au(x,a)>=0)return!1
x.push(this.aU(a))}return!0},
Z:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bD(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bD(this.c,b)
else return this.dJ(b)},
dJ:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.at(a)]
x=this.au(y,a)
if(x<0)return!1
this.bE(y.splice(x,1)[0])
return!0},
R:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bC:function(a,b){if(a[b]!=null)return!1
a[b]=this.aU(b)
return!0},
bD:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bE(z)
delete a[b]
return!0},
aU:function(a){var z,y
z=new P.fv(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bE:function(a){var z,y
z=a.gdm()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
at:function(a){return J.F(a)&0x3ffffff},
au:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a8(a[y].gbJ(),b))return y
return-1},
$isp:1,
static:{c7:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fv:{
"^":"b;bJ:a<,b,dm:c<"},
cN:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
i5:{
"^":"fM;"},
bI:{
"^":"b;",
gC:function(a){return new H.cO(a,this.gj(a),0,null)},
W:function(a,b){return this.h(a,b)},
B:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.f(a,y)
b.$1(a[y])
if(z!==a.length)throw H.d(new P.G(a))}},
ab:function(a,b){return H.c(new H.bL(a,b),[null,null])},
i:function(a){return P.aX(a,"[","]")},
$isj:1,
$asj:null,
$isp:1},
fz:{
"^":"e:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.a(a)
z.a=y+": "
z.a+=H.a(b)}},
fw:{
"^":"N;a,b,c,d",
gC:function(a){return new P.ib(this,this.c,this.d,this.b,null)},
B:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.A(new P.G(this))}},
gI:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
R:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aX(this,"{","}")},
cw:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.bG());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
V:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bL();++this.d},
bL:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.r(this,0)])
z=this.a
x=this.b
w=z.length-x
C.d.bw(y,0,w,z,x)
C.d.bw(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
d8:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$isp:1,
static:{bJ:function(a,b){var z=H.c(new P.fw(null,0,0,0),[b])
z.d8(a,b)
return z}}},
ib:{
"^":"b;a,b,c,d,e",
gw:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.A(new P.G(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fN:{
"^":"b;",
ab:function(a,b){return H.c(new H.cF(this,b),[H.r(this,0),null])},
i:function(a){return P.aX(this,"{","}")},
B:function(a,b){var z
for(z=this.gC(this);z.u();)b.$1(z.d)},
$isp:1},
fM:{
"^":"fN;"}}],["","",,P,{
"^":"",
bg:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.i7(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bg(a[z])
return a},
iH:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.d(H.W(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.E(w)
y=x
throw H.d(new P.am(String(y),null,null))}return P.bg(z)},
i7:{
"^":"b;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.dI(b):y}},
gj:function(a){var z
if(this.b==null){z=this.c
z=z.gj(z)}else z=this.aW().length
return z},
q:function(a,b,c){var z,y
if(this.b==null)this.c.q(0,b,c)
else if(this.S(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.c3().q(0,b,c)},
S:function(a){if(this.b==null)return this.c.S(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){if(this.b!=null&&!this.S(b))return
return this.c3().Z(0,b)},
B:function(a,b){var z,y,x,w
if(this.b==null)return this.c.B(0,b)
z=this.aW()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bg(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.d(new P.G(this))}},
i:function(a){return P.bM(this)},
aW:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
c3:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.aK()
y=this.aW()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.q(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.d.sj(y,0)
this.b=null
this.a=null
this.c=z
return z},
dI:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bg(this.a[a])
return this.b[a]=z}},
eM:{
"^":"b;"},
hB:{
"^":"eM;a",
bb:function(a,b,c){var z,y,x,w
z=a.length
P.b8(b,c,z,null,null,null)
y=new P.ba("")
x=this.a
w=new P.iu(x,y,!0,0,0,0)
w.bb(a,b,z)
if(w.e>0){if(!x)H.A(new P.am("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.b6(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
e9:function(a){return this.bb(a,0,null)}},
iu:{
"^":"b;a,b,c,d,e,f",
bb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.iw(c)
v=new P.iv(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=a.length,r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
if(r>>>0!==r||r>=s)return H.f(a,r)
q=a[r]
if((q&192)!==128){if(t)throw H.d(new P.am("Bad UTF-8 encoding 0x"+C.b.aH(q,16),null,null))
this.c=!1
u.a+=H.b6(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.f(C.j,p)
if(z<=C.j[p]){if(t)throw H.d(new P.am("Overlong encoding of 0x"+C.b.aH(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.d(new P.am("Character outside valid Unicode range: 0x"+C.b.aH(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.b6(z)
this.c=!1}for(;r<c;r=n,z=65533,y=0,x=0){o=w.$2(a,r)
if(J.dZ(o,0)){this.c=!1
if(typeof o!=="number")return H.D(o)
n=r+o
v.$2(r,n)
if(n===c)break
r=n}n=r+1
if(r>>>0!==r||r>=s)return H.f(a,r)
q=a[r]
if((q&224)===192){z=q&31
y=1
x=1
continue $loop$0}if((q&240)===224){z=q&15
y=2
x=2
continue $loop$0}if((q&248)===240&&q<245){z=q&7
y=3
x=3
continue $loop$0}if(t)throw H.d(new P.am("Bad UTF-8 encoding 0x"+C.b.aH(q,16),null,null))
this.c=!1
u.a+=H.b6(65533)}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
iw:{
"^":"e:17;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=a.length,x=b;x<z;++x){if(x<0||x>=y)return H.f(a,x)
w=a[x]
if((w&127)!==w)return x-b}return z-b}},
iv:{
"^":"e:18;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.h3(this.b,a,b)}}}],["","",,P,{
"^":"",
iK:function(a){return H.h4(a)},
bD:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aC(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eX(a)},
eX:function(a){var z=J.m(a)
if(!!z.$ise)return z.i(a)
return H.b5(a)},
aW:function(a){return new P.hS(a)},
bK:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.aS(a);y.u();)z.push(y.gw())
if(b)return z
z.fixed$length=Array
return z},
bq:function(a){var z=H.a(a)
H.ax(z)},
h3:function(a,b,c){return H.fE(a,b,P.b8(b,c,a.length,null,null,null))},
ka:{
"^":"e:19;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.iK(a)}},
cb:{
"^":"b;"},
"+bool":0,
bC:{
"^":"b;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.bC))return!1
return this.a===b.a&&this.b===b.b},
gt:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.eR(z?H.H(this).getUTCFullYear()+0:H.H(this).getFullYear()+0)
x=P.aE(z?H.H(this).getUTCMonth()+1:H.H(this).getMonth()+1)
w=P.aE(z?H.H(this).getUTCDate()+0:H.H(this).getDate()+0)
v=P.aE(z?H.H(this).getUTCHours()+0:H.H(this).getHours()+0)
u=P.aE(z?H.H(this).getUTCMinutes()+0:H.H(this).getMinutes()+0)
t=P.aE(z?H.H(this).getUTCSeconds()+0:H.H(this).getSeconds()+0)
s=P.eS(H.cX(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
d7:function(a,b){if(Math.abs(a)>864e13)throw H.d(P.aD(a))},
static:{eQ:function(a,b){var z=new P.bC(a,b)
z.d7(a,b)
return z},eR:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.a(z)
if(z>=10)return y+"00"+H.a(z)
return y+"000"+H.a(z)},eS:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aE:function(a){if(a>=10)return""+a
return"0"+a}}},
bs:{
"^":"aR;"},
"+double":0,
aF:{
"^":"b;a",
m:function(a,b){return new P.aF(C.b.m(this.a,b.gbI()))},
aI:function(a,b){return C.b.aI(this.a,b.gbI())},
ar:function(a,b){return C.b.ar(this.a,b.gbI())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.aF))return!1
return this.a===b.a},
gt:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eW()
y=this.a
if(y<0)return"-"+new P.aF(-y).i(0)
x=z.$1(C.b.bl(C.b.ah(y,6e7),60))
w=z.$1(C.b.bl(C.b.ah(y,1e6),60))
v=new P.eV().$1(C.b.bl(y,1e6))
return""+C.b.ah(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)}},
eV:{
"^":"e:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eW:{
"^":"e:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
x:{
"^":"b;",
gG:function(){return H.C(this.$thrownJsError)}},
cW:{
"^":"x;",
i:function(a){return"Throw of null."}},
a9:{
"^":"x;a,b,c,d",
gaY:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaX:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.gaY()+y+x
if(!this.a)return w
v=this.gaX()
u=P.bD(this.b)
return w+v+": "+H.a(u)},
static:{aD:function(a){return new P.a9(!1,null,null,a)},eB:function(a,b,c){return new P.a9(!0,a,b,c)}}},
d_:{
"^":"a9;e,f,a,b,c,d",
gaY:function(){return"RangeError"},
gaX:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.ar()
if(typeof z!=="number")return H.D(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b7:function(a,b,c){return new P.d_(null,null,!0,a,b,"Value not in range")},ae:function(a,b,c,d,e){return new P.d_(b,c,!0,a,d,"Invalid value")},b8:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.ae(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.ae(b,a,c,"end",f))
return b}return c}}},
f7:{
"^":"a9;e,j:f>,a,b,c,d",
gaY:function(){return"RangeError"},
gaX:function(){P.bD(this.e)
var z=": index should be less than "+H.a(this.f)
return J.e_(this.b,0)?": index must not be negative":z},
static:{bF:function(a,b,c,d,e){var z=e!=null?e:J.aA(b)
return new P.f7(b,z,!0,a,c,"Index out of range")}}},
J:{
"^":"x;a",
i:function(a){return"Unsupported operation: "+this.a}},
bZ:{
"^":"x;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
ao:{
"^":"x;a",
i:function(a){return"Bad state: "+this.a}},
G:{
"^":"x;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.bD(z))+"."}},
fC:{
"^":"b;",
i:function(a){return"Out of Memory"},
gG:function(){return},
$isx:1},
d2:{
"^":"b;",
i:function(a){return"Stack Overflow"},
gG:function(){return},
$isx:1},
eP:{
"^":"x;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hS:{
"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
am:{
"^":"b;a,b,L:c>",
i:function(a){var z=""!==this.a?"FormatException: "+this.a:"FormatException"
return z}},
eY:{
"^":"b;a",
i:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z=H.b4(b,"expando$values")
return z==null?null:H.b4(z,this.bK())},
q:function(a,b,c){var z=H.b4(b,"expando$values")
if(z==null){z=new P.b()
H.bS(b,"expando$values",z)}H.bS(z,this.bK(),c)},
bK:function(){var z,y
z=H.b4(this,"expando$key")
if(z==null){y=$.cG
$.cG=y+1
z="expando$key$"+y
H.bS(this,"expando$key",z)}return z}},
f_:{
"^":"b;"},
k:{
"^":"aR;"},
"+int":0,
N:{
"^":"b;",
ab:function(a,b){return H.b3(this,b,H.K(this,"N",0),null)},
B:function(a,b){var z
for(z=this.gC(this);z.u();)b.$1(z.gw())},
bp:function(a,b){return P.bK(this,b,H.K(this,"N",0))},
bo:function(a){return this.bp(a,!0)},
gj:function(a){var z,y
z=this.gC(this)
for(y=0;z.u();)++y
return y},
W:function(a,b){var z,y,x
if(b<0)H.A(P.ae(b,0,null,"index",null))
for(z=this.gC(this),y=0;z.u();){x=z.gw()
if(b===y)return x;++y}throw H.d(P.bF(b,this,"index",null,y))},
i:function(a){return P.fj(this,"(",")")}},
fl:{
"^":"b;"},
j:{
"^":"b;",
$asj:null,
$isp:1},
"+List":0,
fx:{
"^":"b;"},
kb:{
"^":"b;",
i:function(a){return"null"}},
"+Null":0,
aR:{
"^":"b;"},
"+num":0,
b:{
"^":";",
n:function(a,b){return this===b},
gt:function(a){return H.a0(this)},
i:function(a){return H.b5(this)}},
a1:{
"^":"b;"},
U:{
"^":"b;"},
"+String":0,
ba:{
"^":"b;a7:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{d3:function(a,b,c){var z=J.aS(b)
if(!z.u())return a
if(c.length===0){do a+=H.a(z.gw())
while(z.u())}else{a+=H.a(z.gw())
for(;z.u();)a=a+c+H.a(z.gw())}return a}}},
d4:{
"^":"b;"}}],["","",,W,{
"^":"",
eO:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.w)},
a6:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dy:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dC:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hM(a)
if(!!J.m(z).$isM)return z
return}else return a},
iE:function(a){if(!!J.m(a).$iscD)return a
return P.iV(a,!0)},
v:function(a){var z=$.l
if(z===C.c)return a
return z.dV(a,!0)},
y:{
"^":"aG;",
$isy:1,
$isb:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
jp:{
"^":"y;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
jr:{
"^":"y;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
js:{
"^":"y;",
gbf:function(a){return H.c(new W.q(a,"error",!1),[null])},
gbg:function(a){return H.c(new W.q(a,"load",!1),[null])},
$isM:1,
$ish:1,
"%":"HTMLBodyElement"},
cw:{
"^":"y;k:height%,l:width%",
bt:function(a,b,c){return a.getContext(b,P.iS(c))},
cL:function(a,b,c,d,e,f,g){var z,y
z=P.ad(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bt(a,"webgl",z)
return y==null?this.bt(a,"experimental-webgl",z):y},
cK:function(a,b){return this.cL(a,!0,!0,!0,!0,!1,b)},
$iscw:1,
"%":"HTMLCanvasElement"},
jt:{
"^":"h;",
cj:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
jv:{
"^":"aL;j:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jw:{
"^":"f8;j:length=",
bu:function(a,b){var z=this.ds(a,b)
return z!=null?z:""},
ds:function(a,b){if(W.eO(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.eT()+b)},
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
f8:{
"^":"h+eN;"},
eN:{
"^":"b;",
gk:function(a){return this.bu(a,"height")},
gl:function(a){return this.bu(a,"width")}},
cD:{
"^":"aL;",
$iscD:1,
"%":"Document|HTMLDocument|XMLDocument"},
jx:{
"^":"aL;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
jy:{
"^":"h;",
i:function(a){return String(a)},
"%":"DOMException"},
eU:{
"^":"h;b7:bottom=,k:height=,J:left=,bm:right=,ad:top=,l:width=",
i:function(a){return"Rectangle ("+H.a(a.left)+", "+H.a(a.top)+") "+H.a(this.gl(a))+" x "+H.a(this.gk(a))},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isT)return!1
y=a.left
x=z.gJ(b)
if(y==null?x==null:y===x){y=a.top
x=z.gad(b)
if(y==null?x==null:y===x){y=this.gl(a)
x=z.gl(b)
if(y==null?x==null:y===x){y=this.gk(a)
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.F(a.left)
y=J.F(a.top)
x=J.F(this.gl(a))
w=J.F(this.gk(a))
return W.dy(W.a6(W.a6(W.a6(W.a6(0,z),y),x),w))},
gbq:function(a){return H.c(new P.I(a.left,a.top),[null])},
$isT:1,
$asT:I.bj,
"%":";DOMRectReadOnly"},
aG:{
"^":"aL;",
gL:function(a){return P.fG(C.a.A(a.offsetLeft),C.a.A(a.offsetTop),C.a.A(a.offsetWidth),C.a.A(a.offsetHeight),null)},
i:function(a){return a.localName},
cJ:function(a){return a.getBoundingClientRect()},
gbf:function(a){return H.c(new W.q(a,"error",!1),[null])},
gbg:function(a){return H.c(new W.q(a,"load",!1),[null])},
gcm:function(a){return H.c(new W.q(a,"mousedown",!1),[null])},
gcn:function(a){return H.c(new W.q(a,"mouseenter",!1),[null])},
gco:function(a){return H.c(new W.q(a,"mouseleave",!1),[null])},
gcp:function(a){return H.c(new W.q(a,"mousemove",!1),[null])},
gcq:function(a){return H.c(new W.q(a,"mouseout",!1),[null])},
gcr:function(a){return H.c(new W.q(a,"mouseover",!1),[null])},
gcs:function(a){return H.c(new W.q(a,"mouseup",!1),[null])},
$isaG:1,
$ish:1,
$isM:1,
"%":";Element"},
jz:{
"^":"y;k:height%,U:src},l:width%",
"%":"HTMLEmbedElement"},
jA:{
"^":"aV;aj:error=",
"%":"ErrorEvent"},
aV:{
"^":"h;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
M:{
"^":"h;",
di:function(a,b,c,d){return a.addEventListener(b,H.av(c,1),d)},
dK:function(a,b,c,d){return a.removeEventListener(b,H.av(c,1),d)},
$isM:1,
"%":"MediaStream;EventTarget"},
jT:{
"^":"y;j:length=",
"%":"HTMLFormElement"},
f4:{
"^":"f5;",
fh:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
eI:function(a,b,c){return a.open(b,c)},
aK:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
f5:{
"^":"M;",
"%":";XMLHttpRequestEventTarget"},
jU:{
"^":"y;k:height%,U:src},l:width%",
"%":"HTMLIFrameElement"},
cI:{
"^":"y;k:height%,U:src},l:width%",
aA:function(a,b){return a.complete.$1(b)},
$iscI:1,
"%":"HTMLImageElement"},
jW:{
"^":"y;k:height%,U:src},l:width%",
$isaG:1,
$ish:1,
$isM:1,
"%":"HTMLInputElement"},
fA:{
"^":"y;aj:error=,U:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bN:{
"^":"ds;",
gL:function(a){var z,y
if(!!a.offsetX)return H.c(new P.I(a.offsetX,a.offsetY),[null])
else{if(!J.m(W.dC(a.target)).$isaG)throw H.d(new P.J("offsetX is only supported on elements"))
z=W.dC(a.target)
y=H.c(new P.I(a.clientX,a.clientY),[null]).aM(0,J.ep(J.es(z)))
return H.c(new P.I(J.ct(y.a),J.ct(y.b)),[null])}},
$isbN:1,
$isb:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
k9:{
"^":"h;",
$ish:1,
"%":"Navigator"},
aL:{
"^":"M;",
i:function(a){var z=a.nodeValue
return z==null?this.d2(a):z},
"%":"Attr;Node"},
kc:{
"^":"y;k:height%,l:width%",
"%":"HTMLObjectElement"},
aM:{
"^":"aV;",
$isaM:1,
$isb:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
kf:{
"^":"y;U:src}",
"%":"HTMLScriptElement"},
kh:{
"^":"y;j:length=",
"%":"HTMLSelectElement"},
ki:{
"^":"y;U:src}",
"%":"HTMLSourceElement"},
kj:{
"^":"aV;aj:error=",
"%":"SpeechRecognitionError"},
bX:{
"^":"h;",
$isb:1,
"%":"Touch"},
bY:{
"^":"ds;e_:changedTouches=",
$isbY:1,
$isb:1,
"%":"TouchEvent"},
ko:{
"^":"fa;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bF(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.d(new P.J("Cannot assign element of immutable List."))},
W:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bX]},
$isp:1,
$isb_:1,
$isaY:1,
"%":"TouchList"},
f9:{
"^":"h+bI;",
$isj:1,
$asj:function(){return[W.bX]},
$isp:1},
fa:{
"^":"f9+f6;",
$isj:1,
$asj:function(){return[W.bX]},
$isp:1},
kp:{
"^":"y;U:src}",
"%":"HTMLTrackElement"},
ds:{
"^":"aV;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
dt:{
"^":"fA;k:height%,l:width%",
$isdt:1,
"%":"HTMLVideoElement"},
kt:{
"^":"M;",
$ish:1,
$isM:1,
"%":"DOMWindow|Window"},
kx:{
"^":"h;b7:bottom=,k:height=,J:left=,bm:right=,ad:top=,l:width=",
i:function(a){return"Rectangle ("+H.a(a.left)+", "+H.a(a.top)+") "+H.a(a.width)+" x "+H.a(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isT)return!1
y=a.left
x=z.gJ(b)
if(y==null?x==null:y===x){y=a.top
x=z.gad(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.F(a.left)
y=J.F(a.top)
x=J.F(a.width)
w=J.F(a.height)
return W.dy(W.a6(W.a6(W.a6(W.a6(0,z),y),x),w))},
gbq:function(a){return H.c(new P.I(a.left,a.top),[null])},
$isT:1,
$asT:I.bj,
"%":"ClientRect"},
ky:{
"^":"aL;",
$ish:1,
"%":"DocumentType"},
kz:{
"^":"eU;",
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"DOMRect"},
kC:{
"^":"y;",
$isM:1,
$ish:1,
"%":"HTMLFrameSetElement"},
c3:{
"^":"a2;a,b,c",
a4:function(a,b,c,d){var z=new W.u(0,this.a,this.b,W.v(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.v()
return z},
ck:function(a,b,c){return this.a4(a,null,b,c)}},
q:{
"^":"c3;a,b,c"},
u:{
"^":"fV;a,b,c,d,e",
b8:function(){if(this.b==null)return
this.c2()
this.b=null
this.d=null
return},
bj:function(a,b){if(this.b==null)return;++this.a
this.c2()},
an:function(a){return this.bj(a,null)},
cz:function(){if(this.b==null||this.a<=0)return;--this.a
this.v()},
v:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.e0(x,this.c,z,this.e)}},
c2:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.e1(x,this.c,z,this.e)}}},
f6:{
"^":"b;",
gC:function(a){return new W.eZ(a,this.gj(a),-1,null)},
$isj:1,
$asj:null,
$isp:1},
eZ:{
"^":"b;a,b,c,d",
u:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bt(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gw:function(){return this.d}},
hL:{
"^":"b;a",
$isM:1,
$ish:1,
static:{hM:function(a){if(a===window)return a
else return new W.hL(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jn:{
"^":"ab;",
$ish:1,
"%":"SVGAElement"},
jo:{
"^":"h5;",
$ish:1,
"%":"SVGAltGlyphElement"},
jq:{
"^":"n;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
jB:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEBlendElement"},
jC:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
jD:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
jE:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFECompositeElement"},
jF:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
jG:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
jH:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
jI:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEFloodElement"},
jJ:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
jK:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEImageElement"},
jL:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEMergeElement"},
jM:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEMorphologyElement"},
jN:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFEOffsetElement"},
jO:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
jP:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFETileElement"},
jQ:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFETurbulenceElement"},
jR:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGFilterElement"},
jS:{
"^":"ab;k:height=,l:width=",
"%":"SVGForeignObjectElement"},
f3:{
"^":"ab;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
ab:{
"^":"n;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jV:{
"^":"ab;k:height=,l:width=",
$ish:1,
"%":"SVGImageElement"},
jZ:{
"^":"n;",
$ish:1,
"%":"SVGMarkerElement"},
k_:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGMaskElement"},
kd:{
"^":"n;k:height=,l:width=",
$ish:1,
"%":"SVGPatternElement"},
ke:{
"^":"f3;k:height=,l:width=",
"%":"SVGRectElement"},
kg:{
"^":"n;",
$ish:1,
"%":"SVGScriptElement"},
n:{
"^":"aG;",
gbf:function(a){return H.c(new W.q(a,"error",!1),[null])},
gbg:function(a){return H.c(new W.q(a,"load",!1),[null])},
gcm:function(a){return H.c(new W.q(a,"mousedown",!1),[null])},
gcn:function(a){return H.c(new W.q(a,"mouseenter",!1),[null])},
gco:function(a){return H.c(new W.q(a,"mouseleave",!1),[null])},
gcp:function(a){return H.c(new W.q(a,"mousemove",!1),[null])},
gcq:function(a){return H.c(new W.q(a,"mouseout",!1),[null])},
gcr:function(a){return H.c(new W.q(a,"mouseover",!1),[null])},
gcs:function(a){return H.c(new W.q(a,"mouseup",!1),[null])},
$isM:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
kl:{
"^":"ab;k:height=,l:width=",
$ish:1,
"%":"SVGSVGElement"},
km:{
"^":"n;",
$ish:1,
"%":"SVGSymbolElement"},
d6:{
"^":"ab;",
"%":";SVGTextContentElement"},
kn:{
"^":"d6;",
$ish:1,
"%":"SVGTextPathElement"},
h5:{
"^":"d6;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
kq:{
"^":"ab;k:height=,l:width=",
$ish:1,
"%":"SVGUseElement"},
kr:{
"^":"n;",
$ish:1,
"%":"SVGViewElement"},
kB:{
"^":"n;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
kD:{
"^":"n;",
$ish:1,
"%":"SVGCursorElement"},
kE:{
"^":"n;",
$ish:1,
"%":"SVGFEDropShadowElement"},
kF:{
"^":"n;",
$ish:1,
"%":"SVGGlyphRefElement"},
kG:{
"^":"n;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
fJ:{
"^":"h;",
dT:function(a,b,c){return a.bindBuffer(b,c)},
dU:function(a,b,c){return a.bindTexture(b,c)},
dW:function(a,b){return a.blendEquation(b)},
dX:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dY:function(a,b,c,d){return a.bufferData(b,c,d)},
e1:function(a,b){return a.clear(b)},
e2:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
e3:function(a,b){return a.clearDepth(b)},
e4:function(a,b){return a.clearStencil(b)},
e5:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
ea:function(a){return a.createBuffer()},
eb:function(a){return a.createProgram()},
ec:function(a,b){return a.createShader(b)},
ed:function(a){return a.createTexture()},
ee:function(a,b){return a.depthFunc(b)},
ef:function(a,b){return a.depthMask(b)},
em:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
en:function(a,b){return a.enable(b)},
eo:function(a,b){return a.enableVertexAttribArray(b)},
cI:function(a,b,c){return a.getAttribLocation(b,c)},
cO:function(a,b,c){return a.getUniformLocation(b,c)},
cj:function(a,b){return a.lineWidth(b)},
cZ:function(a,b,c,d){return a.stencilFunc(b,c,d)},
d_:function(a,b,c,d){return a.stencilOp(b,c,d)},
eS:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.iU(g))
return}z=J.m(g)
if(!!z.$iscI)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscw)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdt)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.d(P.aD("Incorrect number or type of arguments"))},
eR:function(a,b,c,d,e,f,g){return this.eS(a,b,c,d,e,f,g,null,null,null)},
eT:function(a,b,c,d){return a.texParameteri(b,c,d)},
eX:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
eY:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
eZ:function(a,b){return a.useProgram(b)},
f_:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ju:{
"^":"b;"}}],["","",,P,{
"^":"",
aq:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dz:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
I:{
"^":"b;D:a>,O:b>",
i:function(a){return"Point("+H.a(this.a)+", "+H.a(this.b)+")"},
n:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.I))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gt:function(a){var z,y
z=J.F(this.a)
y=J.F(this.b)
return P.dz(P.aq(P.aq(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gD(b)
if(typeof z!=="number")return z.m()
x=C.a.m(z,x)
z=this.b
y=y.gO(b)
if(typeof z!=="number")return z.m()
y=new P.I(x,C.a.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aM:function(a,b){var z,y,x,w
z=this.a
y=J.er(b)
if(typeof z!=="number")return z.aM()
if(typeof y!=="number")return H.D(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aM()
if(typeof w!=="number")return H.D(w)
w=new P.I(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
ik:{
"^":"b;",
gbm:function(a){return this.gJ(this)+this.c},
gb7:function(a){return this.gad(this)+this.d},
i:function(a){return"Rectangle ("+this.gJ(this)+", "+this.b+") "+this.c+" x "+this.d},
n:function(a,b){var z,y
if(b==null)return!1
z=J.m(b)
if(!z.$isT)return!1
if(this.gJ(this)===z.gJ(b)){y=this.b
z=y===z.gad(b)&&this.a+this.c===z.gbm(b)&&y+this.d===z.gb7(b)}else z=!1
return z},
gt:function(a){var z=this.b
return P.dz(P.aq(P.aq(P.aq(P.aq(0,this.gJ(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbq:function(a){var z=new P.I(this.gJ(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
T:{
"^":"ik;J:a>,ad:b>,l:c>,k:d>",
$asT:null,
static:{fG:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.c(new P.T(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
t:function(a){return a},
ar:function(a){return a},
cQ:{
"^":"h;",
dS:function(a,b,c){return new Uint8Array(a,b)},
dR:function(a){return this.dS(a,0,null)},
$iscQ:1,
"%":"ArrayBuffer"},
bQ:{
"^":"h;",
$isbQ:1,
"%":"DataView;ArrayBufferView;bO|cR|cT|bP|cS|cU|a_"},
bO:{
"^":"bQ;",
gj:function(a){return a.length},
$isb_:1,
$isaY:1},
bP:{
"^":"cT;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
a[b]=c}},
cR:{
"^":"bO+bI;",
$isj:1,
$asj:function(){return[P.bs]},
$isp:1},
cT:{
"^":"cR+cH;"},
a_:{
"^":"cU;",
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.k]},
$isp:1},
cS:{
"^":"bO+bI;",
$isj:1,
$asj:function(){return[P.k]},
$isp:1},
cU:{
"^":"cS+cH;"},
k0:{
"^":"bP;",
$isj:1,
$asj:function(){return[P.bs]},
$isp:1,
"%":"Float32Array"},
k1:{
"^":"bP;",
$isj:1,
$asj:function(){return[P.bs]},
$isp:1,
"%":"Float64Array"},
k2:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isp:1,
"%":"Int16Array"},
k3:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isp:1,
"%":"Int32Array"},
k4:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isp:1,
"%":"Int8Array"},
k5:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isp:1,
"%":"Uint16Array"},
k6:{
"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isp:1,
"%":"Uint32Array"},
k7:{
"^":"a_;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isp:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
k8:{
"^":"a_;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isp:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
ax:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
iS:function(a){var z={}
a.B(0,new P.iT(z))
return z},
iV:function(a,b){var z=[]
return new P.iY(b,new P.iW([],z),new P.iX(z),new P.iZ(z)).$1(a)},
iU:function(a){return a},
cC:function(){var z=$.cB
if(z==null){z=J.bu(window.navigator.userAgent,"Opera",0)
$.cB=z}return z},
eT:function(){var z,y
z=$.cy
if(z!=null)return z
y=$.cz
if(y==null){y=J.bu(window.navigator.userAgent,"Firefox",0)
$.cz=y}if(y===!0)z="-moz-"
else{y=$.cA
if(y==null){y=P.cC()!==!0&&J.bu(window.navigator.userAgent,"Trident/",0)
$.cA=y}if(y===!0)z="-ms-"
else z=P.cC()===!0?"-o-":"-webkit-"}$.cy=z
return z},
iT:{
"^":"e:20;a",
$2:function(a,b){this.a[a]=b}},
iW:{
"^":"e:21;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
iX:{
"^":"e:22;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.f(z,a)
return z[a]}},
iZ:{
"^":"e:23;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.f(z,a)
z[a]=b}},
iY:{
"^":"e:2;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.eQ(a.getTime(),!0)
if(a instanceof RegExp)throw H.d(new P.bZ("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.aK()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.a7)(w),++u){t=w[u]
x.q(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.z(a)
s=w.gj(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.D(s)
v=J.aw(x)
r=0
for(;r<s;++r)v.q(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
dS:[function(){var z=0,y=new P.Z(),x=1,w,v,u,t,s,r,q,p
function $async$dS(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=G
r=r
q=P
v=new r.hc(700,500,q.aK())
r=E
r=r
q=Float64Array
p=H
u=new r.Q(new q(p.t(16)))
r=u
r.T()
r=F
t=new r.hf(400,300,1,1,1,0,0,null,"none",null,u,!1)
r=t
r.b=[]
r=t
q=F
r.ch=q.bb(255,238,238,255)
r=E
r=r
q=Float64Array
p=H
u=new r.Q(new q(p.t(16)))
r=u
r.T()
r=G
s=new r.hp(null,!1,0,v,!1,!1,0,null,!1,!1,[u])
r=s
q=G
r.a=q.hl(400,600)
r=s
r.sM(t)
r=s
r.eH()
r=s
r.eW()
r=s
z=!r.b?2:3
break
case 2:r=s
r.b=!0
r=s
r.as()
case 3:r=t
r=r
q=E
r.ay(q.fR(v))
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$dS,y,null)},"$0","dT",0,0,0]},1],["","",,E,{
"^":"",
fQ:{
"^":"d9;e,f,r,x,a,b,c,d",
bh:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=this.e
if(z==null||this.f==null)return
if(++this.x<2);else{this.x=0;++this.r}y=C.b.cP(this.r,z.b.length)
z=new E.Q(new Float64Array(H.t(16)))
z.T()
z.br(0,50,0,0)
x=a0.a
x.push(C.d.ga3(x).E(0,z))
a0.ae()
w=F.bV(F.bb(170,255,170,170))
z=this.f
if(z!=null){v=this.e.b
if(y>=v.length)return H.f(v,y)
v=v[y].gby()
u=this.e.b
if(y>=u.length)return H.f(u,y)
u=u[y].gcc()
J.by(a0.c,a0.f)
t=J.bx(a0.c,a0.f,"a_tex")
s=J.bv(a0.c)
J.az(a0.c,34962,s)
r=v.a
q=z.gN()
if(typeof q!=="number")return H.D(q)
p=r/q
q=v.b
o=z.gaa()
if(typeof o!=="number")return H.D(o)
n=q/o
o=z.gN()
if(typeof o!=="number")return H.D(o)
m=(r+v.c)/o
o=z.gaa()
if(typeof o!=="number")return H.D(o)
l=(q+v.d)/o
J.e6(a0.c,34962,new Float32Array(H.ar([p,n,p,l,m,n,m,l])),35044)
J.bw(a0.c,t)
J.bz(a0.c,t,2,5126,!1,0,0)
k=z.cN(a0.c)
J.e3(a0.c,3553,k)
J.aT(a0.c,3553,10242,33071)
J.aT(a0.c,3553,10243,33071)
J.aT(a0.c,3553,10241,9728)
J.aT(a0.c,3553,10240,9728)
j=u.a
i=u.b
h=j+u.c
g=i+u.d
f=G.dd(a0.c,[j,i,0,j,g,0,h,i,0,h,g,0])
J.az(a0.c,34962,f)
e=G.de(a0.c,[0,1,2,1,3,2])
J.az(a0.c,34963,e)
d=J.bx(a0.c,a0.f,"vp")
c=J.aB(a0.c,a0.f,"u_mat")
J.eA(a0.c,c,!1,new Float32Array(H.ar(a0.c5().gp())))
J.bz(a0.c,d,3,5126,!1,0,0)
b=J.aB(a0.c,a0.f,"color")
u=a0.c
z=w.a.a
J.ez(u,b,(z>>>16&255)/255,(z>>>8&255)/255,(z>>>0&255)/255,(z>>>24&255)/255)
J.bw(a0.c,d)
J.co(a0.c,4,6,5123,0)
if(0>=x.length)return H.f(x,0)
x.pop()
a0.ae()}},
cu:function(a,b,c,d,e,f,g){return!1},
d9:function(a){a.aC("assets/nono.png").cD(new E.fS(this))
a.be("assets/nono.json").cD(new E.fT(this))},
static:{fR:function(a){var z=new E.Q(new Float64Array(H.t(16)))
z.T()
z=new E.fQ(null,null,0,0,"none",null,z,!1)
z.b=[]
z.d9(a)
return z}}},
fS:{
"^":"e:24;a",
$1:function(a){this.a.f=a}},
fT:{
"^":"e:6;a",
$1:function(a){var z,y,x,w,v,u
z=[]
y=new F.fO(a,z)
y.eK(a)
this.a.e=y
for(y=z.length,x=0;x<z.length;z.length===y||(0,H.a7)(z),++x){w=z[x]
v="### fname: "+H.a(w.a)+" ###"
H.ax(v)
u=w.gcc()
v="##### dst: "+("x:"+H.a(u.a)+", y:"+H.a(u.b)+", w:"+H.a(u.c)+", h:"+H.a(u.d))+" ###"
H.ax(v)
u=w.gby()
v="##### src: "+("x:"+H.a(u.a)+", y:"+H.a(u.b)+", w:"+H.a(u.c)+", h:"+H.a(u.d))+" ###"
H.ax(v)
v="##### ang: "+H.a(w.gdQ())+" ###"
H.ax(v)}}}}],["","",,F,{
"^":"",
b0:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.a7)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.b.aw(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
ha:{
"^":"b;"},
d9:{
"^":"b;",
ay:function(a){var z=0,y=new P.Z(),x=1,w,v=this,u,t,s,r
function $async$ay(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.c(new s.B(0,r.l,null),[null])
t=u
t.aR(null)
z=2
return H.o(u,$async$ay,y)
case 2:t=v
t=t.b
t.push(a)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$ay,y,null)},
cf:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a7)(z),++x)z[x].cf(a)},
ct:function(a,b){},
cE:function(a,b){var z,y,x
this.ba()
this.ct(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a7)(z),++x)z[x].cE(a,b)},
bh:function(a,b){},
bi:["d3",function(a,b){var z,y,x,w,v,u
this.ba()
this.bh(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.a7)(z),++w){v=z[w]
u=v.c
x.push(C.d.ga3(x).E(0,u))
b.ae()
v.bi(a,b)
if(0>=x.length)return H.f(x,0)
x.pop()
b.ae()}}],
eV:["a_",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.ba()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.f(y,w)
v=y[w]
a.Y(v.c)
u=v.eV(a,b,c,d,e)
a.X()
if(u)return!0}t=a.cM().b9(0)
t.eD()
y=new E.a3(new Float64Array(H.t(3)))
y.aL(d,e,0)
s=t.E(0,y)
return this.cu(a,b,c,s.gD(s),s.gO(s),d,e)}],
cu:function(a,b,c,d,e,f,g){return!1},
ba:function(){if(!this.d)this.d=!0}},
hb:{
"^":"b;",
aC:function(a){var z=0,y=new P.Z(),x,w=2,v,u=this,t,s,r,q
function $async$aC(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.S(a)?3:4
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
return H.o(q.aD(a),$async$aC,y)
case 5:s.q(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$aC,y,null)}},
V:{
"^":"b;a,b,N:c<,aa:d<",
n:function(a,b){if(b==null)return!1
return b instanceof F.V&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gt:function(a){return F.b0([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+H.a(this.a)+", y:"+H.a(this.b)+", w:"+H.a(this.c)+", h:"+H.a(this.d)}},
da:{
"^":"b;a,b",
n:function(a,b){if(b==null)return!1
return b instanceof F.da&&b.a===this.a&&b.b===this.b},
gt:function(a){return F.b0([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
i:function(a){return"x:"+H.a(this.a)+", y:"+H.a(this.b)}},
db:{
"^":"b;N:a<,aa:b<",
n:function(a,b){if(b==null)return!1
return b instanceof F.db&&b.a===this.a&&b.b===this.b},
gt:function(a){return F.b0([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
i:function(a){return"w:"+H.a(this.a)+", h:"+H.a(this.b)}},
hh:{
"^":"b;a",
i:function(a){return C.x.h(0,this.a)}},
hg:{
"^":"b;a,b,c",
dd:function(a){if(this.a==null)this.a=F.bb(255,255,255,255)},
static:{bV:function(a){var z=new F.hg(a,C.k,1)
z.dd(a)
return z}}},
d8:{
"^":"b;a",
n:function(a,b){if(b==null)return!1
return b instanceof F.d8&&b.a===this.a},
gt:function(a){return F.b0([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
dc:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{bb:function(a,b,c,d){var z=new F.d8(0)
z.dc(a,b,c,d)
return z}}},
bU:{
"^":"b;"},
hf:{
"^":"d9;N:e<,aa:f<,r,x,y,z,Q,ch,a,b,c,d",
ct:function(a,b){var z,y,x,w
z=this.e
y=(a.gN()-a.geJ(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.Q(new Float64Array(H.t(16)))
y.T()
this.c=y
y.br(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bv(0,z,z,1)},
bi:function(a,b){var z,y,x
z=new F.V(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.d.ga3(x).E(0,y))
b.ae()
y=b.b
y.push(z)
b.az(a,z)
this.d3(a,b)
if(0>=y.length)return H.f(y,0)
y.pop()
if(y.length>0)b.az(a,C.d.ga3(y))
else{y=a.a
b.az(a,new F.V(0,0,y.c,y.d))}if(0>=x.length)return H.f(x,0)
x.pop()
b.ae()},
bh:function(a,b){var z,y
z=new F.V(0,0,this.e,this.f)
y=F.bV(null)
y.a=this.ch
b.az(a,z)
b.cb(a,z,y)}},
fO:{
"^":"b;a,b",
eK:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.aS(H.jk(J.bt(P.iH(a,null),"frames"),"$isj",[P.fx],"$asj")),y=this.b;z.u();){x=z.gw()
w=new F.fP(null,null,null,null,null,null,null)
v=J.z(x)
w.a=v.h(x,"filename")
w.r=w.cv(v.h(x,"frame"))
w.b=v.h(x,"rotated")
w.c=v.h(x,"trimmed")
w.d=w.cv(v.h(x,"spriteSourceSize"))
u=v.h(x,"sourceSize")
t=J.z(u)
s=t.h(u,"w")
r=t.h(u,"h")
w.e=new F.db(J.X(s),J.X(r))
v=v.h(x,"pivot")
u=J.z(v)
q=u.h(v,"x")
p=u.h(v,"y")
w.f=new F.da(J.X(q),J.X(p))
y.push(w)}}},
fP:{
"^":"b;a,b,c,d,e,f,r",
gcc:function(){var z,y,x
z=this.b
y=this.d
if(z===!0){z=y.b
x=y.d
return new F.V(-1*z-x,y.a,x,y.c)}else return new F.V(y.a,y.b,y.c,y.d)},
gby:function(){var z,y
z=this.b
y=this.r
if(z===!0)return new F.V(y.a,y.b,y.d,y.c)
else return new F.V(y.a,y.b,y.c,y.d)},
gdQ:function(){if(this.b===!0)return 0.5707963267948966
else return 0},
cv:function(a){var z,y,x,w,v
z=J.z(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.V(J.X(y),J.X(x),J.X(w),J.X(v))}},
hi:{
"^":"b;",
gM:function(){return this.c$},
sM:function(a){this.c$=a},
ci:function(a){if(!this.e$){this.c$.cf(this)
this.e$=!0}this.c$.cE(this,a)
this.eG()},
Y:function(a){var z=this.f$
z.push(C.d.ga3(z).E(0,a))},
X:function(){var z=this.f$
if(0>=z.length)return H.f(z,0)
z.pop()},
cM:function(){return C.d.ga3(this.f$)}}}],["","",,G,{
"^":"",
bW:function(a){var z=0,y=new P.Z(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bW(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.c(new p.c1(o.c(new n.B(0,m.l,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.ex(t,a)
q=J
s=q.i(t)
q=s
r=q.gbg(t)
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
m=m.v(new l.hn(u,t))
l=r
p=new p.u(0,o,n,m,l.c)
o=H
q=q.c(p,[o.r(r,0)])
q.v()
q=s
s=q.gbf(t)
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
m=m.v(new l.ho(a,u))
l=s
p=new p.u(0,o,n,m,l.c)
o=H
q=q.c(p,[o.r(s,0)])
q.v()
q=u
x=q.a
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$bW,y,null)},
dc:function(a,b,c){var z,y,x
z=G.df(a,35633,b)
y=G.df(a,35632,c)
x=J.ec(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
df:function(a,b,c){var z,y
z=J.ed(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.a(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
dd:function(a,b){var z=J.bv(a)
a.bindBuffer(34962,z)
a.bufferData(34962,new Float32Array(H.ar(b)),35044)
a.bindBuffer(34962,null)
return z},
de:function(a,b){var z=J.bv(a)
a.bindBuffer(34963,z)
a.bufferData(34963,new Uint16Array(H.ar(b)),35044)
a.bindBuffer(34963,null)
return z},
hm:{
"^":"bU;a,b",
gN:function(){return J.eq(this.a)},
gaa:function(){return J.eh(this.a)},
cN:function(a){var z
if(this.b==null){z=J.i(a).ed(a)
this.b=z
a.bindTexture(3553,z)
C.z.eR(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
hk:{
"^":"b;a,b,c,k:d>",
de:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.b.a5(b)
y=C.b.a5(a)
x=document.createElement("canvas",null)
J.ey(x,z)
J.ew(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.et(this.b,!0)},
static:{hl:function(a,b){var z=new G.hk(null,null,null,null)
z.de(a,b)
return z}}},
hj:{
"^":"ha;c,d,e,f,r,a,b",
ey:function(){var z,y
z=C.d.aB(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.d.aB(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.dc(this.c,z,y)
z=C.d.aB(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.d.aB(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.dc(this.c,z,y)},
R:function(a){J.cp(this.c,2960)
J.ee(this.c,515)
J.e8(this.c,0,0,0,1)
J.e9(this.c,1)
J.ea(this.c,0)
J.cp(this.c,3042)
switch(-1){case-1:J.e4(this.c,32774)
J.e5(this.c,770,771,770,32772)
break}J.e7(this.c,17664)},
c5:function(){var z,y
this.r.T()
z=this.r.br(0,-1,1,0)
this.r=z
y=this.d
y=z.bv(0,2/y.c,-2/y.d,1)
this.r=y
y=y.E(0,C.d.ga3(this.a))
this.r=y
return y},
cb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b.a
y=b.b
x=z+b.c
w=y+b.d
v=[z,y,0,z,w,0,x,y,0,x,w,0]
u=c.a
t=c.c
J.by(this.c,this.e)
s=G.dd(this.c,v)
J.az(this.c,34962,s)
r=G.de(this.c,[0,1,3,2])
J.az(this.c,34963,r)
q=this.c
p=this.e
o=this.c5()
q.uniformMatrix4fv(J.aB(q,p,"u_mat"),!1,new Float32Array(H.ar(o.gp())))
o=this.c
p=this.e
u=u.a
o.uniform4fv(J.aB(o,p,"color"),new Float32Array(H.ar([(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255])))
u=this.c
u.uniform1f(J.aB(u,this.e,"u_point_size"),t)
n=J.bx(this.c,this.e,"vp")
J.bz(this.c,n,3,5126,!1,0,0)
J.bw(this.c,n)
if(c.b===C.k)m=6
else{J.eu(this.c,t)
m=2}J.co(this.c,m,v.length/3|0,5123,0)
J.by(this.c,null)},
az:function(a,b){var z
J.cm(this.c,!1,!1,!1,!1)
J.cn(this.c,!1)
J.cs(this.c,7680,7681,7681)
J.cr(this.c,519,1,255)
z=F.bV(null)
z.a=F.bb(255,255,255,255)
this.cb(null,b,z)
J.cm(this.c,!0,!0,!0,!0)
J.cn(this.c,!0)
J.cs(this.c,7680,7680,7680)
J.cr(this.c,514,1,255)},
ae:function(){}},
hc:{
"^":"hb;l:b>,k:c>,a",
aD:function(a){var z=0,y=new P.Z(),x,w=2,v,u,t
function $async$aD(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.o(t.bW(a),$async$aD,y)
case 3:x=new u.hm(c,null)
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$aD,y,null)},
be:function(a){var z=0,y=new P.Z(),x,w=2,v,u,t,s,r,q,p,o,n,m
function $async$be(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=H
p=p
o=P
o=o
n=$
u=r.c(new q.c1(p.c(new o.B(0,n.l,null),[null])),[null])
t=new XMLHttpRequest()
r=C
r=r.o
r.eI(t,"GET",a)
r=t
r.responseType="arraybuffer"
r=H
r=r
q=W
s=r.c(new q.c3(t,"load",!1),[null])
r=H
r=r
q=W
q=q
p=s
p=p.a
o=s
o=o.b
n=W
n=n
m=G
n=n.v(new m.hd(u,t))
m=s
q=new q.u(0,p,o,n,m.c)
p=H
r=r.c(q,[p.r(s,0)])
r.v()
r=H
r=r
q=W
s=r.c(new q.c3(t,"error",!1),[null])
r=H
r=r
q=W
q=q
p=s
p=p.a
o=s
o=o.b
n=W
n=n
m=G
n=n.v(new m.he(u))
m=s
q=new q.u(0,p,o,n,m.c)
p=H
r=r.c(q,[p.r(s,0)])
r.v()
r=t
r.send()
r=u
x=r.a
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$be,y,null)}},
hd:{
"^":"e:25;a,b",
$1:function(a){var z=0,y=new P.Z(),x=1,w,v=this,u,t,s,r
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=J
t=t
s=W
s=s
r=v
r=r.b
u=t.e2(s.iE(r.response))
t=v
t=t.a
t=t
s=P
s=new s.hB(!0)
t.aA(0,s.e9(u))
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$$1,y,null)}},
he:{
"^":"e:26;a",
$1:function(a){this.a.c9(a)}},
hp:{
"^":"fB;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gN:function(){return this.a.c},
gaa:function(){return this.a.d},
geJ:function(a){return 0},
eG:function(){this.e=!0},
as:function(){var z=0,y=new P.Z(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i
function $async$as(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:k=H
k=k
j=P
u=k.cX(new j.bC(Date.now(),!1))
k=v
t=k.a
k=E
k=k
j=Float64Array
i=H
s=new k.Q(new j(i.t(16)))
k=s
k.T()
k=E
k=k
j=Float64Array
i=H
r=new k.Q(new j(i.t(16)))
k=r
k.T()
k=G
q=new k.hj(null,null,null,null,s,[r],[])
k=q
j=t
k.c=j.a
k=q
k.d=t
k=q
k.ey()
k=q
k.R(0)
p=0,o=0
case 2:k=v
if(!k.b){z=4
break}k=P
k=k
j=P
z=5
return H.o(k.f0(new j.aF(3e4),null,null),$async$as,y)
case 5:n=Date.now()
m=n-u
t=u+m
k=v
k=k
j=C
j=j.b
k.ci(j.a5(t))
k=v
k=k
j=C
j=j.b
k.ci(j.a5(t))
p+=m
if(m<0);else ;++o
k=v
k.e=!0
z=p>40?6:7
break
case 6:k=q
k.R(0)
k=v
k=k.gM()
k.bi(v,q)
k=v
k.e=!1
case 7:z=o>300?8:9
break
case 8:k=C
k=k.b
l="###fps  "+k.d6(p,o)
k=H
k.ax(l)
p=0
o=0
case 9:case 3:u=n
z=2
break
case 4:return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$as,y,null)},
eW:function(){var z,y,x,w
z=P.aK()
y=new G.hy(this,z)
x=new G.hx(this,z)
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchcancel",!1),[null])
H.c(new W.u(0,w.a,w.b,W.v(x),w.c),[H.r(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchend",!1),[null])
H.c(new W.u(0,w.a,w.b,W.v(x),w.c),[H.r(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchenter",!1),[null])
H.c(new W.u(0,w.a,w.b,W.v(y),w.c),[H.r(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchleave",!1),[null])
H.c(new W.u(0,w.a,w.b,W.v(y),w.c),[H.r(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchmove",!1),[null])
H.c(new W.u(0,w.a,w.b,W.v(y),w.c),[H.r(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchstart",!1),[null])
H.c(new W.u(0,w.a,w.b,W.v(y),w.c),[H.r(w,0)]).v()},
eH:function(){var z,y
z={}
z.a=!1
y=J.ei(this.a.b)
H.c(new W.u(0,y.a,y.b,W.v(new G.hq(z,this)),y.c),[H.r(y,0)]).v()
y=J.eo(this.a.b)
H.c(new W.u(0,y.a,y.b,W.v(new G.hr(z,this)),y.c),[H.r(y,0)]).v()
y=J.ej(this.a.b)
H.c(new W.u(0,y.a,y.b,W.v(new G.hs(z)),y.c),[H.r(y,0)]).v()
y=J.ek(this.a.b)
H.c(new W.u(0,y.a,y.b,W.v(new G.ht(z,this)),y.c),[H.r(y,0)]).v()
y=J.el(this.a.b)
H.c(new W.u(0,y.a,y.b,W.v(new G.hu(z,this)),y.c),[H.r(y,0)]).v()
y=J.em(this.a.b)
H.c(new W.u(0,y.a,y.b,W.v(new G.hv(z)),y.c),[H.r(y,0)]).v()
y=J.en(this.a.b)
H.c(new W.u(0,y.a,y.b,W.v(new G.hw(z)),y.c),[H.r(y,0)]).v()}},
fB:{
"^":"b+hi;"},
hy:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
for(z=J.cq(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.a7)(z),++v){u=z[v]
t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
r=t-C.a.A(w.a.b.offsetLeft)
t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
q=s-C.a.A(w.a.b.offsetTop)
if(x.S(u.identifier)){t=w.gM()
s=u.identifier
if(typeof s!=="number")return s.m()
w.Y(t.c)
t.a_(w,s+1,"pointermove",r,q)
w.X()}else{x.q(0,u.identifier,u)
t=w.gM()
s=u.identifier
if(typeof s!=="number")return s.m()
w.Y(t.c)
t.a_(w,s+1,"pointerdown",r,q)
w.X()}}}},
hx:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=J.cq(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.a7)(z),++v){u=z[v]
if(x.S(u.identifier)){t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
s=C.a.A(w.a.b.offsetLeft)
r=C.a.A(u.pageX)
q=C.a.A(u.pageY)
new P.I(r,q).$builtinTypeInfo=[null]
r=C.a.A(w.a.b.offsetTop)
x.Z(0,u.identifier)
p=w.gM()
o=u.identifier
if(typeof o!=="number")return o.m()
w.Y(p.c)
p.a_(w,o+1,"pointerup",t-s,q-r)
w.X()}}}},
hq:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gM()
x=J.i(a)
w=x.gL(a)
w=w.gD(w)
w.toString
x=x.gL(a)
x=x.gO(x)
x.toString
z.Y(y.c)
y.a_(z,0,"pointerdown",w,x)
z.X()}},
hr:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gM()
w=J.i(a)
v=w.gL(a)
v=v.gD(v)
v.toString
w=w.gL(a)
w=w.gO(w)
w.toString
y.Y(x.c)
x.a_(y,0,"pointerup",v,w)
y.X()
z.a=!1}}},
hs:{
"^":"e:3;a",
$1:function(a){if(this.a.a);}},
ht:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gM()
w=J.i(a)
v=w.gL(a)
v=v.gD(v)
v.toString
w=w.gL(a)
w=w.gO(w)
w.toString
y.Y(x.c)
x.a_(y,0,"pointercancel",v,w)
y.X()
z.a=!1}}},
hu:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gM()
x=J.i(a)
w=x.gL(a)
w=w.gD(w)
w.toString
x=x.gL(a)
x=x.gO(x)
x.toString
z.Y(y.c)
y.a_(z,0,"pointermove",w,x)
z.X()}}},
hv:{
"^":"e:3;a",
$1:function(a){if(this.a.a);}},
hw:{
"^":"e:3;a",
$1:function(a){P.bq("over offset="+H.a(a.gff())+":"+H.a(a.gfg())+"  client="+H.a(a.gfd())+":"+H.a(a.gfe())+" screen="+H.a(a.gf1(a))+":"+H.a(a.gf2(a)))
if(this.a.a);}},
hn:{
"^":"e:2;a,b",
$1:function(a){this.a.aA(0,this.b)}},
ho:{
"^":"e:2;a,b",
$1:function(a){this.b.c9("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
Q:{
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
i:function(a){return"[0] "+this.aq(0).i(0)+"\n[1] "+this.aq(1).i(0)+"\n[2] "+this.aq(2).i(0)+"\n[3] "+this.aq(3).i(0)+"\n"},
gel:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.f(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=16)return H.f(z,b)
z[b]=c},
aq:function(a){var z,y,x
z=new Float64Array(H.t(4))
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
return new E.a4(z)},
b9:function(a){var z=new E.Q(new Float64Array(H.t(16)))
z.af(this)
return z},
E:function(a,b){var z,y,x
if(!!b.$isa4){z=new Float64Array(H.t(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a4(z)}if(!!b.$isa3){z=new Float64Array(H.t(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.a3(z)}if(4===b.gel()){z=new Float64Array(H.t(16))
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
return new E.Q(z)}throw H.d(P.aD(b))},
m:function(a,b){var z,y
z=new Float64Array(H.t(16))
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
return new E.Q(z)},
br:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.m(b)
y=!!z.$isa4
x=y?b.gN():1
if(!!z.$isa3||y){w=z.gD(b)
v=z.gO(b)
u=z.gf0(b)}else{u=d
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
bv:function(a,b,c,d){var z,y,x,w,v,u
z=J.m(b)
y=!!z.$isa4
x=y?b.gN():1
if(!!z.$isa3||y){w=z.gD(b)
v=z.gO(b)
u=z.gf0(b)}else{u=d
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
eD:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
a3:{
"^":"b;p:a<",
aL:function(a,b,c){var z=this.a
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
w=new E.a3(new Float64Array(H.t(3)))
w.aL(y,x,z)
return w},
E:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.D(b)
x=z[1]
z=z[2]
w=new E.a3(new Float64Array(H.t(3)))
w.aL(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.f(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=3)return H.f(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dN(y*y+x*x+z*z))},
b9:function(a){var z=new E.a3(new Float64Array(H.t(3)))
z.af(this)
return z},
gD:function(a){return this.a[0]},
gO:function(a){return this.a[1]}},
a4:{
"^":"b;p:a<",
bx:function(a,b,c,d){var z=this.a
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
v=new E.a4(new Float64Array(H.t(4)))
v.bx(y,x,w,z)
return v},
E:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.D(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a4(new Float64Array(H.t(4)))
v.bx(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.f(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=4)return H.f(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dN(y*y+x*x+w*w+z*z))},
b9:function(a){var z=new E.a4(new Float64Array(H.t(4)))
z.af(this)
return z},
gD:function(a){return this.a[0]},
gO:function(a){return this.a[1]},
gN:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cL.prototype
return J.fn.prototype}if(typeof a=="string")return J.aZ.prototype
if(a==null)return J.fo.prototype
if(typeof a=="boolean")return J.fm.prototype
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.bl(a)}
J.z=function(a){if(typeof a=="string")return J.aZ.prototype
if(a==null)return a
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.bl(a)}
J.aw=function(a){if(a==null)return a
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.bl(a)}
J.bk=function(a){if(typeof a=="number")return J.aI.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.c_.prototype
return a}
J.j_=function(a){if(typeof a=="number")return J.aI.prototype
if(typeof a=="string")return J.aZ.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.c_.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.b)return a
return J.bl(a)}
J.ay=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.j_(a).m(a,b)}
J.a8=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).n(a,b)}
J.dZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.bk(a).ar(a,b)}
J.e_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bk(a).aI(a,b)}
J.bt=function(a,b){if(a.constructor==Array||typeof a=="string"||H.jd(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.z(a).h(a,b)}
J.e0=function(a,b,c,d){return J.i(a).di(a,b,c,d)}
J.e1=function(a,b,c,d){return J.i(a).dK(a,b,c,d)}
J.e2=function(a){return J.i(a).dR(a)}
J.az=function(a,b,c){return J.i(a).dT(a,b,c)}
J.e3=function(a,b,c){return J.i(a).dU(a,b,c)}
J.e4=function(a,b){return J.i(a).dW(a,b)}
J.e5=function(a,b,c,d,e){return J.i(a).dX(a,b,c,d,e)}
J.e6=function(a,b,c,d){return J.i(a).dY(a,b,c,d)}
J.e7=function(a,b){return J.aw(a).e1(a,b)}
J.e8=function(a,b,c,d,e){return J.i(a).e2(a,b,c,d,e)}
J.e9=function(a,b){return J.i(a).e3(a,b)}
J.ea=function(a,b){return J.i(a).e4(a,b)}
J.cm=function(a,b,c,d,e){return J.i(a).e5(a,b,c,d,e)}
J.eb=function(a,b){return J.i(a).aA(a,b)}
J.bu=function(a,b,c){return J.z(a).e7(a,b,c)}
J.bv=function(a){return J.i(a).ea(a)}
J.ec=function(a){return J.i(a).eb(a)}
J.ed=function(a,b){return J.i(a).ec(a,b)}
J.ee=function(a,b){return J.i(a).ee(a,b)}
J.cn=function(a,b){return J.i(a).ef(a,b)}
J.co=function(a,b,c,d,e){return J.i(a).em(a,b,c,d,e)}
J.ef=function(a,b){return J.aw(a).W(a,b)}
J.cp=function(a,b){return J.i(a).en(a,b)}
J.bw=function(a,b){return J.i(a).eo(a,b)}
J.eg=function(a,b){return J.aw(a).B(a,b)}
J.cq=function(a){return J.i(a).ge_(a)}
J.S=function(a){return J.i(a).gaj(a)}
J.F=function(a){return J.m(a).gt(a)}
J.eh=function(a){return J.i(a).gk(a)}
J.aS=function(a){return J.aw(a).gC(a)}
J.aA=function(a){return J.z(a).gj(a)}
J.ei=function(a){return J.i(a).gcm(a)}
J.ej=function(a){return J.i(a).gcn(a)}
J.ek=function(a){return J.i(a).gco(a)}
J.el=function(a){return J.i(a).gcp(a)}
J.em=function(a){return J.i(a).gcq(a)}
J.en=function(a){return J.i(a).gcr(a)}
J.eo=function(a){return J.i(a).gcs(a)}
J.ep=function(a){return J.i(a).gbq(a)}
J.eq=function(a){return J.i(a).gl(a)}
J.er=function(a){return J.i(a).gD(a)}
J.bx=function(a,b,c){return J.i(a).cI(a,b,c)}
J.es=function(a){return J.i(a).cJ(a)}
J.et=function(a,b){return J.i(a).cK(a,b)}
J.aB=function(a,b,c){return J.i(a).cO(a,b,c)}
J.eu=function(a,b){return J.i(a).cj(a,b)}
J.ev=function(a,b){return J.aw(a).ab(a,b)}
J.ak=function(a,b){return J.i(a).aK(a,b)}
J.ew=function(a,b){return J.i(a).sk(a,b)}
J.ex=function(a,b){return J.i(a).sU(a,b)}
J.ey=function(a,b){return J.i(a).sl(a,b)}
J.cr=function(a,b,c,d){return J.i(a).cZ(a,b,c,d)}
J.cs=function(a,b,c,d){return J.i(a).d_(a,b,c,d)}
J.aT=function(a,b,c,d){return J.i(a).eT(a,b,c,d)}
J.X=function(a){return J.bk(a).eU(a)}
J.ct=function(a){return J.bk(a).a5(a)}
J.aC=function(a){return J.m(a).i(a)}
J.ez=function(a,b,c,d,e,f){return J.i(a).eX(a,b,c,d,e,f)}
J.eA=function(a,b,c,d){return J.i(a).eY(a,b,c,d)}
J.by=function(a,b){return J.i(a).eZ(a,b)}
J.bz=function(a,b,c,d,e,f,g){return J.i(a).f_(a,b,c,d,e,f,g)}
I.ci=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.o=W.f4.prototype
C.d=J.aH.prototype
C.b=J.cL.prototype
C.a=J.aI.prototype
C.e=J.aZ.prototype
C.y=J.fD.prototype
C.z=P.fJ.prototype
C.A=J.c_.prototype
C.l=new H.cE()
C.m=new P.fC()
C.n=new P.hO()
C.c=new P.il()
C.f=new P.aF(0)
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
C.j=H.c(I.ci([127,2047,65535,1114111]),[P.k])
C.x=new H.f2([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.k=new F.hh(0)
$.cY="$cachedFunction"
$.cZ="$cachedInvocation"
$.P=0
$.al=null
$.cu=null
$.ce=null
$.dJ=null
$.dV=null
$.bi=null
$.bn=null
$.cf=null
$.ag=null
$.as=null
$.at=null
$.c9=!1
$.l=C.c
$.cG=0
$.cB=null
$.cA=null
$.cz=null
$.cy=null
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
I.$lazy(y,x,w)}})(["cJ","$get$cJ",function(){return H.fh()},"cK","$get$cK",function(){return new P.eY(null)},"dg","$get$dg",function(){return H.R(H.bc({toString:function(){return"$receiver$"}}))},"dh","$get$dh",function(){return H.R(H.bc({$method$:null,toString:function(){return"$receiver$"}}))},"di","$get$di",function(){return H.R(H.bc(null))},"dj","$get$dj",function(){return H.R(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dn","$get$dn",function(){return H.R(H.bc(void 0))},"dp","$get$dp",function(){return H.R(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dl","$get$dl",function(){return H.R(H.dm(null))},"dk","$get$dk",function(){return H.R(function(){try{null.$method$}catch(z){return z.message}}())},"dr","$get$dr",function(){return H.R(H.dm(void 0))},"dq","$get$dq",function(){return H.R(function(){try{(void 0).$method$}catch(z){return z.message}}())},"c2","$get$c2",function(){return P.hC()},"au","$get$au",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bN]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.a1]},{func:1,args:[P.U]},{func:1,args:[,],opt:[,]},{func:1,ret:P.U,args:[P.k]},{func:1,args:[W.bY]},{func:1,args:[,P.U]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.a1]},{func:1,ret:P.cb},{func:1,void:true,args:[P.b],opt:[P.a1]},{func:1,void:true,args:[,P.a1]},{func:1,args:[,,]},{func:1,ret:P.k,args:[,P.k]},{func:1,void:true,args:[P.k,P.k]},{func:1,args:[P.d4,,]},{func:1,args:[P.U,,]},{func:1,ret:P.k,args:[,]},{func:1,args:[P.k]},{func:1,args:[P.k,,]},{func:1,args:[F.bU]},{func:1,ret:P.O,args:[W.aM]},{func:1,args:[W.aM]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.jl(d||a)
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
Isolate.ci=a.ci
Isolate.bj=a.bj
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dX(F.dT(),b)},[])
else (function(b){H.dX(F.dT(),b)})([])})})()