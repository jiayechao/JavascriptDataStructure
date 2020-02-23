/**
 * 双向链表区别于单向链表，对于单向链表，我们可以一路走下去，但是想回到上一个节点，就必须从头节点重新查找。而双向链表
 * 就可以较好的解决这种问题。因为他除了一个指向下个节点的指针还有一个指向上个节点的指针。
 * 但这个也导致双向链表比较占用空间，也比较复杂
 *  */ 

function DoublyLinkedList() {
  this.head = null
  this.tail = null // 多了一个尾指针
  this.length = 0
  this.createNode = function(data) {
    return {
      data: data,
      prev: null,
      next: null
    }
  }
}
DoublyLinkedList.prototype.append = function(data) {
 const newNode = this.createNode(data)
 if(!this.length) {
   this.head = newNode
 } else {
   // 新节点的prev指向最后一个节点
   newNode.prev = this.tail
   // 最后一个节点的next指向新节点
   this.tail.next = newNode
 }
 this.tail = newNode
 this.length += 1
}
// 插入链表
DoublyLinkedList.prototype.insert = function(data, position) {
  const newNode = this.createNode(data)
  // 判断位置
  if(position < 0 || position > this.length) {
    console.error('插入位置有误')
    return false
  }
  // 没有节点
  if(!this.length) {
    this.head = newNode
    this.tail = newNode
  } else {
    // if较细，是为了避免在同一个判断中又有各种判断
    if(position === 0) {
      this.head.prev = newNode
      newNode.next = this.head  
      this.head = newNode
    } else if(position === this.length) {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    } else {
      let index = 0
      let current = this.head
      while(index++ < position) {
        current = current.next
      }
      newNode.next = current
      newNode.prev = current.prev
      current.prev.next = newNode
      current.prev = newNode
      
    }
  }
  this.length += 1
  return true
}
// 获取
DoublyLinkedList.prototype.get = function(position) {
  if(position < 0 || position >= this.length) {
    return null
  }
  let current = null
  let center = Math.floor(this.length / 2)
  if(position > center) {
    let index = this.length - 1
    current = this.tail
    while(index-- > position) {
      current = current.prev
    }
  } else {
    let index = 0
    current = this.head
    while(index++ < position) {
      current = current.next
    }
  }
  return current.data
}
DoublyLinkedList.prototype.indexOf = function(data) {
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
DoublyLinkedList.prototype.update = function(data, position) {
  if(position < 0 || position >= this.length) {
    console.error('更新位置有误')
    return false
  }
  let current
  let center = Math.floor(this.length / 2)
  if(position > center) {
    let index = this.length - 1
    current = this.tail
    while(index-- > position) {
      current = current.prev
    }
  } else {
    let index = 0
    current = this.head
    while(index++ < position) {
      current = current.next
    }
  }
  current.data = data
  return data
}
// 按位置删除
DoublyLinkedList.prototype.removeAt = function(position) {
  if(position < 0 || position >= this.length) {
    return null
  }
  let current = this.head
  // 只有一个节点
  if(this.length === 1) {
    this.head = null
    this.tail = null
  } else {
    if (position === 0) {
      this.head = this.head.next
      this.head.prev = null
    } else if (position === this.length - 1) {
      current = this.tail
      this.tail = this.tail.prev
      this.tail.next = null
    } else {
      let center = Math.floor(this.length / 2)
      if(position > center) {
        let index = this.length - 1
        current = this.tail
        while(index-- > position) {
          current = current.prev
        }
      } else {
        let index = 0
        while(index++ < position) {
          current = current.next
        }
      }
      current.prev.next = current.next
      current.next.prev = current.prev
    }
  }
  this.length -= 1
  return current.data
}
DoublyLinkedList.prototype.remove = function(data) {
  const index = this.indexOf(data)
  return this.removeAt(index)
}
// 获取第一个节点
DoublyLinkedList.prototype.getHead = function() {
  return this.head.data
}
// 获取最后一个节点
DoublyLinkedList.prototype.getTail = function() {
  return this.tail.data
}
// 向前遍历
DoublyLinkedList.prototype.forwardString = function() {
  let str = ''
  let current = this.tail
  while(current) {
    str = str + current.data + ' '
    current = current.prev
  }
  return str
}
// 向后遍历
DoublyLinkedList.prototype.backwordString = function() {
  let str = ''
  let current = this.head
  while(current) {
    str = str + current.data + ' '
    current = current.next
  }
  return str
}

// 判断链表是否为空
DoublyLinkedList.prototype.isEmpty = function() {
  return !this.length
}

// 获取链表中元素个数
DoublyLinkedList.prototype.size = function() {
  return this.length
}

// 获取链表中元素个数
DoublyLinkedList.prototype.toString = function() {
  return this.backwordString()
}


var a = new DoublyLinkedList()
a.append('aaa')
a.append('bbb')
a.insert('ccc', 0)
a.insert('ddd', 3)
console.log(a.toString())
// console.log(a.get(2), a.size())
// console.log(a.indexOf('aaa'))
// a.update('ddd', 0)
// console.log(a.toString())
// console.log(a.removeAt(0).data, a.toString())
exports.DoublyLinkedList = DoublyLinkedList