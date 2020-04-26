# window 安装 Android 和 Java 环境

### 一、下载 jdk

> 下载：jdk-8u161-windows-x64.exe
> 下载[链接](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

### 二、下载 android sdk

> 下载：installer_r24.4.1-windows.exe
> 下载[链接](http://tools.android-studio.org/index.php/sdk)

### 三、配置环境变量中系统变量

1. 添加变量： ANDROID_HOME + 路径 (比如 C:\Android\sdk)
2. 添加变量： JAVA_HOME + 路径 (比如 C:\Program Files\Java\jdk1.8.0_102)
3. 在系统变量里的 path 添加
   > %ANDROID_SDK_HOME%\tools
   > %JAVA_HOME%\bin
   > %ANDROID_SDK_HOME%\platform-tools
