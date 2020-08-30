# css 学习笔记

## 文本

```
text-indent: 2rem; // 前面空两格
letter-spacing: 3px; // 字体的间隔
word-spacing: 3px; // 单词的间隔
word-wrap: break-word; // normal|break-word // 允许单词过长时自动换行，防止溢出
word-break: break-all; // normal|break-all|keep-all; keep-all只能在半角空格或连字符处换行(和normal类似) // 单词过长，强制切断然后换行，节省空间
white-space: nowrap; // 规定文本不换行，遇到<br/>标签会换行
user-select: none; // 不能选择文本
pointer-events: none; // 用来禁用鼠标的事件
::selection { background: #000; color: #ff0; } // 设置选中文本的背景色和字体颜色
```

## 省略号

```
// 一行超出后显示省略号
.hidden {
  text-overflow: ellipsis; // 处理当文本溢出包含元素时的情况
  overflow: hidden;
  white-space: nowrap;
}

// 两行超出后显示省略号
.hidden {
  overflow: hidden;
  display: -webkit-box;/* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical;/* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-line-clamp: 2;/* 用来限制在一个块元素显示的文本的行数 */
}
```

## :before/:after

### 获取 attr 的内容并设置样式

```
[data-unit]:after {
  content: attr(data-unit);
  color: #f00;
}
<p data-unit="元">剩余话费40</p>
```

### 添加复杂样式

```
.content {
  position: relative;
  height: 200px;
  width: 200px;
  border: 1px solid;
}
.live-after:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 transparent;
  transition: all 1s linear;
}
.live-after:hover:after {
  background: #ff0;
  box-shadow: 0 0 20px 20px #aaa;
  transform: scale(1.4) rotate(180deg);
  opacity: 0;
}

<div class="content"><div class="live-after"></div></div>
```

### counter：计数器

```
ul {
  counter-reset: sublist;
  list-style: none;
}
li:before {
  counter-increment: sublist;
  content: counter(sublist) '.';
}

<ul>
  <li>
    title
    <ul>
      <li>subtitle</li>
      <li>subtitle</li>
    </ul>
  </li>
  <li>title</li>
</ul>
```

## 边框图片

```
.border-img {
  border: 10px solid transparent;
  border-image: url('http://c.cncnimg.cn/037/264/1e4e_m.jpg') 30 round;
}
```

## 变量

用：root 声明全局变量，引用 var(--color)

```
:root {
　　--color: red;
}
body {
　　backgroud: var(--color);
}
```

## img 自适应

```
img{
  width: 100%;
  height: 100%;
  object-fit: fill|contain|cover|none|scale-down;
}
```

## 边框

border-style: dotted 点状边框/ dashed 虚线边框/ solid 实线边框/ double 双实线边框，width 最小为 3px

## background 背景

```
//语法
background: green url('xxx.jpg') no-repeat center top fixed / cover content-box padding-box;
```

background-color: 色值;
background-image: url('');
background-repeat: repeat/no-repeat/repeat-X/repeat-Y; 是否重复
background-attachment: scroll/fixed; 是否固定
background-position: top left/center center/x% y%;位置
background-size: x% y%/auto/cover/contain;尺寸
background-origin: border-box/content-box/padding-box;定位区域
background-clip: border-box/content-box/padding-box/no-clip;绘制区域

background-origin 和 background-clip 的区别
background-origin 定义的是背景位置（background-position）的起始点；而 background-clip 是对背景（图片和背景色）的切割。

## animation 动画

```
// 语法
animation-name: name 6s ease 3s infinite normal;
@keyframes animation-name { 0% {}; 100% {} }
```

animation-name: name; // 动画名称
animation-duration: 6s; // 动画时间
animation-timing-function: linear/ease(默认值，快到慢)/ease-in(越来越快)/ease-out(越来越慢)/ease-in-out(先加速后减速);
animation-delay: 3s; // 动画延长时间
animation-iteration-count: number/infinite; // 动画次数
animation-direction: // 动画方向
animation-direction: normal/reverse(反向播放)/inherit(从父元素继承该属性)/alternate(动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放)/alternate-reverse(动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。)

## 阴影

```
.box-shadow {
    box-shadow: 10px 10px 5px #000;
}
```

h-shadow: 必需的，水平阴影的位置，允许负值
v-shadow: 必需的，垂直阴影的位置，允许负值
blur: 可选。模糊距离
spread: 可选。阴影的大小
color: 可选。阴影的颜色
inset: 可选。从外层的阴影改变阴影内侧阴影

## mix-blend-mode

mix-blend-mode 属性描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合。

```
.container img {
  mix-blend-mode: darken;
}
```
