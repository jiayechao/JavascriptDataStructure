/**
 * es6中已经有集合的概念，即Set，可以直接使用。
 * 但是我们还是用es5实现一下
 * 特点： 1. 集合中的元素不重复， 2. 无序，也就是说不能通过下表获取
 * 
 * 以下实现并没有严格考虑兼容性，只是一个简单的实现。
 */

 function Set() {
   this.items = {}
 }
 // 添加
 Set.prototype.add = function(data) {
   this.items[data] = data
   return true
 }
 // 删除
 Set.prototype.delete = function(data) {
   if(!this.has(data)) {
     return false
   }
   delete this.items[data]
   return true
 }
 // 是否含有
 Set.prototype.has = function(data) {
   return this.items.hasOwnProperty(data)
 }
 // 清空
 Set.prototype.clear = function() {
   this.items = {}
 }
 // 长度
 Set.prototype.size = function() {
   return Object.values(this.items).length
 }
 // 值
 Set.prototype.values = function() {
  return Object.values(this.items)
 }
 // 并集
 Set.prototype.union = function(otherSet) {
   const unionSet = new Set()
   const otherValues = otherSet.values()
   const thisValues = this.values()
   for(let i = 0; i < otherValues.length; i++) {
    unionSet.add(i)
   }
   for(let i = 0; i < thisValues.length; i++) {
    unionSet.add(i)
   }
   return unionSet
 }
 // j交集
 Set.prototype.intersection = function(otherSet) {
  const intersectionSet = new Set()
  const values = otherSet.values()
  for(let i = 0; i < values.length; i++) {
    if(this.has(i)) {
      intersectionSet.add(i)
    }
  }
}
// 差集
Set.prototype.difference = function(otherSet) {
  const differencenSet = new Set()
  const values = otherSet.values()
  for(let i = 0; i < values.length; i++) {
    if(!this.has(i)) {
      differencenSet.add(i)
    }
  }
}

// 子集
Set.prototype.isSuperset = function(otherSet) {
  const values = otherSet.values()
  for(let i = 0; i < values.length; i++) {
    if(!this.has(i)) {
      return false
    }
  }
  return true;
}

exports.Set = Set