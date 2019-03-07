import { digitJumpingOptimized, digitJumpingUnoptimized } from './digitJumping'
import { measureSpeed } from './util'
import { start, finish, grid } from './data'

import ('./index').then(res => {
  console.log('dont tell me im a dreamer')
  console.log(res)
  
  console.log('lets check digit jumping')
  console.log('')
  
  console.log('JS -> digitJumpingUnoptimized()')
  console.log(measureSpeed(digitJumpingUnoptimized, grid, start, finish))
  console.log('')

  console.log('JS -> digitJumpingOptimized()')
  console.log(measureSpeed(digitJumpingOptimized, grid, start, finish))
  console.log('')
  
  console.log('RUST -> digit_jumping_unomptimized()')
  console.log(measureSpeed(res.digit_jumping_unomptimized, grid, start, finish))
  console.log('')

  console.log('RUST -> digit_jumping_optimized()')
  console.log(measureSpeed(res.digit_jumping_optimized, grid, start, finish))
})
