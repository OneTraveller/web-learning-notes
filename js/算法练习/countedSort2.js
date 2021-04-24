function countingSort(arr) {
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

  // 对所有计数累加
  for (let j = min; j < max; j++) {
    tempList[j + 1] = (tempList[j] || 0) + (tempList[j + 1] || 0);
  }

  for (let k = arr.length - 1; k >= 0; k--) {
    const temp = arr[k];
    result[tempList[temp] - 1] = temp;
    tempList[temp] -= 1;
  }

  return result;
}

const list = [4, 5, 3, 6, 3, 9, 7, 8];
countingSort(list);
