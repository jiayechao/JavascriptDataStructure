const { LinkedList } = require('./linked-list')

function Stack() {
  this.items = new LinkedList()
}

// 进栈
Stack.prototype.push = function(data) {
  this.items.append(data)
}

// 出栈
Stack.prototype.pop = function(data) {
  return this.items.removeAt(this.items.length - 1)
}

// 查看栈顶元素
Stack.prototype.peek = function() {
  return this.items.get(this.items.length - 1)
}

// 判断栈是否为空
Stack.prototype.isEmpty = function() {
  return !this.items.length
}

// 获取栈中元素个数
Stack.prototype.size = function() {
  return this.items.length
}

module.exports.Stack = Stack