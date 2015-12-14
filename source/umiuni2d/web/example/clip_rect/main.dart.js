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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ise)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bR"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bR"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bR(this,c,d,true,[],f).prototype
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
iY:{
"^":"a;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bd:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ba:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bU==null){H.i5()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.d_("Return interceptor for "+H.b(y(a,z))))}w=H.ie(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.z
else return C.A}return w},
e:{
"^":"a;",
l:function(a,b){return a===b},
gp:function(a){return H.Z(a)},
i:["cN",function(a){return H.aY(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
eJ:{
"^":"e;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$isbQ:1},
eL:{
"^":"e;",
l:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
ck:{
"^":"e;",
gp:function(a){return 0},
$iseM:1},
eY:{
"^":"ck;"},
bH:{
"^":"ck;",
i:function(a){return String(a)}},
ay:{
"^":"e;",
bY:function(a,b){if(!!a.immutable$list)throw H.f(new P.L(b))},
bX:function(a,b){if(!!a.fixed$length)throw H.f(new P.L(b))},
b_:function(a,b){var z,y
this.bX(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.af)(b),++y)a.push(b[y])},
G:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.G(a))}},
a7:function(a,b){return H.c(new H.bv(a,b),[null,null])},
c2:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
U:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
ge4:function(a){if(a.length>0)return a[0]
throw H.f(H.bq())},
ga6:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(H.bq())},
bo:function(a,b,c,d,e){var z,y,x
this.bY(a,"set range")
P.cC(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.A(P.aB(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.f(H.eH())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aO(a,"[","]")},
gF:function(a){return new J.e8(a,a.length,0,null)},
gp:function(a){return H.Z(a)},
gj:function(a){return a.length},
sj:function(a,b){this.bX(a,"set length")
if(b<0)throw H.f(P.aB(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.w(a,b))
if(b>=a.length||b<0)throw H.f(H.w(a,b))
return a[b]},
t:function(a,b,c){this.bY(a,"indexed set")
if(b>=a.length||b<0)throw H.f(H.w(a,b))
a[b]=c},
$isaP:1,
$isj:1,
$asj:null,
$isp:1},
iX:{
"^":"ay;"},
e8:{
"^":"a;a,b,c,d",
gu:function(){return this.d},
n:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(new P.G(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
az:{
"^":"e;",
be:function(a,b){return a%b},
a9:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.L(""+a))},
A:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.L(""+a))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
k:function(a,b){if(typeof b!=="number")throw H.f(H.ad(b))
return a+b},
cS:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a9(a/b)},
af:function(a,b){return(a|0)===a?a/b|0:this.a9(a/b)},
aY:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aD:function(a,b){if(typeof b!=="number")throw H.f(H.ad(b))
return a<b},
$isaH:1},
cj:{
"^":"az;",
$isaH:1,
$iso:1},
eK:{
"^":"az;",
$isaH:1},
aQ:{
"^":"e;",
dL:function(a,b){if(b>=a.length)throw H.f(H.w(a,b))
return a.charCodeAt(b)},
k:function(a,b){if(typeof b!=="string")throw H.f(P.e7(b,null,null))
return a+b},
cM:function(a,b,c){H.dj(b)
if(c==null)c=a.length
H.dj(c)
if(b<0)throw H.f(P.aZ(b,null,null))
if(typeof c!=="number")return H.S(c)
if(b>c)throw H.f(P.aZ(b,null,null))
if(c>a.length)throw H.f(P.aZ(c,null,null))
return a.substring(b,c)},
cL:function(a,b){return this.cM(a,b,null)},
gK:function(a){return a.length===0},
i:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.w(a,b))
if(b>=a.length||b<0)throw H.f(H.w(a,b))
return a[b]},
$isaP:1,
$isW:1}}],["","",,H,{
"^":"",
aD:function(a,b){var z=a.aj(b)
if(!init.globalState.d.cy)init.globalState.f.an()
return z},
bc:function(){--init.globalState.f.b},
dx:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.f(P.bj("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hq(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$ch()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.h1(P.bt(null,H.aC),0)
y.z=P.aS(null,null,null,P.o,H.bM)
y.ch=P.aS(null,null,null,P.o,null)
if(y.x===!0){x=new H.hp()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eA,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hr)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aS(null,null,null,P.o,H.b_)
w=P.ah(null,null,null,P.o)
v=new H.b_(0,null,!1)
u=new H.bM(y,x,w,init.createNewIsolate(),v,new H.a6(H.be()),new H.a6(H.be()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
w.a3(0,0)
u.br(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aF()
x=H.ae(y,[y]).X(a)
if(x)u.aj(new H.ii(z,a))
else{y=H.ae(y,[y,y]).X(a)
if(y)u.aj(new H.ij(z,a))
else u.aj(a)}init.globalState.f.an()},
eE:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eF()
return},
eF:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.L("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.L("Cannot extract URI from \""+H.b(z)+"\""))},
eA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b3(!0,[]).Y(b.data)
y=J.R(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b3(!0,[]).Y(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b3(!0,[]).Y(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aS(null,null,null,P.o,H.b_)
p=P.ah(null,null,null,P.o)
o=new H.b_(0,null,!1)
n=new H.bM(y,q,p,init.createNewIsolate(),o,new H.a6(H.be()),new H.a6(H.be()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
p.a3(0,0)
n.br(0,o)
init.globalState.f.a.T(new H.aC(n,new H.eB(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.an()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").W(y.h(z,"msg"))
init.globalState.f.an()
break
case"close":init.globalState.ch.a8(0,$.$get$ci().h(0,a))
a.terminate()
init.globalState.f.an()
break
case"log":H.ez(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a8(["command","print","msg",z])
q=new H.a9(!0,P.a7(null,P.o)).I(q)
y.toString
self.postMessage(q)}else P.aI(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},
ez:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a8(["command","log","msg",a])
x=new H.a9(!0,P.a7(null,P.o)).I(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.D(w)
z=H.z(w)
throw H.f(P.aN(z))}},
eC:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cy=$.cy+("_"+y)
$.cz=$.cz+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.W(["spawned",new H.b5(y,x),w,z.r])
x=new H.eD(a,b,c,d,z)
if(e===!0){z.bU(w,w)
init.globalState.f.a.T(new H.aC(z,x,"start isolate"))}else x.$0()},
hK:function(a){return new H.b3(!0,[]).Y(new H.a9(!1,P.a7(null,P.o)).I(a))},
ii:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
ij:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hq:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hr:function(a){var z=P.a8(["command","print","msg",a])
return new H.a9(!0,P.a7(null,P.o)).I(z)}}},
bM:{
"^":"a;a,b,c,ei:d<,dP:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bU:function(a,b){if(!this.f.l(0,a))return
if(this.Q.a3(0,b)&&!this.y)this.y=!0
this.aZ()},
er:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a8(0,a)
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
if(w===y.c)y.bB();++y.d}this.y=!1}this.aZ()},
dw:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eq:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.l(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.A(new P.L("removeRange"))
P.cC(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cH:function(a,b){if(!this.r.l(0,a))return
this.db=b},
e8:function(a,b,c){var z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){a.W(c)
return}z=this.cx
if(z==null){z=P.bt(null,null)
this.cx=z}z.T(new H.hj(a,c))},
e6:function(a,b){var z
if(!this.r.l(0,a))return
z=J.l(b)
if(!z.l(b,0))z=z.l(b,1)&&!this.cy
else z=!0
if(z){this.b7()
return}z=this.cx
if(z==null){z=P.bt(null,null)
this.cx=z}z.T(this.gel())},
e9:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aI(a)
if(b!=null)P.aI(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.as(a)
y[1]=b==null?null:J.as(b)
for(x=new P.cm(z,z.r,null,null),x.c=z.e;x.n();)x.d.W(y)},
aj:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.D(u)
w=t
v=H.z(u)
this.e9(w,v)
if(this.db===!0){this.b7()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gei()
if(this.cx!=null)for(;t=this.cx,!t.gK(t);)this.cx.cg().$0()}return y},
c5:function(a){return this.b.h(0,a)},
br:function(a,b){var z=this.b
if(z.ag(a))throw H.f(P.aN("Registry: ports must be registered only once."))
z.t(0,a,b)},
aZ:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.t(0,this.a,this)
else this.b7()},
b7:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.P(0)
for(z=this.b,y=z.gcp(z),y=y.gF(y);y.n();)y.gu().d4()
z.P(0)
this.c.P(0)
init.globalState.z.a8(0,this.a)
this.dx.P(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.W(z[v])}this.ch=null}},"$0","gel",0,0,1]},
hj:{
"^":"d:1;a,b",
$0:function(){this.a.W(this.b)}},
h1:{
"^":"a;a,b",
dV:function(){var z=this.a
if(z.b===z.c)return
return z.cg()},
cl:function(){var z,y,x
z=this.dV()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ag(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gK(y)}else y=!1
else y=!1
else y=!1
if(y)H.A(P.aN("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gK(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a8(["command","close"])
x=new H.a9(!0,P.a7(null,P.o)).I(x)
y.toString
self.postMessage(x)}return!1}z.ep()
return!0},
bM:function(){if(self.window!=null)new H.h2(this).$0()
else for(;this.cl(););},
an:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bM()
else try{this.bM()}catch(x){w=H.D(x)
z=w
y=H.z(x)
w=init.globalState.Q
v=P.a8(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.a9(!0,P.a7(null,P.o)).I(v)
w.toString
self.postMessage(v)}}},
h2:{
"^":"d:1;a",
$0:function(){if(!this.a.cl())return
P.cK(C.f,this)}},
aC:{
"^":"a;a,b,c",
ep:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aj(this.b)}},
hp:{
"^":"a;"},
eB:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.eC(this.a,this.b,this.c,this.d,this.e,this.f)}},
eD:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aF()
w=H.ae(x,[x,x]).X(y)
if(w)y.$2(this.b,this.c)
else{x=H.ae(x,[x]).X(y)
if(x)y.$1(this.b)
else y.$0()}}z.aZ()}},
d2:{
"^":"a;"},
b5:{
"^":"d2;b,a",
W:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbE())return
x=H.hK(a)
if(z.gdP()===y){y=J.R(x)
switch(y.h(x,0)){case"pause":z.bU(y.h(x,1),y.h(x,2))
break
case"resume":z.er(y.h(x,1))
break
case"add-ondone":z.dw(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eq(y.h(x,1))
break
case"set-errors-fatal":z.cH(y.h(x,1),y.h(x,2))
break
case"ping":z.e8(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.e6(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a3(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a8(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.T(new H.aC(z,new H.ht(this,x),w))},
l:function(a,b){if(b==null)return!1
return b instanceof H.b5&&J.a4(this.b,b.b)},
gp:function(a){return this.b.gaT()}},
ht:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbE())z.d0(this.b)}},
bN:{
"^":"d2;b,c,a",
W:function(a){var z,y,x
z=P.a8(["command","message","port",this,"msg",a])
y=new H.a9(!0,P.a7(null,P.o)).I(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
l:function(a,b){if(b==null)return!1
return b instanceof H.bN&&J.a4(this.b,b.b)&&J.a4(this.a,b.a)&&J.a4(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cI()
y=this.a
if(typeof y!=="number")return y.cI()
x=this.c
if(typeof x!=="number")return H.S(x)
return(z<<16^y<<8^x)>>>0}},
b_:{
"^":"a;aT:a<,b,bE:c<",
d4:function(){this.c=!0
this.b=null},
d0:function(a){if(this.c)return
this.de(a)},
de:function(a){return this.b.$1(a)},
$isf1:1},
fl:{
"^":"a;a,b,c",
cV:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.T(new H.aC(y,new H.fn(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ap(new H.fo(this,b),0),a)}else throw H.f(new P.L("Timer greater than 0."))},
static:{fm:function(a,b){var z=new H.fl(!0,!1,null)
z.cV(a,b)
return z}}},
fn:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fo:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
H.bc()
this.b.$0()}},
a6:{
"^":"a;aT:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.eE()
z=C.a.aY(z,0)^C.a.af(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
l:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a6){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
a9:{
"^":"a;a,b",
I:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.t(0,a,z.gj(z))
z=J.l(a)
if(!!z.$iscq)return["buffer",a]
if(!!z.$isbz)return["typed",a]
if(!!z.$isaP)return this.cD(a)
if(!!z.$isey){x=this.gcA()
w=a.gc3()
w=H.aV(w,x,H.I(w,"K",0),null)
w=P.bu(w,!0,H.I(w,"K",0))
z=z.gcp(a)
z=H.aV(z,x,H.I(z,"K",0),null)
return["map",w,P.bu(z,!0,H.I(z,"K",0))]}if(!!z.$iseM)return this.cE(a)
if(!!z.$ise)this.co(a)
if(!!z.$isf1)this.ao(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb5)return this.cF(a)
if(!!z.$isbN)return this.cG(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.ao(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa6)return["capability",a.a]
if(!(a instanceof P.a))this.co(a)
return["dart",init.classIdExtractor(a),this.cC(init.classFieldsExtractor(a))]},"$1","gcA",2,0,2],
ao:function(a,b){throw H.f(new P.L(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
co:function(a){return this.ao(a,null)},
cD:function(a){var z=this.cB(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ao(a,"Can't serialize indexable: ")},
cB:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.I(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cC:function(a){var z
for(z=0;z<a.length;++z)C.b.t(a,z,this.I(a[z]))
return a},
cE:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ao(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.I(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cG:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cF:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaT()]
return["raw sendport",a]}},
b3:{
"^":"a;a,b",
Y:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.bj("Bad serialized message: "+H.b(a)))
switch(C.b.ge4(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=this.ah(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ah(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.ah(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.ah(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.dY(a)
case"sendport":return this.dZ(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.dX(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.a6(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ah(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.b(a))}},"$1","gdW",2,0,2],
ah:function(a){var z,y,x
z=J.R(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.S(x)
if(!(y<x))break
z.t(a,y,this.Y(z.h(a,y)));++y}return a},
dY:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.aT()
this.b.push(w)
y=J.e3(y,this.gdW()).bh(0)
for(z=J.R(y),v=J.R(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.t(0,y[u],this.Y(v.h(x,u)))}return w},
dZ:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.a4(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.c5(w)
if(u==null)return
t=new H.b5(u,x)}else t=new H.bN(y,w,x)
this.b.push(t)
return t},
dX:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.R(y)
v=J.R(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.S(t)
if(!(u<t))break
w[z.h(y,u)]=this.Y(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
ef:function(){throw H.f(new P.L("Cannot modify unmodifiable Map"))},
i0:function(a){return init.types[a]},
id:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isaR},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.as(a)
if(typeof z!=="string")throw H.f(H.ad(a))
return z},
Z:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cA:function(a){var z,y
z=C.h(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.dL(z,0)===36)z=C.e.cL(z,1)
return(z+H.dr(H.bS(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aY:function(a){return"Instance of '"+H.cA(a)+"'"},
F:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cx:function(a){return a.b?H.F(a).getUTCMilliseconds()+0:H.F(a).getMilliseconds()+0},
aX:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.ad(a))
return a[b]},
bA:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.ad(a))
a[b]=c},
S:function(a){throw H.f(H.ad(a))},
h:function(a,b){if(a==null)J.ar(a)
throw H.f(H.w(a,b))},
w:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a5(!0,b,"index",null)
z=J.ar(a)
if(!(b<0)){if(typeof z!=="number")return H.S(z)
y=b>=z}else y=!0
if(y)return P.bp(b,a,"index",null,z)
return P.aZ(b,"index",null)},
ad:function(a){return new P.a5(!0,a,null,null)},
dk:function(a){return a},
dj:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(H.ad(a))
return a},
f:function(a){var z
if(a==null)a=new P.cw()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dz})
z.name=""}else z.toString=H.dz
return z},
dz:function(){return J.as(this.dartException)},
A:function(a){throw H.f(a)},
af:function(a){throw H.f(new P.G(a))},
D:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.il(a)
if(a==null)return
if(a instanceof H.bo)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.aY(x,16)&8191)===10)switch(w){case 438:return z.$1(H.br(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cv(v,null))}}if(a instanceof TypeError){u=$.$get$cO()
t=$.$get$cP()
s=$.$get$cQ()
r=$.$get$cR()
q=$.$get$cV()
p=$.$get$cW()
o=$.$get$cT()
$.$get$cS()
n=$.$get$cY()
m=$.$get$cX()
l=u.M(y)
if(l!=null)return z.$1(H.br(y,l))
else{l=t.M(y)
if(l!=null){l.method="call"
return z.$1(H.br(y,l))}else{l=s.M(y)
if(l==null){l=r.M(y)
if(l==null){l=q.M(y)
if(l==null){l=p.M(y)
if(l==null){l=o.M(y)
if(l==null){l=r.M(y)
if(l==null){l=n.M(y)
if(l==null){l=m.M(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cv(y,l==null?null:l.method))}}return z.$1(new H.fN(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cF()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a5(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cF()
return a},
z:function(a){var z
if(a instanceof H.bo)return a.b
if(a==null)return new H.d7(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d7(a,null)},
ih:function(a){if(a==null||typeof a!='object')return J.E(a)
else return H.Z(a)},
dm:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.t(0,a[y],a[x])}return b},
i7:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.l(c,0))return H.aD(b,new H.i8(a))
else if(z.l(c,1))return H.aD(b,new H.i9(a,d))
else if(z.l(c,2))return H.aD(b,new H.ia(a,d,e))
else if(z.l(c,3))return H.aD(b,new H.ib(a,d,e,f))
else if(z.l(c,4))return H.aD(b,new H.ic(a,d,e,f,g))
else throw H.f(P.aN("Unsupported number of arguments for wrapped closure"))},
ap:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.i7)
a.$identity=z
return z},
ed:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.f4(z).r}else x=c
w=d?Object.create(new H.f9().constructor.prototype):Object.create(new H.bk(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.O
$.O=J.aq(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ca(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.i0(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.c9:H.bl
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ca(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ea:function(a,b,c,d){var z=H.bl
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ca:function(a,b,c){var z,y,x,w,v,u
if(c)return H.ec(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ea(y,!w,z,b)
if(y===0){w=$.ag
if(w==null){w=H.aM("self")
$.ag=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.O
$.O=J.aq(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ag
if(v==null){v=H.aM("self")
$.ag=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.O
$.O=J.aq(w,1)
return new Function(v+H.b(w)+"}")()},
eb:function(a,b,c,d){var z,y
z=H.bl
y=H.c9
switch(b?-1:a){case 0:throw H.f(new H.f5("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ec:function(a,b){var z,y,x,w,v,u,t,s
z=H.e9()
y=$.c8
if(y==null){y=H.aM("receiver")
$.c8=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eb(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.O
$.O=J.aq(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.O
$.O=J.aq(u,1)
return new Function(y+H.b(u)+"}")()},
bR:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.ed(a,b,z,!!d,e,f)},
ik:function(a){throw H.f(new P.eh("Cyclic initialization for static "+H.b(a)))},
ae:function(a,b,c){return new H.f6(a,b,c,null)},
aF:function(){return C.o},
be:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
u:function(a,b,c){var z
if(b===0){J.dK(c,a)
return}else if(b===1){c.bZ(H.D(a),H.z(a))
return}if(!!J.l(a).$isU)z=a
else{z=H.c(new P.C(0,$.k,null),[null])
z.aK(a)}z.aB(H.df(b,0),new H.hU(b))
return c.ge5()},
df:function(a,b){return new H.hR(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
c:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bS:function(a){if(a==null)return
return a.$builtinTypeInfo},
dp:function(a,b){return H.dy(a["$as"+H.b(b)],H.bS(a))},
I:function(a,b,c){var z=H.dp(a,b)
return z==null?null:z[c]},
t:function(a,b){var z=H.bS(a)
return z==null?null:z[b]},
bX:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dr(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dr:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bB("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.bX(u,c))}return w?"":"<"+H.b(z)+">"},
dy:function(a,b){if(typeof a=="function"){a=H.bV(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bV(a,null,b)}return b},
hT:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.J(a[y],b[y]))return!1
return!0},
b7:function(a,b,c){return H.bV(a,b,H.dp(b,c))},
J:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dq(a,b)
if('func' in a)return b.builtin$cls==="eq"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bX(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.bX(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hT(H.dy(v,z),x)},
dh:function(a,b,c){var z,y,x,w,v
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
hS:function(a,b){var z,y,x,w,v,u
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
dq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
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
if(t===s){if(!H.dh(x,w,!1))return!1
if(!H.dh(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}}return H.hS(a.named,b.named)},
bV:function(a,b,c){return a.apply(b,c)},
jM:function(a){var z=$.bT
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jK:function(a){return H.Z(a)},
jJ:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ie:function(a){var z,y,x,w,v,u
z=$.bT.$1(a)
y=$.b8[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bb[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dg.$2(a,z)
if(z!=null){y=$.b8[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bb[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bW(x)
$.b8[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bb[z]=x
return x}if(v==="-"){u=H.bW(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dt(a,x)
if(v==="*")throw H.f(new P.d_(z))
if(init.leafTags[z]===true){u=H.bW(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dt(a,x)},
dt:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bd(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bW:function(a){return J.bd(a,!1,null,!!a.$isaR)},
ig:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bd(z,!1,null,!!z.$isaR)
else return J.bd(z,c,null,null)},
i5:function(){if(!0===$.bU)return
$.bU=!0
H.i6()},
i6:function(){var z,y,x,w,v,u,t,s
$.b8=Object.create(null)
$.bb=Object.create(null)
H.i1()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dv.$1(v)
if(u!=null){t=H.ig(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
i1:function(){var z,y,x,w,v,u,t
z=C.u()
z=H.ac(C.q,H.ac(C.w,H.ac(C.i,H.ac(C.i,H.ac(C.v,H.ac(C.r,H.ac(C.t(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bT=new H.i2(v)
$.dg=new H.i3(u)
$.dv=new H.i4(t)},
ac:function(a,b){return a(b)||b},
ee:{
"^":"a;",
i:function(a){return P.cp(this)},
t:function(a,b,c){return H.ef()}},
cg:{
"^":"ee;a",
aS:function(){var z=this.$map
if(z==null){z=new H.aA(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dm(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aS().h(0,b)},
G:function(a,b){this.aS().G(0,b)},
gj:function(a){var z=this.aS()
return z.gj(z)}},
f3:{
"^":"a;a,b,c,d,e,f,r,x",
static:{f4:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.f3(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fM:{
"^":"a;a,b,c,d,e,f",
M:function(a){var z,y,x
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
static:{Q:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fM(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b2:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},cU:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cv:{
"^":"B;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
eO:{
"^":"B;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{br:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.eO(a,y,z?null:b.receiver)}}},
fN:{
"^":"B;a",
i:function(a){var z=this.a
return C.e.gK(z)?"Error":"Error: "+z}},
il:{
"^":"d:2;a",
$1:function(a){if(!!J.l(a).$isB)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
d7:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
i8:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
i9:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ia:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ib:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ic:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"a;",
i:function(a){return"Closure '"+H.cA(this)+"'"},
gcq:function(){return this},
gcq:function(){return this}},
cI:{
"^":"d;"},
f9:{
"^":"cI;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bk:{
"^":"cI;a,b,c,d",
l:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bk))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.Z(this.a)
else y=typeof z!=="object"?J.E(z):H.Z(z)
z=H.Z(this.b)
if(typeof y!=="number")return y.eF()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aY(z)},
static:{bl:function(a){return a.a},c9:function(a){return a.c},e9:function(){var z=$.ag
if(z==null){z=H.aM("self")
$.ag=z}return z},aM:function(a){var z,y,x,w,v
z=new H.bk("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
f5:{
"^":"B;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
cE:{
"^":"a;"},
f6:{
"^":"cE;a,b,c,d",
X:function(a){var z=this.d9(a)
return z==null?!1:H.dq(z,this.aa())},
d9:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
aa:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$isjt)z.void=true
else if(!x.$iscc)z.ret=y.aa()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cD(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cD(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dl(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aa()}z.named=w}return z},
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
t=H.dl(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].aa())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cD:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aa())
return z}}},
cc:{
"^":"cE;",
i:function(a){return"dynamic"},
aa:function(){return}},
bo:{
"^":"a;a,N:b<"},
hU:{
"^":"d:5;a",
$2:function(a,b){H.df(this.a,1).$1(new H.bo(a,b))}},
hR:{
"^":"d:2;a,b",
$1:function(a){this.b(this.a,a)}},
aA:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gK:function(a){return this.a===0},
gc3:function(){return H.c(new H.eQ(this),[H.t(this,0)])},
gcp:function(a){return H.aV(this.gc3(),new H.eN(this),H.t(this,0),H.t(this,1))},
ag:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bx(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bx(y,a)}else return this.ed(a)},
ed:function(a){var z=this.d
if(z==null)return!1
return this.al(this.O(z,this.ak(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.O(z,b)
return y==null?null:y.gZ()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.O(x,b)
return y==null?null:y.gZ()}else return this.ee(b)},
ee:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.O(z,this.ak(a))
x=this.al(y,a)
if(x<0)return
return y[x].gZ()},
t:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aV()
this.b=z}this.bq(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aV()
this.c=y}this.bq(y,b,c)}else this.eg(b,c)},
eg:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aV()
this.d=z}y=this.ak(a)
x=this.O(z,y)
if(x==null)this.aX(z,y,[this.aW(a,b)])
else{w=this.al(x,a)
if(w>=0)x[w].sZ(b)
else x.push(this.aW(a,b))}},
a8:function(a,b){if(typeof b==="string")return this.bL(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bL(this.c,b)
else return this.ef(b)},
ef:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.O(z,this.ak(a))
x=this.al(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bS(w)
return w.gZ()},
P:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.f(new P.G(this))
z=z.c}},
bq:function(a,b,c){var z=this.O(a,b)
if(z==null)this.aX(a,b,this.aW(b,c))
else z.sZ(c)},
bL:function(a,b){var z
if(a==null)return
z=this.O(a,b)
if(z==null)return
this.bS(z)
this.by(a,b)
return z.gZ()},
aW:function(a,b){var z,y
z=new H.eP(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bS:function(a){var z,y
z=a.gdn()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ak:function(a){return J.E(a)&0x3ffffff},
al:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gc0(),b))return y
return-1},
i:function(a){return P.cp(this)},
O:function(a,b){return a[b]},
aX:function(a,b,c){a[b]=c},
by:function(a,b){delete a[b]},
bx:function(a,b){return this.O(a,b)!=null},
aV:function(){var z=Object.create(null)
this.aX(z,"<non-identifier-key>",z)
this.by(z,"<non-identifier-key>")
return z},
$isey:1},
eN:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
eP:{
"^":"a;c0:a<,Z:b@,c,dn:d<"},
eQ:{
"^":"K;a",
gj:function(a){return this.a.a},
gF:function(a){var z,y
z=this.a
y=new H.eR(z,z.r,null,null)
y.c=z.e
return y},
G:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.G(z))
y=y.c}},
$isp:1},
eR:{
"^":"a;a,b,c,d",
gu:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
i2:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
i3:{
"^":"d:9;a",
$2:function(a,b){return this.a(a,b)}},
i4:{
"^":"d:10;a",
$1:function(a){return this.a(a)}}}],["","",,D,{
"^":"",
eZ:{
"^":"cM;e,f,a,b,c,d",
ba:function(a,b){var z
if(this.f==null)return
z=F.b0(null)
z.a=F.aj(85,255,68,68)
b.a5(null,new F.N(0,0,400,300),z)
b.a4(null,new F.N(10,10,380,280))
b.a5(null,new F.N(0,0,400,300),z)
b.a4(null,new F.N(100,20,100,300))
b.a5(null,new F.N(0,0,400,300),z)
b.aw(0)
b.r=1
J.bZ(b.d,0)
b.a4(null,new F.N(0,150,400,150))
z=F.b0(null)
z.a=F.aj(255,68,68,255)
b.a5(null,new F.N(0,150,400,300),z)},
cU:function(a){this.e.ax("assets/test.jpg").ex(new D.f0(this))},
static:{f_:function(a){var z=new E.P(new Float64Array(H.m(16)))
z.R()
z=new D.eZ(a,null,"none",null,z,!1)
z.b=[]
z.cU(a)
return z}}},
f0:{
"^":"d:11;a",
$1:function(a){this.a.f=a}}}],["","",,H,{
"^":"",
bq:function(){return new P.ai("No element")},
eH:function(){return new P.ai("Too few elements")},
fj:function(a){return a.geK()},
aU:{
"^":"K;",
gF:function(a){return new H.cn(this,this.gj(this),0,null)},
G:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.U(0,y))
if(z!==this.gj(this))throw H.f(new P.G(this))}},
a7:function(a,b){return H.c(new H.bv(this,b),[null,null])},
bi:function(a,b){var z,y,x
if(b){z=H.c([],[H.I(this,"aU",0)])
C.b.sj(z,this.gj(this))}else z=H.c(Array(this.gj(this)),[H.I(this,"aU",0)])
for(y=0;y<this.gj(this);++y){x=this.U(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bh:function(a){return this.bi(a,!0)},
$isp:1},
cn:{
"^":"a;a,b,c,d",
gu:function(){return this.d},
n:function(){var z,y,x,w
z=this.a
y=J.R(z)
x=y.gj(z)
if(this.b!==x)throw H.f(new P.G(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.U(z,w);++this.c
return!0}},
co:{
"^":"K;a,b",
gF:function(a){var z=new H.eU(null,J.bi(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.ar(this.a)},
$asK:function(a,b){return[b]},
static:{aV:function(a,b,c,d){if(!!J.l(a).$isp)return H.c(new H.cd(a,b),[c,d])
return H.c(new H.co(a,b),[c,d])}}},
cd:{
"^":"co;a,b",
$isp:1},
eU:{
"^":"eI;a,b,c",
n:function(){var z=this.b
if(z.n()){this.a=this.aR(z.gu())
return!0}this.a=null
return!1},
gu:function(){return this.a},
aR:function(a){return this.c.$1(a)}},
bv:{
"^":"aU;a,b",
gj:function(a){return J.ar(this.a)},
U:function(a,b){return this.aR(J.dQ(this.a,b))},
aR:function(a){return this.b.$1(a)},
$asaU:function(a,b){return[b]},
$asK:function(a,b){return[b]},
$isp:1},
cf:{
"^":"a;"}}],["","",,H,{
"^":"",
dl:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
fO:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hV()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ap(new P.fQ(z),1)).observe(y,{childList:true})
return new P.fP(z,y,x)}else if(self.setImmediate!=null)return P.hW()
return P.hX()},
jv:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ap(new P.fR(a),0))},"$1","hV",2,0,4],
jw:[function(a){++init.globalState.f.b
self.setImmediate(H.ap(new P.fS(a),0))},"$1","hW",2,0,4],
jx:[function(a){P.bC(C.f,a)},"$1","hX",2,0,4],
da:function(a,b){var z=H.aF()
z=H.ae(z,[z,z]).X(a)
if(z){b.toString
return a}else{b.toString
return a}},
er:function(a,b,c){var z=new P.C(0,$.k,null)
z.$builtinTypeInfo=[c]
P.cK(a,new P.es(b,z))
return z},
at:function(a){return H.c(new P.d1(H.c(new P.C(0,$.k,null),[a])),[a])},
hL:function(a,b,c){$.k.toString
a.J(b,c)},
hN:function(){var z,y
for(;z=$.aa,z!=null;){$.an=null
y=z.c
$.aa=y
if(y==null)$.am=null
$.k=z.b
z.dF()}},
jI:[function(){$.bO=!0
try{P.hN()}finally{$.k=C.c
$.an=null
$.bO=!1
if($.aa!=null)$.$get$bJ().$1(P.di())}},"$0","di",0,0,1],
de:function(a){if($.aa==null){$.am=a
$.aa=a
if(!$.bO)$.$get$bJ().$1(P.di())}else{$.am.c=a
$.am=a}},
dw:function(a){var z,y
z=$.k
if(C.c===z){P.ab(null,null,C.c,a)
return}z.toString
if(C.c.gb6()===z){P.ab(null,null,z,a)
return}y=$.k
P.ab(null,null,y,y.b0(a,!0))},
jk:function(a,b){var z,y,x
z=H.c(new P.d8(null,null,null,0),[b])
y=z.gdi()
x=z.gdk()
z.a=a.a_(y,!0,z.gdj(),x)
return z},
hP:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.D(u)
z=t
y=H.z(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.T(x)
w=t
v=x.gN()
c.$2(w,v)}}},
hG:function(a,b,c,d){var z=a.b2()
if(!!J.l(z).$isU)z.bl(new P.hJ(b,c,d))
else b.J(c,d)},
hH:function(a,b){return new P.hI(a,b)},
cK:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bC(a,b)}return P.bC(a,z.b0(b,!0))},
bC:function(a,b){var z=C.d.af(a.a,1000)
return H.fm(z<0?0:z,b)},
bI:function(a){var z=$.k
$.k=a
return z},
aE:function(a,b,c,d,e){var z,y,x
z=new P.d0(new P.hO(d,e),C.c,null)
y=$.aa
if(y==null){P.de(z)
$.an=$.am}else{x=$.an
if(x==null){z.c=y
$.an=z
$.aa=z}else{z.c=x.c
x.c=z
$.an=z
if(z.c==null)$.am=z}}},
db:function(a,b,c,d){var z,y
if($.k===c)return d.$0()
z=P.bI(c)
try{y=d.$0()
return y}finally{$.k=z}},
dd:function(a,b,c,d,e){var z,y
if($.k===c)return d.$1(e)
z=P.bI(c)
try{y=d.$1(e)
return y}finally{$.k=z}},
dc:function(a,b,c,d,e,f){var z,y
if($.k===c)return d.$2(e,f)
z=P.bI(c)
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ab:function(a,b,c,d){var z=C.c!==c
if(z){d=c.b0(d,!(!z||C.c.gb6()===c))
c=C.c}P.de(new P.d0(d,c,null))},
fQ:{
"^":"d:2;a",
$1:function(a){var z,y
H.bc()
z=this.a
y=z.a
z.a=null
y.$0()}},
fP:{
"^":"d:12;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
fR:{
"^":"d:0;a",
$0:function(){H.bc()
this.a.$0()}},
fS:{
"^":"d:0;a",
$0:function(){H.bc()
this.a.$0()}},
hD:{
"^":"X;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hE:function(a,b){if(b!=null)return b
if(!!J.l(a).$isB)return a.gN()
return}}},
U:{
"^":"a;"},
es:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a0(null)}catch(x){w=H.D(x)
z=w
y=H.z(x)
P.hL(this.b,z,y)}}},
fW:{
"^":"a;e5:a<",
bZ:function(a,b){a=a!=null?a:new P.cw()
if(this.a.a!==0)throw H.f(new P.ai("Future already completed"))
$.k.toString
this.J(a,b)},
dN:function(a){return this.bZ(a,null)}},
d1:{
"^":"fW;a",
b4:function(a,b){var z=this.a
if(z.a!==0)throw H.f(new P.ai("Future already completed"))
z.aK(b)},
J:function(a,b){this.a.d3(a,b)}},
ak:{
"^":"a;bF:a<,es:b>,c,d,e",
ga2:function(){return this.b.b},
gc_:function(){return(this.c&1)!==0},
geb:function(){return this.c===6},
gea:function(){return this.c===8},
gdm:function(){return this.d},
gdv:function(){return this.d}},
C:{
"^":"a;au:a?,a2:b<,c",
gdf:function(){return this.a===8},
sdg:function(a){if(a)this.a=2
else this.a=0},
aB:function(a,b){var z,y
z=H.c(new P.C(0,$.k,null),[null])
y=z.b
if(y!==C.c){y.toString
if(b!=null)b=P.da(b,y)}this.aH(new P.ak(null,z,b==null?1:3,a,b))
return z},
ex:function(a){return this.aB(a,null)},
bl:function(a){var z,y
z=$.k
y=new P.C(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.aH(new P.ak(null,y,8,a,null))
return y},
aU:function(){if(this.a!==0)throw H.f(new P.ai("Future already completed"))
this.a=1},
gdu:function(){return this.c},
gad:function(){return this.c},
bR:function(a){this.a=4
this.c=a},
bQ:function(a){this.a=8
this.c=a},
ds:function(a,b){this.bQ(new P.X(a,b))},
aH:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ab(null,null,z,new P.h6(this,a))}else{a.a=this.c
this.c=a}},
at:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbF()
z.a=y}return y},
a0:function(a){var z,y
z=J.l(a)
if(!!z.$isU)if(!!z.$isC)P.b4(a,this)
else P.bL(a,this)
else{y=this.at()
this.bR(a)
P.a2(this,y)}},
bw:function(a){var z=this.at()
this.bR(a)
P.a2(this,z)},
J:[function(a,b){var z=this.at()
this.bQ(new P.X(a,b))
P.a2(this,z)},function(a){return this.J(a,null)},"eG","$2","$1","gaO",2,2,13,0],
aK:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isU){if(!!z.$isC){z=a.a
if(z>=4&&z===8){this.aU()
z=this.b
z.toString
P.ab(null,null,z,new P.h8(this,a))}else P.b4(a,this)}else P.bL(a,this)
return}}this.aU()
z=this.b
z.toString
P.ab(null,null,z,new P.h9(this,a))},
d3:function(a,b){var z
this.aU()
z=this.b
z.toString
P.ab(null,null,z,new P.h7(this,a,b))},
$isU:1,
static:{bL:function(a,b){var z,y,x,w
b.sau(2)
try{a.aB(new P.ha(b),new P.hb(b))}catch(x){w=H.D(x)
z=w
y=H.z(x)
P.dw(new P.hc(b,z,y))}},b4:function(a,b){var z
b.a=2
z=new P.ak(null,b,0,null,null)
if(a.a>=4)P.a2(a,z)
else a.aH(z)},a2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdf()
if(b==null){if(w){v=z.a.gad()
y=z.a.ga2()
x=J.T(v)
u=v.gN()
y.toString
P.aE(null,null,y,x,u)}return}for(;b.gbF()!=null;b=t){t=b.a
b.a=null
P.a2(z.a,b)}x.a=!0
s=w?null:z.a.gdu()
x.b=s
x.c=!1
y=!w
if(!y||b.gc_()||b.c===8){r=b.ga2()
if(w){u=z.a.ga2()
u.toString
if(u==null?r!=null:u!==r){u=u.gb6()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gad()
y=z.a.ga2()
x=J.T(v)
u=v.gN()
y.toString
P.aE(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gc_())x.a=new P.he(x,b,s,r).$0()}else new P.hd(z,x,b,r).$0()
if(b.gea())new P.hf(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isU}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.C)if(p.a>=4){o.a=2
z.a=p
b=new P.ak(null,o,0,null,null)
y=p
continue}else P.b4(p,o)
else P.bL(p,o)
return}}o=b.b
b=o.at()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
h6:{
"^":"d:0;a,b",
$0:function(){P.a2(this.a,this.b)}},
ha:{
"^":"d:2;a",
$1:function(a){this.a.bw(a)}},
hb:{
"^":"d:6;a",
$2:function(a,b){this.a.J(a,b)},
$1:function(a){return this.$2(a,null)}},
hc:{
"^":"d:0;a,b,c",
$0:function(){this.a.J(this.b,this.c)}},
h8:{
"^":"d:0;a,b",
$0:function(){P.b4(this.b,this.a)}},
h9:{
"^":"d:0;a,b",
$0:function(){this.a.bw(this.b)}},
h7:{
"^":"d:0;a,b,c",
$0:function(){this.a.J(this.b,this.c)}},
he:{
"^":"d:14;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aA(this.b.gdm(),this.c)
return!0}catch(x){w=H.D(x)
z=w
y=H.z(x)
this.a.b=new P.X(z,y)
return!1}}},
hd:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gad()
y=!0
r=this.c
if(r.geb()){x=r.d
try{y=this.d.aA(x,J.T(z))}catch(q){r=H.D(q)
w=r
v=H.z(q)
r=J.T(z)
p=w
o=(r==null?p==null:r===p)?z:new P.X(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aF()
p=H.ae(p,[p,p]).X(r)
n=this.d
m=this.b
if(p)m.b=n.ev(u,J.T(z),z.gN())
else m.b=n.aA(u,J.T(z))}catch(q){r=H.D(q)
t=r
s=H.z(q)
r=J.T(z)
p=t
o=(r==null?p==null:r===p)?z:new P.X(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hf:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cj(this.d.gdv())
z.a=w
v=w}catch(u){z=H.D(u)
y=z
x=H.z(u)
if(this.c){z=J.T(this.a.a.gad())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gad()
else v.b=new P.X(y,x)
v.a=!1
return}if(!!J.l(v).$isU){t=this.d
s=t.ges(t)
s.sdg(!0)
this.b.c=!0
v.aB(new P.hg(this.a,s),new P.hh(z,s))}}},
hg:{
"^":"d:2;a,b",
$1:function(a){P.a2(this.a.a,new P.ak(null,this.b,0,null,null))}},
hh:{
"^":"d:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.C)){y=H.c(new P.C(0,$.k,null),[null])
z.a=y
y.ds(a,b)}P.a2(z.a,new P.ak(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
d0:{
"^":"a;a,b,c",
dF:function(){return this.a.$0()}},
a0:{
"^":"a;",
a7:function(a,b){return H.c(new P.hs(b,this),[H.I(this,"a0",0),null])},
G:function(a,b){var z,y
z={}
y=H.c(new P.C(0,$.k,null),[null])
z.a=null
z.a=this.a_(new P.fd(z,this,b,y),!0,new P.fe(y),y.gaO())
return y},
gj:function(a){var z,y
z={}
y=H.c(new P.C(0,$.k,null),[P.o])
z.a=0
this.a_(new P.ff(z),!0,new P.fg(z,y),y.gaO())
return y},
bh:function(a){var z,y
z=H.c([],[H.I(this,"a0",0)])
y=H.c(new P.C(0,$.k,null),[[P.j,H.I(this,"a0",0)]])
this.a_(new P.fh(this,z),!0,new P.fi(z,y),y.gaO())
return y}},
fd:{
"^":"d;a,b,c,d",
$1:function(a){P.hP(new P.fb(this.c,a),new P.fc(),P.hH(this.a.a,this.d))},
$signature:function(){return H.b7(function(a){return{func:1,args:[a]}},this.b,"a0")}},
fb:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fc:{
"^":"d:2;",
$1:function(a){}},
fe:{
"^":"d:0;a",
$0:function(){this.a.a0(null)}},
ff:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
fg:{
"^":"d:0;a,b",
$0:function(){this.b.a0(this.a.a)}},
fh:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b7(function(a){return{func:1,args:[a]}},this.a,"a0")}},
fi:{
"^":"d:0;a,b",
$0:function(){this.b.a0(this.a)}},
fa:{
"^":"a;"},
jB:{
"^":"a;"},
fT:{
"^":"a;a2:d<,au:e?",
bc:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bW()
if((z&4)===0&&(this.e&32)===0)this.bC(this.gbH())},
am:function(a){return this.bc(a,null)},
ci:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gK(z)}else z=!1
if(z)this.r.aE(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bC(this.gbJ())}}}},
b2:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aL()
return this.f},
aL:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bW()
if((this.e&32)===0)this.r=null
this.f=this.bG()},
aJ:["cQ",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bN(a)
else this.aI(new P.fZ(a,null))}],
aG:["cR",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bP(a,b)
else this.aI(new P.h0(a,b,null))}],
d2:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bO()
else this.aI(C.p)},
bI:[function(){},"$0","gbH",0,0,1],
bK:[function(){},"$0","gbJ",0,0,1],
bG:function(){return},
aI:function(a){var z,y
z=this.r
if(z==null){z=new P.hC(null,null,0)
this.r=z}z.a3(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aE(this)}},
bN:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bg(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aM((z&4)!==0)},
bP:function(a,b){var z,y
z=this.e
y=new P.fV(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aL()
z=this.f
if(!!J.l(z).$isU)z.bl(y)
else y.$0()}else{y.$0()
this.aM((z&4)!==0)}},
bO:function(){var z,y
z=new P.fU(this)
this.aL()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isU)y.bl(z)
else z.$0()},
bC:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aM((z&4)!==0)},
aM:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gK(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gK(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bI()
else this.bK()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aE(this)},
cZ:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.da(b,z)
this.c=c}},
fV:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aF()
x=H.ae(x,[x,x]).X(y)
w=z.d
v=this.b
u=z.b
if(x)w.ew(u,v,this.c)
else w.bg(u,v)
z.e=(z.e&4294967263)>>>0}},
fU:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ck(z.c)
z.e=(z.e&4294967263)>>>0}},
d3:{
"^":"a;az:a@"},
fZ:{
"^":"d3;b,a",
bd:function(a){a.bN(this.b)}},
h0:{
"^":"d3;ai:b>,N:c<,a",
bd:function(a){a.bP(this.b,this.c)}},
h_:{
"^":"a;",
bd:function(a){a.bO()},
gaz:function(){return},
saz:function(a){throw H.f(new P.ai("No events after a done."))}},
hu:{
"^":"a;au:a?",
aE:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dw(new P.hv(this,a))
this.a=1},
bW:function(){if(this.a===1)this.a=3}},
hv:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.e7(this.b)}},
hC:{
"^":"hu;b,c,a",
gK:function(a){return this.c==null},
a3:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saz(b)
this.c=b}},
e7:function(a){var z,y
z=this.b
y=z.gaz()
this.b=y
if(y==null)this.c=null
z.bd(a)}},
d8:{
"^":"a;a,b,c,au:d?",
bs:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eL:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a0(!0)
return}this.a.am(0)
this.c=a
this.d=3},"$1","gdi",2,0,function(){return H.b7(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"d8")}],
dl:[function(a,b){var z
if(this.d===2){z=this.c
this.bs(0)
z.J(a,b)
return}this.a.am(0)
this.c=new P.X(a,b)
this.d=4},function(a){return this.dl(a,null)},"eN","$2","$1","gdk",2,2,15,0],
eM:[function(){if(this.d===2){var z=this.c
this.bs(0)
z.a0(!1)
return}this.a.am(0)
this.c=null
this.d=5},"$0","gdj",0,0,1]},
hJ:{
"^":"d:0;a,b,c",
$0:function(){return this.a.J(this.b,this.c)}},
hI:{
"^":"d:5;a,b",
$2:function(a,b){return P.hG(this.a,this.b,a,b)}},
bK:{
"^":"a0;",
a_:function(a,b,c,d){return this.d7(a,d,c,!0===b)},
c4:function(a,b,c){return this.a_(a,null,b,c)},
d7:function(a,b,c,d){return P.h5(this,a,b,c,d,H.I(this,"bK",0),H.I(this,"bK",1))},
bD:function(a,b){b.aJ(a)},
$asa0:function(a,b){return[b]}},
d4:{
"^":"fT;x,y,a,b,c,d,e,f,r",
aJ:function(a){if((this.e&2)!==0)return
this.cQ(a)},
aG:function(a,b){if((this.e&2)!==0)return
this.cR(a,b)},
bI:[function(){var z=this.y
if(z==null)return
z.am(0)},"$0","gbH",0,0,1],
bK:[function(){var z=this.y
if(z==null)return
z.ci()},"$0","gbJ",0,0,1],
bG:function(){var z=this.y
if(z!=null){this.y=null
z.b2()}return},
eH:[function(a){this.x.bD(a,this)},"$1","gda",2,0,function(){return H.b7(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"d4")}],
eJ:[function(a,b){this.aG(a,b)},"$2","gdd",4,0,16],
eI:[function(){this.d2()},"$0","gdc",0,0,1],
d_:function(a,b,c,d,e,f,g){var z,y
z=this.gda()
y=this.gdd()
this.y=this.x.a.c4(z,this.gdc(),y)},
static:{h5:function(a,b,c,d,e,f,g){var z=$.k
z=H.c(new P.d4(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cZ(b,c,d,e)
z.d_(a,b,c,d,e,f,g)
return z}}},
hs:{
"^":"bK;b,a",
bD:function(a,b){var z,y,x,w,v
z=null
try{z=this.dt(a)}catch(w){v=H.D(w)
y=v
x=H.z(w)
$.k.toString
b.aG(y,x)
return}b.aJ(z)},
dt:function(a){return this.b.$1(a)}},
X:{
"^":"a;ai:a>,N:b<",
i:function(a){return H.b(this.a)},
$isB:1},
hF:{
"^":"a;"},
hO:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.f(new P.hD(z,P.hE(z,this.b)))}},
hx:{
"^":"hF;",
gb6:function(){return this},
ck:function(a){var z,y,x,w
try{if(C.c===$.k){x=a.$0()
return x}x=P.db(null,null,this,a)
return x}catch(w){x=H.D(w)
z=x
y=H.z(w)
return P.aE(null,null,this,z,y)}},
bg:function(a,b){var z,y,x,w
try{if(C.c===$.k){x=a.$1(b)
return x}x=P.dd(null,null,this,a,b)
return x}catch(w){x=H.D(w)
z=x
y=H.z(w)
return P.aE(null,null,this,z,y)}},
ew:function(a,b,c){var z,y,x,w
try{if(C.c===$.k){x=a.$2(b,c)
return x}x=P.dc(null,null,this,a,b,c)
return x}catch(w){x=H.D(w)
z=x
y=H.z(w)
return P.aE(null,null,this,z,y)}},
b0:function(a,b){if(b)return new P.hy(this,a)
else return new P.hz(this,a)},
dB:function(a,b){if(b)return new P.hA(this,a)
else return new P.hB(this,a)},
h:function(a,b){return},
cj:function(a){if($.k===C.c)return a.$0()
return P.db(null,null,this,a)},
aA:function(a,b){if($.k===C.c)return a.$1(b)
return P.dd(null,null,this,a,b)},
ev:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.dc(null,null,this,a,b,c)}},
hy:{
"^":"d:0;a,b",
$0:function(){return this.a.ck(this.b)}},
hz:{
"^":"d:0;a,b",
$0:function(){return this.a.cj(this.b)}},
hA:{
"^":"d:2;a,b",
$1:function(a){return this.a.bg(this.b,a)}},
hB:{
"^":"d:2;a,b",
$1:function(a){return this.a.aA(this.b,a)}}}],["","",,P,{
"^":"",
aT:function(){return H.c(new H.aA(0,null,null,null,null,null,0),[null,null])},
a8:function(a){return H.dm(a,H.c(new H.aA(0,null,null,null,null,null,0),[null,null]))},
eG:function(a,b,c){var z,y
if(P.bP(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ao()
y.push(a)
try{P.hM(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cG(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aO:function(a,b,c){var z,y,x
if(P.bP(a))return b+"..."+c
z=new P.bB(b)
y=$.$get$ao()
y.push(a)
try{x=z
x.a=P.cG(x.ga1(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga1()+c
y=z.ga1()
return y.charCodeAt(0)==0?y:y},
bP:function(a){var z,y
for(z=0;y=$.$get$ao(),z<y.length;++z)if(a===y[z])return!0
return!1},
hM:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gF(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.n())return
w=H.b(z.gu())
b.push(w)
y+=w.length+2;++x}if(!z.n()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gu();++x
if(!z.n()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gu();++x
for(;z.n();t=s,s=r){r=z.gu();++x
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
aS:function(a,b,c,d,e){return H.c(new H.aA(0,null,null,null,null,null,0),[d,e])},
a7:function(a,b){return P.hn(a,b)},
ah:function(a,b,c,d){return H.c(new P.hk(0,null,null,null,null,null,0),[d])},
cp:function(a){var z,y,x
z={}
if(P.bP(a))return"{...}"
y=new P.bB("")
try{$.$get$ao().push(a)
x=y
x.a=x.ga1()+"{"
z.a=!0
J.dR(a,new P.eV(z,y))
z=y
z.a=z.ga1()+"}"}finally{z=$.$get$ao()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga1()
return z.charCodeAt(0)==0?z:z},
hm:{
"^":"aA;a,b,c,d,e,f,r",
ak:function(a){return H.ih(a)&0x3ffffff},
al:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gc0()
if(x==null?b==null:x===b)return y}return-1},
static:{hn:function(a,b){return H.c(new P.hm(0,null,null,null,null,null,0),[a,b])}}},
hk:{
"^":"hi;a,b,c,d,e,f,r",
gF:function(a){var z=new P.cm(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
dO:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.d6(b)},
d6:function(a){var z=this.d
if(z==null)return!1
return this.as(z[this.ar(a)],a)>=0},
c5:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dO(0,a)?a:null
else return this.dh(a)},
dh:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ar(a)]
x=this.as(y,a)
if(x<0)return
return J.bY(y,x).gbz()},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.f(new P.G(this))
z=z.b}},
a3:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bt(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bt(x,b)}else return this.T(b)},
T:function(a){var z,y,x
z=this.d
if(z==null){z=P.hl()
this.d=z}y=this.ar(a)
x=z[y]
if(x==null)z[y]=[this.aN(a)]
else{if(this.as(x,a)>=0)return!1
x.push(this.aN(a))}return!0},
a8:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bu(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bu(this.c,b)
else return this.dq(b)},
dq:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ar(a)]
x=this.as(y,a)
if(x<0)return!1
this.bv(y.splice(x,1)[0])
return!0},
P:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bt:function(a,b){if(a[b]!=null)return!1
a[b]=this.aN(b)
return!0},
bu:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bv(z)
delete a[b]
return!0},
aN:function(a){var z,y
z=new P.eS(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bv:function(a){var z,y
z=a.gd5()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ar:function(a){return J.E(a)&0x3ffffff},
as:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gbz(),b))return y
return-1},
$isp:1,
static:{hl:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
eS:{
"^":"a;bz:a<,b,d5:c<"},
cm:{
"^":"a;a,b,c,d",
gu:function(){return this.d},
n:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.G(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hi:{
"^":"f7;"},
bs:{
"^":"a;",
gF:function(a){return new H.cn(a,this.gj(a),0,null)},
U:function(a,b){return this.h(a,b)},
G:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.f(new P.G(a))}},
a7:function(a,b){return H.c(new H.bv(a,b),[null,null])},
i:function(a){return P.aO(a,"[","]")},
$isj:1,
$asj:null,
$isp:1},
eV:{
"^":"d:17;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
eT:{
"^":"K;a,b,c,d",
gF:function(a){return new P.ho(this,this.c,this.d,this.b,null)},
G:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.A(new P.G(this))}},
gK:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
P:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aO(this,"{","}")},
cg:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.bq());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
T:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bB();++this.d},
bB:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.t(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bo(y,0,w,z,x)
C.b.bo(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cT:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$isp:1,
static:{bt:function(a,b){var z=H.c(new P.eT(null,0,0,0),[b])
z.cT(a,b)
return z}}},
ho:{
"^":"a;a,b,c,d,e",
gu:function(){return this.e},
n:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.A(new P.G(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
f8:{
"^":"a;",
a7:function(a,b){return H.c(new H.cd(this,b),[H.t(this,0),null])},
i:function(a){return P.aO(this,"{","}")},
G:function(a,b){var z
for(z=this.gF(this);z.n();)b.$1(z.d)},
$isp:1},
f7:{
"^":"f8;"}}],["","",,P,{
"^":"",
hQ:function(a){return H.fj(a)},
bm:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.as(a)
if(typeof a==="string")return JSON.stringify(a)
return P.en(a)},
en:function(a){var z=J.l(a)
if(!!z.$isd)return z.i(a)
return H.aY(a)},
aN:function(a){return new P.h4(a)},
bu:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.bi(a);y.n();)z.push(y.gu())
if(b)return z
z.fixed$length=Array
return z},
aI:function(a){var z=H.b(a)
H.du(z)},
ja:{
"^":"d:18;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.hQ(a)}},
bQ:{
"^":"a;"},
"+bool":0,
cb:{
"^":"a;a,b",
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.cb))return!1
return this.a===b.a&&this.b===b.b},
gp:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ei(z?H.F(this).getUTCFullYear()+0:H.F(this).getFullYear()+0)
x=P.au(z?H.F(this).getUTCMonth()+1:H.F(this).getMonth()+1)
w=P.au(z?H.F(this).getUTCDate()+0:H.F(this).getDate()+0)
v=P.au(z?H.F(this).getUTCHours()+0:H.F(this).getHours()+0)
u=P.au(z?H.F(this).getUTCMinutes()+0:H.F(this).getMinutes()+0)
t=P.au(z?H.F(this).getUTCSeconds()+0:H.F(this).getSeconds()+0)
s=P.ej(H.cx(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{ei:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},ej:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},au:function(a){if(a>=10)return""+a
return"0"+a}}},
bf:{
"^":"aH;"},
"+double":0,
av:{
"^":"a;a",
k:function(a,b){return new P.av(C.d.k(this.a,b.gd8()))},
aD:function(a,b){return C.d.aD(this.a,b.gd8())},
l:function(a,b){if(b==null)return!1
if(!(b instanceof P.av))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.em()
y=this.a
if(y<0)return"-"+new P.av(-y).i(0)
x=z.$1(C.d.be(C.d.af(y,6e7),60))
w=z.$1(C.d.be(C.d.af(y,1e6),60))
v=new P.el().$1(C.d.be(y,1e6))
return""+C.d.af(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
el:{
"^":"d:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
em:{
"^":"d:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
B:{
"^":"a;",
gN:function(){return H.z(this.$thrownJsError)}},
cw:{
"^":"B;",
i:function(a){return"Throw of null."}},
a5:{
"^":"B;a,b,c,d",
gaQ:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaP:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaQ()+y+x
if(!this.a)return w
v=this.gaP()
u=P.bm(this.b)
return w+v+": "+H.b(u)},
static:{bj:function(a){return new P.a5(!1,null,null,a)},e7:function(a,b,c){return new P.a5(!0,a,b,c)}}},
cB:{
"^":"a5;e,f,a,b,c,d",
gaQ:function(){return"RangeError"},
gaP:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.eD()
if(typeof z!=="number")return H.S(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{aZ:function(a,b,c){return new P.cB(null,null,!0,a,b,"Value not in range")},aB:function(a,b,c,d,e){return new P.cB(b,c,!0,a,d,"Invalid value")},cC:function(a,b,c,d,e,f){if(0>a||a>c)throw H.f(P.aB(a,0,c,"start",f))
if(a>b||b>c)throw H.f(P.aB(b,a,c,"end",f))
return b}}},
eu:{
"^":"a5;e,j:f>,a,b,c,d",
gaQ:function(){return"RangeError"},
gaP:function(){P.bm(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dA(this.b,0)?": index must not be negative":z},
static:{bp:function(a,b,c,d,e){var z=e!=null?e:J.ar(b)
return new P.eu(b,z,!0,a,c,"Index out of range")}}},
L:{
"^":"B;a",
i:function(a){return"Unsupported operation: "+this.a}},
d_:{
"^":"B;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
ai:{
"^":"B;a",
i:function(a){return"Bad state: "+this.a}},
G:{
"^":"B;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bm(z))+"."}},
cF:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gN:function(){return},
$isB:1},
eh:{
"^":"B;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
h4:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eo:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aX(b,"expando$values")
return z==null?null:H.aX(z,this.bA())},
t:function(a,b,c){var z=H.aX(b,"expando$values")
if(z==null){z=new P.a()
H.bA(b,"expando$values",z)}H.bA(z,this.bA(),c)},
bA:function(){var z,y
z=H.aX(this,"expando$key")
if(z==null){y=$.ce
$.ce=y+1
z="expando$key$"+y
H.bA(this,"expando$key",z)}return z}},
eq:{
"^":"a;"},
o:{
"^":"aH;"},
"+int":0,
K:{
"^":"a;",
a7:function(a,b){return H.aV(this,b,H.I(this,"K",0),null)},
G:function(a,b){var z
for(z=this.gF(this);z.n();)b.$1(z.gu())},
bi:function(a,b){return P.bu(this,b,H.I(this,"K",0))},
bh:function(a){return this.bi(a,!0)},
gj:function(a){var z,y
z=this.gF(this)
for(y=0;z.n();)++y
return y},
U:function(a,b){var z,y,x
if(b<0)H.A(P.aB(b,0,null,"index",null))
for(z=this.gF(this),y=0;z.n();){x=z.gu()
if(b===y)return x;++y}throw H.f(P.bp(b,this,"index",null,y))},
i:function(a){return P.eG(this,"(",")")}},
eI:{
"^":"a;"},
j:{
"^":"a;",
$asj:null,
$isp:1},
"+List":0,
jb:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aH:{
"^":"a;"},
"+num":0,
a:{
"^":";",
l:function(a,b){return this===b},
gp:function(a){return H.Z(this)},
i:function(a){return H.aY(this)}},
a_:{
"^":"a;"},
W:{
"^":"a;"},
"+String":0,
bB:{
"^":"a;a1:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cG:function(a,b,c){var z=J.bi(b)
if(!z.n())return a
if(c.length===0){do a+=H.b(z.gu())
while(z.n())}else{a+=H.b(z.gu())
for(;z.n();)a=a+c+H.b(z.gu())}return a}}},
cH:{
"^":"a;"}}],["","",,W,{
"^":"",
a3:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d5:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
d9:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.fY(a)
if(!!J.l(z).$isM)return z
return}else return a},
y:function(a){var z=$.k
if(z===C.c)return a
return z.dB(a,!0)},
v:{
"^":"aw;",
$isv:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
ip:{
"^":"v;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
ir:{
"^":"v;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
is:{
"^":"v;",
gb8:function(a){return H.c(new W.q(a,"error",!1),[null])},
gb9:function(a){return H.c(new W.q(a,"load",!1),[null])},
$isM:1,
$ise:1,
"%":"HTMLBodyElement"},
it:{
"^":"v;w:height},B:width}",
bm:function(a,b,c){return a.getContext(b,P.hY(c))},
cu:function(a,b,c,d,e,f,g){var z,y
z=P.a8(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bm(a,"webgl",z)
return y==null?this.bm(a,"experimental-webgl",z):y},
ct:function(a,b){return this.cu(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
iv:{
"^":"aW;j:length=",
$ise:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iw:{
"^":"ev;j:length=",
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
ev:{
"^":"e+eg;"},
eg:{
"^":"a;"},
ix:{
"^":"aW;",
$ise:1,
"%":"DocumentFragment|ShadowRoot"},
iy:{
"^":"e;",
i:function(a){return String(a)},
"%":"DOMException"},
ek:{
"^":"e;b1:bottom=,w:height=,L:left=,bf:right=,ab:top=,B:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gB(a))+" x "+H.b(this.gw(a))},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
y=a.left
x=z.gL(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=this.gB(a)
x=z.gB(b)
if(y==null?x==null:y===x){y=this.gw(a)
z=z.gw(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w
z=J.E(a.left)
y=J.E(a.top)
x=J.E(this.gB(a))
w=J.E(this.gw(a))
return W.d5(W.a3(W.a3(W.a3(W.a3(0,z),y),x),w))},
gbj:function(a){return H.c(new P.H(a.left,a.top),[null])},
$isV:1,
$asV:I.b9,
"%":";DOMRectReadOnly"},
aw:{
"^":"aW;",
gH:function(a){return P.f2(C.a.A(a.offsetLeft),C.a.A(a.offsetTop),C.a.A(a.offsetWidth),C.a.A(a.offsetHeight),null)},
i:function(a){return a.localName},
cs:function(a){return a.getBoundingClientRect()},
gb8:function(a){return H.c(new W.q(a,"error",!1),[null])},
gb9:function(a){return H.c(new W.q(a,"load",!1),[null])},
gc6:function(a){return H.c(new W.q(a,"mousedown",!1),[null])},
gc7:function(a){return H.c(new W.q(a,"mouseenter",!1),[null])},
gc8:function(a){return H.c(new W.q(a,"mouseleave",!1),[null])},
gc9:function(a){return H.c(new W.q(a,"mousemove",!1),[null])},
gca:function(a){return H.c(new W.q(a,"mouseout",!1),[null])},
gcb:function(a){return H.c(new W.q(a,"mouseover",!1),[null])},
gcc:function(a){return H.c(new W.q(a,"mouseup",!1),[null])},
$isaw:1,
$ise:1,
$isM:1,
"%":";Element"},
iz:{
"^":"v;w:height},S:src},B:width}",
"%":"HTMLEmbedElement"},
iA:{
"^":"bn;ai:error=",
"%":"ErrorEvent"},
bn:{
"^":"e;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
M:{
"^":"e;",
d1:function(a,b,c,d){return a.addEventListener(b,H.ap(c,1),d)},
dr:function(a,b,c,d){return a.removeEventListener(b,H.ap(c,1),d)},
$isM:1,
"%":"MediaStream;EventTarget"},
iS:{
"^":"v;j:length=",
"%":"HTMLFormElement"},
iT:{
"^":"v;w:height},S:src},B:width}",
"%":"HTMLIFrameElement"},
iU:{
"^":"v;w:height},S:src},B:width}",
b4:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
iW:{
"^":"v;w:height},S:src},B:width}",
$isaw:1,
$ise:1,
$isM:1,
"%":"HTMLInputElement"},
eW:{
"^":"v;ai:error=,S:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bw:{
"^":"cZ;",
gH:function(a){var z,y
if(!!a.offsetX)return H.c(new P.H(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.d9(a.target)).$isaw)throw H.f(new P.L("offsetX is only supported on elements"))
z=W.d9(a.target)
y=H.c(new P.H(a.clientX,a.clientY),[null]).aF(0,J.dZ(J.e0(z)))
return H.c(new P.H(J.c6(y.a),J.c6(y.b)),[null])}},
$isbw:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
j9:{
"^":"e;",
$ise:1,
"%":"Navigator"},
aW:{
"^":"M;",
i:function(a){var z=a.nodeValue
return z==null?this.cN(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
jc:{
"^":"v;w:height},B:width}",
"%":"HTMLObjectElement"},
jf:{
"^":"v;S:src}",
"%":"HTMLScriptElement"},
jh:{
"^":"v;j:length=",
"%":"HTMLSelectElement"},
ji:{
"^":"v;S:src}",
"%":"HTMLSourceElement"},
jj:{
"^":"bn;ai:error=",
"%":"SpeechRecognitionError"},
bF:{
"^":"e;",
$isa:1,
"%":"Touch"},
bG:{
"^":"cZ;dG:changedTouches=",
$isbG:1,
$isa:1,
"%":"TouchEvent"},
jo:{
"^":"ex;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.bp(b,a,null,null,null))
return a[b]},
t:function(a,b,c){throw H.f(new P.L("Cannot assign element of immutable List."))},
U:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bF]},
$isp:1,
$isaR:1,
$isaP:1,
"%":"TouchList"},
ew:{
"^":"e+bs;",
$isj:1,
$asj:function(){return[W.bF]},
$isp:1},
ex:{
"^":"ew+et;",
$isj:1,
$asj:function(){return[W.bF]},
$isp:1},
jp:{
"^":"v;S:src}",
"%":"HTMLTrackElement"},
cZ:{
"^":"bn;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
jr:{
"^":"eW;w:height},B:width}",
"%":"HTMLVideoElement"},
ju:{
"^":"M;",
$ise:1,
$isM:1,
"%":"DOMWindow|Window"},
jy:{
"^":"e;b1:bottom=,w:height=,L:left=,bf:right=,ab:top=,B:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
l:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
y=a.left
x=z.gL(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=a.width
x=z.gB(b)
if(y==null?x==null:y===x){y=a.height
z=z.gw(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){var z,y,x,w
z=J.E(a.left)
y=J.E(a.top)
x=J.E(a.width)
w=J.E(a.height)
return W.d5(W.a3(W.a3(W.a3(W.a3(0,z),y),x),w))},
gbj:function(a){return H.c(new P.H(a.left,a.top),[null])},
$isV:1,
$asV:I.b9,
"%":"ClientRect"},
jz:{
"^":"aW;",
$ise:1,
"%":"DocumentType"},
jA:{
"^":"ek;",
gw:function(a){return a.height},
gB:function(a){return a.width},
"%":"DOMRect"},
jD:{
"^":"v;",
$isM:1,
$ise:1,
"%":"HTMLFrameSetElement"},
h3:{
"^":"a0;",
a_:function(a,b,c,d){var z=new W.x(0,this.a,this.b,W.y(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.v()
return z},
c4:function(a,b,c){return this.a_(a,null,b,c)}},
q:{
"^":"h3;a,b,c"},
x:{
"^":"fa;a,b,c,d,e",
b2:function(){if(this.b==null)return
this.bT()
this.b=null
this.d=null
return},
bc:function(a,b){if(this.b==null)return;++this.a
this.bT()},
am:function(a){return this.bc(a,null)},
ci:function(){if(this.b==null||this.a<=0)return;--this.a
this.v()},
v:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dB(x,this.c,z,this.e)}},
bT:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dC(x,this.c,z,this.e)}}},
et:{
"^":"a;",
gF:function(a){return new W.ep(a,this.gj(a),-1,null)},
$isj:1,
$asj:null,
$isp:1},
ep:{
"^":"a;a,b,c,d",
n:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bY(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gu:function(){return this.d}},
fX:{
"^":"a;a",
$isM:1,
$ise:1,
static:{fY:function(a){if(a===window)return a
else return new W.fX(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
im:{
"^":"ax;",
$ise:1,
"%":"SVGAElement"},
io:{
"^":"fk;",
$ise:1,
"%":"SVGAltGlyphElement"},
iq:{
"^":"n;",
$ise:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iB:{
"^":"n;",
$ise:1,
"%":"SVGFEBlendElement"},
iC:{
"^":"n;",
$ise:1,
"%":"SVGFEColorMatrixElement"},
iD:{
"^":"n;",
$ise:1,
"%":"SVGFEComponentTransferElement"},
iE:{
"^":"n;",
$ise:1,
"%":"SVGFECompositeElement"},
iF:{
"^":"n;",
$ise:1,
"%":"SVGFEConvolveMatrixElement"},
iG:{
"^":"n;",
$ise:1,
"%":"SVGFEDiffuseLightingElement"},
iH:{
"^":"n;",
$ise:1,
"%":"SVGFEDisplacementMapElement"},
iI:{
"^":"n;",
$ise:1,
"%":"SVGFEFloodElement"},
iJ:{
"^":"n;",
$ise:1,
"%":"SVGFEGaussianBlurElement"},
iK:{
"^":"n;",
$ise:1,
"%":"SVGFEImageElement"},
iL:{
"^":"n;",
$ise:1,
"%":"SVGFEMergeElement"},
iM:{
"^":"n;",
$ise:1,
"%":"SVGFEMorphologyElement"},
iN:{
"^":"n;",
$ise:1,
"%":"SVGFEOffsetElement"},
iO:{
"^":"n;",
$ise:1,
"%":"SVGFESpecularLightingElement"},
iP:{
"^":"n;",
$ise:1,
"%":"SVGFETileElement"},
iQ:{
"^":"n;",
$ise:1,
"%":"SVGFETurbulenceElement"},
iR:{
"^":"n;",
$ise:1,
"%":"SVGFilterElement"},
ax:{
"^":"n;",
$ise:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
iV:{
"^":"ax;",
$ise:1,
"%":"SVGImageElement"},
iZ:{
"^":"n;",
$ise:1,
"%":"SVGMarkerElement"},
j_:{
"^":"n;",
$ise:1,
"%":"SVGMaskElement"},
jd:{
"^":"n;",
$ise:1,
"%":"SVGPatternElement"},
jg:{
"^":"n;",
$ise:1,
"%":"SVGScriptElement"},
n:{
"^":"aw;",
gb8:function(a){return H.c(new W.q(a,"error",!1),[null])},
gb9:function(a){return H.c(new W.q(a,"load",!1),[null])},
gc6:function(a){return H.c(new W.q(a,"mousedown",!1),[null])},
gc7:function(a){return H.c(new W.q(a,"mouseenter",!1),[null])},
gc8:function(a){return H.c(new W.q(a,"mouseleave",!1),[null])},
gc9:function(a){return H.c(new W.q(a,"mousemove",!1),[null])},
gca:function(a){return H.c(new W.q(a,"mouseout",!1),[null])},
gcb:function(a){return H.c(new W.q(a,"mouseover",!1),[null])},
gcc:function(a){return H.c(new W.q(a,"mouseup",!1),[null])},
$isM:1,
$ise:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jl:{
"^":"ax;",
$ise:1,
"%":"SVGSVGElement"},
jm:{
"^":"n;",
$ise:1,
"%":"SVGSymbolElement"},
cJ:{
"^":"ax;",
"%":";SVGTextContentElement"},
jn:{
"^":"cJ;",
$ise:1,
"%":"SVGTextPathElement"},
fk:{
"^":"cJ;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jq:{
"^":"ax;",
$ise:1,
"%":"SVGUseElement"},
js:{
"^":"n;",
$ise:1,
"%":"SVGViewElement"},
jC:{
"^":"n;",
$ise:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jE:{
"^":"n;",
$ise:1,
"%":"SVGCursorElement"},
jF:{
"^":"n;",
$ise:1,
"%":"SVGFEDropShadowElement"},
jG:{
"^":"n;",
$ise:1,
"%":"SVGGlyphRefElement"},
jH:{
"^":"n;",
$ise:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
je:{
"^":"e;",
dz:function(a,b,c){return a.bindBuffer(b,c)},
dA:function(a,b,c){return a.bindTexture(b,c)},
dC:function(a,b){return a.blendEquation(b)},
dD:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dE:function(a,b,c,d){return a.bufferData(b,c,d)},
dH:function(a,b){return a.clear(b)},
dI:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
dJ:function(a,b){return a.clearDepth(b)},
dK:function(a,b){return a.clearStencil(b)},
dM:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
dQ:function(a){return a.createBuffer()},
dR:function(a){return a.createProgram()},
dS:function(a,b){return a.createShader(b)},
dT:function(a,b){return a.depthFunc(b)},
dU:function(a,b){return a.depthMask(b)},
e0:function(a,b){return a.disableVertexAttribArray(b)},
e1:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
e2:function(a,b){return a.enable(b)},
e3:function(a,b){return a.enableVertexAttribArray(b)},
cr:function(a,b,c){return a.getAttribLocation(b,c)},
cw:function(a,b){return a.getParameter(b)},
cz:function(a,b,c){return a.getUniformLocation(b,c)},
cJ:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cK:function(a,b,c,d){return a.stencilOp(b,c,d)},
eA:function(a,b){return a.useProgram(b)},
eB:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iu:{
"^":"a;"}}],["","",,P,{
"^":"",
al:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
d6:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
H:{
"^":"a;C:a>,E:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
l:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.H))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gp:function(a){var z,y
z=J.E(this.a)
y=J.E(this.b)
return P.d6(P.al(P.al(0,z),y))},
k:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gC(b)
if(typeof z!=="number")return z.k()
x=C.a.k(z,x)
z=this.b
y=y.gE(b)
if(typeof z!=="number")return z.k()
y=new P.H(x,C.a.k(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aF:function(a,b){var z,y,x,w
z=this.a
y=J.e_(b)
if(typeof z!=="number")return z.aF()
if(typeof y!=="number")return H.S(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aF()
if(typeof w!=="number")return H.S(w)
w=new P.H(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hw:{
"^":"a;",
gbf:function(a){return this.gL(this)+this.c},
gb1:function(a){return this.gab(this)+this.d},
i:function(a){return"Rectangle ("+this.gL(this)+", "+this.b+") "+this.c+" x "+this.d},
l:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isV)return!1
if(this.gL(this)===z.gL(b)){y=this.b
z=y===z.gab(b)&&this.a+this.c===z.gbf(b)&&y+this.d===z.gb1(b)}else z=!1
return z},
gp:function(a){var z=this.b
return P.d6(P.al(P.al(P.al(P.al(0,this.gL(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbj:function(a){var z=new P.H(this.gL(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
V:{
"^":"hw;L:a>,ab:b>,B:c>,w:d>",
$asV:null,
static:{f2:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.c(new P.V(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
m:function(a){return a},
b6:function(a){return a},
cq:{
"^":"e;",
$iscq:1,
"%":"ArrayBuffer"},
bz:{
"^":"e;",
$isbz:1,
"%":"DataView;ArrayBufferView;bx|cr|ct|by|cs|cu|Y"},
bx:{
"^":"bz;",
gj:function(a){return a.length},
$isaR:1,
$isaP:1},
by:{
"^":"ct;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
a[b]=c}},
cr:{
"^":"bx+bs;",
$isj:1,
$asj:function(){return[P.bf]},
$isp:1},
ct:{
"^":"cr+cf;"},
Y:{
"^":"cu;",
t:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.o]},
$isp:1},
cs:{
"^":"bx+bs;",
$isj:1,
$asj:function(){return[P.o]},
$isp:1},
cu:{
"^":"cs+cf;"},
j0:{
"^":"by;",
$isj:1,
$asj:function(){return[P.bf]},
$isp:1,
"%":"Float32Array"},
j1:{
"^":"by;",
$isj:1,
$asj:function(){return[P.bf]},
$isp:1,
"%":"Float64Array"},
j2:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Int16Array"},
j3:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Int32Array"},
j4:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Int8Array"},
j5:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Uint16Array"},
j6:{
"^":"Y;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"Uint32Array"},
j7:{
"^":"Y;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
j8:{
"^":"Y;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.w(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isp:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
du:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
hY:function(a){var z={}
a.G(0,new P.hZ(z))
return z},
hZ:{
"^":"d:19;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
jL:[function(){var z,y,x,w
z=new G.fr(700,500,P.aT(),P.aT())
y=new E.P(new Float64Array(H.m(16)))
y.R()
x=new F.fs(400,300,1,1,1,0,0,null,!0,"none",null,y,!1)
x.b=[]
x.ch=F.aj(255,238,238,255)
y=new E.P(new Float64Array(H.m(16)))
y.R()
w=new G.fC(null,0,0,!1,0,z,!1,!1,!1,0,null,!1,!1,[y])
w.a=G.fy(400,600)
w.seu(x)
w.en()
w.ez()
w.x=!0
if(!w.d){w.d=!0
w.aq()}x.av(D.f_(z))},"$0","ds",0,0,1]},1],["","",,F,{
"^":"",
cl:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.af)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.d.aY(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
fp:{
"^":"a;"},
cM:{
"^":"a;",
av:function(a){var z=0,y=new P.at(),x=1,w,v=this,u,t,s,r
function $async$av(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.c(new s.C(0,r.k,null),[null])
t=u
t.aK(null)
z=2
return H.u(u,$async$av,y)
case 2:t=v
t=t.b
t.push(a)
return H.u(null,0,y,null)
case 1:return H.u(w,1,y)}}return H.u(null,$async$av,y,null)},
c1:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.af)(z),++x)z[x].c1(a)},
cd:function(a,b){},
cm:function(a,b){var z,y,x
this.b5()
this.cd(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.af)(z),++x)z[x].cm(a,b)},
ba:function(a,b){},
bb:["cO",function(a,b){var z,y,x,w,v,u
this.b5()
this.ba(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.af)(z),++w){v=z[w]
u=v.c
x.push(C.b.ga6(x).q(0,u))
b.aC()
v.bb(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aC()}}],
ey:["cP",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b5()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.cf(v.c)
u=v.ey(a,b,c,d,e)
a.ce()
if(u)return!0}t=a.cv().b3(0)
t.eh()
y=new E.r(new Float64Array(H.m(3)))
y.D(d,e,0)
s=t.q(0,y)
s.gC(s)
s.gE(s)
return!1}],
b5:function(){if(!this.d)this.d=!0}},
fq:{
"^":"a;",
ax:function(a){var z=0,y=new P.at(),x,w=2,v,u=this,t,s,r,q
function $async$ax(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.ag(a)?3:4
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
return H.u(q.ay(a),$async$ax,y)
case 5:s.t(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.u(x,0,y,null)
case 2:return H.u(v,1,y)}}return H.u(null,$async$ax,y,null)}},
N:{
"^":"a;a,b,c,d",
l:function(a,b){if(b==null)return!1
return b instanceof F.N&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gp:function(a){return F.cl([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+this.a+", y:"+this.b+", w:"+this.c+", h:"+this.d}},
fu:{
"^":"a;a",
i:function(a){return C.x.h(0,this.a)}},
ft:{
"^":"a;a,b,c",
cX:function(a){if(this.a==null)this.a=F.aj(255,255,255,255)},
static:{b0:function(a){var z=new F.ft(a,C.j,1)
z.cX(a)
return z}}},
cL:{
"^":"a;a",
l:function(a,b){if(b==null)return!1
return b instanceof F.cL&&b.a===this.a},
gp:function(a){return F.cl([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
cW:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{aj:function(a,b,c,d){var z=new F.cL(0)
z.cW(a,b,c,d)
return z}}},
bD:{
"^":"a;"},
fs:{
"^":"cM;e,f,r,x,y,z,Q,ch,cx,a,b,c,d",
cd:function(a,b){var z,y,x,w
z=this.e
y=(a.gbk()-a.geo(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.P(new Float64Array(H.m(16)))
y.R()
this.c=y
y.cn(0,this.z,this.Q,0)
y=this.c
z=this.y
y.bn(0,z,z,1)},
bb:function(a,b){var z,y
z=new F.N(0,0,this.e,this.f)
y=this.cx
if(y){b.b.push(z)
b.a4(a,z)}this.cO(a,b)
if(y){y=b.b
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.a4(a,C.b.ga6(y))
else{y=a.a
b.a4(a,new F.N(0,0,y.c,y.d))}}},
ba:function(a,b){var z=F.b0(null)
z.a=this.ch
b.a5(a,new F.N(0,0,this.e,this.f),z)}},
b1:{
"^":"a;a",
i:function(a){return C.y.h(0,this.a)}},
fv:{
"^":"a;",
seu:function(a){this.c$=a},
ej:function(a){if(!this.e$){this.c$.c1(this)
this.e$=!0}this.c$.cm(this,a)
this.em()},
ek:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.ga6(y).q(0,z))
b.aC()
this.c$.bb(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
b.aC()},
V:function(a,b,c,d,e){a.cf(this.c$.c)
this.c$.cP(a,b,c,d,e)
a.ce()},
cf:function(a){var z=this.f$
z.push(C.b.ga6(z).q(0,a))},
ce:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cv:function(){return C.b.ga6(this.f$)}}}],["","",,G,{
"^":"",
bE:function(a){var z=0,y=new P.at(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bE(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.c(new p.d1(o.c(new n.C(0,m.k,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.e5(t,a)
q=J
s=q.i(t)
q=s
r=q.gb9(t)
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
m=m.y(new l.fA(u,t))
l=r
p=new p.x(0,o,n,m,l.c)
o=H
q=q.c(p,[o.t(r,0)])
q.v()
q=s
s=q.gb8(t)
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
m=m.y(new l.fB(a,u))
l=s
p=new p.x(0,o,n,m,l.c)
o=H
q=q.c(p,[o.t(s,0)])
q.v()
q=u
x=q.a
z=1
break
case 1:return H.u(x,0,y,null)
case 2:return H.u(v,1,y)}}return H.u(null,$async$bE,y,null)},
cN:function(a,b,c){var z,y
z=J.dM(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.f(y+"\n")}return z},
fz:{
"^":"bD;a,b"},
fx:{
"^":"a;a,b,c,d",
cY:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a9(b)
y=C.d.a9(a)
x=document.createElement("canvas",null)
J.e6(x,z)
J.e4(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.e1(this.b,!0)},
static:{fy:function(a,b){var z=new G.fx(null,null,null,null)
z.cY(a,b)
return z}}},
fr:{
"^":"fq;c,d,a,b",
ay:function(a){var z=0,y=new P.at(),x,w=2,v,u,t
function $async$ay(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.u(t.bE(a),$async$ay,y)
case 3:x=new u.fz(c,null)
z=1
break
case 1:return H.u(x,0,y,null)
case 2:return H.u(v,1,y)}}return H.u(null,$async$ay,y,null)}},
fw:{
"^":"fp;c,d,e,f,r,x,y,z,Q,ch,cx,cy,a,b",
ec:function(){var z,y,x,w,v,u
P.aI("#[A]# "+H.b(J.c3(this.d,35660)))
P.aI("#[B]# "+H.b(J.c3(this.d,33901)))
z=C.b.c2(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.c2(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.d
w=G.cN(x,35633,z)
v=G.cN(x,35632,y)
u=J.dL(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.f=u},
P:function(a){this.r=1
this.ch=-0.5
J.c1(this.d,2960)
J.dN(this.d,515)
J.dI(this.d,0,0,0,1)
J.dJ(this.d,1)
J.bZ(this.d,0)
J.c1(this.d,3042)
switch(-1){case-1:J.dE(this.d,32774)
J.dF(this.d,770,771,770,32772)
break}J.dH(this.d,17664)
C.b.sj(this.x,0)
C.b.sj(this.y,0)
C.b.sj(this.z,0)
this.Q=null},
aw:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.x
if(z.length!==0){y=this.y
F.aj(170,255,170,170)
J.c7(this.d,this.f)
x=J.aK(this.d,this.f,"a_tex")
w=J.bh(this.d)
J.bg(this.d,34962,w)
v=this.z
J.dG(this.d,34962,new Float32Array(H.b6(v)),35044)
J.aJ(this.d,x)
J.aL(this.d,x,2,5126,!1,0,0)
u=this.d
t=J.bh(u)
u.bindBuffer(34962,t)
u.bufferData(34962,new Float32Array(H.b6(z)),35044)
u.bindBuffer(34962,null)
J.bg(this.d,34962,t)
u=this.d
t=J.bh(u)
u.bindBuffer(34963,t)
u.bufferData(34963,new Uint16Array(H.b6(y)),35044)
u.bindBuffer(34963,null)
J.bg(this.d,34963,t)
u=this.d
u.uniformMatrix4fv(J.e2(u,this.f,"u_mat"),!1,new Float32Array(H.b6(this.cx.a)))
s=J.aK(this.d,this.f,"color")
r=J.aK(this.d,this.f,"vp")
q=J.aK(this.d,this.f,"useTex")
J.aL(this.d,r,3,5126,!1,32,0)
J.aL(this.d,s,4,5126,!1,32,12)
J.aL(this.d,q,1,5126,!1,32,28)
J.aJ(this.d,r)
J.aJ(this.d,s)
J.aJ(this.d,q)
J.dP(this.d,4,y.length,5123,0)
if(x!==0){J.dO(this.d,x)
J.dD(this.d,3553,null)}J.c7(this.d,null)
C.b.sj(z,0)
C.b.sj(y,0)
C.b.sj(v,0)
this.Q=null}},
a5:function(a,b,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=b.a
y=b.b
x=b.c
w=b.d
if(a0.b===C.j){v=this.bV()
u=z+x
t=y+w
x=new E.r(new Float64Array(H.m(3)))
x.D(z,y,0)
s=v.q(0,x)
x=new E.r(new Float64Array(H.m(3)))
x.D(z,t,0)
r=v.q(0,x)
x=new E.r(new Float64Array(H.m(3)))
x.D(u,y,0)
q=v.q(0,x)
x=new E.r(new Float64Array(H.m(3)))
x.D(u,t,0)
p=v.q(0,x)
x=a0.a.a
this.ae(a,s,r,q,p,(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255)}else{v=this.bV()
o=a0.c
n=o/2
m=z+n
l=y+n
u=z+x-n
t=y+w-n
n=new E.r(new Float64Array(H.m(3)))
n.D(m,l,0)
s=v.q(0,n)
n=m-o
w=l-o
x=new E.r(new Float64Array(H.m(3)))
x.D(n,w,0)
k=v.q(0,x)
x=new E.r(new Float64Array(H.m(3)))
x.D(m,t,0)
r=v.q(0,x)
x=t+o
j=new E.r(new Float64Array(H.m(3)))
j.D(n,x,0)
i=v.q(0,j)
j=new E.r(new Float64Array(H.m(3)))
j.D(u,l,0)
q=v.q(0,j)
o=u+o
j=new E.r(new Float64Array(H.m(3)))
j.D(o,w,0)
h=v.q(0,j)
j=new E.r(new Float64Array(H.m(3)))
j.D(u,t,0)
p=v.q(0,j)
j=new E.r(new Float64Array(H.m(3)))
j.D(o,x,0)
g=v.q(0,j)
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
C.b.b_(z,[b.gC(b),b.gE(b),this.ch,f,g,h,i,-1,c.gC(c),c.gE(c),this.ch,f,g,h,i,-1,d.gC(d),d.gE(d),this.ch,f,g,h,i,-1,e.gC(e),e.gE(e),this.ch,f,g,h,i,-1])
C.b.b_(this.z,[0,0,0,0,0,0,0,0])
this.ch+=0.0001
z=y+1
x=y+2
C.b.b_(this.y,[y,z,x,z,y+3,x])},
a4:function(a,b){var z
this.aw(0)
J.c_(this.d,!1,!1,!1,!1)
J.c0(this.d,!1)
J.c5(this.d,7680,7681,7681)
J.c4(this.d,519,this.r,255)
z=F.b0(null)
z.a=F.aj(255,255,255,255)
this.a5(null,b,z)
this.aw(0)
J.c_(this.d,!0,!0,!0,!0)
J.c0(this.d,!0)
J.c5(this.d,7680,7680,7680)
J.c4(this.d,515,this.r,255);++this.r},
aC:function(){},
bV:function(){var z,y
this.cy.R()
z=this.cy.cn(0,-1,1,0)
this.cy=z
y=this.e
y=z.bn(0,2/y.c,-2/y.d,1)
this.cy=y
y=y.q(0,C.b.ga6(this.a))
this.cy=y
return y}},
fC:{
"^":"eX;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gbk:function(){return this.a.c},
geo:function(a){return 0},
em:function(){this.r=!0},
aq:function(){var z=0,y=new P.at(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
function $async$aq(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:i=H
i=i
h=P
u=i.cx(new h.cb(Date.now(),!1))
i=v
t=i.a
i=E
i=i
h=Float64Array
g=H
s=new i.P(new h(g.m(16)))
i=s
i.R()
i=E
i=i
h=Float64Array
g=H
r=new i.P(new h(g.m(16)))
i=r
i.R()
i=E
i=i
h=Float64Array
g=H
q=new i.P(new h(g.m(16)))
i=q
i.R()
i=G
p=new i.fw(10,null,null,null,1,[],[],[],null,0,s,r,[q],[])
i=p
h=t
i.d=h.a
i=p
i.e=t
i=p
i.ec()
i=p
i.P(0)
o=0,n=0,m=0
case 2:i=v
if(!i.d){z=4
break}i=P
i=i
h=P
z=5
return H.u(i.er(new h.av(15e3),null,null),$async$aq,y)
case 5:l=Date.now()
i=v
i.b=l
k=l-u
i=v
i=i
h=C
h=h.d
i.ej(h.a9(u+k))
o+=k
n+=k
if(k<0);else ;++m
i=v
i.r=!0
z=n>40?6:7
break
case 6:i=p
i.P(0)
i=v
i.ek(v,p)
i=p
i.aw(0)
i=v
i.r=!1
n=0
case 7:z=m>40?8:9
break
case 8:i=C
i=i.d
j="###fps  "+i.cS(o,m)
i=H
i.du(j)
o=0
m=0
case 9:case 3:u=l
z=2
break
case 4:return H.u(null,0,y,null)
case 1:return H.u(w,1,y)}}return H.u(null,$async$aq,y,null)},
ez:function(){var z,y,x,w
z=P.aT()
y=new G.fL(this,z)
x=new G.fK(this,z)
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchcancel",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(x),w.c),[H.t(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchend",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(x),w.c),[H.t(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchenter",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(y),w.c),[H.t(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchleave",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(y),w.c),[H.t(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchmove",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(y),w.c),[H.t(w,0)]).v()
w=this.a.b
w.toString
w=H.c(new W.q(w,"touchstart",!1),[null])
H.c(new W.x(0,w.a,w.b,W.y(y),w.c),[H.t(w,0)]).v()},
en:function(){var z,y
z={}
z.a=!1
y=J.dS(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fD(z,this)),y.c),[H.t(y,0)]).v()
y=J.dY(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fE(z,this)),y.c),[H.t(y,0)]).v()
y=J.dT(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fF(z,this)),y.c),[H.t(y,0)]).v()
y=J.dU(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fG(z,this)),y.c),[H.t(y,0)]).v()
y=J.dV(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fH(z,this)),y.c),[H.t(y,0)]).v()
y=J.dW(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fI(z,this)),y.c),[H.t(y,0)]).v()
y=J.dX(this.a.b)
H.c(new W.x(0,y.a,y.b,W.y(new G.fJ(z,this)),y.c),[H.t(y,0)]).v()}},
eX:{
"^":"a+fv;"},
fL:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.c2(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.af)(y),++v){u=y[v]
t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
r=t-C.a.A(z.a.b.offsetLeft)
t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
q=s-C.a.A(z.a.b.offsetTop)
t=w.ag(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.k()
z.V(z,s+1,C.n,r,q)}else{w.t(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.k()
z.V(z,t+1,C.m,r,q)}}}},
fK:{
"^":"d:8;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.c2(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.af)(y),++v){u=y[v]
if(w.ag(u.identifier)){t=C.a.A(u.pageX)
s=C.a.A(u.pageY)
new P.H(t,s).$builtinTypeInfo=[null]
s=C.a.A(z.a.b.offsetLeft)
r=C.a.A(u.pageX)
q=C.a.A(u.pageY)
new P.H(r,q).$builtinTypeInfo=[null]
r=C.a.A(z.a.b.offsetTop)
w.a8(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.k()
z.V(z,p+1,C.l,t-s,q-r)}}}},
fD:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gH(a)
x=x.gC(x)
x.toString
y=y.gH(a)
y=y.gE(y)
y.toString
z.V(z,0,C.m,x,y)}}},
fE:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gC(w)
w.toString
x=x.gH(a)
x=x.gE(x)
x.toString
z.V(z,0,C.l,w,x)
y.a=!1}}}},
fF:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fG:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gC(w)
w.toString
x=x.gH(a)
x=x.gE(x)
x.toString
z.V(z,0,C.k,w,x)
y.a=!1}}}},
fH:{
"^":"d:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gH(a)
x=x.gC(x)
x.toString
y=y.gH(a)
y=y.gE(y)
y.toString
z.V(z,0,C.n,x,y)}}},
fI:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gC(w)
w.toString
x=x.gH(a)
x=x.gE(x)
x.toString
z.V(z,0,C.k,w,x)
y.a=!1}}}},
fJ:{
"^":"d:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
fA:{
"^":"d:2;a,b",
$1:function(a){this.a.b4(0,this.b)}},
fB:{
"^":"d:2;a,b",
$1:function(a){this.b.dN("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
P:{
"^":"a;a",
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
i:function(a){return"[0] "+this.ap(0).i(0)+"\n[1] "+this.ap(1).i(0)+"\n[2] "+this.ap(2).i(0)+"\n[3] "+this.ap(3).i(0)+"\n"},
ge_:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
t:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
ap:function(a){var z,y,x
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
return new E.a1(z)},
b3:function(a){var z=new E.P(new Float64Array(H.m(16)))
z.ac(this)
return z},
q:function(a,b){var z,y,x
if(!!b.$isa1){z=new Float64Array(H.m(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a1(z)}if(!!b.$isr){z=new Float64Array(H.m(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.r(z)}if(4===b.ge_()){z=new Float64Array(H.m(16))
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
return new E.P(z)}throw H.f(P.bj(b))},
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
return new E.P(z)},
cn:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isa1
x=y?b.gbk():1
if(!!z.$isr||y){w=z.gC(b)
v=z.gE(b)
u=z.geC(b)}else{u=d
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
bn:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isa1
x=y?b.gbk():1
if(!!z.$isr||y){w=z.gC(b)
v=z.gE(b)
u=z.geC(b)}else{u=d
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
eh:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
r:{
"^":"a;a",
D:function(a,b,c){var z=this.a
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
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
k:function(a,b){var z,y,x,w
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
z=C.a.k(z[2],b.gm().h(0,2))
w=new E.r(new Float64Array(H.m(3)))
w.D(y,x,z)
return w},
q:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.S(b)
x=z[1]
z=z[2]
w=new E.r(new Float64Array(H.m(3)))
w.D(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
t:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dk(y*y+x*x+z*z))},
b3:function(a){var z=new E.r(new Float64Array(H.m(3)))
z.ac(this)
return z},
gC:function(a){return this.a[0]},
gE:function(a){return this.a[1]}},
a1:{
"^":"a;a",
bp:function(a,b,c,d){var z=this.a
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
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
k:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.k(z[0],b.gm().h(0,0))
x=C.a.k(z[1],b.gm().h(0,1))
w=C.a.k(z[2],b.gm().h(0,2))
z=C.a.k(z[3],b.gm().h(0,3))
v=new E.a1(new Float64Array(H.m(4)))
v.bp(y,x,w,z)
return v},
q:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.S(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a1(new Float64Array(H.m(4)))
v.bp(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
t:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dk(y*y+x*x+w*w+z*z))},
b3:function(a){var z=new E.a1(new Float64Array(H.m(4)))
z.ac(this)
return z},
gC:function(a){return this.a[0]},
gE:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cj.prototype
return J.eK.prototype}if(typeof a=="string")return J.aQ.prototype
if(a==null)return J.eL.prototype
if(typeof a=="boolean")return J.eJ.prototype
if(a.constructor==Array)return J.ay.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.R=function(a){if(typeof a=="string")return J.aQ.prototype
if(a==null)return a
if(a.constructor==Array)return J.ay.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.aG=function(a){if(a==null)return a
if(a.constructor==Array)return J.ay.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.dn=function(a){if(typeof a=="number")return J.az.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bH.prototype
return a}
J.i_=function(a){if(typeof a=="number")return J.az.prototype
if(typeof a=="string")return J.aQ.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bH.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ba(a)}
J.aq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.i_(a).k(a,b)}
J.a4=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).l(a,b)}
J.dA=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dn(a).aD(a,b)}
J.bY=function(a,b){if(a.constructor==Array||typeof a=="string"||H.id(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.R(a).h(a,b)}
J.dB=function(a,b,c,d){return J.i(a).d1(a,b,c,d)}
J.dC=function(a,b,c,d){return J.i(a).dr(a,b,c,d)}
J.bg=function(a,b,c){return J.i(a).dz(a,b,c)}
J.dD=function(a,b,c){return J.i(a).dA(a,b,c)}
J.dE=function(a,b){return J.i(a).dC(a,b)}
J.dF=function(a,b,c,d,e){return J.i(a).dD(a,b,c,d,e)}
J.dG=function(a,b,c,d){return J.i(a).dE(a,b,c,d)}
J.dH=function(a,b){return J.aG(a).dH(a,b)}
J.dI=function(a,b,c,d,e){return J.i(a).dI(a,b,c,d,e)}
J.dJ=function(a,b){return J.i(a).dJ(a,b)}
J.bZ=function(a,b){return J.i(a).dK(a,b)}
J.c_=function(a,b,c,d,e){return J.i(a).dM(a,b,c,d,e)}
J.dK=function(a,b){return J.i(a).b4(a,b)}
J.bh=function(a){return J.i(a).dQ(a)}
J.dL=function(a){return J.i(a).dR(a)}
J.dM=function(a,b){return J.i(a).dS(a,b)}
J.dN=function(a,b){return J.i(a).dT(a,b)}
J.c0=function(a,b){return J.i(a).dU(a,b)}
J.dO=function(a,b){return J.i(a).e0(a,b)}
J.dP=function(a,b,c,d,e){return J.i(a).e1(a,b,c,d,e)}
J.dQ=function(a,b){return J.aG(a).U(a,b)}
J.c1=function(a,b){return J.i(a).e2(a,b)}
J.aJ=function(a,b){return J.i(a).e3(a,b)}
J.dR=function(a,b){return J.aG(a).G(a,b)}
J.c2=function(a){return J.i(a).gdG(a)}
J.T=function(a){return J.i(a).gai(a)}
J.E=function(a){return J.l(a).gp(a)}
J.bi=function(a){return J.aG(a).gF(a)}
J.ar=function(a){return J.R(a).gj(a)}
J.dS=function(a){return J.i(a).gc6(a)}
J.dT=function(a){return J.i(a).gc7(a)}
J.dU=function(a){return J.i(a).gc8(a)}
J.dV=function(a){return J.i(a).gc9(a)}
J.dW=function(a){return J.i(a).gca(a)}
J.dX=function(a){return J.i(a).gcb(a)}
J.dY=function(a){return J.i(a).gcc(a)}
J.dZ=function(a){return J.i(a).gbj(a)}
J.e_=function(a){return J.i(a).gC(a)}
J.aK=function(a,b,c){return J.i(a).cr(a,b,c)}
J.e0=function(a){return J.i(a).cs(a)}
J.e1=function(a,b){return J.i(a).ct(a,b)}
J.c3=function(a,b){return J.i(a).cw(a,b)}
J.e2=function(a,b,c){return J.i(a).cz(a,b,c)}
J.e3=function(a,b){return J.aG(a).a7(a,b)}
J.e4=function(a,b){return J.i(a).sw(a,b)}
J.e5=function(a,b){return J.i(a).sS(a,b)}
J.e6=function(a,b){return J.i(a).sB(a,b)}
J.c4=function(a,b,c,d){return J.i(a).cJ(a,b,c,d)}
J.c5=function(a,b,c,d){return J.i(a).cK(a,b,c,d)}
J.c6=function(a){return J.dn(a).a9(a)}
J.as=function(a){return J.l(a).i(a)}
J.c7=function(a,b){return J.i(a).eA(a,b)}
J.aL=function(a,b,c,d,e,f,g){return J.i(a).eB(a,b,c,d,e,f,g)}
var $=I.p
C.b=J.ay.prototype
C.d=J.cj.prototype
C.a=J.az.prototype
C.e=J.aQ.prototype
C.z=J.eY.prototype
C.A=J.bH.prototype
C.o=new H.cc()
C.p=new P.h_()
C.c=new P.hx()
C.f=new P.av(0)
C.q=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.r=function(hooks) {
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

C.t=function(getTagFallback) {
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
C.u=function() {
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
C.w=function(hooks) {
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
C.x=new H.cg([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.y=new H.cg([0,"TinyStagePointerType.CANCEL",1,"TinyStagePointerType.UP",2,"TinyStagePointerType.DOWN",3,"TinyStagePointerType.MOVE"])
C.j=new F.fu(0)
C.k=new F.b1(0)
C.l=new F.b1(1)
C.m=new F.b1(2)
C.n=new F.b1(3)
$.cy="$cachedFunction"
$.cz="$cachedInvocation"
$.O=0
$.ag=null
$.c8=null
$.bT=null
$.dg=null
$.dv=null
$.b8=null
$.bb=null
$.bU=null
$.aa=null
$.am=null
$.an=null
$.bO=!1
$.k=C.c
$.ce=0
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
I.$lazy(y,x,w)}})(["ch","$get$ch",function(){return H.eE()},"ci","$get$ci",function(){return new P.eo(null)},"cO","$get$cO",function(){return H.Q(H.b2({toString:function(){return"$receiver$"}}))},"cP","$get$cP",function(){return H.Q(H.b2({$method$:null,toString:function(){return"$receiver$"}}))},"cQ","$get$cQ",function(){return H.Q(H.b2(null))},"cR","$get$cR",function(){return H.Q(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cV","$get$cV",function(){return H.Q(H.b2(void 0))},"cW","$get$cW",function(){return H.Q(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cT","$get$cT",function(){return H.Q(H.cU(null))},"cS","$get$cS",function(){return H.Q(function(){try{null.$method$}catch(z){return z.message}}())},"cY","$get$cY",function(){return H.Q(H.cU(void 0))},"cX","$get$cX",function(){return H.Q(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bJ","$get$bJ",function(){return P.fO()},"ao","$get$ao",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bw]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.a_]},{func:1,args:[,],opt:[,]},{func:1,ret:P.W,args:[P.o]},{func:1,args:[W.bG]},{func:1,args:[,P.W]},{func:1,args:[P.W]},{func:1,args:[F.bD]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.a_]},{func:1,ret:P.bQ},{func:1,void:true,args:[P.a],opt:[P.a_]},{func:1,void:true,args:[,P.a_]},{func:1,args:[,,]},{func:1,args:[P.cH,,]},{func:1,args:[P.W,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.ik(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dx(F.ds(),b)},[])
else (function(b){H.dx(F.ds(),b)})([])})})()