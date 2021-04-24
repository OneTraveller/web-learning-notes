# async 和 await 的使用

## async

带 async 关键字的函数，是声明异步函数，返回值是 promise 对象，如果 async 关键字函数返回的不是 promise，会自动用 Promise.resolve()包装。

```javascript
async function test() {
  return 'test';
}
test();
// 返回值为 Promise {<resolved>: "test"}。
```

## await

await 等待右侧表达式的结果，这个结果是 promise 对象或者其他值。
如果不是 promise , await 会阻塞后面的代码，先执行 async 外面的同步代码，同步代码执行完，再回到 async 内部，把这个非 promise 的东西，作为 await 表达式的结果。
如果它等到的是一个 promise 对象，await 也会暂停 async 后面的代码，先执行 async 外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果。

```javascript
function test() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('test'), 2000);
  });
}

const result = await test();
console.log(result);
console.log('end');
```

由于 test()造成的阻塞，console.log('end')会等到两秒后执行
所以为了避免造成阻塞，await 必须用在 async 函数中，async 函数调用不会造成阻塞。

```javascript
function test() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('test'), 2000);
  });
}

async function test2() {
  const result = await test();
  console.log(result);
}
test2();
console.log('end');
```

先执行 console.log('end')，两秒后执行 console.log('test')
如果 await 用在普通函数中，会报错

## async/await 的执行顺序

遇到 await 会阻塞后面的代码，先执行 await 右侧的代码，然后执行 async 外面的同步代码，同步代码执行完，再回到 async 内部，继续执行 await 后面的代码。

以下面的代码分析：

```javascript
async function test1() {
  console.log('start test1');
  console.log(await test2());
  console.log('end test1');
}
async function test2() {
  console.log('test2');
  return 'return test2 value';
}
test1();
console.log('start async');
setTimeout(() => {
  console.log('setTimeout');
}, 0);
new Promise((resolve, reject) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});
console.log('end async');
// 输出结果 谷歌89.0.4389.114版本
start test1
test2
start async
promise1
end async
return test2 value
end test1
promise2
setTimeout
```

执行的结果
· 首先执行宏任务，执行 test1 函数，执行 console.log('statr test1')
· 遇到 await，先执行右边 test2 中的 console.log('test2')，然后中断了后面的代码，执行 test1 外面的同步代码
· 执行 console.log('start async');
· 遇到 setTimeout，推到到下个宏任务队列中
· 执行 Promise 里面的同步代码 console.log('promise1')
· 运行到 promise().then，发现是 promise 对象，推到微任务队列中
· 执行 console.log('end async')
· test1 外面的同步代码执行结束后，回到 test1 中，await 等待到的是 Promise {<fulfilled>: "return test2 value"}，打印出'return test2 value'，然后执行 console.log('end test1');
· 执行所有的微任务，执行 console.log('promise2')
· 执行下个宏任务，即执行 console.log('setTimeout');

补充下有关宏任务和微任务的知识
宏任务和微任务都是队列，宏任务有 script、setTimeout、setInterval 等，微任务有 Promise.then catch finally、process.nextTick 等，宏任务和微任务的关系如下：
先执行第一个宏任务，执行结束后，执行所有的微任务，然后执行下个宏任务。

## async/await 的优缺点

1. 优点
   相对于 promise，async/await 处理 then 的调用链，代码要清晰很多，几乎和同步代码一样

2. 缺点
   滥用 await 可能会导致性能问题，因为 await 会阻塞代码

五、处理 reject

1. try/catch

```javascript
async function fn() {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('err3');
      }, 1000);
    });
  } catch (err) {
    alert(err);
  }
}
fn();
```

2. catch

```javascript
async function fn() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('err');
    }, 1000);
  });
}
fn().catch(alert);
```

[参考链接](https://segmentfault.com/a/1190000007535316)
[参考链接](https://segmentfault.com/a/1190000017224799)
[参考链接](https://www.cnblogs.com/wangziye/p/9566454.html)
