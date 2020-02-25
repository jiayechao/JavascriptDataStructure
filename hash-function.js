/**
 * @params <str>
 * @params <size>
 * 将字符串转成大数字，hascode
 * 将大数字压缩到数组范围之内
 */
function hashFunc(str, size) {
  let hasCode = 0

  for(let i = 0; i< str.length; i++) {
    // 我们用霍纳算法的思想，用一个质数来乘
    hasCode = 37 * hasCode + str.charCodeAt(i)
  }
  // 取模
  const index = hasCode % size

  return index
}

// console.log(hashFunc('cats',5))
// console.log(hashFunc('dogs',5))
// console.log(hashFunc('birds',5))

exports.hashFunc = hashFunc