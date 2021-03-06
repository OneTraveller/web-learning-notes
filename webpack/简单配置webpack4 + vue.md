## 简单配置 webpack4 + vue

1. 创建 webpack4-vue 文件夹

```
mkdir webpack4-vue && cd webpack4-vue
```

2. 初始化 npm

```
npm init -y
```

3. 安装相关依赖

```
npm i -D webpack webpack-cli webpack-dev-server vue vue-loader vue-template-compiler html-webpack-plugin
```

4. 在根目录下创建 src 文件夹，在 src 文件夹下创建 index.js app.vue 文件
   > index.js

```
import Vue from 'vue'              // 引入vue
  import App from './app.vue'        // 引入app组件
  const root = document.createElement('div'); // 根节点
  document.body.appendChild(root);
  new Vue({
    render: (h) => h(App)             // 将App渲染至根节点
  }).$mount(root)
```

> app.vue

```
<template>
    <div>{{message}}</div>
  </template>

  <script>
  export default {
    data () {
      return {
        message: "2019-03-31"
      };
    }
  };
  </script>
```

5. 在根目录下创建 webpack.config.js 文件

```
const path = require('path');
  const { VueLoaderPlugin } = require('vue-loader');
  const webpack = require('webpack');
  const htmlWebpackPlugin = require('html-webpack-plugin')
  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'        // 处理vue
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new htmlWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      contentBase: './dist',
      host: 'localhost',
      port: 8000,
      open: true,
      hot: true
    }
  }
```

对于 vue-loader@15.x 版本，需要在 webpack.config.js 中添加 const { VueLoaderPlugin } = require('vue-loader')，否则不起作用

6. 修改 package.json 文件

```
"scripts": {
    "dev": "webpack-dev-server --config webpack.config.js",
    "build": "webpack --config webpack.config.js"
  },
```

7. 执行 npm run dev

参考[https://segmentfault.com/a/1190000013960577](https://segmentfault.com/a/1190000013960577)
