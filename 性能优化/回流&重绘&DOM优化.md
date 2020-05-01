# 回流&重绘&DOM 优化

摘自[前端性能优化原理与实践](https://juejin.im/book/5b936540f265da0a9624b04b/section/5bb1826af265da0a972e3038#heading-3)

## 回流与重绘

- 回流：当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）。
- 重绘：当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。这个过程叫做重绘。

> 重绘不一定导致回流，回流一定会导致重绘。回流比重绘做的事情更多，带来的开销也更大。我们在开发中，要从代码层面出发，尽可能把回流和重绘的次数最小化。

### 哪些实际操作会导致回流与重绘

1.  重绘（只触发重绘而不触发回流的操作）：改变背景色、文字色、可见性。

2.  回流

- 改变 DOM 元素的几何属性
  当一个 DOM 元素的几何属性发生变化时，所有和它相关的节点（比如父子节点、兄弟节点等）的几何属性都需要进行重新计算，它会带来巨大的计算量。常见的几何属性有 width、height、padding、margin、left、top、border 等等。

- 改变 DOM 树的结构
  这里主要指的是节点的增减、移动等操作。浏览器引擎布局的过程，顺序上可以类比于树的前序遍历——它是一个从上到下、从左到右的过程。通常在这个过程中，当前元素不会再影响其前面已经遍历过的元素。

- 获取一些特定属性的值
  offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight 这些值有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流。除此之外，当我们调用了 getComputedStyle 方法，或者 IE 里的 currentStyle 时，也会触发回流。原理是一样的，都为求一个“即时性”和“准确性”。

### 如何规避回流与重绘

> 了解了触发回流与重绘的操作，我们就要尽量规避它们。但很多时候，我们不得不使用它们。当避无可避时，我们就要学会更聪明地使用它们。

- 避免频繁改动

```
// 获取el元素
const el = document.getElementById('el')
// 这里循环判定比较简单，实际中或许会拓展出比较复杂的判定需求
for(let i=0;i<10;i++) {
  el.style.top  = el.offsetTop  + 10 + "px";
  el.style.left = el.offsetLeft + 10 + "px";
}
```

这样做，每次循环都需要获取多次“敏感属性”，是比较糟糕的。我们可以将其以 JS 变量的形式缓存起来，待计算完毕再提交给浏览器发出重计算请求：

```
// 缓存offsetLeft与offsetTop的值
const el = document.getElementById('el')
let offLeft = el.offsetLeft, offTop = el.offsetTop
// 在JS层面进行计算
for(let i=0;i<10;i++) {
  offLeft += 10
  offTop  += 10
}
// 一次性将计算结果应用到DOM上
el.style.left = offLeft + "px"
el.style.top = offTop  + "px"
```

- 避免逐条改变样式，使用类名去合并样式

```
const container = document.getElementById('container')
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
```

优化成一个有 class 加持的样子：

```
.basic_style {
  width: 100px;
  height: 200px;
  border: 10px solid red;
  color: red;
}
const container = document.getElementById('container')
container.classList.add('basic_style')
```

- 将 DOM “离线”
  > 一旦我们给元素设置 display: none，将其从页面上“拿掉”，那么我们的后续操作，将无法触发回流与重绘——这个将元素“拿掉”的操作，就叫做 DOM 离线化。

```
const container = document.getElementById('container')
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
```

离线化后就是这样：

```
let container = document.getElementById('container')
container.style.display = 'none'
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
container.style.display = 'block'
```

拿掉一个元素再把它放回去，这不也会触发一次昂贵的回流吗？这话不假，但我们把它拿下来了，后续不管我操作这个元素多少次，每一步的操作成本都会非常低。当我们只需要进行很少的 DOM 操作时，DOM 离线化的优越性确实不太明显。一旦操作频繁起来，这“拿掉”和“放回”的开销都将会是非常值得的。

## DOM 优化

### DOM 为什么这么慢？

- 因为收了“过路费”

  > 把 DOM 和 JavaScript 各自想象成一个岛屿，它们之间用收费桥梁连接。——《高性能 JavaScript》
  > JS 是很快的，在 JS 中修改 DOM 对象也是很快的。在 JS 的世界里，一切是简单的、迅速的。但 DOM 操作并非 JS 一个人的独舞，而是两个模块之间的协作。上一节我们提到，JS 引擎和渲染引擎（浏览器内核）是独立实现的。当我们用 JS 去操作 DOM 时，本质上是 JS 引擎和渲染引擎之间进行了“跨界交流”。这个“跨界交流”的实现并不简单，它依赖了桥接接口作为“桥梁”。过“桥”要收费——这个开销本身就是不可忽略的。我们每操作一次 DOM（不管是为了修改还是仅仅为了访问其值），都要过一次“桥”。过“桥”的次数一多，就会产生比较明显的性能问题。

- 对 DOM 的修改引发样式的更迭，可能会触发重绘或者回流

### 给你的 DOM “提提速”

有一个假需求——我想往 container 元素里写 10000 句一样的话。如果我这么做：

```
for(var count=0;count<10000;count++){
  document.getElementById('container').innerHTML+='<span>我是一个小测试</span>'
}
```

这段代码有两个明显的可优化点。
第一点，过路费交太多了。我们每一次循环都调用 DOM 接口重新获取了一次 container 元素，相当于每次循环都交了一次过路费。前后交了 10000 次过路费，但其中 9999 次过路费都可以用缓存变量的方式节省下来：

```
// 只获取一次container
let container = document.getElementById('container')
for(let count=0;count<10000;count++){
  container.innerHTML += '<span>我是一个小测试</span>'
}
```

第二点，不必要的 DOM 更改太多了。我们的 10000 次循环里，修改了 10000 次 DOM 树。我们前面说过，对 DOM 的修改会引发渲染树的改变、进而去走一个（可能的）回流或重绘的过程，而这个过程的开销是很“贵”的。这么贵的操作，我们竟然重复执行了 N 多次！其实我们可以通过就事论事的方式节省下来不必要的渲染：

```
let container = document.getElementById('container')
let content = ''
for(let count=0;count<10000;count++){
  // 先对内容进行操作
  content += '<span>我是一个小测试</span>'
}
// 内容处理好了,最后再触发DOM的更改
container.innerHTML = content
```

JS 层面的事情，JS 自己去处理，处理好了，再来找 DOM 打报告。事实上，考虑 JS 的运行速度，比 DOM 快得多这个特性。我们减少 DOM 操作的核心思路，就是让 JS 去给 DOM 分压。

这个思路，在 DOM Fragment 中体现得淋漓尽致。

> DocumentFragment 接口表示一个没有父级文件的最小文档对象。它被当做一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的 XML 片段。因为 DocumentFragment 不是真实 DOM 树的一部分，它的变化不会引起 DOM 树的重新渲染的操作（reflow），且不会导致性能等问题。

在我们上面的例子里，字符串变量 content 就扮演着一个 DOM Fragment 的角色。其实无论字符串变量也好，DOM Fragment 也罢，它们本质上都作为脱离了真实 DOM 树的容器出现，用于缓存批量化的 DOM 操作。前面我们直接用 innerHTML 去拼接目标内容，这样做固然有用，但却不够优雅。相比之下，DOM Fragment 可以帮助我们用更加结构化的方式去达成同样的目的，从而在维持性能的同时，保住我们代码的可拓展和可维护性。我们现在用 DOM Fragment 来改写上面的例子：

```
let container = document.getElementById('container')
// 创建一个DOM Fragment对象作为容器
let content = document.createDocumentFragment()
for(let count=0;count<10000;count++){
  // span此时可以通过DOM API去创建
  let oSpan = document.createElement("span")
  oSpan.innerHTML = '我是一个小测试'
  // 像操作真实DOM一样操作DOM Fragment对象
  content.appendChild(oSpan)
}
// 内容处理好了,最后再触发真实DOM的更改
container.appendChild(content)
```

我们运行这段代码，可以得到与前面两种写法相同的运行结果。
可以看出，DOM Fragment 对象允许我们像操作真实 DOM 一样去调用各种各样的 DOM API，我们的代码质量因此得到了保证。并且它的身份也非常纯粹：当我们试图将其 append 进真实 DOM 时，它会在乖乖交出自身缓存的所有后代节点后全身而退，完美地完成一个容器的使命，而不会出现在真实的 DOM 结构中。
