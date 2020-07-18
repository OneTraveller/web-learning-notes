# 开发自定义 loader

摘自[使用 webpack 定制前端开发环境](https://juejin.im/book/5a6abad5518825733c144469/section/5ea9a0d26fb9a0436d419a17)

## 前文

> webpack 周边社区已经有相当丰富的 loader 资源可用，大部分情况我们都可以找到所需的 loader，但是总有可能遇上有构建需求是需要处理特殊的文件类型，或者社区 loader 出现某些问题并不适合你的开发项目，这个时候就需要开发一个 loader 来满足需求了。

## 简介

> loader 是一个函数，接受指定文件的内容，通过解析，返回想要的内容。

## 开发一个解析后缀名为.md 的文件 loader

> 假设已经装好了 webpack 环境（安装了 webpack 及 webpack-cli，写好了 package.json 和 webpack.config.js 文件...）

1. 新建一个 test.md 文件，内容如下

```
# test loader
```

2. 安装 marked 包

```
npm i marked -D
```

3. 编写 loader 代码

```
const marked = require('marked');
const loaderUtils = require('loader-utils');

module.exports = function (markedown) {
  // 使用loaderUtils 来获取loaders 的配置项
  // this 是构建运行时的一些上下文信息
  const options = loaderUtils.getOptions(this);
  this.cacheable();
  // 把配置项直接传给 marded
  marked.setOptions(options);
  return `export default \`${marked(markedown)}\``;
};
```

4. 编写 webpack.config 文件里的 rules

```
module: {
    rules: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: path.resolve('./loader/index.js'),
      },
    ],
  },
```

5. 在 index.js 中引用

```
import md from './test.md';
console.log(md); // <h1 id="test-loader">test loader</h1>
```

6. 执行命令行

```
npm run build
```

## Pitching

### 简介

> 在一个匹配规则中应用多个 loader，处理顺序是从右到左，即我们的 loader function 在这个时候是从右到左执行的，而 webpack 给 loader 提供了 pitch 机制，可以让你在开发 loader 中指定方法是从左到右来执行的。

```
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: [
          'a-loader',
          'b-loader',
          'c-loader',
        ],
      },
    ],
  },
};
```

算上 pitch 方法的话，webpack 中处理 loader 的执行顺序会是这样的：

```
-> a-loader pitch
  -> b-loader pitch
    -> c-loader pitch
    -> c-loader 执行
  -> b-loader 执行
-> a-loader 执行
```

在 loader function 里写 pitch 方法：

```
module.exports = function (content) {
  console.log("a");
  console.log(`pitch data: ${this.data.value}`);
  return content;
};
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log("a pitch");
  data.value = "hello world"; // data 中挂载的数据在后边 loader 执行时可以从 loader 的 this.data 中访问到
};
```

loader 的 pitch 机制可以让某些不依赖前边 loader 执行结果而只关注原始基础数据的 function 可以更好地执行，同时让 loader 可以通过 pitch 传输的 data 来获知整个 loader 链条的情况，并且 pitch 可以跳过后续 loader 的执行，例如：

```
module.exports = function (content) {
  console.log("b");
  return content;
};
module.exports.pitch = function (remainingRequest, precedingRequest) {
  console.log("b pitch");
  // 阻断
  return `module.exports = { foo: 'hello pitch' }`;
};
```

如果上述 a、b、c 三个 loader 中的 b-loader 使用了 pitch 的 return 来返回一个结果，那么上边的 loader 执行顺序会变更为：

```
-> a-loader pitch
  -> b-loader pitch 返回模块结果
-> a-loader 执行
```

则 c-loader 会被跳过。
