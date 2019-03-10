export function digitJumpingOptimized(grid, start, finish) {
  const format = (x,y) => `${x},${y}`
  const cal = (c1, c2) => Math.abs(c1 - c2)

  const startFinishDistance = cal(start[0], finish[0]) + cal(start[1], finish[1]) + 1
  const digits = new Map()
  const finishFormated = format(finish[0], finish[1])
  
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const startTempDistance = cal(start[0], x) + cal(start[1], y)
      if (startTempDistance <= startFinishDistance) {
        const digit = grid[x][y]
        const digitArr = digits.get(digit) || digits.set(digit, []).get(digit)
        digitArr.push([x,y])
      }      
    }
  }   

  const END = 'E'
  const [s1, s2] = start
  const added = new Map([[format(s1,s2), true]])
  const graph = [[s1,s2], END]
  
  let stepCount = 0
  
  while (graph.length) {
    const currentCoordinate = graph.shift()
    
    if (currentCoordinate === END) {
      if (graph.length) {
        stepCount++
        graph.push(END)
      }
      
    } else {
      const [x, y] = currentCoordinate      
      const formated = format(x,y)
      const connections = digits.get(grid[x][y])
      
      if (formated == finishFormated) return stepCount
      if (connections && connections.length) {
        for (const conn of connections) {
          const [x1, y1] = conn
          
          const f = format(x1, y1)
          if (!added.has(f)) {
            added.set(f, true)
            graph.push([x1, y1])
          }
        }
        connections.length = 0
      }

      const moves = [getGridValue(x, y+1), getGridValue(x, y-1), getGridValue(x+1, y), getGridValue(x-1, y)].filter(value => value !== false)
      
      for (const move of moves) {
        const [x1, y1] = move          
        const f = format(x1, y1)
        if (!added.has(f)) {
          added.set(f, true)
          graph.push([x1, y1])
        }
      }
    }    
  }

  function getGridValue(x,y) {
    if (grid[x] && grid[x][y] >= 0) {
      return [x,y]
    }
    return false
  }
  
  return 0
}

export function digitJumpingUnoptimized(grid, start, finish) {
  const format = (x,y) => `${x},${y}`

  
  const digits = new Map()
  const finishFormated = format(finish[0], finish[1])
  
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {      
      const digit = grid[x][y]
      const digitArr = digits.get(digit) || digits.set(digit, []).get(digit)
      digitArr.push([x,y])     
    }
  }   

  const END = 'E'
  const [s1, s2] = start
  const added = new Map([[format(s1,s2), true]])
  const graph = [[s1,s2], END]
  
  let stepCount = 0
  
  while (graph.length) {
    const currentCoordinate = graph.shift()
    
    if (currentCoordinate === END) {
      if (graph.length) {
        stepCount++
        graph.push(END)
      }
      
    } else {
      const [x, y] = currentCoordinate      
      const formated = format(x,y)
      const connections = digits.get(grid[x][y])
      
      if (formated == finishFormated) return stepCount
      if (connections && connections.length) {
        for (const conn of connections) {
          const [x1, y1] = conn
          
          const f = format(x1, y1)
          if (!added.has(f)) {
            added.set(f, true)
            graph.push([x1, y1])
          }
        }
        connections.length = 0
      }

      const moves = [getGridValue(x, y+1), getGridValue(x, y-1), getGridValue(x+1, y), getGridValue(x-1, y)].filter(value => value !== false)
      
      for (const move of moves) {
        const [x1, y1] = move          
        const f = format(x1, y1)
        if (!added.has(f)) {
          added.set(f, true)
          graph.push([x1, y1])
        }
      }
    }    
  }

  function getGridValue(x,y) {
    if (grid[x] && grid[x][y] >= 0) {
      return [x,y]
    }
    return false
  }
  
  return 0
}