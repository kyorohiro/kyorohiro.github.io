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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bQ"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bQ"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bQ(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b5=function(){}
var dart=[["","",,H,{
"^":"",
ja:{
"^":"a;a"}}],["","",,J,{
"^":"",
k:function(a){return void 0},
b9:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
b6:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.bU==null){H.ii()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.d7("Return interceptor for "+H.b(y(a,z))))}w=H.is(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.v
else return C.x}return w},
f:{
"^":"a;",
n:function(a,b){return a===b},
gt:function(a){return H.X(a)},
i:["cS",function(a){return H.aW(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLTexture|WebGLUniformLocation"},
eV:{
"^":"f;",
i:function(a){return String(a)},
gt:function(a){return a?519018:218159},
$isbP:1},
eX:{
"^":"f;",
n:function(a,b){return null==b},
i:function(a){return"null"},
gt:function(a){return 0}},
cq:{
"^":"f;",
gt:function(a){return 0},
$iseY:1},
f9:{
"^":"cq;"},
bF:{
"^":"cq;",
i:function(a){return String(a)}},
ay:{
"^":"f;",
c0:function(a,b){if(!!a.immutable$list)throw H.e(new P.I(b))},
dM:function(a,b){if(!!a.fixed$length)throw H.e(new P.I(b))},
w:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.D(a))}},
a9:function(a,b){return H.d(new H.bu(a,b),[null,null])},
aw:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
X:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
geb:function(a){if(a.length>0)return a[0]
throw H.e(H.bo())},
ga8:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bo())},
br:function(a,b,c,d,e){var z,y,x
this.c0(a,"set range")
P.cJ(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.e(H.eT())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aP(a,"[","]")},
gA:function(a){return new J.ej(a,a.length,0,null)},
gt:function(a){return H.X(a)},
gl:function(a){return a.length},
sl:function(a,b){this.dM(a,"set length")
if(b<0)throw H.e(P.aB(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.u(a,b))
if(b>=a.length||b<0)throw H.e(H.u(a,b))
return a[b]},
v:function(a,b,c){this.c0(a,"indexed set")
if(b>=a.length||!1)throw H.e(H.u(a,b))
a[b]=c},
$isbp:1,
$isl:1,
$asl:null,
$isp:1},
j9:{
"^":"ay;"},
ej:{
"^":"a;a,b,c,d",
gu:function(){return this.d},
q:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.D(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
az:{
"^":"f;",
bh:function(a,b){return a%b},
a1:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.I(""+a))},
aB:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.I(""+a))},
eD:function(a){return a},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.e(H.ae(b))
return a+b},
cX:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.a1(a/b)},
ae:function(a,b){return(a|0)===a?a/b|0:this.a1(a/b)},
bV:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aF:function(a,b){if(typeof b!=="number")throw H.e(H.ae(b))
return a<b},
$isaI:1},
cp:{
"^":"az;",
$isaI:1,
$iso:1},
eW:{
"^":"az;",
$isaI:1},
aQ:{
"^":"f;",
dR:function(a,b){if(b>=a.length)throw H.e(H.u(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.e(P.ei(b,null,null))
return a+b},
cR:function(a,b,c){H.dt(b)
if(c==null)c=a.length
H.dt(c)
if(b<0)throw H.e(P.aX(b,null,null))
if(typeof c!=="number")return H.O(c)
if(b>c)throw H.e(P.aX(b,null,null))
if(c>a.length)throw H.e(P.aX(c,null,null))
return a.substring(b,c)},
cQ:function(a,b){return this.cR(a,b,null)},
dV:function(a,b,c){if(c>a.length)throw H.e(P.aB(c,0,a.length,null,null))
return H.ix(a,b,c)},
gH:function(a){return a.length===0},
i:function(a){return a},
gt:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gl:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.u(a,b))
if(b>=a.length||b<0)throw H.e(H.u(a,b))
return a[b]},
$isbp:1,
$isU:1}}],["","",,H,{
"^":"",
aE:function(a,b){var z=a.ah(b)
if(!init.globalState.d.cy)init.globalState.f.am()
return z},
b8:function(){--init.globalState.f.b},
dE:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.k(y).$isl)throw H.e(P.aL("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hB(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cn()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hd(P.bs(null,H.aD),0)
y.z=P.aR(null,null,null,P.o,H.bK)
y.ch=P.aR(null,null,null,P.o,null)
if(y.x===!0){x=new H.hA()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eM,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hC)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aR(null,null,null,P.o,H.aY)
w=P.ah(null,null,null,P.o)
v=new H.aY(0,null,!1)
u=new H.bK(y,x,w,init.createNewIsolate(),v,new H.a5(H.ba()),new H.a5(H.ba()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
w.a6(0,0)
u.bu(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aG()
x=H.af(y,[y]).V(a)
if(x)u.ah(new H.iv(z,a))
else{y=H.af(y,[y,y]).V(a)
if(y)u.ah(new H.iw(z,a))
else u.ah(a)}init.globalState.f.am()},
eQ:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.eR()
return},
eR:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.I("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.I("Cannot extract URI from \""+H.b(z)+"\""))},
eM:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b_(!0,[]).W(b.data)
y=J.J(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b_(!0,[]).W(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b_(!0,[]).W(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aR(null,null,null,P.o,H.aY)
p=P.ah(null,null,null,P.o)
o=new H.aY(0,null,!1)
n=new H.bK(y,q,p,init.createNewIsolate(),o,new H.a5(H.ba()),new H.a5(H.ba()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
p.a6(0,0)
n.bu(0,o)
init.globalState.f.a.R(new H.aD(n,new H.eN(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.am()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").U(y.h(z,"msg"))
init.globalState.f.am()
break
case"close":init.globalState.ch.al(0,$.$get$co().h(0,a))
a.terminate()
init.globalState.f.am()
break
case"log":H.eL(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a9(["command","print","msg",z])
q=new H.aa(!0,P.a8(null,P.o)).F(q)
y.toString
self.postMessage(q)}else P.bY(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
eL:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a9(["command","log","msg",a])
x=new H.aa(!0,P.a8(null,P.o)).F(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.v(w)
throw H.e(P.aO(z))}},
eO:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cF=$.cF+("_"+y)
$.cG=$.cG+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.U(["spawned",new H.b1(y,x),w,z.r])
x=new H.eP(a,b,c,d,z)
if(e===!0){z.bY(w,w)
init.globalState.f.a.R(new H.aD(z,x,"start isolate"))}else x.$0()},
hV:function(a){return new H.b_(!0,[]).W(new H.aa(!1,P.a8(null,P.o)).F(a))},
iv:{
"^":"c:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iw:{
"^":"c:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hB:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hC:function(a){var z=P.a9(["command","print","msg",a])
return new H.aa(!0,P.a8(null,P.o)).F(z)}}},
bK:{
"^":"a;a,b,c,ep:d<,dW:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bY:function(a,b){if(!this.f.n(0,a))return
if(this.Q.a6(0,b)&&!this.y)this.y=!0
this.b1()},
ew:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.al(0,a)
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
if(w===y.c)y.bE();++y.d}this.y=!1}this.b1()},
dE:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.k(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ev:function(a){var z,y,x
if(this.ch==null)return
for(z=J.k(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.y(new P.I("removeRange"))
P.cJ(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cM:function(a,b){if(!this.r.n(0,a))return
this.db=b},
ef:function(a,b,c){var z=J.k(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){a.U(c)
return}z=this.cx
if(z==null){z=P.bs(null,null)
this.cx=z}z.R(new H.hv(a,c))},
ed:function(a,b){var z
if(!this.r.n(0,a))return
z=J.k(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.ba()
return}z=this.cx
if(z==null){z=P.bs(null,null)
this.cx=z}z.R(this.geq())},
eg:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bY(a)
if(b!=null)P.bY(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.au(a)
y[1]=b==null?null:J.au(b)
for(x=new P.cs(z,z.r,null,null),x.c=z.e;x.q();)x.d.U(y)},
ah:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.z(u)
w=t
v=H.v(u)
this.eg(w,v)
if(this.db===!0){this.ba()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gep()
if(this.cx!=null)for(;t=this.cx,!t.gH(t);)this.cx.ck().$0()}return y},
ca:function(a){return this.b.h(0,a)},
bu:function(a,b){var z=this.b
if(z.b8(a))throw H.e(P.aO("Registry: ports must be registered only once."))
z.v(0,a,b)},
b1:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.v(0,this.a,this)
else this.ba()},
ba:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.N(0)
for(z=this.b,y=z.gcs(z),y=y.gA(y);y.q();)y.gu().d9()
z.N(0)
this.c.N(0)
init.globalState.z.al(0,this.a)
this.dx.N(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.U(z[v])}this.ch=null}},"$0","geq",0,0,1]},
hv:{
"^":"c:1;a,b",
$0:function(){this.a.U(this.b)}},
hd:{
"^":"a;a,b",
e2:function(){var z=this.a
if(z.b===z.c)return
return z.ck()},
co:function(){var z,y,x
z=this.e2()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.b8(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gH(y)}else y=!1
else y=!1
else y=!1
if(y)H.y(P.aO("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gH(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a9(["command","close"])
x=new H.aa(!0,P.a8(null,P.o)).F(x)
y.toString
self.postMessage(x)}return!1}z.eu()
return!0},
bP:function(){if(self.window!=null)new H.he(this).$0()
else for(;this.co(););},
am:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bP()
else try{this.bP()}catch(x){w=H.z(x)
z=w
y=H.v(x)
w=init.globalState.Q
v=P.a9(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.aa(!0,P.a8(null,P.o)).F(v)
w.toString
self.postMessage(v)}}},
he:{
"^":"c:1;a",
$0:function(){if(!this.a.co())return
P.cR(C.f,this)}},
aD:{
"^":"a;a,b,c",
eu:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ah(this.b)}},
hA:{
"^":"a;"},
eN:{
"^":"c:0;a,b,c,d,e,f",
$0:function(){H.eO(this.a,this.b,this.c,this.d,this.e,this.f)}},
eP:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aG()
w=H.af(x,[x,x]).V(y)
if(w)y.$2(this.b,this.c)
else{x=H.af(x,[x]).V(y)
if(x)y.$1(this.b)
else y.$0()}}z.b1()}},
db:{
"^":"a;"},
b1:{
"^":"db;b,a",
U:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbH())return
x=H.hV(a)
if(z.gdW()===y){y=J.J(x)
switch(y.h(x,0)){case"pause":z.bY(y.h(x,1),y.h(x,2))
break
case"resume":z.ew(y.h(x,1))
break
case"add-ondone":z.dE(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.ev(y.h(x,1))
break
case"set-errors-fatal":z.cM(y.h(x,1),y.h(x,2))
break
case"ping":z.ef(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ed(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a6(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.al(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.R(new H.aD(z,new H.hE(this,x),w))},
n:function(a,b){if(b==null)return!1
return b instanceof H.b1&&J.a3(this.b,b.b)},
gt:function(a){return this.b.gaX()}},
hE:{
"^":"c:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbH())z.d5(this.b)}},
bM:{
"^":"db;b,c,a",
U:function(a){var z,y,x
z=P.a9(["command","message","port",this,"msg",a])
y=new H.aa(!0,P.a8(null,P.o)).F(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.bM&&J.a3(this.b,b.b)&&J.a3(this.a,b.a)&&J.a3(this.c,b.c)},
gt:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.cN()
y=this.a
if(typeof y!=="number")return y.cN()
x=this.c
if(typeof x!=="number")return H.O(x)
return(z<<16^y<<8^x)>>>0}},
aY:{
"^":"a;aX:a<,b,bH:c<",
d9:function(){this.c=!0
this.b=null},
d5:function(a){if(this.c)return
this.dk(a)},
dk:function(a){return this.b.$1(a)},
$isfa:1},
fv:{
"^":"a;a,b,c",
cZ:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.R(new H.aD(y,new H.fx(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ap(new H.fy(this,b),0),a)}else throw H.e(new P.I("Timer greater than 0."))},
static:{fw:function(a,b){var z=new H.fv(!0,!1,null)
z.cZ(a,b)
return z}}},
fx:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fy:{
"^":"c:1;a,b",
$0:function(){this.a.c=null
H.b8()
this.b.$0()}},
a5:{
"^":"a;aX:a<",
gt:function(a){var z=this.a
if(typeof z!=="number")return z.eL()
z=C.a.bV(z,0)^C.a.ae(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.a5){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aa:{
"^":"a;a,b",
F:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.v(0,a,z.gl(z))
z=J.k(a)
if(!!z.$iscx)return["buffer",a]
if(!!z.$isby)return["typed",a]
if(!!z.$isbp)return this.cI(a)
if(!!z.$iseK){x=this.gcF()
w=a.gc6()
w=H.aT(w,x,H.E(w,"G",0),null)
w=P.bt(w,!0,H.E(w,"G",0))
z=z.gcs(a)
z=H.aT(z,x,H.E(z,"G",0),null)
return["map",w,P.bt(z,!0,H.E(z,"G",0))]}if(!!z.$iseY)return this.cJ(a)
if(!!z.$isf)this.cr(a)
if(!!z.$isfa)this.an(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isb1)return this.cK(a)
if(!!z.$isbM)return this.cL(a)
if(!!z.$isc){v=a.$static_name
if(v==null)this.an(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isa5)return["capability",a.a]
if(!(a instanceof P.a))this.cr(a)
return["dart",init.classIdExtractor(a),this.cH(init.classFieldsExtractor(a))]},"$1","gcF",2,0,2],
an:function(a,b){throw H.e(new P.I(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cr:function(a){return this.an(a,null)},
cI:function(a){var z=this.cG(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.an(a,"Can't serialize indexable: ")},
cG:function(a){var z,y,x
z=[]
C.c.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.F(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cH:function(a){var z
for(z=0;z<a.length;++z)C.c.v(a,z,this.F(a[z]))
return a},
cJ:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.an(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.F(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cL:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cK:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaX()]
return["raw sendport",a]}},
b_:{
"^":"a;a,b",
W:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aL("Bad serialized message: "+H.b(a)))
switch(C.c.geb(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
y=this.af(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.af(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.af(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=this.af(x)
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
return new H.a5(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.af(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","ge3",2,0,2],
af:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.O(x)
if(!(y<x))break
z.v(a,y,this.W(z.h(a,y)));++y}return a},
e5:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.cr()
this.b.push(w)
y=J.ec(y,this.ge3()).bl(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.h(y,u)
w.v(0,y[u],this.W(v.h(x,u)))}return w},
e6:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.a3(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.ca(w)
if(u==null)return
t=new H.b1(u,x)}else t=new H.bM(y,w,x)
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
z=J.J(y)
v=J.J(x)
u=0
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.O(t)
if(!(u<t))break
w[z.h(y,u)]=this.W(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
er:function(){throw H.e(new P.I("Cannot modify unmodifiable Map"))},
ic:function(a){return init.types[a]},
ir:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.k(a).$isbq},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.au(a)
if(typeof z!=="string")throw H.e(H.ae(a))
return z},
X:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cH:function(a){var z,y
z=C.h(J.k(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.dR(z,0)===36)z=C.e.cQ(z,1)
return(z+H.dy(H.bS(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
aW:function(a){return"Instance of '"+H.cH(a)+"'"},
B:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cE:function(a){return a.b?H.B(a).getUTCMilliseconds()+0:H.B(a).getMilliseconds()+0},
aV:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ae(a))
return a[b]},
bz:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ae(a))
a[b]=c},
O:function(a){throw H.e(H.ae(a))},
h:function(a,b){if(a==null)J.as(a)
throw H.e(H.u(a,b))},
u:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a4(!0,b,"index",null)
z=J.as(a)
if(!(b<0)){if(typeof z!=="number")return H.O(z)
y=b>=z}else y=!0
if(y)return P.cm(b,a,"index",null,z)
return P.aX(b,"index",null)},
ae:function(a){return new P.a4(!0,a,null,null)},
b2:function(a){return a},
dt:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.ae(a))
return a},
e:function(a){var z
if(a==null)a=new P.cD()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dG})
z.name=""}else z.toString=H.dG
return z},
dG:function(){return J.au(this.dartException)},
y:function(a){throw H.e(a)},
c_:function(a){throw H.e(new P.D(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iz(a)
if(a==null)return
if(a instanceof H.bn)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bV(x,16)&8191)===10)switch(w){case 438:return z.$1(H.br(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cC(v,null))}}if(a instanceof TypeError){u=$.$get$cX()
t=$.$get$cY()
s=$.$get$cZ()
r=$.$get$d_()
q=$.$get$d3()
p=$.$get$d4()
o=$.$get$d1()
$.$get$d0()
n=$.$get$d6()
m=$.$get$d5()
l=u.J(y)
if(l!=null)return z.$1(H.br(y,l))
else{l=t.J(y)
if(l!=null){l.method="call"
return z.$1(H.br(y,l))}else{l=s.J(y)
if(l==null){l=r.J(y)
if(l==null){l=q.J(y)
if(l==null){l=p.J(y)
if(l==null){l=o.J(y)
if(l==null){l=r.J(y)
if(l==null){l=n.J(y)
if(l==null){l=m.J(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cC(y,l==null?null:l.method))}}return z.$1(new H.fZ(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cM()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a4(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cM()
return a},
v:function(a){var z
if(a instanceof H.bn)return a.b
if(a==null)return new H.dg(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dg(a,null)},
iu:function(a){if(a==null||typeof a!='object')return J.A(a)
else return H.X(a)},
dv:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.v(0,a[y],a[x])}return b},
ik:function(a,b,c,d,e,f,g){var z=J.k(c)
if(z.n(c,0))return H.aE(b,new H.il(a))
else if(z.n(c,1))return H.aE(b,new H.im(a,d))
else if(z.n(c,2))return H.aE(b,new H.io(a,d,e))
else if(z.n(c,3))return H.aE(b,new H.ip(a,d,e,f))
else if(z.n(c,4))return H.aE(b,new H.iq(a,d,e,f,g))
else throw H.e(P.aO("Unsupported number of arguments for wrapped closure"))},
ap:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ik)
a.$identity=z
return z},
ep:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.k(c).$isl){z.$reflectionInfo=c
x=H.fd(z).r}else x=c
w=d?Object.create(new H.fj().constructor.prototype):Object.create(new H.bj(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.K
$.K=J.aq(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ca(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ic(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.c8:H.bk
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ca(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
em:function(a,b,c,d){var z=H.bk
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ca:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eo(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.em(y,!w,z,b)
if(y===0){w=$.ag
if(w==null){w=H.aM("self")
$.ag=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.K
$.K=J.aq(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.ag
if(v==null){v=H.aM("self")
$.ag=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.K
$.K=J.aq(w,1)
return new Function(v+H.b(w)+"}")()},
en:function(a,b,c,d){var z,y
z=H.bk
y=H.c8
switch(b?-1:a){case 0:throw H.e(new H.ff("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eo:function(a,b){var z,y,x,w,v,u,t,s
z=H.ek()
y=$.c7
if(y==null){y=H.aM("receiver")
$.c7=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.en(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.K
$.K=J.aq(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.K
$.K=J.aq(u,1)
return new Function(y+H.b(u)+"}")()},
bQ:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.k(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.ep(a,b,z,!!d,e,f)},
iy:function(a){throw H.e(new P.eu("Cyclic initialization for static "+H.b(a)))},
af:function(a,b,c){return new H.fg(a,b,c,null)},
aG:function(){return C.k},
ba:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
n:function(a,b,c){var z
if(b===0){J.dT(c,a)
return}else if(b===1){c.c1(H.z(a),H.v(a))
return}if(!!J.k(a).$isQ)z=a
else{z=H.d(new P.x(0,$.j,null),[null])
z.aO(a)}z.bk(H.dp(b,0),new H.i4(b))
return c.gec()},
dp:function(a,b){return new H.i1(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
d:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bS:function(a){if(a==null)return
return a.$builtinTypeInfo},
dw:function(a,b){return H.dF(a["$as"+H.b(b)],H.bS(a))},
E:function(a,b,c){var z=H.dw(a,b)
return z==null?null:z[c]},
C:function(a,b){var z=H.bS(a)
return z==null?null:z[b]},
bZ:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dy(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dy:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bA("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.bZ(u,c))}return w?"":"<"+H.b(z)+">"},
dF:function(a,b){if(typeof a=="function"){a=H.bV(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.bV(a,null,b)}return b},
i3:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.F(a[y],b[y]))return!1
return!0},
b3:function(a,b,c){return H.bV(a,b,H.dw(b,c))},
F:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dx(a,b)
if('func' in a)return b.builtin$cls==="eD"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.bZ(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.bZ(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.i3(H.dF(v,z),x)},
dr:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.F(z,v)||H.F(v,z)))return!1}return!0},
i2:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.F(v,u)||H.F(u,v)))return!1}return!0},
dx:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.F(z,y)||H.F(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dr(x,w,!1))return!1
if(!H.dr(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.F(o,n)||H.F(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.F(o,n)||H.F(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.F(o,n)||H.F(n,o)))return!1}}return H.i2(a.named,b.named)},
bV:function(a,b,c){return a.apply(b,c)},
jW:function(a){var z=$.bT
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
jV:function(a){return H.X(a)},
jU:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
is:function(a){var z,y,x,w,v,u
z=$.bT.$1(a)
y=$.b4[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b7[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dq.$2(a,z)
if(z!=null){y=$.b4[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b7[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bX(x)
$.b4[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.b7[z]=x
return x}if(v==="-"){u=H.bX(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dA(a,x)
if(v==="*")throw H.e(new P.d7(z))
if(init.leafTags[z]===true){u=H.bX(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dA(a,x)},
dA:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.b9(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bX:function(a){return J.b9(a,!1,null,!!a.$isbq)},
it:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.b9(z,!1,null,!!z.$isbq)
else return J.b9(z,c,null,null)},
ii:function(){if(!0===$.bU)return
$.bU=!0
H.ij()},
ij:function(){var z,y,x,w,v,u,t,s
$.b4=Object.create(null)
$.b7=Object.create(null)
H.id()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dC.$1(v)
if(u!=null){t=H.it(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
id:function(){var z,y,x,w,v,u,t
z=C.p()
z=H.ad(C.m,H.ad(C.r,H.ad(C.i,H.ad(C.i,H.ad(C.q,H.ad(C.n,H.ad(C.o(C.h),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bT=new H.ie(v)
$.dq=new H.ig(u)
$.dC=new H.ih(t)},
ad:function(a,b){return a(b)||b},
ix:function(a,b,c){return a.indexOf(b,c)>=0},
eq:{
"^":"a;",
i:function(a){return P.cw(this)},
v:function(a,b,c){return H.er()}},
eG:{
"^":"eq;a",
aW:function(){var z=this.$map
if(z==null){z=new H.aA(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dv(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aW().h(0,b)},
w:function(a,b){this.aW().w(0,b)},
gl:function(a){var z=this.aW()
return z.gl(z)}},
fc:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fd:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fc(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
fX:{
"^":"a;a,b,c,d,e,f",
J:function(a){var z,y,x
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
static:{L:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.fX(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},aZ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},d2:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cC:{
"^":"w;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
f_:{
"^":"w;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{br:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.f_(a,y,z?null:b.receiver)}}},
fZ:{
"^":"w;a",
i:function(a){var z=this.a
return C.e.gH(z)?"Error":"Error: "+z}},
iz:{
"^":"c:2;a",
$1:function(a){if(!!J.k(a).$isw)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dg:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
il:{
"^":"c:0;a",
$0:function(){return this.a.$0()}},
im:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
io:{
"^":"c:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ip:{
"^":"c:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iq:{
"^":"c:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
c:{
"^":"a;",
i:function(a){return"Closure '"+H.cH(this)+"'"},
gct:function(){return this},
gct:function(){return this}},
cP:{
"^":"c;"},
fj:{
"^":"cP;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bj:{
"^":"cP;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bj))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gt:function(a){var z,y
z=this.c
if(z==null)y=H.X(this.a)
else y=typeof z!=="object"?J.A(z):H.X(z)
z=H.X(this.b)
if(typeof y!=="number")return y.eM()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.aW(z)},
static:{bk:function(a){return a.a},c8:function(a){return a.c},ek:function(){var z=$.ag
if(z==null){z=H.aM("self")
$.ag=z}return z},aM:function(a){var z,y,x,w,v
z=new H.bj("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
ff:{
"^":"w;a",
i:function(a){return"RuntimeError: "+this.a}},
cL:{
"^":"a;"},
fg:{
"^":"cL;a,b,c,d",
V:function(a){var z=this.df(a)
return z==null?!1:H.dx(z,this.aa())},
df:function(a){var z=J.k(a)
return"$signature" in z?z.$signature():null},
aa:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.k(y)
if(!!x.$isjE)z.void=true
else if(!x.$isch)z.ret=y.aa()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cK(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cK(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.du(y)
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
t=H.du(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].aa())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{cK:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aa())
return z}}},
ch:{
"^":"cL;",
i:function(a){return"dynamic"},
aa:function(){return}},
bn:{
"^":"a;a,L:b<"},
i4:{
"^":"c:5;a",
$2:function(a,b){H.dp(this.a,1).$1(new H.bn(a,b))}},
i1:{
"^":"c:2;a,b",
$1:function(a){this.b(this.a,a)}},
aA:{
"^":"a;a,b,c,d,e,f,r",
gl:function(a){return this.a},
gH:function(a){return this.a===0},
gc6:function(){return H.d(new H.f1(this),[H.C(this,0)])},
gcs:function(a){return H.aT(this.gc6(),new H.eZ(this),H.C(this,0),H.C(this,1))},
b8:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bA(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bA(y,a)}else return this.ek(a)},
ek:function(a){var z=this.d
if(z==null)return!1
return this.aj(this.M(z,this.ai(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.M(z,b)
return y==null?null:y.gY()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.M(x,b)
return y==null?null:y.gY()}else return this.el(b)},
el:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.M(z,this.ai(a))
x=this.aj(y,a)
if(x<0)return
return y[x].gY()},
v:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aZ()
this.b=z}this.bt(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aZ()
this.c=y}this.bt(y,b,c)}else this.en(b,c)},
en:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aZ()
this.d=z}y=this.ai(a)
x=this.M(z,y)
if(x==null)this.b0(z,y,[this.b_(a,b)])
else{w=this.aj(x,a)
if(w>=0)x[w].sY(b)
else x.push(this.b_(a,b))}},
al:function(a,b){if(typeof b==="string")return this.bO(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bO(this.c,b)
else return this.em(b)},
em:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.M(z,this.ai(a))
x=this.aj(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bW(w)
return w.gY()},
N:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
w:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.D(this))
z=z.c}},
bt:function(a,b,c){var z=this.M(a,b)
if(z==null)this.b0(a,b,this.b_(b,c))
else z.sY(c)},
bO:function(a,b){var z
if(a==null)return
z=this.M(a,b)
if(z==null)return
this.bW(z)
this.bB(a,b)
return z.gY()},
b_:function(a,b){var z,y
z=new H.f0(a,b,null,null)
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
ai:function(a){return J.A(a)&0x3ffffff},
aj:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a3(a[y].gc4(),b))return y
return-1},
i:function(a){return P.cw(this)},
M:function(a,b){return a[b]},
b0:function(a,b,c){a[b]=c},
bB:function(a,b){delete a[b]},
bA:function(a,b){return this.M(a,b)!=null},
aZ:function(){var z=Object.create(null)
this.b0(z,"<non-identifier-key>",z)
this.bB(z,"<non-identifier-key>")
return z},
$iseK:1},
eZ:{
"^":"c:2;a",
$1:function(a){return this.a.h(0,a)}},
f0:{
"^":"a;c4:a<,Y:b@,c,dv:d<"},
f1:{
"^":"G;a",
gl:function(a){return this.a.a},
gA:function(a){var z,y
z=this.a
y=new H.f2(z,z.r,null,null)
y.c=z.e
return y},
w:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.D(z))
y=y.c}},
$isp:1},
f2:{
"^":"a;a,b,c,d",
gu:function(){return this.d},
q:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ie:{
"^":"c:2;a",
$1:function(a){return this.a(a)}},
ig:{
"^":"c:8;a",
$2:function(a,b){return this.a(a,b)}},
ih:{
"^":"c:9;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bo:function(){return new P.ai("No element")},
eT:function(){return new P.ai("Too few elements")},
ft:function(a){return a.geR()},
aS:{
"^":"G;",
gA:function(a){return new H.ct(this,this.gl(this),0,null)},
w:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.X(0,y))
if(z!==this.gl(this))throw H.e(new P.D(this))}},
a9:function(a,b){return H.d(new H.bu(this,b),[null,null])},
bm:function(a,b){var z,y,x
if(b){z=H.d([],[H.E(this,"aS",0)])
C.c.sl(z,this.gl(this))}else z=H.d(Array(this.gl(this)),[H.E(this,"aS",0)])
for(y=0;y<this.gl(this);++y){x=this.X(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bl:function(a){return this.bm(a,!0)},
$isp:1},
ct:{
"^":"a;a,b,c,d",
gu:function(){return this.d},
q:function(){var z,y,x,w
z=this.a
y=J.J(z)
x=y.gl(z)
if(this.b!==x)throw H.e(new P.D(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.X(z,w);++this.c
return!0}},
cv:{
"^":"G;a,b",
gA:function(a){var z=new H.f5(null,J.bf(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gl:function(a){return J.as(this.a)},
$asG:function(a,b){return[b]},
static:{aT:function(a,b,c,d){if(!!J.k(a).$isp)return H.d(new H.ci(a,b),[c,d])
return H.d(new H.cv(a,b),[c,d])}}},
ci:{
"^":"cv;a,b",
$isp:1},
f5:{
"^":"eU;a,b,c",
q:function(){var z=this.b
if(z.q()){this.a=this.aV(z.gu())
return!0}this.a=null
return!1},
gu:function(){return this.a},
aV:function(a){return this.c.$1(a)}},
bu:{
"^":"aS;a,b",
gl:function(a){return J.as(this.a)},
X:function(a,b){return this.aV(J.dX(this.a,b))},
aV:function(a){return this.b.$1(a)},
$asaS:function(a,b){return[b]},
$asG:function(a,b){return[b]},
$isp:1},
ck:{
"^":"a;"}}],["","",,H,{
"^":"",
du:function(a){var z=H.d(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
h_:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.i5()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ap(new P.h1(z),1)).observe(y,{childList:true})
return new P.h0(z,y,x)}else if(self.setImmediate!=null)return P.i6()
return P.i7()},
jG:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ap(new P.h2(a),0))},"$1","i5",2,0,4],
jH:[function(a){++init.globalState.f.b
self.setImmediate(H.ap(new P.h3(a),0))},"$1","i6",2,0,4],
jI:[function(a){P.bB(C.f,a)},"$1","i7",2,0,4],
dj:function(a,b){var z=H.aG()
z=H.af(z,[z,z]).V(a)
if(z){b.toString
return a}else{b.toString
return a}},
eE:function(a,b,c){var z=new P.x(0,$.j,null)
z.$builtinTypeInfo=[c]
P.cR(a,new P.eF(b,z))
return z},
a6:function(a){return H.d(new P.da(H.d(new P.x(0,$.j,null),[a])),[a])},
hW:function(a,b,c){$.j.toString
a.G(b,c)},
hY:function(){var z,y
for(;z=$.ab,z!=null;){$.an=null
y=z.c
$.ab=y
if(y==null)$.am=null
$.j=z.b
z.dL()}},
jT:[function(){$.bN=!0
try{P.hY()}finally{$.j=C.b
$.an=null
$.bN=!1
if($.ab!=null)$.$get$bH().$1(P.ds())}},"$0","ds",0,0,1],
dn:function(a){if($.ab==null){$.am=a
$.ab=a
if(!$.bN)$.$get$bH().$1(P.ds())}else{$.am.c=a
$.am=a}},
dD:function(a){var z,y
z=$.j
if(C.b===z){P.ac(null,null,C.b,a)
return}z.toString
if(C.b.gb9()===z){P.ac(null,null,z,a)
return}y=$.j
P.ac(null,null,y,y.b2(a,!0))},
jx:function(a,b){var z,y,x
z=H.d(new P.dh(null,null,null,0),[b])
y=z.gdq()
x=z.gds()
z.a=a.Z(y,!0,z.gdr(),x)
return z},
i_:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.z(u)
z=t
y=H.v(u)
$.j.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.P(x)
w=t
v=x.gL()
c.$2(w,v)}}},
hR:function(a,b,c,d){var z=a.b4()
if(!!J.k(z).$isQ)z.bo(new P.hU(b,c,d))
else b.G(c,d)},
hS:function(a,b){return new P.hT(a,b)},
cR:function(a,b){var z=$.j
if(z===C.b){z.toString
return P.bB(a,b)}return P.bB(a,z.b2(b,!0))},
bB:function(a,b){var z=C.d.ae(a.a,1000)
return H.fw(z<0?0:z,b)},
bG:function(a){var z=$.j
$.j=a
return z},
aF:function(a,b,c,d,e){var z,y,x
z=new P.d9(new P.hZ(d,e),C.b,null)
y=$.ab
if(y==null){P.dn(z)
$.an=$.am}else{x=$.an
if(x==null){z.c=y
$.an=z
$.ab=z}else{z.c=x.c
x.c=z
$.an=z
if(z.c==null)$.am=z}}},
dk:function(a,b,c,d){var z,y
if($.j===c)return d.$0()
z=P.bG(c)
try{y=d.$0()
return y}finally{$.j=z}},
dm:function(a,b,c,d,e){var z,y
if($.j===c)return d.$1(e)
z=P.bG(c)
try{y=d.$1(e)
return y}finally{$.j=z}},
dl:function(a,b,c,d,e,f){var z,y
if($.j===c)return d.$2(e,f)
z=P.bG(c)
try{y=d.$2(e,f)
return y}finally{$.j=z}},
ac:function(a,b,c,d){var z=C.b!==c
if(z){d=c.b2(d,!(!z||C.b.gb9()===c))
c=C.b}P.dn(new P.d9(d,c,null))},
h1:{
"^":"c:2;a",
$1:function(a){var z,y
H.b8()
z=this.a
y=z.a
z.a=null
y.$0()}},
h0:{
"^":"c:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
h2:{
"^":"c:0;a",
$0:function(){H.b8()
this.a.$0()}},
h3:{
"^":"c:0;a",
$0:function(){H.b8()
this.a.$0()}},
hO:{
"^":"V;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{hP:function(a,b){if(b!=null)return b
if(!!J.k(a).$isw)return a.gL()
return}}},
Q:{
"^":"a;"},
eF:{
"^":"c:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a3(null)}catch(x){w=H.z(x)
z=w
y=H.v(x)
P.hW(this.b,z,y)}}},
h7:{
"^":"a;ec:a<",
c1:function(a,b){a=a!=null?a:new P.cD()
if(this.a.a!==0)throw H.e(new P.ai("Future already completed"))
$.j.toString
this.G(a,b)},
dT:function(a){return this.c1(a,null)}},
da:{
"^":"h7;a",
b6:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.ai("Future already completed"))
z.aO(b)},
G:function(a,b){this.a.d8(a,b)}},
aj:{
"^":"a;bI:a<,ex:b>,c,d,e",
ga5:function(){return this.b.b},
gc3:function(){return(this.c&1)!==0},
gei:function(){return this.c===6},
geh:function(){return this.c===8},
gdu:function(){return this.d},
gdD:function(){return this.d}},
x:{
"^":"a;at:a?,a5:b<,c",
gdl:function(){return this.a===8},
sdm:function(a){if(a)this.a=2
else this.a=0},
bk:function(a,b){var z,y
z=H.d(new P.x(0,$.j,null),[null])
y=z.b
if(y!==C.b){y.toString
if(b!=null)b=P.dj(b,y)}this.aL(new P.aj(null,z,b==null?1:3,a,b))
return z},
bo:function(a){var z,y
z=$.j
y=new P.x(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.b)z.toString
this.aL(new P.aj(null,y,8,a,null))
return y},
aY:function(){if(this.a!==0)throw H.e(new P.ai("Future already completed"))
this.a=1},
gdC:function(){return this.c},
gad:function(){return this.c},
bU:function(a){this.a=4
this.c=a},
bT:function(a){this.a=8
this.c=a},
dA:function(a,b){this.bT(new P.V(a,b))},
aL:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ac(null,null,z,new P.hi(this,a))}else{a.a=this.c
this.c=a}},
as:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbI()
z.a=y}return y},
a3:function(a){var z,y
z=J.k(a)
if(!!z.$isQ)if(!!z.$isx)P.b0(a,this)
else P.bJ(a,this)
else{y=this.as()
this.bU(a)
P.a1(this,y)}},
bz:function(a){var z=this.as()
this.bU(a)
P.a1(this,z)},
G:[function(a,b){var z=this.as()
this.bT(new P.V(a,b))
P.a1(this,z)},function(a){return this.G(a,null)},"eN","$2","$1","gaS",2,2,11,0],
aO:function(a){var z
if(a==null);else{z=J.k(a)
if(!!z.$isQ){if(!!z.$isx){z=a.a
if(z>=4&&z===8){this.aY()
z=this.b
z.toString
P.ac(null,null,z,new P.hk(this,a))}else P.b0(a,this)}else P.bJ(a,this)
return}}this.aY()
z=this.b
z.toString
P.ac(null,null,z,new P.hl(this,a))},
d8:function(a,b){var z
this.aY()
z=this.b
z.toString
P.ac(null,null,z,new P.hj(this,a,b))},
$isQ:1,
static:{bJ:function(a,b){var z,y,x,w
b.sat(2)
try{a.bk(new P.hm(b),new P.hn(b))}catch(x){w=H.z(x)
z=w
y=H.v(x)
P.dD(new P.ho(b,z,y))}},b0:function(a,b){var z
b.a=2
z=new P.aj(null,b,0,null,null)
if(a.a>=4)P.a1(a,z)
else a.aL(z)},a1:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdl()
if(b==null){if(w){v=z.a.gad()
y=z.a.ga5()
x=J.P(v)
u=v.gL()
y.toString
P.aF(null,null,y,x,u)}return}for(;b.gbI()!=null;b=t){t=b.a
b.a=null
P.a1(z.a,b)}x.a=!0
s=w?null:z.a.gdC()
x.b=s
x.c=!1
y=!w
if(!y||b.gc3()||b.c===8){r=b.ga5()
if(w){u=z.a.ga5()
u.toString
if(u==null?r!=null:u!==r){u=u.gb9()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gad()
y=z.a.ga5()
x=J.P(v)
u=v.gL()
y.toString
P.aF(null,null,y,x,u)
return}q=$.j
if(q==null?r!=null:q!==r)$.j=r
else q=null
if(y){if(b.gc3())x.a=new P.hq(x,b,s,r).$0()}else new P.hp(z,x,b,r).$0()
if(b.geh())new P.hr(z,x,w,b,r).$0()
if(q!=null)$.j=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.k(y).$isQ}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.x)if(p.a>=4){o.a=2
z.a=p
b=new P.aj(null,o,0,null,null)
y=p
continue}else P.b0(p,o)
else P.bJ(p,o)
return}}o=b.b
b=o.as()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hi:{
"^":"c:0;a,b",
$0:function(){P.a1(this.a,this.b)}},
hm:{
"^":"c:2;a",
$1:function(a){this.a.bz(a)}},
hn:{
"^":"c:6;a",
$2:function(a,b){this.a.G(a,b)},
$1:function(a){return this.$2(a,null)}},
ho:{
"^":"c:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
hk:{
"^":"c:0;a,b",
$0:function(){P.b0(this.b,this.a)}},
hl:{
"^":"c:0;a,b",
$0:function(){this.a.bz(this.b)}},
hj:{
"^":"c:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
hq:{
"^":"c:12;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aC(this.b.gdu(),this.c)
return!0}catch(x){w=H.z(x)
z=w
y=H.v(x)
this.a.b=new P.V(z,y)
return!1}}},
hp:{
"^":"c:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gad()
y=!0
r=this.c
if(r.gei()){x=r.d
try{y=this.d.aC(x,J.P(z))}catch(q){r=H.z(q)
w=r
v=H.v(q)
r=J.P(z)
p=w
o=(r==null?p==null:r===p)?z:new P.V(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aG()
p=H.af(p,[p,p]).V(r)
n=this.d
m=this.b
if(p)m.b=n.ey(u,J.P(z),z.gL())
else m.b=n.aC(u,J.P(z))}catch(q){r=H.z(q)
t=r
s=H.v(q)
r=J.P(z)
p=t
o=(r==null?p==null:r===p)?z:new P.V(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hr:{
"^":"c:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cm(this.d.gdD())
z.a=w
v=w}catch(u){z=H.z(u)
y=z
x=H.v(u)
if(this.c){z=J.P(this.a.a.gad())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gad()
else v.b=new P.V(y,x)
v.a=!1
return}if(!!J.k(v).$isQ){t=this.d
s=t.gex(t)
s.sdm(!0)
this.b.c=!0
v.bk(new P.hs(this.a,s),new P.ht(z,s))}}},
hs:{
"^":"c:2;a,b",
$1:function(a){P.a1(this.a.a,new P.aj(null,this.b,0,null,null))}},
ht:{
"^":"c:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.x)){y=H.d(new P.x(0,$.j,null),[null])
z.a=y
y.dA(a,b)}P.a1(z.a,new P.aj(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
d9:{
"^":"a;a,b,c",
dL:function(){return this.a.$0()}},
Z:{
"^":"a;",
a9:function(a,b){return H.d(new P.hD(b,this),[H.E(this,"Z",0),null])},
w:function(a,b){var z,y
z={}
y=H.d(new P.x(0,$.j,null),[null])
z.a=null
z.a=this.Z(new P.fn(z,this,b,y),!0,new P.fo(y),y.gaS())
return y},
gl:function(a){var z,y
z={}
y=H.d(new P.x(0,$.j,null),[P.o])
z.a=0
this.Z(new P.fp(z),!0,new P.fq(z,y),y.gaS())
return y},
bl:function(a){var z,y
z=H.d([],[H.E(this,"Z",0)])
y=H.d(new P.x(0,$.j,null),[[P.l,H.E(this,"Z",0)]])
this.Z(new P.fr(this,z),!0,new P.fs(z,y),y.gaS())
return y}},
fn:{
"^":"c;a,b,c,d",
$1:function(a){P.i_(new P.fl(this.c,a),new P.fm(),P.hS(this.a.a,this.d))},
$signature:function(){return H.b3(function(a){return{func:1,args:[a]}},this.b,"Z")}},
fl:{
"^":"c:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fm:{
"^":"c:2;",
$1:function(a){}},
fo:{
"^":"c:0;a",
$0:function(){this.a.a3(null)}},
fp:{
"^":"c:2;a",
$1:function(a){++this.a.a}},
fq:{
"^":"c:0;a,b",
$0:function(){this.b.a3(this.a.a)}},
fr:{
"^":"c;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b3(function(a){return{func:1,args:[a]}},this.a,"Z")}},
fs:{
"^":"c:0;a,b",
$0:function(){this.b.a3(this.a)}},
fk:{
"^":"a;"},
jM:{
"^":"a;"},
h4:{
"^":"a;a5:d<,at:e?",
bf:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c_()
if((z&4)===0&&(this.e&32)===0)this.bF(this.gbK())},
ak:function(a){return this.bf(a,null)},
cl:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gH(z)}else z=!1
if(z)this.r.aH(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bF(this.gbM())}}}},
b4:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aP()
return this.f},
aP:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c_()
if((this.e&32)===0)this.r=null
this.f=this.bJ()},
aN:["cV",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bQ(a)
else this.aM(new P.ha(a,null))}],
aK:["cW",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bS(a,b)
else this.aM(new P.hc(a,b,null))}],
d7:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bR()
else this.aM(C.l)},
bL:[function(){},"$0","gbK",0,0,1],
bN:[function(){},"$0","gbM",0,0,1],
bJ:function(){return},
aM:function(a){var z,y
z=this.r
if(z==null){z=new P.hN(null,null,0)
this.r=z}z.a6(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aH(this)}},
bQ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bj(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aQ((z&4)!==0)},
bS:function(a,b){var z,y
z=this.e
y=new P.h6(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aP()
z=this.f
if(!!J.k(z).$isQ)z.bo(y)
else y.$0()}else{y.$0()
this.aQ((z&4)!==0)}},
bR:function(){var z,y
z=new P.h5(this)
this.aP()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.k(y).$isQ)y.bo(z)
else z.$0()},
bF:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aQ((z&4)!==0)},
aQ:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gH(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gH(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bL()
else this.bN()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aH(this)},
d3:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dj(b,z)
this.c=c}},
h6:{
"^":"c:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aG()
x=H.af(x,[x,x]).V(y)
w=z.d
v=this.b
u=z.b
if(x)w.ez(u,v,this.c)
else w.bj(u,v)
z.e=(z.e&4294967263)>>>0}},
h5:{
"^":"c:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cn(z.c)
z.e=(z.e&4294967263)>>>0}},
dc:{
"^":"a;az:a@"},
ha:{
"^":"dc;b,a",
bg:function(a){a.bQ(this.b)}},
hc:{
"^":"dc;ag:b>,L:c<,a",
bg:function(a){a.bS(this.b,this.c)}},
hb:{
"^":"a;",
bg:function(a){a.bR()},
gaz:function(){return},
saz:function(a){throw H.e(new P.ai("No events after a done."))}},
hF:{
"^":"a;at:a?",
aH:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dD(new P.hG(this,a))
this.a=1},
c_:function(){if(this.a===1)this.a=3}},
hG:{
"^":"c:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.ee(this.b)}},
hN:{
"^":"hF;b,c,a",
gH:function(a){return this.c==null},
a6:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saz(b)
this.c=b}},
ee:function(a){var z,y
z=this.b
y=z.gaz()
this.b=y
if(y==null)this.c=null
z.bg(a)}},
dh:{
"^":"a;a,b,c,at:d?",
bv:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
eS:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a3(!0)
return}this.a.ak(0)
this.c=a
this.d=3},"$1","gdq",2,0,function(){return H.b3(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dh")}],
dt:[function(a,b){var z
if(this.d===2){z=this.c
this.bv(0)
z.G(a,b)
return}this.a.ak(0)
this.c=new P.V(a,b)
this.d=4},function(a){return this.dt(a,null)},"eU","$2","$1","gds",2,2,13,0],
eT:[function(){if(this.d===2){var z=this.c
this.bv(0)
z.a3(!1)
return}this.a.ak(0)
this.c=null
this.d=5},"$0","gdr",0,0,1]},
hU:{
"^":"c:0;a,b,c",
$0:function(){return this.a.G(this.b,this.c)}},
hT:{
"^":"c:5;a,b",
$2:function(a,b){return P.hR(this.a,this.b,a,b)}},
bI:{
"^":"Z;",
Z:function(a,b,c,d){return this.dd(a,d,c,!0===b)},
c9:function(a,b,c){return this.Z(a,null,b,c)},
dd:function(a,b,c,d){return P.hh(this,a,b,c,d,H.E(this,"bI",0),H.E(this,"bI",1))},
bG:function(a,b){b.aN(a)},
$asZ:function(a,b){return[b]}},
dd:{
"^":"h4;x,y,a,b,c,d,e,f,r",
aN:function(a){if((this.e&2)!==0)return
this.cV(a)},
aK:function(a,b){if((this.e&2)!==0)return
this.cW(a,b)},
bL:[function(){var z=this.y
if(z==null)return
z.ak(0)},"$0","gbK",0,0,1],
bN:[function(){var z=this.y
if(z==null)return
z.cl()},"$0","gbM",0,0,1],
bJ:function(){var z=this.y
if(z!=null){this.y=null
z.b4()}return},
eO:[function(a){this.x.bG(a,this)},"$1","gdh",2,0,function(){return H.b3(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dd")}],
eQ:[function(a,b){this.aK(a,b)},"$2","gdj",4,0,14],
eP:[function(){this.d7()},"$0","gdi",0,0,1],
d4:function(a,b,c,d,e,f,g){var z,y
z=this.gdh()
y=this.gdj()
this.y=this.x.a.c9(z,this.gdi(),y)},
static:{hh:function(a,b,c,d,e,f,g){var z=$.j
z=H.d(new P.dd(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.d3(b,c,d,e)
z.d4(a,b,c,d,e,f,g)
return z}}},
hD:{
"^":"bI;b,a",
bG:function(a,b){var z,y,x,w,v
z=null
try{z=this.dB(a)}catch(w){v=H.z(w)
y=v
x=H.v(w)
$.j.toString
b.aK(y,x)
return}b.aN(z)},
dB:function(a){return this.b.$1(a)}},
V:{
"^":"a;ag:a>,L:b<",
i:function(a){return H.b(this.a)},
$isw:1},
hQ:{
"^":"a;"},
hZ:{
"^":"c:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.hO(z,P.hP(z,this.b)))}},
hI:{
"^":"hQ;",
gb9:function(){return this},
cn:function(a){var z,y,x,w
try{if(C.b===$.j){x=a.$0()
return x}x=P.dk(null,null,this,a)
return x}catch(w){x=H.z(w)
z=x
y=H.v(w)
return P.aF(null,null,this,z,y)}},
bj:function(a,b){var z,y,x,w
try{if(C.b===$.j){x=a.$1(b)
return x}x=P.dm(null,null,this,a,b)
return x}catch(w){x=H.z(w)
z=x
y=H.v(w)
return P.aF(null,null,this,z,y)}},
ez:function(a,b,c){var z,y,x,w
try{if(C.b===$.j){x=a.$2(b,c)
return x}x=P.dl(null,null,this,a,b,c)
return x}catch(w){x=H.z(w)
z=x
y=H.v(w)
return P.aF(null,null,this,z,y)}},
b2:function(a,b){if(b)return new P.hJ(this,a)
else return new P.hK(this,a)},
dH:function(a,b){if(b)return new P.hL(this,a)
else return new P.hM(this,a)},
h:function(a,b){return},
cm:function(a){if($.j===C.b)return a.$0()
return P.dk(null,null,this,a)},
aC:function(a,b){if($.j===C.b)return a.$1(b)
return P.dm(null,null,this,a,b)},
ey:function(a,b,c){if($.j===C.b)return a.$2(b,c)
return P.dl(null,null,this,a,b,c)}},
hJ:{
"^":"c:0;a,b",
$0:function(){return this.a.cn(this.b)}},
hK:{
"^":"c:0;a,b",
$0:function(){return this.a.cm(this.b)}},
hL:{
"^":"c:2;a,b",
$1:function(a){return this.a.bj(this.b,a)}},
hM:{
"^":"c:2;a,b",
$1:function(a){return this.a.aC(this.b,a)}}}],["","",,P,{
"^":"",
cr:function(){return H.d(new H.aA(0,null,null,null,null,null,0),[null,null])},
a9:function(a){return H.dv(a,H.d(new H.aA(0,null,null,null,null,null,0),[null,null]))},
eS:function(a,b,c){var z,y
if(P.bO(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ao()
y.push(a)
try{P.hX(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.cN(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aP:function(a,b,c){var z,y,x
if(P.bO(a))return b+"..."+c
z=new P.bA(b)
y=$.$get$ao()
y.push(a)
try{x=z
x.a=P.cN(x.ga4(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga4()+c
y=z.ga4()
return y.charCodeAt(0)==0?y:y},
bO:function(a){var z,y
for(z=0;y=$.$get$ao(),z<y.length;++z)if(a===y[z])return!0
return!1},
hX:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.q())return
w=H.b(z.gu())
b.push(w)
y+=w.length+2;++x}if(!z.q()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gu();++x
if(!z.q()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gu();++x
for(;z.q();t=s,s=r){r=z.gu();++x
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
aR:function(a,b,c,d,e){return H.d(new H.aA(0,null,null,null,null,null,0),[d,e])},
a8:function(a,b){return P.hy(a,b)},
ah:function(a,b,c,d){return H.d(new P.hw(0,null,null,null,null,null,0),[d])},
cw:function(a){var z,y,x
z={}
if(P.bO(a))return"{...}"
y=new P.bA("")
try{$.$get$ao().push(a)
x=y
x.a=x.ga4()+"{"
z.a=!0
J.dY(a,new P.f6(z,y))
z=y
z.a=z.ga4()+"}"}finally{z=$.$get$ao()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga4()
return z.charCodeAt(0)==0?z:z},
hx:{
"^":"aA;a,b,c,d,e,f,r",
ai:function(a){return H.iu(a)&0x3ffffff},
aj:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gc4()
if(x==null?b==null:x===b)return y}return-1},
static:{hy:function(a,b){return H.d(new P.hx(0,null,null,null,null,null,0),[a,b])}}},
hw:{
"^":"hu;a,b,c,d,e,f,r",
gA:function(a){var z=new P.cs(this,this.r,null,null)
z.c=this.e
return z},
gl:function(a){return this.a},
dU:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dc(b)},
dc:function(a){var z=this.d
if(z==null)return!1
return this.ar(z[this.aq(a)],a)>=0},
ca:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dU(0,a)?a:null
else return this.dn(a)},
dn:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aq(a)]
x=this.ar(y,a)
if(x<0)return
return J.dI(y,x).gbC()},
w:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.D(this))
z=z.b}},
a6:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bL()
this.b=z}return this.bw(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bL()
this.c=y}return this.bw(y,b)}else return this.R(b)},
R:function(a){var z,y,x
z=this.d
if(z==null){z=P.bL()
this.d=z}y=this.aq(a)
x=z[y]
if(x==null)z[y]=[this.aR(a)]
else{if(this.ar(x,a)>=0)return!1
x.push(this.aR(a))}return!0},
al:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bx(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bx(this.c,b)
else return this.dw(b)},
dw:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aq(a)]
x=this.ar(y,a)
if(x<0)return!1
this.by(y.splice(x,1)[0])
return!0},
N:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bw:function(a,b){if(a[b]!=null)return!1
a[b]=this.aR(b)
return!0},
bx:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.by(z)
delete a[b]
return!0},
aR:function(a){var z,y
z=new P.f3(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
by:function(a){var z,y
z=a.gda()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aq:function(a){return J.A(a)&0x3ffffff},
ar:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a3(a[y].gbC(),b))return y
return-1},
$isp:1,
static:{bL:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f3:{
"^":"a;bC:a<,b,da:c<"},
cs:{
"^":"a;a,b,c,d",
gu:function(){return this.d},
q:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.D(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hu:{
"^":"fh;"},
cu:{
"^":"a;",
gA:function(a){return new H.ct(a,this.gl(a),0,null)},
X:function(a,b){return this.h(a,b)},
w:function(a,b){var z,y,x,w
z=this.gl(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.h(a,w)
b.$1(a[w])
if(x)throw H.e(new P.D(a))}},
a9:function(a,b){return H.d(new H.bu(a,b),[null,null])},
i:function(a){return P.aP(a,"[","]")},
$isl:1,
$asl:null,
$isp:1},
f6:{
"^":"c:15;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
f4:{
"^":"G;a,b,c,d",
gA:function(a){return new P.hz(this,this.c,this.d,this.b,null)},
w:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.y(new P.D(this))}},
gH:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
N:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aP(this,"{","}")},
ck:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bo());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
R:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bE();++this.d},
bE:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.d(z,[H.C(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.br(y,0,w,z,x)
C.c.br(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cY:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.d(z,[b])},
$isp:1,
static:{bs:function(a,b){var z=H.d(new P.f4(null,0,0,0),[b])
z.cY(a,b)
return z}}},
hz:{
"^":"a;a,b,c,d,e",
gu:function(){return this.e},
q:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.y(new P.D(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fi:{
"^":"a;",
a9:function(a,b){return H.d(new H.ci(this,b),[H.C(this,0),null])},
i:function(a){return P.aP(this,"{","}")},
w:function(a,b){var z
for(z=this.gA(this);z.q();)b.$1(z.d)},
$isp:1},
fh:{
"^":"fi;"}}],["","",,P,{
"^":"",
i0:function(a){return H.ft(a)},
bl:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.au(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eB(a)},
eB:function(a){var z=J.k(a)
if(!!z.$isc)return z.i(a)
return H.aW(a)},
aO:function(a){return new P.hg(a)},
bt:function(a,b,c){var z,y
z=H.d([],[c])
for(y=J.bf(a);y.q();)z.push(y.gu())
if(b)return z
z.fixed$length=Array
return z},
bY:function(a){var z=H.b(a)
H.dB(z)},
jn:{
"^":"c:16;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.i0(a)}},
bP:{
"^":"a;"},
"+bool":0,
cb:{
"^":"a;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.cb))return!1
return this.a===b.a&&this.b===b.b},
gt:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.ev(z?H.B(this).getUTCFullYear()+0:H.B(this).getFullYear()+0)
x=P.av(z?H.B(this).getUTCMonth()+1:H.B(this).getMonth()+1)
w=P.av(z?H.B(this).getUTCDate()+0:H.B(this).getDate()+0)
v=P.av(z?H.B(this).getUTCHours()+0:H.B(this).getHours()+0)
u=P.av(z?H.B(this).getUTCMinutes()+0:H.B(this).getMinutes()+0)
t=P.av(z?H.B(this).getUTCSeconds()+0:H.B(this).getSeconds()+0)
s=P.ew(H.cE(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
static:{ev:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},ew:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},av:function(a){if(a>=10)return""+a
return"0"+a}}},
bb:{
"^":"aI;"},
"+double":0,
aw:{
"^":"a;a",
m:function(a,b){return new P.aw(C.d.m(this.a,b.gde()))},
aF:function(a,b){return C.d.aF(this.a,b.gde())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.aw))return!1
return this.a===b.a},
gt:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eA()
y=this.a
if(y<0)return"-"+new P.aw(-y).i(0)
x=z.$1(C.d.bh(C.d.ae(y,6e7),60))
w=z.$1(C.d.bh(C.d.ae(y,1e6),60))
v=new P.ez().$1(C.d.bh(y,1e6))
return""+C.d.ae(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
ez:{
"^":"c:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eA:{
"^":"c:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
w:{
"^":"a;",
gL:function(){return H.v(this.$thrownJsError)}},
cD:{
"^":"w;",
i:function(a){return"Throw of null."}},
a4:{
"^":"w;a,b,c,d",
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
u=P.bl(this.b)
return w+v+": "+H.b(u)},
static:{aL:function(a){return new P.a4(!1,null,null,a)},ei:function(a,b,c){return new P.a4(!0,a,b,c)}}},
cI:{
"^":"a4;e,f,a,b,c,d",
gaU:function(){return"RangeError"},
gaT:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.eK()
if(typeof z!=="number")return H.O(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{aX:function(a,b,c){return new P.cI(null,null,!0,a,b,"Value not in range")},aB:function(a,b,c,d,e){return new P.cI(b,c,!0,a,d,"Invalid value")},cJ:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.aB(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.aB(b,a,c,"end",f))
return b}}},
eI:{
"^":"a4;e,l:f>,a,b,c,d",
gaU:function(){return"RangeError"},
gaT:function(){P.bl(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dH(this.b,0)?": index must not be negative":z},
static:{cm:function(a,b,c,d,e){var z=e!=null?e:J.as(b)
return new P.eI(b,z,!0,a,c,"Index out of range")}}},
I:{
"^":"w;a",
i:function(a){return"Unsupported operation: "+this.a}},
d7:{
"^":"w;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
ai:{
"^":"w;a",
i:function(a){return"Bad state: "+this.a}},
D:{
"^":"w;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bl(z))+"."}},
cM:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gL:function(){return},
$isw:1},
eu:{
"^":"w;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hg:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eC:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.aV(b,"expando$values")
return z==null?null:H.aV(z,this.bD())},
v:function(a,b,c){var z=H.aV(b,"expando$values")
if(z==null){z=new P.a()
H.bz(b,"expando$values",z)}H.bz(z,this.bD(),c)},
bD:function(){var z,y
z=H.aV(this,"expando$key")
if(z==null){y=$.cj
$.cj=y+1
z="expando$key$"+y
H.bz(this,"expando$key",z)}return z}},
eD:{
"^":"a;"},
o:{
"^":"aI;"},
"+int":0,
G:{
"^":"a;",
a9:function(a,b){return H.aT(this,b,H.E(this,"G",0),null)},
w:function(a,b){var z
for(z=this.gA(this);z.q();)b.$1(z.gu())},
bm:function(a,b){return P.bt(this,b,H.E(this,"G",0))},
bl:function(a){return this.bm(a,!0)},
gl:function(a){var z,y
z=this.gA(this)
for(y=0;z.q();)++y
return y},
X:function(a,b){var z,y,x
if(b<0)H.y(P.aB(b,0,null,"index",null))
for(z=this.gA(this),y=0;z.q();){x=z.gu()
if(b===y)return x;++y}throw H.e(P.cm(b,this,"index",null,y))},
i:function(a){return P.eS(this,"(",")")}},
eU:{
"^":"a;"},
l:{
"^":"a;",
$asl:null,
$isp:1},
"+List":0,
jo:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aI:{
"^":"a;"},
"+num":0,
a:{
"^":";",
n:function(a,b){return this===b},
gt:function(a){return H.X(this)},
i:function(a){return H.aW(this)}},
Y:{
"^":"a;"},
U:{
"^":"a;"},
"+String":0,
bA:{
"^":"a;a4:a<",
gl:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cN:function(a,b,c){var z=J.bf(b)
if(!z.q())return a
if(c.length===0){do a+=H.b(z.gu())
while(z.q())}else{a+=H.b(z.gu())
for(;z.q();)a=a+c+H.b(z.gu())}return a}}},
cO:{
"^":"a;"}}],["","",,W,{
"^":"",
et:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.t)},
a2:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
de:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
di:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.h9(a)
if(!!J.k(z).$isH)return z
return}else return a},
N:function(a){var z=$.j
if(z===C.b)return a
return z.dH(a,!0)},
t:{
"^":"ax;",
$ist:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iC:{
"^":"t;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
iE:{
"^":"t;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
iF:{
"^":"t;",
gbb:function(a){return H.d(new W.q(a,"error",!1),[null])},
gbc:function(a){return H.d(new W.q(a,"load",!1),[null])},
$isH:1,
$isf:1,
"%":"HTMLBodyElement"},
c9:{
"^":"t;j:height%,k:width%",
bp:function(a,b,c){return a.getContext(b,P.i8(c))},
cA:function(a,b,c,d,e,f,g){var z,y
z=P.a9(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bp(a,"webgl",z)
return y==null?this.bp(a,"experimental-webgl",z):y},
cz:function(a,b){return this.cA(a,!0,!0,!0,!0,!1,b)},
$isc9:1,
"%":"HTMLCanvasElement"},
iG:{
"^":"f;",
c8:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
iI:{
"^":"aU;l:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
iJ:{
"^":"eJ;l:length=",
bq:function(a,b){var z=this.dg(a,b)
return z!=null?z:""},
dg:function(a,b){if(W.et(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.ex()+b)},
gj:function(a){return a.height},
gk:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eJ:{
"^":"f+es;"},
es:{
"^":"a;",
gj:function(a){return this.bq(a,"height")},
gk:function(a){return this.bq(a,"width")}},
iK:{
"^":"aU;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
iL:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
ey:{
"^":"f;b3:bottom=,j:height=,I:left=,bi:right=,ab:top=,k:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gk(a))+" x "+H.b(this.gj(a))},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.k(b)
if(!z.$isT)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=this.gk(a)
x=z.gk(b)
if(y==null?x==null:y===x){y=this.gj(a)
z=z.gj(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.A(a.left)
y=J.A(a.top)
x=J.A(this.gk(a))
w=J.A(this.gj(a))
return W.de(W.a2(W.a2(W.a2(W.a2(0,z),y),x),w))},
gbn:function(a){return H.d(new P.S(a.left,a.top),[null])},
$isT:1,
$asT:I.b5,
"%":";DOMRectReadOnly"},
ax:{
"^":"aU;",
gD:function(a){return P.fb(C.a.aB(a.offsetLeft),C.a.aB(a.offsetTop),C.a.aB(a.offsetWidth),C.a.aB(a.offsetHeight),null)},
i:function(a){return a.localName},
cw:function(a){return a.getBoundingClientRect()},
gbb:function(a){return H.d(new W.q(a,"error",!1),[null])},
gbc:function(a){return H.d(new W.q(a,"load",!1),[null])},
gcc:function(a){return H.d(new W.q(a,"mousedown",!1),[null])},
gcd:function(a){return H.d(new W.q(a,"mouseenter",!1),[null])},
gce:function(a){return H.d(new W.q(a,"mouseleave",!1),[null])},
gcf:function(a){return H.d(new W.q(a,"mousemove",!1),[null])},
gcg:function(a){return H.d(new W.q(a,"mouseout",!1),[null])},
gci:function(a){return H.d(new W.q(a,"mouseover",!1),[null])},
gcj:function(a){return H.d(new W.q(a,"mouseup",!1),[null])},
$isax:1,
$isf:1,
$isH:1,
"%":";Element"},
iM:{
"^":"t;j:height%,P:src},k:width%",
"%":"HTMLEmbedElement"},
iN:{
"^":"bm;ag:error=",
"%":"ErrorEvent"},
bm:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
H:{
"^":"f;",
d6:function(a,b,c,d){return a.addEventListener(b,H.ap(c,1),d)},
dz:function(a,b,c,d){return a.removeEventListener(b,H.ap(c,1),d)},
$isH:1,
"%":"MediaStream;EventTarget"},
j5:{
"^":"t;l:length=",
"%":"HTMLFormElement"},
j6:{
"^":"t;j:height%,P:src},k:width%",
"%":"HTMLIFrameElement"},
cl:{
"^":"t;j:height%,P:src},k:width%",
b6:function(a,b){return a.complete.$1(b)},
$iscl:1,
"%":"HTMLImageElement"},
j8:{
"^":"t;j:height%,P:src},k:width%",
$isax:1,
$isf:1,
$isH:1,
"%":"HTMLInputElement"},
f7:{
"^":"t;ag:error=,P:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bv:{
"^":"fY;",
gD:function(a){var z,y
if(!!a.offsetX)return H.d(new P.S(a.offsetX,a.offsetY),[null])
else{if(!J.k(W.di(a.target)).$isax)throw H.e(new P.I("offsetX is only supported on elements"))
z=W.di(a.target)
y=H.d(new P.S(a.clientX,a.clientY),[null]).aJ(0,J.e6(J.e9(z)))
return H.d(new P.S(J.c6(y.a),J.c6(y.b)),[null])}},
$isbv:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jm:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aU:{
"^":"H;",
i:function(a){var z=a.nodeValue
return z==null?this.cS(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
jp:{
"^":"t;j:height%,k:width%",
"%":"HTMLObjectElement"},
js:{
"^":"t;P:src}",
"%":"HTMLScriptElement"},
ju:{
"^":"t;l:length=",
"%":"HTMLSelectElement"},
jv:{
"^":"t;P:src}",
"%":"HTMLSourceElement"},
jw:{
"^":"bm;ag:error=",
"%":"SpeechRecognitionError"},
jB:{
"^":"t;P:src}",
"%":"HTMLTrackElement"},
fY:{
"^":"bm;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
d8:{
"^":"f7;j:height%,k:width%",
$isd8:1,
"%":"HTMLVideoElement"},
jF:{
"^":"H;",
$isf:1,
$isH:1,
"%":"DOMWindow|Window"},
jJ:{
"^":"f;b3:bottom=,j:height=,I:left=,bi:right=,ab:top=,k:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.k(b)
if(!z.$isT)return!1
y=a.left
x=z.gI(b)
if(y==null?x==null:y===x){y=a.top
x=z.gab(b)
if(y==null?x==null:y===x){y=a.width
x=z.gk(b)
if(y==null?x==null:y===x){y=a.height
z=z.gj(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gt:function(a){var z,y,x,w
z=J.A(a.left)
y=J.A(a.top)
x=J.A(a.width)
w=J.A(a.height)
return W.de(W.a2(W.a2(W.a2(W.a2(0,z),y),x),w))},
gbn:function(a){return H.d(new P.S(a.left,a.top),[null])},
$isT:1,
$asT:I.b5,
"%":"ClientRect"},
jK:{
"^":"aU;",
$isf:1,
"%":"DocumentType"},
jL:{
"^":"ey;",
gj:function(a){return a.height},
gk:function(a){return a.width},
"%":"DOMRect"},
jO:{
"^":"t;",
$isH:1,
$isf:1,
"%":"HTMLFrameSetElement"},
hf:{
"^":"Z;",
Z:function(a,b,c,d){var z=new W.M(0,this.a,this.b,W.N(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.C()
return z},
c9:function(a,b,c){return this.Z(a,null,b,c)}},
q:{
"^":"hf;a,b,c"},
M:{
"^":"fk;a,b,c,d,e",
b4:function(){if(this.b==null)return
this.bX()
this.b=null
this.d=null
return},
bf:function(a,b){if(this.b==null)return;++this.a
this.bX()},
ak:function(a){return this.bf(a,null)},
cl:function(){if(this.b==null||this.a<=0)return;--this.a
this.C()},
C:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dJ(x,this.c,z,this.e)}},
bX:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dK(x,this.c,z,this.e)}}},
h8:{
"^":"a;a",
$isH:1,
$isf:1,
static:{h9:function(a){if(a===window)return a
else return new W.h8(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iA:{
"^":"a7;",
$isf:1,
"%":"SVGAElement"},
iB:{
"^":"fu;",
$isf:1,
"%":"SVGAltGlyphElement"},
iD:{
"^":"m;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
iO:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEBlendElement"},
iP:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEColorMatrixElement"},
iQ:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEComponentTransferElement"},
iR:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFECompositeElement"},
iS:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
iT:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
iU:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
iV:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEFloodElement"},
iW:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
iX:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEImageElement"},
iY:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEMergeElement"},
iZ:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEMorphologyElement"},
j_:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFEOffsetElement"},
j0:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFESpecularLightingElement"},
j1:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFETileElement"},
j2:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFETurbulenceElement"},
j3:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGFilterElement"},
j4:{
"^":"a7;j:height=,k:width=",
"%":"SVGForeignObjectElement"},
eH:{
"^":"a7;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
a7:{
"^":"m;",
$isf:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
j7:{
"^":"a7;j:height=,k:width=",
$isf:1,
"%":"SVGImageElement"},
jb:{
"^":"m;",
$isf:1,
"%":"SVGMarkerElement"},
jc:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGMaskElement"},
jq:{
"^":"m;j:height=,k:width=",
$isf:1,
"%":"SVGPatternElement"},
jr:{
"^":"eH;j:height=,k:width=",
"%":"SVGRectElement"},
jt:{
"^":"m;",
$isf:1,
"%":"SVGScriptElement"},
m:{
"^":"ax;",
gbb:function(a){return H.d(new W.q(a,"error",!1),[null])},
gbc:function(a){return H.d(new W.q(a,"load",!1),[null])},
gcc:function(a){return H.d(new W.q(a,"mousedown",!1),[null])},
gcd:function(a){return H.d(new W.q(a,"mouseenter",!1),[null])},
gce:function(a){return H.d(new W.q(a,"mouseleave",!1),[null])},
gcf:function(a){return H.d(new W.q(a,"mousemove",!1),[null])},
gcg:function(a){return H.d(new W.q(a,"mouseout",!1),[null])},
gci:function(a){return H.d(new W.q(a,"mouseover",!1),[null])},
gcj:function(a){return H.d(new W.q(a,"mouseup",!1),[null])},
$isH:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
jy:{
"^":"a7;j:height=,k:width=",
$isf:1,
"%":"SVGSVGElement"},
jz:{
"^":"m;",
$isf:1,
"%":"SVGSymbolElement"},
cQ:{
"^":"a7;",
"%":";SVGTextContentElement"},
jA:{
"^":"cQ;",
$isf:1,
"%":"SVGTextPathElement"},
fu:{
"^":"cQ;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
jC:{
"^":"a7;j:height=,k:width=",
$isf:1,
"%":"SVGUseElement"},
jD:{
"^":"m;",
$isf:1,
"%":"SVGViewElement"},
jN:{
"^":"m;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
jP:{
"^":"m;",
$isf:1,
"%":"SVGCursorElement"},
jQ:{
"^":"m;",
$isf:1,
"%":"SVGFEDropShadowElement"},
jR:{
"^":"m;",
$isf:1,
"%":"SVGGlyphRefElement"},
jS:{
"^":"m;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
fe:{
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
e8:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
e9:function(a,b){return a.enable(b)},
ea:function(a,b){return a.enableVertexAttribArray(b)},
cv:function(a,b,c){return a.getAttribLocation(b,c)},
cD:function(a,b,c){return a.getUniformLocation(b,c)},
c8:function(a,b){return a.lineWidth(b)},
cO:function(a,b,c,d){return a.stencilFunc(b,c,d)},
cP:function(a,b,c,d){return a.stencilOp(b,c,d)},
eB:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.ia(g))
return}z=J.k(g)
if(!!z.$iscl)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isc9)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isd8)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aL("Incorrect number or type of arguments"))},
eA:function(a,b,c,d,e,f,g){return this.eB(a,b,c,d,e,f,g,null,null,null)},
eC:function(a,b,c,d){return a.texParameteri(b,c,d)},
eF:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
eG:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
eH:function(a,b){return a.useProgram(b)},
eI:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iH:{
"^":"a;"}}],["","",,P,{
"^":"",
ak:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
df:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
S:{
"^":"a;B:a>,E:b>",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
n:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.S))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gt:function(a){var z,y
z=J.A(this.a)
y=J.A(this.b)
return P.df(P.ak(P.ak(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gB(b)
if(typeof z!=="number")return z.m()
x=C.a.m(z,x)
z=this.b
y=y.gE(b)
if(typeof z!=="number")return z.m()
y=new P.S(x,C.a.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aJ:function(a,b){var z,y,x,w
z=this.a
y=J.e8(b)
if(typeof z!=="number")return z.aJ()
if(typeof y!=="number")return H.O(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aJ()
if(typeof w!=="number")return H.O(w)
w=new P.S(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
hH:{
"^":"a;",
gbi:function(a){return this.gI(this)+this.c},
gb3:function(a){return this.gab(this)+this.d},
i:function(a){return"Rectangle ("+this.gI(this)+", "+this.b+") "+this.c+" x "+this.d},
n:function(a,b){var z,y
if(b==null)return!1
z=J.k(b)
if(!z.$isT)return!1
if(this.gI(this)===z.gI(b)){y=this.b
z=y===z.gab(b)&&this.a+this.c===z.gbi(b)&&y+this.d===z.gb3(b)}else z=!1
return z},
gt:function(a){var z=this.b
return P.df(P.ak(P.ak(P.ak(P.ak(0,this.gI(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbn:function(a){var z=new P.S(this.gI(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
T:{
"^":"hH;I:a>,ab:b>,k:c>,j:d>",
$asT:null,
static:{fb:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.d(new P.T(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
r:function(a){return a},
al:function(a){return a},
cx:{
"^":"f;",
$iscx:1,
"%":"ArrayBuffer"},
by:{
"^":"f;",
$isby:1,
"%":"DataView;ArrayBufferView;bw|cy|cA|bx|cz|cB|W"},
bw:{
"^":"by;",
gl:function(a){return a.length},
$isbq:1,
$isbp:1},
bx:{
"^":"cA;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
v:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
a[b]=c}},
cy:{
"^":"bw+cu;",
$isl:1,
$asl:function(){return[P.bb]},
$isp:1},
cA:{
"^":"cy+ck;"},
W:{
"^":"cB;",
v:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
a[b]=c},
$isl:1,
$asl:function(){return[P.o]},
$isp:1},
cz:{
"^":"bw+cu;",
$isl:1,
$asl:function(){return[P.o]},
$isp:1},
cB:{
"^":"cz+ck;"},
jd:{
"^":"bx;",
$isl:1,
$asl:function(){return[P.bb]},
$isp:1,
"%":"Float32Array"},
je:{
"^":"bx;",
$isl:1,
$asl:function(){return[P.bb]},
$isp:1,
"%":"Float64Array"},
jf:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isp:1,
"%":"Int16Array"},
jg:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isp:1,
"%":"Int32Array"},
jh:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isp:1,
"%":"Int8Array"},
ji:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isp:1,
"%":"Uint16Array"},
jj:{
"^":"W;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isp:1,
"%":"Uint32Array"},
jk:{
"^":"W;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isp:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jl:{
"^":"W;",
gl:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.u(a,b))
return a[b]},
$isl:1,
$asl:function(){return[P.o]},
$isp:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dB:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
el:{
"^":"fH;dy,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b,c,d",
aA:function(a,b){var z
this.cU(a,b)
z=this.dy
if(z!==0){this.z=this.z-3.141592653589793*((b-z)/1000)
this.cx=!0
this.x=200
this.cx=!0
this.y=150
this.cx=!0
this.Q=0.1
this.cx=!0
this.ch=0.1
this.cx=!0}this.dy=b},
static:{aN:function(a){var z=0,y=new P.a6(),x,w=2,v,u,t,s,r,q
function $async$aN(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=a
z=3
return H.n(s.ax("assets/chara.jpeg"),$async$aN,y)
case 3:u=c
s=E
s=s
r=Float64Array
q=H
t=new s.R(new r(q.r(16)))
s=t
s.O()
s=F
t=new s.el(0,u,null,null,0,0,0,1,1,!0,null,null,null,"none",null,t,!1)
s=t
s.b=[]
s=t
s.d1(u,null,null)
x=t
z=1
break
case 1:return H.n(x,0,y,null)
case 2:return H.n(v,1,y)}}return H.n(null,$async$aN,y,null)}}}}],["","",,P,{
"^":"",
i8:function(a){var z={}
a.w(0,new P.i9(z))
return z},
ia:function(a){return a},
cg:function(){var z=$.cf
if(z==null){z=J.bc(window.navigator.userAgent,"Opera",0)
$.cf=z}return z},
ex:function(){var z,y
z=$.cc
if(z!=null)return z
y=$.cd
if(y==null){y=J.bc(window.navigator.userAgent,"Firefox",0)
$.cd=y}if(y===!0)z="-moz-"
else{y=$.ce
if(y==null){y=P.cg()!==!0&&J.bc(window.navigator.userAgent,"Trident/",0)
$.ce=y}if(y===!0)z="-ms-"
else z=P.cg()===!0?"-o-":"-webkit-"}$.cc=z
return z},
i9:{
"^":"c:17;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
bW:[function(){var z=0,y=new P.a6(),x=1,w,v,u,t,s,r,q,p
function $async$bW(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=G
r=r
q=P
v=new r.fC(700,500,q.cr())
r=E
r=r
q=Float64Array
p=H
u=new r.R(new q(p.r(16)))
r=u
r.O()
r=F
t=new r.fD(400,300,1,1,1,0,0,null,"none",null,u,!1)
r=t
r.b=[]
r=t
q=F
r.ch=q.bC(255,238,238,255)
r=E
r=r
q=Float64Array
p=H
u=new r.R(new q(p.r(16)))
r=u
r.O()
r=G
s=new r.fP(null,!1,0,v,!1,!1,0,null,!1,!1,[u])
r=s
q=G
r.a=q.fL(400,600)
r=s
r.sS(t)
r=s
r.eE()
r=s
z=!r.b?2:3
break
case 2:r=s
r.b=!0
r=s
r.ap()
case 3:r=t
r=r
q=F
z=4
return H.n(q.aN(v),$async$bW,y)
case 4:r.au(b)
return H.n(null,0,y,null)
case 1:return H.n(w,1,y)}}return H.n(null,$async$bW,y,null)},"$0","dz",0,0,0]},1],["","",,F,{
"^":"",
fz:{
"^":"a;"},
cS:{
"^":"a;cb:c<",
au:function(a){var z=0,y=new P.a6(),x=1,w,v=this,u,t,s,r
function $async$au(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.d(new s.x(0,r.j,null),[null])
t=u
t.aO(null)
z=2
return H.n(u,$async$au,y)
case 2:t=v
t=t.b
t.push(a)
return H.n(null,0,y,null)
case 1:return H.n(w,1,y)}}return H.n(null,$async$au,y,null)},
c5:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.c_)(z),++x)z[x].c5(a)},
aA:function(a,b){},
cp:function(a,b){var z,y,x
this.b7()
this.aA(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.c_)(z),++x)z[x].cp(a,b)},
bd:function(a,b){},
be:["cT",function(a,b){var z,y,x,w,v,u
this.b7()
this.bd(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.c_)(z),++w){v=z[w]
u=v.gcb()
x.push(C.c.ga8(x).T(0,u))
b.aE()
v.be(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aE()}}],
cq:["a2",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.b7()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.a0(v.gcb())
u=v.cq(a,b,c,d,e)
a.a_()
if(u===!0)return u}t=a.cB().b5(0)
t.eo()
y=new E.a_(new Float64Array(H.r(3)))
y.aI(d,e,0)
s=t.T(0,y)
s.gB(s)
s.gE(s)
return!1}],
b7:function(){if(!this.d)this.d=!0}},
fB:{
"^":"a;",
ax:function(a){var z=0,y=new P.a6(),x,w=2,v,u=this,t,s,r,q
function $async$ax(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.b8(a)?3:4
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
return H.n(q.ay(a),$async$ax,y)
case 5:s.v(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.n(x,0,y,null)
case 2:return H.n(v,1,y)}}return H.n(null,$async$ax,y,null)}},
aC:{
"^":"a;a,b,K:c<,a7:d<"},
fG:{
"^":"a;a",
i:function(a){return C.u.h(0,this.a)}},
fF:{
"^":"a;a,b,c",
d0:function(a){if(this.a==null)this.a=F.bC(255,255,255,255)},
static:{bD:function(a){var z=new F.fF(a,C.j,1)
z.d0(a)
return z}}},
fA:{
"^":"a;a",
d_:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{bC:function(a,b,c,d){var z=new F.fA(0)
z.d_(a,b,c,d)
return z}}},
fE:{
"^":"a;"},
fD:{
"^":"cS;K:e<,a7:f<,r,x,y,z,Q,ch,a,b,c,d",
cq:function(a,b,c,d,e){a.a0(this.c)
this.a2(a,b,c,d,e)
a.a_()},
aA:function(a,b){var z,y,x,w
z=this.e
y=(a.gK()-a.ges(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.R(new Float64Array(H.r(16)))
y.O()
this.c=y
y.aD(0,this.z,this.Q,0)
y=this.c
z=this.y
y.aG(0,z,z,1)},
be:function(a,b){var z,y,x
z=new F.aC(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.c.ga8(x).T(0,y))
b.aE()
y=b.b
y.push(z)
b.av(a,z)
this.cT(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.av(a,C.c.ga8(y))
else{y=a.a
b.av(a,new F.aC(0,0,y.c,y.d))}if(0>=x.length)return H.h(x,0)
x.pop()
b.aE()},
bd:function(a,b){var z,y
z=new F.aC(0,0,this.e,this.f)
y=F.bD(null)
y.a=this.ch
b.av(a,z)
b.c2(a,z,y)}},
fH:{
"^":"cS;",
aA:["cU",function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.cx){this.c.O()
this.c.aD(0,this.x,this.y,0)
this.c.aG(0,this.Q,this.ch,1)
z=this.c
y=this.z
x=Math.cos(H.b2(y))
w=Math.sin(H.b2(y))
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
if(typeof o!=="number")return o.cE()
q=this.r
if(typeof q!=="number")return q.cE()
p.aD(0,-o,-q,0)}}],
bd:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.db
y=this.dx
J.bh(b.c,b.f)
x=J.bg(b.c,b.f,"a_tex")
w=J.bd(b.c)
J.ar(b.c,34962,w)
J.dO(b.c,34962,new Float32Array(H.al([0,0,0,1,1,0,1,1])),35044)
J.be(b.c,x)
J.bi(b.c,x,2,5126,!1,0,0)
v=this.e.cC(b.c)
J.dL(b.c,3553,v)
J.aJ(b.c,3553,10242,33071)
J.aJ(b.c,3553,10243,33071)
J.aJ(b.c,3553,10241,9728)
J.aJ(b.c,3553,10240,9728)
u=z.a
t=z.b
s=u+z.c
r=t+z.d
q=G.cU(b.c,[u,t,0,u,r,0,s,t,0,s,r,0])
J.ar(b.c,34962,q)
p=G.cV(b.c,[0,1,2,1,3,2])
J.ar(b.c,34963,p)
o=J.bg(b.c,b.f,"vp")
n=J.at(b.c,b.f,"u_mat")
J.eh(b.c,n,!1,new Float32Array(H.al(b.bZ().gp())))
J.bi(b.c,o,3,5126,!1,0,0)
m=J.at(b.c,b.f,"color")
z=b.c
y=y.a.a
J.eg(z,m,(y>>>16&255)/255,(y>>>8&255)/255,(y>>>0&255)/255,(y>>>24&255)/255)
J.be(b.c,o)
J.c2(b.c,4,6,5123,0)},
d1:function(a,b,c){var z
if(this.f==null){z=this.e.gK()
if(typeof z!=="number")return z.cu()
this.f=z/2}if(this.r==null){z=this.e.ga7()
if(typeof z!=="number")return z.cu()
this.r=z/2}z=this.e
this.cy=new F.aC(0,0,J.aK(z.gK()),J.aK(z.ga7()))
this.db=new F.aC(0,0,J.aK(z.gK()),J.aK(z.ga7()))
this.dx=F.bD(null)}},
fI:{
"^":"a;",
gS:function(){return this.c$},
sS:function(a){this.c$=a},
c7:function(a){if(!this.e$){this.c$.c5(this)
this.e$=!0}this.c$.cp(this,a)
this.er()},
a0:function(a){var z=this.f$
z.push(C.c.ga8(z).T(0,a))},
a_:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cB:function(){return C.c.ga8(this.f$)}}}],["","",,G,{
"^":"",
bE:function(a){var z=0,y=new P.a6(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
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
u=q.d(new p.da(o.d(new n.x(0,m.j,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.ee(t,a)
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
m=m.N(new l.fN(u,t))
l=r
p=new p.M(0,o,n,m,l.c)
o=H
q=q.d(p,[o.C(r,0)])
q.C()
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
m=m.N(new l.fO(a,u))
l=s
p=new p.M(0,o,n,m,l.c)
o=H
q=q.d(p,[o.C(s,0)])
q.C()
q=u
x=q.a
z=1
break
case 1:return H.n(x,0,y,null)
case 2:return H.n(v,1,y)}}return H.n(null,$async$bE,y,null)},
cT:function(a,b,c){var z,y,x
z=G.cW(a,35633,b)
y=G.cW(a,35632,c)
x=J.dU(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
cW:function(a,b,c){var z,y
z=J.dV(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
cU:function(a,b){var z=J.bd(a)
a.bindBuffer(34962,z)
a.bufferData(34962,new Float32Array(H.al(b)),35044)
a.bindBuffer(34962,null)
return z},
cV:function(a,b){var z=J.bd(a)
a.bindBuffer(34963,z)
a.bufferData(34963,new Uint16Array(H.al(b)),35044)
a.bindBuffer(34963,null)
return z},
fC:{
"^":"fB;k:b>,j:c>,a",
ay:function(a){var z=0,y=new P.a6(),x,w=2,v,u,t
function $async$ay(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.n(t.bE(a),$async$ay,y)
case 3:x=new u.fM(c,null)
z=1
break
case 1:return H.n(x,0,y,null)
case 2:return H.n(v,1,y)}}return H.n(null,$async$ay,y,null)}},
fM:{
"^":"fE;a,b",
gK:function(){return J.e7(this.a)},
ga7:function(){return J.dZ(this.a)},
cC:function(a){var z
if(this.b==null){z=J.i(a).e_(a)
this.b=z
a.bindTexture(3553,z)
C.w.eA(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
fP:{
"^":"f8;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gK:function(){return this.a.c},
ga7:function(){return this.a.d},
ges:function(a){return 0},
er:function(){this.e=!0},
ap:function(){var z=0,y=new P.a6(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i
function $async$ap(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:k=H
k=k
j=P
u=k.cE(new j.cb(Date.now(),!1))
k=v
t=k.a
k=E
k=k
j=Float64Array
i=H
s=new k.R(new j(i.r(16)))
k=s
k.O()
k=E
k=k
j=Float64Array
i=H
r=new k.R(new j(i.r(16)))
k=r
k.O()
k=G
q=new k.fJ(null,null,null,null,s,[r],[])
k=q
j=t
k.c=j.a
k=q
k.d=t
k=q
k.ej()
k=q
k.N(0)
p=0,o=0
case 2:k=v
if(!k.b){z=4
break}k=P
k=k
j=P
z=5
return H.n(k.eE(new j.aw(3e4),null,null),$async$ap,y)
case 5:n=Date.now()
m=n-u
t=u+m
k=v
k=k
j=C
j=j.d
k.c7(j.a1(t))
k=v
k=k
j=C
j=j.d
k.c7(j.a1(t))
p+=m
if(m<0);else ;++o
k=v
k.e=!0
z=p>40?6:7
break
case 6:k=q
k.N(0)
k=v
k=k.gS()
k.be(v,q)
k=v
k.e=!1
case 7:z=o>60?8:9
break
case 8:k=C
k=k.d
l="###fps  "+k.cX(p,o)
k=H
k.dB(l)
p=0
o=0
case 9:case 3:u=n
z=2
break
case 4:return H.n(null,0,y,null)
case 1:return H.n(w,1,y)}}return H.n(null,$async$ap,y,null)},
eE:function(){var z,y
z={}
z.a=!1
y=J.e_(this.a.b)
H.d(new W.M(0,y.a,y.b,W.N(new G.fQ(z,this)),y.c),[H.C(y,0)]).C()
y=J.e5(this.a.b)
H.d(new W.M(0,y.a,y.b,W.N(new G.fR(z,this)),y.c),[H.C(y,0)]).C()
y=J.e0(this.a.b)
H.d(new W.M(0,y.a,y.b,W.N(new G.fS(z)),y.c),[H.C(y,0)]).C()
y=J.e1(this.a.b)
H.d(new W.M(0,y.a,y.b,W.N(new G.fT(z,this)),y.c),[H.C(y,0)]).C()
y=J.e2(this.a.b)
H.d(new W.M(0,y.a,y.b,W.N(new G.fU(z,this)),y.c),[H.C(y,0)]).C()
y=J.e3(this.a.b)
H.d(new W.M(0,y.a,y.b,W.N(new G.fV(z,this)),y.c),[H.C(y,0)]).C()
y=J.e4(this.a.b)
H.d(new W.M(0,y.a,y.b,W.N(new G.fW(z)),y.c),[H.C(y,0)]).C()}},
f8:{
"^":"a+fI;"},
fQ:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gS()
x=J.i(a)
w=x.gD(a)
w=w.gB(w)
w.toString
x=x.gD(a)
x=x.gE(x)
x.toString
z.a0(y.c)
y.a2(z,0,"pointerdown",w,x)
z.a_()}},
fR:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gS()
w=J.i(a)
v=w.gD(a)
v=v.gB(v)
v.toString
w=w.gD(a)
w=w.gE(w)
w.toString
y.a0(x.c)
x.a2(y,0,"pointerup",v,w)
y.a_()
z.a=!1}}},
fS:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fT:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gS()
w=J.i(a)
v=w.gD(a)
v=v.gB(v)
v.toString
w=w.gD(a)
w=w.gE(w)
w.toString
y.a0(x.c)
x.a2(y,0,"pointercancel",v,w)
y.a_()
z.a=!1}}},
fU:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gS()
x=J.i(a)
w=x.gD(a)
w=w.gB(w)
w.toString
x=x.gD(a)
x=x.gE(x)
x.toString
z.a0(y.c)
y.a2(z,0,"pointermove",w,x)
z.a_()}}},
fV:{
"^":"c:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gS()
w=J.i(a)
v=w.gD(a)
v=v.gB(v)
v.toString
w=w.gD(a)
w=w.gE(w)
w.toString
y.a0(x.c)
x.a2(y,0,"pointercancel",v,w)
y.a_()
z.a=!1}}},
fW:{
"^":"c:3;a",
$1:function(a){if(this.a.a);}},
fK:{
"^":"a;a,b,c,j:d>",
d2:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.d.a1(b)
y=C.d.a1(a)
x=document.createElement("canvas",null)
J.ef(x,z)
J.ed(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.ea(this.b,!0)},
static:{fL:function(a,b){var z=new G.fK(null,null,null,null)
z.d2(a,b)
return z}}},
fJ:{
"^":"fz;c,d,e,f,r,a,b",
ej:function(){var z,y
z=C.c.aw(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.c.aw(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.cT(this.c,z,y)
z=C.c.aw(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.c.aw(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.cT(this.c,z,y)},
N:function(a){J.c3(this.c,2960)
J.dW(this.c,515)
J.dQ(this.c,0,0,0,1)
J.dR(this.c,1)
J.dS(this.c,0)
J.c3(this.c,3042)
switch(-1){case-1:J.dM(this.c,32774)
J.dN(this.c,770,771,770,32772)
break}J.dP(this.c,17664)},
bZ:function(){var z,y
this.r.O()
z=this.r.aD(0,-1,1,0)
this.r=z
y=this.d
y=z.aG(0,2/y.c,-2/y.d,1)
this.r=y
y=y.T(0,C.c.ga8(this.a))
this.r=y
return y},
c2:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b.a
y=b.b
x=z+b.c
w=y+b.d
v=[z,y,0,z,w,0,x,y,0,x,w,0]
u=c.a
t=c.c
J.bh(this.c,this.e)
s=G.cU(this.c,v)
J.ar(this.c,34962,s)
r=G.cV(this.c,[0,1,3,2])
J.ar(this.c,34963,r)
q=this.c
p=this.e
o=this.bZ()
q.uniformMatrix4fv(J.at(q,p,"u_mat"),!1,new Float32Array(H.al(o.gp())))
o=this.c
p=this.e
u=u.a
o.uniform4fv(J.at(o,p,"color"),new Float32Array(H.al([(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255])))
u=this.c
u.uniform1f(J.at(u,this.e,"u_point_size"),t)
n=J.bg(this.c,this.e,"vp")
J.bi(this.c,n,3,5126,!1,0,0)
J.be(this.c,n)
if(c.b===C.j)m=6
else{J.eb(this.c,t)
m=2}J.c2(this.c,m,v.length/3|0,5123,0)
J.bh(this.c,null)},
av:function(a,b){var z
J.c0(this.c,!1,!1,!1,!1)
J.c1(this.c,!1)
J.c5(this.c,7680,7681,7681)
J.c4(this.c,519,1,255)
z=F.bD(null)
z.a=F.bC(255,255,255,255)
this.c2(null,b,z)
J.c0(this.c,!0,!0,!0,!0)
J.c1(this.c,!0)
J.c5(this.c,7680,7680,7680)
J.c4(this.c,514,1,255)},
aE:function(){}},
fN:{
"^":"c:2;a,b",
$1:function(a){this.a.b6(0,this.b)}},
fO:{
"^":"c:2;a,b",
$1:function(a){this.b.dT("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
R:{
"^":"a;p:a<",
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
ge7:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
ao:function(a){var z,y,x
z=new Float64Array(H.r(4))
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
return new E.a0(z)},
b5:function(a){var z=new E.R(new Float64Array(H.r(16)))
z.ac(this)
return z},
T:function(a,b){var z,y,x
if(!!b.$isa0){z=new Float64Array(H.r(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a0(z)}if(!!b.$isa_){z=new Float64Array(H.r(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.a_(z)}if(4===b.ge7()){z=new Float64Array(H.r(16))
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
return new E.R(z)}throw H.e(P.aL(b))},
m:function(a,b){var z,y
z=new Float64Array(H.r(16))
y=this.a
z[0]=C.a.m(y[0],b.gp().h(0,0))
z[1]=C.a.m(y[1],b.gp().h(0,1))
z[2]=C.a.m(y[2],b.gp().h(0,2))
z[3]=C.a.m(y[3],b.gp().h(0,3))
z[4]=C.a.m(y[4],b.gp().h(0,4))
z[5]=C.a.m(y[5],b.gp().h(0,5))
z[6]=C.a.m(y[6],b.gp().h(0,6))
z[7]=C.a.m(y[7],b.gp().h(0,7))
z[8]=C.a.m(y[8],b.gp().h(0,8))
z[9]=C.a.m(y[9],b.gp().h(0,9))
z[10]=C.a.m(y[10],b.gp().h(0,10))
z[11]=C.a.m(y[11],b.gp().h(0,11))
z[12]=C.a.m(y[12],b.gp().h(0,12))
z[13]=C.a.m(y[13],b.gp().h(0,13))
z[14]=C.a.m(y[14],b.gp().h(0,14))
z[15]=C.a.m(y[15],b.gp().h(0,15))
return new E.R(z)},
aD:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.k(b)
y=!!z.$isa0
x=y?b.gK():1
if(!!z.$isa_||y){w=z.gB(b)
v=z.gE(b)
u=z.geJ(b)}else{u=d
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
aG:function(a,b,c,d){var z,y,x,w,v,u
z=J.k(b)
y=!!z.$isa0
x=y?b.gK():1
if(!!z.$isa_||y){w=z.gB(b)
v=z.gE(b)
u=z.geJ(b)}else{u=d
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
a_:{
"^":"a;p:a<",
aI:function(a,b,c){var z=this.a
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
m:function(a,b){var z,y,x,w
z=this.a
y=C.a.m(z[0],b.gp().h(0,0))
x=C.a.m(z[1],b.gp().h(0,1))
z=C.a.m(z[2],b.gp().h(0,2))
w=new E.a_(new Float64Array(H.r(3)))
w.aI(y,x,z)
return w},
T:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.O(b)
x=z[1]
z=z[2]
w=new E.a_(new Float64Array(H.r(3)))
w.aI(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gl:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.b2(y*y+x*x+z*z))},
b5:function(a){var z=new E.a_(new Float64Array(H.r(3)))
z.ac(this)
return z},
gB:function(a){return this.a[0]},
gE:function(a){return this.a[1]}},
a0:{
"^":"a;p:a<",
bs:function(a,b,c,d){var z=this.a
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
m:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.m(z[0],b.gp().h(0,0))
x=C.a.m(z[1],b.gp().h(0,1))
w=C.a.m(z[2],b.gp().h(0,2))
z=C.a.m(z[3],b.gp().h(0,3))
v=new E.a0(new Float64Array(H.r(4)))
v.bs(y,x,w,z)
return v},
T:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.O(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a0(new Float64Array(H.r(4)))
v.bs(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gl:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.b2(y*y+x*x+w*w+z*z))},
b5:function(a){var z=new E.a0(new Float64Array(H.r(4)))
z.ac(this)
return z},
gB:function(a){return this.a[0]},
gE:function(a){return this.a[1]},
gK:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.k=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cp.prototype
return J.eW.prototype}if(typeof a=="string")return J.aQ.prototype
if(a==null)return J.eX.prototype
if(typeof a=="boolean")return J.eV.prototype
if(a.constructor==Array)return J.ay.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b6(a)}
J.J=function(a){if(typeof a=="string")return J.aQ.prototype
if(a==null)return a
if(a.constructor==Array)return J.ay.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b6(a)}
J.aH=function(a){if(a==null)return a
if(a.constructor==Array)return J.ay.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b6(a)}
J.bR=function(a){if(typeof a=="number")return J.az.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bF.prototype
return a}
J.ib=function(a){if(typeof a=="number")return J.az.prototype
if(typeof a=="string")return J.aQ.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bF.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.b6(a)}
J.aq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ib(a).m(a,b)}
J.a3=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.k(a).n(a,b)}
J.dH=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bR(a).aF(a,b)}
J.dI=function(a,b){if(a.constructor==Array||typeof a=="string"||H.ir(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).h(a,b)}
J.dJ=function(a,b,c,d){return J.i(a).d6(a,b,c,d)}
J.dK=function(a,b,c,d){return J.i(a).dz(a,b,c,d)}
J.ar=function(a,b,c){return J.i(a).dF(a,b,c)}
J.dL=function(a,b,c){return J.i(a).dG(a,b,c)}
J.dM=function(a,b){return J.i(a).dI(a,b)}
J.dN=function(a,b,c,d,e){return J.i(a).dJ(a,b,c,d,e)}
J.dO=function(a,b,c,d){return J.i(a).dK(a,b,c,d)}
J.dP=function(a,b){return J.aH(a).dN(a,b)}
J.dQ=function(a,b,c,d,e){return J.i(a).dO(a,b,c,d,e)}
J.dR=function(a,b){return J.i(a).dP(a,b)}
J.dS=function(a,b){return J.i(a).dQ(a,b)}
J.c0=function(a,b,c,d,e){return J.i(a).dS(a,b,c,d,e)}
J.dT=function(a,b){return J.i(a).b6(a,b)}
J.bc=function(a,b,c){return J.J(a).dV(a,b,c)}
J.bd=function(a){return J.i(a).dX(a)}
J.dU=function(a){return J.i(a).dY(a)}
J.dV=function(a,b){return J.i(a).dZ(a,b)}
J.dW=function(a,b){return J.i(a).e0(a,b)}
J.c1=function(a,b){return J.i(a).e1(a,b)}
J.c2=function(a,b,c,d,e){return J.i(a).e8(a,b,c,d,e)}
J.dX=function(a,b){return J.aH(a).X(a,b)}
J.c3=function(a,b){return J.i(a).e9(a,b)}
J.be=function(a,b){return J.i(a).ea(a,b)}
J.dY=function(a,b){return J.aH(a).w(a,b)}
J.P=function(a){return J.i(a).gag(a)}
J.A=function(a){return J.k(a).gt(a)}
J.dZ=function(a){return J.i(a).gj(a)}
J.bf=function(a){return J.aH(a).gA(a)}
J.as=function(a){return J.J(a).gl(a)}
J.e_=function(a){return J.i(a).gcc(a)}
J.e0=function(a){return J.i(a).gcd(a)}
J.e1=function(a){return J.i(a).gce(a)}
J.e2=function(a){return J.i(a).gcf(a)}
J.e3=function(a){return J.i(a).gcg(a)}
J.e4=function(a){return J.i(a).gci(a)}
J.e5=function(a){return J.i(a).gcj(a)}
J.e6=function(a){return J.i(a).gbn(a)}
J.e7=function(a){return J.i(a).gk(a)}
J.e8=function(a){return J.i(a).gB(a)}
J.bg=function(a,b,c){return J.i(a).cv(a,b,c)}
J.e9=function(a){return J.i(a).cw(a)}
J.ea=function(a,b){return J.i(a).cz(a,b)}
J.at=function(a,b,c){return J.i(a).cD(a,b,c)}
J.eb=function(a,b){return J.i(a).c8(a,b)}
J.ec=function(a,b){return J.aH(a).a9(a,b)}
J.ed=function(a,b){return J.i(a).sj(a,b)}
J.ee=function(a,b){return J.i(a).sP(a,b)}
J.ef=function(a,b){return J.i(a).sk(a,b)}
J.c4=function(a,b,c,d){return J.i(a).cO(a,b,c,d)}
J.c5=function(a,b,c,d){return J.i(a).cP(a,b,c,d)}
J.aJ=function(a,b,c,d){return J.i(a).eC(a,b,c,d)}
J.aK=function(a){return J.bR(a).eD(a)}
J.c6=function(a){return J.bR(a).a1(a)}
J.au=function(a){return J.k(a).i(a)}
J.eg=function(a,b,c,d,e,f){return J.i(a).eF(a,b,c,d,e,f)}
J.eh=function(a,b,c,d){return J.i(a).eG(a,b,c,d)}
J.bh=function(a,b){return J.i(a).eH(a,b)}
J.bi=function(a,b,c,d,e,f,g){return J.i(a).eI(a,b,c,d,e,f,g)}
var $=I.p
C.c=J.ay.prototype
C.d=J.cp.prototype
C.a=J.az.prototype
C.e=J.aQ.prototype
C.v=J.f9.prototype
C.w=P.fe.prototype
C.x=J.bF.prototype
C.k=new H.ch()
C.l=new P.hb()
C.b=new P.hI()
C.f=new P.aw(0)
C.m=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.n=function(hooks) {
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

C.o=function(getTagFallback) {
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
C.p=function() {
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
C.q=function(hooks) {
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
C.r=function(hooks) {
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
C.t=function(_, letter) { return letter.toUpperCase(); }
C.u=new H.eG([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.j=new F.fG(0)
$.cF="$cachedFunction"
$.cG="$cachedInvocation"
$.K=0
$.ag=null
$.c7=null
$.bT=null
$.dq=null
$.dC=null
$.b4=null
$.b7=null
$.bU=null
$.ab=null
$.am=null
$.an=null
$.bN=!1
$.j=C.b
$.cj=0
$.cf=null
$.ce=null
$.cd=null
$.cc=null
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
I.$lazy(y,x,w)}})(["cn","$get$cn",function(){return H.eQ()},"co","$get$co",function(){return new P.eC(null)},"cX","$get$cX",function(){return H.L(H.aZ({toString:function(){return"$receiver$"}}))},"cY","$get$cY",function(){return H.L(H.aZ({$method$:null,toString:function(){return"$receiver$"}}))},"cZ","$get$cZ",function(){return H.L(H.aZ(null))},"d_","$get$d_",function(){return H.L(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d3","$get$d3",function(){return H.L(H.aZ(void 0))},"d4","$get$d4",function(){return H.L(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d1","$get$d1",function(){return H.L(H.d2(null))},"d0","$get$d0",function(){return H.L(function(){try{null.$method$}catch(z){return z.message}}())},"d6","$get$d6",function(){return H.L(H.d2(void 0))},"d5","$get$d5",function(){return H.L(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bH","$get$bH",function(){return P.h_()},"ao","$get$ao",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bv]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.Y]},{func:1,args:[,],opt:[,]},{func:1,ret:P.U,args:[P.o]},{func:1,args:[,P.U]},{func:1,args:[P.U]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.Y]},{func:1,ret:P.bP},{func:1,void:true,args:[P.a],opt:[P.Y]},{func:1,void:true,args:[,P.Y]},{func:1,args:[,,]},{func:1,args:[P.cO,,]},{func:1,args:[P.U,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iy(d||a)
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
Isolate.b5=a.b5
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dE(F.dz(),b)},[])
else (function(b){H.dE(F.dz(),b)})([])})})()