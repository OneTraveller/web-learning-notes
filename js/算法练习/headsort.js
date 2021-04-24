// 堆排序

// 交换数据
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/*
  description：堆调整
  @param arr 排好序数组
  @param i 数组下标
  @param len 堆大小
*/
function heapify(arr, i, len) {
  let left = i * 2 + 1;
  let right = i * 2 + 2;
  let max = i;
  if (left < len && arr[left] > arr[max]) {
    max = left;
  }
  if (right < len && arr[right] > arr[max]) {
    max = right;
  }
  if (max !== i) {
    swap(arr, i, max);
    heapify(arr, max, len);
  }
}

/*
  description：堆排序
  @param  arr 待排序数组
  @return arr 排好序数组
*/
function heapSort(arr) {
  // 建大顶堆
  let len = arr.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, i, len);
  }

  // 堆排序
  for (let j = len - 1; j > 0; j--) {
    swap(arr, 0, j);
    len--;
    heapify(arr, 0, len);
  }
  return arr;
}

const list = [91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31, 77, 81, 22];
const result = heapSort(list);
console.log(result);
