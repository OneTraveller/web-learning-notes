function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let preIndex = i - 1;
    const temp = arr[i];
    while (preIndex >= 0 && arr[preIndex] > temp) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex -= 1;
    }
    arr[preIndex + 1] = temp;
  }
  console.log(arr);
  return arr;
}

const list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
insertionSort(list);
