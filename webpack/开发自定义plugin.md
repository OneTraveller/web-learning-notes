# 开发自定义 plugin

摘自[使用 webpack 定制前端开发环境](https://juejin.im/book/5a6abad5518825733c144469/section/5ea9a0da5188256d545fd002)

## 简介

> plugin 的实现可以是一个类，使用时传入相关配置来创建一个实例，然后放到配置的 plugins 字段中，而 plugin 实例中最重要的方法是 apply，该方法在 webpack compiler 安装插件时会被调用一次，apply 接收 webpack compiler 对象实例的引用，你可以在 compiler 对象实例上注册各种事件钩子函数，来影响 webpack 的所有构建流程，以便完成更多其他的构建任务。

## 创建 webpack 构建文件列表 markdown 的 plugin

1. 编写 plugin

```
class FileListPlugin {
  constructor(options) {
    // 读取 plugin 实例化时传入的配置
  }

  apply(compiler) {
    // 在 compiler 的 emit hook 中注册一个方法，当 webpack 执行到该阶段时会调用这个方法
    compiler.hooks.emit.tap("FileListPlugin", (compilation) => {
      // console.log({ compilation });
      // 给生成的 markdown 文件创建一个简单标题
      var filelist = "生成的文件列表:\n";

      // 遍历所有编译后的资源，每一个文件添加一行说明
      for (var filename in compilation.assets) {
        filelist += "- " + filename + "\n";
      }

      // 将列表作为一个新的文件资源插入到 webpack 构建结果中
      compilation.assets["filelist.md"] = {
        source: function () {
          return filelist;
        },
        size: function () {
          return filelist.length;
        },
      };
    });
  }
}

module.exports = FileListPlugin;
```

2. 在 webpack 配置中调用 plugin

```
const FileListPlugin = require('./plugins/FileListPlugin.js')

module.exports = {
  // ... 其他配置
  plugins: [
    new FileListPlugin(), // 实例化这个插件，有的时候需要传入对应的配置
  ],
}
```

## compiler 和 compilation 的生命周期 hooks

```
class FlowPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap('FlowPlugin', (context, entry) => {
      // entry 配置被 webpack 处理好之后触发
      // console.log(`entryOption: ${entry}`);
    });

    compiler.hooks.beforeRun.tap('FlowPlugin', (compiler) => {
      // compiler 执行之前触发
      // 可以从参数 compiler 读取到执行前的整个编译器状态
      // console.log(compiler.options.plugins);
    });

    compiler.hooks.compilation.tap('FlowPlugin', (compilation) => {
      // 构建需要的 compilation 对象创建之后，可以从参数获取 compilation 读取到该次构建的基础状态
      // 通常 compilation 的 hooks 绑定一般也在该阶段处理
      // console.log(compilation);

      compilation.hooks.buildModule.tap('FlowPlugin', (module) => {
        // 一个模块开始构建之前，可以用于修改模块信息
        // 模块代码内容的转换依旧是应该 loader 来处理，plugin 着眼于其他信息的调整或获取
        // console.log(module);
      });

      compilation.hooks.finishModules.tap('FlowPlugin', (modules) => {
        // 所有模块都被成功构建时执行，可以获取所有模块的相关信息
        // console.log(modules);
      });

      compilation.hooks.chunkAsset.tap('FlowPlugin', (chunk, filename) => {
        // chunk 对应的一个输出资源添加到 compilation 时执行，可以获取 chunk 对应输出内容信息
        // module 也有 moduleAsset，但实际使用 chunk 会更多
        // console.log(chunk, '\n', filename);
      });
    });

    compiler.hooks.make.tap('FlowPlugin', (compilation) => {
      // compilation 完成编译后执行，可以从参数查看 compilation 完成一次编译后的状态
      // console.log(compilation);
    });

    compiler.hooks.shouldEmit.tap('FlowPlugin', (compilation) => {
      // 在输出构建结果前执行，可以通过该 hook 返回 true/false 来控制是否输出对应的构建结果
      return true;
    });

    compiler.hooks.assetEmitted.tap(
      'FlowPlugin',
      (file, content) => {
        // 在构建结果输出之后执行，可以获取输出内容的相关信息
        // console.log(content);
      }
    );

    compiler.hooks.done.tap('FlowPlugin', (stats) => {
      // 完成一次构建后执行，可以输出构建执行结果信息
      // console.log(stats);
    });

    compiler.hooks.failed.tap('FlowPlugin', (error) => {
      // 构建失败时执行，用于获取异常进行处理
      // console.log(error);
    });
  }
}

module.exports = FlowPlugin;
```
