# moment.js

> JavaScript 日期处理类库

1. 取值
```javascript
moment().get('year');
moment().get('month'); // 0 to 11
moment().get('date');
moment().get('hour');
moment().get('minute');
moment().get('second');
moment().get('millisecond');
```

2.加法

```javascript
moment().add(7, 'days'); // 当前时间加上7天
moment().add(2, 'months') // 当前时间加上2个月
moment().add(2, 'years') // 当前时间加上2年
```
  

3.减法

```javascript
moment().subtract(7, 'days'); // 当前时间减去7天
moment().subtract(2, 'months') // 当前时间减去2个月
moment().subtract(2, 'years') // 当前时间减去2年
```
  

4.转换为毫秒数进行比较大小

```javascript
moment('2017-12-18 00:20', 'YYYY-MM-DD HH:mm').valueOf() => 1513527600000
```
  

# underscore.js

一、简介
Underscore.js是一个JavaScript实用库，提供了一整套函数式编程的实用功能。它提供了100多种函数，弥补了部分jQuery没有实现的功能，在项目中使用很方便。


二、下载和安装 
1. 下载网址：
  http://www.css88.com/doc/underscore/underscore.js
2. Node.js 安装 
  npm install underscore
3. Bower 安装
  bower install underscore


三、常用的方法（数组）
1. _range([start], stop, [step])
  一个用来创建整数灵活编号的列表的函数
  _.range(5) => [01,2,3,4]
  _.range(0,20) =>[0,5,10,15]

2. _each(list, func)遍历list的所有元素

3. _map(list, func) 通过对list里的每个元素调用转换函数生成一个与之相对应的数组
  _.map([1, 2, 3], function(num){ return num * 3; });
  => [3, 6, 9]
  用map有一个缺点 比如
  _.map([{age:1},{age:2},{age:3}], function(item){ 
  if (item.age > 1) return item;
  });
  => [undefined, {age:2}, {age:3}]
  使用_.compact(array) 可以去掉数组中的所有 false, null, 0, "", undefined 和 NaN 的值 =>[{age:2}, {age:3}]

4. _.filter(list, func) 过滤掉不满足条件的元素
  var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){
  return num % 2 == 0; });
  => [2, 4, 6]

5. _.toArray(list)把list转换成一个数组，在转换 arguments 对象时非常有用
  (function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
  => [2, 3, 4]

6. _.min 和 _.max 获取list中最小最大值

7. _.first(array, [n])返回array中最后一个元素。传递 n参数将返回数组中从最后一个元素开始的n个元素
  _.first([5, 4, 3, 2, 1],3) =>[5,4,3]

8. _.last(array, [n]) 从数组中最后一个开始截取

9. flatten_.flatten(array) 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组
  _.flatten([1, [2], [3, [[4]]]]) => [1, 2, 3, 4];

10. _.intersection(*arrays) 返回数组的交集
  _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])=> [1, 2]

11. _.difference(array, *others) 返回的值来自array参数数组，并且不存在于other 数组。
  _.difference([1, 2, 3, 4, 5], [5, 2, 10]);=> [1, 3, 4]

12. _.object(list,[value])将数组转换为对象
  _.object(['moe', 'curly'], [30, 50]);=> {moe: 30,curly: 50}

13. _.uniq(arry) 数组去重
  _.uniq([1,2,3,4,5,3,2,2,1]) =>[1,2,3,4,5]

14. _.reduce(list,func,[memo])把list中元素归结为一个单独的数值,memo为初始值
  _.reduce([1, 2, 3], function(memo, num){ 
  return memo + num; }, 0) =>6
  用_.reduce可以使含有对象的数组去重
  var arr = [{name:'N',age:2},{name:'N',age:3},{name:'M',age:2}], hash = {};
  arr = _.reduce(arr, function(item, next) {
  hash[next.age] ? '' : hash[next.age] = true && item.push(next);
  return item
  }, [])
  =>[{name:'N',age:2},{name:'N',age:3}]


四、常用的方法（对象）
1. _.keys(object) 返回对象所有的key
  _.keys({one: 1, two: 2, three: 3}); => ["one", "two", "three"]

2. _.values(object) 返回对象所有的value
  _.values({one: 1, two: 2, three: 3}); => [1, 2, 3]

3. _.isEqual(object, other) 执行两个对象之间的优化深度比较，确定他们是否应被视为相等
  var stooge = {name: 'moe', luckyNumbers: [13, 27, 34]};
  var clone = {name: 'moe', luckyNumbers: [13, 27, 34]};
  stooge == clone; => false
  _.isEqual(stooge, clone); => true

4. _.isEmpty(object) 判断一个对象是否为空
  _.isEmpty({});=> true

5. _.clone(object) 克隆一个对象
  _.clone({name: 'moe'});=> {name: 'moe'};


五、常用的方法（函数）
1. _.delay(function, wait, *arguments) 类似setTimeout，等待wait毫秒后执行函数
2. _.debounce(function, wait, [true]) 在 wait 时间间隔的开始调用function,在wait时间内不会再次调用function，对不小小点击多次次按钮是很有帮助
3. _.throttle(function, wait, [options])当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助
4. _.once(function)创建一个只能调用一次的函数，重复调用改进的方法也没有效果，只会返回第一次执行时的结果
5. _.after(count, function)创建一个函数, 只有在运行了 count 次之后才有效果
6. _.compose(*functions) 返回函数集 functions 组合后的复合函数, 也就是一个函数执行完之后把返回的结果再作为参数赋给下一个函数来执行. 以此类推. 在数学里, 把函数 f(), g(), 和 h() 组合起来可以得到复合函数 f(g(h()))var greet = function(name){ return "hi: " + name; };
  var exclaim = function(statement){ return statement.toUpperCase() + "!"; };
  var welcome = _.compose(greet, exclaim);
  welcome('moe');
  => 'hi: MOE!'


六、常用的方法（实用功能）
1. _.random(min, max) 返回一个min 和 max之间的随机整数
  _.random(0, 100);=> 42

2. _.unescape(string)转义HTML字符串，替换&, &lt;, &gt;, &quot;, &#96;, 和 &#x2F;字符
  _.unescape('&lt;h1&gt;underscope&lt;/h1&gt;')
  => <h1>underscope</h1>

3. _.now() 一个优化的方式来获得一个当前时间的整数时间戳
  _.now() => 1392066795351

4. _.iteratee(value, [context]) 一个重要的内部函数用来生成可应用到集合中每个元素的回调， 返回想要的结果
  var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
  _.min(stooges, _.iteratee('age')) => {name: 'moe', age: 21}

5. _.template(templateString, [settings]) 将 JavaScript 模板编译为可以用于页面呈现的函数, 对于通过JSON数据源生成复杂的HTML并呈现出来的操作非常有用.
  var test = 'underscoper-test';
  var compiled = _.template("<p>hello: <%= test %></p>");
  compiled() => '<p>hello: underscoper-test</p>'
  这样可以不用拼接字符串 类似与ES6中的``

6. _.mixin(object) 允许用您自己的实用程序函数
  _.mixin({capitalize: function(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }});
  _("fabio").capitalize();
  => "Fabio"

 


 

参考：
1.http://www.css88.com/doc/underscore/
2.http://momentjs.cn/