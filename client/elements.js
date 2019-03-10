import { BIG_DATA, SMALL_DATA, MEDIUM_DATA } from './data'
import { measureSpeed } from './util';

export let State = {
  testData: SMALL_DATA,
  inferiorJS: {
    result: 'NA',
    seconds: 'NA',
    milliseconds: 'NA'
  },
  superiorJS: {
    result: 'NA',
    seconds: 'NA',
    milliseconds: 'NA'
  },
  inferiorRust: {
    result: 'NA',
    seconds: 'NA',
    milliseconds: 'NA'
  },
  superiorRust: {
    result: 'NA',
    seconds: 'NA',
    milliseconds: 'NA'
  }
}

const GRID_STYLE = {
  display: 'grid',
  justifyItems: 'center'
}

export const LoadingComponent = {
  view: () => m('div.loading-container', m('h1.loading-img'))
}

export function removeLoading() {
  const loading = document.getElementsByClassName('loading-container')
  loading.style.display = 'none'
}

export const TitleComponent = {
  view: () => m('h1', 'Rust vs Javascript')
}

export const DescriptionComponent = {
  view: () => m('div', {
    style: {
      display: 'flex'
    }
  }, [
    m('h2', 'Testing Webassembly by solving CodeSignal Programming Challenges'),    
    m("a.codesignal-logo", {target:"_blank", rel:"noopener noreferrer", href:'https://app.codesignal.com/profile/leviathanbeak'})
  ])
}

export const ChallengeDescriptionComponent = {
  view: () => m('div.description-container', [
    m('p', {style: {fontWeight: 'bold'}}, 'Digit Jumping'),
    m('p', 'Facing his first challenge, Ratiorg is placed at the start position of a rectangular grid filled with digits from 0 to 9. With each move, Ratiorg can either jump to the adjacent cell (the one above, below, to the left or to the right of his current position), or teleport to any cell that has number x written on it, where x is the number written on the cell Ratiorg is currently standing on. Ratiorg will be able to move on to the next challenge if he manages to get to the finish cell in the minimum possible number of moves.'),
    m('p', "Although the little bot is sure that he can handle the challenge, you don't want to leave him alone! Back Ratiorg up by implementing a function that given the grid, start and finish, will calculate the minimum number of moves required to get from start to finish."),
  ])
}

export const ChallengeDataDropdownComponent = {
  view: () => m('div', {
    style: GRID_STYLE
  }, [
    m('h2', 'Choose Test Data'),
    m('select', {      
      placeholder: 'select Test Data', 
      style: {minWidth: '150px'},
      onchange: ({ target }) => chooseTestData(target.value)
    }, [
      m('option', 'Small'),
      m('option', 'Medium'),
      m('option', 'BIG'),
    ])
  ])
}

export const ChallengeDataInfoComponent = {
  view: vnode => m('div.challenge-data-info-container', {
    style: GRID_STYLE
  }, [
    m('h2', `Test Data Info`),
    m('div.info-container', [
      m('div', [
        m('p.item-name', `Start Coordinate`),
        m('p.item-value', `[${vnode.attrs.data.start[0]}, ${vnode.attrs.data.start[1]}]`),
      ]),
      m('div', [
        m('p.item-name', `Finish Coordinate`),
        m('p.item-value', `[${vnode.attrs.data.finish[0]}, ${vnode.attrs.data.finish[1]}]`),
      ]),
      m('div', [
        m('p.item-name', `Grid Size`),
        m('p.item-value', `${vnode.attrs.data.grid.length} x ${vnode.attrs.data.grid[0].length}`),
      ]),
      m('div', [
        m('p.item-name', `Expected Result`),
        m('p.item-value', `${vnode.attrs.data.result}`),
      ]),
    ])
  ])
}

export const TestItem = {
  view: vnode => m('div.test-item', [
    m('p.item-header', 'Name'),
    m('p.item-value', {style: {color: vnode.attrs.color}}, `${vnode.attrs.name}`),

    m('p.item-header', 'Result'),
    m('p.item-value', {style: {color: vnode.attrs.color}}, `${vnode.attrs.result}`),

    m('p.item-header', 'Seconds'),
    m('p.item-value', {style: {color: vnode.attrs.color}}, `${vnode.attrs.seconds}`),

    m('p.item-header', 'Miliseconds'),    
    m('p.item-value', {style: {color: vnode.attrs.color}}, `${vnode.attrs.milliseconds}`),

    m('button.test-button', { onclick: _ => handleTestMe(vnode.attrs.stateProp, vnode.attrs.test)}, 'Test Me' )
  ])
}

// STATE HANDLERS
function chooseTestData(value) {
  const newData = value === 'Small' ? SMALL_DATA : (value === 'Medium' ? MEDIUM_DATA : BIG_DATA)
  State = Object.assign({}, State, { testData: newData })
}

function handleTestMe(prop, test) {
  const { grid, start, finish } = State.testData  
  const measure = measureSpeed(test, grid, start, finish)
  const { result, timeInMiliseconds, timeInSeconds } = measure
  
  State = Object.assign({}, State, { [prop]: { result, milliseconds: timeInMiliseconds, seconds: timeInSeconds } })
  
  
}