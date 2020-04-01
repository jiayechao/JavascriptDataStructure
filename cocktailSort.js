// 鸡尾酒排序，是冒泡排序的一种升级
// 我们每一轮都换一个方向来交换

/**
 * 优点是能够在特定条件下，减少排序的回合数；
 * 而缺点也很明显，就是代码量几乎增加了1倍。
 * 使用场景就是大部分已经有序的情况
 */

Array.prototype.switchNum = function(i, j) {
  const tmp = this[i]
  this[i] = this[j]
  this[j] = tmp
}

Array.prototype.cocktailSort = function() {
  let len = this.length
  // 每次我们都做一个从左向右，再一个从右向左
  for(let i = 0; i < len/2; i++) {
    let isSort = true
    // 我们先从左边开始
    for(let j = 0; j < len - i; j++ ) {
      if(this[j] > this[j+1]) {
        this.switchNum(j, j+1)
        isSort = false
      }
    }
    if(isSort) {
      break
    }
    // 然后从右边开始
    isSort = true
    for(let j = len - i; j > i; j-- ) {
      if(this[j] < this[j-1]) {
        this.switchNum(j, j-1)
        isSort = false
      }
    }
    if(isSort) {
      break
    }
  }
}

a = [16,2,7]
a.cocktailSort(a)
console.log(a)