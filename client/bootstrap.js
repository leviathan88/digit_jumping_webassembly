import { digitJumpingOptimized, digitJumpingUnoptimized } from './digitJumping'
import { measureSpeed } from './util'
import { start, finish, grid } from './data'

import { LoadingComponent, removeLoading, TitleComponent } from './elements'

const root = document.body
m.mount(root, LoadingComponent)

import ('./index').then(res => {
  removeLoading()

  const App = {
    view: () => m('div',
      { id: 'main-container'},
      m(TitleComponent),
    )
  }

  m.mount(root, App)

  
  // console.log('JS -> digitJumpingUnoptimized()')
  // console.log(measureSpeed(digitJumpingUnoptimized, grid, start, finish))
  // console.log('')

  // console.log('JS -> digitJumpingOptimized()')
  // console.log(measureSpeed(digitJumpingOptimized, grid, start, finish))
  // console.log('')
  
  // console.log('RUST -> digit_jumping_unomptimized()')
  // console.log(measureSpeed(res.digit_jumping_unomptimized, grid, start, finish))
  // console.log('')

  // console.log('RUST -> digit_jumping_optimized()')
  // console.log(measureSpeed(res.digit_jumping_optimized, grid, start, finish))
})
