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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cM"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cM"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cM(this,c,d,true,[],f).prototype
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
q:function(a){return void 0},
bU:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bk:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cP==null){H.lp()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(new P.cA("Return interceptor for "+H.d(y(a,z))))}w=H.lz(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.W
else return C.Z}return w},
i:{
"^":"a;",
v:function(a,b){return a===b},
gI:function(a){return H.ap(a)},
k:["em",function(a){return H.bE(a)}],
"%":"CanvasRenderingContext2D|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
hP:{
"^":"i;",
k:function(a){return String(a)},
gI:function(a){return a?519018:218159},
$iscK:1},
hQ:{
"^":"i;",
v:function(a,b){return null==b},
k:function(a){return"null"},
gI:function(a){return 0}},
dz:{
"^":"i;",
gI:function(a){return 0},
$ishR:1},
ig:{
"^":"dz;"},
bJ:{
"^":"dz;",
k:function(a){return String(a)}},
b4:{
"^":"i;",
c2:function(a,b){if(!!a.immutable$list)throw H.b(new P.Q(b))},
bk:function(a,b){if(!!a.fixed$length)throw H.b(new P.Q(b))},
dF:function(a,b){this.bk(a,"removeAt")
if(b>=a.length)throw H.b(P.bc(b,null,null))
return a.splice(b,1)[0]},
ae:function(a,b){var z
this.bk(a,"remove")
for(z=0;z<a.length;++z)if(J.K(a[z],b)){a.splice(z,1)
return!0}return!1},
J:function(a,b){var z,y
this.bk(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.L)(b),++y)a.push(b[y])},
P:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.b(new P.W(a))}},
aN:function(a,b){return H.e(new H.cb(a,b),[null,null])},
dn:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.d(a[x])
if(x>=z)return H.c(y,x)
y[x]=w}return y.join(b)},
a3:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
ek:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.J(b))
if(b<0||b>a.length)throw H.b(P.U(b,0,a.length,null,null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.b(H.J(c))
if(c<b||c>a.length)throw H.b(P.U(c,b,a.length,null,null))}if(b===c)return H.e([],[H.A(a,0)])
return H.e(a.slice(b,c),[H.A(a,0)])},
gH:function(a){if(a.length>0)return a[0]
throw H.b(H.c7())},
gaM:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(H.c7())},
cB:function(a,b,c,d,e){var z,y,x
this.c2(a,"set range")
P.aS(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.M(P.U(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.b(H.hM())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}},
eh:function(a,b){var z
this.c2(a,"sort")
z=P.li()
H.be(a,0,a.length-1,z)},
cC:function(a){return this.eh(a,null)},
k:function(a){return P.bw(a,"[","]")},
gK:function(a){return new J.d7(a,a.length,0,null)},
gI:function(a){return H.ap(a)},
gl:function(a){return a.length},
sl:function(a,b){this.bk(a,"set length")
if(b<0)throw H.b(P.U(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.N(a,b))
if(b>=a.length||b<0)throw H.b(H.N(a,b))
return a[b]},
p:function(a,b,c){this.c2(a,"indexed set")
if(b>=a.length||b<0)throw H.b(H.N(a,b))
a[b]=c},
$isb5:1,
$isl:1,
$asl:null,
$isv:1,
static:{hO:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.b(P.az("Length must be a non-negative integer: "+H.d(a)))
z=H.e(new Array(a),[b])
z.fixed$length=Array
return z}}},
mn:{
"^":"b4;"},
d7:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
A:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.b(new P.W(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aN:{
"^":"i;",
aK:function(a,b){var z
if(typeof b!=="number")throw H.b(H.J(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gcb(b)
if(this.gcb(a)===z)return 0
if(this.gcb(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.ghm(b))return 0
return 1}else return-1},
gcb:function(a){return a===0?1/a<0:a<0},
ghm:function(a){return isNaN(a)},
ghl:function(a){return isFinite(a)},
cm:function(a,b){return a%b},
aP:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.b(new P.Q(""+a))},
N:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.b(new P.Q(""+a))},
hN:function(a){return a},
b9:function(a,b){var z,y,x,w
H.cL(b)
if(b<2||b>36)throw H.b(P.U(b,2,36,"radix",null))
z=a.toString(b)
if(C.h.aq(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.M(new P.Q("Unexpected toString result: "+z))
x=J.D(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.h.m("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gI:function(a){return a&0x1FFFFFFF},
cz:function(a){return-a},
n:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a+b},
E:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a-b},
m:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a*b},
bB:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
bd:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aP(a/b)},
aw:function(a,b){return(a|0)===a?a/b|0:this.aP(a/b)},
aX:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
a7:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a<b},
am:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a>b},
bA:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a<=b},
bx:function(a,b){if(typeof b!=="number")throw H.b(H.J(b))
return a>=b},
$isaw:1},
dy:{
"^":"aN;",
$isb0:1,
$isaw:1,
$iso:1},
dx:{
"^":"aN;",
$isb0:1,
$isaw:1},
b6:{
"^":"i;",
aq:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.N(a,b))
if(b<0)throw H.b(H.N(a,b))
if(b>=a.length)throw H.b(H.N(a,b))
return a.charCodeAt(b)},
n:function(a,b){if(typeof b!=="string")throw H.b(P.fE(b,null,null))
return a+b},
bG:function(a,b,c){H.cL(b)
if(c==null)c=a.length
H.cL(c)
if(b<0)throw H.b(P.bc(b,null,null))
if(typeof c!=="number")return H.w(c)
if(b>c)throw H.b(P.bc(b,null,null))
if(c>a.length)throw H.b(P.bc(c,null,null))
return a.substring(b,c)},
el:function(a,b){return this.bG(a,b,null)},
m:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.b(C.C)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fH:function(a,b,c){if(c>a.length)throw H.b(P.U(c,0,a.length,null,null))
return H.lF(a,b,c)},
gW:function(a){return a.length===0},
aK:function(a,b){var z
if(typeof b!=="string")throw H.b(H.J(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gI:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gl:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.N(a,b))
if(b>=a.length||b<0)throw H.b(H.N(a,b))
return a[b]},
$isb5:1,
$isab:1}}],["","",,H,{
"^":"",
bh:function(a,b){var z=a.b_(b)
if(!init.globalState.d.cy)init.globalState.f.b7()
return z},
bS:function(){--init.globalState.f.b},
eT:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.q(y).$isl)throw H.b(P.az("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.ky(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$dv()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.k3(P.ca(null,H.bg),0)
y.z=P.by(null,null,null,P.o,H.cF)
y.ch=P.by(null,null,null,P.o,null)
if(y.x===!0){x=new H.kx()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hF,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.kz)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.by(null,null,null,P.o,H.bG)
w=P.aO(null,null,null,P.o)
v=new H.bG(0,null,!1)
u=new H.cF(y,x,w,init.createNewIsolate(),v,new H.aA(H.bW()),new H.aA(H.bW()),!1,!1,[],P.aO(null,null,null,null),null,null,!1,!0,P.aO(null,null,null,null))
w.aJ(0,0)
u.cE(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bj()
x=H.aJ(y,[y]).av(a)
if(x)u.b_(new H.lD(z,a))
else{y=H.aJ(y,[y,y]).av(a)
if(y)u.b_(new H.lE(z,a))
else u.b_(a)}init.globalState.f.b7()},
hJ:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.hK()
return},
hK:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.b(new P.Q("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.b(new P.Q("Cannot extract URI from \""+H.d(z)+"\""))},
hF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bK(!0,[]).ax(b.data)
y=J.D(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bK(!0,[]).ax(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bK(!0,[]).ax(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.by(null,null,null,P.o,H.bG)
p=P.aO(null,null,null,P.o)
o=new H.bG(0,null,!1)
n=new H.cF(y,q,p,init.createNewIsolate(),o,new H.aA(H.bW()),new H.aA(H.bW()),!1,!1,[],P.aO(null,null,null,null),null,null,!1,!0,P.aO(null,null,null,null))
p.aJ(0,0)
n.cE(0,o)
init.globalState.f.a.ao(new H.bg(n,new H.hG(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b7()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aL(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.b7()
break
case"close":init.globalState.ch.ae(0,$.$get$dw().h(0,a))
a.terminate()
init.globalState.f.b7()
break
case"log":H.hE(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.af(["command","print","msg",z])
q=new H.aF(!0,P.aC(null,P.o)).a8(q)
y.toString
self.postMessage(q)}else P.S(y.h(z,"msg"))
break
case"error":throw H.b(y.h(z,"msg"))}},
hE:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.af(["command","log","msg",a])
x=new H.aF(!0,P.aC(null,P.o)).a8(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.F(w)
z=H.R(w)
throw H.b(P.bu(z))}},
hH:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dY=$.dY+("_"+y)
$.dZ=$.dZ+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aL(f,["spawned",new H.bM(y,x),w,z.r])
x=new H.hI(a,b,c,d,z)
if(e===!0){z.da(w,w)
init.globalState.f.a.ao(new H.bg(z,x,"start isolate"))}else x.$0()},
kW:function(a){return new H.bK(!0,[]).ax(new H.aF(!1,P.aC(null,P.o)).a8(a))},
lD:{
"^":"f:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
lE:{
"^":"f:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ky:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{kz:function(a){var z=P.af(["command","print","msg",a])
return new H.aF(!0,P.aC(null,P.o)).a8(z)}}},
cF:{
"^":"a;a,b,c,hn:d<,fI:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
da:function(a,b){if(!this.f.v(0,a))return
if(this.Q.aJ(0,b)&&!this.y)this.y=!0
this.bZ()},
hD:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ae(0,a)
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
if(w===y.c)y.cO();++y.d}this.y=!1}this.bZ()},
fk:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.c(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
hC:function(a){var z,y,x
if(this.ch==null)return
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.M(new P.Q("removeRange"))
P.aS(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
ed:function(a,b){if(!this.r.v(0,a))return
this.db=b},
hc:function(a,b,c){var z=J.q(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){J.aL(a,c)
return}z=this.cx
if(z==null){z=P.ca(null,null)
this.cx=z}z.ao(new H.kk(a,c))},
ha:function(a,b){var z
if(!this.r.v(0,a))return
z=J.q(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){this.cc()
return}z=this.cx
if(z==null){z=P.ca(null,null)
this.cx=z}z.ao(this.ghp())},
hd:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.S(a)
if(b!=null)P.S(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.b1(a)
y[1]=b==null?null:J.b1(b)
for(x=new P.dA(z,z.r,null,null),x.c=z.e;x.A();)J.aL(x.d,y)},
b_:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.F(u)
w=t
v=H.R(u)
this.hd(w,v)
if(this.db===!0){this.cc()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghn()
if(this.cx!=null)for(;t=this.cx,!t.gW(t);)this.cx.dH().$0()}return y},
dr:function(a){return this.b.h(0,a)},
cE:function(a,b){var z=this.b
if(z.a2(a))throw H.b(P.bu("Registry: ports must be registered only once."))
z.p(0,a,b)},
bZ:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.cc()},
cc:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a_(0)
for(z=this.b,y=z.gdU(z),y=y.gK(y);y.A();)y.gG().eO()
z.a_(0)
this.c.a_(0)
init.globalState.z.ae(0,this.a)
this.dx.a_(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.c(z,v)
J.aL(w,z[v])}this.ch=null}},"$0","ghp",0,0,2]},
kk:{
"^":"f:2;a,b",
$0:function(){J.aL(this.a,this.b)}},
k3:{
"^":"a;a,b",
fT:function(){var z=this.a
if(z.b===z.c)return
return z.dH()},
dO:function(){var z,y,x
z=this.fT()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a2(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gW(y)}else y=!1
else y=!1
else y=!1
if(y)H.M(P.bu("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gW(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.af(["command","close"])
x=new H.aF(!0,P.aC(null,P.o)).a8(x)
y.toString
self.postMessage(x)}return!1}z.hB()
return!0},
d_:function(){if(self.window!=null)new H.k4(this).$0()
else for(;this.dO(););},
b7:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.d_()
else try{this.d_()}catch(x){w=H.F(x)
z=w
y=H.R(x)
w=init.globalState.Q
v=P.af(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.aF(!0,P.aC(null,P.o)).a8(v)
w.toString
self.postMessage(v)}}},
k4:{
"^":"f:2;a",
$0:function(){if(!this.a.dO())return
P.cu(C.u,this)}},
bg:{
"^":"a;a,b,c",
hB:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.b_(this.b)}},
kx:{
"^":"a;"},
hG:{
"^":"f:1;a,b,c,d,e,f",
$0:function(){H.hH(this.a,this.b,this.c,this.d,this.e,this.f)}},
hI:{
"^":"f:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bj()
w=H.aJ(x,[x,x]).av(y)
if(w)y.$2(this.b,this.c)
else{x=H.aJ(x,[x]).av(y)
if(x)y.$1(this.b)
else y.$0()}}z.bZ()}},
eq:{
"^":"a;"},
bM:{
"^":"eq;b,a",
bD:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcR())return
x=H.kW(b)
if(z.gfI()===y){y=J.D(x)
switch(y.h(x,0)){case"pause":z.da(y.h(x,1),y.h(x,2))
break
case"resume":z.hD(y.h(x,1))
break
case"add-ondone":z.fk(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.hC(y.h(x,1))
break
case"set-errors-fatal":z.ed(y.h(x,1),y.h(x,2))
break
case"ping":z.hc(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ha(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.aJ(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ae(0,y)
break}return}y=init.globalState.f
w="receive "+H.d(b)
y.a.ao(new H.bg(z,new H.kB(this,x),w))},
v:function(a,b){if(b==null)return!1
return b instanceof H.bM&&J.K(this.b,b.b)},
gI:function(a){return this.b.gbU()}},
kB:{
"^":"f:1;a,b",
$0:function(){var z=this.a.b
if(!z.gcR())z.eI(this.b)}},
cG:{
"^":"eq;b,c,a",
bD:function(a,b){var z,y,x
z=P.af(["command","message","port",this,"msg",b])
y=new H.aF(!0,P.aC(null,P.o)).a8(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
v:function(a,b){if(b==null)return!1
return b instanceof H.cG&&J.K(this.b,b.b)&&J.K(this.a,b.a)&&J.K(this.c,b.c)},
gI:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.ef()
y=this.a
if(typeof y!=="number")return y.ef()
x=this.c
if(typeof x!=="number")return H.w(x)
return(z<<16^y<<8^x)>>>0}},
bG:{
"^":"a;bU:a<,b,cR:c<",
eO:function(){this.c=!0
this.b=null},
eI:function(a){if(this.c)return
this.f0(a)},
f0:function(a){return this.b.$1(a)},
$isiw:1},
j4:{
"^":"a;a,b,c",
eA:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ao(new H.bg(y,new H.j6(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.V(new H.j7(this,b),0),a)}else throw H.b(new P.Q("Timer greater than 0."))},
static:{j5:function(a,b){var z=new H.j4(!0,!1,null)
z.eA(a,b)
return z}}},
j6:{
"^":"f:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
j7:{
"^":"f:2;a,b",
$0:function(){this.a.c=null
H.bS()
this.b.$0()}},
aA:{
"^":"a;bU:a<",
gI:function(a){var z=this.a
if(typeof z!=="number")return z.hW()
z=C.b.aX(z,0)^C.b.aw(z,4294967296)
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
aF:{
"^":"a;a,b",
a8:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.p(0,a,z.gl(z))
z=J.q(a)
if(!!z.$isdM)return["buffer",a]
if(!!z.$isci)return["typed",a]
if(!!z.$isb5)return this.e9(a)
if(!!z.$ishD){x=this.ge6()
w=a.gak()
w=H.bz(w,x,H.a4(w,"a2",0),null)
w=P.ba(w,!0,H.a4(w,"a2",0))
z=z.gdU(a)
z=H.bz(z,x,H.a4(z,"a2",0),null)
return["map",w,P.ba(z,!0,H.a4(z,"a2",0))]}if(!!z.$ishR)return this.ea(a)
if(!!z.$isi)this.dS(a)
if(!!z.$isiw)this.ba(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbM)return this.eb(a)
if(!!z.$iscG)return this.ec(a)
if(!!z.$isf){v=a.$static_name
if(v==null)this.ba(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaA)return["capability",a.a]
if(!(a instanceof P.a))this.dS(a)
return["dart",init.classIdExtractor(a),this.e8(init.classFieldsExtractor(a))]},"$1","ge6",2,0,0],
ba:function(a,b){throw H.b(new P.Q(H.d(b==null?"Can't transmit:":b)+" "+H.d(a)))},
dS:function(a){return this.ba(a,null)},
e9:function(a){var z=this.e7(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ba(a,"Can't serialize indexable: ")},
e7:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.a8(a[y])
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
e8:function(a){var z
for(z=0;z<a.length;++z)C.a.p(a,z,this.a8(a[z]))
return a},
ea:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ba(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.a8(a[z[x]])
if(x>=y.length)return H.c(y,x)
y[x]=w}return["js-object",z,y]},
ec:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
eb:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbU()]
return["raw sendport",a]}},
bK:{
"^":"a;a,b",
ax:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.b(P.az("Bad serialized message: "+H.d(a)))
switch(C.a.gH(a)){case"ref":if(1>=a.length)return H.c(a,1)
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
y=this.aZ(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aZ(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return this.aZ(x)
case"const":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aZ(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.fW(a)
case"sendport":return this.fX(a)
case"raw sendport":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.fV(a)
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
this.aZ(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.b("couldn't deserialize: "+H.d(a))}},"$1","gfU",2,0,0],
aZ:function(a){var z,y,x
z=J.D(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.w(x)
if(!(y<x))break
z.p(a,y,this.ax(z.h(a,y)));++y}return a},
fW:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w=P.am()
this.b.push(w)
y=J.fv(y,this.gfU()).cq(0)
for(z=J.D(y),v=J.D(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.c(y,u)
w.p(0,y[u],this.ax(v.h(x,u)))}return w},
fX:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
if(3>=z)return H.c(a,3)
w=a[3]
if(J.K(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dr(w)
if(u==null)return
t=new H.bM(u,x)}else t=new H.cG(y,w,x)
this.b.push(t)
return t},
fV:function(a){var z,y,x,w,v,u,t
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
if(typeof t!=="number")return H.w(t)
if(!(u<t))break
w[z.h(y,u)]=this.ax(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
fZ:function(){throw H.b(new P.Q("Cannot modify unmodifiable Map"))},
lk:function(a){return init.types[a]},
ly:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.q(a).$isb7},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.b1(a)
if(typeof z!=="string")throw H.b(H.J(a))
return z},
ap:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dW:function(a,b){throw H.b(new P.al(a,null,null))},
ir:function(a,b,c){var z,y
H.l8(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.dW(a,c)
if(3>=z.length)return H.c(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.dW(a,c)},
bF:function(a){var z,y
z=C.w(J.q(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.h.aq(z,0)===36)z=C.h.el(z,1)
return(z+H.cR(H.bQ(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
bE:function(a){return"Instance of '"+H.bF(a)+"'"},
dV:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
is:function(a){var z,y,x,w
z=[]
z.$builtinTypeInfo=[P.o]
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.L)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.b(H.J(w))
if(w<=65535)z.push(w)
else if(w<=1114111){z.push(55296+(C.c.aX(w-65536,10)&1023))
z.push(56320+(w&1023))}else throw H.b(H.J(w))}return H.dV(z)},
e_:function(a){var z,y,x,w
for(z=a.length,y=0;x=a.length,y<x;x===z||(0,H.L)(a),++y){w=a[y]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.b(H.J(w))
if(w<0)throw H.b(H.J(w))
if(w>65535)return H.is(a)}return H.dV(a)},
it:function(a,b,c){var z,y,x,w,v
z=J.a_(c)
if(z.bA(c,500)&&b===0&&z.v(c,a.length))return String.fromCharCode.apply(null,a)
if(typeof c!=="number")return H.w(c)
y=b
x=""
for(;y<c;y=w){w=y+500
if(w<c)v=w
else v=c
x+=String.fromCharCode.apply(null,a.subarray(y,v))}return x},
aR:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.aX(z,10))>>>0,56320|z&1023)}throw H.b(P.U(a,0,1114111,null,null))},
Z:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dX:function(a){return a.b?H.Z(a).getUTCMilliseconds()+0:H.Z(a).getMilliseconds()+0},
bD:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.J(a))
return a[b]},
cr:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.J(a))
a[b]=c},
w:function(a){throw H.b(H.J(a))},
c:function(a,b){if(a==null)J.aj(a)
throw H.b(H.N(a,b))},
N:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ay(!0,b,"index",null)
z=J.aj(a)
if(!(b<0)){if(typeof z!=="number")return H.w(z)
y=b>=z}else y=!0
if(y)return P.bv(b,a,"index",null,z)
return P.bc(b,"index",null)},
J:function(a){return new P.ay(!0,a,null,null)},
ai:function(a){return a},
cL:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(H.J(a))
return a},
l8:function(a){if(typeof a!=="string")throw H.b(H.J(a))
return a},
b:function(a){var z
if(a==null)a=new P.dT()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eU})
z.name=""}else z.toString=H.eU
return z},
eU:function(){return J.b1(this.dartException)},
M:function(a){throw H.b(a)},
L:function(a){throw H.b(new P.W(a))},
F:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.lI(a)
if(a==null)return
if(a instanceof H.c3)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aX(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c8(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.dS(v,null))}}if(a instanceof TypeError){u=$.$get$eb()
t=$.$get$ec()
s=$.$get$ed()
r=$.$get$ee()
q=$.$get$ei()
p=$.$get$ej()
o=$.$get$eg()
$.$get$ef()
n=$.$get$el()
m=$.$get$ek()
l=u.ab(y)
if(l!=null)return z.$1(H.c8(y,l))
else{l=t.ab(y)
if(l!=null){l.method="call"
return z.$1(H.c8(y,l))}else{l=s.ab(y)
if(l==null){l=r.ab(y)
if(l==null){l=q.ab(y)
if(l==null){l=p.ab(y)
if(l==null){l=o.ab(y)
if(l==null){l=r.ab(y)
if(l==null){l=n.ab(y)
if(l==null){l=m.ab(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dS(y,l==null?null:l.method))}}return z.$1(new H.jI(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.e2()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ay(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.e2()
return a},
R:function(a){var z
if(a instanceof H.c3)return a.b
if(a==null)return new H.ev(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ev(a,null)},
lB:function(a){if(a==null||typeof a!='object')return J.O(a)
else return H.ap(a)},
eL:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
ls:function(a,b,c,d,e,f,g){var z=J.q(c)
if(z.v(c,0))return H.bh(b,new H.lt(a))
else if(z.v(c,1))return H.bh(b,new H.lu(a,d))
else if(z.v(c,2))return H.bh(b,new H.lv(a,d,e))
else if(z.v(c,3))return H.bh(b,new H.lw(a,d,e,f))
else if(z.v(c,4))return H.bh(b,new H.lx(a,d,e,f,g))
else throw H.b(P.bu("Unsupported number of arguments for wrapped closure"))},
V:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ls)
a.$identity=z
return z},
fW:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.q(c).$isl){z.$reflectionInfo=c
x=H.iz(z).r}else x=c
w=d?Object.create(new H.iR().constructor.prototype):Object.create(new H.c_(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a8
$.a8=J.r(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.dd(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.lk(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.da:H.c0
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.dd(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
fT:function(a,b,c,d){var z=H.c0
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dd:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fV(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fT(y,!w,z,b)
if(y===0){w=$.aM
if(w==null){w=H.bq("self")
$.aM=w}w="return function(){return this."+H.d(w)+"."+H.d(z)+"();"
v=$.a8
$.a8=J.r(v,1)
return new Function(w+H.d(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aM
if(v==null){v=H.bq("self")
$.aM=v}v=w+H.d(v)+"."+H.d(z)+"("+u+");"
w=$.a8
$.a8=J.r(w,1)
return new Function(v+H.d(w)+"}")()},
fU:function(a,b,c,d){var z,y
z=H.c0
y=H.da
switch(b?-1:a){case 0:throw H.b(new H.iC("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fV:function(a,b){var z,y,x,w,v,u,t,s
z=H.fK()
y=$.d9
if(y==null){y=H.bq("receiver")
$.d9=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fU(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.a8
$.a8=J.r(u,1)
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.a8
$.a8=J.r(u,1)
return new Function(y+H.d(u)+"}")()},
cM:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.q(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.fW(a,b,z,!!d,e,f)},
lC:function(a,b){var z=J.D(b)
throw H.b(H.dc(H.bF(a),z.bG(b,3,z.gl(b))))},
lr:function(a,b){var z
if(a!=null)z=typeof a==="object"&&J.q(a)[b]
else z=!0
if(z)return a
H.lC(a,b)},
lH:function(a){throw H.b(new P.h1("Cyclic initialization for static "+H.d(a)))},
aJ:function(a,b,c){return new H.iD(a,b,c,null)},
bj:function(){return C.B},
bW:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
h:function(a,b,c){var z
if(b===0){J.f6(c,a)
return}else if(b===1){c.de(H.F(a),H.R(a))
return}if(!!J.q(a).$isa1)z=a
else{z=H.e(new P.z(0,$.n,null),[null])
z.aG(a)}z.b8(H.eE(b,0),new H.l4(b))
return c.gh9()},
eE:function(a,b){return new H.l2(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
e:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bQ:function(a){if(a==null)return
return a.$builtinTypeInfo},
eM:function(a,b){return H.cU(a["$as"+H.d(b)],H.bQ(a))},
a4:function(a,b,c){var z=H.eM(a,b)
return z==null?null:z[c]},
A:function(a,b){var z=H.bQ(a)
return z==null?null:z[b]},
cT:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cR(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.k(a)
else return},
cR:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bf("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.d(H.cT(u,c))}return w?"":"<"+H.d(z)+">"},
cU:function(a,b){if(typeof a=="function"){a=H.cQ(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cQ(a,null,b)}return b},
l9:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bQ(a)
y=J.q(a)
if(y[b]==null)return!1
return H.eH(H.cU(y[d],z),c)},
lG:function(a,b,c,d){if(a!=null&&!H.l9(a,b,c,d))throw H.b(H.dc(H.bF(a),(b.substring(3)+H.cR(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
eH:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a5(a[y],b[y]))return!1
return!0},
bO:function(a,b,c){return H.cQ(a,b,H.eM(b,c))},
a5:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eN(a,b)
if('func' in a)return b.builtin$cls==="hm"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cT(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.d(H.cT(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.eH(H.cU(v,z),x)},
eG:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a5(z,v)||H.a5(v,z)))return!1}return!0},
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
if(!(H.a5(v,u)||H.a5(u,v)))return!1}return!0},
eN:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.a5(z,y)||H.a5(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eG(x,w,!1))return!1
if(!H.eG(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}}return H.l3(a.named,b.named)},
cQ:function(a,b,c){return a.apply(b,c)},
nj:function(a){var z=$.cO
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
ni:function(a){return H.ap(a)},
nh:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
lz:function(a){var z,y,x,w,v,u
z=$.cO.$1(a)
y=$.bP[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bR[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eF.$2(a,z)
if(z!=null){y=$.bP[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bR[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cS(x)
$.bP[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bR[z]=x
return x}if(v==="-"){u=H.cS(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eQ(a,x)
if(v==="*")throw H.b(new P.cA(z))
if(init.leafTags[z]===true){u=H.cS(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eQ(a,x)},
eQ:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bU(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cS:function(a){return J.bU(a,!1,null,!!a.$isb7)},
lA:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bU(z,!1,null,!!z.$isb7)
else return J.bU(z,c,null,null)},
lp:function(){if(!0===$.cP)return
$.cP=!0
H.lq()},
lq:function(){var z,y,x,w,v,u,t,s
$.bP=Object.create(null)
$.bR=Object.create(null)
H.ll()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eR.$1(v)
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
z=H.aI(C.I,H.aI(C.N,H.aI(C.x,H.aI(C.x,H.aI(C.M,H.aI(C.J,H.aI(C.K(C.w),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cO=new H.lm(v)
$.eF=new H.ln(u)
$.eR=new H.lo(t)},
aI:function(a,b){return a(b)||b},
lF:function(a,b,c){return a.indexOf(b,c)>=0},
fY:{
"^":"a;",
gW:function(a){return J.K(this.gl(this),0)},
k:function(a){return P.cc(this)},
p:function(a,b,c){return H.fZ()},
$isaQ:1},
c6:{
"^":"fY;a",
bh:function(){var z=this.$map
if(z==null){z=new H.b8(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.eL(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.bh().h(0,b)},
P:function(a,b){this.bh().P(0,b)},
gak:function(){return this.bh().gak()},
gl:function(a){var z=this.bh()
return z.gl(z)}},
iy:{
"^":"a;a,b,c,d,e,f,r,x",
static:{iz:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.iy(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
jG:{
"^":"a;a,b,c,d,e,f",
ab:function(a){var z,y,x
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
static:{ac:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.jG(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bI:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},eh:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dS:{
"^":"P;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+H.d(z)+"' on null"}},
hT:{
"^":"P;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.d(z)+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.d(z)+"' on '"+H.d(y)+"' ("+H.d(this.a)+")"},
static:{c8:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hT(a,y,z?null:b.receiver)}}},
jI:{
"^":"P;a",
k:function(a){var z=this.a
return C.h.gW(z)?"Error":"Error: "+z}},
lI:{
"^":"f:0;a",
$1:function(a){if(!!J.q(a).$isP)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ev:{
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
k:function(a){return"Closure '"+H.bF(this)+"'"},
gdX:function(){return this},
gdX:function(){return this}},
e5:{
"^":"f;"},
iR:{
"^":"e5;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
c_:{
"^":"e5;a,b,c,d",
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c_))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gI:function(a){var z,y
z=this.c
if(z==null)y=H.ap(this.a)
else y=typeof z!=="object"?J.O(z):H.ap(z)
z=H.ap(this.b)
if(typeof y!=="number")return y.hY()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.bE(z)},
static:{c0:function(a){return a.a},da:function(a){return a.c},fK:function(){var z=$.aM
if(z==null){z=H.bq("self")
$.aM=z}return z},bq:function(a){var z,y,x,w,v
z=new H.c_("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fM:{
"^":"P;a",
k:function(a){return this.a},
static:{dc:function(a,b){return new H.fM("CastError: Casting value of type "+H.d(a)+" to incompatible type "+H.d(b))}}},
iC:{
"^":"P;a",
k:function(a){return"RuntimeError: "+H.d(this.a)}},
e1:{
"^":"a;"},
iD:{
"^":"e1;a,b,c,d",
av:function(a){var z=this.eT(a)
return z==null?!1:H.eN(z,this.aQ())},
eT:function(a){var z=J.q(a)
return"$signature" in z?z.$signature():null},
aQ:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.q(y)
if(!!x.$isn1)z.void=true
else if(!x.$isdl)z.ret=y.aQ()
y=this.b
if(y!=null&&y.length!==0)z.args=H.e0(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.e0(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eK(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aQ()}z.named=w}return z},
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
t=H.eK(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.d(z[s].aQ())+" "+s}x+="}"}}return x+(") -> "+H.d(this.a))},
static:{e0:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aQ())
return z}}},
dl:{
"^":"e1;",
k:function(a){return"dynamic"},
aQ:function(){return}},
c3:{
"^":"a;a,a9:b<"},
l4:{
"^":"f:6;a",
$2:function(a,b){H.eE(this.a,1).$1(new H.c3(a,b))}},
l2:{
"^":"f:0;a,b",
$1:function(a){this.b(this.a,a)}},
b8:{
"^":"a;a,b,c,d,e,f,r",
gl:function(a){return this.a},
gW:function(a){return this.a===0},
gak:function(){return H.e(new H.hZ(this),[H.A(this,0)])},
gdU:function(a){return H.bz(this.gak(),new H.hS(this),H.A(this,0),H.A(this,1))},
a2:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cK(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cK(y,a)}else return this.hg(a)},
hg:function(a){var z=this.d
if(z==null)return!1
return this.b1(this.ah(z,this.b0(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ah(z,b)
return y==null?null:y.gaB()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ah(x,b)
return y==null?null:y.gaB()}else return this.hh(b)},
hh:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ah(z,this.b0(a))
x=this.b1(y,a)
if(x<0)return
return y[x].gaB()},
p:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bW()
this.b=z}this.cD(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bW()
this.c=y}this.cD(y,b,c)}else this.hj(b,c)},
hj:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bW()
this.d=z}y=this.b0(a)
x=this.ah(z,y)
if(x==null)this.bY(z,y,[this.bX(a,b)])
else{w=this.b1(x,a)
if(w>=0)x[w].saB(b)
else x.push(this.bX(a,b))}},
ae:function(a,b){if(typeof b==="string")return this.cY(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cY(this.c,b)
else return this.hi(b)},
hi:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ah(z,this.b0(a))
x=this.b1(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.d5(w)
return w.gaB()},
a_:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
P:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.b(new P.W(this))
z=z.c}},
cD:function(a,b,c){var z=this.ah(a,b)
if(z==null)this.bY(a,b,this.bX(b,c))
else z.saB(c)},
cY:function(a,b){var z
if(a==null)return
z=this.ah(a,b)
if(z==null)return
this.d5(z)
this.cL(a,b)
return z.gaB()},
bX:function(a,b){var z,y
z=new H.hY(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
d5:function(a){var z,y
z=a.gfa()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
b0:function(a){return J.O(a)&0x3ffffff},
b1:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.K(a[y].gdl(),b))return y
return-1},
k:function(a){return P.cc(this)},
ah:function(a,b){return a[b]},
bY:function(a,b,c){a[b]=c},
cL:function(a,b){delete a[b]},
cK:function(a,b){return this.ah(a,b)!=null},
bW:function(){var z=Object.create(null)
this.bY(z,"<non-identifier-key>",z)
this.cL(z,"<non-identifier-key>")
return z},
$ishD:1,
$isaQ:1},
hS:{
"^":"f:0;a",
$1:function(a){return this.a.h(0,a)}},
hY:{
"^":"a;dl:a<,aB:b@,c,fa:d<"},
hZ:{
"^":"a2;a",
gl:function(a){return this.a.a},
gK:function(a){var z,y
z=this.a
y=new H.i_(z,z.r,null,null)
y.c=z.e
return y},
P:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.b(new P.W(z))
y=y.c}},
$isv:1},
i_:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
A:function(){var z=this.a
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
c7:function(){return new P.aT("No element")},
hM:function(){return new P.aT("Too few elements")},
be:function(a,b,c,d){if(c-b<=32)H.iK(a,b,c,d)
else H.iJ(a,b,c,d)},
iK:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.D(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a0(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.p(a,w,y.h(a,v))
w=v}y.p(a,w,x)}},
iJ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.aw(c-b+1,6)
y=b+z
x=c-z
w=C.c.aw(b+c,2)
v=w-z
u=w+z
t=J.D(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a0(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a0(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a0(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a0(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a0(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a0(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a0(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a0(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a0(d.$2(p,o),0)){n=o
o=p
p=n}t.p(a,y,s)
t.p(a,w,q)
t.p(a,x,o)
t.p(a,v,t.h(a,b))
t.p(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.K(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.q(i)
if(h.v(i,0))continue
if(h.a7(i,0)){if(k!==m){t.p(a,k,t.h(a,m))
t.p(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.a_(i)
if(h.am(i,0)){--l
continue}else{g=l-1
if(h.a7(i,0)){t.p(a,k,t.h(a,m))
f=m+1
t.p(a,m,t.h(a,l))
t.p(a,l,j)
l=g
m=f
break}else{t.p(a,k,t.h(a,l))
t.p(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.aK(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.h(a,m))
t.p(a,m,j)}++m}else if(J.a0(d.$2(j,p),0))for(;!0;)if(J.a0(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.aK(d.$2(t.h(a,l),r),0)){t.p(a,k,t.h(a,m))
f=m+1
t.p(a,m,t.h(a,l))
t.p(a,l,j)
m=f}else{t.p(a,k,t.h(a,l))
t.p(a,l,j)}l=g
break}}e=!1}h=m-1
t.p(a,b,t.h(a,h))
t.p(a,h,r)
h=l+1
t.p(a,c,t.h(a,h))
t.p(a,h,p)
H.be(a,b,m-2,d)
H.be(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.K(d.$2(t.h(a,m),r),0);)++m
for(;J.K(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.K(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.h(a,m))
t.p(a,m,j)}++m}else if(J.K(d.$2(j,p),0))for(;!0;)if(J.K(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.aK(d.$2(t.h(a,l),r),0)){t.p(a,k,t.h(a,m))
f=m+1
t.p(a,m,t.h(a,l))
t.p(a,l,j)
m=f}else{t.p(a,k,t.h(a,l))
t.p(a,l,j)}l=g
break}}H.be(a,m,l,d)}else H.be(a,m,l,d)},
j2:function(a){return a.gi2()},
fX:{
"^":"en;a",
gl:function(a){return this.a.length},
h:function(a,b){return C.h.aq(this.a,b)},
$asen:function(){return[P.o]},
$asdB:function(){return[P.o]},
$asl:function(){return[P.o]}},
aP:{
"^":"a2;",
gK:function(a){return new H.dC(this,this.gl(this),0,null)},
P:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.a3(0,y))
if(z!==this.gl(this))throw H.b(new P.W(this))}},
aN:function(a,b){return H.e(new H.cb(this,b),[null,null])},
cr:function(a,b){var z,y,x
if(b){z=H.e([],[H.a4(this,"aP",0)])
C.a.sl(z,this.gl(this))}else z=H.e(Array(this.gl(this)),[H.a4(this,"aP",0)])
for(y=0;y<this.gl(this);++y){x=this.a3(0,y)
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
cq:function(a){return this.cr(a,!0)},
$isv:1},
dC:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
A:function(){var z,y,x,w
z=this.a
y=J.D(z)
x=y.gl(z)
if(this.b!==x)throw H.b(new P.W(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a3(z,w);++this.c
return!0}},
dD:{
"^":"a2;a,b",
gK:function(a){var z=new H.i3(null,J.ax(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gl:function(a){return J.aj(this.a)},
$asa2:function(a,b){return[b]},
static:{bz:function(a,b,c,d){if(!!J.q(a).$isv)return H.e(new H.dm(a,b),[c,d])
return H.e(new H.dD(a,b),[c,d])}}},
dm:{
"^":"dD;a,b",
$isv:1},
i3:{
"^":"hN;a,b,c",
A:function(){var z=this.b
if(z.A()){this.a=this.bT(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
bT:function(a){return this.c.$1(a)}},
cb:{
"^":"aP;a,b",
gl:function(a){return J.aj(this.a)},
a3:function(a,b){return this.bT(J.fd(this.a,b))},
bT:function(a){return this.b.$1(a)},
$asaP:function(a,b){return[b]},
$asa2:function(a,b){return[b]},
$isv:1},
ds:{
"^":"a;"},
jJ:{
"^":"a;",
p:function(a,b,c){throw H.b(new P.Q("Cannot modify an unmodifiable list"))},
$isl:1,
$asl:null,
$isv:1},
en:{
"^":"dB+jJ;",
$isl:1,
$asl:null,
$isv:1}}],["","",,H,{
"^":"",
eK:function(a){var z=H.e(a?Object.keys(a):[],[null])
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
n4:[function(a){P.cv(C.u,a)},"$1","l7",2,0,5],
ez:function(a,b){var z=H.bj()
z=H.aJ(z,[z,z]).av(a)
if(z){b.toString
return a}else{b.toString
return a}},
hn:function(a,b){var z=H.e(new P.z(0,$.n,null),[b])
P.cu(C.u,new P.hq(a,z))
return z},
ho:function(a,b,c){var z=new P.z(0,$.n,null)
z.$builtinTypeInfo=[c]
P.cu(a,new P.hp(b,z))
return z},
c5:function(a,b,c){var z,y,x,w,v
z={}
y=H.e(new P.z(0,$.n,null),[P.l])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.hs(z,c,b,y)
for(w=0;w<4;++w)a[w].b8(new P.hr(z,c,b,y,z.b++),x)
x=z.b
if(x===0){z=H.e(new P.z(0,$.n,null),[null])
z.aG(C.R)
return z}v=Array(x)
v.fixed$length=Array
z.a=v
return y},
E:function(a){return H.e(new P.ad(H.e(new P.z(0,$.n,null),[a])),[a])},
ex:function(a,b,c){$.n.toString
a.V(b,c)},
kZ:function(){var z,y
for(;z=$.aG,z!=null;){$.aY=null
y=z.c
$.aG=y
if(y==null)$.aX=null
$.n=z.b
z.fu()}},
ng:[function(){$.cH=!0
try{P.kZ()}finally{$.n=C.d
$.aY=null
$.cH=!1
if($.aG!=null)$.$get$cC().$1(P.eI())}},"$0","eI",0,0,2],
eD:function(a){if($.aG==null){$.aX=a
$.aG=a
if(!$.cH)$.$get$cC().$1(P.eI())}else{$.aX.c=a
$.aX=a}},
eS:function(a){var z,y
z=$.n
if(C.d===z){P.aH(null,null,C.d,a)
return}z.toString
if(C.d.gca()===z){P.aH(null,null,z,a)
return}y=$.n
P.aH(null,null,y,y.c_(a,!0))},
mR:function(a,b){var z,y,x
z=H.e(new P.ew(null,null,null,0),[b])
y=z.gf5()
x=z.gf7()
z.a=a.aC(y,!0,z.gf6(),x)
return z},
l0:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.F(u)
z=t
y=H.R(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.ae(x)
w=t
v=x.ga9()
c.$2(w,v)}}},
kS:function(a,b,c,d){var z=a.c1()
if(!!J.q(z).$isa1)z.ct(new P.kV(b,c,d))
else b.V(c,d)},
kT:function(a,b){return new P.kU(a,b)},
cu:function(a,b){var z=$.n
if(z===C.d){z.toString
return P.cv(a,b)}return P.cv(a,z.c_(b,!0))},
cv:function(a,b){var z=C.c.aw(a.a,1000)
return H.j5(z<0?0:z,b)},
cB:function(a){var z=$.n
$.n=a
return z},
bi:function(a,b,c,d,e){var z,y,x
z=new P.ep(new P.l_(d,e),C.d,null)
y=$.aG
if(y==null){P.eD(z)
$.aY=$.aX}else{x=$.aY
if(x==null){z.c=y
$.aY=z
$.aG=z}else{z.c=x.c
x.c=z
$.aY=z
if(z.c==null)$.aX=z}}},
eA:function(a,b,c,d){var z,y
if($.n===c)return d.$0()
z=P.cB(c)
try{y=d.$0()
return y}finally{$.n=z}},
eC:function(a,b,c,d,e){var z,y
if($.n===c)return d.$1(e)
z=P.cB(c)
try{y=d.$1(e)
return y}finally{$.n=z}},
eB:function(a,b,c,d,e,f){var z,y
if($.n===c)return d.$2(e,f)
z=P.cB(c)
try{y=d.$2(e,f)
return y}finally{$.n=z}},
aH:function(a,b,c,d){var z=C.d!==c
if(z){d=c.c_(d,!(!z||C.d.gca()===c))
c=C.d}P.eD(new P.ep(d,c,null))},
jS:{
"^":"f:0;a",
$1:function(a){var z,y
H.bS()
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
$0:function(){H.bS()
this.a.$0()}},
jU:{
"^":"f:1;a",
$0:function(){H.bS()
this.a.$0()}},
kL:{
"^":"ak;a,b",
k:function(a){var z,y
z="Uncaught Error: "+H.d(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.d(y)):z},
static:{kM:function(a,b){if(b!=null)return b
if(!!J.q(a).$isP)return a.ga9()
return}}},
a1:{
"^":"a;"},
hq:{
"^":"f:1;a,b",
$0:function(){var z,y,x,w
try{this.b.as(this.a.$0())}catch(x){w=H.F(x)
z=w
y=H.R(x)
P.ex(this.b,z,y)}}},
hp:{
"^":"f:1;a,b",
$0:function(){var z,y,x,w
try{this.b.as(null)}catch(x){w=H.F(x)
z=w
y=H.R(x)
P.ex(this.b,z,y)}}},
hs:{
"^":"f:14;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.V(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.V(z.c,z.d)}},
hr:{
"^":"f:15;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.c(x,z)
x[z]=a
if(y===0)this.d.bQ(x)}else if(z.b===0&&!this.b)this.d.V(z.c,z.d)}},
jY:{
"^":"a;h9:a<",
de:function(a,b){a=a!=null?a:new P.dT()
if(this.a.a!==0)throw H.b(new P.aT("Future already completed"))
$.n.toString
this.V(a,b)},
aj:function(a){return this.de(a,null)}},
ad:{
"^":"jY;a",
a1:function(a,b){var z=this.a
if(z.a!==0)throw H.b(new P.aT("Future already completed"))
z.aG(b)},
V:function(a,b){this.a.eM(a,b)}},
aU:{
"^":"a;cS:a<,cn:b>,c,d,e",
gaI:function(){return this.b.b},
gdk:function(){return(this.c&1)!==0},
ghf:function(){return this.c===6},
ghe:function(){return this.c===8},
gf9:function(){return this.d},
gfj:function(){return this.d}},
z:{
"^":"a;bj:a?,aI:b<,c",
gf1:function(){return this.a===8},
sf3:function(a){if(a)this.a=2
else this.a=0},
b8:function(a,b){var z,y
z=H.e(new P.z(0,$.n,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.ez(b,y)}this.bI(new P.aU(null,z,b==null?1:3,a,b))
return z},
X:function(a){return this.b8(a,null)},
ct:function(a){var z,y
z=$.n
y=new P.z(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.bI(new P.aU(null,y,8,a,null))
return y},
bV:function(){if(this.a!==0)throw H.b(new P.aT("Future already completed"))
this.a=1},
gfi:function(){return this.c},
gaW:function(){return this.c},
d4:function(a){this.a=4
this.c=a},
d3:function(a){this.a=8
this.c=a},
ff:function(a,b){this.d3(new P.ak(a,b))},
bI:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aH(null,null,z,new P.k7(this,a))}else{a.a=this.c
this.c=a}},
bi:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gcS()
z.a=y}return y},
as:function(a){var z,y
z=J.q(a)
if(!!z.$isa1)if(!!z.$isz)P.bL(a,this)
else P.cE(a,this)
else{y=this.bi()
this.d4(a)
P.at(this,y)}},
bQ:function(a){var z=this.bi()
this.d4(a)
P.at(this,z)},
V:[function(a,b){var z=this.bi()
this.d3(new P.ak(a,b))
P.at(this,z)},function(a){return this.V(a,null)},"hZ","$2","$1","gbP",2,2,16,0],
aG:function(a){var z
if(a==null);else{z=J.q(a)
if(!!z.$isa1){if(!!z.$isz){z=a.a
if(z>=4&&z===8){this.bV()
z=this.b
z.toString
P.aH(null,null,z,new P.k9(this,a))}else P.bL(a,this)}else P.cE(a,this)
return}}this.bV()
z=this.b
z.toString
P.aH(null,null,z,new P.ka(this,a))},
eM:function(a,b){var z
this.bV()
z=this.b
z.toString
P.aH(null,null,z,new P.k8(this,a,b))},
$isa1:1,
static:{cE:function(a,b){var z,y,x,w
b.sbj(2)
try{a.b8(new P.kb(b),new P.kc(b))}catch(x){w=H.F(x)
z=w
y=H.R(x)
P.eS(new P.kd(b,z,y))}},bL:function(a,b){var z
b.a=2
z=new P.aU(null,b,0,null,null)
if(a.a>=4)P.at(a,z)
else a.bI(z)},at:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gf1()
if(b==null){if(w){v=z.a.gaW()
y=z.a.gaI()
x=J.ae(v)
u=v.ga9()
y.toString
P.bi(null,null,y,x,u)}return}for(;b.gcS()!=null;b=t){t=b.a
b.a=null
P.at(z.a,b)}x.a=!0
s=w?null:z.a.gfi()
x.b=s
x.c=!1
y=!w
if(!y||b.gdk()||b.c===8){r=b.gaI()
if(w){u=z.a.gaI()
u.toString
if(u==null?r!=null:u!==r){u=u.gca()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaW()
y=z.a.gaI()
x=J.ae(v)
u=v.ga9()
y.toString
P.bi(null,null,y,x,u)
return}q=$.n
if(q==null?r!=null:q!==r)$.n=r
else q=null
if(y){if(b.gdk())x.a=new P.kf(x,b,s,r).$0()}else new P.ke(z,x,b,r).$0()
if(b.ghe())new P.kg(z,x,w,b,r).$0()
if(q!=null)$.n=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.q(y).$isa1}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.z)if(p.a>=4){o.a=2
z.a=p
b=new P.aU(null,o,0,null,null)
y=p
continue}else P.bL(p,o)
else P.cE(p,o)
return}}o=b.b
b=o.bi()
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
$1:function(a){this.a.bQ(a)}},
kc:{
"^":"f:7;a",
$2:function(a,b){this.a.V(a,b)},
$1:function(a){return this.$2(a,null)}},
kd:{
"^":"f:1;a,b,c",
$0:function(){this.a.V(this.b,this.c)}},
k9:{
"^":"f:1;a,b",
$0:function(){P.bL(this.b,this.a)}},
ka:{
"^":"f:1;a,b",
$0:function(){this.a.bQ(this.b)}},
k8:{
"^":"f:1;a,b,c",
$0:function(){this.a.V(this.b,this.c)}},
kf:{
"^":"f:17;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.bt(this.b.gf9(),this.c)
return!0}catch(x){w=H.F(x)
z=w
y=H.R(x)
this.a.b=new P.ak(z,y)
return!1}}},
ke:{
"^":"f:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaW()
y=!0
r=this.c
if(r.ghf()){x=r.d
try{y=this.d.bt(x,J.ae(z))}catch(q){r=H.F(q)
w=r
v=H.R(q)
r=J.ae(z)
p=w
o=(r==null?p==null:r===p)?z:new P.ak(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.bj()
p=H.aJ(p,[p,p]).av(r)
n=this.d
m=this.b
if(p)m.b=n.hI(u,J.ae(z),z.ga9())
else m.b=n.bt(u,J.ae(z))}catch(q){r=H.F(q)
t=r
s=H.R(q)
r=J.ae(z)
p=t
o=(r==null?p==null:r===p)?z:new P.ak(t,s)
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
try{w=this.e.dM(this.d.gfj())
z.a=w
v=w}catch(u){z=H.F(u)
y=z
x=H.R(u)
if(this.c){z=J.ae(this.a.a.gaW())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaW()
else v.b=new P.ak(y,x)
v.a=!1
return}if(!!J.q(v).$isa1){t=this.d
s=t.gcn(t)
s.sf3(!0)
this.b.c=!0
v.b8(new P.kh(this.a,s),new P.ki(z,s))}}},
kh:{
"^":"f:0;a,b",
$1:function(a){P.at(this.a.a,new P.aU(null,this.b,0,null,null))}},
ki:{
"^":"f:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.z)){y=H.e(new P.z(0,$.n,null),[null])
z.a=y
y.ff(a,b)}P.at(z.a,new P.aU(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
ep:{
"^":"a;a,b,c",
fu:function(){return this.a.$0()}},
ar:{
"^":"a;",
aN:function(a,b){return H.e(new P.kA(b,this),[H.a4(this,"ar",0),null])},
P:function(a,b){var z,y
z={}
y=H.e(new P.z(0,$.n,null),[null])
z.a=null
z.a=this.aC(new P.iV(z,this,b,y),!0,new P.iW(y),y.gbP())
return y},
gl:function(a){var z,y
z={}
y=H.e(new P.z(0,$.n,null),[P.o])
z.a=0
this.aC(new P.iX(z),!0,new P.iY(z,y),y.gbP())
return y},
cq:function(a){var z,y
z=H.e([],[H.a4(this,"ar",0)])
y=H.e(new P.z(0,$.n,null),[[P.l,H.a4(this,"ar",0)]])
this.aC(new P.iZ(this,z),!0,new P.j_(z,y),y.gbP())
return y}},
iV:{
"^":"f;a,b,c,d",
$1:function(a){P.l0(new P.iT(this.c,a),new P.iU(),P.kT(this.a.a,this.d))},
$signature:function(){return H.bO(function(a){return{func:1,args:[a]}},this.b,"ar")}},
iT:{
"^":"f:1;a,b",
$0:function(){return this.a.$1(this.b)}},
iU:{
"^":"f:0;",
$1:function(a){}},
iW:{
"^":"f:1;a",
$0:function(){this.a.as(null)}},
iX:{
"^":"f:0;a",
$1:function(a){++this.a.a}},
iY:{
"^":"f:1;a,b",
$0:function(){this.b.as(this.a.a)}},
iZ:{
"^":"f;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bO(function(a){return{func:1,args:[a]}},this.a,"ar")}},
j_:{
"^":"f:1;a,b",
$0:function(){this.b.as(this.a)}},
iS:{
"^":"a;"},
n8:{
"^":"a;"},
jV:{
"^":"a;aI:d<,bj:e?",
ck:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.dc()
if((z&4)===0&&(this.e&32)===0)this.cP(this.gcU())},
b5:function(a){return this.ck(a,null)},
dJ:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gW(z)}else z=!1
if(z)this.r.bC(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cP(this.gcW())}}}},
c1:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bL()
return this.f},
bL:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.dc()
if((this.e&32)===0)this.r=null
this.f=this.cT()},
bK:["eo",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.d0(a)
else this.bJ(new P.k0(a,null))}],
bH:["ep",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.d2(a,b)
else this.bJ(new P.k2(a,b,null))}],
eL:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.d1()
else this.bJ(C.D)},
cV:[function(){},"$0","gcU",0,0,2],
cX:[function(){},"$0","gcW",0,0,2],
cT:function(){return},
bJ:function(a){var z,y
z=this.r
if(z==null){z=new P.kK(null,null,0)
this.r=z}z.aJ(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bC(this)}},
d0:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cp(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bN((z&4)!==0)},
d2:function(a,b){var z,y
z=this.e
y=new P.jX(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bL()
z=this.f
if(!!J.q(z).$isa1)z.ct(y)
else y.$0()}else{y.$0()
this.bN((z&4)!==0)}},
d1:function(){var z,y
z=new P.jW(this)
this.bL()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.q(y).$isa1)y.ct(z)
else z.$0()},
cP:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bN((z&4)!==0)},
bN:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gW(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gW(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cV()
else this.cX()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bC(this)},
eE:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.ez(b,z)
this.c=c}},
jX:{
"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bj()
x=H.aJ(x,[x,x]).av(y)
w=z.d
v=this.b
u=z.b
if(x)w.hJ(u,v,this.c)
else w.cp(u,v)
z.e=(z.e&4294967263)>>>0}},
jW:{
"^":"f:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.dN(z.c)
z.e=(z.e&4294967263)>>>0}},
er:{
"^":"a;bq:a@"},
k0:{
"^":"er;b,a",
cl:function(a){a.d0(this.b)}},
k2:{
"^":"er;az:b>,a9:c<,a",
cl:function(a){a.d2(this.b,this.c)}},
k1:{
"^":"a;",
cl:function(a){a.d1()},
gbq:function(){return},
sbq:function(a){throw H.b(new P.aT("No events after a done."))}},
kC:{
"^":"a;bj:a?",
bC:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eS(new P.kD(this,a))
this.a=1},
dc:function(){if(this.a===1)this.a=3}},
kD:{
"^":"f:1;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.hb(this.b)}},
kK:{
"^":"kC;b,c,a",
gW:function(a){return this.c==null},
aJ:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbq(b)
this.c=b}},
hb:function(a){var z,y
z=this.b
y=z.gbq()
this.b=y
if(y==null)this.c=null
z.cl(a)}},
ew:{
"^":"a;a,b,c,bj:d?",
cG:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
i3:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.as(!0)
return}this.a.b5(0)
this.c=a
this.d=3},"$1","gf5",2,0,function(){return H.bO(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"ew")}],
f8:[function(a,b){var z
if(this.d===2){z=this.c
this.cG(0)
z.V(a,b)
return}this.a.b5(0)
this.c=new P.ak(a,b)
this.d=4},function(a){return this.f8(a,null)},"i5","$2","$1","gf7",2,2,18,0],
i4:[function(){if(this.d===2){var z=this.c
this.cG(0)
z.as(!1)
return}this.a.b5(0)
this.c=null
this.d=5},"$0","gf6",0,0,2]},
kV:{
"^":"f:1;a,b,c",
$0:function(){return this.a.V(this.b,this.c)}},
kU:{
"^":"f:6;a,b",
$2:function(a,b){return P.kS(this.a,this.b,a,b)}},
cD:{
"^":"ar;",
aC:function(a,b,c,d){return this.eR(a,d,c,!0===b)},
dq:function(a,b,c){return this.aC(a,null,b,c)},
eR:function(a,b,c,d){return P.k6(this,a,b,c,d,H.a4(this,"cD",0),H.a4(this,"cD",1))},
cQ:function(a,b){b.bK(a)},
$asar:function(a,b){return[b]}},
es:{
"^":"jV;x,y,a,b,c,d,e,f,r",
bK:function(a){if((this.e&2)!==0)return
this.eo(a)},
bH:function(a,b){if((this.e&2)!==0)return
this.ep(a,b)},
cV:[function(){var z=this.y
if(z==null)return
z.b5(0)},"$0","gcU",0,0,2],
cX:[function(){var z=this.y
if(z==null)return
z.dJ()},"$0","gcW",0,0,2],
cT:function(){var z=this.y
if(z!=null){this.y=null
z.c1()}return},
i_:[function(a){this.x.cQ(a,this)},"$1","geY",2,0,function(){return H.bO(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"es")}],
i1:[function(a,b){this.bH(a,b)},"$2","gf_",4,0,19],
i0:[function(){this.eL()},"$0","geZ",0,0,2],
eF:function(a,b,c,d,e,f,g){var z,y
z=this.geY()
y=this.gf_()
this.y=this.x.a.dq(z,this.geZ(),y)},
static:{k6:function(a,b,c,d,e,f,g){var z=$.n
z=H.e(new P.es(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.eE(b,c,d,e)
z.eF(a,b,c,d,e,f,g)
return z}}},
kA:{
"^":"cD;b,a",
cQ:function(a,b){var z,y,x,w,v
z=null
try{z=this.fh(a)}catch(w){v=H.F(w)
y=v
x=H.R(w)
$.n.toString
b.bH(y,x)
return}b.bK(z)},
fh:function(a){return this.b.$1(a)}},
ak:{
"^":"a;az:a>,a9:b<",
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
gca:function(){return this},
dN:function(a){var z,y,x,w
try{if(C.d===$.n){x=a.$0()
return x}x=P.eA(null,null,this,a)
return x}catch(w){x=H.F(w)
z=x
y=H.R(w)
return P.bi(null,null,this,z,y)}},
cp:function(a,b){var z,y,x,w
try{if(C.d===$.n){x=a.$1(b)
return x}x=P.eC(null,null,this,a,b)
return x}catch(w){x=H.F(w)
z=x
y=H.R(w)
return P.bi(null,null,this,z,y)}},
hJ:function(a,b,c){var z,y,x,w
try{if(C.d===$.n){x=a.$2(b,c)
return x}x=P.eB(null,null,this,a,b,c)
return x}catch(w){x=H.F(w)
z=x
y=H.R(w)
return P.bi(null,null,this,z,y)}},
c_:function(a,b){if(b)return new P.kG(this,a)
else return new P.kH(this,a)},
fp:function(a,b){if(b)return new P.kI(this,a)
else return new P.kJ(this,a)},
h:function(a,b){return},
dM:function(a){if($.n===C.d)return a.$0()
return P.eA(null,null,this,a)},
bt:function(a,b){if($.n===C.d)return a.$1(b)
return P.eC(null,null,this,a,b)},
hI:function(a,b,c){if($.n===C.d)return a.$2(b,c)
return P.eB(null,null,this,a,b,c)}},
kG:{
"^":"f:1;a,b",
$0:function(){return this.a.dN(this.b)}},
kH:{
"^":"f:1;a,b",
$0:function(){return this.a.dM(this.b)}},
kI:{
"^":"f:0;a,b",
$1:function(a){return this.a.cp(this.b,a)}},
kJ:{
"^":"f:0;a,b",
$1:function(a){return this.a.bt(this.b,a)}}}],["","",,P,{
"^":"",
am:function(){return H.e(new H.b8(0,null,null,null,null,null,0),[null,null])},
af:function(a){return H.eL(a,H.e(new H.b8(0,null,null,null,null,null,0),[null,null]))},
hL:function(a,b,c){var z,y
if(P.cI(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aZ()
y.push(a)
try{P.kY(a,z)}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=P.e3(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bw:function(a,b,c){var z,y,x
if(P.cI(a))return b+"..."+c
z=new P.bf(b)
y=$.$get$aZ()
y.push(a)
try{x=z
x.a=P.e3(x.gaH(),a,", ")}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=z
y.a=y.gaH()+c
y=z.gaH()
return y.charCodeAt(0)==0?y:y},
cI:function(a){var z,y
for(z=0;y=$.$get$aZ(),z<y.length;++z)if(a===y[z])return!0
return!1},
kY:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gK(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.A())return
w=H.d(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.A()){if(x<=5)return
if(0>=b.length)return H.c(b,0)
v=b.pop()
if(0>=b.length)return H.c(b,0)
u=b.pop()}else{t=z.gG();++x
if(!z.A()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.c(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.A();t=s,s=r){r=z.gG();++x
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
by:function(a,b,c,d,e){return H.e(new H.b8(0,null,null,null,null,null,0),[d,e])},
aC:function(a,b){return P.kv(a,b)},
aO:function(a,b,c,d){return H.e(new P.ks(0,null,null,null,null,null,0),[d])},
cc:function(a){var z,y,x
z={}
if(P.cI(a))return"{...}"
y=new P.bf("")
try{$.$get$aZ().push(a)
x=y
x.a=x.gaH()+"{"
z.a=!0
J.fe(a,new P.i4(z,y))
z=y
z.a=z.gaH()+"}"}finally{z=$.$get$aZ()
if(0>=z.length)return H.c(z,0)
z.pop()}z=y.gaH()
return z.charCodeAt(0)==0?z:z},
ku:{
"^":"b8;a,b,c,d,e,f,r",
b0:function(a){return H.lB(a)&0x3ffffff},
b1:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdl()
if(x==null?b==null:x===b)return y}return-1},
static:{kv:function(a,b){return H.e(new P.ku(0,null,null,null,null,null,0),[a,b])}}},
ks:{
"^":"kj;a,b,c,d,e,f,r",
gK:function(a){var z=new P.dA(this,this.r,null,null)
z.c=this.e
return z},
gl:function(a){return this.a},
fG:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eQ(b)},
eQ:function(a){var z=this.d
if(z==null)return!1
return this.bg(z[this.bf(a)],a)>=0},
dr:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.fG(0,a)?a:null
else return this.f4(a)},
f4:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bf(a)]
x=this.bg(y,a)
if(x<0)return
return J.bl(y,x).gcM()},
P:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.b(new P.W(this))
z=z.b}},
aJ:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cH(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cH(x,b)}else return this.ao(b)},
ao:function(a){var z,y,x
z=this.d
if(z==null){z=P.kt()
this.d=z}y=this.bf(a)
x=z[y]
if(x==null)z[y]=[this.bO(a)]
else{if(this.bg(x,a)>=0)return!1
x.push(this.bO(a))}return!0},
ae:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cI(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cI(this.c,b)
else return this.fc(0,b)},
fc:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bf(b)]
x=this.bg(y,b)
if(x<0)return!1
this.cJ(y.splice(x,1)[0])
return!0},
a_:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cH:function(a,b){if(a[b]!=null)return!1
a[b]=this.bO(b)
return!0},
cI:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cJ(z)
delete a[b]
return!0},
bO:function(a){var z,y
z=new P.i0(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cJ:function(a){var z,y
z=a.geP()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
bf:function(a){return J.O(a)&0x3ffffff},
bg:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.K(a[y].gcM(),b))return y
return-1},
$isv:1,
static:{kt:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
i0:{
"^":"a;cM:a<,b,eP:c<"},
dA:{
"^":"a;a,b,c,d",
gG:function(){return this.d},
A:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.W(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
kj:{
"^":"iE;"},
dB:{
"^":"ic;"},
ic:{
"^":"a+b9;",
$isl:1,
$asl:null,
$isv:1},
b9:{
"^":"a;",
gK:function(a){return new H.dC(a,this.gl(a),0,null)},
a3:function(a,b){return this.h(a,b)},
P:function(a,b){var z,y
z=this.gl(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gl(a))throw H.b(new P.W(a))}},
aN:function(a,b){return H.e(new H.cb(a,b),[null,null])},
k:function(a){return P.bw(a,"[","]")},
$isl:1,
$asl:null,
$isv:1},
i4:{
"^":"f:8;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
i1:{
"^":"a2;a,b,c,d",
gK:function(a){return new P.kw(this,this.c,this.d,this.b,null)},
P:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.c(x,y)
b.$1(x[y])
if(z!==this.d)H.M(new P.W(this))}},
gW:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a_:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.c(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bw(this,"{","}")},
dH:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.b(H.c7());++this.d
y=this.a
x=y.length
if(z>=x)return H.c(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ao:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.c(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cO();++this.d},
cO:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,[H.A(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.cB(y,0,w,z,x)
C.a.cB(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
eu:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$isv:1,
static:{ca:function(a,b){var z=H.e(new P.i1(null,0,0,0),[b])
z.eu(a,b)
return z}}},
kw:{
"^":"a;a,b,c,d,e",
gG:function(){return this.e},
A:function(){var z,y,x
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
iF:{
"^":"a;",
aN:function(a,b){return H.e(new H.dm(this,b),[H.A(this,0),null])},
k:function(a){return P.bw(this,"{","}")},
P:function(a,b){var z
for(z=this.gK(this);z.A();)b.$1(z.d)},
$isv:1},
iE:{
"^":"iF;"}}],["","",,P,{
"^":"",
bN:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.km(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bN(a[z])
return a},
cJ:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.b(H.J(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.F(w)
y=x
throw H.b(new P.al(String(y),null,null))}return P.bN(z)},
nf:[function(a){return a.i8()},"$1","lh",2,0,30],
km:{
"^":"a;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.fb(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.at().length
return z},
gW:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.at().length
return z===0},
gak:function(){if(this.b==null)return this.c.gak()
return new P.kn(this)},
p:function(a,b,c){var z,y
if(this.b==null)this.c.p(0,b,c)
else if(this.a2(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.d7().p(0,b,c)},
a2:function(a){if(this.b==null)return this.c.a2(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
ae:function(a,b){if(this.b!=null&&!this.a2(b))return
return this.d7().ae(0,b)},
P:function(a,b){var z,y,x,w
if(this.b==null)return this.c.P(0,b)
z=this.at()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bN(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.b(new P.W(this))}},
k:function(a){return P.cc(this)},
at:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
d7:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.am()
y=this.at()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.p(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
fb:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bN(this.a[a])
return this.b[a]=z},
$isaQ:1,
$asaQ:I.av},
kn:{
"^":"aP;a",
gl:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gl(z)}else z=z.at().length
return z},
a3:function(a,b){var z=this.a
if(z.b==null)z=z.gak().a3(0,b)
else{z=z.at()
if(b<0||b>=z.length)return H.c(z,b)
z=z[b]}return z},
gK:function(a){var z=this.a
if(z.b==null){z=z.gak()
z=z.gK(z)}else{z=z.at()
z=new J.d7(z,z.length,0,null)}return z},
$asaP:I.av,
$asa2:I.av},
de:{
"^":"a;"},
br:{
"^":"a;"},
hd:{
"^":"de;"},
c9:{
"^":"P;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
hV:{
"^":"c9;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
hU:{
"^":"de;a,b",
fP:function(a,b){return P.cJ(a,this.gfQ().a)},
c7:function(a){return this.fP(a,null)},
h8:function(a,b){var z=this.gc9()
return P.kp(a,z.b,z.a)},
h7:function(a){return this.h8(a,null)},
gc9:function(){return C.Q},
gfQ:function(){return C.P}},
hX:{
"^":"br;a,b"},
hW:{
"^":"br;a"},
kq:{
"^":"a;",
dW:function(a){var z,y,x,w,v,u
z=J.D(a)
y=z.gl(a)
if(typeof y!=="number")return H.w(y)
x=0
w=0
for(;w<y;++w){v=z.aq(a,w)
if(v>92)continue
if(v<32){if(w>x)this.cu(a,x,w)
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
break}}else if(v===34||v===92){if(w>x)this.cu(a,x,w)
x=w+1
this.Y(92)
this.Y(v)}}if(x===0)this.U(a)
else if(x<y)this.cu(a,x,y)},
bM:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.b(new P.hV(a,null))}z.push(a)},
cZ:function(a){var z=this.a
if(0>=z.length)return H.c(z,0)
z.pop()},
bv:function(a){var z,y,x,w
if(this.dV(a))return
this.bM(a)
try{z=this.fg(a)
if(!this.dV(z))throw H.b(new P.c9(a,null))
x=this.a
if(0>=x.length)return H.c(x,0)
x.pop()}catch(w){x=H.F(w)
y=x
throw H.b(new P.c9(a,y))}},
dV:function(a){var z,y
if(typeof a==="number"){if(!C.b.ghl(a))return!1
this.hV(a)
return!0}else if(a===!0){this.U("true")
return!0}else if(a===!1){this.U("false")
return!0}else if(a==null){this.U("null")
return!0}else if(typeof a==="string"){this.U("\"")
this.dW(a)
this.U("\"")
return!0}else{z=J.q(a)
if(!!z.$isl){this.bM(a)
this.hT(a)
this.cZ(a)
return!0}else if(!!z.$isaQ){this.bM(a)
y=this.hU(a)
this.cZ(a)
return y}else return!1}},
hT:function(a){var z,y
this.U("[")
z=J.D(a)
if(z.gl(a)>0){this.bv(z.h(a,0))
for(y=1;y<z.gl(a);++y){this.U(",")
this.bv(z.h(a,y))}}this.U("]")},
hU:function(a){var z,y,x,w,v
z={}
if(a.gW(a)){this.U("{}")
return!0}y=J.cV(a.gl(a),2)
if(typeof y!=="number")return H.w(y)
x=Array(y)
z.a=0
z.b=!0
a.P(0,new P.kr(z,x))
if(!z.b)return!1
this.U("{")
for(z=x.length,w="\"",v=0;v<z;v+=2,w=",\""){this.U(w)
this.dW(x[v])
this.U("\":")
y=v+1
if(y>=z)return H.c(x,y)
this.bv(x[y])}this.U("}")
return!0},
fg:function(a){return this.b.$1(a)}},
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
hV:function(a){this.c.a+=C.b.k(a)},
U:function(a){this.c.a+=H.d(a)},
cu:function(a,b,c){this.c.a+=J.fB(a,b,c)},
Y:function(a){this.c.a+=H.aR(a)},
static:{kp:function(a,b,c){var z,y,x
z=new P.bf("")
y=P.lh()
x=new P.ko(z,[],y)
x.bv(a)
y=z.a
return y.charCodeAt(0)==0?y:y}}},
jK:{
"^":"hd;a",
dg:function(a,b){return new P.jL(b==null?this.a:b).c5(a)},
c7:function(a){return this.dg(a,null)},
gc9:function(){return new P.jM()}},
jM:{
"^":"br;",
aY:function(a,b,c){var z,y,x,w,v,u,t
z=J.D(a)
y=z.gl(a)
P.aS(b,c,y,null,null,null)
x=J.a_(y)
w=x.E(y,b)
v=J.q(w)
if(v.v(w,0))return new Uint8Array(H.j(0))
v=H.j(v.m(w,3))
u=new Uint8Array(v)
t=new P.kQ(0,0,u)
if(t.eV(a,b,y)!==y)t.d8(z.aq(a,x.E(y,1)),0)
return new Uint8Array(u.subarray(0,C.V.eN(u,0,t.b,v)))},
c5:function(a){return this.aY(a,0,null)}},
kQ:{
"^":"a;a,b,c",
d8:function(a,b){var z,y,x,w,v
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
eV:function(a,b,c){var z,y,x,w,v,u,t,s
if(b!==c&&(J.f4(a,J.cW(c,1))&64512)===55296)c=J.cW(c,1)
if(typeof c!=="number")return H.w(c)
z=this.c
y=z.length
x=J.cN(a)
w=b
for(;w<c;++w){v=x.aq(a,w)
if(v<=127){u=this.b
if(u>=y)break
this.b=u+1
z[u]=v}else if((v&64512)===55296){if(this.b+3>=y)break
t=w+1
if(this.d8(v,C.h.aq(a,t)))w=t}else if(v<=2047){u=this.b
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
"^":"br;a",
aY:function(a,b,c){var z,y,x,w
z=J.aj(a)
P.aS(b,c,z,null,null,null)
y=new P.bf("")
x=this.a
w=new P.kN(x,y,!0,0,0,0)
w.aY(a,b,z)
if(w.e>0){if(!x)H.M(new P.al("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.aR(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
c5:function(a){return this.aY(a,0,null)}},
kN:{
"^":"a;a,b,c,d,e,f",
aY:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
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
if(typeof q!=="number")return q.cv()
if((q&192)!==128){if(t)throw H.b(new P.al("Bad UTF-8 encoding 0x"+C.b.b9(q,16),null,null))
this.c=!1
u.a+=H.aR(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.c(C.z,p)
if(z<=C.z[p]){if(t)throw H.b(new P.al("Overlong encoding of 0x"+C.c.b9(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.b(new P.al("Character outside valid Unicode range: 0x"+C.c.b9(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.aR(z)
this.c=!1}if(typeof c!=="number")return H.w(c)
for(;r<c;r=n){o=w.$2(a,r)
if(J.a0(o,0)){this.c=!1
if(typeof o!=="number")return H.w(o)
n=r+o
v.$2(r,n)
if(n===c)break
r=n}n=r+1
q=s.h(a,r)
p=J.a_(q)
if(p.a7(q,0)){if(t)throw H.b(new P.al("Negative UTF-8 code unit: -0x"+J.fC(p.cz(q),16),null,null))
u.a+=H.aR(65533)}else{if(typeof q!=="number")return q.cv()
if((q&224)===192){z=q&31
y=1
x=1
continue $loop$0}if((q&240)===224){z=q&15
y=2
x=2
continue $loop$0}if((q&248)===240&&q<245){z=q&7
y=3
x=3
continue $loop$0}if(t)throw H.b(new P.al("Bad UTF-8 encoding 0x"+C.b.b9(q,16),null,null))
this.c=!1
u.a+=H.aR(65533)
z=65533
y=0
x=0}}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
kP:{
"^":"f:20;a",
$2:function(a,b){var z,y,x,w
z=this.a
if(typeof z!=="number")return H.w(z)
y=J.D(a)
x=b
for(;x<z;++x){w=y.h(a,x)
if(typeof w!=="number")return w.cv()
if((w&127)!==w)return x-b}return z-b}},
kO:{
"^":"f:21;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.j0(this.b,a,b)}}}],["","",,P,{
"^":"",
l1:function(a){return H.j2(a)},
j1:function(a,b,c){var z,y,x
if(b<0)throw H.b(P.U(b,0,J.aj(a),null,null))
if(c<b)throw H.b(P.U(c,b,J.aj(a),null,null))
z=J.ax(a)
for(y=0;y<b;++y)if(!z.A())throw H.b(P.U(b,0,y,null,null))
x=[]
for(y=b;y<c;++y){if(!z.A())throw H.b(P.U(c,b,y,null,null))
x.push(z.gG())}return H.e_(x)},
lS:[function(a,b){return J.f5(a,b)},"$2","li",4,0,31],
c2:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.b1(a)
if(typeof a==="string")return JSON.stringify(a)
return P.he(a)},
he:function(a){var z=J.q(a)
if(!!z.$isf)return z.k(a)
return H.bE(a)},
bu:function(a){return new P.k5(a)},
i2:function(a,b,c){var z,y,x
z=J.hO(a,c)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
ba:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.ax(a);y.A();)z.push(y.gG())
if(b)return z
z.fixed$length=Array
return z},
S:function(a){var z=H.d(a)
H.bV(z)},
j0:function(a,b,c){var z
if(typeof a==="object"&&a!==null&&a.constructor===Array){z=a.length
c=P.aS(b,c,z,null,null,null)
return H.e_(b>0||J.aK(c,z)?C.a.ek(a,b,c):a)}if(!!J.q(a).$iscj)return H.it(a,b,P.aS(b,c,a.length,null,null,null))
return P.j1(a,b,c)},
mE:{
"^":"f:22;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.l1(a)}},
cK:{
"^":"a;"},
"+bool":0,
T:{
"^":"a;"},
c1:{
"^":"a;hr:a<,b",
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.c1))return!1
return this.a===b.a&&this.b===b.b},
aK:function(a,b){return C.c.aK(this.a,b.ghr())},
gI:function(a){return this.a},
k:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.h4(z?H.Z(this).getUTCFullYear()+0:H.Z(this).getFullYear()+0)
x=P.b2(z?H.Z(this).getUTCMonth()+1:H.Z(this).getMonth()+1)
w=P.b2(z?H.Z(this).getUTCDate()+0:H.Z(this).getDate()+0)
v=P.b2(z?H.Z(this).getUTCHours()+0:H.Z(this).getHours()+0)
u=P.b2(z?H.Z(this).getUTCMinutes()+0:H.Z(this).getMinutes()+0)
t=P.b2(z?H.Z(this).getUTCSeconds()+0:H.Z(this).getSeconds()+0)
s=P.h5(H.dX(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
es:function(a,b){if(Math.abs(a)>864e13)throw H.b(P.az(a))},
$isT:1,
$asT:I.av,
static:{h3:function(a,b){var z=new P.c1(a,b)
z.es(a,b)
return z},h4:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.d(z)
if(z>=10)return y+"00"+H.d(z)
return y+"000"+H.d(z)},h5:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},b2:function(a){if(a>=10)return""+a
return"0"+a}}},
b0:{
"^":"aw;",
$isT:1,
$asT:function(){return[P.aw]}},
"+double":0,
a9:{
"^":"a;au:a<",
n:function(a,b){return new P.a9(C.c.n(this.a,b.gau()))},
E:function(a,b){return new P.a9(this.a-b.gau())},
m:function(a,b){return new P.a9(C.c.N(this.a*b))},
bd:function(a,b){if(b===0)throw H.b(new P.hx())
return new P.a9(C.c.bd(this.a,b))},
a7:function(a,b){return C.c.a7(this.a,b.gau())},
am:function(a,b){return C.c.am(this.a,b.gau())},
bA:function(a,b){return C.c.bA(this.a,b.gau())},
bx:function(a,b){return C.c.bx(this.a,b.gau())},
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.a9))return!1
return this.a===b.a},
gI:function(a){return this.a&0x1FFFFFFF},
aK:function(a,b){return C.c.aK(this.a,b.gau())},
k:function(a){var z,y,x,w,v
z=new P.hc()
y=this.a
if(y<0)return"-"+new P.a9(-y).k(0)
x=z.$1(C.c.cm(C.c.aw(y,6e7),60))
w=z.$1(C.c.cm(C.c.aw(y,1e6),60))
v=new P.hb().$1(C.c.cm(y,1e6))
return""+C.c.aw(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
cz:function(a){return new P.a9(-this.a)},
$isT:1,
$asT:function(){return[P.a9]}},
hb:{
"^":"f:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
hc:{
"^":"f:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
P:{
"^":"a;",
ga9:function(){return H.R(this.$thrownJsError)}},
dT:{
"^":"P;",
k:function(a){return"Throw of null."}},
ay:{
"^":"P;a,b,c,d",
gbS:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbR:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.d(z)+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gbS()+y+x
if(!this.a)return w
v=this.gbR()
u=P.c2(this.b)
return w+v+": "+H.d(u)},
static:{az:function(a){return new P.ay(!1,null,null,a)},fE:function(a,b,c){return new P.ay(!0,a,b,c)}}},
cs:{
"^":"ay;e,f,a,b,c,d",
gbS:function(){return"RangeError"},
gbR:function(){var z,y,x,w
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else{w=J.a_(x)
if(w.am(x,z))y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=w.a7(x,z)?": Valid value range is empty":": Only valid value is "+H.d(z)}}return y},
static:{iv:function(a){return new P.cs(null,null,!1,null,null,a)},bc:function(a,b,c){return new P.cs(null,null,!0,a,b,"Value not in range")},U:function(a,b,c,d,e){return new P.cs(b,c,!0,a,d,"Invalid value")},aS:function(a,b,c,d,e,f){var z
if(!(0>a)){if(typeof c!=="number")return H.w(c)
z=a>c}else z=!0
if(z)throw H.b(P.U(a,0,c,"start",f))
if(b!=null){if(!(a>b)){if(typeof c!=="number")return H.w(c)
z=b>c}else z=!0
if(z)throw H.b(P.U(b,a,c,"end",f))
return b}return c}}},
hw:{
"^":"ay;e,l:f>,a,b,c,d",
gbS:function(){return"RangeError"},
gbR:function(){P.c2(this.e)
var z=": index should be less than "+H.d(this.f)
return J.aK(this.b,0)?": index must not be negative":z},
static:{bv:function(a,b,c,d,e){var z=e!=null?e:J.aj(b)
return new P.hw(b,z,!0,a,c,"Index out of range")}}},
Q:{
"^":"P;a",
k:function(a){return"Unsupported operation: "+this.a}},
cA:{
"^":"P;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"}},
aT:{
"^":"P;a",
k:function(a){return"Bad state: "+this.a}},
W:{
"^":"P;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.c2(z))+"."}},
ie:{
"^":"a;",
k:function(a){return"Out of Memory"},
ga9:function(){return},
$isP:1},
e2:{
"^":"a;",
k:function(a){return"Stack Overflow"},
ga9:function(){return},
$isP:1},
h1:{
"^":"P;a",
k:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
k5:{
"^":"a;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
al:{
"^":"a;a,b,a0:c>",
k:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.d(z):"FormatException"
return y}},
hx:{
"^":"a;",
k:function(a){return"IntegerDivisionByZeroException"}},
hf:{
"^":"a;a",
k:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z=H.bD(b,"expando$values")
return z==null?null:H.bD(z,this.cN())},
p:function(a,b,c){var z=H.bD(b,"expando$values")
if(z==null){z=new P.a()
H.cr(b,"expando$values",z)}H.cr(z,this.cN(),c)},
cN:function(){var z,y
z=H.bD(this,"expando$key")
if(z==null){y=$.dn
$.dn=y+1
z="expando$key$"+y
H.cr(this,"expando$key",z)}return z}},
hm:{
"^":"a;"},
o:{
"^":"aw;",
$isT:1,
$asT:function(){return[P.aw]}},
"+int":0,
a2:{
"^":"a;",
aN:function(a,b){return H.bz(this,b,H.a4(this,"a2",0),null)},
P:function(a,b){var z
for(z=this.gK(this);z.A();)b.$1(z.gG())},
cr:function(a,b){return P.ba(this,b,H.a4(this,"a2",0))},
cq:function(a){return this.cr(a,!0)},
gl:function(a){var z,y
z=this.gK(this)
for(y=0;z.A();)++y
return y},
a3:function(a,b){var z,y,x
if(b<0)H.M(P.U(b,0,null,"index",null))
for(z=this.gK(this),y=0;z.A();){x=z.gG()
if(b===y)return x;++y}throw H.b(P.bv(b,this,"index",null,y))},
k:function(a){return P.hL(this,"(",")")}},
hN:{
"^":"a;"},
l:{
"^":"a;",
$asl:null,
$isv:1},
"+List":0,
aQ:{
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
gI:function(a){return H.ap(this)},
k:function(a){return H.bE(this)}},
aq:{
"^":"a;"},
ab:{
"^":"a;",
$isT:1,
$asT:function(){return[P.ab]}},
"+String":0,
bf:{
"^":"a;aH:a<",
gl:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{e3:function(a,b,c){var z=J.ax(b)
if(!z.A())return a
if(c.length===0){do a+=H.d(z.gG())
while(z.A())}else{a+=H.d(z.gG())
for(;z.A();)a=a+c+H.d(z.gG())}return a}}},
e4:{
"^":"a;"}}],["","",,W,{
"^":"",
d8:function(a,b,c){return new Blob(a)},
h0:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.O)},
au:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
et:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
ey:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.k_(a)
if(!!J.q(z).$isX)return z
return}else return a},
kX:function(a){if(!!J.q(a).$isdk)return a
return P.lc(a,!0)},
I:function(a){var z=$.n
if(z===C.d)return a
return z.fp(a,!0)},
B:{
"^":"b3;",
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
fJ:{
"^":"i;aF:size=,C:type=",
hX:function(a,b,c,d){return a.slice(b,c,d)},
eg:function(a,b,c){return a.slice(b,c)},
"%":";Blob"},
lO:{
"^":"B;",
gce:function(a){return H.e(new W.C(a,"error",!1),[null])},
gcf:function(a){return H.e(new W.C(a,"load",!1),[null])},
$isX:1,
$isi:1,
"%":"HTMLBodyElement"},
lP:{
"^":"B;C:type=",
"%":"HTMLButtonElement"},
db:{
"^":"B;t:height%,u:width%",
cw:function(a,b,c){return a.getContext(b,P.eJ(c))},
e0:function(a,b,c,d,e,f,g){var z,y
z=P.af(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.cw(a,"webgl",z)
return y==null?this.cw(a,"experimental-webgl",z):y},
e_:function(a,b){return this.e0(a,!0,!0,!0,!0,!1,b)},
$isdb:1,
"%":"HTMLCanvasElement"},
lR:{
"^":"ao;l:length=",
$isi:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
lT:{
"^":"hy;l:length=",
by:function(a,b){var z=this.eX(a,b)
return z!=null?z:""},
eX:function(a,b){if(W.h0(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.h7()+b)},
gt:function(a){return a.height},
gu:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hy:{
"^":"i+h_;"},
h_:{
"^":"a;",
gt:function(a){return this.by(a,"height")},
gaF:function(a){return this.by(a,"size")},
gu:function(a){return this.by(a,"width")}},
h6:{
"^":"i;",
hF:function(a,b,c,d){return a.requestQuota(b,H.V(c,1),H.V(d,1))},
"%":"DeprecatedStorageQuota"},
lU:{
"^":"bs;",
fL:function(a,b,c){return this.eW(a,b,P.af(["create",!0,"exclusive",c]))},
fK:function(a,b){return this.fL(a,b,!1)},
eG:function(a,b,c,d,e){this.eH(a,b,P.eJ(d),e,c)
return},
eH:function(a,b,c,d,e){return a.getFile(b,c,H.V(d,1),H.V(e,1))},
eW:function(a,b,c){var z=H.e(new P.ad(H.e(new P.z(0,$.n,null),[W.bs])),[W.bs])
this.eG(a,b,new W.h8(z),c,new W.h9(z))
return z.a},
"%":"DirectoryEntry"},
h9:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
h8:{
"^":"f:0;a",
$1:function(a){this.a.aj(a)}},
dk:{
"^":"ao;",
$isdk:1,
"%":"Document|HTMLDocument|XMLDocument"},
lV:{
"^":"ao;",
$isi:1,
"%":"DocumentFragment|ShadowRoot"},
lW:{
"^":"i;",
k:function(a){return String(a)},
"%":"DOMException"},
ha:{
"^":"i;c0:bottom=,t:height=,aa:left=,co:right=,aR:top=,u:width=,i:x=,j:y=",
k:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(this.gu(a))+" x "+H.d(this.gt(a))},
v:function(a,b){var z,y,x
if(b==null)return!1
z=J.q(b)
if(!z.$isag)return!1
y=a.left
x=z.gaa(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaR(b)
if(y==null?x==null:y===x){y=this.gu(a)
x=z.gu(b)
if(y==null?x==null:y===x){y=this.gt(a)
z=z.gt(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gI:function(a){var z,y,x,w
z=J.O(a.left)
y=J.O(a.top)
x=J.O(this.gu(a))
w=J.O(this.gt(a))
return W.et(W.au(W.au(W.au(W.au(0,z),y),x),w))},
gcs:function(a){return H.e(new P.Y(a.left,a.top),[null])},
$isag:1,
$asag:I.av,
"%":";DOMRectReadOnly"},
b3:{
"^":"ao;",
ga0:function(a){return P.ix(C.b.N(a.offsetLeft),C.b.N(a.offsetTop),C.b.N(a.offsetWidth),C.b.N(a.offsetHeight),null)},
k:function(a){return a.localName},
dZ:function(a){return a.getBoundingClientRect()},
gce:function(a){return H.e(new W.C(a,"error",!1),[null])},
gcf:function(a){return H.e(new W.C(a,"load",!1),[null])},
gdt:function(a){return H.e(new W.C(a,"mousedown",!1),[null])},
gdu:function(a){return H.e(new W.C(a,"mouseenter",!1),[null])},
gdv:function(a){return H.e(new W.C(a,"mouseleave",!1),[null])},
gdw:function(a){return H.e(new W.C(a,"mousemove",!1),[null])},
gdz:function(a){return H.e(new W.C(a,"mouseout",!1),[null])},
gdA:function(a){return H.e(new W.C(a,"mouseover",!1),[null])},
gdB:function(a){return H.e(new W.C(a,"mouseup",!1),[null])},
$isb3:1,
$isi:1,
$isX:1,
"%":";Element"},
lX:{
"^":"B;t:height%,an:src},C:type=,u:width%",
"%":"HTMLEmbedElement"},
bs:{
"^":"i;",
$isa:1,
"%":";Entry"},
lY:{
"^":"bt;az:error=",
"%":"ErrorEvent"},
bt:{
"^":"i;C:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
X:{
"^":"i;",
d9:function(a,b,c,d){if(c!=null)this.eK(a,b,c,d)},
dG:function(a,b,c,d){if(c!=null)this.fd(a,b,c,d)},
eK:function(a,b,c,d){return a.addEventListener(b,H.V(c,1),d)},
fd:function(a,b,c,d){return a.removeEventListener(b,H.V(c,1),d)},
$isX:1,
"%":"MediaStream;EventTarget"},
mg:{
"^":"B;C:type=",
"%":"HTMLFieldSetElement"},
dp:{
"^":"fJ;",
$isa:1,
"%":"File"},
c4:{
"^":"bs;",
eS:function(a,b,c){return a.createWriter(H.V(b,1),H.V(c,1))},
df:function(a){var z=H.e(new P.ad(H.e(new P.z(0,$.n,null),[W.dr])),[W.dr])
this.eS(a,new W.hg(z),new W.hh(z))
return z.a},
eU:function(a,b,c){return a.file(H.V(b,1),H.V(c,1))},
dj:function(a){var z=H.e(new P.ad(H.e(new P.z(0,$.n,null),[W.dp])),[W.dp])
this.eU(a,new W.hi(z),new W.hj(z))
return z.a},
$isc4:1,
"%":"FileEntry"},
hg:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
hh:{
"^":"f:0;a",
$1:function(a){this.a.aj(a)}},
hi:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
hj:{
"^":"f:0;a",
$1:function(a){this.a.aj(a)}},
hk:{
"^":"X;az:error=",
gcn:function(a){var z=a.result
if(!!J.q(z).$isfL)return H.dR(z,0,null)
return z},
"%":"FileReader"},
dq:{
"^":"i;L:root=",
$isa:1,
"%":"DOMFileSystem"},
dr:{
"^":"X;az:error=,l:length=",
aS:function(a,b){return a.truncate(b)},
ghx:function(a){return H.e(new W.aE(a,"write",!1),[null])},
$isa:1,
"%":"FileWriter"},
mj:{
"^":"B;l:length=",
"%":"HTMLFormElement"},
hu:{
"^":"hv;",
i7:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
hy:function(a,b,c){return a.open(b,c)},
bD:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
hv:{
"^":"X;",
"%":";XMLHttpRequestEventTarget"},
mk:{
"^":"B;t:height%,an:src},u:width%",
"%":"HTMLIFrameElement"},
dt:{
"^":"B;t:height%,an:src},u:width%",
a1:function(a,b){return a.complete.$1(b)},
$isdt:1,
"%":"HTMLImageElement"},
mm:{
"^":"B;t:height%,aF:size=,an:src},C:type=,u:width%",
$isb3:1,
$isi:1,
$isX:1,
"%":"HTMLInputElement"},
mp:{
"^":"B;C:type=",
"%":"HTMLKeygenElement"},
mq:{
"^":"B;C:type=",
"%":"HTMLLinkElement"},
i5:{
"^":"B;az:error=,an:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
mt:{
"^":"B;C:type=",
"%":"HTMLMenuElement"},
mu:{
"^":"B;C:type=",
"%":"HTMLMenuItemElement"},
cf:{
"^":"em;",
ga0:function(a){var z,y
if(!!a.offsetX)return H.e(new P.Y(a.offsetX,a.offsetY),[null])
else{if(!J.q(W.ey(a.target)).$isb3)throw H.b(new P.Q("offsetX is only supported on elements"))
z=W.ey(a.target)
y=H.e(new P.Y(a.clientX,a.clientY),[null]).E(0,J.fq(J.fs(z)))
return H.e(new P.Y(J.d4(y.a),J.d4(y.b)),[null])}},
$iscf:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
mD:{
"^":"i;",
$isi:1,
"%":"Navigator"},
ao:{
"^":"X;",
k:function(a){var z=a.nodeValue
return z==null?this.em(a):z},
$isa:1,
"%":"Attr;Node"},
mF:{
"^":"hB;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.bv(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.b(new P.Q("Cannot assign element of immutable List."))},
a3:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.ao]},
$isv:1,
$isb7:1,
$isb5:1,
"%":"NodeList|RadioNodeList"},
hz:{
"^":"i+b9;",
$isl:1,
$asl:function(){return[W.ao]},
$isv:1},
hB:{
"^":"hz+du;",
$isl:1,
$asl:function(){return[W.ao]},
$isv:1},
mH:{
"^":"B;C:type=",
"%":"HTMLOListElement"},
mI:{
"^":"B;t:height%,C:type=,u:width%",
"%":"HTMLObjectElement"},
mJ:{
"^":"B;C:type=",
"%":"HTMLOutputElement"},
bb:{
"^":"bt;",
$isbb:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
mM:{
"^":"B;an:src},C:type=",
"%":"HTMLScriptElement"},
mO:{
"^":"B;l:length=,aF:size=,C:type=",
"%":"HTMLSelectElement"},
mP:{
"^":"B;an:src},C:type=",
"%":"HTMLSourceElement"},
mQ:{
"^":"bt;az:error=",
"%":"SpeechRecognitionError"},
mS:{
"^":"B;C:type=",
"%":"HTMLStyleElement"},
mW:{
"^":"B;C:type=",
"%":"HTMLTextAreaElement"},
bH:{
"^":"i;",
ghA:function(a){return H.e(new P.Y(C.b.N(a.pageX),C.b.N(a.pageY)),[null])},
$isa:1,
"%":"Touch"},
cz:{
"^":"em;fv:changedTouches=",
$iscz:1,
$isa:1,
"%":"TouchEvent"},
mY:{
"^":"hC;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.bv(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.b(new P.Q("Cannot assign element of immutable List."))},
a3:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.bH]},
$isv:1,
$isb7:1,
$isb5:1,
"%":"TouchList"},
hA:{
"^":"i+b9;",
$isl:1,
$asl:function(){return[W.bH]},
$isv:1},
hC:{
"^":"hA+du;",
$isl:1,
$asl:function(){return[W.bH]},
$isv:1},
mZ:{
"^":"B;an:src}",
"%":"HTMLTrackElement"},
em:{
"^":"bt;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
eo:{
"^":"i5;t:height%,u:width%",
$iseo:1,
"%":"HTMLVideoElement"},
jN:{
"^":"X;",
eJ:function(a,b,c,d,e){return a.webkitRequestFileSystem(b,c,H.V(d,1),H.V(e,1))},
fe:function(a,b,c){var z=H.e(new P.ad(H.e(new P.z(0,$.n,null),[W.dq])),[W.dq])
this.eJ(a,b,c,new W.jO(z),new W.jP(z))
return z.a},
$isi:1,
$isX:1,
"%":"DOMWindow|Window"},
jO:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
jP:{
"^":"f:0;a",
$1:function(a){this.a.aj(a)}},
n5:{
"^":"i;c0:bottom=,t:height=,aa:left=,co:right=,aR:top=,u:width=",
k:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
v:function(a,b){var z,y,x
if(b==null)return!1
z=J.q(b)
if(!z.$isag)return!1
y=a.left
x=z.gaa(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaR(b)
if(y==null?x==null:y===x){y=a.width
x=z.gu(b)
if(y==null?x==null:y===x){y=a.height
z=z.gt(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gI:function(a){var z,y,x,w
z=J.O(a.left)
y=J.O(a.top)
x=J.O(a.width)
w=J.O(a.height)
return W.et(W.au(W.au(W.au(W.au(0,z),y),x),w))},
gcs:function(a){return H.e(new P.Y(a.left,a.top),[null])},
$isag:1,
$asag:I.av,
"%":"ClientRect"},
n6:{
"^":"ao;",
$isi:1,
"%":"DocumentType"},
n7:{
"^":"ha;",
gt:function(a){return a.height},
gu:function(a){return a.width},
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
aE:{
"^":"ar;a,b,c",
aC:function(a,b,c,d){var z=new W.H(0,this.a,this.b,W.I(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.F()
return z},
dq:function(a,b,c){return this.aC(a,null,b,c)}},
C:{
"^":"aE;a,b,c"},
H:{
"^":"iS;a,b,c,d,e",
c1:function(){if(this.b==null)return
this.d6()
this.b=null
this.d=null
return},
ck:function(a,b){if(this.b==null)return;++this.a
this.d6()},
b5:function(a){return this.ck(a,null)},
dJ:function(){if(this.b==null||this.a<=0)return;--this.a
this.F()},
F:function(){var z=this.d
if(z!=null&&this.a<=0)J.eW(this.b,this.c,z,this.e)},
d6:function(){var z=this.d
if(z!=null)J.fw(this.b,this.c,z,this.e)}},
du:{
"^":"a;",
gK:function(a){return new W.hl(a,this.gl(a),-1,null)},
$isl:1,
$asl:null,
$isv:1},
hl:{
"^":"a;a,b,c,d",
A:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bl(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gG:function(){return this.d}},
jZ:{
"^":"a;a",
d9:function(a,b,c,d){return H.M(new P.Q("You can only attach EventListeners to your own window."))},
dG:function(a,b,c,d){return H.M(new P.Q("You can only attach EventListeners to your own window."))},
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
"^":"u;",
$isi:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
lZ:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEBlendElement"},
m_:{
"^":"u;C:type=,t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEColorMatrixElement"},
m0:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEComponentTransferElement"},
m1:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFECompositeElement"},
m2:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEConvolveMatrixElement"},
m3:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEDiffuseLightingElement"},
m4:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEDisplacementMapElement"},
m5:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEFloodElement"},
m6:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEGaussianBlurElement"},
m7:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEImageElement"},
m8:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEMergeElement"},
m9:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEMorphologyElement"},
ma:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFEOffsetElement"},
mb:{
"^":"u;i:x=,j:y=",
"%":"SVGFEPointLightElement"},
mc:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFESpecularLightingElement"},
md:{
"^":"u;i:x=,j:y=",
"%":"SVGFESpotLightElement"},
me:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFETileElement"},
mf:{
"^":"u;C:type=,t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFETurbulenceElement"},
mh:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGFilterElement"},
mi:{
"^":"aB;t:height=,u:width=,i:x=,j:y=",
"%":"SVGForeignObjectElement"},
ht:{
"^":"aB;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
aB:{
"^":"u;",
$isi:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
ml:{
"^":"aB;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGImageElement"},
mr:{
"^":"u;",
$isi:1,
"%":"SVGMarkerElement"},
ms:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGMaskElement"},
mK:{
"^":"u;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGPatternElement"},
mL:{
"^":"ht;t:height=,u:width=,i:x=,j:y=",
"%":"SVGRectElement"},
mN:{
"^":"u;C:type=",
$isi:1,
"%":"SVGScriptElement"},
mT:{
"^":"u;C:type=",
"%":"SVGStyleElement"},
u:{
"^":"b3;",
gce:function(a){return H.e(new W.C(a,"error",!1),[null])},
gcf:function(a){return H.e(new W.C(a,"load",!1),[null])},
gdt:function(a){return H.e(new W.C(a,"mousedown",!1),[null])},
gdu:function(a){return H.e(new W.C(a,"mouseenter",!1),[null])},
gdv:function(a){return H.e(new W.C(a,"mouseleave",!1),[null])},
gdw:function(a){return H.e(new W.C(a,"mousemove",!1),[null])},
gdz:function(a){return H.e(new W.C(a,"mouseout",!1),[null])},
gdA:function(a){return H.e(new W.C(a,"mouseover",!1),[null])},
gdB:function(a){return H.e(new W.C(a,"mouseup",!1),[null])},
$isX:1,
$isi:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
mU:{
"^":"aB;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGSVGElement"},
mV:{
"^":"u;",
$isi:1,
"%":"SVGSymbolElement"},
e6:{
"^":"aB;",
"%":";SVGTextContentElement"},
mX:{
"^":"e6;",
$isi:1,
"%":"SVGTextPathElement"},
j3:{
"^":"e6;i:x=,j:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
n_:{
"^":"aB;t:height=,u:width=,i:x=,j:y=",
$isi:1,
"%":"SVGUseElement"},
n0:{
"^":"u;",
$isi:1,
"%":"SVGViewElement"},
n9:{
"^":"u;",
$isi:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
nb:{
"^":"u;",
$isi:1,
"%":"SVGCursorElement"},
nc:{
"^":"u;",
$isi:1,
"%":"SVGFEDropShadowElement"},
nd:{
"^":"u;",
$isi:1,
"%":"SVGGlyphRefElement"},
ne:{
"^":"u;",
$isi:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iA:{
"^":"i;",
fn:function(a,b,c){return a.bindBuffer(b,c)},
fo:function(a,b,c){return a.bindTexture(b,c)},
fq:function(a,b){return a.blendEquation(b)},
fs:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
ft:function(a,b,c,d){return a.bufferData(b,c,d)},
fw:function(a,b){return a.clear(b)},
fz:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
fA:function(a,b){return a.clearDepth(b)},
fD:function(a,b){return a.clearStencil(b)},
fF:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
fJ:function(a){return a.createBuffer()},
fM:function(a){return a.createProgram()},
fN:function(a,b){return a.createShader(b)},
fO:function(a){return a.createTexture()},
fR:function(a,b){return a.depthFunc(b)},
fS:function(a,b){return a.depthMask(b)},
fZ:function(a,b){return a.disableVertexAttribArray(b)},
h_:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
h5:function(a,b){return a.enable(b)},
h6:function(a,b){return a.enableVertexAttribArray(b)},
dY:function(a,b,c){return a.getAttribLocation(b,c)},
e3:function(a,b){return a.getParameter(b)},
e5:function(a,b,c){return a.getUniformLocation(b,c)},
ei:function(a,b,c,d){return a.stencilFunc(b,c,d)},
ej:function(a,b,c,d){return a.stencilOp(b,c,d)},
hL:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.lb(g))
return}z=J.q(g)
if(!!z.$isdt)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdb)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iseo)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.b(P.az("Incorrect number or type of arguments"))},
hK:function(a,b,c,d,e,f,g){return this.hL(a,b,c,d,e,f,g,null,null,null)},
hM:function(a,b,c,d){return a.texParameteri(b,c,d)},
hR:function(a,b){return a.useProgram(b)},
hS:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
lQ:{
"^":"a;"}}],["","",,P,{
"^":"",
aV:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
eu:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
iu:function(a){return C.t},
kl:{
"^":"a;",
ht:function(a){if(a<=0||a>4294967296)throw H.b(P.iv("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
br:function(){return Math.random()}},
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
gI:function(a){var z,y
z=J.O(this.a)
y=J.O(this.b)
return P.eu(P.aV(P.aV(0,z),y))},
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
E:function(a,b){var z,y,x,w
z=this.a
y=J.k(b)
x=y.gi(b)
if(typeof z!=="number")return z.E()
if(typeof x!=="number")return H.w(x)
w=this.b
y=y.gj(b)
if(typeof w!=="number")return w.E()
if(typeof y!=="number")return H.w(y)
y=new P.Y(z-x,w-y)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
m:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.m()
y=this.b
if(typeof y!=="number")return y.m()
y=new P.Y(z*b,y*b)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y}},
kE:{
"^":"a;",
gco:function(a){return this.gaa(this)+this.c},
gc0:function(a){return this.gaR(this)+this.d},
k:function(a){return"Rectangle ("+this.gaa(this)+", "+this.b+") "+this.c+" x "+this.d},
v:function(a,b){var z,y
if(b==null)return!1
z=J.q(b)
if(!z.$isag)return!1
if(this.gaa(this)===z.gaa(b)){y=this.b
z=y===z.gaR(b)&&this.a+this.c===z.gco(b)&&y+this.d===z.gc0(b)}else z=!1
return z},
gI:function(a){var z=this.b
return P.eu(P.aV(P.aV(P.aV(P.aV(0,this.gaa(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gcs:function(a){var z=new P.Y(this.gaa(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
ag:{
"^":"kE;aa:a>,aR:b>,u:c>,t:d>",
$asag:null,
static:{ix:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.e(new P.ag(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
j:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(P.az("Invalid length "+H.d(a)))
return a},
aW:function(a){return a},
dR:function(a,b,c){return new Uint8Array(a,b)},
dM:{
"^":"i;",
fm:function(a,b,c){return H.dR(a,b,c)},
fl:function(a){return this.fm(a,0,null)},
$isdM:1,
$isfL:1,
"%":"ArrayBuffer"},
ci:{
"^":"i;",
f2:function(a,b,c){throw H.b(P.U(b,0,c,null,null))},
cF:function(a,b,c){if(b>>>0!==b||b>c)this.f2(a,b,c)},
eN:function(a,b,c,d){this.cF(a,b,d)
this.cF(a,c,d)
if(b>c)throw H.b(P.U(b,0,c,null,null))
return c},
$isci:1,
"%":"DataView;ArrayBufferView;cg|dN|dP|ch|dO|dQ|an"},
cg:{
"^":"ci;",
gl:function(a){return a.length},
$isb7:1,
$isb5:1},
ch:{
"^":"dP;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
a[b]=c}},
dN:{
"^":"cg+b9;",
$isl:1,
$asl:function(){return[P.b0]},
$isv:1},
dP:{
"^":"dN+ds;"},
an:{
"^":"dQ;",
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.o]},
$isv:1},
dO:{
"^":"cg+b9;",
$isl:1,
$asl:function(){return[P.o]},
$isv:1},
dQ:{
"^":"dO+ds;"},
mv:{
"^":"ch;",
$isl:1,
$asl:function(){return[P.b0]},
$isv:1,
"%":"Float32Array"},
mw:{
"^":"ch;",
$isl:1,
$asl:function(){return[P.b0]},
$isv:1,
"%":"Float64Array"},
mx:{
"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isv:1,
"%":"Int16Array"},
my:{
"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isv:1,
"%":"Int32Array"},
mz:{
"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isv:1,
"%":"Int8Array"},
mA:{
"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isv:1,
"%":"Uint16Array"},
mB:{
"^":"an;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isv:1,
"%":"Uint32Array"},
mC:{
"^":"an;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isv:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
cj:{
"^":"an;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.M(H.N(a,b))
return a[b]},
$iscj:1,
$isjH:1,
$isl:1,
$asl:function(){return[P.o]},
$isv:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
bV:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
i8:{
"^":"a6;e,f,r,a,b,c,d",
b2:function(){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r
function $async$b2(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:s=v
s=s.r
z=2
return H.h(s.S(0),$async$b2,y)
case 2:s=J
s=s
r=v
r=r.r
z=3
return H.h(r.bz(),$async$b2,y)
case 3:s=u=s.ax(b)
r=v
s,t=r.f
case 4:s=u
if(!s.A()){z=5
break}s=t
s=s
r=u
s.dT(r.gG())
z=4
break
case 5:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$b2,y,null)}},
h2:{
"^":"a;a,b",
bz:function(){var z=0,y=new P.E(),x,w=2,v,u=this,t,s
function $async$bz(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=P
t=t
s=u
x=t.ba(s.a,!0,null)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$bz,y,null)},
bE:function(a){var z=0,y=new P.E(),x=1,w,v=this,u,t
function $async$bE(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=v
u=t.a
t=C
t=t.a
t.sl(u,0)
t=C
t=t.a
t.J(u,a)
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$bE,y,null)},
c6:function(){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q
function $async$c6(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:s=C
s=s.y
s=s
r=P
r=r
q=u
t=s.h7(r.af(["v","1","rank",q.a]))
s=P
s.S("##"+t)
x=t
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$c6,y,null)},
S:function(a){var z=0,y=new P.E(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k,j,i
function $async$S(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
j=u
j=j.b
z=6
return H.h(j.bo("database.dat"),$async$S,y)
case 6:t=c
j=t
j=j
i=t
z=8
return H.h(i.aD(),$async$S,y)
case 8:z=7
return H.h(j.b6(0,c),$async$S,y)
case 7:s=c
j=C
j=j.v
r=j.c7(s)
j=P
j=j
i=H
j.S("##### load database.dat "+i.d(r))
j=C
j=j.y
q=j.c7(r)
j=u
o=j.a
j=C
j=j.a
j.sl(o,0)
j=J
j=j
i=J
n=j.ax(i.bl(q,"rank"))
case 9:j=n
if(!j.A()){z=10
break}j=n
p=j.gG()
j=H
m="##"+j.d(p)
j=H
j.bV(m)
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
case 1:return H.h(w,1,y)}}return H.h(null,$async$S,y,null)},
aE:function(a){var z=0,y=new P.E(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m
function $async$aE(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:o=u
o=o.b
z=2
return H.h(o.bo("database.dat"),$async$aE,y)
case 2:t=c
x=4
o=J
z=7
return H.h(o.d5(t,0),$async$aE,y)
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
return H.h(o.c6(),$async$aE,y)
case 8:q=c
o=J
o=o
n=t
m=C
m=m.v
m=m.gc9()
o.fD(n,m.c5(q),0)
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$aE,y,null)}},
i9:{
"^":"a;a,b,c,d",
a_:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z+1,x=this.b+2,w=x-1,v=0;v<y;++v)for(u=v===z,t=0;t<x;++t)if(t===0||t===w||u)this.Z(t,v).a=C.r
else this.Z(t,v).a=C.e},
Z:function(a,b){var z,y
if(typeof a!=="number")return a.a7()
if(!(a<0)){z=this.c+1
if(!(a>z)){y=J.a_(b)
z=y.a7(b,0)||y.am(b,z)}else z=!0}else z=!0
if(z)return this.d
z=this.a
y=J.cV(b,this.b+2)
if(typeof y!=="number")return H.w(y)
y=a+y
if(y>>>0!==y||y>=z.length)return H.c(z,y)
return z[y]},
fE:function(){var z,y,x,w,v,u
z=[]
for(y=this.c+1-1,x=this.b+2-1,w=0;w<y;++w){u=1
while(!0){if(!(u<x)){v=!0
break}if(this.Z(u,w).a===C.e){v=!1
break}++u}if(v)z.push(w)}C.a.cC(z)
return z},
fC:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.L)(a),++y)this.fB(a[y])},
fB:function(a){var z,y,x,w
for(z=this.b+2-1,y=a;x=J.a_(y),x.bx(y,0);y=x.E(y,1))for(w=1;w<z;++w)if(this.Z(w,x.E(y,1)).a===C.p)this.Z(w,y).a=C.e
else this.Z(w,y).a=this.Z(w,x.E(y,1)).a},
ev:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.c,y=z+1,x=this.b+2,w=this.a,v=x-1,u=0;u<y;++u)for(t=u===z,s=0;s<x;++s)if(s===0||s===v||t)w.push(new F.bA(C.r))
else w.push(new F.bA(C.e))},
static:{dK:function(a,b){var z=new F.i9([],b,a,new F.bA(C.p))
z.ev(a,b)
return z}}},
i6:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
ds:function(){var z,y
z=this.b
if(z.length>0)C.a.dF(z,0)
for(;z.length<3;){y=F.ib()
y.a=(this.a.b+2)/2|0
y.b=0
z.push(y)}},
c8:function(a){var z,y,x,w,v
if(!this.cd(0,1)){z=this.b
if(1>=z.length)return H.c(z,1)
if(this.bm(z[1])){this.c=!0
this.hQ()}z=this.cy
y=$.$get$dF()
x=this.e
if(x>=5)return H.c(y,x)
if(z>=y[x]){this.cy=0
this.ds()
w=this.a.fE()
z=w.length
if(z>0){y=this.d
x=$.$get$dI()
v=this.e
if(v>=5)return H.c(x,v)
v=x[v]
H.ai(v)
H.ai(z)
v=y+Math.pow(v,z)
this.d=v
P.S(H.d(v))}if(z===4)++this.cx
z=this.cx
y=$.$get$dJ()
x=this.e
if(x>=5)return H.c(y,x)
if(z>y[x])if(x+1<5){this.e=x+1
this.cx=0}this.a.fC(w)
this.Q=a}else this.cy=z+1
return!1}else return!0},
dT:function(a){var z
if(a==null)a=this.d
for(z=this.ch;z.length<3;)z.push(0)
z.push(a)
C.a.cC(z)
if(z.length>3)C.a.dF(z,0)},
hQ:function(){return this.dT(null)},
cd:function(a,b){var z,y,x
z=this.b
this.ar(C.a.gH(z),!1)
y=C.a.gH(z)
y.a=J.r(y.a,a)
y=C.a.gH(z)
y.b=J.r(y.b,b)
if(this.bm(C.a.gH(z))){y=C.a.gH(z)
x=y.a
if(typeof x!=="number")return x.E()
y.a=x-a
x=C.a.gH(z)
y=x.b
if(typeof y!=="number")return y.E()
x.b=y-b
this.ar(C.a.gH(z),!0)
return!1}else{this.ar(C.a.gH(z),!0)
return!0}},
hH:function(){var z,y,x,w,v,u
z=this.b
this.ar(C.a.gH(z),!1)
for(y=[0,-1,1,-2,2],x=0;x<5;++x){w=y[x]
v=C.a.gH(z)
v.a=J.r(v.a,w)
C.a.gH(z).dL()
if(!this.bm(C.a.gH(z)))break
else{C.a.gH(z).dK()
v=C.a.gH(z)
u=v.a
if(typeof u!=="number")return u.E()
v.a=u-w}}this.ar(C.a.gH(z),!0)},
hG:function(){var z,y,x,w,v,u
z=this.b
this.ar(C.a.gH(z),!1)
for(y=[0,-1,1,-2,2],x=0;x<5;++x){w=y[x]
v=C.a.gH(z)
v.a=J.r(v.a,w)
C.a.gH(z).dK()
if(!this.bm(C.a.gH(z)))break
else{C.a.gH(z).dL()
v=C.a.gH(z)
u=v.a
if(typeof u!=="number")return u.E()
v.a=u-w}}this.ar(C.a.gH(z),!0)},
bm:function(a){var z,y,x,w,v
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.k(w)
v=this.a.Z(J.r(a.a,v.gi(w)),J.r(a.b,v.gj(w))).a
if(!(v===C.e||v===C.p))return!0}return!1},
ar:function(a,b){var z,y,x,w,v,u
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.k(w)
u=this.a.Z(J.r(a.a,v.gi(w)),J.r(a.b,v.gj(w)))
if(u.a!==C.p)if(b)u.a=v.gC(w)
else u.a=C.e}}},
aa:{
"^":"a;a",
k:function(a){return C.S.h(0,this.a)}},
aD:{
"^":"a;i:a*,j:b*,c",
dL:function(){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.k(w)
u=v.gi(w)
t=v.gj(w)
if(typeof t!=="number")return H.w(t)
v.si(w,-1*t)
v.sj(w,u)}},
dK:function(){var z,y,x,w,v,u
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.k(w)
u=v.gi(w)
v.si(w,v.gj(w))
if(typeof u!=="number")return H.w(u)
v.sj(w,-1*u)}},
static:{ib:function(){switch($.$get$dL().ht(7)){case 0:var z=[]
z.push(new F.y(0,0,C.i))
z.push(new F.y(-1,0,C.i))
z.push(new F.y(1,0,C.i))
z.push(new F.y(2,0,C.i))
return new F.aD(0,0,z)
case 1:z=[]
z.push(new F.y(0,0,C.j))
z.push(new F.y(1,0,C.j))
z.push(new F.y(0,-1,C.j))
z.push(new F.y(1,-1,C.j))
return new F.aD(0,0,z)
case 2:z=[]
z.push(new F.y(0,0,C.k))
z.push(new F.y(1,0,C.k))
z.push(new F.y(0,-1,C.k))
z.push(new F.y(-1,-1,C.k))
return new F.aD(0,0,z)
case 3:z=[]
z.push(new F.y(0,0,C.l))
z.push(new F.y(-1,0,C.l))
z.push(new F.y(0,-1,C.l))
z.push(new F.y(1,-1,C.l))
return new F.aD(0,0,z)
case 4:z=[]
z.push(new F.y(1,0,C.o))
z.push(new F.y(1,-1,C.o))
z.push(new F.y(0,0,C.o))
z.push(new F.y(-1,0,C.o))
return new F.aD(0,0,z)
case 5:z=[]
z.push(new F.y(-1,0,C.m))
z.push(new F.y(-1,-1,C.m))
z.push(new F.y(0,0,C.m))
z.push(new F.y(1,0,C.m))
return new F.aD(0,0,z)
case 6:z=[]
z.push(new F.y(-1,0,C.n))
z.push(new F.y(0,-1,C.n))
z.push(new F.y(0,0,C.n))
z.push(new F.y(1,0,C.n))
return new F.aD(0,0,z)
case 7:H.bV("#### WARNING")
break}}}},
y:{
"^":"bA;i:b*,j:c*,a"},
bA:{
"^":"a;C:a>"},
ia:{
"^":"a6;e,f,a,b,c,d",
a6:function(a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=new F.x(0,0,7,7)
y=F.a7(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.Z(v,x).a
if(u===C.r)y.a=$.$get$cl()
else if(u===C.e)y.a=$.$get$ck()
else if(u===C.i)y.a=$.$get$cn()
else if(u===C.j)y.a=$.$get$bC()
else if(u===C.n)y.a=$.$get$cp()
else if(u===C.k)y.a=$.$get$co()
else if(u===C.l)y.a=$.$get$cq()
else if(u===C.m)y.a=$.$get$cm()
else if(u===C.o)y.a=$.$get$bB()
else y.a=$.$get$bB()
if(y.b===C.f){t=a2.ai()
s=z.a
r=z.b
q=J.r(s,z.c)
p=J.r(z.b,z.d)
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.m(0,new E.m(u))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.m(0,new E.m(u))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.m(0,new E.m(u))
u=new Float64Array(3)
u[0]=q
u[1]=p
u[2]=0
l=t.m(0,new E.m(u))
u=y.a.a
a2.O(a1,o,n,m,l,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{t=a2.ai()
s=z.a
r=z.b
q=J.r(s,z.c)
p=J.r(z.b,z.d)
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.m(0,new E.m(u))
u=y.c
if(typeof s!=="number")return s.E()
if(typeof r!=="number")return r.E()
k=new Float64Array(3)
k[0]=s-u
k[1]=r-u
k[2]=0
j=t.m(0,new E.m(k))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.m(0,new E.m(u))
u=y.c
k=J.a3(p)
i=k.n(p,u)
h=new Float64Array(3)
h[0]=s-u
h[1]=i
h[2]=0
g=t.m(0,new E.m(h))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.m(0,new E.m(u))
u=J.a3(q)
i=u.n(q,y.c)
h=y.c
f=new Float64Array(3)
f[0]=i
f[1]=r-h
f[2]=0
e=t.m(0,new E.m(f))
i=new Float64Array(3)
i[0]=q
i[1]=p
i[2]=0
l=t.m(0,new E.m(i))
u=u.n(q,y.c)
k=k.n(p,y.c)
i=new Float64Array(3)
i[0]=u
i[1]=k
i[2]=0
d=t.m(0,new E.m(i))
i=y.a.a
c=(i>>>16&255)/255
b=(i>>>8&255)/255
a=(i>>>0&255)/255
a0=(i>>>24&255)/255
a2.O(a1,j,g,o,n,c,b,a,a0)
a2.O(a1,g,d,n,l,c,b,a,a0)
a2.O(a1,d,e,l,m,c,b,a,a0)
a2.O(a1,e,j,m,o,c,b,a,a0)}}}},
fN:{
"^":"a6;L:e>,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,a,b,c,d",
hP:function(a){var z,y,x
for(z=this.dx,y=0,x=0;x<4;++x)if(a>=z[x])y=x
return y},
aO:function(a,b,c,d,e,f,g){if(this.fx&&c==="pointerup"){this.fx=!1
this.e.ap().X(new F.fS(this))}else if(c==="pointerdown")this.fx=!0
return!1},
a6:function(a,b){var z=this.r
if(z!=null)b.ay(a,z,this.x,this.y,this.cy)
z=this.z
if(z!=null&&this.cx!=null)this.cx.h2(a,b,z,this.db,20,new F.x(40,230,350,200))},
er:function(a,b,c){var z,y
z=this.hP(c)
y=this.fr
if(z>=4)return H.c(y,z)
this.db=y[z]
y=this.f
y.R(this.dy[z]).X(new F.fP(this))
y.R("assets/font_a.png").X(new F.fQ(this))
y.al("assets/font_a.json").X(new F.fR(this))},
static:{fO:function(a,b,c){var z,y
z=F.a7(null)
y=new E.t(new Float64Array(H.j(16)))
y.w()
y=new F.fN(b,a,null,null,null,null,null,null,null,z,"",[0,5000,2e4,1e5],["assets/bg_clear01.png","assets/bg_clear02.png","assets/bg_clear03.png","assets/bg_clear04.png"],["\u305d\u3057\u3066\u3001\u30df\u30ce\u30fc\u30f3\u306e\u96ea\u304c\u964d\u3063\u305f\u3002","\u30df\u30ce\u30fc\u30f3\u304c\u4ef2\u9593\u306b\u306a\u3063\u305f\u3002","\u95c7\u304c\u8fba\u308a\u3092\u7167\u3089\u3057\u305f\u3002","\u30df\u30fc\u30c6\u30a3\u30a2\u3092\u8a60\u5531\u3057\u305f\u3002"],!1,"none",null,y,!1)
y.b=[]
y.er(a,b,c)
return y}}},
fP:{
"^":"f:0;a",
$1:function(a){var z=this.a
z.r=a
z.x=new F.x(0,0,J.G(a.gT()),J.G(z.r.ga4()))
z.y=new F.x(0,0,400,300)}},
fQ:{
"^":"f:0;a",
$1:function(a){var z=this.a
z.z=a
z.Q=new F.x(0,0,0,0)
z.ch=new F.x(0,0,0,0)}},
fR:{
"^":"f:3;a",
$1:function(a){this.a.cx=F.fG(a)}},
fS:{
"^":"f:0;a",
$1:function(a){var z,y
z=this.a
y=z.e
y.B(F.dU(z.f,y))}},
i7:{
"^":"a6;e,f,a,b,c,d",
ee:function(a){var z,y,x,w,v,u,t,s,r
this.f.a_(0)
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=this.f
u=J.k(w)
t=u.gi(w)
if(typeof t!=="number")return H.w(t)
s=u.gj(w)
if(typeof s!=="number")return H.w(s)
r=v.Z(3+t,3+s)
if(r.a!==C.p)r.a=u.gC(w)}},
a6:function(a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=new F.x(0,0,7,7)
y=F.a7(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.Z(v,x).a
if(u===C.r)y.a=$.$get$cl()
else if(u===C.e)y.a=$.$get$ck()
else if(u===C.i)y.a=$.$get$cn()
else if(u===C.j)y.a=$.$get$bC()
else if(u===C.n)y.a=$.$get$cp()
else if(u===C.k)y.a=$.$get$co()
else if(u===C.l)y.a=$.$get$cq()
else if(u===C.m)y.a=$.$get$cm()
else if(u===C.o)y.a=$.$get$bB()
else y.a=$.$get$bC()
if(y.b===C.f){t=a2.ai()
s=z.a
r=z.b
q=J.r(s,z.c)
p=J.r(z.b,z.d)
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.m(0,new E.m(u))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.m(0,new E.m(u))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.m(0,new E.m(u))
u=new Float64Array(3)
u[0]=q
u[1]=p
u[2]=0
l=t.m(0,new E.m(u))
u=y.a.a
a2.O(a1,o,n,m,l,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{t=a2.ai()
s=z.a
r=z.b
q=J.r(s,z.c)
p=J.r(z.b,z.d)
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.m(0,new E.m(u))
u=y.c
if(typeof s!=="number")return s.E()
if(typeof r!=="number")return r.E()
k=new Float64Array(3)
k[0]=s-u
k[1]=r-u
k[2]=0
j=t.m(0,new E.m(k))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.m(0,new E.m(u))
u=y.c
k=J.a3(p)
i=k.n(p,u)
h=new Float64Array(3)
h[0]=s-u
h[1]=i
h[2]=0
g=t.m(0,new E.m(h))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.m(0,new E.m(u))
u=J.a3(q)
i=u.n(q,y.c)
h=y.c
f=new Float64Array(3)
f[0]=i
f[1]=r-h
f[2]=0
e=t.m(0,new E.m(f))
i=new Float64Array(3)
i[0]=q
i[1]=p
i[2]=0
l=t.m(0,new E.m(i))
u=u.n(q,y.c)
k=k.n(p,y.c)
i=new Float64Array(3)
i[0]=u
i[1]=k
i[2]=0
d=t.m(0,new E.m(i))
i=y.a.a
c=(i>>>16&255)/255
b=(i>>>8&255)/255
a=(i>>>0&255)/255
a0=(i>>>24&255)/255
a2.O(a1,j,g,o,n,c,b,a,a0)
a2.O(a1,g,d,n,l,c,b,a,a0)
a2.O(a1,d,e,l,m,c,b,a,a0)
a2.O(a1,e,j,m,o,c,b,a,a0)}}}},
ih:{
"^":"a6;e,L:f>,r,x,y,z,Q,ch,cx,cy,db,dx,a,b,c,d",
cg:function(a,b){var z,y,x,w,v
z=this.r
this.cx.r=z.d
this.cy.r=z.e+1
y=z.b
x=y.length
if(x>1&&!0){w=this.ch
if(1>=x)return H.c(y,1)
w.ee(y[1])}y=z.z
x=$.$get$dE()
w=z.e
if(w>=5)return H.c(x,w)
if(y+x[w]<b){z.z=b
z.c8(b)}y=this.x
x=y.z
w=y.r
x/=w
if(!(x>0.5))v=y.db&&y.cy&&y.ch/w>0.5
else v=!0
if(v){y.db=!1
if(!this.x.cy){y=z.r
x=$.$get$cd()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.r=b
z.cd(1,0)}}else{if(!(x<-0.5))x=y.db&&y.cy&&y.ch/w<-0.5
else x=!0
if(x){y.db=!1
if(y.cy&&y.ch/w<-0.5)P.S("------------hotX up")
if(!this.x.cy){y=z.r
x=$.$get$cd()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.r=b
z.cd(-1,0)}}}y=this.x
x=-y.Q/y.r
if(x<-0.6){if(!y.cy){y=z.x
x=$.$get$dG()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.x=b
z.c8(b)}}else if(x>0.7){if(!y.cy){y=z.Q
x=$.$get$dH()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y)z.c8(b)}y=this.y
if(!y.r)x=y.db&&y.cy
else x=!0
if(x){y.db=!1
if(!y.cy){y=z.y
x=$.$get$ce()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.y=b
z.hH()}}y=this.z
if(!y.r)x=y.db&&y.cy
else x=!0
if(x){y.db=!1
if(!y.cy){y=z.y
x=$.$get$ce()
w=z.e
if(w>=5)return H.c(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.y=b
z.hG()}}if(z.c)this.f.ap().X(new F.il(this))
this.x.cy=!1
this.z.cy=!1
this.y.cy=!1},
dD:[function(a){},"$1","gdC",2,0,3],
ew:function(a,b,c,d){var z,y,x,w,v
z=this.gdC()
y=F.p(170,255,170,204)
x=F.p(170,204,170,255)
w=F.p(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.w()
v=new F.as(40,40,!1,!1,"r",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
v.b=[]
this.y=v
z=this.gdC()
y=F.p(170,255,170,204)
x=F.p(170,204,170,255)
w=F.p(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.w()
v=new F.as(40,40,!1,!1,"l",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
v.b=[]
this.z=v
z=new E.t(new Float64Array(H.j(16)))
z.w()
z=new F.jg("joystick",70,35,!1,0,0,0,0,0,!1,!1,"none",null,z,!1)
z.b=[]
this.x=z
z=this.e
y=this.r
x=y.a
w=new E.t(new Float64Array(H.j(16)))
w.w()
w=new F.ia(z,x,"none",null,w,!1)
w.b=[]
this.Q=w
x=new E.t(new Float64Array(H.j(16)))
x.w()
x=new F.i7(z,null,"none",null,x,!1)
x.b=[]
x.f=F.dK(5,5)
this.ch=x
x=this.db
w=this.dx
v=new E.t(new Float64Array(H.j(16)))
v.w()
v=new F.bd(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cx=v
x=this.db
w=this.dx
v=new E.t(new Float64Array(H.j(16)))
v.w()
v=new F.bd(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cy=v
v.x=3
this.B(this.Q)
this.B(this.x)
this.B(this.y)
this.B(this.z)
this.B(this.ch)
this.B(this.cx)
this.B(this.cy)
this.Q.c.M(0,100,25,0)
this.x.c.M(0,100,250,0)
this.z.c.M(0,250,225,0)
this.y.c.M(0,300,225,0)
this.ch.c.M(0,225,153,0)
this.cx.c.M(0,225,50,0)
this.cy.c.M(0,225,85,0)
z.R("assets/se_play.png").X(new F.ij(this))
z.b3("assets/se_play.json").X(new F.ik(this))
y.f=d
y.e=d
P.S("### game =  "+d)},
static:{ii:function(a,b,c,d){var z=new E.t(new Float64Array(H.j(16)))
z.w()
z=new F.ih(a,b,c,null,null,null,null,null,null,null,null,null,"none",null,z,!1)
z.b=[]
z.ew(a,b,c,d)
return z}}},
ij:{
"^":"f:23;a",
$1:function(a){var z=this.a
z.dx=a
z.cx.f=a
z.cy.f=a}},
ik:{
"^":"f:3;a",
$1:function(a){var z,y
z=this.a
y=new F.ct(a,[])
y.cj(a)
z.db=y
z.cx.e=y
z.cy.e=y}},
il:{
"^":"f:24;a",
$1:function(a){var z=0,y=new P.E(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:o=u
s=o.a
o=s
r=o.f
o=r
o=o
n=F
n=n
m=s
m=m.e
l=r
k=s
k=k.r
o.B(n.fO(m,l,k.d))
x=3
o=P
o.S("--a")
o=s
r=o.f
o=r
o=o.r
o=o
n=r
n=n.f
z=6
return H.h(o.bE(n.ch),$async$$1,y)
case 6:o=P
o.S("--b")
o=s
o=o.f
o=o.r
z=7
return H.h(o.aE(0),$async$$1,y)
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
im:{
"^":"a6;e,L:f>,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
hu:[function(a){P.S("touch # "+a)
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
break}},"$1","gb4",2,0,3],
i6:[function(a){P.S("touch # "+a)
this.f.ap().X(new F.iq(this))},"$1","ghw",2,0,3],
aO:function(a,b,c,d,e,f,g){return!1},
a6:function(a,b){var z,y,x
z=this.e
if(z!=null&&this.Q!=null){y=this.z
b.ay(a,z,this.Q.aA("BG001.png").gaV(),this.y,y)
b.ay(a,this.e,this.Q.aA("CH001.png").gaV(),new F.x(this.dx,this.dy,35,35),y)}z=this.cx
y=this.f.f.ch
x=y.length
z.r=x>=3?y[2]:0
z=this.cy
z.r=x>=2?y[1]:0
z=this.db
z.r=x>=1?y[0]:0},
ex:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
z.R("assets/se_setting.gif").X(new F.io(this))
z.b3("assets/se_setting.json").X(new F.ip(this))
z=this.gb4()
y=F.p(170,255,170,204)
x=F.p(170,204,170,255)
w=F.p(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.w()
u=new F.as(45,45,!1,!1,"L01",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
u.b=[]
u.z=F.p(0,255,255,255)
v.M(0,70,50,0)
z=this.gb4()
y=F.p(170,255,170,204)
x=F.p(170,204,170,255)
w=F.p(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.w()
t=new F.as(45,45,!1,!1,"L02",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
t.b=[]
t.z=F.p(0,255,255,255)
v.M(0,120,50,0)
z=this.gb4()
y=F.p(170,255,170,204)
x=F.p(170,204,170,255)
w=F.p(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.w()
s=new F.as(45,45,!1,!1,"L03",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
s.b=[]
s.z=F.p(0,255,255,255)
v.M(0,175,50,0)
z=this.gb4()
y=F.p(170,255,170,204)
x=F.p(170,204,170,255)
w=F.p(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.w()
r=new F.as(45,45,!1,!1,"L04",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
r.b=[]
r.z=F.p(0,255,255,255)
v.M(0,215,50,0)
z=this.gb4()
y=F.p(170,255,170,204)
x=F.p(170,204,170,255)
w=F.p(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.w()
q=new F.as(45,45,!1,!1,"L05",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
q.b=[]
q.z=F.p(0,255,255,255)
v.M(0,265,50,0)
this.B(u)
this.B(t)
this.B(s)
this.B(r)
this.B(q)
z=new E.t(new Float64Array(H.j(16)))
z.w()
y=new F.bd(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cx=y
z.M(0,90,220,0)
z=new E.t(new Float64Array(H.j(16)))
z.w()
y=new F.bd(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cy=y
z.M(0,90,247,0)
z=new E.t(new Float64Array(H.j(16)))
z.w()
y=new F.bd(null,null,0,7,"none",null,z,!1)
y.b=[]
this.db=y
z.M(0,90,278,0)
this.B(this.cx)
this.B(this.cy)
this.B(this.db)
this.ch=1
this.hu("L01")
z=this.ghw()
y=F.p(170,255,170,204)
x=F.p(170,204,170,255)
w=F.p(170,204,255,170)
v=new E.t(new Float64Array(H.j(16)))
v.w()
p=new F.as(170,50,!1,!1,"start",y,x,w,z,!1,!1,0,0,"none",null,v,!1)
p.b=[]
v.M(0,230,250,0)
p.z=F.p(0,255,255,255)
this.B(p)},
static:{dU:function(a,b){var z,y
z=F.a7(null)
y=new E.t(new Float64Array(H.j(16)))
y.w()
y=new F.im(null,b,a,null,null,z,null,1,null,null,null,0,0,"none",null,y,!1)
y.b=[]
y.ex(a,b)
return y}}},
io:{
"^":"f:0;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.x(0,0,J.G(a.gT()),J.G(z.e.ga4()))
z.y=new F.x(0,0,400,300)
z.cx.f=a
z.cy.f=a
z.db.f=a}},
ip:{
"^":"f:3;a",
$1:function(a){var z,y
z=this.a
y=new F.ct(a,[])
y.cj(a)
z.Q=y
z.cx.e=y
z.cy.e=y
z.db.e=y}},
iq:{
"^":"f:0;a",
$1:function(a){var z,y
z=this.a
P.S("### level =  "+z.ch)
y=z.f.f
y.a.a_(0)
y.c=!1
y.d=0
y.e=y.f
y=z.f
y.B(F.ii(z.r,y,y.f,z.ch))}},
iB:{
"^":"a6;L:e>,f,r,a,b,c,d",
S:function(a){var z=0,y=new P.E(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k
function $async$S(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
o=u
t=o.f
o=P
o=o
n=t
n=n.R("assets/bg_clear01.png")
m=t
m=m.R("assets/bg_clear02.png")
l=t
l=l.R("assets/bg_clear03.png")
k=t
z=6
return H.h(o.c5([n,m,l,k.R("assets/bg_clear04.png")],null,!1),$async$S,y)
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
n=n.R("assets/se_start.gif")
m=t
m=m.al("assets/se_start.json")
l=t
l=l.al("assets/se_play.json")
k=t
z=11
return H.h(o.c5([n,m,l,k.R("assets/se_play.png")],null,!1),$async$S,y)
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
n=n.R("assets/se_setting.gif")
m=t
m=m.al("assets/se_setting.json")
l=t
l=l.R("assets/font_a.png")
k=t
z=16
return H.h(o.c5([n,m,l,k.al("assets/font_a.json")],null,!1),$async$S,y)
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
return H.h(o.ap(),$async$S,y)
case 17:o=u
t=o.e
o=t
o=o
n=F
n=n
m=u
z=18
return H.h(o.B(n.iN(m.f,t)),$async$S,y)
case 18:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$S,y,null)},
a6:function(a,b){var z,y
z=100+C.H.bB(++this.r/2,10)*5
y=-z/2
b.aL(a,new F.x(y+200,y+150,z,z),F.a7(F.p(170,255,170,170)))}},
bd:{
"^":"a6;e,f,r,aF:x>,a,b,c,d",
a6:function(a,b){var z,y,x,w
if(this.e==null||this.f==null)return
for(z=0;y=this.x,z<y;++z){x=y-1-z
if(x===0)x=1
else x=Math.pow(10,x)
x=J.eV(this.r,x)
if(typeof x!=="number")return x.bB()
y=C.c.bB(x,10)
w=new F.e8(null,C.f,1)
w.a=F.p(255,255,255,255)
b.ay(a,this.f,this.e.aA("NUM00"+y+".png").gaV(),new F.x(z*12,0,15,15),w)}}},
iM:{
"^":"a6;e,f,L:r>,x,y,z,Q,a,b,c,d",
aO:function(a,b,c,d,e,f,g){if(this.Q&&c==="pointerup"){this.Q=!1
this.r.ap().X(new F.iQ(this))}else if(c==="pointerdown")this.Q=!0
return!1},
a6:function(a,b){var z=this.e
if(z!=null&&this.f!=null){b.ay(a,z,this.f.aA("BG001.png").gaV(),this.f.aA("BG001.png").gh4(),this.y)
this.z.hv(a,b,this)}},
ez:function(a,b){var z=this.x
z.R("assets/se_start.gif").X(new F.iO(this))
z.al("assets/se_start.json").X(new F.iP(this))},
static:{iN:function(a,b){var z,y,x
z=F.a7(null)
y=F.iI()
x=new E.t(new Float64Array(H.j(16)))
x.w()
x=new F.iM(null,null,b,a,z,y,!1,"none",null,x,!1)
x.b=[]
x.ez(a,b)
return x}}},
iO:{
"^":"f:0;a",
$1:function(a){this.a.e=a}},
iP:{
"^":"f:0;a",
$1:function(a){var z=new F.ct(a,[])
z.cj(a)
this.a.f=z}},
iQ:{
"^":"f:0;a",
$1:function(a){var z,y
z=this.a
y=z.r
y.B(F.dU(z.x,y))}},
iG:{
"^":"a;i:a*,j:b*,c,d,C:e>,f",
dI:function(a){var z=this.f
this.a=z.br()*400
this.b=-1*z.br()*100
this.c=z.br()-0.5
this.d=z.br()}},
iH:{
"^":"a;a,b",
hv:function(a,b,c){var z,y,x,w,v,u,t,s
if(c.e!=null&&c.f!=null)for(z=this.a,y=z.length,x=c.y,w=0;w<z.length;z.length===y||(0,H.L)(z),++w){v=z[w]
u=c.f.aA(v.e).e
b.ay(a,c.e,c.f.aA(v.e).gaV(),new F.x(v.a,v.b,u.a/3,u.b/3),x)
v.a=J.r(v.a,v.c)
t=J.r(v.b,v.d)
v.b=t
v.d+=0.001
s=v.a
if(typeof s!=="number")return s.a7()
if(!(s<0))if(!(s>400)){if(typeof t!=="number")return t.am()
t=t>300}else t=!0
else t=!0
if(t)v.dI(0)}},
ey:function(){var z,y,x
for(z=this.a,y=1;y<=7;++y){x="B00"+y+".png"
x=new F.iG(0,0,0,0,x,C.t)
x.dI(0)
z.push(x)}},
static:{iI:function(){var z=new F.iH([],C.t)
z.ey()
return z}}}}],["","",,P,{
"^":"",
eJ:function(a){var z={}
a.P(0,new P.la(z))
return z},
lc:function(a,b){var z=[]
return new P.lf(b,new P.ld([],z),new P.le(z),new P.lg(z)).$1(a)},
lb:function(a){return a},
dj:function(){var z=$.di
if(z==null){z=J.bY(window.navigator.userAgent,"Opera",0)
$.di=z}return z},
h7:function(){var z,y
z=$.df
if(z!=null)return z
y=$.dg
if(y==null){y=J.bY(window.navigator.userAgent,"Firefox",0)
$.dg=y}if(y===!0)z="-moz-"
else{y=$.dh
if(y==null){y=P.dj()!==!0&&J.bY(window.navigator.userAgent,"Trident/",0)
$.dh=y}if(y===!0)z="-ms-"
else z=P.dj()===!0?"-o-":"-webkit-"}$.df=z
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
if(a instanceof Date)return P.h3(a.getTime(),!0)
if(a instanceof RegExp)throw H.b(new P.cA("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.am()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.L)(w),++u){t=w[u]
x.p(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.D(a)
s=w.gl(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.w(s)
v=J.b_(x)
r=0
for(;r<s;++r)v.p(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
eO:[function(){var z=0,y=new P.E(),x=1,w,v,u,t,s,r,q,p,o
function $async$eO(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
p=p.am()
o=P
v=new q.jc(700,500,p,o.am())
q=E
q=q
p=Float64Array
o=H
u=new q.t(new p(o.j(16)))
q=u
q.w()
q=F
t=new q.jf(400,300,1,1,1,0,0,null,"none",null,u,!1)
q=t
q.b=[]
q=t
p=F
q.ch=p.p(255,238,238,255)
q=E
q=q
p=Float64Array
o=H
u=new q.t(new p(o.j(16)))
q=u
q.w()
q=G
s=new q.jw(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
q=s
p=G
q.a=p.jl(400,600)
q=s
q.sL(0,t)
q=s
q.hs()
q=s
q.hO()
q=s
q.x=!0
q=s
z=!q.d?2:3
break
case 2:q=s
q.d=!0
q=s
q.be()
case 3:q=F
q=q
p=F
u=new q.i6(p.dK(21,11),[],!1,0,1,1,0,0,0,0,0,[0,0,0],0,0)
q=u
q.ds()
q=E
q=q
p=Float64Array
o=H
r=new q.t(new p(o.j(16)))
q=r
q.w()
q=F
r=new q.i8(v,u,null,"none",null,r,!1)
q=r
q.b=[]
q=r
p=F
q.r=new p.h2([0,0,0],v)
q=E
q=q
p=Float64Array
o=H
u=new q.t(new p(o.j(16)))
q=u
q.w()
q=F
u=new q.iB(r,v,0,"none",null,u,!1)
q=u
q.b=[]
q=u
q.S(0)
q=r
q.B(u)
q=r
q.b2()
q=t
q.B(r)
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$eO,y,null)},"$0","eP",0,0,1]},1],["","",,F,{
"^":"",
bx:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.L)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.aX(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fI:{
"^":"a;a",
k:function(a){return C.T.h(0,this.a)}},
fF:{
"^":"a;a,b,c",
e1:function(a){var z=this.a
if(z.a2(a))return z.h(0,a)
else return z.h(0,this.b)},
h3:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o
z=new F.x(0,0,0,0)
y=new F.x(0,0,0,0)
x=f.a
w=f.b
v=J.G(c.gT())
u=J.G(c.ga4())
for(t=new H.fX(d),t=t.gK(t),s=this.c,r=e+5;t.A();){q=this.e1(t.d)
z.c=q.bc(v,u).c
z.d=q.bc(v,u).d
z.a=q.bc(v,u).a
z.b=q.bc(v,u).b
y.a=x
y.b=w
p=z.c*e/z.d
y.c=p
y.d=e
p=J.r(x,p)
o=f.c
if(typeof p!=="number")return p.am()
if(p>o){y.a=f.a
y.b=J.r(y.b,r)}b.ay(a,c,z,y,s)
x=J.r(J.r(y.a,y.c),2)
w=y.b}},
h2:function(a,b,c,d,e,f){return this.h3(a,b,c,d,e,f,C.A)},
eq:function(a){var z,y,x,w,v,u
z=P.cJ(a,null)
for(y=z.gak(),y=y.gK(y),x=this.a;y.A();){w=y.gG()
v=z.h(0,w)
u=J.D(v)
x.p(0,H.ir(w,null,null),new F.fH(J.G(u.h(v,"u")),J.G(u.h(v,"v")),J.G(u.h(v,"w")),J.G(u.h(v,"h")),J.G(u.h(v,"vx")),J.G(u.h(v,"vy")),J.G(u.h(v,"vw")),J.G(u.h(v,"vh")),new F.cx(0,0),new F.x(0,0,0,0)))}},
static:{fG:function(a){var z=new F.fF(P.am(),32,F.a7(null))
z.eq(a)
return z}}},
fH:{
"^":"a;a,b,T:c<,a4:d<,e,f,r,x,y,z",
bc:function(a,b){var z,y
z=this.z
z.a=a*this.a
y=this.d*b
z.b=b-b*this.b-y
z.c=this.c*a
z.d=y
return z}},
as:{
"^":"a6;T:e<,a4:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
dd:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
aO:function(a,b,c,d,e,f,g){switch(c){case"pointerdown":if(this.dd(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.db=!0}break
case"pointermove":if(this.dd(d,e))this.x=!0
else{this.r=!1
this.x=!1
this.cy=!0}break
case"pointerup":if(this.r&&!0){this.cy=!0
P.hn(new F.j8(this),null)}this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
a6:function(a,b){var z=F.a7(null)
if(this.r){z.a=this.Q
b.aL(a,new F.x(0,0,this.e,this.f),z)}else if(this.x){z.a=this.ch
b.aL(a,new F.x(0,0,this.e,this.f),z)}else{z.a=this.z
b.aL(a,new F.x(0,0,this.e,this.f),z)}},
dD:function(a){return this.cx.$1(a)}},
j8:{
"^":"f:1;a",
$0:function(){var z=this.a
z.dD(z.y)}},
j9:{
"^":"a;"},
a6:{
"^":"a;",
B:function(a){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r
function $async$B(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.e(new s.z(0,r.n,null),[null])
t=u
t.aG(null)
z=2
return H.h(u,$async$B,y)
case 2:t=v
t=t.b
t.push(a)
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$B,y,null)},
bs:function(a){var z=0,y=new P.E(),x=1,w,v=this,u,t,s
function $async$bs(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.z(0,s.n,null)
u.$builtinTypeInfo=[null]
t=u
t.aG(null)
z=2
return H.h(u,$async$bs,y)
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
t.ae(u,a)
t=a
t.dR()
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$bs,y,null)},
ap:function(){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r,q,p
function $async$ap(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.e(new q.z(0,p.n,null),[null])
r=u
r.aG(null)
z=2
return H.h(u,$async$ap,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.bs(u[s])
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
case 1:return H.h(w,1,y)}}return H.h(null,$async$ap,y,null)},
dm:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].dm(a)},
cg:function(a,b){},
dP:function(a,b){var z,y,x
this.c4()
this.cg(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].dP(a,b)},
a6:function(a,b){},
ci:["en",function(a,b){var z,y,x,w,v,u
this.c4()
this.a6(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.L)(z),++w){v=z[w]
u=v.c
x.push(C.a.gaM(x).m(0,u))
b.bu()
v.ci(a,b)
if(0>=x.length)return H.c(x,0)
x.pop()
b.bu()}}],
dQ:["ag",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.c4()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.c(y,w)
v=y[w]
a.ad(v.c)
u=v.dQ(a,b,c,d,e)
a.ac()
if(u===!0)return u}t=a.e2().c3(0)
t.hk()
y=new E.m(new Float64Array(H.j(3)))
y.D(d,e,0)
s=t.m(0,y)
return this.aO(a,b,c,s.gi(s),s.gj(s),d,e)}],
aO:function(a,b,c,d,e,f,g){return!1},
dR:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].dR()
this.d=!1},
c4:function(){if(!this.d)this.d=!0}},
jb:{
"^":"a;",
R:function(a){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q
function $async$R(b,c){if(b===1){v=c
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
return H.h(q.bp(a),$async$R,y)
case 5:s.p(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$R,y,null)},
al:function(a){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q
function $async$al(b,c){if(b===1){v=c
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
return H.h(q.b3(a),$async$al,y)
case 5:s.p(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$al,y,null)}},
ja:{
"^":"a;"},
x:{
"^":"a;i:a*,j:b*,T:c<,a4:d<",
v:function(a,b){if(b==null)return!1
return b instanceof F.x&&J.K(b.a,this.a)&&J.K(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gI:function(a){return F.bx([J.O(this.a),J.O(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
k:function(a){return"x:"+H.d(this.a)+", y:"+H.d(this.b)+", w:"+H.d(this.c)+", h:"+H.d(this.d)}},
e9:{
"^":"a;i:a*,j:b*",
v:function(a,b){if(b==null)return!1
return b instanceof F.e9&&J.K(b.a,this.a)&&J.K(b.b,this.b)},
gI:function(a){return F.bx([J.O(this.a),J.O(this.b)])},
k:function(a){return"x:"+H.d(this.a)+", y:"+H.d(this.b)}},
cx:{
"^":"a;T:a<,a4:b<",
v:function(a,b){if(b==null)return!1
return b instanceof F.cx&&b.a===this.a&&b.b===this.b},
gI:function(a){return F.bx([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
k:function(a){return"w:"+H.d(this.a)+", h:"+H.d(this.b)}},
jh:{
"^":"a;a",
k:function(a){return C.U.h(0,this.a)}},
e8:{
"^":"a;a,b,c",
eC:function(a){if(this.a==null)this.a=F.p(255,255,255,255)},
static:{a7:function(a){var z=new F.e8(a,C.f,1)
z.eC(a)
return z}}},
e7:{
"^":"a;a",
v:function(a,b){if(b==null)return!1
return b instanceof F.e7&&b.a===this.a},
gI:function(a){return F.bx([this.a&0x1FFFFFFF])},
k:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
eB:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{p:function(a,b,c,d){var z=new F.e7(0)
z.eB(a,b,c,d)
return z}}},
cw:{
"^":"a;"},
jf:{
"^":"a6;T:e<,a4:f<,r,x,y,z,Q,ch,a,b,c,d",
dQ:function(a,b,c,d,e){a.ad(this.c)
this.ag(a,b,c,d,e)
a.ac()},
cg:function(a,b){var z,y,x,w
z=a.gT()
y=a.ghz(a)
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
y=new E.t(new Float64Array(H.j(16)))
y.w()
this.c=y
y.M(0,this.z,this.Q,0)
y=this.c
x=this.y
y.cA(0,x,x,1)},
ci:function(a,b){var z,y,x
z=new F.x(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.gaM(x).m(0,y))
b.bu()
y=b.b
y.push(z)
b.bl(a,z)
this.en(a,b)
if(0>=y.length)return H.c(y,0)
y.pop()
if(y.length>0)b.bl(a,C.a.gaM(y))
else{y=a.a
b.bl(a,new F.x(0,0,y.c,y.d))}if(0>=x.length)return H.c(x,0)
x.pop()
b.bu()},
a6:function(a,b){var z,y
z=new F.x(0,0,this.e,this.f)
y=F.a7(null)
y.a=this.ch
b.bl(a,z)
b.aL(a,z,y)}},
jg:{
"^":"a6;e,aF:f>,r,x,y,z,Q,ch,cx,cy,db,a,b,c,d",
a6:function(a,b){var z,y,x,w,v,u,t
z=F.a7(null)
if(this.x)z.a=F.p(170,170,170,255)
else z.a=F.p(170,255,170,170)
y=this.f
x=-y/2
w=this.z
v=this.r
u=v/2
t=this.Q
b.di(a,new F.x(x,x,y,y),z)
b.di(a,new F.x(w-u,t-u,v,v),z)},
aO:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(!this.x){if(this.dh(d,e,0,0)<this.f){this.db=!0
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
z=this.dh(0,0,d,e)
y=this.f
x=y/2
if(z>x){w=this.z
v=w>0?w:-1*w
u=this.Q
t=v+(u>0?u:-1*u)
this.z=x*w/t
this.Q=y/2*u/t}}return!1},
dh:function(a,b,c,d){var z,y
z=a-c
H.ai(z)
H.ai(2)
z=Math.pow(z,2)
y=b-d
H.ai(y)
H.ai(2)
return Math.sqrt(H.ai(z+Math.pow(y,2)))}},
ct:{
"^":"a;a,b",
aA:function(a){var z,y,x,w
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
if(J.K(w.a,a))return w}return},
cj:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.ax(H.lG(J.bl(P.cJ(a,null),"frames"),"$isl",[P.aQ],"$asl")),y=this.b;z.A();){x=z.gG()
w=new F.iL(null,null,null,null,null,null,null)
v=J.D(x)
w.a=v.h(x,"filename")
w.r=w.dE(v.h(x,"frame"))
w.b=v.h(x,"rotated")
w.c=v.h(x,"trimmed")
w.d=w.dE(v.h(x,"spriteSourceSize"))
u=v.h(x,"sourceSize")
t=J.D(u)
s=t.h(u,"w")
r=t.h(u,"h")
w.e=new F.cx(J.G(s),J.G(r))
v=v.h(x,"pivot")
u=J.D(v)
q=u.h(v,"x")
p=u.h(v,"y")
w.f=new F.e9(J.G(q),J.G(p))
y.push(w)}}},
iL:{
"^":"a;a,b,c,d,e,f,r",
gh4:function(){var z,y,x,w
z=this.b
y=this.d
if(z===!0){z=y.b
if(typeof z!=="number")return H.w(z)
x=y.d
w=y.a
if(typeof w!=="number")return H.w(w)
return new F.x(-1*z-x,w,x,y.c)}else return new F.x(y.a,y.b,y.c,y.d)},
gaV:function(){var z,y
z=this.b
y=this.r
if(z===!0)return new F.x(y.a,y.b,y.d,y.c)
else return new F.x(y.a,y.b,y.c,y.d)},
dE:function(a){var z,y,x,w,v
z=J.D(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.x(J.G(y),J.G(x),J.G(w),J.G(v))}},
ji:{
"^":"a;",
gL:function(a){return this.c$},
sL:function(a,b){this.c$=b},
ho:function(a){if(!this.e$){this.c$.dm(this)
this.e$=!0}this.c$.dP(this,a)
this.hq()},
ad:function(a){var z=this.f$
z.push(C.a.gaM(z).m(0,a))},
ac:function(){var z=this.f$
if(0>=z.length)return H.c(z,0)
z.pop()},
e2:function(){return C.a.gaM(this.f$)}}}],["","",,G,{
"^":"",
cy:function(a){var z=0,y=new P.E(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$cy(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.e(new p.ad(o.e(new n.z(0,m.n,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.fy(t,a)
q=J
s=q.k(t)
q=s
r=q.gcf(t)
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
q.F()
q=s
s=q.gce(t)
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
q.F()
q=u
x=q.a
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$cy,y,null)},
ea:function(a,b,c){var z,y
z=J.f9(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.d(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.b(y+"\n")}return z},
jt:{
"^":"cw;a,b",
gT:function(){return J.fr(this.a)},
ga4:function(){return J.ff(this.a)},
e4:function(a){var z
if(this.b==null){z=J.k(a).fO(a)
this.b=z
a.bindTexture(3553,z)
C.X.hK(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
jk:{
"^":"a;a,b,c,t:d>",
eD:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.aP(b)
y=C.c.aP(a)
x=document.createElement("canvas",null)
J.fz(x,z)
J.fx(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.ft(this.b,!0)},
static:{jl:function(a,b){var z=new G.jk(null,null,null,null)
z.eD(a,b)
return z}}},
jc:{
"^":"jb;u:c>,t:d>,a,b",
bp:function(a){var z=0,y=new P.E(),x,w=2,v,u,t
function $async$bp(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.h(t.cy(a),$async$bp,y)
case 3:x=new u.jt(c,null)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$bp,y,null)},
b3:function(a){var z=0,y=new P.E(),x,w=2,v,u,t,s,r,q,p,o,n,m
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
u=r.e(new q.ad(p.e(new o.z(0,n.n,null),[null])),[null])
t=new XMLHttpRequest()
r=C
r=r.G
r.hy(t,"GET",a)
r=t
r.responseType="arraybuffer"
r=H
r=r
q=W
s=r.e(new q.aE(t,"load",!1),[null])
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
r.F()
r=H
r=r
q=W
s=r.e(new q.aE(t,"error",!1),[null])
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
r.F()
r=t
r.send()
r=u
x=r.a
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$b3,y,null)},
bo:function(a){var z=0,y=new P.E(),x,w=2,v,u
function $async$bo(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
x=new u.jm(a,null)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$bo,y,null)}},
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
u.a1(0,t.dg(s.eX(r.kX(q.response)),!0))
return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$$1,y,null)}},
je:{
"^":"f:10;a",
$1:function(a){this.a.aj(a)}},
jm:{
"^":"ja;a,b",
a5:function(){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q,p,o
function $async$a5(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:r=u
z=3
return H.h(r.hE(0),$async$a5,y)
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
return H.h(o.fe(t,1,1024),$async$a5,y)
case 5:p=p.fo(b)
o=u
z=4
return H.h(q.f7(p,o.a),$async$a5,y)
case 4:s=r.lr(b,"$isc4")
r=u
r.b=s
x=s
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$a5,y,null)},
hE:function(a){var z,y
z=H.e(new P.ad(H.e(new P.z(0,$.n,null),[null])),[null])
y=window.navigator.webkitPersistentStorage;(y&&C.E).hF(y,5242880,new G.jp(z),new G.jq(z))
return z.a},
aT:function(a,b,c){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i
function $async$aT(d,e){if(d===1){v=e
z=w}while(true)switch(z){case 0:t={}
n=t
n.a=b
n=J
n=n.q(b)
z=!n.$isjH?3:4
break
case 3:n=t
m=Uint8Array
l=H
n.a=new m(l.aW(b))
case 4:n=H
n=n
m=P
m=m
l=H
l=l
k=P
k=k
j=$
s=n.e(new m.ad(l.e(new k.z(0,j.n,null),[null])),[null])
n=u
z=5
return H.h(n.a5(),$async$aT,y)
case 5:n=u
r=n.b
n=r
if(n){z=7
break}else e=n
z=8
break
case 7:n=C
e=n.q
case 8:n=e
z=6
return H.h(n.df(r),$async$aT,y)
case 6:q=e
n=J
r=n.fn(q)
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
n.F()
n=H
n=n
m=W
r=n.e(new m.aE(q,"error",!1),[null])
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
n.F()
n=u
z=9
return H.h(n.aD(),$async$aT,y)
case 9:p=e
n=J
z=n.aK(p,c)?10:12
break
case 10:z=typeof p!=="number"?13:14
break
case 13:n=H
x=n.w(p)
z=1
break
case 14:n=Uint8Array
m=H
m=m
l=P
o=new n(m.aW(l.i2(c-p,0,null)))
n=q
n.seek(p)
n=q
n=n
m=W
m=m
l=o
k=t
m=m.d8([l,k.a],null,null)
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
m=m.d8([l.a],null,null)
m=m
l=t
n.write(m.slice(0,l.a.length))
case 11:n=s
x=n.a
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$aT,y,null)},
b6:function(a,b){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k
function $async$b6(c,d){if(c===1){v=d
z=w}while(true)switch(z){case 0:p=H
p=p
o=P
o=o
n=H
n=n
m=P
m=m
l=$
t=p.e(new o.ad(n.e(new m.z(0,l.n,null),[null])),[null])
p=u
z=3
return H.h(p.a5(),$async$b6,y)
case 3:s=new FileReader()
p=u
r=p.b
p=r
if(p){z=5
break}else d=p
z=6
break
case 5:p=C
d=p.q
case 6:p=d
z=4
return H.h(p.dj(r),$async$b6,y)
case 4:q=d
p=H
p=p
o=W
r=p.e(new o.aE(s,"load",!1),[null])
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
p.F()
p=H
p=p
o=W
r=p.e(new o.aE(s,"error",!1),[null])
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
p.F()
z=typeof b!=="number"?7:8
break
case 7:p=H
x=p.w(b)
z=1
break
case 8:p=s
p=p
o=J
p.readAsArrayBuffer(o.fA(q,a,a+b))
p=t
x=p.a
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$b6,y,null)},
aD:function(){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r
function $async$aD(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:s=u
z=3
return H.h(s.a5(),$async$aD,y)
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
b=r.q
case 6:r=b
z=4
return H.h(r.dj(t),$async$aD,y)
case 4:x=s.fp(b)
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$aD,y,null)},
aS:function(a,b){var z=0,y=new P.E(),x,w=2,v,u=this,t,s,r
function $async$aS(c,d){if(c===1){v=d
z=w}while(true)switch(z){case 0:s=u
z=3
return H.h(s.a5(),$async$aS,y)
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
d=r.q
case 6:r=d
z=4
return H.h(r.df(t),$async$aS,y)
case 4:s.d5(d,b)
x=b
z=1
break
case 1:return H.h(x,0,y,null)
case 2:return H.h(v,1,y)}}return H.h(null,$async$aS,y,null)}},
jp:{
"^":"f:0;a",
$1:function(a){this.a.a1(0,a)}},
jq:{
"^":"f:0;a",
$1:function(a){this.a.aj(a)}},
jr:{
"^":"f:10;a,b,c",
$1:function(a){this.b.a1(0,this.a.a.length)
this.c.abort()}},
js:{
"^":"f:0;a,b",
$1:function(a){this.a.aj(P.am())
this.b.abort()}},
jn:{
"^":"f:0;a,b",
$1:function(a){this.a.a1(0,P.ba(C.F.gcn(this.b),!0,null))}},
jo:{
"^":"f:0;a",
$1:function(a){this.a.aj(a)}},
jj:{
"^":"j9;c,d,e,f,r,x,y,z,Q,ch,cx,a,b",
a5:function(){var z,y,x,w,v,u
P.S("#[A]# "+H.d(J.d1(this.c,35660)))
P.S("#[B]# "+H.d(J.d1(this.c,33901)))
z=C.a.dn(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.dn(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.c
w=G.ea(x,35633,z)
v=G.ea(x,35632,y)
u=J.f8(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.e=u},
a_:function(a){this.f=1
this.Q=-0.5
J.d_(this.c,2960)
J.fa(this.c,515)
J.f1(this.c,0,0,0,1)
J.f2(this.c,1)
J.f3(this.c,0)
J.d_(this.c,3042)
switch(-1){case-1:J.eY(this.c,32774)
J.eZ(this.c,770,771,770,32772)
break}J.f0(this.c,17664)
C.a.sl(this.r,0)
C.a.sl(this.x,0)
C.a.sl(this.y,0)
this.z=null},
bn:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
if(z.length!==0){y=this.x
F.p(170,255,170,170)
J.d6(this.c,this.e)
x=J.bn(this.c,this.e,"a_tex")
w=J.bZ(this.c)
J.bX(this.c,34962,w)
v=this.y
J.f_(this.c,34962,new Float32Array(H.aW(v)),35044)
J.bm(this.c,x)
J.bp(this.c,x,2,5126,!1,0,0)
u=this.z
if(u!=null){t=u.e4(this.c)
J.cX(this.c,3553,t)
J.bo(this.c,3553,10242,33071)
J.bo(this.c,3553,10243,33071)
J.bo(this.c,3553,10241,9728)
J.bo(this.c,3553,10240,9728)}u=this.c
s=J.bZ(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.aW(z)),35044)
u.bindBuffer(34962,null)
J.bX(this.c,34962,s)
u=this.c
s=J.bZ(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.aW(y)),35044)
u.bindBuffer(34963,null)
J.bX(this.c,34963,s)
u=this.c
u.uniformMatrix4fv(J.fu(u,this.e,"u_mat"),!1,new Float32Array(H.aW(this.ch.a)))
r=J.bn(this.c,this.e,"color")
q=J.bn(this.c,this.e,"vp")
p=J.bn(this.c,this.e,"useTex")
J.bp(this.c,q,3,5126,!1,32,0)
J.bp(this.c,r,4,5126,!1,32,12)
J.bp(this.c,p,1,5126,!1,32,28)
J.bm(this.c,q)
J.bm(this.c,r)
J.bm(this.c,p)
J.fc(this.c,4,y.length,5123,0)
if(x!==0){J.fb(this.c,x)
J.cX(this.c,3553,null)}J.d6(this.c,null)
C.a.sl(z,0)
C.a.sl(y,0)
C.a.sl(v,0)
this.z=null}},
di:function(a,b,c){if(c.b===C.f)this.h0(a,b,c)
else this.h1(a,b,c)},
h0:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=J.r(b.a,b.c/2)
y=J.r(b.b,b.d/2)
x=b.c/2
w=b.d/2
v=this.ai()
u=new E.m(new Float64Array(H.j(3)))
u.D(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=J.a3(y),o=this.r,n=this.y,m=this.x,l=J.a3(z),k=0;k<25;){j=o.length/8|0
u.si(0,z)
u.sj(0,y)
u.saf(0,this.Q)
u=v.m(0,u)
C.a.J(o,[u.gi(u),u.gj(u),this.Q])
C.a.J(o,[s,r,q,p])
C.a.J(o,[-1])
C.a.J(n,[0,0])
i=6.283185307179586*(k/25)
u.si(0,l.n(z,Math.cos(i)*x))
u.sj(0,t.n(y,Math.sin(i)*w))
u.saf(0,this.Q)
u=v.m(0,u)
C.a.J(o,[u.gi(u),u.gj(u),this.Q])
C.a.J(o,[s,r,q,p])
C.a.J(o,[-1])
C.a.J(n,[0,0]);++k
i=6.283185307179586*(k/25)
u.si(0,l.n(z,Math.cos(i)*x))
u.sj(0,t.n(y,Math.sin(i)*w))
u.saf(0,this.Q)
u=v.m(0,u)
C.a.J(o,[u.gi(u),u.gj(u),this.Q])
C.a.J(o,[s,r,q,p])
C.a.J(o,[-1])
C.a.J(n,[0,0])
C.a.J(m,[j,j+1,j+2])
this.Q+=0.0001}},
h1:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=J.r(b.a,b.c/2)
y=J.r(b.b,b.d/2)
x=b.c
w=c.c
v=(x+w)/2
u=b.d
t=(u+w)/2
s=x/2
r=u/2
q=this.ai()
p=new E.m(new Float64Array(H.j(3)))
p.D(0,0,0)
o=new E.m(new Float64Array(H.j(3)))
o.D(0,0,0)
n=new E.m(new Float64Array(H.j(3)))
n.D(0,0,0)
m=new E.m(new Float64Array(H.j(3)))
m.D(0,0,0)
u=c.a.a
l=(u>>>16&255)/255
k=(u>>>8&255)/255
j=(u>>>0&255)/255
i=(u>>>24&255)/255
for(x=J.a3(y),w=J.a3(z),h=0;h<25;){u=6.283185307179586*(h/25)
p.si(0,w.n(z,Math.cos(u)*s))
p.sj(0,x.n(y,Math.sin(u)*r))
p.saf(0,this.Q)
p=q.m(0,p)
o.si(0,w.n(z,Math.cos(u)*v))
o.sj(0,x.n(y,Math.sin(u)*t))
o.saf(0,this.Q)
o=q.m(0,o);++h
u=6.283185307179586*(h/25)
n.si(0,w.n(z,Math.cos(u)*v))
n.sj(0,x.n(y,Math.sin(u)*t))
n.saf(0,this.Q)
n=q.m(0,n)
m.si(0,w.n(z,Math.cos(u)*s))
m.sj(0,x.n(y,Math.sin(u)*r))
m.saf(0,this.Q)
m=q.m(0,m)
this.O(a,p,o,m,n,l,k,j,i)
this.Q+=0.0001}},
aL:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(c.b===C.f){z=this.ai()
y=b.a
x=b.b
w=J.r(y,b.c)
v=J.r(b.b,b.d)
u=new E.m(new Float64Array(H.j(3)))
u.D(y,x,0)
t=z.m(0,u)
u=new E.m(new Float64Array(H.j(3)))
u.D(y,v,0)
s=z.m(0,u)
u=new E.m(new Float64Array(H.j(3)))
u.D(w,x,0)
r=z.m(0,u)
u=new E.m(new Float64Array(H.j(3)))
u.D(w,v,0)
q=z.m(0,u)
u=c.a.a
this.O(a,t,s,r,q,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{z=this.ai()
y=b.a
x=b.b
w=J.r(y,b.c)
v=J.r(b.b,b.d)
u=new E.m(new Float64Array(H.j(3)))
u.D(y,x,0)
t=z.m(0,u)
u=c.c
if(typeof y!=="number")return y.E()
if(typeof x!=="number")return x.E()
p=new E.m(new Float64Array(H.j(3)))
p.D(y-u,x-u,0)
o=z.m(0,p)
p=new E.m(new Float64Array(H.j(3)))
p.D(y,v,0)
s=z.m(0,p)
p=c.c
u=J.a3(v)
n=u.n(v,p)
m=new E.m(new Float64Array(H.j(3)))
m.D(y-p,n,0)
l=z.m(0,m)
m=new E.m(new Float64Array(H.j(3)))
m.D(w,x,0)
r=z.m(0,m)
m=J.a3(w)
n=m.n(w,c.c)
p=c.c
k=new E.m(new Float64Array(H.j(3)))
k.D(n,x-p,0)
j=z.m(0,k)
k=new E.m(new Float64Array(H.j(3)))
k.D(w,v,0)
q=z.m(0,k)
m=m.n(w,c.c)
u=u.n(v,c.c)
k=new E.m(new Float64Array(H.j(3)))
k.D(m,u,0)
i=z.m(0,k)
k=c.a.a
h=(k>>>16&255)/255
g=(k>>>8&255)/255
f=(k>>>0&255)/255
e=(k>>>24&255)/255
this.O(a,o,l,t,s,h,g,f,e)
this.O(a,l,i,s,q,h,g,f,e)
this.O(a,i,j,q,r,h,g,f,e)
this.O(a,j,o,r,t,h,g,f,e)}},
O:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.r
y=z.length/8|0
C.a.J(z,[b.gi(b),b.gj(b),this.Q,f,g,h,i,-1,c.gi(c),c.gj(c),this.Q,f,g,h,i,-1,d.gi(d),d.gj(d),this.Q,f,g,h,i,-1,e.gi(e),e.gj(e),this.Q,f,g,h,i,-1])
C.a.J(this.y,[0,0,0,0,0,0,0,0])
this.Q+=0.0001
z=y+1
x=y+2
C.a.J(this.x,[y,z,x,z,y+3,x])},
bl:function(a,b){var z
this.bn(0)
J.cY(this.c,!1,!1,!1,!1)
J.cZ(this.c,!1)
J.d3(this.c,7680,7681,7681)
J.d2(this.c,519,this.f,255)
z=F.a7(null)
z.a=F.p(255,255,255,255)
this.aL(null,b,z)
this.bn(0)
J.cY(this.c,!0,!0,!0,!0)
J.cZ(this.c,!0)
J.d3(this.c,7680,7680,7680)
J.d2(this.c,515,this.f,255);++this.f},
ay:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.z
if(z!=null&&!J.K(z,b))this.bn(0)
this.z=b
z=c.a
y=b.gT()
if(typeof z!=="number")return z.bw()
if(typeof y!=="number")return H.w(y)
x=z/y
y=c.b
z=this.z.ga4()
if(typeof y!=="number")return y.bw()
if(typeof z!=="number")return H.w(z)
w=y/z
z=J.r(c.a,c.c)
y=this.z.gT()
if(typeof z!=="number")return z.bw()
if(typeof y!=="number")return H.w(y)
v=z/y
y=J.r(c.b,c.d)
z=this.z.ga4()
if(typeof y!=="number")return y.bw()
if(typeof z!=="number")return H.w(z)
u=y/z
C.a.J(this.y,[x,w,x,u,v,w,v,u])
t=this.ai()
s=d.a
r=d.b
q=J.r(s,d.c)
p=J.r(d.b,d.d)
z=new E.m(new Float64Array(H.j(3)))
z.D(s,r,0)
o=t.m(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.D(s,p,0)
n=t.m(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.D(q,r,0)
m=t.m(0,z)
z=new E.m(new Float64Array(H.j(3)))
z.D(q,p,0)
l=t.m(0,z)
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
bu:function(){},
ai:function(){var z,y
this.cx.w()
z=this.cx.M(0,-1,1,0)
this.cx=z
y=this.d
y=z.cA(0,2/y.c,-2/y.d,1)
this.cx=y
y=y.m(0,C.a.gaM(this.a))
this.cx=y
return y}},
jw:{
"^":"id;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gi:function(a){return 0},
gj:function(a){return 0},
gT:function(){return this.a.c},
ga4:function(){return this.a.d},
ghz:function(a){return 0},
hq:function(){this.r=!0},
be:function(){var z=0,y=new P.E(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h
function $async$be(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:j=H
j=j
i=P
u=j.dX(new i.c1(Date.now(),!1))
j=v
t=j.a
j=E
j=j
i=Float64Array
h=H
s=new j.t(new i(h.j(16)))
j=s
j.w()
j=E
j=j
i=Float64Array
h=H
r=new j.t(new i(h.j(16)))
j=r
j.w()
j=E
j=j
i=Float64Array
h=H
q=new j.t(new i(h.j(16)))
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
return H.h(j.ho(new i.a9(15e3),null,null),$async$be,y)
case 5:m=Date.now()
j=v
j.b=m
l=m-u
j=v
j=j
i=C
i=i.c
j.ho(i.aP(u+l))
o+=l
if(l<0);else ;++n
j=v
j.r=!0
z=o>40?6:7
break
case 6:j=p
j.a_(0)
j=v
j=j.gL(v)
j.ci(v,p)
j=p
j.bn(0)
j=v
j.r=!1
case 7:z=n>40?8:9
break
case 8:j=C
j=j.c
k="###fps  "+j.bd(o,n)
j=H
j.bV(k)
o=0
n=0
case 9:case 3:u=m
z=2
break
case 4:return H.h(null,0,y,null)
case 1:return H.h(w,1,y)}}return H.h(null,$async$be,y,null)},
hO:function(){var z,y,x,w
z=P.am()
y=new G.jF(this,z)
x=new G.jE(this,z)
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchcancel",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(x),w.c),[H.A(w,0)]).F()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchend",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(x),w.c),[H.A(w,0)]).F()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchenter",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).F()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchleave",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).F()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchmove",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).F()
w=this.a.b
w.toString
w=H.e(new W.C(w,"touchstart",!1),[null])
H.e(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).F()},
hs:function(){var z,y
z={}
z.a=!1
y=J.fg(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jx(z,this)),y.c),[H.A(y,0)]).F()
y=J.fm(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jy(z,this)),y.c),[H.A(y,0)]).F()
y=J.fh(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jz(z,this)),y.c),[H.A(y,0)]).F()
y=J.fi(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jA(z,this)),y.c),[H.A(y,0)]).F()
y=J.fj(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jB(z,this)),y.c),[H.A(y,0)]).F()
y=J.fk(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jC(z,this)),y.c),[H.A(y,0)]).F()
y=J.fl(this.a.b)
H.e(new W.H(0,y.a,y.b,W.I(new G.jD(z,this)),y.c),[H.A(y,0)]).F()}},
id:{
"^":"a+ji;"},
jF:{
"^":"f:11;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.d0(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.L)(y),++v){u=y[v]
t=C.Y.ghA(u).a
s=C.b.N(z.a.b.offsetLeft)
if(typeof t!=="number")return t.E()
r=t-s
s=C.b.N(u.pageX)
t=C.b.N(u.pageY)
new P.Y(s,t).$builtinTypeInfo=[null]
q=t-C.b.N(z.a.b.offsetTop)
if(w.a2(u.identifier)){t=z.gL(z)
s=u.identifier
if(typeof s!=="number")return s.n()
z.ad(t.c)
t.ag(z,s+1,"pointermove",r,q)
z.ac()}else{w.p(0,u.identifier,u)
t=z.gL(z)
s=u.identifier
if(typeof s!=="number")return s.n()
z.ad(t.c)
t.ag(z,s+1,"pointerdown",r,q)
z.ac()}}}},
jE:{
"^":"f:11;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
z.c=z.b
for(y=J.d0(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.L)(y),++v){u=y[v]
if(w.a2(u.identifier)){t=C.b.N(u.pageX)
s=C.b.N(u.pageY)
new P.Y(t,s).$builtinTypeInfo=[null]
s=C.b.N(z.a.b.offsetLeft)
r=C.b.N(u.pageX)
q=C.b.N(u.pageY)
new P.Y(r,q).$builtinTypeInfo=[null]
r=C.b.N(z.a.b.offsetTop)
w.ae(0,u.identifier)
p=z.gL(z)
o=u.identifier
if(typeof o!=="number")return o.n()
z.ad(p.c)
p.ag(z,o+1,"pointerup",t-s,q-r)
z.ac()}}}},
jx:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=z.gL(z)
x=J.k(a)
w=x.ga0(a)
w=w.gi(w)
w.toString
x=x.ga0(a)
x=x.gj(x)
x.toString
z.ad(y.c)
y.ag(z,0,"pointerdown",w,x)
z.ac()}}},
jy:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gL(z)
w=J.k(a)
v=w.ga0(a)
v=v.gi(v)
v.toString
w=w.ga0(a)
w=w.gj(w)
w.toString
z.ad(x.c)
x.ag(z,0,"pointerup",v,w)
z.ac()
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
if(y.a){x=z.gL(z)
w=J.k(a)
v=w.ga0(a)
v=v.gi(v)
v.toString
w=w.ga0(a)
w=w.gj(w)
w.toString
z.ad(x.c)
x.ag(z,0,"pointercancel",v,w)
z.ac()
y.a=!1}}}},
jB:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b)if(this.a.a){y=z.gL(z)
x=J.k(a)
w=x.ga0(a)
w=w.gi(w)
w.toString
x=x.ga0(a)
x=x.gj(x)
x.toString
z.ad(y.c)
y.ag(z,0,"pointermove",w,x)
z.ac()}}},
jC:{
"^":"f:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gL(z)
w=J.k(a)
v=w.ga0(a)
v=v.gi(v)
v.toString
w=w.ga0(a)
w=w.gj(w)
w.toString
z.ad(x.c)
x.ag(z,0,"pointercancel",v,w)
z.ac()
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
$1:function(a){this.b.aj("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
t:{
"^":"a;q:a<",
aU:function(a){var z,y
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
k:function(a){return"[0] "+this.bb(0).k(0)+"\n[1] "+this.bb(1).k(0)+"\n[2] "+this.bb(2).k(0)+"\n[3] "+this.bb(3).k(0)+"\n"},
gfY:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.c(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>=16)return H.c(z,b)
z[b]=c},
bb:function(a){var z,y,x
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
c3:function(a){var z=new E.t(new Float64Array(H.j(16)))
z.aU(this)
return z},
m:function(a,b){var z,y,x
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
return new E.t(z)}z=J.q(b)
if(!!z.$isah){z=new Float64Array(H.j(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ah(z)}if(!!z.$ism){z=new Float64Array(H.j(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.m(z)}if(4===b.gfY()){z=new Float64Array(H.j(16))
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
return new E.t(z)}throw H.b(P.az(b))},
n:function(a,b){var z,y
z=new Float64Array(H.j(16))
y=this.a
z[0]=C.b.n(y[0],b.gq().h(0,0))
z[1]=C.b.n(y[1],b.gq().h(0,1))
z[2]=C.b.n(y[2],b.gq().h(0,2))
z[3]=C.b.n(y[3],b.gq().h(0,3))
z[4]=C.b.n(y[4],b.gq().h(0,4))
z[5]=C.b.n(y[5],b.gq().h(0,5))
z[6]=C.b.n(y[6],b.gq().h(0,6))
z[7]=C.b.n(y[7],b.gq().h(0,7))
z[8]=C.b.n(y[8],b.gq().h(0,8))
z[9]=C.b.n(y[9],b.gq().h(0,9))
z[10]=C.b.n(y[10],b.gq().h(0,10))
z[11]=C.b.n(y[11],b.gq().h(0,11))
z[12]=C.b.n(y[12],b.gq().h(0,12))
z[13]=C.b.n(y[13],b.gq().h(0,13))
z[14]=C.b.n(y[14],b.gq().h(0,14))
z[15]=C.b.n(y[15],b.gq().h(0,15))
return new E.t(z)},
E:function(a,b){var z,y,x,w
z=new Float64Array(H.j(16))
y=this.a
x=y[0]
w=b.gq()
if(0>=w.length)return H.c(w,0)
z[0]=x-w[0]
w=y[1]
x=b.gq()
if(1>=x.length)return H.c(x,1)
z[1]=w-x[1]
x=y[2]
w=b.gq()
if(2>=w.length)return H.c(w,2)
z[2]=x-w[2]
w=y[3]
x=b.gq()
if(3>=x.length)return H.c(x,3)
z[3]=w-x[3]
x=y[4]
w=b.gq()
if(4>=w.length)return H.c(w,4)
z[4]=x-w[4]
w=y[5]
x=b.gq()
if(5>=x.length)return H.c(x,5)
z[5]=w-x[5]
x=y[6]
w=b.gq()
if(6>=w.length)return H.c(w,6)
z[6]=x-w[6]
w=y[7]
x=b.gq()
if(7>=x.length)return H.c(x,7)
z[7]=w-x[7]
x=y[8]
w=b.gq()
if(8>=w.length)return H.c(w,8)
z[8]=x-w[8]
w=y[9]
x=b.gq()
if(9>=x.length)return H.c(x,9)
z[9]=w-x[9]
x=y[10]
w=b.gq()
if(10>=w.length)return H.c(w,10)
z[10]=x-w[10]
w=y[11]
x=b.gq()
if(11>=x.length)return H.c(x,11)
z[11]=w-x[11]
x=y[12]
w=b.gq()
if(12>=w.length)return H.c(w,12)
z[12]=x-w[12]
w=y[13]
x=b.gq()
if(13>=x.length)return H.c(x,13)
z[13]=w-x[13]
x=y[14]
w=b.gq()
if(14>=w.length)return H.c(w,14)
z[14]=x-w[14]
y=y[15]
w=b.gq()
if(15>=w.length)return H.c(w,15)
z[15]=y-w[15]
return new E.t(z)},
M:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.q(b)
y=!!z.$isah
x=y?b.gT():1
if(!!z.$ism||y){w=z.gi(b)
v=z.gj(b)
u=z.gaf(b)}else{u=d
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
cA:function(a,b,c,d){var z,y,x,w,v,u
z=J.q(b)
y=!!z.$isah
x=y?b.gT():1
if(!!z.$ism||y){w=z.gi(b)
v=z.gj(b)
u=z.gaf(b)}else{u=d
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
hk:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
m:{
"^":"a;q:a<",
D:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aU:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
k:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
E:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gq()
if(0>=x.length)return H.c(x,0)
x=x[0]
w=z[1]
v=b.gq()
if(1>=v.length)return H.c(v,1)
v=v[1]
z=z[2]
u=b.gq()
if(2>=u.length)return H.c(u,2)
u=u[2]
t=new E.m(new Float64Array(H.j(3)))
t.D(y-x,w-v,z-u)
return t},
n:function(a,b){var z,y,x,w
z=this.a
y=C.b.n(z[0],b.gq().h(0,0))
x=C.b.n(z[1],b.gq().h(0,1))
z=C.b.n(z[2],b.gq().h(0,2))
w=new E.m(new Float64Array(H.j(3)))
w.D(y,x,z)
return w},
m:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.w(b)
x=z[1]
z=z[2]
w=new E.m(new Float64Array(H.j(3)))
w.D(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.c(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>=3)return H.c(z,b)
z[b]=c},
gl:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.ai(y*y+x*x+z*z))},
c3:function(a){var z=new E.m(new Float64Array(H.j(3)))
z.aU(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
saf:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]}},
ah:{
"^":"a;q:a<",
bF:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aU:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
k:function(a){var z=this.a
return H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+","+H.d(z[3])},
E:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.a
y=z[0]
x=b.gq()
if(0>=x.length)return H.c(x,0)
x=x[0]
w=z[1]
v=b.gq()
if(1>=v.length)return H.c(v,1)
v=v[1]
u=z[2]
t=b.gq()
if(2>=t.length)return H.c(t,2)
t=t[2]
z=z[3]
s=b.gq()
if(3>=s.length)return H.c(s,3)
s=s[3]
r=new E.ah(new Float64Array(H.j(4)))
r.bF(y-x,w-v,u-t,z-s)
return r},
n:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.n(z[0],b.gq().h(0,0))
x=C.b.n(z[1],b.gq().h(0,1))
w=C.b.n(z[2],b.gq().h(0,2))
z=C.b.n(z[3],b.gq().h(0,3))
v=new E.ah(new Float64Array(H.j(4)))
v.bF(y,x,w,z)
return v},
m:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.w(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ah(new Float64Array(H.j(4)))
v.bF(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.c(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>=4)return H.c(z,b)
z[b]=c},
gl:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.ai(y*y+x*x+w*w+z*z))},
c3:function(a){var z=new E.ah(new Float64Array(H.j(4)))
z.aU(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
saf:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]},
gT:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.q=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dy.prototype
return J.dx.prototype}if(typeof a=="string")return J.b6.prototype
if(a==null)return J.hQ.prototype
if(typeof a=="boolean")return J.hP.prototype
if(a.constructor==Array)return J.b4.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.D=function(a){if(typeof a=="string")return J.b6.prototype
if(a==null)return a
if(a.constructor==Array)return J.b4.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.b_=function(a){if(a==null)return a
if(a.constructor==Array)return J.b4.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.a_=function(a){if(typeof a=="number")return J.aN.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bJ.prototype
return a}
J.a3=function(a){if(typeof a=="number")return J.aN.prototype
if(typeof a=="string")return J.b6.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bJ.prototype
return a}
J.lj=function(a){if(typeof a=="number")return J.aN.prototype
if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.cN=function(a){if(typeof a=="string")return J.b6.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bJ.prototype
return a}
J.k=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bk(a)}
J.r=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.a3(a).n(a,b)}
J.K=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.q(a).v(a,b)}
J.a0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.a_(a).am(a,b)}
J.aK=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.a_(a).a7(a,b)}
J.cV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.a3(a).m(a,b)}
J.cW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.a_(a).E(a,b)}
J.eV=function(a,b){return J.a_(a).bd(a,b)}
J.bl=function(a,b){if(a.constructor==Array||typeof a=="string"||H.ly(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.D(a).h(a,b)}
J.eW=function(a,b,c,d){return J.k(a).d9(a,b,c,d)}
J.eX=function(a){return J.k(a).fl(a)}
J.bX=function(a,b,c){return J.k(a).fn(a,b,c)}
J.cX=function(a,b,c){return J.k(a).fo(a,b,c)}
J.eY=function(a,b){return J.k(a).fq(a,b)}
J.eZ=function(a,b,c,d,e){return J.k(a).fs(a,b,c,d,e)}
J.f_=function(a,b,c,d){return J.k(a).ft(a,b,c,d)}
J.f0=function(a,b){return J.b_(a).fw(a,b)}
J.f1=function(a,b,c,d,e){return J.k(a).fz(a,b,c,d,e)}
J.f2=function(a,b){return J.k(a).fA(a,b)}
J.f3=function(a,b){return J.k(a).fD(a,b)}
J.f4=function(a,b){return J.cN(a).aq(a,b)}
J.cY=function(a,b,c,d,e){return J.k(a).fF(a,b,c,d,e)}
J.f5=function(a,b){return J.a3(a).aK(a,b)}
J.f6=function(a,b){return J.k(a).a1(a,b)}
J.bY=function(a,b,c){return J.D(a).fH(a,b,c)}
J.bZ=function(a){return J.k(a).fJ(a)}
J.f7=function(a,b){return J.k(a).fK(a,b)}
J.f8=function(a){return J.k(a).fM(a)}
J.f9=function(a,b){return J.k(a).fN(a,b)}
J.fa=function(a,b){return J.k(a).fR(a,b)}
J.cZ=function(a,b){return J.k(a).fS(a,b)}
J.fb=function(a,b){return J.k(a).fZ(a,b)}
J.fc=function(a,b,c,d,e){return J.k(a).h_(a,b,c,d,e)}
J.fd=function(a,b){return J.b_(a).a3(a,b)}
J.d_=function(a,b){return J.k(a).h5(a,b)}
J.bm=function(a,b){return J.k(a).h6(a,b)}
J.fe=function(a,b){return J.b_(a).P(a,b)}
J.d0=function(a){return J.k(a).gfv(a)}
J.ae=function(a){return J.k(a).gaz(a)}
J.O=function(a){return J.q(a).gI(a)}
J.ff=function(a){return J.k(a).gt(a)}
J.ax=function(a){return J.b_(a).gK(a)}
J.aj=function(a){return J.D(a).gl(a)}
J.fg=function(a){return J.k(a).gdt(a)}
J.fh=function(a){return J.k(a).gdu(a)}
J.fi=function(a){return J.k(a).gdv(a)}
J.fj=function(a){return J.k(a).gdw(a)}
J.fk=function(a){return J.k(a).gdz(a)}
J.fl=function(a){return J.k(a).gdA(a)}
J.fm=function(a){return J.k(a).gdB(a)}
J.fn=function(a){return J.k(a).ghx(a)}
J.fo=function(a){return J.k(a).gL(a)}
J.fp=function(a){return J.k(a).gaF(a)}
J.fq=function(a){return J.k(a).gcs(a)}
J.fr=function(a){return J.k(a).gu(a)}
J.bn=function(a,b,c){return J.k(a).dY(a,b,c)}
J.fs=function(a){return J.k(a).dZ(a)}
J.ft=function(a,b){return J.k(a).e_(a,b)}
J.d1=function(a,b){return J.k(a).e3(a,b)}
J.fu=function(a,b,c){return J.k(a).e5(a,b,c)}
J.fv=function(a,b){return J.b_(a).aN(a,b)}
J.fw=function(a,b,c,d){return J.k(a).dG(a,b,c,d)}
J.aL=function(a,b){return J.k(a).bD(a,b)}
J.fx=function(a,b){return J.k(a).st(a,b)}
J.fy=function(a,b){return J.k(a).san(a,b)}
J.fz=function(a,b){return J.k(a).su(a,b)}
J.fA=function(a,b,c){return J.k(a).eg(a,b,c)}
J.d2=function(a,b,c,d){return J.k(a).ei(a,b,c,d)}
J.d3=function(a,b,c,d){return J.k(a).ej(a,b,c,d)}
J.fB=function(a,b,c){return J.cN(a).bG(a,b,c)}
J.bo=function(a,b,c,d){return J.k(a).hM(a,b,c,d)}
J.G=function(a){return J.a_(a).hN(a)}
J.d4=function(a){return J.a_(a).aP(a)}
J.fC=function(a,b){return J.a_(a).b9(a,b)}
J.b1=function(a){return J.q(a).k(a)}
J.d5=function(a,b){return J.lj(a).aS(a,b)}
J.d6=function(a,b){return J.k(a).hR(a,b)}
J.bp=function(a,b,c,d,e,f,g){return J.k(a).hS(a,b,c,d,e,f,g)}
J.fD=function(a,b,c){return J.k(a).aT(a,b,c)}
I.bT=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.E=W.h6.prototype
C.q=W.c4.prototype
C.F=W.hk.prototype
C.G=W.hu.prototype
C.a=J.b4.prototype
C.H=J.dx.prototype
C.c=J.dy.prototype
C.b=J.aN.prototype
C.h=J.b6.prototype
C.V=H.cj.prototype
C.W=J.ig.prototype
C.X=P.iA.prototype
C.Y=W.bH.prototype
C.Z=J.bJ.prototype
C.a_=W.jN.prototype
C.A=new F.fI(1)
C.B=new H.dl()
C.C=new P.ie()
C.D=new P.k1()
C.t=new P.kl()
C.d=new P.kF()
C.u=new P.a9(0)
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
C.y=new P.hU(null,null)
C.P=new P.hW(null)
C.Q=new P.hX(null,null)
C.z=H.e(I.bT([127,2047,65535,1114111]),[P.o])
C.R=I.bT([])
C.S=new H.c6([0,"MinoTyoe.empty",1,"MinoTyoe.frame",2,"MinoTyoe.out",3,"MinoTyoe.l",4,"MinoTyoe.o",5,"MinoTyoe.s",6,"MinoTyoe.z",7,"MinoTyoe.j",8,"MinoTyoe.t",9,"MinoTyoe.L"])
C.T=new H.c6([0,"BitmapFontInfoType.vertical",1,"BitmapFontInfoType.horizontal"])
C.U=new H.c6([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.aa(0)
C.r=new F.aa(1)
C.p=new F.aa(2)
C.i=new F.aa(3)
C.j=new F.aa(4)
C.k=new F.aa(5)
C.l=new F.aa(6)
C.m=new F.aa(7)
C.n=new F.aa(8)
C.o=new F.aa(9)
C.f=new F.jh(0)
C.v=new P.jK(!1)
$.dY="$cachedFunction"
$.dZ="$cachedInvocation"
$.a8=0
$.aM=null
$.d9=null
$.cO=null
$.eF=null
$.eR=null
$.bP=null
$.bR=null
$.cP=null
$.aG=null
$.aX=null
$.aY=null
$.cH=!1
$.n=C.d
$.dn=0
$.di=null
$.dh=null
$.dg=null
$.df=null
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
I.$lazy(y,x,w)}})(["dv","$get$dv",function(){return H.hJ()},"dw","$get$dw",function(){return new P.hf(null)},"eb","$get$eb",function(){return H.ac(H.bI({toString:function(){return"$receiver$"}}))},"ec","$get$ec",function(){return H.ac(H.bI({$method$:null,toString:function(){return"$receiver$"}}))},"ed","$get$ed",function(){return H.ac(H.bI(null))},"ee","$get$ee",function(){return H.ac(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ei","$get$ei",function(){return H.ac(H.bI(void 0))},"ej","$get$ej",function(){return H.ac(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"eg","$get$eg",function(){return H.ac(H.eh(null))},"ef","$get$ef",function(){return H.ac(function(){try{null.$method$}catch(z){return z.message}}())},"el","$get$el",function(){return H.ac(H.eh(void 0))},"ek","$get$ek",function(){return H.ac(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cC","$get$cC",function(){return P.jQ()},"aZ","$get$aZ",function(){return[]},"dE","$get$dE",function(){return[500,225,150,125,75]},"cd","$get$cd",function(){return[150,150,125,125,125]},"dG","$get$dG",function(){return[70,70,70,70,70]},"dH","$get$dH",function(){return[150,150,150,150,150]},"ce","$get$ce",function(){return[200,200,200,200,200]},"dF","$get$dF",function(){return[1,2,2,2,3]},"dI","$get$dI",function(){return[6,7,8,9,10]},"dJ","$get$dJ",function(){return[2,5,6,10,50]},"dL","$get$dL",function(){return P.iu(null)},"ck","$get$ck",function(){return F.p(170,136,136,136)},"cl","$get$cl",function(){return F.p(170,85,51,51)},"cn","$get$cn",function(){return F.p(170,255,255,255)},"bC","$get$bC",function(){return F.p(170,0,0,0)},"co","$get$co",function(){return F.p(170,255,170,170)},"cq","$get$cq",function(){return F.p(170,170,255,170)},"cm","$get$cm",function(){return F.p(170,170,170,255)},"bB","$get$bB",function(){return F.p(170,255,255,170)},"cp","$get$cp",function(){return F.p(170,170,255,255)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,void:true},{func:1,args:[P.ab]},{func:1,args:[W.cf]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.aq]},{func:1,args:[,],opt:[,]},{func:1,args:[,,]},{func:1,ret:P.ab,args:[P.o]},{func:1,args:[W.bb]},{func:1,args:[W.cz]},{func:1,args:[,P.ab]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,,]},{func:1,args:[P.a]},{func:1,void:true,args:[,],opt:[P.aq]},{func:1,ret:P.cK},{func:1,void:true,args:[P.a],opt:[P.aq]},{func:1,void:true,args:[,P.aq]},{func:1,ret:P.o,args:[,P.o]},{func:1,void:true,args:[P.o,P.o]},{func:1,args:[P.e4,,]},{func:1,args:[F.cw]},{func:1,ret:P.a1,args:[,]},{func:1,args:[P.ab,,]},{func:1,ret:P.o,args:[,]},{func:1,args:[P.o]},{func:1,args:[P.o,,]},{func:1,ret:P.a1,args:[W.bb]},{func:1,ret:P.a,args:[,]},{func:1,ret:P.o,args:[P.T,P.T]}]
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
Isolate.bT=a.bT
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eT(F.eP(),b)},[])
else (function(b){H.eT(F.eP(),b)})([])})})()