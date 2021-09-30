# 读图解 HTTP 笔记

## 了解 web 及网络基础

## 简单的 HTTP 协议

## HTTP 状态码

状态码主要作用是告知服务器返回的请求结果，用户可以知道服务器是正常处理了请求，还是出现了错误。

### 2xx

- 200: 请求成功
- 204: 请求成功，但是没有资源可以返回
- 206: 请求资源的某一部分

### 3xx

- 301: 永久性重定向
- 302: 临时重定向
- 303: 表示请求的资源存在另一个 URI，应使用 get 请求方法获取资源
- 304: 请求资源未修改
- 307: 临时重定向，和 302 有点相像，但 307 会遵照浏览器标准，不会从 post 变成 get

### 4xx

- 400: 表示请求报文中存在语法错误
- 401: 表示用户认证失败
- 403: 请求被服务器拒绝，未获取文件系统的访问权限
- 404: 没有找到资源

### 5xx

- 500: 服务器内部资源出现故障
- 503: 表示服务器暂时处于超负荷或正在进行停机维护，现在无法处理请求
- 504: 服务器处理超时

## HTTP 报文内的信息

## 与 HTTP 写作的 web 服务器

## HTTP 首部

### 通用首部字段

- Cache-Control: 控制缓存的行为；指令的参数是可选的，多个指令之间通过','分隔，如 Cache-Control: max-age=0, no-cache
- Connection: 控制不再转发给代理的首部字段、管理持久链接; 如 Connection: Keep-Alive
- Date: 创建 HTTP 报文的日期和时间; 如 Date: Mon, 20 Sep 2021 08:03:37 GMT
- Pragma: 报文指令，如 Pragma: no-cache
- Trailer: 说明报文主题后记录了哪些首部字段；Trailer: Expires
- Transfer-Encoding: 规定了传输报文主体时采用的编码方式; Transfer-Encodin: chunked
- Upgrade: 用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可指定一个完全不同的通信协议；Upgrade: TLS/1.0
- Via: 为了追踪客户端与服务器之间的请求和响应报文的传输路径。可避免请求回环发生; Via: 1.0 gw.hackr.jp(squid/3.1)
- Warning: 告知用户一些与缓存相关的问题警告

### 请求首部字段

- Accept: 通知用户代理能够处理等媒体类型及媒体类型的相对优先级，用 q=来额外表示权重值。默认权重为 q=1.0, 权重值的范围是 0 ～ 1(可精度到小数点三位)，且 1 为最大；如 Accept: text/html
- Accept-Charset: 用来通知服务器用户代理支持的字符集以及字符集的相对优先顺序。也可添加权重; 如：Accept-Charset:iso-8859-5, unicode-1-1;q=0.8
- Accept-Encoding: 告知服务器代理支持的内容编码以及编码的优先级顺序; Accept-Encoding: gzip
- Accept-Language: 告知服务器用户代理能够理解的自然语言以及自然语言的优先级；Accept-Language: zh-cn
- Authorization: 告知服务器，用户代理的认证信息
- Expect: 客户端告知服务器期望出现某种特定行为
- From: 告知用户服务器使用用户代理的电子邮件地址
- host: 主机名。相同的 IP 地址下部署运行着多个域名，那么服务器就无法理解哪个域名对应的请求。因此，就需要使用首部字段 host 来明确指出请求的主机名。
- If-Match: 形如 If-xxx 这种样式的请求首部字段都可以成为条件请求。服务器接收到附带条件的请求后，只要判断指定条件为真时，才会执行请求。If-Match 属附带条件之一，他会告知服务器匹配资源所标记的实体标记值。这时的服务器无法使用弱 Etag 值。使用＊会忽略 ETag
- If-Modified-Since: 比较资源的更新时间
- If-None-Match: 与 If-Match 相反
- If-Range: 资源未更新时发送实体 Byte 的范围请求
- If-Unmidified-Since: 与 If-Modified-Since 相反
- Max-Forwards: 最大的传输逐跳数，当 Max-Forwards 字段值为 0 时，服务器就会立刻返回响应，避免代理到源服务的请求失败了，但客户不知道
- Proxy-Authorization: 告知服务器认证所需要的信息
- Range: 获取部分资源的范围请求，请求成功后返回状态为 206；Range: bytes=5001-10000
- Referer：告知服务器请求的原始资源的 URI，只要查看 Referer 就能知道请求的 URI 是从哪个 web 页面发起的。
- TE: 和 Accept-Encoding 功能相似，但除传输编码之外，还可以指定伴随 trailer 字段的分块传输编码方式；如 TE: trailer
- User-Agent: 将创建请求的浏览器和用户代码名称等信息传达给服务器
- x-requested-with: 区分 Ajax 请求(异步)还是传统请求(同步)

### 响应首部字段

- Accept-Ranges: 是否接受字节范围请求
- Age: 推算资源创建经过时间
- ETag: 资源的匹配信息
- Location: 令客户端重定向至指定 URI
- Proxy-Authenticate: 代理服务队客户端的认证信息
- Retry-After: 对再次发起请求的时机要求
- Server: HTTP 服务器的安装信息
- Vary: 代理服务器缓存的管理信息
- WWW-Authenticate: 服务器对客户端的认证信息
- X-XSS-Protection: 针对跨站脚本攻击(xss)的一种对策，用于控制浏览器 xss 防护机制的开关。（0：将 xss 过滤设置成无效状态；1：有效状态）
- X-Content-Type-Options：告知 MIME 类型的标记 Content-Type 标头不应该被改变，并且被遵循。通过设置"X-Content-Type-Options: nosniff"响应标头，对 script 和 styleSheet 在执行是通过 MIME 类型来过滤掉不安全或错误的文件。如 stylesheet 的 MIME 等于 text/css，script 的 MIME 等于 text/javascript。

### 实体首部字段

- Allow: 资源可支持的 HTTP 方法
- Content-Encoding: 实体主体使用的编码方式
- Content-Language: 实体主体的自然语言
- Content-length: 实体主体的大小
- Content-Location: 替代对应资源的 URI
- Content-MD5: 实体主体的报文摘要，由 MD5 算法生成的值，其目的在于检查报文主体传输过程中是否保持完整，以及确认传输到达
- Content-Range: 实体主体的位置范围
- Content-Type: 实体主体的媒体类型
- Expires: 实体主体过期的日期时间
- Last-Modified: 资源的最后修改日期时间

## 确保 web 安全的 HTTPS

## web 的攻击技术
