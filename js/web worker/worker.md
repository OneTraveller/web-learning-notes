# 初学 web worker

摘自[摘自](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

## 简介

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程就会很流畅，不会被阻塞或拖慢。

## 基本用法

### 主线程

1. 主线程采用 new 命令，调用 Worker()构造函数，新建一个 Worker 线程。

```JavaScript
var worker = new Worker('work.js');
```

2. 主线程调用 worker.postMessage()方法，向 Worker 发消息。
   worker.postMessage()方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。

```JavaScript
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
```

3. 主线程通过 worker.onmessage 指定监听函数，接收子线程发回来的消息。

```JavaScript
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  // todo
}
```

4. Worker 完成任务以后，主线程就可以把它关掉。

```JavaScript
worker.terminate();
```

5. 主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的 error 事件。

```JavaScript
worker.onerror(function (event) {
  // todo
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```

### worker 线程

1. Worker 线程内部需要有一个监听函数，监听 message 事件

```JavaScript
addEventListener('message', function (e) {
  postMessage('You said: ' + e.data);
}, false);
// 也可以使用self.onmessage指定
```

2. postMessage()方法用来向主线程发送消息。

```JavaScript
postMessage('msg');
```

3. Worker 内部如果要加载其他脚本，有一个专门的方法 importScripts()。

```JavaScript
importScripts('script1.js');
importScripts('script1.js', 'script2.js');
```

4. 关闭 worker

```JavaScript
close();
```

## API

1. 主线程

- Worker.onerror：指定 error 事件的监听函数。
- Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在 Event.data 属性中。
- Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- Worker.postMessage()：向 Worker 线程发送消息。
- Worker.terminate()：立即终止 Worker 线程。

2. Worker 线程

- self.name： Worker 的名字。该属性只读，由构造函数指定。
- self.onmessage：指定 message 事件的监听函数。
- self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- self.close()：关闭 Worker 线程。
- self.postMessage()：向产生这个 Worker 线程发送消息。
- self.importScripts()：加载 JS 脚本。

## 注意事项

Web Worker 有以下几个使用注意点。

1. 同源限制
   分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

2. DOM 限制
   Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用 document、window、parent 这些对象。但是，Worker 线程可以 navigator 对象和 location 对象。

3. 通信联系
   Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

4. 脚本限制
   Worker 线程不能执行 alert()方法和 confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

5. 文件限制
   Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络，开发时可以本地起服务。
