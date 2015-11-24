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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cC"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cC"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cC(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aB=function(){}
var dart=[["","",,H,{
"^":"",
lb:{
"^":"a;a"}}],["","",,J,{
"^":"",
q:function(a){return void 0},
bI:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bE:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cE==null){H.ke()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.co("Return interceptor for "+H.b(y(a,z))))}w=H.kn(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.N
else return C.P}return w},
h:{
"^":"a;",
u:function(a,b){return a===b},
gE:function(a){return H.af(a)},
k:["dN",function(a){return H.br(a)}],
"%":"CanvasRenderingContext2D|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
h3:{
"^":"h;",
k:function(a){return String(a)},
gE:function(a){return a?519018:218159},
$iscA:1},
h4:{
"^":"h;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gE:function(a){return 0}},
df:{
"^":"h;",
gE:function(a){return 0},
$ish5:1},
hq:{
"^":"df;"},
cp:{
"^":"df;",
k:function(a){return String(a)}},
aU:{
"^":"h;",
bE:function(a,b){if(!!a.immutable$list)throw H.d(new P.T(b))},
b3:function(a,b){if(!!a.fixed$length)throw H.d(new P.T(b))},
d5:function(a,b){this.b3(a,"removeAt")
if(b>=a.length)throw H.d(P.aZ(b,null,null))
return a.splice(b,1)[0]},
a9:function(a,b){var z
this.b3(a,"remove")
for(z=0;z<a.length;++z)if(J.E(a[z],b)){a.splice(z,1)
return!0}return!1},
I:function(a,b){var z,y
this.b3(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.L)(b),++y)a.push(b[y])},
O:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.R(a))}},
aC:function(a,b){return H.e(new H.c_(a,b),[null,null])},
cS:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.f(y,x)
y[x]=w}return y.join(b)},
a3:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
gF:function(a){if(a.length>0)return a[0]
throw H.d(H.bW())},
gaB:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.bW())},
c4:function(a,b,c,d,e){var z,y,x
this.bE(a,"set range")
P.bt(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.M(P.ag(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.h1())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
dI:function(a,b){var z
this.bE(a,"sort")
z=P.k8()
H.b0(a,0,a.length-1,z)},
c6:function(a){return this.dI(a,null)},
k:function(a){return P.be(a,"[","]")},
gJ:function(a){return new J.cW(a,a.length,0,null)},
gE:function(a){return H.af(a)},
gp:function(a){return a.length},
sp:function(a,b){this.b3(a,"set length")
if(b<0)throw H.d(P.ag(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.H(a,b))
if(b>=a.length||b<0)throw H.d(H.H(a,b))
return a[b]},
m:function(a,b,c){this.bE(a,"indexed set")
if(b>=a.length||b<0)throw H.d(H.H(a,b))
a[b]=c},
$isbf:1,
$ism:1,
$asm:null,
$isw:1},
la:{
"^":"aU;"},
cW:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
C:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(new P.R(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aV:{
"^":"h;",
az:function(a,b){var z
if(typeof b!=="number")throw H.d(H.Q(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbK(b)
if(this.gbK(a)===z)return 0
if(this.gbK(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gfv(b))return 0
return 1}else return-1},
gbK:function(a){return a===0?1/a<0:a<0},
gfv:function(a){return isNaN(a)},
bU:function(a,b){return a%b},
aE:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.T(""+a))},
M:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.T(""+a))},
fT:function(a){return a},
be:function(a,b){var z,y,x,w
H.cB(b)
if(b<2||b>36)throw H.d(P.ag(b,2,36,"radix",null))
z=a.toString(b)
if(C.h.bG(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.M(new P.T("Unexpected toString result: "+z))
x=J.F(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.h.n("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gE:function(a){return a&0x1FFFFFFF},
l:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a+b},
L:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a-b},
n:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a*b},
c2:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
c7:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aE(a/b)},
ao:function(a,b){return(a|0)===a?a/b|0:this.aE(a/b)},
b1:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ai:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a<b},
ah:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a>b},
bh:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a>=b},
$isan:1},
de:{
"^":"aV;",
$isan:1,
$isn:1},
dd:{
"^":"aV;",
$isan:1},
bg:{
"^":"h;",
bG:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.H(a,b))
if(b<0)throw H.d(H.H(a,b))
if(b>=a.length)throw H.d(H.H(a,b))
return a.charCodeAt(b)},
l:function(a,b){if(typeof b!=="string")throw H.d(P.f7(b,null,null))
return a+b},
dM:function(a,b,c){H.cB(b)
if(c==null)c=a.length
H.cB(c)
if(b<0)throw H.d(P.aZ(b,null,null))
if(typeof c!=="number")return H.A(c)
if(b>c)throw H.d(P.aZ(b,null,null))
if(c>a.length)throw H.d(P.aZ(c,null,null))
return a.substring(b,c)},
dL:function(a,b){return this.dM(a,b,null)},
n:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.z)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
eU:function(a,b,c){if(c>a.length)throw H.d(P.ag(c,0,a.length,null,null))
return H.ks(a,b,c)},
ga4:function(a){return a.length===0},
az:function(a,b){var z
if(typeof b!=="string")throw H.d(H.Q(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gE:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gp:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.H(a,b))
if(b>=a.length||b<0)throw H.d(H.H(a,b))
return a[b]},
$isbf:1,
$isa7:1}}],["","",,H,{
"^":"",
b2:function(a,b){var z=a.aN(b)
if(!init.globalState.d.cy)init.globalState.f.aT()
return z},
bH:function(){--init.globalState.f.b},
eu:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.q(y).$ism)throw H.d(P.aR("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.jp(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$db()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.iZ(P.bY(null,H.b1),0)
y.z=P.bj(null,null,null,P.n,H.cw)
y.ch=P.bj(null,null,null,P.n,null)
if(y.x===!0){x=new H.jo()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fV,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jq)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.bj(null,null,null,P.n,H.bu)
w=P.aF(null,null,null,P.n)
v=new H.bu(0,null,!1)
u=new H.cw(y,x,w,init.createNewIsolate(),v,new H.ap(H.bJ()),new H.ap(H.bJ()),!1,!1,[],P.aF(null,null,null,null),null,null,!1,!0,P.aF(null,null,null,null))
w.ay(0,0)
u.c9(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.b4()
x=H.aA(y,[y]).an(a)
if(x)u.aN(new H.kq(z,a))
else{y=H.aA(y,[y,y]).an(a)
if(y)u.aN(new H.kr(z,a))
else u.aN(a)}init.globalState.f.aT()},
fZ:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.h_()
return},
h_:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.T("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.T("Cannot extract URI from \""+H.b(z)+"\""))},
fV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bx(!0,[]).ap(b.data)
y=J.F(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bx(!0,[]).ap(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bx(!0,[]).ap(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.bj(null,null,null,P.n,H.bu)
p=P.aF(null,null,null,P.n)
o=new H.bu(0,null,!1)
n=new H.cw(y,q,p,init.createNewIsolate(),o,new H.ap(H.bJ()),new H.ap(H.bJ()),!1,!1,[],P.aF(null,null,null,null),null,null,!1,!0,P.aF(null,null,null,null))
p.ay(0,0)
n.c9(0,o)
init.globalState.f.a.ak(new H.b1(n,new H.fW(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aT()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aD(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aT()
break
case"close":init.globalState.ch.a9(0,$.$get$dc().h(0,a))
a.terminate()
init.globalState.f.aT()
break
case"log":H.fU(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.au(["command","print","msg",z])
q=new H.aw(!0,P.as(null,P.n)).a0(q)
y.toString
self.postMessage(q)}else P.a9(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
fU:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.au(["command","log","msg",a])
x=new H.aw(!0,P.as(null,P.n)).a0(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.O(w)
throw H.d(P.bd(z))}},
fX:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dA=$.dA+("_"+y)
$.dB=$.dB+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aD(f,["spawned",new H.bz(y,x),w,z.r])
x=new H.fY(a,b,c,d,z)
if(e===!0){z.cG(w,w)
init.globalState.f.a.ak(new H.b1(z,x,"start isolate"))}else x.$0()},
jM:function(a){return new H.bx(!0,[]).ap(new H.aw(!1,P.as(null,P.n)).a0(a))},
kq:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
kr:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jp:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{jq:function(a){var z=P.au(["command","print","msg",a])
return new H.aw(!0,P.as(null,P.n)).a0(z)}}},
cw:{
"^":"a;a,b,c,fw:d<,eV:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cG:function(a,b){if(!this.f.u(0,a))return
if(this.Q.ay(0,b)&&!this.y)this.y=!0
this.bA()},
fM:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a9(0,a)
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
if(w===y.c)y.ck();++y.d}this.y=!1}this.bA()},
eA:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fL:function(a){var z,y,x
if(this.ch==null)return
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.M(new P.T("removeRange"))
P.bt(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dF:function(a,b){if(!this.r.u(0,a))return
this.db=b},
fk:function(a,b,c){var z=J.q(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){J.aD(a,c)
return}z=this.cx
if(z==null){z=P.bY(null,null)
this.cx=z}z.ak(new H.jf(a,c))},
fi:function(a,b){var z
if(!this.r.u(0,a))return
z=J.q(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.bL()
return}z=this.cx
if(z==null){z=P.bY(null,null)
this.cx=z}z.ak(this.gfA())},
fl:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.a9(a)
if(b!=null)P.a9(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aQ(a)
y[1]=b==null?null:J.aQ(b)
for(x=new P.dg(z,z.r,null,null),x.c=z.e;x.C();)J.aD(x.d,y)},
aN:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.O(u)
this.fl(w,v)
if(this.db===!0){this.bL()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfw()
if(this.cx!=null)for(;t=this.cx,!t.ga4(t);)this.cx.d6().$0()}return y},
cU:function(a){return this.b.h(0,a)},
c9:function(a,b){var z=this.b
if(z.X(a))throw H.d(P.bd("Registry: ports must be registered only once."))
z.m(0,a,b)},
bA:function(){var z=this.b
if(z.gp(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.bL()},
bL:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.V(0)
for(z=this.b,y=z.gdj(z),y=y.gJ(y);y.C();)y.gG().e9()
z.V(0)
this.c.V(0)
init.globalState.z.a9(0,this.a)
this.dx.V(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
J.aD(w,z[v])}this.ch=null}},"$0","gfA",0,0,2]},
jf:{
"^":"c:2;a,b",
$0:function(){J.aD(this.a,this.b)}},
iZ:{
"^":"a;a,b",
f2:function(){var z=this.a
if(z.b===z.c)return
return z.d6()},
de:function(){var z,y,x
z=this.f2()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.X(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga4(y)}else y=!1
else y=!1
else y=!1
if(y)H.M(P.bd("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga4(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.au(["command","close"])
x=new H.aw(!0,P.as(null,P.n)).a0(x)
y.toString
self.postMessage(x)}return!1}z.fK()
return!0},
cv:function(){if(self.window!=null)new H.j_(this).$0()
else for(;this.de(););},
aT:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cv()
else try{this.cv()}catch(x){w=H.B(x)
z=w
y=H.O(x)
w=init.globalState.Q
v=P.au(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.aw(!0,P.as(null,P.n)).a0(v)
w.toString
self.postMessage(v)}}},
j_:{
"^":"c:2;a",
$0:function(){if(!this.a.de())return
P.ch(C.t,this)}},
b1:{
"^":"a;a,b,c",
fK:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aN(this.b)}},
jo:{
"^":"a;"},
fW:{
"^":"c:0;a,b,c,d,e,f",
$0:function(){H.fX(this.a,this.b,this.c,this.d,this.e,this.f)}},
fY:{
"^":"c:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.b4()
w=H.aA(x,[x,x]).an(y)
if(w)y.$2(this.b,this.c)
else{x=H.aA(x,[x]).an(y)
if(x)y.$1(this.b)
else y.$0()}}z.bA()}},
e1:{
"^":"a;"},
bz:{
"^":"e1;b,a",
bj:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcn())return
x=H.jM(b)
if(z.geV()===y){y=J.F(x)
switch(y.h(x,0)){case"pause":z.cG(y.h(x,1),y.h(x,2))
break
case"resume":z.fM(y.h(x,1))
break
case"add-ondone":z.eA(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fL(y.h(x,1))
break
case"set-errors-fatal":z.dF(y.h(x,1),y.h(x,2))
break
case"ping":z.fk(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fi(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.ay(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a9(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(b)
y.a.ak(new H.b1(z,new H.js(this,x),w))},
u:function(a,b){if(b==null)return!1
return b instanceof H.bz&&J.E(this.b,b.b)},
gE:function(a){return this.b.gbv()}},
js:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gcn())z.e5(this.b)}},
cx:{
"^":"e1;b,c,a",
bj:function(a,b){var z,y,x
z=P.au(["command","message","port",this,"msg",b])
y=new H.aw(!0,P.as(null,P.n)).a0(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.cx&&J.E(this.b,b.b)&&J.E(this.a,b.a)&&J.E(this.c,b.c)},
gE:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.dH()
y=this.a
if(typeof y!=="number")return y.dH()
x=this.c
if(typeof x!=="number")return H.A(x)
return(z<<16^y<<8^x)>>>0}},
bu:{
"^":"a;bv:a<,b,cn:c<",
e9:function(){this.c=!0
this.b=null},
e5:function(a){if(this.c)return
this.ei(a)},
ei:function(a){return this.b.$1(a)},
$ishE:1},
ib:{
"^":"a;a,b,c",
e_:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ak(new H.b1(y,new H.id(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aN(new H.ie(this,b),0),a)}else throw H.d(new P.T("Timer greater than 0."))},
static:{ic:function(a,b){var z=new H.ib(!0,!1,null)
z.e_(a,b)
return z}}},
id:{
"^":"c:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
ie:{
"^":"c:2;a,b",
$0:function(){this.a.c=null
H.bH()
this.b.$0()}},
ap:{
"^":"a;bv:a<",
gE:function(a){var z=this.a
if(typeof z!=="number")return z.fX()
z=C.b.b1(z,0)^C.b.ao(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ap){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aw:{
"^":"a;a,b",
a0:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gp(z))
z=J.q(a)
if(!!z.$isdq)return["buffer",a]
if(!!z.$isc5)return["typed",a]
if(!!z.$isbf)return this.dB(a)
if(!!z.$isfT){x=this.gdw()
w=a.gaf()
w=H.bl(w,x,H.Y(w,"V",0),null)
w=P.bZ(w,!0,H.Y(w,"V",0))
z=z.gdj(a)
z=H.bl(z,x,H.Y(z,"V",0),null)
return["map",w,P.bZ(z,!0,H.Y(z,"V",0))]}if(!!z.$ish5)return this.dC(a)
if(!!z.$ish)this.di(a)
if(!!z.$ishE)this.aU(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbz)return this.dD(a)
if(!!z.$iscx)return this.dE(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.aU(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isap)return["capability",a.a]
if(!(a instanceof P.a))this.di(a)
return["dart",init.classIdExtractor(a),this.dA(init.classFieldsExtractor(a))]},"$1","gdw",2,0,1],
aU:function(a,b){throw H.d(new P.T(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
di:function(a){return this.aU(a,null)},
dB:function(a){var z=this.dz(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aU(a,"Can't serialize indexable: ")},
dz:function(a){var z,y,x
z=[]
C.a.sp(z,a.length)
for(y=0;y<a.length;++y){x=this.a0(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
dA:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.a0(a[z]))
return a},
dC:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aU(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sp(y,z.length)
for(x=0;x<z.length;++x){w=this.a0(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
dE:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dD:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbv()]
return["raw sendport",a]}},
bx:{
"^":"a;a,b",
ap:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.aR("Bad serialized message: "+H.b(a)))
switch(C.a.gF(a)){case"ref":if(1>=a.length)return H.f(a,1)
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
y=this.aL(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.aL(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.aL(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.aL(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.f5(a)
case"sendport":return this.f6(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.f4(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.ap(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aL(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.b(a))}},"$1","gf3",2,0,1],
aL:function(a){var z,y,x
z=J.F(a)
y=0
while(!0){x=z.gp(a)
if(typeof x!=="number")return H.A(x)
if(!(y<x))break
z.m(a,y,this.ap(z.h(a,y)));++y}return a},
f5:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.at()
this.b.push(w)
y=J.f3(y,this.gf3()).bX(0)
for(z=J.F(y),v=J.F(x),u=0;u<z.gp(y);++u){if(u>=y.length)return H.f(y,u)
w.m(0,y[u],this.ap(v.h(x,u)))}return w},
f6:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.E(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cU(w)
if(u==null)return
t=new H.bz(u,x)}else t=new H.cx(y,w,x)
this.b.push(t)
return t},
f4:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.F(y)
v=J.F(x)
u=0
while(!0){t=z.gp(y)
if(typeof t!=="number")return H.A(t)
if(!(u<t))break
w[z.h(y,u)]=this.ap(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
fr:function(){throw H.d(new P.T("Cannot modify unmodifiable Map"))},
k9:function(a){return init.types[a]},
km:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.q(a).$isbh},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aQ(a)
if(typeof z!=="string")throw H.d(H.Q(a))
return z},
af:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dy:function(a,b){throw H.d(new P.aq(a,null,null))},
hA:function(a,b,c){var z,y
H.jZ(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.dy(a,c)
if(3>=z.length)return H.f(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.dy(a,c)},
cd:function(a){var z,y
z=C.u(J.q(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.h.bG(z,0)===36)z=C.h.dL(z,1)
return(z+H.cG(H.bF(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
br:function(a){return"Instance of '"+H.cd(a)+"'"},
hB:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
bs:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.b1(z,10))>>>0,56320|z&1023)}throw H.d(P.ag(a,0,1114111,null,null))},
S:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dz:function(a){return a.b?H.S(a).getUTCMilliseconds()+0:H.S(a).getMilliseconds()+0},
bq:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.Q(a))
return a[b]},
ce:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.Q(a))
a[b]=c},
A:function(a){throw H.d(H.Q(a))},
f:function(a,b){if(a==null)J.aP(a)
throw H.d(H.H(a,b))},
H:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ao(!0,b,"index",null)
z=J.aP(a)
if(!(b<0)){if(typeof z!=="number")return H.A(z)
y=b>=z}else y=!0
if(y)return P.bV(b,a,"index",null,z)
return P.aZ(b,"index",null)},
Q:function(a){return new P.ao(!0,a,null,null)},
a4:function(a){return a},
cB:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.Q(a))
return a},
jZ:function(a){if(typeof a!=="string")throw H.d(H.Q(a))
return a},
d:function(a){var z
if(a==null)a=new P.dw()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.ev})
z.name=""}else z.toString=H.ev
return z},
ev:function(){return J.aQ(this.dartException)},
M:function(a){throw H.d(a)},
L:function(a){throw H.d(new P.R(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.kv(a)
if(a==null)return
if(a instanceof H.bT)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.b1(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bX(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.dv(v,null))}}if(a instanceof TypeError){u=$.$get$dN()
t=$.$get$dO()
s=$.$get$dP()
r=$.$get$dQ()
q=$.$get$dU()
p=$.$get$dV()
o=$.$get$dS()
$.$get$dR()
n=$.$get$dX()
m=$.$get$dW()
l=u.a6(y)
if(l!=null)return z.$1(H.bX(y,l))
else{l=t.a6(y)
if(l!=null){l.method="call"
return z.$1(H.bX(y,l))}else{l=s.a6(y)
if(l==null){l=r.a6(y)
if(l==null){l=q.a6(y)
if(l==null){l=p.a6(y)
if(l==null){l=o.a6(y)
if(l==null){l=r.a6(y)
if(l==null){l=n.a6(y)
if(l==null){l=m.a6(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dv(y,l==null?null:l.method))}}return z.$1(new H.iI(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dE()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ao(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dE()
return a},
O:function(a){var z
if(a instanceof H.bT)return a.b
if(a==null)return new H.e6(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.e6(a,null)},
kp:function(a){if(a==null||typeof a!='object')return J.I(a)
else return H.af(a)},
em:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
kg:function(a,b,c,d,e,f,g){var z=J.q(c)
if(z.u(c,0))return H.b2(b,new H.kh(a))
else if(z.u(c,1))return H.b2(b,new H.ki(a,d))
else if(z.u(c,2))return H.b2(b,new H.kj(a,d,e))
else if(z.u(c,3))return H.b2(b,new H.kk(a,d,e,f))
else if(z.u(c,4))return H.b2(b,new H.kl(a,d,e,f,g))
else throw H.d(P.bd("Unsupported number of arguments for wrapped closure"))},
aN:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.kg)
a.$identity=z
return z},
fo:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.q(c).$ism){z.$reflectionInfo=c
x=H.hH(z).r}else x=c
w=d?Object.create(new H.hZ().constructor.prototype):Object.create(new H.bP(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a5
$.a5=J.r(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.d_(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.k9(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cY:H.bQ
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.d_(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
fl:function(a,b,c,d){var z=H.bQ
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
d_:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fn(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fl(y,!w,z,b)
if(y===0){w=$.aE
if(w==null){w=H.bb("self")
$.aE=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.a5
$.a5=J.r(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aE
if(v==null){v=H.bb("self")
$.aE=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.a5
$.a5=J.r(w,1)
return new Function(v+H.b(w)+"}")()},
fm:function(a,b,c,d){var z,y
z=H.bQ
y=H.cY
switch(b?-1:a){case 0:throw H.d(new H.hK("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fn:function(a,b){var z,y,x,w,v,u,t,s
z=H.fc()
y=$.cX
if(y==null){y=H.bb("receiver")
$.cX=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fm(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.a5
$.a5=J.r(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.a5
$.a5=J.r(u,1)
return new Function(y+H.b(u)+"}")()},
cC:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.q(c).$ism){c.fixed$length=Array
z=c}else z=c
return H.fo(a,b,z,!!d,e,f)},
ku:function(a){throw H.d(new P.fv("Cyclic initialization for static "+H.b(a)))},
aA:function(a,b,c){return new H.hL(a,b,c,null)},
b4:function(){return C.y},
bJ:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
k:function(a,b,c){var z
if(b===0){J.eI(c,a)
return}else if(b===1){c.cK(H.B(a),H.O(a))
return}if(!!J.q(a).$isa2)z=a
else{z=H.e(new P.G(0,$.p,null),[null])
z.aJ(a)}z.bd(H.eg(b,0),new H.jV(b))
return c.gfh()},
eg:function(a,b){return new H.jT(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
e:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bF:function(a){if(a==null)return
return a.$builtinTypeInfo},
en:function(a,b){return H.cL(a["$as"+H.b(b)],H.bF(a))},
Y:function(a,b,c){var z=H.en(a,b)
return z==null?null:z[c]},
D:function(a,b){var z=H.bF(a)
return z==null?null:z[b]},
cK:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cG(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.k(a)
else return},
cG:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bv("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.cK(u,c))}return w?"":"<"+H.b(z)+">"},
cL:function(a,b){if(typeof a=="function"){a=H.cF(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cF(a,null,b)}return b},
k_:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bF(a)
y=J.q(a)
if(y[b]==null)return!1
return H.ej(H.cL(y[d],z),c)},
kt:function(a,b,c,d){if(a!=null&&!H.k_(a,b,c,d))throw H.d(H.fe(H.cd(a),(b.substring(3)+H.cG(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
ej:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.Z(a[y],b[y]))return!1
return!0},
bC:function(a,b,c){return H.cF(a,b,H.en(b,c))},
Z:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eo(a,b)
if('func' in a)return b.builtin$cls==="fG"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cK(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.cK(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ej(H.cL(v,z),x)},
ei:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.Z(z,v)||H.Z(v,z)))return!1}return!0},
jU:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.Z(v,u)||H.Z(u,v)))return!1}return!0},
eo:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.Z(z,y)||H.Z(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.ei(x,w,!1))return!1
if(!H.ei(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.Z(o,n)||H.Z(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.Z(o,n)||H.Z(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.Z(o,n)||H.Z(n,o)))return!1}}return H.jU(a.named,b.named)},
cF:function(a,b,c){return a.apply(b,c)},
m6:function(a){var z=$.cD
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
m5:function(a){return H.af(a)},
m4:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
kn:function(a){var z,y,x,w,v,u
z=$.cD.$1(a)
y=$.bD[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bG[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eh.$2(a,z)
if(z!=null){y=$.bD[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bG[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cI(x)
$.bD[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bG[z]=x
return x}if(v==="-"){u=H.cI(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.er(a,x)
if(v==="*")throw H.d(new P.co(z))
if(init.leafTags[z]===true){u=H.cI(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.er(a,x)},
er:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bI(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cI:function(a){return J.bI(a,!1,null,!!a.$isbh)},
ko:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bI(z,!1,null,!!z.$isbh)
else return J.bI(z,c,null,null)},
ke:function(){if(!0===$.cE)return
$.cE=!0
H.kf()},
kf:function(){var z,y,x,w,v,u,t,s
$.bD=Object.create(null)
$.bG=Object.create(null)
H.ka()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.es.$1(v)
if(u!=null){t=H.ko(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ka:function(){var z,y,x,w,v,u,t
z=C.G()
z=H.az(C.D,H.az(C.I,H.az(C.v,H.az(C.v,H.az(C.H,H.az(C.E,H.az(C.F(C.u),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cD=new H.kb(v)
$.eh=new H.kc(u)
$.es=new H.kd(t)},
az:function(a,b){return a(b)||b},
ks:function(a,b,c){return a.indexOf(b,c)>=0},
fq:{
"^":"a;",
k:function(a){return P.c0(this)},
m:function(a,b,c){return H.fr()}},
bU:{
"^":"fq;a",
b_:function(){var z=this.$map
if(z==null){z=new H.aW(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.em(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.b_().h(0,b)},
O:function(a,b){this.b_().O(0,b)},
gaf:function(){return this.b_().gaf()},
gp:function(a){var z=this.b_()
return z.gp(z)}},
hG:{
"^":"a;a,b,c,d,e,f,r,x",
static:{hH:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hG(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
iH:{
"^":"a;a,b,c,d,e,f",
a6:function(a){var z,y,x
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
static:{a8:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iH(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bw:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},dT:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dv:{
"^":"N;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
h7:{
"^":"N;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bX:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.h7(a,y,z?null:b.receiver)}}},
iI:{
"^":"N;a",
k:function(a){var z=this.a
return C.h.ga4(z)?"Error":"Error: "+z}},
kv:{
"^":"c:1;a",
$1:function(a){if(!!J.q(a).$isN)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
e6:{
"^":"a;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
kh:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
ki:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
kj:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
kk:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
kl:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"a;",
k:function(a){return"Closure '"+H.cd(this)+"'"},
gdk:function(){return this},
gdk:function(){return this}},
dH:{
"^":"c;"},
hZ:{
"^":"dH;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bP:{
"^":"dH;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bP))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gE:function(a){var z,y
z=this.c
if(z==null)y=H.af(this.a)
else y=typeof z!=="object"?J.I(z):H.af(z)
z=H.af(this.b)
if(typeof y!=="number")return y.fY()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.br(z)},
static:{bQ:function(a){return a.a},cY:function(a){return a.c},fc:function(){var z=$.aE
if(z==null){z=H.bb("self")
$.aE=z}return z},bb:function(a){var z,y,x,w,v
z=new H.bP("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fd:{
"^":"N;a",
k:function(a){return this.a},
static:{fe:function(a,b){return new H.fd("CastError: Casting value of type "+H.b(a)+" to incompatible type "+H.b(b))}}},
hK:{
"^":"N;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
dD:{
"^":"a;"},
hL:{
"^":"dD;a,b,c,d",
an:function(a){var z=this.ed(a)
return z==null?!1:H.eo(z,this.aF())},
ed:function(a){var z=J.q(a)
return"$signature" in z?z.$signature():null},
aF:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.q(y)
if(!!x.$islP)z.void=true
else if(!x.$isd6)z.ret=y.aF()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dC(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dC(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.el(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aF()}z.named=w}return z},
k:function(a){var z,y,x,w,v,u,t,s
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
t=H.el(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].aF())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{dC:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aF())
return z}}},
d6:{
"^":"dD;",
k:function(a){return"dynamic"},
aF:function(){return}},
bT:{
"^":"a;a,a1:b<"},
jV:{
"^":"c:6;a",
$2:function(a,b){H.eg(this.a,1).$1(new H.bT(a,b))}},
jT:{
"^":"c:1;a,b",
$1:function(a){this.b(this.a,a)}},
aW:{
"^":"a;a,b,c,d,e,f,r",
gp:function(a){return this.a},
ga4:function(a){return this.a===0},
gaf:function(){return H.e(new H.h9(this),[H.D(this,0)])},
gdj:function(a){return H.bl(this.gaf(),new H.h6(this),H.D(this,0),H.D(this,1))},
X:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cf(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cf(y,a)}else return this.fp(a)},
fp:function(a){var z=this.d
if(z==null)return!1
return this.aP(this.ad(z,this.aO(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ad(z,b)
return y==null?null:y.gas()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ad(x,b)
return y==null?null:y.gas()}else return this.fq(b)},
fq:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ad(z,this.aO(a))
x=this.aP(y,a)
if(x<0)return
return y[x].gas()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bx()
this.b=z}this.c8(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bx()
this.c=y}this.c8(y,b,c)}else this.ft(b,c)},
ft:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bx()
this.d=z}y=this.aO(a)
x=this.ad(z,y)
if(x==null)this.bz(z,y,[this.by(a,b)])
else{w=this.aP(x,a)
if(w>=0)x[w].sas(b)
else x.push(this.by(a,b))}},
a9:function(a,b){if(typeof b==="string")return this.cu(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cu(this.c,b)
else return this.fs(b)},
fs:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ad(z,this.aO(a))
x=this.aP(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cD(w)
return w.gas()},
V:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
O:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.R(this))
z=z.c}},
c8:function(a,b,c){var z=this.ad(a,b)
if(z==null)this.bz(a,b,this.by(b,c))
else z.sas(c)},
cu:function(a,b){var z
if(a==null)return
z=this.ad(a,b)
if(z==null)return
this.cD(z)
this.cg(a,b)
return z.gas()},
by:function(a,b){var z,y
z=new H.h8(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cD:function(a){var z,y
z=a.ger()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aO:function(a){return J.I(a)&0x3ffffff},
aP:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gcQ(),b))return y
return-1},
k:function(a){return P.c0(this)},
ad:function(a,b){return a[b]},
bz:function(a,b,c){a[b]=c},
cg:function(a,b){delete a[b]},
cf:function(a,b){return this.ad(a,b)!=null},
bx:function(){var z=Object.create(null)
this.bz(z,"<non-identifier-key>",z)
this.cg(z,"<non-identifier-key>")
return z},
$isfT:1},
h6:{
"^":"c:1;a",
$1:function(a){return this.a.h(0,a)}},
h8:{
"^":"a;cQ:a<,as:b@,c,er:d<"},
h9:{
"^":"V;a",
gp:function(a){return this.a.a},
gJ:function(a){var z,y
z=this.a
y=new H.ha(z,z.r,null,null)
y.c=z.e
return y},
O:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.R(z))
y=y.c}},
$isw:1},
ha:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.R(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
kb:{
"^":"c:1;a",
$1:function(a){return this.a(a)}},
kc:{
"^":"c:10;a",
$2:function(a,b){return this.a(a,b)}},
kd:{
"^":"c:3;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bW:function(){return new P.aH("No element")},
h1:function(){return new P.aH("Too few elements")},
b0:function(a,b,c,d){if(c-b<=32)H.hS(a,b,c,d)
else H.hR(a,b,c,d)},
hS:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.F(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.U(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.m(a,w,y.h(a,v))
w=v}y.m(a,w,x)}},
hR:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.ao(c-b+1,6)
y=b+z
x=c-z
w=C.c.ao(b+c,2)
v=w-z
u=w+z
t=J.F(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.U(d.$2(s,r),0)){n=r
r=s
s=n}if(J.U(d.$2(p,o),0)){n=o
o=p
p=n}if(J.U(d.$2(s,q),0)){n=q
q=s
s=n}if(J.U(d.$2(r,q),0)){n=q
q=r
r=n}if(J.U(d.$2(s,p),0)){n=p
p=s
s=n}if(J.U(d.$2(q,p),0)){n=p
p=q
q=n}if(J.U(d.$2(r,o),0)){n=o
o=r
r=n}if(J.U(d.$2(r,q),0)){n=q
q=r
r=n}if(J.U(d.$2(p,o),0)){n=o
o=p
p=n}t.m(a,y,s)
t.m(a,w,q)
t.m(a,x,o)
t.m(a,v,t.h(a,b))
t.m(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.E(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.q(i)
if(h.u(i,0))continue
if(h.ai(i,0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.aC(i)
if(h.ah(i,0)){--l
continue}else{g=l-1
if(h.ai(i,0)){t.m(a,k,t.h(a,m))
f=m+1
t.m(a,m,t.h(a,l))
t.m(a,l,j)
l=g
m=f
break}else{t.m(a,k,t.h(a,l))
t.m(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.b5(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else if(J.U(d.$2(j,p),0))for(;!0;)if(J.U(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.b5(d.$2(t.h(a,l),r),0)){t.m(a,k,t.h(a,m))
f=m+1
t.m(a,m,t.h(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.h(a,l))
t.m(a,l,j)}l=g
break}}e=!1}h=m-1
t.m(a,b,t.h(a,h))
t.m(a,h,r)
h=l+1
t.m(a,c,t.h(a,h))
t.m(a,h,p)
H.b0(a,b,m-2,d)
H.b0(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.E(d.$2(t.h(a,m),r),0);)++m
for(;J.E(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.E(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else if(J.E(d.$2(j,p),0))for(;!0;)if(J.E(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.b5(d.$2(t.h(a,l),r),0)){t.m(a,k,t.h(a,m))
f=m+1
t.m(a,m,t.h(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.h(a,l))
t.m(a,l,j)}l=g
break}}H.b0(a,m,l,d)}else H.b0(a,m,l,d)},
i9:function(a){return a.gh2()},
fp:{
"^":"dZ;a",
gp:function(a){return this.a.length},
h:function(a,b){return C.h.bG(this.a,b)},
$asdZ:function(){return[P.n]},
$asdh:function(){return[P.n]},
$asm:function(){return[P.n]}},
aG:{
"^":"V;",
gJ:function(a){return new H.di(this,this.gp(this),0,null)},
O:function(a,b){var z,y
z=this.gp(this)
for(y=0;y<z;++y){b.$1(this.a3(0,y))
if(z!==this.gp(this))throw H.d(new P.R(this))}},
aC:function(a,b){return H.e(new H.c_(this,b),[null,null])},
bY:function(a,b){var z,y,x
if(b){z=H.e([],[H.Y(this,"aG",0)])
C.a.sp(z,this.gp(this))}else z=H.e(Array(this.gp(this)),[H.Y(this,"aG",0)])
for(y=0;y<this.gp(this);++y){x=this.a3(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bX:function(a){return this.bY(a,!0)},
$isw:1},
di:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
C:function(){var z,y,x,w
z=this.a
y=J.F(z)
x=y.gp(z)
if(this.b!==x)throw H.d(new P.R(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a3(z,w);++this.c
return!0}},
dj:{
"^":"V;a,b",
gJ:function(a){var z=new H.he(null,J.b7(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gp:function(a){return J.aP(this.a)},
$asV:function(a,b){return[b]},
static:{bl:function(a,b,c,d){if(!!J.q(a).$isw)return H.e(new H.d7(a,b),[c,d])
return H.e(new H.dj(a,b),[c,d])}}},
d7:{
"^":"dj;a,b",
$isw:1},
he:{
"^":"h2;a,b,c",
C:function(){var z=this.b
if(z.C()){this.a=this.bu(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
bu:function(a){return this.c.$1(a)}},
c_:{
"^":"aG;a,b",
gp:function(a){return J.aP(this.a)},
a3:function(a,b){return this.bu(J.eO(this.a,b))},
bu:function(a){return this.b.$1(a)},
$asaG:function(a,b){return[b]},
$asV:function(a,b){return[b]},
$isw:1},
d9:{
"^":"a;"},
iJ:{
"^":"a;",
m:function(a,b,c){throw H.d(new P.T("Cannot modify an unmodifiable list"))},
$ism:1,
$asm:null,
$isw:1},
dZ:{
"^":"dh+iJ;",
$ism:1,
$asm:null,
$isw:1}}],["","",,H,{
"^":"",
el:function(a){var z=H.e(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
iL:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jW()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aN(new P.iN(z),1)).observe(y,{childList:true})
return new P.iM(z,y,x)}else if(self.setImmediate!=null)return P.jX()
return P.jY()},
lR:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aN(new P.iO(a),0))},"$1","jW",2,0,5],
lS:[function(a){++init.globalState.f.b
self.setImmediate(H.aN(new P.iP(a),0))},"$1","jX",2,0,5],
lT:[function(a){P.ci(C.t,a)},"$1","jY",2,0,5],
eb:function(a,b){var z=H.b4()
z=H.aA(z,[z,z]).an(a)
if(z){b.toString
return a}else{b.toString
return a}},
fH:function(a,b){var z=H.e(new P.G(0,$.p,null),[b])
P.ch(C.t,new P.fK(a,z))
return z},
fI:function(a,b,c){var z=new P.G(0,$.p,null)
z.$builtinTypeInfo=[c]
P.ch(a,new P.fJ(b,z))
return z},
a_:function(a){return H.e(new P.cr(H.e(new P.G(0,$.p,null),[a])),[a])},
e8:function(a,b,c){$.p.toString
a.a2(b,c)},
jP:function(){var z,y
for(;z=$.ax,z!=null;){$.aL=null
y=z.c
$.ax=y
if(y==null)$.aK=null
$.p=z.b
z.eJ()}},
m3:[function(){$.cy=!0
try{P.jP()}finally{$.p=C.d
$.aL=null
$.cy=!1
if($.ax!=null)$.$get$cs().$1(P.ek())}},"$0","ek",0,0,2],
ef:function(a){if($.ax==null){$.aK=a
$.ax=a
if(!$.cy)$.$get$cs().$1(P.ek())}else{$.aK.c=a
$.aK=a}},
et:function(a){var z,y
z=$.p
if(C.d===z){P.ay(null,null,C.d,a)
return}z.toString
if(C.d.gbJ()===z){P.ay(null,null,z,a)
return}y=$.p
P.ay(null,null,y,y.bB(a,!0))},
lE:function(a,b){var z,y,x
z=H.e(new P.e7(null,null,null,0),[b])
y=z.gem()
x=z.geo()
z.a=a.at(y,!0,z.gen(),x)
return z},
jR:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.B(u)
z=t
y=H.O(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aa(x)
w=t
v=x.ga1()
c.$2(w,v)}}},
jI:function(a,b,c,d){var z=a.bD()
if(!!J.q(z).$isa2)z.c_(new P.jL(b,c,d))
else b.a2(c,d)},
jJ:function(a,b){return new P.jK(a,b)},
ch:function(a,b){var z=$.p
if(z===C.d){z.toString
return P.ci(a,b)}return P.ci(a,z.bB(b,!0))},
ci:function(a,b){var z=C.c.ao(a.a,1000)
return H.ic(z<0?0:z,b)},
cq:function(a){var z=$.p
$.p=a
return z},
b3:function(a,b,c,d,e){var z,y,x
z=new P.e0(new P.jQ(d,e),C.d,null)
y=$.ax
if(y==null){P.ef(z)
$.aL=$.aK}else{x=$.aL
if(x==null){z.c=y
$.aL=z
$.ax=z}else{z.c=x.c
x.c=z
$.aL=z
if(z.c==null)$.aK=z}}},
ec:function(a,b,c,d){var z,y
if($.p===c)return d.$0()
z=P.cq(c)
try{y=d.$0()
return y}finally{$.p=z}},
ee:function(a,b,c,d,e){var z,y
if($.p===c)return d.$1(e)
z=P.cq(c)
try{y=d.$1(e)
return y}finally{$.p=z}},
ed:function(a,b,c,d,e,f){var z,y
if($.p===c)return d.$2(e,f)
z=P.cq(c)
try{y=d.$2(e,f)
return y}finally{$.p=z}},
ay:function(a,b,c,d){var z=C.d!==c
if(z){d=c.bB(d,!(!z||C.d.gbJ()===c))
c=C.d}P.ef(new P.e0(d,c,null))},
iN:{
"^":"c:1;a",
$1:function(a){var z,y
H.bH()
z=this.a
y=z.a
z.a=null
y.$0()}},
iM:{
"^":"c:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iO:{
"^":"c:0;a",
$0:function(){H.bH()
this.a.$0()}},
iP:{
"^":"c:0;a",
$0:function(){H.bH()
this.a.$0()}},
jC:{
"^":"ac;a,b",
k:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{jD:function(a,b){if(b!=null)return b
if(!!J.q(a).$isN)return a.ga1()
return}}},
a2:{
"^":"a;"},
fK:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.am(this.a.$0())}catch(x){w=H.B(x)
z=w
y=H.O(x)
P.e8(this.b,z,y)}}},
fJ:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.am(null)}catch(x){w=H.B(x)
z=w
y=H.O(x)
P.e8(this.b,z,y)}}},
iT:{
"^":"a;fh:a<",
cK:function(a,b){a=a!=null?a:new P.dw()
if(this.a.a!==0)throw H.d(new P.aH("Future already completed"))
$.p.toString
this.a2(a,b)},
cJ:function(a){return this.cK(a,null)}},
cr:{
"^":"iT;a",
b6:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.aH("Future already completed"))
z.aJ(b)},
a2:function(a,b){this.a.e8(a,b)}},
aI:{
"^":"a;co:a<,fN:b>,c,d,e",
gax:function(){return this.b.b},
gcP:function(){return(this.c&1)!==0},
gfn:function(){return this.c===6},
gfm:function(){return this.c===8},
geq:function(){return this.d},
gez:function(){return this.d}},
G:{
"^":"a;b2:a?,ax:b<,c",
gej:function(){return this.a===8},
sek:function(a){if(a)this.a=2
else this.a=0},
bd:function(a,b){var z,y
z=H.e(new P.G(0,$.p,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.eb(b,y)}this.bl(new P.aI(null,z,b==null?1:3,a,b))
return z},
T:function(a){return this.bd(a,null)},
c_:function(a){var z,y
z=$.p
y=new P.G(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.bl(new P.aI(null,y,8,a,null))
return y},
bw:function(){if(this.a!==0)throw H.d(new P.aH("Future already completed"))
this.a=1},
gey:function(){return this.c},
gaK:function(){return this.c},
cC:function(a){this.a=4
this.c=a},
cB:function(a){this.a=8
this.c=a},
ew:function(a,b){this.cB(new P.ac(a,b))},
bl:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ay(null,null,z,new P.j2(this,a))}else{a.a=this.c
this.c=a}},
b0:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gco()
z.a=y}return y},
am:function(a){var z,y
z=J.q(a)
if(!!z.$isa2)if(!!z.$isG)P.by(a,this)
else P.cv(a,this)
else{y=this.b0()
this.cC(a)
P.al(this,y)}},
ce:function(a){var z=this.b0()
this.cC(a)
P.al(this,z)},
a2:[function(a,b){var z=this.b0()
this.cB(new P.ac(a,b))
P.al(this,z)},function(a){return this.a2(a,null)},"fZ","$2","$1","gbr",2,2,12,0],
aJ:function(a){var z
if(a==null);else{z=J.q(a)
if(!!z.$isa2){if(!!z.$isG){z=a.a
if(z>=4&&z===8){this.bw()
z=this.b
z.toString
P.ay(null,null,z,new P.j4(this,a))}else P.by(a,this)}else P.cv(a,this)
return}}this.bw()
z=this.b
z.toString
P.ay(null,null,z,new P.j5(this,a))},
e8:function(a,b){var z
this.bw()
z=this.b
z.toString
P.ay(null,null,z,new P.j3(this,a,b))},
$isa2:1,
static:{cv:function(a,b){var z,y,x,w
b.sb2(2)
try{a.bd(new P.j6(b),new P.j7(b))}catch(x){w=H.B(x)
z=w
y=H.O(x)
P.et(new P.j8(b,z,y))}},by:function(a,b){var z
b.a=2
z=new P.aI(null,b,0,null,null)
if(a.a>=4)P.al(a,z)
else a.bl(z)},al:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gej()
if(b==null){if(w){v=z.a.gaK()
y=z.a.gax()
x=J.aa(v)
u=v.ga1()
y.toString
P.b3(null,null,y,x,u)}return}for(;b.gco()!=null;b=t){t=b.a
b.a=null
P.al(z.a,b)}x.a=!0
s=w?null:z.a.gey()
x.b=s
x.c=!1
y=!w
if(!y||b.gcP()||b.c===8){r=b.gax()
if(w){u=z.a.gax()
u.toString
if(u==null?r!=null:u!==r){u=u.gbJ()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaK()
y=z.a.gax()
x=J.aa(v)
u=v.ga1()
y.toString
P.b3(null,null,y,x,u)
return}q=$.p
if(q==null?r!=null:q!==r)$.p=r
else q=null
if(y){if(b.gcP())x.a=new P.ja(x,b,s,r).$0()}else new P.j9(z,x,b,r).$0()
if(b.gfm())new P.jb(z,x,w,b,r).$0()
if(q!=null)$.p=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.q(y).$isa2}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.G)if(p.a>=4){o.a=2
z.a=p
b=new P.aI(null,o,0,null,null)
y=p
continue}else P.by(p,o)
else P.cv(p,o)
return}}o=b.b
b=o.b0()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
j2:{
"^":"c:0;a,b",
$0:function(){P.al(this.a,this.b)}},
j6:{
"^":"c:1;a",
$1:function(a){this.a.ce(a)}},
j7:{
"^":"c:7;a",
$2:function(a,b){this.a.a2(a,b)},
$1:function(a){return this.$2(a,null)}},
j8:{
"^":"c:0;a,b,c",
$0:function(){this.a.a2(this.b,this.c)}},
j4:{
"^":"c:0;a,b",
$0:function(){P.by(this.b,this.a)}},
j5:{
"^":"c:0;a,b",
$0:function(){this.a.ce(this.b)}},
j3:{
"^":"c:0;a,b,c",
$0:function(){this.a.a2(this.b,this.c)}},
ja:{
"^":"c:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.bc(this.b.geq(),this.c)
return!0}catch(x){w=H.B(x)
z=w
y=H.O(x)
this.a.b=new P.ac(z,y)
return!1}}},
j9:{
"^":"c:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaK()
y=!0
r=this.c
if(r.gfn()){x=r.d
try{y=this.d.bc(x,J.aa(z))}catch(q){r=H.B(q)
w=r
v=H.O(q)
r=J.aa(z)
p=w
o=(r==null?p==null:r===p)?z:new P.ac(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.b4()
p=H.aA(p,[p,p]).an(r)
n=this.d
m=this.b
if(p)m.b=n.fO(u,J.aa(z),z.ga1())
else m.b=n.bc(u,J.aa(z))}catch(q){r=H.B(q)
t=r
s=H.O(q)
r=J.aa(z)
p=t
o=(r==null?p==null:r===p)?z:new P.ac(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
jb:{
"^":"c:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.dc(this.d.gez())
z.a=w
v=w}catch(u){z=H.B(u)
y=z
x=H.O(u)
if(this.c){z=J.aa(this.a.a.gaK())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaK()
else v.b=new P.ac(y,x)
v.a=!1
return}if(!!J.q(v).$isa2){t=this.d
s=t.gfN(t)
s.sek(!0)
this.b.c=!0
v.bd(new P.jc(this.a,s),new P.jd(z,s))}}},
jc:{
"^":"c:1;a,b",
$1:function(a){P.al(this.a.a,new P.aI(null,this.b,0,null,null))}},
jd:{
"^":"c:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.G)){y=H.e(new P.G(0,$.p,null),[null])
z.a=y
y.ew(a,b)}P.al(z.a,new P.aI(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
e0:{
"^":"a;a,b,c",
eJ:function(){return this.a.$0()}},
ai:{
"^":"a;",
aC:function(a,b){return H.e(new P.jr(b,this),[H.Y(this,"ai",0),null])},
O:function(a,b){var z,y
z={}
y=H.e(new P.G(0,$.p,null),[null])
z.a=null
z.a=this.at(new P.i2(z,this,b,y),!0,new P.i3(y),y.gbr())
return y},
gp:function(a){var z,y
z={}
y=H.e(new P.G(0,$.p,null),[P.n])
z.a=0
this.at(new P.i4(z),!0,new P.i5(z,y),y.gbr())
return y},
bX:function(a){var z,y
z=H.e([],[H.Y(this,"ai",0)])
y=H.e(new P.G(0,$.p,null),[[P.m,H.Y(this,"ai",0)]])
this.at(new P.i6(this,z),!0,new P.i7(z,y),y.gbr())
return y}},
i2:{
"^":"c;a,b,c,d",
$1:function(a){P.jR(new P.i0(this.c,a),new P.i1(),P.jJ(this.a.a,this.d))},
$signature:function(){return H.bC(function(a){return{func:1,args:[a]}},this.b,"ai")}},
i0:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
i1:{
"^":"c:1;",
$1:function(a){}},
i3:{
"^":"c:0;a",
$0:function(){this.a.am(null)}},
i4:{
"^":"c:1;a",
$1:function(a){++this.a.a}},
i5:{
"^":"c:0;a,b",
$0:function(){this.b.am(this.a.a)}},
i6:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bC(function(a){return{func:1,args:[a]}},this.a,"ai")}},
i7:{
"^":"c:0;a,b",
$0:function(){this.b.am(this.a)}},
i_:{
"^":"a;"},
lX:{
"^":"a;"},
iQ:{
"^":"a;ax:d<,b2:e?",
bS:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cH()
if((z&4)===0&&(this.e&32)===0)this.cl(this.gcq())},
aS:function(a){return this.bS(a,null)},
d8:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.ga4(z)}else z=!1
if(z)this.r.bi(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cl(this.gcs())}}}},
bD:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bo()
return this.f},
bo:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cH()
if((this.e&32)===0)this.r=null
this.f=this.cp()},
bn:["dP",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cw(a)
else this.bm(new P.iW(a,null))}],
bk:["dQ",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cA(a,b)
else this.bm(new P.iY(a,b,null))}],
e7:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cz()
else this.bm(C.A)},
cr:[function(){},"$0","gcq",0,0,2],
ct:[function(){},"$0","gcs",0,0,2],
cp:function(){return},
bm:function(a){var z,y
z=this.r
if(z==null){z=new P.jB(null,null,0)
this.r=z}z.ay(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bi(this)}},
cw:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bW(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bp((z&4)!==0)},
cA:function(a,b){var z,y
z=this.e
y=new P.iS(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bo()
z=this.f
if(!!J.q(z).$isa2)z.c_(y)
else y.$0()}else{y.$0()
this.bp((z&4)!==0)}},
cz:function(){var z,y
z=new P.iR(this)
this.bo()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.q(y).$isa2)y.c_(z)
else z.$0()},
cl:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bp((z&4)!==0)},
bp:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.ga4(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.ga4(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cr()
else this.ct()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bi(this)},
e3:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.eb(b,z)
this.c=c}},
iS:{
"^":"c:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.b4()
x=H.aA(x,[x,x]).an(y)
w=z.d
v=this.b
u=z.b
if(x)w.fP(u,v,this.c)
else w.bW(u,v)
z.e=(z.e&4294967263)>>>0}},
iR:{
"^":"c:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.dd(z.c)
z.e=(z.e&4294967263)>>>0}},
e2:{
"^":"a;b9:a@"},
iW:{
"^":"e2;b,a",
bT:function(a){a.cw(this.b)}},
iY:{
"^":"e2;aM:b>,a1:c<,a",
bT:function(a){a.cA(this.b,this.c)}},
iX:{
"^":"a;",
bT:function(a){a.cz()},
gb9:function(){return},
sb9:function(a){throw H.d(new P.aH("No events after a done."))}},
jt:{
"^":"a;b2:a?",
bi:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.et(new P.ju(this,a))
this.a=1},
cH:function(){if(this.a===1)this.a=3}},
ju:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.fj(this.b)}},
jB:{
"^":"jt;b,c,a",
ga4:function(a){return this.c==null},
ay:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sb9(b)
this.c=b}},
fj:function(a){var z,y
z=this.b
y=z.gb9()
this.b=y
if(y==null)this.c=null
z.bT(a)}},
e7:{
"^":"a;a,b,c,b2:d?",
ca:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
h3:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.am(!0)
return}this.a.aS(0)
this.c=a
this.d=3},"$1","gem",2,0,function(){return H.bC(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"e7")}],
ep:[function(a,b){var z
if(this.d===2){z=this.c
this.ca(0)
z.a2(a,b)
return}this.a.aS(0)
this.c=new P.ac(a,b)
this.d=4},function(a){return this.ep(a,null)},"h5","$2","$1","geo",2,2,14,0],
h4:[function(){if(this.d===2){var z=this.c
this.ca(0)
z.am(!1)
return}this.a.aS(0)
this.c=null
this.d=5},"$0","gen",0,0,2]},
jL:{
"^":"c:0;a,b,c",
$0:function(){return this.a.a2(this.b,this.c)}},
jK:{
"^":"c:6;a,b",
$2:function(a,b){return P.jI(this.a,this.b,a,b)}},
cu:{
"^":"ai;",
at:function(a,b,c,d){return this.ec(a,d,c,!0===b)},
cT:function(a,b,c){return this.at(a,null,b,c)},
ec:function(a,b,c,d){return P.j1(this,a,b,c,d,H.Y(this,"cu",0),H.Y(this,"cu",1))},
cm:function(a,b){b.bn(a)},
$asai:function(a,b){return[b]}},
e3:{
"^":"iQ;x,y,a,b,c,d,e,f,r",
bn:function(a){if((this.e&2)!==0)return
this.dP(a)},
bk:function(a,b){if((this.e&2)!==0)return
this.dQ(a,b)},
cr:[function(){var z=this.y
if(z==null)return
z.aS(0)},"$0","gcq",0,0,2],
ct:[function(){var z=this.y
if(z==null)return
z.d8()},"$0","gcs",0,0,2],
cp:function(){var z=this.y
if(z!=null){this.y=null
z.bD()}return},
h_:[function(a){this.x.cm(a,this)},"$1","gef",2,0,function(){return H.bC(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"e3")}],
h1:[function(a,b){this.bk(a,b)},"$2","geh",4,0,15],
h0:[function(){this.e7()},"$0","geg",0,0,2],
e4:function(a,b,c,d,e,f,g){var z,y
z=this.gef()
y=this.geh()
this.y=this.x.a.cT(z,this.geg(),y)},
static:{j1:function(a,b,c,d,e,f,g){var z=$.p
z=H.e(new P.e3(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.e3(b,c,d,e)
z.e4(a,b,c,d,e,f,g)
return z}}},
jr:{
"^":"cu;b,a",
cm:function(a,b){var z,y,x,w,v
z=null
try{z=this.ex(a)}catch(w){v=H.B(w)
y=v
x=H.O(w)
$.p.toString
b.bk(y,x)
return}b.bn(z)},
ex:function(a){return this.b.$1(a)}},
ac:{
"^":"a;aM:a>,a1:b<",
k:function(a){return H.b(this.a)},
$isN:1},
jH:{
"^":"a;"},
jQ:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.d(new P.jC(z,P.jD(z,this.b)))}},
jw:{
"^":"jH;",
gbJ:function(){return this},
dd:function(a){var z,y,x,w
try{if(C.d===$.p){x=a.$0()
return x}x=P.ec(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.O(w)
return P.b3(null,null,this,z,y)}},
bW:function(a,b){var z,y,x,w
try{if(C.d===$.p){x=a.$1(b)
return x}x=P.ee(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.O(w)
return P.b3(null,null,this,z,y)}},
fP:function(a,b,c){var z,y,x,w
try{if(C.d===$.p){x=a.$2(b,c)
return x}x=P.ed(null,null,this,a,b,c)
return x}catch(w){x=H.B(w)
z=x
y=H.O(w)
return P.b3(null,null,this,z,y)}},
bB:function(a,b){if(b)return new P.jx(this,a)
else return new P.jy(this,a)},
eF:function(a,b){if(b)return new P.jz(this,a)
else return new P.jA(this,a)},
h:function(a,b){return},
dc:function(a){if($.p===C.d)return a.$0()
return P.ec(null,null,this,a)},
bc:function(a,b){if($.p===C.d)return a.$1(b)
return P.ee(null,null,this,a,b)},
fO:function(a,b,c){if($.p===C.d)return a.$2(b,c)
return P.ed(null,null,this,a,b,c)}},
jx:{
"^":"c:0;a,b",
$0:function(){return this.a.dd(this.b)}},
jy:{
"^":"c:0;a,b",
$0:function(){return this.a.dc(this.b)}},
jz:{
"^":"c:1;a,b",
$1:function(a){return this.a.bW(this.b,a)}},
jA:{
"^":"c:1;a,b",
$1:function(a){return this.a.bc(this.b,a)}}}],["","",,P,{
"^":"",
at:function(){return H.e(new H.aW(0,null,null,null,null,null,0),[null,null])},
au:function(a){return H.em(a,H.e(new H.aW(0,null,null,null,null,null,0),[null,null]))},
h0:function(a,b,c){var z,y
if(P.cz(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aM()
y.push(a)
try{P.jO(a,z)}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=P.dF(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
be:function(a,b,c){var z,y,x
if(P.cz(a))return b+"..."+c
z=new P.bv(b)
y=$.$get$aM()
y.push(a)
try{x=z
x.a=P.dF(x.gav(),a,", ")}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=z
y.a=y.gav()+c
y=z.gav()
return y.charCodeAt(0)==0?y:y},
cz:function(a){var z,y
for(z=0;y=$.$get$aM(),z<y.length;++z)if(a===y[z])return!0
return!1},
jO:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gJ(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.C())return
w=H.b(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.C()){if(x<=5)return
if(0>=b.length)return H.f(b,0)
v=b.pop()
if(0>=b.length)return H.f(b,0)
u=b.pop()}else{t=z.gG();++x
if(!z.C()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.C();t=s,s=r){r=z.gG();++x
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
bj:function(a,b,c,d,e){return H.e(new H.aW(0,null,null,null,null,null,0),[d,e])},
as:function(a,b){return P.jm(a,b)},
aF:function(a,b,c,d){return H.e(new P.jj(0,null,null,null,null,null,0),[d])},
c0:function(a){var z,y,x
z={}
if(P.cz(a))return"{...}"
y=new P.bv("")
try{$.$get$aM().push(a)
x=y
x.a=x.gav()+"{"
z.a=!0
J.eP(a,new P.hf(z,y))
z=y
z.a=z.gav()+"}"}finally{z=$.$get$aM()
if(0>=z.length)return H.f(z,0)
z.pop()}z=y.gav()
return z.charCodeAt(0)==0?z:z},
jl:{
"^":"aW;a,b,c,d,e,f,r",
aO:function(a){return H.kp(a)&0x3ffffff},
aP:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcQ()
if(x==null?b==null:x===b)return y}return-1},
static:{jm:function(a,b){return H.e(new P.jl(0,null,null,null,null,null,0),[a,b])}}},
jj:{
"^":"je;a,b,c,d,e,f,r",
gJ:function(a){var z=new P.dg(this,this.r,null,null)
z.c=this.e
return z},
gp:function(a){return this.a},
eT:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eb(b)},
eb:function(a){var z=this.d
if(z==null)return!1
return this.aZ(z[this.aY(a)],a)>=0},
cU:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.eT(0,a)?a:null
else return this.el(a)},
el:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aY(a)]
x=this.aZ(y,a)
if(x<0)return
return J.bL(y,x).gci()},
O:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.R(this))
z=z.b}},
ay:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cb(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cb(x,b)}else return this.ak(b)},
ak:function(a){var z,y,x
z=this.d
if(z==null){z=P.jk()
this.d=z}y=this.aY(a)
x=z[y]
if(x==null)z[y]=[this.bq(a)]
else{if(this.aZ(x,a)>=0)return!1
x.push(this.bq(a))}return!0},
a9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cc(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cc(this.c,b)
else return this.eu(b)},
eu:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aY(a)]
x=this.aZ(y,a)
if(x<0)return!1
this.cd(y.splice(x,1)[0])
return!0},
V:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cb:function(a,b){if(a[b]!=null)return!1
a[b]=this.bq(b)
return!0},
cc:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cd(z)
delete a[b]
return!0},
bq:function(a){var z,y
z=new P.hb(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cd:function(a){var z,y
z=a.gea()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aY:function(a){return J.I(a)&0x3ffffff},
aZ:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gci(),b))return y
return-1},
$isw:1,
static:{jk:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
hb:{
"^":"a;ci:a<,b,ea:c<"},
dg:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.R(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
je:{
"^":"hM;"},
dh:{
"^":"hn;"},
hn:{
"^":"a+bk;",
$ism:1,
$asm:null,
$isw:1},
bk:{
"^":"a;",
gJ:function(a){return new H.di(a,this.gp(a),0,null)},
a3:function(a,b){return this.h(a,b)},
O:function(a,b){var z,y
z=this.gp(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gp(a))throw H.d(new P.R(a))}},
aC:function(a,b){return H.e(new H.c_(a,b),[null,null])},
k:function(a){return P.be(a,"[","]")},
$ism:1,
$asm:null,
$isw:1},
hf:{
"^":"c:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
hc:{
"^":"V;a,b,c,d",
gJ:function(a){return new P.jn(this,this.c,this.d,this.b,null)},
O:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.M(new P.R(this))}},
ga4:function(a){return this.b===this.c},
gp:function(a){return(this.c-this.b&this.a.length-1)>>>0},
V:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.be(this,"{","}")},
d6:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.bW());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ak:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.ck();++this.d},
ck:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,[H.D(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.c4(y,0,w,z,x)
C.a.c4(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dU:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$isw:1,
static:{bY:function(a,b){var z=H.e(new P.hc(null,0,0,0),[b])
z.dU(a,b)
return z}}},
jn:{
"^":"a;a,b,c,d,e",
gG:function(){return this.e},
C:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.M(new P.R(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
hN:{
"^":"a;",
aC:function(a,b){return H.e(new H.d7(this,b),[H.D(this,0),null])},
k:function(a){return P.be(this,"{","}")},
O:function(a,b){var z
for(z=this.gJ(this);z.C();)b.$1(z.d)},
$isw:1},
hM:{
"^":"hN;"}}],["","",,P,{
"^":"",
bA:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.jh(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bA(a[z])
return a},
ea:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.d(H.Q(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.B(w)
y=x
throw H.d(new P.aq(String(y),null,null))}return P.bA(z)},
jh:{
"^":"a;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.es(b):y}},
gp:function(a){var z
if(this.b==null){z=this.c
z=z.gp(z)}else z=this.au().length
return z},
gaf:function(){if(this.b==null)return this.c.gaf()
return new P.ji(this)},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.X(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.cF().m(0,b,c)},
X:function(a){if(this.b==null)return this.c.X(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
a9:function(a,b){if(this.b!=null&&!this.X(b))return
return this.cF().a9(0,b)},
O:function(a,b){var z,y,x,w
if(this.b==null)return this.c.O(0,b)
z=this.au()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bA(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.d(new P.R(this))}},
k:function(a){return P.c0(this)},
au:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
cF:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.at()
y=this.au()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sp(y,0)
this.b=null
this.a=null
this.c=z
return z},
es:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bA(this.a[a])
return this.b[a]=z}},
ji:{
"^":"aG;a",
gp:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gp(z)}else z=z.au().length
return z},
a3:function(a,b){var z=this.a
if(z.b==null)z=z.gaf().a3(0,b)
else{z=z.au()
if(b<0||b>=z.length)return H.f(z,b)
z=z[b]}return z},
gJ:function(a){var z=this.a
if(z.b==null){z=z.gaf()
z=z.gJ(z)}else{z=z.au()
z=new J.cW(z,z.length,0,null)}return z},
$asaG:I.aB,
$asV:I.aB},
fs:{
"^":"a;"},
iK:{
"^":"fs;a",
bI:function(a,b,c){var z,y,x,w
z=a.length
P.bt(b,c,z,null,null,null)
y=new P.bv("")
x=this.a
w=new P.jE(x,y,!0,0,0,0)
w.bI(a,b,z)
if(w.e>0){if(!x)H.M(new P.aq("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.bs(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
eW:function(a){return this.bI(a,0,null)}},
jE:{
"^":"a;a,b,c,d,e,f",
bI:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.jG(c)
v=new P.jF(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=a.length,r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
if(r>>>0!==r||r>=s)return H.f(a,r)
q=a[r]
if((q&192)!==128){if(t)throw H.d(new P.aq("Bad UTF-8 encoding 0x"+C.c.be(q,16),null,null))
this.c=!1
u.a+=H.bs(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.f(C.w,p)
if(z<=C.w[p]){if(t)throw H.d(new P.aq("Overlong encoding of 0x"+C.c.be(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.d(new P.aq("Character outside valid Unicode range: 0x"+C.c.be(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.bs(z)
this.c=!1}for(;r<c;r=n,z=65533,y=0,x=0){o=w.$2(a,r)
if(J.U(o,0)){this.c=!1
if(typeof o!=="number")return H.A(o)
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
continue $loop$0}if(t)throw H.d(new P.aq("Bad UTF-8 encoding 0x"+C.c.be(q,16),null,null))
this.c=!1
u.a+=H.bs(65533)}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
jG:{
"^":"c:17;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=a.length,x=b;x<z;++x){if(x<0||x>=y)return H.f(a,x)
w=a[x]
if((w&127)!==w)return x-b}return z-b}},
jF:{
"^":"c:18;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.i8(this.b,a,b)}}}],["","",,P,{
"^":"",
jS:function(a){return H.i9(a)},
kG:[function(a,b){return J.eH(a,b)},"$2","k8",4,0,27],
bS:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aQ(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fD(a)},
fD:function(a){var z=J.q(a)
if(!!z.$isc)return z.k(a)
return H.br(a)},
bd:function(a){return new P.j0(a)},
bZ:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.b7(a);y.C();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
a9:function(a){var z=H.b(a)
H.cJ(z)},
i8:function(a,b,c){return H.hB(a,b,P.bt(b,c,a.length,null,null,null))},
ls:{
"^":"c:19;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.jS(a)}},
cA:{
"^":"a;"},
"+bool":0,
P:{
"^":"a;"},
bR:{
"^":"a;fC:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.bR))return!1
return this.a===b.a&&this.b===b.b},
az:function(a,b){return C.c.az(this.a,b.gfC())},
gE:function(a){return this.a},
k:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.fx(z?H.S(this).getUTCFullYear()+0:H.S(this).getFullYear()+0)
x=P.aS(z?H.S(this).getUTCMonth()+1:H.S(this).getMonth()+1)
w=P.aS(z?H.S(this).getUTCDate()+0:H.S(this).getDate()+0)
v=P.aS(z?H.S(this).getUTCHours()+0:H.S(this).getHours()+0)
u=P.aS(z?H.S(this).getUTCMinutes()+0:H.S(this).getMinutes()+0)
t=P.aS(z?H.S(this).getUTCSeconds()+0:H.S(this).getSeconds()+0)
s=P.fy(H.dz(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
dT:function(a,b){if(Math.abs(a)>864e13)throw H.d(P.aR(a))},
$isP:1,
$asP:I.aB,
static:{fw:function(a,b){var z=new P.bR(a,b)
z.dT(a,b)
return z},fx:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},fy:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aS:function(a){if(a>=10)return""+a
return"0"+a}}},
bK:{
"^":"an;",
$isP:1,
$asP:function(){return[P.an]}},
"+double":0,
ad:{
"^":"a;aw:a<",
l:function(a,b){return new P.ad(C.c.l(this.a,b.gaw()))},
L:function(a,b){return new P.ad(C.c.L(this.a,b.gaw()))},
n:function(a,b){return new P.ad(C.c.M(this.a*b))},
ai:function(a,b){return C.c.ai(this.a,b.gaw())},
ah:function(a,b){return C.c.ah(this.a,b.gaw())},
bh:function(a,b){return C.c.bh(this.a,b.gaw())},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.ad))return!1
return this.a===b.a},
gE:function(a){return this.a&0x1FFFFFFF},
az:function(a,b){return C.c.az(this.a,b.gaw())},
k:function(a){var z,y,x,w,v
z=new P.fC()
y=this.a
if(y<0)return"-"+new P.ad(-y).k(0)
x=z.$1(C.c.bU(C.c.ao(y,6e7),60))
w=z.$1(C.c.bU(C.c.ao(y,1e6),60))
v=new P.fB().$1(C.c.bU(y,1e6))
return""+C.c.ao(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isP:1,
$asP:function(){return[P.ad]}},
fB:{
"^":"c:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fC:{
"^":"c:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
N:{
"^":"a;",
ga1:function(){return H.O(this.$thrownJsError)}},
dw:{
"^":"N;",
k:function(a){return"Throw of null."}},
ao:{
"^":"N;a,b,c,d",
gbt:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbs:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gbt()+y+x
if(!this.a)return w
v=this.gbs()
u=P.bS(this.b)
return w+v+": "+H.b(u)},
static:{aR:function(a){return new P.ao(!1,null,null,a)},f7:function(a,b,c){return new P.ao(!0,a,b,c)}}},
cf:{
"^":"ao;e,f,a,b,c,d",
gbt:function(){return"RangeError"},
gbs:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.ah()
if(typeof z!=="number")return H.A(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{hD:function(a){return new P.cf(null,null,!1,null,null,a)},aZ:function(a,b,c){return new P.cf(null,null,!0,a,b,"Value not in range")},ag:function(a,b,c,d,e){return new P.cf(b,c,!0,a,d,"Invalid value")},bt:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.ag(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.ag(b,a,c,"end",f))
return b}return c}}},
fP:{
"^":"ao;e,p:f>,a,b,c,d",
gbt:function(){return"RangeError"},
gbs:function(){P.bS(this.e)
var z=": index should be less than "+H.b(this.f)
return J.b5(this.b,0)?": index must not be negative":z},
static:{bV:function(a,b,c,d,e){var z=e!=null?e:J.aP(b)
return new P.fP(b,z,!0,a,c,"Index out of range")}}},
T:{
"^":"N;a",
k:function(a){return"Unsupported operation: "+this.a}},
co:{
"^":"N;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
aH:{
"^":"N;a",
k:function(a){return"Bad state: "+this.a}},
R:{
"^":"N;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bS(z))+"."}},
hp:{
"^":"a;",
k:function(a){return"Out of Memory"},
ga1:function(){return},
$isN:1},
dE:{
"^":"a;",
k:function(a){return"Stack Overflow"},
ga1:function(){return},
$isN:1},
fv:{
"^":"N;a",
k:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
j0:{
"^":"a;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
aq:{
"^":"a;a,b,W:c>",
k:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.b(z):"FormatException"
return y}},
fE:{
"^":"a;a",
k:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.bq(b,"expando$values")
return z==null?null:H.bq(z,this.cj())},
m:function(a,b,c){var z=H.bq(b,"expando$values")
if(z==null){z=new P.a()
H.ce(b,"expando$values",z)}H.ce(z,this.cj(),c)},
cj:function(){var z,y
z=H.bq(this,"expando$key")
if(z==null){y=$.d8
$.d8=y+1
z="expando$key$"+y
H.ce(this,"expando$key",z)}return z}},
fG:{
"^":"a;"},
n:{
"^":"an;",
$isP:1,
$asP:function(){return[P.an]}},
"+int":0,
V:{
"^":"a;",
aC:function(a,b){return H.bl(this,b,H.Y(this,"V",0),null)},
O:function(a,b){var z
for(z=this.gJ(this);z.C();)b.$1(z.gG())},
bY:function(a,b){return P.bZ(this,b,H.Y(this,"V",0))},
bX:function(a){return this.bY(a,!0)},
gp:function(a){var z,y
z=this.gJ(this)
for(y=0;z.C();)++y
return y},
a3:function(a,b){var z,y,x
if(b<0)H.M(P.ag(b,0,null,"index",null))
for(z=this.gJ(this),y=0;z.C();){x=z.gG()
if(b===y)return x;++y}throw H.d(P.bV(b,this,"index",null,y))},
k:function(a){return P.h0(this,"(",")")}},
h2:{
"^":"a;"},
m:{
"^":"a;",
$asm:null,
$isw:1},
"+List":0,
hd:{
"^":"a;"},
lt:{
"^":"a;",
k:function(a){return"null"}},
"+Null":0,
an:{
"^":"a;",
$isP:1,
$asP:function(){return[P.an]}},
"+num":0,
a:{
"^":";",
u:function(a,b){return this===b},
gE:function(a){return H.af(this)},
k:function(a){return H.br(this)}},
ah:{
"^":"a;"},
a7:{
"^":"a;",
$isP:1,
$asP:function(){return[P.a7]}},
"+String":0,
bv:{
"^":"a;av:a<",
gp:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{dF:function(a,b,c){var z=J.b7(b)
if(!z.C())return a
if(c.length===0){do a+=H.b(z.gG())
while(z.C())}else{a+=H.b(z.gG())
for(;z.C();)a=a+c+H.b(z.gG())}return a}}},
dG:{
"^":"a;"}}],["","",,W,{
"^":"",
fu:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.J)},
am:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
e4:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
e9:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.iV(a)
if(!!J.q(z).$isa0)return z
return}else return a},
jN:function(a){if(!!J.q(a).$isd5)return a
return P.k3(a,!0)},
K:function(a){var z=$.p
if(z===C.d)return a
return z.eF(a,!0)},
y:{
"^":"aT;",
$isy:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
ky:{
"^":"y;A:type=",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
kA:{
"^":"y;",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
kB:{
"^":"h;A:type=",
"%":"Blob|File"},
kC:{
"^":"y;",
gbN:function(a){return H.e(new W.z(a,"error",!1),[null])},
gbO:function(a){return H.e(new W.z(a,"load",!1),[null])},
$isa0:1,
$ish:1,
"%":"HTMLBodyElement"},
kD:{
"^":"y;A:type=",
"%":"HTMLButtonElement"},
cZ:{
"^":"y;q:height%,t:width%",
c0:function(a,b,c){return a.getContext(b,P.k0(c))},
dq:function(a,b,c,d,e,f,g){var z,y
z=P.au(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.c0(a,"webgl",z)
return y==null?this.c0(a,"experimental-webgl",z):y},
dn:function(a,b){return this.dq(a,!0,!0,!0,!0,!1,b)},
$iscZ:1,
"%":"HTMLCanvasElement"},
kF:{
"^":"aX;p:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
kH:{
"^":"fQ;p:length=",
c1:function(a,b){var z=this.ee(a,b)
return z!=null?z:""},
ee:function(a,b){if(W.fu(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.fz()+b)},
gq:function(a){return a.height},
gt:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fQ:{
"^":"h+ft;"},
ft:{
"^":"a;",
gq:function(a){return this.c1(a,"height")},
gt:function(a){return this.c1(a,"width")}},
d5:{
"^":"aX;",
$isd5:1,
"%":"Document|HTMLDocument|XMLDocument"},
kI:{
"^":"aX;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
kJ:{
"^":"h;",
k:function(a){return String(a)},
"%":"DOMException"},
fA:{
"^":"h;bC:bottom=,q:height=,a5:left=,bV:right=,aG:top=,t:width=,i:x=,j:y=",
k:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gt(a))+" x "+H.b(this.gq(a))},
u:function(a,b){var z,y,x
if(b==null)return!1
z=J.q(b)
if(!z.$isab)return!1
y=a.left
x=z.ga5(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaG(b)
if(y==null?x==null:y===x){y=this.gt(a)
x=z.gt(b)
if(y==null?x==null:y===x){y=this.gq(a)
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gE:function(a){var z,y,x,w
z=J.I(a.left)
y=J.I(a.top)
x=J.I(this.gt(a))
w=J.I(this.gq(a))
return W.e4(W.am(W.am(W.am(W.am(0,z),y),x),w))},
gbZ:function(a){return H.e(new P.W(a.left,a.top),[null])},
$isab:1,
$asab:I.aB,
"%":";DOMRectReadOnly"},
aT:{
"^":"aX;",
gW:function(a){return P.hF(C.b.M(a.offsetLeft),C.b.M(a.offsetTop),C.b.M(a.offsetWidth),C.b.M(a.offsetHeight),null)},
k:function(a){return a.localName},
dm:function(a){return a.getBoundingClientRect()},
gbN:function(a){return H.e(new W.z(a,"error",!1),[null])},
gbO:function(a){return H.e(new W.z(a,"load",!1),[null])},
gcW:function(a){return H.e(new W.z(a,"mousedown",!1),[null])},
gcX:function(a){return H.e(new W.z(a,"mouseenter",!1),[null])},
gcY:function(a){return H.e(new W.z(a,"mouseleave",!1),[null])},
gcZ:function(a){return H.e(new W.z(a,"mousemove",!1),[null])},
gd_:function(a){return H.e(new W.z(a,"mouseout",!1),[null])},
gd0:function(a){return H.e(new W.z(a,"mouseover",!1),[null])},
gd1:function(a){return H.e(new W.z(a,"mouseup",!1),[null])},
$isaT:1,
$ish:1,
$isa0:1,
"%":";Element"},
kK:{
"^":"y;q:height%,aj:src},A:type=,t:width%",
"%":"HTMLEmbedElement"},
kL:{
"^":"bc;aM:error=",
"%":"ErrorEvent"},
bc:{
"^":"h;A:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
a0:{
"^":"h;",
e6:function(a,b,c,d){return a.addEventListener(b,H.aN(c,1),d)},
ev:function(a,b,c,d){return a.removeEventListener(b,H.aN(c,1),d)},
$isa0:1,
"%":"MediaStream;EventTarget"},
l3:{
"^":"y;A:type=",
"%":"HTMLFieldSetElement"},
l6:{
"^":"y;p:length=",
"%":"HTMLFormElement"},
fM:{
"^":"fN;",
h7:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
fI:function(a,b,c){return a.open(b,c)},
bj:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
fN:{
"^":"a0;",
"%":";XMLHttpRequestEventTarget"},
l7:{
"^":"y;q:height%,aj:src},t:width%",
"%":"HTMLIFrameElement"},
da:{
"^":"y;q:height%,aj:src},t:width%",
b6:function(a,b){return a.complete.$1(b)},
$isda:1,
"%":"HTMLImageElement"},
l9:{
"^":"y;q:height%,aj:src},A:type=,t:width%",
$isaT:1,
$ish:1,
$isa0:1,
"%":"HTMLInputElement"},
lc:{
"^":"y;A:type=",
"%":"HTMLKeygenElement"},
ld:{
"^":"y;A:type=",
"%":"HTMLLinkElement"},
hg:{
"^":"y;aM:error=,aj:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
lg:{
"^":"y;A:type=",
"%":"HTMLMenuElement"},
lh:{
"^":"y;A:type=",
"%":"HTMLMenuItemElement"},
c2:{
"^":"dY;",
gW:function(a){var z,y
if(!!a.offsetX)return H.e(new P.W(a.offsetX,a.offsetY),[null])
else{if(!J.q(W.e9(a.target)).$isaT)throw H.d(new P.T("offsetX is only supported on elements"))
z=W.e9(a.target)
y=H.e(new P.W(a.clientX,a.clientY),[null]).L(0,J.eY(J.f0(z)))
return H.e(new P.W(J.cU(y.a),J.cU(y.b)),[null])}},
$isc2:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
lr:{
"^":"h;",
$ish:1,
"%":"Navigator"},
aX:{
"^":"a0;",
k:function(a){var z=a.nodeValue
return z==null?this.dN(a):z},
"%":"Attr;Node"},
lu:{
"^":"y;A:type=",
"%":"HTMLOListElement"},
lv:{
"^":"y;q:height%,A:type=,t:width%",
"%":"HTMLObjectElement"},
lw:{
"^":"y;A:type=",
"%":"HTMLOutputElement"},
aY:{
"^":"bc;",
$isaY:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
lz:{
"^":"y;aj:src},A:type=",
"%":"HTMLScriptElement"},
lB:{
"^":"y;p:length=,A:type=",
"%":"HTMLSelectElement"},
lC:{
"^":"y;aj:src},A:type=",
"%":"HTMLSourceElement"},
lD:{
"^":"bc;aM:error=",
"%":"SpeechRecognitionError"},
lF:{
"^":"y;A:type=",
"%":"HTMLStyleElement"},
lJ:{
"^":"y;A:type=",
"%":"HTMLTextAreaElement"},
cm:{
"^":"h;",
$isa:1,
"%":"Touch"},
cn:{
"^":"dY;eK:changedTouches=",
$iscn:1,
$isa:1,
"%":"TouchEvent"},
lL:{
"^":"fS;",
gp:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bV(b,a,null,null,null))
return a[b]},
m:function(a,b,c){throw H.d(new P.T("Cannot assign element of immutable List."))},
a3:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$ism:1,
$asm:function(){return[W.cm]},
$isw:1,
$isbh:1,
$isbf:1,
"%":"TouchList"},
fR:{
"^":"h+bk;",
$ism:1,
$asm:function(){return[W.cm]},
$isw:1},
fS:{
"^":"fR+fO;",
$ism:1,
$asm:function(){return[W.cm]},
$isw:1},
lM:{
"^":"y;aj:src}",
"%":"HTMLTrackElement"},
dY:{
"^":"bc;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
e_:{
"^":"hg;q:height%,t:width%",
$ise_:1,
"%":"HTMLVideoElement"},
lQ:{
"^":"a0;",
$ish:1,
$isa0:1,
"%":"DOMWindow|Window"},
lU:{
"^":"h;bC:bottom=,q:height=,a5:left=,bV:right=,aG:top=,t:width=",
k:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
u:function(a,b){var z,y,x
if(b==null)return!1
z=J.q(b)
if(!z.$isab)return!1
y=a.left
x=z.ga5(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaG(b)
if(y==null?x==null:y===x){y=a.width
x=z.gt(b)
if(y==null?x==null:y===x){y=a.height
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gE:function(a){var z,y,x,w
z=J.I(a.left)
y=J.I(a.top)
x=J.I(a.width)
w=J.I(a.height)
return W.e4(W.am(W.am(W.am(W.am(0,z),y),x),w))},
gbZ:function(a){return H.e(new P.W(a.left,a.top),[null])},
$isab:1,
$asab:I.aB,
"%":"ClientRect"},
lV:{
"^":"aX;",
$ish:1,
"%":"DocumentType"},
lW:{
"^":"fA;",
gq:function(a){return a.height},
gt:function(a){return a.width},
gi:function(a){return a.x},
si:function(a,b){a.x=b},
gj:function(a){return a.y},
sj:function(a,b){a.y=b},
"%":"DOMRect"},
lZ:{
"^":"y;",
$isa0:1,
$ish:1,
"%":"HTMLFrameSetElement"},
ct:{
"^":"ai;a,b,c",
at:function(a,b,c,d){var z=new W.J(0,this.a,this.b,W.K(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.H()
return z},
cT:function(a,b,c){return this.at(a,null,b,c)}},
z:{
"^":"ct;a,b,c"},
J:{
"^":"i_;a,b,c,d,e",
bD:function(){if(this.b==null)return
this.cE()
this.b=null
this.d=null
return},
bS:function(a,b){if(this.b==null)return;++this.a
this.cE()},
aS:function(a){return this.bS(a,null)},
d8:function(){if(this.b==null||this.a<=0)return;--this.a
this.H()},
H:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.ex(x,this.c,z,this.e)}},
cE:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.ey(x,this.c,z,this.e)}}},
fO:{
"^":"a;",
gJ:function(a){return new W.fF(a,this.gp(a),-1,null)},
$ism:1,
$asm:null,
$isw:1},
fF:{
"^":"a;a,b,c,d",
C:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bL(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gG:function(){return this.d}},
iU:{
"^":"a;a",
$isa0:1,
$ish:1,
static:{iV:function(a){if(a===window)return a
else return new W.iU(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kw:{
"^":"ar;",
$ish:1,
"%":"SVGAElement"},
kx:{
"^":"ia;",
$ish:1,
"%":"SVGAltGlyphElement"},
kz:{
"^":"t;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
kM:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEBlendElement"},
kN:{
"^":"t;A:type=,q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
kO:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
kP:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFECompositeElement"},
kQ:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
kR:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
kS:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
kT:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEFloodElement"},
kU:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
kV:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEImageElement"},
kW:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEMergeElement"},
kX:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEMorphologyElement"},
kY:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEOffsetElement"},
kZ:{
"^":"t;i:x=,j:y=",
"%":"SVGFEPointLightElement"},
l_:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
l0:{
"^":"t;i:x=,j:y=",
"%":"SVGFESpotLightElement"},
l1:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFETileElement"},
l2:{
"^":"t;A:type=,q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFETurbulenceElement"},
l4:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFilterElement"},
l5:{
"^":"ar;q:height=,t:width=,i:x=,j:y=",
"%":"SVGForeignObjectElement"},
fL:{
"^":"ar;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
ar:{
"^":"t;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
l8:{
"^":"ar;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGImageElement"},
le:{
"^":"t;",
$ish:1,
"%":"SVGMarkerElement"},
lf:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGMaskElement"},
lx:{
"^":"t;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGPatternElement"},
ly:{
"^":"fL;q:height=,t:width=,i:x=,j:y=",
"%":"SVGRectElement"},
lA:{
"^":"t;A:type=",
$ish:1,
"%":"SVGScriptElement"},
lG:{
"^":"t;A:type=",
"%":"SVGStyleElement"},
t:{
"^":"aT;",
gbN:function(a){return H.e(new W.z(a,"error",!1),[null])},
gbO:function(a){return H.e(new W.z(a,"load",!1),[null])},
gcW:function(a){return H.e(new W.z(a,"mousedown",!1),[null])},
gcX:function(a){return H.e(new W.z(a,"mouseenter",!1),[null])},
gcY:function(a){return H.e(new W.z(a,"mouseleave",!1),[null])},
gcZ:function(a){return H.e(new W.z(a,"mousemove",!1),[null])},
gd_:function(a){return H.e(new W.z(a,"mouseout",!1),[null])},
gd0:function(a){return H.e(new W.z(a,"mouseover",!1),[null])},
gd1:function(a){return H.e(new W.z(a,"mouseup",!1),[null])},
$isa0:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
lH:{
"^":"ar;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGSVGElement"},
lI:{
"^":"t;",
$ish:1,
"%":"SVGSymbolElement"},
dI:{
"^":"ar;",
"%":";SVGTextContentElement"},
lK:{
"^":"dI;",
$ish:1,
"%":"SVGTextPathElement"},
ia:{
"^":"dI;i:x=,j:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
lN:{
"^":"ar;q:height=,t:width=,i:x=,j:y=",
$ish:1,
"%":"SVGUseElement"},
lO:{
"^":"t;",
$ish:1,
"%":"SVGViewElement"},
lY:{
"^":"t;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
m_:{
"^":"t;",
$ish:1,
"%":"SVGCursorElement"},
m0:{
"^":"t;",
$ish:1,
"%":"SVGFEDropShadowElement"},
m1:{
"^":"t;",
$ish:1,
"%":"SVGGlyphRefElement"},
m2:{
"^":"t;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
hI:{
"^":"h;",
eD:function(a,b,c){return a.bindBuffer(b,c)},
eE:function(a,b,c){return a.bindTexture(b,c)},
eG:function(a,b){return a.blendEquation(b)},
eH:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
eI:function(a,b,c,d){return a.bufferData(b,c,d)},
eL:function(a,b){return a.clear(b)},
eM:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
eN:function(a,b){return a.clearDepth(b)},
eQ:function(a,b){return a.clearStencil(b)},
eS:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
eX:function(a){return a.createBuffer()},
eY:function(a){return a.createProgram()},
eZ:function(a,b){return a.createShader(b)},
f_:function(a){return a.createTexture()},
f0:function(a,b){return a.depthFunc(b)},
f1:function(a,b){return a.depthMask(b)},
f8:function(a,b){return a.disableVertexAttribArray(b)},
f9:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
ff:function(a,b){return a.enable(b)},
fg:function(a,b){return a.enableVertexAttribArray(b)},
dl:function(a,b,c){return a.getAttribLocation(b,c)},
dt:function(a,b){return a.getParameter(b)},
dv:function(a,b,c){return a.getUniformLocation(b,c)},
dJ:function(a,b,c,d){return a.stencilFunc(b,c,d)},
dK:function(a,b,c,d){return a.stencilOp(b,c,d)},
fR:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.k2(g))
return}z=J.q(g)
if(!!z.$isda)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscZ)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$ise_)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.d(P.aR("Incorrect number or type of arguments"))},
fQ:function(a,b,c,d,e,f,g){return this.fR(a,b,c,d,e,f,g,null,null,null)},
fS:function(a,b,c,d){return a.texParameteri(b,c,d)},
fV:function(a,b){return a.useProgram(b)},
fW:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kE:{
"^":"a;"}}],["","",,P,{
"^":"",
aJ:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
e5:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
hC:function(a){return C.r},
jg:{
"^":"a;",
fE:function(a){if(a<=0||a>4294967296)throw H.d(P.hD("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
ba:function(){return Math.random()}},
W:{
"^":"a;i:a>,j:b>",
k:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
u:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.W))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gE:function(a){var z,y
z=J.I(this.a)
y=J.I(this.b)
return P.e5(P.aJ(P.aJ(0,z),y))},
l:function(a,b){var z,y,x
z=this.a
y=J.j(b)
x=y.gi(b)
if(typeof z!=="number")return z.l()
x=C.b.l(z,x)
z=this.b
y=y.gj(b)
if(typeof z!=="number")return z.l()
y=new P.W(x,C.b.l(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
L:function(a,b){var z,y,x,w
z=this.a
y=J.f_(b)
if(typeof z!=="number")return z.L()
if(typeof y!=="number")return H.A(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.L()
if(typeof w!=="number")return H.A(w)
w=new P.W(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
jv:{
"^":"a;",
gbV:function(a){return this.ga5(this)+this.c},
gbC:function(a){return this.gaG(this)+this.d},
k:function(a){return"Rectangle ("+this.ga5(this)+", "+this.b+") "+this.c+" x "+this.d},
u:function(a,b){var z,y
if(b==null)return!1
z=J.q(b)
if(!z.$isab)return!1
if(this.ga5(this)===z.ga5(b)){y=this.b
z=y===z.gaG(b)&&this.a+this.c===z.gbV(b)&&y+this.d===z.gbC(b)}else z=!1
return z},
gE:function(a){var z=this.b
return P.e5(P.aJ(P.aJ(P.aJ(P.aJ(0,this.ga5(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbZ:function(a){var z=new P.W(this.ga5(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
ab:{
"^":"jv;a5:a>,aG:b>,t:c>,q:d>",
$asab:null,
static:{hF:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.e(new P.ab(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
i:function(a){return a},
bB:function(a){return a},
dq:{
"^":"h;",
eC:function(a,b,c){return new Uint8Array(a,b)},
eB:function(a){return this.eC(a,0,null)},
$isdq:1,
"%":"ArrayBuffer"},
c5:{
"^":"h;",
$isc5:1,
"%":"DataView;ArrayBufferView;c3|dr|dt|c4|ds|du|ae"},
c3:{
"^":"c5;",
gp:function(a){return a.length},
$isbh:1,
$isbf:1},
c4:{
"^":"dt;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
return a[b]},
m:function(a,b,c){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
a[b]=c}},
dr:{
"^":"c3+bk;",
$ism:1,
$asm:function(){return[P.bK]},
$isw:1},
dt:{
"^":"dr+d9;"},
ae:{
"^":"du;",
m:function(a,b,c){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
a[b]=c},
$ism:1,
$asm:function(){return[P.n]},
$isw:1},
ds:{
"^":"c3+bk;",
$ism:1,
$asm:function(){return[P.n]},
$isw:1},
du:{
"^":"ds+d9;"},
li:{
"^":"c4;",
$ism:1,
$asm:function(){return[P.bK]},
$isw:1,
"%":"Float32Array"},
lj:{
"^":"c4;",
$ism:1,
$asm:function(){return[P.bK]},
$isw:1,
"%":"Float64Array"},
lk:{
"^":"ae;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.n]},
$isw:1,
"%":"Int16Array"},
ll:{
"^":"ae;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.n]},
$isw:1,
"%":"Int32Array"},
lm:{
"^":"ae;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.n]},
$isw:1,
"%":"Int8Array"},
ln:{
"^":"ae;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.n]},
$isw:1,
"%":"Uint16Array"},
lo:{
"^":"ae;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.n]},
$isw:1,
"%":"Uint32Array"},
lp:{
"^":"ae;",
gp:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.n]},
$isw:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
lq:{
"^":"ae;",
gp:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.H(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.n]},
$isw:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
cJ:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
hj:{
"^":"a1;e,f,a,b,c,d"},
hJ:{
"^":"a1;e,f,r,a,b,c,d",
P:function(a){var z=0,y=new P.a_(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k,j
function $async$P(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
l=u
l=l.f
z=6
return H.k(l.S("assets/bg_clear01.png"),$async$P,y)
case 6:x=1
z=5
break
case 3:x=2
r=w
l=H
l.B(r)
z=5
break
case 2:z=1
break
case 5:x=8
l=u
l=l.f
z=11
return H.k(l.S("assets/bg_clear02.png"),$async$P,y)
case 11:x=1
z=10
break
case 8:x=7
q=w
l=H
l.B(q)
z=10
break
case 7:z=1
break
case 10:x=13
l=u
s=l.f
l=s
z=16
return H.k(l.S("assets/se_start.gif"),$async$P,y)
case 16:l=s
z=17
return H.k(l.ag("assets/se_start.json"),$async$P,y)
case 17:x=1
z=15
break
case 13:x=12
p=w
l=H
l.B(p)
z=15
break
case 12:z=1
break
case 15:x=19
l=u
s=l.f
l=s
z=22
return H.k(l.ag("assets/se_play.json"),$async$P,y)
case 22:l=s
z=23
return H.k(l.S("assets/se_play.png"),$async$P,y)
case 23:x=1
z=21
break
case 19:x=18
o=w
l=H
l.B(o)
z=21
break
case 18:z=1
break
case 21:x=25
l=u
s=l.f
l=s
z=28
return H.k(l.S("assets/se_setting.gif"),$async$P,y)
case 28:l=s
z=29
return H.k(l.ag("assets/se_setting.json"),$async$P,y)
case 29:x=1
z=27
break
case 25:x=24
n=w
l=H
l.B(n)
z=27
break
case 24:z=1
break
case 27:x=31
l=u
s=l.f
l=s
z=34
return H.k(l.S("assets/font_a.png"),$async$P,y)
case 34:l=s
z=35
return H.k(l.ag("assets/font_a.json"),$async$P,y)
case 35:x=1
z=33
break
case 31:x=30
m=w
l=H
l.B(m)
z=33
break
case 30:z=1
break
case 33:l=u
l=l.e
z=36
return H.k(l.al(),$async$P,y)
case 36:l=u
s=l.e
l=s
l=l
k=F
k=k
j=u
z=37
return H.k(l.w(k.hV(j.f,s)),$async$P,y)
case 37:return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$P,y,null)},
Z:function(a,b){var z,y
z=100+C.C.c2(++this.r/2,10)*5
y=-z/2
b.aA(a,new F.v(y+200,y+150,z,z),F.a3(F.o(170,255,170,170)))}},
ff:{
"^":"a1;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b,c,d",
aD:function(a,b,c,d,e,f,g){if(this.dx&&c==="pointerup"){this.dx=!1
this.e.al().T(new F.fk(this))}else if(c==="pointerdown")this.dx=!0
return!1},
Z:function(a,b){var z=this.r
if(z!=null)b.aq(a,z,this.x,this.y,this.cy)
z=this.z
if(z!=null&&this.cx!=null)this.cx.fc(a,b,z,this.db,20,new F.v(80,230,400,200))},
dS:function(a,b,c){var z,y
this.db="\u30df\u30ce\u30fc\u30f3\u306e\u96ea\u304c\u964d\u3063\u305f\u3002"
if(c>1e4){this.db="\u30df\u30ce\u30fc\u30f3\u304c\u4ef2\u9593\u306b\u306a\u3063\u305f\u3002"
z="assets/bg_clear02.png"}else z="assets/bg_clear01.png"
y=this.f
y.S(z).T(new F.fh(this))
y.S("assets/font_a.png").T(new F.fi(this))
y.ag("assets/font_a.json").T(new F.fj(this))},
static:{fg:function(a,b,c){var z,y
z=F.a3(null)
y=new E.u(new Float64Array(H.i(16)))
y.v()
y=new F.ff(b,a,null,null,null,null,null,null,null,z,"",!1,"none",null,y,!1)
y.b=[]
y.dS(a,b,c)
return y}}},
fh:{
"^":"c:1;a",
$1:function(a){var z=this.a
z.r=a
z.x=new F.v(0,0,J.C(a.gR()),J.C(z.r.gY()))
z.y=new F.v(0,0,400,300)}},
fi:{
"^":"c:1;a",
$1:function(a){var z=this.a
z.z=a
z.Q=new F.v(0,0,0,0)
z.ch=new F.v(0,0,0,0)}},
fj:{
"^":"c:3;a",
$1:function(a){this.a.cx=F.f9(a)}},
fk:{
"^":"c:1;a",
$1:function(a){var z,y
z=this.a
y=z.e
y.w(F.dx(z.f,y))}},
hk:{
"^":"a;a,b,c,d",
V:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z+1,x=this.b+2,w=x-1,v=0;v<y;++v)for(u=v===z,t=0;t<x;++t)if(t===0||t===w||u)this.U(t,v).a=C.q
else this.U(t,v).a=C.e},
U:function(a,b){var z,y
if(typeof a!=="number")return a.ai()
if(!(a<0)){z=this.c+1
if(!(a>z)){y=J.aC(b)
z=y.ai(b,0)||y.ah(b,z)}else z=!0}else z=!0
if(z)return this.d
z=this.a
y=J.ew(b,this.b+2)
if(typeof y!=="number")return H.A(y)
y=a+y
if(y>>>0!==y||y>=z.length)return H.f(z,y)
return z[y]},
eR:function(){var z,y,x,w,v,u
z=[]
for(y=this.c+1-1,x=this.b+2-1,w=0;w<y;++w){u=1
while(!0){if(!(u<x)){v=!0
break}if(this.U(u,w).a===C.e){v=!1
break}++u}if(v)z.push(w)}C.a.c6(z)
return z},
eP:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.L)(a),++y)this.eO(a[y])},
eO:function(a){var z,y,x,w
for(z=this.b+2-1,y=a;x=J.aC(y),x.bh(y,0);y=x.L(y,1))for(w=1;w<z;++w)if(this.U(w,x.L(y,1)).a===C.p)this.U(w,y).a=C.e
else this.U(w,y).a=this.U(w,x.L(y,1)).a},
dV:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.c,y=z+1,x=this.b+2,w=this.a,v=x-1,u=0;u<y;++u)for(t=u===z,s=0;s<x;++s)if(s===0||s===v||t)w.push(new F.bm(C.q))
else w.push(new F.bm(C.e))},
static:{dn:function(a,b){var z=new F.hk([],b,a,new F.bm(C.p))
z.dV(a,b)
return z}}},
hh:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q",
cV:function(){var z,y
z=this.b
if(z.length>0)C.a.d5(z,0)
for(;z.length<3;){y=F.hm()
y.a=(this.a.b+2)/2|0
y.b=0
z.push(y)}},
cN:function(a,b){var z,y,x
if(!b){z=this.r
y=$.$get$bn()
x=this.e
if(x>=5)return H.f(y,x)
x=z+y[x]/2<a
z=x}else z=!0
if(z){this.r=a
this.cM()}},
cM:function(){var z,y,x,w,v
if(!this.bM(0,1)){z=this.b
if(1>=z.length)return H.f(z,1)
if(this.b5(z[1])){this.c=!0
z=this.z
z.push(this.d)
C.a.c6(z)
if(z.length>3)C.a.d5(z,0)}this.cV()
y=this.a.eR()
z=y.length
if(z>0){x=this.d
w=$.$get$dl()
v=this.e
if(v>=5)return H.f(w,v)
v=w[v]
H.a4(v)
H.a4(z)
v=x+Math.pow(v,z)
this.d=v
P.a9(H.b(v))}if(z===4)++this.Q
z=this.Q
x=$.$get$dm()
w=this.e
if(w>=5)return H.f(x,w)
if(z>x[w])if(w+1<5)this.e=w+1
this.a.eP(y)}},
bM:function(a,b){var z,y,x
z=this.b
this.ab(C.a.gF(z),!1)
y=C.a.gF(z)
y.a=J.r(y.a,a)
y=C.a.gF(z)
y.b=J.r(y.b,b)
if(this.b5(C.a.gF(z))){y=C.a.gF(z)
x=y.a
if(typeof x!=="number")return x.L()
y.a=x-a
x=C.a.gF(z)
y=x.b
if(typeof y!=="number")return y.L()
x.b=y-b
this.ab(C.a.gF(z),!0)
return!1}else{this.ab(C.a.gF(z),!0)
return!0}},
b5:function(a){var z,y,x,w,v
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.j(w)
v=this.a.U(J.r(a.a,v.gi(w)),J.r(a.b,v.gj(w))).a
if(!(v===C.e||v===C.p))return!0}return!1},
ab:function(a,b){var z,y,x,w,v,u
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.j(w)
u=this.a.U(J.r(a.a,v.gi(w)),J.r(a.b,v.gj(w)))
if(u.a!==C.p)if(b)u.a=v.gA(w)
else u.a=C.e}}},
a6:{
"^":"a;a",
k:function(a){return C.K.h(0,this.a)}},
av:{
"^":"a;i:a*,j:b*,c",
da:function(){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.j(w)
u=v.gi(w)
t=v.gj(w)
if(typeof t!=="number")return H.A(t)
v.si(w,-1*t)
v.sj(w,u)}},
d9:function(){var z,y,x,w,v,u
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.j(w)
u=v.gi(w)
v.si(w,v.gj(w))
if(typeof u!=="number")return H.A(u)
v.sj(w,-1*u)}},
static:{hm:function(){switch($.$get$dp().fE(7)){case 0:var z=[]
z.push(new F.x(0,0,C.i))
z.push(new F.x(-1,0,C.i))
z.push(new F.x(1,0,C.i))
z.push(new F.x(2,0,C.i))
return new F.av(0,0,z)
case 1:z=[]
z.push(new F.x(0,0,C.j))
z.push(new F.x(1,0,C.j))
z.push(new F.x(0,-1,C.j))
z.push(new F.x(1,-1,C.j))
return new F.av(0,0,z)
case 2:z=[]
z.push(new F.x(0,0,C.k))
z.push(new F.x(1,0,C.k))
z.push(new F.x(0,-1,C.k))
z.push(new F.x(-1,-1,C.k))
return new F.av(0,0,z)
case 3:z=[]
z.push(new F.x(0,0,C.l))
z.push(new F.x(-1,0,C.l))
z.push(new F.x(0,-1,C.l))
z.push(new F.x(1,-1,C.l))
return new F.av(0,0,z)
case 4:z=[]
z.push(new F.x(1,0,C.o))
z.push(new F.x(1,-1,C.o))
z.push(new F.x(0,0,C.o))
z.push(new F.x(-1,0,C.o))
return new F.av(0,0,z)
case 5:z=[]
z.push(new F.x(-1,0,C.m))
z.push(new F.x(-1,-1,C.m))
z.push(new F.x(0,0,C.m))
z.push(new F.x(1,0,C.m))
return new F.av(0,0,z)
case 6:z=[]
z.push(new F.x(-1,0,C.n))
z.push(new F.x(0,-1,C.n))
z.push(new F.x(0,0,C.n))
z.push(new F.x(1,0,C.n))
return new F.av(0,0,z)
case 7:H.cJ("#### WARNING")
break}}}},
x:{
"^":"bm;i:b*,j:c*,a"},
bm:{
"^":"a;A:a>"},
hl:{
"^":"a1;e,f,a,b,c,d",
Z:function(a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=new F.v(0,0,7,7)
y=F.a3(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.U(v,x).a
if(u===C.q)y.a=$.$get$c7()
else if(u===C.e)y.a=$.$get$c6()
else if(u===C.i)y.a=$.$get$c9()
else if(u===C.j)y.a=$.$get$bp()
else if(u===C.n)y.a=$.$get$cb()
else if(u===C.k)y.a=$.$get$ca()
else if(u===C.l)y.a=$.$get$cc()
else if(u===C.m)y.a=$.$get$c8()
else if(u===C.o)y.a=$.$get$bo()
else y.a=$.$get$bo()
if(y.b===C.f){t=a2.ae()
s=z.a
r=z.b
q=J.r(s,z.c)
p=J.r(z.b,z.d)
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.n(0,new E.l(u))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.n(0,new E.l(u))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.n(0,new E.l(u))
u=new Float64Array(3)
u[0]=q
u[1]=p
u[2]=0
l=t.n(0,new E.l(u))
u=y.a.a
a2.N(a1,o,n,m,l,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{t=a2.ae()
s=z.a
r=z.b
q=J.r(s,z.c)
p=J.r(z.b,z.d)
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.n(0,new E.l(u))
u=y.c
if(typeof s!=="number")return s.L()
if(typeof r!=="number")return r.L()
k=new Float64Array(3)
k[0]=s-u
k[1]=r-u
k[2]=0
j=t.n(0,new E.l(k))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.n(0,new E.l(u))
u=y.c
k=J.X(p)
i=k.l(p,u)
h=new Float64Array(3)
h[0]=s-u
h[1]=i
h[2]=0
g=t.n(0,new E.l(h))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.n(0,new E.l(u))
u=J.X(q)
i=u.l(q,y.c)
h=y.c
f=new Float64Array(3)
f[0]=i
f[1]=r-h
f[2]=0
e=t.n(0,new E.l(f))
i=new Float64Array(3)
i[0]=q
i[1]=p
i[2]=0
l=t.n(0,new E.l(i))
u=u.l(q,y.c)
k=k.l(p,y.c)
i=new Float64Array(3)
i[0]=u
i[1]=k
i[2]=0
d=t.n(0,new E.l(i))
i=y.a.a
c=(i>>>16&255)/255
b=(i>>>8&255)/255
a=(i>>>0&255)/255
a0=(i>>>24&255)/255
a2.N(a1,j,g,o,n,c,b,a,a0)
a2.N(a1,g,d,n,l,c,b,a,a0)
a2.N(a1,d,e,l,m,c,b,a,a0)
a2.N(a1,e,j,m,o,c,b,a,a0)}}}},
hi:{
"^":"a1;e,f,a,b,c,d",
dG:function(a){var z,y,x,w,v,u,t,s,r
this.f.V(0)
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=this.f
u=J.j(w)
t=u.gi(w)
if(typeof t!=="number")return H.A(t)
s=u.gj(w)
if(typeof s!=="number")return H.A(s)
r=v.U(3+t,3+s)
if(r.a!==C.p)r.a=u.gA(w)}},
Z:function(a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=new F.v(0,0,7,7)
y=F.a3(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.U(v,x).a
if(u===C.q)y.a=$.$get$c7()
else if(u===C.e)y.a=$.$get$c6()
else if(u===C.i)y.a=$.$get$c9()
else if(u===C.j)y.a=$.$get$bp()
else if(u===C.n)y.a=$.$get$cb()
else if(u===C.k)y.a=$.$get$ca()
else if(u===C.l)y.a=$.$get$cc()
else if(u===C.m)y.a=$.$get$c8()
else if(u===C.o)y.a=$.$get$bo()
else y.a=$.$get$bp()
if(y.b===C.f){t=a2.ae()
s=z.a
r=z.b
q=J.r(s,z.c)
p=J.r(z.b,z.d)
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.n(0,new E.l(u))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.n(0,new E.l(u))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.n(0,new E.l(u))
u=new Float64Array(3)
u[0]=q
u[1]=p
u[2]=0
l=t.n(0,new E.l(u))
u=y.a.a
a2.N(a1,o,n,m,l,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{t=a2.ae()
s=z.a
r=z.b
q=J.r(s,z.c)
p=J.r(z.b,z.d)
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.n(0,new E.l(u))
u=y.c
if(typeof s!=="number")return s.L()
if(typeof r!=="number")return r.L()
k=new Float64Array(3)
k[0]=s-u
k[1]=r-u
k[2]=0
j=t.n(0,new E.l(k))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.n(0,new E.l(u))
u=y.c
k=J.X(p)
i=k.l(p,u)
h=new Float64Array(3)
h[0]=s-u
h[1]=i
h[2]=0
g=t.n(0,new E.l(h))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.n(0,new E.l(u))
u=J.X(q)
i=u.l(q,y.c)
h=y.c
f=new Float64Array(3)
f[0]=i
f[1]=r-h
f[2]=0
e=t.n(0,new E.l(f))
i=new Float64Array(3)
i[0]=q
i[1]=p
i[2]=0
l=t.n(0,new E.l(i))
u=u.l(q,y.c)
k=k.l(p,y.c)
i=new Float64Array(3)
i[0]=u
i[1]=k
i[2]=0
d=t.n(0,new E.l(i))
i=y.a.a
c=(i>>>16&255)/255
b=(i>>>8&255)/255
a=(i>>>0&255)/255
a0=(i>>>24&255)/255
a2.N(a1,j,g,o,n,c,b,a,a0)
a2.N(a1,g,d,n,l,c,b,a,a0)
a2.N(a1,d,e,l,m,c,b,a,a0)
a2.N(a1,e,j,m,o,c,b,a,a0)}}}},
hr:{
"^":"a1;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b,c,d",
bP:function(a,b){var z,y,x,w,v
z=this.r
this.cx.r=z.d
this.cy.r=z.e
y=z.b
x=y.length
if(x>1&&!0){w=this.ch
if(1>=x)return H.f(y,1)
w.dG(y[1])}x=z.y
w=$.$get$dk()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.y=b
z.cM()}x=this.x
x=x.z/x.r
if(x>0.5){x=z.r
w=$.$get$bn()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.r=b
z.bM(1,0)}}else if(x<-0.5){x=z.r
w=$.$get$bn()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.r=b
z.bM(-1,0)}}x=this.x
x=-x.Q/x.r
if(x<-0.5)z.cN(b,!1)
else if(x>0.6)z.cN(b,!0)
if(this.y.r){x=z.x
w=$.$get$c1()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.x=b
z.ab(C.a.gF(y),!1)
C.a.gF(y).da()
if(z.b5(C.a.gF(y))){C.a.gF(y).d9()
z.ab(C.a.gF(y),!0)}else z.ab(C.a.gF(y),!0)}}else if(this.z.r){x=z.x
w=$.$get$c1()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.x=b
z.ab(C.a.gF(y),!1)
C.a.gF(y).da()
if(z.b5(C.a.gF(y))){C.a.gF(y).d9()
z.ab(C.a.gF(y),!0)}else z.ab(C.a.gF(y),!0)}}if(z.c)this.f.al().T(new F.hv(this))},
d3:[function(a){},"$1","gd2",2,0,3],
dW:function(a,b,c,d){var z,y,x,w,v
z=this.gd2()
y=F.o(170,255,170,204)
x=F.o(170,204,170,255)
w=F.o(170,204,255,170)
v=new E.u(new Float64Array(H.i(16)))
v.v()
v=new F.aj(40,40,!1,!1,"r",y,x,w,z,0,0,0,0,"none",null,v,!1)
v.b=[]
this.y=v
z=this.gd2()
y=F.o(170,255,170,204)
x=F.o(170,204,170,255)
w=F.o(170,204,255,170)
v=new E.u(new Float64Array(H.i(16)))
v.v()
v=new F.aj(40,40,!1,!1,"l",y,x,w,z,0,0,0,0,"none",null,v,!1)
v.b=[]
this.z=v
z=new E.u(new Float64Array(H.i(16)))
z.v()
z=new F.io("joystick",70,35,!1,0,0,0,"none",null,z,!1)
z.b=[]
this.x=z
z=this.e
y=this.r
x=y.a
w=new E.u(new Float64Array(H.i(16)))
w.v()
w=new F.hl(z,x,"none",null,w,!1)
w.b=[]
this.Q=w
x=new E.u(new Float64Array(H.i(16)))
x.v()
x=new F.hi(z,null,"none",null,x,!1)
x.b=[]
x.f=F.dn(5,5)
this.ch=x
x=this.db
w=this.dx
v=new E.u(new Float64Array(H.i(16)))
v.v()
v=new F.b_(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cx=v
x=this.db
w=this.dx
v=new E.u(new Float64Array(H.i(16)))
v.v()
v=new F.b_(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cy=v
v.x=3
this.w(this.Q)
this.w(this.x)
this.w(this.y)
this.w(this.z)
this.w(this.ch)
this.w(this.cx)
this.w(this.cy)
this.Q.c.K(0,100,25,0)
this.x.c.K(0,100,250,0)
this.y.c.K(0,250,225,0)
this.z.c.K(0,300,225,0)
this.ch.c.K(0,225,153,0)
this.cx.c.K(0,225,50,0)
this.cy.c.K(0,225,85,0)
z.S("assets/se_play.png").T(new F.ht(this))
z.aQ("assets/se_play.json").T(new F.hu(this))
y.f=d
y.e=d
P.a9("### game =  "+d)},
static:{hs:function(a,b,c,d){var z=new E.u(new Float64Array(H.i(16)))
z.v()
z=new F.hr(a,b,c,null,null,null,null,null,null,null,null,null,"none",null,z,!1)
z.b=[]
z.dW(a,b,c,d)
return z}}},
ht:{
"^":"c:20;a",
$1:function(a){var z=this.a
z.dx=a
z.cx.f=a
z.cy.f=a}},
hu:{
"^":"c:3;a",
$1:function(a){var z,y
z=this.a
y=new F.cg(a,[])
y.bR(a)
z.db=y
z.cx.e=y
z.cy.e=y}},
hv:{
"^":"c:1;a",
$1:function(a){var z,y
z=this.a
y=z.f
y.w(F.fg(z.e,y,z.r.d))}},
hw:{
"^":"a1;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
fF:[function(a){P.a9("touch # "+a)
switch(a){case"L01":this.dx=120
this.dy=60
this.ch=0
break
case"L02":this.dx=175
this.dy=60
this.ch=1
break
case"L03":this.dx=215
this.dy=60
this.ch=2
break
case"L04":this.dx=265
this.dy=60
this.ch=3
break
case"L05":this.dx=315
this.dy=60
this.ch=4
break}},"$1","gaR",2,0,3],
h6:[function(a){P.a9("touch # "+a)
this.f.al().T(new F.hz(this))},"$1","gfH",2,0,3],
aD:function(a,b,c,d,e,f,g){return!1},
Z:function(a,b){var z,y
z=this.e
if(z!=null&&this.Q!=null){y=this.z
b.aq(a,z,this.Q.ar("BG001.png").gaI(),this.y,y)
b.aq(a,this.e,this.Q.ar("CH001.png").gaI(),new F.v(this.dx,this.dy,35,35),y)}z=this.cx
y=this.f.f.z
if(2>=y.length)return H.f(y,2)
z.r=y[2]
this.cy.r=y[1]
this.db.r=y[0]},
dX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
z.S("assets/se_setting.gif").T(new F.hx(this))
z.aQ("assets/se_setting.json").T(new F.hy(this))
z=this.gaR()
y=F.o(170,255,170,204)
x=F.o(170,204,170,255)
w=F.o(170,204,255,170)
v=new E.u(new Float64Array(H.i(16)))
v.v()
u=new F.aj(45,45,!1,!1,"L01",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
u.z=F.o(0,255,255,255)
v.K(0,120,50,0)
z=this.gaR()
y=F.o(170,255,170,204)
x=F.o(170,204,170,255)
w=F.o(170,204,255,170)
v=new E.u(new Float64Array(H.i(16)))
v.v()
t=new F.aj(45,45,!1,!1,"L02",y,x,w,z,0,0,0,0,"none",null,v,!1)
t.b=[]
t.z=F.o(0,255,255,255)
v.K(0,175,50,0)
z=this.gaR()
y=F.o(170,255,170,204)
x=F.o(170,204,170,255)
w=F.o(170,204,255,170)
v=new E.u(new Float64Array(H.i(16)))
v.v()
s=new F.aj(45,45,!1,!1,"L03",y,x,w,z,0,0,0,0,"none",null,v,!1)
s.b=[]
s.z=F.o(0,255,255,255)
v.K(0,215,50,0)
z=this.gaR()
y=F.o(170,255,170,204)
x=F.o(170,204,170,255)
w=F.o(170,204,255,170)
v=new E.u(new Float64Array(H.i(16)))
v.v()
r=new F.aj(45,45,!1,!1,"L04",y,x,w,z,0,0,0,0,"none",null,v,!1)
r.b=[]
r.z=F.o(0,255,255,255)
v.K(0,265,50,0)
z=this.gaR()
y=F.o(170,255,170,204)
x=F.o(170,204,170,255)
w=F.o(170,204,255,170)
v=new E.u(new Float64Array(H.i(16)))
v.v()
q=new F.aj(45,45,!1,!1,"L05",y,x,w,z,0,0,0,0,"none",null,v,!1)
q.b=[]
q.z=F.o(0,255,255,255)
v.K(0,315,50,0)
this.w(u)
this.w(t)
this.w(s)
this.w(r)
this.w(q)
z=new E.u(new Float64Array(H.i(16)))
z.v()
y=new F.b_(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cx=y
z.K(0,120,140,0)
z=new E.u(new Float64Array(H.i(16)))
z.v()
y=new F.b_(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cy=y
z.K(0,150,180,0)
z=new E.u(new Float64Array(H.i(16)))
z.v()
y=new F.b_(null,null,0,7,"none",null,z,!1)
y.b=[]
this.db=y
z.K(0,180,220,0)
this.w(this.cx)
this.w(this.cy)
this.w(this.db)
this.ch=1
this.fF("L01")
z=this.gfH()
y=F.o(170,255,170,204)
x=F.o(170,204,170,255)
w=F.o(170,204,255,170)
v=new E.u(new Float64Array(H.i(16)))
v.v()
p=new F.aj(150,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
p.b=[]
v.K(0,240,250,0)
this.w(p)},
static:{dx:function(a,b){var z,y
z=F.a3(null)
y=new E.u(new Float64Array(H.i(16)))
y.v()
y=new F.hw(null,b,a,null,null,z,null,1,null,null,null,0,0,"none",null,y,!1)
y.b=[]
y.dX(a,b)
return y}}},
hx:{
"^":"c:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.v(0,0,J.C(a.gR()),J.C(z.e.gY()))
z.y=new F.v(0,0,400,300)
z.cx.f=a
z.cy.f=a
z.db.f=a}},
hy:{
"^":"c:3;a",
$1:function(a){var z,y
z=this.a
y=new F.cg(a,[])
y.bR(a)
z.Q=y
z.cx.e=y
z.cy.e=y
z.db.e=y}},
hz:{
"^":"c:1;a",
$1:function(a){var z,y
z=this.a
P.a9("### level =  "+z.ch)
y=z.f.f
y.a.V(0)
y.c=!1
y.d=0
y.e=y.f
y=z.f
y.w(F.hs(z.r,y,y.f,z.ch))}},
b_:{
"^":"a1;e,f,r,x,a,b,c,d",
Z:function(a,b){var z,y,x,w
if(this.e==null||this.f==null)return
for(z=0;y=this.x,z<y;++z){x=y-1-z
if(x===0)x=1
else x=Math.pow(10,x)
x=C.b.c2(C.b.c7(this.r,x),10)
w=new F.dK(null,C.f,1)
w.a=F.o(255,255,255,255)
b.aq(a,this.f,this.e.ar("NUM00"+H.b(x)+".png").gaI(),new F.v(z*12,0,15,15),w)}}},
hU:{
"^":"a1;e,f,r,x,y,z,Q,a,b,c,d",
aD:function(a,b,c,d,e,f,g){if(this.Q&&c==="pointerup"){this.Q=!1
this.r.al().T(new F.hY(this))}else if(c==="pointerdown")this.Q=!0
return!1},
Z:function(a,b){var z=this.e
if(z!=null&&this.f!=null){b.aq(a,z,this.f.ar("BG001.png").gaI(),this.f.ar("BG001.png").gfe(),this.y)
this.z.fG(a,b,this)}},
dZ:function(a,b){var z=this.x
z.S("assets/se_start.gif").T(new F.hW(this))
z.ag("assets/se_start.json").T(new F.hX(this))},
static:{hV:function(a,b){var z,y,x
z=F.a3(null)
y=F.hQ()
x=new E.u(new Float64Array(H.i(16)))
x.v()
x=new F.hU(null,null,b,a,z,y,!1,"none",null,x,!1)
x.b=[]
x.dZ(a,b)
return x}}},
hW:{
"^":"c:1;a",
$1:function(a){this.a.e=a}},
hX:{
"^":"c:1;a",
$1:function(a){var z=new F.cg(a,[])
z.bR(a)
this.a.f=z}},
hY:{
"^":"c:1;a",
$1:function(a){var z,y
z=this.a
y=z.r
y.w(F.dx(z.x,y))}},
hO:{
"^":"a;i:a*,j:b*,c,d,A:e>,f",
d7:function(a){var z=this.f
this.a=z.ba()*400
this.b=-1*z.ba()*100
this.c=z.ba()-0.5
this.d=z.ba()}},
hP:{
"^":"a;a,b",
fG:function(a,b,c){var z,y,x,w,v,u,t,s
if(c.e!=null&&c.f!=null)for(z=this.a,y=z.length,x=c.y,w=0;w<z.length;z.length===y||(0,H.L)(z),++w){v=z[w]
u=c.f.ar(v.e).e
b.aq(a,c.e,c.f.ar(v.e).gaI(),new F.v(v.a,v.b,u.a/3,u.b/3),x)
v.a=J.r(v.a,v.c)
t=J.r(v.b,v.d)
v.b=t
v.d+=0.001
s=v.a
if(typeof s!=="number")return s.ai()
if(!(s<0))if(!(s>400)){if(typeof t!=="number")return t.ah()
t=t>300}else t=!0
else t=!0
if(t)v.d7(0)}},
dY:function(){var z,y,x
for(z=this.a,y=1;y<=7;++y){x="B00"+y+".png"
x=new F.hO(0,0,0,0,x,C.r)
x.d7(0)
z.push(x)}},
static:{hQ:function(){var z=new F.hP([],C.r)
z.dY()
return z}}}}],["","",,P,{
"^":"",
k0:function(a){var z={}
a.O(0,new P.k1(z))
return z},
k3:function(a,b){var z=[]
return new P.k6(b,new P.k4([],z),new P.k5(z),new P.k7(z)).$1(a)},
k2:function(a){return a},
d4:function(){var z=$.d3
if(z==null){z=J.bN(window.navigator.userAgent,"Opera",0)
$.d3=z}return z},
fz:function(){var z,y
z=$.d0
if(z!=null)return z
y=$.d1
if(y==null){y=J.bN(window.navigator.userAgent,"Firefox",0)
$.d1=y}if(y===!0)z="-moz-"
else{y=$.d2
if(y==null){y=P.d4()!==!0&&J.bN(window.navigator.userAgent,"Trident/",0)
$.d2=y}if(y===!0)z="-ms-"
else z=P.d4()===!0?"-o-":"-webkit-"}$.d0=z
return z},
k1:{
"^":"c:21;a",
$2:function(a,b){this.a[a]=b}},
k4:{
"^":"c:22;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
k5:{
"^":"c:23;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.f(z,a)
return z[a]}},
k7:{
"^":"c:24;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.f(z,a)
z[a]=b}},
k6:{
"^":"c:1;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.fw(a.getTime(),!0)
if(a instanceof RegExp)throw H.d(new P.co("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.at()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.L)(w),++u){t=w[u]
x.m(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.F(a)
s=w.gp(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.A(s)
v=J.aO(x)
r=0
for(;r<s;++r)v.m(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
ep:[function(){var z=0,y=new P.a_(),x=1,w,v,u,t,s,r,q,p,o
function $async$ep(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
p=p.at()
o=P
v=new q.ij(700,500,p,o.at())
q=E
q=q
p=Float64Array
o=H
u=new q.u(new p(o.i(16)))
q=u
q.v()
q=F
t=new q.im(400,300,1,1,1,0,0,null,"none",null,u,!1)
q=t
q.b=[]
q=t
p=F
q.ch=p.o(255,238,238,255)
q=E
q=q
p=Float64Array
o=H
u=new q.u(new p(o.i(16)))
q=u
q.v()
q=G
s=new q.ix(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
q=s
p=G
q.a=p.it(400,600)
q=s
q.sa_(t)
q=s
q.fD()
q=s
q.fU()
q=s
q.x=!0
q=s
z=!q.d?2:3
break
case 2:q=s
q.d=!0
q=s
q.aX()
case 3:q=F
q=q
p=F
u=new q.hh(p.dn(21,11),[],!1,0,1,1,0,0,0,[0,0,0],0)
q=u
q.cV()
q=E
q=q
p=Float64Array
o=H
r=new q.u(new p(o.i(16)))
q=r
q.v()
q=F
r=new q.hj(v,u,"none",null,r,!1)
q=r
q.b=[]
q=E
q=q
p=Float64Array
o=H
u=new q.u(new p(o.i(16)))
q=u
q.v()
q=F
u=new q.hJ(r,v,0,"none",null,u,!1)
q=u
q.b=[]
q=u
q.P(0)
q=r
q.w(u)
q=t
q.w(r)
return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$ep,y,null)},"$0","eq",0,0,0]},1],["","",,F,{
"^":"",
bi:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.L)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.b1(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fb:{
"^":"a;a",
k:function(a){return C.L.h(0,this.a)}},
f8:{
"^":"a;a,b,c",
dr:function(a){var z=this.a
if(z.X(a))return z.h(0,a)
else return z.h(0,this.b)},
fd:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o
z=new F.v(0,0,0,0)
y=new F.v(0,0,0,0)
x=f.a
w=f.b
v=J.C(c.gR())
u=J.C(c.gY())
for(t=new H.fp(d),t=t.gJ(t),s=this.c,r=e+5;t.C();){q=this.dr(t.d)
z.c=q.aW(v,u).c
z.d=q.aW(v,u).d
z.a=q.aW(v,u).a
z.b=q.aW(v,u).b
y.a=x
y.b=w
p=z.c*e/z.d
y.c=p
y.d=e
p=J.r(x,p)
o=f.c
if(typeof p!=="number")return p.ah()
if(p>o){y.a=f.a
y.b=r}b.aq(a,c,z,y,s)
x=J.r(J.r(y.a,y.c),2)
w=y.b}},
fc:function(a,b,c,d,e,f){return this.fd(a,b,c,d,e,f,C.x)},
dR:function(a){var z,y,x,w,v,u
z=P.ea(a,null)
for(y=z.gaf(),y=y.gJ(y),x=this.a;y.C();){w=y.gG()
v=z.h(0,w)
u=J.F(v)
x.m(0,H.hA(w,null,null),new F.fa(J.C(u.h(v,"u")),J.C(u.h(v,"v")),J.C(u.h(v,"w")),J.C(u.h(v,"h")),J.C(u.h(v,"vx")),J.C(u.h(v,"vy")),J.C(u.h(v,"vw")),J.C(u.h(v,"vh")),new F.ck(0,0),new F.v(0,0,0,0)))}},
static:{f9:function(a){var z=new F.f8(P.at(),32,F.a3(null))
z.dR(a)
return z}}},
fa:{
"^":"a;a,b,R:c<,Y:d<,e,f,r,x,y,z",
aW:function(a,b){var z,y
z=this.z
z.a=a*this.a
y=this.d*b
z.b=b-b*this.b-y
z.c=this.c*a
z.d=y
return z}},
aj:{
"^":"a1;R:e<,Y:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
cI:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
aD:function(a,b,c,d,e,f,g){var z
switch(c){case"pointerdown":if(this.cI(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.cy=0
this.db=0}break
case"pointermove":if(this.cI(d,e)){this.x=!0
z=this.cy+(f-this.dx)
this.cy=z
this.db=this.db+(g-this.dy)
if(!(Math.sqrt(H.a4(z*z))>this.e)){z=this.db
z=Math.sqrt(H.a4(z*z))>this.f}else z=!0
if(z){this.r=!1
this.x=!1}}else{this.r=!1
this.x=!1}break
case"pointerup":if(this.r&&!0)P.fH(new F.ig(this),null)
this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
Z:function(a,b){var z=F.a3(null)
if(this.r){z.a=this.Q
b.aA(a,new F.v(0,0,this.e,this.f),z)}else if(this.x){z.a=this.ch
b.aA(a,new F.v(0,0,this.e,this.f),z)}else{z.a=this.z
b.aA(a,new F.v(0,0,this.e,this.f),z)}},
d3:function(a){return this.cx.$1(a)}},
ig:{
"^":"c:0;a",
$0:function(){var z=this.a
z.d3(z.y)}},
ih:{
"^":"a;"},
a1:{
"^":"a;",
w:function(a){var z=0,y=new P.a_(),x=1,w,v=this,u,t,s,r
function $async$w(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.e(new s.G(0,r.p,null),[null])
t=u
t.aJ(null)
z=2
return H.k(u,$async$w,y)
case 2:t=v
t=t.b
t.push(a)
return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$w,y,null)},
bb:function(a){var z=0,y=new P.a_(),x=1,w,v=this,u,t,s
function $async$bb(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.G(0,s.p,null)
u.$builtinTypeInfo=[null]
t=u
t.aJ(null)
z=2
return H.k(u,$async$bb,y)
case 2:t=v
u=t.b
t=u
if(t){z=3
break}else c=t
z=4
break
case 3:t=C
c=t.a
case 4:t=c
t.a9(u,a)
t=a
t.dh()
return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$bb,y,null)},
al:function(){var z=0,y=new P.a_(),x=1,w,v=this,u,t,s,r,q,p
function $async$al(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.e(new q.G(0,p.p,null),[null])
r=u
r.aJ(null)
z=2
return H.k(u,$async$al,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.bb(u[s])
case 4:r=u.length===t
if(r)b=r
else{z=6
break}z=7
break
case 6:r=H
b=(0,r.L)(u)
case 7:b,++s
z=3
break
case 5:return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$al,y,null)},
cR:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].cR(a)},
bP:function(a,b){},
df:function(a,b){var z,y,x
this.bH()
this.bP(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].df(a,b)},
Z:function(a,b){},
bQ:["dO",function(a,b){var z,y,x,w,v,u
this.bH()
this.Z(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.L)(z),++w){v=z[w]
u=v.c
x.push(C.a.gaB(x).n(0,u))
b.bf()
v.bQ(a,b)
if(0>=x.length)return H.f(x,0)
x.pop()
b.bf()}}],
dg:["ac",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.bH()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.f(y,w)
v=y[w]
a.a8(v.c)
u=v.dg(a,b,c,d,e)
a.a7()
if(u===!0)return u}t=a.ds().bF(0)
t.fu()
y=new E.l(new Float64Array(H.i(3)))
y.B(d,e,0)
s=t.n(0,y)
return this.aD(a,b,c,s.gi(s),s.gj(s),d,e)}],
aD:function(a,b,c,d,e,f,g){return!1},
dh:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].dh()
this.d=!1},
bH:function(){if(!this.d)this.d=!0}},
ii:{
"^":"a;",
S:function(a){var z=0,y=new P.a_(),x,w=2,v,u=this,t,s,r,q
function $async$S(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.X(a)?3:4
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
return H.k(q.b8(a),$async$S,y)
case 5:s.m(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$S,y,null)},
ag:function(a){var z=0,y=new P.a_(),x,w=2,v,u=this,t,s,r,q
function $async$ag(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.b
s=t
z=s.X(a)?3:4
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
return H.k(q.aQ(a),$async$ag,y)
case 5:s.m(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$ag,y,null)}},
v:{
"^":"a;i:a*,j:b*,R:c<,Y:d<",
u:function(a,b){if(b==null)return!1
return b instanceof F.v&&J.E(b.a,this.a)&&J.E(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gE:function(a){return F.bi([J.I(this.a),J.I(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
k:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)+", w:"+H.b(this.c)+", h:"+H.b(this.d)}},
dL:{
"^":"a;i:a*,j:b*",
u:function(a,b){if(b==null)return!1
return b instanceof F.dL&&J.E(b.a,this.a)&&J.E(b.b,this.b)},
gE:function(a){return F.bi([J.I(this.a),J.I(this.b)])},
k:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)}},
ck:{
"^":"a;R:a<,Y:b<",
u:function(a,b){if(b==null)return!1
return b instanceof F.ck&&b.a===this.a&&b.b===this.b},
gE:function(a){return F.bi([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
k:function(a){return"w:"+H.b(this.a)+", h:"+H.b(this.b)}},
ip:{
"^":"a;a",
k:function(a){return C.M.h(0,this.a)}},
dK:{
"^":"a;a,b,c",
e1:function(a){if(this.a==null)this.a=F.o(255,255,255,255)},
static:{a3:function(a){var z=new F.dK(a,C.f,1)
z.e1(a)
return z}}},
dJ:{
"^":"a;a",
u:function(a,b){if(b==null)return!1
return b instanceof F.dJ&&b.a===this.a},
gE:function(a){return F.bi([this.a&0x1FFFFFFF])},
k:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
e0:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{o:function(a,b,c,d){var z=new F.dJ(0)
z.e0(a,b,c,d)
return z}}},
cj:{
"^":"a;"},
im:{
"^":"a1;R:e<,Y:f<,r,x,y,z,Q,ch,a,b,c,d",
dg:function(a,b,c,d,e){a.a8(this.c)
this.ac(a,b,c,d,e)
a.a7()},
bP:function(a,b){var z,y,x,w
z=a.gR()
y=a.gfJ(a)
x=this.e
y=(z-y)/x
this.r=y
z=a.a
w=(z.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(z.c-x*y)/2+0
y=new E.u(new Float64Array(H.i(16)))
y.v()
this.c=y
y.K(0,this.z,this.Q,0)
y=this.c
x=this.y
y.c3(0,x,x,1)},
bQ:function(a,b){var z,y,x
z=new F.v(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.gaB(x).n(0,y))
b.bf()
y=b.b
y.push(z)
b.b4(a,z)
this.dO(a,b)
if(0>=y.length)return H.f(y,0)
y.pop()
if(y.length>0)b.b4(a,C.a.gaB(y))
else{y=a.a
b.b4(a,new F.v(0,0,y.c,y.d))}if(0>=x.length)return H.f(x,0)
x.pop()
b.bf()},
Z:function(a,b){var z,y
z=new F.v(0,0,this.e,this.f)
y=F.a3(null)
y.a=this.ch
b.b4(a,z)
b.aA(a,z,y)}},
io:{
"^":"a1;e,f,r,x,y,z,Q,a,b,c,d",
Z:function(a,b){var z,y,x,w,v,u,t
z=F.a3(null)
if(this.x)z.a=F.o(170,170,170,255)
else z.a=F.o(170,255,170,170)
y=this.f
x=-y/2
w=this.z
v=this.r
u=v/2
t=this.Q
b.cO(a,new F.v(x,x,y,y),z)
b.cO(a,new F.v(w-u,t-u,v,v),z)},
aD:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(!this.x){if(this.cL(d,e,0,0)<this.f){this.y=b
this.x=!0
this.z=d
this.Q=e}}else if(b===this.y)if(c==="pointerup"||c==="pointercancel"){this.x=!1
this.z=0
this.Q=0}else{this.z=d
this.Q=e
z=this.cL(0,0,d,e)
y=this.f
x=y/2
if(z>x){w=this.z
v=w>0?w:-1*w
u=this.Q
t=v+(u>0?u:-1*u)
this.z=x*w/t
this.Q=y/2*u/t}}return!1},
cL:function(a,b,c,d){var z,y
z=a-c
H.a4(z)
H.a4(2)
z=Math.pow(z,2)
y=b-d
H.a4(y)
H.a4(2)
return Math.sqrt(H.a4(z+Math.pow(y,2)))}},
cg:{
"^":"a;a,b",
ar:function(a){var z,y,x,w
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
if(J.E(w.a,a))return w}return},
bR:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.b7(H.kt(J.bL(P.ea(a,null),"frames"),"$ism",[P.hd],"$asm")),y=this.b;z.C();){x=z.gG()
w=new F.hT(null,null,null,null,null,null,null)
v=J.F(x)
w.a=v.h(x,"filename")
w.r=w.d4(v.h(x,"frame"))
w.b=v.h(x,"rotated")
w.c=v.h(x,"trimmed")
w.d=w.d4(v.h(x,"spriteSourceSize"))
u=v.h(x,"sourceSize")
t=J.F(u)
s=t.h(u,"w")
r=t.h(u,"h")
w.e=new F.ck(J.C(s),J.C(r))
v=v.h(x,"pivot")
u=J.F(v)
q=u.h(v,"x")
p=u.h(v,"y")
w.f=new F.dL(J.C(q),J.C(p))
y.push(w)}}},
hT:{
"^":"a;a,b,c,d,e,f,r",
gfe:function(){var z,y,x,w
z=this.b
y=this.d
if(z===!0){z=y.b
if(typeof z!=="number")return H.A(z)
x=y.d
w=y.a
if(typeof w!=="number")return H.A(w)
return new F.v(-1*z-x,w,x,y.c)}else return new F.v(y.a,y.b,y.c,y.d)},
gaI:function(){var z,y
z=this.b
y=this.r
if(z===!0)return new F.v(y.a,y.b,y.d,y.c)
else return new F.v(y.a,y.b,y.c,y.d)},
d4:function(a){var z,y,x,w,v
z=J.F(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.v(J.C(y),J.C(x),J.C(w),J.C(v))}},
iq:{
"^":"a;",
ga_:function(){return this.c$},
sa_:function(a){this.c$=a},
fz:function(a){if(!this.e$){this.c$.cR(this)
this.e$=!0}this.c$.df(this,a)
this.fB()},
a8:function(a){var z=this.f$
z.push(C.a.gaB(z).n(0,a))},
a7:function(){var z=this.f$
if(0>=z.length)return H.f(z,0)
z.pop()},
ds:function(){return C.a.gaB(this.f$)}}}],["","",,G,{
"^":"",
cl:function(a){var z=0,y=new P.a_(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$cl(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.e(new p.cr(o.e(new n.G(0,m.p,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.f5(t,a)
q=J
s=q.j(t)
q=s
r=q.gbO(t)
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
m=m.K(new l.iv(u,t))
l=r
p=new p.J(0,o,n,m,l.c)
o=H
q=q.e(p,[o.D(r,0)])
q.H()
q=s
s=q.gbN(t)
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
m=m.K(new l.iw(a,u))
l=s
p=new p.J(0,o,n,m,l.c)
o=H
q=q.e(p,[o.D(s,0)])
q.H()
q=u
x=q.a
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$cl,y,null)},
dM:function(a,b,c){var z,y
z=J.eK(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
iu:{
"^":"cj;a,b",
gR:function(){return J.eZ(this.a)},
gY:function(){return J.eQ(this.a)},
du:function(a){var z
if(this.b==null){z=J.j(a).f_(a)
this.b=z
a.bindTexture(3553,z)
C.O.fQ(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
is:{
"^":"a;a,b,c,q:d>",
e2:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.aE(b)
y=C.c.aE(a)
x=document.createElement("canvas",null)
J.f6(x,z)
J.f4(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.f1(this.b,!0)},
static:{it:function(a,b){var z=new G.is(null,null,null,null)
z.e2(a,b)
return z}}},
ir:{
"^":"ih;c,d,e,f,r,x,y,z,Q,ch,cx,a,b",
fo:function(){var z,y,x,w,v,u
P.a9("#[A]# "+H.b(J.cR(this.c,35660)))
P.a9("#[B]# "+H.b(J.cR(this.c,33901)))
z=C.a.cS(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.cS(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.c
w=G.dM(x,35633,z)
v=G.dM(x,35632,y)
u=J.eJ(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.e=u},
V:function(a){this.f=1
this.Q=-0.5
J.cP(this.c,2960)
J.eL(this.c,515)
J.eE(this.c,0,0,0,1)
J.eF(this.c,1)
J.eG(this.c,0)
J.cP(this.c,3042)
switch(-1){case-1:J.eA(this.c,32774)
J.eB(this.c,770,771,770,32772)
break}J.eD(this.c,17664)
C.a.sp(this.r,0)
C.a.sp(this.x,0)
C.a.sp(this.y,0)
this.z=null},
b7:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
if(z.length!==0){y=this.x
F.o(170,255,170,170)
J.cV(this.c,this.e)
x=J.b8(this.c,this.e,"a_tex")
w=J.bO(this.c)
J.bM(this.c,34962,w)
v=this.y
J.eC(this.c,34962,new Float32Array(H.bB(v)),35044)
J.b6(this.c,x)
J.ba(this.c,x,2,5126,!1,0,0)
u=this.z
if(u!=null){t=u.du(this.c)
J.cM(this.c,3553,t)
J.b9(this.c,3553,10242,33071)
J.b9(this.c,3553,10243,33071)
J.b9(this.c,3553,10241,9728)
J.b9(this.c,3553,10240,9728)}u=this.c
s=J.bO(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.bB(z)),35044)
u.bindBuffer(34962,null)
J.bM(this.c,34962,s)
u=this.c
s=J.bO(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.bB(y)),35044)
u.bindBuffer(34963,null)
J.bM(this.c,34963,s)
u=this.c
u.uniformMatrix4fv(J.f2(u,this.e,"u_mat"),!1,new Float32Array(H.bB(this.ch.a)))
r=J.b8(this.c,this.e,"color")
q=J.b8(this.c,this.e,"vp")
p=J.b8(this.c,this.e,"useTex")
J.ba(this.c,q,3,5126,!1,32,0)
J.ba(this.c,r,4,5126,!1,32,12)
J.ba(this.c,p,1,5126,!1,32,28)
J.b6(this.c,q)
J.b6(this.c,r)
J.b6(this.c,p)
J.eN(this.c,4,y.length,5123,0)
if(x!==0){J.eM(this.c,x)
J.cM(this.c,3553,null)}J.cV(this.c,null)
C.a.sp(z,0)
C.a.sp(y,0)
C.a.sp(v,0)
this.z=null}},
cO:function(a,b,c){if(c.b===C.f)this.fa(a,b,c)
else this.fb(a,b,c)},
fa:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=J.r(b.a,b.c/2)
y=J.r(b.b,b.d/2)
x=b.c/2
w=b.d/2
v=this.ae()
u=new E.l(new Float64Array(H.i(3)))
u.B(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=J.X(y),o=this.r,n=this.y,m=this.x,l=J.X(z),k=0;k<25;){j=o.length/8|0
u.si(0,z)
u.sj(0,y)
u.saa(0,this.Q)
u=v.n(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0])
i=6.283185307179586*(k/25)
u.si(0,l.l(z,Math.cos(i)*x))
u.sj(0,t.l(y,Math.sin(i)*w))
u.saa(0,this.Q)
u=v.n(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0]);++k
i=6.283185307179586*(k/25)
u.si(0,l.l(z,Math.cos(i)*x))
u.sj(0,t.l(y,Math.sin(i)*w))
u.saa(0,this.Q)
u=v.n(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0])
C.a.I(m,[j,j+1,j+2])
this.Q+=0.0001}},
fb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=J.r(b.a,b.c/2)
y=J.r(b.b,b.d/2)
x=b.c
w=c.c
v=(x+w)/2
u=b.d
t=(u+w)/2
s=x/2
r=u/2
q=this.ae()
p=new E.l(new Float64Array(H.i(3)))
p.B(0,0,0)
o=new E.l(new Float64Array(H.i(3)))
o.B(0,0,0)
n=new E.l(new Float64Array(H.i(3)))
n.B(0,0,0)
m=new E.l(new Float64Array(H.i(3)))
m.B(0,0,0)
u=c.a.a
l=(u>>>16&255)/255
k=(u>>>8&255)/255
j=(u>>>0&255)/255
i=(u>>>24&255)/255
for(x=J.X(y),w=J.X(z),h=0;h<25;){u=6.283185307179586*(h/25)
p.si(0,w.l(z,Math.cos(u)*s))
p.sj(0,x.l(y,Math.sin(u)*r))
p.saa(0,this.Q)
p=q.n(0,p)
o.si(0,w.l(z,Math.cos(u)*v))
o.sj(0,x.l(y,Math.sin(u)*t))
o.saa(0,this.Q)
o=q.n(0,o);++h
u=6.283185307179586*(h/25)
n.si(0,w.l(z,Math.cos(u)*v))
n.sj(0,x.l(y,Math.sin(u)*t))
n.saa(0,this.Q)
n=q.n(0,n)
m.si(0,w.l(z,Math.cos(u)*s))
m.sj(0,x.l(y,Math.sin(u)*r))
m.saa(0,this.Q)
m=q.n(0,m)
this.N(a,p,o,m,n,l,k,j,i)
this.Q+=0.0001}},
aA:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(c.b===C.f){z=this.ae()
y=b.a
x=b.b
w=J.r(y,b.c)
v=J.r(b.b,b.d)
u=new E.l(new Float64Array(H.i(3)))
u.B(y,x,0)
t=z.n(0,u)
u=new E.l(new Float64Array(H.i(3)))
u.B(y,v,0)
s=z.n(0,u)
u=new E.l(new Float64Array(H.i(3)))
u.B(w,x,0)
r=z.n(0,u)
u=new E.l(new Float64Array(H.i(3)))
u.B(w,v,0)
q=z.n(0,u)
u=c.a.a
this.N(a,t,s,r,q,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{z=this.ae()
y=b.a
x=b.b
w=J.r(y,b.c)
v=J.r(b.b,b.d)
u=new E.l(new Float64Array(H.i(3)))
u.B(y,x,0)
t=z.n(0,u)
u=c.c
if(typeof y!=="number")return y.L()
if(typeof x!=="number")return x.L()
p=new E.l(new Float64Array(H.i(3)))
p.B(y-u,x-u,0)
o=z.n(0,p)
p=new E.l(new Float64Array(H.i(3)))
p.B(y,v,0)
s=z.n(0,p)
p=c.c
u=J.X(v)
n=u.l(v,p)
m=new E.l(new Float64Array(H.i(3)))
m.B(y-p,n,0)
l=z.n(0,m)
m=new E.l(new Float64Array(H.i(3)))
m.B(w,x,0)
r=z.n(0,m)
m=J.X(w)
n=m.l(w,c.c)
p=c.c
k=new E.l(new Float64Array(H.i(3)))
k.B(n,x-p,0)
j=z.n(0,k)
k=new E.l(new Float64Array(H.i(3)))
k.B(w,v,0)
q=z.n(0,k)
m=m.l(w,c.c)
u=u.l(v,c.c)
k=new E.l(new Float64Array(H.i(3)))
k.B(m,u,0)
i=z.n(0,k)
k=c.a.a
h=(k>>>16&255)/255
g=(k>>>8&255)/255
f=(k>>>0&255)/255
e=(k>>>24&255)/255
this.N(a,o,l,t,s,h,g,f,e)
this.N(a,l,i,s,q,h,g,f,e)
this.N(a,i,j,q,r,h,g,f,e)
this.N(a,j,o,r,t,h,g,f,e)}},
N:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.r
y=z.length/8|0
C.a.I(z,[b.gi(b),b.gj(b),this.Q,f,g,h,i,-1,c.gi(c),c.gj(c),this.Q,f,g,h,i,-1,d.gi(d),d.gj(d),this.Q,f,g,h,i,-1,e.gi(e),e.gj(e),this.Q,f,g,h,i,-1])
C.a.I(this.y,[0,0,0,0,0,0,0,0])
this.Q+=0.0001
z=y+1
x=y+2
C.a.I(this.x,[y,z,x,z,y+3,x])},
b4:function(a,b){var z
this.b7(0)
J.cN(this.c,!1,!1,!1,!1)
J.cO(this.c,!1)
J.cT(this.c,7680,7681,7681)
J.cS(this.c,519,this.f,255)
z=F.a3(null)
z.a=F.o(255,255,255,255)
this.aA(null,b,z)
this.b7(0)
J.cN(this.c,!0,!0,!0,!0)
J.cO(this.c,!0)
J.cT(this.c,7680,7680,7680)
J.cS(this.c,515,this.f,255);++this.f},
aq:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.z
if(z!=null&&!J.E(z,b))this.b7(0)
this.z=b
z=c.a
y=b.gR()
if(typeof z!=="number")return z.bg()
if(typeof y!=="number")return H.A(y)
x=z/y
y=c.b
z=this.z.gY()
if(typeof y!=="number")return y.bg()
if(typeof z!=="number")return H.A(z)
w=y/z
z=J.r(c.a,c.c)
y=this.z.gR()
if(typeof z!=="number")return z.bg()
if(typeof y!=="number")return H.A(y)
v=z/y
y=J.r(c.b,c.d)
z=this.z.gY()
if(typeof y!=="number")return y.bg()
if(typeof z!=="number")return H.A(z)
u=y/z
C.a.I(this.y,[x,w,x,u,v,w,v,u])
t=this.ae()
s=d.a
r=d.b
q=J.r(s,d.c)
p=J.r(d.b,d.d)
z=new E.l(new Float64Array(H.i(3)))
z.B(s,r,0)
o=t.n(0,z)
z=new E.l(new Float64Array(H.i(3)))
z.B(s,p,0)
n=t.n(0,z)
z=new E.l(new Float64Array(H.i(3)))
z.B(q,r,0)
m=t.n(0,z)
z=new E.l(new Float64Array(H.i(3)))
z.B(q,p,0)
l=t.n(0,z)
z=this.r
k=z.length/8|0
y=e.a.a
j=(y>>>16&255)/255
i=(y>>>8&255)/255
h=(y>>>0&255)/255
g=(y>>>24&255)/255
C.a.I(z,[o.gi(o),o.gj(o),this.Q,j,i,h,g,1,n.gi(n),n.gj(n),this.Q,j,i,h,g,1,m.gi(m),m.gj(m),this.Q,j,i,h,g,1,l.gi(l),l.gj(l),this.Q,j,i,h,g,1])
this.Q+=0.0001
z=k+1
y=k+2
C.a.I(this.x,[k,z,y,z,k+3,y])},
bf:function(){},
ae:function(){var z,y
this.cx.v()
z=this.cx.K(0,-1,1,0)
this.cx=z
y=this.d
y=z.c3(0,2/y.c,-2/y.d,1)
this.cx=y
y=y.n(0,C.a.gaB(this.a))
this.cx=y
return y}},
ij:{
"^":"ii;t:c>,q:d>,a,b",
b8:function(a){var z=0,y=new P.a_(),x,w=2,v,u,t
function $async$b8(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.k(t.cl(a),$async$b8,y)
case 3:x=new u.iu(c,null)
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$b8,y,null)},
aQ:function(a){var z=0,y=new P.a_(),x,w=2,v,u,t,s,r,q,p,o,n,m
function $async$aQ(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=H
p=p
o=P
o=o
n=$
u=r.e(new q.cr(p.e(new o.G(0,n.p,null),[null])),[null])
t=new XMLHttpRequest()
r=C
r=r.B
r.fI(t,"GET",a)
r=t
r.responseType="arraybuffer"
r=H
r=r
q=W
s=r.e(new q.ct(t,"load",!1),[null])
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
n=n.K(new m.ik(u,t))
m=s
q=new q.J(0,p,o,n,m.c)
p=H
r=r.e(q,[p.D(s,0)])
r.H()
r=H
r=r
q=W
s=r.e(new q.ct(t,"error",!1),[null])
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
n=n.K(new m.il(u))
m=s
q=new q.J(0,p,o,n,m.c)
p=H
r=r.e(q,[p.D(s,0)])
r.H()
r=t
r.send()
r=u
x=r.a
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$aQ,y,null)}},
ik:{
"^":"c:25;a,b",
$1:function(a){var z=0,y=new P.a_(),x=1,w,v=this,u,t,s,r
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=J
t=t
s=W
s=s
r=v
r=r.b
u=t.ez(s.jN(r.response))
t=v
t=t.a
t=t
s=P
s=new s.iK(!0)
t.b6(0,s.eW(u))
return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$$1,y,null)}},
il:{
"^":"c:26;a",
$1:function(a){this.a.cJ(a)}},
ix:{
"^":"ho;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gi:function(a){return 0},
gj:function(a){return 0},
gR:function(){return this.a.c},
gY:function(){return this.a.d},
gfJ:function(a){return 0},
fB:function(){this.r=!0},
aX:function(){var z=0,y=new P.a_(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h
function $async$aX(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:j=H
j=j
i=P
u=j.dz(new i.bR(Date.now(),!1))
j=v
t=j.a
j=E
j=j
i=Float64Array
h=H
s=new j.u(new i(h.i(16)))
j=s
j.v()
j=E
j=j
i=Float64Array
h=H
r=new j.u(new i(h.i(16)))
j=r
j.v()
j=E
j=j
i=Float64Array
h=H
q=new j.u(new i(h.i(16)))
j=q
j.v()
j=G
p=new j.ir(null,null,null,1,[],[],[],null,0,s,r,[q],[])
j=p
i=t
j.c=i.a
j=p
j.d=t
j=p
j.fo()
j=p
j.V(0)
o=0,n=0
case 2:j=v
if(!j.d){z=4
break}j=P
j=j
i=P
z=5
return H.k(j.fI(new i.ad(15e3),null,null),$async$aX,y)
case 5:m=Date.now()
j=v
j.b=m
l=m-u
j=v
j=j
i=C
i=i.c
j.fz(i.aE(u+l))
o+=l
if(l<0);else ;++n
j=v
j.r=!0
z=o>40?6:7
break
case 6:j=p
j.V(0)
j=v
j=j.ga_()
j.bQ(v,p)
j=p
j.b7(0)
j=v
j.r=!1
case 7:z=n>40?8:9
break
case 8:j=C
j=j.c
k="###fps  "+j.c7(o,n)
j=H
j.cJ(k)
o=0
n=0
case 9:case 3:u=m
z=2
break
case 4:return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$aX,y,null)},
fU:function(){var z,y,x,w
z=P.at()
y=new G.iG(this,z)
x=new G.iF(this,z)
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchcancel",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(x),w.c),[H.D(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchend",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(x),w.c),[H.D(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchenter",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(y),w.c),[H.D(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchleave",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(y),w.c),[H.D(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchmove",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(y),w.c),[H.D(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchstart",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(y),w.c),[H.D(w,0)]).H()},
fD:function(){var z,y
z={}
z.a=!1
y=J.eR(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iy(z,this)),y.c),[H.D(y,0)]).H()
y=J.eX(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iz(z,this)),y.c),[H.D(y,0)]).H()
y=J.eS(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iA(z,this)),y.c),[H.D(y,0)]).H()
y=J.eT(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iB(z,this)),y.c),[H.D(y,0)]).H()
y=J.eU(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iC(z,this)),y.c),[H.D(y,0)]).H()
y=J.eV(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iD(z,this)),y.c),[H.D(y,0)]).H()
y=J.eW(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iE(z,this)),y.c),[H.D(y,0)]).H()}},
ho:{
"^":"a+iq;"},
iG:{
"^":"c:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.cQ(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.L)(y),++v){u=y[v]
t=C.b.M(u.pageX)
s=C.b.M(u.pageY)
new P.W(t,s).$builtinTypeInfo=[null]
r=t-C.b.M(z.a.b.offsetLeft)
t=C.b.M(u.pageX)
s=C.b.M(u.pageY)
new P.W(t,s).$builtinTypeInfo=[null]
q=s-C.b.M(z.a.b.offsetTop)
if(w.X(u.identifier)){t=z.ga_()
s=u.identifier
if(typeof s!=="number")return s.l()
z.a8(t.c)
t.ac(z,s+1,"pointermove",r,q)
z.a7()}else{w.m(0,u.identifier,u)
t=z.ga_()
s=u.identifier
if(typeof s!=="number")return s.l()
z.a8(t.c)
t.ac(z,s+1,"pointerdown",r,q)
z.a7()}}}},
iF:{
"^":"c:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
z.c=z.b
for(y=J.cQ(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.L)(y),++v){u=y[v]
if(w.X(u.identifier)){t=C.b.M(u.pageX)
s=C.b.M(u.pageY)
new P.W(t,s).$builtinTypeInfo=[null]
s=C.b.M(z.a.b.offsetLeft)
r=C.b.M(u.pageX)
q=C.b.M(u.pageY)
new P.W(r,q).$builtinTypeInfo=[null]
r=C.b.M(z.a.b.offsetTop)
w.a9(0,u.identifier)
p=z.ga_()
o=u.identifier
if(typeof o!=="number")return o.l()
z.a8(p.c)
p.ac(z,o+1,"pointerup",t-s,q-r)
z.a7()}}}},
iy:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=z.ga_()
x=J.j(a)
w=x.gW(a)
w=w.gi(w)
w.toString
x=x.gW(a)
x=x.gj(x)
x.toString
z.a8(y.c)
y.ac(z,0,"pointerdown",w,x)
z.a7()}}},
iz:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.ga_()
w=J.j(a)
v=w.gW(a)
v=v.gi(v)
v.toString
w=w.gW(a)
w=w.gj(w)
w.toString
z.a8(x.c)
x.ac(z,0,"pointerup",v,w)
z.a7()
y.a=!1}}}},
iA:{
"^":"c:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
iB:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.ga_()
w=J.j(a)
v=w.gW(a)
v=v.gi(v)
v.toString
w=w.gW(a)
w=w.gj(w)
w.toString
z.a8(x.c)
x.ac(z,0,"pointercancel",v,w)
z.a7()
y.a=!1}}}},
iC:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b)if(this.a.a){y=z.ga_()
x=J.j(a)
w=x.gW(a)
w=w.gi(w)
w.toString
x=x.gW(a)
x=x.gj(x)
x.toString
z.a8(y.c)
y.ac(z,0,"pointermove",w,x)
z.a7()}}},
iD:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.ga_()
w=J.j(a)
v=w.gW(a)
v=v.gi(v)
v.toString
w=w.gW(a)
w=w.gj(w)
w.toString
z.a8(x.c)
x.ac(z,0,"pointercancel",v,w)
z.a7()
y.a=!1}}}},
iE:{
"^":"c:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
iv:{
"^":"c:1;a,b",
$1:function(a){this.a.b6(0,this.b)}},
iw:{
"^":"c:1;a,b",
$1:function(a){this.b.cJ("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
u:{
"^":"a;a",
aH:function(a){var z,y
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
k:function(a){return"[0] "+this.aV(0).k(0)+"\n[1] "+this.aV(1).k(0)+"\n[2] "+this.aV(2).k(0)+"\n[3] "+this.aV(3).k(0)+"\n"},
gf7:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.f(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=16)return H.f(z,b)
z[b]=c},
aV:function(a){var z,y,x
z=new Float64Array(H.i(4))
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
return new E.ak(z)},
bF:function(a){var z=new E.u(new Float64Array(H.i(16)))
z.aH(this)
return z},
n:function(a,b){var z,y,x
if(!!b.$isak){z=new Float64Array(H.i(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ak(z)}if(!!b.$isl){z=new Float64Array(H.i(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.l(z)}if(4===b.gf7()){z=new Float64Array(H.i(16))
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
return new E.u(z)}throw H.d(P.aR(b))},
l:function(a,b){var z,y
z=new Float64Array(H.i(16))
y=this.a
z[0]=C.b.l(y[0],b.gD().h(0,0))
z[1]=C.b.l(y[1],b.gD().h(0,1))
z[2]=C.b.l(y[2],b.gD().h(0,2))
z[3]=C.b.l(y[3],b.gD().h(0,3))
z[4]=C.b.l(y[4],b.gD().h(0,4))
z[5]=C.b.l(y[5],b.gD().h(0,5))
z[6]=C.b.l(y[6],b.gD().h(0,6))
z[7]=C.b.l(y[7],b.gD().h(0,7))
z[8]=C.b.l(y[8],b.gD().h(0,8))
z[9]=C.b.l(y[9],b.gD().h(0,9))
z[10]=C.b.l(y[10],b.gD().h(0,10))
z[11]=C.b.l(y[11],b.gD().h(0,11))
z[12]=C.b.l(y[12],b.gD().h(0,12))
z[13]=C.b.l(y[13],b.gD().h(0,13))
z[14]=C.b.l(y[14],b.gD().h(0,14))
z[15]=C.b.l(y[15],b.gD().h(0,15))
return new E.u(z)},
K:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.q(b)
y=!!z.$isak
x=y?b.gR():1
if(!!z.$isl||y){w=z.gi(b)
v=z.gj(b)
u=z.gaa(b)}else{u=d
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
c3:function(a,b,c,d){var z,y,x,w,v,u
z=J.q(b)
y=!!z.$isak
x=y?b.gR():1
if(!!z.$isl||y){w=z.gi(b)
v=z.gj(b)
u=z.gaa(b)}else{u=d
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
v:function(){var z=this.a
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
fu:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
l:{
"^":"a;a",
B:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aH:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
k:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
l:function(a,b){var z,y,x,w
z=this.a
y=C.b.l(z[0],b.gD().h(0,0))
x=C.b.l(z[1],b.gD().h(0,1))
z=C.b.l(z[2],b.gD().h(0,2))
w=new E.l(new Float64Array(H.i(3)))
w.B(y,x,z)
return w},
n:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.A(b)
x=z[1]
z=z[2]
w=new E.l(new Float64Array(H.i(3)))
w.B(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.f(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=3)return H.f(z,b)
z[b]=c},
gp:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.a4(y*y+x*x+z*z))},
bF:function(a){var z=new E.l(new Float64Array(H.i(3)))
z.aH(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
saa:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]}},
ak:{
"^":"a;a",
c5:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aH:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
k:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
l:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.l(z[0],b.gD().h(0,0))
x=C.b.l(z[1],b.gD().h(0,1))
w=C.b.l(z[2],b.gD().h(0,2))
z=C.b.l(z[3],b.gD().h(0,3))
v=new E.ak(new Float64Array(H.i(4)))
v.c5(y,x,w,z)
return v},
n:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.A(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ak(new Float64Array(H.i(4)))
v.c5(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.f(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=4)return H.f(z,b)
z[b]=c},
gp:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.a4(y*y+x*x+w*w+z*z))},
bF:function(a){var z=new E.ak(new Float64Array(H.i(4)))
z.aH(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
saa:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]},
gR:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.q=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.de.prototype
return J.dd.prototype}if(typeof a=="string")return J.bg.prototype
if(a==null)return J.h4.prototype
if(typeof a=="boolean")return J.h3.prototype
if(a.constructor==Array)return J.aU.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bE(a)}
J.F=function(a){if(typeof a=="string")return J.bg.prototype
if(a==null)return a
if(a.constructor==Array)return J.aU.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bE(a)}
J.aO=function(a){if(a==null)return a
if(a.constructor==Array)return J.aU.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bE(a)}
J.aC=function(a){if(typeof a=="number")return J.aV.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.cp.prototype
return a}
J.X=function(a){if(typeof a=="number")return J.aV.prototype
if(typeof a=="string")return J.bg.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.cp.prototype
return a}
J.j=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bE(a)}
J.r=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.X(a).l(a,b)}
J.E=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.q(a).u(a,b)}
J.U=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aC(a).ah(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aC(a).ai(a,b)}
J.ew=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.X(a).n(a,b)}
J.bL=function(a,b){if(a.constructor==Array||typeof a=="string"||H.km(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.F(a).h(a,b)}
J.ex=function(a,b,c,d){return J.j(a).e6(a,b,c,d)}
J.ey=function(a,b,c,d){return J.j(a).ev(a,b,c,d)}
J.ez=function(a){return J.j(a).eB(a)}
J.bM=function(a,b,c){return J.j(a).eD(a,b,c)}
J.cM=function(a,b,c){return J.j(a).eE(a,b,c)}
J.eA=function(a,b){return J.j(a).eG(a,b)}
J.eB=function(a,b,c,d,e){return J.j(a).eH(a,b,c,d,e)}
J.eC=function(a,b,c,d){return J.j(a).eI(a,b,c,d)}
J.eD=function(a,b){return J.aO(a).eL(a,b)}
J.eE=function(a,b,c,d,e){return J.j(a).eM(a,b,c,d,e)}
J.eF=function(a,b){return J.j(a).eN(a,b)}
J.eG=function(a,b){return J.j(a).eQ(a,b)}
J.cN=function(a,b,c,d,e){return J.j(a).eS(a,b,c,d,e)}
J.eH=function(a,b){return J.X(a).az(a,b)}
J.eI=function(a,b){return J.j(a).b6(a,b)}
J.bN=function(a,b,c){return J.F(a).eU(a,b,c)}
J.bO=function(a){return J.j(a).eX(a)}
J.eJ=function(a){return J.j(a).eY(a)}
J.eK=function(a,b){return J.j(a).eZ(a,b)}
J.eL=function(a,b){return J.j(a).f0(a,b)}
J.cO=function(a,b){return J.j(a).f1(a,b)}
J.eM=function(a,b){return J.j(a).f8(a,b)}
J.eN=function(a,b,c,d,e){return J.j(a).f9(a,b,c,d,e)}
J.eO=function(a,b){return J.aO(a).a3(a,b)}
J.cP=function(a,b){return J.j(a).ff(a,b)}
J.b6=function(a,b){return J.j(a).fg(a,b)}
J.eP=function(a,b){return J.aO(a).O(a,b)}
J.cQ=function(a){return J.j(a).geK(a)}
J.aa=function(a){return J.j(a).gaM(a)}
J.I=function(a){return J.q(a).gE(a)}
J.eQ=function(a){return J.j(a).gq(a)}
J.b7=function(a){return J.aO(a).gJ(a)}
J.aP=function(a){return J.F(a).gp(a)}
J.eR=function(a){return J.j(a).gcW(a)}
J.eS=function(a){return J.j(a).gcX(a)}
J.eT=function(a){return J.j(a).gcY(a)}
J.eU=function(a){return J.j(a).gcZ(a)}
J.eV=function(a){return J.j(a).gd_(a)}
J.eW=function(a){return J.j(a).gd0(a)}
J.eX=function(a){return J.j(a).gd1(a)}
J.eY=function(a){return J.j(a).gbZ(a)}
J.eZ=function(a){return J.j(a).gt(a)}
J.f_=function(a){return J.j(a).gi(a)}
J.b8=function(a,b,c){return J.j(a).dl(a,b,c)}
J.f0=function(a){return J.j(a).dm(a)}
J.f1=function(a,b){return J.j(a).dn(a,b)}
J.cR=function(a,b){return J.j(a).dt(a,b)}
J.f2=function(a,b,c){return J.j(a).dv(a,b,c)}
J.f3=function(a,b){return J.aO(a).aC(a,b)}
J.aD=function(a,b){return J.j(a).bj(a,b)}
J.f4=function(a,b){return J.j(a).sq(a,b)}
J.f5=function(a,b){return J.j(a).saj(a,b)}
J.f6=function(a,b){return J.j(a).st(a,b)}
J.cS=function(a,b,c,d){return J.j(a).dJ(a,b,c,d)}
J.cT=function(a,b,c,d){return J.j(a).dK(a,b,c,d)}
J.b9=function(a,b,c,d){return J.j(a).fS(a,b,c,d)}
J.C=function(a){return J.aC(a).fT(a)}
J.cU=function(a){return J.aC(a).aE(a)}
J.aQ=function(a){return J.q(a).k(a)}
J.cV=function(a,b){return J.j(a).fV(a,b)}
J.ba=function(a,b,c,d,e,f,g){return J.j(a).fW(a,b,c,d,e,f,g)}
I.cH=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.B=W.fM.prototype
C.a=J.aU.prototype
C.C=J.dd.prototype
C.c=J.de.prototype
C.b=J.aV.prototype
C.h=J.bg.prototype
C.N=J.hq.prototype
C.O=P.hI.prototype
C.P=J.cp.prototype
C.x=new F.fb(1)
C.y=new H.d6()
C.z=new P.hp()
C.A=new P.iX()
C.r=new P.jg()
C.d=new P.jw()
C.t=new P.ad(0)
C.D=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.E=function(hooks) {
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
C.u=function getTagFallback(o) {
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
C.v=function(hooks) { return hooks; }

C.F=function(getTagFallback) {
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
C.G=function() {
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
C.H=function(hooks) {
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
C.I=function(hooks) {
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
C.J=function(_, letter) { return letter.toUpperCase(); }
C.w=H.e(I.cH([127,2047,65535,1114111]),[P.n])
C.K=new H.bU([0,"MinoTyoe.empty",1,"MinoTyoe.frame",2,"MinoTyoe.out",3,"MinoTyoe.l",4,"MinoTyoe.o",5,"MinoTyoe.s",6,"MinoTyoe.z",7,"MinoTyoe.j",8,"MinoTyoe.t",9,"MinoTyoe.L"])
C.L=new H.bU([0,"BitmapFontInfoType.vertical",1,"BitmapFontInfoType.horizontal"])
C.M=new H.bU([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.a6(0)
C.q=new F.a6(1)
C.p=new F.a6(2)
C.i=new F.a6(3)
C.j=new F.a6(4)
C.k=new F.a6(5)
C.l=new F.a6(6)
C.m=new F.a6(7)
C.n=new F.a6(8)
C.o=new F.a6(9)
C.f=new F.ip(0)
$.dA="$cachedFunction"
$.dB="$cachedInvocation"
$.a5=0
$.aE=null
$.cX=null
$.cD=null
$.eh=null
$.es=null
$.bD=null
$.bG=null
$.cE=null
$.ax=null
$.aK=null
$.aL=null
$.cy=!1
$.p=C.d
$.d8=0
$.d3=null
$.d2=null
$.d1=null
$.d0=null
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
I.$lazy(y,x,w)}})(["db","$get$db",function(){return H.fZ()},"dc","$get$dc",function(){return new P.fE(null)},"dN","$get$dN",function(){return H.a8(H.bw({toString:function(){return"$receiver$"}}))},"dO","$get$dO",function(){return H.a8(H.bw({$method$:null,toString:function(){return"$receiver$"}}))},"dP","$get$dP",function(){return H.a8(H.bw(null))},"dQ","$get$dQ",function(){return H.a8(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dU","$get$dU",function(){return H.a8(H.bw(void 0))},"dV","$get$dV",function(){return H.a8(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dS","$get$dS",function(){return H.a8(H.dT(null))},"dR","$get$dR",function(){return H.a8(function(){try{null.$method$}catch(z){return z.message}}())},"dX","$get$dX",function(){return H.a8(H.dT(void 0))},"dW","$get$dW",function(){return H.a8(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cs","$get$cs",function(){return P.iL()},"aM","$get$aM",function(){return[]},"dk","$get$dk",function(){return[500,250,200,150,125]},"bn","$get$bn",function(){return[150,150,125,100,100]},"c1","$get$c1",function(){return[150,125,125,125,125]},"dl","$get$dl",function(){return[5,8,10,12,15]},"dm","$get$dm",function(){return[10,20,30,40,50]},"dp","$get$dp",function(){return P.hC(null)},"c6","$get$c6",function(){return F.o(170,136,136,136)},"c7","$get$c7",function(){return F.o(170,85,51,51)},"c9","$get$c9",function(){return F.o(170,255,255,255)},"bp","$get$bp",function(){return F.o(170,0,0,0)},"ca","$get$ca",function(){return F.o(170,255,170,170)},"cc","$get$cc",function(){return F.o(170,170,255,170)},"c8","$get$c8",function(){return F.o(170,170,170,255)},"bo","$get$bo",function(){return F.o(170,255,255,170)},"cb","$get$cb",function(){return F.o(170,170,255,255)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,void:true},{func:1,args:[P.a7]},{func:1,args:[W.c2]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.ah]},{func:1,args:[,],opt:[,]},{func:1,ret:P.a7,args:[P.n]},{func:1,args:[W.cn]},{func:1,args:[,P.a7]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.ah]},{func:1,ret:P.cA},{func:1,void:true,args:[P.a],opt:[P.ah]},{func:1,void:true,args:[,P.ah]},{func:1,args:[,,]},{func:1,ret:P.n,args:[,P.n]},{func:1,void:true,args:[P.n,P.n]},{func:1,args:[P.dG,,]},{func:1,args:[F.cj]},{func:1,args:[P.a7,,]},{func:1,ret:P.n,args:[,]},{func:1,args:[P.n]},{func:1,args:[P.n,,]},{func:1,ret:P.a2,args:[W.aY]},{func:1,args:[W.aY]},{func:1,ret:P.n,args:[P.P,P.P]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.ku(d||a)
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
Isolate.cH=a.cH
Isolate.aB=a.aB
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eu(F.eq(),b)},[])
else (function(b){H.eu(F.eq(),b)})([])})})()