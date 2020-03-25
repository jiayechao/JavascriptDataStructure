Array.prototype.bubleSort = function() {
  let a = [].concat(this)
  for(let i = 0;i<a.length - 1; i++) {
    let tag = true
    for(let j = 0; j < this.length - i - 1; j++) {
      if(a[j] > a[j+1]){
        let tmp = a[j + 1]
        a[j+1] = a[j]
        a[j] = tmp
        tag = false
      }
    }
    if(tag) {
      break
    }
    
    console.log(a)
  }
  return a
}

a = [16,2,7]

console.log(a.bubleSort())