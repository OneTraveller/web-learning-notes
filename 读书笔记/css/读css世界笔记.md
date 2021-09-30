# 读 css 世界笔记

1. line-height
   取值：
   normal 默认。设置合理的行间距。
   number 设置数字，此数字会与当前的字体尺寸相乘来设置行间距。
   length 设置固定的行间距。
   % 基于当前字体尺寸的百分比行间距。
   inherit 规定应该从父元素继承 line-height 属性的值。
   • 该属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最小距离，不允许负值。
   • line-height 与 font-size 的计算值之差（在 CSS 中成为“行间距”）分为两半，分别加到一个文本行内容的顶部和底部。可以包含这些内容的最小框就是行框。
   • line-height 如何通过改变行距实现文字排版？当 line-height 设为 2 的时候，半行距是一半的文字大小，两行文字中间的间隙差不多一个文字尺寸大小；如果 line-height 大小是 1 倍文字大小，则根据计算，半行距是 0，也就是两行文字会紧密依偎在一起；
   如果 line-height 值是 0.5，则此时的行距就是负值，虽然 line-height 不支持负值，但是行距可以为负值，此时，两行文字就是重叠纠缠在一起。
   • <div>高度是由行高决定的，而非文字
   • 似乎 line-height:1.5、line-height:150%和 line-height:1.5em 这 3 种用法是一模一样的，最终的行高大小都是和 font-size 计算值，但是，实际上，line-height:1.5 和另外两个有一点儿不同，那就是继承细节有所差别。
   如果使用数值作为 line-height 的属性值，那么所有的子元素继承的都是这个值；但是，如果使用百分比值或者长度值作为属性值，那么所有的子元素继承的是最终的计算值。
   • 实用例子：图片底部留有间隙的问题实例页面: https://demo.cssworld.cn/5/3-5.php

2. vertical-align
   取值 1.数值百分比类：20px、2em、20%等 2.上标下标类：sub、super 3.文本类：text-top、text-bottom 4.线类：baseline(默认值)、top、middle、bottom
   • vertical-align 属性只能作用在 display 计算值为 inline、inline-block, inline-table 或 table-cell 的元素上。
   因此，默认情况下，<span>、<strong>、<em>等内联元素，<img>、<button>、<input>等替换元素，
   非 HTML 规范的自定义标签元素，以及<td>单元格，都是支持 vertical-align 属性的，其他块级元素则不支持。
   • 基本上所有的字体中，字符 x 的位置都是偏下一点儿的，font-size 越大偏移越明显，这才导致默认状态下的 vertial-align:middle 实现的都是“近似垂直居中”。为了直观一些，可看下这个例子https://demo.cssworld.cn/5/3-8.php
   设置 font-size 为 0，可实现真正意义上的垂直居中
   • 对于内联元素，如果大家遇到不太好理解的现象，请一定要意识到，有个“幽灵空白节点”以及无处不在的 vertical-align 属性。

3. ex
   ex 是 CSS 中的一个相对单位，指的是小写字母 x 的高度，没错，就是指 x-height。

4. width 的流动性
   所谓流动性，并不是看上去的宽度 100%显示这么简单，而是一种 margin/border/padding 和 content 内容区域自动分配水平空间的机制。

5. 伪类与伪元素
   伪元素：伪元素用于创建一些不在文档树中的元素，并且为其添加样式
   ::after、::before、::backdrop、::first-letter、::first-line、::selection
   css 伪类用于向某些选择器添加特殊效果
   :active、:focus、:checked、:hover、:visited、:link、:disabled
   :first-child 选择某个元素的第一个子元素；
   :last-child 选择某个元素的最后一个子元素；
   :nth-child() 选择某个元素的一个或多个特定的子元素；
   :nth-last-child() 选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算；
   :nth-of-type() 选择指定的元素；
   :nth-last-of-type() 选择指定的元素，从元素的最后一个开始计算；
   :first-of-type 选择一个上级元素下的第一个同类子元素；
   :last-of-type 选择一个上级元素的最后一个同类子元素；
   :only-child 选择的元素是它的父元素的唯一一个了元素；
   :only-of-type 选择一个元素是它的上级元素的唯一一个相同类型的子元素；
   :empty 选择的元素里面没有任何内容。

6. BFC
   BFC 全称为块格式化上下文(Block Formatting Context)，简单的理解为：内部的元素不影响外部的元素，外部的元素不影响内部的元素。
   具有 BFC 特性的元素
   • <html>根元素；
   • float 的值不为 none；
   • overflow 的值为 auto、scroll 或 hidden；
   • display 的值为 table-cell、table-caption 和 inline-block 中的任何一个；
   • position 的值不为 relative 和 static。
   主要作用：
   • 消除 marigin 合并的问题
   • 消除浮动的问题
   • 实现更健壮、更智能的自适应布局

7. clip
   语法：clip: rect(top, right, bottom, left);
   clip: rect(30px 200px 200px 20px)
   可以想象，我们手中有一把剪刀，面前有一块画布，rect(30px 200px 200px 20px)表示的含义就是：距离画布上边缘 30px 的地方剪一刀，距离画布右边缘 200px 的地方剪一刀，
   距离画布下边缘 200px 的地方剪一刀，距离画布左边缘 20px 的地方剪一刀。最终我们就得到一个新的剪裁好的矩形画布
