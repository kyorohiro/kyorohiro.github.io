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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.c_"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.c_"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.c_(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.dH=function(){}
var dart=[["","",,H,{
"^":"",
jJ:{
"^":"a;a"}}],["","",,J,{
"^":"",
o:function(a){return void 0},
bg:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bd:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.c2==null){H.iR()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.dk("Return interceptor for "+H.c(y(a,z))))}w=H.j_(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.A
else return C.B}return w},
h:{
"^":"a;",
t:function(a,b){return a===b},
gH:function(a){return H.a9(a)},
i:["dC",function(a){return H.b3(a)}],
"%":"Blob|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLProgram|WebGLShader|WebGLTexture|WebGLUniformLocation"},
fe:{
"^":"h;",
i:function(a){return String(a)},
gH:function(a){return a?519018:218159},
$isbZ:1},
ff:{
"^":"h;",
t:function(a,b){return null==b},
i:function(a){return"null"},
gH:function(a){return 0}},
cD:{
"^":"h;",
gH:function(a){return 0},
$isfg:1},
ft:{
"^":"cD;"},
bP:{
"^":"cD;",
i:function(a){return String(a)}},
aH:{
"^":"h;",
cu:function(a,b){if(!!a.immutable$list)throw H.e(new P.a_(b))},
ct:function(a,b){if(!!a.fixed$length)throw H.e(new P.a_(b))},
aq:function(a,b){var z
this.ct(a,"remove")
for(z=0;z<a.length;++z)if(J.a4(a[z],b)){a.splice(z,1)
return!0}return!1},
J:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.N(a))}},
aw:function(a,b){return H.f(new H.bB(a,b),[null,null])},
aZ:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.c(a[x])
if(x>=z)return H.b(y,x)
y[x]=w}return y.join(b)},
al:function(a,b){if(b<0||b>=a.length)return H.b(a,b)
return a[b]},
gC:function(a){if(a.length>0)return a[0]
throw H.e(H.bv())},
ga8:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bv())},
bN:function(a,b,c,d,e){var z,y,x
this.cu(a,"set range")
P.cV(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.e(H.fb())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.b(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.b(d,x)
a[b+y]=d[x]}},
du:function(a,b){var z,y,x,w
this.cu(a,"shuffle")
z=a.length
for(;z>1;){y=C.p.fg(z);--z
x=a.length
if(z>=x)return H.b(a,z)
w=a[z]
if(y<0||y>=x)return H.b(a,y)
this.v(a,z,a[y])
this.v(a,y,w)}},
dt:function(a){return this.du(a,null)},
aF:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a4(a[z],b))return!0
return!1},
i:function(a){return P.aX(a,"[","]")},
gK:function(a){return new J.et(a,a.length,0,null)},
gH:function(a){return H.a9(a)},
gk:function(a){return a.length},
sk:function(a,b){this.ct(a,"set length")
if(b<0)throw H.e(P.aK(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.F(a,b))
if(b>=a.length||b<0)throw H.e(H.F(a,b))
return a[b]},
v:function(a,b,c){if(!!a.immutable$list)H.H(new P.a_("indexed set"))
if(b>=a.length||b<0)throw H.e(H.F(a,b))
a[b]=c},
$isbw:1,
$isp:1,
$asp:null,
$isx:1,
static:{fd:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.e(P.aE("Length must be a non-negative integer: "+H.c(a)))
z=H.f(new Array(a),[b])
z.fixed$length=Array
return z}}},
jI:{
"^":"aH;"},
et:{
"^":"a;a,b,c,d",
gB:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.N(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aI:{
"^":"h;",
bB:function(a,b){return a%b},
a1:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.a_(""+a))},
P:function(a){return a},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gH:function(a){return a&0x1FFFFFFF},
j:function(a,b){if(typeof b!=="number")throw H.e(H.ao(b))
return a+b},
df:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
aC:function(a,b){return(a|0)===a?a/b|0:this.a1(a/b)},
cj:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
b6:function(a,b){if(typeof b!=="number")throw H.e(H.ao(b))
return a<b},
$isaR:1},
cC:{
"^":"aI;",
$isaR:1,
$isu:1},
cB:{
"^":"aI;",
$isaR:1},
aY:{
"^":"h;",
eD:function(a,b){if(b>=a.length)throw H.e(H.F(a,b))
return a.charCodeAt(b)},
j:function(a,b){if(typeof b!=="string")throw H.e(P.es(b,null,null))
return a+b},
dA:function(a,b,c){H.dE(b)
if(c==null)c=a.length
H.dE(c)
if(b<0)throw H.e(P.b4(b,null,null))
if(typeof c!=="number")return H.l(c)
if(b>c)throw H.e(P.b4(b,null,null))
if(c>a.length)throw H.e(P.b4(c,null,null))
return a.substring(b,c)},
dz:function(a,b){return this.dA(a,b,null)},
eG:function(a,b,c){if(c>a.length)throw H.e(P.aK(c,0,a.length,null,null))
return H.j5(a,b,c)},
gV:function(a){return a.length===0},
i:function(a){return a},
gH:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.F(a,b))
if(b>=a.length||b<0)throw H.e(H.F(a,b))
return a[b]},
$isbw:1,
$isO:1}}],["","",,H,{
"^":"",
aN:function(a,b){var z=a.aI(b)
if(!init.globalState.d.cy)init.globalState.f.aO()
return z},
bf:function(){--init.globalState.f.b},
dQ:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isp)throw H.e(P.aE("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.ia(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cz()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hM(P.bz(null,H.aM),0)
y.z=P.aZ(null,null,null,P.u,H.bU)
y.ch=P.aZ(null,null,null,P.u,null)
if(y.x===!0){x=new H.i9()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.f4,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.ib)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.aZ(null,null,null,P.u,H.b5)
w=P.ar(null,null,null,P.u)
v=new H.b5(0,null,!1)
u=new H.bU(y,x,w,init.createNewIsolate(),v,new H.af(H.bh()),new H.af(H.bh()),!1,!1,[],P.ar(null,null,null,null),null,null,!1,!0,P.ar(null,null,null,null))
w.au(0,0)
u.bS(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aP()
x=H.ap(y,[y]).ag(a)
if(x)u.aI(new H.j3(z,a))
else{y=H.ap(y,[y,y]).ag(a)
if(y)u.aI(new H.j4(z,a))
else u.aI(a)}init.globalState.f.aO()},
f8:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.f9()
return},
f9:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.a_("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.a_("Cannot extract URI from \""+H.c(z)+"\""))},
f4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.b8(!0,[]).aj(b.data)
y=J.V(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.b8(!0,[]).aj(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.b8(!0,[]).aj(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.aZ(null,null,null,P.u,H.b5)
p=P.ar(null,null,null,P.u)
o=new H.b5(0,null,!1)
n=new H.bU(y,q,p,init.createNewIsolate(),o,new H.af(H.bh()),new H.af(H.bh()),!1,!1,[],P.ar(null,null,null,null),null,null,!1,!0,P.ar(null,null,null,null))
p.au(0,0)
n.bS(0,o)
init.globalState.f.a.a6(new H.aM(n,new H.f5(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aO()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").ad(y.h(z,"msg"))
init.globalState.f.aO()
break
case"close":init.globalState.ch.aq(0,$.$get$cA().h(0,a))
a.terminate()
init.globalState.f.aO()
break
case"log":H.f3(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aj(["command","print","msg",z])
q=new H.ak(!0,P.ai(null,P.u)).S(q)
y.toString
self.postMessage(q)}else P.K(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
f3:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aj(["command","log","msg",a])
x=new H.ak(!0,P.ai(null,P.u)).S(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.I(w)
z=H.G(w)
throw H.e(P.aW(z))}},
f6:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cS=$.cS+("_"+y)
$.cT=$.cT+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.ad(["spawned",new H.ba(y,x),w,z.r])
x=new H.f7(a,b,c,d,z)
if(e===!0){z.cm(w,w)
init.globalState.f.a.a6(new H.aM(z,x,"start isolate"))}else x.$0()},
iv:function(a){return new H.b8(!0,[]).aj(new H.ak(!1,P.ai(null,P.u)).S(a))},
j3:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
j4:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ia:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{ib:function(a){var z=P.aj(["command","print","msg",a])
return new H.ak(!0,P.ai(null,P.u)).S(z)}}},
bU:{
"^":"a;a,b,c,fc:d<,eH:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cm:function(a,b){if(!this.f.t(0,a))return
if(this.Q.au(0,b)&&!this.y)this.y=!0
this.bp()},
fz:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.aq(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.b(z,0)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.b(v,w)
v[w]=x
if(w===y.c)y.c1();++y.d}this.y=!1}this.bp()},
en:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.b(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fw:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.t(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.H(new P.a_("removeRange"))
P.cV(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dr:function(a,b){if(!this.r.t(0,a))return
this.db=b},
f2:function(a,b,c){var z=J.o(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){a.ad(c)
return}z=this.cx
if(z==null){z=P.bz(null,null)
this.cx=z}z.a6(new H.i3(a,c))},
f0:function(a,b){var z
if(!this.r.t(0,a))return
z=J.o(b)
if(!z.t(b,0))z=z.t(b,1)&&!this.cy
else z=!0
if(z){this.bw()
return}z=this.cx
if(z==null){z=P.bz(null,null)
this.cx=z}z.a6(this.gfd())},
f3:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.K(a)
if(b!=null)P.K(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aD(a)
y[1]=b==null?null:J.aD(b)
for(x=new P.cF(z,z.r,null,null),x.c=z.e;x.u();)x.d.ad(y)},
aI:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.I(u)
w=t
v=H.G(u)
this.f3(w,v)
if(this.db===!0){this.bw()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfc()
if(this.cx!=null)for(;t=this.cx,!t.gV(t);)this.cx.cY().$0()}return y},
cL:function(a){return this.b.h(0,a)},
bS:function(a,b){var z=this.b
if(z.aY(a))throw H.e(P.aW("Registry: ports must be registered only once."))
z.v(0,a,b)},
bp:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.v(0,this.a,this)
else this.bw()},
bw:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a7(0)
for(z=this.b,y=z.gd7(z),y=y.gK(y);y.u();)y.gB().dY()
z.a7(0)
this.c.a7(0)
init.globalState.z.aq(0,this.a)
this.dx.a7(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.b(z,v)
w.ad(z[v])}this.ch=null}},"$0","gfd",0,0,1]},
i3:{
"^":"d:1;a,b",
$0:function(){this.a.ad(this.b)}},
hM:{
"^":"a;a,b",
eO:function(){var z=this.a
if(z.b===z.c)return
return z.cY()},
d2:function(){var z,y,x
z=this.eO()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aY(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gV(y)}else y=!1
else y=!1
else y=!1
if(y)H.H(P.aW("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gV(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aj(["command","close"])
x=new H.ak(!0,P.ai(null,P.u)).S(x)
y.toString
self.postMessage(x)}return!1}z.fs()
return!0},
cc:function(){if(self.window!=null)new H.hN(this).$0()
else for(;this.d2(););},
aO:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cc()
else try{this.cc()}catch(x){w=H.I(x)
z=w
y=H.G(x)
w=init.globalState.Q
v=P.aj(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.ak(!0,P.ai(null,P.u)).S(v)
w.toString
self.postMessage(v)}}},
hN:{
"^":"d:1;a",
$0:function(){if(!this.a.d2())return
P.bK(C.h,this)}},
aM:{
"^":"a;a,b,c",
fs:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aI(this.b)}},
i9:{
"^":"a;"},
f5:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.f6(this.a,this.b,this.c,this.d,this.e,this.f)}},
f7:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aP()
w=H.ap(x,[x,x]).ag(y)
if(w)y.$2(this.b,this.c)
else{x=H.ap(x,[x]).ag(y)
if(x)y.$1(this.b)
else y.$0()}}z.bp()}},
dp:{
"^":"a;"},
ba:{
"^":"dp;b,a",
ad:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gc4())return
x=H.iv(a)
if(z.geH()===y){y=J.V(x)
switch(y.h(x,0)){case"pause":z.cm(y.h(x,1),y.h(x,2))
break
case"resume":z.fz(y.h(x,1))
break
case"add-ondone":z.en(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fw(y.h(x,1))
break
case"set-errors-fatal":z.dr(y.h(x,1),y.h(x,2))
break
case"ping":z.f2(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.f0(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.au(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aq(0,y)
break}return}y=init.globalState.f
w="receive "+H.c(a)
y.a.a6(new H.aM(z,new H.id(this,x),w))},
t:function(a,b){if(b==null)return!1
return b instanceof H.ba&&J.a4(this.b,b.b)},
gH:function(a){return this.b.gbk()}},
id:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gc4())z.dU(this.b)}},
bW:{
"^":"dp;b,c,a",
ad:function(a){var z,y,x
z=P.aj(["command","message","port",this,"msg",a])
y=new H.ak(!0,P.ai(null,P.u)).S(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
t:function(a,b){if(b==null)return!1
return b instanceof H.bW&&J.a4(this.b,b.b)&&J.a4(this.a,b.a)&&J.a4(this.c,b.c)},
gH:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.ds()
y=this.a
if(typeof y!=="number")return y.ds()
x=this.c
if(typeof x!=="number")return H.l(x)
return(z<<16^y<<8^x)>>>0}},
b5:{
"^":"a;bk:a<,b,c4:c<",
dY:function(){this.c=!0
this.b=null},
dU:function(a){if(this.c)return
this.e7(a)},
e7:function(a){return this.b.$1(a)},
$isfG:1},
h2:{
"^":"a;a,b,c",
dN:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.a6(new H.aM(y,new H.h4(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ay(new H.h5(this,b),0),a)}else throw H.e(new P.a_("Timer greater than 0."))},
static:{h3:function(a,b){var z=new H.h2(!0,!1,null)
z.dN(a,b)
return z}}},
h4:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
h5:{
"^":"d:1;a,b",
$0:function(){this.a.c=null
H.bf()
this.b.$0()}},
af:{
"^":"a;bk:a<",
gH:function(a){var z=this.a
if(typeof z!=="number")return z.fO()
z=C.b.cj(z,0)^C.b.aC(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
t:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.af){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ak:{
"^":"a;a,b",
S:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.v(0,a,z.gk(z))
z=J.o(a)
if(!!z.$iscK)return["buffer",a]
if(!!z.$isbF)return["typed",a]
if(!!z.$isbw)return this.dl(a)
if(!!z.$isf2){x=this.gdi()
w=a.gcG()
w=H.b0(w,x,H.P(w,"T",0),null)
w=P.bA(w,!0,H.P(w,"T",0))
z=z.gd7(a)
z=H.b0(z,x,H.P(z,"T",0),null)
return["map",w,P.bA(z,!0,H.P(z,"T",0))]}if(!!z.$isfg)return this.dm(a)
if(!!z.$ish)this.d6(a)
if(!!z.$isfG)this.aQ(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isba)return this.dn(a)
if(!!z.$isbW)return this.dq(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aQ(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaf)return["capability",a.a]
if(!(a instanceof P.a))this.d6(a)
return["dart",init.classIdExtractor(a),this.dk(init.classFieldsExtractor(a))]},"$1","gdi",2,0,2],
aQ:function(a,b){throw H.e(new P.a_(H.c(b==null?"Can't transmit:":b)+" "+H.c(a)))},
d6:function(a){return this.aQ(a,null)},
dl:function(a){var z=this.dj(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aQ(a,"Can't serialize indexable: ")},
dj:function(a){var z,y,x
z=[]
C.a.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.S(a[y])
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
dk:function(a){var z
for(z=0;z<a.length;++z)C.a.v(a,z,this.S(a[z]))
return a},
dm:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aQ(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.S(a[z[x]])
if(x>=y.length)return H.b(y,x)
y[x]=w}return["js-object",z,y]},
dq:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dn:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbk()]
return["raw sendport",a]}},
b8:{
"^":"a;a,b",
aj:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aE("Bad serialized message: "+H.c(a)))
switch(C.a.gC(a)){case"ref":if(1>=a.length)return H.b(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.b(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=this.aG(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=this.aG(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return this.aG(x)
case"const":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=this.aG(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.eR(a)
case"sendport":return this.eS(a)
case"raw sendport":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.eQ(a)
case"function":if(1>=a.length)return H.b(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.b(a,1)
return new H.af(a[1])
case"dart":y=a.length
if(1>=y)return H.b(a,1)
w=a[1]
if(2>=y)return H.b(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aG(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.c(a))}},"$1","geP",2,0,2],
aG:function(a){var z,y,x
z=J.V(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.l(x)
if(!(y<x))break
z.v(a,y,this.aj(z.h(a,y)));++y}return a},
eR:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w=P.cE()
this.b.push(w)
y=J.el(y,this.geP()).bD(0)
for(z=J.V(y),v=J.V(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.b(y,u)
w.v(0,y[u],this.aj(v.h(x,u)))}return w},
eS:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
if(3>=z)return H.b(a,3)
w=a[3]
if(J.a4(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cL(w)
if(u==null)return
t=new H.ba(u,x)}else t=new H.bW(y,w,x)
this.b.push(t)
return t},
eQ:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.V(y)
v=J.V(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.l(t)
if(!(u<t))break
w[z.h(y,u)]=this.aj(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eB:function(){throw H.e(new P.a_("Cannot modify unmodifiable Map"))},
iM:function(a){return init.types[a]},
iZ:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.o(a).$isbx},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aD(a)
if(typeof z!=="string")throw H.e(H.ao(a))
return z},
a9:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cU:function(a){var z,y
z=C.l(J.o(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.j.eD(z,0)===36)z=C.j.dz(z,1)
return(z+H.dL(H.c0(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b3:function(a){return"Instance of '"+H.cU(a)+"'"},
L:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
bG:function(a){return a.b?H.L(a).getUTCMilliseconds()+0:H.L(a).getMilliseconds()+0},
b2:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ao(a))
return a[b]},
bH:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ao(a))
a[b]=c},
l:function(a){throw H.e(H.ao(a))},
b:function(a,b){if(a==null)J.aB(a)
throw H.e(H.F(a,b))},
F:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ae(!0,b,"index",null)
z=J.aB(a)
if(!(b<0)){if(typeof z!=="number")return H.l(z)
y=b>=z}else y=!0
if(y)return P.cy(b,a,"index",null,z)
return P.b4(b,"index",null)},
ao:function(a){return new P.ae(!0,a,null,null)},
q:function(a){return a},
dE:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.ao(a))
return a},
e:function(a){var z
if(a==null)a=new P.cQ()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dS})
z.name=""}else z.toString=H.dS
return z},
dS:function(){return J.aD(this.dartException)},
H:function(a){throw H.e(a)},
a2:function(a){throw H.e(new P.N(a))},
I:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.j7(a)
if(a==null)return
if(a instanceof H.bu)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.cj(x,16)&8191)===10)switch(w){case 438:return z.$1(H.by(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.cP(v,null))}}if(a instanceof TypeError){u=$.$get$d9()
t=$.$get$da()
s=$.$get$db()
r=$.$get$dc()
q=$.$get$dg()
p=$.$get$dh()
o=$.$get$de()
$.$get$dd()
n=$.$get$dj()
m=$.$get$di()
l=u.W(y)
if(l!=null)return z.$1(H.by(y,l))
else{l=t.W(y)
if(l!=null){l.method="call"
return z.$1(H.by(y,l))}else{l=s.W(y)
if(l==null){l=r.W(y)
if(l==null){l=q.W(y)
if(l==null){l=p.W(y)
if(l==null){l=o.W(y)
if(l==null){l=r.W(y)
if(l==null){l=n.W(y)
if(l==null){l=m.W(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cP(y,l==null?null:l.method))}}return z.$1(new H.hx(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cY()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ae(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cY()
return a},
G:function(a){var z
if(a instanceof H.bu)return a.b
if(a==null)return new H.ds(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ds(a,null)},
j1:function(a){if(a==null||typeof a!='object')return J.aS(a)
else return H.a9(a)},
dG:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.v(0,a[y],a[x])}return b},
iT:function(a,b,c,d,e,f,g){var z=J.o(c)
if(z.t(c,0))return H.aN(b,new H.iU(a))
else if(z.t(c,1))return H.aN(b,new H.iV(a,d))
else if(z.t(c,2))return H.aN(b,new H.iW(a,d,e))
else if(z.t(c,3))return H.aN(b,new H.iX(a,d,e,f))
else if(z.t(c,4))return H.aN(b,new H.iY(a,d,e,f,g))
else throw H.e(P.aW("Unsupported number of arguments for wrapped closure"))},
ay:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.iT)
a.$identity=z
return z},
ez:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isp){z.$reflectionInfo=c
x=H.fI(z).r}else x=c
w=d?Object.create(new H.fR().constructor.prototype):Object.create(new H.bp(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.X
$.X=J.az(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cg(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.iM(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.ce:H.bq
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cg(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ew:function(a,b,c,d){var z=H.bq
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cg:function(a,b,c){var z,y,x,w,v,u
if(c)return H.ey(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ew(y,!w,z,b)
if(y===0){w=$.aq
if(w==null){w=H.aU("self")
$.aq=w}w="return function(){return this."+H.c(w)+"."+H.c(z)+"();"
v=$.X
$.X=J.az(v,1)
return new Function(w+H.c(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aq
if(v==null){v=H.aU("self")
$.aq=v}v=w+H.c(v)+"."+H.c(z)+"("+u+");"
w=$.X
$.X=J.az(w,1)
return new Function(v+H.c(w)+"}")()},
ex:function(a,b,c,d){var z,y
z=H.bq
y=H.ce
switch(b?-1:a){case 0:throw H.e(new H.fJ("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ey:function(a,b){var z,y,x,w,v,u,t,s
z=H.eu()
y=$.cd
if(y==null){y=H.aU("receiver")
$.cd=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ex(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.X
$.X=J.az(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.X
$.X=J.az(u,1)
return new Function(y+H.c(u)+"}")()},
c_:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isp){c.fixed$length=Array
z=c}else z=c
return H.ez(a,b,z,!!d,e,f)},
j6:function(a){throw H.e(new P.eE("Cyclic initialization for static "+H.c(a)))},
ap:function(a,b,c){return new H.fK(a,b,c,null)},
aP:function(){return C.n},
bh:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
t:function(a,b,c){var z
if(b===0){J.e3(c,a)
return}else if(b===1){c.cw(H.I(a),H.G(a))
return}if(!!J.o(a).$isa6)z=a
else{z=H.f(new P.C(0,$.m,null),[null])
z.aA(a)}z.b5(H.dA(b,0),new H.iE(b))
return c.gf_()},
dA:function(a,b){return new H.iB(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
f:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
c0:function(a){if(a==null)return
return a.$builtinTypeInfo},
dJ:function(a,b){return H.dR(a["$as"+H.c(b)],H.c0(a))},
P:function(a,b,c){var z=H.dJ(a,b)
return z==null?null:z[c]},
M:function(a,b){var z=H.c0(a)
return z==null?null:z[b]},
c5:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dL(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.d.i(a)
else return},
dL:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bJ("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.c(H.c5(u,c))}return w?"":"<"+H.c(z)+">"},
dR:function(a,b){if(typeof a=="function"){a=H.c3(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.c3(a,null,b)}return b},
iD:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.Q(a[y],b[y]))return!1
return!0},
bb:function(a,b,c){return H.c3(a,b,H.dJ(b,c))},
Q:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dK(a,b)
if('func' in a)return b.builtin$cls==="eM"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.c5(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.c(H.c5(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.iD(H.dR(v,z),x)},
dC:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.Q(z,v)||H.Q(v,z)))return!1}return!0},
iC:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.Q(v,u)||H.Q(u,v)))return!1}return!0},
dK:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.Q(z,y)||H.Q(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dC(x,w,!1))return!1
if(!H.dC(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}}return H.iC(a.named,b.named)},
c3:function(a,b,c){return a.apply(b,c)},
ku:function(a){var z=$.c1
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
ks:function(a){return H.a9(a)},
kr:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
j_:function(a){var z,y,x,w,v,u
z=$.c1.$1(a)
y=$.bc[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.be[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dB.$2(a,z)
if(z!=null){y=$.bc[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.be[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c4(x)
$.bc[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.be[z]=x
return x}if(v==="-"){u=H.c4(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dN(a,x)
if(v==="*")throw H.e(new P.dk(z))
if(init.leafTags[z]===true){u=H.c4(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dN(a,x)},
dN:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bg(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c4:function(a){return J.bg(a,!1,null,!!a.$isbx)},
j0:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bg(z,!1,null,!!z.$isbx)
else return J.bg(z,c,null,null)},
iR:function(){if(!0===$.c2)return
$.c2=!0
H.iS()},
iS:function(){var z,y,x,w,v,u,t,s
$.bc=Object.create(null)
$.be=Object.create(null)
H.iN()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dO.$1(v)
if(u!=null){t=H.j0(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
iN:function(){var z,y,x,w,v,u,t
z=C.u()
z=H.an(C.q,H.an(C.w,H.an(C.m,H.an(C.m,H.an(C.v,H.an(C.r,H.an(C.t(C.l),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c1=new H.iO(v)
$.dB=new H.iP(u)
$.dO=new H.iQ(t)},
an:function(a,b){return a(b)||b},
j5:function(a,b,c){return a.indexOf(b,c)>=0},
eA:{
"^":"a;",
i:function(a){return P.cJ(this)},
v:function(a,b,c){return H.eB()}},
cw:{
"^":"eA;a",
bj:function(){var z=this.$map
if(z==null){z=new H.aJ(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dG(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.bj().h(0,b)},
J:function(a,b){this.bj().J(0,b)},
gk:function(a){var z=this.bj()
return z.gk(z)}},
fH:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fI:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fH(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hv:{
"^":"a;a,b,c,d,e,f",
W:function(a){var z,y,x
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
static:{Z:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hv(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},b6:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},df:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cP:{
"^":"J;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
fi:{
"^":"J;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.c(z)+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.c(z)+"' on '"+H.c(y)+"' ("+H.c(this.a)+")"},
static:{by:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fi(a,y,z?null:b.receiver)}}},
hx:{
"^":"J;a",
i:function(a){var z=this.a
return C.j.gV(z)?"Error":"Error: "+z}},
j7:{
"^":"d:2;a",
$1:function(a){if(!!J.o(a).$isJ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ds:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
iU:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
iV:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
iW:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
iX:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iY:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"a;",
i:function(a){return"Closure '"+H.cU(this)+"'"},
gd8:function(){return this},
gd8:function(){return this}},
d0:{
"^":"d;"},
fR:{
"^":"d0;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bp:{
"^":"d0;a,b,c,d",
t:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bp))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gH:function(a){var z,y
z=this.c
if(z==null)y=H.a9(this.a)
else y=typeof z!=="object"?J.aS(z):H.a9(z)
z=H.a9(this.b)
if(typeof y!=="number")return y.fP()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.b3(z)},
static:{bq:function(a){return a.a},ce:function(a){return a.c},eu:function(){var z=$.aq
if(z==null){z=H.aU("self")
$.aq=z}return z},aU:function(a){var z,y,x,w,v
z=new H.bp("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fJ:{
"^":"J;a",
i:function(a){return"RuntimeError: "+this.a}},
cX:{
"^":"a;"},
fK:{
"^":"cX;a,b,c,d",
ag:function(a){var z=this.e2(a)
return z==null?!1:H.dK(z,this.ax())},
e2:function(a){var z=J.o(a)
return"$signature" in z?z.$signature():null},
ax:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.o(y)
if(!!x.$iskd)z.void=true
else if(!x.$iscm)z.ret=y.ax()
y=this.b
if(y!=null&&y.length!==0)z.args=H.cW(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.cW(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dF(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ax()}z.named=w}return z},
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
t=H.dF(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.c(z[s].ax())+" "+s}x+="}"}}return x+(") -> "+H.c(this.a))},
static:{cW:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ax())
return z}}},
cm:{
"^":"cX;",
i:function(a){return"dynamic"},
ax:function(){return}},
bu:{
"^":"a;a,Y:b<"},
iE:{
"^":"d:7;a",
$2:function(a,b){H.dA(this.a,1).$1(new H.bu(a,b))}},
iB:{
"^":"d:2;a,b",
$1:function(a){this.b(this.a,a)}},
aJ:{
"^":"a;a,b,c,d,e,f,r",
gk:function(a){return this.a},
gV:function(a){return this.a===0},
gcG:function(){return H.f(new H.fk(this),[H.M(this,0)])},
gd7:function(a){return H.b0(this.gcG(),new H.fh(this),H.M(this,0),H.M(this,1))},
aY:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bY(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bY(y,a)}else return this.f7(a)},
f7:function(a){var z=this.d
if(z==null)return!1
return this.aK(this.a_(z,this.aJ(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a_(z,b)
return y==null?null:y.gam()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.a_(x,b)
return y==null?null:y.gam()}else return this.f8(b)},
f8:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a_(z,this.aJ(a))
x=this.aK(y,a)
if(x<0)return
return y[x].gam()},
v:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bm()
this.b=z}this.bR(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bm()
this.c=y}this.bR(y,b,c)}else this.fa(b,c)},
fa:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bm()
this.d=z}y=this.aJ(a)
x=this.a_(z,y)
if(x==null)this.bo(z,y,[this.bn(a,b)])
else{w=this.aK(x,a)
if(w>=0)x[w].sam(b)
else x.push(this.bn(a,b))}},
aq:function(a,b){if(typeof b==="string")return this.cb(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cb(this.c,b)
else return this.f9(b)},
f9:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a_(z,this.aJ(a))
x=this.aK(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.ck(w)
return w.gam()},
a7:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
J:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.N(this))
z=z.c}},
bR:function(a,b,c){var z=this.a_(a,b)
if(z==null)this.bo(a,b,this.bn(b,c))
else z.sam(c)},
cb:function(a,b){var z
if(a==null)return
z=this.a_(a,b)
if(z==null)return
this.ck(z)
this.bZ(a,b)
return z.gam()},
bn:function(a,b){var z,y
z=new H.fj(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ck:function(a){var z,y
z=a.geg()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aJ:function(a){return J.aS(a)&0x3ffffff},
aK:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gcD(),b))return y
return-1},
i:function(a){return P.cJ(this)},
a_:function(a,b){return a[b]},
bo:function(a,b,c){a[b]=c},
bZ:function(a,b){delete a[b]},
bY:function(a,b){return this.a_(a,b)!=null},
bm:function(){var z=Object.create(null)
this.bo(z,"<non-identifier-key>",z)
this.bZ(z,"<non-identifier-key>")
return z},
$isf2:1},
fh:{
"^":"d:2;a",
$1:function(a){return this.a.h(0,a)}},
fj:{
"^":"a;cD:a<,am:b@,c,eg:d<"},
fk:{
"^":"T;a",
gk:function(a){return this.a.a},
gK:function(a){var z,y
z=this.a
y=new H.fl(z,z.r,null,null)
y.c=z.e
return y},
J:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.N(z))
y=y.c}},
$isx:1},
fl:{
"^":"a;a,b,c,d",
gB:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
iO:{
"^":"d:2;a",
$1:function(a){return this.a(a)}},
iP:{
"^":"d:10;a",
$2:function(a,b){return this.a(a,b)}},
iQ:{
"^":"d:11;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bv:function(){return new P.as("No element")},
fb:function(){return new P.as("Too few elements")},
h0:function(a){return a.gfU()},
b_:{
"^":"T;",
gK:function(a){return new H.cG(this,this.gk(this),0,null)},
J:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.al(0,y))
if(z!==this.gk(this))throw H.e(new P.N(this))}},
aw:function(a,b){return H.f(new H.bB(this,b),[null,null])},
bE:function(a,b){var z,y,x
if(b){z=H.f([],[H.P(this,"b_",0)])
C.a.sk(z,this.gk(this))}else z=H.f(Array(this.gk(this)),[H.P(this,"b_",0)])
for(y=0;y<this.gk(this);++y){x=this.al(0,y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
bD:function(a){return this.bE(a,!0)},
$isx:1},
cG:{
"^":"a;a,b,c,d",
gB:function(){return this.d},
u:function(){var z,y,x,w
z=this.a
y=J.V(z)
x=y.gk(z)
if(this.b!==x)throw H.e(new P.N(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.al(z,w);++this.c
return!0}},
cI:{
"^":"T;a,b",
gK:function(a){var z=new H.fp(null,J.bl(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gk:function(a){return J.aB(this.a)},
$asT:function(a,b){return[b]},
static:{b0:function(a,b,c,d){if(!!J.o(a).$isx)return H.f(new H.cn(a,b),[c,d])
return H.f(new H.cI(a,b),[c,d])}}},
cn:{
"^":"cI;a,b",
$isx:1},
fp:{
"^":"fc;a,b,c",
u:function(){var z=this.b
if(z.u()){this.a=this.bi(z.gB())
return!0}this.a=null
return!1},
gB:function(){return this.a},
bi:function(a){return this.c.$1(a)}},
bB:{
"^":"b_;a,b",
gk:function(a){return J.aB(this.a)},
al:function(a,b){return this.bi(J.e8(this.a,b))},
bi:function(a){return this.b.$1(a)},
$asb_:function(a,b){return[b]},
$asT:function(a,b){return[b]},
$isx:1},
cr:{
"^":"a;"}}],["","",,H,{
"^":"",
dF:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
hA:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iF()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ay(new P.hC(z),1)).observe(y,{childList:true})
return new P.hB(z,y,x)}else if(self.setImmediate!=null)return P.iG()
return P.iH()},
kf:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ay(new P.hD(a),0))},"$1","iF",2,0,6],
kg:[function(a){++init.globalState.f.b
self.setImmediate(H.ay(new P.hE(a),0))},"$1","iG",2,0,6],
kh:[function(a){P.bL(C.h,a)},"$1","iH",2,0,6],
dv:function(a,b){var z=H.aP()
z=H.ap(z,[z,z]).ag(a)
if(z){b.toString
return a}else{b.toString
return a}},
eN:function(a,b){var z=H.f(new P.C(0,$.m,null),[b])
P.bK(C.h,new P.eQ(a,z))
return z},
eO:function(a,b,c){var z=new P.C(0,$.m,null)
z.$builtinTypeInfo=[c]
P.bK(a,new P.eP(b,z))
return z},
ag:function(a){return H.f(new P.dn(H.f(new P.C(0,$.m,null),[a])),[a])},
du:function(a,b,c){$.m.toString
a.T(b,c)},
ix:function(){var z,y
for(;z=$.al,z!=null;){$.aw=null
y=z.c
$.al=y
if(y==null)$.av=null
$.m=z.b
z.ex()}},
kq:[function(){$.bX=!0
try{P.ix()}finally{$.m=C.c
$.aw=null
$.bX=!1
if($.al!=null)$.$get$bR().$1(P.dD())}},"$0","dD",0,0,1],
dz:function(a){if($.al==null){$.av=a
$.al=a
if(!$.bX)$.$get$bR().$1(P.dD())}else{$.av.c=a
$.av=a}},
dP:function(a){var z,y
z=$.m
if(C.c===z){P.am(null,null,C.c,a)
return}z.toString
if(C.c.gbv()===z){P.am(null,null,z,a)
return}y=$.m
P.am(null,null,y,y.bq(a,!0))},
k6:function(a,b){var z,y,x
z=H.f(new P.dt(null,null,null,0),[b])
y=z.geb()
x=z.ged()
z.a=a.an(y,!0,z.gec(),x)
return z},
iz:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.I(u)
z=t
y=H.G(u)
$.m.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.a5(x)
w=t
v=x.gY()
c.$2(w,v)}}},
ir:function(a,b,c,d){var z=a.bs()
if(!!J.o(z).$isa6)z.bG(new P.iu(b,c,d))
else b.T(c,d)},
is:function(a,b){return new P.it(a,b)},
bK:function(a,b){var z=$.m
if(z===C.c){z.toString
return P.bL(a,b)}return P.bL(a,z.bq(b,!0))},
bL:function(a,b){var z=C.d.aC(a.a,1000)
return H.h3(z<0?0:z,b)},
bQ:function(a){var z=$.m
$.m=a
return z},
aO:function(a,b,c,d,e){var z,y,x
z=new P.dm(new P.iy(d,e),C.c,null)
y=$.al
if(y==null){P.dz(z)
$.aw=$.av}else{x=$.aw
if(x==null){z.c=y
$.aw=z
$.al=z}else{z.c=x.c
x.c=z
$.aw=z
if(z.c==null)$.av=z}}},
dw:function(a,b,c,d){var z,y
if($.m===c)return d.$0()
z=P.bQ(c)
try{y=d.$0()
return y}finally{$.m=z}},
dy:function(a,b,c,d,e){var z,y
if($.m===c)return d.$1(e)
z=P.bQ(c)
try{y=d.$1(e)
return y}finally{$.m=z}},
dx:function(a,b,c,d,e,f){var z,y
if($.m===c)return d.$2(e,f)
z=P.bQ(c)
try{y=d.$2(e,f)
return y}finally{$.m=z}},
am:function(a,b,c,d){var z=C.c!==c
if(z){d=c.bq(d,!(!z||C.c.gbv()===c))
c=C.c}P.dz(new P.dm(d,c,null))},
hC:{
"^":"d:2;a",
$1:function(a){var z,y
H.bf()
z=this.a
y=z.a
z.a=null
y.$0()}},
hB:{
"^":"d:12;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hD:{
"^":"d:0;a",
$0:function(){H.bf()
this.a.$0()}},
hE:{
"^":"d:0;a",
$0:function(){H.bf()
this.a.$0()}},
io:{
"^":"a7;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.c(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.c(y)):z},
static:{ip:function(a,b){if(b!=null)return b
if(!!J.o(a).$isJ)return a.gY()
return}}},
a6:{
"^":"a;"},
eQ:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.af(this.a.$0())}catch(x){w=H.I(x)
z=w
y=H.G(x)
P.du(this.b,z,y)}}},
eP:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.af(null)}catch(x){w=H.I(x)
z=w
y=H.G(x)
P.du(this.b,z,y)}}},
hI:{
"^":"a;f_:a<",
cw:function(a,b){a=a!=null?a:new P.cQ()
if(this.a.a!==0)throw H.e(new P.as("Future already completed"))
$.m.toString
this.T(a,b)},
eF:function(a){return this.cw(a,null)}},
dn:{
"^":"hI;a",
bt:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.as("Future already completed"))
z.aA(b)},
T:function(a,b){this.a.dX(a,b)}},
at:{
"^":"a;c5:a<,fA:b>,c,d,e",
gat:function(){return this.b.b},
gcC:function(){return(this.c&1)!==0},
gf5:function(){return this.c===6},
gf4:function(){return this.c===8},
gef:function(){return this.d},
gem:function(){return this.d}},
C:{
"^":"a;aW:a?,at:b<,c",
ge8:function(){return this.a===8},
se9:function(a){if(a)this.a=2
else this.a=0},
b5:function(a,b){var z,y
z=H.f(new P.C(0,$.m,null),[null])
y=z.b
if(y!==C.c){y.toString
if(b!=null)b=P.dv(b,y)}this.b9(new P.at(null,z,b==null?1:3,a,b))
return z},
aP:function(a){return this.b5(a,null)},
bG:function(a){var z,y
z=$.m
y=new P.C(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.c)z.toString
this.b9(new P.at(null,y,8,a,null))
return y},
bl:function(){if(this.a!==0)throw H.e(new P.as("Future already completed"))
this.a=1},
gel:function(){return this.c},
gaB:function(){return this.c},
ci:function(a){this.a=4
this.c=a},
cg:function(a){this.a=8
this.c=a},
ej:function(a,b){this.cg(new P.a7(a,b))},
b9:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.am(null,null,z,new P.hR(this,a))}else{a.a=this.c
this.c=a}},
aV:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gc5()
z.a=y}return y},
af:function(a){var z,y
z=J.o(a)
if(!!z.$isa6)if(!!z.$isC)P.b9(a,this)
else P.bT(a,this)
else{y=this.aV()
this.ci(a)
P.ad(this,y)}},
bX:function(a){var z=this.aV()
this.ci(a)
P.ad(this,z)},
T:[function(a,b){var z=this.aV()
this.cg(new P.a7(a,b))
P.ad(this,z)},function(a){return this.T(a,null)},"fQ","$2","$1","gbf",2,2,13,0],
aA:function(a){var z
if(a==null);else{z=J.o(a)
if(!!z.$isa6){if(!!z.$isC){z=a.a
if(z>=4&&z===8){this.bl()
z=this.b
z.toString
P.am(null,null,z,new P.hT(this,a))}else P.b9(a,this)}else P.bT(a,this)
return}}this.bl()
z=this.b
z.toString
P.am(null,null,z,new P.hU(this,a))},
dX:function(a,b){var z
this.bl()
z=this.b
z.toString
P.am(null,null,z,new P.hS(this,a,b))},
$isa6:1,
static:{bT:function(a,b){var z,y,x,w
b.saW(2)
try{a.b5(new P.hV(b),new P.hW(b))}catch(x){w=H.I(x)
z=w
y=H.G(x)
P.dP(new P.hX(b,z,y))}},b9:function(a,b){var z
b.a=2
z=new P.at(null,b,0,null,null)
if(a.a>=4)P.ad(a,z)
else a.b9(z)},ad:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.ge8()
if(b==null){if(w){v=z.a.gaB()
y=z.a.gat()
x=J.a5(v)
u=v.gY()
y.toString
P.aO(null,null,y,x,u)}return}for(;b.gc5()!=null;b=t){t=b.a
b.a=null
P.ad(z.a,b)}x.a=!0
s=w?null:z.a.gel()
x.b=s
x.c=!1
y=!w
if(!y||b.gcC()||b.c===8){r=b.gat()
if(w){u=z.a.gat()
u.toString
if(u==null?r!=null:u!==r){u=u.gbv()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaB()
y=z.a.gat()
x=J.a5(v)
u=v.gY()
y.toString
P.aO(null,null,y,x,u)
return}q=$.m
if(q==null?r!=null:q!==r)$.m=r
else q=null
if(y){if(b.gcC())x.a=new P.hZ(x,b,s,r).$0()}else new P.hY(z,x,b,r).$0()
if(b.gf4())new P.i_(z,x,w,b,r).$0()
if(q!=null)$.m=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.o(y).$isa6}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.C)if(p.a>=4){o.a=2
z.a=p
b=new P.at(null,o,0,null,null)
y=p
continue}else P.b9(p,o)
else P.bT(p,o)
return}}o=b.b
b=o.aV()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hR:{
"^":"d:0;a,b",
$0:function(){P.ad(this.a,this.b)}},
hV:{
"^":"d:2;a",
$1:function(a){this.a.bX(a)}},
hW:{
"^":"d:8;a",
$2:function(a,b){this.a.T(a,b)},
$1:function(a){return this.$2(a,null)}},
hX:{
"^":"d:0;a,b,c",
$0:function(){this.a.T(this.b,this.c)}},
hT:{
"^":"d:0;a,b",
$0:function(){P.b9(this.b,this.a)}},
hU:{
"^":"d:0;a,b",
$0:function(){this.a.bX(this.b)}},
hS:{
"^":"d:0;a,b,c",
$0:function(){this.a.T(this.b,this.c)}},
hZ:{
"^":"d:14;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.b4(this.b.gef(),this.c)
return!0}catch(x){w=H.I(x)
z=w
y=H.G(x)
this.a.b=new P.a7(z,y)
return!1}}},
hY:{
"^":"d:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaB()
y=!0
r=this.c
if(r.gf5()){x=r.d
try{y=this.d.b4(x,J.a5(z))}catch(q){r=H.I(q)
w=r
v=H.G(q)
r=J.a5(z)
p=w
o=(r==null?p==null:r===p)?z:new P.a7(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aP()
p=H.ap(p,[p,p]).ag(r)
n=this.d
m=this.b
if(p)m.b=n.fC(u,J.a5(z),z.gY())
else m.b=n.b4(u,J.a5(z))}catch(q){r=H.I(q)
t=r
s=H.G(q)
r=J.a5(z)
p=t
o=(r==null?p==null:r===p)?z:new P.a7(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
i_:{
"^":"d:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.d0(this.d.gem())
z.a=w
v=w}catch(u){z=H.I(u)
y=z
x=H.G(u)
if(this.c){z=J.a5(this.a.a.gaB())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaB()
else v.b=new P.a7(y,x)
v.a=!1
return}if(!!J.o(v).$isa6){t=this.d
s=t.gfA(t)
s.se9(!0)
this.b.c=!0
v.b5(new P.i0(this.a,s),new P.i1(z,s))}}},
i0:{
"^":"d:2;a,b",
$1:function(a){P.ad(this.a.a,new P.at(null,this.b,0,null,null))}},
i1:{
"^":"d:8;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.C)){y=H.f(new P.C(0,$.m,null),[null])
z.a=y
y.ej(a,b)}P.ad(z.a,new P.at(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dm:{
"^":"a;a,b,c",
ex:function(){return this.a.$0()}},
ab:{
"^":"a;",
aw:function(a,b){return H.f(new P.ic(b,this),[H.P(this,"ab",0),null])},
J:function(a,b){var z,y
z={}
y=H.f(new P.C(0,$.m,null),[null])
z.a=null
z.a=this.an(new P.fV(z,this,b,y),!0,new P.fW(y),y.gbf())
return y},
gk:function(a){var z,y
z={}
y=H.f(new P.C(0,$.m,null),[P.u])
z.a=0
this.an(new P.fX(z),!0,new P.fY(z,y),y.gbf())
return y},
bD:function(a){var z,y
z=H.f([],[H.P(this,"ab",0)])
y=H.f(new P.C(0,$.m,null),[[P.p,H.P(this,"ab",0)]])
this.an(new P.fZ(this,z),!0,new P.h_(z,y),y.gbf())
return y}},
fV:{
"^":"d;a,b,c,d",
$1:function(a){P.iz(new P.fT(this.c,a),new P.fU(),P.is(this.a.a,this.d))},
$signature:function(){return H.bb(function(a){return{func:1,args:[a]}},this.b,"ab")}},
fT:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fU:{
"^":"d:2;",
$1:function(a){}},
fW:{
"^":"d:0;a",
$0:function(){this.a.af(null)}},
fX:{
"^":"d:2;a",
$1:function(a){++this.a.a}},
fY:{
"^":"d:0;a,b",
$0:function(){this.b.af(this.a.a)}},
fZ:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bb(function(a){return{func:1,args:[a]}},this.a,"ab")}},
h_:{
"^":"d:0;a,b",
$0:function(){this.b.af(this.a)}},
fS:{
"^":"a;"},
kj:{
"^":"a;"},
hF:{
"^":"a;at:d<,aW:e?",
bz:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cq()
if((z&4)===0&&(this.e&32)===0)this.c2(this.gc7())},
aN:function(a){return this.bz(a,null)},
cZ:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gV(z)}else z=!1
if(z)this.r.b7(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.c2(this.gc9())}}}},
bs:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bc()
return this.f},
bc:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cq()
if((this.e&32)===0)this.r=null
this.f=this.c6()},
bb:["dE",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cd(a)
else this.ba(new P.hJ(a,null))}],
b8:["dF",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cf(a,b)
else this.ba(new P.hL(a,b,null))}],
dW:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.ce()
else this.ba(C.o)},
c8:[function(){},"$0","gc7",0,0,1],
ca:[function(){},"$0","gc9",0,0,1],
c6:function(){return},
ba:function(a){var z,y
z=this.r
if(z==null){z=new P.im(null,null,0)
this.r=z}z.au(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.b7(this)}},
cd:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bC(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bd((z&4)!==0)},
cf:function(a,b){var z,y
z=this.e
y=new P.hH(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bc()
z=this.f
if(!!J.o(z).$isa6)z.bG(y)
else y.$0()}else{y.$0()
this.bd((z&4)!==0)}},
ce:function(){var z,y
z=new P.hG(this)
this.bc()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isa6)y.bG(z)
else z.$0()},
c2:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bd((z&4)!==0)},
bd:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gV(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gV(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.c8()
else this.ca()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.b7(this)},
dS:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dv(b,z)
this.c=c}},
hH:{
"^":"d:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aP()
x=H.ap(x,[x,x]).ag(y)
w=z.d
v=this.b
u=z.b
if(x)w.fD(u,v,this.c)
else w.bC(u,v)
z.e=(z.e&4294967263)>>>0}},
hG:{
"^":"d:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.d1(z.c)
z.e=(z.e&4294967263)>>>0}},
dq:{
"^":"a;b0:a@"},
hJ:{
"^":"dq;b,a",
bA:function(a){a.cd(this.b)}},
hL:{
"^":"dq;aH:b>,Y:c<,a",
bA:function(a){a.cf(this.b,this.c)}},
hK:{
"^":"a;",
bA:function(a){a.ce()},
gb0:function(){return},
sb0:function(a){throw H.e(new P.as("No events after a done."))}},
ie:{
"^":"a;aW:a?",
b7:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dP(new P.ig(this,a))
this.a=1},
cq:function(){if(this.a===1)this.a=3}},
ig:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.f1(this.b)}},
im:{
"^":"ie;b,c,a",
gV:function(a){return this.c==null},
au:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sb0(b)
this.c=b}},
f1:function(a){var z,y
z=this.b
y=z.gb0()
this.b=y
if(y==null)this.c=null
z.bA(a)}},
dt:{
"^":"a;a,b,c,aW:d?",
bT:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
fV:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.af(!0)
return}this.a.aN(0)
this.c=a
this.d=3},"$1","geb",2,0,function(){return H.bb(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dt")}],
ee:[function(a,b){var z
if(this.d===2){z=this.c
this.bT(0)
z.T(a,b)
return}this.a.aN(0)
this.c=new P.a7(a,b)
this.d=4},function(a){return this.ee(a,null)},"fX","$2","$1","ged",2,2,15,0],
fW:[function(){if(this.d===2){var z=this.c
this.bT(0)
z.af(!1)
return}this.a.aN(0)
this.c=null
this.d=5},"$0","gec",0,0,1]},
iu:{
"^":"d:0;a,b,c",
$0:function(){return this.a.T(this.b,this.c)}},
it:{
"^":"d:7;a,b",
$2:function(a,b){return P.ir(this.a,this.b,a,b)}},
bS:{
"^":"ab;",
an:function(a,b,c,d){return this.e0(a,d,c,!0===b)},
cK:function(a,b,c){return this.an(a,null,b,c)},
e0:function(a,b,c,d){return P.hQ(this,a,b,c,d,H.P(this,"bS",0),H.P(this,"bS",1))},
c3:function(a,b){b.bb(a)},
$asab:function(a,b){return[b]}},
dr:{
"^":"hF;x,y,a,b,c,d,e,f,r",
bb:function(a){if((this.e&2)!==0)return
this.dE(a)},
b8:function(a,b){if((this.e&2)!==0)return
this.dF(a,b)},
c8:[function(){var z=this.y
if(z==null)return
z.aN(0)},"$0","gc7",0,0,1],
ca:[function(){var z=this.y
if(z==null)return
z.cZ()},"$0","gc9",0,0,1],
c6:function(){var z=this.y
if(z!=null){this.y=null
z.bs()}return},
fR:[function(a){this.x.c3(a,this)},"$1","ge4",2,0,function(){return H.bb(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dr")}],
fT:[function(a,b){this.b8(a,b)},"$2","ge6",4,0,16],
fS:[function(){this.dW()},"$0","ge5",0,0,1],
dT:function(a,b,c,d,e,f,g){var z,y
z=this.ge4()
y=this.ge6()
this.y=this.x.a.cK(z,this.ge5(),y)},
static:{hQ:function(a,b,c,d,e,f,g){var z=$.m
z=H.f(new P.dr(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.dS(b,c,d,e)
z.dT(a,b,c,d,e,f,g)
return z}}},
ic:{
"^":"bS;b,a",
c3:function(a,b){var z,y,x,w,v
z=null
try{z=this.ek(a)}catch(w){v=H.I(w)
y=v
x=H.G(w)
$.m.toString
b.b8(y,x)
return}b.bb(z)},
ek:function(a){return this.b.$1(a)}},
a7:{
"^":"a;aH:a>,Y:b<",
i:function(a){return H.c(this.a)},
$isJ:1},
iq:{
"^":"a;"},
iy:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.io(z,P.ip(z,this.b)))}},
ih:{
"^":"iq;",
gbv:function(){return this},
d1:function(a){var z,y,x,w
try{if(C.c===$.m){x=a.$0()
return x}x=P.dw(null,null,this,a)
return x}catch(w){x=H.I(w)
z=x
y=H.G(w)
return P.aO(null,null,this,z,y)}},
bC:function(a,b){var z,y,x,w
try{if(C.c===$.m){x=a.$1(b)
return x}x=P.dy(null,null,this,a,b)
return x}catch(w){x=H.I(w)
z=x
y=H.G(w)
return P.aO(null,null,this,z,y)}},
fD:function(a,b,c){var z,y,x,w
try{if(C.c===$.m){x=a.$2(b,c)
return x}x=P.dx(null,null,this,a,b,c)
return x}catch(w){x=H.I(w)
z=x
y=H.G(w)
return P.aO(null,null,this,z,y)}},
bq:function(a,b){if(b)return new P.ii(this,a)
else return new P.ij(this,a)},
es:function(a,b){if(b)return new P.ik(this,a)
else return new P.il(this,a)},
h:function(a,b){return},
d0:function(a){if($.m===C.c)return a.$0()
return P.dw(null,null,this,a)},
b4:function(a,b){if($.m===C.c)return a.$1(b)
return P.dy(null,null,this,a,b)},
fC:function(a,b,c){if($.m===C.c)return a.$2(b,c)
return P.dx(null,null,this,a,b,c)}},
ii:{
"^":"d:0;a,b",
$0:function(){return this.a.d1(this.b)}},
ij:{
"^":"d:0;a,b",
$0:function(){return this.a.d0(this.b)}},
ik:{
"^":"d:2;a,b",
$1:function(a){return this.a.bC(this.b,a)}},
il:{
"^":"d:2;a,b",
$1:function(a){return this.a.b4(this.b,a)}}}],["","",,P,{
"^":"",
cE:function(){return H.f(new H.aJ(0,null,null,null,null,null,0),[null,null])},
aj:function(a){return H.dG(a,H.f(new H.aJ(0,null,null,null,null,null,0),[null,null]))},
fa:function(a,b,c){var z,y
if(P.bY(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ax()
y.push(a)
try{P.iw(a,z)}finally{if(0>=y.length)return H.b(y,0)
y.pop()}y=P.cZ(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aX:function(a,b,c){var z,y,x
if(P.bY(a))return b+"..."+c
z=new P.bJ(b)
y=$.$get$ax()
y.push(a)
try{x=z
x.a=P.cZ(x.gas(),a,", ")}finally{if(0>=y.length)return H.b(y,0)
y.pop()}y=z
y.a=y.gas()+c
y=z.gas()
return y.charCodeAt(0)==0?y:y},
bY:function(a){var z,y
for(z=0;y=$.$get$ax(),z<y.length;++z)if(a===y[z])return!0
return!1},
iw:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gK(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.c(z.gB())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.b(b,0)
v=b.pop()
if(0>=b.length)return H.b(b,0)
u=b.pop()}else{t=z.gB();++x
if(!z.u()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.b(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gB();++x
for(;z.u();t=s,s=r){r=z.gB();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.b(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.b(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aZ:function(a,b,c,d,e){return H.f(new H.aJ(0,null,null,null,null,null,0),[d,e])},
ai:function(a,b){return P.i7(a,b)},
ar:function(a,b,c,d){return H.f(new P.i5(0,null,null,null,null,null,0),[d])},
cJ:function(a){var z,y,x
z={}
if(P.bY(a))return"{...}"
y=new P.bJ("")
try{$.$get$ax().push(a)
x=y
x.a=x.gas()+"{"
z.a=!0
J.e9(a,new P.fq(z,y))
z=y
z.a=z.gas()+"}"}finally{z=$.$get$ax()
if(0>=z.length)return H.b(z,0)
z.pop()}z=y.gas()
return z.charCodeAt(0)==0?z:z},
i6:{
"^":"aJ;a,b,c,d,e,f,r",
aJ:function(a){return H.j1(a)&0x3ffffff},
aK:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcD()
if(x==null?b==null:x===b)return y}return-1},
static:{i7:function(a,b){return H.f(new P.i6(0,null,null,null,null,null,0),[a,b])}}},
i5:{
"^":"i2;a,b,c,d,e,f,r",
gK:function(a){var z=new P.cF(this,this.r,null,null)
z.c=this.e
return z},
gk:function(a){return this.a},
aF:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.e_(b)},
e_:function(a){var z=this.d
if(z==null)return!1
return this.aU(z[this.aT(a)],a)>=0},
cL:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.aF(0,a)?a:null
else return this.ea(a)},
ea:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aT(a)]
x=this.aU(y,a)
if(x<0)return
return J.dU(y,x).gc_()},
J:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.N(this))
z=z.b}},
au:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bV()
this.b=z}return this.bU(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bV()
this.c=y}return this.bU(y,b)}else return this.a6(b)},
a6:function(a){var z,y,x
z=this.d
if(z==null){z=P.bV()
this.d=z}y=this.aT(a)
x=z[y]
if(x==null)z[y]=[this.be(a)]
else{if(this.aU(x,a)>=0)return!1
x.push(this.be(a))}return!0},
aq:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bV(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bV(this.c,b)
else return this.eh(b)},
eh:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aT(a)]
x=this.aU(y,a)
if(x<0)return!1
this.bW(y.splice(x,1)[0])
return!0},
a7:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bU:function(a,b){if(a[b]!=null)return!1
a[b]=this.be(b)
return!0},
bV:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bW(z)
delete a[b]
return!0},
be:function(a){var z,y
z=new P.fm(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bW:function(a){var z,y
z=a.gdZ()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aT:function(a){return J.aS(a)&0x3ffffff},
aU:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a4(a[y].gc_(),b))return y
return-1},
$isx:1,
static:{bV:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fm:{
"^":"a;c_:a<,b,dZ:c<"},
cF:{
"^":"a;a,b,c,d",
gB:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
i2:{
"^":"fL;"},
cH:{
"^":"a;",
gK:function(a){return new H.cG(a,this.gk(a),0,null)},
al:function(a,b){return this.h(a,b)},
J:function(a,b){var z,y,x,w
z=this.gk(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.b(a,w)
b.$1(a[w])
if(x)throw H.e(new P.N(a))}},
aw:function(a,b){return H.f(new H.bB(a,b),[null,null])},
i:function(a){return P.aX(a,"[","]")},
$isp:1,
$asp:null,
$isx:1},
fq:{
"^":"d:17;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.c(a)
z.a=y+": "
z.a+=H.c(b)}},
fn:{
"^":"T;a,b,c,d",
gK:function(a){return new P.i8(this,this.c,this.d,this.b,null)},
J:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.b(x,y)
b.$1(x[y])
if(z!==this.d)H.H(new P.N(this))}},
gV:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a7:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.b(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aX(this,"{","}")},
cY:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bv());++this.d
y=this.a
x=y.length
if(z>=x)return H.b(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
a6:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.b(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.c1();++this.d},
c1:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,[H.M(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.bN(y,0,w,z,x)
C.a.bN(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dI:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$isx:1,
static:{bz:function(a,b){var z=H.f(new P.fn(null,0,0,0),[b])
z.dI(a,b)
return z}}},
i8:{
"^":"a;a,b,c,d,e",
gB:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.H(new P.N(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.b(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fM:{
"^":"a;",
aw:function(a,b){return H.f(new H.cn(this,b),[H.M(this,0),null])},
i:function(a){return P.aX(this,"{","}")},
J:function(a,b){var z
for(z=this.gK(this);z.u();)b.$1(z.d)},
$isx:1},
fL:{
"^":"fM;"}}],["","",,P,{
"^":"",
iA:function(a){return H.h0(a)},
bs:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aD(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eK(a)},
eK:function(a){var z=J.o(a)
if(!!z.$isd)return z.i(a)
return H.b3(a)},
aW:function(a){return new P.hP(a)},
fo:function(a,b,c){var z,y,x
z=J.fd(a,c)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
bA:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.bl(a);y.u();)z.push(y.gB())
if(b)return z
z.fixed$length=Array
return z},
K:function(a){var z=H.c(a)
H.j2(z)},
jW:{
"^":"d:18;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.iA(a)}},
bZ:{
"^":"a;"},
"+bool":0,
aV:{
"^":"a;a,b",
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.aV))return!1
return this.a===b.a&&this.b===b.b},
gH:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.eF(z?H.L(this).getUTCFullYear()+0:H.L(this).getFullYear()+0)
x=P.aF(z?H.L(this).getUTCMonth()+1:H.L(this).getMonth()+1)
w=P.aF(z?H.L(this).getUTCDate()+0:H.L(this).getDate()+0)
v=P.aF(z?H.L(this).getUTCHours()+0:H.L(this).getHours()+0)
u=P.aF(z?H.L(this).getUTCMinutes()+0:H.L(this).getMinutes()+0)
t=P.aF(z?H.L(this).getUTCSeconds()+0:H.L(this).getSeconds()+0)
s=P.eG(H.bG(this))
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
return"00"+a},aF:function(a){if(a>=10)return""+a
return"0"+a}}},
a3:{
"^":"aR;"},
"+double":0,
aG:{
"^":"a;a",
j:function(a,b){return new P.aG(C.d.j(this.a,b.ge1()))},
b6:function(a,b){return C.d.b6(this.a,b.ge1())},
t:function(a,b){if(b==null)return!1
if(!(b instanceof P.aG))return!1
return this.a===b.a},
gH:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eJ()
y=this.a
if(y<0)return"-"+new P.aG(-y).i(0)
x=z.$1(C.d.bB(C.d.aC(y,6e7),60))
w=z.$1(C.d.bB(C.d.aC(y,1e6),60))
v=new P.eI().$1(C.d.bB(y,1e6))
return""+C.d.aC(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)}},
eI:{
"^":"d:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eJ:{
"^":"d:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
J:{
"^":"a;",
gY:function(){return H.G(this.$thrownJsError)}},
cQ:{
"^":"J;",
i:function(a){return"Throw of null."}},
ae:{
"^":"J;a,b,c,d",
gbh:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbg:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.c(z)+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gbh()+y+x
if(!this.a)return w
v=this.gbg()
u=P.bs(this.b)
return w+v+": "+H.c(u)},
static:{aE:function(a){return new P.ae(!1,null,null,a)},es:function(a,b,c){return new P.ae(!0,a,b,c)}}},
bI:{
"^":"ae;e,f,a,b,c,d",
gbh:function(){return"RangeError"},
gbg:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else{if(typeof x!=="number")return x.fN()
if(typeof z!=="number")return H.l(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{fF:function(a){return new P.bI(null,null,!1,null,null,a)},b4:function(a,b,c){return new P.bI(null,null,!0,a,b,"Value not in range")},aK:function(a,b,c,d,e){return new P.bI(b,c,!0,a,d,"Invalid value")},cV:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.aK(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.aK(b,a,c,"end",f))
return b}}},
f0:{
"^":"ae;e,k:f>,a,b,c,d",
gbh:function(){return"RangeError"},
gbg:function(){P.bs(this.e)
var z=": index should be less than "+H.c(this.f)
return J.dT(this.b,0)?": index must not be negative":z},
static:{cy:function(a,b,c,d,e){var z=e!=null?e:J.aB(b)
return new P.f0(b,z,!0,a,c,"Index out of range")}}},
a_:{
"^":"J;a",
i:function(a){return"Unsupported operation: "+this.a}},
dk:{
"^":"J;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
as:{
"^":"J;a",
i:function(a){return"Bad state: "+this.a}},
N:{
"^":"J;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.bs(z))+"."}},
cY:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gY:function(){return},
$isJ:1},
eE:{
"^":"J;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hP:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
eL:{
"^":"a;a",
i:function(a){return"Expando:"+H.c(this.a)},
h:function(a,b){var z=H.b2(b,"expando$values")
return z==null?null:H.b2(z,this.c0())},
v:function(a,b,c){var z=H.b2(b,"expando$values")
if(z==null){z=new P.a()
H.bH(b,"expando$values",z)}H.bH(z,this.c0(),c)},
c0:function(){var z,y
z=H.b2(this,"expando$key")
if(z==null){y=$.cq
$.cq=y+1
z="expando$key$"+y
H.bH(this,"expando$key",z)}return z}},
eM:{
"^":"a;"},
u:{
"^":"aR;"},
"+int":0,
T:{
"^":"a;",
aw:function(a,b){return H.b0(this,b,H.P(this,"T",0),null)},
J:function(a,b){var z
for(z=this.gK(this);z.u();)b.$1(z.gB())},
bE:function(a,b){return P.bA(this,b,H.P(this,"T",0))},
bD:function(a){return this.bE(a,!0)},
gk:function(a){var z,y
z=this.gK(this)
for(y=0;z.u();)++y
return y},
al:function(a,b){var z,y,x
if(b<0)H.H(P.aK(b,0,null,"index",null))
for(z=this.gK(this),y=0;z.u();){x=z.gB()
if(b===y)return x;++y}throw H.e(P.cy(b,this,"index",null,y))},
i:function(a){return P.fa(this,"(",")")}},
fc:{
"^":"a;"},
p:{
"^":"a;",
$asp:null,
$isx:1},
"+List":0,
jX:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aR:{
"^":"a;"},
"+num":0,
a:{
"^":";",
t:function(a,b){return this===b},
gH:function(a){return H.a9(this)},
i:function(a){return H.b3(this)}},
aa:{
"^":"a;"},
O:{
"^":"a;"},
"+String":0,
bJ:{
"^":"a;as:a<",
gk:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{cZ:function(a,b,c){var z=J.bl(b)
if(!z.u())return a
if(c.length===0){do a+=H.c(z.gB())
while(z.u())}else{a+=H.c(z.gB())
for(;z.u();)a=a+c+H.c(z.gB())}return a}}},
d_:{
"^":"a;"}}],["","",,W,{
"^":"",
ev:function(a,b){var z=document.createElement("canvas",null)
J.eo(z,b)
J.em(z,a)
return z},
eD:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.x)},
a1:function(a){var z=$.m
if(z===C.c)return a
return z.es(a,!0)},
D:{
"^":"co;",
$isD:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
ja:{
"^":"D;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
jc:{
"^":"D;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
jd:{
"^":"D;",
gbx:function(a){return H.f(new W.B(a,"error",!1),[null])},
gby:function(a){return H.f(new W.B(a,"load",!1),[null])},
$ish:1,
"%":"HTMLBodyElement"},
cf:{
"^":"D;l:height%,m:width%",
bH:function(a,b,c){return a.getContext(b,P.iI(c))},
dc:function(a,b,c,d,e,f,g){var z,y
z=P.aj(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bH(a,"webgl",z)
return y==null?this.bH(a,"experimental-webgl",z):y},
da:function(a,b){return this.dc(a,!0,!0,!0,!0,!1,b)},
$iscf:1,
"%":"HTMLCanvasElement"},
je:{
"^":"h;",
cJ:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
jg:{
"^":"b1;k:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jh:{
"^":"f1;k:length=",
bK:function(a,b){var z=this.e3(a,b)
return z!=null?z:""},
e3:function(a,b){if(W.eD(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.eH()+b)},
gl:function(a){return a.height},
gm:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
f1:{
"^":"h+eC;"},
eC:{
"^":"a;",
gl:function(a){return this.bK(a,"height")},
gm:function(a){return this.bK(a,"width")}},
ji:{
"^":"b1;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
jj:{
"^":"h;",
i:function(a){return String(a)},
"%":"DOMException"},
co:{
"^":"b1;",
i:function(a){return a.localName},
gbx:function(a){return H.f(new W.B(a,"error",!1),[null])},
gby:function(a){return H.f(new W.B(a,"load",!1),[null])},
gcO:function(a){return H.f(new W.B(a,"mousedown",!1),[null])},
gcP:function(a){return H.f(new W.B(a,"mouseenter",!1),[null])},
gcQ:function(a){return H.f(new W.B(a,"mouseleave",!1),[null])},
gcR:function(a){return H.f(new W.B(a,"mousemove",!1),[null])},
gcS:function(a){return H.f(new W.B(a,"mouseout",!1),[null])},
gcT:function(a){return H.f(new W.B(a,"mouseover",!1),[null])},
gcU:function(a){return H.f(new W.B(a,"mouseup",!1),[null])},
$ish:1,
"%":";Element"},
jk:{
"^":"D;l:height%,a5:src},m:width%",
"%":"HTMLEmbedElement"},
jl:{
"^":"bt;aH:error=",
"%":"ErrorEvent"},
bt:{
"^":"h;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
cp:{
"^":"h;",
dV:function(a,b,c,d){return a.addEventListener(b,H.ay(c,1),d)},
ei:function(a,b,c,d){return a.removeEventListener(b,H.ay(c,1),d)},
"%":"MediaStream;EventTarget"},
jE:{
"^":"D;k:length=",
"%":"HTMLFormElement"},
jF:{
"^":"D;l:height%,a5:src},m:width%",
"%":"HTMLIFrameElement"},
cx:{
"^":"D;l:height%,a5:src},m:width%",
bt:function(a,b){return a.complete.$1(b)},
$iscx:1,
"%":"HTMLImageElement"},
jH:{
"^":"D;l:height%,a5:src},m:width%",
$ish:1,
"%":"HTMLInputElement"},
fr:{
"^":"D;aH:error=,a5:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bC:{
"^":"hw;",
$isbC:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jV:{
"^":"h;",
$ish:1,
"%":"Navigator"},
b1:{
"^":"cp;",
i:function(a){var z=a.nodeValue
return z==null?this.dC(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
jY:{
"^":"D;l:height%,m:width%",
"%":"HTMLObjectElement"},
k1:{
"^":"D;a5:src}",
"%":"HTMLScriptElement"},
k3:{
"^":"D;k:length=",
"%":"HTMLSelectElement"},
k4:{
"^":"D;a5:src}",
"%":"HTMLSourceElement"},
k5:{
"^":"bt;aH:error=",
"%":"SpeechRecognitionError"},
ka:{
"^":"D;cI:kind=,a5:src}",
"%":"HTMLTrackElement"},
hw:{
"^":"bt;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
dl:{
"^":"fr;l:height%,m:width%",
$isdl:1,
"%":"HTMLVideoElement"},
ke:{
"^":"cp;",
$ish:1,
"%":"DOMWindow|Window"},
ki:{
"^":"b1;",
$ish:1,
"%":"DocumentType"},
kl:{
"^":"D;",
$ish:1,
"%":"HTMLFrameSetElement"},
hO:{
"^":"ab;",
an:function(a,b,c,d){var z=new W.a0(0,this.a,this.b,W.a1(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.M()
return z},
cK:function(a,b,c){return this.an(a,null,b,c)}},
B:{
"^":"hO;a,b,c"},
a0:{
"^":"fS;a,b,c,d,e",
bs:function(){if(this.b==null)return
this.cl()
this.b=null
this.d=null
return},
bz:function(a,b){if(this.b==null)return;++this.a
this.cl()},
aN:function(a){return this.bz(a,null)},
cZ:function(){if(this.b==null||this.a<=0)return;--this.a
this.M()},
M:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dV(x,this.c,z,this.e)}},
cl:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dW(x,this.c,z,this.e)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
j8:{
"^":"ah;",
$ish:1,
"%":"SVGAElement"},
j9:{
"^":"h1;",
$ish:1,
"%":"SVGAltGlyphElement"},
jb:{
"^":"r;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
jm:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEBlendElement"},
jn:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
jo:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
jp:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFECompositeElement"},
jq:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
jr:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
js:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
jt:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEFloodElement"},
ju:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
jv:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEImageElement"},
jw:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEMergeElement"},
jx:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFEMorphologyElement"},
jy:{
"^":"r;A:dx=,w:dy=,l:height=,m:width=",
$ish:1,
"%":"SVGFEOffsetElement"},
jz:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
jA:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFETileElement"},
jB:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFETurbulenceElement"},
jC:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGFilterElement"},
jD:{
"^":"ah;l:height=,m:width=",
"%":"SVGForeignObjectElement"},
f_:{
"^":"ah;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
ah:{
"^":"r;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jG:{
"^":"ah;l:height=,m:width=",
$ish:1,
"%":"SVGImageElement"},
jK:{
"^":"r;",
$ish:1,
"%":"SVGMarkerElement"},
jL:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGMaskElement"},
jZ:{
"^":"r;l:height=,m:width=",
$ish:1,
"%":"SVGPatternElement"},
k_:{
"^":"f_;l:height=,m:width=",
"%":"SVGRectElement"},
k2:{
"^":"r;",
$ish:1,
"%":"SVGScriptElement"},
r:{
"^":"co;",
gbx:function(a){return H.f(new W.B(a,"error",!1),[null])},
gby:function(a){return H.f(new W.B(a,"load",!1),[null])},
gcO:function(a){return H.f(new W.B(a,"mousedown",!1),[null])},
gcP:function(a){return H.f(new W.B(a,"mouseenter",!1),[null])},
gcQ:function(a){return H.f(new W.B(a,"mouseleave",!1),[null])},
gcR:function(a){return H.f(new W.B(a,"mousemove",!1),[null])},
gcS:function(a){return H.f(new W.B(a,"mouseout",!1),[null])},
gcT:function(a){return H.f(new W.B(a,"mouseover",!1),[null])},
gcU:function(a){return H.f(new W.B(a,"mouseup",!1),[null])},
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
k7:{
"^":"ah;l:height=,m:width=",
$ish:1,
"%":"SVGSVGElement"},
k8:{
"^":"r;",
$ish:1,
"%":"SVGSymbolElement"},
d1:{
"^":"ah;",
"%":";SVGTextContentElement"},
k9:{
"^":"d1;",
$ish:1,
"%":"SVGTextPathElement"},
h1:{
"^":"d1;A:dx=,w:dy=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
kb:{
"^":"ah;l:height=,m:width=",
$ish:1,
"%":"SVGUseElement"},
kc:{
"^":"r;",
$ish:1,
"%":"SVGViewElement"},
kk:{
"^":"r;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
km:{
"^":"r;",
$ish:1,
"%":"SVGCursorElement"},
kn:{
"^":"r;",
$ish:1,
"%":"SVGFEDropShadowElement"},
ko:{
"^":"r;",
$ish:1,
"%":"SVGGlyphRefElement"},
kp:{
"^":"r;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
k0:{
"^":"h;",
eq:function(a,b,c){return a.bindBuffer(b,c)},
er:function(a,b,c){return a.bindTexture(b,c)},
eu:function(a,b,c){return a.blendFunc(b,c)},
ev:function(a,b,c,d){return a.bufferData(b,c,d)},
ez:function(a,b){return a.clear(b)},
eA:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
eB:function(a,b){return a.clearDepth(b)},
eC:function(a,b){return a.clearStencil(b)},
eE:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
eI:function(a){return a.createBuffer()},
eJ:function(a){return a.createProgram()},
eK:function(a,b){return a.createShader(b)},
eL:function(a){return a.createTexture()},
eM:function(a,b){return a.depthFunc(b)},
eN:function(a,b){return a.depthMask(b)},
eU:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
eY:function(a,b){return a.enable(b)},
eZ:function(a,b){return a.enableVertexAttribArray(b)},
d9:function(a,b,c){return a.getAttribLocation(b,c)},
de:function(a,b,c){return a.getUniformLocation(b,c)},
cJ:function(a,b){return a.lineWidth(b)},
dv:function(a,b,c,d){return a.stencilFunc(b,c,d)},
dw:function(a,b,c,d){return a.stencilOp(b,c,d)},
fF:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.iK(g))
return}z=J.o(g)
if(!!z.$iscx)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscf)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdl)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aE("Incorrect number or type of arguments"))},
fE:function(a,b,c,d,e,f,g){return this.fF(a,b,c,d,e,f,g,null,null,null)},
fG:function(a,b,c,d){return a.texParameteri(b,c,d)},
fI:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
fJ:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
fK:function(a,b){return a.useProgram(b)},
fL:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jf:{
"^":"a;"}}],["","",,P,{
"^":"",
i4:{
"^":"a;",
fg:function(a){if(a<=0||a>4294967296)throw H.e(P.fF("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}}}],["","",,H,{
"^":"",
i:function(a){return a},
au:function(a){return a},
cK:{
"^":"h;",
$iscK:1,
"%":"ArrayBuffer"},
bF:{
"^":"h;",
$isbF:1,
"%":"DataView;ArrayBufferView;bD|cL|cN|bE|cM|cO|a8"},
bD:{
"^":"bF;",
gk:function(a){return a.length},
$isbx:1,
$isbw:1},
bE:{
"^":"cN;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
v:function(a,b,c){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
a[b]=c}},
cL:{
"^":"bD+cH;",
$isp:1,
$asp:function(){return[P.a3]},
$isx:1},
cN:{
"^":"cL+cr;"},
a8:{
"^":"cO;",
v:function(a,b,c){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
a[b]=c},
$isp:1,
$asp:function(){return[P.u]},
$isx:1},
cM:{
"^":"bD+cH;",
$isp:1,
$asp:function(){return[P.u]},
$isx:1},
cO:{
"^":"cM+cr;"},
jM:{
"^":"bE;",
$isp:1,
$asp:function(){return[P.a3]},
$isx:1,
"%":"Float32Array"},
jN:{
"^":"bE;",
$isp:1,
$asp:function(){return[P.a3]},
$isx:1,
"%":"Float64Array"},
jO:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Int16Array"},
jP:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Int32Array"},
jQ:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Int8Array"},
jR:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Uint16Array"},
jS:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"Uint32Array"},
jT:{
"^":"a8;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jU:{
"^":"a8;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.F(a,b))
return a[b]},
$isp:1,
$asp:function(){return[P.u]},
$isx:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
j2:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,M,{
"^":"",
fD:function(a){switch(a){case 4294967295:case 4289357414:case 4294901760:case 4289374890:case 4294963456:return
case 4278190320:return"assets/act_front.png"
case 4278190321:return"assets/act_right.png"
case 4278190322:return"assets/act_left.png"
case 4278190323:return"assets/act_back.png"
case 4294967210:return"assets/act_rotate_right.png"
case 4294967211:return"assets/act_rotate_left.png"
case 4294963713:return"assets/act_shoot.png"}return},
fB:{
"^":"Y;e,f,r,x,y,z,a,b,c,d",
dh:[function(a){var z,y
P.K("-------------"+a)
switch(a){case"assets/act_front.png":z=[]
y=new Y.w(0,null,null,z)
y.a=4278190320
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_right.png":z=[]
y=new Y.w(0,null,null,z)
y.a=4278190321
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_left.png":z=[]
y=new Y.w(0,null,null,z)
y.a=4278190322
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_back.png":z=[]
y=new Y.w(0,null,null,z)
y.a=4278190323
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_rotate_right.png":z=[]
y=new Y.cv(C.i,4294967210,null,null,z)
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_rotate_left.png":z=[]
y=new Y.eZ(C.i,4294967211,null,null,z)
z.push(new Y.z(0,1,4294901760))
break
case"assets/act_shoot.png":z=[]
y=new Y.eX(0,0.7853981633974483,0.8,1,4294963713,null,null,z)
z.push(new Y.z(0,1,4294901760))
break
default:y=null}if(y!=null)this.e.f.b.cx.G(this.y,this.z,y)},"$1","gR",2,0,4],
I:function(a,b){var z,y,x
z=this.f
if(z!=null){z=J.S(z.gF())
y=J.S(this.f.gO())
x=F.E(null)
b.av(a,this.f,new F.v(0,0,z,y),new F.v(0,0,800,600),x)}this.eW(a,b)},
ap:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=(d-50)/70
y=(e-5)/70
x=this.b
if(!(x&&C.a).aF(x,this.r)){w=C.f.a1(z)
v=C.f.a1(y)
if(0<w){x=this.e.f.b.cx.d
if(typeof x!=="number")return x.Z()
x=w<x-1}else x=!1
if(x){if(0<v){x=this.e.f.b.cx.e
if(typeof x!=="number")return x.Z()
x=v<x-1}else x=!1
if(x){this.y=C.f.a1(z)
this.z=C.f.a1(y)}}}return!1},
eW:function(a,b){var z,y,x,w
z=this.e
y=0
while(!0){x=z.f.b.cx.e
if(typeof x!=="number")return H.l(x)
if(!(y<x))break
w=0
while(!0){x=z.f.b.cx.d
if(typeof x!=="number")return H.l(x)
if(!(w<x))break
this.eV(a,b,w,y);++w}++y}},
eV:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=new F.d2(null,C.k,1)
z.a=F.j(255,255,255,255)
z.c=2.5
z.b=C.e
y=50+c*70
x=5+d*70
w=new F.v(y,x,50,50)
v=this.e
u=v.f.b.cx
t=u.c
u=u.d
if(typeof u!=="number")return H.l(u)
u=c+d*u
if(u>=t.length)return H.b(t,u)
s=t[u]
z.a=new F.bM(s.a)
if(c===this.y&&d===this.z){z.b=C.e
z.c=10.5}else{z.b=C.e
z.c=2.5}b.U(a,w,z)
r=M.fD(s.a)
q=r!=null?v.a.dd(r):null
if(q!=null)b.av(a,q,new F.v(0,0,J.S(q.gF()),J.S(q.gO())),w,z)
for(u=s.d,t=u.length,p=b.a,o=0;o<u.length;u.length===t||(0,H.a2)(u),++o){n=u[o]
m=J.k(n)
if(m.gA(n)===1&&m.gw(n)===0);l=m.gA(n)===1&&m.gw(n)===1?45:0
if(m.gA(n)===0&&m.gw(n)===1)l=90
if(m.gA(n)===-1&&m.gw(n)===1)l=135
if(m.gA(n)===-1&&m.gw(n)===0)l=180
if(m.gA(n)===-1&&m.gw(n)===-1)l=215
if(m.gA(n)===0&&m.gw(n)===-1)l=260
if(m.gA(n)===1&&m.gw(n)===-1)l=315
F.j(255,255,255,255)
m=v.f.b.cx
k=m.c
m=m.d
if(typeof m!=="number")return H.l(m)
m=c+d*m
if(m>=k.length)return H.b(k,m)
m=new F.bM(k[m].a)
j=new E.n(new Float64Array(16))
j.n()
j.E(0,y+25,x+25,0)
j.d_(6.283185307179586*((l-90)/360))
p.push(C.a.ga8(p).q(0,j))
b.ab()
b.ak(a,[-10,0,0,-10,41.66666666666667,0],[0,1],m,C.e,2.5)
b.ak(a,[-10,41.66666666666667,0,-20,38.333333333333336,0],[0,1],m,C.e,2.5)
b.ak(a,[-20,38.333333333333336,0,0,38.333333333333336,0],[0,1],m,C.e,2.5)
if(0>=p.length)return H.b(p,0)
p.pop()
b.ab()}},
cV:[function(a){var z,y,x,w,v,u
P.K("id == "+a)
switch(a){case"select_button":z=this.b
if(!(z&&C.a).aF(z,this.r))this.b.push(this.r)
break
case"cha_button":z=this.b
if(!(z&&C.a).aF(z,this.x)){z=this.e.f.b.cx
y=this.y
x=this.z
w=z.c
z=z.d
if(typeof z!=="number")return H.l(z)
z=y+x*z
if(z<0||z>=w.length)return H.b(w,z)
v=w[z]
if(v.a===4294963713){this.x.sbP(v)
this.b.push(this.x)}}break
case"back_button":z=this.e
z.e.gD().ai()
z.e.gD().ah(z.b)
break
case"yes_button":z=this.e.f.b.cx
y=this.y
x=this.z
w=z.c
z=z.d
if(typeof z!=="number")return H.l(z)
z=y+x*z
if(z<0||z>=w.length)return H.b(w,z)
z=w[z].d
if(z.length>0){u=J.R(z[0])
if(0>=z.length)return H.b(z,0)
y=z[0]
x=J.k(y)
w=x.gw(y)
if(typeof w!=="number")return H.l(w)
x.sA(y,-1*w)
if(0>=z.length)return H.b(z,0)
J.ca(z[0],u)}break
case"no_button":z=this.e.f.b.cx
y=this.y
x=this.z
w=z.c
z=z.d
if(typeof z!=="number")return H.l(z)
z=y+x*z
if(z<0||z>=w.length)return H.b(w,z)
z=w[z].d
if(z.length>1){u=J.R(z[1])
if(1>=z.length)return H.b(z,1)
y=z[1]
x=J.k(y)
w=x.gw(y)
if(typeof w!=="number")return H.l(w)
x.sA(y,-1*w)
if(1>=z.length)return H.b(z,1)
J.ca(z[1],u)}break}},"$1","gX",2,0,4],
dL:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.e.a
z.a0("assets/bg_prog.png").aP(new M.fE(this))
y=this.b
x=F.U(z,"cha_button","assets/con_cha.png",80,80,this.gX())
w=new E.n(new Float64Array(H.i(16)))
w.n()
w.a4(400,500,0)
x.c=w
x.Q=F.j(34,255,0,0)
x.z=F.j(255,255,255,255)
x.ch=F.j(17,0,255,0)
y.push(x)
y=this.b
w=this.gX()
v=F.j(170,255,170,204)
u=F.j(170,204,170,255)
t=F.j(170,204,255,170)
s=new E.n(new Float64Array(H.i(16)))
s.n()
x=new F.aL(200,120,!1,!1,"back_button",v,u,t,w,0,0,0,0,"none",null,s,!1)
x.b=[]
w=new E.n(new Float64Array(H.i(16)))
w.n()
w.a4(30,480,0)
x.c=w
x.Q=F.j(34,255,0,0)
x.z=F.j(0,0,0,255)
x.ch=F.j(17,0,255,0)
y.push(x)
y=this.b
x=F.U(z,"select_button","assets/con_sel.png",80,80,this.gX())
w=new E.n(new Float64Array(H.i(16)))
w.n()
w.a4(500,500,0)
x.c=w
x.Q=F.j(34,255,0,0)
x.z=F.j(255,255,255,255)
x.ch=F.j(17,0,255,0)
y.push(x)
y=this.b
x=F.U(z,"yes_button","assets/con_yes_rot.png",80,80,this.gX())
w=new E.n(new Float64Array(H.i(16)))
w.n()
w.a4(600,500,0)
x.c=w
x.Q=F.j(34,255,0,0)
x.z=F.j(255,255,255,255)
x.ch=F.j(17,0,255,0)
y.push(x)
y=this.b
x=F.U(z,"no_button","assets/con_no_rot.png",80,80,this.gX())
w=new E.n(new Float64Array(H.i(16)))
w.n()
w.a4(700,500,0)
x.c=w
x.Q=F.j(34,255,0,0)
x.z=F.j(255,255,255,255)
x.ch=F.j(17,0,255,0)
y.push(x)
y=this.y
w=this.z
v=this.gR()
u=new E.n(new Float64Array(H.i(16)))
u.n()
u=new M.hu(y,w,this,z,v,0,0,0,0,600,600,600,840,0,0,"none",null,u,!1)
u.b=[]
r=F.U(z,"assets/act_front.png","assets/act_front.png",100,100,u.gR())
q=F.U(z,"assets/act_right.png","assets/act_right.png",100,100,u.gR())
p=F.U(z,"assets/act_left.png","assets/act_left.png",100,100,u.gR())
o=F.U(z,"assets/act_back.png","assets/act_back.png",100,100,u.gR())
n=F.U(z,"assets/act_rotate_right.png","assets/act_rotate_right.png",100,100,u.gR())
m=F.U(z,"assets/act_rotate_left.png","assets/act_rotate_left.png",100,100,u.gR())
l=F.U(z,"assets/act_shoot.png","assets/act_shoot.png",100,100,u.gR())
u.c.E(0,100,0,0)
r.c.E(0,0,0,0)
q.c.E(0,0,120,0)
p.c.E(0,0,240,0)
o.c.E(0,0,360,0)
n.c.E(0,0,480,0)
m.c.E(0,0,600,0)
l.c.E(0,0,720,0)
u.b.push(r)
u.b.push(q)
u.b.push(p)
u.b.push(o)
u.b.push(n)
u.b.push(m)
u.b.push(l)
this.r=u
y=this.y
w=this.z
v=this.gR()
u=new E.n(new Float64Array(H.i(16)))
u.n()
v=new M.fN(y,w,this,z,v,null,null,0,0,0,0,600,600,600,840,0,0,"none",null,u,!1)
v.b=[]
u.E(0,100,0,0)
z=v.gfi()
y=F.j(170,170,170,255)
w=new E.n(new Float64Array(H.i(16)))
w.n()
w=new F.h8("shoot",400,100,100,0,0.3,0.3,y,z,"none",null,w,!1)
w.b=[]
v.go=w
v.b.push(w)
z=F.j(170,170,170,255)
y=new E.n(new Float64Array(H.i(16)))
y.n()
k=new F.he(400,100,0.3,z,"none",null,y,!1)
k.b=[]
y.E(0,0,450,0)
v.b.push(k)
v.sbP(v.fy)
this.x=v},
static:{fC:function(a){var z=new E.n(new Float64Array(H.i(16)))
z.n()
z=new M.fB(a,null,null,null,1,1,"none",null,z,!1)
z.b=[]
z.dL(a)
return z}}},
fE:{
"^":"d:5;a",
$1:function(a){this.a.f=a}},
hu:{
"^":"d4;db,dx,dy,fr,fx,e,f,r,x,y,z,Q,ch,cx,cy,a,b,c,d",
I:function(a,b){var z=F.E(null)
z.a=F.j(102,170,170,170)
b.U(a,new F.v(0,0,600,600),z)},
ap:function(a,b,c,d,e,f,g){var z
if(c==="pointerup")z=d<0||600<d
else z=!1
if(z)this.dy.ar(this)
return!0},
dh:[function(a){P.K("## selectTip ########## "+a)
this.ey(a)
this.dy.ar(this)},"$1","gR",2,0,4],
ey:function(a){return this.fx.$1(a)}},
fN:{
"^":"d4;db,dx,dy,fr,fx,fy,go,e,f,r,x,y,z,Q,ch,cx,cy,a,b,c,d",
sbP:function(a){var z
if(a!=null){this.fy=a
this.go.Q=a.gcA()
z=this.go
z.y=a.e
z.z=a.f}},
I:function(a,b){var z=F.E(null)
z.a=F.j(102,170,170,170)
b.U(a,new F.v(0,0,600,600),z)},
ap:function(a,b,c,d,e,f,g){var z
if(c==="pointerup")z=d<0||600<d
else z=!1
if(z)this.dy.ar(this)
return!0},
fY:[function(a,b,c,d){var z=this.fy
if(z==null)return
z.saD(b)
this.fy.sfu(c)
this.fy.scA(d)},"$4","gfi",8,0,19]}}],["","",,Y,{
"^":"",
eS:{
"^":"a;a,b,c,d,e,f,r,x",
bI:function(a){var z,y
z=a.a
y=this.b.a
if(z!==y)return y
else{y=this.c.a
if(z!==y)return y}return},
ao:function(a){var z,y,x,w
z=[this.b,this.c]
for(y=0;y<2;++y){x=z[y]
w=x.cx
w.b=w.b.aL(w,this,x)}this.a.ao(1)},
dg:function(a,b,c,d,e){if(0<this.a.bM(a,b,c,d,e,this.bI(a)).length)return!0
else return!1},
fv:function(){var z,y,x
z=this.c.cx
y=[]
x=new Y.w(0,null,null,y)
x.a=4289374890
y.push(new Y.z(0,1,4294901760))
z.G(1,1,x)
x=this.c.cx
z=[]
y=new Y.w(0,null,null,z)
y.a=4289374890
z.push(new Y.z(0,1,4294901760))
x.G(1,2,y)
y=this.c.cx
x=[]
z=new Y.w(0,null,null,x)
z.a=4289374890
x.push(new Y.z(0,1,4294901760))
y.G(1,3,z)
z=this.c.cx
y=[]
y.push(new Y.z(-1,0,4294901760))
z.G(1,4,new Y.cv(C.i,4294967210,null,null,y))
y=this.b.cx
z=[]
x=new Y.w(0,null,null,z)
x.a=4289374890
z.push(new Y.z(0,1,4294901760))
y.G(1,1,x)
x=this.b.cx
y=[]
z=new Y.w(0,null,null,y)
z.a=4289374890
y.push(new Y.z(0,1,4294901760))
x.G(1,2,z)
z=this.b.cx
x=[]
y=new Y.w(0,null,null,x)
y.a=4289374890
x.push(new Y.z(0,1,4294901760))
z.G(1,3,y)
y=this.b.cx
z=[]
x=new Y.w(0,null,null,z)
x.a=4289374890
z.push(new Y.z(0,1,4294901760))
y.G(1,4,x)
x=this.b.cx
y=[]
y.push(new Y.z(1,0,4294901760))
y.push(new Y.z(-1,0,4294901760))
x.G(1,5,new Y.eW(4294963456,null,null,y))
y=this.b.cx
x=[]
z=new Y.w(0,null,null,x)
z.a=4278190320
x.push(new Y.z(1,0,4294901760))
y.G(2,5,z)
z=this.b.cx
y=[]
x=new Y.w(0,null,null,y)
x.a=4278190320
y.push(new Y.z(1,0,4294901760))
z.G(3,5,x)
x=this.b.cx
z=[]
y=new Y.w(0,null,null,z)
y.a=4278190320
z.push(new Y.z(0,1,4294901760))
x.G(4,5,y)},
dG:function(){var z,y
z=new Float64Array(H.i(3))
y=new E.A(new Float64Array(H.i(3)))
y.L(0,0,0)
y=new Y.cu(this,0,null,10,"none",new E.A(z),y,1,!1,0.6,0,0,0.8,"none")
y.cx=Y.ct(10,7)
y.Q=50
y.a="red"
this.b=y
y=new Float64Array(H.i(3))
z=new E.A(new Float64Array(H.i(3)))
z.L(0,0,0)
z=new Y.cu(this,0,null,10,"none",new E.A(y),z,1,!1,0.6,0,0,0.8,"none")
z.cx=Y.ct(10,7)
z.Q=50
z.a="blue"
this.c=z
z=this.a.b
z.push(this.b)
z.push(this.c)
z=new Float64Array(H.i(3))
y=new E.A(new Float64Array(H.i(3)))
y.L(0,0,0)
y=new Y.cs(10,"none",new E.A(z),y,1,!1,0.6,0,0,0.8,"none")
z[0]=100
z[1]=100
y.Q=3.5
this.d.push(y)},
static:{eT:function(){var z=new E.A(new Float64Array(H.i(3)))
z.L(0,0,0)
z=new Y.eS(new S.hy(z,[]),null,null,[],50,50,700,500)
z.dG()
return z}}},
eR:{
"^":"a;a,b,c,d,e,f"},
eU:{
"^":"a;a,b,c,F:d<,O:e<",
G:function(a,b,c){var z,y
z=this.c
y=this.d
if(typeof y!=="number")return H.l(y)
y=a+b*y
if(y<0||y>=z.length)return H.b(z,y)
z[y]=c
c.b=a
c.c=b},
dH:function(a,b){var z,y,x,w,v,u,t
z=this.d
y=this.e
if(typeof z!=="number")return z.q()
if(typeof y!=="number")return H.l(y)
y=z*y
z=new Y.w(0,null,null,[])
z.a=4294967295
z=P.fo(y,z,null)
this.c=z
x=0
while(!0){w=this.d
if(typeof w!=="number")return H.l(w)
if(!(x<w))break
v=new Y.w(0,null,null,[])
v.a=4289357414
u=x+0*w
if(u>=y)return H.b(z,u)
z[u]=v
v.b=x
v.c=0
v=this.e
if(typeof v!=="number")return v.Z();--v
u=new Y.w(0,null,null,[])
u.a=4289357414
w=x+v*w
if(w<0||w>=y)return H.b(z,w)
z[w]=u
u.b=x
u.c=v;++x}x=0
while(!0){v=this.e
if(typeof v!=="number")return H.l(v)
if(!(x<v))break
v=new Y.w(0,null,null,[])
v.a=4289357414
u=x*w
if(u>=y)return H.b(z,u)
z[u]=v
v.b=0
v.c=x
v=w-1
u=new Y.w(0,null,null,[])
u.a=4289357414
t=v+x*w
if(t<0||t>=y)return H.b(z,t)
z[t]=u
u.b=v
u.c=x;++x}z=[]
y=new Y.w(0,null,null,z)
y.a=4294901760
z.push(new Y.z(0,1,4294901760))
this.a=y
this.b=y
this.G(1,0,y)},
static:{ct:function(a,b){var z=new Y.eU(null,null,null,a,b)
z.dH(a,b)
return z}}},
cu:{
"^":"eV;cy,ch,cx,Q,a,b,c,d,e,f,r,x,y,z",
ao:function(a){var z,y,x,w,v
this.dB(a)
z=this.cy
y=z.e
x=this.b.a
w=x[0]
v=this.Q
if(y>w-v)x[0]=y+v
y+=z.r
if(y<x[0]+v)x[0]=y-v
y=z.f
if(y>x[1]-v)x[1]=y+v
z=y+z.x
if(z<x[1]+v)x[1]=z-v},
eo:function(a){var z=Math.cos(H.q(this.ch))
this.c.a[0]=a*z
z=Math.sin(H.q(this.ch))
this.c.a[1]=a*z},
fB:function(a,b){var z=Math.sin(H.q(this.ch))
this.c.a[0]=-1*b*z
z=Math.cos(H.q(this.ch))
this.c.a[1]=b*z},
fe:function(a,b){var z=Math.sin(H.q(this.ch))
this.c.a[0]=b*z
z=Math.cos(H.q(this.ch))
this.c.a[1]=-1*b*z},
ep:function(a){var z,y
z=-1*a
y=Math.cos(H.q(this.ch))
this.c.a[0]=z*y
y=Math.sin(H.q(this.ch))
this.c.a[1]=z*y},
d4:function(a){this.ch+=a},
ew:function(a,b,c,d){var z,y,x,w,v
z=this.cy
if(z.a.bM(this,a,b,0,c,z.bI(this)).length>0){P.K("-----------true")
y=new Float64Array(H.i(3))
x=new Float64Array(H.i(3))
w=new E.A(x)
w.L(0,0,0)
v=this.b.a
y[0]=v[0]
y[1]=v[1]
x[0]=Math.cos(H.q(a))
x[1]=Math.sin(H.q(a))
z.d.push(new Y.cs(10,"none",new E.A(y),w,1,!1,0.6,0,0,0.8,"none"))}else P.K("-----------false")}},
cs:{
"^":"br;Q,a,b,c,d,e,f,r,x,y,z",
gA:function(a){return this.c.a[0]},
gw:function(a){return this.c.a[1]},
sA:function(a,b){this.c.a[0]=b},
sw:function(a,b){this.c.a[1]=b}},
eV:{
"^":"br;aD:ch@",
gA:function(a){return this.c.a[0]},
gw:function(a){return this.c.a[1]},
sA:function(a,b){this.c.a[0]=b},
sw:function(a,b){this.c.a[1]=b}},
w:{
"^":"a;a,b,c,d",
aL:function(a,b,c){var z,y,x,w,v,u
switch(this.a){case 4294967295:case 4289357414:return a.a
case 4289374890:case 4294901760:z=this.b
y=this.d
x=J.R(C.a.gC(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.l(x)
w=this.c
y=J.W(C.a.gC(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.l(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.l(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.b(v,u)
return v[u]
case 4278190320:c.eo(3)
z=this.b
y=this.d
x=J.R(C.a.gC(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.l(x)
w=this.c
y=J.W(C.a.gC(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.l(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.l(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.b(v,u)
return v[u]
case 4278190321:c.fB(0,1)
z=this.b
y=this.d
x=J.R(C.a.gC(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.l(x)
w=this.c
y=J.W(C.a.gC(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.l(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.l(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.b(v,u)
return v[u]
case 4278190322:c.fe(0,1)
z=this.b
y=this.d
x=J.R(C.a.gC(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.l(x)
w=this.c
y=J.W(C.a.gC(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.l(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.l(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.b(v,u)
return v[u]
case 4278190323:c.ep(1.5)
z=this.b
y=this.d
x=J.R(C.a.gC(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.l(x)
w=this.c
y=J.W(C.a.gC(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.l(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.l(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.b(v,u)
return v[u]}return}},
eY:{
"^":"a;a",
i:function(a){return C.y.h(0,this.a)}},
cv:{
"^":"w;e,a,b,c,d",
aL:function(a,b,c){var z,y,x,w,v,u
c.d4(0.07853981633974483)
z=this.b
y=this.d
x=J.R(C.a.gC(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.l(x)
w=this.c
y=J.W(C.a.gC(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.l(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.l(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.b(v,u)
return v[u]}},
eZ:{
"^":"w;e,a,b,c,d",
aL:function(a,b,c){var z,y,x,w,v,u
c.d4(-0.07853981633974483)
z=this.b
y=this.d
x=J.R(C.a.gC(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.l(x)
w=this.c
y=J.W(C.a.gC(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.l(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.l(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.b(v,u)
return v[u]}},
eW:{
"^":"w;a,b,c,d",
aL:function(a,b,c){var z,y,x,w,v,u,t
z=b.dg(c,c.ch,0.7853981633974483,0,500)
y=this.b
x=this.d
if(z){if(0>=x.length)return H.b(x,0)
w=J.R(x[0])
if(typeof y!=="number")return y.j()
if(typeof w!=="number")return H.l(w)
v=this.c
if(0>=x.length)return H.b(x,0)
x=J.W(x[0])
if(typeof v!=="number")return v.j()
if(typeof x!=="number")return H.l(x)
u=a.c
t=a.d
if(typeof t!=="number")return H.l(t)
t=y+w+(v+x)*t
if(t>>>0!==t||t>=u.length)return H.b(u,t)
return u[t]}else{if(1>=x.length)return H.b(x,1)
w=J.R(x[1])
if(typeof y!=="number")return y.j()
if(typeof w!=="number")return H.l(w)
v=this.c
if(1>=x.length)return H.b(x,1)
x=J.W(x[1])
if(typeof v!=="number")return v.j()
if(typeof x!=="number")return H.l(x)
u=a.c
t=a.d
if(typeof t!=="number")return H.l(t)
t=y+w+(v+x)*t
if(t>>>0!==t||t>=u.length)return H.b(u,t)
return u[t]}}},
eX:{
"^":"w;aD:e?,fu:f?,cA:r@,x,a,b,c,d",
aL:function(a,b,c){var z,y,x,w,v,u
c.ew(this.e,this.f,this.r,this.x)
z=this.b
y=this.d
x=J.R(C.a.gC(y))
if(typeof z!=="number")return z.j()
if(typeof x!=="number")return H.l(x)
w=this.c
y=J.W(C.a.gC(y))
if(typeof w!=="number")return w.j()
if(typeof y!=="number")return H.l(y)
v=a.c
u=a.d
if(typeof u!=="number")return H.l(u)
u=z+x+(w+y)*u
if(u>>>0!==u||u>=v.length)return H.b(v,u)
return v[u]}},
z:{
"^":"a;A:a*,w:b*,c"}}],["","",,T,{
"^":"",
fu:{
"^":"Y;e,a,b,c,d",
I:function(a,b){var z,y,x,w,v,u,t,s
z=F.E(null)
z.a=F.j(255,255,255,0)
y=new F.v(-50,-50,100,100)
for(x=this.e.f.d,w=x.length,v=0;v<x.length;x.length===w||(0,H.a2)(x),++v){u=x[v]
t=u.b
t=t.ga2(t)
s=u.r
y.a=t-s
y.b=u.b.a[1]-s
s=u.Q
y.c=s*2
y.d=s*2
b.cB(a,y,z)}}},
fv:{
"^":"Y;e,f,r,a,b,c,d",
I:function(a,b){var z,y,x,w
z=J.S(this.f.gF())
y=J.S(this.f.gO())
x=F.E(null)
w=this.f
if(w!=null)b.av(a,w,new F.v(0,0,z,y),new F.v(-50,-50,100,100),x)},
aM:function(a,b){var z,y,x
z=new E.n(new Float64Array(H.i(16)))
z.n()
this.c=z
y=this.r
x=y.b.a
z.E(0,x[0],x[1],1)
this.c.d_(y.ch)},
dJ:function(a,b,c){this.e.a.a0(c).aP(new T.fw(this))},
static:{cR:function(a,b,c){var z=new E.n(new Float64Array(H.i(16)))
z.n()
z=new T.fv(a,null,b,"none",null,z,!1)
z.b=[]
z.dJ(a,b,c)
return z}}},
fw:{
"^":"d:5;a",
$1:function(a){this.a.f=a}},
fx:{
"^":"Y;e,f,r,x,a,b,c,d",
cN:function(){var z,y,x
P.K("--------------------------init()")
z=this.e.f
y=z.b
y.ch=0
x=y.c.a
x[0]=0
x[1]=0
y=y.b.a
y[0]=200
y[1]=300
z=z.c
z.ch=3.141592653589793
y=z.c.a
y[0]=0
y[1]=0
z=z.b.a
z[0]=700
z[1]=300},
I:function(a,b){var z,y,x
z=this.f
if(z!=null){z=J.S(z.gF())
y=J.S(this.f.gO())
x=F.E(null)
b.av(a,this.f,new F.v(0,0,z,y),new F.v(0,0,800,600),x)}z=this.e.f
x=F.E(null)
x.a=F.j(170,255,255,0)
x.b=C.e
x.c=5
b.U(a,new F.v(50,50,z.r,z.x),x)},
aM:function(a,b){this.e.f.ao(b)},
cV:[function(a){var z
P.K("### "+a)
switch(a){case"back_button":z=this.e
z.e.gD().ai()
z.e.gD().ah(z.c)
break
case"prog_button":z=this.e
z.e.gD().ai()
z.e.gD().ah(z.d)
break}},"$1","gX",2,0,4],
dK:function(a){var z,y,x,w,v,u,t
z=this.e
z.a.a0("assets/bg_play.png").aP(new T.fz(this))
this.r=T.cR(z,z.f.c,"assets/ch_iron.png")
this.x=T.cR(z,z.f.b,"assets/ch_iron2.png")
this.b.push(this.r)
this.b.push(this.x)
y=this.b
x=new E.n(new Float64Array(H.i(16)))
x.n()
x=new T.fu(z,"none",null,x,!1)
x.b=[]
y.push(x)
z=this.b
y=this.gX()
x=F.j(170,255,170,204)
w=F.j(170,204,170,255)
v=F.j(170,204,255,170)
u=new E.n(new Float64Array(H.i(16)))
u.n()
t=new F.aL(200,120,!1,!1,"back_button",x,w,v,y,0,0,0,0,"none",null,u,!1)
t.b=[]
y=new E.n(new Float64Array(H.i(16)))
y.n()
y.a4(30,480,0)
t.c=y
t.Q=F.j(34,255,0,0)
t.z=F.j(0,0,0,255)
t.ch=F.j(17,0,255,0)
z.push(t)
z=this.b
y=this.gX()
x=F.j(170,255,170,204)
w=F.j(170,204,170,255)
v=F.j(170,204,255,170)
u=new E.n(new Float64Array(H.i(16)))
u.n()
t=new F.aL(200,120,!1,!1,"prog_button",x,w,v,y,0,0,0,0,"none",null,u,!1)
t.b=[]
y=new E.n(new Float64Array(H.i(16)))
y.n()
y.a4(570,480,0)
t.c=y
t.Q=F.j(34,255,0,0)
t.z=F.j(0,0,0,255)
t.ch=F.j(17,0,255,0)
z.push(t)},
static:{fy:function(a){var z=new E.n(new Float64Array(H.i(16)))
z.n()
z=new T.fx(a,null,null,null,"none",null,z,!1)
z.b=[]
z.dK(a)
return z}}},
fz:{
"^":"d:5;a",
$1:function(a){this.a.f=a}}}],["","",,P,{
"^":"",
iI:function(a){var z={}
a.J(0,new P.iJ(z))
return z},
iK:function(a){return a},
cl:function(){var z=$.ck
if(z==null){z=J.bi(window.navigator.userAgent,"Opera",0)
$.ck=z}return z},
eH:function(){var z,y
z=$.ch
if(z!=null)return z
y=$.ci
if(y==null){y=J.bi(window.navigator.userAgent,"Firefox",0)
$.ci=y}if(y===!0)z="-moz-"
else{y=$.cj
if(y==null){y=P.cl()!==!0&&J.bi(window.navigator.userAgent,"Trident/",0)
$.cj=y}if(y===!0)z="-ms-"
else z=P.cl()===!0?"-o-":"-webkit-"}$.ch=z
return z},
iJ:{
"^":"d:20;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
kt:[function(){var z,y,x
P.K("--------1-dart hello ( 1 )")
z=new G.ha(700,500,P.cE())
y=new Y.eR(z,null,null,null,null,null)
y.f=Y.eT()
y.b=T.fy(y)
y.c=U.fP(y)
y.d=M.fC(y)
x=new E.n(new Float64Array(H.i(16)))
x.n()
x=new F.hb(800,600,1,1,1,0,0,null,"none",null,x,!1)
x.b=[]
x.ch=F.j(255,238,238,255)
y.e=G.hm(z,x,400,600)
y.f.fv()
z=y.e
if(!z.b){z.b=!0
z.aS()}y.e.gD().b.push(y.c)
P.K("--------1-dart hello ( 2 ) ")},"$0","dM",0,0,1]},1],["","",,U,{
"^":"",
fO:{
"^":"Y;e,f,a,b,c,d",
I:function(a,b){var z,y,x
z=this.f
if(z!=null){z=J.S(z.gF())
y=J.S(this.f.gO())
x=F.E(null)
b.av(a,this.f,new F.v(0,0,z,y),new F.v(0,0,800,600),x)}},
cV:[function(a){var z=this.e
z.e.gD().ai()
z.e.gD().ah(z.b)},"$1","gX",2,0,4],
dM:function(a){var z,y,x,w,v,u
z=this.gX()
y=F.j(170,255,170,204)
x=F.j(170,204,170,255)
w=F.j(170,204,255,170)
v=new E.n(new Float64Array(H.i(16)))
v.n()
u=new F.aL(600,200,!1,!1,"start_button",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
z=new E.n(new Float64Array(H.i(16)))
z.n()
z.a4(100,300,0)
u.c=z
u.Q=F.j(34,255,0,0)
u.z=F.j(0,0,0,255)
u.ch=F.j(17,0,255,0)
this.b.push(u)
this.e.a.a0("assets/bg_start.png").aP(new U.fQ(this))},
static:{fP:function(a){var z=new E.n(new Float64Array(H.i(16)))
z.n()
z=new U.fO(a,null,"none",null,z,!1)
z.b=[]
z.dM(a)
return z}}},
fQ:{
"^":"d:5;a",
$1:function(a){this.a.f=a}}}],["","",,F,{
"^":"",
aL:{
"^":"Y;F:e<,O:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
cs:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
ap:function(a,b,c,d,e,f,g){var z
switch(c){case"pointerdown":if(this.cs(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.cy=0
this.db=0}break
case"pointermove":if(this.cs(d,e)){this.x=!0
this.cy=C.d.j(this.cy,f.Z(0,this.dx))
this.db=C.d.j(this.db,g.Z(0,this.dy))
z=this.cy
if(!(Math.sqrt(H.q(z*z))>this.e)){z=this.db
z=Math.sqrt(H.q(z*z))>this.f}else z=!0
if(z){this.r=!1
this.x=!1}}else{this.r=!1
this.x=!1}break
case"pointerup":if(this.r&&!0)P.eN(new F.h6(this),null)
this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
I:["dD",function(a,b){var z=F.E(null)
if(this.r){z.a=this.Q
b.U(a,new F.v(0,0,this.e,this.f),z)}else if(this.x){z.a=this.ch
b.U(a,new F.v(0,0,this.e,this.f),z)}else{z.a=this.z
b.U(a,new F.v(0,0,this.e,this.f),z)}}],
fj:function(a){return this.cx.$1(a)}},
h6:{
"^":"d:0;a",
$0:function(){var z=this.a
z.fj(z.y)}},
hc:{
"^":"aL;fr,fx,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
I:function(a,b){var z,y,x,w,v
this.dD(a,b)
z=F.E(null)
z.a=F.j(102,170,170,170)
b.U(a,new F.v(100,0,600,600),z)
y=J.S(this.fr.gF())
x=J.S(this.fr.gO())
w=this.e
v=this.f
b.av(a,this.fr,new F.v(0,0,y,x),new F.v(0,0,w,v),z)},
dP:function(a,b,c,d,e,f){this.z=F.j(255,170,170,170)
this.fx.a0(c).aP(new F.hd(this))},
static:{U:function(a,b,c,d,e,f){var z,y,x,w
z=F.j(170,255,170,204)
y=F.j(170,204,170,255)
x=F.j(170,204,255,170)
w=new E.n(new Float64Array(H.i(16)))
w.n()
w=new F.hc(null,a,d,e,!1,!1,b,z,y,x,f,0,0,0,0,"none",null,w,!1)
w.b=[]
w.dP(a,b,c,d,e,f)
return w}}},
hd:{
"^":"d:5;a",
$1:function(a){this.a.fr=a}},
h7:{
"^":"a;",
cX:function(a){var z=this.b
if(0>=z.length)return H.b(z,0)
z.pop()
if(z.length>0)this.aE(a,C.a.ga8(z))
else{z=a.a
this.aE(a,new F.v(0,0,z.c,z.d))}}},
h8:{
"^":"Y;e,f,r,x,y,z,Q,ch,cx,a,b,c,d",
ap:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=this.fk(a,b,c,d,e,f,g)
y=this.fn(a,b,c,d,e,f,g)
x=this.fl(a,b,c,d,e,f,g)
w=""+z+" "+y+" "
v=!z
P.K(w+(!v||y))
return!v||y||x},
fk:function(a,b,c,d,e,f,g){var z,y,x
z=this.f/2
y=d-z
x=e-z
if(Math.sqrt(H.q(y*y+x*x))<z){y=Math.atan2(H.q(x),H.q(y))+1.5707963267948966
this.y=y
this.br(this.e,y,this.z,this.Q)
return!0}return!1},
fn:function(a,b,c,d,e,f,g){var z=this.f
if(z<d&&d<z+this.r)if(0<e&&e<z){z=e/z*3.141592653589793
this.z=z
this.br(this.e,this.y,z,this.Q)
return!0}return!1},
fl:function(a,b,c,d,e,f,g){var z,y,x
z=this.f
y=this.r
x=z+y
if(x<d&&d<x+y)if(0<e&&e<z){z=e/z
this.Q=z
this.br(this.e,this.y,this.z,z)
return!0}return!1},
I:function(a,b){var z,y,x,w,v,u,t,s
this.fq(a,b)
z=F.E(null)
z.b=C.e
y=this.r
x=y/3
z.c=x
w=this.ch
z.a=w
v=this.f
u=y/2
t=v+u
b.N(a,new F.y(t,0),new F.y(t,v),z)
s=0+v*(this.z/3.141592653589793)
b.N(a,new F.y(t,s-10),new F.y(t,s+10),z)
z=F.E(null)
z.b=C.e
z.c=x
z.a=w
t=v+y+u
b.N(a,new F.y(t,0),new F.y(t,v),z)
v=0+v*this.Q
b.N(a,new F.y(t,v-10),new F.y(t,v+10),z)},
fq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=F.E(null)
z.b=C.e
y=this.f
b.cB(a,new F.v(0,0,y,y),z)
z.a=this.ch
x=y/2
z.c=15
b.N(a,new F.y(x,x),new F.y(x+this.Q*x*Math.cos(H.q(this.y-1.5707963267948966)),x+this.Q*x*Math.sin(H.q(this.y-1.5707963267948966))),z)
for(w=x,v=w,u=0;u<20;++u,w=p,v=q){z.c=2.5
y=this.Q
t=this.y
s=this.z
r=u/19
q=x+y*x*Math.cos(t-s+s*2*r-1.5707963267948966)
y=this.Q
t=this.y
s=this.z
p=x+y*x*Math.sin(t-s+s*2*r-1.5707963267948966)
b.ak(a,[v,w,0,q,p,0],[0,1],z.a,C.e,z.c)}z.c=2.5
b.N(a,new F.y(x,x),new F.y(x+this.Q*x*Math.cos(H.q(this.y-this.z-1.5707963267948966)),x+this.Q*x*Math.sin(H.q(this.y-this.z-1.5707963267948966))),z)
z.c=2.5
b.N(a,new F.y(x,x),new F.y(x+this.Q*x*Math.cos(H.q(this.y+this.z-1.5707963267948966)),x+this.Q*x*Math.sin(H.q(this.y+this.z-1.5707963267948966))),z)},
br:function(a,b,c,d){return this.cx.$4(a,b,c,d)}},
Y:{
"^":"a;cM:c<",
ah:function(a){var z=0,y=new P.ag(),x=1,w,v=this,u,t,s,r
function $async$ah(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.f(new s.C(0,r.m,null),[null])
t=u
t.aA(null)
z=2
return H.t(u,$async$ah,y)
case 2:t=v
t=t.b
t.push(a)
return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$ah,y,null)},
ar:function(a){var z=0,y=new P.ag(),x=1,w,v=this,u,t,s
function $async$ar(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.C(0,s.m,null)
u.$builtinTypeInfo=[null]
t=u
t.aA(null)
z=2
return H.t(u,$async$ar,y)
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
t.aq(u,a)
t=a
t.d5()
return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$ar,y,null)},
ai:function(){var z=0,y=new P.ag(),x=1,w,v=this,u,t,s,r,q,p
function $async$ai(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.f(new q.C(0,p.m,null),[null])
r=u
r.aA(null)
z=2
return H.t(u,$async$ai,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.ar(u[s])
case 4:r=u.length===t
if(r)b=r
else{z=6
break}z=7
break
case 6:r=H
b=(0,r.a2)(u)
case 7:b,++s
z=3
break
case 5:return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$ai,y,null)},
cE:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a2)(z),++x)z[x].cE(a)},
aM:function(a,b){},
d3:function(a,b){var z,y,x
this.bu()
this.aM(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a2)(z),++x)z[x].d3(a,b)},
I:function(a,b){},
b3:["bQ",function(a,b){var z,y,x,w,v,u
this.bu()
this.I(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.a2)(z),++w){v=z[w]
u=v.gcM()
x.push(C.a.ga8(x).q(0,u))
b.ab()
v.b3(a,b)
if(0>=x.length)return H.b(x,0)
x.pop()
b.ab()}}],
bF:["ae",function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
this.bu()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.b(y,w)
v=y[w]
a.aa(v.gcM())
u=v.bF(a,b,c,d,e)
a.a9()
if(u===!0)return u}t=a.bJ().aX(0)
t.cF()
y=new E.A(new Float64Array(H.i(3)))
y.L(d,e,0)
s=t.q(0,y)
r=this.ap(a,b,c,s.ga2(s),s.gac(s),d,e)
this.cW(0,a,b,c,d,e)
return r}],
ap:function(a,b,c,d,e,f,g){return!1},
cW:function(a,b,c,d,e,f){},
d5:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a2)(z),++x)z[x].d5()
this.d=!1},
cN:function(){},
bu:function(){if(!this.d){this.d=!0
this.cN()}}},
h9:{
"^":"a;",
a0:function(a){var z=0,y=new P.ag(),x,w=2,v,u=this,t,s,r,q
function $async$a0(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.aY(a)?3:4
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
return H.t(q.b_(a),$async$a0,y)
case 5:s.v(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$a0,y,null)},
dd:function(a){var z=this.a
if(z.aY(a))return z.h(0,a)
this.a0(a)
return}},
v:{
"^":"a;a,b,F:c<,O:d<"},
y:{
"^":"a;a,b"},
d3:{
"^":"a;a",
i:function(a){return C.z.h(0,this.a)}},
d2:{
"^":"a;a,b,c",
dQ:function(a){if(this.a==null)this.a=F.j(255,255,255,255)},
static:{E:function(a){var z=new F.d2(a,C.k,1)
z.dQ(a)
return z}}},
bM:{
"^":"a;a",
dO:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{j:function(a,b,c,d){var z=new F.bM(0)
z.dO(a,b,c,d)
return z}}},
bN:{
"^":"a;"},
hb:{
"^":"Y;F:e<,O:f<,r,x,y,z,Q,ch,a,b,c,d",
bF:function(a,b,c,d,e){a.aa(this.c)
this.ae(a,b,c,d,e)
a.a9()},
aM:function(a,b){var z,y,x,w
z=a.gF()
y=a.gfp(a)
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
y=new E.n(new Float64Array(H.i(16)))
y.n()
this.c=y
y.E(0,this.z,this.Q,0)
y=this.c
x=this.y
y.bL(0,x,x,1)},
b3:function(a,b){var z,y,x
z=new F.v(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.ga8(x).q(0,y))
b.ab()
b.b.push(z)
b.aE(a,z)
this.bQ(a,b)
b.cX(a)
if(0>=x.length)return H.b(x,0)
x.pop()
b.ab()},
I:function(a,b){var z,y
z=new F.v(0,0,this.e,this.f)
y=F.E(null)
y.a=this.ch
b.aE(a,z)
b.U(a,z,y)}},
d4:{
"^":"Y;A:e*,w:f*",
aM:function(a,b){var z,y,x
z=this.e*=0.9
y=this.f
if(typeof y!=="number")return y.q()
y*=0.9
this.f=y
z=this.r+=z
y=this.x+=y
x=-1*(this.Q-this.y)
if(z<x)this.e=(x-z)/10
x=-1*(this.ch-this.z)
if(y<x)this.f=(x-y)/10
if(y>0)this.f=(0-y)/10
if(z>0)this.e=(0-z)/10},
cW:function(a,b,c,d,e,f){var z,y
z=b.bJ().aX(0)
z.cF()
y=new E.A(new Float64Array(H.i(3)))
y.L(e,f,0)
z.q(0,y)
switch(d){case"pointerdown":this.cx=e
this.cy=f
break
case"pointermove":this.e=e.Z(0,this.cx).q(0,2.2)
this.f=f.Z(0,this.cy).q(0,2.2)
this.cx=e
this.cy=f
break}},
bF:function(a,b,c,d,e){var z,y
z=new E.n(new Float64Array(H.i(16)))
z.n()
z.E(0,this.r,this.x,0)
a.aa(z)
y=this.ae(a,b,c,d,e)
a.a9()
P.K("---"+H.c(y))
return y},
b3:function(a,b){var z,y,x
z=new F.v(0,0,this.y,this.z)
b.b.push(z)
b.aE(a,z)
y=new E.n(new Float64Array(H.i(16)))
y.n()
y.E(0,this.r,this.x,0)
x=b.a
x.push(C.a.ga8(x).q(0,y))
b.ab()
this.bQ(a,b)
if(0>=x.length)return H.b(x,0)
x.pop()
b.ab()
b.cX(a)},
I:function(a,b){}},
he:{
"^":"Y;e,f,r,x,a,b,c,d",
ap:function(a,b,c,d,e,f,g){if(this.e<this.f)return this.fo(a,b,c,d,e,f,g)
else return this.fm(a,b,c,d,e,f,g)},
I:function(a,b){var z,y,x,w,v,u
z=this.e
y=this.f
x=this.x
if(z<y){w=F.E(null)
w.b=C.e
w.c=z
w.a=x
v=z/2
b.N(a,new F.y(v,0),new F.y(v,y),w)
z=0+y*this.r
b.N(a,new F.y(v,z-10),new F.y(v,z+10),w)}else{w=F.E(null)
w.b=C.e
w.c=y
w.a=x
u=y/2
b.N(a,new F.y(0,u),new F.y(z,u),w)
z=0+z*this.r
b.N(a,new F.y(z-10,u),new F.y(z+10,u),w)}},
fm:function(a,b,c,d,e,f,g){if(0<=d&&d<=this.e)if(0<=e&&e<=this.f){this.r=d/this.e
return!0}return!1},
fo:function(a,b,c,d,e,f,g){if(0<=d&&d<=this.e)if(0<=e&&e<=this.f){this.r=e/this.f
return!0}return!1}},
hf:{
"^":"a;",
gD:function(){return this.c$},
sD:function(a){this.c$=a},
cH:function(a){if(!this.e$){this.c$.cE(this)
this.e$=!0}this.c$.d3(this,a)
this.ff()},
aa:function(a){var z=this.f$
z.push(C.a.ga8(z).q(0,a))},
a9:function(){var z=this.f$
if(0>=z.length)return H.b(z,0)
z.pop()},
bJ:function(){return C.a.ga8(this.f$)}}}],["","",,G,{
"^":"",
bO:function(a){var z=0,y=new P.ag(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bO(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.f(new p.dn(o.f(new n.C(0,m.m,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.en(t,a)
q=J
s=q.k(t)
q=s
r=q.gby(t)
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
m=m.a1(new l.hj(u,t))
l=r
p=new p.a0(0,o,n,m,l.c)
o=H
q=q.f(p,[o.M(r,0)])
q.M()
q=s
s=q.gbx(t)
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
m=m.a1(new l.hk(a,u))
l=s
p=new p.a0(0,o,n,m,l.c)
o=H
q=q.f(p,[o.M(s,0)])
q.M()
q=u
x=q.a
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$bO,y,null)},
d5:function(a,b,c){var z,y,x
z=G.d8(a,35633,b)
y=G.d8(a,35632,c)
x=J.e4(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
d8:function(a,b,c){var z,y
z=J.e5(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.c(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
d6:function(a,b){var z=J.bj(a)
a.bindBuffer(34962,z)
a.bufferData(34962,new Float32Array(H.au(b)),35044)
a.bindBuffer(34962,null)
return z},
d7:function(a,b){var z=J.bj(a)
a.bindBuffer(34963,z)
a.bufferData(34963,new Uint16Array(H.au(b)),35044)
a.bindBuffer(34963,null)
return z},
ha:{
"^":"h9;m:b>,l:c>,a",
b_:function(a){var z=0,y=new P.ag(),x,w=2,v,u,t
function $async$b_(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.t(t.bO(a),$async$b_,y)
case 3:x=new u.hi(c)
z=1
break
case 1:return H.t(x,0,y,null)
case 2:return H.t(v,1,y)}}return H.t(null,$async$b_,y,null)}},
hi:{
"^":"bN;eX:a<",
gF:function(){return J.ei(this.a)},
gO:function(){return J.ea(this.a)}},
hl:{
"^":"fs;a,b,c,d,e,a$,b$,c$,d$,e$,f$",
gF:function(){return this.a.c},
gO:function(){return this.a.d},
gfp:function(a){return 0},
ff:function(){this.e=!0},
aS:function(){var z=0,y=new P.ag(),x=1,w,v=this,u,t,s,r,q,p,o,n,m
function $async$aS(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:n=H
n=n
m=P
u=n.bG(new m.aV(Date.now(),!1))
n=H
n=n
m=P
t=n.bG(new m.aV(Date.now(),!1))
case 2:n=v
if(!n.b){z=4
break}n=P
n=n
m=P
z=5
return H.t(n.eO(new m.aG(4e4),null,null),$async$aS,y)
case 5:s=Date.now()
n=P
r=new n.aV(s,!1)
if(r.date===void 0)r.date=new Date(s)
else ;q=r.date.getMilliseconds()+0
p=(q-t)/2
s=t-u
n=v
n=n
m=C
m=m.b
n.cH(m.a1(s+p))
n=v
n=n
m=C
m=m.b
n.cH(m.a1(s+p*2))
n=v
n.e=!0
n=v
s=n.gD()
n=v
r=n.a
n=E
o=new n.n(new Float64Array(16))
n=o
n.n()
n=G
o=new n.hg(null,null,null,null,[o],[])
n=o
m=r
n.c=m.a
n=o
n.d=r
n=o
n.f6()
n=o
n.a7(0)
n=s
n.b3(v,o)
n=v
n.e=!1
case 3:t=q
z=2
break
case 4:return H.t(null,0,y,null)
case 1:return H.t(w,1,y)}}return H.t(null,$async$aS,y,null)},
fH:function(){var z,y
z={}
z.a=!1
y=J.eb(this.a.b)
H.f(new W.a0(0,y.a,y.b,W.a1(new G.hn(z,this)),y.c),[H.M(y,0)]).M()
y=J.eh(this.a.b)
H.f(new W.a0(0,y.a,y.b,W.a1(new G.ho(z,this)),y.c),[H.M(y,0)]).M()
y=J.ec(this.a.b)
H.f(new W.a0(0,y.a,y.b,W.a1(new G.hp(z)),y.c),[H.M(y,0)]).M()
y=J.ed(this.a.b)
H.f(new W.a0(0,y.a,y.b,W.a1(new G.hq(z,this)),y.c),[H.M(y,0)]).M()
y=J.ee(this.a.b)
H.f(new W.a0(0,y.a,y.b,W.a1(new G.hr(z,this)),y.c),[H.M(y,0)]).M()
y=J.ef(this.a.b)
H.f(new W.a0(0,y.a,y.b,W.a1(new G.hs(z,this)),y.c),[H.M(y,0)]).M()
y=J.eg(this.a.b)
H.f(new W.a0(0,y.a,y.b,W.a1(new G.ht(z)),y.c),[H.M(y,0)]).M()},
dR:function(a,b,c,d){var z,y
P.K("--------new stage")
z=new G.hh(null,null,null,null)
z.c=d
z.d=c
y=C.d.a1(d)
y=W.ev(C.d.a1(c),y)
z.b=y
document.body.appendChild(y)
z.a=J.ej(y,!0)
this.a=z
this.sD(b)
this.fH()},
static:{hm:function(a,b,c,d){var z=new E.n(new Float64Array(H.i(16)))
z.n()
z=new G.hl(null,!1,0,a,!1,!1,0,null,!1,!1,[z])
z.dR(a,b,c,d)
return z}}},
fs:{
"^":"a+hf;"},
hn:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gD()
x=a.gb1().P(0)
w=a.gb2().P(0)
z.aa(y.c)
y.ae(z,0,"pointerdown",x,w)
z.a9()}},
ho:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gD()
w=a.gb1().P(0)
v=a.gb2().P(0)
y.aa(x.c)
x.ae(y,0,"pointerup",w,v)
y.a9()
z.a=!1}}},
hp:{
"^":"d:3;a",
$1:function(a){if(this.a.a);}},
hq:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gD()
w=a.gb1().P(0)
v=a.gb2().P(0)
y.aa(x.c)
x.ae(y,0,"pointercancel",w,v)
y.a9()
z.a=!1}}},
hr:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gD()
x=a.gb1().P(0)
w=a.gb2().P(0)
z.aa(y.c)
y.ae(z,0,"pointermove",x,w)
z.a9()}}},
hs:{
"^":"d:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gD()
w=a.gb1().P(0)
v=a.gb2().P(0)
y.aa(x.c)
x.ae(y,0,"pointercancel",w,v)
y.a9()
z.a=!1}}},
ht:{
"^":"d:3;a",
$1:function(a){if(this.a.a);}},
hh:{
"^":"a;a,b,c,l:d>"},
hg:{
"^":"h7;c,d,e,f,a,b",
f6:function(){var z,y
z=C.a.aZ(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.a.aZ(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.d5(this.c,z,y)
z=C.a.aZ(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.a.aZ(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.d5(this.c,z,y)},
a7:function(a){J.c9(this.c,2960)
J.e7(this.c,515)
J.e0(this.c,0,0,0,1)
J.e1(this.c,1)
J.e2(this.c,0)
J.c9(this.c,3042)
J.dY(this.c,770,771)
J.e_(this.c,17664)},
cn:function(){var z,y
z=new E.n(new Float64Array(H.i(16)))
z.n()
z=z.E(0,-1,1,0)
y=this.d
return z.bL(0,2/y.c,-2/y.d,1).q(0,C.a.ga8(this.a))},
U:function(a,b,c){var z,y,x,w
z=b.a
y=b.b
x=z+b.c
w=y+b.d
this.ak(a,[z,y,0,z,w,0,x,y,0,x,w,0],[0,1,3,2],c.a,c.b,c.c)},
N:function(a,b,c,d){this.ak(a,[b.a,b.b,0,c.a,c.b,0],[0,1],d.a,C.e,d.c)},
cB:function(a,b,c){var z,y,x,w,v,u,t,s
z=b.a
y=b.c/2
x=z+y
z=b.b
w=b.d/2
v=z+w
u=[]
t=[]
for(s=0;s<50;++s){t.push(s)
z=6.283185307179586*(s/50)
u.push(x+Math.cos(z)*y)
u.push(v+Math.sin(z)*w)
u.push(0)}this.ak(a,u,t,c.a,c.b,c.c)},
ak:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
J.bn(this.c,this.e)
z=G.d6(this.c,b)
J.aA(this.c,34962,z)
y=G.d7(this.c,c)
J.aA(this.c,34963,y)
x=this.c
w=this.e
v=this.cn()
x.uniformMatrix4fv(J.aC(x,w,"u_mat"),!1,new Float32Array(H.au(v.gp())))
v=this.c
w=this.e
x=d.a
v.uniform4fv(J.aC(v,w,"color"),new Float32Array(H.au([(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255])))
x=this.c
x.uniform1f(J.aC(x,this.e,"u_point_size"),f)
u=J.bm(this.c,this.e,"vp")
J.bo(this.c,u,3,5126,!1,0,0)
J.bk(this.c,u)
if(e===C.k)t=6
else{J.ek(this.c,f)
t=2}J.c8(this.c,t,b.length/3|0,5123,0)
J.bn(this.c,null)},
aE:function(a,b){var z
J.c6(this.c,!1,!1,!1,!1)
J.c7(this.c,!1)
J.cc(this.c,7680,7681,7681)
J.cb(this.c,519,1,255)
z=F.E(null)
z.a=F.j(255,255,255,255)
this.U(null,b,z)
J.c6(this.c,!0,!0,!0,!0)
J.c7(this.c,!0)
J.cc(this.c,7680,7680,7680)
J.cb(this.c,514,1,255)},
av:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
J.bn(this.c,this.f)
z=J.bm(this.c,this.f,"a_tex")
y=J.bj(this.c)
J.aA(this.c,34962,y)
J.dZ(this.c,34962,new Float32Array(H.au([0,0,0,1,1,0,1,1])),35044)
J.bk(this.c,z)
J.bo(this.c,z,2,5126,!1,0,0)
x=J.e6(this.c)
J.dX(this.c,3553,x)
J.aT(this.c,3553,10242,33071)
J.aT(this.c,3553,10243,33071)
J.aT(this.c,3553,10241,9728)
J.aT(this.c,3553,10240,9728)
J.ep(this.c,3553,0,6408,6408,5121,b.geX())
w=d.a
v=d.b
u=w+d.c
t=v+d.d
s=G.d6(this.c,[w,v,0,w,t,0,u,v,0,u,t,0])
J.aA(this.c,34962,s)
r=G.d7(this.c,[0,1,2,1,3,2])
J.aA(this.c,34963,r)
q=J.bm(this.c,this.f,"vp")
p=J.aC(this.c,this.f,"u_mat")
J.er(this.c,p,!1,new Float32Array(H.au(this.cn().gp())))
J.bo(this.c,q,3,5126,!1,0,0)
o=J.aC(this.c,this.f,"color")
n=this.c
m=e.a.a
J.eq(n,o,(m>>>16&255)/255,(m>>>8&255)/255,(m>>>0&255)/255,(m>>>24&255)/255)
J.bk(this.c,q)
J.c8(this.c,4,6,5123,0)},
ab:function(){}},
hj:{
"^":"d:2;a,b",
$1:function(a){this.a.bt(0,this.b)}},
hk:{
"^":"d:2;a,b",
$1:function(a){this.b.eF("failed to load image "+this.a)}}}],["","",,S,{
"^":"",
fA:{
"^":"a;cI:a>,a3:b<,fb:e<,aD:r@",
cr:function(a){return!1},
ao:function(a){},
cv:function(a){}},
br:{
"^":"fA;ft:Q<,a,b,c,d,e,f,r,x,y,z",
ao:["dB",function(a){var z,y,x,w
z=this.c.a
y=z[0]
z=z[1]
x=!this.e
if(x){w=this.b.a
w[0]=w[0]+y*a
w[1]=w[1]+z*a}z=this.x
z-=0.01*z
this.x=z
if(x)this.saD(this.gaD()+z*a*10)}],
cr:function(a){var z=this.co(a)
if(this.Q+a.gft()>z)return!0
else return!1},
co:function(a){var z,y
z=a.ga3()
z=z.ga2(z)-this.b.a[0]
H.q(z)
H.q(2)
y=Math.pow(z,2)
z=a.ga3()
z=z.gac(z)-this.b.a[1]
H.q(z)
H.q(2)
return Math.sqrt(H.q(y+Math.pow(z,2)))},
cp:function(a){return a.b.Z(0,this.b).fh()},
cv:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.e
if(z){y=this.c.a
y[0]=0
y[1]=0}if(a instanceof S.br){x=this.co(a)
y=this.Q
w=a.Q
v=this.cp(a)
u=this.cp(a)
t=a.c.Z(0,this.c)
s=a.y
r=t.a
q=r[0]
p=u.a
o=p[0]
n=r[1]
m=p[1]
r=r[2]
p=p[2]
l=a.d
k=this.d
j=-1*(1+(this.y+s)/2)*(q*o+n*m+r*p)/(1/l+1/k)
i=u.q(0,j).ay(0,l)
h=u.q(0,-1).q(0,j).ay(0,k)
g=v.q(0,-1).q(0,this.Q).cz(u.q(0,1).q(0,j)).ay(0,5e-8)
f=v.q(0,1).q(0,this.Q).cz(u.q(0,-1).q(0,j)).ay(0,5e-8)
if(!z){this.c=this.c.j(0,h)
this.x=this.x+f.a[2]*1000}if(!a.e){a.b=a.b.j(0,v.q(0,y+w-x).ay(0,1))
a.c=a.c.j(0,i)
a.x=a.x+g.a[2]*1000}}}},
hy:{
"^":"a;a,b",
ao:function(a){var z,y,x,w,v,u,t,s,r
z=this.b
C.a.dt(z)
for(y=z.length,x=this.a.a,w=0;v=z.length,w<v;z.length===y||(0,H.a2)(z),++w){u=z[w]
for(t=J.o(u),s=0;s<z.length;z.length===v||(0,H.a2)(z),++s){r=z[s]
if(!t.t(u,r)&&u.cr(r))u.cv(r)}if(!u.gfb()){v=u.c.a
v[0]=v[0]+x[0]
v[1]=v[1]+x[1]}u.ao(a)}},
bM:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=S.hz(b)
y=z-c
x=z+c
w=[]
for(v=this.b,u=v.length,t=f!=null,s=0;s<v.length;v.length===u||(0,H.a2)(v),++s){r=v[s]
q=J.o(r)
if(q.t(r,a))continue
if(t&&f!==q.gcI(r))continue
q=a.b.a[0]
p=r.ga3()
o=q-p.ga2(p)
p=a.b.a[1]
q=r.ga3()
n=p-q.gac(q)
m=Math.sqrt(o*o+n*n)
q=r.ga3()
q=q.ga2(q)
p=a.b.a[0]
l=r.ga3()
l=l.gac(l)
k=a.b.a[1]
j=Math.atan2(l-k,q-p)
if(!(d<=m&&m<=e))continue
if(j-y>=0&&j-x<=0)w.push(r)}return w},
static:{hz:function(a){a=C.b.df(a+25.132741228718345,6.283185307179586)
if(a<3.141592653589793)return a
else return-3.141592653589793+(a-3.141592653589793)}}}}],["","",,E,{
"^":"",
n:{
"^":"a;p:a<",
az:function(a){var z,y
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
i:function(a){return"[0] "+this.aR(0).i(0)+"\n[1] "+this.aR(1).i(0)+"\n[2] "+this.aR(2).i(0)+"\n[3] "+this.aR(3).i(0)+"\n"},
geT:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.b(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=16)return H.b(z,b)
z[b]=c},
aR:function(a){var z,y,x
z=new Float64Array(H.i(4))
y=this.a
if(a>=16)return H.b(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.b(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.b(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.b(y,x)
z[3]=y[x]
return new E.ac(z)},
aX:function(a){var z=new E.n(new Float64Array(H.i(16)))
z.az(this)
return z},
q:function(a,b){var z,y,x
if(!!b.$isac){z=new Float64Array(H.i(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ac(z)}if(!!b.$isA){z=new Float64Array(H.i(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.A(z)}if(4===b.geT()){z=new Float64Array(H.i(16))
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
return new E.n(z)}throw H.e(P.aE(b))},
j:function(a,b){var z,y
z=new Float64Array(H.i(16))
y=this.a
z[0]=C.b.j(y[0],b.gp().h(0,0))
z[1]=C.b.j(y[1],b.gp().h(0,1))
z[2]=C.b.j(y[2],b.gp().h(0,2))
z[3]=C.b.j(y[3],b.gp().h(0,3))
z[4]=C.b.j(y[4],b.gp().h(0,4))
z[5]=C.b.j(y[5],b.gp().h(0,5))
z[6]=C.b.j(y[6],b.gp().h(0,6))
z[7]=C.b.j(y[7],b.gp().h(0,7))
z[8]=C.b.j(y[8],b.gp().h(0,8))
z[9]=C.b.j(y[9],b.gp().h(0,9))
z[10]=C.b.j(y[10],b.gp().h(0,10))
z[11]=C.b.j(y[11],b.gp().h(0,11))
z[12]=C.b.j(y[12],b.gp().h(0,12))
z[13]=C.b.j(y[13],b.gp().h(0,13))
z[14]=C.b.j(y[14],b.gp().h(0,14))
z[15]=C.b.j(y[15],b.gp().h(0,15))
return new E.n(z)},
E:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.o(b)
y=!!z.$isac
x=y?b.gF():1
if(!!z.$isA||y){w=z.ga2(b)
v=z.gac(b)
u=z.gfM(b)}else{u=d
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
d_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.cos(H.q(a))
y=Math.sin(H.q(a))
x=this.a
w=x[0]
v=x[4]
u=x[1]
t=x[5]
s=x[2]
r=x[6]
q=x[3]
p=x[7]
o=-y
x[0]=w*z+v*y
x[1]=u*z+t*y
x[2]=s*z+r*y
x[3]=q*z+p*y
x[4]=w*o+v*z
x[5]=u*o+t*z
x[6]=s*o+r*z
x[7]=q*o+p*z
return this},
bL:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
y=!!z.$isac
x=y?b.gF():1
if(!!z.$isA||y){w=z.ga2(b)
v=z.gac(b)
u=z.gfM(b)}else{u=d
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
n:function(){var z=this.a
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
a4:function(a,b,c){var z=this.a
z[14]=c
z[13]=b
z[12]=a},
cF:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
b7:{
"^":"a;a",
i:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+"]"},
j:function(a,b){var z,y,x
z=this.a
y=C.b.j(z[0],b.gp().h(0,0))
z=C.b.j(z[1],b.gp().h(0,1))
x=new Float64Array(H.i(2))
x[0]=y
x[1]=z
return new E.b7(x)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.b(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=2)return H.b(z,b)
z[b]=c},
gk:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(H.q(y*y+z*z))},
ga3:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.i(2))
x[0]=y
x[1]=z
return new E.b7(x)},
ga2:function(a){return this.a[0]},
gac:function(a){return this.a[1]}},
A:{
"^":"a;p:a<",
L:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
az:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
i:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+"]"},
Z:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gp()[0]
w=z[1]
v=b.a
u=v[1]
z=z[2]
v=v[2]
t=new E.A(new Float64Array(H.i(3)))
t.L(y-x,w-u,z-v)
return t},
j:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gp()[0]
w=z[1]
v=b.a
u=v[1]
z=z[2]
v=v[2]
t=new E.A(new Float64Array(H.i(3)))
t.L(y+x,w+u,z+v)
return t},
ay:function(a,b){var z,y,x,w,v
z=1/b
y=this.a
x=y[0]
w=y[1]
y=y[2]
v=new E.A(new Float64Array(H.i(3)))
v.L(x*z,w*z,y*z)
return v},
q:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.l(b)
x=z[1]
z=z[2]
w=new E.A(new Float64Array(H.i(3)))
w.L(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.b(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=3)return H.b(z,b)
z[b]=c},
gk:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.q(y*y+x*x+z*z))},
fh:function(){var z,y
z=this.gk(this)
if(z===0)return this
z=1/z
y=this.a
y[0]=y[0]*z
y[1]=y[1]*z
y[2]=y[2]*z
return this},
cz:function(a){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=a.a
v=z[0]
u=z[1]
t=z[2]
z=new E.A(new Float64Array(H.i(3)))
z.L(x*t-w*u,w*v-y*t,y*u-x*v)
return z},
aX:function(a){var z=new E.A(new Float64Array(H.i(3)))
z.az(this)
return z},
ga3:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.i(2))
x[0]=y
x[1]=z
return new E.b7(x)},
ga2:function(a){return this.a[0]},
gac:function(a){return this.a[1]}},
ac:{
"^":"a;p:a<",
bO:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
az:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
i:function(a){var z=this.a
return H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+","+H.c(z[3])},
j:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.j(z[0],b.gp().h(0,0))
x=C.b.j(z[1],b.gp().h(0,1))
w=C.b.j(z[2],b.gp().h(0,2))
z=C.b.j(z[3],b.gp().h(0,3))
v=new E.ac(new Float64Array(H.i(4)))
v.bO(y,x,w,z)
return v},
q:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.l(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ac(new Float64Array(H.i(4)))
v.bO(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.b(z,b)
return z[b]},
v:function(a,b,c){var z=this.a
if(b>=4)return H.b(z,b)
z[b]=c},
gk:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.q(y*y+x*x+w*w+z*z))},
aX:function(a){var z=new E.ac(new Float64Array(H.i(4)))
z.az(this)
return z},
ga3:function(){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float64Array(H.i(2))
x[0]=y
x[1]=z
return new E.b7(x)},
ga2:function(a){return this.a[0]},
gac:function(a){return this.a[1]},
gF:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cC.prototype
return J.cB.prototype}if(typeof a=="string")return J.aY.prototype
if(a==null)return J.ff.prototype
if(typeof a=="boolean")return J.fe.prototype
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bd(a)}
J.V=function(a){if(typeof a=="string")return J.aY.prototype
if(a==null)return a
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bd(a)}
J.aQ=function(a){if(a==null)return a
if(a.constructor==Array)return J.aH.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bd(a)}
J.dI=function(a){if(typeof a=="number")return J.aI.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bP.prototype
return a}
J.iL=function(a){if(typeof a=="number")return J.aI.prototype
if(typeof a=="string")return J.aY.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bP.prototype
return a}
J.k=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bd(a)}
J.az=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.iL(a).j(a,b)}
J.a4=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).t(a,b)}
J.dT=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dI(a).b6(a,b)}
J.dU=function(a,b){if(a.constructor==Array||typeof a=="string"||H.iZ(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.V(a).h(a,b)}
J.dV=function(a,b,c,d){return J.k(a).dV(a,b,c,d)}
J.dW=function(a,b,c,d){return J.k(a).ei(a,b,c,d)}
J.aA=function(a,b,c){return J.k(a).eq(a,b,c)}
J.dX=function(a,b,c){return J.k(a).er(a,b,c)}
J.dY=function(a,b,c){return J.k(a).eu(a,b,c)}
J.dZ=function(a,b,c,d){return J.k(a).ev(a,b,c,d)}
J.e_=function(a,b){return J.aQ(a).ez(a,b)}
J.e0=function(a,b,c,d,e){return J.k(a).eA(a,b,c,d,e)}
J.e1=function(a,b){return J.k(a).eB(a,b)}
J.e2=function(a,b){return J.k(a).eC(a,b)}
J.c6=function(a,b,c,d,e){return J.k(a).eE(a,b,c,d,e)}
J.e3=function(a,b){return J.k(a).bt(a,b)}
J.bi=function(a,b,c){return J.V(a).eG(a,b,c)}
J.bj=function(a){return J.k(a).eI(a)}
J.e4=function(a){return J.k(a).eJ(a)}
J.e5=function(a,b){return J.k(a).eK(a,b)}
J.e6=function(a){return J.k(a).eL(a)}
J.e7=function(a,b){return J.k(a).eM(a,b)}
J.c7=function(a,b){return J.k(a).eN(a,b)}
J.c8=function(a,b,c,d,e){return J.k(a).eU(a,b,c,d,e)}
J.e8=function(a,b){return J.aQ(a).al(a,b)}
J.c9=function(a,b){return J.k(a).eY(a,b)}
J.bk=function(a,b){return J.k(a).eZ(a,b)}
J.e9=function(a,b){return J.aQ(a).J(a,b)}
J.R=function(a){return J.k(a).gA(a)}
J.W=function(a){return J.k(a).gw(a)}
J.a5=function(a){return J.k(a).gaH(a)}
J.aS=function(a){return J.o(a).gH(a)}
J.ea=function(a){return J.k(a).gl(a)}
J.bl=function(a){return J.aQ(a).gK(a)}
J.aB=function(a){return J.V(a).gk(a)}
J.eb=function(a){return J.k(a).gcO(a)}
J.ec=function(a){return J.k(a).gcP(a)}
J.ed=function(a){return J.k(a).gcQ(a)}
J.ee=function(a){return J.k(a).gcR(a)}
J.ef=function(a){return J.k(a).gcS(a)}
J.eg=function(a){return J.k(a).gcT(a)}
J.eh=function(a){return J.k(a).gcU(a)}
J.ei=function(a){return J.k(a).gm(a)}
J.bm=function(a,b,c){return J.k(a).d9(a,b,c)}
J.ej=function(a,b){return J.k(a).da(a,b)}
J.aC=function(a,b,c){return J.k(a).de(a,b,c)}
J.ek=function(a,b){return J.k(a).cJ(a,b)}
J.el=function(a,b){return J.aQ(a).aw(a,b)}
J.ca=function(a,b){return J.k(a).sw(a,b)}
J.em=function(a,b){return J.k(a).sl(a,b)}
J.en=function(a,b){return J.k(a).sa5(a,b)}
J.eo=function(a,b){return J.k(a).sm(a,b)}
J.cb=function(a,b,c,d){return J.k(a).dv(a,b,c,d)}
J.cc=function(a,b,c,d){return J.k(a).dw(a,b,c,d)}
J.ep=function(a,b,c,d,e,f,g){return J.k(a).fE(a,b,c,d,e,f,g)}
J.aT=function(a,b,c,d){return J.k(a).fG(a,b,c,d)}
J.S=function(a){return J.dI(a).P(a)}
J.aD=function(a){return J.o(a).i(a)}
J.eq=function(a,b,c,d,e,f){return J.k(a).fI(a,b,c,d,e,f)}
J.er=function(a,b,c,d){return J.k(a).fJ(a,b,c,d)}
J.bn=function(a,b){return J.k(a).fK(a,b)}
J.bo=function(a,b,c,d,e,f,g){return J.k(a).fL(a,b,c,d,e,f,g)}
var $=I.p
C.a=J.aH.prototype
C.f=J.cB.prototype
C.d=J.cC.prototype
C.b=J.aI.prototype
C.j=J.aY.prototype
C.A=J.ft.prototype
C.B=J.bP.prototype
C.n=new H.cm()
C.o=new P.hK()
C.p=new P.i4()
C.c=new P.ih()
C.h=new P.aG(0)
C.i=new Y.eY(0)
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
C.l=function getTagFallback(o) {
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
C.m=function(hooks) { return hooks; }

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
C.x=function(_, letter) { return letter.toUpperCase(); }
C.y=new H.cw([0,"GameTipTurningDirection.right",1,"GameTipTurningDirection.left"])
C.z=new H.cw([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.k=new F.d3(0)
C.e=new F.d3(1)
$.cS="$cachedFunction"
$.cT="$cachedInvocation"
$.X=0
$.aq=null
$.cd=null
$.c1=null
$.dB=null
$.dO=null
$.bc=null
$.be=null
$.c2=null
$.al=null
$.av=null
$.aw=null
$.bX=!1
$.m=C.c
$.cq=0
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
I.$lazy(y,x,w)}})(["cz","$get$cz",function(){return H.f8()},"cA","$get$cA",function(){return new P.eL(null)},"d9","$get$d9",function(){return H.Z(H.b6({toString:function(){return"$receiver$"}}))},"da","$get$da",function(){return H.Z(H.b6({$method$:null,toString:function(){return"$receiver$"}}))},"db","$get$db",function(){return H.Z(H.b6(null))},"dc","$get$dc",function(){return H.Z(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dg","$get$dg",function(){return H.Z(H.b6(void 0))},"dh","$get$dh",function(){return H.Z(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"de","$get$de",function(){return H.Z(H.df(null))},"dd","$get$dd",function(){return H.Z(function(){try{null.$method$}catch(z){return z.message}}())},"dj","$get$dj",function(){return H.Z(H.df(void 0))},"di","$get$di",function(){return H.Z(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bR","$get$bR",function(){return P.hA()},"ax","$get$ax",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bC]},{func:1,void:true,args:[P.O]},{func:1,args:[F.bN]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.aa]},{func:1,args:[,],opt:[,]},{func:1,ret:P.O,args:[P.u]},{func:1,args:[,P.O]},{func:1,args:[P.O]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.aa]},{func:1,ret:P.bZ},{func:1,void:true,args:[P.a],opt:[P.aa]},{func:1,void:true,args:[,P.aa]},{func:1,args:[,,]},{func:1,args:[P.d_,,]},{func:1,void:true,args:[P.O,P.a3,P.a3,P.a3]},{func:1,args:[P.O,,]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.j6(d||a)
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
Isolate.dH=a.dH
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dQ(F.dM(),b)},[])
else (function(b){H.dQ(F.dM(),b)})([])})})()