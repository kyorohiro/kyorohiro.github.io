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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bV"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bV"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bV(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bc=function(){}
var dart=[["","",,H,{
"^":"",
jf:{
"^":"a;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bg:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bd:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bY==null){H.ip()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.d9("Return interceptor for "+H.b(y(a,z))))}w=H.iy(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.J
else return C.L}return w},
f:{
"^":"a;",
n:function(a,b){return a===b},
gu:function(a){return H.a_(a)},
i:["cR",function(a){return H.b_(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
eZ:{
"^":"f;",
i:function(a){return String(a)},
gu:function(a){return a?519018:218159},
$isbU:1},
f0:{
"^":"f;",
n:function(a,b){return null==b},
i:function(a){return"null"},
gu:function(a){return 0}},
cu:{
"^":"f;",
gu:function(a){return 0},
$isf1:1},
fd:{
"^":"cu;"},
bL:{
"^":"cu;",
i:function(a){return String(a)}},
az:{
"^":"f;",
c_:function(a,b){if(!!a.immutable$list)throw H.e(new P.N(b))},
bZ:function(a,b){if(!!a.fixed$length)throw H.e(new P.N(b))},
G:function(a,b){var z,y
this.bZ(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.ah)(b),++y)a.push(b[y])},
I:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.I(a))}},
a9:function(a,b){return H.c(new H.bz(a,b),[null,null])},
c5:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
Y:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
geb:function(a){if(a.length>0)return a[0]
throw H.e(H.bu())},
ga8:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bu())},
br:function(a,b,c,d,e){var z,y,x
this.c_(a,"set range")
P.cM(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.C(P.ak(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.eX())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aQ(a,"[","]")},
gH:function(a){return new J.el(a,a.length,0,null)},
gu:function(a){return H.a_(a)},
gj:function(a){return a.length},
sj:function(a,b){this.bZ(a,"set length")
if(b<0)throw H.e(P.ak(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.y(a,b))
if(b>=a.length||b<0)throw H.e(H.y(a,b))
return a[b]},
B:function(a,b,c){this.c_(a,"indexed set")
if(b>=a.length||b<0)throw H.e(H.y(a,b))
a[b]=c},
$isaR:1,
$isj:1,
$asj:null,
$isq:1},
je:{
"^":"az;"},
el:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.I(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aA:{
"^":"f;",
bh:function(a,b){return a%b},
ab:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.N(""+a))},
F:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.N(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gu:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.e(H.af(b))
return a+b},
cW:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.ab(a/b)},
ah:function(a,b){return(a|0)===a?a/b|0:this.ab(a/b)},
b_:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aF:function(a,b){if(typeof b!=="number")throw H.e(H.af(b))
return a<b},
$isaH:1},
ct:{
"^":"aA;",
$isaH:1,
$isp:1},
f_:{
"^":"aA;",
$isaH:1},
aS:{
"^":"f;",
dQ:function(a,b){if(b>=a.length)throw H.e(H.y(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.e(P.ek(b,null,null))
return a+b},
cQ:function(a,b,c){H.dv(b)
if(c==null)c=a.length
H.dv(c)
if(b<0)throw H.e(P.b0(b,null,null))
if(typeof c!=="number")return H.o(c)
if(b>c)throw H.e(P.b0(b,null,null))
if(c>a.length)throw H.e(P.b0(c,null,null))
return a.substring(b,c)},
cP:function(a,b){return this.cQ(a,b,null)},
dU:function(a,b,c){if(c>a.length)throw H.e(P.ak(c,0,a.length,null,null))
return H.iD(a,b,c)},
gN:function(a){return a.length===0},
i:function(a){return a},
gu:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.y(a,b))
if(b>=a.length||b<0)throw H.e(H.y(a,b))
return a[b]},
$isaR:1,
$isW:1}}],["","",,H,{
"^":"",
aD:function(a,b){var z=a.al(b)
if(!init.globalState.d.cy)init.globalState.f.ap()
return z},
bf:function(){--init.globalState.f.b},
dI:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.e(P.aN("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hH(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cr()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hi(P.bx(null,H.aC),0)
y.z=P.aU(null,null,null,P.p,H.bQ)
y.ch=P.aU(null,null,null,P.p,null)
if(y.x===!0){x=new H.hG()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eQ,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hI)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aU(null,null,null,P.p,H.b1)
w=P.aj(null,null,null,P.p)
v=new H.b1(0,null,!1)
u=new H.bQ(y,x,w,init.createNewIsolate(),v,new H.a7(H.bh()),new H.a7(H.bh()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
w.a7(0,0)
u.bu(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aF()
x=H.ag(y,[y]).a0(a)
if(x)u.al(new H.iB(z,a))
else{y=H.ag(y,[y,y]).a0(a)
if(y)u.al(new H.iC(z,a))
else u.al(a)}init.globalState.f.ap()},
eU:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eV()
return},
eV:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.N("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.N("Cannot extract URI from \""+H.b(z)+"\""))},
eQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b6(!0,[]).a1(b.data)
y=J.P(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b6(!0,[]).a1(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b6(!0,[]).a1(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aU(null,null,null,P.p,H.b1)
p=P.aj(null,null,null,P.p)
o=new H.b1(0,null,!1)
n=new H.bQ(y,q,p,init.createNewIsolate(),o,new H.a7(H.bh()),new H.a7(H.bh()),!1,!1,[],P.aj(null,null,null,null),null,null,!1,!0,P.aj(null,null,null,null))
p.a7(0,0)
n.bu(0,o)
init.globalState.f.a.W(new H.aC(n,new H.eR(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ap()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").a_(y.h(z,"msg"))
init.globalState.f.ap()
break
case"close":init.globalState.ch.aa(0,$.$get$cs().h(0,a))
a.terminate()
init.globalState.f.ap()
break
case"log":H.eP(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aa(["command","print","msg",z])
q=new H.ab(!0,P.a9(null,P.p)).L(q)
y.toString
self.postMessage(q)}else P.aI(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
eP:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aa(["command","log","msg",a])
x=new H.ab(!0,P.a9(null,P.p)).L(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.F(w)
z=H.B(w)
throw H.e(P.aP(z))}},
eS:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cI=$.cI+("_"+y)
$.cJ=$.cJ+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.a_(["spawned",new H.b8(y,x),w,z.r])
x=new H.eT(a,b,c,d,z)
if(e===!0){z.bX(w,w)
init.globalState.f.a.W(new H.aC(z,x,"start isolate"))}else x.$0()},
i0:function(a){return new H.b6(!0,[]).a1(new H.ab(!1,P.a9(null,P.p)).L(a))},
iB:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iC:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hH:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hI:function(a){var z=P.aa(["command","print","msg",a])
return new H.ab(!0,P.a9(null,P.p)).L(z)}}},
bQ:{
"^":"a;a,b,c,ep:d<,dV:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bX:function(a,b){if(!this.f.n(0,a))return
if(this.Q.a7(0,b)&&!this.y)this.y=!0
this.b0()},
ez:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.aa(0,a)
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
if(w===y.c)y.bE();++y.d}this.y=!1}this.b0()},
dD:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ey:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.C(new P.N("removeRange"))
P.cM(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cL:function(a,b){if(!this.r.n(0,a))return
this.db=b},
ef:function(a,b,c){var z=J.l(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){a.a_(c)
return}z=this.cx
if(z==null){z=P.bx(null,null)
this.cx=z}z.W(new H.hA(a,c))},
ed:function(a,b){var z
if(!this.r.n(0,a))return
z=J.l(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.ba()
return}z=this.cx
if(z==null){z=P.bx(null,null)
this.cx=z}z.W(this.ges())},
eg:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aI(a)
if(b!=null)P.aI(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.au(a)
y[1]=b==null?null:J.au(b)
for(x=new P.cw(z,z.r,null,null),x.c=z.e;x.t();)x.d.a_(y)},
al:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.F(u)
w=t
v=H.B(u)
this.eg(w,v)
if(this.db===!0){this.ba()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gep()
if(this.cx!=null)for(;t=this.cx,!t.gN(t);)this.cx.ck().$0()}return y},
c8:function(a){return this.b.h(0,a)},
bu:function(a,b){var z=this.b
if(z.ai(a))throw H.e(P.aP("Registry: ports must be registered only once."))
z.B(0,a,b)},
b0:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.B(0,this.a,this)
else this.ba()},
ba:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.T(0)
for(z=this.b,y=z.gcs(z),y=y.gH(y);y.t();)y.gC().d8()
z.T(0)
this.c.T(0)
init.globalState.z.aa(0,this.a)
this.dx.T(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.a_(z[v])}this.ch=null}},"$0","ges",0,0,1]},
hA:{
"^":"d:1;a,b",
$0:function(){this.a.a_(this.b)}},
hi:{
"^":"a;a,b",
e1:function(){var z=this.a
if(z.b===z.c)return
return z.ck()},
co:function(){var z,y,x
z=this.e1()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ai(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gN(y)}else y=!1
else y=!1
else y=!1
if(y)H.C(P.aP("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gN(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aa(["command","close"])
x=new H.ab(!0,P.a9(null,P.p)).L(x)
y.toString
self.postMessage(x)}return!1}z.ex()
return!0},
bP:function(){if(self.window!=null)new H.hj(this).$0()
else for(;this.co(););},
ap:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bP()
else try{this.bP()}catch(x){w=H.F(x)
z=w
y=H.B(x)
w=init.globalState.Q
v=P.aa(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.ab(!0,P.a9(null,P.p)).L(v)
w.toString
self.postMessage(v)}}},
hj:{
"^":"d:1;a",
$0:function(){if(!this.a.co())return
P.cU(C.f,this)}},
aC:{
"^":"a;a,b,c",
ex:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.al(this.b)}},
hG:{
"^":"a;"},
eR:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.eS(this.a,this.b,this.c,this.d,this.e,this.f)}},
eT:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aF()
w=H.ag(x,[x,x]).a0(y)
if(w)y.$2(this.b,this.c)
else{x=H.ag(x,[x]).a0(y)
if(x)y.$1(this.b)
else y.$0()}}z.b0()}},
dd:{
"^":"a;"},
b8:{
"^":"dd;b,a",
a_:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbH())return
x=H.i0(a)
if(z.gdV()===y){y=J.P(x)
switch(y.h(x,0)){case"pause":z.bX(y.h(x,1),y.h(x,2))
break
case"resume":z.ez(y.h(x,1))
break
case"add-ondone":z.dD(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.ey(y.h(x,1))
break
case"set-errors-fatal":z.cL(y.h(x,1),y.h(x,2))
break
case"ping":z.ef(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ed(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a7(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aa(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.W(new H.aC(z,new H.hK(this,x),w))},
n:function(a,b){if(b==null)return!1
return b instanceof H.b8&&J.X(this.b,b.b)},
gu:function(a){return this.b.gaV()}},
hK:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbH())z.d4(this.b)}},
bR:{
"^":"dd;b,c,a",
a_:function(a){var z,y,x
z=P.aa(["command","message","port",this,"msg",a])
y=new H.ab(!0,P.a9(null,P.p)).L(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.bR&&J.X(this.b,b.b)&&J.X(this.a,b.a)&&J.X(this.c,b.c)},
gu:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cM()
y=this.a
if(typeof y!=="number")return y.cM()
x=this.c
if(typeof x!=="number")return H.o(x)
return(z<<16^y<<8^x)>>>0}},
b1:{
"^":"a;aV:a<,b,bH:c<",
d8:function(){this.c=!0
this.b=null},
d4:function(a){if(this.c)return
this.dj(a)},
dj:function(a){return this.b.$1(a)},
$isfh:1},
fC:{
"^":"a;a,b,c",
cZ:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.W(new H.aC(y,new H.fE(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ar(new H.fF(this,b),0),a)}else throw H.e(new P.N("Timer greater than 0."))},
static:{fD:function(a,b){var z=new H.fC(!0,!1,null)
z.cZ(a,b)
return z}}},
fE:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fF:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
H.bf()
this.b.$0()}},
a7:{
"^":"a;aV:a<",
gu:function(a){var z=this.a
if(typeof z!=="number")return z.eO()
z=C.a.b_(z,0)^C.a.ah(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a7){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ab:{
"^":"a;a,b",
L:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.B(0,a,z.gj(z))
z=J.l(a)
if(!!z.$iscA)return["buffer",a]
if(!!z.$isbD)return["typed",a]
if(!!z.$isaR)return this.cH(a)
if(!!z.$iseO){x=this.gcE()
w=a.gc6()
w=H.aX(w,x,H.K(w,"M",0),null)
w=P.by(w,!0,H.K(w,"M",0))
z=z.gcs(a)
z=H.aX(z,x,H.K(z,"M",0),null)
return["map",w,P.by(z,!0,H.K(z,"M",0))]}if(!!z.$isf1)return this.cI(a)
if(!!z.$isf)this.cr(a)
if(!!z.$isfh)this.aq(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb8)return this.cJ(a)
if(!!z.$isbR)return this.cK(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aq(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa7)return["capability",a.a]
if(!(a instanceof P.a))this.cr(a)
return["dart",init.classIdExtractor(a),this.cG(init.classFieldsExtractor(a))]},"$1","gcE",2,0,2],
aq:function(a,b){throw H.e(new P.N(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cr:function(a){return this.aq(a,null)},
cH:function(a){var z=this.cF(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aq(a,"Can't serialize indexable: ")},
cF:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.L(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cG:function(a){var z
for(z=0;z<a.length;++z)C.b.B(a,z,this.L(a[z]))
return a},
cI:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aq(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.L(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cK:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cJ:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaV()]
return["raw sendport",a]}},
b6:{
"^":"a;a,b",
a1:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aN("Bad serialized message: "+H.b(a)))
switch(C.b.geb(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=this.aj(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.aj(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.aj(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.aj(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.e4(a)
case"sendport":return this.e5(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.e3(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.a7(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aj(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","ge2",2,0,2],
aj:function(a){var z,y,x
z=J.P(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.o(x)
if(!(y<x))break
z.B(a,y,this.a1(z.h(a,y)));++y}return a},
e4:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aV()
this.b.push(w)
y=J.eg(y,this.ge2()).bk(0)
for(z=J.P(y),v=J.P(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.B(0,y[u],this.a1(v.h(x,u)))}return w},
e5:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.X(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c8(w)
if(u==null)return
t=new H.b8(u,x)}else t=new H.bR(y,w,x)
this.b.push(t)
return t},
e3:function(a){var z,y,x,w,v,u,t
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
if(typeof t!=="number")return H.o(t)
if(!(u<t))break
w[z.h(y,u)]=this.a1(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
es:function(){throw H.e(new P.N("Cannot modify unmodifiable Map"))},
ij:function(a){return init.types[a]},
ix:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaT},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.au(a)
if(typeof z!=="string")throw H.e(H.af(a))
return z},
a_:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cK:function(a){var z,y
z=C.h(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.dQ(z,0)===36)z=C.e.cP(z,1)
return(z+H.dC(H.bW(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b_:function(a){return"Instance of '"+H.cK(a)+"'"},
H:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cH:function(a){return a.b?H.H(a).getUTCMilliseconds()+0:H.H(a).getMilliseconds()+0},
aZ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.af(a))
return a[b]},
bE:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.af(a))
a[b]=c},
o:function(a){throw H.e(H.af(a))},
h:function(a,b){if(a==null)J.at(a)
throw H.e(H.y(a,b))},
y:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a6(!0,b,"index",null)
z=J.at(a)
if(!(b<0)){if(typeof z!=="number")return H.o(z)
y=b>=z}else y=!0
if(y)return P.bt(b,a,"index",null,z)
return P.b0(b,"index",null)},
af:function(a){return new P.a6(!0,a,null,null)},
dw:function(a){return a},
dv:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.af(a))
return a},
e:function(a){var z
if(a==null)a=new P.cG()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dK})
z.name=""}else z.toString=H.dK
return z},
dK:function(){return J.au(this.dartException)},
C:function(a){throw H.e(a)},
ah:function(a){throw H.e(new P.I(a))},
F:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iF(a)
if(a==null)return
if(a instanceof H.br)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.b_(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bv(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cF(v,null))}}if(a instanceof TypeError){u=$.$get$cY()
t=$.$get$cZ()
s=$.$get$d_()
r=$.$get$d0()
q=$.$get$d4()
p=$.$get$d5()
o=$.$get$d2()
$.$get$d1()
n=$.$get$d7()
m=$.$get$d6()
l=u.P(y)
if(l!=null)return z.$1(H.bv(y,l))
else{l=t.P(y)
if(l!=null){l.method="call"
return z.$1(H.bv(y,l))}else{l=s.P(y)
if(l==null){l=r.P(y)
if(l==null){l=q.P(y)
if(l==null){l=p.P(y)
if(l==null){l=o.P(y)
if(l==null){l=r.P(y)
if(l==null){l=n.P(y)
if(l==null){l=m.P(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cF(y,l==null?null:l.method))}}return z.$1(new H.h3(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cP()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a6(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cP()
return a},
B:function(a){var z
if(a instanceof H.br)return a.b
if(a==null)return new H.di(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.di(a,null)},
iA:function(a){if(a==null||typeof a!='object')return J.G(a)
else return H.a_(a)},
dy:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.B(0,a[y],a[x])}return b},
ir:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.n(c,0))return H.aD(b,new H.is(a))
else if(z.n(c,1))return H.aD(b,new H.it(a,d))
else if(z.n(c,2))return H.aD(b,new H.iu(a,d,e))
else if(z.n(c,3))return H.aD(b,new H.iv(a,d,e,f))
else if(z.n(c,4))return H.aD(b,new H.iw(a,d,e,f,g))
else throw H.e(P.aP("Unsupported number of arguments for wrapped closure"))},
ar:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ir)
a.$identity=z
return z},
eq:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.fk(z).r}else x=c
w=d?Object.create(new H.fq().constructor.prototype):Object.create(new H.bn(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.Q
$.Q=J.as(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cf(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ij(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cd:H.bo
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cf(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
en:function(a,b,c,d){var z=H.bo
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cf:function(a,b,c){var z,y,x,w,v,u
if(c)return H.ep(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.en(y,!w,z,b)
if(y===0){w=$.ai
if(w==null){w=H.aO("self")
$.ai=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.Q
$.Q=J.as(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ai
if(v==null){v=H.aO("self")
$.ai=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.Q
$.Q=J.as(w,1)
return new Function(v+H.b(w)+"}")()},
eo:function(a,b,c,d){var z,y
z=H.bo
y=H.cd
switch(b?-1:a){case 0:throw H.e(new H.fm("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ep:function(a,b){var z,y,x,w,v,u,t,s
z=H.em()
y=$.cc
if(y==null){y=H.aO("receiver")
$.cc=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eo(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.Q
$.Q=J.as(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.Q
$.Q=J.as(u,1)
return new Function(y+H.b(u)+"}")()},
bV:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eq(a,b,z,!!d,e,f)},
iE:function(a){throw H.e(new P.ev("Cyclic initialization for static "+H.b(a)))},
ag:function(a,b,c){return new H.fn(a,b,c,null)},
aF:function(){return C.x},
bh:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
w:function(a,b,c){var z
if(b===0){J.dV(c,a)
return}else if(b===1){c.c0(H.F(a),H.B(a))
return}if(!!J.l(a).$isU)z=a
else{z=H.c(new P.E(0,$.k,null),[null])
z.aM(a)}z.aD(H.dr(b,0),new H.ia(b))
return c.gec()},
dr:function(a,b){return new H.i7(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
c:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bW:function(a){if(a==null)return
return a.$builtinTypeInfo},
dA:function(a,b){return H.dJ(a["$as"+H.b(b)],H.bW(a))},
K:function(a,b,c){var z=H.dA(a,b)
return z==null?null:z[c]},
v:function(a,b){var z=H.bW(a)
return z==null?null:z[b]},
c0:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dC(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dC:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bF("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.c0(u,c))}return w?"":"<"+H.b(z)+">"},
dJ:function(a,b){if(typeof a=="function"){a=H.bZ(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bZ(a,null,b)}return b},
i9:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.L(a[y],b[y]))return!1
return!0},
ba:function(a,b,c){return H.bZ(a,b,H.dA(b,c))},
L:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dB(a,b)
if('func' in a)return b.builtin$cls==="eF"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c0(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.c0(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.i9(H.dJ(v,z),x)},
dt:function(a,b,c){var z,y,x,w,v
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
i8:function(a,b){var z,y,x,w,v,u
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
dB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.dt(x,w,!1))return!1
if(!H.dt(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.L(o,n)||H.L(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.L(o,n)||H.L(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.L(o,n)||H.L(n,o)))return!1}}return H.i8(a.named,b.named)},
bZ:function(a,b,c){return a.apply(b,c)},
k2:function(a){var z=$.bX
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
k0:function(a){return H.a_(a)},
k_:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iy:function(a){var z,y,x,w,v,u
z=$.bX.$1(a)
y=$.bb[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.be[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.ds.$2(a,z)
if(z!=null){y=$.bb[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.be[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c_(x)
$.bb[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.be[z]=x
return x}if(v==="-"){u=H.c_(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dE(a,x)
if(v==="*")throw H.e(new P.d9(z))
if(init.leafTags[z]===true){u=H.c_(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dE(a,x)},
dE:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bg(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c_:function(a){return J.bg(a,!1,null,!!a.$isaT)},
iz:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bg(z,!1,null,!!z.$isaT)
else return J.bg(z,c,null,null)},
ip:function(){if(!0===$.bY)return
$.bY=!0
H.iq()},
iq:function(){var z,y,x,w,v,u,t,s
$.bb=Object.create(null)
$.be=Object.create(null)
H.ik()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dG.$1(v)
if(u!=null){t=H.iz(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ik:function(){var z,y,x,w,v,u,t
z=C.C()
z=H.ae(C.z,H.ae(C.E,H.ae(C.i,H.ae(C.i,H.ae(C.D,H.ae(C.A,H.ae(C.B(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bX=new H.il(v)
$.ds=new H.im(u)
$.dG=new H.io(t)},
ae:function(a,b){return a(b)||b},
iD:function(a,b,c){return a.indexOf(b,c)>=0},
er:{
"^":"a;",
i:function(a){return P.cz(this)},
B:function(a,b,c){return H.es()}},
bs:{
"^":"er;a",
aU:function(){var z=this.$map
if(z==null){z=new H.aB(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dy(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aU().h(0,b)},
I:function(a,b){this.aU().I(0,b)},
gj:function(a){var z=this.aU()
return z.gj(z)}},
fj:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fk:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fj(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
h2:{
"^":"a;a,b,c,d,e,f",
P:function(a){var z,y,x
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
return new H.h2(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b5:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d3:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cF:{
"^":"D;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
f3:{
"^":"D;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bv:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.f3(a,y,z?null:b.receiver)}}},
h3:{
"^":"D;a",
i:function(a){var z=this.a
return C.e.gN(z)?"Error":"Error: "+z}},
iF:{
"^":"d:2;a",
$1:function(a){if(!!J.l(a).$isD)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
di:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
is:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
it:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
iu:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
iv:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iw:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"a;",
i:function(a){return"Closure '"+H.cK(this)+"'"},
gct:function(){return this},
gct:function(){return this}},
cS:{
"^":"d;"},
fq:{
"^":"cS;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bn:{
"^":"cS;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bn))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gu:function(a){var z,y
z=this.c
if(z==null)y=H.a_(this.a)
else y=typeof z!=="object"?J.G(z):H.a_(z)
z=H.a_(this.b)
if(typeof y!=="number")return y.eP()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.b_(z)},
static:{bo:function(a){return a.a},cd:function(a){return a.c},em:function(){var z=$.ai
if(z==null){z=H.aO("self")
$.ai=z}return z},aO:function(a){var z,y,x,w,v
z=new H.bn("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fm:{
"^":"D;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
cO:{
"^":"a;"},
fn:{
"^":"cO;a,b,c,d",
a0:function(a){var z=this.de(a)
return z==null?!1:H.dB(z,this.ac())},
de:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
ac:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isjK)z.void=true
else if(!x.$iscm)z.ret=y.ac()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cN(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cN(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dx(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ac()}z.named=w}return z},
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
t=H.dx(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].ac())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cN:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ac())
return z}}},
cm:{
"^":"cO;",
i:function(a){return"dynamic"},
ac:function(){return}},
br:{
"^":"a;a,R:b<"},
ia:{
"^":"d:5;a",
$2:function(a,b){H.dr(this.a,1).$1(new H.br(a,b))}},
i7:{
"^":"d:2;a,b",
$1:function(a){this.b(this.a,a)}},
aB:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gN:function(a){return this.a===0},
gc6:function(){return H.c(new H.f5(this),[H.v(this,0)])},
gcs:function(a){return H.aX(this.gc6(),new H.f2(this),H.v(this,0),H.v(this,1))},
ai:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bA(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bA(y,a)}else return this.ek(a)},
ek:function(a){var z=this.d
if(z==null)return!1
return this.an(this.S(z,this.am(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.S(z,b)
return y==null?null:y.ga2()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.S(x,b)
return y==null?null:y.ga2()}else return this.el(b)},
el:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.S(z,this.am(a))
x=this.an(y,a)
if(x<0)return
return y[x].ga2()},
B:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aX()
this.b=z}this.bt(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aX()
this.c=y}this.bt(y,b,c)}else this.en(b,c)},
en:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aX()
this.d=z}y=this.am(a)
x=this.S(z,y)
if(x==null)this.aZ(z,y,[this.aY(a,b)])
else{w=this.an(x,a)
if(w>=0)x[w].sa2(b)
else x.push(this.aY(a,b))}},
aa:function(a,b){if(typeof b==="string")return this.bO(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bO(this.c,b)
else return this.em(b)},
em:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.S(z,this.am(a))
x=this.an(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bV(w)
return w.ga2()},
T:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
I:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.I(this))
z=z.c}},
bt:function(a,b,c){var z=this.S(a,b)
if(z==null)this.aZ(a,b,this.aY(b,c))
else z.sa2(c)},
bO:function(a,b){var z
if(a==null)return
z=this.S(a,b)
if(z==null)return
this.bV(z)
this.bB(a,b)
return z.ga2()},
aY:function(a,b){var z,y
z=new H.f4(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bV:function(a){var z,y
z=a.gdu()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
am:function(a){return J.G(a)&0x3ffffff},
an:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.X(a[y].gc3(),b))return y
return-1},
i:function(a){return P.cz(this)},
S:function(a,b){return a[b]},
aZ:function(a,b,c){a[b]=c},
bB:function(a,b){delete a[b]},
bA:function(a,b){return this.S(a,b)!=null},
aX:function(){var z=Object.create(null)
this.aZ(z,"<non-identifier-key>",z)
this.bB(z,"<non-identifier-key>")
return z},
$iseO:1},
f2:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
f4:{
"^":"a;c3:a<,a2:b@,c,du:d<"},
f5:{
"^":"M;a",
gj:function(a){return this.a.a},
gH:function(a){var z,y
z=this.a
y=new H.f6(z,z.r,null,null)
y.c=z.e
return y},
I:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.I(z))
y=y.c}},
$isq:1},
f6:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.I(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
il:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
im:{
"^":"d:9;a",
$2:function(a,b){return this.a(a,b)}},
io:{
"^":"d:10;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bu:function(){return new P.al("No element")},
eX:function(){return new P.al("Too few elements")},
fA:function(a){return a.geU()},
aW:{
"^":"M;",
gH:function(a){return new H.cx(this,this.gj(this),0,null)},
I:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.Y(0,y))
if(z!==this.gj(this))throw H.e(new P.I(this))}},
a9:function(a,b){return H.c(new H.bz(this,b),[null,null])},
bl:function(a,b){var z,y,x
if(b){z=H.c([],[H.K(this,"aW",0)])
C.b.sj(z,this.gj(this))}else z=H.c(Array(this.gj(this)),[H.K(this,"aW",0)])
for(y=0;y<this.gj(this);++y){x=this.Y(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bk:function(a){return this.bl(a,!0)},
$isq:1},
cx:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
t:function(){var z,y,x,w
z=this.a
y=J.P(z)
x=y.gj(z)
if(this.b!==x)throw H.e(new P.I(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.Y(z,w);++this.c
return!0}},
cy:{
"^":"M;a,b",
gH:function(a){var z=new H.f9(null,J.bm(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.at(this.a)},
$asM:function(a,b){return[b]},
static:{aX:function(a,b,c,d){if(!!J.l(a).$isq)return H.c(new H.cn(a,b),[c,d])
return H.c(new H.cy(a,b),[c,d])}}},
cn:{
"^":"cy;a,b",
$isq:1},
f9:{
"^":"eY;a,b,c",
t:function(){var z=this.b
if(z.t()){this.a=this.aT(z.gC())
return!0}this.a=null
return!1},
gC:function(){return this.a},
aT:function(a){return this.c.$1(a)}},
bz:{
"^":"aW;a,b",
gj:function(a){return J.at(this.a)},
Y:function(a,b){return this.aT(J.e0(this.a,b))},
aT:function(a){return this.b.$1(a)},
$asaW:function(a,b){return[b]},
$asM:function(a,b){return[b]},
$isq:1},
cp:{
"^":"a;"}}],["","",,H,{
"^":"",
dx:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
h4:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ib()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ar(new P.h6(z),1)).observe(y,{childList:true})
return new P.h5(z,y,x)}else if(self.setImmediate!=null)return P.ic()
return P.id()},
jM:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ar(new P.h7(a),0))},"$1","ib",2,0,4],
jN:[function(a){++init.globalState.f.b
self.setImmediate(H.ar(new P.h8(a),0))},"$1","ic",2,0,4],
jO:[function(a){P.bG(C.f,a)},"$1","id",2,0,4],
dl:function(a,b){var z=H.aF()
z=H.ag(z,[z,z]).a0(a)
if(z){b.toString
return a}else{b.toString
return a}},
eG:function(a,b,c){var z=new P.E(0,$.k,null)
z.$builtinTypeInfo=[c]
P.cU(a,new P.eH(b,z))
return z},
av:function(a){return H.c(new P.dc(H.c(new P.E(0,$.k,null),[a])),[a])},
i1:function(a,b,c){$.k.toString
a.M(b,c)},
i3:function(){var z,y
for(;z=$.ac,z!=null;){$.ap=null
y=z.c
$.ac=y
if(y==null)$.ao=null
$.k=z.b
z.dK()}},
jZ:[function(){$.bS=!0
try{P.i3()}finally{$.k=C.c
$.ap=null
$.bS=!1
if($.ac!=null)$.$get$bN().$1(P.du())}},"$0","du",0,0,1],
dq:function(a){if($.ac==null){$.ao=a
$.ac=a
if(!$.bS)$.$get$bN().$1(P.du())}else{$.ao.c=a
$.ao=a}},
dH:function(a){var z,y
z=$.k
if(C.c===z){P.ad(null,null,C.c,a)
return}z.toString
if(C.c.gb9()===z){P.ad(null,null,z,a)
return}y=$.k
P.ad(null,null,y,y.b1(a,!0))},
jC:function(a,b){var z,y,x
z=H.c(new P.dj(null,null,null,0),[b])
y=z.gdn()
x=z.gdr()
z.a=a.a3(y,!0,z.gdq(),x)
return z},
i5:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.F(u)
z=t
y=H.B(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.T(x)
w=t
v=x.gR()
c.$2(w,v)}}},
hX:function(a,b,c,d){var z=a.b4()
if(!!J.l(z).$isU)z.bn(new P.i_(b,c,d))
else b.M(c,d)},
hY:function(a,b){return new P.hZ(a,b)},
cU:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bG(a,b)}return P.bG(a,z.b1(b,!0))},
bG:function(a,b){var z=C.d.ah(a.a,1000)
return H.fD(z<0?0:z,b)},
bM:function(a){var z=$.k
$.k=a
return z},
aE:function(a,b,c,d,e){var z,y,x
z=new P.db(new P.i4(d,e),C.c,null)
y=$.ac
if(y==null){P.dq(z)
$.ap=$.ao}else{x=$.ap
if(x==null){z.c=y
$.ap=z
$.ac=z}else{z.c=x.c
x.c=z
$.ap=z
if(z.c==null)$.ao=z}}},
dm:function(a,b,c,d){var z,y
if($.k===c)return d.$0()
z=P.bM(c)
try{y=d.$0()
return y}finally{$.k=z}},
dp:function(a,b,c,d,e){var z,y
if($.k===c)return d.$1(e)
z=P.bM(c)
try{y=d.$1(e)
return y}finally{$.k=z}},
dn:function(a,b,c,d,e,f){var z,y
if($.k===c)return d.$2(e,f)
z=P.bM(c)
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ad:function(a,b,c,d){var z=C.c!==c
if(z){d=c.b1(d,!(!z||C.c.gb9()===c))
c=C.c}P.dq(new P.db(d,c,null))},
h6:{
"^":"d:2;a",
$1:function(a){var z,y
H.bf()
z=this.a
y=z.a
z.a=null
y.$0()}},
h5:{
"^":"d:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
h7:{
"^":"d:0;a",
$0:function(){H.bf()
this.a.$0()}},
h8:{
"^":"d:0;a",
$0:function(){H.bf()
this.a.$0()}},
hU:{
"^":"Y;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hV:function(a,b){if(b!=null)return b
if(!!J.l(a).$isD)return a.gR()
return}}},
U:{
"^":"a;"},
eH:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a4(null)}catch(x){w=H.F(x)
z=w
y=H.B(x)
P.i1(this.b,z,y)}}},
hc:{
"^":"a;ec:a<",
c0:function(a,b){a=a!=null?a:new P.cG()
if(this.a.a!==0)throw H.e(new P.al("Future already completed"))
$.k.toString
this.M(a,b)},
dS:function(a){return this.c0(a,null)}},
dc:{
"^":"hc;a",
b7:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.al("Future already completed"))
z.aM(b)},
M:function(a,b){this.a.d7(a,b)}},
am:{
"^":"a;bI:a<,eA:b>,c,d,e",
ga6:function(){return this.b.b},
gc2:function(){return(this.c&1)!==0},
gei:function(){return this.c===6},
geh:function(){return this.c===8},
gdt:function(){return this.d},
gdC:function(){return this.d}},
E:{
"^":"a;aw:a?,a6:b<,c",
gdk:function(){return this.a===8},
sdl:function(a){if(a)this.a=2
else this.a=0},
aD:function(a,b){var z,y
z=H.c(new P.E(0,$.k,null),[null])
y=z.b
if(y!==C.c){y.toString
if(b!=null)b=P.dl(b,y)}this.aJ(new P.am(null,z,b==null?1:3,a,b))
return z},
eH:function(a){return this.aD(a,null)},
bn:function(a){var z,y
z=$.k
y=new P.E(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aJ(new P.am(null,y,8,a,null))
return y},
aW:function(){if(this.a!==0)throw H.e(new P.al("Future already completed"))
this.a=1},
gdB:function(){return this.c},
gaf:function(){return this.c},
bU:function(a){this.a=4
this.c=a},
bT:function(a){this.a=8
this.c=a},
dz:function(a,b){this.bT(new P.Y(a,b))},
aJ:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ad(null,null,z,new P.hn(this,a))}else{a.a=this.c
this.c=a}},
av:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbI()
z.a=y}return y},
a4:function(a){var z,y
z=J.l(a)
if(!!z.$isU)if(!!z.$isE)P.b7(a,this)
else P.bP(a,this)
else{y=this.av()
this.bU(a)
P.a4(this,y)}},
bz:function(a){var z=this.av()
this.bU(a)
P.a4(this,z)},
M:[function(a,b){var z=this.av()
this.bT(new P.Y(a,b))
P.a4(this,z)},function(a){return this.M(a,null)},"eQ","$2","$1","gaQ",2,2,12,0],
aM:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isU){if(!!z.$isE){z=a.a
if(z>=4&&z===8){this.aW()
z=this.b
z.toString
P.ad(null,null,z,new P.hp(this,a))}else P.b7(a,this)}else P.bP(a,this)
return}}this.aW()
z=this.b
z.toString
P.ad(null,null,z,new P.hq(this,a))},
d7:function(a,b){var z
this.aW()
z=this.b
z.toString
P.ad(null,null,z,new P.ho(this,a,b))},
$isU:1,
static:{bP:function(a,b){var z,y,x,w
b.saw(2)
try{a.aD(new P.hr(b),new P.hs(b))}catch(x){w=H.F(x)
z=w
y=H.B(x)
P.dH(new P.ht(b,z,y))}},b7:function(a,b){var z
b.a=2
z=new P.am(null,b,0,null,null)
if(a.a>=4)P.a4(a,z)
else a.aJ(z)},a4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdk()
if(b==null){if(w){v=z.a.gaf()
y=z.a.ga6()
x=J.T(v)
u=v.gR()
y.toString
P.aE(null,null,y,x,u)}return}for(;b.gbI()!=null;b=t){t=b.a
b.a=null
P.a4(z.a,b)}x.a=!0
s=w?null:z.a.gdB()
x.b=s
x.c=!1
y=!w
if(!y||b.gc2()||b.c===8){r=b.ga6()
if(w){u=z.a.ga6()
u.toString
if(u==null?r!=null:u!==r){u=u.gb9()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaf()
y=z.a.ga6()
x=J.T(v)
u=v.gR()
y.toString
P.aE(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gc2())x.a=new P.hv(x,b,s,r).$0()}else new P.hu(z,x,b,r).$0()
if(b.geh())new P.hw(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isU}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.E)if(p.a>=4){o.a=2
z.a=p
b=new P.am(null,o,0,null,null)
y=p
continue}else P.b7(p,o)
else P.bP(p,o)
return}}o=b.b
b=o.av()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hn:{
"^":"d:0;a,b",
$0:function(){P.a4(this.a,this.b)}},
hr:{
"^":"d:2;a",
$1:function(a){this.a.bz(a)}},
hs:{
"^":"d:6;a",
$2:function(a,b){this.a.M(a,b)},
$1:function(a){return this.$2(a,null)}},
ht:{
"^":"d:0;a,b,c",
$0:function(){this.a.M(this.b,this.c)}},
hp:{
"^":"d:0;a,b",
$0:function(){P.b7(this.b,this.a)}},
hq:{
"^":"d:0;a,b",
$0:function(){this.a.bz(this.b)}},
ho:{
"^":"d:0;a,b,c",
$0:function(){this.a.M(this.b,this.c)}},
hv:{
"^":"d:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aC(this.b.gdt(),this.c)
return!0}catch(x){w=H.F(x)
z=w
y=H.B(x)
this.a.b=new P.Y(z,y)
return!1}}},
hu:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaf()
y=!0
r=this.c
if(r.gei()){x=r.d
try{y=this.d.aC(x,J.T(z))}catch(q){r=H.F(q)
w=r
v=H.B(q)
r=J.T(z)
p=w
o=(r==null?p==null:r===p)?z:new P.Y(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aF()
p=H.ag(p,[p,p]).a0(r)
n=this.d
m=this.b
if(p)m.b=n.eC(u,J.T(z),z.gR())
else m.b=n.aC(u,J.T(z))}catch(q){r=H.F(q)
t=r
s=H.B(q)
r=J.T(z)
p=t
o=(r==null?p==null:r===p)?z:new P.Y(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hw:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cm(this.d.gdC())
z.a=w
v=w}catch(u){z=H.F(u)
y=z
x=H.B(u)
if(this.c){z=J.T(this.a.a.gaf())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaf()
else v.b=new P.Y(y,x)
v.a=!1
return}if(!!J.l(v).$isU){t=this.d
s=t.geA(t)
s.sdl(!0)
this.b.c=!0
v.aD(new P.hx(this.a,s),new P.hy(z,s))}}},
hx:{
"^":"d:2;a,b",
$1:function(a){P.a4(this.a.a,new P.am(null,this.b,0,null,null))}},
hy:{
"^":"d:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.E)){y=H.c(new P.E(0,$.k,null),[null])
z.a=y
y.dz(a,b)}P.a4(z.a,new P.am(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
db:{
"^":"a;a,b,c",
dK:function(){return this.a.$0()}},
a1:{
"^":"a;",
a9:function(a,b){return H.c(new P.hJ(b,this),[H.K(this,"a1",0),null])},
I:function(a,b){var z,y
z={}
y=H.c(new P.E(0,$.k,null),[null])
z.a=null
z.a=this.a3(new P.fu(z,this,b,y),!0,new P.fv(y),y.gaQ())
return y},
gj:function(a){var z,y
z={}
y=H.c(new P.E(0,$.k,null),[P.p])
z.a=0
this.a3(new P.fw(z),!0,new P.fx(z,y),y.gaQ())
return y},
bk:function(a){var z,y
z=H.c([],[H.K(this,"a1",0)])
y=H.c(new P.E(0,$.k,null),[[P.j,H.K(this,"a1",0)]])
this.a3(new P.fy(this,z),!0,new P.fz(z,y),y.gaQ())
return y}},
fu:{
"^":"d;a,b,c,d",
$1:function(a){P.i5(new P.fs(this.c,a),new P.ft(),P.hY(this.a.a,this.d))},
$signature:function(){return H.ba(function(a){return{func:1,args:[a]}},this.b,"a1")}},
fs:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ft:{
"^":"d:2;",
$1:function(a){}},
fv:{
"^":"d:0;a",
$0:function(){this.a.a4(null)}},
fw:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
fx:{
"^":"d:0;a,b",
$0:function(){this.b.a4(this.a.a)}},
fy:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.ba(function(a){return{func:1,args:[a]}},this.a,"a1")}},
fz:{
"^":"d:0;a,b",
$0:function(){this.b.a4(this.a)}},
fr:{
"^":"a;"},
jS:{
"^":"a;"},
h9:{
"^":"a;a6:d<,aw:e?",
bf:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bY()
if((z&4)===0&&(this.e&32)===0)this.bF(this.gbK())},
ao:function(a){return this.bf(a,null)},
cl:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gN(z)}else z=!1
if(z)this.r.aG(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bF(this.gbM())}}}},
b4:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aN()
return this.f},
aN:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bY()
if((this.e&32)===0)this.r=null
this.f=this.bJ()},
aL:["cU",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bQ(a)
else this.aK(new P.hf(a,null))}],
aI:["cV",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bS(a,b)
else this.aK(new P.hh(a,b,null))}],
d6:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bR()
else this.aK(C.y)},
bL:[function(){},"$0","gbK",0,0,1],
bN:[function(){},"$0","gbM",0,0,1],
bJ:function(){return},
aK:function(a){var z,y
z=this.r
if(z==null){z=new P.hT(null,null,0)
this.r=z}z.a7(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aG(this)}},
bQ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bj(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aO((z&4)!==0)},
bS:function(a,b){var z,y
z=this.e
y=new P.hb(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aN()
z=this.f
if(!!J.l(z).$isU)z.bn(y)
else y.$0()}else{y.$0()
this.aO((z&4)!==0)}},
bR:function(){var z,y
z=new P.ha(this)
this.aN()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isU)y.bn(z)
else z.$0()},
bF:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aO((z&4)!==0)},
aO:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gN(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gN(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bL()
else this.bN()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aG(this)},
d2:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dl(b,z)
this.c=c}},
hb:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aF()
x=H.ag(x,[x,x]).a0(y)
w=z.d
v=this.b
u=z.b
if(x)w.eD(u,v,this.c)
else w.bj(u,v)
z.e=(z.e&4294967263)>>>0}},
ha:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cn(z.c)
z.e=(z.e&4294967263)>>>0}},
de:{
"^":"a;aB:a@"},
hf:{
"^":"de;b,a",
bg:function(a){a.bQ(this.b)}},
hh:{
"^":"de;ak:b>,R:c<,a",
bg:function(a){a.bS(this.b,this.c)}},
hg:{
"^":"a;",
bg:function(a){a.bR()},
gaB:function(){return},
saB:function(a){throw H.e(new P.al("No events after a done."))}},
hL:{
"^":"a;aw:a?",
aG:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dH(new P.hM(this,a))
this.a=1},
bY:function(){if(this.a===1)this.a=3}},
hM:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.ee(this.b)}},
hT:{
"^":"hL;b,c,a",
gN:function(a){return this.c==null},
a7:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saB(b)
this.c=b}},
ee:function(a){var z,y
z=this.b
y=z.gaB()
this.b=y
if(y==null)this.c=null
z.bg(a)}},
dj:{
"^":"a;a,b,c,aw:d?",
bv:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eV:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a4(!0)
return}this.a.ao(0)
this.c=a
this.d=3},"$1","gdn",2,0,function(){return H.ba(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dj")}],
ds:[function(a,b){var z
if(this.d===2){z=this.c
this.bv(0)
z.M(a,b)
return}this.a.ao(0)
this.c=new P.Y(a,b)
this.d=4},function(a){return this.ds(a,null)},"eX","$2","$1","gdr",2,2,14,0],
eW:[function(){if(this.d===2){var z=this.c
this.bv(0)
z.a4(!1)
return}this.a.ao(0)
this.c=null
this.d=5},"$0","gdq",0,0,1]},
i_:{
"^":"d:0;a,b,c",
$0:function(){return this.a.M(this.b,this.c)}},
hZ:{
"^":"d:5;a,b",
$2:function(a,b){return P.hX(this.a,this.b,a,b)}},
bO:{
"^":"a1;",
a3:function(a,b,c,d){return this.dc(a,d,c,!0===b)},
c7:function(a,b,c){return this.a3(a,null,b,c)},
dc:function(a,b,c,d){return P.hm(this,a,b,c,d,H.K(this,"bO",0),H.K(this,"bO",1))},
bG:function(a,b){b.aL(a)},
$asa1:function(a,b){return[b]}},
df:{
"^":"h9;x,y,a,b,c,d,e,f,r",
aL:function(a){if((this.e&2)!==0)return
this.cU(a)},
aI:function(a,b){if((this.e&2)!==0)return
this.cV(a,b)},
bL:[function(){var z=this.y
if(z==null)return
z.ao(0)},"$0","gbK",0,0,1],
bN:[function(){var z=this.y
if(z==null)return
z.cl()},"$0","gbM",0,0,1],
bJ:function(){var z=this.y
if(z!=null){this.y=null
z.b4()}return},
eR:[function(a){this.x.bG(a,this)},"$1","gdg",2,0,function(){return H.ba(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"df")}],
eT:[function(a,b){this.aI(a,b)},"$2","gdi",4,0,15],
eS:[function(){this.d6()},"$0","gdh",0,0,1],
d3:function(a,b,c,d,e,f,g){var z,y
z=this.gdg()
y=this.gdi()
this.y=this.x.a.c7(z,this.gdh(),y)},
static:{hm:function(a,b,c,d,e,f,g){var z=$.k
z=H.c(new P.df(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.d2(b,c,d,e)
z.d3(a,b,c,d,e,f,g)
return z}}},
hJ:{
"^":"bO;b,a",
bG:function(a,b){var z,y,x,w,v
z=null
try{z=this.dA(a)}catch(w){v=H.F(w)
y=v
x=H.B(w)
$.k.toString
b.aI(y,x)
return}b.aL(z)},
dA:function(a){return this.b.$1(a)}},
Y:{
"^":"a;ak:a>,R:b<",
i:function(a){return H.b(this.a)},
$isD:1},
hW:{
"^":"a;"},
i4:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.hU(z,P.hV(z,this.b)))}},
hO:{
"^":"hW;",
gb9:function(){return this},
cn:function(a){var z,y,x,w
try{if(C.c===$.k){x=a.$0()
return x}x=P.dm(null,null,this,a)
return x}catch(w){x=H.F(w)
z=x
y=H.B(w)
return P.aE(null,null,this,z,y)}},
bj:function(a,b){var z,y,x,w
try{if(C.c===$.k){x=a.$1(b)
return x}x=P.dp(null,null,this,a,b)
return x}catch(w){x=H.F(w)
z=x
y=H.B(w)
return P.aE(null,null,this,z,y)}},
eD:function(a,b,c){var z,y,x,w
try{if(C.c===$.k){x=a.$2(b,c)
return x}x=P.dn(null,null,this,a,b,c)
return x}catch(w){x=H.F(w)
z=x
y=H.B(w)
return P.aE(null,null,this,z,y)}},
b1:function(a,b){if(b)return new P.hP(this,a)
else return new P.hQ(this,a)},
dG:function(a,b){if(b)return new P.hR(this,a)
else return new P.hS(this,a)},
h:function(a,b){return},
cm:function(a){if($.k===C.c)return a.$0()
return P.dm(null,null,this,a)},
aC:function(a,b){if($.k===C.c)return a.$1(b)
return P.dp(null,null,this,a,b)},
eC:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.dn(null,null,this,a,b,c)}},
hP:{
"^":"d:0;a,b",
$0:function(){return this.a.cn(this.b)}},
hQ:{
"^":"d:0;a,b",
$0:function(){return this.a.cm(this.b)}},
hR:{
"^":"d:2;a,b",
$1:function(a){return this.a.bj(this.b,a)}},
hS:{
"^":"d:2;a,b",
$1:function(a){return this.a.aC(this.b,a)}}}],["","",,P,{
"^":"",
aV:function(){return H.c(new H.aB(0,null,null,null,null,null,0),[null,null])},
aa:function(a){return H.dy(a,H.c(new H.aB(0,null,null,null,null,null,0),[null,null]))},
eW:function(a,b,c){var z,y
if(P.bT(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aq()
y.push(a)
try{P.i2(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cQ(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aQ:function(a,b,c){var z,y,x
if(P.bT(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$aq()
y.push(a)
try{x=z
x.a=P.cQ(x.ga5(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga5()+c
y=z.ga5()
return y.charCodeAt(0)==0?y:y},
bT:function(a){var z,y
for(z=0;y=$.$get$aq(),z<y.length;++z)if(a===y[z])return!0
return!1},
i2:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gH(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.b(z.gC())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gC();++x
if(!z.t()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gC();++x
for(;z.t();t=s,s=r){r=z.gC();++x
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
aU:function(a,b,c,d,e){return H.c(new H.aB(0,null,null,null,null,null,0),[d,e])},
a9:function(a,b){return P.hE(a,b)},
aj:function(a,b,c,d){return H.c(new P.hB(0,null,null,null,null,null,0),[d])},
cz:function(a){var z,y,x
z={}
if(P.bT(a))return"{...}"
y=new P.bF("")
try{$.$get$aq().push(a)
x=y
x.a=x.ga5()+"{"
z.a=!0
J.e1(a,new P.fa(z,y))
z=y
z.a=z.ga5()+"}"}finally{z=$.$get$aq()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga5()
return z.charCodeAt(0)==0?z:z},
hD:{
"^":"aB;a,b,c,d,e,f,r",
am:function(a){return H.iA(a)&0x3ffffff},
an:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gc3()
if(x==null?b==null:x===b)return y}return-1},
static:{hE:function(a,b){return H.c(new P.hD(0,null,null,null,null,null,0),[a,b])}}},
hB:{
"^":"hz;a,b,c,d,e,f,r",
gH:function(a){var z=new P.cw(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dT:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.da(b)},
da:function(a){var z=this.d
if(z==null)return!1
return this.au(z[this.at(a)],a)>=0},
c8:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dT(0,a)?a:null
else return this.dm(a)},
dm:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.at(a)]
x=this.au(y,a)
if(x<0)return
return J.c1(y,x).gbC()},
I:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.I(this))
z=z.b}},
a7:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bw(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bw(x,b)}else return this.W(b)},
W:function(a){var z,y,x
z=this.d
if(z==null){z=P.hC()
this.d=z}y=this.at(a)
x=z[y]
if(x==null)z[y]=[this.aP(a)]
else{if(this.au(x,a)>=0)return!1
x.push(this.aP(a))}return!0},
aa:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bx(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bx(this.c,b)
else return this.dv(b)},
dv:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.at(a)]
x=this.au(y,a)
if(x<0)return!1
this.by(y.splice(x,1)[0])
return!0},
T:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bw:function(a,b){if(a[b]!=null)return!1
a[b]=this.aP(b)
return!0},
bx:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.by(z)
delete a[b]
return!0},
aP:function(a){var z,y
z=new P.f7(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
by:function(a){var z,y
z=a.gd9()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
at:function(a){return J.G(a)&0x3ffffff},
au:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.X(a[y].gbC(),b))return y
return-1},
$isq:1,
static:{hC:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f7:{
"^":"a;bC:a<,b,d9:c<"},
cw:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.I(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hz:{
"^":"fo;"},
bw:{
"^":"a;",
gH:function(a){return new H.cx(a,this.gj(a),0,null)},
Y:function(a,b){return this.h(a,b)},
I:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.I(a))}},
a9:function(a,b){return H.c(new H.bz(a,b),[null,null])},
i:function(a){return P.aQ(a,"[","]")},
$isj:1,
$asj:null,
$isq:1},
fa:{
"^":"d:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
f8:{
"^":"M;a,b,c,d",
gH:function(a){return new P.hF(this,this.c,this.d,this.b,null)},
I:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.C(new P.I(this))}},
gN:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
T:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aQ(this,"{","}")},
ck:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bu());++this.d
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
if(this.b===x)this.bE();++this.d},
bE:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.v(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.br(y,0,w,z,x)
C.b.br(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cX:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$isq:1,
static:{bx:function(a,b){var z=H.c(new P.f8(null,0,0,0),[b])
z.cX(a,b)
return z}}},
hF:{
"^":"a;a,b,c,d,e",
gC:function(){return this.e},
t:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.C(new P.I(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fp:{
"^":"a;",
a9:function(a,b){return H.c(new H.cn(this,b),[H.v(this,0),null])},
i:function(a){return P.aQ(this,"{","}")},
I:function(a,b){var z
for(z=this.gH(this);z.t();)b.$1(z.d)},
$isq:1},
fo:{
"^":"fp;"}}],["","",,P,{
"^":"",
i6:function(a){return H.fA(a)},
bp:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.au(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eC(a)},
eC:function(a){var z=J.l(a)
if(!!z.$isd)return z.i(a)
return H.b_(a)},
aP:function(a){return new P.hl(a)},
by:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.bm(a);y.t();)z.push(y.gC())
if(b)return z
z.fixed$length=Array
return z},
aI:function(a){var z=H.b(a)
H.dF(z)},
js:{
"^":"d:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.i6(a)}},
bU:{
"^":"a;"},
"+bool":0,
cg:{
"^":"a;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.cg))return!1
return this.a===b.a&&this.b===b.b},
gu:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ew(z?H.H(this).getUTCFullYear()+0:H.H(this).getFullYear()+0)
x=P.aw(z?H.H(this).getUTCMonth()+1:H.H(this).getMonth()+1)
w=P.aw(z?H.H(this).getUTCDate()+0:H.H(this).getDate()+0)
v=P.aw(z?H.H(this).getUTCHours()+0:H.H(this).getHours()+0)
u=P.aw(z?H.H(this).getUTCMinutes()+0:H.H(this).getMinutes()+0)
t=P.aw(z?H.H(this).getUTCSeconds()+0:H.H(this).getSeconds()+0)
s=P.ex(H.cH(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{ew:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},ex:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aw:function(a){if(a>=10)return""+a
return"0"+a}}},
bi:{
"^":"aH;"},
"+double":0,
ax:{
"^":"a;a",
m:function(a,b){return new P.ax(C.d.m(this.a,b.gdd()))},
aF:function(a,b){return C.d.aF(this.a,b.gdd())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.ax))return!1
return this.a===b.a},
gu:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eB()
y=this.a
if(y<0)return"-"+new P.ax(-y).i(0)
x=z.$1(C.d.bh(C.d.ah(y,6e7),60))
w=z.$1(C.d.bh(C.d.ah(y,1e6),60))
v=new P.eA().$1(C.d.bh(y,1e6))
return""+C.d.ah(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
eA:{
"^":"d:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eB:{
"^":"d:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
D:{
"^":"a;",
gR:function(){return H.B(this.$thrownJsError)}},
cG:{
"^":"D;",
i:function(a){return"Throw of null."}},
a6:{
"^":"D;a,b,c,d",
gaS:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaR:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaS()+y+x
if(!this.a)return w
v=this.gaR()
u=P.bp(this.b)
return w+v+": "+H.b(u)},
static:{aN:function(a){return new P.a6(!1,null,null,a)},ek:function(a,b,c){return new P.a6(!0,a,b,c)}}},
cL:{
"^":"a6;e,f,a,b,c,d",
gaS:function(){return"RangeError"},
gaR:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.eN()
if(typeof z!=="number")return H.o(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b0:function(a,b,c){return new P.cL(null,null,!0,a,b,"Value not in range")},ak:function(a,b,c,d,e){return new P.cL(b,c,!0,a,d,"Invalid value")},cM:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.ak(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.ak(b,a,c,"end",f))
return b}}},
eK:{
"^":"a6;e,j:f>,a,b,c,d",
gaS:function(){return"RangeError"},
gaR:function(){P.bp(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dL(this.b,0)?": index must not be negative":z},
static:{bt:function(a,b,c,d,e){var z=e!=null?e:J.at(b)
return new P.eK(b,z,!0,a,c,"Index out of range")}}},
N:{
"^":"D;a",
i:function(a){return"Unsupported operation: "+this.a}},
d9:{
"^":"D;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
al:{
"^":"D;a",
i:function(a){return"Bad state: "+this.a}},
I:{
"^":"D;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bp(z))+"."}},
cP:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gR:function(){return},
$isD:1},
ev:{
"^":"D;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hl:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eD:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aZ(b,"expando$values")
return z==null?null:H.aZ(z,this.bD())},
B:function(a,b,c){var z=H.aZ(b,"expando$values")
if(z==null){z=new P.a()
H.bE(b,"expando$values",z)}H.bE(z,this.bD(),c)},
bD:function(){var z,y
z=H.aZ(this,"expando$key")
if(z==null){y=$.co
$.co=y+1
z="expando$key$"+y
H.bE(this,"expando$key",z)}return z}},
eF:{
"^":"a;"},
p:{
"^":"aH;"},
"+int":0,
M:{
"^":"a;",
a9:function(a,b){return H.aX(this,b,H.K(this,"M",0),null)},
I:function(a,b){var z
for(z=this.gH(this);z.t();)b.$1(z.gC())},
bl:function(a,b){return P.by(this,b,H.K(this,"M",0))},
bk:function(a){return this.bl(a,!0)},
gj:function(a){var z,y
z=this.gH(this)
for(y=0;z.t();)++y
return y},
Y:function(a,b){var z,y,x
if(b<0)H.C(P.ak(b,0,null,"index",null))
for(z=this.gH(this),y=0;z.t();){x=z.gC()
if(b===y)return x;++y}throw H.e(P.bt(b,this,"index",null,y))},
i:function(a){return P.eW(this,"(",")")}},
eY:{
"^":"a;"},
j:{
"^":"a;",
$asj:null,
$isq:1},
"+List":0,
jt:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aH:{
"^":"a;"},
"+num":0,
a:{
"^":";",
n:function(a,b){return this===b},
gu:function(a){return H.a_(this)},
i:function(a){return H.b_(this)}},
a0:{
"^":"a;"},
W:{
"^":"a;"},
"+String":0,
bF:{
"^":"a;a5:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cQ:function(a,b,c){var z=J.bm(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gC())
while(z.t())}else{a+=H.b(z.gC())
for(;z.t();)a=a+c+H.b(z.gC())}return a}}},
cR:{
"^":"a;"}}],["","",,W,{
"^":"",
eu:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.F)},
a5:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dg:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dk:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.he(a)
if(!!J.l(z).$isO)return z
return}else return a},
A:function(a){var z=$.k
if(z===C.c)return a
return z.dG(a,!0)},
x:{
"^":"ay;",
$isx:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iI:{
"^":"x;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iK:{
"^":"x;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iL:{
"^":"x;",
gbb:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbc:function(a){return H.c(new W.r(a,"load",!1),[null])},
$isO:1,
$isf:1,
"%":"HTMLBodyElement"},
ce:{
"^":"x;k:height%,l:width%",
bo:function(a,b,c){return a.getContext(b,P.ie(c))},
cz:function(a,b,c,d,e,f,g){var z,y
z=P.aa(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bo(a,"webgl",z)
return y==null?this.bo(a,"experimental-webgl",z):y},
cw:function(a,b){return this.cz(a,!0,!0,!0,!0,!1,b)},
$isce:1,
"%":"HTMLCanvasElement"},
iN:{
"^":"aY;j:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iO:{
"^":"eL;j:length=",
bp:function(a,b){var z=this.df(a,b)
return z!=null?z:""},
df:function(a,b){if(W.eu(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.ey()+b)},
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eL:{
"^":"f+et;"},
et:{
"^":"a;",
gk:function(a){return this.bp(a,"height")},
gl:function(a){return this.bp(a,"width")}},
iP:{
"^":"aY;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iQ:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
ez:{
"^":"f;b2:bottom=,k:height=,O:left=,bi:right=,ad:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gl(a))+" x "+H.b(this.gk(a))},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
y=a.left
x=z.gO(b)
if(y==null?x==null:y===x){y=a.top
x=z.gad(b)
if(y==null?x==null:y===x){y=this.gl(a)
x=z.gl(b)
if(y==null?x==null:y===x){y=this.gk(a)
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gu:function(a){var z,y,x,w
z=J.G(a.left)
y=J.G(a.top)
x=J.G(this.gl(a))
w=J.G(this.gk(a))
return W.dg(W.a5(W.a5(W.a5(W.a5(0,z),y),x),w))},
gbm:function(a){return H.c(new P.J(a.left,a.top),[null])},
$isV:1,
$asV:I.bc,
"%":";DOMRectReadOnly"},
ay:{
"^":"aY;",
gK:function(a){return P.fi(C.a.F(a.offsetLeft),C.a.F(a.offsetTop),C.a.F(a.offsetWidth),C.a.F(a.offsetHeight),null)},
i:function(a){return a.localName},
cv:function(a){return a.getBoundingClientRect()},
gbb:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbc:function(a){return H.c(new W.r(a,"load",!1),[null])},
gc9:function(a){return H.c(new W.r(a,"mousedown",!1),[null])},
gca:function(a){return H.c(new W.r(a,"mouseenter",!1),[null])},
gcb:function(a){return H.c(new W.r(a,"mouseleave",!1),[null])},
gcc:function(a){return H.c(new W.r(a,"mousemove",!1),[null])},
gcd:function(a){return H.c(new W.r(a,"mouseout",!1),[null])},
gce:function(a){return H.c(new W.r(a,"mouseover",!1),[null])},
gcf:function(a){return H.c(new W.r(a,"mouseup",!1),[null])},
$isay:1,
$isf:1,
$isO:1,
"%":";Element"},
iR:{
"^":"x;k:height%,V:src},l:width%",
"%":"HTMLEmbedElement"},
iS:{
"^":"bq;ak:error=",
"%":"ErrorEvent"},
bq:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
O:{
"^":"f;",
d5:function(a,b,c,d){return a.addEventListener(b,H.ar(c,1),d)},
dw:function(a,b,c,d){return a.removeEventListener(b,H.ar(c,1),d)},
$isO:1,
"%":"MediaStream;EventTarget"},
ja:{
"^":"x;j:length=",
"%":"HTMLFormElement"},
jb:{
"^":"x;k:height%,V:src},l:width%",
"%":"HTMLIFrameElement"},
cq:{
"^":"x;k:height%,V:src},l:width%",
b7:function(a,b){return a.complete.$1(b)},
$iscq:1,
"%":"HTMLImageElement"},
jd:{
"^":"x;k:height%,V:src},l:width%",
$isay:1,
$isf:1,
$isO:1,
"%":"HTMLInputElement"},
fb:{
"^":"x;ak:error=,V:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bA:{
"^":"d8;",
gK:function(a){var z,y
if(!!a.offsetX)return H.c(new P.J(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.dk(a.target)).$isay)throw H.e(new P.N("offsetX is only supported on elements"))
z=W.dk(a.target)
y=H.c(new P.J(a.clientX,a.clientY),[null]).aH(0,J.ea(J.ed(z)))
return H.c(new P.J(J.ca(y.a),J.ca(y.b)),[null])}},
$isbA:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jr:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aY:{
"^":"O;",
i:function(a){var z=a.nodeValue
return z==null?this.cR(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
ju:{
"^":"x;k:height%,l:width%",
"%":"HTMLObjectElement"},
jx:{
"^":"x;V:src}",
"%":"HTMLScriptElement"},
jz:{
"^":"x;j:length=",
"%":"HTMLSelectElement"},
jA:{
"^":"x;V:src}",
"%":"HTMLSourceElement"},
jB:{
"^":"bq;ak:error=",
"%":"SpeechRecognitionError"},
bJ:{
"^":"f;",
$isa:1,
"%":"Touch"},
bK:{
"^":"d8;dL:changedTouches=",
$isbK:1,
$isa:1,
"%":"TouchEvent"},
jG:{
"^":"eN;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bt(b,a,null,null,null))
return a[b]},
B:function(a,b,c){throw H.e(new P.N("Cannot assign element of immutable List."))},
Y:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bJ]},
$isq:1,
$isaT:1,
$isaR:1,
"%":"TouchList"},
eM:{
"^":"f+bw;",
$isj:1,
$asj:function(){return[W.bJ]},
$isq:1},
eN:{
"^":"eM+eJ;",
$isj:1,
$asj:function(){return[W.bJ]},
$isq:1},
jH:{
"^":"x;V:src}",
"%":"HTMLTrackElement"},
d8:{
"^":"bq;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
da:{
"^":"fb;k:height%,l:width%",
$isda:1,
"%":"HTMLVideoElement"},
jL:{
"^":"O;",
$isf:1,
$isO:1,
"%":"DOMWindow|Window"},
jP:{
"^":"f;b2:bottom=,k:height=,O:left=,bi:right=,ad:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
y=a.left
x=z.gO(b)
if(y==null?x==null:y===x){y=a.top
x=z.gad(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gu:function(a){var z,y,x,w
z=J.G(a.left)
y=J.G(a.top)
x=J.G(a.width)
w=J.G(a.height)
return W.dg(W.a5(W.a5(W.a5(W.a5(0,z),y),x),w))},
gbm:function(a){return H.c(new P.J(a.left,a.top),[null])},
$isV:1,
$asV:I.bc,
"%":"ClientRect"},
jQ:{
"^":"aY;",
$isf:1,
"%":"DocumentType"},
jR:{
"^":"ez;",
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"DOMRect"},
jU:{
"^":"x;",
$isO:1,
$isf:1,
"%":"HTMLFrameSetElement"},
hk:{
"^":"a1;",
a3:function(a,b,c,d){var z=new W.z(0,this.a,this.b,W.A(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.D()
return z},
c7:function(a,b,c){return this.a3(a,null,b,c)}},
r:{
"^":"hk;a,b,c"},
z:{
"^":"fr;a,b,c,d,e",
b4:function(){if(this.b==null)return
this.bW()
this.b=null
this.d=null
return},
bf:function(a,b){if(this.b==null)return;++this.a
this.bW()},
ao:function(a){return this.bf(a,null)},
cl:function(){if(this.b==null||this.a<=0)return;--this.a
this.D()},
D:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dM(x,this.c,z,this.e)}},
bW:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dN(x,this.c,z,this.e)}}},
eJ:{
"^":"a;",
gH:function(a){return new W.eE(a,this.gj(a),-1,null)},
$isj:1,
$asj:null,
$isq:1},
eE:{
"^":"a;a,b,c,d",
t:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c1(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gC:function(){return this.d}},
hd:{
"^":"a;a",
$isO:1,
$isf:1,
static:{he:function(a){if(a===window)return a
else return new W.hd(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iG:{
"^":"a8;",
$isf:1,
"%":"SVGAElement"},
iH:{
"^":"fB;",
$isf:1,
"%":"SVGAltGlyphElement"},
iJ:{
"^":"n;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iT:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEBlendElement"},
iU:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iV:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEComponentTransferElement"},
iW:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFECompositeElement"},
iX:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
iY:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
iZ:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
j_:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEFloodElement"},
j0:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
j1:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEImageElement"},
j2:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEMergeElement"},
j3:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEMorphologyElement"},
j4:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFEOffsetElement"},
j5:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFESpecularLightingElement"},
j6:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFETileElement"},
j7:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFETurbulenceElement"},
j8:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGFilterElement"},
j9:{
"^":"a8;k:height=,l:width=",
"%":"SVGForeignObjectElement"},
eI:{
"^":"a8;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
a8:{
"^":"n;",
$isf:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jc:{
"^":"a8;k:height=,l:width=",
$isf:1,
"%":"SVGImageElement"},
jg:{
"^":"n;",
$isf:1,
"%":"SVGMarkerElement"},
jh:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGMaskElement"},
jv:{
"^":"n;k:height=,l:width=",
$isf:1,
"%":"SVGPatternElement"},
jw:{
"^":"eI;k:height=,l:width=",
"%":"SVGRectElement"},
jy:{
"^":"n;",
$isf:1,
"%":"SVGScriptElement"},
n:{
"^":"ay;",
gbb:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbc:function(a){return H.c(new W.r(a,"load",!1),[null])},
gc9:function(a){return H.c(new W.r(a,"mousedown",!1),[null])},
gca:function(a){return H.c(new W.r(a,"mouseenter",!1),[null])},
gcb:function(a){return H.c(new W.r(a,"mouseleave",!1),[null])},
gcc:function(a){return H.c(new W.r(a,"mousemove",!1),[null])},
gcd:function(a){return H.c(new W.r(a,"mouseout",!1),[null])},
gce:function(a){return H.c(new W.r(a,"mouseover",!1),[null])},
gcf:function(a){return H.c(new W.r(a,"mouseup",!1),[null])},
$isO:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jD:{
"^":"a8;k:height=,l:width=",
$isf:1,
"%":"SVGSVGElement"},
jE:{
"^":"n;",
$isf:1,
"%":"SVGSymbolElement"},
cT:{
"^":"a8;",
"%":";SVGTextContentElement"},
jF:{
"^":"cT;",
$isf:1,
"%":"SVGTextPathElement"},
fB:{
"^":"cT;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jI:{
"^":"a8;k:height=,l:width=",
$isf:1,
"%":"SVGUseElement"},
jJ:{
"^":"n;",
$isf:1,
"%":"SVGViewElement"},
jT:{
"^":"n;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jV:{
"^":"n;",
$isf:1,
"%":"SVGCursorElement"},
jW:{
"^":"n;",
$isf:1,
"%":"SVGFEDropShadowElement"},
jX:{
"^":"n;",
$isf:1,
"%":"SVGGlyphRefElement"},
jY:{
"^":"n;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
fl:{
"^":"f;",
dE:function(a,b,c){return a.bindBuffer(b,c)},
dF:function(a,b,c){return a.bindTexture(b,c)},
dH:function(a,b){return a.blendEquation(b)},
dI:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dJ:function(a,b,c,d){return a.bufferData(b,c,d)},
dM:function(a,b){return a.clear(b)},
dN:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dO:function(a,b){return a.clearDepth(b)},
dP:function(a,b){return a.clearStencil(b)},
dR:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dW:function(a){return a.createBuffer()},
dX:function(a){return a.createProgram()},
dY:function(a,b){return a.createShader(b)},
dZ:function(a){return a.createTexture()},
e_:function(a,b){return a.depthFunc(b)},
e0:function(a,b){return a.depthMask(b)},
e7:function(a,b){return a.disableVertexAttribArray(b)},
e8:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
e9:function(a,b){return a.enable(b)},
ea:function(a,b){return a.enableVertexAttribArray(b)},
cu:function(a,b,c){return a.getAttribLocation(b,c)},
cB:function(a,b){return a.getParameter(b)},
cD:function(a,b,c){return a.getUniformLocation(b,c)},
cN:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cO:function(a,b,c,d){return a.stencilOp(b,c,d)},
eF:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.ih(g))
return}z=J.l(g)
if(!!z.$iscq)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isce)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isda)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aN("Incorrect number or type of arguments"))},
eE:function(a,b,c,d,e,f,g){return this.eF(a,b,c,d,e,f,g,null,null,null)},
eG:function(a,b,c,d){return a.texParameteri(b,c,d)},
eK:function(a,b){return a.useProgram(b)},
eL:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iM:{
"^":"a;"}}],["","",,P,{
"^":"",
an:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dh:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
J:{
"^":"a;v:a>,A:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
n:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.J))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gu:function(a){var z,y
z=J.G(this.a)
y=J.G(this.b)
return P.dh(P.an(P.an(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gv(b)
if(typeof z!=="number")return z.m()
x=C.a.m(z,x)
z=this.b
y=y.gA(b)
if(typeof z!=="number")return z.m()
y=new P.J(x,C.a.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aH:function(a,b){var z,y,x,w
z=this.a
y=J.ec(b)
if(typeof z!=="number")return z.aH()
if(typeof y!=="number")return H.o(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aH()
if(typeof w!=="number")return H.o(w)
w=new P.J(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hN:{
"^":"a;",
gbi:function(a){return this.gO(this)+this.c},
gb2:function(a){return this.gad(this)+this.d},
i:function(a){return"Rectangle ("+this.gO(this)+", "+this.b+") "+this.c+" x "+this.d},
n:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
if(this.gO(this)===z.gO(b)){y=this.b
z=y===z.gad(b)&&this.a+this.c===z.gbi(b)&&y+this.d===z.gb2(b)}else z=!1
return z},
gu:function(a){var z=this.b
return P.dh(P.an(P.an(P.an(P.an(0,this.gO(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbm:function(a){var z=new P.J(this.gO(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
V:{
"^":"hN;O:a>,ad:b>,l:c>,k:d>",
$asV:null,
static:{fi:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.c(new P.V(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
m:function(a){return a},
b9:function(a){return a},
cA:{
"^":"f;",
$iscA:1,
"%":"ArrayBuffer"},
bD:{
"^":"f;",
$isbD:1,
"%":"DataView;ArrayBufferView;bB|cB|cD|bC|cC|cE|Z"},
bB:{
"^":"bD;",
gj:function(a){return a.length},
$isaT:1,
$isaR:1},
bC:{
"^":"cD;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
return a[b]},
B:function(a,b,c){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
a[b]=c}},
cB:{
"^":"bB+bw;",
$isj:1,
$asj:function(){return[P.bi]},
$isq:1},
cD:{
"^":"cB+cp;"},
Z:{
"^":"cE;",
B:function(a,b,c){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.p]},
$isq:1},
cC:{
"^":"bB+bw;",
$isj:1,
$asj:function(){return[P.p]},
$isq:1},
cE:{
"^":"cC+cp;"},
ji:{
"^":"bC;",
$isj:1,
$asj:function(){return[P.bi]},
$isq:1,
"%":"Float32Array"},
jj:{
"^":"bC;",
$isj:1,
$asj:function(){return[P.bi]},
$isq:1,
"%":"Float64Array"},
jk:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Int16Array"},
jl:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Int32Array"},
jm:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Int8Array"},
jn:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Uint16Array"},
jo:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Uint32Array"},
jp:{
"^":"Z;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jq:{
"^":"Z;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dF:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
ie:function(a){var z={}
a.I(0,new P.ig(z))
return z},
ih:function(a){return a},
cl:function(){var z=$.ck
if(z==null){z=J.bk(window.navigator.userAgent,"Opera",0)
$.ck=z}return z},
ey:function(){var z,y
z=$.ch
if(z!=null)return z
y=$.ci
if(y==null){y=J.bk(window.navigator.userAgent,"Firefox",0)
$.ci=y}if(y===!0)z="-moz-"
else{y=$.cj
if(y==null){y=P.cl()!==!0&&J.bk(window.navigator.userAgent,"Trident/",0)
$.cj=y}if(y===!0)z="-ms-"
else z=P.cl()===!0?"-o-":"-webkit-"}$.ch=z
return z},
ig:{
"^":"d:18;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
k1:[function(){var z,y,x,w
z=new G.fI(700,500,P.aV(),P.aV())
y=new E.R(new Float64Array(H.m(16)))
y.U()
x=new F.fJ(400,300,1,1,1,0,0,null,!0,"none",null,y,!1)
x.b=[]
x.ch=F.b2(255,238,238,255)
y=new E.R(new Float64Array(H.m(16)))
y.U()
w=new G.fT(null,0,0,!1,0,z,!1,!1,!1,0,null,!1,!1,[y])
w.a=G.fP(400,600)
w.seB(x)
w.ev()
w.eJ()
w.x=!0
if(!w.d){w.d=!0
w.as()}x.ax(D.ff(z))},"$0","dD",0,0,1]},1],["","",,F,{
"^":"",
cv:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.ah)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.b_(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
a2:{
"^":"a;a",
i:function(a){return C.G.h(0,this.a)}},
fG:{
"^":"a;"},
cW:{
"^":"a;",
ax:function(a){var z=0,y=new P.av(),x=1,w,v=this,u,t,s,r
function $async$ax(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.c(new s.E(0,r.k,null),[null])
t=u
t.aM(null)
z=2
return H.w(u,$async$ax,y)
case 2:t=v
t=t.b
t.push(a)
return H.w(null,0,y,null)
case 1:return H.w(w,1,y)}}return H.w(null,$async$ax,y,null)},
c4:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.ah)(z),++x)z[x].c4(a)},
cg:function(a,b){},
cp:function(a,b){var z,y,x
this.b8()
this.cg(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.ah)(z),++x)z[x].cp(a,b)},
bd:function(a,b){},
be:["cS",function(a,b){var z,y,x,w,v,u
this.b8()
this.bd(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.ah)(z),++w){v=z[w]
u=v.c
x.push(C.b.ga8(x).p(0,u))
b.aE()
v.be(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aE()}}],
eI:["cT",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b8()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.cj(v.c)
u=v.eI(a,b,c,d,e)
a.ci()
if(u)return!0}t=a.cA().b6(0)
t.eo()
y=new E.t(new Float64Array(H.m(3)))
y.w(d,e,0)
s=t.p(0,y)
s.gv(s)
s.gA(s)
return!1}],
b8:function(){if(!this.d)this.d=!0}},
fH:{
"^":"a;",
az:function(a){var z=0,y=new P.av(),x,w=2,v,u=this,t,s,r,q
function $async$az(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.ai(a)?3:4
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
return H.w(q.aA(a),$async$az,y)
case 5:s.B(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.w(x,0,y,null)
case 2:return H.w(v,1,y)}}return H.w(null,$async$az,y,null)}},
u:{
"^":"a;a,b,E:c<,J:d<",
n:function(a,b){if(b==null)return!1
return b instanceof F.u&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gu:function(a){return F.cv([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+this.a+", y:"+this.b+", w:"+H.b(this.c)+", h:"+H.b(this.d)}},
fL:{
"^":"a;a",
i:function(a){return C.H.h(0,this.a)}},
fK:{
"^":"a;a,b,c",
d0:function(a){if(this.a==null)this.a=F.b2(255,255,255,255)},
static:{b3:function(a){var z=new F.fK(a,C.r,1)
z.d0(a)
return z}}},
cV:{
"^":"a;a",
n:function(a,b){if(b==null)return!1
return b instanceof F.cV&&b.a===this.a},
gu:function(a){return F.cv([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
d_:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{b2:function(a,b,c,d){var z=new F.cV(0)
z.d_(a,b,c,d)
return z}}},
bH:{
"^":"a;"},
fJ:{
"^":"cW;E:e<,J:f<,r,x,y,z,Q,ch,cx,a,b,c,d",
cg:function(a,b){var z,y,x,w
z=this.e
y=(a.gE()-a.gew(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.R(new Float64Array(H.m(16)))
y.U()
this.c=y
y.cq(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bq(0,z,z,1)},
be:function(a,b){var z,y
z=new F.u(0,0,this.e,this.f)
y=this.cx
if(y){b.b.push(z)
b.b5(a,z)}this.cS(a,b)
if(y){y=b.b
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.b5(a,C.b.ga8(y))
else{y=a.a
b.b5(a,new F.u(0,0,y.c,y.d))}}},
bd:function(a,b){var z=F.b3(null)
z.a=this.ch
b.c1(a,new F.u(0,0,this.e,this.f),z)}},
b4:{
"^":"a;a",
i:function(a){return C.I.h(0,this.a)}},
fM:{
"^":"a;",
seB:function(a){this.c$=a},
eq:function(a){if(!this.e$){this.c$.c4(this)
this.e$=!0}this.c$.cp(this,a)
this.eu()},
er:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.ga8(y).p(0,z))
b.aE()
this.c$.be(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
b.aE()},
Z:function(a,b,c,d,e){a.cj(this.c$.c)
this.c$.cT(a,b,c,d,e)
a.ci()},
cj:function(a){var z=this.f$
z.push(C.b.ga8(z).p(0,a))},
ci:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cA:function(){return C.b.ga8(this.f$)}}}],["","",,G,{
"^":"",
bI:function(a){var z=0,y=new P.av(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bI(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.c(new p.dc(o.c(new n.E(0,m.k,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.ei(t,a)
q=J
s=q.i(t)
q=s
r=q.gbc(t)
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
m=m.A(new l.fR(u,t))
l=r
p=new p.z(0,o,n,m,l.c)
o=H
q=q.c(p,[o.v(r,0)])
q.D()
q=s
s=q.gbb(t)
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
m=m.A(new l.fS(a,u))
l=s
p=new p.z(0,o,n,m,l.c)
o=H
q=q.c(p,[o.v(s,0)])
q.D()
q=u
x=q.a
z=1
break
case 1:return H.w(x,0,y,null)
case 2:return H.w(v,1,y)}}return H.w(null,$async$bI,y,null)},
cX:function(a,b,c){var z,y
z=J.dX(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
fQ:{
"^":"bH;a,b",
gE:function(){return J.eb(this.a)},
gJ:function(){return J.e2(this.a)},
cC:function(a){var z
if(this.b==null){z=J.i(a).dZ(a)
this.b=z
a.bindTexture(3553,z)
C.K.eE(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
fO:{
"^":"a;a,b,c,k:d>",
d1:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.ab(b)
y=C.d.ab(a)
x=document.createElement("canvas",null)
J.ej(x,z)
J.eh(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.ee(this.b,!0)},
static:{fP:function(a,b){var z=new G.fO(null,null,null,null)
z.d1(a,b)
return z}}},
fI:{
"^":"fH;l:c>,k:d>,a,b",
aA:function(a){var z=0,y=new P.av(),x,w=2,v,u,t
function $async$aA(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.w(t.bI(a),$async$aA,y)
case 3:x=new u.fQ(c,null)
z=1
break
case 1:return H.w(x,0,y,null)
case 2:return H.w(v,1,y)}}return H.w(null,$async$aA,y,null)}},
fN:{
"^":"fG;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
ej:function(){var z,y,x,w,v,u
P.aI("#[A]# "+H.b(J.c7(this.d,35660)))
P.aI("#[B]# "+H.b(J.c7(this.d,33901)))
z=C.b.c5(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.c5(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.cX(x,35633,z)
v=G.cX(x,35632,y)
u=J.dW(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
T:function(a){this.r=1
this.ch=-0.5
J.c5(this.d,2960)
J.dY(this.d,515)
J.dS(this.d,0,0,0,1)
J.dT(this.d,1)
J.dU(this.d,0)
J.c5(this.d,3042)
switch(-1){case-1:J.dO(this.d,32774)
J.dP(this.d,770,771,770,32772)
break}J.dR(this.d,17664)
C.b.sj(this.x,0)
C.b.sj(this.y,0)
C.b.sj(this.z,0)
this.Q=null},
ay:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.x
if(z.length!==0){y=this.y
F.b2(170,255,170,170)
J.cb(this.d,this.f)
x=J.aK(this.d,this.f,"a_tex")
w=J.bl(this.d)
J.bj(this.d,34962,w)
v=this.z
J.dQ(this.d,34962,new Float32Array(H.b9(v)),35044)
J.aJ(this.d,x)
J.aM(this.d,x,2,5126,!1,0,0)
u=this.Q
if(u!=null){t=u.cC(this.d)
J.c2(this.d,3553,t)
J.aL(this.d,3553,10242,33071)
J.aL(this.d,3553,10243,33071)
J.aL(this.d,3553,10241,9728)
J.aL(this.d,3553,10240,9728)}u=this.d
s=J.bl(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.b9(z)),35044)
u.bindBuffer(34962,null)
J.bj(this.d,34962,s)
u=this.d
s=J.bl(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.b9(y)),35044)
u.bindBuffer(34963,null)
J.bj(this.d,34963,s)
u=this.d
u.uniformMatrix4fv(J.ef(u,this.f,"u_mat"),!1,new Float32Array(H.b9(this.cx.a)))
r=J.aK(this.d,this.f,"color")
q=J.aK(this.d,this.f,"vp")
p=J.aK(this.d,this.f,"useTex")
J.aM(this.d,q,3,5126,!1,32,0)
J.aM(this.d,r,4,5126,!1,32,12)
J.aM(this.d,p,1,5126,!1,32,28)
J.aJ(this.d,q)
J.aJ(this.d,r)
J.aJ(this.d,p)
J.e_(this.d,4,y.length,5123,0)
if(x!==0){J.dZ(this.d,x)
J.c2(this.d,3553,null)}J.cb(this.d,null)
C.b.sj(z,0)
C.b.sj(y,0)
C.b.sj(v,0)
this.Q=null}},
c1:function(a,b,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=b.a
y=b.b
x=b.c
w=b.d
if(a0.b===C.r){v=this.b3()
u=z+x
t=y+w
x=new E.t(new Float64Array(H.m(3)))
x.w(z,y,0)
s=v.p(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.w(z,t,0)
r=v.p(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.w(u,y,0)
q=v.p(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.w(u,t,0)
p=v.p(0,x)
x=a0.a.a
this.ag(a,s,r,q,p,(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255)}else{v=this.b3()
o=a0.c
n=o/2
m=z+n
l=y+n
u=z+x-n
t=y+w-n
n=new E.t(new Float64Array(H.m(3)))
n.w(m,l,0)
s=v.p(0,n)
n=m-o
w=l-o
x=new E.t(new Float64Array(H.m(3)))
x.w(n,w,0)
k=v.p(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.w(m,t,0)
r=v.p(0,x)
x=t+o
j=new E.t(new Float64Array(H.m(3)))
j.w(n,x,0)
i=v.p(0,j)
j=new E.t(new Float64Array(H.m(3)))
j.w(u,l,0)
q=v.p(0,j)
o=u+o
j=new E.t(new Float64Array(H.m(3)))
j.w(o,w,0)
h=v.p(0,j)
j=new E.t(new Float64Array(H.m(3)))
j.w(u,t,0)
p=v.p(0,j)
j=new E.t(new Float64Array(H.m(3)))
j.w(o,x,0)
g=v.p(0,j)
j=a0.a.a
f=(j>>>16&255)/255
e=(j>>>8&255)/255
d=(j>>>0&255)/255
c=(j>>>24&255)/255
this.ag(a,k,i,s,r,f,e,d,c)
this.ag(a,i,g,r,p,f,e,d,c)
this.ag(a,g,h,p,q,f,e,d,c)
this.ag(a,h,k,q,s,f,e,d,c)}},
ag:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.x
y=z.length/8|0
C.b.G(z,[b.gv(b),b.gA(b),this.ch,f,g,h,i,-1,c.gv(c),c.gA(c),this.ch,f,g,h,i,-1,d.gv(d),d.gA(d),this.ch,f,g,h,i,-1,e.gv(e),e.gA(e),this.ch,f,g,h,i,-1])
C.b.G(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.b.G(this.y,[y,z,x,z,y+3,x])},
b5:function(a,b){var z
this.ay(0)
J.c3(this.d,!1,!1,!1,!1)
J.c4(this.d,!1)
J.c9(this.d,7680,7681,7681)
J.c8(this.d,519,this.r,255)
z=F.b3(null)
z.a=F.b2(255,255,255,255)
this.c1(null,b,z)
this.ay(0)
J.c3(this.d,!0,!0,!0,!0)
J.c4(this.d,!0)
J.c9(this.d,7680,7680,7680)
J.c8(this.d,515,this.r,255);++this.r},
X:function(a,b,c,d,e,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.Q
if(z!=null&&!J.X(z,b))this.ay(0)
this.Q=b
z=c.a
y=b.gE()
if(typeof y!=="number")return H.o(y)
x=z/y
y=c.b
w=this.Q.gJ()
if(typeof w!=="number")return H.o(w)
v=y/w
w=this.Q.gE()
if(typeof w!=="number")return H.o(w)
u=(z+c.c)/w
w=this.Q.gJ()
if(typeof w!=="number")return H.o(w)
t=(y+c.d)/w
z=this.z
switch(a0){case C.j:C.b.G(z,[x,v,x,t,u,v,u,t])
break
case C.k:C.b.G(z,[x,t,u,t,x,v,u,v])
break
case C.l:C.b.G(z,[u,t,u,v,x,t,x,v])
break
case C.m:C.b.G(z,[u,v,x,v,u,t,x,t])
break
case C.n:C.b.G(z,[u,v,u,t,x,v,x,t])
break
case C.o:C.b.G(z,[x,v,u,v,x,t,u,t])
break
case C.p:C.b.G(z,[x,t,x,v,u,t,u,v])
break
case C.q:C.b.G(z,[u,t,x,t,u,v,x,v])
break
default:C.b.G(z,[x,v,x,t,u,v,u,t])}s=this.b3()
r=d.a
q=d.b
p=r+d.c
o=q+d.d
z=new E.t(new Float64Array(H.m(3)))
z.w(r,q,0)
n=s.p(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.w(r,o,0)
m=s.p(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.w(p,q,0)
l=s.p(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.w(p,o,0)
k=s.p(0,z)
z=this.x
j=z.length/8|0
y=e.a.a
i=(y>>>16&255)/255
h=(y>>>8&255)/255
g=(y>>>0&255)/255
f=(y>>>24&255)/255
C.b.G(z,[n.gv(n),n.gA(n),this.ch,i,h,g,f,1,m.gv(m),m.gA(m),this.ch,i,h,g,f,1,l.gv(l),l.gA(l),this.ch,i,h,g,f,1,k.gv(k),k.gA(k),this.ch,i,h,g,f,1])
this.ch+=0.0001
z=j+1
y=j+2
C.b.G(this.y,[j,z,y,z,j+3,y])},
aE:function(){},
b3:function(){var z,y
this.cy.U()
z=this.cy.cq(0,-1,1,0)
this.cy=z
y=this.e
y=z.bq(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.p(0,C.b.ga8(this.a))
this.cy=y
return y}},
fT:{
"^":"fc;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gE:function(){return this.a.c},
gJ:function(){return this.a.d},
gew:function(a){return 0},
eu:function(){this.r=!0},
as:function(){var z=0,y=new P.av(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
function $async$as(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cH(new h.cg(Date.now(),!1))
i=v
t=i.a
i=E
i=i
h=Float64Array
g=H
s=new i.R(new h(g.m(16)))
i=s
i.U()
i=E
i=i
h=Float64Array
g=H
r=new i.R(new h(g.m(16)))
i=r
i.U()
i=E
i=i
h=Float64Array
g=H
q=new i.R(new h(g.m(16)))
i=q
i.U()
i=G
p=new i.fN(10,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.ej()
i=p
i.T(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return H.w(i.eG(new h.ax(15e3),null,null),$async$as,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.eq(h.ab(u+k))
o+=k
n+=k
if(k<0);else ;++m
i=v
i.r=!0
z=n>40?6:7
break
case 6:i=p
i.T(0)
i=v
i.er(v,p)
i=p
i.ay(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.cW(o,m)
i=H
i.dF(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return H.w(null,0,y,null)
case 1:return H.w(w,1,y)}}return H.w(null,$async$as,y,null)},
eJ:function(){var z,y,x,w
z=P.aV()
y=new G.h1(this,z)
x=new G.h0(this,z)
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchcancel",!1),[null])
H.c(new W.z(0,w.a,w.b,W.A(x),w.c),[H.v(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchend",!1),[null])
H.c(new W.z(0,w.a,w.b,W.A(x),w.c),[H.v(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchenter",!1),[null])
H.c(new W.z(0,w.a,w.b,W.A(y),w.c),[H.v(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchleave",!1),[null])
H.c(new W.z(0,w.a,w.b,W.A(y),w.c),[H.v(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchmove",!1),[null])
H.c(new W.z(0,w.a,w.b,W.A(y),w.c),[H.v(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchstart",!1),[null])
H.c(new W.z(0,w.a,w.b,W.A(y),w.c),[H.v(w,0)]).D()},
ev:function(){var z,y
z={}
z.a=!1
y=J.e3(this.a.b)
H.c(new W.z(0,y.a,y.b,W.A(new G.fU(z,this)),y.c),[H.v(y,0)]).D()
y=J.e9(this.a.b)
H.c(new W.z(0,y.a,y.b,W.A(new G.fV(z,this)),y.c),[H.v(y,0)]).D()
y=J.e4(this.a.b)
H.c(new W.z(0,y.a,y.b,W.A(new G.fW(z,this)),y.c),[H.v(y,0)]).D()
y=J.e5(this.a.b)
H.c(new W.z(0,y.a,y.b,W.A(new G.fX(z,this)),y.c),[H.v(y,0)]).D()
y=J.e6(this.a.b)
H.c(new W.z(0,y.a,y.b,W.A(new G.fY(z,this)),y.c),[H.v(y,0)]).D()
y=J.e7(this.a.b)
H.c(new W.z(0,y.a,y.b,W.A(new G.fZ(z,this)),y.c),[H.v(y,0)]).D()
y=J.e8(this.a.b)
H.c(new W.z(0,y.a,y.b,W.A(new G.h_(z,this)),y.c),[H.v(y,0)]).D()}},
fc:{
"^":"a+fM;"},
h1:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c6(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.ah)(y),++v){u=y[v]
t=C.a.F(u.pageX)
s=C.a.F(u.pageY)
new P.J(t,s).$builtinTypeInfo=[null]
r=t-C.a.F(z.a.b.offsetLeft)
t=C.a.F(u.pageX)
s=C.a.F(u.pageY)
new P.J(t,s).$builtinTypeInfo=[null]
q=s-C.a.F(z.a.b.offsetTop)
t=w.ai(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.m()
z.Z(z,s+1,C.w,r,q)}else{w.B(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.m()
z.Z(z,t+1,C.v,r,q)}}}},
h0:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c6(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.ah)(y),++v){u=y[v]
if(w.ai(u.identifier)){t=C.a.F(u.pageX)
s=C.a.F(u.pageY)
new P.J(t,s).$builtinTypeInfo=[null]
s=C.a.F(z.a.b.offsetLeft)
r=C.a.F(u.pageX)
q=C.a.F(u.pageY)
new P.J(r,q).$builtinTypeInfo=[null]
r=C.a.F(z.a.b.offsetTop)
w.aa(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.m()
z.Z(z,p+1,C.u,t-s,q-r)}}}},
fU:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gK(a)
x=x.gv(x)
x.toString
y=y.gK(a)
y=y.gA(y)
y.toString
z.Z(z,0,C.v,x,y)}}},
fV:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gK(a)
w=w.gv(w)
w.toString
x=x.gK(a)
x=x.gA(x)
x.toString
z.Z(z,0,C.u,w,x)
y.a=!1}}}},
fW:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fX:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gK(a)
w=w.gv(w)
w.toString
x=x.gK(a)
x=x.gA(x)
x.toString
z.Z(z,0,C.t,w,x)
y.a=!1}}}},
fY:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gK(a)
x=x.gv(x)
x.toString
y=y.gK(a)
y=y.gA(y)
y.toString
z.Z(z,0,C.w,x,y)}}},
fZ:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gK(a)
w=w.gv(w)
w.toString
x=x.gK(a)
x=x.gA(x)
x.toString
z.Z(z,0,C.t,w,x)
y.a=!1}}}},
h_:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fR:{
"^":"d:2;a,b",
$1:function(a){this.a.b7(0,this.b)}},
fS:{
"^":"d:2;a,b",
$1:function(a){this.b.dS("failed to load image "+this.a)}}}],["","",,D,{
"^":"",
fe:{
"^":"cW;e,f,a,b,c,d",
bd:function(a,b){var z,y,x,w
if(this.f==null)return
z=F.b3(null)
y=this.f
x=y.gE()
if(typeof x!=="number")return H.o(x)
w=this.f.gJ()
if(typeof w!=="number")return H.o(w)
b.X(a,y,new F.u(0,0,x,w),new F.u(0,50,40,40),z,C.j)
w=this.f
x=w.gE()
if(typeof x!=="number")return H.o(x)
y=this.f.gJ()
if(typeof y!=="number")return H.o(y)
b.X(a,w,new F.u(0,0,x,y),new F.u(0,100,40,40),z,C.k)
y=this.f
x=y.gE()
if(typeof x!=="number")return H.o(x)
w=this.f.gJ()
if(typeof w!=="number")return H.o(w)
b.X(a,y,new F.u(0,0,x,w),new F.u(0,150,40,40),z,C.l)
w=this.f
x=w.gE()
if(typeof x!=="number")return H.o(x)
y=this.f.gJ()
if(typeof y!=="number")return H.o(y)
b.X(a,w,new F.u(0,0,x,y),new F.u(0,200,40,40),z,C.m)
z=F.b3(null)
y=this.f
x=y.gE()
if(typeof x!=="number")return H.o(x)
w=this.f.gJ()
if(typeof w!=="number")return H.o(w)
b.X(a,y,new F.u(0,0,x,w),new F.u(100,50,40,40),z,C.n)
w=this.f
x=w.gE()
if(typeof x!=="number")return H.o(x)
y=this.f.gJ()
if(typeof y!=="number")return H.o(y)
b.X(a,w,new F.u(0,0,x,y),new F.u(100,100,40,40),z,C.o)
y=this.f
x=y.gE()
if(typeof x!=="number")return H.o(x)
w=this.f.gJ()
if(typeof w!=="number")return H.o(w)
b.X(a,y,new F.u(0,0,x,w),new F.u(100,150,40,40),z,C.p)
w=this.f
x=w.gE()
if(typeof x!=="number")return H.o(x)
y=this.f.gJ()
if(typeof y!=="number")return H.o(y)
b.X(a,w,new F.u(0,0,x,y),new F.u(100,200,40,40),z,C.q)},
cY:function(a){this.e.az("assets/icon.png").eH(new D.fg(this))},
static:{ff:function(a){var z=new E.R(new Float64Array(H.m(16)))
z.U()
z=new D.fe(a,null,"none",null,z,!1)
z.b=[]
z.cY(a)
return z}}},
fg:{
"^":"d:19;a",
$1:function(a){this.a.f=a}}}],["","",,E,{
"^":"",
R:{
"^":"a;a",
ae:function(a){var z,y
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
i:function(a){return"[0] "+this.ar(0).i(0)+"\n[1] "+this.ar(1).i(0)+"\n[2] "+this.ar(2).i(0)+"\n[3] "+this.ar(3).i(0)+"\n"},
ge6:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
B:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
ar:function(a){var z,y,x
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
return new E.a3(z)},
b6:function(a){var z=new E.R(new Float64Array(H.m(16)))
z.ae(this)
return z},
p:function(a,b){var z,y,x
if(!!b.$isa3){z=new Float64Array(H.m(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a3(z)}if(!!b.$ist){z=new Float64Array(H.m(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.t(z)}if(4===b.ge6()){z=new Float64Array(H.m(16))
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
return new E.R(z)}throw H.e(P.aN(b))},
m:function(a,b){var z,y
z=new Float64Array(H.m(16))
y=this.a
z[0]=C.a.m(y[0],b.gq().h(0,0))
z[1]=C.a.m(y[1],b.gq().h(0,1))
z[2]=C.a.m(y[2],b.gq().h(0,2))
z[3]=C.a.m(y[3],b.gq().h(0,3))
z[4]=C.a.m(y[4],b.gq().h(0,4))
z[5]=C.a.m(y[5],b.gq().h(0,5))
z[6]=C.a.m(y[6],b.gq().h(0,6))
z[7]=C.a.m(y[7],b.gq().h(0,7))
z[8]=C.a.m(y[8],b.gq().h(0,8))
z[9]=C.a.m(y[9],b.gq().h(0,9))
z[10]=C.a.m(y[10],b.gq().h(0,10))
z[11]=C.a.m(y[11],b.gq().h(0,11))
z[12]=C.a.m(y[12],b.gq().h(0,12))
z[13]=C.a.m(y[13],b.gq().h(0,13))
z[14]=C.a.m(y[14],b.gq().h(0,14))
z[15]=C.a.m(y[15],b.gq().h(0,15))
return new E.R(z)},
cq:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isa3
x=y?b.gE():1
if(!!z.$ist||y){w=z.gv(b)
v=z.gA(b)
u=z.geM(b)}else{u=d
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
bq:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isa3
x=y?b.gE():1
if(!!z.$ist||y){w=z.gv(b)
v=z.gA(b)
u=z.geM(b)}else{u=d
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
U:function(){var z=this.a
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
eo:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
"^":"a;a",
w:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ae:function(a){var z,y
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
y=C.a.m(z[0],b.gq().h(0,0))
x=C.a.m(z[1],b.gq().h(0,1))
z=C.a.m(z[2],b.gq().h(0,2))
w=new E.t(new Float64Array(H.m(3)))
w.w(y,x,z)
return w},
p:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.o(b)
x=z[1]
z=z[2]
w=new E.t(new Float64Array(H.m(3)))
w.w(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
B:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dw(y*y+x*x+z*z))},
b6:function(a){var z=new E.t(new Float64Array(H.m(3)))
z.ae(this)
return z},
gv:function(a){return this.a[0]},
gA:function(a){return this.a[1]}},
a3:{
"^":"a;a",
bs:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ae:function(a){var z,y
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
y=C.a.m(z[0],b.gq().h(0,0))
x=C.a.m(z[1],b.gq().h(0,1))
w=C.a.m(z[2],b.gq().h(0,2))
z=C.a.m(z[3],b.gq().h(0,3))
v=new E.a3(new Float64Array(H.m(4)))
v.bs(y,x,w,z)
return v},
p:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.o(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a3(new Float64Array(H.m(4)))
v.bs(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
B:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dw(y*y+x*x+w*w+z*z))},
b6:function(a){var z=new E.a3(new Float64Array(H.m(4)))
z.ae(this)
return z},
gv:function(a){return this.a[0]},
gA:function(a){return this.a[1]},
gE:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ct.prototype
return J.f_.prototype}if(typeof a=="string")return J.aS.prototype
if(a==null)return J.f0.prototype
if(typeof a=="boolean")return J.eZ.prototype
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bd(a)}
J.P=function(a){if(typeof a=="string")return J.aS.prototype
if(a==null)return a
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bd(a)}
J.aG=function(a){if(a==null)return a
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bd(a)}
J.dz=function(a){if(typeof a=="number")return J.aA.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bL.prototype
return a}
J.ii=function(a){if(typeof a=="number")return J.aA.prototype
if(typeof a=="string")return J.aS.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bL.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bd(a)}
J.as=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ii(a).m(a,b)}
J.X=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).n(a,b)}
J.dL=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dz(a).aF(a,b)}
J.c1=function(a,b){if(a.constructor==Array||typeof a=="string"||H.ix(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.P(a).h(a,b)}
J.dM=function(a,b,c,d){return J.i(a).d5(a,b,c,d)}
J.dN=function(a,b,c,d){return J.i(a).dw(a,b,c,d)}
J.bj=function(a,b,c){return J.i(a).dE(a,b,c)}
J.c2=function(a,b,c){return J.i(a).dF(a,b,c)}
J.dO=function(a,b){return J.i(a).dH(a,b)}
J.dP=function(a,b,c,d,e){return J.i(a).dI(a,b,c,d,e)}
J.dQ=function(a,b,c,d){return J.i(a).dJ(a,b,c,d)}
J.dR=function(a,b){return J.aG(a).dM(a,b)}
J.dS=function(a,b,c,d,e){return J.i(a).dN(a,b,c,d,e)}
J.dT=function(a,b){return J.i(a).dO(a,b)}
J.dU=function(a,b){return J.i(a).dP(a,b)}
J.c3=function(a,b,c,d,e){return J.i(a).dR(a,b,c,d,e)}
J.dV=function(a,b){return J.i(a).b7(a,b)}
J.bk=function(a,b,c){return J.P(a).dU(a,b,c)}
J.bl=function(a){return J.i(a).dW(a)}
J.dW=function(a){return J.i(a).dX(a)}
J.dX=function(a,b){return J.i(a).dY(a,b)}
J.dY=function(a,b){return J.i(a).e_(a,b)}
J.c4=function(a,b){return J.i(a).e0(a,b)}
J.dZ=function(a,b){return J.i(a).e7(a,b)}
J.e_=function(a,b,c,d,e){return J.i(a).e8(a,b,c,d,e)}
J.e0=function(a,b){return J.aG(a).Y(a,b)}
J.c5=function(a,b){return J.i(a).e9(a,b)}
J.aJ=function(a,b){return J.i(a).ea(a,b)}
J.e1=function(a,b){return J.aG(a).I(a,b)}
J.c6=function(a){return J.i(a).gdL(a)}
J.T=function(a){return J.i(a).gak(a)}
J.G=function(a){return J.l(a).gu(a)}
J.e2=function(a){return J.i(a).gk(a)}
J.bm=function(a){return J.aG(a).gH(a)}
J.at=function(a){return J.P(a).gj(a)}
J.e3=function(a){return J.i(a).gc9(a)}
J.e4=function(a){return J.i(a).gca(a)}
J.e5=function(a){return J.i(a).gcb(a)}
J.e6=function(a){return J.i(a).gcc(a)}
J.e7=function(a){return J.i(a).gcd(a)}
J.e8=function(a){return J.i(a).gce(a)}
J.e9=function(a){return J.i(a).gcf(a)}
J.ea=function(a){return J.i(a).gbm(a)}
J.eb=function(a){return J.i(a).gl(a)}
J.ec=function(a){return J.i(a).gv(a)}
J.aK=function(a,b,c){return J.i(a).cu(a,b,c)}
J.ed=function(a){return J.i(a).cv(a)}
J.ee=function(a,b){return J.i(a).cw(a,b)}
J.c7=function(a,b){return J.i(a).cB(a,b)}
J.ef=function(a,b,c){return J.i(a).cD(a,b,c)}
J.eg=function(a,b){return J.aG(a).a9(a,b)}
J.eh=function(a,b){return J.i(a).sk(a,b)}
J.ei=function(a,b){return J.i(a).sV(a,b)}
J.ej=function(a,b){return J.i(a).sl(a,b)}
J.c8=function(a,b,c,d){return J.i(a).cN(a,b,c,d)}
J.c9=function(a,b,c,d){return J.i(a).cO(a,b,c,d)}
J.aL=function(a,b,c,d){return J.i(a).eG(a,b,c,d)}
J.ca=function(a){return J.dz(a).ab(a)}
J.au=function(a){return J.l(a).i(a)}
J.cb=function(a,b){return J.i(a).eK(a,b)}
J.aM=function(a,b,c,d,e,f,g){return J.i(a).eL(a,b,c,d,e,f,g)}
var $=I.p
C.b=J.az.prototype
C.d=J.ct.prototype
C.a=J.aA.prototype
C.e=J.aS.prototype
C.J=J.fd.prototype
C.K=P.fl.prototype
C.L=J.bL.prototype
C.x=new H.cm()
C.y=new P.hg()
C.c=new P.hO()
C.f=new P.ax(0)
C.z=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.A=function(hooks) {
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

C.B=function(getTagFallback) {
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
C.C=function() {
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
C.D=function(hooks) {
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
C.E=function(hooks) {
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
C.F=function(_, letter) { return letter.toUpperCase(); }
C.G=new H.bs([0,"TinyCanvasTransform.NONE",1,"TinyCanvasTransform.ROT90",2,"TinyCanvasTransform.ROT180",3,"TinyCanvasTransform.ROT270",4,"TinyCanvasTransform.MIRROR",5,"TinyCanvasTransform.MIRROR_ROT90",6,"TinyCanvasTransform.MIRROR_ROT180",7,"TinyCanvasTransform.MIRROR_ROT270"])
C.H=new H.bs([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.I=new H.bs([0,"TinyStagePointerType.CANCEL",1,"TinyStagePointerType.UP",2,"TinyStagePointerType.DOWN",3,"TinyStagePointerType.MOVE"])
C.j=new F.a2(0)
C.k=new F.a2(1)
C.l=new F.a2(2)
C.m=new F.a2(3)
C.n=new F.a2(4)
C.o=new F.a2(5)
C.p=new F.a2(6)
C.q=new F.a2(7)
C.r=new F.fL(0)
C.t=new F.b4(0)
C.u=new F.b4(1)
C.v=new F.b4(2)
C.w=new F.b4(3)
$.cI="$cachedFunction"
$.cJ="$cachedInvocation"
$.Q=0
$.ai=null
$.cc=null
$.bX=null
$.ds=null
$.dG=null
$.bb=null
$.be=null
$.bY=null
$.ac=null
$.ao=null
$.ap=null
$.bS=!1
$.k=C.c
$.co=0
$.ck=null
$.cj=null
$.ci=null
$.ch=null
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
I.$lazy(y,x,w)}})(["cr","$get$cr",function(){return H.eU()},"cs","$get$cs",function(){return new P.eD(null)},"cY","$get$cY",function(){return H.S(H.b5({toString:function(){return"$receiver$"}}))},"cZ","$get$cZ",function(){return H.S(H.b5({$method$:null,toString:function(){return"$receiver$"}}))},"d_","$get$d_",function(){return H.S(H.b5(null))},"d0","$get$d0",function(){return H.S(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d4","$get$d4",function(){return H.S(H.b5(void 0))},"d5","$get$d5",function(){return H.S(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d2","$get$d2",function(){return H.S(H.d3(null))},"d1","$get$d1",function(){return H.S(function(){try{null.$method$}catch(z){return z.message}}())},"d7","$get$d7",function(){return H.S(H.d3(void 0))},"d6","$get$d6",function(){return H.S(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bN","$get$bN",function(){return P.h4()},"aq","$get$aq",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bA]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.a0]},{func:1,args:[,],opt:[,]},{func:1,ret:P.W,args:[P.p]},{func:1,args:[W.bK]},{func:1,args:[,P.W]},{func:1,args:[P.W]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.a0]},{func:1,ret:P.bU},{func:1,void:true,args:[P.a],opt:[P.a0]},{func:1,void:true,args:[,P.a0]},{func:1,args:[,,]},{func:1,args:[P.cR,,]},{func:1,args:[P.W,,]},{func:1,args:[F.bH]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iE(d||a)
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
Isolate.bc=a.bc
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dI(F.dD(),b)},[])
else (function(b){H.dI(F.dD(),b)})([])})})()