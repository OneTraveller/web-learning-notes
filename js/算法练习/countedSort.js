/* 
  步骤：
  1. 取出最小值和最大值
  2. 统计数组中每个值为i的元素出现的次数，存入临时数组的第i项
  3. 填充目标数组
*/

/* function countSort(arr) {
  const tempList = [];
  const result = [];
  let min = arr[0];
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i];
    min = temp >= min ? min : temp;
    max = temp >= max ? temp : max;
    tempList[temp] = (tempList[temp] || 0) + 1;
  }

  let index = 0;
  for (let j = min; j <= max; j++) {
    let temp = tempList[j] || 0;
    while (temp > 0) {
      result[index] = j;
      index += 1;
      temp -= 1;
    }
  }
  console.log(result);
  return result;
}

const list = [4, 5, 3, 6, 3, 9, 7, 8, 22, 32, 21];
countSort(list); */

function countSort(arr) {
  const tempList = [];
  const result = [];
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i];
    max = max >= temp ? max : temp;
    tempList[temp] = (tempList[temp] || 0) + 1;
  }

  let index = 0;
  for (let j = 0; j <= max; j++) {
    let temp = tempList[j] || 0;
    while (temp > 0) {
      result[index] = j;
      index += 1;
      temp -= 1;
    }
  }
  console.log(result);
  return result;
}

const list = [5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5];
countSort(list);
