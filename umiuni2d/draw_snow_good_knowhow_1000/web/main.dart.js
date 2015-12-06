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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ca"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ca"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ca(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bk=function(){}
var dart=[["","",,H,{
"^":"",
jW:{
"^":"a;a"}}],["","",,J,{
"^":"",
m:function(a){return void 0},
bq:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bm:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cc==null){H.j4()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.bX("Return interceptor for "+H.b(y(a,z))))}w=H.jd(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.z
else return C.B}return w},
f:{
"^":"a;",
n:function(a,b){return a===b},
gu:function(a){return H.a3(a)},
i:["d5",function(a){return H.b5(a)}],
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
fi:{
"^":"f;",
i:function(a){return String(a)},
gu:function(a){return a?519018:218159},
$isc8:1},
fk:{
"^":"f;",
n:function(a,b){return null==b},
i:function(a){return"null"},
gu:function(a){return 0}},
cL:{
"^":"f;",
gu:function(a){return 0},
$isfl:1},
fz:{
"^":"cL;"},
bY:{
"^":"cL;",
i:function(a){return String(a)}},
aE:{
"^":"f;",
c7:function(a,b){if(!!a.immutable$list)throw H.d(new P.K(b))},
c6:function(a,b){if(!!a.fixed$length)throw H.d(new P.K(b))},
a6:function(a,b){var z,y
this.c6(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.T)(b),++y)a.push(b[y])},
F:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.H(a))}},
a9:function(a,b){return H.c(new H.bI(a,b),[null,null])},
cg:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.h(y,x)
y[x]=w}return y.join(b)},
W:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
ges:function(a){if(a.length>0)return a[0]
throw H.d(H.bD())},
ga8:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.bD())},
bx:function(a,b,c,d,e){var z,y,x
this.c7(a,"set range")
P.b8(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.y(P.a4(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.fg())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aX(a,"[","]")},
gG:function(a){return new J.ey(a,a.length,0,null)},
gu:function(a){return H.a3(a)},
gj:function(a){return a.length},
sj:function(a,b){this.c6(a,"set length")
if(b<0)throw H.d(P.a4(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.x(a,b))
if(b>=a.length||b<0)throw H.d(H.x(a,b))
return a[b]},
q:function(a,b,c){this.c7(a,"indexed set")
if(b>=a.length||b<0)throw H.d(H.x(a,b))
a[b]=c},
$isaY:1,
$isj:1,
$asj:null,
$isq:1},
jV:{
"^":"aE;"},
ey:{
"^":"a;a,b,c,d",
gB:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(new P.H(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aF:{
"^":"f;",
bm:function(a,b){return a%b},
aa:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.K(""+a))},
D:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.K(""+a))},
f_:function(a){return a},
aG:function(a,b){var z,y,x,w
H.c9(b)
if(b<2||b>36)throw H.d(P.a4(b,2,36,"radix",null))
z=a.toString(b)
if(C.e.c8(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.y(new P.K("Unexpected toString result: "+z))
x=J.B(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.e.p("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gu:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.d(H.Z(b))
return a+b},
da:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aa(a/b)},
ag:function(a,b){return(a|0)===a?a/b|0:this.aa(a/b)},
ax:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aI:function(a,b){if(typeof b!=="number")throw H.d(H.Z(b))
return a<b},
as:function(a,b){if(typeof b!=="number")throw H.d(H.Z(b))
return a>b},
$isaN:1},
cK:{
"^":"aF;",
$isaN:1,
$isk:1},
fj:{
"^":"aF;",
$isaN:1},
aZ:{
"^":"f;",
c8:function(a,b){if(b<0)throw H.d(H.x(a,b))
if(b>=a.length)throw H.d(H.x(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.d(P.ex(b,null,null))
return a+b},
d4:function(a,b,c){H.c9(b)
if(c==null)c=a.length
H.c9(c)
if(b<0)throw H.d(P.b7(b,null,null))
if(typeof c!=="number")return H.E(c)
if(b>c)throw H.d(P.b7(b,null,null))
if(c>a.length)throw H.d(P.b7(c,null,null))
return a.substring(b,c)},
d3:function(a,b){return this.d4(a,b,null)},
p:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.n)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
e9:function(a,b,c){if(c>a.length)throw H.d(P.a4(c,0,a.length,null,null))
return H.ji(a,b,c)},
gL:function(a){return a.length===0},
i:function(a){return a},
gu:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.x(a,b))
if(b>=a.length||b<0)throw H.d(H.x(a,b))
return a[b]},
$isaY:1,
$isX:1}}],["","",,H,{
"^":"",
aK:function(a,b){var z=a.ak(b)
if(!init.globalState.d.cy)init.globalState.f.ap()
return z},
bp:function(){--init.globalState.f.b},
dU:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isj)throw H.d(P.aA("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.ic(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$cI()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.hN(P.bG(null,H.aJ),0)
y.z=P.b1(null,null,null,P.k,H.c4)
y.ch=P.b1(null,null,null,P.k,null)
if(y.x===!0){x=new H.ib()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.f9,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.id)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.b1(null,null,null,P.k,H.b9)
w=P.ao(null,null,null,P.k)
v=new H.b9(0,null,!1)
u=new H.c4(y,x,w,init.createNewIsolate(),v,new H.ab(H.br()),new H.ab(H.br()),!1,!1,[],P.ao(null,null,null,null),null,null,!1,!0,P.ao(null,null,null,null))
w.a5(0,0)
u.bA(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aM()
x=H.aj(y,[y]).Z(a)
if(x)u.ak(new H.jg(z,a))
else{y=H.aj(y,[y,y]).Z(a)
if(y)u.ak(new H.jh(z,a))
else u.ak(a)}init.globalState.f.ap()},
fd:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fe()
return},
fe:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.K("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.K("Cannot extract URI from \""+H.b(z)+"\""))},
f9:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bd(!0,[]).a_(b.data)
y=J.B(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bd(!0,[]).a_(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bd(!0,[]).a_(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.b1(null,null,null,P.k,H.b9)
p=P.ao(null,null,null,P.k)
o=new H.b9(0,null,!1)
n=new H.c4(y,q,p,init.createNewIsolate(),o,new H.ab(H.br()),new H.ab(H.br()),!1,!1,[],P.ao(null,null,null,null),null,null,!1,!0,P.ao(null,null,null,null))
p.a5(0,0)
n.bA(0,o)
init.globalState.f.a.V(new H.aJ(n,new H.fa(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ap()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.ak(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.ap()
break
case"close":init.globalState.ch.Y(0,$.$get$cJ().h(0,a))
a.terminate()
init.globalState.f.ap()
break
case"log":H.f8(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ae(["command","print","msg",z])
q=new H.af(!0,P.ad(null,P.k)).I(q)
y.toString
self.postMessage(q)}else P.aO(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
f8:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ae(["command","log","msg",a])
x=new H.af(!0,P.ad(null,P.k)).I(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.F(w)
z=H.D(w)
throw H.d(P.aW(z))}},
fb:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cX=$.cX+("_"+y)
$.cY=$.cY+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.ak(f,["spawned",new H.bf(y,x),w,z.r])
x=new H.fc(a,b,c,d,z)
if(e===!0){z.c4(w,w)
init.globalState.f.a.V(new H.aJ(z,x,"start isolate"))}else x.$0()},
iB:function(a){return new H.bd(!0,[]).a_(new H.af(!1,P.ad(null,P.k)).I(a))},
jg:{
"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jh:{
"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ic:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{id:function(a){var z=P.ae(["command","print","msg",a])
return new H.af(!0,P.ad(null,P.k)).I(z)}}},
c4:{
"^":"a;a,b,c,eH:d<,ea:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
c4:function(a,b){if(!this.f.n(0,a))return
if(this.Q.a5(0,b)&&!this.y)this.y=!0
this.b4()},
eS:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.Y(0,a)
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
if(w===y.c)y.bL();++y.d}this.y=!1}this.b4()},
dT:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
eR:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.n(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.y(new P.K("removeRange"))
P.b8(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
cZ:function(a,b){if(!this.r.n(0,a))return
this.db=b},
ex:function(a,b,c){var z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){J.ak(a,c)
return}z=this.cx
if(z==null){z=P.bG(null,null)
this.cx=z}z.V(new H.i3(a,c))},
ev:function(a,b){var z
if(!this.r.n(0,a))return
z=J.m(b)
if(!z.n(b,0))z=z.n(b,1)&&!this.cy
else z=!0
if(z){this.be()
return}z=this.cx
if(z==null){z=P.bG(null,null)
this.cx=z}z.V(this.geK())},
ey:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aO(a)
if(b!=null)P.aO(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.az(a)
y[1]=b==null?null:J.az(b)
for(x=new P.cM(z,z.r,null,null),x.c=z.e;x.v();)J.ak(x.d,y)},
ak:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.F(u)
w=t
v=H.D(u)
this.ey(w,v)
if(this.db===!0){this.be()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.geH()
if(this.cx!=null)for(;t=this.cx,!t.gL(t);)this.cx.cz().$0()}return y},
ck:function(a){return this.b.h(0,a)},
bA:function(a,b){var z=this.b
if(z.T(a))throw H.d(P.aW("Registry: ports must be registered only once."))
z.q(0,a,b)},
b4:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.q(0,this.a,this)
else this.be()},
be:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.S(0)
for(z=this.b,y=z.gcI(z),y=y.gG(y);y.v();)y.gB().dr()
z.S(0)
this.c.S(0)
init.globalState.z.Y(0,this.a)
this.dx.S(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
J.ak(w,z[v])}this.ch=null}},"$0","geK",0,0,1]},
i3:{
"^":"e:1;a,b",
$0:function(){J.ak(this.a,this.b)}},
hN:{
"^":"a;a,b",
ei:function(){var z=this.a
if(z.b===z.c)return
return z.cz()},
cD:function(){var z,y,x
z=this.ei()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.T(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gL(y)}else y=!1
else y=!1
else y=!1
if(y)H.y(P.aW("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gL(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ae(["command","close"])
x=new H.af(!0,P.ad(null,P.k)).I(x)
y.toString
self.postMessage(x)}return!1}z.eQ()
return!0},
bW:function(){if(self.window!=null)new H.hO(this).$0()
else for(;this.cD(););},
ap:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bW()
else try{this.bW()}catch(x){w=H.F(x)
z=w
y=H.D(x)
w=init.globalState.Q
v=P.ae(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.af(!0,P.ad(null,P.k)).I(v)
w.toString
self.postMessage(v)}}},
hO:{
"^":"e:1;a",
$0:function(){if(!this.a.cD())return
P.d7(C.h,this)}},
aJ:{
"^":"a;a,b,c",
eQ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ak(this.b)}},
ib:{
"^":"a;"},
fa:{
"^":"e:0;a,b,c,d,e,f",
$0:function(){H.fb(this.a,this.b,this.c,this.d,this.e,this.f)}},
fc:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aM()
w=H.aj(x,[x,x]).Z(y)
if(w)y.$2(this.b,this.c)
else{x=H.aj(x,[x]).Z(y)
if(x)y.$1(this.b)
else y.$0()}}z.b4()}},
dr:{
"^":"a;"},
bf:{
"^":"dr;b,a",
aK:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbO())return
x=H.iB(b)
if(z.gea()===y){y=J.B(x)
switch(y.h(x,0)){case"pause":z.c4(y.h(x,1),y.h(x,2))
break
case"resume":z.eS(y.h(x,1))
break
case"add-ondone":z.dT(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.eR(y.h(x,1))
break
case"set-errors-fatal":z.cZ(y.h(x,1),y.h(x,2))
break
case"ping":z.ex(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ev(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a5(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.Y(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(b)
y.a.V(new H.aJ(z,new H.ig(this,x),w))},
n:function(a,b){if(b==null)return!1
return b instanceof H.bf&&J.U(this.b,b.b)},
gu:function(a){return this.b.gb_()}},
ig:{
"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbO())z.dl(this.b)}},
c5:{
"^":"dr;b,c,a",
aK:function(a,b){var z,y,x
z=P.ae(["command","message","port",this,"msg",b])
y=new H.af(!0,P.ad(null,P.k)).I(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
n:function(a,b){if(b==null)return!1
return b instanceof H.c5&&J.U(this.b,b.b)&&J.U(this.a,b.a)&&J.U(this.c,b.c)},
gu:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.d_()
y=this.a
if(typeof y!=="number")return y.d_()
x=this.c
if(typeof x!=="number")return H.E(x)
return(z<<16^y<<8^x)>>>0}},
b9:{
"^":"a;b_:a<,b,bO:c<",
dr:function(){this.c=!0
this.b=null},
dl:function(a){if(this.c)return
this.dC(a)},
dC:function(a){return this.b.$1(a)},
$isfB:1},
h3:{
"^":"a;a,b,c",
df:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.V(new H.aJ(y,new H.h5(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.av(new H.h6(this,b),0),a)}else throw H.d(new P.K("Timer greater than 0."))},
static:{h4:function(a,b){var z=new H.h3(!0,!1,null)
z.df(a,b)
return z}}},
h5:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
h6:{
"^":"e:1;a,b",
$0:function(){this.a.c=null
H.bp()
this.b.$0()}},
ab:{
"^":"a;b_:a<",
gu:function(a){var z=this.a
if(typeof z!=="number")return z.f5()
z=C.a.ax(z,0)^C.a.ag(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
n:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ab){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
af:{
"^":"a;a,b",
I:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.gj(z))
z=J.m(a)
if(!!z.$iscP)return["buffer",a]
if(!!z.$isbN)return["typed",a]
if(!!z.$isaY)return this.cV(a)
if(!!z.$isf7){x=this.gcS()
w=a.gci()
w=H.b3(w,x,H.L(w,"O",0),null)
w=P.bH(w,!0,H.L(w,"O",0))
z=z.gcI(a)
z=H.b3(z,x,H.L(z,"O",0),null)
return["map",w,P.bH(z,!0,H.L(z,"O",0))]}if(!!z.$isfl)return this.cW(a)
if(!!z.$isf)this.cH(a)
if(!!z.$isfB)this.aq(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbf)return this.cX(a)
if(!!z.$isc5)return this.cY(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.aq(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isab)return["capability",a.a]
if(!(a instanceof P.a))this.cH(a)
return["dart",init.classIdExtractor(a),this.cU(init.classFieldsExtractor(a))]},"$1","gcS",2,0,2],
aq:function(a,b){throw H.d(new P.K(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
cH:function(a){return this.aq(a,null)},
cV:function(a){var z=this.cT(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aq(a,"Can't serialize indexable: ")},
cT:function(a){var z,y,x
z=[]
C.b.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.I(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
cU:function(a){var z
for(z=0;z<a.length;++z)C.b.q(a,z,this.I(a[z]))
return a},
cW:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aq(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.I(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
cY:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
cX:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gb_()]
return["raw sendport",a]}},
bd:{
"^":"a;a,b",
a_:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.aA("Bad serialized message: "+H.b(a)))
switch(C.b.ges(a)){case"ref":if(1>=a.length)return H.h(a,1)
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
case"map":return this.el(a)
case"sendport":return this.em(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.ek(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.ab(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.ai(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.b(a))}},"$1","gej",2,0,2],
ai:function(a){var z,y,x
z=J.B(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.E(x)
if(!(y<x))break
z.q(a,y,this.a_(z.h(a,y)));++y}return a},
el:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.an()
this.b.push(w)
y=J.et(y,this.gej()).bq(0)
for(z=J.B(y),v=J.B(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.q(0,y[u],this.a_(v.h(x,u)))}return w},
em:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.U(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.ck(w)
if(u==null)return
t=new H.bf(u,x)}else t=new H.c5(y,w,x)
this.b.push(t)
return t},
ek:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.B(y)
v=J.B(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.E(t)
if(!(u<t))break
w[z.h(y,u)]=this.a_(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
eH:function(){throw H.d(new P.K("Cannot modify unmodifiable Map"))},
j_:function(a){return init.types[a]},
jc:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isb_},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.az(a)
if(typeof z!=="string")throw H.d(H.Z(a))
return z},
a3:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bO:function(a){var z,y
z=C.i(J.m(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.e.c8(z,0)===36)z=C.e.d3(z,1)
return(z+H.ce(H.bn(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
b5:function(a){return"Instance of '"+H.bO(a)+"'"},
fA:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
b6:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.ax(z,10))>>>0,56320|z&1023)}throw H.d(P.a4(a,0,1114111,null,null))},
I:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cW:function(a){return a.b?H.I(a).getUTCMilliseconds()+0:H.I(a).getMilliseconds()+0},
b4:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.Z(a))
return a[b]},
bP:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.Z(a))
a[b]=c},
E:function(a){throw H.d(H.Z(a))},
h:function(a,b){if(a==null)J.ay(a)
throw H.d(H.x(a,b))},
x:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aa(!0,b,"index",null)
z=J.ay(a)
if(!(b<0)){if(typeof z!=="number")return H.E(z)
y=b>=z}else y=!0
if(y)return P.bC(b,a,"index",null,z)
return P.b7(b,"index",null)},
Z:function(a){return new P.aa(!0,a,null,null)},
dJ:function(a){return a},
c9:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.Z(a))
return a},
d:function(a){var z
if(a==null)a=new P.cV()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dV})
z.name=""}else z.toString=H.dV
return z},
dV:function(){return J.az(this.dartException)},
y:function(a){throw H.d(a)},
T:function(a){throw H.d(new P.H(a))},
F:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jl(a)
if(a==null)return
if(a instanceof H.bB)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.ax(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bE(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.cU(v,null))}}if(a instanceof TypeError){u=$.$get$dc()
t=$.$get$dd()
s=$.$get$de()
r=$.$get$df()
q=$.$get$dj()
p=$.$get$dk()
o=$.$get$dh()
$.$get$dg()
n=$.$get$dm()
m=$.$get$dl()
l=u.N(y)
if(l!=null)return z.$1(H.bE(y,l))
else{l=t.N(y)
if(l!=null){l.method="call"
return z.$1(H.bE(y,l))}else{l=s.N(y)
if(l==null){l=r.N(y)
if(l==null){l=q.N(y)
if(l==null){l=p.N(y)
if(l==null){l=o.N(y)
if(l==null){l=r.N(y)
if(l==null){l=n.N(y)
if(l==null){l=m.N(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cU(y,l==null?null:l.method))}}return z.$1(new H.hx(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.d2()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aa(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.d2()
return a},
D:function(a){var z
if(a instanceof H.bB)return a.b
if(a==null)return new H.dw(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dw(a,null)},
jf:function(a){if(a==null||typeof a!='object')return J.G(a)
else return H.a3(a)},
dL:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
j6:function(a,b,c,d,e,f,g){var z=J.m(c)
if(z.n(c,0))return H.aK(b,new H.j7(a))
else if(z.n(c,1))return H.aK(b,new H.j8(a,d))
else if(z.n(c,2))return H.aK(b,new H.j9(a,d,e))
else if(z.n(c,3))return H.aK(b,new H.ja(a,d,e,f))
else if(z.n(c,4))return H.aK(b,new H.jb(a,d,e,f,g))
else throw H.d(P.aW("Unsupported number of arguments for wrapped closure"))},
av:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.j6)
a.$identity=z
return z},
eF:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isj){z.$reflectionInfo=c
x=H.fE(z).r}else x=c
w=d?Object.create(new H.fR().constructor.prototype):Object.create(new H.bx(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.R
$.R=J.ax(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cw(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.j_(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cu:H.by
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cw(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
eC:function(a,b,c,d){var z=H.by
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cw:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eE(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eC(y,!w,z,b)
if(y===0){w=$.al
if(w==null){w=H.aU("self")
$.al=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.R
$.R=J.ax(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.al
if(v==null){v=H.aU("self")
$.al=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.R
$.R=J.ax(w,1)
return new Function(v+H.b(w)+"}")()},
eD:function(a,b,c,d){var z,y
z=H.by
y=H.cu
switch(b?-1:a){case 0:throw H.d(new H.fG("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eE:function(a,b){var z,y,x,w,v,u,t,s
z=H.ez()
y=$.ct
if(y==null){y=H.aU("receiver")
$.ct=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eD(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.R
$.R=J.ax(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.R
$.R=J.ax(u,1)
return new Function(y+H.b(u)+"}")()},
ca:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eF(a,b,z,!!d,e,f)},
jk:function(a){throw H.d(new P.eL("Cyclic initialization for static "+H.b(a)))},
aj:function(a,b,c){return new H.fH(a,b,c,null)},
aM:function(){return C.m},
br:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
p:function(a,b,c){var z
if(b===0){J.e7(c,a)
return}else if(b===1){c.ca(H.F(a),H.D(a))
return}if(!!J.m(a).$isP)z=a
else{z=H.c(new P.C(0,$.l,null),[null])
z.aQ(a)}z.aF(H.dE(b,0),new H.iM(b))
return c.geu()},
dE:function(a,b){return new H.iK(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
c:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bn:function(a){if(a==null)return
return a.$builtinTypeInfo},
dM:function(a,b){return H.ci(a["$as"+H.b(b)],H.bn(a))},
L:function(a,b,c){var z=H.dM(a,b)
return z==null?null:z[c]},
u:function(a,b){var z=H.bn(a)
return z==null?null:z[b]},
ch:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.ce(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.i(a)
else return},
ce:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.ba("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.ch(u,c))}return w?"":"<"+H.b(z)+">"},
ci:function(a,b){if(typeof a=="function"){a=H.cd(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cd(a,null,b)}return b},
iQ:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bn(a)
y=J.m(a)
if(y[b]==null)return!1
return H.dH(H.ci(y[d],z),c)},
jj:function(a,b,c,d){if(a!=null&&!H.iQ(a,b,c,d))throw H.d(H.eB(H.bO(a),(b.substring(3)+H.ce(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
dH:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.M(a[y],b[y]))return!1
return!0},
bi:function(a,b,c){return H.cd(a,b,H.dM(b,c))},
M:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.dN(a,b)
if('func' in a)return b.builtin$cls==="eW"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.ch(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.ch(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.dH(H.ci(v,z),x)},
dG:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.M(z,v)||H.M(v,z)))return!1}return!0},
iL:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.M(v,u)||H.M(u,v)))return!1}return!0},
dN:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.M(z,y)||H.M(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dG(x,w,!1))return!1
if(!H.dG(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.M(o,n)||H.M(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.M(o,n)||H.M(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.M(o,n)||H.M(n,o)))return!1}}return H.iL(a.named,b.named)},
cd:function(a,b,c){return a.apply(b,c)},
kI:function(a){var z=$.cb
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kH:function(a){return H.a3(a)},
kG:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jd:function(a){var z,y,x,w,v,u
z=$.cb.$1(a)
y=$.bj[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bo[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dF.$2(a,z)
if(z!=null){y=$.bj[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bo[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cg(x)
$.bj[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bo[z]=x
return x}if(v==="-"){u=H.cg(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dQ(a,x)
if(v==="*")throw H.d(new P.bX(z))
if(init.leafTags[z]===true){u=H.cg(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dQ(a,x)},
dQ:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bq(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cg:function(a){return J.bq(a,!1,null,!!a.$isb_)},
je:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bq(z,!1,null,!!z.$isb_)
else return J.bq(z,c,null,null)},
j4:function(){if(!0===$.cc)return
$.cc=!0
H.j5()},
j5:function(){var z,y,x,w,v,u,t,s
$.bj=Object.create(null)
$.bo=Object.create(null)
H.j0()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dS.$1(v)
if(u!=null){t=H.je(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
j0:function(){var z,y,x,w,v,u,t
z=C.u()
z=H.ai(C.q,H.ai(C.w,H.ai(C.j,H.ai(C.j,H.ai(C.v,H.ai(C.r,H.ai(C.t(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cb=new H.j1(v)
$.dF=new H.j2(u)
$.dS=new H.j3(t)},
ai:function(a,b){return a(b)||b},
ji:function(a,b,c){return a.indexOf(b,c)>=0},
eG:{
"^":"a;",
i:function(a){return P.bJ(this)},
q:function(a,b,c){return H.eH()}},
eZ:{
"^":"eG;a",
aZ:function(){var z=this.$map
if(z==null){z=new H.aG(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.dL(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.aZ().h(0,b)},
F:function(a,b){this.aZ().F(0,b)},
gj:function(a){var z=this.aZ()
return z.gj(z)}},
fD:{
"^":"a;a,b,c,d,e,f,r,x",
static:{fE:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fD(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hw:{
"^":"a;a,b,c,d,e,f",
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
static:{S:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hw(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bc:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},di:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cU:{
"^":"z;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
fn:{
"^":"z;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bE:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fn(a,y,z?null:b.receiver)}}},
hx:{
"^":"z;a",
i:function(a){var z=this.a
return C.e.gL(z)?"Error":"Error: "+z}},
jl:{
"^":"e:2;a",
$1:function(a){if(!!J.m(a).$isz)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dw:{
"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
j7:{
"^":"e:0;a",
$0:function(){return this.a.$0()}},
j8:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
j9:{
"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ja:{
"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jb:{
"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{
"^":"a;",
i:function(a){return"Closure '"+H.bO(this)+"'"},
gcJ:function(){return this},
gcJ:function(){return this}},
d5:{
"^":"e;"},
fR:{
"^":"d5;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bx:{
"^":"d5;a,b,c,d",
n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bx))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gu:function(a){var z,y
z=this.c
if(z==null)y=H.a3(this.a)
else y=typeof z!=="object"?J.G(z):H.a3(z)
z=H.a3(this.b)
if(typeof y!=="number")return y.f6()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.b5(z)},
static:{by:function(a){return a.a},cu:function(a){return a.c},ez:function(){var z=$.al
if(z==null){z=H.aU("self")
$.al=z}return z},aU:function(a){var z,y,x,w,v
z=new H.bx("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eA:{
"^":"z;a",
i:function(a){return this.a},
static:{eB:function(a,b){return new H.eA("CastError: Casting value of type "+H.b(a)+" to incompatible type "+H.b(b))}}},
fG:{
"^":"z;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
d0:{
"^":"a;"},
fH:{
"^":"d0;a,b,c,d",
Z:function(a){var z=this.dv(a)
return z==null?!1:H.dN(z,this.ab())},
dv:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
ab:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$iskq)z.void=true
else if(!x.$iscD)z.ret=y.ab()
y=this.b
if(y!=null&&y.length!==0)z.args=H.d_(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.d_(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.dK(y)
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
t=H.dK(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].ab())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{d_:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ab())
return z}}},
cD:{
"^":"d0;",
i:function(a){return"dynamic"},
ab:function(){return}},
bB:{
"^":"a;a,J:b<"},
iM:{
"^":"e:5;a",
$2:function(a,b){H.dE(this.a,1).$1(new H.bB(a,b))}},
iK:{
"^":"e:2;a,b",
$1:function(a){this.b(this.a,a)}},
aG:{
"^":"a;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gL:function(a){return this.a===0},
gci:function(){return H.c(new H.fp(this),[H.u(this,0)])},
gcI:function(a){return H.b3(this.gci(),new H.fm(this),H.u(this,0),H.u(this,1))},
T:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bG(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.bG(y,a)}else return this.eC(a)},
eC:function(a){var z=this.d
if(z==null)return!1
return this.am(this.R(z,this.al(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.R(z,b)
return y==null?null:y.ga0()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.R(x,b)
return y==null?null:y.ga0()}else return this.eD(b)},
eD:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.R(z,this.al(a))
x=this.am(y,a)
if(x<0)return
return y[x].ga0()},
q:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.b1()
this.b=z}this.bz(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.b1()
this.c=y}this.bz(y,b,c)}else this.eF(b,c)},
eF:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.b1()
this.d=z}y=this.al(a)
x=this.R(z,y)
if(x==null)this.b3(z,y,[this.b2(a,b)])
else{w=this.am(x,a)
if(w>=0)x[w].sa0(b)
else x.push(this.b2(a,b))}},
Y:function(a,b){if(typeof b==="string")return this.bV(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bV(this.c,b)
else return this.eE(b)},
eE:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.R(z,this.al(a))
x=this.am(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.c1(w)
return w.ga0()},
S:function(a){if(this.a>0){this.f=null
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
if(y!==this.r)throw H.d(new P.H(this))
z=z.c}},
bz:function(a,b,c){var z=this.R(a,b)
if(z==null)this.b3(a,b,this.b2(b,c))
else z.sa0(c)},
bV:function(a,b){var z
if(a==null)return
z=this.R(a,b)
if(z==null)return
this.c1(z)
this.bH(a,b)
return z.ga0()},
b2:function(a,b){var z,y
z=new H.fo(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c1:function(a){var z,y
z=a.gdL()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
al:function(a){return J.G(a)&0x3ffffff},
am:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.U(a[y].gce(),b))return y
return-1},
i:function(a){return P.bJ(this)},
R:function(a,b){return a[b]},
b3:function(a,b,c){a[b]=c},
bH:function(a,b){delete a[b]},
bG:function(a,b){return this.R(a,b)!=null},
b1:function(){var z=Object.create(null)
this.b3(z,"<non-identifier-key>",z)
this.bH(z,"<non-identifier-key>")
return z},
$isf7:1},
fm:{
"^":"e:2;a",
$1:function(a){return this.a.h(0,a)}},
fo:{
"^":"a;ce:a<,a0:b@,c,dL:d<"},
fp:{
"^":"O;a",
gj:function(a){return this.a.a},
gG:function(a){var z,y
z=this.a
y=new H.fq(z,z.r,null,null)
y.c=z.e
return y},
F:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.H(z))
y=y.c}},
$isq:1},
fq:{
"^":"a;a,b,c,d",
gB:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.H(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
j1:{
"^":"e:2;a",
$1:function(a){return this.a(a)}},
j2:{
"^":"e:10;a",
$2:function(a,b){return this.a(a,b)}},
j3:{
"^":"e:6;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bD:function(){return new P.ap("No element")},
fg:function(){return new P.ap("Too few elements")},
h1:function(a){return a.gfb()},
b2:{
"^":"O;",
gG:function(a){return new H.cN(this,this.gj(this),0,null)},
F:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.W(0,y))
if(z!==this.gj(this))throw H.d(new P.H(this))}},
a9:function(a,b){return H.c(new H.bI(this,b),[null,null])},
br:function(a,b){var z,y,x
if(b){z=H.c([],[H.L(this,"b2",0)])
C.b.sj(z,this.gj(this))}else z=H.c(Array(this.gj(this)),[H.L(this,"b2",0)])
for(y=0;y<this.gj(this);++y){x=this.W(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
bq:function(a){return this.br(a,!0)},
$isq:1},
cN:{
"^":"a;a,b,c,d",
gB:function(){return this.d},
v:function(){var z,y,x,w
z=this.a
y=J.B(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.H(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.W(z,w);++this.c
return!0}},
cO:{
"^":"O;a,b",
gG:function(a){var z=new H.fu(null,J.aQ(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.ay(this.a)},
$asO:function(a,b){return[b]},
static:{b3:function(a,b,c,d){if(!!J.m(a).$isq)return H.c(new H.cE(a,b),[c,d])
return H.c(new H.cO(a,b),[c,d])}}},
cE:{
"^":"cO;a,b",
$isq:1},
fu:{
"^":"fh;a,b,c",
v:function(){var z=this.b
if(z.v()){this.a=this.aY(z.gB())
return!0}this.a=null
return!1},
gB:function(){return this.a},
aY:function(a){return this.c.$1(a)}},
bI:{
"^":"b2;a,b",
gj:function(a){return J.ay(this.a)},
W:function(a,b){return this.aY(J.ed(this.a,b))},
aY:function(a){return this.b.$1(a)},
$asb2:function(a,b){return[b]},
$asO:function(a,b){return[b]},
$isq:1},
cG:{
"^":"a;"}}],["","",,H,{
"^":"",
dK:function(a){var z=H.c(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
hz:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iN()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.av(new P.hB(z),1)).observe(y,{childList:true})
return new P.hA(z,y,x)}else if(self.setImmediate!=null)return P.iO()
return P.iP()},
ks:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.av(new P.hC(a),0))},"$1","iN",2,0,4],
kt:[function(a){++init.globalState.f.b
self.setImmediate(H.av(new P.hD(a),0))},"$1","iO",2,0,4],
ku:[function(a){P.bQ(C.h,a)},"$1","iP",2,0,4],
dz:function(a,b){var z=H.aM()
z=H.aj(z,[z,z]).Z(a)
if(z){b.toString
return a}else{b.toString
return a}},
eX:function(a,b,c){var z=new P.C(0,$.l,null)
z.$builtinTypeInfo=[c]
P.d7(a,new P.eY(b,z))
return z},
a1:function(a){return H.c(new P.c_(H.c(new P.C(0,$.l,null),[a])),[a])},
iC:function(a,b,c){$.l.toString
a.K(b,c)},
iF:function(){var z,y
for(;z=$.ag,z!=null;){$.at=null
y=z.c
$.ag=y
if(y==null)$.as=null
$.l=z.b
z.e1()}},
kF:[function(){$.c6=!0
try{P.iF()}finally{$.l=C.d
$.at=null
$.c6=!1
if($.ag!=null)$.$get$c0().$1(P.dI())}},"$0","dI",0,0,1],
dD:function(a){if($.ag==null){$.as=a
$.ag=a
if(!$.c6)$.$get$c0().$1(P.dI())}else{$.as.c=a
$.as=a}},
dT:function(a){var z,y
z=$.l
if(C.d===z){P.ah(null,null,C.d,a)
return}z.toString
if(C.d.gbd()===z){P.ah(null,null,z,a)
return}y=$.l
P.ah(null,null,y,y.b5(a,!0))},
ki:function(a,b){var z,y,x
z=H.c(new P.dx(null,null,null,0),[b])
y=z.gdG()
x=z.gdI()
z.a=a.a1(y,!0,z.gdH(),x)
return z},
iI:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.F(u)
z=t
y=H.D(u)
$.l.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.V(x)
w=t
v=x.gJ()
c.$2(w,v)}}},
ix:function(a,b,c,d){var z=a.b8()
if(!!J.m(z).$isP)z.bt(new P.iA(b,c,d))
else b.K(c,d)},
iy:function(a,b){return new P.iz(a,b)},
d7:function(a,b){var z=$.l
if(z===C.d){z.toString
return P.bQ(a,b)}return P.bQ(a,z.b5(b,!0))},
bQ:function(a,b){var z=C.c.ag(a.a,1000)
return H.h4(z<0?0:z,b)},
bZ:function(a){var z=$.l
$.l=a
return z},
aL:function(a,b,c,d,e){var z,y,x
z=new P.dq(new P.iH(d,e),C.d,null)
y=$.ag
if(y==null){P.dD(z)
$.at=$.as}else{x=$.at
if(x==null){z.c=y
$.at=z
$.ag=z}else{z.c=x.c
x.c=z
$.at=z
if(z.c==null)$.as=z}}},
dA:function(a,b,c,d){var z,y
if($.l===c)return d.$0()
z=P.bZ(c)
try{y=d.$0()
return y}finally{$.l=z}},
dC:function(a,b,c,d,e){var z,y
if($.l===c)return d.$1(e)
z=P.bZ(c)
try{y=d.$1(e)
return y}finally{$.l=z}},
dB:function(a,b,c,d,e,f){var z,y
if($.l===c)return d.$2(e,f)
z=P.bZ(c)
try{y=d.$2(e,f)
return y}finally{$.l=z}},
ah:function(a,b,c,d){var z=C.d!==c
if(z){d=c.b5(d,!(!z||C.d.gbd()===c))
c=C.d}P.dD(new P.dq(d,c,null))},
hB:{
"^":"e:2;a",
$1:function(a){var z,y
H.bp()
z=this.a
y=z.a
z.a=null
y.$0()}},
hA:{
"^":"e:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hC:{
"^":"e:0;a",
$0:function(){H.bp()
this.a.$0()}},
hD:{
"^":"e:0;a",
$0:function(){H.bp()
this.a.$0()}},
ir:{
"^":"a0;a,b",
i:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{is:function(a,b){if(b!=null)return b
if(!!J.m(a).$isz)return a.gJ()
return}}},
P:{
"^":"a;"},
eY:{
"^":"e:0;a,b",
$0:function(){var z,y,x,w
try{this.b.a2(null)}catch(x){w=H.F(x)
z=w
y=H.D(x)
P.iC(this.b,z,y)}}},
hH:{
"^":"a;eu:a<",
ca:function(a,b){a=a!=null?a:new P.cV()
if(this.a.a!==0)throw H.d(new P.ap("Future already completed"))
$.l.toString
this.K(a,b)},
c9:function(a){return this.ca(a,null)}},
c_:{
"^":"hH;a",
az:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.ap("Future already completed"))
z.aQ(b)},
K:function(a,b){this.a.dq(a,b)}},
aq:{
"^":"a;bP:a<,eT:b>,c,d,e",
ga4:function(){return this.b.b},
gcd:function(){return(this.c&1)!==0},
geA:function(){return this.c===6},
gez:function(){return this.c===8},
gdK:function(){return this.d},
gdS:function(){return this.d}},
C:{
"^":"a;ay:a?,a4:b<,c",
gdD:function(){return this.a===8},
sdE:function(a){if(a)this.a=2
else this.a=0},
aF:function(a,b){var z,y
z=H.c(new P.C(0,$.l,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.dz(b,y)}this.aN(new P.aq(null,z,b==null?1:3,a,b))
return z},
cE:function(a){return this.aF(a,null)},
bt:function(a){var z,y
z=$.l
y=new P.C(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.aN(new P.aq(null,y,8,a,null))
return y},
b0:function(){if(this.a!==0)throw H.d(new P.ap("Future already completed"))
this.a=1},
gdR:function(){return this.c},
gae:function(){return this.c},
c0:function(a){this.a=4
this.c=a},
c_:function(a){this.a=8
this.c=a},
dP:function(a,b){this.c_(new P.a0(a,b))},
aN:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ah(null,null,z,new P.hR(this,a))}else{a.a=this.c
this.c=a}},
aw:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gbP()
z.a=y}return y},
a2:function(a){var z,y
z=J.m(a)
if(!!z.$isP)if(!!z.$isC)P.be(a,this)
else P.c3(a,this)
else{y=this.aw()
this.c0(a)
P.a8(this,y)}},
bF:function(a){var z=this.aw()
this.c0(a)
P.a8(this,z)},
K:[function(a,b){var z=this.aw()
this.c_(new P.a0(a,b))
P.a8(this,z)},function(a){return this.K(a,null)},"f7","$2","$1","gaU",2,2,12,0],
aQ:function(a){var z
if(a==null);else{z=J.m(a)
if(!!z.$isP){if(!!z.$isC){z=a.a
if(z>=4&&z===8){this.b0()
z=this.b
z.toString
P.ah(null,null,z,new P.hT(this,a))}else P.be(a,this)}else P.c3(a,this)
return}}this.b0()
z=this.b
z.toString
P.ah(null,null,z,new P.hU(this,a))},
dq:function(a,b){var z
this.b0()
z=this.b
z.toString
P.ah(null,null,z,new P.hS(this,a,b))},
$isP:1,
static:{c3:function(a,b){var z,y,x,w
b.say(2)
try{a.aF(new P.hV(b),new P.hW(b))}catch(x){w=H.F(x)
z=w
y=H.D(x)
P.dT(new P.hX(b,z,y))}},be:function(a,b){var z
b.a=2
z=new P.aq(null,b,0,null,null)
if(a.a>=4)P.a8(a,z)
else a.aN(z)},a8:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gdD()
if(b==null){if(w){v=z.a.gae()
y=z.a.ga4()
x=J.V(v)
u=v.gJ()
y.toString
P.aL(null,null,y,x,u)}return}for(;b.gbP()!=null;b=t){t=b.a
b.a=null
P.a8(z.a,b)}x.a=!0
s=w?null:z.a.gdR()
x.b=s
x.c=!1
y=!w
if(!y||b.gcd()||b.c===8){r=b.ga4()
if(w){u=z.a.ga4()
u.toString
if(u==null?r!=null:u!==r){u=u.gbd()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gae()
y=z.a.ga4()
x=J.V(v)
u=v.gJ()
y.toString
P.aL(null,null,y,x,u)
return}q=$.l
if(q==null?r!=null:q!==r)$.l=r
else q=null
if(y){if(b.gcd())x.a=new P.hZ(x,b,s,r).$0()}else new P.hY(z,x,b,r).$0()
if(b.gez())new P.i_(z,x,w,b,r).$0()
if(q!=null)$.l=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.m(y).$isP}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.C)if(p.a>=4){o.a=2
z.a=p
b=new P.aq(null,o,0,null,null)
y=p
continue}else P.be(p,o)
else P.c3(p,o)
return}}o=b.b
b=o.aw()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
hR:{
"^":"e:0;a,b",
$0:function(){P.a8(this.a,this.b)}},
hV:{
"^":"e:2;a",
$1:function(a){this.a.bF(a)}},
hW:{
"^":"e:7;a",
$2:function(a,b){this.a.K(a,b)},
$1:function(a){return this.$2(a,null)}},
hX:{
"^":"e:0;a,b,c",
$0:function(){this.a.K(this.b,this.c)}},
hT:{
"^":"e:0;a,b",
$0:function(){P.be(this.b,this.a)}},
hU:{
"^":"e:0;a,b",
$0:function(){this.a.bF(this.b)}},
hS:{
"^":"e:0;a,b,c",
$0:function(){this.a.K(this.b,this.c)}},
hZ:{
"^":"e:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.aE(this.b.gdK(),this.c)
return!0}catch(x){w=H.F(x)
z=w
y=H.D(x)
this.a.b=new P.a0(z,y)
return!1}}},
hY:{
"^":"e:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gae()
y=!0
r=this.c
if(r.geA()){x=r.d
try{y=this.d.aE(x,J.V(z))}catch(q){r=H.F(q)
w=r
v=H.D(q)
r=J.V(z)
p=w
o=(r==null?p==null:r===p)?z:new P.a0(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.aM()
p=H.aj(p,[p,p]).Z(r)
n=this.d
m=this.b
if(p)m.b=n.eV(u,J.V(z),z.gJ())
else m.b=n.aE(u,J.V(z))}catch(q){r=H.F(q)
t=r
s=H.D(q)
r=J.V(z)
p=t
o=(r==null?p==null:r===p)?z:new P.a0(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
i_:{
"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.cB(this.d.gdS())
z.a=w
v=w}catch(u){z=H.F(u)
y=z
x=H.D(u)
if(this.c){z=J.V(this.a.a.gae())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gae()
else v.b=new P.a0(y,x)
v.a=!1
return}if(!!J.m(v).$isP){t=this.d
s=t.geT(t)
s.sdE(!0)
this.b.c=!0
v.aF(new P.i0(this.a,s),new P.i1(z,s))}}},
i0:{
"^":"e:2;a,b",
$1:function(a){P.a8(this.a.a,new P.aq(null,this.b,0,null,null))}},
i1:{
"^":"e:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.C)){y=H.c(new P.C(0,$.l,null),[null])
z.a=y
y.dP(a,b)}P.a8(z.a,new P.aq(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dq:{
"^":"a;a,b,c",
e1:function(){return this.a.$0()}},
a6:{
"^":"a;",
a9:function(a,b){return H.c(new P.ie(b,this),[H.L(this,"a6",0),null])},
F:function(a,b){var z,y
z={}
y=H.c(new P.C(0,$.l,null),[null])
z.a=null
z.a=this.a1(new P.fV(z,this,b,y),!0,new P.fW(y),y.gaU())
return y},
gj:function(a){var z,y
z={}
y=H.c(new P.C(0,$.l,null),[P.k])
z.a=0
this.a1(new P.fX(z),!0,new P.fY(z,y),y.gaU())
return y},
bq:function(a){var z,y
z=H.c([],[H.L(this,"a6",0)])
y=H.c(new P.C(0,$.l,null),[[P.j,H.L(this,"a6",0)]])
this.a1(new P.fZ(this,z),!0,new P.h_(z,y),y.gaU())
return y}},
fV:{
"^":"e;a,b,c,d",
$1:function(a){P.iI(new P.fT(this.c,a),new P.fU(),P.iy(this.a.a,this.d))},
$signature:function(){return H.bi(function(a){return{func:1,args:[a]}},this.b,"a6")}},
fT:{
"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fU:{
"^":"e:2;",
$1:function(a){}},
fW:{
"^":"e:0;a",
$0:function(){this.a.a2(null)}},
fX:{
"^":"e:2;a",
$1:function(a){++this.a.a}},
fY:{
"^":"e:0;a,b",
$0:function(){this.b.a2(this.a.a)}},
fZ:{
"^":"e;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bi(function(a){return{func:1,args:[a]}},this.a,"a6")}},
h_:{
"^":"e:0;a,b",
$0:function(){this.b.a2(this.a)}},
fS:{
"^":"a;"},
ky:{
"^":"a;"},
hE:{
"^":"a;a4:d<,ay:e?",
bk:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.c5()
if((z&4)===0&&(this.e&32)===0)this.bM(this.gbR())},
ao:function(a){return this.bk(a,null)},
cA:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gL(z)}else z=!1
if(z)this.r.aJ(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bM(this.gbT())}}}},
b8:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.aR()
return this.f},
aR:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.c5()
if((this.e&32)===0)this.r=null
this.f=this.bQ()},
aP:["d8",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.bX(a)
else this.aO(new P.hK(a,null))}],
aM:["d9",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bZ(a,b)
else this.aO(new P.hM(a,b,null))}],
dn:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bY()
else this.aO(C.o)},
bS:[function(){},"$0","gbR",0,0,1],
bU:[function(){},"$0","gbT",0,0,1],
bQ:function(){return},
aO:function(a){var z,y
z=this.r
if(z==null){z=new P.iq(null,null,0)
this.r=z}z.a5(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aJ(this)}},
bX:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bp(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aS((z&4)!==0)},
bZ:function(a,b){var z,y
z=this.e
y=new P.hG(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.aR()
z=this.f
if(!!J.m(z).$isP)z.bt(y)
else y.$0()}else{y.$0()
this.aS((z&4)!==0)}},
bY:function(){var z,y
z=new P.hF(this)
this.aR()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isP)y.bt(z)
else z.$0()},
bM:function(a){var z=this.e
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
if(y)this.bS()
else this.bU()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.aJ(this)},
dj:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.dz(b,z)
this.c=c}},
hG:{
"^":"e:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aM()
x=H.aj(x,[x,x]).Z(y)
w=z.d
v=this.b
u=z.b
if(x)w.eW(u,v,this.c)
else w.bp(u,v)
z.e=(z.e&4294967263)>>>0}},
hF:{
"^":"e:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cC(z.c)
z.e=(z.e&4294967263)>>>0}},
ds:{
"^":"a;aD:a@"},
hK:{
"^":"ds;b,a",
bl:function(a){a.bX(this.b)}},
hM:{
"^":"ds;aj:b>,J:c<,a",
bl:function(a){a.bZ(this.b,this.c)}},
hL:{
"^":"a;",
bl:function(a){a.bY()},
gaD:function(){return},
saD:function(a){throw H.d(new P.ap("No events after a done."))}},
ih:{
"^":"a;ay:a?",
aJ:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dT(new P.ii(this,a))
this.a=1},
c5:function(){if(this.a===1)this.a=3}},
ii:{
"^":"e:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.ew(this.b)}},
iq:{
"^":"ih;b,c,a",
gL:function(a){return this.c==null},
a5:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saD(b)
this.c=b}},
ew:function(a){var z,y
z=this.b
y=z.gaD()
this.b=y
if(y==null)this.c=null
z.bl(a)}},
dx:{
"^":"a;a,b,c,ay:d?",
bB:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
fc:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.a2(!0)
return}this.a.ao(0)
this.c=a
this.d=3},"$1","gdG",2,0,function(){return H.bi(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"dx")}],
dJ:[function(a,b){var z
if(this.d===2){z=this.c
this.bB(0)
z.K(a,b)
return}this.a.ao(0)
this.c=new P.a0(a,b)
this.d=4},function(a){return this.dJ(a,null)},"fe","$2","$1","gdI",2,2,14,0],
fd:[function(){if(this.d===2){var z=this.c
this.bB(0)
z.a2(!1)
return}this.a.ao(0)
this.c=null
this.d=5},"$0","gdH",0,0,1]},
iA:{
"^":"e:0;a,b,c",
$0:function(){return this.a.K(this.b,this.c)}},
iz:{
"^":"e:5;a,b",
$2:function(a,b){return P.ix(this.a,this.b,a,b)}},
c2:{
"^":"a6;",
a1:function(a,b,c,d){return this.du(a,d,c,!0===b)},
cj:function(a,b,c){return this.a1(a,null,b,c)},
du:function(a,b,c,d){return P.hQ(this,a,b,c,d,H.L(this,"c2",0),H.L(this,"c2",1))},
bN:function(a,b){b.aP(a)},
$asa6:function(a,b){return[b]}},
dt:{
"^":"hE;x,y,a,b,c,d,e,f,r",
aP:function(a){if((this.e&2)!==0)return
this.d8(a)},
aM:function(a,b){if((this.e&2)!==0)return
this.d9(a,b)},
bS:[function(){var z=this.y
if(z==null)return
z.ao(0)},"$0","gbR",0,0,1],
bU:[function(){var z=this.y
if(z==null)return
z.cA()},"$0","gbT",0,0,1],
bQ:function(){var z=this.y
if(z!=null){this.y=null
z.b8()}return},
f8:[function(a){this.x.bN(a,this)},"$1","gdz",2,0,function(){return H.bi(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dt")}],
fa:[function(a,b){this.aM(a,b)},"$2","gdB",4,0,15],
f9:[function(){this.dn()},"$0","gdA",0,0,1],
dk:function(a,b,c,d,e,f,g){var z,y
z=this.gdz()
y=this.gdB()
this.y=this.x.a.cj(z,this.gdA(),y)},
static:{hQ:function(a,b,c,d,e,f,g){var z=$.l
z=H.c(new P.dt(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.dj(b,c,d,e)
z.dk(a,b,c,d,e,f,g)
return z}}},
ie:{
"^":"c2;b,a",
bN:function(a,b){var z,y,x,w,v
z=null
try{z=this.dQ(a)}catch(w){v=H.F(w)
y=v
x=H.D(w)
$.l.toString
b.aM(y,x)
return}b.aP(z)},
dQ:function(a){return this.b.$1(a)}},
a0:{
"^":"a;aj:a>,J:b<",
i:function(a){return H.b(this.a)},
$isz:1},
iw:{
"^":"a;"},
iH:{
"^":"e:0;a,b",
$0:function(){var z=this.a
throw H.d(new P.ir(z,P.is(z,this.b)))}},
ik:{
"^":"iw;",
gbd:function(){return this},
cC:function(a){var z,y,x,w
try{if(C.d===$.l){x=a.$0()
return x}x=P.dA(null,null,this,a)
return x}catch(w){x=H.F(w)
z=x
y=H.D(w)
return P.aL(null,null,this,z,y)}},
bp:function(a,b){var z,y,x,w
try{if(C.d===$.l){x=a.$1(b)
return x}x=P.dC(null,null,this,a,b)
return x}catch(w){x=H.F(w)
z=x
y=H.D(w)
return P.aL(null,null,this,z,y)}},
eW:function(a,b,c){var z,y,x,w
try{if(C.d===$.l){x=a.$2(b,c)
return x}x=P.dB(null,null,this,a,b,c)
return x}catch(w){x=H.F(w)
z=x
y=H.D(w)
return P.aL(null,null,this,z,y)}},
b5:function(a,b){if(b)return new P.il(this,a)
else return new P.im(this,a)},
dY:function(a,b){if(b)return new P.io(this,a)
else return new P.ip(this,a)},
h:function(a,b){return},
cB:function(a){if($.l===C.d)return a.$0()
return P.dA(null,null,this,a)},
aE:function(a,b){if($.l===C.d)return a.$1(b)
return P.dC(null,null,this,a,b)},
eV:function(a,b,c){if($.l===C.d)return a.$2(b,c)
return P.dB(null,null,this,a,b,c)}},
il:{
"^":"e:0;a,b",
$0:function(){return this.a.cC(this.b)}},
im:{
"^":"e:0;a,b",
$0:function(){return this.a.cB(this.b)}},
io:{
"^":"e:2;a,b",
$1:function(a){return this.a.bp(this.b,a)}},
ip:{
"^":"e:2;a,b",
$1:function(a){return this.a.aE(this.b,a)}}}],["","",,P,{
"^":"",
an:function(){return H.c(new H.aG(0,null,null,null,null,null,0),[null,null])},
ae:function(a){return H.dL(a,H.c(new H.aG(0,null,null,null,null,null,0),[null,null]))},
ff:function(a,b,c){var z,y
if(P.c7(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$au()
y.push(a)
try{P.iE(a,z)}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=P.d3(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aX:function(a,b,c){var z,y,x
if(P.c7(a))return b+"..."+c
z=new P.ba(b)
y=$.$get$au()
y.push(a)
try{x=z
x.a=P.d3(x.ga3(),a,", ")}finally{if(0>=y.length)return H.h(y,0)
y.pop()}y=z
y.a=y.ga3()+c
y=z.ga3()
return y.charCodeAt(0)==0?y:y},
c7:function(a){var z,y
for(z=0;y=$.$get$au(),z<y.length;++z)if(a===y[z])return!0
return!1},
iE:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gG(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.b(z.gB())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.h(b,0)
v=b.pop()
if(0>=b.length)return H.h(b,0)
u=b.pop()}else{t=z.gB();++x
if(!z.v()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.h(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gB();++x
for(;z.v();t=s,s=r){r=z.gB();++x
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
b1:function(a,b,c,d,e){return H.c(new H.aG(0,null,null,null,null,null,0),[d,e])},
ad:function(a,b){return P.i9(a,b)},
ao:function(a,b,c,d){return H.c(new P.i6(0,null,null,null,null,null,0),[d])},
bJ:function(a){var z,y,x
z={}
if(P.c7(a))return"{...}"
y=new P.ba("")
try{$.$get$au().push(a)
x=y
x.a=x.ga3()+"{"
z.a=!0
J.ee(a,new P.fv(z,y))
z=y
z.a=z.ga3()+"}"}finally{z=$.$get$au()
if(0>=z.length)return H.h(z,0)
z.pop()}z=y.ga3()
return z.charCodeAt(0)==0?z:z},
i8:{
"^":"aG;a,b,c,d,e,f,r",
al:function(a){return H.jf(a)&0x3ffffff},
am:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gce()
if(x==null?b==null:x===b)return y}return-1},
static:{i9:function(a,b){return H.c(new P.i8(0,null,null,null,null,null,0),[a,b])}}},
i6:{
"^":"i2;a,b,c,d,e,f,r",
gG:function(a){var z=new P.cM(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
e8:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.dt(b)},
dt:function(a){var z=this.d
if(z==null)return!1
return this.av(z[this.au(a)],a)>=0},
ck:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.e8(0,a)?a:null
else return this.dF(a)},
dF:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.au(a)]
x=this.av(y,a)
if(x<0)return
return J.bt(y,x).gbJ()},
F:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.H(this))
z=z.b}},
a5:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bC(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bC(x,b)}else return this.V(b)},
V:function(a){var z,y,x
z=this.d
if(z==null){z=P.i7()
this.d=z}y=this.au(a)
x=z[y]
if(x==null)z[y]=[this.aT(a)]
else{if(this.av(x,a)>=0)return!1
x.push(this.aT(a))}return!0},
Y:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bD(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bD(this.c,b)
else return this.dN(b)},
dN:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.au(a)]
x=this.av(y,a)
if(x<0)return!1
this.bE(y.splice(x,1)[0])
return!0},
S:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bC:function(a,b){if(a[b]!=null)return!1
a[b]=this.aT(b)
return!0},
bD:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.bE(z)
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
bE:function(a){var z,y
z=a.gds()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
au:function(a){return J.G(a)&0x3ffffff},
av:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.U(a[y].gbJ(),b))return y
return-1},
$isq:1,
static:{i7:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fr:{
"^":"a;bJ:a<,b,ds:c<"},
cM:{
"^":"a;a,b,c,d",
gB:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.H(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
i2:{
"^":"fI;"},
bF:{
"^":"a;",
gG:function(a){return new H.cN(a,this.gj(a),0,null)},
W:function(a,b){return this.h(a,b)},
F:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){if(y>=a.length)return H.h(a,y)
b.$1(a[y])
if(z!==a.length)throw H.d(new P.H(a))}},
a9:function(a,b){return H.c(new H.bI(a,b),[null,null])},
i:function(a){return P.aX(a,"[","]")},
$isj:1,
$asj:null,
$isq:1},
fv:{
"^":"e:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
fs:{
"^":"O;a,b,c,d",
gG:function(a){return new P.ia(this,this.c,this.d,this.b,null)},
F:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.h(x,y)
b.$1(x[y])
if(z!==this.d)H.y(new P.H(this))}},
gL:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
S:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aX(this,"{","}")},
cz:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.bD());++this.d
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
if(this.b===x)this.bL();++this.d},
bL:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.c(z,[H.u(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.bx(y,0,w,z,x)
C.b.bx(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dd:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.c(z,[b])},
$isq:1,
static:{bG:function(a,b){var z=H.c(new P.fs(null,0,0,0),[b])
z.dd(a,b)
return z}}},
ia:{
"^":"a;a,b,c,d,e",
gB:function(){return this.e},
v:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.y(new P.H(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fJ:{
"^":"a;",
a9:function(a,b){return H.c(new H.cE(this,b),[H.u(this,0),null])},
i:function(a){return P.aX(this,"{","}")},
F:function(a,b){var z
for(z=this.gG(this);z.v();)b.$1(z.d)},
$isq:1},
fI:{
"^":"fJ;"}}],["","",,P,{
"^":"",
bg:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.i5(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bg(a[z])
return a},
iG:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.d(H.Z(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.F(w)
y=x
throw H.d(new P.am(String(y),null,null))}return P.bg(z)},
i5:{
"^":"a;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.dM(b):y}},
gj:function(a){var z
if(this.b==null){z=this.c
z=z.gj(z)}else z=this.aV().length
return z},
q:function(a,b,c){var z,y
if(this.b==null)this.c.q(0,b,c)
else if(this.T(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.c3().q(0,b,c)},
T:function(a){if(this.b==null)return this.c.T(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
Y:function(a,b){if(this.b!=null&&!this.T(b))return
return this.c3().Y(0,b)},
F:function(a,b){var z,y,x,w
if(this.b==null)return this.c.F(0,b)
z=this.aV()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bg(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.d(new P.H(this))}},
i:function(a){return P.bJ(this)},
aV:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
c3:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.an()
y=this.aV()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.q(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.b.sj(y,0)
this.b=null
this.a=null
this.c=z
return z},
dM:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bg(this.a[a])
return this.b[a]=z}},
eI:{
"^":"a;"},
hy:{
"^":"eI;a",
bc:function(a,b,c){var z,y,x,w
z=a.length
P.b8(b,c,z,null,null,null)
y=new P.ba("")
x=this.a
w=new P.it(x,y,!0,0,0,0)
w.bc(a,b,z)
if(w.e>0){if(!x)H.y(new P.am("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.b6(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
eb:function(a){return this.bc(a,0,null)}},
it:{
"^":"a;a,b,c,d,e,f",
bc:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.iv(c)
v=new P.iu(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=a.length,r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
if(r>>>0!==r||r>=s)return H.h(a,r)
q=a[r]
if((q&192)!==128){if(t)throw H.d(new P.am("Bad UTF-8 encoding 0x"+C.c.aG(q,16),null,null))
this.c=!1
u.a+=H.b6(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.h(C.k,p)
if(z<=C.k[p]){if(t)throw H.d(new P.am("Overlong encoding of 0x"+C.c.aG(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.d(new P.am("Character outside valid Unicode range: 0x"+C.c.aG(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.b6(z)
this.c=!1}for(;r<c;r=n,z=65533,y=0,x=0){o=w.$2(a,r)
if(J.dW(o,0)){this.c=!1
if(typeof o!=="number")return H.E(o)
n=r+o
v.$2(r,n)
if(n===c)break
r=n}n=r+1
if(r>>>0!==r||r>=s)return H.h(a,r)
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
continue $loop$0}if(t)throw H.d(new P.am("Bad UTF-8 encoding 0x"+C.c.aG(q,16),null,null))
this.c=!1
u.a+=H.b6(65533)}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
iv:{
"^":"e:17;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=a.length,x=b;x<z;++x){if(x<0||x>=y)return H.h(a,x)
w=a[x]
if((w&127)!==w)return x-b}return z-b}},
iu:{
"^":"e:18;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.h0(this.b,a,b)}}}],["","",,P,{
"^":"",
iJ:function(a){return H.h1(a)},
bA:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.az(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eT(a)},
eT:function(a){var z=J.m(a)
if(!!z.$ise)return z.i(a)
return H.b5(a)},
aW:function(a){return new P.hP(a)},
bH:function(a,b,c){var z,y
z=H.c([],[c])
for(y=J.aQ(a);y.v();)z.push(y.gB())
if(b)return z
z.fixed$length=Array
return z},
aO:function(a){var z=H.b(a)
H.dR(z)},
h0:function(a,b,c){return H.fA(a,b,P.b8(b,c,a.length,null,null,null))},
k8:{
"^":"e:19;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.iJ(a)}},
c8:{
"^":"a;"},
"+bool":0,
bz:{
"^":"a;a,b",
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.bz))return!1
return this.a===b.a&&this.b===b.b},
gu:function(a){return this.a},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.eN(z?H.I(this).getUTCFullYear()+0:H.I(this).getFullYear()+0)
x=P.aB(z?H.I(this).getUTCMonth()+1:H.I(this).getMonth()+1)
w=P.aB(z?H.I(this).getUTCDate()+0:H.I(this).getDate()+0)
v=P.aB(z?H.I(this).getUTCHours()+0:H.I(this).getHours()+0)
u=P.aB(z?H.I(this).getUTCMinutes()+0:H.I(this).getMinutes()+0)
t=P.aB(z?H.I(this).getUTCSeconds()+0:H.I(this).getSeconds()+0)
s=P.eO(H.cW(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
dc:function(a,b){if(Math.abs(a)>864e13)throw H.d(P.aA(a))},
static:{eM:function(a,b){var z=new P.bz(a,b)
z.dc(a,b)
return z},eN:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},eO:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aB:function(a){if(a>=10)return""+a
return"0"+a}}},
bs:{
"^":"aN;"},
"+double":0,
aC:{
"^":"a;a",
m:function(a,b){return new P.aC(C.c.m(this.a,b.gbI()))},
aI:function(a,b){return C.c.aI(this.a,b.gbI())},
as:function(a,b){return C.c.as(this.a,b.gbI())},
n:function(a,b){if(b==null)return!1
if(!(b instanceof P.aC))return!1
return this.a===b.a},
gu:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.eS()
y=this.a
if(y<0)return"-"+new P.aC(-y).i(0)
x=z.$1(C.c.bm(C.c.ag(y,6e7),60))
w=z.$1(C.c.bm(C.c.ag(y,1e6),60))
v=new P.eR().$1(C.c.bm(y,1e6))
return""+C.c.ag(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
eR:{
"^":"e:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eS:{
"^":"e:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
z:{
"^":"a;",
gJ:function(){return H.D(this.$thrownJsError)}},
cV:{
"^":"z;",
i:function(a){return"Throw of null."}},
aa:{
"^":"z;a,b,c,d",
gaX:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaW:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaX()+y+x
if(!this.a)return w
v=this.gaW()
u=P.bA(this.b)
return w+v+": "+H.b(u)},
static:{aA:function(a){return new P.aa(!1,null,null,a)},ex:function(a,b,c){return new P.aa(!0,a,b,c)}}},
cZ:{
"^":"aa;e,f,a,b,c,d",
gaX:function(){return"RangeError"},
gaW:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.as()
if(typeof z!=="number")return H.E(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{b7:function(a,b,c){return new P.cZ(null,null,!0,a,b,"Value not in range")},a4:function(a,b,c,d,e){return new P.cZ(b,c,!0,a,d,"Invalid value")},b8:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.a4(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.a4(b,a,c,"end",f))
return b}return c}}},
f3:{
"^":"aa;e,j:f>,a,b,c,d",
gaX:function(){return"RangeError"},
gaW:function(){P.bA(this.e)
var z=": index should be less than "+H.b(this.f)
return J.dX(this.b,0)?": index must not be negative":z},
static:{bC:function(a,b,c,d,e){var z=e!=null?e:J.ay(b)
return new P.f3(b,z,!0,a,c,"Index out of range")}}},
K:{
"^":"z;a",
i:function(a){return"Unsupported operation: "+this.a}},
bX:{
"^":"z;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
ap:{
"^":"z;a",
i:function(a){return"Bad state: "+this.a}},
H:{
"^":"z;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bA(z))+"."}},
fy:{
"^":"a;",
i:function(a){return"Out of Memory"},
gJ:function(){return},
$isz:1},
d2:{
"^":"a;",
i:function(a){return"Stack Overflow"},
gJ:function(){return},
$isz:1},
eL:{
"^":"z;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
hP:{
"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
am:{
"^":"a;a,b,H:c>",
i:function(a){var z=""!==this.a?"FormatException: "+this.a:"FormatException"
return z}},
eU:{
"^":"a;a",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.b4(b,"expando$values")
return z==null?null:H.b4(z,this.bK())},
q:function(a,b,c){var z=H.b4(b,"expando$values")
if(z==null){z=new P.a()
H.bP(b,"expando$values",z)}H.bP(z,this.bK(),c)},
bK:function(){var z,y
z=H.b4(this,"expando$key")
if(z==null){y=$.cF
$.cF=y+1
z="expando$key$"+y
H.bP(this,"expando$key",z)}return z}},
eW:{
"^":"a;"},
k:{
"^":"aN;"},
"+int":0,
O:{
"^":"a;",
a9:function(a,b){return H.b3(this,b,H.L(this,"O",0),null)},
F:function(a,b){var z
for(z=this.gG(this);z.v();)b.$1(z.gB())},
br:function(a,b){return P.bH(this,b,H.L(this,"O",0))},
bq:function(a){return this.br(a,!0)},
gj:function(a){var z,y
z=this.gG(this)
for(y=0;z.v();)++y
return y},
W:function(a,b){var z,y,x
if(b<0)H.y(P.a4(b,0,null,"index",null))
for(z=this.gG(this),y=0;z.v();){x=z.gB()
if(b===y)return x;++y}throw H.d(P.bC(b,this,"index",null,y))},
i:function(a){return P.ff(this,"(",")")}},
fh:{
"^":"a;"},
j:{
"^":"a;",
$asj:null,
$isq:1},
"+List":0,
ft:{
"^":"a;"},
k9:{
"^":"a;",
i:function(a){return"null"}},
"+Null":0,
aN:{
"^":"a;"},
"+num":0,
a:{
"^":";",
n:function(a,b){return this===b},
gu:function(a){return H.a3(this)},
i:function(a){return H.b5(this)}},
a5:{
"^":"a;"},
X:{
"^":"a;"},
"+String":0,
ba:{
"^":"a;a3:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{d3:function(a,b,c){var z=J.aQ(b)
if(!z.v())return a
if(c.length===0){do a+=H.b(z.gB())
while(z.v())}else{a+=H.b(z.gB())
for(;z.v();)a=a+c+H.b(z.gB())}return a}}},
d4:{
"^":"a;"}}],["","",,W,{
"^":"",
eK:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.x)},
a9:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
du:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dy:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hJ(a)
if(!!J.m(z).$isN)return z
return}else return a},
iD:function(a){if(!!J.m(a).$iscC)return a
return P.iU(a,!0)},
w:function(a){var z=$.l
if(z===C.d)return a
return z.dY(a,!0)},
A:{
"^":"aD;",
$isA:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
jo:{
"^":"A;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
jq:{
"^":"A;",
i:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
jr:{
"^":"A;",
gbg:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbh:function(a){return H.c(new W.r(a,"load",!1),[null])},
$isN:1,
$isf:1,
"%":"HTMLBodyElement"},
cv:{
"^":"A;k:height%,l:width%",
bu:function(a,b,c){return a.getContext(b,P.iR(c))},
cN:function(a,b,c,d,e,f,g){var z,y
z=P.ae(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bu(a,"webgl",z)
return y==null?this.bu(a,"experimental-webgl",z):y},
cM:function(a,b){return this.cN(a,!0,!0,!0,!0,!1,b)},
$iscv:1,
"%":"HTMLCanvasElement"},
jt:{
"^":"aH;j:length=",
$isf:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
ju:{
"^":"f4;j:length=",
bv:function(a,b){var z=this.dw(a,b)
return z!=null?z:""},
dw:function(a,b){if(W.eK(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.eP()+b)},
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
f4:{
"^":"f+eJ;"},
eJ:{
"^":"a;",
gk:function(a){return this.bv(a,"height")},
gl:function(a){return this.bv(a,"width")}},
cC:{
"^":"aH;",
$iscC:1,
"%":"Document|HTMLDocument|XMLDocument"},
jv:{
"^":"aH;",
$isf:1,
"%":"DocumentFragment|ShadowRoot"},
jw:{
"^":"f;",
i:function(a){return String(a)},
"%":"DOMException"},
eQ:{
"^":"f;b6:bottom=,k:height=,M:left=,bo:right=,ac:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gl(a))+" x "+H.b(this.gk(a))},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isW)return!1
y=a.left
x=z.gM(b)
if(y==null?x==null:y===x){y=a.top
x=z.gac(b)
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
return W.du(W.a9(W.a9(W.a9(W.a9(0,z),y),x),w))},
gbs:function(a){return H.c(new P.J(a.left,a.top),[null])},
$isW:1,
$asW:I.bk,
"%":";DOMRectReadOnly"},
aD:{
"^":"aH;",
gH:function(a){return P.fC(C.a.D(a.offsetLeft),C.a.D(a.offsetTop),C.a.D(a.offsetWidth),C.a.D(a.offsetHeight),null)},
i:function(a){return a.localName},
cL:function(a){return a.getBoundingClientRect()},
gbg:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbh:function(a){return H.c(new W.r(a,"load",!1),[null])},
gcl:function(a){return H.c(new W.r(a,"mousedown",!1),[null])},
gcm:function(a){return H.c(new W.r(a,"mouseenter",!1),[null])},
gcn:function(a){return H.c(new W.r(a,"mouseleave",!1),[null])},
gco:function(a){return H.c(new W.r(a,"mousemove",!1),[null])},
gcp:function(a){return H.c(new W.r(a,"mouseout",!1),[null])},
gcq:function(a){return H.c(new W.r(a,"mouseover",!1),[null])},
gcr:function(a){return H.c(new W.r(a,"mouseup",!1),[null])},
$isaD:1,
$isf:1,
$isN:1,
"%":";Element"},
jx:{
"^":"A;k:height%,U:src},l:width%",
"%":"HTMLEmbedElement"},
jy:{
"^":"aV;aj:error=",
"%":"ErrorEvent"},
aV:{
"^":"f;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
N:{
"^":"f;",
dm:function(a,b,c,d){return a.addEventListener(b,H.av(c,1),d)},
dO:function(a,b,c,d){return a.removeEventListener(b,H.av(c,1),d)},
$isN:1,
"%":"MediaStream;EventTarget"},
jR:{
"^":"A;j:length=",
"%":"HTMLFormElement"},
f0:{
"^":"f1;",
ff:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
eN:function(a,b,c){return a.open(b,c)},
aK:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
f1:{
"^":"N;",
"%":";XMLHttpRequestEventTarget"},
jS:{
"^":"A;k:height%,U:src},l:width%",
"%":"HTMLIFrameElement"},
cH:{
"^":"A;k:height%,U:src},l:width%",
az:function(a,b){return a.complete.$1(b)},
$iscH:1,
"%":"HTMLImageElement"},
jU:{
"^":"A;k:height%,U:src},l:width%",
$isaD:1,
$isf:1,
$isN:1,
"%":"HTMLInputElement"},
fw:{
"^":"A;aj:error=,U:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
bK:{
"^":"dn;",
gH:function(a){var z,y
if(!!a.offsetX)return H.c(new P.J(a.offsetX,a.offsetY),[null])
else{if(!J.m(W.dy(a.target)).$isaD)throw H.d(new P.K("offsetX is only supported on elements"))
z=W.dy(a.target)
y=H.c(new P.J(a.clientX,a.clientY),[null]).aL(0,J.en(J.eq(z)))
return H.c(new P.J(J.cr(y.a),J.cr(y.b)),[null])}},
$isbK:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
k7:{
"^":"f;",
$isf:1,
"%":"Navigator"},
aH:{
"^":"N;",
i:function(a){var z=a.nodeValue
return z==null?this.d5(a):z},
"%":"Attr;Node"},
ka:{
"^":"A;k:height%,l:width%",
"%":"HTMLObjectElement"},
aI:{
"^":"aV;",
$isaI:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
kd:{
"^":"A;U:src}",
"%":"HTMLScriptElement"},
kf:{
"^":"A;j:length=",
"%":"HTMLSelectElement"},
kg:{
"^":"A;U:src}",
"%":"HTMLSourceElement"},
kh:{
"^":"aV;aj:error=",
"%":"SpeechRecognitionError"},
bV:{
"^":"f;",
$isa:1,
"%":"Touch"},
bW:{
"^":"dn;e2:changedTouches=",
$isbW:1,
$isa:1,
"%":"TouchEvent"},
km:{
"^":"f6;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bC(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.d(new P.K("Cannot assign element of immutable List."))},
W:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
$isj:1,
$asj:function(){return[W.bV]},
$isq:1,
$isb_:1,
$isaY:1,
"%":"TouchList"},
f5:{
"^":"f+bF;",
$isj:1,
$asj:function(){return[W.bV]},
$isq:1},
f6:{
"^":"f5+f2;",
$isj:1,
$asj:function(){return[W.bV]},
$isq:1},
kn:{
"^":"A;U:src}",
"%":"HTMLTrackElement"},
dn:{
"^":"aV;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
dp:{
"^":"fw;k:height%,l:width%",
$isdp:1,
"%":"HTMLVideoElement"},
kr:{
"^":"N;",
$isf:1,
$isN:1,
"%":"DOMWindow|Window"},
kv:{
"^":"f;b6:bottom=,k:height=,M:left=,bo:right=,ac:top=,l:width=",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
n:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isW)return!1
y=a.left
x=z.gM(b)
if(y==null?x==null:y===x){y=a.top
x=z.gac(b)
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
return W.du(W.a9(W.a9(W.a9(W.a9(0,z),y),x),w))},
gbs:function(a){return H.c(new P.J(a.left,a.top),[null])},
$isW:1,
$asW:I.bk,
"%":"ClientRect"},
kw:{
"^":"aH;",
$isf:1,
"%":"DocumentType"},
kx:{
"^":"eQ;",
gk:function(a){return a.height},
gl:function(a){return a.width},
"%":"DOMRect"},
kA:{
"^":"A;",
$isN:1,
$isf:1,
"%":"HTMLFrameSetElement"},
c1:{
"^":"a6;a,b,c",
a1:function(a,b,c,d){var z=new W.v(0,this.a,this.b,W.w(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.A()
return z},
cj:function(a,b,c){return this.a1(a,null,b,c)}},
r:{
"^":"c1;a,b,c"},
v:{
"^":"fS;a,b,c,d,e",
b8:function(){if(this.b==null)return
this.c2()
this.b=null
this.d=null
return},
bk:function(a,b){if(this.b==null)return;++this.a
this.c2()},
ao:function(a){return this.bk(a,null)},
cA:function(){if(this.b==null||this.a<=0)return;--this.a
this.A()},
A:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.dY(x,this.c,z,this.e)}},
c2:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.dZ(x,this.c,z,this.e)}}},
f2:{
"^":"a;",
gG:function(a){return new W.eV(a,this.gj(a),-1,null)},
$isj:1,
$asj:null,
$isq:1},
eV:{
"^":"a;a,b,c,d",
v:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bt(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gB:function(){return this.d}},
hI:{
"^":"a;a",
$isN:1,
$isf:1,
static:{hJ:function(a){if(a===window)return a
else return new W.hI(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
jm:{
"^":"ac;",
$isf:1,
"%":"SVGAElement"},
jn:{
"^":"h2;",
$isf:1,
"%":"SVGAltGlyphElement"},
jp:{
"^":"o;",
$isf:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
jz:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEBlendElement"},
jA:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEColorMatrixElement"},
jB:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEComponentTransferElement"},
jC:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFECompositeElement"},
jD:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEConvolveMatrixElement"},
jE:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEDiffuseLightingElement"},
jF:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEDisplacementMapElement"},
jG:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEFloodElement"},
jH:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEGaussianBlurElement"},
jI:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEImageElement"},
jJ:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEMergeElement"},
jK:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEMorphologyElement"},
jL:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFEOffsetElement"},
jM:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFESpecularLightingElement"},
jN:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFETileElement"},
jO:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFETurbulenceElement"},
jP:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGFilterElement"},
jQ:{
"^":"ac;k:height=,l:width=",
"%":"SVGForeignObjectElement"},
f_:{
"^":"ac;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
ac:{
"^":"o;",
$isf:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
jT:{
"^":"ac;k:height=,l:width=",
$isf:1,
"%":"SVGImageElement"},
jX:{
"^":"o;",
$isf:1,
"%":"SVGMarkerElement"},
jY:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGMaskElement"},
kb:{
"^":"o;k:height=,l:width=",
$isf:1,
"%":"SVGPatternElement"},
kc:{
"^":"f_;k:height=,l:width=",
"%":"SVGRectElement"},
ke:{
"^":"o;",
$isf:1,
"%":"SVGScriptElement"},
o:{
"^":"aD;",
gbg:function(a){return H.c(new W.r(a,"error",!1),[null])},
gbh:function(a){return H.c(new W.r(a,"load",!1),[null])},
gcl:function(a){return H.c(new W.r(a,"mousedown",!1),[null])},
gcm:function(a){return H.c(new W.r(a,"mouseenter",!1),[null])},
gcn:function(a){return H.c(new W.r(a,"mouseleave",!1),[null])},
gco:function(a){return H.c(new W.r(a,"mousemove",!1),[null])},
gcp:function(a){return H.c(new W.r(a,"mouseout",!1),[null])},
gcq:function(a){return H.c(new W.r(a,"mouseover",!1),[null])},
gcr:function(a){return H.c(new W.r(a,"mouseup",!1),[null])},
$isN:1,
$isf:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
kj:{
"^":"ac;k:height=,l:width=",
$isf:1,
"%":"SVGSVGElement"},
kk:{
"^":"o;",
$isf:1,
"%":"SVGSymbolElement"},
d6:{
"^":"ac;",
"%":";SVGTextContentElement"},
kl:{
"^":"d6;",
$isf:1,
"%":"SVGTextPathElement"},
h2:{
"^":"d6;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
ko:{
"^":"ac;k:height=,l:width=",
$isf:1,
"%":"SVGUseElement"},
kp:{
"^":"o;",
$isf:1,
"%":"SVGViewElement"},
kz:{
"^":"o;",
$isf:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
kB:{
"^":"o;",
$isf:1,
"%":"SVGCursorElement"},
kC:{
"^":"o;",
$isf:1,
"%":"SVGFEDropShadowElement"},
kD:{
"^":"o;",
$isf:1,
"%":"SVGGlyphRefElement"},
kE:{
"^":"o;",
$isf:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
fF:{
"^":"f;",
dW:function(a,b,c){return a.bindBuffer(b,c)},
dX:function(a,b,c){return a.bindTexture(b,c)},
dZ:function(a,b){return a.blendEquation(b)},
e_:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
e0:function(a,b,c,d){return a.bufferData(b,c,d)},
e3:function(a,b){return a.clear(b)},
e4:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
e5:function(a,b){return a.clearDepth(b)},
e6:function(a,b){return a.clearStencil(b)},
e7:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
ec:function(a){return a.createBuffer()},
ed:function(a){return a.createProgram()},
ee:function(a,b){return a.createShader(b)},
ef:function(a){return a.createTexture()},
eg:function(a,b){return a.depthFunc(b)},
eh:function(a,b){return a.depthMask(b)},
eo:function(a,b){return a.disableVertexAttribArray(b)},
ep:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
eq:function(a,b){return a.enable(b)},
er:function(a,b){return a.enableVertexAttribArray(b)},
cK:function(a,b,c){return a.getAttribLocation(b,c)},
cP:function(a,b){return a.getParameter(b)},
cR:function(a,b,c){return a.getUniformLocation(b,c)},
d1:function(a,b,c,d){return a.stencilFunc(b,c,d)},
d2:function(a,b,c,d){return a.stencilOp(b,c,d)},
eY:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.iT(g))
return}z=J.m(g)
if(!!z.$iscH)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscv)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdp)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.d(P.aA("Incorrect number or type of arguments"))},
eX:function(a,b,c,d,e,f,g){return this.eY(a,b,c,d,e,f,g,null,null,null)},
eZ:function(a,b,c,d){return a.texParameteri(b,c,d)},
f2:function(a,b){return a.useProgram(b)},
f3:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
js:{
"^":"a;"}}],["","",,P,{
"^":"",
ar:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dv:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
i4:{
"^":"a;",
an:function(){return Math.random()}},
J:{
"^":"a;w:a>,C:b>",
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
return P.dv(P.ar(P.ar(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.i(b)
x=y.gw(b)
if(typeof z!=="number")return z.m()
x=C.a.m(z,x)
z=this.b
y=y.gC(b)
if(typeof z!=="number")return z.m()
y=new P.J(x,C.a.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aL:function(a,b){var z,y,x,w
z=this.a
y=J.ep(b)
if(typeof z!=="number")return z.aL()
if(typeof y!=="number")return H.E(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.aL()
if(typeof w!=="number")return H.E(w)
w=new P.J(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
ij:{
"^":"a;",
gbo:function(a){return this.gM(this)+this.c},
gb6:function(a){return this.gac(this)+this.d},
i:function(a){return"Rectangle ("+this.gM(this)+", "+this.b+") "+this.c+" x "+this.d},
n:function(a,b){var z,y
if(b==null)return!1
z=J.m(b)
if(!z.$isW)return!1
if(this.gM(this)===z.gM(b)){y=this.b
z=y===z.gac(b)&&this.a+this.c===z.gbo(b)&&y+this.d===z.gb6(b)}else z=!1
return z},
gu:function(a){var z=this.b
return P.dv(P.ar(P.ar(P.ar(P.ar(0,this.gM(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbs:function(a){var z=new P.J(this.gM(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
W:{
"^":"ij;M:a>,ac:b>,l:c>,k:d>",
$asW:null,
static:{fC:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.c(new P.W(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
n:function(a){return a},
bh:function(a){return a},
cP:{
"^":"f;",
dV:function(a,b,c){return new Uint8Array(a,b)},
dU:function(a){return this.dV(a,0,null)},
$iscP:1,
"%":"ArrayBuffer"},
bN:{
"^":"f;",
$isbN:1,
"%":"DataView;ArrayBufferView;bL|cQ|cS|bM|cR|cT|a2"},
bL:{
"^":"bN;",
gj:function(a){return a.length},
$isb_:1,
$isaY:1},
bM:{
"^":"cS;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
return a[b]},
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
a[b]=c}},
cQ:{
"^":"bL+bF;",
$isj:1,
$asj:function(){return[P.bs]},
$isq:1},
cS:{
"^":"cQ+cG;"},
a2:{
"^":"cT;",
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.k]},
$isq:1},
cR:{
"^":"bL+bF;",
$isj:1,
$asj:function(){return[P.k]},
$isq:1},
cT:{
"^":"cR+cG;"},
jZ:{
"^":"bM;",
$isj:1,
$asj:function(){return[P.bs]},
$isq:1,
"%":"Float32Array"},
k_:{
"^":"bM;",
$isj:1,
$asj:function(){return[P.bs]},
$isq:1,
"%":"Float64Array"},
k0:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isq:1,
"%":"Int16Array"},
k1:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isq:1,
"%":"Int32Array"},
k2:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isq:1,
"%":"Int8Array"},
k3:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isq:1,
"%":"Uint16Array"},
k4:{
"^":"a2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isq:1,
"%":"Uint32Array"},
k5:{
"^":"a2;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isq:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
k6:{
"^":"a2;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.x(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.k]},
$isq:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
dR:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
iR:function(a){var z={}
a.F(0,new P.iS(z))
return z},
iU:function(a,b){var z=[]
return new P.iX(b,new P.iV([],z),new P.iW(z),new P.iY(z)).$1(a)},
iT:function(a){return a},
cB:function(){var z=$.cA
if(z==null){z=J.bv(window.navigator.userAgent,"Opera",0)
$.cA=z}return z},
eP:function(){var z,y
z=$.cx
if(z!=null)return z
y=$.cy
if(y==null){y=J.bv(window.navigator.userAgent,"Firefox",0)
$.cy=y}if(y===!0)z="-moz-"
else{y=$.cz
if(y==null){y=P.cB()!==!0&&J.bv(window.navigator.userAgent,"Trident/",0)
$.cz=y}if(y===!0)z="-ms-"
else z=P.cB()===!0?"-o-":"-webkit-"}$.cx=z
return z},
iS:{
"^":"e:20;a",
$2:function(a,b){this.a[a]=b}},
iV:{
"^":"e:21;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
iW:{
"^":"e:22;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.h(z,a)
return z[a]}},
iY:{
"^":"e:23;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.h(z,a)
z[a]=b}},
iX:{
"^":"e:2;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.eM(a.getTime(),!0)
if(a instanceof RegExp)throw H.d(new P.bX("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.an()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.T)(w),++u){t=w[u]
x.q(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.B(a)
s=w.gj(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.E(s)
v=J.aw(x)
r=0
for(;r<s;++r)v.q(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
dO:[function(){var z=0,y=new P.a1(),x=1,w,v,u,t,s,r,q,p
function $async$dO(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=G
r=r
q=P
q=q.an()
p=P
v=new r.h9(700,500,q,p.an())
r=E
r=r
q=Float64Array
p=H
u=new r.Q(new q(p.n(16)))
r=u
r.P()
r=F
t=new r.hc(400,300,1,1,1,0,0,null,!0,"none",null,u,!1)
r=t
r.b=[]
r=t
q=F
r.ch=q.bb(255,238,238,255)
r=E
r=r
q=Float64Array
p=H
u=new r.Q(new q(p.n(16)))
r=u
r.P()
r=G
s=new r.hm(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
r=s
q=G
r.a=q.hi(400,600)
r=s
r.seU(t)
r=s
r.eM()
r=s
r.f1()
r=s
z=!r.d?2:3
break
case 2:r=s
r.d=!0
r=s
r.at()
case 3:r=t
r=r
q=L
r.ah(q.fL(v))
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$dO,y,null)},"$0","dP",0,0,0]},1],["","",,L,{
"^":"",
fK:{
"^":"bR;a,b,c,d",
ct:function(a,b,c,d,e,f,g){return!1},
de:function(a){var z,y,x,w,v
z=[]
y=F.bT(null)
x=new E.Q(new Float64Array(H.n(16)))
x.P()
w=new L.fO(C.f,null,null,z,y,"none",null,x,!1)
w.b=[]
this.ah(w)
for(v=0;v<500;++v){y=new L.d1(0,0,0,0,1,"S001.png",!0,0.4,C.f,new F.Y(0,0,0,0))
y.bn(0)
z.push(y)
y=new L.d1(0,0,0,0,1,"S002.png",!0,0.4,C.f,new F.Y(0,0,0,0))
y.bn(0)
z.push(y)}a.aB("assets/se_play.png").cE(new L.fM(w))
a.bf("assets/se_play.json").cE(new L.fN(w))},
static:{fL:function(a){var z=new E.Q(new Float64Array(H.n(16)))
z.P()
z=new L.fK("none",null,z,!1)
z.b=[]
z.de(a)
return z}}},
fM:{
"^":"e:24;a",
$1:function(a){this.a.f=a}},
fN:{
"^":"e:6;a",
$1:function(a){var z=new F.fP(a,[])
z.eP(a)
this.a.r=z}},
d1:{
"^":"a;a,b,c,d,e,f,r,x,y,z",
bn:function(a){var z,y
z=this.y
this.a=z.an()*400
this.b=-1*z.an()*100-100
this.c=z.an()-0.5
this.d=z.an()
y=this.x
if(this.r)this.e=y*(z.an()*0.75+0.25)
else this.e=y}},
fO:{
"^":"bR;e,f,r,x,y,a,b,c,d",
bi:function(a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(this.f!=null&&this.r!=null)for(z=this.x,y=z.length,x=a7.r,w=a7.x,v=a7.y,u=this.y,t=0;t<z.length;z.length===y||(0,H.T)(z),++t){s=z[t]
r=s.f
q=this.r.cc(r).e
p=s.z
p.a=s.a
p.b=s.b
o=q.a
n=s.e
p.c=o*n
p.d=q.b*n
n=this.f
r=this.r.cc(r).gd0()
o=a7.z
if(o!=null&&!J.U(o,n))a7.aA(0)
a7.z=n
o=r.a
n=n.gO()
if(typeof n!=="number")return H.E(n)
m=o/n
n=r.b
o=a7.z.ga7()
if(typeof o!=="number")return H.E(o)
l=n/o
o=r.a
n=r.c
k=a7.z.gO()
if(typeof k!=="number")return H.E(k)
j=(o+n)/k
k=r.b
r=r.d
n=a7.z.ga7()
if(typeof n!=="number")return H.E(n)
i=(k+r)/n
C.b.a6(v,[m,l,m,i,j,l,j,i])
h=a7.b7()
g=p.a
f=p.b
e=g+p.c
d=f+p.d
r=new Float64Array(3)
r[0]=g
r[1]=f
r[2]=0
c=h.p(0,new E.t(r))
r=new Float64Array(3)
r[0]=g
r[1]=d
r[2]=0
b=h.p(0,new E.t(r))
r=new Float64Array(3)
r[0]=e
r[1]=f
r[2]=0
a=h.p(0,new E.t(r))
r=new Float64Array(3)
r[0]=e
r[1]=d
r[2]=0
a0=h.p(0,new E.t(r))
a1=x.length/8|0
r=u.a.a
a2=(r>>>16&255)/255
a3=(r>>>8&255)/255
a4=(r>>>0&255)/255
a5=(r>>>24&255)/255
C.b.a6(x,[c.gw(c),c.gC(c),a7.Q,a2,a3,a4,a5,1,b.gw(b),b.gC(b),a7.Q,a2,a3,a4,a5,1,a.gw(a),a.gC(a),a7.Q,a2,a3,a4,a5,1,a0.gw(a0),a0.gC(a0),a7.Q,a2,a3,a4,a5,1])
a7.Q+=0.0001
r=a1+1
p=a1+2
C.b.a6(w,[a1,r,p,r,a1+3,p])
p=s.a+s.c
s.a=p
r=s.b
o=s.d
r+=o
s.b=r
s.d=o+0.001
o=q.a
n=s.e
o*=n
if(p+o<0||p-o>400||r-q.b*n>300)s.bn(0)}}}}],["","",,F,{
"^":"",
b0:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.T)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.ax(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
h7:{
"^":"a;"},
bR:{
"^":"a;",
ah:function(a){var z=0,y=new P.a1(),x=1,w,v=this,u,t,s,r
function $async$ah(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.c(new s.C(0,r.l,null),[null])
t=u
t.aQ(null)
z=2
return H.p(u,$async$ah,y)
case 2:t=v
t=t.b
t.push(a)
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$ah,y,null)},
cf:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.T)(z),++x)z[x].cf(a)},
cs:function(a,b){},
cF:function(a,b){var z,y,x
this.bb()
this.cs(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.T)(z),++x)z[x].cF(a,b)},
bi:function(a,b){},
bj:["d6",function(a,b){var z,y,x,w,v,u
this.bb()
this.bi(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.T)(z),++w){v=z[w]
u=v.c
x.push(C.b.ga8(x).p(0,u))
b.aH()
v.bj(a,b)
if(0>=x.length)return H.h(x,0)
x.pop()
b.aH()}}],
f0:["d7",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.bb()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.h(y,w)
v=y[w]
a.cw(v.c)
u=v.f0(a,b,c,d,e)
a.cv()
if(u)return!0}t=a.cO().ba(0)
t.eG()
y=new E.t(new Float64Array(H.n(3)))
y.E(d,e,0)
s=t.p(0,y)
return this.ct(a,b,c,s.gw(s),s.gC(s),d,e)}],
ct:function(a,b,c,d,e,f,g){return!1},
bb:function(){if(!this.d)this.d=!0}},
h8:{
"^":"a;",
aB:function(a){var z=0,y=new P.a1(),x,w=2,v,u=this,t,s,r,q
function $async$aB(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.T(a)?3:4
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
return H.p(q.aC(a),$async$aB,y)
case 5:s.q(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$aB,y,null)}},
Y:{
"^":"a;a,b,O:c<,a7:d<",
n:function(a,b){if(b==null)return!1
return b instanceof F.Y&&b.a===this.a&&b.b===this.b&&b.c===this.c&&b.d===this.d},
gu:function(a){return F.b0([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF,this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
i:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)+", w:"+H.b(this.c)+", h:"+H.b(this.d)}},
d9:{
"^":"a;a,b",
n:function(a,b){if(b==null)return!1
return b instanceof F.d9&&b.a===this.a&&b.b===this.b},
gu:function(a){return F.b0([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
i:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)}},
da:{
"^":"a;O:a<,a7:b<",
n:function(a,b){if(b==null)return!1
return b instanceof F.da&&b.a===this.a&&b.b===this.b},
gu:function(a){return F.b0([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
i:function(a){return"w:"+H.b(this.a)+", h:"+H.b(this.b)}},
he:{
"^":"a;a",
i:function(a){return C.y.h(0,this.a)}},
hd:{
"^":"a;a,b,c",
dh:function(a){if(this.a==null)this.a=F.bb(255,255,255,255)},
static:{bT:function(a){var z=new F.hd(a,C.l,1)
z.dh(a)
return z}}},
d8:{
"^":"a;a",
n:function(a,b){if(b==null)return!1
return b instanceof F.d8&&b.a===this.a},
gu:function(a){return F.b0([this.a&0x1FFFFFFF])},
i:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
dg:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{bb:function(a,b,c,d){var z=new F.d8(0)
z.dg(a,b,c,d)
return z}}},
bS:{
"^":"a;"},
hc:{
"^":"bR;O:e<,a7:f<,r,x,y,z,Q,ch,cx,a,b,c,d",
cs:function(a,b){var z,y,x,w
z=a.gO()
y=a.geO(a)
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
y=new E.Q(new Float64Array(H.n(16)))
y.P()
this.c=y
y.cG(0,this.z,this.Q,0)
y=this.c
x=this.y
y.bw(0,x,x,1)},
bj:function(a,b){var z,y
z=new F.Y(0,0,this.e,this.f)
y=this.cx
if(y){b.b.push(z)
b.b9(a,z)}this.d6(a,b)
if(y){y=b.b
if(0>=y.length)return H.h(y,0)
y.pop()
if(y.length>0)b.b9(a,C.b.ga8(y))
else{y=a.a
b.b9(a,new F.Y(0,0,y.c,y.d))}}},
bi:function(a,b){var z,y,x
z=this.e
y=this.f
x=F.bT(null)
x.a=this.ch
b.cb(a,new F.Y(0,0,z,y),x)}},
fP:{
"^":"a;a,b",
cc:function(a){var z,y,x,w
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.T)(z),++x){w=z[x]
if(J.U(w.a,a))return w}return},
eP:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.aQ(H.jj(J.bt(P.iG(a,null),"frames"),"$isj",[P.ft],"$asj")),y=this.b;z.v();){x=z.gB()
w=new F.fQ(null,null,null,null,null,null,null)
v=J.B(x)
w.a=v.h(x,"filename")
w.r=w.cu(v.h(x,"frame"))
w.b=v.h(x,"rotated")
w.c=v.h(x,"trimmed")
w.d=w.cu(v.h(x,"spriteSourceSize"))
u=v.h(x,"sourceSize")
t=J.B(u)
s=t.h(u,"w")
r=t.h(u,"h")
w.e=new F.da(J.a_(s),J.a_(r))
v=v.h(x,"pivot")
u=J.B(v)
q=u.h(v,"x")
p=u.h(v,"y")
w.f=new F.d9(J.a_(q),J.a_(p))
y.push(w)}}},
fQ:{
"^":"a;a,b,c,d,e,f,r",
gd0:function(){var z,y
z=this.b
y=this.r
if(z===!0)return new F.Y(y.a,y.b,y.d,y.c)
else return new F.Y(y.a,y.b,y.c,y.d)},
cu:function(a){var z,y,x,w,v
z=J.B(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.Y(J.a_(y),J.a_(x),J.a_(w),J.a_(v))}},
hf:{
"^":"a;",
seU:function(a){this.c$=a},
eI:function(a){if(!this.e$){this.c$.cf(this)
this.e$=!0}this.c$.cF(this,a)
this.eL()},
eJ:function(a,b){var z,y
z=this.c$.c
y=b.a
y.push(C.b.ga8(y).p(0,z))
b.aH()
this.c$.bj(a,b)
if(0>=y.length)return H.h(y,0)
y.pop()
b.aH()},
X:function(a,b,c,d,e){a.cw(this.c$.c)
this.c$.d7(a,b,c,d,e)
a.cv()},
cw:function(a){var z=this.f$
z.push(C.b.ga8(z).p(0,a))},
cv:function(){var z=this.f$
if(0>=z.length)return H.h(z,0)
z.pop()},
cO:function(){return C.b.ga8(this.f$)}}}],["","",,G,{
"^":"",
bU:function(a){var z=0,y=new P.a1(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$bU(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.c(new p.c_(o.c(new n.C(0,m.l,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.ev(t,a)
q=J
s=q.i(t)
q=s
r=q.gbh(t)
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
m=m.w(new l.hk(u,t))
l=r
p=new p.v(0,o,n,m,l.c)
o=H
q=q.c(p,[o.u(r,0)])
q.A()
q=s
s=q.gbg(t)
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
m=m.w(new l.hl(a,u))
l=s
p=new p.v(0,o,n,m,l.c)
o=H
q=q.c(p,[o.u(s,0)])
q.A()
q=u
x=q.a
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$bU,y,null)},
db:function(a,b,c){var z,y
z=J.e9(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.d(y+"\n")}return z},
hj:{
"^":"bS;a,b",
gO:function(){return J.eo(this.a)},
ga7:function(){return J.ef(this.a)},
cQ:function(a){var z
if(this.b==null){z=J.i(a).ef(a)
this.b=z
a.bindTexture(3553,z)
C.A.eX(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
hh:{
"^":"a;a,b,c,k:d>",
di:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.aa(b)
y=C.c.aa(a)
x=document.createElement("canvas",null)
J.ew(x,z)
J.eu(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.er(this.b,!0)},
static:{hi:function(a,b){var z=new G.hh(null,null,null,null)
z.di(a,b)
return z}}},
h9:{
"^":"h8;l:c>,k:d>,a,b",
aC:function(a){var z=0,y=new P.a1(),x,w=2,v,u,t
function $async$aC(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.p(t.bU(a),$async$aC,y)
case 3:x=new u.hj(c,null)
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$aC,y,null)},
bf:function(a){var z=0,y=new P.a1(),x,w=2,v,u,t,s,r,q,p,o,n,m
function $async$bf(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=H
p=p
o=P
o=o
n=$
u=r.c(new q.c_(p.c(new o.C(0,n.l,null),[null])),[null])
t=new XMLHttpRequest()
r=C
r=r.p
r.eN(t,"GET",a)
r=t
r.responseType="arraybuffer"
r=H
r=r
q=W
s=r.c(new q.c1(t,"load",!1),[null])
r=H
r=r
q=W
q=q
p=s
p=p.a
o=s
o=o.b
n=W
n=n
m=G
n=n.w(new m.ha(u,t))
m=s
q=new q.v(0,p,o,n,m.c)
p=H
r=r.c(q,[p.u(s,0)])
r.A()
r=H
r=r
q=W
s=r.c(new q.c1(t,"error",!1),[null])
r=H
r=r
q=W
q=q
p=s
p=p.a
o=s
o=o.b
n=W
n=n
m=G
n=n.w(new m.hb(u))
m=s
q=new q.v(0,p,o,n,m.c)
p=H
r=r.c(q,[p.u(s,0)])
r.A()
r=t
r.send()
r=u
x=r.a
z=1
break
case 1:return H.p(x,0,y,null)
case 2:return H.p(v,1,y)}}return H.p(null,$async$bf,y,null)}},
ha:{
"^":"e:25;a,b",
$1:function(a){var z=0,y=new P.a1(),x=1,w,v=this,u,t,s,r
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=J
t=t
s=W
s=s
r=v
r=r.b
u=t.e_(s.iD(r.response))
t=v
t=t.a
t=t
s=P
s=new s.hy(!0)
t.az(0,s.eb(u))
return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$$1,y,null)}},
hb:{
"^":"e:26;a",
$1:function(a){this.a.c9(a)}},
hg:{
"^":"h7;c,d,e,f,r,x,y,z,Q,ch,cx,a,b",
eB:function(){var z,y,x,w,v,u
P.aO("#[A]# "+H.b(J.co(this.c,35660)))
P.aO("#[B]# "+H.b(J.co(this.c,33901)))
z=C.b.cg(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.b.cg(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.c
w=G.db(x,35633,z)
v=G.db(x,35632,y)
u=J.e8(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.e=u},
S:function(a){this.f=1
this.Q=-0.5
J.cm(this.c,2960)
J.ea(this.c,515)
J.e4(this.c,0,0,0,1)
J.e5(this.c,1)
J.e6(this.c,0)
J.cm(this.c,3042)
switch(-1){case-1:J.e0(this.c,32774)
J.e1(this.c,770,771,770,32772)
break}J.e3(this.c,17664)
C.b.sj(this.r,0)
C.b.sj(this.x,0)
C.b.sj(this.y,0)
this.z=null},
aA:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
if(z.length!==0){y=this.x
F.bb(170,255,170,170)
J.cs(this.c,this.e)
x=J.aR(this.c,this.e,"a_tex")
w=J.bw(this.c)
J.bu(this.c,34962,w)
v=this.y
J.e2(this.c,34962,new Float32Array(H.bh(v)),35044)
J.aP(this.c,x)
J.aT(this.c,x,2,5126,!1,0,0)
u=this.z
if(u!=null){t=u.cQ(this.c)
J.cj(this.c,3553,t)
J.aS(this.c,3553,10242,33071)
J.aS(this.c,3553,10243,33071)
J.aS(this.c,3553,10241,9728)
J.aS(this.c,3553,10240,9728)}u=this.c
s=J.bw(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.bh(z)),35044)
u.bindBuffer(34962,null)
J.bu(this.c,34962,s)
u=this.c
s=J.bw(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.bh(y)),35044)
u.bindBuffer(34963,null)
J.bu(this.c,34963,s)
u=this.c
u.uniformMatrix4fv(J.es(u,this.e,"u_mat"),!1,new Float32Array(H.bh(this.ch.a)))
r=J.aR(this.c,this.e,"color")
q=J.aR(this.c,this.e,"vp")
p=J.aR(this.c,this.e,"useTex")
J.aT(this.c,q,3,5126,!1,32,0)
J.aT(this.c,r,4,5126,!1,32,12)
J.aT(this.c,p,1,5126,!1,32,28)
J.aP(this.c,q)
J.aP(this.c,r)
J.aP(this.c,p)
J.ec(this.c,4,y.length,5123,0)
if(x!==0){J.eb(this.c,x)
J.cj(this.c,3553,null)}J.cs(this.c,null)
C.b.sj(z,0)
C.b.sj(y,0)
C.b.sj(v,0)
this.z=null}},
cb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(c.b===C.l){z=this.b7()
y=b.a
x=b.b
w=y+b.c
v=x+b.d
u=new E.t(new Float64Array(H.n(3)))
u.E(y,x,0)
t=z.p(0,u)
u=new E.t(new Float64Array(H.n(3)))
u.E(y,v,0)
s=z.p(0,u)
u=new E.t(new Float64Array(H.n(3)))
u.E(w,x,0)
r=z.p(0,u)
u=new E.t(new Float64Array(H.n(3)))
u.E(w,v,0)
q=z.p(0,u)
u=c.a.a
this.af(a,t,s,r,q,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)}else{z=this.b7()
y=b.a
x=b.b
w=y+b.c
v=x+b.d
u=new E.t(new Float64Array(H.n(3)))
u.E(y,x,0)
t=z.p(0,u)
u=c.c
p=y-u
o=x-u
n=new E.t(new Float64Array(H.n(3)))
n.E(p,o,0)
m=z.p(0,n)
n=new E.t(new Float64Array(H.n(3)))
n.E(y,v,0)
s=z.p(0,n)
n=v+u
l=new E.t(new Float64Array(H.n(3)))
l.E(p,n,0)
k=z.p(0,l)
l=new E.t(new Float64Array(H.n(3)))
l.E(w,x,0)
r=z.p(0,l)
u=w+u
l=new E.t(new Float64Array(H.n(3)))
l.E(u,o,0)
j=z.p(0,l)
l=new E.t(new Float64Array(H.n(3)))
l.E(w,v,0)
q=z.p(0,l)
l=new E.t(new Float64Array(H.n(3)))
l.E(u,n,0)
i=z.p(0,l)
l=c.a.a
h=(l>>>16&255)/255
g=(l>>>8&255)/255
f=(l>>>0&255)/255
e=(l>>>24&255)/255
this.af(a,m,k,t,s,h,g,f,e)
this.af(a,k,i,s,q,h,g,f,e)
this.af(a,i,j,q,r,h,g,f,e)
this.af(a,j,m,r,t,h,g,f,e)}},
af:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.r
y=z.length/8|0
C.b.a6(z,[b.gw(b),b.gC(b),this.Q,f,g,h,i,-1,c.gw(c),c.gC(c),this.Q,f,g,h,i,-1,d.gw(d),d.gC(d),this.Q,f,g,h,i,-1,e.gw(e),e.gC(e),this.Q,f,g,h,i,-1])
C.b.a6(this.y,[0,0,0,0,0,0,0,0])
this.Q+=0.0001
z=y+1
x=y+2
C.b.a6(this.x,[y,z,x,z,y+3,x])},
b9:function(a,b){var z
this.aA(0)
J.ck(this.c,!1,!1,!1,!1)
J.cl(this.c,!1)
J.cq(this.c,7680,7681,7681)
J.cp(this.c,519,this.f,255)
z=F.bT(null)
z.a=F.bb(255,255,255,255)
this.cb(null,b,z)
this.aA(0)
J.ck(this.c,!0,!0,!0,!0)
J.cl(this.c,!0)
J.cq(this.c,7680,7680,7680)
J.cp(this.c,515,this.f,255);++this.f},
aH:function(){},
b7:function(){var z,y
this.cx.P()
z=this.cx.cG(0,-1,1,0)
this.cx=z
y=this.d
y=z.bw(0,2/y.c,-2/y.d,1)
this.cx=y
y=y.p(0,C.b.ga8(this.a))
this.cx=y
return y}},
hm:{
"^":"fx;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gO:function(){return this.a.c},
ga7:function(){return this.a.d},
geO:function(a){return 0},
eL:function(){this.r=!0},
at:function(){var z=0,y=new P.a1(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h
function $async$at(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:j=H
j=j
i=P
u=j.cW(new i.bz(Date.now(),!1))
j=v
t=j.a
j=E
j=j
i=Float64Array
h=H
s=new j.Q(new i(h.n(16)))
j=s
j.P()
j=E
j=j
i=Float64Array
h=H
r=new j.Q(new i(h.n(16)))
j=r
j.P()
j=E
j=j
i=Float64Array
h=H
q=new j.Q(new i(h.n(16)))
j=q
j.P()
j=G
p=new j.hg(null,null,null,1,[],[],[],null,0,s,r,[q],[])
j=p
i=t
j.c=i.a
j=p
j.d=t
j=p
j.eB()
j=p
j.S(0)
o=0,n=0
case 2:j=v
if(!j.d){z=4
break}j=P
j=j
i=P
z=5
return H.p(j.eX(new i.aC(15e3),null,null),$async$at,y)
case 5:m=Date.now()
j=v
j.b=m
l=m-u
j=v
j=j
i=C
i=i.c
j.eI(i.aa(u+l))
o+=l
if(l<0);else ;++n
j=v
j.r=!0
z=o>40?6:7
break
case 6:j=p
j.S(0)
j=v
j.eJ(v,p)
j=p
j.aA(0)
j=v
j.r=!1
case 7:z=n>40?8:9
break
case 8:j=C
j=j.c
k="###fps  "+j.da(o,n)
j=H
j.dR(k)
o=0
n=0
case 9:case 3:u=m
z=2
break
case 4:return H.p(null,0,y,null)
case 1:return H.p(w,1,y)}}return H.p(null,$async$at,y,null)},
f1:function(){var z,y,x,w
z=P.an()
y=new G.hv(this,z)
x=new G.hu(this,z)
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchcancel",!1),[null])
H.c(new W.v(0,w.a,w.b,W.w(x),w.c),[H.u(w,0)]).A()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchend",!1),[null])
H.c(new W.v(0,w.a,w.b,W.w(x),w.c),[H.u(w,0)]).A()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchenter",!1),[null])
H.c(new W.v(0,w.a,w.b,W.w(y),w.c),[H.u(w,0)]).A()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchleave",!1),[null])
H.c(new W.v(0,w.a,w.b,W.w(y),w.c),[H.u(w,0)]).A()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchmove",!1),[null])
H.c(new W.v(0,w.a,w.b,W.w(y),w.c),[H.u(w,0)]).A()
w=this.a.b
w.toString
w=H.c(new W.r(w,"touchstart",!1),[null])
H.c(new W.v(0,w.a,w.b,W.w(y),w.c),[H.u(w,0)]).A()},
eM:function(){var z,y
z={}
z.a=!1
y=J.eg(this.a.b)
H.c(new W.v(0,y.a,y.b,W.w(new G.hn(z,this)),y.c),[H.u(y,0)]).A()
y=J.em(this.a.b)
H.c(new W.v(0,y.a,y.b,W.w(new G.ho(z,this)),y.c),[H.u(y,0)]).A()
y=J.eh(this.a.b)
H.c(new W.v(0,y.a,y.b,W.w(new G.hp(z,this)),y.c),[H.u(y,0)]).A()
y=J.ei(this.a.b)
H.c(new W.v(0,y.a,y.b,W.w(new G.hq(z,this)),y.c),[H.u(y,0)]).A()
y=J.ej(this.a.b)
H.c(new W.v(0,y.a,y.b,W.w(new G.hr(z,this)),y.c),[H.u(y,0)]).A()
y=J.ek(this.a.b)
H.c(new W.v(0,y.a,y.b,W.w(new G.hs(z,this)),y.c),[H.u(y,0)]).A()
y=J.el(this.a.b)
H.c(new W.v(0,y.a,y.b,W.w(new G.ht(z,this)),y.c),[H.u(y,0)]).A()}},
fx:{
"^":"a+hf;"},
hv:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.cn(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.T)(y),++v){u=y[v]
t=C.a.D(u.pageX)
s=C.a.D(u.pageY)
new P.J(t,s).$builtinTypeInfo=[null]
r=t-C.a.D(z.a.b.offsetLeft)
t=C.a.D(u.pageX)
s=C.a.D(u.pageY)
new P.J(t,s).$builtinTypeInfo=[null]
q=s-C.a.D(z.a.b.offsetTop)
t=w.T(u.identifier)
s=u.identifier
if(t){if(typeof s!=="number")return s.m()
z.X(z,s+1,"pointermove",r,q)}else{w.q(0,s,u)
t=u.identifier
if(typeof t!=="number")return t.m()
z.X(z,t+1,"pointerdown",r,q)}}}},
hu:{
"^":"e:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
z.c=z.b
for(y=J.cn(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.T)(y),++v){u=y[v]
if(w.T(u.identifier)){t=C.a.D(u.pageX)
s=C.a.D(u.pageY)
new P.J(t,s).$builtinTypeInfo=[null]
s=C.a.D(z.a.b.offsetLeft)
r=C.a.D(u.pageX)
q=C.a.D(u.pageY)
new P.J(r,q).$builtinTypeInfo=[null]
r=C.a.D(z.a.b.offsetTop)
w.Y(0,u.identifier)
p=u.identifier
if(typeof p!=="number")return p.m()
z.X(z,p+1,"pointerup",t-s,q-r)}}}},
hn:{
"^":"e:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=J.i(a)
x=y.gH(a)
x=x.gw(x)
x.toString
y=y.gH(a)
y=y.gC(y)
y.toString
z.X(z,0,"pointerdown",x,y)}}},
ho:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gw(w)
w.toString
x=x.gH(a)
x=x.gC(x)
x.toString
z.X(z,0,"pointerup",w,x)
y.a=!1}}}},
hp:{
"^":"e:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
hq:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gw(w)
w.toString
x=x.gH(a)
x=x.gC(x)
x.toString
z.X(z,0,"pointercancel",w,x)
y.a=!1}}}},
hr:{
"^":"e:3;a,b",
$1:function(a){var z,y,x
z=this.b
if(z.c+500<z.b)if(this.a.a){y=J.i(a)
x=y.gH(a)
x=x.gw(x)
x.toString
y=y.gH(a)
y=y.gC(y)
y.toString
z.X(z,0,"pointermove",x,y)}}},
hs:{
"^":"e:3;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=J.i(a)
w=x.gH(a)
w=w.gw(w)
w.toString
x=x.gH(a)
x=x.gC(x)
x.toString
z.X(z,0,"pointercancel",w,x)
y.a=!1}}}},
ht:{
"^":"e:3;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
hk:{
"^":"e:2;a,b",
$1:function(a){this.a.az(0,this.b)}},
hl:{
"^":"e:2;a,b",
$1:function(a){this.b.c9("failed to load image "+this.a)}}}],["","",,E,{
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
i:function(a){return"[0] "+this.ar(0).i(0)+"\n[1] "+this.ar(1).i(0)+"\n[2] "+this.ar(2).i(0)+"\n[3] "+this.ar(3).i(0)+"\n"},
gen:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.h(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=16)return H.h(z,b)
z[b]=c},
ar:function(a){var z,y,x
z=new Float64Array(H.n(4))
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
return new E.a7(z)},
ba:function(a){var z=new E.Q(new Float64Array(H.n(16)))
z.ad(this)
return z},
p:function(a,b){var z,y,x
if(!!b.$isa7){z=new Float64Array(H.n(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.a7(z)}if(!!b.$ist){z=new Float64Array(H.n(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.t(z)}if(4===b.gen()){z=new Float64Array(H.n(16))
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
return new E.Q(z)}throw H.d(P.aA(b))},
m:function(a,b){var z,y
z=new Float64Array(H.n(16))
y=this.a
z[0]=C.a.m(y[0],b.gt().h(0,0))
z[1]=C.a.m(y[1],b.gt().h(0,1))
z[2]=C.a.m(y[2],b.gt().h(0,2))
z[3]=C.a.m(y[3],b.gt().h(0,3))
z[4]=C.a.m(y[4],b.gt().h(0,4))
z[5]=C.a.m(y[5],b.gt().h(0,5))
z[6]=C.a.m(y[6],b.gt().h(0,6))
z[7]=C.a.m(y[7],b.gt().h(0,7))
z[8]=C.a.m(y[8],b.gt().h(0,8))
z[9]=C.a.m(y[9],b.gt().h(0,9))
z[10]=C.a.m(y[10],b.gt().h(0,10))
z[11]=C.a.m(y[11],b.gt().h(0,11))
z[12]=C.a.m(y[12],b.gt().h(0,12))
z[13]=C.a.m(y[13],b.gt().h(0,13))
z[14]=C.a.m(y[14],b.gt().h(0,14))
z[15]=C.a.m(y[15],b.gt().h(0,15))
return new E.Q(z)},
cG:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.m(b)
y=!!z.$isa7
x=y?b.gO():1
if(!!z.$ist||y){w=z.gw(b)
v=z.gC(b)
u=z.gf4(b)}else{u=d
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
bw:function(a,b,c,d){var z,y,x,w,v,u
z=J.m(b)
y=!!z.$isa7
x=y?b.gO():1
if(!!z.$ist||y){w=z.gw(b)
v=z.gC(b)
u=z.gf4(b)}else{u=d
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
eG:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
E:function(a,b,c){var z=this.a
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
m:function(a,b){var z,y,x,w
z=this.a
y=C.a.m(z[0],b.gt().h(0,0))
x=C.a.m(z[1],b.gt().h(0,1))
z=C.a.m(z[2],b.gt().h(0,2))
w=new E.t(new Float64Array(H.n(3)))
w.E(y,x,z)
return w},
p:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.E(b)
x=z[1]
z=z[2]
w=new E.t(new Float64Array(H.n(3)))
w.E(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.h(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=3)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.dJ(y*y+x*x+z*z))},
ba:function(a){var z=new E.t(new Float64Array(H.n(3)))
z.ad(this)
return z},
gw:function(a){return this.a[0]},
gC:function(a){return this.a[1]}},
a7:{
"^":"a;a",
by:function(a,b,c,d){var z=this.a
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
m:function(a,b){var z,y,x,w,v
z=this.a
y=C.a.m(z[0],b.gt().h(0,0))
x=C.a.m(z[1],b.gt().h(0,1))
w=C.a.m(z[2],b.gt().h(0,2))
z=C.a.m(z[3],b.gt().h(0,3))
v=new E.a7(new Float64Array(H.n(4)))
v.by(y,x,w,z)
return v},
p:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.E(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.a7(new Float64Array(H.n(4)))
v.by(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.h(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>=4)return H.h(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.dJ(y*y+x*x+w*w+z*z))},
ba:function(a){var z=new E.a7(new Float64Array(H.n(4)))
z.ad(this)
return z},
gw:function(a){return this.a[0]},
gC:function(a){return this.a[1]},
gO:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cK.prototype
return J.fj.prototype}if(typeof a=="string")return J.aZ.prototype
if(a==null)return J.fk.prototype
if(typeof a=="boolean")return J.fi.prototype
if(a.constructor==Array)return J.aE.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bm(a)}
J.B=function(a){if(typeof a=="string")return J.aZ.prototype
if(a==null)return a
if(a.constructor==Array)return J.aE.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bm(a)}
J.aw=function(a){if(a==null)return a
if(a.constructor==Array)return J.aE.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bm(a)}
J.bl=function(a){if(typeof a=="number")return J.aF.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bY.prototype
return a}
J.iZ=function(a){if(typeof a=="number")return J.aF.prototype
if(typeof a=="string")return J.aZ.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bY.prototype
return a}
J.i=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bm(a)}
J.ax=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.iZ(a).m(a,b)}
J.U=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).n(a,b)}
J.dW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.bl(a).as(a,b)}
J.dX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bl(a).aI(a,b)}
J.bt=function(a,b){if(a.constructor==Array||typeof a=="string"||H.jc(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.B(a).h(a,b)}
J.dY=function(a,b,c,d){return J.i(a).dm(a,b,c,d)}
J.dZ=function(a,b,c,d){return J.i(a).dO(a,b,c,d)}
J.e_=function(a){return J.i(a).dU(a)}
J.bu=function(a,b,c){return J.i(a).dW(a,b,c)}
J.cj=function(a,b,c){return J.i(a).dX(a,b,c)}
J.e0=function(a,b){return J.i(a).dZ(a,b)}
J.e1=function(a,b,c,d,e){return J.i(a).e_(a,b,c,d,e)}
J.e2=function(a,b,c,d){return J.i(a).e0(a,b,c,d)}
J.e3=function(a,b){return J.aw(a).e3(a,b)}
J.e4=function(a,b,c,d,e){return J.i(a).e4(a,b,c,d,e)}
J.e5=function(a,b){return J.i(a).e5(a,b)}
J.e6=function(a,b){return J.i(a).e6(a,b)}
J.ck=function(a,b,c,d,e){return J.i(a).e7(a,b,c,d,e)}
J.e7=function(a,b){return J.i(a).az(a,b)}
J.bv=function(a,b,c){return J.B(a).e9(a,b,c)}
J.bw=function(a){return J.i(a).ec(a)}
J.e8=function(a){return J.i(a).ed(a)}
J.e9=function(a,b){return J.i(a).ee(a,b)}
J.ea=function(a,b){return J.i(a).eg(a,b)}
J.cl=function(a,b){return J.i(a).eh(a,b)}
J.eb=function(a,b){return J.i(a).eo(a,b)}
J.ec=function(a,b,c,d,e){return J.i(a).ep(a,b,c,d,e)}
J.ed=function(a,b){return J.aw(a).W(a,b)}
J.cm=function(a,b){return J.i(a).eq(a,b)}
J.aP=function(a,b){return J.i(a).er(a,b)}
J.ee=function(a,b){return J.aw(a).F(a,b)}
J.cn=function(a){return J.i(a).ge2(a)}
J.V=function(a){return J.i(a).gaj(a)}
J.G=function(a){return J.m(a).gu(a)}
J.ef=function(a){return J.i(a).gk(a)}
J.aQ=function(a){return J.aw(a).gG(a)}
J.ay=function(a){return J.B(a).gj(a)}
J.eg=function(a){return J.i(a).gcl(a)}
J.eh=function(a){return J.i(a).gcm(a)}
J.ei=function(a){return J.i(a).gcn(a)}
J.ej=function(a){return J.i(a).gco(a)}
J.ek=function(a){return J.i(a).gcp(a)}
J.el=function(a){return J.i(a).gcq(a)}
J.em=function(a){return J.i(a).gcr(a)}
J.en=function(a){return J.i(a).gbs(a)}
J.eo=function(a){return J.i(a).gl(a)}
J.ep=function(a){return J.i(a).gw(a)}
J.aR=function(a,b,c){return J.i(a).cK(a,b,c)}
J.eq=function(a){return J.i(a).cL(a)}
J.er=function(a,b){return J.i(a).cM(a,b)}
J.co=function(a,b){return J.i(a).cP(a,b)}
J.es=function(a,b,c){return J.i(a).cR(a,b,c)}
J.et=function(a,b){return J.aw(a).a9(a,b)}
J.ak=function(a,b){return J.i(a).aK(a,b)}
J.eu=function(a,b){return J.i(a).sk(a,b)}
J.ev=function(a,b){return J.i(a).sU(a,b)}
J.ew=function(a,b){return J.i(a).sl(a,b)}
J.cp=function(a,b,c,d){return J.i(a).d1(a,b,c,d)}
J.cq=function(a,b,c,d){return J.i(a).d2(a,b,c,d)}
J.aS=function(a,b,c,d){return J.i(a).eZ(a,b,c,d)}
J.a_=function(a){return J.bl(a).f_(a)}
J.cr=function(a){return J.bl(a).aa(a)}
J.az=function(a){return J.m(a).i(a)}
J.cs=function(a,b){return J.i(a).f2(a,b)}
J.aT=function(a,b,c,d,e,f,g){return J.i(a).f3(a,b,c,d,e,f,g)}
I.cf=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.p=W.f0.prototype
C.b=J.aE.prototype
C.c=J.cK.prototype
C.a=J.aF.prototype
C.e=J.aZ.prototype
C.z=J.fz.prototype
C.A=P.fF.prototype
C.B=J.bY.prototype
C.m=new H.cD()
C.n=new P.fy()
C.o=new P.hL()
C.f=new P.i4()
C.d=new P.ik()
C.h=new P.aC(0)
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
C.k=H.c(I.cf([127,2047,65535,1114111]),[P.k])
C.y=new H.eZ([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.l=new F.he(0)
$.cX="$cachedFunction"
$.cY="$cachedInvocation"
$.R=0
$.al=null
$.ct=null
$.cb=null
$.dF=null
$.dS=null
$.bj=null
$.bo=null
$.cc=null
$.ag=null
$.as=null
$.at=null
$.c6=!1
$.l=C.d
$.cF=0
$.cA=null
$.cz=null
$.cy=null
$.cx=null
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
I.$lazy(y,x,w)}})(["cI","$get$cI",function(){return H.fd()},"cJ","$get$cJ",function(){return new P.eU(null)},"dc","$get$dc",function(){return H.S(H.bc({toString:function(){return"$receiver$"}}))},"dd","$get$dd",function(){return H.S(H.bc({$method$:null,toString:function(){return"$receiver$"}}))},"de","$get$de",function(){return H.S(H.bc(null))},"df","$get$df",function(){return H.S(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dj","$get$dj",function(){return H.S(H.bc(void 0))},"dk","$get$dk",function(){return H.S(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dh","$get$dh",function(){return H.S(H.di(null))},"dg","$get$dg",function(){return H.S(function(){try{null.$method$}catch(z){return z.message}}())},"dm","$get$dm",function(){return H.S(H.di(void 0))},"dl","$get$dl",function(){return H.S(function(){try{(void 0).$method$}catch(z){return z.message}}())},"c0","$get$c0",function(){return P.hz()},"au","$get$au",function(){return[]}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[W.bK]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.a5]},{func:1,args:[P.X]},{func:1,args:[,],opt:[,]},{func:1,ret:P.X,args:[P.k]},{func:1,args:[W.bW]},{func:1,args:[,P.X]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.a5]},{func:1,ret:P.c8},{func:1,void:true,args:[P.a],opt:[P.a5]},{func:1,void:true,args:[,P.a5]},{func:1,args:[,,]},{func:1,ret:P.k,args:[,P.k]},{func:1,void:true,args:[P.k,P.k]},{func:1,args:[P.d4,,]},{func:1,args:[P.X,,]},{func:1,ret:P.k,args:[,]},{func:1,args:[P.k]},{func:1,args:[P.k,,]},{func:1,args:[F.bS]},{func:1,ret:P.P,args:[W.aI]},{func:1,args:[W.aI]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.jk(d||a)
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
Isolate.cf=a.cf
Isolate.bk=a.bk
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dU(F.dP(),b)},[])
else (function(b){H.dU(F.dP(),b)})([])})})()