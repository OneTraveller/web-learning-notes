/* 
  @date 2020-08-12
  @remark: 需要开启本地服务
*/

let i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout('timedCount()', 500);
}

timedCount();
