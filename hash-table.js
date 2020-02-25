/**
 * 我们的哈希表通过数组，链地址法封装，因为不管是数组还是链表，我们都会通过线性查找，所以性能相差不大
 * 
 */
const { hashFunc } = require('./hash-function')
const { isPrime } = require('./prime')

function HashTable() {
  this.storage = [] // 表
  this.count = 0 // 定义一个填充因子，当大于0.75时我们扩容，当小于0.25时我们缩容，动态调整
  this.limit= 7 // 初始容量，我们最好设置成质数
}
// 哈希函数
HashTable.prototype.hashFunc = hashFunc

//添加
HashTable.prototype.put = function(key, value) {
  /**
   * key就是我们要转成index的值，而value就是描述key的，
   * 比如员工，key可能就是我们的员工姓名，而value就是电话，学历等等
   *
   * 1. 获取索引值
   * 2. 根据索引值，找到表中的链地址，
   * 3. 判断链地址是否存在，如果不存在就创建一个
   * 4. 然后根据链地址去找相应的key
   * 5. 根据key来判断是新增还是修改
   */
  const index = this.hashFunc(key, this.limit)

  let bucket = this.storage[index]

  if(!bucket) {
    bucket = []
    this.storage[index] = bucket
  }

  for(let i = 0; i < bucket.length; i++) {
    const tuple = bucket[i]
    if(tuple[0] === key) {
      tuple[1] = value
      return
    }
  }

  bucket.push([key, value])
  this.count += 1

  // 判断填充因子
  if(this.count > (this.limit*0.75)) {
    // 我们的扩容最好恒为质数
    const newLimit = this.generatePrime(this.limit*2)
    this.resize(newLimit)
  }
}

// 获取
HashTable.prototype.get = function(key) {
  const index = this.hashFunc(key, this.limit)
  const bucket = this.storage[index]
  if(!bucket) {
    return null
  }
  for(let i = 0; i < bucket.length; i++) {
    const tuple = bucket[i]
    if(tuple[0] === key) {
      return tuple[1]
    }
  }
  return null
}

// 删除
HashTable.prototype.remove = function(key) {
  const index = this.hashFunc(key, this.limit)
  const bucket = this.storage[index]

  if(!bucket) {
    return null
  }
  for(let i = 0; i < bucket.length; i++) {
    const tuple = bucket[i]
    if(tuple[0] === key) {
      bucket.splice(i,1)
      this.count -= 1
      // 判断填充因子,但也不能太小
      if(this.limit > 7 && this.count < (this.limit*0.25)) {
        const newLimit = this.generatePrime(Math.floor(this.limit/2))
        console.log(newLimit)
        this.resize(newLimit)
      }
      return tuple[1]
    }
  }
  return null
}

HashTable.prototype.isEmpty = function() {
  return !this.count
}

HashTable.prototype.size = function() {
  return this.count
}

// 扩容
HashTable.prototype.resize = function(newLimit) {
  /**
   * 1. 设置一个指针指向表
   * 2. 重置表
   * 3. 将指针内容重新添加进新的表
   */
  const oldStorage = this.storage

  this.storage = []
  this.count = 0
  this.limit = newLimit

  for(let i = 0; i < oldStorage.length; i++) {
    const bucket = oldStorage[i]

    if(!bucket) {
      continue
    }
    for(let j = 0; j < bucket.length; j++) {
      const tuple = bucket[j]
      this.put(tuple[0], tuple[1])
    }
  }
}

// 生成质数
HashTable.prototype.generatePrime = function(num) {
  while(!isPrime(num)) {
    num++
  }
  return num
}
// 
var a = new HashTable()

a.put('vvv', '15')
a.put('aaa', '15')
a.put('bb', '15')
a.put('ccc', '15')
a.put('ddd', '15')
a.put('aaaaaa', '15')
a.put('eee', '15')
a.put('fff', '15')
a.put('www', '15')
a.put('aaawaa', '15')
console.log(JSON.stringify(a))