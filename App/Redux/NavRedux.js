import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changePage: ['page']
})

export const NavTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  currentPage: ['login']
})

/* ------------- Reducers ------------- */

// request the data from an api
export const pageSwitch = (state, { page }) =>
  state.merge({ currentPage: page })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_PAGE]: pageSwitch
})
