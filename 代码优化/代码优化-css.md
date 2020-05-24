# 代码优化--css

## 尽量避免使用 important，可使用优先级叠加进行覆盖

原因：important 的优先级最高的，如果使用了 important，后续很难进行样式覆盖

> 优先级列表

- important：无穷大
- 内联样式：1000
- id 选择器：100
- 类选择器/属性选择器/伪类选择器：10
- 标签选择器/伪元素选择器：1

> 其实 max-xx 比 important 优先级更高；如下代码，最终的宽度为 200px

```
max-width: 200px;
width: 300px !important;
```

## 同一个 div 下的样式尽量嵌套在一起

原因：后续想把这个 div 去除掉，把关于这个 div 的整个嵌套样式删除既可

> html

```
<div class="content">
  <div class="title"></div>
</div>
```

> 修改前

```
.content {
  background: #fff;
}
.title {
  color: #ccc;
}
```

> 修改后

```
.content {
  background: #fff;
  .title {
    color: #ccc;
  }
}
```

## 除了使用全局变量，也可以使用局部变量

原因：用变量，修改起来方便

> 修改前

```
height: 20px;
line-height: 20px;
```

> 修改后

```
@height: 20px;
height: @height;
line-height: @height;
```

## 把一个模块下的组件公共样式抽取出来

原因：代码复用，方便维护

> 在 style 中引入

```
<style lang="less" scoped>
@import "common.less";
</style>
```

## 使用混入

原因：代码复用，方便维护

> 修改前

```
.class1 {
  position: absolute;
  top: 10px;
}
.class2 {
  position: absolute;
  top: 20px;
}
```

> 修改后

```
.setPosotion(@top) {
  position: absolute;
  top: @top;
}
.class1 {
  .setPosotion(10px);
}
.class2 {
  .setPosotion(20px);
}
```

## line-height 使用倍数

原因：line-height 会跟随 font-size 的大小变化，后续只需要修改 font-size 即可

> 修改前

```
font-size: 20px;
line-height: 30px;
```

> 修改后

```
font-size: 20px;
line-height: 1.5;
```

## 使用 calc

原因：减少代码量

> 修改前

```
position: absolute;
top: 50%;
left: 50%;
margin-top: -15px;
margin-left: -40px;
```

> 修改后

```
position: absolute;
top: calc(50% - 15px);
left: calc(50% - 40px);
```

## 代码易维护 vs 代码量少

原因：有时候代码易维护和代码量少是不可兼得，下面的修改前代码后续如果改变 padding 的值，要修改三个地方。修改后的代码虽然多了一行，不过改动一个地方即可

> 修改前

```
padding: 10px 10px 10px 0;
```

> 修改后

```
padding: 10px;
padding-left: 0;
```

## 使用 currentColor

原因：currentColor 是一个变量，自动与 color 保持一致。大多时候，border-color、outline-color、background、text-shadow、box-shadow 会与 color 一样的颜色，可以使用 currentColor 变量，后续方便维护。

> 修改前

```
color: blue;
border-bottom: 1px solid blue;
box-shadow: 5px 5px 5px blue;
```

> 修改后

```
color: blue;
border-bottom: 1px solid currentColor;
box-shadow: 5px 5px 5px currentColor;
```

## 使用继承

原因：很多时候，input、a 等标签的字体和颜色跟父元素的都不一样，可以使用继承改变这一点。

```
input, select, button { font: inherit; }
a { color: inherit; }
```
