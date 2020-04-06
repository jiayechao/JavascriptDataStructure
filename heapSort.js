/**
 * 我们前面说过堆，，我们构建一个最大堆，然后每次删除堆顶元素，直到删除完毕，删除元素就构成了一个顺序的排列
 */


Array.prototype.switchNum = function(i, j) {
  const tmp = this[i]
  this[i] = this[j]
  this[j] = tmp
}


Array.prototype.heapSort = function() {
  // 我们先将无序数列构建成最大堆
  buildHeap(this)
  // 循环删除栈顶元素，移动到集合的尾部，调整堆产生新的堆顶
  for(let i = this.length - 1; i > 0; i--) {
    // 最后一个元素与第一个元素交换
    let temp = this[i]
    this[i] = this[0]
    this[0] = temp
    // 调整最大堆, 这里只需要传入i
    downAdjust(this, 0 , i)
  }
}
/**
 * @param arr 待调整的堆
 */
function buildHeap(arr) {
  // 从最后一个叶子节点开始遍历
  for(let i = Math.floor((arr.length - 2)/2); i >= 0; i--) {
    downAdjust(arr, i, arr.length)
  }
}

/**
 * 
 * @param {array} arr 待调整的堆
 * @param {number} parrentIndex 要下沉的父节点
 * @param {number} length 堆得有效大小
 */
function downAdjust(arr, parrentIndex, length) {
  // 保存父节点的值，用于最后赋值
  var temp = arr[parrentIndex]
  var childIndex = parrentIndex * 2 + 1
  while(childIndex < length) {
    // 如果有右节点，并且右节点比左节点大，则定位到右节点
    if(childIndex + 1 < length && arr[childIndex + 1] > arr[childIndex]) {
      childIndex += 1
    }
    // 如果父节点大于子节点的最小值，则跳出
    if(temp >= arr[childIndex]) {
      break
    }
    // 单项赋值
    arr[parrentIndex] = arr[childIndex] // 子节点上浮
    parrentIndex = childIndex // 改变其下标
    childIndex = 2 * childIndex + 1 // 找出他的子节点，继续下称寻找
    console.log(arr)
  }
  arr[parrentIndex] = temp // 最后将下沉的节点放在合适的位置
}

a = [2,7,16,19,20]

a.heapSort()
console.log(a)