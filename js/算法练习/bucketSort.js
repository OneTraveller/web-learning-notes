/* function bucketSort(array, num) {
  if (array.length <= 1) {
    return array;
  }
  var len = array.length,
    buckets = [],
    result = [],
    min = (max = array[0]),
    space,
    n = 0;
  num = num || 5;
  console.time('桶排序耗时');
  for (var i = 1; i < len; i++) {
    min = min <= array[i] ? min : array[i];
    max = max >= array[i] ? max : array[i];
  }
  space = (max - min + 1) / num;
  for (var j = 0; j < len; j++) {
    var index = Math.floor((array[j] - min) / space);
    if (buckets[index]) {
      //  非空桶，插入排序
      var k = buckets[index].length - 1;
      while (k >= 0 && buckets[index][k] > array[j]) {
        buckets[index][k + 1] = buckets[index][k];
        k--;
      }
      buckets[index][k + 1] = array[j];
    } else {
      //空桶，初始化
      buckets[index] = [];
      buckets[index].push(array[j]);
    }
  }
  while (n < num) {
    result = result.concat(buckets[n]);
    n++;
  }
  console.timeEnd('桶排序耗时');
  return result;
} */

// 算法步骤
// 判断数组长度
// 求最大最小值
// 求桶的数量
// 求一个桶的取值范围
// 求各个桶对应的编号
// 对每个桶填充数据，并且桶里的数据进行排序
// 拼接每个桶的数据

/* 
  @param：arr 待排序数组
  @param：num 桶数量
  @return arr 排序好的数组
*/
function bucketSort(arr, num) {
  // 判断数组长度
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  // 求最大最小值
  let min = arr[0];
  let max = arr[0];
  for (let i = 0; i < len; i++) {
    const temp = arr[i];
    min = temp < min ? temp : min;
    max = temp > max ? temp : max;
  }
  // 桶数量设置默认值
  num = num || 5;
  // 求一个桶的取值范围
  const range = (max - min + 1) / num;
  // 求数据对应的编号
  // 对每个桶填充数据，并且桶里的数据进行排序
  const buckets = [];
  for (let j = 0; j < len; j++) {
    const temp = arr[j];
    const index = Math.floor((temp - min) / range);
    if (buckets[index]) {
      const list = buckets[index];
      let k = list.length - 1;
      while (k >= 0 && list[k] > temp) {
        list[k + 1] = list[k];
        k -= 1;
      }
      list[k + 1] = temp;
    } else {
      buckets[index] = [temp];
    }
  }
  // 拼接每个桶的数据
  let result = [];
  for (let n = 0; n < num; n++) {
    result = [...result, ...buckets[n]];
  }
  return result;
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bucketSort(arr, 6)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
