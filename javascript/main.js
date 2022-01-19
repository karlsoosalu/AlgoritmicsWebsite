function run(isAlreadySorted) {
  document.getElementById("loader").style.display = "block";
  runAlgorithms(getRunningTimes, isAlreadySorted);
}

function runAlgorithms(_callback, isAlreadySorted) {
  setTimeout(_callback, 100, function () {
    document.getElementById("loader").style.display = "none";
  }, isAlreadySorted);
}

function getRunningTimes(_callback, isAlreadySorted) {
  console.log(isAlreadySorted);
  nr = document.getElementById("nrElements").value;
  var items = randomArray(nr, nr);
  if (isAlreadySorted) {
    items.sort(function(a, b) {
      return a - b;
    });
  }
  var copy = [...items];
  runQuickSort(copy);
  var copy = [...items];
  runMergeSort(copy);
  runHeapSort(copy);
  var copy = [...items];
  runBubbleSort(copy);
  var copy = [...items];
  runInsertionSort(copy);
  var copy = [...items];
  runSelectionSort(copy);
  var copy = [...items];
  runRadixSort(copy);
  var copy = [...items];
  runBucketSort(copy);
  var copy = [...items];
  runBuiltInSort(copy);

  setTimeout(_callback, 100);
}

function randomArray(ARRAY_LENGTH, max) {
  return Array.apply(null, { length: ARRAY_LENGTH }).map((x) =>
    Math.round(Math.random() * max)
  );
}

/*** 
 QUICKSORT
 ***/

function runQuickSort(items) {
  document.getElementById("QSTime").innerHTML = "Running...";
  var start = new Date().getTime();
  quickSort(items, 0, items.length - 1);
  var time = new Date().getTime() - start;
  document.getElementById("QSTime").innerHTML = "Time: " + time + "ms";
}

function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right);
    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      quickSort(items, index, right);
    }
  }
  return items;
}

/*** 
 MERGESORT
 ***/

function runMergeSort(items) {
  document.getElementById("MTime").innerHTML = "Running...";
  var start = new Date().getTime();
  mergeSort(items);
  var time = new Date().getTime() - start;
  document.getElementById("MTime").innerHTML = "Time: " + time + "ms";
}

function merge(arr1, arr2) {
  let sorted = [];
  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) sorted.push(arr1.shift());
    else sorted.push(arr2.shift());
  }
  return sorted.concat(arr1.slice().concat(arr2.slice()));
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2),
    left = mergeSort(arr.slice(0, mid)),
    right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

/*** 
 HEAP SORT
 ***/

function runHeapSort(items) {
  document.getElementById("HTime").innerHTML = "Running...";
  var start = new Date().getTime();
  heapSort(items);
  var time = new Date().getTime() - start;
  document.getElementById("HTime").innerHTML = "Time: " + time + "ms";
}

function heapSort(arr) {
  var sorted = [];
  var heap1 = new Heap();
  for (let i = 0; i < arr.length; i++) {
    heap1.insert(arr[i]);
  }
  for (let i = 0; i < arr.length; i++) {
    sorted.push(heap1.delete());
  }
  return sorted;
}

class Heap {
  constructor() {
    this.heap = [];
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChildIndex(index) {
    return 2 * index + 1;
  }

  rightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  insert(item) {
    this.heap.push(item);
    var index = this.heap.length - 1;
    var parent = this.parentIndex(index);
    while (this.heap[parent] && this.heap[parent] > this.heap[index]) {
      this.swap(parent, index);
      index = this.parentIndex(index);
      parent = this.parentIndex(index);
    }
  }
  delete() {
    var item = this.heap.shift();
    this.heap.unshift(this.heap.pop());
    var index = 0;
    var leftChild = this.leftChildIndex(index);
    var rightChild = this.rightChildIndex(index);
    while (
      (this.heap[leftChild] && this.heap[leftChild] < this.heap[index]) ||
      this.heap[rightChild] < this.heap[index]
    ) {
      var max = leftChild;
      if (this.heap[rightChild] && this.heap[rightChild] < this.heap[max]) {
        max = rightChild;
      }
      this.swap(max, index);
      index = max;
      leftChild = this.leftChildIndex(max);
      rightChild = this.rightChildIndex(max);
    }
    return item;
  }
}

/*** 
 BUBBLE SORT
 ***/

function runBubbleSort(items) {
  document.getElementById("BTime").innerHTML = "Running...";
  var start = new Date().getTime();
  bubbleSort(items);
  var time = new Date().getTime() - start;
  document.getElementById("BTime").innerHTML = "Time: " + time + "ms";
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    var swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j + 1] < arr[j]) {
        swapped=true;
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
    if(!swapped){
      break;
    }
  }
  return arr;
}

