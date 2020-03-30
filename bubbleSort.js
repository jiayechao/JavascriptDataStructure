/**
 * 冒泡排序是最基本的排序
 */
Array.prototype.switchNum = function(i, j) {
  const tmp = this[i]
  this[i] = this[j]
  this[j] = tmp
}

// Array.prototype.bubbleSort = function() {
//   for(let i = 0; i < this.length; i++) { // 大循环的次数，
//     for(let j = 0; j < this.length - i - 1; j++) { // 每次循环的次数
//       if(this[j] > this[j + 1]) { // 如果比下一个大，就冒泡上去
//         this.switchNum(j, j+1)
//       }
//     }
//   }
// }

// 想象一下，如果到某一轮已经排序好了，但是循环没有结束，还是会循环完剩下的部分，那不是白白浪费，我们可以优化
// Array.prototype.bubbleSort = function() {
//   for(let i = 0; i < this.length; i++) { // 大循环的次数，
//     var sortable = true // 定义一个变量，表示这一轮是否有冒泡
//     for(let j = 0; j < this.length - i - 1; j++) { // 每次循环的次数
//       if(this[j] > this[j + 1]) { // 如果比下一个大，就冒泡上去
//         this.switchNum(j, j+1)
//         sortable = false // 表明这一轮有交换
//       }
//     }
//     // 如果这一轮没有交换了，那就是已经排好序了
//     if(sortable){
//       break
//     }
//   }
// }

// 我们还可以优化。设想一下，假设我们后面的排序已经是有序的，但是还是会循环到底，如果我们有一个方法，知道后面的是有序的，
// 那就不用一直循环下去了

Array.prototype.bubbleSort = function() {
  var lastSwitchIndex = 0 // 定义一个变量，标识最后一次交换位置的索引
  var sortBorder = this.length - 1 // 无需数列的边界的，每次循环只需要比较到这里
  for(let i = 0; i < this.length; i++) { // 大循环的次数，
    var sortable = true // 定义一个变量，表示这一轮是否有冒泡
    for(let j = 0; j < sortBorder; j++) { // 每次循环的次数
      if(this[j] > this[j + 1]) { // 如果比下一个大，就冒泡上去
        lastSwitchIndex = j
        this.switchNum(j, j+1)
        sortable = false // 表明这一轮有交换
      }
    }
    // 重新设置边界
    sortBorder = lastSwitchIndex
    // 如果这一轮没有交换了，那就是已经排好序了
    if(sortable){
      break
    }
  }
}
a = [16,2,7]
a.bubbleSort(a)
console.log(a)