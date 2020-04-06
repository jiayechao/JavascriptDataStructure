/**
 * 二叉堆
 * 有最大堆，最小堆
 * 最大堆的父亲节点要大于子节点，二最小堆正好相反
 */
 // 实现一个最大堆
 function BinaryHeap() {
   this.item = []
 }

 // 插入元素
 BinaryHeap.prototype.insert = function(x) {
  this.item.push(x)
  let len = this.item.length
  if(len === 1) {
    return
  }
   // 右节点的下标是偶数，左节点的下标是奇数
  this.popUp(len - 1)
 }

// 删除堆顶元素
BinaryHeap.prototype.shift = function() {
  let top = this.item[0]
  // 取堆末尾的元素，补位
  this.item[0] = this.item[this.item.length - 1]
  this.item.pop()
  // 然后下沉
  let len = this.item.length
  if(len === 1) {
    return
  }
    // 右节点的下标是偶数，左节点的下标是奇数
  this.popDown(0)
}


 // 查看堆顶元素
 BinaryHeap.prototype.top = function() {
  return this.item[0]
}

// 上浮
BinaryHeap.prototype.popUp = function(i) { 
  let p 
  // 如果是左节点
  if(i%2) {
    // 找到父节点下标
    p = (i - 1) / 2
  } else {
    p = (i - 2) / 2
  }
  // 如果比父节点大，上浮
  if( this.item[i] > this.item[p]) {
    this.switch(i,p)
    // 然后递归
    this.popUp(p)
  }
}

// 下沉
BinaryHeap.prototype.popDown = function(i) { 
  let l = 2 * i + 1
  let r = 2 * i + 2
  // 找出相对大的节点
  let max = this.item[l] > this.item[r] ? l : r
  
  // 比较，下沉
  if(this.item[i] < this.item[max]) {
    this.switch(i, max)
    // 然后递归
    this.popDown(max)
  }
}

// 交换
BinaryHeap.prototype.switch = function(i, j) {
  let tmp = this.item[i]
  this.item[i] = this.item[j]
  this.item[j] = tmp
}



var a = new BinaryHeap()

a.insert(6)
a.insert(1)
a.insert(5)
a.insert(2)
a.insert(8)
a.insert(12)
console.log(a)
a.shift()
a.shift()

console.log(a)

exports.BinaryHeap = BinaryHeap