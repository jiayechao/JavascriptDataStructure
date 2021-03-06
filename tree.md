## 树的概念

任何树欧能转变成二叉树

### 完全二叉树
完全二叉树(除了叶子，都是满节点，并且叶子连续，只缺少右侧)

完美二叉树就是满节点的完全尔察使

### 二叉搜索树（binary search tree - BST）

1. 非空左子树所有键值小于根节点
2. 非空右子树所有键值大于根节点
3. 左右子树本身也是二叉搜索树


## 树的储存

### 数组

完全二叉树通过从左向右，从上到下的顺序储存，如果是左节点，就是 父节点 * 2，如果是右节点，就是 父节点 * 2 + 1


### 链表

常用的储存方式

## 树的遍历

1. 先序遍历
2. 中序遍历
3. 后序遍历

## 平衡树，红黑树

### 红黑树特点
1. 节点是红色或者黑色
2. 根节点是黑色
3. 每个叶子节点都是黑色的空节点（NIL）
4. 每个红色节点的两个子节点都是褐色（即不能有连续的两个红色）
5. 从任意节点到其每个叶子的所有路径包含相同数目的黑色节点

### 相对平衡的关键特征
从根到叶子的最长路径不会超过最短路径的两倍

### 平衡方式
1. 换色
2. 左旋转
3. 右旋转

### 插入节点
1. 插入节点默认是红色，因为只有红色才可能不影响红黑树的规则，如果是黑色，某一路径上就会多出一个黑色，必然影响红黑树的规则
2. 红黑树的插入我们分5种情况
   1. 空树
   2. 插入节点的父节点是黑色
   3. 插入节点的父节点是红色，父节点的兄弟节点也是红色 -> 父节点变黑色,节点的兄弟节点也变黑色，祖父节点变红色，然后将父节点作为插入节点考虑
   4. 插入节点是左子节点，并且其父节点是红色，父节点的兄弟节点是黑色 -> 父变黑，祖变红，以父节点为根右旋转
   5. 插入节点是右子节点，并且其父节点是红色，父节点的兄弟节点是黑色 -> 以父节点为跟左旋转，将父节点作为插入节点考虑

![红黑树逐步分解](./tree1.jpg)
![红黑树逐步分解](./tree2.jpg)