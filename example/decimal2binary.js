// const { Stack } =  require('../stack-array')
const { Stack } =  require('../stack-linkedlist')

function decimal2binary(decimal) {
  const stack = new Stack()
  // 将模压入栈
  while(decimal > 0) {
    const model = decimal % 2
    stack.push(model)
    decimal = Math.floor(decimal/2)
  }
  let binary = ''
  // 出栈
  while(!stack.isEmpty()) {
    const pop = stack.pop()
    binary += pop
  }
  return binary
}

console.log(decimal2binary(100))