# 读《JavaScript 权威指南》笔记（五）

1. getComputedStyle() 方法的返回值是一个 CSSStyleDeclaration 对象，它代表了应用在指定元素（或伪对象）上的所有样式。

2. clip
   style="clip: rect（0px 100px 100px 0px）;"

3. visibility 和 display 属性之间的差别可以从它们对使用静态或相当定位的元素的影响中看到。对于一个常规布局流中的元素，设置 visibility 属性为 hidden 使得元素不可见，但是在文档布局中仍保留了它的空间。类似的元素可以重复隐藏和显示而不改变文档布局。但是，如果元素的 display 属性设置为 none，在文档布局中不再给它分配空间，它各边的元素会合拢，就当它从来不存在。例如，在创建展开和折叠轮廓的效果时 display 属性很有用。visibility 和 display 属性对绝对和固定定位的元素的影响是等价的，因为这些元素都不是文档布局的一部分。然而，在隐藏和显示定位元素时一般首选 visibility 属性。

4. 定位和尺寸属性值以“px”结尾，代表像素。也可以使用英寸（“in”）、厘米（“cm”）、点（“pt”）和字体行高（“em”，一种当前字体行高的度量）。相对于使用上面的单位来指定绝对定位和尺寸，CSS 也允许指定元素的位置和尺寸为其容器元素的百分比。

5. 如果同时指定 left、right 和 width，那么 width 属性将覆盖 right 属性；如果元素的高度重复限定，height 属性优先于 bottom 属性。

6. 当浏览器厂商实现非标准 CSS 属性时，它们用将属性名前加了一个厂商前缀。Firefox 使用-moz-，Chrome 使用-webkit-，而 IE 使用-ms-

7. 如果<select>元素有 multiple 属性，也就是 Select 对象的 type 属性值为“select-multiple”，那就允许用户选取多个选项。否则，如果没有多选属性，那只能选取单个选项，它的 type 属性值为“select-one”。

8. clientWidth 和 clientHeight 类似 offsetWidth 和 offsetHeight，不同的是它们不包含边框大小，只包含内容和它的内边距。同时，如果浏览器在内边距和边框之间添加了滚动条，clientWidth 和 clientHeight 在其返回值中也不包含滚动条。注意，对于类似<i>、<code>和<span>这些内联元素，clientWidth 和 clientHeight 总是返回 0。
   scrollWidth 和 scrollHeight 是元素的内容区域加上它的内边距再加上任何溢出内容的尺寸。当内容正好和内容区域匹配而没有溢出时，这些属性与 clientWidth 和 clientHeight 是相等的。但当溢出时，它们就包含溢出的内容，返回值比 clientWidth 和 clientHeight 要大。

9. getClientRects 和 getBoundingClientRect
   getClientRects 获取元素占据页面的所有矩形区域，getClientRects 返回一个 TextRectangle 集合，就是 TextRectangleList 对象。TextRectangle 对象包含了, top left bottom right width height 六个属性。
   getBoundingClientRect 用于获得页面中某个元素的相对浏览器视窗的位置。判定一个元素的尺寸和位置最简单的方法是调用它的 getBoundingClientRect（）方法。该方法是在 IE 5 中引入的，而现在当前的所有浏览器都实现了。它不需要参数，返回一个有 left、right、top 和 bottom 属性的对象。left 和 top 属性表示元素的左上角的 X 和 Y 坐标，right 和 bottom 属性表示元素的右下角的 X 和 Y 坐标。
   getClientRects 和 getBoundingClientRect 都不是实时的。

10. nextSibling、previoursSibling 该节点的兄弟节点中的前一个和下一个。具有相同父节点的两个节点为兄弟节点。

11. 除“mouseenter”和“mouseleave”外的所有鼠标事件都能冒泡。focus 和 blur 事件不会冒泡，但其他所有表单事件都可以。scroll 不会冒泡

12. beforeunload 事件和 unload 类似，但它能提供询问用户是否确定离开当前页面的机会。

13. Document 对象并非独立的，它是一个巨大的 API 中的核心对象，叫做文档对象模型（Document Object Model，DOM），它代表和操作文档的内容。通用的 Document 和 Element 类型与 HTMLDocument 和 HTMLElement 类型之间是有严格的区别的。Document 类型代表一个 HTML 或 XML 文档，Element 类型代表该文档中的一个元素。HTMLDocument 和 HTMLElement 子类只是针对于 HTML 文档和元素。

14. location.search = "?page=" +（pagenum+1）; // 载入下一个页面

15. location = "#top"; // 跳转到文档的顶部

16. 一条 JS 注释内但在 IE 中执行的代码

