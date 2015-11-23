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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cB"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cB"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cB(this,c,d,true,[],f).prototype
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
l6:{
"^":"a;a"}}],["","",,J,{
"^":"",
p:function(a){return void 0},
bI:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bE:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cD==null){H.k9()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.cn("Return interceptor for "+H.b(y(a,z))))}w=H.ki(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.N
else return C.P}return w},
h:{
"^":"a;",
u:function(a,b){return a===b},
gE:function(a){return H.ag(a)},
k:["dO",function(a){return H.br(a)}],
"%":"CanvasRenderingContext2D|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
h3:{
"^":"h;",
k:function(a){return String(a)},
gE:function(a){return a?519018:218159},
$iscz:1},
h4:{
"^":"h;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gE:function(a){return 0}},
de:{
"^":"h;",
gE:function(a){return 0},
$ish5:1},
hq:{
"^":"de;"},
co:{
"^":"de;",
k:function(a){return String(a)}},
aU:{
"^":"h;",
bC:function(a,b){if(!!a.immutable$list)throw H.d(new P.T(b))},
b1:function(a,b){if(!!a.fixed$length)throw H.d(new P.T(b))},
d7:function(a,b){this.b1(a,"removeAt")
if(b>=a.length)throw H.d(P.aZ(b,null,null))
return a.splice(b,1)[0]},
a8:function(a,b){var z
this.b1(a,"remove")
for(z=0;z<a.length;++z)if(J.E(a[z],b)){a.splice(z,1)
return!0}return!1},
I:function(a,b){var z,y
this.b1(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.O)(b),++y)a.push(b[y])},
N:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.R(a))}},
aA:function(a,b){return H.e(new H.c_(a,b),[null,null])},
cT:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.f(y,x)
y[x]=w}return y.join(b)},
a2:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
gF:function(a){if(a.length>0)return a[0]
throw H.d(H.bW())},
gaz:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.bW())},
c5:function(a,b,c,d,e){var z,y,x
this.bC(a,"set range")
P.bt(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.L(P.ah(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.h1())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
dJ:function(a,b){var z
this.bC(a,"sort")
z=P.k3()
H.b0(a,0,a.length-1,z)},
c7:function(a){return this.dJ(a,null)},
k:function(a){return P.be(a,"[","]")},
gK:function(a){return new J.cV(a,a.length,0,null)},
gE:function(a){return H.ag(a)},
gm:function(a){return a.length},
sm:function(a,b){this.b1(a,"set length")
if(b<0)throw H.d(P.ah(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.H(a,b))
if(b>=a.length||b<0)throw H.d(H.H(a,b))
return a[b]},
l:function(a,b,c){this.bC(a,"indexed set")
if(b>=a.length||b<0)throw H.d(H.H(a,b))
a[b]=c},
$isbf:1,
$isl:1,
$asl:null,
$ist:1},
l5:{
"^":"aU;"},
cV:{
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
aw:function(a,b){var z
if(typeof b!=="number")throw H.d(H.Q(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbL(b)
if(this.gbL(a)===z)return 0
if(this.gbL(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gfu(b))return 0
return 1}else return-1},
gbL:function(a){return a===0?1/a<0:a<0},
gfu:function(a){return isNaN(a)},
bV:function(a,b){return a%b},
aC:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.T(""+a))},
L:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.T(""+a))},
fR:function(a){return a},
bb:function(a,b){var z,y,x,w
H.cA(b)
if(b<2||b>36)throw H.d(P.ah(b,2,36,"radix",null))
z=a.toString(b)
if(C.h.bE(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.L(new P.T("Unexpected toString result: "+z))
x=J.F(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.h.t("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gE:function(a){return a&0x1FFFFFFF},
n:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a+b},
R:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a-b},
t:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a*b},
c3:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
c8:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aC(a/b)},
al:function(a,b){return(a|0)===a?a/b|0:this.aC(a/b)},
b_:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ai:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a<b},
ah:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a>b},
be:function(a,b){if(typeof b!=="number")throw H.d(H.Q(b))
return a>=b},
$isan:1},
dd:{
"^":"aV;",
$isan:1,
$isn:1},
dc:{
"^":"aV;",
$isan:1},
bg:{
"^":"h;",
bE:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.H(a,b))
if(b<0)throw H.d(H.H(a,b))
if(b>=a.length)throw H.d(H.H(a,b))
return a.charCodeAt(b)},
n:function(a,b){if(typeof b!=="string")throw H.d(P.f7(b,null,null))
return a+b},
dN:function(a,b,c){H.cA(b)
if(c==null)c=a.length
H.cA(c)
if(b<0)throw H.d(P.aZ(b,null,null))
if(typeof c!=="number")return H.D(c)
if(b>c)throw H.d(P.aZ(b,null,null))
if(c>a.length)throw H.d(P.aZ(c,null,null))
return a.substring(b,c)},
dM:function(a,b){return this.dN(a,b,null)},
t:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.y)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
eU:function(a,b,c){if(c>a.length)throw H.d(P.ah(c,0,a.length,null,null))
return H.kn(a,b,c)},
ga3:function(a){return a.length===0},
aw:function(a,b){var z
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
gm:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.H(a,b))
if(b>=a.length||b<0)throw H.d(H.H(a,b))
return a[b]},
$isbf:1,
$isa7:1}}],["","",,H,{
"^":"",
b2:function(a,b){var z=a.aL(b)
if(!init.globalState.d.cy)init.globalState.f.aR()
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
if(!J.p(y).$isl)throw H.d(P.aR("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.jk(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$da()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.iU(P.bY(null,H.b1),0)
y.z=P.bj(null,null,null,P.n,H.cv)
y.ch=P.bj(null,null,null,P.n,null)
if(y.x===!0){x=new H.jj()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fV,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jl)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.bj(null,null,null,P.n,H.bu)
w=P.aF(null,null,null,P.n)
v=new H.bu(0,null,!1)
u=new H.cv(y,x,w,init.createNewIsolate(),v,new H.ap(H.bJ()),new H.ap(H.bJ()),!1,!1,[],P.aF(null,null,null,null),null,null,!1,!0,P.aF(null,null,null,null))
w.av(0,0)
u.ca(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.b4()
x=H.aA(y,[y]).ak(a)
if(x)u.aL(new H.kl(z,a))
else{y=H.aA(y,[y,y]).ak(a)
if(y)u.aL(new H.km(z,a))
else u.aL(a)}init.globalState.f.aR()},
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
z=new H.bx(!0,[]).am(b.data)
y=J.F(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bx(!0,[]).am(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bx(!0,[]).am(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.bj(null,null,null,P.n,H.bu)
p=P.aF(null,null,null,P.n)
o=new H.bu(0,null,!1)
n=new H.cv(y,q,p,init.createNewIsolate(),o,new H.ap(H.bJ()),new H.ap(H.bJ()),!1,!1,[],P.aF(null,null,null,null),null,null,!1,!0,P.aF(null,null,null,null))
p.av(0,0)
n.ca(0,o)
init.globalState.f.a.af(new H.b1(n,new H.fW(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aR()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aD(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aR()
break
case"close":init.globalState.ch.a8(0,$.$get$db().h(0,a))
a.terminate()
init.globalState.f.aR()
break
case"log":H.fU(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.au(["command","print","msg",z])
q=new H.aw(!0,P.as(null,P.n)).a_(q)
y.toString
self.postMessage(q)}else P.a4(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
fU:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.au(["command","log","msg",a])
x=new H.aw(!0,P.as(null,P.n)).a_(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.N(w)
throw H.d(P.bd(z))}},
fX:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dz=$.dz+("_"+y)
$.dA=$.dA+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aD(f,["spawned",new H.bz(y,x),w,z.r])
x=new H.fY(a,b,c,d,z)
if(e===!0){z.cH(w,w)
init.globalState.f.a.af(new H.b1(z,x,"start isolate"))}else x.$0()},
jH:function(a){return new H.bx(!0,[]).am(new H.aw(!1,P.as(null,P.n)).a_(a))},
kl:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
km:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jk:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{jl:function(a){var z=P.au(["command","print","msg",a])
return new H.aw(!0,P.as(null,P.n)).a_(z)}}},
cv:{
"^":"a;a,b,c,fv:d<,eV:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cH:function(a,b){if(!this.f.u(0,a))return
if(this.Q.av(0,b)&&!this.y)this.y=!0
this.by()},
fK:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a8(0,a)
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
if(w===y.c)y.cl();++y.d}this.y=!1}this.by()},
eA:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fJ:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.L(new P.T("removeRange"))
P.bt(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dG:function(a,b){if(!this.r.u(0,a))return
this.db=b},
fj:function(a,b,c){var z=J.p(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){J.aD(a,c)
return}z=this.cx
if(z==null){z=P.bY(null,null)
this.cx=z}z.af(new H.ja(a,c))},
fh:function(a,b){var z
if(!this.r.u(0,a))return
z=J.p(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.bM()
return}z=this.cx
if(z==null){z=P.bY(null,null)
this.cx=z}z.af(this.gfz())},
fk:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.a4(a)
if(b!=null)P.a4(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aQ(a)
y[1]=b==null?null:J.aQ(b)
for(x=new P.df(z,z.r,null,null),x.c=z.e;x.C();)J.aD(x.d,y)},
aL:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.N(u)
this.fk(w,v)
if(this.db===!0){this.bM()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfv()
if(this.cx!=null)for(;t=this.cx,!t.ga3(t);)this.cx.d8().$0()}return y},
cV:function(a){return this.b.h(0,a)},
ca:function(a,b){var z=this.b
if(z.X(a))throw H.d(P.bd("Registry: ports must be registered only once."))
z.l(0,a,b)},
by:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.bM()},
bM:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.T(0)
for(z=this.b,y=z.gdk(z),y=y.gK(y);y.C();)y.gG().e9()
z.T(0)
this.c.T(0)
init.globalState.z.a8(0,this.a)
this.dx.T(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
J.aD(w,z[v])}this.ch=null}},"$0","gfz",0,0,2]},
ja:{
"^":"c:2;a,b",
$0:function(){J.aD(this.a,this.b)}},
iU:{
"^":"a;a,b",
f2:function(){var z=this.a
if(z.b===z.c)return
return z.d8()},
df:function(){var z,y,x
z=this.f2()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.X(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga3(y)}else y=!1
else y=!1
else y=!1
if(y)H.L(P.bd("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga3(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.au(["command","close"])
x=new H.aw(!0,P.as(null,P.n)).a_(x)
y.toString
self.postMessage(x)}return!1}z.fI()
return!0},
cw:function(){if(self.window!=null)new H.iV(this).$0()
else for(;this.df(););},
aR:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cw()
else try{this.cw()}catch(x){w=H.B(x)
z=w
y=H.N(x)
w=init.globalState.Q
v=P.au(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.aw(!0,P.as(null,P.n)).a_(v)
w.toString
self.postMessage(v)}}},
iV:{
"^":"c:2;a",
$0:function(){if(!this.a.df())return
P.cg(C.r,this)}},
b1:{
"^":"a;a,b,c",
fI:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aL(this.b)}},
jj:{
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
w=H.aA(x,[x,x]).ak(y)
if(w)y.$2(this.b,this.c)
else{x=H.aA(x,[x]).ak(y)
if(x)y.$1(this.b)
else y.$0()}}z.by()}},
e1:{
"^":"a;"},
bz:{
"^":"e1;b,a",
bg:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gco())return
x=H.jH(b)
if(z.geV()===y){y=J.F(x)
switch(y.h(x,0)){case"pause":z.cH(y.h(x,1),y.h(x,2))
break
case"resume":z.fK(y.h(x,1))
break
case"add-ondone":z.eA(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fJ(y.h(x,1))
break
case"set-errors-fatal":z.dG(y.h(x,1),y.h(x,2))
break
case"ping":z.fj(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fh(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.av(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a8(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(b)
y.a.af(new H.b1(z,new H.jn(this,x),w))},
u:function(a,b){if(b==null)return!1
return b instanceof H.bz&&J.E(this.b,b.b)},
gE:function(a){return this.b.gbt()}},
jn:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gco())z.e5(this.b)}},
cw:{
"^":"e1;b,c,a",
bg:function(a,b){var z,y,x
z=P.au(["command","message","port",this,"msg",b])
y=new H.aw(!0,P.as(null,P.n)).a_(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.cw&&J.E(this.b,b.b)&&J.E(this.a,b.a)&&J.E(this.c,b.c)},
gE:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.dI()
y=this.a
if(typeof y!=="number")return y.dI()
x=this.c
if(typeof x!=="number")return H.D(x)
return(z<<16^y<<8^x)>>>0}},
bu:{
"^":"a;bt:a<,b,co:c<",
e9:function(){this.c=!0
this.b=null},
e5:function(a){if(this.c)return
this.ei(a)},
ei:function(a){return this.b.$1(a)},
$ishD:1},
i6:{
"^":"a;a,b,c",
e_:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.af(new H.b1(y,new H.i8(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aN(new H.i9(this,b),0),a)}else throw H.d(new P.T("Timer greater than 0."))},
static:{i7:function(a,b){var z=new H.i6(!0,!1,null)
z.e_(a,b)
return z}}},
i8:{
"^":"c:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
i9:{
"^":"c:2;a,b",
$0:function(){this.a.c=null
H.bH()
this.b.$0()}},
ap:{
"^":"a;bt:a<",
gE:function(a){var z=this.a
if(typeof z!=="number")return z.fV()
z=C.b.b_(z,0)^C.b.al(z,4294967296)
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
a_:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gm(z))
z=J.p(a)
if(!!z.$isdp)return["buffer",a]
if(!!z.$isc5)return["typed",a]
if(!!z.$isbf)return this.dC(a)
if(!!z.$isfT){x=this.gdz()
w=a.gad()
w=H.bl(w,x,H.X(w,"V",0),null)
w=P.bZ(w,!0,H.X(w,"V",0))
z=z.gdk(a)
z=H.bl(z,x,H.X(z,"V",0),null)
return["map",w,P.bZ(z,!0,H.X(z,"V",0))]}if(!!z.$ish5)return this.dD(a)
if(!!z.$ish)this.dj(a)
if(!!z.$ishD)this.aS(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbz)return this.dE(a)
if(!!z.$iscw)return this.dF(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.aS(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isap)return["capability",a.a]
if(!(a instanceof P.a))this.dj(a)
return["dart",init.classIdExtractor(a),this.dB(init.classFieldsExtractor(a))]},"$1","gdz",2,0,1],
aS:function(a,b){throw H.d(new P.T(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
dj:function(a){return this.aS(a,null)},
dC:function(a){var z=this.dA(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aS(a,"Can't serialize indexable: ")},
dA:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.a_(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
dB:function(a){var z
for(z=0;z<a.length;++z)C.a.l(a,z,this.a_(a[z]))
return a},
dD:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aS(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.a_(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
dF:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dE:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbt()]
return["raw sendport",a]}},
bx:{
"^":"a;a,b",
am:[function(a){var z,y,x,w,v,u
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
y=this.aJ(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.aJ(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.aJ(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=this.aJ(x)
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
this.aJ(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.b(a))}},"$1","gf3",2,0,1],
aJ:function(a){var z,y,x
z=J.F(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.D(x)
if(!(y<x))break
z.l(a,y,this.am(z.h(a,y)));++y}return a},
f5:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.at()
this.b.push(w)
y=J.f3(y,this.gf3()).bY(0)
for(z=J.F(y),v=J.F(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.f(y,u)
w.l(0,y[u],this.am(v.h(x,u)))}return w},
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
u=v.cV(w)
if(u==null)return
t=new H.bz(u,x)}else t=new H.cw(y,w,x)
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
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.D(t)
if(!(u<t))break
w[z.h(y,u)]=this.am(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
fr:function(){throw H.d(new P.T("Cannot modify unmodifiable Map"))},
k4:function(a){return init.types[a]},
kh:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.p(a).$isbh},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aQ(a)
if(typeof z!=="string")throw H.d(H.Q(a))
return z},
ag:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dx:function(a,b){throw H.d(new P.aq(a,null,null))},
hA:function(a,b,c){var z,y
H.jU(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.dx(a,c)
if(3>=z.length)return H.f(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.dx(a,c)},
cd:function(a){var z,y
z=C.t(J.p(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.h.bE(z,0)===36)z=C.h.dM(z,1)
return(z+H.cF(H.bF(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
br:function(a){return"Instance of '"+H.cd(a)+"'"},
hB:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
bs:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.b_(z,10))>>>0,56320|z&1023)}throw H.d(P.ah(a,0,1114111,null,null))},
S:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dy:function(a){return a.b?H.S(a).getUTCMilliseconds()+0:H.S(a).getMilliseconds()+0},
bq:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.Q(a))
return a[b]},
ce:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.Q(a))
a[b]=c},
D:function(a){throw H.d(H.Q(a))},
f:function(a,b){if(a==null)J.aP(a)
throw H.d(H.H(a,b))},
H:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ao(!0,b,"index",null)
z=J.aP(a)
if(!(b<0)){if(typeof z!=="number")return H.D(z)
y=b>=z}else y=!0
if(y)return P.bV(b,a,"index",null,z)
return P.aZ(b,"index",null)},
Q:function(a){return new P.ao(!0,a,null,null)},
a3:function(a){return a},
cA:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.Q(a))
return a},
jU:function(a){if(typeof a!=="string")throw H.d(H.Q(a))
return a},
d:function(a){var z
if(a==null)a=new P.dv()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.ev})
z.name=""}else z.toString=H.ev
return z},
ev:function(){return J.aQ(this.dartException)},
L:function(a){throw H.d(a)},
O:function(a){throw H.d(new P.R(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.kq(a)
if(a==null)return
if(a instanceof H.bT)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.b_(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bX(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.du(v,null))}}if(a instanceof TypeError){u=$.$get$dN()
t=$.$get$dO()
s=$.$get$dP()
r=$.$get$dQ()
q=$.$get$dU()
p=$.$get$dV()
o=$.$get$dS()
$.$get$dR()
n=$.$get$dX()
m=$.$get$dW()
l=u.a5(y)
if(l!=null)return z.$1(H.bX(y,l))
else{l=t.a5(y)
if(l!=null){l.method="call"
return z.$1(H.bX(y,l))}else{l=s.a5(y)
if(l==null){l=r.a5(y)
if(l==null){l=q.a5(y)
if(l==null){l=p.a5(y)
if(l==null){l=o.a5(y)
if(l==null){l=r.a5(y)
if(l==null){l=n.a5(y)
if(l==null){l=m.a5(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.du(y,l==null?null:l.method))}}return z.$1(new H.iD(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dE()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ao(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dE()
return a},
N:function(a){var z
if(a instanceof H.bT)return a.b
if(a==null)return new H.e6(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.e6(a,null)},
kk:function(a){if(a==null||typeof a!='object')return J.I(a)
else return H.ag(a)},
em:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
kb:function(a,b,c,d,e,f,g){var z=J.p(c)
if(z.u(c,0))return H.b2(b,new H.kc(a))
else if(z.u(c,1))return H.b2(b,new H.kd(a,d))
else if(z.u(c,2))return H.b2(b,new H.ke(a,d,e))
else if(z.u(c,3))return H.b2(b,new H.kf(a,d,e,f))
else if(z.u(c,4))return H.b2(b,new H.kg(a,d,e,f,g))
else throw H.d(P.bd("Unsupported number of arguments for wrapped closure"))},
aN:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.kb)
a.$identity=z
return z},
fo:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isl){z.$reflectionInfo=c
x=H.hG(z).r}else x=c
w=d?Object.create(new H.hU().constructor.prototype):Object.create(new H.bP(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a5
$.a5=J.y(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cZ(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.k4(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cX:H.bQ
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cZ(a,o,t)
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
cZ:function(a,b,c){var z,y,x,w,v,u
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
$.a5=J.y(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aE
if(v==null){v=H.bb("self")
$.aE=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.a5
$.a5=J.y(w,1)
return new Function(v+H.b(w)+"}")()},
fm:function(a,b,c,d){var z,y
z=H.bQ
y=H.cX
switch(b?-1:a){case 0:throw H.d(new H.hJ("Intercepted function with no arguments."))
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
y=$.cW
if(y==null){y=H.bb("receiver")
$.cW=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fm(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.a5
$.a5=J.y(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.a5
$.a5=J.y(u,1)
return new Function(y+H.b(u)+"}")()},
cB:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.fo(a,b,z,!!d,e,f)},
kp:function(a){throw H.d(new P.fv("Cyclic initialization for static "+H.b(a)))},
aA:function(a,b,c){return new H.hK(a,b,c,null)},
b4:function(){return C.x},
bJ:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
k:function(a,b,c){var z
if(b===0){J.eI(c,a)
return}else if(b===1){c.cL(H.B(a),H.N(a))
return}if(!!J.p(a).$isa1)z=a
else{z=H.e(new P.G(0,$.o,null),[null])
z.aG(a)}z.ba(H.eg(b,0),new H.jQ(b))
return c.gfg()},
eg:function(a,b){return new H.jO(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
e:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bF:function(a){if(a==null)return
return a.$builtinTypeInfo},
en:function(a,b){return H.cK(a["$as"+H.b(b)],H.bF(a))},
X:function(a,b,c){var z=H.en(a,b)
return z==null?null:z[c]},
C:function(a,b){var z=H.bF(a)
return z==null?null:z[b]},
cJ:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cF(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.k(a)
else return},
cF:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bv("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.cJ(u,c))}return w?"":"<"+H.b(z)+">"},
cK:function(a,b){if(typeof a=="function"){a=H.cE(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cE(a,null,b)}return b},
jV:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bF(a)
y=J.p(a)
if(y[b]==null)return!1
return H.ej(H.cK(y[d],z),c)},
ko:function(a,b,c,d){if(a!=null&&!H.jV(a,b,c,d))throw H.d(H.fe(H.cd(a),(b.substring(3)+H.cF(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
ej:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.Y(a[y],b[y]))return!1
return!0},
bC:function(a,b,c){return H.cE(a,b,H.en(b,c))},
Y:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eo(a,b)
if('func' in a)return b.builtin$cls==="fG"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cJ(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.cJ(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ej(H.cK(v,z),x)},
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
if(!(H.Y(z,v)||H.Y(v,z)))return!1}return!0},
jP:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.Y(v,u)||H.Y(u,v)))return!1}return!0},
eo:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.Y(z,y)||H.Y(y,z)))return!1}x=a.args
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
if(!(H.Y(o,n)||H.Y(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.Y(o,n)||H.Y(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.Y(o,n)||H.Y(n,o)))return!1}}return H.jP(a.named,b.named)},
cE:function(a,b,c){return a.apply(b,c)},
m1:function(a){var z=$.cC
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
m0:function(a){return H.ag(a)},
m_:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ki:function(a){var z,y,x,w,v,u
z=$.cC.$1(a)
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
if(v==="!"){y=H.cH(x)
$.bD[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bG[z]=x
return x}if(v==="-"){u=H.cH(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.er(a,x)
if(v==="*")throw H.d(new P.cn(z))
if(init.leafTags[z]===true){u=H.cH(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.er(a,x)},
er:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bI(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cH:function(a){return J.bI(a,!1,null,!!a.$isbh)},
kj:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bI(z,!1,null,!!z.$isbh)
else return J.bI(z,c,null,null)},
k9:function(){if(!0===$.cD)return
$.cD=!0
H.ka()},
ka:function(){var z,y,x,w,v,u,t,s
$.bD=Object.create(null)
$.bG=Object.create(null)
H.k5()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.es.$1(v)
if(u!=null){t=H.kj(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
k5:function(){var z,y,x,w,v,u,t
z=C.G()
z=H.az(C.D,H.az(C.I,H.az(C.u,H.az(C.u,H.az(C.H,H.az(C.E,H.az(C.F(C.t),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cC=new H.k6(v)
$.eh=new H.k7(u)
$.es=new H.k8(t)},
az:function(a,b){return a(b)||b},
kn:function(a,b,c){return a.indexOf(b,c)>=0},
fq:{
"^":"a;",
k:function(a){return P.c0(this)},
l:function(a,b,c){return H.fr()}},
bU:{
"^":"fq;a",
aY:function(){var z=this.$map
if(z==null){z=new H.aW(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.em(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aY().h(0,b)},
N:function(a,b){this.aY().N(0,b)},
gad:function(){return this.aY().gad()},
gm:function(a){var z=this.aY()
return z.gm(z)}},
hF:{
"^":"a;a,b,c,d,e,f,r,x",
static:{hG:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hF(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
iC:{
"^":"a;a,b,c,d,e,f",
a5:function(a){var z,y,x
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
return new H.iC(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bw:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},dT:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
du:{
"^":"M;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
h7:{
"^":"M;a,b,c",
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
iD:{
"^":"M;a",
k:function(a){var z=this.a
return C.h.ga3(z)?"Error":"Error: "+z}},
kq:{
"^":"c:1;a",
$1:function(a){if(!!J.p(a).$isM)if(a.$thrownJsError==null)a.$thrownJsError=this.a
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
kc:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
kd:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ke:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
kf:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
kg:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"a;",
k:function(a){return"Closure '"+H.cd(this)+"'"},
gdl:function(){return this},
gdl:function(){return this}},
dH:{
"^":"c;"},
hU:{
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
if(z==null)y=H.ag(this.a)
else y=typeof z!=="object"?J.I(z):H.ag(z)
z=H.ag(this.b)
if(typeof y!=="number")return y.fW()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.br(z)},
static:{bQ:function(a){return a.a},cX:function(a){return a.c},fc:function(){var z=$.aE
if(z==null){z=H.bb("self")
$.aE=z}return z},bb:function(a){var z,y,x,w,v
z=new H.bP("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fd:{
"^":"M;a",
k:function(a){return this.a},
static:{fe:function(a,b){return new H.fd("CastError: Casting value of type "+H.b(a)+" to incompatible type "+H.b(b))}}},
hJ:{
"^":"M;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
dC:{
"^":"a;"},
hK:{
"^":"dC;a,b,c,d",
ak:function(a){var z=this.ed(a)
return z==null?!1:H.eo(z,this.aD())},
ed:function(a){var z=J.p(a)
return"$signature" in z?z.$signature():null},
aD:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.p(y)
if(!!x.$islK)z.void=true
else if(!x.$isd5)z.ret=y.aD()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dB(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dB(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.el(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aD()}z.named=w}return z},
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
x+=H.b(z[s].aD())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{dB:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aD())
return z}}},
d5:{
"^":"dC;",
k:function(a){return"dynamic"},
aD:function(){return}},
bT:{
"^":"a;a,a0:b<"},
jQ:{
"^":"c:6;a",
$2:function(a,b){H.eg(this.a,1).$1(new H.bT(a,b))}},
jO:{
"^":"c:1;a,b",
$1:function(a){this.b(this.a,a)}},
aW:{
"^":"a;a,b,c,d,e,f,r",
gm:function(a){return this.a},
ga3:function(a){return this.a===0},
gad:function(){return H.e(new H.h9(this),[H.C(this,0)])},
gdk:function(a){return H.bl(this.gad(),new H.h6(this),H.C(this,0),H.C(this,1))},
X:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cg(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cg(y,a)}else return this.fo(a)},
fo:function(a){var z=this.d
if(z==null)return!1
return this.aN(this.ac(z,this.aM(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ac(z,b)
return y==null?null:y.gan()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ac(x,b)
return y==null?null:y.gan()}else return this.fp(b)},
fp:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ac(z,this.aM(a))
x=this.aN(y,a)
if(x<0)return
return y[x].gan()},
l:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bv()
this.b=z}this.c9(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bv()
this.c=y}this.c9(y,b,c)}else this.fs(b,c)},
fs:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bv()
this.d=z}y=this.aM(a)
x=this.ac(z,y)
if(x==null)this.bx(z,y,[this.bw(a,b)])
else{w=this.aN(x,a)
if(w>=0)x[w].san(b)
else x.push(this.bw(a,b))}},
a8:function(a,b){if(typeof b==="string")return this.cv(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cv(this.c,b)
else return this.fq(b)},
fq:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ac(z,this.aM(a))
x=this.aN(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cE(w)
return w.gan()},
T:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
N:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.R(this))
z=z.c}},
c9:function(a,b,c){var z=this.ac(a,b)
if(z==null)this.bx(a,b,this.bw(b,c))
else z.san(c)},
cv:function(a,b){var z
if(a==null)return
z=this.ac(a,b)
if(z==null)return
this.cE(z)
this.ci(a,b)
return z.gan()},
bw:function(a,b){var z,y
z=new H.h8(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cE:function(a){var z,y
z=a.ger()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aM:function(a){return J.I(a)&0x3ffffff},
aN:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gcR(),b))return y
return-1},
k:function(a){return P.c0(this)},
ac:function(a,b){return a[b]},
bx:function(a,b,c){a[b]=c},
ci:function(a,b){delete a[b]},
cg:function(a,b){return this.ac(a,b)!=null},
bv:function(){var z=Object.create(null)
this.bx(z,"<non-identifier-key>",z)
this.ci(z,"<non-identifier-key>")
return z},
$isfT:1},
h6:{
"^":"c:1;a",
$1:function(a){return this.a.h(0,a)}},
h8:{
"^":"a;cR:a<,an:b@,c,er:d<"},
h9:{
"^":"V;a",
gm:function(a){return this.a.a},
gK:function(a){var z,y
z=this.a
y=new H.ha(z,z.r,null,null)
y.c=z.e
return y},
N:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.R(z))
y=y.c}},
$ist:1},
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
k6:{
"^":"c:1;a",
$1:function(a){return this.a(a)}},
k7:{
"^":"c:10;a",
$2:function(a,b){return this.a(a,b)}},
k8:{
"^":"c:3;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bW:function(){return new P.aH("No element")},
h1:function(){return new P.aH("Too few elements")},
b0:function(a,b,c,d){if(c-b<=32)H.hO(a,b,c,d)
else H.hN(a,b,c,d)},
hO:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.F(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.U(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
hN:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.al(c-b+1,6)
y=b+z
x=c-z
w=C.c.al(b+c,2)
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
p=n}t.l(a,y,s)
t.l(a,w,q)
t.l(a,x,o)
t.l(a,v,t.h(a,b))
t.l(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.E(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.p(i)
if(h.u(i,0))continue
if(h.ai(i,0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.aC(i)
if(h.ah(i,0)){--l
continue}else{g=l-1
if(h.ai(i,0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
l=g
m=f
break}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.b5(d.$2(j,r),0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(J.U(d.$2(j,p),0))for(;!0;)if(J.U(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.b5(d.$2(t.h(a,l),r),0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=f}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=g
break}}e=!1}h=m-1
t.l(a,b,t.h(a,h))
t.l(a,h,r)
h=l+1
t.l(a,c,t.h(a,h))
t.l(a,h,p)
H.b0(a,b,m-2,d)
H.b0(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.E(d.$2(t.h(a,m),r),0);)++m
for(;J.E(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.E(d.$2(j,r),0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(J.E(d.$2(j,p),0))for(;!0;)if(J.E(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.b5(d.$2(t.h(a,l),r),0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=f}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=g
break}}H.b0(a,m,l,d)}else H.b0(a,m,l,d)},
i4:function(a){return a.gh0()},
fp:{
"^":"dZ;a",
gm:function(a){return this.a.length},
h:function(a,b){return C.h.bE(this.a,b)},
$asdZ:function(){return[P.n]},
$asdg:function(){return[P.n]},
$asl:function(){return[P.n]}},
aG:{
"^":"V;",
gK:function(a){return new H.dh(this,this.gm(this),0,null)},
N:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.a2(0,y))
if(z!==this.gm(this))throw H.d(new P.R(this))}},
aA:function(a,b){return H.e(new H.c_(this,b),[null,null])},
bZ:function(a,b){var z,y,x
if(b){z=H.e([],[H.X(this,"aG",0)])
C.a.sm(z,this.gm(this))}else z=H.e(Array(this.gm(this)),[H.X(this,"aG",0)])
for(y=0;y<this.gm(this);++y){x=this.a2(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bY:function(a){return this.bZ(a,!0)},
$ist:1},
dh:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
C:function(){var z,y,x,w
z=this.a
y=J.F(z)
x=y.gm(z)
if(this.b!==x)throw H.d(new P.R(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a2(z,w);++this.c
return!0}},
di:{
"^":"V;a,b",
gK:function(a){var z=new H.he(null,J.b7(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gm:function(a){return J.aP(this.a)},
$asV:function(a,b){return[b]},
static:{bl:function(a,b,c,d){if(!!J.p(a).$ist)return H.e(new H.d6(a,b),[c,d])
return H.e(new H.di(a,b),[c,d])}}},
d6:{
"^":"di;a,b",
$ist:1},
he:{
"^":"h2;a,b,c",
C:function(){var z=this.b
if(z.C()){this.a=this.bs(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
bs:function(a){return this.c.$1(a)}},
c_:{
"^":"aG;a,b",
gm:function(a){return J.aP(this.a)},
a2:function(a,b){return this.bs(J.eO(this.a,b))},
bs:function(a){return this.b.$1(a)},
$asaG:function(a,b){return[b]},
$asV:function(a,b){return[b]},
$ist:1},
d8:{
"^":"a;"},
iE:{
"^":"a;",
l:function(a,b,c){throw H.d(new P.T("Cannot modify an unmodifiable list"))},
$isl:1,
$asl:null,
$ist:1},
dZ:{
"^":"dg+iE;",
$isl:1,
$asl:null,
$ist:1}}],["","",,H,{
"^":"",
el:function(a){var z=H.e(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
iG:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jR()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aN(new P.iI(z),1)).observe(y,{childList:true})
return new P.iH(z,y,x)}else if(self.setImmediate!=null)return P.jS()
return P.jT()},
lM:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aN(new P.iJ(a),0))},"$1","jR",2,0,5],
lN:[function(a){++init.globalState.f.b
self.setImmediate(H.aN(new P.iK(a),0))},"$1","jS",2,0,5],
lO:[function(a){P.ch(C.r,a)},"$1","jT",2,0,5],
eb:function(a,b){var z=H.b4()
z=H.aA(z,[z,z]).ak(a)
if(z){b.toString
return a}else{b.toString
return a}},
fH:function(a,b){var z=H.e(new P.G(0,$.o,null),[b])
P.cg(C.r,new P.fK(a,z))
return z},
fI:function(a,b,c){var z=new P.G(0,$.o,null)
z.$builtinTypeInfo=[c]
P.cg(a,new P.fJ(b,z))
return z},
Z:function(a){return H.e(new P.cq(H.e(new P.G(0,$.o,null),[a])),[a])},
e8:function(a,b,c){$.o.toString
a.a1(b,c)},
jK:function(){var z,y
for(;z=$.ax,z!=null;){$.aL=null
y=z.c
$.ax=y
if(y==null)$.aK=null
$.o=z.b
z.eJ()}},
lZ:[function(){$.cx=!0
try{P.jK()}finally{$.o=C.d
$.aL=null
$.cx=!1
if($.ax!=null)$.$get$cr().$1(P.ek())}},"$0","ek",0,0,2],
ef:function(a){if($.ax==null){$.aK=a
$.ax=a
if(!$.cx)$.$get$cr().$1(P.ek())}else{$.aK.c=a
$.aK=a}},
et:function(a){var z,y
z=$.o
if(C.d===z){P.ay(null,null,C.d,a)
return}z.toString
if(C.d.gbJ()===z){P.ay(null,null,z,a)
return}y=$.o
P.ay(null,null,y,y.bz(a,!0))},
lz:function(a,b){var z,y,x
z=H.e(new P.e7(null,null,null,0),[b])
y=z.gem()
x=z.geo()
z.a=a.ao(y,!0,z.gen(),x)
return z},
jM:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.B(u)
z=t
y=H.N(u)
$.o.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.a9(x)
w=t
v=x.ga0()
c.$2(w,v)}}},
jD:function(a,b,c,d){var z=a.bB()
if(!!J.p(z).$isa1)z.c0(new P.jG(b,c,d))
else b.a1(c,d)},
jE:function(a,b){return new P.jF(a,b)},
cg:function(a,b){var z=$.o
if(z===C.d){z.toString
return P.ch(a,b)}return P.ch(a,z.bz(b,!0))},
ch:function(a,b){var z=C.c.al(a.a,1000)
return H.i7(z<0?0:z,b)},
cp:function(a){var z=$.o
$.o=a
return z},
b3:function(a,b,c,d,e){var z,y,x
z=new P.e0(new P.jL(d,e),C.d,null)
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
if($.o===c)return d.$0()
z=P.cp(c)
try{y=d.$0()
return y}finally{$.o=z}},
ee:function(a,b,c,d,e){var z,y
if($.o===c)return d.$1(e)
z=P.cp(c)
try{y=d.$1(e)
return y}finally{$.o=z}},
ed:function(a,b,c,d,e,f){var z,y
if($.o===c)return d.$2(e,f)
z=P.cp(c)
try{y=d.$2(e,f)
return y}finally{$.o=z}},
ay:function(a,b,c,d){var z=C.d!==c
if(z){d=c.bz(d,!(!z||C.d.gbJ()===c))
c=C.d}P.ef(new P.e0(d,c,null))},
iI:{
"^":"c:1;a",
$1:function(a){var z,y
H.bH()
z=this.a
y=z.a
z.a=null
y.$0()}},
iH:{
"^":"c:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iJ:{
"^":"c:0;a",
$0:function(){H.bH()
this.a.$0()}},
iK:{
"^":"c:0;a",
$0:function(){H.bH()
this.a.$0()}},
jx:{
"^":"ad;a,b",
k:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{jy:function(a,b){if(b!=null)return b
if(!!J.p(a).$isM)return a.ga0()
return}}},
a1:{
"^":"a;"},
fK:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.aj(this.a.$0())}catch(x){w=H.B(x)
z=w
y=H.N(x)
P.e8(this.b,z,y)}}},
fJ:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.aj(null)}catch(x){w=H.B(x)
z=w
y=H.N(x)
P.e8(this.b,z,y)}}},
iO:{
"^":"a;fg:a<",
cL:function(a,b){a=a!=null?a:new P.dv()
if(this.a.a!==0)throw H.d(new P.aH("Future already completed"))
$.o.toString
this.a1(a,b)},
cK:function(a){return this.cL(a,null)}},
cq:{
"^":"iO;a",
b4:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.aH("Future already completed"))
z.aG(b)},
a1:function(a,b){this.a.e8(a,b)}},
aI:{
"^":"a;cp:a<,fL:b>,c,d,e",
gau:function(){return this.b.b},
gcQ:function(){return(this.c&1)!==0},
gfm:function(){return this.c===6},
gfl:function(){return this.c===8},
geq:function(){return this.d},
gez:function(){return this.d}},
G:{
"^":"a;b0:a?,au:b<,c",
gej:function(){return this.a===8},
sek:function(a){if(a)this.a=2
else this.a=0},
ba:function(a,b){var z,y
z=H.e(new P.G(0,$.o,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.eb(b,y)}this.bj(new P.aI(null,z,b==null?1:3,a,b))
return z},
W:function(a){return this.ba(a,null)},
c0:function(a){var z,y
z=$.o
y=new P.G(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.bj(new P.aI(null,y,8,a,null))
return y},
bu:function(){if(this.a!==0)throw H.d(new P.aH("Future already completed"))
this.a=1},
gey:function(){return this.c},
gaH:function(){return this.c},
cD:function(a){this.a=4
this.c=a},
cC:function(a){this.a=8
this.c=a},
ew:function(a,b){this.cC(new P.ad(a,b))},
bj:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ay(null,null,z,new P.iY(this,a))}else{a.a=this.c
this.c=a}},
aZ:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gcp()
z.a=y}return y},
aj:function(a){var z,y
z=J.p(a)
if(!!z.$isa1)if(!!z.$isG)P.by(a,this)
else P.cu(a,this)
else{y=this.aZ()
this.cD(a)
P.al(this,y)}},
cf:function(a){var z=this.aZ()
this.cD(a)
P.al(this,z)},
a1:[function(a,b){var z=this.aZ()
this.cC(new P.ad(a,b))
P.al(this,z)},function(a){return this.a1(a,null)},"fX","$2","$1","gbp",2,2,12,0],
aG:function(a){var z
if(a==null);else{z=J.p(a)
if(!!z.$isa1){if(!!z.$isG){z=a.a
if(z>=4&&z===8){this.bu()
z=this.b
z.toString
P.ay(null,null,z,new P.j_(this,a))}else P.by(a,this)}else P.cu(a,this)
return}}this.bu()
z=this.b
z.toString
P.ay(null,null,z,new P.j0(this,a))},
e8:function(a,b){var z
this.bu()
z=this.b
z.toString
P.ay(null,null,z,new P.iZ(this,a,b))},
$isa1:1,
static:{cu:function(a,b){var z,y,x,w
b.sb0(2)
try{a.ba(new P.j1(b),new P.j2(b))}catch(x){w=H.B(x)
z=w
y=H.N(x)
P.et(new P.j3(b,z,y))}},by:function(a,b){var z
b.a=2
z=new P.aI(null,b,0,null,null)
if(a.a>=4)P.al(a,z)
else a.bj(z)},al:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gej()
if(b==null){if(w){v=z.a.gaH()
y=z.a.gau()
x=J.a9(v)
u=v.ga0()
y.toString
P.b3(null,null,y,x,u)}return}for(;b.gcp()!=null;b=t){t=b.a
b.a=null
P.al(z.a,b)}x.a=!0
s=w?null:z.a.gey()
x.b=s
x.c=!1
y=!w
if(!y||b.gcQ()||b.c===8){r=b.gau()
if(w){u=z.a.gau()
u.toString
if(u==null?r!=null:u!==r){u=u.gbJ()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaH()
y=z.a.gau()
x=J.a9(v)
u=v.ga0()
y.toString
P.b3(null,null,y,x,u)
return}q=$.o
if(q==null?r!=null:q!==r)$.o=r
else q=null
if(y){if(b.gcQ())x.a=new P.j5(x,b,s,r).$0()}else new P.j4(z,x,b,r).$0()
if(b.gfl())new P.j6(z,x,w,b,r).$0()
if(q!=null)$.o=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.p(y).$isa1}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.G)if(p.a>=4){o.a=2
z.a=p
b=new P.aI(null,o,0,null,null)
y=p
continue}else P.by(p,o)
else P.cu(p,o)
return}}o=b.b
b=o.aZ()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
iY:{
"^":"c:0;a,b",
$0:function(){P.al(this.a,this.b)}},
j1:{
"^":"c:1;a",
$1:function(a){this.a.cf(a)}},
j2:{
"^":"c:7;a",
$2:function(a,b){this.a.a1(a,b)},
$1:function(a){return this.$2(a,null)}},
j3:{
"^":"c:0;a,b,c",
$0:function(){this.a.a1(this.b,this.c)}},
j_:{
"^":"c:0;a,b",
$0:function(){P.by(this.b,this.a)}},
j0:{
"^":"c:0;a,b",
$0:function(){this.a.cf(this.b)}},
iZ:{
"^":"c:0;a,b,c",
$0:function(){this.a.a1(this.b,this.c)}},
j5:{
"^":"c:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.b9(this.b.geq(),this.c)
return!0}catch(x){w=H.B(x)
z=w
y=H.N(x)
this.a.b=new P.ad(z,y)
return!1}}},
j4:{
"^":"c:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaH()
y=!0
r=this.c
if(r.gfm()){x=r.d
try{y=this.d.b9(x,J.a9(z))}catch(q){r=H.B(q)
w=r
v=H.N(q)
r=J.a9(z)
p=w
o=(r==null?p==null:r===p)?z:new P.ad(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.b4()
p=H.aA(p,[p,p]).ak(r)
n=this.d
m=this.b
if(p)m.b=n.fM(u,J.a9(z),z.ga0())
else m.b=n.b9(u,J.a9(z))}catch(q){r=H.B(q)
t=r
s=H.N(q)
r=J.a9(z)
p=t
o=(r==null?p==null:r===p)?z:new P.ad(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
j6:{
"^":"c:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.dd(this.d.gez())
z.a=w
v=w}catch(u){z=H.B(u)
y=z
x=H.N(u)
if(this.c){z=J.a9(this.a.a.gaH())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaH()
else v.b=new P.ad(y,x)
v.a=!1
return}if(!!J.p(v).$isa1){t=this.d
s=t.gfL(t)
s.sek(!0)
this.b.c=!0
v.ba(new P.j7(this.a,s),new P.j8(z,s))}}},
j7:{
"^":"c:1;a,b",
$1:function(a){P.al(this.a.a,new P.aI(null,this.b,0,null,null))}},
j8:{
"^":"c:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.G)){y=H.e(new P.G(0,$.o,null),[null])
z.a=y
y.ew(a,b)}P.al(z.a,new P.aI(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
e0:{
"^":"a;a,b,c",
eJ:function(){return this.a.$0()}},
aj:{
"^":"a;",
aA:function(a,b){return H.e(new P.jm(b,this),[H.X(this,"aj",0),null])},
N:function(a,b){var z,y
z={}
y=H.e(new P.G(0,$.o,null),[null])
z.a=null
z.a=this.ao(new P.hY(z,this,b,y),!0,new P.hZ(y),y.gbp())
return y},
gm:function(a){var z,y
z={}
y=H.e(new P.G(0,$.o,null),[P.n])
z.a=0
this.ao(new P.i_(z),!0,new P.i0(z,y),y.gbp())
return y},
bY:function(a){var z,y
z=H.e([],[H.X(this,"aj",0)])
y=H.e(new P.G(0,$.o,null),[[P.l,H.X(this,"aj",0)]])
this.ao(new P.i1(this,z),!0,new P.i2(z,y),y.gbp())
return y}},
hY:{
"^":"c;a,b,c,d",
$1:function(a){P.jM(new P.hW(this.c,a),new P.hX(),P.jE(this.a.a,this.d))},
$signature:function(){return H.bC(function(a){return{func:1,args:[a]}},this.b,"aj")}},
hW:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
hX:{
"^":"c:1;",
$1:function(a){}},
hZ:{
"^":"c:0;a",
$0:function(){this.a.aj(null)}},
i_:{
"^":"c:1;a",
$1:function(a){++this.a.a}},
i0:{
"^":"c:0;a,b",
$0:function(){this.b.aj(this.a.a)}},
i1:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bC(function(a){return{func:1,args:[a]}},this.a,"aj")}},
i2:{
"^":"c:0;a,b",
$0:function(){this.b.aj(this.a)}},
hV:{
"^":"a;"},
lS:{
"^":"a;"},
iL:{
"^":"a;au:d<,b0:e?",
bT:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cI()
if((z&4)===0&&(this.e&32)===0)this.cm(this.gcr())},
aQ:function(a){return this.bT(a,null)},
d9:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.ga3(z)}else z=!1
if(z)this.r.bf(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cm(this.gct())}}}},
bB:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bm()
return this.f},
bm:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cI()
if((this.e&32)===0)this.r=null
this.f=this.cq()},
bl:["dQ",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cz(a)
else this.bk(new P.iR(a,null))}],
bi:["dR",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cB(a,b)
else this.bk(new P.iT(a,b,null))}],
e7:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cA()
else this.bk(C.z)},
cs:[function(){},"$0","gcr",0,0,2],
cu:[function(){},"$0","gct",0,0,2],
cq:function(){return},
bk:function(a){var z,y
z=this.r
if(z==null){z=new P.jw(null,null,0)
this.r=z}z.av(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bf(this)}},
cz:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bX(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bn((z&4)!==0)},
cB:function(a,b){var z,y
z=this.e
y=new P.iN(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bm()
z=this.f
if(!!J.p(z).$isa1)z.c0(y)
else y.$0()}else{y.$0()
this.bn((z&4)!==0)}},
cA:function(){var z,y
z=new P.iM(this)
this.bm()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.p(y).$isa1)y.c0(z)
else z.$0()},
cm:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bn((z&4)!==0)},
bn:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.ga3(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.ga3(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cs()
else this.cu()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bf(this)},
e3:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.eb(b,z)
this.c=c}},
iN:{
"^":"c:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.b4()
x=H.aA(x,[x,x]).ak(y)
w=z.d
v=this.b
u=z.b
if(x)w.fN(u,v,this.c)
else w.bX(u,v)
z.e=(z.e&4294967263)>>>0}},
iM:{
"^":"c:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.de(z.c)
z.e=(z.e&4294967263)>>>0}},
e2:{
"^":"a;b7:a@"},
iR:{
"^":"e2;b,a",
bU:function(a){a.cz(this.b)}},
iT:{
"^":"e2;aK:b>,a0:c<,a",
bU:function(a){a.cB(this.b,this.c)}},
iS:{
"^":"a;",
bU:function(a){a.cA()},
gb7:function(){return},
sb7:function(a){throw H.d(new P.aH("No events after a done."))}},
jo:{
"^":"a;b0:a?",
bf:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.et(new P.jp(this,a))
this.a=1},
cI:function(){if(this.a===1)this.a=3}},
jp:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.fi(this.b)}},
jw:{
"^":"jo;b,c,a",
ga3:function(a){return this.c==null},
av:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sb7(b)
this.c=b}},
fi:function(a){var z,y
z=this.b
y=z.gb7()
this.b=y
if(y==null)this.c=null
z.bU(a)}},
e7:{
"^":"a;a,b,c,b0:d?",
cb:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
h1:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.aj(!0)
return}this.a.aQ(0)
this.c=a
this.d=3},"$1","gem",2,0,function(){return H.bC(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"e7")}],
ep:[function(a,b){var z
if(this.d===2){z=this.c
this.cb(0)
z.a1(a,b)
return}this.a.aQ(0)
this.c=new P.ad(a,b)
this.d=4},function(a){return this.ep(a,null)},"h3","$2","$1","geo",2,2,14,0],
h2:[function(){if(this.d===2){var z=this.c
this.cb(0)
z.aj(!1)
return}this.a.aQ(0)
this.c=null
this.d=5},"$0","gen",0,0,2]},
jG:{
"^":"c:0;a,b,c",
$0:function(){return this.a.a1(this.b,this.c)}},
jF:{
"^":"c:6;a,b",
$2:function(a,b){return P.jD(this.a,this.b,a,b)}},
ct:{
"^":"aj;",
ao:function(a,b,c,d){return this.ec(a,d,c,!0===b)},
cU:function(a,b,c){return this.ao(a,null,b,c)},
ec:function(a,b,c,d){return P.iX(this,a,b,c,d,H.X(this,"ct",0),H.X(this,"ct",1))},
cn:function(a,b){b.bl(a)},
$asaj:function(a,b){return[b]}},
e3:{
"^":"iL;x,y,a,b,c,d,e,f,r",
bl:function(a){if((this.e&2)!==0)return
this.dQ(a)},
bi:function(a,b){if((this.e&2)!==0)return
this.dR(a,b)},
cs:[function(){var z=this.y
if(z==null)return
z.aQ(0)},"$0","gcr",0,0,2],
cu:[function(){var z=this.y
if(z==null)return
z.d9()},"$0","gct",0,0,2],
cq:function(){var z=this.y
if(z!=null){this.y=null
z.bB()}return},
fY:[function(a){this.x.cn(a,this)},"$1","gef",2,0,function(){return H.bC(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"e3")}],
h_:[function(a,b){this.bi(a,b)},"$2","geh",4,0,15],
fZ:[function(){this.e7()},"$0","geg",0,0,2],
e4:function(a,b,c,d,e,f,g){var z,y
z=this.gef()
y=this.geh()
this.y=this.x.a.cU(z,this.geg(),y)},
static:{iX:function(a,b,c,d,e,f,g){var z=$.o
z=H.e(new P.e3(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.e3(b,c,d,e)
z.e4(a,b,c,d,e,f,g)
return z}}},
jm:{
"^":"ct;b,a",
cn:function(a,b){var z,y,x,w,v
z=null
try{z=this.ex(a)}catch(w){v=H.B(w)
y=v
x=H.N(w)
$.o.toString
b.bi(y,x)
return}b.bl(z)},
ex:function(a){return this.b.$1(a)}},
ad:{
"^":"a;aK:a>,a0:b<",
k:function(a){return H.b(this.a)},
$isM:1},
jC:{
"^":"a;"},
jL:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.d(new P.jx(z,P.jy(z,this.b)))}},
jr:{
"^":"jC;",
gbJ:function(){return this},
de:function(a){var z,y,x,w
try{if(C.d===$.o){x=a.$0()
return x}x=P.ec(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.N(w)
return P.b3(null,null,this,z,y)}},
bX:function(a,b){var z,y,x,w
try{if(C.d===$.o){x=a.$1(b)
return x}x=P.ee(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.N(w)
return P.b3(null,null,this,z,y)}},
fN:function(a,b,c){var z,y,x,w
try{if(C.d===$.o){x=a.$2(b,c)
return x}x=P.ed(null,null,this,a,b,c)
return x}catch(w){x=H.B(w)
z=x
y=H.N(w)
return P.b3(null,null,this,z,y)}},
bz:function(a,b){if(b)return new P.js(this,a)
else return new P.jt(this,a)},
eF:function(a,b){if(b)return new P.ju(this,a)
else return new P.jv(this,a)},
h:function(a,b){return},
dd:function(a){if($.o===C.d)return a.$0()
return P.ec(null,null,this,a)},
b9:function(a,b){if($.o===C.d)return a.$1(b)
return P.ee(null,null,this,a,b)},
fM:function(a,b,c){if($.o===C.d)return a.$2(b,c)
return P.ed(null,null,this,a,b,c)}},
js:{
"^":"c:0;a,b",
$0:function(){return this.a.de(this.b)}},
jt:{
"^":"c:0;a,b",
$0:function(){return this.a.dd(this.b)}},
ju:{
"^":"c:1;a,b",
$1:function(a){return this.a.bX(this.b,a)}},
jv:{
"^":"c:1;a,b",
$1:function(a){return this.a.b9(this.b,a)}}}],["","",,P,{
"^":"",
at:function(){return H.e(new H.aW(0,null,null,null,null,null,0),[null,null])},
au:function(a){return H.em(a,H.e(new H.aW(0,null,null,null,null,null,0),[null,null]))},
h0:function(a,b,c){var z,y
if(P.cy(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aM()
y.push(a)
try{P.jJ(a,z)}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=P.dF(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
be:function(a,b,c){var z,y,x
if(P.cy(a))return b+"..."+c
z=new P.bv(b)
y=$.$get$aM()
y.push(a)
try{x=z
x.a=P.dF(x.gar(),a,", ")}finally{if(0>=y.length)return H.f(y,0)
y.pop()}y=z
y.a=y.gar()+c
y=z.gar()
return y.charCodeAt(0)==0?y:y},
cy:function(a){var z,y
for(z=0;y=$.$get$aM(),z<y.length;++z)if(a===y[z])return!0
return!1},
jJ:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gK(a)
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
as:function(a,b){return P.jh(a,b)},
aF:function(a,b,c,d){return H.e(new P.je(0,null,null,null,null,null,0),[d])},
c0:function(a){var z,y,x
z={}
if(P.cy(a))return"{...}"
y=new P.bv("")
try{$.$get$aM().push(a)
x=y
x.a=x.gar()+"{"
z.a=!0
J.eP(a,new P.hf(z,y))
z=y
z.a=z.gar()+"}"}finally{z=$.$get$aM()
if(0>=z.length)return H.f(z,0)
z.pop()}z=y.gar()
return z.charCodeAt(0)==0?z:z},
jg:{
"^":"aW;a,b,c,d,e,f,r",
aM:function(a){return H.kk(a)&0x3ffffff},
aN:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcR()
if(x==null?b==null:x===b)return y}return-1},
static:{jh:function(a,b){return H.e(new P.jg(0,null,null,null,null,null,0),[a,b])}}},
je:{
"^":"j9;a,b,c,d,e,f,r",
gK:function(a){var z=new P.df(this,this.r,null,null)
z.c=this.e
return z},
gm:function(a){return this.a},
eT:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eb(b)},
eb:function(a){var z=this.d
if(z==null)return!1
return this.aX(z[this.aW(a)],a)>=0},
cV:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.eT(0,a)?a:null
else return this.el(a)},
el:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aW(a)]
x=this.aX(y,a)
if(x<0)return
return J.bL(y,x).gcj()},
N:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.R(this))
z=z.b}},
av:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cc(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cc(x,b)}else return this.af(b)},
af:function(a){var z,y,x
z=this.d
if(z==null){z=P.jf()
this.d=z}y=this.aW(a)
x=z[y]
if(x==null)z[y]=[this.bo(a)]
else{if(this.aX(x,a)>=0)return!1
x.push(this.bo(a))}return!0},
a8:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cd(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cd(this.c,b)
else return this.eu(b)},
eu:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aW(a)]
x=this.aX(y,a)
if(x<0)return!1
this.ce(y.splice(x,1)[0])
return!0},
T:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cc:function(a,b){if(a[b]!=null)return!1
a[b]=this.bo(b)
return!0},
cd:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ce(z)
delete a[b]
return!0},
bo:function(a){var z,y
z=new P.hb(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ce:function(a){var z,y
z=a.gea()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aW:function(a){return J.I(a)&0x3ffffff},
aX:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gcj(),b))return y
return-1},
$ist:1,
static:{jf:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
hb:{
"^":"a;cj:a<,b,ea:c<"},
df:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.R(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
j9:{
"^":"hL;"},
dg:{
"^":"hn;"},
hn:{
"^":"a+bk;",
$isl:1,
$asl:null,
$ist:1},
bk:{
"^":"a;",
gK:function(a){return new H.dh(a,this.gm(a),0,null)},
a2:function(a,b){return this.h(a,b)},
N:function(a,b){var z,y
z=this.gm(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gm(a))throw H.d(new P.R(a))}},
aA:function(a,b){return H.e(new H.c_(a,b),[null,null])},
k:function(a){return P.be(a,"[","]")},
$isl:1,
$asl:null,
$ist:1},
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
gK:function(a){return new P.ji(this,this.c,this.d,this.b,null)},
N:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.L(new P.R(this))}},
ga3:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
T:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.be(this,"{","}")},
d8:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.bW());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
af:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cl();++this.d},
cl:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,[H.C(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.c5(y,0,w,z,x)
C.a.c5(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dV:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$ist:1,
static:{bY:function(a,b){var z=H.e(new P.hc(null,0,0,0),[b])
z.dV(a,b)
return z}}},
ji:{
"^":"a;a,b,c,d,e",
gG:function(){return this.e},
C:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.L(new P.R(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
hM:{
"^":"a;",
aA:function(a,b){return H.e(new H.d6(this,b),[H.C(this,0),null])},
k:function(a){return P.be(this,"{","}")},
N:function(a,b){var z
for(z=this.gK(this);z.C();)b.$1(z.d)},
$ist:1},
hL:{
"^":"hM;"}}],["","",,P,{
"^":"",
bA:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.jc(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bA(a[z])
return a},
ea:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.d(H.Q(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.B(w)
y=x
throw H.d(new P.aq(String(y),null,null))}return P.bA(z)},
jc:{
"^":"a;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.es(b):y}},
gm:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.aq().length
return z},
gad:function(){if(this.b==null)return this.c.gad()
return new P.jd(this)},
l:function(a,b,c){var z,y
if(this.b==null)this.c.l(0,b,c)
else if(this.X(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.cG().l(0,b,c)},
X:function(a){if(this.b==null)return this.c.X(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
a8:function(a,b){if(this.b!=null&&!this.X(b))return
return this.cG().a8(0,b)},
N:function(a,b){var z,y,x,w
if(this.b==null)return this.c.N(0,b)
z=this.aq()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bA(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.d(new P.R(this))}},
k:function(a){return P.c0(this)},
aq:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
cG:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.at()
y=this.aq()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.l(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sm(y,0)
this.b=null
this.a=null
this.c=z
return z},
es:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bA(this.a[a])
return this.b[a]=z}},
jd:{
"^":"aG;a",
gm:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gm(z)}else z=z.aq().length
return z},
a2:function(a,b){var z=this.a
if(z.b==null)z=z.gad().a2(0,b)
else{z=z.aq()
if(b<0||b>=z.length)return H.f(z,b)
z=z[b]}return z},
gK:function(a){var z=this.a
if(z.b==null){z=z.gad()
z=z.gK(z)}else{z=z.aq()
z=new J.cV(z,z.length,0,null)}return z},
$asaG:I.aB,
$asV:I.aB},
fs:{
"^":"a;"},
iF:{
"^":"fs;a",
bG:function(a,b,c){var z,y,x,w
z=a.length
P.bt(b,c,z,null,null,null)
y=new P.bv("")
x=this.a
w=new P.jz(x,y,!0,0,0,0)
w.bG(a,b,z)
if(w.e>0){if(!x)H.L(new P.aq("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.bs(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
eW:function(a){return this.bG(a,0,null)}},
jz:{
"^":"a;a,b,c,d,e,f",
bG:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.jB(c)
v=new P.jA(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=a.length,r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
if(r>>>0!==r||r>=s)return H.f(a,r)
q=a[r]
if((q&192)!==128){if(t)throw H.d(new P.aq("Bad UTF-8 encoding 0x"+C.c.bb(q,16),null,null))
this.c=!1
u.a+=H.bs(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.f(C.v,p)
if(z<=C.v[p]){if(t)throw H.d(new P.aq("Overlong encoding of 0x"+C.c.bb(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.d(new P.aq("Character outside valid Unicode range: 0x"+C.c.bb(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.bs(z)
this.c=!1}for(;r<c;r=n,z=65533,y=0,x=0){o=w.$2(a,r)
if(J.U(o,0)){this.c=!1
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
continue $loop$0}if(t)throw H.d(new P.aq("Bad UTF-8 encoding 0x"+C.c.bb(q,16),null,null))
this.c=!1
u.a+=H.bs(65533)}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
jB:{
"^":"c:17;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=a.length,x=b;x<z;++x){if(x<0||x>=y)return H.f(a,x)
w=a[x]
if((w&127)!==w)return x-b}return z-b}},
jA:{
"^":"c:18;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.i3(this.b,a,b)}}}],["","",,P,{
"^":"",
jN:function(a){return H.i4(a)},
kB:[function(a,b){return J.eH(a,b)},"$2","k3",4,0,27],
bS:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aQ(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fD(a)},
fD:function(a){var z=J.p(a)
if(!!z.$isc)return z.k(a)
return H.br(a)},
bd:function(a){return new P.iW(a)},
bZ:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.b7(a);y.C();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
a4:function(a){var z=H.b(a)
H.cI(z)},
i3:function(a,b,c){return H.hB(a,b,P.bt(b,c,a.length,null,null,null))},
ln:{
"^":"c:19;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.jN(a)}},
cz:{
"^":"a;"},
"+bool":0,
P:{
"^":"a;"},
bR:{
"^":"a;fB:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.bR))return!1
return this.a===b.a&&this.b===b.b},
aw:function(a,b){return C.c.aw(this.a,b.gfB())},
gE:function(a){return this.a},
k:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.fx(z?H.S(this).getUTCFullYear()+0:H.S(this).getFullYear()+0)
x=P.aS(z?H.S(this).getUTCMonth()+1:H.S(this).getMonth()+1)
w=P.aS(z?H.S(this).getUTCDate()+0:H.S(this).getDate()+0)
v=P.aS(z?H.S(this).getUTCHours()+0:H.S(this).getHours()+0)
u=P.aS(z?H.S(this).getUTCMinutes()+0:H.S(this).getMinutes()+0)
t=P.aS(z?H.S(this).getUTCSeconds()+0:H.S(this).getSeconds()+0)
s=P.fy(H.dy(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
dU:function(a,b){if(Math.abs(a)>864e13)throw H.d(P.aR(a))},
$isP:1,
$asP:I.aB,
static:{fw:function(a,b){var z=new P.bR(a,b)
z.dU(a,b)
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
ae:{
"^":"a;as:a<",
n:function(a,b){return new P.ae(C.c.n(this.a,b.gas()))},
R:function(a,b){return new P.ae(C.c.R(this.a,b.gas()))},
t:function(a,b){return new P.ae(C.c.L(this.a*b))},
ai:function(a,b){return C.c.ai(this.a,b.gas())},
ah:function(a,b){return C.c.ah(this.a,b.gas())},
be:function(a,b){return C.c.be(this.a,b.gas())},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.ae))return!1
return this.a===b.a},
gE:function(a){return this.a&0x1FFFFFFF},
aw:function(a,b){return C.c.aw(this.a,b.gas())},
k:function(a){var z,y,x,w,v
z=new P.fC()
y=this.a
if(y<0)return"-"+new P.ae(-y).k(0)
x=z.$1(C.c.bV(C.c.al(y,6e7),60))
w=z.$1(C.c.bV(C.c.al(y,1e6),60))
v=new P.fB().$1(C.c.bV(y,1e6))
return""+C.c.al(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isP:1,
$asP:function(){return[P.ae]}},
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
M:{
"^":"a;",
ga0:function(){return H.N(this.$thrownJsError)}},
dv:{
"^":"M;",
k:function(a){return"Throw of null."}},
ao:{
"^":"M;a,b,c,d",
gbr:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbq:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gbr()+y+x
if(!this.a)return w
v=this.gbq()
u=P.bS(this.b)
return w+v+": "+H.b(u)},
static:{aR:function(a){return new P.ao(!1,null,null,a)},f7:function(a,b,c){return new P.ao(!0,a,b,c)}}},
cf:{
"^":"ao;e,f,a,b,c,d",
gbr:function(){return"RangeError"},
gbq:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.ah()
if(typeof z!=="number")return H.D(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{hC:function(a){return new P.cf(null,null,!1,null,null,a)},aZ:function(a,b,c){return new P.cf(null,null,!0,a,b,"Value not in range")},ah:function(a,b,c,d,e){return new P.cf(b,c,!0,a,d,"Invalid value")},bt:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.ah(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.ah(b,a,c,"end",f))
return b}return c}}},
fP:{
"^":"ao;e,m:f>,a,b,c,d",
gbr:function(){return"RangeError"},
gbq:function(){P.bS(this.e)
var z=": index should be less than "+H.b(this.f)
return J.b5(this.b,0)?": index must not be negative":z},
static:{bV:function(a,b,c,d,e){var z=e!=null?e:J.aP(b)
return new P.fP(b,z,!0,a,c,"Index out of range")}}},
T:{
"^":"M;a",
k:function(a){return"Unsupported operation: "+this.a}},
cn:{
"^":"M;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
aH:{
"^":"M;a",
k:function(a){return"Bad state: "+this.a}},
R:{
"^":"M;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bS(z))+"."}},
hp:{
"^":"a;",
k:function(a){return"Out of Memory"},
ga0:function(){return},
$isM:1},
dE:{
"^":"a;",
k:function(a){return"Stack Overflow"},
ga0:function(){return},
$isM:1},
fv:{
"^":"M;a",
k:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
iW:{
"^":"a;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
aq:{
"^":"a;a,b,V:c>",
k:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.b(z):"FormatException"
return y}},
fE:{
"^":"a;a",
k:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.bq(b,"expando$values")
return z==null?null:H.bq(z,this.ck())},
l:function(a,b,c){var z=H.bq(b,"expando$values")
if(z==null){z=new P.a()
H.ce(b,"expando$values",z)}H.ce(z,this.ck(),c)},
ck:function(){var z,y
z=H.bq(this,"expando$key")
if(z==null){y=$.d7
$.d7=y+1
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
aA:function(a,b){return H.bl(this,b,H.X(this,"V",0),null)},
N:function(a,b){var z
for(z=this.gK(this);z.C();)b.$1(z.gG())},
bZ:function(a,b){return P.bZ(this,b,H.X(this,"V",0))},
bY:function(a){return this.bZ(a,!0)},
gm:function(a){var z,y
z=this.gK(this)
for(y=0;z.C();)++y
return y},
a2:function(a,b){var z,y,x
if(b<0)H.L(P.ah(b,0,null,"index",null))
for(z=this.gK(this),y=0;z.C();){x=z.gG()
if(b===y)return x;++y}throw H.d(P.bV(b,this,"index",null,y))},
k:function(a){return P.h0(this,"(",")")}},
h2:{
"^":"a;"},
l:{
"^":"a;",
$asl:null,
$ist:1},
"+List":0,
hd:{
"^":"a;"},
lo:{
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
gE:function(a){return H.ag(this)},
k:function(a){return H.br(this)}},
ai:{
"^":"a;"},
a7:{
"^":"a;",
$isP:1,
$asP:function(){return[P.a7]}},
"+String":0,
bv:{
"^":"a;ar:a<",
gm:function(a){return this.a.length},
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
if("postMessage" in a){z=W.iQ(a)
if(!!J.p(z).$isa_)return z
return}else return a},
jI:function(a){if(!!J.p(a).$isd4)return a
return P.jZ(a,!0)},
K:function(a){var z=$.o
if(z===C.d)return a
return z.eF(a,!0)},
x:{
"^":"aT;",
$isx:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
kt:{
"^":"x;A:type=",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
kv:{
"^":"x;",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
kw:{
"^":"h;A:type=",
"%":"Blob|File"},
kx:{
"^":"x;",
gbO:function(a){return H.e(new W.z(a,"error",!1),[null])},
gbP:function(a){return H.e(new W.z(a,"load",!1),[null])},
$isa_:1,
$ish:1,
"%":"HTMLBodyElement"},
ky:{
"^":"x;A:type=",
"%":"HTMLButtonElement"},
cY:{
"^":"x;p:height%,q:width%",
c1:function(a,b,c){return a.getContext(b,P.jW(c))},
dr:function(a,b,c,d,e,f,g){var z,y
z=P.au(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.c1(a,"webgl",z)
return y==null?this.c1(a,"experimental-webgl",z):y},
dq:function(a,b){return this.dr(a,!0,!0,!0,!0,!1,b)},
$iscY:1,
"%":"HTMLCanvasElement"},
kA:{
"^":"aX;m:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
kC:{
"^":"fQ;m:length=",
c2:function(a,b){var z=this.ee(a,b)
return z!=null?z:""},
ee:function(a,b){if(W.fu(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.fz()+b)},
gp:function(a){return a.height},
gq:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fQ:{
"^":"h+ft;"},
ft:{
"^":"a;",
gp:function(a){return this.c2(a,"height")},
gq:function(a){return this.c2(a,"width")}},
d4:{
"^":"aX;",
$isd4:1,
"%":"Document|HTMLDocument|XMLDocument"},
kD:{
"^":"aX;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
kE:{
"^":"h;",
k:function(a){return String(a)},
"%":"DOMException"},
fA:{
"^":"h;bA:bottom=,p:height=,a4:left=,bW:right=,aE:top=,q:width=,i:x=,j:y=",
k:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gq(a))+" x "+H.b(this.gp(a))},
u:function(a,b){var z,y,x
if(b==null)return!1
z=J.p(b)
if(!z.$isaa)return!1
y=a.left
x=z.ga4(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaE(b)
if(y==null?x==null:y===x){y=this.gq(a)
x=z.gq(b)
if(y==null?x==null:y===x){y=this.gp(a)
z=z.gp(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gE:function(a){var z,y,x,w
z=J.I(a.left)
y=J.I(a.top)
x=J.I(this.gq(a))
w=J.I(this.gp(a))
return W.e4(W.am(W.am(W.am(W.am(0,z),y),x),w))},
gc_:function(a){return H.e(new P.W(a.left,a.top),[null])},
$isaa:1,
$asaa:I.aB,
"%":";DOMRectReadOnly"},
aT:{
"^":"aX;",
gV:function(a){return P.hE(C.b.L(a.offsetLeft),C.b.L(a.offsetTop),C.b.L(a.offsetWidth),C.b.L(a.offsetHeight),null)},
k:function(a){return a.localName},
dn:function(a){return a.getBoundingClientRect()},
gbO:function(a){return H.e(new W.z(a,"error",!1),[null])},
gbP:function(a){return H.e(new W.z(a,"load",!1),[null])},
gcX:function(a){return H.e(new W.z(a,"mousedown",!1),[null])},
gcY:function(a){return H.e(new W.z(a,"mouseenter",!1),[null])},
gcZ:function(a){return H.e(new W.z(a,"mouseleave",!1),[null])},
gd_:function(a){return H.e(new W.z(a,"mousemove",!1),[null])},
gd0:function(a){return H.e(new W.z(a,"mouseout",!1),[null])},
gd1:function(a){return H.e(new W.z(a,"mouseover",!1),[null])},
gd2:function(a){return H.e(new W.z(a,"mouseup",!1),[null])},
$isaT:1,
$ish:1,
$isa_:1,
"%":";Element"},
kF:{
"^":"x;p:height%,ae:src},A:type=,q:width%",
"%":"HTMLEmbedElement"},
kG:{
"^":"bc;aK:error=",
"%":"ErrorEvent"},
bc:{
"^":"h;A:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
a_:{
"^":"h;",
e6:function(a,b,c,d){return a.addEventListener(b,H.aN(c,1),d)},
ev:function(a,b,c,d){return a.removeEventListener(b,H.aN(c,1),d)},
$isa_:1,
"%":"MediaStream;EventTarget"},
kZ:{
"^":"x;A:type=",
"%":"HTMLFieldSetElement"},
l1:{
"^":"x;m:length=",
"%":"HTMLFormElement"},
fM:{
"^":"fN;",
h4:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
fG:function(a,b,c){return a.open(b,c)},
bg:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
fN:{
"^":"a_;",
"%":";XMLHttpRequestEventTarget"},
l2:{
"^":"x;p:height%,ae:src},q:width%",
"%":"HTMLIFrameElement"},
d9:{
"^":"x;p:height%,ae:src},q:width%",
b4:function(a,b){return a.complete.$1(b)},
$isd9:1,
"%":"HTMLImageElement"},
l4:{
"^":"x;p:height%,ae:src},A:type=,q:width%",
$isaT:1,
$ish:1,
$isa_:1,
"%":"HTMLInputElement"},
l7:{
"^":"x;A:type=",
"%":"HTMLKeygenElement"},
l8:{
"^":"x;A:type=",
"%":"HTMLLinkElement"},
hg:{
"^":"x;aK:error=,ae:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
lb:{
"^":"x;A:type=",
"%":"HTMLMenuElement"},
lc:{
"^":"x;A:type=",
"%":"HTMLMenuItemElement"},
c2:{
"^":"dY;",
gV:function(a){var z,y
if(!!a.offsetX)return H.e(new P.W(a.offsetX,a.offsetY),[null])
else{if(!J.p(W.e9(a.target)).$isaT)throw H.d(new P.T("offsetX is only supported on elements"))
z=W.e9(a.target)
y=H.e(new P.W(a.clientX,a.clientY),[null]).R(0,J.eY(J.f0(z)))
return H.e(new P.W(J.cT(y.a),J.cT(y.b)),[null])}},
$isc2:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
lm:{
"^":"h;",
$ish:1,
"%":"Navigator"},
aX:{
"^":"a_;",
k:function(a){var z=a.nodeValue
return z==null?this.dO(a):z},
"%":"Attr;Node"},
lp:{
"^":"x;A:type=",
"%":"HTMLOListElement"},
lq:{
"^":"x;p:height%,A:type=,q:width%",
"%":"HTMLObjectElement"},
lr:{
"^":"x;A:type=",
"%":"HTMLOutputElement"},
aY:{
"^":"bc;",
$isaY:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
lu:{
"^":"x;ae:src},A:type=",
"%":"HTMLScriptElement"},
lw:{
"^":"x;m:length=,A:type=",
"%":"HTMLSelectElement"},
lx:{
"^":"x;ae:src},A:type=",
"%":"HTMLSourceElement"},
ly:{
"^":"bc;aK:error=",
"%":"SpeechRecognitionError"},
lA:{
"^":"x;A:type=",
"%":"HTMLStyleElement"},
lE:{
"^":"x;A:type=",
"%":"HTMLTextAreaElement"},
cl:{
"^":"h;",
$isa:1,
"%":"Touch"},
cm:{
"^":"dY;eK:changedTouches=",
$iscm:1,
$isa:1,
"%":"TouchEvent"},
lG:{
"^":"fS;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bV(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.d(new P.T("Cannot assign element of immutable List."))},
a2:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.cl]},
$ist:1,
$isbh:1,
$isbf:1,
"%":"TouchList"},
fR:{
"^":"h+bk;",
$isl:1,
$asl:function(){return[W.cl]},
$ist:1},
fS:{
"^":"fR+fO;",
$isl:1,
$asl:function(){return[W.cl]},
$ist:1},
lH:{
"^":"x;ae:src}",
"%":"HTMLTrackElement"},
dY:{
"^":"bc;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
e_:{
"^":"hg;p:height%,q:width%",
$ise_:1,
"%":"HTMLVideoElement"},
lL:{
"^":"a_;",
$ish:1,
$isa_:1,
"%":"DOMWindow|Window"},
lP:{
"^":"h;bA:bottom=,p:height=,a4:left=,bW:right=,aE:top=,q:width=",
k:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
u:function(a,b){var z,y,x
if(b==null)return!1
z=J.p(b)
if(!z.$isaa)return!1
y=a.left
x=z.ga4(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaE(b)
if(y==null?x==null:y===x){y=a.width
x=z.gq(b)
if(y==null?x==null:y===x){y=a.height
z=z.gp(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gE:function(a){var z,y,x,w
z=J.I(a.left)
y=J.I(a.top)
x=J.I(a.width)
w=J.I(a.height)
return W.e4(W.am(W.am(W.am(W.am(0,z),y),x),w))},
gc_:function(a){return H.e(new P.W(a.left,a.top),[null])},
$isaa:1,
$asaa:I.aB,
"%":"ClientRect"},
lQ:{
"^":"aX;",
$ish:1,
"%":"DocumentType"},
lR:{
"^":"fA;",
gp:function(a){return a.height},
gq:function(a){return a.width},
gi:function(a){return a.x},
si:function(a,b){a.x=b},
gj:function(a){return a.y},
sj:function(a,b){a.y=b},
"%":"DOMRect"},
lU:{
"^":"x;",
$isa_:1,
$ish:1,
"%":"HTMLFrameSetElement"},
cs:{
"^":"aj;a,b,c",
ao:function(a,b,c,d){var z=new W.J(0,this.a,this.b,W.K(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.H()
return z},
cU:function(a,b,c){return this.ao(a,null,b,c)}},
z:{
"^":"cs;a,b,c"},
J:{
"^":"hV;a,b,c,d,e",
bB:function(){if(this.b==null)return
this.cF()
this.b=null
this.d=null
return},
bT:function(a,b){if(this.b==null)return;++this.a
this.cF()},
aQ:function(a){return this.bT(a,null)},
d9:function(){if(this.b==null||this.a<=0)return;--this.a
this.H()},
H:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.ex(x,this.c,z,this.e)}},
cF:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.ey(x,this.c,z,this.e)}}},
fO:{
"^":"a;",
gK:function(a){return new W.fF(a,this.gm(a),-1,null)},
$isl:1,
$asl:null,
$ist:1},
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
iP:{
"^":"a;a",
$isa_:1,
$ish:1,
static:{iQ:function(a){if(a===window)return a
else return new W.iP(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kr:{
"^":"ar;",
$ish:1,
"%":"SVGAElement"},
ks:{
"^":"i5;",
$ish:1,
"%":"SVGAltGlyphElement"},
ku:{
"^":"q;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
kH:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEBlendElement"},
kI:{
"^":"q;A:type=,p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
kJ:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
kK:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFECompositeElement"},
kL:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
kM:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
kN:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
kO:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEFloodElement"},
kP:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
kQ:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEImageElement"},
kR:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEMergeElement"},
kS:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEMorphologyElement"},
kT:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEOffsetElement"},
kU:{
"^":"q;i:x=,j:y=",
"%":"SVGFEPointLightElement"},
kV:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
kW:{
"^":"q;i:x=,j:y=",
"%":"SVGFESpotLightElement"},
kX:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFETileElement"},
kY:{
"^":"q;A:type=,p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFETurbulenceElement"},
l_:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFilterElement"},
l0:{
"^":"ar;p:height=,q:width=,i:x=,j:y=",
"%":"SVGForeignObjectElement"},
fL:{
"^":"ar;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
ar:{
"^":"q;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
l3:{
"^":"ar;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGImageElement"},
l9:{
"^":"q;",
$ish:1,
"%":"SVGMarkerElement"},
la:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGMaskElement"},
ls:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGPatternElement"},
lt:{
"^":"fL;p:height=,q:width=,i:x=,j:y=",
"%":"SVGRectElement"},
lv:{
"^":"q;A:type=",
$ish:1,
"%":"SVGScriptElement"},
lB:{
"^":"q;A:type=",
"%":"SVGStyleElement"},
q:{
"^":"aT;",
gbO:function(a){return H.e(new W.z(a,"error",!1),[null])},
gbP:function(a){return H.e(new W.z(a,"load",!1),[null])},
gcX:function(a){return H.e(new W.z(a,"mousedown",!1),[null])},
gcY:function(a){return H.e(new W.z(a,"mouseenter",!1),[null])},
gcZ:function(a){return H.e(new W.z(a,"mouseleave",!1),[null])},
gd_:function(a){return H.e(new W.z(a,"mousemove",!1),[null])},
gd0:function(a){return H.e(new W.z(a,"mouseout",!1),[null])},
gd1:function(a){return H.e(new W.z(a,"mouseover",!1),[null])},
gd2:function(a){return H.e(new W.z(a,"mouseup",!1),[null])},
$isa_:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
lC:{
"^":"ar;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGSVGElement"},
lD:{
"^":"q;",
$ish:1,
"%":"SVGSymbolElement"},
dI:{
"^":"ar;",
"%":";SVGTextContentElement"},
lF:{
"^":"dI;",
$ish:1,
"%":"SVGTextPathElement"},
i5:{
"^":"dI;i:x=,j:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
lI:{
"^":"ar;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGUseElement"},
lJ:{
"^":"q;",
$ish:1,
"%":"SVGViewElement"},
lT:{
"^":"q;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
lV:{
"^":"q;",
$ish:1,
"%":"SVGCursorElement"},
lW:{
"^":"q;",
$ish:1,
"%":"SVGFEDropShadowElement"},
lX:{
"^":"q;",
$ish:1,
"%":"SVGGlyphRefElement"},
lY:{
"^":"q;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
hH:{
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
fe:function(a,b){return a.enable(b)},
ff:function(a,b){return a.enableVertexAttribArray(b)},
dm:function(a,b,c){return a.getAttribLocation(b,c)},
du:function(a,b){return a.getParameter(b)},
dw:function(a,b,c){return a.getUniformLocation(b,c)},
dK:function(a,b,c,d){return a.stencilFunc(b,c,d)},
dL:function(a,b,c,d){return a.stencilOp(b,c,d)},
fP:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.jY(g))
return}z=J.p(g)
if(!!z.$isd9)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscY)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$ise_)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.d(P.aR("Incorrect number or type of arguments"))},
fO:function(a,b,c,d,e,f,g){return this.fP(a,b,c,d,e,f,g,null,null,null)},
fQ:function(a,b,c,d){return a.texParameteri(b,c,d)},
fT:function(a,b){return a.useProgram(b)},
fU:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kz:{
"^":"a;"}}],["","",,P,{
"^":"",
aJ:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
e5:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
jb:{
"^":"a;",
fD:function(a){if(a<=0||a>4294967296)throw H.d(P.hC("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
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
n:function(a,b){var z,y,x
z=this.a
y=J.j(b)
x=y.gi(b)
if(typeof z!=="number")return z.n()
x=C.b.n(z,x)
z=this.b
y=y.gj(b)
if(typeof z!=="number")return z.n()
y=new P.W(x,C.b.n(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
R:function(a,b){var z,y,x,w
z=this.a
y=J.f_(b)
if(typeof z!=="number")return z.R()
if(typeof y!=="number")return H.D(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.R()
if(typeof w!=="number")return H.D(w)
w=new P.W(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
jq:{
"^":"a;",
gbW:function(a){return this.ga4(this)+this.c},
gbA:function(a){return this.gaE(this)+this.d},
k:function(a){return"Rectangle ("+this.ga4(this)+", "+this.b+") "+this.c+" x "+this.d},
u:function(a,b){var z,y
if(b==null)return!1
z=J.p(b)
if(!z.$isaa)return!1
if(this.ga4(this)===z.ga4(b)){y=this.b
z=y===z.gaE(b)&&this.a+this.c===z.gbW(b)&&y+this.d===z.gbA(b)}else z=!1
return z},
gE:function(a){var z=this.b
return P.e5(P.aJ(P.aJ(P.aJ(P.aJ(0,this.ga4(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gc_:function(a){var z=new P.W(this.ga4(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
aa:{
"^":"jq;a4:a>,aE:b>,q:c>,p:d>",
$asaa:null,
static:{hE:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.e(new P.aa(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
i:function(a){return a},
bB:function(a){return a},
dp:{
"^":"h;",
eC:function(a,b,c){return new Uint8Array(a,b)},
eB:function(a){return this.eC(a,0,null)},
$isdp:1,
"%":"ArrayBuffer"},
c5:{
"^":"h;",
$isc5:1,
"%":"DataView;ArrayBufferView;c3|dq|ds|c4|dr|dt|af"},
c3:{
"^":"c5;",
gm:function(a){return a.length},
$isbh:1,
$isbf:1},
c4:{
"^":"ds;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
return a[b]},
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
a[b]=c}},
dq:{
"^":"c3+bk;",
$isl:1,
$asl:function(){return[P.bK]},
$ist:1},
ds:{
"^":"dq+d8;"},
af:{
"^":"dt;",
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.n]},
$ist:1},
dr:{
"^":"c3+bk;",
$isl:1,
$asl:function(){return[P.n]},
$ist:1},
dt:{
"^":"dr+d8;"},
ld:{
"^":"c4;",
$isl:1,
$asl:function(){return[P.bK]},
$ist:1,
"%":"Float32Array"},
le:{
"^":"c4;",
$isl:1,
$asl:function(){return[P.bK]},
$ist:1,
"%":"Float64Array"},
lf:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$ist:1,
"%":"Int16Array"},
lg:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$ist:1,
"%":"Int32Array"},
lh:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$ist:1,
"%":"Int8Array"},
li:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$ist:1,
"%":"Uint16Array"},
lj:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$ist:1,
"%":"Uint32Array"},
lk:{
"^":"af;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$ist:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
ll:{
"^":"af;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.H(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.n]},
$ist:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
cI:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
hj:{
"^":"a0;e,f,a,b,c,d"},
hI:{
"^":"a0;e,f,r,a,b,c,d",
O:function(a){var z=0,y=new P.Z(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k,j
function $async$O(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
l=u
l=l.f
z=6
return H.k(l.P("assets/bg_clear01.png"),$async$O,y)
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
return H.k(l.P("assets/bg_clear02.png"),$async$O,y)
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
l=l.f
z=16
return H.k(l.P("assets/bg_start.png"),$async$O,y)
case 16:x=1
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
case 15:x=18
l=u
s=l.f
l=s
z=21
return H.k(l.ap("assets/se_play.json"),$async$O,y)
case 21:l=s
z=22
return H.k(l.P("assets/se_play.png"),$async$O,y)
case 22:x=1
z=20
break
case 18:x=17
o=w
l=H
l.B(o)
z=20
break
case 17:z=1
break
case 20:x=24
l=u
s=l.f
l=s
z=27
return H.k(l.P("assets/se_setting.png"),$async$O,y)
case 27:l=s
z=28
return H.k(l.ap("assets/se_setting.json"),$async$O,y)
case 28:x=1
z=26
break
case 24:x=23
n=w
l=H
l.B(n)
z=26
break
case 23:z=1
break
case 26:x=30
l=u
s=l.f
l=s
z=33
return H.k(l.P("assets/font_a.png"),$async$O,y)
case 33:l=s
z=34
return H.k(l.ap("assets/font_a.json"),$async$O,y)
case 34:x=1
z=32
break
case 30:x=29
m=w
l=H
l.B(m)
z=32
break
case 29:z=1
break
case 32:l=u
l=l.e
z=35
return H.k(l.ag(),$async$O,y)
case 35:l=u
s=l.e
l=s
l=l
k=F
k=k
j=u
z=36
return H.k(l.w(k.hR(j.f,s)),$async$O,y)
case 36:return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$O,y,null)},
Y:function(a,b){var z,y
z=100+C.C.c3(++this.r/2,10)*5
y=-z/2
b.ay(a,new F.u(y+200,y+150,z,z),F.a2(F.m(170,255,170,170)))}},
ff:{
"^":"a0;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b,c,d",
aB:function(a,b,c,d,e,f,g){if(this.dx&&c==="pointerup"){this.dx=!1
this.e.ag().W(new F.fk(this))}else if(c==="pointerdown")this.dx=!0
return!1},
Y:function(a,b){var z=this.r
if(z!=null)b.ax(a,z,this.x,this.y,this.cy)
z=this.z
if(z!=null&&this.cx!=null)this.cx.fc(a,b,z,this.db,20,new F.u(80,230,400,200))},
dT:function(a,b,c){var z,y
this.db="\u30df\u30ce\u30fc\u30f3\u306e\u96ea\u304c\u964d\u3063\u305f\u3002"
if(c>1e4){this.db="\u30df\u30ce\u30fc\u30f3\u304c\u4ef2\u9593\u306b\u306a\u3063\u305f\u3002"
z="assets/bg_clear02.png"}else z="assets/bg_clear01.png"
y=this.f
y.P(z).W(new F.fh(this))
y.P("assets/font_a.png").W(new F.fi(this))
y.ap("assets/font_a.json").W(new F.fj(this))},
static:{fg:function(a,b,c){var z,y
z=F.a2(null)
y=new E.r(new Float64Array(H.i(16)))
y.v()
y=new F.ff(b,a,null,null,null,null,null,null,null,z,"",!1,"none",null,y,!1)
y.b=[]
y.dT(a,b,c)
return y}}},
fh:{
"^":"c:1;a",
$1:function(a){var z=this.a
z.r=a
z.x=new F.u(0,0,J.A(a.gM()),J.A(z.r.gU()))
z.y=new F.u(0,0,400,300)}},
fi:{
"^":"c:1;a",
$1:function(a){var z=this.a
z.z=a
z.Q=new F.u(0,0,0,0)
z.ch=new F.u(0,0,0,0)}},
fj:{
"^":"c:3;a",
$1:function(a){this.a.cx=F.f9(a)}},
fk:{
"^":"c:1;a",
$1:function(a){var z,y
z=this.a
y=z.e
y.w(F.dw(z.f,y))}},
hQ:{
"^":"a0;e,f,r,x,y,z,Q,a,b,c,d",
fF:[function(a){P.a4("touch # "+a)
this.f.ag().W(new F.hT(this))},"$1","gbQ",2,0,3],
aB:function(a,b,c,d,e,f,g){return!1},
Y:function(a,b){var z=this.e
if(z!=null)b.ax(a,z,this.x,this.y,this.z)},
dZ:function(a,b){var z,y,x,w,v,u
this.r.P("assets/bg_start.png").W(new F.hS(this))
z=this.gbQ()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
u=new F.ab(200,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
v.J(0,100,200,0)
this.w(u)},
static:{hR:function(a,b){var z,y
z=F.a2(null)
y=new E.r(new Float64Array(H.i(16)))
y.v()
y=new F.hQ(null,b,a,null,null,z,!1,"none",null,y,!1)
y.b=[]
y.dZ(a,b)
return y}}},
hS:{
"^":"c:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.u(0,0,J.A(a.gM()),J.A(z.e.gU()))
z.y=new F.u(0,0,400,300)}},
hT:{
"^":"c:1;a",
$1:function(a){var z,y
z=this.a
y=z.f
y.w(F.dw(z.r,y))}},
hk:{
"^":"a;a,b,c,d",
T:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z+1,x=this.b+2,w=x-1,v=0;v<y;++v)for(u=v===z,t=0;t<x;++t)if(t===0||t===w||u)this.S(t,v).a=C.q
else this.S(t,v).a=C.e},
S:function(a,b){var z,y
if(typeof a!=="number")return a.ai()
if(!(a<0)){z=this.c+1
if(!(a>z)){y=J.aC(b)
z=y.ai(b,0)||y.ah(b,z)}else z=!0}else z=!0
if(z)return this.d
z=this.a
y=J.ew(b,this.b+2)
if(typeof y!=="number")return H.D(y)
y=a+y
if(y>>>0!==y||y>=z.length)return H.f(z,y)
return z[y]},
eR:function(){var z,y,x,w,v,u
z=[]
for(y=this.c+1-1,x=this.b+2-1,w=0;w<y;++w){u=1
while(!0){if(!(u<x)){v=!0
break}if(this.S(u,w).a===C.e){v=!1
break}++u}if(v)z.push(w)}C.a.c7(z)
return z},
eP:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.O)(a),++y)this.eO(a[y])},
eO:function(a){var z,y,x,w
for(z=this.b+2-1,y=a;x=J.aC(y),x.be(y,0);y=x.R(y,1))for(w=1;w<z;++w)if(this.S(w,x.R(y,1)).a===C.p)this.S(w,y).a=C.e
else this.S(w,y).a=this.S(w,x.R(y,1)).a},
dW:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.c,y=z+1,x=this.b+2,w=this.a,v=x-1,u=0;u<y;++u)for(t=u===z,s=0;s<x;++s)if(s===0||s===v||t)w.push(new F.bm(C.q))
else w.push(new F.bm(C.e))},
static:{dm:function(a,b){var z=new F.hk([],b,a,new F.bm(C.p))
z.dW(a,b)
return z}}},
hh:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q",
cW:function(){var z,y
z=this.b
if(z.length>0)C.a.d7(z,0)
for(;z.length<3;){y=F.hm()
y.a=(this.a.b+2)/2|0
y.b=0
z.push(y)}},
cO:function(a,b){var z,y,x
if(!b){z=this.r
y=$.$get$bn()
x=this.e
if(x>=5)return H.f(y,x)
x=z+y[x]/2<a
z=x}else z=!0
if(z){this.r=a
this.cN()}},
cN:function(){var z,y,x,w,v
if(!this.bN(0,1)){z=this.b
if(1>=z.length)return H.f(z,1)
if(this.b3(z[1])){this.c=!0
z=this.z
z.push(this.d)
C.a.c7(z)
if(z.length>3)C.a.d7(z,0)}this.cW()
y=this.a.eR()
z=y.length
if(z>0){x=this.d
w=$.$get$dk()
v=this.e
if(v>=5)return H.f(w,v)
v=w[v]
H.a3(v)
H.a3(z)
v=x+Math.pow(v,z)
this.d=v
P.a4(H.b(v))}if(z===4)++this.Q
z=this.Q
x=$.$get$dl()
w=this.e
if(w>=5)return H.f(x,w)
if(z>x[w])if(w+1<5)this.e=w+1
this.a.eP(y)}},
bN:function(a,b){var z,y,x
z=this.b
this.aa(C.a.gF(z),!1)
y=C.a.gF(z)
y.a=J.y(y.a,a)
y=C.a.gF(z)
y.b=J.y(y.b,b)
if(this.b3(C.a.gF(z))){y=C.a.gF(z)
x=y.a
if(typeof x!=="number")return x.R()
y.a=x-a
x=C.a.gF(z)
y=x.b
if(typeof y!=="number")return y.R()
x.b=y-b
this.aa(C.a.gF(z),!0)
return!1}else{this.aa(C.a.gF(z),!0)
return!0}},
b3:function(a){var z,y,x,w,v
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x){w=z[x]
v=J.j(w)
v=this.a.S(J.y(a.a,v.gi(w)),J.y(a.b,v.gj(w))).a
if(!(v===C.e||v===C.p))return!0}return!1},
aa:function(a,b){var z,y,x,w,v,u
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x){w=z[x]
v=J.j(w)
u=this.a.S(J.y(a.a,v.gi(w)),J.y(a.b,v.gj(w)))
if(u.a!==C.p)if(b)u.a=v.gA(w)
else u.a=C.e}}},
a6:{
"^":"a;a",
k:function(a){return C.K.h(0,this.a)}},
av:{
"^":"a;i:a*,j:b*,c",
dc:function(){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x){w=z[x]
v=J.j(w)
u=v.gi(w)
t=v.gj(w)
if(typeof t!=="number")return H.D(t)
v.si(w,-1*t)
v.sj(w,u)}},
da:function(){var z,y,x,w,v,u
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x){w=z[x]
v=J.j(w)
u=v.gi(w)
v.si(w,v.gj(w))
if(typeof u!=="number")return H.D(u)
v.sj(w,-1*u)}},
static:{hm:function(){switch($.$get$dn().fD(7)){case 0:var z=[]
z.push(new F.w(0,0,C.i))
z.push(new F.w(-1,0,C.i))
z.push(new F.w(1,0,C.i))
z.push(new F.w(2,0,C.i))
return new F.av(0,0,z)
case 1:z=[]
z.push(new F.w(0,0,C.j))
z.push(new F.w(1,0,C.j))
z.push(new F.w(0,-1,C.j))
z.push(new F.w(1,-1,C.j))
return new F.av(0,0,z)
case 2:z=[]
z.push(new F.w(0,0,C.k))
z.push(new F.w(1,0,C.k))
z.push(new F.w(0,-1,C.k))
z.push(new F.w(-1,-1,C.k))
return new F.av(0,0,z)
case 3:z=[]
z.push(new F.w(0,0,C.l))
z.push(new F.w(-1,0,C.l))
z.push(new F.w(0,-1,C.l))
z.push(new F.w(1,-1,C.l))
return new F.av(0,0,z)
case 4:z=[]
z.push(new F.w(1,0,C.o))
z.push(new F.w(1,-1,C.o))
z.push(new F.w(0,0,C.o))
z.push(new F.w(-1,0,C.o))
return new F.av(0,0,z)
case 5:z=[]
z.push(new F.w(-1,0,C.m))
z.push(new F.w(-1,-1,C.m))
z.push(new F.w(0,0,C.m))
z.push(new F.w(1,0,C.m))
return new F.av(0,0,z)
case 6:z=[]
z.push(new F.w(-1,0,C.n))
z.push(new F.w(0,-1,C.n))
z.push(new F.w(0,0,C.n))
z.push(new F.w(1,0,C.n))
return new F.av(0,0,z)
case 7:H.cI("#### WARNING")
break}}}},
w:{
"^":"bm;i:b*,j:c*,a"},
bm:{
"^":"a;A:a>"},
hl:{
"^":"a0;e,f,a,b,c,d",
Y:function(a,b){var z,y,x,w,v,u
z=new F.u(0,0,7,7)
y=F.a2(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.S(v,x).a
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
if(y.b===C.f)b.bH(a,z,y)
else b.bI(a,z,y)}}},
hi:{
"^":"a0;e,f,a,b,c,d",
dH:function(a){var z,y,x,w,v,u,t,s,r
this.f.T(0)
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x){w=z[x]
v=this.f
u=J.j(w)
t=u.gi(w)
if(typeof t!=="number")return H.D(t)
s=u.gj(w)
if(typeof s!=="number")return H.D(s)
r=v.S(3+t,3+s)
if(r.a!==C.p)r.a=u.gA(w)}},
Y:function(a,b){var z,y,x,w,v,u
z=new F.u(0,0,7,7)
y=F.a2(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.S(v,x).a
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
if(y.b===C.f)b.bH(a,z,y)
else b.bI(a,z,y)}}},
hr:{
"^":"a0;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b,c,d",
bR:function(a,b){var z,y,x,w,v
z=this.r
this.cx.r=z.d
this.cy.r=z.e
y=z.b
x=y.length
if(x>1&&!0){w=this.ch
if(1>=x)return H.f(y,1)
w.dH(y[1])}x=z.y
w=$.$get$dj()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.y=b
z.cN()}x=this.x
x=x.z/x.r
if(x>0.5){x=z.r
w=$.$get$bn()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.r=b
z.bN(1,0)}}else if(x<-0.5){x=z.r
w=$.$get$bn()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.r=b
z.bN(-1,0)}}x=this.x
x=-x.Q/x.r
if(x<-0.5)z.cO(b,!1)
else if(x>0.6)z.cO(b,!0)
if(this.y.r){x=z.x
w=$.$get$c1()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.x=b
z.aa(C.a.gF(y),!1)
C.a.gF(y).dc()
if(z.b3(C.a.gF(y))){C.a.gF(y).da()
z.aa(C.a.gF(y),!0)}else z.aa(C.a.gF(y),!0)}}else if(this.z.r){x=z.x
w=$.$get$c1()
v=z.e
if(v>=5)return H.f(w,v)
if(x+w[v]<b){z.x=b
z.aa(C.a.gF(y),!1)
C.a.gF(y).dc()
if(z.b3(C.a.gF(y))){C.a.gF(y).da()
z.aa(C.a.gF(y),!0)}else z.aa(C.a.gF(y),!0)}}if(z.c)this.f.ag().W(new F.hv(this))},
d4:[function(a){},"$1","gd3",2,0,3],
dX:function(a,b,c,d){var z,y,x,w,v
z=this.gd3()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
v=new F.ab(40,40,!1,!1,"r",y,x,w,z,0,0,0,0,"none",null,v,!1)
v.b=[]
this.y=v
z=this.gd3()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
v=new F.ab(40,40,!1,!1,"l",y,x,w,z,0,0,0,0,"none",null,v,!1)
v.b=[]
this.z=v
z=new E.r(new Float64Array(H.i(16)))
z.v()
z=new F.ii("joystick",70,35,!1,0,0,0,"none",null,z,!1)
z.b=[]
this.x=z
z=this.e
y=this.r
x=y.a
w=new E.r(new Float64Array(H.i(16)))
w.v()
w=new F.hl(z,x,"none",null,w,!1)
w.b=[]
this.Q=w
x=new E.r(new Float64Array(H.i(16)))
x.v()
x=new F.hi(z,null,"none",null,x,!1)
x.b=[]
x.f=F.dm(5,5)
this.ch=x
x=this.db
w=this.dx
v=new E.r(new Float64Array(H.i(16)))
v.v()
v=new F.b_(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cx=v
x=this.db
w=this.dx
v=new E.r(new Float64Array(H.i(16)))
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
this.Q.c.J(0,100,25,0)
this.x.c.J(0,100,250,0)
this.y.c.J(0,250,225,0)
this.z.c.J(0,300,225,0)
this.ch.c.J(0,225,153,0)
this.cx.c.J(0,225,50,0)
this.cy.c.J(0,225,85,0)
z.P("assets/se_play.png").W(new F.ht(this))
z.aO("assets/se_play.json").W(new F.hu(this))
y.f=d
y.e=d
P.a4("### game =  "+d)},
static:{hs:function(a,b,c,d){var z=new E.r(new Float64Array(H.i(16)))
z.v()
z=new F.hr(a,b,c,null,null,null,null,null,null,null,null,null,"none",null,z,!1)
z.b=[]
z.dX(a,b,c,d)
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
y=new F.dD(a,[])
y.d6(a)
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
"^":"a0;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
fE:[function(a){P.a4("touch # "+a)
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
break}},"$1","gaP",2,0,3],
fF:[function(a){P.a4("touch # "+a)
this.f.ag().W(new F.hz(this))},"$1","gbQ",2,0,3],
aB:function(a,b,c,d,e,f,g){return!1},
Y:function(a,b){var z,y
z=this.e
if(z!=null&&this.Q!=null){y=this.z
b.ax(a,z,this.Q.bK("BG001.png").gbh(),this.y,y)
b.ax(a,this.e,this.Q.bK("CH001.png").gbh(),new F.u(this.dx,this.dy,35,35),y)}z=this.cx
y=this.f.f.z
if(2>=y.length)return H.f(y,2)
z.r=y[2]
this.cy.r=y[1]
this.db.r=y[0]},
dY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
z.P("assets/se_setting.png").W(new F.hx(this))
z.aO("assets/se_setting.json").W(new F.hy(this))
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
u=new F.ab(45,45,!1,!1,"L01",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
u.z=F.m(0,255,255,255)
v.J(0,120,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
t=new F.ab(45,45,!1,!1,"L02",y,x,w,z,0,0,0,0,"none",null,v,!1)
t.b=[]
t.z=F.m(0,255,255,255)
v.J(0,175,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
s=new F.ab(45,45,!1,!1,"L03",y,x,w,z,0,0,0,0,"none",null,v,!1)
s.b=[]
s.z=F.m(0,255,255,255)
v.J(0,215,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
r=new F.ab(45,45,!1,!1,"L04",y,x,w,z,0,0,0,0,"none",null,v,!1)
r.b=[]
r.z=F.m(0,255,255,255)
v.J(0,265,50,0)
z=this.gaP()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
q=new F.ab(45,45,!1,!1,"L05",y,x,w,z,0,0,0,0,"none",null,v,!1)
q.b=[]
q.z=F.m(0,255,255,255)
v.J(0,315,50,0)
this.w(u)
this.w(t)
this.w(s)
this.w(r)
this.w(q)
z=new E.r(new Float64Array(H.i(16)))
z.v()
y=new F.b_(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cx=y
z.J(0,120,140,0)
z=new E.r(new Float64Array(H.i(16)))
z.v()
y=new F.b_(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cy=y
z.J(0,150,180,0)
z=new E.r(new Float64Array(H.i(16)))
z.v()
y=new F.b_(null,null,0,7,"none",null,z,!1)
y.b=[]
this.db=y
z.J(0,180,220,0)
this.w(this.cx)
this.w(this.cy)
this.w(this.db)
this.ch=1
this.fE("L01")
z=this.gbQ()
y=F.m(170,255,170,204)
x=F.m(170,204,170,255)
w=F.m(170,204,255,170)
v=new E.r(new Float64Array(H.i(16)))
v.v()
p=new F.ab(150,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
p.b=[]
v.J(0,240,250,0)
this.w(p)},
static:{dw:function(a,b){var z,y
z=F.a2(null)
y=new E.r(new Float64Array(H.i(16)))
y.v()
y=new F.hw(null,b,a,null,null,z,null,1,null,null,null,0,0,"none",null,y,!1)
y.b=[]
y.dY(a,b)
return y}}},
hx:{
"^":"c:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.u(0,0,J.A(a.gM()),J.A(z.e.gU()))
z.y=new F.u(0,0,400,300)
z.cx.f=a
z.cy.f=a
z.db.f=a}},
hy:{
"^":"c:3;a",
$1:function(a){var z,y
z=this.a
y=new F.dD(a,[])
y.d6(a)
z.Q=y
z.cx.e=y
z.cy.e=y
z.db.e=y}},
hz:{
"^":"c:1;a",
$1:function(a){var z,y
z=this.a
P.a4("### level =  "+z.ch)
y=z.f.f
y.a.T(0)
y.c=!1
y.d=0
y.e=y.f
y=z.f
y.w(F.hs(z.r,y,y.f,z.ch))}},
b_:{
"^":"a0;e,f,r,x,a,b,c,d",
Y:function(a,b){var z,y,x,w
if(this.e==null||this.f==null)return
for(z=0;y=this.x,z<y;++z){x=y-1-z
if(x===0)x=1
else x=Math.pow(10,x)
x=C.b.c3(C.b.c8(this.r,x),10)
w=new F.dK(null,C.f,1)
w.a=F.m(255,255,255,255)
b.ax(a,this.f,this.e.bK("NUM00"+H.b(x)+".png").gbh(),new F.u(z*12,0,15,15),w)}}}}],["","",,P,{
"^":"",
jW:function(a){var z={}
a.N(0,new P.jX(z))
return z},
jZ:function(a,b){var z=[]
return new P.k1(b,new P.k_([],z),new P.k0(z),new P.k2(z)).$1(a)},
jY:function(a){return a},
d3:function(){var z=$.d2
if(z==null){z=J.bN(window.navigator.userAgent,"Opera",0)
$.d2=z}return z},
fz:function(){var z,y
z=$.d_
if(z!=null)return z
y=$.d0
if(y==null){y=J.bN(window.navigator.userAgent,"Firefox",0)
$.d0=y}if(y===!0)z="-moz-"
else{y=$.d1
if(y==null){y=P.d3()!==!0&&J.bN(window.navigator.userAgent,"Trident/",0)
$.d1=y}if(y===!0)z="-ms-"
else z=P.d3()===!0?"-o-":"-webkit-"}$.d_=z
return z},
jX:{
"^":"c:21;a",
$2:function(a,b){this.a[a]=b}},
k_:{
"^":"c:22;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
k0:{
"^":"c:23;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.f(z,a)
return z[a]}},
k2:{
"^":"c:24;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.f(z,a)
z[a]=b}},
k1:{
"^":"c:1;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.fw(a.getTime(),!0)
if(a instanceof RegExp)throw H.d(new P.cn("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.at()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.O)(w),++u){t=w[u]
x.l(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.F(a)
s=w.gm(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.D(s)
v=J.aO(x)
r=0
for(;r<s;++r)v.l(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
ep:[function(){var z=0,y=new P.Z(),x=1,w,v,u,t,s,r,q,p,o
function $async$ep(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
p=p.at()
o=P
v=new q.id(700,500,p,o.at())
q=E
q=q
p=Float64Array
o=H
u=new q.r(new p(o.i(16)))
q=u
q.v()
q=F
t=new q.ih(400,300,1,1,1,0,0,null,"none",null,u,!1)
q=t
q.b=[]
q=t
p=F
q.ch=p.m(255,238,238,255)
q=E
q=q
p=Float64Array
o=H
u=new q.r(new p(o.i(16)))
q=u
q.v()
q=G
s=new q.is(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
q=s
p=G
q.a=p.io(400,600)
q=s
q.sZ(t)
q=s
q.fC()
q=s
q.fS()
q=s
q.x=!0
q=s
z=!q.d?2:3
break
case 2:q=s
q.d=!0
q=s
q.aV()
case 3:q=F
q=q
p=F
u=new q.hh(p.dm(21,11),[],!1,0,1,1,0,0,0,[0,0,0],0)
q=u
q.cW()
q=E
q=q
p=Float64Array
o=H
r=new q.r(new p(o.i(16)))
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
u=new q.r(new p(o.i(16)))
q=u
q.v()
q=F
u=new q.hI(r,v,0,"none",null,u,!1)
q=u
q.b=[]
q=u
q.O(0)
q=r
q.w(u)
q=t
q.w(r)
return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$ep,y,null)},"$0","eq",0,0,0]},1],["","",,F,{
"^":"",
bi:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.O)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.b_(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fb:{
"^":"a;a",
k:function(a){return C.L.h(0,this.a)}},
f8:{
"^":"a;a,b,c",
ds:function(a){var z=this.a
if(z.X(a))return z.h(0,a)
else return z.h(0,this.b)},
fd:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o
z=new F.u(0,0,0,0)
y=new F.u(0,0,0,0)
x=f.a
w=f.b
v=J.A(c.gM())
u=J.A(c.gU())
for(t=new H.fp(d),t=t.gK(t),s=this.c,r=e+5;t.C();){q=this.ds(t.d)
z.c=q.aU(v,u).c
z.d=q.aU(v,u).d
z.a=q.aU(v,u).a
z.b=q.aU(v,u).b
y.a=x
y.b=w
p=z.c*e/z.d
y.c=p
y.d=e
p=J.y(x,p)
o=f.c
if(typeof p!=="number")return p.ah()
if(p>o){y.a=f.a
y.b=r}b.ax(a,c,z,y,s)
x=J.y(J.y(y.a,y.c),2)
w=y.b}},
fc:function(a,b,c,d,e,f){return this.fd(a,b,c,d,e,f,C.w)},
dS:function(a){var z,y,x,w,v,u
z=P.ea(a,null)
for(y=z.gad(),y=y.gK(y),x=this.a;y.C();){w=y.gG()
v=z.h(0,w)
u=J.F(v)
x.l(0,H.hA(w,null,null),new F.fa(J.A(u.h(v,"u")),J.A(u.h(v,"v")),J.A(u.h(v,"w")),J.A(u.h(v,"h")),J.A(u.h(v,"vx")),J.A(u.h(v,"vy")),J.A(u.h(v,"vw")),J.A(u.h(v,"vh")),new F.cj(0,0),new F.u(0,0,0,0)))}},
static:{f9:function(a){var z=new F.f8(P.at(),32,F.a2(null))
z.dS(a)
return z}}},
fa:{
"^":"a;a,b,M:c<,U:d<,e,f,r,x,y,z",
aU:function(a,b){var z,y
z=this.z
z.a=a*this.a
y=this.d*b
z.b=b-b*this.b-y
z.c=this.c*a
z.d=y
return z}},
ab:{
"^":"a0;M:e<,U:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
cJ:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
aB:function(a,b,c,d,e,f,g){var z
switch(c){case"pointerdown":if(this.cJ(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.cy=0
this.db=0}break
case"pointermove":if(this.cJ(d,e)){this.x=!0
z=this.cy+(f-this.dx)
this.cy=z
this.db=this.db+(g-this.dy)
if(!(Math.sqrt(H.a3(z*z))>this.e)){z=this.db
z=Math.sqrt(H.a3(z*z))>this.f}else z=!0
if(z){this.r=!1
this.x=!1}}else{this.r=!1
this.x=!1}break
case"pointerup":if(this.r&&!0)P.fH(new F.ia(this),null)
this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
Y:function(a,b){var z=F.a2(null)
if(this.r){z.a=this.Q
b.ay(a,new F.u(0,0,this.e,this.f),z)}else if(this.x){z.a=this.ch
b.ay(a,new F.u(0,0,this.e,this.f),z)}else{z.a=this.z
b.ay(a,new F.u(0,0,this.e,this.f),z)}},
d4:function(a){return this.cx.$1(a)}},
ia:{
"^":"c:0;a",
$0:function(){var z=this.a
z.d4(z.y)}},
ib:{
"^":"a;"},
a0:{
"^":"a;",
w:function(a){var z=0,y=new P.Z(),x=1,w,v=this,u,t,s,r
function $async$w(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.e(new s.G(0,r.o,null),[null])
t=u
t.aG(null)
z=2
return H.k(u,$async$w,y)
case 2:t=v
t=t.b
t.push(a)
return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$w,y,null)},
b8:function(a){var z=0,y=new P.Z(),x=1,w,v=this,u,t,s
function $async$b8(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.G(0,s.o,null)
u.$builtinTypeInfo=[null]
t=u
t.aG(null)
z=2
return H.k(u,$async$b8,y)
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
t.a8(u,a)
t=a
t.di()
return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$b8,y,null)},
ag:function(){var z=0,y=new P.Z(),x=1,w,v=this,u,t,s,r,q,p
function $async$ag(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.e(new q.G(0,p.o,null),[null])
r=u
r.aG(null)
z=2
return H.k(u,$async$ag,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.b8(u[s])
case 4:r=u.length===t
if(r)b=r
else{z=6
break}z=7
break
case 6:r=H
b=(0,r.O)(u)
case 7:b,++s
z=3
break
case 5:return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$ag,y,null)},
cS:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x)z[x].cS(a)},
bR:function(a,b){},
dg:function(a,b){var z,y,x
this.bF()
this.bR(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x)z[x].dg(a,b)},
Y:function(a,b){},
bS:["dP",function(a,b){var z,y,x,w,v,u
this.bF()
this.Y(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.O)(z),++w){v=z[w]
u=v.c
x.push(C.a.gaz(x).t(0,u))
b.bc()
v.bS(a,b)
if(0>=x.length)return H.f(x,0)
x.pop()
b.bc()}}],
dh:["ab",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.bF()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.f(y,w)
v=y[w]
a.a7(v.c)
u=v.dh(a,b,c,d,e)
a.a6()
if(u===!0)return u}t=a.dt().bD(0)
t.ft()
y=new E.v(new Float64Array(H.i(3)))
y.B(d,e,0)
s=t.t(0,y)
return this.aB(a,b,c,s.gi(s),s.gj(s),d,e)}],
aB:function(a,b,c,d,e,f,g){return!1},
di:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x)z[x].di()
this.d=!1},
bF:function(){if(!this.d)this.d=!0}},
ic:{
"^":"a;",
P:function(a){var z=0,y=new P.Z(),x,w=2,v,u=this,t,s,r,q
function $async$P(b,c){if(b===1){v=c
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
return H.k(q.b6(a),$async$P,y)
case 5:s.l(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$P,y,null)},
ap:function(a){var z=0,y=new P.Z(),x,w=2,v,u=this,t,s,r,q
function $async$ap(b,c){if(b===1){v=c
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
return H.k(q.aO(a),$async$ap,y)
case 5:s.l(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$ap,y,null)}},
u:{
"^":"a;i:a*,j:b*,M:c<,U:d<",
u:function(a,b){if(b==null)return!1
return b instanceof F.u&&J.E(b.a,this.a)&&J.E(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gE:function(a){return F.bi([J.I(this.a),J.I(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
k:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)+", w:"+H.b(this.c)+", h:"+H.b(this.d)}},
dL:{
"^":"a;i:a*,j:b*",
u:function(a,b){if(b==null)return!1
return b instanceof F.dL&&J.E(b.a,this.a)&&J.E(b.b,this.b)},
gE:function(a){return F.bi([J.I(this.a),J.I(this.b)])},
k:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)}},
cj:{
"^":"a;M:a<,U:b<",
u:function(a,b){if(b==null)return!1
return b instanceof F.cj&&b.a===this.a&&b.b===this.b},
gE:function(a){return F.bi([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
k:function(a){return"w:"+H.b(this.a)+", h:"+H.b(this.b)}},
ij:{
"^":"a;a",
k:function(a){return C.M.h(0,this.a)}},
dK:{
"^":"a;a,b,c",
e1:function(a){if(this.a==null)this.a=F.m(255,255,255,255)},
static:{a2:function(a){var z=new F.dK(a,C.f,1)
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
static:{m:function(a,b,c,d){var z=new F.dJ(0)
z.e0(a,b,c,d)
return z}}},
ci:{
"^":"a;"},
ih:{
"^":"a0;M:e<,U:f<,r,x,y,z,Q,ch,a,b,c,d",
dh:function(a,b,c,d,e){a.a7(this.c)
this.ab(a,b,c,d,e)
a.a6()},
bR:function(a,b){var z,y,x,w
z=a.gM()
y=a.gfH(a)
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
y=new E.r(new Float64Array(H.i(16)))
y.v()
this.c=y
y.J(0,this.z,this.Q,0)
y=this.c
x=this.y
y.c4(0,x,x,1)},
bS:function(a,b){var z,y,x
z=new F.u(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.gaz(x).t(0,y))
b.bc()
y=b.b
y.push(z)
b.b2(a,z)
this.dP(a,b)
if(0>=y.length)return H.f(y,0)
y.pop()
if(y.length>0)b.b2(a,C.a.gaz(y))
else{y=a.a
b.b2(a,new F.u(0,0,y.c,y.d))}if(0>=x.length)return H.f(x,0)
x.pop()
b.bc()},
Y:function(a,b){var z,y
z=new F.u(0,0,this.e,this.f)
y=F.a2(null)
y.a=this.ch
b.b2(a,z)
b.ay(a,z,y)}},
ii:{
"^":"a0;e,f,r,x,y,z,Q,a,b,c,d",
Y:function(a,b){var z,y,x,w,v,u,t
z=F.a2(null)
if(this.x)z.a=F.m(170,170,170,255)
else z.a=F.m(170,255,170,170)
y=this.f
x=-y/2
w=this.z
v=this.r
u=v/2
t=this.Q
b.cP(a,new F.u(x,x,y,y),z)
b.cP(a,new F.u(w-u,t-u,v,v),z)},
aB:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(!this.x){if(this.cM(d,e,0,0)<this.f){this.y=b
this.x=!0
this.z=d
this.Q=e}}else if(b===this.y)if(c==="pointerup"||c==="pointercancel"){this.x=!1
this.z=0
this.Q=0}else{this.z=d
this.Q=e
z=this.cM(0,0,d,e)
y=this.f
x=y/2
if(z>x){w=this.z
v=w>0?w:-1*w
u=this.Q
t=v+(u>0?u:-1*u)
this.z=x*w/t
this.Q=y/2*u/t}}return!1},
cM:function(a,b,c,d){var z,y
z=a-c
H.a3(z)
H.a3(2)
z=Math.pow(z,2)
y=b-d
H.a3(y)
H.a3(2)
return Math.sqrt(H.a3(z+Math.pow(y,2)))}},
dD:{
"^":"a;a,b",
bK:function(a){var z,y,x,w
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.O)(z),++x){w=z[x]
if(J.E(w.a,a))return w}return},
d6:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.b7(H.ko(J.bL(P.ea(a,null),"frames"),"$isl",[P.hd],"$asl")),y=this.b;z.C();){x=z.gG()
w=new F.hP(null,null,null,null,null,null,null)
v=J.F(x)
w.a=v.h(x,"filename")
w.r=w.d5(v.h(x,"frame"))
w.b=v.h(x,"rotated")
w.c=v.h(x,"trimmed")
w.d=w.d5(v.h(x,"spriteSourceSize"))
u=v.h(x,"sourceSize")
t=J.F(u)
s=t.h(u,"w")
r=t.h(u,"h")
w.e=new F.cj(J.A(s),J.A(r))
v=v.h(x,"pivot")
u=J.F(v)
q=u.h(v,"x")
p=u.h(v,"y")
w.f=new F.dL(J.A(q),J.A(p))
y.push(w)}}},
hP:{
"^":"a;a,b,c,d,e,f,r",
gbh:function(){var z,y
z=this.b
y=this.r
if(z===!0)return new F.u(y.a,y.b,y.d,y.c)
else return new F.u(y.a,y.b,y.c,y.d)},
d5:function(a){var z,y,x,w,v
z=J.F(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.u(J.A(y),J.A(x),J.A(w),J.A(v))}},
ik:{
"^":"a;",
gZ:function(){return this.c$},
sZ:function(a){this.c$=a},
fw:function(a){if(!this.e$){this.c$.cS(this)
this.e$=!0}this.c$.dg(this,a)
this.fA()},
a7:function(a){var z=this.f$
z.push(C.a.gaz(z).t(0,a))},
a6:function(){var z=this.f$
if(0>=z.length)return H.f(z,0)
z.pop()},
dt:function(){return C.a.gaz(this.f$)}}}],["","",,G,{
"^":"",
ck:function(a){var z=0,y=new P.Z(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$ck(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.e(new p.cq(o.e(new n.G(0,m.o,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.f5(t,a)
q=J
s=q.j(t)
q=s
r=q.gbP(t)
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
m=m.K(new l.iq(u,t))
l=r
p=new p.J(0,o,n,m,l.c)
o=H
q=q.e(p,[o.C(r,0)])
q.H()
q=s
s=q.gbO(t)
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
m=m.K(new l.ir(a,u))
l=s
p=new p.J(0,o,n,m,l.c)
o=H
q=q.e(p,[o.C(s,0)])
q.H()
q=u
x=q.a
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$ck,y,null)},
dM:function(a,b,c){var z,y
z=J.eK(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
ip:{
"^":"ci;a,b",
gM:function(){return J.eZ(this.a)},
gU:function(){return J.eQ(this.a)},
dv:function(a){var z
if(this.b==null){z=J.j(a).f_(a)
this.b=z
a.bindTexture(3553,z)
C.O.fO(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
im:{
"^":"a;a,b,c,p:d>",
e2:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.aC(b)
y=C.c.aC(a)
x=document.createElement("canvas",null)
J.f6(x,z)
J.f4(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.f1(this.b,!0)},
static:{io:function(a,b){var z=new G.im(null,null,null,null)
z.e2(a,b)
return z}}},
il:{
"^":"ib;c,d,e,f,r,x,y,z,Q,ch,cx,a,b",
fn:function(){var z,y,x,w,v,u
P.a4("#[A]# "+H.b(J.cQ(this.c,35660)))
P.a4("#[B]# "+H.b(J.cQ(this.c,33901)))
z=C.a.cT(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.cT(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.c
w=G.dM(x,35633,z)
v=G.dM(x,35632,y)
u=J.eJ(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.e=u},
T:function(a){this.f=1
this.Q=-0.5
J.cO(this.c,2960)
J.eL(this.c,515)
J.eE(this.c,0,0,0,1)
J.eF(this.c,1)
J.eG(this.c,0)
J.cO(this.c,3042)
switch(-1){case-1:J.eA(this.c,32774)
J.eB(this.c,770,771,770,32772)
break}J.eD(this.c,17664)
C.a.sm(this.r,0)
C.a.sm(this.x,0)
C.a.sm(this.y,0)
this.z=null},
b5:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
if(z.length!==0){y=this.x
F.m(170,255,170,170)
J.cU(this.c,this.e)
x=J.b8(this.c,this.e,"a_tex")
w=J.bO(this.c)
J.bM(this.c,34962,w)
v=this.y
J.eC(this.c,34962,new Float32Array(H.bB(v)),35044)
J.b6(this.c,x)
J.ba(this.c,x,2,5126,!1,0,0)
u=this.z
if(u!=null){t=u.dv(this.c)
J.cL(this.c,3553,t)
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
J.cL(this.c,3553,null)}J.cU(this.c,null)
C.a.sm(z,0)
C.a.sm(y,0)
C.a.sm(v,0)
this.z=null}},
cP:function(a,b,c){if(c.b===C.f)this.fa(a,b,c)
else this.fb(a,b,c)},
fa:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=J.y(b.a,b.c/2)
y=J.y(b.b,b.d/2)
x=b.c/2
w=b.d/2
v=this.aI()
u=new E.v(new Float64Array(H.i(3)))
u.B(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=J.ac(y),o=this.r,n=this.y,m=this.x,l=J.ac(z),k=0;k<25;){j=o.length/8|0
u.si(0,z)
u.sj(0,y)
u.sa9(0,this.Q)
u=v.t(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0])
i=6.283185307179586*(k/25)
u.si(0,l.n(z,Math.cos(i)*x))
u.sj(0,t.n(y,Math.sin(i)*w))
u.sa9(0,this.Q)
u=v.t(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0]);++k
i=6.283185307179586*(k/25)
u.si(0,l.n(z,Math.cos(i)*x))
u.sj(0,t.n(y,Math.sin(i)*w))
u.sa9(0,this.Q)
u=v.t(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0])
C.a.I(m,[j,j+1,j+2])
this.Q+=0.0001}},
fb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=J.y(b.a,b.c/2)
y=J.y(b.b,b.d/2)
x=b.c
w=c.c
v=(x+w)/2
u=b.d
t=(u+w)/2
s=x/2
r=u/2
q=this.aI()
p=new E.v(new Float64Array(H.i(3)))
p.B(0,0,0)
o=new E.v(new Float64Array(H.i(3)))
o.B(0,0,0)
n=new E.v(new Float64Array(H.i(3)))
n.B(0,0,0)
m=new E.v(new Float64Array(H.i(3)))
m.B(0,0,0)
u=c.a.a
l=(u>>>16&255)/255
k=(u>>>8&255)/255
j=(u>>>0&255)/255
i=(u>>>24&255)/255
for(x=J.ac(y),w=J.ac(z),h=0;h<25;){u=6.283185307179586*(h/25)
p.si(0,w.n(z,Math.cos(u)*s))
p.sj(0,x.n(y,Math.sin(u)*r))
p.sa9(0,this.Q)
p=q.t(0,p)
o.si(0,w.n(z,Math.cos(u)*v))
o.sj(0,x.n(y,Math.sin(u)*t))
o.sa9(0,this.Q)
o=q.t(0,o);++h
u=6.283185307179586*(h/25)
n.si(0,w.n(z,Math.cos(u)*v))
n.sj(0,x.n(y,Math.sin(u)*t))
n.sa9(0,this.Q)
n=q.t(0,n)
m.si(0,w.n(z,Math.cos(u)*s))
m.sj(0,x.n(y,Math.sin(u)*r))
m.sa9(0,this.Q)
m=q.t(0,m)
this.at(a,p,o,m,n,l,k,j,i)
this.Q+=0.0001}},
ay:function(a,b,c){if(c.b===C.f)this.bH(a,b,c)
else this.bI(a,b,c)},
bH:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=this.aI()
y=b.a
x=b.b
w=J.y(y,b.c)
v=J.y(b.b,b.d)
u=new E.v(new Float64Array(H.i(3)))
u.B(y,x,0)
t=z.t(0,u)
u=new E.v(new Float64Array(H.i(3)))
u.B(y,v,0)
s=z.t(0,u)
u=new E.v(new Float64Array(H.i(3)))
u.B(w,x,0)
r=z.t(0,u)
u=new E.v(new Float64Array(H.i(3)))
u.B(w,v,0)
q=z.t(0,u)
u=c.a.a
this.at(a,t,s,r,q,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)},
at:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.r
y=z.length/8|0
C.a.I(z,[b.gi(b),b.gj(b),this.Q,f,g,h,i,-1,c.gi(c),c.gj(c),this.Q,f,g,h,i,-1,d.gi(d),d.gj(d),this.Q,f,g,h,i,-1,e.gi(e),e.gj(e),this.Q,f,g,h,i,-1])
C.a.I(this.y,[0,0,0,0,0,0,0,0])
this.Q+=0.0001
z=y+1
x=y+2
C.a.I(this.x,[y,z,x,z,y+3,x])},
bI:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.aI()
y=b.a
x=b.b
w=J.y(y,b.c)
v=J.y(b.b,b.d)
u=new E.v(new Float64Array(H.i(3)))
u.B(y,x,0)
t=z.t(0,u)
u=c.c
if(typeof y!=="number")return y.R()
if(typeof x!=="number")return x.R()
s=new E.v(new Float64Array(H.i(3)))
s.B(y-u,x-u,0)
r=z.t(0,s)
s=new E.v(new Float64Array(H.i(3)))
s.B(y,v,0)
q=z.t(0,s)
s=c.c
u=J.ac(v)
p=u.n(v,s)
o=new E.v(new Float64Array(H.i(3)))
o.B(y-s,p,0)
n=z.t(0,o)
o=new E.v(new Float64Array(H.i(3)))
o.B(w,x,0)
m=z.t(0,o)
o=J.ac(w)
p=o.n(w,c.c)
s=c.c
l=new E.v(new Float64Array(H.i(3)))
l.B(p,x-s,0)
k=z.t(0,l)
l=new E.v(new Float64Array(H.i(3)))
l.B(w,v,0)
j=z.t(0,l)
o=o.n(w,c.c)
u=u.n(v,c.c)
l=new E.v(new Float64Array(H.i(3)))
l.B(o,u,0)
i=z.t(0,l)
l=c.a.a
h=(l>>>16&255)/255
g=(l>>>8&255)/255
f=(l>>>0&255)/255
e=(l>>>24&255)/255
this.at(a,r,n,t,q,h,g,f,e)
this.at(a,n,i,q,j,h,g,f,e)
this.at(a,i,k,j,m,h,g,f,e)
this.at(a,k,r,m,t,h,g,f,e)},
b2:function(a,b){var z
this.b5(0)
J.cM(this.c,!1,!1,!1,!1)
J.cN(this.c,!1)
J.cS(this.c,7680,7681,7681)
J.cR(this.c,519,this.f,255)
z=F.a2(null)
z.a=F.m(255,255,255,255)
this.ay(null,b,z)
this.b5(0)
J.cM(this.c,!0,!0,!0,!0)
J.cN(this.c,!0)
J.cS(this.c,7680,7680,7680)
J.cR(this.c,515,this.f,255);++this.f},
ax:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.z
if(z!=null&&!J.E(z,b))this.b5(0)
this.z=b
z=c.a
y=b.gM()
if(typeof z!=="number")return z.bd()
if(typeof y!=="number")return H.D(y)
x=z/y
y=c.b
z=this.z.gU()
if(typeof y!=="number")return y.bd()
if(typeof z!=="number")return H.D(z)
w=y/z
z=J.y(c.a,c.c)
y=this.z.gM()
if(typeof z!=="number")return z.bd()
if(typeof y!=="number")return H.D(y)
v=z/y
y=J.y(c.b,c.d)
z=this.z.gU()
if(typeof y!=="number")return y.bd()
if(typeof z!=="number")return H.D(z)
u=y/z
C.a.I(this.y,[x,w,x,u,v,w,v,u])
t=this.aI()
s=d.a
r=d.b
q=J.y(s,d.c)
p=J.y(d.b,d.d)
z=new E.v(new Float64Array(H.i(3)))
z.B(s,r,0)
o=t.t(0,z)
z=new E.v(new Float64Array(H.i(3)))
z.B(s,p,0)
n=t.t(0,z)
z=new E.v(new Float64Array(H.i(3)))
z.B(q,r,0)
m=t.t(0,z)
z=new E.v(new Float64Array(H.i(3)))
z.B(q,p,0)
l=t.t(0,z)
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
bc:function(){},
aI:function(){var z,y
this.cx.v()
z=this.cx.J(0,-1,1,0)
this.cx=z
y=this.d
y=z.c4(0,2/y.c,-2/y.d,1)
this.cx=y
y=y.t(0,C.a.gaz(this.a))
this.cx=y
return y}},
id:{
"^":"ic;q:c>,p:d>,a,b",
b6:function(a){var z=0,y=new P.Z(),x,w=2,v,u,t
function $async$b6(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.k(t.ck(a),$async$b6,y)
case 3:x=new u.ip(c,null)
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$b6,y,null)},
aO:function(a){var z=0,y=new P.Z(),x,w=2,v,u,t,s,r,q,p,o,n,m
function $async$aO(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=H
p=p
o=P
o=o
n=$
u=r.e(new q.cq(p.e(new o.G(0,n.o,null),[null])),[null])
t=new XMLHttpRequest()
r=C
r=r.B
r.fG(t,"GET",a)
r=t
r.responseType="arraybuffer"
r=H
r=r
q=W
s=r.e(new q.cs(t,"load",!1),[null])
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
n=n.K(new m.ie(u,t))
m=s
q=new q.J(0,p,o,n,m.c)
p=H
r=r.e(q,[p.C(s,0)])
r.H()
r=H
r=r
q=W
s=r.e(new q.cs(t,"error",!1),[null])
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
n=n.K(new m.ig(u))
m=s
q=new q.J(0,p,o,n,m.c)
p=H
r=r.e(q,[p.C(s,0)])
r.H()
r=t
r.send()
r=u
x=r.a
z=1
break
case 1:return H.k(x,0,y,null)
case 2:return H.k(v,1,y)}}return H.k(null,$async$aO,y,null)}},
ie:{
"^":"c:25;a,b",
$1:function(a){var z=0,y=new P.Z(),x=1,w,v=this,u,t,s,r
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=J
t=t
s=W
s=s
r=v
r=r.b
u=t.ez(s.jI(r.response))
t=v
t=t.a
t=t
s=P
s=new s.iF(!0)
t.b4(0,s.eW(u))
return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$$1,y,null)}},
ig:{
"^":"c:26;a",
$1:function(a){this.a.cK(a)}},
is:{
"^":"ho;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gi:function(a){return 0},
gj:function(a){return 0},
gM:function(){return this.a.c},
gU:function(){return this.a.d},
gfH:function(a){return 0},
fA:function(){this.r=!0},
aV:function(){var z=0,y=new P.Z(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h
function $async$aV(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:j=H
j=j
i=P
u=j.dy(new i.bR(Date.now(),!1))
j=v
t=j.a
j=E
j=j
i=Float64Array
h=H
s=new j.r(new i(h.i(16)))
j=s
j.v()
j=E
j=j
i=Float64Array
h=H
r=new j.r(new i(h.i(16)))
j=r
j.v()
j=E
j=j
i=Float64Array
h=H
q=new j.r(new i(h.i(16)))
j=q
j.v()
j=G
p=new j.il(null,null,null,1,[],[],[],null,0,s,r,[q],[])
j=p
i=t
j.c=i.a
j=p
j.d=t
j=p
j.fn()
j=p
j.T(0)
o=0,n=0
case 2:j=v
if(!j.d){z=4
break}j=P
j=j
i=P
z=5
return H.k(j.fI(new i.ae(15e3),null,null),$async$aV,y)
case 5:m=Date.now()
j=v
j.b=m
l=m-u
j=v
j=j
i=C
i=i.c
j.fw(i.aC(u+l))
o+=l
if(l<0);else ;++n
j=v
j.r=!0
z=o>40?6:7
break
case 6:j=p
j.T(0)
j=v
j=j.gZ()
j.bS(v,p)
j=p
j.b5(0)
j=v
j.r=!1
case 7:z=n>40?8:9
break
case 8:j=C
j=j.c
k="###fps  "+j.c8(o,n)
j=H
j.cI(k)
o=0
n=0
case 9:case 3:u=m
z=2
break
case 4:return H.k(null,0,y,null)
case 1:return H.k(w,1,y)}}return H.k(null,$async$aV,y,null)},
fS:function(){var z,y,x,w
z=P.at()
y=new G.iB(this,z)
x=new G.iA(this,z)
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchcancel",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(x),w.c),[H.C(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchend",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(x),w.c),[H.C(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchenter",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(y),w.c),[H.C(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchleave",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(y),w.c),[H.C(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchmove",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(y),w.c),[H.C(w,0)]).H()
w=this.a.b
w.toString
w=H.e(new W.z(w,"touchstart",!1),[null])
H.e(new W.J(0,w.a,w.b,W.K(y),w.c),[H.C(w,0)]).H()},
fC:function(){var z,y
z={}
z.a=!1
y=J.eR(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.it(z,this)),y.c),[H.C(y,0)]).H()
y=J.eX(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iu(z,this)),y.c),[H.C(y,0)]).H()
y=J.eS(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iv(z,this)),y.c),[H.C(y,0)]).H()
y=J.eT(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iw(z,this)),y.c),[H.C(y,0)]).H()
y=J.eU(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.ix(z,this)),y.c),[H.C(y,0)]).H()
y=J.eV(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iy(z,this)),y.c),[H.C(y,0)]).H()
y=J.eW(this.a.b)
H.e(new W.J(0,y.a,y.b,W.K(new G.iz(z,this)),y.c),[H.C(y,0)]).H()}},
ho:{
"^":"a+ik;"},
iB:{
"^":"c:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.cP(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.O)(y),++v){u=y[v]
t=C.b.L(u.pageX)
s=C.b.L(u.pageY)
new P.W(t,s).$builtinTypeInfo=[null]
r=t-C.b.L(z.a.b.offsetLeft)
t=C.b.L(u.pageX)
s=C.b.L(u.pageY)
new P.W(t,s).$builtinTypeInfo=[null]
q=s-C.b.L(z.a.b.offsetTop)
if(w.X(u.identifier)){t=z.gZ()
s=u.identifier
if(typeof s!=="number")return s.n()
z.a7(t.c)
t.ab(z,s+1,"pointermove",r,q)
z.a6()}else{w.l(0,u.identifier,u)
t=z.gZ()
s=u.identifier
if(typeof s!=="number")return s.n()
z.a7(t.c)
t.ab(z,s+1,"pointerdown",r,q)
z.a6()}}}},
iA:{
"^":"c:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
z.c=z.b
for(y=J.cP(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.O)(y),++v){u=y[v]
if(w.X(u.identifier)){t=C.b.L(u.pageX)
s=C.b.L(u.pageY)
new P.W(t,s).$builtinTypeInfo=[null]
s=C.b.L(z.a.b.offsetLeft)
r=C.b.L(u.pageX)
q=C.b.L(u.pageY)
new P.W(r,q).$builtinTypeInfo=[null]
r=C.b.L(z.a.b.offsetTop)
w.a8(0,u.identifier)
p=z.gZ()
o=u.identifier
if(typeof o!=="number")return o.n()
z.a7(p.c)
p.ab(z,o+1,"pointerup",t-s,q-r)
z.a6()}}}},
it:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=z.gZ()
x=J.j(a)
w=x.gV(a)
w=w.gi(w)
w.toString
x=x.gV(a)
x=x.gj(x)
x.toString
z.a7(y.c)
y.ab(z,0,"pointerdown",w,x)
z.a6()}}},
iu:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gZ()
w=J.j(a)
v=w.gV(a)
v=v.gi(v)
v.toString
w=w.gV(a)
w=w.gj(w)
w.toString
z.a7(x.c)
x.ab(z,0,"pointerup",v,w)
z.a6()
y.a=!1}}}},
iv:{
"^":"c:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
iw:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gZ()
w=J.j(a)
v=w.gV(a)
v=v.gi(v)
v.toString
w=w.gV(a)
w=w.gj(w)
w.toString
z.a7(x.c)
x.ab(z,0,"pointercancel",v,w)
z.a6()
y.a=!1}}}},
ix:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b)if(this.a.a){y=z.gZ()
x=J.j(a)
w=x.gV(a)
w=w.gi(w)
w.toString
x=x.gV(a)
x=x.gj(x)
x.toString
z.a7(y.c)
y.ab(z,0,"pointermove",w,x)
z.a6()}}},
iy:{
"^":"c:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gZ()
w=J.j(a)
v=w.gV(a)
v=v.gi(v)
v.toString
w=w.gV(a)
w=w.gj(w)
w.toString
z.a7(x.c)
x.ab(z,0,"pointercancel",v,w)
z.a6()
y.a=!1}}}},
iz:{
"^":"c:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
iq:{
"^":"c:1;a,b",
$1:function(a){this.a.b4(0,this.b)}},
ir:{
"^":"c:1;a,b",
$1:function(a){this.b.cK("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
r:{
"^":"a;a",
aF:function(a){var z,y
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
k:function(a){return"[0] "+this.aT(0).k(0)+"\n[1] "+this.aT(1).k(0)+"\n[2] "+this.aT(2).k(0)+"\n[3] "+this.aT(3).k(0)+"\n"},
gf7:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.f(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=16)return H.f(z,b)
z[b]=c},
aT:function(a){var z,y,x
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
bD:function(a){var z=new E.r(new Float64Array(H.i(16)))
z.aF(this)
return z},
t:function(a,b){var z,y,x
if(!!b.$isak){z=new Float64Array(H.i(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ak(z)}if(!!b.$isv){z=new Float64Array(H.i(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.v(z)}if(4===b.gf7()){z=new Float64Array(H.i(16))
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
return new E.r(z)}throw H.d(P.aR(b))},
n:function(a,b){var z,y
z=new Float64Array(H.i(16))
y=this.a
z[0]=C.b.n(y[0],b.gD().h(0,0))
z[1]=C.b.n(y[1],b.gD().h(0,1))
z[2]=C.b.n(y[2],b.gD().h(0,2))
z[3]=C.b.n(y[3],b.gD().h(0,3))
z[4]=C.b.n(y[4],b.gD().h(0,4))
z[5]=C.b.n(y[5],b.gD().h(0,5))
z[6]=C.b.n(y[6],b.gD().h(0,6))
z[7]=C.b.n(y[7],b.gD().h(0,7))
z[8]=C.b.n(y[8],b.gD().h(0,8))
z[9]=C.b.n(y[9],b.gD().h(0,9))
z[10]=C.b.n(y[10],b.gD().h(0,10))
z[11]=C.b.n(y[11],b.gD().h(0,11))
z[12]=C.b.n(y[12],b.gD().h(0,12))
z[13]=C.b.n(y[13],b.gD().h(0,13))
z[14]=C.b.n(y[14],b.gD().h(0,14))
z[15]=C.b.n(y[15],b.gD().h(0,15))
return new E.r(z)},
J:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.p(b)
y=!!z.$isak
x=y?b.gM():1
if(!!z.$isv||y){w=z.gi(b)
v=z.gj(b)
u=z.ga9(b)}else{u=d
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
c4:function(a,b,c,d){var z,y,x,w,v,u
z=J.p(b)
y=!!z.$isak
x=y?b.gM():1
if(!!z.$isv||y){w=z.gi(b)
v=z.gj(b)
u=z.ga9(b)}else{u=d
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
ft:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
v:{
"^":"a;a",
B:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aF:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
k:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
n:function(a,b){var z,y,x,w
z=this.a
y=C.b.n(z[0],b.gD().h(0,0))
x=C.b.n(z[1],b.gD().h(0,1))
z=C.b.n(z[2],b.gD().h(0,2))
w=new E.v(new Float64Array(H.i(3)))
w.B(y,x,z)
return w},
t:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.D(b)
x=z[1]
z=z[2]
w=new E.v(new Float64Array(H.i(3)))
w.B(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.f(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=3)return H.f(z,b)
z[b]=c},
gm:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.a3(y*y+x*x+z*z))},
bD:function(a){var z=new E.v(new Float64Array(H.i(3)))
z.aF(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
sa9:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]}},
ak:{
"^":"a;a",
c6:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aF:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
k:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
n:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.n(z[0],b.gD().h(0,0))
x=C.b.n(z[1],b.gD().h(0,1))
w=C.b.n(z[2],b.gD().h(0,2))
z=C.b.n(z[3],b.gD().h(0,3))
v=new E.ak(new Float64Array(H.i(4)))
v.c6(y,x,w,z)
return v},
t:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.D(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ak(new Float64Array(H.i(4)))
v.c6(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.f(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=4)return H.f(z,b)
z[b]=c},
gm:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.a3(y*y+x*x+w*w+z*z))},
bD:function(a){var z=new E.ak(new Float64Array(H.i(4)))
z.aF(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
sa9:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]},
gM:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dd.prototype
return J.dc.prototype}if(typeof a=="string")return J.bg.prototype
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
if(!(a instanceof P.a))return J.co.prototype
return a}
J.ac=function(a){if(typeof a=="number")return J.aV.prototype
if(typeof a=="string")return J.bg.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.co.prototype
return a}
J.j=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bE(a)}
J.y=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ac(a).n(a,b)}
J.E=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).u(a,b)}
J.U=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aC(a).ah(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aC(a).ai(a,b)}
J.ew=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ac(a).t(a,b)}
J.bL=function(a,b){if(a.constructor==Array||typeof a=="string"||H.kh(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.F(a).h(a,b)}
J.ex=function(a,b,c,d){return J.j(a).e6(a,b,c,d)}
J.ey=function(a,b,c,d){return J.j(a).ev(a,b,c,d)}
J.ez=function(a){return J.j(a).eB(a)}
J.bM=function(a,b,c){return J.j(a).eD(a,b,c)}
J.cL=function(a,b,c){return J.j(a).eE(a,b,c)}
J.eA=function(a,b){return J.j(a).eG(a,b)}
J.eB=function(a,b,c,d,e){return J.j(a).eH(a,b,c,d,e)}
J.eC=function(a,b,c,d){return J.j(a).eI(a,b,c,d)}
J.eD=function(a,b){return J.aO(a).eL(a,b)}
J.eE=function(a,b,c,d,e){return J.j(a).eM(a,b,c,d,e)}
J.eF=function(a,b){return J.j(a).eN(a,b)}
J.eG=function(a,b){return J.j(a).eQ(a,b)}
J.cM=function(a,b,c,d,e){return J.j(a).eS(a,b,c,d,e)}
J.eH=function(a,b){return J.ac(a).aw(a,b)}
J.eI=function(a,b){return J.j(a).b4(a,b)}
J.bN=function(a,b,c){return J.F(a).eU(a,b,c)}
J.bO=function(a){return J.j(a).eX(a)}
J.eJ=function(a){return J.j(a).eY(a)}
J.eK=function(a,b){return J.j(a).eZ(a,b)}
J.eL=function(a,b){return J.j(a).f0(a,b)}
J.cN=function(a,b){return J.j(a).f1(a,b)}
J.eM=function(a,b){return J.j(a).f8(a,b)}
J.eN=function(a,b,c,d,e){return J.j(a).f9(a,b,c,d,e)}
J.eO=function(a,b){return J.aO(a).a2(a,b)}
J.cO=function(a,b){return J.j(a).fe(a,b)}
J.b6=function(a,b){return J.j(a).ff(a,b)}
J.eP=function(a,b){return J.aO(a).N(a,b)}
J.cP=function(a){return J.j(a).geK(a)}
J.a9=function(a){return J.j(a).gaK(a)}
J.I=function(a){return J.p(a).gE(a)}
J.eQ=function(a){return J.j(a).gp(a)}
J.b7=function(a){return J.aO(a).gK(a)}
J.aP=function(a){return J.F(a).gm(a)}
J.eR=function(a){return J.j(a).gcX(a)}
J.eS=function(a){return J.j(a).gcY(a)}
J.eT=function(a){return J.j(a).gcZ(a)}
J.eU=function(a){return J.j(a).gd_(a)}
J.eV=function(a){return J.j(a).gd0(a)}
J.eW=function(a){return J.j(a).gd1(a)}
J.eX=function(a){return J.j(a).gd2(a)}
J.eY=function(a){return J.j(a).gc_(a)}
J.eZ=function(a){return J.j(a).gq(a)}
J.f_=function(a){return J.j(a).gi(a)}
J.b8=function(a,b,c){return J.j(a).dm(a,b,c)}
J.f0=function(a){return J.j(a).dn(a)}
J.f1=function(a,b){return J.j(a).dq(a,b)}
J.cQ=function(a,b){return J.j(a).du(a,b)}
J.f2=function(a,b,c){return J.j(a).dw(a,b,c)}
J.f3=function(a,b){return J.aO(a).aA(a,b)}
J.aD=function(a,b){return J.j(a).bg(a,b)}
J.f4=function(a,b){return J.j(a).sp(a,b)}
J.f5=function(a,b){return J.j(a).sae(a,b)}
J.f6=function(a,b){return J.j(a).sq(a,b)}
J.cR=function(a,b,c,d){return J.j(a).dK(a,b,c,d)}
J.cS=function(a,b,c,d){return J.j(a).dL(a,b,c,d)}
J.b9=function(a,b,c,d){return J.j(a).fQ(a,b,c,d)}
J.A=function(a){return J.aC(a).fR(a)}
J.cT=function(a){return J.aC(a).aC(a)}
J.aQ=function(a){return J.p(a).k(a)}
J.cU=function(a,b){return J.j(a).fT(a,b)}
J.ba=function(a,b,c,d,e,f,g){return J.j(a).fU(a,b,c,d,e,f,g)}
I.cG=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.B=W.fM.prototype
C.a=J.aU.prototype
C.C=J.dc.prototype
C.c=J.dd.prototype
C.b=J.aV.prototype
C.h=J.bg.prototype
C.N=J.hq.prototype
C.O=P.hH.prototype
C.P=J.co.prototype
C.w=new F.fb(1)
C.x=new H.d5()
C.y=new P.hp()
C.z=new P.iS()
C.A=new P.jb()
C.d=new P.jr()
C.r=new P.ae(0)
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
C.t=function getTagFallback(o) {
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
C.u=function(hooks) { return hooks; }

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
C.v=H.e(I.cG([127,2047,65535,1114111]),[P.n])
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
C.f=new F.ij(0)
$.dz="$cachedFunction"
$.dA="$cachedInvocation"
$.a5=0
$.aE=null
$.cW=null
$.cC=null
$.eh=null
$.es=null
$.bD=null
$.bG=null
$.cD=null
$.ax=null
$.aK=null
$.aL=null
$.cx=!1
$.o=C.d
$.d7=0
$.d2=null
$.d1=null
$.d0=null
$.d_=null
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
I.$lazy(y,x,w)}})(["da","$get$da",function(){return H.fZ()},"db","$get$db",function(){return new P.fE(null)},"dN","$get$dN",function(){return H.a8(H.bw({toString:function(){return"$receiver$"}}))},"dO","$get$dO",function(){return H.a8(H.bw({$method$:null,toString:function(){return"$receiver$"}}))},"dP","$get$dP",function(){return H.a8(H.bw(null))},"dQ","$get$dQ",function(){return H.a8(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dU","$get$dU",function(){return H.a8(H.bw(void 0))},"dV","$get$dV",function(){return H.a8(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dS","$get$dS",function(){return H.a8(H.dT(null))},"dR","$get$dR",function(){return H.a8(function(){try{null.$method$}catch(z){return z.message}}())},"dX","$get$dX",function(){return H.a8(H.dT(void 0))},"dW","$get$dW",function(){return H.a8(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cr","$get$cr",function(){return P.iG()},"aM","$get$aM",function(){return[]},"dj","$get$dj",function(){return[500,250,200,150,125]},"bn","$get$bn",function(){return[150,150,125,100,100]},"c1","$get$c1",function(){return[150,125,125,125,125]},"dk","$get$dk",function(){return[5,8,10,12,15]},"dl","$get$dl",function(){return[10,20,30,40,50]},"dn","$get$dn",function(){return C.A},"c6","$get$c6",function(){return F.m(170,136,136,136)},"c7","$get$c7",function(){return F.m(170,85,51,51)},"c9","$get$c9",function(){return F.m(170,255,255,255)},"bp","$get$bp",function(){return F.m(170,0,0,0)},"ca","$get$ca",function(){return F.m(170,255,170,170)},"cc","$get$cc",function(){return F.m(170,170,255,170)},"c8","$get$c8",function(){return F.m(170,170,170,255)},"bo","$get$bo",function(){return F.m(170,255,255,170)},"cb","$get$cb",function(){return F.m(170,170,255,255)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,void:true},{func:1,args:[P.a7]},{func:1,args:[W.c2]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.ai]},{func:1,args:[,],opt:[,]},{func:1,ret:P.a7,args:[P.n]},{func:1,args:[W.cm]},{func:1,args:[,P.a7]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.ai]},{func:1,ret:P.cz},{func:1,void:true,args:[P.a],opt:[P.ai]},{func:1,void:true,args:[,P.ai]},{func:1,args:[,,]},{func:1,ret:P.n,args:[,P.n]},{func:1,void:true,args:[P.n,P.n]},{func:1,args:[P.dG,,]},{func:1,args:[F.ci]},{func:1,args:[P.a7,,]},{func:1,ret:P.n,args:[,]},{func:1,args:[P.n]},{func:1,args:[P.n,,]},{func:1,ret:P.a1,args:[W.aY]},{func:1,args:[W.aY]},{func:1,ret:P.n,args:[P.P,P.P]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.kp(d||a)
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
Isolate.cG=a.cG
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