/**
 * ### 简单排序
    冒泡/选择/插入/

    ### 高级排序
    希尔/快速/归并/计数/基数/希尔/堆/桶 
 *
 * */

function ArrayList() {
  this.array = []
}

// 插入元素
ArrayList.prototype.insert = function(item){
  this.array.push(item)
}
// toString,方便测试
ArrayList.prototype.toString = function(item){
  return this.array.join('-')
}
// 交换
ArrayList.prototype.switch = function(m, n){
  const tmp = this.array[m]
  this.array[m] = this.array[n]
  this.array[n] = tmp
}
// m冒泡排序
ArrayList.prototype.bubbleSort = function(){
  // 第一次比较到数据最后一位，第二次只需要到length-2，到后面只需要到第二位
  for(let j = this.array.length - 1;j >= 0;j--) {
    for(let i = 0; i < j; i++) {
      if(this.array[i] > this.array[i+1]) {
        this.switch(i, i+1) // 每次比较都要替换
      }
    }
  }
}

/**
 * 选择排序，
 * 循环次数和冒泡一致
 * 但是从交换次数上来看上了一半
 *  */ 
ArrayList.prototype.selectionSort = function(){
  
  // 第一次比较到数据最后一位，第二次只需要到length-2，到后面只需要到第二位
  for(let j = 0;j < this.array.length - 1;j++) {
    let min = this.array[j]
    let minIndex = j
    for(let i = j+1; i < this.array.length; i++) {
      if(this.array[i] < min) {
        min = this.array[i]
        minIndex = i
      }
    }
    this.switch(j, minIndex) // 只需要一轮交换一次
    this.array[j] = min
  }
}

/**
 * 插入排序
 * 比较次数最多只有N(N-1)/2，而冒泡和选择是固定的
 * 无交换次数
 *  */ 
ArrayList.prototype.insertionSort = function() {
  for(let i = 1; i < this.array.length; i++) {
     // 取出标记
    let tmp = this.array[i]
    let j = i
    // 比较标记左边的，如果比标记大，后移
    while(tmp < this.array[j - 1] && j >0) {
      this.array[j] = this.array[j - 1]
      j--
    }
    // 如果标记小，直接赋值
    this.array[j] = tmp
  }
}
/**
 * 希尔排序，插入排序的改进版
 * 考虑插入排序的最坏情况，可能最小的数字在最右端
 * 设想一下，如果这个最小数字在中间是，是不是就比在最右端效率更高了
 * 希尔排序就是通过分组，然后组内排序
 * 再分组，再排序
 * 最后通过插入排序完成排序
 */
ArrayList.prototype.shellSort = function() {
  const len = this.array.length
  // 定义过一个间隔
  let gap = Math.floor(len / 2)

  // 当gap不为 1 时
  while(gap >= 1) {
    // 我们采取和插入排序的一样思想
    for(let i = gap; i < len; i+=gap) {
      let tmp = this.array[i]
      let j = i
      while(tmp < this.array[j - gap] && j - gap >= 0) {
        this.array[j] = this.array[j - gap]
        j -= gap
      }
      this.array[j] = tmp 
    }
    gap = Math.floor(gap / 2)
  }
}

/**
 * 快速排序
 * 主要思想就是分而治之
 * 选择一个值，然后将这个值放在最右边，然后定义两个指针，分别从最后和最左开始找比这个值大和小的值，并且交换
 * 直到两个指针重合，将重合的值与选择的值交换即可
 * 所以我们的前提就是选值的问题
 * 一般选择前中后三个值，然后比较这三个值，按照顺序交换
 * 再用前面的思路实现算法
 */
ArrayList.prototype.quickSort = function() {
  // 定义左右
   let left = 0
   let right = this.array.length - 1
   // 递归处理
   this.quick(left, right)
}

// 递归处理
ArrayList.prototype.quick = function(left, right) {
  // 递归结束条件
  if(left >= right) {
    return
  }
  let pivot = this.medium(left, right)
  let i = left
  let j = right - 1
  // 循环左右两个指针
  while(true) {
    while(this.array[++i] < pivot) {

    }
    while(this.array[--j] > pivot) {

    }
    
    if(i < j) {
      // 交换
      this.switch(i, j)
    } else { 
      // 否则跳出循环
      break
    }
  }
  // 跳出循环后，将选中和当前指针的交换,我们的i不能大于选中的值
  if(i < right - 1){
    this.switch(i, right - 1)
  }
  // 已经分组了，我们递归处理其他两个分组
  this.quick(left, i-1)
  this.quick(i+1, right)
}


// 枢纽
ArrayList.prototype.medium= function(left, right) {
  const center = Math.floor((left+right)/2)

  if(this.array[left] > this.array[center]) {
    this.switch(left, center)
  }
  if(this.array[left] > this.array[right]) {
    this.switch(left, right)
  }
  if(this.array[center] > this.array[right]) {
    this.switch(center, right)
  }
  // 将中间的放到最右边的前一位
  this.switch(center, right - 1)
  return this.array[right - 1]
}
const arr = new ArrayList()
arr.insert(678)
arr.insert(6)
// arr.insert(12)
// arr.insert(15)
// arr.insert(67)
// arr.insert(241)
// arr.insert(3)
// arr.insert(77)

console.log(arr.toString())
// arr.bubbleSort()
// arr.selectionSort()
// arr.insertionSort()
// arr.shellSort()
arr.quickSort()
console.log(arr.toString())