```
/_@cc_on
@if（@\_jscript）
// 该代码位于一条 JS 注释内但在 IE 中执行它
alert（"In IE"）;
@end
@_/
```

17. defer 属性使得浏览器延迟脚本的执行，直到文档的载入和解析完成，并可以操作。async 属性使得浏览器可以尽快地执行脚本，而不用在下载脚本时阻塞文档解析。如果<script>标签同时有两个属性，同时支持两者的浏览器会遵从 async 属性并忽略 defer 属性。注意，延迟的脚本会按它们在文档里的出现顺序执行。而异步脚本在它们载入后执行，这意味着它们可能会无序执行。

18. 使用 src 属性时，<script>和</script>标签之间的任何内容都会忽略。如果同时指定 src 属性和一个未知的类型，那这个脚本会被忽略，并且不会从指定的 URL 里下载任何内容。

19. 在 HTML 文档里嵌入客户端 JavaScript 代码有 4 种方法：
    ·内联，放置在<script>和</script>标签对之间。
    ·放置在由<script>标签的 src 属性指定的外部文件中。
    ·放置在 HTML 事件处理程序中，该事件处理程序由 onclick 或 onmouseover 这样的 HTML 属性值指定。
    ·放在一个 URL 里，这个 URL 使用特殊的“javascript:”协议。

20. alert() 方法返回 undefined

21. Window 对象是所有客户端 JavaScript 特性和 API 的主要接入点

22. 数组推导
    let evensquares = [x*x for（x in range（0,10））if（x % 2 === 0）]
    //这段代码和下面这五行代码等价：
    let evensquares = [];
    for（x in range（0,10））{
    if（x % 2 === 0）
    evensquares.push（x\*x）;
    }
    //一般来讲，数组推导的语法如下：
    [ expressionfor（variablein object）if（condition）]

23. 解构赋值右侧的数组所包含的元素不必和左侧的变量一一对应，左侧多余的变量的赋值为 undefined，而右侧多余的值则会忽略。左侧的变量列表可以包含连续的逗号用以跳过右侧对应的值。
    let [x,y] = [1]; // x = 1, y = undefined
    [x,y] = [1,2,3]; // x = 1, y = 2
    [,x,,y] = [1,2,3,4]; // x = 2, y = 4
    如果省略数组直接量中的某个值，省略的元素将被赋予 undefined 值：

var count = [1,,3]; // 数组有 3 个元素，中间的那个元素值为 undefined
var undefs = [,,]; // 数组有 2 个元素，都是 undefined
数组直接量的语法允许有可选的结尾的逗号，故[,,]只有两个元素而非三个。

当发生解构赋值时，右侧的数组和对象中一个或多个的值就会被提取出来（解构），并赋值给左侧相应的变量名。
在解构赋值中，等号右侧是一个数组或对象（一个结构化的值），指定左侧一个或多个变量的语法和右侧的数组和对象直接量的语法保持格式一致。
当和数组配合使用时解构赋值是一种写法简单但又极其强大的功能，特别是在函数返回一组结果的时候解构赋值就显得非常有用。

24. web 安全
    Web 浏览器针对恶意代码的第一条防线就是它们不支持某些功能。例如，客户端 JavaScript 没有权限来写入或删除客户计算机上的任意文件或列出任意目录。这意味着 JavaScript 程序不能删除数据或植入病毒。
    浏览器针对恶意代码的第二条防线是在自己支持的某些功能上施加限制。以下是一些功能限制：
    · JavaScript 程序可以打开一个新的浏览器窗口，但是为了防止广告商滥用弹出窗口，很多浏览器限制了这一功能，使得只有为了响应鼠标单击这样的用户触发事件的时候，才能使用它。
    · JavaScript 程序可以关闭自己打开的浏览器窗口，但是不允许它不经过用户确认就关闭其他的窗口。
    · HTML FileUpload 元素的 value 属性是只读的。如果可以设置这个属性，脚本就能设置它为任意期望的文件名，从而导致表单上传指定文件（比如密码文件）的内容到服务器。
    ·脚本不能读取从不同服务器[插图]载入的文档的内容，除非这个就是包含该脚本的文档。类似地，一个脚本不能在来自不同服务器的文档上注册事件监听器。这就防止脚本窃取其他页面的用户输入（例如，组成一个密码项的键盘单击过程）。这一限制叫做同源策略（same-origin policy），下一节将更详细地介绍它。
    注意，这里并未给出所有的客户端 JavaScript 的限制项，不同浏览器有不同的安全策略，并可能实现不同的 API 限制。部分浏览器可能还允许根据用户偏好来增强或减弱限制。
