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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aH=function(){}
var dart=[["","",,H,{
"^":"",
ka:{
"^":"b;a"}}],["","",,J,{
"^":"",
m:function(a){return void 0},
bu:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bs:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cg==null){H.jl()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.c2("Return interceptor for "+H.c(y(a,z))))}w=H.jt(a)
if(w==null){if(typeof a=="function")return C.H
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.M
else return C.V}return w},
h:{
"^":"b;",
n:function(a,b){return a===b},
gv:function(a){return H.a7(a)},
i:["dd",function(a){return H.be(a)}],
"%":"Blob|CSSStyleSheet|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|StyleSheet|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
fI:{
"^":"h;",
i:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$iscb:1},
fK:{
"^":"h;",
n:function(a,b){return null==b},
i:function(a){return"null"},
gv:function(a){return 0}},
bI:{
"^":"h;",
gv:function(a){return 0},
i:["de",function(a){return String(a)}],
$isfL:1},
fY:{
"^":"bI;"},
bk:{
"^":"bI;"},
aR:{
"^":"bI;",
i:function(a){var z=a[$.$get$cE()]
return z==null?this.de(a):J.av(z)}},
aP:{
"^":"h;",
cn:function(a,b){if(!!a.immutable$list)throw H.d(new P.M(b))},
cm:function(a,b){if(!!a.fixed$length)throw H.d(new P.M(b))},
G:function(a,b){var z,y
this.cm(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.a0)(b),++y)a.push(b[y])},
F:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.J(a))}},
ae:function(a,b){return H.a(new H.bO(a,b),[null,null])},
cz:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.c(a[x])
if(x>=z)return H.f(y,x)
y[x]=w}return y.join(b)},
O:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
geN:function(a){if(a.length>0)return a[0]
throw H.d(H.bH())},
gad:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.bH())},
bN:function(a,b,c,d,e){var z,y,x
this.cn(a,"set range")
P.bg(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.z(P.a8(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.fG())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
i:function(a){return P.b8(a,"[","]")},
gD:function(a){return new J.cw(a,a.length,0,null)},
gv:function(a){return H.a7(a)},
gj:function(a){return a.length},
sj:function(a,b){this.cm(a,"set length")
if(b<0)throw H.d(P.a8(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.x(a,b))
if(b>=a.length||b<0)throw H.d(H.x(a,b))
return a[b]},
p:function(a,b,c){this.cn(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.x(a,b))
if(b>=a.length||b<0)throw H.d(H.x(a,b))
a[b]=c},
$isb9:1,
$isk:1,
$ask:null,
$isr:1},
k9:{
"^":"aP;"},
cw:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.a0(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aQ:{
"^":"h;",
bA:function(a,b){return a%b},
ah:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.M(""+a))},
H:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.M(""+a))},
bE:function(a){return a},
aV:function(a,b){var z,y,x,w
H.cc(b)
if(b<2||b>36)throw H.d(P.a8(b,2,36,"radix",null))
z=a.toString(b)
if(C.e.co(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.z(new P.M("Unexpected toString result: "+z))
x=J.G(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.e.q("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.d(H.V(b))
return a+b},
dj:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.ah(a/b)},
an:function(a,b){return(a|0)===a?a/b|0:this.ah(a/b)},
aD:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aX:function(a,b){if(typeof b!=="number")throw H.d(H.V(b))
return a<b},
ax:function(a,b){if(typeof b!=="number")throw H.d(H.V(b))
return a>b},
$isb_:1},
cT:{
"^":"aQ;",
$isb_:1,
$isl:1},
fJ:{
"^":"aQ;",
$isb_:1},
ba:{
"^":"h;",
co:function(a,b){if(b<0)throw H.d(H.x(a,b))
if(b>=a.length)throw H.d(H.x(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.d(P.eQ(b,null,null))
return a+b},
dc:function(a,b,c){H.cc(b)
if(c==null)c=a.length
H.cc(c)
if(b<0)throw H.d(P.bf(b,null,null))
if(typeof c!=="number")return H.y(c)
if(b>c)throw H.d(P.bf(b,null,null))
if(c>a.length)throw H.d(P.bf(c,null,null))
return a.substring(b,c)},
da:function(a,b){return this.dc(a,b,null)},
q:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.w)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
el:function(a,b,c){if(c>a.length)throw H.d(P.a8(c,0,a.length,null,null))
return H.jy(a,b,c)},
gP:function(a){return a.length===0},
i:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.x(a,b))
if(b>=a.length||b<0)throw H.d(H.x(a,b))
return a[b]},
$isb9:1,
$isa_:1}}],["","",,H,{
"^":"",
aX:function(a,b){var z=a.aq(b)
if(!init.globalState.d.cy)init.globalState.f.au()
return z},
e3:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isk)throw H.d(P.aL("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.ix(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cR()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.i7(P.bM(null,H.aW),0)
y.z=H.a(new H.a4(0,null,null,null,null,null,0),[P.l,H.c7])
y.ch=H.a(new H.a4(0,null,null,null,null,null,0),[P.l,null])
if(y.x===!0){x=new H.iw()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fz,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.iy)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.a(new H.a4(0,null,null,null,null,null,0),[P.l,H.bh])
w=P.ax(null,null,null,P.l)
v=new H.bh(0,null,!1)
u=new H.c7(y,x,w,init.createNewIsolate(),v,new H.aj(H.bv()),new H.aj(H.bv()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
w.ab(0,0)
u.bQ(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aZ()
x=H.as(y,[y]).a5(a)
if(x)u.aq(new H.jw(z,a))
else{y=H.as(y,[y,y]).a5(a)
if(y)u.aq(new H.jx(z,a))
else u.aq(a)}init.globalState.f.au()},
fD:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fE()
return},
fE:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.M("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.M("Cannot extract URI from \""+H.c(z)+"\""))},
fz:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bl(!0,[]).a6(b.data)
y=J.G(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bl(!0,[]).a6(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bl(!0,[]).a6(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.a(new H.a4(0,null,null,null,null,null,0),[P.l,H.bh])
p=P.ax(null,null,null,P.l)
o=new H.bh(0,null,!1)
n=new H.c7(y,q,p,init.createNewIsolate(),o,new H.aj(H.bv()),new H.aj(H.bv()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
p.ab(0,0)
n.bQ(0,o)
init.globalState.f.a.Z(new H.aW(n,new H.fA(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.au()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.au(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.au()
break
case"close":init.globalState.ch.a3(0,$.$get$cS().h(0,a))
a.terminate()
init.globalState.f.au()
break
case"log":H.fy(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.am(["command","print","msg",z])
q=new H.ao(!0,P.aD(null,P.l)).N(q)
y.toString
self.postMessage(q)}else P.W(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
fy:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.am(["command","log","msg",a])
x=new H.ao(!0,P.aD(null,P.l)).N(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.C(w)
throw H.d(P.b6(z))}},
fB:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.d4=$.d4+("_"+y)
$.d5=$.d5+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.au(f,["spawned",new H.bn(y,x),w,z.r])
x=new H.fC(a,b,c,d,z)
if(e===!0){z.ck(w,w)
init.globalState.f.a.Z(new H.aW(z,x,"start isolate"))}else x.$0()},
iV:function(a){return new H.bl(!0,[]).a6(new H.ao(!1,P.aD(null,P.l)).N(a))},
jw:{
"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jx:{
"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ix:{
"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{iy:function(a){var z=P.am(["command","print","msg",a])
return new H.ao(!0,P.aD(null,P.l)).N(z)}}},
c7:{
"^":"b;a,b,c,f1:d<,em:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
ck:function(a,b){if(!this.f.n(0,a))return
if(this.Q.ab(0,b)&&!this.y)this.y=!0
this.bh()},
fh:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.f(v,w)
v[w]=x
if(w===y.c)y.c1();++y.d}this.y=!1}this.bh()},
e3:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fg:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.z(new P.M("removeRange"))
P.bg(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
d6:function(a,b){if(!this.r.n(0,a))return
this.db=b},
eS:function(a,b,c){var z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){J.au(a,c)
return}z=this.cx
if(z==null){z=P.bM(null,null)
this.cx=z}z.Z(new H.iq(a,c))},
eQ:function(a,b){var z
if(!this.r.n(0,a))return
z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.bs()
return}z=this.cx
if(z==null){z=P.bM(null,null)
this.cx=z}z.Z(this.gf4())},
eT:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.W(a)
if(b!=null)P.W(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.av(a)
y[1]=b==null?null:J.av(b)
for(x=new P.cU(z,z.r,null,null),x.c=z.e;x.t();)J.au(x.d,y)},
aq:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.A(u)
w=t
v=H.C(u)
this.eT(w,v)
if(this.db===!0){this.bs()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gf1()
if(this.cx!=null)for(;t=this.cx,!t.gP(t);)this.cx.cG().$0()}return y},
cC:function(a){return this.b.h(0,a)},
bQ:function(a,b){var z=this.b
if(z.X(a))throw H.d(P.b6("Registry: ports must be registered only once."))
z.p(0,a,b)},
bh:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.bs()},
bs:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.W(0)
for(z=this.b,y=z.gcQ(z),y=y.gD(y);y.t();)y.gw().dE()
z.W(0)
this.c.W(0)
init.globalState.z.a3(0,this.a)
this.dx.W(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
J.au(w,z[v])}this.ch=null}},"$0","gf4",0,0,1]},
iq:{
"^":"e:1;a,b",
$0:function(){J.au(this.a,this.b)}},
i7:{
"^":"b;a,b",
ex:function(){var z=this.a
if(z.b===z.c)return
return z.cG()},
cK:function(){var z,y,x
z=this.ex()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.X(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gP(y)}else y=!1
else y=!1
else y=!1
if(y)H.z(P.b6("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gP(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.am(["command","close"])
x=new H.ao(!0,H.a(new P.dE(0,null,null,null,null,null,0),[null,P.l])).N(x)
y.toString
self.postMessage(x)}return!1}z.ff()
return!0},
cc:function(){if(self.window!=null)new H.i8(this).$0()
else for(;this.cK(););},
au:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cc()
else try{this.cc()}catch(x){w=H.A(x)
z=w
y=H.C(x)
w=init.globalState.Q
v=P.am(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.ao(!0,P.aD(null,P.l)).N(v)
w.toString
self.postMessage(v)}}},
i8:{
"^":"e:1;a",
$0:function(){if(!this.a.cK())return
P.bW(C.f,this)}},
aW:{
"^":"b;a,b,c",
ff:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aq(this.b)}},
iw:{
"^":"b;"},
fA:{
"^":"e:0;a,b,c,d,e,f",
$0:function(){H.fB(this.a,this.b,this.c,this.d,this.e,this.f)}},
fC:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aZ()
w=H.as(x,[x,x]).a5(y)
if(w)y.$2(this.b,this.c)
else{x=H.as(x,[x]).a5(y)
if(x)y.$1(this.b)
else y.$0()}}z.bh()}},
dy:{
"^":"b;"},
bn:{
"^":"dy;b,a",
aZ:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gc4())return
x=H.iV(b)
if(z.gem()===y){y=J.G(x)
switch(y.h(x,0)){case"pause":z.ck(y.h(x,1),y.h(x,2))
break
case"resume":z.fh(y.h(x,1))
break
case"add-ondone":z.e3(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fg(y.h(x,1))
break
case"set-errors-fatal":z.d6(y.h(x,1),y.h(x,2))
break
case"ping":z.eS(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.eQ(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.ab(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a3(0,y)
break}return}y=init.globalState.f
w="receive "+H.c(b)
y.a.Z(new H.aW(z,new H.iA(this,x),w))},
n:function(a,b){if(b==null)return!1
return b instanceof H.bn&&J.X(this.b,b.b)},
gv:function(a){return this.b.gbb()}},
iA:{
"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gc4())z.dz(this.b)}},
c8:{
"^":"dy;b,c,a",
aZ:function(a,b){var z,y,x
z=P.am(["command","message","port",this,"msg",b])
y=new H.ao(!0,P.aD(null,P.l)).N(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.c8&&J.X(this.b,b.b)&&J.X(this.a,b.a)&&J.X(this.c,b.c)},
gv:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.d7()
y=this.a
if(typeof y!=="number")return y.d7()
x=this.c
if(typeof x!=="number")return H.y(x)
return(z<<16^y<<8^x)>>>0}},
bh:{
"^":"b;bb:a<,b,c4:c<",
dE:function(){this.c=!0
this.b=null},
dz:function(a){if(this.c)return
this.dN(a)},
dN:function(a){return this.b.$1(a)},
$ish0:1},
hn:{
"^":"b;a,b,c",
dr:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.Z(new H.aW(y,new H.hp(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ag(new H.hq(this,b),0),a)}else throw H.d(new P.M("Timer greater than 0."))},
static:{ho:function(a,b){var z=new H.hn(!0,!1,null)
z.dr(a,b)
return z}}},
hp:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
hq:{
"^":"e:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aj:{
"^":"b;bb:a<",
gv:function(a){var z=this.a
if(typeof z!=="number")return z.fv()
z=C.a.aD(z,0)^C.a.an(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aj){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ao:{
"^":"b;a,b",
N:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.p(0,a,z.gj(z))
z=J.m(a)
if(!!z.$iscX)return["buffer",a]
if(!!z.$isbT)return["typed",a]
if(!!z.$isb9)return this.d2(a)
if(!!z.$isfx){x=this.gd_()
w=a.gK()
w=H.bc(w,x,H.P(w,"K",0),null)
w=P.bN(w,!0,H.P(w,"K",0))
z=z.gcQ(a)
z=H.bc(z,x,H.P(z,"K",0),null)
return["map",w,P.bN(z,!0,H.P(z,"K",0))]}if(!!z.$isfL)return this.d3(a)
if(!!z.$ish)this.cO(a)
if(!!z.$ish0)this.av(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbn)return this.d4(a)
if(!!z.$isc8)return this.d5(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.av(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaj)return["capability",a.a]
if(!(a instanceof P.b))this.cO(a)
return["dart",init.classIdExtractor(a),this.d1(init.classFieldsExtractor(a))]},"$1","gd_",2,0,2],
av:function(a,b){throw H.d(new P.M(H.c(b==null?"Can't transmit:":b)+" "+H.c(a)))},
cO:function(a){return this.av(a,null)},
d2:function(a){var z=this.d0(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.av(a,"Can't serialize indexable: ")},
d0:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.N(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
d1:function(a){var z
for(z=0;z<a.length;++z)C.b.p(a,z,this.N(a[z]))
return a},
d3:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.av(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.N(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
d5:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
d4:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbb()]
return["raw sendport",a]}},
bl:{
"^":"b;a,b",
a6:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.aL("Bad serialized message: "+H.c(a)))
switch(C.b.geN(a)){case"ref":if(1>=a.length)return H.f(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.f(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.a(this.ao(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.a(this.ao(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.ao(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.a(this.ao(x),[null])
y.fixed$length=Array
return y
case"map":return this.eA(a)
case"sendport":return this.eB(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.ez(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.aj(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ao(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.c(a))}},"$1","gey",2,0,2],
ao:function(a){var z,y,x
z=J.G(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.y(x)
if(!(y<x))break
z.p(a,y,this.a6(z.h(a,y)));++y}return a},
eA:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.a5()
this.b.push(w)
y=J.eM(y,this.gey()).bF(0)
for(z=J.G(y),v=J.G(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.f(y,u)
w.p(0,y[u],this.a6(v.h(x,u)))}return w},
eB:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.X(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cC(w)
if(u==null)return
t=new H.bn(u,x)}else t=new H.c8(y,w,x)
this.b.push(t)
return t},
ez:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.G(y)
v=J.G(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.y(t)
if(!(u<t))break
w[z.h(y,u)]=this.a6(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
f6:function(){throw H.d(new P.M("Cannot modify unmodifiable Map"))},
jg:function(a){return init.types[a]},
dW:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isbb},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.av(a)
if(typeof z!=="string")throw H.d(H.V(a))
return z},
a7:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
d2:function(a,b){throw H.d(new P.ak(a,null,null))},
fZ:function(a,b,c){var z,y
H.j8(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.d2(a,c)
if(3>=z.length)return H.f(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.d2(a,c)},
d6:function(a){var z,y,x,w,v,u,t
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.z||!!J.m(a).$isbk){v=C.j(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof t==="string"&&/^\w+$/.test(t))w=t}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.e.co(w,0)===36)w=C.e.da(w,1)
return(w+H.dX(H.ce(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
be:function(a){return"Instance of '"+H.d6(a)+"'"},
h_:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
aU:function(a){var z
if(typeof a!=="number")return H.y(a)
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.a.aD(z,10))>>>0,(56320|z&1023)>>>0)}}throw H.d(P.a8(a,0,1114111,null,null))},
I:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
d3:function(a){return a.b?H.I(a).getUTCMilliseconds()+0:H.I(a).getMilliseconds()+0},
bd:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.V(a))
return a[b]},
bV:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.V(a))
a[b]=c},
y:function(a){throw H.d(H.V(a))},
f:function(a,b){if(a==null)J.aK(a)
throw H.d(H.x(a,b))},
x:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ai(!0,b,"index",null)
z=J.aK(a)
if(!(b<0)){if(typeof z!=="number")return H.y(z)
y=b>=z}else y=!0
if(y)return P.bG(b,a,"index",null,z)
return P.bf(b,"index",null)},
V:function(a){return new P.ai(!0,a,null,null)},
dR:function(a){return a},
cc:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.V(a))
return a},
j8:function(a){if(typeof a!=="string")throw H.d(H.V(a))
return a},
d:function(a){var z
if(a==null)a=new P.bU()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.e5})
z.name=""}else z.toString=H.e5
return z},
e5:function(){return J.av(this.dartException)},
z:function(a){throw H.d(a)},
a0:function(a){throw H.d(new P.J(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jA(a)
if(a==null)return
if(a instanceof H.bF)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aD(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bK(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.d1(v,null))}}if(a instanceof TypeError){u=$.$get$dj()
t=$.$get$dk()
s=$.$get$dl()
r=$.$get$dm()
q=$.$get$dr()
p=$.$get$ds()
o=$.$get$dp()
$.$get$dn()
n=$.$get$du()
m=$.$get$dt()
l=u.S(y)
if(l!=null)return z.$1(H.bK(y,l))
else{l=t.S(y)
if(l!=null){l.method="call"
return z.$1(H.bK(y,l))}else{l=s.S(y)
if(l==null){l=r.S(y)
if(l==null){l=q.S(y)
if(l==null){l=p.S(y)
if(l==null){l=o.S(y)
if(l==null){l=r.S(y)
if(l==null){l=n.S(y)
if(l==null){l=m.S(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.d1(y,l==null?null:l.method))}}return z.$1(new H.hQ(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.da()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ai(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.da()
return a},
C:function(a){var z
if(a instanceof H.bF)return a.b
if(a==null)return new H.dF(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dF(a,null)},
jv:function(a){if(a==null||typeof a!='object')return J.H(a)
else return H.a7(a)},
dT:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
jn:function(a,b,c,d,e,f,g){var z=J.m(c)
if(z.n(c,0))return H.aX(b,new H.jo(a))
else if(z.n(c,1))return H.aX(b,new H.jp(a,d))
else if(z.n(c,2))return H.aX(b,new H.jq(a,d,e))
else if(z.n(c,3))return H.aX(b,new H.jr(a,d,e,f))
else if(z.n(c,4))return H.aX(b,new H.js(a,d,e,f,g))
else throw H.d(P.b6("Unsupported number of arguments for wrapped closure"))},
ag:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jn)
a.$identity=z
return z},
f4:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isk){z.$reflectionInfo=c
x=H.h3(z).r}else x=c
w=d?Object.create(new H.hb().constructor.prototype):Object.create(new H.bB(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.R
$.R=J.aJ(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cB(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.jg(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cz:H.bC
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cB(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
f1:function(a,b,c,d){var z=H.bC
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cB:function(a,b,c){var z,y,x,w,v,u
if(c)return H.f3(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.f1(y,!w,z,b)
if(y===0){w=$.aw
if(w==null){w=H.b4("self")
$.aw=w}w="return function(){return this."+H.c(w)+"."+H.c(z)+"();"
v=$.R
$.R=J.aJ(v,1)
return new Function(w+H.c(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aw
if(v==null){v=H.b4("self")
$.aw=v}v=w+H.c(v)+"."+H.c(z)+"("+u+");"
w=$.R
$.R=J.aJ(w,1)
return new Function(v+H.c(w)+"}")()},
f2:function(a,b,c,d){var z,y
z=H.bC
y=H.cz
switch(b?-1:a){case 0:throw H.d(new H.h5("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
f3:function(a,b){var z,y,x,w,v,u,t,s
z=H.f0()
y=$.cy
if(y==null){y=H.b4("receiver")
$.cy=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.f2(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.R
$.R=J.aJ(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.R
$.R=J.aJ(u,1)
return new Function(y+H.c(u)+"}")()},
cd:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.f4(a,b,z,!!d,e,f)},
jz:function(a){throw H.d(new P.f9("Cyclic initialization for static "+H.c(a)))},
as:function(a,b,c){return new H.h6(a,b,c,null)},
aZ:function(){return C.v},
bv:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
a:function(a,b){a.$builtinTypeInfo=b
return a},
ce:function(a){if(a==null)return
return a.$builtinTypeInfo},
dU:function(a,b){return H.e4(a["$as"+H.c(b)],H.ce(a))},
P:function(a,b,c){var z=H.dU(a,b)
return z==null?null:z[c]},
v:function(a,b){var z=H.ce(a)
return z==null?null:z[b]},
cj:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dX(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.i(a)
else return},
dX:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bi("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.c(H.cj(u,c))}return w?"":"<"+H.c(z)+">"},
e4:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
j4:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.N(a[y],b[y]))return!1
return!0},
bq:function(a,b,c){return a.apply(b,H.dU(b,c))},
N:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dV(a,b)
if('func' in a)return b.builtin$cls==="fj"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cj(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.c(H.cj(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.j4(H.e4(v,z),x)},
dP:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.N(z,v)||H.N(v,z)))return!1}return!0},
j3:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.N(v,u)||H.N(u,v)))return!1}return!0},
dV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.N(z,y)||H.N(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dP(x,w,!1))return!1
if(!H.dP(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.N(o,n)||H.N(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.N(o,n)||H.N(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.N(o,n)||H.N(n,o)))return!1}}return H.j3(a.named,b.named)},
kW:function(a){var z=$.cf
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kV:function(a){return H.a7(a)},
kU:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jt:function(a){var z,y,x,w,v,u
z=$.cf.$1(a)
y=$.br[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bt[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dO.$2(a,z)
if(z!=null){y=$.br[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bt[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.ci(x)
$.br[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bt[z]=x
return x}if(v==="-"){u=H.ci(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.e_(a,x)
if(v==="*")throw H.d(new P.c2(z))
if(init.leafTags[z]===true){u=H.ci(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.e_(a,x)},
e_:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bu(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
ci:function(a){return J.bu(a,!1,null,!!a.$isbb)},
ju:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bu(z,!1,null,!!z.$isbb)
else return J.bu(z,c,null,null)},
jl:function(){if(!0===$.cg)return
$.cg=!0
H.jm()},
jm:function(){var z,y,x,w,v,u,t,s
$.br=Object.create(null)
$.bt=Object.create(null)
H.jh()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.e1.$1(v)
if(u!=null){t=H.ju(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jh:function(){var z,y,x,w,v,u,t
z=C.D()
z=H.ar(C.A,H.ar(C.F,H.ar(C.k,H.ar(C.k,H.ar(C.E,H.ar(C.B,H.ar(C.C(C.j),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cf=new H.ji(v)
$.dO=new H.jj(u)
$.e1=new H.jk(t)},
ar:function(a,b){return a(b)||b},
jy:function(a,b,c){return a.indexOf(b,c)>=0},
f5:{
"^":"b;",
i:function(a){return P.bP(this)},
p:function(a,b,c){return H.f6()}},
b7:{
"^":"f5;a",
aB:function(){var z=this.$map
if(z==null){z=new H.a4(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dT(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aB().h(0,b)},
F:function(a,b){this.aB().F(0,b)},
gK:function(){return this.aB().gK()},
gj:function(a){var z=this.aB()
return z.gj(z)}},
h2:{
"^":"b;a,b,c,d,e,f,r,x",
static:{h3:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.h2(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hP:{
"^":"b;a,b,c,d,e,f",
S:function(a){var z,y,x
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
return new H.hP(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bj:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},dq:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
d1:{
"^":"F;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
fN:{
"^":"F;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.c(z)+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.c(z)+"' on '"+H.c(y)+"' ("+H.c(this.a)+")"},
static:{bK:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fN(a,y,z?null:b.receiver)}}},
hQ:{
"^":"F;a",
i:function(a){var z=this.a
return C.e.gP(z)?"Error":"Error: "+z}},
bF:{
"^":"b;a,U:b<"},
jA:{
"^":"e:2;a",
$1:function(a){if(!!J.m(a).$isF)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dF:{
"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jo:{
"^":"e:0;a",
$0:function(){return this.a.$0()}},
jp:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jq:{
"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jr:{
"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
js:{
"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{
"^":"b;",
i:function(a){return"Closure '"+H.d6(this)+"'"},
gcR:function(){return this},
gcR:function(){return this}},
dc:{
"^":"e;"},
hb:{
"^":"dc;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bB:{
"^":"dc;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bB))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.a7(this.a)
else y=typeof z!=="object"?J.H(z):H.a7(z)
z=H.a7(this.b)
if(typeof y!=="number")return y.fw()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.be(z)},
static:{bC:function(a){return a.a},cz:function(a){return a.c},f0:function(){var z=$.aw
if(z==null){z=H.b4("self")
$.aw=z}return z},b4:function(a){var z,y,x,w,v
z=new H.bB("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
h5:{
"^":"F;a",
i:function(a){return"RuntimeError: "+this.a}},
d9:{
"^":"b;"},
h6:{
"^":"d9;a,b,c,d",
a5:function(a){var z=this.dI(a)
return z==null?!1:H.dV(z,this.ai())},
dI:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
ai:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$iskE)z.v=true
else if(!x.$iscL)z.ret=y.ai()
y=this.b
if(y!=null&&y.length!==0)z.args=H.d8(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.d8(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dS(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ai()}z.named=w}return z},
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
t=H.dS(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.c(z[s].ai())+" "+s}x+="}"}}return x+(") -> "+H.c(this.a))},
static:{d8:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ai())
return z}}},
cL:{
"^":"d9;",
i:function(a){return"dynamic"},
ai:function(){return}},
a4:{
"^":"b;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gP:function(a){return this.a===0},
gK:function(){return H.a(new H.fP(this),[H.v(this,0)])},
gcQ:function(a){return H.bc(this.gK(),new H.fM(this),H.v(this,0),H.v(this,1))},
X:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bX(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bX(y,a)}else return this.eY(a)},
eY:function(a){var z=this.d
if(z==null)return!1
return this.as(this.V(z,this.ar(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.V(z,b)
return y==null?null:y.ga7()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.V(x,b)
return y==null?null:y.ga7()}else return this.eZ(b)},
eZ:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.V(z,this.ar(a))
x=this.as(y,a)
if(x<0)return
return y[x].ga7()},
p:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bd()
this.b=z}this.bP(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bd()
this.c=y}this.bP(y,b,c)}else{x=this.d
if(x==null){x=this.bd()
this.d=x}w=this.ar(b)
v=this.V(x,w)
if(v==null)this.bf(x,w,[this.be(b,c)])
else{u=this.as(v,b)
if(u>=0)v[u].sa7(c)
else v.push(this.be(b,c))}}},
a3:function(a,b){if(typeof b==="string")return this.cb(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cb(this.c,b)
else return this.f_(b)},
f_:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.V(z,this.ar(a))
x=this.as(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cg(w)
return w.ga7()},
W:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
F:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.J(this))
z=z.c}},
bP:function(a,b,c){var z=this.V(a,b)
if(z==null)this.bf(a,b,this.be(b,c))
else z.sa7(c)},
cb:function(a,b){var z
if(a==null)return
z=this.V(a,b)
if(z==null)return
this.cg(z)
this.bY(a,b)
return z.ga7()},
be:function(a,b){var z,y
z=new H.fO(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cg:function(a){var z,y
z=a.gdW()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ar:function(a){return J.H(a)&0x3ffffff},
as:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.X(a[y].gcv(),b))return y
return-1},
i:function(a){return P.bP(this)},
V:function(a,b){return a[b]},
bf:function(a,b,c){a[b]=c},
bY:function(a,b){delete a[b]},
bX:function(a,b){return this.V(a,b)!=null},
bd:function(){var z=Object.create(null)
this.bf(z,"<non-identifier-key>",z)
this.bY(z,"<non-identifier-key>")
return z},
$isfx:1},
fM:{
"^":"e:2;a",
$1:function(a){return this.a.h(0,a)}},
fO:{
"^":"b;cv:a<,a7:b@,c,dW:d<"},
fP:{
"^":"K;a",
gj:function(a){return this.a.a},
gD:function(a){var z,y
z=this.a
y=new H.fQ(z,z.r,null,null)
y.c=z.e
return y},
F:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.J(z))
y=y.c}},
$isr:1},
fQ:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.J(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ji:{
"^":"e:2;a",
$1:function(a){return this.a(a)}},
jj:{
"^":"e:12;a",
$2:function(a,b){return this.a(a,b)}},
jk:{
"^":"e:5;a",
$1:function(a){return this.a(a)}}}],["","",,N,{
"^":"",
eX:{
"^":"df;e,f,r,a,b,c,d",
cP:function(){P.W("### A")
if(this.e==null||this.f==null)return
P.W("### B")
this.r=F.eS(this.e,this.f.gM(),this.f.ga0())},
bu:function(a,b){var z=this.r
if(z==null)return
z.cs(a,b,this.f,"\u96ea\u304c\u964d\u3063\u305f\u3002abcdefghijklmn",25,C.h,new F.T(10,20,200,200))
z=F.az(null)
z.a=F.ay(255,255,170,170)
z.b=C.o
b.aG(a,new F.T(10,20,200,200),z)
this.r.cs(a,b,this.f,"\u96ea\u304c\u964d\u3063\u305f\u3002abcdefgh",25,C.u,new F.T(100,100,200,200))
z=F.az(null)
z.a=F.ay(255,170,170,255)
z.b=C.o
b.aG(a,new F.T(100,100,200,200),z)},
dm:function(a){P.W("### Z")
a.aI("assets/font_a.png").cL(new N.eZ(this))
a.bt("assets/font_a.json").cL(new N.f_(this))},
static:{eY:function(a){var z=new E.S(new Float64Array(H.n(16)))
z.Y()
z=new N.eX(null,null,null,"none",null,z,!1)
z.b=[]
z.dm(a)
return z}}},
eZ:{
"^":"e:13;a",
$1:function(a){var z=this.a
z.f=a
z.cP()}},
f_:{
"^":"e:5;a",
$1:function(a){var z=this.a
z.e=a
z.cP()}}}],["","",,H,{
"^":"",
bH:function(){return new P.an("No element")},
fG:function(){return new P.an("Too few elements")},
aS:{
"^":"K;",
gD:function(a){return new H.cV(this,this.gj(this),0,null)},
F:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.O(0,y))
if(z!==this.gj(this))throw H.d(new P.J(this))}},
ae:function(a,b){return H.a(new H.bO(this,b),[null,null])},
bG:function(a,b){var z,y,x
z=H.a([],[H.P(this,"aS",0)])
C.b.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.O(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bF:function(a){return this.bG(a,!0)},
$isr:1},
cV:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
t:function(){var z,y,x,w
z=this.a
y=J.G(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.J(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.O(z,w);++this.c
return!0}},
cW:{
"^":"K;a,b",
gD:function(a){var z=new H.fT(null,J.bz(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.aK(this.a)},
$asK:function(a,b){return[b]},
static:{bc:function(a,b,c,d){if(!!J.m(a).$isr)return H.a(new H.cM(a,b),[c,d])
return H.a(new H.cW(a,b),[c,d])}}},
cM:{
"^":"cW;a,b",
$isr:1},
fT:{
"^":"fH;a,b,c",
t:function(){var z=this.b
if(z.t()){this.a=this.ba(z.gw())
return!0}this.a=null
return!1},
gw:function(){return this.a},
ba:function(a){return this.c.$1(a)}},
bO:{
"^":"aS;a,b",
gj:function(a){return J.aK(this.a)},
O:function(a,b){return this.ba(J.eq(this.a,b))},
ba:function(a){return this.b.$1(a)},
$asaS:function(a,b){return[b]},
$asK:function(a,b){return[b]},
$isr:1},
cP:{
"^":"b;"}}],["","",,H,{
"^":"",
dS:function(a){var z=H.a(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
hV:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.j5()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ag(new P.hX(z),1)).observe(y,{childList:true})
return new P.hW(z,y,x)}else if(self.setImmediate!=null)return P.j6()
return P.j7()},
kG:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ag(new P.hY(a),0))},"$1","j5",2,0,4],
kH:[function(a){++init.globalState.f.b
self.setImmediate(H.ag(new P.hZ(a),0))},"$1","j6",2,0,4],
kI:[function(a){P.bX(C.f,a)},"$1","j7",2,0,4],
q:function(a,b,c){if(b===0){J.ej(c,a)
return}else if(b===1){c.cp(H.A(a),H.C(a))
return}P.iO(a,b)
return c.geP()},
iO:function(a,b){var z,y,x,w
z=new P.iP(b)
y=new P.iQ(b)
x=J.m(a)
if(!!x.$isw)a.bg(z,y)
else if(!!x.$isQ)a.aU(z,y)
else{w=H.a(new P.w(0,$.j,null),[null])
w.a=4
w.c=a
w.bg(z,null)}},
af:function(a){var z=function(b,c){while(true)try{a(b,c)
break}catch(y){c=y
b=1}}
$.j.toString
return new P.j2(z)},
dJ:function(a,b){var z=H.aZ()
z=H.as(z,[z,z]).a5(a)
if(z){b.toString
return a}else{b.toString
return a}},
fk:function(a,b){var z=H.a(new P.w(0,$.j,null),[b])
P.bW(C.f,new P.fn(a,z))
return z},
fl:function(a,b,c){var z=H.a(new P.w(0,$.j,null),[c])
P.bW(a,new P.fm(b,z))
return z},
a3:function(a){return H.a(new P.iJ(H.a(new P.w(0,$.j,null),[a])),[a])},
dH:function(a,b,c){$.j.toString
a.J(b,c)},
iY:function(){var z,y
for(;z=$.ap,z!=null;){$.aF=null
y=z.c
$.ap=y
if(y==null)$.aE=null
$.j=z.b
z.ec()}},
kT:[function(){$.c9=!0
try{P.iY()}finally{$.j=C.d
$.aF=null
$.c9=!1
if($.ap!=null)$.$get$c4().$1(P.dQ())}},"$0","dQ",0,0,1],
dN:function(a){if($.ap==null){$.aE=a
$.ap=a
if(!$.c9)$.$get$c4().$1(P.dQ())}else{$.aE.c=a
$.aE=a}},
e2:function(a){var z,y
z=$.j
if(C.d===z){P.aq(null,null,C.d,a)
return}z.toString
if(C.d.gbr()===z){P.aq(null,null,z,a)
return}y=$.j
P.aq(null,null,y,y.bi(a,!0))},
kw:function(a,b){var z,y,x
z=H.a(new P.dG(null,null,null,0),[b])
y=z.gdR()
x=z.gdT()
z.a=a.a2(y,!0,z.gdS(),x)
return z},
j1:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.A(u)
z=t
y=H.C(u)
$.j.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.Y(x)
w=t
v=x.gU()
c.$2(w,v)}}},
iR:function(a,b,c,d){var z=a.bl()
if(!!J.m(z).$isQ)z.bJ(new P.iU(b,c,d))
else b.J(c,d)},
iS:function(a,b){return new P.iT(a,b)},
bW:function(a,b){var z=$.j
if(z===C.d){z.toString
return P.bX(a,b)}return P.bX(a,z.bi(b,!0))},
bX:function(a,b){var z=C.c.an(a.a,1000)
return H.ho(z<0?0:z,b)},
aY:function(a,b,c,d,e){var z,y,x
z={}
z.a=d
y=new P.dx(new P.j0(z,e),C.d,null)
z=$.ap
if(z==null){P.dN(y)
$.aF=$.aE}else{x=$.aF
if(x==null){y.c=z
$.aF=y
$.ap=y}else{y.c=x.c
x.c=y
$.aF=y
if(y.c==null)$.aE=y}}},
j_:function(a,b){throw H.d(new P.a2(a,b))},
dK:function(a,b,c,d){var z,y
y=$.j
if(y===c)return d.$0()
$.j=c
z=y
try{y=d.$0()
return y}finally{$.j=z}},
dM:function(a,b,c,d,e){var z,y
y=$.j
if(y===c)return d.$1(e)
$.j=c
z=y
try{y=d.$1(e)
return y}finally{$.j=z}},
dL:function(a,b,c,d,e,f){var z,y
y=$.j
if(y===c)return d.$2(e,f)
$.j=c
z=y
try{y=d.$2(e,f)
return y}finally{$.j=z}},
aq:function(a,b,c,d){var z=C.d!==c
if(z){d=c.bi(d,!(!z||C.d.gbr()===c))
c=C.d}P.dN(new P.dx(d,c,null))},
hX:{
"^":"e:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
hW:{
"^":"e:14;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hY:{
"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
hZ:{
"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
iP:{
"^":"e:2;a",
$1:function(a){return this.a.$2(0,a)}},
iQ:{
"^":"e:6;a",
$2:function(a,b){this.a.$2(1,new H.bF(a,b))}},
j2:{
"^":"e:15;a",
$2:function(a,b){this.a(a,b)}},
Q:{
"^":"b;"},
fn:{
"^":"e:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a_(this.a.$0())}catch(x){w=H.A(x)
z=w
y=H.C(x)
P.dH(this.b,z,y)}}},
fm:{
"^":"e:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a_(null)}catch(x){w=H.A(x)
z=w
y=H.C(x)
P.dH(this.b,z,y)}}},
dz:{
"^":"b;eP:a<",
cp:function(a,b){a=a!=null?a:new P.bU()
if(this.a.a!==0)throw H.d(new P.an("Future already completed"))
$.j.toString
this.J(a,b)},
bo:function(a){return this.cp(a,null)}},
c3:{
"^":"dz;a",
ac:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.an("Future already completed"))
z.bR(b)},
J:function(a,b){this.a.dC(a,b)}},
iJ:{
"^":"dz;a",
ac:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.an("Future already completed"))
z.a_(b)},
J:function(a,b){this.a.J(a,b)}},
aB:{
"^":"b;c5:a<,fi:b>,c,d,e",
gaa:function(){return this.b.b},
gcu:function(){return(this.c&1)!==0},
geV:function(){return this.c===6},
geU:function(){return this.c===8},
gdV:function(){return this.d},
ge2:function(){return this.d}},
w:{
"^":"b;aE:a?,aa:b<,c",
gdO:function(){return this.a===8},
sdP:function(a){this.a=2},
aU:function(a,b){var z=$.j
if(z!==C.d){z.toString
if(b!=null)b=P.dJ(b,z)}return this.bg(a,b)},
cL:function(a){return this.aU(a,null)},
bg:function(a,b){var z=H.a(new P.w(0,$.j,null),[null])
this.b1(new P.aB(null,z,b==null?1:3,a,b))
return z},
bJ:function(a){var z,y
z=$.j
y=new P.w(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.b1(new P.aB(null,y,8,a,null))
return y},
bc:function(){if(this.a!==0)throw H.d(new P.an("Future already completed"))
this.a=1},
ge1:function(){return this.c},
gal:function(){return this.c},
e_:function(a,b){this.a=8
this.c=new P.a2(a,b)},
b1:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aq(null,null,z,new P.ib(this,a))}else{a.a=this.c
this.c=a}},
aC:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gc5()
z.a=y}return y},
a_:function(a){var z,y
z=J.m(a)
if(!!z.$isQ)if(!!z.$isw)P.bm(a,this)
else P.c6(a,this)
else{y=this.aC()
this.a=4
this.c=a
P.ad(this,y)}},
bW:function(a){var z=this.aC()
this.a=4
this.c=a
P.ad(this,z)},
J:[function(a,b){var z=this.aC()
this.a=8
this.c=new P.a2(a,b)
P.ad(this,z)},function(a){return this.J(a,null)},"fz","$2","$1","gb7",2,2,16,0],
bR:function(a){var z
if(a==null);else{z=J.m(a)
if(!!z.$isQ){if(!!z.$isw){z=a.a
if(z>=4&&z===8){this.bc()
z=this.b
z.toString
P.aq(null,null,z,new P.id(this,a))}else P.bm(a,this)}else P.c6(a,this)
return}}this.bc()
z=this.b
z.toString
P.aq(null,null,z,new P.ie(this,a))},
dC:function(a,b){var z
this.bc()
z=this.b
z.toString
P.aq(null,null,z,new P.ic(this,a,b))},
$isQ:1,
static:{c6:function(a,b){var z,y,x,w
b.saE(2)
try{a.aU(new P.ig(b),new P.ih(b))}catch(x){w=H.A(x)
z=w
y=H.C(x)
P.e2(new P.ii(b,z,y))}},bm:function(a,b){var z
b.a=2
z=new P.aB(null,b,0,null,null)
if(a.a>=4)P.ad(a,z)
else a.b1(z)},ad:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdO()
if(b==null){if(w){v=z.a.gal()
y=z.a.gaa()
x=J.Y(v)
u=v.gU()
y.toString
P.aY(null,null,y,x,u)}return}for(;b.gc5()!=null;b=t){t=b.a
b.a=null
P.ad(z.a,b)}x.a=!0
s=w?null:z.a.ge1()
x.b=s
x.c=!1
y=!w
if(!y||b.gcu()||b.c===8){r=b.gaa()
if(w){u=z.a.gaa()
u.toString
if(u==null?r!=null:u!==r){u=u.gbr()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gal()
y=z.a.gaa()
x=J.Y(v)
u=v.gU()
y.toString
P.aY(null,null,y,x,u)
return}q=$.j
if(q==null?r!=null:q!==r)$.j=r
else q=null
if(y){if(b.gcu())x.a=new P.ik(x,b,s,r).$0()}else new P.ij(z,x,b,r).$0()
if(b.geU())new P.il(z,x,w,b,r).$0()
if(q!=null)$.j=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.m(y).$isQ}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.w)if(p.a>=4){o.a=2
z.a=p
b=new P.aB(null,o,0,null,null)
y=p
continue}else P.bm(p,o)
else P.c6(p,o)
return}}o=b.b
b=o.aC()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
ib:{
"^":"e:0;a,b",
$0:function(){P.ad(this.a,this.b)}},
ig:{
"^":"e:2;a",
$1:function(a){this.a.bW(a)}},
ih:{
"^":"e:7;a",
$2:function(a,b){this.a.J(a,b)},
$1:function(a){return this.$2(a,null)}},
ii:{
"^":"e:0;a,b,c",
$0:function(){this.a.J(this.b,this.c)}},
id:{
"^":"e:0;a,b",
$0:function(){P.bm(this.b,this.a)}},
ie:{
"^":"e:0;a,b",
$0:function(){this.a.bW(this.b)}},
ic:{
"^":"e:0;a,b,c",
$0:function(){this.a.J(this.b,this.c)}},
ik:{
"^":"e:17;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.bC(this.b.gdV(),this.c)
return!0}catch(x){w=H.A(x)
z=w
y=H.C(x)
this.a.b=new P.a2(z,y)
return!1}}},
ij:{
"^":"e:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gal()
y=!0
r=this.c
if(r.geV()){x=r.d
try{y=this.d.bC(x,J.Y(z))}catch(q){r=H.A(q)
w=r
v=H.C(q)
r=J.Y(z)
p=w
o=(r==null?p==null:r===p)?z:new P.a2(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aZ()
p=H.as(p,[p,p]).a5(r)
n=this.d
m=this.b
if(p)m.b=n.fk(u,J.Y(z),z.gU())
else m.b=n.bC(u,J.Y(z))}catch(q){r=H.A(q)
t=r
s=H.C(q)
r=J.Y(z)
p=t
o=(r==null?p==null:r===p)?z:new P.a2(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
il:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cI(this.d.ge2())
z.a=w
v=w}catch(u){z=H.A(u)
y=z
x=H.C(u)
if(this.c){z=J.Y(this.a.a.gal())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gal()
else v.b=new P.a2(y,x)
v.a=!1
return}if(!!J.m(v).$isQ){t=this.d
s=t.gfi(t)
s.sdP(!0)
this.b.c=!0
v.aU(new P.im(this.a,s),new P.io(z,s))}}},
im:{
"^":"e:2;a,b",
$1:function(a){P.ad(this.a.a,new P.aB(null,this.b,0,null,null))}},
io:{
"^":"e:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.w)){y=H.a(new P.w(0,$.j,null),[null])
z.a=y
y.e_(a,b)}P.ad(z.a,new P.aB(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dx:{
"^":"b;a,b,c",
ec:function(){return this.a.$0()}},
aa:{
"^":"b;",
ae:function(a,b){return H.a(new P.iz(b,this),[H.P(this,"aa",0),null])},
F:function(a,b){var z,y
z={}
y=H.a(new P.w(0,$.j,null),[null])
z.a=null
z.a=this.a2(new P.hf(z,this,b,y),!0,new P.hg(y),y.gb7())
return y},
gj:function(a){var z,y
z={}
y=H.a(new P.w(0,$.j,null),[P.l])
z.a=0
this.a2(new P.hh(z),!0,new P.hi(z,y),y.gb7())
return y},
bF:function(a){var z,y
z=H.a([],[H.P(this,"aa",0)])
y=H.a(new P.w(0,$.j,null),[[P.k,H.P(this,"aa",0)]])
this.a2(new P.hj(this,z),!0,new P.hk(z,y),y.gb7())
return y}},
hf:{
"^":"e;a,b,c,d",
$1:function(a){P.j1(new P.hd(this.c,a),new P.he(),P.iS(this.a.a,this.d))},
$signature:function(){return H.bq(function(a){return{func:1,args:[a]}},this.b,"aa")}},
hd:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
he:{
"^":"e:2;",
$1:function(a){}},
hg:{
"^":"e:0;a",
$0:function(){this.a.a_(null)}},
hh:{
"^":"e:2;a",
$1:function(a){++this.a.a}},
hi:{
"^":"e:0;a,b",
$0:function(){this.b.a_(this.a.a)}},
hj:{
"^":"e;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bq(function(a){return{func:1,args:[a]}},this.a,"aa")}},
hk:{
"^":"e:0;a,b",
$0:function(){this.b.a_(this.a)}},
hc:{
"^":"b;"},
kM:{
"^":"b;"},
i_:{
"^":"b;aa:d<,aE:e?",
by:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cl()
if((z&4)===0&&(this.e&32)===0)this.c2(this.gc7())},
at:function(a){return this.by(a,null)},
cH:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gP(z)}else z=!1
if(z)this.r.aY(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.c2(this.gc9())}}}},
bl:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.b4()
return this.f},
b4:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cl()
if((this.e&32)===0)this.r=null
this.f=this.c6()},
b3:["dh",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cd(a)
else this.b2(new P.i4(a,null))}],
b0:["di",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cf(a,b)
else this.b2(new P.i6(a,b,null))}],
dB:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.ce()
else this.b2(C.x)},
c8:[function(){},"$0","gc7",0,0,1],
ca:[function(){},"$0","gc9",0,0,1],
c6:function(){return},
b2:function(a){var z,y
z=this.r
if(z==null){z=new P.iI(null,null,0)
this.r=z}z.ab(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aY(this)}},
cd:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bD(this.a,a)
this.e=(this.e&4294967263)>>>0
this.b5((z&4)!==0)},
cf:function(a,b){var z,y
z=this.e
y=new P.i1(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.b4()
z=this.f
if(!!J.m(z).$isQ)z.bJ(y)
else y.$0()}else{y.$0()
this.b5((z&4)!==0)}},
ce:function(){var z,y
z=new P.i0(this)
this.b4()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isQ)y.bJ(z)
else z.$0()},
c2:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.b5((z&4)!==0)},
b5:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gP(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gP(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.c8()
else this.ca()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aY(this)},
dv:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dJ(b,z)
this.c=c}},
i1:{
"^":"e:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aZ()
x=H.as(x,[x,x]).a5(y)
w=z.d
v=this.b
u=z.b
if(x)w.fl(u,v,this.c)
else w.bD(u,v)
z.e=(z.e&4294967263)>>>0}},
i0:{
"^":"e:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cJ(z.c)
z.e=(z.e&4294967263)>>>0}},
dA:{
"^":"b;aK:a@"},
i4:{
"^":"dA;b,a",
bz:function(a){a.cd(this.b)}},
i6:{
"^":"dA;ap:b>,U:c<,a",
bz:function(a){a.cf(this.b,this.c)}},
i5:{
"^":"b;",
bz:function(a){a.ce()},
gaK:function(){return},
saK:function(a){throw H.d(new P.an("No events after a done."))}},
iB:{
"^":"b;aE:a?",
aY:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.e2(new P.iC(this,a))
this.a=1},
cl:function(){if(this.a===1)this.a=3}},
iC:{
"^":"e:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.eR(this.b)}},
iI:{
"^":"iB;b,c,a",
gP:function(a){return this.c==null},
ab:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saK(b)
this.c=b}},
eR:function(a){var z,y
z=this.b
y=z.gaK()
this.b=y
if(y==null)this.c=null
z.bz(a)}},
dG:{
"^":"b;a,b,c,aE:d?",
bS:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
fD:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a_(!0)
return}this.a.at(0)
this.c=a
this.d=3},"$1","gdR",2,0,function(){return H.bq(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dG")}],
dU:[function(a,b){var z
if(this.d===2){z=this.c
this.bS(0)
z.J(a,b)
return}this.a.at(0)
this.c=new P.a2(a,b)
this.d=4},function(a){return this.dU(a,null)},"fF","$2","$1","gdT",2,2,18,0],
fE:[function(){if(this.d===2){var z=this.c
this.bS(0)
z.a_(!1)
return}this.a.at(0)
this.c=null
this.d=5},"$0","gdS",0,0,1]},
iU:{
"^":"e:0;a,b,c",
$0:function(){return this.a.J(this.b,this.c)}},
iT:{
"^":"e:6;a,b",
$2:function(a,b){return P.iR(this.a,this.b,a,b)}},
c5:{
"^":"aa;",
a2:function(a,b,c,d){return this.dH(a,d,c,!0===b)},
cB:function(a,b,c){return this.a2(a,null,b,c)},
dH:function(a,b,c,d){return P.ia(this,a,b,c,d,H.P(this,"c5",0),H.P(this,"c5",1))},
c3:function(a,b){b.b3(a)},
$asaa:function(a,b){return[b]}},
dB:{
"^":"i_;x,y,a,b,c,d,e,f,r",
b3:function(a){if((this.e&2)!==0)return
this.dh(a)},
b0:function(a,b){if((this.e&2)!==0)return
this.di(a,b)},
c8:[function(){var z=this.y
if(z==null)return
z.at(0)},"$0","gc7",0,0,1],
ca:[function(){var z=this.y
if(z==null)return
z.cH()},"$0","gc9",0,0,1],
c6:function(){var z=this.y
if(z!=null){this.y=null
return z.bl()}return},
fA:[function(a){this.x.c3(a,this)},"$1","gdK",2,0,function(){return H.bq(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"dB")}],
fC:[function(a,b){this.b0(a,b)},"$2","gdM",4,0,19],
fB:[function(){this.dB()},"$0","gdL",0,0,1],
dw:function(a,b,c,d,e,f,g){var z,y
z=this.gdK()
y=this.gdM()
this.y=this.x.a.cB(z,this.gdL(),y)},
static:{ia:function(a,b,c,d,e,f,g){var z=$.j
z=H.a(new P.dB(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.dv(b,c,d,e)
z.dw(a,b,c,d,e,f,g)
return z}}},
iz:{
"^":"c5;b,a",
c3:function(a,b){var z,y,x,w,v
z=null
try{z=this.e0(a)}catch(w){v=H.A(w)
y=v
x=H.C(w)
$.j.toString
b.b0(y,x)
return}b.b3(z)},
e0:function(a){return this.b.$1(a)}},
a2:{
"^":"b;ap:a>,U:b<",
i:function(a){return H.c(this.a)},
$isF:1},
iN:{
"^":"b;"},
j0:{
"^":"e:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bU()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
P.j_(z,y)}},
iE:{
"^":"iN;",
gbr:function(){return this},
cJ:function(a){var z,y,x,w
try{if(C.d===$.j){x=a.$0()
return x}x=P.dK(null,null,this,a)
return x}catch(w){x=H.A(w)
z=x
y=H.C(w)
return P.aY(null,null,this,z,y)}},
bD:function(a,b){var z,y,x,w
try{if(C.d===$.j){x=a.$1(b)
return x}x=P.dM(null,null,this,a,b)
return x}catch(w){x=H.A(w)
z=x
y=H.C(w)
return P.aY(null,null,this,z,y)}},
fl:function(a,b,c){var z,y,x,w
try{if(C.d===$.j){x=a.$2(b,c)
return x}x=P.dL(null,null,this,a,b,c)
return x}catch(w){x=H.A(w)
z=x
y=H.C(w)
return P.aY(null,null,this,z,y)}},
bi:function(a,b){if(b)return new P.iF(this,a)
else return new P.iG(this,a)},
e8:function(a,b){return new P.iH(this,a)},
h:function(a,b){return},
cI:function(a){if($.j===C.d)return a.$0()
return P.dK(null,null,this,a)},
bC:function(a,b){if($.j===C.d)return a.$1(b)
return P.dM(null,null,this,a,b)},
fk:function(a,b,c){if($.j===C.d)return a.$2(b,c)
return P.dL(null,null,this,a,b,c)}},
iF:{
"^":"e:0;a,b",
$0:function(){return this.a.cJ(this.b)}},
iG:{
"^":"e:0;a,b",
$0:function(){return this.a.cI(this.b)}},
iH:{
"^":"e:2;a,b",
$1:function(a){return this.a.bD(this.b,a)}}}],["","",,P,{
"^":"",
a5:function(){return H.a(new H.a4(0,null,null,null,null,null,0),[null,null])},
am:function(a){return H.dT(a,H.a(new H.a4(0,null,null,null,null,null,0),[null,null]))},
fF:function(a,b,c){var z,y
if(P.ca(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aG()
y.push(a)
try{P.iX(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.db(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
b8:function(a,b,c){var z,y,x
if(P.ca(a))return b+"..."+c
z=new P.bi(b)
y=$.$get$aG()
y.push(a)
try{x=z
x.a=P.db(x.ga9(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.a=y.ga9()+c
y=z.ga9()
return y.charCodeAt(0)==0?y:y},
ca:function(a){var z,y
for(z=0;y=$.$get$aG(),z<y.length;++z)if(a===y[z])return!0
return!1},
iX:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gD(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.c(z.gw())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gw();++x
if(!z.t()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gw();++x
for(;z.t();t=s,s=r){r=z.gw();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ax:function(a,b,c,d){return H.a(new P.it(0,null,null,null,null,null,0),[d])},
bP:function(a){var z,y,x
z={}
if(P.ca(a))return"{...}"
y=new P.bi("")
try{$.$get$aG().push(a)
x=y
x.a=x.ga9()+"{"
z.a=!0
J.er(a,new P.fU(z,y))
z=y
z.a=z.ga9()+"}"}finally{z=$.$get$aG()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.ga9()
return z.charCodeAt(0)==0?z:z},
dE:{
"^":"a4;a,b,c,d,e,f,r",
ar:function(a){return H.jv(a)&0x3ffffff},
as:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcv()
if(x==null?b==null:x===b)return y}return-1},
static:{aD:function(a,b){return H.a(new P.dE(0,null,null,null,null,null,0),[a,b])}}},
it:{
"^":"ip;a,b,c,d,e,f,r",
gD:function(a){var z=new P.cU(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
ek:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dG(b)},
dG:function(a){var z=this.d
if(z==null)return!1
return this.aA(z[this.az(a)],a)>=0},
cC:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.ek(0,a)?a:null
else return this.dQ(a)},
dQ:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.az(a)]
x=this.aA(y,a)
if(x<0)return
return J.ck(y,x).gc_()},
F:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.J(this))
z=z.b}},
ab:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bT(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bT(x,b)}else return this.Z(b)},
Z:function(a){var z,y,x
z=this.d
if(z==null){z=P.iu()
this.d=z}y=this.az(a)
x=z[y]
if(x==null)z[y]=[this.b6(a)]
else{if(this.aA(x,a)>=0)return!1
x.push(this.b6(a))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bU(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bU(this.c,b)
else return this.dY(b)},
dY:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.az(a)]
x=this.aA(y,a)
if(x<0)return!1
this.bV(y.splice(x,1)[0])
return!0},
W:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bT:function(a,b){if(a[b]!=null)return!1
a[b]=this.b6(b)
return!0},
bU:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bV(z)
delete a[b]
return!0},
b6:function(a){var z,y
z=new P.fR(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bV:function(a){var z,y
z=a.gdF()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
az:function(a){return J.H(a)&0x3ffffff},
aA:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.X(a[y].gc_(),b))return y
return-1},
$isr:1,
static:{iu:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fR:{
"^":"b;c_:a<,b,dF:c<"},
cU:{
"^":"b;a,b,c,d",
gw:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.J(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
ip:{
"^":"h7;"},
bL:{
"^":"b;",
gD:function(a){return new H.cV(a,this.gj(a),0,null)},
O:function(a,b){return this.h(a,b)},
F:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.f(a,y)
b.$1(a[y])
if(z!==a.length)throw H.d(new P.J(a))}},
ae:function(a,b){return H.a(new H.bO(a,b),[null,null])},
i:function(a){return P.b8(a,"[","]")},
$isk:1,
$ask:null,
$isr:1},
fU:{
"^":"e:8;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.c(a)
z.a=y+": "
z.a+=H.c(b)}},
fS:{
"^":"K;a,b,c,d",
gD:function(a){return new P.iv(this,this.c,this.d,this.b,null)},
F:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.f(x,y)
b.$1(x[y])
if(z!==this.d)H.z(new P.J(this))}},
gP:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
W:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.b8(this,"{","}")},
cG:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.bH());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
Z:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.c1();++this.d},
c1:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.a(z,[H.v(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bN(y,0,w,z,x)
C.b.bN(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dq:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.a(z,[b])},
$isr:1,
static:{bM:function(a,b){var z=H.a(new P.fS(null,0,0,0),[b])
z.dq(a,b)
return z}}},
iv:{
"^":"b;a,b,c,d,e",
gw:function(){return this.e},
t:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.z(new P.J(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
h8:{
"^":"b;",
ae:function(a,b){return H.a(new H.cM(this,b),[H.v(this,0),null])},
i:function(a){return P.b8(this,"{","}")},
F:function(a,b){var z
for(z=this.gD(this);z.t();)b.$1(z.d)},
$isr:1},
h7:{
"^":"h8;"}}],["","",,P,{
"^":"",
bo:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.ir(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bo(a[z])
return a},
iZ:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.d(H.V(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.A(w)
y=x
throw H.d(new P.ak(String(y),null,null))}return P.bo(z)},
ir:{
"^":"b;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.dX(b):y}},
gj:function(a){var z
if(this.b==null){z=this.c
z=z.gj(z)}else z=this.a8().length
return z},
gK:function(){if(this.b==null)return this.c.gK()
return new P.is(this)},
p:function(a,b,c){var z,y
if(this.b==null)this.c.p(0,b,c)
else if(this.X(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.cj().p(0,b,c)},
X:function(a){if(this.b==null)return this.c.X(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
a3:function(a,b){if(this.b!=null&&!this.X(b))return
return this.cj().a3(0,b)},
F:function(a,b){var z,y,x,w
if(this.b==null)return this.c.F(0,b)
z=this.a8()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bo(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.d(new P.J(this))}},
i:function(a){return P.bP(this)},
a8:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
cj:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.a5()
y=this.a8()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.p(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.b.sj(y,0)
this.b=null
this.a=null
this.c=z
return z},
dX:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bo(this.a[a])
return this.b[a]=z}},
is:{
"^":"aS;a",
gj:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gj(z)}else z=z.a8().length
return z},
O:function(a,b){var z=this.a
if(z.b==null)z=z.gK().O(0,b)
else{z=z.a8()
if(b<0||b>=z.length)return H.f(z,b)
z=z[b]}return z},
gD:function(a){var z=this.a
if(z.b==null){z=z.gK()
z=z.gD(z)}else{z=z.a8()
z=new J.cw(z,z.length,0,null)}return z},
$asaS:I.aH,
$asK:I.aH},
f7:{
"^":"b;"},
hR:{
"^":"f7;a",
bq:function(a,b,c){var z,y,x,w
z=a.length
P.bg(b,c,z,null,null,null)
y=new P.bi("")
x=this.a
w=new P.iK(x,y,!0,0,0,0)
w.bq(a,b,z)
if(w.e>0){if(!x)H.z(new P.ak("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.aU(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
en:function(a){return this.bq(a,0,null)}},
iK:{
"^":"b;a,b,c,d,e,f",
bq:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.iM(c)
v=new P.iL(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=a.length,r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
if(r>>>0!==r||r>=s)return H.f(a,r)
q=a[r]
if((q&192)!==128){if(t)throw H.d(new P.ak("Bad UTF-8 encoding 0x"+C.c.aV(q,16),null,null))
this.c=!1
u.a+=H.aU(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.f(C.l,p)
if(z<=C.l[p]){if(t)throw H.d(new P.ak("Overlong encoding of 0x"+C.c.aV(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.d(new P.ak("Character outside valid Unicode range: 0x"+C.c.aV(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.aU(z)
this.c=!1}for(;r<c;r=n,z=65533,y=0,x=0){o=w.$2(a,r)
if(J.e6(o,0)){this.c=!1
if(typeof o!=="number")return H.y(o)
n=r+o
v.$2(r,n)
if(n===c)break
r=n}n=r+1
if(r>>>0!==r||r>=s)return H.f(a,r)
q=a[r]
if((q&224)===192){z=q&31
y=1
x=1
continue $loop$0}if((q&240)===224){z=q&15
y=2
x=2
continue $loop$0}if((q&248)===240&&q<245){z=q&7
y=3
x=3
continue $loop$0}if(t)throw H.d(new P.ak("Bad UTF-8 encoding 0x"+C.c.aV(q,16),null,null))
this.c=!1
u.a+=H.aU(65533)}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
iM:{
"^":"e:20;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=a.length,x=b;x<z;++x){if(x<0||x>=y)return H.f(a,x)
w=a[x]
if((w&127)!==w)return x-b}return z-b}},
iL:{
"^":"e:21;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.hl(this.b,a,b)}}}],["","",,P,{
"^":"",
cN:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.av(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fg(a)},
fg:function(a){var z=J.m(a)
if(!!z.$ise)return z.i(a)
return H.be(a)},
b6:function(a){return new P.i9(a)},
bN:function(a,b,c){var z,y
z=H.a([],[c])
for(y=J.bz(a);y.t();)z.push(y.gw())
return z},
W:function(a){var z=H.c(a)
H.e0(z)},
hl:function(a,b,c){return H.h_(a,b,P.bg(b,c,a.length,null,null,null))},
cb:{
"^":"b;"},
"+bool":0,
bD:{
"^":"b;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.bD))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.fb(z?H.I(this).getUTCFullYear()+0:H.I(this).getFullYear()+0)
x=P.aM(z?H.I(this).getUTCMonth()+1:H.I(this).getMonth()+1)
w=P.aM(z?H.I(this).getUTCDate()+0:H.I(this).getDate()+0)
v=P.aM(z?H.I(this).getUTCHours()+0:H.I(this).getHours()+0)
u=P.aM(z?H.I(this).getUTCMinutes()+0:H.I(this).getMinutes()+0)
t=P.aM(z?H.I(this).getUTCSeconds()+0:H.I(this).getSeconds()+0)
s=P.fc(H.d3(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
dn:function(a,b){if(Math.abs(a)>864e13)throw H.d(P.aL(a))},
static:{fa:function(a,b){var z=new P.bD(a,b)
z.dn(a,b)
return z},fb:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.c(z)
if(z>=10)return y+"00"+H.c(z)
return y+"000"+H.c(z)},fc:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aM:function(a){if(a>=10)return""+a
return"0"+a}}},
ah:{
"^":"b_;"},
"+double":0,
aN:{
"^":"b;a",
m:function(a,b){return new P.aN(C.c.m(this.a,b.gbZ()))},
aX:function(a,b){return C.c.aX(this.a,b.gbZ())},
ax:function(a,b){return C.c.ax(this.a,b.gbZ())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.aN))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.ff()
y=this.a
if(y<0)return"-"+new P.aN(-y).i(0)
x=z.$1(C.c.bA(C.c.an(y,6e7),60))
w=z.$1(C.c.bA(C.c.an(y,1e6),60))
v=new P.fe().$1(C.c.bA(y,1e6))
return""+C.c.an(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)}},
fe:{
"^":"e:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
ff:{
"^":"e:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
F:{
"^":"b;",
gU:function(){return H.C(this.$thrownJsError)}},
bU:{
"^":"F;",
i:function(a){return"Throw of null."}},
ai:{
"^":"F;a,b,c,d",
gb9:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gb8:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.c(z)+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gb9()+y+x
if(!this.a)return w
v=this.gb8()
u=P.cN(this.b)
return w+v+": "+H.c(u)},
static:{aL:function(a){return new P.ai(!1,null,null,a)},eQ:function(a,b,c){return new P.ai(!0,a,b,c)}}},
d7:{
"^":"ai;e,f,a,b,c,d",
gb9:function(){return"RangeError"},
gb8:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else{if(typeof x!=="number")return x.ax()
if(typeof z!=="number")return H.y(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{bf:function(a,b,c){return new P.d7(null,null,!0,a,b,"Value not in range")},a8:function(a,b,c,d,e){return new P.d7(b,c,!0,a,d,"Invalid value")},bg:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.a8(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.a8(b,a,c,"end",f))
return b}return c}}},
ft:{
"^":"ai;e,j:f>,a,b,c,d",
gb9:function(){return"RangeError"},
gb8:function(){if(J.e7(this.b,0))return": index must not be negative"
var z=this.f
if(J.X(z,0))return": no indices are valid"
return": index should be less than "+H.c(z)},
static:{bG:function(a,b,c,d,e){var z=e!=null?e:J.aK(b)
return new P.ft(b,z,!0,a,c,"Index out of range")}}},
M:{
"^":"F;a",
i:function(a){return"Unsupported operation: "+this.a}},
c2:{
"^":"F;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
an:{
"^":"F;a",
i:function(a){return"Bad state: "+this.a}},
J:{
"^":"F;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.cN(z))+"."}},
fX:{
"^":"b;",
i:function(a){return"Out of Memory"},
gU:function(){return},
$isF:1},
da:{
"^":"b;",
i:function(a){return"Stack Overflow"},
gU:function(){return},
$isF:1},
f9:{
"^":"F;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
i9:{
"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
ak:{
"^":"b;a,b,L:c>",
i:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.c(z):"FormatException"
return y}},
fh:{
"^":"b;a",
i:function(a){return"Expando:"+H.c(this.a)},
h:function(a,b){var z=H.bd(b,"expando$values")
return z==null?null:H.bd(z,this.c0())},
p:function(a,b,c){var z=H.bd(b,"expando$values")
if(z==null){z=new P.b()
H.bV(b,"expando$values",z)}H.bV(z,this.c0(),c)},
c0:function(){var z,y
z=H.bd(this,"expando$key")
if(z==null){y=$.cO
$.cO=y+1
z="expando$key$"+y
H.bV(this,"expando$key",z)}return z}},
fj:{
"^":"b;"},
l:{
"^":"b_;"},
"+int":0,
K:{
"^":"b;",
ae:function(a,b){return H.bc(this,b,H.P(this,"K",0),null)},
F:function(a,b){var z
for(z=this.gD(this);z.t();)b.$1(z.gw())},
bG:function(a,b){return P.bN(this,!0,H.P(this,"K",0))},
bF:function(a){return this.bG(a,!0)},
gj:function(a){var z,y
z=this.gD(this)
for(y=0;z.t();)++y
return y},
O:function(a,b){var z,y,x
if(b<0)H.z(P.a8(b,0,null,"index",null))
for(z=this.gD(this),y=0;z.t();){x=z.gw()
if(b===y)return x;++y}throw H.d(P.bG(b,this,"index",null,y))},
i:function(a){return P.fF(this,"(",")")}},
fH:{
"^":"b;"},
k:{
"^":"b;",
$ask:null,
$isr:1},
"+List":0,
kn:{
"^":"b;",
i:function(a){return"null"}},
"+Null":0,
b_:{
"^":"b;"},
"+num":0,
b:{
"^":";",
n:function(a,b){return this===b},
gv:function(a){return H.a7(this)},
i:function(a){return H.be(this)},
toString:function(){return this.i(this)}},
a9:{
"^":"b;"},
a_:{
"^":"b;"},
"+String":0,
bi:{
"^":"b;a9:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{db:function(a,b,c){var z=J.bz(b)
if(!z.t())return a
if(c.length===0){do a+=H.c(z.gw())
while(z.t())}else{a+=H.c(z.gw())
for(;z.t();)a=a+c+H.c(z.gw())}return a}}}}],["","",,W,{
"^":"",
cC:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.G)},
ae:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dC:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dI:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.i3(a)
if(!!J.m(z).$isO)return z
return}else return a},
iW:function(a){var z
if(!!J.m(a).$isbE)return a
z=new P.hT([],[],!1)
z.c=!0
return z.bI(a)},
E:function(a){var z=$.j
if(z===C.d)return a
return z.e8(a,!0)},
B:{
"^":"aO;",
$isB:1,
$isb:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
jD:{
"^":"B;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
jF:{
"^":"B;",
i:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
jG:{
"^":"B;",
gaf:function(a){return H.a(new W.t(a,"error",!1),[null])},
gag:function(a){return H.a(new W.t(a,"load",!1),[null])},
$isO:1,
$ish:1,
"%":"HTMLBodyElement"},
cA:{
"^":"B;k:height%,l:width%",
bK:function(a,b,c){return a.getContext(b,P.j9(c,null))},
cV:function(a,b,c,d,e,f,g){var z,y
z=P.am(["alpha",!0,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.bK(a,"webgl",z)
return y==null?this.bK(a,"experimental-webgl",z):y},
cU:function(a,b){return this.cV(a,!0,!0,!0,!0,!1,b)},
$iscA:1,
"%":"HTMLCanvasElement"},
jI:{
"^":"aT;j:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jJ:{
"^":"fu;j:length=",
bL:function(a,b){var z=this.dJ(a,b)
return z!=null?z:""},
dJ:function(a,b){if(W.cC(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.cJ()+b)},
b_:function(a,b,c,d){var z=this.dD(a,b)
a.setProperty(z,c,d)
return},
dD:function(a,b){var z,y
z=$.$get$cD()
y=z[b]
if(typeof y==="string")return y
y=W.cC(b) in a?b:P.cJ()+b
z[b]=y
return y},
gk:function(a){return a.height},
sk:function(a,b){a.height=b},
gl:function(a){return a.width},
sl:function(a,b){a.width=b},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fu:{
"^":"h+f8;"},
f8:{
"^":"b;",
gk:function(a){return this.bL(a,"height")},
sk:function(a,b){this.b_(a,"height",b,"")},
sT:function(a,b){this.b_(a,"src",b,"")},
gl:function(a){return this.bL(a,"width")},
sl:function(a,b){this.b_(a,"width",b,"")}},
bE:{
"^":"aT;",
gaf:function(a){return H.a(new W.o(a,"error",!1),[null])},
gag:function(a){return H.a(new W.o(a,"load",!1),[null])},
gaL:function(a){return H.a(new W.o(a,"mousedown",!1),[null])},
gaM:function(a){return H.a(new W.o(a,"mouseenter",!1),[null])},
gaN:function(a){return H.a(new W.o(a,"mouseleave",!1),[null])},
gaO:function(a){return H.a(new W.o(a,"mousemove",!1),[null])},
gaP:function(a){return H.a(new W.o(a,"mouseout",!1),[null])},
gaQ:function(a){return H.a(new W.o(a,"mouseover",!1),[null])},
gaR:function(a){return H.a(new W.o(a,"mouseup",!1),[null])},
gbv:function(a){return H.a(new W.o(a,"touchcancel",!1),[null])},
gaS:function(a){return H.a(new W.o(a,"touchend",!1),[null])},
gbw:function(a){return H.a(new W.o(a,"touchmove",!1),[null])},
gaT:function(a){return H.a(new W.o(a,"touchstart",!1),[null])},
ep:function(a,b,c){return a.createElement(b)},
cq:function(a,b){return this.ep(a,b,null)},
$isbE:1,
"%":"XMLDocument;Document"},
jK:{
"^":"aT;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
jL:{
"^":"h;",
i:function(a){return String(a)},
"%":"DOMException"},
fd:{
"^":"h;bj:bottom=,k:height=,R:left=,bB:right=,aj:top=,l:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(this.gl(a))+" x "+H.c(this.gk(a))},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isZ)return!1
y=a.left
x=z.gR(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaj(b)
if(y==null?x==null:y===x){y=this.gl(a)
x=z.gl(b)
if(y==null?x==null:y===x){y=this.gk(a)
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){var z,y,x,w
z=J.H(a.left)
y=J.H(a.top)
x=J.H(this.gl(a))
w=J.H(this.gk(a))
return W.dC(W.ae(W.ae(W.ae(W.ae(0,z),y),x),w))},
gbH:function(a){return H.a(new P.L(a.left,a.top),[null])},
$isZ:1,
$asZ:I.aH,
"%":";DOMRectReadOnly"},
aO:{
"^":"aT;",
gL:function(a){return P.h1(C.a.H(a.offsetLeft),C.a.H(a.offsetTop),C.a.H(a.offsetWidth),C.a.H(a.offsetHeight),null)},
i:function(a){return a.localName},
gf9:function(a){return C.a.H(a.offsetLeft)},
gfa:function(a){return C.a.H(a.offsetTop)},
cT:function(a){return a.getBoundingClientRect()},
gaf:function(a){return H.a(new W.t(a,"error",!1),[null])},
gag:function(a){return H.a(new W.t(a,"load",!1),[null])},
gaL:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gaM:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gaN:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gaO:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gaP:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gaQ:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gaR:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
gbv:function(a){return H.a(new W.t(a,"touchcancel",!1),[null])},
gaS:function(a){return H.a(new W.t(a,"touchend",!1),[null])},
gfb:function(a){return H.a(new W.t(a,"touchenter",!1),[null])},
gfc:function(a){return H.a(new W.t(a,"touchleave",!1),[null])},
gbw:function(a){return H.a(new W.t(a,"touchmove",!1),[null])},
gaT:function(a){return H.a(new W.t(a,"touchstart",!1),[null])},
$isaO:1,
$ish:1,
$isO:1,
"%":";Element"},
jM:{
"^":"B;k:height%,T:src},l:width%",
"%":"HTMLEmbedElement"},
jN:{
"^":"b5;ap:error=",
"%":"ErrorEvent"},
b5:{
"^":"h;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
O:{
"^":"h;",
dA:function(a,b,c,d){return a.addEventListener(b,H.ag(c,1),!1)},
dZ:function(a,b,c,d){return a.removeEventListener(b,H.ag(c,1),!1)},
$isO:1,
"%":"MediaStream;EventTarget"},
k5:{
"^":"B;j:length=",
"%":"HTMLFormElement"},
fp:{
"^":"bE;",
"%":"HTMLDocument"},
fq:{
"^":"fr;",
fI:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
fd:function(a,b,c){return a.open(b,c)},
aZ:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
fr:{
"^":"O;",
gaf:function(a){return H.a(new W.o(a,"error",!1),[null])},
gag:function(a){return H.a(new W.o(a,"load",!1),[null])},
"%":";XMLHttpRequestEventTarget"},
k6:{
"^":"B;k:height%,T:src},l:width%",
"%":"HTMLIFrameElement"},
cQ:{
"^":"B;k:height%,T:src},l:width%",
ac:function(a,b){return a.complete.$1(b)},
$iscQ:1,
"%":"HTMLImageElement"},
k8:{
"^":"B;k:height%,T:src},l:width%",
$isaO:1,
$ish:1,
$isO:1,
"%":"HTMLInputElement"},
fV:{
"^":"B;ap:error=,T:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bQ:{
"^":"dv;",
gL:function(a){var z,y,x
if(!!a.offsetX)return H.a(new P.L(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.m(W.dI(z)).$isaO)throw H.d(new P.M("offsetX is only supported on elements"))
y=W.dI(z)
x=H.a(new P.L(a.clientX,a.clientY),[null]).a4(0,J.eG(J.eJ(y)))
return H.a(new P.L(J.cu(x.a),J.cu(x.b)),[null])}},
$isbQ:1,
$isb:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
km:{
"^":"h;",
$ish:1,
"%":"Navigator"},
aT:{
"^":"O;",
i:function(a){var z=a.nodeValue
return z==null?this.dd(a):z},
"%":"Attr;Node"},
ko:{
"^":"B;k:height%,l:width%",
"%":"HTMLObjectElement"},
aV:{
"^":"b5;",
$isaV:1,
$isb:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
kr:{
"^":"B;T:src}",
"%":"HTMLScriptElement"},
kt:{
"^":"B;j:length=",
"%":"HTMLSelectElement"},
ku:{
"^":"B;T:src}",
"%":"HTMLSourceElement"},
kv:{
"^":"b5;ap:error=",
"%":"SpeechRecognitionError"},
c0:{
"^":"h;",
$isb:1,
"%":"Touch"},
c1:{
"^":"dv;ed:changedTouches=",
$isc1:1,
$isb:1,
"%":"TouchEvent"},
kA:{
"^":"fw;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bG(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.d(new P.M("Cannot assign element of immutable List."))},
O:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isk:1,
$ask:function(){return[W.c0]},
$isr:1,
$isbb:1,
$isb9:1,
"%":"TouchList"},
fv:{
"^":"h+bL;",
$isk:1,
$ask:function(){return[W.c0]},
$isr:1},
fw:{
"^":"fv+fs;",
$isk:1,
$ask:function(){return[W.c0]},
$isr:1},
kB:{
"^":"B;T:src}",
"%":"HTMLTrackElement"},
dv:{
"^":"b5;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
dw:{
"^":"fV;k:height%,l:width%",
$isdw:1,
"%":"HTMLVideoElement"},
kF:{
"^":"O;",
gaf:function(a){return H.a(new W.o(a,"error",!1),[null])},
gag:function(a){return H.a(new W.o(a,"load",!1),[null])},
gaL:function(a){return H.a(new W.o(a,"mousedown",!1),[null])},
gaM:function(a){return H.a(new W.o(a,"mouseenter",!1),[null])},
gaN:function(a){return H.a(new W.o(a,"mouseleave",!1),[null])},
gaO:function(a){return H.a(new W.o(a,"mousemove",!1),[null])},
gaP:function(a){return H.a(new W.o(a,"mouseout",!1),[null])},
gaQ:function(a){return H.a(new W.o(a,"mouseover",!1),[null])},
gaR:function(a){return H.a(new W.o(a,"mouseup",!1),[null])},
gbv:function(a){return H.a(new W.o(a,"touchcancel",!1),[null])},
gaS:function(a){return H.a(new W.o(a,"touchend",!1),[null])},
gbw:function(a){return H.a(new W.o(a,"touchmove",!1),[null])},
gaT:function(a){return H.a(new W.o(a,"touchstart",!1),[null])},
$ish:1,
$isO:1,
"%":"DOMWindow|Window"},
kJ:{
"^":"h;bj:bottom=,k:height=,R:left=,bB:right=,aj:top=,l:width=",
i:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isZ)return!1
y=a.left
x=z.gR(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaj(b)
if(y==null?x==null:y===x){y=a.width
x=z.gl(b)
if(y==null?x==null:y===x){y=a.height
z=z.gk(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gv:function(a){var z,y,x,w
z=J.H(a.left)
y=J.H(a.top)
x=J.H(a.width)
w=J.H(a.height)
return W.dC(W.ae(W.ae(W.ae(W.ae(0,z),y),x),w))},
gbH:function(a){return H.a(new P.L(a.left,a.top),[null])},
$isZ:1,
$asZ:I.aH,
"%":"ClientRect"},
kK:{
"^":"aT;",
$ish:1,
"%":"DocumentType"},
kL:{
"^":"fd;",
gk:function(a){return a.height},
sk:function(a,b){a.height=b},
gl:function(a){return a.width},
sl:function(a,b){a.width=b},
"%":"DOMRect"},
kO:{
"^":"B;",
$isO:1,
$ish:1,
"%":"HTMLFrameSetElement"},
o:{
"^":"aa;a,b,c",
a2:function(a,b,c,d){var z=new W.D(0,this.a,this.b,W.E(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.E()
return z},
cA:function(a){return this.a2(a,null,null,null)},
cB:function(a,b,c){return this.a2(a,null,b,c)}},
t:{
"^":"o;a,b,c"},
D:{
"^":"hc;a,b,c,d,e",
bl:function(){if(this.b==null)return
this.ci()
this.b=null
this.d=null
return},
by:function(a,b){if(this.b==null)return;++this.a
this.ci()},
at:function(a){return this.by(a,null)},
cH:function(){if(this.b==null||this.a<=0)return;--this.a
this.E()},
E:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.e9(x,this.c,z,!1)}},
ci:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.ea(x,this.c,z,!1)}}},
fs:{
"^":"b;",
gD:function(a){return new W.fi(a,this.gj(a),-1,null)},
$isk:1,
$ask:null,
$isr:1},
fi:{
"^":"b;a,b,c,d",
t:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.ck(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gw:function(){return this.d}},
i2:{
"^":"b;a",
$isO:1,
$ish:1,
static:{i3:function(a){if(a===window)return a
else return new W.i2(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jB:{
"^":"al;",
$ish:1,
"%":"SVGAElement"},
jC:{
"^":"hm;",
$ish:1,
"%":"SVGAltGlyphElement"},
jE:{
"^":"p;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
jO:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEBlendElement"},
jP:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
jQ:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
jR:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFECompositeElement"},
jS:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
jT:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
jU:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
jV:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEFloodElement"},
jW:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
jX:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEImageElement"},
jY:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEMergeElement"},
jZ:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEMorphologyElement"},
k_:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFEOffsetElement"},
k0:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
k1:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFETileElement"},
k2:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFETurbulenceElement"},
k3:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGFilterElement"},
k4:{
"^":"al;k:height=,l:width=",
"%":"SVGForeignObjectElement"},
fo:{
"^":"al;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
al:{
"^":"p;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
k7:{
"^":"al;k:height=,l:width=",
$ish:1,
"%":"SVGImageElement"},
kb:{
"^":"p;",
$ish:1,
"%":"SVGMarkerElement"},
kc:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGMaskElement"},
kp:{
"^":"p;k:height=,l:width=",
$ish:1,
"%":"SVGPatternElement"},
kq:{
"^":"fo;k:height=,l:width=",
"%":"SVGRectElement"},
ks:{
"^":"p;",
$ish:1,
"%":"SVGScriptElement"},
p:{
"^":"aO;",
gaf:function(a){return H.a(new W.t(a,"error",!1),[null])},
gag:function(a){return H.a(new W.t(a,"load",!1),[null])},
gaL:function(a){return H.a(new W.t(a,"mousedown",!1),[null])},
gaM:function(a){return H.a(new W.t(a,"mouseenter",!1),[null])},
gaN:function(a){return H.a(new W.t(a,"mouseleave",!1),[null])},
gaO:function(a){return H.a(new W.t(a,"mousemove",!1),[null])},
gaP:function(a){return H.a(new W.t(a,"mouseout",!1),[null])},
gaQ:function(a){return H.a(new W.t(a,"mouseover",!1),[null])},
gaR:function(a){return H.a(new W.t(a,"mouseup",!1),[null])},
$isO:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
kx:{
"^":"al;k:height=,l:width=",
$ish:1,
"%":"SVGSVGElement"},
ky:{
"^":"p;",
$ish:1,
"%":"SVGSymbolElement"},
dd:{
"^":"al;",
"%":";SVGTextContentElement"},
kz:{
"^":"dd;",
$ish:1,
"%":"SVGTextPathElement"},
hm:{
"^":"dd;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
kC:{
"^":"al;k:height=,l:width=",
$ish:1,
"%":"SVGUseElement"},
kD:{
"^":"p;",
$ish:1,
"%":"SVGViewElement"},
kN:{
"^":"p;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
kP:{
"^":"p;",
$ish:1,
"%":"SVGCursorElement"},
kQ:{
"^":"p;",
$ish:1,
"%":"SVGFEDropShadowElement"},
kR:{
"^":"p;",
$ish:1,
"%":"SVGGlyphRefElement"},
kS:{
"^":"p;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
h4:{
"^":"h;",
e6:function(a,b,c){return a.bindBuffer(b,c)},
e7:function(a,b,c){return a.bindTexture(b,c)},
e9:function(a,b){return a.blendEquation(b)},
ea:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
eb:function(a,b,c,d){return a.bufferData(b,c,d)},
ee:function(a,b){return a.clear(b)},
ef:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
eg:function(a,b){return a.clearDepth(b)},
eh:function(a,b){return a.clearStencil(b)},
ej:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
eo:function(a){return a.createBuffer()},
eq:function(a){return a.createProgram()},
er:function(a,b){return a.createShader(b)},
es:function(a){return a.createTexture()},
eu:function(a,b){return a.deleteTexture(b)},
ev:function(a,b){return a.depthFunc(b)},
ew:function(a,b){return a.depthMask(b)},
eD:function(a,b){return a.disableVertexAttribArray(b)},
eF:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
eL:function(a,b){return a.enable(b)},
eM:function(a,b){return a.enableVertexAttribArray(b)},
cS:function(a,b,c){return a.getAttribLocation(b,c)},
cX:function(a,b){return a.getParameter(b)},
cZ:function(a,b,c){return a.getUniformLocation(b,c)},
d8:function(a,b,c,d){return a.stencilFunc(b,c,d)},
d9:function(a,b,c,d){return a.stencilOp(b,c,d)},
fn:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.jb(g))
return}z=J.m(g)
if(!!z.$iscQ)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscA)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdw)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.d(P.aL("Incorrect number or type of arguments"))},
fm:function(a,b,c,d,e,f,g){return this.fn(a,b,c,d,e,f,g,null,null,null)},
fo:function(a,b,c,d){return a.texParameteri(b,c,d)},
fs:function(a,b){return a.useProgram(b)},
ft:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jH:{
"^":"b;"}}],["","",,P,{
"^":"",
aC:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dD:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
L:{
"^":"b;A:a>,C:b>",
i:function(a){return"Point("+H.c(this.a)+", "+H.c(this.b)+")"},
n:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.L))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){var z,y
z=J.H(this.a)
y=J.H(this.b)
return P.dD(P.aC(P.aC(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gA(b)
if(typeof z!=="number")return z.m()
x=C.a.m(z,x)
z=this.b
y=y.gC(b)
if(typeof z!=="number")return z.m()
y=new P.L(x,C.a.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
a4:function(a,b){var z,y,x,w
z=this.a
y=J.eI(b)
if(typeof z!=="number")return z.a4()
if(typeof y!=="number")return H.y(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.a4()
if(typeof w!=="number")return H.y(w)
w=new P.L(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
iD:{
"^":"b;",
gbB:function(a){return this.gR(this)+this.c},
gbj:function(a){return this.gaj(this)+this.d},
i:function(a){return"Rectangle ("+this.gR(this)+", "+this.b+") "+this.c+" x "+this.d},
n:function(a,b){var z,y
if(b==null)return!1
z=J.m(b)
if(!z.$isZ)return!1
if(this.gR(this)===z.gR(b)){y=this.b
z=y===z.gaj(b)&&this.a+this.c===z.gbB(b)&&y+this.d===z.gbj(b)}else z=!1
return z},
gv:function(a){var z=this.b
return P.dD(P.aC(P.aC(P.aC(P.aC(0,this.gR(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbH:function(a){var z=new P.L(this.gR(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
Z:{
"^":"iD;R:a>,aj:b>,l:c>,k:d>",
$asZ:null,
static:{h1:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.a(new P.Z(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
n:function(a){return a},
bp:function(a){return a},
cX:{
"^":"h;",
e5:function(a,b,c){return new Uint8Array(a,b)},
e4:function(a){return this.e5(a,0,null)},
$iscX:1,
"%":"ArrayBuffer"},
bT:{
"^":"h;",
$isbT:1,
"%":"DataView;ArrayBufferView;bR|cY|d_|bS|cZ|d0|a6"},
bR:{
"^":"bT;",
gj:function(a){return a.length},
$isbb:1,
$isb9:1},
bS:{
"^":"d_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
a[b]=c}},
cY:{
"^":"bR+bL;",
$isk:1,
$ask:function(){return[P.ah]},
$isr:1},
d_:{
"^":"cY+cP;"},
a6:{
"^":"d0;",
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
a[b]=c},
$isk:1,
$ask:function(){return[P.l]},
$isr:1},
cZ:{
"^":"bR+bL;",
$isk:1,
$ask:function(){return[P.l]},
$isr:1},
d0:{
"^":"cZ+cP;"},
kd:{
"^":"bS;",
$isk:1,
$ask:function(){return[P.ah]},
$isr:1,
"%":"Float32Array"},
ke:{
"^":"bS;",
$isk:1,
$ask:function(){return[P.ah]},
$isr:1,
"%":"Float64Array"},
kf:{
"^":"a6;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.l]},
$isr:1,
"%":"Int16Array"},
kg:{
"^":"a6;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.l]},
$isr:1,
"%":"Int32Array"},
kh:{
"^":"a6;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.l]},
$isr:1,
"%":"Int8Array"},
ki:{
"^":"a6;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.l]},
$isr:1,
"%":"Uint16Array"},
kj:{
"^":"a6;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.l]},
$isr:1,
"%":"Uint32Array"},
kk:{
"^":"a6;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.l]},
$isr:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
kl:{
"^":"a6;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.z(H.x(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.l]},
$isr:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
e0:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
jb:function(a){return a},
j9:function(a,b){var z={}
a.F(0,new P.ja(z))
return z},
jc:function(a){var z=H.a(new P.c3(H.a(new P.w(0,$.j,null),[null])),[null])
a.then(H.ag(new P.jd(z),1)).catch(H.ag(new P.je(z),1))
return z.a},
cK:function(){var z=$.cI
if(z==null){z=J.bx(window.navigator.userAgent,"Opera",0)
$.cI=z}return z},
cJ:function(){var z,y
z=$.cF
if(z!=null)return z
y=$.cG
if(y==null){y=J.bx(window.navigator.userAgent,"Firefox",0)
$.cG=y}if(y===!0)z="-moz-"
else{y=$.cH
if(y==null){y=P.cK()!==!0&&J.bx(window.navigator.userAgent,"Trident/",0)
$.cH=y}if(y===!0)z="-ms-"
else z=P.cK()===!0?"-o-":"-webkit-"}$.cF=z
return z},
hS:{
"^":"b;",
ct:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x){if(x>=z.length)return H.f(z,x)
if(this.eW(z[x],a))return x}z.push(a)
this.b.push(null)
return y},
bI:function(a){var z,y,x,w,v,u,t,s
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.fa(a.getTime(),!0)
if(a instanceof RegExp)throw H.d(new P.c2("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.jc(a)
y=Object.getPrototypeOf(a)
if(y===Object.prototype||y===null){x=this.ct(a)
w=this.b
v=w.length
if(x>=v)return H.f(w,x)
u=w[x]
z.a=u
if(u!=null)return u
u=P.a5()
z.a=u
if(x>=v)return H.f(w,x)
w[x]=u
this.eO(a,new P.hU(z,this))
return z.a}if(a instanceof Array){x=this.ct(a)
z=this.b
if(x>=z.length)return H.f(z,x)
u=z[x]
if(u!=null)return u
w=J.G(a)
t=w.gj(a)
u=this.c?this.f7(t):a
if(x>=z.length)return H.f(z,x)
z[x]=u
if(typeof t!=="number")return H.y(t)
z=J.at(u)
s=0
for(;s<t;++s)z.p(u,s,this.bI(w.h(a,s)))
return u}return a}},
hU:{
"^":"e:8;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.bI(b)
J.e8(z,a,y)
return y}},
ja:{
"^":"e:22;a",
$2:function(a,b){this.a[a]=b}},
hT:{
"^":"hS;a,b,c",
f7:function(a){return new Array(a)},
eW:function(a,b){return a==null?b==null:a===b},
eO:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.a0)(z),++x){w=z[x]
b.$2(w,a[w])}}},
jd:{
"^":"e:2;a",
$1:function(a){return this.a.ac(0,a)}},
je:{
"^":"e:2;a",
$1:function(a){return this.a.bo(a)}}}],["","",,F,{
"^":"",
dY:[function(){var z=0,y=new P.a3(),x=1,w,v,u,t,s,r,q,p
var $async$dY=P.af(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=G
r=r
q=P
q=q.a5()
p=P
v=new r.ht("",600,400,40,15,q,p.a5())
r=E
r=r
q=Float64Array
p=H
u=new r.S(new q(p.n(16)))
r=u
r.Y()
r=F
t=new r.hw(400,300,1,1,1,0,0,null,!0,"none",null,u,!1)
r=t
r.b=[]
r=t
q=F
r.ch=q.ay(255,238,238,255)
r=E
r=r
q=Float64Array
p=H
u=new r.S(new q(p.n(16)))
r=u
r.Y()
r=G
s=new r.hE(null,0,0,!1,0,40,15,v,!1,!1,!1,0,null,!1,!1,[u])
r=s
q=G
r.a=q.hA(400,600)
r=s
r.sfj(t)
r=s
r.f6()
r=s
r.fq()
r=s
z=!r.d?2:3
break
case 2:r=s
r.d=!0
r=s
r.ay()
case 3:r=t
r=r
q=N
r.aF(q.eY(v))
return P.q(null,0,y,null)
case 1:return P.q(w,1,y)}})
return P.q(null,$async$dY,y,null)},"$0","dZ",0,0,0]},1],["","",,F,{
"^":"",
bJ:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.a0)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.aD(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
ab:{
"^":"b;a",
i:function(a){return C.I.h(0,this.a)}},
hr:{
"^":"b;"},
df:{
"^":"b;",
aF:function(a){var z=0,y=new P.a3(),x=1,w,v=this,u,t,s,r
var $async$aF=P.af(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.a(new s.w(0,r.j,null),[null])
t=u
t.bR(null)
z=2
return P.q(u,$async$aF,y)
case 2:t=v
t=t.b
t.push(a)
return P.q(null,0,y,null)
case 1:return P.q(w,1,y)}})
return P.q(null,$async$aF,y,null)},
cw:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a0)(z),++x)z[x].cw(a)},
cD:function(a,b){},
cM:function(a,b){var z,y,x
this.bp()
this.cD(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.a0)(z),++x)z[x].cM(a,b)},
bu:function(a,b){},
bx:["df",function(a,b){var z,y,x,w,v,u
this.bp()
this.bu(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.a0)(z),++w){v=z[w]
u=v.c
x.push(C.b.gad(x).q(0,u))
b.aW()
v.bx(a,b)
if(0>=x.length)return H.f(x,-1)
x.pop()
b.aW()}}],
fp:["dg",function(a,b,c,d,e){var z,y,x,w,v,u,t
this.bp()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.f(y,w)
v=y[w]
a.cF(v.c)
v.fp(a,b,c,d,e)
a.cE()}u=a.cW().bn(0)
u.f0()
y=new E.u(new Float64Array(H.n(3)))
y.B(d,e,0)
t=u.q(0,y)
t.gA(t)
t.gC(t)
return!1}],
fH:[function(a,b,c,d,e,f){},"$5","gaT",10,0,10],
fG:[function(a,b,c,d,e,f){},"$5","gaS",10,0,10],
bp:function(){if(!this.d)this.d=!0}},
hs:{
"^":"b;",
aI:function(a){var z=0,y=new P.a3(),x,w=2,v,u=this,t,s,r,q
var $async$aI=P.af(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.X(a)?3:4
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
return P.q(q.aJ(a),$async$aI,y)
case 5:s.p(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return P.q(x,0,y,null)
case 2:return P.q(v,1,y)}})
return P.q(null,$async$aI,y,null)}},
T:{
"^":"b;a,b,M:c<,a0:d<",
n:function(a,b){if(b==null)return!1
return b instanceof F.T&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gv:function(a){return F.bJ([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+H.c(this.a)+", y:"+H.c(this.b)+", w:"+H.c(this.c)+", h:"+H.c(this.d)}},
dh:{
"^":"b;M:a<,a0:b<",
n:function(a,b){if(b==null)return!1
return b instanceof F.dh&&b.a===this.a&&b.b===this.b},
gv:function(a){return F.bJ([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
i:function(a){return"w:"+this.a+", h:"+this.b}},
dg:{
"^":"b;a",
i:function(a){return C.K.h(0,this.a)}},
hx:{
"^":"b;a,b,c",
dt:function(a){if(this.a==null)this.a=F.ay(255,255,255,255)},
static:{az:function(a){var z=new F.hx(a,C.n,1)
z.dt(a)
return z}}},
de:{
"^":"b;a",
n:function(a,b){if(b==null)return!1
return b instanceof F.de&&b.a===this.a},
gv:function(a){return F.bJ([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
ds:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{ay:function(a,b,c,d){var z=new F.de(0)
z.ds(a,b,c,d)
return z}}},
bY:{
"^":"b;"},
hw:{
"^":"df;M:e<,a0:f<,r,x,y,z,Q,ch,cx,a,b,c,d",
cD:function(a,b){var z,y,x,w
z=a.gM()
y=a.gfe(a)
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
y=new E.S(new Float64Array(H.n(16)))
y.Y()
this.c=y
y.cN(0,this.z,this.Q,0)
y=this.c
x=this.y
y.bM(0,x,x,1)},
bx:function(a,b){var z,y
z=new F.T(0,0,this.e,this.f)
b.b.push(z)
b.bm(a,z)
this.df(a,b)
y=b.b
if(0>=y.length)return H.f(y,-1)
y.pop()
if(y.length>0)b.bm(a,C.b.gad(y))
else{y=a.a
b.bm(a,new F.T(0,0,y.c,y.d))}},
bu:function(a,b){var z,y,x
z=this.e
y=this.f
x=F.az(null)
x.a=this.ch
b.aG(a,new F.T(0,0,z,y),x)}},
aA:{
"^":"b;a",
i:function(a){return C.L.h(0,this.a)}},
bZ:{
"^":"b;",
sfj:function(a){this.c$=a},
f2:function(a){if(!this.e$){this.c$.cw(this)
this.e$=!0}this.c$.cM(this,a)
this.f5()},
f3:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.gad(y).q(0,z))
b.aW()
this.c$.bx(a,b)
if(0>=y.length)return H.f(y,-1)
y.pop()
b.aW()},
a1:function(a,b,c,d,e){a.cF(this.c$.c)
this.c$.dg(a,b,c,d,e)
a.cE()},
cF:function(a){var z=this.f$
z.push(C.b.gad(z).q(0,a))},
cE:function(){var z=this.f$
if(0>=z.length)return H.f(z,-1)
z.pop()},
cW:function(){return C.b.gad(this.f$)}},
cx:{
"^":"b;a",
i:function(a){return C.J.h(0,this.a)}},
eU:{
"^":"b;a,b,c",
dl:function(a){var z,y,x,w,v,u,t
z=P.iZ(a,null)
for(y=z.gK(),y=y.gD(y),x=J.G(z),w=this.a;y.t();){v=y.gw()
u=x.h(z,v)
t=J.G(u)
w.p(0,H.fZ(v,null,null),new F.eW(J.a1(t.h(u,"u")),J.a1(t.h(u,"v")),J.a1(t.h(u,"w")),J.a1(t.h(u,"h")),J.a1(t.h(u,"vx")),J.a1(t.h(u,"vy")),J.a1(t.h(u,"vw")),J.a1(t.h(u,"vh")),new F.dh(0,0),new F.T(0,0,0,0),new F.T(0,0,0,0)))}},
static:{eV:function(a){var z=new F.eU(P.a5(),32,F.az(null))
z.dl(a)
return z}}},
eW:{
"^":"b;a,b,M:c<,a0:d<,e,f,r,x,y,z,Q",
I:function(a,b){var z,y
z=this.Q
z.a=a*this.a
y=this.d*b
z.b=b-b*this.b-y
z.c=this.c*a
z.d=y
return z}},
h9:{
"^":"b;",
eI:function(a,b,c,d,e,f,g,h){if(g===C.h)this.eJ(a,b,c,d,e,f,h)
else this.eK(a,b,c,d,e,f,h)},
cs:function(a,b,c,d,e,f,g){return this.eI(a,b,c,d,e,5,f,g)},
eJ:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p
z=g.a
y=g.b
for(x=d.length,w=0;w<x;++w){v=this.h(0,d[w])
if(v==null)continue
u=v.c
t=v.d
s=v.e
r=u.z
r.a=0
r.b=0
r.c=u.c*t
r.d=u.d*s
r.a=z
r.b=y
q=e*u.I(t,s).c/u.I(t,s).d
r.c=q
r.d=e
p=g.a
if(p+g.c<r.a+q){y+=e+f
r.a=p
r.b=y
z=p}b.cr(a,c,u.I(t,s),r,this.a)
z+=r.c+f*u.I(t,s).c/u.I(t,s).d}},
eK:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o
z=g.a+g.c
y=g.b
for(x=d.length,w=0,v=0;v<x;++v){u=this.h(0,d[v])
if(u==null)continue
t=u.c
s=u.d
r=u.e
q=t.z
q.a=0
q.b=0
q.c=t.c*s
q.d=t.d*r
if(w<e*t.I(s,r).c/t.I(s,r).d)w=e*t.I(s,r).c/t.I(s,r).d
p=e*t.I(s,r).c/t.I(s,r).d
q.c=p
q.d=e
q.a=z-p
q.b=y
o=g.b
if(o+g.d<y+e){z-=w
q.a=z-p
q.b=o
y=o
w=0}b.cr(a,c,t.I(s,r),q,this.a)
y+=q.d+f}}},
ha:{
"^":"b;"},
eR:{
"^":"h9;b,c,d,a",
gK:function(){return this.b.gK()},
gj:function(a){var z=this.b
return z.gj(z)},
h:function(a,b){return this.b.h(0,b)},
dk:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
for(z=F.eV(a).a,y=z.gK(),y=y.gD(y),x=this.c,w=J.aI(x),v=this.d,u=J.aI(v),t=this.b;y.t();){s=y.gw()
r=H.aU(s)
q=new F.eT(r,z.h(0,s),w.bE(x),u.bE(v),null)
t.p(0,s,q)
t.p(0,r,q)}},
static:{eS:function(a,b,c){var z=new F.eR(P.a5(),b,c,F.az(null))
z.dk(a,b,c)
return z}}},
eT:{
"^":"ha;b,c,d,e,a"}}],["","",,G,{
"^":"",
c_:function(a){var z=0,y=new P.a3(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
var $async$c_=P.af(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.a(new p.c3(o.a(new n.w(0,m.j,null),[null])),[null])
q=C
q=q.i
t=q.cq(document,"img")
q=J
q.eO(t,a)
q=J
s=q.i(t)
q=s
r=q.gag(t)
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
p=new p.D(0,o,n,m.E(new l.hC(u,t)),!1)
o=H
q=q.a(p,[o.v(r,0)])
q.E()
q=s
s=q.gaf(t)
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
p=new p.D(0,o,n,m.E(new l.hD(a,u)),!1)
o=H
q=q.a(p,[o.v(s,0)])
q.E()
q=u
x=q.a
z=1
break
case 1:return P.q(x,0,y,null)
case 2:return P.q(v,1,y)}})
return P.q(null,$async$c_,y,null)},
di:function(a,b,c){var z,y
z=J.el(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.c(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
hz:{
"^":"b;a,b,c,k:d*",
du:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.ah(b)
y=C.c.ah(a)
x=C.i.cq(document,"canvas")
J.eP(x,z)
J.eN(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.eK(this.b,!0)},
static:{hA:function(a,b){var z=new G.hz(null,null,null,null)
z.du(a,b)
return z}}},
ht:{
"^":"hs;c,l:d*,k:e*,f,r,a,b",
aJ:function(a){var z=0,y=new P.a3(),x,w=2,v,u=this,t,s,r
var $async$aJ=P.af(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:t=G
t=t
s=G
s=s
r=u
z=3
return P.q(s.c_(r.c+a),$async$aJ,y)
case 3:x=new t.hB(c,null,null)
z=1
break
case 1:return P.q(x,0,y,null)
case 2:return P.q(v,1,y)}})
return P.q(null,$async$aJ,y,null)},
bt:function(a){var z=0,y=new P.a3(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l
var $async$bt=P.af(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
t=q.a(new p.c3(o.a(new n.w(0,m.j,null),[null])),[null])
s=new XMLHttpRequest()
q=C
q=q.y
q=q
p=s
o=u
q.fd(p,"GET",o.c+a)
q=s
q.responseType="arraybuffer"
q=H
q=q
p=W
r=q.a(new p.o(s,"load",!1),[null])
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
p=new p.D(0,o,n,m.E(new l.hu(t,s)),!1)
o=H
q=q.a(p,[o.v(r,0)])
q.E()
q=H
q=q
p=W
r=q.a(new p.o(s,"error",!1),[null])
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
p=new p.D(0,o,n,m.E(new l.hv(t)),!1)
o=H
q=q.a(p,[o.v(r,0)])
q.E()
q=s
q.send()
q=t
x=q.a
z=1
break
case 1:return P.q(x,0,y,null)
case 2:return P.q(v,1,y)}})
return P.q(null,$async$bt,y,null)}},
hu:{
"^":"e:23;a,b",
$1:function(a){var z=0,y=new P.a3(),x=1,w,v=this,u,t,s,r
var $async$$1=P.af(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=J
t=t
s=W
s=s
r=v
r=r.b
u=t.eb(s.iW(r.response))
t=v
t=t.a
t=t
s=P
s=new s.hR(!0)
t.ac(0,s.en(u))
return P.q(null,0,y,null)
case 1:return P.q(w,1,y)}})
return P.q(null,$async$$1,y,null)}},
hv:{
"^":"e:24;a",
$1:function(a){this.a.bo(a)}},
hB:{
"^":"bY;a,b,c",
gM:function(){return J.eH(this.a)},
ga0:function(){return J.es(this.a)},
cY:function(a){var z=this.c
if(z!=null&&(z==null?a!=null:z!==a))this.eE()
if(this.b==null){this.c=a
z=J.i(a).es(a)
this.b=z
a.bindTexture(3553,z)
C.N.fm(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b},
eE:function(){var z,y,x
try{y=this.b
if(y!=null&&this.c!=null){J.em(this.c,y)
this.b=null
this.c=null}}catch(x){y=H.A(x)
z=y
P.W("##ERROR # "+H.c(z))}}},
hy:{
"^":"hr;c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,a,b",
sf8:function(a){var z,y,x
this.c=a
z=this.d
y=0
while(!0){x=this.c
if(typeof x!=="number")return x.m()
if(!(y<x+1))break
z.push(Math.cos(6.283185307179586*(y/x)))
x=this.c
if(typeof x!=="number")return H.y(x)
z.push(Math.sin(6.283185307179586*(y/x)));++y}},
eX:function(){var z,y,x,w,v,u
P.W("#[A] MAX_VERTEX_TEXTURE_IMAGE_UNITS # "+H.c(J.bA(this.e,35660)))
P.W("#[B] ALIASED_POINT_SIZE_RANGE       # "+H.c(J.bA(this.e,33901)))
P.W("#[B] ALIASED_POINT_SIZE_RANGE       # "+H.c(J.bA(this.e,33901)))
z=C.b.cz(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;","  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.cz(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.e
w=G.di(x,35633,z)
v=G.di(x,35632,y)
u=J.ek(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.r=u},
W:function(a){this.x=1
this.cx=-0.5
J.co(this.e,2960)
J.en(this.e,515)
J.eg(this.e,0,0,0,1)
J.eh(this.e,1)
J.ei(this.e,0)
J.co(this.e,3042)
J.ec(this.e,32774)
J.ed(this.e,770,771,770,32772)
J.ef(this.e,17664)
C.b.sj(this.y,0)
C.b.sj(this.z,0)
C.b.sj(this.Q,0)
this.ch=null},
aH:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.y
if(z.length!==0){y=this.z
F.ay(170,255,170,170)
J.cv(this.e,this.r)
x=J.b1(this.e,this.r,"a_tex")
w=J.by(this.e)
J.bw(this.e,34962,w)
v=this.Q
J.ee(this.e,34962,new Float32Array(H.bp(v)),35044)
J.b0(this.e,x)
J.b3(this.e,x,2,5126,!1,0,0)
u=this.ch
if(u!=null){t=u.cY(this.e)
J.cl(this.e,3553,t)
J.b2(this.e,3553,10242,33071)
J.b2(this.e,3553,10243,33071)
J.b2(this.e,3553,10241,9728)
J.b2(this.e,3553,10240,9728)}u=this.e
s=J.by(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.bp(z)),35044)
u.bindBuffer(34962,null)
J.bw(this.e,34962,s)
u=this.e
s=J.by(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.bp(y)),35044)
u.bindBuffer(34963,null)
J.bw(this.e,34963,s)
u=this.e
u.uniformMatrix4fv(J.eL(u,this.r,"u_mat"),!1,new Float32Array(H.bp(this.cy.a)))
r=J.b1(this.e,this.r,"color")
q=J.b1(this.e,this.r,"vp")
p=J.b1(this.e,this.r,"useTex")
J.b3(this.e,q,3,5126,!1,32,0)
J.b3(this.e,r,4,5126,!1,32,12)
J.b3(this.e,p,1,5126,!1,32,28)
J.b0(this.e,q)
J.b0(this.e,r)
J.b0(this.e,p)
J.ep(this.e,4,y.length,5123,0)
if(x!==0){J.eo(this.e,x)
J.cl(this.e,3553,null)}J.cv(this.e,null)
C.b.sj(z,0)
C.b.sj(y,0)
C.b.sj(v,0)
this.ch=null}},
eH:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(c.b===C.n){z=this.bk()
y=b.a
x=b.b
w=y+b.c
v=x+b.d
u=new E.u(new Float64Array(H.n(3)))
u.B(y,x,0)
t=z.q(0,u)
u=new E.u(new Float64Array(H.n(3)))
u.B(y,v,0)
s=z.q(0,u)
u=new E.u(new Float64Array(H.n(3)))
u.B(w,x,0)
r=z.q(0,u)
u=new E.u(new Float64Array(H.n(3)))
u.B(w,v,0)
q=z.q(0,u)
u=c.a.a
this.am(a,t,s,r,q,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{z=this.bk()
u=b.a
p=c.c
o=p/2
y=u+o
n=b.b
x=n+o
w=u+b.c-o
v=n+b.d-o
o=new E.u(new Float64Array(H.n(3)))
o.B(y,x,0)
t=z.q(0,o)
o=y-p
n=x-p
u=new E.u(new Float64Array(H.n(3)))
u.B(o,n,0)
m=z.q(0,u)
u=new E.u(new Float64Array(H.n(3)))
u.B(y,v,0)
s=z.q(0,u)
u=v+p
l=new E.u(new Float64Array(H.n(3)))
l.B(o,u,0)
k=z.q(0,l)
l=new E.u(new Float64Array(H.n(3)))
l.B(w,x,0)
r=z.q(0,l)
p=w+p
l=new E.u(new Float64Array(H.n(3)))
l.B(p,n,0)
j=z.q(0,l)
l=new E.u(new Float64Array(H.n(3)))
l.B(w,v,0)
q=z.q(0,l)
l=new E.u(new Float64Array(H.n(3)))
l.B(p,u,0)
i=z.q(0,l)
l=c.a.a
h=(l>>>16&255)/255
g=(l>>>8&255)/255
f=(l>>>0&255)/255
e=(l>>>24&255)/255
this.am(a,m,k,t,s,h,g,f,e)
this.am(a,k,i,s,q,h,g,f,e)
this.am(a,i,j,q,r,h,g,f,e)
this.am(a,j,m,r,t,h,g,f,e)}},
aG:function(a,b,c){return this.eH(a,b,c,null)},
am:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.y
y=z.length/8|0
C.b.G(z,[b.gA(b),b.gC(b),this.cx,f,g,h,i,-1,c.gA(c),c.gC(c),this.cx,f,g,h,i,-1,d.gA(d),d.gC(d),this.cx,f,g,h,i,-1,e.gA(e),e.gC(e),this.cx,f,g,h,i,-1])
C.b.G(this.Q,[0,0,0,0,0,0,0,0])
this.cx+=0.0001
z=y+1
x=y+2
C.b.G(this.z,[y,z,x,z,y+3,x])},
ei:function(a,b,c){var z
this.aH(0)
J.cm(this.e,!1,!1,!1,!1)
J.cn(this.e,!1)
J.ct(this.e,7680,7681,7681)
J.cs(this.e,519,this.x,255)
z=F.az(null)
z.a=F.ay(255,255,255,255)
this.aG(null,b,z)
this.aH(0)
J.cm(this.e,!0,!0,!0,!0)
J.cn(this.e,!0)
J.ct(this.e,7680,7680,7680)
J.cs(this.e,515,this.x,255);++this.x},
bm:function(a,b){return this.ei(a,b,null)},
eG:function(a,b,c,d,e,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.ch
if(z!=null&&!J.X(z,b))this.aH(0)
this.ch=b
z=c.a
y=b.gM()
if(typeof y!=="number")return H.y(y)
x=z/y
y=c.b
z=this.ch.ga0()
if(typeof z!=="number")return H.y(z)
w=y/z
z=c.a
y=c.c
v=this.ch.gM()
if(typeof v!=="number")return H.y(v)
u=(z+y)/v
v=c.b
y=c.d
z=this.ch.ga0()
if(typeof z!=="number")return H.y(z)
t=(v+y)/z
z=this.Q
switch(a1){case C.m:C.b.G(z,[x,w,x,t,u,w,u,t])
break
case C.O:C.b.G(z,[x,t,u,t,x,w,u,w])
break
case C.P:C.b.G(z,[u,t,u,w,x,t,x,w])
break
case C.Q:C.b.G(z,[u,w,x,w,u,t,x,t])
break
case C.R:C.b.G(z,[u,w,u,t,x,w,x,t])
break
case C.S:C.b.G(z,[x,w,u,w,x,t,u,t])
break
case C.T:C.b.G(z,[x,t,x,w,u,t,u,w])
break
case C.U:C.b.G(z,[u,t,x,t,u,w,x,w])
break
default:C.b.G(z,[x,w,x,t,u,w,u,t])}s=this.bk()
r=d.a
q=d.b
p=r+d.c
o=q+d.d
z=new E.u(new Float64Array(H.n(3)))
z.B(r,q,0)
n=s.q(0,z)
z=new E.u(new Float64Array(H.n(3)))
z.B(r,o,0)
m=s.q(0,z)
z=new E.u(new Float64Array(H.n(3)))
z.B(p,q,0)
l=s.q(0,z)
z=new E.u(new Float64Array(H.n(3)))
z.B(p,o,0)
k=s.q(0,z)
z=this.y
j=z.length/8|0
y=e.a.a
i=(y>>>16&255)/255
h=(y>>>8&255)/255
g=(y>>>0&255)/255
f=(y>>>24&255)/255
C.b.G(z,[n.gA(n),n.gC(n),this.cx,i,h,g,f,1,m.gA(m),m.gC(m),this.cx,i,h,g,f,1,l.gA(l),l.gC(l),this.cx,i,h,g,f,1,k.gA(k),k.gC(k),this.cx,i,h,g,f,1])
this.cx+=0.0001
z=j+1
y=j+2
C.b.G(this.z,[j,z,y,z,j+3,y])},
cr:function(a,b,c,d,e){return this.eG(a,b,c,d,e,null,C.m)},
aW:function(){},
bk:function(){var z,y
this.db.Y()
z=this.db.cN(0,-1,1,0)
this.db=z
y=this.f
y=z.bM(0,2/y.c,-2/y.d,1)
this.db=y
y=y.q(0,C.b.gad(this.a))
this.db=y
return y}},
hE:{
"^":"fW;a,b,c,d,e,f,r,x,y,z,a$,b$,c$,d$,e$,f$",
gM:function(){return this.a.c},
ga0:function(){return this.a.d},
gfe:function(a){return 0},
f5:function(){this.y=!0},
ay:function(){var z=0,y=new P.a3(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$ay=P.af(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:u={}
h=H
h=h
g=P
t=h.d3(new g.bD(Date.now(),!1))
h=u
h.a=null
h=v
s=h.a
h=E
h=h
g=Float64Array
f=H
r=new h.S(new g(f.n(16)))
h=r
h.Y()
h=E
h=h
g=Float64Array
f=H
q=new h.S(new g(f.n(16)))
h=q
h.Y()
h=E
h=h
g=Float64Array
f=H
p=new h.S(new g(f.n(16)))
h=p
h.Y()
h=G
o=new h.hy(null,[],null,null,null,1,[],[],[],null,0,r,q,[p],[])
h=o
g=s
h.e=g.a
h=o
h.f=s
h=o
h.sf8(16)
h=o
h.eX()
h=o
h.W(0)
h=u
h.a=o
h=v
h=s=1000*h.r
g=v
h,r=g.f,n=0,m=0,l=0
case 2:h=v
if(!h.d){z=4
break}h=P
h=h
g=P
z=5
return P.q(h.fl(new g.aN(s),null,null),$async$ay,y)
case 5:k=Date.now()
h=v
h.b=k
j=k-t
h=v
h=h
g=C
g=g.c
h.f2(g.ah(t+j))
n+=j
m+=j
if(j<0);else ;++l
h=v
h.y=!0
z=m>r?6:7
break
case 6:h=P
h=h
g=G
h.fk(new g.hF(u,v),null)
h=v
h.y=!1
m=0
case 7:z=l>40?8:9
break
case 8:h=C
h=h.c
i="###fps  "+h.dj(n,l)
h=H
h.e0(i)
n=0
l=0
case 9:case 3:t=k
z=2
break
case 4:return P.q(null,0,y,null)
case 1:return P.q(w,1,y)}})
return P.q(null,$async$ay,y,null)},
fq:function(){var z,y,x,w
z=P.a5()
y=new G.hO(this,z)
x=new G.hN(this,z)
w=J.eA(this.a.b)
H.a(new W.D(0,w.a,w.b,W.E(x),!1),[H.v(w,0)]).E()
J.eB(this.a.b).cA(x)
x=J.eC(this.a.b)
H.a(new W.D(0,x.a,x.b,W.E(y),!1),[H.v(x,0)]).E()
x=J.eD(this.a.b)
H.a(new W.D(0,x.a,x.b,W.E(y),!1),[H.v(x,0)]).E()
x=J.eE(this.a.b)
H.a(new W.D(0,x.a,x.b,W.E(y),!1),[H.v(x,0)]).E()
J.eF(this.a.b).cA(y)},
f6:function(){var z,y
z={}
z.a=!1
y=J.et(this.a.b)
H.a(new W.D(0,y.a,y.b,W.E(new G.hG(z,this)),!1),[H.v(y,0)]).E()
y=J.ez(this.a.b)
H.a(new W.D(0,y.a,y.b,W.E(new G.hH(z,this)),!1),[H.v(y,0)]).E()
y=J.eu(this.a.b)
H.a(new W.D(0,y.a,y.b,W.E(new G.hI(z,this)),!1),[H.v(y,0)]).E()
y=J.ev(this.a.b)
H.a(new W.D(0,y.a,y.b,W.E(new G.hJ(z,this)),!1),[H.v(y,0)]).E()
y=J.ew(this.a.b)
H.a(new W.D(0,y.a,y.b,W.E(new G.hK(z,this)),!1),[H.v(y,0)]).E()
y=J.ex(this.a.b)
H.a(new W.D(0,y.a,y.b,W.E(new G.hL(z,this)),!1),[H.v(y,0)]).E()
y=J.ey(this.a.b)
H.a(new W.D(0,y.a,y.b,W.E(new G.hM(z,this)),!1),[H.v(y,0)]).E()}},
fW:{
"^":"b+bZ;"},
hF:{
"^":"e:0;a,b",
$0:function(){var z,y
z=this.a
z.a.W(0)
y=this.b
y.f3(y,z.a)
z.a.aH(0)}},
hO:{
"^":"e:11;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.cp(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.a0)(y),++v){u=y[v]
t=H.a(new P.L(C.a.H(u.pageX),C.a.H(u.pageY)),[null]).a
s=J.cq(z.a.b)
if(typeof t!=="number")return t.a4()
r=t-s
s=H.a(new P.L(C.a.H(u.pageX),C.a.H(u.pageY)),[null]).b
t=J.cr(z.a.b)
if(typeof s!=="number")return s.a4()
q=s-t
t=w.X(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.m()
z.a1(z,s+1,C.t,r,q)}else{w.p(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.m()
z.a1(z,t+1,C.r,r,q)}}}},
hN:{
"^":"e:11;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.cp(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.a0)(y),++v){u=y[v]
if(w.X(u.identifier)){t=H.a(new P.L(C.a.H(u.pageX),C.a.H(u.pageY)),[null]).a
s=J.cq(z.a.b)
if(typeof t!=="number")return t.a4()
r=H.a(new P.L(C.a.H(u.pageX),C.a.H(u.pageY)),[null]).b
q=J.cr(z.a.b)
if(typeof r!=="number")return r.a4()
w.a3(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.m()
z.a1(z,p+1,C.q,t-s,r-q)}}}},
hG:{
"^":"e:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gL(a)
x=x.gA(x)
x.toString
y=y.gL(a)
y=y.gC(y)
y.toString
z.a1(z,0,C.r,x,y)}}},
hH:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gL(a)
w=w.gA(w)
w.toString
x=x.gL(a)
x=x.gC(x)
x.toString
z.a1(z,0,C.q,w,x)
y.a=!1}}}},
hI:{
"^":"e:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
hJ:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gL(a)
w=w.gA(w)
w.toString
x=x.gL(a)
x=x.gC(x)
x.toString
z.a1(z,0,C.p,w,x)
y.a=!1}}}},
hK:{
"^":"e:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gL(a)
x=x.gA(x)
x.toString
y=y.gL(a)
y=y.gC(y)
y.toString
z.a1(z,0,C.t,x,y)}}},
hL:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gL(a)
w=w.gA(w)
w.toString
x=x.gL(a)
x=x.gC(x)
x.toString
z.a1(z,0,C.p,w,x)
y.a=!1}}}},
hM:{
"^":"e:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
hC:{
"^":"e:2;a,b",
$1:function(a){this.a.ac(0,this.b)}},
hD:{
"^":"e:2;a,b",
$1:function(a){this.b.bo("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
S:{
"^":"b;a",
ak:function(a){var z,y
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
i:function(a){return"[0] "+this.aw(0).i(0)+"\n[1] "+this.aw(1).i(0)+"\n[2] "+this.aw(2).i(0)+"\n[3] "+this.aw(3).i(0)+"\n"},
geC:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.f(z,b)
z[b]=c},
aw:function(a){var z,y,x
z=new Float64Array(H.n(4))
y=this.a
if(a>=16)return H.f(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.f(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.f(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.f(y,x)
z[3]=y[x]
return new E.ac(z)},
bn:function(a){var z=new E.S(new Float64Array(H.n(16)))
z.ak(this)
return z},
q:function(a,b){var z,y,x
if(!!b.$isac){z=new Float64Array(H.n(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ac(z)}if(!!b.$isu){z=new Float64Array(H.n(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.u(z)}if(4===b.geC()){z=new Float64Array(H.n(16))
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
return new E.S(z)}throw H.d(P.aL(b))},
m:function(a,b){var z,y
z=new Float64Array(H.n(16))
y=this.a
z[0]=C.a.m(y[0],b.gu().h(0,0))
z[1]=C.a.m(y[1],b.gu().h(0,1))
z[2]=C.a.m(y[2],b.gu().h(0,2))
z[3]=C.a.m(y[3],b.gu().h(0,3))
z[4]=C.a.m(y[4],b.gu().h(0,4))
z[5]=C.a.m(y[5],b.gu().h(0,5))
z[6]=C.a.m(y[6],b.gu().h(0,6))
z[7]=C.a.m(y[7],b.gu().h(0,7))
z[8]=C.a.m(y[8],b.gu().h(0,8))
z[9]=C.a.m(y[9],b.gu().h(0,9))
z[10]=C.a.m(y[10],b.gu().h(0,10))
z[11]=C.a.m(y[11],b.gu().h(0,11))
z[12]=C.a.m(y[12],b.gu().h(0,12))
z[13]=C.a.m(y[13],b.gu().h(0,13))
z[14]=C.a.m(y[14],b.gu().h(0,14))
z[15]=C.a.m(y[15],b.gu().h(0,15))
return new E.S(z)},
cN:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.m(b)
y=!!z.$isac
x=y?b.gM():1
if(!!z.$isu||y){w=z.gA(b)
v=z.gC(b)
u=z.gfu(b)}else{u=d
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
bM:function(a,b,c,d){var z,y,x,w,v,u
z=J.m(b)
y=!!z.$isac
x=y?b.gM():1
if(!!z.$isu||y){w=z.gA(b)
v=z.gC(b)
u=z.gfu(b)}else{u=d
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
Y:function(){var z=this.a
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
f0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
u:{
"^":"b;a",
B:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
ak:function(a){var z,y
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
y=C.a.m(z[0],b.gu().h(0,0))
x=C.a.m(z[1],b.gu().h(0,1))
z=C.a.m(z[2],b.gu().h(0,2))
w=new E.u(new Float64Array(H.n(3)))
w.B(y,x,z)
return w},
q:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.y(b)
x=z[1]
z=z[2]
w=new E.u(new Float64Array(H.n(3)))
w.B(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.f(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dR(y*y+x*x+z*z))},
bn:function(a){var z=new E.u(new Float64Array(H.n(3)))
z.ak(this)
return z},
gA:function(a){return this.a[0]},
gC:function(a){return this.a[1]}},
ac:{
"^":"b;a",
bO:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
ak:function(a){var z,y
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
y=C.a.m(z[0],b.gu().h(0,0))
x=C.a.m(z[1],b.gu().h(0,1))
w=C.a.m(z[2],b.gu().h(0,2))
z=C.a.m(z[3],b.gu().h(0,3))
v=new E.ac(new Float64Array(H.n(4)))
v.bO(y,x,w,z)
return v},
q:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.y(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ac(new Float64Array(H.n(4)))
v.bO(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.f(z,b)
return z[b]},
p:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.f(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dR(y*y+x*x+w*w+z*z))},
bn:function(a){var z=new E.ac(new Float64Array(H.n(4)))
z.ak(this)
return z},
gA:function(a){return this.a[0]},
gC:function(a){return this.a[1]},
gM:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cT.prototype
return J.fJ.prototype}if(typeof a=="string")return J.ba.prototype
if(a==null)return J.fK.prototype
if(typeof a=="boolean")return J.fI.prototype
if(a.constructor==Array)return J.aP.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
return a}if(a instanceof P.b)return a
return J.bs(a)}
J.G=function(a){if(typeof a=="string")return J.ba.prototype
if(a==null)return a
if(a.constructor==Array)return J.aP.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
return a}if(a instanceof P.b)return a
return J.bs(a)}
J.at=function(a){if(a==null)return a
if(a.constructor==Array)return J.aP.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
return a}if(a instanceof P.b)return a
return J.bs(a)}
J.aI=function(a){if(typeof a=="number")return J.aQ.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bk.prototype
return a}
J.jf=function(a){if(typeof a=="number")return J.aQ.prototype
if(typeof a=="string")return J.ba.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bk.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
return a}if(a instanceof P.b)return a
return J.bs(a)}
J.aJ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.jf(a).m(a,b)}
J.X=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).n(a,b)}
J.e6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aI(a).ax(a,b)}
J.e7=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aI(a).aX(a,b)}
J.ck=function(a,b){if(a.constructor==Array||typeof a=="string"||H.dW(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.G(a).h(a,b)}
J.e8=function(a,b,c){if((a.constructor==Array||H.dW(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.at(a).p(a,b,c)}
J.e9=function(a,b,c,d){return J.i(a).dA(a,b,c,d)}
J.ea=function(a,b,c,d){return J.i(a).dZ(a,b,c,d)}
J.eb=function(a){return J.i(a).e4(a)}
J.bw=function(a,b,c){return J.i(a).e6(a,b,c)}
J.cl=function(a,b,c){return J.i(a).e7(a,b,c)}
J.ec=function(a,b){return J.i(a).e9(a,b)}
J.ed=function(a,b,c,d,e){return J.i(a).ea(a,b,c,d,e)}
J.ee=function(a,b,c,d){return J.i(a).eb(a,b,c,d)}
J.ef=function(a,b){return J.at(a).ee(a,b)}
J.eg=function(a,b,c,d,e){return J.i(a).ef(a,b,c,d,e)}
J.eh=function(a,b){return J.i(a).eg(a,b)}
J.ei=function(a,b){return J.i(a).eh(a,b)}
J.cm=function(a,b,c,d,e){return J.i(a).ej(a,b,c,d,e)}
J.ej=function(a,b){return J.i(a).ac(a,b)}
J.bx=function(a,b,c){return J.G(a).el(a,b,c)}
J.by=function(a){return J.i(a).eo(a)}
J.ek=function(a){return J.i(a).eq(a)}
J.el=function(a,b){return J.i(a).er(a,b)}
J.em=function(a,b){return J.i(a).eu(a,b)}
J.en=function(a,b){return J.i(a).ev(a,b)}
J.cn=function(a,b){return J.i(a).ew(a,b)}
J.eo=function(a,b){return J.i(a).eD(a,b)}
J.ep=function(a,b,c,d,e){return J.i(a).eF(a,b,c,d,e)}
J.eq=function(a,b){return J.at(a).O(a,b)}
J.co=function(a,b){return J.i(a).eL(a,b)}
J.b0=function(a,b){return J.i(a).eM(a,b)}
J.er=function(a,b){return J.at(a).F(a,b)}
J.cp=function(a){return J.i(a).ged(a)}
J.Y=function(a){return J.i(a).gap(a)}
J.H=function(a){return J.m(a).gv(a)}
J.es=function(a){return J.i(a).gk(a)}
J.bz=function(a){return J.at(a).gD(a)}
J.aK=function(a){return J.G(a).gj(a)}
J.cq=function(a){return J.i(a).gf9(a)}
J.cr=function(a){return J.i(a).gfa(a)}
J.et=function(a){return J.i(a).gaL(a)}
J.eu=function(a){return J.i(a).gaM(a)}
J.ev=function(a){return J.i(a).gaN(a)}
J.ew=function(a){return J.i(a).gaO(a)}
J.ex=function(a){return J.i(a).gaP(a)}
J.ey=function(a){return J.i(a).gaQ(a)}
J.ez=function(a){return J.i(a).gaR(a)}
J.eA=function(a){return J.i(a).gbv(a)}
J.eB=function(a){return J.i(a).gaS(a)}
J.eC=function(a){return J.i(a).gfb(a)}
J.eD=function(a){return J.i(a).gfc(a)}
J.eE=function(a){return J.i(a).gbw(a)}
J.eF=function(a){return J.i(a).gaT(a)}
J.eG=function(a){return J.i(a).gbH(a)}
J.eH=function(a){return J.i(a).gl(a)}
J.eI=function(a){return J.i(a).gA(a)}
J.b1=function(a,b,c){return J.i(a).cS(a,b,c)}
J.eJ=function(a){return J.i(a).cT(a)}
J.eK=function(a,b){return J.i(a).cU(a,b)}
J.bA=function(a,b){return J.i(a).cX(a,b)}
J.eL=function(a,b,c){return J.i(a).cZ(a,b,c)}
J.eM=function(a,b){return J.at(a).ae(a,b)}
J.au=function(a,b){return J.i(a).aZ(a,b)}
J.eN=function(a,b){return J.i(a).sk(a,b)}
J.eO=function(a,b){return J.i(a).sT(a,b)}
J.eP=function(a,b){return J.i(a).sl(a,b)}
J.cs=function(a,b,c,d){return J.i(a).d8(a,b,c,d)}
J.ct=function(a,b,c,d){return J.i(a).d9(a,b,c,d)}
J.b2=function(a,b,c,d){return J.i(a).fo(a,b,c,d)}
J.a1=function(a){return J.aI(a).bE(a)}
J.cu=function(a){return J.aI(a).ah(a)}
J.av=function(a){return J.m(a).i(a)}
J.cv=function(a,b){return J.i(a).fs(a,b)}
J.b3=function(a,b,c,d,e,f,g){return J.i(a).ft(a,b,c,d,e,f,g)}
I.ch=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.i=W.fp.prototype
C.y=W.fq.prototype
C.z=J.h.prototype
C.b=J.aP.prototype
C.c=J.cT.prototype
C.a=J.aQ.prototype
C.e=J.ba.prototype
C.H=J.aR.prototype
C.M=J.fY.prototype
C.N=P.h4.prototype
C.V=J.bk.prototype
C.u=new F.cx(0)
C.h=new F.cx(1)
C.v=new H.cL()
C.w=new P.fX()
C.x=new P.i5()
C.d=new P.iE()
C.f=new P.aN(0)
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
C.G=function(_, letter) { return letter.toUpperCase(); }
C.l=H.a(I.ch([127,2047,65535,1114111]),[P.l])
C.I=new H.b7([0,"TinyCanvasTransform.NONE",1,"TinyCanvasTransform.ROT90",2,"TinyCanvasTransform.ROT180",3,"TinyCanvasTransform.ROT270",4,"TinyCanvasTransform.MIRROR",5,"TinyCanvasTransform.MIRROR_ROT90",6,"TinyCanvasTransform.MIRROR_ROT180",7,"TinyCanvasTransform.MIRROR_ROT270"])
C.J=new H.b7([0,"BitmapFontInfoType.vertical",1,"BitmapFontInfoType.horizontal"])
C.K=new H.b7([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.L=new H.b7([0,"TinyStagePointerType.CANCEL",1,"TinyStagePointerType.UP",2,"TinyStagePointerType.DOWN",3,"TinyStagePointerType.MOVE"])
C.m=new F.ab(0)
C.O=new F.ab(1)
C.P=new F.ab(2)
C.Q=new F.ab(3)
C.R=new F.ab(4)
C.S=new F.ab(5)
C.T=new F.ab(6)
C.U=new F.ab(7)
C.n=new F.dg(0)
C.o=new F.dg(1)
C.p=new F.aA(0)
C.q=new F.aA(1)
C.r=new F.aA(2)
C.t=new F.aA(3)
$.d4="$cachedFunction"
$.d5="$cachedInvocation"
$.R=0
$.aw=null
$.cy=null
$.cf=null
$.dO=null
$.e1=null
$.br=null
$.bt=null
$.cg=null
$.ap=null
$.aE=null
$.aF=null
$.c9=!1
$.j=C.d
$.cO=0
$.cI=null
$.cH=null
$.cG=null
$.cF=null
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
I.$lazy(y,x,w)}})(["cE","$get$cE",function(){return init.getIsolateTag("_$dart_dartClosure")},"cR","$get$cR",function(){return H.fD()},"cS","$get$cS",function(){return new P.fh(null)},"dj","$get$dj",function(){return H.U(H.bj({toString:function(){return"$receiver$"}}))},"dk","$get$dk",function(){return H.U(H.bj({$method$:null,toString:function(){return"$receiver$"}}))},"dl","$get$dl",function(){return H.U(H.bj(null))},"dm","$get$dm",function(){return H.U(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dr","$get$dr",function(){return H.U(H.bj(void 0))},"ds","$get$ds",function(){return H.U(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dp","$get$dp",function(){return H.U(H.dq(null))},"dn","$get$dn",function(){return H.U(function(){try{null.$method$}catch(z){return z.message}}())},"du","$get$du",function(){return H.U(H.dq(void 0))},"dt","$get$dt",function(){return H.U(function(){try{(void 0).$method$}catch(z){return z.message}}())},"c4","$get$c4",function(){return P.hV()},"aG","$get$aG",function(){return[]},"cD","$get$cD",function(){return{}}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[W.bQ]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[P.a_]},{func:1,args:[,P.a9]},{func:1,args:[,],opt:[,]},{func:1,args:[,,]},{func:1,ret:P.a_,args:[P.l]},{func:1,v:true,args:[F.bZ,P.l,F.aA,P.ah,P.ah]},{func:1,args:[W.c1]},{func:1,args:[,P.a_]},{func:1,args:[F.bY]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.l,,]},{func:1,v:true,args:[,],opt:[P.a9]},{func:1,ret:P.cb},{func:1,v:true,args:[P.b],opt:[P.a9]},{func:1,v:true,args:[,P.a9]},{func:1,ret:P.l,args:[,P.l]},{func:1,v:true,args:[P.l,P.l]},{func:1,args:[P.a_,,]},{func:1,ret:P.Q,args:[W.aV]},{func:1,args:[W.aV]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.jz(d||a)
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
Isolate.ch=a.ch
Isolate.aH=a.aH
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.e3(F.dZ(),b)},[])
else (function(b){H.e3(F.dZ(),b)})([])})})()