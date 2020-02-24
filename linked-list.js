/**
 * 链表的内存空间是可以不连续的，能充分利用计算机内存，而且不必在创建时确定大小，可以无限延伸下取。
 * 但是相比数组也是有一些缺点，无法通过下标访问元素，只能从头开始访问
 *  */

function LinkedList() {
  // 头节点
  this.head = null
  // 链表长度
  this.length = 0
  // 节点
  this.createNode = function(data) {
    return {
      data: data,
      next: null
    }
  }
}

LinkedList.prototype.append = function(data) {
  const newNode = this.createNode(data)
  // 如果是第一个节点
  if(!this.length) {
    this.head = newNode
  } else {
    // 找到最后一个节点
    let current = this.head // 设置一个变量
    // 开始查找，直到current为null，就是最后一个节点了
    while(current.next) {
      current = current.next
    }
    current.next = newNode
  }
  this.length += 1
}
LinkedList.prototype.insert = function(data, position) {
  // 判断postion的边界
  if(position < 0 || position > this.length) {
    console.error('超出位置')
    return false
  }
  const newNode = this.createNode(data)
  // 先插入边界
  if(position === 0) {
    newNode.next = this.head
    this.head = newNode
  } else {
    let index = 0
    let current = this.head
    let prevNode = null
    while(index < position) {
      prevNode = current
      current = current.next
      index += 1
    }
    // 插入之前的next指向新节点
    prevNode.next = newNode
    // 新节点next指向当前节点
    newNode.next = current
  }
  this.length += 1
}
LinkedList.prototype.get = function(position) {
  // 判断边界条件
  if(position < 0 || position >= this.length) {
    return null
  }
  let index = 0
  let current = this.head
  while(index++ < position) {
    current = current.next
  }
  return current.data
}
LinkedList.prototype.indexOf = function(data) {
  let index = 0
  let current = this.head
  while(current) {
    if(current.data === data) {
      return index
    }
    current = current.next
    index += 1
  }
  return -1
}
LinkedList.prototype.update = function(data, position) {
  // 判断边界条件
  if(position < 0 || position >= this.length) {
    return false
  }
  let index = 0
  let current = this.head
  while(index++ < position) {
    current = current.next
  }
  current.data = data
}
LinkedList.prototype.removeAt = function(position) {
  // 判断边界条件
  if(position < 0 || position >= this.length) {
    return null
  }
  let current = this.head
  if(position === 0) {
    this.head = this.head.next
  } else {
    let index = 0
    let prevNode = null
    while(index++ < position) {
      prevNode = current
      current = current.next
    }
    // 前一个节点指向后一个节点
    prevNode.next = current.next
  }
  this.length -= 1
  return current.data
}
LinkedList.prototype.remove = function(data) {
  const index = this.indexOf(data)
  return this.removeAt(index)
}
// 判断链表是否为空
LinkedList.prototype.isEmpty = function() {
  return !this.length
}

// 获取链表中元素个数
LinkedList.prototype.size = function() {
  return this.length
}

// 获取链表中元素个数
LinkedList.prototype.toString = function() {
  let str = ''
  let current = this.head
  while(current) {
    str = str + current.data + ' '
    current = current.next
  }
  return str
}

exports.LinkedList = LinkedList