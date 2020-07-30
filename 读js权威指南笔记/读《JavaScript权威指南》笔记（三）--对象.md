# 读《JavaScript 权威指南》笔记（三）--对象

1. 对象介绍
   对象是 JavaScript 的基本数据类型。对象是一种复合值：它将很多值（原始值或者其他对象）聚合在一起，可通过名字访问这些值。对象也可看做是属性的无序集合，每个属性都是一个名/值对。属性名是字符串，因此我们可以把对象看成是从字符串到值的映射。
   由于 JavaScript 是弱类型语言，因此不必遵循这条规定，在任何对象中程序都可以创建任意数量的属性。除了字符串、数字、true、false、null 和 undefined 之外，JavaScript 中的值都是对象。

2. 对象属性的操作
   1）对象对于点(.)来说，右侧必须是一个以属性名称命名的简单标识符。对于方括号来说([])，方括号内必须是一个计算结果为字符串的表达式，这个字符串就是属性的名字
   2）使用方括号和一个字符串，看起来更像数组，只是这个数组元素是通过字符串索引而不是数字索引。这种数组就是我们所说的关联数组，也称做散列、映射或字典 JavaScript 对象都是关联数组
   3）由于在写程序的时候不知道属性名称，因此无法通过点运算符(.)来访问对象 portfolio 的属性。但可以使用[]运算符，因为它使用字符串值（字符串值是动态的，可以在运行时更改）而不是标识符（标识符是静态的，必须写死在程序中）作为索引对属性进行访问。
   4）delete 运算符只能删除自有属性，不能删除继承属性
   5）在这些场景下给对象 o 设置属性 p 会失败：
   o 中的属性 p 是只读的：不能给只读属性重新赋值（defineProperty（）方法中有一个例外，可以对可配置的只读属性重新赋值）。
   o 中的属性 p 是继承属性，且它是只读的：不能通过同名自有属性覆盖只读的继承属性。
   o 中不存在自有属性 p：o 没有使用 setter 方法继承属性 p，并且 o 的可扩展性（extensible attribute）是 false（参照 6.8.3 节）。如果 o 中不存在 p，而且没有 setter 方法可供调用，则 p 一定会添加至 o 中。但如果 o 不是可扩展的，那么在 o 中不能定义新属性。

6）属性赋值要么失败，要么创建一个属性，要么在原始对象中设置属性，但有一个例外，如果 o 继承自属性 x，而这个属性是一个具有 setter 方法的 accessor 属性，那么这时将调用 setter 方法而不是给 o 创建一个属性 x。需要注意的是，setter 方法是由对象 o 调用的，而不是定义这个属性的原型对象调用的。因此如果 setter 方法定义任意属性，这个操作只是针对 o 本身，并不会修改原型链。
var unitcircle = { r:1 }; // 一个用来继承的对象
var c = inherit（unitcircle）; // c 继承属性 r
c.x = 1; c.y = 1; // c 定义两个属性
c.r = 2; // c 覆盖继承来的属性
unitcircle.r; // => 1，原型对象没有修改

3. 对象的继承
   假设要查询对象 o 的属性 x，如果 o 中不存在 x，那么将会继续在 o 的原型对象中查询属性 x。如果原型对象中也没有 x，但这个原型对象也有原型，那么继续在这个原型对象的原型上执行查询，直到找到 x 或者查找到一个原型是 null 的对象为止。可以看到，对象的原型属性构成了一个“链”，通过这个“链”可以实现属性的继承。
   现在假设给对象 o 的属性 x 赋值，如果 o 中已经有属性 x（这个属性不是继承来的），那么这个赋值操作只改变这个已有属性 x 的值。如果 o 中不存在属性 x，那么赋值操作给 o 添加一个新属性 x。如果之前 o 继承自属性 x，那么这个继承的属性就被新创建的同名属性覆盖了。属性赋值操作首先检查原型链，以此判定是否允许赋值操作。例如，如果 o 继承自一个只读属性 x，那么赋值操作是不允许的。如果允许属性赋值操作，它也总是在原始对象上创建属性或对已有的属性赋值，而不会去修改原型链。在 JavaScript 中，只有在查询属性时才会体会到继承的存在，而设置属性则和继承无关，这是 JavaScript 的一个重要特性，该特性让程序员可以有选择地覆盖（override）继承的属性。

4. 循环对象
   for/in 循环对象的可枚举的属性，包括自身和继承的属性；
   Object.keys()它返回一个数组，这个数组由对象中可枚举的自有属性的名称组成;
   Object.getOwnPropertyNames（），它和 Ojbect.keys（）类似，只是它返回对象的所有自有属性的名称，而不仅仅是可枚举的属性

5. 判断某个属性是否存在于某个对象中
   判断某个属性是否存在于某个对象中。可以通过 in 运算符、hasOwnPreperty（）和 propertyIsEnumerable（）方法来完成这个工作，甚至仅通过属性查询也可以做到这一点。
   1）in 运算符的左侧是属性名（字符串），右侧是对象。如果对象的自有属性或继承属性中包含这个属性则返回 true：
   var o = { x: 1 }
   "x" in o; // true："x"是 o 的属性
   "y" in o; // false："y"不是 o 的属性
   "toString" in o; // true：o 继承 toString 属性

