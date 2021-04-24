# get 和 post

## get 和 post 的区别：

1. GET 产生一个 TCP 数据包；POST 产生两个 TCP 数据包。
   　　对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200（返回数据）；
   　　而对于 POST，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok（返回数据）。
2. get 请求数据有限制，post 请求数据没有限制
3. 请求参数在 url 中发送，post 请求参数在 http 消息主体中发送

## 代码实现

```javascript
// get
function get() {
  // 创建 XMLHttpRequest
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'your url', true);
  xhr.send();
  // 监听响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      console.log(xhr.responseText);
    }
  };
}

// post
function post() {
  // 请求参数、url、创建 XMLHttpRequest
  let data = 'name=tom&age=18',
    url = 'your url',
    xhr = new XMLHttpRequest();

  xhr.open('post', url);
  // 设置 header
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      console.log(xhr.responseText);
    }
  };
}
```

[参考链接](https://blog.csdn.net/u012391923/article/details/53197387?utm_source=blogxgwz3)
[参考链接](http://www.runoob.com/tags/html-httpmethods.html)
