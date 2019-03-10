import './style.css'
import { digitJumpingOptimized, digitJumpingUnoptimized } from './digitJumping'

import { 
  LoadingComponent,
  TitleComponent,
  DescriptionComponent,
  ChallengeDescriptionComponent,
  ChallengeDataDropdownComponent,
  ChallengeDataInfoComponent,
  State,
  TestItem
} from './elements'

const root = document.getElementById('app')
m.mount(root, LoadingComponent)

import ('./index').then(res => {  

  const App = {
    view: () => m('div',
      { id: 'main-container'},
      m(TitleComponent),
      m(DescriptionComponent),
      m(ChallengeDescriptionComponent),
      m(ChallengeDataDropdownComponent),
      m(ChallengeDataInfoComponent, { data: State.testData }),
      m('div.item-container', [
        m(TestItem, { name: 'Javascript Inferior Alogrithm', color: '#fb75e9', test: digitJumpingUnoptimized, stateProp: 'inferiorJS', ...State.inferiorJS }),
        m(TestItem, { name: 'Javascript Superior Alogrithm', color: '#bf5fb2', test: digitJumpingOptimized, stateProp: 'superiorJS', ...State.superiorJS }),
        m(TestItem, { name: 'Rust Inferior Alogrithm', color: '#bf29aa', test: res.digit_jumping_unomptimized, stateProp: 'inferiorRust', ...State.inferiorRust }),
        m(TestItem, { name: 'Rust Superior Alogrithm', color: '#9a0085', test: res.digit_jumping_optimized, stateProp: 'superiorRust', ...State.superiorRust })
      ])
    )
  }

  m.mount(root, App)

})
