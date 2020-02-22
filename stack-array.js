// 栈的特点就是能回溯方法的调用链，比如递归

function Stack() {
  this.items= []
}

// 进栈
Stack.prototype.push = function(ele) {
  this.items.push(ele)
}

// 出栈
Stack.prototype.pop = function() {
  return this.items.pop()
}

// 查看栈顶元素
Stack.prototype.peek = function() {
  return this.items(this.items.length - 1)
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