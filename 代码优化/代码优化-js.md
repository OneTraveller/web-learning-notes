# 代码优化-js

## vue 相关

### created/mounted 里的代码提取为方法

原因：容易理解整个流程

> 修改前

```
mounted() {
  const { params1, params2 } = this.$route.params;
  this.params1 = params1;
  this.params2 = params2;
  this.getData();
}
```

> 修改后

```
mounted() {
  this.getRouteParams();
  this.getData();
},
methods: {
  getRouteParams() {
    const { params1, params2 } = this.$route.params;
    this.params1 = params1;
    this.params2 = params2;
  }
}
```

### 把常量写在 config 文件，如果表头、label 名称

原因：把常量抽取出后，1.vue 代码减少；2.vue 文件中主要写逻辑部分，后续容易定位和修改问题

### 把同一个模块下组件公共的方法写在 mixin 中

原因：代码复用，方便维护

### 组件中如果有写了 addEventListener 类似的监听事件，需要在组件销毁前移除掉

原因：避免出现多次监听的情况

### template 中出现较长或者重复的表达式语句，尽量写在 computed 或者 filters 中

原因：提高可读性和维护性

> 修改前

```
<div v-show="params.state === '0' || params.state === '1' || params.state === '2'"></div>
<div v-show="params.state === '0' || params.state === '1' || params.state === '2'"></div>
```

> 修改前

```
<div v-show="isShow"></div>
<div v-show="isShow"></div>
computed: {
  isShow() {
    return ['0', '1', '2'].includes(this.params.state);
  },
}
```

### metheds 中的方法尽量只做一件事，实现单一原则

原因：易维护

> 修改前

```
async submit() {
  const result = false;
  this.$refs.form.validate(valid => {
    if (valid) result = valid;
  });
  if (!result) return;
  const res = await this.xxx();
},
```

> 修改前

```
async submit() {
  if (!this.beforeSubmit()) return;
  const res = await this.xxx();
},
beforeSubmit() {
  const result = false;
  this.$refs.form.validate(valid => {
    if (valid) result = valid;
  });
  return result;
},
```

## 对象相关

### 使用对象属性速记语法

原因：更加简洁

> 修改前

```
const projectNo = 'no1213';
const map = { projectNo: projectNo };
```

> 修改后

```
const projectNo = 'no1213';
const map = { projectNo };
```

### 合并对象

```
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { ...a, ...b } // { a: 1, b: 2}
```

### 解构对象属性别名

```
const obj = { a: 0, b: 1, c: 2 };
const { a, b: d, c: e } = obj; // a d e => 0 1 2
```

### 删除多余的属性

原因：更加简洁，不影响之前的对象

> 修改前

```
const obj = { a: 1, b: 2, c: 3, d: 4 };
delete obj.a;
delete obj.b;
```

> 修改后

```
const obj = { a: 1, b: 2, c: , d: 4 };
const {a, b, ...newObj} = obj; // newObj: { c: 3, d: 4 };
```

### 循环赋值

原因：减少代码量，易维护

> 修改前

```
const { params1, params2, params3 } = res.data;
this.params1 = params1;
this.params2 = params2;
this.params3 = params3;
```

> 修改后

```
const keys = ['params1', 'params2', 'params3'];
keys.forEach((key) => {
  this[key] = res.data[key];
})

```

## 数组相关

### 合并数组

```
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [...arr1, ...arr2]; // [1, 2, 3, 4]
```

### 判断一个数组的元素大于零

原因：（0， '', null, undefined, NaN）经 if 转换布尔值后为 false，其他的经 if 转换布尔值后为 true

> 修改前

```
if (list && list.length > 0) {}
```

> 修改后

```
if (list && list.length) {}
```

### 创建指定长度数组

原因：适合创建长数组

> 修改前

```
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
```

> 修改后

