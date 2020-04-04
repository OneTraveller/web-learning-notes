# chrome 调试技巧笔记

转自[你不知道的 Chrome 调试技巧](https://juejin.im/book/5c526902e51d4543805ef35e)

# 1. 通用篇

### ● 复制 copying

> 通过全局的方法 copy，例如：copy($_) 或 copy($0) 或 点击对应的 html 元素，按 ctrl + c 复制 html 元素

### ● 存储为一个全局变量

> 在 console 打印出数据或变量，点击右键并选择“Store as global variable”保存为全局变量，第一次会创建 temp1 变量、第二次创建 temp2 变量

### ● 切换 DevTools 窗口的展示布局

> 通过按 ctrl + shift + D 切换位置（通常是底部位置到右边位置）

### ● 快速切换面板

> ctrl + shift + p，输入 layout 回车

### ● 快速切换主题

> ctrl + shift + p，输入 theme 回车

### ● 递增/递减

> 调样式通过使用 带有 或者 不带有修饰键的 ↑/↓ 按键， 你可以实现递增和递减 0.1 ， 1 或者 10 这样数值类型的值
>
> > 1. alt + ↑ 递增 0.1
> > 2. ↑ 递增 1
> > 3. shift + ↑ 递增 10
> > 4. ctrl + ↑ 递增 100

### ● 全屏截图

> ctrl + shift + p，输入 screen 选择 Capture full size screenshot 命令

### ● 保存代码块

> 进入到 Sources 面板，在导航栏里选中 Snippets 这栏，点击 New snippet(新建一个代码块) ，之后按 ctrl + p，输入：! + 文件名称 执行

# 2. 元素面板

### ● 通过'h'显示隐藏元素

### ● 使用 ctrl + ↑/↓ 来移动元素

### ● 展开所有的 DOM 节点

> 方法 1：选中 dom 元素，点击右键，选择 expand recursively
> 方法 2：使用 alt+左键 点击 dom 节点左侧的箭头

# 3. console 篇

### ● \$0

> 在 Chrome 的 Elements 面板中， $0 是对我们当前选中的 html 节点的引用，$1 是对上一次我们选择的节点的引用...直到 \$4

### ● \$\$

> \$\$('div') === Array.from(document.querySelectorAll('div'))

### ● \$\_

> 显示上次执行的结果

### ● 引用

> console 中打印出的对象，在你打印出他内容之前，是以引用的方式保存的。使用 JSON.stringify() 方法处理打印的结果

### ● 异步的 console

> console 默认就被 async 包裹，可以直接使用 await； 例如：await navigator.storage.estimate()

### ● 在线上代码添加条件断点或添加 console

> 1. Add conditional breakpoint...(添加条件断点)
> 2. 输入值为 true/false 的条件表达式或 console.log()
> 3. 不用时在 Breakpoints 右键 remove all

### ● 增强 log 的阅读体验

> var a = 1, b = 2, c = 3; console.log({a, b, c}) => { a: 1, b: 2, c: 3 }

### ● console.table

> 对于数据或对象，console.table 方法可以以一个漂亮的表格的形式打印出来（可以配合{变量 1， 变量 2}使用）

### ● console.dir 打印出 dom 节点

### ● 监控执行时间

> 1.console.time('timer') — 开启一个计时器
> 2.console.timeEnd('timer') — 结束计时并且将结果在 console 中打印出来

### ● console 加样式

> 1. console.log('%c1213', 'font-size: 20px')
> 2. var val = 1213; console.log('%c%s', 'font-size: 30px', val)

### ● 直接在回调中使用 console

> var arr = [1,2,3]; arr.forEach(console.log)

### ● 使用实时表达式

> 在 console 面板中，点击小眼睛图标，输入表达式，能够不会更新

# 4. network 篇

### ● initiator 显示调用堆栈信息

> Network 面板中的 initiator 这一列显明了是哪个脚本的哪一行触发了请求。将鼠标悬停在显示的 initiator（例如 外部库）上，你将看到完整的调用堆栈，包括你的文件

### ● 自定义请求表

> 在请求表中，你可以看到有关每个请求的几条信息，例如：Status， Type， Initiator， Size 和 Time。但是你同样可以添加更多(例如 我经常添加 Method)。要自定义显示哪些列，右键单击请求表标题上的任意位置。

### ● 重新发送 XHR 的请求

> 选中请求方方法右键，选择 Replay XHR

# 5. Drawer 篇

> 如何打开 Drawer ? 在 DevTools（任何选项卡）中，按 esc 来显示，再次按 esc 隐藏

### ● 拿到 source

> 在元素面板中，打开 Drawer，添加 Quick source

### ● 检查代码 coverage

> 在 coverage 中选中文件，在源码中，用 绿色 的线条标记 运行 和用 红色 的线条标记 未运行

### ● 检查你修改的内容

> 在元素面板中，调整 css 样式，通过 Changes 查看修改的内容；可以按 ctrl + shift + p，输入 change 快速打开 Changes

#### end ~
