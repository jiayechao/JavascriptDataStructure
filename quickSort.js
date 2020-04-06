/**
 * 快速排序
 * 快速排序是冒泡排序的演变，也是通过交换元素实现
 * 
 * 与冒泡不同的是，冒泡是每一轮都只把一个元素冒泡到一端，而快速排序则在每一轮挑选一个基准元素
 * 并让其他比他大的元素移动到一边，逼他小的移动到另一边，从而拆解成两部分，这种思路就是分治法
 * 
 * 分成两部分有什么好处呢？我们每一轮都把数列分成两部分，每次比较都是全部元素，那就是O(n),然后要拆几次呢
 * logN，那么复杂度就是O(nlogn), 可以看到在大部分情况下是优于o(n^2)的
 * 
 * 快速排序的重点在基准元素的选择
 */

/**
 * 基准的选择
 * 一般我们将基准选为第一个元素，但是有一个极端情况，如果数列本身是一个逆序的，那我们的算法就会退化为O(n^2)
 */

Array.prototype.switchNum = function(i, j) {
  const tmp = this[i]
  this[i] = this[j]
  this[j] = tmp
}

// Array.prototype.quickSort = function(arr) {
//   let len = arr.length
//   let that = this
//   quick(0, len - 1)
//   function quick(left, right) {
//     // 首先选出一个基准
//     const base = arr[left]
//     let i = left
//     let j = right
//     if(i >= j) {
//       return
//     }
//     // 我们先采用双边寻欢法
//     while(i < j) {
//       // 先从右边指针开始, 如果大于等于基准值，则指针左移一个
//       while(i < j && arr[j] >= base) {
//         j--
//       }
//       // 再从左边指针开始往前走，如果小于等于基准值，则指针右移一个
//       while(i < j && arr[i] <= base) {
//         i++
//       }
//       // 然后交换两边指针
//       i <= j && that.switchNum(i, j)
//       // 循环到此结束
//     }
//     // 此时两个指针已经重合，将base与重合的交换
//     that.switchNum(i, left)
//     // 然后递归已经分好的另外两个数列
//     quick(left, i-1)
//     quick(i+1, right)
//   }
// }

/**
 * 接下来演示单边循环
 * 
 * 上面的双边循环嵌套两层循环，看起来繁琐
 * 
 * 单边循环只需要一次大循环
 */
// Array.prototype.quickSort = function(arr) {
//   let len = arr.length
//   let that = this
//   quick(0, len - 1)
//   function quick(left, right) {
//     // 同样，首先选出一个基准
//     const base = arr[left]
//     let i = left // 基准指针
//     let j = left + 1 // 遍历的指针 
//     if(i >= right) {
//       return
//     }
//     // 这里我们采用单边寻欢法
//     while(j <= right) {
//       // 开始遍历，如果小于基准值，基准指针右移一位，并且与遍历指针交换
//       if(arr[j] <= base) {
//         i += 1
//         that.switchNum(i, j)
//       }
//       j++
//     }
//     // 此时交换基准指针和基准的位置
//     that.switchNum(i, left)
//     // 然后递归已经分好的另外两个数列
//     quick(left, i-1)
//     quick(i+1, right)
//   }
// }

/**
 * 我们也可以用栈的方式替换递归实现
 * 
 * 绝大多数的递归逻辑都可以用栈的方式替代
 * 
 */
Array.prototype.quickSort = function(arr) {
  let len = arr.length
  let that = this
  const stack = []
  const param = {}
  param.start = 0
  param.end = len - 1
  stack.push(param)

  while (stack.length) {
    var arg = stack.pop()
    quick(arg.start, arg.end) 
  }
  function quick(left, right) {
    // 同样，首先选出一个基准
    const base = arr[left]
    let i = left // 基准指针
    let j = left + 1 // 遍历的指针 
    if(i >= right) {
      return
    }
    // 这里我们采用单边寻欢法
    while(j <= right) {
      // 开始遍历，如果小于基准值，基准指针右移一位，并且与遍历指针交换
      if(arr[j] <= base) {
        i += 1
        that.switchNum(i, j)
      }
      j++
    }
    // 此时交换基准指针和基准的位置
    that.switchNum(i, left)
    // 然后递归已经分好的另外两个数列
    stack.push({
      start:i+1,
      end: right
    })
    stack.push({
      start:left,
      end: i-1
    })
    
  }
}
a = [16,2,7]
a.quickSort(a)
console.log(a)