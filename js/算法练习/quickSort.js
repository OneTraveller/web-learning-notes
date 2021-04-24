function quickSort(arr, left = 0, right = arr.length - 1) {
  if (arr.length < 2) {
    return arr;
  }

  const index = partition(arr, left, right);
  if (left < index - 1) {
    quickSort(arr, left, index - 1);
  }
  if (index < right) {
    quickSort(arr, index, right);
  }
  console.log(arr);
  return arr;
}

// 分区操作
function partition(arr, left, right) {
  const pivot = Math.floor((left + right) / 2);
  const pivotValue = arr[pivot];
  console.log({ pivotValue });
  while (left <= right) {
    while (arr[left] < pivotValue) {
      left += 1;
    }
    while (arr[right] > pivotValue) {
      right -= 1;
    }
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left += 1;
      right -= 1;
    }
  }
  return left;
}

const list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
quickSort(list);
