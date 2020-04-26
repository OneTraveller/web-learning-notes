# chrome 使用 devices 调试 H5

> 开发 h5 时，使用 devices 调试，特别方便（用于安卓手机）

### 步骤

1. 在谷歌浏览器访问 chrome://inpect/#/devices
2. 手机连接电脑，可看到相关的手机设备信息
3. 打开有 debug 的安装包 app，可看到相关页面信息，点击 inpect 按钮，可进入调试页面

### 可能会出现的问题

1. 看不到手机设备信息，尝试一下操作：

   > 手机打开开发者选项，允许 USB 调试
   > 安装 adb，检查手机是否连接成功
   >
   > > [下载 adb 安装包地址](https://pan.baidu.com/s/14SysAIZQhzYKZzQMikE2jQ)
   > > 将 adb.exe 的路径保存到系统变量的 path
   > > 打开 cmd，执行 adb 命令行，能看到 adb 相关信息，说明安装成功
   > > 在 cmd 中执行 adb devices 命令，如果出现 unauthorized，说明未授权，需要在手机上的弹框点击确定，出现手机信息，说明成功成功
   > > 如果还没看到手机相关信息，尝试安装驱动

2. 只有手机设备信息，没有 app 打开页面的相关信息，可能原因：

   > 打开的页面不是 webview 页面
   > 装的 app 不是 debug 包

3. 点击 inpect 按钮后，弹出来的页面出空白页或者 404 页面
   > 确定电脑能够翻墙，如果能翻墙，便可以打开这个[链接](https://chrome-devtools-frontend.appspot.com/)
   > 安装翻墙软件
   > 如果还不能访问，需要在 hosts 文件中添加以下代码；找 hosts 文件方法：点击开始菜单，打开附件中的运行，执行命令行 c:\windows\system32\drivers\etc

```
172.217.161.180 chrome-devtools-frontend.appspot.com
172.217.161.180 chrometophone.appspot.com
```

#### 参考链接

[ADB 的安装与使用](https://blog.csdn.net/ainongmin1hao/article/details/82049757)
[前端远程调试及空白或 404 解决](https://www.evacoder.com/2019/02/17/remote_debugging/)
[Chrome 一键翻墙包](https://github.com/bannedbook/fanqiang/wiki/Chrome%E4%B8%80%E9%94%AE%E7%BF%BB%E5%A2%99%E5%8C%85)
