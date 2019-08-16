import * as constants from './constants';
import axios from 'axios'  // 用axios做请求
import { fromJS } from 'immutable';

const getList = (data) => {
	return {
			type: constants.FOCUS_LIST,
			data: fromJS(data),
	}
}
export const searchFocus = () => {
  return {
    type: constants.SEARCH_FOCUS
  }
}

export const searchBlur = ()=>  {
	return {
			type: constants.SEARCH_BLUR
	}
}
export const mouseIn = () =>{
	return {
		 type: constants.MOUSE_IN
	}
}
export const mouseOut =() =>{
	return {
		type: constants.MOUSE_OUT
	}
}
export const changePage =(page)=> {
	return {
		type: constants.CHANGE_PAGE,
		page
	}
}
export const getHeaderList = () => {
	return (dispatch) => {
		axios.get('/api/headerList.json')
		.then(res => {
			console.log(res)
			dispatch(getList(res.data.data))
		})
		.catch(() => {
			console.log('error')
		})
	}
}