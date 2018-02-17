import deepFreeze from 'deep-freeze'
import uniReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    hyva: 0,
    neutraali: 0,
    huono: 0
  }

  it('should return with default state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = uniReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('hyva is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = uniReducer(state, { type: 'HYVA'} )
    expect(newState).toEqual({
      hyva: 1,
      neutraali: 0,
      huono: 0
    })
  })
})