2）对象的 hasOwnProperty（）方法用来检测给定的名字是否是对象的自有属性。对于继承属性它将返回 false：
var o = { x: 1 }
o.hasOwnProperty（"x"）; // true：o 有一个自有属性 x
o.hasOwnProperty（"y"）; // false：o 中不存在属性 y
o.hasOwnProperty（"toString"）; // false：toString 是继承属性

3）propertyIsEnumerable()是 hasOwnProperty（）的增强版，只有检测到是自有属性且这个属性的可枚举性（enumerable attribute）为 true 时它才返回 true。某些内置属性是不可枚举的。通常由 JavaScript 代码创建的属性都是可枚举的

4）另一种更简便的方法是使用“!==”判断一个属性是否是 undefined
var o = { x: 1 }
o.x !== undefined; //true: o 中有属性 x
o.y !== undefined; // false: o 中没有属性 y
o.toString !== undefined; //true: o 继承了 toString 属性

6.  getter 和 setter
    当程序查询存取器属性的值时，JavaScript 调用 getter 方法（无参数）。这个方法的返回值就是属性存取表达式的值。当程序设置一个存取器属性的值时，JavaScript 调用 setter 方法，将赋值表达式右侧的值当做参数传入 setter。从某种意义上讲，这个方法负责“设置”属性值。可以忽略 setter 方法的返回值。
    我们将存取器属性的 getter 和 setter 方法看成是属性的特性。按照这个逻辑，我们也可以把数据属性的值同样看做属性的特性。因此，可以认为一个属性包含一个名字和 4 个特性。数据属性的 4 个特性分别是它的值（value）、可写性（writable）、可枚举性（enumerable）和可配置性（configurable）。存取器属性不具有值（value）特性和可写性，它们的可写性是由 setter 方法存在与否决定的。因此存取器属性的 4 个特性是读取（get）、写入（set）、可枚举性和可配置性。

    ```
    var o = {
      // 普通的数据属性
      data_prop: value,
      // 存取器属性都是成对定义的函数
      get accessor_prop（）{ /*这里是函数体 */ },
      set accessor_prop（value）{ /* 这里是函数体*/ }
    };
    ```

7.  其他

01 isPrototypeOf() 检测一个对象是否是另一个对象的原型（或处于原型中）
object1.isPrototypeOf(object2);
判断指定对象 object1 是否存在于另一个对象 object2 的原型链中
var a = {b : 1};
Object.prototype.isPrototypeOf(a) // true

02 hasOwnProperty()方法用来检测给定的名字是否是对象的自有属性

03 propertyIsEnumerable()检测到是自有属性且这个属性的可枚举性

04 toString()讲对象转成字符串，没有参数，返回"[object Object]"

05 valueOf() 讲对象转成某种原始值而非字符串

06 Object.getPrototypeOf(obj)是用来得到 obj 对象的原型对象的标准方法

07 Object.create()创建对象

08 Object.keys()它返回一个数组，这个数组由对象中可枚举的自有属性的名称组成;

09 Object.values()它返回一个数组，这个数组由对象中可枚举的自有属性的值组成;

10 Object.entries()返回一个数组，成员是参数对象可枚举的自有属性的键值对数组。
var a = {b: 1, bb: 2}
Object.entries(a) // [["b", 1],["bb", 2]]

11 Object.assign()用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
var a = {b: 1};
Object.assign(a, {bb: 2}, {bbb: 3}) // {b: 1, bb: 2, bbb: 3}

12 Object.getOwnPropertyNames()，它和 Ojbect.keys()类似，只是它返回对象的所有自有属性的名称，而不仅仅是可枚举的属性(包括不可枚举的属性)

13 Object.getOwnPropertyDescriptors()返回某个对象属性的描述对象;
var a = {b: 1};
Object.getOwnPropertyDescriptors(a)
// b: {value: 1, writable: true, enumerable: true, configurable: true}

14 Object.defineProperty(obj, prop, descriptor) 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。如果不指定 configurable, writable, enumerable ，则这些属性默认值为 false，如果不指定 value, get, set，则这些属性默认值为 undefined
var obj = {};
Object.defineProperty(obj, 'name', {
configurable: false,
writable: true,
enumerable: true,
value: '张三'
})

15 Object.defineProperties()接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。

16 Object.is()是用来比较两个值是否严格相等的方法，与===的行为基本一致，与===的区别：01 Object.is(+0, -0) // false; 02 Object.is(NaN, NaN) // true

17 Object.preventExtensions() 让一个对象变的不可扩展，也就是永远不能再添加新的属性。Object.isExtensible()判断一个对象是否是可扩展

18 Object.seal() 让一个对象密封，并返回被密封后的对象。密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可能可以修改已有属性的值的对象。Object.isSealed() 判断一个对象是否是密封的

19 Object.freeze()冻结一个对象并返回被冻结的对象。冻结对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性的对象。也就是说，这个对象永远是不可变的。Object.isFrozen()判断一个对象是否被冻结
