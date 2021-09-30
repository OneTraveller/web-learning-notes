# 读 css 选择器世界笔记

> 上周末花了两天时间，看完了 css 选择器世界，学到挺多新的东西，做笔记记录一下。--2021-09-13

## 增加优先级小技巧

大部分写法

```css
/* 增加嵌套 */
.father .foo {
}
/* 增加标签选择器 */
div.foo {
}
```

但这些都不是最好的方法，因为这些方法增加了耦合，降低了可维护性，一旦哪天父元素类名变化了，或者标签换了，样式岂不是就失效了？这里给大家介绍一个增加 CSS 选择器优先级的小技巧，那就是重复选择器自身。例如，可以像下面这样做，既提高了优先级，又不会增加耦合，实在是上上之选

```css
.foo.foo {
}
.foo[class] {
}
#foo[id] {
}
```

提高标签选择器优先级的写法

1. 由于所有标准的 HTML 页面都有<html>和<body>元素，因此可以借助这些标签提高优先级

```
body foo {}
```

2. 借助:not()伪类，括号里面是任意其他不一样的标签名称即可

```
foo:not(not-foo) {}
foo:not(a) {}
foo:not(_) {}
```

> 不同等级的选择器之间的差距是无法跨越的存在(IE 除外)

## css 命名技巧

1. 从 html 标签寻找灵感

```
.cs-header
.cs-body
.cs-aside
.cs-main
.cs-nav
.cs-section
.cs-content
.cs-summary
.cs-detail
.cs-option
.cs-img
.cs-footer
```

2. 从 HTML 特定属性值中寻找灵感

```
.cs-radio
.cs-checkbox
.cs-range
```

3. 从 CSS 伪类和 HTML 布尔属性中寻找灵感

```
.cs-active
.cs-checked
.cs-checked
.cs-invalid
```

4. 组合命名，避免出现冲突

## 相邻兄弟选择符适合使用场景

举个简单的例子，当我们聚焦输入框的时候，如果希望后面的提示文字显示，则可以借助相邻兄弟选择符轻松实现，原理很简单，把提示文字预先埋在输入框的后面，当触发 focus 行为的时候，让提示文字显示即可

```
户名：<input><span class="cs-tips">不超过10个字符</span>
cs-tips {
   color: gray;
   margin-left: 15px;
   position: absolute;
   visibility: hidden;
}
:focus + .cs-tips {
   visibility: visible;
}
```

## 为什么没有前面兄弟选择符

们可以看到，无论是相邻兄弟选择符还是随后兄弟选择符，它们都只能选择后面的元素，我第一次认识这两个选择符的时候，就有这么一个疑问：为什么没有前面兄弟选择符？后来我才明白，没有前面兄弟选择符和没有父元素选择符的原因是一样的，它们都受制于 DOM 渲染规则。浏览器解析 HTML 文档是从前往后，由外及里进行的，所以我们时常会看到页面先出现头部然后再出现主体内容的情况。但是，如果 CSS 支持了前面兄弟选择符或者父元素选择符，那就必须要等页面所有子元素加载完毕才能渲染 HTML 文档。因为所谓“前面兄弟选择符”，就是后面的 DOM 元素影响前面的 DOM 元素，如果后面的元素还没被加载并处理，又如何影响前面的元素样式呢？如果 CSS 真的支持这样的选择符，网页呈现速度必然会大大减慢，浏览器会出现长时间的白板，这会造成不好的体验。

### 解决方案

兄弟选择符只能选择后面的元素，但是这个“后面”仅仅指代码层面的后面，而不是视觉层面的后面。也就是说，我们要实现前面兄弟选择符的效果，可以把这个“前面的元素”的相关代码依然放在后面，但是视觉上将它呈现在前面就可以了。

1. Flex 布局实现。Flex 布局中有一个名为 flex-direction 的属性，该属性可以控制元素水平或者垂直方向呈现的顺序。方法主要通过 flex-direction:row-reverse 调换元素的水平呈现顺序来实现。
   HTML 和 CSS 代码如下：

```html
<div class="cs-flex">
  <input class="cs-input" /><label class="cs-label">用户名：</label>
</div>
```

```css
.cs-flex {
  display: inline-flex;
  flex-direction: row-reverse;
}
.cs-input {
  width: 200px;
}
.cs-label {
  width: 64px;
}
:focus ~ .cs-label {
  color: darkblue;
  text-shadow: 0 0 1px;
}
```

2. float 浮动实现。通过让前面的<input>输入框右浮动就可以实现位置调换了。

3. absolute 绝对定位实现。这个很好理解，就是把后面的<label>绝对定位到前面就好了。

4. direction 属性实现。借助 direction 属性改变文档流的顺序可以轻松实现 DOM 位置和视觉位置的调换。
   这一方法可以彻底改变任意个数内联元素的水平呈现位置，兼容性非常好，也容易理解。唯一不足就是它针对的必须是内联元素，好在本案例的文字和输入框就是内联元素，比较适合。

```html
<div class="cs-direction">
  <input class="cs-input" /><label class="cs-label">用户名：</label>
</div>
```

```css
/* 水平文档流顺序改为从右往左 */
.cs-direction {
  direction: rtl;
}
/* 水平文档流顺序还原 */
.cs-direction .cs-label,
.cs-direction .cs-input {
  direction: ltr;
}
.cs-label {
  display: inline-block;
}
:focus ~ .cs-label {
  color: darkblue;
  text-shadow: 0 0 1px;
}
```

大致总结一下这 4 种方法，Flex 方法适合多元素、块级元素，有一定的兼容性问题；direction 方法也适合多元素、内联元素，没有兼容性问题，由于块级元素也可以设置为内联元素，因此，direction 方法理论上也是一个终极解决方法；float 方法和 absolute 方法虽然比较适合小白开发，也没有兼容性问题，但是不太适合多个元素，比较适合两个元素的场景。大家可以根据自己项目的实际场景选择合适的方法。

## hover 链接显示有间隙的兄弟图片元素

```html
<a href>图片链接</a> <img src="1.jpg" />
```

```css
img {
  margin-left: 20px;
  visibility: hidden;
  transition: visibility 0.2s;
  position: absolute;
  z-index: 1;
}
a:hover + img,
img:hover {
  visibility: visible;
}
```

## 超实用超高频使用的:empty 伪类

1. 隐藏空元素

```css
.cs-module:empty {
  display: none;
}
```

2. 字段缺失智能提示

```css
.cs-module:empty::before {
  content: '暂无';
  color: gray;
}
```

## not 适合使用场景

优点：
（1）使代码更简洁。
（2）更好理解。
（3）保护了原类名的优先级，扩展性更强，更利于维护，这是最重要的一点。

```css
/* 最开始 */
.cs-panel {
  display: none;
}
.cs-panel.active {
  display: block;
}
/* 推荐 */
.cs-panel:not(.active) {
  display: none;
}
```

大家一定要培养这样的意识：一旦遇到需要重置 CSS 样式的场景，第一反应就是使用:not()伪类。
