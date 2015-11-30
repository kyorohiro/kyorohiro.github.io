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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isi)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cN"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cN"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cN(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.av=function(){}
var dart=[["","",,H,{
"^":"",
mo:{
"^":"a;a"}}],["","",,J,{
"^":"",
p:function(a){return void 0},
bV:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bl:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cQ==null){H.lp()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(new P.cB("Return interceptor for "+H.d(y(a,z))))}w=H.lz(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.W
else return C.Z}return w},
i:{
"^":"a;",
v:function(a,b){return a===b},
gH:function(a){return H.aq(a)},
k:["eq",function(a){return H.bF(a)}],
"%":"CanvasRenderingContext2D|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
hQ:{
"^":"i;",
k:function(a){return String(a)},
gH:function(a){return a?519018:218159},
$iscL:1},
hR:{
"^":"i;",
v:function(a,b){return null==b},
k:function(a){return"null"},
gH:function(a){return 0}},
dA:{
"^":"i;",
gH:function(a){return 0},
$ishS:1},
ih:{
"^":"dA;"},
bK:{
"^":"dA;",
k:function(a){return String(a)}},
b5:{
"^":"i;",
c3:function(a,b){if(!!a.immutable$list)throw H.b(new P.Q(b))},
bm:function(a,b){if(!!a.fixed$length)throw H.b(new P.Q(b))},
dK:function(a,b){this.bm(a,"removeAt")
if(b>=a.length)throw H.b(P.bd(b,null,null))
return a.splice(b,1)[0]},
ad:function(a,b){var z
this.bm(a,"remove")
for(z=0;z<a.length;++z)if(J.K(a[z],b)){a.splice(z,1)
return!0}return!1},
J:function(a,b){var z,y
this.bm(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.L)(b),++y)a.push(b[y])},
O:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.b(new P.W(a))}},
aO:function(a,b){return H.e(new H.cc(a,b),[null,null])},
du:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.d(a[x])
if(x>=z)return H.c(y,x)
y[x]=w}return y.join(b)},
a3:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
eo:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.J(b))
if(b<0||b>a.length)throw H.b(P.U(b,0,a.length,null,null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.b(H.J(c))
if(c<b||c>a.length)throw H.b(P.U(c,b,a.length,null,null))}if(b===c)return H.e([],[H.A(a,0)])
return H.e(a.slice(b,c),[H.A(a,0)])},
gG:function(a){if(a.length>0)return a[0]
throw H.b(H.c8())},
gaN:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(H.c8())},
cE:function(a,b,c,d,e){var z,y,x
this.c3(a,"set range")
P.aT(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.M(P.U(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.b(H.hN())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}},
el:function(a,b){var z
this.c3(a,"sort")
z=P.li()
H.bf(a,0,a.length-1,z)},
cF:function(a){return this.el(a,null)},
k:function(a){return P.bx(a,"[","]")},
gL:function(a){return new J.d8(a,a.length,0,null)},
gH:function(a){return H.aq(a)},
gl:function(a){return a.length},
sl:function(a,b){this.bm(a,"set length")
if(b<0)throw H.b(P.U(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.N(a,b))
if(b>=a.length||b<0)throw H.b(H.N(a,b))
return a[b]},
m:function(a,b,c){this.c3(a,"indexed set")
if(b>=a.length||b<0)throw H.b(H.N(a,b))
a[b]=c},
$isb6:1,
$isl:1,
$asl:null,
$isu:1,
static:{hP:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.b(P.az("Length must be a non-negative integer: "+H.d(a)))
z=H.e(new Array(a),[b])
z.fixed$length=Array
return z}}},
mn:{
"^":"b5;"},
d8:{
"^":"a;a,b,c,d",
gF:function(){return this.d},
B:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.b(new P.W(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aO:{
"^":"i;",
aM:function(a,b){var z
if(typeof b!=="number")throw H.b(H.J(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gce(b)
if(this.gce(a)===z)return 0
if(this.gce(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gho(b))return 0
return 1}else return-1},
gce:function(a){return a===0?1/a<0:a<0},
gho:function(a){return isNaN(a)},
ghn:function(a){return isFinite(a)},
cp:function(a,b){return a%b},
aR:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.b(new P.Q(""+a))},
N:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.b(new P.Q(""+a))},
hO:function(a){return a},
bb:function(a,b){var z,y,x,w
H.cM(b)
if(b<2||b>36)throw H.b(P.U(b,2,36,"radix",null))
z=a.toString(b)
if(C.i.aq(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.M(new P.Q("Unexpected toString result: "+z))
x=J.D(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.i.u("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gH:function(a){return a&0x1FFFFFFF},
cC:function(a){return-a},
n:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a+b},
I:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a-b},
u:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a*b},
bC:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
bf:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aR(a/b)},
az:function(a,b){return(a|0)===a?a/b|0:this.aR(a/b)},
aY:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
a6:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a<b},
an:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a>b},
bB:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a<=b},
by:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a>=b},
$isaw:1},
dz:{
"^":"aO;",
$isb1:1,
$isaw:1,
$iso:1},
dy:{
"^":"aO;",
$isb1:1,
$isaw:1},
b7:{
"^":"i;",
aq:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.N(a,b))
if(b<0)throw H.b(H.N(a,b))
if(b>=a.length)throw H.b(H.N(a,b))
return a.charCodeAt(b)},
n:function(a,b){if(typeof b!=="string")throw H.b(P.fG(b,null,null))
return a+b},
bH:function(a,b,c){H.cM(b)
if(c==null)c=a.length
H.cM(c)
if(b<0)throw H.b(P.bd(b,null,null))
if(typeof c!=="number")return H.v(c)
if(b>c)throw H.b(P.bd(b,null,null))
if(c>a.length)throw H.b(P.bd(c,null,null))
return a.substring(b,c)},
ep:function(a,b){return this.bH(a,b,null)},
u:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.b(C.C)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fJ:function(a,b,c){if(c>a.length)throw H.b(P.U(c,0,a.length,null,null))
return H.lF(a,b,c)},
gX:function(a){return a.length===0},
aM:function(a,b){var z
if(typeof b!=="string")throw H.b(H.J(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gH:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gl:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.N(a,b))
if(b>=a.length||b<0)throw H.b(H.N(a,b))
return a[b]},
$isb6:1,
$isaa:1}}],["","",,H,{
"^":"",
bi:function(a,b){var z=a.b1(b)
if(!init.globalState.d.cy)init.globalState.f.b9()
return z},
bT:function(){--init.globalState.f.b},
eV:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.p(y).$isl)throw H.b(P.az("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.ky(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$dw()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.k3(P.cb(null,H.bh),0)
y.z=P.bz(null,null,null,P.o,H.cG)
y.ch=P.bz(null,null,null,P.o,null)
if(y.x===!0){x=new H.kx()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hG,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.kz)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.bz(null,null,null,P.o,H.bH)
w=P.aP(null,null,null,P.o)
v=new H.bH(0,null,!1)
u=new H.cG(y,x,w,init.createNewIsolate(),v,new H.aA(H.bX()),new H.aA(H.bX()),!1,!1,[],P.aP(null,null,null,null),null,null,!1,!0,P.aP(null,null,null,null))
w.aL(0,0)
u.cI(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bk()
x=H.aK(y,[y]).ay(a)
if(x)u.b1(new H.lD(z,a))
else{y=H.aK(y,[y,y]).ay(a)
if(y)u.b1(new H.lE(z,a))
else u.b1(a)}init.globalState.f.b9()},
hK:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.hL()
return},
hL:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.b(new P.Q("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.b(new P.Q("Cannot extract URI from \""+H.d(z)+"\""))},
hG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bL(!0,[]).aA(b.data)
y=J.D(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bL(!0,[]).aA(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bL(!0,[]).aA(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.bz(null,null,null,P.o,H.bH)
p=P.aP(null,null,null,P.o)
o=new H.bH(0,null,!1)
n=new H.cG(y,q,p,init.createNewIsolate(),o,new H.aA(H.bX()),new H.aA(H.bX()),!1,!1,[],P.aP(null,null,null,null),null,null,!1,!0,P.aP(null,null,null,null))
p.aL(0,0)
n.cI(0,o)
init.globalState.f.a.ap(new H.bh(n,new H.hH(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b9()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aM(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.b9()
break
case"close":init.globalState.ch.ad(0,$.$get$dx().h(0,a))
a.terminate()
init.globalState.f.b9()
break
case"log":H.hF(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.aG(!0,P.aC(null,P.o)).a7(q)
y.toString
self.postMessage(q)}else P.S(y.h(z,"msg"))
break
case"error":throw H.b(y.h(z,"msg"))}},
hF:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.aG(!0,P.aC(null,P.o)).a7(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.F(w)
z=H.R(w)
throw H.b(P.bv(z))}},
hI:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dZ=$.dZ+("_"+y)
$.e_=$.e_+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aM(f,["spawned",new H.bN(y,x),w,z.r])
x=new H.hJ(a,b,c,d,z)
if(e===!0){z.df(w,w)
init.globalState.f.a.ap(new H.bh(z,x,"start isolate"))}else x.$0()},
kW:function(a){return new H.bL(!0,[]).aA(new H.aG(!1,P.aC(null,P.o)).a7(a))},
lD:{
"^":"f:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
lE:{
"^":"f:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ky:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{kz:function(a){var z=P.ae(["command","print","msg",a])
return new H.aG(!0,P.aC(null,P.o)).a7(z)}}},
cG:{
"^":"a;a,b,c,hp:d<,fK:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
df:function(a,b){if(!this.f.v(0,a))return
if(this.Q.aL(0,b)&&!this.y)this.y=!0
this.c_()},
hE:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ad(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.c(z,0)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.c(v,w)
v[w]=x
if(w===y.c)y.cS();++y.d}this.y=!1}this.c_()},
fm:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.c(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
hD:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.M(new P.Q("removeRange"))
P.aT(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
eh:function(a,b){if(!this.r.v(0,a))return
this.db=b},
he:function(a,b,c){var z=J.p(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){J.aM(a,c)
return}z=this.cx
if(z==null){z=P.cb(null,null)
this.cx=z}z.ap(new H.kk(a,c))},
hc:function(a,b){var z
if(!this.r.v(0,a))return
z=J.p(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){this.cf()
return}z=this.cx
if(z==null){z=P.cb(null,null)
this.cx=z}z.ap(this.ghr())},
hf:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.S(a)
if(b!=null)P.S(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.b2(a)
y[1]=b==null?null:J.b2(b)
for(x=new P.dB(z,z.r,null,null),x.c=z.e;x.B();)J.aM(x.d,y)},
b1:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.F(u)
w=t
v=H.R(u)
this.hf(w,v)
if(this.db===!0){this.cf()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghp()
if(this.cx!=null)for(;t=this.cx,!t.gX(t);)this.cx.dM().$0()}return y},
dw:function(a){return this.b.h(0,a)},
cI:function(a,b){var z=this.b
if(z.a2(a))throw H.b(P.bv("Registry: ports must be registered only once."))
z.m(0,a,b)},
c_:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.cf()},
cf:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a_(0)
for(z=this.b,y=z.gdY(z),y=y.gL(y);y.B();)y.gF().eQ()
z.a_(0)
this.c.a_(0)
init.globalState.z.ad(0,this.a)
this.dx.a_(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.c(z,v)
J.aM(w,z[v])}this.ch=null}},"$0","ghr",0,0,2]},
kk:{
"^":"f:2;a,b",
$0:function(){J.aM(this.a,this.b)}},
k3:{
"^":"a;a,b",
fV:function(){var z=this.a
if(z.b===z.c)return
return z.dM()},
dS:function(){var z,y,x
z=this.fV()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a2(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gX(y)}else y=!1
else y=!1
else y=!1
if(y)H.M(P.bv("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gX(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.aG(!0,P.aC(null,P.o)).a7(x)
y.toString
self.postMessage(x)}return!1}z.hC()
return!0},
d3:function(){if(self.window!=null)new H.k4(this).$0()
else for(;this.dS(););},
b9:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.d3()
else try{this.d3()}catch(x){w=H.F(x)
z=w
y=H.R(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.aG(!0,P.aC(null,P.o)).a7(v)
w.toString
self.postMessage(v)}}},
k4:{
"^":"f:2;a",
$0:function(){if(!this.a.dS())return
P.cv(C.u,this)}},
bh:{
"^":"a;a,b,c",
hC:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.b1(this.b)}},
kx:{
"^":"a;"},
hH:{
"^":"f:1;a,b,c,d,e,f",
$0:function(){H.hI(this.a,this.b,this.c,this.d,this.e,this.f)}},
hJ:{
"^":"f:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bk()
w=H.aK(x,[x,x]).ay(y)
if(w)y.$2(this.b,this.c)
else{x=H.aK(x,[x]).ay(y)
if(x)y.$1(this.b)
else y.$0()}}z.c_()}},
es:{
"^":"a;"},
bN:{
"^":"es;b,a",
bE:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcV())return
x=H.kW(b)
if(z.gfK()===y){y=J.D(x)
switch(y.h(x,0)){case"pause":z.df(y.h(x,1),y.h(x,2))
break
case"resume":z.hE(y.h(x,1))
break
case"add-ondone":z.fm(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.hD(y.h(x,1))
break
case"set-errors-fatal":z.eh(y.h(x,1),y.h(x,2))
break
case"ping":z.he(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.hc(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.aL(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ad(0,y)
break}return}y=init.globalState.f
w="receive "+H.d(b)
y.a.ap(new H.bh(z,new H.kB(this,x),w))},
v:function(a,b){if(b==null)return!1
return b instanceof H.bN&&J.K(this.b,b.b)},
gH:function(a){return this.b.gbV()}},
kB:{
"^":"f:1;a,b",
$0:function(){var z=this.a.b
if(!z.gcV())z.eK(this.b)}},
cH:{
"^":"es;b,c,a",
bE:function(a,b){var z,y,x
z=P.ae(["command","message","port",this,"msg",b])
y=new H.aG(!0,P.aC(null,P.o)).a7(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
v:function(a,b){if(b==null)return!1
return b instanceof H.cH&&J.K(this.b,b.b)&&J.K(this.a,b.a)&&J.K(this.c,b.c)},
gH:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.ej()
y=this.a
if(typeof y!=="number")return y.ej()
x=this.c
if(typeof x!=="number")return H.v(x)
return(z<<16^y<<8^x)>>>0}},
bH:{
"^":"a;bV:a<,b,cV:c<",
eQ:function(){this.c=!0
this.b=null},
eK:function(a){if(this.c)return
this.f2(a)},
f2:function(a){return this.b.$1(a)},
$isiz:1},
j4:{
"^":"a;a,b,c",
eC:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ap(new H.bh(y,new H.j6(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.V(new H.j7(this,b),0),a)}else throw H.b(new P.Q("Timer greater than 0."))},
static:{j5:function(a,b){var z=new H.j4(!0,!1,null)
z.eC(a,b)
return z}}},
j6:{
"^":"f:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
j7:{
"^":"f:2;a,b",
$0:function(){this.a.c=null
H.bT()
this.b.$0()}},
aA:{
"^":"a;bV:a<",
gH:function(a){var z=this.a
if(typeof z!=="number")return z.hX()
z=C.b.aY(z,0)^C.b.az(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aA){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aG:{
"^":"a;a,b",
a7:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gl(z))
z=J.p(a)
if(!!z.$isdN)return["buffer",a]
if(!!z.$iscj)return["typed",a]
if(!!z.$isb6)return this.ed(a)
if(!!z.$ishE){x=this.gea()
w=a.gal()
w=H.bA(w,x,H.a5(w,"a3",0),null)
w=P.bb(w,!0,H.a5(w,"a3",0))
z=z.gdY(a)
z=H.bA(z,x,H.a5(z,"a3",0),null)
return["map",w,P.bb(z,!0,H.a5(z,"a3",0))]}if(!!z.$ishS)return this.ee(a)
if(!!z.$isi)this.dW(a)
if(!!z.$isiz)this.bc(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbN)return this.ef(a)
if(!!z.$iscH)return this.eg(a)
if(!!z.$isf){v=a.$static_name
if(v==null)this.bc(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaA)return["capability",a.a]
if(!(a instanceof P.a))this.dW(a)
return["dart",init.classIdExtractor(a),this.ec(init.classFieldsExtractor(a))]},"$1","gea",2,0,0],
bc:function(a,b){throw H.b(new P.Q(H.d(b==null?"Can't transmit:":b)+" "+H.d(a)))},
dW:function(a){return this.bc(a,null)},
ed:function(a){var z=this.eb(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bc(a,"Can't serialize indexable: ")},
eb:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.a7(a[y])
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
ec:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.a7(a[z]))
return a},
ee:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.bc(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.a7(a[z[x]])
if(x>=y.length)return H.c(y,x)
y[x]=w}return["js-object",z,y]},
eg:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
ef:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbV()]
return["raw sendport",a]}},
bL:{
"^":"a;a,b",
aA:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.b(P.az("Bad serialized message: "+H.d(a)))
switch(C.a.gG(a)){case"ref":if(1>=a.length)return H.c(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.c(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.b0(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.b0(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return this.b0(x)
case"const":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.b0(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.fY(a)
case"sendport":return this.fZ(a)
case"raw sendport":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.fX(a)
case"function":if(1>=a.length)return H.c(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.c(a,1)
return new H.aA(a[1])
case"dart":y=a.length
if(1>=y)return H.c(a,1)
w=a[1]
if(2>=y)return H.c(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.b0(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.b("couldn't deserialize: "+H.d(a))}},"$1","gfW",2,0,0],
b0:function(a){var z,y,x
z=J.D(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.v(x)
if(!(y<x))break
z.m(a,y,this.aA(z.h(a,y)));++y}return a},
fY:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w=P.an()
this.b.push(w)
y=J.fx(y,this.gfW()).ct(0)
for(z=J.D(y),v=J.D(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.c(y,u)
w.m(0,y[u],this.aA(v.h(x,u)))}return w},
fZ:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
if(3>=z)return H.c(a,3)
w=a[3]
if(J.K(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dw(w)
if(u==null)return
t=new H.bN(u,x)}else t=new H.cH(y,w,x)
this.b.push(t)
return t},
fX:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.D(y)
v=J.D(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.v(t)
if(!(u<t))break
w[z.h(y,u)]=this.aA(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
h_:function(){throw H.b(new P.Q("Cannot modify unmodifiable Map"))},
lk:function(a){return init.types[a]},
ly:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.p(a).$isb8},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.b2(a)
if(typeof z!=="string")throw H.b(H.J(a))
return z},
aq:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dX:function(a,b){throw H.b(new P.am(a,null,null))},
iu:function(a,b,c){var z,y
H.l8(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.dX(a,c)
if(3>=z.length)return H.c(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.dX(a,c)},
bG:function(a){var z,y
z=C.w(J.p(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.i.aq(z,0)===36)z=C.i.ep(z,1)
return(z+H.cS(H.bR(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
bF:function(a){return"Instance of '"+H.bG(a)+"'"},
dW:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
iv:function(a){var z,y,x,w
z=[]
z.$builtinTypeInfo=[P.o]
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.L)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.b(H.J(w))
if(w<=65535)z.push(w)
else if(w<=1114111){z.push(55296+(C.c.aY(w-65536,10)&1023))
z.push(56320+(w&1023))}else throw H.b(H.J(w))}return H.dW(z)},
e0:function(a){var z,y,x,w
for(z=a.length,y=0;x=a.length,y<x;x===z||(0,H.L)(a),++y){w=a[y]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.b(H.J(w))
if(w<0)throw H.b(H.J(w))
if(w>65535)return H.iv(a)}return H.dW(a)},
iw:function(a,b,c){var z,y,x,w,v
z=J.a0(c)
if(z.bB(c,500)&&b===0&&z.v(c,a.length))return String.fromCharCode.apply(null,a)
if(typeof c!=="number")return H.v(c)
y=b
x=""
for(;y<c;y=w){w=y+500
if(w<c)v=w
else v=c
x+=String.fromCharCode.apply(null,a.subarray(y,v))}return x},
aS:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.aY(z,10))>>>0,56320|z&1023)}throw H.b(P.U(a,0,1114111,null,null))},
Z:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dY:function(a){return a.b?H.Z(a).getUTCMilliseconds()+0:H.Z(a).getMilliseconds()+0},
bE:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.J(a))
return a[b]},
cs:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.J(a))
a[b]=c},
v:function(a){throw H.b(H.J(a))},
c:function(a,b){if(a==null)J.ak(a)
throw H.b(H.N(a,b))},
N:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ay(!0,b,"index",null)
z=J.ak(a)
if(!(b<0)){if(typeof z!=="number")return H.v(z)
y=b>=z}else y=!0
if(y)return P.bw(b,a,"index",null,z)
return P.bd(b,"index",null)},
J:function(a){return new P.ay(!0,a,null,null)},
ai:function(a){return a},
cM:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(H.J(a))
return a},
l8:function(a){if(typeof a!=="string")throw H.b(H.J(a))
return a},
b:function(a){var z
if(a==null)a=new P.dU()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eW})
z.name=""}else z.toString=H.eW
return z},
eW:function(){return J.b2(this.dartException)},
M:function(a){throw H.b(a)},
L:function(a){throw H.b(new P.W(a))},
F:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.lI(a)
if(a==null)return
if(a instanceof H.c4)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aY(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c9(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.dT(v,null))}}if(a instanceof TypeError){u=$.$get$ed()
t=$.$get$ee()
s=$.$get$ef()
r=$.$get$eg()
q=$.$get$ek()
p=$.$get$el()
o=$.$get$ei()
$.$get$eh()
n=$.$get$en()
m=$.$get$em()
l=u.aa(y)
if(l!=null)return z.$1(H.c9(y,l))
else{l=t.aa(y)
if(l!=null){l.method="call"
return z.$1(H.c9(y,l))}else{l=s.aa(y)
if(l==null){l=r.aa(y)
if(l==null){l=q.aa(y)
if(l==null){l=p.aa(y)
if(l==null){l=o.aa(y)
if(l==null){l=r.aa(y)
if(l==null){l=n.aa(y)
if(l==null){l=m.aa(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dT(y,l==null?null:l.method))}}return z.$1(new H.jI(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.e4()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ay(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.e4()
return a},
R:function(a){var z
if(a instanceof H.c4)return a.b
if(a==null)return new H.ex(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ex(a,null)},
lB:function(a){if(a==null||typeof a!='object')return J.O(a)
else return H.aq(a)},
eN:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
ls:function(a,b,c,d,e,f,g){var z=J.p(c)
if(z.v(c,0))return H.bi(b,new H.lt(a))
else if(z.v(c,1))return H.bi(b,new H.lu(a,d))
else if(z.v(c,2))return H.bi(b,new H.lv(a,d,e))
else if(z.v(c,3))return H.bi(b,new H.lw(a,d,e,f))
else if(z.v(c,4))return H.bi(b,new H.lx(a,d,e,f,g))
else throw H.b(P.bv("Unsupported number of arguments for wrapped closure"))},
V:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ls)
a.$identity=z
return z},
fX:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isl){z.$reflectionInfo=c
x=H.iC(z).r}else x=c
w=d?Object.create(new H.iR().constructor.prototype):Object.create(new H.c0(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a7
$.a7=J.w(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.de(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.lk(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.db:H.c1
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.de(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
fU:function(a,b,c,d){var z=H.c1
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
de:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fW(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fU(y,!w,z,b)
if(y===0){w=$.aN
if(w==null){w=H.br("self")
$.aN=w}w="return function(){return this."+H.d(w)+"."+H.d(z)+"();"
v=$.a7
$.a7=J.w(v,1)
return new Function(w+H.d(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aN
if(v==null){v=H.br("self")
$.aN=v}v=w+H.d(v)+"."+H.d(z)+"("+u+");"
w=$.a7
$.a7=J.w(w,1)
return new Function(v+H.d(w)+"}")()},
fV:function(a,b,c,d){var z,y
z=H.c1
y=H.db
switch(b?-1:a){case 0:throw H.b(new H.iF("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fW:function(a,b){var z,y,x,w,v,u,t,s
z=H.fM()
y=$.da
if(y==null){y=H.br("receiver")
$.da=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fV(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.a7
$.a7=J.w(u,1)
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.a7
$.a7=J.w(u,1)
return new Function(y+H.d(u)+"}")()},
cN:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.fX(a,b,z,!!d,e,f)},
lC:function(a,b){var z=J.D(b)
throw H.b(H.dd(H.bG(a),z.bH(b,3,z.gl(b))))},
lr:function(a,b){var z
if(a!=null)z=typeof a==="object"&&J.p(a)[b]
else z=!0
if(z)return a
H.lC(a,b)},
lH:function(a){throw H.b(new P.h2("Cyclic initialization for static "+H.d(a)))},
aK:function(a,b,c){return new H.iG(a,b,c,null)},
bk:function(){return C.B},
bX:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
h:function(a,b,c){var z
if(b===0){J.f8(c,a)
return}else if(b===1){c.di(H.F(a),H.R(a))
return}if(!!J.p(a).$isa2)z=a
else{z=H.e(new P.z(0,$.n,null),[null])
z.aH(a)}z.ba(H.eG(b,0),new H.l4(b))
return c.ghb()},
eG:function(a,b){return new H.l2(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
e:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bR:function(a){if(a==null)return
return a.$builtinTypeInfo},
eO:function(a,b){return H.cV(a["$as"+H.d(b)],H.bR(a))},
a5:function(a,b,c){var z=H.eO(a,b)
return z==null?null:z[c]},
A:function(a,b){var z=H.bR(a)
return z==null?null:z[b]},
cU:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cS(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.k(a)
else return},
cS:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bg("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.d(H.cU(u,c))}return w?"":"<"+H.d(z)+">"},
cV:function(a,b){if(typeof a=="function"){a=H.cR(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cR(a,null,b)}return b},
l9:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bR(a)
y=J.p(a)
if(y[b]==null)return!1
return H.eJ(H.cV(y[d],z),c)},
lG:function(a,b,c,d){if(a!=null&&!H.l9(a,b,c,d))throw H.b(H.dd(H.bG(a),(b.substring(3)+H.cS(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
eJ:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a6(a[y],b[y]))return!1
return!0},
bP:function(a,b,c){return H.cR(a,b,H.eO(b,c))},
a6:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eP(a,b)
if('func' in a)return b.builtin$cls==="hn"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cU(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.d(H.cU(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.eJ(H.cV(v,z),x)},
eI:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a6(z,v)||H.a6(v,z)))return!1}return!0},
l3:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a6(v,u)||H.a6(u,v)))return!1}return!0},
eP:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.a6(z,y)||H.a6(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eI(x,w,!1))return!1
if(!H.eI(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a6(o,n)||H.a6(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a6(o,n)||H.a6(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a6(o,n)||H.a6(n,o)))return!1}}return H.l3(a.named,b.named)},
cR:function(a,b,c){return a.apply(b,c)},
nj:function(a){var z=$.cP
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
ni:function(a){return H.aq(a)},
nh:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
lz:function(a){var z,y,x,w,v,u
z=$.cP.$1(a)
y=$.bQ[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bS[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eH.$2(a,z)
if(z!=null){y=$.bQ[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bS[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cT(x)
$.bQ[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bS[z]=x
return x}if(v==="-"){u=H.cT(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eS(a,x)
if(v==="*")throw H.b(new P.cB(z))
if(init.leafTags[z]===true){u=H.cT(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eS(a,x)},
eS:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bV(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cT:function(a){return J.bV(a,!1,null,!!a.$isb8)},
lA:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bV(z,!1,null,!!z.$isb8)
else return J.bV(z,c,null,null)},
lp:function(){if(!0===$.cQ)return
$.cQ=!0
H.lq()},
lq:function(){var z,y,x,w,v,u,t,s
$.bQ=Object.create(null)
$.bS=Object.create(null)
H.ll()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eT.$1(v)
if(u!=null){t=H.lA(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ll:function(){var z,y,x,w,v,u,t
z=C.L()
z=H.aJ(C.I,H.aJ(C.N,H.aJ(C.x,H.aJ(C.x,H.aJ(C.M,H.aJ(C.J,H.aJ(C.K(C.w),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cP=new H.lm(v)
$.eH=new H.ln(u)
$.eT=new H.lo(t)},
aJ:function(a,b){return a(b)||b},
lF:function(a,b,c){return a.indexOf(b,c)>=0},
fZ:{
"^":"a;",
gX:function(a){return J.K(this.gl(this),0)},
k:function(a){return P.cd(this)},
m:function(a,b,c){return H.h_()},
$isaR:1},
c7:{
"^":"fZ;a",
bj:function(){var z=this.$map
if(z==null){z=new H.b9(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.eN(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.bj().h(0,b)},
O:function(a,b){this.bj().O(0,b)},
gal:function(){return this.bj().gal()},
gl:function(a){var z=this.bj()
return z.gl(z)}},
iB:{
"^":"a;a,b,c,d,e,f,r,x",
static:{iC:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.iB(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
jG:{
"^":"a;a,b,c,d,e,f",
aa:function(a){var z,y,x
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
static:{ab:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.jG(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bJ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},ej:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dT:{
"^":"P;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+H.d(z)+"' on null"}},
hU:{
"^":"P;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.d(z)+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.d(z)+"' on '"+H.d(y)+"' ("+H.d(this.a)+")"},
static:{c9:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hU(a,y,z?null:b.receiver)}}},
jI:{
"^":"P;a",
k:function(a){var z=this.a
return C.i.gX(z)?"Error":"Error: "+z}},
lI:{
"^":"f:0;a",
$1:function(a){if(!!J.p(a).$isP)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ex:{
"^":"a;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
lt:{
"^":"f:1;a",
$0:function(){return this.a.$0()}},
lu:{
"^":"f:1;a,b",
$0:function(){return this.a.$1(this.b)}},
lv:{
"^":"f:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
lw:{
"^":"f:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
lx:{
"^":"f:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
f:{
"^":"a;",
k:function(a){return"Closure '"+H.bG(this)+"'"},
ge0:function(){return this},
ge0:function(){return this}},
e7:{
"^":"f;"},
iR:{
"^":"e7;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
c0:{
"^":"e7;a,b,c,d",
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c0))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gH:function(a){var z,y
z=this.c
if(z==null)y=H.aq(this.a)
else y=typeof z!=="object"?J.O(z):H.aq(z)
z=H.aq(this.b)
if(typeof y!=="number")return y.hZ()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.bF(z)},
static:{c1:function(a){return a.a},db:function(a){return a.c},fM:function(){var z=$.aN
if(z==null){z=H.br("self")
$.aN=z}return z},br:function(a){var z,y,x,w,v
z=new H.c0("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fO:{
"^":"P;a",
k:function(a){return this.a},
static:{dd:function(a,b){return new H.fO("CastError: Casting value of type "+H.d(a)+" to incompatible type "+H.d(b))}}},
iF:{
"^":"P;a",
k:function(a){return"RuntimeError: "+H.d(this.a)}},
e2:{
"^":"a;"},
iG:{
"^":"e2;a,b,c,d",
ay:function(a){var z=this.eV(a)
return z==null?!1:H.eP(z,this.aS())},
eV:function(a){var z=J.p(a)
return"$signature" in z?z.$signature():null},
aS:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.p(y)
if(!!x.$isn1)z.void=true
else if(!x.$isdm)z.ret=y.aS()
y=this.b
if(y!=null&&y.length!==0)z.args=H.e1(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.e1(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eM(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aS()}z.named=w}return z},
k:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.d(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.d(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.eM(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.d(z[s].aS())+" "+s}x+="}"}}return x+(") -> "+H.d(this.a))},
static:{e1:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aS())
return z}}},
dm:{
"^":"e2;",
k:function(a){return"dynamic"},
aS:function(){return}},
c4:{
"^":"a;a,a8:b<"},
l4:{
"^":"f:6;a",
$2:function(a,b){H.eG(this.a,1).$1(new H.c4(a,b))}},
l2:{
"^":"f:0;a,b",
$1:function(a){this.b(this.a,a)}},
b9:{
"^":"a;a,b,c,d,e,f,r",
gl:function(a){return this.a},
gX:function(a){return this.a===0},
gal:function(){return H.e(new H.i_(this),[H.A(this,0)])},
gdY:function(a){return H.bA(this.gal(),new H.hT(this),H.A(this,0),H.A(this,1))},
a2:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cO(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cO(y,a)}else return this.hi(a)},
hi:function(a){var z=this.d
if(z==null)return!1
return this.b3(this.ag(z,this.b2(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ag(z,b)
return y==null?null:y.gaD()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ag(x,b)
return y==null?null:y.gaD()}else return this.hj(b)},
hj:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ag(z,this.b2(a))
x=this.b3(y,a)
if(x<0)return
return y[x].gaD()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bX()
this.b=z}this.cH(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bX()
this.c=y}this.cH(y,b,c)}else this.hl(b,c)},
hl:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bX()
this.d=z}y=this.b2(a)
x=this.ag(z,y)
if(x==null)this.bZ(z,y,[this.bY(a,b)])
else{w=this.b3(x,a)
if(w>=0)x[w].saD(b)
else x.push(this.bY(a,b))}},
ad:function(a,b){if(typeof b==="string")return this.d1(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.d1(this.c,b)
else return this.hk(b)},
hk:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ag(z,this.b2(a))
x=this.b3(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.d9(w)
return w.gaD()},
a_:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.b(new P.W(this))
z=z.c}},
cH:function(a,b,c){var z=this.ag(a,b)
if(z==null)this.bZ(a,b,this.bY(b,c))
else z.saD(c)},
d1:function(a,b){var z
if(a==null)return
z=this.ag(a,b)
if(z==null)return
this.d9(z)
this.cP(a,b)
return z.gaD()},
bY:function(a,b){var z,y
z=new H.hZ(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
d9:function(a){var z,y
z=a.gfc()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
b2:function(a){return J.O(a)&0x3ffffff},
b3:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.K(a[y].gdr(),b))return y
return-1},
k:function(a){return P.cd(this)},
ag:function(a,b){return a[b]},
bZ:function(a,b,c){a[b]=c},
cP:function(a,b){delete a[b]},
cO:function(a,b){return this.ag(a,b)!=null},
bX:function(){var z=Object.create(null)
this.bZ(z,"<non-identifier-key>",z)
this.cP(z,"<non-identifier-key>")
return z},
$ishE:1,
$isaR:1},
hT:{
"^":"f:0;a",
$1:function(a){return this.a.h(0,a)}},
hZ:{
"^":"a;dr:a<,aD:b@,c,fc:d<"},
i_:{
"^":"a3;a",
gl:function(a){return this.a.a},
gL:function(a){var z,y
z=this.a
y=new H.i0(z,z.r,null,null)
y.c=z.e
return y},
O:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.b(new P.W(z))
y=y.c}},
$isu:1},
i0:{
"^":"a;a,b,c,d",
gF:function(){return this.d},
B:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.W(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
lm:{
"^":"f:0;a",
$1:function(a){return this.a(a)}},
ln:{
"^":"f:12;a",
$2:function(a,b){return this.a(a,b)}},
lo:{
"^":"f:3;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
c8:function(){return new P.aU("No element")},
hN:function(){return new P.aU("Too few elements")},
bf:function(a,b,c,d){if(c-b<=32)H.iK(a,b,c,d)
else H.iJ(a,b,c,d)},
iK:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.D(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a1(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.m(a,w,y.h(a,v))
w=v}y.m(a,w,x)}},
iJ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.az(c-b+1,6)
y=b+z
x=c-z
w=C.c.az(b+c,2)
v=w-z
u=w+z
t=J.D(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a1(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a1(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a1(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a1(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a1(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a1(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a1(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a1(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a1(d.$2(p,o),0)){n=o
o=p
p=n}t.m(a,y,s)
t.m(a,w,q)
t.m(a,x,o)
t.m(a,v,t.h(a,b))
t.m(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.K(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.p(i)
if(h.v(i,0))continue
if(h.a6(i,0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.a0(i)
if(h.an(i,0)){--l
continue}else{g=l-1
if(h.a6(i,0)){t.m(a,k,t.h(a,m))
f=m+1
t.m(a,m,t.h(a,l))
t.m(a,l,j)
l=g
m=f
break}else{t.m(a,k,t.h(a,l))
t.m(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.aL(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else if(J.a1(d.$2(j,p),0))for(;!0;)if(J.a1(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.aL(d.$2(t.h(a,l),r),0)){t.m(a,k,t.h(a,m))
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
H.bf(a,b,m-2,d)
H.bf(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.K(d.$2(t.h(a,m),r),0);)++m
for(;J.K(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.K(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else if(J.K(d.$2(j,p),0))for(;!0;)if(J.K(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.aL(d.$2(t.h(a,l),r),0)){t.m(a,k,t.h(a,m))
f=m+1
t.m(a,m,t.h(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.h(a,l))
t.m(a,l,j)}l=g
break}}H.bf(a,m,l,d)}else H.bf(a,m,l,d)},
j2:function(a){return a.gi3()},
fY:{
"^":"ep;a",
gl:function(a){return this.a.length},
h:function(a,b){return C.i.aq(this.a,b)},
$asep:function(){return[P.o]},
$asdC:function(){return[P.o]},
$asl:function(){return[P.o]}},
aQ:{
"^":"a3;",
gL:function(a){return new H.dD(this,this.gl(this),0,null)},
O:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.a3(0,y))
if(z!==this.gl(this))throw H.b(new P.W(this))}},
aO:function(a,b){return H.e(new H.cc(this,b),[null,null])},
cu:function(a,b){var z,y,x
if(b){z=H.e([],[H.a5(this,"aQ",0)])
C.a.sl(z,this.gl(this))}else z=H.e(Array(this.gl(this)),[H.a5(this,"aQ",0)])
for(y=0;y<this.gl(this);++y){x=this.a3(0,y)
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
ct:function(a){return this.cu(a,!0)},
$isu:1},
dD:{
"^":"a;a,b,c,d",
gF:function(){return this.d},
B:function(){var z,y,x,w
z=this.a
y=J.D(z)
x=y.gl(z)
if(this.b!==x)throw H.b(new P.W(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a3(z,w);++this.c
return!0}},
dE:{
"^":"a3;a,b",
gL:function(a){var z=new H.i4(null,J.ax(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gl:function(a){return J.ak(this.a)},
$asa3:function(a,b){return[b]},
static:{bA:function(a,b,c,d){if(!!J.p(a).$isu)return H.e(new H.dn(a,b),[c,d])
return H.e(new H.dE(a,b),[c,d])}}},
dn:{
"^":"dE;a,b",
$isu:1},
i4:{
"^":"hO;a,b,c",
B:function(){var z=this.b
if(z.B()){this.a=this.bU(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
bU:function(a){return this.c.$1(a)}},
cc:{
"^":"aQ;a,b",
gl:function(a){return J.ak(this.a)},
a3:function(a,b){return this.bU(J.ff(this.a,b))},
bU:function(a){return this.b.$1(a)},
$asaQ:function(a,b){return[b]},
$asa3:function(a,b){return[b]},
$isu:1},
dt:{
"^":"a;"},
jJ:{
"^":"a;",
m:function(a,b,c){throw H.b(new P.Q("Cannot modify an unmodifiable list"))},
$isl:1,
$asl:null,
$isu:1},
ep:{
"^":"dC+jJ;",
$isl:1,
$asl:null,
$isu:1}}],["","",,H,{
"^":"",
eM:function(a){var z=H.e(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
jQ:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.l5()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.V(new P.jS(z),1)).observe(y,{childList:true})
return new P.jR(z,y,x)}else if(self.setImmediate!=null)return P.l6()
return P.l7()},
n2:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.V(new P.jT(a),0))},"$1","l5",2,0,5],
n3:[function(a){++init.globalState.f.b
self.setImmediate(H.V(new P.jU(a),0))},"$1","l6",2,0,5],
n4:[function(a){P.cw(C.u,a)},"$1","l7",2,0,5],
eB:function(a,b){var z=H.bk()
z=H.aK(z,[z,z]).ay(a)
if(z){b.toString
return a}else{b.toString
return a}},
ho:function(a,b){var z=H.e(new P.z(0,$.n,null),[b])
P.cv(C.u,new P.hr(a,z))
return z},
hp:function(a,b,c){var z=new P.z(0,$.n,null)
z.$builtinTypeInfo=[c]
P.cv(a,new P.hq(b,z))
return z},
c6:function(a,b,c){var z,y,x,w,v
z={}
y=H.e(new P.z(0,$.n,null),[P.l])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.ht(z,c,b,y)
for(w=0;w<4;++w)a[w].ba(new P.hs(z,c,b,y,z.b++),x)
x=z.b
if(x===0){z=H.e(new P.z(0,$.n,null),[null])
z.aH(C.R)
return z}v=Array(x)
v.fixed$length=Array
z.a=v
return y},
E:function(a){return H.e(new P.ac(H.e(new P.z(0,$.n,null),[a])),[a])},
ez:function(a,b,c){$.n.toString
a.W(b,c)},
kZ:function(){var z,y
for(;z=$.aH,z!=null;){$.aZ=null
y=z.c
$.aH=y
if(y==null)$.aY=null
$.n=z.b
z.fw()}},
ng:[function(){$.cI=!0
try{P.kZ()}finally{$.n=C.d
$.aZ=null
$.cI=!1
if($.aH!=null)$.$get$cD().$1(P.eK())}},"$0","eK",0,0,2],
eF:function(a){if($.aH==null){$.aY=a
$.aH=a
if(!$.cI)$.$get$cD().$1(P.eK())}else{$.aY.c=a
$.aY=a}},
eU:function(a){var z,y
z=$.n
if(C.d===z){P.aI(null,null,C.d,a)
return}z.toString
if(C.d.gcd()===z){P.aI(null,null,z,a)
return}y=$.n
P.aI(null,null,y,y.c0(a,!0))},
mR:function(a,b){var z,y,x
z=H.e(new P.ey(null,null,null,0),[b])
y=z.gf7()
x=z.gf9()
z.a=a.aE(y,!0,z.gf8(),x)
return z},
l0:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.F(u)
z=t
y=H.R(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.ad(x)
w=t
v=x.ga8()
c.$2(w,v)}}},
kS:function(a,b,c,d){var z=a.c2()
if(!!J.p(z).$isa2)z.cw(new P.kV(b,c,d))
else b.W(c,d)},
kT:function(a,b){return new P.kU(a,b)},
cv:function(a,b){var z=$.n
if(z===C.d){z.toString
return P.cw(a,b)}return P.cw(a,z.c0(b,!0))},
cw:function(a,b){var z=C.c.az(a.a,1000)
return H.j5(z<0?0:z,b)},
cC:function(a){var z=$.n
$.n=a
return z},
bj:function(a,b,c,d,e){var z,y,x
z=new P.er(new P.l_(d,e),C.d,null)
y=$.aH
if(y==null){P.eF(z)
$.aZ=$.aY}else{x=$.aZ
if(x==null){z.c=y
$.aZ=z
$.aH=z}else{z.c=x.c
x.c=z
$.aZ=z
if(z.c==null)$.aY=z}}},
eC:function(a,b,c,d){var z,y
if($.n===c)return d.$0()
z=P.cC(c)
try{y=d.$0()
return y}finally{$.n=z}},
eE:function(a,b,c,d,e){var z,y
if($.n===c)return d.$1(e)
z=P.cC(c)
try{y=d.$1(e)
return y}finally{$.n=z}},
eD:function(a,b,c,d,e,f){var z,y
if($.n===c)return d.$2(e,f)
z=P.cC(c)
try{y=d.$2(e,f)
return y}finally{$.n=z}},
aI:function(a,b,c,d){var z=C.d!==c
if(z){d=c.c0(d,!(!z||C.d.gcd()===c))
c=C.d}P.eF(new P.er(d,c,null))},
jS:{
"^":"f:0;a",
$1:function(a){var z,y
H.bT()
z=this.a
y=z.a
z.a=null
y.$0()}},
jR:{
"^":"f:13;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
jT:{
"^":"f:1;a",
$0:function(){H.bT()
this.a.$0()}},
jU:{
"^":"f:1;a",
$0:function(){H.bT()
this.a.$0()}},
kL:{
"^":"al;a,b",
k:function(a){var z,y
z="Uncaught Error: "+H.d(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.d(y)):z},
static:{kM:function(a,b){if(b!=null)return b
if(!!J.p(a).$isP)return a.ga8()
return}}},
a2:{
"^":"a;"},
hr:{
"^":"f:1;a,b",
$0:function(){var z,y,x,w
try{this.b.av(this.a.$0())}catch(x){w=H.F(x)
z=w
y=H.R(x)
P.ez(this.b,z,y)}}},
hq:{
"^":"f:1;a,b",
$0:function(){var z,y,x,w
try{this.b.av(null)}catch(x){w=H.F(x)
z=w
y=H.R(x)
P.ez(this.b,z,y)}}},
ht:{
"^":"f:14;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.W(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.W(z.c,z.d)}},
hs:{
"^":"f:15;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.c(x,z)
x[z]=a
if(y===0)this.d.bR(x)}else if(z.b===0&&!this.b)this.d.W(z.c,z.d)}},
jY:{
"^":"a;hb:a<",
di:function(a,b){a=a!=null?a:new P.dU()
if(this.a.a!==0)throw H.b(new P.aU("Future already completed"))
$.n.toString
this.W(a,b)},
ai:function(a){return this.di(a,null)}},
ac:{
"^":"jY;a",
a1:function(a,b){var z=this.a
if(z.a!==0)throw H.b(new P.aU("Future already completed"))
z.aH(b)},
W:function(a,b){this.a.eO(a,b)}},
aV:{
"^":"a;cW:a<,cq:b>,c,d,e",
gaK:function(){return this.b.b},
gdq:function(){return(this.c&1)!==0},
ghh:function(){return this.c===6},
ghg:function(){return this.c===8},
gfb:function(){return this.d},
gfl:function(){return this.d}},
z:{
"^":"a;bl:a?,aK:b<,c",
gf3:function(){return this.a===8},
sf5:function(a){if(a)this.a=2
else this.a=0},
ba:function(a,b){var z,y
z=H.e(new P.z(0,$.n,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.eB(b,y)}this.bJ(new P.aV(null,z,b==null?1:3,a,b))
return z},
U:function(a){return this.ba(a,null)},
cw:function(a){var z,y
z=$.n
y=new P.z(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.bJ(new P.aV(null,y,8,a,null))
return y},
bW:function(){if(this.a!==0)throw H.b(new P.aU("Future already completed"))
this.a=1},
gfk:function(){return this.c},
gaX:function(){return this.c},
d8:function(a){this.a=4
this.c=a},
d7:function(a){this.a=8
this.c=a},
fh:function(a,b){this.d7(new P.al(a,b))},
bJ:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aI(null,null,z,new P.k7(this,a))}else{a.a=this.c
this.c=a}},
bk:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gcW()
z.a=y}return y},
av:function(a){var z,y
z=J.p(a)
if(!!z.$isa2)if(!!z.$isz)P.bM(a,this)
else P.cF(a,this)
else{y=this.bk()
this.d8(a)
P.at(this,y)}},
bR:function(a){var z=this.bk()
this.d8(a)
P.at(this,z)},
W:[function(a,b){var z=this.bk()
this.d7(new P.al(a,b))
P.at(this,z)},function(a){return this.W(a,null)},"i_","$2","$1","gbQ",2,2,16,0],
aH:function(a){var z
if(a==null);else{z=J.p(a)
if(!!z.$isa2){if(!!z.$isz){z=a.a
if(z>=4&&z===8){this.bW()
z=this.b
z.toString
P.aI(null,null,z,new P.k9(this,a))}else P.bM(a,this)}else P.cF(a,this)
return}}this.bW()
z=this.b
z.toString
P.aI(null,null,z,new P.ka(this,a))},
eO:function(a,b){var z
this.bW()
z=this.b
z.toString
P.aI(null,null,z,new P.k8(this,a,b))},
$isa2:1,
static:{cF:function(a,b){var z,y,x,w
b.sbl(2)
try{a.ba(new P.kb(b),new P.kc(b))}catch(x){w=H.F(x)
z=w
y=H.R(x)
P.eU(new P.kd(b,z,y))}},bM:function(a,b){var z
b.a=2
z=new P.aV(null,b,0,null,null)
if(a.a>=4)P.at(a,z)
else a.bJ(z)},at:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gf3()
if(b==null){if(w){v=z.a.gaX()
y=z.a.gaK()
x=J.ad(v)
u=v.ga8()
y.toString
P.bj(null,null,y,x,u)}return}for(;b.gcW()!=null;b=t){t=b.a
b.a=null
P.at(z.a,b)}x.a=!0
s=w?null:z.a.gfk()
x.b=s
x.c=!1
y=!w
if(!y||b.gdq()||b.c===8){r=b.gaK()
if(w){u=z.a.gaK()
u.toString
if(u==null?r!=null:u!==r){u=u.gcd()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaX()
y=z.a.gaK()
x=J.ad(v)
u=v.ga8()
y.toString
P.bj(null,null,y,x,u)
return}q=$.n
if(q==null?r!=null:q!==r)$.n=r
else q=null
if(y){if(b.gdq())x.a=new P.kf(x,b,s,r).$0()}else new P.ke(z,x,b,r).$0()
if(b.ghg())new P.kg(z,x,w,b,r).$0()
if(q!=null)$.n=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.p(y).$isa2}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.z)if(p.a>=4){o.a=2
z.a=p
b=new P.aV(null,o,0,null,null)
y=p
continue}else P.bM(p,o)
else P.cF(p,o)
return}}o=b.b
b=o.bk()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
k7:{
"^":"f:1;a,b",
$0:function(){P.at(this.a,this.b)}},
kb:{
"^":"f:0;a",
$1:function(a){this.a.bR(a)}},
kc:{
"^":"f:7;a",
$2:function(a,b){this.a.W(a,b)},
$1:function(a){return this.$2(a,null)}},
kd:{
"^":"f:1;a,b,c",
$0:function(){this.a.W(this.b,this.c)}},
k9:{
"^":"f:1;a,b",
$0:function(){P.bM(this.b,this.a)}},
ka:{
"^":"f:1;a,b",
$0:function(){this.a.bR(this.b)}},
k8:{
"^":"f:1;a,b,c",
$0:function(){this.a.W(this.b,this.c)}},
kf:{
"^":"f:17;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.bu(this.b.gfb(),this.c)
return!0}catch(x){w=H.F(x)
z=w
y=H.R(x)
this.a.b=new P.al(z,y)
return!1}}},
ke:{
"^":"f:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaX()
y=!0
r=this.c
if(r.ghh()){x=r.d
try{y=this.d.bu(x,J.ad(z))}catch(q){r=H.F(q)
w=r
v=H.R(q)
r=J.ad(z)
p=w
o=(r==null?p==null:r===p)?z:new P.al(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.bk()
p=H.aK(p,[p,p]).ay(r)
n=this.d
m=this.b
if(p)m.b=n.hJ(u,J.ad(z),z.ga8())
else m.b=n.bu(u,J.ad(z))}catch(q){r=H.F(q)
t=r
s=H.R(q)
r=J.ad(z)
p=t
o=(r==null?p==null:r===p)?z:new P.al(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
kg:{
"^":"f:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.dQ(this.d.gfl())
z.a=w
v=w}catch(u){z=H.F(u)
y=z
x=H.R(u)
if(this.c){z=J.ad(this.a.a.gaX())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaX()
else v.b=new P.al(y,x)
v.a=!1
return}if(!!J.p(v).$isa2){t=this.d
s=t.gcq(t)
s.sf5(!0)
this.b.c=!0
v.ba(new P.kh(this.a,s),new P.ki(z,s))}}},
kh:{
"^":"f:0;a,b",
$1:function(a){P.at(this.a.a,new P.aV(null,this.b,0,null,null))}},
ki:{
"^":"f:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.z)){y=H.e(new P.z(0,$.n,null),[null])
z.a=y
y.fh(a,b)}P.at(z.a,new P.aV(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
er:{
"^":"a;a,b,c",
fw:function(){return this.a.$0()}},
as:{
"^":"a;",
aO:function(a,b){return H.e(new P.kA(b,this),[H.a5(this,"as",0),null])},
O:function(a,b){var z,y
z={}
y=H.e(new P.z(0,$.n,null),[null])
z.a=null
z.a=this.aE(new P.iV(z,this,b,y),!0,new P.iW(y),y.gbQ())
return y},
gl:function(a){var z,y
z={}
y=H.e(new P.z(0,$.n,null),[P.o])
z.a=0
this.aE(new P.iX(z),!0,new P.iY(z,y),y.gbQ())
return y},
ct:function(a){var z,y
z=H.e([],[H.a5(this,"as",0)])
y=H.e(new P.z(0,$.n,null),[[P.l,H.a5(this,"as",0)]])
this.aE(new P.iZ(this,z),!0,new P.j_(z,y),y.gbQ())
return y}},
iV:{
"^":"f;a,b,c,d",
$1:function(a){P.l0(new P.iT(this.c,a),new P.iU(),P.kT(this.a.a,this.d))},
$signature:function(){return H.bP(function(a){return{func:1,args:[a]}},this.b,"as")}},
iT:{
"^":"f:1;a,b",
$0:function(){return this.a.$1(this.b)}},
iU:{
"^":"f:0;",
$1:function(a){}},
iW:{
"^":"f:1;a",
$0:function(){this.a.av(null)}},
iX:{
"^":"f:0;a",
$1:function(a){++this.a.a}},
iY:{
"^":"f:1;a,b",
$0:function(){this.b.av(this.a.a)}},
iZ:{
"^":"f;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bP(function(a){return{func:1,args:[a]}},this.a,"as")}},
j_:{
"^":"f:1;a,b",
$0:function(){this.b.av(this.a)}},
iS:{
"^":"a;"},
n8:{
"^":"a;"},
jV:{
"^":"a;aK:d<,bl:e?",
cn:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.dg()
if((z&4)===0&&(this.e&32)===0)this.cT(this.gcY())},
b7:function(a){return this.cn(a,null)},
dN:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gX(z)}else z=!1
if(z)this.r.bD(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cT(this.gd_())}}}},
c2:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bM()
return this.f},
bM:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.dg()
if((this.e&32)===0)this.r=null
this.f=this.cX()},
bL:["es",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.d4(a)
else this.bK(new P.k0(a,null))}],
bI:["eu",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.d6(a,b)
else this.bK(new P.k2(a,b,null))}],
eN:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.d5()
else this.bK(C.D)},
cZ:[function(){},"$0","gcY",0,0,2],
d0:[function(){},"$0","gd_",0,0,2],
cX:function(){return},
bK:function(a){var z,y
z=this.r
if(z==null){z=new P.kK(null,null,0)
this.r=z}z.aL(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bD(this)}},
d4:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cs(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bO((z&4)!==0)},
d6:function(a,b){var z,y
z=this.e
y=new P.jX(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bM()
z=this.f
if(!!J.p(z).$isa2)z.cw(y)
else y.$0()}else{y.$0()
this.bO((z&4)!==0)}},
d5:function(){var z,y
z=new P.jW(this)
this.bM()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.p(y).$isa2)y.cw(z)
else z.$0()},
cT:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bO((z&4)!==0)},
bO:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gX(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gX(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cZ()
else this.d0()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bD(this)},
eG:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.eB(b,z)
this.c=c}},
jX:{
"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bk()
x=H.aK(x,[x,x]).ay(y)
w=z.d
v=this.b
u=z.b
if(x)w.hK(u,v,this.c)
else w.cs(u,v)
z.e=(z.e&4294967263)>>>0}},
jW:{
"^":"f:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.dR(z.c)
z.e=(z.e&4294967263)>>>0}},
et:{
"^":"a;bs:a@"},
k0:{
"^":"et;b,a",
co:function(a){a.d4(this.b)}},
k2:{
"^":"et;aC:b>,a8:c<,a",
co:function(a){a.d6(this.b,this.c)}},
k1:{
"^":"a;",
co:function(a){a.d5()},
gbs:function(){return},
sbs:function(a){throw H.b(new P.aU("No events after a done."))}},
kC:{
"^":"a;bl:a?",
bD:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eU(new P.kD(this,a))
this.a=1},
dg:function(){if(this.a===1)this.a=3}},
kD:{
"^":"f:1;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.hd(this.b)}},
kK:{
"^":"kC;b,c,a",
gX:function(a){return this.c==null},
aL:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbs(b)
this.c=b}},
hd:function(a){var z,y
z=this.b
y=z.gbs()
this.b=y
if(y==null)this.c=null
z.co(a)}},
ey:{
"^":"a;a,b,c,bl:d?",
cK:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
i4:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.av(!0)
return}this.a.b7(0)
this.c=a
this.d=3},"$1","gf7",2,0,function(){return H.bP(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"ey")}],
fa:[function(a,b){var z
if(this.d===2){z=this.c
this.cK(0)
z.W(a,b)
return}this.a.b7(0)
this.c=new P.al(a,b)
this.d=4},function(a){return this.fa(a,null)},"i6","$2","$1","gf9",2,2,18,0],
i5:[function(){if(this.d===2){var z=this.c
this.cK(0)
z.av(!1)
return}this.a.b7(0)
this.c=null
this.d=5},"$0","gf8",0,0,2]},
kV:{
"^":"f:1;a,b,c",
$0:function(){return this.a.W(this.b,this.c)}},
kU:{
"^":"f:6;a,b",
$2:function(a,b){return P.kS(this.a,this.b,a,b)}},
cE:{
"^":"as;",
aE:function(a,b,c,d){return this.eT(a,d,c,!0===b)},
dv:function(a,b,c){return this.aE(a,null,b,c)},
eT:function(a,b,c,d){return P.k6(this,a,b,c,d,H.a5(this,"cE",0),H.a5(this,"cE",1))},
cU:function(a,b){b.bL(a)},
$asas:function(a,b){return[b]}},
eu:{
"^":"jV;x,y,a,b,c,d,e,f,r",
bL:function(a){if((this.e&2)!==0)return
this.es(a)},
bI:function(a,b){if((this.e&2)!==0)return
this.eu(a,b)},
cZ:[function(){var z=this.y
if(z==null)return
z.b7(0)},"$0","gcY",0,0,2],
d0:[function(){var z=this.y
if(z==null)return
z.dN()},"$0","gd_",0,0,2],
cX:function(){var z=this.y
if(z!=null){this.y=null
z.c2()}return},
i0:[function(a){this.x.cU(a,this)},"$1","gf_",2,0,function(){return H.bP(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"eu")}],
i2:[function(a,b){this.bI(a,b)},"$2","gf1",4,0,19],
i1:[function(){this.eN()},"$0","gf0",0,0,2],
eH:function(a,b,c,d,e,f,g){var z,y
z=this.gf_()
y=this.gf1()
this.y=this.x.a.dv(z,this.gf0(),y)},
static:{k6:function(a,b,c,d,e,f,g){var z=$.n
z=H.e(new P.eu(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.eG(b,c,d,e)
z.eH(a,b,c,d,e,f,g)
return z}}},
kA:{
"^":"cE;b,a",
cU:function(a,b){var z,y,x,w,v
z=null
try{z=this.fj(a)}catch(w){v=H.F(w)
y=v
x=H.R(w)
$.n.toString
b.bI(y,x)
return}b.bL(z)},
fj:function(a){return this.b.$1(a)}},
al:{
"^":"a;aC:a>,a8:b<",
k:function(a){return H.d(this.a)},
$isP:1},
kR:{
"^":"a;"},
l_:{
"^":"f:1;a,b",
$0:function(){var z=this.a
throw H.b(new P.kL(z,P.kM(z,this.b)))}},
kF:{
"^":"kR;",
gcd:function(){return this},
dR:function(a){var z,y,x,w
try{if(C.d===$.n){x=a.$0()
return x}x=P.eC(null,null,this,a)
return x}catch(w){x=H.F(w)
z=x
y=H.R(w)
return P.bj(null,null,this,z,y)}},
cs:function(a,b){var z,y,x,w
try{if(C.d===$.n){x=a.$1(b)
return x}x=P.eE(null,null,this,a,b)
return x}catch(w){x=H.F(w)
z=x
y=H.R(w)
return P.bj(null,null,this,z,y)}},
hK:function(a,b,c){var z,y,x,w
try{if(C.d===$.n){x=a.$2(b,c)
return x}x=P.eD(null,null,this,a,b,c)
return x}catch(w){x=H.F(w)
z=x
y=H.R(w)
return P.bj(null,null,this,z,y)}},
c0:function(a,b){if(b)return new P.kG(this,a)
else return new P.kH(this,a)},
fs:function(a,b){if(b)return new P.kI(this,a)
else return new P.kJ(this,a)},
h:function(a,b){return},
dQ:function(a){if($.n===C.d)return a.$0()
return P.eC(null,null,this,a)},
bu:function(a,b){if($.n===C.d)return a.$1(b)
return P.eE(null,null,this,a,b)},
hJ:function(a,b,c){if($.n===C.d)return a.$2(b,c)
return P.eD(null,null,this,a,b,c)}},
kG:{
"^":"f:1;a,b",
$0:function(){return this.a.dR(this.b)}},
kH:{
"^":"f:1;a,b",
$0:function(){return this.a.dQ(this.b)}},
kI:{
"^":"f:0;a,b",
$1:function(a){return this.a.cs(this.b,a)}},
kJ:{
"^":"f:0;a,b",
$1:function(a){return this.a.bu(this.b,a)}}}],["","",,P,{
"^":"",
an:function(){return H.e(new H.b9(0,null,null,null,null,null,0),[null,null])},
ae:function(a){return H.eN(a,H.e(new H.b9(0,null,null,null,null,null,0),[null,null]))},
hM:function(a,b,c){var z,y
if(P.cJ(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$b_()
y.push(a)
try{P.kY(a,z)}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=P.e5(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bx:function(a,b,c){var z,y,x
if(P.cJ(a))return b+"..."+c
z=new P.bg(b)
y=$.$get$b_()
y.push(a)
try{x=z
x.a=P.e5(x.gaI(),a,", ")}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=z
y.a=y.gaI()+c
y=z.gaI()
return y.charCodeAt(0)==0?y:y},
cJ:function(a){var z,y
for(z=0;y=$.$get$b_(),z<y.length;++z)if(a===y[z])return!0
return!1},
kY:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gL(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.B())return
w=H.d(z.gF())
b.push(w)
y+=w.length+2;++x}if(!z.B()){if(x<=5)return
if(0>=b.length)return H.c(b,0)
v=b.pop()
if(0>=b.length)return H.c(b,0)
u=b.pop()}else{t=z.gF();++x
if(!z.B()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.c(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gF();++x
for(;z.B();t=s,s=r){r=z.gF();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.c(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.c(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
bz:function(a,b,c,d,e){return H.e(new H.b9(0,null,null,null,null,null,0),[d,e])},
aC:function(a,b){return P.kv(a,b)},
aP:function(a,b,c,d){return H.e(new P.ks(0,null,null,null,null,null,0),[d])},
cd:function(a){var z,y,x
z={}
if(P.cJ(a))return"{...}"
y=new P.bg("")
try{$.$get$b_().push(a)
x=y
x.a=x.gaI()+"{"
z.a=!0
J.fg(a,new P.i5(z,y))
z=y
z.a=z.gaI()+"}"}finally{z=$.$get$b_()
if(0>=z.length)return H.c(z,0)
z.pop()}z=y.gaI()
return z.charCodeAt(0)==0?z:z},
ku:{
"^":"b9;a,b,c,d,e,f,r",
b2:function(a){return H.lB(a)&0x3ffffff},
b3:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdr()
if(x==null?b==null:x===b)return y}return-1},
static:{kv:function(a,b){return H.e(new P.ku(0,null,null,null,null,null,0),[a,b])}}},
ks:{
"^":"kj;a,b,c,d,e,f,r",
gL:function(a){var z=new P.dB(this,this.r,null,null)
z.c=this.e
return z},
gl:function(a){return this.a},
fI:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eS(b)},
eS:function(a){var z=this.d
if(z==null)return!1
return this.bi(z[this.bh(a)],a)>=0},
dw:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.fI(0,a)?a:null
else return this.f6(a)},
f6:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bh(a)]
x=this.bi(y,a)
if(x<0)return
return J.bm(y,x).gcQ()},
O:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.b(new P.W(this))
z=z.b}},
aL:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cL(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cL(x,b)}else return this.ap(b)},
ap:function(a){var z,y,x
z=this.d
if(z==null){z=P.kt()
this.d=z}y=this.bh(a)
x=z[y]
if(x==null)z[y]=[this.bP(a)]
else{if(this.bi(x,a)>=0)return!1
x.push(this.bP(a))}return!0},
ad:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cM(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cM(this.c,b)
else return this.fe(0,b)},
fe:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bh(b)]
x=this.bi(y,b)
if(x<0)return!1
this.cN(y.splice(x,1)[0])
return!0},
a_:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cL:function(a,b){if(a[b]!=null)return!1
a[b]=this.bP(b)
return!0},
cM:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cN(z)
delete a[b]
return!0},
bP:function(a){var z,y
z=new P.i1(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cN:function(a){var z,y
z=a.geR()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
bh:function(a){return J.O(a)&0x3ffffff},
bi:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.K(a[y].gcQ(),b))return y
return-1},
$isu:1,
static:{kt:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
i1:{
"^":"a;cQ:a<,b,eR:c<"},
dB:{
"^":"a;a,b,c,d",
gF:function(){return this.d},
B:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.W(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
kj:{
"^":"iH;"},
dC:{
"^":"id;"},
id:{
"^":"a+ba;",
$isl:1,
$asl:null,
$isu:1},
ba:{
"^":"a;",
gL:function(a){return new H.dD(a,this.gl(a),0,null)},
a3:function(a,b){return this.h(a,b)},
O:function(a,b){var z,y
z=this.gl(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gl(a))throw H.b(new P.W(a))}},
aO:function(a,b){return H.e(new H.cc(a,b),[null,null])},
k:function(a){return P.bx(a,"[","]")},
$isl:1,
$asl:null,
$isu:1},
i5:{
"^":"f:8;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
i2:{
"^":"a3;a,b,c,d",
gL:function(a){return new P.kw(this,this.c,this.d,this.b,null)},
O:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.c(x,y)
b.$1(x[y])
if(z!==this.d)H.M(new P.W(this))}},
gX:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a_:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.c(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bx(this,"{","}")},
dM:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.b(H.c8());++this.d
y=this.a
x=y.length
if(z>=x)return H.c(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ap:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.c(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cS();++this.d},
cS:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,[H.A(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.cE(y,0,w,z,x)
C.a.cE(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ex:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$isu:1,
static:{cb:function(a,b){var z=H.e(new P.i2(null,0,0,0),[b])
z.ex(a,b)
return z}}},
kw:{
"^":"a;a,b,c,d,e",
gF:function(){return this.e},
B:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.M(new P.W(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.c(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
iI:{
"^":"a;",
aO:function(a,b){return H.e(new H.dn(this,b),[H.A(this,0),null])},
k:function(a){return P.bx(this,"{","}")},
O:function(a,b){var z
for(z=this.gL(this);z.B();)b.$1(z.d)},
$isu:1},
iH:{
"^":"iI;"}}],["","",,P,{
"^":"",
bO:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.km(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bO(a[z])
return a},
cK:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.b(H.J(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.F(w)
y=x
throw H.b(new P.am(String(y),null,null))}return P.bO(z)},
nf:[function(a){return a.i9()},"$1","lh",2,0,30],
km:{
"^":"a;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.fd(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.aw().length
return z},
gX:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.aw().length
return z===0},
gal:function(){if(this.b==null)return this.c.gal()
return new P.kn(this)},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.a2(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.dc().m(0,b,c)},
a2:function(a){if(this.b==null)return this.c.a2(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
ad:function(a,b){if(this.b!=null&&!this.a2(b))return
return this.dc().ad(0,b)},
O:function(a,b){var z,y,x,w
if(this.b==null)return this.c.O(0,b)
z=this.aw()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bO(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.b(new P.W(this))}},
k:function(a){return P.cd(this)},
aw:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
dc:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.an()
y=this.aw()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
fd:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bO(this.a[a])
return this.b[a]=z},
$isaR:1,
$asaR:I.av},
kn:{
"^":"aQ;a",
gl:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gl(z)}else z=z.aw().length
return z},
a3:function(a,b){var z=this.a
if(z.b==null)z=z.gal().a3(0,b)
else{z=z.aw()
if(b<0||b>=z.length)return H.c(z,b)
z=z[b]}return z},
gL:function(a){var z=this.a
if(z.b==null){z=z.gal()
z=z.gL(z)}else{z=z.aw()
z=new J.d8(z,z.length,0,null)}return z},
$asaQ:I.av,
$asa3:I.av},
df:{
"^":"a;"},
bs:{
"^":"a;"},
he:{
"^":"df;"},
ca:{
"^":"P;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
hW:{
"^":"ca;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
hV:{
"^":"df;a,b",
fR:function(a,b){return P.cK(a,this.gfS().a)},
c8:function(a){return this.fR(a,null)},
ha:function(a,b){var z=this.gcc()
return P.kp(a,z.b,z.a)},
h9:function(a){return this.ha(a,null)},
gcc:function(){return C.Q},
gfS:function(){return C.P}},
hY:{
"^":"bs;a,b"},
hX:{
"^":"bs;a"},
kq:{
"^":"a;",
e_:function(a){var z,y,x,w,v,u
z=J.D(a)
y=z.gl(a)
if(typeof y!=="number")return H.v(y)
x=0
w=0
for(;w<y;++w){v=z.aq(a,w)
if(v>92)continue
if(v<32){if(w>x)this.cz(a,x,w)
x=w+1
this.Y(92)
switch(v){case 8:this.Y(98)
break
case 9:this.Y(116)
break
case 10:this.Y(110)
break
case 12:this.Y(102)
break
case 13:this.Y(114)
break
default:this.Y(117)
this.Y(48)
this.Y(48)
u=v>>>4&15
this.Y(u<10?48+u:87+u)
u=v&15
this.Y(u<10?48+u:87+u)
break}}else if(v===34||v===92){if(w>x)this.cz(a,x,w)
x=w+1
this.Y(92)
this.Y(v)}}if(x===0)this.V(a)
else if(x<y)this.cz(a,x,y)},
bN:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.b(new P.hW(a,null))}z.push(a)},
d2:function(a){var z=this.a
if(0>=z.length)return H.c(z,0)
z.pop()},
bw:function(a){var z,y,x,w
if(this.dZ(a))return
this.bN(a)
try{z=this.fi(a)
if(!this.dZ(z))throw H.b(new P.ca(a,null))
x=this.a
if(0>=x.length)return H.c(x,0)
x.pop()}catch(w){x=H.F(w)
y=x
throw H.b(new P.ca(a,y))}},
dZ:function(a){var z,y
if(typeof a==="number"){if(!C.b.ghn(a))return!1
this.hW(a)
return!0}else if(a===!0){this.V("true")
return!0}else if(a===!1){this.V("false")
return!0}else if(a==null){this.V("null")
return!0}else if(typeof a==="string"){this.V("\"")
this.e_(a)
this.V("\"")
return!0}else{z=J.p(a)
if(!!z.$isl){this.bN(a)
this.hU(a)
this.d2(a)
return!0}else if(!!z.$isaR){this.bN(a)
y=this.hV(a)
this.d2(a)
return y}else return!1}},
hU:function(a){var z,y
this.V("[")
z=J.D(a)
if(z.gl(a)>0){this.bw(z.h(a,0))
for(y=1;y<z.gl(a);++y){this.V(",")
this.bw(z.h(a,y))}}this.V("]")},
hV:function(a){var z,y,x,w,v
z={}
if(a.gX(a)){this.V("{}")
return!0}y=J.cW(a.gl(a),2)
if(typeof y!=="number")return H.v(y)
x=Array(y)
z.a=0
z.b=!0
a.O(0,new P.kr(z,x))
if(!z.b)return!1
this.V("{")
for(z=x.length,w="\"",v=0;v<z;v+=2,w=",\""){this.V(w)
this.e_(x[v])
this.V("\":")
y=v+1
if(y>=z)return H.c(x,y)
this.bw(x[y])}this.V("}")
return!0},
fi:function(a){return this.b.$1(a)}},
kr:{
"^":"f:8;a,b",
$2:function(a,b){var z,y,x,w,v
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
v=z.length
if(x>=v)return H.c(z,x)
z[x]=a
y.a=w+1
if(w>=v)return H.c(z,w)
z[w]=b}},
ko:{
"^":"kq;c,a,b",
hW:function(a){this.c.a+=C.b.k(a)},
V:function(a){this.c.a+=H.d(a)},
cz:function(a,b,c){this.c.a+=J.fD(a,b,c)},
Y:function(a){this.c.a+=H.aS(a)},
static:{kp:function(a,b,c){var z,y,x
z=new P.bg("")
y=P.lh()
x=new P.ko(z,[],y)
x.bw(a)
y=z.a
return y.charCodeAt(0)==0?y:y}}},
jK:{
"^":"he;a",
dk:function(a,b){return new P.jL(b==null?this.a:b).c6(a)},
c8:function(a){return this.dk(a,null)},
gcc:function(){return new P.jM()}},
jM:{
"^":"bs;",
b_:function(a,b,c){var z,y,x,w,v,u,t
z=J.D(a)
y=z.gl(a)
P.aT(b,c,y,null,null,null)
x=J.a0(y)
w=x.I(y,b)
v=J.p(w)
if(v.v(w,0))return new Uint8Array(H.j(0))
v=H.j(v.u(w,3))
u=new Uint8Array(v)
t=new P.kQ(0,0,u)
if(t.eX(a,b,y)!==y)t.dd(z.aq(a,x.I(y,1)),0)
return new Uint8Array(u.subarray(0,C.V.eP(u,0,t.b,v)))},
c6:function(a){return this.b_(a,0,null)}},
kQ:{
"^":"a;a,b,c",
dd:function(a,b){var z,y,x,w,v
z=this.c
y=this.b
if((b&64512)===56320){x=65536+((a&1023)<<10>>>0)|b&1023
w=y+1
this.b=w
v=z.length
if(y>=v)return H.c(z,y)
z[y]=(240|x>>>18)>>>0
y=w+1
this.b=y
if(w>=v)return H.c(z,w)
z[w]=128|x>>>12&63
w=y+1
this.b=w
if(y>=v)return H.c(z,y)
z[y]=128|x>>>6&63
this.b=w+1
if(w>=v)return H.c(z,w)
z[w]=128|x&63
return!0}else{w=y+1
this.b=w
v=z.length
if(y>=v)return H.c(z,y)
z[y]=224|a>>>12
y=w+1
this.b=y
if(w>=v)return H.c(z,w)
z[w]=128|a>>>6&63
this.b=y+1
if(y>=v)return H.c(z,y)
z[y]=128|a&63
return!1}},
eX:function(a,b,c){var z,y,x,w,v,u,t,s
if(b!==c&&(J.f6(a,J.cX(c,1))&64512)===55296)c=J.cX(c,1)
if(typeof c!=="number")return H.v(c)
z=this.c
y=z.length
x=J.cO(a)
w=b
for(;w<c;++w){v=x.aq(a,w)
if(v<=127){u=this.b
if(u>=y)break
this.b=u+1
z[u]=v}else if((v&64512)===55296){if(this.b+3>=y)break
t=w+1
if(this.dd(v,C.i.aq(a,t)))w=t}else if(v<=2047){u=this.b
s=u+1
if(s>=y)break
this.b=s
if(u>=y)return H.c(z,u)
z[u]=192|v>>>6
this.b=s+1
z[s]=128|v&63}else{u=this.b
if(u+2>=y)break
s=u+1
this.b=s
if(u>=y)return H.c(z,u)
z[u]=224|v>>>12
u=s+1
this.b=u
if(s>=y)return H.c(z,s)
z[s]=128|v>>>6&63
this.b=u+1
if(u>=y)return H.c(z,u)
z[u]=128|v&63}}return w}},
jL:{
"^":"bs;a",
b_:function(a,b,c){var z,y,x,w
z=J.ak(a)
P.aT(b,c,z,null,null,null)
y=new P.bg("")
x=this.a
w=new P.kN(x,y,!0,0,0,0)
w.b_(a,b,z)
if(w.e>0){if(!x)H.M(new P.am("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.aS(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
c6:function(a){return this.b_(a,0,null)}},
kN:{
"^":"a;a,b,c,d,e,f",
b_:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.kP(c)
v=new P.kO(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=J.D(a),r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
q=s.h(a,r)
if(typeof q!=="number")return q.cA()
if((q&192)!==128){if(t)throw H.b(new P.am("Bad UTF-8 encoding 0x"+C.b.bb(q,16),null,null))
this.c=!1
u.a+=H.aS(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.c(C.z,p)
if(z<=C.z[p]){if(t)throw H.b(new P.am("Overlong encoding of 0x"+C.c.bb(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.b(new P.am("Character outside valid Unicode range: 0x"+C.c.bb(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.aS(z)
this.c=!1}if(typeof c!=="number")return H.v(c)
for(;r<c;r=n){o=w.$2(a,r)
if(J.a1(o,0)){this.c=!1
if(typeof o!=="number")return H.v(o)
n=r+o
v.$2(r,n)
if(n===c)break
r=n}n=r+1
q=s.h(a,r)
p=J.a0(q)
if(p.a6(q,0)){if(t)throw H.b(new P.am("Negative UTF-8 code unit: -0x"+J.fE(p.cC(q),16),null,null))
u.a+=H.aS(65533)}else{if(typeof q!=="number")return q.cA()
if((q&224)===192){z=q&31
y=1
x=1
continue $loop$0}if((q&240)===224){z=q&15
y=2
x=2
continue $loop$0}if((q&248)===240&&q<245){z=q&7
y=3
x=3
continue $loop$0}if(t)throw H.b(new P.am("Bad UTF-8 encoding 0x"+C.b.bb(q,16),null,null))
this.c=!1
u.a+=H.aS(65533)
z=65533
y=0
x=0}}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
kP:{
"^":"f:20;a",
$2:function(a,b){var z,y,x,w
z=this.a
if(typeof z!=="number")return H.v(z)
y=J.D(a)
x=b
for(;x<z;++x){w=y.h(a,x)
if(typeof w!=="number")return w.cA()
if((w&127)!==w)return x-b}return z-b}},
kO:{
"^":"f:21;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.j0(this.b,a,b)}}}],["","",,P,{
"^":"",
l1:function(a){return H.j2(a)},
j1:function(a,b,c){var z,y,x
if(b<0)throw H.b(P.U(b,0,J.ak(a),null,null))
if(c<b)throw H.b(P.U(c,b,J.ak(a),null,null))
z=J.ax(a)
for(y=0;y<b;++y)if(!z.B())throw H.b(P.U(b,0,y,null,null))
x=[]
for(y=b;y<c;++y){if(!z.B())throw H.b(P.U(c,b,y,null,null))
x.push(z.gF())}return H.e0(x)},
lS:[function(a,b){return J.f7(a,b)},"$2","li",4,0,31],
c3:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.b2(a)
if(typeof a==="string")return JSON.stringify(a)
return P.hf(a)},
hf:function(a){var z=J.p(a)
if(!!z.$isf)return z.k(a)
return H.bF(a)},
bv:function(a){return new P.k5(a)},
i3:function(a,b,c){var z,y,x
z=J.hP(a,c)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
bb:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.ax(a);y.B();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
S:function(a){var z=H.d(a)
H.bW(z)},
j0:function(a,b,c){var z
if(typeof a==="object"&&a!==null&&a.constructor===Array){z=a.length
c=P.aT(b,c,z,null,null,null)
return H.e0(b>0||J.aL(c,z)?C.a.eo(a,b,c):a)}if(!!J.p(a).$isck)return H.iw(a,b,P.aT(b,c,a.length,null,null,null))
return P.j1(a,b,c)},
mE:{
"^":"f:22;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.l1(a)}},
cL:{
"^":"a;"},
"+bool":0,
T:{
"^":"a;"},
c2:{
"^":"a;ht:a<,b",
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.c2))return!1
return this.a===b.a&&this.b===b.b},
aM:function(a,b){return C.c.aM(this.a,b.ght())},
gH:function(a){return this.a},
k:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.h5(z?H.Z(this).getUTCFullYear()+0:H.Z(this).getFullYear()+0)
x=P.b3(z?H.Z(this).getUTCMonth()+1:H.Z(this).getMonth()+1)
w=P.b3(z?H.Z(this).getUTCDate()+0:H.Z(this).getDate()+0)
v=P.b3(z?H.Z(this).getUTCHours()+0:H.Z(this).getHours()+0)
u=P.b3(z?H.Z(this).getUTCMinutes()+0:H.Z(this).getMinutes()+0)
t=P.b3(z?H.Z(this).getUTCSeconds()+0:H.Z(this).getSeconds()+0)
s=P.h6(H.dY(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
ew:function(a,b){if(Math.abs(a)>864e13)throw H.b(P.az(a))},
$isT:1,
$asT:I.av,
static:{h4:function(a,b){var z=new P.c2(a,b)
z.ew(a,b)
return z},h5:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.d(z)
if(z>=10)return y+"00"+H.d(z)
return y+"000"+H.d(z)},h6:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},b3:function(a){if(a>=10)return""+a
return"0"+a}}},
b1:{
"^":"aw;",
$isT:1,
$asT:function(){return[P.aw]}},
"+double":0,
a8:{
"^":"a;ax:a<",
n:function(a,b){return new P.a8(C.c.n(this.a,b.gax()))},
I:function(a,b){return new P.a8(this.a-b.gax())},
u:function(a,b){return new P.a8(C.c.N(this.a*b))},
bf:function(a,b){if(b===0)throw H.b(new P.hy())
return new P.a8(C.c.bf(this.a,b))},
a6:function(a,b){return C.c.a6(this.a,b.gax())},
an:function(a,b){return C.c.an(this.a,b.gax())},
bB:function(a,b){return C.c.bB(this.a,b.gax())},
by:function(a,b){return C.c.by(this.a,b.gax())},
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.a8))return!1
return this.a===b.a},
gH:function(a){return this.a&0x1FFFFFFF},
aM:function(a,b){return C.c.aM(this.a,b.gax())},
k:function(a){var z,y,x,w,v
z=new P.hd()
y=this.a
if(y<0)return"-"+new P.a8(-y).k(0)
x=z.$1(C.c.cp(C.c.az(y,6e7),60))
w=z.$1(C.c.cp(C.c.az(y,1e6),60))
v=new P.hc().$1(C.c.cp(y,1e6))
return""+C.c.az(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
cC:function(a){return new P.a8(-this.a)},
$isT:1,
$asT:function(){return[P.a8]}},
hc:{
"^":"f:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
hd:{
"^":"f:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
P:{
"^":"a;",
ga8:function(){return H.R(this.$thrownJsError)}},
dU:{
"^":"P;",
k:function(a){return"Throw of null."}},
ay:{
"^":"P;a,b,c,d",
gbT:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbS:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.d(z)+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gbT()+y+x
if(!this.a)return w
v=this.gbS()
u=P.c3(this.b)
return w+v+": "+H.d(u)},
static:{az:function(a){return new P.ay(!1,null,null,a)},fG:function(a,b,c){return new P.ay(!0,a,b,c)}}},
ct:{
"^":"ay;e,f,a,b,c,d",
gbT:function(){return"RangeError"},
gbS:function(){var z,y,x,w
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else{w=J.a0(x)
if(w.an(x,z))y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=w.a6(x,z)?": Valid value range is empty":": Only valid value is "+H.d(z)}}return y},
static:{iy:function(a){return new P.ct(null,null,!1,null,null,a)},bd:function(a,b,c){return new P.ct(null,null,!0,a,b,"Value not in range")},U:function(a,b,c,d,e){return new P.ct(b,c,!0,a,d,"Invalid value")},aT:function(a,b,c,d,e,f){var z
if(!(0>a)){if(typeof c!=="number")return H.v(c)
z=a>c}else z=!0
if(z)throw H.b(P.U(a,0,c,"start",f))
if(b!=null){if(!(a>b)){if(typeof c!=="number")return H.v(c)
z=b>c}else z=!0
if(z)throw H.b(P.U(b,a,c,"end",f))
return b}return c}}},
hx:{
"^":"ay;e,l:f>,a,b,c,d",
gbT:function(){return"RangeError"},
gbS:function(){P.c3(this.e)
var z=": index should be less than "+H.d(this.f)
return J.aL(this.b,0)?": index must not be negative":z},
static:{bw:function(a,b,c,d,e){var z=e!=null?e:J.ak(b)
return new P.hx(b,z,!0,a,c,"Index out of range")}}},
Q:{
"^":"P;a",
k:function(a){return"Unsupported operation: "+this.a}},
cB:{
"^":"P;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"}},
aU:{
"^":"P;a",
k:function(a){return"Bad state: "+this.a}},
W:{
"^":"P;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.c3(z))+"."}},
ig:{
"^":"a;",
k:function(a){return"Out of Memory"},
ga8:function(){return},
$isP:1},
e4:{
"^":"a;",
k:function(a){return"Stack Overflow"},
ga8:function(){return},
$isP:1},
h2:{
"^":"P;a",
k:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
k5:{
"^":"a;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
am:{
"^":"a;a,b,a0:c>",
k:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.d(z):"FormatException"
return y}},
hy:{
"^":"a;",
k:function(a){return"IntegerDivisionByZeroException"}},
hg:{
"^":"a;a",
k:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z=H.bE(b,"expando$values")
return z==null?null:H.bE(z,this.cR())},
m:function(a,b,c){var z=H.bE(b,"expando$values")
if(z==null){z=new P.a()
H.cs(b,"expando$values",z)}H.cs(z,this.cR(),c)},
cR:function(){var z,y
z=H.bE(this,"expando$key")
if(z==null){y=$.dp
$.dp=y+1
z="expando$key$"+y
H.cs(this,"expando$key",z)}return z}},
hn:{
"^":"a;"},
o:{
"^":"aw;",
$isT:1,
$asT:function(){return[P.aw]}},
"+int":0,
a3:{
"^":"a;",
aO:function(a,b){return H.bA(this,b,H.a5(this,"a3",0),null)},
O:function(a,b){var z
for(z=this.gL(this);z.B();)b.$1(z.gF())},
cu:function(a,b){return P.bb(this,b,H.a5(this,"a3",0))},
ct:function(a){return this.cu(a,!0)},
gl:function(a){var z,y
z=this.gL(this)
for(y=0;z.B();)++y
return y},
a3:function(a,b){var z,y,x
if(b<0)H.M(P.U(b,0,null,"index",null))
for(z=this.gL(this),y=0;z.B();){x=z.gF()
if(b===y)return x;++y}throw H.b(P.bw(b,this,"index",null,y))},
k:function(a){return P.hM(this,"(",")")}},
hO:{
"^":"a;"},
l:{
"^":"a;",
$asl:null,
$isu:1},
"+List":0,
aR:{
"^":"a;"},
mG:{
"^":"a;",
k:function(a){return"null"}},
"+Null":0,
aw:{
"^":"a;",
$isT:1,
$asT:function(){return[P.aw]}},
"+num":0,
a:{
"^":";",
v:function(a,b){return this===b},
gH:function(a){return H.aq(this)},
k:function(a){return H.bF(this)}},
ar:{
"^":"a;"},
aa:{
"^":"a;",
$isT:1,
$asT:function(){return[P.aa]}},
"+String":0,
bg:{
"^":"a;aI:a<",
gl:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{e5:function(a,b,c){var z=J.ax(b)
if(!z.B())return a
if(c.length===0){do a+=H.d(z.gF())
while(z.B())}else{a+=H.d(z.gF())
for(;z.B();)a=a+c+H.d(z.gF())}return a}}},
e6:{
"^":"a;"}}],["","",,W,{
"^":"",
d9:function(a,b,c){return new Blob(a)},
h1:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.O)},
au:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
ev:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
eA:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.k_(a)
if(!!J.p(z).$isX)return z
return}else return a},
kX:function(a){if(!!J.p(a).$isdl)return a
return P.lc(a,!0)},
I:function(a){var z=$.n
if(z===C.d)return a
return z.fs(a,!0)},
B:{
"^":"b4;",
$isB:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
lL:{
"^":"B;C:type=",
k:function(a){return String(a)},
$isi:1,
"%":"HTMLAnchorElement"},
lN:{
"^":"B;",
k:function(a){return String(a)},
$isi:1,
"%":"HTMLAreaElement"},
fL:{
"^":"i;at:size=,C:type=",
hY:function(a,b,c,d){return a.slice(b,c,d)},
ek:function(a,b,c){return a.slice(b,c)},
"%":";Blob"},
lO:{
"^":"B;",
gci:function(a){return H.e(new W.C(a,"error",!1),[null])},
gcj:function(a){return H.e(new W.C(a,"load",!1),[null])},
$isX:1,
$isi:1,
"%":"HTMLBodyElement"},
lP:{
"^":"B;C:type=",
"%":"HTMLButtonElement"},
dc:{
"^":"B;q:height%,t:width%",
cB:function(a,b,c){return a.getContext(b,P.eL(c))},
e4:function(a,b,c,d,e,f,g){var z,y
z=P.ae(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.cB(a,"webgl",z)
return y==null?this.cB(a,"experimental-webgl",z):y},
e3:function(a,b){return this.e4(a,!0,!0,!0,!0,!1,b)},
$isdc:1,
"%":"HTMLCanvasElement"},
lR:{
"^":"ap;l:length=",
$isi:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
lT:{
"^":"hz;l:length=",
bz:function(a,b){var z=this.eZ(a,b)
return z!=null?z:""},
eZ:function(a,b){if(W.h1(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.h8()+b)},
gq:function(a){return a.height},
gt:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hz:{
"^":"i+h0;"},
h0:{
"^":"a;",
gq:function(a){return this.bz(a,"height")},
gat:function(a){return this.bz(a,"size")},
gt:function(a){return this.bz(a,"width")}},
h7:{
"^":"i;",
hG:function(a,b,c,d){return a.requestQuota(b,H.V(c,1),H.V(d,1))},
"%":"DeprecatedStorageQuota"},
lU:{
"^":"bt;",
fN:function(a,b,c){return this.eY(a,b,P.ae(["create",!0,"exclusive",c]))},
fM:function(a,b){return this.fN(a,b,!1)},
eI:function(a,b,c,d,e){this.eJ(a,b,P.eL(d),e,c)
return},
eJ:function(a,b,c,d,e){return a.getFile(b,c,H.V(d,1),H.V(e,1))},
eY:function(a,b,c){var z=H.e(new P.ac(H.e(new P.z(0,$.n,null),[W.bt])),[W.bt])
this.eI(a,b,new W.h9(z),c,new W.ha(z))
return z.a},
"%":"DirectoryEntry"},
ha:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
h9:{
"^":"f:0;a",
$1:function(a){this.a.ai(a)}},
dl:{
"^":"ap;",
$isdl:1,
"%":"Document|HTMLDocument|XMLDocument"},
lV:{
"^":"ap;",
$isi:1,
"%":"DocumentFragment|ShadowRoot"},
lW:{
"^":"i;",
k:function(a){return String(a)},
"%":"DOMException"},
hb:{
"^":"i;c1:bottom=,q:height=,a9:left=,cr:right=,aT:top=,t:width=,i:x=,j:y=",
k:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(this.gt(a))+" x "+H.d(this.gq(a))},
v:function(a,b){var z,y,x
if(b==null)return!1
z=J.p(b)
if(!z.$isaf)return!1
y=a.left
x=z.ga9(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaT(b)
if(y==null?x==null:y===x){y=this.gt(a)
x=z.gt(b)
if(y==null?x==null:y===x){y=this.gq(a)
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gH:function(a){var z,y,x,w
z=J.O(a.left)
y=J.O(a.top)
x=J.O(this.gt(a))
w=J.O(this.gq(a))
return W.ev(W.au(W.au(W.au(W.au(0,z),y),x),w))},
gcv:function(a){return H.e(new P.Y(a.left,a.top),[null])},
$isaf:1,
$asaf:I.av,
"%":";DOMRectReadOnly"},
b4:{
"^":"ap;",
ga0:function(a){return P.iA(C.b.N(a.offsetLeft),C.b.N(a.offsetTop),C.b.N(a.offsetWidth),C.b.N(a.offsetHeight),null)},
k:function(a){return a.localName},
e2:function(a){return a.getBoundingClientRect()},
gci:function(a){return H.e(new W.C(a,"error",!1),[null])},
gcj:function(a){return H.e(new W.C(a,"load",!1),[null])},
gdA:function(a){return H.e(new W.C(a,"mousedown",!1),[null])},
gdB:function(a){return H.e(new W.C(a,"mouseenter",!1),[null])},
gdC:function(a){return H.e(new W.C(a,"mouseleave",!1),[null])},
gdD:function(a){return H.e(new W.C(a,"mousemove",!1),[null])},
gdE:function(a){return H.e(new W.C(a,"mouseout",!1),[null])},
gdF:function(a){return H.e(new W.C(a,"mouseover",!1),[null])},
gdG:function(a){return H.e(new W.C(a,"mouseup",!1),[null])},
$isb4:1,
$isi:1,
$isX:1,
"%":";Element"},
lX:{
"^":"B;q:height%,ao:src},C:type=,t:width%",
"%":"HTMLEmbedElement"},
bt:{
"^":"i;",
$isa:1,
"%":";Entry"},
lY:{
"^":"bu;aC:error=",
"%":"ErrorEvent"},
bu:{
"^":"i;C:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
X:{
"^":"i;",
de:function(a,b,c,d){if(c!=null)this.eM(a,b,c,d)},
dL:function(a,b,c,d){if(c!=null)this.ff(a,b,c,d)},
eM:function(a,b,c,d){return a.addEventListener(b,H.V(c,1),d)},
ff:function(a,b,c,d){return a.removeEventListener(b,H.V(c,1),d)},
$isX:1,
"%":"MediaStream;EventTarget"},
mg:{
"^":"B;C:type=",
"%":"HTMLFieldSetElement"},
dq:{
"^":"fL;",
$isa:1,
"%":"File"},
c5:{
"^":"bt;",
eU:function(a,b,c){return a.createWriter(H.V(b,1),H.V(c,1))},
dj:function(a){var z=H.e(new P.ac(H.e(new P.z(0,$.n,null),[W.ds])),[W.ds])
this.eU(a,new W.hh(z),new W.hi(z))
return z.a},
eW:function(a,b,c){return a.file(H.V(b,1),H.V(c,1))},
dn:function(a){var z=H.e(new P.ac(H.e(new P.z(0,$.n,null),[W.dq])),[W.dq])
this.eW(a,new W.hj(z),new W.hk(z))
return z.a},
$isc5:1,
"%":"FileEntry"},
hh:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
hi:{
"^":"f:0;a",
$1:function(a){this.a.ai(a)}},
hj:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
hk:{
"^":"f:0;a",
$1:function(a){this.a.ai(a)}},
hl:{
"^":"X;aC:error=",
gcq:function(a){var z=a.result
if(!!J.p(z).$isfN)return H.dS(z,0,null)
return z},
"%":"FileReader"},
dr:{
"^":"i;M:root=",
$isa:1,
"%":"DOMFileSystem"},
ds:{
"^":"X;aC:error=,l:length=",
aU:function(a,b){return a.truncate(b)},
ghy:function(a){return H.e(new W.aF(a,"write",!1),[null])},
$isa:1,
"%":"FileWriter"},
mj:{
"^":"B;l:length=",
"%":"HTMLFormElement"},
hv:{
"^":"hw;",
i8:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
hz:function(a,b,c){return a.open(b,c)},
bE:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
hw:{
"^":"X;",
"%":";XMLHttpRequestEventTarget"},
mk:{
"^":"B;q:height%,ao:src},t:width%",
"%":"HTMLIFrameElement"},
du:{
"^":"B;q:height%,ao:src},t:width%",
a1:function(a,b){return a.complete.$1(b)},
$isdu:1,
"%":"HTMLImageElement"},
mm:{
"^":"B;q:height%,at:size=,ao:src},C:type=,t:width%",
$isb4:1,
$isi:1,
$isX:1,
"%":"HTMLInputElement"},
mp:{
"^":"B;C:type=",
"%":"HTMLKeygenElement"},
mq:{
"^":"B;C:type=",
"%":"HTMLLinkElement"},
i6:{
"^":"B;aC:error=,ao:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
mt:{
"^":"B;C:type=",
"%":"HTMLMenuElement"},
mu:{
"^":"B;C:type=",
"%":"HTMLMenuItemElement"},
cg:{
"^":"eo;",
ga0:function(a){var z,y
if(!!a.offsetX)return H.e(new P.Y(a.offsetX,a.offsetY),[null])
else{if(!J.p(W.eA(a.target)).$isb4)throw H.b(new P.Q("offsetX is only supported on elements"))
z=W.eA(a.target)
y=H.e(new P.Y(a.clientX,a.clientY),[null]).I(0,J.fs(J.fu(z)))
return H.e(new P.Y(J.d5(y.a),J.d5(y.b)),[null])}},
$iscg:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
mD:{
"^":"i;",
$isi:1,
"%":"Navigator"},
ap:{
"^":"X;",
k:function(a){var z=a.nodeValue
return z==null?this.eq(a):z},
$isa:1,
"%":"Attr;Node"},
mF:{
"^":"hC;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.bw(b,a,null,null,null))
return a[b]},
m:function(a,b,c){throw H.b(new P.Q("Cannot assign element of immutable List."))},
a3:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.ap]},
$isu:1,
$isb8:1,
$isb6:1,
"%":"NodeList|RadioNodeList"},
hA:{
"^":"i+ba;",
$isl:1,
$asl:function(){return[W.ap]},
$isu:1},
hC:{
"^":"hA+dv;",
$isl:1,
$asl:function(){return[W.ap]},
$isu:1},
mH:{
"^":"B;C:type=",
"%":"HTMLOListElement"},
mI:{
"^":"B;q:height%,C:type=,t:width%",
"%":"HTMLObjectElement"},
mJ:{
"^":"B;C:type=",
"%":"HTMLOutputElement"},
bc:{
"^":"bu;",
$isbc:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
mM:{
"^":"B;ao:src},C:type=",
"%":"HTMLScriptElement"},
mO:{
"^":"B;l:length=,at:size=,C:type=",
"%":"HTMLSelectElement"},
mP:{
"^":"B;ao:src},C:type=",
"%":"HTMLSourceElement"},
mQ:{
"^":"bu;aC:error=",
"%":"SpeechRecognitionError"},
mS:{
"^":"B;C:type=",
"%":"HTMLStyleElement"},
mW:{
"^":"B;C:type=",
"%":"HTMLTextAreaElement"},
bI:{
"^":"i;",
ghB:function(a){return H.e(new P.Y(C.b.N(a.pageX),C.b.N(a.pageY)),[null])},
$isa:1,
"%":"Touch"},
cA:{
"^":"eo;fz:changedTouches=",
$iscA:1,
$isa:1,
"%":"TouchEvent"},
mY:{
"^":"hD;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.bw(b,a,null,null,null))
return a[b]},
m:function(a,b,c){throw H.b(new P.Q("Cannot assign element of immutable List."))},
a3:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.bI]},
$isu:1,
$isb8:1,
$isb6:1,
"%":"TouchList"},
hB:{
"^":"i+ba;",
$isl:1,
$asl:function(){return[W.bI]},
$isu:1},
hD:{
"^":"hB+dv;",
$isl:1,
$asl:function(){return[W.bI]},
$isu:1},
mZ:{
"^":"B;ao:src}",
"%":"HTMLTrackElement"},
eo:{
"^":"bu;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
eq:{
"^":"i6;q:height%,t:width%",
$iseq:1,
"%":"HTMLVideoElement"},
jN:{
"^":"X;",
eL:function(a,b,c,d,e){return a.webkitRequestFileSystem(b,c,H.V(d,1),H.V(e,1))},
fg:function(a,b,c){var z=H.e(new P.ac(H.e(new P.z(0,$.n,null),[W.dr])),[W.dr])
this.eL(a,b,c,new W.jO(z),new W.jP(z))
return z.a},
$isi:1,
$isX:1,
"%":"DOMWindow|Window"},
jO:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
jP:{
"^":"f:0;a",
$1:function(a){this.a.ai(a)}},
n5:{
"^":"i;c1:bottom=,q:height=,a9:left=,cr:right=,aT:top=,t:width=",
k:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
v:function(a,b){var z,y,x
if(b==null)return!1
z=J.p(b)
if(!z.$isaf)return!1
y=a.left
x=z.ga9(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaT(b)
if(y==null?x==null:y===x){y=a.width
x=z.gt(b)
if(y==null?x==null:y===x){y=a.height
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gH:function(a){var z,y,x,w
z=J.O(a.left)
y=J.O(a.top)
x=J.O(a.width)
w=J.O(a.height)
return W.ev(W.au(W.au(W.au(W.au(0,z),y),x),w))},
gcv:function(a){return H.e(new P.Y(a.left,a.top),[null])},
$isaf:1,
$asaf:I.av,
"%":"ClientRect"},
n6:{
"^":"ap;",
$isi:1,
"%":"DocumentType"},
n7:{
"^":"hb;",
gq:function(a){return a.height},
gt:function(a){return a.width},
gi:function(a){return a.x},
si:function(a,b){a.x=b},
gj:function(a){return a.y},
sj:function(a,b){a.y=b},
"%":"DOMRect"},
na:{
"^":"B;",
$isX:1,
$isi:1,
"%":"HTMLFrameSetElement"},
aF:{
"^":"as;a,b,c",
aE:function(a,b,c,d){var z=new W.H(0,this.a,this.b,W.I(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.E()
return z},
dv:function(a,b,c){return this.aE(a,null,b,c)}},
C:{
"^":"aF;a,b,c"},
H:{
"^":"iS;a,b,c,d,e",
c2:function(){if(this.b==null)return
this.da()
this.b=null
this.d=null
return},
cn:function(a,b){if(this.b==null)return;++this.a
this.da()},
b7:function(a){return this.cn(a,null)},
dN:function(){if(this.b==null||this.a<=0)return;--this.a
this.E()},
E:function(){var z=this.d
if(z!=null&&this.a<=0)J.eY(this.b,this.c,z,this.e)},
da:function(){var z=this.d
if(z!=null)J.fy(this.b,this.c,z,this.e)}},
dv:{
"^":"a;",
gL:function(a){return new W.hm(a,this.gl(a),-1,null)},
$isl:1,
$asl:null,
$isu:1},
hm:{
"^":"a;a,b,c,d",
B:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bm(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gF:function(){return this.d}},
jZ:{
"^":"a;a",
de:function(a,b,c,d){return H.M(new P.Q("You can only attach EventListeners to your own window."))},
dL:function(a,b,c,d){return H.M(new P.Q("You can only attach EventListeners to your own window."))},
$isX:1,
$isi:1,
static:{k_:function(a){if(a===window)return a
else return new W.jZ(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
lJ:{
"^":"aB;",
$isi:1,
"%":"SVGAElement"},
lK:{
"^":"j3;",
$isi:1,
"%":"SVGAltGlyphElement"},
lM:{
"^":"r;",
$isi:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
lZ:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEBlendElement"},
m_:{
"^":"r;C:type=,q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEColorMatrixElement"},
m0:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEComponentTransferElement"},
m1:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFECompositeElement"},
m2:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEConvolveMatrixElement"},
m3:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEDiffuseLightingElement"},
m4:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEDisplacementMapElement"},
m5:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEFloodElement"},
m6:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEGaussianBlurElement"},
m7:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEImageElement"},
m8:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEMergeElement"},
m9:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEMorphologyElement"},
ma:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEOffsetElement"},
mb:{
"^":"r;i:x=,j:y=",
"%":"SVGFEPointLightElement"},
mc:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFESpecularLightingElement"},
md:{
"^":"r;i:x=,j:y=",
"%":"SVGFESpotLightElement"},
me:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFETileElement"},
mf:{
"^":"r;C:type=,q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFETurbulenceElement"},
mh:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFilterElement"},
mi:{
"^":"aB;q:height=,t:width=,i:x=,j:y=",
"%":"SVGForeignObjectElement"},
hu:{
"^":"aB;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
aB:{
"^":"r;",
$isi:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
ml:{
"^":"aB;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGImageElement"},
mr:{
"^":"r;",
$isi:1,
"%":"SVGMarkerElement"},
ms:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGMaskElement"},
mK:{
"^":"r;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGPatternElement"},
mL:{
"^":"hu;q:height=,t:width=,i:x=,j:y=",
"%":"SVGRectElement"},
mN:{
"^":"r;C:type=",
$isi:1,
"%":"SVGScriptElement"},
mT:{
"^":"r;C:type=",
"%":"SVGStyleElement"},
r:{
"^":"b4;",
gci:function(a){return H.e(new W.C(a,"error",!1),[null])},
gcj:function(a){return H.e(new W.C(a,"load",!1),[null])},
gdA:function(a){return H.e(new W.C(a,"mousedown",!1),[null])},
gdB:function(a){return H.e(new W.C(a,"mouseenter",!1),[null])},
gdC:function(a){return H.e(new W.C(a,"mouseleave",!1),[null])},
gdD:function(a){return H.e(new W.C(a,"mousemove",!1),[null])},
gdE:function(a){return H.e(new W.C(a,"mouseout",!1),[null])},
gdF:function(a){return H.e(new W.C(a,"mouseover",!1),[null])},
gdG:function(a){return H.e(new W.C(a,"mouseup",!1),[null])},
$isX:1,
$isi:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
mU:{
"^":"aB;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGSVGElement"},
mV:{
"^":"r;",
$isi:1,
"%":"SVGSymbolElement"},
e8:{
"^":"aB;",
"%":";SVGTextContentElement"},
mX:{
"^":"e8;",
$isi:1,
"%":"SVGTextPathElement"},
j3:{
"^":"e8;i:x=,j:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
n_:{
"^":"aB;q:height=,t:width=,i:x=,j:y=",
$isi:1,
"%":"SVGUseElement"},
n0:{
"^":"r;",
$isi:1,
"%":"SVGViewElement"},
n9:{
"^":"r;",
$isi:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
nb:{
"^":"r;",
$isi:1,
"%":"SVGCursorElement"},
nc:{
"^":"r;",
$isi:1,
"%":"SVGFEDropShadowElement"},
nd:{
"^":"r;",
$isi:1,
"%":"SVGGlyphRefElement"},
ne:{
"^":"r;",
$isi:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iD:{
"^":"i;",
fp:function(a,b,c){return a.bindBuffer(b,c)},
fq:function(a,b,c){return a.bindTexture(b,c)},
ft:function(a,b){return a.blendEquation(b)},
fu:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
fv:function(a,b,c,d){return a.bufferData(b,c,d)},
fA:function(a,b){return a.clear(b)},
fB:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
fC:function(a,b){return a.clearDepth(b)},
fF:function(a,b){return a.clearStencil(b)},
fH:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
fL:function(a){return a.createBuffer()},
fO:function(a){return a.createProgram()},
fP:function(a,b){return a.createShader(b)},
fQ:function(a){return a.createTexture()},
fT:function(a,b){return a.depthFunc(b)},
fU:function(a,b){return a.depthMask(b)},
h0:function(a,b){return a.disableVertexAttribArray(b)},
h1:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
h7:function(a,b){return a.enable(b)},
h8:function(a,b){return a.enableVertexAttribArray(b)},
e1:function(a,b,c){return a.getAttribLocation(b,c)},
e7:function(a,b){return a.getParameter(b)},
e9:function(a,b,c){return a.getUniformLocation(b,c)},
em:function(a,b,c,d){return a.stencilFunc(b,c,d)},
en:function(a,b,c,d){return a.stencilOp(b,c,d)},
hM:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.lb(g))
return}z=J.p(g)
if(!!z.$isdu)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdc)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iseq)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.b(P.az("Incorrect number or type of arguments"))},
hL:function(a,b,c,d,e,f,g){return this.hM(a,b,c,d,e,f,g,null,null,null)},
hN:function(a,b,c,d){return a.texParameteri(b,c,d)},
hS:function(a,b){return a.useProgram(b)},
hT:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
lQ:{
"^":"a;"}}],["","",,P,{
"^":"",
aW:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
ew:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
ix:function(a){return C.e},
kl:{
"^":"a;",
hv:function(a){if(a<=0||a>4294967296)throw H.b(P.iy("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
b6:function(){return Math.random()}},
Y:{
"^":"a;i:a>,j:b>",
k:function(a){return"Point("+H.d(this.a)+", "+H.d(this.b)+")"},
v:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.Y))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gH:function(a){var z,y
z=J.O(this.a)
y=J.O(this.b)
return P.ew(P.aW(P.aW(0,z),y))},
n:function(a,b){var z,y,x
z=this.a
y=J.k(b)
x=y.gi(b)
if(typeof z!=="number")return z.n()
x=C.b.n(z,x)
z=this.b
y=y.gj(b)
if(typeof z!=="number")return z.n()
y=new P.Y(x,C.b.n(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
I:function(a,b){var z,y,x,w
z=this.a
y=J.k(b)
x=y.gi(b)
if(typeof z!=="number")return z.I()
if(typeof x!=="number")return H.v(x)
w=this.b
y=y.gj(b)
if(typeof w!=="number")return w.I()
if(typeof y!=="number")return H.v(y)
y=new P.Y(z-x,w-y)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
u:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.u()
y=this.b
if(typeof y!=="number")return y.u()
y=new P.Y(z*b,y*b)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y}},
kE:{
"^":"a;",
gcr:function(a){return this.ga9(this)+this.c},
gc1:function(a){return this.gaT(this)+this.d},
k:function(a){return"Rectangle ("+this.ga9(this)+", "+this.b+") "+this.c+" x "+this.d},
v:function(a,b){var z,y
if(b==null)return!1
z=J.p(b)
if(!z.$isaf)return!1
if(this.ga9(this)===z.ga9(b)){y=this.b
z=y===z.gaT(b)&&this.a+this.c===z.gcr(b)&&y+this.d===z.gc1(b)}else z=!1
return z},
gH:function(a){var z=this.b
return P.ew(P.aW(P.aW(P.aW(P.aW(0,this.ga9(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gcv:function(a){var z=new P.Y(this.ga9(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
af:{
"^":"kE;a9:a>,aT:b>,t:c>,q:d>",
$asaf:null,
static:{iA:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.e(new P.af(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
j:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(P.az("Invalid length "+H.d(a)))
return a},
aX:function(a){return a},
dS:function(a,b,c){return new Uint8Array(a,b)},
dN:{
"^":"i;",
fo:function(a,b,c){return H.dS(a,b,c)},
fn:function(a){return this.fo(a,0,null)},
$isdN:1,
$isfN:1,
"%":"ArrayBuffer"},
cj:{
"^":"i;",
f4:function(a,b,c){throw H.b(P.U(b,0,c,null,null))},
cJ:function(a,b,c){if(b>>>0!==b||b>c)this.f4(a,b,c)},
eP:function(a,b,c,d){this.cJ(a,b,d)
this.cJ(a,c,d)
if(b>c)throw H.b(P.U(b,0,c,null,null))
return c},
$iscj:1,
"%":"DataView;ArrayBufferView;ch|dO|dQ|ci|dP|dR|ao"},
ch:{
"^":"cj;",
gl:function(a){return a.length},
$isb8:1,
$isb6:1},
ci:{
"^":"dQ;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
m:function(a,b,c){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
a[b]=c}},
dO:{
"^":"ch+ba;",
$isl:1,
$asl:function(){return[P.b1]},
$isu:1},
dQ:{
"^":"dO+dt;"},
ao:{
"^":"dR;",
m:function(a,b,c){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.o]},
$isu:1},
dP:{
"^":"ch+ba;",
$isl:1,
$asl:function(){return[P.o]},
$isu:1},
dR:{
"^":"dP+dt;"},
mv:{
"^":"ci;",
$isl:1,
$asl:function(){return[P.b1]},
$isu:1,
"%":"Float32Array"},
mw:{
"^":"ci;",
$isl:1,
$asl:function(){return[P.b1]},
$isu:1,
"%":"Float64Array"},
mx:{
"^":"ao;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isu:1,
"%":"Int16Array"},
my:{
"^":"ao;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isu:1,
"%":"Int32Array"},
mz:{
"^":"ao;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isu:1,
"%":"Int8Array"},
mA:{
"^":"ao;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isu:1,
"%":"Uint16Array"},
mB:{
"^":"ao;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isu:1,
"%":"Uint32Array"},
mC:{
"^":"ao;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isu:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
ck:{
"^":"ao;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isck:1,
$isjH:1,
$isl:1,
$asl:function(){return[P.o]},
$isu:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
bW:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
i9:{
"^":"a4;e,f,r,x,y,z,Q,ch,a,b,c,d",
b4:function(){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r
function $async$b4(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:s=v
s=s.ch
z=2
return H.h(s.R(0),$async$b4,y)
case 2:s=J
s=s
r=v
r=r.ch
z=3
return H.h(r.bA(),$async$b4,y)
case 3:s=u=s.ax(b)
r=v
s,t=r.f
case 4:s=u
if(!s.B()){z=5
break}s=t
s=s
r=u
s.dX(r.gF())
z=4
break
case 5:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$b4,y,null)}},
h3:{
"^":"a;a,b",
bA:function(){var z=0,y=new P.E(),x,w=2,v,u=this,t,s
function $async$bA(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=P
t=t
s=u
x=t.bb(s.a,!0,null)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$bA,y,null)},
bF:function(a){var z=0,y=new P.E(),x=1,w,v=this,u,t
function $async$bF(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=v
u=t.a
t=C
t=t.a
t.sl(u,0)
t=C
t=t.a
t.J(u,a)
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$bF,y,null)},
c7:function(){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q
function $async$c7(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:s=C
s=s.y
s=s
r=P
r=r
q=u
t=s.h9(r.ae(["v","1","rank",q.a]))
s=P
s.S("##"+t)
x=t
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$c7,y,null)},
R:function(a){var z=0,y=new P.E(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k,j,i
function $async$R(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
j=u
j=j.b
z=6
return H.h(j.bq("database.dat"),$async$R,y)
case 6:t=c
j=t
j=j
i=t
z=8
return H.h(i.aF(),$async$R,y)
case 8:z=7
return H.h(j.b8(0,c),$async$R,y)
case 7:s=c
j=C
j=j.v
r=j.c8(s)
j=P
j=j
i=H
j.S("##### load database.dat "+i.d(r))
j=C
j=j.y
q=j.c8(r)
j=u
o=j.a
j=C
j=j.a
j.sl(o,0)
j=J
j=j
i=J
n=j.ax(i.bm(q,"rank"))
case 9:j=n
if(!j.B()){z=10
break}j=n
p=j.gF()
j=H
m="##"+j.d(p)
j=H
j.bW(m)
j=o
j.push(p)
z=9
break
case 10:x=1
z=5
break
case 3:x=2
k=w
j=H
j.F(k)
z=5
break
case 2:z=1
break
case 5:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$R,y,null)},
aG:function(a){var z=0,y=new P.E(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m
function $async$aG(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:o=u
o=o.b
z=2
return H.h(o.bq("database.dat"),$async$aG,y)
case 2:t=c
x=4
o=J
z=7
return H.h(o.d6(t,0),$async$aG,y)
case 7:x=1
z=6
break
case 4:x=3
p=w
o=H
q=o.F(p)
s=q
o=P
o=o
n=H
o.S("e: truncate "+n.d(s))
z=6
break
case 3:z=1
break
case 6:o=u
z=8
return H.h(o.c7(),$async$aG,y)
case 8:q=c
o=J
o=o
n=t
m=C
m=m.v
m=m.gcc()
o.fF(n,m.c6(q),0)
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$aG,y,null)}},
ia:{
"^":"a;a,b,c,d",
a_:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z+1,x=this.b+2,w=x-1,v=0;v<y;++v)for(u=v===z,t=0;t<x;++t)if(t===0||t===w||u)this.Z(t,v).a=C.t
else this.Z(t,v).a=C.f},
Z:function(a,b){var z,y
if(typeof a!=="number")return a.a6()
if(!(a<0)){z=this.c+1
if(!(a>z)){y=J.a0(b)
z=y.a6(b,0)||y.an(b,z)}else z=!0}else z=!0
if(z)return this.d
z=this.a
y=J.cW(b,this.b+2)
if(typeof y!=="number")return H.v(y)
y=a+y
if(y>>>0!==y||y>=z.length)return H.c(z,y)
return z[y]},
fG:function(){var z,y,x,w,v,u
z=[]
for(y=this.c+1-1,x=this.b+2-1,w=0;w<y;++w){u=1
while(!0){if(!(u<x)){v=!0
break}if(this.Z(u,w).a===C.f){v=!1
break}++u}if(v)z.push(w)}C.a.cF(z)
return z},
fE:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.L)(a),++y)this.fD(a[y])},
fD:function(a){var z,y,x,w
for(z=this.b+2-1,y=a;x=J.a0(y),x.by(y,0);y=x.I(y,1))for(w=1;w<z;++w)if(this.Z(w,x.I(y,1)).a===C.q)this.Z(w,y).a=C.f
else this.Z(w,y).a=this.Z(w,x.I(y,1)).a},
ey:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.c,y=z+1,x=this.b+2,w=this.a,v=x-1,u=0;u<y;++u)for(t=u===z,s=0;s<x;++s)if(s===0||s===v||t)w.push(new F.bB(C.t))
else w.push(new F.bB(C.f))},
static:{dL:function(a,b){var z=new F.ia([],b,a,new F.bB(C.q))
z.ey(a,b)
return z}}},
i7:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
dz:function(){var z,y
z=this.b
if(z.length>0)C.a.dK(z,0)
for(;z.length<3;){y=F.ic()
y.a=(this.a.b+2)/2|0
y.b=0
z.push(y)}},
cG:function(a){this.a.a_(0)
this.c=!1
this.d=0
this.e=this.f},
c9:function(a){var z,y,x,w,v
if(!this.cg(0,1)){z=this.b
if(1>=z.length)return H.c(z,1)
if(this.bo(z[1])){this.c=!0
this.hR()}z=this.cy
y=$.$get$dG()
x=this.e
if(x>=5)return H.c(y,x)
if(z>=y[x]){this.cy=0
this.dz()
w=this.a.fG()
z=w.length
if(z>0){y=this.d
x=$.$get$dJ()
v=this.e
if(v>=5)return H.c(x,v)
v=x[v]
H.ai(v)
H.ai(z)
v=y+Math.pow(v,z)
this.d=v
P.S(H.d(v))}if(z===4)++this.cx
z=this.cx
y=$.$get$dK()
x=this.e
if(x>=5)return H.c(y,x)
if(z>y[x])if(x+1<5){this.e=x+1
this.cx=0}this.a.fE(w)
this.Q=a}else this.cy=z+1
return!1}else return!0},
dX:function(a){var z
if(a==null)a=this.d
for(z=this.ch;z.length<3;)z.push(0)
z.push(a)
C.a.cF(z)
if(z.length>3)C.a.dK(z,0)},
hR:function(){return this.dX(null)},
cg:function(a,b){var z,y,x
z=this.b
this.as(C.a.gG(z),!1)
y=C.a.gG(z)
y.a=J.w(y.a,a)
y=C.a.gG(z)
y.b=J.w(y.b,b)
if(this.bo(C.a.gG(z))){y=C.a.gG(z)
x=y.a
if(typeof x!=="number")return x.I()
y.a=x-a
x=C.a.gG(z)
y=x.b
if(typeof y!=="number")return y.I()
x.b=y-b
this.as(C.a.gG(z),!0)
return!1}else{this.as(C.a.gG(z),!0)
return!0}},
hI:function(){var z,y,x,w,v,u
z=this.b
this.as(C.a.gG(z),!1)
for(y=[0,-1,1,-2,2],x=0;x<5;++x){w=y[x]
v=C.a.gG(z)
v.a=J.w(v.a,w)
C.a.gG(z).dP()
if(!this.bo(C.a.gG(z)))break
else{C.a.gG(z).dO()
v=C.a.gG(z)
u=v.a
if(typeof u!=="number")return u.I()
v.a=u-w}}this.as(C.a.gG(z),!0)},
hH:function(){var z,y,x,w,v,u
z=this.b
this.as(C.a.gG(z),!1)
for(y=[0,-1,1,-2,2],x=0;x<5;++x){w=y[x]
v=C.a.gG(z)
v.a=J.w(v.a,w)
C.a.gG(z).dO()
if(!this.bo(C.a.gG(z)))break
else{C.a.gG(z).dP()
v=C.a.gG(z)
u=v.a
if(typeof u!=="number")return u.I()
v.a=u-w}}this.as(C.a.gG(z),!0)},
bo:function(a){var z,y,x,w,v
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.k(w)
v=this.a.Z(J.w(a.a,v.gi(w)),J.w(a.b,v.gj(w))).a
if(!(v===C.f||v===C.q))return!0}return!1},
as:function(a,b){var z,y,x,w,v,u
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.k(w)
u=this.a.Z(J.w(a.a,v.gi(w)),J.w(a.b,v.gj(w)))
if(u.a!==C.q)if(b)u.a=v.gC(w)
else u.a=C.f}}},
a9:{
"^":"a;a",
k:function(a){return C.S.h(0,this.a)}},
aD:{
"^":"a;i:a*,j:b*,c",
dP:function(){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.k(w)
u=v.gi(w)
t=v.gj(w)
if(typeof t!=="number")return H.v(t)
v.si(w,-1*t)
v.sj(w,u)}},
dO:function(){var z,y,x,w,v,u
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.k(w)
u=v.gi(w)
v.si(w,v.gj(w))
if(typeof u!=="number")return H.v(u)
v.sj(w,-1*u)}},
static:{ic:function(){switch($.$get$dM().hv(7)){case 0:var z=[]
z.push(new F.y(0,0,C.j))
z.push(new F.y(-1,0,C.j))
z.push(new F.y(1,0,C.j))
z.push(new F.y(2,0,C.j))
return new F.aD(0,0,z)
case 1:z=[]
z.push(new F.y(0,0,C.k))
z.push(new F.y(1,0,C.k))
z.push(new F.y(0,-1,C.k))
z.push(new F.y(1,-1,C.k))
return new F.aD(0,0,z)
case 2:z=[]
z.push(new F.y(0,0,C.l))
z.push(new F.y(1,0,C.l))
z.push(new F.y(0,-1,C.l))
z.push(new F.y(-1,-1,C.l))
return new F.aD(0,0,z)
case 3:z=[]
z.push(new F.y(0,0,C.m))
z.push(new F.y(-1,0,C.m))
z.push(new F.y(0,-1,C.m))
z.push(new F.y(1,-1,C.m))
return new F.aD(0,0,z)
case 4:z=[]
z.push(new F.y(1,0,C.p))
z.push(new F.y(1,-1,C.p))
z.push(new F.y(0,0,C.p))
z.push(new F.y(-1,0,C.p))
return new F.aD(0,0,z)
case 5:z=[]
z.push(new F.y(-1,0,C.n))
z.push(new F.y(-1,-1,C.n))
z.push(new F.y(0,0,C.n))
z.push(new F.y(1,0,C.n))
return new F.aD(0,0,z)
case 6:z=[]
z.push(new F.y(-1,0,C.o))
z.push(new F.y(0,-1,C.o))
z.push(new F.y(0,0,C.o))
z.push(new F.y(1,0,C.o))
return new F.aD(0,0,z)
case 7:H.bW("#### WARNING")
break}}}},
y:{
"^":"bB;i:b*,j:c*,a"},
bB:{
"^":"a;C:a>"},
ib:{
"^":"a4;e,f,a,b,c,d",
T:function(a,b){var z,y,x,w,v,u
z=new F.t(0,0,7,7)
y=F.a_(null)
y.b=C.h
y.c=1
y.a=$.$get$dV()
x=this.f
b.aB(a,new F.t(0,0,8*(x.b+2),8*(x.c+1)),y)
for(w=0;w<this.f.c+1;++w)for(x=w*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=x
u=u.Z(v,w).a
if(u===C.t)y.a=$.$get$cm()
else if(u===C.f)y.a=$.$get$cl()
else if(u===C.j)y.a=$.$get$co()
else if(u===C.k)y.a=$.$get$bD()
else if(u===C.o)y.a=$.$get$cq()
else if(u===C.l)y.a=$.$get$cp()
else if(u===C.m)y.a=$.$get$cr()
else if(u===C.n)y.a=$.$get$cn()
else if(u===C.p)y.a=$.$get$bC()
else y.a=$.$get$bC()
if(y.b===C.h)b.ca(a,z,y)
else b.cb(a,z,y)}}},
fP:{
"^":"a4;M:e>,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,a,b,c,d",
hQ:function(a){var z,y,x
for(z=this.dx,y=0,x=0;x<4;++x)if(a>=z[x])y=x
return y},
dt:function(a){var z,y
this.z=null
this.r=null
z=this.hQ(a)
y=this.fr
if(z>=4)return H.c(y,z)
this.db=y[z]
y=this.f
y.P(this.dy[z]).U(new F.fQ(this))
y.P("assets/font_a.png").U(new F.fR(this))
y.am("assets/font_a.json").U(new F.fS(this))
return this},
aQ:function(a,b,c,d,e,f,g){if(this.fx&&c==="pointerup"){this.fx=!1
this.e.ah().U(new F.fT(this))}else if(c==="pointerdown")this.fx=!0
return!1},
T:function(a,b){var z=this.r
if(z!=null)b.aj(a,z,this.x,this.y,this.cy)
z=this.z
if(z!=null&&this.cx!=null)this.cx.h4(a,b,z,this.db,20,new F.t(40,230,350,200))}},
fQ:{
"^":"f:0;a",
$1:function(a){var z=this.a
z.r=a
z.x=new F.t(0,0,J.G(a.gS()),J.G(z.r.ga4()))
z.y=new F.t(0,0,400,300)}},
fR:{
"^":"f:0;a",
$1:function(a){var z=this.a
z.z=a
z.Q=new F.t(0,0,0,0)
z.ch=new F.t(0,0,0,0)}},
fS:{
"^":"f:3;a",
$1:function(a){this.a.cx=F.fI(a)}},
fT:{
"^":"f:0;a",
$1:function(a){var z=this.a.e
z.A(z.y)}},
i8:{
"^":"a4;e,f,a,b,c,d",
ei:function(a){var z,y,x,w,v,u,t,s,r
this.f.a_(0)
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=this.f
u=J.k(w)
t=u.gi(w)
if(typeof t!=="number")return H.v(t)
s=u.gj(w)
if(typeof s!=="number")return H.v(s)
r=v.Z(3+t,3+s)
if(r.a!==C.q)r.a=u.gC(w)}},
T:function(a,b){var z,y,x,w,v,u
z=new F.t(0,0,7,7)
y=F.a_(null)
y.b=C.h
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.Z(v,x).a
if(u===C.t)y.a=$.$get$cm()
else if(u===C.f)y.a=$.$get$cl()
else if(u===C.j)y.a=$.$get$co()
else if(u===C.k)y.a=$.$get$bD()
else if(u===C.o)y.a=$.$get$cq()
else if(u===C.l)y.a=$.$get$cp()
else if(u===C.m)y.a=$.$get$cr()
else if(u===C.n)y.a=$.$get$cn()
else if(u===C.p)y.a=$.$get$bC()
else y.a=$.$get$bD()
if(y.b===C.h)b.ca(a,z,y)
else b.cb(a,z,y)}}},
ii:{
"^":"a4;e,M:f>,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,a,b,c,d",
T:function(a,b){var z,y,x
z=this.dx
if(z!=null&&this.db!=null){y=this.fx
y.a=230
y.b=225
x=this.fr
b.aj(a,z,this.db.ak("BT01.png").gau(),y,x)
y=this.fy
y.a=300
y.b=225
b.aj(a,this.dx,this.db.ak("BT02.png").gau(),y,x)}},
ck:function(a,b){var z,y,x,w,v
z=this.r
this.cx.r=z.d
this.cy.r=z.e+1
y=z.b
x=y.length
if(x>1&&!0){w=this.ch
if(1>=x)return H.c(y,1)
w.ei(y[1])}y=z.z
x=$.$get$dF()
w=z.e
if(w>=5)return H.c(x,w)
if(y+x[w]<b){z.z=b
z.c9(b)}y=this.x
x=y.z
w=y.r
x/=w
if(!(x>0.5))v=y.db&&y.cy&&y.ch/w>0.5
else v=!0
if(v){y.db=!1
if(!this.x.cy){y=z.r
x=$.$get$ce()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.r=b
z.cg(1,0)}}else{if(!(x<-0.5))x=y.db&&y.cy&&y.ch/w<-0.5
else x=!0
if(x){y.db=!1
if(y.cy&&y.ch/w<-0.5)P.S("------------hotX up")
if(!this.x.cy){y=z.r
x=$.$get$ce()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.r=b
z.cg(-1,0)}}}y=this.x
x=-y.Q/y.r
if(x<-0.6){if(!y.cy){y=z.x
x=$.$get$dH()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.x=b
z.c9(b)}}else if(x>0.7){if(!y.cy){y=z.Q
x=$.$get$dI()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y)z.c9(b)}y=this.y
if(!y.r)x=y.db&&y.cy
else x=!0
if(x){y.db=!1
if(!y.cy){y=z.y
x=$.$get$cf()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.y=b
z.hI()}}y=this.z
if(!y.r)x=y.db&&y.cy
else x=!0
if(x){y.db=!1
if(!y.cy){y=z.y
x=$.$get$cf()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.y=b
z.hH()}}if(z.c)this.f.ah().U(new F.im(this))
this.x.cy=!1
this.z.cy=!1
this.y.cy=!1},
dI:[function(a){},"$1","gdH",2,0,3],
ez:function(a,b,c,d){var z,y,x,w,v
z=this.gdH()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
v=new F.ag(50,50,!1,!1,"r",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
v.b=[]
this.y=v
z=this.gdH()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
v=new F.ag(50,50,!1,!1,"l",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
v.b=[]
this.z=v
this.y.z=F.m(0,255,255,255)
this.z.z=F.m(0,255,255,255)
z=new E.q(new Float64Array(H.j(16)))
z.w()
z=new F.jg("joystick",70,35,!1,0,0,0,0,0,!1,!1,"none",null,z,!1)
z.b=[]
this.x=z
z=this.e
y=this.r
x=y.a
w=new E.q(new Float64Array(H.j(16)))
w.w()
w=new F.ib(z,x,"none",null,w,!1)
w.b=[]
this.Q=w
x=new E.q(new Float64Array(H.j(16)))
x.w()
x=new F.i8(z,null,"none",null,x,!1)
x.b=[]
x.f=F.dL(5,5)
this.ch=x
x=this.db
w=this.dx
v=new E.q(new Float64Array(H.j(16)))
v.w()
v=new F.be(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cx=v
x=this.db
w=this.dx
v=new E.q(new Float64Array(H.j(16)))
v.w()
v=new F.be(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cy=v
v.x=3
x=this.dy
this.A(x)
x=x.x
w=new F.aE(0,0,0,0,1,"S001.png",!0,0.25,C.e)
w.ar(0)
x.push(w)
w=new F.aE(0,0,0,0,1,"S002.png",!0,0.25,C.e)
w.ar(0)
x.push(w)
w=new F.aE(0,0,0,0,1,"S001.png",!0,0.25,C.e)
w.ar(0)
x.push(w)
w=new F.aE(0,0,0,0,1,"S002.png",!0,0.25,C.e)
w.ar(0)
x.push(w)
w=new F.aE(0,0,0,0,1,"S001.png",!0,0.25,C.e)
w.ar(0)
x.push(w)
w=new F.aE(0,0,0,0,1,"S002.png",!0,0.25,C.e)
w.ar(0)
x.push(w)
this.A(this.Q)
this.A(this.x)
this.A(this.y)
this.A(this.z)
this.A(this.ch)
this.A(this.cx)
this.A(this.cy)
this.Q.c.K(0,100,25,0)
this.x.c.K(0,100,250,0)
this.z.c.K(0,230,225,0)
this.y.c.K(0,300,225,0)
this.ch.c.K(0,225,153,0)
this.cx.c.K(0,225,50,0)
this.cy.c.K(0,225,85,0)
z.P("assets/se_play.png").U(new F.ik(this))
z.b5("assets/se_play.json").U(new F.il(this))
y.f=d
y.e=d
P.S("### game =  "+d)},
static:{ij:function(a,b,c,d){var z,y,x
z=F.a_(null)
y=new E.q(new Float64Array(H.j(16)))
y.w()
y=new F.e3(C.e,null,null,[],z,"none",null,y,!1)
y.b=[]
z=F.a_(null)
x=new E.q(new Float64Array(H.j(16)))
x.w()
x=new F.ii(a,b,c,null,null,null,null,null,null,null,null,null,y,z,new F.t(0,0,50,50),new F.t(0,0,50,50),"none",null,x,!1)
x.b=[]
x.ez(a,b,c,d)
return x}}},
ik:{
"^":"f:23;a",
$1:function(a){var z=this.a
z.dx=a
z.cx.f=a
z.cy.f=a
z.dy.f=a}},
il:{
"^":"f:3;a",
$1:function(a){var z,y
z=this.a
y=new F.cu(a,[])
y.cm(a)
z.db=y
z.cx.e=y
z.cy.e=y
z.dy.r=y}},
im:{
"^":"f:24;a",
$1:function(a){var z=0,y=new P.E(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:o=u
s=o.a
o=s
r=o.f
o=r
o=o
n=r
n=n.z
n=n
m=s
m=m.r
o.A(n.dt(m.d))
x=3
o=P
o.S("--a")
o=s
r=o.f
o=r
o=o.ch
o=o
n=r
n=n.f
z=6
return H.h(o.bF(n.ch),$async$$1,y)
case 6:o=P
o.S("--b")
o=s
o=o.f
o=o.ch
z=7
return H.h(o.aG(0),$async$$1,y)
case 7:x=1
z=5
break
case 3:x=2
p=w
o=H
s=o.F(p)
t=s
o=P
o=o
n=H
o.S("## failed to save score "+n.d(t))
z=5
break
case 2:z=1
break
case 5:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$$1,y,null)}},
io:{
"^":"a4;e,M:f>,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
hw:[function(a){P.S("touch # "+a)
switch(a){case"L01":this.dx=70
this.dy=60
this.ch=0
break
case"L02":this.dx=125
this.dy=60
this.ch=1
break
case"L03":this.dx=175
this.dy=60
this.ch=2
break
case"L04":this.dx=215
this.dy=60
this.ch=3
break
case"L05":this.dx=265
this.dy=60
this.ch=4
break
case"BACK":this.f.ah().U(new F.is(this))
break}},"$1","gaP",2,0,3],
i7:[function(a){P.S("touch # "+a)
this.f.ah().U(new F.it(this))},"$1","ghx",2,0,3],
aQ:function(a,b,c,d,e,f,g){return!1},
T:function(a,b){var z,y,x
z=this.e
if(z!=null&&this.Q!=null){y=this.z
b.aj(a,z,this.Q.ak("BG001.png").gau(),this.y,y)
b.aj(a,this.e,this.Q.ak("CH001.png").gau(),new F.t(this.dx,this.dy,35,35),y)}z=this.cx
y=this.f.f.ch
x=y.length
z.r=x>=3?y[2]:0
z=this.cy
z.r=x>=2?y[1]:0
z=this.db
z.r=x>=1?y[0]:0},
eA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.r
z.P("assets/se_setting.gif").U(new F.iq(this))
z.b5("assets/se_setting.json").U(new F.ir(this))
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
u=new F.ag(45,45,!1,!1,"L01",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
u.b=[]
u.z=F.m(0,255,255,255)
v.K(0,70,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
t=new F.ag(45,45,!1,!1,"L02",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
t.b=[]
t.z=F.m(0,255,255,255)
v.K(0,120,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
s=new F.ag(45,45,!1,!1,"L03",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
s.b=[]
s.z=F.m(0,255,255,255)
v.K(0,175,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
r=new F.ag(45,45,!1,!1,"L04",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
r.b=[]
r.z=F.m(0,255,255,255)
v.K(0,215,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
q=new F.ag(45,45,!1,!1,"L05",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
q.b=[]
q.z=F.m(0,255,255,255)
v.K(0,265,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
p=new F.ag(45,45,!1,!1,"BACK",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
p.b=[]
p.z=F.m(0,255,255,255)
v.K(0,315,50,0)
this.A(u)
this.A(t)
this.A(s)
this.A(r)
this.A(q)
this.A(p)
z=new E.q(new Float64Array(H.j(16)))
z.w()
y=new F.be(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cx=y
z.K(0,90,220,0)
z=new E.q(new Float64Array(H.j(16)))
z.w()
y=new F.be(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cy=y
z.K(0,90,247,0)
z=new E.q(new Float64Array(H.j(16)))
z.w()
y=new F.be(null,null,0,7,"none",null,z,!1)
y.b=[]
this.db=y
z.K(0,90,278,0)
this.A(this.cx)
this.A(this.cy)
this.A(this.db)
this.ch=1
this.hw("L01")
z=this.ghx()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.q(new Float64Array(H.j(16)))
v.w()
o=new F.ag(170,50,!1,!1,"start",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
o.b=[]
v.K(0,230,250,0)
o.z=F.m(0,255,255,255)
this.A(o)},
static:{ip:function(a,b){var z,y
z=F.a_(null)
y=new E.q(new Float64Array(H.j(16)))
y.w()
y=new F.io(null,b,a,null,null,z,null,1,null,null,null,0,0,"none",null,y,!1)
y.b=[]
y.eA(a,b)
return y}}},
iq:{
"^":"f:0;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.t(0,0,J.G(a.gS()),J.G(z.e.ga4()))
z.y=new F.t(0,0,400,300)
z.cx.f=a
z.cy.f=a
z.db.f=a}},
ir:{
"^":"f:3;a",
$1:function(a){var z,y
z=this.a
y=new F.cu(a,[])
y.cm(a)
z.Q=y
z.cx.e=y
z.cy.e=y
z.db.e=y}},
is:{
"^":"f:0;a",
$1:function(a){var z=this.a
z.f.f.cG(0)
z=z.f
z.A(z.x)}},
it:{
"^":"f:0;a",
$1:function(a){var z,y,x,w
z=this.a
P.S("### level =  "+z.ch)
z.f.f.cG(0)
y=z.f
x=y.Q
z=z.ch
w=x.r
w.f=z
w.e=z
z=x.x
z.cy=!1
z.db=!1
z.x=!1
z.y=0
z.z=0
z.Q=0
z.ch=0
z.cx=0
y.A(x)}},
iE:{
"^":"a4;M:e>,f,r,a,b,c,d",
R:function(a){var z=0,y=new P.E(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k
function $async$R(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
o=u
t=o.f
o=P
o=o
n=t
n=n.P("assets/bg_clear01.png")
m=t
m=m.P("assets/bg_clear02.png")
l=t
l=l.P("assets/bg_clear03.png")
k=t
z=6
return H.h(o.c6([n,m,l,k.P("assets/bg_clear04.png")],null,!1),$async$R,y)
case 6:x=1
z=5
break
case 3:x=2
r=w
o=H
o.F(r)
z=5
break
case 2:z=1
break
case 5:x=8
o=u
t=o.f
o=P
o=o
n=t
n=n.P("assets/se_start.gif")
m=t
m=m.am("assets/se_start.json")
l=t
l=l.am("assets/se_play.json")
k=t
z=11
return H.h(o.c6([n,m,l,k.P("assets/se_play.png")],null,!1),$async$R,y)
case 11:x=1
z=10
break
case 8:x=7
q=w
o=H
o.F(q)
z=10
break
case 7:z=1
break
case 10:x=13
o=u
t=o.f
o=P
o=o
n=t
n=n.P("assets/se_setting.gif")
m=t
m=m.am("assets/se_setting.json")
l=t
l=l.P("assets/font_a.png")
k=t
z=16
return H.h(o.c6([n,m,l,k.am("assets/font_a.json")],null,!1),$async$R,y)
case 16:x=1
z=15
break
case 13:x=12
p=w
o=H
o.F(p)
z=15
break
case 12:z=1
break
case 15:o=u
o=o.e
z=17
return H.h(o.ah(),$async$R,y)
case 17:o=u
t=o.e
o=t
o=o
n=t
z=18
return H.h(o.A(n.x),$async$R,y)
case 18:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$R,y,null)},
T:function(a,b){var z,y
z=100+C.H.bC(++this.r/2,10)*5
y=-z/2
b.aB(a,new F.t(y+200,y+150,z,z),F.a_(F.m(170,255,170,170)))}},
be:{
"^":"a4;e,f,r,at:x>,a,b,c,d",
T:function(a,b){var z,y,x,w
if(this.e==null||this.f==null)return
for(z=0;y=this.x,z<y;++z){x=y-1-z
if(x===0)x=1
else x=Math.pow(10,x)
x=J.eX(this.r,x)
if(typeof x!=="number")return x.bC()
y=C.c.bC(x,10)
w=new F.ea(null,C.h,1)
w.a=F.m(255,255,255,255)
b.aj(a,this.f,this.e.ak("NUM00"+y+".png").gau(),new F.t(z*12,0,15,15),w)}}},
aE:{
"^":"a;i:a*,j:b*,c,d,at:e>,C:f>,r,x,y",
ar:function(a){var z,y
z=this.y
this.a=z.b6()*400
this.b=-1*z.b6()*100
this.c=z.b6()-0.5
this.d=z.b6()
y=this.x
if(this.r)this.e=y*(z.b6()*0.75+0.25)
else this.e=y}},
e3:{
"^":"a4;e,f,r,x,y,a,b,c,d",
T:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.f!=null&&this.r!=null)for(z=this.x,y=z.length,x=this.y,w=0;w<z.length;z.length===y||(0,H.L)(z),++w){v=z[w]
u=this.r.ak(v.f).e
t=this.f
s=this.r.ak(v.f).gau()
r=v.a
q=v.b
p=u.a
o=v.e
b.aj(a,t,s,new F.t(r,q,p*o,u.b*o),x)
v.a=J.w(v.a,v.c)
o=J.w(v.b,v.d)
v.b=o
v.d+=0.001
t=v.a
if(typeof t!=="number")return t.a6()
if(!(t<0))if(!(t>400)){if(typeof o!=="number")return o.an()
t=o>300}else t=!0
else t=!0
if(t)v.ar(0)}}},
iM:{
"^":"a4;e,f,M:r>,x,y,z,Q,a,b,c,d",
aQ:function(a,b,c,d,e,f,g){if(this.Q&&c==="pointerup"){this.Q=!1
this.r.ah().U(new F.iQ(this))}else if(c==="pointerdown")this.Q=!0
return!1},
T:function(a,b){var z=this.e
if(z!=null&&this.f!=null){b.aj(a,z,this.f.ak("BG001.png").gau(),this.f.ak("BG001.png").gh6(),this.y)
this.z.T(a,b)}},
eB:function(a,b){var z,y,x
z=this.x
z.P("assets/se_start.gif").U(new F.iO(this))
z.am("assets/se_start.json").U(new F.iP(this))
for(z=this.z.x,y=1;y<=7;++y){x="B00"+y+".png"
x=new F.aE(0,0,0,0,1,x,!1,0.35,C.e)
x.ar(0)
z.push(x)}},
static:{iN:function(a,b){var z,y,x
z=F.a_(null)
y=F.a_(null)
x=new E.q(new Float64Array(H.j(16)))
x.w()
x=new F.e3(C.e,null,null,[],y,"none",null,x,!1)
x.b=[]
y=new E.q(new Float64Array(H.j(16)))
y.w()
y=new F.iM(null,null,b,a,z,x,!1,"none",null,y,!1)
y.b=[]
y.eB(a,b)
return y}}},
iO:{
"^":"f:0;a",
$1:function(a){var z=this.a
z.e=a
z.z.f=a}},
iP:{
"^":"f:0;a",
$1:function(a){var z,y
z=this.a
y=new F.cu(a,[])
y.cm(a)
z.f=y
z.z.r=y}},
iQ:{
"^":"f:0;a",
$1:function(a){var z=this.a.r
z.A(z.y)}}}],["","",,P,{
"^":"",
eL:function(a){var z={}
a.O(0,new P.la(z))
return z},
lc:function(a,b){var z=[]
return new P.lf(b,new P.ld([],z),new P.le(z),new P.lg(z)).$1(a)},
lb:function(a){return a},
dk:function(){var z=$.dj
if(z==null){z=J.bZ(window.navigator.userAgent,"Opera",0)
$.dj=z}return z},
h8:function(){var z,y
z=$.dg
if(z!=null)return z
y=$.dh
if(y==null){y=J.bZ(window.navigator.userAgent,"Firefox",0)
$.dh=y}if(y===!0)z="-moz-"
else{y=$.di
if(y==null){y=P.dk()!==!0&&J.bZ(window.navigator.userAgent,"Trident/",0)
$.di=y}if(y===!0)z="-ms-"
else z=P.dk()===!0?"-o-":"-webkit-"}$.dg=z
return z},
la:{
"^":"f:25;a",
$2:function(a,b){this.a[a]=b}},
ld:{
"^":"f:26;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
le:{
"^":"f:27;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.c(z,a)
return z[a]}},
lg:{
"^":"f:28;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.c(z,a)
z[a]=b}},
lf:{
"^":"f:0;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.h4(a.getTime(),!0)
if(a instanceof RegExp)throw H.b(new P.cB("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.an()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.L)(w),++u){t=w[u]
x.m(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.D(a)
s=w.gl(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.v(s)
v=J.b0(x)
r=0
for(;r<s;++r)v.m(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
eQ:[function(){var z=0,y=new P.E(),x=1,w,v,u,t,s,r,q,p,o,n,m
function $async$eQ(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:o=G
o=o
n=P
n=n.an()
m=P
v=new o.jc(700,500,n,m.an())
o=E
o=o
n=Float64Array
m=H
u=new o.q(new n(m.j(16)))
o=u
o.w()
o=F
t=new o.jf(400,300,1,1,1,0,0,null,"none",null,u,!1)
o=t
o.b=[]
o=t
n=F
o.ch=n.m(255,238,238,255)
o=E
o=o
n=Float64Array
m=H
u=new o.q(new n(m.j(16)))
o=u
o.w()
o=G
s=new o.jw(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
o=s
n=G
o.a=n.jl(400,600)
o=s
o.sM(0,t)
o=s
o.hu()
o=s
o.hP()
o=s
o.x=!0
o=s
z=!o.d?2:3
break
case 2:o=s
o.d=!0
o=s
o.bg()
case 3:o=F
o=o
n=F
u=new o.i7(n.dL(21,11),[],!1,0,1,1,0,0,0,0,0,[0,0,0],0,0)
o=u
o.dz()
o=E
o=o
n=Float64Array
m=H
r=new o.q(new n(m.j(16)))
o=r
o.w()
o=F
r=new o.i9(v,u,null,null,null,null,null,null,"none",null,r,!1)
o=r
o.b=[]
o=r
n=F
o.ch=new n.h3([0,0,0],v)
o=E
o=o
n=Float64Array
m=H
q=new o.q(new n(m.j(16)))
o=q
o.w()
o=F
q=new o.iE(r,v,0,"none",null,q,!1)
o=q
o.b=[]
o=q
o.R(0)
o=r
o.r=q
o=r
n=F
o.x=n.iN(v,r)
o=r
n=F
o.y=n.ip(v,r)
o=F
q=o.a_(null)
o=E
o=o
n=Float64Array
m=H
p=new o.q(new n(m.j(16)))
o=p
o.w()
o=F
p=new o.fP(r,v,null,null,null,null,null,null,null,q,"",[0,5000,2e4,1e5],["assets/bg_clear01.png","assets/bg_clear02.png","assets/bg_clear03.png","assets/bg_clear04.png"],["\u305d\u3057\u3066\u3001\u30df\u30ce\u30fc\u30f3\u306e\u96ea\u304c\u964d\u3063\u305f\u3002","\u30df\u30ce\u30fc\u30f3\u304c\u4ef2\u9593\u306b\u306a\u3063\u305f\u3002","\u95c7\u304c\u8fba\u308a\u3092\u7167\u3089\u3057\u305f\u3002","\u30df\u30fc\u30c6\u30a3\u30a2\u3092\u8a60\u5531\u3057\u305f\u3002"],!1,"none",null,p,!1)
o=p
o.b=[]
o=p
o.dt(0)
o=r
o.z=p
o=r
n=F
o.Q=n.ij(v,r,u,1)
o=r
o=o
n=r
o.A(n.r)
o=r
o.b4()
o=t
o.A(r)
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$eQ,y,null)},"$0","eR",0,0,1]},1],["","",,F,{
"^":"",
by:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.L)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.aY(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fK:{
"^":"a;a",
k:function(a){return C.T.h(0,this.a)}},
fH:{
"^":"a;a,b,c",
e5:function(a){var z=this.a
if(z.a2(a))return z.h(0,a)
else return z.h(0,this.b)},
h5:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o
z=new F.t(0,0,0,0)
y=new F.t(0,0,0,0)
x=f.a
w=f.b
v=J.G(c.gS())
u=J.G(c.ga4())
for(t=new H.fY(d),t=t.gL(t),s=this.c,r=e+5;t.B();){q=this.e5(t.d)
z.c=q.be(v,u).c
z.d=q.be(v,u).d
z.a=q.be(v,u).a
z.b=q.be(v,u).b
y.a=x
y.b=w
p=z.c*e/z.d
y.c=p
y.d=e
p=J.w(x,p)
o=f.c
if(typeof p!=="number")return p.an()
if(p>o){y.a=f.a
y.b=J.w(y.b,r)}b.aj(a,c,z,y,s)
x=J.w(J.w(y.a,y.c),2)
w=y.b}},
h4:function(a,b,c,d,e,f){return this.h5(a,b,c,d,e,f,C.A)},
ev:function(a){var z,y,x,w,v,u
z=P.cK(a,null)
for(y=z.gal(),y=y.gL(y),x=this.a;y.B();){w=y.gF()
v=z.h(0,w)
u=J.D(v)
x.m(0,H.iu(w,null,null),new F.fJ(J.G(u.h(v,"u")),J.G(u.h(v,"v")),J.G(u.h(v,"w")),J.G(u.h(v,"h")),J.G(u.h(v,"vx")),J.G(u.h(v,"vy")),J.G(u.h(v,"vw")),J.G(u.h(v,"vh")),new F.cy(0,0),new F.t(0,0,0,0)))}},
static:{fI:function(a){var z=new F.fH(P.an(),32,F.a_(null))
z.ev(a)
return z}}},
fJ:{
"^":"a;a,b,S:c<,a4:d<,e,f,r,x,y,z",
be:function(a,b){var z,y
z=this.z
z.a=a*this.a
y=this.d*b
z.b=b-b*this.b-y
z.c=this.c*a
z.d=y
return z}},
ag:{
"^":"a4;S:e<,a4:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
dh:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
aQ:function(a,b,c,d,e,f,g){switch(c){case"pointerdown":if(this.dh(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.db=!0}break
case"pointermove":if(this.dh(d,e))this.x=!0
else{this.r=!1
this.x=!1
this.cy=!0}break
case"pointerup":if(this.r&&!0){this.cy=!0
P.ho(new F.j8(this),null)}this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
T:function(a,b){var z=F.a_(null)
if(this.r){z.a=this.Q
b.aB(a,new F.t(0,0,this.e,this.f),z)}else if(this.x){z.a=this.ch
b.aB(a,new F.t(0,0,this.e,this.f),z)}else{z.a=this.z
b.aB(a,new F.t(0,0,this.e,this.f),z)}},
dI:function(a){return this.cx.$1(a)}},
j8:{
"^":"f:1;a",
$0:function(){var z=this.a
z.dI(z.y)}},
j9:{
"^":"a;"},
a4:{
"^":"a;",
A:function(a){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r
function $async$A(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.e(new s.z(0,r.n,null),[null])
t=u
t.aH(null)
z=2
return H.h(u,$async$A,y)
case 2:t=v
t=t.b
t.push(a)
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$A,y,null)},
bt:function(a){var z=0,y=new P.E(),x=1,w,v=this,u,t,s
function $async$bt(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.z(0,s.n,null)
u.$builtinTypeInfo=[null]
t=u
t.aH(null)
z=2
return H.h(u,$async$bt,y)
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
t.ad(u,a)
t=a
t.dV()
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$bt,y,null)},
ah:function(){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r,q,p
function $async$ah(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.e(new q.z(0,p.n,null),[null])
r=u
r.aH(null)
z=2
return H.h(u,$async$ah,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.bt(u[s])
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
case 5:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$ah,y,null)},
ds:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].ds(a)},
ck:function(a,b){},
dT:function(a,b){var z,y,x
this.c5()
this.ck(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].dT(a,b)},
T:function(a,b){},
cl:["er",function(a,b){var z,y,x,w,v,u
this.c5()
this.T(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.L)(z),++w){v=z[w]
u=v.c
x.push(C.a.gaN(x).u(0,u))
b.bv()
v.cl(a,b)
if(0>=x.length)return H.c(x,0)
x.pop()
b.bv()}}],
dU:["af",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.c5()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.c(y,w)
v=y[w]
a.ac(v.c)
u=v.dU(a,b,c,d,e)
a.ab()
if(u===!0)return u}t=a.e6().c4(0)
t.hm()
y=new E.x(new Float64Array(H.j(3)))
y.D(d,e,0)
s=t.u(0,y)
return this.aQ(a,b,c,s.gi(s),s.gj(s),d,e)}],
aQ:function(a,b,c,d,e,f,g){return!1},
dV:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].dV()
this.d=!1},
c5:function(){if(!this.d)this.d=!0}},
jb:{
"^":"a;",
P:function(a){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q
function $async$P(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.a2(a)?3:4
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
return H.h(q.br(a),$async$P,y)
case 5:s.m(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$P,y,null)},
am:function(a){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q
function $async$am(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.b
s=t
z=s.a2(a)?3:4
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
return H.h(q.b5(a),$async$am,y)
case 5:s.m(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$am,y,null)}},
ja:{
"^":"a;"},
t:{
"^":"a;i:a*,j:b*,S:c<,a4:d<",
v:function(a,b){if(b==null)return!1
return b instanceof F.t&&J.K(b.a,this.a)&&J.K(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gH:function(a){return F.by([J.O(this.a),J.O(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
k:function(a){return"x:"+H.d(this.a)+", y:"+H.d(this.b)+", w:"+H.d(this.c)+", h:"+H.d(this.d)}},
eb:{
"^":"a;i:a*,j:b*",
v:function(a,b){if(b==null)return!1
return b instanceof F.eb&&J.K(b.a,this.a)&&J.K(b.b,this.b)},
gH:function(a){return F.by([J.O(this.a),J.O(this.b)])},
k:function(a){return"x:"+H.d(this.a)+", y:"+H.d(this.b)}},
cy:{
"^":"a;S:a<,a4:b<",
v:function(a,b){if(b==null)return!1
return b instanceof F.cy&&b.a===this.a&&b.b===this.b},
gH:function(a){return F.by([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
k:function(a){return"w:"+H.d(this.a)+", h:"+H.d(this.b)}},
jh:{
"^":"a;a",
k:function(a){return C.U.h(0,this.a)}},
ea:{
"^":"a;a,b,c",
eE:function(a){if(this.a==null)this.a=F.m(255,255,255,255)},
static:{a_:function(a){var z=new F.ea(a,C.h,1)
z.eE(a)
return z}}},
e9:{
"^":"a;a",
v:function(a,b){if(b==null)return!1
return b instanceof F.e9&&b.a===this.a},
gH:function(a){return F.by([this.a&0x1FFFFFFF])},
k:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
eD:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{m:function(a,b,c,d){var z=new F.e9(0)
z.eD(a,b,c,d)
return z}}},
cx:{
"^":"a;"},
jf:{
"^":"a4;S:e<,a4:f<,r,x,y,z,Q,ch,a,b,c,d",
dU:function(a,b,c,d,e){a.ac(this.c)
this.af(a,b,c,d,e)
a.ab()},
ck:function(a,b){var z,y,x,w
z=a.gS()
y=a.ghA(a)
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
y=new E.q(new Float64Array(H.j(16)))
y.w()
this.c=y
y.K(0,this.z,this.Q,0)
y=this.c
x=this.y
y.cD(0,x,x,1)},
cl:function(a,b){var z,y,x
z=new F.t(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.gaN(x).u(0,y))
b.bv()
y=b.b
y.push(z)
b.bn(a,z)
this.er(a,b)
if(0>=y.length)return H.c(y,0)
y.pop()
if(y.length>0)b.bn(a,C.a.gaN(y))
else{y=a.a
b.bn(a,new F.t(0,0,y.c,y.d))}if(0>=x.length)return H.c(x,0)
x.pop()
b.bv()},
T:function(a,b){var z,y
z=new F.t(0,0,this.e,this.f)
y=F.a_(null)
y.a=this.ch
b.bn(a,z)
b.aB(a,z,y)}},
jg:{
"^":"a4;e,at:f>,r,x,y,z,Q,ch,cx,cy,db,a,b,c,d",
T:function(a,b){var z,y,x,w,v,u,t
z=F.a_(null)
if(this.x)z.a=F.m(170,170,170,255)
else z.a=F.m(170,255,170,170)
y=this.f
x=-y/2
w=this.z
v=this.r
u=v/2
t=this.Q
b.dm(a,new F.t(x,x,y,y),z)
b.dm(a,new F.t(w-u,t-u,v,v),z)},
aQ:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(!this.x){if(this.dl(d,e,0,0)<this.f){this.db=!0
this.y=b
this.x=!0
this.z=d
this.Q=e}}else if(b===this.y)if(c==="pointerup"||c==="pointercancel"){this.cy=!0
this.ch=this.z
this.cx=this.Q
this.x=!1
this.z=0
this.Q=0}else{this.z=d
this.Q=e
z=this.dl(0,0,d,e)
y=this.f
x=y/2
if(z>x){w=this.z
v=w>0?w:-1*w
u=this.Q
t=v+(u>0?u:-1*u)
this.z=x*w/t
this.Q=y/2*u/t}}return!1},
dl:function(a,b,c,d){var z,y
z=a-c
H.ai(z)
H.ai(2)
z=Math.pow(z,2)
y=b-d
H.ai(y)
H.ai(2)
return Math.sqrt(H.ai(z+Math.pow(y,2)))}},
cu:{
"^":"a;a,b",
ak:function(a){var z,y,x,w
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
if(J.K(w.a,a))return w}return},
cm:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.ax(H.lG(J.bm(P.cK(a,null),"frames"),"$isl",[P.aR],"$asl")),y=this.b;z.B();){x=z.gF()
w=new F.iL(null,null,null,null,null,null,null)
v=J.D(x)
w.a=v.h(x,"filename")
w.r=w.dJ(v.h(x,"frame"))
w.b=v.h(x,"rotated")
w.c=v.h(x,"trimmed")
w.d=w.dJ(v.h(x,"spriteSourceSize"))
u=v.h(x,"sourceSize")
t=J.D(u)
s=t.h(u,"w")
r=t.h(u,"h")
w.e=new F.cy(J.G(s),J.G(r))
v=v.h(x,"pivot")
u=J.D(v)
q=u.h(v,"x")
p=u.h(v,"y")
w.f=new F.eb(J.G(q),J.G(p))
y.push(w)}}},
iL:{
"^":"a;a,b,c,d,e,f,r",
gh6:function(){var z,y,x,w
z=this.b
y=this.d
if(z===!0){z=y.b
if(typeof z!=="number")return H.v(z)
x=y.d
w=y.a
if(typeof w!=="number")return H.v(w)
return new F.t(-1*z-x,w,x,y.c)}else return new F.t(y.a,y.b,y.c,y.d)},
gau:function(){var z,y
z=this.b
y=this.r
if(z===!0)return new F.t(y.a,y.b,y.d,y.c)
else return new F.t(y.a,y.b,y.c,y.d)},
dJ:function(a){var z,y,x,w,v
z=J.D(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.t(J.G(y),J.G(x),J.G(w),J.G(v))}},
ji:{
"^":"a;",
gM:function(a){return this.c$},
sM:function(a,b){this.c$=b},
hq:function(a){if(!this.e$){this.c$.ds(this)
this.e$=!0}this.c$.dT(this,a)
this.hs()},
ac:function(a){var z=this.f$
z.push(C.a.gaN(z).u(0,a))},
ab:function(){var z=this.f$
if(0>=z.length)return H.c(z,0)
z.pop()},
e6:function(){return C.a.gaN(this.f$)}}}],["","",,G,{
"^":"",
cz:function(a){var z=0,y=new P.E(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$cz(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.e(new p.ac(o.e(new n.z(0,m.n,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.fA(t,a)
q=J
s=q.k(t)
q=s
r=q.gcj(t)
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
m=m.I(new l.ju(u,t))
l=r
p=new p.H(0,o,n,m,l.c)
o=H
q=q.e(p,[o.A(r,0)])
q.E()
q=s
s=q.gci(t)
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
m=m.I(new l.jv(a,u))
l=s
p=new p.H(0,o,n,m,l.c)
o=H
q=q.e(p,[o.A(s,0)])
q.E()
q=u
x=q.a
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$cz,y,null)},
ec:function(a,b,c){var z,y
z=J.fb(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.d(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.b(y+"\n")}return z},
jt:{
"^":"cx;a,b",
gS:function(){return J.ft(this.a)},
ga4:function(){return J.fh(this.a)},
e8:function(a){var z
if(this.b==null){z=J.k(a).fQ(a)
this.b=z
a.bindTexture(3553,z)
C.X.hL(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
jk:{
"^":"a;a,b,c,q:d>",
eF:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.aR(b)
y=C.c.aR(a)
x=document.createElement("canvas",null)
J.fB(x,z)
J.fz(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.fv(this.b,!0)},
static:{jl:function(a,b){var z=new G.jk(null,null,null,null)
z.eF(a,b)
return z}}},
jc:{
"^":"jb;t:c>,q:d>,a,b",
br:function(a){var z=0,y=new P.E(),x,w=2,v,u,t
function $async$br(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.h(t.cz(a),$async$br,y)
case 3:x=new u.jt(c,null)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$br,y,null)},
b5:function(a){var z=0,y=new P.E(),x,w=2,v,u,t,s,r,q,p,o,n,m
function $async$b5(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=H
p=p
o=P
o=o
n=$
u=r.e(new q.ac(p.e(new o.z(0,n.n,null),[null])),[null])
t=new XMLHttpRequest()
r=C
r=r.G
r.hz(t,"GET",a)
r=t
r.responseType="arraybuffer"
r=H
r=r
q=W
s=r.e(new q.aF(t,"load",!1),[null])
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
n=n.I(new m.jd(u,t))
m=s
q=new q.H(0,p,o,n,m.c)
p=H
r=r.e(q,[p.A(s,0)])
r.E()
r=H
r=r
q=W
s=r.e(new q.aF(t,"error",!1),[null])
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
n=n.I(new m.je(u))
m=s
q=new q.H(0,p,o,n,m.c)
p=H
r=r.e(q,[p.A(s,0)])
r.E()
r=t
r.send()
r=u
x=r.a
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$b5,y,null)},
bq:function(a){var z=0,y=new P.E(),x,w=2,v,u
function $async$bq(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
x=new u.jm(a,null)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$bq,y,null)}},
jd:{
"^":"f:29;a,b",
$1:function(a){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r,q
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:u=v
u=u.a
u=u
t=C
t=t.v
t=t
s=J
s=s
r=W
r=r
q=v
q=q.b
u.a1(0,t.dk(s.eZ(r.kX(q.response)),!0))
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$$1,y,null)}},
je:{
"^":"f:10;a",
$1:function(a){this.a.ai(a)}},
jm:{
"^":"ja;a,b",
a5:function(){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q,p,o
function $async$a5(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:r=u
z=3
return H.h(r.hF(0),$async$a5,y)
case 3:r=u
t=r.b
if(t!=null){x=t
z=1
break}else ;t=window
r=H
r=r
q=J
q=q
p=J
p=p
o=C
o=o.a_
z=5
return H.h(o.fg(t,1,1024),$async$a5,y)
case 5:p=p.fq(b)
o=u
z=4
return H.h(q.f9(p,o.a),$async$a5,y)
case 4:s=r.lr(b,"$isc5")
r=u
r.b=s
x=s
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$a5,y,null)},
hF:function(a){var z,y
z=H.e(new P.ac(H.e(new P.z(0,$.n,null),[null])),[null])
y=window.navigator.webkitPersistentStorage;(y&&C.E).hG(y,5242880,new G.jp(z),new G.jq(z))
return z.a},
aV:function(a,b,c){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i
function $async$aV(d,e){if(d===1){v=e
z=w}while(true)switch(z){case 0:t={}
n=t
n.a=b
n=J
n=n.p(b)
z=!n.$isjH?3:4
break
case 3:n=t
m=Uint8Array
l=H
n.a=new m(l.aX(b))
case 4:n=H
n=n
m=P
m=m
l=H
l=l
k=P
k=k
j=$
s=n.e(new m.ac(l.e(new k.z(0,j.n,null),[null])),[null])
n=u
z=5
return H.h(n.a5(),$async$aV,y)
case 5:n=u
r=n.b
n=r
if(n){z=7
break}else e=n
z=8
break
case 7:n=C
e=n.r
case 8:n=e
z=6
return H.h(n.dj(r),$async$aV,y)
case 6:q=e
n=J
r=n.fp(q)
n=H
n=n
m=W
m=m
l=r
l=l.a
k=r
k=k.b
j=W
j=j
i=G
j=j.I(new i.jr(t,s,q))
i=r
m=new m.H(0,l,k,j,i.c)
l=H
n=n.e(m,[l.A(r,0)])
n.E()
n=H
n=n
m=W
r=n.e(new m.aF(q,"error",!1),[null])
n=H
n=n
m=W
m=m
l=r
l=l.a
k=r
k=k.b
j=W
j=j
i=G
j=j.I(new i.js(s,q))
i=r
m=new m.H(0,l,k,j,i.c)
l=H
n=n.e(m,[l.A(r,0)])
n.E()
n=u
z=9
return H.h(n.aF(),$async$aV,y)
case 9:p=e
n=J
z=n.aL(p,c)?10:12
break
case 10:z=typeof p!=="number"?13:14
break
case 13:n=H
x=n.v(p)
z=1
break
case 14:n=Uint8Array
m=H
m=m
l=P
o=new n(m.aX(l.i3(c-p,0,null)))
n=q
n.seek(p)
n=q
n=n
m=W
m=m
l=o
k=t
m=m.d9([l,k.a],null,null)
m=m
l=t
n.write(m.slice(0,l.a.length+o.length))
z=11
break
case 12:n=q
n.seek(c)
n=q
n=n
m=W
m=m
l=t
m=m.d9([l.a],null,null)
m=m
l=t
n.write(m.slice(0,l.a.length))
case 11:n=s
x=n.a
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$aV,y,null)},
b8:function(a,b){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k
function $async$b8(c,d){if(c===1){v=d
z=w}while(true)switch(z){case 0:p=H
p=p
o=P
o=o
n=H
n=n
m=P
m=m
l=$
t=p.e(new o.ac(n.e(new m.z(0,l.n,null),[null])),[null])
p=u
z=3
return H.h(p.a5(),$async$b8,y)
case 3:s=new FileReader()
p=u
r=p.b
p=r
if(p){z=5
break}else d=p
z=6
break
case 5:p=C
d=p.r
case 6:p=d
z=4
return H.h(p.dn(r),$async$b8,y)
case 4:q=d
p=H
p=p
o=W
r=p.e(new o.aF(s,"load",!1),[null])
p=H
p=p
o=W
o=o
n=r
n=n.a
m=r
m=m.b
l=W
l=l
k=G
l=l.I(new k.jn(t,s))
k=r
o=new o.H(0,n,m,l,k.c)
n=H
p=p.e(o,[n.A(r,0)])
p.E()
p=H
p=p
o=W
r=p.e(new o.aF(s,"error",!1),[null])
p=H
p=p
o=W
o=o
n=r
n=n.a
m=r
m=m.b
l=W
l=l
k=G
l=l.I(new k.jo(t))
k=r
o=new o.H(0,n,m,l,k.c)
n=H
p=p.e(o,[n.A(r,0)])
p.E()
z=typeof b!=="number"?7:8
break
case 7:p=H
x=p.v(b)
z=1
break
case 8:p=s
p=p
o=J
p.readAsArrayBuffer(o.fC(q,a,a+b))
p=t
x=p.a
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$b8,y,null)},
aF:function(){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r
function $async$aF(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:s=u
z=3
return H.h(s.a5(),$async$aF,y)
case 3:s=u
t=s.b
s=J
s=s
r=t
if(r){z=5
break}else b=r
z=6
break
case 5:r=C
b=r.r
case 6:r=b
z=4
return H.h(r.dn(t),$async$aF,y)
case 4:x=s.fr(b)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$aF,y,null)},
aU:function(a,b){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r
function $async$aU(c,d){if(c===1){v=d
z=w}while(true)switch(z){case 0:s=u
z=3
return H.h(s.a5(),$async$aU,y)
case 3:s=u
t=s.b
s=J
s=s
r=t
if(r){z=5
break}else d=r
z=6
break
case 5:r=C
d=r.r
case 6:r=d
z=4
return H.h(r.dj(t),$async$aU,y)
case 4:s.d6(d,b)
x=b
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$aU,y,null)}},
jp:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
jq:{
"^":"f:0;a",
$1:function(a){this.a.ai(a)}},
jr:{
"^":"f:10;a,b,c",
$1:function(a){this.b.a1(0,this.a.a.length)
this.c.abort()}},
js:{
"^":"f:0;a,b",
$1:function(a){this.a.ai(P.an())
this.b.abort()}},
jn:{
"^":"f:0;a,b",
$1:function(a){this.a.a1(0,P.bb(C.F.gcq(this.b),!0,null))}},
jo:{
"^":"f:0;a",
$1:function(a){this.a.ai(a)}},
jj:{
"^":"j9;c,d,e,f,r,x,y,z,Q,ch,cx,a,b",
a5:function(){var z,y,x,w,v,u
P.S("#[A]# "+H.d(J.d2(this.c,35660)))
P.S("#[B]# "+H.d(J.d2(this.c,33901)))
z=C.a.du(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.du(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.c
w=G.ec(x,35633,z)
v=G.ec(x,35632,y)
u=J.fa(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.e=u},
a_:function(a){this.f=1
this.Q=-0.5
J.d0(this.c,2960)
J.fc(this.c,515)
J.f3(this.c,0,0,0,1)
J.f4(this.c,1)
J.f5(this.c,0)
J.d0(this.c,3042)
switch(-1){case-1:J.f_(this.c,32774)
J.f0(this.c,770,771,770,32772)
break}J.f2(this.c,17664)
C.a.sl(this.r,0)
C.a.sl(this.x,0)
C.a.sl(this.y,0)
this.z=null},
bp:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
if(z.length!==0){y=this.x
F.m(170,255,170,170)
J.d7(this.c,this.e)
x=J.bo(this.c,this.e,"a_tex")
w=J.c_(this.c)
J.bY(this.c,34962,w)
v=this.y
J.f1(this.c,34962,new Float32Array(H.aX(v)),35044)
J.bn(this.c,x)
J.bq(this.c,x,2,5126,!1,0,0)
u=this.z
if(u!=null){t=u.e8(this.c)
J.cY(this.c,3553,t)
J.bp(this.c,3553,10242,33071)
J.bp(this.c,3553,10243,33071)
J.bp(this.c,3553,10241,9728)
J.bp(this.c,3553,10240,9728)}u=this.c
s=J.c_(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.aX(z)),35044)
u.bindBuffer(34962,null)
J.bY(this.c,34962,s)
u=this.c
s=J.c_(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.aX(y)),35044)
u.bindBuffer(34963,null)
J.bY(this.c,34963,s)
u=this.c
u.uniformMatrix4fv(J.fw(u,this.e,"u_mat"),!1,new Float32Array(H.aX(this.ch.a)))
r=J.bo(this.c,this.e,"color")
q=J.bo(this.c,this.e,"vp")
p=J.bo(this.c,this.e,"useTex")
J.bq(this.c,q,3,5126,!1,32,0)
J.bq(this.c,r,4,5126,!1,32,12)
J.bq(this.c,p,1,5126,!1,32,28)
J.bn(this.c,q)
J.bn(this.c,r)
J.bn(this.c,p)
J.fe(this.c,4,y.length,5123,0)
if(x!==0){J.fd(this.c,x)
J.cY(this.c,3553,null)}J.d7(this.c,null)
C.a.sl(z,0)
C.a.sl(y,0)
C.a.sl(v,0)
this.z=null}},
dm:function(a,b,c){if(c.b===C.h)this.h2(a,b,c)
else this.h3(a,b,c)},
h2:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=J.w(b.a,b.c/2)
y=J.w(b.b,b.d/2)
x=b.c/2
w=b.d/2
v=this.aZ()
u=new E.x(new Float64Array(H.j(3)))
u.D(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=J.aj(y),o=this.r,n=this.y,m=this.x,l=J.aj(z),k=0;k<25;){j=o.length/8|0
u.si(0,z)
u.sj(0,y)
u.sae(0,this.Q)
u=v.u(0,u)
C.a.J(o,[u.gi(u),u.gj(u),this.Q])
C.a.J(o,[s,r,q,p])
C.a.J(o,[-1])
C.a.J(n,[0,0])
i=6.283185307179586*(k/25)
u.si(0,l.n(z,Math.cos(i)*x))
u.sj(0,t.n(y,Math.sin(i)*w))
u.sae(0,this.Q)
u=v.u(0,u)
C.a.J(o,[u.gi(u),u.gj(u),this.Q])
C.a.J(o,[s,r,q,p])
C.a.J(o,[-1])
C.a.J(n,[0,0]);++k
i=6.283185307179586*(k/25)
u.si(0,l.n(z,Math.cos(i)*x))
u.sj(0,t.n(y,Math.sin(i)*w))
u.sae(0,this.Q)
u=v.u(0,u)
C.a.J(o,[u.gi(u),u.gj(u),this.Q])
C.a.J(o,[s,r,q,p])
C.a.J(o,[-1])
C.a.J(n,[0,0])
C.a.J(m,[j,j+1,j+2])
this.Q+=0.0001}},
h3:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=J.w(b.a,b.c/2)
y=J.w(b.b,b.d/2)
x=b.c
w=c.c
v=(x+w)/2
u=b.d
t=(u+w)/2
s=x/2
r=u/2
q=this.aZ()
p=new E.x(new Float64Array(H.j(3)))
p.D(0,0,0)
o=new E.x(new Float64Array(H.j(3)))
o.D(0,0,0)
n=new E.x(new Float64Array(H.j(3)))
n.D(0,0,0)
m=new E.x(new Float64Array(H.j(3)))
m.D(0,0,0)
u=c.a.a
l=(u>>>16&255)/255
k=(u>>>8&255)/255
j=(u>>>0&255)/255
i=(u>>>24&255)/255
for(x=J.aj(y),w=J.aj(z),h=0;h<25;){u=6.283185307179586*(h/25)
p.si(0,w.n(z,Math.cos(u)*s))
p.sj(0,x.n(y,Math.sin(u)*r))
p.sae(0,this.Q)
p=q.u(0,p)
o.si(0,w.n(z,Math.cos(u)*v))
o.sj(0,x.n(y,Math.sin(u)*t))
o.sae(0,this.Q)
o=q.u(0,o);++h
u=6.283185307179586*(h/25)
n.si(0,w.n(z,Math.cos(u)*v))
n.sj(0,x.n(y,Math.sin(u)*t))
n.sae(0,this.Q)
n=q.u(0,n)
m.si(0,w.n(z,Math.cos(u)*s))
m.sj(0,x.n(y,Math.sin(u)*r))
m.sae(0,this.Q)
m=q.u(0,m)
this.aJ(a,p,o,m,n,l,k,j,i)
this.Q+=0.0001}},
aB:function(a,b,c){if(c.b===C.h)this.ca(a,b,c)
else this.cb(a,b,c)},
ca:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=this.aZ()
y=b.a
x=b.b
w=J.w(y,b.c)
v=J.w(b.b,b.d)
u=new E.x(new Float64Array(H.j(3)))
u.D(y,x,0)
t=z.u(0,u)
u=new E.x(new Float64Array(H.j(3)))
u.D(y,v,0)
s=z.u(0,u)
u=new E.x(new Float64Array(H.j(3)))
u.D(w,x,0)
r=z.u(0,u)
u=new E.x(new Float64Array(H.j(3)))
u.D(w,v,0)
q=z.u(0,u)
u=c.a.a
this.aJ(a,t,s,r,q,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)},
aJ:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.r
y=z.length/8|0
C.a.J(z,[b.gi(b),b.gj(b),this.Q,f,g,h,i,-1,c.gi(c),c.gj(c),this.Q,f,g,h,i,-1,d.gi(d),d.gj(d),this.Q,f,g,h,i,-1,e.gi(e),e.gj(e),this.Q,f,g,h,i,-1])
C.a.J(this.y,[0,0,0,0,0,0,0,0])
this.Q+=0.0001
z=y+1
x=y+2
C.a.J(this.x,[y,z,x,z,y+3,x])},
cb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.aZ()
y=b.a
x=b.b
w=J.w(y,b.c)
v=J.w(b.b,b.d)
u=new E.x(new Float64Array(H.j(3)))
u.D(y,x,0)
t=z.u(0,u)
u=c.c
if(typeof y!=="number")return y.I()
if(typeof x!=="number")return x.I()
s=new E.x(new Float64Array(H.j(3)))
s.D(y-u,x-u,0)
r=z.u(0,s)
s=new E.x(new Float64Array(H.j(3)))
s.D(y,v,0)
q=z.u(0,s)
s=c.c
u=J.aj(v)
p=u.n(v,s)
o=new E.x(new Float64Array(H.j(3)))
o.D(y-s,p,0)
n=z.u(0,o)
o=new E.x(new Float64Array(H.j(3)))
o.D(w,x,0)
m=z.u(0,o)
o=J.aj(w)
p=o.n(w,c.c)
s=c.c
l=new E.x(new Float64Array(H.j(3)))
l.D(p,x-s,0)
k=z.u(0,l)
l=new E.x(new Float64Array(H.j(3)))
l.D(w,v,0)
j=z.u(0,l)
o=o.n(w,c.c)
u=u.n(v,c.c)
l=new E.x(new Float64Array(H.j(3)))
l.D(o,u,0)
i=z.u(0,l)
l=c.a.a
h=(l>>>16&255)/255
g=(l>>>8&255)/255
f=(l>>>0&255)/255
e=(l>>>24&255)/255
this.aJ(a,r,n,t,q,h,g,f,e)
this.aJ(a,n,i,q,j,h,g,f,e)
this.aJ(a,i,k,j,m,h,g,f,e)
this.aJ(a,k,r,m,t,h,g,f,e)},
bn:function(a,b){var z
this.bp(0)
J.cZ(this.c,!1,!1,!1,!1)
J.d_(this.c,!1)
J.d4(this.c,7680,7681,7681)
J.d3(this.c,519,this.f,255)
z=F.a_(null)
z.a=F.m(255,255,255,255)
this.aB(null,b,z)
this.bp(0)
J.cZ(this.c,!0,!0,!0,!0)
J.d_(this.c,!0)
J.d4(this.c,7680,7680,7680)
J.d3(this.c,515,this.f,255);++this.f},
aj:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.z
if(z!=null&&!J.K(z,b))this.bp(0)
this.z=b
z=c.a
y=b.gS()
if(typeof z!=="number")return z.bx()
if(typeof y!=="number")return H.v(y)
x=z/y
y=c.b
z=this.z.ga4()
if(typeof y!=="number")return y.bx()
if(typeof z!=="number")return H.v(z)
w=y/z
z=J.w(c.a,c.c)
y=this.z.gS()
if(typeof z!=="number")return z.bx()
if(typeof y!=="number")return H.v(y)
v=z/y
y=J.w(c.b,c.d)
z=this.z.ga4()
if(typeof y!=="number")return y.bx()
if(typeof z!=="number")return H.v(z)
u=y/z
C.a.J(this.y,[x,w,x,u,v,w,v,u])
t=this.aZ()
s=d.a
r=d.b
q=J.w(s,d.c)
p=J.w(d.b,d.d)
z=new E.x(new Float64Array(H.j(3)))
z.D(s,r,0)
o=t.u(0,z)
z=new E.x(new Float64Array(H.j(3)))
z.D(s,p,0)
n=t.u(0,z)
z=new E.x(new Float64Array(H.j(3)))
z.D(q,r,0)
m=t.u(0,z)
z=new E.x(new Float64Array(H.j(3)))
z.D(q,p,0)
l=t.u(0,z)
z=this.r
k=z.length/8|0
y=e.a.a
j=(y>>>16&255)/255
i=(y>>>8&255)/255
h=(y>>>0&255)/255
g=(y>>>24&255)/255
C.a.J(z,[o.gi(o),o.gj(o),this.Q,j,i,h,g,1,n.gi(n),n.gj(n),this.Q,j,i,h,g,1,m.gi(m),m.gj(m),this.Q,j,i,h,g,1,l.gi(l),l.gj(l),this.Q,j,i,h,g,1])
this.Q+=0.0001
z=k+1
y=k+2
C.a.J(this.x,[k,z,y,z,k+3,y])},
bv:function(){},
aZ:function(){var z,y
this.cx.w()
z=this.cx.K(0,-1,1,0)
this.cx=z
y=this.d
y=z.cD(0,2/y.c,-2/y.d,1)
this.cx=y
y=y.u(0,C.a.gaN(this.a))
this.cx=y
return y}},
jw:{
"^":"ie;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gi:function(a){return 0},
gj:function(a){return 0},
gS:function(){return this.a.c},
ga4:function(){return this.a.d},
ghA:function(a){return 0},
hs:function(){this.r=!0},
bg:function(){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h
function $async$bg(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:j=H
j=j
i=P
u=j.dY(new i.c2(Date.now(),!1))
j=v
t=j.a
j=E
j=j
i=Float64Array
h=H
s=new j.q(new i(h.j(16)))
j=s
j.w()
j=E
j=j
i=Float64Array
h=H
r=new j.q(new i(h.j(16)))
j=r
j.w()
j=E
j=j
i=Float64Array
h=H
q=new j.q(new i(h.j(16)))
j=q
j.w()
j=G
p=new j.jj(null,null,null,1,[],[],[],null,0,s,r,[q],[])
j=p
i=t
j.c=i.a
j=p
j.d=t
j=p
j.a5()
j=p
j.a_(0)
o=0,n=0
case 2:j=v
if(!j.d){z=4
break}j=P
j=j
i=P
z=5
return H.h(j.hp(new i.a8(15e3),null,null),$async$bg,y)
case 5:m=Date.now()
j=v
j.b=m
l=m-u
j=v
j=j
i=C
i=i.c
j.hq(i.aR(u+l))
o+=l
if(l<0);else ;++n
j=v
j.r=!0
z=o>40?6:7
break
case 6:j=p
j.a_(0)
j=v
j=j.gM(v)
j.cl(v,p)
j=p
j.bp(0)
j=v
j.r=!1
case 7:z=n>40?8:9
break
case 8:j=C
j=j.c
k="###fps  "+j.bf(o,n)
j=H
j.bW(k)
o=0
n=0
case 9:case 3:u=m
z=2
break
case 4:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$bg,y,null)},
hP:function(){var z,y,x,w
z=P.an()
y=new G.jF(this,z)
x=new G.jE(this,z)
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchcancel",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(x),w.c),[H.A(w,0)]).E()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchend",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(x),w.c),[H.A(w,0)]).E()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchenter",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).E()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchleave",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).E()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchmove",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).E()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchstart",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).E()},
hu:function(){var z,y
z={}
z.a=!1
y=J.fi(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jx(z,this)),y.c),[H.A(y,0)]).E()
y=J.fo(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jy(z,this)),y.c),[H.A(y,0)]).E()
y=J.fj(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jz(z,this)),y.c),[H.A(y,0)]).E()
y=J.fk(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jA(z,this)),y.c),[H.A(y,0)]).E()
y=J.fl(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jB(z,this)),y.c),[H.A(y,0)]).E()
y=J.fm(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jC(z,this)),y.c),[H.A(y,0)]).E()
y=J.fn(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jD(z,this)),y.c),[H.A(y,0)]).E()}},
ie:{
"^":"a+ji;"},
jF:{
"^":"f:11;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.d1(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.L)(y),++v){u=y[v]
t=C.Y.ghB(u).a
s=C.b.N(z.a.b.offsetLeft)
if(typeof t!=="number")return t.I()
r=t-s
s=C.b.N(u.pageX)
t=C.b.N(u.pageY)
new P.Y(s,t).$builtinTypeInfo=[null]
q=t-C.b.N(z.a.b.offsetTop)
if(w.a2(u.identifier)){t=z.gM(z)
s=u.identifier
if(typeof s!=="number")return s.n()
z.ac(t.c)
t.af(z,s+1,"pointermove",r,q)
z.ab()}else{w.m(0,u.identifier,u)
t=z.gM(z)
s=u.identifier
if(typeof s!=="number")return s.n()
z.ac(t.c)
t.af(z,s+1,"pointerdown",r,q)
z.ab()}}}},
jE:{
"^":"f:11;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
z.c=z.b
for(y=J.d1(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.L)(y),++v){u=y[v]
if(w.a2(u.identifier)){t=C.b.N(u.pageX)
s=C.b.N(u.pageY)
new P.Y(t,s).$builtinTypeInfo=[null]
s=C.b.N(z.a.b.offsetLeft)
r=C.b.N(u.pageX)
q=C.b.N(u.pageY)
new P.Y(r,q).$builtinTypeInfo=[null]
r=C.b.N(z.a.b.offsetTop)
w.ad(0,u.identifier)
p=z.gM(z)
o=u.identifier
if(typeof o!=="number")return o.n()
z.ac(p.c)
p.af(z,o+1,"pointerup",t-s,q-r)
z.ab()}}}},
jx:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=z.gM(z)
x=J.k(a)
w=x.ga0(a)
w=w.gi(w)
w.toString
x=x.ga0(a)
x=x.gj(x)
x.toString
z.ac(y.c)
y.af(z,0,"pointerdown",w,x)
z.ab()}}},
jy:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gM(z)
w=J.k(a)
v=w.ga0(a)
v=v.gi(v)
v.toString
w=w.ga0(a)
w=w.gj(w)
w.toString
z.ac(x.c)
x.af(z,0,"pointerup",v,w)
z.ab()
y.a=!1}}}},
jz:{
"^":"f:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
jA:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gM(z)
w=J.k(a)
v=w.ga0(a)
v=v.gi(v)
v.toString
w=w.ga0(a)
w=w.gj(w)
w.toString
z.ac(x.c)
x.af(z,0,"pointercancel",v,w)
z.ab()
y.a=!1}}}},
jB:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b)if(this.a.a){y=z.gM(z)
x=J.k(a)
w=x.ga0(a)
w=w.gi(w)
w.toString
x=x.ga0(a)
x=x.gj(x)
x.toString
z.ac(y.c)
y.af(z,0,"pointermove",w,x)
z.ab()}}},
jC:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gM(z)
w=J.k(a)
v=w.ga0(a)
v=v.gi(v)
v.toString
w=w.ga0(a)
w=w.gj(w)
w.toString
z.ac(x.c)
x.af(z,0,"pointercancel",v,w)
z.ab()
y.a=!1}}}},
jD:{
"^":"f:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
ju:{
"^":"f:0;a,b",
$1:function(a){this.a.a1(0,this.b)}},
jv:{
"^":"f:0;a,b",
$1:function(a){this.b.ai("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
q:{
"^":"a;p:a<",
aW:function(a){var z,y
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
k:function(a){return"[0] "+this.bd(0).k(0)+"\n[1] "+this.bd(1).k(0)+"\n[2] "+this.bd(2).k(0)+"\n[3] "+this.bd(3).k(0)+"\n"},
gh_:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.c(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=16)return H.c(z,b)
z[b]=c},
bd:function(a){var z,y,x
z=new Float64Array(H.j(4))
y=this.a
if(a>=16)return H.c(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.c(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.c(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.c(y,x)
z[3]=y[x]
return new E.ah(z)},
c4:function(a){var z=new E.q(new Float64Array(H.j(16)))
z.aW(this)
return z},
u:function(a,b){var z,y,x
if(typeof b==="number"){z=new Float64Array(H.j(16))
y=this.a
z[15]=y[15]*b
z[14]=y[14]*b
z[13]=y[13]*b
z[12]=y[12]*b
z[11]=y[11]*b
z[10]=y[10]*b
z[9]=y[9]*b
z[8]=y[8]*b
z[7]=y[7]*b
z[6]=y[6]*b
z[5]=y[5]*b
z[4]=y[4]*b
z[3]=y[3]*b
z[2]=y[2]*b
z[1]=y[1]*b
z[0]=y[0]*b
return new E.q(z)}z=J.p(b)
if(!!z.$isah){z=new Float64Array(H.j(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ah(z)}if(!!z.$isx){z=new Float64Array(H.j(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.x(z)}if(4===b.gh_()){z=new Float64Array(H.j(16))
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
return new E.q(z)}throw H.b(P.az(b))},
n:function(a,b){var z,y
z=new Float64Array(H.j(16))
y=this.a
z[0]=C.b.n(y[0],b.gp().h(0,0))
z[1]=C.b.n(y[1],b.gp().h(0,1))
z[2]=C.b.n(y[2],b.gp().h(0,2))
z[3]=C.b.n(y[3],b.gp().h(0,3))
z[4]=C.b.n(y[4],b.gp().h(0,4))
z[5]=C.b.n(y[5],b.gp().h(0,5))
z[6]=C.b.n(y[6],b.gp().h(0,6))
z[7]=C.b.n(y[7],b.gp().h(0,7))
z[8]=C.b.n(y[8],b.gp().h(0,8))
z[9]=C.b.n(y[9],b.gp().h(0,9))
z[10]=C.b.n(y[10],b.gp().h(0,10))
z[11]=C.b.n(y[11],b.gp().h(0,11))
z[12]=C.b.n(y[12],b.gp().h(0,12))
z[13]=C.b.n(y[13],b.gp().h(0,13))
z[14]=C.b.n(y[14],b.gp().h(0,14))
z[15]=C.b.n(y[15],b.gp().h(0,15))
return new E.q(z)},
I:function(a,b){var z,y,x,w
z=new Float64Array(H.j(16))
y=this.a
x=y[0]
w=b.gp()
if(0>=w.length)return H.c(w,0)
z[0]=x-w[0]
w=y[1]
x=b.gp()
if(1>=x.length)return H.c(x,1)
z[1]=w-x[1]
x=y[2]
w=b.gp()
if(2>=w.length)return H.c(w,2)
z[2]=x-w[2]
w=y[3]
x=b.gp()
if(3>=x.length)return H.c(x,3)
z[3]=w-x[3]
x=y[4]
w=b.gp()
if(4>=w.length)return H.c(w,4)
z[4]=x-w[4]
w=y[5]
x=b.gp()
if(5>=x.length)return H.c(x,5)
z[5]=w-x[5]
x=y[6]
w=b.gp()
if(6>=w.length)return H.c(w,6)
z[6]=x-w[6]
w=y[7]
x=b.gp()
if(7>=x.length)return H.c(x,7)
z[7]=w-x[7]
x=y[8]
w=b.gp()
if(8>=w.length)return H.c(w,8)
z[8]=x-w[8]
w=y[9]
x=b.gp()
if(9>=x.length)return H.c(x,9)
z[9]=w-x[9]
x=y[10]
w=b.gp()
if(10>=w.length)return H.c(w,10)
z[10]=x-w[10]
w=y[11]
x=b.gp()
if(11>=x.length)return H.c(x,11)
z[11]=w-x[11]
x=y[12]
w=b.gp()
if(12>=w.length)return H.c(w,12)
z[12]=x-w[12]
w=y[13]
x=b.gp()
if(13>=x.length)return H.c(x,13)
z[13]=w-x[13]
x=y[14]
w=b.gp()
if(14>=w.length)return H.c(w,14)
z[14]=x-w[14]
y=y[15]
w=b.gp()
if(15>=w.length)return H.c(w,15)
z[15]=y-w[15]
return new E.q(z)},
K:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.p(b)
y=!!z.$isah
x=y?b.gS():1
if(!!z.$isx||y){w=z.gi(b)
v=z.gj(b)
u=z.gae(b)}else{u=d
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
cD:function(a,b,c,d){var z,y,x,w,v,u
z=J.p(b)
y=!!z.$isah
x=y?b.gS():1
if(!!z.$isx||y){w=z.gi(b)
v=z.gj(b)
u=z.gae(b)}else{u=d
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
w:function(){var z=this.a
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
hm:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
x:{
"^":"a;p:a<",
D:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aW:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
k:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
I:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gp()
if(0>=x.length)return H.c(x,0)
x=x[0]
w=z[1]
v=b.gp()
if(1>=v.length)return H.c(v,1)
v=v[1]
z=z[2]
u=b.gp()
if(2>=u.length)return H.c(u,2)
u=u[2]
t=new E.x(new Float64Array(H.j(3)))
t.D(y-x,w-v,z-u)
return t},
n:function(a,b){var z,y,x,w
z=this.a
y=C.b.n(z[0],b.gp().h(0,0))
x=C.b.n(z[1],b.gp().h(0,1))
z=C.b.n(z[2],b.gp().h(0,2))
w=new E.x(new Float64Array(H.j(3)))
w.D(y,x,z)
return w},
u:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.v(b)
x=z[1]
z=z[2]
w=new E.x(new Float64Array(H.j(3)))
w.D(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.c(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=3)return H.c(z,b)
z[b]=c},
gl:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.ai(y*y+x*x+z*z))},
c4:function(a){var z=new E.x(new Float64Array(H.j(3)))
z.aW(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
sae:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]}},
ah:{
"^":"a;p:a<",
bG:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aW:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
k:function(a){var z=this.a
return H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+","+H.d(z[3])},
I:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.a
y=z[0]
x=b.gp()
if(0>=x.length)return H.c(x,0)
x=x[0]
w=z[1]
v=b.gp()
if(1>=v.length)return H.c(v,1)
v=v[1]
u=z[2]
t=b.gp()
if(2>=t.length)return H.c(t,2)
t=t[2]
z=z[3]
s=b.gp()
if(3>=s.length)return H.c(s,3)
s=s[3]
r=new E.ah(new Float64Array(H.j(4)))
r.bG(y-x,w-v,u-t,z-s)
return r},
n:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.n(z[0],b.gp().h(0,0))
x=C.b.n(z[1],b.gp().h(0,1))
w=C.b.n(z[2],b.gp().h(0,2))
z=C.b.n(z[3],b.gp().h(0,3))
v=new E.ah(new Float64Array(H.j(4)))
v.bG(y,x,w,z)
return v},
u:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.v(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ah(new Float64Array(H.j(4)))
v.bG(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.c(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=4)return H.c(z,b)
z[b]=c},
gl:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.ai(y*y+x*x+w*w+z*z))},
c4:function(a){var z=new E.ah(new Float64Array(H.j(4)))
z.aW(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
sae:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]},
gS:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dz.prototype
return J.dy.prototype}if(typeof a=="string")return J.b7.prototype
if(a==null)return J.hR.prototype
if(typeof a=="boolean")return J.hQ.prototype
if(a.constructor==Array)return J.b5.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.D=function(a){if(typeof a=="string")return J.b7.prototype
if(a==null)return a
if(a.constructor==Array)return J.b5.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.b0=function(a){if(a==null)return a
if(a.constructor==Array)return J.b5.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.a0=function(a){if(typeof a=="number")return J.aO.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bK.prototype
return a}
J.aj=function(a){if(typeof a=="number")return J.aO.prototype
if(typeof a=="string")return J.b7.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bK.prototype
return a}
J.lj=function(a){if(typeof a=="number")return J.aO.prototype
if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.cO=function(a){if(typeof a=="string")return J.b7.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bK.prototype
return a}
J.k=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.w=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.aj(a).n(a,b)}
J.K=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).v(a,b)}
J.a1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.a0(a).an(a,b)}
J.aL=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.a0(a).a6(a,b)}
J.cW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.aj(a).u(a,b)}
J.cX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.a0(a).I(a,b)}
J.eX=function(a,b){return J.a0(a).bf(a,b)}
J.bm=function(a,b){if(a.constructor==Array||typeof a=="string"||H.ly(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.D(a).h(a,b)}
J.eY=function(a,b,c,d){return J.k(a).de(a,b,c,d)}
J.eZ=function(a){return J.k(a).fn(a)}
J.bY=function(a,b,c){return J.k(a).fp(a,b,c)}
J.cY=function(a,b,c){return J.k(a).fq(a,b,c)}
J.f_=function(a,b){return J.k(a).ft(a,b)}
J.f0=function(a,b,c,d,e){return J.k(a).fu(a,b,c,d,e)}
J.f1=function(a,b,c,d){return J.k(a).fv(a,b,c,d)}
J.f2=function(a,b){return J.b0(a).fA(a,b)}
J.f3=function(a,b,c,d,e){return J.k(a).fB(a,b,c,d,e)}
J.f4=function(a,b){return J.k(a).fC(a,b)}
J.f5=function(a,b){return J.k(a).fF(a,b)}
J.f6=function(a,b){return J.cO(a).aq(a,b)}
J.cZ=function(a,b,c,d,e){return J.k(a).fH(a,b,c,d,e)}
J.f7=function(a,b){return J.aj(a).aM(a,b)}
J.f8=function(a,b){return J.k(a).a1(a,b)}
J.bZ=function(a,b,c){return J.D(a).fJ(a,b,c)}
J.c_=function(a){return J.k(a).fL(a)}
J.f9=function(a,b){return J.k(a).fM(a,b)}
J.fa=function(a){return J.k(a).fO(a)}
J.fb=function(a,b){return J.k(a).fP(a,b)}
J.fc=function(a,b){return J.k(a).fT(a,b)}
J.d_=function(a,b){return J.k(a).fU(a,b)}
J.fd=function(a,b){return J.k(a).h0(a,b)}
J.fe=function(a,b,c,d,e){return J.k(a).h1(a,b,c,d,e)}
J.ff=function(a,b){return J.b0(a).a3(a,b)}
J.d0=function(a,b){return J.k(a).h7(a,b)}
J.bn=function(a,b){return J.k(a).h8(a,b)}
J.fg=function(a,b){return J.b0(a).O(a,b)}
J.d1=function(a){return J.k(a).gfz(a)}
J.ad=function(a){return J.k(a).gaC(a)}
J.O=function(a){return J.p(a).gH(a)}
J.fh=function(a){return J.k(a).gq(a)}
J.ax=function(a){return J.b0(a).gL(a)}
J.ak=function(a){return J.D(a).gl(a)}
J.fi=function(a){return J.k(a).gdA(a)}
J.fj=function(a){return J.k(a).gdB(a)}
J.fk=function(a){return J.k(a).gdC(a)}
J.fl=function(a){return J.k(a).gdD(a)}
J.fm=function(a){return J.k(a).gdE(a)}
J.fn=function(a){return J.k(a).gdF(a)}
J.fo=function(a){return J.k(a).gdG(a)}
J.fp=function(a){return J.k(a).ghy(a)}
J.fq=function(a){return J.k(a).gM(a)}
J.fr=function(a){return J.k(a).gat(a)}
J.fs=function(a){return J.k(a).gcv(a)}
J.ft=function(a){return J.k(a).gt(a)}
J.bo=function(a,b,c){return J.k(a).e1(a,b,c)}
J.fu=function(a){return J.k(a).e2(a)}
J.fv=function(a,b){return J.k(a).e3(a,b)}
J.d2=function(a,b){return J.k(a).e7(a,b)}
J.fw=function(a,b,c){return J.k(a).e9(a,b,c)}
J.fx=function(a,b){return J.b0(a).aO(a,b)}
J.fy=function(a,b,c,d){return J.k(a).dL(a,b,c,d)}
J.aM=function(a,b){return J.k(a).bE(a,b)}
J.fz=function(a,b){return J.k(a).sq(a,b)}
J.fA=function(a,b){return J.k(a).sao(a,b)}
J.fB=function(a,b){return J.k(a).st(a,b)}
J.fC=function(a,b,c){return J.k(a).ek(a,b,c)}
J.d3=function(a,b,c,d){return J.k(a).em(a,b,c,d)}
J.d4=function(a,b,c,d){return J.k(a).en(a,b,c,d)}
J.fD=function(a,b,c){return J.cO(a).bH(a,b,c)}
J.bp=function(a,b,c,d){return J.k(a).hN(a,b,c,d)}
J.G=function(a){return J.a0(a).hO(a)}
J.d5=function(a){return J.a0(a).aR(a)}
J.fE=function(a,b){return J.a0(a).bb(a,b)}
J.b2=function(a){return J.p(a).k(a)}
J.d6=function(a,b){return J.lj(a).aU(a,b)}
J.d7=function(a,b){return J.k(a).hS(a,b)}
J.bq=function(a,b,c,d,e,f,g){return J.k(a).hT(a,b,c,d,e,f,g)}
J.fF=function(a,b,c){return J.k(a).aV(a,b,c)}
I.bU=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.E=W.h7.prototype
C.r=W.c5.prototype
C.F=W.hl.prototype
C.G=W.hv.prototype
C.a=J.b5.prototype
C.H=J.dy.prototype
C.c=J.dz.prototype
C.b=J.aO.prototype
C.i=J.b7.prototype
C.V=H.ck.prototype
C.W=J.ih.prototype
C.X=P.iD.prototype
C.Y=W.bI.prototype
C.Z=J.bK.prototype
C.a_=W.jN.prototype
C.A=new F.fK(1)
C.B=new H.dm()
C.C=new P.ig()
C.D=new P.k1()
C.e=new P.kl()
C.d=new P.kF()
C.u=new P.a8(0)
C.I=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.J=function(hooks) {
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
C.w=function getTagFallback(o) {
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
C.x=function(hooks) { return hooks; }

C.K=function(getTagFallback) {
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
C.M=function(hooks) {
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
C.L=function() {
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
C.N=function(hooks) {
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
C.O=function(_, letter) { return letter.toUpperCase(); }
C.y=new P.hV(null,null)
C.P=new P.hX(null)
C.Q=new P.hY(null,null)
C.z=H.e(I.bU([127,2047,65535,1114111]),[P.o])
C.R=I.bU([])
C.S=new H.c7([0,"MinoTyoe.empty",1,"MinoTyoe.frame",2,"MinoTyoe.out",3,"MinoTyoe.l",4,"MinoTyoe.o",5,"MinoTyoe.s",6,"MinoTyoe.z",7,"MinoTyoe.j",8,"MinoTyoe.t",9,"MinoTyoe.L"])
C.T=new H.c7([0,"BitmapFontInfoType.vertical",1,"BitmapFontInfoType.horizontal"])
C.U=new H.c7([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.f=new F.a9(0)
C.t=new F.a9(1)
C.q=new F.a9(2)
C.j=new F.a9(3)
C.k=new F.a9(4)
C.l=new F.a9(5)
C.m=new F.a9(6)
C.n=new F.a9(7)
C.o=new F.a9(8)
C.p=new F.a9(9)
C.h=new F.jh(0)
C.v=new P.jK(!1)
$.dZ="$cachedFunction"
$.e_="$cachedInvocation"
$.a7=0
$.aN=null
$.da=null
$.cP=null
$.eH=null
$.eT=null
$.bQ=null
$.bS=null
$.cQ=null
$.aH=null
$.aY=null
$.aZ=null
$.cI=!1
$.n=C.d
$.dp=0
$.dj=null
$.di=null
$.dh=null
$.dg=null
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
I.$lazy(y,x,w)}})(["dw","$get$dw",function(){return H.hK()},"dx","$get$dx",function(){return new P.hg(null)},"ed","$get$ed",function(){return H.ab(H.bJ({toString:function(){return"$receiver$"}}))},"ee","$get$ee",function(){return H.ab(H.bJ({$method$:null,toString:function(){return"$receiver$"}}))},"ef","$get$ef",function(){return H.ab(H.bJ(null))},"eg","$get$eg",function(){return H.ab(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ek","$get$ek",function(){return H.ab(H.bJ(void 0))},"el","$get$el",function(){return H.ab(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ei","$get$ei",function(){return H.ab(H.ej(null))},"eh","$get$eh",function(){return H.ab(function(){try{null.$method$}catch(z){return z.message}}())},"en","$get$en",function(){return H.ab(H.ej(void 0))},"em","$get$em",function(){return H.ab(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cD","$get$cD",function(){return P.jQ()},"b_","$get$b_",function(){return[]},"dF","$get$dF",function(){return[500,225,150,125,75]},"ce","$get$ce",function(){return[150,150,125,125,125]},"dH","$get$dH",function(){return[70,70,70,70,70]},"dI","$get$dI",function(){return[150,150,150,150,150]},"cf","$get$cf",function(){return[200,200,200,200,200]},"dG","$get$dG",function(){return[1,2,2,2,3]},"dJ","$get$dJ",function(){return[6,7,8,9,10]},"dK","$get$dK",function(){return[2,5,6,10,50]},"dM","$get$dM",function(){return P.ix(null)},"dV","$get$dV",function(){return F.m(255,238,238,255)},"cl","$get$cl",function(){return F.m(170,136,136,136)},"cm","$get$cm",function(){return F.m(170,85,51,51)},"co","$get$co",function(){return F.m(170,255,255,255)},"bD","$get$bD",function(){return F.m(170,0,0,0)},"cp","$get$cp",function(){return F.m(170,255,170,170)},"cr","$get$cr",function(){return F.m(170,170,255,170)},"cn","$get$cn",function(){return F.m(170,170,170,255)},"bC","$get$bC",function(){return F.m(170,255,255,170)},"cq","$get$cq",function(){return F.m(170,170,255,255)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,void:true},{func:1,args:[P.aa]},{func:1,args:[W.cg]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.ar]},{func:1,args:[,],opt:[,]},{func:1,args:[,,]},{func:1,ret:P.aa,args:[P.o]},{func:1,args:[W.bc]},{func:1,args:[W.cA]},{func:1,args:[,P.aa]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,,]},{func:1,args:[P.a]},{func:1,void:true,args:[,],opt:[P.ar]},{func:1,ret:P.cL},{func:1,void:true,args:[P.a],opt:[P.ar]},{func:1,void:true,args:[,P.ar]},{func:1,ret:P.o,args:[,P.o]},{func:1,void:true,args:[P.o,P.o]},{func:1,args:[P.e6,,]},{func:1,args:[F.cx]},{func:1,ret:P.a2,args:[,]},{func:1,args:[P.aa,,]},{func:1,ret:P.o,args:[,]},{func:1,args:[P.o]},{func:1,args:[P.o,,]},{func:1,ret:P.a2,args:[W.bc]},{func:1,ret:P.a,args:[,]},{func:1,ret:P.o,args:[P.T,P.T]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.lH(d||a)
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
Isolate.bU=a.bU
Isolate.av=a.av
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eV(F.eR(),b)},[])
else (function(b){H.eV(F.eR(),b)})([])})})()