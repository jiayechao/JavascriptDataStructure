// 队列的特点就是能回溯历史，让历史重演一次

function Queue() {
  this.items= []
}

// 进队列
Queue.prototype.enqueue = function(ele) {
  this.items.push(ele)
}

// 出队列
Queue.prototype.dequeue = function() {
  return this.items.shift()
}

// 查看队列第一个元素
Queue.prototype.front = function() {
  return this.items[0]
}

// 判断队列是否为空
Queue.prototype.isEmpty = function() {
  return !this.items.length
}

// 获取队列中元素个数
Queue.prototype.size = function() {
  return this.items.length
}

module.exports.Queue = Queue