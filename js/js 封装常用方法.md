# js 封装常用方法

### 1. 获取数据类型

```
function getType(params) {
  return Object.prototype.toString.call(params).slice(8, -1)
}
```

### 2. 深拷贝

> 方法 1

```
function deepCopy(params) {
   var obj;
   if (typeof params === 'object') {
      if (Array.isArray(params)) {
        obj = [];
        for (var i = 0; i < params.length; i++) {
        obj.push(arguments.callee(params[i]))
      }
    } else {
      obj = {};
      for (var c in params) {
        obj[c] = arguments.callee(params[c]);
      }
    }
  } else { return params; }
    return obj;
  }
```

> 方法 2

```
function deepClone(obj) {
    // 如果是 值类型 或 null，则直接return
    if(obj === null || typeof obj !== 'object') {
        return obj
    }
    // 定义结果对象
    let copy = {}
    // 如果对象是数组，则定义结果数组
    if(Array.isArray(obj)) {
        copy = []
    }
    // 遍历对象的key
    for(let key in obj) {
        // 如果key是对象的自有属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用深拷贝方法
            copy[key] = deepClone(obj[key])
        }
    }
    return copy
}
```

### 3. 实现数字千分位

> 1）toLocaleString

```
  function toFormat(num) {
    num = Number(num);
    return num.toLocaleString();
  }
```

> 2）正则

```
  function toFormat(num) {
    num = num.toString();
    var t = /\B(?=(\d{3})+(?!\d))/g;
    if (!!~num.indexOf('.')) {
      var arr = num.split('.');
      return (arr[0] || '').replace(t, ',') + '.' + arr[1];
    }
    return num.replace(t, ',')
  }
```

### 4. 查询 url 后面参数

> 1）循环

```
function getParamsName(attr) {
  var url = location.href; // 'baidu.com?name=黎明&age=18&habit=basketball'
  var params = url.split('?')[1];
  if (!params) return {};
  var paramsObj = {};
  if (params) {
    var paramsList = params.split('&') || [];
    for (var i = 0; i < paramsList.length; i++) {
      var item = paramsList[i].split('=') || [];
      paramsObj[item[0]] = item[1];
    }
  }
  return decodeURIComponent(paramsObj[attr]);
}
```

> 2）正则

```
function getParamsName(attr) {
  let match = RegExp(`[?&]${attr}=([^&]*)`).exec(window.location.search)
  return match && decodeURIComponent(match[1])
}
```

### 5. 获取当前时间

```
function getDate() {
  var date = new Date();
  var year = date.getFullYear(),
  month = date.getMonth() + 1,
  day = date.getDate(),
  hour = date.getHours(),
  minute = date.getMinutes(),
  second = date.getSeconds();

  var fill = function (num) {
    num = num.toString();
    return num.padStart(2, '0') // 为个位数时 补充前面的零
  }

  var currentdate = `${year}-${fill(month)}-${fill(day)} ${fill(hour)}:${fill(minute)}:${fill(second)}`;
  return currentdate;
}
```

### 6. 数组去重

> 1） es5

```
function uniq(arr) {
  if (Array.isArray(arr)) {
    return arr.filter((item, index, array) => array.indexOf(item) === index);
  }
}
```

> 2）es6

```
function uniq(arr) {
  return [...new Set(arr)]
}
```

### 7. 计算字符串出现次数最多的字母

```
function count(str) {
  var obj = {}, max = { key: '', val: 1 };
  for (var i = 0; i < str.length; i++) {
    var item = str[i];
    !obj[item] ? obj[item] = 1 : obj[item]++;
    if (obj[item] > max.val) {
      max.val = obj[item];
      max.key = item;
    }
  }
  return max;
}
```

#### 未完待续...
