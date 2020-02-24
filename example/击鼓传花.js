/**
 * 几个朋友围坐一起，开始数数，当数到某个数字时被淘汰，最后剩下的人胜利，请问哪个人会胜利
 */

// const { Queue } = require('../queue-array')
const { Queue } = require('../queue-linkedlist')

function victory(nameList, target) {
  const queue = new Queue()
  nameList.forEach(item => {
    queue.enqueue(item)
  });

  while(queue.size() > 1) {
    // 将数字之前为淘汰的人从新进入队列
    for(let i = 0; i < target % nameList.length - 1; i++) {
      queue.enqueue(queue.dequeue)
    }
    // 淘汰的人出列
    queue.dequeue()
  }

  // 返回仅剩的人
  return queue.front()
}

console.log(victory(['a','b','c'], 7))