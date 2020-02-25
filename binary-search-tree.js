/**
 * 二叉搜索树的封装
 */

function BinarySearchTree() {
  this.root = null
  this.createNode = function(key) {
    return {
      key: key,
      left: null,
      right: null
    }
  }
}

// 插入
BinarySearchTree.prototype.insert = function(key) {
  const newNode = this.createNode(key)

  if(this.root === null) {
    this.root = newNode
  } else {
    BinarySearchTree.insertNode(this.root, newNode)
  }
}

// 递归插入
BinarySearchTree.insertNode = function(node, newNode) {
  if( newNode.key > node.key) {
    if(node.right === null) {
      node.right = newNode
    } else {
      return BinarySearchTree.insertNode(node.right, newNode)
    }
  } else {
    if(node.left === null) {
      node.left = newNode
    } else {
      return BinarySearchTree.insertNode(node.left, newNode)
    }
  }
}


const tree = new BinarySearchTree()

tree.insert(10)
tree.insert(11)
tree.insert(16)
tree.insert(14)
console.log(tree)