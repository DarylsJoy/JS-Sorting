/**
 * JS实现的冒泡排序，选择排序，插入排序，归并排序，快速排序
 * 绑定到 Array 的原形链
 */

// 冒泡排序
Array.prototype.bubbleSort = Array.prototype.bubbleSort || function () {
  let length = this.length, temp;
  for (let i = 0; i < length; i ++) {
    for (let j = 0; j < length - i - 1; j ++) {
      if (this[j] > this[j + 1]) {
        temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
  return this;
};

// 选择排序
Array.prototype.selectionSort = Array.prototype.selectionSort || function () {
  let length = this.length, indexMin, temp;
  for (let i = 0; i < length - 1; i ++) {
    indexMin = i;
    for (let j = i; j < length; j ++) {
      if (this[indexMin] > this[j]) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      temp = this[i];
      this[i] = this[indexMin];
      this[indexMin] = temp;
    }
  }
  return this;
};

// 插入排序
Array.prototype.insertSort = Array.prototype.insertSort || function () {
  let length = this.length, j, temp;
  for (let i = 0; i < length; i ++) {
    j = i;
    temp = this[i];
    while (j > 0 && this[j - 1] > temp) {
      this[j] = this[j - 1];
      j--;
    }
    this[j] = temp;
  }
  return this;
};

// 归并排序
Array.prototype.mergeSort = Array.prototype.mergeSort || function () {
  let length = this.length;
  if (length === 1) {
    return this;
  }
  let mid = Math.floor(length / 2),
      left = this.slice(0, mid),
      right = this.slice(mid, length);
  // 合并小数组生成大数组
  let merge = function (left, right) {
    let result = [], il = 0, ir = 0;
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }
    while (il < left.length) {
      result.push(left[il++]);
    }
    while (ir < right.length) {
      result.push(right[ir++]);
    }
    return result;
  };
  return merge(left.mergeSort(), right.mergeSort());
};

// 快速排序
Array.prototype.quickSort = Array.prototype.quickSort || function (lt, rt) {
  let left = lt || 0,
      right = rt || this.length - 1,
      index;
  // 划分过程
  let partition = function (array, left, right) {
    let pivot = array[Math.floor((left + right) / 2)],
        l = left,
        r = right,
        temp;
    while (l <= r) {
      while (array[l] < pivot) {
        l++;
      }
      while (array[r] > pivot) {
        r--;
      }
      if (l <= r) {
        temp = array[l];
        array[l] = array[r];
        array[r] = temp;
        l++;
        r--;
      }
    }
    return l;
  };
  if (this.length > 1) {
    index = partition(this, left, right);
    if (left < index - 1) {
      this.quickSort(left, index - 1);
    }
    if (index < right) {
      this.quickSort(index, right);
    }
  }
  return this;
};

let testArr = [5, 198, 1, 23, 56, 154, 22, 80];
console.log(testArr.bubbleSort().join());       // 1,5,22,23,56,80,154,198
console.log(testArr.selectionSort().join());    // 1,5,22,23,56,80,154,198
console.log(testArr.insertSort().join());       // 1,5,22,23,56,80,154,198
console.log(testArr.mergeSort().join());        // 1,5,22,23,56,80,154,198
console.log(testArr.quickSort().join());        // 1,5,22,23,56,80,154,198
