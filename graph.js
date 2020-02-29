const { Queue } = require('./queue-array') // 我们在遍历的时候使用
 
function Graph() {
  this.vertexes = [] // 顶点
  this.edges = new Map() // 边
}

/**
 * 针对图封装一些方法
 */
// 添加顶点
Graph.prototype.addVertex = function(v) {
  this.vertexes.push(v)
  this.edges.set(v, [])
}

// 添加边
Graph.prototype.addEdge = function(v1, v2) {
  this.edges.get(v1).push(v2)
  // 如果是有向图
  this.edges.get(v2).push(v1)
}

// toString
Graph.prototype.toString = function() {
  let str = ''
  for(let i = 0; i < this.vertexes.length; i++) {
    const edges = this.edges.get(this.vertexes[i])
    str = str + this.vertexes[i] + '=>' + edges.join(',')+'\n'
  }
  return str
}

/**
 * 顶点颜色的标识
 * 白色：未被访问过
 * 灰色：访问过但是没有被探索
 * 黑色：已经探索过
 */
Graph.prototype.initializeColor = function() {
  const colors = {}
  this.vertexes.forEach(function(item) {
    colors[item] = 'white'
  })
  return colors
}

/**
 * 遍历
 */
Graph.prototype.bfs = function(initVetex, handle) {
  // 1. 初始化颜色
  const colors = this.initializeColor()
  // 2. 创建一个队列
  const queue = new Queue()
  // 3. 将初始顶点推入队列
  queue.enqueue(initVetex)
  // 4. 遍历队列
  while(!queue.isEmpty()) {
    // 4.1 出队列
    const v = queue.dequeue()
    // 4.2 设置颜色
    colors[v] = 'gray'
    // 4.3 取出v的相连顶点
    const vList = this.edges.get(v)
    // 4.4 遍历这些顶点，将其推入队列
    vList.forEach(function(item) {
       // 防止重复推入，我们在推入之前设置颜色
      if(colors[item] === 'white') {
        colors[item] = 'gray'
        queue.enqueue(item)
      }
    })
    // 5. 操作顶点
    handle(v)
    // 6. 置黑
    colors[v] === 'black'
  }
}

Graph.prototype.dfs = function(initVetex, handle) {
  // 1. 初始化颜色
  const colors = this.initializeColor()
  // 从初始节点递归访问
  return this.deepfind(initVetex, colors, handle)

}

Graph.prototype.deepfind = function(v, colors, handle) {
  // 操作v
  handle(v)
  colors[v] = 'gray'
  // 拿到相连顶点
  const vList = this.edges.get(v)
  vList.forEach((item) => {
    if(colors[item] === 'white') {
      return this.deepfind(item, colors, handle)
    }
  })
  // 置黑
  colors[v] = 'black'
}

var graph = new Graph()
let str = ''
const handle = function(v) {
  str += v
}
const vertexes = ['A','B','C','D']
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addEdge('A','B')
graph.addEdge('A','C')
graph.addEdge('A','D') 
graph.addEdge('B','D')
graph.addEdge('C','D')

// graph.bfs('A', handle)
graph.dfs('A', handle)

console.log(graph.toString())

console.log(str)
