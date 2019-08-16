import * as constants from './constants';
import { fromJS } from 'immutable';
const defaultState = fromJS({ 
	focused: false,
	list: [],
	mouseIn: false,
	page: 1,
	totalPage: 1
})

export default (state=defaultState, action) => {
	switch(action.type) {
		case  constants.SEARCH_FOCUS:
		  return state.set('focused', true)
		case constants.SEARCH_BLUR:
			return state.set('focused', false)
		case constants.FOCUS_LIST:
			return state.set('list', action.data)
		case constants.MOUSE_IN:
			return state.set('mouseIn',true)
		case constants.MOUSE_OUT:
			return state.set('mouseIn', false)
		case constants.CHANGE_PAGE:
			return state.set('page', action.page)
		default:
			return state
	}
}