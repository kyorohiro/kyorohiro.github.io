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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cz"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cz"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cz(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b2=function(){}
var dart=[["","",,H,{
"^":"",
kQ:{
"^":"a;a"}}],["","",,J,{
"^":"",
p:function(a){return void 0},
bH:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bD:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cB==null){H.jT()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.cl("Return interceptor for "+H.b(y(a,z))))}w=H.k1(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.L
else return C.N}return w},
h:{
"^":"a;",
u:function(a,b){return a===b},
gD:function(a){return H.ag(a)},
k:["dN",function(a){return H.bq(a)}],
"%":"CanvasRenderingContext2D|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
fR:{
"^":"h;",
k:function(a){return String(a)},
gD:function(a){return a?519018:218159},
$iscx:1},
fS:{
"^":"h;",
u:function(a,b){return null==b},
k:function(a){return"null"},
gD:function(a){return 0}},
dc:{
"^":"h;",
gD:function(a){return 0},
$isfT:1},
hc:{
"^":"dc;"},
cm:{
"^":"dc;",
k:function(a){return String(a)}},
aS:{
"^":"h;",
bB:function(a,b){if(!!a.immutable$list)throw H.e(new P.V(b))},
aZ:function(a,b){if(!!a.fixed$length)throw H.e(new P.V(b))},
d7:function(a,b){this.aZ(a,"removeAt")
if(b>=a.length)throw H.e(P.aX(b,null,null))
return a.splice(b,1)[0]},
a6:function(a,b){var z
this.aZ(a,"remove")
for(z=0;z<a.length;++z)if(J.D(a[z],b)){a.splice(z,1)
return!0}return!1},
I:function(a,b){var z,y
this.aZ(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.N)(b),++y)a.push(b[y])},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.e(new P.Q(a))}},
aw:function(a,b){return H.f(new H.bZ(a,b),[null,null])},
cR:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.b(a[x])
if(x>=z)return H.c(y,x)
y[x]=w}return y.join(b)},
af:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
gF:function(a){if(a.length>0)return a[0]
throw H.e(H.bU())},
gav:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.e(H.bU())},
c2:function(a,b,c,d,e){var z,y,x
this.bB(a,"set range")
P.bs(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.K(P.ah(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.e(H.fP())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.c(d,x)
a[b+y]=d[x]}},
dI:function(a,b){var z
this.bB(a,"sort")
z=P.jN()
H.aZ(a,0,a.length-1,z)},
c4:function(a){return this.dI(a,null)},
k:function(a){return P.bd(a,"[","]")},
gM:function(a){return new J.f1(a,a.length,0,null)},
gD:function(a){return H.ag(a)},
gn:function(a){return a.length},
sn:function(a,b){this.aZ(a,"set length")
if(b<0)throw H.e(P.ah(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.J(a,b))
if(b>=a.length||b<0)throw H.e(H.J(a,b))
return a[b]},
l:function(a,b,c){this.bB(a,"indexed set")
if(b>=a.length||b<0)throw H.e(H.J(a,b))
a[b]=c},
$isbe:1,
$isn:1,
$asn:null,
$isw:1},
kP:{
"^":"aS;"},
f1:{
"^":"a;a,b,c,d",
gJ:function(){return this.d},
E:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(new P.Q(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aT:{
"^":"h;",
at:function(a,b){var z
if(typeof b!=="number")throw H.e(H.S(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbJ(b)
if(this.gbJ(a)===z)return 0
if(this.gbJ(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gfp(b))return 0
return 1}else return-1},
gbJ:function(a){return a===0?1/a<0:a<0},
gfp:function(a){return isNaN(a)},
bS:function(a,b){return a%b},
ay:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.V(""+a))},
K:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.V(""+a))},
fM:function(a){return a},
b8:function(a,b){var z,y,x,w
H.cy(b)
if(b<2||b>36)throw H.e(P.ah(b,2,36,"radix",null))
z=a.toString(b)
if(C.o.cH(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.K(new P.V("Unexpected toString result: "+z))
x=J.F(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.o.t("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD:function(a){return a&0x1FFFFFFF},
m:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a+b},
O:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a-b},
t:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a*b},
c0:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
c5:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.ay(a/b)},
aj:function(a,b){return(a|0)===a?a/b|0:this.ay(a/b)},
aX:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ag:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a<b},
an:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a>b},
bb:function(a,b){if(typeof b!=="number")throw H.e(H.S(b))
return a>=b},
$isan:1},
db:{
"^":"aT;",
$isan:1,
$ism:1},
da:{
"^":"aT;",
$isan:1},
bf:{
"^":"h;",
cH:function(a,b){if(b<0)throw H.e(H.J(a,b))
if(b>=a.length)throw H.e(H.J(a,b))
return a.charCodeAt(b)},
m:function(a,b){if(typeof b!=="string")throw H.e(P.f0(b,null,null))
return a+b},
dM:function(a,b,c){H.cy(b)
if(c==null)c=a.length
H.cy(c)
if(b<0)throw H.e(P.aX(b,null,null))
if(typeof c!=="number")return H.B(c)
if(b>c)throw H.e(P.aX(b,null,null))
if(c>a.length)throw H.e(P.aX(c,null,null))
return a.substring(b,c)},
dL:function(a,b){return this.dM(a,b,null)},
t:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.e(C.x)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
eS:function(a,b,c){if(c>a.length)throw H.e(P.ah(c,0,a.length,null,null))
return H.k6(a,b,c)},
ga1:function(a){return a.length===0},
at:function(a,b){var z
if(typeof b!=="string")throw H.e(H.S(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gD:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gn:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.J(a,b))
if(b>=a.length||b<0)throw H.e(H.J(a,b))
return a[b]},
$isbe:1,
$isa6:1}}],["","",,H,{
"^":"",
b0:function(a,b){var z=a.aI(b)
if(!init.globalState.d.cy)init.globalState.f.aQ()
return z},
bG:function(){--init.globalState.f.b},
en:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.p(y).$isn)throw H.e(P.aP("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.j3(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$d8()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.iE(P.bX(null,H.b_),0)
y.z=P.bi(null,null,null,P.m,H.ct)
y.ch=P.bi(null,null,null,P.m,null)
if(y.x===!0){x=new H.j2()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fI,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.j4)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.bi(null,null,null,P.m,H.bt)
w=P.aE(null,null,null,P.m)
v=new H.bt(0,null,!1)
u=new H.ct(y,x,w,init.createNewIsolate(),v,new H.ap(H.bI()),new H.ap(H.bI()),!1,!1,[],P.aE(null,null,null,null),null,null,!1,!0,P.aE(null,null,null,null))
w.as(0,0)
u.c7(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.b3()
x=H.ay(y,[y]).ai(a)
if(x)u.aI(new H.k4(z,a))
else{y=H.ay(y,[y,y]).ai(a)
if(y)u.aI(new H.k5(z,a))
else u.aI(a)}init.globalState.f.aQ()},
fM:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fN()
return},
fN:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.V("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.V("Cannot extract URI from \""+H.b(z)+"\""))},
fI:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bw(!0,[]).ak(b.data)
y=J.F(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bw(!0,[]).ak(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bw(!0,[]).ak(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.bi(null,null,null,P.m,H.bt)
p=P.aE(null,null,null,P.m)
o=new H.bt(0,null,!1)
n=new H.ct(y,q,p,init.createNewIsolate(),o,new H.ap(H.bI()),new H.ap(H.bI()),!1,!1,[],P.aE(null,null,null,null),null,null,!1,!0,P.aE(null,null,null,null))
p.as(0,0)
n.c7(0,o)
init.globalState.f.a.ad(new H.b_(n,new H.fJ(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aQ()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aA(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aQ()
break
case"close":init.globalState.ch.a6(0,$.$get$d9().h(0,a))
a.terminate()
init.globalState.f.aQ()
break
case"log":H.fH(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.as(["command","print","msg",z])
q=new H.au(!0,P.ar(null,P.m)).X(q)
y.toString
self.postMessage(q)}else P.a1(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
fH:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.as(["command","log","msg",a])
x=new H.au(!0,P.ar(null,P.m)).X(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.M(w)
throw H.e(P.bc(z))}},
fK:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dt=$.dt+("_"+y)
$.du=$.du+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aA(f,["spawned",new H.by(y,x),w,z.r])
x=new H.fL(a,b,c,d,z)
if(e===!0){z.cE(w,w)
init.globalState.f.a.ad(new H.b_(z,x,"start isolate"))}else x.$0()},
jq:function(a){return new H.bw(!0,[]).ak(new H.au(!1,P.ar(null,P.m)).X(a))},
k4:{
"^":"d:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
k5:{
"^":"d:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
j3:{
"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{j4:function(a){var z=P.as(["command","print","msg",a])
return new H.au(!0,P.ar(null,P.m)).X(z)}}},
ct:{
"^":"a;a,b,c,fq:d<,eT:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cE:function(a,b){if(!this.f.u(0,a))return
if(this.Q.as(0,b)&&!this.y)this.y=!0
this.bx()},
fF:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a6(0,a)
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
if(w===y.c)y.ci();++y.d}this.y=!1}this.bx()},
ey:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.c(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fE:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.u(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.K(new P.V("removeRange"))
P.bs(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dF:function(a,b){if(!this.r.u(0,a))return
this.db=b},
ff:function(a,b,c){var z=J.p(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){J.aA(a,c)
return}z=this.cx
if(z==null){z=P.bX(null,null)
this.cx=z}z.ad(new H.iV(a,c))},
fd:function(a,b){var z
if(!this.r.u(0,a))return
z=J.p(b)
if(!z.u(b,0))z=z.u(b,1)&&!this.cy
else z=!0
if(z){this.bK()
return}z=this.cx
if(z==null){z=P.bX(null,null)
this.cx=z}z.ad(this.gft())},
fg:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.a1(a)
if(b!=null)P.a1(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.aO(a)
y[1]=b==null?null:J.aO(b)
for(x=new P.dd(z,z.r,null,null),x.c=z.e;x.E();)J.aA(x.d,y)},
aI:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.C(u)
w=t
v=H.M(u)
this.fg(w,v)
if(this.db===!0){this.bK()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfq()
if(this.cx!=null)for(;t=this.cx,!t.ga1(t);)this.cx.d8().$0()}return y},
cU:function(a){return this.b.h(0,a)},
c7:function(a,b){var z=this.b
if(z.a_(a))throw H.e(P.bc("Registry: ports must be registered only once."))
z.l(0,a,b)},
bx:function(){var z=this.b
if(z.gn(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.bK()},
bK:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.R(0)
for(z=this.b,y=z.gdk(z),y=y.gM(y);y.E();)y.gJ().e7()
z.R(0)
this.c.R(0)
init.globalState.z.a6(0,this.a)
this.dx.R(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.c(z,v)
J.aA(w,z[v])}this.ch=null}},"$0","gft",0,0,2]},
iV:{
"^":"d:2;a,b",
$0:function(){J.aA(this.a,this.b)}},
iE:{
"^":"a;a,b",
f0:function(){var z=this.a
if(z.b===z.c)return
return z.d8()},
df:function(){var z,y,x
z=this.f0()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a_(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga1(y)}else y=!1
else y=!1
else y=!1
if(y)H.K(P.bc("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga1(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.as(["command","close"])
x=new H.au(!0,P.ar(null,P.m)).X(x)
y.toString
self.postMessage(x)}return!1}z.fD()
return!0},
ct:function(){if(self.window!=null)new H.iF(this).$0()
else for(;this.df(););},
aQ:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.ct()
else try{this.ct()}catch(x){w=H.C(x)
z=w
y=H.M(x)
w=init.globalState.Q
v=P.as(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.au(!0,P.ar(null,P.m)).X(v)
w.toString
self.postMessage(v)}}},
iF:{
"^":"d:2;a",
$0:function(){if(!this.a.df())return
P.cf(C.r,this)}},
b_:{
"^":"a;a,b,c",
fD:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aI(this.b)}},
j2:{
"^":"a;"},
fJ:{
"^":"d:0;a,b,c,d,e,f",
$0:function(){H.fK(this.a,this.b,this.c,this.d,this.e,this.f)}},
fL:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.b3()
w=H.ay(x,[x,x]).ai(y)
if(w)y.$2(this.b,this.c)
else{x=H.ay(x,[x]).ai(y)
if(x)y.$1(this.b)
else y.$0()}}z.bx()}},
dW:{
"^":"a;"},
by:{
"^":"dW;b,a",
bd:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcl())return
x=H.jq(b)
if(z.geT()===y){y=J.F(x)
switch(y.h(x,0)){case"pause":z.cE(y.h(x,1),y.h(x,2))
break
case"resume":z.fF(y.h(x,1))
break
case"add-ondone":z.ey(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fE(y.h(x,1))
break
case"set-errors-fatal":z.dF(y.h(x,1),y.h(x,2))
break
case"ping":z.ff(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fd(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.as(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a6(0,y)
break}return}y=init.globalState.f
w="receive "+H.b(b)
y.a.ad(new H.b_(z,new H.j6(this,x),w))},
u:function(a,b){if(b==null)return!1
return b instanceof H.by&&J.D(this.b,b.b)},
gD:function(a){return this.b.gbs()}},
j6:{
"^":"d:0;a,b",
$0:function(){var z=this.a.b
if(!z.gcl())z.e3(this.b)}},
cu:{
"^":"dW;b,c,a",
bd:function(a,b){var z,y,x
z=P.as(["command","message","port",this,"msg",b])
y=new H.au(!0,P.ar(null,P.m)).X(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
u:function(a,b){if(b==null)return!1
return b instanceof H.cu&&J.D(this.b,b.b)&&J.D(this.a,b.a)&&J.D(this.c,b.c)},
gD:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.dH()
y=this.a
if(typeof y!=="number")return y.dH()
x=this.c
if(typeof x!=="number")return H.B(x)
return(z<<16^y<<8^x)>>>0}},
bt:{
"^":"a;bs:a<,b,cl:c<",
e7:function(){this.c=!0
this.b=null},
e3:function(a){if(this.c)return
this.eg(a)},
eg:function(a){return this.b.$1(a)},
$isho:1},
hS:{
"^":"a;a,b,c",
dY:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ad(new H.b_(y,new H.hU(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aL(new H.hV(this,b),0),a)}else throw H.e(new P.V("Timer greater than 0."))},
static:{hT:function(a,b){var z=new H.hS(!0,!1,null)
z.dY(a,b)
return z}}},
hU:{
"^":"d:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
hV:{
"^":"d:2;a,b",
$0:function(){this.a.c=null
H.bG()
this.b.$0()}},
ap:{
"^":"a;bs:a<",
gD:function(a){var z=this.a
if(typeof z!=="number")return z.fQ()
z=C.b.aX(z,0)^C.b.aj(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
u:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ap){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
au:{
"^":"a;a,b",
X:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gn(z))
z=J.p(a)
if(!!z.$isdj)return["buffer",a]
if(!!z.$isc4)return["typed",a]
if(!!z.$isbe)return this.dB(a)
if(!!z.$isfG){x=this.gdw()
w=a.gcS()
w=H.bk(w,x,H.W(w,"a_",0),null)
w=P.bY(w,!0,H.W(w,"a_",0))
z=z.gdk(a)
z=H.bk(z,x,H.W(z,"a_",0),null)
return["map",w,P.bY(z,!0,H.W(z,"a_",0))]}if(!!z.$isfT)return this.dC(a)
if(!!z.$ish)this.dj(a)
if(!!z.$isho)this.aR(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isby)return this.dD(a)
if(!!z.$iscu)return this.dE(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aR(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isap)return["capability",a.a]
if(!(a instanceof P.a))this.dj(a)
return["dart",init.classIdExtractor(a),this.dA(init.classFieldsExtractor(a))]},"$1","gdw",2,0,1],
aR:function(a,b){throw H.e(new P.V(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
dj:function(a){return this.aR(a,null)},
dB:function(a){var z=this.dz(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aR(a,"Can't serialize indexable: ")},
dz:function(a){var z,y,x
z=[]
C.a.sn(z,a.length)
for(y=0;y<a.length;++y){x=this.X(a[y])
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
dA:function(a){var z
for(z=0;z<a.length;++z)C.a.l(a,z,this.X(a[z]))
return a},
dC:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aR(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sn(y,z.length)
for(x=0;x<z.length;++x){w=this.X(a[z[x]])
if(x>=y.length)return H.c(y,x)
y[x]=w}return["js-object",z,y]},
dE:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dD:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbs()]
return["raw sendport",a]}},
bw:{
"^":"a;a,b",
ak:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.aP("Bad serialized message: "+H.b(a)))
switch(C.a.gF(a)){case"ref":if(1>=a.length)return H.c(a,1)
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
y=this.aF(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aF(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return this.aF(x)
case"const":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
y=this.aF(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.f3(a)
case"sendport":return this.f4(a)
case"raw sendport":if(1>=a.length)return H.c(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.f2(a)
case"function":if(1>=a.length)return H.c(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.c(a,1)
return new H.ap(a[1])
case"dart":y=a.length
if(1>=y)return H.c(a,1)
w=a[1]
if(2>=y)return H.c(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aF(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.b(a))}},"$1","gf1",2,0,1],
aF:function(a){var z,y,x
z=J.F(a)
y=0
while(!0){x=z.gn(a)
if(typeof x!=="number")return H.B(x)
if(!(y<x))break
z.l(a,y,this.ak(z.h(a,y)));++y}return a},
f3:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w=P.aD()
this.b.push(w)
y=J.eX(y,this.gf1()).bV(0)
for(z=J.F(y),v=J.F(x),u=0;u<z.gn(y);++u){if(u>=y.length)return H.c(y,u)
w.l(0,y[u],this.ak(v.h(x,u)))}return w},
f4:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
if(3>=z)return H.c(a,3)
w=a[3]
if(J.D(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.cU(w)
if(u==null)return
t=new H.by(u,x)}else t=new H.cu(y,w,x)
this.b.push(t)
return t},
f2:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.c(a,1)
y=a[1]
if(2>=z)return H.c(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.F(y)
v=J.F(x)
u=0
while(!0){t=z.gn(y)
if(typeof t!=="number")return H.B(t)
if(!(u<t))break
w[z.h(y,u)]=this.ak(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
fe:function(){throw H.e(new P.V("Cannot modify unmodifiable Map"))},
jO:function(a){return init.types[a]},
k0:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.p(a).$isbg},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aO(a)
if(typeof z!=="string")throw H.e(H.S(a))
return z},
ag:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cc:function(a){var z,y
z=C.t(J.p(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.o.cH(z,0)===36)z=C.o.dL(z,1)
return(z+H.cD(H.bE(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
bq:function(a){return"Instance of '"+H.cc(a)+"'"},
hm:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
br:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.aX(z,10))>>>0,56320|z&1023)}throw H.e(P.ah(a,0,1114111,null,null))},
R:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
ds:function(a){return a.b?H.R(a).getUTCMilliseconds()+0:H.R(a).getMilliseconds()+0},
bp:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.S(a))
return a[b]},
cd:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.S(a))
a[b]=c},
B:function(a){throw H.e(H.S(a))},
c:function(a,b){if(a==null)J.aN(a)
throw H.e(H.J(a,b))},
J:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ao(!0,b,"index",null)
z=J.aN(a)
if(!(b<0)){if(typeof z!=="number")return H.B(z)
y=b>=z}else y=!0
if(y)return P.bT(b,a,"index",null,z)
return P.aX(b,"index",null)},
S:function(a){return new P.ao(!0,a,null,null)},
a3:function(a){return a},
cy:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.S(a))
return a},
e:function(a){var z
if(a==null)a=new P.dq()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eo})
z.name=""}else z.toString=H.eo
return z},
eo:function(){return J.aO(this.dartException)},
K:function(a){throw H.e(a)},
N:function(a){throw H.e(new P.Q(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.k9(a)
if(a==null)return
if(a instanceof H.bS)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aX(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bV(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.dp(v,null))}}if(a instanceof TypeError){u=$.$get$dI()
t=$.$get$dJ()
s=$.$get$dK()
r=$.$get$dL()
q=$.$get$dP()
p=$.$get$dQ()
o=$.$get$dN()
$.$get$dM()
n=$.$get$dS()
m=$.$get$dR()
l=u.a3(y)
if(l!=null)return z.$1(H.bV(y,l))
else{l=t.a3(y)
if(l!=null){l.method="call"
return z.$1(H.bV(y,l))}else{l=s.a3(y)
if(l==null){l=r.a3(y)
if(l==null){l=q.a3(y)
if(l==null){l=p.a3(y)
if(l==null){l=o.a3(y)
if(l==null){l=r.a3(y)
if(l==null){l=n.a3(y)
if(l==null){l=m.a3(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dp(y,l==null?null:l.method))}}return z.$1(new H.io(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dy()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ao(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dy()
return a},
M:function(a){var z
if(a instanceof H.bS)return a.b
if(a==null)return new H.e0(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.e0(a,null)},
k3:function(a){if(a==null||typeof a!='object')return J.G(a)
else return H.ag(a)},
ef:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
jV:function(a,b,c,d,e,f,g){var z=J.p(c)
if(z.u(c,0))return H.b0(b,new H.jW(a))
else if(z.u(c,1))return H.b0(b,new H.jX(a,d))
else if(z.u(c,2))return H.b0(b,new H.jY(a,d,e))
else if(z.u(c,3))return H.b0(b,new H.jZ(a,d,e,f))
else if(z.u(c,4))return H.b0(b,new H.k_(a,d,e,f,g))
else throw H.e(P.bc("Unsupported number of arguments for wrapped closure"))},
aL:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jV)
a.$identity=z
return z},
fc:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isn){z.$reflectionInfo=c
x=H.hr(z).r}else x=c
w=d?Object.create(new H.hF().constructor.prototype):Object.create(new H.bO(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a4
$.a4=J.y(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.cW(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.jO(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.cU:H.bP
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cW(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
f9:function(a,b,c,d){var z=H.bP
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cW:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fb(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.f9(y,!w,z,b)
if(y===0){w=$.aB
if(w==null){w=H.ba("self")
$.aB=w}w="return function(){return this."+H.b(w)+"."+H.b(z)+"();"
v=$.a4
$.a4=J.y(v,1)
return new Function(w+H.b(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aB
if(v==null){v=H.ba("self")
$.aB=v}v=w+H.b(v)+"."+H.b(z)+"("+u+");"
w=$.a4
$.a4=J.y(w,1)
return new Function(v+H.b(w)+"}")()},
fa:function(a,b,c,d){var z,y
z=H.bP
y=H.cU
switch(b?-1:a){case 0:throw H.e(new H.hu("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fb:function(a,b){var z,y,x,w,v,u,t,s
z=H.f2()
y=$.cT
if(y==null){y=H.ba("receiver")
$.cT=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fa(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.a4
$.a4=J.y(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.a4
$.a4=J.y(u,1)
return new Function(y+H.b(u)+"}")()},
cz:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isn){c.fixed$length=Array
z=c}else z=c
return H.fc(a,b,z,!!d,e,f)},
k8:function(a){throw H.e(new P.fi("Cyclic initialization for static "+H.b(a)))},
ay:function(a,b,c){return new H.hv(a,b,c,null)},
b3:function(){return C.w},
bI:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
l:function(a,b,c){var z
if(b===0){J.eB(c,a)
return}else if(b===1){c.cJ(H.C(a),H.M(a))
return}if(!!J.p(a).$isa2)z=a
else{z=H.f(new P.E(0,$.o,null),[null])
z.aC(a)}z.b7(H.e9(b,0),new H.jA(b))
return c.gfc()},
e9:function(a,b){return new H.jy(b,function(c,d){while(true)try{a(c,d)
break}catch(z){d=z
c=1}})},
f:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
bE:function(a){if(a==null)return
return a.$builtinTypeInfo},
eg:function(a,b){return H.cI(a["$as"+H.b(b)],H.bE(a))},
W:function(a,b,c){var z=H.eg(a,b)
return z==null?null:z[c]},
A:function(a,b){var z=H.bE(a)
return z==null?null:z[b]},
cH:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cD(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.k(a)
else return},
cD:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bu("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.b(H.cH(u,c))}return w?"":"<"+H.b(z)+">"},
cI:function(a,b){if(typeof a=="function"){a=H.cC(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.cC(a,null,b)}return b},
jE:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bE(a)
y=J.p(a)
if(y[b]==null)return!1
return H.ec(H.cI(y[d],z),c)},
k7:function(a,b,c,d){if(a!=null&&!H.jE(a,b,c,d))throw H.e(H.f4(H.cc(a),(b.substring(3)+H.cD(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
ec:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.X(a[y],b[y]))return!1
return!0},
bB:function(a,b,c){return H.cC(a,b,H.eg(b,c))},
X:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eh(a,b)
if('func' in a)return b.builtin$cls==="ft"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.cH(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.b(H.cH(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ec(H.cI(v,z),x)},
eb:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.X(z,v)||H.X(v,z)))return!1}return!0},
jz:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.X(v,u)||H.X(u,v)))return!1}return!0},
eh:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.X(z,y)||H.X(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eb(x,w,!1))return!1
if(!H.eb(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.X(o,n)||H.X(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.X(o,n)||H.X(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.X(o,n)||H.X(n,o)))return!1}}return H.jz(a.named,b.named)},
cC:function(a,b,c){return a.apply(b,c)},
lL:function(a){var z=$.cA
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
lK:function(a){return H.ag(a)},
lJ:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
k1:function(a){var z,y,x,w,v,u
z=$.cA.$1(a)
y=$.bC[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bF[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.ea.$2(a,z)
if(z!=null){y=$.bC[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bF[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cF(x)
$.bC[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bF[z]=x
return x}if(v==="-"){u=H.cF(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.ek(a,x)
if(v==="*")throw H.e(new P.cl(z))
if(init.leafTags[z]===true){u=H.cF(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.ek(a,x)},
ek:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bH(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cF:function(a){return J.bH(a,!1,null,!!a.$isbg)},
k2:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bH(z,!1,null,!!z.$isbg)
else return J.bH(z,c,null,null)},
jT:function(){if(!0===$.cB)return
$.cB=!0
H.jU()},
jU:function(){var z,y,x,w,v,u,t,s
$.bC=Object.create(null)
$.bF=Object.create(null)
H.jP()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.el.$1(v)
if(u!=null){t=H.k2(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jP:function(){var z,y,x,w,v,u,t
z=C.F()
z=H.ax(C.C,H.ax(C.H,H.ax(C.u,H.ax(C.u,H.ax(C.G,H.ax(C.D,H.ax(C.E(C.t),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cA=new H.jQ(v)
$.ea=new H.jR(u)
$.el=new H.jS(t)},
ax:function(a,b){return a(b)||b},
k6:function(a,b,c){return a.indexOf(b,c)>=0},
fd:{
"^":"a;",
k:function(a){return P.c_(this)},
l:function(a,b,c){return H.fe()}},
d6:{
"^":"fd;a",
br:function(){var z=this.$map
if(z==null){z=new H.aU(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.ef(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.br().h(0,b)},
L:function(a,b){this.br().L(0,b)},
gn:function(a){var z=this.br()
return z.gn(z)}},
hq:{
"^":"a;a,b,c,d,e,f,r,x",
static:{hr:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hq(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
im:{
"^":"a;a,b,c,d,e,f",
a3:function(a){var z,y,x
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
static:{a9:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.im(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bv:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},dO:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dp:{
"^":"L;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
fV:{
"^":"L;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.b(z)+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.b(z)+"' on '"+H.b(y)+"' ("+H.b(this.a)+")"},
static:{bV:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fV(a,y,z?null:b.receiver)}}},
io:{
"^":"L;a",
k:function(a){var z=this.a
return C.o.ga1(z)?"Error":"Error: "+z}},
k9:{
"^":"d:1;a",
$1:function(a){if(!!J.p(a).$isL)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
e0:{
"^":"a;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jW:{
"^":"d:0;a",
$0:function(){return this.a.$0()}},
jX:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jY:{
"^":"d:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jZ:{
"^":"d:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
k_:{
"^":"d:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"a;",
k:function(a){return"Closure '"+H.cc(this)+"'"},
gdl:function(){return this},
gdl:function(){return this}},
dB:{
"^":"d;"},
hF:{
"^":"dB;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bO:{
"^":"dB;a,b,c,d",
u:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bO))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gD:function(a){var z,y
z=this.c
if(z==null)y=H.ag(this.a)
else y=typeof z!=="object"?J.G(z):H.ag(z)
z=H.ag(this.b)
if(typeof y!=="number")return y.fR()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.bq(z)},
static:{bP:function(a){return a.a},cU:function(a){return a.c},f2:function(){var z=$.aB
if(z==null){z=H.ba("self")
$.aB=z}return z},ba:function(a){var z,y,x,w,v
z=new H.bO("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
f3:{
"^":"L;a",
k:function(a){return this.a},
static:{f4:function(a,b){return new H.f3("CastError: Casting value of type "+H.b(a)+" to incompatible type "+H.b(b))}}},
hu:{
"^":"L;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
dw:{
"^":"a;"},
hv:{
"^":"dw;a,b,c,d",
ai:function(a){var z=this.eb(a)
return z==null?!1:H.eh(z,this.az())},
eb:function(a){var z=J.p(a)
return"$signature" in z?z.$signature():null},
az:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.p(y)
if(!!x.$islt)z.void=true
else if(!x.$isd2)z.ret=y.az()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dv(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dv(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.ee(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].az()}z.named=w}return z},
k:function(a){var z,y,x,w,v,u,t,s
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
t=H.ee(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.b(z[s].az())+" "+s}x+="}"}}return x+(") -> "+H.b(this.a))},
static:{dv:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].az())
return z}}},
d2:{
"^":"dw;",
k:function(a){return"dynamic"},
az:function(){return}},
bS:{
"^":"a;a,Y:b<"},
jA:{
"^":"d:6;a",
$2:function(a,b){H.e9(this.a,1).$1(new H.bS(a,b))}},
jy:{
"^":"d:1;a,b",
$1:function(a){this.b(this.a,a)}},
aU:{
"^":"a;a,b,c,d,e,f,r",
gn:function(a){return this.a},
ga1:function(a){return this.a===0},
gcS:function(){return H.f(new H.fX(this),[H.A(this,0)])},
gdk:function(a){return H.bk(this.gcS(),new H.fU(this),H.A(this,0),H.A(this,1))},
a_:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cd(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cd(y,a)}else return this.fk(a)},
fk:function(a){var z=this.d
if(z==null)return!1
return this.aK(this.ab(z,this.aJ(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ab(z,b)
return y==null?null:y.gal()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ab(x,b)
return y==null?null:y.gal()}else return this.fl(b)},
fl:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ab(z,this.aJ(a))
x=this.aK(y,a)
if(x<0)return
return y[x].gal()},
l:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.bu()
this.b=z}this.c6(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bu()
this.c=y}this.c6(y,b,c)}else this.fn(b,c)},
fn:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.bu()
this.d=z}y=this.aJ(a)
x=this.ab(z,y)
if(x==null)this.bw(z,y,[this.bv(a,b)])
else{w=this.aK(x,a)
if(w>=0)x[w].sal(b)
else x.push(this.bv(a,b))}},
a6:function(a,b){if(typeof b==="string")return this.cs(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cs(this.c,b)
else return this.fm(b)},
fm:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ab(z,this.aJ(a))
x=this.aK(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cB(w)
return w.gal()},
R:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.Q(this))
z=z.c}},
c6:function(a,b,c){var z=this.ab(a,b)
if(z==null)this.bw(a,b,this.bv(b,c))
else z.sal(c)},
cs:function(a,b){var z
if(a==null)return
z=this.ab(a,b)
if(z==null)return
this.cB(z)
this.ce(a,b)
return z.gal()},
bv:function(a,b){var z,y
z=new H.fW(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cB:function(a){var z,y
z=a.gep()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aJ:function(a){return J.G(a)&0x3ffffff},
aK:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.D(a[y].gcP(),b))return y
return-1},
k:function(a){return P.c_(this)},
ab:function(a,b){return a[b]},
bw:function(a,b,c){a[b]=c},
ce:function(a,b){delete a[b]},
cd:function(a,b){return this.ab(a,b)!=null},
bu:function(){var z=Object.create(null)
this.bw(z,"<non-identifier-key>",z)
this.ce(z,"<non-identifier-key>")
return z},
$isfG:1},
fU:{
"^":"d:1;a",
$1:function(a){return this.a.h(0,a)}},
fW:{
"^":"a;cP:a<,al:b@,c,ep:d<"},
fX:{
"^":"a_;a",
gn:function(a){return this.a.a},
gM:function(a){var z,y
z=this.a
y=new H.fY(z,z.r,null,null)
y.c=z.e
return y},
L:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.e(new P.Q(z))
y=y.c}},
$isw:1},
fY:{
"^":"a;a,b,c,d",
gJ:function(){return this.d},
E:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.Q(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
jQ:{
"^":"d:1;a",
$1:function(a){return this.a(a)}},
jR:{
"^":"d:10;a",
$2:function(a,b){return this.a(a,b)}},
jS:{
"^":"d:3;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
bU:function(){return new P.aF("No element")},
fP:function(){return new P.aF("Too few elements")},
aZ:function(a,b,c,d){if(c-b<=32)H.hz(a,b,c,d)
else H.hy(a,b,c,d)},
hz:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.F(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.T(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
hy:function(a,b,c,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=C.c.aj(c-b+1,6)
y=b+z
x=c-z
w=C.c.aj(b+c,2)
v=w-z
u=w+z
t=J.F(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.T(a0.$2(s,r),0)){n=r
r=s
s=n}if(J.T(a0.$2(p,o),0)){n=o
o=p
p=n}if(J.T(a0.$2(s,q),0)){n=q
q=s
s=n}if(J.T(a0.$2(r,q),0)){n=q
q=r
r=n}if(J.T(a0.$2(s,p),0)){n=p
p=s
s=n}if(J.T(a0.$2(q,p),0)){n=p
p=q
q=n}if(J.T(a0.$2(r,o),0)){n=o
o=r
r=n}if(J.T(a0.$2(r,q),0)){n=q
q=r
r=n}if(J.T(a0.$2(p,o),0)){n=o
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
if(J.D(a0.$2(r,p),0)){for(k=m;k<=l;++k){if(k>=a.length)return H.c(a,k)
j=a[k]
i=a0.$2(j,r)
h=J.p(i)
if(h.u(i,0))continue
if(h.ag(i,0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.l(a,k,a[m])
t.l(a,m,j)}++m}else for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
i=a0.$2(a[l],r)
h=J.az(i)
if(h.an(i,0)){--l
continue}else{h=h.ag(i,0)
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
if(J.b4(a0.$2(j,r),0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.l(a,k,a[m])
t.l(a,m,j)}++m}else if(J.T(a0.$2(j,p),0))for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
if(J.T(a0.$2(a[l],p),0)){--l
if(l<k)break
continue}else{if(l>=a.length)return H.c(a,l)
h=J.b4(a0.$2(a[l],r),0)
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
H.aZ(a,b,m-2,a0)
H.aZ(a,l+2,c,a0)
if(d)return
if(m<y&&l>x){while(!0){if(m>=a.length)return H.c(a,m)
if(!J.D(a0.$2(a[m],r),0))break;++m}while(!0){if(l<0||l>=a.length)return H.c(a,l)
if(!J.D(a0.$2(a[l],p),0))break;--l}for(k=m;k<=l;++k){if(k>=a.length)return H.c(a,k)
j=a[k]
if(J.D(a0.$2(j,r),0)){if(k!==m){if(m>=a.length)return H.c(a,m)
t.l(a,k,a[m])
t.l(a,m,j)}++m}else if(J.D(a0.$2(j,p),0))for(;!0;){if(l<0||l>=a.length)return H.c(a,l)
if(J.D(a0.$2(a[l],p),0)){--l
if(l<k)break
continue}else{if(l>=a.length)return H.c(a,l)
h=J.b4(a0.$2(a[l],r),0)
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
break}}}H.aZ(a,m,l,a0)}else H.aZ(a,m,l,a0)},
hQ:function(a){return a.gfW()},
bj:{
"^":"a_;",
gM:function(a){return new H.de(this,this.gn(this),0,null)},
L:function(a,b){var z,y
z=this.gn(this)
for(y=0;y<z;++y){b.$1(this.af(0,y))
if(z!==this.gn(this))throw H.e(new P.Q(this))}},
aw:function(a,b){return H.f(new H.bZ(this,b),[null,null])},
bW:function(a,b){var z,y,x
if(b){z=H.f([],[H.W(this,"bj",0)])
C.a.sn(z,this.gn(this))}else z=H.f(Array(this.gn(this)),[H.W(this,"bj",0)])
for(y=0;y<this.gn(this);++y){x=this.af(0,y)
if(y>=z.length)return H.c(z,y)
z[y]=x}return z},
bV:function(a){return this.bW(a,!0)},
$isw:1},
de:{
"^":"a;a,b,c,d",
gJ:function(){return this.d},
E:function(){var z,y,x,w
z=this.a
y=J.F(z)
x=y.gn(z)
if(this.b!==x)throw H.e(new P.Q(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.af(z,w);++this.c
return!0}},
df:{
"^":"a_;a,b",
gM:function(a){var z=new H.h1(null,J.b6(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gn:function(a){return J.aN(this.a)},
$asa_:function(a,b){return[b]},
static:{bk:function(a,b,c,d){if(!!J.p(a).$isw)return H.f(new H.d3(a,b),[c,d])
return H.f(new H.df(a,b),[c,d])}}},
d3:{
"^":"df;a,b",
$isw:1},
h1:{
"^":"fQ;a,b,c",
E:function(){var z=this.b
if(z.E()){this.a=this.bq(z.gJ())
return!0}this.a=null
return!1},
gJ:function(){return this.a},
bq:function(a){return this.c.$1(a)}},
bZ:{
"^":"bj;a,b",
gn:function(a){return J.aN(this.a)},
af:function(a,b){return this.bq(J.eH(this.a,b))},
bq:function(a){return this.b.$1(a)},
$asbj:function(a,b){return[b]},
$asa_:function(a,b){return[b]},
$isw:1},
d5:{
"^":"a;"}}],["","",,H,{
"^":"",
ee:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
iq:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jB()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aL(new P.is(z),1)).observe(y,{childList:true})
return new P.ir(z,y,x)}else if(self.setImmediate!=null)return P.jC()
return P.jD()},
lv:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aL(new P.it(a),0))},"$1","jB",2,0,5],
lw:[function(a){++init.globalState.f.b
self.setImmediate(H.aL(new P.iu(a),0))},"$1","jC",2,0,5],
lx:[function(a){P.cg(C.r,a)},"$1","jD",2,0,5],
e4:function(a,b){var z=H.b3()
z=H.ay(z,[z,z]).ai(a)
if(z){b.toString
return a}else{b.toString
return a}},
fu:function(a,b){var z=H.f(new P.E(0,$.o,null),[b])
P.cf(C.r,new P.fx(a,z))
return z},
fv:function(a,b,c){var z=new P.E(0,$.o,null)
z.$builtinTypeInfo=[c]
P.cf(a,new P.fw(b,z))
return z},
Y:function(a){return H.f(new P.co(H.f(new P.E(0,$.o,null),[a])),[a])},
e2:function(a,b,c){$.o.toString
a.Z(b,c)},
jt:function(){var z,y
for(;z=$.av,z!=null;){$.aJ=null
y=z.c
$.av=y
if(y==null)$.aI=null
$.o=z.b
z.eH()}},
lI:[function(){$.cv=!0
try{P.jt()}finally{$.o=C.d
$.aJ=null
$.cv=!1
if($.av!=null)$.$get$cp().$1(P.ed())}},"$0","ed",0,0,2],
e8:function(a){if($.av==null){$.aI=a
$.av=a
if(!$.cv)$.$get$cp().$1(P.ed())}else{$.aI.c=a
$.aI=a}},
em:function(a){var z,y
z=$.o
if(C.d===z){P.aw(null,null,C.d,a)
return}z.toString
if(C.d.gbH()===z){P.aw(null,null,z,a)
return}y=$.o
P.aw(null,null,y,y.by(a,!0))},
li:function(a,b){var z,y,x
z=H.f(new P.e1(null,null,null,0),[b])
y=z.gek()
x=z.gem()
z.a=a.am(y,!0,z.gel(),x)
return z},
jw:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.C(u)
z=t
y=H.M(u)
$.o.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aa(x)
w=t
v=x.gY()
c.$2(w,v)}}},
jm:function(a,b,c,d){var z=a.bA()
if(!!J.p(z).$isa2)z.bY(new P.jp(b,c,d))
else b.Z(c,d)},
jn:function(a,b){return new P.jo(a,b)},
cf:function(a,b){var z=$.o
if(z===C.d){z.toString
return P.cg(a,b)}return P.cg(a,z.by(b,!0))},
cg:function(a,b){var z=C.c.aj(a.a,1000)
return H.hT(z<0?0:z,b)},
cn:function(a){var z=$.o
$.o=a
return z},
b1:function(a,b,c,d,e){var z,y,x
z=new P.dV(new P.jv(d,e),C.d,null)
y=$.av
if(y==null){P.e8(z)
$.aJ=$.aI}else{x=$.aJ
if(x==null){z.c=y
$.aJ=z
$.av=z}else{z.c=x.c
x.c=z
$.aJ=z
if(z.c==null)$.aI=z}}},
e5:function(a,b,c,d){var z,y
if($.o===c)return d.$0()
z=P.cn(c)
try{y=d.$0()
return y}finally{$.o=z}},
e7:function(a,b,c,d,e){var z,y
if($.o===c)return d.$1(e)
z=P.cn(c)
try{y=d.$1(e)
return y}finally{$.o=z}},
e6:function(a,b,c,d,e,f){var z,y
if($.o===c)return d.$2(e,f)
z=P.cn(c)
try{y=d.$2(e,f)
return y}finally{$.o=z}},
aw:function(a,b,c,d){var z=C.d!==c
if(z){d=c.by(d,!(!z||C.d.gbH()===c))
c=C.d}P.e8(new P.dV(d,c,null))},
is:{
"^":"d:1;a",
$1:function(a){var z,y
H.bG()
z=this.a
y=z.a
z.a=null
y.$0()}},
ir:{
"^":"d:11;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
it:{
"^":"d:0;a",
$0:function(){H.bG()
this.a.$0()}},
iu:{
"^":"d:0;a",
$0:function(){H.bG()
this.a.$0()}},
jg:{
"^":"ad;a,b",
k:function(a){var z,y
z="Uncaught Error: "+H.b(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.b(y)):z},
static:{jh:function(a,b){if(b!=null)return b
if(!!J.p(a).$isL)return a.gY()
return}}},
a2:{
"^":"a;"},
fx:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.ah(this.a.$0())}catch(x){w=H.C(x)
z=w
y=H.M(x)
P.e2(this.b,z,y)}}},
fw:{
"^":"d:0;a,b",
$0:function(){var z,y,x,w
try{this.b.ah(null)}catch(x){w=H.C(x)
z=w
y=H.M(x)
P.e2(this.b,z,y)}}},
iy:{
"^":"a;fc:a<",
cJ:function(a,b){a=a!=null?a:new P.dq()
if(this.a.a!==0)throw H.e(new P.aF("Future already completed"))
$.o.toString
this.Z(a,b)},
cI:function(a){return this.cJ(a,null)}},
co:{
"^":"iy;a",
b1:function(a,b){var z=this.a
if(z.a!==0)throw H.e(new P.aF("Future already completed"))
z.aC(b)},
Z:function(a,b){this.a.e6(a,b)}},
aG:{
"^":"a;cm:a<,fG:b>,c,d,e",
gar:function(){return this.b.b},
gcO:function(){return(this.c&1)!==0},
gfi:function(){return this.c===6},
gfh:function(){return this.c===8},
geo:function(){return this.d},
gex:function(){return this.d}},
E:{
"^":"a;aY:a?,ar:b<,c",
geh:function(){return this.a===8},
sei:function(a){if(a)this.a=2
else this.a=0},
b7:function(a,b){var z,y
z=H.f(new P.E(0,$.o,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.e4(b,y)}this.bg(new P.aG(null,z,b==null?1:3,a,b))
return z},
a7:function(a){return this.b7(a,null)},
bY:function(a){var z,y
z=$.o
y=new P.E(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.bg(new P.aG(null,y,8,a,null))
return y},
bt:function(){if(this.a!==0)throw H.e(new P.aF("Future already completed"))
this.a=1},
gew:function(){return this.c},
gaD:function(){return this.c},
cA:function(a){this.a=4
this.c=a},
cz:function(a){this.a=8
this.c=a},
eu:function(a,b){this.cz(new P.ad(a,b))},
bg:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aw(null,null,z,new P.iI(this,a))}else{a.a=this.c
this.c=a}},
aW:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gcm()
z.a=y}return y},
ah:function(a){var z,y
z=J.p(a)
if(!!z.$isa2)if(!!z.$isE)P.bx(a,this)
else P.cs(a,this)
else{y=this.aW()
this.cA(a)
P.al(this,y)}},
cc:function(a){var z=this.aW()
this.cA(a)
P.al(this,z)},
Z:[function(a,b){var z=this.aW()
this.cz(new P.ad(a,b))
P.al(this,z)},function(a){return this.Z(a,null)},"fS","$2","$1","gbm",2,2,12,0],
aC:function(a){var z
if(a==null);else{z=J.p(a)
if(!!z.$isa2){if(!!z.$isE){z=a.a
if(z>=4&&z===8){this.bt()
z=this.b
z.toString
P.aw(null,null,z,new P.iK(this,a))}else P.bx(a,this)}else P.cs(a,this)
return}}this.bt()
z=this.b
z.toString
P.aw(null,null,z,new P.iL(this,a))},
e6:function(a,b){var z
this.bt()
z=this.b
z.toString
P.aw(null,null,z,new P.iJ(this,a,b))},
$isa2:1,
static:{cs:function(a,b){var z,y,x,w
b.saY(2)
try{a.b7(new P.iM(b),new P.iN(b))}catch(x){w=H.C(x)
z=w
y=H.M(x)
P.em(new P.iO(b,z,y))}},bx:function(a,b){var z
b.a=2
z=new P.aG(null,b,0,null,null)
if(a.a>=4)P.al(a,z)
else a.bg(z)},al:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.geh()
if(b==null){if(w){v=z.a.gaD()
y=z.a.gar()
x=J.aa(v)
u=v.gY()
y.toString
P.b1(null,null,y,x,u)}return}for(;b.gcm()!=null;b=t){t=b.a
b.a=null
P.al(z.a,b)}x.a=!0
s=w?null:z.a.gew()
x.b=s
x.c=!1
y=!w
if(!y||b.gcO()||b.c===8){r=b.gar()
if(w){u=z.a.gar()
u.toString
if(u==null?r!=null:u!==r){u=u.gbH()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gaD()
y=z.a.gar()
x=J.aa(v)
u=v.gY()
y.toString
P.b1(null,null,y,x,u)
return}q=$.o
if(q==null?r!=null:q!==r)$.o=r
else q=null
if(y){if(b.gcO())x.a=new P.iQ(x,b,s,r).$0()}else new P.iP(z,x,b,r).$0()
if(b.gfh())new P.iR(z,x,w,b,r).$0()
if(q!=null)$.o=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.p(y).$isa2}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.E)if(p.a>=4){o.a=2
z.a=p
b=new P.aG(null,o,0,null,null)
y=p
continue}else P.bx(p,o)
else P.cs(p,o)
return}}o=b.b
b=o.aW()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
iI:{
"^":"d:0;a,b",
$0:function(){P.al(this.a,this.b)}},
iM:{
"^":"d:1;a",
$1:function(a){this.a.cc(a)}},
iN:{
"^":"d:7;a",
$2:function(a,b){this.a.Z(a,b)},
$1:function(a){return this.$2(a,null)}},
iO:{
"^":"d:0;a,b,c",
$0:function(){this.a.Z(this.b,this.c)}},
iK:{
"^":"d:0;a,b",
$0:function(){P.bx(this.b,this.a)}},
iL:{
"^":"d:0;a,b",
$0:function(){this.a.cc(this.b)}},
iJ:{
"^":"d:0;a,b,c",
$0:function(){this.a.Z(this.b,this.c)}},
iQ:{
"^":"d:13;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.b6(this.b.geo(),this.c)
return!0}catch(x){w=H.C(x)
z=w
y=H.M(x)
this.a.b=new P.ad(z,y)
return!1}}},
iP:{
"^":"d:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gaD()
y=!0
r=this.c
if(r.gfi()){x=r.d
try{y=this.d.b6(x,J.aa(z))}catch(q){r=H.C(q)
w=r
v=H.M(q)
r=J.aa(z)
p=w
o=(r==null?p==null:r===p)?z:new P.ad(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.b3()
p=H.ay(p,[p,p]).ai(r)
n=this.d
m=this.b
if(p)m.b=n.fH(u,J.aa(z),z.gY())
else m.b=n.b6(u,J.aa(z))}catch(q){r=H.C(q)
t=r
s=H.M(q)
r=J.aa(z)
p=t
o=(r==null?p==null:r===p)?z:new P.ad(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
iR:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.dd(this.d.gex())
z.a=w
v=w}catch(u){z=H.C(u)
y=z
x=H.M(u)
if(this.c){z=J.aa(this.a.a.gaD())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gaD()
else v.b=new P.ad(y,x)
v.a=!1
return}if(!!J.p(v).$isa2){t=this.d
s=t.gfG(t)
s.sei(!0)
this.b.c=!0
v.b7(new P.iS(this.a,s),new P.iT(z,s))}}},
iS:{
"^":"d:1;a,b",
$1:function(a){P.al(this.a.a,new P.aG(null,this.b,0,null,null))}},
iT:{
"^":"d:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.E)){y=H.f(new P.E(0,$.o,null),[null])
z.a=y
y.eu(a,b)}P.al(z.a,new P.aG(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
dV:{
"^":"a;a,b,c",
eH:function(){return this.a.$0()}},
aj:{
"^":"a;",
aw:function(a,b){return H.f(new P.j5(b,this),[H.W(this,"aj",0),null])},
L:function(a,b){var z,y
z={}
y=H.f(new P.E(0,$.o,null),[null])
z.a=null
z.a=this.am(new P.hJ(z,this,b,y),!0,new P.hK(y),y.gbm())
return y},
gn:function(a){var z,y
z={}
y=H.f(new P.E(0,$.o,null),[P.m])
z.a=0
this.am(new P.hL(z),!0,new P.hM(z,y),y.gbm())
return y},
bV:function(a){var z,y
z=H.f([],[H.W(this,"aj",0)])
y=H.f(new P.E(0,$.o,null),[[P.n,H.W(this,"aj",0)]])
this.am(new P.hN(this,z),!0,new P.hO(z,y),y.gbm())
return y}},
hJ:{
"^":"d;a,b,c,d",
$1:function(a){P.jw(new P.hH(this.c,a),new P.hI(),P.jn(this.a.a,this.d))},
$signature:function(){return H.bB(function(a){return{func:1,args:[a]}},this.b,"aj")}},
hH:{
"^":"d:0;a,b",
$0:function(){return this.a.$1(this.b)}},
hI:{
"^":"d:1;",
$1:function(a){}},
hK:{
"^":"d:0;a",
$0:function(){this.a.ah(null)}},
hL:{
"^":"d:1;a",
$1:function(a){++this.a.a}},
hM:{
"^":"d:0;a,b",
$0:function(){this.b.ah(this.a.a)}},
hN:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.bB(function(a){return{func:1,args:[a]}},this.a,"aj")}},
hO:{
"^":"d:0;a,b",
$0:function(){this.b.ah(this.a)}},
hG:{
"^":"a;"},
lB:{
"^":"a;"},
iv:{
"^":"a;ar:d<,aY:e?",
bQ:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cF()
if((z&4)===0&&(this.e&32)===0)this.cj(this.gco())},
aP:function(a){return this.bQ(a,null)},
d9:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.ga1(z)}else z=!1
if(z)this.r.bc(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cj(this.gcq())}}}},
bA:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bj()
return this.f},
bj:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cF()
if((this.e&32)===0)this.r=null
this.f=this.cn()},
bi:["dP",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cu(a)
else this.bh(new P.iB(a,null))}],
bf:["dQ",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cw(a,b)
else this.bh(new P.iD(a,b,null))}],
e5:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cv()
else this.bh(C.y)},
cp:[function(){},"$0","gco",0,0,2],
cr:[function(){},"$0","gcq",0,0,2],
cn:function(){return},
bh:function(a){var z,y
z=this.r
if(z==null){z=new P.jf(null,null,0)
this.r=z}z.as(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bc(this)}},
cu:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bU(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bk((z&4)!==0)},
cw:function(a,b){var z,y
z=this.e
y=new P.ix(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bj()
z=this.f
if(!!J.p(z).$isa2)z.bY(y)
else y.$0()}else{y.$0()
this.bk((z&4)!==0)}},
cv:function(){var z,y
z=new P.iw(this)
this.bj()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.p(y).$isa2)y.bY(z)
else z.$0()},
cj:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bk((z&4)!==0)},
bk:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.ga1(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.ga1(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cp()
else this.cr()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bc(this)},
e1:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.e4(b,z)
this.c=c}},
ix:{
"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.b3()
x=H.ay(x,[x,x]).ai(y)
w=z.d
v=this.b
u=z.b
if(x)w.fI(u,v,this.c)
else w.bU(u,v)
z.e=(z.e&4294967263)>>>0}},
iw:{
"^":"d:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.de(z.c)
z.e=(z.e&4294967263)>>>0}},
dX:{
"^":"a;b4:a@"},
iB:{
"^":"dX;b,a",
bR:function(a){a.cu(this.b)}},
iD:{
"^":"dX;aH:b>,Y:c<,a",
bR:function(a){a.cw(this.b,this.c)}},
iC:{
"^":"a;",
bR:function(a){a.cv()},
gb4:function(){return},
sb4:function(a){throw H.e(new P.aF("No events after a done."))}},
j7:{
"^":"a;aY:a?",
bc:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.em(new P.j8(this,a))
this.a=1},
cF:function(){if(this.a===1)this.a=3}},
j8:{
"^":"d:0;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.fe(this.b)}},
jf:{
"^":"j7;b,c,a",
ga1:function(a){return this.c==null},
as:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sb4(b)
this.c=b}},
fe:function(a){var z,y
z=this.b
y=z.gb4()
this.b=y
if(y==null)this.c=null
z.bR(a)}},
e1:{
"^":"a;a,b,c,aY:d?",
c8:function(a){this.a=null
this.c=null
this.b=null
this.d=1},
fX:[function(a){var z
if(this.d===2){this.b=a
z=this.c
this.c=null
this.d=0
z.ah(!0)
return}this.a.aP(0)
this.c=a
this.d=3},"$1","gek",2,0,function(){return H.bB(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"e1")}],
en:[function(a,b){var z
if(this.d===2){z=this.c
this.c8(0)
z.Z(a,b)
return}this.a.aP(0)
this.c=new P.ad(a,b)
this.d=4},function(a){return this.en(a,null)},"fZ","$2","$1","gem",2,2,14,0],
fY:[function(){if(this.d===2){var z=this.c
this.c8(0)
z.ah(!1)
return}this.a.aP(0)
this.c=null
this.d=5},"$0","gel",0,0,2]},
jp:{
"^":"d:0;a,b,c",
$0:function(){return this.a.Z(this.b,this.c)}},
jo:{
"^":"d:6;a,b",
$2:function(a,b){return P.jm(this.a,this.b,a,b)}},
cr:{
"^":"aj;",
am:function(a,b,c,d){return this.ea(a,d,c,!0===b)},
cT:function(a,b,c){return this.am(a,null,b,c)},
ea:function(a,b,c,d){return P.iH(this,a,b,c,d,H.W(this,"cr",0),H.W(this,"cr",1))},
ck:function(a,b){b.bi(a)},
$asaj:function(a,b){return[b]}},
dY:{
"^":"iv;x,y,a,b,c,d,e,f,r",
bi:function(a){if((this.e&2)!==0)return
this.dP(a)},
bf:function(a,b){if((this.e&2)!==0)return
this.dQ(a,b)},
cp:[function(){var z=this.y
if(z==null)return
z.aP(0)},"$0","gco",0,0,2],
cr:[function(){var z=this.y
if(z==null)return
z.d9()},"$0","gcq",0,0,2],
cn:function(){var z=this.y
if(z!=null){this.y=null
z.bA()}return},
fT:[function(a){this.x.ck(a,this)},"$1","ged",2,0,function(){return H.bB(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"dY")}],
fV:[function(a,b){this.bf(a,b)},"$2","gef",4,0,15],
fU:[function(){this.e5()},"$0","gee",0,0,2],
e2:function(a,b,c,d,e,f,g){var z,y
z=this.ged()
y=this.gef()
this.y=this.x.a.cT(z,this.gee(),y)},
static:{iH:function(a,b,c,d,e,f,g){var z=$.o
z=H.f(new P.dY(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.e1(b,c,d,e)
z.e2(a,b,c,d,e,f,g)
return z}}},
j5:{
"^":"cr;b,a",
ck:function(a,b){var z,y,x,w,v
z=null
try{z=this.ev(a)}catch(w){v=H.C(w)
y=v
x=H.M(w)
$.o.toString
b.bf(y,x)
return}b.bi(z)},
ev:function(a){return this.b.$1(a)}},
ad:{
"^":"a;aH:a>,Y:b<",
k:function(a){return H.b(this.a)},
$isL:1},
jl:{
"^":"a;"},
jv:{
"^":"d:0;a,b",
$0:function(){var z=this.a
throw H.e(new P.jg(z,P.jh(z,this.b)))}},
ja:{
"^":"jl;",
gbH:function(){return this},
de:function(a){var z,y,x,w
try{if(C.d===$.o){x=a.$0()
return x}x=P.e5(null,null,this,a)
return x}catch(w){x=H.C(w)
z=x
y=H.M(w)
return P.b1(null,null,this,z,y)}},
bU:function(a,b){var z,y,x,w
try{if(C.d===$.o){x=a.$1(b)
return x}x=P.e7(null,null,this,a,b)
return x}catch(w){x=H.C(w)
z=x
y=H.M(w)
return P.b1(null,null,this,z,y)}},
fI:function(a,b,c){var z,y,x,w
try{if(C.d===$.o){x=a.$2(b,c)
return x}x=P.e6(null,null,this,a,b,c)
return x}catch(w){x=H.C(w)
z=x
y=H.M(w)
return P.b1(null,null,this,z,y)}},
by:function(a,b){if(b)return new P.jb(this,a)
else return new P.jc(this,a)},
eD:function(a,b){if(b)return new P.jd(this,a)
else return new P.je(this,a)},
h:function(a,b){return},
dd:function(a){if($.o===C.d)return a.$0()
return P.e5(null,null,this,a)},
b6:function(a,b){if($.o===C.d)return a.$1(b)
return P.e7(null,null,this,a,b)},
fH:function(a,b,c){if($.o===C.d)return a.$2(b,c)
return P.e6(null,null,this,a,b,c)}},
jb:{
"^":"d:0;a,b",
$0:function(){return this.a.de(this.b)}},
jc:{
"^":"d:0;a,b",
$0:function(){return this.a.dd(this.b)}},
jd:{
"^":"d:1;a,b",
$1:function(a){return this.a.bU(this.b,a)}},
je:{
"^":"d:1;a,b",
$1:function(a){return this.a.b6(this.b,a)}}}],["","",,P,{
"^":"",
aD:function(){return H.f(new H.aU(0,null,null,null,null,null,0),[null,null])},
as:function(a){return H.ef(a,H.f(new H.aU(0,null,null,null,null,null,0),[null,null]))},
fO:function(a,b,c){var z,y
if(P.cw(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aK()
y.push(a)
try{P.js(a,z)}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=P.dz(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bd:function(a,b,c){var z,y,x
if(P.cw(a))return b+"..."+c
z=new P.bu(b)
y=$.$get$aK()
y.push(a)
try{x=z
x.a=P.dz(x.gao(),a,", ")}finally{if(0>=y.length)return H.c(y,0)
y.pop()}y=z
y.a=y.gao()+c
y=z.gao()
return y.charCodeAt(0)==0?y:y},
cw:function(a){var z,y
for(z=0;y=$.$get$aK(),z<y.length;++z)if(a===y[z])return!0
return!1},
js:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gM(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.E())return
w=H.b(z.gJ())
b.push(w)
y+=w.length+2;++x}if(!z.E()){if(x<=5)return
if(0>=b.length)return H.c(b,0)
v=b.pop()
if(0>=b.length)return H.c(b,0)
u=b.pop()}else{t=z.gJ();++x
if(!z.E()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.c(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gJ();++x
for(;z.E();t=s,s=r){r=z.gJ();++x
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
bi:function(a,b,c,d,e){return H.f(new H.aU(0,null,null,null,null,null,0),[d,e])},
ar:function(a,b){return P.j0(a,b)},
aE:function(a,b,c,d){return H.f(new P.iY(0,null,null,null,null,null,0),[d])},
c_:function(a){var z,y,x
z={}
if(P.cw(a))return"{...}"
y=new P.bu("")
try{$.$get$aK().push(a)
x=y
x.a=x.gao()+"{"
z.a=!0
J.eI(a,new P.h2(z,y))
z=y
z.a=z.gao()+"}"}finally{z=$.$get$aK()
if(0>=z.length)return H.c(z,0)
z.pop()}z=y.gao()
return z.charCodeAt(0)==0?z:z},
j_:{
"^":"aU;a,b,c,d,e,f,r",
aJ:function(a){return H.k3(a)&0x3ffffff},
aK:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gcP()
if(x==null?b==null:x===b)return y}return-1},
static:{j0:function(a,b){return H.f(new P.j_(0,null,null,null,null,null,0),[a,b])}}},
iY:{
"^":"iU;a,b,c,d,e,f,r",
gM:function(a){var z=new P.dd(this,this.r,null,null)
z.c=this.e
return z},
gn:function(a){return this.a},
eR:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.e9(b)},
e9:function(a){var z=this.d
if(z==null)return!1
return this.aV(z[this.aU(a)],a)>=0},
cU:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.eR(0,a)?a:null
else return this.ej(a)},
ej:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aU(a)]
x=this.aV(y,a)
if(x<0)return
return J.bK(y,x).gcf()},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.Q(this))
z=z.b}},
as:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.c9(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.c9(x,b)}else return this.ad(b)},
ad:function(a){var z,y,x
z=this.d
if(z==null){z=P.iZ()
this.d=z}y=this.aU(a)
x=z[y]
if(x==null)z[y]=[this.bl(a)]
else{if(this.aV(x,a)>=0)return!1
x.push(this.bl(a))}return!0},
a6:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ca(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ca(this.c,b)
else return this.er(b)},
er:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aU(a)]
x=this.aV(y,a)
if(x<0)return!1
this.cb(y.splice(x,1)[0])
return!0},
R:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
c9:function(a,b){if(a[b]!=null)return!1
a[b]=this.bl(b)
return!0},
ca:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cb(z)
delete a[b]
return!0},
bl:function(a){var z,y
z=new P.fZ(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cb:function(a){var z,y
z=a.ge8()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aU:function(a){return J.G(a)&0x3ffffff},
aV:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.D(a[y].gcf(),b))return y
return-1},
$isw:1,
static:{iZ:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fZ:{
"^":"a;cf:a<,b,e8:c<"},
dd:{
"^":"a;a,b,c,d",
gJ:function(){return this.d},
E:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.Q(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
iU:{
"^":"hw;"},
bW:{
"^":"a;",
gM:function(a){return new H.de(a,this.gn(a),0,null)},
af:function(a,b){return this.h(a,b)},
L:function(a,b){var z,y
z=this.gn(a)
for(y=0;y<z;++y){if(y>=a.length)return H.c(a,y)
b.$1(a[y])
if(z!==a.length)throw H.e(new P.Q(a))}},
aw:function(a,b){return H.f(new H.bZ(a,b),[null,null])},
k:function(a){return P.bd(a,"[","]")},
$isn:1,
$asn:null,
$isw:1},
h2:{
"^":"d:16;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
h_:{
"^":"a_;a,b,c,d",
gM:function(a){return new P.j1(this,this.c,this.d,this.b,null)},
L:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.c(x,y)
b.$1(x[y])
if(z!==this.d)H.K(new P.Q(this))}},
ga1:function(a){return this.b===this.c},
gn:function(a){return(this.c-this.b&this.a.length-1)>>>0},
R:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.c(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bd(this,"{","}")},
d8:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bU());++this.d
y=this.a
x=y.length
if(z>=x)return H.c(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ad:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.c(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.ci();++this.d},
ci:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,[H.A(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.c2(y,0,w,z,x)
C.a.c2(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dT:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$isw:1,
static:{bX:function(a,b){var z=H.f(new P.h_(null,0,0,0),[b])
z.dT(a,b)
return z}}},
j1:{
"^":"a;a,b,c,d,e",
gJ:function(){return this.e},
E:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.K(new P.Q(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.c(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
hx:{
"^":"a;",
aw:function(a,b){return H.f(new H.d3(this,b),[H.A(this,0),null])},
k:function(a){return P.bd(this,"{","}")},
L:function(a,b){var z
for(z=this.gM(this);z.E();)b.$1(z.d)},
$isw:1},
hw:{
"^":"hx;"}}],["","",,P,{
"^":"",
bz:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.iX(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.bz(a[z])
return a},
ju:function(a,b){var z,y,x,w
x=a
if(typeof x!=="string")throw H.e(H.S(a))
z=null
try{z=JSON.parse(a)}catch(w){x=H.C(w)
y=x
throw H.e(new P.aC(String(y),null,null))}return P.bz(z)},
iX:{
"^":"a;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.eq(b):y}},
gn:function(a){var z
if(this.b==null){z=this.c
z=z.gn(z)}else z=this.bn().length
return z},
l:function(a,b,c){var z,y
if(this.b==null)this.c.l(0,b,c)
else if(this.a_(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.cD().l(0,b,c)},
a_:function(a){if(this.b==null)return this.c.a_(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
a6:function(a,b){if(this.b!=null&&!this.a_(b))return
return this.cD().a6(0,b)},
L:function(a,b){var z,y,x,w
if(this.b==null)return this.c.L(0,b)
z=this.bn()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.bz(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.e(new P.Q(this))}},
k:function(a){return P.c_(this)},
bn:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
cD:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.aD()
y=this.bn()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.l(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sn(y,0)
this.b=null
this.a=null
this.c=z
return z},
eq:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.bz(this.a[a])
return this.b[a]=z}},
ff:{
"^":"a;"},
ip:{
"^":"ff;a",
bE:function(a,b,c){var z,y,x,w
z=a.length
P.bs(b,c,z,null,null,null)
y=new P.bu("")
x=this.a
w=new P.ji(x,y,!0,0,0,0)
w.bE(a,b,z)
if(w.e>0){if(!x)H.K(new P.aC("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.br(65533)
w.d=0
w.e=0
w.f=0}x=y.a
return x.charCodeAt(0)==0?x:x},
eU:function(a){return this.bE(a,0,null)}},
ji:{
"^":"a;a,b,c,d,e,f",
bE:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.jk(c)
v=new P.jj(this,a,b,c)
$loop$0:for(u=this.b,t=!this.a,s=a.length,r=b;!0;r=n){$multibyte$2:if(y>0){do{if(r===c)break $loop$0
if(r>>>0!==r||r>=s)return H.c(a,r)
q=a[r]
if((q&192)!==128){if(t)throw H.e(new P.aC("Bad UTF-8 encoding 0x"+C.c.b8(q,16),null,null))
this.c=!1
u.a+=H.br(65533)
y=0
break $multibyte$2}else{z=(z<<6|q&63)>>>0;--y;++r}}while(y>0)
p=x-1
if(p<0||p>=4)return H.c(C.v,p)
if(z<=C.v[p]){if(t)throw H.e(new P.aC("Overlong encoding of 0x"+C.c.b8(z,16),null,null))
z=65533
y=0
x=0}if(z>1114111){if(t)throw H.e(new P.aC("Character outside valid Unicode range: 0x"+C.c.b8(z,16),null,null))
z=65533}if(!this.c||z!==65279)u.a+=H.br(z)
this.c=!1}for(;r<c;r=n,z=65533,y=0,x=0){o=w.$2(a,r)
if(J.T(o,0)){this.c=!1
if(typeof o!=="number")return H.B(o)
n=r+o
v.$2(r,n)
if(n===c)break
r=n}n=r+1
if(r>>>0!==r||r>=s)return H.c(a,r)
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
continue $loop$0}if(t)throw H.e(new P.aC("Bad UTF-8 encoding 0x"+C.c.b8(q,16),null,null))
this.c=!1
u.a+=H.br(65533)}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},
jk:{
"^":"d:17;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=a.length,x=b;x<z;++x){if(x<0||x>=y)return H.c(a,x)
w=a[x]
if((w&127)!==w)return x-b}return z-b}},
jj:{
"^":"d:18;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.hP(this.b,a,b)}}}],["","",,P,{
"^":"",
jx:function(a){return H.hQ(a)},
kk:[function(a,b){return J.eA(a,b)},"$2","jN",4,0,27],
bR:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aO(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fq(a)},
fq:function(a){var z=J.p(a)
if(!!z.$isd)return z.k(a)
return H.bq(a)},
bc:function(a){return new P.iG(a)},
bY:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.b6(a);y.E();)z.push(y.gJ())
if(b)return z
z.fixed$length=Array
return z},
a1:function(a){var z=H.b(a)
H.cG(z)},
hP:function(a,b,c){return H.hm(a,b,P.bs(b,c,a.length,null,null,null))},
l6:{
"^":"d:19;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.jx(a)}},
cx:{
"^":"a;"},
"+bool":0,
O:{
"^":"a;"},
bQ:{
"^":"a;fv:a<,b",
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.bQ))return!1
return this.a===b.a&&this.b===b.b},
at:function(a,b){return C.c.at(this.a,b.gfv())},
gD:function(a){return this.a},
k:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.fk(z?H.R(this).getUTCFullYear()+0:H.R(this).getFullYear()+0)
x=P.aQ(z?H.R(this).getUTCMonth()+1:H.R(this).getMonth()+1)
w=P.aQ(z?H.R(this).getUTCDate()+0:H.R(this).getDate()+0)
v=P.aQ(z?H.R(this).getUTCHours()+0:H.R(this).getHours()+0)
u=P.aQ(z?H.R(this).getUTCMinutes()+0:H.R(this).getMinutes()+0)
t=P.aQ(z?H.R(this).getUTCSeconds()+0:H.R(this).getSeconds()+0)
s=P.fl(H.ds(this))
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
dS:function(a,b){if(Math.abs(a)>864e13)throw H.e(P.aP(a))},
$isO:1,
$asO:I.b2,
static:{fj:function(a,b){var z=new P.bQ(a,b)
z.dS(a,b)
return z},fk:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},fl:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},aQ:function(a){if(a>=10)return""+a
return"0"+a}}},
bJ:{
"^":"an;",
$isO:1,
$asO:function(){return[P.an]}},
"+double":0,
ae:{
"^":"a;ap:a<",
m:function(a,b){return new P.ae(C.c.m(this.a,b.gap()))},
O:function(a,b){return new P.ae(C.c.O(this.a,b.gap()))},
t:function(a,b){return new P.ae(C.c.K(this.a*b))},
ag:function(a,b){return C.c.ag(this.a,b.gap())},
an:function(a,b){return C.c.an(this.a,b.gap())},
bb:function(a,b){return C.c.bb(this.a,b.gap())},
u:function(a,b){if(b==null)return!1
if(!(b instanceof P.ae))return!1
return this.a===b.a},
gD:function(a){return this.a&0x1FFFFFFF},
at:function(a,b){return C.c.at(this.a,b.gap())},
k:function(a){var z,y,x,w,v
z=new P.fp()
y=this.a
if(y<0)return"-"+new P.ae(-y).k(0)
x=z.$1(C.c.bS(C.c.aj(y,6e7),60))
w=z.$1(C.c.bS(C.c.aj(y,1e6),60))
v=new P.fo().$1(C.c.bS(y,1e6))
return""+C.c.aj(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isO:1,
$asO:function(){return[P.ae]}},
fo:{
"^":"d:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fp:{
"^":"d:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
L:{
"^":"a;",
gY:function(){return H.M(this.$thrownJsError)}},
dq:{
"^":"L;",
k:function(a){return"Throw of null."}},
ao:{
"^":"L;a,b,c,d",
gbp:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbo:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.b(z)+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gbp()+y+x
if(!this.a)return w
v=this.gbo()
u=P.bR(this.b)
return w+v+": "+H.b(u)},
static:{aP:function(a){return new P.ao(!1,null,null,a)},f0:function(a,b,c){return new P.ao(!0,a,b,c)}}},
ce:{
"^":"ao;e,f,a,b,c,d",
gbp:function(){return"RangeError"},
gbo:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else{if(typeof x!=="number")return x.an()
if(typeof z!=="number")return H.B(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{hn:function(a){return new P.ce(null,null,!1,null,null,a)},aX:function(a,b,c){return new P.ce(null,null,!0,a,b,"Value not in range")},ah:function(a,b,c,d,e){return new P.ce(b,c,!0,a,d,"Invalid value")},bs:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.ah(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.e(P.ah(b,a,c,"end",f))
return b}return c}}},
fC:{
"^":"ao;e,n:f>,a,b,c,d",
gbp:function(){return"RangeError"},
gbo:function(){P.bR(this.e)
var z=": index should be less than "+H.b(this.f)
return J.b4(this.b,0)?": index must not be negative":z},
static:{bT:function(a,b,c,d,e){var z=e!=null?e:J.aN(b)
return new P.fC(b,z,!0,a,c,"Index out of range")}}},
V:{
"^":"L;a",
k:function(a){return"Unsupported operation: "+this.a}},
cl:{
"^":"L;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.b(z):"UnimplementedError"}},
aF:{
"^":"L;a",
k:function(a){return"Bad state: "+this.a}},
Q:{
"^":"L;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bR(z))+"."}},
hb:{
"^":"a;",
k:function(a){return"Out of Memory"},
gY:function(){return},
$isL:1},
dy:{
"^":"a;",
k:function(a){return"Stack Overflow"},
gY:function(){return},
$isL:1},
fi:{
"^":"L;a",
k:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
iG:{
"^":"a;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
aC:{
"^":"a;a,b,S:c>",
k:function(a){var z=""!==this.a?"FormatException: "+this.a:"FormatException"
return z}},
fr:{
"^":"a;a",
k:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z=H.bp(b,"expando$values")
return z==null?null:H.bp(z,this.cg())},
l:function(a,b,c){var z=H.bp(b,"expando$values")
if(z==null){z=new P.a()
H.cd(b,"expando$values",z)}H.cd(z,this.cg(),c)},
cg:function(){var z,y
z=H.bp(this,"expando$key")
if(z==null){y=$.d4
$.d4=y+1
z="expando$key$"+y
H.cd(this,"expando$key",z)}return z}},
ft:{
"^":"a;"},
m:{
"^":"an;",
$isO:1,
$asO:function(){return[P.an]}},
"+int":0,
a_:{
"^":"a;",
aw:function(a,b){return H.bk(this,b,H.W(this,"a_",0),null)},
L:function(a,b){var z
for(z=this.gM(this);z.E();)b.$1(z.gJ())},
bW:function(a,b){return P.bY(this,b,H.W(this,"a_",0))},
bV:function(a){return this.bW(a,!0)},
gn:function(a){var z,y
z=this.gM(this)
for(y=0;z.E();)++y
return y},
af:function(a,b){var z,y,x
if(b<0)H.K(P.ah(b,0,null,"index",null))
for(z=this.gM(this),y=0;z.E();){x=z.gJ()
if(b===y)return x;++y}throw H.e(P.bT(b,this,"index",null,y))},
k:function(a){return P.fO(this,"(",")")}},
fQ:{
"^":"a;"},
n:{
"^":"a;",
$asn:null,
$isw:1},
"+List":0,
h0:{
"^":"a;"},
l7:{
"^":"a;",
k:function(a){return"null"}},
"+Null":0,
an:{
"^":"a;",
$isO:1,
$asO:function(){return[P.an]}},
"+num":0,
a:{
"^":";",
u:function(a,b){return this===b},
gD:function(a){return H.ag(this)},
k:function(a){return H.bq(this)}},
ai:{
"^":"a;"},
a6:{
"^":"a;",
$isO:1,
$asO:function(){return[P.a6]}},
"+String":0,
bu:{
"^":"a;ao:a<",
gn:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{dz:function(a,b,c){var z=J.b6(b)
if(!z.E())return a
if(c.length===0){do a+=H.b(z.gJ())
while(z.E())}else{a+=H.b(z.gJ())
for(;z.E();)a=a+c+H.b(z.gJ())}return a}}},
dA:{
"^":"a;"}}],["","",,W,{
"^":"",
fh:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.I)},
am:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
dZ:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
e3:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.iA(a)
if(!!J.p(z).$isZ)return z
return}else return a},
jr:function(a){if(!!J.p(a).$isd1)return a
return P.jI(a,!0)},
I:function(a){var z=$.o
if(z===C.d)return a
return z.eD(a,!0)},
v:{
"^":"aR;",
$isv:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
kc:{
"^":"v;A:type=",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
ke:{
"^":"v;",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
kf:{
"^":"h;A:type=",
"%":"Blob|File"},
kg:{
"^":"v;",
gbM:function(a){return H.f(new W.x(a,"error",!1),[null])},
gbN:function(a){return H.f(new W.x(a,"load",!1),[null])},
$isZ:1,
$ish:1,
"%":"HTMLBodyElement"},
kh:{
"^":"v;A:type=",
"%":"HTMLButtonElement"},
cV:{
"^":"v;p:height%,q:width%",
bZ:function(a,b,c){return a.getContext(b,P.jF(c))},
dr:function(a,b,c,d,e,f,g){var z,y
z=P.as(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.bZ(a,"webgl",z)
return y==null?this.bZ(a,"experimental-webgl",z):y},
dq:function(a,b){return this.dr(a,!0,!0,!0,!0,!1,b)},
$iscV:1,
"%":"HTMLCanvasElement"},
kj:{
"^":"aV;n:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
kl:{
"^":"fD;n:length=",
c_:function(a,b){var z=this.ec(a,b)
return z!=null?z:""},
ec:function(a,b){if(W.fh(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.fm()+b)},
gp:function(a){return a.height},
gq:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fD:{
"^":"h+fg;"},
fg:{
"^":"a;",
gp:function(a){return this.c_(a,"height")},
gq:function(a){return this.c_(a,"width")}},
d1:{
"^":"aV;",
$isd1:1,
"%":"Document|HTMLDocument|XMLDocument"},
km:{
"^":"aV;",
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
kn:{
"^":"h;",
k:function(a){return String(a)},
"%":"DOMException"},
fn:{
"^":"h;bz:bottom=,p:height=,a2:left=,bT:right=,aA:top=,q:width=,i:x=,j:y=",
k:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gq(a))+" x "+H.b(this.gp(a))},
u:function(a,b){var z,y,x
if(b==null)return!1
z=J.p(b)
if(!z.$isab)return!1
y=a.left
x=z.ga2(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaA(b)
if(y==null?x==null:y===x){y=this.gq(a)
x=z.gq(b)
if(y==null?x==null:y===x){y=this.gp(a)
z=z.gp(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){var z,y,x,w
z=J.G(a.left)
y=J.G(a.top)
x=J.G(this.gq(a))
w=J.G(this.gp(a))
return W.dZ(W.am(W.am(W.am(W.am(0,z),y),x),w))},
gbX:function(a){return H.f(new P.U(a.left,a.top),[null])},
$isab:1,
$asab:I.b2,
"%":";DOMRectReadOnly"},
aR:{
"^":"aV;",
gS:function(a){return P.hp(C.b.K(a.offsetLeft),C.b.K(a.offsetTop),C.b.K(a.offsetWidth),C.b.K(a.offsetHeight),null)},
k:function(a){return a.localName},
dn:function(a){return a.getBoundingClientRect()},
gbM:function(a){return H.f(new W.x(a,"error",!1),[null])},
gbN:function(a){return H.f(new W.x(a,"load",!1),[null])},
gcW:function(a){return H.f(new W.x(a,"mousedown",!1),[null])},
gcX:function(a){return H.f(new W.x(a,"mouseenter",!1),[null])},
gcY:function(a){return H.f(new W.x(a,"mouseleave",!1),[null])},
gcZ:function(a){return H.f(new W.x(a,"mousemove",!1),[null])},
gd_:function(a){return H.f(new W.x(a,"mouseout",!1),[null])},
gd0:function(a){return H.f(new W.x(a,"mouseover",!1),[null])},
gd1:function(a){return H.f(new W.x(a,"mouseup",!1),[null])},
$isaR:1,
$ish:1,
$isZ:1,
"%":";Element"},
ko:{
"^":"v;p:height%,ac:src},A:type=,q:width%",
"%":"HTMLEmbedElement"},
kp:{
"^":"bb;aH:error=",
"%":"ErrorEvent"},
bb:{
"^":"h;A:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
Z:{
"^":"h;",
e4:function(a,b,c,d){return a.addEventListener(b,H.aL(c,1),d)},
es:function(a,b,c,d){return a.removeEventListener(b,H.aL(c,1),d)},
$isZ:1,
"%":"MediaStream;EventTarget"},
kI:{
"^":"v;A:type=",
"%":"HTMLFieldSetElement"},
kL:{
"^":"v;n:length=",
"%":"HTMLFormElement"},
fz:{
"^":"fA;",
h_:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
fB:function(a,b,c){return a.open(b,c)},
bd:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
fA:{
"^":"Z;",
"%":";XMLHttpRequestEventTarget"},
kM:{
"^":"v;p:height%,ac:src},q:width%",
"%":"HTMLIFrameElement"},
d7:{
"^":"v;p:height%,ac:src},q:width%",
b1:function(a,b){return a.complete.$1(b)},
$isd7:1,
"%":"HTMLImageElement"},
kO:{
"^":"v;p:height%,ac:src},A:type=,q:width%",
$isaR:1,
$ish:1,
$isZ:1,
"%":"HTMLInputElement"},
kR:{
"^":"v;A:type=",
"%":"HTMLKeygenElement"},
kS:{
"^":"v;A:type=",
"%":"HTMLLinkElement"},
h3:{
"^":"v;aH:error=,ac:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
kV:{
"^":"v;A:type=",
"%":"HTMLMenuElement"},
kW:{
"^":"v;A:type=",
"%":"HTMLMenuItemElement"},
c1:{
"^":"dT;",
gS:function(a){var z,y
if(!!a.offsetX)return H.f(new P.U(a.offsetX,a.offsetY),[null])
else{if(!J.p(W.e3(a.target)).$isaR)throw H.e(new P.V("offsetX is only supported on elements"))
z=W.e3(a.target)
y=H.f(new P.U(a.clientX,a.clientY),[null]).O(0,J.eR(J.eU(z)))
return H.f(new P.U(J.cR(y.a),J.cR(y.b)),[null])}},
$isc1:1,
$isa:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
l5:{
"^":"h;",
$ish:1,
"%":"Navigator"},
aV:{
"^":"Z;",
k:function(a){var z=a.nodeValue
return z==null?this.dN(a):z},
"%":"Attr;Node"},
l8:{
"^":"v;A:type=",
"%":"HTMLOListElement"},
l9:{
"^":"v;p:height%,A:type=,q:width%",
"%":"HTMLObjectElement"},
la:{
"^":"v;A:type=",
"%":"HTMLOutputElement"},
aW:{
"^":"bb;",
$isaW:1,
$isa:1,
"%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
ld:{
"^":"v;ac:src},A:type=",
"%":"HTMLScriptElement"},
lf:{
"^":"v;n:length=,A:type=",
"%":"HTMLSelectElement"},
lg:{
"^":"v;ac:src},A:type=",
"%":"HTMLSourceElement"},
lh:{
"^":"bb;aH:error=",
"%":"SpeechRecognitionError"},
lj:{
"^":"v;A:type=",
"%":"HTMLStyleElement"},
ln:{
"^":"v;A:type=",
"%":"HTMLTextAreaElement"},
cj:{
"^":"h;",
$isa:1,
"%":"Touch"},
ck:{
"^":"dT;eI:changedTouches=",
$isck:1,
$isa:1,
"%":"TouchEvent"},
lp:{
"^":"fF;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.bT(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.e(new P.V("Cannot assign element of immutable List."))},
af:function(a,b){if(b<0||b>=a.length)return H.c(a,b)
return a[b]},
$isn:1,
$asn:function(){return[W.cj]},
$isw:1,
$isbg:1,
$isbe:1,
"%":"TouchList"},
fE:{
"^":"h+bW;",
$isn:1,
$asn:function(){return[W.cj]},
$isw:1},
fF:{
"^":"fE+fB;",
$isn:1,
$asn:function(){return[W.cj]},
$isw:1},
lq:{
"^":"v;ac:src}",
"%":"HTMLTrackElement"},
dT:{
"^":"bb;",
"%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
dU:{
"^":"h3;p:height%,q:width%",
$isdU:1,
"%":"HTMLVideoElement"},
lu:{
"^":"Z;",
$ish:1,
$isZ:1,
"%":"DOMWindow|Window"},
ly:{
"^":"h;bz:bottom=,p:height=,a2:left=,bT:right=,aA:top=,q:width=",
k:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
u:function(a,b){var z,y,x
if(b==null)return!1
z=J.p(b)
if(!z.$isab)return!1
y=a.left
x=z.ga2(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaA(b)
if(y==null?x==null:y===x){y=a.width
x=z.gq(b)
if(y==null?x==null:y===x){y=a.height
z=z.gp(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){var z,y,x,w
z=J.G(a.left)
y=J.G(a.top)
x=J.G(a.width)
w=J.G(a.height)
return W.dZ(W.am(W.am(W.am(W.am(0,z),y),x),w))},
gbX:function(a){return H.f(new P.U(a.left,a.top),[null])},
$isab:1,
$asab:I.b2,
"%":"ClientRect"},
lz:{
"^":"aV;",
$ish:1,
"%":"DocumentType"},
lA:{
"^":"fn;",
gp:function(a){return a.height},
gq:function(a){return a.width},
gi:function(a){return a.x},
si:function(a,b){a.x=b},
gj:function(a){return a.y},
sj:function(a,b){a.y=b},
"%":"DOMRect"},
lD:{
"^":"v;",
$isZ:1,
$ish:1,
"%":"HTMLFrameSetElement"},
cq:{
"^":"aj;a,b,c",
am:function(a,b,c,d){var z=new W.H(0,this.a,this.b,W.I(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.H()
return z},
cT:function(a,b,c){return this.am(a,null,b,c)}},
x:{
"^":"cq;a,b,c"},
H:{
"^":"hG;a,b,c,d,e",
bA:function(){if(this.b==null)return
this.cC()
this.b=null
this.d=null
return},
bQ:function(a,b){if(this.b==null)return;++this.a
this.cC()},
aP:function(a){return this.bQ(a,null)},
d9:function(){if(this.b==null||this.a<=0)return;--this.a
this.H()},
H:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.eq(x,this.c,z,this.e)}},
cC:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.er(x,this.c,z,this.e)}}},
fB:{
"^":"a;",
gM:function(a){return new W.fs(a,this.gn(a),-1,null)},
$isn:1,
$asn:null,
$isw:1},
fs:{
"^":"a;a,b,c,d",
E:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.bK(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gJ:function(){return this.d}},
iz:{
"^":"a;a",
$isZ:1,
$ish:1,
static:{iA:function(a){if(a===window)return a
else return new W.iz(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ka:{
"^":"aq;",
$ish:1,
"%":"SVGAElement"},
kb:{
"^":"hR;",
$ish:1,
"%":"SVGAltGlyphElement"},
kd:{
"^":"r;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
kq:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEBlendElement"},
kr:{
"^":"r;A:type=,p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
ks:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
kt:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFECompositeElement"},
ku:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
kv:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
kw:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
kx:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEFloodElement"},
ky:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
kz:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEImageElement"},
kA:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEMergeElement"},
kB:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEMorphologyElement"},
kC:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFEOffsetElement"},
kD:{
"^":"r;i:x=,j:y=",
"%":"SVGFEPointLightElement"},
kE:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
kF:{
"^":"r;i:x=,j:y=",
"%":"SVGFESpotLightElement"},
kG:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFETileElement"},
kH:{
"^":"r;A:type=,p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFETurbulenceElement"},
kJ:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGFilterElement"},
kK:{
"^":"aq;p:height=,q:width=,i:x=,j:y=",
"%":"SVGForeignObjectElement"},
fy:{
"^":"aq;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
aq:{
"^":"r;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
kN:{
"^":"aq;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGImageElement"},
kT:{
"^":"r;",
$ish:1,
"%":"SVGMarkerElement"},
kU:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGMaskElement"},
lb:{
"^":"r;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGPatternElement"},
lc:{
"^":"fy;p:height=,q:width=,i:x=,j:y=",
"%":"SVGRectElement"},
le:{
"^":"r;A:type=",
$ish:1,
"%":"SVGScriptElement"},
lk:{
"^":"r;A:type=",
"%":"SVGStyleElement"},
r:{
"^":"aR;",
gbM:function(a){return H.f(new W.x(a,"error",!1),[null])},
gbN:function(a){return H.f(new W.x(a,"load",!1),[null])},
gcW:function(a){return H.f(new W.x(a,"mousedown",!1),[null])},
gcX:function(a){return H.f(new W.x(a,"mouseenter",!1),[null])},
gcY:function(a){return H.f(new W.x(a,"mouseleave",!1),[null])},
gcZ:function(a){return H.f(new W.x(a,"mousemove",!1),[null])},
gd_:function(a){return H.f(new W.x(a,"mouseout",!1),[null])},
gd0:function(a){return H.f(new W.x(a,"mouseover",!1),[null])},
gd1:function(a){return H.f(new W.x(a,"mouseup",!1),[null])},
$isZ:1,
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
ll:{
"^":"aq;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGSVGElement"},
lm:{
"^":"r;",
$ish:1,
"%":"SVGSymbolElement"},
dC:{
"^":"aq;",
"%":";SVGTextContentElement"},
lo:{
"^":"dC;",
$ish:1,
"%":"SVGTextPathElement"},
hR:{
"^":"dC;i:x=,j:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
lr:{
"^":"aq;p:height=,q:width=,i:x=,j:y=",
$ish:1,
"%":"SVGUseElement"},
ls:{
"^":"r;",
$ish:1,
"%":"SVGViewElement"},
lC:{
"^":"r;",
$ish:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
lE:{
"^":"r;",
$ish:1,
"%":"SVGCursorElement"},
lF:{
"^":"r;",
$ish:1,
"%":"SVGFEDropShadowElement"},
lG:{
"^":"r;",
$ish:1,
"%":"SVGGlyphRefElement"},
lH:{
"^":"r;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
hs:{
"^":"h;",
eB:function(a,b,c){return a.bindBuffer(b,c)},
eC:function(a,b,c){return a.bindTexture(b,c)},
eE:function(a,b){return a.blendEquation(b)},
eF:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
eG:function(a,b,c,d){return a.bufferData(b,c,d)},
eJ:function(a,b){return a.clear(b)},
eK:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
eL:function(a,b){return a.clearDepth(b)},
eO:function(a,b){return a.clearStencil(b)},
eQ:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
eV:function(a){return a.createBuffer()},
eW:function(a){return a.createProgram()},
eX:function(a,b){return a.createShader(b)},
eY:function(a){return a.createTexture()},
eZ:function(a,b){return a.depthFunc(b)},
f_:function(a,b){return a.depthMask(b)},
f6:function(a,b){return a.disableVertexAttribArray(b)},
f7:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
fa:function(a,b){return a.enable(b)},
fb:function(a,b){return a.enableVertexAttribArray(b)},
dm:function(a,b,c){return a.getAttribLocation(b,c)},
dt:function(a,b){return a.getParameter(b)},
dv:function(a,b,c){return a.getUniformLocation(b,c)},
dJ:function(a,b,c,d){return a.stencilFunc(b,c,d)},
dK:function(a,b,c,d){return a.stencilOp(b,c,d)},
fK:function(a,b,c,d,e,f,g,h,i,j){var z,y
if(g==null)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,P.jH(g))
return}z=J.p(g)
if(!!z.$isd7)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscV)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdU)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.e(P.aP("Incorrect number or type of arguments"))},
fJ:function(a,b,c,d,e,f,g){return this.fK(a,b,c,d,e,f,g,null,null,null)},
fL:function(a,b,c,d){return a.texParameteri(b,c,d)},
fO:function(a,b){return a.useProgram(b)},
fP:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
ki:{
"^":"a;"}}],["","",,P,{
"^":"",
aH:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
e_:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
iW:{
"^":"a;",
fz:function(a){if(a<=0||a>4294967296)throw H.e(P.hn("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
U:{
"^":"a;i:a>,j:b>",
k:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
u:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.U))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gD:function(a){var z,y
z=J.G(this.a)
y=J.G(this.b)
return P.e_(P.aH(P.aH(0,z),y))},
m:function(a,b){var z,y,x
z=this.a
y=J.j(b)
x=y.gi(b)
if(typeof z!=="number")return z.m()
x=C.b.m(z,x)
z=this.b
y=y.gj(b)
if(typeof z!=="number")return z.m()
y=new P.U(x,C.b.m(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
O:function(a,b){var z,y,x,w
z=this.a
y=J.eT(b)
if(typeof z!=="number")return z.O()
if(typeof y!=="number")return H.B(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.O()
if(typeof w!=="number")return H.B(w)
w=new P.U(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w}},
j9:{
"^":"a;",
gbT:function(a){return this.ga2(this)+this.c},
gbz:function(a){return this.gaA(this)+this.d},
k:function(a){return"Rectangle ("+this.ga2(this)+", "+this.b+") "+this.c+" x "+this.d},
u:function(a,b){var z,y
if(b==null)return!1
z=J.p(b)
if(!z.$isab)return!1
if(this.ga2(this)===z.ga2(b)){y=this.b
z=y===z.gaA(b)&&this.a+this.c===z.gbT(b)&&y+this.d===z.gbz(b)}else z=!1
return z},
gD:function(a){var z=this.b
return P.e_(P.aH(P.aH(P.aH(P.aH(0,this.ga2(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))},
gbX:function(a){var z=new P.U(this.ga2(this),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
ab:{
"^":"j9;a2:a>,aA:b>,q:c>,p:d>",
$asab:null,
static:{hp:function(a,b,c,d,e){var z=c<0?-c*0:c
return H.f(new P.ab(a,b,z,d<0?-d*0:d),[e])}}}}],["","",,H,{
"^":"",
i:function(a){return a},
bA:function(a){return a},
dj:{
"^":"h;",
eA:function(a,b,c){return new Uint8Array(a,b)},
ez:function(a){return this.eA(a,0,null)},
$isdj:1,
"%":"ArrayBuffer"},
c4:{
"^":"h;",
$isc4:1,
"%":"DataView;ArrayBufferView;c2|dk|dm|c3|dl|dn|af"},
c2:{
"^":"c4;",
gn:function(a){return a.length},
$isbg:1,
$isbe:1},
c3:{
"^":"dm;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
return a[b]},
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
a[b]=c}},
dk:{
"^":"c2+bW;",
$isn:1,
$asn:function(){return[P.bJ]},
$isw:1},
dm:{
"^":"dk+d5;"},
af:{
"^":"dn;",
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
a[b]=c},
$isn:1,
$asn:function(){return[P.m]},
$isw:1},
dl:{
"^":"c2+bW;",
$isn:1,
$asn:function(){return[P.m]},
$isw:1},
dn:{
"^":"dl+d5;"},
kX:{
"^":"c3;",
$isn:1,
$asn:function(){return[P.bJ]},
$isw:1,
"%":"Float32Array"},
kY:{
"^":"c3;",
$isn:1,
$asn:function(){return[P.bJ]},
$isw:1,
"%":"Float64Array"},
kZ:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.m]},
$isw:1,
"%":"Int16Array"},
l_:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.m]},
$isw:1,
"%":"Int32Array"},
l0:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.m]},
$isw:1,
"%":"Int8Array"},
l1:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.m]},
$isw:1,
"%":"Uint16Array"},
l2:{
"^":"af;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.m]},
$isw:1,
"%":"Uint32Array"},
l3:{
"^":"af;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.m]},
$isw:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
l4:{
"^":"af;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.J(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.m]},
$isw:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
cG:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,F,{
"^":"",
h6:{
"^":"a0;e,f,a,b,c,d"},
ht:{
"^":"a0;e,f,r,a,b,c,d",
T:function(a){var z=0,y=new P.Y(),x=1,w,v=[],u=this,t,s,r,q,p,o,n,m,l
function $async$T(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:x=3
n=u
n=n.f
z=6
return H.l(n.U("assets/bg_clear01.png"),$async$T,y)
case 6:x=1
z=5
break
case 3:x=2
r=w
n=H
n.C(r)
z=5
break
case 2:z=1
break
case 5:x=8
n=u
n=n.f
z=11
return H.l(n.U("assets/bg_start.png"),$async$T,y)
case 11:x=1
z=10
break
case 8:x=7
q=w
n=H
n.C(q)
z=10
break
case 7:z=1
break
case 10:x=13
n=u
s=n.f
n=s
z=16
return H.l(n.aL("assets/se_play.json"),$async$T,y)
case 16:n=s
z=17
return H.l(n.U("assets/se_play.png"),$async$T,y)
case 17:x=1
z=15
break
case 13:x=12
p=w
n=H
n.C(p)
z=15
break
case 12:z=1
break
case 15:x=19
n=u
s=n.f
n=s
z=22
return H.l(n.U("assets/se_setting.png"),$async$T,y)
case 22:n=s
z=23
return H.l(n.aL("assets/se_setting.json"),$async$T,y)
case 23:x=1
z=21
break
case 19:x=18
o=w
n=H
n.C(o)
z=21
break
case 18:z=1
break
case 21:n=u
n=n.e
z=24
return H.l(n.ae(),$async$T,y)
case 24:n=u
s=n.e
n=s
n=n
m=F
m=m
l=u
z=25
return H.l(n.w(m.hC(l.f,s)),$async$T,y)
case 25:return H.l(null,0,y,null)
case 1:return H.l(w,1,y)}}return H.l(null,$async$T,y,null)},
V:function(a,b){var z,y
z=100+C.B.c0(++this.r/2,10)*5
y=-z/2
b.au(a,new F.z(y+200,y+150,z,z),F.a8(F.k(170,255,170,170)))}},
f5:{
"^":"a0;e,f,r,x,y,z,Q,a,b,c,d",
d2:[function(a){P.a1("touch # "+a)
this.f.ae().a7(new F.f8(this))},"$1","gaO",2,0,3],
ax:function(a,b,c,d,e,f,g){return!1},
V:function(a,b){var z=this.e
if(z!=null)b.aG(a,z,this.x,this.y,this.z)},
dR:function(a,b){var z,y,x,w,v,u
this.r.U("assets/bg_clear01.png").a7(new F.f7(this))
z=this.gaO()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
u=new F.a7(200,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
v.G(0,100,200,0)
this.w(u)},
static:{f6:function(a,b){var z,y
z=F.a8(null)
y=new E.q(new Float64Array(H.i(16)))
y.v()
y=new F.f5(null,b,a,null,null,z,!1,"none",null,y,!1)
y.b=[]
y.dR(a,b)
return y}}},
f7:{
"^":"d:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.z(0,0,J.P(a.gN()),J.P(z.e.ga0()))
z.y=new F.z(0,0,400,300)}},
f8:{
"^":"d:1;a",
$1:function(a){var z,y
z=this.a
y=z.f
y.w(F.dr(z.r,y))}},
hB:{
"^":"a0;e,f,r,x,y,z,Q,a,b,c,d",
d2:[function(a){P.a1("touch # "+a)
this.f.ae().a7(new F.hE(this))},"$1","gaO",2,0,3],
ax:function(a,b,c,d,e,f,g){return!1},
V:function(a,b){var z=this.e
if(z!=null)b.aG(a,z,this.x,this.y,this.z)},
dX:function(a,b){var z,y,x,w,v,u
this.r.U("assets/bg_start.png").a7(new F.hD(this))
z=this.gaO()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
u=new F.a7(200,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
v.G(0,100,200,0)
this.w(u)},
static:{hC:function(a,b){var z,y
z=F.a8(null)
y=new E.q(new Float64Array(H.i(16)))
y.v()
y=new F.hB(null,b,a,null,null,z,!1,"none",null,y,!1)
y.b=[]
y.dX(a,b)
return y}}},
hD:{
"^":"d:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.z(0,0,J.P(a.gN()),J.P(z.e.ga0()))
z.y=new F.z(0,0,400,300)}},
hE:{
"^":"d:1;a",
$1:function(a){var z,y
z=this.a
y=z.f
y.w(F.dr(z.r,y))}},
h7:{
"^":"a;a,b,c,d",
R:function(a){var z,y,x,w,v,u,t
for(z=this.c,y=z+1,x=this.b+2,w=x-1,v=0;v<y;++v)for(u=v===z,t=0;t<x;++t)if(t===0||t===w||u)this.P(t,v).a=C.q
else this.P(t,v).a=C.e},
P:function(a,b){var z,y
if(typeof a!=="number")return a.ag()
if(!(a<0)){z=this.c+1
if(!(a>z)){y=J.az(b)
z=y.ag(b,0)||y.an(b,z)}else z=!0}else z=!0
if(z)return this.d
z=this.a
y=J.ep(b,this.b+2)
if(typeof y!=="number")return H.B(y)
y=a+y
if(y>>>0!==y||y>=z.length)return H.c(z,y)
return z[y]},
eP:function(){var z,y,x,w,v,u
z=[]
for(y=this.c+1-1,x=this.b+2-1,w=0;w<y;++w){u=1
while(!0){if(!(u<x)){v=!0
break}if(this.P(u,w).a===C.e){v=!1
break}++u}if(v)z.push(w)}C.a.c4(z)
return z},
eN:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.N)(a),++y)this.eM(a[y])},
eM:function(a){var z,y,x,w
for(z=this.b+2-1,y=a;x=J.az(y),x.bb(y,0);y=x.O(y,1))for(w=1;w<z;++w)if(this.P(w,x.O(y,1)).a===C.p)this.P(w,y).a=C.e
else this.P(w,y).a=this.P(w,x.O(y,1)).a},
dU:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.c,y=z+1,x=this.b+2,w=this.a,v=x-1,u=0;u<y;++u)for(t=u===z,s=0;s<x;++s)if(s===0||s===v||t)w.push(new F.bl(C.q))
else w.push(new F.bl(C.e))},
static:{dh:function(a,b){var z=new F.h7([],b,a,new F.bl(C.p))
z.dU(a,b)
return z}}},
h4:{
"^":"a;a,b,c,d,e,f,r,x,y,z",
cV:function(){var z,y
z=this.b
if(z.length>0)C.a.d7(z,0)
for(;z.length<3;){y=F.h9()
y.a=(this.a.b+2)/2|0
y.b=0
z.push(y)}},
cM:function(a,b){var z,y,x
if(!b){z=this.r
y=$.$get$bm()
x=this.e
if(x>=5)return H.c(y,x)
x=z+y[x]/2<a
z=x}else z=!0
if(z){this.r=a
this.cL()}},
cL:function(){var z,y,x,w
if(!this.bL(0,1)){z=this.b
if(1>=z.length)return H.c(z,1)
if(this.b0(z[1])){this.c=!0
z=this.z
z.push(this.d)
C.a.c4(z)
if(z.length>3)C.a.d7(z,0)}this.cV()
y=this.a.eP()
z=y.length
if(z>0){x=this.d
w=(this.e+1)*20
H.a3(w)
H.a3(z)
z=x+Math.pow(w,z)
this.d=z
P.a1(H.b(z))}this.a.eN(y)}},
bL:function(a,b){var z,y,x
z=this.b
this.a9(C.a.gF(z),!1)
y=C.a.gF(z)
y.a=J.y(y.a,a)
y=C.a.gF(z)
y.b=J.y(y.b,b)
if(this.b0(C.a.gF(z))){y=C.a.gF(z)
x=y.a
if(typeof x!=="number")return x.O()
y.a=x-a
x=C.a.gF(z)
y=x.b
if(typeof y!=="number")return y.O()
x.b=y-b
this.a9(C.a.gF(z),!0)
return!1}else{this.a9(C.a.gF(z),!0)
return!0}},
b0:function(a){var z,y,x,w,v
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x){w=z[x]
v=J.j(w)
v=this.a.P(J.y(a.a,v.gi(w)),J.y(a.b,v.gj(w))).a
if(!(v===C.e||v===C.p))return!0}return!1},
a9:function(a,b){var z,y,x,w,v,u
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x){w=z[x]
v=J.j(w)
u=this.a.P(J.y(a.a,v.gi(w)),J.y(a.b,v.gj(w)))
if(u.a!==C.p)if(b)u.a=v.gA(w)
else u.a=C.e}}},
a5:{
"^":"a;a",
k:function(a){return C.J.h(0,this.a)}},
at:{
"^":"a;i:a*,j:b*,c",
dc:function(){var z,y,x,w,v,u,t
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x){w=z[x]
v=J.j(w)
u=v.gi(w)
t=v.gj(w)
if(typeof t!=="number")return H.B(t)
v.si(w,-1*t)
v.sj(w,u)}},
da:function(){var z,y,x,w,v,u
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x){w=z[x]
v=J.j(w)
u=v.gi(w)
v.si(w,v.gj(w))
if(typeof u!=="number")return H.B(u)
v.sj(w,-1*u)}},
static:{h9:function(){switch($.$get$di().fz(7)){case 0:var z=[]
z.push(new F.u(0,0,C.h))
z.push(new F.u(-1,0,C.h))
z.push(new F.u(1,0,C.h))
z.push(new F.u(2,0,C.h))
return new F.at(0,0,z)
case 1:z=[]
z.push(new F.u(0,0,C.i))
z.push(new F.u(1,0,C.i))
z.push(new F.u(0,-1,C.i))
z.push(new F.u(1,-1,C.i))
return new F.at(0,0,z)
case 2:z=[]
z.push(new F.u(0,0,C.j))
z.push(new F.u(1,0,C.j))
z.push(new F.u(0,-1,C.j))
z.push(new F.u(-1,-1,C.j))
return new F.at(0,0,z)
case 3:z=[]
z.push(new F.u(0,0,C.k))
z.push(new F.u(-1,0,C.k))
z.push(new F.u(0,-1,C.k))
z.push(new F.u(1,-1,C.k))
return new F.at(0,0,z)
case 4:z=[]
z.push(new F.u(1,0,C.n))
z.push(new F.u(1,-1,C.n))
z.push(new F.u(0,0,C.n))
z.push(new F.u(-1,0,C.n))
return new F.at(0,0,z)
case 5:z=[]
z.push(new F.u(-1,0,C.l))
z.push(new F.u(-1,-1,C.l))
z.push(new F.u(0,0,C.l))
z.push(new F.u(1,0,C.l))
return new F.at(0,0,z)
case 6:z=[]
z.push(new F.u(-1,0,C.m))
z.push(new F.u(0,-1,C.m))
z.push(new F.u(0,0,C.m))
z.push(new F.u(1,0,C.m))
return new F.at(0,0,z)
case 7:H.cG("#### WARNING")
break}}}},
u:{
"^":"bl;i:b*,j:c*,a"},
bl:{
"^":"a;A:a>"},
h8:{
"^":"a0;e,f,a,b,c,d",
V:function(a,b){var z,y,x,w,v,u
z=new F.z(0,0,7,7)
y=F.a8(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.P(v,x).a
if(u===C.q)y.a=$.$get$c6()
else if(u===C.e)y.a=$.$get$c5()
else if(u===C.h)y.a=$.$get$c8()
else if(u===C.i)y.a=$.$get$bo()
else if(u===C.m)y.a=$.$get$ca()
else if(u===C.j)y.a=$.$get$c9()
else if(u===C.k)y.a=$.$get$cb()
else if(u===C.l)y.a=$.$get$c7()
else if(u===C.n)y.a=$.$get$bn()
else y.a=$.$get$bn()
if(y.b===C.f)b.bF(a,z,y)
else b.bG(a,z,y)}}},
h5:{
"^":"a0;e,f,a,b,c,d",
dG:function(a){var z,y,x,w,v,u,t,s,r
this.f.R(0)
for(z=a.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x){w=z[x]
v=this.f
u=J.j(w)
t=u.gi(w)
if(typeof t!=="number")return H.B(t)
s=u.gj(w)
if(typeof s!=="number")return H.B(s)
r=v.P(3+t,3+s)
if(r.a!==C.p)r.a=u.gA(w)}},
V:function(a,b){var z,y,x,w,v,u
z=new F.z(0,0,7,7)
y=F.a8(null)
y.b=C.f
y.c=1
for(x=0;x<this.f.c+1;++x)for(w=x*8,v=0;u=this.f,v<u.b+2;++v){z.a=v*8
z.b=w
u=u.P(v,x).a
if(u===C.q)y.a=$.$get$c6()
else if(u===C.e)y.a=$.$get$c5()
else if(u===C.h)y.a=$.$get$c8()
else if(u===C.i)y.a=$.$get$bo()
else if(u===C.m)y.a=$.$get$ca()
else if(u===C.j)y.a=$.$get$c9()
else if(u===C.k)y.a=$.$get$cb()
else if(u===C.l)y.a=$.$get$c7()
else if(u===C.n)y.a=$.$get$bn()
else y.a=$.$get$bo()
if(y.b===C.f)b.bF(a,z,y)
else b.bG(a,z,y)}}},
hd:{
"^":"a0;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b,c,d",
bO:function(a,b){var z,y,x,w,v
z=this.r
this.cx.r=z.d
this.cy.r=z.e
y=z.b
x=y.length
if(x>1&&!0){w=this.ch
if(1>=x)return H.c(y,1)
w.dG(y[1])}x=z.y
w=$.$get$dg()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.y=b
z.cL()}x=this.x
x=x.z/x.r
if(x>0.5){x=z.r
w=$.$get$bm()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.r=b
z.bL(1,0)}}else if(x<-0.5){x=z.r
w=$.$get$bm()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.r=b
z.bL(-1,0)}}x=this.x
x=-x.Q/x.r
if(x<-0.5)z.cM(b,!1)
else if(x>0.6)z.cM(b,!0)
if(this.y.r){x=z.x
w=$.$get$c0()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.x=b
z.a9(C.a.gF(y),!1)
C.a.gF(y).dc()
if(z.b0(C.a.gF(y))){C.a.gF(y).da()
z.a9(C.a.gF(y),!0)}else z.a9(C.a.gF(y),!0)}}else if(this.z.r){x=z.x
w=$.$get$c0()
v=z.e
if(v>=5)return H.c(w,v)
if(x+w[v]<b){z.x=b
z.a9(C.a.gF(y),!1)
C.a.gF(y).dc()
if(z.b0(C.a.gF(y))){C.a.gF(y).da()
z.a9(C.a.gF(y),!0)}else z.a9(C.a.gF(y),!0)}}if(z.c)this.f.ae().a7(new F.hh(this))},
d4:[function(a){},"$1","gd3",2,0,3],
dV:function(a,b,c,d){var z,y,x,w,v
z=this.gd3()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
v=new F.a7(40,40,!1,!1,"r",y,x,w,z,0,0,0,0,"none",null,v,!1)
v.b=[]
this.y=v
z=this.gd3()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
v=new F.a7(40,40,!1,!1,"l",y,x,w,z,0,0,0,0,"none",null,v,!1)
v.b=[]
this.z=v
z=new E.q(new Float64Array(H.i(16)))
z.v()
z=new F.i2("joystick",70,35,!1,0,0,0,"none",null,z,!1)
z.b=[]
this.x=z
z=this.e
y=this.r
x=y.a
w=new E.q(new Float64Array(H.i(16)))
w.v()
w=new F.h8(z,x,"none",null,w,!1)
w.b=[]
this.Q=w
x=new E.q(new Float64Array(H.i(16)))
x.v()
x=new F.h5(z,null,"none",null,x,!1)
x.b=[]
x.f=F.dh(5,5)
this.ch=x
x=this.db
w=this.dx
v=new E.q(new Float64Array(H.i(16)))
v.v()
v=new F.aY(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cx=v
x=this.db
w=this.dx
v=new E.q(new Float64Array(H.i(16)))
v.v()
v=new F.aY(x,w,0,7,"none",null,v,!1)
v.b=[]
this.cy=v
v.x=3
this.w(this.Q)
this.w(this.x)
this.w(this.y)
this.w(this.z)
this.w(this.ch)
this.w(this.cx)
this.w(this.cy)
this.Q.c.G(0,100,25,0)
this.x.c.G(0,100,250,0)
this.y.c.G(0,250,225,0)
this.z.c.G(0,300,225,0)
this.ch.c.G(0,225,153,0)
this.cx.c.G(0,225,50,0)
this.cy.c.G(0,225,85,0)
z.U("assets/se_play.png").a7(new F.hf(this))
z.aM("assets/se_play.json").a7(new F.hg(this))
y.f=d
y.e=d
P.a1("### game =  "+d)},
static:{he:function(a,b,c,d){var z=new E.q(new Float64Array(H.i(16)))
z.v()
z=new F.hd(a,b,c,null,null,null,null,null,null,null,null,null,"none",null,z,!1)
z.b=[]
z.dV(a,b,c,d)
return z}}},
hf:{
"^":"d:20;a",
$1:function(a){var z=this.a
z.dx=a
z.cx.f=a
z.cy.f=a}},
hg:{
"^":"d:3;a",
$1:function(a){var z,y
z=this.a
y=new F.dx(a,[])
y.d6(a)
z.db=y
z.cx.e=y
z.cy.e=y}},
hh:{
"^":"d:1;a",
$1:function(a){var z,y
z=this.a
y=z.f
y.w(F.f6(z.e,y))}},
hi:{
"^":"a0;e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
fA:[function(a){P.a1("touch # "+a)
switch(a){case"L01":this.dx=120
this.dy=60
this.ch=0
break
case"L02":this.dx=175
this.dy=60
this.ch=1
break
case"L03":this.dx=215
this.dy=60
this.ch=2
break
case"L04":this.dx=265
this.dy=60
this.ch=3
break
case"L05":this.dx=315
this.dy=60
this.ch=4
break}},"$1","gaN",2,0,3],
d2:[function(a){P.a1("touch # "+a)
this.f.ae().a7(new F.hl(this))},"$1","gaO",2,0,3],
ax:function(a,b,c,d,e,f,g){return!1},
V:function(a,b){var z,y
z=this.e
if(z!=null&&this.Q!=null){y=this.z
b.aG(a,z,this.Q.bI("BG001.png").gbe(),this.y,y)
b.aG(a,this.e,this.Q.bI("CH001.png").gbe(),new F.z(this.dx,this.dy,35,35),y)}z=this.cx
y=this.f.f.z
if(2>=y.length)return H.c(y,2)
z.r=y[2]
this.cy.r=y[1]
this.db.r=y[0]},
dW:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
z.U("assets/se_setting.png").a7(new F.hj(this))
z.aM("assets/se_setting.json").a7(new F.hk(this))
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
u=new F.a7(45,45,!1,!1,"L01",y,x,w,z,0,0,0,0,"none",null,v,!1)
u.b=[]
u.z=F.k(0,255,255,255)
v.G(0,120,50,0)
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
t=new F.a7(45,45,!1,!1,"L02",y,x,w,z,0,0,0,0,"none",null,v,!1)
t.b=[]
t.z=F.k(0,255,255,255)
v.G(0,175,50,0)
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
s=new F.a7(45,45,!1,!1,"L03",y,x,w,z,0,0,0,0,"none",null,v,!1)
s.b=[]
s.z=F.k(0,255,255,255)
v.G(0,215,50,0)
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
r=new F.a7(45,45,!1,!1,"L04",y,x,w,z,0,0,0,0,"none",null,v,!1)
r.b=[]
r.z=F.k(0,255,255,255)
v.G(0,265,50,0)
z=this.gaN()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
q=new F.a7(45,45,!1,!1,"L05",y,x,w,z,0,0,0,0,"none",null,v,!1)
q.b=[]
q.z=F.k(0,255,255,255)
v.G(0,315,50,0)
this.w(u)
this.w(t)
this.w(s)
this.w(r)
this.w(q)
z=new E.q(new Float64Array(H.i(16)))
z.v()
y=new F.aY(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cx=y
z.G(0,120,140,0)
z=new E.q(new Float64Array(H.i(16)))
z.v()
y=new F.aY(null,null,0,7,"none",null,z,!1)
y.b=[]
this.cy=y
z.G(0,150,180,0)
z=new E.q(new Float64Array(H.i(16)))
z.v()
y=new F.aY(null,null,0,7,"none",null,z,!1)
y.b=[]
this.db=y
z.G(0,180,220,0)
this.w(this.cx)
this.w(this.cy)
this.w(this.db)
this.ch=1
this.fA("L01")
z=this.gaO()
y=F.k(170,255,170,204)
x=F.k(170,204,170,255)
w=F.k(170,204,255,170)
v=new E.q(new Float64Array(H.i(16)))
v.v()
p=new F.a7(150,50,!1,!1,"start",y,x,w,z,0,0,0,0,"none",null,v,!1)
p.b=[]
v.G(0,240,250,0)
this.w(p)},
static:{dr:function(a,b){var z,y
z=F.a8(null)
y=new E.q(new Float64Array(H.i(16)))
y.v()
y=new F.hi(null,b,a,null,null,z,null,1,null,null,null,0,0,"none",null,y,!1)
y.b=[]
y.dW(a,b)
return y}}},
hj:{
"^":"d:1;a",
$1:function(a){var z=this.a
z.e=a
z.x=new F.z(0,0,J.P(a.gN()),J.P(z.e.ga0()))
z.y=new F.z(0,0,400,300)
z.cx.f=a
z.cy.f=a
z.db.f=a}},
hk:{
"^":"d:3;a",
$1:function(a){var z,y
z=this.a
y=new F.dx(a,[])
y.d6(a)
z.Q=y
z.cx.e=y
z.cy.e=y
z.db.e=y}},
hl:{
"^":"d:1;a",
$1:function(a){var z,y
z=this.a
P.a1("### level =  "+z.ch)
y=z.f.f
y.a.R(0)
y.c=!1
y.d=0
y.e=y.f
y=z.f
y.w(F.he(z.r,y,y.f,z.ch))}},
aY:{
"^":"a0;e,f,r,x,a,b,c,d",
V:function(a,b){var z,y,x,w
if(this.e==null||this.f==null)return
for(z=0;y=this.x,z<y;++z){x=y-1-z
if(x===0)x=1
else x=Math.pow(10,x)
x=C.b.c0(C.b.c5(this.r,x),10)
w=new F.dE(null,C.f,1)
w.a=F.k(255,255,255,255)
b.aG(a,this.f,this.e.bI("NUM00"+H.b(x)+".png").gbe(),new F.z(z*12,0,15,15),w)}}}}],["","",,P,{
"^":"",
jF:function(a){var z={}
a.L(0,new P.jG(z))
return z},
jI:function(a,b){var z=[]
return new P.jL(b,new P.jJ([],z),new P.jK(z),new P.jM(z)).$1(a)},
jH:function(a){return a},
d0:function(){var z=$.d_
if(z==null){z=J.bM(window.navigator.userAgent,"Opera",0)
$.d_=z}return z},
fm:function(){var z,y
z=$.cX
if(z!=null)return z
y=$.cY
if(y==null){y=J.bM(window.navigator.userAgent,"Firefox",0)
$.cY=y}if(y===!0)z="-moz-"
else{y=$.cZ
if(y==null){y=P.d0()!==!0&&J.bM(window.navigator.userAgent,"Trident/",0)
$.cZ=y}if(y===!0)z="-ms-"
else z=P.d0()===!0?"-o-":"-webkit-"}$.cX=z
return z},
jG:{
"^":"d:21;a",
$2:function(a,b){this.a[a]=b}},
jJ:{
"^":"d:22;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
jK:{
"^":"d:23;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.c(z,a)
return z[a]}},
jM:{
"^":"d:24;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.c(z,a)
z[a]=b}},
jL:{
"^":"d:1;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.fj(a.getTime(),!0)
if(a instanceof RegExp)throw H.e(new P.cl("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.aD()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.N)(w),++u){t=w[u]
x.l(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.F(a)
s=w.gn(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.B(s)
v=J.aM(x)
r=0
for(;r<s;++r)v.l(x,r,this.$1(w.h(a,r)))
return x}return a}}}],["","",,F,{
"^":"",
ei:[function(){var z=0,y=new P.Y(),x=1,w,v,u,t,s,r,q,p,o
function $async$ei(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:q=G
q=q
p=P
p=p.aD()
o=P
v=new q.hZ(700,500,p,o.aD())
q=E
q=q
p=Float64Array
o=H
u=new q.q(new p(o.i(16)))
q=u
q.v()
q=F
t=new q.i1(400,300,1,1,1,0,0,null,"none",null,u,!1)
q=t
q.b=[]
q=t
p=F
q.ch=p.k(255,238,238,255)
q=E
q=q
p=Float64Array
o=H
u=new q.q(new p(o.i(16)))
q=u
q.v()
q=G
s=new q.ib(null,0,0,!1,0,v,!1,!1,!1,0,null,!1,!1,[u])
q=s
p=G
q.a=p.i7(400,600)
q=s
q.sW(t)
q=s
q.fw()
q=s
q.fN()
q=s
q.x=!0
q=s
z=!q.d?2:3
break
case 2:q=s
q.d=!0
q=s
q.aT()
case 3:q=F
q=q
p=F
u=new q.h4(p.dh(21,11),[],!1,0,1,1,0,0,0,[0,0,0])
q=u
q.cV()
q=E
q=q
p=Float64Array
o=H
r=new q.q(new p(o.i(16)))
q=r
q.v()
q=F
r=new q.h6(v,u,"none",null,r,!1)
q=r
q.b=[]
q=E
q=q
p=Float64Array
o=H
u=new q.q(new p(o.i(16)))
q=u
q.v()
q=F
u=new q.ht(r,v,0,"none",null,u,!1)
q=u
q.b=[]
q=u
q.T(0)
q=r
q.w(u)
q=t
q.w(r)
return H.l(null,0,y,null)
case 1:return H.l(w,1,y)}}return H.l(null,$async$ei,y,null)},"$0","ej",0,0,0]},1],["","",,F,{
"^":"",
bh:function(a){var z,y,x,w
for(z=a.length,y=0,x=0;w=a.length,x<w;w===z||(0,H.N)(a),++x){y+=a[x]
y+=y<<10>>>0
y=(y^C.c.aX(y,6))>>>0}y+=y<<3>>>0
y=(y^y>>>11)>>>0
return y+(y<<15>>>0)},
a7:{
"^":"a0;N:e<,a0:f<,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d",
cG:function(a,b){if(a>0&&b>0&&b<this.f&&a<this.e)return!0
else return!1},
ax:function(a,b,c,d,e,f,g){var z
switch(c){case"pointerdown":if(this.cG(d,e)){this.r=!0
this.x=!0
this.dx=f
this.dy=g
this.cy=0
this.db=0}break
case"pointermove":if(this.cG(d,e)){this.x=!0
z=this.cy+(f-this.dx)
this.cy=z
this.db=this.db+(g-this.dy)
if(!(Math.sqrt(H.a3(z*z))>this.e)){z=this.db
z=Math.sqrt(H.a3(z*z))>this.f}else z=!0
if(z){this.r=!1
this.x=!1}}else{this.r=!1
this.x=!1}break
case"pointerup":if(this.r&&!0)P.fu(new F.hW(this),null)
this.r=!1
this.x=!1
break
default:this.r=!1
this.x=!1}return!1},
V:function(a,b){var z,y,x
z=F.a8(null)
if(this.r){z.a=this.Q
b.au(a,new F.z(0,0,this.e,this.f),z)}else{y=this.f
x=this.e
if(this.x){z.a=this.ch
b.au(a,new F.z(0,0,x,y),z)}else{z.a=this.z
b.au(a,new F.z(0,0,x,y),z)}}},
d4:function(a){return this.cx.$1(a)}},
hW:{
"^":"d:0;a",
$0:function(){var z=this.a
z.d4(z.y)}},
hX:{
"^":"a;"},
a0:{
"^":"a;",
w:function(a){var z=0,y=new P.Y(),x=1,w,v=this,u,t,s,r
function $async$w(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=H
t=t
s=P
s=s
r=$
u=t.f(new s.E(0,r.o,null),[null])
t=u
t.aC(null)
z=2
return H.l(u,$async$w,y)
case 2:t=v
t=t.b
t.push(a)
return H.l(null,0,y,null)
case 1:return H.l(w,1,y)}}return H.l(null,$async$w,y,null)},
b5:function(a){var z=0,y=new P.Y(),x=1,w,v=this,u,t,s
function $async$b5(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=P
t=t
s=$
u=new t.E(0,s.o,null)
u.$builtinTypeInfo=[null]
t=u
t.aC(null)
z=2
return H.l(u,$async$b5,y)
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
t.a6(u,a)
t=a
t.di()
return H.l(null,0,y,null)
case 1:return H.l(w,1,y)}}return H.l(null,$async$b5,y,null)},
ae:function(){var z=0,y=new P.Y(),x=1,w,v=this,u,t,s,r,q,p
function $async$ae(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=$
u=r.f(new q.E(0,p.o,null),[null])
r=u
r.aC(null)
z=2
return H.l(u,$async$ae,y)
case 2:r=v
u=r.b,t=u.length,s=0
case 3:if(!(s<u.length)){z=5
break}r=v
r.b5(u[s])
case 4:r=u.length===t
if(r)b=r
else{z=6
break}z=7
break
case 6:r=H
b=(0,r.N)(u)
case 7:b,++s
z=3
break
case 5:return H.l(null,0,y,null)
case 1:return H.l(w,1,y)}}return H.l(null,$async$ae,y,null)},
cQ:function(a){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x)z[x].cQ(a)},
bO:function(a,b){},
dg:function(a,b){var z,y,x
this.bD()
this.bO(a,b)
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x)z[x].dg(a,b)},
V:function(a,b){},
bP:["dO",function(a,b){var z,y,x,w,v,u
this.bD()
this.V(a,b)
for(z=this.b,y=z.length,x=b.a,w=0;w<z.length;z.length===y||(0,H.N)(z),++w){v=z[w]
u=v.c
x.push(C.a.gav(x).t(0,u))
b.b9()
v.bP(a,b)
if(0>=x.length)return H.c(x,0)
x.pop()
b.b9()}}],
dh:["aa",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
this.bD()
for(z=0;y=this.b,x=y.length,z<x;){++z
w=x-z
if(w<0)return H.c(y,w)
v=y[w]
a.a5(v.c)
u=v.dh(a,b,c,d,e)
a.a4()
if(u===!0)return u}t=a.ds().bC(0)
t.fo()
y=new E.t(new Float64Array(H.i(3)))
y.B(d,e,0)
s=t.t(0,y)
return this.ax(a,b,c,s.gi(s),s.gj(s),d,e)}],
ax:function(a,b,c,d,e,f,g){return!1},
di:function(){var z,y,x
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x)z[x].di()
this.d=!1},
bD:function(){if(!this.d)this.d=!0}},
hY:{
"^":"a;",
U:function(a){var z=0,y=new P.Y(),x,w=2,v,u=this,t,s,r,q
function $async$U(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.a
s=t
z=s.a_(a)?3:4
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
return H.l(q.b3(a),$async$U,y)
case 5:s.l(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.l(x,0,y,null)
case 2:return H.l(v,1,y)}}return H.l(null,$async$U,y,null)},
aL:function(a){var z=0,y=new P.Y(),x,w=2,v,u=this,t,s,r,q
function $async$aL(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:s=u
t=s.b
s=t
z=s.a_(a)?3:4
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
return H.l(q.aM(a),$async$aL,y)
case 5:s.l(0,r,c)
s=t
x=s.h(0,a)
z=1
break
case 1:return H.l(x,0,y,null)
case 2:return H.l(v,1,y)}}return H.l(null,$async$aL,y,null)}},
z:{
"^":"a;i:a*,j:b*,N:c<,a0:d<",
u:function(a,b){if(b==null)return!1
return b instanceof F.z&&J.D(b.a,this.a)&&J.D(b.b,this.b)&&b.c===this.c&&b.d===this.d},
gD:function(a){return F.bh([J.G(this.a),J.G(this.b),this.c&0x1FFFFFFF,this.d&0x1FFFFFFF])},
k:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)+", w:"+H.b(this.c)+", h:"+H.b(this.d)}},
dF:{
"^":"a;i:a*,j:b*",
u:function(a,b){if(b==null)return!1
return b instanceof F.dF&&J.D(b.a,this.a)&&J.D(b.b,this.b)},
gD:function(a){return F.bh([J.G(this.a),J.G(this.b)])},
k:function(a){return"x:"+H.b(this.a)+", y:"+H.b(this.b)}},
dG:{
"^":"a;N:a<,a0:b<",
u:function(a,b){if(b==null)return!1
return b instanceof F.dG&&b.a===this.a&&b.b===this.b},
gD:function(a){return F.bh([this.a&0x1FFFFFFF,this.b&0x1FFFFFFF])},
k:function(a){return"w:"+H.b(this.a)+", h:"+H.b(this.b)}},
i3:{
"^":"a;a",
k:function(a){return C.K.h(0,this.a)}},
dE:{
"^":"a;a,b,c",
e_:function(a){if(this.a==null)this.a=F.k(255,255,255,255)},
static:{a8:function(a){var z=new F.dE(a,C.f,1)
z.e_(a)
return z}}},
dD:{
"^":"a;a",
u:function(a,b){if(b==null)return!1
return b instanceof F.dD&&b.a===this.a},
gD:function(a){return F.bh([this.a&0x1FFFFFFF])},
k:function(a){return"a:"+(this.a>>>24&255)+", r:"+(this.a>>>16&255)+", g:"+(this.a>>>8&255)+", b:"+(this.a>>>0&255)},
dZ:function(a,b,c,d){var z=(this.a|(a&255)<<24)>>>0
this.a=z
z=(z|(b&255)<<16)>>>0
this.a=z
z=(z|(c&255)<<8)>>>0
this.a=z
z=(z|(d&255)<<0)>>>0
this.a=z
this.a=(z&4294967295)>>>0},
static:{k:function(a,b,c,d){var z=new F.dD(0)
z.dZ(a,b,c,d)
return z}}},
ch:{
"^":"a;"},
i1:{
"^":"a0;N:e<,a0:f<,r,x,y,z,Q,ch,a,b,c,d",
dh:function(a,b,c,d,e){a.a5(this.c)
this.aa(a,b,c,d,e)
a.a4()},
bO:function(a,b){var z,y,x,w
z=this.e
y=(a.gN()-a.gfC(a))/z
this.r=y
x=a.a
w=(x.d-0)/this.f
this.x=w
y=y<w?y:w
this.y=y
this.Q=0
this.z=(x.c-z*y)/2+0
y=new E.q(new Float64Array(H.i(16)))
y.v()
this.c=y
y.G(0,this.z,this.Q,0)
y=this.c
z=this.y
y.c1(0,z,z,1)},
bP:function(a,b){var z,y,x
z=new F.z(0,0,this.e,this.f)
y=this.c
x=b.a
x.push(C.a.gav(x).t(0,y))
b.b9()
y=b.b
y.push(z)
b.b_(a,z)
this.dO(a,b)
if(0>=y.length)return H.c(y,0)
y.pop()
if(y.length>0)b.b_(a,C.a.gav(y))
else{y=a.a
b.b_(a,new F.z(0,0,y.c,y.d))}if(0>=x.length)return H.c(x,0)
x.pop()
b.b9()},
V:function(a,b){var z,y
z=new F.z(0,0,this.e,this.f)
y=F.a8(null)
y.a=this.ch
b.b_(a,z)
b.au(a,z,y)}},
i2:{
"^":"a0;e,f,r,x,y,z,Q,a,b,c,d",
V:function(a,b){var z,y,x,w,v,u,t
z=F.a8(null)
if(this.x)z.a=F.k(170,170,170,255)
else z.a=F.k(170,255,170,170)
y=this.f
x=-y/2
w=this.z
v=this.r
u=v/2
t=this.Q
b.cN(a,new F.z(x,x,y,y),z)
b.cN(a,new F.z(w-u,t-u,v,v),z)},
ax:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(!this.x){if(this.cK(d,e,0,0)<this.f){this.y=b
this.x=!0
this.z=d
this.Q=e}}else if(b===this.y)if(c==="pointerup"||c==="pointercancel"){this.x=!1
this.z=0
this.Q=0}else{this.z=d
this.Q=e
z=this.cK(0,0,d,e)
y=this.f
x=y/2
if(z>x){w=this.z
v=w>0?w:-1*w
u=this.Q
t=v+(u>0?u:-1*u)
this.z=x*w/t
this.Q=y/2*u/t}}return!1},
cK:function(a,b,c,d){var z,y
z=a-c
H.a3(z)
H.a3(2)
z=Math.pow(z,2)
y=b-d
H.a3(y)
H.a3(2)
return Math.sqrt(H.a3(z+Math.pow(y,2)))}},
dx:{
"^":"a;a,b",
bI:function(a){var z,y,x,w
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.N)(z),++x){w=z[x]
if(J.D(w.a,a))return w}return},
d6:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.b6(H.k7(J.bK(P.ju(a,null),"frames"),"$isn",[P.h0],"$asn")),y=this.b;z.E();){x=z.gJ()
w=new F.hA(null,null,null,null,null,null,null)
v=J.F(x)
w.a=v.h(x,"filename")
w.r=w.d5(v.h(x,"frame"))
w.b=v.h(x,"rotated")
w.c=v.h(x,"trimmed")
w.d=w.d5(v.h(x,"spriteSourceSize"))
u=v.h(x,"sourceSize")
t=J.F(u)
s=t.h(u,"w")
r=t.h(u,"h")
w.e=new F.dG(J.P(s),J.P(r))
v=v.h(x,"pivot")
u=J.F(v)
q=u.h(v,"x")
p=u.h(v,"y")
w.f=new F.dF(J.P(q),J.P(p))
y.push(w)}}},
hA:{
"^":"a;a,b,c,d,e,f,r",
gbe:function(){var z,y
z=this.b
y=this.r
if(z===!0)return new F.z(y.a,y.b,y.d,y.c)
else return new F.z(y.a,y.b,y.c,y.d)},
d5:function(a){var z,y,x,w,v
z=J.F(a)
y=z.h(a,"x")
x=z.h(a,"y")
w=z.h(a,"w")
v=z.h(a,"h")
return new F.z(J.P(y),J.P(x),J.P(w),J.P(v))}},
i4:{
"^":"a;",
gW:function(){return this.c$},
sW:function(a){this.c$=a},
fs:function(a){if(!this.e$){this.c$.cQ(this)
this.e$=!0}this.c$.dg(this,a)
this.fu()},
a5:function(a){var z=this.f$
z.push(C.a.gav(z).t(0,a))},
a4:function(){var z=this.f$
if(0>=z.length)return H.c(z,0)
z.pop()},
ds:function(){return C.a.gav(this.f$)}}}],["","",,G,{
"^":"",
ci:function(a){var z=0,y=new P.Y(),x,w=2,v,u,t,s,r,q,p,o,n,m,l
function $async$ci(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=H
q=q
p=P
p=p
o=H
o=o
n=P
n=n
m=$
u=q.f(new p.co(o.f(new n.E(0,m.o,null),[null])),[null])
q=document
t=q.createElement("img",null)
q=J
q.eZ(t,a)
q=J
s=q.j(t)
q=s
r=q.gbN(t)
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
m=m.I(new l.i9(u,t))
l=r
p=new p.H(0,o,n,m,l.c)
o=H
q=q.f(p,[o.A(r,0)])
q.H()
q=s
s=q.gbM(t)
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
m=m.I(new l.ia(a,u))
l=s
p=new p.H(0,o,n,m,l.c)
o=H
q=q.f(p,[o.A(s,0)])
q.H()
q=u
x=q.a
z=1
break
case 1:return H.l(x,0,y,null)
case 2:return H.l(v,1,y)}}return H.l(null,$async$ci,y,null)},
dH:function(a,b,c){var z,y
z=J.eD(a,b)
a.shaderSource(z,c)
a.compileShader(z)
if(!1===a.getShaderParameter(z,35713)){y="Error compiling shader "+H.b(a.getShaderInfoLog(z))
a.deleteShader(z)
throw H.e(y+"\n")}return z},
i8:{
"^":"ch;a,b",
gN:function(){return J.eS(this.a)},
ga0:function(){return J.eJ(this.a)},
du:function(a){var z
if(this.b==null){z=J.j(a).eY(a)
this.b=z
a.bindTexture(3553,z)
C.M.fJ(a,3553,0,6408,6408,5121,this.a)
a.bindTexture(3553,null)}return this.b}},
i6:{
"^":"a;a,b,c,p:d>",
e0:function(a,b){var z,y,x
this.c=b
this.d=a
z=C.c.ay(b)
y=C.c.ay(a)
x=document.createElement("canvas",null)
J.f_(x,z)
J.eY(x,y)
this.b=x
document.body.appendChild(x)
this.a=J.eV(this.b,!0)},
static:{i7:function(a,b){var z=new G.i6(null,null,null,null)
z.e0(a,b)
return z}}},
i5:{
"^":"hX;c,d,e,f,r,x,y,z,Q,ch,cx,a,b",
fj:function(){var z,y,x,w,v,u
P.a1("#[A]# "+H.b(J.cO(this.c,35660)))
P.a1("#[B]# "+H.b(J.cO(this.c,33901)))
z=C.a.cR(["attribute vec3 vp;","attribute vec4 color;","attribute float useTex;","varying float v_useTex;","attribute vec2 a_tex;","varying vec2 v_tex;","uniform mat4 u_mat;","varying vec4 vColor;","","void main() {","  v_useTex = useTex;  gl_Position = u_mat*vec4(vp.x,vp.y,vp.z,1.0);","  if(useTex < 0.0){","    vColor = color;","  }","  else {","    vColor = vec4(0.0,0.0,0.0,1.0);","    v_tex = a_tex;","  }","  gl_PointSize = 1.0;//u_point_size;","","}"],"\n")
y=C.a.cR(["precision mediump float;","varying vec2 v_tex;","varying vec4 vColor;","varying float v_useTex;","uniform sampler2D u_image;","void main() {","  if(v_useTex < 0.0){","    gl_FragColor = vColor;","  }","  else {","    gl_FragColor = texture2D(u_image, v_tex);","  }","}"],"\n")
x=this.c
w=G.dH(x,35633,z)
v=G.dH(x,35632,y)
u=J.eC(x)
x.attachShader(u,v)
x.attachShader(u,w)
x.linkProgram(u)
this.e=u},
R:function(a){this.f=1
this.Q=-0.5
J.cM(this.c,2960)
J.eE(this.c,515)
J.ex(this.c,0,0,0,1)
J.ey(this.c,1)
J.ez(this.c,0)
J.cM(this.c,3042)
switch(-1){case-1:J.et(this.c,32774)
J.eu(this.c,770,771,770,32772)
break}J.ew(this.c,17664)
C.a.sn(this.r,0)
C.a.sn(this.x,0)
C.a.sn(this.y,0)
this.z=null},
b2:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.r
if(z.length!==0){y=this.x
F.k(170,255,170,170)
J.cS(this.c,this.e)
x=J.b7(this.c,this.e,"a_tex")
w=J.bN(this.c)
J.bL(this.c,34962,w)
v=this.y
J.ev(this.c,34962,new Float32Array(H.bA(v)),35044)
J.b5(this.c,x)
J.b9(this.c,x,2,5126,!1,0,0)
u=this.z
if(u!=null){t=u.du(this.c)
J.cJ(this.c,3553,t)
J.b8(this.c,3553,10242,33071)
J.b8(this.c,3553,10243,33071)
J.b8(this.c,3553,10241,9728)
J.b8(this.c,3553,10240,9728)}u=this.c
s=J.bN(u)
u.bindBuffer(34962,s)
u.bufferData(34962,new Float32Array(H.bA(z)),35044)
u.bindBuffer(34962,null)
J.bL(this.c,34962,s)
u=this.c
s=J.bN(u)
u.bindBuffer(34963,s)
u.bufferData(34963,new Uint16Array(H.bA(y)),35044)
u.bindBuffer(34963,null)
J.bL(this.c,34963,s)
u=this.c
u.uniformMatrix4fv(J.eW(u,this.e,"u_mat"),!1,new Float32Array(H.bA(this.ch.a)))
r=J.b7(this.c,this.e,"color")
q=J.b7(this.c,this.e,"vp")
p=J.b7(this.c,this.e,"useTex")
J.b9(this.c,q,3,5126,!1,32,0)
J.b9(this.c,r,4,5126,!1,32,12)
J.b9(this.c,p,1,5126,!1,32,28)
J.b5(this.c,q)
J.b5(this.c,r)
J.b5(this.c,p)
J.eG(this.c,4,y.length,5123,0)
if(x!==0){J.eF(this.c,x)
J.cJ(this.c,3553,null)}J.cS(this.c,null)
C.a.sn(z,0)
C.a.sn(y,0)
C.a.sn(v,0)
this.z=null}},
cN:function(a,b,c){if(c.b===C.f)this.f8(a,b,c)
else this.f9(a,b,c)},
f8:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=b.c/2
y=J.y(b.a,z)
x=b.d/2
w=J.y(b.b,x)
v=this.aE()
u=new E.t(new Float64Array(H.i(3)))
u.B(0,0,0)
t=c.a.a
s=(t>>>16&255)/255
r=(t>>>8&255)/255
q=(t>>>0&255)/255
p=(t>>>24&255)/255
for(t=J.ac(w),o=this.r,n=this.y,m=this.x,l=J.ac(y),k=0;k<25;){j=o.length/8|0
u.si(0,y)
u.sj(0,w)
u.sa8(0,this.Q)
u=v.t(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0])
i=6.283185307179586*(k/25)
u.si(0,l.m(y,Math.cos(i)*z))
u.sj(0,t.m(w,Math.sin(i)*x))
u.sa8(0,this.Q)
u=v.t(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0]);++k
i=6.283185307179586*(k/25)
u.si(0,l.m(y,Math.cos(i)*z))
u.sj(0,t.m(w,Math.sin(i)*x))
u.sa8(0,this.Q)
u=v.t(0,u)
C.a.I(o,[u.gi(u),u.gj(u),this.Q])
C.a.I(o,[s,r,q,p])
C.a.I(o,[-1])
C.a.I(n,[0,0])
C.a.I(m,[j,j+1,j+2])
this.Q+=0.0001}},
f9:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b.c
y=z/2
x=J.y(b.a,y)
w=b.d
v=w/2
u=J.y(b.b,v)
t=c.c
s=(z+t)/2
r=(w+t)/2
q=this.aE()
p=new E.t(new Float64Array(H.i(3)))
p.B(0,0,0)
o=new E.t(new Float64Array(H.i(3)))
o.B(0,0,0)
n=new E.t(new Float64Array(H.i(3)))
n.B(0,0,0)
m=new E.t(new Float64Array(H.i(3)))
m.B(0,0,0)
t=c.a.a
l=(t>>>16&255)/255
k=(t>>>8&255)/255
j=(t>>>0&255)/255
i=(t>>>24&255)/255
for(z=J.ac(u),w=J.ac(x),h=0;h<25;){t=6.283185307179586*(h/25)
p.si(0,w.m(x,Math.cos(t)*y))
p.sj(0,z.m(u,Math.sin(t)*v))
p.sa8(0,this.Q)
p=q.t(0,p)
o.si(0,w.m(x,Math.cos(t)*s))
o.sj(0,z.m(u,Math.sin(t)*r))
o.sa8(0,this.Q)
o=q.t(0,o);++h
t=6.283185307179586*(h/25)
n.si(0,w.m(x,Math.cos(t)*s))
n.sj(0,z.m(u,Math.sin(t)*r))
n.sa8(0,this.Q)
n=q.t(0,n)
m.si(0,w.m(x,Math.cos(t)*y))
m.sj(0,z.m(u,Math.sin(t)*v))
m.sa8(0,this.Q)
m=q.t(0,m)
this.aq(a,p,o,m,n,l,k,j,i)
this.Q+=0.0001}},
au:function(a,b,c){if(c.b===C.f)this.bF(a,b,c)
else this.bG(a,b,c)},
bF:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=this.aE()
y=b.a
x=b.b
w=J.y(y,b.c)
v=J.y(b.b,b.d)
u=new E.t(new Float64Array(H.i(3)))
u.B(y,x,0)
t=z.t(0,u)
u=new E.t(new Float64Array(H.i(3)))
u.B(y,v,0)
s=z.t(0,u)
u=new E.t(new Float64Array(H.i(3)))
u.B(w,x,0)
r=z.t(0,u)
u=new E.t(new Float64Array(H.i(3)))
u.B(w,v,0)
q=z.t(0,u)
u=c.a.a
this.aq(a,t,s,r,q,(u>>>16&255)/255,(u>>>8&255)/255,(u>>>0&255)/255,(u>>>24&255)/255)},
aq:function(a,b,c,d,e,f,g,h,i){var z,y,x
z=this.r
y=z.length/8|0
C.a.I(z,[b.gi(b),b.gj(b),this.Q,f,g,h,i,-1,c.gi(c),c.gj(c),this.Q,f,g,h,i,-1,d.gi(d),d.gj(d),this.Q,f,g,h,i,-1,e.gi(e),e.gj(e),this.Q,f,g,h,i,-1])
C.a.I(this.y,[0,0,0,0,0,0,0,0])
this.Q+=0.0001
z=y+1
x=y+2
C.a.I(this.x,[y,z,x,z,y+3,x])},
bG:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.aE()
y=b.a
x=b.b
w=J.y(y,b.c)
v=J.y(b.b,b.d)
u=new E.t(new Float64Array(H.i(3)))
u.B(y,x,0)
t=z.t(0,u)
u=c.c
if(typeof y!=="number")return y.O()
if(typeof x!=="number")return x.O()
s=new E.t(new Float64Array(H.i(3)))
s.B(y-u,x-u,0)
r=z.t(0,s)
s=new E.t(new Float64Array(H.i(3)))
s.B(y,v,0)
q=z.t(0,s)
s=c.c
u=J.ac(v)
p=u.m(v,s)
o=new E.t(new Float64Array(H.i(3)))
o.B(y-s,p,0)
n=z.t(0,o)
o=new E.t(new Float64Array(H.i(3)))
o.B(w,x,0)
m=z.t(0,o)
o=J.ac(w)
p=o.m(w,c.c)
s=c.c
l=new E.t(new Float64Array(H.i(3)))
l.B(p,x-s,0)
k=z.t(0,l)
l=new E.t(new Float64Array(H.i(3)))
l.B(w,v,0)
j=z.t(0,l)
o=o.m(w,c.c)
u=u.m(v,c.c)
l=new E.t(new Float64Array(H.i(3)))
l.B(o,u,0)
i=z.t(0,l)
l=c.a.a
h=(l>>>16&255)/255
g=(l>>>8&255)/255
f=(l>>>0&255)/255
e=(l>>>24&255)/255
this.aq(a,r,n,t,q,h,g,f,e)
this.aq(a,n,i,q,j,h,g,f,e)
this.aq(a,i,k,j,m,h,g,f,e)
this.aq(a,k,r,m,t,h,g,f,e)},
b_:function(a,b){var z
this.b2(0)
J.cK(this.c,!1,!1,!1,!1)
J.cL(this.c,!1)
J.cQ(this.c,7680,7681,7681)
J.cP(this.c,519,this.f,255)
z=F.a8(null)
z.a=F.k(255,255,255,255)
this.au(null,b,z)
this.b2(0)
J.cK(this.c,!0,!0,!0,!0)
J.cL(this.c,!0)
J.cQ(this.c,7680,7680,7680)
J.cP(this.c,515,this.f,255);++this.f},
aG:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.z
if(z!=null&&!J.D(z,b))this.b2(0)
this.z=b
z=c.a
y=b.gN()
if(typeof z!=="number")return z.ba()
if(typeof y!=="number")return H.B(y)
x=z/y
y=c.b
z=this.z.ga0()
if(typeof y!=="number")return y.ba()
if(typeof z!=="number")return H.B(z)
w=y/z
z=J.y(c.a,c.c)
y=this.z.gN()
if(typeof z!=="number")return z.ba()
if(typeof y!=="number")return H.B(y)
v=z/y
y=J.y(c.b,c.d)
z=this.z.ga0()
if(typeof y!=="number")return y.ba()
if(typeof z!=="number")return H.B(z)
u=y/z
C.a.I(this.y,[x,w,x,u,v,w,v,u])
t=this.aE()
s=d.a
r=d.b
q=J.y(s,d.c)
p=J.y(d.b,d.d)
z=new E.t(new Float64Array(H.i(3)))
z.B(s,r,0)
o=t.t(0,z)
z=new E.t(new Float64Array(H.i(3)))
z.B(s,p,0)
n=t.t(0,z)
z=new E.t(new Float64Array(H.i(3)))
z.B(q,r,0)
m=t.t(0,z)
z=new E.t(new Float64Array(H.i(3)))
z.B(q,p,0)
l=t.t(0,z)
z=this.r
k=z.length/8|0
y=e.a.a
j=(y>>>16&255)/255
i=(y>>>8&255)/255
h=(y>>>0&255)/255
g=(y>>>24&255)/255
C.a.I(z,[o.gi(o),o.gj(o),this.Q,j,i,h,g,1,n.gi(n),n.gj(n),this.Q,j,i,h,g,1,m.gi(m),m.gj(m),this.Q,j,i,h,g,1,l.gi(l),l.gj(l),this.Q,j,i,h,g,1])
this.Q+=0.0001
z=k+1
y=k+2
C.a.I(this.x,[k,z,y,z,k+3,y])},
b9:function(){},
aE:function(){var z,y
this.cx.v()
z=this.cx.G(0,-1,1,0)
this.cx=z
y=this.d
y=z.c1(0,2/y.c,-2/y.d,1)
this.cx=y
y=y.t(0,C.a.gav(this.a))
this.cx=y
return y}},
hZ:{
"^":"hY;q:c>,p:d>,a,b",
b3:function(a){var z=0,y=new P.Y(),x,w=2,v,u,t
function $async$b3(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:u=G
u=u
t=G
z=3
return H.l(t.ci(a),$async$b3,y)
case 3:x=new u.i8(c,null)
z=1
break
case 1:return H.l(x,0,y,null)
case 2:return H.l(v,1,y)}}return H.l(null,$async$b3,y,null)},
aM:function(a){var z=0,y=new P.Y(),x,w=2,v,u,t,s,r,q,p,o,n,m
function $async$aM(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:r=H
r=r
q=P
q=q
p=H
p=p
o=P
o=o
n=$
u=r.f(new q.co(p.f(new o.E(0,n.o,null),[null])),[null])
t=new XMLHttpRequest()
r=C
r=r.A
r.fB(t,"GET",a)
r=t
r.responseType="arraybuffer"
r=H
r=r
q=W
s=r.f(new q.cq(t,"load",!1),[null])
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
n=n.I(new m.i_(u,t))
m=s
q=new q.H(0,p,o,n,m.c)
p=H
r=r.f(q,[p.A(s,0)])
r.H()
r=H
r=r
q=W
s=r.f(new q.cq(t,"error",!1),[null])
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
n=n.I(new m.i0(u))
m=s
q=new q.H(0,p,o,n,m.c)
p=H
r=r.f(q,[p.A(s,0)])
r.H()
r=t
r.send()
r=u
x=r.a
z=1
break
case 1:return H.l(x,0,y,null)
case 2:return H.l(v,1,y)}}return H.l(null,$async$aM,y,null)}},
i_:{
"^":"d:25;a,b",
$1:function(a){var z=0,y=new P.Y(),x=1,w,v=this,u,t,s,r
function $async$$1(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:t=J
t=t
s=W
s=s
r=v
r=r.b
u=t.es(s.jr(r.response))
t=v
t=t.a
t=t
s=P
s=new s.ip(!0)
t.b1(0,s.eU(u))
return H.l(null,0,y,null)
case 1:return H.l(w,1,y)}}return H.l(null,$async$$1,y,null)}},
i0:{
"^":"d:26;a",
$1:function(a){this.a.cI(a)}},
ib:{
"^":"ha;a,b,c,d,e,f,r,x,a$,b$,c$,d$,e$,f$",
gi:function(a){return 0},
gj:function(a){return 0},
gN:function(){return this.a.c},
ga0:function(){return this.a.d},
gfC:function(a){return 0},
fu:function(){this.r=!0},
aT:function(){var z=0,y=new P.Y(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h
function $async$aT(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:j=H
j=j
i=P
u=j.ds(new i.bQ(Date.now(),!1))
j=v
t=j.a
j=E
j=j
i=Float64Array
h=H
s=new j.q(new i(h.i(16)))
j=s
j.v()
j=E
j=j
i=Float64Array
h=H
r=new j.q(new i(h.i(16)))
j=r
j.v()
j=E
j=j
i=Float64Array
h=H
q=new j.q(new i(h.i(16)))
j=q
j.v()
j=G
p=new j.i5(null,null,null,1,[],[],[],null,0,s,r,[q],[])
j=p
i=t
j.c=i.a
j=p
j.d=t
j=p
j.fj()
j=p
j.R(0)
o=0,n=0
case 2:j=v
if(!j.d){z=4
break}j=P
j=j
i=P
z=5
return H.l(j.fv(new i.ae(15e3),null,null),$async$aT,y)
case 5:m=Date.now()
j=v
j.b=m
l=m-u
j=v
j=j
i=C
i=i.c
j.fs(i.ay(u+l))
o+=l
if(l<0);else ;++n
j=v
j.r=!0
z=o>40?6:7
break
case 6:j=p
j.R(0)
j=v
j=j.gW()
j.bP(v,p)
j=p
j.b2(0)
j=v
j.r=!1
case 7:z=n>40?8:9
break
case 8:j=C
j=j.c
k="###fps  "+j.c5(o,n)
j=H
j.cG(k)
o=0
n=0
case 9:case 3:u=m
z=2
break
case 4:return H.l(null,0,y,null)
case 1:return H.l(w,1,y)}}return H.l(null,$async$aT,y,null)},
fN:function(){var z,y,x,w
z=P.aD()
y=new G.il(this,z)
x=new G.ik(this,z)
w=this.a.b
w.toString
w=H.f(new W.x(w,"touchcancel",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(x),w.c),[H.A(w,0)]).H()
w=this.a.b
w.toString
w=H.f(new W.x(w,"touchend",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(x),w.c),[H.A(w,0)]).H()
w=this.a.b
w.toString
w=H.f(new W.x(w,"touchenter",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).H()
w=this.a.b
w.toString
w=H.f(new W.x(w,"touchleave",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).H()
w=this.a.b
w.toString
w=H.f(new W.x(w,"touchmove",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).H()
w=this.a.b
w.toString
w=H.f(new W.x(w,"touchstart",!1),[null])
H.f(new W.H(0,w.a,w.b,W.I(y),w.c),[H.A(w,0)]).H()},
fw:function(){var z,y
z={}
z.a=!1
y=J.eK(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ic(z,this)),y.c),[H.A(y,0)]).H()
y=J.eQ(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.id(z,this)),y.c),[H.A(y,0)]).H()
y=J.eL(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ie(z,this)),y.c),[H.A(y,0)]).H()
y=J.eM(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ig(z,this)),y.c),[H.A(y,0)]).H()
y=J.eN(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ih(z,this)),y.c),[H.A(y,0)]).H()
y=J.eO(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ii(z,this)),y.c),[H.A(y,0)]).H()
y=J.eP(this.a.b)
H.f(new W.H(0,y.a,y.b,W.I(new G.ij(z,this)),y.c),[H.A(y,0)]).H()}},
ha:{
"^":"a+i4;"},
il:{
"^":"d:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.a
z.c=z.b
for(y=J.cN(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.N)(y),++v){u=y[v]
t=C.b.K(u.pageX)
s=C.b.K(u.pageY)
new P.U(t,s).$builtinTypeInfo=[null]
r=t-C.b.K(z.a.b.offsetLeft)
t=C.b.K(u.pageX)
s=C.b.K(u.pageY)
new P.U(t,s).$builtinTypeInfo=[null]
q=s-C.b.K(z.a.b.offsetTop)
if(w.a_(u.identifier)){t=z.gW()
s=u.identifier
if(typeof s!=="number")return s.m()
z.a5(t.c)
t.aa(z,s+1,"pointermove",r,q)
z.a4()}else{w.l(0,u.identifier,u)
t=z.gW()
s=u.identifier
if(typeof s!=="number")return s.m()
z.a5(t.c)
t.aa(z,s+1,"pointerdown",r,q)
z.a4()}}}},
ik:{
"^":"d:9;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
z.c=z.b
for(y=J.cN(a),x=y.length,w=this.b,v=0;v<y.length;y.length===x||(0,H.N)(y),++v){u=y[v]
if(w.a_(u.identifier)){t=C.b.K(u.pageX)
s=C.b.K(u.pageY)
new P.U(t,s).$builtinTypeInfo=[null]
s=C.b.K(z.a.b.offsetLeft)
r=C.b.K(u.pageX)
q=C.b.K(u.pageY)
new P.U(r,q).$builtinTypeInfo=[null]
r=C.b.K(z.a.b.offsetTop)
w.a6(0,u.identifier)
p=z.gW()
o=u.identifier
if(typeof o!=="number")return o.m()
z.a5(p.c)
p.aa(z,o+1,"pointerup",t-s,q-r)
z.a4()}}}},
ic:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b){this.a.a=!0
y=z.gW()
x=J.j(a)
w=x.gS(a)
w=w.gi(w)
w.toString
x=x.gS(a)
x=x.gj(x)
x.toString
z.a5(y.c)
y.aa(z,0,"pointerdown",w,x)
z.a4()}}},
id:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gW()
w=J.j(a)
v=w.gS(a)
v=v.gi(v)
v.toString
w=w.gS(a)
w=w.gj(w)
w.toString
z.a5(x.c)
x.aa(z,0,"pointerup",v,w)
z.a4()
y.a=!1}}}},
ie:{
"^":"d:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
ig:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gW()
w=J.j(a)
v=w.gS(a)
v=v.gi(v)
v.toString
w=w.gS(a)
w=w.gj(w)
w.toString
z.a5(x.c)
x.aa(z,0,"pointercancel",v,w)
z.a4()
y.a=!1}}}},
ih:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w
z=this.b
if(z.c+500<z.b)if(this.a.a){y=z.gW()
x=J.j(a)
w=x.gS(a)
w=w.gi(w)
w.toString
x=x.gS(a)
x=x.gj(x)
x.toString
z.a5(y.c)
y.aa(z,0,"pointermove",w,x)
z.a4()}}},
ii:{
"^":"d:4;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
if(z.c+500<z.b){y=this.a
if(y.a){x=z.gW()
w=J.j(a)
v=w.gS(a)
v=v.gi(v)
v.toString
w=w.gS(a)
w=w.gj(w)
w.toString
z.a5(x.c)
x.aa(z,0,"pointercancel",v,w)
z.a4()
y.a=!1}}}},
ij:{
"^":"d:4;a,b",
$1:function(a){var z=this.b
if(z.c+500<z.b)if(this.a.a);}},
i9:{
"^":"d:1;a,b",
$1:function(a){this.a.b1(0,this.b)}},
ia:{
"^":"d:1;a,b",
$1:function(a){this.b.cI("failed to load image "+this.a)}}}],["","",,E,{
"^":"",
q:{
"^":"a;a",
aB:function(a){var z,y
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
k:function(a){return"[0] "+this.aS(0).k(0)+"\n[1] "+this.aS(1).k(0)+"\n[2] "+this.aS(2).k(0)+"\n[3] "+this.aS(3).k(0)+"\n"},
gf5:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.c(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=16)return H.c(z,b)
z[b]=c},
aS:function(a){var z,y,x
z=new Float64Array(H.i(4))
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
return new E.ak(z)},
bC:function(a){var z=new E.q(new Float64Array(H.i(16)))
z.aB(this)
return z},
t:function(a,b){var z,y,x
if(!!b.$isak){z=new Float64Array(H.i(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new E.ak(z)}if(!!b.$ist){z=new Float64Array(H.i(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new E.t(z)}if(4===b.gf5()){z=new Float64Array(H.i(16))
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
return new E.q(z)}throw H.e(P.aP(b))},
m:function(a,b){var z,y
z=new Float64Array(H.i(16))
y=this.a
z[0]=C.b.m(y[0],b.gC().h(0,0))
z[1]=C.b.m(y[1],b.gC().h(0,1))
z[2]=C.b.m(y[2],b.gC().h(0,2))
z[3]=C.b.m(y[3],b.gC().h(0,3))
z[4]=C.b.m(y[4],b.gC().h(0,4))
z[5]=C.b.m(y[5],b.gC().h(0,5))
z[6]=C.b.m(y[6],b.gC().h(0,6))
z[7]=C.b.m(y[7],b.gC().h(0,7))
z[8]=C.b.m(y[8],b.gC().h(0,8))
z[9]=C.b.m(y[9],b.gC().h(0,9))
z[10]=C.b.m(y[10],b.gC().h(0,10))
z[11]=C.b.m(y[11],b.gC().h(0,11))
z[12]=C.b.m(y[12],b.gC().h(0,12))
z[13]=C.b.m(y[13],b.gC().h(0,13))
z[14]=C.b.m(y[14],b.gC().h(0,14))
z[15]=C.b.m(y[15],b.gC().h(0,15))
return new E.q(z)},
G:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.p(b)
y=!!z.$isak
x=y?b.gN():1
if(!!z.$ist||y){w=z.gi(b)
v=z.gj(b)
u=z.ga8(b)}else{u=d
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
c1:function(a,b,c,d){var z,y,x,w,v,u
z=J.p(b)
y=!!z.$isak
x=y?b.gN():1
if(!!z.$ist||y){w=z.gi(b)
v=z.gj(b)
u=z.ga8(b)}else{u=d
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
v:function(){var z=this.a
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
fo:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
B:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
aB:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
return this},
k:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
m:function(a,b){var z,y,x,w
z=this.a
y=C.b.m(z[0],b.gC().h(0,0))
x=C.b.m(z[1],b.gC().h(0,1))
z=C.b.m(z[2],b.gC().h(0,2))
w=new E.t(new Float64Array(H.i(3)))
w.B(y,x,z)
return w},
t:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.B(b)
x=z[1]
z=z[2]
w=new E.t(new Float64Array(H.i(3)))
w.B(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.c(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=3)return H.c(z,b)
z[b]=c},
gn:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.a3(y*y+x*x+z*z))},
bC:function(a){var z=new E.t(new Float64Array(H.i(3)))
z.aB(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
sa8:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]}},
ak:{
"^":"a;a",
c3:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
aB:function(a){var z,y
z=this.a
y=a.a
z[3]=y[3]
z[2]=y[2]
z[1]=y[1]
z[0]=y[0]
return this},
k:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
m:function(a,b){var z,y,x,w,v
z=this.a
y=C.b.m(z[0],b.gC().h(0,0))
x=C.b.m(z[1],b.gC().h(0,1))
w=C.b.m(z[2],b.gC().h(0,2))
z=C.b.m(z[3],b.gC().h(0,3))
v=new E.ak(new Float64Array(H.i(4)))
v.c3(y,x,w,z)
return v},
t:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.B(b)
x=z[1]
w=z[2]
z=z[3]
v=new E.ak(new Float64Array(H.i(4)))
v.c3(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.c(z,b)
return z[b]},
l:function(a,b,c){var z=this.a
if(b>=4)return H.c(z,b)
z[b]=c},
gn:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.a3(y*y+x*x+w*w+z*z))},
bC:function(a){var z=new E.ak(new Float64Array(H.i(4)))
z.aB(this)
return z},
si:function(a,b){this.a[0]=b
return b},
sj:function(a,b){this.a[1]=b
return b},
sa8:function(a,b){this.a[2]=b
return b},
gi:function(a){return this.a[0]},
gj:function(a){return this.a[1]},
gN:function(){return this.a[3]}}}]]
setupProgram(dart,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.db.prototype
return J.da.prototype}if(typeof a=="string")return J.bf.prototype
if(a==null)return J.fS.prototype
if(typeof a=="boolean")return J.fR.prototype
if(a.constructor==Array)return J.aS.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bD(a)}
J.F=function(a){if(typeof a=="string")return J.bf.prototype
if(a==null)return a
if(a.constructor==Array)return J.aS.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bD(a)}
J.aM=function(a){if(a==null)return a
if(a.constructor==Array)return J.aS.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bD(a)}
J.az=function(a){if(typeof a=="number")return J.aT.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.cm.prototype
return a}
J.ac=function(a){if(typeof a=="number")return J.aT.prototype
if(typeof a=="string")return J.bf.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.cm.prototype
return a}
J.j=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.bD(a)}
J.y=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ac(a).m(a,b)}
J.D=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).u(a,b)}
J.T=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.az(a).an(a,b)}
J.b4=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.az(a).ag(a,b)}
J.ep=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ac(a).t(a,b)}
J.bK=function(a,b){if(a.constructor==Array||typeof a=="string"||H.k0(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.F(a).h(a,b)}
J.eq=function(a,b,c,d){return J.j(a).e4(a,b,c,d)}
J.er=function(a,b,c,d){return J.j(a).es(a,b,c,d)}
J.es=function(a){return J.j(a).ez(a)}
J.bL=function(a,b,c){return J.j(a).eB(a,b,c)}
J.cJ=function(a,b,c){return J.j(a).eC(a,b,c)}
J.et=function(a,b){return J.j(a).eE(a,b)}
J.eu=function(a,b,c,d,e){return J.j(a).eF(a,b,c,d,e)}
J.ev=function(a,b,c,d){return J.j(a).eG(a,b,c,d)}
J.ew=function(a,b){return J.aM(a).eJ(a,b)}
J.ex=function(a,b,c,d,e){return J.j(a).eK(a,b,c,d,e)}
J.ey=function(a,b){return J.j(a).eL(a,b)}
J.ez=function(a,b){return J.j(a).eO(a,b)}
J.cK=function(a,b,c,d,e){return J.j(a).eQ(a,b,c,d,e)}
J.eA=function(a,b){return J.ac(a).at(a,b)}
J.eB=function(a,b){return J.j(a).b1(a,b)}
J.bM=function(a,b,c){return J.F(a).eS(a,b,c)}
J.bN=function(a){return J.j(a).eV(a)}
J.eC=function(a){return J.j(a).eW(a)}
J.eD=function(a,b){return J.j(a).eX(a,b)}
J.eE=function(a,b){return J.j(a).eZ(a,b)}
J.cL=function(a,b){return J.j(a).f_(a,b)}
J.eF=function(a,b){return J.j(a).f6(a,b)}
J.eG=function(a,b,c,d,e){return J.j(a).f7(a,b,c,d,e)}
J.eH=function(a,b){return J.aM(a).af(a,b)}
J.cM=function(a,b){return J.j(a).fa(a,b)}
J.b5=function(a,b){return J.j(a).fb(a,b)}
J.eI=function(a,b){return J.aM(a).L(a,b)}
J.cN=function(a){return J.j(a).geI(a)}
J.aa=function(a){return J.j(a).gaH(a)}
J.G=function(a){return J.p(a).gD(a)}
J.eJ=function(a){return J.j(a).gp(a)}
J.b6=function(a){return J.aM(a).gM(a)}
J.aN=function(a){return J.F(a).gn(a)}
J.eK=function(a){return J.j(a).gcW(a)}
J.eL=function(a){return J.j(a).gcX(a)}
J.eM=function(a){return J.j(a).gcY(a)}
J.eN=function(a){return J.j(a).gcZ(a)}
J.eO=function(a){return J.j(a).gd_(a)}
J.eP=function(a){return J.j(a).gd0(a)}
J.eQ=function(a){return J.j(a).gd1(a)}
J.eR=function(a){return J.j(a).gbX(a)}
J.eS=function(a){return J.j(a).gq(a)}
J.eT=function(a){return J.j(a).gi(a)}
J.b7=function(a,b,c){return J.j(a).dm(a,b,c)}
J.eU=function(a){return J.j(a).dn(a)}
J.eV=function(a,b){return J.j(a).dq(a,b)}
J.cO=function(a,b){return J.j(a).dt(a,b)}
J.eW=function(a,b,c){return J.j(a).dv(a,b,c)}
J.eX=function(a,b){return J.aM(a).aw(a,b)}
J.aA=function(a,b){return J.j(a).bd(a,b)}
J.eY=function(a,b){return J.j(a).sp(a,b)}
J.eZ=function(a,b){return J.j(a).sac(a,b)}
J.f_=function(a,b){return J.j(a).sq(a,b)}
J.cP=function(a,b,c,d){return J.j(a).dJ(a,b,c,d)}
J.cQ=function(a,b,c,d){return J.j(a).dK(a,b,c,d)}
J.b8=function(a,b,c,d){return J.j(a).fL(a,b,c,d)}
J.P=function(a){return J.az(a).fM(a)}
J.cR=function(a){return J.az(a).ay(a)}
J.aO=function(a){return J.p(a).k(a)}
J.cS=function(a,b){return J.j(a).fO(a,b)}
J.b9=function(a,b,c,d,e,f,g){return J.j(a).fP(a,b,c,d,e,f,g)}
I.cE=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.A=W.fz.prototype
C.a=J.aS.prototype
C.B=J.da.prototype
C.c=J.db.prototype
C.b=J.aT.prototype
C.o=J.bf.prototype
C.L=J.hc.prototype
C.M=P.hs.prototype
C.N=J.cm.prototype
C.w=new H.d2()
C.x=new P.hb()
C.y=new P.iC()
C.z=new P.iW()
C.d=new P.ja()
C.r=new P.ae(0)
C.C=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.D=function(hooks) {
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
C.t=function getTagFallback(o) {
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
C.u=function(hooks) { return hooks; }

C.E=function(getTagFallback) {
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
C.F=function() {
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
C.G=function(hooks) {
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
C.H=function(hooks) {
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
C.I=function(_, letter) { return letter.toUpperCase(); }
C.v=H.f(I.cE([127,2047,65535,1114111]),[P.m])
C.J=new H.d6([0,"MinoTyoe.empty",1,"MinoTyoe.frame",2,"MinoTyoe.out",3,"MinoTyoe.l",4,"MinoTyoe.o",5,"MinoTyoe.s",6,"MinoTyoe.z",7,"MinoTyoe.j",8,"MinoTyoe.t",9,"MinoTyoe.L"])
C.K=new H.d6([0,"TinyPaintStyle.fill",1,"TinyPaintStyle.stroke"])
C.e=new F.a5(0)
C.q=new F.a5(1)
C.p=new F.a5(2)
C.h=new F.a5(3)
C.i=new F.a5(4)
C.j=new F.a5(5)
C.k=new F.a5(6)
C.l=new F.a5(7)
C.m=new F.a5(8)
C.n=new F.a5(9)
C.f=new F.i3(0)
$.dt="$cachedFunction"
$.du="$cachedInvocation"
$.a4=0
$.aB=null
$.cT=null
$.cA=null
$.ea=null
$.el=null
$.bC=null
$.bF=null
$.cB=null
$.av=null
$.aI=null
$.aJ=null
$.cv=!1
$.o=C.d
$.d4=0
$.d_=null
$.cZ=null
$.cY=null
$.cX=null
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
I.$lazy(y,x,w)}})(["d8","$get$d8",function(){return H.fM()},"d9","$get$d9",function(){return new P.fr(null)},"dI","$get$dI",function(){return H.a9(H.bv({toString:function(){return"$receiver$"}}))},"dJ","$get$dJ",function(){return H.a9(H.bv({$method$:null,toString:function(){return"$receiver$"}}))},"dK","$get$dK",function(){return H.a9(H.bv(null))},"dL","$get$dL",function(){return H.a9(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dP","$get$dP",function(){return H.a9(H.bv(void 0))},"dQ","$get$dQ",function(){return H.a9(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dN","$get$dN",function(){return H.a9(H.dO(null))},"dM","$get$dM",function(){return H.a9(function(){try{null.$method$}catch(z){return z.message}}())},"dS","$get$dS",function(){return H.a9(H.dO(void 0))},"dR","$get$dR",function(){return H.a9(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cp","$get$cp",function(){return P.iq()},"aK","$get$aK",function(){return[]},"dg","$get$dg",function(){return[500,250,200,150,110]},"bm","$get$bm",function(){return[150,150,125,100,85]},"c0","$get$c0",function(){return[150,125,100,95,85]},"di","$get$di",function(){return C.z},"c5","$get$c5",function(){return F.k(170,136,136,136)},"c6","$get$c6",function(){return F.k(170,85,51,51)},"c8","$get$c8",function(){return F.k(170,255,255,255)},"bo","$get$bo",function(){return F.k(170,0,0,0)},"c9","$get$c9",function(){return F.k(170,255,170,170)},"cb","$get$cb",function(){return F.k(170,170,255,170)},"c7","$get$c7",function(){return F.k(170,170,170,255)},"bn","$get$bn",function(){return F.k(170,255,255,170)},"ca","$get$ca",function(){return F.k(170,170,255,255)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,void:true},{func:1,args:[P.a6]},{func:1,args:[W.c1]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,P.ai]},{func:1,args:[,],opt:[,]},{func:1,ret:P.a6,args:[P.m]},{func:1,args:[W.ck]},{func:1,args:[,P.a6]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,],opt:[P.ai]},{func:1,ret:P.cx},{func:1,void:true,args:[P.a],opt:[P.ai]},{func:1,void:true,args:[,P.ai]},{func:1,args:[,,]},{func:1,ret:P.m,args:[,P.m]},{func:1,void:true,args:[P.m,P.m]},{func:1,args:[P.dA,,]},{func:1,args:[F.ch]},{func:1,args:[P.a6,,]},{func:1,ret:P.m,args:[,]},{func:1,args:[P.m]},{func:1,args:[P.m,,]},{func:1,ret:P.a2,args:[W.aW]},{func:1,args:[W.aW]},{func:1,ret:P.m,args:[P.O,P.O]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.k8(d||a)
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
Isolate.cE=a.cE
Isolate.b2=a.b2
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.en(F.ej(),b)},[])
else (function(b){H.en(F.ej(),b)})([])})})()