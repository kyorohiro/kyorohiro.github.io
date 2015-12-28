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
b5.$isc=b4
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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isj)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
var d=supportsDirectProtoAccess&&b1!="c"
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cQ"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cQ"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cQ(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.az=function(){}
var dart=[["","",,H,{
"^":"",
mS:{
"^":"c;a"}}],["","",,J,{
"^":"",
q:function(a){return void 0},
bY:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bq:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cU==null){H.lT()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.cG("Return interceptor for "+H.f(y(a,z))))}w=H.m1(a)
if(w==null){if(typeof a=="function")return C.W
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.a3
else return C.ad}return w},
j:{
"^":"c;",
w:function(a,b){return a===b},
gK:function(a){return H.au(a)},
i:["eH",function(a){return H.bL(a)}],
"%":"AudioParam|CanvasRenderingContext2D|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
ie:{
"^":"j;",
i:function(a){return String(a)},
gK:function(a){return a?519018:218159},
$isb4:1},
ig:{
"^":"j;",
w:function(a,b){return null==b},
i:function(a){return"null"},
gK:function(a){return 0}},
cc:{
"^":"j;",
gK:function(a){return 0},
i:["eI",function(a){return String(a)}],
$isih:1},
iG:{
"^":"cc;"},
bk:{
"^":"cc;"},
aT:{
"^":"cc;",
i:function(a){var z=a[$.$get$dk()]
return z==null?this.eI(a):J.aP(z)}},
b8:{
"^":"j;",
cn:function(a,b){if(!!a.immutable$list)throw H.e(new P.W(b))},
bw:function(a,b){if(!!a.fixed$length)throw H.e(new P.W(b))},
e1:function(a,b){this.bw(a,"removeAt")
if(b>=a.length)throw H.e(P.bg(b,null,null))
return a.splice(b,1)[0]},
ag:function(a,b){var z
this.bw(a,"remove")
for(z=0;z<a.length;++z)if(J.H(a[z],b)){a.splice(z,1)
return!0}return!1},
D:function(a,b){var z,y
this.bw(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.L)(b),++y)a.push(b[y])},
P:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.Y(a))}},
aS:function(a,b){return H.a(new H.cg(a,b),[null,null])},
dS:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.f(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
a5:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
eF:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.K(b))
if(b<0||b>a.length)throw H.e(P.a_(b,0,a.length,"start",null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.e(H.K(c))
if(c<b||c>a.length)throw H.e(P.a_(c,b,a.length,"end",null))}if(b===c)return H.a([],[H.C(a,0)])
return H.a(a.slice(b,c),[H.C(a,0)])},
gJ:function(a){if(a.length>0)return a[0]
throw H.e(H.cb())},
gb9:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.cb())},
cZ:function(a,b,c,d,e){var z,y,x
this.cn(a,"set range")
P.aW(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.Q(P.a_(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.ib())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
eE:function(a,b){var z
this.cn(a,"sort")
z=P.lL()
H.bi(a,0,a.length-1,z)},
d_:function(a){return this.eE(a,null)},
a9:function(a,b){var z
for(z=0;z<a.length;++z)if(J.H(a[z],b))return!0
return!1},
i:function(a){return P.bD(a,"[","]")},
gL:function(a){return new J.d9(a,a.length,0,null)},
gK:function(a){return H.au(a)},
gm:function(a){return a.length},
sm:function(a,b){this.bw(a,"set length")
if(b<0)throw H.e(P.a_(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.P(a,b))
if(b>=a.length||b<0)throw H.e(H.P(a,b))
return a[b]},
p:function(a,b,c){this.cn(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.P(a,b))
if(b>=a.length||b<0)throw H.e(H.P(a,b))
a[b]=c},
$isb9:1,
$isp:1,
$asp:null,
$isA:1,
static:{id:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.d8(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.e(P.a_(a,0,4294967295,"length",null))
z=H.a(new Array(a),[b])
z.fixed$length=Array
return z}}},
mR:{
"^":"b8;"},
d9:{
"^":"c;a,b,c,d",
gG:function(){return this.d},
C:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.L(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aS:{
"^":"j;",
aP:function(a,b){var z
if(typeof b!=="number")throw H.e(H.K(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gcz(b)
if(this.gcz(a)===z)return 0
if(this.gcz(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.ghN(b))return 0
return 1}else return-1},
gcz:function(a){return a===0?1/a<0:a<0},
ghN:function(a){return isNaN(a)},
ghM:function(a){return isFinite(a)},
cK:function(a,b){return a%b},
aU:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.W(""+a))},
U:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.W(""+a))},
cP:function(a){return a},
bi:function(a,b){var z,y,x,w
H.cP(b)
if(b<2||b>36)throw H.e(P.a_(b,2,36,"radix",null))
z=a.toString(b)
if(C.i.aD(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.Q(new P.W("Unexpected toString result: "+z))
x=J.E(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.i.n("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gK:function(a){return a&0x1FFFFFFF},
cX:function(a){return-a},
l:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a+b},
u:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a-b},
n:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a*b},
bS:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
b0:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aU(a/b)},
aC:function(a,b){return(a|0)===a?a/b|0:this.aU(a/b)},
b3:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ar:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a<b},
aK:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a>b},
bR:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a<=b},
bN:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a>=b},
$isaA:1},
dH:{
"^":"aS;",
$isag:1,
$isaA:1,
$isr:1},
dG:{
"^":"aS;",
$isag:1,
$isaA:1},
ba:{
"^":"j;",
aD:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.P(a,b))
if(b<0)throw H.e(H.P(a,b))
if(b>=a.length)throw H.e(H.P(a,b))
return a.charCodeAt(b)},
l:function(a,b){if(typeof b!=="string")throw H.e(P.d8(b,null,null))
return a+b},
c0:function(a,b,c){H.cP(b)
if(c==null)c=a.length
H.cP(c)
if(b<0)throw H.e(P.bg(b,null,null))
if(typeof c!=="number")return H.u(c)
if(b>c)throw H.e(P.bg(b,null,null))
if(c>a.length)throw H.e(P.bg(c,null,null))
return a.substring(b,c)},
eG:function(a,b){return this.c0(a,b,null)},
n:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.e(C.I)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
dF:function(a,b,c){if(c>a.length)throw H.e(P.a_(c,0,a.length,null,null))
return H.m7(a,b,c)},
a9:function(a,b){return this.dF(a,b,0)},
ga_:function(a){return a.length===0},
aP:function(a,b){var z
if(typeof b!=="string")throw H.e(H.K(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
i:function(a){return a},
gK:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gm:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.P(a,b))
if(b>=a.length||b<0)throw H.e(H.P(a,b))
return a[b]},
$isb9:1,
$isae:1}}],["","",,H,{
"^":"",
bm:function(a,b){var z=a.b6(b)
if(!init.globalState.d.cy)init.globalState.f.bg()
return z},
f3:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.q(y).$isp)throw H.e(P.aQ("Arguments to main must be a List: "+H.f(y)))
init.globalState=new H.l2(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dE()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.kA(P.cf(null,H.bl),0)
y.z=H.a(new H.ar(0,null,null,null,null,null,0),[P.r,H.cK])
y.ch=H.a(new H.ar(0,null,null,null,null,null,0),[P.r,null])
if(y.x===!0){x=new H.l1()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.i4,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.l3)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.a(new H.ar(0,null,null,null,null,null,0),[P.r,H.bN])
w=P.aU(null,null,null,P.r)
v=new H.bN(0,null,!1)
u=new H.cK(y,x,w,init.createNewIsolate(),v,new H.aC(H.c_()),new H.aC(H.c_()),!1,!1,[],P.aU(null,null,null,null),null,null,!1,!0,P.aU(null,null,null,null))
w.aO(0,0)
u.d3(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bp()
x=H.aL(y,[y]).aB(a)
if(x)u.b6(new H.m5(z,a))
else{y=H.aL(y,[y,y]).aB(a)
if(y)u.b6(new H.m6(z,a))
else u.b6(a)}init.globalState.f.bg()},
i8:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.i9()
return},
i9:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.W("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.W("Cannot extract URI from \""+H.f(z)+"\""))},
i4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bQ(!0,[]).aE(b.data)
y=J.E(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bQ(!0,[]).aE(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bQ(!0,[]).aE(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.a(new H.ar(0,null,null,null,null,null,0),[P.r,H.bN])
p=P.aU(null,null,null,P.r)
o=new H.bN(0,null,!1)
n=new H.cK(y,q,p,init.createNewIsolate(),o,new H.aC(H.c_()),new H.aC(H.c_()),!1,!1,[],P.aU(null,null,null,null),null,null,!1,!0,P.aU(null,null,null,null))
p.aO(0,0)
n.d3(0,o)
init.globalState.f.a.as(new H.bl(n,new H.i5(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bg()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aO(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.bg()
break
case"close":init.globalState.ch.ag(0,$.$get$dF().h(0,a))
a.terminate()
init.globalState.f.bg()
break
case"log":H.i3(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aj(["command","print","msg",z])
q=new H.aH(!0,P.b_(null,P.r)).ad(q)
y.toString
self.postMessage(q)}else P.M(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
i3:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aj(["command","log","msg",a])
x=new H.aH(!0,P.b_(null,P.r)).ad(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.G(w)
z=H.U(w)
throw H.e(P.bA(z))}},
i6:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.e2=$.e2+("_"+y)
$.e3=$.e3+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aO(f,["spawned",new H.bS(y,x),w,z.r])
x=new H.i7(a,b,c,d,z)
if(e===!0){z.dB(w,w)
init.globalState.f.a.as(new H.bl(z,x,"start isolate"))}else x.$0()},
lt:function(a){return new H.bQ(!0,[]).aE(new H.aH(!1,P.b_(null,P.r)).ad(a))},
m5:{
"^":"d:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
m6:{
"^":"d:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
l2:{
"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{l3:function(a){var z=P.aj(["command","print","msg",a])
return new H.aH(!0,P.b_(null,P.r)).ad(z)}}},
cK:{
"^":"c;a,b,c,hO:d<,h_:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
dB:function(a,b){if(!this.f.w(0,a))return
if(this.Q.aO(0,b)&&!this.y)this.y=!0
this.ck()},
ia:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ag(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.h(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.h(v,w)
v[w]=x
if(w===y.c)y.dd();++y.d}this.y=!1}this.ck()},
fI:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
i9:function(a){var z,y,x
if(this.ch==null)return
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.Q(new P.W("removeRange"))
P.aW(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
eA:function(a,b){if(!this.r.w(0,a))return
this.db=b},
hD:function(a,b,c){var z=J.q(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){J.aO(a,c)
return}z=this.cx
if(z==null){z=P.cf(null,null)
this.cx=z}z.as(new H.kR(a,c))},
hB:function(a,b){var z
if(!this.r.w(0,a))return
z=J.q(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){this.cA()
return}z=this.cx
if(z==null){z=P.cf(null,null)
this.cx=z}z.as(this.ghR())},
hE:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.M(a)
if(b!=null)P.M(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aP(a)
y[1]=b==null?null:J.aP(b)
for(x=new P.dI(z,z.r,null,null),x.c=z.e;x.C();)J.aO(x.d,y)},
b6:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.G(u)
w=t
v=H.U(u)
this.hE(w,v)
if(this.db===!0){this.cA()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghO()
if(this.cx!=null)for(;t=this.cx,!t.ga_(t);)this.cx.e3().$0()}return y},
dV:function(a){return this.b.h(0,a)},
d3:function(a,b){var z=this.b
if(z.a4(a))throw H.e(P.bA("Registry: ports must be registered only once."))
z.p(0,a,b)},
ck:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.cA()},
cA:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a3(0)
for(z=this.b,y=z.gef(z),y=y.gL(y);y.C();)y.gG().f8()
z.a3(0)
this.c.a3(0)
init.globalState.z.ag(0,this.a)
this.dx.a3(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
J.aO(w,z[v])}this.ch=null}},"$0","ghR",0,0,2]},
kR:{
"^":"d:2;a,b",
$0:function(){J.aO(this.a,this.b)}},
kA:{
"^":"c;a,b",
he:function(){var z=this.a
if(z.b===z.c)return
return z.e3()},
e9:function(){var z,y,x
z=this.he()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a4(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga_(y)}else y=!1
else y=!1
else y=!1
if(y)H.Q(P.bA("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga_(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aj(["command","close"])
x=new H.aH(!0,H.a(new P.eC(0,null,null,null,null,null,0),[null,P.r])).ad(x)
y.toString
self.postMessage(x)}return!1}z.i8()
return!0},
dq:function(){if(self.window!=null)new H.kB(this).$0()
else for(;this.e9(););},
bg:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.dq()
else try{this.dq()}catch(x){w=H.G(x)
z=w
y=H.U(x)
w=init.globalState.Q
v=P.aj(["command","error","msg",H.f(z)+"\n"+H.f(y)])
v=new H.aH(!0,P.b_(null,P.r)).ad(v)
w.toString
self.postMessage(v)}}},
kB:{
"^":"d:2;a",
$0:function(){if(!this.a.e9())return
P.cz(C.w,this)}},
bl:{
"^":"c;a,b,c",
i8:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.b6(this.b)}},
l1:{
"^":"c;"},
i5:{
"^":"d:1;a,b,c,d,e,f",
$0:function(){H.i6(this.a,this.b,this.c,this.d,this.e,this.f)}},
i7:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bp()
w=H.aL(x,[x,x]).aB(y)
if(w)y.$2(this.b,this.c)
else{x=H.aL(x,[x]).aB(y)
if(x)y.$1(this.b)
else y.$0()}}z.ck()}},
ew:{
"^":"c;"},
bS:{
"^":"ew;b,a",
bU:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gdg())return
x=H.lt(b)
if(z.gh_()===y){y=J.E(x)
switch(y.h(x,0)){case"pause":z.dB(y.h(x,1),y.h(x,2))
break
case"resume":z.ia(y.h(x,1))
break
case"add-ondone":z.fI(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.i9(y.h(x,1))
break
case"set-errors-fatal":z.eA(y.h(x,1),y.h(x,2))
break
case"ping":z.hD(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.hB(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.aO(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ag(0,y)
break}return}y=init.globalState.f
w="receive "+H.f(b)
y.a.as(new H.bl(z,new H.l5(this,x),w))},
w:function(a,b){if(b==null)return!1
return b instanceof H.bS&&J.H(this.b,b.b)},
gK:function(a){return this.b.gcd()}},
l5:{
"^":"d:1;a,b",
$0:function(){var z=this.a.b
if(!z.gdg())z.f2(this.b)}},
cL:{
"^":"ew;b,c,a",
bU:function(a,b){var z,y,x
z=P.aj(["command","message","port",this,"msg",b])
y=new H.aH(!0,P.b_(null,P.r)).ad(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
w:function(a,b){if(b==null)return!1
return b instanceof H.cL&&J.H(this.b,b.b)&&J.H(this.a,b.a)&&J.H(this.c,b.c)},
gK:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eC()
y=this.a
if(typeof y!=="number")return y.eC()
x=this.c
if(typeof x!=="number")return H.u(x)
return(z<<16^y<<8^x)>>>0}},
bN:{
"^":"c;cd:a<,b,dg:c<",
f8:function(){this.c=!0
this.b=null},
f2:function(a){if(this.c)return
this.fm(a)},
fm:function(a){return this.b.$1(a)},
$isiX:1},
jw:{
"^":"c;a,b,c",
eV:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.as(new H.bl(y,new H.jy(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.O(new H.jz(this,b),0),a)}else throw H.e(new P.W("Timer greater than 0."))},
static:{jx:function(a,b){var z=new H.jw(!0,!1,null)
z.eV(a,b)
return z}}},
jy:{
"^":"d:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
jz:{
"^":"d:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aC:{
"^":"c;cd:a<",
gK:function(a){var z=this.a
if(typeof z!=="number")return z.ix()
z=C.b.b3(z,0)^C.b.aC(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aC){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aH:{
"^":"c;a,b",
ad:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.p(0,a,z.gm(z))
z=J.q(a)
if(!!z.$isdT)return["buffer",a]
if(!!z.$iscn)return["typed",a]
if(!!z.$isb9)return this.ew(a)
if(!!z.$isi2){x=this.ges()
w=a.gY()
w=H.bG(w,x,H.a9(w,"a4",0),null)
w=P.bd(w,!0,H.a9(w,"a4",0))
z=z.gef(a)
z=H.bG(z,x,H.a9(z,"a4",0),null)
return["map",w,P.bd(z,!0,H.a9(z,"a4",0))]}if(!!z.$isih)return this.ex(a)
if(!!z.$isj)this.ed(a)
if(!!z.$isiX)this.bj(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbS)return this.ey(a)
if(!!z.$iscL)return this.ez(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.bj(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaC)return["capability",a.a]
if(!(a instanceof P.c))this.ed(a)
return["dart",init.classIdExtractor(a),this.ev(init.classFieldsExtractor(a))]},"$1","ges",2,0,0],
bj:function(a,b){throw H.e(new P.W(H.f(b==null?"Can't transmit:":b)+" "+H.f(a)))},
ed:function(a){return this.bj(a,null)},
ew:function(a){var z=this.eu(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bj(a,"Can't serialize indexable: ")},
eu:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.ad(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
ev:function(a){var z
for(z=0;z<a.length;++z)C.a.p(a,z,this.ad(a[z]))
return a},
ex:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.bj(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.ad(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
ez:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
ey:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gcd()]
return["raw sendport",a]}},
bQ:{
"^":"c;a,b",
aE:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aQ("Bad serialized message: "+H.f(a)))
switch(C.a.gJ(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=H.a(this.b5(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return H.a(this.b5(x),[null])
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.b5(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.a(this.b5(x),[null])
y.fixed$length=Array
return y
case"map":return this.hh(a)
case"sendport":return this.hi(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.hg(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.aC(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.b5(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.f(a))}},"$1","ghf",2,0,0],
b5:function(a){var z,y,x
z=J.E(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.u(x)
if(!(y<x))break
z.p(a,y,this.aE(z.h(a,y)));++y}return a},
hh:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.a6()
this.b.push(w)
y=J.fS(y,this.ghf()).cQ(0)
for(z=J.E(y),v=J.E(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.h(y,u)
w.p(0,y[u],this.aE(v.h(x,u)))}return w},
hi:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.H(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dV(w)
if(u==null)return
t=new H.bS(u,x)}else t=new H.cL(y,w,x)
this.b.push(t)
return t},
hg:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.E(y)
v=J.E(x)
u=0
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.u(t)
if(!(u<t))break
w[z.h(y,u)]=this.aE(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
hq:function(){throw H.e(new P.W("Cannot modify unmodifiable Map"))},
lO:function(a){return init.types[a]},
eY:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.q(a).$isbb},
f:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aP(a)
if(typeof z!=="string")throw H.e(H.K(a))
return z},
au:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
e1:function(a,b){throw H.e(new P.aq(a,null,null))},
iS:function(a,b,c){var z,y
H.lD(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.e1(a,c)
if(3>=z.length)return H.h(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.e1(a,c)},
bM:function(a){var z,y,x,w,v,u,t
z=J.q(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.q(a).$isbk){v=C.C(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof t==="string"&&/^\w+$/.test(t))w=t}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.i.aD(w,0)===36)w=C.i.eG(w,1)
return(w+H.cV(H.bV(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
bL:function(a){return"Instance of '"+H.bM(a)+"'"},
e0:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
iT:function(a){var z,y,x,w
z=H.a([],[P.r])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.L)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.e(H.K(w))
if(w<=65535)z.push(w)
else if(w<=1114111){z.push(55296+(C.c.b3(w-65536,10)&1023))
z.push(56320+(w&1023))}else throw H.e(H.K(w))}return H.e0(z)},
e4:function(a){var z,y,x,w
for(z=a.length,y=0;x=a.length,y<x;x===z||(0,H.L)(a),++y){w=a[y]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.e(H.K(w))
if(w<0)throw H.e(H.K(w))
if(w>65535)return H.iT(a)}return H.e0(a)},
iU:function(a,b,c){var z,y,x,w,v
z=J.X(c)
if(z.bR(c,500)&&b===0&&z.w(c,a.length))return String.fromCharCode.apply(null,a)
if(typeof c!=="number")return H.u(c)
y=b
x=""
for(;y<c;y=w){w=y+500
if(w<c)v=w
else v=c
x+=String.fromCharCode.apply(null,a.subarray(y,v))}return x},
aF:function(a){var z
if(typeof a!=="number")return H.u(a)
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.b.b3(z,10))>>>0,(56320|z&1023)>>>0)}}throw H.e(P.a_(a,0,1114111,null,null))},
a2:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
bK:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.K(a))
return a[b]},
cw:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.K(a))
a[b]=c},
u:function(a){throw H.e(H.K(a))},
h:function(a,b){if(a==null)J.ai(a)
throw H.e(H.P(a,b))},
P:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ao(!0,b,"index",null)
z=J.ai(a)
if(!(b<0)){if(typeof z!=="number")return H.u(z)
y=b>=z}else y=!0
if(y)return P.bC(b,a,"index",null,z)
return P.bg(b,"index",null)},
lM:function(a,b,c){if(a>c)return new P.bf(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.bf(a,c,!0,b,"end","Invalid value")
return new P.ao(!0,b,"end",null)},
K:function(a){return new P.ao(!0,a,null,null)},
an:function(a){return a},
cP:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.K(a))
return a},
lD:function(a){if(typeof a!=="string")throw H.e(H.K(a))
return a},
e:function(a){var z
if(a==null)a=new P.co()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.f4})
z.name=""}else z.toString=H.f4
return z},
f4:function(){return J.aP(this.dartException)},
Q:function(a){throw H.e(a)},
L:function(a){throw H.e(new P.Y(a))},
G:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ma(a)
if(a==null)return
if(a instanceof H.c8)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.b3(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cd(H.f(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.f(y)+" (Error "+w+")"
return z.$1(new H.dZ(v,null))}}if(a instanceof TypeError){u=$.$get$ei()
t=$.$get$ej()
s=$.$get$ek()
r=$.$get$el()
q=$.$get$ep()
p=$.$get$eq()
o=$.$get$en()
$.$get$em()
n=$.$get$es()
m=$.$get$er()
l=u.af(y)
if(l!=null)return z.$1(H.cd(y,l))
else{l=t.af(y)
if(l!=null){l.method="call"
return z.$1(H.cd(y,l))}else{l=s.af(y)
if(l==null){l=r.af(y)
if(l==null){l=q.af(y)
if(l==null){l=p.af(y)
if(l==null){l=o.af(y)
if(l==null){l=r.af(y)
if(l==null){l=n.af(y)
if(l==null){l=m.af(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dZ(y,l==null?null:l.method))}}return z.$1(new H.kd(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.ea()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ao(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.ea()
return a},
U:function(a){var z
if(a instanceof H.c8)return a.b
if(a==null)return new H.eD(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eD(a,null)},
m3:function(a){if(a==null||typeof a!='object')return J.R(a)
else return H.au(a)},
eV:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
lW:function(a,b,c,d,e,f,g){var z=J.q(c)
if(z.w(c,0))return H.bm(b,new H.lX(a))
else if(z.w(c,1))return H.bm(b,new H.lY(a,d))
else if(z.w(c,2))return H.bm(b,new H.lZ(a,d,e))
else if(z.w(c,3))return H.bm(b,new H.m_(a,d,e,f))
else if(z.w(c,4))return H.bm(b,new H.m0(a,d,e,f,g))
else throw H.e(P.bA("Unsupported number of arguments for wrapped closure"))},
O:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.lW)
a.$identity=z
return z},
ho:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.q(c).$isp){z.$reflectionInfo=c
x=H.j_(z).r}else x=c
w=d?Object.create(new H.jf().constructor.prototype):Object.create(new H.c5(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ab
$.ab=J.b5(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.dg(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.lO(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.dd:H.c6
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.dg(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
hl:function(a,b,c,d){var z=H.c6
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dg:function(a,b,c){var z,y,x,w,v,u
if(c)return H.hn(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.hl(y,!w,z,b)
if(y===0){w=$.aR
if(w==null){w=H.bw("self")
$.aR=w}w="return function(){return this."+H.f(w)+"."+H.f(z)+"();"
v=$.ab
$.ab=J.b5(v,1)
return new Function(w+H.f(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aR
if(v==null){v=H.bw("self")
$.aR=v}v=w+H.f(v)+"."+H.f(z)+"("+u+");"
w=$.ab
$.ab=J.b5(w,1)
return new Function(v+H.f(w)+"}")()},
hm:function(a,b,c,d){var z,y
z=H.c6
y=H.dd
switch(b?-1:a){case 0:throw H.e(new H.j2("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hn:function(a,b){var z,y,x,w,v,u,t,s
z=H.hb()
y=$.dc
if(y==null){y=H.bw("receiver")
$.dc=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hm(w,!u,x,b)
if(w===1){y="return function(){return this."+H.f(z)+"."+H.f(x)+"(this."+H.f(y)+");"
u=$.ab
$.ab=J.b5(u,1)
return new Function(y+H.f(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.f(z)+"."+H.f(x)+"(this."+H.f(y)+", "+s+");"
u=$.ab
$.ab=J.b5(u,1)
return new Function(y+H.f(u)+"}")()},
cQ:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.q(c).$isp){c.fixed$length=Array
z=c}else z=c
return H.ho(a,b,z,!!d,e,f)},
m4:function(a,b){var z=J.E(b)
throw H.e(H.df(H.bM(a),z.c0(b,3,z.gm(b))))},
lV:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.q(a)[b]
else z=!0
if(z)return a
H.m4(a,b)},
m9:function(a){throw H.e(new P.hs("Cyclic initialization for static "+H.f(a)))},
aL:function(a,b,c){return new H.j3(a,b,c,null)},
bp:function(){return C.H},
c_:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a:function(a,b){a.$builtinTypeInfo=b
return a},
bV:function(a){if(a==null)return
return a.$builtinTypeInfo},
eW:function(a,b){return H.cY(a["$as"+H.f(b)],H.bV(a))},
a9:function(a,b,c){var z=H.eW(a,b)
return z==null?null:z[c]},
C:function(a,b){var z=H.bV(a)
return z==null?null:z[b]},
cX:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cV(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.i(a)
else return},
cV:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bj("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.f(H.cX(u,c))}return w?"":"<"+H.f(z)+">"},
cY:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
lE:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bV(a)
y=J.q(a)
if(y[b]==null)return!1
return H.eR(H.cY(y[d],z),c)},
m8:function(a,b,c,d){if(a!=null&&!H.lE(a,b,c,d))throw H.e(H.df(H.bM(a),(b.substring(3)+H.cV(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
eR:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a5(a[y],b[y]))return!1
return!0},
bo:function(a,b,c){return a.apply(b,H.eW(b,c))},
a5:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eX(a,b)
if('func' in a)return b.builtin$cls==="hM"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cX(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.f(H.cX(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.eR(H.cY(v,z),x)},
eQ:function(a,b,c){var z,y,x,w,v
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
lz:function(a,b){var z,y,x,w,v,u
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
eX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
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
if(t===s){if(!H.eQ(x,w,!1))return!1
if(!H.eQ(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}}return H.lz(a.named,b.named)},
nM:function(a){var z=$.cT
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
nL:function(a){return H.au(a)},
nK:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
m1:function(a){var z,y,x,w,v,u
z=$.cT.$1(a)
y=$.bU[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bW[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eP.$2(a,z)
if(z!=null){y=$.bU[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bW[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cW(x)
$.bU[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bW[z]=x
return x}if(v==="-"){u=H.cW(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.f0(a,x)
if(v==="*")throw H.e(new P.cG(z))
if(init.leafTags[z]===true){u=H.cW(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.f0(a,x)},
f0:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bY(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cW:function(a){return J.bY(a,!1,null,!!a.$isbb)},
m2:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bY(z,!1,null,!!z.$isbb)
else return J.bY(z,c,null,null)},
lT:function(){if(!0===$.cU)return
$.cU=!0
H.lU()},
lU:function(){var z,y,x,w,v,u,t,s
$.bU=Object.create(null)
$.bW=Object.create(null)
H.lP()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.f1.$1(v)
if(u!=null){t=H.m2(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
lP:function(){var z,y,x,w,v,u,t
z=C.S()
z=H.aK(C.P,H.aK(C.U,H.aK(C.D,H.aK(C.D,H.aK(C.T,H.aK(C.Q,H.aK(C.R(C.C),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cT=new H.lQ(v)
$.eP=new H.lR(u)
$.f1=new H.lS(t)},
aK:function(a,b){return a(b)||b},
m7:function(a,b,c){return a.indexOf(b,c)>=0},
hp:{
"^":"c;",
ga_:function(a){return J.H(this.gm(this),0)},
i:function(a){return P.ch(this)},
p:function(a,b,c){return H.hq()},
$isaV:1},
bB:{
"^":"hp;a",
bs:function(){var z=this.$map
if(z==null){z=new H.ar(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.eV(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.bs().h(0,b)},
P:function(a,b){this.bs().P(0,b)},
gY:function(){return this.bs().gY()},
gm:function(a){var z=this.bs()
return z.gm(z)}},
iZ:{
"^":"c;a,b,c,d,e,f,r,x",
static:{j_:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.iZ(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
kb:{
"^":"c;a,b,c,d,e,f",
af:function(a){var z,y,x
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
static:{af:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.kb(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bP:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},eo:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dZ:{
"^":"S;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.f(this.a)
return"NullError: method not found: '"+H.f(z)+"' on null"}},
ij:{
"^":"S;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.f(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.f(z)+"' ("+H.f(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.f(z)+"' on '"+H.f(y)+"' ("+H.f(this.a)+")"},
static:{cd:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ij(a,y,z?null:b.receiver)}}},
kd:{
"^":"S;a",
i:function(a){var z=this.a
return C.i.ga_(z)?"Error":"Error: "+z}},
c8:{
"^":"c;a,aj:b<"},
ma:{
"^":"d:0;a",
$1:function(a){if(!!J.q(a).$isS)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eD:{
"^":"c;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
lX:{
"^":"d:1;a",
$0:function(){return this.a.$0()}},
lY:{
"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
lZ:{
"^":"d:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
m_:{
"^":"d:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
m0:{
"^":"d:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"c;",
i:function(a){return"Closure '"+H.bM(this)+"'"},
gei:function(){return this},
gei:function(){return this}},
ec:{
"^":"d;"},
jf:{
"^":"ec;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
c5:{
"^":"ec;a,b,c,d",
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c5))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gK:function(a){var z,y
z=this.c
if(z==null)y=H.au(this.a)
else y=typeof z!=="object"?J.R(z):H.au(z)
z=H.au(this.b)
if(typeof y!=="number")return y.iz()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.f(this.d)+"' of "+H.bL(z)},
static:{c6:function(a){return a.a},dd:function(a){return a.c},hb:function(){var z=$.aR
if(z==null){z=H.bw("self")
$.aR=z}return z},bw:function(a){var z,y,x,w,v
z=new H.c5("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
hd:{
"^":"S;a",
i:function(a){return this.a},
static:{df:function(a,b){return new H.hd("CastError: Casting value of type "+H.f(a)+" to incompatible type "+H.f(b))}}},
j2:{
"^":"S;a",
i:function(a){return"RuntimeError: "+H.f(this.a)}},
e6:{
"^":"c;"},
j3:{
"^":"e6;a,b,c,d",
aB:function(a){var z=this.fe(a)
return z==null?!1:H.eX(z,this.aV())},
fe:function(a){var z=J.q(a)
return"$signature" in z?z.$signature():null},
aV:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.q(y)
if(!!x.$isnu)z.v=true
else if(!x.$isdt)z.ret=y.aV()
y=this.b
if(y!=null&&y.length!==0)z.args=H.e5(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.e5(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eU(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aV()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.f(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.f(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.eU(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.f(z[s].aV())+" "+s}x+="}"}}return x+(") -> "+H.f(this.a))},
static:{e5:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aV())
return z}}},
dt:{
"^":"e6;",
i:function(a){return"dynamic"},
aV:function(){return}},
ar:{
"^":"c;a,b,c,d,e,f,r",
gm:function(a){return this.a},
ga_:function(a){return this.a===0},
gY:function(){return H.a(new H.iq(this),[H.C(this,0)])},
gef:function(a){return H.bG(this.gY(),new H.ii(this),H.C(this,0),H.C(this,1))},
a4:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.d8(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.d8(y,a)}else return this.hI(a)},
hI:function(a){var z=this.d
if(z==null)return!1
return this.b8(this.al(z,this.b7(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.al(z,b)
return y==null?null:y.gaG()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.al(x,b)
return y==null?null:y.gaG()}else return this.hJ(b)},
hJ:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.al(z,this.b7(a))
x=this.b8(y,a)
if(x<0)return
return y[x].gaG()},
p:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.cf()
this.b=z}this.d2(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.cf()
this.c=y}this.d2(y,b,c)}else{x=this.d
if(x==null){x=this.cf()
this.d=x}w=this.b7(b)
v=this.al(x,w)
if(v==null)this.ci(x,w,[this.cg(b,c)])
else{u=this.b8(v,b)
if(u>=0)v[u].saG(c)
else v.push(this.cg(b,c))}}},
ag:function(a,b){if(typeof b==="string")return this.dn(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.dn(this.c,b)
else return this.hK(b)},
hK:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.al(z,this.b7(a))
x=this.b8(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.du(w)
return w.gaG()},
a3:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.e(new P.Y(this))
z=z.c}},
d2:function(a,b,c){var z=this.al(a,b)
if(z==null)this.ci(a,b,this.cg(b,c))
else z.saG(c)},
dn:function(a,b){var z
if(a==null)return
z=this.al(a,b)
if(z==null)return
this.du(z)
this.d9(a,b)
return z.gaG()},
cg:function(a,b){var z,y
z=new H.ip(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
du:function(a){var z,y
z=a.gfw()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
b7:function(a){return J.R(a)&0x3ffffff},
b8:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.H(a[y].gdP(),b))return y
return-1},
i:function(a){return P.ch(this)},
al:function(a,b){return a[b]},
ci:function(a,b,c){a[b]=c},
d9:function(a,b){delete a[b]},
d8:function(a,b){return this.al(a,b)!=null},
cf:function(){var z=Object.create(null)
this.ci(z,"<non-identifier-key>",z)
this.d9(z,"<non-identifier-key>")
return z},
$isi2:1,
$isaV:1},
ii:{
"^":"d:0;a",
$1:function(a){return this.a.h(0,a)}},
ip:{
"^":"c;dP:a<,aG:b@,c,fw:d<"},
iq:{
"^":"a4;a",
gm:function(a){return this.a.a},
gL:function(a){var z,y
z=this.a
y=new H.ir(z,z.r,null,null)
y.c=z.e
return y},
a9:function(a,b){return this.a.a4(b)},
P:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.Y(z))
y=y.c}},
$isA:1},
ir:{
"^":"c;a,b,c,d",
gG:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.Y(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
lQ:{
"^":"d:0;a",
$1:function(a){return this.a(a)}},
lR:{
"^":"d:15;a",
$2:function(a,b){return this.a(a,b)}},
lS:{
"^":"d:3;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
cb:function(){return new P.aG("No element")},
ib:function(){return new P.aG("Too few elements")},
bi:function(a,b,c,d){if(c-b<=32)H.j7(a,b,c,d)
else H.j6(a,b,c,d)},
j7:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.E(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a3(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.p(a,w,y.h(a,v))
w=v}y.p(a,w,x)}},
j6:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.aC(c-b+1,6)
y=b+z
x=c-z
w=C.c.aC(b+c,2)
v=w-z
u=w+z
t=J.E(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a3(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a3(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a3(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a3(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a3(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a3(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a3(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a3(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a3(d.$2(p,o),0)){n=o
o=p
p=n}t.p(a,y,s)
t.p(a,w,q)
t.p(a,x,o)
t.p(a,v,t.h(a,b))
t.p(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.H(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.q(i)
if(h.w(i,0))continue
if(h.ar(i,0)){if(k!==m){t.p(a,k,t.h(a,m))
t.p(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.X(i)
if(h.aK(i,0)){--l
continue}else{g=l-1
if(h.ar(i,0)){t.p(a,k,t.h(a,m))
f=m+1
t.p(a,m,t.h(a,l))
t.p(a,l,j)
l=g
m=f
break}else{t.p(a,k,t.h(a,l))
t.p(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.aN(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.h(a,m))
t.p(a,m,j)}++m}else if(J.a3(d.$2(j,p),0))for(;!0;)if(J.a3(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.aN(d.$2(t.h(a,l),r),0)){t.p(a,k,t.h(a,m))
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
H.bi(a,b,m-2,d)
H.bi(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.H(d.$2(t.h(a,m),r),0);)++m
for(;J.H(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.H(d.$2(j,r),0)){if(k!==m){t.p(a,k,t.h(a,m))
t.p(a,m,j)}++m}else if(J.H(d.$2(j,p),0))for(;!0;)if(J.H(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.aN(d.$2(t.h(a,l),r),0)){t.p(a,k,t.h(a,m))
f=m+1
t.p(a,m,t.h(a,l))
t.p(a,l,j)
m=f}else{t.p(a,k,t.h(a,l))
t.p(a,l,j)}l=g
break}}H.bi(a,m,l,d)}else H.bi(a,m,l,d)},
bc:{
"^":"a4;",
gL:function(a){return new H.dJ(this,this.gm(this),0,null)},
P:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.a5(0,y))
if(z!==this.gm(this))throw H.e(new P.Y(this))}},
a9:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){if(J.H(this.a5(0,y),b))return!0
if(z!==this.gm(this))throw H.e(new P.Y(this))}return!1},
aS:function(a,b){return H.a(new H.cg(this,b),[null,null])},
cR:function(a,b){var z,y,x
z=H.a([],[H.a9(this,"bc",0)])
C.a.sm(z,this.gm(this))
for(y=0;y<this.gm(this);++y){x=this.a5(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cQ:function(a){return this.cR(a,!0)},
$isA:1},
dJ:{
"^":"c;a,b,c,d",
gG:function(){return this.d},
C:function(){var z,y,x,w
z=this.a
y=J.E(z)
x=y.gm(z)
if(this.b!==x)throw H.e(new P.Y(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a5(z,w);++this.c
return!0}},
dK:{
"^":"a4;a,b",
gL:function(a){var z=new H.iv(null,J.aB(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gm:function(a){return J.ai(this.a)},
$asa4:function(a,b){return[b]},
static:{bG:function(a,b,c,d){if(!!J.q(a).$isA)return H.a(new H.du(a,b),[c,d])
return H.a(new H.dK(a,b),[c,d])}}},
du:{
"^":"dK;a,b",
$isA:1},
iv:{
"^":"ic;a,b,c",
C:function(){var z=this.b
if(z.C()){this.a=this.cc(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
cc:function(a){return this.c.$1(a)}},
cg:{
"^":"bc;a,b",
gm:function(a){return J.ai(this.a)},
a5:function(a,b){return this.cc(J.ft(this.a,b))},
cc:function(a){return this.b.$1(a)},
$asbc:function(a,b){return[b]},
$asa4:function(a,b){return[b]},
$isA:1},
dA:{
"^":"c;"}}],["","",,H,{
"^":"",
eU:function(a){var z=H.a(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
kn:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.lA()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.O(new P.kp(z),1)).observe(y,{childList:true})
return new P.ko(z,y,x)}else if(self.setImmediate!=null)return P.lB()
return P.lC()},
nv:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.O(new P.kq(a),0))},"$1","lA",2,0,7],
nw:[function(a){++init.globalState.f.b
self.setImmediate(H.O(new P.kr(a),0))},"$1","lB",2,0,7],
nx:[function(a){P.cA(C.w,a)},"$1","lC",2,0,7],
b:function(a,b,c){if(b===0){J.fi(c,a)
return}else if(b===1){c.dE(H.G(a),H.U(a))
return}P.lk(a,b)
return c.ghA()},
lk:function(a,b){var z,y,x,w
z=new P.ll(b)
y=new P.lm(b)
x=J.q(a)
if(!!x.$isz)a.cj(z,y)
else if(!!x.$isa0)a.bh(z,y)
else{w=H.a(new P.z(0,$.m,null),[null])
w.a=4
w.c=a
w.cj(z,null)}},
x:function(a){var z=function(b,c){while(true)try{a(b,c)
break}catch(y){c=y
b=1}}
$.m.toString
return new P.ly(z)},
eJ:function(a,b){var z=H.bp()
z=H.aL(z,[z,z]).aB(a)
if(z){b.toString
return a}else{b.toString
return a}},
dB:function(a,b){var z=H.a(new P.z(0,$.m,null),[b])
P.cz(C.w,new P.hP(a,z))
return z},
hN:function(a,b,c){var z=H.a(new P.z(0,$.m,null),[c])
P.cz(a,new P.hO(b,z))
return z},
ca:function(a,b,c){var z,y,x,w,v,u
z={}
y=H.a(new P.z(0,$.m,null),[P.p])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.hR(z,!1,b,y)
for(w=a.length,v=0;v<a.length;a.length===w||(0,H.L)(a),++v)a[v].bh(new P.hQ(z,!1,b,y,z.b++),x)
x=z.b
if(x===0){z=H.a(new P.z(0,$.m,null),[null])
z.b1(C.Z)
return z}u=new Array(x)
u.fixed$length=Array
z.a=u
return y},
w:function(a){return H.a(new P.le(H.a(new P.z(0,$.m,null),[a])),[a])},
eG:function(a,b,c){$.m.toString
a.R(b,c)},
lv:function(){var z,y
for(;z=$.aI,z!=null;){$.b2=null
y=z.c
$.aI=y
if(y==null)$.b1=null
$.m=z.b
z.fR()}},
nJ:[function(){$.cM=!0
try{P.lv()}finally{$.m=C.d
$.b2=null
$.cM=!1
if($.aI!=null)$.$get$cH().$1(P.eS())}},"$0","eS",0,0,2],
eO:function(a){if($.aI==null){$.b1=a
$.aI=a
if(!$.cM)$.$get$cH().$1(P.eS())}else{$.b1.c=a
$.b1=a}},
f2:function(a){var z,y
z=$.m
if(C.d===z){P.aJ(null,null,C.d,a)
return}z.toString
if(C.d.gcw()===z){P.aJ(null,null,z,a)
return}y=$.m
P.aJ(null,null,y,y.cl(a,!0))},
nj:function(a,b){var z,y,x
z=H.a(new P.eE(null,null,null,0),[b])
y=z.gfq()
x=z.gft()
z.a=a.ao(y,!0,z.gfs(),x)
return z},
eN:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.G(u)
z=t
y=H.U(u)
$.m.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.ah(x)
w=t
v=x.gaj()
c.$2(w,v)}}},
ln:function(a,b,c,d){var z=a.bv()
if(!!J.q(z).$isa0)z.bL(new P.lp(b,c,d))
else b.R(c,d)},
eF:function(a,b){return new P.lo(a,b)},
lq:function(a,b,c){var z=a.bv()
if(!!J.q(z).$isa0)z.bL(new P.lr(b,c))
else b.a8(c)},
cz:function(a,b){var z=$.m
if(z===C.d){z.toString
return P.cA(a,b)}return P.cA(a,z.cl(b,!0))},
cA:function(a,b){var z=C.c.aC(a.a,1000)
return H.jx(z<0?0:z,b)},
bn:function(a,b,c,d,e){var z,y,x
z={}
z.a=d
y=new P.ev(new P.lx(z,e),C.d,null)
z=$.aI
if(z==null){P.eO(y)
$.b2=$.b1}else{x=$.b2
if(x==null){y.c=z
$.b2=y
$.aI=y}else{y.c=x.c
x.c=y
$.b2=y
if(y.c==null)$.b1=y}}},
lw:function(a,b){throw H.e(new P.ap(a,b))},
eK:function(a,b,c,d){var z,y
y=$.m
if(y===c)return d.$0()
$.m=c
z=y
try{y=d.$0()
return y}finally{$.m=z}},
eM:function(a,b,c,d,e){var z,y
y=$.m
if(y===c)return d.$1(e)
$.m=c
z=y
try{y=d.$1(e)
return y}finally{$.m=z}},
eL:function(a,b,c,d,e,f){var z,y
y=$.m
if(y===c)return d.$2(e,f)
$.m=c
z=y
try{y=d.$2(e,f)
return y}finally{$.m=z}},
aJ:function(a,b,c,d){var z=C.d!==c
if(z){d=c.cl(d,!(!z||C.d.gcw()===c))
c=C.d}P.eO(new P.ev(d,c,null))},
kp:{
"^":"d:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
ko:{
"^":"d:16;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
kq:{
"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
kr:{
"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ll:{
"^":"d:0;a",
$1:function(a){return this.a.$2(0,a)}},
lm:{
"^":"d:8;a",
$2:function(a,b){this.a.$2(1,new H.c8(a,b))}},
ly:{
"^":"d:17;a",
$2:function(a,b){this.a(a,b)}},
a0:{
"^":"c;"},
hP:{
"^":"d:1;a,b",
$0:function(){var z,y,x,w
try{this.b.a8(this.a.$0())}catch(x){w=H.G(x)
z=w
y=H.U(x)
P.eG(this.b,z,y)}}},
hO:{
"^":"d:1;a,b",
$0:function(){var z,y,x,w
try{this.b.a8(null)}catch(x){w=H.G(x)
z=w
y=H.U(x)
P.eG(this.b,z,y)}}},
hR:{
"^":"d:18;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.R(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.R(z.c,z.d)}},
hQ:{
"^":"d:19;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.h(x,z)
x[z]=a
if(y===0)this.d.c9(x)}else if(z.b===0&&!this.b)this.d.R(z.c,z.d)}},
ex:{
"^":"c;hA:a<",
dE:function(a,b){a=a!=null?a:new P.co()
if(this.a.a!==0)throw H.e(new P.aG("Future already completed"))
$.m.toString
this.R(a,b)},
X:function(a){return this.dE(a,null)}},
a8:{
"^":"ex;a",
S:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.aG("Future already completed"))
z.b1(b)},
R:function(a,b){this.a.f6(a,b)}},
le:{
"^":"ex;a",
S:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.aG("Future already completed"))
z.a8(b)},
R:function(a,b){this.a.R(a,b)}},
aY:{
"^":"c;dh:a<,cL:b>,c,d,e",
gaN:function(){return this.b.b},
gdO:function(){return(this.c&1)!==0},
ghG:function(){return this.c===6},
ghF:function(){return this.c===8},
gfv:function(){return this.d},
gfH:function(){return this.d}},
z:{
"^":"c;bu:a?,aN:b<,c",
gfn:function(){return this.a===8},
sfo:function(a){this.a=2},
bh:function(a,b){var z=$.m
if(z!==C.d){z.toString
if(b!=null)b=P.eJ(b,z)}return this.cj(a,b)},
V:function(a){return this.bh(a,null)},
cj:function(a,b){var z=H.a(new P.z(0,$.m,null),[null])
this.c2(new P.aY(null,z,b==null?1:3,a,b))
return z},
bL:function(a){var z,y
z=$.m
y=new P.z(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.c2(new P.aY(null,y,8,a,null))
return y},
ce:function(){if(this.a!==0)throw H.e(new P.aG("Future already completed"))
this.a=1},
gfG:function(){return this.c},
gb2:function(){return this.c},
fD:function(a,b){this.a=8
this.c=new P.ap(a,b)},
c2:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aJ(null,null,z,new P.kE(this,a))}else{a.a=this.c
this.c=a}},
bt:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gdh()
z.a=y}return y},
a8:function(a){var z,y
z=J.q(a)
if(!!z.$isa0)if(!!z.$isz)P.bR(a,this)
else P.cJ(a,this)
else{y=this.bt()
this.a=4
this.c=a
P.ax(this,y)}},
c9:function(a){var z=this.bt()
this.a=4
this.c=a
P.ax(this,z)},
R:[function(a,b){var z=this.bt()
this.a=8
this.c=new P.ap(a,b)
P.ax(this,z)},function(a){return this.R(a,null)},"iA","$2","$1","gbp",2,2,20,0],
b1:function(a){var z
if(a==null);else{z=J.q(a)
if(!!z.$isa0){if(!!z.$isz){z=a.a
if(z>=4&&z===8){this.ce()
z=this.b
z.toString
P.aJ(null,null,z,new P.kG(this,a))}else P.bR(a,this)}else P.cJ(a,this)
return}}this.ce()
z=this.b
z.toString
P.aJ(null,null,z,new P.kH(this,a))},
f6:function(a,b){var z
this.ce()
z=this.b
z.toString
P.aJ(null,null,z,new P.kF(this,a,b))},
$isa0:1,
static:{cJ:function(a,b){var z,y,x,w
b.sbu(2)
try{a.bh(new P.kI(b),new P.kJ(b))}catch(x){w=H.G(x)
z=w
y=H.U(x)
P.f2(new P.kK(b,z,y))}},bR:function(a,b){var z
b.a=2
z=new P.aY(null,b,0,null,null)
if(a.a>=4)P.ax(a,z)
else a.c2(z)},ax:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gfn()
if(b==null){if(w){v=z.a.gb2()
y=z.a.gaN()
x=J.ah(v)
u=v.gaj()
y.toString
P.bn(null,null,y,x,u)}return}for(;b.gdh()!=null;b=t){t=b.a
b.a=null
P.ax(z.a,b)}x.a=!0
s=w?null:z.a.gfG()
x.b=s
x.c=!1
y=!w
if(!y||b.gdO()||b.c===8){r=b.gaN()
if(w){u=z.a.gaN()
u.toString
if(u==null?r!=null:u!==r){u=u.gcw()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gb2()
y=z.a.gaN()
x=J.ah(v)
u=v.gaj()
y.toString
P.bn(null,null,y,x,u)
return}q=$.m
if(q==null?r!=null:q!==r)$.m=r
else q=null
if(y){if(b.gdO())x.a=new P.kM(x,b,s,r).$0()}else new P.kL(z,x,b,r).$0()
if(b.ghF())new P.kN(z,x,w,b,r).$0()
if(q!=null)$.m=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.q(y).$isa0}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.z)if(p.a>=4){o.a=2
z.a=p
b=new P.aY(null,o,0,null,null)
y=p
continue}else P.bR(p,o)
else P.cJ(p,o)
return}}o=b.b
b=o.bt()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
kE:{
"^":"d:1;a,b",
$0:function(){P.ax(this.a,this.b)}},
kI:{
"^":"d:0;a",
$1:function(a){this.a.c9(a)}},
kJ:{
"^":"d:9;a",
$2:function(a,b){this.a.R(a,b)},
$1:function(a){return this.$2(a,null)}},
kK:{
"^":"d:1;a,b,c",
$0:function(){this.a.R(this.b,this.c)}},
kG:{
"^":"d:1;a,b",
$0:function(){P.bR(this.b,this.a)}},
kH:{
"^":"d:1;a,b",
$0:function(){this.a.c9(this.b)}},
kF:{
"^":"d:1;a,b,c",
$0:function(){this.a.R(this.b,this.c)}},
kM:{
"^":"d:21;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.cN(this.b.gfv(),this.c)
return!0}catch(x){w=H.G(x)
z=w
y=H.U(x)
this.a.b=new P.ap(z,y)
return!1}}},
kL:{
"^":"d:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gb2()
y=!0
r=this.c
if(r.ghG()){x=r.d
try{y=this.d.cN(x,J.ah(z))}catch(q){r=H.G(q)
w=r
v=H.U(q)
r=J.ah(z)
p=w
o=(r==null?p==null:r===p)?z:new P.ap(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.bp()
p=H.aL(p,[p,p]).aB(r)
n=this.d
m=this.b
if(p)m.b=n.ij(u,J.ah(z),z.gaj())
else m.b=n.cN(u,J.ah(z))}catch(q){r=H.G(q)
t=r
s=H.U(q)
r=J.ah(z)
p=t
o=(r==null?p==null:r===p)?z:new P.ap(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
kN:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.e7(this.d.gfH())
z.a=w
v=w}catch(u){z=H.G(u)
y=z
x=H.U(u)
if(this.c){z=J.ah(this.a.a.gb2())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gb2()
else v.b=new P.ap(y,x)
v.a=!1
return}if(!!J.q(v).$isa0){t=this.d
s=t.gcL(t)
s.sfo(!0)
this.b.c=!0
v.bh(new P.kO(this.a,s),new P.kP(z,s))}}},
kO:{
"^":"d:0;a,b",
$1:function(a){P.ax(this.a.a,new P.aY(null,this.b,0,null,null))}},
kP:{
"^":"d:9;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.z)){y=H.a(new P.z(0,$.m,null),[null])
z.a=y
y.fD(a,b)}P.ax(z.a,new P.aY(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
ev:{
"^":"c;a,b,c",
fR:function(){return this.a.$0()}},
al:{
"^":"c;",
aS:function(a,b){return H.a(new P.l4(b,this),[H.a9(this,"al",0),null])},
a9:function(a,b){var z,y
z={}
y=H.a(new P.z(0,$.m,null),[P.b4])
z.a=null
z.a=this.ao(new P.jj(z,this,b,y),!0,new P.jk(y),y.gbp())
return y},
P:function(a,b){var z,y
z={}
y=H.a(new P.z(0,$.m,null),[null])
z.a=null
z.a=this.ao(new P.jn(z,this,b,y),!0,new P.jo(y),y.gbp())
return y},
gm:function(a){var z,y
z={}
y=H.a(new P.z(0,$.m,null),[P.r])
z.a=0
this.ao(new P.jp(z),!0,new P.jq(z,y),y.gbp())
return y},
cQ:function(a){var z,y
z=H.a([],[H.a9(this,"al",0)])
y=H.a(new P.z(0,$.m,null),[[P.p,H.a9(this,"al",0)]])
this.ao(new P.jr(this,z),!0,new P.js(z,y),y.gbp())
return y}},
jj:{
"^":"d;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.eN(new P.jh(this.c,a),new P.ji(z,y),P.eF(z.a,y))},
$signature:function(){return H.bo(function(a){return{func:1,args:[a]}},this.b,"al")}},
jh:{
"^":"d:1;a,b",
$0:function(){return J.H(this.b,this.a)}},
ji:{
"^":"d:22;a,b",
$1:function(a){if(a===!0)P.lq(this.a.a,this.b,!0)}},
jk:{
"^":"d:1;a",
$0:function(){this.a.a8(!1)}},
jn:{
"^":"d;a,b,c,d",
$1:function(a){P.eN(new P.jl(this.c,a),new P.jm(),P.eF(this.a.a,this.d))},
$signature:function(){return H.bo(function(a){return{func:1,args:[a]}},this.b,"al")}},
jl:{
"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
jm:{
"^":"d:0;",
$1:function(a){}},
jo:{
"^":"d:1;a",
$0:function(){this.a.a8(null)}},
jp:{
"^":"d:0;a",
$1:function(a){++this.a.a}},
jq:{
"^":"d:1;a,b",
$0:function(){this.b.a8(this.a.a)}},
jr:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bo(function(a){return{func:1,args:[a]}},this.a,"al")}},
js:{
"^":"d:1;a,b",
$0:function(){this.b.a8(this.a)}},
jg:{
"^":"c;"},
nB:{
"^":"c;"},
ks:{
"^":"c;aN:d<,bu:e?",
cI:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.dC()
if((z&4)===0&&(this.e&32)===0)this.de(this.gdj())},
ac:function(a){return this.cI(a,null)},
e4:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.ga_(z)}else z=!1
if(z)this.r.bT(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.de(this.gdl())}}}},
bv:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.c5()
return this.f},
c5:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.dC()
if((this.e&32)===0)this.r=null
this.f=this.di()},
c4:["eK",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.dr(a)
else this.c3(new P.kx(a,null))}],
c1:["eL",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.dt(a,b)
else this.c3(new P.kz(a,b,null))}],
f5:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.ds()
else this.c3(C.K)},
dk:[function(){},"$0","gdj",0,0,2],
dm:[function(){},"$0","gdl",0,0,2],
di:function(){return},
c3:function(a){var z,y
z=this.r
if(z==null){z=new P.ld(null,null,0)
this.r=z}z.aO(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bT(this)}},
dr:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cO(this.a,a)
this.e=(this.e&4294967263)>>>0
this.c7((z&4)!==0)},
dt:function(a,b){var z,y
z=this.e
y=new P.ku(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.c5()
z=this.f
if(!!J.q(z).$isa0)z.bL(y)
else y.$0()}else{y.$0()
this.c7((z&4)!==0)}},
ds:function(){var z,y
z=new P.kt(this)
this.c5()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.q(y).$isa0)y.bL(z)
else z.$0()},
de:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.c7((z&4)!==0)},
c7:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.ga_(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.ga_(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.dk()
else this.dm()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bT(this)},
eZ:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.eJ(b,z)
this.c=c}},
ku:{
"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bp()
x=H.aL(x,[x,x]).aB(y)
w=z.d
v=this.b
u=z.b
if(x)w.ik(u,v,this.c)
else w.cO(u,v)
z.e=(z.e&4294967263)>>>0}},
kt:{
"^":"d:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.e8(z.c)
z.e=(z.e&4294967263)>>>0}},
ey:{
"^":"c;bA:a@"},
kx:{
"^":"ey;b,a",
cJ:function(a){a.dr(this.b)}},
kz:{
"^":"ey;aF:b>,aj:c<,a",
cJ:function(a){a.dt(this.b,this.c)}},
ky:{
"^":"c;",
cJ:function(a){a.ds()},
gbA:function(){return},
sbA:function(a){throw H.e(new P.aG("No events after a done."))}},
l6:{
"^":"c;bu:a?",
bT:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.f2(new P.l7(this,a))
this.a=1},
dC:function(){if(this.a===1)this.a=3}},
l7:{
"^":"d:1;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.hC(this.b)}},
ld:{
"^":"l6;b,c,a",
ga_:function(a){return this.c==null},
aO:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbA(b)
this.c=b}},
hC:function(a){var z,y
z=this.b
y=z.gbA()
this.b=y
if(y==null)this.c=null
z.cJ(a)}},
eE:{
"^":"c;a,b,c,bu:d?",
d4:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
iE:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a8(!0)
return}this.a.ac(0)
this.c=a
this.d=3},"$1","gfq",2,0,function(){return H.bo(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"eE")}],
fu:[function(a,b){var z
if(this.d===2){z=this.c
this.d4(0)
z.R(a,b)
return}this.a.ac(0)
this.c=new P.ap(a,b)
this.d=4},function(a){return this.fu(a,null)},"iG","$2","$1","gft",2,2,23,0],
iF:[function(){if(this.d===2){var z=this.c
this.d4(0)
z.a8(!1)
return}this.a.ac(0)
this.c=null
this.d=5},"$0","gfs",0,0,2]},
lp:{
"^":"d:1;a,b,c",
$0:function(){return this.a.R(this.b,this.c)}},
lo:{
"^":"d:8;a,b",
$2:function(a,b){return P.ln(this.a,this.b,a,b)}},
lr:{
"^":"d:1;a,b",
$0:function(){return this.a.a8(this.b)}},
cI:{
"^":"al;",
ao:function(a,b,c,d){return this.fb(a,d,c,!0===b)},
dU:function(a,b,c){return this.ao(a,null,b,c)},
fb:function(a,b,c,d){return P.kD(this,a,b,c,d,H.a9(this,"cI",0),H.a9(this,"cI",1))},
df:function(a,b){b.c4(a)},
$asal:function(a,b){return[b]}},
ez:{
"^":"ks;x,y,a,b,c,d,e,f,r",
c4:function(a){if((this.e&2)!==0)return
this.eK(a)},
c1:function(a,b){if((this.e&2)!==0)return
this.eL(a,b)},
dk:[function(){var z=this.y
if(z==null)return
z.ac(0)},"$0","gdj",0,0,2],
dm:[function(){var z=this.y
if(z==null)return
z.e4()},"$0","gdl",0,0,2],
di:function(){var z=this.y
if(z!=null){this.y=null
return z.bv()}return},
iB:[function(a){this.x.df(a,this)},"$1","gfj",2,0,function(){return H.bo(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"ez")}],
iD:[function(a,b){this.c1(a,b)},"$2","gfl",4,0,24],
iC:[function(){this.f5()},"$0","gfk",0,0,2],
f_:function(a,b,c,d,e,f,g){var z,y
z=this.gfj()
y=this.gfl()
this.y=this.x.a.dU(z,this.gfk(),y)},
static:{kD:function(a,b,c,d,e,f,g){var z=$.m
z=H.a(new P.ez(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.eZ(b,c,d,e)
z.f_(a,b,c,d,e,f,g)
return z}}},
l4:{
"^":"cI;b,a",
df:function(a,b){var z,y,x,w,v
z=null
try{z=this.fF(a)}catch(w){v=H.G(w)
y=v
x=H.U(w)
$.m.toString
b.c1(y,x)
return}b.c4(z)},
fF:function(a){return this.b.$1(a)}},
ap:{
"^":"c;aF:a>,aj:b<",
i:function(a){return H.f(this.a)},
$isS:1},
lj:{
"^":"c;"},
lx:{
"^":"d:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.co()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
P.lw(z,y)}},
l9:{
"^":"lj;",
gcw:function(){return this},
e8:function(a){var z,y,x,w
try{if(C.d===$.m){x=a.$0()
return x}x=P.eK(null,null,this,a)
return x}catch(w){x=H.G(w)
z=x
y=H.U(w)
return P.bn(null,null,this,z,y)}},
cO:function(a,b){var z,y,x,w
try{if(C.d===$.m){x=a.$1(b)
return x}x=P.eM(null,null,this,a,b)
return x}catch(w){x=H.G(w)
z=x
y=H.U(w)
return P.bn(null,null,this,z,y)}},
ik:function(a,b,c){var z,y,x,w
try{if(C.d===$.m){x=a.$2(b,c)
return x}x=P.eL(null,null,this,a,b,c)
return x}catch(w){x=H.G(w)
z=x
y=H.U(w)
return P.bn(null,null,this,z,y)}},
cl:function(a,b){if(b)return new P.la(this,a)
else return new P.lb(this,a)},
fN:function(a,b){return new P.lc(this,a)},
h:function(a,b){return},
e7:function(a){if($.m===C.d)return a.$0()
return P.eK(null,null,this,a)},
cN:function(a,b){if($.m===C.d)return a.$1(b)
return P.eM(null,null,this,a,b)},
ij:function(a,b,c){if($.m===C.d)return a.$2(b,c)
return P.eL(null,null,this,a,b,c)}},
la:{
"^":"d:1;a,b",
$0:function(){return this.a.e8(this.b)}},
lb:{
"^":"d:1;a,b",
$0:function(){return this.a.e7(this.b)}},
lc:{
"^":"d:0;a,b",
$1:function(a){return this.a.cO(this.b,a)}}}],["","",,P,{
"^":"",
a6:function(){return H.a(new H.ar(0,null,null,null,null,null,0),[null,null])},
aj:function(a){return H.eV(a,H.a(new H.ar(0,null,null,null,null,null,0),[null,null]))},
ia:function(a,b,c){var z,y
if(P.cN(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$b3()
y.push(a)
try{P.lu(a,z)}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=P.eb(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bD:function(a,b,c){var z,y,x
if(P.cN(a))return b+"..."+c
z=new P.bj(b)
y=$.$get$b3()
y.push(a)
try{x=z
x.a=P.eb(x.gaM(),a,", ")}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=z
y.a=y.gaM()+c
y=z.gaM()
return y.charCodeAt(0)==0?y:y},
cN:function(a){var z,y
for(z=0;y=$.$get$b3(),z<y.length;++z)if(a===y[z])return!0
return!1},
lu:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gL(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.C())return
w=H.f(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.C()){if(x<=5)return
if(0>=b.length)return H.h(b,-1)
v=b.pop()
if(0>=b.length)return H.h(b,-1)
u=b.pop()}else{t=z.gG();++x
if(!z.C()){if(x<=4){b.push(H.f(t))
return}v=H.f(t)
if(0>=b.length)return H.h(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.C();t=s,s=r){r=z.gG();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.f(t)
v=H.f(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aU:function(a,b,c,d){return H.a(new P.kZ(0,null,null,null,null,null,0),[d])},
ch:function(a){var z,y,x
z={}
if(P.cN(a))return"{...}"
y=new P.bj("")
try{$.$get$b3().push(a)
x=y
x.a=x.gaM()+"{"
z.a=!0
J.fu(a,new P.iw(z,y))
z=y
z.a=z.gaM()+"}"}finally{z=$.$get$b3()
if(0>=z.length)return H.h(z,-1)
z.pop()}z=y.gaM()
return z.charCodeAt(0)==0?z:z},
eC:{
"^":"ar;a,b,c,d,e,f,r",
b7:function(a){return H.m3(a)&0x3ffffff},
b8:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdP()
if(x==null?b==null:x===b)return y}return-1},
static:{b_:function(a,b){return H.a(new P.eC(0,null,null,null,null,null,0),[a,b])}}},
kZ:{
"^":"kQ;a,b,c,d,e,f,r",
gL:function(a){var z=new P.dI(this,this.r,null,null)
z.c=this.e
return z},
gm:function(a){return this.a},
a9:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.fa(b)},
fa:function(a){var z=this.d
if(z==null)return!1
return this.br(z[this.bq(a)],a)>=0},
dV:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a9(0,a)?a:null
else return this.fp(a)},
fp:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bq(a)]
x=this.br(y,a)
if(x<0)return
return J.br(y,x).gda()},
P:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.Y(this))
z=z.b}},
aO:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.d5(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.d5(x,b)}else return this.as(b)},
as:function(a){var z,y,x
z=this.d
if(z==null){z=P.l_()
this.d=z}y=this.bq(a)
x=z[y]
if(x==null)z[y]=[this.c8(a)]
else{if(this.br(x,a)>=0)return!1
x.push(this.c8(a))}return!0},
ag:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.d6(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.d6(this.c,b)
else return this.fA(0,b)},
fA:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bq(b)]
x=this.br(y,b)
if(x<0)return!1
this.d7(y.splice(x,1)[0])
return!0},
a3:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
d5:function(a,b){if(a[b]!=null)return!1
a[b]=this.c8(b)
return!0},
d6:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.d7(z)
delete a[b]
return!0},
c8:function(a){var z,y
z=new P.is(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
d7:function(a){var z,y
z=a.gf9()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
bq:function(a){return J.R(a)&0x3ffffff},
br:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.H(a[y].gda(),b))return y
return-1},
$isA:1,
static:{l_:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
is:{
"^":"c;da:a<,b,f9:c<"},
dI:{
"^":"c;a,b,c,d",
gG:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.Y(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
kQ:{
"^":"j4;"},
bF:{
"^":"c;",
gL:function(a){return new H.dJ(a,this.gm(a),0,null)},
a5:function(a,b){return this.h(a,b)},
P:function(a,b){var z,y
z=this.gm(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.Y(a))}},
a9:function(a,b){var z,y,x,w
z=this.gm(a)
for(y=a.length,x=z!==y,w=0;w<y;++w)if(x)throw H.e(new P.Y(a))
return!1},
aS:function(a,b){return H.a(new H.cg(a,b),[null,null])},
i:function(a){return P.bD(a,"[","]")},
$isp:1,
$asp:null,
$isA:1},
iw:{
"^":"d:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.f(a)
z.a=y+": "
z.a+=H.f(b)}},
it:{
"^":"a4;a,b,c,d",
gL:function(a){return new P.l0(this,this.c,this.d,this.b,null)},
P:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.Q(new P.Y(this))}},
ga_:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a3:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.bD(this,"{","}")},
e3:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.cb());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
as:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.dd();++this.d},
dd:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.a(z,[H.C(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.cZ(y,0,w,z,x)
C.a.cZ(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
eQ:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.a(z,[b])},
$isA:1,
static:{cf:function(a,b){var z=H.a(new P.it(null,0,0,0),[b])
z.eQ(a,b)
return z}}},
l0:{
"^":"c;a,b,c,d,e",
gG:function(){return this.e},
C:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.Q(new P.Y(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
j5:{
"^":"c;",
aS:function(a,b){return H.a(new H.du(this,b),[H.C(this,0),null])},
i:function(a){return P.bD(this,"{","}")},
P:function(a,b){var z
for(z=this.gL(this);z.C();)b.$1(z.d)},
$isA:1},
j4:{
"^":"j5;"}}],["","",,P,{
"^":"",
bT:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.kT(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bT(a[z])
return a},
cO:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.e(H.K(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.G(w)
y=x
throw H.e(new P.aq(String(y),null,null))}return P.bT(z)},
nI:[function(a){return a.iM()},"$1","lK",2,0,30],
kT:{
"^":"c;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.fz(b):y}},
gm:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.az().length
return z},
ga_:function(a){var z
if(this.b==null){z=this.c
z=z.gm(z)}else z=this.az().length
return z===0},
gY:function(){if(this.b==null)return this.c.gY()
return new P.kU(this)},
p:function(a,b,c){var z,y
if(this.b==null)this.c.p(0,b,c)
else if(this.a4(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.dw().p(0,b,c)},
a4:function(a){if(this.b==null)return this.c.a4(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
ag:function(a,b){if(this.b!=null&&!this.a4(b))return
return this.dw().ag(0,b)},
P:function(a,b){var z,y,x,w
if(this.b==null)return this.c.P(0,b)
z=this.az()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bT(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.e(new P.Y(this))}},
i:function(a){return P.ch(this)},
az:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
dw:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.a6()
y=this.az()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.p(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sm(y,0)
this.b=null
this.a=null
this.c=z
return z},
fz:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bT(this.a[a])
return this.b[a]=z},
$isaV:1,
$asaV:I.az},
kU:{
"^":"bc;a",
gm:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gm(z)}else z=z.az().length
return z},
a5:function(a,b){var z=this.a
if(z.b==null)z=z.gY().a5(0,b)
else{z=z.az()
if(b<0||b>=z.length)return H.h(z,b)
z=z[b]}return z},
gL:function(a){var z=this.a
if(z.b==null){z=z.gY()
z=z.gL(z)}else{z=z.az()
z=new J.d9(z,z.length,0,null)}return z},
a9:function(a,b){return this.a.a4(b)},
$asbc:I.az,
$asa4:I.az},
dh:{
"^":"c;"},
bx:{
"^":"c;"},
hD:{
"^":"dh;"},
ce:{
"^":"S;a,b",
i:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
il:{
"^":"ce;a,b",
i:function(a){return"Cyclic error in JSON stringify"}},
ik:{
"^":"dh;a,b",
h9:function(a,b){return P.cO(a,this.ghb().a)},
cs:function(a){return this.h9(a,null)},
hy:function(a,b){var z=this.gcv()
return P.kW(a,z.b,z.a)},
hx:function(a){return this.hy(a,null)},
gcv:function(){return C.Y},
ghb:function(){return C.X}},
io:{
"^":"bx;a,b"},
im:{
"^":"bx;a"},
kX:{
"^":"c;",
eh:function(a){var z,y,x,w,v,u
z=J.E(a)
y=z.gm(a)
if(typeof y!=="number")return H.u(y)
x=0
w=0
for(;w<y;++w){v=z.aD(a,w)
if(v>92)continue
if(v<32){if(w>x)this.cU(a,x,w)
x=w+1
this.a1(92)
switch(v){case 8:this.a1(98)
break
case 9:this.a1(116)
break
case 10:this.a1(110)
break
case 12:this.a1(102)
break
case 13:this.a1(114)
break
default:this.a1(117)
this.a1(48)
this.a1(48)
u=v>>>4&15
this.a1(u<10?48+u:87+u)
u=v&15
this.a1(u<10?48+u:87+u)
break}}else if(v===34||v===92){if(w>x)this.cU(a,x,w)
x=w+1
this.a1(92)
this.a1(v)}}if(x===0)this.Z(a)
else if(x<y)this.cU(a,x,y)},
c6:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.e(new P.il(a,null))}z.push(a)},
bM:function(a){var z,y,x,w
if(this.eg(a))return
this.c6(a)
try{z=this.fE(a)
if(!this.eg(z))throw H.e(new P.ce(a,null))
x=this.a
if(0>=x.length)return H.h(x,-1)
x.pop()}catch(w){x=H.G(w)
y=x
throw H.e(new P.ce(a,y))}},
eg:function(a){var z,y
if(typeof a==="number"){if(!C.b.ghM(a))return!1
this.iw(a)
return!0}else if(a===!0){this.Z("true")
return!0}else if(a===!1){this.Z("false")
return!0}else if(a==null){this.Z("null")
return!0}else if(typeof a==="string"){this.Z("\"")
this.eh(a)
this.Z("\"")
return!0}else{z=J.q(a)
if(!!z.$isp){this.c6(a)
this.iu(a)
z=this.a
if(0>=z.length)return H.h(z,-1)
z.pop()
return!0}else if(!!z.$isaV){this.c6(a)
y=this.iv(a)
z=this.a
if(0>=z.length)return H.h(z,-1)
z.pop()
return y}else return!1}},
iu:function(a){var z
this.Z("[")
if(J.ai(a)>0){if(0>=a.length)return H.h(a,0)
this.bM(a[0])
for(z=1;z<a.length;++z){this.Z(",")
if(z>=a.length)return H.h(a,z)
this.bM(a[z])}}this.Z("]")},
iv:function(a){var z,y,x,w,v
z={}
if(a.ga_(a)){this.Z("{}")
return!0}y=J.cZ(a.gm(a),2)
if(typeof y!=="number")return H.u(y)
x=new Array(y)
z.a=0
z.b=!0
a.P(0,new P.kY(z,x))
if(!z.b)return!1
this.Z("{")
for(z=x.length,w="\"",v=0;v<z;v+=2,w=",\""){this.Z(w)
this.eh(x[v])
this.Z("\":")
y=v+1
if(y>=z)return H.h(x,y)
this.bM(x[y])}this.Z("}")
return!0},
fE:function(a){return this.b.$1(a)}},
kY:{
"^":"d:5;a,b",
$2:function(a,b){var z,y,x,w,v
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
v=z.length
if(x>=v)return H.h(z,x)
z[x]=a
y.a=w+1
if(w>=v)return H.h(z,w)
z[w]=b}},
kV:{
"^":"kX;c,a,b",
iw:function(a){this.c.a+=C.b.i(a)},
Z:function(a){this.c.a+=H.f(a)},
cU:function(a,b,c){this.c.a+=J.h_(a,b,c)},
a1:function(a){this.c.a+=H.aF(a)},
static:{kW:function(a,b,c){var z,y,x
z=new P.bj("")
y=P.lK()
x=new P.kV(z,[],y)
x.bM(a)
y=z.a
return y.charCodeAt(0)==0?y:y}}},
ke:{
"^":"hD;a",
dI:function(a,b){return new P.kf(b==null?!1:b).cq(a)},
cs:function(a){return this.dI(a,null)},
gcv:function(){return C.J}},
kg:{
"^":"bx;",
b4:function(a,b,c){var z,y,x,w,v,u,t
z=J.E(a)
y=z.gm(a)
P.aW(b,c,y,null,null,null)
x=J.X(y)
w=x.u(y,b)
v=J.q(w)
if(v.w(w,0))return new Uint8Array(H.k(0))
v=H.k(v.n(w,3))
u=new Uint8Array(v)
t=new P.li(0,0,u)
if(t.fg(a,b,y)!==y)t.dz(z.aD(a,x.u(y,1)),0)
return new Uint8Array(u.subarray(0,H.ls(0,t.b,v)))},
cq:function(a){return this.b4(a,0,null)}},
li:{
"^":"c;a,b,c",
dz:function(a,b){var z,y,x,w,v
z=this.c
y=this.b
if((b&64512)===56320){x=65536+((a&1023)<<10>>>0)|b&1023
w=y+1
this.b=w
v=z.length
if(y>=v)return H.h(z,y)
z[y]=(240|x>>>18)>>>0
y=w+1
this.b=y
if(w>=v)return H.h(z,w)
z[w]=128|x>>>12&63
w=y+1
this.b=w
if(y>=v)return H.h(z,y)
z[y]=128|x>>>6&63
this.b=w+1
if(w>=v)return H.h(z,w)
z[w]=128|x&63
return!0}else{w=y+1
this.b=w
v=z.length
if(y>=v)return H.h(z,y)
z[y]=224|a>>>12
y=w+1
this.b=y
if(w>=v)return H.h(z,w)
z[w]=128|a>>>6&63
this.b=y+1
if(y>=v)return H.h(z,y)
z[y]=128|a&63
return!1}},
fg:function(a,b,c){var z,y,x,w,v,u,t,s
if(b!==c&&(J.fg(a,J.d_(c,1))&64512)===55296)c=J.d_(c,1)
if(typeof c!=="number")return H.u(c)
z=this.c
y=z.length
x=J.cS(a)
w=b
for(;w<c;++w){v=x.aD(a,w)
if(v<=127){u=this.b
if(u>=y)break
this.b=u+1
z[u]=v}else if((v&64512)===55296){if(this.b+3>=y)break
t=w+1
if(this.dz(v,C.i.aD(a,t)))w=t}else if(v<=2047){u=this.b
s=u+1
if(s>=y)break
this.b=s
if(u>=y)return H.h(z,u)
z[u]=192|v>>>6
this.b=s+1
z[s]=128|v&63}else{u=this.b
if(u+2>=y)break
s=u+1
this.b=s
if(u>=y)return H.h(z,u)
z[u]=224|v>>>12
u=s+1
this.b=u
if(s>=y)return H.h(z,s)
z[s]=128|v>>>6&63
this.b=u+1
if(u>=y)return H.h(z,u)
z[u]=128|v&63}}return w}},
kf:{
"^":"bx;a",
b4:function(a,b,c){var z,y,x,w
z=J.ai(a)
P.aW(b,c,z,null,null,null)
y=new P.bj("")
x=this.a
w=new P.lf(x,y,!0,0,0,0)
w.b4(a,b,z)
if(w.e>0){if(!x)H.Q(new P.aq("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.aF(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
cq:function(a){return this.b4(a,0,null)}},
lf:{
"^":"c;a,b,c,d,e,f",
b4:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.lh(c)
v=new P.lg(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=J.E(a),r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
q=s.h(a,r)
if(typeof q!=="number")return q.cV()
if((q&192)!==128){if(t)throw H.e(new P.aq("Bad UTF-8 encoding 0x"+C.b.bi(q,16),null,null))
this.c=!1
u.a+=H.aF(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.h(C.F,p)
if(z<=C.F[p]){if(t)throw H.e(new P.aq("Overlong encoding of 0x"+C.c.bi(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.e(new P.aq("Character outside valid Unicode range: 0x"+C.c.bi(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.aF(z)
this.c=!1}if(typeof c!=="number")return H.u(c)
for(;r<c;r=n){o=w.$2(a,r)
if(J.a3(o,0)){this.c=!1
if(typeof o!=="number")return H.u(o)
n=r+o
v.$2(r,n)
if(n===c)break
r=n}n=r+1
q=s.h(a,r)
p=J.X(q)
if(p.ar(q,0)){if(t)throw H.e(new P.aq("Negative UTF-8 code unit: -0x"+J.h0(p.cX(q),16),null,null))
u.a+=H.aF(65533)}else{if(typeof q!=="number")return q.cV()
if((q&224)===192){z=q&31
y=1
x=1
continue $loop$0}if((q&240)===224){z=q&15
y=2
x=2
continue $loop$0}if((q&248)===240&&q<245){z=q&7
y=3
x=3
continue $loop$0}if(t)throw H.e(new P.aq("Bad UTF-8 encoding 0x"+C.b.bi(q,16),null,null))
this.c=!1
u.a+=H.aF(65533)
z=65533
y=0
x=0}}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
lh:{
"^":"d:25;a",
$2:function(a,b){var z,y,x,w
z=this.a
if(typeof z!=="number")return H.u(z)
y=J.E(a)
x=b
for(;x<z;++x){w=y.h(a,x)
if(typeof w!=="number")return w.cV()
if((w&127)!==w)return x-b}return z-b}},
lg:{
"^":"d:26;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.jt(this.b,a,b)}}}],["","",,P,{
"^":"",
ju:function(a,b,c){var z,y,x
if(b<0)throw H.e(P.a_(b,0,J.ai(a),null,null))
if(c<b)throw H.e(P.a_(c,b,J.ai(a),null,null))
z=J.aB(a)
for(y=0;y<b;++y)if(!z.C())throw H.e(P.a_(b,0,y,null,null))
x=[]
for(y=b;y<c;++y){if(!z.C())throw H.e(P.a_(c,b,y,null,null))
x.push(z.gG())}return H.e4(x)},
ml:[function(a,b){return J.fh(a,b)},"$2","lL",4,0,31],
dv:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aP(a)
if(typeof a==="string")return JSON.stringify(a)
return P.hE(a)},
hE:function(a){var z=J.q(a)
if(!!z.$isd)return z.i(a)
return H.bL(a)},
bA:function(a){return new P.kC(a)},
iu:function(a,b,c){var z,y,x
z=J.id(a,c)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
bd:function(a,b,c){var z,y
z=H.a([],[c])
for(y=J.aB(a);y.C();)z.push(y.gG())
return z},
M:function(a){var z=H.f(a)
H.bZ(z)},
jt:function(a,b,c){var z
if(typeof a==="object"&&a!==null&&a.constructor===Array){z=a.length
c=P.aW(b,c,z,null,null,null)
return H.e4(b>0||J.aN(c,z)?C.a.eF(a,b,c):a)}if(!!J.q(a).$isdY)return H.iU(a,b,P.aW(b,c,a.length,null,null,null))
return P.ju(a,b,c)},
b4:{
"^":"c;"},
"+bool":0,
V:{
"^":"c;"},
dl:{
"^":"c;hT:a<,b",
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.dl))return!1
return this.a===b.a&&this.b===b.b},
aP:function(a,b){return C.c.aP(this.a,b.ghT())},
gK:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.hv(z?H.a2(this).getUTCFullYear()+0:H.a2(this).getFullYear()+0)
x=P.b6(z?H.a2(this).getUTCMonth()+1:H.a2(this).getMonth()+1)
w=P.b6(z?H.a2(this).getUTCDate()+0:H.a2(this).getDate()+0)
v=P.b6(z?H.a2(this).getUTCHours()+0:H.a2(this).getHours()+0)
u=P.b6(z?H.a2(this).getUTCMinutes()+0:H.a2(this).getMinutes()+0)
t=P.b6(z?H.a2(this).getUTCSeconds()+0:H.a2(this).getSeconds()+0)
s=P.hw(z?H.a2(this).getUTCMilliseconds()+0:H.a2(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
eP:function(a,b){if(Math.abs(a)>864e13)throw H.e(P.aQ(a))},
$isV:1,
$asV:I.az,
static:{hu:function(a,b){var z=new P.dl(a,b)
z.eP(a,b)
return z},hv:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.f(z)
if(z>=10)return y+"00"+H.f(z)
return y+"000"+H.f(z)},hw:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},b6:function(a){if(a>=10)return""+a
return"0"+a}}},
ag:{
"^":"aA;",
$isV:1,
$asV:function(){return[P.aA]}},
"+double":0,
ac:{
"^":"c;aA:a<",
l:function(a,b){return new P.ac(C.c.l(this.a,b.gaA()))},
u:function(a,b){return new P.ac(C.c.u(this.a,b.gaA()))},
n:function(a,b){return new P.ac(C.c.U(this.a*b))},
b0:function(a,b){if(b===0)throw H.e(new P.hX())
return new P.ac(C.c.b0(this.a,b))},
ar:function(a,b){return C.c.ar(this.a,b.gaA())},
aK:function(a,b){return C.c.aK(this.a,b.gaA())},
bR:function(a,b){return C.c.bR(this.a,b.gaA())},
bN:function(a,b){return C.c.bN(this.a,b.gaA())},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.ac))return!1
return this.a===b.a},
gK:function(a){return this.a&0x1FFFFFFF},
aP:function(a,b){return C.c.aP(this.a,b.gaA())},
i:function(a){var z,y,x,w,v
z=new P.hC()
y=this.a
if(y<0)return"-"+new P.ac(-y).i(0)
x=z.$1(C.c.cK(C.c.aC(y,6e7),60))
w=z.$1(C.c.cK(C.c.aC(y,1e6),60))
v=new P.hB().$1(C.c.cK(y,1e6))
return""+C.c.aC(y,36e8)+":"+H.f(x)+":"+H.f(w)+"."+H.f(v)},
cX:function(a){return new P.ac(-this.a)},
$isV:1,
$asV:function(){return[P.ac]}},
hB:{
"^":"d:10;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
hC:{
"^":"d:10;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
S:{
"^":"c;",
gaj:function(){return H.U(this.$thrownJsError)}},
co:{
"^":"S;",
i:function(a){return"Throw of null."}},
ao:{
"^":"S;a,b,c,d",
gcb:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gca:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.f(z)+")":""
z=this.d
x=z==null?"":": "+H.f(z)
w=this.gcb()+y+x
if(!this.a)return w
v=this.gca()
u=P.dv(this.b)
return w+v+": "+H.f(u)},
static:{aQ:function(a){return new P.ao(!1,null,null,a)},d8:function(a,b,c){return new P.ao(!0,a,b,c)}}},
bf:{
"^":"ao;e,f,a,b,c,d",
gcb:function(){return"RangeError"},
gca:function(){var z,y,x,w
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.f(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.f(z)
else{w=J.X(x)
if(w.aK(x,z))y=": Not in range "+H.f(z)+".."+H.f(x)+", inclusive"
else y=w.ar(x,z)?": Valid value range is empty":": Only valid value is "+H.f(z)}}return y},
ak:function(a){return this.e.$0()},
bm:function(a,b){return this.e.$1$looping(b)},
static:{iW:function(a){return new P.bf(null,null,!1,null,null,a)},bg:function(a,b,c){return new P.bf(null,null,!0,a,b,"Value not in range")},a_:function(a,b,c,d,e){return new P.bf(b,c,!0,a,d,"Invalid value")},aW:function(a,b,c,d,e,f){var z
if(!(0>a)){if(typeof c!=="number")return H.u(c)
z=a>c}else z=!0
if(z)throw H.e(P.a_(a,0,c,"start",f))
if(b!=null){if(!(a>b)){if(typeof c!=="number")return H.u(c)
z=b>c}else z=!0
if(z)throw H.e(P.a_(b,a,c,"end",f))
return b}return c}}},
hW:{
"^":"ao;e,m:f>,a,b,c,d",
gd0:function(a){return 0},
gcb:function(){return"RangeError"},
gca:function(){if(J.aN(this.b,0))return": index must not be negative"
var z=this.f
if(J.H(z,0))return": no indices are valid"
return": index should be less than "+H.f(z)},
ak:function(a){return this.gd0(this).$0()},
bm:function(a,b){return this.gd0(this).$1$looping(b)},
static:{bC:function(a,b,c,d,e){var z=e!=null?e:J.ai(b)
return new P.hW(b,z,!0,a,c,"Index out of range")}}},
W:{
"^":"S;a",
i:function(a){return"Unsupported operation: "+this.a}},
cG:{
"^":"S;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.f(z):"UnimplementedError"}},
aG:{
"^":"S;a",
i:function(a){return"Bad state: "+this.a}},
Y:{
"^":"S;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.f(P.dv(z))+"."}},
iF:{
"^":"c;",
i:function(a){return"Out of Memory"},
gaj:function(){return},
$isS:1},
ea:{
"^":"c;",
i:function(a){return"Stack Overflow"},
gaj:function(){return},
$isS:1},
hs:{
"^":"S;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
kC:{
"^":"c;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.f(z)}},
aq:{
"^":"c;a,b,a7:c>",
i:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.f(z):"FormatException"
return y}},
hX:{
"^":"c;",
i:function(a){return"IntegerDivisionByZeroException"}},
hF:{
"^":"c;a",
i:function(a){return"Expando:"+H.f(this.a)},
h:function(a,b){var z=H.bK(b,"expando$values")
return z==null?null:H.bK(z,this.dc())},
p:function(a,b,c){var z=H.bK(b,"expando$values")
if(z==null){z=new P.c()
H.cw(b,"expando$values",z)}H.cw(z,this.dc(),c)},
dc:function(){var z,y
z=H.bK(this,"expando$key")
if(z==null){y=$.dw
$.dw=y+1
z="expando$key$"+y
H.cw(this,"expando$key",z)}return z}},
hM:{
"^":"c;"},
r:{
"^":"aA;",
$isV:1,
$asV:function(){return[P.aA]}},
"+int":0,
a4:{
"^":"c;",
aS:function(a,b){return H.bG(this,b,H.a9(this,"a4",0),null)},
a9:function(a,b){var z
for(z=this.gL(this);z.C();)if(J.H(z.gG(),b))return!0
return!1},
P:function(a,b){var z
for(z=this.gL(this);z.C();)b.$1(z.gG())},
cR:function(a,b){return P.bd(this,!0,H.a9(this,"a4",0))},
cQ:function(a){return this.cR(a,!0)},
gm:function(a){var z,y
z=this.gL(this)
for(y=0;z.C();)++y
return y},
a5:function(a,b){var z,y,x
if(b<0)H.Q(P.a_(b,0,null,"index",null))
for(z=this.gL(this),y=0;z.C();){x=z.gG()
if(b===y)return x;++y}throw H.e(P.bC(b,this,"index",null,y))},
i:function(a){return P.ia(this,"(",")")}},
ic:{
"^":"c;"},
p:{
"^":"c;",
$asp:null,
$isA:1},
"+List":0,
aV:{
"^":"c;"},
n8:{
"^":"c;",
i:function(a){return"null"}},
"+Null":0,
aA:{
"^":"c;",
$isV:1,
$asV:function(){return[P.aA]}},
"+num":0,
c:{
"^":";",
w:function(a,b){return this===b},
gK:function(a){return H.au(this)},
i:function(a){return H.bL(this)},
toString:function(){return this.i(this)}},
av:{
"^":"c;"},
ae:{
"^":"c;",
$isV:1,
$asV:function(){return[P.ae]}},
"+String":0,
bj:{
"^":"c;aM:a<",
gm:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{eb:function(a,b,c){var z=J.aB(b)
if(!z.C())return a
if(c.length===0){do a+=H.f(z.gG())
while(z.C())}else{a+=H.f(z.gG())
for(;z.C();)a=a+c+H.f(z.gG())}return a}}}}],["","",,W,{
"^":"",
db:function(a,b,c){return new Blob(a)},
di:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.V)},
ay:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
eA:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
eH:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.kw(a)
if(!!J.q(z).$isZ)return z
return}else return a},
eI:function(a){var z
if(!!J.q(a).$isc7)return a
z=new P.kl([],[],!1)
z.c=!0
return z.cT(a)},
J:function(a){var z=$.m
if(z===C.d)return a
return z.fN(a,!0)},
D:{
"^":"b7;",
$isD:1,
$isc:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
md:{
"^":"D;E:type=",
i:function(a){return String(a)},
$isj:1,
"%":"HTMLAnchorElement"},
mf:{
"^":"D;",
i:function(a){return String(a)},
$isj:1,
"%":"HTMLAreaElement"},
ha:{
"^":"j;ax:size=,E:type=",
iy:function(a,b,c,d){return a.slice(b,c,d)},
eD:function(a,b,c){return a.slice(b,c)},
"%":";Blob"},
mh:{
"^":"D;",
gav:function(a){return H.a(new W.F(a,"error",!1),[null])},
gaH:function(a){return H.a(new W.F(a,"load",!1),[null])},
$isZ:1,
$isj:1,
"%":"HTMLBodyElement"},
mi:{
"^":"D;E:type=",
"%":"HTMLButtonElement"},
de:{
"^":"D;q:height%,t:width%",
cW:function(a,b,c){return a.getContext(b,P.eT(c,null))},
en:function(a,b,c,d,e,f,g){var z,y
z=P.aj(["alpha",!0,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.cW(a,"webgl",z)
return y==null?this.cW(a,"experimental-webgl",z):y},
em:function(a,b){return this.en(a,!0,!0,!0,!0,!1,b)},
$isde:1,
"%":"HTMLCanvasElement"},
mk:{
"^":"at;m:length=",
$isj:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
mm:{
"^":"hY;m:length=",
bP:function(a,b){var z=this.fi(a,b)
return z!=null?z:""},
fi:function(a,b){if(W.di(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.dr()+b)},
bV:function(a,b,c,d){var z=this.f7(a,b)
a.setProperty(z,c,d)
return},
f7:function(a,b){var z,y
z=$.$get$dj()
y=z[b]
if(typeof y==="string")return y
y=W.di(b) in a?b:P.dr()+b
z[b]=y
return y},
gq:function(a){return a.height},
sq:function(a,b){a.height=b},
gt:function(a){return a.width},
st:function(a,b){a.width=b},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hY:{
"^":"j+hr;"},
hr:{
"^":"c;",
gq:function(a){return this.bP(a,"height")},
sq:function(a,b){this.bV(a,"height",b,"")},
gax:function(a){return this.bP(a,"size")},
sai:function(a,b){this.bV(a,"src",b,"")},
gt:function(a){return this.bP(a,"width")},
st:function(a,b){this.bV(a,"width",b,"")}},
hx:{
"^":"j;",
ic:function(a,b,c,d){return a.requestQuota(b,H.O(c,1),H.O(d,1))},
"%":"DeprecatedStorageQuota"},
mn:{
"^":"by;",
h3:function(a,b,c){return this.fh(a,b,P.aj(["create",!0,"exclusive",!1]))},
h2:function(a,b){return this.h3(a,b,!1)},
f0:function(a,b,c,d,e){this.f1(a,b,P.eT(d,null),e,c)
return},
f1:function(a,b,c,d,e){return a.getFile(b,c,H.O(d,1),H.O(e,1))},
fh:function(a,b,c){var z=H.a(new P.a8(H.a(new P.z(0,$.m,null),[W.by])),[W.by])
this.f0(a,b,new W.hy(z),c,new W.hz(z))
return z.a},
"%":"DirectoryEntry"},
hz:{
"^":"d:0;a",
$1:function(a){this.a.S(0,a)}},
hy:{
"^":"d:0;a",
$1:function(a){this.a.X(a)}},
c7:{
"^":"at;",
gav:function(a){return H.a(new W.t(a,"error",!1),[null])},
gaH:function(a){return H.a(new W.t(a,"load",!1),[null])},
gbB:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gbC:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gbD:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gbE:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gbF:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gbG:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gbH:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
gcE:function(a){return H.a(new W.t(a,"touchcancel",!1),[null])},
gbd:function(a){return H.a(new W.t(a,"touchend",!1),[null])},
gcF:function(a){return H.a(new W.t(a,"touchmove",!1),[null])},
gbe:function(a){return H.a(new W.t(a,"touchstart",!1),[null])},
h1:function(a,b,c){return a.createElement(b)},
dG:function(a,b){return this.h1(a,b,null)},
$isc7:1,
"%":"XMLDocument;Document"},
mo:{
"^":"at;",
$isj:1,
"%":"DocumentFragment|ShadowRoot"},
mp:{
"^":"j;",
i:function(a){return String(a)},
"%":"DOMException"},
hA:{
"^":"j;cm:bottom=,q:height=,ae:left=,cM:right=,aW:top=,t:width=,j:x=,k:y=",
i:function(a){return"Rectangle ("+H.f(a.left)+", "+H.f(a.top)+") "+H.f(this.gt(a))+" x "+H.f(this.gq(a))},
w:function(a,b){var z,y,x
if(b==null)return!1
z=J.q(b)
if(!z.$isak)return!1
y=a.left
x=z.gae(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaW(b)
if(y==null?x==null:y===x){y=this.gt(a)
x=z.gt(b)
if(y==null?x==null:y===x){y=this.gq(a)
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gK:function(a){var z,y,x,w
z=J.R(a.left)
y=J.R(a.top)
x=J.R(this.gt(a))
w=J.R(this.gq(a))
return W.eA(W.ay(W.ay(W.ay(W.ay(0,z),y),x),w))},
gcS:function(a){return H.a(new P.a1(a.left,a.top),[null])},
$isak:1,
$asak:I.az,
"%":";DOMRectReadOnly"},
b7:{
"^":"at;",
ga7:function(a){return P.iY(C.b.U(a.offsetLeft),C.b.U(a.offsetTop),C.b.U(a.offsetWidth),C.b.U(a.offsetHeight),null)},
i:function(a){return a.localName},
ghY:function(a){return C.b.U(a.offsetLeft)},
ghZ:function(a){return C.b.U(a.offsetTop)},
el:function(a){return a.getBoundingClientRect()},
gav:function(a){return H.a(new W.F(a,"error",!1),[null])},
gaH:function(a){return H.a(new W.F(a,"load",!1),[null])},
gbB:function(a){return H.a(new W.F(a,"mousedown",!1),[null])},
gbC:function(a){return H.a(new W.F(a,"mouseenter",!1),[null])},
gbD:function(a){return H.a(new W.F(a,"mouseleave",!1),[null])},
gbE:function(a){return H.a(new W.F(a,"mousemove",!1),[null])},
gbF:function(a){return H.a(new W.F(a,"mouseout",!1),[null])},
gbG:function(a){return H.a(new W.F(a,"mouseover",!1),[null])},
gbH:function(a){return H.a(new W.F(a,"mouseup",!1),[null])},
gcE:function(a){return H.a(new W.F(a,"touchcancel",!1),[null])},
gbd:function(a){return H.a(new W.F(a,"touchend",!1),[null])},
gi2:function(a){return H.a(new W.F(a,"touchenter",!1),[null])},
gi3:function(a){return H.a(new W.F(a,"touchleave",!1),[null])},
gcF:function(a){return H.a(new W.F(a,"touchmove",!1),[null])},
gbe:function(a){return H.a(new W.F(a,"touchstart",!1),[null])},
$isb7:1,
$isj:1,
$isZ:1,
"%":";Element"},
mq:{
"^":"D;q:height%,ai:src},E:type=,t:width%",
"%":"HTMLEmbedElement"},
by:{
"^":"j;",
$isc:1,
"%":";Entry"},
mr:{
"^":"bz;aF:error=",
"%":"ErrorEvent"},
bz:{
"^":"j;E:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
Z:{
"^":"j;",
dA:function(a,b,c,d){if(c!=null)this.f4(a,b,c,!1)},
e2:function(a,b,c,d){if(c!=null)this.fB(a,b,c,!1)},
f4:function(a,b,c,d){return a.addEventListener(b,H.O(c,1),!1)},
fB:function(a,b,c,d){return a.removeEventListener(b,H.O(c,1),!1)},
$isZ:1,
"%":"AudioBufferSourceNode|AudioDestinationNode|AudioGainNode|AudioNode|AudioSourceNode|GainNode|MediaStream;EventTarget"},
mK:{
"^":"D;E:type=",
"%":"HTMLFieldSetElement"},
dx:{
"^":"ha;",
$isc:1,
"%":"File"},
c9:{
"^":"by;",
fc:function(a,b,c){return a.createWriter(H.O(b,1),H.O(c,1))},
dH:function(a){var z=H.a(new P.a8(H.a(new P.z(0,$.m,null),[W.dz])),[W.dz])
this.fc(a,new W.hG(z),new W.hH(z))
return z.a},
ff:function(a,b,c){return a.file(H.O(b,1),H.O(c,1))},
dL:function(a){var z=H.a(new P.a8(H.a(new P.z(0,$.m,null),[W.dx])),[W.dx])
this.ff(a,new W.hI(z),new W.hJ(z))
return z.a},
$isc9:1,
"%":"FileEntry"},
hG:{
"^":"d:0;a",
$1:function(a){this.a.S(0,a)}},
hH:{
"^":"d:0;a",
$1:function(a){this.a.X(a)}},
hI:{
"^":"d:0;a",
$1:function(a){this.a.S(0,a)}},
hJ:{
"^":"d:0;a",
$1:function(a){this.a.X(a)}},
hK:{
"^":"Z;aF:error=",
gcL:function(a){var z=a.result
if(!!J.q(z).$ishc)return new Uint8Array(z,0)
return z},
gav:function(a){return H.a(new W.t(a,"error",!1),[null])},
gaH:function(a){return H.a(new W.t(a,"load",!1),[null])},
"%":"FileReader"},
dy:{
"^":"j;aq:root=",
$isc:1,
"%":"DOMFileSystem"},
dz:{
"^":"Z;aF:error=,m:length=",
aX:function(a,b){return a.truncate(b)},
gav:function(a){return H.a(new W.t(a,"error",!1),[null])},
gi5:function(a){return H.a(new W.t(a,"write",!1),[null])},
$isc:1,
"%":"FileWriter"},
mN:{
"^":"D;m:length=",
"%":"HTMLFormElement"},
hT:{
"^":"c7;",
"%":"HTMLDocument"},
hU:{
"^":"hV;",
iL:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
dY:function(a,b,c){return a.open(b,c)},
bU:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
hV:{
"^":"Z;",
gav:function(a){return H.a(new W.t(a,"error",!1),[null])},
gaH:function(a){return H.a(new W.t(a,"load",!1),[null])},
"%":";XMLHttpRequestEventTarget"},
mO:{
"^":"D;q:height%,ai:src},t:width%",
"%":"HTMLIFrameElement"},
dC:{
"^":"D;q:height%,ai:src},t:width%",
S:function(a,b){return a.complete.$1(b)},
$isdC:1,
"%":"HTMLImageElement"},
mQ:{
"^":"D;q:height%,ax:size=,ai:src},E:type=,t:width%",
$isb7:1,
$isj:1,
$isZ:1,
"%":"HTMLInputElement"},
mT:{
"^":"D;E:type=",
"%":"HTMLKeygenElement"},
mU:{
"^":"D;E:type=",
"%":"HTMLLinkElement"},
ix:{
"^":"D;aF:error=,ai:src}",
ac:function(a){return a.pause()},
"%":"HTMLAudioElement;HTMLMediaElement"},
mX:{
"^":"D;E:type=",
"%":"HTMLMenuElement"},
mY:{
"^":"D;E:type=",
"%":"HTMLMenuItemElement"},
ck:{
"^":"et;",
ga7:function(a){var z,y,x
if(!!a.offsetX)return H.a(new P.a1(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.q(W.eH(z)).$isb7)throw H.e(new P.W("offsetX is only supported on elements"))
y=W.eH(z)
x=H.a(new P.a1(a.clientX,a.clientY),[null]).u(0,J.fM(J.fP(y)))
return H.a(new P.a1(J.d5(x.a),J.d5(x.b)),[null])}},
$isck:1,
$isc:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
n6:{
"^":"j;",
$isj:1,
"%":"Navigator"},
at:{
"^":"Z;",
i:function(a){var z=a.nodeValue
return z==null?this.eH(a):z},
a9:function(a,b){return a.contains(b)},
$isc:1,
"%":"Attr;Node"},
n7:{
"^":"i0;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bC(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.e(new P.W("Cannot assign element of immutable List."))},
a5:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isp:1,
$asp:function(){return[W.at]},
$isA:1,
$isbb:1,
$isb9:1,
"%":"NodeList|RadioNodeList"},
hZ:{
"^":"j+bF;",
$isp:1,
$asp:function(){return[W.at]},
$isA:1},
i0:{
"^":"hZ+dD;",
$isp:1,
$asp:function(){return[W.at]},
$isA:1},
n9:{
"^":"D;E:type=",
ak:function(a){return a.start.$0()},
bm:function(a,b){return a.start.$1$looping(b)},
"%":"HTMLOListElement"},
na:{
"^":"D;q:height%,E:type=,t:width%",
"%":"HTMLObjectElement"},
nb:{
"^":"D;E:type=",
"%":"HTMLOutputElement"},
be:{
"^":"bz;",
$isbe:1,
$isc:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
ne:{
"^":"D;ai:src},E:type=",
"%":"HTMLScriptElement"},
ng:{
"^":"D;m:length=,ax:size=,E:type=",
"%":"HTMLSelectElement"},
nh:{
"^":"D;ai:src},E:type=",
"%":"HTMLSourceElement"},
ni:{
"^":"bz;aF:error=",
"%":"SpeechRecognitionError"},
nk:{
"^":"D;E:type=",
"%":"HTMLStyleElement"},
no:{
"^":"D;E:type=",
"%":"HTMLTextAreaElement"},
bO:{
"^":"j;",
gi7:function(a){return H.a(new P.a1(C.b.U(a.pageX),C.b.U(a.pageY)),[null])},
$isc:1,
"%":"Touch"},
cF:{
"^":"et;fS:changedTouches=",
$iscF:1,
$isc:1,
"%":"TouchEvent"},
nq:{
"^":"i1;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bC(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.e(new P.W("Cannot assign element of immutable List."))},
a5:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isp:1,
$asp:function(){return[W.bO]},
$isA:1,
$isbb:1,
$isb9:1,
"%":"TouchList"},
i_:{
"^":"j+bF;",
$isp:1,
$asp:function(){return[W.bO]},
$isA:1},
i1:{
"^":"i_+dD;",
$isp:1,
$asp:function(){return[W.bO]},
$isA:1},
nr:{
"^":"D;ai:src}",
"%":"HTMLTrackElement"},
et:{
"^":"bz;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
eu:{
"^":"ix;q:height%,t:width%",
$iseu:1,
"%":"HTMLVideoElement"},
kh:{
"^":"Z;",
f3:function(a,b,c,d,e){return a.webkitRequestFileSystem(b,c,H.O(d,1),H.O(e,1))},
fC:function(a,b,c){var z=H.a(new P.a8(H.a(new P.z(0,$.m,null),[W.dy])),[W.dy])
this.f3(a,b,c,new W.ki(z),new W.kj(z))
return z.a},
gav:function(a){return H.a(new W.t(a,"error",!1),[null])},
gaH:function(a){return H.a(new W.t(a,"load",!1),[null])},
gbB:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gbC:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gbD:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gbE:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gbF:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gbG:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gbH:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
gcE:function(a){return H.a(new W.t(a,"touchcancel",!1),[null])},
gbd:function(a){return H.a(new W.t(a,"touchend",!1),[null])},
gcF:function(a){return H.a(new W.t(a,"touchmove",!1),[null])},
gbe:function(a){return H.a(new W.t(a,"touchstart",!1),[null])},
$isj:1,
$isZ:1,
"%":"DOMWindow|Window"},
ki:{
"^":"d:0;a",
$1:function(a){this.a.S(0,a)}},
kj:{
"^":"d:0;a",
$1:function(a){this.a.X(a)}},
ny:{
"^":"j;cm:bottom=,q:height=,ae:left=,cM:right=,aW:top=,t:width=",
i:function(a){return"Rectangle ("+H.f(a.left)+", "+H.f(a.top)+") "+H.f(a.width)+" x "+H.f(a.height)},
w:function(a,b){var z,y,x
if(b==null)return!1
z=J.q(b)
if(!z.$isak)return!1
y=a.left
x=z.gae(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaW(b)
if(y==null?x==null:y===x){y=a.width
x=z.gt(b)
if(y==null?x==null:y===x){y=a.height
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gK:function(a){var z,y,x,w
z=J.R(a.left)
y=J.R(a.top)
x=J.R(a.width)
w=J.R(a.height)
return W.eA(W.ay(W.ay(W.ay(W.ay(0,z),y),x),w))},
gcS:function(a){return H.a(new P.a1(a.left,a.top),[null])},
$isak:1,
$asak:I.az,
"%":"ClientRect"},
nz:{
"^":"at;",
$isj:1,
"%":"DocumentType"},
nA:{
"^":"hA;",
gq:function(a){return a.height},
sq:function(a,b){a.height=b},
gt:function(a){return a.width},
st:function(a,b){a.width=b},
gj:function(a){return a.x},
sj:function(a,b){a.x=b},
gk:function(a){return a.y},
sk:function(a,b){a.y=b},
"%":"DOMRect"},
nD:{
"^":"D;",
$isZ:1,
$isj:1,
"%":"HTMLFrameSetElement"},
t:{
"^":"al;a,b,c",
ao:function(a,b,c,d){var z=new W.I(0,this.a,this.b,W.J(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.I()
return z},
dT:function(a){return this.ao(a,null,null,null)},
dU:function(a,b,c){return this.ao(a,null,b,c)}},
F:{
"^":"t;a,b,c"},
I:{
"^":"jg;a,b,c,d,e",
bv:function(){if(this.b==null)return
this.dv()
this.b=null
this.d=null
return},
cI:function(a,b){if(this.b==null)return;++this.a
this.dv()},
ac:function(a){return this.cI(a,null)},
e4:function(){if(this.b==null||this.a<=0)return;--this.a
this.I()},
I:function(){var z=this.d
if(z!=null&&this.a<=0)J.f7(this.b,this.c,z,!1)},
dv:function(){var z=this.d
if(z!=null)J.fU(this.b,this.c,z,!1)}},
dD:{
"^":"c;",
gL:function(a){return new W.hL(a,this.gm(a),-1,null)},
$isp:1,
$asp:null,
$isA:1},
hL:{
"^":"c;a,b,c,d",
C:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.br(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gG:function(){return this.d}},
kv:{
"^":"c;a",
dA:function(a,b,c,d){return H.Q(new P.W("You can only attach EventListeners to your own window."))},
e2:function(a,b,c,d){return H.Q(new P.W("You can only attach EventListeners to your own window."))},
$isZ:1,
$isj:1,
static:{kw:function(a){if(a===window)return a
else return new W.kv(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
mb:{
"^":"aD;",
$isj:1,
"%":"SVGAElement"},
mc:{
"^":"jv;",
$isj:1,
"%":"SVGAltGlyphElement"},
me:{
"^":"y;",
$isj:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
ms:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEBlendElement"},
mt:{
"^":"y;E:type=,q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEColorMatrixElement"},
mu:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEComponentTransferElement"},
mv:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFECompositeElement"},
mw:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEConvolveMatrixElement"},
mx:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEDiffuseLightingElement"},
my:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEDisplacementMapElement"},
mz:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEFloodElement"},
mA:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEGaussianBlurElement"},
mB:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEImageElement"},
mC:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEMergeElement"},
mD:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEMorphologyElement"},
mE:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFEOffsetElement"},
mF:{
"^":"y;j:x=,k:y=",
"%":"SVGFEPointLightElement"},
mG:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFESpecularLightingElement"},
mH:{
"^":"y;j:x=,k:y=",
"%":"SVGFESpotLightElement"},
mI:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFETileElement"},
mJ:{
"^":"y;E:type=,q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFETurbulenceElement"},
mL:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGFilterElement"},
mM:{
"^":"aD;q:height=,t:width=,j:x=,k:y=",
"%":"SVGForeignObjectElement"},
hS:{
"^":"aD;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
aD:{
"^":"y;",
$isj:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
mP:{
"^":"aD;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGImageElement"},
mV:{
"^":"y;",
$isj:1,
"%":"SVGMarkerElement"},
mW:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGMaskElement"},
nc:{
"^":"y;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGPatternElement"},
nd:{
"^":"hS;q:height=,t:width=,j:x=,k:y=",
"%":"SVGRectElement"},
nf:{
"^":"y;E:type=",
$isj:1,
"%":"SVGScriptElement"},
nl:{
"^":"y;E:type=",
"%":"SVGStyleElement"},
y:{
"^":"b7;",
gav:function(a){return H.a(new W.F(a,"error",!1),[null])},
gaH:function(a){return H.a(new W.F(a,"load",!1),[null])},
gbB:function(a){return H.a(new W.F(a,"mousedown",!1),[null])},
gbC:function(a){return H.a(new W.F(a,"mouseenter",!1),[null])},
gbD:function(a){return H.a(new W.F(a,"mouseleave",!1),[null])},
gbE:function(a){return H.a(new W.F(a,"mousemove",!1),[null])},
gbF:function(a){return H.a(new W.F(a,"mouseout",!1),[null])},
gbG:function(a){return H.a(new W.F(a,"mouseover",!1),[null])},
gbH:function(a){return H.a(new W.F(a,"mouseup",!1),[null])},
$isZ:1,
$isj:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
nm:{
"^":"aD;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGSVGElement"},
nn:{
"^":"y;",
$isj:1,
"%":"SVGSymbolElement"},
ed:{
"^":"aD;",
"%":";SVGTextContentElement"},
np:{
"^":"ed;",
$isj:1,
"%":"SVGTextPathElement"},
jv:{
"^":"ed;j:x=,k:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
ns:{
"^":"aD;q:height=,t:width=,j:x=,k:y=",
$isj:1,
"%":"SVGUseElement"},
nt:{
"^":"y;",
$isj:1,
"%":"SVGViewElement"},
nC:{
"^":"y;",
$isj:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
nE:{
"^":"y;",
$isj:1,
"%":"SVGCursorElement"},
nF:{
"^":"y;",
$isj:1,
"%":"SVGFEDropShadowElement"},
nG:{
"^":"y;",
$isj:1,
"%":"SVGGlyphRefElement"},
nH:{
"^":"y;",
$isj:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":"",
da:{
"^":"j;m:length=",
$isc:1,
"%":"AudioBuffer"},
mg:{
"^":"Z;",
fd:function(a,b,c,d){return a.decodeAudioData(b,H.O(c,1),H.O(d,1))},
h4:function(a){if(a.createGain!==undefined)return a.createGain()
else return a.createGainNode()},
ha:function(a,b){var z=H.a(new P.a8(H.a(new P.z(0,$.m,null),[P.da])),[P.da])
this.fd(a,b,new P.h2(z),new P.h3(z))
return z.a},
"%":"AudioContext|OfflineAudioContext|webkitAudioContext"},
h2:{
"^":"d:0;a",
$1:function(a){this.a.S(0,a)}},
h3:{
"^":"d:0;a",
$1:function(a){var z=this.a
if(a==null)z.X("")
else z.X(a)}}}],["","",,P,{
"^":"",
j0:{
"^":"j;",
fL:function(a,b,c){return a.bindBuffer(b,c)},
fM:function(a,b,c){return a.bindTexture(b,c)},
fO:function(a,b){return a.blendEquation(b)},
fP:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
fQ:function(a,b,c,d){return a.bufferData(b,c,d)},
fT:function(a,b){return a.clear(b)},
fU:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
fV:function(a,b){return a.clearDepth(b)},
fY:function(a,b){return a.clearStencil(b)},
h0:function(a){return a.createBuffer()},
h5:function(a){return a.createProgram()},
h6:function(a,b){return a.createShader(b)},
h7:function(a){return a.createTexture()},
hc:function(a,b){return a.deleteTexture(b)},
hd:function(a,b){return a.depthFunc(b)},
hk:function(a,b){return a.disableVertexAttribArray(b)},
ho:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
hv:function(a,b){return a.enable(b)},
hw:function(a,b){return a.enableVertexAttribArray(b)},
ek:function(a,b,c){return a.getAttribLocation(b,c)},
ep:function(a,b){return a.getParameter(b)},
er:function(a,b,c){return a.getUniformLocation(b,c)},
im:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.lG(g))
return}z=J.q(g)
if(!!z.$isdC)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isde)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iseu)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aQ("Incorrect number or type of arguments"))},
il:function(a,b,c,d,e,f,g){return this.im(a,b,c,d,e,f,g,null,null,null)},
io:function(a,b,c,d){return a.texParameteri(b,c,d)},
is:function(a,b){return a.useProgram(b)},
it:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
mj:{
"^":"c;"}}],["","",,P,{
"^":"",
aZ:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
eB:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
iV:function(a){return C.h},
kS:{
"^":"c;",
hW:function(a){if(a<=0||a>4294967296)throw H.e(P.iW("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
bc:function(){return Math.random()}},
a1:{
"^":"c;j:a>,k:b>",
i:function(a){return"Point("+H.f(this.a)+", "+H.f(this.b)+")"},
w:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.a1))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gK:function(a){var z,y
z=J.R(this.a)
y=J.R(this.b)
return P.eB(P.aZ(P.aZ(0,z),y))},
l:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gj(b)
if(typeof z!=="number")return z.l()
x=C.b.l(z,x)
z=this.b
y=y.gk(b)
if(typeof z!=="number")return z.l()
y=new P.a1(x,C.b.l(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
u:function(a,b){var z,y,x,w
z=this.a
y=J.fO(b)
if(typeof z!=="number")return z.u()
if(typeof y!=="number")return H.u(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.u()
if(typeof w!=="number")return H.u(w)
w=new P.a1(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w},
n:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.n()
y=this.b
if(typeof y!=="number")return y.n()
y=new P.a1(z*b,y*b)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y}},
l8:{
"^":"c;",
gcM:function(a){return this.gae(this)+this.c},
gcm:function(a){return this.gaW(this)+this.d},
i:function(a){return"Rectangle ("+this.gae(this)+", "+this.b+") "+this.c+" x "+this.d},
w:function(a,b){var z,y
if(b==null)return!1
z=J.q(b)
if(!z.$isak)return!1
if(this.gae(this)===z.gae(b)){y=this.b
z=y===z.gaW(b)&&this.a+this.c===z.gcM(b)&&y+this.d===z.gcm(b)}else z=!1
return z},
gK:function(a){var z=this.b
return P.eB(P.aZ(P.aZ(P.aZ(P.aZ(0,this.gae(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gcS:function(a){var z=new P.a1(this.gae(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
ak:{
"^":"l8;ae:a>,aW:b>,t:c>,q:d>",
$asak:null,
static:{iY:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.a(new P.ak(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
k:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.aQ("Invalid length "+H.f(a)))
return a},
b0:function(a){return a},
ls:function(a,b,c){var z
if(!(a>>>0!==a))z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.e(H.lM(a,b,c))
return b},
dT:{
"^":"j;",
fK:function(a,b,c){return new Uint8Array(a,b)},
fJ:function(a){return this.fK(a,0,null)},
$isdT:1,
$ishc:1,
"%":"ArrayBuffer"},
cn:{
"^":"j;",
$iscn:1,
"%":"DataView;ArrayBufferView;cl|dU|dW|cm|dV|dX|as"},
cl:{
"^":"cn;",
gm:function(a){return a.length},
$isbb:1,
$isb9:1},
cm:{
"^":"dW;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
return a[b]},
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
a[b]=c}},
dU:{
"^":"cl+bF;",
$isp:1,
$asp:function(){return[P.ag]},
$isA:1},
dW:{
"^":"dU+dA;"},
as:{
"^":"dX;",
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
a[b]=c},
$isp:1,
$asp:function(){return[P.r]},
$isA:1},
dV:{
"^":"cl+bF;",
$isp:1,
$asp:function(){return[P.r]},
$isA:1},
dX:{
"^":"dV+dA;"},
mZ:{
"^":"cm;",
$isp:1,
$asp:function(){return[P.ag]},
$isA:1,
"%":"Float32Array"},
n_:{
"^":"cm;",
$isp:1,
$asp:function(){return[P.ag]},
$isA:1,
"%":"Float64Array"},
n0:{
"^":"as;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.r]},
$isA:1,
"%":"Int16Array"},
n1:{
"^":"as;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.r]},
$isA:1,
"%":"Int32Array"},
n2:{
"^":"as;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.r]},
$isA:1,
"%":"Int8Array"},
n3:{
"^":"as;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.r]},
$isA:1,
"%":"Uint16Array"},
n4:{
"^":"as;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.r]},
$isA:1,
"%":"Uint32Array"},
n5:{
"^":"as;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.r]},
$isA:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
dY:{
"^":"as;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.Q(H.P(a,b))
return a[b]},
$isdY:1,
$iskc:1,
$isp:1,
$asp:function(){return[P.r]},
$isA:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
bZ:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
iA:{
"^":"jK;cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,e,f,r,x,y,z,Q,ch,cx,a,b,c,d",
ba:function(){var z=0,y=new P.w(),x=1,w,v=this,u,t,s,r
var $async$ba=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:s=v
s=s.go
z=2
return P.b(s.T(0),$async$ba,y)
case 2:s=J
s=s
r=v
r=r.go
z=3
return P.b(r.bQ(),$async$ba,y)
case 3:s=u=s.aB(b)
r=v
s,t=r.db
case 4:s=u
if(!s.C()){z=5
break}s=t
s=s
r=u
s.ee(r.gG())
z=4
break
case 5:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$ba,y,null)},
ay:function(){var z=0,y=new P.w(),x=1,w,v=this,u,t,s
var $async$ay=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:t=v
t=!t.k4
if(t){z=4
break}else b=t
z=5
break
case 4:t=v
b=t.k3==null
case 5:z=b?2:3
break
case 2:t=v
u=t.cy
t=v
s=u
z=6
return P.b(s.aR("assets/greendog.mp3"),$async$ay,y)
case 6:t.k3=b
t=v
s=u
z=7
return P.b(s.aR("assets/se_maoudamashii_se_syber04.mp3"),$async$ay,y)
case 7:t.k1=b
t=v
s=u
z=8
return P.b(s.aR("assets/se_maoudamashii_se_syber08.mp3"),$async$ay,y)
case 8:t.k2=b
t=v
s=u
z=9
return P.b(s.aR("assets/se_maoudamashii_se_syber09.mp3"),$async$ay,y)
case 9:t.id=b
case 3:t=v
t.k4=!0
t=J
t=t
s=v
t.fZ(s.k3,!0)
return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$ay,y,null)},
c_:function(){var z=0,y=new P.w(),x=1,w,v=this,u,t
var $async$c_=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:t=v
u=t.k3
z=u!=null?2:3
break
case 2:t=v
t.k4=!1
t=J
t.fT(u)
case 3:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$c_,y,null)},
bY:function(){var z=0,y=new P.w(),x=1,w,v=this,u,t
var $async$bY=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:t=v
u=t.id
z=u!=null?2:3
break
case 2:t=J
t.c4(u)
case 3:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$bY,y,null)},
bn:function(){var z=0,y=new P.w(),x=1,w,v=this,u,t
var $async$bn=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:t=v
u=t.k1
z=u!=null?2:3
break
case 2:t=J
t.c4(u)
case 3:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$bn,y,null)},
bZ:function(){var z=0,y=new P.w(),x=1,w,v=this,u,t
var $async$bZ=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:t=v
u=t.k2
z=u!=null?2:3
break
case 2:t=J
t.c4(u)
case 3:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$bZ,y,null)}},
ht:{
"^":"c;a,b",
bQ:function(){var z=0,y=new P.w(),x,w=2,v,u=this,t,s
var $async$bQ=P.x(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=P
t=t
s=u
x=t.bd(s.a,!0,null)
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$bQ,y,null)},
bW:function(a){var z=0,y=new P.w(),x=1,w,v=this,u,t
var $async$bW=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=v
u=t.a
t=C
t=t.a
t.sm(u,0)
t=C
t=t.a
t.D(u,a)
return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$bW,y,null)},
cr:function(){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r,q
var $async$cr=P.x(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:s=C
s=s.E
s=s
r=P
r=r
q=u
t=s.hx(r.aj(["v","1","rank",q.a]))
s=P
s.M("##"+t)
x=t
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$cr,y,null)},
T:function(a){var z=0,y=new P.w(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k,j,i
var $async$T=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
j=u
j=j.b
z=6
return P.b(j.by("database.dat"),$async$T,y)
case 6:t=c
j=t
j=j
i=t
z=8
return P.b(i.aJ(),$async$T,y)
case 8:z=7
return P.b(j.bf(0,c),$async$T,y)
case 7:s=c
j=C
j=j.z
r=j.cs(s)
j=P
j=j
i=H
j.M("##### load database.dat "+i.f(r))
j=C
j=j.E
q=j.cs(r)
j=u
o=j.a
j=C
j=j.a
j.sm(o,0)
j=J
j=j
i=J
n=j.aB(i.br(q,"rank"))
case 9:j=n
if(!j.C()){z=10
break}j=n
p=j.gG()
j=H
m="##"+j.f(p)
j=H
j.bZ(m)
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
j.G(k)
z=5
break
case 2:z=1
break
case 5:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$T,y,null)},
aL:function(a){var z=0,y=new P.w(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m
var $async$aL=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:o=u
o=o.b
z=2
return P.b(o.by("database.dat"),$async$aL,y)
case 2:t=c
x=4
o=J
z=7
return P.b(o.d6(t,0),$async$aL,y)
case 7:x=1
z=6
break
case 4:x=3
p=w
o=H
q=o.G(p)
s=q
o=P
o=o
n=H
o.M("e: truncate "+n.f(s))
z=6
break
case 3:z=1
break
case 6:o=u
z=8
return P.b(o.cr(),$async$aL,y)
case 8:q=c
o=J
o=o
n=t
m=C
m=m.z
m=m.gcv()
o.h1(n,m.cq(q),0)
return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$aL,y,null)}},
iB:{
"^":"c;a,b,c,d",
a3:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z+1,x=this.b+2,w=x-1,v=0;v<y;++v)for(u=v===z,t=0;t<x;++t)if(t===0||t===w||u)this.a2(t,v).a=C.v
else this.a2(t,v).a=C.e},
a2:function(a,b){var z,y
if(!(a<0)){z=this.c+1
if(!(a>z)){y=J.X(b)
z=y.ar(b,0)||y.aK(b,z)}else z=!0}else z=!0
if(z)return this.d
z=this.a
y=J.cZ(b,this.b+2)
if(typeof y!=="number")return H.u(y)
y=a+y
if(y>>>0!==y||y>=z.length)return H.h(z,y)
return z[y]},
fZ:function(){var z,y,x,w,v,u
z=[]
for(y=this.c+1-1,x=this.b+2-1,w=0;w<y;++w){u=1
while(!0){if(!(u<x)){v=!0
break}if(this.a2(u,w).a===C.e){v=!1
break}++u}if(v)z.push(w)}C.a.d_(z)
return z},
fX:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.L)(a),++y)this.fW(a[y])},
fW:function(a){var z,y,x,w
for(z=this.b+2-1,y=a;x=J.X(y),x.bN(y,0);y=x.u(y,1))for(w=1;w<z;++w)if(this.a2(w,x.u(y,1)).a===C.r)this.a2(w,y).a=C.e
else this.a2(w,y).a=this.a2(w,x.u(y,1)).a},
eR:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.c,y=z+1,x=this.b+2,w=this.a,v=x-1,u=0;u<y;++u)for(t=u===z,s=0;s<x;++s)if(s===0||s===v||t)w.push(new F.bH(C.v))
else w.push(new F.bH(C.e))},
static:{dR:function(a,b){var z=new F.iB([],b,a,new F.bH(C.r))
z.eR(a,b)
return z}}},
iy:{
"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
dW:function(){var z,y
this.cy=!0
z=this.b
if(z.length>0)C.a.e1(z,0)
for(;z.length<3;){y=F.iD()
y.a=(this.a.b+2)/2|0
y.b=0
z.push(y)}},
ak:function(a){this.a.a3(0)
this.c=!1
this.d=0
this.e=this.f},
i4:[function(a,b){var z,y,x
z=this.z
y=$.$get$dL()
x=this.e
if(x>=5)return H.h(y,x)
if(z+y[x]<b){this.z=b
this.ct(b)}},"$1","gbe",2,0,11],
iI:[function(a,b){},"$1","gbd",2,0,11],
hn:function(a,b){var z,y,x
if(!b){z=this.x
y=$.$get$dN()
x=this.e
if(x>=5)return H.h(y,x)
x=z+y[x]<a
z=x}else z=!0
if(z){this.x=a
return this.ct(a)}else return!1},
hm:function(a,b){var z,y,x
if(!b){z=this.Q
y=$.$get$dO()
x=this.e
if(x>=5)return H.h(y,x)
x=z+y[x]<a
z=x}else z=!0
if(z)return this.ct(a)
else return!1},
ii:function(a,b){var z,y,x
if(!b){z=this.y
y=$.$get$cj()
x=this.e
if(x>=5)return H.h(y,x)
x=z+y[x]<a
z=x}else z=!0
if(z){this.y=a
this.ih()
return!0}else return!1},
ig:function(a,b){var z,y,x
if(!b){z=this.y
y=$.$get$cj()
x=this.e
if(x>=5)return H.h(y,x)
x=z+y[x]<a
z=x}else z=!0
if(z){this.y=a
this.ie()
return!0}else return!1},
ct:function(a){var z,y,x,w,v
if(!this.cB(0,1)){z=this.b
if(1>=z.length)return H.h(z,1)
if(this.bx(z[1])){if(!this.c)this.ir()
this.c=!0}z=this.dx
y=$.$get$dM()
x=this.e
if(x>=5)return H.h(y,x)
if(z>=y[x]){this.dx=0
this.dW()
w=this.a.fZ()
z=w.length
if(z>0){y=this.d
x=$.$get$dP()
v=this.e
if(v>=5)return H.h(x,v)
v=x[v]
H.an(v)
H.an(z)
v=y+Math.pow(v,z)
this.d=v
P.M(H.f(v))}if(z===4)++this.cx
z=this.cx
y=$.$get$dQ()
x=this.e
if(x>=5)return H.h(y,x)
if(z>y[x])if(x+1<5){this.e=x+1
this.cx=0}if(w.length>0){this.db=!0
this.a.fX(w)}this.Q=a}else this.dx=z+1
return!1}else return!0},
ee:function(a){var z
if(a==null)a=this.d
for(z=this.ch;z.length<3;)z.push(0)
z.push(a)
C.a.d_(z)
if(z.length>3)C.a.e1(z,0)},
ir:function(){return this.ee(null)},
cB:function(a,b){var z,y,x
z=this.b
this.aw(C.a.gJ(z),!1)
y=C.a.gJ(z)
x=y.a
if(typeof x!=="number")return x.l()
y.a=x+a
x=C.a.gJ(z)
y=x.b
if(typeof y!=="number")return y.l()
x.b=y+b
if(this.bx(C.a.gJ(z))){y=C.a.gJ(z)
x=y.a
if(typeof x!=="number")return x.u()
y.a=x-a
x=C.a.gJ(z)
y=x.b
if(typeof y!=="number")return y.u()
x.b=y-b
this.aw(C.a.gJ(z),!0)
return!1}else{this.aw(C.a.gJ(z),!0)
return!0}},
ih:function(){var z,y,x,w,v,u
z=this.b
this.aw(C.a.gJ(z),!1)
for(y=[0,-1,1,-2,2],x=0;x<5;++x){w=y[x]
v=C.a.gJ(z)
u=v.a
if(typeof u!=="number")return u.l()
v.a=u+w
C.a.gJ(z).e6()
if(!this.bx(C.a.gJ(z)))break
else{C.a.gJ(z).e5()
v=C.a.gJ(z)
u=v.a
if(typeof u!=="number")return u.u()
v.a=u-w}}this.aw(C.a.gJ(z),!0)},
ie:function(){var z,y,x,w,v,u
z=this.b
this.aw(C.a.gJ(z),!1)
for(y=[0,-1,1,-2,2],x=0;x<5;++x){w=y[x]
v=C.a.gJ(z)
u=v.a
if(typeof u!=="number")return u.l()
v.a=u+w
C.a.gJ(z).e5()
if(!this.bx(C.a.gJ(z)))break
else{C.a.gJ(z).e6()
v=C.a.gJ(z)
u=v.a
if(typeof u!=="number")return u.u()
v.a=u-w}}this.aw(C.a.gJ(z),!0)},
bx:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=this.a
u=a.a
t=J.i(w)
s=t.gj(w)
if(typeof u!=="number")return u.l()
if(typeof s!=="number")return H.u(s)
r=a.b
t=t.gk(w)
if(typeof r!=="number")return r.l()
if(typeof t!=="number")return H.u(t)
v=v.a2(u+s,r+t).a
if(!(v===C.e||v===C.r))return!0}return!1},
aw:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=this.a
u=a.a
t=J.i(w)
s=t.gj(w)
if(typeof u!=="number")return u.l()
if(typeof s!=="number")return H.u(s)
r=a.b
q=t.gk(w)
if(typeof r!=="number")return r.l()
if(typeof q!=="number")return H.u(q)
p=v.a2(u+s,r+q)
if(p.a!==C.r)if(b)p.a=t.gE(w)
else p.a=C.e}}},
ad:{
"^":"c;a",
i:function(a){return C.a0.h(0,this.a)}},
aE:{
"^":"c;j:a*,k:b*,c",
e6:function(){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.i(w)
u=v.gj(w)
t=v.gk(w)
if(typeof t!=="number")return H.u(t)
v.sj(w,-1*t)
v.sk(w,u)}},
e5:function(){var z,y,x,w,v,u
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=J.i(w)
u=v.gj(w)
v.sj(w,v.gk(w))
if(typeof u!=="number")return H.u(u)
v.sk(w,-1*u)}},
static:{iD:function(){switch($.$get$dS().hW(7)){case 0:var z=[]
z.push(new F.B(0,0,C.j))
z.push(new F.B(-1,0,C.j))
z.push(new F.B(1,0,C.j))
z.push(new F.B(2,0,C.j))
return new F.aE(0,0,z)
case 1:z=[]
z.push(new F.B(0,0,C.k))
z.push(new F.B(1,0,C.k))
z.push(new F.B(0,-1,C.k))
z.push(new F.B(1,-1,C.k))
return new F.aE(0,0,z)
case 2:z=[]
z.push(new F.B(0,0,C.l))
z.push(new F.B(1,0,C.l))
z.push(new F.B(0,-1,C.l))
z.push(new F.B(-1,-1,C.l))
return new F.aE(0,0,z)
case 3:z=[]
z.push(new F.B(0,0,C.m))
z.push(new F.B(-1,0,C.m))
z.push(new F.B(0,-1,C.m))
z.push(new F.B(1,-1,C.m))
return new F.aE(0,0,z)
case 4:z=[]
z.push(new F.B(1,0,C.p))
z.push(new F.B(1,-1,C.p))
z.push(new F.B(0,0,C.p))
z.push(new F.B(-1,0,C.p))
return new F.aE(0,0,z)
case 5:z=[]
z.push(new F.B(-1,0,C.n))
z.push(new F.B(-1,-1,C.n))
z.push(new F.B(0,0,C.n))
z.push(new F.B(1,0,C.n))
return new F.aE(0,0,z)
case 6:z=[]
z.push(new F.B(-1,0,C.o))
z.push(new F.B(0,-1,C.o))
z.push(new F.B(0,0,C.o))
z.push(new F.B(1,0,C.o))
return new F.aE(0,0,z)
case 7:H.bZ("#### WARNING")
break}}}},
B:{
"^":"bH;j:b*,k:c*,a"},
bH:{
"^":"c;E:a>"},
iC:{
"^":"a7;e,f,a,b,c,d",
a0:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=new F.n(0,0,7,7)
y=F.T(null)
y.b=C.f
y.c=1
y.a=$.$get$e_()
x=this.f
a0.aQ(a,new F.n(0,0,8*(x.b+2),8*(x.c+1)),y)
for(w=0;w<this.f.c+1;++w)for(x=w*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=x
u=u.a2(v,w).a
if(u===C.v)y.a=$.$get$cq()
else if(u===C.e)y.a=$.$get$cp()
else if(u===C.j)y.a=$.$get$cs()
else if(u===C.k)y.a=$.$get$bJ()
else if(u===C.o)y.a=$.$get$cu()
else if(u===C.l)y.a=$.$get$ct()
else if(u===C.m)y.a=$.$get$cv()
else if(u===C.n)y.a=$.$get$cr()
else if(u===C.p)y.a=$.$get$bI()
else y.a=$.$get$bI()
if(y.b===C.f){t=a0.am()
s=z.a
r=z.b
u=z.c
if(typeof s!=="number")return s.l()
q=s+u
u=z.d
if(typeof r!=="number")return r.l()
p=r+u
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.n(0,new E.o(u))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.n(0,new E.o(u))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.n(0,new E.o(u))
u=new Float64Array(3)
u[0]=q
u[1]=p
u[2]=0
l=t.n(0,new E.o(u))
u=y.a.a
a0.O(a,o,n,m,l,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{t=a0.am()
u=z.a
k=y.c/2
if(typeof u!=="number")return u.l()
s=u+k
j=z.b
if(typeof j!=="number")return j.l()
r=j+k
q=u+z.c-k
p=j+z.d-k
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.n(0,new E.o(u))
u=y.c
k=new Float64Array(3)
k[0]=s-u
k[1]=r-u
k[2]=0
i=t.n(0,new E.o(k))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.n(0,new E.o(u))
u=y.c
k=new Float64Array(3)
k[0]=s-u
k[1]=p+u
k[2]=0
h=t.n(0,new E.o(k))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.n(0,new E.o(u))
u=y.c
k=new Float64Array(3)
k[0]=q+u
k[1]=r-u
k[2]=0
g=t.n(0,new E.o(k))
u=new Float64Array(3)
u[0]=q
u[1]=p
u[2]=0
l=t.n(0,new E.o(u))
u=y.c
k=new Float64Array(3)
k[0]=q+u
k[1]=p+u
k[2]=0
f=t.n(0,new E.o(k))
k=y.a.a
e=(k>>>16&255)/255
d=(k>>>8&255)/255
c=(k>>>0&255)/255
b=(k>>>24&255)/255
a0.O(a,i,h,o,n,e,d,c,b)
a0.O(a,h,f,n,l,e,d,c,b)
a0.O(a,f,g,l,m,e,d,c,b)
a0.O(a,g,i,m,o,e,d,c,b)}}}},
he:{
"^":"a7;aq:e>,f,r,x,y,z,Q,ch,cx,cy,db,E:dx>,dy,fr,fx,fy,go,id,a,b,c,d",
gh8:function(){var z,y
z=J.fj(this.dy,"ja")
y=this.dx
if(z===!0){z=this.fy
if(y>=6)return H.h(z,y)
return z[y]}else{z=this.go
if(y>=6)return H.h(z,y)
return z[y]}},
iq:function(a){var z,y,x
for(z=this.fr,y=0,x=0;x<6;++x)if(a>=z[x])y=x
return y},
dR:function(a){var z,y,x
this.z=null
this.r=null
z=this.iq(a)
this.dx=z
y=this.fx
if(z>=6)return H.h(y,z)
x=this.f
x.M(y[z]).V(new F.hh(this))
x.M("assets/font_a.png").V(new F.hi(this))
x.ap("assets/font_a.json").V(new F.hj(this))
return this},
bk:function(){var z=this.cx
if(z!=null&&this.z!=null)this.cy=F.h5(z,this.z.gW(),this.z.gaa())},
aI:function(a,b,c,d,e,f,g){if(this.id&&c===C.q){this.id=!1
this.e.an().V(new F.hk(this))}else if(c===C.t)this.id=!0
return!1},
a0:function(a,b){var z,y,x
z=this.r
if(z!=null)b.at(a,z,this.x,this.y,this.db)
z=this.z
if(z!=null&&this.cy!=null){y=this.cy
x=this.gh8()
y.hu(a,b,z,x,20,5,new F.n(40,230,350,200))}},
eO:function(a,b,c){this.dR(c)
this.f.bO().V(new F.hg(this))},
static:{hf:function(a,b,c){var z,y
z=F.T(null)
y=new E.v(new Float64Array(H.k(16)))
y.A()
y=new F.he(b,a,null,null,null,null,null,null,null,null,z,0,"ja",[0,5000,16e3,32e3,5e4,1e5],["assets/bg_clear01.png","assets/bg_clear02.png","assets/bg_clear05.png","assets/bg_clear06.png","assets/bg_clear03.png","assets/bg_clear04.png"],["\u305d\u3057\u3066\u3001\u30df\u30ce\u30fc\u30f3\u306e\u96ea\u304c\u964d\u3063\u305f\u3002","\u30df\u30ce\u30fc\u30f3\u304c\u4ef2\u9593\u306b\u306a\u3063\u305f\u3002","\u708e\u306e\u5996\u7cbe\u304c\u3053\u3061\u3089\u3092\u898b\u3066\u3044\u308b\u3002","\u9b54\u6cd5\u5c11\u5973\u3068\u304a\u53cb\u9054\u306b\u306a\u3063\u305f\u3002","\u95c7\u304c\u8fba\u308a\u3092\u7167\u3089\u3057\u305f\u3002","\u30df\u30fc\u30c6\u30a3\u30a2\u3092\u8a60\u5531\u3057\u305f\u3002"],["then, Minon snowflake fell","Minon has become a friend","Fairy of flame have seen here .","Magical Girl and I became friends .","Darkness shone around .","Chanting the Meteor."],!1,"none",null,y,!1)
y.b=[]
y.eO(a,b,c)
return y}}},
hg:{
"^":"d:3;a",
$1:function(a){this.a.dy=a}},
hh:{
"^":"d:0;a",
$1:function(a){var z=this.a
z.r=a
z.x=new F.n(0,0,J.N(a.gW()),J.N(z.r.gaa()))
z.y=new F.n(0,0,400,300)}},
hi:{
"^":"d:0;a",
$1:function(a){var z=this.a
z.z=a
z.Q=new F.n(0,0,0,0)
z.ch=new F.n(0,0,0,0)
z.bk()}},
hj:{
"^":"d:3;a",
$1:function(a){var z=this.a
z.cx=a
z.bk()}},
hk:{
"^":"d:0;a",
$1:function(a){var z=this.a.e
z.B(z.fr)}},
iz:{
"^":"a7;e,f,a,b,c,d",
eB:function(a){var z,y,x,w,v,u,t,s,r
this.f.a3(0)
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
v=this.f
u=J.i(w)
t=u.gj(w)
if(typeof t!=="number")return H.u(t)
s=u.gk(w)
if(typeof s!=="number")return H.u(s)
r=v.a2(3+t,3+s)
if(r.a!==C.r)r.a=u.gE(w)}},
a0:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=new F.n(0,0,7,7)
y=F.T(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.a2(v,x).a
if(u===C.v)y.a=$.$get$cq()
else if(u===C.e)y.a=$.$get$cp()
else if(u===C.j)y.a=$.$get$cs()
else if(u===C.k)y.a=$.$get$bJ()
else if(u===C.o)y.a=$.$get$cu()
else if(u===C.l)y.a=$.$get$ct()
else if(u===C.m)y.a=$.$get$cv()
else if(u===C.n)y.a=$.$get$cr()
else if(u===C.p)y.a=$.$get$bI()
else y.a=$.$get$bJ()
if(y.b===C.f){t=a0.am()
s=z.a
r=z.b
u=z.c
if(typeof s!=="number")return s.l()
q=s+u
u=z.d
if(typeof r!=="number")return r.l()
p=r+u
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.n(0,new E.o(u))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.n(0,new E.o(u))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.n(0,new E.o(u))
u=new Float64Array(3)
u[0]=q
u[1]=p
u[2]=0
l=t.n(0,new E.o(u))
u=y.a.a
a0.O(a,o,n,m,l,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{t=a0.am()
u=z.a
k=y.c/2
if(typeof u!=="number")return u.l()
s=u+k
j=z.b
if(typeof j!=="number")return j.l()
r=j+k
q=u+z.c-k
p=j+z.d-k
u=new Float64Array(3)
u[0]=s
u[1]=r
u[2]=0
o=t.n(0,new E.o(u))
u=y.c
k=new Float64Array(3)
k[0]=s-u
k[1]=r-u
k[2]=0
i=t.n(0,new E.o(k))
u=new Float64Array(3)
u[0]=s
u[1]=p
u[2]=0
n=t.n(0,new E.o(u))
u=y.c
k=new Float64Array(3)
k[0]=s-u
k[1]=p+u
k[2]=0
h=t.n(0,new E.o(k))
u=new Float64Array(3)
u[0]=q
u[1]=r
u[2]=0
m=t.n(0,new E.o(u))
u=y.c
k=new Float64Array(3)
k[0]=q+u
k[1]=r-u
k[2]=0
g=t.n(0,new E.o(k))
u=new Float64Array(3)
u[0]=q
u[1]=p
u[2]=0
l=t.n(0,new E.o(u))
u=y.c
k=new Float64Array(3)
k[0]=q+u
k[1]=p+u
k[2]=0
f=t.n(0,new E.o(k))
k=y.a.a
e=(k>>>16&255)/255
d=(k>>>8&255)/255
c=(k>>>0&255)/255
b=(k>>>24&255)/255
a0.O(a,i,h,o,n,e,d,c,b)
a0.O(a,h,f,n,l,e,d,c,b)
a0.O(a,f,g,l,m,e,d,c,b)
a0.O(a,g,i,m,o,e,d,c,b)}}}},
iH:{
"^":"a7;e,aq:f>,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,a,b,c,d",
bk:function(){var z,y
z=this.fr
if(z!=null&&this.dy!=null){y=this.z
y.cx=z
y.db=new F.n(0,0,50,50)
y.cy=this.dy.a6("BT01.png").gN()
y=this.Q
z=this.fr
y.cx=z
y=this.y
y.cx=z
y.db=new F.n(0,0,50,50)
y.cy=this.dy.a6("BT02.png").gN()
y=this.Q
y.cx=this.fr
y.db=new F.n(0,0,50,50)
y.cy=this.dy.a6("BT03.png").gN()}},
cC:function(a,b){var z,y,x
z=this.r
this.db.r=z.d
this.dx.r=z.e+1
z=z.b
y=z.length
if(y>1&&!0){x=this.cy
if(1>=y)return H.h(z,1)
x.eB(z[1])}if(!this.ch);else this.i1(a,b)},
i1:function(a,b){var z,y,x,w,v,u,t
z=this.r
z.i4(0,b)
y=this.x
x=y.Q
w=y.r
v=-x/w>0.8?0.68:0.55
x=y.z/w
if(!(x>v))u=y.db&&y.cy&&y.ch/w>v
else u=!0
if(u){y.db=!1
if(!y.cy){y=z.r
x=$.$get$ci()
w=z.e
if(w>=5)return H.h(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.r=b
z.cB(1,0)}t=!0}else{u=-1*v
if(!(x<u))x=y.db&&y.cy&&y.ch/w<u
else x=!0
if(x){y.db=!1
if(!y.cy){y=z.r
x=$.$get$ci()
w=z.e
if(w>=5)return H.h(x,w)
w=y+x[w]<b
y=w}else y=!0
if(y){z.r=b
z.cB(-1,0)}t=!0}else t=!1}y=this.x
x=-y.Q/y.r
if(x<-0.6)z.hn(b,y.cy)
else if(x>0.83&&!t)z.hm(b,y.cy)
y=this.y
if(!y.r)x=y.id&&y.go
else x=!0
if(x){y.id=!1
if(z.ii(b,y.go))this.f.bn()}y=this.z
if(!y.r)x=y.id&&y.go
else x=!0
if(x){y.id=!1
if(z.ig(b,y.go))this.f.bn()}if(z.c)this.f.an().V(new F.iL(this))
if(z.cy)this.f.bY()
if(z.db)this.f.bZ()
this.x.cy=!1
this.z.go=!1
this.y.go=!1
z.cy=!1
z.db=!1},
aI:function(a,b,c,d,e,f,g){var z
if(!this.ch){z=this.z
if(z.r)z.c.H(0,z.y,z.z,0)
z=this.y
if(z.r)z.c.H(0,z.y,z.z,0)
z=this.x
if(z.x)z.c.H(0,z.dx,z.dy,0)}return!1},
dX:[function(a){if(a==="s")this.ch=!this.ch},"$1","gcD",2,0,3],
eS:function(a,b,c,d){var z,y,x,w,v
z=this.gcD()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
v=new F.aa(50,50,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"r",y,x,w,z,!1,!1,!1,"none",null,v,!1)
v.b=[]
this.y=v
z=this.gcD()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
v=new F.aa(50,50,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"l",y,x,w,z,!1,!1,!1,"none",null,v,!1)
v.b=[]
this.z=v
z=this.gcD()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
v=new F.aa(50,50,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"s",y,x,w,z,!1,!1,!0,"none",null,v,!1)
v.b=[]
this.Q=v
this.y.dy=F.l(0,255,255,255)
this.z.dy=F.l(0,255,255,255)
this.Q.dy=F.l(0,255,255,255)
z=new E.v(new Float64Array(H.k(16)))
z.A()
z=new F.jL("joystick",83,32,!1,0,0,0,0,0,!1,!1,0,0,0,0,"none",null,z,!1)
z.b=[]
this.x=z
z=this.e
y=this.r
x=y.a
w=new E.v(new Float64Array(H.k(16)))
w.A()
w=new F.iC(z,x,"none",null,w,!1)
w.b=[]
this.cx=w
x=new E.v(new Float64Array(H.k(16)))
x.A()
x=new F.iz(z,null,"none",null,x,!1)
x.b=[]
x.f=F.dR(5,5)
this.cy=x
x=this.dy
w=this.fr
v=new E.v(new Float64Array(H.k(16)))
v.A()
v=new F.bh(x,w,0,7,"none",null,v,!1)
v.b=[]
this.db=v
x=this.dy
w=this.fr
v=new E.v(new Float64Array(H.k(16)))
v.A()
v=new F.bh(x,w,0,7,"none",null,v,!1)
v.b=[]
this.dx=v
v.x=3
x=this.fx
this.B(x)
x=x.x
w=new F.cx(0,0,0,0,1,"S001.png",!0,0.25,C.h)
w.bI(0)
x.push(w)
w=new F.cx(0,0,0,0,1,"S002.png",!0,0.25,C.h)
w.bI(0)
x.push(w)
this.B(this.cx)
this.B(this.cy)
this.B(this.db)
this.B(this.dx)
this.B(this.Q)
this.B(this.x)
this.B(this.y)
this.B(this.z)
this.cx.c.H(0,100,25,0)
this.x.c.H(0,100,250,0)
this.z.c.H(0,230,225,0)
this.y.c.H(0,300,225,0)
this.Q.c.H(0,300,130,0)
this.cy.c.H(0,225,153,0)
this.db.c.H(0,225,50,0)
this.dx.c.H(0,225,85,0)
z.M("assets/se_play.png").V(new F.iJ(this))
z.bb("assets/se_play.json").V(new F.iK(this))
y.f=d
y.e=d
P.M("### game =  "+d)},
static:{iI:function(a,b,c,d){var z,y,x
z=F.T(null)
y=new E.v(new Float64Array(H.k(16)))
y.A()
y=new F.e7(C.h,null,null,[],z,"none",null,y,!1)
y.b=[]
z=F.T(null)
x=new E.v(new Float64Array(H.k(16)))
x.A()
x=new F.iH(a,b,c,null,null,null,null,!0,null,null,null,null,null,null,y,z,new F.n(0,0,50,50),new F.n(0,0,50,50),"none",null,x,!1)
x.b=[]
x.eS(a,b,c,d)
return x}}},
iJ:{
"^":"d:27;a",
$1:function(a){var z=this.a
z.fr=a
z.db.f=a
z.dx.f=a
z.fx.f=a
z.bk()}},
iK:{
"^":"d:3;a",
$1:function(a){var z,y
z=this.a
y=new F.cy(a,[],P.a6(),F.T(null))
y.cH(a)
z.dy=y
z.db.e=y
z.dx.e=y
z.fx.r=y
z.bk()}},
iL:{
"^":"d:28;a",
$1:function(a){var z=0,y=new P.w(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m
var $async$$1=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:o=u
s=o.a
o=s
r=o.f
o=r
o=o
n=r
n=n.fx
n=n
m=s
m=m.r
o.B(n.dR(m.d))
x=3
o=s
r=o.f
o=r
o=o.go
o=o
n=r
n=n.db
z=6
return P.b(o.bW(n.ch),$async$$1,y)
case 6:o=s
o=o.f
o=o.go
z=7
return P.b(o.aL(0),$async$$1,y)
case 7:x=1
z=5
break
case 3:x=2
p=w
o=H
s=o.G(p)
t=s
o=P
o=o
n=H
o.M("## failed to save score "+n.f(t))
z=5
break
case 2:z=1
break
case 5:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$$1,y,null)}},
iM:{
"^":"a7;e,aq:f>,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
i_:[function(a){P.M("touch # "+a)
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
case"BACK":this.f.an().V(new F.iQ(this))
break}},"$1","gaT",2,0,3],
iH:[function(a){P.M("touch # "+a)
this.f.an().V(new F.iR(this))},"$1","gi0",2,0,3],
aI:function(a,b,c,d,e,f,g){return!1},
a0:function(a,b){var z,y,x
z=this.e
if(z!=null&&this.Q!=null){y=this.z
b.at(a,z,this.Q.a6("BG001.png").gN(),this.y,y)
b.at(a,this.e,this.Q.a6("CH001.png").gN(),new F.n(this.dx,this.dy,35,35),y)}z=this.cx
y=this.f.db.ch
x=y.length
z.r=x>=3?y[2]:0
z=this.cy
z.r=x>=2?y[1]:0
z=this.db
z.r=x>=1?y[0]:0},
eT:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.r
z.M("assets/se_setting.png").V(new F.iO(this))
z.bb("assets/se_setting.json").V(new F.iP(this))
z=this.gaT()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
u=new F.aa(45,45,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"L01",y,x,w,z,!1,!1,!0,"none",null,v,!1)
u.b=[]
u.dy=F.l(0,255,255,255)
v.H(0,70,50,0)
z=this.gaT()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
t=new F.aa(45,45,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"L02",y,x,w,z,!1,!1,!0,"none",null,v,!1)
t.b=[]
t.dy=F.l(0,255,255,255)
v.H(0,120,50,0)
z=this.gaT()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
s=new F.aa(45,45,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"L03",y,x,w,z,!1,!1,!0,"none",null,v,!1)
s.b=[]
s.dy=F.l(0,255,255,255)
v.H(0,175,50,0)
z=this.gaT()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
r=new F.aa(45,45,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"L04",y,x,w,z,!1,!1,!0,"none",null,v,!1)
r.b=[]
r.dy=F.l(0,255,255,255)
v.H(0,215,50,0)
z=this.gaT()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
q=new F.aa(45,45,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"L05",y,x,w,z,!1,!1,!0,"none",null,v,!1)
q.b=[]
q.dy=F.l(0,255,255,255)
v.H(0,265,50,0)
z=this.gaT()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
p=new F.aa(45,45,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"BACK",y,x,w,z,!1,!1,!0,"none",null,v,!1)
p.b=[]
p.dy=F.l(0,255,255,255)
v.H(0,315,50,0)
this.B(u)
this.B(t)
this.B(s)
this.B(r)
this.B(q)
this.B(p)
z=new E.v(new Float64Array(H.k(16)))
z.A()
y=new F.bh(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cx=y
z.H(0,90,220,0)
z=new E.v(new Float64Array(H.k(16)))
z.A()
y=new F.bh(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cy=y
z.H(0,90,247,0)
z=new E.v(new Float64Array(H.k(16)))
z.A()
y=new F.bh(null,null,0,7,"none",null,z,!1)
y.b=[]
this.db=y
z.H(0,90,278,0)
this.B(this.cx)
this.B(this.cy)
this.B(this.db)
this.ch=1
this.i_("L01")
z=this.gi0()
y=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
o=new F.aa(170,50,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"start",y,x,w,z,!1,!1,!0,"none",null,v,!1)
o.b=[]
v.H(0,230,250,0)
o.dy=F.l(0,255,255,255)
this.B(o)},
static:{iN:function(a,b){var z,y
z=F.T(null)
y=new E.v(new Float64Array(H.k(16)))
y.A()
y=new F.iM(null,b,a,null,null,z,null,1,null,null,null,0,0,"none",null,y,!1)
y.b=[]
y.eT(a,b)
return y}}},
iO:{
"^":"d:0;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.n(0,0,J.N(a.gW()),J.N(z.e.gaa()))
z.y=new F.n(0,0,400,300)
z.cx.f=a
z.cy.f=a
z.db.f=a}},
iP:{
"^":"d:3;a",
$1:function(a){var z,y
z=this.a
y=new F.cy(a,[],P.a6(),F.T(null))
y.cH(a)
z.Q=y
z.cx.e=y
z.cy.e=y
z.db.e=y}},
iQ:{
"^":"d:0;a",
$1:function(a){var z=this.a
z.f.db.ak(0)
z=z.f
z.B(z.dy)}},
iR:{
"^":"d:0;a",
$1:function(a){var z,y,x,w
z=this.a
P.M("### level =  "+z.ch)
z.f.db.ak(0)
y=z.f
x=y.fy
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
y.B(x)}},
j1:{
"^":"a7;aq:e>,f,r,a,b,c,d",
T:function(a){var z=0,y=new P.w(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l,k,j
var $async$T=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
o=u
t=o.f
o=P
o=o
n=t
n=n.M("assets/bg_clear01.png")
m=t
m=m.M("assets/bg_clear02.png")
l=t
l=l.M("assets/bg_clear03.png")
k=t
k=k.M("assets/bg_clear04.png")
j=t
z=6
return P.b(o.ca([n,m,l,k,j.M("assets/bg_clear05.png")],null,!1),$async$T,y)
case 6:x=1
z=5
break
case 3:x=2
r=w
o=H
o.G(r)
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
n=n.M("assets/se_start.gif")
m=t
m=m.ap("assets/se_start.json")
l=t
l=l.ap("assets/se_play.json")
k=t
z=11
return P.b(o.ca([n,m,l,k.M("assets/se_play.png")],null,!1),$async$T,y)
case 11:x=1
z=10
break
case 8:x=7
q=w
o=H
o.G(q)
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
n=n.M("assets/se_setting.gif")
m=t
m=m.ap("assets/se_setting.json")
l=t
l=l.M("assets/font_a.png")
k=t
z=16
return P.b(o.ca([n,m,l,k.ap("assets/font_a.json")],null,!1),$async$T,y)
case 16:x=1
z=15
break
case 13:x=12
p=w
o=H
o.G(p)
z=15
break
case 12:z=1
break
case 15:o=u
o=o.e
z=17
return P.b(o.an(),$async$T,y)
case 17:o=u
t=o.e
o=t
o=o
n=t
z=18
return P.b(o.B(n.dy),$async$T,y)
case 18:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$T,y,null)},
a0:function(a,b){var z,y
z=100+C.O.bS(++this.r/2,10)*5
y=-z/2
b.aQ(a,new F.n(y+200,y+150,z,z),F.T(F.l(170,255,170,170)))}},
bh:{
"^":"a7;e,f,r,ax:x>,a,b,c,d",
a0:function(a,b){var z,y,x,w
if(this.e==null||this.f==null)return
for(z=0;y=this.x,z<y;++z){x=y-1-z
if(x===0)x=1
else x=Math.pow(10,x)
x=J.f5(this.r,x)
if(typeof x!=="number")return x.bS()
y=C.c.bS(x,10)
w=new F.ef(null,C.f,1)
w.a=F.l(255,255,255,255)
b.at(a,this.f,this.e.a6("NUM00"+y+".png").gN(),new F.n(z*12,0,15,15),w)}}},
cx:{
"^":"c;j:a*,k:b*,c,d,ax:e>,E:f>,r,x,y",
bI:function(a){var z,y
z=this.y
this.a=z.bc()*400
this.b=-1*z.bc()*100
this.c=z.bc()-0.5
this.d=z.bc()
y=this.x
if(this.r)this.e=y*(z.bc()*0.75+0.25)
else this.e=y}},
e7:{
"^":"a7;e,f,r,x,y,a,b,c,d",
a0:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.f!=null&&this.r!=null)for(z=this.x,y=z.length,x=this.y,w=0;w<z.length;z.length===y||(0,H.L)(z),++w){v=z[w]
u=this.r.a6(v.f).f
t=this.f
s=this.r.a6(v.f).gN()
r=v.a
q=v.b
p=u.a
o=v.e
b.at(a,t,s,new F.n(r,q,p*o,u.b*o),x)
o=v.a
p=v.c
if(typeof o!=="number")return o.l()
p=o+p
v.a=p
o=v.b
q=v.d
if(typeof o!=="number")return o.l()
o+=q
v.b=o
v.d=q+0.001
if(p<0||p>400||o>300)v.bI(0)}}},
j9:{
"^":"a7;e,f,aq:r>,x,y,z,Q,ch,cx,a,b,c,d",
aI:function(a,b,c,d,e,f,g){if(this.ch&&c===C.q){this.ch=!1
this.r.an().V(new F.je(this))}else if(c===C.t)this.ch=!0
return!1},
a0:function(a,b){var z,y,x
z=this.e
if(z!=null&&this.f!=null){b.at(a,z,this.f.a6("BG001.png").gN(),this.f.a6("BG001.png").gcu(),this.y)
this.z.a0(a,b)
z=this.Q
z.cx=this.e
z.db=this.cx
y=this.r.k4
x=this.f
if(y)z.cy=x.a6("VON.png").gN()
else z.cy=x.a6("VOFF.png").gN()}},
eU:function(a,b){var z,y,x,w,v
z=this.x
z.M("assets/se_start.png").V(new F.jb(this))
z.ap("assets/se_start.json").V(new F.jc(this))
for(z=this.z.x,y=1;y<=7;++y){x="B00"+y+".png"
x=new F.cx(0,0,0,0,1,x,!1,0.35,C.h)
x.bI(0)
z.push(x)}z=F.l(170,255,170,204)
x=F.l(170,204,170,255)
w=F.l(170,204,255,170)
v=new E.v(new Float64Array(H.k(16)))
v.A()
w=new F.aa(100,100,!1,!1,0,0,0,0,null,new F.n(0,0,0,0),new F.n(0,0,0,0),"a",z,x,w,new F.jd(this),!1,!1,!0,"none",null,v,!1)
w.b=[]
this.Q=w
v.H(0,250,50,0)
this.Q.dy=F.l(0,0,0,0)
this.B(this.Q)},
static:{ja:function(a,b){var z,y,x
z=F.T(null)
y=F.T(null)
x=new E.v(new Float64Array(H.k(16)))
x.A()
x=new F.e7(C.h,null,null,[],y,"none",null,x,!1)
x.b=[]
y=new E.v(new Float64Array(H.k(16)))
y.A()
y=new F.j9(null,null,b,a,z,x,null,!1,new F.n(0,0,100,100),"none",null,y,!1)
y.b=[]
y.eU(a,b)
return y}}},
jb:{
"^":"d:0;a",
$1:function(a){var z=this.a
z.e=a
z.z.f=a}},
jc:{
"^":"d:0;a",
$1:function(a){var z,y
z=this.a
y=new F.cy(a,[],P.a6(),F.T(null))
y.cH(a)
z.f=y
z.z.r=y}},
jd:{
"^":"d:3;a",
$1:function(a){var z=this.a.r
if(z.k4)z.c_()
else z.ay()}},
je:{
"^":"d:0;a",
$1:function(a){var z=this.a.r
z.B(z.fr)}}}],["","",,P,{
"^":"",
lG:function(a){return a},
eT:function(a,b){var z={}
a.P(0,new P.lF(z))
return z},
lH:function(a){var z=H.a(new P.a8(H.a(new P.z(0,$.m,null),[null])),[null])
a.then(H.O(new P.lI(z),1)).catch(H.O(new P.lJ(z),1))
return z.a},
ds:function(){var z=$.dq
if(z==null){z=J.c1(window.navigator.userAgent,"Opera",0)
$.dq=z}return z},
dr:function(){var z,y
z=$.dm
if(z!=null)return z
y=$.dn
if(y==null){y=J.c1(window.navigator.userAgent,"Firefox",0)
$.dn=y}if(y===!0)z="-moz-"
else{y=$.dp
if(y==null){y=P.ds()!==!0&&J.c1(window.navigator.userAgent,"Trident/",0)
$.dp=y}if(y===!0)z="-ms-"
else z=P.ds()===!0?"-o-":"-webkit-"}$.dm=z
return z},
kk:{
"^":"c;",
dM:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x){if(x>=z.length)return H.h(z,x)
if(this.hH(z[x],a))return x}z.push(a)
this.b.push(null)
return y},
cT:function(a){var z,y,x,w,v,u,t,s
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.hu(a.getTime(),!0)
if(a instanceof RegExp)throw H.e(new P.cG("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.lH(a)
y=Object.getPrototypeOf(a)
if(y===Object.prototype||y===null){x=this.dM(a)
w=this.b
v=w.length
if(x>=v)return H.h(w,x)
u=w[x]
z.a=u
if(u!=null)return u
u=P.a6()
z.a=u
if(x>=v)return H.h(w,x)
w[x]=u
this.hz(a,new P.km(z,this))
return z.a}if(a instanceof Array){x=this.dM(a)
z=this.b
if(x>=z.length)return H.h(z,x)
u=z[x]
if(u!=null)return u
w=J.E(a)
t=w.gm(a)
u=this.c?this.hV(t):a
if(x>=z.length)return H.h(z,x)
z[x]=u
if(typeof t!=="number")return H.u(t)
z=J.aM(u)
s=0
for(;s<t;++s)z.p(u,s,this.cT(w.h(a,s)))
return u}return a}},
km:{
"^":"d:5;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.cT(b)
J.f6(z,a,y)
return y}},
lF:{
"^":"d:29;a",
$2:function(a,b){this.a[a]=b}},
kl:{
"^":"kk;a,b,c",
hV:function(a){return new Array(a)},
hH:function(a,b){return a==null?b==null:a===b},
hz:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
b.$2(w,a[w])}}},
lI:{
"^":"d:0;a",
$1:function(a){return this.a.S(0,a)}},
lJ:{
"^":"d:0;a",
$1:function(a){return this.a.X(a)}}}],["","",,F,{
"^":"",
eZ:[function(){var z=0,y=new P.w(),x=1,w,v,u,t,s,r,q,p,o,n
var $async$eZ=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:p=G
p=p
o=P
o=o.a6()
n=P
v=new p.jF("",600,400,40,15,o,n.a6())
p=F
p=p
o=F
u=new p.iy(o.dR(21,11),[],!1,0,1,1,0,0,0,0,0,[0,0,0],0,!1,!1,0)
p=u
p.dW()
p=E
p=p
o=Float64Array
n=H
t=new p.v(new o(n.k(16)))
p=t
p.A()
p=F
t=new p.iA(v,u,null,null,null,null,null,null,null,null,null,null,!1,400,300,1,1,1,0,0,null,!1,"none",null,t,!1)
p=t
p.b=[]
p=t
o=F
p.ch=o.l(255,238,238,255)
p=t
o=F
p.go=new o.ht([0,0,0],v)
p=E
p=p
o=Float64Array
n=H
s=new p.v(new o(n.k(16)))
p=s
p.A()
p=F
s=new p.j1(t,v,0,"none",null,s,!1)
p=s
p.b=[]
p=s
p.T(0)
p=t
p.dx=s
p=t
o=F
p.dy=o.ja(v,t)
p=t
o=F
p.fr=o.iN(v,t)
p=t
o=F
p.fx=o.hf(v,t,0)
p=t
o=F
p.fy=o.iI(v,t,u,1)
p=t
p=p
o=t
p.B(o.dx)
p=t
p.ba()
p=v
u=p.d
p=v
s=p.e
p=E
p=p
o=Float64Array
n=H
r=new p.v(new o(n.k(16)))
p=r
p.A()
p=G
q=new p.k0(null,0,0,!1,0,40,15,v,0,!1,!1,!1,0,null,!1,!1,[r])
p=q
o=G
p.a=o.jQ(s,u)
p=q
p.saq(0,t)
p=q
p.hU()
p=q
p.ip()
p=q
p.ak(0)
return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$eZ,y,null)},"$0","f_",0,0,1]},1],["","",,F,{
"^":"",
bE:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.L)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.b3(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
jA:{
"^":"c;"},
aa:{
"^":"a7;W:e<,aa:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,a,b,c,d",
dD:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
aI:function(a,b,c,d,e,f,g){var z
switch(c){case C.t:if(this.dD(d,e)){this.r=!0
this.x=!0
this.Q=f
this.ch=g
this.id=!0
z=!0}else z=!1
break
case C.y:if(this.dD(d,e)){this.x=!0
this.y=f-this.Q
this.z=g-this.ch
this.Q=f
this.ch=g
z=!0}else{this.r=!1
this.x=!1
this.y=0
this.z=0
this.go=!0
z=!1}break
case C.q:if(this.r&&!0){this.go=!0
P.dB(new F.jB(this),null)}this.r=!1
this.x=!1
this.y=0
this.z=0
z=!1
break
default:this.r=!1
this.x=!1
this.y=0
this.z=0
z=!1}if(this.k1)return z
else return!1},
a0:function(a,b){var z,y
z=F.T(null)
y=this.cx
if(y!=null)b.at(a,y,this.cy,this.db,z)
if(this.r){z.a=this.fr
b.aQ(a,new F.n(0,0,this.e,this.f),z)}else if(this.x){z.a=this.fx
b.aQ(a,new F.n(0,0,this.e,this.f),z)}else{z.a=this.dy
b.aQ(a,new F.n(0,0,this.e,this.f),z)}},
dX:function(a){return this.fy.$1(a)}},
jB:{
"^":"d:1;a",
$0:function(){var z=this.a
z.dX(z.dx)}},
aw:{
"^":"c;a",
i:function(a){return C.a_.h(0,this.a)}},
jC:{
"^":"c;"},
a7:{
"^":"c;",
B:function(a){var z=0,y=new P.w(),x=1,w,v=this,u,t,s,r
var $async$B=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.a(new s.z(0,r.m,null),[null])
t=u
t.b1(null)
z=2
return P.b(u,$async$B,y)
case 2:t=v
t=t.b
t.push(a)
return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$B,y,null)},
bJ:function(a){var z=0,y=new P.w(),x=1,w,v=this,u,t,s,r
var $async$bJ=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.a(new s.z(0,r.m,null),[null])
t=u
t.b1(null)
z=2
return P.b(u,$async$bJ,y)
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
t.ag(u,a)
t=a
t.ec()
return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$bJ,y,null)},
an:function(){var z=0,y=new P.w(),x=1,w,v=this,u,t,s,r,q,p
var $async$an=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.a(new q.z(0,p.m,null),[null])
r=u
r.b1(null)
z=2
return P.b(u,$async$an,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.bJ(u[s])
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
case 5:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$an,y,null)},
dQ:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].dQ(a)},
cC:function(a,b){},
ea:function(a,b){var z,y,x
this.cp()
this.cC(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].ea(a,b)},
a0:function(a,b){},
cG:["eJ",function(a,b){var z,y,x,w,v,u
this.cp()
this.a0(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.L)(z),++w){v=z[w]
u=v.c
x.push(C.a.gb9(x).n(0,u))
b.bK()
v.cG(a,b)
if(0>=x.length)return H.h(x,-1)
x.pop()
b.bK()}}],
eb:["d1",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.cp()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.e0(v.c)
u=v.eb(a,b,c,d,e)
a.e_()
if(u)return!0}t=a.eo().co(0)
t.hL()
y=new E.o(new Float64Array(H.k(3)))
y.F(d,e,0)
s=t.n(0,y)
return this.aI(a,b,c,s.gj(s),s.gk(s),d,e)}],
aI:function(a,b,c,d,e,f,g){return!1},
iK:[function(a,b,c,d,e,f){},"$5","gbe",10,0,12],
iJ:[function(a,b,c,d,e,f){},"$5","gbd",10,0,12],
ec:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x)z[x].ec()
this.d=!1},
cp:function(){if(!this.d)this.d=!0}},
jE:{
"^":"c;",
M:function(a){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r,q
var $async$M=P.x(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.a4(a)?3:4
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
return P.b(q.bz(a),$async$M,y)
case 5:s.p(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$M,y,null)},
ap:function(a){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r,q
var $async$ap=P.x(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.b
s=t
z=s.a4(a)?3:4
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
return P.b(q.bb(a),$async$ap,y)
case 5:s.p(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$ap,y,null)}},
jD:{
"^":"c;"},
n:{
"^":"c;j:a*,k:b*,W:c<,aa:d<",
w:function(a,b){var z,y
if(b==null)return!1
if(b instanceof F.n){z=b.a
y=this.a
if(z==null?y==null:z===y){z=b.b
y=this.b
z=(z==null?y==null:z===y)&&b.c===this.c&&b.d===this.d}else z=!1}else z=!1
return z},
gK:function(a){return F.bE([J.R(this.a),J.R(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+H.f(this.a)+", y:"+H.f(this.b)+", w:"+H.f(this.c)+", h:"+H.f(this.d)}},
eg:{
"^":"c;j:a*,k:b*",
w:function(a,b){var z,y
if(b==null)return!1
if(b instanceof F.eg){z=b.a
y=this.a
if(z==null?y==null:z===y){z=b.b
y=this.b
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z},
gK:function(a){return F.bE([J.R(this.a),J.R(this.b)])},
i:function(a){return"x:"+H.f(this.a)+", y:"+H.f(this.b)}},
cC:{
"^":"c;W:a<,aa:b<",
w:function(a,b){if(b==null)return!1
return b instanceof F.cC&&b.a===this.a&&b.b===this.b},
gK:function(a){return F.bE([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
i:function(a){return"w:"+H.f(this.a)+", h:"+H.f(this.b)}},
jM:{
"^":"c;a",
i:function(a){return C.a1.h(0,this.a)}},
ef:{
"^":"c;a,b,c",
eX:function(a){if(this.a==null)this.a=F.l(255,255,255,255)},
static:{T:function(a){var z=new F.ef(a,C.f,1)
z.eX(a)
return z}}},
ee:{
"^":"c;a",
w:function(a,b){if(b==null)return!1
return b instanceof F.ee&&b.a===this.a},
gK:function(a){return F.bE([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
eW:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{l:function(a,b,c,d){var z=new F.ee(0)
z.eW(a,b,c,d)
return z}}},
cB:{
"^":"c;"},
jK:{
"^":"a7;W:e<,aa:f<",
eb:function(a,b,c,d,e){return this.d1(a,b,c,d,e)},
cC:function(a,b){var z,y,x,w
z=a.gW()
y=a.gi6(a)
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
y=new E.v(new Float64Array(H.k(16)))
y.A()
this.c=y
y.H(0,this.z,this.Q,0)
y=this.c
x=this.y
y.cY(0,x,x,1)},
cG:function(a,b){this.eJ(a,b)},
a0:function(a,b){var z,y,x
z=this.e
y=this.f
x=F.T(null)
x.a=this.ch
b.aQ(a,new F.n(0,0,z,y),x)}},
jL:{
"^":"a7;e,ax:f>,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,a,b,c,d",
a0:function(a,b){var z,y,x,w,v,u,t
z=F.T(null)
if(this.x)z.a=F.l(170,170,170,255)
else z.a=F.l(170,255,170,170)
y=this.f
x=-y/2
w=this.z
v=this.r
u=v/2
t=this.Q
b.dK(a,new F.n(x,x,y,y),z)
b.dK(a,new F.n(w-u,t-u,v,v),z)},
aI:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(!this.x){if(this.dJ(d,e,0,0)<this.f){this.db=!0
this.y=b
this.x=!0
this.z=d
this.Q=e
this.fr=f
this.fx=g}}else if(b===this.y)if(c===C.q||c===C.x){this.cy=!0
this.ch=this.z
this.cx=this.Q
this.x=!1
this.dx=0
this.dy=0
this.z=0
this.Q=0}else{this.z=d
this.Q=e
z=this.dJ(0,0,d,e)
y=this.f
x=y/2
if(z>x){w=this.z
v=w>0?w:-1*w
u=this.Q
t=v+(u>0?u:-1*u)
this.z=x*w/t
this.Q=y/2*u/t}this.dx=f-this.fr
this.dy=g-this.fx
this.fr=f
this.fx=g}return!1},
dJ:function(a,b,c,d){var z,y
z=a-c
H.an(z)
H.an(2)
z=Math.pow(z,2)
y=b-d
H.an(y)
H.an(2)
return Math.sqrt(H.an(z+Math.pow(y,2)))}},
aX:{
"^":"c;a",
i:function(a){return C.a2.h(0,this.a)}},
cD:{
"^":"c;",
gaq:function(a){return this.c$},
saq:function(a,b){this.c$=b},
hP:function(a){if(!this.e$){this.c$.dQ(this)
this.e$=!0}this.c$.ea(this,a)
this.hS()},
hQ:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.a.gb9(y).n(0,z))
b.bK()
this.c$.cG(a,b)
if(0>=y.length)return H.h(y,-1)
y.pop()
b.bK()},
au:function(a,b,c,d,e){a.e0(this.c$.c)
this.c$.d1(a,b,c,d,e)
a.e_()},
e0:function(a){var z=this.f$
z.push(C.a.gb9(z).n(0,a))},
e_:function(){var z=this.f$
if(0>=z.length)return H.h(z,-1)
z.pop()},
eo:function(){return C.a.gb9(this.f$)}},
h7:{
"^":"c;a,b,c",
eN:function(a){var z,y,x,w,v,u,t
z=P.cO(a,null)
for(y=z.gY(),y=y.gL(y),x=J.E(z),w=this.a;y.C();){v=y.gG()
u=x.h(z,v)
t=J.E(u)
w.p(0,H.iS(v,null,null),new F.h9(J.N(t.h(u,"u")),J.N(t.h(u,"v")),J.N(t.h(u,"w")),J.N(t.h(u,"h")),J.N(t.h(u,"vx")),J.N(t.h(u,"vy")),J.N(t.h(u,"vw")),J.N(t.h(u,"vh")),new F.cC(0,0),new F.n(0,0,0,0),new F.n(0,0,0,0)))}},
static:{h8:function(a){var z=new F.h7(P.a6(),32,F.T(null))
z.eN(a)
return z}}},
h9:{
"^":"c;a,b,W:c<,aa:d<,e,f,r,x,y,z,Q"},
e8:{
"^":"c;",
hu:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q
z=g.a
y=g.b
for(x=d.length,w=0;w<x;++w){v=this.h(0,d[w])
if(v==null)continue
u=v.gcu()
u.a=z
u.b=y
t=e*v.gN().c/v.gN().d
u.c=t
u.d=e
s=g.a
r=g.c
if(typeof s!=="number")return s.l()
q=u.a
if(typeof q!=="number")return q.l()
if(s+r<q+t){if(typeof y!=="number")return y.l()
y+=e+f
u.a=s
u.b=y
z=s}b.at(a,c,v.gN(),u,this.a)
t=u.c
s=v.gN().c
r=v.gN().d
if(typeof z!=="number")return z.l()
z+=t+f*s/r}}},
e9:{
"^":"c;"},
h4:{
"^":"e8;b,c,d,a",
gY:function(){return this.b.gY()},
gm:function(a){var z=this.b
return z.gm(z)},
h:function(a,b){return this.b.h(0,b)},
eM:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
for(z=F.h8(a).a,y=z.gY(),y=y.gL(y),x=this.c,w=J.X(x),v=this.d,u=J.X(v),t=this.b;y.C();){s=y.gG()
r=H.aF(s)
q=new F.h6(r,z.h(0,s),w.cP(x),u.cP(v),null)
t.p(0,s,q)
t.p(0,r,q)}},
static:{h5:function(a,b,c){var z=new F.h4(P.a6(),b,c,F.T(null))
z.eM(a,b,c)
return z}}},
h6:{
"^":"e9;b,c,d,e,a",
gcu:function(){var z,y
z=this.c
y=z.z
y.a=0
y.b=0
y.c=z.c*this.d
y.d=z.d*this.e
return y},
gN:function(){var z,y,x,w,v,u
z=this.c
y=this.d
x=this.e
w=z.Q
w.a=y*z.a
v=z.b
u=z.d*x
w.b=x-x*v-u
w.c=z.c*y
w.d=u
return w}},
cy:{
"^":"e8;b,c,d,a",
a6:function(a){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.L)(z),++x){w=z[x]
if(J.H(w.b,a))return w}return},
cH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=J.aB(H.m8(J.br(P.cO(a,null),"frames"),"$isp",[P.aV],"$asp")),y=this.c,x=this.d;z.C();){w=z.gG()
v=new F.j8(null,null,null,null,null,null,null,null)
u=J.E(w)
v.b=u.h(w,"filename")
v.x=v.dZ(u.h(w,"frame"))
v.c=u.h(w,"rotated")
v.d=u.h(w,"trimmed")
v.e=v.dZ(u.h(w,"spriteSourceSize"))
t=u.h(w,"sourceSize")
s=J.E(t)
r=s.h(t,"w")
q=s.h(t,"h")
v.f=new F.cC(J.N(r),J.N(q))
u=u.h(w,"pivot")
t=J.E(u)
p=t.h(u,"x")
o=t.h(u,"y")
v.r=new F.eg(J.N(p),J.N(o))
y.push(v)
x.p(0,v.b,v)}},
gY:function(){return this.d.gY()},
gm:function(a){var z=this.d
return z.gm(z)},
h:function(a,b){return this.d.h(0,b)}},
j8:{
"^":"e9;b,c,d,e,f,r,x,a",
gcu:function(){var z,y,x,w
z=this.c
y=this.e
if(z===!0){z=y.b
if(typeof z!=="number")return H.u(z)
x=y.d
w=y.a
if(typeof w!=="number")return H.u(w)
return new F.n(-1*z-x,w,x,y.c)}else return new F.n(y.a,y.b,y.c,y.d)},
gN:function(){var z,y
z=this.c
y=this.x
if(z===!0)return new F.n(y.a,y.b,y.d,y.c)
else return new F.n(y.a,y.b,y.c,y.d)},
dZ:function(a){var z,y,x,w,v
z=J.E(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.n(J.N(y),J.N(x),J.N(w),J.N(v))}}}],["","",,G,{
"^":"",
cE:function(a){var z=0,y=new P.w(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
var $async$cE=P.x(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.a(new p.a8(o.a(new n.z(0,m.m,null),[null])),[null])
q=C
q=q.A
t=q.dG(document,"img")
q=J
q.fW(t,a)
q=J
s=q.i(t)
q=s
r=q.gaH(t)
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
p=new p.I(0,o,n,m.J(new l.jZ(u,t)),!1)
o=H
q=q.a(p,[o.C(r,0)])
q.I()
q=s
s=q.gav(t)
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
p=new p.I(0,o,n,m.J(new l.k_(a,u)),!1)
o=H
q=q.a(p,[o.C(s,0)])
q.I()
q=u
x=q.a
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$cE,y,null)},
eh:function(a,b,c){var z,y
z=J.fn(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.f(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
jN:{
"^":"jA;a,b,c,d",
b_:function(a,b,c){var z=0,y=new P.w(),x=1,w,v=this,u,t,s,r,q
var $async$b_=P.x(function(d,e){if(d===1){w=e
z=x}while(true)switch(z){case 0:r=v
z=2
return P.b(r.ac(0),$async$b_,y)
case 2:r=v
u=r.a
r=v
q=u
r.c=q.createBufferSource()
r=J
t=r.fl(u)
r=v
r=r.c
r.connect(t,0,0)
r=t
r=r
q=u
r.connect(q.destination,0,0)
r=v
s=r.c
r=s
q=v
r.buffer=q.b
r=s
r.loop=b
r=t
r=r.gain
r.value=c
r=s
r=r
q=u
r.connect(q.destination,0,0)
r=v
u=r.c
if(!!u.start)u.start(0)
else u.noteOn(0)
return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$b_,y,null)},
ak:function(a){return this.b_(a,!1,1)},
bm:function(a,b){return this.b_(a,b,1)},
ac:function(a){var z=0,y=new P.w(),x=1,w,v=this,u,t
var $async$ac=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=v
u=t.c
z=u!=null?2:3
break
case 2:if(!!u.stop)u.stop(0)
else u.noteOff(0)
t=v
t.c=null
case 3:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$ac,y,null)}},
jP:{
"^":"c;a,b,c,q:d*",
eY:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.aU(b)
y=C.c.aU(a)
x=C.A.dG(document,"canvas")
J.fX(x,z)
J.fV(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.fQ(this.b,!0)},
static:{jQ:function(a,b){var z=new G.jP(null,null,null,null)
z.eY(a,b)
return z}}},
jR:{
"^":"jD;a,b",
ab:function(){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r,q,p,o
var $async$ab=P.x(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:r=u
z=3
return P.b(r.ib(0),$async$ab,y)
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
o=o.ae
z=5
return P.b(o.fC(t,1,1024),$async$ab,y)
case 5:p=p.fK(b)
o=u
z=4
return P.b(q.fk(p,o.a),$async$ab,y)
case 4:s=r.lV(b,"$isc9")
r=u
r.b=s
x=s
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$ab,y,null)},
ib:function(a){var z,y
z=H.a(new P.a8(H.a(new P.z(0,$.m,null),[null])),[null])
y=window.navigator.webkitPersistentStorage;(y&&C.L).ic(y,5242880,new G.jU(z),new G.jV(z))
return z.a},
aY:function(a,b,c){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i
var $async$aY=P.x(function(d,e){if(d===1){v=e
z=w}while(true)switch(z){case 0:t={}
n=t
n.a=b
n=J
n=n.q(b)
z=!n.$iskc?3:4
break
case 3:n=t
m=Uint8Array
l=H
n.a=new m(l.b0(b))
case 4:n=H
n=n
m=P
m=m
l=H
l=l
k=P
k=k
j=$
s=n.a(new m.a8(l.a(new k.z(0,j.m,null),[null])),[null])
n=u
z=5
return P.b(n.ab(),$async$aY,y)
case 5:n=u
r=n.b
n=r
if(n){z=7
break}else e=n
z=8
break
case 7:n=C
e=n.u
case 8:n=e
z=6
return P.b(n.dH(r),$async$aY,y)
case 6:q=e
n=J
r=n.fJ(q)
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
m=new m.I(0,l,k,j.J(new i.jW(t,s,q)),!1)
l=H
n=n.a(m,[l.C(r,0)])
n.I()
n=H
n=n
m=W
r=n.a(new m.t(q,"error",!1),[null])
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
m=new m.I(0,l,k,j.J(new i.jX(s,q)),!1)
l=H
n=n.a(m,[l.C(r,0)])
n.I()
n=u
z=9
return P.b(n.aJ(),$async$aY,y)
case 9:p=e
n=J
z=n.aN(p,c)?10:12
break
case 10:z=typeof p!=="number"?13:14
break
case 13:n=H
x=n.u(p)
z=1
break
case 14:n=Uint8Array
m=H
m=m
l=P
o=new n(m.b0(l.iu(c-p,0,null)))
n=q
n.seek(p)
n=q
n=n
m=W
m=m
l=o
k=t
m=m.db([l,k.a],null,null)
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
m=m.db([l.a],null,null)
m=m
l=t
n.write(m.slice(0,l.a.length))
case 11:n=s
x=n.a
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$aY,y,null)},
bf:function(a,b){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k
var $async$bf=P.x(function(c,d){if(c===1){v=d
z=w}while(true)switch(z){case 0:p=H
p=p
o=P
o=o
n=H
n=n
m=P
m=m
l=$
t=p.a(new o.a8(n.a(new m.z(0,l.m,null),[null])),[null])
p=u
z=3
return P.b(p.ab(),$async$bf,y)
case 3:s=new FileReader()
p=u
r=p.b
p=r
if(p){z=5
break}else d=p
z=6
break
case 5:p=C
d=p.u
case 6:p=d
z=4
return P.b(p.dL(r),$async$bf,y)
case 4:q=d
p=H
p=p
o=W
r=p.a(new o.t(s,"load",!1),[null])
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
o=new o.I(0,n,m,l.J(new k.jS(t,s)),!1)
n=H
p=p.a(o,[n.C(r,0)])
p.I()
p=H
p=p
o=W
r=p.a(new o.t(s,"error",!1),[null])
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
o=new o.I(0,n,m,l.J(new k.jT(t)),!1)
n=H
p=p.a(o,[n.C(r,0)])
p.I()
z=typeof b!=="number"?7:8
break
case 7:p=H
x=p.u(b)
z=1
break
case 8:p=s
p=p
o=J
p.readAsArrayBuffer(o.fY(q,a,a+b))
p=t
x=p.a
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$bf,y,null)},
aJ:function(){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r
var $async$aJ=P.x(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:s=u
z=3
return P.b(s.ab(),$async$aJ,y)
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
b=r.u
case 6:r=b
z=4
return P.b(r.dL(t),$async$aJ,y)
case 4:x=s.fL(b)
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$aJ,y,null)},
aX:function(a,b){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r
var $async$aX=P.x(function(c,d){if(c===1){v=d
z=w}while(true)switch(z){case 0:s=u
z=3
return P.b(s.ab(),$async$aX,y)
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
d=r.u
case 6:r=d
z=4
return P.b(r.dH(t),$async$aX,y)
case 4:s.d6(d,b)
x=b
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$aX,y,null)}},
jU:{
"^":"d:0;a",
$1:function(a){this.a.S(0,a)}},
jV:{
"^":"d:0;a",
$1:function(a){this.a.X(a)}},
jW:{
"^":"d:6;a,b,c",
$1:function(a){this.b.S(0,this.a.a.length)
this.c.abort()}},
jX:{
"^":"d:0;a,b",
$1:function(a){this.a.X(P.a6())
this.b.abort()}},
jS:{
"^":"d:0;a,b",
$1:function(a){this.a.S(0,P.bd(C.M.gcL(this.b),!0,null))}},
jT:{
"^":"d:0;a",
$1:function(a){this.a.X(a)}},
jF:{
"^":"jE;c,t:d*,q:e*,f,r,a,b",
bz:function(a){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r
var $async$bz=P.x(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:t=G
t=t
s=G
s=s
r=u
z=3
return P.b(s.cE(r.c+a),$async$bz,y)
case 3:x=new t.jY(c,null,null)
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$bz,y,null)},
aR:function(a){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k
var $async$aR=P.x(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:p=P
p.M("--A--")
p=H
p=p
o=P
o=o
n=H
n=n
m=P
m=m
l=$
t=p.a(new o.a8(n.a(new m.z(0,l.m,null),[null])),[null])
s=new (window.AudioContext||window.webkitAudioContext)()
r=new XMLHttpRequest()
p=C
p=p.B
p=p
o=r
n=u
p.dY(o,"GET",n.c+a)
p=r
p.responseType="arraybuffer"
p=H
p=p
o=W
q=p.a(new o.t(r,"load",!1),[null])
p=H
p=p
o=W
o=o
n=q
n=n.a
m=q
m=m.b
l=W
l=l
k=G
o=new o.I(0,n,m,l.J(new k.jG(a,t,s,r)),!1)
n=H
p=p.a(o,[n.C(q,0)])
p.I()
p=H
p=p
o=W
q=p.a(new o.t(r,"error",!1),[null])
p=H
p=p
o=W
o=o
n=q
n=n.a
m=q
m=m.b
l=W
l=l
k=G
o=new o.I(0,n,m,l.J(new k.jH(t)),!1)
n=H
p=p.a(o,[n.C(q,0)])
p.I()
p=r
p.send()
p=P
p.M("--D--")
p=t
x=p.a
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$aR,y,null)},
bb:function(a){var z=0,y=new P.w(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l
var $async$bb=P.x(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
t=q.a(new p.a8(o.a(new n.z(0,m.m,null),[null])),[null])
s=new XMLHttpRequest()
q=C
q=q.B
q=q
p=s
o=u
q.dY(p,"GET",o.c+a)
q=s
q.responseType="arraybuffer"
q=H
q=q
p=W
r=q.a(new p.t(s,"load",!1),[null])
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
p=new p.I(0,o,n,m.J(new l.jI(t,s)),!1)
o=H
q=q.a(p,[o.C(r,0)])
q.I()
q=H
q=q
p=W
r=q.a(new p.t(s,"error",!1),[null])
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
p=new p.I(0,o,n,m.J(new l.jJ(t)),!1)
o=H
q=q.a(p,[o.C(r,0)])
q.I()
q=s
q.send()
q=t
x=q.a
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$bb,y,null)},
by:function(a){var z=0,y=new P.w(),x,w=2,v,u
var $async$by=P.x(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
x=new u.jR(a,null)
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$by,y,null)},
bO:function(){var z=0,y=new P.w(),x,w=2,v,u,t
var $async$bO=P.x(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=window
u=t.navigator
u.toString
x=u.language||u.userLanguage
z=1
break
case 1:return P.b(x,0,y,null)
case 2:return P.b(v,1,y)}})
return P.b(null,$async$bO,y,null)}},
jG:{
"^":"d:13;a,b,c,d",
$1:function(a){var z=0,y=new P.w(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l
var $async$$1=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:o=P
o.M("--B--")
x=3
o=u
r=o.c
o=J
o=o
n=r
m=W
m=m
l=u
l=l.d
z=6
return P.b(o.fo(n,m.eI(l.response)),$async$$1,y)
case 6:t=c
o=u
o=o.b
o=o
n=G
o.S(0,new n.jN(r,t,null,0.5))
x=1
z=5
break
case 3:x=2
p=w
o=H
r=o.G(p)
s=r
o=P
o=o
n=u
n="--D-"+n.a+"- "
m=H
o.M(n+m.f(s))
o=u
o=o.b
o.X(s)
z=5
break
case 2:z=1
break
case 5:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$$1,y,null)}},
jH:{
"^":"d:6;a",
$1:function(a){P.M("--C--")
this.a.X(a)}},
jI:{
"^":"d:13;a,b",
$1:function(a){var z=0,y=new P.w(),x=1,w,v=this,u,t,s,r,q
var $async$$1=P.x(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:u=v
u=u.a
u=u
t=C
t=t.z
t=t
s=J
s=s
r=W
r=r
q=v
q=q.b
u.S(0,t.dI(s.f8(r.eI(q.response)),!0))
return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$$1,y,null)}},
jJ:{
"^":"d:6;a",
$1:function(a){this.a.X(a)}},
jY:{
"^":"cB;a,b,c",
gW:function(){return J.fN(this.a)},
gaa:function(){return J.fv(this.a)},
eq:function(a){var z=this.c
if(z!=null&&(z==null?a!=null:z!==a))this.hl()
if(this.b==null){this.c=a
z=J.i(a).h7(a)
this.b=z
a.bindTexture(3553,z)
C.a4.il(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b},
hl:function(){var z,y,x
try{y=this.b
if(y!=null&&this.c!=null){J.fp(this.c,y)
this.b=null
this.c=null}}catch(x){y=H.G(x)
z=y
P.M("##ERROR # "+H.f(z))}}},
jO:{
"^":"jC;c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,a,b",
shX:function(a){var z,y,x
this.c=a
z=this.d
y=0
while(!0){x=this.c
if(typeof x!=="number")return x.l()
if(!(y<x+1))break
z.push(Math.cos(6.283185307179586*(y/x)))
x=this.c
if(typeof x!=="number")return H.u(x)
z.push(Math.sin(6.283185307179586*(y/x)));++y}},
ab:function(){var z,y,x,w,v,u
P.M("#[A] MAX_VERTEX_TEXTURE_IMAGE_UNITS # "+H.f(J.c3(this.e,35660)))
P.M("#[B] ALIASED_POINT_SIZE_RANGE       # "+H.f(J.c3(this.e,33901)))
P.M("#[B] ALIASED_POINT_SIZE_RANGE       # "+H.f(J.c3(this.e,33901)))
z=C.a.dS(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.dS(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.e
w=G.eh(x,35633,z)
v=G.eh(x,35632,y)
u=J.fm(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.r=u},
a3:function(a){this.x=1
this.cx=-0.5
J.d1(this.e,2960)
J.fq(this.e,515)
J.fd(this.e,0,0,0,1)
J.fe(this.e,1)
J.ff(this.e,0)
J.d1(this.e,3042)
J.f9(this.e,32774)
J.fa(this.e,770,771,770,32772)
J.fc(this.e,17664)
C.a.sm(this.y,0)
C.a.sm(this.z,0)
C.a.sm(this.Q,0)
this.ch=null},
dN:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.y
if(z.length!==0){y=this.z
F.l(170,255,170,170)
J.d7(this.e,this.r)
x=J.bt(this.e,this.r,"a_tex")
w=J.c2(this.e)
J.c0(this.e,34962,w)
v=this.Q
J.fb(this.e,34962,new Float32Array(H.b0(v)),35044)
J.bs(this.e,x)
J.bv(this.e,x,2,5126,!1,0,0)
u=this.ch
if(u!=null){t=u.eq(this.e)
J.d0(this.e,3553,t)
J.bu(this.e,3553,10242,33071)
J.bu(this.e,3553,10243,33071)
J.bu(this.e,3553,10241,9728)
J.bu(this.e,3553,10240,9728)}u=this.e
s=J.c2(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.b0(z)),35044)
u.bindBuffer(34962,null)
J.c0(this.e,34962,s)
u=this.e
s=J.c2(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.b0(y)),35044)
u.bindBuffer(34963,null)
J.c0(this.e,34963,s)
u=this.e
u.uniformMatrix4fv(J.fR(u,this.r,"u_mat"),!1,new Float32Array(H.b0(this.cy.a)))
r=J.bt(this.e,this.r,"color")
q=J.bt(this.e,this.r,"vp")
p=J.bt(this.e,this.r,"useTex")
J.bv(this.e,q,3,5126,!1,32,0)
J.bv(this.e,r,4,5126,!1,32,12)
J.bv(this.e,p,1,5126,!1,32,28)
J.bs(this.e,q)
J.bs(this.e,r)
J.bs(this.e,p)
J.fs(this.e,4,y.length,5123,0)
if(x!==0){J.fr(this.e,x)
J.d0(this.e,3553,null)}J.d7(this.e,null)
C.a.sm(z,0)
C.a.sm(y,0)
C.a.sm(v,0)
this.ch=null}},
hr:function(a,b,c,d){if(c.b===C.f)this.hp(a,b,c)
else this.ht(a,b,c)},
dK:function(a,b,c){return this.hr(a,b,c,null)},
hp:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=b.a
y=b.c/2
if(typeof z!=="number")return z.l()
x=z+y
z=b.b
w=b.d/2
if(typeof z!=="number")return z.l()
v=z+w
u=this.am()
t=new E.o(new Float64Array(H.k(3)))
t.F(0,0,0)
z=c.a.a
s=(z>>>16&255)/255
r=(z>>>8&255)/255
q=(z>>>0&255)/255
p=(z>>>24&255)/255
z=this.y
o=this.Q
n=this.d
m=this.z
l=0
while(!0){k=this.c
if(typeof k!=="number")return H.u(k)
if(!(l<k))break
j=z.length/8|0
t.sj(0,x)
t.sk(0,v)
t.sah(0,this.cx)
t=u.n(0,t)
C.a.D(z,[t.gj(t),t.gk(t),this.cx])
C.a.D(z,[s,r,q,p])
C.a.D(z,[-1])
C.a.D(o,[0,0])
k=l*2
if(k>=n.length)return H.h(n,k)
t.sj(0,x+n[k]*y)
i=k+1
if(i>=n.length)return H.h(n,i)
t.sk(0,v+n[i]*w)
t.sah(0,this.cx)
t=u.n(0,t)
C.a.D(z,[t.gj(t),t.gk(t),this.cx])
C.a.D(z,[s,r,q,p])
C.a.D(z,[-1])
C.a.D(o,[0,0])
i=k+2
if(i>=n.length)return H.h(n,i)
t.sj(0,x+n[i]*y)
k+=3
if(k>=n.length)return H.h(n,k)
t.sk(0,v+n[k]*w)
t.sah(0,this.cx)
t=u.n(0,t)
C.a.D(z,[t.gj(t),t.gk(t),this.cx])
C.a.D(z,[s,r,q,p])
C.a.D(z,[-1])
C.a.D(o,[0,0])
C.a.D(m,[j,j+1,j+2])
this.cx+=0.0001;++l}},
ht:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b.a
y=b.c
if(typeof z!=="number")return z.l()
x=z+y/2
z=b.b
w=b.d
if(typeof z!=="number")return z.l()
v=z+w/2
z=c.c
u=(y+z)/2
t=(w+z)/2
s=(y-z)/2
r=(w-z)/2
q=this.am()
p=new E.o(new Float64Array(H.k(3)))
p.F(0,0,0)
o=new E.o(new Float64Array(H.k(3)))
o.F(0,0,0)
n=new E.o(new Float64Array(H.k(3)))
n.F(0,0,0)
m=new E.o(new Float64Array(H.k(3)))
m.F(0,0,0)
z=c.a.a
l=(z>>>16&255)/255
k=(z>>>8&255)/255
j=(z>>>0&255)/255
i=(z>>>24&255)/255
z=this.d
h=0
while(!0){y=this.c
if(typeof y!=="number")return H.u(y)
if(!(h<y))break
y=h*2
if(y>=z.length)return H.h(z,y)
p.sj(0,x+z[y]*s)
w=y+1
if(w>=z.length)return H.h(z,w)
p.sk(0,v+z[w]*r)
p.sah(0,this.cx)
p=q.n(0,p)
if(y>=z.length)return H.h(z,y)
o.sj(0,x+z[y]*u)
if(w>=z.length)return H.h(z,w)
o.sk(0,v+z[w]*t)
o.sah(0,this.cx)
o=q.n(0,o)
w=y+2
if(w>=z.length)return H.h(z,w)
n.sj(0,x+z[w]*u)
y+=3
if(y>=z.length)return H.h(z,y)
n.sk(0,v+z[y]*t)
n.sah(0,this.cx)
n=q.n(0,n)
if(w>=z.length)return H.h(z,w)
m.sj(0,x+z[w]*s)
if(y>=z.length)return H.h(z,y)
m.sk(0,v+z[y]*r)
m.sah(0,this.cx)
m=q.n(0,m)
this.O(a,p,o,m,n,l,k,j,i)
this.cx+=0.0001;++h}},
hs:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
if(c.b===C.f){z=this.am()
y=b.a
x=b.b
w=b.c
if(typeof y!=="number")return y.l()
v=y+w
w=b.d
if(typeof x!=="number")return x.l()
u=x+w
w=new E.o(new Float64Array(H.k(3)))
w.F(y,x,0)
t=z.n(0,w)
w=new E.o(new Float64Array(H.k(3)))
w.F(y,u,0)
s=z.n(0,w)
w=new E.o(new Float64Array(H.k(3)))
w.F(v,x,0)
r=z.n(0,w)
w=new E.o(new Float64Array(H.k(3)))
w.F(v,u,0)
q=z.n(0,w)
w=c.a.a
this.O(a,t,s,r,q,(w>>>16&255)/255,(w>>>8&255)/255,(w>>>0&255)/255,(w>>>24&255)/255)}else{z=this.am()
w=b.a
p=c.c/2
if(typeof w!=="number")return w.l()
y=w+p
o=b.b
if(typeof o!=="number")return o.l()
x=o+p
v=w+b.c-p
u=o+b.d-p
p=new E.o(new Float64Array(H.k(3)))
p.F(y,x,0)
t=z.n(0,p)
p=c.c
o=new E.o(new Float64Array(H.k(3)))
o.F(y-p,x-p,0)
n=z.n(0,o)
o=new E.o(new Float64Array(H.k(3)))
o.F(y,u,0)
s=z.n(0,o)
o=c.c
p=new E.o(new Float64Array(H.k(3)))
p.F(y-o,u+o,0)
m=z.n(0,p)
p=new E.o(new Float64Array(H.k(3)))
p.F(v,x,0)
r=z.n(0,p)
p=c.c
o=new E.o(new Float64Array(H.k(3)))
o.F(v+p,x-p,0)
l=z.n(0,o)
o=new E.o(new Float64Array(H.k(3)))
o.F(v,u,0)
q=z.n(0,o)
o=c.c
p=new E.o(new Float64Array(H.k(3)))
p.F(v+o,u+o,0)
k=z.n(0,p)
p=c.a.a
j=(p>>>16&255)/255
i=(p>>>8&255)/255
h=(p>>>0&255)/255
g=(p>>>24&255)/255
this.O(a,n,m,t,s,j,i,h,g)
this.O(a,m,k,s,q,j,i,h,g)
this.O(a,k,l,q,r,j,i,h,g)
this.O(a,l,n,r,t,j,i,h,g)}},
aQ:function(a,b,c){return this.hs(a,b,c,null)},
O:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.y
y=z.length/8|0
C.a.D(z,[b.gj(b),b.gk(b),this.cx,f,g,h,i,-1,c.gj(c),c.gk(c),this.cx,f,g,h,i,-1,d.gj(d),d.gk(d),this.cx,f,g,h,i,-1,e.gj(e),e.gk(e),this.cx,f,g,h,i,-1])
C.a.D(this.Q,[0,0,0,0,0,0,0,0])
this.cx+=0.0001
z=y+1
x=y+2
C.a.D(this.z,[y,z,x,z,y+3,x])},
hq:function(a,b,c,d,e,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.ch
if(z!=null&&!J.H(z,b))this.dN(0)
this.ch=b
z=c.a
y=b.gW()
if(typeof z!=="number")return z.ej()
if(typeof y!=="number")return H.u(y)
x=z/y
y=c.b
z=this.ch.gaa()
if(typeof y!=="number")return y.ej()
if(typeof z!=="number")return H.u(z)
w=y/z
z=c.a
y=c.c
if(typeof z!=="number")return z.l()
v=this.ch.gW()
if(typeof v!=="number")return H.u(v)
u=(z+y)/v
v=c.b
y=c.d
if(typeof v!=="number")return v.l()
z=this.ch.gaa()
if(typeof z!=="number")return H.u(z)
t=(v+y)/z
z=this.Q
switch(a1){case C.G:C.a.D(z,[x,w,x,t,u,w,u,t])
break
case C.a5:C.a.D(z,[x,t,u,t,x,w,u,w])
break
case C.a6:C.a.D(z,[u,t,u,w,x,t,x,w])
break
case C.a7:C.a.D(z,[u,w,x,w,u,t,x,t])
break
case C.a8:C.a.D(z,[u,w,u,t,x,w,x,t])
break
case C.a9:C.a.D(z,[x,w,u,w,x,t,u,t])
break
case C.aa:C.a.D(z,[x,t,x,w,u,t,u,w])
break
case C.ab:C.a.D(z,[u,t,x,t,u,w,x,w])
break
default:C.a.D(z,[x,w,x,t,u,w,u,t])}s=this.am()
r=d.a
q=d.b
z=d.c
if(typeof r!=="number")return r.l()
p=r+z
z=d.d
if(typeof q!=="number")return q.l()
o=q+z
z=new E.o(new Float64Array(H.k(3)))
z.F(r,q,0)
n=s.n(0,z)
z=new E.o(new Float64Array(H.k(3)))
z.F(r,o,0)
m=s.n(0,z)
z=new E.o(new Float64Array(H.k(3)))
z.F(p,q,0)
l=s.n(0,z)
z=new E.o(new Float64Array(H.k(3)))
z.F(p,o,0)
k=s.n(0,z)
z=this.y
j=z.length/8|0
y=e.a.a
i=(y>>>16&255)/255
h=(y>>>8&255)/255
g=(y>>>0&255)/255
f=(y>>>24&255)/255
C.a.D(z,[n.gj(n),n.gk(n),this.cx,i,h,g,f,1,m.gj(m),m.gk(m),this.cx,i,h,g,f,1,l.gj(l),l.gk(l),this.cx,i,h,g,f,1,k.gj(k),k.gk(k),this.cx,i,h,g,f,1])
this.cx+=0.0001
z=j+1
y=j+2
C.a.D(this.z,[j,z,y,z,j+3,y])},
at:function(a,b,c,d,e){return this.hq(a,b,c,d,e,null,C.G)},
bK:function(){},
am:function(){var z,y
this.db.A()
z=this.db.H(0,-1,1,0)
this.db=z
y=this.f
y=z.cY(0,2/y.c,-2/y.d,1)
this.db=y
y=y.n(0,C.a.gb9(this.a))
this.db=y
return y}},
k0:{
"^":"iE;a,b,c,d,e,f,r,x,y,z,Q,a$,b$,c$,d$,e$,f$",
gj:function(a){return 0},
gk:function(a){return 0},
gW:function(){return this.a.c},
gaa:function(){return this.a.d},
gi6:function(a){return 0},
hS:function(){this.z=!0},
ak:function(a){if(!this.d){this.d=!0
this.bo()}},
bo:function(){var z=0,y=new P.w(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$bo=P.x(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:u=Date.now()
f=v
t=f.a
f=E
f=f
e=Float64Array
d=H
s=new f.v(new e(d.k(16)))
f=s
f.A()
f=E
f=f
e=Float64Array
d=H
r=new f.v(new e(d.k(16)))
f=r
f.A()
f=E
f=f
e=Float64Array
d=H
q=new f.v(new e(d.k(16)))
f=q
f.A()
f=G
p=new f.jO(null,[],null,null,null,1,[],[],[],null,0,s,r,[q],[])
f=p
e=t
f.e=e.a
f=p
f.f=t
f=p
f.shX(16)
f=p
f.ab()
f=p
f.a3(0)
f=v
o=f.r
f=v
t=f.f,n=o,m=n,l=0,k=0,j=0
case 2:f=v
if(!f.d){z=4
break}i=o-(m-n)
if(i<5)i=5
else ;f=P
f=f
e=P
z=5
return P.b(f.hN(new e.ac(1000*i),null,null),$async$bo,y)
case 5:f=v
f.y=0
h=Date.now()
f=v
f.b=h
m=h-u
f=v
f=f
e=C
e=e.c
f.hP(e.aU(u+m))
l+=m
k+=m;++j
f=v
f.z=!0
z=k>t?6:7
break
case 6:f=P
f=f
e=G
f.dB(new e.k1(v,p),null)
f=v
f.z=!1
k=0
case 7:z=j>60?8:9
break
case 8:f=C
f=f.c
f=f
e=C
e=e.c
g="###fps  "+f.b0(1000,e.b0(l,j))
f=H
f.bZ(g)
l=0
j=0
case 9:case 3:n=i,u=h
z=2
break
case 4:return P.b(null,0,y,null)
case 1:return P.b(w,1,y)}})
return P.b(null,$async$bo,y,null)},
ip:function(){var z,y,x,w
z=P.a6()
y=new G.ka(this,z)
x=new G.k9(this,z)
w=J.fD(this.a.b)
H.a(new W.I(0,w.a,w.b,W.J(x),!1),[H.C(w,0)]).I()
J.fE(this.a.b).dT(x)
x=J.fF(this.a.b)
H.a(new W.I(0,x.a,x.b,W.J(y),!1),[H.C(x,0)]).I()
x=J.fG(this.a.b)
H.a(new W.I(0,x.a,x.b,W.J(y),!1),[H.C(x,0)]).I()
x=J.fH(this.a.b)
H.a(new W.I(0,x.a,x.b,W.J(y),!1),[H.C(x,0)]).I()
J.fI(this.a.b).dT(y)},
hU:function(){var z,y
z={}
z.a=!1
y=J.fw(this.a.b)
H.a(new W.I(0,y.a,y.b,W.J(new G.k2(z,this)),!1),[H.C(y,0)]).I()
y=J.fC(this.a.b)
H.a(new W.I(0,y.a,y.b,W.J(new G.k3(z,this)),!1),[H.C(y,0)]).I()
y=J.fx(this.a.b)
H.a(new W.I(0,y.a,y.b,W.J(new G.k4(z,this)),!1),[H.C(y,0)]).I()
y=J.fy(this.a.b)
H.a(new W.I(0,y.a,y.b,W.J(new G.k5(z,this)),!1),[H.C(y,0)]).I()
y=J.fz(this.a.b)
H.a(new W.I(0,y.a,y.b,W.J(new G.k6(z,this)),!1),[H.C(y,0)]).I()
y=J.fA(this.a.b)
H.a(new W.I(0,y.a,y.b,W.J(new G.k7(z,this)),!1),[H.C(y,0)]).I()
y=J.fB(this.a.b)
H.a(new W.I(0,y.a,y.b,W.J(new G.k8(z,this)),!1),[H.C(y,0)]).I()}},
iE:{
"^":"c+cD;"},
k1:{
"^":"d:1;a,b",
$0:function(){var z,y
z=this.b
z.a3(0)
y=this.a
y.hQ(y,z)
z.dN(0)}},
ka:{
"^":"d:14;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.d2(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.L)(y),++v){u=y[v]
t=C.ac.gi7(u).a
s=J.d3(z.a.b)
if(typeof t!=="number")return t.u()
r=t-s
s=H.a(new P.a1(C.b.U(u.pageX),C.b.U(u.pageY)),[null]).b
t=J.d4(z.a.b)
if(typeof s!=="number")return s.u()
q=s-t
if(w.a4(u.identifier)){if(++z.y<3){t=u.identifier
if(typeof t!=="number")return t.l()
z.au(z,t+1,C.y,r,q)}}else{w.p(0,u.identifier,u)
t=u.identifier
if(typeof t!=="number")return t.l()
z.au(z,t+1,C.t,r,q)}}}},
k9:{
"^":"d:14;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.d2(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.L)(y),++v){u=y[v]
if(w.a4(u.identifier)){t=H.a(new P.a1(C.b.U(u.pageX),C.b.U(u.pageY)),[null]).a
s=J.d3(z.a.b)
if(typeof t!=="number")return t.u()
r=H.a(new P.a1(C.b.U(u.pageX),C.b.U(u.pageY)),[null]).b
q=J.d4(z.a.b)
if(typeof r!=="number")return r.u()
w.ag(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.l()
z.au(z,p+1,C.q,t-s,r-q)}}}},
k2:{
"^":"d:4;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.ga7(a)
x=x.gj(x)
x.toString
y=y.ga7(a)
y=y.gk(y)
y.toString
z.au(z,0,C.t,x,y)}}},
k3:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.ga7(a)
w=w.gj(w)
w.toString
x=x.ga7(a)
x=x.gk(x)
x.toString
z.au(z,0,C.q,w,x)
y.a=!1}}}},
k4:{
"^":"d:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
k5:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.ga7(a)
w=w.gj(w)
w.toString
x=x.ga7(a)
x=x.gk(x)
x.toString
z.au(z,0,C.x,w,x)
y.a=!1}}}},
k6:{
"^":"d:4;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.ga7(a)
x=x.gj(x)
x.toString
y=y.ga7(a)
y=y.gk(y)
y.toString
z.au(z,0,C.y,x,y)}}},
k7:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.ga7(a)
w=w.gj(w)
w.toString
x=x.ga7(a)
x=x.gk(x)
x.toString
z.au(z,0,C.x,w,x)
y.a=!1}}}},
k8:{
"^":"d:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
jZ:{
"^":"d:0;a,b",
$1:function(a){this.a.S(0,this.b)}},
k_:{
"^":"d:0;a,b",
$1:function(a){this.b.X("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
v:{
"^":"c;a",
aZ:function(a){var z,y
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
i:function(a){return"[0] "+this.bl(0).i(0)+"\n[1] "+this.bl(1).i(0)+"\n[2] "+this.bl(2).i(0)+"\n[3] "+this.bl(3).i(0)+"\n"},
ghj:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
z[b]=c},
bl:function(a){var z,y,x
z=new Float64Array(H.k(4))
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
return new E.am(z)},
co:function(a){var z=new E.v(new Float64Array(H.k(16)))
z.aZ(this)
return z},
n:function(a,b){var z,y,x
if(typeof b==="number"){z=new Float64Array(H.k(16))
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
return new E.v(z)}z=J.q(b)
if(!!z.$isam){z=new Float64Array(H.k(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.am(z)}if(!!z.$iso){z=new Float64Array(H.k(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.o(z)}if(4===b.ghj()){z=new Float64Array(H.k(16))
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
return new E.v(z)}throw H.e(P.aQ(b))},
l:function(a,b){var z,y
z=new Float64Array(H.k(16))
y=this.a
z[0]=C.b.l(y[0],b.gv().h(0,0))
z[1]=C.b.l(y[1],b.gv().h(0,1))
z[2]=C.b.l(y[2],b.gv().h(0,2))
z[3]=C.b.l(y[3],b.gv().h(0,3))
z[4]=C.b.l(y[4],b.gv().h(0,4))
z[5]=C.b.l(y[5],b.gv().h(0,5))
z[6]=C.b.l(y[6],b.gv().h(0,6))
z[7]=C.b.l(y[7],b.gv().h(0,7))
z[8]=C.b.l(y[8],b.gv().h(0,8))
z[9]=C.b.l(y[9],b.gv().h(0,9))
z[10]=C.b.l(y[10],b.gv().h(0,10))
z[11]=C.b.l(y[11],b.gv().h(0,11))
z[12]=C.b.l(y[12],b.gv().h(0,12))
z[13]=C.b.l(y[13],b.gv().h(0,13))
z[14]=C.b.l(y[14],b.gv().h(0,14))
z[15]=C.b.l(y[15],b.gv().h(0,15))
return new E.v(z)},
u:function(a,b){var z,y
z=new Float64Array(H.k(16))
y=this.a
z[0]=C.b.u(y[0],b.gv().h(0,0))
z[1]=C.b.u(y[1],b.gv().h(0,1))
z[2]=C.b.u(y[2],b.gv().h(0,2))
z[3]=C.b.u(y[3],b.gv().h(0,3))
z[4]=C.b.u(y[4],b.gv().h(0,4))
z[5]=C.b.u(y[5],b.gv().h(0,5))
z[6]=C.b.u(y[6],b.gv().h(0,6))
z[7]=C.b.u(y[7],b.gv().h(0,7))
z[8]=C.b.u(y[8],b.gv().h(0,8))
z[9]=C.b.u(y[9],b.gv().h(0,9))
z[10]=C.b.u(y[10],b.gv().h(0,10))
z[11]=C.b.u(y[11],b.gv().h(0,11))
z[12]=C.b.u(y[12],b.gv().h(0,12))
z[13]=C.b.u(y[13],b.gv().h(0,13))
z[14]=C.b.u(y[14],b.gv().h(0,14))
z[15]=C.b.u(y[15],b.gv().h(0,15))
return new E.v(z)},
H:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.q(b)
y=!!z.$isam
x=y?b.gW():1
if(!!z.$iso||y){w=z.gj(b)
v=z.gk(b)
u=z.gah(b)}else{u=d
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
cY:function(a,b,c,d){var z,y,x,w,v,u
z=J.q(b)
y=!!z.$isam
x=y?b.gW():1
if(!!z.$iso||y){w=z.gj(b)
v=z.gk(b)
u=z.gah(b)}else{u=d
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
A:function(){var z=this.a
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
hL:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
o:{
"^":"c;a",
F:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aZ:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.f(z[0])+","+H.f(z[1])+","+H.f(z[2])+"]"},
u:function(a,b){var z,y,x,w
z=this.a
y=C.b.u(z[0],b.gv().h(0,0))
x=C.b.u(z[1],b.gv().h(0,1))
z=C.b.u(z[2],b.gv().h(0,2))
w=new E.o(new Float64Array(H.k(3)))
w.F(y,x,z)
return w},
l:function(a,b){var z,y,x,w
z=this.a
y=C.b.l(z[0],b.gv().h(0,0))
x=C.b.l(z[1],b.gv().h(0,1))
z=C.b.l(z[2],b.gv().h(0,2))
w=new E.o(new Float64Array(H.k(3)))
w.F(y,x,z)
return w},
n:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.u(b)
x=z[1]
z=z[2]
w=new E.o(new Float64Array(H.k(3)))
w.F(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
z[b]=c},
gm:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.an(y*y+x*x+z*z))},
co:function(a){var z=new E.o(new Float64Array(H.k(3)))
z.aZ(this)
return z},
sj:function(a,b){this.a[0]=b
return b},
sk:function(a,b){this.a[1]=b
return b},
sah:function(a,b){this.a[2]=b
return b},
gj:function(a){return this.a[0]},
gk:function(a){return this.a[1]}},
am:{
"^":"c;a",
bX:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aZ:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.f(z[0])+","+H.f(z[1])+","+H.f(z[2])+","+H.f(z[3])},
u:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.u(z[0],b.gv().h(0,0))
x=C.b.u(z[1],b.gv().h(0,1))
w=C.b.u(z[2],b.gv().h(0,2))
z=C.b.u(z[3],b.gv().h(0,3))
v=new E.am(new Float64Array(H.k(4)))
v.bX(y,x,w,z)
return v},
l:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.l(z[0],b.gv().h(0,0))
x=C.b.l(z[1],b.gv().h(0,1))
w=C.b.l(z[2],b.gv().h(0,2))
z=C.b.l(z[3],b.gv().h(0,3))
v=new E.am(new Float64Array(H.k(4)))
v.bX(y,x,w,z)
return v},
n:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.u(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.am(new Float64Array(H.k(4)))
v.bX(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
z[b]=c},
gm:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.an(y*y+x*x+w*w+z*z))},
co:function(a){var z=new E.am(new Float64Array(H.k(4)))
z.aZ(this)
return z},
sj:function(a,b){this.a[0]=b
return b},
sk:function(a,b){this.a[1]=b
return b},
sah:function(a,b){this.a[2]=b
return b},
gj:function(a){return this.a[0]},
gk:function(a){return this.a[1]},
gW:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.q=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dH.prototype
return J.dG.prototype}if(typeof a=="string")return J.ba.prototype
if(a==null)return J.ig.prototype
if(typeof a=="boolean")return J.ie.prototype
if(a.constructor==Array)return J.b8.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bq(a)}
J.E=function(a){if(typeof a=="string")return J.ba.prototype
if(a==null)return a
if(a.constructor==Array)return J.b8.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bq(a)}
J.aM=function(a){if(a==null)return a
if(a.constructor==Array)return J.b8.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bq(a)}
J.X=function(a){if(typeof a=="number")return J.aS.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bk.prototype
return a}
J.cR=function(a){if(typeof a=="number")return J.aS.prototype
if(typeof a=="string")return J.ba.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bk.prototype
return a}
J.lN=function(a){if(typeof a=="number")return J.aS.prototype
if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bq(a)}
J.cS=function(a){if(typeof a=="string")return J.ba.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bk.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bq(a)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.cR(a).l(a,b)}
J.H=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.q(a).w(a,b)}
J.a3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.X(a).aK(a,b)}
J.aN=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.X(a).ar(a,b)}
J.cZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.cR(a).n(a,b)}
J.d_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.X(a).u(a,b)}
J.f5=function(a,b){return J.X(a).b0(a,b)}
J.br=function(a,b){if(a.constructor==Array||typeof a=="string"||H.eY(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.E(a).h(a,b)}
J.f6=function(a,b,c){if((a.constructor==Array||H.eY(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.aM(a).p(a,b,c)}
J.f7=function(a,b,c,d){return J.i(a).dA(a,b,c,d)}
J.f8=function(a){return J.i(a).fJ(a)}
J.c0=function(a,b,c){return J.i(a).fL(a,b,c)}
J.d0=function(a,b,c){return J.i(a).fM(a,b,c)}
J.f9=function(a,b){return J.i(a).fO(a,b)}
J.fa=function(a,b,c,d,e){return J.i(a).fP(a,b,c,d,e)}
J.fb=function(a,b,c,d){return J.i(a).fQ(a,b,c,d)}
J.fc=function(a,b){return J.aM(a).fT(a,b)}
J.fd=function(a,b,c,d,e){return J.i(a).fU(a,b,c,d,e)}
J.fe=function(a,b){return J.i(a).fV(a,b)}
J.ff=function(a,b){return J.i(a).fY(a,b)}
J.fg=function(a,b){return J.cS(a).aD(a,b)}
J.fh=function(a,b){return J.cR(a).aP(a,b)}
J.fi=function(a,b){return J.i(a).S(a,b)}
J.fj=function(a,b){return J.E(a).a9(a,b)}
J.c1=function(a,b,c){return J.E(a).dF(a,b,c)}
J.c2=function(a){return J.i(a).h0(a)}
J.fk=function(a,b){return J.i(a).h2(a,b)}
J.fl=function(a){return J.i(a).h4(a)}
J.fm=function(a){return J.i(a).h5(a)}
J.fn=function(a,b){return J.i(a).h6(a,b)}
J.fo=function(a,b){return J.i(a).ha(a,b)}
J.fp=function(a,b){return J.i(a).hc(a,b)}
J.fq=function(a,b){return J.i(a).hd(a,b)}
J.fr=function(a,b){return J.i(a).hk(a,b)}
J.fs=function(a,b,c,d,e){return J.i(a).ho(a,b,c,d,e)}
J.ft=function(a,b){return J.aM(a).a5(a,b)}
J.d1=function(a,b){return J.i(a).hv(a,b)}
J.bs=function(a,b){return J.i(a).hw(a,b)}
J.fu=function(a,b){return J.aM(a).P(a,b)}
J.d2=function(a){return J.i(a).gfS(a)}
J.ah=function(a){return J.i(a).gaF(a)}
J.R=function(a){return J.q(a).gK(a)}
J.fv=function(a){return J.i(a).gq(a)}
J.aB=function(a){return J.aM(a).gL(a)}
J.ai=function(a){return J.E(a).gm(a)}
J.d3=function(a){return J.i(a).ghY(a)}
J.d4=function(a){return J.i(a).ghZ(a)}
J.fw=function(a){return J.i(a).gbB(a)}
J.fx=function(a){return J.i(a).gbC(a)}
J.fy=function(a){return J.i(a).gbD(a)}
J.fz=function(a){return J.i(a).gbE(a)}
J.fA=function(a){return J.i(a).gbF(a)}
J.fB=function(a){return J.i(a).gbG(a)}
J.fC=function(a){return J.i(a).gbH(a)}
J.fD=function(a){return J.i(a).gcE(a)}
J.fE=function(a){return J.i(a).gbd(a)}
J.fF=function(a){return J.i(a).gi2(a)}
J.fG=function(a){return J.i(a).gi3(a)}
J.fH=function(a){return J.i(a).gcF(a)}
J.fI=function(a){return J.i(a).gbe(a)}
J.fJ=function(a){return J.i(a).gi5(a)}
J.fK=function(a){return J.i(a).gaq(a)}
J.fL=function(a){return J.i(a).gax(a)}
J.fM=function(a){return J.i(a).gcS(a)}
J.fN=function(a){return J.i(a).gt(a)}
J.fO=function(a){return J.i(a).gj(a)}
J.bt=function(a,b,c){return J.i(a).ek(a,b,c)}
J.fP=function(a){return J.i(a).el(a)}
J.fQ=function(a,b){return J.i(a).em(a,b)}
J.c3=function(a,b){return J.i(a).ep(a,b)}
J.fR=function(a,b,c){return J.i(a).er(a,b,c)}
J.fS=function(a,b){return J.aM(a).aS(a,b)}
J.fT=function(a){return J.i(a).ac(a)}
J.fU=function(a,b,c,d){return J.i(a).e2(a,b,c,d)}
J.aO=function(a,b){return J.i(a).bU(a,b)}
J.fV=function(a,b){return J.i(a).sq(a,b)}
J.fW=function(a,b){return J.i(a).sai(a,b)}
J.fX=function(a,b){return J.i(a).st(a,b)}
J.fY=function(a,b,c){return J.i(a).eD(a,b,c)}
J.c4=function(a){return J.i(a).ak(a)}
J.fZ=function(a,b){return J.i(a).bm(a,b)}
J.h_=function(a,b,c){return J.cS(a).c0(a,b,c)}
J.bu=function(a,b,c,d){return J.i(a).io(a,b,c,d)}
J.N=function(a){return J.X(a).cP(a)}
J.d5=function(a){return J.X(a).aU(a)}
J.h0=function(a,b){return J.X(a).bi(a,b)}
J.aP=function(a){return J.q(a).i(a)}
J.d6=function(a,b){return J.lN(a).aX(a,b)}
J.d7=function(a,b){return J.i(a).is(a,b)}
J.bv=function(a,b,c,d,e,f,g){return J.i(a).it(a,b,c,d,e,f,g)}
J.h1=function(a,b,c){return J.i(a).aY(a,b,c)}
I.bX=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.L=W.hx.prototype
C.u=W.c9.prototype
C.M=W.hK.prototype
C.A=W.hT.prototype
C.B=W.hU.prototype
C.N=J.j.prototype
C.a=J.b8.prototype
C.O=J.dG.prototype
C.c=J.dH.prototype
C.b=J.aS.prototype
C.i=J.ba.prototype
C.W=J.aT.prototype
C.a3=J.iG.prototype
C.a4=P.j0.prototype
C.ac=W.bO.prototype
C.ad=J.bk.prototype
C.ae=W.kh.prototype
C.H=new H.dt()
C.I=new P.iF()
C.J=new P.kg()
C.K=new P.ky()
C.h=new P.kS()
C.d=new P.l9()
C.w=new P.ac(0)
C.P=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.Q=function(hooks) {
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
C.C=function getTagFallback(o) {
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
C.D=function(hooks) { return hooks; }

C.R=function(getTagFallback) {
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
C.S=function() {
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
C.T=function(hooks) {
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
C.U=function(hooks) {
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
C.V=function(_, letter) { return letter.toUpperCase(); }
C.E=new P.ik(null,null)
C.X=new P.im(null)
C.Y=new P.io(null,null)
C.F=H.a(I.bX([127,2047,65535,1114111]),[P.r])
C.Z=I.bX([])
C.a_=new H.bB([0,"TinyCanvasTransform.NONE",1,"TinyCanvasTransform.ROT90",2,"TinyCanvasTransform.ROT180",3,"TinyCanvasTransform.ROT270",4,"TinyCanvasTransform.MIRROR",5,"TinyCanvasTransform.MIRROR_ROT90",6,"TinyCanvasTransform.MIRROR_ROT180",7,"TinyCanvasTransform.MIRROR_ROT270"])
C.a0=new H.bB([0,"MinoTyoe.empty",1,"MinoTyoe.frame",2,"MinoTyoe.out",3,"MinoTyoe.l",4,"MinoTyoe.o",5,"MinoTyoe.s",6,"MinoTyoe.z",7,"MinoTyoe.j",8,"MinoTyoe.t",9,"MinoTyoe.L"])
C.a1=new H.bB([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.a2=new H.bB([0,"TinyStagePointerType.CANCEL",1,"TinyStagePointerType.UP",2,"TinyStagePointerType.DOWN",3,"TinyStagePointerType.MOVE"])
C.e=new F.ad(0)
C.v=new F.ad(1)
C.r=new F.ad(2)
C.j=new F.ad(3)
C.k=new F.ad(4)
C.l=new F.ad(5)
C.m=new F.ad(6)
C.n=new F.ad(7)
C.o=new F.ad(8)
C.p=new F.ad(9)
C.G=new F.aw(0)
C.a5=new F.aw(1)
C.a6=new F.aw(2)
C.a7=new F.aw(3)
C.a8=new F.aw(4)
C.a9=new F.aw(5)
C.aa=new F.aw(6)
C.ab=new F.aw(7)
C.f=new F.jM(0)
C.x=new F.aX(0)
C.q=new F.aX(1)
C.t=new F.aX(2)
C.y=new F.aX(3)
C.z=new P.ke(!1)
$.e2="$cachedFunction"
$.e3="$cachedInvocation"
$.ab=0
$.aR=null
$.dc=null
$.cT=null
$.eP=null
$.f1=null
$.bU=null
$.bW=null
$.cU=null
$.aI=null
$.b1=null
$.b2=null
$.cM=!1
$.m=C.d
$.dw=0
$.dq=null
$.dp=null
$.dn=null
$.dm=null
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
I.$lazy(y,x,w)}})(["dk","$get$dk",function(){return init.getIsolateTag("_$dart_dartClosure")},"dE","$get$dE",function(){return H.i8()},"dF","$get$dF",function(){return new P.hF(null)},"ei","$get$ei",function(){return H.af(H.bP({toString:function(){return"$receiver$"}}))},"ej","$get$ej",function(){return H.af(H.bP({$method$:null,toString:function(){return"$receiver$"}}))},"ek","$get$ek",function(){return H.af(H.bP(null))},"el","$get$el",function(){return H.af(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ep","$get$ep",function(){return H.af(H.bP(void 0))},"eq","$get$eq",function(){return H.af(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"en","$get$en",function(){return H.af(H.eo(null))},"em","$get$em",function(){return H.af(function(){try{null.$method$}catch(z){return z.message}}())},"es","$get$es",function(){return H.af(H.eo(void 0))},"er","$get$er",function(){return H.af(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cH","$get$cH",function(){return P.kn()},"b3","$get$b3",function(){return[]},"dj","$get$dj",function(){return{}},"dL","$get$dL",function(){return[500,225,150,125,75]},"ci","$get$ci",function(){return[150,150,125,125,125]},"dN","$get$dN",function(){return[70,70,70,70,70]},"dO","$get$dO",function(){return[150,150,150,150,150]},"cj","$get$cj",function(){return[200,200,200,200,200]},"dM","$get$dM",function(){return[1,2,2,2,3]},"dP","$get$dP",function(){return[6,7,8,9,10]},"dQ","$get$dQ",function(){return[2,5,6,10,50]},"dS","$get$dS",function(){return P.iV(null)},"e_","$get$e_",function(){return F.l(255,238,238,255)},"cp","$get$cp",function(){return F.l(170,136,136,136)},"cq","$get$cq",function(){return F.l(170,85,51,51)},"cs","$get$cs",function(){return F.l(170,255,255,255)},"bJ","$get$bJ",function(){return F.l(170,0,0,0)},"ct","$get$ct",function(){return F.l(170,255,170,170)},"cv","$get$cv",function(){return F.l(170,170,255,170)},"cr","$get$cr",function(){return F.l(170,170,170,255)},"bI","$get$bI",function(){return F.l(170,255,255,170)},"cu","$get$cu",function(){return F.l(170,170,255,255)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[P.ae]},{func:1,args:[W.ck]},{func:1,args:[,,]},{func:1,args:[W.be]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,P.av]},{func:1,args:[,],opt:[,]},{func:1,ret:P.ae,args:[P.r]},{func:1,args:[P.r]},{func:1,v:true,args:[F.cD,P.r,F.aX,P.ag,P.ag]},{func:1,ret:P.a0,args:[W.be]},{func:1,args:[W.cF]},{func:1,args:[,P.ae]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.r,,]},{func:1,v:true,args:[,,]},{func:1,args:[P.c]},{func:1,v:true,args:[,],opt:[P.av]},{func:1,ret:P.b4},{func:1,args:[P.b4]},{func:1,v:true,args:[P.c],opt:[P.av]},{func:1,v:true,args:[,P.av]},{func:1,ret:P.r,args:[,P.r]},{func:1,v:true,args:[P.r,P.r]},{func:1,args:[F.cB]},{func:1,ret:P.a0,args:[,]},{func:1,args:[P.ae,,]},{func:1,ret:P.c,args:[,]},{func:1,ret:P.r,args:[P.V,P.V]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.m9(d||a)
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
Isolate.bX=a.bX
Isolate.az=a.az
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.f3(F.f_(),b)},[])
else (function(b){H.f3(F.f_(),b)})([])})})()