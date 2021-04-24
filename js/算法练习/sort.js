// 基数排序
function radixSort(list, maxDigit) {
  let mod = 10;
  let dev = 1;
  const counter = [];
  for (let i = 0; i < maxDigit; i++, mod *= 10, dev *= 10) {
    for (let j = 0; j < list.length; j++) {
      const temp = list[j];
      const radix = parseInt((temp % mod) / dev);
      if (!counter[radix]) {
        counter[radix] = [];
      }
      counter[radix].push(temp);
    }

    let pos = 0;
    for (let j = 0; j < counter.length; j++) {
      const temp = counter[j];
      if (temp) {
        let value = temp.shift();
        while (value) {
          list[pos] = value;
          pos += 1;
          value = temp.shift();
        }
      }
    }
  }
  console.log(list);
  return list;
}

const list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
radixSort(list, 2);