/*** 
 INSERTION SORT
 ***/

function runInsertionSort(items) {
  document.getElementById("ITime").innerHTML = "Running...";
  var start = new Date().getTime();
  insertionSort(items);
  var time = new Date().getTime() - start;
  document.getElementById("ITime").innerHTML = "Time: " + time + "ms";
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j > -1; j--) {
      if (arr[j + 1] < arr[j]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }

  return arr;
}

/*** 
 SELECTION SORT
 ***/

function runSelectionSort(items) {
  document.getElementById("STime").innerHTML = "Running...";
  var start = new Date().getTime();
  selectionSort(items);
  var time = new Date().getTime() - start;
  document.getElementById("STime").innerHTML = "Time: " + time + "ms";
}

function selectionSort(arr) {
  let min;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}

/*** 
 RADIX SORT
 https://www.digitalocean.com/community/tutorials/js-radix-sort
 ***/

function runRadixSort(items) {
  document.getElementById("RTime").innerHTML = "Running...";
  var start = new Date().getTime();
  radixSort(items);
  var time = new Date().getTime() - start;
  document.getElementById("RTime").innerHTML = "Time: " + time + "ms";
}

function radixSort(arr) {
  let maxLength = largestNum(arr);
  for (let i = 0; i < maxLength; i++) {
    let buckets = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < arr.length; j++) {
      let num = getNum(arr[j], i);
      if (num !== undefined) buckets[num].push(arr[j]);
    }
    arr = buckets.flat();
  }
  return arr;
}

function largestNum(arr) {
  let largest = "0";
  arr.forEach((num) => {
    const strNum = String(num);
    if (strNum.length > largest.length) largest = strNum;
  });
  return largest.length;
}

function getNum(num, index) {
  const strNum = String(num);
  let end = strNum.length - 1;
  const foundNum = strNum[end - index];
  if (foundNum === undefined) return 0;
  else return foundNum;
}

/*** 
 BUCKET SORT
 https://www.tutorialspoint.com/program-to-implement-bucket-sort-in-javascript
 ***/

function runBucketSort(items) {
  document.getElementById("BucTime").innerHTML = "Running...";
  var start = new Date().getTime();
  bucketSort(items);
  var time = new Date().getTime() - start;
  document.getElementById("BucTime").innerHTML = "Time: " + time + "ms";
}

function bucketSort(arr) {
  if (arr.length === 0) {
    return arr;
  }
  let i,
    minValue = arr[0],
    maxValue = arr[0],
    bucketSize = 5;
  arr.forEach(function (currentVal) {
    if (currentVal < minValue) {
      minValue = currentVal;
    } else if (currentVal > maxValue) {
      maxValue = currentVal;
    }
  });
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  let allBuckets = new Array(bucketCount);
  for (i = 0; i < allBuckets.length; i++) {
    allBuckets[i] = [];
  }
  arr.forEach(function (currentVal) {
    allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(
      currentVal
    );
  });
  arr.length = 0;
  allBuckets.forEach(function (bucket) {
    insertion(bucket);
    bucket.forEach(function (element) {
      arr.push(element);
    });
  });
  return arr;
}

function insertion(arr) {
  let length = arr.length;
  let i, j;
  for (i = 1; i < length; i++) {
    let temp = arr[i];
    for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = temp;
  }
  return arr;
}

/*** 
 BUILT-IN SORT
 ***/

function runBuiltInSort(items) {
  document.getElementById("BITime").innerHTML = "Running...";
  console.log(items);
  var start = new Date().getTime();
  console.log(items.sort(function(a, b) {
    return a - b;
  }));
  var time = new Date().getTime() - start;
  document.getElementById("BITime").innerHTML = "Time: " + time + "ms";
}
