// 优先级队列，使用线性结构虽然能实现，但是时间复杂度会比较高
// 应用在需要优先处理的队列

function PriorityQueue() {
  this.items = []

  this.queueElement = function(ele, priority) {
    return {
      ele: ele,
      priority: priority
    }
  }
}
// 优先级队列进队列
PriorityQueue.prototype.enqueue = function(ele, priority) {
  const queueElement = this.queueElement(ele, priority)
  if(this.items.length === 0) {
    this.items.push(queueElement)
  } else {
    var addTag  = false
    // 按照优先级插入
    for(let i = 0;i<this.items.length;i++) {
      if(this.items[i].priority > queueElement.priority) {
        this.items.splice(i,0,queueElement)
        addTag = true
        break
      }
    }
    if(!addTag) {
      this.items.push(queueElement)
    }
  }
}
// 出队列
PriorityQueue.prototype.dequeue = function() {
  return this.items.shift()
}

// 查看队列第一个元素
PriorityQueue.prototype.front = function() {
  return this.items[0]
}

// 判断队列是否为空
PriorityQueue.prototype.isEmpty = function() {
  return !this.items.length
}

// 获取队列中元素个数
PriorityQueue.prototype.size = function() {
  return this.items.length
}

exports.PriorityQueue = PriorityQueue