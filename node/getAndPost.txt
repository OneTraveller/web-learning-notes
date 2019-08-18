const http=require('http');
const url=require('url');
const querystring=require('querystring');
const fs=require('fs');

http.createServer((req, res)=>{
  let path='', get={}, post={};

  if(req.method=='GET'){
    let {pathname, query}=url.parse(req.url, true);

    path=pathname;
    get=query;
    complete();
  }else if(req.method=='POST'){
    path=req.url;

    let arr=[];
    req.on('data', buffer=>{
      arr.push(buffer);
    });
    req.on('end', ()=>{
      let buffer=Buffer.concat(arr);

      post=querystring.parse(buffer.toString());
      complete();
    });
  }

  function complete(){
    console.log(path, get, post);
  }
}).listen(8080);
