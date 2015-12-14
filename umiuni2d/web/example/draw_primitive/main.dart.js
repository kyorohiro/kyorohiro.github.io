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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bX"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bX"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bX(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.be=function(){}
var dart=[["","",,H,{
"^":"",
jg:{
"^":"a;a"}}],["","",,J,{
"^":"",
m:function(a){return void 0},
bi:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bf:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.c0==null){H.iq()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.dd("Return interceptor for "+H.b(y(a,z))))}w=H.iz(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.D
else return C.M}return w},
f:{
"^":"a;",
t:function(a,b){return a===b},
gB:function(a){return H.a1(a)},
i:["cS",function(a){return H.b3(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
f0:{
"^":"f;",
i:function(a){return String(a)},
gB:function(a){return a?519018:218159},
$isbW:1},
f2:{
"^":"f;",
t:function(a,b){return null==b},
i:function(a){return"null"},
gB:function(a){return 0}},
cx:{
"^":"f;",
gB:function(a){return 0},
$isf3:1},
ff:{
"^":"cx;"},
bN:{
"^":"cx;",
i:function(a){return String(a)}},
aC:{
"^":"f;",
c0:function(a,b){if(!!a.immutable$list)throw H.e(new P.M(b))},
c_:function(a,b){if(!!a.fixed$length)throw H.e(new P.M(b))},
v:function(a,b){var z,y
this.c_(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.aj)(b),++y)a.push(b[y])},
H:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.H(a))}},
ab:function(a,b){return H.c(new H.bB(a,b),[null,null])},
c6:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
X:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
gee:function(a){if(a.length>0)return a[0]
throw H.e(H.bw())},
ga4:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bw())},
bs:function(a,b,c,d,e){var z,y,x
this.c0(a,"set range")
P.cP(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.A(P.am(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.eZ())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aU(a,"[","]")},
gG:function(a){return new J.en(a,a.length,0,null)},
gB:function(a){return H.a1(a)},
gj:function(a){return a.length},
sj:function(a,b){this.c_(a,"set length")
if(b<0)throw H.e(P.am(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.w(a,b))
if(b>=a.length||b<0)throw H.e(H.w(a,b))
return a[b]},
C:function(a,b,c){this.c0(a,"indexed set")
if(b>=a.length||b<0)throw H.e(H.w(a,b))
a[b]=c},
$isaV:1,
$isk:1,
$ask:null,
$isq:1},
jf:{
"^":"aC;"},
en:{
"^":"a;a,b,c,d",
gD:function(){return this.d},
A:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.H(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aD:{
"^":"f;",
bi:function(a,b){return a%b},
ad:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.M(""+a))},
F:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.M(""+a))},
eL:function(a){return a},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.e(H.ah(b))
return a+b},
cX:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.ad(a/b)},
aj:function(a,b){return(a|0)===a?a/b|0:this.ad(a/b)},
b1:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aH:function(a,b){if(typeof b!=="number")throw H.e(H.ah(b))
return a<b},
$isaK:1},
cw:{
"^":"aD;",
$isaK:1,
$isp:1},
f1:{
"^":"aD;",
$isaK:1},
aW:{
"^":"f;",
dR:function(a,b){if(b>=a.length)throw H.e(H.w(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.e(P.em(b,null,null))
return a+b},
cR:function(a,b,c){H.dz(b)
if(c==null)c=a.length
H.dz(c)
if(b<0)throw H.e(P.b4(b,null,null))
if(typeof c!=="number")return H.G(c)
if(b>c)throw H.e(P.b4(b,null,null))
if(c>a.length)throw H.e(P.b4(c,null,null))
return a.substring(b,c)},
cQ:function(a,b){return this.cR(a,b,null)},
dV:function(a,b,c){if(c>a.length)throw H.e(P.am(c,0,a.length,null,null))
return H.iE(a,b,c)},
gM:function(a){return a.length===0},
i:function(a){return a},
gB:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.w(a,b))
if(b>=a.length||b<0)throw H.e(H.w(a,b))
return a[b]},
$isaV:1,
$isW:1}}],["","",,H,{
"^":"",
aG:function(a,b){var z=a.ao(b)
if(!init.globalState.d.cy)init.globalState.f.as()
return z},
bh:function(){--init.globalState.f.b},
dK:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isk)throw H.e(P.aR("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hI(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cu()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hj(P.bz(null,H.aF),0)
y.z=P.aY(null,null,null,P.p,H.bS)
y.ch=P.aY(null,null,null,P.p,null)
if(y.x===!0){x=new H.hH()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eS,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hJ)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aY(null,null,null,P.p,H.b5)
w=P.al(null,null,null,P.p)
v=new H.b5(0,null,!1)
u=new H.bS(y,x,w,init.createNewIsolate(),v,new H.a9(H.bj()),new H.a9(H.bj()),!1,!1,[],P.al(null,null,null,null),null,null,!1,!0,P.al(null,null,null,null))
w.a9(0,0)
u.bv(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aI()
x=H.ai(y,[y]).a0(a)
if(x)u.ao(new H.iC(z,a))
else{y=H.ai(y,[y,y]).a0(a)
if(y)u.ao(new H.iD(z,a))
else u.ao(a)}init.globalState.f.as()},
eW:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eX()
return},
eX:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.M("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.M("Cannot extract URI from \""+H.b(z)+"\""))},
eS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b8(!0,[]).a1(b.data)
y=J.P(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b8(!0,[]).a1(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b8(!0,[]).a1(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aY(null,null,null,P.p,H.b5)
p=P.al(null,null,null,P.p)
o=new H.b5(0,null,!1)
n=new H.bS(y,q,p,init.createNewIsolate(),o,new H.a9(H.bj()),new H.a9(H.bj()),!1,!1,[],P.al(null,null,null,null),null,null,!1,!0,P.al(null,null,null,null))
p.a9(0,0)
n.bv(0,o)
init.globalState.f.a.W(new H.aF(n,new H.eT(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.as()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").Z(y.h(z,"msg"))
init.globalState.f.as()
break
case"close":init.globalState.ch.ac(0,$.$get$cv().h(0,a))
a.terminate()
init.globalState.f.as()
break
case"log":H.eR(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ac(["command","print","msg",z])
q=new H.ad(!0,P.ab(null,P.p)).K(q)
y.toString
self.postMessage(q)}else P.aL(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
eR:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ac(["command","log","msg",a])
x=new H.ad(!0,P.ab(null,P.p)).K(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.D(w)
z=H.z(w)
throw H.e(P.aT(z))}},
eU:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cL=$.cL+("_"+y)
$.cM=$.cM+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.Z(["spawned",new H.ba(y,x),w,z.r])
x=new H.eV(a,b,c,d,z)
if(e===!0){z.bY(w,w)
init.globalState.f.a.W(new H.aF(z,x,"start isolate"))}else x.$0()},
i1:function(a){return new H.b8(!0,[]).a1(new H.ad(!1,P.ab(null,P.p)).K(a))},
iC:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iD:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hI:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hJ:function(a){var z=P.ac(["command","print","msg",a])
return new H.ad(!0,P.ab(null,P.p)).K(z)}}},
bS:{
"^":"a;a,b,c,es:d<,dW:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bY:function(a,b){if(!this.f.t(0,a))return
if(this.Q.a9(0,b)&&!this.y)this.y=!0
this.b2()},
eC:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ac(0,a)
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
if(w===y.c)y.bF();++y.d}this.y=!1}this.b2()},
dE:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eB:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.A(new P.M("removeRange"))
P.cP(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cM:function(a,b){if(!this.r.t(0,a))return
this.db=b},
ei:function(a,b,c){var z=J.m(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){a.Z(c)
return}z=this.cx
if(z==null){z=P.bz(null,null)
this.cx=z}z.W(new H.hB(a,c))},
eg:function(a,b){var z
if(!this.r.t(0,a))return
z=J.m(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.bb()
return}z=this.cx
if(z==null){z=P.bz(null,null)
this.cx=z}z.W(this.gew())},
ej:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aL(a)
if(b!=null)P.aL(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.ax(a)
y[1]=b==null?null:J.ax(b)
for(x=new P.cz(z,z.r,null,null),x.c=z.e;x.A();)x.d.Z(y)},
ao:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.D(u)
w=t
v=H.z(u)
this.ej(w,v)
if(this.db===!0){this.bb()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ges()
if(this.cx!=null)for(;t=this.cx,!t.gM(t);)this.cx.cl().$0()}return y},
c9:function(a){return this.b.h(0,a)},
bv:function(a,b){var z=this.b
if(z.ak(a))throw H.e(P.aT("Registry: ports must be registered only once."))
z.C(0,a,b)},
b2:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.C(0,this.a,this)
else this.bb()},
bb:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.U(0)
for(z=this.b,y=z.gct(z),y=y.gG(y);y.A();)y.gD().d9()
z.U(0)
this.c.U(0)
init.globalState.z.ac(0,this.a)
this.dx.U(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.Z(z[v])}this.ch=null}},"$0","gew",0,0,1]},
hB:{
"^":"d:1;a,b",
$0:function(){this.a.Z(this.b)}},
hj:{
"^":"a;a,b",
e2:function(){var z=this.a
if(z.b===z.c)return
return z.cl()},
cp:function(){var z,y,x
z=this.e2()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ak(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gM(y)}else y=!1
else y=!1
else y=!1
if(y)H.A(P.aT("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gM(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ac(["command","close"])
x=new H.ad(!0,P.ab(null,P.p)).K(x)
y.toString
self.postMessage(x)}return!1}z.eA()
return!0},
bQ:function(){if(self.window!=null)new H.hk(this).$0()
else for(;this.cp(););},
as:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bQ()
else try{this.bQ()}catch(x){w=H.D(x)
z=w
y=H.z(x)
w=init.globalState.Q
v=P.ac(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.ad(!0,P.ab(null,P.p)).K(v)
w.toString
self.postMessage(v)}}},
hk:{
"^":"d:1;a",
$0:function(){if(!this.a.cp())return
P.cX(C.h,this)}},
aF:{
"^":"a;a,b,c",
eA:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ao(this.b)}},
hH:{
"^":"a;"},
eT:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.eU(this.a,this.b,this.c,this.d,this.e,this.f)}},
eV:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aI()
w=H.ai(x,[x,x]).a0(y)
if(w)y.$2(this.b,this.c)
else{x=H.ai(x,[x]).a0(y)
if(x)y.$1(this.b)
else y.$0()}}z.b2()}},
dh:{
"^":"a;"},
ba:{
"^":"dh;b,a",
Z:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbI())return
x=H.i1(a)
if(z.gdW()===y){y=J.P(x)
switch(y.h(x,0)){case"pause":z.bY(y.h(x,1),y.h(x,2))
break
case"resume":z.eC(y.h(x,1))
break
case"add-ondone":z.dE(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eB(y.h(x,1))
break
case"set-errors-fatal":z.cM(y.h(x,1),y.h(x,2))
break
case"ping":z.ei(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.eg(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a9(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ac(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.W(new H.aF(z,new H.hL(this,x),w))},
t:function(a,b){if(b==null)return!1
return b instanceof H.ba&&J.Z(this.b,b.b)},
gB:function(a){return this.b.gaX()}},
hL:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbI())z.d5(this.b)}},
bT:{
"^":"dh;b,c,a",
Z:function(a){var z,y,x
z=P.ac(["command","message","port",this,"msg",a])
y=new H.ad(!0,P.ab(null,P.p)).K(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.bT&&J.Z(this.b,b.b)&&J.Z(this.a,b.a)&&J.Z(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cN()
y=this.a
if(typeof y!=="number")return y.cN()
x=this.c
if(typeof x!=="number")return H.G(x)
return(z<<16^y<<8^x)>>>0}},
b5:{
"^":"a;aX:a<,b,bI:c<",
d9:function(){this.c=!0
this.b=null},
d5:function(a){if(this.c)return
this.dk(a)},
dk:function(a){return this.b.$1(a)},
$isfj:1},
fE:{
"^":"a;a,b,c",
d_:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.W(new H.aF(y,new H.fG(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.au(new H.fH(this,b),0),a)}else throw H.e(new P.M("Timer greater than 0."))},
static:{fF:function(a,b){var z=new H.fE(!0,!1,null)
z.d_(a,b)
return z}}},
fG:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fH:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
H.bh()
this.b.$0()}},
a9:{
"^":"a;aX:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.eR()
z=C.b.b1(z,0)^C.b.aj(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a9){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ad:{
"^":"a;a,b",
K:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.C(0,a,z.gj(z))
z=J.m(a)
if(!!z.$iscD)return["buffer",a]
if(!!z.$isbF)return["typed",a]
if(!!z.$isaV)return this.cI(a)
if(!!z.$iseQ){x=this.gcF()
w=a.gc7()
w=H.b0(w,x,H.J(w,"L",0),null)
w=P.bA(w,!0,H.J(w,"L",0))
z=z.gct(a)
z=H.b0(z,x,H.J(z,"L",0),null)
return["map",w,P.bA(z,!0,H.J(z,"L",0))]}if(!!z.$isf3)return this.cJ(a)
if(!!z.$isf)this.cs(a)
if(!!z.$isfj)this.at(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isba)return this.cK(a)
if(!!z.$isbT)return this.cL(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.at(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa9)return["capability",a.a]
if(!(a instanceof P.a))this.cs(a)
return["dart",init.classIdExtractor(a),this.cH(init.classFieldsExtractor(a))]},"$1","gcF",2,0,2],
at:function(a,b){throw H.e(new P.M(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cs:function(a){return this.at(a,null)},
cI:function(a){var z=this.cG(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.at(a,"Can't serialize indexable: ")},
cG:function(a){var z,y,x
z=[]
C.a.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.K(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cH:function(a){var z
for(z=0;z<a.length;++z)C.a.C(a,z,this.K(a[z]))
return a},
cJ:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.at(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.K(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cL:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cK:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaX()]
return["raw sendport",a]}},
b8:{
"^":"a;a,b",
a1:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aR("Bad serialized message: "+H.b(a)))
switch(C.a.gee(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=this.al(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.al(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.al(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.al(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.e5(a)
case"sendport":return this.e6(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.e4(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.a9(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.al(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","ge3",2,0,2],
al:function(a){var z,y,x
z=J.P(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.G(x)
if(!(y<x))break
z.C(a,y,this.a1(z.h(a,y)));++y}return a},
e5:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aZ()
this.b.push(w)
y=J.ei(y,this.ge3()).bl(0)
for(z=J.P(y),v=J.P(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.C(0,y[u],this.a1(v.h(x,u)))}return w},
e6:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.Z(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c9(w)
if(u==null)return
t=new H.ba(u,x)}else t=new H.bT(y,w,x)
this.b.push(t)
return t},
e4:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.P(y)
v=J.P(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.G(t)
if(!(u<t))break
w[z.h(y,u)]=this.a1(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eu:function(){throw H.e(new P.M("Cannot modify unmodifiable Map"))},
ik:function(a){return init.types[a]},
iy:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isaX},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ax(a)
if(typeof z!=="string")throw H.e(H.ah(a))
return z},
a1:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cN:function(a){var z,y
z=C.i(J.m(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.f.dR(z,0)===36)z=C.f.cQ(z,1)
return(z+H.dE(H.bZ(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b3:function(a){return"Instance of '"+H.cN(a)+"'"},
F:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cK:function(a){return a.b?H.F(a).getUTCMilliseconds()+0:H.F(a).getMilliseconds()+0},
b2:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ah(a))
return a[b]},
bG:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ah(a))
a[b]=c},
G:function(a){throw H.e(H.ah(a))},
h:function(a,b){if(a==null)J.aw(a)
throw H.e(H.w(a,b))},
w:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a8(!0,b,"index",null)
z=J.aw(a)
if(!(b<0)){if(typeof z!=="number")return H.G(z)
y=b>=z}else y=!0
if(y)return P.bv(b,a,"index",null,z)
return P.b4(b,"index",null)},
ah:function(a){return new P.a8(!0,a,null,null)},
Y:function(a){return a},
dz:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.ah(a))
return a},
e:function(a){var z
if(a==null)a=new P.cJ()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dM})
z.name=""}else z.toString=H.dM
return z},
dM:function(){return J.ax(this.dartException)},
A:function(a){throw H.e(a)},
aj:function(a){throw H.e(new P.H(a))},
D:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iG(a)
if(a==null)return
if(a instanceof H.bt)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.b1(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bx(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cI(v,null))}}if(a instanceof TypeError){u=$.$get$d1()
t=$.$get$d2()
s=$.$get$d3()
r=$.$get$d4()
q=$.$get$d8()
p=$.$get$d9()
o=$.$get$d6()
$.$get$d5()
n=$.$get$db()
m=$.$get$da()
l=u.O(y)
if(l!=null)return z.$1(H.bx(y,l))
else{l=t.O(y)
if(l!=null){l.method="call"
return z.$1(H.bx(y,l))}else{l=s.O(y)
if(l==null){l=r.O(y)
if(l==null){l=q.O(y)
if(l==null){l=p.O(y)
if(l==null){l=o.O(y)
if(l==null){l=r.O(y)
if(l==null){l=n.O(y)
if(l==null){l=m.O(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cI(y,l==null?null:l.method))}}return z.$1(new H.h4(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cS()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a8(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cS()
return a},
z:function(a){var z
if(a instanceof H.bt)return a.b
if(a==null)return new H.dm(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dm(a,null)},
iB:function(a){if(a==null||typeof a!='object')return J.E(a)
else return H.a1(a)},
dB:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.C(0,a[y],a[x])}return b},
is:function(a,b,c,d,e,f,g){var z=J.m(c)
if(z.t(c,0))return H.aG(b,new H.it(a))
else if(z.t(c,1))return H.aG(b,new H.iu(a,d))
else if(z.t(c,2))return H.aG(b,new H.iv(a,d,e))
else if(z.t(c,3))return H.aG(b,new H.iw(a,d,e,f))
else if(z.t(c,4))return H.aG(b,new H.ix(a,d,e,f,g))
else throw H.e(P.aT("Unsupported number of arguments for wrapped closure"))},
au:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.is)
a.$identity=z
return z},
es:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isk){z.$reflectionInfo=c
x=H.fm(z).r}else x=c
w=d?Object.create(new H.fs().constructor.prototype):Object.create(new H.bp(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.Q
$.Q=J.av(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ci(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ik(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cg:H.bq
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
ep:function(a,b,c,d){var z=H.bq
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ci:function(a,b,c){var z,y,x,w,v,u
if(c)return H.er(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ep(y,!w,z,b)
if(y===0){w=$.ak
if(w==null){w=H.aS("self")
$.ak=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.Q
$.Q=J.av(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ak
if(v==null){v=H.aS("self")
$.ak=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.Q
$.Q=J.av(w,1)
return new Function(v+H.b(w)+"}")()},
eq:function(a,b,c,d){var z,y
z=H.bq
y=H.cg
switch(b?-1:a){case 0:throw H.e(new H.fo("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
er:function(a,b){var z,y,x,w,v,u,t,s
z=H.eo()
y=$.cf
if(y==null){y=H.aS("receiver")
$.cf=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eq(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.Q
$.Q=J.av(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.Q
$.Q=J.av(u,1)
return new Function(y+H.b(u)+"}")()},
bX:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.es(a,b,z,!!d,e,f)},
iF:function(a){throw H.e(new P.ex("Cyclic initialization for static "+H.b(a)))},
ai:function(a,b,c){return new H.fp(a,b,c,null)},
aI:function(){return C.q},
bj:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
u:function(a,b,c){var z
if(b===0){J.dX(c,a)
return}else if(b===1){c.c1(H.D(a),H.z(a))
return}if(!!J.m(a).$isU)z=a
else{z=H.c(new P.C(0,$.l,null),[null])
z.aO(a)}z.aG(H.dv(b,0),new H.ib(b))
return c.gef()},
dv:function(a,b){return new H.i8(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
c:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bZ:function(a){if(a==null)return
return a.$builtinTypeInfo},
dC:function(a,b){return H.dL(a["$as"+H.b(b)],H.bZ(a))},
J:function(a,b,c){var z=H.dC(a,b)
return z==null?null:z[c]},
t:function(a,b){var z=H.bZ(a)
return z==null?null:z[b]},
c3:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dE(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dE:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bH("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.c3(u,c))}return w?"":"<"+H.b(z)+">"},
dL:function(a,b){if(typeof a=="function"){a=H.c1(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.c1(a,null,b)}return b},
ia:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.K(a[y],b[y]))return!1
return!0},
bc:function(a,b,c){return H.c1(a,b,H.dC(b,c))},
K:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dD(a,b)
if('func' in a)return b.builtin$cls==="eH"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c3(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.c3(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ia(H.dL(v,z),x)},
dx:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.K(z,v)||H.K(v,z)))return!1}return!0},
i9:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.K(v,u)||H.K(u,v)))return!1}return!0},
dD:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.K(z,y)||H.K(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dx(x,w,!1))return!1
if(!H.dx(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.K(o,n)||H.K(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.K(o,n)||H.K(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.K(o,n)||H.K(n,o)))return!1}}return H.i9(a.named,b.named)},
c1:function(a,b,c){return a.apply(b,c)},
k3:function(a){var z=$.c_
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
k1:function(a){return H.a1(a)},
k0:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iz:function(a){var z,y,x,w,v,u
z=$.c_.$1(a)
y=$.bd[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bg[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dw.$2(a,z)
if(z!=null){y=$.bd[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bg[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c2(x)
$.bd[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bg[z]=x
return x}if(v==="-"){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dG(a,x)
if(v==="*")throw H.e(new P.dd(z))
if(init.leafTags[z]===true){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dG(a,x)},
dG:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bi(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c2:function(a){return J.bi(a,!1,null,!!a.$isaX)},
iA:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bi(z,!1,null,!!z.$isaX)
else return J.bi(z,c,null,null)},
iq:function(){if(!0===$.c0)return
$.c0=!0
H.ir()},
ir:function(){var z,y,x,w,v,u,t,s
$.bd=Object.create(null)
$.bg=Object.create(null)
H.il()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dI.$1(v)
if(u!=null){t=H.iA(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
il:function(){var z,y,x,w,v,u,t
z=C.w()
z=H.ag(C.t,H.ag(C.y,H.ag(C.j,H.ag(C.j,H.ag(C.x,H.ag(C.u,H.ag(C.v(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c_=new H.im(v)
$.dw=new H.io(u)
$.dI=new H.ip(t)},
ag:function(a,b){return a(b)||b},
iE:function(a,b,c){return a.indexOf(b,c)>=0},
et:{
"^":"a;",
i:function(a){return P.cC(this)},
C:function(a,b,c){return H.eu()}},
bu:{
"^":"et;a",
aW:function(){var z=this.$map
if(z==null){z=new H.aE(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dB(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aW().h(0,b)},
H:function(a,b){this.aW().H(0,b)},
gj:function(a){var z=this.aW()
return z.gj(z)}},
fl:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fm:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fl(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
h3:{
"^":"a;a,b,c,d,e,f",
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
static:{S:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.h3(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d7:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cI:{
"^":"B;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
f5:{
"^":"B;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bx:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.f5(a,y,z?null:b.receiver)}}},
h4:{
"^":"B;a",
i:function(a){var z=this.a
return C.f.gM(z)?"Error":"Error: "+z}},
iG:{
"^":"d:2;a",
$1:function(a){if(!!J.m(a).$isB)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dm:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
it:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
iu:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
iv:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
iw:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ix:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"a;",
i:function(a){return"Closure '"+H.cN(this)+"'"},
gcu:function(){return this},
gcu:function(){return this}},
cV:{
"^":"d;"},
fs:{
"^":"cV;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bp:{
"^":"cV;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bp))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.a1(this.a)
else y=typeof z!=="object"?J.E(z):H.a1(z)
z=H.a1(this.b)
if(typeof y!=="number")return y.eS()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.b3(z)},
static:{bq:function(a){return a.a},cg:function(a){return a.c},eo:function(){var z=$.ak
if(z==null){z=H.aS("self")
$.ak=z}return z},aS:function(a){var z,y,x,w,v
z=new H.bp("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fo:{
"^":"B;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
cR:{
"^":"a;"},
fp:{
"^":"cR;a,b,c,d",
a0:function(a){var z=this.df(a)
return z==null?!1:H.dD(z,this.ae())},
df:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
ae:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$isjL)z.void=true
else if(!x.$iscp)z.ret=y.ae()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cQ(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cQ(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dA(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ae()}z.named=w}return z},
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
t=H.dA(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].ae())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cQ:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ae())
return z}}},
cp:{
"^":"cR;",
i:function(a){return"dynamic"},
ae:function(){return}},
bt:{
"^":"a;a,S:b<"},
ib:{
"^":"d:5;a",
$2:function(a,b){H.dv(this.a,1).$1(new H.bt(a,b))}},
i8:{
"^":"d:2;a,b",
$1:function(a){this.b(this.a,a)}},
aE:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gM:function(a){return this.a===0},
gc7:function(){return H.c(new H.f7(this),[H.t(this,0)])},
gct:function(a){return H.b0(this.gc7(),new H.f4(this),H.t(this,0),H.t(this,1))},
ak:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bB(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bB(y,a)}else return this.en(a)},
en:function(a){var z=this.d
if(z==null)return!1
return this.aq(this.T(z,this.ap(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.T(z,b)
return y==null?null:y.ga3()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.T(x,b)
return y==null?null:y.ga3()}else return this.eo(b)},
eo:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.T(z,this.ap(a))
x=this.aq(y,a)
if(x<0)return
return y[x].ga3()},
C:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aZ()
this.b=z}this.bu(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aZ()
this.c=y}this.bu(y,b,c)}else this.eq(b,c)},
eq:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aZ()
this.d=z}y=this.ap(a)
x=this.T(z,y)
if(x==null)this.b0(z,y,[this.b_(a,b)])
else{w=this.aq(x,a)
if(w>=0)x[w].sa3(b)
else x.push(this.b_(a,b))}},
ac:function(a,b){if(typeof b==="string")return this.bP(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bP(this.c,b)
else return this.ep(b)},
ep:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.T(z,this.ap(a))
x=this.aq(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bW(w)
return w.ga3()},
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
if(y!==this.r)throw H.e(new P.H(this))
z=z.c}},
bu:function(a,b,c){var z=this.T(a,b)
if(z==null)this.b0(a,b,this.b_(b,c))
else z.sa3(c)},
bP:function(a,b){var z
if(a==null)return
z=this.T(a,b)
if(z==null)return
this.bW(z)
this.bC(a,b)
return z.ga3()},
b_:function(a,b){var z,y
z=new H.f6(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bW:function(a){var z,y
z=a.gdv()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ap:function(a){return J.E(a)&0x3ffffff},
aq:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Z(a[y].gc4(),b))return y
return-1},
i:function(a){return P.cC(this)},
T:function(a,b){return a[b]},
b0:function(a,b,c){a[b]=c},
bC:function(a,b){delete a[b]},
bB:function(a,b){return this.T(a,b)!=null},
aZ:function(){var z=Object.create(null)
this.b0(z,"<non-identifier-key>",z)
this.bC(z,"<non-identifier-key>")
return z},
$iseQ:1},
f4:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
f6:{
"^":"a;c4:a<,a3:b@,c,dv:d<"},
f7:{
"^":"L;a",
gj:function(a){return this.a.a},
gG:function(a){var z,y
z=this.a
y=new H.f8(z,z.r,null,null)
y.c=z.e
return y},
H:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.H(z))
y=y.c}},
$isq:1},
f8:{
"^":"a;a,b,c,d",
gD:function(){return this.d},
A:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.H(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
im:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
io:{
"^":"d:9;a",
$2:function(a,b){return this.a(a,b)}},
ip:{
"^":"d:10;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bw:function(){return new P.an("No element")},
eZ:function(){return new P.an("Too few elements")},
fC:function(a){return a.geX()},
b_:{
"^":"L;",
gG:function(a){return new H.cA(this,this.gj(this),0,null)},
H:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.X(0,y))
if(z!==this.gj(this))throw H.e(new P.H(this))}},
ab:function(a,b){return H.c(new H.bB(this,b),[null,null])},
bm:function(a,b){var z,y,x
if(b){z=H.c([],[H.J(this,"b_",0)])
C.a.sj(z,this.gj(this))}else z=H.c(Array(this.gj(this)),[H.J(this,"b_",0)])
for(y=0;y<this.gj(this);++y){x=this.X(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bl:function(a){return this.bm(a,!0)},
$isq:1},
cA:{
"^":"a;a,b,c,d",
gD:function(){return this.d},
A:function(){var z,y,x,w
z=this.a
y=J.P(z)
x=y.gj(z)
if(this.b!==x)throw H.e(new P.H(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.X(z,w);++this.c
return!0}},
cB:{
"^":"L;a,b",
gG:function(a){var z=new H.fb(null,J.bo(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.aw(this.a)},
$asL:function(a,b){return[b]},
static:{b0:function(a,b,c,d){if(!!J.m(a).$isq)return H.c(new H.cq(a,b),[c,d])
return H.c(new H.cB(a,b),[c,d])}}},
cq:{
"^":"cB;a,b",
$isq:1},
fb:{
"^":"f_;a,b,c",
A:function(){var z=this.b
if(z.A()){this.a=this.aV(z.gD())
return!0}this.a=null
return!1},
gD:function(){return this.a},
aV:function(a){return this.c.$1(a)}},
bB:{
"^":"b_;a,b",
gj:function(a){return J.aw(this.a)},
X:function(a,b){return this.aV(J.e2(this.a,b))},
aV:function(a){return this.b.$1(a)},
$asb_:function(a,b){return[b]},
$asL:function(a,b){return[b]},
$isq:1},
cs:{
"^":"a;"}}],["","",,H,{
"^":"",
dA:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
h5:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ic()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.au(new P.h7(z),1)).observe(y,{childList:true})
return new P.h6(z,y,x)}else if(self.setImmediate!=null)return P.id()
return P.ie()},
jN:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.au(new P.h8(a),0))},"$1","ic",2,0,4],
jO:[function(a){++init.globalState.f.b
self.setImmediate(H.au(new P.h9(a),0))},"$1","id",2,0,4],
jP:[function(a){P.bI(C.h,a)},"$1","ie",2,0,4],
dq:function(a,b){var z=H.aI()
z=H.ai(z,[z,z]).a0(a)
if(z){b.toString
return a}else{b.toString
return a}},
eI:function(a,b,c){var z=new P.C(0,$.l,null)
z.$builtinTypeInfo=[c]
P.cX(a,new P.eJ(b,z))
return z},
ay:function(a){return H.c(new P.dg(H.c(new P.C(0,$.l,null),[a])),[a])},
i2:function(a,b,c){$.l.toString
a.L(b,c)},
i4:function(){var z,y
for(;z=$.ae,z!=null;){$.as=null
y=z.c
$.ae=y
if(y==null)$.ar=null
$.l=z.b
z.dL()}},
k_:[function(){$.bU=!0
try{P.i4()}finally{$.l=C.c
$.as=null
$.bU=!1
if($.ae!=null)$.$get$bP().$1(P.dy())}},"$0","dy",0,0,1],
du:function(a){if($.ae==null){$.ar=a
$.ae=a
if(!$.bU)$.$get$bP().$1(P.dy())}else{$.ar.c=a
$.ar=a}},
dJ:function(a){var z,y
z=$.l
if(C.c===z){P.af(null,null,C.c,a)
return}z.toString
if(C.c.gba()===z){P.af(null,null,z,a)
return}y=$.l
P.af(null,null,y,y.b3(a,!0))},
jD:function(a,b){var z,y,x
z=H.c(new P.dn(null,null,null,0),[b])
y=z.gdq()
x=z.gds()
z.a=a.a5(y,!0,z.gdr(),x)
return z},
i6:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.D(u)
z=t
y=H.z(u)
$.l.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.T(x)
w=t
v=x.gS()
c.$2(w,v)}}},
hY:function(a,b,c,d){var z=a.b5()
if(!!J.m(z).$isU)z.bo(new P.i0(b,c,d))
else b.L(c,d)},
hZ:function(a,b){return new P.i_(a,b)},
cX:function(a,b){var z=$.l
if(z===C.c){z.toString
return P.bI(a,b)}return P.bI(a,z.b3(b,!0))},
bI:function(a,b){var z=C.d.aj(a.a,1000)
return H.fF(z<0?0:z,b)},
bO:function(a){var z=$.l
$.l=a
return z},
aH:function(a,b,c,d,e){var z,y,x
z=new P.df(new P.i5(d,e),C.c,null)
y=$.ae
if(y==null){P.du(z)
$.as=$.ar}else{x=$.as
if(x==null){z.c=y
$.as=z
$.ae=z}else{z.c=x.c
x.c=z
$.as=z
if(z.c==null)$.ar=z}}},
dr:function(a,b,c,d){var z,y
if($.l===c)return d.$0()
z=P.bO(c)
try{y=d.$0()
return y}finally{$.l=z}},
dt:function(a,b,c,d,e){var z,y
if($.l===c)return d.$1(e)
z=P.bO(c)
try{y=d.$1(e)
return y}finally{$.l=z}},
ds:function(a,b,c,d,e,f){var z,y
if($.l===c)return d.$2(e,f)
z=P.bO(c)
try{y=d.$2(e,f)
return y}finally{$.l=z}},
af:function(a,b,c,d){var z=C.c!==c
if(z){d=c.b3(d,!(!z||C.c.gba()===c))
c=C.c}P.du(new P.df(d,c,null))},
h7:{
"^":"d:2;a",
$1:function(a){var z,y
H.bh()
z=this.a
y=z.a
z.a=null
y.$0()}},
h6:{
"^":"d:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
h8:{
"^":"d:0;a",
$0:function(){H.bh()
this.a.$0()}},
h9:{
"^":"d:0;a",
$0:function(){H.bh()
this.a.$0()}},
hV:{
"^":"a_;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hW:function(a,b){if(b!=null)return b
if(!!J.m(a).$isB)return a.gS()
return}}},
U:{
"^":"a;"},
eJ:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a6(null)}catch(x){w=H.D(x)
z=w
y=H.z(x)
P.i2(this.b,z,y)}}},
hd:{
"^":"a;ef:a<",
c1:function(a,b){a=a!=null?a:new P.cJ()
if(this.a.a!==0)throw H.e(new P.an("Future already completed"))
$.l.toString
this.L(a,b)},
dT:function(a){return this.c1(a,null)}},
dg:{
"^":"hd;a",
b8:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.an("Future already completed"))
z.aO(b)},
L:function(a,b){this.a.d8(a,b)}},
ap:{
"^":"a;bJ:a<,eD:b>,c,d,e",
ga8:function(){return this.b.b},
gc3:function(){return(this.c&1)!==0},
gel:function(){return this.c===6},
gek:function(){return this.c===8},
gdu:function(){return this.d},
gdD:function(){return this.d}},
C:{
"^":"a;az:a?,a8:b<,c",
gdl:function(){return this.a===8},
sdm:function(a){if(a)this.a=2
else this.a=0},
aG:function(a,b){var z,y
z=H.c(new P.C(0,$.l,null),[null])
y=z.b
if(y!==C.c){y.toString
if(b!=null)b=P.dq(b,y)}this.aL(new P.ap(null,z,b==null?1:3,a,b))
return z},
eK:function(a){return this.aG(a,null)},
bo:function(a){var z,y
z=$.l
y=new P.C(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aL(new P.ap(null,y,8,a,null))
return y},
aY:function(){if(this.a!==0)throw H.e(new P.an("Future already completed"))
this.a=1},
gdC:function(){return this.c},
gai:function(){return this.c},
bV:function(a){this.a=4
this.c=a},
bU:function(a){this.a=8
this.c=a},
dA:function(a,b){this.bU(new P.a_(a,b))},
aL:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.af(null,null,z,new P.ho(this,a))}else{a.a=this.c
this.c=a}},
ay:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbJ()
z.a=y}return y},
a6:function(a){var z,y
z=J.m(a)
if(!!z.$isU)if(!!z.$isC)P.b9(a,this)
else P.bR(a,this)
else{y=this.ay()
this.bV(a)
P.a6(this,y)}},
bA:function(a){var z=this.ay()
this.bV(a)
P.a6(this,z)},
L:[function(a,b){var z=this.ay()
this.bU(new P.a_(a,b))
P.a6(this,z)},function(a){return this.L(a,null)},"eT","$2","$1","gaS",2,2,12,0],
aO:function(a){var z
if(a==null);else{z=J.m(a)
if(!!z.$isU){if(!!z.$isC){z=a.a
if(z>=4&&z===8){this.aY()
z=this.b
z.toString
P.af(null,null,z,new P.hq(this,a))}else P.b9(a,this)}else P.bR(a,this)
return}}this.aY()
z=this.b
z.toString
P.af(null,null,z,new P.hr(this,a))},
d8:function(a,b){var z
this.aY()
z=this.b
z.toString
P.af(null,null,z,new P.hp(this,a,b))},
$isU:1,
static:{bR:function(a,b){var z,y,x,w
b.saz(2)
try{a.aG(new P.hs(b),new P.ht(b))}catch(x){w=H.D(x)
z=w
y=H.z(x)
P.dJ(new P.hu(b,z,y))}},b9:function(a,b){var z
b.a=2
z=new P.ap(null,b,0,null,null)
if(a.a>=4)P.a6(a,z)
else a.aL(z)},a6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdl()
if(b==null){if(w){v=z.a.gai()
y=z.a.ga8()
x=J.T(v)
u=v.gS()
y.toString
P.aH(null,null,y,x,u)}return}for(;b.gbJ()!=null;b=t){t=b.a
b.a=null
P.a6(z.a,b)}x.a=!0
s=w?null:z.a.gdC()
x.b=s
x.c=!1
y=!w
if(!y||b.gc3()||b.c===8){r=b.ga8()
if(w){u=z.a.ga8()
u.toString
if(u==null?r!=null:u!==r){u=u.gba()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gai()
y=z.a.ga8()
x=J.T(v)
u=v.gS()
y.toString
P.aH(null,null,y,x,u)
return}q=$.l
if(q==null?r!=null:q!==r)$.l=r
else q=null
if(y){if(b.gc3())x.a=new P.hw(x,b,s,r).$0()}else new P.hv(z,x,b,r).$0()
if(b.gek())new P.hx(z,x,w,b,r).$0()
if(q!=null)$.l=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.m(y).$isU}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.C)if(p.a>=4){o.a=2
z.a=p
b=new P.ap(null,o,0,null,null)
y=p
continue}else P.b9(p,o)
else P.bR(p,o)
return}}o=b.b
b=o.ay()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
ho:{
"^":"d:0;a,b",
$0:function(){P.a6(this.a,this.b)}},
hs:{
"^":"d:2;a",
$1:function(a){this.a.bA(a)}},
ht:{
"^":"d:6;a",
$2:function(a,b){this.a.L(a,b)},
$1:function(a){return this.$2(a,null)}},
hu:{
"^":"d:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
hq:{
"^":"d:0;a,b",
$0:function(){P.b9(this.b,this.a)}},
hr:{
"^":"d:0;a,b",
$0:function(){this.a.bA(this.b)}},
hp:{
"^":"d:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
hw:{
"^":"d:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aF(this.b.gdu(),this.c)
return!0}catch(x){w=H.D(x)
z=w
y=H.z(x)
this.a.b=new P.a_(z,y)
return!1}}},
hv:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gai()
y=!0
r=this.c
if(r.gel()){x=r.d
try{y=this.d.aF(x,J.T(z))}catch(q){r=H.D(q)
w=r
v=H.z(q)
r=J.T(z)
p=w
o=(r==null?p==null:r===p)?z:new P.a_(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aI()
p=H.ai(p,[p,p]).a0(r)
n=this.d
m=this.b
if(p)m.b=n.eF(u,J.T(z),z.gS())
else m.b=n.aF(u,J.T(z))}catch(q){r=H.D(q)
t=r
s=H.z(q)
r=J.T(z)
p=t
o=(r==null?p==null:r===p)?z:new P.a_(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hx:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cn(this.d.gdD())
z.a=w
v=w}catch(u){z=H.D(u)
y=z
x=H.z(u)
if(this.c){z=J.T(this.a.a.gai())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gai()
else v.b=new P.a_(y,x)
v.a=!1
return}if(!!J.m(v).$isU){t=this.d
s=t.geD(t)
s.sdm(!0)
this.b.c=!0
v.aG(new P.hy(this.a,s),new P.hz(z,s))}}},
hy:{
"^":"d:2;a,b",
$1:function(a){P.a6(this.a.a,new P.ap(null,this.b,0,null,null))}},
hz:{
"^":"d:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.C)){y=H.c(new P.C(0,$.l,null),[null])
z.a=y
y.dA(a,b)}P.a6(z.a,new P.ap(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
df:{
"^":"a;a,b,c",
dL:function(){return this.a.$0()}},
a3:{
"^":"a;",
ab:function(a,b){return H.c(new P.hK(b,this),[H.J(this,"a3",0),null])},
H:function(a,b){var z,y
z={}
y=H.c(new P.C(0,$.l,null),[null])
z.a=null
z.a=this.a5(new P.fw(z,this,b,y),!0,new P.fx(y),y.gaS())
return y},
gj:function(a){var z,y
z={}
y=H.c(new P.C(0,$.l,null),[P.p])
z.a=0
this.a5(new P.fy(z),!0,new P.fz(z,y),y.gaS())
return y},
bl:function(a){var z,y
z=H.c([],[H.J(this,"a3",0)])
y=H.c(new P.C(0,$.l,null),[[P.k,H.J(this,"a3",0)]])
this.a5(new P.fA(this,z),!0,new P.fB(z,y),y.gaS())
return y}},
fw:{
"^":"d;a,b,c,d",
$1:function(a){P.i6(new P.fu(this.c,a),new P.fv(),P.hZ(this.a.a,this.d))},
$signature:function(){return H.bc(function(a){return{func:1,args:[a]}},this.b,"a3")}},
fu:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fv:{
"^":"d:2;",
$1:function(a){}},
fx:{
"^":"d:0;a",
$0:function(){this.a.a6(null)}},
fy:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
fz:{
"^":"d:0;a,b",
$0:function(){this.b.a6(this.a.a)}},
fA:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bc(function(a){return{func:1,args:[a]}},this.a,"a3")}},
fB:{
"^":"d:0;a,b",
$0:function(){this.b.a6(this.a)}},
ft:{
"^":"a;"},
jT:{
"^":"a;"},
ha:{
"^":"a;a8:d<,az:e?",
bg:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bZ()
if((z&4)===0&&(this.e&32)===0)this.bG(this.gbL())},
ar:function(a){return this.bg(a,null)},
cm:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gM(z)}else z=!1
if(z)this.r.aI(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bG(this.gbN())}}}},
b5:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aP()
return this.f},
aP:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bZ()
if((this.e&32)===0)this.r=null
this.f=this.bK()},
aN:["cV",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bR(a)
else this.aM(new P.hg(a,null))}],
aK:["cW",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bT(a,b)
else this.aM(new P.hi(a,b,null))}],
d7:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bS()
else this.aM(C.r)},
bM:[function(){},"$0","gbL",0,0,1],
bO:[function(){},"$0","gbN",0,0,1],
bK:function(){return},
aM:function(a){var z,y
z=this.r
if(z==null){z=new P.hU(null,null,0)
this.r=z}z.a9(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aI(this)}},
bR:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bk(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aQ((z&4)!==0)},
bT:function(a,b){var z,y
z=this.e
y=new P.hc(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aP()
z=this.f
if(!!J.m(z).$isU)z.bo(y)
else y.$0()}else{y.$0()
this.aQ((z&4)!==0)}},
bS:function(){var z,y
z=new P.hb(this)
this.aP()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isU)y.bo(z)
else z.$0()},
bG:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aQ((z&4)!==0)},
aQ:function(a){var z,y
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
if(y)this.bM()
else this.bO()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aI(this)},
d3:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dq(b,z)
this.c=c}},
hc:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aI()
x=H.ai(x,[x,x]).a0(y)
w=z.d
v=this.b
u=z.b
if(x)w.eG(u,v,this.c)
else w.bk(u,v)
z.e=(z.e&4294967263)>>>0}},
hb:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.co(z.c)
z.e=(z.e&4294967263)>>>0}},
di:{
"^":"a;aE:a@"},
hg:{
"^":"di;b,a",
bh:function(a){a.bR(this.b)}},
hi:{
"^":"di;an:b>,S:c<,a",
bh:function(a){a.bT(this.b,this.c)}},
hh:{
"^":"a;",
bh:function(a){a.bS()},
gaE:function(){return},
saE:function(a){throw H.e(new P.an("No events after a done."))}},
hM:{
"^":"a;az:a?",
aI:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dJ(new P.hN(this,a))
this.a=1},
bZ:function(){if(this.a===1)this.a=3}},
hN:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.eh(this.b)}},
hU:{
"^":"hM;b,c,a",
gM:function(a){return this.c==null},
a9:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saE(b)
this.c=b}},
eh:function(a){var z,y
z=this.b
y=z.gaE()
this.b=y
if(y==null)this.c=null
z.bh(a)}},
dn:{
"^":"a;a,b,c,az:d?",
bw:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eY:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a6(!0)
return}this.a.ar(0)
this.c=a
this.d=3},"$1","gdq",2,0,function(){return H.bc(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dn")}],
dt:[function(a,b){var z
if(this.d===2){z=this.c
this.bw(0)
z.L(a,b)
return}this.a.ar(0)
this.c=new P.a_(a,b)
this.d=4},function(a){return this.dt(a,null)},"f_","$2","$1","gds",2,2,14,0],
eZ:[function(){if(this.d===2){var z=this.c
this.bw(0)
z.a6(!1)
return}this.a.ar(0)
this.c=null
this.d=5},"$0","gdr",0,0,1]},
i0:{
"^":"d:0;a,b,c",
$0:function(){return this.a.L(this.b,this.c)}},
i_:{
"^":"d:5;a,b",
$2:function(a,b){return P.hY(this.a,this.b,a,b)}},
bQ:{
"^":"a3;",
a5:function(a,b,c,d){return this.dd(a,d,c,!0===b)},
c8:function(a,b,c){return this.a5(a,null,b,c)},
dd:function(a,b,c,d){return P.hn(this,a,b,c,d,H.J(this,"bQ",0),H.J(this,"bQ",1))},
bH:function(a,b){b.aN(a)},
$asa3:function(a,b){return[b]}},
dj:{
"^":"ha;x,y,a,b,c,d,e,f,r",
aN:function(a){if((this.e&2)!==0)return
this.cV(a)},
aK:function(a,b){if((this.e&2)!==0)return
this.cW(a,b)},
bM:[function(){var z=this.y
if(z==null)return
z.ar(0)},"$0","gbL",0,0,1],
bO:[function(){var z=this.y
if(z==null)return
z.cm()},"$0","gbN",0,0,1],
bK:function(){var z=this.y
if(z!=null){this.y=null
z.b5()}return},
eU:[function(a){this.x.bH(a,this)},"$1","gdh",2,0,function(){return H.bc(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dj")}],
eW:[function(a,b){this.aK(a,b)},"$2","gdj",4,0,15],
eV:[function(){this.d7()},"$0","gdi",0,0,1],
d4:function(a,b,c,d,e,f,g){var z,y
z=this.gdh()
y=this.gdj()
this.y=this.x.a.c8(z,this.gdi(),y)},
static:{hn:function(a,b,c,d,e,f,g){var z=$.l
z=H.c(new P.dj(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.d3(b,c,d,e)
z.d4(a,b,c,d,e,f,g)
return z}}},
hK:{
"^":"bQ;b,a",
bH:function(a,b){var z,y,x,w,v
z=null
try{z=this.dB(a)}catch(w){v=H.D(w)
y=v
x=H.z(w)
$.l.toString
b.aK(y,x)
return}b.aN(z)},
dB:function(a){return this.b.$1(a)}},
a_:{
"^":"a;an:a>,S:b<",
i:function(a){return H.b(this.a)},
$isB:1},
hX:{
"^":"a;"},
i5:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.hV(z,P.hW(z,this.b)))}},
hP:{
"^":"hX;",
gba:function(){return this},
co:function(a){var z,y,x,w
try{if(C.c===$.l){x=a.$0()
return x}x=P.dr(null,null,this,a)
return x}catch(w){x=H.D(w)
z=x
y=H.z(w)
return P.aH(null,null,this,z,y)}},
bk:function(a,b){var z,y,x,w
try{if(C.c===$.l){x=a.$1(b)
return x}x=P.dt(null,null,this,a,b)
return x}catch(w){x=H.D(w)
z=x
y=H.z(w)
return P.aH(null,null,this,z,y)}},
eG:function(a,b,c){var z,y,x,w
try{if(C.c===$.l){x=a.$2(b,c)
return x}x=P.ds(null,null,this,a,b,c)
return x}catch(w){x=H.D(w)
z=x
y=H.z(w)
return P.aH(null,null,this,z,y)}},
b3:function(a,b){if(b)return new P.hQ(this,a)
else return new P.hR(this,a)},
dH:function(a,b){if(b)return new P.hS(this,a)
else return new P.hT(this,a)},
h:function(a,b){return},
cn:function(a){if($.l===C.c)return a.$0()
return P.dr(null,null,this,a)},
aF:function(a,b){if($.l===C.c)return a.$1(b)
return P.dt(null,null,this,a,b)},
eF:function(a,b,c){if($.l===C.c)return a.$2(b,c)
return P.ds(null,null,this,a,b,c)}},
hQ:{
"^":"d:0;a,b",
$0:function(){return this.a.co(this.b)}},
hR:{
"^":"d:0;a,b",
$0:function(){return this.a.cn(this.b)}},
hS:{
"^":"d:2;a,b",
$1:function(a){return this.a.bk(this.b,a)}},
hT:{
"^":"d:2;a,b",
$1:function(a){return this.a.aF(this.b,a)}}}],["","",,P,{
"^":"",
aZ:function(){return H.c(new H.aE(0,null,null,null,null,null,0),[null,null])},
ac:function(a){return H.dB(a,H.c(new H.aE(0,null,null,null,null,null,0),[null,null]))},
eY:function(a,b,c){var z,y
if(P.bV(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$at()
y.push(a)
try{P.i3(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cT(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aU:function(a,b,c){var z,y,x
if(P.bV(a))return b+"..."+c
z=new P.bH(b)
y=$.$get$at()
y.push(a)
try{x=z
x.a=P.cT(x.ga7(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga7()+c
y=z.ga7()
return y.charCodeAt(0)==0?y:y},
bV:function(a){var z,y
for(z=0;y=$.$get$at(),z<y.length;++z)if(a===y[z])return!0
return!1},
i3:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gG(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.A())return
w=H.b(z.gD())
b.push(w)
y+=w.length+2;++x}if(!z.A()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gD();++x
if(!z.A()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gD();++x
for(;z.A();t=s,s=r){r=z.gD();++x
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
aY:function(a,b,c,d,e){return H.c(new H.aE(0,null,null,null,null,null,0),[d,e])},
ab:function(a,b){return P.hF(a,b)},
al:function(a,b,c,d){return H.c(new P.hC(0,null,null,null,null,null,0),[d])},
cC:function(a){var z,y,x
z={}
if(P.bV(a))return"{...}"
y=new P.bH("")
try{$.$get$at().push(a)
x=y
x.a=x.ga7()+"{"
z.a=!0
J.e3(a,new P.fc(z,y))
z=y
z.a=z.ga7()+"}"}finally{z=$.$get$at()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga7()
return z.charCodeAt(0)==0?z:z},
hE:{
"^":"aE;a,b,c,d,e,f,r",
ap:function(a){return H.iB(a)&0x3ffffff},
aq:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gc4()
if(x==null?b==null:x===b)return y}return-1},
static:{hF:function(a,b){return H.c(new P.hE(0,null,null,null,null,null,0),[a,b])}}},
hC:{
"^":"hA;a,b,c,d,e,f,r",
gG:function(a){var z=new P.cz(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dU:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dc(b)},
dc:function(a){var z=this.d
if(z==null)return!1
return this.ax(z[this.aw(a)],a)>=0},
c9:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dU(0,a)?a:null
else return this.dn(a)},
dn:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aw(a)]
x=this.ax(y,a)
if(x<0)return
return J.c4(y,x).gbD()},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.H(this))
z=z.b}},
a9:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bx(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bx(x,b)}else return this.W(b)},
W:function(a){var z,y,x
z=this.d
if(z==null){z=P.hD()
this.d=z}y=this.aw(a)
x=z[y]
if(x==null)z[y]=[this.aR(a)]
else{if(this.ax(x,a)>=0)return!1
x.push(this.aR(a))}return!0},
ac:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.by(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.by(this.c,b)
else return this.dw(b)},
dw:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aw(a)]
x=this.ax(y,a)
if(x<0)return!1
this.bz(y.splice(x,1)[0])
return!0},
U:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bx:function(a,b){if(a[b]!=null)return!1
a[b]=this.aR(b)
return!0},
by:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bz(z)
delete a[b]
return!0},
aR:function(a){var z,y
z=new P.f9(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bz:function(a){var z,y
z=a.gda()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aw:function(a){return J.E(a)&0x3ffffff},
ax:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Z(a[y].gbD(),b))return y
return-1},
$isq:1,
static:{hD:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f9:{
"^":"a;bD:a<,b,da:c<"},
cz:{
"^":"a;a,b,c,d",
gD:function(){return this.d},
A:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.H(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hA:{
"^":"fq;"},
by:{
"^":"a;",
gG:function(a){return new H.cA(a,this.gj(a),0,null)},
X:function(a,b){return this.h(a,b)},
H:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.H(a))}},
ab:function(a,b){return H.c(new H.bB(a,b),[null,null])},
i:function(a){return P.aU(a,"[","]")},
$isk:1,
$ask:null,
$isq:1},
fc:{
"^":"d:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
fa:{
"^":"L;a,b,c,d",
gG:function(a){return new P.hG(this,this.c,this.d,this.b,null)},
H:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.A(new P.H(this))}},
gM:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
U:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aU(this,"{","}")},
cl:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bw());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
W:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bF();++this.d},
bF:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.t(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.bs(y,0,w,z,x)
C.a.bs(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cY:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$isq:1,
static:{bz:function(a,b){var z=H.c(new P.fa(null,0,0,0),[b])
z.cY(a,b)
return z}}},
hG:{
"^":"a;a,b,c,d,e",
gD:function(){return this.e},
A:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.A(new P.H(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fr:{
"^":"a;",
ab:function(a,b){return H.c(new H.cq(this,b),[H.t(this,0),null])},
i:function(a){return P.aU(this,"{","}")},
H:function(a,b){var z
for(z=this.gG(this);z.A();)b.$1(z.d)},
$isq:1},
fq:{
"^":"fr;"}}],["","",,P,{
"^":"",
i7:function(a){return H.fC(a)},
br:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ax(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eE(a)},
eE:function(a){var z=J.m(a)
if(!!z.$isd)return z.i(a)
return H.b3(a)},
aT:function(a){return new P.hm(a)},
bA:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.bo(a);y.A();)z.push(y.gD())
if(b)return z
z.fixed$length=Array
return z},
aL:function(a){var z=H.b(a)
H.dH(z)},
jt:{
"^":"d:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.i7(a)}},
bW:{
"^":"a;"},
"+bool":0,
cj:{
"^":"a;a,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.cj))return!1
return this.a===b.a&&this.b===b.b},
gB:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ey(z?H.F(this).getUTCFullYear()+0:H.F(this).getFullYear()+0)
x=P.az(z?H.F(this).getUTCMonth()+1:H.F(this).getMonth()+1)
w=P.az(z?H.F(this).getUTCDate()+0:H.F(this).getDate()+0)
v=P.az(z?H.F(this).getUTCHours()+0:H.F(this).getHours()+0)
u=P.az(z?H.F(this).getUTCMinutes()+0:H.F(this).getMinutes()+0)
t=P.az(z?H.F(this).getUTCSeconds()+0:H.F(this).getSeconds()+0)
s=P.ez(H.cK(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{ey:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},ez:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},az:function(a){if(a>=10)return""+a
return"0"+a}}},
bk:{
"^":"aK;"},
"+double":0,
aA:{
"^":"a;a",
m:function(a,b){return new P.aA(C.d.m(this.a,b.gde()))},
aH:function(a,b){return C.d.aH(this.a,b.gde())},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.aA))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eD()
y=this.a
if(y<0)return"-"+new P.aA(-y).i(0)
x=z.$1(C.d.bi(C.d.aj(y,6e7),60))
w=z.$1(C.d.bi(C.d.aj(y,1e6),60))
v=new P.eC().$1(C.d.bi(y,1e6))
return""+C.d.aj(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
eC:{
"^":"d:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eD:{
"^":"d:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
B:{
"^":"a;",
gS:function(){return H.z(this.$thrownJsError)}},
cJ:{
"^":"B;",
i:function(a){return"Throw of null."}},
a8:{
"^":"B;a,b,c,d",
gaU:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaT:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaU()+y+x
if(!this.a)return w
v=this.gaT()
u=P.br(this.b)
return w+v+": "+H.b(u)},
static:{aR:function(a){return new P.a8(!1,null,null,a)},em:function(a,b,c){return new P.a8(!0,a,b,c)}}},
cO:{
"^":"a8;e,f,a,b,c,d",
gaU:function(){return"RangeError"},
gaT:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.eQ()
if(typeof z!=="number")return H.G(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b4:function(a,b,c){return new P.cO(null,null,!0,a,b,"Value not in range")},am:function(a,b,c,d,e){return new P.cO(b,c,!0,a,d,"Invalid value")},cP:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.am(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.am(b,a,c,"end",f))
return b}}},
eM:{
"^":"a8;e,j:f>,a,b,c,d",
gaU:function(){return"RangeError"},
gaT:function(){P.br(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dN(this.b,0)?": index must not be negative":z},
static:{bv:function(a,b,c,d,e){var z=e!=null?e:J.aw(b)
return new P.eM(b,z,!0,a,c,"Index out of range")}}},
M:{
"^":"B;a",
i:function(a){return"Unsupported operation: "+this.a}},
dd:{
"^":"B;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
an:{
"^":"B;a",
i:function(a){return"Bad state: "+this.a}},
H:{
"^":"B;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.br(z))+"."}},
cS:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gS:function(){return},
$isB:1},
ex:{
"^":"B;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hm:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eF:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.b2(b,"expando$values")
return z==null?null:H.b2(z,this.bE())},
C:function(a,b,c){var z=H.b2(b,"expando$values")
if(z==null){z=new P.a()
H.bG(b,"expando$values",z)}H.bG(z,this.bE(),c)},
bE:function(){var z,y
z=H.b2(this,"expando$key")
if(z==null){y=$.cr
$.cr=y+1
z="expando$key$"+y
H.bG(this,"expando$key",z)}return z}},
eH:{
"^":"a;"},
p:{
"^":"aK;"},
"+int":0,
L:{
"^":"a;",
ab:function(a,b){return H.b0(this,b,H.J(this,"L",0),null)},
H:function(a,b){var z
for(z=this.gG(this);z.A();)b.$1(z.gD())},
bm:function(a,b){return P.bA(this,b,H.J(this,"L",0))},
bl:function(a){return this.bm(a,!0)},
gj:function(a){var z,y
z=this.gG(this)
for(y=0;z.A();)++y
return y},
X:function(a,b){var z,y,x
if(b<0)H.A(P.am(b,0,null,"index",null))
for(z=this.gG(this),y=0;z.A();){x=z.gD()
if(b===y)return x;++y}throw H.e(P.bv(b,this,"index",null,y))},
i:function(a){return P.eY(this,"(",")")}},
f_:{
"^":"a;"},
k:{
"^":"a;",
$ask:null,
$isq:1},
"+List":0,
ju:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aK:{
"^":"a;"},
"+num":0,
a:{
"^":";",
t:function(a,b){return this===b},
gB:function(a){return H.a1(this)},
i:function(a){return H.b3(this)}},
a2:{
"^":"a;"},
W:{
"^":"a;"},
"+String":0,
bH:{
"^":"a;a7:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cT:function(a,b,c){var z=J.bo(b)
if(!z.A())return a
if(c.length===0){do a+=H.b(z.gD())
while(z.A())}else{a+=H.b(z.gD())
for(;z.A();)a=a+c+H.b(z.gD())}return a}}},
cU:{
"^":"a;"}}],["","",,W,{
"^":"",
ew:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.z)},
a7:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dk:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dp:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hf(a)
if(!!J.m(z).$isN)return z
return}else return a},
y:function(a){var z=$.l
if(z===C.c)return a
return z.dH(a,!0)},
v:{
"^":"aB;",
$isv:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iJ:{
"^":"v;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iL:{
"^":"v;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iM:{
"^":"v;",
gbc:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbd:function(a){return H.c(new W.r(a,"load",!1),[null])},
$isN:1,
$isf:1,
"%":"HTMLBodyElement"},
ch:{
"^":"v;k:height%,l:width%",
bp:function(a,b,c){return a.getContext(b,P.ig(c))},
cA:function(a,b,c,d,e,f,g){var z,y
z=P.ac(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bp(a,"webgl",z)
return y==null?this.bp(a,"experimental-webgl",z):y},
cz:function(a,b){return this.cA(a,!0,!0,!0,!0,!1,b)},
$isch:1,
"%":"HTMLCanvasElement"},
iO:{
"^":"b1;j:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iP:{
"^":"eN;j:length=",
bq:function(a,b){var z=this.dg(a,b)
return z!=null?z:""},
dg:function(a,b){if(W.ew(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.eA()+b)},
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eN:{
"^":"f+ev;"},
ev:{
"^":"a;",
gk:function(a){return this.bq(a,"height")},
gl:function(a){return this.bq(a,"width")}},
iQ:{
"^":"b1;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iR:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
eB:{
"^":"f;b4:bottom=,k:height=,N:left=,bj:right=,af:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gl(a))+" x "+H.b(this.gk(a))},
t:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isV)return!1
y=a.left
x=z.gN(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaf(b)
if(y==null?x==null:y===x){y=this.gl(a)
x=z.gl(b)
if(y==null?x==null:y===x){y=this.gk(a)
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){var z,y,x,w
z=J.E(a.left)
y=J.E(a.top)
x=J.E(this.gl(a))
w=J.E(this.gk(a))
return W.dk(W.a7(W.a7(W.a7(W.a7(0,z),y),x),w))},
gbn:function(a){return H.c(new P.I(a.left,a.top),[null])},
$isV:1,
$asV:I.be,
"%":";DOMRectReadOnly"},
aB:{
"^":"b1;",
gI:function(a){return P.fk(C.b.F(a.offsetLeft),C.b.F(a.offsetTop),C.b.F(a.offsetWidth),C.b.F(a.offsetHeight),null)},
i:function(a){return a.localName},
cw:function(a){return a.getBoundingClientRect()},
gbc:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbd:function(a){return H.c(new W.r(a,"load",!1),[null])},
gca:function(a){return H.c(new W.r(a,"mousedown",!1),[null])},
gcb:function(a){return H.c(new W.r(a,"mouseenter",!1),[null])},
gcc:function(a){return H.c(new W.r(a,"mouseleave",!1),[null])},
gcd:function(a){return H.c(new W.r(a,"mousemove",!1),[null])},
gce:function(a){return H.c(new W.r(a,"mouseout",!1),[null])},
gcf:function(a){return H.c(new W.r(a,"mouseover",!1),[null])},
gcg:function(a){return H.c(new W.r(a,"mouseup",!1),[null])},
$isaB:1,
$isf:1,
$isN:1,
"%":";Element"},
iS:{
"^":"v;k:height%,V:src},l:width%",
"%":"HTMLEmbedElement"},
iT:{
"^":"bs;an:error=",
"%":"ErrorEvent"},
bs:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
N:{
"^":"f;",
d6:function(a,b,c,d){return a.addEventListener(b,H.au(c,1),d)},
dz:function(a,b,c,d){return a.removeEventListener(b,H.au(c,1),d)},
$isN:1,
"%":"MediaStream;EventTarget"},
jb:{
"^":"v;j:length=",
"%":"HTMLFormElement"},
jc:{
"^":"v;k:height%,V:src},l:width%",
"%":"HTMLIFrameElement"},
ct:{
"^":"v;k:height%,V:src},l:width%",
b8:function(a,b){return a.complete.$1(b)},
$isct:1,
"%":"HTMLImageElement"},
je:{
"^":"v;k:height%,V:src},l:width%",
$isaB:1,
$isf:1,
$isN:1,
"%":"HTMLInputElement"},
fd:{
"^":"v;an:error=,V:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bC:{
"^":"dc;",
gI:function(a){var z,y
if(!!a.offsetX)return H.c(new P.I(a.offsetX,a.offsetY),[null])
else{if(!J.m(W.dp(a.target)).$isaB)throw H.e(new P.M("offsetX is only supported on elements"))
z=W.dp(a.target)
y=H.c(new P.I(a.clientX,a.clientY),[null]).aJ(0,J.ec(J.ef(z)))
return H.c(new P.I(J.cd(y.a),J.cd(y.b)),[null])}},
$isbC:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
js:{
"^":"f;",
$isf:1,
"%":"Navigator"},
b1:{
"^":"N;",
i:function(a){var z=a.nodeValue
return z==null?this.cS(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
jv:{
"^":"v;k:height%,l:width%",
"%":"HTMLObjectElement"},
jy:{
"^":"v;V:src}",
"%":"HTMLScriptElement"},
jA:{
"^":"v;j:length=",
"%":"HTMLSelectElement"},
jB:{
"^":"v;V:src}",
"%":"HTMLSourceElement"},
jC:{
"^":"bs;an:error=",
"%":"SpeechRecognitionError"},
bL:{
"^":"f;",
$isa:1,
"%":"Touch"},
bM:{
"^":"dc;dM:changedTouches=",
$isbM:1,
$isa:1,
"%":"TouchEvent"},
jH:{
"^":"eP;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bv(b,a,null,null,null))
return a[b]},
C:function(a,b,c){throw H.e(new P.M("Cannot assign element of immutable List."))},
X:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isk:1,
$ask:function(){return[W.bL]},
$isq:1,
$isaX:1,
$isaV:1,
"%":"TouchList"},
eO:{
"^":"f+by;",
$isk:1,
$ask:function(){return[W.bL]},
$isq:1},
eP:{
"^":"eO+eL;",
$isk:1,
$ask:function(){return[W.bL]},
$isq:1},
jI:{
"^":"v;V:src}",
"%":"HTMLTrackElement"},
dc:{
"^":"bs;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
de:{
"^":"fd;k:height%,l:width%",
$isde:1,
"%":"HTMLVideoElement"},
jM:{
"^":"N;",
$isf:1,
$isN:1,
"%":"DOMWindow|Window"},
jQ:{
"^":"f;b4:bottom=,k:height=,N:left=,bj:right=,af:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
t:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isV)return!1
y=a.left
x=z.gN(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaf(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){var z,y,x,w
z=J.E(a.left)
y=J.E(a.top)
x=J.E(a.width)
w=J.E(a.height)
return W.dk(W.a7(W.a7(W.a7(W.a7(0,z),y),x),w))},
gbn:function(a){return H.c(new P.I(a.left,a.top),[null])},
$isV:1,
$asV:I.be,
"%":"ClientRect"},
jR:{
"^":"b1;",
$isf:1,
"%":"DocumentType"},
jS:{
"^":"eB;",
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"DOMRect"},
jV:{
"^":"v;",
$isN:1,
$isf:1,
"%":"HTMLFrameSetElement"},
hl:{
"^":"a3;",
a5:function(a,b,c,d){var z=new W.x(0,this.a,this.b,W.y(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.E()
return z},
c8:function(a,b,c){return this.a5(a,null,b,c)}},
r:{
"^":"hl;a,b,c"},
x:{
"^":"ft;a,b,c,d,e",
b5:function(){if(this.b==null)return
this.bX()
this.b=null
this.d=null
return},
bg:function(a,b){if(this.b==null)return;++this.a
this.bX()},
ar:function(a){return this.bg(a,null)},
cm:function(){if(this.b==null||this.a<=0)return;--this.a
this.E()},
E:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dO(x,this.c,z,this.e)}},
bX:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dP(x,this.c,z,this.e)}}},
eL:{
"^":"a;",
gG:function(a){return new W.eG(a,this.gj(a),-1,null)},
$isk:1,
$ask:null,
$isq:1},
eG:{
"^":"a;a,b,c,d",
A:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c4(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gD:function(){return this.d}},
he:{
"^":"a;a",
$isN:1,
$isf:1,
static:{hf:function(a){if(a===window)return a
else return new W.he(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iH:{
"^":"aa;",
$isf:1,
"%":"SVGAElement"},
iI:{
"^":"fD;",
$isf:1,
"%":"SVGAltGlyphElement"},
iK:{
"^":"o;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iU:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEBlendElement"},
iV:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iW:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEComponentTransferElement"},
iX:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFECompositeElement"},
iY:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
iZ:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
j_:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
j0:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEFloodElement"},
j1:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
j2:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEImageElement"},
j3:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEMergeElement"},
j4:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEMorphologyElement"},
j5:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEOffsetElement"},
j6:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFESpecularLightingElement"},
j7:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFETileElement"},
j8:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFETurbulenceElement"},
j9:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFilterElement"},
ja:{
"^":"aa;k:height=,l:width=",
"%":"SVGForeignObjectElement"},
eK:{
"^":"aa;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
aa:{
"^":"o;",
$isf:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jd:{
"^":"aa;k:height=,l:width=",
$isf:1,
"%":"SVGImageElement"},
jh:{
"^":"o;",
$isf:1,
"%":"SVGMarkerElement"},
ji:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGMaskElement"},
jw:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGPatternElement"},
jx:{
"^":"eK;k:height=,l:width=",
"%":"SVGRectElement"},
jz:{
"^":"o;",
$isf:1,
"%":"SVGScriptElement"},
o:{
"^":"aB;",
gbc:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbd:function(a){return H.c(new W.r(a,"load",!1),[null])},
gca:function(a){return H.c(new W.r(a,"mousedown",!1),[null])},
gcb:function(a){return H.c(new W.r(a,"mouseenter",!1),[null])},
gcc:function(a){return H.c(new W.r(a,"mouseleave",!1),[null])},
gcd:function(a){return H.c(new W.r(a,"mousemove",!1),[null])},
gce:function(a){return H.c(new W.r(a,"mouseout",!1),[null])},
gcf:function(a){return H.c(new W.r(a,"mouseover",!1),[null])},
gcg:function(a){return H.c(new W.r(a,"mouseup",!1),[null])},
$isN:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jE:{
"^":"aa;k:height=,l:width=",
$isf:1,
"%":"SVGSVGElement"},
jF:{
"^":"o;",
$isf:1,
"%":"SVGSymbolElement"},
cW:{
"^":"aa;",
"%":";SVGTextContentElement"},
jG:{
"^":"cW;",
$isf:1,
"%":"SVGTextPathElement"},
fD:{
"^":"cW;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jJ:{
"^":"aa;k:height=,l:width=",
$isf:1,
"%":"SVGUseElement"},
jK:{
"^":"o;",
$isf:1,
"%":"SVGViewElement"},
jU:{
"^":"o;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jW:{
"^":"o;",
$isf:1,
"%":"SVGCursorElement"},
jX:{
"^":"o;",
$isf:1,
"%":"SVGFEDropShadowElement"},
jY:{
"^":"o;",
$isf:1,
"%":"SVGGlyphRefElement"},
jZ:{
"^":"o;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
fn:{
"^":"f;",
dF:function(a,b,c){return a.bindBuffer(b,c)},
dG:function(a,b,c){return a.bindTexture(b,c)},
dI:function(a,b){return a.blendEquation(b)},
dJ:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dK:function(a,b,c,d){return a.bufferData(b,c,d)},
dN:function(a,b){return a.clear(b)},
dO:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dP:function(a,b){return a.clearDepth(b)},
dQ:function(a,b){return a.clearStencil(b)},
dS:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dX:function(a){return a.createBuffer()},
dY:function(a){return a.createProgram()},
dZ:function(a,b){return a.createShader(b)},
e_:function(a){return a.createTexture()},
e0:function(a,b){return a.depthFunc(b)},
e1:function(a,b){return a.depthMask(b)},
e8:function(a,b){return a.disableVertexAttribArray(b)},
e9:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
ec:function(a,b){return a.enable(b)},
ed:function(a,b){return a.enableVertexAttribArray(b)},
cv:function(a,b,c){return a.getAttribLocation(b,c)},
cC:function(a,b){return a.getParameter(b)},
cE:function(a,b,c){return a.getUniformLocation(b,c)},
cO:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cP:function(a,b,c,d){return a.stencilOp(b,c,d)},
eI:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.ii(g))
return}z=J.m(g)
if(!!z.$isct)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isch)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isde)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aR("Incorrect number or type of arguments"))},
eH:function(a,b,c,d,e,f,g){return this.eI(a,b,c,d,e,f,g,null,null,null)},
eJ:function(a,b,c,d){return a.texParameteri(b,c,d)},
eO:function(a,b){return a.useProgram(b)},
eP:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iN:{
"^":"a;"}}],["","",,P,{
"^":"",
aq:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dl:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
I:{
"^":"a;p:a>,q:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
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
gB:function(a){var z,y
z=J.E(this.a)
y=J.E(this.b)
return P.dl(P.aq(P.aq(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gp(b)
if(typeof z!=="number")return z.m()
x=C.b.m(z,x)
z=this.b
y=y.gq(b)
if(typeof z!=="number")return z.m()
y=new P.I(x,C.b.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aJ:function(a,b){var z,y,x,w
z=this.a
y=J.ee(b)
if(typeof z!=="number")return z.aJ()
if(typeof y!=="number")return H.G(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aJ()
if(typeof w!=="number")return H.G(w)
w=new P.I(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hO:{
"^":"a;",
gbj:function(a){return this.gN(this)+this.c},
gb4:function(a){return this.gaf(this)+this.d},
i:function(a){return"Rectangle ("+this.gN(this)+", "+this.b+") "+this.c+" x "+this.d},
t:function(a,b){var z,y
if(b==null)return!1
z=J.m(b)
if(!z.$isV)return!1
if(this.gN(this)===z.gN(b)){y=this.b
z=y===z.gaf(b)&&this.a+this.c===z.gbj(b)&&y+this.d===z.gb4(b)}else z=!1
return z},
gB:function(a){var z=this.b
return P.dl(P.aq(P.aq(P.aq(P.aq(0,this.gN(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbn:function(a){var z=new P.I(this.gN(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
V:{
"^":"hO;N:a>,af:b>,l:c>,k:d>",
$asV:null,
static:{fk:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.c(new P.V(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
j:function(a){return a},
bb:function(a){return a},
cD:{
"^":"f;",
$iscD:1,
"%":"ArrayBuffer"},
bF:{
"^":"f;",
$isbF:1,
"%":"DataView;ArrayBufferView;bD|cE|cG|bE|cF|cH|a0"},
bD:{
"^":"bF;",
gj:function(a){return a.length},
$isaX:1,
$isaV:1},
bE:{
"^":"cG;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
C:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
a[b]=c}},
cE:{
"^":"bD+by;",
$isk:1,
$ask:function(){return[P.bk]},
$isq:1},
cG:{
"^":"cE+cs;"},
a0:{
"^":"cH;",
C:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
a[b]=c},
$isk:1,
$ask:function(){return[P.p]},
$isq:1},
cF:{
"^":"bD+by;",
$isk:1,
$ask:function(){return[P.p]},
$isq:1},
cH:{
"^":"cF+cs;"},
jj:{
"^":"bE;",
$isk:1,
$ask:function(){return[P.bk]},
$isq:1,
"%":"Float32Array"},
jk:{
"^":"bE;",
$isk:1,
$ask:function(){return[P.bk]},
$isq:1,
"%":"Float64Array"},
jl:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isq:1,
"%":"Int16Array"},
jm:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isq:1,
"%":"Int32Array"},
jn:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isq:1,
"%":"Int8Array"},
jo:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isq:1,
"%":"Uint16Array"},
jp:{
"^":"a0;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isq:1,
"%":"Uint32Array"},
jq:{
"^":"a0;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isq:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jr:{
"^":"a0;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.p]},
$isq:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dH:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
ig:function(a){var z={}
a.H(0,new P.ih(z))
return z},
ii:function(a){return a},
co:function(){var z=$.cn
if(z==null){z=J.bm(window.navigator.userAgent,"Opera",0)
$.cn=z}return z},
eA:function(){var z,y
z=$.ck
if(z!=null)return z
y=$.cl
if(y==null){y=J.bm(window.navigator.userAgent,"Firefox",0)
$.cl=y}if(y===!0)z="-moz-"
else{y=$.cm
if(y==null){y=P.co()!==!0&&J.bm(window.navigator.userAgent,"Trident/",0)
$.cm=y}if(y===!0)z="-ms-"
else z=P.co()===!0?"-o-":"-webkit-"}$.ck=z
return z},
ih:{
"^":"d:18;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
k2:[function(){var z,y,x,w
z=new G.fK(700,500,P.aZ(),P.aZ())
y=new E.O(new Float64Array(H.j(16)))
y.R()
x=new F.fL(400,300,1,1,1,0,0,null,!0,"none",null,y,!1)
x.b=[]
x.ch=F.R(255,238,238,255)
y=new E.O(new Float64Array(H.j(16)))
y.R()
w=new G.fU(null,0,0,!1,0,z,!1,!1,!1,0,null,!1,!1,[y])
w.a=G.fQ(400,600)
w.seE(x)
w.ey()
w.eN()
w.x=!0
if(!w.d){w.d=!0
w.av()}x.aA(M.fh(z))},"$0","dF",0,0,1]},1],["","",,M,{
"^":"",
fg:{
"^":"cZ;e,f,a,b,c,d",
be:function(b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
if(this.f==null)return
b2.am(null,new F.X(50,50,100,100),F.ao(null))
z=new Float64Array(H.j(16))
y=new E.O(z)
y.R()
x=Math.cos(H.Y(0.39269908169872414))
w=Math.sin(H.Y(0.39269908169872414))
v=z[0]
u=z[4]
t=z[1]
s=z[5]
r=z[2]
q=z[6]
p=z[3]
o=z[7]
n=-w
z[0]=v*x+u*w
z[1]=t*x+s*w
z[2]=r*x+q*w
z[3]=p*x+o*w
z[4]=v*n+u*x
z[5]=t*n+s*x
z[6]=r*n+q*x
z[7]=p*n+o*x
o=b2.a
o.push(C.a.ga4(o).n(0,y))
b2.ag()
m=F.ao(null)
m.a=F.R(255,255,255,0)
b2.am(null,new F.X(50,50,100,100),m)
m.a=F.R(255,0,255,255)
m.b=C.l
m.c=5.5
b2.am(null,new F.X(150,150,100,100),m)
m.b=C.e
m.a=F.R(255,255,170,255)
b2.c2(null,new F.X(150,150,100,100),m)
m.b=C.l
m.c=10
m.a=F.R(255,255,255,170)
b2.c2(null,new F.X(150,150,100,100),m)
m=F.ao(null)
m.a=F.R(255,255,255,0)
y=J.aP(this.f.gJ())
n=J.aP(this.f.ga2())
p=this.f
z=J.aP(p.gJ())
q=J.aP(this.f.ga2())
v=b2.Q
if(v!=null&&!J.Z(v,p))b2.aB(0)
b2.Q=p
v=p.gJ()
if(typeof v!=="number")return H.G(v)
l=0/v
v=b2.Q.ga2()
if(typeof v!=="number")return H.G(v)
k=0/v
v=b2.Q.gJ()
if(typeof v!=="number")return H.G(v)
j=(0+y)/v
v=b2.Q.ga2()
if(typeof v!=="number")return H.G(v)
i=(0+n)/v
y=b2.z
switch(C.k){case C.k:C.a.v(y,[l,k,l,i,j,k,j,i])
break
case C.F:C.a.v(y,[l,i,j,i,l,k,j,k])
break
case C.G:C.a.v(y,[j,i,j,k,l,i,l,k])
break
case C.H:C.a.v(y,[j,k,l,k,j,i,l,i])
break
case C.I:C.a.v(y,[j,k,j,i,l,k,l,i])
break
case C.J:C.a.v(y,[l,k,j,k,l,i,j,i])
break
case C.K:C.a.v(y,[l,i,l,k,j,i,j,k])
break
case C.L:C.a.v(y,[j,i,l,i,j,k,l,k])
break
default:C.a.v(y,[l,k,l,i,j,k,j,i])}h=b2.aa()
g=250+z/2
f=25+q/2
z=new E.n(new Float64Array(H.j(3)))
z.u(250,25,0)
e=h.n(0,z)
z=new E.n(new Float64Array(H.j(3)))
z.u(250,f,0)
d=h.n(0,z)
z=new E.n(new Float64Array(H.j(3)))
z.u(g,25,0)
c=h.n(0,z)
z=new E.n(new Float64Array(H.j(3)))
z.u(g,f,0)
b=h.n(0,z)
z=b2.x
a=z.length/8|0
y=m.a.a
a0=(y>>>16&255)/255
a1=(y>>>8&255)/255
a2=(y>>>0&255)/255
a3=(y>>>24&255)/255
C.a.v(z,[e.gp(e),e.gq(e),b2.ch,a0,a1,a2,a3,1,d.gp(d),d.gq(d),b2.ch,a0,a1,a2,a3,1,c.gp(c),c.gq(c),b2.ch,a0,a1,a2,a3,1,b.gp(b),b.gq(b),b2.ch,a0,a1,a2,a3,1])
b2.ch+=0.0001
z=a+1
y=a+2
C.a.v(b2.y,[a,z,y,z,a+3,y])
m=F.ao(null)
m.a=F.R(255,255,255,0)
m.c=5
h=b2.aa()
H.Y(-300)
H.Y(2)
y=Math.pow(-300,2)
H.Y(0)
H.Y(2)
a4=Math.sqrt(H.Y(y+Math.pow(0,2)))
y=m.c
z=a4*2
a5=-1*y*300/z
a6=y*0/z
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
z=m.a.a
b2.a_(null,a7,a8,a9,b0,(z>>>16&255)/255,(z>>>8&255)/255,(z>>>0&255)/255,(z>>>24&255)/255)
if(0>=o.length)return H.h(o,0)
o.pop()
b2.ag()},
cZ:function(a){this.e.aC("assets/test.jpg").eK(new M.fi(this))},
static:{fh:function(a){var z=new E.O(new Float64Array(H.j(16)))
z.R()
z=new M.fg(a,null,"none",null,z,!1)
z.b=[]
z.cZ(a)
return z}}},
fi:{
"^":"d:19;a",
$1:function(a){this.a.f=a}}}],["","",,F,{
"^":"",
cy:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.aj)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.b1(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
a4:{
"^":"a;a",
i:function(a){return C.A.h(0,this.a)}},
fI:{
"^":"a;"},
cZ:{
"^":"a;",
aA:function(a){var z=0,y=new P.ay(),x=1,w,v=this,u,t,s,r
function $async$aA(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.c(new s.C(0,r.l,null),[null])
t=u
t.aO(null)
z=2
return H.u(u,$async$aA,y)
case 2:t=v
t=t.b
t.push(a)
return H.u(null,0,y,null)
case 1:return H.u(w,1,y)}}return H.u(null,$async$aA,y,null)},
c5:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.aj)(z),++x)z[x].c5(a)},
ci:function(a,b){},
cq:function(a,b){var z,y,x
this.b9()
this.ci(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.aj)(z),++x)z[x].cq(a,b)},
be:function(a,b){},
bf:["cT",function(a,b){var z,y,x,w,v,u
this.b9()
this.be(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.aj)(z),++w){v=z[w]
u=v.c
x.push(C.a.ga4(x).n(0,u))
b.ag()
v.bf(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.ag()}}],
eM:["cU",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b9()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.ck(v.c)
u=v.eM(a,b,c,d,e)
a.cj()
if(u)return!0}t=a.cB().b7(0)
t.er()
y=new E.n(new Float64Array(H.j(3)))
y.u(d,e,0)
s=t.n(0,y)
s.gp(s)
s.gq(s)
return!1}],
b9:function(){if(!this.d)this.d=!0}},
fJ:{
"^":"a;",
aC:function(a){var z=0,y=new P.ay(),x,w=2,v,u=this,t,s,r,q
function $async$aC(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.ak(a)?3:4
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
return H.u(q.aD(a),$async$aC,y)
case 5:s.C(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.u(x,0,y,null)
case 2:return H.u(v,1,y)}}return H.u(null,$async$aC,y,null)}},
X:{
"^":"a;a,b,J:c<,a2:d<",
t:function(a,b){if(b==null)return!1
return b instanceof F.X&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gB:function(a){return F.cy([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+this.a+", y:"+this.b+", w:"+H.b(this.c)+", h:"+H.b(this.d)}},
d_:{
"^":"a;a",
i:function(a){return C.B.h(0,this.a)}},
fM:{
"^":"a;a,b,c",
d1:function(a){if(this.a==null)this.a=F.R(255,255,255,255)},
static:{ao:function(a){var z=new F.fM(a,C.e,1)
z.d1(a)
return z}}},
cY:{
"^":"a;a",
t:function(a,b){if(b==null)return!1
return b instanceof F.cY&&b.a===this.a},
gB:function(a){return F.cy([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
d0:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{R:function(a,b,c,d){var z=new F.cY(0)
z.d0(a,b,c,d)
return z}}},
bJ:{
"^":"a;"},
fL:{
"^":"cZ;J:e<,a2:f<,r,x,y,z,Q,ch,cx,a,b,c,d",
ci:function(a,b){var z,y,x,w
z=this.e
y=(a.gJ()-a.gez(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.O(new Float64Array(H.j(16)))
y.R()
this.c=y
y.cr(0,this.z,this.Q,0)
y=this.c
z=this.y
y.br(0,z,z,1)},
bf:function(a,b){var z,y
z=new F.X(0,0,this.e,this.f)
y=this.cx
if(y){b.b.push(z)
b.b6(a,z)}this.cT(a,b)
if(y){y=b.b
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.b6(a,C.a.ga4(y))
else{y=a.a
b.b6(a,new F.X(0,0,y.c,y.d))}}},
be:function(a,b){var z=F.ao(null)
z.a=this.ch
b.am(a,new F.X(0,0,this.e,this.f),z)}},
b6:{
"^":"a;a",
i:function(a){return C.C.h(0,this.a)}},
fN:{
"^":"a;",
seE:function(a){this.c$=a},
eu:function(a){if(!this.e$){this.c$.c5(this)
this.e$=!0}this.c$.cq(this,a)
this.ex()},
ev:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.a.ga4(y).n(0,z))
b.ag()
this.c$.bf(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
b.ag()},
Y:function(a,b,c,d,e){a.ck(this.c$.c)
this.c$.cU(a,b,c,d,e)
a.cj()},
ck:function(a){var z=this.f$
z.push(C.a.ga4(z).n(0,a))},
cj:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cB:function(){return C.a.ga4(this.f$)}}}],["","",,G,{
"^":"",
bK:function(a){var z=0,y=new P.ay(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bK(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.c(new p.dg(o.c(new n.C(0,m.l,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.ek(t,a)
q=J
s=q.i(t)
q=s
r=q.gbd(t)
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
m=m.y(new l.fS(u,t))
l=r
p=new p.x(0,o,n,m,l.c)
o=H
q=q.c(p,[o.t(r,0)])
q.E()
q=s
s=q.gbc(t)
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
m=m.y(new l.fT(a,u))
l=s
p=new p.x(0,o,n,m,l.c)
o=H
q=q.c(p,[o.t(s,0)])
q.E()
q=u
x=q.a
z=1
break
case 1:return H.u(x,0,y,null)
case 2:return H.u(v,1,y)}}return H.u(null,$async$bK,y,null)},
d0:function(a,b,c){var z,y
z=J.dZ(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
fR:{
"^":"bJ;a,b",
gJ:function(){return J.ed(this.a)},
ga2:function(){return J.e4(this.a)},
cD:function(a){var z
if(this.b==null){z=J.i(a).e_(a)
this.b=z
a.bindTexture(3553,z)
C.E.eH(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
fP:{
"^":"a;a,b,c,k:d>",
d2:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.ad(b)
y=C.d.ad(a)
x=document.createElement("canvas",null)
J.el(x,z)
J.ej(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.eg(this.b,!0)},
static:{fQ:function(a,b){var z=new G.fP(null,null,null,null)
z.d2(a,b)
return z}}},
fK:{
"^":"fJ;l:c>,k:d>,a,b",
aD:function(a){var z=0,y=new P.ay(),x,w=2,v,u,t
function $async$aD(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.u(t.bK(a),$async$aD,y)
case 3:x=new u.fR(c,null)
z=1
break
case 1:return H.u(x,0,y,null)
case 2:return H.u(v,1,y)}}return H.u(null,$async$aD,y,null)}},
fO:{
"^":"fI;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
em:function(){var z,y,x,w,v,u
P.aL("#[A]# "+H.b(J.ca(this.d,35660)))
P.aL("#[B]# "+H.b(J.ca(this.d,33901)))
z=C.a.c6(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.c6(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.d0(x,35633,z)
v=G.d0(x,35632,y)
u=J.dY(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
U:function(a){this.r=1
this.ch=-0.5
J.c8(this.d,2960)
J.e_(this.d,515)
J.dU(this.d,0,0,0,1)
J.dV(this.d,1)
J.dW(this.d,0)
J.c8(this.d,3042)
switch(-1){case-1:J.dQ(this.d,32774)
J.dR(this.d,770,771,770,32772)
break}J.dT(this.d,17664)
C.a.sj(this.x,0)
C.a.sj(this.y,0)
C.a.sj(this.z,0)
this.Q=null},
aB:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.x
if(z.length!==0){y=this.y
F.R(170,255,170,170)
J.ce(this.d,this.f)
x=J.aN(this.d,this.f,"a_tex")
w=J.bn(this.d)
J.bl(this.d,34962,w)
v=this.z
J.dS(this.d,34962,new Float32Array(H.bb(v)),35044)
J.aM(this.d,x)
J.aQ(this.d,x,2,5126,!1,0,0)
u=this.Q
if(u!=null){t=u.cD(this.d)
J.c5(this.d,3553,t)
J.aO(this.d,3553,10242,33071)
J.aO(this.d,3553,10243,33071)
J.aO(this.d,3553,10241,9728)
J.aO(this.d,3553,10240,9728)}u=this.d
s=J.bn(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.bb(z)),35044)
u.bindBuffer(34962,null)
J.bl(this.d,34962,s)
u=this.d
s=J.bn(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.bb(y)),35044)
u.bindBuffer(34963,null)
J.bl(this.d,34963,s)
u=this.d
u.uniformMatrix4fv(J.eh(u,this.f,"u_mat"),!1,new Float32Array(H.bb(this.cx.a)))
r=J.aN(this.d,this.f,"color")
q=J.aN(this.d,this.f,"vp")
p=J.aN(this.d,this.f,"useTex")
J.aQ(this.d,q,3,5126,!1,32,0)
J.aQ(this.d,r,4,5126,!1,32,12)
J.aQ(this.d,p,1,5126,!1,32,28)
J.aM(this.d,q)
J.aM(this.d,r)
J.aM(this.d,p)
J.e1(this.d,4,y.length,5123,0)
if(x!==0){J.e0(this.d,x)
J.c5(this.d,3553,null)}J.ce(this.d,null)
C.a.sj(z,0)
C.a.sj(y,0)
C.a.sj(v,0)
this.Q=null}},
c2:function(a,b,c){if(c.b===C.e)this.ea(a,b,c)
else this.eb(a,b,c)},
ea:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.c/2
y=b.a+z
x=b.d/2
w=b.b+x
v=this.aa()
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
C.a.v(o,[u.gp(u),u.gq(u),this.ch])
C.a.v(o,[s,r,q,p])
C.a.v(o,[-1])
C.a.v(n,[0,0])
j=6.283185307179586*(l/t)
u.sp(0,y+Math.cos(j)*z)
u.sq(0,w+Math.sin(j)*x)
u.sP(0,this.ch)
u=v.n(0,u)
C.a.v(o,[u.gp(u),u.gq(u),this.ch])
C.a.v(o,[s,r,q,p])
C.a.v(o,[-1])
C.a.v(n,[0,0]);++l
j=6.283185307179586*(l/t)
u.sp(0,y+Math.cos(j)*z)
u.sq(0,w+Math.sin(j)*x)
u.sP(0,this.ch)
u=v.n(0,u)
C.a.v(o,[u.gp(u),u.gq(u),this.ch])
C.a.v(o,[s,r,q,p])
C.a.v(o,[-1])
C.a.v(n,[0,0])
C.a.v(m,[k,k+1,k+2])
this.ch+=0.0001}},
eb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b.c
y=b.a+z/2
x=b.d
w=b.b+x/2
v=c.c
u=(z+v)/2
t=(x+v)/2
s=(z-v)/2
r=(x-v)/2
q=this.aa()
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
this.a_(a,p,o,m,n,l,k,j,i)
this.ch+=0.0001}},
am:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=b.c
y=b.d
if(c.b===C.e){x=this.aa()
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
this.a_(a,s,r,q,p,(z>>>16&255)/255,(z>>>8&255)/255,(z>>>0&255)/255,(z>>>24&255)/255)}else{x=this.aa()
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
this.a_(a,l,k,s,r,h,g,f,e)
this.a_(a,k,i,r,p,h,g,f,e)
this.a_(a,i,j,p,q,h,g,f,e)
this.a_(a,j,l,q,s,h,g,f,e)}},
a_:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.x
y=z.length/8|0
C.a.v(z,[b.gp(b),b.gq(b),this.ch,f,g,h,i,-1,c.gp(c),c.gq(c),this.ch,f,g,h,i,-1,d.gp(d),d.gq(d),this.ch,f,g,h,i,-1,e.gp(e),e.gq(e),this.ch,f,g,h,i,-1])
C.a.v(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.a.v(this.y,[y,z,x,z,y+3,x])},
b6:function(a,b){var z
this.aB(0)
J.c6(this.d,!1,!1,!1,!1)
J.c7(this.d,!1)
J.cc(this.d,7680,7681,7681)
J.cb(this.d,519,this.r,255)
z=F.ao(null)
z.a=F.R(255,255,255,255)
this.am(null,b,z)
this.aB(0)
J.c6(this.d,!0,!0,!0,!0)
J.c7(this.d,!0)
J.cc(this.d,7680,7680,7680)
J.cb(this.d,515,this.r,255);++this.r},
ag:function(){},
aa:function(){var z,y
this.cy.R()
z=this.cy.cr(0,-1,1,0)
this.cy=z
y=this.e
y=z.br(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.n(0,C.a.ga4(this.a))
this.cy=y
return y}},
fU:{
"^":"fe;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gJ:function(){return this.a.c},
ga2:function(){return this.a.d},
gez:function(a){return 0},
ex:function(){this.r=!0},
av:function(){var z=0,y=new P.ay(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
function $async$av(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cK(new h.cj(Date.now(),!1))
i=v
t=i.a
i=E
i=i
h=Float64Array
g=H
s=new i.O(new h(g.j(16)))
i=s
i.R()
i=E
i=i
h=Float64Array
g=H
r=new i.O(new h(g.j(16)))
i=r
i.R()
i=E
i=i
h=Float64Array
g=H
q=new i.O(new h(g.j(16)))
i=q
i.R()
i=G
p=new i.fO(10,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.em()
i=p
i.U(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return H.u(i.eI(new h.aA(15e3),null,null),$async$av,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.eu(h.ad(u+k))
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
i.ev(v,p)
i=p
i.aB(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.cX(o,m)
i=H
i.dH(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return H.u(null,0,y,null)
case 1:return H.u(w,1,y)}}return H.u(null,$async$av,y,null)},
eN:function(){var z,y,x,w
z=P.aZ()
y=new G.h2(this,z)
x=new G.h1(this,z)
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchcancel",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(x),w.c),[H.t(w,0)]).E()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchend",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(x),w.c),[H.t(w,0)]).E()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchenter",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(y),w.c),[H.t(w,0)]).E()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchleave",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(y),w.c),[H.t(w,0)]).E()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchmove",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(y),w.c),[H.t(w,0)]).E()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchstart",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(y),w.c),[H.t(w,0)]).E()},
ey:function(){var z,y
z={}
z.a=!1
y=J.e5(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fV(z,this)),y.c),[H.t(y,0)]).E()
y=J.eb(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fW(z,this)),y.c),[H.t(y,0)]).E()
y=J.e6(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fX(z,this)),y.c),[H.t(y,0)]).E()
y=J.e7(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fY(z,this)),y.c),[H.t(y,0)]).E()
y=J.e8(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fZ(z,this)),y.c),[H.t(y,0)]).E()
y=J.e9(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.h_(z,this)),y.c),[H.t(y,0)]).E()
y=J.ea(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.h0(z,this)),y.c),[H.t(y,0)]).E()}},
fe:{
"^":"a+fN;"},
h2:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c9(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.aj)(y),++v){u=y[v]
t=C.b.F(u.pageX)
s=C.b.F(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
r=t-C.b.F(z.a.b.offsetLeft)
t=C.b.F(u.pageX)
s=C.b.F(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
q=s-C.b.F(z.a.b.offsetTop)
t=w.ak(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.m()
z.Y(z,s+1,C.p,r,q)}else{w.C(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.m()
z.Y(z,t+1,C.o,r,q)}}}},
h1:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c9(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.aj)(y),++v){u=y[v]
if(w.ak(u.identifier)){t=C.b.F(u.pageX)
s=C.b.F(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
s=C.b.F(z.a.b.offsetLeft)
r=C.b.F(u.pageX)
q=C.b.F(u.pageY)
new P.I(r,q).$builtinTypeInfo=[null]
r=C.b.F(z.a.b.offsetTop)
w.ac(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.m()
z.Y(z,p+1,C.n,t-s,q-r)}}}},
fV:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gI(a)
x=x.gp(x)
x.toString
y=y.gI(a)
y=y.gq(y)
y.toString
z.Y(z,0,C.o,x,y)}}},
fW:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gp(w)
w.toString
x=x.gI(a)
x=x.gq(x)
x.toString
z.Y(z,0,C.n,w,x)
y.a=!1}}}},
fX:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fY:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gp(w)
w.toString
x=x.gI(a)
x=x.gq(x)
x.toString
z.Y(z,0,C.m,w,x)
y.a=!1}}}},
fZ:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gI(a)
x=x.gp(x)
x.toString
y=y.gI(a)
y=y.gq(y)
y.toString
z.Y(z,0,C.p,x,y)}}},
h_:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gI(a)
w=w.gp(w)
w.toString
x=x.gI(a)
x=x.gq(x)
x.toString
z.Y(z,0,C.m,w,x)
y.a=!1}}}},
h0:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fS:{
"^":"d:2;a,b",
$1:function(a){this.a.b8(0,this.b)}},
fT:{
"^":"d:2;a,b",
$1:function(a){this.b.dT("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
O:{
"^":"a;a",
ah:function(a){var z,y
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
i:function(a){return"[0] "+this.au(0).i(0)+"\n[1] "+this.au(1).i(0)+"\n[2] "+this.au(2).i(0)+"\n[3] "+this.au(3).i(0)+"\n"},
ge7:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
C:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
au:function(a){var z,y,x
z=new Float64Array(H.j(4))
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
return new E.a5(z)},
b7:function(a){var z=new E.O(new Float64Array(H.j(16)))
z.ah(this)
return z},
n:function(a,b){var z,y,x
if(!!b.$isa5){z=new Float64Array(H.j(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a5(z)}if(!!b.$isn){z=new Float64Array(H.j(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.n(z)}if(4===b.ge7()){z=new Float64Array(H.j(16))
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
return new E.O(z)}throw H.e(P.aR(b))},
m:function(a,b){var z,y
z=new Float64Array(H.j(16))
y=this.a
z[0]=C.b.m(y[0],b.gw().h(0,0))
z[1]=C.b.m(y[1],b.gw().h(0,1))
z[2]=C.b.m(y[2],b.gw().h(0,2))
z[3]=C.b.m(y[3],b.gw().h(0,3))
z[4]=C.b.m(y[4],b.gw().h(0,4))
z[5]=C.b.m(y[5],b.gw().h(0,5))
z[6]=C.b.m(y[6],b.gw().h(0,6))
z[7]=C.b.m(y[7],b.gw().h(0,7))
z[8]=C.b.m(y[8],b.gw().h(0,8))
z[9]=C.b.m(y[9],b.gw().h(0,9))
z[10]=C.b.m(y[10],b.gw().h(0,10))
z[11]=C.b.m(y[11],b.gw().h(0,11))
z[12]=C.b.m(y[12],b.gw().h(0,12))
z[13]=C.b.m(y[13],b.gw().h(0,13))
z[14]=C.b.m(y[14],b.gw().h(0,14))
z[15]=C.b.m(y[15],b.gw().h(0,15))
return new E.O(z)},
cr:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.m(b)
y=!!z.$isa5
x=y?b.gJ():1
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
br:function(a,b,c,d){var z,y,x,w,v,u
z=J.m(b)
y=!!z.$isa5
x=y?b.gJ():1
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
er:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
"^":"a;a",
u:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ah:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
m:function(a,b){var z,y,x,w
z=this.a
y=C.b.m(z[0],b.gw().h(0,0))
x=C.b.m(z[1],b.gw().h(0,1))
z=C.b.m(z[2],b.gw().h(0,2))
w=new E.n(new Float64Array(H.j(3)))
w.u(y,x,z)
return w},
n:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.G(b)
x=z[1]
z=z[2]
w=new E.n(new Float64Array(H.j(3)))
w.u(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
C:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.Y(y*y+x*x+z*z))},
b7:function(a){var z=new E.n(new Float64Array(H.j(3)))
z.ah(this)
return z},
sp:function(a,b){this.a[0]=b
return b},
sq:function(a,b){this.a[1]=b
return b},
sP:function(a,b){this.a[2]=b
return b},
gp:function(a){return this.a[0]},
gq:function(a){return this.a[1]}},
a5:{
"^":"a;a",
bt:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ah:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
m:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.m(z[0],b.gw().h(0,0))
x=C.b.m(z[1],b.gw().h(0,1))
w=C.b.m(z[2],b.gw().h(0,2))
z=C.b.m(z[3],b.gw().h(0,3))
v=new E.a5(new Float64Array(H.j(4)))
v.bt(y,x,w,z)
return v},
n:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.G(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a5(new Float64Array(H.j(4)))
v.bt(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
C:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.Y(y*y+x*x+w*w+z*z))},
b7:function(a){var z=new E.a5(new Float64Array(H.j(4)))
z.ah(this)
return z},
sp:function(a,b){this.a[0]=b
return b},
sq:function(a,b){this.a[1]=b
return b},
sP:function(a,b){this.a[2]=b
return b},
gp:function(a){return this.a[0]},
gq:function(a){return this.a[1]},
gJ:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cw.prototype
return J.f1.prototype}if(typeof a=="string")return J.aW.prototype
if(a==null)return J.f2.prototype
if(typeof a=="boolean")return J.f0.prototype
if(a.constructor==Array)return J.aC.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bf(a)}
J.P=function(a){if(typeof a=="string")return J.aW.prototype
if(a==null)return a
if(a.constructor==Array)return J.aC.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bf(a)}
J.aJ=function(a){if(a==null)return a
if(a.constructor==Array)return J.aC.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bf(a)}
J.bY=function(a){if(typeof a=="number")return J.aD.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bN.prototype
return a}
J.ij=function(a){if(typeof a=="number")return J.aD.prototype
if(typeof a=="string")return J.aW.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bN.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bf(a)}
J.av=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ij(a).m(a,b)}
J.Z=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).t(a,b)}
J.dN=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bY(a).aH(a,b)}
J.c4=function(a,b){if(a.constructor==Array||typeof a=="string"||H.iy(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.P(a).h(a,b)}
J.dO=function(a,b,c,d){return J.i(a).d6(a,b,c,d)}
J.dP=function(a,b,c,d){return J.i(a).dz(a,b,c,d)}
J.bl=function(a,b,c){return J.i(a).dF(a,b,c)}
J.c5=function(a,b,c){return J.i(a).dG(a,b,c)}
J.dQ=function(a,b){return J.i(a).dI(a,b)}
J.dR=function(a,b,c,d,e){return J.i(a).dJ(a,b,c,d,e)}
J.dS=function(a,b,c,d){return J.i(a).dK(a,b,c,d)}
J.dT=function(a,b){return J.aJ(a).dN(a,b)}
J.dU=function(a,b,c,d,e){return J.i(a).dO(a,b,c,d,e)}
J.dV=function(a,b){return J.i(a).dP(a,b)}
J.dW=function(a,b){return J.i(a).dQ(a,b)}
J.c6=function(a,b,c,d,e){return J.i(a).dS(a,b,c,d,e)}
J.dX=function(a,b){return J.i(a).b8(a,b)}
J.bm=function(a,b,c){return J.P(a).dV(a,b,c)}
J.bn=function(a){return J.i(a).dX(a)}
J.dY=function(a){return J.i(a).dY(a)}
J.dZ=function(a,b){return J.i(a).dZ(a,b)}
J.e_=function(a,b){return J.i(a).e0(a,b)}
J.c7=function(a,b){return J.i(a).e1(a,b)}
J.e0=function(a,b){return J.i(a).e8(a,b)}
J.e1=function(a,b,c,d,e){return J.i(a).e9(a,b,c,d,e)}
J.e2=function(a,b){return J.aJ(a).X(a,b)}
J.c8=function(a,b){return J.i(a).ec(a,b)}
J.aM=function(a,b){return J.i(a).ed(a,b)}
J.e3=function(a,b){return J.aJ(a).H(a,b)}
J.c9=function(a){return J.i(a).gdM(a)}
J.T=function(a){return J.i(a).gan(a)}
J.E=function(a){return J.m(a).gB(a)}
J.e4=function(a){return J.i(a).gk(a)}
J.bo=function(a){return J.aJ(a).gG(a)}
J.aw=function(a){return J.P(a).gj(a)}
J.e5=function(a){return J.i(a).gca(a)}
J.e6=function(a){return J.i(a).gcb(a)}
J.e7=function(a){return J.i(a).gcc(a)}
J.e8=function(a){return J.i(a).gcd(a)}
J.e9=function(a){return J.i(a).gce(a)}
J.ea=function(a){return J.i(a).gcf(a)}
J.eb=function(a){return J.i(a).gcg(a)}
J.ec=function(a){return J.i(a).gbn(a)}
J.ed=function(a){return J.i(a).gl(a)}
J.ee=function(a){return J.i(a).gp(a)}
J.aN=function(a,b,c){return J.i(a).cv(a,b,c)}
J.ef=function(a){return J.i(a).cw(a)}
J.eg=function(a,b){return J.i(a).cz(a,b)}
J.ca=function(a,b){return J.i(a).cC(a,b)}
J.eh=function(a,b,c){return J.i(a).cE(a,b,c)}
J.ei=function(a,b){return J.aJ(a).ab(a,b)}
J.ej=function(a,b){return J.i(a).sk(a,b)}
J.ek=function(a,b){return J.i(a).sV(a,b)}
J.el=function(a,b){return J.i(a).sl(a,b)}
J.cb=function(a,b,c,d){return J.i(a).cO(a,b,c,d)}
J.cc=function(a,b,c,d){return J.i(a).cP(a,b,c,d)}
J.aO=function(a,b,c,d){return J.i(a).eJ(a,b,c,d)}
J.aP=function(a){return J.bY(a).eL(a)}
J.cd=function(a){return J.bY(a).ad(a)}
J.ax=function(a){return J.m(a).i(a)}
J.ce=function(a,b){return J.i(a).eO(a,b)}
J.aQ=function(a,b,c,d,e,f,g){return J.i(a).eP(a,b,c,d,e,f,g)}
var $=I.p
C.a=J.aC.prototype
C.d=J.cw.prototype
C.b=J.aD.prototype
C.f=J.aW.prototype
C.D=J.ff.prototype
C.E=P.fn.prototype
C.M=J.bN.prototype
C.q=new H.cp()
C.r=new P.hh()
C.c=new P.hP()
C.h=new P.aA(0)
C.t=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.u=function(hooks) {
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

C.v=function(getTagFallback) {
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
C.w=function() {
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
C.x=function(hooks) {
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
C.y=function(hooks) {
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
C.z=function(_, letter) { return letter.toUpperCase(); }
C.A=new H.bu([0,"TinyCanvasTransform.NONE",1,"TinyCanvasTransform.ROT90",2,"TinyCanvasTransform.ROT180",3,"TinyCanvasTransform.ROT270",4,"TinyCanvasTransform.MIRROR",5,"TinyCanvasTransform.MIRROR_ROT90",6,"TinyCanvasTransform.MIRROR_ROT180",7,"TinyCanvasTransform.MIRROR_ROT270"])
C.B=new H.bu([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.C=new H.bu([0,"TinyStagePointerType.CANCEL",1,"TinyStagePointerType.UP",2,"TinyStagePointerType.DOWN",3,"TinyStagePointerType.MOVE"])
C.k=new F.a4(0)
C.F=new F.a4(1)
C.G=new F.a4(2)
C.H=new F.a4(3)
C.I=new F.a4(4)
C.J=new F.a4(5)
C.K=new F.a4(6)
C.L=new F.a4(7)
C.e=new F.d_(0)
C.l=new F.d_(1)
C.m=new F.b6(0)
C.n=new F.b6(1)
C.o=new F.b6(2)
C.p=new F.b6(3)
$.cL="$cachedFunction"
$.cM="$cachedInvocation"
$.Q=0
$.ak=null
$.cf=null
$.c_=null
$.dw=null
$.dI=null
$.bd=null
$.bg=null
$.c0=null
$.ae=null
$.ar=null
$.as=null
$.bU=!1
$.l=C.c
$.cr=0
$.cn=null
$.cm=null
$.cl=null
$.ck=null
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
I.$lazy(y,x,w)}})(["cu","$get$cu",function(){return H.eW()},"cv","$get$cv",function(){return new P.eF(null)},"d1","$get$d1",function(){return H.S(H.b7({toString:function(){return"$receiver$"}}))},"d2","$get$d2",function(){return H.S(H.b7({$method$:null,toString:function(){return"$receiver$"}}))},"d3","$get$d3",function(){return H.S(H.b7(null))},"d4","$get$d4",function(){return H.S(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d8","$get$d8",function(){return H.S(H.b7(void 0))},"d9","$get$d9",function(){return H.S(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d6","$get$d6",function(){return H.S(H.d7(null))},"d5","$get$d5",function(){return H.S(function(){try{null.$method$}catch(z){return z.message}}())},"db","$get$db",function(){return H.S(H.d7(void 0))},"da","$get$da",function(){return H.S(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bP","$get$bP",function(){return P.h5()},"at","$get$at",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bC]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.a2]},{func:1,args:[,],opt:[,]},{func:1,ret:P.W,args:[P.p]},{func:1,args:[W.bM]},{func:1,args:[,P.W]},{func:1,args:[P.W]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.a2]},{func:1,ret:P.bW},{func:1,void:true,args:[P.a],opt:[P.a2]},{func:1,void:true,args:[,P.a2]},{func:1,args:[,,]},{func:1,args:[P.cU,,]},{func:1,args:[P.W,,]},{func:1,args:[F.bJ]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iF(d||a)
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
Isolate.be=a.be
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dK(F.dF(),b)},[])
else (function(b){H.dK(F.dF(),b)})([])})})()