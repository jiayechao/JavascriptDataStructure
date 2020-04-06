/**
 * 计数排序
 * 适用于有限范围内取值的排序
 * 
 * 
 * 比如我们有 [1,6,4,7,8,3,6,7,8,7,6,4,5,3,9,2,10] 无序数组，
 * 数组中的值只能在0-10之间取值，我们可以构建一个长度11的数组，然后遍历
 * 无序数组，出现一次，就在响应下标加1，遍历完成后，我们只需要按下标值输出相应次数的值就完成了排序
 */

//  Array.prototype.countSort = function() {
//    let arr = []
//    for(let i = 0; i < this.length; i++) {
//      if(!arr[this[i]]) {
//       arr[this[i]] = 1
//      } else {
//       arr[this[i]] += 1
//      }
//    }
//    console.log(arr)
//    let sortArr = []
//    for(let i = 0; i < arr.length; i++) {
//      while(arr[i] > 0) {
//       sortArr.push(i)
//       arr[i]--
//      }
//    }
//    return sortArr
//  }

 /**
  * 上面的排序区别于以前的排序，我们只是输出了一个拍好序的数组，但是我们不知道原来的相同元素的排序了
  * 还有一个问题就是，如果我们的无序数列是[95,94,92,95,100], 按照上面的写法，我们需要创建的数组长度就是100了，这明显不合适
  * 
  * 打个比方，原来第一位和第二位都是1，排序后的数组，我们知道1还是原来的第一位还是第二位？如果是成绩单，我们也就不知道成绩相同的人是哪个了
  * 怎么解决呢？
  */

 Array.prototype.countSort = function() {
  let arr = []
  let max = Math.max(...this)
  let min = Math.min(...this) // 这是我们的偏移量
  for(let i = 0; i < this.length; i++) {
    let index = this[i] - min // 只需要将下标值替换为正常值-偏移量
    if(!arr[index]) {
     arr[index] = 1
    } else {
     arr[index] += 1
    }
  }
  console.log(arr)
  // 从1位开始，要加上前面的值。 这样我们在后面对原数组倒序遍历时，就知道他最终的位置
  for(let i = 1; i < arr.length; i++) {
    if(!arr[i]) {
      arr[i] = arr[i - 1]
    } else {
      arr[i] += arr[i - 1]
    }
  }
  console.log(arr)
  let sortArr = []
  for(let i = this.length - 1; i >=0 ; i--) {
    let index = this[i] - min
    sortArr[arr[index] -1] = this[i] // 最终排名等于当前值
    arr[index]-- // 排名减一，下次相同的值就要排在前面了，因为是倒叙
  }
  return sortArr
}
 var a = [1,1,4,7,8,3,6,7,8,7,6,4,5,3,9,2,10]
 var b = [95,94,92,95,100]
//  console.log(a.countSort())
 console.log(b.countSort())