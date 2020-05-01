# html 渲染过程

1. 解析 html 文件，创建 DOM 树
   > 自上而下解析，遇到任何样式（link、style）和脚本（script）都会阻塞
   - css 加载不会阻塞 html 文件的解析，但会阻塞 dom 的渲染
   - css 加载会阻塞后面 js 语句的执行
   - js 会阻塞 html 的解析和渲染
   - 没有 defer 和 async 标签的 script 会立即加载并执行
   - 有 async 标签的 js，js 的加载执行和 html 的解析和渲染并行
   - 有 defer 标签的 js，js 的加载和 html 的解析和渲染并行，但会在 html 解析完成后执行,在触发 DOMContentLoaded 事件前执行
   - DOMContentLoaded 和 onload 的区别：DOMContentLoaded 在 html 解析完毕后执行，loload 在页面完全加载完成后执行（包括样式和图片）
2. 解析 css，生成 CSSOM，css 对象模型
3. dom 和 css 合并，构建渲染树（Render Tree）
4. 布局（Layout）和绘制（Paint），重绘（repaint）和重排（reflow/回流）
   - 重绘：根据元素的新属性重新绘制，使元素呈现新的外观
   - 重排：当渲染树中的一部分因为元素的规模尺寸，布局，隐藏等改变而需要重新构建
   - 重排必定会引发重绘，但重绘不一定会引发重排

## 补充：

> 监听资源加载完成有四种方式

1. window.onload = function(){....}
2. window.addEventListener("load",function(){....});
3. document.body.onload = function(){....}
4. <body onload = "load()">

##### 参考链接：

[js 和 css 的加载造成阻塞](https://www.cnblogs.com/bibiafa/p/9364986.html)
[浅析浏览器渲染页面过程](https://blog.csdn.net/yuhk231/article/details/53581212)
