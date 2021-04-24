/* 
  1. 找出最大值，确定最高位数
  2. 循环最高位数，对每一位数字进行排序，从最低位开始，直到最高位
*/

function radixSort(arr) {
  const len = arr.length;
  let max = arr[0];
  for (let i = 0; i < len; i++) {
    max = arr[i] > max ? arr[i] : max;
  }
  const maxDigit = `${max}`.length;
  const counter = [];
  let mod = 10;
  let dev = 1;
  for (let j = 0; j < maxDigit; j++, mod *= 10, dev *= 10) {
    for (let k = 0; k < len; k++) {
      const index = Math.floor((arr[k] % mod) / dev);
      if (!counter[index]) {
        counter[index] = [];
      }
      counter[index].push(arr[k]);
    }

    let pos = 0;
    for (let n = 0; n < counter.length; n++) {
      while (counter[n] && counter[n].length) {
        arr[pos] = counter[n].shift();
        pos += 1;
      }
    }
  }
  return arr;
}

radixSort([10, 2, 1, 2, 34, 2, 3, 4, 2, 3, 4, 32]);