```
const arr = [...new Array(10).keys()];
// arr => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 交换赋值

原因：减少代码量

> 修改前

```
let a = 0;
let b = 1;
let c = a;
a = b;
b = c;
// a b => 1 0
```

> 修改后

```
let a = 0;
let b = 1;
[a, b] = [b, a];
// a b => 1 0
```

### 如果对一个变量有多种值的判断，可以使用 includes

> 修改前

```
if (this.params.type === '1' || this.params.type === '2') {}
```

> 修改后

```
if (['1', '2'].includes(this.params.type)) {}
```

### 循环数据量大的数组时，可以使用 some 代替 forEach

原因：提高性能，使用 forEach 会循环每个元素，使用 some 循环时，遇到满足条件是，便跳出整个循环

## 函数相关

### 优雅处理非空参数

```
function isRequired() {
    throw new Error("param is required");
}
function func(name = isRequired()) {
    console.log(name);
}
func(); // "param is required"
func("tom"); // tom
```

### 参数不要过多，如果两个以上的参数，建议写成解构赋值的形式，这样就不用考虑参数的顺序

> 修改前

```
function fn(params1, params2, params3) {}
```

> 修改前

```
function fn({params1, params2, params3}) {}
```

## 其他

### 命名小技巧

原因：解决命名的苦恼

1. 变量添加前缀：max min init new start end
2. 数据添加后缀：data list map
3. 函数添加前缀：can has is get set load query

### 判空

原因：保证代码的健壮性。对于后端返回来的数据，值是不确定的，需要进行判空，避免报错，导致流程终止

> 修改前

```
const res = await this.getData();
this.projectNo = res.data.projectNo
```

> 修改后

```
const res = await this.getData() || {};
this.projectNo = (res.data || {}).projectNo
```

### 尽量避免使用 if else

原因：增加代码可读性和维护性

1. 用 return 代替

> 修改前

```
if (isApiResponseOk(res)) {
  // todo
} else {
  errorTip(this, res)
}
```

> 修改后

```
if (isApiResponseOk(res)) {
  // todo
  return;
}
errorTip(this, res)
```

2. 使用三目运算代替

> 修改前

```
if (type === 'detail') {
  this.state = '0';
} else {
  this.state = '1';
}
```

> 修改后

```
this.state = type === 'detail' ? '0' : '1';
```

3. 使用映射关系代替

> 修改前

```
if (type === 'detail') {
  this.state = '0';
} else if (type === 'add') {
  this.state = '1';
} else if (type === 'modify') {
  this.state = '2';
}
```

> 修改后

```
const map = {
  detail: '0',
  add: '1',
  modify: '2',
}
this.state = map[type];
```

### if 括号里的判断尽量简短，如果过长，可以抽出来

原因：提高可读性

> 修改前

```
if (
  this.params.type === 'detail' || this.params === 'add' || this.params === 'modify'
) {}
```

> 修改后

```
const flag = this.params.type === 'detail' || this.params === 'add' || this.params === 'modify';
if (flag) {}
// 或者
const flag = ['detail', 'add', 'modify'].includes(this.params.type);
if (flag) {}
```

### 使用 Math 判断数值大小

原因：代码量减少

> 修改前

```
const data = data1 > data2 ? data1 : data2;
```

> 修改后

```
const data = Math.max(data1, data2);
```

### 对比时间（前提是格式一致）

> 修改前

```
const time1 = '2020-02-02';
const time2 = '2020-02-03';
new Date(time1) > new Date(time2); // false
```

> 修改后

```
const time1 = '2020-02-02';
const time2 = '2020-02-03';
time1 > time2; // false
```

### 使用变量保存层级较多的数据

原因：减少代码量，方便维护

> 修改前

```
const { projectNo } = data.info[0] || {};
this.$set(data.info[0], 'date', '2020-10-01');
```

> 修改后

```
const info = data.info[0] || {};
const { projectNo } = info;
this.$set(info, 'date', '2020-10-01');
```

### 请求接口的时候对异常进行处理

原因：保证代码的健壮性

> 修改前

```
async getData() {
  this.loading = true;
  const res = await this.xxx();
  if (isResponseOk(res)) {
    this.tableData = res.data;
    // todo
  } else {
    errorTip(this, res);
  }
  this.loading = false;
}
```

> 修改后

```
async getData() {
  this.loading = true;
  try {
    const res = await this.xxx();
    if (isResponseOk(res)) {
      this.tableData = res.data;
      // todo
    } else {
      errorTip(this, res);
    }
  } finally {
    this.loading = false;
  }
}
```
