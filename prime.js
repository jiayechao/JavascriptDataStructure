// 判断是否是一个质数

function isPrime(num) {
  const sqrt = parseInt(Math.sqrt(num))

  for(let i = 2; i <= sqrt; i++) {
    if(num % i === 0) {
      return false
    }
  }
  return true
}

exports.isPrime = isPrime
console.log(isPrime(7))