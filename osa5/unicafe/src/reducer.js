const defaultState = {
  hyva: 0,
  neutraali: 0,
  huono: 0
}

const uniReducer = (state = defaultState, action) => {
  let st = { ...state }
  switch (action.type) {
    case 'HYVA':
      st.hyva += 1
      return st
    case 'NEUTRAALI':
      st.neutraali += 1
      return st
    case 'HUONO':
      st.huono += 1
      return st
    case 'RESET':
      st = defaultState
      return st
  }
  return st
}
export default uniReducer