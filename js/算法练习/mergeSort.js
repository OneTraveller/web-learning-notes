function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  console.log({ left, right });
  const leftLen = left.length;
  const rightLen = right.length;
  let [i, j] = [0, 0];
  const result = [];
  while (i < leftLen && j < rightLen) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i += 1;
    } else {
      result.push(right[j]);
      j += 1;
    }
  }

  // 若其中一个子数组首先被合并完全，则直接拼接另一个子数组剩余部分
  if (i < leftLen) {
    return [...result, ...left.slice(i)];
  }
  return [...result, ...right.slice(j)];
}

const list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
mergeSort(list);
