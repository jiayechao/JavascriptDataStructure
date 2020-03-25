/**
 * 冒泡排序是最基本的排序
 */
Array.prototype.switchNum = function(i, j) {
  const tmp = this[i]
  this[i] = this[j]
  this[j] = tmp
}

Array.prototype.bubbleSort = function() {
  for(let i = 0; i < this.length; i++) { // 大循环的次数，
    for(let j = 0; j < this.length - i - 1; j++) { // 每次循环的次数
      if(this[j] > this[j + 1]) { // 如果比下一个大，就冒泡上去
        this.switchNum(j, j+1)
      }
    }
  }
}


a = [16,2,7]
a.bubbleSort(a)
console.log(a)