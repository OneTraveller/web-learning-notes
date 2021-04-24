function shellSort(arr) {
  const len = arr.length;
  let gap = Math.floor(len / 2);
  for (; gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let j = i;
      const temp = arr[i];
      while (j - gap >= 0 && temp < arr[j - gap]) {
        arr[j] = arr[j - gap];
        j = j - gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}

/* function shellSort(arr) {
  var len = arr.length;
  for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 注意：这里和动图演示的不一样，动图是分组执行，实际操作是多个分组交替执行
    for (var i = gap; i < len; i++) {
      var j = i;
      var current = arr[i];
      while (j - gap >= 0 && current < arr[j - gap]) {
        arr[j] = arr[j - gap];
        j = j - gap;
      }
      arr[j] = current;
    }
  }
  console.log(arr);
  return arr;
} */

const list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
shellSort(list);
