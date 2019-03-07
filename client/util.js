export function measureSpeed(fn, ...args) {
  
  const start = performance.now()
  const result = fn(...args)
  const end = performance.now()

  const timeResult = end-start

  return {
    result,
    timeInSeconds: Math.floor((timeResult/1000)),
    timeInMiliseconds: timeResult.toFixed(3)
  }
}