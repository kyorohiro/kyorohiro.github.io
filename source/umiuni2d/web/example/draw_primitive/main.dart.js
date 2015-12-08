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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bW"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bW"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bW(this,c,d,true,[],f).prototype
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
jk:{
"^":"b;a"}}],["","",,J,{
"^":"",
m:function(a){return void 0},
bi:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bg:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.c_==null){H.iu()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.df("Return interceptor for "+H.c(y(a,z))))}w=H.iD(a)
if(w==null){if(typeof a=="function")return C.x
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.z
else return C.B}return w},
f:{
"^":"b;",
t:function(a,b){return a===b},
gA:function(a){return H.a3(a)},
i:["cY",function(a){return H.b4(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
f9:{
"^":"f;",
i:function(a){return String(a)},
gA:function(a){return a?519018:218159},
$isbV:1},
fb:{
"^":"f;",
t:function(a,b){return null==b},
i:function(a){return"null"},
gA:function(a){return 0}},
bu:{
"^":"f;",
gA:function(a){return 0},
i:["cZ",function(a){return String(a)}],
$isfc:1},
fo:{
"^":"bu;"},
b8:{
"^":"bu;"},
aG:{
"^":"bu;",
i:function(a){var z=a[$.$get$cl()]
return z==null?this.cZ(a):J.am(z)}},
aE:{
"^":"f;",
cb:function(a,b){if(!!a.immutable$list)throw H.e(new P.M(b))},
ca:function(a,b){if(!!a.fixed$length)throw H.e(new P.M(b))},
B:function(a,b){var z,y
this.ca(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.a9)(b),++y)a.push(b[y])},
H:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.K(a))}},
ac:function(a,b){return H.a(new H.bA(a,b),[null,null])},
cj:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.c(a[x])
if(x>=z)return H.i(y,x)
y[x]=w}return y.join(b)},
X:function(a,b){if(b<0||b>=a.length)return H.i(a,b)
return a[b]},
gem:function(a){if(a.length>0)return a[0]
throw H.e(H.bt())},
ga7:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bt())},
bE:function(a,b,c,d,e){var z,y,x
this.cb(a,"set range")
P.cS(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.A(P.ap(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.f7())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.i(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.i(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aY(a,"[","]")},
gF:function(a){return new J.ev(a,a.length,0,null)},
gA:function(a){return H.a3(a)},
gk:function(a){return a.length},
sk:function(a,b){this.ca(a,"set length")
if(b<0)throw H.e(P.ap(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.x(a,b))
if(b>=a.length||b<0)throw H.e(H.x(a,b))
return a[b]},
C:function(a,b,c){this.cb(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.x(a,b))
if(b>=a.length||b<0)throw H.e(H.x(a,b))
a[b]=c},
$isaZ:1,
$isl:1,
$asl:null,
$isr:1},
jj:{
"^":"aE;"},
ev:{
"^":"b;a,b,c,d",
gD:function(){return this.d},
w:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.a9(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aF:{
"^":"f;",
bt:function(a,b){return a%b},
ae:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.M(""+a))},
G:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.M(""+a))},
eW:function(a){return a},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.e(H.ak(b))
return a+b},
d3:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.ae(a/b)},
ak:function(a,b){return(a|0)===a?a/b|0:this.ae(a/b)},
bd:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aU:function(a,b){if(typeof b!=="number")throw H.e(H.ak(b))
return a<b},
$isaO:1},
cB:{
"^":"aF;",
$isaO:1,
$iso:1},
fa:{
"^":"aF;",
$isaO:1},
b_:{
"^":"f;",
m:function(a,b){if(typeof b!=="string")throw H.e(P.eu(b,null,null))
return a+b},
cX:function(a,b,c){H.dB(b)
if(c==null)c=a.length
H.dB(c)
if(b<0)throw H.e(P.b5(b,null,null))
if(typeof c!=="number")return H.H(c)
if(b>c)throw H.e(P.b5(b,null,null))
if(c>a.length)throw H.e(P.b5(c,null,null))
return a.substring(b,c)},
cW:function(a,b){return this.cX(a,b,null)},
e1:function(a,b,c){if(c>a.length)throw H.e(P.ap(c,0,a.length,null,null))
return H.iI(a,b,c)},
gM:function(a){return a.length===0},
i:function(a){return a},
gA:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.x(a,b))
if(b>=a.length||b<0)throw H.e(H.x(a,b))
return a[b]},
$isaZ:1,
$isQ:1}}],["","",,H,{
"^":"",
aJ:function(a,b){var z=a.ap(b)
if(!init.globalState.d.cy)init.globalState.f.av()
return z},
dM:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isl)throw H.e(P.aV("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.hM(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cz()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.hq(P.by(null,H.aI),0)
y.z=H.a(new H.a1(0,null,null,null,null,null,0),[P.o,H.bR])
y.ch=H.a(new H.a1(0,null,null,null,null,null,0),[P.o,null])
if(y.x===!0){x=new H.hL()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.f0,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hN)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.a(new H.a1(0,null,null,null,null,null,0),[P.o,H.b6])
w=P.ao(null,null,null,P.o)
v=new H.b6(0,null,!1)
u=new H.bR(y,x,w,init.createNewIsolate(),v,new H.ac(H.bj()),new H.ac(H.bj()),!1,!1,[],P.ao(null,null,null,null),null,null,!1,!0,P.ao(null,null,null,null))
w.aa(0,0)
u.bH(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aM()
x=H.al(y,[y]).a3(a)
if(x)u.ap(new H.iG(z,a))
else{y=H.al(y,[y,y]).a3(a)
if(y)u.ap(new H.iH(z,a))
else u.ap(a)}init.globalState.f.av()},
f4:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.f5()
return},
f5:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.M("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.M("Cannot extract URI from \""+H.c(z)+"\""))},
f0:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b9(!0,[]).a4(b.data)
y=J.R(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b9(!0,[]).a4(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b9(!0,[]).a4(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.a(new H.a1(0,null,null,null,null,null,0),[P.o,H.b6])
p=P.ao(null,null,null,P.o)
o=new H.b6(0,null,!1)
n=new H.bR(y,q,p,init.createNewIsolate(),o,new H.ac(H.bj()),new H.ac(H.bj()),!1,!1,[],P.ao(null,null,null,null),null,null,!1,!0,P.ao(null,null,null,null))
p.aa(0,0)
n.bH(0,o)
init.globalState.f.a.W(new H.aI(n,new H.f1(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.av()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").a_(y.h(z,"msg"))
init.globalState.f.av()
break
case"close":init.globalState.ch.ad(0,$.$get$cA().h(0,a))
a.terminate()
init.globalState.f.av()
break
case"log":H.f_(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.ag(!0,P.at(null,P.o)).L(q)
y.toString
self.postMessage(q)}else P.aP(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
f_:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.ag(!0,P.at(null,P.o)).L(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.z(w)
throw H.e(P.aX(z))}},
f2:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cO=$.cO+("_"+y)
$.cP=$.cP+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.a_(["spawned",new H.bb(y,x),w,z.r])
x=new H.f3(a,b,c,d,z)
if(e===!0){z.c8(w,w)
init.globalState.f.a.W(new H.aI(z,x,"start isolate"))}else x.$0()},
i6:function(a){return new H.b9(!0,[]).a4(new H.ag(!1,P.at(null,P.o)).L(a))},
iG:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iH:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hM:{
"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hN:function(a){var z=P.ae(["command","print","msg",a])
return new H.ag(!0,P.at(null,P.o)).L(z)}}},
bR:{
"^":"b;a,b,c,eA:d<,e2:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
c8:function(a,b){if(!this.f.t(0,a))return
if(this.Q.aa(0,b)&&!this.y)this.y=!0
this.bf()},
eN:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ad(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.i(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.i(v,w)
v[w]=x
if(w===y.c)y.bS();++y.d}this.y=!1}this.bf()},
dM:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.i(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eM:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.A(new P.M("removeRange"))
P.cS(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cS:function(a,b){if(!this.r.t(0,a))return
this.db=b},
eq:function(a,b,c){var z=J.m(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){a.a_(c)
return}z=this.cx
if(z==null){z=P.by(null,null)
this.cx=z}z.W(new H.hH(a,c))},
eo:function(a,b){var z
if(!this.r.t(0,a))return
z=J.m(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.bm()
return}z=this.cx
if(z==null){z=P.by(null,null)
this.cx=z}z.W(this.geD())},
er:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aP(a)
if(b!=null)P.aP(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.am(a)
y[1]=b==null?null:J.am(b)
for(x=new P.cD(z,z.r,null,null),x.c=z.e;x.w();)x.d.a_(y)},
ap:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.z(u)
this.er(w,v)
if(this.db===!0){this.bm()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geA()
if(this.cx!=null)for(;t=this.cx,!t.gM(t);)this.cx.cr().$0()}return y},
cn:function(a){return this.b.h(0,a)},
bH:function(a,b){var z=this.b
if(z.al(a))throw H.e(P.aX("Registry: ports must be registered only once."))
z.C(0,a,b)},
bf:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.C(0,this.a,this)
else this.bm()},
bm:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.U(0)
for(z=this.b,y=z.gcB(z),y=y.gF(y);y.w();)y.gD().di()
z.U(0)
this.c.U(0)
init.globalState.z.ad(0,this.a)
this.dx.U(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.i(z,v)
w.a_(z[v])}this.ch=null}},"$0","geD",0,0,1]},
hH:{
"^":"d:1;a,b",
$0:function(){this.a.a_(this.b)}},
hq:{
"^":"b;a,b",
ea:function(){var z=this.a
if(z.b===z.c)return
return z.cr()},
cv:function(){var z,y,x
z=this.ea()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.al(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gM(y)}else y=!1
else y=!1
else y=!1
if(y)H.A(P.aX("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gM(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.ag(!0,H.a(new P.dp(0,null,null,null,null,null,0),[null,P.o])).L(x)
y.toString
self.postMessage(x)}return!1}z.eL()
return!0},
c2:function(){if(self.window!=null)new H.hr(this).$0()
else for(;this.cv(););},
av:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.c2()
else try{this.c2()}catch(x){w=H.B(x)
z=w
y=H.z(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.ag(!0,P.at(null,P.o)).L(v)
w.toString
self.postMessage(v)}}},
hr:{
"^":"d:1;a",
$0:function(){if(!this.a.cv())return
P.cZ(C.f,this)}},
aI:{
"^":"b;a,b,c",
eL:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ap(this.b)}},
hL:{
"^":"b;"},
f1:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.f2(this.a,this.b,this.c,this.d,this.e,this.f)}},
f3:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aM()
w=H.al(x,[x,x]).a3(y)
if(w)y.$2(this.b,this.c)
else{x=H.al(x,[x]).a3(y)
if(x)y.$1(this.b)
else y.$0()}}z.bf()}},
di:{
"^":"b;"},
bb:{
"^":"di;b,a",
a_:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbV())return
x=H.i6(a)
if(z.ge2()===y){y=J.R(x)
switch(y.h(x,0)){case"pause":z.c8(y.h(x,1),y.h(x,2))
break
case"resume":z.eN(y.h(x,1))
break
case"add-ondone":z.dM(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eM(y.h(x,1))
break
case"set-errors-fatal":z.cS(y.h(x,1),y.h(x,2))
break
case"ping":z.eq(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.eo(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.aa(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ad(0,y)
break}return}y=init.globalState.f
w="receive "+H.c(a)
y.a.W(new H.aI(z,new H.hP(this,x),w))},
t:function(a,b){if(b==null)return!1
return b instanceof H.bb&&J.W(this.b,b.b)},
gA:function(a){return this.b.gb8()}},
hP:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbV())z.dd(this.b)}},
bS:{
"^":"di;b,c,a",
a_:function(a){var z,y,x
z=P.ae(["command","message","port",this,"msg",a])
y=new H.ag(!0,P.at(null,P.o)).L(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.bS&&J.W(this.b,b.b)&&J.W(this.a,b.a)&&J.W(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cT()
y=this.a
if(typeof y!=="number")return y.cT()
x=this.c
if(typeof x!=="number")return H.H(x)
return(z<<16^y<<8^x)>>>0}},
b6:{
"^":"b;b8:a<,b,bV:c<",
di:function(){this.c=!0
this.b=null},
dd:function(a){if(this.c)return
this.du(a)},
du:function(a){return this.b.$1(a)},
$isfs:1},
fM:{
"^":"b;a,b,c",
d6:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.W(new H.aI(y,new H.fO(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ax(new H.fP(this,b),0),a)}else throw H.e(new P.M("Timer greater than 0."))},
static:{fN:function(a,b){var z=new H.fM(!0,!1,null)
z.d6(a,b)
return z}}},
fO:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fP:{
"^":"d:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ac:{
"^":"b;b8:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.f1()
z=C.b.bd(z,0)^C.b.ak(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ac){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ag:{
"^":"b;a,b",
L:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.C(0,a,z.gk(z))
z=J.m(a)
if(!!z.$iscH)return["buffer",a]
if(!!z.$isbE)return["typed",a]
if(!!z.$isaZ)return this.cO(a)
if(!!z.$iseZ){x=this.gcL()
w=a.gck()
w=H.b2(w,x,H.N(w,"L",0),null)
w=P.bz(w,!0,H.N(w,"L",0))
z=z.gcB(a)
z=H.b2(z,x,H.N(z,"L",0),null)
return["map",w,P.bz(z,!0,H.N(z,"L",0))]}if(!!z.$isfc)return this.cP(a)
if(!!z.$isf)this.cA(a)
if(!!z.$isfs)this.aw(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbb)return this.cQ(a)
if(!!z.$isbS)return this.cR(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aw(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isac)return["capability",a.a]
if(!(a instanceof P.b))this.cA(a)
return["dart",init.classIdExtractor(a),this.cN(init.classFieldsExtractor(a))]},"$1","gcL",2,0,2],
aw:function(a,b){throw H.e(new P.M(H.c(b==null?"Can't transmit:":b)+" "+H.c(a)))},
cA:function(a){return this.aw(a,null)},
cO:function(a){var z=this.cM(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aw(a,"Can't serialize indexable: ")},
cM:function(a){var z,y,x
z=[]
C.a.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.L(a[y])
if(y>=z.length)return H.i(z,y)
z[y]=x}return z},
cN:function(a){var z
for(z=0;z<a.length;++z)C.a.C(a,z,this.L(a[z]))
return a},
cP:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aw(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.L(a[z[x]])
if(x>=y.length)return H.i(y,x)
y[x]=w}return["js-object",z,y]},
cR:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cQ:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gb8()]
return["raw sendport",a]}},
b9:{
"^":"b;a,b",
a4:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aV("Bad serialized message: "+H.c(a)))
switch(C.a.gem(a)){case"ref":if(1>=a.length)return H.i(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.i(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
y=H.a(this.am(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return H.a(this.am(x),[null])
case"mutable":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return this.am(x)
case"const":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
y=H.a(this.am(x),[null])
y.fixed$length=Array
return y
case"map":return this.ed(a)
case"sendport":return this.ee(a)
case"raw sendport":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.ec(a)
case"function":if(1>=a.length)return H.i(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.i(a,1)
return new H.ac(a[1])
case"dart":y=a.length
if(1>=y)return H.i(a,1)
w=a[1]
if(2>=y)return H.i(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.am(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.c(a))}},"$1","geb",2,0,2],
am:function(a){var z,y,x
z=J.R(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.H(x)
if(!(y<x))break
z.C(a,y,this.a4(z.h(a,y)));++y}return a},
ed:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.i(a,1)
y=a[1]
if(2>=z)return H.i(a,2)
x=a[2]
w=P.b1()
this.b.push(w)
y=J.eq(y,this.geb()).bx(0)
for(z=J.R(y),v=J.R(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.i(y,u)
w.C(0,y[u],this.a4(v.h(x,u)))}return w},
ee:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.i(a,1)
y=a[1]
if(2>=z)return H.i(a,2)
x=a[2]
if(3>=z)return H.i(a,3)
w=a[3]
if(J.W(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cn(w)
if(u==null)return
t=new H.bb(u,x)}else t=new H.bS(y,w,x)
this.b.push(t)
return t},
ec:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.i(a,1)
y=a[1]
if(2>=z)return H.i(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.R(y)
v=J.R(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.H(t)
if(!(u<t))break
w[z.h(y,u)]=this.a4(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eC:function(){throw H.e(new P.M("Cannot modify unmodifiable Map"))},
ip:function(a){return init.types[a]},
iC:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isb0},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.am(a)
if(typeof z!=="string")throw H.e(H.ak(a))
return z},
a3:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cQ:function(a){var z,y,x,w,v,u,t,s
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.o||!!J.m(a).$isb8){v=C.j(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof t==="string"&&/^\w+$/.test(t))w=t}if(w==null)w=v}else w=v}w=w
if(w.length>1)s=w.charCodeAt(0)===36
else s=!1
if(s)w=C.i.cW(w,1)
return(w+H.dG(H.bY(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b4:function(a){return"Instance of '"+H.cQ(a)+"'"},
E:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cN:function(a){return a.b?H.E(a).getUTCMilliseconds()+0:H.E(a).getMilliseconds()+0},
b3:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ak(a))
return a[b]},
bG:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ak(a))
a[b]=c},
H:function(a){throw H.e(H.ak(a))},
i:function(a,b){if(a==null)J.az(a)
throw H.e(H.x(a,b))},
x:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ab(!0,b,"index",null)
z=J.az(a)
if(!(b<0)){if(typeof z!=="number")return H.H(z)
y=b>=z}else y=!0
if(y)return P.bs(b,a,"index",null,z)
return P.b5(b,"index",null)},
ak:function(a){return new P.ab(!0,a,null,null)},
a_:function(a){return a},
dB:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.ak(a))
return a},
e:function(a){var z
if(a==null)a=new P.bF()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dO})
z.name=""}else z.toString=H.dO
return z},
dO:function(){return J.am(this.dartException)},
A:function(a){throw H.e(a)},
a9:function(a){throw H.e(new P.K(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iK(a)
if(a==null)return
if(a instanceof H.br)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bd(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bv(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.cM(v,null))}}if(a instanceof TypeError){u=$.$get$d3()
t=$.$get$d4()
s=$.$get$d5()
r=$.$get$d6()
q=$.$get$da()
p=$.$get$db()
o=$.$get$d8()
$.$get$d7()
n=$.$get$dd()
m=$.$get$dc()
l=u.O(y)
if(l!=null)return z.$1(H.bv(y,l))
else{l=t.O(y)
if(l!=null){l.method="call"
return z.$1(H.bv(y,l))}else{l=s.O(y)
if(l==null){l=r.O(y)
if(l==null){l=q.O(y)
if(l==null){l=p.O(y)
if(l==null){l=o.O(y)
if(l==null){l=r.O(y)
if(l==null){l=n.O(y)
if(l==null){l=m.O(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cM(y,l==null?null:l.method))}}return z.$1(new H.hb(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cV()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ab(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cV()
return a},
z:function(a){var z
if(a instanceof H.br)return a.b
if(a==null)return new H.dq(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dq(a,null)},
iF:function(a){if(a==null||typeof a!='object')return J.C(a)
else return H.a3(a)},
dD:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.C(0,a[y],a[x])}return b},
iw:function(a,b,c,d,e,f,g){var z=J.m(c)
if(z.t(c,0))return H.aJ(b,new H.ix(a))
else if(z.t(c,1))return H.aJ(b,new H.iy(a,d))
else if(z.t(c,2))return H.aJ(b,new H.iz(a,d,e))
else if(z.t(c,3))return H.aJ(b,new H.iA(a,d,e,f))
else if(z.t(c,4))return H.aJ(b,new H.iB(a,d,e,f,g))
else throw H.e(P.aX("Unsupported number of arguments for wrapped closure"))},
ax:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.iw)
a.$identity=z
return z},
eA:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isl){z.$reflectionInfo=c
x=H.fv(z).r}else x=c
w=d?Object.create(new H.fB().constructor.prototype):Object.create(new H.bo(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.S
$.S=J.ay(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ci(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ip(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cg:H.bp
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ci(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ex:function(a,b,c,d){var z=H.bp
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ci:function(a,b,c){var z,y,x,w,v,u
if(c)return H.ez(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ex(y,!w,z,b)
if(y===0){w=$.an
if(w==null){w=H.aW("self")
$.an=w}w="return function(){return this."+H.c(w)+"."+H.c(z)+"();"
v=$.S
$.S=J.ay(v,1)
return new Function(w+H.c(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.an
if(v==null){v=H.aW("self")
$.an=v}v=w+H.c(v)+"."+H.c(z)+"("+u+");"
w=$.S
$.S=J.ay(w,1)
return new Function(v+H.c(w)+"}")()},
ey:function(a,b,c,d){var z,y
z=H.bp
y=H.cg
switch(b?-1:a){case 0:throw H.e(new H.fx("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ez:function(a,b){var z,y,x,w,v,u,t,s
z=H.ew()
y=$.cf
if(y==null){y=H.aW("receiver")
$.cf=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ey(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.S
$.S=J.ay(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.S
$.S=J.ay(u,1)
return new Function(y+H.c(u)+"}")()},
bW:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.eA(a,b,z,!!d,e,f)},
iJ:function(a){throw H.e(new P.eE("Cyclic initialization for static "+H.c(a)))},
al:function(a,b,c){return new H.fy(a,b,c,null)},
aM:function(){return C.m},
bj:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a:function(a,b){a.$builtinTypeInfo=b
return a},
bY:function(a){if(a==null)return
return a.$builtinTypeInfo},
dE:function(a,b){return H.dN(a["$as"+H.c(b)],H.bY(a))},
N:function(a,b,c){var z=H.dE(a,b)
return z==null?null:z[c]},
v:function(a,b){var z=H.bY(a)
return z==null?null:z[b]},
c1:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dG(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dG:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bH("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.c(H.c1(u,c))}return w?"":"<"+H.c(z)+">"},
dN:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
ig:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.J(a[y],b[y]))return!1
return!0},
bd:function(a,b,c){return a.apply(b,H.dE(b,c))},
J:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dF(a,b)
if('func' in a)return b.builtin$cls==="eO"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c1(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.c(H.c1(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ig(H.dN(v,z),x)},
dz:function(a,b,c){var z,y,x,w,v
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
ie:function(a,b){var z,y,x,w,v,u
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
dF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.dz(x,w,!1))return!1
if(!H.dz(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}}return H.ie(a.named,b.named)},
k6:function(a){var z=$.bZ
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
k4:function(a){return H.a3(a)},
k3:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iD:function(a){var z,y,x,w,v,u
z=$.bZ.$1(a)
y=$.be[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bh[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dy.$2(a,z)
if(z!=null){y=$.be[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bh[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c0(x)
$.be[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bh[z]=x
return x}if(v==="-"){u=H.c0(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dI(a,x)
if(v==="*")throw H.e(new P.df(z))
if(init.leafTags[z]===true){u=H.c0(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dI(a,x)},
dI:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bi(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c0:function(a){return J.bi(a,!1,null,!!a.$isb0)},
iE:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bi(z,!1,null,!!z.$isb0)
else return J.bi(z,c,null,null)},
iu:function(){if(!0===$.c_)return
$.c_=!0
H.iv()},
iv:function(){var z,y,x,w,v,u,t,s
$.be=Object.create(null)
$.bh=Object.create(null)
H.iq()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dK.$1(v)
if(u!=null){t=H.iE(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
iq:function(){var z,y,x,w,v,u,t
z=C.t()
z=H.aj(C.p,H.aj(C.v,H.aj(C.k,H.aj(C.k,H.aj(C.u,H.aj(C.q,H.aj(C.r(C.j),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bZ=new H.ir(v)
$.dy=new H.is(u)
$.dK=new H.it(t)},
aj:function(a,b){return a(b)||b},
iI:function(a,b,c){return a.indexOf(b,c)>=0},
eB:{
"^":"b;",
i:function(a){return P.cG(this)},
C:function(a,b,c){return H.eC()}},
eR:{
"^":"eB;a",
b7:function(){var z=this.$map
if(z==null){z=new H.a1(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dD(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.b7().h(0,b)},
H:function(a,b){this.b7().H(0,b)},
gk:function(a){var z=this.b7()
return z.gk(z)}},
fu:{
"^":"b;a,b,c,d,e,f,r,x",
static:{fv:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fu(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
ha:{
"^":"b;a,b,c,d,e,f",
O:function(a){var z,y,x
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
static:{V:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ha(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d9:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cM:{
"^":"D;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
fe:{
"^":"D;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.c(z)+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.c(z)+"' on '"+H.c(y)+"' ("+H.c(this.a)+")"},
static:{bv:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fe(a,y,z?null:b.receiver)}}},
hb:{
"^":"D;a",
i:function(a){var z=this.a
return C.i.gM(z)?"Error":"Error: "+z}},
br:{
"^":"b;a,V:b<"},
iK:{
"^":"d:2;a",
$1:function(a){if(!!J.m(a).$isD)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dq:{
"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ix:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
iy:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
iz:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
iA:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iB:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"b;",
i:function(a){return"Closure '"+H.cQ(this)+"'"},
gcC:function(){return this},
gcC:function(){return this}},
cX:{
"^":"d;"},
fB:{
"^":"cX;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bo:{
"^":"cX;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bo))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.a3(this.a)
else y=typeof z!=="object"?J.C(z):H.a3(z)
z=H.a3(this.b)
if(typeof y!=="number")return y.f2()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.b4(z)},
static:{bp:function(a){return a.a},cg:function(a){return a.c},ew:function(){var z=$.an
if(z==null){z=H.aW("self")
$.an=z}return z},aW:function(a){var z,y,x,w,v
z=new H.bo("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fx:{
"^":"D;a",
i:function(a){return"RuntimeError: "+H.c(this.a)}},
cU:{
"^":"b;"},
fy:{
"^":"cU;a,b,c,d",
a3:function(a){var z=this.dn(a)
return z==null?!1:H.dF(z,this.af())},
dn:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
af:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$isjO)z.v=true
else if(!x.$isct)z.ret=y.af()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cT(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cT(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dC(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].af()}z.named=w}return z},
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
t=H.dC(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.c(z[s].af())+" "+s}x+="}"}}return x+(") -> "+H.c(this.a))},
static:{cT:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].af())
return z}}},
ct:{
"^":"cU;",
i:function(a){return"dynamic"},
af:function(){return}},
a1:{
"^":"b;a,b,c,d,e,f,r",
gk:function(a){return this.a},
gM:function(a){return this.a===0},
gck:function(){return H.a(new H.fg(this),[H.v(this,0)])},
gcB:function(a){return H.b2(this.gck(),new H.fd(this),H.v(this,0),H.v(this,1))},
al:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bO(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bO(y,a)}else return this.ew(a)},
ew:function(a){var z=this.d
if(z==null)return!1
return this.ar(this.T(z,this.aq(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.T(z,b)
return y==null?null:y.ga6()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.T(x,b)
return y==null?null:y.ga6()}else return this.ex(b)},
ex:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.T(z,this.aq(a))
x=this.ar(y,a)
if(x<0)return
return y[x].ga6()},
C:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.ba()
this.b=z}this.bG(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ba()
this.c=y}this.bG(y,b,c)}else{x=this.d
if(x==null){x=this.ba()
this.d=x}w=this.aq(b)
v=this.T(x,w)
if(v==null)this.bc(x,w,[this.bb(b,c)])
else{u=this.ar(v,b)
if(u>=0)v[u].sa6(c)
else v.push(this.bb(b,c))}}},
ad:function(a,b){if(typeof b==="string")return this.c1(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.c1(this.c,b)
else return this.ey(b)},
ey:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.T(z,this.aq(a))
x=this.ar(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.c6(w)
return w.ga6()},
U:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.K(this))
z=z.c}},
bG:function(a,b,c){var z=this.T(a,b)
if(z==null)this.bc(a,b,this.bb(b,c))
else z.sa6(c)},
c1:function(a,b){var z
if(a==null)return
z=this.T(a,b)
if(z==null)return
this.c6(z)
this.bP(a,b)
return z.ga6()},
bb:function(a,b){var z,y
z=new H.ff(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c6:function(a){var z,y
z=a.gdF()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aq:function(a){return J.C(a)&0x3ffffff},
ar:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.W(a[y].gcg(),b))return y
return-1},
i:function(a){return P.cG(this)},
T:function(a,b){return a[b]},
bc:function(a,b,c){a[b]=c},
bP:function(a,b){delete a[b]},
bO:function(a,b){return this.T(a,b)!=null},
ba:function(){var z=Object.create(null)
this.bc(z,"<non-identifier-key>",z)
this.bP(z,"<non-identifier-key>")
return z},
$iseZ:1},
fd:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
ff:{
"^":"b;cg:a<,a6:b@,c,dF:d<"},
fg:{
"^":"L;a",
gk:function(a){return this.a.a},
gF:function(a){var z,y
z=this.a
y=new H.fh(z,z.r,null,null)
y.c=z.e
return y},
H:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.K(z))
y=y.c}},
$isr:1},
fh:{
"^":"b;a,b,c,d",
gD:function(){return this.d},
w:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.K(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ir:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
is:{
"^":"d:10;a",
$2:function(a,b){return this.a(a,b)}},
it:{
"^":"d:11;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bt:function(){return new P.af("No element")},
f7:function(){return new P.af("Too few elements")},
bw:{
"^":"L;",
gF:function(a){return new H.cE(this,this.gk(this),0,null)},
H:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.X(0,y))
if(z!==this.gk(this))throw H.e(new P.K(this))}},
ac:function(a,b){return H.a(new H.bA(this,b),[null,null])},
by:function(a,b){var z,y,x
z=H.a([],[H.N(this,"bw",0)])
C.a.sk(z,this.gk(this))
for(y=0;y<this.gk(this);++y){x=this.X(0,y)
if(y>=z.length)return H.i(z,y)
z[y]=x}return z},
bx:function(a){return this.by(a,!0)},
$isr:1},
cE:{
"^":"b;a,b,c,d",
gD:function(){return this.d},
w:function(){var z,y,x,w
z=this.a
y=J.R(z)
x=y.gk(z)
if(this.b!==x)throw H.e(new P.K(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.X(z,w);++this.c
return!0}},
cF:{
"^":"L;a,b",
gF:function(a){var z=new H.fk(null,J.bn(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gk:function(a){return J.az(this.a)},
$asL:function(a,b){return[b]},
static:{b2:function(a,b,c,d){if(!!J.m(a).$isr)return H.a(new H.cu(a,b),[c,d])
return H.a(new H.cF(a,b),[c,d])}}},
cu:{
"^":"cF;a,b",
$isr:1},
fk:{
"^":"f8;a,b,c",
w:function(){var z=this.b
if(z.w()){this.a=this.b6(z.gD())
return!0}this.a=null
return!1},
gD:function(){return this.a},
b6:function(a){return this.c.$1(a)}},
bA:{
"^":"bw;a,b",
gk:function(a){return J.az(this.a)},
X:function(a,b){return this.b6(J.e4(this.a,b))},
b6:function(a){return this.b.$1(a)},
$asbw:function(a,b){return[b]},
$asL:function(a,b){return[b]},
$isr:1},
cx:{
"^":"b;"}}],["","",,H,{
"^":"",
dC:function(a){var z=H.a(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
hd:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ih()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ax(new P.hf(z),1)).observe(y,{childList:true})
return new P.he(z,y,x)}else if(self.setImmediate!=null)return P.ii()
return P.ij()},
jQ:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ax(new P.hg(a),0))},"$1","ih",2,0,4],
jR:[function(a){++init.globalState.f.b
self.setImmediate(H.ax(new P.hh(a),0))},"$1","ii",2,0,4],
jS:[function(a){P.bI(C.f,a)},"$1","ij",2,0,4],
u:function(a,b,c){if(b===0){J.dZ(c,a)
return}else if(b===1){c.cc(H.B(a),H.z(a))
return}P.i_(a,b)
return c.gen()},
i_:function(a,b){var z,y,x,w
z=new P.i0(b)
y=new P.i1(b)
x=J.m(a)
if(!!x.$isy)a.be(z,y)
else if(!!x.$isY)a.aT(z,y)
else{w=H.a(new P.y(0,$.k,null),[null])
w.a=4
w.c=a
w.be(z,null)}},
aL:function(a){var z=function(b,c){while(true)try{a(b,c)
break}catch(y){c=y
b=1}}
$.k.toString
return new P.id(z)},
dt:function(a,b){var z=H.aM()
z=H.al(z,[z,z]).a3(a)
if(z){b.toString
return a}else{b.toString
return a}},
eP:function(a,b,c){var z=H.a(new P.y(0,$.k,null),[c])
P.cZ(a,new P.eQ(b,z))
return z},
aA:function(a){return H.a(new P.hY(H.a(new P.y(0,$.k,null),[a])),[a])},
i7:function(a,b,c){$.k.toString
a.I(b,c)},
i9:function(){var z,y
for(;z=$.ah,z!=null;){$.av=null
y=z.c
$.ah=y
if(y==null)$.au=null
$.k=z.b
z.dT()}},
k2:[function(){$.bT=!0
try{P.i9()}finally{$.k=C.c
$.av=null
$.bT=!1
if($.ah!=null)$.$get$bO().$1(P.dA())}},"$0","dA",0,0,1],
dx:function(a){if($.ah==null){$.au=a
$.ah=a
if(!$.bT)$.$get$bO().$1(P.dA())}else{$.au.c=a
$.au=a}},
dL:function(a){var z,y
z=$.k
if(C.c===z){P.ai(null,null,C.c,a)
return}z.toString
if(C.c.gbl()===z){P.ai(null,null,z,a)
return}y=$.k
P.ai(null,null,y,y.bg(a,!0))},
jG:function(a,b){var z,y,x
z=H.a(new P.dr(null,null,null,0),[b])
y=z.gdA()
x=z.gdC()
z.a=a.Z(y,!0,z.gdB(),x)
return z},
ic:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.B(u)
z=t
y=H.z(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.X(x)
w=t
v=x.gV()
c.$2(w,v)}}},
i2:function(a,b,c,d){var z=a.bi()
if(!!J.m(z).$isY)z.bA(new P.i5(b,c,d))
else b.I(c,d)},
i3:function(a,b){return new P.i4(a,b)},
cZ:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bI(a,b)}return P.bI(a,z.bg(b,!0))},
bI:function(a,b){var z=C.d.ak(a.a,1000)
return H.fN(z<0?0:z,b)},
aK:function(a,b,c,d,e){var z,y,x
z={}
z.a=d
y=new P.dh(new P.ib(z,e),C.c,null)
z=$.ah
if(z==null){P.dx(y)
$.av=$.au}else{x=$.av
if(x==null){y.c=z
$.av=y
$.ah=y}else{y.c=x.c
x.c=y
$.av=y
if(y.c==null)$.au=y}}},
ia:function(a,b){throw H.e(new P.a0(a,b))},
du:function(a,b,c,d){var z,y
y=$.k
if(y===c)return d.$0()
$.k=c
z=y
try{y=d.$0()
return y}finally{$.k=z}},
dw:function(a,b,c,d,e){var z,y
y=$.k
if(y===c)return d.$1(e)
$.k=c
z=y
try{y=d.$1(e)
return y}finally{$.k=z}},
dv:function(a,b,c,d,e,f){var z,y
y=$.k
if(y===c)return d.$2(e,f)
$.k=c
z=y
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ai:function(a,b,c,d){var z=C.c!==c
if(z){d=c.bg(d,!(!z||C.c.gbl()===c))
c=C.c}P.dx(new P.dh(d,c,null))},
hf:{
"^":"d:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
he:{
"^":"d:12;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hg:{
"^":"d:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
hh:{
"^":"d:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
i0:{
"^":"d:2;a",
$1:function(a){return this.a.$2(0,a)}},
i1:{
"^":"d:5;a",
$2:function(a,b){this.a.$2(1,new H.br(a,b))}},
id:{
"^":"d:13;a",
$2:function(a,b){this.a(a,b)}},
Y:{
"^":"b;"},
eQ:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a1(null)}catch(x){w=H.B(x)
z=w
y=H.z(x)
P.i7(this.b,z,y)}}},
dj:{
"^":"b;en:a<",
cc:function(a,b){a=a!=null?a:new P.bF()
if(this.a.a!==0)throw H.e(new P.af("Future already completed"))
$.k.toString
this.I(a,b)},
e_:function(a){return this.cc(a,null)}},
hc:{
"^":"dj;a",
aF:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.af("Future already completed"))
z.bI(b)},
I:function(a,b){this.a.dg(a,b)}},
hY:{
"^":"dj;a",
aF:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.af("Future already completed"))
z.a1(b)},
I:function(a,b){this.a.I(a,b)}},
ar:{
"^":"b;bW:a<,eO:b>,c,d,e",
ga9:function(){return this.b.b},
gcf:function(){return(this.c&1)!==0},
geu:function(){return this.c===6},
ges:function(){return this.c===8},
gdE:function(){return this.d},
gdL:function(){return this.d}},
y:{
"^":"b;aC:a?,a9:b<,c",
gdv:function(){return this.a===8},
sdw:function(a){this.a=2},
aT:function(a,b){var z=$.k
if(z!==C.c){z.toString
if(b!=null)b=P.dt(b,z)}return this.be(a,b)},
eV:function(a){return this.aT(a,null)},
be:function(a,b){var z=H.a(new P.y(0,$.k,null),[null])
this.aY(new P.ar(null,z,b==null?1:3,a,b))
return z},
bA:function(a){var z,y
z=$.k
y=new P.y(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aY(new P.ar(null,y,8,a,null))
return y},
b9:function(){if(this.a!==0)throw H.e(new P.af("Future already completed"))
this.a=1},
gdK:function(){return this.c},
gaj:function(){return this.c},
dI:function(a,b){this.a=8
this.c=new P.a0(a,b)},
aY:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ai(null,null,z,new P.hu(this,a))}else{a.a=this.c
this.c=a}},
aB:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbW()
z.a=y}return y},
a1:function(a){var z,y
z=J.m(a)
if(!!z.$isY)if(!!z.$isy)P.ba(a,this)
else P.bQ(a,this)
else{y=this.aB()
this.a=4
this.c=a
P.a7(this,y)}},
bN:function(a){var z=this.aB()
this.a=4
this.c=a
P.a7(this,z)},
I:[function(a,b){var z=this.aB()
this.a=8
this.c=new P.a0(a,b)
P.a7(this,z)},function(a){return this.I(a,null)},"f3","$2","$1","gb3",2,2,14,0],
bI:function(a){var z
if(a==null);else{z=J.m(a)
if(!!z.$isY){if(!!z.$isy){z=a.a
if(z>=4&&z===8){this.b9()
z=this.b
z.toString
P.ai(null,null,z,new P.hw(this,a))}else P.ba(a,this)}else P.bQ(a,this)
return}}this.b9()
z=this.b
z.toString
P.ai(null,null,z,new P.hx(this,a))},
dg:function(a,b){var z
this.b9()
z=this.b
z.toString
P.ai(null,null,z,new P.hv(this,a,b))},
$isY:1,
static:{bQ:function(a,b){var z,y,x,w
b.saC(2)
try{a.aT(new P.hy(b),new P.hz(b))}catch(x){w=H.B(x)
z=w
y=H.z(x)
P.dL(new P.hA(b,z,y))}},ba:function(a,b){var z
b.a=2
z=new P.ar(null,b,0,null,null)
if(a.a>=4)P.a7(a,z)
else a.aY(z)},a7:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdv()
if(b==null){if(w){v=z.a.gaj()
y=z.a.ga9()
x=J.X(v)
u=v.gV()
y.toString
P.aK(null,null,y,x,u)}return}for(;b.gbW()!=null;b=t){t=b.a
b.a=null
P.a7(z.a,b)}x.a=!0
s=w?null:z.a.gdK()
x.b=s
x.c=!1
y=!w
if(!y||b.gcf()||b.c===8){r=b.ga9()
if(w){u=z.a.ga9()
u.toString
if(u==null?r!=null:u!==r){u=u.gbl()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaj()
y=z.a.ga9()
x=J.X(v)
u=v.gV()
y.toString
P.aK(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gcf())x.a=new P.hC(x,b,s,r).$0()}else new P.hB(z,x,b,r).$0()
if(b.ges())new P.hD(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.m(y).$isY}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.y)if(p.a>=4){o.a=2
z.a=p
b=new P.ar(null,o,0,null,null)
y=p
continue}else P.ba(p,o)
else P.bQ(p,o)
return}}o=b.b
b=o.aB()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hu:{
"^":"d:0;a,b",
$0:function(){P.a7(this.a,this.b)}},
hy:{
"^":"d:2;a",
$1:function(a){this.a.bN(a)}},
hz:{
"^":"d:6;a",
$2:function(a,b){this.a.I(a,b)},
$1:function(a){return this.$2(a,null)}},
hA:{
"^":"d:0;a,b,c",
$0:function(){this.a.I(this.b,this.c)}},
hw:{
"^":"d:0;a,b",
$0:function(){P.ba(this.b,this.a)}},
hx:{
"^":"d:0;a,b",
$0:function(){this.a.bN(this.b)}},
hv:{
"^":"d:0;a,b,c",
$0:function(){this.a.I(this.b,this.c)}},
hC:{
"^":"d:15;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.bv(this.b.gdE(),this.c)
return!0}catch(x){w=H.B(x)
z=w
y=H.z(x)
this.a.b=new P.a0(z,y)
return!1}}},
hB:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaj()
y=!0
r=this.c
if(r.geu()){x=r.d
try{y=this.d.bv(x,J.X(z))}catch(q){r=H.B(q)
w=r
v=H.z(q)
r=J.X(z)
p=w
o=(r==null?p==null:r===p)?z:new P.a0(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aM()
p=H.al(p,[p,p]).a3(r)
n=this.d
m=this.b
if(p)m.b=n.eQ(u,J.X(z),z.gV())
else m.b=n.bv(u,J.X(z))}catch(q){r=H.B(q)
t=r
s=H.z(q)
r=J.X(z)
p=t
o=(r==null?p==null:r===p)?z:new P.a0(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hD:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.ct(this.d.gdL())
z.a=w
v=w}catch(u){z=H.B(u)
y=z
x=H.z(u)
if(this.c){z=J.X(this.a.a.gaj())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaj()
else v.b=new P.a0(y,x)
v.a=!1
return}if(!!J.m(v).$isY){t=this.d
s=t.geO(t)
s.sdw(!0)
this.b.c=!0
v.aT(new P.hE(this.a,s),new P.hF(z,s))}}},
hE:{
"^":"d:2;a,b",
$1:function(a){P.a7(this.a.a,new P.ar(null,this.b,0,null,null))}},
hF:{
"^":"d:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.y)){y=H.a(new P.y(0,$.k,null),[null])
z.a=y
y.dI(a,b)}P.a7(z.a,new P.ar(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dh:{
"^":"b;a,b,c",
dT:function(){return this.a.$0()}},
a5:{
"^":"b;",
ac:function(a,b){return H.a(new P.hO(b,this),[H.N(this,"a5",0),null])},
H:function(a,b){var z,y
z={}
y=H.a(new P.y(0,$.k,null),[null])
z.a=null
z.a=this.Z(new P.fF(z,this,b,y),!0,new P.fG(y),y.gb3())
return y},
gk:function(a){var z,y
z={}
y=H.a(new P.y(0,$.k,null),[P.o])
z.a=0
this.Z(new P.fH(z),!0,new P.fI(z,y),y.gb3())
return y},
bx:function(a){var z,y
z=H.a([],[H.N(this,"a5",0)])
y=H.a(new P.y(0,$.k,null),[[P.l,H.N(this,"a5",0)]])
this.Z(new P.fJ(this,z),!0,new P.fK(z,y),y.gb3())
return y}},
fF:{
"^":"d;a,b,c,d",
$1:function(a){P.ic(new P.fD(this.c,a),new P.fE(),P.i3(this.a.a,this.d))},
$signature:function(){return H.bd(function(a){return{func:1,args:[a]}},this.b,"a5")}},
fD:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fE:{
"^":"d:2;",
$1:function(a){}},
fG:{
"^":"d:0;a",
$0:function(){this.a.a1(null)}},
fH:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
fI:{
"^":"d:0;a,b",
$0:function(){this.b.a1(this.a.a)}},
fJ:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bd(function(a){return{func:1,args:[a]}},this.a,"a5")}},
fK:{
"^":"d:0;a,b",
$0:function(){this.b.a1(this.a)}},
fC:{
"^":"b;"},
jW:{
"^":"b;"},
hi:{
"^":"b;a9:d<,aC:e?",
br:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c9()
if((z&4)===0&&(this.e&32)===0)this.bT(this.gbY())},
au:function(a){return this.br(a,null)},
cs:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gM(z)}else z=!1
if(z)this.r.aV(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bT(this.gc_())}}}},
bi:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.b0()
return this.f},
b0:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c9()
if((this.e&32)===0)this.r=null
this.f=this.bX()},
b_:["d1",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.c3(a)
else this.aZ(new P.hn(a,null))}],
aX:["d2",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.c5(a,b)
else this.aZ(new P.hp(a,b,null))}],
df:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.c4()
else this.aZ(C.n)},
bZ:[function(){},"$0","gbY",0,0,1],
c0:[function(){},"$0","gc_",0,0,1],
bX:function(){return},
aZ:function(a){var z,y
z=this.r
if(z==null){z=new P.hX(null,null,0)
this.r=z}z.aa(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aV(this)}},
c3:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bw(this.a,a)
this.e=(this.e&4294967263)>>>0
this.b1((z&4)!==0)},
c5:function(a,b){var z,y
z=this.e
y=new P.hk(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.b0()
z=this.f
if(!!J.m(z).$isY)z.bA(y)
else y.$0()}else{y.$0()
this.b1((z&4)!==0)}},
c4:function(){var z,y
z=new P.hj(this)
this.b0()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isY)y.bA(z)
else z.$0()},
bT:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.b1((z&4)!==0)},
b1:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gM(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gM(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bZ()
else this.c0()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aV(this)},
da:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dt(b,z)
this.c=c}},
hk:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aM()
x=H.al(x,[x,x]).a3(y)
w=z.d
v=this.b
u=z.b
if(x)w.eR(u,v,this.c)
else w.bw(u,v)
z.e=(z.e&4294967263)>>>0}},
hj:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cu(z.c)
z.e=(z.e&4294967263)>>>0}},
dk:{
"^":"b;aJ:a@"},
hn:{
"^":"dk;b,a",
bs:function(a){a.c3(this.b)}},
hp:{
"^":"dk;ao:b>,V:c<,a",
bs:function(a){a.c5(this.b,this.c)}},
ho:{
"^":"b;",
bs:function(a){a.c4()},
gaJ:function(){return},
saJ:function(a){throw H.e(new P.af("No events after a done."))}},
hQ:{
"^":"b;aC:a?",
aV:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dL(new P.hR(this,a))
this.a=1},
c9:function(){if(this.a===1)this.a=3}},
hR:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.ep(this.b)}},
hX:{
"^":"hQ;b,c,a",
gM:function(a){return this.c==null},
aa:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saJ(b)
this.c=b}},
ep:function(a){var z,y
z=this.b
y=z.gaJ()
this.b=y
if(y==null)this.c=null
z.bs(a)}},
dr:{
"^":"b;a,b,c,aC:d?",
bJ:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
f7:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a1(!0)
return}this.a.au(0)
this.c=a
this.d=3},"$1","gdA",2,0,function(){return H.bd(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dr")}],
dD:[function(a,b){var z
if(this.d===2){z=this.c
this.bJ(0)
z.I(a,b)
return}this.a.au(0)
this.c=new P.a0(a,b)
this.d=4},function(a){return this.dD(a,null)},"f9","$2","$1","gdC",2,2,16,0],
f8:[function(){if(this.d===2){var z=this.c
this.bJ(0)
z.a1(!1)
return}this.a.au(0)
this.c=null
this.d=5},"$0","gdB",0,0,1]},
i5:{
"^":"d:0;a,b,c",
$0:function(){return this.a.I(this.b,this.c)}},
i4:{
"^":"d:5;a,b",
$2:function(a,b){return P.i2(this.a,this.b,a,b)}},
bP:{
"^":"a5;",
Z:function(a,b,c,d){return this.dl(a,d,c,!0===b)},
cm:function(a,b,c){return this.Z(a,null,b,c)},
dl:function(a,b,c,d){return P.ht(this,a,b,c,d,H.N(this,"bP",0),H.N(this,"bP",1))},
bU:function(a,b){b.b_(a)},
$asa5:function(a,b){return[b]}},
dl:{
"^":"hi;x,y,a,b,c,d,e,f,r",
b_:function(a){if((this.e&2)!==0)return
this.d1(a)},
aX:function(a,b){if((this.e&2)!==0)return
this.d2(a,b)},
bZ:[function(){var z=this.y
if(z==null)return
z.au(0)},"$0","gbY",0,0,1],
c0:[function(){var z=this.y
if(z==null)return
z.cs()},"$0","gc_",0,0,1],
bX:function(){var z=this.y
if(z!=null){this.y=null
return z.bi()}return},
f4:[function(a){this.x.bU(a,this)},"$1","gdr",2,0,function(){return H.bd(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"dl")}],
f6:[function(a,b){this.aX(a,b)},"$2","gdt",4,0,17],
f5:[function(){this.df()},"$0","gds",0,0,1],
dc:function(a,b,c,d,e,f,g){var z,y
z=this.gdr()
y=this.gdt()
this.y=this.x.a.cm(z,this.gds(),y)},
static:{ht:function(a,b,c,d,e,f,g){var z=$.k
z=H.a(new P.dl(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.da(b,c,d,e)
z.dc(a,b,c,d,e,f,g)
return z}}},
hO:{
"^":"bP;b,a",
bU:function(a,b){var z,y,x,w,v
z=null
try{z=this.dJ(a)}catch(w){v=H.B(w)
y=v
x=H.z(w)
$.k.toString
b.aX(y,x)
return}b.b_(z)},
dJ:function(a){return this.b.$1(a)}},
a0:{
"^":"b;ao:a>,V:b<",
i:function(a){return H.c(this.a)},
$isD:1},
hZ:{
"^":"b;"},
ib:{
"^":"d:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bF()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
P.ia(z,y)}},
hT:{
"^":"hZ;",
gbl:function(){return this},
cu:function(a){var z,y,x,w
try{if(C.c===$.k){x=a.$0()
return x}x=P.du(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.z(w)
return P.aK(null,null,this,z,y)}},
bw:function(a,b){var z,y,x,w
try{if(C.c===$.k){x=a.$1(b)
return x}x=P.dw(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.z(w)
return P.aK(null,null,this,z,y)}},
eR:function(a,b,c){var z,y,x,w
try{if(C.c===$.k){x=a.$2(b,c)
return x}x=P.dv(null,null,this,a,b,c)
return x}catch(w){x=H.B(w)
z=x
y=H.z(w)
return P.aK(null,null,this,z,y)}},
bg:function(a,b){if(b)return new P.hU(this,a)
else return new P.hV(this,a)},
dP:function(a,b){return new P.hW(this,a)},
h:function(a,b){return},
ct:function(a){if($.k===C.c)return a.$0()
return P.du(null,null,this,a)},
bv:function(a,b){if($.k===C.c)return a.$1(b)
return P.dw(null,null,this,a,b)},
eQ:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.dv(null,null,this,a,b,c)}},
hU:{
"^":"d:0;a,b",
$0:function(){return this.a.cu(this.b)}},
hV:{
"^":"d:0;a,b",
$0:function(){return this.a.ct(this.b)}},
hW:{
"^":"d:2;a,b",
$1:function(a){return this.a.bw(this.b,a)}}}],["","",,P,{
"^":"",
b1:function(){return H.a(new H.a1(0,null,null,null,null,null,0),[null,null])},
ae:function(a){return H.dD(a,H.a(new H.a1(0,null,null,null,null,null,0),[null,null]))},
f6:function(a,b,c){var z,y
if(P.bU(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aw()
y.push(a)
try{P.i8(a,z)}finally{if(0>=y.length)return H.i(y,-1)
y.pop()}y=P.cW(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aY:function(a,b,c){var z,y,x
if(P.bU(a))return b+"..."+c
z=new P.bH(b)
y=$.$get$aw()
y.push(a)
try{x=z
x.a=P.cW(x.ga8(),a,", ")}finally{if(0>=y.length)return H.i(y,-1)
y.pop()}y=z
y.a=y.ga8()+c
y=z.ga8()
return y.charCodeAt(0)==0?y:y},
bU:function(a){var z,y
for(z=0;y=$.$get$aw(),z<y.length;++z)if(a===y[z])return!0
return!1},
i8:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gF(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.w())return
w=H.c(z.gD())
b.push(w)
y+=w.length+2;++x}if(!z.w()){if(x<=5)return
if(0>=b.length)return H.i(b,-1)
v=b.pop()
if(0>=b.length)return H.i(b,-1)
u=b.pop()}else{t=z.gD();++x
if(!z.w()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.i(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gD();++x
for(;z.w();t=s,s=r){r=z.gD();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.i(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.i(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ao:function(a,b,c,d){return H.a(new P.hI(0,null,null,null,null,null,0),[d])},
cG:function(a){var z,y,x
z={}
if(P.bU(a))return"{...}"
y=new P.bH("")
try{$.$get$aw().push(a)
x=y
x.a=x.ga8()+"{"
z.a=!0
J.e5(a,new P.fl(z,y))
z=y
z.a=z.ga8()+"}"}finally{z=$.$get$aw()
if(0>=z.length)return H.i(z,-1)
z.pop()}z=y.ga8()
return z.charCodeAt(0)==0?z:z},
dp:{
"^":"a1;a,b,c,d,e,f,r",
aq:function(a){return H.iF(a)&0x3ffffff},
ar:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcg()
if(x==null?b==null:x===b)return y}return-1},
static:{at:function(a,b){return H.a(new P.dp(0,null,null,null,null,null,0),[a,b])}}},
hI:{
"^":"hG;a,b,c,d,e,f,r",
gF:function(a){var z=new P.cD(this,this.r,null,null)
z.c=this.e
return z},
gk:function(a){return this.a},
e0:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dk(b)},
dk:function(a){var z=this.d
if(z==null)return!1
return this.aA(z[this.az(a)],a)>=0},
cn:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.e0(0,a)?a:null
else return this.dz(a)},
dz:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.az(a)]
x=this.aA(y,a)
if(x<0)return
return J.c2(y,x).gbQ()},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.K(this))
z=z.b}},
aa:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bK(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bK(x,b)}else return this.W(b)},
W:function(a){var z,y,x
z=this.d
if(z==null){z=P.hJ()
this.d=z}y=this.az(a)
x=z[y]
if(x==null)z[y]=[this.b2(a)]
else{if(this.aA(x,a)>=0)return!1
x.push(this.b2(a))}return!0},
ad:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bL(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bL(this.c,b)
else return this.dG(b)},
dG:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.az(a)]
x=this.aA(y,a)
if(x<0)return!1
this.bM(y.splice(x,1)[0])
return!0},
U:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bK:function(a,b){if(a[b]!=null)return!1
a[b]=this.b2(b)
return!0},
bL:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bM(z)
delete a[b]
return!0},
b2:function(a){var z,y
z=new P.fi(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bM:function(a){var z,y
z=a.gdj()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
az:function(a){return J.C(a)&0x3ffffff},
aA:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.W(a[y].gbQ(),b))return y
return-1},
$isr:1,
static:{hJ:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fi:{
"^":"b;bQ:a<,b,dj:c<"},
cD:{
"^":"b;a,b,c,d",
gD:function(){return this.d},
w:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.K(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hG:{
"^":"fz;"},
bx:{
"^":"b;",
gF:function(a){return new H.cE(a,this.gk(a),0,null)},
X:function(a,b){return this.h(a,b)},
H:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<z;++y){if(y>=a.length)return H.i(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.K(a))}},
ac:function(a,b){return H.a(new H.bA(a,b),[null,null])},
i:function(a){return P.aY(a,"[","]")},
$isl:1,
$asl:null,
$isr:1},
fl:{
"^":"d:18;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.c(a)
z.a=y+": "
z.a+=H.c(b)}},
fj:{
"^":"L;a,b,c,d",
gF:function(a){return new P.hK(this,this.c,this.d,this.b,null)},
H:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.i(x,y)
b.$1(x[y])
if(z!==this.d)H.A(new P.K(this))}},
gM:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
U:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.i(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aY(this,"{","}")},
cr:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bt());++this.d
y=this.a
x=y.length
if(z>=x)return H.i(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
W:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.i(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bS();++this.d},
bS:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.a(z,[H.v(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.bE(y,0,w,z,x)
C.a.bE(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
d4:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.a(z,[b])},
$isr:1,
static:{by:function(a,b){var z=H.a(new P.fj(null,0,0,0),[b])
z.d4(a,b)
return z}}},
hK:{
"^":"b;a,b,c,d,e",
gD:function(){return this.e},
w:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.A(new P.K(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.i(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fA:{
"^":"b;",
ac:function(a,b){return H.a(new H.cu(this,b),[H.v(this,0),null])},
i:function(a){return P.aY(this,"{","}")},
H:function(a,b){var z
for(z=this.gF(this);z.w();)b.$1(z.d)},
$isr:1},
fz:{
"^":"fA;"}}],["","",,P,{
"^":"",
cv:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.am(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eL(a)},
eL:function(a){var z=J.m(a)
if(!!z.$isd)return z.i(a)
return H.b4(a)},
aX:function(a){return new P.hs(a)},
bz:function(a,b,c){var z,y
z=H.a([],[c])
for(y=J.bn(a);y.w();)z.push(y.gD())
return z},
aP:function(a){var z=H.c(a)
H.dJ(z)},
bV:{
"^":"b;"},
"+bool":0,
cm:{
"^":"b;a,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.cm))return!1
return this.a===b.a&&this.b===b.b},
gA:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.eF(z?H.E(this).getUTCFullYear()+0:H.E(this).getFullYear()+0)
x=P.aB(z?H.E(this).getUTCMonth()+1:H.E(this).getMonth()+1)
w=P.aB(z?H.E(this).getUTCDate()+0:H.E(this).getDate()+0)
v=P.aB(z?H.E(this).getUTCHours()+0:H.E(this).getHours()+0)
u=P.aB(z?H.E(this).getUTCMinutes()+0:H.E(this).getMinutes()+0)
t=P.aB(z?H.E(this).getUTCSeconds()+0:H.E(this).getSeconds()+0)
s=P.eG(H.cN(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{eF:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.c(z)
if(z>=10)return y+"00"+H.c(z)
return y+"000"+H.c(z)},eG:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aB:function(a){if(a>=10)return""+a
return"0"+a}}},
aa:{
"^":"aO;"},
"+double":0,
aC:{
"^":"b;a",
m:function(a,b){return new P.aC(C.d.m(this.a,b.gdm()))},
aU:function(a,b){return C.d.aU(this.a,b.gdm())},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.aC))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eK()
y=this.a
if(y<0)return"-"+new P.aC(-y).i(0)
x=z.$1(C.d.bt(C.d.ak(y,6e7),60))
w=z.$1(C.d.bt(C.d.ak(y,1e6),60))
v=new P.eJ().$1(C.d.bt(y,1e6))
return""+C.d.ak(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)}},
eJ:{
"^":"d:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eK:{
"^":"d:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
D:{
"^":"b;",
gV:function(){return H.z(this.$thrownJsError)}},
bF:{
"^":"D;",
i:function(a){return"Throw of null."}},
ab:{
"^":"D;a,b,c,d",
gb5:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gb4:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.c(z)+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gb5()+y+x
if(!this.a)return w
v=this.gb4()
u=P.cv(this.b)
return w+v+": "+H.c(u)},
static:{aV:function(a){return new P.ab(!1,null,null,a)},eu:function(a,b,c){return new P.ab(!0,a,b,c)}}},
cR:{
"^":"ab;e,f,a,b,c,d",
gb5:function(){return"RangeError"},
gb4:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else{if(typeof x!=="number")return x.f0()
if(typeof z!=="number")return H.H(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b5:function(a,b,c){return new P.cR(null,null,!0,a,b,"Value not in range")},ap:function(a,b,c,d,e){return new P.cR(b,c,!0,a,d,"Invalid value")},cS:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.ap(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.ap(b,a,c,"end",f))
return b}}},
eV:{
"^":"ab;e,k:f>,a,b,c,d",
gb5:function(){return"RangeError"},
gb4:function(){if(J.dP(this.b,0))return": index must not be negative"
var z=this.f
if(J.W(z,0))return": no indices are valid"
return": index should be less than "+H.c(z)},
static:{bs:function(a,b,c,d,e){var z=e!=null?e:J.az(b)
return new P.eV(b,z,!0,a,c,"Index out of range")}}},
M:{
"^":"D;a",
i:function(a){return"Unsupported operation: "+this.a}},
df:{
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
return"Concurrent modification during iteration: "+H.c(P.cv(z))+"."}},
cV:{
"^":"b;",
i:function(a){return"Stack Overflow"},
gV:function(){return},
$isD:1},
eE:{
"^":"D;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hs:{
"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
eM:{
"^":"b;a",
i:function(a){return"Expando:"+H.c(this.a)},
h:function(a,b){var z=H.b3(b,"expando$values")
return z==null?null:H.b3(z,this.bR())},
C:function(a,b,c){var z=H.b3(b,"expando$values")
if(z==null){z=new P.b()
H.bG(b,"expando$values",z)}H.bG(z,this.bR(),c)},
bR:function(){var z,y
z=H.b3(this,"expando$key")
if(z==null){y=$.cw
$.cw=y+1
z="expando$key$"+y
H.bG(this,"expando$key",z)}return z}},
eO:{
"^":"b;"},
o:{
"^":"aO;"},
"+int":0,
L:{
"^":"b;",
ac:function(a,b){return H.b2(this,b,H.N(this,"L",0),null)},
H:function(a,b){var z
for(z=this.gF(this);z.w();)b.$1(z.gD())},
by:function(a,b){return P.bz(this,!0,H.N(this,"L",0))},
bx:function(a){return this.by(a,!0)},
gk:function(a){var z,y
z=this.gF(this)
for(y=0;z.w();)++y
return y},
X:function(a,b){var z,y,x
if(b<0)H.A(P.ap(b,0,null,"index",null))
for(z=this.gF(this),y=0;z.w();){x=z.gD()
if(b===y)return x;++y}throw H.e(P.bs(b,this,"index",null,y))},
i:function(a){return P.f6(this,"(",")")}},
f8:{
"^":"b;"},
l:{
"^":"b;",
$asl:null,
$isr:1},
"+List":0,
jx:{
"^":"b;",
i:function(a){return"null"}},
"+Null":0,
aO:{
"^":"b;"},
"+num":0,
b:{
"^":";",
t:function(a,b){return this===b},
gA:function(a){return H.a3(this)},
i:function(a){return H.b4(this)},
toString:function(){return this.i(this)}},
a4:{
"^":"b;"},
Q:{
"^":"b;"},
"+String":0,
bH:{
"^":"b;a8:a<",
gk:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cW:function(a,b,c){var z=J.bn(b)
if(!z.w())return a
if(c.length===0){do a+=H.c(z.gD())
while(z.w())}else{a+=H.c(z.gD())
for(;z.w();)a=a+c+H.c(z.gD())}return a}}}}],["","",,W,{
"^":"",
cj:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.w)},
a8:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dm:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
ds:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hm(a)
if(!!J.m(z).$isO)return z
return}else return a},
G:function(a){var z=$.k
if(z===C.c)return a
return z.dP(a,!0)},
w:{
"^":"aD;",
$isw:1,
$isb:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iN:{
"^":"w;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iP:{
"^":"w;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iQ:{
"^":"w;",
gas:function(a){return H.a(new W.t(a,"error",!1),[null])},
gat:function(a){return H.a(new W.t(a,"load",!1),[null])},
$isO:1,
$isf:1,
"%":"HTMLBodyElement"},
ch:{
"^":"w;j:height%,l:width%",
bB:function(a,b,c){return a.getContext(b,P.ik(c,null))},
cG:function(a,b,c,d,e,f,g){var z,y
z=P.ae(["alpha",!0,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.bB(a,"webgl",z)
return y==null?this.bB(a,"experimental-webgl",z):y},
cF:function(a,b){return this.cG(a,!0,!0,!0,!0,!1,b)},
$isch:1,
"%":"HTMLCanvasElement"},
iS:{
"^":"aH;k:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iT:{
"^":"eW;k:length=",
bC:function(a,b){var z=this.dq(a,b)
return z!=null?z:""},
dq:function(a,b){if(W.cj(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.cr()+b)},
aW:function(a,b,c,d){var z=this.dh(a,b)
a.setProperty(z,c,d)
return},
dh:function(a,b){var z,y
z=$.$get$ck()
y=z[b]
if(typeof y==="string")return y
y=W.cj(b) in a?b:P.cr()+b
z[b]=y
return y},
gj:function(a){return a.height},
sj:function(a,b){a.height=b},
gl:function(a){return a.width},
sl:function(a,b){a.width=b},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eW:{
"^":"f+eD;"},
eD:{
"^":"b;",
gj:function(a){return this.bC(a,"height")},
sj:function(a,b){this.aW(a,"height",b,"")},
sS:function(a,b){this.aW(a,"src",b,"")},
gl:function(a){return this.bC(a,"width")},
sl:function(a,b){this.aW(a,"width",b,"")}},
eH:{
"^":"aH;",
gas:function(a){return H.a(new W.q(a,"error",!1),[null])},
gat:function(a){return H.a(new W.q(a,"load",!1),[null])},
gaK:function(a){return H.a(new W.q(a,"mousedown",!1),[null])},
gaL:function(a){return H.a(new W.q(a,"mouseenter",!1),[null])},
gaM:function(a){return H.a(new W.q(a,"mouseleave",!1),[null])},
gaN:function(a){return H.a(new W.q(a,"mousemove",!1),[null])},
gaO:function(a){return H.a(new W.q(a,"mouseout",!1),[null])},
gaP:function(a){return H.a(new W.q(a,"mouseover",!1),[null])},
gaQ:function(a){return H.a(new W.q(a,"mouseup",!1),[null])},
gbo:function(a){return H.a(new W.q(a,"touchcancel",!1),[null])},
gaR:function(a){return H.a(new W.q(a,"touchend",!1),[null])},
gbp:function(a){return H.a(new W.q(a,"touchmove",!1),[null])},
gaS:function(a){return H.a(new W.q(a,"touchstart",!1),[null])},
e4:function(a,b,c){return a.createElement(b)},
cd:function(a,b){return this.e4(a,b,null)},
"%":"XMLDocument;Document"},
iU:{
"^":"aH;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iV:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
eI:{
"^":"f;bh:bottom=,j:height=,N:left=,bu:right=,ag:top=,l:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(this.gl(a))+" x "+H.c(this.gj(a))},
t:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isZ)return!1
y=a.left
x=z.gN(b)
if(y==null?x==null:y===x){y=a.top
x=z.gag(b)
if(y==null?x==null:y===x){y=this.gl(a)
x=z.gl(b)
if(y==null?x==null:y===x){y=this.gj(a)
z=z.gj(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(this.gl(a))
w=J.C(this.gj(a))
return W.dm(W.a8(W.a8(W.a8(W.a8(0,z),y),x),w))},
gbz:function(a){return H.a(new P.I(a.left,a.top),[null])},
$isZ:1,
$asZ:I.bf,
"%":";DOMRectReadOnly"},
aD:{
"^":"aH;",
gJ:function(a){return P.ft(C.b.G(a.offsetLeft),C.b.G(a.offsetTop),C.b.G(a.offsetWidth),C.b.G(a.offsetHeight),null)},
i:function(a){return a.localName},
geG:function(a){return C.b.G(a.offsetLeft)},
geH:function(a){return C.b.G(a.offsetTop)},
cE:function(a){return a.getBoundingClientRect()},
gas:function(a){return H.a(new W.t(a,"error",!1),[null])},
gat:function(a){return H.a(new W.t(a,"load",!1),[null])},
gaK:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gaL:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gaM:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gaN:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gaO:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gaP:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gaQ:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
gbo:function(a){return H.a(new W.t(a,"touchcancel",!1),[null])},
gaR:function(a){return H.a(new W.t(a,"touchend",!1),[null])},
geI:function(a){return H.a(new W.t(a,"touchenter",!1),[null])},
geJ:function(a){return H.a(new W.t(a,"touchleave",!1),[null])},
gbp:function(a){return H.a(new W.t(a,"touchmove",!1),[null])},
gaS:function(a){return H.a(new W.t(a,"touchstart",!1),[null])},
$isaD:1,
$isf:1,
$isO:1,
"%":";Element"},
iW:{
"^":"w;j:height%,S:src},l:width%",
"%":"HTMLEmbedElement"},
iX:{
"^":"bq;ao:error=",
"%":"ErrorEvent"},
bq:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
O:{
"^":"f;",
de:function(a,b,c,d){return a.addEventListener(b,H.ax(c,1),!1)},
dH:function(a,b,c,d){return a.removeEventListener(b,H.ax(c,1),!1)},
$isO:1,
"%":"MediaStream;EventTarget"},
jf:{
"^":"w;k:length=",
"%":"HTMLFormElement"},
eT:{
"^":"eH;",
"%":"HTMLDocument"},
jg:{
"^":"w;j:height%,S:src},l:width%",
"%":"HTMLIFrameElement"},
cy:{
"^":"w;j:height%,S:src},l:width%",
aF:function(a,b){return a.complete.$1(b)},
$iscy:1,
"%":"HTMLImageElement"},
ji:{
"^":"w;j:height%,S:src},l:width%",
$isaD:1,
$isf:1,
$isO:1,
"%":"HTMLInputElement"},
fm:{
"^":"w;ao:error=,S:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bB:{
"^":"de;",
gJ:function(a){var z,y,x
if(!!a.offsetX)return H.a(new P.I(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.m(W.ds(z)).$isaD)throw H.e(new P.M("offsetX is only supported on elements"))
y=W.ds(z)
x=H.a(new P.I(a.clientX,a.clientY),[null]).a0(0,J.ek(J.en(y)))
return H.a(new P.I(J.cd(x.a),J.cd(x.b)),[null])}},
$isbB:1,
$isb:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jw:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aH:{
"^":"O;",
i:function(a){var z=a.nodeValue
return z==null?this.cY(a):z},
"%":"Attr;Node"},
jy:{
"^":"w;j:height%,l:width%",
"%":"HTMLObjectElement"},
jB:{
"^":"w;S:src}",
"%":"HTMLScriptElement"},
jD:{
"^":"w;k:length=",
"%":"HTMLSelectElement"},
jE:{
"^":"w;S:src}",
"%":"HTMLSourceElement"},
jF:{
"^":"bq;ao:error=",
"%":"SpeechRecognitionError"},
bM:{
"^":"f;",
$isb:1,
"%":"Touch"},
bN:{
"^":"de;dU:changedTouches=",
$isbN:1,
$isb:1,
"%":"TouchEvent"},
jK:{
"^":"eY;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bs(b,a,null,null,null))
return a[b]},
C:function(a,b,c){throw H.e(new P.M("Cannot assign element of immutable List."))},
X:function(a,b){if(b<0||b>=a.length)return H.i(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.bM]},
$isr:1,
$isb0:1,
$isaZ:1,
"%":"TouchList"},
eX:{
"^":"f+bx;",
$isl:1,
$asl:function(){return[W.bM]},
$isr:1},
eY:{
"^":"eX+eU;",
$isl:1,
$asl:function(){return[W.bM]},
$isr:1},
jL:{
"^":"w;S:src}",
"%":"HTMLTrackElement"},
de:{
"^":"bq;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
dg:{
"^":"fm;j:height%,l:width%",
$isdg:1,
"%":"HTMLVideoElement"},
jP:{
"^":"O;",
gas:function(a){return H.a(new W.q(a,"error",!1),[null])},
gat:function(a){return H.a(new W.q(a,"load",!1),[null])},
gaK:function(a){return H.a(new W.q(a,"mousedown",!1),[null])},
gaL:function(a){return H.a(new W.q(a,"mouseenter",!1),[null])},
gaM:function(a){return H.a(new W.q(a,"mouseleave",!1),[null])},
gaN:function(a){return H.a(new W.q(a,"mousemove",!1),[null])},
gaO:function(a){return H.a(new W.q(a,"mouseout",!1),[null])},
gaP:function(a){return H.a(new W.q(a,"mouseover",!1),[null])},
gaQ:function(a){return H.a(new W.q(a,"mouseup",!1),[null])},
gbo:function(a){return H.a(new W.q(a,"touchcancel",!1),[null])},
gaR:function(a){return H.a(new W.q(a,"touchend",!1),[null])},
gbp:function(a){return H.a(new W.q(a,"touchmove",!1),[null])},
gaS:function(a){return H.a(new W.q(a,"touchstart",!1),[null])},
$isf:1,
$isO:1,
"%":"DOMWindow|Window"},
jT:{
"^":"f;bh:bottom=,j:height=,N:left=,bu:right=,ag:top=,l:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
t:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isZ)return!1
y=a.left
x=z.gN(b)
if(y==null?x==null:y===x){y=a.top
x=z.gag(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gj(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){var z,y,x,w
z=J.C(a.left)
y=J.C(a.top)
x=J.C(a.width)
w=J.C(a.height)
return W.dm(W.a8(W.a8(W.a8(W.a8(0,z),y),x),w))},
gbz:function(a){return H.a(new P.I(a.left,a.top),[null])},
$isZ:1,
$asZ:I.bf,
"%":"ClientRect"},
jU:{
"^":"aH;",
$isf:1,
"%":"DocumentType"},
jV:{
"^":"eI;",
gj:function(a){return a.height},
sj:function(a,b){a.height=b},
gl:function(a){return a.width},
sl:function(a,b){a.width=b},
"%":"DOMRect"},
jY:{
"^":"w;",
$isO:1,
$isf:1,
"%":"HTMLFrameSetElement"},
q:{
"^":"a5;a,b,c",
Z:function(a,b,c,d){var z=new W.F(0,this.a,this.b,W.G(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.E()
return z},
cl:function(a){return this.Z(a,null,null,null)},
cm:function(a,b,c){return this.Z(a,null,b,c)}},
t:{
"^":"q;a,b,c"},
F:{
"^":"fC;a,b,c,d,e",
bi:function(){if(this.b==null)return
this.c7()
this.b=null
this.d=null
return},
br:function(a,b){if(this.b==null)return;++this.a
this.c7()},
au:function(a){return this.br(a,null)},
cs:function(){if(this.b==null||this.a<=0)return;--this.a
this.E()},
E:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dQ(x,this.c,z,!1)}},
c7:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dR(x,this.c,z,!1)}}},
eU:{
"^":"b;",
gF:function(a){return new W.eN(a,this.gk(a),-1,null)},
$isl:1,
$asl:null,
$isr:1},
eN:{
"^":"b;a,b,c,d",
w:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c2(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gD:function(){return this.d}},
hl:{
"^":"b;a",
$isO:1,
$isf:1,
static:{hm:function(a){if(a===window)return a
else return new W.hl(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iL:{
"^":"ad;",
$isf:1,
"%":"SVGAElement"},
iM:{
"^":"fL;",
$isf:1,
"%":"SVGAltGlyphElement"},
iO:{
"^":"p;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iY:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEBlendElement"},
iZ:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEColorMatrixElement"},
j_:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEComponentTransferElement"},
j0:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFECompositeElement"},
j1:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
j2:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
j3:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
j4:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEFloodElement"},
j5:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
j6:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEImageElement"},
j7:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEMergeElement"},
j8:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEMorphologyElement"},
j9:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFEOffsetElement"},
ja:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFESpecularLightingElement"},
jb:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFETileElement"},
jc:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFETurbulenceElement"},
jd:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGFilterElement"},
je:{
"^":"ad;j:height=,l:width=",
"%":"SVGForeignObjectElement"},
eS:{
"^":"ad;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
ad:{
"^":"p;",
$isf:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jh:{
"^":"ad;j:height=,l:width=",
$isf:1,
"%":"SVGImageElement"},
jl:{
"^":"p;",
$isf:1,
"%":"SVGMarkerElement"},
jm:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGMaskElement"},
jz:{
"^":"p;j:height=,l:width=",
$isf:1,
"%":"SVGPatternElement"},
jA:{
"^":"eS;j:height=,l:width=",
"%":"SVGRectElement"},
jC:{
"^":"p;",
$isf:1,
"%":"SVGScriptElement"},
p:{
"^":"aD;",
gas:function(a){return H.a(new W.t(a,"error",!1),[null])},
gat:function(a){return H.a(new W.t(a,"load",!1),[null])},
gaK:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gaL:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gaM:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gaN:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gaO:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gaP:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gaQ:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
$isO:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jH:{
"^":"ad;j:height=,l:width=",
$isf:1,
"%":"SVGSVGElement"},
jI:{
"^":"p;",
$isf:1,
"%":"SVGSymbolElement"},
cY:{
"^":"ad;",
"%":";SVGTextContentElement"},
jJ:{
"^":"cY;",
$isf:1,
"%":"SVGTextPathElement"},
fL:{
"^":"cY;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jM:{
"^":"ad;j:height=,l:width=",
$isf:1,
"%":"SVGUseElement"},
jN:{
"^":"p;",
$isf:1,
"%":"SVGViewElement"},
jX:{
"^":"p;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jZ:{
"^":"p;",
$isf:1,
"%":"SVGCursorElement"},
k_:{
"^":"p;",
$isf:1,
"%":"SVGFEDropShadowElement"},
k0:{
"^":"p;",
$isf:1,
"%":"SVGGlyphRefElement"},
k1:{
"^":"p;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
fw:{
"^":"f;",
dN:function(a,b,c){return a.bindBuffer(b,c)},
dO:function(a,b,c){return a.bindTexture(b,c)},
dQ:function(a,b){return a.blendEquation(b)},
dR:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dS:function(a,b,c,d){return a.bufferData(b,c,d)},
dV:function(a,b){return a.clear(b)},
dW:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dX:function(a,b){return a.clearDepth(b)},
dY:function(a,b){return a.clearStencil(b)},
dZ:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
e3:function(a){return a.createBuffer()},
e5:function(a){return a.createProgram()},
e6:function(a,b){return a.createShader(b)},
e7:function(a){return a.createTexture()},
e8:function(a,b){return a.depthFunc(b)},
e9:function(a,b){return a.depthMask(b)},
eg:function(a,b){return a.disableVertexAttribArray(b)},
eh:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
ek:function(a,b){return a.enable(b)},
el:function(a,b){return a.enableVertexAttribArray(b)},
cD:function(a,b,c){return a.getAttribLocation(b,c)},
cI:function(a,b){return a.getParameter(b)},
cK:function(a,b,c){return a.getUniformLocation(b,c)},
cU:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cV:function(a,b,c,d){return a.stencilOp(b,c,d)},
eT:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.im(g))
return}z=J.m(g)
if(!!z.$iscy)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isch)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdg)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aV("Incorrect number or type of arguments"))},
eS:function(a,b,c,d,e,f,g){return this.eT(a,b,c,d,e,f,g,null,null,null)},
eU:function(a,b,c,d){return a.texParameteri(b,c,d)},
eZ:function(a,b){return a.useProgram(b)},
f_:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iR:{
"^":"b;"}}],["","",,P,{
"^":"",
as:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dn:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
I:{
"^":"b;p:a>,q:b>",
i:function(a){return"Point("+H.c(this.a)+", "+H.c(this.b)+")"},
t:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.I))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){var z,y
z=J.C(this.a)
y=J.C(this.b)
return P.dn(P.as(P.as(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.h(b)
x=y.gp(b)
if(typeof z!=="number")return z.m()
x=C.b.m(z,x)
z=this.b
y=y.gq(b)
if(typeof z!=="number")return z.m()
y=new P.I(x,C.b.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
a0:function(a,b){var z,y,x,w
z=this.a
y=J.em(b)
if(typeof z!=="number")return z.a0()
if(typeof y!=="number")return H.H(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.a0()
if(typeof w!=="number")return H.H(w)
w=new P.I(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hS:{
"^":"b;",
gbu:function(a){return this.gN(this)+this.c},
gbh:function(a){return this.gag(this)+this.d},
i:function(a){return"Rectangle ("+this.gN(this)+", "+this.b+") "+this.c+" x "+this.d},
t:function(a,b){var z,y
if(b==null)return!1
z=J.m(b)
if(!z.$isZ)return!1
if(this.gN(this)===z.gN(b)){y=this.b
z=y===z.gag(b)&&this.a+this.c===z.gbu(b)&&y+this.d===z.gbh(b)}else z=!1
return z},
gA:function(a){var z=this.b
return P.dn(P.as(P.as(P.as(P.as(0,this.gN(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbz:function(a){var z=new P.I(this.gN(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
Z:{
"^":"hS;N:a>,ag:b>,l:c>,j:d>",
$asZ:null,
static:{ft:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.a(new P.Z(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
j:function(a){return a},
bc:function(a){return a},
cH:{
"^":"f;",
$iscH:1,
"%":"ArrayBuffer"},
bE:{
"^":"f;",
$isbE:1,
"%":"DataView;ArrayBufferView;bC|cI|cK|bD|cJ|cL|a2"},
bC:{
"^":"bE;",
gk:function(a){return a.length},
$isb0:1,
$isaZ:1},
bD:{
"^":"cK;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
return a[b]},
C:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
a[b]=c}},
cI:{
"^":"bC+bx;",
$isl:1,
$asl:function(){return[P.aa]},
$isr:1},
cK:{
"^":"cI+cx;"},
a2:{
"^":"cL;",
C:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.o]},
$isr:1},
cJ:{
"^":"bC+bx;",
$isl:1,
$asl:function(){return[P.o]},
$isr:1},
cL:{
"^":"cJ+cx;"},
jn:{
"^":"bD;",
$isl:1,
$asl:function(){return[P.aa]},
$isr:1,
"%":"Float32Array"},
jo:{
"^":"bD;",
$isl:1,
$asl:function(){return[P.aa]},
$isr:1,
"%":"Float64Array"},
jp:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isr:1,
"%":"Int16Array"},
jq:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isr:1,
"%":"Int32Array"},
jr:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isr:1,
"%":"Int8Array"},
js:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isr:1,
"%":"Uint16Array"},
jt:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isr:1,
"%":"Uint32Array"},
ju:{
"^":"a2;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isr:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jv:{
"^":"a2;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.x(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isr:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dJ:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
im:function(a){return a},
ik:function(a,b){var z={}
a.H(0,new P.il(z))
return z},
cs:function(){var z=$.cq
if(z==null){z=J.bl(window.navigator.userAgent,"Opera",0)
$.cq=z}return z},
cr:function(){var z,y
z=$.cn
if(z!=null)return z
y=$.co
if(y==null){y=J.bl(window.navigator.userAgent,"Firefox",0)
$.co=y}if(y===!0)z="-moz-"
else{y=$.cp
if(y==null){y=P.cs()!==!0&&J.bl(window.navigator.userAgent,"Trident/",0)
$.cp=y}if(y===!0)z="-ms-"
else z=P.cs()===!0?"-o-":"-webkit-"}$.cn=z
return z},
il:{
"^":"d:19;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
k5:[function(){var z,y,x,w
z=new G.fS(700,500,P.b1(),P.b1())
y=new E.P(new Float64Array(H.j(16)))
y.R()
x=new F.fT(400,300,1,1,1,0,0,null,!0,"none",null,y,!1)
x.b=[]
x.ch=F.T(255,238,238,255)
y=new E.P(new Float64Array(H.j(16)))
y.R()
w=new G.h0(null,0,0,!1,0,z,!1,!1,!1,0,null,!1,!1,[y])
w.a=G.fX(400,600)
w.seP(x)
w.eF()
w.eY()
w.x=!0
if(!w.d){w.d=!0
w.ay()}x.aD(M.fq(z))},"$0","dH",0,0,1]},1],["","",,M,{
"^":"",
fp:{
"^":"d0;e,f,a,b,c,d",
bn:function(b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
if(this.f==null)return
z=F.aq(null)
b2.aE(null,new F.U(50,100,150,280))
b2.an(null,new F.U(50,50,100,100),z)
y=new Float64Array(H.j(16))
x=new E.P(y)
x.R()
w=Math.cos(H.a_(0.39269908169872414))
v=Math.sin(H.a_(0.39269908169872414))
u=y[0]
t=y[4]
s=y[1]
r=y[5]
q=y[2]
p=y[6]
o=y[3]
n=y[7]
m=-v
y[0]=u*w+t*v
y[1]=s*w+r*v
y[2]=q*w+p*v
y[3]=o*w+n*v
y[4]=u*m+t*w
y[5]=s*m+r*w
y[6]=q*m+p*w
y[7]=o*m+n*w
n=b2.a
n.push(C.a.ga7(n).n(0,x))
b2.ah()
z=F.aq(null)
z.a=F.T(255,255,255,0)
b2.an(null,new F.U(50,50,100,100),z)
z.a=F.T(255,0,255,255)
z.b=C.l
z.c=5.5
b2.an(null,new F.U(150,150,100,100),z)
z.b=C.e
z.a=F.T(255,255,170,255)
b2.ce(null,new F.U(150,150,100,100),z)
z.b=C.l
z.c=10
z.a=F.T(255,255,255,170)
b2.ce(null,new F.U(150,150,100,100),z)
z=F.aq(null)
z.a=F.T(255,255,255,0)
x=J.aT(this.f.gK())
m=J.aT(this.f.ga5())
o=this.f
y=J.aT(o.gK())
p=J.aT(this.f.ga5())
u=b2.Q
if(u!=null&&!J.W(u,o))b2.aG(0)
b2.Q=o
u=o.gK()
if(typeof u!=="number")return H.H(u)
l=0/u
u=b2.Q.ga5()
if(typeof u!=="number")return H.H(u)
k=0/u
u=b2.Q.gK()
if(typeof u!=="number")return H.H(u)
j=(0+x)/u
u=b2.Q.ga5()
if(typeof u!=="number")return H.H(u)
i=(0+m)/u
C.a.B(b2.z,[l,k,l,i,j,k,j,i])
h=b2.ab()
g=250+y/2
f=25+p/2
p=new E.n(new Float64Array(H.j(3)))
p.u(250,25,0)
e=h.n(0,p)
p=new E.n(new Float64Array(H.j(3)))
p.u(250,f,0)
d=h.n(0,p)
p=new E.n(new Float64Array(H.j(3)))
p.u(g,25,0)
c=h.n(0,p)
p=new E.n(new Float64Array(H.j(3)))
p.u(g,f,0)
b=h.n(0,p)
p=b2.x
a=p.length/8|0
y=z.a.a
a0=(y>>>16&255)/255
a1=(y>>>8&255)/255
a2=(y>>>0&255)/255
a3=(y>>>24&255)/255
C.a.B(p,[e.gp(e),e.gq(e),b2.ch,a0,a1,a2,a3,1,d.gp(d),d.gq(d),b2.ch,a0,a1,a2,a3,1,c.gp(c),c.gq(c),b2.ch,a0,a1,a2,a3,1,b.gp(b),b.gq(b),b2.ch,a0,a1,a2,a3,1])
b2.ch+=0.0001
p=a+1
y=a+2
C.a.B(b2.y,[a,p,y,p,a+3,y])
z=F.aq(null)
z.a=F.T(255,255,255,0)
z.c=5
h=b2.ab()
H.a_(-300)
H.a_(2)
y=Math.pow(-300,2)
H.a_(0)
H.a_(2)
a4=Math.sqrt(H.a_(y+Math.pow(0,2)))
y=z.c
p=a4*2
a5=-1*y*300/p
a6=y*0/p
a7=new E.n(new Float64Array(H.j(3)))
a7.u(200-a6,200-a5,0)
a8=new E.n(new Float64Array(H.j(3)))
a8.u(200+a6,200+a5,0)
a9=new E.n(new Float64Array(H.j(3)))
a9.u(500+a6,200+a5,0)
b0=new E.n(new Float64Array(H.j(3)))
b0.u(500-a6,200-a5,0)
a7=h.n(0,a7)
a8=h.n(0,a8)
a9=h.n(0,a9)
b0=h.n(0,b0)
p=z.a.a
b2.a2(null,a7,a8,a9,b0,(p>>>16&255)/255,(p>>>8&255)/255,(p>>>0&255)/255,(p>>>24&255)/255)
if(0>=n.length)return H.i(n,-1)
n.pop()
b2.ah()},
d5:function(a){this.e.aH("assets/test.jpg").eV(new M.fr(this))},
static:{fq:function(a){var z=new E.P(new Float64Array(H.j(16)))
z.R()
z=new M.fp(a,null,"none",null,z,!1)
z.b=[]
z.d5(a)
return z}}},
fr:{
"^":"d:20;a",
$1:function(a){this.a.f=a}}}],["","",,F,{
"^":"",
cC:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.a9)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.bd(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fQ:{
"^":"b;"},
d0:{
"^":"b;",
aD:function(a){var z=0,y=new P.aA(),x=1,w,v=this,u,t,s,r
var $async$aD=P.aL(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.a(new s.y(0,r.k,null),[null])
t=u
t.bI(null)
z=2
return P.u(u,$async$aD,y)
case 2:t=v
t=t.b
t.push(a)
return P.u(null,0,y,null)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$aD,y,null)},
ci:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a9)(z),++x)z[x].ci(a)},
co:function(a,b){},
cw:function(a,b){var z,y,x
this.bk()
this.co(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a9)(z),++x)z[x].cw(a,b)},
bn:function(a,b){},
bq:["d_",function(a,b){var z,y,x,w,v,u
this.bk()
this.bn(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.a9)(z),++w){v=z[w]
u=v.c
x.push(C.a.ga7(x).n(0,u))
b.ah()
v.bq(a,b)
if(0>=x.length)return H.i(x,-1)
x.pop()
b.ah()}}],
eX:["d0",function(a,b,c,d,e){var z,y,x,w,v,u,t
this.bk()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.i(y,w)
v=y[w]
a.cq(v.c)
v.eX(a,b,c,d,e)
a.cp()}u=a.cH().bj(0)
u.ez()
y=new E.n(new Float64Array(H.j(3)))
y.u(d,e,0)
t=u.n(0,y)
t.gp(t)
t.gq(t)
return!1}],
fb:[function(a,b,c,d,e,f){},"$5","gaS",10,0,8],
fa:[function(a,b,c,d,e,f){},"$5","gaR",10,0,8],
bk:function(){if(!this.d)this.d=!0}},
fR:{
"^":"b;",
aH:function(a){var z=0,y=new P.aA(),x,w=2,v,u=this,t,s,r,q
var $async$aH=P.aL(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.al(a)?3:4
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
return P.u(q.aI(a),$async$aH,y)
case 5:s.C(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return P.u(x,0,y,null)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$aH,y,null)}},
U:{
"^":"b;a,b,K:c<,a5:d<",
t:function(a,b){if(b==null)return!1
return b instanceof F.U&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gA:function(a){return F.cC([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+this.a+", y:"+this.b+", w:"+H.c(this.c)+", h:"+H.c(this.d)}},
d1:{
"^":"b;a",
i:function(a){return C.y.h(0,this.a)}},
fU:{
"^":"b;a,b,c",
d8:function(a){if(this.a==null)this.a=F.T(255,255,255,255)},
static:{aq:function(a){var z=new F.fU(a,C.e,1)
z.d8(a)
return z}}},
d_:{
"^":"b;a",
t:function(a,b){if(b==null)return!1
return b instanceof F.d_&&b.a===this.a},
gA:function(a){return F.cC([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
d7:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{T:function(a,b,c,d){var z=new F.d_(0)
z.d7(a,b,c,d)
return z}}},
bJ:{
"^":"b;"},
fT:{
"^":"d0;K:e<,a5:f<,r,x,y,z,Q,ch,cx,a,b,c,d",
co:function(a,b){var z,y,x,w
z=this.e
y=(a.gK()-a.geK(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.P(new Float64Array(H.j(16)))
y.R()
this.c=y
y.cz(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bD(0,z,z,1)},
bq:function(a,b){var z,y
z=new F.U(0,0,this.e,this.f)
b.b.push(z)
b.aE(a,z)
this.d_(a,b)
y=b.b
if(0>=y.length)return H.i(y,-1)
y.pop()
if(y.length>0)b.aE(a,C.a.ga7(y))
else{y=a.a
b.aE(a,new F.U(0,0,y.c,y.d))}},
bn:function(a,b){var z=F.aq(null)
z.a=this.ch
b.an(a,new F.U(0,0,this.e,this.f),z)}},
bK:{
"^":"b;",
seP:function(a){this.c$=a},
eB:function(a){if(!this.e$){this.c$.ci(this)
this.e$=!0}this.c$.cw(this,a)
this.eE()},
eC:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.a.ga7(y).n(0,z))
b.ah()
this.c$.bq(a,b)
if(0>=y.length)return H.i(y,-1)
y.pop()
b.ah()},
Y:function(a,b,c,d,e){a.cq(this.c$.c)
this.c$.d0(a,b,c,d,e)
a.cp()},
cq:function(a){var z=this.f$
z.push(C.a.ga7(z).n(0,a))},
cp:function(){var z=this.f$
if(0>=z.length)return H.i(z,-1)
z.pop()},
cH:function(){return C.a.ga7(this.f$)}}}],["","",,G,{
"^":"",
bL:function(a){var z=0,y=new P.aA(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
var $async$bL=P.aL(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.a(new p.hc(o.a(new n.y(0,m.k,null),[null])),[null])
q=C
q=q.h
t=q.cd(document,"img")
q=J
q.es(t,a)
q=J
s=q.h(t)
q=s
r=q.gat(t)
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
p=new p.F(0,o,n,m.G(new l.fZ(u,t)),!1)
o=H
q=q.a(p,[o.v(r,0)])
q.E()
q=s
s=q.gas(t)
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
p=new p.F(0,o,n,m.G(new l.h_(a,u)),!1)
o=H
q=q.a(p,[o.v(s,0)])
q.E()
q=u
x=q.a
z=1
break
case 1:return P.u(x,0,y,null)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$bL,y,null)},
d2:function(a,b,c){var z,y
z=J.e0(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.c(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
fY:{
"^":"bJ;a,b",
gK:function(){return J.el(this.a)},
ga5:function(){return J.e6(this.a)},
cJ:function(a){var z
if(this.b==null){z=J.h(a).e7(a)
this.b=z
a.bindTexture(3553,z)
C.A.eS(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
fW:{
"^":"b;a,b,c,j:d*",
d9:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.ae(b)
y=C.d.ae(a)
x=C.h.cd(document,"canvas")
J.et(x,z)
J.er(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.eo(this.b,!0)},
static:{fX:function(a,b){var z=new G.fW(null,null,null,null)
z.d9(a,b)
return z}}},
fS:{
"^":"fR;l:c*,j:d*,a,b",
aI:function(a){var z=0,y=new P.aA(),x,w=2,v,u,t
var $async$aI=P.aL(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return P.u(t.bL(a),$async$aI,y)
case 3:x=new u.fY(c,null)
z=1
break
case 1:return P.u(x,0,y,null)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$aI,y,null)}},
fV:{
"^":"fQ;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
ev:function(){var z,y,x,w,v,u
P.aP("#[A]# "+H.c(J.ca(this.d,35660)))
P.aP("#[B]# "+H.c(J.ca(this.d,33901)))
z=C.a.cj(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.cj(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.d2(x,35633,z)
v=G.d2(x,35632,y)
u=J.e_(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
U:function(a){this.r=1
this.ch=-0.5
J.c6(this.d,2960)
J.e1(this.d,515)
J.dW(this.d,0,0,0,1)
J.dX(this.d,1)
J.dY(this.d,0)
J.c6(this.d,3042)
switch(-1){case-1:J.dS(this.d,32774)
J.dT(this.d,770,771,770,32772)
break}J.dV(this.d,17664)
C.a.sk(this.x,0)
C.a.sk(this.y,0)
C.a.sk(this.z,0)
this.Q=null},
aG:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.x
if(z.length!==0){y=this.y
F.T(170,255,170,170)
J.ce(this.d,this.f)
x=J.aR(this.d,this.f,"a_tex")
w=J.bm(this.d)
J.bk(this.d,34962,w)
v=this.z
J.dU(this.d,34962,new Float32Array(H.bc(v)),35044)
J.aQ(this.d,x)
J.aU(this.d,x,2,5126,!1,0,0)
u=this.Q
if(u!=null){t=u.cJ(this.d)
J.c3(this.d,3553,t)
J.aS(this.d,3553,10242,33071)
J.aS(this.d,3553,10243,33071)
J.aS(this.d,3553,10241,9728)
J.aS(this.d,3553,10240,9728)}u=this.d
s=J.bm(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.bc(z)),35044)
u.bindBuffer(34962,null)
J.bk(this.d,34962,s)
u=this.d
s=J.bm(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.bc(y)),35044)
u.bindBuffer(34963,null)
J.bk(this.d,34963,s)
u=this.d
u.uniformMatrix4fv(J.ep(u,this.f,"u_mat"),!1,new Float32Array(H.bc(this.cx.a)))
r=J.aR(this.d,this.f,"color")
q=J.aR(this.d,this.f,"vp")
p=J.aR(this.d,this.f,"useTex")
J.aU(this.d,q,3,5126,!1,32,0)
J.aU(this.d,r,4,5126,!1,32,12)
J.aU(this.d,p,1,5126,!1,32,28)
J.aQ(this.d,q)
J.aQ(this.d,r)
J.aQ(this.d,p)
J.e3(this.d,4,y.length,5123,0)
if(x!==0){J.e2(this.d,x)
J.c3(this.d,3553,null)}J.ce(this.d,null)
C.a.sk(z,0)
C.a.sk(y,0)
C.a.sk(v,0)
this.Q=null}},
ce:function(a,b,c){if(c.b===C.e)this.ei(a,b,c)
else this.ej(a,b,c)},
ei:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.c/2
y=b.a+z
x=b.d/2
w=b.b+x
v=this.ab()
u=new E.n(new Float64Array(H.j(3)))
u.u(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=this.c,o=this.x,n=this.z,m=this.y,l=0;l<t;){k=o.length/8|0
u.sp(0,y)
u.sq(0,w)
u.sP(0,this.ch)
u=v.n(0,u)
C.a.B(o,[u.gp(u),u.gq(u),this.ch])
C.a.B(o,[s,r,q,p])
C.a.B(o,[-1])
C.a.B(n,[0,0])
j=6.283185307179586*(l/t)
u.sp(0,y+Math.cos(j)*z)
u.sq(0,w+Math.sin(j)*x)
u.sP(0,this.ch)
u=v.n(0,u)
C.a.B(o,[u.gp(u),u.gq(u),this.ch])
C.a.B(o,[s,r,q,p])
C.a.B(o,[-1])
C.a.B(n,[0,0]);++l
j=6.283185307179586*(l/t)
u.sp(0,y+Math.cos(j)*z)
u.sq(0,w+Math.sin(j)*x)
u.sP(0,this.ch)
u=v.n(0,u)
C.a.B(o,[u.gp(u),u.gq(u),this.ch])
C.a.B(o,[s,r,q,p])
C.a.B(o,[-1])
C.a.B(n,[0,0])
C.a.B(m,[k,k+1,k+2])
this.ch+=0.0001}},
ej:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b.c
y=b.a+z/2
x=b.d
w=b.b+x/2
v=c.c
u=(z+v)/2
t=(x+v)/2
s=(z-v)/2
r=(x-v)/2
q=this.ab()
p=new E.n(new Float64Array(H.j(3)))
p.u(0,0,0)
o=new E.n(new Float64Array(H.j(3)))
o.u(0,0,0)
n=new E.n(new Float64Array(H.j(3)))
n.u(0,0,0)
m=new E.n(new Float64Array(H.j(3)))
m.u(0,0,0)
v=c.a.a
l=(v>>>16&255)/255
k=(v>>>8&255)/255
j=(v>>>0&255)/255
i=(v>>>24&255)/255
for(h=0;h<25;){z=6.283185307179586*(h/25)
p.sp(0,y+Math.cos(z)*s)
p.sq(0,w+Math.sin(z)*r)
p.sP(0,this.ch)
p=q.n(0,p)
o.sp(0,y+Math.cos(z)*u)
o.sq(0,w+Math.sin(z)*t)
o.sP(0,this.ch)
o=q.n(0,o);++h
z=6.283185307179586*(h/25)
n.sp(0,y+Math.cos(z)*u)
n.sq(0,w+Math.sin(z)*t)
n.sP(0,this.ch)
n=q.n(0,n)
m.sp(0,y+Math.cos(z)*s)
m.sq(0,w+Math.sin(z)*r)
m.sP(0,this.ch)
m=q.n(0,m)
this.a2(a,p,o,m,n,l,k,j,i)
this.ch+=0.0001}},
an:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=b.c
y=b.d
if(c.b===C.e){x=this.ab()
w=b.a
v=b.b
u=w+z
t=v+y
z=new E.n(new Float64Array(H.j(3)))
z.u(w,v,0)
s=x.n(0,z)
z=new E.n(new Float64Array(H.j(3)))
z.u(w,t,0)
r=x.n(0,z)
z=new E.n(new Float64Array(H.j(3)))
z.u(u,v,0)
q=x.n(0,z)
z=new E.n(new Float64Array(H.j(3)))
z.u(u,t,0)
p=x.n(0,z)
z=c.a.a
this.a2(a,s,r,q,p,(z>>>16&255)/255,(z>>>8&255)/255,(z>>>0&255)/255,(z>>>24&255)/255)}else{x=this.ab()
o=b.a
n=c.c/2
w=o+n
m=b.b
v=m+n
u=o+z-n
t=m+y-n
n=new E.n(new Float64Array(H.j(3)))
n.u(w,v,0)
s=x.n(0,n)
n=c.c
y=new E.n(new Float64Array(H.j(3)))
y.u(w-n,v-n,0)
l=x.n(0,y)
y=new E.n(new Float64Array(H.j(3)))
y.u(w,t,0)
r=x.n(0,y)
y=c.c
n=new E.n(new Float64Array(H.j(3)))
n.u(w-y,t+y,0)
k=x.n(0,n)
n=new E.n(new Float64Array(H.j(3)))
n.u(u,v,0)
q=x.n(0,n)
n=c.c
y=new E.n(new Float64Array(H.j(3)))
y.u(u+n,v-n,0)
j=x.n(0,y)
y=new E.n(new Float64Array(H.j(3)))
y.u(u,t,0)
p=x.n(0,y)
y=c.c
n=new E.n(new Float64Array(H.j(3)))
n.u(u+y,t+y,0)
i=x.n(0,n)
n=c.a.a
h=(n>>>16&255)/255
g=(n>>>8&255)/255
f=(n>>>0&255)/255
e=(n>>>24&255)/255
this.a2(a,l,k,s,r,h,g,f,e)
this.a2(a,k,i,r,p,h,g,f,e)
this.a2(a,i,j,p,q,h,g,f,e)
this.a2(a,j,l,q,s,h,g,f,e)}},
a2:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.x
y=z.length/8|0
C.a.B(z,[b.gp(b),b.gq(b),this.ch,f,g,h,i,-1,c.gp(c),c.gq(c),this.ch,f,g,h,i,-1,d.gp(d),d.gq(d),this.ch,f,g,h,i,-1,e.gp(e),e.gq(e),this.ch,f,g,h,i,-1])
C.a.B(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.a.B(this.y,[y,z,x,z,y+3,x])},
aE:function(a,b){var z
this.aG(0)
J.c4(this.d,!1,!1,!1,!1)
J.c5(this.d,!1)
J.cc(this.d,7680,7681,7681)
J.cb(this.d,519,this.r,255)
z=F.aq(null)
z.a=F.T(255,255,255,255)
this.an(null,b,z)
this.aG(0)
J.c4(this.d,!0,!0,!0,!0)
J.c5(this.d,!0)
J.cc(this.d,7680,7680,7680)
J.cb(this.d,515,this.r,255);++this.r},
ah:function(){},
ab:function(){var z,y
this.cy.R()
z=this.cy.cz(0,-1,1,0)
this.cy=z
y=this.e
y=z.bD(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.n(0,C.a.ga7(this.a))
this.cy=y
return y}},
h0:{
"^":"fn;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gK:function(){return this.a.c},
ga5:function(){return this.a.d},
geK:function(a){return 0},
eE:function(){this.r=!0},
ay:function(){var z=0,y=new P.aA(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
var $async$ay=P.aL(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cN(new h.cm(Date.now(),!1))
i=v
t=i.a
i=E
i=i
h=Float64Array
g=H
s=new i.P(new h(g.j(16)))
i=s
i.R()
i=E
i=i
h=Float64Array
g=H
r=new i.P(new h(g.j(16)))
i=r
i.R()
i=E
i=i
h=Float64Array
g=H
q=new i.P(new h(g.j(16)))
i=q
i.R()
i=G
p=new i.fV(50,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.ev()
i=p
i.U(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return P.u(i.eP(new h.aC(15e3),null,null),$async$ay,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.eB(h.ae(u+k))
o+=k
n+=k
if(k<0);else ;++m
i=v
i.r=!0
z=n>40?6:7
break
case 6:i=p
i.U(0)
i=v
i.eC(v,p)
i=p
i.aG(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.d3(o,m)
i=H
i.dJ(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return P.u(null,0,y,null)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$ay,y,null)},
eY:function(){var z,y,x,w
z=P.b1()
y=new G.h9(this,z)
x=new G.h8(this,z)
w=J.ee(this.a.b)
H.a(new W.F(0,w.a,w.b,W.G(x),!1),[H.v(w,0)]).E()
J.ef(this.a.b).cl(x)
x=J.eg(this.a.b)
H.a(new W.F(0,x.a,x.b,W.G(y),!1),[H.v(x,0)]).E()
x=J.eh(this.a.b)
H.a(new W.F(0,x.a,x.b,W.G(y),!1),[H.v(x,0)]).E()
x=J.ei(this.a.b)
H.a(new W.F(0,x.a,x.b,W.G(y),!1),[H.v(x,0)]).E()
J.ej(this.a.b).cl(y)},
eF:function(){var z,y
z={}
z.a=!1
y=J.e7(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h1(z,this)),!1),[H.v(y,0)]).E()
y=J.ed(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h2(z,this)),!1),[H.v(y,0)]).E()
y=J.e8(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h3(z,this)),!1),[H.v(y,0)]).E()
y=J.e9(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h4(z,this)),!1),[H.v(y,0)]).E()
y=J.ea(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h5(z,this)),!1),[H.v(y,0)]).E()
y=J.eb(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h6(z,this)),!1),[H.v(y,0)]).E()
y=J.ec(this.a.b)
H.a(new W.F(0,y.a,y.b,W.G(new G.h7(z,this)),!1),[H.v(y,0)]).E()}},
fn:{
"^":"b+bK;"},
h9:{
"^":"d:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c7(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.a9)(y),++v){u=y[v]
t=H.a(new P.I(C.b.G(u.pageX),C.b.G(u.pageY)),[null]).a
s=J.c8(z.a.b)
if(typeof t!=="number")return t.a0()
r=t-s
s=H.a(new P.I(C.b.G(u.pageX),C.b.G(u.pageY)),[null]).b
t=J.c9(z.a.b)
if(typeof s!=="number")return s.a0()
q=s-t
t=w.al(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.m()
z.Y(z,s+1,"pointermove",r,q)}else{w.C(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.m()
z.Y(z,t+1,"pointerdown",r,q)}}}},
h8:{
"^":"d:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c7(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.a9)(y),++v){u=y[v]
if(w.al(u.identifier)){t=H.a(new P.I(C.b.G(u.pageX),C.b.G(u.pageY)),[null]).a
s=J.c8(z.a.b)
if(typeof t!=="number")return t.a0()
r=H.a(new P.I(C.b.G(u.pageX),C.b.G(u.pageY)),[null]).b
q=J.c9(z.a.b)
if(typeof r!=="number")return r.a0()
w.ad(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.m()
z.Y(z,p+1,"pointerup",t-s,r-q)}}}},
h1:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.h(a)
x=y.gJ(a)
x=x.gp(x)
x.toString
y=y.gJ(a)
y=y.gq(y)
y.toString
z.Y(z,0,"pointerdown",x,y)}}},
h2:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.h(a)
w=x.gJ(a)
w=w.gp(w)
w.toString
x=x.gJ(a)
x=x.gq(x)
x.toString
z.Y(z,0,"pointerup",w,x)
y.a=!1}}}},
h3:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
h4:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.h(a)
w=x.gJ(a)
w=w.gp(w)
w.toString
x=x.gJ(a)
x=x.gq(x)
x.toString
z.Y(z,0,"pointercancel",w,x)
y.a=!1}}}},
h5:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.h(a)
x=y.gJ(a)
x=x.gp(x)
x.toString
y=y.gJ(a)
y=y.gq(y)
y.toString
z.Y(z,0,"pointermove",x,y)}}},
h6:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.h(a)
w=x.gJ(a)
w=w.gp(w)
w.toString
x=x.gJ(a)
x=x.gq(x)
x.toString
z.Y(z,0,"pointercancel",w,x)
y.a=!1}}}},
h7:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fZ:{
"^":"d:2;a,b",
$1:function(a){this.a.aF(0,this.b)}},
h_:{
"^":"d:2;a,b",
$1:function(a){this.b.e_("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
P:{
"^":"b;a",
ai:function(a){var z,y
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
i:function(a){return"[0] "+this.ax(0).i(0)+"\n[1] "+this.ax(1).i(0)+"\n[2] "+this.ax(2).i(0)+"\n[3] "+this.ax(3).i(0)+"\n"},
gef:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.i(z,b)
return z[b]},
C:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.i(z,b)
z[b]=c},
ax:function(a){var z,y,x
z=new Float64Array(H.j(4))
y=this.a
if(a>=16)return H.i(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.i(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.i(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.i(y,x)
z[3]=y[x]
return new E.a6(z)},
bj:function(a){var z=new E.P(new Float64Array(H.j(16)))
z.ai(this)
return z},
n:function(a,b){var z,y,x
if(!!b.$isa6){z=new Float64Array(H.j(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a6(z)}if(!!b.$isn){z=new Float64Array(H.j(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.n(z)}if(4===b.gef()){z=new Float64Array(H.j(16))
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
return new E.P(z)}throw H.e(P.aV(b))},
m:function(a,b){var z,y
z=new Float64Array(H.j(16))
y=this.a
z[0]=C.b.m(y[0],b.gv().h(0,0))
z[1]=C.b.m(y[1],b.gv().h(0,1))
z[2]=C.b.m(y[2],b.gv().h(0,2))
z[3]=C.b.m(y[3],b.gv().h(0,3))
z[4]=C.b.m(y[4],b.gv().h(0,4))
z[5]=C.b.m(y[5],b.gv().h(0,5))
z[6]=C.b.m(y[6],b.gv().h(0,6))
z[7]=C.b.m(y[7],b.gv().h(0,7))
z[8]=C.b.m(y[8],b.gv().h(0,8))
z[9]=C.b.m(y[9],b.gv().h(0,9))
z[10]=C.b.m(y[10],b.gv().h(0,10))
z[11]=C.b.m(y[11],b.gv().h(0,11))
z[12]=C.b.m(y[12],b.gv().h(0,12))
z[13]=C.b.m(y[13],b.gv().h(0,13))
z[14]=C.b.m(y[14],b.gv().h(0,14))
z[15]=C.b.m(y[15],b.gv().h(0,15))
return new E.P(z)},
cz:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.m(b)
y=!!z.$isa6
x=y?b.gK():1
if(!!z.$isn||y){w=z.gp(b)
v=z.gq(b)
u=z.gP(b)}else{u=d
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
bD:function(a,b,c,d){var z,y,x,w,v,u
z=J.m(b)
y=!!z.$isa6
x=y?b.gK():1
if(!!z.$isn||y){w=z.gp(b)
v=z.gq(b)
u=z.gP(b)}else{u=d
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
ez:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
n:{
"^":"b;a",
u:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ai:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+"]"},
m:function(a,b){var z,y,x,w
z=this.a
y=C.b.m(z[0],b.gv().h(0,0))
x=C.b.m(z[1],b.gv().h(0,1))
z=C.b.m(z[2],b.gv().h(0,2))
w=new E.n(new Float64Array(H.j(3)))
w.u(y,x,z)
return w},
n:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.H(b)
x=z[1]
z=z[2]
w=new E.n(new Float64Array(H.j(3)))
w.u(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.i(z,b)
return z[b]},
C:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.i(z,b)
z[b]=c},
gk:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.a_(y*y+x*x+z*z))},
bj:function(a){var z=new E.n(new Float64Array(H.j(3)))
z.ai(this)
return z},
sp:function(a,b){this.a[0]=b
return b},
sq:function(a,b){this.a[1]=b
return b},
sP:function(a,b){this.a[2]=b
return b},
gp:function(a){return this.a[0]},
gq:function(a){return this.a[1]}},
a6:{
"^":"b;a",
bF:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ai:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+","+H.c(z[3])},
m:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.m(z[0],b.gv().h(0,0))
x=C.b.m(z[1],b.gv().h(0,1))
w=C.b.m(z[2],b.gv().h(0,2))
z=C.b.m(z[3],b.gv().h(0,3))
v=new E.a6(new Float64Array(H.j(4)))
v.bF(y,x,w,z)
return v},
n:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.H(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a6(new Float64Array(H.j(4)))
v.bF(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.i(z,b)
return z[b]},
C:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.i(z,b)
z[b]=c},
gk:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.a_(y*y+x*x+w*w+z*z))},
bj:function(a){var z=new E.a6(new Float64Array(H.j(4)))
z.ai(this)
return z},
sp:function(a,b){this.a[0]=b
return b},
sq:function(a,b){this.a[1]=b
return b},
sP:function(a,b){this.a[2]=b
return b},
gp:function(a){return this.a[0]},
gq:function(a){return this.a[1]},
gK:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cB.prototype
return J.fa.prototype}if(typeof a=="string")return J.b_.prototype
if(a==null)return J.fb.prototype
if(typeof a=="boolean")return J.f9.prototype
if(a.constructor==Array)return J.aE.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aG.prototype
return a}if(a instanceof P.b)return a
return J.bg(a)}
J.R=function(a){if(typeof a=="string")return J.b_.prototype
if(a==null)return a
if(a.constructor==Array)return J.aE.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aG.prototype
return a}if(a instanceof P.b)return a
return J.bg(a)}
J.aN=function(a){if(a==null)return a
if(a.constructor==Array)return J.aE.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aG.prototype
return a}if(a instanceof P.b)return a
return J.bg(a)}
J.bX=function(a){if(typeof a=="number")return J.aF.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b8.prototype
return a}
J.io=function(a){if(typeof a=="number")return J.aF.prototype
if(typeof a=="string")return J.b_.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b8.prototype
return a}
J.h=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aG.prototype
return a}if(a instanceof P.b)return a
return J.bg(a)}
J.ay=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.io(a).m(a,b)}
J.W=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).t(a,b)}
J.dP=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bX(a).aU(a,b)}
J.c2=function(a,b){if(a.constructor==Array||typeof a=="string"||H.iC(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.R(a).h(a,b)}
J.dQ=function(a,b,c,d){return J.h(a).de(a,b,c,d)}
J.dR=function(a,b,c,d){return J.h(a).dH(a,b,c,d)}
J.bk=function(a,b,c){return J.h(a).dN(a,b,c)}
J.c3=function(a,b,c){return J.h(a).dO(a,b,c)}
J.dS=function(a,b){return J.h(a).dQ(a,b)}
J.dT=function(a,b,c,d,e){return J.h(a).dR(a,b,c,d,e)}
J.dU=function(a,b,c,d){return J.h(a).dS(a,b,c,d)}
J.dV=function(a,b){return J.aN(a).dV(a,b)}
J.dW=function(a,b,c,d,e){return J.h(a).dW(a,b,c,d,e)}
J.dX=function(a,b){return J.h(a).dX(a,b)}
J.dY=function(a,b){return J.h(a).dY(a,b)}
J.c4=function(a,b,c,d,e){return J.h(a).dZ(a,b,c,d,e)}
J.dZ=function(a,b){return J.h(a).aF(a,b)}
J.bl=function(a,b,c){return J.R(a).e1(a,b,c)}
J.bm=function(a){return J.h(a).e3(a)}
J.e_=function(a){return J.h(a).e5(a)}
J.e0=function(a,b){return J.h(a).e6(a,b)}
J.e1=function(a,b){return J.h(a).e8(a,b)}
J.c5=function(a,b){return J.h(a).e9(a,b)}
J.e2=function(a,b){return J.h(a).eg(a,b)}
J.e3=function(a,b,c,d,e){return J.h(a).eh(a,b,c,d,e)}
J.e4=function(a,b){return J.aN(a).X(a,b)}
J.c6=function(a,b){return J.h(a).ek(a,b)}
J.aQ=function(a,b){return J.h(a).el(a,b)}
J.e5=function(a,b){return J.aN(a).H(a,b)}
J.c7=function(a){return J.h(a).gdU(a)}
J.X=function(a){return J.h(a).gao(a)}
J.C=function(a){return J.m(a).gA(a)}
J.e6=function(a){return J.h(a).gj(a)}
J.bn=function(a){return J.aN(a).gF(a)}
J.az=function(a){return J.R(a).gk(a)}
J.c8=function(a){return J.h(a).geG(a)}
J.c9=function(a){return J.h(a).geH(a)}
J.e7=function(a){return J.h(a).gaK(a)}
J.e8=function(a){return J.h(a).gaL(a)}
J.e9=function(a){return J.h(a).gaM(a)}
J.ea=function(a){return J.h(a).gaN(a)}
J.eb=function(a){return J.h(a).gaO(a)}
J.ec=function(a){return J.h(a).gaP(a)}
J.ed=function(a){return J.h(a).gaQ(a)}
J.ee=function(a){return J.h(a).gbo(a)}
J.ef=function(a){return J.h(a).gaR(a)}
J.eg=function(a){return J.h(a).geI(a)}
J.eh=function(a){return J.h(a).geJ(a)}
J.ei=function(a){return J.h(a).gbp(a)}
J.ej=function(a){return J.h(a).gaS(a)}
J.ek=function(a){return J.h(a).gbz(a)}
J.el=function(a){return J.h(a).gl(a)}
J.em=function(a){return J.h(a).gp(a)}
J.aR=function(a,b,c){return J.h(a).cD(a,b,c)}
J.en=function(a){return J.h(a).cE(a)}
J.eo=function(a,b){return J.h(a).cF(a,b)}
J.ca=function(a,b){return J.h(a).cI(a,b)}
J.ep=function(a,b,c){return J.h(a).cK(a,b,c)}
J.eq=function(a,b){return J.aN(a).ac(a,b)}
J.er=function(a,b){return J.h(a).sj(a,b)}
J.es=function(a,b){return J.h(a).sS(a,b)}
J.et=function(a,b){return J.h(a).sl(a,b)}
J.cb=function(a,b,c,d){return J.h(a).cU(a,b,c,d)}
J.cc=function(a,b,c,d){return J.h(a).cV(a,b,c,d)}
J.aS=function(a,b,c,d){return J.h(a).eU(a,b,c,d)}
J.aT=function(a){return J.bX(a).eW(a)}
J.cd=function(a){return J.bX(a).ae(a)}
J.am=function(a){return J.m(a).i(a)}
J.ce=function(a,b){return J.h(a).eZ(a,b)}
J.aU=function(a,b,c,d,e,f,g){return J.h(a).f_(a,b,c,d,e,f,g)}
var $=I.p
C.h=W.eT.prototype
C.o=J.f.prototype
C.a=J.aE.prototype
C.d=J.cB.prototype
C.b=J.aF.prototype
C.i=J.b_.prototype
C.x=J.aG.prototype
C.z=J.fo.prototype
C.A=P.fw.prototype
C.B=J.b8.prototype
C.m=new H.ct()
C.n=new P.ho()
C.c=new P.hT()
C.f=new P.aC(0)
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
C.y=new H.eR([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.d1(0)
C.l=new F.d1(1)
$.cO="$cachedFunction"
$.cP="$cachedInvocation"
$.S=0
$.an=null
$.cf=null
$.bZ=null
$.dy=null
$.dK=null
$.be=null
$.bh=null
$.c_=null
$.ah=null
$.au=null
$.av=null
$.bT=!1
$.k=C.c
$.cw=0
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
I.$lazy(y,x,w)}})(["cl","$get$cl",function(){return init.getIsolateTag("_$dart_dartClosure")},"cz","$get$cz",function(){return H.f4()},"cA","$get$cA",function(){return new P.eM(null)},"d3","$get$d3",function(){return H.V(H.b7({toString:function(){return"$receiver$"}}))},"d4","$get$d4",function(){return H.V(H.b7({$method$:null,toString:function(){return"$receiver$"}}))},"d5","$get$d5",function(){return H.V(H.b7(null))},"d6","$get$d6",function(){return H.V(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"da","$get$da",function(){return H.V(H.b7(void 0))},"db","$get$db",function(){return H.V(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d8","$get$d8",function(){return H.V(H.d9(null))},"d7","$get$d7",function(){return H.V(function(){try{null.$method$}catch(z){return z.message}}())},"dd","$get$dd",function(){return H.V(H.d9(void 0))},"dc","$get$dc",function(){return H.V(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bO","$get$bO",function(){return P.hd()},"aw","$get$aw",function(){return[]},"ck","$get$ck",function(){return{}}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[W.bB]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,P.a4]},{func:1,args:[,],opt:[,]},{func:1,ret:P.Q,args:[P.o]},{func:1,v:true,args:[F.bK,P.o,P.Q,P.aa,P.aa]},{func:1,args:[W.bN]},{func:1,args:[,P.Q]},{func:1,args:[P.Q]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.o,,]},{func:1,v:true,args:[,],opt:[P.a4]},{func:1,ret:P.bV},{func:1,v:true,args:[P.b],opt:[P.a4]},{func:1,v:true,args:[,P.a4]},{func:1,args:[,,]},{func:1,args:[P.Q,,]},{func:1,args:[F.bJ]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iJ(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dM(F.dH(),b)},[])
else (function(b){H.dM(F.dH(),b)})([])})})()