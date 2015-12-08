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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bZ"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bZ"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bZ(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bf=function(){}
var dart=[["","",,H,{
"^":"",
jx:{
"^":"b;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bi:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bg:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.c1==null){H.iG()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.bP("Return interceptor for "+H.c(y(a,z))))}w=H.iO(a)
if(w==null){if(typeof a=="function")return C.x
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.z
else return C.B}return w},
f:{
"^":"b;",
l:function(a,b){return a===b},
gq:function(a){return H.a3(a)},
i:["cV",function(a){return H.b3(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
ff:{
"^":"f;",
i:function(a){return String(a)},
gq:function(a){return a?519018:218159},
$isbY:1},
fh:{
"^":"f;",
l:function(a,b){return null==b},
i:function(a){return"null"},
gq:function(a){return 0}},
bv:{
"^":"f;",
gq:function(a){return 0},
i:["cW",function(a){return String(a)}],
$isfi:1},
fz:{
"^":"bv;"},
b8:{
"^":"bv;"},
aI:{
"^":"bv;",
i:function(a){var z=a[$.$get$cm()]
return z==null?this.cW(a):J.ap(z)}},
aG:{
"^":"f;",
c9:function(a,b){if(!!a.immutable$list)throw H.e(new P.M(b))},
c8:function(a,b){if(!!a.fixed$length)throw H.e(new P.M(b))},
b6:function(a,b){var z,y
this.c8(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.Y)(b),++y)a.push(b[y])},
G:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.K(a))}},
a7:function(a,b){return H.a(new H.bB(a,b),[null,null])},
cf:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.c(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
V:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
gej:function(a){if(a.length>0)return a[0]
throw H.e(H.bu())},
ga6:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bu())},
bC:function(a,b,c,d,e){var z,y,x
this.c9(a,"set range")
P.cQ(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.z(P.ae(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.fc())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aY(a,"[","]")},
gE:function(a){return new J.ev(a,a.length,0,null)},
gq:function(a){return H.a3(a)},
gj:function(a){return a.length},
sj:function(a,b){this.c8(a,"set length")
if(b<0)throw H.e(P.ae(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.x(a,b))
if(b>=a.length||b<0)throw H.e(H.x(a,b))
return a[b]},
u:function(a,b,c){this.c9(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.x(a,b))
if(b>=a.length||b<0)throw H.e(H.x(a,b))
a[b]=c},
$isaZ:1,
$isk:1,
$ask:null,
$isq:1,
static:{fe:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.cg(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.e(P.ae(a,0,4294967295,"length",null))
z=H.a(new Array(a),[b])
z.fixed$length=Array
return z}}},
jw:{
"^":"aG;"},
ev:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.Y(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aH:{
"^":"f;",
bn:function(a,b){return a%b},
a9:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.M(""+a))},
F:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.M(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gq:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.e(H.al(b))
return a+b},
d0:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a9(a/b)},
af:function(a,b){return(a|0)===a?a/b|0:this.a9(a/b)},
b3:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aK:function(a,b){if(typeof b!=="number")throw H.e(H.al(b))
return a<b},
$isaQ:1},
cz:{
"^":"aH;",
$isaQ:1,
$isn:1},
fg:{
"^":"aH;",
$isaQ:1},
b_:{
"^":"f;",
k:function(a,b){if(typeof b!=="string")throw H.e(P.cg(b,null,null))
return a+b},
cU:function(a,b,c){H.dw(b)
if(c==null)c=a.length
H.dw(c)
if(b<0)throw H.e(P.b4(b,null,null))
if(typeof c!=="number")return H.S(c)
if(b>c)throw H.e(P.b4(b,null,null))
if(c>a.length)throw H.e(P.b4(c,null,null))
return a.substring(b,c)},
cT:function(a,b){return this.cU(a,b,null)},
e_:function(a,b,c){if(c>a.length)throw H.e(P.ae(c,0,a.length,null,null))
return H.iT(a,b,c)},
gL:function(a){return a.length===0},
i:function(a){return a},
gq:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.x(a,b))
if(b>=a.length||b<0)throw H.e(H.x(a,b))
return a[b]},
$isaZ:1,
$isR:1}}],["","",,H,{
"^":"",
aN:function(a,b){var z=a.aj(b)
if(!init.globalState.d.cy)init.globalState.f.am()
return z},
dL:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isk)throw H.e(P.aU("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.hV(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cx()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.hz(P.bz(null,H.aM),0)
y.z=H.a(new H.a1(0,null,null,null,null,null,0),[P.n,H.bU])
y.ch=H.a(new H.a1(0,null,null,null,null,null,0),[P.n,null])
if(y.x===!0){x=new H.hU()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.f5,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hW)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.a(new H.a1(0,null,null,null,null,null,0),[P.n,H.b5])
w=P.ar(null,null,null,P.n)
v=new H.b5(0,null,!1)
u=new H.bU(y,x,w,init.createNewIsolate(),v,new H.ac(H.bj()),new H.ac(H.bj()),!1,!1,[],P.ar(null,null,null,null),null,null,!1,!0,P.ar(null,null,null,null))
w.a4(0,0)
u.bF(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aP()
x=H.am(y,[y]).a_(a)
if(x)u.aj(new H.iR(z,a))
else{y=H.am(y,[y,y]).a_(a)
if(y)u.aj(new H.iS(z,a))
else u.aj(a)}init.globalState.f.am()},
f9:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fa()
return},
fa:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.M("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.M("Cannot extract URI from \""+H.c(z)+"\""))},
f5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b9(!0,[]).a0(b.data)
y=J.N(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b9(!0,[]).a0(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b9(!0,[]).a0(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.a(new H.a1(0,null,null,null,null,null,0),[P.n,H.b5])
p=P.ar(null,null,null,P.n)
o=new H.b5(0,null,!1)
n=new H.bU(y,q,p,init.createNewIsolate(),o,new H.ac(H.bj()),new H.ac(H.bj()),!1,!1,[],P.ar(null,null,null,null),null,null,!1,!0,P.ar(null,null,null,null))
p.a4(0,0)
n.bF(0,o)
init.globalState.f.a.U(new H.aM(n,new H.f6(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.am()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.ao(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.am()
break
case"close":init.globalState.ch.a8(0,$.$get$cy().h(0,a))
a.terminate()
init.globalState.f.am()
break
case"log":H.f4(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ad(["command","print","msg",z])
q=new H.ah(!0,P.av(null,P.n)).K(q)
y.toString
self.postMessage(q)}else P.az(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
f4:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ad(["command","log","msg",a])
x=new H.ah(!0,P.av(null,P.n)).K(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.y(w)
throw H.e(P.aX(z))}},
f7:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cM=$.cM+("_"+y)
$.cN=$.cN+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.ao(f,["spawned",new H.bb(y,x),w,z.r])
x=new H.f8(a,b,c,d,z)
if(e===!0){z.c5(w,w)
init.globalState.f.a.U(new H.aM(z,x,"start isolate"))}else x.$0()},
ig:function(a){return new H.b9(!0,[]).a0(new H.ah(!1,P.av(null,P.n)).K(a))},
iR:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iS:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hV:{
"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hW:function(a){var z=P.ad(["command","print","msg",a])
return new H.ah(!0,P.av(null,P.n)).K(z)}}},
bU:{
"^":"b;a,b,c,eA:d<,e0:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
c5:function(a,b){if(!this.f.l(0,a))return
if(this.Q.a4(0,b)&&!this.y)this.y=!0
this.b5()},
eO:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a8(0,a)
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
if(w===y.c)y.bP();++y.d}this.y=!1}this.b5()},
dL:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eN:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.z(new P.M("removeRange"))
P.cQ(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cO:function(a,b){if(!this.r.l(0,a))return
this.db=b},
eo:function(a,b,c){var z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){J.ao(a,c)
return}z=this.cx
if(z==null){z=P.bz(null,null)
this.cx=z}z.U(new H.hQ(a,c))},
em:function(a,b){var z
if(!this.r.l(0,a))return
z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){this.bg()
return}z=this.cx
if(z==null){z=P.bz(null,null)
this.cx=z}z.U(this.geD())},
ep:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.az(a)
if(b!=null)P.az(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.ap(a)
y[1]=b==null?null:J.ap(b)
for(x=new P.cB(z,z.r,null,null),x.c=z.e;x.p();)J.ao(x.d,y)},
aj:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.y(u)
this.ep(w,v)
if(this.db===!0){this.bg()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geA()
if(this.cx!=null)for(;t=this.cx,!t.gL(t);)this.cx.cp().$0()}return y},
ck:function(a){return this.b.h(0,a)},
bF:function(a,b){var z=this.b
if(z.av(a))throw H.e(P.aX("Registry: ports must be registered only once."))
z.u(0,a,b)},
b5:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.bg()},
bg:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.S(0)
for(z=this.b,y=z.gcw(z),y=y.gE(y);y.p();)y.gw().dg()
z.S(0)
this.c.S(0)
init.globalState.z.a8(0,this.a)
this.dx.S(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
J.ao(w,z[v])}this.ch=null}},"$0","geD",0,0,1]},
hQ:{
"^":"d:1;a,b",
$0:function(){J.ao(this.a,this.b)}},
hz:{
"^":"b;a,b",
e9:function(){var z=this.a
if(z.b===z.c)return
return z.cp()},
ct:function(){var z,y,x
z=this.e9()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.av(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gL(y)}else y=!1
else y=!1
else y=!1
if(y)H.z(P.aX("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gL(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ad(["command","close"])
x=new H.ah(!0,H.a(new P.dj(0,null,null,null,null,null,0),[null,P.n])).K(x)
y.toString
self.postMessage(x)}return!1}z.eM()
return!0},
c_:function(){if(self.window!=null)new H.hA(this).$0()
else for(;this.ct(););},
am:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.c_()
else try{this.c_()}catch(x){w=H.B(x)
z=w
y=H.y(x)
w=init.globalState.Q
v=P.ad(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.ah(!0,P.av(null,P.n)).K(v)
w.toString
self.postMessage(v)}}},
hA:{
"^":"d:1;a",
$0:function(){if(!this.a.ct())return
P.cX(C.f,this)}},
aM:{
"^":"b;a,b,c",
eM:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aj(this.b)}},
hU:{
"^":"b;"},
f6:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.f7(this.a,this.b,this.c,this.d,this.e,this.f)}},
f8:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aP()
w=H.am(x,[x,x]).a_(y)
if(w)y.$2(this.b,this.c)
else{x=H.am(x,[x]).a_(y)
if(x)y.$1(this.b)
else y.$0()}}z.b5()}},
dd:{
"^":"b;"},
bb:{
"^":"dd;b,a",
aM:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbS())return
x=H.ig(b)
if(z.ge0()===y){y=J.N(x)
switch(y.h(x,0)){case"pause":z.c5(y.h(x,1),y.h(x,2))
break
case"resume":z.eO(y.h(x,1))
break
case"add-ondone":z.dL(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eN(y.h(x,1))
break
case"set-errors-fatal":z.cO(y.h(x,1),y.h(x,2))
break
case"ping":z.eo(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.em(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a4(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a8(0,y)
break}return}y=init.globalState.f
w="receive "+H.c(b)
y.a.U(new H.aM(z,new H.hY(this,x),w))},
l:function(a,b){if(b==null)return!1
return b instanceof H.bb&&J.Z(this.b,b.b)},
gq:function(a){return this.b.gaZ()}},
hY:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbS())z.da(this.b)}},
bV:{
"^":"dd;b,c,a",
aM:function(a,b){var z,y,x
z=P.ad(["command","message","port",this,"msg",b])
y=new H.ah(!0,P.av(null,P.n)).K(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
l:function(a,b){if(b==null)return!1
return b instanceof H.bV&&J.Z(this.b,b.b)&&J.Z(this.a,b.a)&&J.Z(this.c,b.c)},
gq:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cP()
y=this.a
if(typeof y!=="number")return y.cP()
x=this.c
if(typeof x!=="number")return H.S(x)
return(z<<16^y<<8^x)>>>0}},
b5:{
"^":"b;aZ:a<,b,bS:c<",
dg:function(){this.c=!0
this.b=null},
da:function(a){if(this.c)return
this.dt(a)},
dt:function(a){return this.b.$1(a)},
$isfA:1},
fT:{
"^":"b;a,b,c",
d4:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.U(new H.aM(y,new H.fV(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.V(new H.fW(this,b),0),a)}else throw H.e(new P.M("Timer greater than 0."))},
static:{fU:function(a,b){var z=new H.fT(!0,!1,null)
z.d4(a,b)
return z}}},
fV:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fW:{
"^":"d:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ac:{
"^":"b;aZ:a<",
gq:function(a){var z=this.a
if(typeof z!=="number")return z.eZ()
z=C.a.b3(z,0)^C.a.af(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
l:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ac){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ah:{
"^":"b;a,b",
K:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gj(z))
z=J.l(a)
if(!!z.$iscF)return["buffer",a]
if(!!z.$isbF)return["typed",a]
if(!!z.$isaZ)return this.cK(a)
if(!!z.$isf3){x=this.gcH()
w=a.gcg()
w=H.b1(w,x,H.O(w,"L",0),null)
w=P.bA(w,!0,H.O(w,"L",0))
z=z.gcw(a)
z=H.b1(z,x,H.O(z,"L",0),null)
return["map",w,P.bA(z,!0,H.O(z,"L",0))]}if(!!z.$isfi)return this.cL(a)
if(!!z.$isf)this.cv(a)
if(!!z.$isfA)this.an(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbb)return this.cM(a)
if(!!z.$isbV)return this.cN(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.an(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isac)return["capability",a.a]
if(!(a instanceof P.b))this.cv(a)
return["dart",init.classIdExtractor(a),this.cJ(init.classFieldsExtractor(a))]},"$1","gcH",2,0,2],
an:function(a,b){throw H.e(new P.M(H.c(b==null?"Can't transmit:":b)+" "+H.c(a)))},
cv:function(a){return this.an(a,null)},
cK:function(a){var z=this.cI(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.an(a,"Can't serialize indexable: ")},
cI:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.K(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cJ:function(a){var z
for(z=0;z<a.length;++z)C.b.u(a,z,this.K(a[z]))
return a},
cL:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.an(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.K(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cN:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cM:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaZ()]
return["raw sendport",a]}},
b9:{
"^":"b;a,b",
a0:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aU("Bad serialized message: "+H.c(a)))
switch(C.b.gej(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=H.a(this.ah(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return H.a(this.ah(x),[null])
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ah(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.a(this.ah(x),[null])
y.fixed$length=Array
return y
case"map":return this.ec(a)
case"sendport":return this.ed(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.eb(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.ac(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ah(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.c(a))}},"$1","gea",2,0,2],
ah:function(a){var z,y,x
z=J.N(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.S(x)
if(!(y<x))break
z.u(a,y,this.a0(z.h(a,y)));++y}return a},
ec:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aJ()
this.b.push(w)
y=J.eq(y,this.gea()).bs(0)
for(z=J.N(y),v=J.N(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.u(0,y[u],this.a0(v.h(x,u)))}return w},
ed:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.Z(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.ck(w)
if(u==null)return
t=new H.bb(u,x)}else t=new H.bV(y,w,x)
this.b.push(t)
return t},
eb:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.N(y)
v=J.N(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.S(t)
if(!(u<t))break
w[z.h(y,u)]=this.a0(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eE:function(){throw H.e(new P.M("Cannot modify unmodifiable Map"))},
iB:function(a){return init.types[a]},
dD:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isb0},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ap(a)
if(typeof z!=="string")throw H.e(H.al(a))
return z},
a3:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cO:function(a){var z,y,x,w,v,u,t,s
z=J.l(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.o||!!J.l(a).$isb8){v=C.i(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof t==="string"&&/^\w+$/.test(t))w=t}if(w==null)w=v}else w=v}w=w
if(w.length>1)s=w.charCodeAt(0)===36
else s=!1
if(s)w=C.h.cT(w,1)
return(w+H.dE(H.c_(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b3:function(a){return"Instance of '"+H.cO(a)+"'"},
E:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cL:function(a){return a.b?H.E(a).getUTCMilliseconds()+0:H.E(a).getMilliseconds()+0},
b2:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.al(a))
return a[b]},
bH:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.al(a))
a[b]=c},
S:function(a){throw H.e(H.al(a))},
h:function(a,b){if(a==null)J.aB(a)
throw H.e(H.x(a,b))},
x:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ab(!0,b,"index",null)
z=J.aB(a)
if(!(b<0)){if(typeof z!=="number")return H.S(z)
y=b>=z}else y=!0
if(y)return P.bt(b,a,"index",null,z)
return P.b4(b,"index",null)},
al:function(a){return new P.ab(!0,a,null,null)},
dx:function(a){return a},
dw:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.al(a))
return a},
e:function(a){var z
if(a==null)a=new P.bG()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dN})
z.name=""}else z.toString=H.dN
return z},
dN:function(){return J.ap(this.dartException)},
z:function(a){throw H.e(a)},
Y:function(a){throw H.e(new P.K(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iV(a)
if(a==null)return
if(a instanceof H.bs)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.b3(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bw(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.cK(v,null))}}if(a instanceof TypeError){u=$.$get$d0()
t=$.$get$d1()
s=$.$get$d2()
r=$.$get$d3()
q=$.$get$d7()
p=$.$get$d8()
o=$.$get$d5()
$.$get$d4()
n=$.$get$da()
m=$.$get$d9()
l=u.N(y)
if(l!=null)return z.$1(H.bw(y,l))
else{l=t.N(y)
if(l!=null){l.method="call"
return z.$1(H.bw(y,l))}else{l=s.N(y)
if(l==null){l=r.N(y)
if(l==null){l=q.N(y)
if(l==null){l=p.N(y)
if(l==null){l=o.N(y)
if(l==null){l=r.N(y)
if(l==null){l=n.N(y)
if(l==null){l=m.N(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cK(y,l==null?null:l.method))}}return z.$1(new H.hi(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cT()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ab(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cT()
return a},
y:function(a){var z
if(a instanceof H.bs)return a.b
if(a==null)return new H.dk(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dk(a,null)},
iQ:function(a){if(a==null||typeof a!='object')return J.C(a)
else return H.a3(a)},
dz:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
iI:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.l(c,0))return H.aN(b,new H.iJ(a))
else if(z.l(c,1))return H.aN(b,new H.iK(a,d))
else if(z.l(c,2))return H.aN(b,new H.iL(a,d,e))
else if(z.l(c,3))return H.aN(b,new H.iM(a,d,e,f))
else if(z.l(c,4))return H.aN(b,new H.iN(a,d,e,f,g))
else throw H.e(P.aX("Unsupported number of arguments for wrapped closure"))},
V:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.iI)
a.$identity=z
return z},
eC:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isk){z.$reflectionInfo=c
x=H.fD(z).r}else x=c
w=d?Object.create(new H.fI().constructor.prototype):Object.create(new H.bo(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.T
$.T=J.aA(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ck(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.iB(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cj:H.bp
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ck(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ez:function(a,b,c,d){var z=H.bp
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ck:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eB(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ez(y,!w,z,b)
if(y===0){w=$.aq
if(w==null){w=H.aV("self")
$.aq=w}w="return function(){return this."+H.c(w)+"."+H.c(z)+"();"
v=$.T
$.T=J.aA(v,1)
return new Function(w+H.c(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aq
if(v==null){v=H.aV("self")
$.aq=v}v=w+H.c(v)+"."+H.c(z)+"("+u+");"
w=$.T
$.T=J.aA(w,1)
return new Function(v+H.c(w)+"}")()},
eA:function(a,b,c,d){var z,y
z=H.bp
y=H.cj
switch(b?-1:a){case 0:throw H.e(new H.fE("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eB:function(a,b){var z,y,x,w,v,u,t,s
z=H.ey()
y=$.ci
if(y==null){y=H.aV("receiver")
$.ci=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eA(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.T
$.T=J.aA(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.T
$.T=J.aA(u,1)
return new Function(y+H.c(u)+"}")()},
bZ:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.eC(a,b,z,!!d,e,f)},
iU:function(a){throw H.e(new P.eH("Cyclic initialization for static "+H.c(a)))},
am:function(a,b,c){return new H.fF(a,b,c,null)},
aP:function(){return C.k},
bj:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a:function(a,b){a.$builtinTypeInfo=b
return a},
c_:function(a){if(a==null)return
return a.$builtinTypeInfo},
dB:function(a,b){return H.dM(a["$as"+H.c(b)],H.c_(a))},
O:function(a,b,c){var z=H.dB(a,b)
return z==null?null:z[c]},
w:function(a,b){var z=H.c_(a)
return z==null?null:z[b]},
c3:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dE(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dE:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bI("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.c(H.c3(u,c))}return w?"":"<"+H.c(z)+">"},
dM:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
ir:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.J(a[y],b[y]))return!1
return!0},
bd:function(a,b,c){return a.apply(b,H.dB(b,c))},
J:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dC(a,b)
if('func' in a)return b.builtin$cls==="eS"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c3(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.c(H.c3(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ir(H.dM(v,z),x)},
du:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.J(z,v)||H.J(v,z)))return!1}return!0},
iq:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.J(v,u)||H.J(u,v)))return!1}return!0},
dC:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.J(z,y)||H.J(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.du(x,w,!1))return!1
if(!H.du(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}}return H.iq(a.named,b.named)},
kh:function(a){var z=$.c0
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kg:function(a){return H.a3(a)},
kf:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iO:function(a){var z,y,x,w,v,u
z=$.c0.$1(a)
y=$.be[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bh[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dt.$2(a,z)
if(z!=null){y=$.be[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bh[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c2(x)
$.be[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bh[z]=x
return x}if(v==="-"){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dH(a,x)
if(v==="*")throw H.e(new P.bP(z))
if(init.leafTags[z]===true){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dH(a,x)},
dH:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bi(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c2:function(a){return J.bi(a,!1,null,!!a.$isb0)},
iP:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bi(z,!1,null,!!z.$isb0)
else return J.bi(z,c,null,null)},
iG:function(){if(!0===$.c1)return
$.c1=!0
H.iH()},
iH:function(){var z,y,x,w,v,u,t,s
$.be=Object.create(null)
$.bh=Object.create(null)
H.iC()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dJ.$1(v)
if(u!=null){t=H.iP(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
iC:function(){var z,y,x,w,v,u,t
z=C.t()
z=H.ak(C.p,H.ak(C.v,H.ak(C.j,H.ak(C.j,H.ak(C.u,H.ak(C.q,H.ak(C.r(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c0=new H.iD(v)
$.dt=new H.iE(u)
$.dJ=new H.iF(t)},
ak:function(a,b){return a(b)||b},
iT:function(a,b,c){return a.indexOf(b,c)>=0},
eD:{
"^":"b;",
i:function(a){return P.cE(this)},
u:function(a,b,c){return H.eE()}},
eV:{
"^":"eD;a",
aY:function(){var z=this.$map
if(z==null){z=new H.a1(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dz(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aY().h(0,b)},
G:function(a,b){this.aY().G(0,b)},
gj:function(a){var z=this.aY()
return z.gj(z)}},
fC:{
"^":"b;a,b,c,d,e,f,r,x",
static:{fD:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fC(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hh:{
"^":"b;a,b,c,d,e,f",
N:function(a){var z,y,x
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
static:{U:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hh(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d6:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cK:{
"^":"D;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
fk:{
"^":"D;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.c(z)+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.c(z)+"' on '"+H.c(y)+"' ("+H.c(this.a)+")"},
static:{bw:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fk(a,y,z?null:b.receiver)}}},
hi:{
"^":"D;a",
i:function(a){var z=this.a
return C.h.gL(z)?"Error":"Error: "+z}},
bs:{
"^":"b;a,T:b<"},
iV:{
"^":"d:2;a",
$1:function(a){if(!!J.l(a).$isD)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dk:{
"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
iJ:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
iK:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
iL:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
iM:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iN:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"b;",
i:function(a){return"Closure '"+H.cO(this)+"'"},
gcz:function(){return this},
gcz:function(){return this}},
cV:{
"^":"d;"},
fI:{
"^":"cV;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bo:{
"^":"cV;a,b,c,d",
l:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bo))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gq:function(a){var z,y
z=this.c
if(z==null)y=H.a3(this.a)
else y=typeof z!=="object"?J.C(z):H.a3(z)
z=H.a3(this.b)
if(typeof y!=="number")return y.f_()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.b3(z)},
static:{bp:function(a){return a.a},cj:function(a){return a.c},ey:function(){var z=$.aq
if(z==null){z=H.aV("self")
$.aq=z}return z},aV:function(a){var z,y,x,w,v
z=new H.bo("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fE:{
"^":"D;a",
i:function(a){return"RuntimeError: "+this.a}},
cS:{
"^":"b;"},
fF:{
"^":"cS;a,b,c,d",
a_:function(a){var z=this.dn(a)
return z==null?!1:H.dC(z,this.aa())},
dn:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
aa:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isk_)z.v=true
else if(!x.$iscs)z.ret=y.aa()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cR(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cR(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dy(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aa()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.c(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.c(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.dy(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.c(z[s].aa())+" "+s}x+="}"}}return x+(") -> "+H.c(this.a))},
static:{cR:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aa())
return z}}},
cs:{
"^":"cS;",
i:function(a){return"dynamic"},
aa:function(){return}},
a1:{
"^":"b;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gL:function(a){return this.a===0},
gcg:function(){return H.a(new H.fp(this),[H.w(this,0)])},
gcw:function(a){return H.b1(this.gcg(),new H.fj(this),H.w(this,0),H.w(this,1))},
av:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.dj(z,a)}else return this.ev(a)},
ev:function(a){var z=this.d
if(z==null)return!1
return this.al(this.R(z,this.ak(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.R(z,b)
return y==null?null:y.ga1()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.R(x,b)
return y==null?null:y.ga1()}else return this.ew(b)},
ew:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.R(z,this.ak(a))
x=this.al(y,a)
if(x<0)return
return y[x].ga1()},
u:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.b0()
this.b=z}this.bE(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.b0()
this.c=y}this.bE(y,b,c)}else{x=this.d
if(x==null){x=this.b0()
this.d=x}w=this.ak(b)
v=this.R(x,w)
if(v==null)this.b2(x,w,[this.b1(b,c)])
else{u=this.al(v,b)
if(u>=0)v[u].sa1(c)
else v.push(this.b1(b,c))}}},
a8:function(a,b){if(typeof b==="string")return this.bZ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bZ(this.c,b)
else return this.ex(b)},
ex:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.R(z,this.ak(a))
x=this.al(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.c3(w)
return w.ga1()},
S:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.K(this))
z=z.c}},
bE:function(a,b,c){var z=this.R(a,b)
if(z==null)this.b2(a,b,this.b1(b,c))
else z.sa1(c)},
bZ:function(a,b){var z
if(a==null)return
z=this.R(a,b)
if(z==null)return
this.c3(z)
this.bM(a,b)
return z.ga1()},
b1:function(a,b){var z,y
z=new H.fo(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c3:function(a){var z,y
z=a.gdE()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ak:function(a){return J.C(a)&0x3ffffff},
al:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Z(a[y].gcd(),b))return y
return-1},
i:function(a){return P.cE(this)},
R:function(a,b){return a[b]},
b2:function(a,b,c){a[b]=c},
bM:function(a,b){delete a[b]},
dj:function(a,b){return this.R(a,b)!=null},
b0:function(){var z=Object.create(null)
this.b2(z,"<non-identifier-key>",z)
this.bM(z,"<non-identifier-key>")
return z},
$isf3:1},
fj:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
fo:{
"^":"b;cd:a<,a1:b@,c,dE:d<"},
fp:{
"^":"L;a",
gj:function(a){return this.a.a},
gE:function(a){var z,y
z=this.a
y=new H.fq(z,z.r,null,null)
y.c=z.e
return y},
G:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.K(z))
y=y.c}},
$isq:1},
fq:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.K(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
iD:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
iE:{
"^":"d:11;a",
$2:function(a,b){return this.a(a,b)}},
iF:{
"^":"d:12;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bu:function(){return new P.af("No element")},
fc:function(){return new P.af("Too few elements")},
bx:{
"^":"L;",
gE:function(a){return new H.cC(this,this.gj(this),0,null)},
G:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.V(0,y))
if(z!==this.gj(this))throw H.e(new P.K(this))}},
a7:function(a,b){return H.a(new H.bB(this,b),[null,null])},
bt:function(a,b){var z,y,x
z=H.a([],[H.O(this,"bx",0)])
C.b.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.V(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bs:function(a){return this.bt(a,!0)},
$isq:1},
cC:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.N(z)
x=y.gj(z)
if(this.b!==x)throw H.e(new P.K(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.V(z,w);++this.c
return!0}},
cD:{
"^":"L;a,b",
gE:function(a){var z=new H.fu(null,J.bn(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.aB(this.a)},
$asL:function(a,b){return[b]},
static:{b1:function(a,b,c,d){if(!!J.l(a).$isq)return H.a(new H.ct(a,b),[c,d])
return H.a(new H.cD(a,b),[c,d])}}},
ct:{
"^":"cD;a,b",
$isq:1},
fu:{
"^":"fd;a,b,c",
p:function(){var z=this.b
if(z.p()){this.a=this.aX(z.gw())
return!0}this.a=null
return!1},
gw:function(){return this.a},
aX:function(a){return this.c.$1(a)}},
bB:{
"^":"bx;a,b",
gj:function(a){return J.aB(this.a)},
V:function(a,b){return this.aX(J.e6(this.a,b))},
aX:function(a){return this.b.$1(a)},
$asbx:function(a,b){return[b]},
$asL:function(a,b){return[b]},
$isq:1},
cw:{
"^":"b;"}}],["","",,H,{
"^":"",
dy:function(a){var z=H.a(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
hm:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.is()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.V(new P.ho(z),1)).observe(y,{childList:true})
return new P.hn(z,y,x)}else if(self.setImmediate!=null)return P.it()
return P.iu()},
k1:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.V(new P.hp(a),0))},"$1","is",2,0,4],
k2:[function(a){++init.globalState.f.b
self.setImmediate(H.V(new P.hq(a),0))},"$1","it",2,0,4],
k3:[function(a){P.bJ(C.f,a)},"$1","iu",2,0,4],
p:function(a,b,c){if(b===0){J.e_(c,a)
return}else if(b===1){c.ca(H.B(a),H.y(a))
return}P.i8(a,b)
return c.gel()},
i8:function(a,b){var z,y,x,w
z=new P.i9(b)
y=new P.ia(b)
x=J.l(a)
if(!!x.$isv)a.b4(z,y)
else if(!!x.$isP)a.aI(z,y)
else{w=H.a(new P.v(0,$.j,null),[null])
w.a=4
w.c=a
w.b4(z,null)}},
a9:function(a){var z=function(b,c){while(true)try{a(b,c)
break}catch(y){c=y
b=1}}
$.j.toString
return new P.ip(z)},
dn:function(a,b){var z=H.aP()
z=H.am(z,[z,z]).a_(a)
if(z){b.toString
return a}else{b.toString
return a}},
eT:function(a,b,c){var z=H.a(new P.v(0,$.j,null),[c])
P.cX(a,new P.eU(b,z))
return z},
a0:function(a){return H.a(new P.i6(H.a(new P.v(0,$.j,null),[a])),[a])},
ih:function(a,b,c){$.j.toString
a.H(b,c)},
ik:function(){var z,y
for(;z=$.ai,z!=null;){$.ax=null
y=z.c
$.ai=y
if(y==null)$.aw=null
$.j=z.b
z.dS()}},
ke:[function(){$.bW=!0
try{P.ik()}finally{$.j=C.c
$.ax=null
$.bW=!1
if($.ai!=null)$.$get$bR().$1(P.dv())}},"$0","dv",0,0,1],
ds:function(a){if($.ai==null){$.aw=a
$.ai=a
if(!$.bW)$.$get$bR().$1(P.dv())}else{$.aw.c=a
$.aw=a}},
dK:function(a){var z,y
z=$.j
if(C.c===z){P.aj(null,null,C.c,a)
return}z.toString
if(C.c.gbd()===z){P.aj(null,null,z,a)
return}y=$.j
P.aj(null,null,y,y.b7(a,!0))},
jS:function(a,b){var z,y,x
z=H.a(new P.dl(null,null,null,0),[b])
y=z.gdz()
x=z.gdB()
z.a=a.X(y,!0,z.gdA(),x)
return z},
io:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.B(u)
z=t
y=H.y(u)
$.j.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.W(x)
w=t
v=x.gT()
c.$2(w,v)}}},
ib:function(a,b,c,d){var z=a.b9()
if(!!J.l(z).$isP)z.by(new P.ie(b,c,d))
else b.H(c,d)},
ic:function(a,b){return new P.id(a,b)},
cX:function(a,b){var z=$.j
if(z===C.c){z.toString
return P.bJ(a,b)}return P.bJ(a,z.b7(b,!0))},
bJ:function(a,b){var z=C.d.af(a.a,1000)
return H.fU(z<0?0:z,b)},
aO:function(a,b,c,d,e){var z,y,x
z={}
z.a=d
y=new P.dc(new P.im(z,e),C.c,null)
z=$.ai
if(z==null){P.ds(y)
$.ax=$.aw}else{x=$.ax
if(x==null){y.c=z
$.ax=y
$.ai=y}else{y.c=x.c
x.c=y
$.ax=y
if(y.c==null)$.aw=y}}},
il:function(a,b){throw H.e(new P.a_(a,b))},
dp:function(a,b,c,d){var z,y
y=$.j
if(y===c)return d.$0()
$.j=c
z=y
try{y=d.$0()
return y}finally{$.j=z}},
dr:function(a,b,c,d,e){var z,y
y=$.j
if(y===c)return d.$1(e)
$.j=c
z=y
try{y=d.$1(e)
return y}finally{$.j=z}},
dq:function(a,b,c,d,e,f){var z,y
y=$.j
if(y===c)return d.$2(e,f)
$.j=c
z=y
try{y=d.$2(e,f)
return y}finally{$.j=z}},
aj:function(a,b,c,d){var z=C.c!==c
if(z){d=c.b7(d,!(!z||C.c.gbd()===c))
c=C.c}P.ds(new P.dc(d,c,null))},
ho:{
"^":"d:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
hn:{
"^":"d:13;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hp:{
"^":"d:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
hq:{
"^":"d:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
i9:{
"^":"d:2;a",
$1:function(a){return this.a.$2(0,a)}},
ia:{
"^":"d:5;a",
$2:function(a,b){this.a.$2(1,new H.bs(a,b))}},
ip:{
"^":"d:14;a",
$2:function(a,b){this.a(a,b)}},
P:{
"^":"b;"},
eU:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.Z(null)}catch(x){w=H.B(x)
z=w
y=H.y(x)
P.ih(this.b,z,y)}}},
de:{
"^":"b;el:a<",
ca:function(a,b){a=a!=null?a:new P.bG()
if(this.a.a!==0)throw H.e(new P.af("Future already completed"))
$.j.toString
this.H(a,b)},
au:function(a){return this.ca(a,null)}},
bQ:{
"^":"de;a",
a5:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.af("Future already completed"))
z.bG(b)},
H:function(a,b){this.a.de(a,b)}},
i6:{
"^":"de;a",
a5:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.af("Future already completed"))
z.Z(b)},
H:function(a,b){this.a.H(a,b)}},
at:{
"^":"b;bT:a<,eP:b>,c,d,e",
ga3:function(){return this.b.b},
gcc:function(){return(this.c&1)!==0},
ger:function(){return this.c===6},
geq:function(){return this.c===8},
gdD:function(){return this.d},
gdK:function(){return this.d}},
v:{
"^":"b;at:a?,a3:b<,c",
gdu:function(){return this.a===8},
sdv:function(a){this.a=2},
aI:function(a,b){var z=$.j
if(z!==C.c){z.toString
if(b!=null)b=P.dn(b,z)}return this.b4(a,b)},
eS:function(a){return this.aI(a,null)},
b4:function(a,b){var z=H.a(new P.v(0,$.j,null),[null])
this.aO(new P.at(null,z,b==null?1:3,a,b))
return z},
by:function(a){var z,y
z=$.j
y=new P.v(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aO(new P.at(null,y,8,a,null))
return y},
b_:function(){if(this.a!==0)throw H.e(new P.af("Future already completed"))
this.a=1},
gdJ:function(){return this.c},
gad:function(){return this.c},
dH:function(a,b){this.a=8
this.c=new P.a_(a,b)},
aO:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aj(null,null,z,new P.hD(this,a))}else{a.a=this.c
this.c=a}},
as:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbT()
z.a=y}return y},
Z:function(a){var z,y
z=J.l(a)
if(!!z.$isP)if(!!z.$isv)P.ba(a,this)
else P.bT(a,this)
else{y=this.as()
this.a=4
this.c=a
P.a7(this,y)}},
bL:function(a){var z=this.as()
this.a=4
this.c=a
P.a7(this,z)},
H:[function(a,b){var z=this.as()
this.a=8
this.c=new P.a_(a,b)
P.a7(this,z)},function(a){return this.H(a,null)},"f0","$2","$1","gaU",2,2,15,0],
bG:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isP){if(!!z.$isv){z=a.a
if(z>=4&&z===8){this.b_()
z=this.b
z.toString
P.aj(null,null,z,new P.hF(this,a))}else P.ba(a,this)}else P.bT(a,this)
return}}this.b_()
z=this.b
z.toString
P.aj(null,null,z,new P.hG(this,a))},
de:function(a,b){var z
this.b_()
z=this.b
z.toString
P.aj(null,null,z,new P.hE(this,a,b))},
$isP:1,
static:{bT:function(a,b){var z,y,x,w
b.sat(2)
try{a.aI(new P.hH(b),new P.hI(b))}catch(x){w=H.B(x)
z=w
y=H.y(x)
P.dK(new P.hJ(b,z,y))}},ba:function(a,b){var z
b.a=2
z=new P.at(null,b,0,null,null)
if(a.a>=4)P.a7(a,z)
else a.aO(z)},a7:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdu()
if(b==null){if(w){v=z.a.gad()
y=z.a.ga3()
x=J.W(v)
u=v.gT()
y.toString
P.aO(null,null,y,x,u)}return}for(;b.gbT()!=null;b=t){t=b.a
b.a=null
P.a7(z.a,b)}x.a=!0
s=w?null:z.a.gdJ()
x.b=s
x.c=!1
y=!w
if(!y||b.gcc()||b.c===8){r=b.ga3()
if(w){u=z.a.ga3()
u.toString
if(u==null?r!=null:u!==r){u=u.gbd()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gad()
y=z.a.ga3()
x=J.W(v)
u=v.gT()
y.toString
P.aO(null,null,y,x,u)
return}q=$.j
if(q==null?r!=null:q!==r)$.j=r
else q=null
if(y){if(b.gcc())x.a=new P.hL(x,b,s,r).$0()}else new P.hK(z,x,b,r).$0()
if(b.geq())new P.hM(z,x,w,b,r).$0()
if(q!=null)$.j=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isP}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.v)if(p.a>=4){o.a=2
z.a=p
b=new P.at(null,o,0,null,null)
y=p
continue}else P.ba(p,o)
else P.bT(p,o)
return}}o=b.b
b=o.as()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hD:{
"^":"d:0;a,b",
$0:function(){P.a7(this.a,this.b)}},
hH:{
"^":"d:2;a",
$1:function(a){this.a.bL(a)}},
hI:{
"^":"d:6;a",
$2:function(a,b){this.a.H(a,b)},
$1:function(a){return this.$2(a,null)}},
hJ:{
"^":"d:0;a,b,c",
$0:function(){this.a.H(this.b,this.c)}},
hF:{
"^":"d:0;a,b",
$0:function(){P.ba(this.b,this.a)}},
hG:{
"^":"d:0;a,b",
$0:function(){this.a.bL(this.b)}},
hE:{
"^":"d:0;a,b,c",
$0:function(){this.a.H(this.b,this.c)}},
hL:{
"^":"d:16;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.bq(this.b.gdD(),this.c)
return!0}catch(x){w=H.B(x)
z=w
y=H.y(x)
this.a.b=new P.a_(z,y)
return!1}}},
hK:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gad()
y=!0
r=this.c
if(r.ger()){x=r.d
try{y=this.d.bq(x,J.W(z))}catch(q){r=H.B(q)
w=r
v=H.y(q)
r=J.W(z)
p=w
o=(r==null?p==null:r===p)?z:new P.a_(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aP()
p=H.am(p,[p,p]).a_(r)
n=this.d
m=this.b
if(p)m.b=n.eQ(u,J.W(z),z.gT())
else m.b=n.bq(u,J.W(z))}catch(q){r=H.B(q)
t=r
s=H.y(q)
r=J.W(z)
p=t
o=(r==null?p==null:r===p)?z:new P.a_(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hM:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cr(this.d.gdK())
z.a=w
v=w}catch(u){z=H.B(u)
y=z
x=H.y(u)
if(this.c){z=J.W(this.a.a.gad())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gad()
else v.b=new P.a_(y,x)
v.a=!1
return}if(!!J.l(v).$isP){t=this.d
s=t.geP(t)
s.sdv(!0)
this.b.c=!0
v.aI(new P.hN(this.a,s),new P.hO(z,s))}}},
hN:{
"^":"d:2;a,b",
$1:function(a){P.a7(this.a.a,new P.at(null,this.b,0,null,null))}},
hO:{
"^":"d:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.v)){y=H.a(new P.v(0,$.j,null),[null])
z.a=y
y.dH(a,b)}P.a7(z.a,new P.at(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dc:{
"^":"b;a,b,c",
dS:function(){return this.a.$0()}},
a5:{
"^":"b;",
a7:function(a,b){return H.a(new P.hX(b,this),[H.O(this,"a5",0),null])},
G:function(a,b){var z,y
z={}
y=H.a(new P.v(0,$.j,null),[null])
z.a=null
z.a=this.X(new P.fM(z,this,b,y),!0,new P.fN(y),y.gaU())
return y},
gj:function(a){var z,y
z={}
y=H.a(new P.v(0,$.j,null),[P.n])
z.a=0
this.X(new P.fO(z),!0,new P.fP(z,y),y.gaU())
return y},
bs:function(a){var z,y
z=H.a([],[H.O(this,"a5",0)])
y=H.a(new P.v(0,$.j,null),[[P.k,H.O(this,"a5",0)]])
this.X(new P.fQ(this,z),!0,new P.fR(z,y),y.gaU())
return y}},
fM:{
"^":"d;a,b,c,d",
$1:function(a){P.io(new P.fK(this.c,a),new P.fL(),P.ic(this.a.a,this.d))},
$signature:function(){return H.bd(function(a){return{func:1,args:[a]}},this.b,"a5")}},
fK:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fL:{
"^":"d:2;",
$1:function(a){}},
fN:{
"^":"d:0;a",
$0:function(){this.a.Z(null)}},
fO:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
fP:{
"^":"d:0;a,b",
$0:function(){this.b.Z(this.a.a)}},
fQ:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bd(function(a){return{func:1,args:[a]}},this.a,"a5")}},
fR:{
"^":"d:0;a,b",
$0:function(){this.b.Z(this.a)}},
fJ:{
"^":"b;"},
k7:{
"^":"b;"},
hr:{
"^":"b;a3:d<,at:e?",
bl:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c7()
if((z&4)===0&&(this.e&32)===0)this.bQ(this.gbV())},
J:function(a){return this.bl(a,null)},
cq:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gL(z)}else z=!1
if(z)this.r.aL(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bQ(this.gbX())}}}},
b9:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aR()
return this.f},
aR:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c7()
if((this.e&32)===0)this.r=null
this.f=this.bU()},
aQ:["cZ",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.c0(a)
else this.aP(new P.hw(a,null))}],
aN:["d_",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.c2(a,b)
else this.aP(new P.hy(a,b,null))}],
dd:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.c1()
else this.aP(C.l)},
bW:[function(){},"$0","gbV",0,0,1],
bY:[function(){},"$0","gbX",0,0,1],
bU:function(){return},
aP:function(a){var z,y
z=this.r
if(z==null){z=new P.i5(null,null,0)
this.r=z}z.a4(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aL(this)}},
c0:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.br(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aS((z&4)!==0)},
c2:function(a,b){var z,y
z=this.e
y=new P.ht(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aR()
z=this.f
if(!!J.l(z).$isP)z.by(y)
else y.$0()}else{y.$0()
this.aS((z&4)!==0)}},
c1:function(){var z,y
z=new P.hs(this)
this.aR()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isP)y.by(z)
else z.$0()},
bQ:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aS((z&4)!==0)},
aS:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gL(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gL(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bW()
else this.bY()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aL(this)},
d8:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dn(b,z)
this.c=c}},
ht:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aP()
x=H.am(x,[x,x]).a_(y)
w=z.d
v=this.b
u=z.b
if(x)w.eR(u,v,this.c)
else w.br(u,v)
z.e=(z.e&4294967263)>>>0}},
hs:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cs(z.c)
z.e=(z.e&4294967263)>>>0}},
df:{
"^":"b;ax:a@"},
hw:{
"^":"df;b,a",
bm:function(a){a.c0(this.b)}},
hy:{
"^":"df;ai:b>,T:c<,a",
bm:function(a){a.c2(this.b,this.c)}},
hx:{
"^":"b;",
bm:function(a){a.c1()},
gax:function(){return},
sax:function(a){throw H.e(new P.af("No events after a done."))}},
hZ:{
"^":"b;at:a?",
aL:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dK(new P.i_(this,a))
this.a=1},
c7:function(){if(this.a===1)this.a=3}},
i_:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.en(this.b)}},
i5:{
"^":"hZ;b,c,a",
gL:function(a){return this.c==null},
a4:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sax(b)
this.c=b}},
en:function(a){var z,y
z=this.b
y=z.gax()
this.b=y
if(y==null)this.c=null
z.bm(a)}},
dl:{
"^":"b;a,b,c,at:d?",
bH:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
f4:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.Z(!0)
return}this.a.J(0)
this.c=a
this.d=3},"$1","gdz",2,0,function(){return H.bd(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dl")}],
dC:[function(a,b){var z
if(this.d===2){z=this.c
this.bH(0)
z.H(a,b)
return}this.a.J(0)
this.c=new P.a_(a,b)
this.d=4},function(a){return this.dC(a,null)},"f6","$2","$1","gdB",2,2,17,0],
f5:[function(){if(this.d===2){var z=this.c
this.bH(0)
z.Z(!1)
return}this.a.J(0)
this.c=null
this.d=5},"$0","gdA",0,0,1]},
ie:{
"^":"d:0;a,b,c",
$0:function(){return this.a.H(this.b,this.c)}},
id:{
"^":"d:5;a,b",
$2:function(a,b){return P.ib(this.a,this.b,a,b)}},
bS:{
"^":"a5;",
X:function(a,b,c,d){return this.dk(a,d,c,!0===b)},
cj:function(a,b,c){return this.X(a,null,b,c)},
dk:function(a,b,c,d){return P.hC(this,a,b,c,d,H.O(this,"bS",0),H.O(this,"bS",1))},
bR:function(a,b){b.aQ(a)},
$asa5:function(a,b){return[b]}},
dg:{
"^":"hr;x,y,a,b,c,d,e,f,r",
aQ:function(a){if((this.e&2)!==0)return
this.cZ(a)},
aN:function(a,b){if((this.e&2)!==0)return
this.d_(a,b)},
bW:[function(){var z=this.y
if(z==null)return
z.J(0)},"$0","gbV",0,0,1],
bY:[function(){var z=this.y
if(z==null)return
z.cq()},"$0","gbX",0,0,1],
bU:function(){var z=this.y
if(z!=null){this.y=null
return z.b9()}return},
f1:[function(a){this.x.bR(a,this)},"$1","gdq",2,0,function(){return H.bd(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"dg")}],
f3:[function(a,b){this.aN(a,b)},"$2","gds",4,0,18],
f2:[function(){this.dd()},"$0","gdr",0,0,1],
d9:function(a,b,c,d,e,f,g){var z,y
z=this.gdq()
y=this.gds()
this.y=this.x.a.cj(z,this.gdr(),y)},
static:{hC:function(a,b,c,d,e,f,g){var z=$.j
z=H.a(new P.dg(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.d8(b,c,d,e)
z.d9(a,b,c,d,e,f,g)
return z}}},
hX:{
"^":"bS;b,a",
bR:function(a,b){var z,y,x,w,v
z=null
try{z=this.dI(a)}catch(w){v=H.B(w)
y=v
x=H.y(w)
$.j.toString
b.aN(y,x)
return}b.aQ(z)},
dI:function(a){return this.b.$1(a)}},
a_:{
"^":"b;ai:a>,T:b<",
i:function(a){return H.c(this.a)},
$isD:1},
i7:{
"^":"b;"},
im:{
"^":"d:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bG()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
P.il(z,y)}},
i1:{
"^":"i7;",
gbd:function(){return this},
cs:function(a){var z,y,x,w
try{if(C.c===$.j){x=a.$0()
return x}x=P.dp(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.aO(null,null,this,z,y)}},
br:function(a,b){var z,y,x,w
try{if(C.c===$.j){x=a.$1(b)
return x}x=P.dr(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.aO(null,null,this,z,y)}},
eR:function(a,b,c){var z,y,x,w
try{if(C.c===$.j){x=a.$2(b,c)
return x}x=P.dq(null,null,this,a,b,c)
return x}catch(w){x=H.B(w)
z=x
y=H.y(w)
return P.aO(null,null,this,z,y)}},
b7:function(a,b){if(b)return new P.i2(this,a)
else return new P.i3(this,a)},
dO:function(a,b){return new P.i4(this,a)},
h:function(a,b){return},
cr:function(a){if($.j===C.c)return a.$0()
return P.dp(null,null,this,a)},
bq:function(a,b){if($.j===C.c)return a.$1(b)
return P.dr(null,null,this,a,b)},
eQ:function(a,b,c){if($.j===C.c)return a.$2(b,c)
return P.dq(null,null,this,a,b,c)}},
i2:{
"^":"d:0;a,b",
$0:function(){return this.a.cs(this.b)}},
i3:{
"^":"d:0;a,b",
$0:function(){return this.a.cr(this.b)}},
i4:{
"^":"d:2;a,b",
$1:function(a){return this.a.br(this.b,a)}}}],["","",,P,{
"^":"",
aJ:function(){return H.a(new H.a1(0,null,null,null,null,null,0),[null,null])},
ad:function(a){return H.dz(a,H.a(new H.a1(0,null,null,null,null,null,0),[null,null]))},
fb:function(a,b,c){var z,y
if(P.bX(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ay()
y.push(a)
try{P.ij(a,z)}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=P.cU(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aY:function(a,b,c){var z,y,x
if(P.bX(a))return b+"..."+c
z=new P.bI(b)
y=$.$get$ay()
y.push(a)
try{x=z
x.a=P.cU(x.ga2(),a,", ")}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=z
y.a=y.ga2()+c
y=z.ga2()
return y.charCodeAt(0)==0?y:y},
bX:function(a){var z,y
for(z=0;y=$.$get$ay(),z<y.length;++z)if(a===y[z])return!0
return!1},
ij:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gE(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.p())return
w=H.c(z.gw())
b.push(w)
y+=w.length+2;++x}if(!z.p()){if(x<=5)return
if(0>=b.length)return H.h(b,-1)
v=b.pop()
if(0>=b.length)return H.h(b,-1)
u=b.pop()}else{t=z.gw();++x
if(!z.p()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.h(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gw();++x
for(;z.p();t=s,s=r){r=z.gw();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ar:function(a,b,c,d){return H.a(new P.hR(0,null,null,null,null,null,0),[d])},
cE:function(a){var z,y,x
z={}
if(P.bX(a))return"{...}"
y=new P.bI("")
try{$.$get$ay().push(a)
x=y
x.a=x.ga2()+"{"
z.a=!0
J.e7(a,new P.fv(z,y))
z=y
z.a=z.ga2()+"}"}finally{z=$.$get$ay()
if(0>=z.length)return H.h(z,-1)
z.pop()}z=y.ga2()
return z.charCodeAt(0)==0?z:z},
dj:{
"^":"a1;a,b,c,d,e,f,r",
ak:function(a){return H.iQ(a)&0x3ffffff},
al:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcd()
if(x==null?b==null:x===b)return y}return-1},
static:{av:function(a,b){return H.a(new P.dj(0,null,null,null,null,null,0),[a,b])}}},
hR:{
"^":"hP;a,b,c,d,e,f,r",
gE:function(a){var z=new P.cB(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dZ:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.di(b)},
di:function(a){var z=this.d
if(z==null)return!1
return this.ar(z[this.aq(a)],a)>=0},
ck:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dZ(0,a)?a:null
else return this.dw(a)},
dw:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aq(a)]
x=this.ar(y,a)
if(x<0)return
return J.c4(y,x).gbN()},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.K(this))
z=z.b}},
a4:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bI(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bI(x,b)}else return this.U(b)},
U:function(a){var z,y,x
z=this.d
if(z==null){z=P.hS()
this.d=z}y=this.aq(a)
x=z[y]
if(x==null)z[y]=[this.aT(a)]
else{if(this.ar(x,a)>=0)return!1
x.push(this.aT(a))}return!0},
a8:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bJ(this.c,b)
else return this.dF(b)},
dF:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aq(a)]
x=this.ar(y,a)
if(x<0)return!1
this.bK(y.splice(x,1)[0])
return!0},
S:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bI:function(a,b){if(a[b]!=null)return!1
a[b]=this.aT(b)
return!0},
bJ:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bK(z)
delete a[b]
return!0},
aT:function(a){var z,y
z=new P.fr(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bK:function(a){var z,y
z=a.gdh()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aq:function(a){return J.C(a)&0x3ffffff},
ar:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Z(a[y].gbN(),b))return y
return-1},
$isq:1,
static:{hS:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fr:{
"^":"b;bN:a<,b,dh:c<"},
cB:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.K(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hP:{
"^":"fG;"},
by:{
"^":"b;",
gE:function(a){return new H.cC(a,this.gj(a),0,null)},
V:function(a,b){return this.h(a,b)},
G:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.K(a))}},
a7:function(a,b){return H.a(new H.bB(a,b),[null,null])},
i:function(a){return P.aY(a,"[","]")},
$isk:1,
$ask:null,
$isq:1},
fv:{
"^":"d:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.c(a)
z.a=y+": "
z.a+=H.c(b)}},
fs:{
"^":"L;a,b,c,d",
gE:function(a){return new P.hT(this,this.c,this.d,this.b,null)},
G:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.z(new P.K(this))}},
gL:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
S:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aY(this,"{","}")},
cp:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bu());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
U:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bP();++this.d},
bP:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.a(z,[H.w(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bC(y,0,w,z,x)
C.b.bC(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
d3:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.a(z,[b])},
$isq:1,
static:{bz:function(a,b){var z=H.a(new P.fs(null,0,0,0),[b])
z.d3(a,b)
return z}}},
hT:{
"^":"b;a,b,c,d,e",
gw:function(){return this.e},
p:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.z(new P.K(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fH:{
"^":"b;",
a7:function(a,b){return H.a(new H.ct(this,b),[H.w(this,0),null])},
i:function(a){return P.aY(this,"{","}")},
G:function(a,b){var z
for(z=this.gE(this);z.p();)b.$1(z.d)},
$isq:1},
fG:{
"^":"fH;"}}],["","",,P,{
"^":"",
cu:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ap(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eP(a)},
eP:function(a){var z=J.l(a)
if(!!z.$isd)return z.i(a)
return H.b3(a)},
aX:function(a){return new P.hB(a)},
ft:function(a,b,c){var z=J.fe(a,c)
if(a!==0);return z},
bA:function(a,b,c){var z,y
z=H.a([],[c])
for(y=J.bn(a);y.p();)z.push(y.gw())
return z},
az:function(a){var z=H.c(a)
H.dI(z)},
bY:{
"^":"b;"},
"+bool":0,
bq:{
"^":"b;a,b",
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.bq))return!1
return this.a===b.a&&this.b===b.b},
gq:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.eJ(z?H.E(this).getUTCFullYear()+0:H.E(this).getFullYear()+0)
x=P.aC(z?H.E(this).getUTCMonth()+1:H.E(this).getMonth()+1)
w=P.aC(z?H.E(this).getUTCDate()+0:H.E(this).getDate()+0)
v=P.aC(z?H.E(this).getUTCHours()+0:H.E(this).getHours()+0)
u=P.aC(z?H.E(this).getUTCMinutes()+0:H.E(this).getMinutes()+0)
t=P.aC(z?H.E(this).getUTCSeconds()+0:H.E(this).getSeconds()+0)
s=P.eK(H.cL(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
d1:function(a,b){if(Math.abs(a)>864e13)throw H.e(P.aU(a))},
static:{eI:function(a,b){var z=new P.bq(a,b)
z.d1(a,b)
return z},eJ:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.c(z)
if(z>=10)return y+"00"+H.c(z)
return y+"000"+H.c(z)},eK:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aC:function(a){if(a>=10)return""+a
return"0"+a}}},
aa:{
"^":"aQ;"},
"+double":0,
aD:{
"^":"b;a",
k:function(a,b){return new P.aD(C.d.k(this.a,b.gdm()))},
aK:function(a,b){return C.d.aK(this.a,b.gdm())},
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.aD))return!1
return this.a===b.a},
gq:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eO()
y=this.a
if(y<0)return"-"+new P.aD(-y).i(0)
x=z.$1(C.d.bn(C.d.af(y,6e7),60))
w=z.$1(C.d.bn(C.d.af(y,1e6),60))
v=new P.eN().$1(C.d.bn(y,1e6))
return""+C.d.af(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)}},
eN:{
"^":"d:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eO:{
"^":"d:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
D:{
"^":"b;",
gT:function(){return H.y(this.$thrownJsError)}},
bG:{
"^":"D;",
i:function(a){return"Throw of null."}},
ab:{
"^":"D;a,b,c,d",
gaW:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaV:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.c(z)+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gaW()+y+x
if(!this.a)return w
v=this.gaV()
u=P.cu(this.b)
return w+v+": "+H.c(u)},
static:{aU:function(a){return new P.ab(!1,null,null,a)},cg:function(a,b,c){return new P.ab(!0,a,b,c)}}},
cP:{
"^":"ab;e,f,a,b,c,d",
gaW:function(){return"RangeError"},
gaV:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else{if(typeof x!=="number")return x.eY()
if(typeof z!=="number")return H.S(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
P:function(a){return this.e.$0()},
static:{b4:function(a,b,c){return new P.cP(null,null,!0,a,b,"Value not in range")},ae:function(a,b,c,d,e){return new P.cP(b,c,!0,a,d,"Invalid value")},cQ:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.ae(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.ae(b,a,c,"end",f))
return b}}},
f_:{
"^":"ab;e,j:f>,a,b,c,d",
gcQ:function(a){return 0},
gaW:function(){return"RangeError"},
gaV:function(){if(J.dO(this.b,0))return": index must not be negative"
var z=this.f
if(J.Z(z,0))return": no indices are valid"
return": index should be less than "+H.c(z)},
P:function(a){return this.gcQ(this).$0()},
static:{bt:function(a,b,c,d,e){var z=e!=null?e:J.aB(b)
return new P.f_(b,z,!0,a,c,"Index out of range")}}},
M:{
"^":"D;a",
i:function(a){return"Unsupported operation: "+this.a}},
bP:{
"^":"D;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
af:{
"^":"D;a",
i:function(a){return"Bad state: "+this.a}},
K:{
"^":"D;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.cu(z))+"."}},
cT:{
"^":"b;",
i:function(a){return"Stack Overflow"},
gT:function(){return},
$isD:1},
eH:{
"^":"D;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hB:{
"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
eQ:{
"^":"b;a",
i:function(a){return"Expando:"+H.c(this.a)},
h:function(a,b){var z=H.b2(b,"expando$values")
return z==null?null:H.b2(z,this.bO())},
u:function(a,b,c){var z=H.b2(b,"expando$values")
if(z==null){z=new P.b()
H.bH(b,"expando$values",z)}H.bH(z,this.bO(),c)},
bO:function(){var z,y
z=H.b2(this,"expando$key")
if(z==null){y=$.cv
$.cv=y+1
z="expando$key$"+y
H.bH(this,"expando$key",z)}return z}},
eS:{
"^":"b;"},
n:{
"^":"aQ;"},
"+int":0,
L:{
"^":"b;",
a7:function(a,b){return H.b1(this,b,H.O(this,"L",0),null)},
G:function(a,b){var z
for(z=this.gE(this);z.p();)b.$1(z.gw())},
bt:function(a,b){return P.bA(this,!0,H.O(this,"L",0))},
bs:function(a){return this.bt(a,!0)},
gj:function(a){var z,y
z=this.gE(this)
for(y=0;z.p();)++y
return y},
V:function(a,b){var z,y,x
if(b<0)H.z(P.ae(b,0,null,"index",null))
for(z=this.gE(this),y=0;z.p();){x=z.gw()
if(b===y)return x;++y}throw H.e(P.bt(b,this,"index",null,y))},
i:function(a){return P.fb(this,"(",")")}},
fd:{
"^":"b;"},
k:{
"^":"b;",
$ask:null,
$isq:1},
"+List":0,
jK:{
"^":"b;",
i:function(a){return"null"}},
"+Null":0,
aQ:{
"^":"b;"},
"+num":0,
b:{
"^":";",
l:function(a,b){return this===b},
gq:function(a){return H.a3(this)},
i:function(a){return H.b3(this)},
toString:function(){return this.i(this)}},
a4:{
"^":"b;"},
R:{
"^":"b;"},
"+String":0,
bI:{
"^":"b;a2:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cU:function(a,b,c){var z=J.bn(b)
if(!z.p())return a
if(c.length===0){do a+=H.c(z.gw())
while(z.p())}else{a+=H.c(z.gw())
for(;z.p();)a=a+c+H.c(z.gw())}return a}}}}],["","",,W,{
"^":"",
eG:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.w)},
a8:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dh:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dm:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hv(a)
if(!!J.l(z).$isH)return z
return}else return a},
ii:function(a){var z
if(!!J.l(a).$isbr)return a
z=new P.hk([],[],!1)
z.c=!0
return z.bx(a)},
G:function(a){var z=$.j
if(z===C.c)return a
return z.dO(a,!0)},
A:{
"^":"aE;",
$isA:1,
$isb:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iY:{
"^":"A;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
j_:{
"^":"A;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
j1:{
"^":"A;",
$isH:1,
$isf:1,
"%":"HTMLBodyElement"},
j2:{
"^":"A;n:height},t:width}",
bz:function(a,b,c){return a.getContext(b,P.iv(c,null))},
cD:function(a,b,c,d,e,f,g){var z,y
z=P.ad(["alpha",!0,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.bz(a,"webgl",z)
return y==null?this.bz(a,"experimental-webgl",z):y},
cC:function(a,b){return this.cD(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
j4:{
"^":"aK;j:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
j5:{
"^":"f0;j:length=",
bB:function(a,b,c,d){var z=this.df(a,b)
a.setProperty(z,c,d)
return},
df:function(a,b){var z,y
z=$.$get$cl()
y=z[b]
if(typeof y==="string")return y
y=W.eG(b) in a?b:P.eL()+b
z[b]=y
return y},
sn:function(a,b){a.height=b},
st:function(a,b){a.width=b},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
f0:{
"^":"f+eF;"},
eF:{
"^":"b;",
sn:function(a,b){this.bB(a,"height",b,"")},
st:function(a,b){this.bB(a,"width",b,"")}},
br:{
"^":"aK;",
gay:function(a){return H.a(new W.r(a,"mousedown",!1),[null])},
gaz:function(a){return H.a(new W.r(a,"mouseenter",!1),[null])},
gaA:function(a){return H.a(new W.r(a,"mouseleave",!1),[null])},
gaB:function(a){return H.a(new W.r(a,"mousemove",!1),[null])},
gaC:function(a){return H.a(new W.r(a,"mouseout",!1),[null])},
gaD:function(a){return H.a(new W.r(a,"mouseover",!1),[null])},
gaE:function(a){return H.a(new W.r(a,"mouseup",!1),[null])},
gbi:function(a){return H.a(new W.r(a,"touchcancel",!1),[null])},
gaG:function(a){return H.a(new W.r(a,"touchend",!1),[null])},
gbj:function(a){return H.a(new W.r(a,"touchmove",!1),[null])},
gaH:function(a){return H.a(new W.r(a,"touchstart",!1),[null])},
e3:function(a,b,c){return a.createElement(b)},
e2:function(a,b){return this.e3(a,b,null)},
$isbr:1,
"%":"XMLDocument;Document"},
j6:{
"^":"aK;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
j7:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
eM:{
"^":"f;b8:bottom=,n:height=,M:left=,bo:right=,ab:top=,t:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(this.gt(a))+" x "+H.c(this.gn(a))},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isX)return!1
y=a.left
x=z.gM(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=this.gt(a)
x=z.gt(b)
if(y==null?x==null:y===x){y=this.gn(a)
z=z.gn(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gq:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(this.gt(a))
w=J.C(this.gn(a))
return W.dh(W.a8(W.a8(W.a8(W.a8(0,z),y),x),w))},
gbu:function(a){return H.a(new P.I(a.left,a.top),[null])},
$isX:1,
$asX:I.bf,
"%":";DOMRectReadOnly"},
aE:{
"^":"aK;",
gI:function(a){return P.fB(C.a.F(a.offsetLeft),C.a.F(a.offsetTop),C.a.F(a.offsetWidth),C.a.F(a.offsetHeight),null)},
i:function(a){return a.localName},
geH:function(a){return C.a.F(a.offsetLeft)},
geI:function(a){return C.a.F(a.offsetTop)},
cB:function(a){return a.getBoundingClientRect()},
gay:function(a){return H.a(new W.u(a,"mousedown",!1),[null])},
gaz:function(a){return H.a(new W.u(a,"mouseenter",!1),[null])},
gaA:function(a){return H.a(new W.u(a,"mouseleave",!1),[null])},
gaB:function(a){return H.a(new W.u(a,"mousemove",!1),[null])},
gaC:function(a){return H.a(new W.u(a,"mouseout",!1),[null])},
gaD:function(a){return H.a(new W.u(a,"mouseover",!1),[null])},
gaE:function(a){return H.a(new W.u(a,"mouseup",!1),[null])},
gbi:function(a){return H.a(new W.u(a,"touchcancel",!1),[null])},
gaG:function(a){return H.a(new W.u(a,"touchend",!1),[null])},
geJ:function(a){return H.a(new W.u(a,"touchenter",!1),[null])},
geK:function(a){return H.a(new W.u(a,"touchleave",!1),[null])},
gbj:function(a){return H.a(new W.u(a,"touchmove",!1),[null])},
gaH:function(a){return H.a(new W.u(a,"touchstart",!1),[null])},
$isaE:1,
$isf:1,
$isH:1,
"%":";Element"},
j8:{
"^":"A;n:height},t:width}",
"%":"HTMLEmbedElement"},
j9:{
"^":"aW;ai:error=",
"%":"ErrorEvent"},
aW:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
H:{
"^":"f;",
dc:function(a,b,c,d){return a.addEventListener(b,H.V(c,1),!1)},
dG:function(a,b,c,d){return a.removeEventListener(b,H.V(c,1),!1)},
$isH:1,
"%":"AudioBufferSourceNode|AudioDestinationNode|AudioNode|AudioSourceNode|MediaStream;EventTarget"},
jr:{
"^":"A;j:length=",
"%":"HTMLFormElement"},
eW:{
"^":"br;",
"%":"HTMLDocument"},
eX:{
"^":"eY;",
f9:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
eL:function(a,b,c){return a.open(b,c)},
aM:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
eY:{
"^":"H;",
"%":";XMLHttpRequestEventTarget"},
js:{
"^":"A;n:height},t:width}",
"%":"HTMLIFrameElement"},
jt:{
"^":"A;n:height},t:width}",
a5:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
jv:{
"^":"A;n:height},t:width}",
$isaE:1,
$isf:1,
$isH:1,
"%":"HTMLInputElement"},
fw:{
"^":"A;ai:error=",
J:function(a){return a.pause()},
"%":"HTMLAudioElement;HTMLMediaElement"},
bC:{
"^":"db;",
gI:function(a){var z,y,x
if(!!a.offsetX)return H.a(new P.I(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.l(W.dm(z)).$isaE)throw H.e(new P.M("offsetX is only supported on elements"))
y=W.dm(z)
x=H.a(new P.I(a.clientX,a.clientY),[null]).Y(0,J.el(J.en(y)))
return H.a(new P.I(J.ce(x.a),J.ce(x.b)),[null])}},
$isbC:1,
$isb:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jJ:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aK:{
"^":"H;",
i:function(a){var z=a.nodeValue
return z==null?this.cV(a):z},
"%":"Attr;Node"},
jL:{
"^":"A;",
P:function(a){return a.start.$0()},
"%":"HTMLOListElement"},
jM:{
"^":"A;n:height},t:width}",
"%":"HTMLObjectElement"},
aL:{
"^":"aW;",
$isaL:1,
$isb:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
jQ:{
"^":"A;j:length=",
"%":"HTMLSelectElement"},
jR:{
"^":"aW;ai:error=",
"%":"SpeechRecognitionError"},
bN:{
"^":"f;",
$isb:1,
"%":"Touch"},
bO:{
"^":"db;dT:changedTouches=",
$isbO:1,
$isb:1,
"%":"TouchEvent"},
jW:{
"^":"f2;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bt(b,a,null,null,null))
return a[b]},
u:function(a,b,c){throw H.e(new P.M("Cannot assign element of immutable List."))},
V:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isk:1,
$ask:function(){return[W.bN]},
$isq:1,
$isb0:1,
$isaZ:1,
"%":"TouchList"},
f1:{
"^":"f+by;",
$isk:1,
$ask:function(){return[W.bN]},
$isq:1},
f2:{
"^":"f1+eZ;",
$isk:1,
$ask:function(){return[W.bN]},
$isq:1},
db:{
"^":"aW;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
jY:{
"^":"fw;n:height},t:width}",
"%":"HTMLVideoElement"},
k0:{
"^":"H;",
gay:function(a){return H.a(new W.r(a,"mousedown",!1),[null])},
gaz:function(a){return H.a(new W.r(a,"mouseenter",!1),[null])},
gaA:function(a){return H.a(new W.r(a,"mouseleave",!1),[null])},
gaB:function(a){return H.a(new W.r(a,"mousemove",!1),[null])},
gaC:function(a){return H.a(new W.r(a,"mouseout",!1),[null])},
gaD:function(a){return H.a(new W.r(a,"mouseover",!1),[null])},
gaE:function(a){return H.a(new W.r(a,"mouseup",!1),[null])},
gbi:function(a){return H.a(new W.r(a,"touchcancel",!1),[null])},
gaG:function(a){return H.a(new W.r(a,"touchend",!1),[null])},
gbj:function(a){return H.a(new W.r(a,"touchmove",!1),[null])},
gaH:function(a){return H.a(new W.r(a,"touchstart",!1),[null])},
$isf:1,
$isH:1,
"%":"DOMWindow|Window"},
k4:{
"^":"f;b8:bottom=,n:height=,M:left=,bo:right=,ab:top=,t:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isX)return!1
y=a.left
x=z.gM(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=a.width
x=z.gt(b)
if(y==null?x==null:y===x){y=a.height
z=z.gn(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gq:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(a.width)
w=J.C(a.height)
return W.dh(W.a8(W.a8(W.a8(W.a8(0,z),y),x),w))},
gbu:function(a){return H.a(new P.I(a.left,a.top),[null])},
$isX:1,
$asX:I.bf,
"%":"ClientRect"},
k5:{
"^":"aK;",
$isf:1,
"%":"DocumentType"},
k6:{
"^":"eM;",
gn:function(a){return a.height},
sn:function(a,b){a.height=b},
gt:function(a){return a.width},
st:function(a,b){a.width=b},
"%":"DOMRect"},
k9:{
"^":"A;",
$isH:1,
$isf:1,
"%":"HTMLFrameSetElement"},
r:{
"^":"a5;a,b,c",
X:function(a,b,c,d){var z=new W.F(0,this.a,this.b,W.G(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.C()
return z},
ci:function(a){return this.X(a,null,null,null)},
cj:function(a,b,c){return this.X(a,null,b,c)}},
u:{
"^":"r;a,b,c"},
F:{
"^":"fJ;a,b,c,d,e",
b9:function(){if(this.b==null)return
this.c4()
this.b=null
this.d=null
return},
bl:function(a,b){if(this.b==null)return;++this.a
this.c4()},
J:function(a){return this.bl(a,null)},
cq:function(){if(this.b==null||this.a<=0)return;--this.a
this.C()},
C:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dQ(x,this.c,z,!1)}},
c4:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dR(x,this.c,z,!1)}}},
eZ:{
"^":"b;",
gE:function(a){return new W.eR(a,this.gj(a),-1,null)},
$isk:1,
$ask:null,
$isq:1},
eR:{
"^":"b;a,b,c,d",
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c4(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gw:function(){return this.d}},
hu:{
"^":"b;a",
$isH:1,
$isf:1,
static:{hv:function(a){if(a===window)return a
else return new W.hu(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iW:{
"^":"aF;",
$isf:1,
"%":"SVGAElement"},
iX:{
"^":"fS;",
$isf:1,
"%":"SVGAltGlyphElement"},
iZ:{
"^":"o;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
ja:{
"^":"o;",
$isf:1,
"%":"SVGFEBlendElement"},
jb:{
"^":"o;",
$isf:1,
"%":"SVGFEColorMatrixElement"},
jc:{
"^":"o;",
$isf:1,
"%":"SVGFEComponentTransferElement"},
jd:{
"^":"o;",
$isf:1,
"%":"SVGFECompositeElement"},
je:{
"^":"o;",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
jf:{
"^":"o;",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
jg:{
"^":"o;",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
jh:{
"^":"o;",
$isf:1,
"%":"SVGFEFloodElement"},
ji:{
"^":"o;",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
jj:{
"^":"o;",
$isf:1,
"%":"SVGFEImageElement"},
jk:{
"^":"o;",
$isf:1,
"%":"SVGFEMergeElement"},
jl:{
"^":"o;",
$isf:1,
"%":"SVGFEMorphologyElement"},
jm:{
"^":"o;",
$isf:1,
"%":"SVGFEOffsetElement"},
jn:{
"^":"o;",
$isf:1,
"%":"SVGFESpecularLightingElement"},
jo:{
"^":"o;",
$isf:1,
"%":"SVGFETileElement"},
jp:{
"^":"o;",
$isf:1,
"%":"SVGFETurbulenceElement"},
jq:{
"^":"o;",
$isf:1,
"%":"SVGFilterElement"},
aF:{
"^":"o;",
$isf:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
ju:{
"^":"aF;",
$isf:1,
"%":"SVGImageElement"},
jy:{
"^":"o;",
$isf:1,
"%":"SVGMarkerElement"},
jz:{
"^":"o;",
$isf:1,
"%":"SVGMaskElement"},
jN:{
"^":"o;",
$isf:1,
"%":"SVGPatternElement"},
jP:{
"^":"o;",
$isf:1,
"%":"SVGScriptElement"},
o:{
"^":"aE;",
gay:function(a){return H.a(new W.u(a,"mousedown",!1),[null])},
gaz:function(a){return H.a(new W.u(a,"mouseenter",!1),[null])},
gaA:function(a){return H.a(new W.u(a,"mouseleave",!1),[null])},
gaB:function(a){return H.a(new W.u(a,"mousemove",!1),[null])},
gaC:function(a){return H.a(new W.u(a,"mouseout",!1),[null])},
gaD:function(a){return H.a(new W.u(a,"mouseover",!1),[null])},
gaE:function(a){return H.a(new W.u(a,"mouseup",!1),[null])},
$isH:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jT:{
"^":"aF;",
$isf:1,
"%":"SVGSVGElement"},
jU:{
"^":"o;",
$isf:1,
"%":"SVGSymbolElement"},
cW:{
"^":"aF;",
"%":";SVGTextContentElement"},
jV:{
"^":"cW;",
$isf:1,
"%":"SVGTextPathElement"},
fS:{
"^":"cW;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jX:{
"^":"aF;",
$isf:1,
"%":"SVGUseElement"},
jZ:{
"^":"o;",
$isf:1,
"%":"SVGViewElement"},
k8:{
"^":"o;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
ka:{
"^":"o;",
$isf:1,
"%":"SVGCursorElement"},
kb:{
"^":"o;",
$isf:1,
"%":"SVGFEDropShadowElement"},
kc:{
"^":"o;",
$isf:1,
"%":"SVGGlyphRefElement"},
kd:{
"^":"o;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":"",
ch:{
"^":"f;j:length=",
$isb:1,
"%":"AudioBuffer"},
j0:{
"^":"H;",
dl:function(a,b,c,d){return a.decodeAudioData(b,H.V(c,1),H.V(d,1))},
e6:function(a,b){var z=H.a(new P.bQ(H.a(new P.v(0,$.j,null),[P.ch])),[P.ch])
this.dl(a,b,new P.ew(z),new P.ex(z))
return z.a},
"%":"AudioContext|OfflineAudioContext|webkitAudioContext"},
ew:{
"^":"d:2;a",
$1:function(a){this.a.a5(0,a)}},
ex:{
"^":"d:2;a",
$1:function(a){var z=this.a
if(a==null)z.au("")
else z.au(a)}}}],["","",,P,{
"^":"",
jO:{
"^":"f;",
dM:function(a,b,c){return a.bindBuffer(b,c)},
dN:function(a,b,c){return a.bindTexture(b,c)},
dP:function(a,b){return a.blendEquation(b)},
dQ:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dR:function(a,b,c,d){return a.bufferData(b,c,d)},
dU:function(a,b){return a.clear(b)},
dV:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dW:function(a,b){return a.clearDepth(b)},
dX:function(a,b){return a.clearStencil(b)},
dY:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
e1:function(a){return a.createBuffer()},
e4:function(a){return a.createProgram()},
e5:function(a,b){return a.createShader(b)},
e7:function(a,b){return a.depthFunc(b)},
e8:function(a,b){return a.depthMask(b)},
ef:function(a,b){return a.disableVertexAttribArray(b)},
eg:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
eh:function(a,b){return a.enable(b)},
ei:function(a,b){return a.enableVertexAttribArray(b)},
cA:function(a,b,c){return a.getAttribLocation(b,c)},
cF:function(a,b){return a.getParameter(b)},
cG:function(a,b,c){return a.getUniformLocation(b,c)},
cR:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cS:function(a,b,c,d){return a.stencilOp(b,c,d)},
eV:function(a,b){return a.useProgram(b)},
eW:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
j3:{
"^":"b;"}}],["","",,P,{
"^":"",
au:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
di:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
I:{
"^":"b;A:a>,D:b>",
i:function(a){return"Point("+H.c(this.a)+", "+H.c(this.b)+")"},
l:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.I))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gq:function(a){var z,y
z=J.C(this.a)
y=J.C(this.b)
return P.di(P.au(P.au(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gA(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gD(b)
if(typeof z!=="number")return z.k()
y=new P.I(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
Y:function(a,b){var z,y,x,w
z=this.a
y=J.em(b)
if(typeof z!=="number")return z.Y()
if(typeof y!=="number")return H.S(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.Y()
if(typeof w!=="number")return H.S(w)
w=new P.I(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
i0:{
"^":"b;",
gbo:function(a){return this.gM(this)+this.c},
gb8:function(a){return this.gab(this)+this.d},
i:function(a){return"Rectangle ("+this.gM(this)+", "+this.b+") "+this.c+" x "+this.d},
l:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isX)return!1
if(this.gM(this)===z.gM(b)){y=this.b
z=y===z.gab(b)&&this.a+this.c===z.gbo(b)&&y+this.d===z.gb8(b)}else z=!1
return z},
gq:function(a){var z=this.b
return P.di(P.au(P.au(P.au(P.au(0,this.gM(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbu:function(a){var z=new P.I(this.gM(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
X:{
"^":"i0;M:a>,ab:b>,t:c>,n:d>",
$asX:null,
static:{fB:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.a(new P.X(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
m:function(a){return a},
bc:function(a){return a},
cF:{
"^":"f;",
$iscF:1,
"%":"ArrayBuffer"},
bF:{
"^":"f;",
$isbF:1,
"%":"DataView;ArrayBufferView;bD|cG|cI|bE|cH|cJ|a2"},
bD:{
"^":"bF;",
gj:function(a){return a.length},
$isb0:1,
$isaZ:1},
bE:{
"^":"cI;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
a[b]=c}},
cG:{
"^":"bD+by;",
$isk:1,
$ask:function(){return[P.aa]},
$isq:1},
cI:{
"^":"cG+cw;"},
a2:{
"^":"cJ;",
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
a[b]=c},
$isk:1,
$ask:function(){return[P.n]},
$isq:1},
cH:{
"^":"bD+by;",
$isk:1,
$ask:function(){return[P.n]},
$isq:1},
cJ:{
"^":"cH+cw;"},
jA:{
"^":"bE;",
$isk:1,
$ask:function(){return[P.aa]},
$isq:1,
"%":"Float32Array"},
jB:{
"^":"bE;",
$isk:1,
$ask:function(){return[P.aa]},
$isq:1,
"%":"Float64Array"},
jC:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$isq:1,
"%":"Int16Array"},
jD:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$isq:1,
"%":"Int32Array"},
jE:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$isq:1,
"%":"Int8Array"},
jF:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$isq:1,
"%":"Uint16Array"},
jG:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$isq:1,
"%":"Uint32Array"},
jH:{
"^":"a2;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$isq:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jI:{
"^":"a2;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.n]},
$isq:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dI:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
iv:function(a,b){var z={}
a.G(0,new P.iw(z))
return z},
ix:function(a){var z=H.a(new P.bQ(H.a(new P.v(0,$.j,null),[null])),[null])
a.then(H.V(new P.iy(z),1)).catch(H.V(new P.iz(z),1))
return z.a},
cr:function(){var z=$.cq
if(z==null){z=J.bl(window.navigator.userAgent,"Opera",0)
$.cq=z}return z},
eL:function(){var z,y
z=$.cn
if(z!=null)return z
y=$.co
if(y==null){y=J.bl(window.navigator.userAgent,"Firefox",0)
$.co=y}if(y===!0)z="-moz-"
else{y=$.cp
if(y==null){y=P.cr()!==!0&&J.bl(window.navigator.userAgent,"Trident/",0)
$.cp=y}if(y===!0)z="-ms-"
else z=P.cr()===!0?"-o-":"-webkit-"}$.cn=z
return z},
hj:{
"^":"b;",
cb:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x){if(x>=z.length)return H.h(z,x)
if(this.es(z[x],a))return x}z.push(a)
this.b.push(null)
return y},
bx:function(a){var z,y,x,w,v,u,t,s
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.eI(a.getTime(),!0)
if(a instanceof RegExp)throw H.e(new P.bP("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.ix(a)
y=Object.getPrototypeOf(a)
if(y===Object.prototype||y===null){x=this.cb(a)
w=this.b
v=w.length
if(x>=v)return H.h(w,x)
u=w[x]
z.a=u
if(u!=null)return u
u=P.aJ()
z.a=u
if(x>=v)return H.h(w,x)
w[x]=u
this.ek(a,new P.hl(z,this))
return z.a}if(a instanceof Array){x=this.cb(a)
z=this.b
if(x>=z.length)return H.h(z,x)
u=z[x]
if(u!=null)return u
w=J.N(a)
t=w.gj(a)
u=this.c?this.eG(t):a
if(x>=z.length)return H.h(z,x)
z[x]=u
if(typeof t!=="number")return H.S(t)
z=J.an(u)
s=0
for(;s<t;++s)z.u(u,s,this.bx(w.h(a,s)))
return u}return a}},
hl:{
"^":"d:7;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.bx(b)
J.dP(z,a,y)
return y}},
iw:{
"^":"d:19;a",
$2:function(a,b){this.a[a]=b}},
hk:{
"^":"hj;a,b,c",
eG:function(a){return new Array(a)},
es:function(a,b){return a==null?b==null:a===b},
ek:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.Y)(z),++x){w=z[x]
b.$2(w,a[w])}}},
iy:{
"^":"d:2;a",
$1:function(a){return this.a.a5(0,a)}},
iz:{
"^":"d:2;a",
$1:function(a){return this.a.au(a)}}}],["","",,F,{
"^":"",
dF:[function(){var z=0,y=new P.a0(),x=1,w,v,u,t,s,r,q,p,o
var $async$dF=P.a9(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
p=p.aJ()
o=P
v=new q.fZ(700,500,p,o.aJ())
q=P
q.az("--n--")
q=E
q=q
p=Float64Array
o=H
u=new q.Q(new p(o.m(16)))
q=u
q.O()
q=F
u=new q.h1(600,400,1,1,1,0,0,null,!0,"none",null,u,!1)
q=u
q.b=[]
q=u
p=F
q.ch=p.ag(255,238,238,255)
q=E
q=q
p=Float64Array
o=H
t=new q.Q(new p(o.m(16)))
q=t
q.O()
q=G
s=new q.h7(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[t])
q=s
p=G
q.a=p.h6(400,600)
q=s
q.sbp(u)
q=s
q.eF()
q=s
q.eU()
q=s
u=q.gbp()
q=P
t=q.ft(6,null,null)
q=E
q=q
p=Float64Array
o=H
r=new q.Q(new p(o.m(16)))
q=r
q.O()
q=L
r=new q.fy(v,t,"none",null,r,!1)
q=r
q.b=[]
q=r
q.bf()
q=u
q.ag(r)
q=s
q.P(0)
return P.p(null,0,y,null)
case 1:return P.p(w,1,y)}})
return P.p(null,$async$dF,y,null)},"$0","dG",0,0,0]},1],["","",,L,{
"^":"",
fl:{
"^":"bL;e,f,r,a,b,c,d",
aF:function(a,b){var z=F.b6(null)
if(this.f!=null)z.a=F.ag(153,0,0,0)
else z.a=F.ag(153,255,170,170)
if(this.r||this.f==null)z.b=C.e
else z.b=C.A
b.aw(a,new F.as(0,0,100,200),z)},
ez:function(a,b){if(0<b&&b<200)if(0<a&&a<100)return!0
return!1},
cm:function(a,b,c,d,e,f,g){var z
if((c==="pointerdown"||c==="pointermove")&&this.ez(d,e)){if(!this.r&&this.f!=null)J.eu(this.f)
this.r=!0}else if(this.r){this.r=!1
z=this.f
if(z!=null)J.er(z)}return!1},
d2:function(a,b){this.e.bh(b).eS(new L.fn(this))},
static:{fm:function(a,b){var z=new E.Q(new Float64Array(H.m(16)))
z.O()
z=new L.fl(a,null,!1,"none",null,z,!1)
z.b=[]
z.d2(a,b)
return z}}},
fn:{
"^":"d:20;a",
$1:function(a){this.a.f=a}},
fy:{
"^":"bL;e,f,a,b,c,d",
bf:function(){var z=0,y=new P.a0(),x=1,w,v=this,u,t,s,r,q
var $async$bf=P.a9(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=v
u=q.e,t=0
case 2:if(!(t<6)){z=4
break}s=t+1
q=L
r=q.fm(u,"assets/se_maoudamashii_retro0"+s+".ogg")
q=v
q.ag(r)
q=r
q=q.c
q.bv(0,t*100,150,0)
case 3:t=s
z=2
break
case 4:return P.p(null,0,y,null)
case 1:return P.p(w,1,y)}})
return P.p(null,$async$bf,y,null)},
aF:function(a,b){var z=F.b6(null)
z.a=F.ag(255,0,0,0)
z.b=C.e
b.aw(a,new F.as(0,0,600,150),z)}}}],["","",,F,{
"^":"",
cA:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.Y)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.b3(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fX:{
"^":"b;"},
bL:{
"^":"b;",
ag:function(a){var z=0,y=new P.a0(),x=1,w,v=this,u,t,s,r
var $async$ag=P.a9(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.a(new s.v(0,r.j,null),[null])
t=u
t.bG(null)
z=2
return P.p(u,$async$ag,y)
case 2:t=v
t=t.b
t.push(a)
return P.p(null,0,y,null)
case 1:return P.p(w,1,y)}})
return P.p(null,$async$ag,y,null)},
ce:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.Y)(z),++x)z[x].ce(a)},
cl:function(a,b){},
cu:function(a,b){var z,y,x
this.bc()
this.cl(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.Y)(z),++x)z[x].cu(a,b)},
aF:function(a,b){},
bk:["cX",function(a,b){var z,y,x,w,v,u
this.bc()
this.aF(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.Y)(z),++w){v=z[w]
u=v.c
x.push(C.b.ga6(x).v(0,u))
b.aJ()
v.bk(a,b)
if(0>=x.length)return H.h(x,-1)
x.pop()
b.aJ()}}],
eT:["cY",function(a,b,c,d,e){var z,y,x,w,v,u,t
this.bc()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.co(v.c)
v.eT(a,b,c,d,e)
a.cn()}u=a.cE().bb(0)
u.ey()
y=new E.t(new Float64Array(H.m(3)))
y.B(d,e,0)
t=u.v(0,y)
this.cm(a,b,c,t.gA(t),t.gD(t),d,e)
return!1}],
cm:function(a,b,c,d,e,f,g){return!1},
f8:[function(a,b,c,d,e,f){},"$5","gaH",10,0,9],
f7:[function(a,b,c,d,e,f){},"$5","gaG",10,0,9],
bc:function(){if(!this.d)this.d=!0}},
fY:{
"^":"b;"},
bK:{
"^":"b;"},
as:{
"^":"b;a,b,c,d",
l:function(a,b){if(b==null)return!1
return b instanceof F.as&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gq:function(a){return F.cA([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+this.a+", y:"+this.b+", w:"+this.c+", h:"+this.d}},
cZ:{
"^":"b;a",
i:function(a){return C.y.h(0,this.a)}},
h2:{
"^":"b;a,b,c",
d6:function(a){if(this.a==null)this.a=F.ag(255,255,255,255)},
static:{b6:function(a){var z=new F.h2(a,C.e,1)
z.d6(a)
return z}}},
cY:{
"^":"b;a",
l:function(a,b){if(b==null)return!1
return b instanceof F.cY&&b.a===this.a},
gq:function(a){return F.cA([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
d5:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{ag:function(a,b,c,d){var z=new F.cY(0)
z.d5(a,b,c,d)
return z}}},
h1:{
"^":"bL;e,f,r,x,y,z,Q,ch,cx,a,b,c,d",
cl:function(a,b){var z,y,x,w
z=this.e
y=(a.gbw()-0)/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.Q(new Float64Array(H.m(16)))
y.O()
this.c=y
y.bv(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bA(0,z,z,1)},
bk:function(a,b){var z,y
z=new F.as(0,0,this.e,this.f)
b.b.push(z)
b.ba(a,z)
this.cX(a,b)
y=b.b
if(0>=y.length)return H.h(y,-1)
y.pop()
if(y.length>0)b.ba(a,C.b.ga6(y))
else{y=a.a
b.ba(a,new F.as(0,0,y.c,y.d))}},
aF:function(a,b){var z=F.b6(null)
z.a=this.ch
b.aw(a,new F.as(0,0,this.e,this.f),z)}},
bM:{
"^":"b;",
gbp:function(){return this.c$},
sbp:function(a){this.c$=a},
eB:function(a){if(!this.e$){this.c$.ce(this)
this.e$=!0}this.c$.cu(this,a)
this.eE()},
eC:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.ga6(y).v(0,z))
b.aJ()
this.c$.bk(a,b)
if(0>=y.length)return H.h(y,-1)
y.pop()
b.aJ()},
W:function(a,b,c,d,e){a.co(this.c$.c)
this.c$.cY(a,b,c,d,e)
a.cn()},
co:function(a){var z=this.f$
z.push(C.b.ga6(z).v(0,a))},
cn:function(){var z=this.f$
if(0>=z.length)return H.h(z,-1)
z.pop()},
cE:function(){return C.b.ga6(this.f$)}}}],["","",,G,{
"^":"",
d_:function(a,b,c){var z,y
z=J.e1(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.c(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
h3:{
"^":"bK;a,b,c",
P:function(a){var z=0,y=new P.a0(),x=1,w,v=this,u,t,s,r
var $async$P=P.a9(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:s=v
z=2
return P.p(s.J(0),$async$P,y)
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
if(!!u.start)u.start(0)
else u.noteOn(0)
return P.p(null,0,y,null)
case 1:return P.p(w,1,y)}})
return P.p(null,$async$P,y,null)},
J:function(a){var z=0,y=new P.a0(),x=1,w,v=this,u,t
var $async$J=P.a9(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=v
u=t.c
z=u!=null?2:3
break
case 2:if(!!u.stop)u.stop(0)
else u.noteOff(0)
t=v
t.c=null
case 3:return P.p(null,0,y,null)
case 1:return P.p(w,1,y)}})
return P.p(null,$async$J,y,null)}},
h5:{
"^":"b;a,b,c,n:d'",
d7:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a9(b)
y=C.d.a9(a)
x=C.m.e2(document,"canvas")
J.et(x,z)
J.es(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.eo(this.b,!0)},
static:{h6:function(a,b){var z=new G.h5(null,null,null,null)
z.d7(a,b)
return z}}},
fZ:{
"^":"fY;t:c',n:d',a,b",
bh:function(a){var z=0,y=new P.a0(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
var $async$bh=P.a9(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.a(new p.bQ(o.a(new n.v(0,m.j,null),[null])),[null])
t=new (window.AudioContext||window.webkitAudioContext)()
s=new XMLHttpRequest()
q=C
q=q.n
q.eL(s,"GET",a)
q=s
q.responseType="arraybuffer"
q=H
q=q
p=W
r=q.a(new p.r(s,"load",!1),[null])
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
p=new p.F(0,o,n,m.G(new l.h_(u,t,s)),!1)
o=H
q=q.a(p,[o.w(r,0)])
q.C()
q=H
q=q
p=W
r=q.a(new p.r(s,"error",!1),[null])
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
p=new p.F(0,o,n,m.G(new l.h0(u)),!1)
o=H
q=q.a(p,[o.w(r,0)])
q.C()
q=s
q.send()
q=u
x=q.a
z=1
break
case 1:return P.p(x,0,y,null)
case 2:return P.p(v,1,y)}})
return P.p(null,$async$bh,y,null)}},
h_:{
"^":"d:21;a,b,c",
$1:function(a){var z=0,y=new P.a0(),x=1,w,v=this,u,t,s,r,q,p,o,n
var $async$$1=P.a9(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=v
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
return P.p(q.e2(p,o.ii(n.response)),$async$$1,y)
case 2:t.a5(0,new s.h3(r,c,null))
return P.p(null,0,y,null)
case 1:return P.p(w,1,y)}})
return P.p(null,$async$$1,y,null)}},
h0:{
"^":"d:22;a",
$1:function(a){this.a.au(a)}},
h4:{
"^":"fX;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
eu:function(){var z,y,x,w,v,u
P.az("#[A]# "+H.c(J.cb(this.d,35660)))
P.az("#[B]# "+H.c(J.cb(this.d,33901)))
z=C.b.cf(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.cf(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.d_(x,35633,z)
v=G.d_(x,35632,y)
u=J.e0(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
S:function(a){this.r=1
this.ch=-0.5
J.c7(this.d,2960)
J.e3(this.d,515)
J.dX(this.d,0,0,0,1)
J.dY(this.d,1)
J.dZ(this.d,0)
J.c7(this.d,3042)
switch(-1){case-1:J.dT(this.d,32774)
J.dU(this.d,770,771,770,32772)
break}J.dW(this.d,17664)
C.b.sj(this.x,0)
C.b.sj(this.y,0)
C.b.sj(this.z,0)
this.Q=null},
be:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.x
if(z.length!==0){y=this.y
F.ag(170,255,170,170)
J.cf(this.d,this.f)
x=J.aS(this.d,this.f,"a_tex")
w=J.bm(this.d)
J.bk(this.d,34962,w)
v=this.z
J.dV(this.d,34962,new Float32Array(H.bc(v)),35044)
J.aR(this.d,x)
J.aT(this.d,x,2,5126,!1,0,0)
u=this.d
t=J.bm(u)
u.bindBuffer(34962,t)
u.bufferData(34962,new Float32Array(H.bc(z)),35044)
u.bindBuffer(34962,null)
J.bk(this.d,34962,t)
u=this.d
t=J.bm(u)
u.bindBuffer(34963,t)
u.bufferData(34963,new Uint16Array(H.bc(y)),35044)
u.bindBuffer(34963,null)
J.bk(this.d,34963,t)
u=this.d
u.uniformMatrix4fv(J.ep(u,this.f,"u_mat"),!1,new Float32Array(H.bc(this.cx.a)))
s=J.aS(this.d,this.f,"color")
r=J.aS(this.d,this.f,"vp")
q=J.aS(this.d,this.f,"useTex")
J.aT(this.d,r,3,5126,!1,32,0)
J.aT(this.d,s,4,5126,!1,32,12)
J.aT(this.d,q,1,5126,!1,32,28)
J.aR(this.d,r)
J.aR(this.d,s)
J.aR(this.d,q)
J.e5(this.d,4,y.length,5123,0)
if(x!==0){J.e4(this.d,x)
J.dS(this.d,3553,null)}J.cf(this.d,null)
C.b.sj(z,0)
C.b.sj(y,0)
C.b.sj(v,0)
this.Q=null}},
aw:function(a,b,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=b.a
y=b.b
x=b.c
w=b.d
if(a0.b===C.e){v=this.c6()
u=z+x
t=y+w
x=new E.t(new Float64Array(H.m(3)))
x.B(z,y,0)
s=v.v(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.B(z,t,0)
r=v.v(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.B(u,y,0)
q=v.v(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.B(u,t,0)
p=v.v(0,x)
x=a0.a.a
this.ae(a,s,r,q,p,(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255)}else{v=this.c6()
o=a0.c
n=o/2
m=z+n
l=y+n
u=z+x-n
t=y+w-n
n=new E.t(new Float64Array(H.m(3)))
n.B(m,l,0)
s=v.v(0,n)
n=m-o
w=l-o
x=new E.t(new Float64Array(H.m(3)))
x.B(n,w,0)
k=v.v(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.B(m,t,0)
r=v.v(0,x)
x=t+o
j=new E.t(new Float64Array(H.m(3)))
j.B(n,x,0)
i=v.v(0,j)
j=new E.t(new Float64Array(H.m(3)))
j.B(u,l,0)
q=v.v(0,j)
o=u+o
j=new E.t(new Float64Array(H.m(3)))
j.B(o,w,0)
h=v.v(0,j)
j=new E.t(new Float64Array(H.m(3)))
j.B(u,t,0)
p=v.v(0,j)
j=new E.t(new Float64Array(H.m(3)))
j.B(o,x,0)
g=v.v(0,j)
j=a0.a.a
f=(j>>>16&255)/255
e=(j>>>8&255)/255
d=(j>>>0&255)/255
c=(j>>>24&255)/255
this.ae(a,k,i,s,r,f,e,d,c)
this.ae(a,i,g,r,p,f,e,d,c)
this.ae(a,g,h,p,q,f,e,d,c)
this.ae(a,h,k,q,s,f,e,d,c)}},
ae:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.x
y=z.length/8|0
C.b.b6(z,[b.gA(b),b.gD(b),this.ch,f,g,h,i,-1,c.gA(c),c.gD(c),this.ch,f,g,h,i,-1,d.gA(d),d.gD(d),this.ch,f,g,h,i,-1,e.gA(e),e.gD(e),this.ch,f,g,h,i,-1])
C.b.b6(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.b.b6(this.y,[y,z,x,z,y+3,x])},
ba:function(a,b){var z
this.be(0)
J.c5(this.d,!1,!1,!1,!1)
J.c6(this.d,!1)
J.cd(this.d,7680,7681,7681)
J.cc(this.d,519,this.r,255)
z=F.b6(null)
z.a=F.ag(255,255,255,255)
this.aw(null,b,z)
this.be(0)
J.c5(this.d,!0,!0,!0,!0)
J.c6(this.d,!0)
J.cd(this.d,7680,7680,7680)
J.cc(this.d,515,this.r,255);++this.r},
aJ:function(){},
c6:function(){var z,y
this.cy.O()
z=this.cy.bv(0,-1,1,0)
this.cy=z
y=this.e
y=z.bA(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.v(0,C.b.ga6(this.a))
this.cy=y
return y}},
h7:{
"^":"fx;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gbw:function(){return this.a.c},
eE:function(){this.r=!0},
P:function(a){if(!this.d){this.d=!0
this.ap()}},
ap:function(){var z=0,y=new P.a0(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
var $async$ap=P.a9(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cL(new h.bq(Date.now(),!1))
i=v
t=i.a
i=E
i=i
h=Float64Array
g=H
s=new i.Q(new h(g.m(16)))
i=s
i.O()
i=E
i=i
h=Float64Array
g=H
r=new i.Q(new h(g.m(16)))
i=r
i.O()
i=E
i=i
h=Float64Array
g=H
q=new i.Q(new h(g.m(16)))
i=q
i.O()
i=G
p=new i.h4(50,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.eu()
i=p
i.S(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return P.p(i.eT(new h.aD(15e3),null,null),$async$ap,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.eB(h.a9(u+k))
o+=k
n+=k
if(k<0);else ;++m
i=v
i.r=!0
z=n>40?6:7
break
case 6:i=p
i.S(0)
i=v
i.eC(v,p)
i=p
i.be(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.d0(o,m)
i=H
i.dI(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return P.p(null,0,y,null)
case 1:return P.p(w,1,y)}})
return P.p(null,$async$ap,y,null)},
eU:function(){var z,y,x,w
z=P.aJ()
y=new G.hg(this,z)
x=new G.hf(this,z)
w=J.ef(this.a.b)
H.a(new W.F(0,w.a,w.b,W.G(x),!1),[H.w(w,0)]).C()
J.eg(this.a.b).ci(x)
x=J.eh(this.a.b)
H.a(new W.F(0,x.a,x.b,W.G(y),!1),[H.w(x,0)]).C()
x=J.ei(this.a.b)
H.a(new W.F(0,x.a,x.b,W.G(y),!1),[H.w(x,0)]).C()
x=J.ej(this.a.b)
H.a(new W.F(0,x.a,x.b,W.G(y),!1),[H.w(x,0)]).C()
J.ek(this.a.b).ci(y)},
eF:function(){var z,y
z={}
z.a=!1
y=J.e8(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h8(z,this)),!1),[H.w(y,0)]).C()
y=J.ee(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h9(z,this)),!1),[H.w(y,0)]).C()
y=J.e9(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.ha(z,this)),!1),[H.w(y,0)]).C()
y=J.ea(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.hb(z,this)),!1),[H.w(y,0)]).C()
y=J.eb(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.hc(z,this)),!1),[H.w(y,0)]).C()
y=J.ec(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.hd(z,this)),!1),[H.w(y,0)]).C()
y=J.ed(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.he(z,this)),!1),[H.w(y,0)]).C()}},
fx:{
"^":"b+bM;"},
hg:{
"^":"d:10;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c8(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.Y)(y),++v){u=y[v]
t=H.a(new P.I(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).a
s=J.c9(z.a.b)
if(typeof t!=="number")return t.Y()
r=t-s
s=H.a(new P.I(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).b
t=J.ca(z.a.b)
if(typeof s!=="number")return s.Y()
q=s-t
t=w.av(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.k()
z.W(z,s+1,"pointermove",r,q)}else{w.u(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.k()
z.W(z,t+1,"pointerdown",r,q)}}}},
hf:{
"^":"d:10;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c8(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.Y)(y),++v){u=y[v]
if(w.av(u.identifier)){t=H.a(new P.I(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).a
s=J.c9(z.a.b)
if(typeof t!=="number")return t.Y()
r=H.a(new P.I(C.a.F(u.pageX),C.a.F(u.pageY)),[null]).b
q=J.ca(z.a.b)
if(typeof r!=="number")return r.Y()
w.a8(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.k()
z.W(z,p+1,"pointerup",t-s,r-q)}}}},
h8:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gI(a)
x=x.gA(x)
x.toString
y=y.gI(a)
y=y.gD(y)
y.toString
z.W(z,0,"pointerdown",x,y)}}},
h9:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gA(w)
w.toString
x=x.gI(a)
x=x.gD(x)
x.toString
z.W(z,0,"pointerup",w,x)
y.a=!1}}}},
ha:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
hb:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gA(w)
w.toString
x=x.gI(a)
x=x.gD(x)
x.toString
z.W(z,0,"pointercancel",w,x)
y.a=!1}}}},
hc:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gI(a)
x=x.gA(x)
x.toString
y=y.gI(a)
y=y.gD(y)
y.toString
z.W(z,0,"pointermove",x,y)}}},
hd:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gA(w)
w.toString
x=x.gI(a)
x=x.gD(x)
x.toString
z.W(z,0,"pointercancel",w,x)
y.a=!1}}}},
he:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}}}],["","",,E,{
"^":"",
Q:{
"^":"b;a",
ac:function(a){var z,y
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
i:function(a){return"[0] "+this.ao(0).i(0)+"\n[1] "+this.ao(1).i(0)+"\n[2] "+this.ao(2).i(0)+"\n[3] "+this.ao(3).i(0)+"\n"},
gee:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
z[b]=c},
ao:function(a){var z,y,x
z=new Float64Array(H.m(4))
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
return new E.a6(z)},
bb:function(a){var z=new E.Q(new Float64Array(H.m(16)))
z.ac(this)
return z},
v:function(a,b){var z,y,x
if(!!b.$isa6){z=new Float64Array(H.m(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a6(z)}if(!!b.$ist){z=new Float64Array(H.m(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.t(z)}if(4===b.gee()){z=new Float64Array(H.m(16))
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
return new E.Q(z)}throw H.e(P.aU(b))},
k:function(a,b){var z,y
z=new Float64Array(H.m(16))
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
return new E.Q(z)},
bv:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isa6
x=y?b.gbw():1
if(!!z.$ist||y){w=z.gA(b)
v=z.gD(b)
u=z.geX(b)}else{u=d
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
bA:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isa6
x=y?b.gbw():1
if(!!z.$ist||y){w=z.gA(b)
v=z.gD(b)
u=z.geX(b)}else{u=d
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
O:function(){var z=this.a
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
ey:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
t:{
"^":"b;a",
B:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ac:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+"]"},
k:function(a,b){var z,y,x,w
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
z=C.a.k(z[2],b.gm().h(0,2))
w=new E.t(new Float64Array(H.m(3)))
w.B(y,x,z)
return w},
v:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.S(b)
x=z[1]
z=z[2]
w=new E.t(new Float64Array(H.m(3)))
w.B(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dx(y*y+x*x+z*z))},
bb:function(a){var z=new E.t(new Float64Array(H.m(3)))
z.ac(this)
return z},
gA:function(a){return this.a[0]},
gD:function(a){return this.a[1]}},
a6:{
"^":"b;a",
bD:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ac:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+","+H.c(z[3])},
k:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
w=C.a.k(z[2],b.gm().h(0,2))
z=C.a.k(z[3],b.gm().h(0,3))
v=new E.a6(new Float64Array(H.m(4)))
v.bD(y,x,w,z)
return v},
v:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.S(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a6(new Float64Array(H.m(4)))
v.bD(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dx(y*y+x*x+w*w+z*z))},
bb:function(a){var z=new E.a6(new Float64Array(H.m(4)))
z.ac(this)
return z},
gA:function(a){return this.a[0]},
gD:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cz.prototype
return J.fg.prototype}if(typeof a=="string")return J.b_.prototype
if(a==null)return J.fh.prototype
if(typeof a=="boolean")return J.ff.prototype
if(a.constructor==Array)return J.aG.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aI.prototype
return a}if(a instanceof P.b)return a
return J.bg(a)}
J.N=function(a){if(typeof a=="string")return J.b_.prototype
if(a==null)return a
if(a.constructor==Array)return J.aG.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aI.prototype
return a}if(a instanceof P.b)return a
return J.bg(a)}
J.an=function(a){if(a==null)return a
if(a.constructor==Array)return J.aG.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aI.prototype
return a}if(a instanceof P.b)return a
return J.bg(a)}
J.dA=function(a){if(typeof a=="number")return J.aH.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b8.prototype
return a}
J.iA=function(a){if(typeof a=="number")return J.aH.prototype
if(typeof a=="string")return J.b_.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b8.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aI.prototype
return a}if(a instanceof P.b)return a
return J.bg(a)}
J.aA=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.iA(a).k(a,b)}
J.Z=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).l(a,b)}
J.dO=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dA(a).aK(a,b)}
J.c4=function(a,b){if(a.constructor==Array||typeof a=="string"||H.dD(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.N(a).h(a,b)}
J.dP=function(a,b,c){if((a.constructor==Array||H.dD(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.an(a).u(a,b,c)}
J.dQ=function(a,b,c,d){return J.i(a).dc(a,b,c,d)}
J.dR=function(a,b,c,d){return J.i(a).dG(a,b,c,d)}
J.bk=function(a,b,c){return J.i(a).dM(a,b,c)}
J.dS=function(a,b,c){return J.i(a).dN(a,b,c)}
J.dT=function(a,b){return J.i(a).dP(a,b)}
J.dU=function(a,b,c,d,e){return J.i(a).dQ(a,b,c,d,e)}
J.dV=function(a,b,c,d){return J.i(a).dR(a,b,c,d)}
J.dW=function(a,b){return J.an(a).dU(a,b)}
J.dX=function(a,b,c,d,e){return J.i(a).dV(a,b,c,d,e)}
J.dY=function(a,b){return J.i(a).dW(a,b)}
J.dZ=function(a,b){return J.i(a).dX(a,b)}
J.c5=function(a,b,c,d,e){return J.i(a).dY(a,b,c,d,e)}
J.e_=function(a,b){return J.i(a).a5(a,b)}
J.bl=function(a,b,c){return J.N(a).e_(a,b,c)}
J.bm=function(a){return J.i(a).e1(a)}
J.e0=function(a){return J.i(a).e4(a)}
J.e1=function(a,b){return J.i(a).e5(a,b)}
J.e2=function(a,b){return J.i(a).e6(a,b)}
J.e3=function(a,b){return J.i(a).e7(a,b)}
J.c6=function(a,b){return J.i(a).e8(a,b)}
J.e4=function(a,b){return J.i(a).ef(a,b)}
J.e5=function(a,b,c,d,e){return J.i(a).eg(a,b,c,d,e)}
J.e6=function(a,b){return J.an(a).V(a,b)}
J.c7=function(a,b){return J.i(a).eh(a,b)}
J.aR=function(a,b){return J.i(a).ei(a,b)}
J.e7=function(a,b){return J.an(a).G(a,b)}
J.c8=function(a){return J.i(a).gdT(a)}
J.W=function(a){return J.i(a).gai(a)}
J.C=function(a){return J.l(a).gq(a)}
J.bn=function(a){return J.an(a).gE(a)}
J.aB=function(a){return J.N(a).gj(a)}
J.c9=function(a){return J.i(a).geH(a)}
J.ca=function(a){return J.i(a).geI(a)}
J.e8=function(a){return J.i(a).gay(a)}
J.e9=function(a){return J.i(a).gaz(a)}
J.ea=function(a){return J.i(a).gaA(a)}
J.eb=function(a){return J.i(a).gaB(a)}
J.ec=function(a){return J.i(a).gaC(a)}
J.ed=function(a){return J.i(a).gaD(a)}
J.ee=function(a){return J.i(a).gaE(a)}
J.ef=function(a){return J.i(a).gbi(a)}
J.eg=function(a){return J.i(a).gaG(a)}
J.eh=function(a){return J.i(a).geJ(a)}
J.ei=function(a){return J.i(a).geK(a)}
J.ej=function(a){return J.i(a).gbj(a)}
J.ek=function(a){return J.i(a).gaH(a)}
J.el=function(a){return J.i(a).gbu(a)}
J.em=function(a){return J.i(a).gA(a)}
J.aS=function(a,b,c){return J.i(a).cA(a,b,c)}
J.en=function(a){return J.i(a).cB(a)}
J.eo=function(a,b){return J.i(a).cC(a,b)}
J.cb=function(a,b){return J.i(a).cF(a,b)}
J.ep=function(a,b,c){return J.i(a).cG(a,b,c)}
J.eq=function(a,b){return J.an(a).a7(a,b)}
J.er=function(a){return J.i(a).J(a)}
J.ao=function(a,b){return J.i(a).aM(a,b)}
J.es=function(a,b){return J.i(a).sn(a,b)}
J.et=function(a,b){return J.i(a).st(a,b)}
J.eu=function(a){return J.i(a).P(a)}
J.cc=function(a,b,c,d){return J.i(a).cR(a,b,c,d)}
J.cd=function(a,b,c,d){return J.i(a).cS(a,b,c,d)}
J.ce=function(a){return J.dA(a).a9(a)}
J.ap=function(a){return J.l(a).i(a)}
J.cf=function(a,b){return J.i(a).eV(a,b)}
J.aT=function(a,b,c,d,e,f,g){return J.i(a).eW(a,b,c,d,e,f,g)}
var $=I.p
C.m=W.eW.prototype
C.n=W.eX.prototype
C.o=J.f.prototype
C.b=J.aG.prototype
C.d=J.cz.prototype
C.a=J.aH.prototype
C.h=J.b_.prototype
C.x=J.aI.prototype
C.z=J.fz.prototype
C.B=J.b8.prototype
C.k=new H.cs()
C.l=new P.hx()
C.c=new P.i1()
C.f=new P.aD(0)
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
C.y=new H.eV([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.cZ(0)
C.A=new F.cZ(1)
$.cM="$cachedFunction"
$.cN="$cachedInvocation"
$.T=0
$.aq=null
$.ci=null
$.c0=null
$.dt=null
$.dJ=null
$.be=null
$.bh=null
$.c1=null
$.ai=null
$.aw=null
$.ax=null
$.bW=!1
$.j=C.c
$.cv=0
$.cq=null
$.cp=null
$.co=null
$.cn=null
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
I.$lazy(y,x,w)}})(["cm","$get$cm",function(){return init.getIsolateTag("_$dart_dartClosure")},"cx","$get$cx",function(){return H.f9()},"cy","$get$cy",function(){return new P.eQ(null)},"d0","$get$d0",function(){return H.U(H.b7({toString:function(){return"$receiver$"}}))},"d1","$get$d1",function(){return H.U(H.b7({$method$:null,toString:function(){return"$receiver$"}}))},"d2","$get$d2",function(){return H.U(H.b7(null))},"d3","$get$d3",function(){return H.U(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d7","$get$d7",function(){return H.U(H.b7(void 0))},"d8","$get$d8",function(){return H.U(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d5","$get$d5",function(){return H.U(H.d6(null))},"d4","$get$d4",function(){return H.U(function(){try{null.$method$}catch(z){return z.message}}())},"da","$get$da",function(){return H.U(H.d6(void 0))},"d9","$get$d9",function(){return H.U(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bR","$get$bR",function(){return P.hm()},"ay","$get$ay",function(){return[]},"cl","$get$cl",function(){return{}}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[W.bC]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,P.a4]},{func:1,args:[,],opt:[,]},{func:1,args:[,,]},{func:1,ret:P.R,args:[P.n]},{func:1,v:true,args:[F.bM,P.n,P.R,P.aa,P.aa]},{func:1,args:[W.bO]},{func:1,args:[,P.R]},{func:1,args:[P.R]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.n,,]},{func:1,v:true,args:[,],opt:[P.a4]},{func:1,ret:P.bY},{func:1,v:true,args:[P.b],opt:[P.a4]},{func:1,v:true,args:[,P.a4]},{func:1,args:[P.R,,]},{func:1,args:[F.bK]},{func:1,ret:P.P,args:[W.aL]},{func:1,args:[W.aL]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iU(d||a)
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
Isolate.bf=a.bf
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dL(F.dG(),b)},[])
else (function(b){H.dL(F.dG(),b)})([])})})()