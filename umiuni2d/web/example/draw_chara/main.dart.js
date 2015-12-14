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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bd=function(){}
var dart=[["","",,H,{
"^":"",
ji:{
"^":"a;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bh:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
be:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bZ==null){H.iq()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.db("Return interceptor for "+H.b(y(a,z))))}w=H.iz(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.C
else return C.L}return w},
f:{
"^":"a;",
q:function(a,b){return a===b},
gw:function(a){return H.a_(a)},
i:["cV",function(a){return H.b0(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
f0:{
"^":"f;",
i:function(a){return String(a)},
gw:function(a){return a?519018:218159},
$isbV:1},
f2:{
"^":"f;",
q:function(a,b){return null==b},
i:function(a){return"null"},
gw:function(a){return 0}},
cw:{
"^":"f;",
gw:function(a){return 0},
$isf3:1},
ff:{
"^":"cw;"},
bM:{
"^":"cw;",
i:function(a){return String(a)}},
az:{
"^":"f;",
c2:function(a,b){if(!!a.immutable$list)throw H.e(new P.M(b))},
c1:function(a,b){if(!!a.fixed$length)throw H.e(new P.M(b))},
E:function(a,b){var z,y
this.c1(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.ai)(b),++y)a.push(b[y])},
H:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.H(a))}},
a8:function(a,b){return H.c(new H.bA(a,b),[null,null])},
c8:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
W:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
gef:function(a){if(a.length>0)return a[0]
throw H.e(H.bv())},
ga7:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bv())},
bt:function(a,b,c,d,e){var z,y,x
this.c2(a,"set range")
P.cO(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.B(P.al(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.eZ())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aR(a,"[","]")},
gG:function(a){return new J.em(a,a.length,0,null)},
gw:function(a){return H.a_(a)},
gl:function(a){return a.length},
sl:function(a,b){this.c1(a,"set length")
if(b<0)throw H.e(P.al(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.x(a,b))
if(b>=a.length||b<0)throw H.e(H.x(a,b))
return a[b]},
B:function(a,b,c){this.c2(a,"indexed set")
if(b>=a.length||b<0)throw H.e(H.x(a,b))
a[b]=c},
$isaS:1,
$isj:1,
$asj:null,
$isq:1},
jh:{
"^":"az;"},
em:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.H(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aA:{
"^":"f;",
bj:function(a,b){return a%b},
aa:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.M(""+a))},
F:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.M(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
p:function(a,b){if(typeof b!=="number")throw H.e(H.ag(b))
return a+b},
d_:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aa(a/b)},
ag:function(a,b){return(a|0)===a?a/b|0:this.aa(a/b)},
b1:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aG:function(a,b){if(typeof b!=="number")throw H.e(H.ag(b))
return a<b},
$isaH:1},
cv:{
"^":"aA;",
$isaH:1,
$isp:1},
f1:{
"^":"aA;",
$isaH:1},
aT:{
"^":"f;",
dU:function(a,b){if(b>=a.length)throw H.e(H.x(a,b))
return a.charCodeAt(b)},
p:function(a,b){if(typeof b!=="string")throw H.e(P.el(b,null,null))
return a+b},
cU:function(a,b,c){H.dx(b)
if(c==null)c=a.length
H.dx(c)
if(b<0)throw H.e(P.b1(b,null,null))
if(typeof c!=="number")return H.v(c)
if(b>c)throw H.e(P.b1(b,null,null))
if(c>a.length)throw H.e(P.b1(c,null,null))
return a.substring(b,c)},
cT:function(a,b){return this.cU(a,b,null)},
dY:function(a,b,c){if(c>a.length)throw H.e(P.al(c,0,a.length,null,null))
return H.iE(a,b,c)},
gM:function(a){return a.length===0},
i:function(a){return a},
gw:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gl:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.x(a,b))
if(b>=a.length||b<0)throw H.e(H.x(a,b))
return a[b]},
$isaS:1,
$isW:1}}],["","",,H,{
"^":"",
aD:function(a,b){var z=a.ak(b)
if(!init.globalState.d.cy)init.globalState.f.ao()
return z},
bg:function(){--init.globalState.f.b},
dJ:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.e(P.aN("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hI(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$ct()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hj(P.by(null,H.aC),0)
y.z=P.aV(null,null,null,P.p,H.bR)
y.ch=P.aV(null,null,null,P.p,null)
if(y.x===!0){x=new H.hH()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eS,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hJ)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aV(null,null,null,P.p,H.b2)
w=P.ak(null,null,null,P.p)
v=new H.b2(0,null,!1)
u=new H.bR(y,x,w,init.createNewIsolate(),v,new H.a7(H.bi()),new H.a7(H.bi()),!1,!1,[],P.ak(null,null,null,null),null,null,!1,!0,P.ak(null,null,null,null))
w.a6(0,0)
u.bx(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aF()
x=H.ah(y,[y]).a_(a)
if(x)u.ak(new H.iC(z,a))
else{y=H.ah(y,[y,y]).a_(a)
if(y)u.ak(new H.iD(z,a))
else u.ak(a)}init.globalState.f.ao()},
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
z=new H.b6(!0,[]).a0(b.data)
y=J.O(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b6(!0,[]).a0(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b6(!0,[]).a0(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aV(null,null,null,P.p,H.b2)
p=P.ak(null,null,null,P.p)
o=new H.b2(0,null,!1)
n=new H.bR(y,q,p,init.createNewIsolate(),o,new H.a7(H.bi()),new H.a7(H.bi()),!1,!1,[],P.ak(null,null,null,null),null,null,!1,!0,P.ak(null,null,null,null))
p.a6(0,0)
n.bx(0,o)
init.globalState.f.a.V(new H.aC(n,new H.eT(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ao()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").Z(y.h(z,"msg"))
init.globalState.f.ao()
break
case"close":init.globalState.ch.a9(0,$.$get$cu().h(0,a))
a.terminate()
init.globalState.f.ao()
break
case"log":H.eR(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ab(["command","print","msg",z])
q=new H.ac(!0,P.aa(null,P.p)).K(q)
y.toString
self.postMessage(q)}else P.aI(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
eR:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ab(["command","log","msg",a])
x=new H.ac(!0,P.aa(null,P.p)).K(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.E(w)
z=H.A(w)
throw H.e(P.aQ(z))}},
eU:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cK=$.cK+("_"+y)
$.cL=$.cL+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.Z(["spawned",new H.b8(y,x),w,z.r])
x=new H.eV(a,b,c,d,z)
if(e===!0){z.c_(w,w)
init.globalState.f.a.V(new H.aC(z,x,"start isolate"))}else x.$0()},
i1:function(a){return new H.b6(!0,[]).a0(new H.ac(!1,P.aa(null,P.p)).K(a))},
iC:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iD:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hI:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hJ:function(a){var z=P.ab(["command","print","msg",a])
return new H.ac(!0,P.aa(null,P.p)).K(z)}}},
bR:{
"^":"a;a,b,c,eu:d<,dZ:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
c_:function(a,b){if(!this.f.q(0,a))return
if(this.Q.a6(0,b)&&!this.y)this.y=!0
this.b2()},
eD:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a9(0,a)
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
if(w===y.c)y.bH();++y.d}this.y=!1}this.b2()},
dH:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eC:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.B(new P.M("removeRange"))
P.cO(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cP:function(a,b){if(!this.r.q(0,a))return
this.db=b},
ej:function(a,b,c){var z=J.l(b)
if(!z.q(b,0))z=z.q(b,1)&&!this.cy
else z=!0
if(z){a.Z(c)
return}z=this.cx
if(z==null){z=P.by(null,null)
this.cx=z}z.V(new H.hB(a,c))},
eh:function(a,b){var z
if(!this.r.q(0,a))return
z=J.l(b)
if(!z.q(b,0))z=z.q(b,1)&&!this.cy
else z=!0
if(z){this.bc()
return}z=this.cx
if(z==null){z=P.by(null,null)
this.cx=z}z.V(this.gex())},
ek:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aI(a)
if(b!=null)P.aI(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.av(a)
y[1]=b==null?null:J.av(b)
for(x=new P.cy(z,z.r,null,null),x.c=z.e;x.v();)x.d.Z(y)},
ak:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.E(u)
w=t
v=H.A(u)
this.ek(w,v)
if(this.db===!0){this.bc()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geu()
if(this.cx!=null)for(;t=this.cx,!t.gM(t);)this.cx.cn().$0()}return y},
cb:function(a){return this.b.h(0,a)},
bx:function(a,b){var z=this.b
if(z.ah(a))throw H.e(P.aQ("Registry: ports must be registered only once."))
z.B(0,a,b)},
b2:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.B(0,this.a,this)
else this.bc()},
bc:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.T(0)
for(z=this.b,y=z.gcv(z),y=y.gG(y);y.v();)y.gC().dd()
z.T(0)
this.c.T(0)
init.globalState.z.a9(0,this.a)
this.dx.T(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.Z(z[v])}this.ch=null}},"$0","gex",0,0,1]},
hB:{
"^":"d:1;a,b",
$0:function(){this.a.Z(this.b)}},
hj:{
"^":"a;a,b",
e5:function(){var z=this.a
if(z.b===z.c)return
return z.cn()},
cr:function(){var z,y,x
z=this.e5()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ah(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gM(y)}else y=!1
else y=!1
else y=!1
if(y)H.B(P.aQ("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gM(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ab(["command","close"])
x=new H.ac(!0,P.aa(null,P.p)).K(x)
y.toString
self.postMessage(x)}return!1}z.eB()
return!0},
bS:function(){if(self.window!=null)new H.hk(this).$0()
else for(;this.cr(););},
ao:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bS()
else try{this.bS()}catch(x){w=H.E(x)
z=w
y=H.A(x)
w=init.globalState.Q
v=P.ab(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.ac(!0,P.aa(null,P.p)).K(v)
w.toString
self.postMessage(v)}}},
hk:{
"^":"d:1;a",
$0:function(){if(!this.a.cr())return
P.cW(C.h,this)}},
aC:{
"^":"a;a,b,c",
eB:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ak(this.b)}},
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
x=H.aF()
w=H.ah(x,[x,x]).a_(y)
if(w)y.$2(this.b,this.c)
else{x=H.ah(x,[x]).a_(y)
if(x)y.$1(this.b)
else y.$0()}}z.b2()}},
df:{
"^":"a;"},
b8:{
"^":"df;b,a",
Z:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbK())return
x=H.i1(a)
if(z.gdZ()===y){y=J.O(x)
switch(y.h(x,0)){case"pause":z.c_(y.h(x,1),y.h(x,2))
break
case"resume":z.eD(y.h(x,1))
break
case"add-ondone":z.dH(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eC(y.h(x,1))
break
case"set-errors-fatal":z.cP(y.h(x,1),y.h(x,2))
break
case"ping":z.ej(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.eh(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a6(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a9(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.V(new H.aC(z,new H.hL(this,x),w))},
q:function(a,b){if(b==null)return!1
return b instanceof H.b8&&J.X(this.b,b.b)},
gw:function(a){return this.b.gaX()}},
hL:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbK())z.d8(this.b)}},
bS:{
"^":"df;b,c,a",
Z:function(a){var z,y,x
z=P.ab(["command","message","port",this,"msg",a])
y=new H.ac(!0,P.aa(null,P.p)).K(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
q:function(a,b){if(b==null)return!1
return b instanceof H.bS&&J.X(this.b,b.b)&&J.X(this.a,b.a)&&J.X(this.c,b.c)},
gw:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cQ()
y=this.a
if(typeof y!=="number")return y.cQ()
x=this.c
if(typeof x!=="number")return H.v(x)
return(z<<16^y<<8^x)>>>0}},
b2:{
"^":"a;aX:a<,b,bK:c<",
dd:function(){this.c=!0
this.b=null},
d8:function(a){if(this.c)return
this.dn(a)},
dn:function(a){return this.b.$1(a)},
$isfg:1},
fB:{
"^":"a;a,b,c",
d1:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.V(new H.aC(y,new H.fD(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.as(new H.fE(this,b),0),a)}else throw H.e(new P.M("Timer greater than 0."))},
static:{fC:function(a,b){var z=new H.fB(!0,!1,null)
z.d1(a,b)
return z}}},
fD:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fE:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
H.bg()
this.b.$0()}},
a7:{
"^":"a;aX:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.eQ()
z=C.a.b1(z,0)^C.a.ag(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
q:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a7){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ac:{
"^":"a;a,b",
K:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.B(0,a,z.gl(z))
z=J.l(a)
if(!!z.$iscC)return["buffer",a]
if(!!z.$isbE)return["typed",a]
if(!!z.$isaS)return this.cL(a)
if(!!z.$iseQ){x=this.gcI()
w=a.gc9()
w=H.aY(w,x,H.J(w,"L",0),null)
w=P.bz(w,!0,H.J(w,"L",0))
z=z.gcv(a)
z=H.aY(z,x,H.J(z,"L",0),null)
return["map",w,P.bz(z,!0,H.J(z,"L",0))]}if(!!z.$isf3)return this.cM(a)
if(!!z.$isf)this.cu(a)
if(!!z.$isfg)this.ap(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb8)return this.cN(a)
if(!!z.$isbS)return this.cO(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.ap(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa7)return["capability",a.a]
if(!(a instanceof P.a))this.cu(a)
return["dart",init.classIdExtractor(a),this.cK(init.classFieldsExtractor(a))]},"$1","gcI",2,0,2],
ap:function(a,b){throw H.e(new P.M(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cu:function(a){return this.ap(a,null)},
cL:function(a){var z=this.cJ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ap(a,"Can't serialize indexable: ")},
cJ:function(a){var z,y,x
z=[]
C.b.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.K(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cK:function(a){var z
for(z=0;z<a.length;++z)C.b.B(a,z,this.K(a[z]))
return a},
cM:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ap(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.K(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cO:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cN:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaX()]
return["raw sendport",a]}},
b6:{
"^":"a;a,b",
a0:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aN("Bad serialized message: "+H.b(a)))
switch(C.b.gef(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=this.ai(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ai(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ai(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ai(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.e8(a)
case"sendport":return this.e9(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.e7(a)
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
this.ai(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","ge6",2,0,2],
ai:function(a){var z,y,x
z=J.O(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.v(x)
if(!(y<x))break
z.B(a,y,this.a0(z.h(a,y)));++y}return a},
e8:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aW()
this.b.push(w)
y=J.eh(y,this.ge6()).bn(0)
for(z=J.O(y),v=J.O(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.h(y,u)
w.B(0,y[u],this.a0(v.h(x,u)))}return w},
e9:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.X(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cb(w)
if(u==null)return
t=new H.b8(u,x)}else t=new H.bS(y,w,x)
this.b.push(t)
return t},
e7:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.O(y)
v=J.O(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.v(t)
if(!(u<t))break
w[z.h(y,u)]=this.a0(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eu:function(){throw H.e(new P.M("Cannot modify unmodifiable Map"))},
ik:function(a){return init.types[a]},
iy:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaU},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.av(a)
if(typeof z!=="string")throw H.e(H.ag(a))
return z},
a_:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cM:function(a){var z,y
z=C.i(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.f.dU(z,0)===36)z=C.f.cT(z,1)
return(z+H.dD(H.bX(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b0:function(a){return"Instance of '"+H.cM(a)+"'"},
G:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cJ:function(a){return a.b?H.G(a).getUTCMilliseconds()+0:H.G(a).getMilliseconds()+0},
b_:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ag(a))
return a[b]},
bF:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ag(a))
a[b]=c},
v:function(a){throw H.e(H.ag(a))},
h:function(a,b){if(a==null)J.au(a)
throw H.e(H.x(a,b))},
x:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a6(!0,b,"index",null)
z=J.au(a)
if(!(b<0)){if(typeof z!=="number")return H.v(z)
y=b>=z}else y=!0
if(y)return P.bu(b,a,"index",null,z)
return P.b1(b,"index",null)},
ag:function(a){return new P.a6(!0,a,null,null)},
ba:function(a){return a},
dx:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.ag(a))
return a},
e:function(a){var z
if(a==null)a=new P.cI()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dL})
z.name=""}else z.toString=H.dL
return z},
dL:function(){return J.av(this.dartException)},
B:function(a){throw H.e(a)},
ai:function(a){throw H.e(new P.H(a))},
E:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iG(a)
if(a==null)return
if(a instanceof H.bs)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.b1(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bw(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cH(v,null))}}if(a instanceof TypeError){u=$.$get$d_()
t=$.$get$d0()
s=$.$get$d1()
r=$.$get$d2()
q=$.$get$d6()
p=$.$get$d7()
o=$.$get$d4()
$.$get$d3()
n=$.$get$d9()
m=$.$get$d8()
l=u.O(y)
if(l!=null)return z.$1(H.bw(y,l))
else{l=t.O(y)
if(l!=null){l.method="call"
return z.$1(H.bw(y,l))}else{l=s.O(y)
if(l==null){l=r.O(y)
if(l==null){l=q.O(y)
if(l==null){l=p.O(y)
if(l==null){l=o.O(y)
if(l==null){l=r.O(y)
if(l==null){l=n.O(y)
if(l==null){l=m.O(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cH(y,l==null?null:l.method))}}return z.$1(new H.h4(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cR()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a6(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cR()
return a},
A:function(a){var z
if(a instanceof H.bs)return a.b
if(a==null)return new H.dk(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dk(a,null)},
iB:function(a){if(a==null||typeof a!='object')return J.F(a)
else return H.a_(a)},
dz:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.B(0,a[y],a[x])}return b},
is:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.q(c,0))return H.aD(b,new H.it(a))
else if(z.q(c,1))return H.aD(b,new H.iu(a,d))
else if(z.q(c,2))return H.aD(b,new H.iv(a,d,e))
else if(z.q(c,3))return H.aD(b,new H.iw(a,d,e,f))
else if(z.q(c,4))return H.aD(b,new H.ix(a,d,e,f,g))
else throw H.e(P.aQ("Unsupported number of arguments for wrapped closure"))},
as:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.is)
a.$identity=z
return z},
es:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.fj(z).r}else x=c
w=d?Object.create(new H.fp().constructor.prototype):Object.create(new H.bo(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.P
$.P=J.at(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ch(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ik(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cf:H.bp
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ch(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ep:function(a,b,c,d){var z=H.bp
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ch:function(a,b,c){var z,y,x,w,v,u
if(c)return H.er(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ep(y,!w,z,b)
if(y===0){w=$.aj
if(w==null){w=H.aO("self")
$.aj=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.P
$.P=J.at(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aj
if(v==null){v=H.aO("self")
$.aj=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.P
$.P=J.at(w,1)
return new Function(v+H.b(w)+"}")()},
eq:function(a,b,c,d){var z,y
z=H.bp
y=H.cf
switch(b?-1:a){case 0:throw H.e(new H.fl("Intercepted function with no arguments."))
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
z=H.en()
y=$.ce
if(y==null){y=H.aO("receiver")
$.ce=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eq(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.P
$.P=J.at(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.P
$.P=J.at(u,1)
return new Function(y+H.b(u)+"}")()},
bW:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.es(a,b,z,!!d,e,f)},
iF:function(a){throw H.e(new P.ex("Cyclic initialization for static "+H.b(a)))},
ah:function(a,b,c){return new H.fm(a,b,c,null)},
aF:function(){return C.p},
bi:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
o:function(a,b,c){var z
if(b===0){J.dW(c,a)
return}else if(b===1){c.c3(H.E(a),H.A(a))
return}if(!!J.l(a).$isU)z=a
else{z=H.c(new P.D(0,$.k,null),[null])
z.aO(a)}z.bm(H.dt(b,0),new H.ib(b))
return c.geg()},
dt:function(a,b){return new H.i8(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
c:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bX:function(a){if(a==null)return
return a.$builtinTypeInfo},
dB:function(a,b){return H.dK(a["$as"+H.b(b)],H.bX(a))},
J:function(a,b,c){var z=H.dB(a,b)
return z==null?null:z[c]},
u:function(a,b){var z=H.bX(a)
return z==null?null:z[b]},
c2:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dD(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dD:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bG("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.c2(u,c))}return w?"":"<"+H.b(z)+">"},
dK:function(a,b){if(typeof a=="function"){a=H.c_(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.c_(a,null,b)}return b},
ia:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.K(a[y],b[y]))return!1
return!0},
bb:function(a,b,c){return H.c_(a,b,H.dB(b,c))},
K:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dC(a,b)
if('func' in a)return b.builtin$cls==="eH"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c2(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.c2(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ia(H.dK(v,z),x)},
dv:function(a,b,c){var z,y,x,w,v
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
dC:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.dv(x,w,!1))return!1
if(!H.dv(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.K(o,n)||H.K(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.K(o,n)||H.K(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.K(o,n)||H.K(n,o)))return!1}}return H.i9(a.named,b.named)},
c_:function(a,b,c){return a.apply(b,c)},
k4:function(a){var z=$.bY
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
k3:function(a){return H.a_(a)},
k2:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iz:function(a){var z,y,x,w,v,u
z=$.bY.$1(a)
y=$.bc[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bf[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.du.$2(a,z)
if(z!=null){y=$.bc[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bf[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c1(x)
$.bc[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bf[z]=x
return x}if(v==="-"){u=H.c1(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dF(a,x)
if(v==="*")throw H.e(new P.db(z))
if(init.leafTags[z]===true){u=H.c1(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dF(a,x)},
dF:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bh(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c1:function(a){return J.bh(a,!1,null,!!a.$isaU)},
iA:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bh(z,!1,null,!!z.$isaU)
else return J.bh(z,c,null,null)},
iq:function(){if(!0===$.bZ)return
$.bZ=!0
H.ir()},
ir:function(){var z,y,x,w,v,u,t,s
$.bc=Object.create(null)
$.bf=Object.create(null)
H.il()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dH.$1(v)
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
z=C.v()
z=H.af(C.r,H.af(C.x,H.af(C.j,H.af(C.j,H.af(C.w,H.af(C.t,H.af(C.u(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bY=new H.im(v)
$.du=new H.io(u)
$.dH=new H.ip(t)},
af:function(a,b){return a(b)||b},
iE:function(a,b,c){return a.indexOf(b,c)>=0},
et:{
"^":"a;",
i:function(a){return P.cB(this)},
B:function(a,b,c){return H.eu()}},
bt:{
"^":"et;a",
aW:function(){var z=this.$map
if(z==null){z=new H.aB(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dz(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aW().h(0,b)},
H:function(a,b){this.aW().H(0,b)},
gl:function(a){var z=this.aW()
return z.gl(z)}},
fi:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fj:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fi(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
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
return new H.h3(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b5:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d5:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cH:{
"^":"C;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
f5:{
"^":"C;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bw:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.f5(a,y,z?null:b.receiver)}}},
h4:{
"^":"C;a",
i:function(a){var z=this.a
return C.f.gM(z)?"Error":"Error: "+z}},
iG:{
"^":"d:2;a",
$1:function(a){if(!!J.l(a).$isC)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dk:{
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
i:function(a){return"Closure '"+H.cM(this)+"'"},
gcw:function(){return this},
gcw:function(){return this}},
cU:{
"^":"d;"},
fp:{
"^":"cU;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bo:{
"^":"cU;a,b,c,d",
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bo))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.a_(this.a)
else y=typeof z!=="object"?J.F(z):H.a_(z)
z=H.a_(this.b)
if(typeof y!=="number")return y.eR()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.b0(z)},
static:{bp:function(a){return a.a},cf:function(a){return a.c},en:function(){var z=$.aj
if(z==null){z=H.aO("self")
$.aj=z}return z},aO:function(a){var z,y,x,w,v
z=new H.bo("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fl:{
"^":"C;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
cQ:{
"^":"a;"},
fm:{
"^":"cQ;a,b,c,d",
a_:function(a){var z=this.di(a)
return z==null?!1:H.dC(z,this.ab())},
di:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
ab:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isjN)z.void=true
else if(!x.$isco)z.ret=y.ab()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cP(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cP(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dy(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ab()}z.named=w}return z},
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
t=H.dy(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].ab())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cP:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ab())
return z}}},
co:{
"^":"cQ;",
i:function(a){return"dynamic"},
ab:function(){return}},
bs:{
"^":"a;a,R:b<"},
ib:{
"^":"d:5;a",
$2:function(a,b){H.dt(this.a,1).$1(new H.bs(a,b))}},
i8:{
"^":"d:2;a,b",
$1:function(a){this.b(this.a,a)}},
aB:{
"^":"a;a,b,c,d,e,f,r",
gl:function(a){return this.a},
gM:function(a){return this.a===0},
gc9:function(){return H.c(new H.f7(this),[H.u(this,0)])},
gcv:function(a){return H.aY(this.gc9(),new H.f4(this),H.u(this,0),H.u(this,1))},
ah:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bD(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bD(y,a)}else return this.eo(a)},
eo:function(a){var z=this.d
if(z==null)return!1
return this.am(this.S(z,this.al(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.S(z,b)
return y==null?null:y.ga1()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.S(x,b)
return y==null?null:y.ga1()}else return this.ep(b)},
ep:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.S(z,this.al(a))
x=this.am(y,a)
if(x<0)return
return y[x].ga1()},
B:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aZ()
this.b=z}this.bw(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aZ()
this.c=y}this.bw(y,b,c)}else this.er(b,c)},
er:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aZ()
this.d=z}y=this.al(a)
x=this.S(z,y)
if(x==null)this.b0(z,y,[this.b_(a,b)])
else{w=this.am(x,a)
if(w>=0)x[w].sa1(b)
else x.push(this.b_(a,b))}},
a9:function(a,b){if(typeof b==="string")return this.bR(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bR(this.c,b)
else return this.eq(b)},
eq:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.S(z,this.al(a))
x=this.am(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bY(w)
return w.ga1()},
T:function(a){if(this.a>0){this.f=null
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
bw:function(a,b,c){var z=this.S(a,b)
if(z==null)this.b0(a,b,this.b_(b,c))
else z.sa1(c)},
bR:function(a,b){var z
if(a==null)return
z=this.S(a,b)
if(z==null)return
this.bY(z)
this.bE(a,b)
return z.ga1()},
b_:function(a,b){var z,y
z=new H.f6(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bY:function(a){var z,y
z=a.gdA()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
al:function(a){return J.F(a)&0x3ffffff},
am:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.X(a[y].gc6(),b))return y
return-1},
i:function(a){return P.cB(this)},
S:function(a,b){return a[b]},
b0:function(a,b,c){a[b]=c},
bE:function(a,b){delete a[b]},
bD:function(a,b){return this.S(a,b)!=null},
aZ:function(){var z=Object.create(null)
this.b0(z,"<non-identifier-key>",z)
this.bE(z,"<non-identifier-key>")
return z},
$iseQ:1},
f4:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
f6:{
"^":"a;c6:a<,a1:b@,c,dA:d<"},
f7:{
"^":"L;a",
gl:function(a){return this.a.a},
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
gC:function(){return this.d},
v:function(){var z=this.a
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
bv:function(){return new P.am("No element")},
eZ:function(){return new P.am("Too few elements")},
fz:function(a){return a.geW()},
aX:{
"^":"L;",
gG:function(a){return new H.cz(this,this.gl(this),0,null)},
H:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.W(0,y))
if(z!==this.gl(this))throw H.e(new P.H(this))}},
a8:function(a,b){return H.c(new H.bA(this,b),[null,null])},
bo:function(a,b){var z,y,x
if(b){z=H.c([],[H.J(this,"aX",0)])
C.b.sl(z,this.gl(this))}else z=H.c(Array(this.gl(this)),[H.J(this,"aX",0)])
for(y=0;y<this.gl(this);++y){x=this.W(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bn:function(a){return this.bo(a,!0)},
$isq:1},
cz:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
v:function(){var z,y,x,w
z=this.a
y=J.O(z)
x=y.gl(z)
if(this.b!==x)throw H.e(new P.H(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.W(z,w);++this.c
return!0}},
cA:{
"^":"L;a,b",
gG:function(a){var z=new H.fb(null,J.bn(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gl:function(a){return J.au(this.a)},
$asL:function(a,b){return[b]},
static:{aY:function(a,b,c,d){if(!!J.l(a).$isq)return H.c(new H.cp(a,b),[c,d])
return H.c(new H.cA(a,b),[c,d])}}},
cp:{
"^":"cA;a,b",
$isq:1},
fb:{
"^":"f_;a,b,c",
v:function(){var z=this.b
if(z.v()){this.a=this.aV(z.gC())
return!0}this.a=null
return!1},
gC:function(){return this.a},
aV:function(a){return this.c.$1(a)}},
bA:{
"^":"aX;a,b",
gl:function(a){return J.au(this.a)},
W:function(a,b){return this.aV(J.e1(this.a,b))},
aV:function(a){return this.b.$1(a)},
$asaX:function(a,b){return[b]},
$asL:function(a,b){return[b]},
$isq:1},
cr:{
"^":"a;"}}],["","",,H,{
"^":"",
dy:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
h5:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ic()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.as(new P.h7(z),1)).observe(y,{childList:true})
return new P.h6(z,y,x)}else if(self.setImmediate!=null)return P.id()
return P.ie()},
jP:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.as(new P.h8(a),0))},"$1","ic",2,0,4],
jQ:[function(a){++init.globalState.f.b
self.setImmediate(H.as(new P.h9(a),0))},"$1","id",2,0,4],
jR:[function(a){P.bH(C.h,a)},"$1","ie",2,0,4],
dn:function(a,b){var z=H.aF()
z=H.ah(z,[z,z]).a_(a)
if(z){b.toString
return a}else{b.toString
return a}},
eI:function(a,b,c){var z=new P.D(0,$.k,null)
z.$builtinTypeInfo=[c]
P.cW(a,new P.eJ(b,z))
return z},
a8:function(a){return H.c(new P.de(H.c(new P.D(0,$.k,null),[a])),[a])},
i2:function(a,b,c){$.k.toString
a.L(b,c)},
i4:function(){var z,y
for(;z=$.ad,z!=null;){$.aq=null
y=z.c
$.ad=y
if(y==null)$.ap=null
$.k=z.b
z.dO()}},
k1:[function(){$.bT=!0
try{P.i4()}finally{$.k=C.c
$.aq=null
$.bT=!1
if($.ad!=null)$.$get$bO().$1(P.dw())}},"$0","dw",0,0,1],
ds:function(a){if($.ad==null){$.ap=a
$.ad=a
if(!$.bT)$.$get$bO().$1(P.dw())}else{$.ap.c=a
$.ap=a}},
dI:function(a){var z,y
z=$.k
if(C.c===z){P.ae(null,null,C.c,a)
return}z.toString
if(C.c.gbb()===z){P.ae(null,null,z,a)
return}y=$.k
P.ae(null,null,y,y.b3(a,!0))},
jF:function(a,b){var z,y,x
z=H.c(new P.dl(null,null,null,0),[b])
y=z.gdt()
x=z.gdv()
z.a=a.a2(y,!0,z.gdu(),x)
return z},
i6:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.E(u)
z=t
y=H.A(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.T(x)
w=t
v=x.gR()
c.$2(w,v)}}},
hY:function(a,b,c,d){var z=a.b6()
if(!!J.l(z).$isU)z.bq(new P.i0(b,c,d))
else b.L(c,d)},
hZ:function(a,b){return new P.i_(a,b)},
cW:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bH(a,b)}return P.bH(a,z.b3(b,!0))},
bH:function(a,b){var z=C.d.ag(a.a,1000)
return H.fC(z<0?0:z,b)},
bN:function(a){var z=$.k
$.k=a
return z},
aE:function(a,b,c,d,e){var z,y,x
z=new P.dd(new P.i5(d,e),C.c,null)
y=$.ad
if(y==null){P.ds(z)
$.aq=$.ap}else{x=$.aq
if(x==null){z.c=y
$.aq=z
$.ad=z}else{z.c=x.c
x.c=z
$.aq=z
if(z.c==null)$.ap=z}}},
dp:function(a,b,c,d){var z,y
if($.k===c)return d.$0()
z=P.bN(c)
try{y=d.$0()
return y}finally{$.k=z}},
dr:function(a,b,c,d,e){var z,y
if($.k===c)return d.$1(e)
z=P.bN(c)
try{y=d.$1(e)
return y}finally{$.k=z}},
dq:function(a,b,c,d,e,f){var z,y
if($.k===c)return d.$2(e,f)
z=P.bN(c)
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ae:function(a,b,c,d){var z=C.c!==c
if(z){d=c.b3(d,!(!z||C.c.gbb()===c))
c=C.c}P.ds(new P.dd(d,c,null))},
h7:{
"^":"d:2;a",
$1:function(a){var z,y
H.bg()
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
$0:function(){H.bg()
this.a.$0()}},
h9:{
"^":"d:0;a",
$0:function(){H.bg()
this.a.$0()}},
hV:{
"^":"Y;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hW:function(a,b){if(b!=null)return b
if(!!J.l(a).$isC)return a.gR()
return}}},
U:{
"^":"a;"},
eJ:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a3(null)}catch(x){w=H.E(x)
z=w
y=H.A(x)
P.i2(this.b,z,y)}}},
hd:{
"^":"a;eg:a<",
c3:function(a,b){a=a!=null?a:new P.cI()
if(this.a.a!==0)throw H.e(new P.am("Future already completed"))
$.k.toString
this.L(a,b)},
dW:function(a){return this.c3(a,null)}},
de:{
"^":"hd;a",
b9:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.am("Future already completed"))
z.aO(b)},
L:function(a,b){this.a.dc(a,b)}},
an:{
"^":"a;bL:a<,eE:b>,c,d,e",
ga5:function(){return this.b.b},
gc5:function(){return(this.c&1)!==0},
gem:function(){return this.c===6},
gel:function(){return this.c===8},
gdz:function(){return this.d},
gdG:function(){return this.d}},
D:{
"^":"a;av:a?,a5:b<,c",
gdq:function(){return this.a===8},
sdr:function(a){if(a)this.a=2
else this.a=0},
bm:function(a,b){var z,y
z=H.c(new P.D(0,$.k,null),[null])
y=z.b
if(y!==C.c){y.toString
if(b!=null)b=P.dn(b,y)}this.aL(new P.an(null,z,b==null?1:3,a,b))
return z},
bq:function(a){var z,y
z=$.k
y=new P.D(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aL(new P.an(null,y,8,a,null))
return y},
aY:function(){if(this.a!==0)throw H.e(new P.am("Future already completed"))
this.a=1},
gdF:function(){return this.c},
gae:function(){return this.c},
bX:function(a){this.a=4
this.c=a},
bW:function(a){this.a=8
this.c=a},
dD:function(a,b){this.bW(new P.Y(a,b))},
aL:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ae(null,null,z,new P.ho(this,a))}else{a.a=this.c
this.c=a}},
au:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbL()
z.a=y}return y},
a3:function(a){var z,y
z=J.l(a)
if(!!z.$isU)if(!!z.$isD)P.b7(a,this)
else P.bQ(a,this)
else{y=this.au()
this.bX(a)
P.a4(this,y)}},
bC:function(a){var z=this.au()
this.bX(a)
P.a4(this,z)},
L:[function(a,b){var z=this.au()
this.bW(new P.Y(a,b))
P.a4(this,z)},function(a){return this.L(a,null)},"eS","$2","$1","gaS",2,2,12,0],
aO:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isU){if(!!z.$isD){z=a.a
if(z>=4&&z===8){this.aY()
z=this.b
z.toString
P.ae(null,null,z,new P.hq(this,a))}else P.b7(a,this)}else P.bQ(a,this)
return}}this.aY()
z=this.b
z.toString
P.ae(null,null,z,new P.hr(this,a))},
dc:function(a,b){var z
this.aY()
z=this.b
z.toString
P.ae(null,null,z,new P.hp(this,a,b))},
$isU:1,
static:{bQ:function(a,b){var z,y,x,w
b.sav(2)
try{a.bm(new P.hs(b),new P.ht(b))}catch(x){w=H.E(x)
z=w
y=H.A(x)
P.dI(new P.hu(b,z,y))}},b7:function(a,b){var z
b.a=2
z=new P.an(null,b,0,null,null)
if(a.a>=4)P.a4(a,z)
else a.aL(z)},a4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdq()
if(b==null){if(w){v=z.a.gae()
y=z.a.ga5()
x=J.T(v)
u=v.gR()
y.toString
P.aE(null,null,y,x,u)}return}for(;b.gbL()!=null;b=t){t=b.a
b.a=null
P.a4(z.a,b)}x.a=!0
s=w?null:z.a.gdF()
x.b=s
x.c=!1
y=!w
if(!y||b.gc5()||b.c===8){r=b.ga5()
if(w){u=z.a.ga5()
u.toString
if(u==null?r!=null:u!==r){u=u.gbb()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gae()
y=z.a.ga5()
x=J.T(v)
u=v.gR()
y.toString
P.aE(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gc5())x.a=new P.hw(x,b,s,r).$0()}else new P.hv(z,x,b,r).$0()
if(b.gel())new P.hx(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isU}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.D)if(p.a>=4){o.a=2
z.a=p
b=new P.an(null,o,0,null,null)
y=p
continue}else P.b7(p,o)
else P.bQ(p,o)
return}}o=b.b
b=o.au()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
ho:{
"^":"d:0;a,b",
$0:function(){P.a4(this.a,this.b)}},
hs:{
"^":"d:2;a",
$1:function(a){this.a.bC(a)}},
ht:{
"^":"d:6;a",
$2:function(a,b){this.a.L(a,b)},
$1:function(a){return this.$2(a,null)}},
hu:{
"^":"d:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
hq:{
"^":"d:0;a,b",
$0:function(){P.b7(this.b,this.a)}},
hr:{
"^":"d:0;a,b",
$0:function(){this.a.bC(this.b)}},
hp:{
"^":"d:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
hw:{
"^":"d:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aC(this.b.gdz(),this.c)
return!0}catch(x){w=H.E(x)
z=w
y=H.A(x)
this.a.b=new P.Y(z,y)
return!1}}},
hv:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gae()
y=!0
r=this.c
if(r.gem()){x=r.d
try{y=this.d.aC(x,J.T(z))}catch(q){r=H.E(q)
w=r
v=H.A(q)
r=J.T(z)
p=w
o=(r==null?p==null:r===p)?z:new P.Y(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aF()
p=H.ah(p,[p,p]).a_(r)
n=this.d
m=this.b
if(p)m.b=n.eG(u,J.T(z),z.gR())
else m.b=n.aC(u,J.T(z))}catch(q){r=H.E(q)
t=r
s=H.A(q)
r=J.T(z)
p=t
o=(r==null?p==null:r===p)?z:new P.Y(t,s)
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
try{w=this.e.cp(this.d.gdG())
z.a=w
v=w}catch(u){z=H.E(u)
y=z
x=H.A(u)
if(this.c){z=J.T(this.a.a.gae())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gae()
else v.b=new P.Y(y,x)
v.a=!1
return}if(!!J.l(v).$isU){t=this.d
s=t.geE(t)
s.sdr(!0)
this.b.c=!0
v.bm(new P.hy(this.a,s),new P.hz(z,s))}}},
hy:{
"^":"d:2;a,b",
$1:function(a){P.a4(this.a.a,new P.an(null,this.b,0,null,null))}},
hz:{
"^":"d:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.D)){y=H.c(new P.D(0,$.k,null),[null])
z.a=y
y.dD(a,b)}P.a4(z.a,new P.an(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dd:{
"^":"a;a,b,c",
dO:function(){return this.a.$0()}},
a1:{
"^":"a;",
a8:function(a,b){return H.c(new P.hK(b,this),[H.J(this,"a1",0),null])},
H:function(a,b){var z,y
z={}
y=H.c(new P.D(0,$.k,null),[null])
z.a=null
z.a=this.a2(new P.ft(z,this,b,y),!0,new P.fu(y),y.gaS())
return y},
gl:function(a){var z,y
z={}
y=H.c(new P.D(0,$.k,null),[P.p])
z.a=0
this.a2(new P.fv(z),!0,new P.fw(z,y),y.gaS())
return y},
bn:function(a){var z,y
z=H.c([],[H.J(this,"a1",0)])
y=H.c(new P.D(0,$.k,null),[[P.j,H.J(this,"a1",0)]])
this.a2(new P.fx(this,z),!0,new P.fy(z,y),y.gaS())
return y}},
ft:{
"^":"d;a,b,c,d",
$1:function(a){P.i6(new P.fr(this.c,a),new P.fs(),P.hZ(this.a.a,this.d))},
$signature:function(){return H.bb(function(a){return{func:1,args:[a]}},this.b,"a1")}},
fr:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fs:{
"^":"d:2;",
$1:function(a){}},
fu:{
"^":"d:0;a",
$0:function(){this.a.a3(null)}},
fv:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
fw:{
"^":"d:0;a,b",
$0:function(){this.b.a3(this.a.a)}},
fx:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bb(function(a){return{func:1,args:[a]}},this.a,"a1")}},
fy:{
"^":"d:0;a,b",
$0:function(){this.b.a3(this.a)}},
fq:{
"^":"a;"},
jV:{
"^":"a;"},
ha:{
"^":"a;a5:d<,av:e?",
bh:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c0()
if((z&4)===0&&(this.e&32)===0)this.bI(this.gbN())},
an:function(a){return this.bh(a,null)},
co:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gM(z)}else z=!1
if(z)this.r.aI(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bI(this.gbP())}}}},
b6:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aP()
return this.f},
aP:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c0()
if((this.e&32)===0)this.r=null
this.f=this.bM()},
aN:["cY",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bT(a)
else this.aM(new P.hg(a,null))}],
aK:["cZ",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bV(a,b)
else this.aM(new P.hi(a,b,null))}],
da:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bU()
else this.aM(C.q)},
bO:[function(){},"$0","gbN",0,0,1],
bQ:[function(){},"$0","gbP",0,0,1],
bM:function(){return},
aM:function(a){var z,y
z=this.r
if(z==null){z=new P.hU(null,null,0)
this.r=z}z.a6(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aI(this)}},
bT:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bl(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aQ((z&4)!==0)},
bV:function(a,b){var z,y
z=this.e
y=new P.hc(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aP()
z=this.f
if(!!J.l(z).$isU)z.bq(y)
else y.$0()}else{y.$0()
this.aQ((z&4)!==0)}},
bU:function(){var z,y
z=new P.hb(this)
this.aP()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isU)y.bq(z)
else z.$0()},
bI:function(a){var z=this.e
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
if(y)this.bO()
else this.bQ()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aI(this)},
d6:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dn(b,z)
this.c=c}},
hc:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aF()
x=H.ah(x,[x,x]).a_(y)
w=z.d
v=this.b
u=z.b
if(x)w.eH(u,v,this.c)
else w.bl(u,v)
z.e=(z.e&4294967263)>>>0}},
hb:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cq(z.c)
z.e=(z.e&4294967263)>>>0}},
dg:{
"^":"a;aA:a@"},
hg:{
"^":"dg;b,a",
bi:function(a){a.bT(this.b)}},
hi:{
"^":"dg;aj:b>,R:c<,a",
bi:function(a){a.bV(this.b,this.c)}},
hh:{
"^":"a;",
bi:function(a){a.bU()},
gaA:function(){return},
saA:function(a){throw H.e(new P.am("No events after a done."))}},
hM:{
"^":"a;av:a?",
aI:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dI(new P.hN(this,a))
this.a=1},
c0:function(){if(this.a===1)this.a=3}},
hN:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.ei(this.b)}},
hU:{
"^":"hM;b,c,a",
gM:function(a){return this.c==null},
a6:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saA(b)
this.c=b}},
ei:function(a){var z,y
z=this.b
y=z.gaA()
this.b=y
if(y==null)this.c=null
z.bi(a)}},
dl:{
"^":"a;a,b,c,av:d?",
by:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eX:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a3(!0)
return}this.a.an(0)
this.c=a
this.d=3},"$1","gdt",2,0,function(){return H.bb(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dl")}],
dw:[function(a,b){var z
if(this.d===2){z=this.c
this.by(0)
z.L(a,b)
return}this.a.an(0)
this.c=new P.Y(a,b)
this.d=4},function(a){return this.dw(a,null)},"eZ","$2","$1","gdv",2,2,14,0],
eY:[function(){if(this.d===2){var z=this.c
this.by(0)
z.a3(!1)
return}this.a.an(0)
this.c=null
this.d=5},"$0","gdu",0,0,1]},
i0:{
"^":"d:0;a,b,c",
$0:function(){return this.a.L(this.b,this.c)}},
i_:{
"^":"d:5;a,b",
$2:function(a,b){return P.hY(this.a,this.b,a,b)}},
bP:{
"^":"a1;",
a2:function(a,b,c,d){return this.dg(a,d,c,!0===b)},
ca:function(a,b,c){return this.a2(a,null,b,c)},
dg:function(a,b,c,d){return P.hn(this,a,b,c,d,H.J(this,"bP",0),H.J(this,"bP",1))},
bJ:function(a,b){b.aN(a)},
$asa1:function(a,b){return[b]}},
dh:{
"^":"ha;x,y,a,b,c,d,e,f,r",
aN:function(a){if((this.e&2)!==0)return
this.cY(a)},
aK:function(a,b){if((this.e&2)!==0)return
this.cZ(a,b)},
bO:[function(){var z=this.y
if(z==null)return
z.an(0)},"$0","gbN",0,0,1],
bQ:[function(){var z=this.y
if(z==null)return
z.co()},"$0","gbP",0,0,1],
bM:function(){var z=this.y
if(z!=null){this.y=null
z.b6()}return},
eT:[function(a){this.x.bJ(a,this)},"$1","gdk",2,0,function(){return H.bb(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dh")}],
eV:[function(a,b){this.aK(a,b)},"$2","gdm",4,0,15],
eU:[function(){this.da()},"$0","gdl",0,0,1],
d7:function(a,b,c,d,e,f,g){var z,y
z=this.gdk()
y=this.gdm()
this.y=this.x.a.ca(z,this.gdl(),y)},
static:{hn:function(a,b,c,d,e,f,g){var z=$.k
z=H.c(new P.dh(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.d6(b,c,d,e)
z.d7(a,b,c,d,e,f,g)
return z}}},
hK:{
"^":"bP;b,a",
bJ:function(a,b){var z,y,x,w,v
z=null
try{z=this.dE(a)}catch(w){v=H.E(w)
y=v
x=H.A(w)
$.k.toString
b.aK(y,x)
return}b.aN(z)},
dE:function(a){return this.b.$1(a)}},
Y:{
"^":"a;aj:a>,R:b<",
i:function(a){return H.b(this.a)},
$isC:1},
hX:{
"^":"a;"},
i5:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.hV(z,P.hW(z,this.b)))}},
hP:{
"^":"hX;",
gbb:function(){return this},
cq:function(a){var z,y,x,w
try{if(C.c===$.k){x=a.$0()
return x}x=P.dp(null,null,this,a)
return x}catch(w){x=H.E(w)
z=x
y=H.A(w)
return P.aE(null,null,this,z,y)}},
bl:function(a,b){var z,y,x,w
try{if(C.c===$.k){x=a.$1(b)
return x}x=P.dr(null,null,this,a,b)
return x}catch(w){x=H.E(w)
z=x
y=H.A(w)
return P.aE(null,null,this,z,y)}},
eH:function(a,b,c){var z,y,x,w
try{if(C.c===$.k){x=a.$2(b,c)
return x}x=P.dq(null,null,this,a,b,c)
return x}catch(w){x=H.E(w)
z=x
y=H.A(w)
return P.aE(null,null,this,z,y)}},
b3:function(a,b){if(b)return new P.hQ(this,a)
else return new P.hR(this,a)},
dK:function(a,b){if(b)return new P.hS(this,a)
else return new P.hT(this,a)},
h:function(a,b){return},
cp:function(a){if($.k===C.c)return a.$0()
return P.dp(null,null,this,a)},
aC:function(a,b){if($.k===C.c)return a.$1(b)
return P.dr(null,null,this,a,b)},
eG:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.dq(null,null,this,a,b,c)}},
hQ:{
"^":"d:0;a,b",
$0:function(){return this.a.cq(this.b)}},
hR:{
"^":"d:0;a,b",
$0:function(){return this.a.cp(this.b)}},
hS:{
"^":"d:2;a,b",
$1:function(a){return this.a.bl(this.b,a)}},
hT:{
"^":"d:2;a,b",
$1:function(a){return this.a.aC(this.b,a)}}}],["","",,P,{
"^":"",
aW:function(){return H.c(new H.aB(0,null,null,null,null,null,0),[null,null])},
ab:function(a){return H.dz(a,H.c(new H.aB(0,null,null,null,null,null,0),[null,null]))},
eY:function(a,b,c){var z,y
if(P.bU(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ar()
y.push(a)
try{P.i3(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cS(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aR:function(a,b,c){var z,y,x
if(P.bU(a))return b+"..."+c
z=new P.bG(b)
y=$.$get$ar()
y.push(a)
try{x=z
x.a=P.cS(x.ga4(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga4()+c
y=z.ga4()
return y.charCodeAt(0)==0?y:y},
bU:function(a){var z,y
for(z=0;y=$.$get$ar(),z<y.length;++z)if(a===y[z])return!0
return!1},
i3:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gG(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.b(z.gC())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gC();++x
if(!z.v()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gC();++x
for(;z.v();t=s,s=r){r=z.gC();++x
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
aV:function(a,b,c,d,e){return H.c(new H.aB(0,null,null,null,null,null,0),[d,e])},
aa:function(a,b){return P.hF(a,b)},
ak:function(a,b,c,d){return H.c(new P.hC(0,null,null,null,null,null,0),[d])},
cB:function(a){var z,y,x
z={}
if(P.bU(a))return"{...}"
y=new P.bG("")
try{$.$get$ar().push(a)
x=y
x.a=x.ga4()+"{"
z.a=!0
J.e2(a,new P.fc(z,y))
z=y
z.a=z.ga4()+"}"}finally{z=$.$get$ar()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga4()
return z.charCodeAt(0)==0?z:z},
hE:{
"^":"aB;a,b,c,d,e,f,r",
al:function(a){return H.iB(a)&0x3ffffff},
am:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gc6()
if(x==null?b==null:x===b)return y}return-1},
static:{hF:function(a,b){return H.c(new P.hE(0,null,null,null,null,null,0),[a,b])}}},
hC:{
"^":"hA;a,b,c,d,e,f,r",
gG:function(a){var z=new P.cy(this,this.r,null,null)
z.c=this.e
return z},
gl:function(a){return this.a},
dX:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.df(b)},
df:function(a){var z=this.d
if(z==null)return!1
return this.at(z[this.as(a)],a)>=0},
cb:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dX(0,a)?a:null
else return this.ds(a)},
ds:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.as(a)]
x=this.at(y,a)
if(x<0)return
return J.c3(y,x).gbF()},
H:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.H(this))
z=z.b}},
a6:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bz(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bz(x,b)}else return this.V(b)},
V:function(a){var z,y,x
z=this.d
if(z==null){z=P.hD()
this.d=z}y=this.as(a)
x=z[y]
if(x==null)z[y]=[this.aR(a)]
else{if(this.at(x,a)>=0)return!1
x.push(this.aR(a))}return!0},
a9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bA(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bA(this.c,b)
else return this.dB(b)},
dB:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.as(a)]
x=this.at(y,a)
if(x<0)return!1
this.bB(y.splice(x,1)[0])
return!0},
T:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bz:function(a,b){if(a[b]!=null)return!1
a[b]=this.aR(b)
return!0},
bA:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bB(z)
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
bB:function(a){var z,y
z=a.gde()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
as:function(a){return J.F(a)&0x3ffffff},
at:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.X(a[y].gbF(),b))return y
return-1},
$isq:1,
static:{hD:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f9:{
"^":"a;bF:a<,b,de:c<"},
cy:{
"^":"a;a,b,c,d",
gC:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.H(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hA:{
"^":"fn;"},
bx:{
"^":"a;",
gG:function(a){return new H.cz(a,this.gl(a),0,null)},
W:function(a,b){return this.h(a,b)},
H:function(a,b){var z,y
z=this.gl(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.H(a))}},
a8:function(a,b){return H.c(new H.bA(a,b),[null,null])},
i:function(a){return P.aR(a,"[","]")},
$isj:1,
$asj:null,
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
if(z!==this.d)H.B(new P.H(this))}},
gM:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
T:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aR(this,"{","}")},
cn:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bv());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
V:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bH();++this.d},
bH:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.u(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bt(y,0,w,z,x)
C.b.bt(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
d0:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$isq:1,
static:{by:function(a,b){var z=H.c(new P.fa(null,0,0,0),[b])
z.d0(a,b)
return z}}},
hG:{
"^":"a;a,b,c,d,e",
gC:function(){return this.e},
v:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.B(new P.H(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fo:{
"^":"a;",
a8:function(a,b){return H.c(new H.cp(this,b),[H.u(this,0),null])},
i:function(a){return P.aR(this,"{","}")},
H:function(a,b){var z
for(z=this.gG(this);z.v();)b.$1(z.d)},
$isq:1},
fn:{
"^":"fo;"}}],["","",,P,{
"^":"",
i7:function(a){return H.fz(a)},
bq:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.av(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eE(a)},
eE:function(a){var z=J.l(a)
if(!!z.$isd)return z.i(a)
return H.b0(a)},
aQ:function(a){return new P.hm(a)},
bz:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.bn(a);y.v();)z.push(y.gC())
if(b)return z
z.fixed$length=Array
return z},
aI:function(a){var z=H.b(a)
H.dG(z)},
jv:{
"^":"d:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.i7(a)}},
bV:{
"^":"a;"},
"+bool":0,
ci:{
"^":"a;a,b",
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.ci))return!1
return this.a===b.a&&this.b===b.b},
gw:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ey(z?H.G(this).getUTCFullYear()+0:H.G(this).getFullYear()+0)
x=P.aw(z?H.G(this).getUTCMonth()+1:H.G(this).getMonth()+1)
w=P.aw(z?H.G(this).getUTCDate()+0:H.G(this).getDate()+0)
v=P.aw(z?H.G(this).getUTCHours()+0:H.G(this).getHours()+0)
u=P.aw(z?H.G(this).getUTCMinutes()+0:H.G(this).getMinutes()+0)
t=P.aw(z?H.G(this).getUTCSeconds()+0:H.G(this).getSeconds()+0)
s=P.ez(H.cJ(this))
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
return"00"+a},aw:function(a){if(a>=10)return""+a
return"0"+a}}},
bj:{
"^":"aH;"},
"+double":0,
ax:{
"^":"a;a",
p:function(a,b){return new P.ax(C.d.p(this.a,b.gdh()))},
aG:function(a,b){return C.d.aG(this.a,b.gdh())},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.ax))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eD()
y=this.a
if(y<0)return"-"+new P.ax(-y).i(0)
x=z.$1(C.d.bj(C.d.ag(y,6e7),60))
w=z.$1(C.d.bj(C.d.ag(y,1e6),60))
v=new P.eC().$1(C.d.bj(y,1e6))
return""+C.d.ag(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
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
C:{
"^":"a;",
gR:function(){return H.A(this.$thrownJsError)}},
cI:{
"^":"C;",
i:function(a){return"Throw of null."}},
a6:{
"^":"C;a,b,c,d",
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
u=P.bq(this.b)
return w+v+": "+H.b(u)},
static:{aN:function(a){return new P.a6(!1,null,null,a)},el:function(a,b,c){return new P.a6(!0,a,b,c)}}},
cN:{
"^":"a6;e,f,a,b,c,d",
gaU:function(){return"RangeError"},
gaT:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.eP()
if(typeof z!=="number")return H.v(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b1:function(a,b,c){return new P.cN(null,null,!0,a,b,"Value not in range")},al:function(a,b,c,d,e){return new P.cN(b,c,!0,a,d,"Invalid value")},cO:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.al(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.al(b,a,c,"end",f))
return b}}},
eM:{
"^":"a6;e,l:f>,a,b,c,d",
gaU:function(){return"RangeError"},
gaT:function(){P.bq(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dM(this.b,0)?": index must not be negative":z},
static:{bu:function(a,b,c,d,e){var z=e!=null?e:J.au(b)
return new P.eM(b,z,!0,a,c,"Index out of range")}}},
M:{
"^":"C;a",
i:function(a){return"Unsupported operation: "+this.a}},
db:{
"^":"C;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
am:{
"^":"C;a",
i:function(a){return"Bad state: "+this.a}},
H:{
"^":"C;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bq(z))+"."}},
cR:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gR:function(){return},
$isC:1},
ex:{
"^":"C;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hm:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eF:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.b_(b,"expando$values")
return z==null?null:H.b_(z,this.bG())},
B:function(a,b,c){var z=H.b_(b,"expando$values")
if(z==null){z=new P.a()
H.bF(b,"expando$values",z)}H.bF(z,this.bG(),c)},
bG:function(){var z,y
z=H.b_(this,"expando$key")
if(z==null){y=$.cq
$.cq=y+1
z="expando$key$"+y
H.bF(this,"expando$key",z)}return z}},
eH:{
"^":"a;"},
p:{
"^":"aH;"},
"+int":0,
L:{
"^":"a;",
a8:function(a,b){return H.aY(this,b,H.J(this,"L",0),null)},
H:function(a,b){var z
for(z=this.gG(this);z.v();)b.$1(z.gC())},
bo:function(a,b){return P.bz(this,b,H.J(this,"L",0))},
bn:function(a){return this.bo(a,!0)},
gl:function(a){var z,y
z=this.gG(this)
for(y=0;z.v();)++y
return y},
W:function(a,b){var z,y,x
if(b<0)H.B(P.al(b,0,null,"index",null))
for(z=this.gG(this),y=0;z.v();){x=z.gC()
if(b===y)return x;++y}throw H.e(P.bu(b,this,"index",null,y))},
i:function(a){return P.eY(this,"(",")")}},
f_:{
"^":"a;"},
j:{
"^":"a;",
$asj:null,
$isq:1},
"+List":0,
jw:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aH:{
"^":"a;"},
"+num":0,
a:{
"^":";",
q:function(a,b){return this===b},
gw:function(a){return H.a_(this)},
i:function(a){return H.b0(this)}},
a0:{
"^":"a;"},
W:{
"^":"a;"},
"+String":0,
bG:{
"^":"a;a4:a<",
gl:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cS:function(a,b,c){var z=J.bn(b)
if(!z.v())return a
if(c.length===0){do a+=H.b(z.gC())
while(z.v())}else{a+=H.b(z.gC())
for(;z.v();)a=a+c+H.b(z.gC())}return a}}},
cT:{
"^":"a;"}}],["","",,W,{
"^":"",
ew:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.y)},
a5:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
di:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dm:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hf(a)
if(!!J.l(z).$isN)return z
return}else return a},
z:function(a){var z=$.k
if(z===C.c)return a
return z.dK(a,!0)},
w:{
"^":"ay;",
$isw:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iJ:{
"^":"w;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iL:{
"^":"w;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iM:{
"^":"w;",
gbd:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbe:function(a){return H.c(new W.r(a,"load",!1),[null])},
$isN:1,
$isf:1,
"%":"HTMLBodyElement"},
cg:{
"^":"w;m:height%,n:width%",
br:function(a,b,c){return a.getContext(b,P.ig(c))},
cC:function(a,b,c,d,e,f,g){var z,y
z=P.ab(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.br(a,"webgl",z)
return y==null?this.br(a,"experimental-webgl",z):y},
cB:function(a,b){return this.cC(a,!0,!0,!0,!0,!1,b)},
$iscg:1,
"%":"HTMLCanvasElement"},
iO:{
"^":"aZ;l:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iP:{
"^":"eN;l:length=",
bs:function(a,b){var z=this.dj(a,b)
return z!=null?z:""},
dj:function(a,b){if(W.ew(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.eA()+b)},
gm:function(a){return a.height},
gn:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eN:{
"^":"f+ev;"},
ev:{
"^":"a;",
gm:function(a){return this.bs(a,"height")},
gn:function(a){return this.bs(a,"width")}},
iQ:{
"^":"aZ;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iR:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
eB:{
"^":"f;b4:bottom=,m:height=,N:left=,bk:right=,ac:top=,n:width=,j:x=,k:y=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gn(a))+" x "+H.b(this.gm(a))},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
y=a.left
x=z.gN(b)
if(y==null?x==null:y===x){y=a.top
x=z.gac(b)
if(y==null?x==null:y===x){y=this.gn(a)
x=z.gn(b)
if(y==null?x==null:y===x){y=this.gm(a)
z=z.gm(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){var z,y,x,w
z=J.F(a.left)
y=J.F(a.top)
x=J.F(this.gn(a))
w=J.F(this.gm(a))
return W.di(W.a5(W.a5(W.a5(W.a5(0,z),y),x),w))},
gbp:function(a){return H.c(new P.I(a.left,a.top),[null])},
$isV:1,
$asV:I.bd,
"%":";DOMRectReadOnly"},
ay:{
"^":"aZ;",
gJ:function(a){return P.fh(C.a.F(a.offsetLeft),C.a.F(a.offsetTop),C.a.F(a.offsetWidth),C.a.F(a.offsetHeight),null)},
i:function(a){return a.localName},
cA:function(a){return a.getBoundingClientRect()},
gbd:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbe:function(a){return H.c(new W.r(a,"load",!1),[null])},
gcd:function(a){return H.c(new W.r(a,"mousedown",!1),[null])},
gce:function(a){return H.c(new W.r(a,"mouseenter",!1),[null])},
gcf:function(a){return H.c(new W.r(a,"mouseleave",!1),[null])},
gcg:function(a){return H.c(new W.r(a,"mousemove",!1),[null])},
gci:function(a){return H.c(new W.r(a,"mouseout",!1),[null])},
gcj:function(a){return H.c(new W.r(a,"mouseover",!1),[null])},
gck:function(a){return H.c(new W.r(a,"mouseup",!1),[null])},
$isay:1,
$isf:1,
$isN:1,
"%":";Element"},
iS:{
"^":"w;m:height%,U:src},n:width%",
"%":"HTMLEmbedElement"},
iT:{
"^":"br;aj:error=",
"%":"ErrorEvent"},
br:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
N:{
"^":"f;",
d9:function(a,b,c,d){return a.addEventListener(b,H.as(c,1),d)},
dC:function(a,b,c,d){return a.removeEventListener(b,H.as(c,1),d)},
$isN:1,
"%":"MediaStream;EventTarget"},
jd:{
"^":"w;l:length=",
"%":"HTMLFormElement"},
je:{
"^":"w;m:height%,U:src},n:width%",
"%":"HTMLIFrameElement"},
cs:{
"^":"w;m:height%,U:src},n:width%",
b9:function(a,b){return a.complete.$1(b)},
$iscs:1,
"%":"HTMLImageElement"},
jg:{
"^":"w;m:height%,U:src},n:width%",
$isay:1,
$isf:1,
$isN:1,
"%":"HTMLInputElement"},
fd:{
"^":"w;aj:error=,U:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bB:{
"^":"da;",
gJ:function(a){var z,y
if(!!a.offsetX)return H.c(new P.I(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.dm(a.target)).$isay)throw H.e(new P.M("offsetX is only supported on elements"))
z=W.dm(a.target)
y=H.c(new P.I(a.clientX,a.clientY),[null]).aJ(0,J.eb(J.ee(z)))
return H.c(new P.I(J.cc(y.a),J.cc(y.b)),[null])}},
$isbB:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
ju:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aZ:{
"^":"N;",
i:function(a){var z=a.nodeValue
return z==null?this.cV(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
jx:{
"^":"w;m:height%,n:width%",
"%":"HTMLObjectElement"},
jA:{
"^":"w;U:src}",
"%":"HTMLScriptElement"},
jC:{
"^":"w;l:length=",
"%":"HTMLSelectElement"},
jD:{
"^":"w;U:src}",
"%":"HTMLSourceElement"},
jE:{
"^":"br;aj:error=",
"%":"SpeechRecognitionError"},
bK:{
"^":"f;",
$isa:1,
"%":"Touch"},
bL:{
"^":"da;dP:changedTouches=",
$isbL:1,
$isa:1,
"%":"TouchEvent"},
jJ:{
"^":"eP;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bu(b,a,null,null,null))
return a[b]},
B:function(a,b,c){throw H.e(new P.M("Cannot assign element of immutable List."))},
W:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bK]},
$isq:1,
$isaU:1,
$isaS:1,
"%":"TouchList"},
eO:{
"^":"f+bx;",
$isj:1,
$asj:function(){return[W.bK]},
$isq:1},
eP:{
"^":"eO+eL;",
$isj:1,
$asj:function(){return[W.bK]},
$isq:1},
jK:{
"^":"w;U:src}",
"%":"HTMLTrackElement"},
da:{
"^":"br;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
dc:{
"^":"fd;m:height%,n:width%",
$isdc:1,
"%":"HTMLVideoElement"},
jO:{
"^":"N;",
$isf:1,
$isN:1,
"%":"DOMWindow|Window"},
jS:{
"^":"f;b4:bottom=,m:height=,N:left=,bk:right=,ac:top=,n:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
y=a.left
x=z.gN(b)
if(y==null?x==null:y===x){y=a.top
x=z.gac(b)
if(y==null?x==null:y===x){y=a.width
x=z.gn(b)
if(y==null?x==null:y===x){y=a.height
z=z.gm(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){var z,y,x,w
z=J.F(a.left)
y=J.F(a.top)
x=J.F(a.width)
w=J.F(a.height)
return W.di(W.a5(W.a5(W.a5(W.a5(0,z),y),x),w))},
gbp:function(a){return H.c(new P.I(a.left,a.top),[null])},
$isV:1,
$asV:I.bd,
"%":"ClientRect"},
jT:{
"^":"aZ;",
$isf:1,
"%":"DocumentType"},
jU:{
"^":"eB;",
gm:function(a){return a.height},
gn:function(a){return a.width},
gj:function(a){return a.x},
gk:function(a){return a.y},
"%":"DOMRect"},
jX:{
"^":"w;",
$isN:1,
$isf:1,
"%":"HTMLFrameSetElement"},
hl:{
"^":"a1;",
a2:function(a,b,c,d){var z=new W.y(0,this.a,this.b,W.z(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.D()
return z},
ca:function(a,b,c){return this.a2(a,null,b,c)}},
r:{
"^":"hl;a,b,c"},
y:{
"^":"fq;a,b,c,d,e",
b6:function(){if(this.b==null)return
this.bZ()
this.b=null
this.d=null
return},
bh:function(a,b){if(this.b==null)return;++this.a
this.bZ()},
an:function(a){return this.bh(a,null)},
co:function(){if(this.b==null||this.a<=0)return;--this.a
this.D()},
D:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dN(x,this.c,z,this.e)}},
bZ:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dO(x,this.c,z,this.e)}}},
eL:{
"^":"a;",
gG:function(a){return new W.eG(a,this.gl(a),-1,null)},
$isj:1,
$asj:null,
$isq:1},
eG:{
"^":"a;a,b,c,d",
v:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c3(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gC:function(){return this.d}},
he:{
"^":"a;a",
$isN:1,
$isf:1,
static:{hf:function(a){if(a===window)return a
else return new W.he(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iH:{
"^":"a9;",
$isf:1,
"%":"SVGAElement"},
iI:{
"^":"fA;",
$isf:1,
"%":"SVGAltGlyphElement"},
iK:{
"^":"n;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iU:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEBlendElement"},
iV:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iW:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEComponentTransferElement"},
iX:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFECompositeElement"},
iY:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
iZ:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
j_:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
j0:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEFloodElement"},
j1:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
j2:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEImageElement"},
j3:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEMergeElement"},
j4:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEMorphologyElement"},
j5:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFEOffsetElement"},
j6:{
"^":"n;j:x=,k:y=",
"%":"SVGFEPointLightElement"},
j7:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFESpecularLightingElement"},
j8:{
"^":"n;j:x=,k:y=",
"%":"SVGFESpotLightElement"},
j9:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFETileElement"},
ja:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFETurbulenceElement"},
jb:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGFilterElement"},
jc:{
"^":"a9;m:height=,n:width=,j:x=,k:y=",
"%":"SVGForeignObjectElement"},
eK:{
"^":"a9;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
a9:{
"^":"n;",
$isf:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jf:{
"^":"a9;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGImageElement"},
jj:{
"^":"n;",
$isf:1,
"%":"SVGMarkerElement"},
jk:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGMaskElement"},
jy:{
"^":"n;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGPatternElement"},
jz:{
"^":"eK;m:height=,n:width=,j:x=,k:y=",
"%":"SVGRectElement"},
jB:{
"^":"n;",
$isf:1,
"%":"SVGScriptElement"},
n:{
"^":"ay;",
gbd:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbe:function(a){return H.c(new W.r(a,"load",!1),[null])},
gcd:function(a){return H.c(new W.r(a,"mousedown",!1),[null])},
gce:function(a){return H.c(new W.r(a,"mouseenter",!1),[null])},
gcf:function(a){return H.c(new W.r(a,"mouseleave",!1),[null])},
gcg:function(a){return H.c(new W.r(a,"mousemove",!1),[null])},
gci:function(a){return H.c(new W.r(a,"mouseout",!1),[null])},
gcj:function(a){return H.c(new W.r(a,"mouseover",!1),[null])},
gck:function(a){return H.c(new W.r(a,"mouseup",!1),[null])},
$isN:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jG:{
"^":"a9;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGSVGElement"},
jH:{
"^":"n;",
$isf:1,
"%":"SVGSymbolElement"},
cV:{
"^":"a9;",
"%":";SVGTextContentElement"},
jI:{
"^":"cV;",
$isf:1,
"%":"SVGTextPathElement"},
fA:{
"^":"cV;j:x=,k:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jL:{
"^":"a9;m:height=,n:width=,j:x=,k:y=",
$isf:1,
"%":"SVGUseElement"},
jM:{
"^":"n;",
$isf:1,
"%":"SVGViewElement"},
jW:{
"^":"n;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jY:{
"^":"n;",
$isf:1,
"%":"SVGCursorElement"},
jZ:{
"^":"n;",
$isf:1,
"%":"SVGFEDropShadowElement"},
k_:{
"^":"n;",
$isf:1,
"%":"SVGGlyphRefElement"},
k0:{
"^":"n;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
fk:{
"^":"f;",
dI:function(a,b,c){return a.bindBuffer(b,c)},
dJ:function(a,b,c){return a.bindTexture(b,c)},
dL:function(a,b){return a.blendEquation(b)},
dM:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dN:function(a,b,c,d){return a.bufferData(b,c,d)},
dQ:function(a,b){return a.clear(b)},
dR:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dS:function(a,b){return a.clearDepth(b)},
dT:function(a,b){return a.clearStencil(b)},
dV:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
e_:function(a){return a.createBuffer()},
e0:function(a){return a.createProgram()},
e1:function(a,b){return a.createShader(b)},
e2:function(a){return a.createTexture()},
e3:function(a,b){return a.depthFunc(b)},
e4:function(a,b){return a.depthMask(b)},
eb:function(a,b){return a.disableVertexAttribArray(b)},
ec:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
ed:function(a,b){return a.enable(b)},
ee:function(a,b){return a.enableVertexAttribArray(b)},
cz:function(a,b,c){return a.getAttribLocation(b,c)},
cE:function(a,b){return a.getParameter(b)},
cG:function(a,b,c){return a.getUniformLocation(b,c)},
cR:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cS:function(a,b,c,d){return a.stencilOp(b,c,d)},
eJ:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.ii(g))
return}z=J.l(g)
if(!!z.$iscs)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscg)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdc)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aN("Incorrect number or type of arguments"))},
eI:function(a,b,c,d,e,f,g){return this.eJ(a,b,c,d,e,f,g,null,null,null)},
eK:function(a,b,c,d){return a.texParameteri(b,c,d)},
eM:function(a,b){return a.useProgram(b)},
eN:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iN:{
"^":"a;"}}],["","",,P,{
"^":"",
ao:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dj:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
I:{
"^":"a;j:a>,k:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.I))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){var z,y
z=J.F(this.a)
y=J.F(this.b)
return P.dj(P.ao(P.ao(0,z),y))},
p:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gj(b)
if(typeof z!=="number")return z.p()
x=C.a.p(z,x)
z=this.b
y=y.gk(b)
if(typeof z!=="number")return z.p()
y=new P.I(x,C.a.p(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aJ:function(a,b){var z,y,x,w
z=this.a
y=J.ed(b)
if(typeof z!=="number")return z.aJ()
if(typeof y!=="number")return H.v(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aJ()
if(typeof w!=="number")return H.v(w)
w=new P.I(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hO:{
"^":"a;",
gbk:function(a){return this.gN(this)+this.c},
gb4:function(a){return this.gac(this)+this.d},
i:function(a){return"Rectangle ("+this.gN(this)+", "+this.b+") "+this.c+" x "+this.d},
q:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
if(this.gN(this)===z.gN(b)){y=this.b
z=y===z.gac(b)&&this.a+this.c===z.gbk(b)&&y+this.d===z.gb4(b)}else z=!1
return z},
gw:function(a){var z=this.b
return P.dj(P.ao(P.ao(P.ao(P.ao(0,this.gN(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbp:function(a){var z=new P.I(this.gN(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
V:{
"^":"hO;N:a>,ac:b>,n:c>,m:d>",
$asV:null,
static:{fh:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.c(new P.V(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
m:function(a){return a},
b9:function(a){return a},
cC:{
"^":"f;",
$iscC:1,
"%":"ArrayBuffer"},
bE:{
"^":"f;",
$isbE:1,
"%":"DataView;ArrayBufferView;bC|cD|cF|bD|cE|cG|Z"},
bC:{
"^":"bE;",
gl:function(a){return a.length},
$isaU:1,
$isaS:1},
bD:{
"^":"cF;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
return a[b]},
B:function(a,b,c){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
a[b]=c}},
cD:{
"^":"bC+bx;",
$isj:1,
$asj:function(){return[P.bj]},
$isq:1},
cF:{
"^":"cD+cr;"},
Z:{
"^":"cG;",
B:function(a,b,c){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.p]},
$isq:1},
cE:{
"^":"bC+bx;",
$isj:1,
$asj:function(){return[P.p]},
$isq:1},
cG:{
"^":"cE+cr;"},
jl:{
"^":"bD;",
$isj:1,
$asj:function(){return[P.bj]},
$isq:1,
"%":"Float32Array"},
jm:{
"^":"bD;",
$isj:1,
$asj:function(){return[P.bj]},
$isq:1,
"%":"Float64Array"},
jn:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Int16Array"},
jo:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Int32Array"},
jp:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Int8Array"},
jq:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Uint16Array"},
jr:{
"^":"Z;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"Uint32Array"},
js:{
"^":"Z;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jt:{
"^":"Z;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.B(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.p]},
$isq:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dG:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
eo:{
"^":"fM;fx,fy,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c,d",
aB:function(a,b){var z
this.cX(a,b)
z=this.fx
if(z!==0){this.z=this.z-3.141592653589793*((b-z)/1000)
this.cx=!0
this.x=200
this.cx=!0
this.y=150
this.cx=!0
this.f=100
this.r=100
this.Q=0.8
this.cx=!0
this.ch=0.8
this.cx=!0
z=this.fy+(b-z)
this.fy=z
if(z>100){this.fy=0
if(++this.cy>=this.db.length)this.cy=0}}this.fx=b},
static:{aP:function(a){var z=0,y=new P.a8(),x,w=2,v,u,t,s,r,q,p,o,n,m
function $async$aP(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=a
z=3
return H.o(s.ay("assets/chara.png"),$async$aP,y)
case 3:u=c
s=E
s=s
r=Float64Array
q=H
t=new s.Q(new r(q.m(16)))
s=t
s.P()
s=F
t=new s.eo(0,0,u,null,null,0,0,0,1,1,!0,0,[],[],[],null,"none",null,t,!1)
s=t
s.b=[]
s=t
s=s
r=u
q=F
q=new q.R(0,0,200,200)
p=F
p=new p.R(0,0,200,200)
o=F
q=[q,p,new o.R(0,0,200,200)]
p=F
p=new p.R(0,0,200,200)
o=F
o=new o.R(200,0,200,200)
n=F
p=[p,o,new n.R(0,200,200,200)]
o=C
o=o.e
n=C
n=n.e
m=C
s.d4(r,null,null,q,p,[o,n,m.e])
x=t
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$aP,y,null)}}}}],["","",,P,{
"^":"",
ig:function(a){var z={}
a.H(0,new P.ih(z))
return z},
ii:function(a){return a},
cn:function(){var z=$.cm
if(z==null){z=J.bl(window.navigator.userAgent,"Opera",0)
$.cm=z}return z},
eA:function(){var z,y
z=$.cj
if(z!=null)return z
y=$.ck
if(y==null){y=J.bl(window.navigator.userAgent,"Firefox",0)
$.ck=y}if(y===!0)z="-moz-"
else{y=$.cl
if(y==null){y=P.cn()!==!0&&J.bl(window.navigator.userAgent,"Trident/",0)
$.cl=y}if(y===!0)z="-ms-"
else z=P.cn()===!0?"-o-":"-webkit-"}$.cj=z
return z},
ih:{
"^":"d:18;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
c0:[function(){var z=0,y=new P.a8(),x=1,w,v,u,t,s,r,q,p
function $async$c0(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=G
r=r
q=P
q=q.aW()
p=P
v=new r.fH(700,500,q,p.aW())
r=E
r=r
q=Float64Array
p=H
u=new r.Q(new q(p.m(16)))
r=u
r.P()
r=F
t=new r.fI(400,300,1,1,1,0,0,null,!0,"none",null,u,!1)
r=t
r.b=[]
r=t
q=F
r.ch=q.b3(255,238,238,255)
r=E
r=r
q=Float64Array
p=H
u=new r.Q(new q(p.m(16)))
r=u
r.P()
r=G
s=new r.fU(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
r=s
q=G
r.a=q.fQ(400,600)
r=s
r.seF(t)
r=s
r.ez()
r=s
r.eL()
r=s
r.x=!0
r=s
z=!r.d?2:3
break
case 2:r=s
r.d=!0
r=s
r.ar()
case 3:r=t
r=r
q=F
z=4
return H.o(q.aP(v),$async$c0,y)
case 4:r.aw(b)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$c0,y,null)},"$0","dE",0,0,0]},1],["","",,F,{
"^":"",
cx:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.ai)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.b1(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
a2:{
"^":"a;a",
i:function(a){return C.z.h(0,this.a)}},
fF:{
"^":"a;"},
cY:{
"^":"a;cc:c<",
aw:function(a){var z=0,y=new P.a8(),x=1,w,v=this,u,t,s,r
function $async$aw(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.c(new s.D(0,r.k,null),[null])
t=u
t.aO(null)
z=2
return H.o(u,$async$aw,y)
case 2:t=v
t=t.b
t.push(a)
return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$aw,y,null)},
c7:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.ai)(z),++x)z[x].c7(a)},
aB:function(a,b){},
cs:function(a,b){var z,y,x
this.ba()
this.aB(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.ai)(z),++x)z[x].cs(a,b)},
bf:function(a,b){},
bg:["cW",function(a,b){var z,y,x,w,v,u
this.ba()
this.bf(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.ai)(z),++w){v=z[w]
u=v.gcc()
x.push(C.b.ga7(x).t(0,u))
b.aE()
v.bg(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aE()}}],
ct:["bv",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.ba()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.cm(v.gcc())
u=v.ct(a,b,c,d,e)
a.cl()
if(u===!0)return u}t=a.cD().b8(0)
t.es()
y=new E.t(new Float64Array(H.m(3)))
y.A(d,e,0)
s=t.t(0,y)
s.gj(s)
s.gk(s)
return!1}],
ba:function(){if(!this.d)this.d=!0}},
fG:{
"^":"a;",
ay:function(a){var z=0,y=new P.a8(),x,w=2,v,u=this,t,s,r,q
function $async$ay(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.ah(a)?3:4
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
return H.o(q.az(a),$async$ay,y)
case 5:s.B(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$ay,y,null)}},
R:{
"^":"a;j:a>,k:b>,I:c<,X:d<",
q:function(a,b){if(b==null)return!1
return b instanceof F.R&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gw:function(a){return F.cx([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+this.a+", y:"+this.b+", w:"+H.b(this.c)+", h:"+H.b(this.d)}},
fL:{
"^":"a;a",
i:function(a){return C.A.h(0,this.a)}},
fK:{
"^":"a;a,b,c",
d3:function(a){if(this.a==null)this.a=F.b3(255,255,255,255)},
static:{bI:function(a){var z=new F.fK(a,C.k,1)
z.d3(a)
return z}}},
cX:{
"^":"a;a",
q:function(a,b){if(b==null)return!1
return b instanceof F.cX&&b.a===this.a},
gw:function(a){return F.cx([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
d2:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{b3:function(a,b,c,d){var z=new F.cX(0)
z.d2(a,b,c,d)
return z}}},
fJ:{
"^":"a;"},
fI:{
"^":"cY;I:e<,X:f<,r,x,y,z,Q,ch,cx,a,b,c,d",
ct:function(a,b,c,d,e){this.bv(a,b,c,d,e)},
aB:function(a,b){var z,y,x,w
z=this.e
y=(a.gI()-a.geA(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.Q(new Float64Array(H.m(16)))
y.P()
this.c=y
y.aD(0,this.z,this.Q,0)
y=this.c
z=this.y
y.aH(0,z,z,1)},
bg:function(a,b){var z,y
z=new F.R(0,0,this.e,this.f)
y=this.cx
if(y){b.b.push(z)
b.b7(a,z)}this.cW(a,b)
if(y){y=b.b
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.b7(a,C.b.ga7(y))
else{y=a.a
b.b7(a,new F.R(0,0,y.c,y.d))}}},
bf:function(a,b){var z=F.bI(null)
z.a=this.ch
b.c4(a,new F.R(0,0,this.e,this.f),z)}},
fM:{
"^":"cY;",
gj:function(a){return this.x},
gk:function(a){return this.y},
aB:["cX",function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.cx){this.c.P()
this.c.aD(0,this.x,this.y,0)
this.c.aH(0,this.Q,this.ch,1)
z=this.c
y=this.z
x=Math.cos(H.ba(y))
w=Math.sin(H.ba(y))
z=z.a
y=z[0]
v=z[4]
u=z[1]
t=z[5]
s=z[2]
r=z[6]
q=z[3]
p=z[7]
o=-w
z[0]=y*x+v*w
z[1]=u*x+t*w
z[2]=s*x+r*w
z[3]=q*x+p*w
z[4]=y*o+v*x
z[5]=u*o+t*x
z[6]=s*o+r*x
z[7]=q*o+p*x
p=this.c
o=this.f
if(typeof o!=="number")return o.cH()
q=this.r
if(typeof q!=="number")return q.cH()
p.aD(0,-o,-q,0)}}],
bf:function(a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.cy
y=this.db
x=y.length
if(z>=x)z=x-1
w=this.e
if(z<0||z>=x)return H.h(y,z)
y=y[z]
x=this.dx
if(z>=x.length)return H.h(x,z)
x=x[z]
v=this.fr
u=this.dy
if(z>=u.length)return H.h(u,z)
u=u[z]
t=a2.Q
if(t!=null&&!J.X(t,w))a2.ax(0)
a2.Q=w
w=J.i(y)
t=w.gj(y)
s=a2.Q.gI()
if(typeof t!=="number")return t.aF()
if(typeof s!=="number")return H.v(s)
r=t/s
s=w.gk(y)
t=a2.Q.gX()
if(typeof s!=="number")return s.aF()
if(typeof t!=="number")return H.v(t)
q=s/t
t=w.gj(y)
s=y.gI()
if(typeof t!=="number")return t.p()
if(typeof s!=="number")return H.v(s)
p=a2.Q.gI()
if(typeof p!=="number")return H.v(p)
o=(t+s)/p
w=w.gk(y)
y=y.gX()
if(typeof w!=="number")return w.p()
if(typeof y!=="number")return H.v(y)
p=a2.Q.gX()
if(typeof p!=="number")return H.v(p)
n=(w+y)/p
y=a2.z
switch(u){case C.e:C.b.E(y,[r,q,r,n,o,q,o,n])
break
case C.E:C.b.E(y,[r,n,o,n,r,q,o,q])
break
case C.F:C.b.E(y,[o,n,o,q,r,n,r,q])
break
case C.G:C.b.E(y,[o,q,r,q,o,n,r,n])
break
case C.H:C.b.E(y,[o,q,o,n,r,q,r,n])
break
case C.I:C.b.E(y,[r,q,o,q,r,n,o,n])
break
case C.J:C.b.E(y,[r,n,r,q,o,n,o,q])
break
case C.K:C.b.E(y,[o,n,r,n,o,q,r,q])
break
default:C.b.E(y,[r,q,r,n,o,q,o,n])}m=a2.b5()
y=J.i(x)
l=y.gj(x)
k=y.gk(x)
w=y.gj(x)
u=x.gI()
if(typeof w!=="number")return w.p()
if(typeof u!=="number")return H.v(u)
j=w+u
y=y.gk(x)
x=x.gX()
if(typeof y!=="number")return y.p()
if(typeof x!=="number")return H.v(x)
i=y+x
x=new E.t(new Float64Array(H.m(3)))
x.A(l,k,0)
h=m.t(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.A(l,i,0)
g=m.t(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.A(j,k,0)
f=m.t(0,x)
x=new E.t(new Float64Array(H.m(3)))
x.A(j,i,0)
e=m.t(0,x)
x=a2.x
d=x.length/8|0
v=v.a.a
c=(v>>>16&255)/255
b=(v>>>8&255)/255
a=(v>>>0&255)/255
a0=(v>>>24&255)/255
C.b.E(x,[h.gj(h),h.gk(h),a2.ch,c,b,a,a0,1,g.gj(g),g.gk(g),a2.ch,c,b,a,a0,1,f.gj(f),f.gk(f),a2.ch,c,b,a,a0,1,e.gj(e),e.gk(e),a2.ch,c,b,a,a0,1])
a2.ch+=0.0001
x=d+1
v=d+2
C.b.E(a2.y,[d,x,v,x,d+3,v])},
d4:function(a,b,c,d,e,f){var z
if(this.f==null){z=this.e.gI()
if(typeof z!=="number")return z.aF()
this.f=z/2}if(this.r==null){z=this.e.gX()
if(typeof z!=="number")return z.aF()
this.r=z/2}C.b.E(this.db,e)
C.b.E(this.dx,d)
C.b.E(this.dy,f)
this.fr=F.bI(null)}},
b4:{
"^":"a;a",
i:function(a){return C.B.h(0,this.a)}},
fN:{
"^":"a;",
seF:function(a){this.c$=a},
ev:function(a){if(!this.e$){this.c$.c7(this)
this.e$=!0}this.c$.cs(this,a)
this.ey()},
ew:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.ga7(y).t(0,z))
b.aE()
this.c$.bg(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
b.aE()},
Y:function(a,b,c,d,e){a.cm(this.c$.c)
this.c$.bv(a,b,c,d,e)
a.cl()},
cm:function(a){var z=this.f$
z.push(C.b.ga7(z).t(0,a))},
cl:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cD:function(){return C.b.ga7(this.f$)}}}],["","",,G,{
"^":"",
bJ:function(a){var z=0,y=new P.a8(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bJ(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.c(new p.de(o.c(new n.D(0,m.k,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.ej(t,a)
q=J
s=q.i(t)
q=s
r=q.gbe(t)
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
m=m.z(new l.fS(u,t))
l=r
p=new p.y(0,o,n,m,l.c)
o=H
q=q.c(p,[o.u(r,0)])
q.D()
q=s
s=q.gbd(t)
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
m=m.z(new l.fT(a,u))
l=s
p=new p.y(0,o,n,m,l.c)
o=H
q=q.c(p,[o.u(s,0)])
q.D()
q=u
x=q.a
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$bJ,y,null)},
cZ:function(a,b,c){var z,y
z=J.dY(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
fR:{
"^":"fJ;a,b",
gI:function(){return J.ec(this.a)},
gX:function(){return J.e3(this.a)},
cF:function(a){var z
if(this.b==null){z=J.i(a).e2(a)
this.b=z
a.bindTexture(3553,z)
C.D.eI(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
fP:{
"^":"a;a,b,c,m:d>",
d5:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.aa(b)
y=C.d.aa(a)
x=document.createElement("canvas",null)
J.ek(x,z)
J.ei(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.ef(this.b,!0)},
static:{fQ:function(a,b){var z=new G.fP(null,null,null,null)
z.d5(a,b)
return z}}},
fH:{
"^":"fG;n:c>,m:d>,a,b",
az:function(a){var z=0,y=new P.a8(),x,w=2,v,u,t
function $async$az(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.o(t.bJ(a),$async$az,y)
case 3:x=new u.fR(c,null)
z=1
break
case 1:return H.o(x,0,y,null)
case 2:return H.o(v,1,y)}}return H.o(null,$async$az,y,null)}},
fO:{
"^":"fF;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
en:function(){var z,y,x,w,v,u
P.aI("#[A]# "+H.b(J.c9(this.d,35660)))
P.aI("#[B]# "+H.b(J.c9(this.d,33901)))
z=C.b.c8(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.c8(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.cZ(x,35633,z)
v=G.cZ(x,35632,y)
u=J.dX(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
T:function(a){this.r=1
this.ch=-0.5
J.c7(this.d,2960)
J.dZ(this.d,515)
J.dT(this.d,0,0,0,1)
J.dU(this.d,1)
J.dV(this.d,0)
J.c7(this.d,3042)
switch(-1){case-1:J.dP(this.d,32774)
J.dQ(this.d,770,771,770,32772)
break}J.dS(this.d,17664)
C.b.sl(this.x,0)
C.b.sl(this.y,0)
C.b.sl(this.z,0)
this.Q=null},
ax:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.x
if(z.length!==0){y=this.y
F.b3(170,255,170,170)
J.cd(this.d,this.f)
x=J.aK(this.d,this.f,"a_tex")
w=J.bm(this.d)
J.bk(this.d,34962,w)
v=this.z
J.dR(this.d,34962,new Float32Array(H.b9(v)),35044)
J.aJ(this.d,x)
J.aM(this.d,x,2,5126,!1,0,0)
u=this.Q
if(u!=null){t=u.cF(this.d)
J.c4(this.d,3553,t)
J.aL(this.d,3553,10242,33071)
J.aL(this.d,3553,10243,33071)
J.aL(this.d,3553,10241,9728)
J.aL(this.d,3553,10240,9728)}u=this.d
s=J.bm(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.b9(z)),35044)
u.bindBuffer(34962,null)
J.bk(this.d,34962,s)
u=this.d
s=J.bm(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.b9(y)),35044)
u.bindBuffer(34963,null)
J.bk(this.d,34963,s)
u=this.d
u.uniformMatrix4fv(J.eg(u,this.f,"u_mat"),!1,new Float32Array(H.b9(this.cx.a)))
r=J.aK(this.d,this.f,"color")
q=J.aK(this.d,this.f,"vp")
p=J.aK(this.d,this.f,"useTex")
J.aM(this.d,q,3,5126,!1,32,0)
J.aM(this.d,r,4,5126,!1,32,12)
J.aM(this.d,p,1,5126,!1,32,28)
J.aJ(this.d,q)
J.aJ(this.d,r)
J.aJ(this.d,p)
J.e0(this.d,4,y.length,5123,0)
if(x!==0){J.e_(this.d,x)
J.c4(this.d,3553,null)}J.cd(this.d,null)
C.b.sl(z,0)
C.b.sl(y,0)
C.b.sl(v,0)
this.Q=null}},
c4:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=b.c
y=b.d
if(c.b===C.k){x=this.b5()
w=b.a
v=b.b
u=w+z
t=v+y
z=new E.t(new Float64Array(H.m(3)))
z.A(w,v,0)
s=x.t(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.A(w,t,0)
r=x.t(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.A(u,v,0)
q=x.t(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.A(u,t,0)
p=x.t(0,z)
z=c.a.a
this.af(a,s,r,q,p,(z>>>16&255)/255,(z>>>8&255)/255,(z>>>0&255)/255,(z>>>24&255)/255)}else{x=this.b5()
o=b.a
n=c.c
m=n/2
w=o+m
l=b.b
v=l+m
u=o+z-m
t=l+y-m
m=new E.t(new Float64Array(H.m(3)))
m.A(w,v,0)
s=x.t(0,m)
m=w-n
y=v-n
l=new E.t(new Float64Array(H.m(3)))
l.A(m,y,0)
k=x.t(0,l)
l=new E.t(new Float64Array(H.m(3)))
l.A(w,t,0)
r=x.t(0,l)
l=t+n
z=new E.t(new Float64Array(H.m(3)))
z.A(m,l,0)
j=x.t(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.A(u,v,0)
q=x.t(0,z)
n=u+n
z=new E.t(new Float64Array(H.m(3)))
z.A(n,y,0)
i=x.t(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.A(u,t,0)
p=x.t(0,z)
z=new E.t(new Float64Array(H.m(3)))
z.A(n,l,0)
h=x.t(0,z)
z=c.a.a
g=(z>>>16&255)/255
f=(z>>>8&255)/255
e=(z>>>0&255)/255
d=(z>>>24&255)/255
this.af(a,k,j,s,r,g,f,e,d)
this.af(a,j,h,r,p,g,f,e,d)
this.af(a,h,i,p,q,g,f,e,d)
this.af(a,i,k,q,s,g,f,e,d)}},
af:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.x
y=z.length/8|0
C.b.E(z,[b.gj(b),b.gk(b),this.ch,f,g,h,i,-1,c.gj(c),c.gk(c),this.ch,f,g,h,i,-1,d.gj(d),d.gk(d),this.ch,f,g,h,i,-1,e.gj(e),e.gk(e),this.ch,f,g,h,i,-1])
C.b.E(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.b.E(this.y,[y,z,x,z,y+3,x])},
b7:function(a,b){var z
this.ax(0)
J.c5(this.d,!1,!1,!1,!1)
J.c6(this.d,!1)
J.cb(this.d,7680,7681,7681)
J.ca(this.d,519,this.r,255)
z=F.bI(null)
z.a=F.b3(255,255,255,255)
this.c4(null,b,z)
this.ax(0)
J.c5(this.d,!0,!0,!0,!0)
J.c6(this.d,!0)
J.cb(this.d,7680,7680,7680)
J.ca(this.d,515,this.r,255);++this.r},
aE:function(){},
b5:function(){var z,y
this.cy.P()
z=this.cy.aD(0,-1,1,0)
this.cy=z
y=this.e
y=z.aH(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.t(0,C.b.ga7(this.a))
this.cy=y
return y}},
fU:{
"^":"fe;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gj:function(a){return 0},
gk:function(a){return 0},
gI:function(){return this.a.c},
gX:function(){return this.a.d},
geA:function(a){return 0},
ey:function(){this.r=!0},
ar:function(){var z=0,y=new P.a8(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
function $async$ar(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cJ(new h.ci(Date.now(),!1))
i=v
t=i.a
i=E
i=i
h=Float64Array
g=H
s=new i.Q(new h(g.m(16)))
i=s
i.P()
i=E
i=i
h=Float64Array
g=H
r=new i.Q(new h(g.m(16)))
i=r
i.P()
i=E
i=i
h=Float64Array
g=H
q=new i.Q(new h(g.m(16)))
i=q
i.P()
i=G
p=new i.fO(10,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.en()
i=p
i.T(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return H.o(i.eI(new h.ax(15e3),null,null),$async$ar,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.ev(h.aa(u+k))
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
i.ew(v,p)
i=p
i.ax(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.d_(o,m)
i=H
i.dG(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return H.o(null,0,y,null)
case 1:return H.o(w,1,y)}}return H.o(null,$async$ar,y,null)},
eL:function(){var z,y,x,w
z=P.aW()
y=new G.h2(this,z)
x=new G.h1(this,z)
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchcancel",!1),[null])
H.c(new W.y(0,w.a,w.b,W.z(x),w.c),[H.u(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchend",!1),[null])
H.c(new W.y(0,w.a,w.b,W.z(x),w.c),[H.u(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchenter",!1),[null])
H.c(new W.y(0,w.a,w.b,W.z(y),w.c),[H.u(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchleave",!1),[null])
H.c(new W.y(0,w.a,w.b,W.z(y),w.c),[H.u(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchmove",!1),[null])
H.c(new W.y(0,w.a,w.b,W.z(y),w.c),[H.u(w,0)]).D()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchstart",!1),[null])
H.c(new W.y(0,w.a,w.b,W.z(y),w.c),[H.u(w,0)]).D()},
ez:function(){var z,y
z={}
z.a=!1
y=J.e4(this.a.b)
H.c(new W.y(0,y.a,y.b,W.z(new G.fV(z,this)),y.c),[H.u(y,0)]).D()
y=J.ea(this.a.b)
H.c(new W.y(0,y.a,y.b,W.z(new G.fW(z,this)),y.c),[H.u(y,0)]).D()
y=J.e5(this.a.b)
H.c(new W.y(0,y.a,y.b,W.z(new G.fX(z,this)),y.c),[H.u(y,0)]).D()
y=J.e6(this.a.b)
H.c(new W.y(0,y.a,y.b,W.z(new G.fY(z,this)),y.c),[H.u(y,0)]).D()
y=J.e7(this.a.b)
H.c(new W.y(0,y.a,y.b,W.z(new G.fZ(z,this)),y.c),[H.u(y,0)]).D()
y=J.e8(this.a.b)
H.c(new W.y(0,y.a,y.b,W.z(new G.h_(z,this)),y.c),[H.u(y,0)]).D()
y=J.e9(this.a.b)
H.c(new W.y(0,y.a,y.b,W.z(new G.h0(z,this)),y.c),[H.u(y,0)]).D()}},
fe:{
"^":"a+fN;"},
h2:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c8(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.ai)(y),++v){u=y[v]
t=C.a.F(u.pageX)
s=C.a.F(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
r=t-C.a.F(z.a.b.offsetLeft)
t=C.a.F(u.pageX)
s=C.a.F(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
q=s-C.a.F(z.a.b.offsetTop)
t=w.ah(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.p()
z.Y(z,s+1,C.o,r,q)}else{w.B(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.p()
z.Y(z,t+1,C.n,r,q)}}}},
h1:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c8(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.ai)(y),++v){u=y[v]
if(w.ah(u.identifier)){t=C.a.F(u.pageX)
s=C.a.F(u.pageY)
new P.I(t,s).$builtinTypeInfo=[null]
s=C.a.F(z.a.b.offsetLeft)
r=C.a.F(u.pageX)
q=C.a.F(u.pageY)
new P.I(r,q).$builtinTypeInfo=[null]
r=C.a.F(z.a.b.offsetTop)
w.a9(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.p()
z.Y(z,p+1,C.m,t-s,q-r)}}}},
fV:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gJ(a)
x=x.gj(x)
x.toString
y=y.gJ(a)
y=y.gk(y)
y.toString
z.Y(z,0,C.n,x,y)}}},
fW:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gJ(a)
w=w.gj(w)
w.toString
x=x.gJ(a)
x=x.gk(x)
x.toString
z.Y(z,0,C.m,w,x)
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
w=x.gJ(a)
w=w.gj(w)
w.toString
x=x.gJ(a)
x=x.gk(x)
x.toString
z.Y(z,0,C.l,w,x)
y.a=!1}}}},
fZ:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gJ(a)
x=x.gj(x)
x.toString
y=y.gJ(a)
y=y.gk(y)
y.toString
z.Y(z,0,C.o,x,y)}}},
h_:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gJ(a)
w=w.gj(w)
w.toString
x=x.gJ(a)
x=x.gk(x)
x.toString
z.Y(z,0,C.l,w,x)
y.a=!1}}}},
h0:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fS:{
"^":"d:2;a,b",
$1:function(a){this.a.b9(0,this.b)}},
fT:{
"^":"d:2;a,b",
$1:function(a){this.b.dW("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
Q:{
"^":"a;a",
ad:function(a){var z,y
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
i:function(a){return"[0] "+this.aq(0).i(0)+"\n[1] "+this.aq(1).i(0)+"\n[2] "+this.aq(2).i(0)+"\n[3] "+this.aq(3).i(0)+"\n"},
gea:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
B:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
aq:function(a){var z,y,x
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
b8:function(a){var z=new E.Q(new Float64Array(H.m(16)))
z.ad(this)
return z},
t:function(a,b){var z,y,x
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
return new E.t(z)}if(4===b.gea()){z=new Float64Array(H.m(16))
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
return new E.Q(z)}throw H.e(P.aN(b))},
p:function(a,b){var z,y
z=new Float64Array(H.m(16))
y=this.a
z[0]=C.a.p(y[0],b.gu().h(0,0))
z[1]=C.a.p(y[1],b.gu().h(0,1))
z[2]=C.a.p(y[2],b.gu().h(0,2))
z[3]=C.a.p(y[3],b.gu().h(0,3))
z[4]=C.a.p(y[4],b.gu().h(0,4))
z[5]=C.a.p(y[5],b.gu().h(0,5))
z[6]=C.a.p(y[6],b.gu().h(0,6))
z[7]=C.a.p(y[7],b.gu().h(0,7))
z[8]=C.a.p(y[8],b.gu().h(0,8))
z[9]=C.a.p(y[9],b.gu().h(0,9))
z[10]=C.a.p(y[10],b.gu().h(0,10))
z[11]=C.a.p(y[11],b.gu().h(0,11))
z[12]=C.a.p(y[12],b.gu().h(0,12))
z[13]=C.a.p(y[13],b.gu().h(0,13))
z[14]=C.a.p(y[14],b.gu().h(0,14))
z[15]=C.a.p(y[15],b.gu().h(0,15))
return new E.Q(z)},
aD:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isa3
x=y?b.gI():1
if(!!z.$ist||y){w=z.gj(b)
v=z.gk(b)
u=z.geO(b)}else{u=d
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
aH:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isa3
x=y?b.gI():1
if(!!z.$ist||y){w=z.gj(b)
v=z.gk(b)
u=z.geO(b)}else{u=d
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
P:function(){var z=this.a
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
es:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
A:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ad:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
p:function(a,b){var z,y,x,w
z=this.a
y=C.a.p(z[0],b.gu().h(0,0))
x=C.a.p(z[1],b.gu().h(0,1))
z=C.a.p(z[2],b.gu().h(0,2))
w=new E.t(new Float64Array(H.m(3)))
w.A(y,x,z)
return w},
t:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.v(b)
x=z[1]
z=z[2]
w=new E.t(new Float64Array(H.m(3)))
w.A(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
B:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gl:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.ba(y*y+x*x+z*z))},
b8:function(a){var z=new E.t(new Float64Array(H.m(3)))
z.ad(this)
return z},
gj:function(a){return this.a[0]},
gk:function(a){return this.a[1]}},
a3:{
"^":"a;a",
bu:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ad:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
p:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.p(z[0],b.gu().h(0,0))
x=C.a.p(z[1],b.gu().h(0,1))
w=C.a.p(z[2],b.gu().h(0,2))
z=C.a.p(z[3],b.gu().h(0,3))
v=new E.a3(new Float64Array(H.m(4)))
v.bu(y,x,w,z)
return v},
t:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.v(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a3(new Float64Array(H.m(4)))
v.bu(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
B:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gl:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.ba(y*y+x*x+w*w+z*z))},
b8:function(a){var z=new E.a3(new Float64Array(H.m(4)))
z.ad(this)
return z},
gj:function(a){return this.a[0]},
gk:function(a){return this.a[1]},
gI:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cv.prototype
return J.f1.prototype}if(typeof a=="string")return J.aT.prototype
if(a==null)return J.f2.prototype
if(typeof a=="boolean")return J.f0.prototype
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.be(a)}
J.O=function(a){if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.be(a)}
J.aG=function(a){if(a==null)return a
if(a.constructor==Array)return J.az.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.be(a)}
J.dA=function(a){if(typeof a=="number")return J.aA.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bM.prototype
return a}
J.ij=function(a){if(typeof a=="number")return J.aA.prototype
if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bM.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.be(a)}
J.at=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ij(a).p(a,b)}
J.X=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).q(a,b)}
J.dM=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dA(a).aG(a,b)}
J.c3=function(a,b){if(a.constructor==Array||typeof a=="string"||H.iy(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.O(a).h(a,b)}
J.dN=function(a,b,c,d){return J.i(a).d9(a,b,c,d)}
J.dO=function(a,b,c,d){return J.i(a).dC(a,b,c,d)}
J.bk=function(a,b,c){return J.i(a).dI(a,b,c)}
J.c4=function(a,b,c){return J.i(a).dJ(a,b,c)}
J.dP=function(a,b){return J.i(a).dL(a,b)}
J.dQ=function(a,b,c,d,e){return J.i(a).dM(a,b,c,d,e)}
J.dR=function(a,b,c,d){return J.i(a).dN(a,b,c,d)}
J.dS=function(a,b){return J.aG(a).dQ(a,b)}
J.dT=function(a,b,c,d,e){return J.i(a).dR(a,b,c,d,e)}
J.dU=function(a,b){return J.i(a).dS(a,b)}
J.dV=function(a,b){return J.i(a).dT(a,b)}
J.c5=function(a,b,c,d,e){return J.i(a).dV(a,b,c,d,e)}
J.dW=function(a,b){return J.i(a).b9(a,b)}
J.bl=function(a,b,c){return J.O(a).dY(a,b,c)}
J.bm=function(a){return J.i(a).e_(a)}
J.dX=function(a){return J.i(a).e0(a)}
J.dY=function(a,b){return J.i(a).e1(a,b)}
J.dZ=function(a,b){return J.i(a).e3(a,b)}
J.c6=function(a,b){return J.i(a).e4(a,b)}
J.e_=function(a,b){return J.i(a).eb(a,b)}
J.e0=function(a,b,c,d,e){return J.i(a).ec(a,b,c,d,e)}
J.e1=function(a,b){return J.aG(a).W(a,b)}
J.c7=function(a,b){return J.i(a).ed(a,b)}
J.aJ=function(a,b){return J.i(a).ee(a,b)}
J.e2=function(a,b){return J.aG(a).H(a,b)}
J.c8=function(a){return J.i(a).gdP(a)}
J.T=function(a){return J.i(a).gaj(a)}
J.F=function(a){return J.l(a).gw(a)}
J.e3=function(a){return J.i(a).gm(a)}
J.bn=function(a){return J.aG(a).gG(a)}
J.au=function(a){return J.O(a).gl(a)}
J.e4=function(a){return J.i(a).gcd(a)}
J.e5=function(a){return J.i(a).gce(a)}
J.e6=function(a){return J.i(a).gcf(a)}
J.e7=function(a){return J.i(a).gcg(a)}
J.e8=function(a){return J.i(a).gci(a)}
J.e9=function(a){return J.i(a).gcj(a)}
J.ea=function(a){return J.i(a).gck(a)}
J.eb=function(a){return J.i(a).gbp(a)}
J.ec=function(a){return J.i(a).gn(a)}
J.ed=function(a){return J.i(a).gj(a)}
J.aK=function(a,b,c){return J.i(a).cz(a,b,c)}
J.ee=function(a){return J.i(a).cA(a)}
J.ef=function(a,b){return J.i(a).cB(a,b)}
J.c9=function(a,b){return J.i(a).cE(a,b)}
J.eg=function(a,b,c){return J.i(a).cG(a,b,c)}
J.eh=function(a,b){return J.aG(a).a8(a,b)}
J.ei=function(a,b){return J.i(a).sm(a,b)}
J.ej=function(a,b){return J.i(a).sU(a,b)}
J.ek=function(a,b){return J.i(a).sn(a,b)}
J.ca=function(a,b,c,d){return J.i(a).cR(a,b,c,d)}
J.cb=function(a,b,c,d){return J.i(a).cS(a,b,c,d)}
J.aL=function(a,b,c,d){return J.i(a).eK(a,b,c,d)}
J.cc=function(a){return J.dA(a).aa(a)}
J.av=function(a){return J.l(a).i(a)}
J.cd=function(a,b){return J.i(a).eM(a,b)}
J.aM=function(a,b,c,d,e,f,g){return J.i(a).eN(a,b,c,d,e,f,g)}
var $=I.p
C.b=J.az.prototype
C.d=J.cv.prototype
C.a=J.aA.prototype
C.f=J.aT.prototype
C.C=J.ff.prototype
C.D=P.fk.prototype
C.L=J.bM.prototype
C.p=new H.co()
C.q=new P.hh()
C.c=new P.hP()
C.h=new P.ax(0)
C.r=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.t=function(hooks) {
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

C.u=function(getTagFallback) {
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
C.w=function(hooks) {
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
C.v=function() {
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
C.y=function(_, letter) { return letter.toUpperCase(); }
C.z=new H.bt([0,"TinyCanvasTransform.NONE",1,"TinyCanvasTransform.ROT90",2,"TinyCanvasTransform.ROT180",3,"TinyCanvasTransform.ROT270",4,"TinyCanvasTransform.MIRROR",5,"TinyCanvasTransform.MIRROR_ROT90",6,"TinyCanvasTransform.MIRROR_ROT180",7,"TinyCanvasTransform.MIRROR_ROT270"])
C.A=new H.bt([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.B=new H.bt([0,"TinyStagePointerType.CANCEL",1,"TinyStagePointerType.UP",2,"TinyStagePointerType.DOWN",3,"TinyStagePointerType.MOVE"])
C.e=new F.a2(0)
C.E=new F.a2(1)
C.F=new F.a2(2)
C.G=new F.a2(3)
C.H=new F.a2(4)
C.I=new F.a2(5)
C.J=new F.a2(6)
C.K=new F.a2(7)
C.k=new F.fL(0)
C.l=new F.b4(0)
C.m=new F.b4(1)
C.n=new F.b4(2)
C.o=new F.b4(3)
$.cK="$cachedFunction"
$.cL="$cachedInvocation"
$.P=0
$.aj=null
$.ce=null
$.bY=null
$.du=null
$.dH=null
$.bc=null
$.bf=null
$.bZ=null
$.ad=null
$.ap=null
$.aq=null
$.bT=!1
$.k=C.c
$.cq=0
$.cm=null
$.cl=null
$.ck=null
$.cj=null
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
I.$lazy(y,x,w)}})(["ct","$get$ct",function(){return H.eW()},"cu","$get$cu",function(){return new P.eF(null)},"d_","$get$d_",function(){return H.S(H.b5({toString:function(){return"$receiver$"}}))},"d0","$get$d0",function(){return H.S(H.b5({$method$:null,toString:function(){return"$receiver$"}}))},"d1","$get$d1",function(){return H.S(H.b5(null))},"d2","$get$d2",function(){return H.S(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d6","$get$d6",function(){return H.S(H.b5(void 0))},"d7","$get$d7",function(){return H.S(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d4","$get$d4",function(){return H.S(H.d5(null))},"d3","$get$d3",function(){return H.S(function(){try{null.$method$}catch(z){return z.message}}())},"d9","$get$d9",function(){return H.S(H.d5(void 0))},"d8","$get$d8",function(){return H.S(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bO","$get$bO",function(){return P.h5()},"ar","$get$ar",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bB]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.a0]},{func:1,args:[,],opt:[,]},{func:1,ret:P.W,args:[P.p]},{func:1,args:[W.bL]},{func:1,args:[,P.W]},{func:1,args:[P.W]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.a0]},{func:1,ret:P.bV},{func:1,void:true,args:[P.a],opt:[P.a0]},{func:1,void:true,args:[,P.a0]},{func:1,args:[,,]},{func:1,args:[P.cT,,]},{func:1,args:[P.W,,]}]
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
Isolate.bd=a.bd
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dJ(F.dE(),b)},[])
else (function(b){H.dJ(F.dE(),b)})([])})})()