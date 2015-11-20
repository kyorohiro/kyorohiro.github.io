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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cG"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cG"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cG(this,c,d,true,[],f).prototype
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
kY:{
"^":"a;a"}}],["","",,J,{
"^":"",
o:function(a){return void 0},
bL:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bH:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cI==null){H.k_()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.cs("Return interceptor for "+H.b(y(a,z))))}w=H.k8(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.K
else return C.M}return w},
h:{
"^":"a;",
u:function(a,b){return a===b},
gD:function(a){return H.ai(a)},
k:["dJ",function(a){return H.bv(a)}],
"%":"DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
fY:{
"^":"h;",
k:function(a){return String(a)},
gD:function(a){return a?519018:218159},
$iscE:1},
h_:{
"^":"h;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gD:function(a){return 0}},
dn:{
"^":"h;",
gD:function(a){return 0},
$ish0:1},
hk:{
"^":"dn;"},
ct:{
"^":"dn;",
k:function(a){return String(a)}},
aZ:{
"^":"h;",
bA:function(a,b){if(!!a.immutable$list)throw H.e(new P.V(b))},
b_:function(a,b){if(!!a.fixed$length)throw H.e(new P.V(b))},
a3:function(a,b){var z
this.b_(a,"remove")
for(z=0;z<a.length;++z)if(J.C(a[z],b)){a.splice(z,1)
return!0}return!1},
H:function(a,b){var z,y
this.b_(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.M)(b),++y)a.push(b[y])},
M:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.Q(a))}},
az:function(a,b){return H.f(new H.c2(a,b),[null,null])},
ay:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.c(y,x)
y[x]=w}return y.join(b)},
ae:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
gF:function(a){if(a.length>0)return a[0]
throw H.e(H.bY())},
gan:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bY())},
c1:function(a,b,c,d,e){var z,y,x
this.bA(a,"set range")
P.bx(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.F(P.aj(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.fW())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}},
k:function(a){return P.bi(a,"[","]")},
gN:function(a){return new J.f8(a,a.length,0,null)},
gD:function(a){return H.ai(a)},
gn:function(a){return a.length},
sn:function(a,b){this.b_(a,"set length")
if(b<0)throw H.e(P.aj(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.J(a,b))
if(b>=a.length||b<0)throw H.e(H.J(a,b))
return a[b]},
m:function(a,b,c){this.bA(a,"indexed set")
if(b>=a.length||b<0)throw H.e(H.J(a,b))
a[b]=c},
$isbj:1,
$ism:1,
$asm:null,
$isx:1},
kX:{
"^":"aZ;"},
f8:{
"^":"a;a,b,c,d",
gI:function(){return this.d},
E:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.Q(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b_:{
"^":"h;",
aw:function(a,b){var z
if(typeof b!=="number")throw H.e(H.S(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbJ(b)
if(this.gbJ(a)===z)return 0
if(this.gbJ(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gfk(b))return 0
return 1}else return-1},
gbJ:function(a){return a===0?1/a<0:a<0},
gfk:function(a){return isNaN(a)},
bS:function(a,b){return a%b},
aB:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.V(""+a))},
K:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.V(""+a))},
fH:function(a){return a},
b8:function(a,b){var z,y,x,w
H.cF(b)
if(b<2||b>36)throw H.e(P.aj(b,2,36,"radix",null))
z=a.toString(b)
if(C.o.cF(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.F(new P.V("Unexpected toString result: "+z))
x=J.E(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.o.t("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD:function(a){return a&0x1FFFFFFF},
l:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a+b},
O:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a-b},
t:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a*b},
ds:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
c3:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aB(a/b)},
aj:function(a,b){return(a|0)===a?a/b|0:this.aB(a/b)},
aY:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ag:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a<b},
aq:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a>b},
b9:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a>=b},
$isap:1},
dm:{
"^":"b_;",
$isap:1,
$isl:1},
fZ:{
"^":"b_;",
$isap:1},
bk:{
"^":"h;",
cF:function(a,b){if(b<0)throw H.e(H.J(a,b))
if(b>=a.length)throw H.e(H.J(a,b))
return a.charCodeAt(b)},
l:function(a,b){if(typeof b!=="string")throw H.e(P.f7(b,null,null))
return a+b},
dI:function(a,b,c){H.cF(b)
if(c==null)c=a.length
H.cF(c)
if(b<0)throw H.e(P.b4(b,null,null))
if(typeof c!=="number")return H.z(c)
if(b>c)throw H.e(P.b4(b,null,null))
if(c>a.length)throw H.e(P.b4(c,null,null))
return a.substring(b,c)},
dH:function(a,b){return this.dI(a,b,null)},
t:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.e(C.x)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
eO:function(a,b,c){if(c>a.length)throw H.e(P.aj(c,0,a.length,null,null))
return H.kd(a,b,c)},
gY:function(a){return a.length===0},
aw:function(a,b){var z
if(typeof b!=="string")throw H.e(H.S(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gD:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gn:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.J(a,b))
if(b>=a.length||b<0)throw H.e(H.J(a,b))
return a[b]},
$isbj:1,
$isa7:1}}],["","",,H,{
"^":"",
b7:function(a,b){var z=a.aK(b)
if(!init.globalState.d.cy)init.globalState.f.aQ()
return z},
bK:function(){--init.globalState.f.b},
eB:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$ism)throw H.e(P.aW("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.ja(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$dk()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.iL(P.c0(null,H.b6),0)
y.z=P.bn(null,null,null,P.l,H.cA)
y.ch=P.bn(null,null,null,P.l,null)
if(y.x===!0){x=new H.j9()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fP,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jb)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.bn(null,null,null,P.l,H.by)
w=P.aJ(null,null,null,P.l)
v=new H.by(0,null,!1)
u=new H.cA(y,x,w,init.createNewIsolate(),v,new H.au(H.bM()),new H.au(H.bM()),!1,!1,[],P.aJ(null,null,null,null),null,null,!1,!0,P.aJ(null,null,null,null))
w.av(0,0)
u.c5(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.ba()
x=H.aE(y,[y]).ai(a)
if(x)u.aK(new H.kb(z,a))
else{y=H.aE(y,[y,y]).ai(a)
if(y)u.aK(new H.kc(z,a))
else u.aK(a)}init.globalState.f.aQ()},
fT:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fU()
return},
fU:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.V("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.V("Cannot extract URI from \""+H.b(z)+"\""))},
fP:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bB(!0,[]).al(b.data)
y=J.E(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bB(!0,[]).al(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bB(!0,[]).al(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.bn(null,null,null,P.l,H.by)
p=P.aJ(null,null,null,P.l)
o=new H.by(0,null,!1)
n=new H.cA(y,q,p,init.createNewIsolate(),o,new H.au(H.bM()),new H.au(H.bM()),!1,!1,[],P.aJ(null,null,null,null),null,null,!1,!0,P.aJ(null,null,null,null))
p.av(0,0)
n.c5(0,o)
init.globalState.f.a.ab(new H.b6(n,new H.fQ(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aQ()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aG(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aQ()
break
case"close":init.globalState.ch.a3(0,$.$get$dl().h(0,a))
a.terminate()
init.globalState.f.aQ()
break
case"log":H.fO(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ax(["command","print","msg",z])
q=new H.az(!0,P.aw(null,P.l)).V(q)
y.toString
self.postMessage(q)}else P.a3(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
fO:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ax(["command","log","msg",a])
x=new H.az(!0,P.aw(null,P.l)).V(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.N(w)
z=H.L(w)
throw H.e(P.bh(z))}},
fR:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dE=$.dE+("_"+y)
$.dF=$.dF+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aG(f,["spawned",new H.bD(y,x),w,z.r])
x=new H.fS(a,b,c,d,z)
if(e===!0){z.cC(w,w)
init.globalState.f.a.ab(new H.b6(z,x,"start isolate"))}else x.$0()},
jx:function(a){return new H.bB(!0,[]).al(new H.az(!1,P.aw(null,P.l)).V(a))},
kb:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
kc:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ja:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{jb:function(a){var z=P.ax(["command","print","msg",a])
return new H.az(!0,P.aw(null,P.l)).V(z)}}},
cA:{
"^":"a;a,b,c,fl:d<,eP:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cC:function(a,b){if(!this.f.u(0,a))return
if(this.Q.av(0,b)&&!this.y)this.y=!0
this.bw()},
fA:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a3(0,a)
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
if(w===y.c)y.cf();++y.d}this.y=!1}this.bw()},
eu:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.c(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fz:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.F(new P.V("removeRange"))
P.bx(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dC:function(a,b){if(!this.r.u(0,a))return
this.db=b},
fb:function(a,b,c){var z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){J.aG(a,c)
return}z=this.cx
if(z==null){z=P.c0(null,null)
this.cx=z}z.ab(new H.j1(a,c))},
f9:function(a,b){var z
if(!this.r.u(0,a))return
z=J.o(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.bK()
return}z=this.cx
if(z==null){z=P.c0(null,null)
this.cx=z}z.ab(this.gfn())},
fc:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.a3(a)
if(b!=null)P.a3(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aU(a)
y[1]=b==null?null:J.aU(b)
for(x=new P.dp(z,z.r,null,null),x.c=z.e;x.E();)J.aG(x.d,y)},
aK:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.N(u)
w=t
v=H.L(u)
this.fc(w,v)
if(this.db===!0){this.bK()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfl()
if(this.cx!=null)for(;t=this.cx,!t.gY(t);)this.cx.d5().$0()}return y},
cS:function(a){return this.b.h(0,a)},
c5:function(a,b){var z=this.b
if(z.a9(a))throw H.e(P.bh("Registry: ports must be registered only once."))
z.m(0,a,b)},
bw:function(){var z=this.b
if(z.gn(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.bK()},
bK:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.P(0)
for(z=this.b,y=z.gdh(z),y=y.gN(y);y.E();)y.gI().e3()
z.P(0)
this.c.P(0)
init.globalState.z.a3(0,this.a)
this.dx.P(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.c(z,v)
J.aG(w,z[v])}this.ch=null}},"$0","gfn",0,0,2]},
j1:{
"^":"d:2;a,b",
$0:function(){J.aG(this.a,this.b)}},
iL:{
"^":"a;a,b",
eX:function(){var z=this.a
if(z.b===z.c)return
return z.d5()},
dc:function(){var z,y,x
z=this.eX()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a9(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gY(y)}else y=!1
else y=!1
else y=!1
if(y)H.F(P.bh("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gY(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ax(["command","close"])
x=new H.az(!0,P.aw(null,P.l)).V(x)
y.toString
self.postMessage(x)}return!1}z.fw()
return!0},
cr:function(){if(self.window!=null)new H.iM(this).$0()
else for(;this.dc(););},
aQ:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cr()
else try{this.cr()}catch(x){w=H.N(x)
z=w
y=H.L(x)
w=init.globalState.Q
v=P.ax(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.az(!0,P.aw(null,P.l)).V(v)
w.toString
self.postMessage(v)}}},
iM:{
"^":"d:2;a",
$0:function(){if(!this.a.dc())return
P.cj(C.r,this)}},
b6:{
"^":"a;a,b,c",
fw:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aK(this.b)}},
j9:{
"^":"a;"},
fQ:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.fR(this.a,this.b,this.c,this.d,this.e,this.f)}},
fS:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.ba()
w=H.aE(x,[x,x]).ai(y)
if(w)y.$2(this.b,this.c)
else{x=H.aE(x,[x]).ai(y)
if(x)y.$1(this.b)
else y.$0()}}z.bw()}},
e9:{
"^":"a;"},
bD:{
"^":"e9;b,a",
bc:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcj())return
x=H.jx(b)
if(z.geP()===y){y=J.E(x)
switch(y.h(x,0)){case"pause":z.cC(y.h(x,1),y.h(x,2))
break
case"resume":z.fA(y.h(x,1))
break
case"add-ondone":z.eu(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fz(y.h(x,1))
break
case"set-errors-fatal":z.dC(y.h(x,1),y.h(x,2))
break
case"ping":z.fb(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.f9(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.av(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a3(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(b)
y.a.ab(new H.b6(z,new H.jd(this,x),w))},
u:function(a,b){if(b==null)return!1
return b instanceof H.bD&&J.C(this.b,b.b)},
gD:function(a){return this.b.gbr()}},
jd:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gcj())z.e_(this.b)}},
cB:{
"^":"e9;b,c,a",
bc:function(a,b){var z,y,x
z=P.ax(["command","message","port",this,"msg",b])
y=new H.az(!0,P.aw(null,P.l)).V(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.cB&&J.C(this.b,b.b)&&J.C(this.a,b.a)&&J.C(this.c,b.c)},
gD:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.dE()
y=this.a
if(typeof y!=="number")return y.dE()
x=this.c
if(typeof x!=="number")return H.z(x)
return(z<<16^y<<8^x)>>>0}},
by:{
"^":"a;br:a<,b,cj:c<",
e3:function(){this.c=!0
this.b=null},
e_:function(a){if(this.c)return
this.ec(a)},
ec:function(a){return this.b.$1(a)},
$ishw:1},
hZ:{
"^":"a;a,b,c",
dU:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ab(new H.b6(y,new H.i0(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aQ(new H.i1(this,b),0),a)}else throw H.e(new P.V("Timer greater than 0."))},
static:{i_:function(a,b){var z=new H.hZ(!0,!1,null)
z.dU(a,b)
return z}}},
i0:{
"^":"d:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
i1:{
"^":"d:2;a,b",
$0:function(){this.a.c=null
H.bK()
this.b.$0()}},
au:{
"^":"a;br:a<",
gD:function(a){var z=this.a
if(typeof z!=="number")return z.fN()
z=C.b.aY(z,0)^C.b.aj(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.au){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
az:{
"^":"a;a,b",
V:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gn(z))
z=J.o(a)
if(!!z.$isdv)return["buffer",a]
if(!!z.$isc8)return["typed",a]
if(!!z.$isbj)return this.dw(a)
if(!!z.$isfN){x=this.gdt()
w=a.gcP()
w=H.bp(w,x,H.W(w,"Z",0),null)
w=P.c1(w,!0,H.W(w,"Z",0))
z=z.gdh(a)
z=H.bp(z,x,H.W(z,"Z",0),null)
return["map",w,P.c1(z,!0,H.W(z,"Z",0))]}if(!!z.$ish0)return this.dz(a)
if(!!z.$ish)this.dg(a)
if(!!z.$ishw)this.aR(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbD)return this.dA(a)
if(!!z.$iscB)return this.dB(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aR(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isau)return["capability",a.a]
if(!(a instanceof P.a))this.dg(a)
return["dart",init.classIdExtractor(a),this.dv(init.classFieldsExtractor(a))]},"$1","gdt",2,0,1],
aR:function(a,b){throw H.e(new P.V(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
dg:function(a){return this.aR(a,null)},
dw:function(a){var z=this.du(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aR(a,"Can't serialize indexable: ")},
du:function(a){var z,y,x
z=[]
C.a.sn(z,a.length)
for(y=0;y<a.length;++y){x=this.V(a[y])
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
dv:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.V(a[z]))
return a},
dz:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aR(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sn(y,z.length)
for(x=0;x<z.length;++x){w=this.V(a[z[x]])
if(x>=y.length)return H.c(y,x)
y[x]=w}return["js-object",z,y]},
dB:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dA:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbr()]
return["raw sendport",a]}},
bB:{
"^":"a;a,b",
al:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aW("Bad serialized message: "+H.b(a)))
switch(C.a.gF(a)){case"ref":if(1>=a.length)return H.c(a,1)
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
y=this.aI(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aI(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return this.aI(x)
case"const":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aI(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.f_(a)
case"sendport":return this.f0(a)
case"raw sendport":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.eZ(a)
case"function":if(1>=a.length)return H.c(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.c(a,1)
return new H.au(a[1])
case"dart":y=a.length
if(1>=y)return H.c(a,1)
w=a[1]
if(2>=y)return H.c(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aI(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","geY",2,0,1],
aI:function(a){var z,y,x
z=J.E(a)
y=0
while(!0){x=z.gn(a)
if(typeof x!=="number")return H.z(x)
if(!(y<x))break
z.m(a,y,this.al(z.h(a,y)));++y}return a},
f_:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w=P.b1()
this.b.push(w)
y=J.f1(y,this.geY()).bV(0)
for(z=J.E(y),v=J.E(x),u=0;u<z.gn(y);++u){if(u>=y.length)return H.c(y,u)
w.m(0,y[u],this.al(v.h(x,u)))}return w},
f0:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
if(3>=z)return H.c(a,3)
w=a[3]
if(J.C(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cS(w)
if(u==null)return
t=new H.bD(u,x)}else t=new H.cB(y,w,x)
this.b.push(t)
return t},
eZ:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.E(y)
v=J.E(x)
u=0
while(!0){t=z.gn(y)
if(typeof t!=="number")return H.z(t)
if(!(u<t))break
w[z.h(y,u)]=this.al(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
fl:function(){throw H.e(new P.V("Cannot modify unmodifiable Map"))},
jV:function(a){return init.types[a]},
k7:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.o(a).$isbl},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aU(a)
if(typeof z!=="string")throw H.e(H.S(a))
return z},
ai:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cg:function(a){var z,y
z=C.t(J.o(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.o.cF(z,0)===36)z=C.o.dH(z,1)
return(z+H.cK(H.bI(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
bv:function(a){return"Instance of '"+H.cg(a)+"'"},
hu:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
bw:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.aY(z,10))>>>0,56320|z&1023)}throw H.e(P.aj(a,0,1114111,null,null))},
R:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dD:function(a){return a.b?H.R(a).getUTCMilliseconds()+0:H.R(a).getMilliseconds()+0},
bu:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.S(a))
return a[b]},
ch:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.S(a))
a[b]=c},
z:function(a){throw H.e(H.S(a))},
c:function(a,b){if(a==null)J.aS(a)
throw H.e(H.J(a,b))},
J:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.at(!0,b,"index",null)
z=J.aS(a)
if(!(b<0)){if(typeof z!=="number")return H.z(z)
y=b>=z}else y=!0
if(y)return P.bX(b,a,"index",null,z)
return P.b4(b,"index",null)},
S:function(a){return new P.at(!0,a,null,null)},
a1:function(a){return a},
cF:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.S(a))
return a},
e:function(a){var z
if(a==null)a=new P.dB()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eC})
z.name=""}else z.toString=H.eC
return z},
eC:function(){return J.aU(this.dartException)},
F:function(a){throw H.e(a)},
M:function(a){throw H.e(new P.Q(a))},
N:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.kg(a)
if(a==null)return
if(a instanceof H.bW)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aY(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bZ(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.dA(v,null))}}if(a instanceof TypeError){u=$.$get$dW()
t=$.$get$dX()
s=$.$get$dY()
r=$.$get$dZ()
q=$.$get$e2()
p=$.$get$e3()
o=$.$get$e0()
$.$get$e_()
n=$.$get$e5()
m=$.$get$e4()
l=u.a_(y)
if(l!=null)return z.$1(H.bZ(y,l))
else{l=t.a_(y)
if(l!=null){l.method="call"
return z.$1(H.bZ(y,l))}else{l=s.a_(y)
if(l==null){l=r.a_(y)
if(l==null){l=q.a_(y)
if(l==null){l=p.a_(y)
if(l==null){l=o.a_(y)
if(l==null){l=r.a_(y)
if(l==null){l=n.a_(y)
if(l==null){l=m.a_(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dA(y,l==null?null:l.method))}}return z.$1(new H.iv(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dK()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.at(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dK()
return a},
L:function(a){var z
if(a instanceof H.bW)return a.b
if(a==null)return new H.ee(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ee(a,null)},
ka:function(a){if(a==null||typeof a!='object')return J.G(a)
else return H.ai(a)},
et:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
k1:function(a,b,c,d,e,f,g){var z=J.o(c)
if(z.u(c,0))return H.b7(b,new H.k2(a))
else if(z.u(c,1))return H.b7(b,new H.k3(a,d))
else if(z.u(c,2))return H.b7(b,new H.k4(a,d,e))
else if(z.u(c,3))return H.b7(b,new H.k5(a,d,e,f))
else if(z.u(c,4))return H.b7(b,new H.k6(a,d,e,f,g))
else throw H.e(P.bh("Unsupported number of arguments for wrapped closure"))},
aQ:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.k1)
a.$identity=z
return z},
fj:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$ism){z.$reflectionInfo=c
x=H.hz(z).r}else x=c
w=d?Object.create(new H.hM().constructor.prototype):Object.create(new H.bS(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a4
$.a4=J.r(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.d7(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.jV(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.d5:H.bT
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.d7(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
fg:function(a,b,c,d){var z=H.bT
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
d7:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fi(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fg(y,!w,z,b)
if(y===0){w=$.aH
if(w==null){w=H.bf("self")
$.aH=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.a4
$.a4=J.r(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aH
if(v==null){v=H.bf("self")
$.aH=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.a4
$.a4=J.r(w,1)
return new Function(v+H.b(w)+"}")()},
fh:function(a,b,c,d){var z,y
z=H.bT
y=H.d5
switch(b?-1:a){case 0:throw H.e(new H.hB("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fi:function(a,b){var z,y,x,w,v,u,t,s
z=H.f9()
y=$.d4
if(y==null){y=H.bf("receiver")
$.d4=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fh(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.a4
$.a4=J.r(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.a4
$.a4=J.r(u,1)
return new Function(y+H.b(u)+"}")()},
cG:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$ism){c.fixed$length=Array
z=c}else z=c
return H.fj(a,b,z,!!d,e,f)},
kf:function(a){throw H.e(new P.fp("Cyclic initialization for static "+H.b(a)))},
aE:function(a,b,c){return new H.hC(a,b,c,null)},
ba:function(){return C.w},
bM:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
p:function(a,b,c){var z
if(b===0){J.eI(c,a)
return}else if(b===1){c.cH(H.N(a),H.L(a))
return}if(!!J.o(a).$isa_)z=a
else{z=H.f(new P.D(0,$.n,null),[null])
z.aF(a)}z.b7(H.en(b,0),new H.jH(b))
return c.gf8()},
en:function(a,b){return new H.jF(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
f:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bI:function(a){if(a==null)return
return a.$builtinTypeInfo},
eu:function(a,b){return H.cP(a["$as"+H.b(b)],H.bI(a))},
W:function(a,b,c){var z=H.eu(a,b)
return z==null?null:z[c]},
B:function(a,b){var z=H.bI(a)
return z==null?null:z[b]},
cO:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cK(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.k(a)
else return},
cK:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bz("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.cO(u,c))}return w?"":"<"+H.b(z)+">"},
cP:function(a,b){if(typeof a=="function"){a=H.cJ(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cJ(a,null,b)}return b},
jL:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bI(a)
y=J.o(a)
if(y[b]==null)return!1
return H.eq(H.cP(y[d],z),c)},
ke:function(a,b,c,d){if(a!=null&&!H.jL(a,b,c,d))throw H.e(H.fb(H.cg(a),(b.substring(3)+H.cK(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
eq:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.X(a[y],b[y]))return!1
return!0},
bF:function(a,b,c){return H.cJ(a,b,H.eu(b,c))},
X:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.ev(a,b)
if('func' in a)return b.builtin$cls==="fA"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cO(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.cO(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.eq(H.cP(v,z),x)},
ep:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.X(z,v)||H.X(v,z)))return!1}return!0},
jG:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.X(v,u)||H.X(u,v)))return!1}return!0},
ev:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.X(z,y)||H.X(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.ep(x,w,!1))return!1
if(!H.ep(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.X(o,n)||H.X(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.X(o,n)||H.X(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.X(o,n)||H.X(n,o)))return!1}}return H.jG(a.named,b.named)},
cJ:function(a,b,c){return a.apply(b,c)},
lT:function(a){var z=$.cH
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
lS:function(a){return H.ai(a)},
lR:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
k8:function(a){var z,y,x,w,v,u
z=$.cH.$1(a)
y=$.bG[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bJ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eo.$2(a,z)
if(z!=null){y=$.bG[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bJ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cM(x)
$.bG[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bJ[z]=x
return x}if(v==="-"){u=H.cM(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.ey(a,x)
if(v==="*")throw H.e(new P.cs(z))
if(init.leafTags[z]===true){u=H.cM(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.ey(a,x)},
ey:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bL(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cM:function(a){return J.bL(a,!1,null,!!a.$isbl)},
k9:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bL(z,!1,null,!!z.$isbl)
else return J.bL(z,c,null,null)},
k_:function(){if(!0===$.cI)return
$.cI=!0
H.k0()},
k0:function(){var z,y,x,w,v,u,t,s
$.bG=Object.create(null)
$.bJ=Object.create(null)
H.jW()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.ez.$1(v)
if(u!=null){t=H.k9(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jW:function(){var z,y,x,w,v,u,t
z=C.E()
z=H.aD(C.B,H.aD(C.G,H.aD(C.u,H.aD(C.u,H.aD(C.F,H.aD(C.C,H.aD(C.D(C.t),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cH=new H.jX(v)
$.eo=new H.jY(u)
$.ez=new H.jZ(t)},
aD:function(a,b){return a(b)||b},
kd:function(a,b,c){return a.indexOf(b,c)>=0},
fk:{
"^":"a;",
k:function(a){return P.c3(this)},
m:function(a,b,c){return H.fl()}},
di:{
"^":"fk;a",
bq:function(){var z=this.$map
if(z==null){z=new H.b0(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.et(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.bq().h(0,b)},
M:function(a,b){this.bq().M(0,b)},
gn:function(a){var z=this.bq()
return z.gn(z)}},
hy:{
"^":"a;a,b,c,d,e,f,r,x",
static:{hz:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hy(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
iu:{
"^":"a;a,b,c,d,e,f",
a_:function(a){var z,y,x
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
static:{a9:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iu(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bA:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},e1:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dA:{
"^":"K;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
h2:{
"^":"K;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bZ:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.h2(a,y,z?null:b.receiver)}}},
iv:{
"^":"K;a",
k:function(a){var z=this.a
return C.o.gY(z)?"Error":"Error: "+z}},
kg:{
"^":"d:1;a",
$1:function(a){if(!!J.o(a).$isK)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ee:{
"^":"a;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
k2:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
k3:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
k4:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
k5:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
k6:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"a;",
k:function(a){return"Closure '"+H.cg(this)+"'"},
gdi:function(){return this},
gdi:function(){return this}},
dN:{
"^":"d;"},
hM:{
"^":"dN;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bS:{
"^":"dN;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bS))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gD:function(a){var z,y
z=this.c
if(z==null)y=H.ai(this.a)
else y=typeof z!=="object"?J.G(z):H.ai(z)
z=H.ai(this.b)
if(typeof y!=="number")return y.fO()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.bv(z)},
static:{bT:function(a){return a.a},d5:function(a){return a.c},f9:function(){var z=$.aH
if(z==null){z=H.bf("self")
$.aH=z}return z},bf:function(a){var z,y,x,w,v
z=new H.bS("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fa:{
"^":"K;a",
k:function(a){return this.a},
static:{fb:function(a,b){return new H.fa("CastError: Casting value of type "+H.b(a)+" to incompatible type "+H.b(b))}}},
hB:{
"^":"K;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
dH:{
"^":"a;"},
hC:{
"^":"dH;a,b,c,d",
ai:function(a){var z=this.e7(a)
return z==null?!1:H.ev(z,this.aC())},
e7:function(a){var z=J.o(a)
return"$signature" in z?z.$signature():null},
aC:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.o(y)
if(!!x.$islB)z.void=true
else if(!x.$isde)z.ret=y.aC()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dG(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dG(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.es(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aC()}z.named=w}return z},
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
t=H.es(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].aC())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{dG:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aC())
return z}}},
de:{
"^":"dH;",
k:function(a){return"dynamic"},
aC:function(){return}},
bW:{
"^":"a;a,W:b<"},
jH:{
"^":"d:6;a",
$2:function(a,b){H.en(this.a,1).$1(new H.bW(a,b))}},
jF:{
"^":"d:1;a,b",
$1:function(a){this.b(this.a,a)}},
b0:{
"^":"a;a,b,c,d,e,f,r",
gn:function(a){return this.a},
gY:function(a){return this.a===0},
gcP:function(){return H.f(new H.h4(this),[H.B(this,0)])},
gdh:function(a){return H.bp(this.gcP(),new H.h1(this),H.B(this,0),H.B(this,1))},
a9:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cb(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cb(y,a)}else return this.ff(a)},
ff:function(a){var z=this.d
if(z==null)return!1
return this.aM(this.a8(z,this.aL(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a8(z,b)
return y==null?null:y.gam()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.a8(x,b)
return y==null?null:y.gam()}else return this.fg(b)},
fg:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a8(z,this.aL(a))
x=this.aM(y,a)
if(x<0)return
return y[x].gam()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bt()
this.b=z}this.c4(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bt()
this.c=y}this.c4(y,b,c)}else this.fi(b,c)},
fi:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bt()
this.d=z}y=this.aL(a)
x=this.a8(z,y)
if(x==null)this.bv(z,y,[this.bu(a,b)])
else{w=this.aM(x,a)
if(w>=0)x[w].sam(b)
else x.push(this.bu(a,b))}},
a3:function(a,b){if(typeof b==="string")return this.cq(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cq(this.c,b)
else return this.fh(b)},
fh:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a8(z,this.aL(a))
x=this.aM(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cz(w)
return w.gam()},
P:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
M:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.Q(this))
z=z.c}},
c4:function(a,b,c){var z=this.a8(a,b)
if(z==null)this.bv(a,b,this.bu(b,c))
else z.sam(c)},
cq:function(a,b){var z
if(a==null)return
z=this.a8(a,b)
if(z==null)return
this.cz(z)
this.cc(a,b)
return z.gam()},
bu:function(a,b){var z,y
z=new H.h3(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cz:function(a){var z,y
z=a.gel()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aL:function(a){return J.G(a)&0x3ffffff},
aM:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.C(a[y].gcN(),b))return y
return-1},
k:function(a){return P.c3(this)},
a8:function(a,b){return a[b]},
bv:function(a,b,c){a[b]=c},
cc:function(a,b){delete a[b]},
cb:function(a,b){return this.a8(a,b)!=null},
bt:function(){var z=Object.create(null)
this.bv(z,"<non-identifier-key>",z)
this.cc(z,"<non-identifier-key>")
return z},
$isfN:1},
h1:{
"^":"d:1;a",
$1:function(a){return this.a.h(0,a)}},
h3:{
"^":"a;cN:a<,am:b@,c,el:d<"},
h4:{
"^":"Z;a",
gn:function(a){return this.a.a},
gN:function(a){var z,y
z=this.a
y=new H.h5(z,z.r,null,null)
y.c=z.e
return y},
M:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.Q(z))
y=y.c}},
$isx:1},
h5:{
"^":"a;a,b,c,d",
gI:function(){return this.d},
E:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.Q(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
jX:{
"^":"d:1;a",
$1:function(a){return this.a(a)}},
jY:{
"^":"d:10;a",
$2:function(a,b){return this.a(a,b)}},
jZ:{
"^":"d:3;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bY:function(){return new P.aK("No element")},
fW:function(){return new P.aK("Too few elements")},
b5:function(a,b,c,d){if(c-b<=32)H.hG(a,b,c,d)
else H.hF(a,b,c,d)},
hG:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.E(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.T(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.m(a,w,y.h(a,v))
w=v}y.m(a,w,x)}},
hF:function(a,b,c,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=C.c.aj(c-b+1,6)
y=b+z
x=c-z
w=C.c.aj(b+c,2)
v=w-z
u=w+z
t=J.E(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.T(a0.$2(s,r),0)){n=r
r=s
s=n}if(J.T(a0.$2(p,o),0)){n=o
o=p
p=n}if(J.T(a0.$2(s,q),0)){n=q
q=s
s=n}if(J.T(a0.$2(r,q),0)){n=q
q=r
r=n}if(J.T(a0.$2(s,p),0)){n=p
p=s
s=n}if(J.T(a0.$2(q,p),0)){n=p
p=q
q=n}if(J.T(a0.$2(r,o),0)){n=o
o=r
r=n}if(J.T(a0.$2(r,q),0)){n=q
q=r
r=n}if(J.T(a0.$2(p,o),0)){n=o
o=p
p=n}t.m(a,y,s)
t.m(a,w,q)
t.m(a,x,o)
if(b<0||b>=a.length)return H.c(a,b)
t.m(a,v,a[b])
if(c<0||c>=a.length)return H.c(a,c)
t.m(a,u,a[c])
m=b+1
l=c-1
if(J.C(a0.$2(r,p),0)){for(k=m;k<=l;++k){if(k>=a.length)return H.c(a,k)
j=a[k]
i=a0.$2(j,r)
h=J.o(i)
if(h.u(i,0))continue
if(h.ag(i,0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.m(a,k,a[m])
t.m(a,m,j)}++m}else for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
i=a0.$2(a[l],r)
h=J.aF(i)
if(h.aq(i,0)){--l
continue}else{h=h.ag(i,0)
g=a.length
f=l-1
if(h){if(m>=g)return H.c(a,m)
t.m(a,k,a[m])
e=m+1
if(l>=a.length)return H.c(a,l)
t.m(a,m,a[l])
t.m(a,l,j)
l=f
m=e
break}else{if(l>=g)return H.c(a,l)
t.m(a,k,a[l])
t.m(a,l,j)
l=f
break}}}}d=!0}else{for(k=m;k<=l;++k){if(k>=a.length)return H.c(a,k)
j=a[k]
if(J.bb(a0.$2(j,r),0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.m(a,k,a[m])
t.m(a,m,j)}++m}else if(J.T(a0.$2(j,p),0))for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
if(J.T(a0.$2(a[l],p),0)){--l
if(l<k)break
continue}else{if(l>=a.length)return H.c(a,l)
h=J.bb(a0.$2(a[l],r),0)
f=l-1
g=a.length
if(h){if(m>=g)return H.c(a,m)
t.m(a,k,a[m])
e=m+1
if(l>=a.length)return H.c(a,l)
t.m(a,m,a[l])
t.m(a,l,j)
m=e}else{if(l>=g)return H.c(a,l)
t.m(a,k,a[l])
t.m(a,l,j)}l=f
break}}}d=!1}h=m-1
if(h>=a.length)return H.c(a,h)
t.m(a,b,a[h])
t.m(a,h,r)
h=l+1
if(h<0||h>=a.length)return H.c(a,h)
t.m(a,c,a[h])
t.m(a,h,p)
H.b5(a,b,m-2,a0)
H.b5(a,l+2,c,a0)
if(d)return
if(m<y&&l>x){while(!0){if(m>=a.length)return H.c(a,m)
if(!J.C(a0.$2(a[m],r),0))break;++m}while(!0){if(l<0||l>=a.length)return H.c(a,l)
if(!J.C(a0.$2(a[l],p),0))break;--l}for(k=m;k<=l;++k){if(k>=a.length)return H.c(a,k)
j=a[k]
if(J.C(a0.$2(j,r),0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.m(a,k,a[m])
t.m(a,m,j)}++m}else if(J.C(a0.$2(j,p),0))for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
if(J.C(a0.$2(a[l],p),0)){--l
if(l<k)break
continue}else{if(l>=a.length)return H.c(a,l)
h=J.bb(a0.$2(a[l],r),0)
f=l-1
g=a.length
if(h){if(m>=g)return H.c(a,m)
t.m(a,k,a[m])
e=m+1
if(l>=a.length)return H.c(a,l)
t.m(a,m,a[l])
t.m(a,l,j)
m=e}else{if(l>=g)return H.c(a,l)
t.m(a,k,a[l])
t.m(a,l,j)}l=f
break}}}H.b5(a,m,l,a0)}else H.b5(a,m,l,a0)},
hX:function(a){return a.gfT()},
bo:{
"^":"Z;",
gN:function(a){return new H.dq(this,this.gn(this),0,null)},
M:function(a,b){var z,y
z=this.gn(this)
for(y=0;y<z;++y){b.$1(this.ae(0,y))
if(z!==this.gn(this))throw H.e(new P.Q(this))}},
az:function(a,b){return H.f(new H.c2(this,b),[null,null])},
bW:function(a,b){var z,y,x
if(b){z=H.f([],[H.W(this,"bo",0)])
C.a.sn(z,this.gn(this))}else z=H.f(Array(this.gn(this)),[H.W(this,"bo",0)])
for(y=0;y<this.gn(this);++y){x=this.ae(0,y)
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
bV:function(a){return this.bW(a,!0)},
$isx:1},
dq:{
"^":"a;a,b,c,d",
gI:function(){return this.d},
E:function(){var z,y,x,w
z=this.a
y=J.E(z)
x=y.gn(z)
if(this.b!==x)throw H.e(new P.Q(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.ae(z,w);++this.c
return!0}},
dr:{
"^":"Z;a,b",
gN:function(a){var z=new H.h9(null,J.be(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gn:function(a){return J.aS(this.a)},
$asZ:function(a,b){return[b]},
static:{bp:function(a,b,c,d){if(!!J.o(a).$isx)return H.f(new H.df(a,b),[c,d])
return H.f(new H.dr(a,b),[c,d])}}},
df:{
"^":"dr;a,b",
$isx:1},
h9:{
"^":"fX;a,b,c",
E:function(){var z=this.b
if(z.E()){this.a=this.bp(z.gI())
return!0}this.a=null
return!1},
gI:function(){return this.a},
bp:function(a){return this.c.$1(a)}},
c2:{
"^":"bo;a,b",
gn:function(a){return J.aS(this.a)},
ae:function(a,b){return this.bp(J.eM(this.a,b))},
bp:function(a){return this.b.$1(a)},
$asbo:function(a,b){return[b]},
$asZ:function(a,b){return[b]},
$isx:1},
dh:{
"^":"a;"}}],["","",,H,{
"^":"",
es:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
ix:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jI()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aQ(new P.iz(z),1)).observe(y,{childList:true})
return new P.iy(z,y,x)}else if(self.setImmediate!=null)return P.jJ()
return P.jK()},
lD:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aQ(new P.iA(a),0))},"$1","jI",2,0,5],
lE:[function(a){++init.globalState.f.b
self.setImmediate(H.aQ(new P.iB(a),0))},"$1","jJ",2,0,5],
lF:[function(a){P.ck(C.r,a)},"$1","jK",2,0,5],
ei:function(a,b){var z=H.ba()
z=H.aE(z,[z,z]).ai(a)
if(z){b.toString
return a}else{b.toString
return a}},
fB:function(a,b){var z=H.f(new P.D(0,$.n,null),[b])
P.cj(C.r,new P.fE(a,z))
return z},
fC:function(a,b,c){var z=new P.D(0,$.n,null)
z.$builtinTypeInfo=[c]
P.cj(a,new P.fD(b,z))
return z},
a5:function(a){return H.f(new P.cv(H.f(new P.D(0,$.n,null),[a])),[a])},
eg:function(a,b,c){$.n.toString
a.X(b,c)},
jA:function(){var z,y
for(;z=$.aB,z!=null;){$.aO=null
y=z.c
$.aB=y
if(y==null)$.aN=null
$.n=z.b
z.eD()}},
lQ:[function(){$.cC=!0
try{P.jA()}finally{$.n=C.d
$.aO=null
$.cC=!1
if($.aB!=null)$.$get$cw().$1(P.er())}},"$0","er",0,0,2],
em:function(a){if($.aB==null){$.aN=a
$.aB=a
if(!$.cC)$.$get$cw().$1(P.er())}else{$.aN.c=a
$.aN=a}},
eA:function(a){var z,y
z=$.n
if(C.d===z){P.aC(null,null,C.d,a)
return}z.toString
if(C.d.gbF()===z){P.aC(null,null,z,a)
return}y=$.n
P.aC(null,null,y,y.bx(a,!0))},
lq:function(a,b){var z,y,x
z=H.f(new P.ef(null,null,null,0),[b])
y=z.geg()
x=z.gei()
z.a=a.ao(y,!0,z.geh(),x)
return z},
jD:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.N(u)
z=t
y=H.L(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aa(x)
w=t
v=x.gW()
c.$2(w,v)}}},
jt:function(a,b,c,d){var z=a.bz()
if(!!J.o(z).$isa_)z.bY(new P.jw(b,c,d))
else b.X(c,d)},
ju:function(a,b){return new P.jv(a,b)},
cj:function(a,b){var z=$.n
if(z===C.d){z.toString
return P.ck(a,b)}return P.ck(a,z.bx(b,!0))},
ck:function(a,b){var z=C.c.aj(a.a,1000)
return H.i_(z<0?0:z,b)},
cu:function(a){var z=$.n
$.n=a
return z},
b8:function(a,b,c,d,e){var z,y,x
z=new P.e8(new P.jC(d,e),C.d,null)
y=$.aB
if(y==null){P.em(z)
$.aO=$.aN}else{x=$.aO
if(x==null){z.c=y
$.aO=z
$.aB=z}else{z.c=x.c
x.c=z
$.aO=z
if(z.c==null)$.aN=z}}},
ej:function(a,b,c,d){var z,y
if($.n===c)return d.$0()
z=P.cu(c)
try{y=d.$0()
return y}finally{$.n=z}},
el:function(a,b,c,d,e){var z,y
if($.n===c)return d.$1(e)
z=P.cu(c)
try{y=d.$1(e)
return y}finally{$.n=z}},
ek:function(a,b,c,d,e,f){var z,y
if($.n===c)return d.$2(e,f)
z=P.cu(c)
try{y=d.$2(e,f)
return y}finally{$.n=z}},
aC:function(a,b,c,d){var z=C.d!==c
if(z){d=c.bx(d,!(!z||C.d.gbF()===c))
c=C.d}P.em(new P.e8(d,c,null))},
iz:{
"^":"d:1;a",
$1:function(a){var z,y
H.bK()
z=this.a
y=z.a
z.a=null
y.$0()}},
iy:{
"^":"d:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iA:{
"^":"d:0;a",
$0:function(){H.bK()
this.a.$0()}},
iB:{
"^":"d:0;a",
$0:function(){H.bK()
this.a.$0()}},
jn:{
"^":"af;a,b",
k:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{jo:function(a,b){if(b!=null)return b
if(!!J.o(a).$isK)return a.gW()
return}}},
a_:{
"^":"a;"},
fE:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.ah(this.a.$0())}catch(x){w=H.N(x)
z=w
y=H.L(x)
P.eg(this.b,z,y)}}},
fD:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.ah(null)}catch(x){w=H.N(x)
z=w
y=H.L(x)
P.eg(this.b,z,y)}}},
iF:{
"^":"a;f8:a<",
cH:function(a,b){a=a!=null?a:new P.dB()
if(this.a.a!==0)throw H.e(new P.aK("Future already completed"))
$.n.toString
this.X(a,b)},
cG:function(a){return this.cH(a,null)}},
cv:{
"^":"iF;a",
b1:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.aK("Future already completed"))
z.aF(b)},
X:function(a,b){this.a.e2(a,b)}},
aL:{
"^":"a;ck:a<,fB:b>,c,d,e",
gau:function(){return this.b.b},
gcM:function(){return(this.c&1)!==0},
gfe:function(){return this.c===6},
gfd:function(){return this.c===8},
gek:function(){return this.d},
ges:function(){return this.d}},
D:{
"^":"a;aZ:a?,au:b<,c",
ged:function(){return this.a===8},
see:function(a){if(a)this.a=2
else this.a=0},
b7:function(a,b){var z,y
z=H.f(new P.D(0,$.n,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.ei(b,y)}this.bf(new P.aL(null,z,b==null?1:3,a,b))
return z},
a4:function(a){return this.b7(a,null)},
bY:function(a){var z,y
z=$.n
y=new P.D(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.bf(new P.aL(null,y,8,a,null))
return y},
bs:function(){if(this.a!==0)throw H.e(new P.aK("Future already completed"))
this.a=1},
ger:function(){return this.c},
gaG:function(){return this.c},
cw:function(a){this.a=4
this.c=a},
cv:function(a){this.a=8
this.c=a},
ep:function(a,b){this.cv(new P.af(a,b))},
bf:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aC(null,null,z,new P.iP(this,a))}else{a.a=this.c
this.c=a}},
aX:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gck()
z.a=y}return y},
ah:function(a){var z,y
z=J.o(a)
if(!!z.$isa_)if(!!z.$isD)P.bC(a,this)
else P.cz(a,this)
else{y=this.aX()
this.cw(a)
P.an(this,y)}},
ca:function(a){var z=this.aX()
this.cw(a)
P.an(this,z)},
X:[function(a,b){var z=this.aX()
this.cv(new P.af(a,b))
P.an(this,z)},function(a){return this.X(a,null)},"fP","$2","$1","gbl",2,2,12,0],
aF:function(a){var z
if(a==null);else{z=J.o(a)
if(!!z.$isa_){if(!!z.$isD){z=a.a
if(z>=4&&z===8){this.bs()
z=this.b
z.toString
P.aC(null,null,z,new P.iR(this,a))}else P.bC(a,this)}else P.cz(a,this)
return}}this.bs()
z=this.b
z.toString
P.aC(null,null,z,new P.iS(this,a))},
e2:function(a,b){var z
this.bs()
z=this.b
z.toString
P.aC(null,null,z,new P.iQ(this,a,b))},
$isa_:1,
static:{cz:function(a,b){var z,y,x,w
b.saZ(2)
try{a.b7(new P.iT(b),new P.iU(b))}catch(x){w=H.N(x)
z=w
y=H.L(x)
P.eA(new P.iV(b,z,y))}},bC:function(a,b){var z
b.a=2
z=new P.aL(null,b,0,null,null)
if(a.a>=4)P.an(a,z)
else a.bf(z)},an:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.ged()
if(b==null){if(w){v=z.a.gaG()
y=z.a.gau()
x=J.aa(v)
u=v.gW()
y.toString
P.b8(null,null,y,x,u)}return}for(;b.gck()!=null;b=t){t=b.a
b.a=null
P.an(z.a,b)}x.a=!0
s=w?null:z.a.ger()
x.b=s
x.c=!1
y=!w
if(!y||b.gcM()||b.c===8){r=b.gau()
if(w){u=z.a.gau()
u.toString
if(u==null?r!=null:u!==r){u=u.gbF()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaG()
y=z.a.gau()
x=J.aa(v)
u=v.gW()
y.toString
P.b8(null,null,y,x,u)
return}q=$.n
if(q==null?r!=null:q!==r)$.n=r
else q=null
if(y){if(b.gcM())x.a=new P.iX(x,b,s,r).$0()}else new P.iW(z,x,b,r).$0()
if(b.gfd())new P.iY(z,x,w,b,r).$0()
if(q!=null)$.n=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.o(y).$isa_}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.D)if(p.a>=4){o.a=2
z.a=p
b=new P.aL(null,o,0,null,null)
y=p
continue}else P.bC(p,o)
else P.cz(p,o)
return}}o=b.b
b=o.aX()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
iP:{
"^":"d:0;a,b",
$0:function(){P.an(this.a,this.b)}},
iT:{
"^":"d:1;a",
$1:function(a){this.a.ca(a)}},
iU:{
"^":"d:7;a",
$2:function(a,b){this.a.X(a,b)},
$1:function(a){return this.$2(a,null)}},
iV:{
"^":"d:0;a,b,c",
$0:function(){this.a.X(this.b,this.c)}},
iR:{
"^":"d:0;a,b",
$0:function(){P.bC(this.b,this.a)}},
iS:{
"^":"d:0;a,b",
$0:function(){this.a.ca(this.b)}},
iQ:{
"^":"d:0;a,b,c",
$0:function(){this.a.X(this.b,this.c)}},
iX:{
"^":"d:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.b6(this.b.gek(),this.c)
return!0}catch(x){w=H.N(x)
z=w
y=H.L(x)
this.a.b=new P.af(z,y)
return!1}}},
iW:{
"^":"d:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaG()
y=!0
r=this.c
if(r.gfe()){x=r.d
try{y=this.d.b6(x,J.aa(z))}catch(q){r=H.N(q)
w=r
v=H.L(q)
r=J.aa(z)
p=w
o=(r==null?p==null:r===p)?z:new P.af(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.ba()
p=H.aE(p,[p,p]).ai(r)
n=this.d
m=this.b
if(p)m.b=n.fC(u,J.aa(z),z.gW())
else m.b=n.b6(u,J.aa(z))}catch(q){r=H.N(q)
t=r
s=H.L(q)
r=J.aa(z)
p=t
o=(r==null?p==null:r===p)?z:new P.af(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
iY:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.d9(this.d.ges())
z.a=w
v=w}catch(u){z=H.N(u)
y=z
x=H.L(u)
if(this.c){z=J.aa(this.a.a.gaG())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaG()
else v.b=new P.af(y,x)
v.a=!1
return}if(!!J.o(v).$isa_){t=this.d
s=t.gfB(t)
s.see(!0)
this.b.c=!0
v.b7(new P.iZ(this.a,s),new P.j_(z,s))}}},
iZ:{
"^":"d:1;a,b",
$1:function(a){P.an(this.a.a,new P.aL(null,this.b,0,null,null))}},
j_:{
"^":"d:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.D)){y=H.f(new P.D(0,$.n,null),[null])
z.a=y
y.ep(a,b)}P.an(z.a,new P.aL(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
e8:{
"^":"a;a,b,c",
eD:function(){return this.a.$0()}},
al:{
"^":"a;",
az:function(a,b){return H.f(new P.jc(b,this),[H.W(this,"al",0),null])},
M:function(a,b){var z,y
z={}
y=H.f(new P.D(0,$.n,null),[null])
z.a=null
z.a=this.ao(new P.hQ(z,this,b,y),!0,new P.hR(y),y.gbl())
return y},
gn:function(a){var z,y
z={}
y=H.f(new P.D(0,$.n,null),[P.l])
z.a=0
this.ao(new P.hS(z),!0,new P.hT(z,y),y.gbl())
return y},
bV:function(a){var z,y
z=H.f([],[H.W(this,"al",0)])
y=H.f(new P.D(0,$.n,null),[[P.m,H.W(this,"al",0)]])
this.ao(new P.hU(this,z),!0,new P.hV(z,y),y.gbl())
return y}},
hQ:{
"^":"d;a,b,c,d",
$1:function(a){P.jD(new P.hO(this.c,a),new P.hP(),P.ju(this.a.a,this.d))},
$signature:function(){return H.bF(function(a){return{func:1,args:[a]}},this.b,"al")}},
hO:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
hP:{
"^":"d:1;",
$1:function(a){}},
hR:{
"^":"d:0;a",
$0:function(){this.a.ah(null)}},
hS:{
"^":"d:1;a",
$1:function(a){++this.a.a}},
hT:{
"^":"d:0;a,b",
$0:function(){this.b.ah(this.a.a)}},
hU:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bF(function(a){return{func:1,args:[a]}},this.a,"al")}},
hV:{
"^":"d:0;a,b",
$0:function(){this.b.ah(this.a)}},
hN:{
"^":"a;"},
lJ:{
"^":"a;"},
iC:{
"^":"a;au:d<,aZ:e?",
bQ:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cD()
if((z&4)===0&&(this.e&32)===0)this.cg(this.gcm())},
aP:function(a){return this.bQ(a,null)},
d6:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gY(z)}else z=!1
if(z)this.r.bb(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cg(this.gco())}}}},
bz:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bi()
return this.f},
bi:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cD()
if((this.e&32)===0)this.r=null
this.f=this.cl()},
bh:["dL",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cs(a)
else this.bg(new P.iI(a,null))}],
be:["dM",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cu(a,b)
else this.bg(new P.iK(a,b,null))}],
e1:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.ct()
else this.bg(C.y)},
cn:[function(){},"$0","gcm",0,0,2],
cp:[function(){},"$0","gco",0,0,2],
cl:function(){return},
bg:function(a){var z,y
z=this.r
if(z==null){z=new P.jm(null,null,0)
this.r=z}z.av(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bb(this)}},
cs:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bU(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bj((z&4)!==0)},
cu:function(a,b){var z,y
z=this.e
y=new P.iE(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bi()
z=this.f
if(!!J.o(z).$isa_)z.bY(y)
else y.$0()}else{y.$0()
this.bj((z&4)!==0)}},
ct:function(){var z,y
z=new P.iD(this)
this.bi()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isa_)y.bY(z)
else z.$0()},
cg:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bj((z&4)!==0)},
bj:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gY(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gY(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cn()
else this.cp()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bb(this)},
dY:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.ei(b,z)
this.c=c}},
iE:{
"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ba()
x=H.aE(x,[x,x]).ai(y)
w=z.d
v=this.b
u=z.b
if(x)w.fD(u,v,this.c)
else w.bU(u,v)
z.e=(z.e&4294967263)>>>0}},
iD:{
"^":"d:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.da(z.c)
z.e=(z.e&4294967263)>>>0}},
ea:{
"^":"a;b4:a@"},
iI:{
"^":"ea;b,a",
bR:function(a){a.cs(this.b)}},
iK:{
"^":"ea;aJ:b>,W:c<,a",
bR:function(a){a.cu(this.b,this.c)}},
iJ:{
"^":"a;",
bR:function(a){a.ct()},
gb4:function(){return},
sb4:function(a){throw H.e(new P.aK("No events after a done."))}},
je:{
"^":"a;aZ:a?",
bb:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eA(new P.jf(this,a))
this.a=1},
cD:function(){if(this.a===1)this.a=3}},
jf:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.fa(this.b)}},
jm:{
"^":"je;b,c,a",
gY:function(a){return this.c==null},
av:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sb4(b)
this.c=b}},
fa:function(a){var z,y
z=this.b
y=z.gb4()
this.b=y
if(y==null)this.c=null
z.bR(a)}},
ef:{
"^":"a;a,b,c,aZ:d?",
c6:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
fU:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.ah(!0)
return}this.a.aP(0)
this.c=a
this.d=3},"$1","geg",2,0,function(){return H.bF(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"ef")}],
ej:[function(a,b){var z
if(this.d===2){z=this.c
this.c6(0)
z.X(a,b)
return}this.a.aP(0)
this.c=new P.af(a,b)
this.d=4},function(a){return this.ej(a,null)},"fW","$2","$1","gei",2,2,14,0],
fV:[function(){if(this.d===2){var z=this.c
this.c6(0)
z.ah(!1)
return}this.a.aP(0)
this.c=null
this.d=5},"$0","geh",0,0,2]},
jw:{
"^":"d:0;a,b,c",
$0:function(){return this.a.X(this.b,this.c)}},
jv:{
"^":"d:6;a,b",
$2:function(a,b){return P.jt(this.a,this.b,a,b)}},
cy:{
"^":"al;",
ao:function(a,b,c,d){return this.e6(a,d,c,!0===b)},
cR:function(a,b,c){return this.ao(a,null,b,c)},
e6:function(a,b,c,d){return P.iO(this,a,b,c,d,H.W(this,"cy",0),H.W(this,"cy",1))},
ci:function(a,b){b.bh(a)},
$asal:function(a,b){return[b]}},
eb:{
"^":"iC;x,y,a,b,c,d,e,f,r",
bh:function(a){if((this.e&2)!==0)return
this.dL(a)},
be:function(a,b){if((this.e&2)!==0)return
this.dM(a,b)},
cn:[function(){var z=this.y
if(z==null)return
z.aP(0)},"$0","gcm",0,0,2],
cp:[function(){var z=this.y
if(z==null)return
z.d6()},"$0","gco",0,0,2],
cl:function(){var z=this.y
if(z!=null){this.y=null
z.bz()}return},
fQ:[function(a){this.x.ci(a,this)},"$1","ge9",2,0,function(){return H.bF(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"eb")}],
fS:[function(a,b){this.be(a,b)},"$2","geb",4,0,15],
fR:[function(){this.e1()},"$0","gea",0,0,2],
dZ:function(a,b,c,d,e,f,g){var z,y
z=this.ge9()
y=this.geb()
this.y=this.x.a.cR(z,this.gea(),y)},
static:{iO:function(a,b,c,d,e,f,g){var z=$.n
z=H.f(new P.eb(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.dY(b,c,d,e)
z.dZ(a,b,c,d,e,f,g)
return z}}},
jc:{
"^":"cy;b,a",
ci:function(a,b){var z,y,x,w,v
z=null
try{z=this.eq(a)}catch(w){v=H.N(w)
y=v
x=H.L(w)
$.n.toString
b.be(y,x)
return}b.bh(z)},
eq:function(a){return this.b.$1(a)}},
af:{
"^":"a;aJ:a>,W:b<",
k:function(a){return H.b(this.a)},
$isK:1},
js:{
"^":"a;"},
jC:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.jn(z,P.jo(z,this.b)))}},
jh:{
"^":"js;",
gbF:function(){return this},
da:function(a){var z,y,x,w
try{if(C.d===$.n){x=a.$0()
return x}x=P.ej(null,null,this,a)
return x}catch(w){x=H.N(w)
z=x
y=H.L(w)
return P.b8(null,null,this,z,y)}},
bU:function(a,b){var z,y,x,w
try{if(C.d===$.n){x=a.$1(b)
return x}x=P.el(null,null,this,a,b)
return x}catch(w){x=H.N(w)
z=x
y=H.L(w)
return P.b8(null,null,this,z,y)}},
fD:function(a,b,c){var z,y,x,w
try{if(C.d===$.n){x=a.$2(b,c)
return x}x=P.ek(null,null,this,a,b,c)
return x}catch(w){x=H.N(w)
z=x
y=H.L(w)
return P.b8(null,null,this,z,y)}},
bx:function(a,b){if(b)return new P.ji(this,a)
else return new P.jj(this,a)},
ez:function(a,b){if(b)return new P.jk(this,a)
else return new P.jl(this,a)},
h:function(a,b){return},
d9:function(a){if($.n===C.d)return a.$0()
return P.ej(null,null,this,a)},
b6:function(a,b){if($.n===C.d)return a.$1(b)
return P.el(null,null,this,a,b)},
fC:function(a,b,c){if($.n===C.d)return a.$2(b,c)
return P.ek(null,null,this,a,b,c)}},
ji:{
"^":"d:0;a,b",
$0:function(){return this.a.da(this.b)}},
jj:{
"^":"d:0;a,b",
$0:function(){return this.a.d9(this.b)}},
jk:{
"^":"d:1;a,b",
$1:function(a){return this.a.bU(this.b,a)}},
jl:{
"^":"d:1;a,b",
$1:function(a){return this.a.b6(this.b,a)}}}],["","",,P,{
"^":"",
b1:function(){return H.f(new H.b0(0,null,null,null,null,null,0),[null,null])},
ax:function(a){return H.et(a,H.f(new H.b0(0,null,null,null,null,null,0),[null,null]))},
fV:function(a,b,c){var z,y
if(P.cD(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aP()
y.push(a)
try{P.jz(a,z)}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=P.dL(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bi:function(a,b,c){var z,y,x
if(P.cD(a))return b+"..."+c
z=new P.bz(b)
y=$.$get$aP()
y.push(a)
try{x=z
x.a=P.dL(x.gar(),a,", ")}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=z
y.a=y.gar()+c
y=z.gar()
return y.charCodeAt(0)==0?y:y},
cD:function(a){var z,y
for(z=0;y=$.$get$aP(),z<y.length;++z)if(a===y[z])return!0
return!1},
jz:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gN(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.E())return
w=H.b(z.gI())
b.push(w)
y+=w.length+2;++x}if(!z.E()){if(x<=5)return
if(0>=b.length)return H.c(b,0)
v=b.pop()
if(0>=b.length)return H.c(b,0)
u=b.pop()}else{t=z.gI();++x
if(!z.E()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.c(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gI();++x
for(;z.E();t=s,s=r){r=z.gI();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.c(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.c(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
bn:function(a,b,c,d,e){return H.f(new H.b0(0,null,null,null,null,null,0),[d,e])},
aw:function(a,b){return P.j7(a,b)},
aJ:function(a,b,c,d){return H.f(new P.j4(0,null,null,null,null,null,0),[d])},
c3:function(a){var z,y,x
z={}
if(P.cD(a))return"{...}"
y=new P.bz("")
try{$.$get$aP().push(a)
x=y
x.a=x.gar()+"{"
z.a=!0
J.eN(a,new P.ha(z,y))
z=y
z.a=z.gar()+"}"}finally{z=$.$get$aP()
if(0>=z.length)return H.c(z,0)
z.pop()}z=y.gar()
return z.charCodeAt(0)==0?z:z},
j6:{
"^":"b0;a,b,c,d,e,f,r",
aL:function(a){return H.ka(a)&0x3ffffff},
aM:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcN()
if(x==null?b==null:x===b)return y}return-1},
static:{j7:function(a,b){return H.f(new P.j6(0,null,null,null,null,null,0),[a,b])}}},
j4:{
"^":"j0;a,b,c,d,e,f,r",
gN:function(a){var z=new P.dp(this,this.r,null,null)
z.c=this.e
return z},
gn:function(a){return this.a},
eN:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.e5(b)},
e5:function(a){var z=this.d
if(z==null)return!1
return this.aW(z[this.aV(a)],a)>=0},
cS:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.eN(0,a)?a:null
else return this.ef(a)},
ef:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aV(a)]
x=this.aW(y,a)
if(x<0)return
return J.bO(y,x).gcd()},
M:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.Q(this))
z=z.b}},
av:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.c7(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.c7(x,b)}else return this.ab(b)},
ab:function(a){var z,y,x
z=this.d
if(z==null){z=P.j5()
this.d=z}y=this.aV(a)
x=z[y]
if(x==null)z[y]=[this.bk(a)]
else{if(this.aW(x,a)>=0)return!1
x.push(this.bk(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.c8(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.c8(this.c,b)
else return this.en(b)},
en:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aV(a)]
x=this.aW(y,a)
if(x<0)return!1
this.c9(y.splice(x,1)[0])
return!0},
P:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
c7:function(a,b){if(a[b]!=null)return!1
a[b]=this.bk(b)
return!0},
c8:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.c9(z)
delete a[b]
return!0},
bk:function(a){var z,y
z=new P.h6(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c9:function(a){var z,y
z=a.ge4()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aV:function(a){return J.G(a)&0x3ffffff},
aW:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.C(a[y].gcd(),b))return y
return-1},
$isx:1,
static:{j5:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
h6:{
"^":"a;cd:a<,b,e4:c<"},
dp:{
"^":"a;a,b,c,d",
gI:function(){return this.d},
E:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.Q(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
j0:{
"^":"hD;"},
c_:{
"^":"a;",
gN:function(a){return new H.dq(a,this.gn(a),0,null)},
ae:function(a,b){return this.h(a,b)},
M:function(a,b){var z,y
z=this.gn(a)
for(y=0;y<z;++y){if(y>=a.length)return H.c(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.Q(a))}},
az:function(a,b){return H.f(new H.c2(a,b),[null,null])},
k:function(a){return P.bi(a,"[","]")},
$ism:1,
$asm:null,
$isx:1},
ha:{
"^":"d:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
h7:{
"^":"Z;a,b,c,d",
gN:function(a){return new P.j8(this,this.c,this.d,this.b,null)},
M:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.c(x,y)
b.$1(x[y])
if(z!==this.d)H.F(new P.Q(this))}},
gY:function(a){return this.b===this.c},
gn:function(a){return(this.c-this.b&this.a.length-1)>>>0},
P:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.c(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bi(this,"{","}")},
d5:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bY());++this.d
y=this.a
x=y.length
if(z>=x)return H.c(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ab:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.c(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cf();++this.d},
cf:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,[H.B(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.c1(y,0,w,z,x)
C.a.c1(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dP:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$isx:1,
static:{c0:function(a,b){var z=H.f(new P.h7(null,0,0,0),[b])
z.dP(a,b)
return z}}},
j8:{
"^":"a;a,b,c,d,e",
gI:function(){return this.e},
E:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.F(new P.Q(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.c(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
hE:{
"^":"a;",
az:function(a,b){return H.f(new H.df(this,b),[H.B(this,0),null])},
k:function(a){return P.bi(this,"{","}")},
M:function(a,b){var z
for(z=this.gN(this);z.E();)b.$1(z.d)},
$isx:1},
hD:{
"^":"hE;"}}],["","",,P,{
"^":"",
bE:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.j3(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bE(a[z])
return a},
jB:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.e(H.S(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.N(w)
y=x
throw H.e(new P.aI(String(y),null,null))}return P.bE(z)},
j3:{
"^":"a;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.em(b):y}},
gn:function(a){var z
if(this.b==null){z=this.c
z=z.gn(z)}else z=this.bm().length
return z},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.a9(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.cB().m(0,b,c)},
a9:function(a){if(this.b==null)return this.c.a9(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
a3:function(a,b){if(this.b!=null&&!this.a9(b))return
return this.cB().a3(0,b)},
M:function(a,b){var z,y,x,w
if(this.b==null)return this.c.M(0,b)
z=this.bm()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bE(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.e(new P.Q(this))}},
k:function(a){return P.c3(this)},
bm:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
cB:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.b1()
y=this.bm()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sn(y,0)
this.b=null
this.a=null
this.c=z
return z},
em:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bE(this.a[a])
return this.b[a]=z}},
fm:{
"^":"a;"},
iw:{
"^":"fm;a",
bD:function(a,b,c){var z,y,x,w
z=a.length
P.bx(b,c,z,null,null,null)
y=new P.bz("")
x=this.a
w=new P.jp(x,y,!0,0,0,0)
w.bD(a,b,z)
if(w.e>0){if(!x)H.F(new P.aI("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.bw(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
eQ:function(a){return this.bD(a,0,null)}},
jp:{
"^":"a;a,b,c,d,e,f",
bD:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.jr(c)
v=new P.jq(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=a.length,r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
if(r>>>0!==r||r>=s)return H.c(a,r)
q=a[r]
if((q&192)!==128){if(t)throw H.e(new P.aI("Bad UTF-8 encoding 0x"+C.c.b8(q,16),null,null))
this.c=!1
u.a+=H.bw(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.c(C.v,p)
if(z<=C.v[p]){if(t)throw H.e(new P.aI("Overlong encoding of 0x"+C.c.b8(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.e(new P.aI("Character outside valid Unicode range: 0x"+C.c.b8(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.bw(z)
this.c=!1}for(;r<c;r=n,z=65533,y=0,x=0){o=w.$2(a,r)
if(J.T(o,0)){this.c=!1
if(typeof o!=="number")return H.z(o)
n=r+o
v.$2(r,n)
if(n===c)break
r=n}n=r+1
if(r>>>0!==r||r>=s)return H.c(a,r)
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
continue $loop$0}if(t)throw H.e(new P.aI("Bad UTF-8 encoding 0x"+C.c.b8(q,16),null,null))
this.c=!1
u.a+=H.bw(65533)}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
jr:{
"^":"d:17;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=a.length,x=b;x<z;++x){if(x<0||x>=y)return H.c(a,x)
w=a[x]
if((w&127)!==w)return x-b}return z-b}},
jq:{
"^":"d:18;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.hW(this.b,a,b)}}}],["","",,P,{
"^":"",
jE:function(a){return H.hX(a)},
ks:[function(a,b){return J.eH(a,b)},"$2","jU",4,0,27],
bV:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aU(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fx(a)},
fx:function(a){var z=J.o(a)
if(!!z.$isd)return z.k(a)
return H.bv(a)},
bh:function(a){return new P.iN(a)},
c1:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.be(a);y.E();)z.push(y.gI())
if(b)return z
z.fixed$length=Array
return z},
a3:function(a){var z=H.b(a)
H.cN(z)},
hW:function(a,b,c){return H.hu(a,b,P.bx(b,c,a.length,null,null,null))},
le:{
"^":"d:19;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.jE(a)}},
cE:{
"^":"a;"},
"+bool":0,
O:{
"^":"a;"},
bU:{
"^":"a;fp:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.bU))return!1
return this.a===b.a&&this.b===b.b},
aw:function(a,b){return C.c.aw(this.a,b.gfp())},
gD:function(a){return this.a},
k:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.fr(z?H.R(this).getUTCFullYear()+0:H.R(this).getFullYear()+0)
x=P.aX(z?H.R(this).getUTCMonth()+1:H.R(this).getMonth()+1)
w=P.aX(z?H.R(this).getUTCDate()+0:H.R(this).getDate()+0)
v=P.aX(z?H.R(this).getUTCHours()+0:H.R(this).getHours()+0)
u=P.aX(z?H.R(this).getUTCMinutes()+0:H.R(this).getMinutes()+0)
t=P.aX(z?H.R(this).getUTCSeconds()+0:H.R(this).getSeconds()+0)
s=P.fs(H.dD(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
dO:function(a,b){if(Math.abs(a)>864e13)throw H.e(P.aW(a))},
$isO:1,
$asO:I.b9,
static:{fq:function(a,b){var z=new P.bU(a,b)
z.dO(a,b)
return z},fr:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},fs:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aX:function(a){if(a>=10)return""+a
return"0"+a}}},
bN:{
"^":"ap;",
$isO:1,
$asO:function(){return[P.ap]}},
"+double":0,
ag:{
"^":"a;as:a<",
l:function(a,b){return new P.ag(C.c.l(this.a,b.gas()))},
O:function(a,b){return new P.ag(C.c.O(this.a,b.gas()))},
t:function(a,b){return new P.ag(C.c.K(this.a*b))},
ag:function(a,b){return C.c.ag(this.a,b.gas())},
aq:function(a,b){return C.c.aq(this.a,b.gas())},
b9:function(a,b){return C.c.b9(this.a,b.gas())},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.ag))return!1
return this.a===b.a},
gD:function(a){return this.a&0x1FFFFFFF},
aw:function(a,b){return C.c.aw(this.a,b.gas())},
k:function(a){var z,y,x,w,v
z=new P.fw()
y=this.a
if(y<0)return"-"+new P.ag(-y).k(0)
x=z.$1(C.c.bS(C.c.aj(y,6e7),60))
w=z.$1(C.c.bS(C.c.aj(y,1e6),60))
v=new P.fv().$1(C.c.bS(y,1e6))
return""+C.c.aj(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isO:1,
$asO:function(){return[P.ag]}},
fv:{
"^":"d:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fw:{
"^":"d:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
K:{
"^":"a;",
gW:function(){return H.L(this.$thrownJsError)}},
dB:{
"^":"K;",
k:function(a){return"Throw of null."}},
at:{
"^":"K;a,b,c,d",
gbo:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbn:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gbo()+y+x
if(!this.a)return w
v=this.gbn()
u=P.bV(this.b)
return w+v+": "+H.b(u)},
static:{aW:function(a){return new P.at(!1,null,null,a)},f7:function(a,b,c){return new P.at(!0,a,b,c)}}},
ci:{
"^":"at;e,f,a,b,c,d",
gbo:function(){return"RangeError"},
gbn:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.aq()
if(typeof z!=="number")return H.z(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{hv:function(a){return new P.ci(null,null,!1,null,null,a)},b4:function(a,b,c){return new P.ci(null,null,!0,a,b,"Value not in range")},aj:function(a,b,c,d,e){return new P.ci(b,c,!0,a,d,"Invalid value")},bx:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.aj(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.e(P.aj(b,a,c,"end",f))
return b}return c}}},
fJ:{
"^":"at;e,n:f>,a,b,c,d",
gbo:function(){return"RangeError"},
gbn:function(){P.bV(this.e)
var z=": index should be less than "+H.b(this.f)
return J.bb(this.b,0)?": index must not be negative":z},
static:{bX:function(a,b,c,d,e){var z=e!=null?e:J.aS(b)
return new P.fJ(b,z,!0,a,c,"Index out of range")}}},
V:{
"^":"K;a",
k:function(a){return"Unsupported operation: "+this.a}},
cs:{
"^":"K;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
aK:{
"^":"K;a",
k:function(a){return"Bad state: "+this.a}},
Q:{
"^":"K;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bV(z))+"."}},
hj:{
"^":"a;",
k:function(a){return"Out of Memory"},
gW:function(){return},
$isK:1},
dK:{
"^":"a;",
k:function(a){return"Stack Overflow"},
gW:function(){return},
$isK:1},
fp:{
"^":"K;a",
k:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
iN:{
"^":"a;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
aI:{
"^":"a;a,b,T:c>",
k:function(a){var z=""!==this.a?"FormatException: "+this.a:"FormatException"
return z}},
fy:{
"^":"a;a",
k:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.bu(b,"expando$values")
return z==null?null:H.bu(z,this.ce())},
m:function(a,b,c){var z=H.bu(b,"expando$values")
if(z==null){z=new P.a()
H.ch(b,"expando$values",z)}H.ch(z,this.ce(),c)},
ce:function(){var z,y
z=H.bu(this,"expando$key")
if(z==null){y=$.dg
$.dg=y+1
z="expando$key$"+y
H.ch(this,"expando$key",z)}return z}},
fA:{
"^":"a;"},
l:{
"^":"ap;",
$isO:1,
$asO:function(){return[P.ap]}},
"+int":0,
Z:{
"^":"a;",
az:function(a,b){return H.bp(this,b,H.W(this,"Z",0),null)},
M:function(a,b){var z
for(z=this.gN(this);z.E();)b.$1(z.gI())},
bW:function(a,b){return P.c1(this,b,H.W(this,"Z",0))},
bV:function(a){return this.bW(a,!0)},
gn:function(a){var z,y
z=this.gN(this)
for(y=0;z.E();)++y
return y},
ae:function(a,b){var z,y,x
if(b<0)H.F(P.aj(b,0,null,"index",null))
for(z=this.gN(this),y=0;z.E();){x=z.gI()
if(b===y)return x;++y}throw H.e(P.bX(b,this,"index",null,y))},
k:function(a){return P.fV(this,"(",")")}},
fX:{
"^":"a;"},
m:{
"^":"a;",
$asm:null,
$isx:1},
"+List":0,
h8:{
"^":"a;"},
lf:{
"^":"a;",
k:function(a){return"null"}},
"+Null":0,
ap:{
"^":"a;",
$isO:1,
$asO:function(){return[P.ap]}},
"+num":0,
a:{
"^":";",
u:function(a,b){return this===b},
gD:function(a){return H.ai(this)},
k:function(a){return H.bv(this)}},
ak:{
"^":"a;"},
a7:{
"^":"a;",
$isO:1,
$asO:function(){return[P.a7]}},
"+String":0,
bz:{
"^":"a;ar:a<",
gn:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{dL:function(a,b,c){var z=J.be(b)
if(!z.E())return a
if(c.length===0){do a+=H.b(z.gI())
while(z.E())}else{a+=H.b(z.gI())
for(;z.E();)a=a+c+H.b(z.gI())}return a}}},
dM:{
"^":"a;"}}],["","",,W,{
"^":"",
fo:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.H)},
ao:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
ec:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
eh:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.iH(a)
if(!!J.o(z).$isY)return z
return}else return a},
jy:function(a){if(!!J.o(a).$isdd)return a
return P.jP(a,!0)},
I:function(a){var z=$.n
if(z===C.d)return a
return z.ez(a,!0)},
w:{
"^":"aY;",
$isw:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
kj:{
"^":"w;A:type=",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
kl:{
"^":"w;",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
km:{
"^":"h;A:type=",
"%":"Blob|File"},
kn:{
"^":"w;",
gbM:function(a){return H.f(new W.y(a,"error",!1),[null])},
gbN:function(a){return H.f(new W.y(a,"load",!1),[null])},
$isY:1,
$ish:1,
"%":"HTMLBodyElement"},
ko:{
"^":"w;A:type=",
"%":"HTMLButtonElement"},
d6:{
"^":"w;p:height%,q:width%",
bZ:function(a,b,c){return a.getContext(b,P.jM(c))},
dm:function(a,b,c,d,e,f,g){var z,y
z=P.ax(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bZ(a,"webgl",z)
return y==null?this.bZ(a,"experimental-webgl",z):y},
dl:function(a,b){return this.dm(a,!0,!0,!0,!0,!1,b)},
$isd6:1,
"%":"HTMLCanvasElement"},
kp:{
"^":"h;",
cQ:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
kr:{
"^":"b2;n:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
kt:{
"^":"fK;n:length=",
c_:function(a,b){var z=this.e8(a,b)
return z!=null?z:""},
e8:function(a,b){if(W.fo(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.ft()+b)},
gp:function(a){return a.height},
gq:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fK:{
"^":"h+fn;"},
fn:{
"^":"a;",
gp:function(a){return this.c_(a,"height")},
gq:function(a){return this.c_(a,"width")}},
dd:{
"^":"b2;",
$isdd:1,
"%":"Document|HTMLDocument|XMLDocument"},
ku:{
"^":"b2;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
kv:{
"^":"h;",
k:function(a){return String(a)},
"%":"DOMException"},
fu:{
"^":"h;by:bottom=,p:height=,Z:left=,bT:right=,aD:top=,q:width=,i:x=,j:y=",
k:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gq(a))+" x "+H.b(this.gp(a))},
u:function(a,b){var z,y,x
if(b==null)return!1
z=J.o(b)
if(!z.$isab)return!1
y=a.left
x=z.gZ(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaD(b)
if(y==null?x==null:y===x){y=this.gq(a)
x=z.gq(b)
if(y==null?x==null:y===x){y=this.gp(a)
z=z.gp(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){var z,y,x,w
z=J.G(a.left)
y=J.G(a.top)
x=J.G(this.gq(a))
w=J.G(this.gp(a))
return W.ec(W.ao(W.ao(W.ao(W.ao(0,z),y),x),w))},
gbX:function(a){return H.f(new P.U(a.left,a.top),[null])},
$isab:1,
$asab:I.b9,
"%":";DOMRectReadOnly"},
aY:{
"^":"b2;",
gT:function(a){return P.hx(C.b.K(a.offsetLeft),C.b.K(a.offsetTop),C.b.K(a.offsetWidth),C.b.K(a.offsetHeight),null)},
k:function(a){return a.localName},
dk:function(a){return a.getBoundingClientRect()},
gbM:function(a){return H.f(new W.y(a,"error",!1),[null])},
gbN:function(a){return H.f(new W.y(a,"load",!1),[null])},
gcU:function(a){return H.f(new W.y(a,"mousedown",!1),[null])},
gcV:function(a){return H.f(new W.y(a,"mouseenter",!1),[null])},
gcW:function(a){return H.f(new W.y(a,"mouseleave",!1),[null])},
gcX:function(a){return H.f(new W.y(a,"mousemove",!1),[null])},
gcY:function(a){return H.f(new W.y(a,"mouseout",!1),[null])},
gcZ:function(a){return H.f(new W.y(a,"mouseover",!1),[null])},
gd_:function(a){return H.f(new W.y(a,"mouseup",!1),[null])},
$isaY:1,
$ish:1,
$isY:1,
"%":";Element"},
kw:{
"^":"w;p:height%,aa:src},A:type=,q:width%",
"%":"HTMLEmbedElement"},
kx:{
"^":"bg;aJ:error=",
"%":"ErrorEvent"},
bg:{
"^":"h;A:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
Y:{
"^":"h;",
e0:function(a,b,c,d){return a.addEventListener(b,H.aQ(c,1),d)},
eo:function(a,b,c,d){return a.removeEventListener(b,H.aQ(c,1),d)},
$isY:1,
"%":"MediaStream;EventTarget"},
kQ:{
"^":"w;A:type=",
"%":"HTMLFieldSetElement"},
kT:{
"^":"w;n:length=",
"%":"HTMLFormElement"},
fG:{
"^":"fH;",
fX:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
fu:function(a,b,c){return a.open(b,c)},
bc:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
fH:{
"^":"Y;",
"%":";XMLHttpRequestEventTarget"},
kU:{
"^":"w;p:height%,aa:src},q:width%",
"%":"HTMLIFrameElement"},
dj:{
"^":"w;p:height%,aa:src},q:width%",
b1:function(a,b){return a.complete.$1(b)},
$isdj:1,
"%":"HTMLImageElement"},
kW:{
"^":"w;p:height%,aa:src},A:type=,q:width%",
$isaY:1,
$ish:1,
$isY:1,
"%":"HTMLInputElement"},
kZ:{
"^":"w;A:type=",
"%":"HTMLKeygenElement"},
l_:{
"^":"w;A:type=",
"%":"HTMLLinkElement"},
hb:{
"^":"w;aJ:error=,aa:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
l2:{
"^":"w;A:type=",
"%":"HTMLMenuElement"},
l3:{
"^":"w;A:type=",
"%":"HTMLMenuItemElement"},
c5:{
"^":"e6;",
gT:function(a){var z,y
if(!!a.offsetX)return H.f(new P.U(a.offsetX,a.offsetY),[null])
else{if(!J.o(W.eh(a.target)).$isaY)throw H.e(new P.V("offsetX is only supported on elements"))
z=W.eh(a.target)
y=H.f(new P.U(a.clientX,a.clientY),[null]).O(0,J.eW(J.eZ(z)))
return H.f(new P.U(J.d3(y.a),J.d3(y.b)),[null])}},
$isc5:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
ld:{
"^":"h;",
$ish:1,
"%":"Navigator"},
b2:{
"^":"Y;",
k:function(a){var z=a.nodeValue
return z==null?this.dJ(a):z},
"%":"Attr;Node"},
lg:{
"^":"w;A:type=",
"%":"HTMLOListElement"},
lh:{
"^":"w;p:height%,A:type=,q:width%",
"%":"HTMLObjectElement"},
li:{
"^":"w;A:type=",
"%":"HTMLOutputElement"},
b3:{
"^":"bg;",
$isb3:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
ll:{
"^":"w;aa:src},A:type=",
"%":"HTMLScriptElement"},
ln:{
"^":"w;n:length=,A:type=",
"%":"HTMLSelectElement"},
lo:{
"^":"w;aa:src},A:type=",
"%":"HTMLSourceElement"},
lp:{
"^":"bg;aJ:error=",
"%":"SpeechRecognitionError"},
lr:{
"^":"w;A:type=",
"%":"HTMLStyleElement"},
lv:{
"^":"w;A:type=",
"%":"HTMLTextAreaElement"},
cq:{
"^":"h;",
$isa:1,
"%":"Touch"},
cr:{
"^":"e6;eE:changedTouches=",
$iscr:1,
$isa:1,
"%":"TouchEvent"},
lx:{
"^":"fM;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bX(b,a,null,null,null))
return a[b]},
m:function(a,b,c){throw H.e(new P.V("Cannot assign element of immutable List."))},
ae:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
$ism:1,
$asm:function(){return[W.cq]},
$isx:1,
$isbl:1,
$isbj:1,
"%":"TouchList"},
fL:{
"^":"h+c_;",
$ism:1,
$asm:function(){return[W.cq]},
$isx:1},
fM:{
"^":"fL+fI;",
$ism:1,
$asm:function(){return[W.cq]},
$isx:1},
ly:{
"^":"w;aa:src}",
"%":"HTMLTrackElement"},
e6:{
"^":"bg;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
e7:{
"^":"hb;p:height%,q:width%",
$ise7:1,
"%":"HTMLVideoElement"},
lC:{
"^":"Y;",
$ish:1,
$isY:1,
"%":"DOMWindow|Window"},
lG:{
"^":"h;by:bottom=,p:height=,Z:left=,bT:right=,aD:top=,q:width=",
k:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
u:function(a,b){var z,y,x
if(b==null)return!1
z=J.o(b)
if(!z.$isab)return!1
y=a.left
x=z.gZ(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaD(b)
if(y==null?x==null:y===x){y=a.width
x=z.gq(b)
if(y==null?x==null:y===x){y=a.height
z=z.gp(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){var z,y,x,w
z=J.G(a.left)
y=J.G(a.top)
x=J.G(a.width)
w=J.G(a.height)
return W.ec(W.ao(W.ao(W.ao(W.ao(0,z),y),x),w))},
gbX:function(a){return H.f(new P.U(a.left,a.top),[null])},
$isab:1,
$asab:I.b9,
"%":"ClientRect"},
lH:{
"^":"b2;",
$ish:1,
"%":"DocumentType"},
lI:{
"^":"fu;",
gp:function(a){return a.height},
gq:function(a){return a.width},
gi:function(a){return a.x},
si:function(a,b){a.x=b},
gj:function(a){return a.y},
sj:function(a,b){a.y=b},
"%":"DOMRect"},
lL:{
"^":"w;",
$isY:1,
$ish:1,
"%":"HTMLFrameSetElement"},
cx:{
"^":"al;a,b,c",
ao:function(a,b,c,d){var z=new W.H(0,this.a,this.b,W.I(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.G()
return z},
cR:function(a,b,c){return this.ao(a,null,b,c)}},
y:{
"^":"cx;a,b,c"},
H:{
"^":"hN;a,b,c,d,e",
bz:function(){if(this.b==null)return
this.cA()
this.b=null
this.d=null
return},
bQ:function(a,b){if(this.b==null)return;++this.a
this.cA()},
aP:function(a){return this.bQ(a,null)},
d6:function(){if(this.b==null||this.a<=0)return;--this.a
this.G()},
G:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.eE(x,this.c,z,this.e)}},
cA:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.eF(x,this.c,z,this.e)}}},
fI:{
"^":"a;",
gN:function(a){return new W.fz(a,this.gn(a),-1,null)},
$ism:1,
$asm:null,
$isx:1},
fz:{
"^":"a;a,b,c,d",
E:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bO(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gI:function(){return this.d}},
iG:{
"^":"a;a",
$isY:1,
$ish:1,
static:{iH:function(a){if(a===window)return a
else return new W.iG(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kh:{
"^":"av;",
$ish:1,
"%":"SVGAElement"},
ki:{
"^":"hY;",
$ish:1,
"%":"SVGAltGlyphElement"},
kk:{
"^":"q;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
ky:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEBlendElement"},
kz:{
"^":"q;A:type=,p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
kA:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
kB:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFECompositeElement"},
kC:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
kD:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
kE:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
kF:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEFloodElement"},
kG:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
kH:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEImageElement"},
kI:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEMergeElement"},
kJ:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEMorphologyElement"},
kK:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEOffsetElement"},
kL:{
"^":"q;i:x=,j:y=",
"%":"SVGFEPointLightElement"},
kM:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
kN:{
"^":"q;i:x=,j:y=",
"%":"SVGFESpotLightElement"},
kO:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFETileElement"},
kP:{
"^":"q;A:type=,p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFETurbulenceElement"},
kR:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFilterElement"},
kS:{
"^":"av;p:height=,q:width=,i:x=,j:y=",
"%":"SVGForeignObjectElement"},
fF:{
"^":"av;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
av:{
"^":"q;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
kV:{
"^":"av;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGImageElement"},
l0:{
"^":"q;",
$ish:1,
"%":"SVGMarkerElement"},
l1:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGMaskElement"},
lj:{
"^":"q;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGPatternElement"},
lk:{
"^":"fF;p:height=,q:width=,i:x=,j:y=",
"%":"SVGRectElement"},
lm:{
"^":"q;A:type=",
$ish:1,
"%":"SVGScriptElement"},
ls:{
"^":"q;A:type=",
"%":"SVGStyleElement"},
q:{
"^":"aY;",
gbM:function(a){return H.f(new W.y(a,"error",!1),[null])},
gbN:function(a){return H.f(new W.y(a,"load",!1),[null])},
gcU:function(a){return H.f(new W.y(a,"mousedown",!1),[null])},
gcV:function(a){return H.f(new W.y(a,"mouseenter",!1),[null])},
gcW:function(a){return H.f(new W.y(a,"mouseleave",!1),[null])},
gcX:function(a){return H.f(new W.y(a,"mousemove",!1),[null])},
gcY:function(a){return H.f(new W.y(a,"mouseout",!1),[null])},
gcZ:function(a){return H.f(new W.y(a,"mouseover",!1),[null])},
gd_:function(a){return H.f(new W.y(a,"mouseup",!1),[null])},
$isY:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
lt:{
"^":"av;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGSVGElement"},
lu:{
"^":"q;",
$ish:1,
"%":"SVGSymbolElement"},
dO:{
"^":"av;",
"%":";SVGTextContentElement"},
lw:{
"^":"dO;",
$ish:1,
"%":"SVGTextPathElement"},
hY:{
"^":"dO;i:x=,j:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
lz:{
"^":"av;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGUseElement"},
lA:{
"^":"q;",
$ish:1,
"%":"SVGViewElement"},
lK:{
"^":"q;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
lM:{
"^":"q;",
$ish:1,
"%":"SVGCursorElement"},
lN:{
"^":"q;",
$ish:1,
"%":"SVGFEDropShadowElement"},
lO:{
"^":"q;",
$ish:1,
"%":"SVGGlyphRefElement"},
lP:{
"^":"q;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
hA:{
"^":"h;",
ex:function(a,b,c){return a.bindBuffer(b,c)},
ey:function(a,b,c){return a.bindTexture(b,c)},
eA:function(a,b){return a.blendEquation(b)},
eB:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
eC:function(a,b,c,d){return a.bufferData(b,c,d)},
eF:function(a,b){return a.clear(b)},
eG:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
eH:function(a,b){return a.clearDepth(b)},
eK:function(a,b){return a.clearStencil(b)},
eM:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
eR:function(a){return a.createBuffer()},
eS:function(a){return a.createProgram()},
eT:function(a,b){return a.createShader(b)},
eU:function(a){return a.createTexture()},
eV:function(a,b){return a.depthFunc(b)},
eW:function(a,b){return a.depthMask(b)},
f2:function(a,b){return a.disableVertexAttribArray(b)},
f3:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
f6:function(a,b){return a.enable(b)},
f7:function(a,b){return a.enableVertexAttribArray(b)},
dj:function(a,b,c){return a.getAttribLocation(b,c)},
dq:function(a,b){return a.getParameter(b)},
dr:function(a,b,c){return a.getUniformLocation(b,c)},
cQ:function(a,b){return a.lineWidth(b)},
dF:function(a,b,c,d){return a.stencilFunc(b,c,d)},
dG:function(a,b,c,d){return a.stencilOp(b,c,d)},
fF:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.jO(g))
return}z=J.o(g)
if(!!z.$isdj)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isd6)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$ise7)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aW("Incorrect number or type of arguments"))},
fE:function(a,b,c,d,e,f,g){return this.fF(a,b,c,d,e,f,g,null,null,null)},
fG:function(a,b,c,d){return a.texParameteri(b,c,d)},
fJ:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
fK:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
fL:function(a,b){return a.useProgram(b)},
fM:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kq:{
"^":"a;"}}],["","",,P,{
"^":"",
aM:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
ed:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
j2:{
"^":"a;",
fs:function(a){if(a<=0||a>4294967296)throw H.e(P.hv("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
U:{
"^":"a;i:a>,j:b>",
k:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
u:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.U))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gD:function(a){var z,y
z=J.G(this.a)
y=J.G(this.b)
return P.ed(P.aM(P.aM(0,z),y))},
l:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gi(b)
if(typeof z!=="number")return z.l()
x=C.b.l(z,x)
z=this.b
y=y.gj(b)
if(typeof z!=="number")return z.l()
y=new P.U(x,C.b.l(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
O:function(a,b){var z,y,x,w
z=this.a
y=J.eY(b)
if(typeof z!=="number")return z.O()
if(typeof y!=="number")return H.z(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.O()
if(typeof w!=="number")return H.z(w)
w=new P.U(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
jg:{
"^":"a;",
gbT:function(a){return this.gZ(this)+this.c},
gby:function(a){return this.gaD(this)+this.d},
k:function(a){return"Rectangle ("+this.gZ(this)+", "+this.b+") "+this.c+" x "+this.d},
u:function(a,b){var z,y
if(b==null)return!1
z=J.o(b)
if(!z.$isab)return!1
if(this.gZ(this)===z.gZ(b)){y=this.b
z=y===z.gaD(b)&&this.a+this.c===z.gbT(b)&&y+this.d===z.gby(b)}else z=!1
return z},
gD:function(a){var z=this.b
return P.ed(P.aM(P.aM(P.aM(P.aM(0,this.gZ(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbX:function(a){var z=new P.U(this.gZ(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
ab:{
"^":"jg;Z:a>,aD:b>,q:c>,p:d>",
$asab:null,
static:{hx:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.f(new P.ab(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
j:function(a){return a},
aA:function(a){return a},
dv:{
"^":"h;",
ew:function(a,b,c){return new Uint8Array(a,b)},
ev:function(a){return this.ew(a,0,null)},
$isdv:1,
"%":"ArrayBuffer"},
c8:{
"^":"h;",
$isc8:1,
"%":"DataView;ArrayBufferView;c6|dw|dy|c7|dx|dz|ah"},
c6:{
"^":"c8;",
gn:function(a){return a.length},
$isbl:1,
$isbj:1},
c7:{
"^":"dy;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
return a[b]},
m:function(a,b,c){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
a[b]=c}},
dw:{
"^":"c6+c_;",
$ism:1,
$asm:function(){return[P.bN]},
$isx:1},
dy:{
"^":"dw+dh;"},
ah:{
"^":"dz;",
m:function(a,b,c){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
a[b]=c},
$ism:1,
$asm:function(){return[P.l]},
$isx:1},
dx:{
"^":"c6+c_;",
$ism:1,
$asm:function(){return[P.l]},
$isx:1},
dz:{
"^":"dx+dh;"},
l4:{
"^":"c7;",
$ism:1,
$asm:function(){return[P.bN]},
$isx:1,
"%":"Float32Array"},
l5:{
"^":"c7;",
$ism:1,
$asm:function(){return[P.bN]},
$isx:1,
"%":"Float64Array"},
l6:{
"^":"ah;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.l]},
$isx:1,
"%":"Int16Array"},
l7:{
"^":"ah;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.l]},
$isx:1,
"%":"Int32Array"},
l8:{
"^":"ah;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.l]},
$isx:1,
"%":"Int8Array"},
l9:{
"^":"ah;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.l]},
$isx:1,
"%":"Uint16Array"},
la:{
"^":"ah;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.l]},
$isx:1,
"%":"Uint32Array"},
lb:{
"^":"ah;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.l]},
$isx:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
lc:{
"^":"ah;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.F(H.J(a,b))
return a[b]},
$ism:1,
$asm:function(){return[P.l]},
$isx:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
cN:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
he:{
"^":"a0;e,a,b,c,d"},
fc:{
"^":"a0;e,f,r,x,y,z,Q,a,b,c,d",
d0:[function(a){P.a3("touch # "+a)
this.f.ak().a4(new F.ff(this))},"$1","gaO",2,0,3],
aA:function(a,b,c,d,e,f,g){return!1},
a0:function(a,b){var z=this.e
if(z!=null)b.ax(a,z,this.x,this.y,this.z)},
dN:function(a,b){var z,y,x,w,v,u
this.r.ap("assets/bg_clear01.png").a4(new F.fe(this))
z=this.gaO()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
u=new F.a8(200,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
v.J(0,100,200,0)
this.C(u)},
static:{fd:function(a,b){var z,y
z=F.ac(null)
y=new E.t(new Float64Array(H.j(16)))
y.v()
y=new F.fc(null,b,a,null,null,z,!1,"none",null,y,!1)
y.b=[]
y.dN(a,b)
return y}}},
fe:{
"^":"d:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.A(0,0,J.P(a.gL()),J.P(z.e.gS()))
z.y=new F.A(0,0,400,300)}},
ff:{
"^":"d:1;a",
$1:function(a){var z,y
z=this.a
y=z.f
y.C(F.dC(z.r,y))}},
hI:{
"^":"a0;e,f,r,x,y,z,Q,a,b,c,d",
d0:[function(a){P.a3("touch # "+a)
this.f.ak().a4(new F.hL(this))},"$1","gaO",2,0,3],
aA:function(a,b,c,d,e,f,g){return!1},
a0:function(a,b){var z=this.e
if(z!=null)b.ax(a,z,this.x,this.y,this.z)},
dT:function(a,b){var z,y,x,w,v,u
this.r.ap("assets/bg_start.png").a4(new F.hK(this))
z=this.gaO()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
u=new F.a8(200,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
v.J(0,100,200,0)
this.C(u)},
static:{hJ:function(a,b){var z,y
z=F.ac(null)
y=new E.t(new Float64Array(H.j(16)))
y.v()
y=new F.hI(null,b,a,null,null,z,!1,"none",null,y,!1)
y.b=[]
y.dT(a,b)
return y}}},
hK:{
"^":"d:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.A(0,0,J.P(a.gL()),J.P(z.e.gS()))
z.y=new F.A(0,0,400,300)}},
hL:{
"^":"d:1;a",
$1:function(a){var z,y
z=this.a
y=z.f
y.C(F.dC(z.r,y))}},
hf:{
"^":"a;a,b,c,d",
P:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z+1,x=this.b+2,w=x-1,v=0;v<y;++v)for(u=v===z,t=0;t<x;++t)if(t===0||t===w||u)this.R(t,v).a=C.q
else this.R(t,v).a=C.e},
R:function(a,b){var z,y
if(typeof a!=="number")return a.ag()
if(!(a<0)){z=this.c+1
if(!(a>z)){y=J.aF(b)
z=y.ag(b,0)||y.aq(b,z)}else z=!0}else z=!0
if(z)return this.d
z=this.a
y=J.eD(b,this.b+2)
if(typeof y!=="number")return H.z(y)
y=a+y
if(y>>>0!==y||y>=z.length)return H.c(z,y)
return z[y]},
eL:function(){var z,y,x,w,v,u
z=[]
for(y=this.c+1-1,x=this.b+2-1,w=0;w<y;++w){u=1
while(!0){if(!(u<x)){v=!0
break}if(this.R(u,w).a===C.e){v=!1
break}++u}if(v)z.push(w)}C.a.bA(z,"sort")
y=P.jU()
H.b5(z,0,z.length-1,y)
return z},
eJ:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.M)(a),++y)this.eI(a[y])},
eI:function(a){var z,y,x,w
for(z=this.b+2-1,y=a;x=J.aF(y),x.b9(y,0);y=x.O(y,1))for(w=1;w<z;++w)if(this.R(w,x.O(y,1)).a===C.p)this.R(w,y).a=C.e
else this.R(w,y).a=this.R(w,x.O(y,1)).a},
dQ:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.c,y=z+1,x=this.b+2,w=this.a,v=x-1,u=0;u<y;++u)for(t=u===z,s=0;s<x;++s)if(s===0||s===v||t)w.push(new F.bq(C.q))
else w.push(new F.bq(C.e))},
static:{dt:function(a,b){var z=new F.hf([],b,a,new F.bq(C.p))
z.dQ(a,b)
return z}}},
hc:{
"^":"a;a,b,c,d,e,f,r,x,y",
cT:function(){var z,y
z=this.b
if(z.length>0){C.a.b_(z,"removeAt")
if(0>=z.length)H.F(P.b4(0,null,null))
z.splice(0,1)[0]}for(;z.length<3;){y=F.hh()
y.a=(this.a.b+2)/2|0
y.b=0
z.push(y)}},
cK:function(a,b){var z,y,x
if(!b){z=this.r
y=$.$get$br()
x=this.e
if(x>=5)return H.c(y,x)
x=z+y[x]/2<a
z=x}else z=!0
if(z){this.r=a
this.cJ()}},
cJ:function(){var z,y,x,w
if(!this.bL(0,1)){z=this.b
if(1>=z.length)return H.c(z,1)
if(this.b0(z[1]))this.c=!0
this.cT()
y=this.a.eL()
z=y.length
if(z>0){x=this.d
w=this.e*10
H.a1(w)
H.a1(z)
this.d=x+Math.pow(w,z)}this.a.eJ(y)}},
bL:function(a,b){var z,y,x
z=this.b
this.a6(C.a.gF(z),!1)
y=C.a.gF(z)
y.a=J.r(y.a,a)
y=C.a.gF(z)
y.b=J.r(y.b,b)
if(this.b0(C.a.gF(z))){y=C.a.gF(z)
x=y.a
if(typeof x!=="number")return x.O()
y.a=x-a
x=C.a.gF(z)
y=x.b
if(typeof y!=="number")return y.O()
x.b=y-b
this.a6(C.a.gF(z),!0)
return!1}else{this.a6(C.a.gF(z),!0)
return!0}},
b0:function(a){var z,y,x,w,v
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x){w=z[x]
v=J.i(w)
v=this.a.R(J.r(a.a,v.gi(w)),J.r(a.b,v.gj(w))).a
if(!(v===C.e||v===C.p))return!0}return!1},
a6:function(a,b){var z,y,x,w,v,u
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x){w=z[x]
v=J.i(w)
u=this.a.R(J.r(a.a,v.gi(w)),J.r(a.b,v.gj(w)))
if(u.a!==C.p)if(b)u.a=v.gA(w)
else u.a=C.e}}},
a6:{
"^":"a;a",
k:function(a){return C.I.h(0,this.a)}},
ay:{
"^":"a;i:a*,j:b*,c",
d8:function(){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x){w=z[x]
v=J.i(w)
u=v.gi(w)
t=v.gj(w)
if(typeof t!=="number")return H.z(t)
v.si(w,-1*t)
v.sj(w,u)}},
d7:function(){var z,y,x,w,v,u
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x){w=z[x]
v=J.i(w)
u=v.gi(w)
v.si(w,v.gj(w))
if(typeof u!=="number")return H.z(u)
v.sj(w,-1*u)}},
static:{hh:function(){switch($.$get$du().fs(7)){case 0:var z=[]
z.push(new F.v(0,0,C.h))
z.push(new F.v(-1,0,C.h))
z.push(new F.v(1,0,C.h))
z.push(new F.v(2,0,C.h))
return new F.ay(0,0,z)
case 1:z=[]
z.push(new F.v(0,0,C.i))
z.push(new F.v(1,0,C.i))
z.push(new F.v(0,-1,C.i))
z.push(new F.v(1,-1,C.i))
return new F.ay(0,0,z)
case 2:z=[]
z.push(new F.v(0,0,C.j))
z.push(new F.v(1,0,C.j))
z.push(new F.v(0,-1,C.j))
z.push(new F.v(-1,-1,C.j))
return new F.ay(0,0,z)
case 3:z=[]
z.push(new F.v(0,0,C.k))
z.push(new F.v(-1,0,C.k))
z.push(new F.v(0,-1,C.k))
z.push(new F.v(1,-1,C.k))
return new F.ay(0,0,z)
case 4:z=[]
z.push(new F.v(1,0,C.n))
z.push(new F.v(1,-1,C.n))
z.push(new F.v(0,0,C.n))
z.push(new F.v(-1,0,C.n))
return new F.ay(0,0,z)
case 5:z=[]
z.push(new F.v(-1,0,C.l))
z.push(new F.v(-1,-1,C.l))
z.push(new F.v(0,0,C.l))
z.push(new F.v(1,0,C.l))
return new F.ay(0,0,z)
case 6:z=[]
z.push(new F.v(-1,0,C.m))
z.push(new F.v(0,-1,C.m))
z.push(new F.v(0,0,C.m))
z.push(new F.v(1,0,C.m))
return new F.ay(0,0,z)
case 7:H.cN("#### WARNING")
break}}}},
v:{
"^":"bq;i:b*,j:c*,a"},
bq:{
"^":"a;A:a>"},
hg:{
"^":"a0;e,f,a,b,c,d",
a0:function(a,b){var z,y,x,w,v,u
z=new F.A(0,0,7,7)
y=F.ac(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.R(v,x).a
if(u===C.q)y.a=$.$get$ca()
else if(u===C.e)y.a=$.$get$c9()
else if(u===C.h)y.a=$.$get$cc()
else if(u===C.i)y.a=$.$get$bt()
else if(u===C.m)y.a=$.$get$ce()
else if(u===C.j)y.a=$.$get$cd()
else if(u===C.k)y.a=$.$get$cf()
else if(u===C.l)y.a=$.$get$cb()
else if(u===C.n)y.a=$.$get$bs()
else y.a=$.$get$bs()
b.ad(a,z,y)}}},
hd:{
"^":"a0;e,f,a,b,c,d",
dD:function(a){var z,y,x,w,v,u,t,s,r
this.f.P(0)
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x){w=z[x]
v=this.f
u=J.i(w)
t=u.gi(w)
if(typeof t!=="number")return H.z(t)
s=u.gj(w)
if(typeof s!=="number")return H.z(s)
r=v.R(3+t,3+s)
if(r.a!==C.p)r.a=u.gA(w)}},
a0:function(a,b){var z,y,x,w,v,u
z=new F.A(0,0,7,7)
y=F.ac(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.R(v,x).a
if(u===C.q)y.a=$.$get$ca()
else if(u===C.e)y.a=$.$get$c9()
else if(u===C.h)y.a=$.$get$cc()
else if(u===C.i)y.a=$.$get$bt()
else if(u===C.m)y.a=$.$get$ce()
else if(u===C.j)y.a=$.$get$cd()
else if(u===C.k)y.a=$.$get$cf()
else if(u===C.l)y.a=$.$get$cb()
else if(u===C.n)y.a=$.$get$bs()
else y.a=$.$get$bt()
b.ad(a,z,y)}}},
hl:{
"^":"a0;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b,c,d",
bO:function(a,b){var z,y,x,w,v
z=this.r
this.cx.f=z.d
this.cy.f=z.e
y=z.b
x=y.length
if(x>1&&!0){w=this.ch
if(1>=x)return H.c(y,1)
w.dD(y[1])}x=z.y
w=$.$get$ds()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.y=b
z.cJ()}x=this.x
x=x.z/x.r
if(x>0.5){x=z.r
w=$.$get$br()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.r=b
z.bL(1,0)}}else if(x<-0.5){x=z.r
w=$.$get$br()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.r=b
z.bL(-1,0)}}x=this.x
x=-x.Q/x.r
if(x<-0.5)z.cK(b,!1)
else if(x>0.6)z.cK(b,!0)
if(this.y.r){x=z.x
w=$.$get$c4()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.x=b
z.a6(C.a.gF(y),!1)
C.a.gF(y).d8()
if(z.b0(C.a.gF(y))){C.a.gF(y).d7()
z.a6(C.a.gF(y),!0)}else z.a6(C.a.gF(y),!0)}}else if(this.z.r){x=z.x
w=$.$get$c4()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.x=b
z.a6(C.a.gF(y),!1)
C.a.gF(y).d8()
if(z.b0(C.a.gF(y))){C.a.gF(y).d7()
z.a6(C.a.gF(y),!0)}else z.a6(C.a.gF(y),!0)}}if(z.c)this.f.ak().a4(new F.hp(this))},
d2:[function(a){},"$1","gd1",2,0,3],
dR:function(a,b,c){var z,y,x,w,v
z=this.gd1()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
v=new F.a8(40,40,!1,!1,"r",y,x,w,z,0,0,0,0,"none",null,v,!1)
v.b=[]
this.y=v
z=this.gd1()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
v=new F.a8(40,40,!1,!1,"l",y,x,w,z,0,0,0,0,"none",null,v,!1)
v.b=[]
this.z=v
z=new E.t(new Float64Array(H.j(16)))
z.v()
z=new F.i8("joystick",70,35,!1,0,0,0,"none",null,z,!1)
z.b=[]
this.x=z
z=this.e
y=this.r
x=y.a
w=new E.t(new Float64Array(H.j(16)))
w.v()
w=new F.hg(z,x,"none",null,w,!1)
w.b=[]
this.Q=w
x=new E.t(new Float64Array(H.j(16)))
x.v()
x=new F.hd(z,null,"none",null,x,!1)
x.b=[]
x.f=F.dt(5,5)
this.ch=x
x=new E.t(new Float64Array(H.j(16)))
x.v()
x=new F.dI(this,0,7,"none",null,x,!1)
x.b=[]
this.cx=x
x=new E.t(new Float64Array(H.j(16)))
x.v()
x=new F.dI(this,0,7,"none",null,x,!1)
x.b=[]
this.cy=x
x.r=3
this.C(this.Q)
this.C(this.x)
this.C(this.y)
this.C(this.z)
this.C(this.ch)
this.C(this.cx)
this.C(this.cy)
this.Q.c.J(0,100,25,0)
this.x.c.J(0,100,250,0)
this.y.c.J(0,250,225,0)
this.z.c.J(0,300,225,0)
this.ch.c.J(0,225,153,0)
this.cx.c.J(0,225,50,0)
this.cy.c.J(0,225,85,0)
z.ap("assets/se_play.png").a4(new F.hn(this))
z.b3("assets/se_play.json").a4(new F.ho(this))
y.f=c
y.e=c
P.a3("### game =  "+c)},
static:{hm:function(a,b,c){var z,y
z=new F.hc(F.dt(21,11),[],!1,0,1,1,0,0,0)
z.cT()
y=new E.t(new Float64Array(H.j(16)))
y.v()
y=new F.hl(a,b,z,null,null,null,null,null,null,null,null,null,"none",null,y,!1)
y.b=[]
y.dR(a,b,c)
return y}}},
hn:{
"^":"d:20;a",
$1:function(a){this.a.dx=a}},
ho:{
"^":"d:3;a",
$1:function(a){var z=new F.dJ(a,[])
z.d4(a)
this.a.db=z}},
hp:{
"^":"d:1;a",
$1:function(a){var z,y
z=this.a
y=z.f
y.C(F.fd(z.e,y))}},
hq:{
"^":"a0;e,f,r,x,y,z,Q,ch,cx,cy,a,b,c,d",
ft:[function(a){P.a3("touch # "+a)
switch(a){case"L01":this.cx=120
this.cy=60
this.ch=0
break
case"L02":this.cx=175
this.cy=60
this.ch=1
break
case"L03":this.cx=215
this.cy=60
this.ch=2
break
case"L04":this.cx=265
this.cy=60
this.ch=3
break
case"L05":this.cx=315
this.cy=60
this.ch=4
break}},"$1","gaN",2,0,3],
d0:[function(a){P.a3("touch # "+a)
this.f.ak().a4(new F.ht(this))},"$1","gaO",2,0,3],
aA:function(a,b,c,d,e,f,g){return!1},
a0:function(a,b){var z,y
z=this.e
if(z!=null&&this.Q!=null){y=this.z
b.ax(a,z,this.Q.bH("BG001.png").gbd(),this.y,y)
b.ax(a,this.e,this.Q.bH("CH001.png").gbd(),new F.A(this.cx,this.cy,35,35),y)}},
dS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
z.ap("assets/se_setting.png").a4(new F.hr(this))
z.b3("assets/se_setting.json").a4(new F.hs(this))
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
u=new F.a8(45,45,!1,!1,"L01",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
u.z=F.k(0,255,255,255)
v.J(0,120,50,0)
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
t=new F.a8(45,45,!1,!1,"L02",y,x,w,z,0,0,0,0,"none",null,v,!1)
t.b=[]
t.z=F.k(0,255,255,255)
v.J(0,175,50,0)
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
s=new F.a8(45,45,!1,!1,"L03",y,x,w,z,0,0,0,0,"none",null,v,!1)
s.b=[]
s.z=F.k(0,255,255,255)
v.J(0,215,50,0)
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
r=new F.a8(45,45,!1,!1,"L04",y,x,w,z,0,0,0,0,"none",null,v,!1)
r.b=[]
r.z=F.k(0,255,255,255)
v.J(0,265,50,0)
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
q=new F.a8(45,45,!1,!1,"L05",y,x,w,z,0,0,0,0,"none",null,v,!1)
q.b=[]
q.z=F.k(0,255,255,255)
v.J(0,315,50,0)
this.C(u)
this.C(t)
this.C(s)
this.C(r)
this.C(q)
this.ch=1
this.ft("L01")
z=this.gaO()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.v()
p=new F.a8(150,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
p.b=[]
v.J(0,240,250,0)
this.C(p)},
static:{dC:function(a,b){var z,y
z=F.ac(null)
y=new E.t(new Float64Array(H.j(16)))
y.v()
y=new F.hq(null,b,a,null,null,z,null,1,0,0,"none",null,y,!1)
y.b=[]
y.dS(a,b)
return y}}},
hr:{
"^":"d:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.A(0,0,J.P(a.gL()),J.P(z.e.gS()))
z.y=new F.A(0,0,400,300)}},
hs:{
"^":"d:3;a",
$1:function(a){var z=new F.dJ(a,[])
z.d4(a)
this.a.Q=z}},
ht:{
"^":"d:1;a",
$1:function(a){var z,y
z=this.a
P.a3("### level =  "+z.ch)
y=z.f
y.C(F.hm(z.r,y,z.ch))}},
dI:{
"^":"a0;e,f,r,a,b,c,d",
a0:function(a,b){var z,y,x,w,v
z=this.e
if(z.db==null||z.dx==null)return
for(y=0;x=this.r,y<x;++y){w=x-1-y
if(w===0)w=1
else w=Math.pow(10,w)
w=C.b.ds(C.b.c3(this.f,w),10)
v=new F.dR(null,C.f,1)
v.a=F.k(255,255,255,255)
b.ax(a,z.dx,z.db.bH("NUM00"+H.b(w)+".png").gbd(),new F.A(y*12,0,15,15),v)}}}}],["","",,P,{
"^":"",
jM:function(a){var z={}
a.M(0,new P.jN(z))
return z},
jP:function(a,b){var z=[]
return new P.jS(b,new P.jQ([],z),new P.jR(z),new P.jT(z)).$1(a)},
jO:function(a){return a},
dc:function(){var z=$.db
if(z==null){z=J.bQ(window.navigator.userAgent,"Opera",0)
$.db=z}return z},
ft:function(){var z,y
z=$.d8
if(z!=null)return z
y=$.d9
if(y==null){y=J.bQ(window.navigator.userAgent,"Firefox",0)
$.d9=y}if(y===!0)z="-moz-"
else{y=$.da
if(y==null){y=P.dc()!==!0&&J.bQ(window.navigator.userAgent,"Trident/",0)
$.da=y}if(y===!0)z="-ms-"
else z=P.dc()===!0?"-o-":"-webkit-"}$.d8=z
return z},
jN:{
"^":"d:21;a",
$2:function(a,b){this.a[a]=b}},
jQ:{
"^":"d:22;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
jR:{
"^":"d:23;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.c(z,a)
return z[a]}},
jT:{
"^":"d:24;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.c(z,a)
z[a]=b}},
jS:{
"^":"d:1;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.fq(a.getTime(),!0)
if(a instanceof RegExp)throw H.e(new P.cs("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.b1()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.M)(w),++u){t=w[u]
x.m(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.E(a)
s=w.gn(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.z(s)
v=J.aR(x)
r=0
for(;r<s;++r)v.m(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
ew:[function(){var z=0,y=new P.a5(),x=1,w,v,u,t,s,r,q,p
function $async$ew(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=G
r=r
q=P
v=new r.i4(700,500,q.b1())
r=E
r=r
q=Float64Array
p=H
u=new r.t(new q(p.j(16)))
r=u
r.v()
r=F
t=new r.i7(400,300,1,1,1,0,0,null,"none",null,u,!1)
r=t
r.b=[]
r=t
q=F
r.ch=q.k(255,238,238,255)
r=E
r=r
q=Float64Array
p=H
u=new r.t(new q(p.j(16)))
r=u
r.v()
r=G
s=new r.ij(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
r=s
q=G
r.a=q.ie(400,600)
r=s
r.sU(t)
r=s
r.fq()
r=s
r.fI()
r=s
r.x=!0
r=s
z=!r.d?2:3
break
case 2:r=s
r.d=!0
r=s
r.aU()
case 3:r=E
r=r
q=Float64Array
p=H
u=new r.t(new q(p.j(16)))
r=u
r.v()
r=F
u=new r.he(v,"none",null,u,!1)
r=u
r.b=[]
r=u
r=r
q=F
r.C(q.hJ(v,u))
r=t
r.C(u)
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$ew,y,null)},"$0","ex",0,0,0]},1],["","",,F,{
"^":"",
bm:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.M)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.aY(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
a8:{
"^":"a0;L:e<,S:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
cE:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
aA:function(a,b,c,d,e,f,g){var z
switch(c){case"pointerdown":if(this.cE(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.cy=0
this.db=0}break
case"pointermove":if(this.cE(d,e)){this.x=!0
z=this.cy+(f-this.dx)
this.cy=z
this.db=this.db+(g-this.dy)
if(!(Math.sqrt(H.a1(z*z))>this.e)){z=this.db
z=Math.sqrt(H.a1(z*z))>this.f}else z=!0
if(z){this.r=!1
this.x=!1}}else{this.r=!1
this.x=!1}break
case"pointerup":if(this.r&&!0)P.fB(new F.i2(this),null)
this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
a0:function(a,b){var z,y,x
z=F.ac(null)
if(this.r){z.a=this.Q
b.ad(a,new F.A(0,0,this.e,this.f),z)}else{y=this.f
x=this.e
if(this.x){z.a=this.ch
b.ad(a,new F.A(0,0,x,y),z)}else{z.a=this.z
b.ad(a,new F.A(0,0,x,y),z)}}},
d2:function(a){return this.cx.$1(a)}},
i2:{
"^":"d:0;a",
$0:function(){var z=this.a
z.d2(z.y)}},
dP:{
"^":"a;"},
a0:{
"^":"a;",
C:function(a){var z=0,y=new P.a5(),x=1,w,v=this,u,t,s,r
function $async$C(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.f(new s.D(0,r.n,null),[null])
t=u
t.aF(null)
z=2
return H.p(u,$async$C,y)
case 2:t=v
t=t.b
t.push(a)
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$C,y,null)},
b5:function(a){var z=0,y=new P.a5(),x=1,w,v=this,u,t,s
function $async$b5(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.D(0,s.n,null)
u.$builtinTypeInfo=[null]
t=u
t.aF(null)
z=2
return H.p(u,$async$b5,y)
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
t.a3(u,a)
t=a
t.df()
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$b5,y,null)},
ak:function(){var z=0,y=new P.a5(),x=1,w,v=this,u,t,s,r,q,p
function $async$ak(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.f(new q.D(0,p.n,null),[null])
r=u
r.aF(null)
z=2
return H.p(u,$async$ak,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.b5(u[s])
case 4:r=u.length===t
if(r)b=r
else{z=6
break}z=7
break
case 6:r=H
b=(0,r.M)(u)
case 7:b,++s
z=3
break
case 5:return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$ak,y,null)},
cO:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x)z[x].cO(a)},
bO:function(a,b){},
dd:function(a,b){var z,y,x
this.bC()
this.bO(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x)z[x].dd(a,b)},
a0:function(a,b){},
bP:["dK",function(a,b){var z,y,x,w,v,u
this.bC()
this.a0(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.M)(z),++w){v=z[w]
u=v.c
x.push(C.a.gan(x).t(0,u))
b.aS()
v.bP(a,b)
if(0>=x.length)return H.c(x,0)
x.pop()
b.aS()}}],
de:["a7",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.bC()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.c(y,w)
v=y[w]
a.a2(v.c)
u=v.de(a,b,c,d,e)
a.a1()
if(u===!0)return u}t=a.dn().bB(0)
t.fj()
y=new E.u(new Float64Array(H.j(3)))
y.B(d,e,0)
s=t.t(0,y)
return this.aA(a,b,c,s.gi(s),s.gj(s),d,e)}],
aA:function(a,b,c,d,e,f,g){return!1},
df:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x)z[x].df()
this.d=!1},
bC:function(){if(!this.d)this.d=!0}},
i3:{
"^":"a;",
ap:function(a){var z=0,y=new P.a5(),x,w=2,v,u=this,t,s,r,q
function $async$ap(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.a9(a)?3:4
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
return H.p(q.b2(a),$async$ap,y)
case 5:s.m(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$ap,y,null)}},
A:{
"^":"a;i:a*,j:b*,L:c<,S:d<",
u:function(a,b){if(b==null)return!1
return b instanceof F.A&&J.C(b.a,this.a)&&J.C(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gD:function(a){return F.bm([J.G(this.a),J.G(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
k:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)+", w:"+H.b(this.c)+", h:"+H.b(this.d)}},
dS:{
"^":"a;i:a*,j:b*",
u:function(a,b){if(b==null)return!1
return b instanceof F.dS&&J.C(b.a,this.a)&&J.C(b.b,this.b)},
gD:function(a){return F.bm([J.G(this.a),J.G(this.b)])},
k:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)}},
dT:{
"^":"a;L:a<,S:b<",
u:function(a,b){if(b==null)return!1
return b instanceof F.dT&&b.a===this.a&&b.b===this.b},
gD:function(a){return F.bm([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
k:function(a){return"w:"+H.b(this.a)+", h:"+H.b(this.b)}},
i9:{
"^":"a;a",
k:function(a){return C.J.h(0,this.a)}},
dR:{
"^":"a;a,b,c",
dW:function(a){if(this.a==null)this.a=F.k(255,255,255,255)},
static:{ac:function(a){var z=new F.dR(a,C.f,1)
z.dW(a)
return z}}},
dQ:{
"^":"a;a",
u:function(a,b){if(b==null)return!1
return b instanceof F.dQ&&b.a===this.a},
gD:function(a){return F.bm([this.a&0x1FFFFFFF])},
k:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
dV:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{k:function(a,b,c,d){var z=new F.dQ(0)
z.dV(a,b,c,d)
return z}}},
cl:{
"^":"a;"},
i7:{
"^":"a0;L:e<,S:f<,r,x,y,z,Q,ch,a,b,c,d",
de:function(a,b,c,d,e){a.a2(this.c)
this.a7(a,b,c,d,e)
a.a1()},
bO:function(a,b){var z,y,x,w
z=this.e
y=(a.gL()-a.gfv(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.t(new Float64Array(H.j(16)))
y.v()
this.c=y
y.J(0,this.z,this.Q,0)
y=this.c
z=this.y
y.ba(0,z,z,1)},
bP:function(a,b){var z,y,x
z=new F.A(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.gan(x).t(0,y))
b.aS()
y=b.b
y.push(z)
b.aH(a,z)
this.dK(a,b)
if(0>=y.length)return H.c(y,0)
y.pop()
if(y.length>0)b.aH(a,C.a.gan(y))
else{y=a.a
b.aH(a,new F.A(0,0,y.c,y.d))}if(0>=x.length)return H.c(x,0)
x.pop()
b.aS()},
a0:function(a,b){var z,y
z=new F.A(0,0,this.e,this.f)
y=F.ac(null)
y.a=this.ch
b.aH(a,z)
b.ad(a,z,y)}},
i8:{
"^":"a0;e,f,r,x,y,z,Q,a,b,c,d",
a0:function(a,b){var z,y,x,w,v,u,t
z=F.ac(null)
if(this.x)z.a=F.k(170,170,170,255)
else z.a=F.k(170,255,170,170)
y=this.f
x=-y/2
w=this.z
v=this.r
u=v/2
t=this.Q
b.bE(a,new F.A(x,x,y,y),z)
b.bE(a,new F.A(w-u,t-u,v,v),z)},
aA:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(!this.x){if(this.cI(d,e,0,0)<this.f){this.y=b
this.x=!0
this.z=d
this.Q=e}}else if(b===this.y)if(c==="pointerup"||c==="pointercancel"){this.x=!1
this.z=0
this.Q=0}else{this.z=d
this.Q=e
z=this.cI(0,0,d,e)
y=this.f
x=y/2
if(z>x){w=this.z
v=w>0?w:-1*w
u=this.Q
t=v+(u>0?u:-1*u)
this.z=x*w/t
this.Q=y/2*u/t}}return!1},
cI:function(a,b,c,d){var z,y
z=a-c
H.a1(z)
H.a1(2)
z=Math.pow(z,2)
y=b-d
H.a1(y)
H.a1(2)
return Math.sqrt(H.a1(z+Math.pow(y,2)))}},
dJ:{
"^":"a;a,b",
bH:function(a){var z,y,x,w
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.M)(z),++x){w=z[x]
if(J.C(w.a,a))return w}return},
d4:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.be(H.ke(J.bO(P.jB(a,null),"frames"),"$ism",[P.h8],"$asm")),y=this.b;z.E();){x=z.gI()
w=new F.hH(null,null,null,null,null,null,null)
v=J.E(x)
w.a=v.h(x,"filename")
w.r=w.d3(v.h(x,"frame"))
w.b=v.h(x,"rotated")
w.c=v.h(x,"trimmed")
w.d=w.d3(v.h(x,"spriteSourceSize"))
u=v.h(x,"sourceSize")
t=J.E(u)
s=t.h(u,"w")
r=t.h(u,"h")
w.e=new F.dT(J.P(s),J.P(r))
v=v.h(x,"pivot")
u=J.E(v)
q=u.h(v,"x")
p=u.h(v,"y")
w.f=new F.dS(J.P(q),J.P(p))
y.push(w)}}},
hH:{
"^":"a;a,b,c,d,e,f,r",
gbd:function(){var z,y
z=this.b
y=this.r
if(z===!0)return new F.A(y.a,y.b,y.d,y.c)
else return new F.A(y.a,y.b,y.c,y.d)},
d3:function(a){var z,y,x,w,v
z=J.E(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.A(J.P(y),J.P(x),J.P(w),J.P(v))}},
ia:{
"^":"a;",
gU:function(){return this.c$},
sU:function(a){this.c$=a},
fm:function(a){if(!this.e$){this.c$.cO(this)
this.e$=!0}this.c$.dd(this,a)
this.fo()},
a2:function(a){var z=this.f$
z.push(C.a.gan(z).t(0,a))},
a1:function(){var z=this.f$
if(0>=z.length)return H.c(z,0)
z.pop()},
dn:function(){return C.a.gan(this.f$)}}}],["","",,G,{
"^":"",
cm:function(a){var z=0,y=new P.a5(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$cm(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.f(new p.cv(o.f(new n.D(0,m.n,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.f3(t,a)
q=J
s=q.i(t)
q=s
r=q.gbN(t)
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
m=m.I(new l.ih(u,t))
l=r
p=new p.H(0,o,n,m,l.c)
o=H
q=q.f(p,[o.B(r,0)])
q.G()
q=s
s=q.gbM(t)
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
m=m.I(new l.ii(a,u))
l=s
p=new p.H(0,o,n,m,l.c)
o=H
q=q.f(p,[o.B(s,0)])
q.G()
q=u
x=q.a
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$cm,y,null)},
cn:function(a,b,c){var z,y,x
z=G.dU(a,35633,b)
y=G.dU(a,35632,c)
x=J.eJ(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
dU:function(a,b,c){var z,y
z=J.eK(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
co:function(a,b){var z=J.bc(a)
a.bindBuffer(34962,z)
a.bufferData(34962,new Float32Array(H.aA(b)),35044)
a.bindBuffer(34962,null)
return z},
cp:function(a,b){var z=J.bc(a)
a.bindBuffer(34963,z)
a.bufferData(34963,new Uint16Array(H.aA(b)),35044)
a.bindBuffer(34963,null)
return z},
dV:function(a,b,c,d){a.uniformMatrix4fv(J.aT(a,b,c),!1,new Float32Array(H.aA(d.gw())))},
ig:{
"^":"cl;a,b",
gL:function(){return J.eX(this.a)},
gS:function(){return J.eO(this.a)},
c0:function(a){var z
if(this.b==null){z=J.i(a).eU(a)
this.b=z
a.bindTexture(3553,z)
C.L.fE(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
id:{
"^":"a;a,b,c,p:d>",
dX:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.aB(b)
y=C.c.aB(a)
x=document.createElement("canvas",null)
J.f4(x,z)
J.f2(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.f_(this.b,!0)},
static:{ie:function(a,b){var z=new G.id(null,null,null,null)
z.dX(a,b)
return z}}},
ib:{
"^":"dP;c,d,e,f,r,x,a,b",
bG:function(a){},
bI:function(){var z,y
z=C.a.ay(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.a.ay(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cn(this.c,z,y)
z=C.a.ay(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.a.ay(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cn(this.c,z,y)},
P:function(a){this.r=1
J.bd(this.c,2960)
J.cY(this.c,515)
J.cU(this.c,0,0,0,1)
J.cV(this.c,1)
J.cW(this.c,0)
J.bd(this.c,3042)
switch(-1){case-1:J.cQ(this.c,32774)
J.cR(this.c,770,771,770,32772)
break}J.cT(this.c,17664)},
ac:function(){var z,y
this.x.v()
z=this.x.J(0,-1,1,0)
this.x=z
y=this.d
y=z.ba(0,2/y.c,-2/y.d,1)
this.x=y
y=y.t(0,C.a.gan(this.a))
this.x=y
return y},
ad:function(a,b,c){var z,y,x,w
z=b.a
y=b.b
x=J.r(z,b.c)
w=J.r(b.b,b.d)
this.cL(a,[z,y,0,z,w,0,x,y,0,x,w,0],[0,1,3,2],c.a,c.b,c.c)},
bE:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=b.c/2
y=J.r(b.a,z)
x=b.d/2
w=J.r(b.b,x)
v=[]
u=[]
for(t=J.a2(w),s=J.a2(y),r=0;r<50;++r){u.push(r)
q=6.283185307179586*(r/50)
v.push(s.l(y,Math.cos(q)*z))
v.push(t.l(w,Math.sin(q)*x))
v.push(0)}this.cL(a,v,u,c.a,c.b,c.c)},
cL:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
J.aV(this.c,this.e)
z=G.co(this.c,b)
J.ad(this.c,34962,z)
y=G.cp(this.c,c)
J.ad(this.c,34963,y)
G.dV(this.c,this.e,"u_mat",this.ac())
x=this.c
w=this.e
v=d.a
x.uniform4fv(J.aT(x,w,"color"),new Float32Array(H.aA([(v>>>16&255)/255,(v>>>8&255)/255,(v>>>0&255)/255,(v>>>24&255)/255])))
v=this.c
v.uniform1f(J.aT(v,this.e,"u_point_size"),f)
u=J.ar(this.c,this.e,"vp")
J.as(this.c,u,3,5126,!1,0,0)
J.aq(this.c,u)
if(e===C.f)t=6
else{J.f0(this.c,f)
t=2}J.bR(this.c,t,b.length/3|0,5123,0)
J.aV(this.c,null)},
aH:function(a,b){var z
J.cX(this.c,!1,!1,!1,!1)
J.cZ(this.c,!1)
J.d2(this.c,7680,7681,7681)
J.d1(this.c,519,this.r,255)
z=F.ac(null)
z.a=F.k(255,255,255,255)
this.ad(null,b,z)
J.cX(this.c,!0,!0,!0,!0)
J.cZ(this.c,!0)
J.d2(this.c,7680,7680,7680)
J.d1(this.c,515,this.r,255);++this.r},
ax:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
J.aV(this.c,this.f)
z=J.ar(this.c,this.f,"a_tex")
y=J.bc(this.c)
J.ad(this.c,34962,y)
x=c.a
w=b.gL()
if(typeof x!=="number")return x.af()
if(typeof w!=="number")return H.z(w)
v=x/w
w=c.b
x=b.gS()
if(typeof w!=="number")return w.af()
if(typeof x!=="number")return H.z(x)
u=w/x
x=J.r(c.a,c.c)
w=b.gL()
if(typeof x!=="number")return x.af()
if(typeof w!=="number")return H.z(w)
t=x/w
w=J.r(c.b,c.d)
x=b.gS()
if(typeof w!=="number")return w.af()
if(typeof x!=="number")return H.z(x)
s=w/x
J.cS(this.c,34962,new Float32Array(H.aA([v,u,v,s,t,u,t,s])),35044)
J.aq(this.c,z)
J.as(this.c,z,2,5126,!1,0,0)
r=b.c0(this.c)
J.bP(this.c,3553,r)
J.ae(this.c,3553,10242,33071)
J.ae(this.c,3553,10243,33071)
J.ae(this.c,3553,10241,9728)
J.ae(this.c,3553,10240,9728)
q=d.a
p=d.b
o=J.r(q,d.c)
n=J.r(d.b,d.d)
m=G.co(this.c,[q,p,0,q,n,0,o,p,0,o,n,0])
J.ad(this.c,34962,m)
l=G.cp(this.c,[0,1,2,1,3,2])
J.ad(this.c,34963,l)
k=J.ar(this.c,this.f,"vp")
j=J.aT(this.c,this.f,"u_mat")
J.f6(this.c,j,!1,new Float32Array(H.aA(this.ac().gw())))
J.as(this.c,k,3,5126,!1,0,0)
i=J.aT(this.c,this.f,"color")
x=this.c
w=e.a.a
J.f5(x,i,(w>>>16&255)/255,(w>>>8&255)/255,(w>>>0&255)/255,(w>>>24&255)/255)
J.aq(this.c,k)
J.bR(this.c,4,6,5123,0)},
aS:function(){}},
ic:{
"^":"dP;c,d,e,f,r,x,y,z,Q,ch,cx,a,b",
bI:function(){var z,y
P.a3("#[A]# "+H.b(J.d0(this.c,35660)))
P.a3("#[B]# "+H.b(J.d0(this.c,33901)))
z=C.a.ay(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.ay(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
this.e=G.cn(this.c,z,y)},
P:function(a){this.f=1
this.Q=-0.5
J.bd(this.c,2960)
J.cY(this.c,515)
J.cU(this.c,0,0,0,1)
J.cV(this.c,1)
J.cW(this.c,0)
J.bd(this.c,3042)
switch(-1){case-1:J.cQ(this.c,32774)
J.cR(this.c,770,771,770,32772)
break}J.cT(this.c,17664)
C.a.sn(this.r,0)
C.a.sn(this.x,0)
C.a.sn(this.y,0)
this.z=null},
bG:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.r
if(z.length!==0){y=this.x
F.k(170,255,170,170)
J.aV(this.c,this.e)
x=J.ar(this.c,this.e,"a_tex")
w=J.bc(this.c)
J.ad(this.c,34962,w)
v=this.y
J.cS(this.c,34962,new Float32Array(H.aA(v)),35044)
J.aq(this.c,x)
J.as(this.c,x,2,5126,!1,0,0)
u=this.z
if(u!=null){t=u.c0(this.c)
J.bP(this.c,3553,t)
J.ae(this.c,3553,10242,33071)
J.ae(this.c,3553,10243,33071)
J.ae(this.c,3553,10241,9728)
J.ae(this.c,3553,10240,9728)}s=G.co(this.c,z)
J.ad(this.c,34962,s)
r=G.cp(this.c,y)
J.ad(this.c,34963,r)
G.dV(this.c,this.e,"u_mat",this.ch)
q=J.ar(this.c,this.e,"color")
p=J.ar(this.c,this.e,"vp")
o=J.ar(this.c,this.e,"useTex")
J.as(this.c,p,3,5126,!1,32,0)
J.as(this.c,q,4,5126,!1,32,12)
J.as(this.c,o,1,5126,!1,32,28)
J.aq(this.c,p)
J.aq(this.c,q)
J.aq(this.c,o)
J.bR(this.c,4,y.length,5123,0)
if(x!==0){J.eL(this.c,x)
J.bP(this.c,3553,null)}J.aV(this.c,null)
C.a.sn(z,0)
C.a.sn(y,0)
C.a.sn(v,0)
this.z=null}},
bE:function(a,b,c){if(c.b===C.f)this.f4(a,b,c)
else this.f5(a,b,c)},
f4:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=b.c/2
y=J.r(b.a,z)
x=b.d/2
w=J.r(b.b,x)
v=this.ac()
u=new E.u(new Float64Array(H.j(3)))
u.B(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=J.a2(w),o=this.r,n=this.y,m=this.x,l=J.a2(y),k=0;k<25;){j=o.length/8|0
u.si(0,y)
u.sj(0,w)
u.sa5(0,this.Q)
u=v.t(0,u)
C.a.H(o,[u.gi(u),u.gj(u),this.Q])
C.a.H(o,[s,r,q,p])
C.a.H(o,[-1])
C.a.H(n,[0,0])
i=6.283185307179586*(k/25)
u.si(0,l.l(y,Math.cos(i)*z))
u.sj(0,t.l(w,Math.sin(i)*x))
u.sa5(0,this.Q)
u=v.t(0,u)
C.a.H(o,[u.gi(u),u.gj(u),this.Q])
C.a.H(o,[s,r,q,p])
C.a.H(o,[-1])
C.a.H(n,[0,0]);++k
i=6.283185307179586*(k/25)
u.si(0,l.l(y,Math.cos(i)*z))
u.sj(0,t.l(w,Math.sin(i)*x))
u.sa5(0,this.Q)
u=v.t(0,u)
C.a.H(o,[u.gi(u),u.gj(u),this.Q])
C.a.H(o,[s,r,q,p])
C.a.H(o,[-1])
C.a.H(n,[0,0])
C.a.H(m,[j,j+1,j+2])
this.Q+=0.0001}},
f5:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b.c
y=z/2
x=J.r(b.a,y)
w=b.d
v=w/2
u=J.r(b.b,v)
t=c.c
s=(z+t)/2
r=(w+t)/2
q=this.ac()
p=new E.u(new Float64Array(H.j(3)))
p.B(0,0,0)
o=new E.u(new Float64Array(H.j(3)))
o.B(0,0,0)
n=new E.u(new Float64Array(H.j(3)))
n.B(0,0,0)
m=new E.u(new Float64Array(H.j(3)))
m.B(0,0,0)
t=c.a.a
l=(t>>>16&255)/255
k=(t>>>8&255)/255
j=(t>>>0&255)/255
i=(t>>>24&255)/255
for(z=J.a2(u),w=J.a2(x),h=0;h<25;){t=6.283185307179586*(h/25)
p.si(0,w.l(x,Math.cos(t)*y))
p.sj(0,z.l(u,Math.sin(t)*v))
p.sa5(0,this.Q)
p=q.t(0,p)
o.si(0,w.l(x,Math.cos(t)*s))
o.sj(0,z.l(u,Math.sin(t)*r))
o.sa5(0,this.Q)
o=q.t(0,o);++h
t=6.283185307179586*(h/25)
n.si(0,w.l(x,Math.cos(t)*s))
n.sj(0,z.l(u,Math.sin(t)*r))
n.sa5(0,this.Q)
n=q.t(0,n)
m.si(0,w.l(x,Math.cos(t)*y))
m.sj(0,z.l(u,Math.sin(t)*v))
m.sa5(0,this.Q)
m=q.t(0,m)
this.at(a,p,o,m,n,l,k,j,i)
this.Q+=0.0001}},
ad:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=b.c
y=b.d
if(c.b===C.f){x=this.ac()
w=b.a
v=b.b
u=J.r(w,z)
t=J.r(b.b,y)
z=new E.u(new Float64Array(H.j(3)))
z.B(w,v,0)
s=x.t(0,z)
z=new E.u(new Float64Array(H.j(3)))
z.B(w,t,0)
r=x.t(0,z)
z=new E.u(new Float64Array(H.j(3)))
z.B(u,v,0)
q=x.t(0,z)
z=new E.u(new Float64Array(H.j(3)))
z.B(u,t,0)
p=x.t(0,z)
z=c.a.a
this.at(a,s,r,q,p,(z>>>16&255)/255,(z>>>8&255)/255,(z>>>0&255)/255,(z>>>24&255)/255)}else{x=this.ac()
w=b.a
v=b.b
u=J.r(w,z)
t=J.r(b.b,y)
z=new E.u(new Float64Array(H.j(3)))
z.B(w,v,0)
s=x.t(0,z)
z=c.c
if(typeof w!=="number")return w.O()
if(typeof v!=="number")return v.O()
y=new E.u(new Float64Array(H.j(3)))
y.B(w-z,v-z,0)
o=x.t(0,y)
y=new E.u(new Float64Array(H.j(3)))
y.B(w,t,0)
r=x.t(0,y)
y=c.c
z=J.a2(t)
n=z.l(t,y)
m=new E.u(new Float64Array(H.j(3)))
m.B(w-y,n,0)
l=x.t(0,m)
m=new E.u(new Float64Array(H.j(3)))
m.B(u,v,0)
q=x.t(0,m)
m=J.a2(u)
n=m.l(u,c.c)
y=c.c
k=new E.u(new Float64Array(H.j(3)))
k.B(n,v-y,0)
j=x.t(0,k)
k=new E.u(new Float64Array(H.j(3)))
k.B(u,t,0)
p=x.t(0,k)
m=m.l(u,c.c)
z=z.l(t,c.c)
k=new E.u(new Float64Array(H.j(3)))
k.B(m,z,0)
i=x.t(0,k)
k=c.a.a
h=(k>>>16&255)/255
g=(k>>>8&255)/255
f=(k>>>0&255)/255
e=(k>>>24&255)/255
this.at(a,o,l,s,r,h,g,f,e)
this.at(a,l,i,r,p,h,g,f,e)
this.at(a,i,j,p,q,h,g,f,e)
this.at(a,j,o,q,s,h,g,f,e)}},
at:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.r
y=z.length/8|0
C.a.H(z,[b.gi(b),b.gj(b),this.Q,f,g,h,i,-1,c.gi(c),c.gj(c),this.Q,f,g,h,i,-1,d.gi(d),d.gj(d),this.Q,f,g,h,i,-1,e.gi(e),e.gj(e),this.Q,f,g,h,i,-1])
C.a.H(this.y,[0,0,0,0,0,0,0,0])
this.Q+=0.0001
z=y+1
x=y+2
C.a.H(this.x,[y,z,x,z,y+3,x])},
aH:function(a,b){},
ax:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.z
if(z!=null&&!J.C(z,b))this.bG(0)
this.z=b
z=c.a
y=b.gL()
if(typeof z!=="number")return z.af()
if(typeof y!=="number")return H.z(y)
x=z/y
y=c.b
z=this.z.gS()
if(typeof y!=="number")return y.af()
if(typeof z!=="number")return H.z(z)
w=y/z
z=J.r(c.a,c.c)
y=this.z.gL()
if(typeof z!=="number")return z.af()
if(typeof y!=="number")return H.z(y)
v=z/y
y=J.r(c.b,c.d)
z=this.z.gS()
if(typeof y!=="number")return y.af()
if(typeof z!=="number")return H.z(z)
u=y/z
C.a.H(this.y,[x,w,x,u,v,w,v,u])
t=this.ac()
s=d.a
r=d.b
q=J.r(s,d.c)
p=J.r(d.b,d.d)
z=new E.u(new Float64Array(H.j(3)))
z.B(s,r,0)
o=t.t(0,z)
z=new E.u(new Float64Array(H.j(3)))
z.B(s,p,0)
n=t.t(0,z)
z=new E.u(new Float64Array(H.j(3)))
z.B(q,r,0)
m=t.t(0,z)
z=new E.u(new Float64Array(H.j(3)))
z.B(q,p,0)
l=t.t(0,z)
z=this.r
k=z.length/8|0
y=e.a.a
j=(y>>>16&255)/255
i=(y>>>8&255)/255
h=(y>>>0&255)/255
g=(y>>>24&255)/255
C.a.H(z,[o.gi(o),o.gj(o),this.Q,j,i,h,g,1,n.gi(n),n.gj(n),this.Q,j,i,h,g,1,m.gi(m),m.gj(m),this.Q,j,i,h,g,1,l.gi(l),l.gj(l),this.Q,j,i,h,g,1])
this.Q+=0.0001
z=k+1
y=k+2
C.a.H(this.x,[k,z,y,z,k+3,y])},
aS:function(){},
ac:function(){var z,y
this.cx.v()
z=this.cx.J(0,-1,1,0)
this.cx=z
y=this.d
y=z.ba(0,2/y.c,-2/y.d,1)
this.cx=y
y=y.t(0,C.a.gan(this.a))
this.cx=y
return y}},
i4:{
"^":"i3;q:b>,p:c>,a",
b2:function(a){var z=0,y=new P.a5(),x,w=2,v,u,t
function $async$b2(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.p(t.cm(a),$async$b2,y)
case 3:x=new u.ig(c,null)
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$b2,y,null)},
b3:function(a){var z=0,y=new P.a5(),x,w=2,v,u,t,s,r,q,p,o,n,m
function $async$b3(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=H
p=p
o=P
o=o
n=$
u=r.f(new q.cv(p.f(new o.D(0,n.n,null),[null])),[null])
t=new XMLHttpRequest()
r=C
r=r.A
r.fu(t,"GET",a)
r=t
r.responseType="arraybuffer"
r=H
r=r
q=W
s=r.f(new q.cx(t,"load",!1),[null])
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
n=n.I(new m.i5(u,t))
m=s
q=new q.H(0,p,o,n,m.c)
p=H
r=r.f(q,[p.B(s,0)])
r.G()
r=H
r=r
q=W
s=r.f(new q.cx(t,"error",!1),[null])
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
n=n.I(new m.i6(u))
m=s
q=new q.H(0,p,o,n,m.c)
p=H
r=r.f(q,[p.B(s,0)])
r.G()
r=t
r.send()
r=u
x=r.a
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$b3,y,null)}},
i5:{
"^":"d:25;a,b",
$1:function(a){var z=0,y=new P.a5(),x=1,w,v=this,u,t,s,r
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=J
t=t
s=W
s=s
r=v
r=r.b
u=t.eG(s.jy(r.response))
t=v
t=t.a
t=t
s=P
s=new s.iw(!0)
t.b1(0,s.eQ(u))
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$$1,y,null)}},
i6:{
"^":"d:26;a",
$1:function(a){this.a.cG(a)}},
ij:{
"^":"hi;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gi:function(a){return 0},
gj:function(a){return 0},
gL:function(){return this.a.c},
gS:function(){return this.a.d},
gfv:function(a){return 0},
fo:function(){this.r=!0},
aU:function(){var z=0,y=new P.a5(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h
function $async$aU(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:j=H
j=j
i=P
u=j.dD(new i.bU(Date.now(),!1))
j=v
t=j.x
j=v
s=j.a
z=!t?2:4
break
case 2:j=E
j=j
i=Float64Array
h=H
t=new j.t(new i(h.j(16)))
j=t
j.v()
j=E
j=j
i=Float64Array
h=H
r=new j.t(new i(h.j(16)))
j=r
j.v()
j=G
q=new j.ib(null,null,null,null,1,t,[r],[])
j=q
i=s
j.c=i.a
j=q
j.d=s
j=q
j.bI()
j=q
j.P(0)
z=3
break
case 4:j=E
j=j
i=Float64Array
h=H
t=new j.t(new i(h.j(16)))
j=t
j.v()
j=E
j=j
i=Float64Array
h=H
r=new j.t(new i(h.j(16)))
j=r
j.v()
j=E
j=j
i=Float64Array
h=H
p=new j.t(new i(h.j(16)))
j=p
j.v()
j=G
q=new j.ic(null,null,null,1,[],[],[],null,0,t,r,[p],[])
j=q
i=s
j.c=i.a
j=q
j.d=s
j=q
j.bI()
j=q
j.P(0)
case 3:o=0,n=0
case 5:j=v
if(!j.d){z=7
break}j=P
j=j
i=P
z=8
return H.p(j.fC(new i.ag(15e3),null,null),$async$aU,y)
case 8:m=Date.now()
j=v
j.b=m
l=m-u
j=v
j=j
i=C
i=i.c
j.fm(i.aB(u+l))
o+=l
if(l<0);else ;++n
j=v
j.r=!0
z=o>40?9:10
break
case 9:j=q
j.P(0)
j=v
j=j.gU()
j.bP(v,q)
j=q
j.bG(0)
j=v
j.r=!1
case 10:z=n>40?11:12
break
case 11:j=C
j=j.c
k="###fps  "+j.c3(o,n)
j=H
j.cN(k)
o=0
n=0
case 12:case 6:u=m
z=5
break
case 7:return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$aU,y,null)},
fI:function(){var z,y,x,w
z=P.b1()
y=new G.it(this,z)
x=new G.is(this,z)
w=this.a.b
w.toString
w=H.f(new W.y(w,"touchcancel",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(x),w.c),[H.B(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.y(w,"touchend",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(x),w.c),[H.B(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.y(w,"touchenter",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(y),w.c),[H.B(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.y(w,"touchleave",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(y),w.c),[H.B(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.y(w,"touchmove",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(y),w.c),[H.B(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.y(w,"touchstart",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(y),w.c),[H.B(w,0)]).G()},
fq:function(){var z,y
z={}
z.a=!1
y=J.eP(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ik(z,this)),y.c),[H.B(y,0)]).G()
y=J.eV(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.il(z,this)),y.c),[H.B(y,0)]).G()
y=J.eQ(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.im(z,this)),y.c),[H.B(y,0)]).G()
y=J.eR(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.io(z,this)),y.c),[H.B(y,0)]).G()
y=J.eS(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ip(z,this)),y.c),[H.B(y,0)]).G()
y=J.eT(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.iq(z,this)),y.c),[H.B(y,0)]).G()
y=J.eU(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ir(z,this)),y.c),[H.B(y,0)]).G()}},
hi:{
"^":"a+ia;"},
it:{
"^":"d:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.d_(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.M)(y),++v){u=y[v]
t=C.b.K(u.pageX)
s=C.b.K(u.pageY)
new P.U(t,s).$builtinTypeInfo=[null]
r=t-C.b.K(z.a.b.offsetLeft)
t=C.b.K(u.pageX)
s=C.b.K(u.pageY)
new P.U(t,s).$builtinTypeInfo=[null]
q=s-C.b.K(z.a.b.offsetTop)
if(w.a9(u.identifier)){t=z.gU()
s=u.identifier
if(typeof s!=="number")return s.l()
z.a2(t.c)
t.a7(z,s+1,"pointermove",r,q)
z.a1()}else{w.m(0,u.identifier,u)
t=z.gU()
s=u.identifier
if(typeof s!=="number")return s.l()
z.a2(t.c)
t.a7(z,s+1,"pointerdown",r,q)
z.a1()}}}},
is:{
"^":"d:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
z.c=z.b
for(y=J.d_(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.M)(y),++v){u=y[v]
if(w.a9(u.identifier)){t=C.b.K(u.pageX)
s=C.b.K(u.pageY)
new P.U(t,s).$builtinTypeInfo=[null]
s=C.b.K(z.a.b.offsetLeft)
r=C.b.K(u.pageX)
q=C.b.K(u.pageY)
new P.U(r,q).$builtinTypeInfo=[null]
r=C.b.K(z.a.b.offsetTop)
w.a3(0,u.identifier)
p=z.gU()
o=u.identifier
if(typeof o!=="number")return o.l()
z.a2(p.c)
p.a7(z,o+1,"pointerup",t-s,q-r)
z.a1()}}}},
ik:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=z.gU()
x=J.i(a)
w=x.gT(a)
w=w.gi(w)
w.toString
x=x.gT(a)
x=x.gj(x)
x.toString
z.a2(y.c)
y.a7(z,0,"pointerdown",w,x)
z.a1()}}},
il:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gU()
w=J.i(a)
v=w.gT(a)
v=v.gi(v)
v.toString
w=w.gT(a)
w=w.gj(w)
w.toString
z.a2(x.c)
x.a7(z,0,"pointerup",v,w)
z.a1()
y.a=!1}}}},
im:{
"^":"d:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
io:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gU()
w=J.i(a)
v=w.gT(a)
v=v.gi(v)
v.toString
w=w.gT(a)
w=w.gj(w)
w.toString
z.a2(x.c)
x.a7(z,0,"pointercancel",v,w)
z.a1()
y.a=!1}}}},
ip:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b)if(this.a.a){y=z.gU()
x=J.i(a)
w=x.gT(a)
w=w.gi(w)
w.toString
x=x.gT(a)
x=x.gj(x)
x.toString
z.a2(y.c)
y.a7(z,0,"pointermove",w,x)
z.a1()}}},
iq:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gU()
w=J.i(a)
v=w.gT(a)
v=v.gi(v)
v.toString
w=w.gT(a)
w=w.gj(w)
w.toString
z.a2(x.c)
x.a7(z,0,"pointercancel",v,w)
z.a1()
y.a=!1}}}},
ir:{
"^":"d:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
ih:{
"^":"d:1;a,b",
$1:function(a){this.a.b1(0,this.b)}},
ii:{
"^":"d:1;a,b",
$1:function(a){this.b.cG("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
t:{
"^":"a;w:a<",
aE:function(a){var z,y
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
gf1:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.c(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=16)return H.c(z,b)
z[b]=c},
aT:function(a){var z,y,x
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
return new E.am(z)},
bB:function(a){var z=new E.t(new Float64Array(H.j(16)))
z.aE(this)
return z},
t:function(a,b){var z,y,x
if(!!b.$isam){z=new Float64Array(H.j(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.am(z)}if(!!b.$isu){z=new Float64Array(H.j(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.u(z)}if(4===b.gf1()){z=new Float64Array(H.j(16))
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
return new E.t(z)}throw H.e(P.aW(b))},
l:function(a,b){var z,y
z=new Float64Array(H.j(16))
y=this.a
z[0]=C.b.l(y[0],b.gw().h(0,0))
z[1]=C.b.l(y[1],b.gw().h(0,1))
z[2]=C.b.l(y[2],b.gw().h(0,2))
z[3]=C.b.l(y[3],b.gw().h(0,3))
z[4]=C.b.l(y[4],b.gw().h(0,4))
z[5]=C.b.l(y[5],b.gw().h(0,5))
z[6]=C.b.l(y[6],b.gw().h(0,6))
z[7]=C.b.l(y[7],b.gw().h(0,7))
z[8]=C.b.l(y[8],b.gw().h(0,8))
z[9]=C.b.l(y[9],b.gw().h(0,9))
z[10]=C.b.l(y[10],b.gw().h(0,10))
z[11]=C.b.l(y[11],b.gw().h(0,11))
z[12]=C.b.l(y[12],b.gw().h(0,12))
z[13]=C.b.l(y[13],b.gw().h(0,13))
z[14]=C.b.l(y[14],b.gw().h(0,14))
z[15]=C.b.l(y[15],b.gw().h(0,15))
return new E.t(z)},
J:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.o(b)
y=!!z.$isam
x=y?b.gL():1
if(!!z.$isu||y){w=z.gi(b)
v=z.gj(b)
u=z.ga5(b)}else{u=d
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
ba:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
y=!!z.$isam
x=y?b.gL():1
if(!!z.$isu||y){w=z.gi(b)
v=z.gj(b)
u=z.ga5(b)}else{u=d
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
fj:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
u:{
"^":"a;w:a<",
B:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aE:function(a){var z,y
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
y=C.b.l(z[0],b.gw().h(0,0))
x=C.b.l(z[1],b.gw().h(0,1))
z=C.b.l(z[2],b.gw().h(0,2))
w=new E.u(new Float64Array(H.j(3)))
w.B(y,x,z)
return w},
t:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.z(b)
x=z[1]
z=z[2]
w=new E.u(new Float64Array(H.j(3)))
w.B(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.c(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=3)return H.c(z,b)
z[b]=c},
gn:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.a1(y*y+x*x+z*z))},
bB:function(a){var z=new E.u(new Float64Array(H.j(3)))
z.aE(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
sa5:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]}},
am:{
"^":"a;w:a<",
c2:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aE:function(a){var z,y
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
y=C.b.l(z[0],b.gw().h(0,0))
x=C.b.l(z[1],b.gw().h(0,1))
w=C.b.l(z[2],b.gw().h(0,2))
z=C.b.l(z[3],b.gw().h(0,3))
v=new E.am(new Float64Array(H.j(4)))
v.c2(y,x,w,z)
return v},
t:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.z(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.am(new Float64Array(H.j(4)))
v.c2(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.c(z,b)
return z[b]},
m:function(a,b,c){var z=this.a
if(b>=4)return H.c(z,b)
z[b]=c},
gn:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.a1(y*y+x*x+w*w+z*z))},
bB:function(a){var z=new E.am(new Float64Array(H.j(4)))
z.aE(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
sa5:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]},
gL:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dm.prototype
return J.fZ.prototype}if(typeof a=="string")return J.bk.prototype
if(a==null)return J.h_.prototype
if(typeof a=="boolean")return J.fY.prototype
if(a.constructor==Array)return J.aZ.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bH(a)}
J.E=function(a){if(typeof a=="string")return J.bk.prototype
if(a==null)return a
if(a.constructor==Array)return J.aZ.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bH(a)}
J.aR=function(a){if(a==null)return a
if(a.constructor==Array)return J.aZ.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bH(a)}
J.aF=function(a){if(typeof a=="number")return J.b_.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.ct.prototype
return a}
J.a2=function(a){if(typeof a=="number")return J.b_.prototype
if(typeof a=="string")return J.bk.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.ct.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bH(a)}
J.r=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.a2(a).l(a,b)}
J.C=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).u(a,b)}
J.T=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aF(a).aq(a,b)}
J.bb=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aF(a).ag(a,b)}
J.eD=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.a2(a).t(a,b)}
J.bO=function(a,b){if(a.constructor==Array||typeof a=="string"||H.k7(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.E(a).h(a,b)}
J.eE=function(a,b,c,d){return J.i(a).e0(a,b,c,d)}
J.eF=function(a,b,c,d){return J.i(a).eo(a,b,c,d)}
J.eG=function(a){return J.i(a).ev(a)}
J.ad=function(a,b,c){return J.i(a).ex(a,b,c)}
J.bP=function(a,b,c){return J.i(a).ey(a,b,c)}
J.cQ=function(a,b){return J.i(a).eA(a,b)}
J.cR=function(a,b,c,d,e){return J.i(a).eB(a,b,c,d,e)}
J.cS=function(a,b,c,d){return J.i(a).eC(a,b,c,d)}
J.cT=function(a,b){return J.aR(a).eF(a,b)}
J.cU=function(a,b,c,d,e){return J.i(a).eG(a,b,c,d,e)}
J.cV=function(a,b){return J.i(a).eH(a,b)}
J.cW=function(a,b){return J.i(a).eK(a,b)}
J.cX=function(a,b,c,d,e){return J.i(a).eM(a,b,c,d,e)}
J.eH=function(a,b){return J.a2(a).aw(a,b)}
J.eI=function(a,b){return J.i(a).b1(a,b)}
J.bQ=function(a,b,c){return J.E(a).eO(a,b,c)}
J.bc=function(a){return J.i(a).eR(a)}
J.eJ=function(a){return J.i(a).eS(a)}
J.eK=function(a,b){return J.i(a).eT(a,b)}
J.cY=function(a,b){return J.i(a).eV(a,b)}
J.cZ=function(a,b){return J.i(a).eW(a,b)}
J.eL=function(a,b){return J.i(a).f2(a,b)}
J.bR=function(a,b,c,d,e){return J.i(a).f3(a,b,c,d,e)}
J.eM=function(a,b){return J.aR(a).ae(a,b)}
J.bd=function(a,b){return J.i(a).f6(a,b)}
J.aq=function(a,b){return J.i(a).f7(a,b)}
J.eN=function(a,b){return J.aR(a).M(a,b)}
J.d_=function(a){return J.i(a).geE(a)}
J.aa=function(a){return J.i(a).gaJ(a)}
J.G=function(a){return J.o(a).gD(a)}
J.eO=function(a){return J.i(a).gp(a)}
J.be=function(a){return J.aR(a).gN(a)}
J.aS=function(a){return J.E(a).gn(a)}
J.eP=function(a){return J.i(a).gcU(a)}
J.eQ=function(a){return J.i(a).gcV(a)}
J.eR=function(a){return J.i(a).gcW(a)}
J.eS=function(a){return J.i(a).gcX(a)}
J.eT=function(a){return J.i(a).gcY(a)}
J.eU=function(a){return J.i(a).gcZ(a)}
J.eV=function(a){return J.i(a).gd_(a)}
J.eW=function(a){return J.i(a).gbX(a)}
J.eX=function(a){return J.i(a).gq(a)}
J.eY=function(a){return J.i(a).gi(a)}
J.ar=function(a,b,c){return J.i(a).dj(a,b,c)}
J.eZ=function(a){return J.i(a).dk(a)}
J.f_=function(a,b){return J.i(a).dl(a,b)}
J.d0=function(a,b){return J.i(a).dq(a,b)}
J.aT=function(a,b,c){return J.i(a).dr(a,b,c)}
J.f0=function(a,b){return J.i(a).cQ(a,b)}
J.f1=function(a,b){return J.aR(a).az(a,b)}
J.aG=function(a,b){return J.i(a).bc(a,b)}
J.f2=function(a,b){return J.i(a).sp(a,b)}
J.f3=function(a,b){return J.i(a).saa(a,b)}
J.f4=function(a,b){return J.i(a).sq(a,b)}
J.d1=function(a,b,c,d){return J.i(a).dF(a,b,c,d)}
J.d2=function(a,b,c,d){return J.i(a).dG(a,b,c,d)}
J.ae=function(a,b,c,d){return J.i(a).fG(a,b,c,d)}
J.P=function(a){return J.aF(a).fH(a)}
J.d3=function(a){return J.aF(a).aB(a)}
J.aU=function(a){return J.o(a).k(a)}
J.f5=function(a,b,c,d,e,f){return J.i(a).fJ(a,b,c,d,e,f)}
J.f6=function(a,b,c,d){return J.i(a).fK(a,b,c,d)}
J.aV=function(a,b){return J.i(a).fL(a,b)}
J.as=function(a,b,c,d,e,f,g){return J.i(a).fM(a,b,c,d,e,f,g)}
I.cL=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.A=W.fG.prototype
C.a=J.aZ.prototype
C.c=J.dm.prototype
C.b=J.b_.prototype
C.o=J.bk.prototype
C.K=J.hk.prototype
C.L=P.hA.prototype
C.M=J.ct.prototype
C.w=new H.de()
C.x=new P.hj()
C.y=new P.iJ()
C.z=new P.j2()
C.d=new P.jh()
C.r=new P.ag(0)
C.B=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.C=function(hooks) {
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

C.D=function(getTagFallback) {
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
C.E=function() {
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
C.F=function(hooks) {
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
C.G=function(hooks) {
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
C.H=function(_, letter) { return letter.toUpperCase(); }
C.v=H.f(I.cL([127,2047,65535,1114111]),[P.l])
C.I=new H.di([0,"MinoTyoe.empty",1,"MinoTyoe.frame",2,"MinoTyoe.out",3,"MinoTyoe.l",4,"MinoTyoe.o",5,"MinoTyoe.s",6,"MinoTyoe.z",7,"MinoTyoe.j",8,"MinoTyoe.t",9,"MinoTyoe.L"])
C.J=new H.di([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.a6(0)
C.q=new F.a6(1)
C.p=new F.a6(2)
C.h=new F.a6(3)
C.i=new F.a6(4)
C.j=new F.a6(5)
C.k=new F.a6(6)
C.l=new F.a6(7)
C.m=new F.a6(8)
C.n=new F.a6(9)
C.f=new F.i9(0)
$.dE="$cachedFunction"
$.dF="$cachedInvocation"
$.a4=0
$.aH=null
$.d4=null
$.cH=null
$.eo=null
$.ez=null
$.bG=null
$.bJ=null
$.cI=null
$.aB=null
$.aN=null
$.aO=null
$.cC=!1
$.n=C.d
$.dg=0
$.db=null
$.da=null
$.d9=null
$.d8=null
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
I.$lazy(y,x,w)}})(["dk","$get$dk",function(){return H.fT()},"dl","$get$dl",function(){return new P.fy(null)},"dW","$get$dW",function(){return H.a9(H.bA({toString:function(){return"$receiver$"}}))},"dX","$get$dX",function(){return H.a9(H.bA({$method$:null,toString:function(){return"$receiver$"}}))},"dY","$get$dY",function(){return H.a9(H.bA(null))},"dZ","$get$dZ",function(){return H.a9(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e2","$get$e2",function(){return H.a9(H.bA(void 0))},"e3","$get$e3",function(){return H.a9(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"e0","$get$e0",function(){return H.a9(H.e1(null))},"e_","$get$e_",function(){return H.a9(function(){try{null.$method$}catch(z){return z.message}}())},"e5","$get$e5",function(){return H.a9(H.e1(void 0))},"e4","$get$e4",function(){return H.a9(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cw","$get$cw",function(){return P.ix()},"aP","$get$aP",function(){return[]},"ds","$get$ds",function(){return[500,250,200,150,110]},"br","$get$br",function(){return[150,150,125,100,85]},"c4","$get$c4",function(){return[150,125,100,95,85]},"du","$get$du",function(){return C.z},"c9","$get$c9",function(){return F.k(170,136,136,136)},"ca","$get$ca",function(){return F.k(170,85,51,51)},"cc","$get$cc",function(){return F.k(170,255,255,255)},"bt","$get$bt",function(){return F.k(170,0,0,0)},"cd","$get$cd",function(){return F.k(170,255,170,170)},"cf","$get$cf",function(){return F.k(170,170,255,170)},"cb","$get$cb",function(){return F.k(170,170,170,255)},"bs","$get$bs",function(){return F.k(170,255,255,170)},"ce","$get$ce",function(){return F.k(170,170,255,255)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,void:true},{func:1,args:[P.a7]},{func:1,args:[W.c5]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.ak]},{func:1,args:[,],opt:[,]},{func:1,ret:P.a7,args:[P.l]},{func:1,args:[W.cr]},{func:1,args:[,P.a7]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.ak]},{func:1,ret:P.cE},{func:1,void:true,args:[P.a],opt:[P.ak]},{func:1,void:true,args:[,P.ak]},{func:1,args:[,,]},{func:1,ret:P.l,args:[,P.l]},{func:1,void:true,args:[P.l,P.l]},{func:1,args:[P.dM,,]},{func:1,args:[F.cl]},{func:1,args:[P.a7,,]},{func:1,ret:P.l,args:[,]},{func:1,args:[P.l]},{func:1,args:[P.l,,]},{func:1,ret:P.a_,args:[W.b3]},{func:1,args:[W.b3]},{func:1,ret:P.l,args:[P.O,P.O]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.kf(d||a)
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
Isolate.cL=a.cL
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eB(F.ex(),b)},[])
else (function(b){H.eB(F.ex(),b)})([])})})()