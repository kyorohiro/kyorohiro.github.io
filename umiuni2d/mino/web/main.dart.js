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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cd"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cd"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cd(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aS=function(){}
var dart=[["","",,H,{
"^":"",
jB:{
"^":"a;a"}}],["","",,J,{
"^":"",
l:function(a){return void 0},
bo:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bl:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cg==null){H.iC()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.dz("Return interceptor for "+H.b(y(a,z))))}w=H.iL(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.I
else return C.J}return w},
h:{
"^":"a;",
p:function(a,b){return a===b},
gw:function(a){return H.a9(a)},
j:["d7",function(a){return H.bc(a)}],
"%":"DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
f7:{
"^":"h;",
j:function(a){return String(a)},
gw:function(a){return a?519018:218159},
$iscc:1},
f9:{
"^":"h;",
p:function(a,b){return null==b},
j:function(a){return"null"},
gw:function(a){return 0}},
cO:{
"^":"h;",
gw:function(a){return 0},
$isfa:1},
ft:{
"^":"cO;"},
c3:{
"^":"cO;",
j:function(a){return String(a)}},
aJ:{
"^":"h;",
bf:function(a,b){if(!!a.immutable$list)throw H.d(new P.U(b))},
be:function(a,b){if(!!a.fixed$length)throw H.d(new P.U(b))},
a0:function(a,b){var z,y
this.be(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.R)(b),++y)a.push(b[y])},
J:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.L(a))}},
an:function(a,b){return H.f(new H.bK(a,b),[null,null])},
am:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.c(y,x)
y[x]=w}return y.join(b)},
a4:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
gu:function(a){if(a.length>0)return a[0]
throw H.d(H.bE())},
gad:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.bE())},
bD:function(a,b,c,d,e){var z,y,x
this.bf(a,"set range")
P.d6(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.A(P.aM(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.f5())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}},
j:function(a){return P.b0(a,"[","]")},
gI:function(a){return new J.ev(a,a.length,0,null)},
gw:function(a){return H.a9(a)},
gm:function(a){return a.length},
sm:function(a,b){this.be(a,"set length")
if(b<0)throw H.d(P.aM(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.y(a,b))
if(b>=a.length||b<0)throw H.d(H.y(a,b))
return a[b]},
l:function(a,b,c){this.bf(a,"indexed set")
if(b>=a.length||b<0)throw H.d(H.y(a,b))
a[b]=c},
$isb1:1,
$isj:1,
$asj:null,
$isq:1},
jA:{
"^":"aJ;"},
ev:{
"^":"a;a,b,c,d",
gA:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(new P.L(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aK:{
"^":"h;",
al:function(a,b){var z
if(typeof b!=="number")throw H.d(H.N(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbl(b)
if(this.gbl(a)===z)return 0
if(this.gbl(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.geB(b))return 0
return 1}else return-1},
gbl:function(a){return a===0?1/a<0:a<0},
geB:function(a){return isNaN(a)},
bt:function(a,b){return a%b},
X:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.U(""+a))},
C:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.U(""+a))},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
n:function(a,b){if(typeof b!=="number")throw H.d(H.N(b))
return a+b},
L:function(a,b){if(typeof b!=="number")throw H.d(H.N(b))
return a-b},
B:function(a,b){if(typeof b!=="number")throw H.d(H.N(b))
return a*b},
dc:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.X(a/b)},
aa:function(a,b){return(a|0)===a?a/b|0:this.X(a/b)},
b9:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
a6:function(a,b){if(typeof b!=="number")throw H.d(H.N(b))
return a<b},
af:function(a,b){if(typeof b!=="number")throw H.d(H.N(b))
return a>b},
aP:function(a,b){if(typeof b!=="number")throw H.d(H.N(b))
return a>=b},
$isaf:1},
cN:{
"^":"aK;",
$isaf:1,
$iso:1},
f8:{
"^":"aK;",
$isaf:1},
b2:{
"^":"h;",
e5:function(a,b){if(b>=a.length)throw H.d(H.y(a,b))
return a.charCodeAt(b)},
n:function(a,b){if(typeof b!=="string")throw H.d(P.eu(b,null,null))
return a+b},
d6:function(a,b,c){H.dT(b)
if(c==null)c=a.length
H.dT(c)
if(b<0)throw H.d(P.aN(b,null,null))
if(typeof c!=="number")return H.H(c)
if(b>c)throw H.d(P.aN(b,null,null))
if(c>a.length)throw H.d(P.aN(c,null,null))
return a.substring(b,c)},
d5:function(a,b){return this.d6(a,b,null)},
B:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.x)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
gS:function(a){return a.length===0},
al:function(a,b){var z
if(typeof b!=="string")throw H.d(H.N(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
j:function(a){return a},
gw:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gm:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.y(a,b))
if(b>=a.length||b<0)throw H.d(H.y(a,b))
return a[b]},
$isb1:1,
$isa1:1}}],["","",,H,{
"^":"",
aQ:function(a,b){var z=a.ay(b)
if(!init.globalState.d.cy)init.globalState.f.aC()
return z},
bn:function(){--init.globalState.f.b},
e3:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isj)throw H.d(P.bw("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.hW(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cL()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hw(P.bI(null,H.aP),0)
y.z=P.b4(null,null,null,P.o,H.c8)
y.ch=P.b4(null,null,null,P.o,null)
if(y.x===!0){x=new H.hV()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eZ,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.hX)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.b4(null,null,null,P.o,H.bd)
w=P.at(null,null,null,P.o)
v=new H.bd(0,null,!1)
u=new H.c8(y,x,w,init.createNewIsolate(),v,new H.ah(H.bp()),new H.ah(H.bp()),!1,!1,[],P.at(null,null,null,null),null,null,!1,!0,P.at(null,null,null,null))
w.ak(0,0)
u.bG(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aT()
x=H.aq(y,[y]).a9(a)
if(x)u.ay(new H.iO(z,a))
else{y=H.aq(y,[y,y]).a9(a)
if(y)u.ay(new H.iP(z,a))
else u.ay(a)}init.globalState.f.aC()},
f2:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.f3()
return},
f3:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.U("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.U("Cannot extract URI from \""+H.b(z)+"\""))},
eZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bf(!0,[]).ab(b.data)
y=J.V(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bf(!0,[]).ab(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bf(!0,[]).ab(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.b4(null,null,null,P.o,H.bd)
p=P.at(null,null,null,P.o)
o=new H.bd(0,null,!1)
n=new H.c8(y,q,p,init.createNewIsolate(),o,new H.ah(H.bp()),new H.ah(H.bp()),!1,!1,[],P.at(null,null,null,null),null,null,!1,!0,P.at(null,null,null,null))
p.ak(0,0)
n.bG(0,o)
init.globalState.f.a.a2(new H.aP(n,new H.f_(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aC()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").a7(y.h(z,"msg"))
init.globalState.f.aC()
break
case"close":init.globalState.ch.ap(0,$.$get$cM().h(0,a))
a.terminate()
init.globalState.f.aC()
break
case"log":H.eY(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ak(["command","print","msg",z])
q=new H.am(!0,P.aj(null,P.o)).O(q)
y.toString
self.postMessage(q)}else P.aE(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
eY:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ak(["command","log","msg",a])
x=new H.am(!0,P.aj(null,P.o)).O(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.E(w)
z=H.z(w)
throw H.d(P.b_(z))}},
f0:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.d3=$.d3+("_"+y)
$.d4=$.d4+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.a7(["spawned",new H.bh(y,x),w,z.r])
x=new H.f1(a,b,c,d,z)
if(e===!0){z.c7(w,w)
init.globalState.f.a.a2(new H.aP(z,x,"start isolate"))}else x.$0()},
ig:function(a){return new H.bf(!0,[]).ab(new H.am(!1,P.aj(null,P.o)).O(a))},
iO:{
"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
iP:{
"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
hW:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{hX:function(a){var z=P.ak(["command","print","msg",a])
return new H.am(!0,P.aj(null,P.o)).O(z)}}},
c8:{
"^":"a;a,b,c,eC:d<,e9:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
c7:function(a,b){if(!this.f.p(0,a))return
if(this.Q.ak(0,b)&&!this.y)this.y=!0
this.ba()},
eM:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.ap(0,a)
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
if(w===y.c)y.bP();++y.d}this.y=!1}this.ba()},
dS:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.c(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eL:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.A(new P.U("removeRange"))
P.d6(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
d0:function(a,b){if(!this.r.p(0,a))return
this.db=b},
er:function(a,b,c){var z=J.l(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){a.a7(c)
return}z=this.cx
if(z==null){z=P.bI(null,null)
this.cx=z}z.a2(new H.hO(a,c))},
ep:function(a,b){var z
if(!this.r.p(0,a))return
z=J.l(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){this.bm()
return}z=this.cx
if(z==null){z=P.bI(null,null)
this.cx=z}z.a2(this.geE())},
es:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aE(a)
if(b!=null)P.aE(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aG(a)
y[1]=b==null?null:J.aG(b)
for(x=new P.cQ(z,z.r,null,null),x.c=z.e;x.v();)x.d.a7(y)},
ay:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.E(u)
w=t
v=H.z(u)
this.es(w,v)
if(this.db===!0){this.bm()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geC()
if(this.cx!=null)for(;t=this.cx,!t.gS(t);)this.cx.cA().$0()}return y},
cn:function(a){return this.b.h(0,a)},
bG:function(a,b){var z=this.b
if(z.aM(a))throw H.d(P.b_("Registry: ports must be registered only once."))
z.l(0,a,b)},
ba:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.bm()},
bm:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.H(0)
for(z=this.b,y=z.gcL(z),y=y.gI(y);y.v();)y.gA().dr()
z.H(0)
this.c.H(0)
init.globalState.z.ap(0,this.a)
this.dx.H(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.c(z,v)
w.a7(z[v])}this.ch=null}},"$0","geE",0,0,1]},
hO:{
"^":"e:1;a,b",
$0:function(){this.a.a7(this.b)}},
hw:{
"^":"a;a,b",
ef:function(){var z=this.a
if(z.b===z.c)return
return z.cA()},
cH:function(){var z,y,x
z=this.ef()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aM(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gS(y)}else y=!1
else y=!1
else y=!1
if(y)H.A(P.b_("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gS(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ak(["command","close"])
x=new H.am(!0,P.aj(null,P.o)).O(x)
y.toString
self.postMessage(x)}return!1}z.eK()
return!0},
c_:function(){if(self.window!=null)new H.hx(this).$0()
else for(;this.cH(););},
aC:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.c_()
else try{this.c_()}catch(x){w=H.E(x)
z=w
y=H.z(x)
w=init.globalState.Q
v=P.ak(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.am(!0,P.aj(null,P.o)).O(v)
w.toString
self.postMessage(v)}}},
hx:{
"^":"e:1;a",
$0:function(){if(!this.a.cH())return
P.bZ(C.p,this)}},
aP:{
"^":"a;a,b,c",
eK:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ay(this.b)}},
hV:{
"^":"a;"},
f_:{
"^":"e:0;a,b,c,d,e,f",
$0:function(){H.f0(this.a,this.b,this.c,this.d,this.e,this.f)}},
f1:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aT()
w=H.aq(x,[x,x]).a9(y)
if(w)y.$2(this.b,this.c)
else{x=H.aq(x,[x]).a9(y)
if(x)y.$1(this.b)
else y.$0()}}z.ba()}},
dB:{
"^":"a;"},
bh:{
"^":"dB;b,a",
a7:function(a){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbS())return
x=H.ig(a)
if(z.ge9()===y){y=J.V(x)
switch(y.h(x,0)){case"pause":z.c7(y.h(x,1),y.h(x,2))
break
case"resume":z.eM(y.h(x,1))
break
case"add-ondone":z.dS(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eL(y.h(x,1))
break
case"set-errors-fatal":z.d0(y.h(x,1),y.h(x,2))
break
case"ping":z.er(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ep(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.ak(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.ap(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(a)
y.a.a2(new H.aP(z,new H.hZ(this,x),w))},
p:function(a,b){if(b==null)return!1
return b instanceof H.bh&&J.F(this.b,b.b)},
gw:function(a){return this.b.gb4()}},
hZ:{
"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbS())z.dl(this.b)}},
c9:{
"^":"dB;b,c,a",
a7:function(a){var z,y,x
z=P.ak(["command","message","port",this,"msg",a])
y=new H.am(!0,P.aj(null,P.o)).O(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
p:function(a,b){if(b==null)return!1
return b instanceof H.c9&&J.F(this.b,b.b)&&J.F(this.a,b.a)&&J.F(this.c,b.c)},
gw:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.d2()
y=this.a
if(typeof y!=="number")return y.d2()
x=this.c
if(typeof x!=="number")return H.H(x)
return(z<<16^y<<8^x)>>>0}},
bd:{
"^":"a;b4:a<,b,bS:c<",
dr:function(){this.c=!0
this.b=null},
dl:function(a){if(this.c)return
this.dC(a)},
dC:function(a){return this.b.$1(a)},
$isfv:1},
fR:{
"^":"a;a,b,c",
df:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.a2(new H.aP(y,new H.fT(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aC(new H.fU(this,b),0),a)}else throw H.d(new P.U("Timer greater than 0."))},
static:{fS:function(a,b){var z=new H.fR(!0,!1,null)
z.df(a,b)
return z}}},
fT:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
fU:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
H.bn()
this.b.$0()}},
ah:{
"^":"a;b4:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.eV()
z=C.b.b9(z,0)^C.b.aa(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
p:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ah){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
am:{
"^":"a;a,b",
O:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gm(z))
z=J.l(a)
if(!!z.$iscW)return["buffer",a]
if(!!z.$isbV)return["typed",a]
if(!!z.$isb1)return this.cX(a)
if(!!z.$iseX){x=this.gcU()
w=a.gck()
w=H.b6(w,x,H.P(w,"T",0),null)
w=P.bJ(w,!0,H.P(w,"T",0))
z=z.gcL(a)
z=H.b6(z,x,H.P(z,"T",0),null)
return["map",w,P.bJ(z,!0,H.P(z,"T",0))]}if(!!z.$isfa)return this.cY(a)
if(!!z.$ish)this.cK(a)
if(!!z.$isfv)this.aD(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbh)return this.cZ(a)
if(!!z.$isc9)return this.d_(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.aD(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isah)return["capability",a.a]
if(!(a instanceof P.a))this.cK(a)
return["dart",init.classIdExtractor(a),this.cW(init.classFieldsExtractor(a))]},"$1","gcU",2,0,2],
aD:function(a,b){throw H.d(new P.U(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cK:function(a){return this.aD(a,null)},
cX:function(a){var z=this.cV(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aD(a,"Can't serialize indexable: ")},
cV:function(a){var z,y,x
z=[]
C.a.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.O(a[y])
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
cW:function(a){var z
for(z=0;z<a.length;++z)C.a.l(a,z,this.O(a[z]))
return a},
cY:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aD(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.O(a[z[x]])
if(x>=y.length)return H.c(y,x)
y[x]=w}return["js-object",z,y]},
d_:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cZ:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gb4()]
return["raw sendport",a]}},
bf:{
"^":"a;a,b",
ab:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.bw("Bad serialized message: "+H.b(a)))
switch(C.a.gu(a)){case"ref":if(1>=a.length)return H.c(a,1)
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
y=this.aw(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aw(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return this.aw(x)
case"const":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aw(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.ei(a)
case"sendport":return this.ej(a)
case"raw sendport":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.eh(a)
case"function":if(1>=a.length)return H.c(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.c(a,1)
return new H.ah(a[1])
case"dart":y=a.length
if(1>=y)return H.c(a,1)
w=a[1]
if(2>=y)return H.c(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aw(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.b(a))}},"$1","geg",2,0,2],
aw:function(a){var z,y,x
z=J.V(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.H(x)
if(!(y<x))break
z.l(a,y,this.ab(z.h(a,y)));++y}return a},
ei:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w=P.bG()
this.b.push(w)
y=J.er(y,this.geg()).bx(0)
for(z=J.V(y),v=J.V(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.c(y,u)
w.l(0,y[u],this.ab(v.h(x,u)))}return w},
ej:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
if(3>=z)return H.c(a,3)
w=a[3]
if(J.F(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cn(w)
if(u==null)return
t=new H.bh(u,x)}else t=new H.c9(y,w,x)
this.b.push(t)
return t},
eh:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.V(y)
v=J.V(x)
u=0
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.H(t)
if(!(u<t))break
w[z.h(y,u)]=this.ab(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eC:function(){throw H.d(new P.U("Cannot modify unmodifiable Map"))},
ix:function(a){return init.types[a]},
iK:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isb3},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aG(a)
if(typeof z!=="string")throw H.d(H.N(a))
return z},
a9:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
d5:function(a){var z,y
z=C.r(J.l(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.q.e5(z,0)===36)z=C.q.d5(z,1)
return(z+H.dY(H.ce(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
bc:function(a){return"Instance of '"+H.d5(a)+"'"},
I:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
d2:function(a){return a.b?H.I(a).getUTCMilliseconds()+0:H.I(a).getMilliseconds()+0},
bb:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.N(a))
return a[b]},
bW:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.N(a))
a[b]=c},
H:function(a){throw H.d(H.N(a))},
c:function(a,b){if(a==null)J.aF(a)
throw H.d(H.y(a,b))},
y:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ag(!0,b,"index",null)
z=J.aF(a)
if(!(b<0)){if(typeof z!=="number")return H.H(z)
y=b>=z}else y=!0
if(y)return P.bD(b,a,"index",null,z)
return P.aN(b,"index",null)},
N:function(a){return new P.ag(!0,a,null,null)},
O:function(a){return a},
dT:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.N(a))
return a},
d:function(a){var z
if(a==null)a=new P.d1()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.e5})
z.name=""}else z.toString=H.e5
return z},
e5:function(){return J.aG(this.dartException)},
A:function(a){throw H.d(a)},
R:function(a){throw H.d(new P.L(a))},
E:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.iR(a)
if(a==null)return
if(a instanceof H.bC)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.b9(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bF(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.d0(v,null))}}if(a instanceof TypeError){u=$.$get$dm()
t=$.$get$dn()
s=$.$get$dp()
r=$.$get$dq()
q=$.$get$du()
p=$.$get$dv()
o=$.$get$ds()
$.$get$dr()
n=$.$get$dx()
m=$.$get$dw()
l=u.U(y)
if(l!=null)return z.$1(H.bF(y,l))
else{l=t.U(y)
if(l!=null){l.method="call"
return z.$1(H.bF(y,l))}else{l=s.U(y)
if(l==null){l=r.U(y)
if(l==null){l=q.U(y)
if(l==null){l=p.U(y)
if(l==null){l=o.U(y)
if(l==null){l=r.U(y)
if(l==null){l=n.U(y)
if(l==null){l=m.U(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.d0(y,l==null?null:l.method))}}return z.$1(new H.hg(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.d9()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ag(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.d9()
return a},
z:function(a){var z
if(a instanceof H.bC)return a.b
if(a==null)return new H.dG(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dG(a,null)},
iN:function(a){if(a==null||typeof a!='object')return J.B(a)
else return H.a9(a)},
dV:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
iE:function(a,b,c,d,e,f,g){var z=J.l(c)
if(z.p(c,0))return H.aQ(b,new H.iF(a))
else if(z.p(c,1))return H.aQ(b,new H.iG(a,d))
else if(z.p(c,2))return H.aQ(b,new H.iH(a,d,e))
else if(z.p(c,3))return H.aQ(b,new H.iI(a,d,e,f))
else if(z.p(c,4))return H.aQ(b,new H.iJ(a,d,e,f,g))
else throw H.d(P.b_("Unsupported number of arguments for wrapped closure"))},
aC:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.iE)
a.$identity=z
return z},
eA:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isj){z.$reflectionInfo=c
x=H.fy(z).r}else x=c
w=d?Object.create(new H.fF().constructor.prototype):Object.create(new H.bx(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a_
$.a_=J.v(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cE(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.ix(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cD:H.by
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cE(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ex:function(a,b,c,d){var z=H.by
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cE:function(a,b,c){var z,y,x,w,v,u
if(c)return H.ez(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ex(y,!w,z,b)
if(y===0){w=$.as
if(w==null){w=H.aZ("self")
$.as=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.a_
$.a_=J.v(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.as
if(v==null){v=H.aZ("self")
$.as=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.a_
$.a_=J.v(w,1)
return new Function(v+H.b(w)+"}")()},
ey:function(a,b,c,d){var z,y
z=H.by
y=H.cD
switch(b?-1:a){case 0:throw H.d(new H.fz("Intercepted function with no arguments."))
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
y=$.cC
if(y==null){y=H.aZ("receiver")
$.cC=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ey(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.a_
$.a_=J.v(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.a_
$.a_=J.v(u,1)
return new Function(y+H.b(u)+"}")()},
cd:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eA(a,b,z,!!d,e,f)},
iQ:function(a){throw H.d(new P.eE("Cyclic initialization for static "+H.b(a)))},
aq:function(a,b,c){return new H.fA(a,b,c,null)},
aT:function(){return C.w},
bp:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
Z:function(a,b,c){var z
if(b===0){J.ea(c,a)
return}else if(b===1){c.e7(H.E(a),H.z(a))
return}if(!!J.l(a).$isa4)z=a
else{z=H.f(new P.G(0,$.k,null),[null])
z.aW(a)}z.bw(H.dP(b,0),new H.iq(b))
return c.geo()},
dP:function(a,b){return new H.im(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
f:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
ce:function(a){if(a==null)return
return a.$builtinTypeInfo},
dW:function(a,b){return H.e4(a["$as"+H.b(b)],H.ce(a))},
P:function(a,b,c){var z=H.dW(a,b)
return z==null?null:z[c]},
w:function(a,b){var z=H.ce(a)
return z==null?null:z[b]},
ck:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dY(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.j(a)
else return},
dY:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bY("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.ck(u,c))}return w?"":"<"+H.b(z)+">"},
e4:function(a,b){if(typeof a=="function"){a=H.ch(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.ch(a,null,b)}return b},
ip:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.Q(a[y],b[y]))return!1
return!0},
bj:function(a,b,c){return H.ch(a,b,H.dW(b,c))},
Q:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dX(a,b)
if('func' in a)return b.builtin$cls==="jv"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.ck(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.ck(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ip(H.e4(v,z),x)},
dR:function(a,b,c){var z,y,x,w,v
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
io:function(a,b){var z,y,x,w,v,u
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
dX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.dR(x,w,!1))return!1
if(!H.dR(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.Q(o,n)||H.Q(n,o)))return!1}}return H.io(a.named,b.named)},
ch:function(a,b,c){return a.apply(b,c)},
kx:function(a){var z=$.cf
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kw:function(a){return H.a9(a)},
kv:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iL:function(a){var z,y,x,w,v,u
z=$.cf.$1(a)
y=$.bk[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bm[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dQ.$2(a,z)
if(z!=null){y=$.bk[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bm[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.ci(x)
$.bk[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bm[z]=x
return x}if(v==="-"){u=H.ci(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.e0(a,x)
if(v==="*")throw H.d(new P.dz(z))
if(init.leafTags[z]===true){u=H.ci(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.e0(a,x)},
e0:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bo(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
ci:function(a){return J.bo(a,!1,null,!!a.$isb3)},
iM:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bo(z,!1,null,!!z.$isb3)
else return J.bo(z,c,null,null)},
iC:function(){if(!0===$.cg)return
$.cg=!0
H.iD()},
iD:function(){var z,y,x,w,v,u,t,s
$.bk=Object.create(null)
$.bm=Object.create(null)
H.iy()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.e1.$1(v)
if(u!=null){t=H.iM(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
iy:function(){var z,y,x,w,v,u,t
z=C.D()
z=H.ap(C.A,H.ap(C.F,H.ap(C.t,H.ap(C.t,H.ap(C.E,H.ap(C.B,H.ap(C.C(C.r),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cf=new H.iz(v)
$.dQ=new H.iA(u)
$.e1=new H.iB(t)},
ap:function(a,b){return a(b)||b},
eB:{
"^":"a;",
j:function(a){return P.cT(this)},
l:function(a,b,c){return H.eC()}},
cK:{
"^":"eB;a",
b3:function(){var z=this.$map
if(z==null){z=new H.aL(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dV(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.b3().h(0,b)},
J:function(a,b){this.b3().J(0,b)},
gm:function(a){var z=this.b3()
return z.gm(z)}},
fx:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fy:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fx(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hf:{
"^":"a;a,b,c,d,e,f",
U:function(a){var z,y,x
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
static:{a2:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hf(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},be:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},dt:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
d0:{
"^":"D;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
fc:{
"^":"D;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bF:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fc(a,y,z?null:b.receiver)}}},
hg:{
"^":"D;a",
j:function(a){var z=this.a
return C.q.gS(z)?"Error":"Error: "+z}},
iR:{
"^":"e:2;a",
$1:function(a){if(!!J.l(a).$isD)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dG:{
"^":"a;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
iF:{
"^":"e:0;a",
$0:function(){return this.a.$0()}},
iG:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
iH:{
"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
iI:{
"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
iJ:{
"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{
"^":"a;",
j:function(a){return"Closure '"+H.d5(this)+"'"},
gcM:function(){return this},
gcM:function(){return this}},
dc:{
"^":"e;"},
fF:{
"^":"dc;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bx:{
"^":"dc;a,b,c,d",
p:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bx))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.a9(this.a)
else y=typeof z!=="object"?J.B(z):H.a9(z)
z=H.a9(this.b)
if(typeof y!=="number")return y.eW()
return(y^z)>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.bc(z)},
static:{by:function(a){return a.a},cD:function(a){return a.c},ew:function(){var z=$.as
if(z==null){z=H.aZ("self")
$.as=z}return z},aZ:function(a){var z,y,x,w,v
z=new H.bx("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fz:{
"^":"D;a",
j:function(a){return"RuntimeError: "+H.b(this.a)}},
d8:{
"^":"a;"},
fA:{
"^":"d8;a,b,c,d",
a9:function(a){var z=this.dw(a)
return z==null?!1:H.dX(z,this.aq())},
dw:function(a){var z=J.l(a)
return"$signature" in z?z.$signature():null},
aq:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.l(y)
if(!!x.$iskf)z.void=true
else if(!x.$iscG)z.ret=y.aq()
y=this.b
if(y!=null&&y.length!==0)z.args=H.d7(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.d7(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dU(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aq()}z.named=w}return z},
j:function(a){var z,y,x,w,v,u,t,s
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
t=H.dU(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].aq())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{d7:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aq())
return z}}},
cG:{
"^":"d8;",
j:function(a){return"dynamic"},
aq:function(){return}},
bC:{
"^":"a;a,P:b<"},
iq:{
"^":"e:5;a",
$2:function(a,b){H.dP(this.a,1).$1(new H.bC(a,b))}},
im:{
"^":"e:2;a,b",
$1:function(a){this.b(this.a,a)}},
aL:{
"^":"a;a,b,c,d,e,f,r",
gm:function(a){return this.a},
gS:function(a){return this.a===0},
gck:function(){return H.f(new H.fe(this),[H.w(this,0)])},
gcL:function(a){return H.b6(this.gck(),new H.fb(this),H.w(this,0),H.w(this,1))},
aM:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.du(z,a)}else return this.ew(a)},
ew:function(a){var z=this.d
if(z==null)return!1
return this.aA(this.a_(z,this.az(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a_(z,b)
return y==null?null:y.gac()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.a_(x,b)
return y==null?null:y.gac()}else return this.ex(b)},
ex:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a_(z,this.az(a))
x=this.aA(y,a)
if(x<0)return
return y[x].gac()},
l:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.b6()
this.b=z}this.bF(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.b6()
this.c=y}this.bF(y,b,c)}else this.ez(b,c)},
ez:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.b6()
this.d=z}y=this.az(a)
x=this.a_(z,y)
if(x==null)this.b8(z,y,[this.b7(a,b)])
else{w=this.aA(x,a)
if(w>=0)x[w].sac(b)
else x.push(this.b7(a,b))}},
ap:function(a,b){if(typeof b==="string")return this.bZ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bZ(this.c,b)
else return this.ey(b)},
ey:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a_(z,this.az(a))
x=this.aA(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.c5(w)
return w.gac()},
H:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.d(new P.L(this))
z=z.c}},
bF:function(a,b,c){var z=this.a_(a,b)
if(z==null)this.b8(a,b,this.b7(b,c))
else z.sac(c)},
bZ:function(a,b){var z
if(a==null)return
z=this.a_(a,b)
if(z==null)return
this.c5(z)
this.bM(a,b)
return z.gac()},
b7:function(a,b){var z,y
z=new H.fd(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c5:function(a){var z,y
z=a.gdL()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
az:function(a){return J.B(a)&0x3ffffff},
aA:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.F(a[y].gci(),b))return y
return-1},
j:function(a){return P.cT(this)},
a_:function(a,b){return a[b]},
b8:function(a,b,c){a[b]=c},
bM:function(a,b){delete a[b]},
du:function(a,b){return this.a_(a,b)!=null},
b6:function(){var z=Object.create(null)
this.b8(z,"<non-identifier-key>",z)
this.bM(z,"<non-identifier-key>")
return z},
$iseX:1},
fb:{
"^":"e:2;a",
$1:function(a){return this.a.h(0,a)}},
fd:{
"^":"a;ci:a<,ac:b@,c,dL:d<"},
fe:{
"^":"T;a",
gm:function(a){return this.a.a},
gI:function(a){var z,y
z=this.a
y=new H.ff(z,z.r,null,null)
y.c=z.e
return y},
J:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.L(z))
y=y.c}},
$isq:1},
ff:{
"^":"a;a,b,c,d",
gA:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.L(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
iz:{
"^":"e:2;a",
$1:function(a){return this.a(a)}},
iA:{
"^":"e:10;a",
$2:function(a,b){return this.a(a,b)}},
iB:{
"^":"e:6;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bE:function(){return new P.au("No element")},
f5:function(){return new P.au("Too few elements")},
aO:function(a,b,c,d){if(c-b<=32)H.fE(a,b,c,d)
else H.fD(a,b,c,d)},
fE:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.V(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.S(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
fD:function(a,b,c,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=C.c.aa(c-b+1,6)
y=b+z
x=c-z
w=C.c.aa(b+c,2)
v=w-z
u=w+z
t=J.V(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.S(a0.$2(s,r),0)){n=r
r=s
s=n}if(J.S(a0.$2(p,o),0)){n=o
o=p
p=n}if(J.S(a0.$2(s,q),0)){n=q
q=s
s=n}if(J.S(a0.$2(r,q),0)){n=q
q=r
r=n}if(J.S(a0.$2(s,p),0)){n=p
p=s
s=n}if(J.S(a0.$2(q,p),0)){n=p
p=q
q=n}if(J.S(a0.$2(r,o),0)){n=o
o=r
r=n}if(J.S(a0.$2(r,q),0)){n=q
q=r
r=n}if(J.S(a0.$2(p,o),0)){n=o
o=p
p=n}t.l(a,y,s)
t.l(a,w,q)
t.l(a,x,o)
if(b<0||b>=a.length)return H.c(a,b)
t.l(a,v,a[b])
if(c<0||c>=a.length)return H.c(a,c)
t.l(a,u,a[c])
m=b+1
l=c-1
if(J.F(a0.$2(r,p),0)){for(k=m;k<=l;++k){if(k>=a.length)return H.c(a,k)
j=a[k]
i=a0.$2(j,r)
h=J.l(i)
if(h.p(i,0))continue
if(h.a6(i,0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.l(a,k,a[m])
t.l(a,m,j)}++m}else for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
i=a0.$2(a[l],r)
h=J.aD(i)
if(h.af(i,0)){--l
continue}else{h=h.a6(i,0)
g=a.length
f=l-1
if(h){if(m>=g)return H.c(a,m)
t.l(a,k,a[m])
e=m+1
if(l>=a.length)return H.c(a,l)
t.l(a,m,a[l])
t.l(a,l,j)
l=f
m=e
break}else{if(l>=g)return H.c(a,l)
t.l(a,k,a[l])
t.l(a,l,j)
l=f
break}}}}d=!0}else{for(k=m;k<=l;++k){if(k>=a.length)return H.c(a,k)
j=a[k]
if(J.aV(a0.$2(j,r),0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.l(a,k,a[m])
t.l(a,m,j)}++m}else if(J.S(a0.$2(j,p),0))for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
if(J.S(a0.$2(a[l],p),0)){--l
if(l<k)break
continue}else{if(l>=a.length)return H.c(a,l)
h=J.aV(a0.$2(a[l],r),0)
f=l-1
g=a.length
if(h){if(m>=g)return H.c(a,m)
t.l(a,k,a[m])
e=m+1
if(l>=a.length)return H.c(a,l)
t.l(a,m,a[l])
t.l(a,l,j)
m=e}else{if(l>=g)return H.c(a,l)
t.l(a,k,a[l])
t.l(a,l,j)}l=f
break}}}d=!1}h=m-1
if(h>=a.length)return H.c(a,h)
t.l(a,b,a[h])
t.l(a,h,r)
h=l+1
if(h<0||h>=a.length)return H.c(a,h)
t.l(a,c,a[h])
t.l(a,h,p)
H.aO(a,b,m-2,a0)
H.aO(a,l+2,c,a0)
if(d)return
if(m<y&&l>x){while(!0){if(m>=a.length)return H.c(a,m)
if(!J.F(a0.$2(a[m],r),0))break;++m}while(!0){if(l<0||l>=a.length)return H.c(a,l)
if(!J.F(a0.$2(a[l],p),0))break;--l}for(k=m;k<=l;++k){if(k>=a.length)return H.c(a,k)
j=a[k]
if(J.F(a0.$2(j,r),0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.l(a,k,a[m])
t.l(a,m,j)}++m}else if(J.F(a0.$2(j,p),0))for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
if(J.F(a0.$2(a[l],p),0)){--l
if(l<k)break
continue}else{if(l>=a.length)return H.c(a,l)
h=J.aV(a0.$2(a[l],r),0)
f=l-1
g=a.length
if(h){if(m>=g)return H.c(a,m)
t.l(a,k,a[m])
e=m+1
if(l>=a.length)return H.c(a,l)
t.l(a,m,a[l])
t.l(a,l,j)
m=e}else{if(l>=g)return H.c(a,l)
t.l(a,k,a[l])
t.l(a,l,j)}l=f
break}}}H.aO(a,m,l,a0)}else H.aO(a,m,l,a0)},
fP:function(a){return a.gf0()},
b5:{
"^":"T;",
gI:function(a){return new H.cR(this,this.gm(this),0,null)},
J:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.a4(0,y))
if(z!==this.gm(this))throw H.d(new P.L(this))}},
an:function(a,b){return H.f(new H.bK(this,b),[null,null])},
by:function(a,b){var z,y,x
if(b){z=H.f([],[H.P(this,"b5",0)])
C.a.sm(z,this.gm(this))}else z=H.f(Array(this.gm(this)),[H.P(this,"b5",0)])
for(y=0;y<this.gm(this);++y){x=this.a4(0,y)
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
bx:function(a){return this.by(a,!0)},
$isq:1},
cR:{
"^":"a;a,b,c,d",
gA:function(){return this.d},
v:function(){var z,y,x,w
z=this.a
y=J.V(z)
x=y.gm(z)
if(this.b!==x)throw H.d(new P.L(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a4(z,w);++this.c
return!0}},
cS:{
"^":"T;a,b",
gI:function(a){var z=new H.fi(null,J.bs(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gm:function(a){return J.aF(this.a)},
$asT:function(a,b){return[b]},
static:{b6:function(a,b,c,d){if(!!J.l(a).$isq)return H.f(new H.cH(a,b),[c,d])
return H.f(new H.cS(a,b),[c,d])}}},
cH:{
"^":"cS;a,b",
$isq:1},
fi:{
"^":"f6;a,b,c",
v:function(){var z=this.b
if(z.v()){this.a=this.b2(z.gA())
return!0}this.a=null
return!1},
gA:function(){return this.a},
b2:function(a){return this.c.$1(a)}},
bK:{
"^":"b5;a,b",
gm:function(a){return J.aF(this.a)},
a4:function(a,b){return this.b2(J.ed(this.a,b))},
b2:function(a){return this.b.$1(a)},
$asb5:function(a,b){return[b]},
$asT:function(a,b){return[b]},
$isq:1},
cJ:{
"^":"a;"}}],["","",,H,{
"^":"",
dU:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
hi:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ir()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aC(new P.hk(z),1)).observe(y,{childList:true})
return new P.hj(z,y,x)}else if(self.setImmediate!=null)return P.is()
return P.it()},
kh:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aC(new P.hl(a),0))},"$1","ir",2,0,4],
ki:[function(a){++init.globalState.f.b
self.setImmediate(H.aC(new P.hm(a),0))},"$1","is",2,0,4],
kj:[function(a){P.c_(C.p,a)},"$1","it",2,0,4],
dK:function(a,b){var z=H.aT()
z=H.aq(z,[z,z]).a9(a)
if(z){b.toString
return a}else{b.toString
return a}},
eN:function(a,b){var z=H.f(new P.G(0,$.k,null),[b])
P.bZ(C.p,new P.eQ(a,z))
return z},
eO:function(a,b,c){var z=new P.G(0,$.k,null)
z.$builtinTypeInfo=[c]
P.bZ(a,new P.eP(b,z))
return z},
bz:function(a){return H.f(new P.hh(H.f(new P.G(0,$.k,null),[a])),[a])},
dI:function(a,b,c){$.k.toString
a.R(b,c)},
ii:function(){var z,y
for(;z=$.an,z!=null;){$.aA=null
y=z.c
$.an=y
if(y==null)$.az=null
$.k=z.b
z.dX()}},
ku:[function(){$.ca=!0
try{P.ii()}finally{$.k=C.d
$.aA=null
$.ca=!1
if($.an!=null)$.$get$c5().$1(P.dS())}},"$0","dS",0,0,1],
dO:function(a){if($.an==null){$.az=a
$.an=a
if(!$.ca)$.$get$c5().$1(P.dS())}else{$.az.c=a
$.az=a}},
e2:function(a){var z,y
z=$.k
if(C.d===z){P.ao(null,null,C.d,a)
return}z.toString
if(C.d.gbj()===z){P.ao(null,null,z,a)
return}y=$.k
P.ao(null,null,y,y.bb(a,!0))},
k4:function(a,b){var z,y,x
z=H.f(new P.dH(null,null,null,0),[b])
y=z.gdG()
x=z.gdI()
z.a=a.ae(y,!0,z.gdH(),x)
return z},
ik:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.E(u)
z=t
y=H.z(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.a3(x)
w=t
v=x.gP()
c.$2(w,v)}}},
ib:function(a,b,c,d){var z=a.bd()
if(!!J.l(z).$isa4)z.bB(new P.ie(b,c,d))
else b.R(c,d)},
ic:function(a,b){return new P.id(a,b)},
bZ:function(a,b){var z=$.k
if(z===C.d){z.toString
return P.c_(a,b)}return P.c_(a,z.bb(b,!0))},
c_:function(a,b){var z=C.c.aa(a.a,1000)
return H.fS(z<0?0:z,b)},
c4:function(a){var z=$.k
$.k=a
return z},
aR:function(a,b,c,d,e){var z,y,x
z=new P.dA(new P.ij(d,e),C.d,null)
y=$.an
if(y==null){P.dO(z)
$.aA=$.az}else{x=$.aA
if(x==null){z.c=y
$.aA=z
$.an=z}else{z.c=x.c
x.c=z
$.aA=z
if(z.c==null)$.az=z}}},
dL:function(a,b,c,d){var z,y
if($.k===c)return d.$0()
z=P.c4(c)
try{y=d.$0()
return y}finally{$.k=z}},
dN:function(a,b,c,d,e){var z,y
if($.k===c)return d.$1(e)
z=P.c4(c)
try{y=d.$1(e)
return y}finally{$.k=z}},
dM:function(a,b,c,d,e,f){var z,y
if($.k===c)return d.$2(e,f)
z=P.c4(c)
try{y=d.$2(e,f)
return y}finally{$.k=z}},
ao:function(a,b,c,d){var z=C.d!==c
if(z){d=c.bb(d,!(!z||C.d.gbj()===c))
c=C.d}P.dO(new P.dA(d,c,null))},
hk:{
"^":"e:2;a",
$1:function(a){var z,y
H.bn()
z=this.a
y=z.a
z.a=null
y.$0()}},
hj:{
"^":"e:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hl:{
"^":"e:0;a",
$0:function(){H.bn()
this.a.$0()}},
hm:{
"^":"e:0;a",
$0:function(){H.bn()
this.a.$0()}},
i8:{
"^":"a6;a,b",
j:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{i9:function(a,b){if(b!=null)return b
if(!!J.l(a).$isD)return a.gP()
return}}},
a4:{
"^":"a;"},
eQ:{
"^":"e:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a8(this.a.$0())}catch(x){w=H.E(x)
z=w
y=H.z(x)
P.dI(this.b,z,y)}}},
eP:{
"^":"e:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a8(null)}catch(x){w=H.E(x)
z=w
y=H.z(x)
P.dI(this.b,z,y)}}},
hq:{
"^":"a;eo:a<",
e7:function(a,b){a=a!=null?a:new P.d1()
if(this.a.a!==0)throw H.d(new P.au("Future already completed"))
$.k.toString
this.R(a,b)}},
hh:{
"^":"hq;a",
cb:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.au("Future already completed"))
z.aW(b)},
R:function(a,b){this.a.dq(a,b)}},
ax:{
"^":"a;bT:a<,eN:b>,c,d,e",
gaj:function(){return this.b.b},
gcg:function(){return(this.c&1)!==0},
gev:function(){return this.c===6},
geu:function(){return this.c===8},
gdK:function(){return this.d},
gdR:function(){return this.d}},
G:{
"^":"a;aK:a?,aj:b<,c",
gdD:function(){return this.a===8},
sdE:function(a){if(a)this.a=2
else this.a=0},
bw:function(a,b){var z,y
z=H.f(new P.G(0,$.k,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.dK(b,y)}this.aT(new P.ax(null,z,b==null?1:3,a,b))
return z},
bB:function(a){var z,y
z=$.k
y=new P.G(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.aT(new P.ax(null,y,8,a,null))
return y},
b5:function(){if(this.a!==0)throw H.d(new P.au("Future already completed"))
this.a=1},
gdQ:function(){return this.c},
gau:function(){return this.c},
c4:function(a){this.a=4
this.c=a},
c3:function(a){this.a=8
this.c=a},
dO:function(a,b){this.c3(new P.a6(a,b))},
aT:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ao(null,null,z,new P.hB(this,a))}else{a.a=this.c
this.c=a}},
aJ:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbT()
z.a=y}return y},
a8:function(a){var z,y
z=J.l(a)
if(!!z.$isa4)if(!!z.$isG)P.bg(a,this)
else P.c7(a,this)
else{y=this.aJ()
this.c4(a)
P.ad(this,y)}},
bL:function(a){var z=this.aJ()
this.c4(a)
P.ad(this,z)},
R:[function(a,b){var z=this.aJ()
this.c3(new P.a6(a,b))
P.ad(this,z)},function(a){return this.R(a,null)},"eX","$2","$1","gb_",2,2,12,0],
aW:function(a){var z
if(a==null);else{z=J.l(a)
if(!!z.$isa4){if(!!z.$isG){z=a.a
if(z>=4&&z===8){this.b5()
z=this.b
z.toString
P.ao(null,null,z,new P.hD(this,a))}else P.bg(a,this)}else P.c7(a,this)
return}}this.b5()
z=this.b
z.toString
P.ao(null,null,z,new P.hE(this,a))},
dq:function(a,b){var z
this.b5()
z=this.b
z.toString
P.ao(null,null,z,new P.hC(this,a,b))},
$isa4:1,
static:{c7:function(a,b){var z,y,x,w
b.saK(2)
try{a.bw(new P.hF(b),new P.hG(b))}catch(x){w=H.E(x)
z=w
y=H.z(x)
P.e2(new P.hH(b,z,y))}},bg:function(a,b){var z
b.a=2
z=new P.ax(null,b,0,null,null)
if(a.a>=4)P.ad(a,z)
else a.aT(z)},ad:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdD()
if(b==null){if(w){v=z.a.gau()
y=z.a.gaj()
x=J.a3(v)
u=v.gP()
y.toString
P.aR(null,null,y,x,u)}return}for(;b.gbT()!=null;b=t){t=b.a
b.a=null
P.ad(z.a,b)}x.a=!0
s=w?null:z.a.gdQ()
x.b=s
x.c=!1
y=!w
if(!y||b.gcg()||b.c===8){r=b.gaj()
if(w){u=z.a.gaj()
u.toString
if(u==null?r!=null:u!==r){u=u.gbj()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gau()
y=z.a.gaj()
x=J.a3(v)
u=v.gP()
y.toString
P.aR(null,null,y,x,u)
return}q=$.k
if(q==null?r!=null:q!==r)$.k=r
else q=null
if(y){if(b.gcg())x.a=new P.hJ(x,b,s,r).$0()}else new P.hI(z,x,b,r).$0()
if(b.geu())new P.hK(z,x,w,b,r).$0()
if(q!=null)$.k=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.l(y).$isa4}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.G)if(p.a>=4){o.a=2
z.a=p
b=new P.ax(null,o,0,null,null)
y=p
continue}else P.bg(p,o)
else P.c7(p,o)
return}}o=b.b
b=o.aJ()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hB:{
"^":"e:0;a,b",
$0:function(){P.ad(this.a,this.b)}},
hF:{
"^":"e:2;a",
$1:function(a){this.a.bL(a)}},
hG:{
"^":"e:7;a",
$2:function(a,b){this.a.R(a,b)},
$1:function(a){return this.$2(a,null)}},
hH:{
"^":"e:0;a,b,c",
$0:function(){this.a.R(this.b,this.c)}},
hD:{
"^":"e:0;a,b",
$0:function(){P.bg(this.b,this.a)}},
hE:{
"^":"e:0;a,b",
$0:function(){this.a.bL(this.b)}},
hC:{
"^":"e:0;a,b,c",
$0:function(){this.a.R(this.b,this.c)}},
hJ:{
"^":"e:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aO(this.b.gdK(),this.c)
return!0}catch(x){w=H.E(x)
z=w
y=H.z(x)
this.a.b=new P.a6(z,y)
return!1}}},
hI:{
"^":"e:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gau()
y=!0
r=this.c
if(r.gev()){x=r.d
try{y=this.d.aO(x,J.a3(z))}catch(q){r=H.E(q)
w=r
v=H.z(q)
r=J.a3(z)
p=w
o=(r==null?p==null:r===p)?z:new P.a6(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aT()
p=H.aq(p,[p,p]).a9(r)
n=this.d
m=this.b
if(p)m.b=n.eO(u,J.a3(z),z.gP())
else m.b=n.aO(u,J.a3(z))}catch(q){r=H.E(q)
t=r
s=H.z(q)
r=J.a3(z)
p=t
o=(r==null?p==null:r===p)?z:new P.a6(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
hK:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cF(this.d.gdR())
z.a=w
v=w}catch(u){z=H.E(u)
y=z
x=H.z(u)
if(this.c){z=J.a3(this.a.a.gau())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gau()
else v.b=new P.a6(y,x)
v.a=!1
return}if(!!J.l(v).$isa4){t=this.d
s=t.geN(t)
s.sdE(!0)
this.b.c=!0
v.bw(new P.hL(this.a,s),new P.hM(z,s))}}},
hL:{
"^":"e:2;a,b",
$1:function(a){P.ad(this.a.a,new P.ax(null,this.b,0,null,null))}},
hM:{
"^":"e:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.G)){y=H.f(new P.G(0,$.k,null),[null])
z.a=y
y.dO(a,b)}P.ad(z.a,new P.ax(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dA:{
"^":"a;a,b,c",
dX:function(){return this.a.$0()}},
ab:{
"^":"a;",
an:function(a,b){return H.f(new P.hY(b,this),[H.P(this,"ab",0),null])},
J:function(a,b){var z,y
z={}
y=H.f(new P.G(0,$.k,null),[null])
z.a=null
z.a=this.ae(new P.fJ(z,this,b,y),!0,new P.fK(y),y.gb_())
return y},
gm:function(a){var z,y
z={}
y=H.f(new P.G(0,$.k,null),[P.o])
z.a=0
this.ae(new P.fL(z),!0,new P.fM(z,y),y.gb_())
return y},
bx:function(a){var z,y
z=H.f([],[H.P(this,"ab",0)])
y=H.f(new P.G(0,$.k,null),[[P.j,H.P(this,"ab",0)]])
this.ae(new P.fN(this,z),!0,new P.fO(z,y),y.gb_())
return y}},
fJ:{
"^":"e;a,b,c,d",
$1:function(a){P.ik(new P.fH(this.c,a),new P.fI(),P.ic(this.a.a,this.d))},
$signature:function(){return H.bj(function(a){return{func:1,args:[a]}},this.b,"ab")}},
fH:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fI:{
"^":"e:2;",
$1:function(a){}},
fK:{
"^":"e:0;a",
$0:function(){this.a.a8(null)}},
fL:{
"^":"e:2;a",
$1:function(a){++this.a.a}},
fM:{
"^":"e:0;a,b",
$0:function(){this.b.a8(this.a.a)}},
fN:{
"^":"e;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bj(function(a){return{func:1,args:[a]}},this.a,"ab")}},
fO:{
"^":"e:0;a,b",
$0:function(){this.b.a8(this.a)}},
fG:{
"^":"a;"},
kn:{
"^":"a;"},
hn:{
"^":"a;aj:d<,aK:e?",
br:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c9()
if((z&4)===0&&(this.e&32)===0)this.bQ(this.gbV())},
aB:function(a){return this.br(a,null)},
cB:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gS(z)}else z=!1
if(z)this.r.aR(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bQ(this.gbX())}}}},
bd:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aX()
return this.f},
aX:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c9()
if((this.e&32)===0)this.r=null
this.f=this.bU()},
aV:["d9",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.c0(a)
else this.aU(new P.ht(a,null))}],
aS:["da",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.c2(a,b)
else this.aU(new P.hv(a,b,null))}],
dn:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.c1()
else this.aU(C.y)},
bW:[function(){},"$0","gbV",0,0,1],
bY:[function(){},"$0","gbX",0,0,1],
bU:function(){return},
aU:function(a){var z,y
z=this.r
if(z==null){z=new P.i7(null,null,0)
this.r=z}z.ak(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aR(this)}},
c0:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bv(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aY((z&4)!==0)},
c2:function(a,b){var z,y
z=this.e
y=new P.hp(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aX()
z=this.f
if(!!J.l(z).$isa4)z.bB(y)
else y.$0()}else{y.$0()
this.aY((z&4)!==0)}},
c1:function(){var z,y
z=new P.ho(this)
this.aX()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.l(y).$isa4)y.bB(z)
else z.$0()},
bQ:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aY((z&4)!==0)},
aY:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gS(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gS(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bW()
else this.bY()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aR(this)},
dj:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dK(b,z)
this.c=c}},
hp:{
"^":"e:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aT()
x=H.aq(x,[x,x]).a9(y)
w=z.d
v=this.b
u=z.b
if(x)w.eP(u,v,this.c)
else w.bv(u,v)
z.e=(z.e&4294967263)>>>0}},
ho:{
"^":"e:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cG(z.c)
z.e=(z.e&4294967263)>>>0}},
dC:{
"^":"a;aN:a@"},
ht:{
"^":"dC;b,a",
bs:function(a){a.c0(this.b)}},
hv:{
"^":"dC;ax:b>,P:c<,a",
bs:function(a){a.c2(this.b,this.c)}},
hu:{
"^":"a;",
bs:function(a){a.c1()},
gaN:function(){return},
saN:function(a){throw H.d(new P.au("No events after a done."))}},
i_:{
"^":"a;aK:a?",
aR:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.e2(new P.i0(this,a))
this.a=1},
c9:function(){if(this.a===1)this.a=3}},
i0:{
"^":"e:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.eq(this.b)}},
i7:{
"^":"i_;b,c,a",
gS:function(a){return this.c==null},
ak:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saN(b)
this.c=b}},
eq:function(a){var z,y
z=this.b
y=z.gaN()
this.b=y
if(y==null)this.c=null
z.bs(a)}},
dH:{
"^":"a;a,b,c,aK:d?",
bH:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
f1:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a8(!0)
return}this.a.aB(0)
this.c=a
this.d=3},"$1","gdG",2,0,function(){return H.bj(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dH")}],
dJ:[function(a,b){var z
if(this.d===2){z=this.c
this.bH(0)
z.R(a,b)
return}this.a.aB(0)
this.c=new P.a6(a,b)
this.d=4},function(a){return this.dJ(a,null)},"f3","$2","$1","gdI",2,2,14,0],
f2:[function(){if(this.d===2){var z=this.c
this.bH(0)
z.a8(!1)
return}this.a.aB(0)
this.c=null
this.d=5},"$0","gdH",0,0,1]},
ie:{
"^":"e:0;a,b,c",
$0:function(){return this.a.R(this.b,this.c)}},
id:{
"^":"e:5;a,b",
$2:function(a,b){return P.ib(this.a,this.b,a,b)}},
c6:{
"^":"ab;",
ae:function(a,b,c,d){return this.dv(a,d,c,!0===b)},
cm:function(a,b,c){return this.ae(a,null,b,c)},
dv:function(a,b,c,d){return P.hA(this,a,b,c,d,H.P(this,"c6",0),H.P(this,"c6",1))},
bR:function(a,b){b.aV(a)},
$asab:function(a,b){return[b]}},
dD:{
"^":"hn;x,y,a,b,c,d,e,f,r",
aV:function(a){if((this.e&2)!==0)return
this.d9(a)},
aS:function(a,b){if((this.e&2)!==0)return
this.da(a,b)},
bW:[function(){var z=this.y
if(z==null)return
z.aB(0)},"$0","gbV",0,0,1],
bY:[function(){var z=this.y
if(z==null)return
z.cB()},"$0","gbX",0,0,1],
bU:function(){var z=this.y
if(z!=null){this.y=null
z.bd()}return},
eY:[function(a){this.x.bR(a,this)},"$1","gdz",2,0,function(){return H.bj(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dD")}],
f_:[function(a,b){this.aS(a,b)},"$2","gdB",4,0,15],
eZ:[function(){this.dn()},"$0","gdA",0,0,1],
dk:function(a,b,c,d,e,f,g){var z,y
z=this.gdz()
y=this.gdB()
this.y=this.x.a.cm(z,this.gdA(),y)},
static:{hA:function(a,b,c,d,e,f,g){var z=$.k
z=H.f(new P.dD(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.dj(b,c,d,e)
z.dk(a,b,c,d,e,f,g)
return z}}},
hY:{
"^":"c6;b,a",
bR:function(a,b){var z,y,x,w,v
z=null
try{z=this.dP(a)}catch(w){v=H.E(w)
y=v
x=H.z(w)
$.k.toString
b.aS(y,x)
return}b.aV(z)},
dP:function(a){return this.b.$1(a)}},
a6:{
"^":"a;ax:a>,P:b<",
j:function(a){return H.b(this.a)},
$isD:1},
ia:{
"^":"a;"},
ij:{
"^":"e:0;a,b",
$0:function(){var z=this.a
throw H.d(new P.i8(z,P.i9(z,this.b)))}},
i2:{
"^":"ia;",
gbj:function(){return this},
cG:function(a){var z,y,x,w
try{if(C.d===$.k){x=a.$0()
return x}x=P.dL(null,null,this,a)
return x}catch(w){x=H.E(w)
z=x
y=H.z(w)
return P.aR(null,null,this,z,y)}},
bv:function(a,b){var z,y,x,w
try{if(C.d===$.k){x=a.$1(b)
return x}x=P.dN(null,null,this,a,b)
return x}catch(w){x=H.E(w)
z=x
y=H.z(w)
return P.aR(null,null,this,z,y)}},
eP:function(a,b,c){var z,y,x,w
try{if(C.d===$.k){x=a.$2(b,c)
return x}x=P.dM(null,null,this,a,b,c)
return x}catch(w){x=H.E(w)
z=x
y=H.z(w)
return P.aR(null,null,this,z,y)}},
bb:function(a,b){if(b)return new P.i3(this,a)
else return new P.i4(this,a)},
dU:function(a,b){if(b)return new P.i5(this,a)
else return new P.i6(this,a)},
h:function(a,b){return},
cF:function(a){if($.k===C.d)return a.$0()
return P.dL(null,null,this,a)},
aO:function(a,b){if($.k===C.d)return a.$1(b)
return P.dN(null,null,this,a,b)},
eO:function(a,b,c){if($.k===C.d)return a.$2(b,c)
return P.dM(null,null,this,a,b,c)}},
i3:{
"^":"e:0;a,b",
$0:function(){return this.a.cG(this.b)}},
i4:{
"^":"e:0;a,b",
$0:function(){return this.a.cF(this.b)}},
i5:{
"^":"e:2;a,b",
$1:function(a){return this.a.bv(this.b,a)}},
i6:{
"^":"e:2;a,b",
$1:function(a){return this.a.aO(this.b,a)}}}],["","",,P,{
"^":"",
bG:function(){return H.f(new H.aL(0,null,null,null,null,null,0),[null,null])},
ak:function(a){return H.dV(a,H.f(new H.aL(0,null,null,null,null,null,0),[null,null]))},
f4:function(a,b,c){var z,y
if(P.cb(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aB()
y.push(a)
try{P.ih(a,z)}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=P.da(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
b0:function(a,b,c){var z,y,x
if(P.cb(a))return b+"..."+c
z=new P.bY(b)
y=$.$get$aB()
y.push(a)
try{x=z
x.a=P.da(x.gah(),a,", ")}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=z
y.a=y.gah()+c
y=z.gah()
return y.charCodeAt(0)==0?y:y},
cb:function(a){var z,y
for(z=0;y=$.$get$aB(),z<y.length;++z)if(a===y[z])return!0
return!1},
ih:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gI(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.b(z.gA())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.c(b,0)
v=b.pop()
if(0>=b.length)return H.c(b,0)
u=b.pop()}else{t=z.gA();++x
if(!z.v()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.c(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gA();++x
for(;z.v();t=s,s=r){r=z.gA();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.c(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.c(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
b4:function(a,b,c,d,e){return H.f(new H.aL(0,null,null,null,null,null,0),[d,e])},
aj:function(a,b){return P.hT(a,b)},
at:function(a,b,c,d){return H.f(new P.hQ(0,null,null,null,null,null,0),[d])},
cT:function(a){var z,y,x
z={}
if(P.cb(a))return"{...}"
y=new P.bY("")
try{$.$get$aB().push(a)
x=y
x.a=x.gah()+"{"
z.a=!0
J.ee(a,new P.fj(z,y))
z=y
z.a=z.gah()+"}"}finally{z=$.$get$aB()
if(0>=z.length)return H.c(z,0)
z.pop()}z=y.gah()
return z.charCodeAt(0)==0?z:z},
hS:{
"^":"aL;a,b,c,d,e,f,r",
az:function(a){return H.iN(a)&0x3ffffff},
aA:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gci()
if(x==null?b==null:x===b)return y}return-1},
static:{hT:function(a,b){return H.f(new P.hS(0,null,null,null,null,null,0),[a,b])}}},
hQ:{
"^":"hN;a,b,c,d,e,f,r",
gI:function(a){var z=new P.cQ(this,this.r,null,null)
z.c=this.e
return z},
gm:function(a){return this.a},
e8:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dt(b)},
dt:function(a){var z=this.d
if(z==null)return!1
return this.aI(z[this.aH(a)],a)>=0},
cn:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.e8(0,a)?a:null
else return this.dF(a)},
dF:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aH(a)]
x=this.aI(y,a)
if(x<0)return
return J.cl(y,x).gbN()},
J:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.L(this))
z=z.b}},
ak:function(a,b){var z,y,x
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
x=y}return this.bI(x,b)}else return this.a2(b)},
a2:function(a){var z,y,x
z=this.d
if(z==null){z=P.hR()
this.d=z}y=this.aH(a)
x=z[y]
if(x==null)z[y]=[this.aZ(a)]
else{if(this.aI(x,a)>=0)return!1
x.push(this.aZ(a))}return!0},
ap:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bJ(this.c,b)
else return this.dM(b)},
dM:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aH(a)]
x=this.aI(y,a)
if(x<0)return!1
this.bK(y.splice(x,1)[0])
return!0},
H:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bI:function(a,b){if(a[b]!=null)return!1
a[b]=this.aZ(b)
return!0},
bJ:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bK(z)
delete a[b]
return!0},
aZ:function(a){var z,y
z=new P.fg(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bK:function(a){var z,y
z=a.gds()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aH:function(a){return J.B(a)&0x3ffffff},
aI:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.F(a[y].gbN(),b))return y
return-1},
$isq:1,
static:{hR:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fg:{
"^":"a;bN:a<,b,ds:c<"},
cQ:{
"^":"a;a,b,c,d",
gA:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.L(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hN:{
"^":"fB;"},
bH:{
"^":"a;",
gI:function(a){return new H.cR(a,this.gm(a),0,null)},
a4:function(a,b){return this.h(a,b)},
J:function(a,b){var z,y
z=this.gm(a)
for(y=0;y<z;++y){if(y>=a.length)return H.c(a,y)
b.$1(a[y])
if(z!==a.length)throw H.d(new P.L(a))}},
an:function(a,b){return H.f(new H.bK(a,b),[null,null])},
j:function(a){return P.b0(a,"[","]")},
$isj:1,
$asj:null,
$isq:1},
fj:{
"^":"e:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
fh:{
"^":"T;a,b,c,d",
gI:function(a){return new P.hU(this,this.c,this.d,this.b,null)},
J:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.c(x,y)
b.$1(x[y])
if(z!==this.d)H.A(new P.L(this))}},
gS:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
H:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.c(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
j:function(a){return P.b0(this,"{","}")},
cA:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.bE());++this.d
y=this.a
x=y.length
if(z>=x)return H.c(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
a2:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.c(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bP();++this.d},
bP:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,[H.w(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.bD(y,0,w,z,x)
C.a.bD(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dd:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$isq:1,
static:{bI:function(a,b){var z=H.f(new P.fh(null,0,0,0),[b])
z.dd(a,b)
return z}}},
hU:{
"^":"a;a,b,c,d,e",
gA:function(){return this.e},
v:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.A(new P.L(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.c(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fC:{
"^":"a;",
an:function(a,b){return H.f(new H.cH(this,b),[H.w(this,0),null])},
j:function(a){return P.b0(this,"{","}")},
J:function(a,b){var z
for(z=this.gI(this);z.v();)b.$1(z.d)},
$isq:1},
fB:{
"^":"fC;"}}],["","",,P,{
"^":"",
il:function(a){return H.fP(a)},
j3:[function(a,b){return J.e9(a,b)},"$2","iw",4,0,19],
bA:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aG(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eK(a)},
eK:function(a){var z=J.l(a)
if(!!z.$ise)return z.j(a)
return H.bc(a)},
b_:function(a){return new P.hz(a)},
bJ:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.bs(a);y.v();)z.push(y.gA())
if(b)return z
z.fixed$length=Array
return z},
aE:function(a){var z=H.b(a)
H.cj(z)},
jS:{
"^":"e:17;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.il(a)}},
cc:{
"^":"a;"},
"+bool":0,
C:{
"^":"a;"},
cF:{
"^":"a;eG:a<,b",
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.cF))return!1
return this.a===b.a&&this.b===b.b},
al:function(a,b){return C.c.al(this.a,b.geG())},
gw:function(a){return this.a},
j:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.eF(z?H.I(this).getUTCFullYear()+0:H.I(this).getFullYear()+0)
x=P.aH(z?H.I(this).getUTCMonth()+1:H.I(this).getMonth()+1)
w=P.aH(z?H.I(this).getUTCDate()+0:H.I(this).getDate()+0)
v=P.aH(z?H.I(this).getUTCHours()+0:H.I(this).getHours()+0)
u=P.aH(z?H.I(this).getUTCMinutes()+0:H.I(this).getMinutes()+0)
t=P.aH(z?H.I(this).getUTCSeconds()+0:H.I(this).getSeconds()+0)
s=P.eG(H.d2(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
$isC:1,
$asC:I.aS,
static:{eF:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},eG:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aH:function(a){if(a>=10)return""+a
return"0"+a}}},
bq:{
"^":"af;",
$isC:1,
$asC:function(){return[P.af]}},
"+double":0,
a7:{
"^":"a;ai:a<",
n:function(a,b){return new P.a7(C.c.n(this.a,b.gai()))},
L:function(a,b){return new P.a7(C.c.L(this.a,b.gai()))},
B:function(a,b){return new P.a7(C.c.C(this.a*b))},
a6:function(a,b){return C.c.a6(this.a,b.gai())},
af:function(a,b){return C.c.af(this.a,b.gai())},
aP:function(a,b){return C.c.aP(this.a,b.gai())},
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.a7))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
al:function(a,b){return C.c.al(this.a,b.gai())},
j:function(a){var z,y,x,w,v
z=new P.eJ()
y=this.a
if(y<0)return"-"+new P.a7(-y).j(0)
x=z.$1(C.c.bt(C.c.aa(y,6e7),60))
w=z.$1(C.c.bt(C.c.aa(y,1e6),60))
v=new P.eI().$1(C.c.bt(y,1e6))
return""+C.c.aa(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isC:1,
$asC:function(){return[P.a7]}},
eI:{
"^":"e:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eJ:{
"^":"e:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
D:{
"^":"a;",
gP:function(){return H.z(this.$thrownJsError)}},
d1:{
"^":"D;",
j:function(a){return"Throw of null."}},
ag:{
"^":"D;a,b,c,d",
gb1:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gb0:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gb1()+y+x
if(!this.a)return w
v=this.gb0()
u=P.bA(this.b)
return w+v+": "+H.b(u)},
static:{bw:function(a){return new P.ag(!1,null,null,a)},eu:function(a,b,c){return new P.ag(!0,a,b,c)}}},
bX:{
"^":"ag;e,f,a,b,c,d",
gb1:function(){return"RangeError"},
gb0:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.af()
if(typeof z!=="number")return H.H(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{fu:function(a){return new P.bX(null,null,!1,null,null,a)},aN:function(a,b,c){return new P.bX(null,null,!0,a,b,"Value not in range")},aM:function(a,b,c,d,e){return new P.bX(b,c,!0,a,d,"Invalid value")},d6:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.aM(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.aM(b,a,c,"end",f))
return b}}},
eT:{
"^":"ag;e,m:f>,a,b,c,d",
gb1:function(){return"RangeError"},
gb0:function(){P.bA(this.e)
var z=": index should be less than "+H.b(this.f)
return J.aV(this.b,0)?": index must not be negative":z},
static:{bD:function(a,b,c,d,e){var z=e!=null?e:J.aF(b)
return new P.eT(b,z,!0,a,c,"Index out of range")}}},
U:{
"^":"D;a",
j:function(a){return"Unsupported operation: "+this.a}},
dz:{
"^":"D;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
au:{
"^":"D;a",
j:function(a){return"Bad state: "+this.a}},
L:{
"^":"D;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bA(z))+"."}},
fs:{
"^":"a;",
j:function(a){return"Out of Memory"},
gP:function(){return},
$isD:1},
d9:{
"^":"a;",
j:function(a){return"Stack Overflow"},
gP:function(){return},
$isD:1},
eE:{
"^":"D;a",
j:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hz:{
"^":"a;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eL:{
"^":"a;a",
j:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.bb(b,"expando$values")
return z==null?null:H.bb(z,this.bO())},
l:function(a,b,c){var z=H.bb(b,"expando$values")
if(z==null){z=new P.a()
H.bW(b,"expando$values",z)}H.bW(z,this.bO(),c)},
bO:function(){var z,y
z=H.bb(this,"expando$key")
if(z==null){y=$.cI
$.cI=y+1
z="expando$key$"+y
H.bW(this,"expando$key",z)}return z}},
o:{
"^":"af;",
$isC:1,
$asC:function(){return[P.af]}},
"+int":0,
T:{
"^":"a;",
an:function(a,b){return H.b6(this,b,H.P(this,"T",0),null)},
J:function(a,b){var z
for(z=this.gI(this);z.v();)b.$1(z.gA())},
by:function(a,b){return P.bJ(this,b,H.P(this,"T",0))},
bx:function(a){return this.by(a,!0)},
gm:function(a){var z,y
z=this.gI(this)
for(y=0;z.v();)++y
return y},
a4:function(a,b){var z,y,x
if(b<0)H.A(P.aM(b,0,null,"index",null))
for(z=this.gI(this),y=0;z.v();){x=z.gA()
if(b===y)return x;++y}throw H.d(P.bD(b,this,"index",null,y))},
j:function(a){return P.f4(this,"(",")")}},
f6:{
"^":"a;"},
j:{
"^":"a;",
$asj:null,
$isq:1},
"+List":0,
jT:{
"^":"a;",
j:function(a){return"null"}},
"+Null":0,
af:{
"^":"a;",
$isC:1,
$asC:function(){return[P.af]}},
"+num":0,
a:{
"^":";",
p:function(a,b){return this===b},
gw:function(a){return H.a9(this)},
j:function(a){return H.bc(this)}},
aa:{
"^":"a;"},
a1:{
"^":"a;",
$isC:1,
$asC:function(){return[P.a1]}},
"+String":0,
bY:{
"^":"a;ah:a<",
gm:function(a){return this.a.length},
j:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{da:function(a,b,c){var z=J.bs(b)
if(!z.v())return a
if(c.length===0){do a+=H.b(z.gA())
while(z.v())}else{a+=H.b(z.gA())
for(;z.v();)a=a+c+H.b(z.gA())}return a}}},
db:{
"^":"a;"}}],["","",,W,{
"^":"",
ae:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dE:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dJ:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hs(a)
if(!!J.l(z).$isW)return z
return}else return a},
K:function(a){var z=$.k
if(z===C.d)return a
return z.dU(a,!0)},
r:{
"^":"aI;",
$isr:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
iU:{
"^":"r;t:type=",
j:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
iW:{
"^":"r;",
j:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
iX:{
"^":"h;t:type=",
"%":"Blob|File"},
iY:{
"^":"r;",
$isW:1,
$ish:1,
"%":"HTMLBodyElement"},
iZ:{
"^":"r;t:type=",
"%":"HTMLButtonElement"},
j_:{
"^":"r;E:height},F:width}",
bC:function(a,b,c){return a.getContext(b,P.iu(c))},
cQ:function(a,b,c,d,e,f,g){var z,y
z=P.ak(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bC(a,"webgl",z)
return y==null?this.bC(a,"experimental-webgl",z):y},
cP:function(a,b){return this.cQ(a,!0,!0,!0,!0,!1,b)},
"%":"HTMLCanvasElement"},
j0:{
"^":"h;",
cl:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
j2:{
"^":"ba;m:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
j4:{
"^":"eU;m:length=",
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eU:{
"^":"h+eD;"},
eD:{
"^":"a;"},
j5:{
"^":"ba;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
j6:{
"^":"h;",
j:function(a){return String(a)},
"%":"DOMException"},
eH:{
"^":"h;bc:bottom=,E:height=,T:left=,bu:right=,ar:top=,F:width=,i:x=,k:y=",
j:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gF(a))+" x "+H.b(this.gE(a))},
p:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isa5)return!1
y=a.left
x=z.gT(b)
if(y==null?x==null:y===x){y=a.top
x=z.gar(b)
if(y==null?x==null:y===x){y=this.gF(a)
x=z.gF(b)
if(y==null?x==null:y===x){y=this.gE(a)
z=z.gE(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){var z,y,x,w
z=J.B(a.left)
y=J.B(a.top)
x=J.B(this.gF(a))
w=J.B(this.gE(a))
return W.dE(W.ae(W.ae(W.ae(W.ae(0,z),y),x),w))},
gbz:function(a){return H.f(new P.M(a.left,a.top),[null])},
$isa5:1,
$asa5:I.aS,
"%":";DOMRectReadOnly"},
aI:{
"^":"ba;",
gM:function(a){return P.fw(C.b.C(a.offsetLeft),C.b.C(a.offsetTop),C.b.C(a.offsetWidth),C.b.C(a.offsetHeight),null)},
j:function(a){return a.localName},
cO:function(a){return a.getBoundingClientRect()},
gcp:function(a){return H.f(new W.u(a,"mousedown",!1),[null])},
gcq:function(a){return H.f(new W.u(a,"mouseenter",!1),[null])},
gcr:function(a){return H.f(new W.u(a,"mouseleave",!1),[null])},
gcs:function(a){return H.f(new W.u(a,"mousemove",!1),[null])},
gct:function(a){return H.f(new W.u(a,"mouseout",!1),[null])},
gcu:function(a){return H.f(new W.u(a,"mouseover",!1),[null])},
gcv:function(a){return H.f(new W.u(a,"mouseup",!1),[null])},
$isaI:1,
$ish:1,
$isW:1,
"%":";Element"},
j7:{
"^":"r;E:height},t:type=,F:width}",
"%":"HTMLEmbedElement"},
j8:{
"^":"bB;ax:error=",
"%":"ErrorEvent"},
bB:{
"^":"h;t:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
W:{
"^":"h;",
dm:function(a,b,c,d){return a.addEventListener(b,H.aC(c,1),d)},
dN:function(a,b,c,d){return a.removeEventListener(b,H.aC(c,1),d)},
$isW:1,
"%":"MediaStream;EventTarget"},
jr:{
"^":"r;t:type=",
"%":"HTMLFieldSetElement"},
ju:{
"^":"r;m:length=",
"%":"HTMLFormElement"},
jw:{
"^":"r;E:height},F:width}",
"%":"HTMLIFrameElement"},
jx:{
"^":"r;E:height},F:width}",
cb:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
jz:{
"^":"r;E:height},t:type=,F:width}",
$isaI:1,
$ish:1,
$isW:1,
"%":"HTMLInputElement"},
jC:{
"^":"r;t:type=",
"%":"HTMLKeygenElement"},
jD:{
"^":"r;t:type=",
"%":"HTMLLinkElement"},
fk:{
"^":"r;ax:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
jG:{
"^":"r;t:type=",
"%":"HTMLMenuElement"},
jH:{
"^":"r;t:type=",
"%":"HTMLMenuItemElement"},
bS:{
"^":"dy;",
gM:function(a){var z,y
if(!!a.offsetX)return H.f(new P.M(a.offsetX,a.offsetY),[null])
else{if(!J.l(W.dJ(a.target)).$isaI)throw H.d(new P.U("offsetX is only supported on elements"))
z=W.dJ(a.target)
y=H.f(new P.M(a.clientX,a.clientY),[null]).L(0,J.em(J.eo(z)))
return H.f(new P.M(J.cB(y.a),J.cB(y.b)),[null])}},
$isbS:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
jR:{
"^":"h;",
$ish:1,
"%":"Navigator"},
ba:{
"^":"W;",
j:function(a){var z=a.nodeValue
return z==null?this.d7(a):z},
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
jU:{
"^":"r;t:type=",
"%":"HTMLOListElement"},
jV:{
"^":"r;E:height},t:type=,F:width}",
"%":"HTMLObjectElement"},
jW:{
"^":"r;t:type=",
"%":"HTMLOutputElement"},
k_:{
"^":"r;t:type=",
"%":"HTMLScriptElement"},
k1:{
"^":"r;m:length=,t:type=",
"%":"HTMLSelectElement"},
k2:{
"^":"r;t:type=",
"%":"HTMLSourceElement"},
k3:{
"^":"bB;ax:error=",
"%":"SpeechRecognitionError"},
k5:{
"^":"r;t:type=",
"%":"HTMLStyleElement"},
k9:{
"^":"r;t:type=",
"%":"HTMLTextAreaElement"},
c1:{
"^":"h;",
$isa:1,
"%":"Touch"},
c2:{
"^":"dy;dY:changedTouches=",
$isc2:1,
$isa:1,
"%":"TouchEvent"},
kb:{
"^":"eW;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bD(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.d(new P.U("Cannot assign element of immutable List."))},
a4:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.c1]},
$isq:1,
$isb3:1,
$isb1:1,
"%":"TouchList"},
eV:{
"^":"h+bH;",
$isj:1,
$asj:function(){return[W.c1]},
$isq:1},
eW:{
"^":"eV+eS;",
$isj:1,
$asj:function(){return[W.c1]},
$isq:1},
dy:{
"^":"bB;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
kd:{
"^":"fk;E:height},F:width}",
"%":"HTMLVideoElement"},
kg:{
"^":"W;",
$ish:1,
$isW:1,
"%":"DOMWindow|Window"},
kk:{
"^":"h;bc:bottom=,E:height=,T:left=,bu:right=,ar:top=,F:width=",
j:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
p:function(a,b){var z,y,x
if(b==null)return!1
z=J.l(b)
if(!z.$isa5)return!1
y=a.left
x=z.gT(b)
if(y==null?x==null:y===x){y=a.top
x=z.gar(b)
if(y==null?x==null:y===x){y=a.width
x=z.gF(b)
if(y==null?x==null:y===x){y=a.height
z=z.gE(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){var z,y,x,w
z=J.B(a.left)
y=J.B(a.top)
x=J.B(a.width)
w=J.B(a.height)
return W.dE(W.ae(W.ae(W.ae(W.ae(0,z),y),x),w))},
gbz:function(a){return H.f(new P.M(a.left,a.top),[null])},
$isa5:1,
$asa5:I.aS,
"%":"ClientRect"},
kl:{
"^":"ba;",
$ish:1,
"%":"DocumentType"},
km:{
"^":"eH;",
gE:function(a){return a.height},
gF:function(a){return a.width},
gi:function(a){return a.x},
si:function(a,b){a.x=b},
gk:function(a){return a.y},
sk:function(a,b){a.y=b},
"%":"DOMRect"},
kp:{
"^":"r;",
$isW:1,
$ish:1,
"%":"HTMLFrameSetElement"},
hy:{
"^":"ab;",
ae:function(a,b,c,d){var z=new W.J(0,this.a,this.b,W.K(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.G()
return z},
cm:function(a,b,c){return this.ae(a,null,b,c)}},
u:{
"^":"hy;a,b,c"},
J:{
"^":"fG;a,b,c,d,e",
bd:function(){if(this.b==null)return
this.c6()
this.b=null
this.d=null
return},
br:function(a,b){if(this.b==null)return;++this.a
this.c6()},
aB:function(a){return this.br(a,null)},
cB:function(){if(this.b==null||this.a<=0)return;--this.a
this.G()},
G:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.e7(x,this.c,z,this.e)}},
c6:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.e8(x,this.c,z,this.e)}}},
eS:{
"^":"a;",
gI:function(a){return new W.eM(a,this.gm(a),-1,null)},
$isj:1,
$asj:null,
$isq:1},
eM:{
"^":"a;a,b,c,d",
v:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cl(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gA:function(){return this.d}},
hr:{
"^":"a;a",
$isW:1,
$ish:1,
static:{hs:function(a){if(a===window)return a
else return new W.hr(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
iS:{
"^":"ai;",
$ish:1,
"%":"SVGAElement"},
iT:{
"^":"fQ;",
$ish:1,
"%":"SVGAltGlyphElement"},
iV:{
"^":"m;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
j9:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEBlendElement"},
ja:{
"^":"m;t:type=,i:x=,k:y=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
jb:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
jc:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFECompositeElement"},
jd:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
je:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
jf:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
jg:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEFloodElement"},
jh:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
ji:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEImageElement"},
jj:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEMergeElement"},
jk:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEMorphologyElement"},
jl:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFEOffsetElement"},
jm:{
"^":"m;i:x=,k:y=",
"%":"SVGFEPointLightElement"},
jn:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
jo:{
"^":"m;i:x=,k:y=",
"%":"SVGFESpotLightElement"},
jp:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFETileElement"},
jq:{
"^":"m;t:type=,i:x=,k:y=",
$ish:1,
"%":"SVGFETurbulenceElement"},
js:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGFilterElement"},
jt:{
"^":"ai;i:x=,k:y=",
"%":"SVGForeignObjectElement"},
eR:{
"^":"ai;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
ai:{
"^":"m;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jy:{
"^":"ai;i:x=,k:y=",
$ish:1,
"%":"SVGImageElement"},
jE:{
"^":"m;",
$ish:1,
"%":"SVGMarkerElement"},
jF:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGMaskElement"},
jX:{
"^":"m;i:x=,k:y=",
$ish:1,
"%":"SVGPatternElement"},
jY:{
"^":"eR;i:x=,k:y=",
"%":"SVGRectElement"},
k0:{
"^":"m;t:type=",
$ish:1,
"%":"SVGScriptElement"},
k6:{
"^":"m;t:type=",
"%":"SVGStyleElement"},
m:{
"^":"aI;",
gcp:function(a){return H.f(new W.u(a,"mousedown",!1),[null])},
gcq:function(a){return H.f(new W.u(a,"mouseenter",!1),[null])},
gcr:function(a){return H.f(new W.u(a,"mouseleave",!1),[null])},
gcs:function(a){return H.f(new W.u(a,"mousemove",!1),[null])},
gct:function(a){return H.f(new W.u(a,"mouseout",!1),[null])},
gcu:function(a){return H.f(new W.u(a,"mouseover",!1),[null])},
gcv:function(a){return H.f(new W.u(a,"mouseup",!1),[null])},
$isW:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
k7:{
"^":"ai;i:x=,k:y=",
$ish:1,
"%":"SVGSVGElement"},
k8:{
"^":"m;",
$ish:1,
"%":"SVGSymbolElement"},
dd:{
"^":"ai;",
"%":";SVGTextContentElement"},
ka:{
"^":"dd;",
$ish:1,
"%":"SVGTextPathElement"},
fQ:{
"^":"dd;i:x=,k:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
kc:{
"^":"ai;i:x=,k:y=",
$ish:1,
"%":"SVGUseElement"},
ke:{
"^":"m;",
$ish:1,
"%":"SVGViewElement"},
ko:{
"^":"m;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
kq:{
"^":"m;",
$ish:1,
"%":"SVGCursorElement"},
kr:{
"^":"m;",
$ish:1,
"%":"SVGFEDropShadowElement"},
ks:{
"^":"m;",
$ish:1,
"%":"SVGGlyphRefElement"},
kt:{
"^":"m;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jZ:{
"^":"h;",
dT:function(a,b,c){return a.bindBuffer(b,c)},
dV:function(a,b){return a.blendEquation(b)},
dW:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
dZ:function(a,b){return a.clear(b)},
e_:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
e0:function(a,b){return a.clearDepth(b)},
e3:function(a,b){return a.clearStencil(b)},
e6:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
ea:function(a){return a.createBuffer()},
eb:function(a){return a.createProgram()},
ec:function(a,b){return a.createShader(b)},
ed:function(a,b){return a.depthFunc(b)},
ee:function(a,b){return a.depthMask(b)},
el:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
em:function(a,b){return a.enable(b)},
en:function(a,b){return a.enableVertexAttribArray(b)},
cN:function(a,b,c){return a.getAttribLocation(b,c)},
cS:function(a,b){return a.getParameter(b)},
cT:function(a,b,c){return a.getUniformLocation(b,c)},
cl:function(a,b){return a.lineWidth(b)},
d3:function(a,b,c,d){return a.stencilFunc(b,c,d)},
d4:function(a,b,c,d){return a.stencilOp(b,c,d)},
eR:function(a,b){return a.useProgram(b)},
eS:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
j1:{
"^":"a;"}}],["","",,P,{
"^":"",
ay:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dF:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
hP:{
"^":"a;",
eI:function(a){if(a<=0||a>4294967296)throw H.d(P.fu("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
M:{
"^":"a;i:a>,k:b>",
j:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
p:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.M))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){var z,y
z=J.B(this.a)
y=J.B(this.b)
return P.dF(P.ay(P.ay(0,z),y))},
n:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gi(b)
if(typeof z!=="number")return z.n()
x=C.b.n(z,x)
z=this.b
y=y.gk(b)
if(typeof z!=="number")return z.n()
y=new P.M(x,C.b.n(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
L:function(a,b){var z,y,x,w
z=this.a
y=J.en(b)
if(typeof z!=="number")return z.L()
if(typeof y!=="number")return H.H(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.L()
if(typeof w!=="number")return H.H(w)
w=new P.M(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
i1:{
"^":"a;",
gbu:function(a){return this.gT(this)+this.c},
gbc:function(a){return this.gar(this)+this.d},
j:function(a){return"Rectangle ("+this.gT(this)+", "+this.b+") "+this.c+" x "+this.d},
p:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!z.$isa5)return!1
if(this.gT(this)===z.gT(b)){y=this.b
z=y===z.gar(b)&&this.a+this.c===z.gbu(b)&&y+this.d===z.gbc(b)}else z=!1
return z},
gw:function(a){var z=this.b
return P.dF(P.ay(P.ay(P.ay(P.ay(0,this.gT(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbz:function(a){var z=new P.M(this.gT(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
a5:{
"^":"i1;T:a>,ar:b>,F:c>,E:d>",
$asa5:null,
static:{fw:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.f(new P.a5(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
n:function(a){return a},
bi:function(a){return a},
cW:{
"^":"h;",
$iscW:1,
"%":"ArrayBuffer"},
bV:{
"^":"h;",
$isbV:1,
"%":"DataView;ArrayBufferView;bT|cX|cZ|bU|cY|d_|a8"},
bT:{
"^":"bV;",
gm:function(a){return a.length},
$isb3:1,
$isb1:1},
bU:{
"^":"cZ;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
return a[b]},
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
a[b]=c}},
cX:{
"^":"bT+bH;",
$isj:1,
$asj:function(){return[P.bq]},
$isq:1},
cZ:{
"^":"cX+cJ;"},
a8:{
"^":"d_;",
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.o]},
$isq:1},
cY:{
"^":"bT+bH;",
$isj:1,
$asj:function(){return[P.o]},
$isq:1},
d_:{
"^":"cY+cJ;"},
jI:{
"^":"bU;",
$isj:1,
$asj:function(){return[P.bq]},
$isq:1,
"%":"Float32Array"},
jJ:{
"^":"bU;",
$isj:1,
$asj:function(){return[P.bq]},
$isq:1,
"%":"Float64Array"},
jK:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isq:1,
"%":"Int16Array"},
jL:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isq:1,
"%":"Int32Array"},
jM:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isq:1,
"%":"Int8Array"},
jN:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isq:1,
"%":"Uint16Array"},
jO:{
"^":"a8;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isq:1,
"%":"Uint32Array"},
jP:{
"^":"a8;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isq:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
jQ:{
"^":"a8;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.o]},
$isq:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
cj:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
fn:{
"^":"av;e,f,r,x,y,z,Q,ch,cx,cy,a,b,c,d",
bo:function(a,b){var z,y
z=this.ch
if(z>10){z=this.f
z.cd()
y=this.Q
z=z.b
if(1>=z.length)return H.c(z,1)
y.d1(z[1])
this.ch=0
z=0}--this.cx
y=--this.cy
this.ch=z+1
if(y<=0){z=this.r
z=z.z/z.r
if(z>0.5){z=10-C.b.X(10*(1/(1+Math.exp(H.O(-5*((z>0?z:-1*z)-1))))))
this.cy=z
if(z>9)this.cy=9
this.f.bn(1,0)}else if(z<-0.5){z=10-C.b.X(10*(1/(1+Math.exp(H.O(-5*((z>0?z:-1*z)-1))))))
this.cy=z
if(z>9)this.cy=9
this.f.bn(-1,0)}z=this.r
z=-z.Q/z.r
if(z<-0.5){z=10-C.b.X(10*(1/(1+Math.exp(H.O(-5*((z>0?z:-1*z)-1))))))
this.cy=z
if(z>9)this.cy=9
this.f.cd()}else if(z>0.5){z=30-C.b.X(10*(1/(1+Math.exp(H.O(-5*((z>0?z:-1*z)-1))))))
this.cy=z
if(z>9)this.cy=9
this.f.cD()}}if(this.x.r&&this.cx<=0){this.cx=10
this.f.cD()}else if(this.y.r&&this.cx<=0){this.cx=10
z=this.f
y=z.b
z.Y(C.a.gu(y),!1)
C.a.gu(y).cE()
if(z.aL(C.a.gu(y))){C.a.gu(y).cC()
z.Y(C.a.gu(y),!0)}else z.Y(C.a.gu(y),!0)}z=this.f
if(z.c){z.a.H(0)
z.c=!1}},
cz:[function(a){},"$1","gcw",2,0,6]},
fo:{
"^":"a;a,b,c,d",
H:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z+1,x=this.b+2,w=x-1,v=0;v<y;++v)for(u=v===z,t=0;t<x;++t)if(t===0||t===w||u)this.K(t,v).a=C.o
else this.K(t,v).a=C.e},
K:function(a,b){var z,y
if(typeof a!=="number")return a.a6()
if(!(a<0)){z=this.c+1
if(!(a>z)){y=J.aD(b)
z=y.a6(b,0)||y.af(b,z)}else z=!0}else z=!0
if(z)return this.d
z=this.a
y=J.e6(b,this.b+2)
if(typeof y!=="number")return H.H(y)
y=a+y
if(y>>>0!==y||y>=z.length)return H.c(z,y)
return z[y]},
e4:function(){var z,y,x,w,v,u
z=[]
for(y=this.c+1-1,x=this.b+2-1,w=0;w<y;++w){u=1
while(!0){if(!(u<x)){v=!0
break}if(this.K(u,w).a===C.e){v=!1
break}++u}if(v)z.push(w)}C.a.bf(z,"sort")
y=P.iw()
H.aO(z,0,z.length-1,y)
return z},
e2:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.R)(a),++y)this.e1(a[y])},
e1:function(a){var z,y,x,w
for(z=this.b+2-1,y=a;x=J.aD(y),x.aP(y,0);y=x.L(y,1))for(w=1;w<z;++w)if(this.K(w,x.L(y,1)).a===C.n)this.K(w,y).a=C.e
else this.K(w,y).a=this.K(w,x.L(y,1)).a},
de:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.c,y=z+1,x=this.b+2,w=this.a,v=x-1,u=0;u<y;++u)for(t=u===z,s=0;s<x;++s)if(s===0||s===v||t)w.push(new F.b7(C.o))
else w.push(new F.b7(C.e))},
static:{cU:function(a,b){var z=new F.fo([],b,a,new F.b7(C.n))
z.de(a,b)
return z}}},
fl:{
"^":"a;a,b,c",
co:function(){var z,y
z=this.b
if(z.length>0){C.a.be(z,"removeAt")
if(0>=z.length)H.A(P.aN(0,null,null))
z.splice(0,1)[0]}for(;z.length<3;){y=F.fq()
y.a=(this.a.b+2)/2|0
y.b=0
z.push(y)}},
cd:function(){var z,y
if(!this.bn(0,1)){z=this.b
if(1>=z.length)return H.c(z,1)
if(this.aL(z[1]))this.c=!0
this.co()
y=this.a.e4()
this.a.e2(y)}},
bn:function(a,b){var z,y,x
z=this.b
this.Y(C.a.gu(z),!1)
y=C.a.gu(z)
y.a=J.v(y.a,a)
y=C.a.gu(z)
y.b=J.v(y.b,b)
if(this.aL(C.a.gu(z))){y=C.a.gu(z)
x=y.a
if(typeof x!=="number")return x.L()
y.a=x-a
x=C.a.gu(z)
y=x.b
if(typeof y!=="number")return y.L()
x.b=y-b
this.Y(C.a.gu(z),!0)
return!1}else{this.Y(C.a.gu(z),!0)
return!0}},
cD:function(){var z=this.b
this.Y(C.a.gu(z),!1)
C.a.gu(z).cE()
if(this.aL(C.a.gu(z))){C.a.gu(z).cC()
this.Y(C.a.gu(z),!0)}else this.Y(C.a.gu(z),!0)},
aL:function(a){var z,y,x,w,v
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.R)(z),++x){w=z[x]
v=J.i(w)
v=this.a.K(J.v(a.a,v.gi(w)),J.v(a.b,v.gk(w))).a
if(!(v===C.e||v===C.n))return!0}return!1},
Y:function(a,b){var z,y,x,w,v,u
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.R)(z),++x){w=z[x]
v=J.i(w)
u=this.a.K(J.v(a.a,v.gi(w)),J.v(a.b,v.gk(w)))
if(u.a!==C.n)if(b)u.a=v.gt(w)
else u.a=C.e}}},
a0:{
"^":"a;a",
j:function(a){return C.G.h(0,this.a)}},
al:{
"^":"a;i:a*,k:b*,c",
cE:function(){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.R)(z),++x){w=z[x]
v=J.i(w)
u=v.gi(w)
t=v.gk(w)
if(typeof t!=="number")return H.H(t)
v.si(w,-1*t)
v.sk(w,u)}},
cC:function(){var z,y,x,w,v,u
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.R)(z),++x){w=z[x]
v=J.i(w)
u=v.gi(w)
v.si(w,v.gk(w))
if(typeof u!=="number")return H.H(u)
v.sk(w,-1*u)}},
static:{fq:function(){switch($.$get$cV().eI(7)){case 0:var z=[]
z.push(new F.p(0,0,C.f))
z.push(new F.p(-1,0,C.f))
z.push(new F.p(1,0,C.f))
z.push(new F.p(2,0,C.f))
return new F.al(0,0,z)
case 1:z=[]
z.push(new F.p(0,0,C.h))
z.push(new F.p(1,0,C.h))
z.push(new F.p(0,-1,C.h))
z.push(new F.p(1,-1,C.h))
return new F.al(0,0,z)
case 2:z=[]
z.push(new F.p(0,0,C.i))
z.push(new F.p(1,0,C.i))
z.push(new F.p(0,-1,C.i))
z.push(new F.p(-1,-1,C.i))
return new F.al(0,0,z)
case 3:z=[]
z.push(new F.p(0,0,C.j))
z.push(new F.p(-1,0,C.j))
z.push(new F.p(0,-1,C.j))
z.push(new F.p(1,-1,C.j))
return new F.al(0,0,z)
case 4:z=[]
z.push(new F.p(1,0,C.m))
z.push(new F.p(1,-1,C.m))
z.push(new F.p(0,0,C.m))
z.push(new F.p(-1,0,C.m))
return new F.al(0,0,z)
case 5:z=[]
z.push(new F.p(-1,0,C.k))
z.push(new F.p(-1,-1,C.k))
z.push(new F.p(0,0,C.k))
z.push(new F.p(1,0,C.k))
return new F.al(0,0,z)
case 6:z=[]
z.push(new F.p(-1,0,C.l))
z.push(new F.p(0,-1,C.l))
z.push(new F.p(0,0,C.l))
z.push(new F.p(1,0,C.l))
return new F.al(0,0,z)
case 7:H.cj("#### WARNING")
break}}}},
p:{
"^":"b7;i:b*,k:c*,a"},
b7:{
"^":"a;t:a>"},
fp:{
"^":"av;e,f,a,b,c,d",
ao:function(a,b){var z,y,x,w,v,u
z=new F.X(0,0,7,7)
y=F.aw(null)
y.b=C.v
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.K(v,x).a
if(u===C.o)y.a=$.$get$bM()
else if(u===C.e)y.a=$.$get$bL()
else if(u===C.f)y.a=$.$get$bO()
else if(u===C.h)y.a=$.$get$b9()
else if(u===C.l)y.a=$.$get$bQ()
else if(u===C.i)y.a=$.$get$bP()
else if(u===C.j)y.a=$.$get$bR()
else if(u===C.k)y.a=$.$get$bN()
else if(u===C.m)y.a=$.$get$b8()
else y.a=$.$get$b8()
b.a3(a,z,y)}}},
fm:{
"^":"av;e,f,a,b,c,d",
d1:function(a){var z,y,x,w,v,u,t,s,r
this.f.H(0)
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.R)(z),++x){w=z[x]
v=this.f
u=J.i(w)
t=u.gi(w)
if(typeof t!=="number")return H.H(t)
s=u.gk(w)
if(typeof s!=="number")return H.H(s)
r=v.K(3+t,3+s)
if(r.a!==C.n)r.a=u.gt(w)}},
ao:function(a,b){var z,y,x,w,v,u
z=new F.X(0,0,7,7)
y=F.aw(null)
y.b=C.v
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.K(v,x).a
if(u===C.o)y.a=$.$get$bM()
else if(u===C.e)y.a=$.$get$bL()
else if(u===C.f)y.a=$.$get$bO()
else if(u===C.h)y.a=$.$get$b9()
else if(u===C.l)y.a=$.$get$bQ()
else if(u===C.i)y.a=$.$get$bP()
else if(u===C.j)y.a=$.$get$bR()
else if(u===C.k)y.a=$.$get$bN()
else if(u===C.m)y.a=$.$get$b8()
else y.a=$.$get$b9()
b.a3(a,z,y)}}}}],["","",,P,{
"^":"",
iu:function(a){var z={}
a.J(0,new P.iv(z))
return z},
iv:{
"^":"e:18;a",
$2:function(a,b){this.a[a]=b}}}],["","",,F,{
"^":"",
dZ:[function(){var z=0,y=new P.bz(),x=1,w,v,u,t,s,r,q,p,o,n,m,l,k,j
function $async$dZ(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:l=G
l=l
k=P
v=new l.fX(700,500,k.bG())
l=E
l=l
k=Float64Array
j=H
u=new l.x(new k(j.n(16)))
l=u
l.D()
l=F
t=new l.fY(400,300,1,1,1,0,0,null,"none",null,u,!1)
l=t
l.b=[]
l=t
k=F
l.ch=k.t(255,238,238,255)
l=E
l=l
k=Float64Array
j=H
u=new l.x(new k(j.n(16)))
l=u
l.D()
l=G
s=new l.h5(null,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
l=s
k=G
l.a=k.h4(400,600)
l=s
l.sN(t)
l=s
l.eH()
l=s
l.eQ()
l=s
l.f=!0
l=s
z=!l.b?2:3
break
case 2:l=s
l.b=!0
l=s
l.aG()
case 3:l=F
l=l
k=F
u=new l.fl(k.cU(21,11),[],!1)
l=u
l.co()
l=E
l=l
k=Float64Array
j=H
r=new l.x(new k(j.n(16)))
l=r
l.D()
l=F
r=new l.fn(v,u,null,null,null,null,null,0,0,0,"none",null,r,!1)
l=r
l.b=[]
l=r
q=l.gcw()
l=F
p=l.t(170,255,170,204)
l=F
o=l.t(170,204,170,255)
l=F
n=l.t(170,204,255,170)
l=E
l=l
k=Float64Array
j=H
m=new l.x(new k(j.n(16)))
l=m
l.D()
l=F
m=new l.de(40,40,!1,!1,"r",p,o,n,q,0,0,0,0,"none",null,m,!1)
l=m
l.b=[]
l=r
l.x=m
l=r
q=l.gcw()
l=F
p=l.t(170,255,170,204)
l=F
o=l.t(170,204,170,255)
l=F
n=l.t(170,204,255,170)
l=E
l=l
k=Float64Array
j=H
m=new l.x(new k(j.n(16)))
l=m
l.D()
l=F
m=new l.de(40,40,!1,!1,"l",p,o,n,q,0,0,0,0,"none",null,m,!1)
l=m
l.b=[]
l=r
l.y=m
l=E
l=l
k=Float64Array
j=H
q=new l.x(new k(j.n(16)))
l=q
l.D()
l=F
q=new l.fZ("joystick",70,35,!1,0,0,0,"none",null,q,!1)
l=q
l.b=[]
l=r
l.r=q
l=u
u=l.a
l=E
l=l
k=Float64Array
j=H
q=new l.x(new k(j.n(16)))
l=q
l.D()
l=F
q=new l.fp(v,u,"none",null,q,!1)
l=q
l.b=[]
l=r
l.z=q
l=E
l=l
k=Float64Array
j=H
u=new l.x(new k(j.n(16)))
l=u
l.D()
l=F
u=new l.fm(v,null,"none",null,u,!1)
l=u
l.b=[]
l=u
k=F
l.f=k.cU(5,5)
l=r
l.Q=u
l=r
l=l
k=r
l.a1(k.z)
l=r
l=l
k=r
l.a1(k.r)
l=r
l=l
k=r
l.a1(k.x)
l=r
l=l
k=r
l.a1(k.y)
l=r
l=l
k=r
l.a1(k.Q)
l=r
l=l.z
l=l.c
l.a5(0,100,25,0)
l=r
l=l.r
l=l.c
l.a5(0,100,250,0)
l=r
l=l.x
l=l.c
l.a5(0,250,225,0)
l=r
l=l.y
l=l.c
l.a5(0,300,225,0)
l=r
l=l.Q
l=l.c
l.a5(0,225,153,0)
l=t
l.a1(r)
return H.Z(null,0,y,null)
case 1:return H.Z(w,1,y)}}return H.Z(null,$async$dZ,y,null)},"$0","e_",0,0,0]},1],["","",,F,{
"^":"",
cP:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.R)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.b9(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
de:{
"^":"av;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
ca:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
bp:function(a,b,c,d,e,f,g){var z
switch(c){case"pointerdown":if(this.ca(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.cy=0
this.db=0}break
case"pointermove":if(this.ca(d,e)){this.x=!0
z=this.cy+(f-this.dx)
this.cy=z
this.db=this.db+(g-this.dy)
if(!(Math.sqrt(H.O(z*z))>this.e)){z=this.db
z=Math.sqrt(H.O(z*z))>this.f}else z=!0
if(z){this.r=!1
this.x=!1}}else{this.r=!1
this.x=!1}break
case"pointerup":if(this.r&&!0)P.eN(new F.fV(this),null)
this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
ao:function(a,b){var z,y,x
z=F.aw(null)
if(this.r){z.a=this.Q
b.a3(a,new F.X(0,0,this.e,this.f),z)}else{y=this.f
x=this.e
if(this.x){z.a=this.ch
b.a3(a,new F.X(0,0,x,y),z)}else{z.a=this.z
b.a3(a,new F.X(0,0,x,y),z)}}},
cz:function(a){return this.cx.$1(a)}},
fV:{
"^":"e:0;a",
$0:function(){var z=this.a
z.cz(z.y)}},
df:{
"^":"a;"},
av:{
"^":"a;",
a1:function(a){var z=0,y=new P.bz(),x=1,w,v=this,u,t,s,r
function $async$a1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.f(new s.G(0,r.k,null),[null])
t=u
t.aW(null)
z=2
return H.Z(u,$async$a1,y)
case 2:t=v
t=t.b
t.push(a)
return H.Z(null,0,y,null)
case 1:return H.Z(w,1,y)}}return H.Z(null,$async$a1,y,null)},
cj:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.R)(z),++x)z[x].cj(a)},
bo:function(a,b){},
cI:function(a,b){var z,y,x
this.bh()
this.bo(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.R)(z),++x)z[x].cI(a,b)},
ao:function(a,b){},
bq:["d8",function(a,b){var z,y,x,w,v,u
this.bh()
this.ao(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.R)(z),++w){v=z[w]
u=v.c
x.push(C.a.gad(x).B(0,u))
b.aE()
v.bq(a,b)
if(0>=x.length)return H.c(x,0)
x.pop()
b.aE()}}],
cJ:["Z",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.bh()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.c(y,w)
v=y[w]
a.W(v.c)
u=v.cJ(a,b,c,d,e)
a.V()
if(u===!0)return u}t=a.cR().bg(0)
t.eA()
y=new E.Y(new Float64Array(H.n(3)))
y.ag(d,e,0)
s=t.B(0,y)
return this.bp(a,b,c,s.gi(s),s.gk(s),d,e)}],
bp:function(a,b,c,d,e,f,g){return!1},
bh:function(){if(!this.d)this.d=!0}},
fW:{
"^":"a;"},
X:{
"^":"a;i:a*,k:b*,c,d",
p:function(a,b){if(b==null)return!1
return b instanceof F.X&&J.F(b.a,this.a)&&J.F(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gw:function(a){return F.cP([J.B(this.a),J.B(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
j:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)+", w:"+this.c+", h:"+this.d}},
dh:{
"^":"a;a",
j:function(a){return C.H.h(0,this.a)}},
h_:{
"^":"a;a,b,c",
dh:function(a){if(this.a==null)this.a=F.t(255,255,255,255)},
static:{aw:function(a){var z=new F.h_(a,C.u,1)
z.dh(a)
return z}}},
dg:{
"^":"a;a",
p:function(a,b){if(b==null)return!1
return b instanceof F.dg&&b.a===this.a},
gw:function(a){return F.cP([this.a&0x1FFFFFFF])},
j:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
dg:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{t:function(a,b,c,d){var z=new F.dg(0)
z.dg(a,b,c,d)
return z}}},
fY:{
"^":"av;e,f,r,x,y,z,Q,ch,a,b,c,d",
cJ:function(a,b,c,d,e){a.W(this.c)
this.Z(a,b,c,d,e)
a.V()},
bo:function(a,b){var z,y,x,w
z=this.e
y=(a.gbA()-a.geJ(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.x(new Float64Array(H.n(16)))
y.D()
this.c=y
y.a5(0,this.z,this.Q,0)
y=this.c
z=this.y
y.aQ(0,z,z,1)},
bq:function(a,b){var z,y,x
z=new F.X(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.gad(x).B(0,y))
b.aE()
y=b.b
y.push(z)
b.av(a,z)
this.d8(a,b)
if(0>=y.length)return H.c(y,0)
y.pop()
if(y.length>0)b.av(a,C.a.gad(y))
else{y=a.a
b.av(a,new F.X(0,0,y.c,y.d))}if(0>=x.length)return H.c(x,0)
x.pop()
b.aE()},
ao:function(a,b){var z,y
z=new F.X(0,0,this.e,this.f)
y=F.aw(null)
y.a=this.ch
b.av(a,z)
b.a3(a,z,y)}},
fZ:{
"^":"av;e,f,r,x,y,z,Q,a,b,c,d",
ao:function(a,b){var z,y,x,w,v,u,t
z=F.aw(null)
if(this.x)z.a=F.t(170,170,170,255)
else z.a=F.t(170,255,170,170)
y=this.f
x=-y/2
w=this.z
v=this.r
u=v/2
t=this.Q
b.bi(a,new F.X(x,x,y,y),z)
b.bi(a,new F.X(w-u,t-u,v,v),z)},
bp:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(!this.x){if(this.cc(d,e,0,0)<this.r){this.y=b
this.x=!0
this.z=d
this.Q=e}}else if(b===this.y)if(c==="pointerup"||c==="pointercancel"){this.x=!1
this.z=0
this.Q=0}else{this.z=d
this.Q=e
z=this.f/2
if(this.cc(0,0,d,e)>z){y=this.z
x=y>0?y:-1*y
w=this.Q
v=x+(w>0?w:-1*w)
this.z=z*y/v
this.Q=z*w/v}}return!1},
cc:function(a,b,c,d){var z,y
z=a-c
H.O(z)
H.O(2)
z=Math.pow(z,2)
y=b-d
H.O(y)
H.O(2)
return Math.sqrt(H.O(z+Math.pow(y,2)))}},
h0:{
"^":"a;",
gN:function(){return this.c$},
sN:function(a){this.c$=a},
eD:function(a){if(!this.e$){this.c$.cj(this)
this.e$=!0}this.c$.cI(this,a)
this.eF()},
W:function(a){var z=this.f$
z.push(C.a.gad(z).B(0,a))},
V:function(){var z=this.f$
if(0>=z.length)return H.c(z,0)
z.pop()},
cR:function(){return C.a.gad(this.f$)}}}],["","",,G,{
"^":"",
c0:function(a,b,c){var z,y,x
z=G.dk(a,35633,b)
y=G.dk(a,35632,c)
x=J.eb(a)
a.attachShader(x,y)
a.attachShader(x,z)
a.linkProgram(x)
return x},
dk:function(a,b,c){var z,y
z=J.ec(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
di:function(a,b){var z=J.ct(a)
a.bindBuffer(34962,z)
a.bufferData(34962,new Float32Array(H.bi(b)),35044)
a.bindBuffer(34962,null)
return z},
dj:function(a,b){var z=J.ct(a)
a.bindBuffer(34963,z)
a.bufferData(34963,new Uint16Array(H.bi(b)),35044)
a.bindBuffer(34963,null)
return z},
dl:function(a,b,c,d){a.uniformMatrix4fv(J.bu(a,b,c),!1,new Float32Array(H.bi(d.gq())))},
h3:{
"^":"a;a,b,c,d",
di:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.X(b)
y=C.c.X(a)
x=document.createElement("canvas",null)
J.et(x,z)
J.es(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.ep(this.b,!0)},
static:{h4:function(a,b){var z=new G.h3(null,null,null,null)
z.di(a,b)
return z}}},
h2:{
"^":"df;c,d,e,f,r,x,y,z,Q,a,b",
bk:function(){var z,y
P.aE("#[A]# "+H.b(J.cy(this.c,35660)))
P.aE("#[B]# "+H.b(J.cy(this.c,33901)))
z=C.a.am(["attribute vec3 vp;","attribute vec4 color;","uniform mat4 u_mat;","varying float v_mode;","varying vec4 vColor;","","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  vColor = color;","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.a.am(["precision mediump float;","varying vec4 vColor;","void main() {"," gl_FragColor = vColor;","}"],"\n")
this.e=G.c0(this.c,z,y)},
H:function(a){this.f=1
this.y=-0.5
J.aX(this.c,2960)
J.cu(this.c,515)
J.cp(this.c,0,0,0,1)
J.cq(this.c,1)
J.cr(this.c,0)
J.aX(this.c,3042)
switch(-1){case-1:J.cm(this.c,32774)
J.cn(this.c,770,771,770,32772)
break}J.co(this.c,17664)
C.a.sm(this.r,0)
C.a.sm(this.x,0)},
cf:function(a){var z,y,x,w,v,u
z=this.r
if(z.length!==0){y=this.x
F.t(170,255,170,170)
J.aY(this.c,this.e)
x=G.di(this.c,z)
J.aW(this.c,34962,x)
w=G.dj(this.c,y)
J.aW(this.c,34963,w)
G.dl(this.c,this.e,"u_mat",this.z)
v=J.bt(this.c,this.e,"color")
u=J.bt(this.c,this.e,"vp")
J.bv(this.c,u,3,5126,!1,28,0)
J.bv(this.c,v,4,5126,!1,28,12)
J.br(this.c,u)
J.br(this.c,v)
J.cw(this.c,4,y.length,5123,0)
J.aY(this.c,null)}},
bi:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.c/2
y=J.v(b.a,z)
x=b.d/2
w=J.v(b.b,x)
v=this.c8()
u=new E.Y(new Float64Array(H.n(3)))
u.ag(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=J.ar(w),o=this.r,n=this.x,m=J.ar(y),l=0;l<25;){k=o.length/7|0
u.si(0,y)
u.sk(0,w)
u.sas(0,this.y)
u=v.B(0,u)
C.a.a0(o,[u.gi(u),u.gk(u),this.y])
C.a.a0(o,[s,r,q,p])
j=6.283185307179586*(l/25)
u.si(0,m.n(y,Math.cos(j)*z))
u.sk(0,t.n(w,Math.sin(j)*x))
u.sas(0,this.y)
u=v.B(0,u)
C.a.a0(o,[u.gi(u),u.gk(u),this.y])
C.a.a0(o,[s,r,q,p]);++l
j=6.283185307179586*(l/25)
u.si(0,m.n(y,Math.cos(j)*z))
u.sk(0,t.n(w,Math.sin(j)*x))
u.sas(0,this.y)
u=v.B(0,u)
C.a.a0(o,[u.gi(u),u.gk(u),this.y])
C.a.a0(o,[s,r,q,p])
C.a.a0(n,[k,k+1,k+2])
this.y+=0.0001}},
a3:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.c8()
y=b.a
x=b.b
w=new E.Y(new Float64Array(H.n(3)))
w.ag(y,x,0)
v=z.B(0,w)
u=J.v(b.a,b.c)
t=J.v(b.b,b.d)
w=new E.Y(new Float64Array(H.n(3)))
w.ag(u,t,0)
s=z.B(0,w)
w=this.r
r=w.length/7|0
q=c.a.a
p=(q>>>16&255)/255
o=(q>>>8&255)/255
n=(q>>>0&255)/255
m=(q>>>24&255)/255
C.a.a0(w,[v.gi(v),v.gk(v),this.y,p,o,n,m,v.gi(v),s.gk(s),this.y,p,o,n,m,s.gi(s),v.gk(v),this.y,p,o,n,m,s.gi(s),s.gk(s),this.y,p,o,n,m])
this.y+=0.0001
w=r+1
q=r+2
C.a.a0(this.x,[r,w,q,w,r+3,q])},
av:function(a,b){},
aE:function(){},
c8:function(){var z,y
this.Q.D()
z=this.Q.a5(0,-1,1,0)
this.Q=z
y=this.d
y=z.aQ(0,2/y.c,-2/y.d,1)
this.Q=y
y=y.B(0,C.a.gad(this.a))
this.Q=y
return y}},
h1:{
"^":"df;c,d,e,f,r,x,a,b",
cf:function(a){},
bk:function(){var z,y
z=C.a.am(["attribute vec3 vp;","uniform mat4 u_mat;","uniform float u_point_size;","varying float v_mode;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  gl_PointSize = 1.0;//u_point_size;","}"],"\n")
y=C.a.am(["precision mediump float;","uniform vec4 color;","void main() {"," gl_FragColor = color;","}"],"\n")
this.e=G.c0(this.c,z,y)
z=C.a.am(["attribute vec3 vp;","uniform mat4 u_mat;","attribute vec2 a_tex;","varying vec2 v_tex;","void main() {","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  v_tex = a_tex;","}"],"\n")
y=C.a.am(["precision mediump float;","varying vec2 v_tex;","uniform sampler2D u_image;","uniform vec4 color;","void main() {"," gl_FragColor = texture2D(u_image, v_tex);","}"],"\n")
this.f=G.c0(this.c,z,y)},
H:function(a){this.r=1
J.aX(this.c,2960)
J.cu(this.c,515)
J.cp(this.c,0,0,0,1)
J.cq(this.c,1)
J.cr(this.c,0)
J.aX(this.c,3042)
switch(-1){case-1:J.cm(this.c,32774)
J.cn(this.c,770,771,770,32772)
break}J.co(this.c,17664)},
a3:function(a,b,c){var z,y,x,w
z=b.a
y=b.b
x=J.v(z,b.c)
w=J.v(b.b,b.d)
this.ce(a,[z,y,0,z,w,0,x,y,0,x,w,0],[0,1,3,2],c.a,c.b,c.c)},
bi:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=b.c/2
y=J.v(b.a,z)
x=b.d/2
w=J.v(b.b,x)
v=[]
u=[]
for(t=J.ar(w),s=J.ar(y),r=0;r<50;++r){u.push(r)
q=6.283185307179586*(r/50)
v.push(s.n(y,Math.cos(q)*z))
v.push(t.n(w,Math.sin(q)*x))
v.push(0)}this.ce(a,v,u,c.a,c.b,c.c)},
ce:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s
J.aY(this.c,this.e)
z=G.di(this.c,b)
J.aW(this.c,34962,z)
y=G.dj(this.c,c)
J.aW(this.c,34963,y)
x=this.c
w=this.e
this.x.D()
v=this.x.a5(0,-1,1,0)
this.x=v
u=this.d
u=v.aQ(0,2/u.c,-2/u.d,1)
this.x=u
u=u.B(0,C.a.gad(this.a))
this.x=u
G.dl(x,w,"u_mat",u)
u=this.c
w=this.e
x=d.a
u.uniform4fv(J.bu(u,w,"color"),new Float32Array(H.bi([(x>>>16&255)/255,(x>>>8&255)/255,(x>>>0&255)/255,(x>>>24&255)/255])))
x=this.c
x.uniform1f(J.bu(x,this.e,"u_point_size"),f)
t=J.bt(this.c,this.e,"vp")
J.bv(this.c,t,3,5126,!1,0,0)
J.br(this.c,t)
if(e===C.u)s=6
else{J.eq(this.c,f)
s=2}J.cw(this.c,s,b.length/3|0,5123,0)
J.aY(this.c,null)},
av:function(a,b){var z
J.cs(this.c,!1,!1,!1,!1)
J.cv(this.c,!1)
J.cA(this.c,7680,7681,7681)
J.cz(this.c,519,this.r,255)
z=F.aw(null)
z.a=F.t(255,255,255,255)
this.a3(null,b,z)
J.cs(this.c,!0,!0,!0,!0)
J.cv(this.c,!0)
J.cA(this.c,7680,7680,7680)
J.cz(this.c,515,this.r,255);++this.r},
aE:function(){}},
fX:{
"^":"fW;b,c,a"},
h5:{
"^":"fr;a,b,c,d,e,f,a$,b$,c$,d$,e$,f$",
gi:function(a){return 0},
gk:function(a){return 0},
gbA:function(){return this.a.c},
geJ:function(a){return 0},
eF:function(){this.e=!0},
aG:function(){var z=0,y=new P.bz(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h
function $async$aG(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:j=H
j=j
i=P
u=j.d2(new i.cF(Date.now(),!1))
j=v
t=j.f
j=v
s=j.a
z=!t?2:4
break
case 2:j=E
j=j
i=Float64Array
h=H
t=new j.x(new i(h.n(16)))
j=t
j.D()
j=E
j=j
i=Float64Array
h=H
r=new j.x(new i(h.n(16)))
j=r
j.D()
j=G
q=new j.h1(null,null,null,null,1,t,[r],[])
j=q
i=s
j.c=i.a
j=q
j.d=s
j=q
j.bk()
j=q
j.H(0)
z=3
break
case 4:j=E
j=j
i=Float64Array
h=H
t=new j.x(new i(h.n(16)))
j=t
j.D()
j=E
j=j
i=Float64Array
h=H
r=new j.x(new i(h.n(16)))
j=r
j.D()
j=E
j=j
i=Float64Array
h=H
p=new j.x(new i(h.n(16)))
j=p
j.D()
j=G
q=new j.h2(null,null,null,1,[],[],0,t,r,[p],[])
j=q
i=s
j.c=i.a
j=q
j.d=s
j=q
j.bk()
j=q
j.H(0)
case 3:o=0,n=0
case 5:j=v
if(!j.b){z=7
break}j=P
j=j
i=P
z=8
return H.Z(j.eO(new i.a7(15e3),null,null),$async$aG,y)
case 8:m=Date.now()
l=m-u
j=v
j=j
i=C
i=i.c
j.eD(i.X(u+l))
o+=l
if(l<0);else ;++n
j=v
j.e=!0
z=o>40?9:10
break
case 9:j=q
j.H(0)
j=v
j=j.gN()
j.bq(v,q)
j=q
j.cf(0)
j=v
j.e=!1
case 10:z=n>40?11:12
break
case 11:j=C
j=j.c
k="###fps  "+j.dc(o,n)
j=H
j.cj(k)
o=0
n=0
case 12:case 6:u=m
z=5
break
case 7:return H.Z(null,0,y,null)
case 1:return H.Z(w,1,y)}}return H.Z(null,$async$aG,y,null)},
eQ:function(){var z,y,x,w
z=P.bG()
y=new G.he(this,z)
x=new G.hd(this,z)
w=this.a.b
w.toString
w=H.f(new W.u(w,"touchcancel",!1),[null])
H.f(new W.J(0,w.a,w.b,W.K(x),w.c),[H.w(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.u(w,"touchend",!1),[null])
H.f(new W.J(0,w.a,w.b,W.K(x),w.c),[H.w(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.u(w,"touchenter",!1),[null])
H.f(new W.J(0,w.a,w.b,W.K(y),w.c),[H.w(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.u(w,"touchleave",!1),[null])
H.f(new W.J(0,w.a,w.b,W.K(y),w.c),[H.w(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.u(w,"touchmove",!1),[null])
H.f(new W.J(0,w.a,w.b,W.K(y),w.c),[H.w(w,0)]).G()
w=this.a.b
w.toString
w=H.f(new W.u(w,"touchstart",!1),[null])
H.f(new W.J(0,w.a,w.b,W.K(y),w.c),[H.w(w,0)]).G()},
eH:function(){var z,y
z={}
z.a=!1
y=J.ef(this.a.b)
H.f(new W.J(0,y.a,y.b,W.K(new G.h6(z,this)),y.c),[H.w(y,0)]).G()
y=J.el(this.a.b)
H.f(new W.J(0,y.a,y.b,W.K(new G.h7(z,this)),y.c),[H.w(y,0)]).G()
y=J.eg(this.a.b)
H.f(new W.J(0,y.a,y.b,W.K(new G.h8(z)),y.c),[H.w(y,0)]).G()
y=J.eh(this.a.b)
H.f(new W.J(0,y.a,y.b,W.K(new G.h9(z,this)),y.c),[H.w(y,0)]).G()
y=J.ei(this.a.b)
H.f(new W.J(0,y.a,y.b,W.K(new G.ha(z,this)),y.c),[H.w(y,0)]).G()
y=J.ej(this.a.b)
H.f(new W.J(0,y.a,y.b,W.K(new G.hb(z,this)),y.c),[H.w(y,0)]).G()
y=J.ek(this.a.b)
H.f(new W.J(0,y.a,y.b,W.K(new G.hc(z)),y.c),[H.w(y,0)]).G()}},
fr:{
"^":"a+h0;"},
he:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
for(z=J.cx(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.R)(z),++v){u=z[v]
t=C.b.C(u.pageX)
s=C.b.C(u.pageY)
new P.M(t,s).$builtinTypeInfo=[null]
r=t-C.b.C(w.a.b.offsetLeft)
t=C.b.C(u.pageX)
s=C.b.C(u.pageY)
new P.M(t,s).$builtinTypeInfo=[null]
q=s-C.b.C(w.a.b.offsetTop)
if(x.aM(u.identifier)){t=w.gN()
s=u.identifier
if(typeof s!=="number")return s.n()
w.W(t.c)
t.Z(w,s+1,"pointermove",r,q)
w.V()}else{x.l(0,u.identifier,u)
t=w.gN()
s=u.identifier
if(typeof s!=="number")return s.n()
w.W(t.c)
t.Z(w,s+1,"pointerdown",r,q)
w.V()}}}},
hd:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=J.cx(a),y=z.length,x=this.b,w=this.a,v=0;v<z.length;z.length===y||(0,H.R)(z),++v){u=z[v]
if(x.aM(u.identifier)){t=C.b.C(u.pageX)
s=C.b.C(u.pageY)
new P.M(t,s).$builtinTypeInfo=[null]
s=C.b.C(w.a.b.offsetLeft)
r=C.b.C(u.pageX)
q=C.b.C(u.pageY)
new P.M(r,q).$builtinTypeInfo=[null]
r=C.b.C(w.a.b.offsetTop)
x.ap(0,u.identifier)
p=w.gN()
o=u.identifier
if(typeof o!=="number")return o.n()
w.W(p.c)
p.Z(w,o+1,"pointerup",t-s,q-r)
w.V()}}}},
h6:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
this.a.a=!0
z=this.b
y=z.gN()
x=J.i(a)
w=x.gM(a)
w=w.gi(w)
w.toString
x=x.gM(a)
x=x.gk(x)
x.toString
z.W(y.c)
y.Z(z,0,"pointerdown",w,x)
z.V()}},
h7:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gN()
w=J.i(a)
v=w.gM(a)
v=v.gi(v)
v.toString
w=w.gM(a)
w=w.gk(w)
w.toString
y.W(x.c)
x.Z(y,0,"pointerup",v,w)
y.V()
z.a=!1}}},
h8:{
"^":"e:3;a",
$1:function(a){if(this.a.a);}},
h9:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gN()
w=J.i(a)
v=w.gM(a)
v=v.gi(v)
v.toString
w=w.gM(a)
w=w.gk(w)
w.toString
y.W(x.c)
x.Z(y,0,"pointercancel",v,w)
y.V()
z.a=!1}}},
ha:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
if(this.a.a){z=this.b
y=z.gN()
x=J.i(a)
w=x.gM(a)
w=w.gi(w)
w.toString
x=x.gM(a)
x=x.gk(x)
x.toString
z.W(y.c)
y.Z(z,0,"pointermove",w,x)
z.V()}}},
hb:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
if(z.a){y=this.b
x=y.gN()
w=J.i(a)
v=w.gM(a)
v=v.gi(v)
v.toString
w=w.gM(a)
w=w.gk(w)
w.toString
y.W(x.c)
x.Z(y,0,"pointercancel",v,w)
y.V()
z.a=!1}}},
hc:{
"^":"e:3;a",
$1:function(a){P.aE("over offset="+H.b(a.gf6())+":"+H.b(a.gf7())+"  client="+H.b(a.gf4())+":"+H.b(a.gf5())+" screen="+H.b(a.geT(a))+":"+H.b(a.geU(a)))
if(this.a.a);}}}],["","",,E,{
"^":"",
x:{
"^":"a;q:a<",
at:function(a){var z,y
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
j:function(a){return"[0] "+this.aF(0).j(0)+"\n[1] "+this.aF(1).j(0)+"\n[2] "+this.aF(2).j(0)+"\n[3] "+this.aF(3).j(0)+"\n"},
gek:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.c(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=16)return H.c(z,b)
z[b]=c},
aF:function(a){var z,y,x
z=new Float64Array(H.n(4))
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
return new E.ac(z)},
bg:function(a){var z=new E.x(new Float64Array(H.n(16)))
z.at(this)
return z},
B:function(a,b){var z,y,x
if(!!b.$isac){z=new Float64Array(H.n(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ac(z)}if(!!b.$isY){z=new Float64Array(H.n(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.Y(z)}if(4===b.gek()){z=new Float64Array(H.n(16))
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
return new E.x(z)}throw H.d(P.bw(b))},
n:function(a,b){var z,y
z=new Float64Array(H.n(16))
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
return new E.x(z)},
a5:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.l(b)
y=!!z.$isac
x=y?b.gbA():1
if(!!z.$isY||y){w=z.gi(b)
v=z.gk(b)
u=z.gas(b)}else{u=d
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
aQ:function(a,b,c,d){var z,y,x,w,v,u
z=J.l(b)
y=!!z.$isac
x=y?b.gbA():1
if(!!z.$isY||y){w=z.gi(b)
v=z.gk(b)
u=z.gas(b)}else{u=d
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
D:function(){var z=this.a
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
eA:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
Y:{
"^":"a;q:a<",
ag:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
at:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
j:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
n:function(a,b){var z,y,x,w
z=this.a
y=C.b.n(z[0],b.gq().h(0,0))
x=C.b.n(z[1],b.gq().h(0,1))
z=C.b.n(z[2],b.gq().h(0,2))
w=new E.Y(new Float64Array(H.n(3)))
w.ag(y,x,z)
return w},
B:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.H(b)
x=z[1]
z=z[2]
w=new E.Y(new Float64Array(H.n(3)))
w.ag(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.c(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=3)return H.c(z,b)
z[b]=c},
gm:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.O(y*y+x*x+z*z))},
bg:function(a){var z=new E.Y(new Float64Array(H.n(3)))
z.at(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sk:function(a,b){this.a[1]=b
return b},
sas:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gk:function(a){return this.a[1]}},
ac:{
"^":"a;q:a<",
bE:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
at:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
j:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
n:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.n(z[0],b.gq().h(0,0))
x=C.b.n(z[1],b.gq().h(0,1))
w=C.b.n(z[2],b.gq().h(0,2))
z=C.b.n(z[3],b.gq().h(0,3))
v=new E.ac(new Float64Array(H.n(4)))
v.bE(y,x,w,z)
return v},
B:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.H(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ac(new Float64Array(H.n(4)))
v.bE(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.c(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=4)return H.c(z,b)
z[b]=c},
gm:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.O(y*y+x*x+w*w+z*z))},
bg:function(a){var z=new E.ac(new Float64Array(H.n(4)))
z.at(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sk:function(a,b){this.a[1]=b
return b},
sas:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gk:function(a){return this.a[1]}}}]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cN.prototype
return J.f8.prototype}if(typeof a=="string")return J.b2.prototype
if(a==null)return J.f9.prototype
if(typeof a=="boolean")return J.f7.prototype
if(a.constructor==Array)return J.aJ.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.V=function(a){if(typeof a=="string")return J.b2.prototype
if(a==null)return a
if(a.constructor==Array)return J.aJ.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.aU=function(a){if(a==null)return a
if(a.constructor==Array)return J.aJ.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.aD=function(a){if(typeof a=="number")return J.aK.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.c3.prototype
return a}
J.ar=function(a){if(typeof a=="number")return J.aK.prototype
if(typeof a=="string")return J.b2.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.c3.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bl(a)}
J.v=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ar(a).n(a,b)}
J.F=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).p(a,b)}
J.S=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aD(a).af(a,b)}
J.aV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aD(a).a6(a,b)}
J.e6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ar(a).B(a,b)}
J.cl=function(a,b){if(a.constructor==Array||typeof a=="string"||H.iK(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.V(a).h(a,b)}
J.e7=function(a,b,c,d){return J.i(a).dm(a,b,c,d)}
J.e8=function(a,b,c,d){return J.i(a).dN(a,b,c,d)}
J.aW=function(a,b,c){return J.i(a).dT(a,b,c)}
J.cm=function(a,b){return J.i(a).dV(a,b)}
J.cn=function(a,b,c,d,e){return J.i(a).dW(a,b,c,d,e)}
J.co=function(a,b){return J.aU(a).dZ(a,b)}
J.cp=function(a,b,c,d,e){return J.i(a).e_(a,b,c,d,e)}
J.cq=function(a,b){return J.i(a).e0(a,b)}
J.cr=function(a,b){return J.i(a).e3(a,b)}
J.cs=function(a,b,c,d,e){return J.i(a).e6(a,b,c,d,e)}
J.e9=function(a,b){return J.ar(a).al(a,b)}
J.ea=function(a,b){return J.i(a).cb(a,b)}
J.ct=function(a){return J.i(a).ea(a)}
J.eb=function(a){return J.i(a).eb(a)}
J.ec=function(a,b){return J.i(a).ec(a,b)}
J.cu=function(a,b){return J.i(a).ed(a,b)}
J.cv=function(a,b){return J.i(a).ee(a,b)}
J.cw=function(a,b,c,d,e){return J.i(a).el(a,b,c,d,e)}
J.ed=function(a,b){return J.aU(a).a4(a,b)}
J.aX=function(a,b){return J.i(a).em(a,b)}
J.br=function(a,b){return J.i(a).en(a,b)}
J.ee=function(a,b){return J.aU(a).J(a,b)}
J.cx=function(a){return J.i(a).gdY(a)}
J.a3=function(a){return J.i(a).gax(a)}
J.B=function(a){return J.l(a).gw(a)}
J.bs=function(a){return J.aU(a).gI(a)}
J.aF=function(a){return J.V(a).gm(a)}
J.ef=function(a){return J.i(a).gcp(a)}
J.eg=function(a){return J.i(a).gcq(a)}
J.eh=function(a){return J.i(a).gcr(a)}
J.ei=function(a){return J.i(a).gcs(a)}
J.ej=function(a){return J.i(a).gct(a)}
J.ek=function(a){return J.i(a).gcu(a)}
J.el=function(a){return J.i(a).gcv(a)}
J.em=function(a){return J.i(a).gbz(a)}
J.en=function(a){return J.i(a).gi(a)}
J.bt=function(a,b,c){return J.i(a).cN(a,b,c)}
J.eo=function(a){return J.i(a).cO(a)}
J.ep=function(a,b){return J.i(a).cP(a,b)}
J.cy=function(a,b){return J.i(a).cS(a,b)}
J.bu=function(a,b,c){return J.i(a).cT(a,b,c)}
J.eq=function(a,b){return J.i(a).cl(a,b)}
J.er=function(a,b){return J.aU(a).an(a,b)}
J.es=function(a,b){return J.i(a).sE(a,b)}
J.et=function(a,b){return J.i(a).sF(a,b)}
J.cz=function(a,b,c,d){return J.i(a).d3(a,b,c,d)}
J.cA=function(a,b,c,d){return J.i(a).d4(a,b,c,d)}
J.cB=function(a){return J.aD(a).X(a)}
J.aG=function(a){return J.l(a).j(a)}
J.aY=function(a,b){return J.i(a).eR(a,b)}
J.bv=function(a,b,c,d,e,f,g){return J.i(a).eS(a,b,c,d,e,f,g)}
var $=I.p
C.a=J.aJ.prototype
C.c=J.cN.prototype
C.b=J.aK.prototype
C.q=J.b2.prototype
C.I=J.ft.prototype
C.J=J.c3.prototype
C.w=new H.cG()
C.x=new P.fs()
C.y=new P.hu()
C.z=new P.hP()
C.d=new P.i2()
C.p=new P.a7(0)
C.A=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.B=function(hooks) {
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
C.r=function getTagFallback(o) {
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
C.t=function(hooks) { return hooks; }

C.C=function(getTagFallback) {
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
C.D=function() {
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
C.E=function(hooks) {
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
C.F=function(hooks) {
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
C.G=new H.cK([0,"MinoTyoe.empty",1,"MinoTyoe.frame",2,"MinoTyoe.out",3,"MinoTyoe.l",4,"MinoTyoe.o",5,"MinoTyoe.s",6,"MinoTyoe.z",7,"MinoTyoe.j",8,"MinoTyoe.t",9,"MinoTyoe.L"])
C.H=new H.cK([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.a0(0)
C.o=new F.a0(1)
C.n=new F.a0(2)
C.f=new F.a0(3)
C.h=new F.a0(4)
C.i=new F.a0(5)
C.j=new F.a0(6)
C.k=new F.a0(7)
C.l=new F.a0(8)
C.m=new F.a0(9)
C.u=new F.dh(0)
C.v=new F.dh(1)
$.d3="$cachedFunction"
$.d4="$cachedInvocation"
$.a_=0
$.as=null
$.cC=null
$.cf=null
$.dQ=null
$.e1=null
$.bk=null
$.bm=null
$.cg=null
$.an=null
$.az=null
$.aA=null
$.ca=!1
$.k=C.d
$.cI=0
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
I.$lazy(y,x,w)}})(["cL","$get$cL",function(){return H.f2()},"cM","$get$cM",function(){return new P.eL(null)},"dm","$get$dm",function(){return H.a2(H.be({toString:function(){return"$receiver$"}}))},"dn","$get$dn",function(){return H.a2(H.be({$method$:null,toString:function(){return"$receiver$"}}))},"dp","$get$dp",function(){return H.a2(H.be(null))},"dq","$get$dq",function(){return H.a2(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"du","$get$du",function(){return H.a2(H.be(void 0))},"dv","$get$dv",function(){return H.a2(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ds","$get$ds",function(){return H.a2(H.dt(null))},"dr","$get$dr",function(){return H.a2(function(){try{null.$method$}catch(z){return z.message}}())},"dx","$get$dx",function(){return H.a2(H.dt(void 0))},"dw","$get$dw",function(){return H.a2(function(){try{(void 0).$method$}catch(z){return z.message}}())},"c5","$get$c5",function(){return P.hi()},"aB","$get$aB",function(){return[]},"bL","$get$bL",function(){return F.t(170,136,136,136)},"bM","$get$bM",function(){return F.t(170,85,51,51)},"bO","$get$bO",function(){return F.t(170,255,255,255)},"b9","$get$b9",function(){return F.t(170,0,0,0)},"bP","$get$bP",function(){return F.t(170,255,170,170)},"bR","$get$bR",function(){return F.t(170,170,255,170)},"bN","$get$bN",function(){return F.t(170,170,170,255)},"b8","$get$b8",function(){return F.t(170,255,255,170)},"bQ","$get$bQ",function(){return F.t(170,170,255,255)},"cV","$get$cV",function(){return C.z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bS]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.aa]},{func:1,args:[P.a1]},{func:1,args:[,],opt:[,]},{func:1,ret:P.a1,args:[P.o]},{func:1,args:[W.c2]},{func:1,args:[,P.a1]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.aa]},{func:1,ret:P.cc},{func:1,void:true,args:[P.a],opt:[P.aa]},{func:1,void:true,args:[,P.aa]},{func:1,args:[,,]},{func:1,args:[P.db,,]},{func:1,args:[P.a1,,]},{func:1,ret:P.o,args:[P.C,P.C]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.iQ(d||a)
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
Isolate.aS=a.aS
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.e3(F.e_(),b)},[])
else (function(b){H.e3(F.e_(),b)})([])})})()