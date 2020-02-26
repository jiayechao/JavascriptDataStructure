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
// 先序遍历，这里我们要能充分理解递归，也就是栈的使用
BinarySearchTree.prototype.preOrderTraversal = function() {
  // 我们需要一个递归的遍历
  BinarySearchTree.preOrderTraversalNode(this.root, handle)
}
// 中序遍历
BinarySearchTree.prototype.midOrderTraversal = function() {
  // 我们需要一个递归的遍历
  BinarySearchTree.midOrderTraversalNode(this.root, handle)
}
// 后序遍历
BinarySearchTree.prototype.nextOrderTraversal = function() {
  // 我们需要一个递归的遍历
  BinarySearchTree.nextOrderTraversalNode(this.root, handle)
}
// 最小值
BinarySearchTree.prototype.getMin = function() {
  let node = this.root
  while(node.left) {
    node = node.left
  }
  return node.key
}
// 最大值
BinarySearchTree.prototype.getMax = function() {
  let node = this.root
  while(node.right) {
    node = node.right
  }
  return node.key
}

// 查找
BinarySearchTree.prototype.search = function(key) {
  let node = this.root
  // 循环写法
  while(node !== null) {
    if(node.key === key) {
      return true
    } else if(key > node.key) {
      node = node.right
    } else {
      node = node.left
    }
  }
  return false
}

/**
 * 删除操作
 * 1. 找到节点
 * 2. 是否叶子节点
 * 3. 是否一个子节点
 * 4. 两个子节点
 */
BinarySearchTree.prototype.remove = function(key) {
  let currentNode = this.root
  let parentNode
  let direct
  while(currentNode.key !== key) {
    parentNode = currentNode
    if(key > currentNode.key) {
      direct = 'right'
      currentNode = currentNode.right
    } else {
      direct = 'left'
      currentNode = currentNode.left
    }
    // 如果没找到
    if(currentNode === null) {
      return null
    }
  }
  /**
   * 这里就是找到了，分三种情况
   * 1. 叶子节点
   * 2. 只有一个分支的节点
   * 3. 有两个分支的节点
   */
  if(currentNode.left === null && currentNode.right === null) {
    if(currentNode === this.root) {
      this.root = null
    } else {
      parentNode[direct] = null
    }
    return currentNode.key
  }
  // 只有一个叶子节点, 右子节点
  if(currentNode.left === null && currentNode.right !== null) {
    if(currentNode === this.root) {
      this.root = currentNode.right
    } else {
      parentNode[direct] = currentNode.right
    }
    return key
  }
  // 只有一个叶子节点, 左子节点
  if(currentNode.left !== null && currentNode.right === null) {
    if(currentNode === this.root) {
      this.root = currentNode.left
    } else {
      parentNode[direct] = currentNode.left
    }
    return key
  }
  // 有两个节点
  /**
   * 规律就是找前驱和后继，
   */
  if(currentNode.left !== null && currentNode.right !== null) {
    // 1. 获取后记
    const successor = BinarySearchTree.getSuccssor(key)
    // 2. 是不是一个根
    if(currentNode === this.root) {
      // 将指针调整 -> 这里有特殊情况，请搜索 note1
      this.root = successor
    } else {
      // 将要删除节点的父节点的direct方向指向后继
      parentNode[direct] = successor
    }
    // 后继的左节点指向要删除节点的左节点
    successor.left = currentNode.left
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
// 递归先序遍历
BinarySearchTree.preOrderTraversalNode = function(node,handle) {
  // 先判断这个节点是不是null
  if(node !== null) {
    handle(node.key) // 对key做操作
    // 然后我们转到树的左节点
    /**
     * -> 11
     * -> 7
     * -> 5
     * -> 3
     * 到这里node.left就是null了，如果我们不做操作，刚才递归的函数就开始出栈，又回到3，5，7，11
     * 但是我们希望他又去遍历3的右节点，所以我们将右节点同样压入栈
     * 这样我们的执行就是
     * 11 右遍历
     * 7 右遍历
     * 5 右遍历
     * 3 右遍历
     * 到这里回去上一个栈里面的右遍历，为空，继续回到5右，还空，就是7的右遍
     * 9
     * 8
     * 10
     * 。。。
     * 
     */
    // 左子节点
    BinarySearchTree.preOrderTraversalNode(node.left, handle)
    // 右子节点
    BinarySearchTree.preOrderTraversalNode(node.right, handle)
  }
}

// 中序遍历
/**
  * 11 操作，右遍历
  * 7 操作，右遍历
  * 5 操作，右遍历
  * 3 操作，右遍历
  * 到这里回去上一个栈里面，操作（输出3）,右遍历没有，到5，输出，右遍历，到7，输出7，然后右遍历
  * 右遍历又是一个递归，输出8，9，10
  * 。。。
 */
BinarySearchTree.midOrderTraversalNode = function(node,handle) {
  if(node !== null) {
    // 中序遍历我们是从最左节点开始，所以操作也要是从最左开始
    BinarySearchTree.midOrderTraversalNode(node.left, handle)
    handle(node.key)
    BinarySearchTree.midOrderTraversalNode(node.right, handle)
  }
}
// 后序遍历
/**
  * 11 右遍历, 操作
  * 7 右遍历, 操作
  * 5 右遍历, 操作
  * 3 右遍历, 操作
  * 到这里回去上一个栈里面，右遍历没有，操作（输出3）,到5，右遍历没有，输出5，到7，然后右遍历，
  * 右遍历又是一个递归，输出8，10，9
  * 。。。
 */
BinarySearchTree.nextOrderTraversalNode = function(node,handle) {
  if(node !== null) {
    // 后序遍历我们是从最左节点开始，所以操作handle也要是从最左开始，但是操作是在最后
    BinarySearchTree.nextOrderTraversalNode(node.left, handle)
    BinarySearchTree.nextOrderTraversalNode(node.right, handle)
    handle(node.key)
  }
}

// 找后继
BinarySearchTree.getSuccssor = function(delNode) {
  let successor = deNode
  let currentNode = delNode.right // 删除节点的右节点
  let successorParent = delNode
  // 循环查找
  while(currentNode.left) {
    successorParent = currentNode
    successor = currentNode.left
    currentNode = currentNode.left
  }

  // note1 后继不等于 要删除的节点 的右节点
  if(successor !== delNode.right) {
    // 同时原来后继节点的右节点（不考虑左节点，因为如果有左节点，那这后继就是错的）变成了后继父节点的左节点
    successorParent.left = successor.right
    // 后继节点的右节点要指向删除节点的右节点
    successor.right = delNode.right
  }
  successor.right = currentNode.right
  return successor
}

const tree = new BinarySearchTree()

let str = ''
const handle = function(key) {
  str += key + ' '
  return str
}

tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
console.log(JSON.stringify(tree))
// tree.preOrderTraversal()
// tree.midOrderTraversal()
// tree.nextOrderTraversal()
// console.log(str)
console.log(tree.getMin())
console.log(tree.getMax())
console.log(tree.search(20))
tree.remove(7)
tree.midOrderTraversal()
console.log(str)