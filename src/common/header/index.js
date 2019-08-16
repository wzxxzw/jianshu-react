import React, { Component } from 'react';
import {connect} from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import * as actionCreators  from './store/actionCreators.js';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	NavSearch,
	Addition,
	Button,
	SearchWrapper,
	SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoList,
	SearchInfoItem
} from './style'
class Header extends Component {
		// 聚焦显示下拉
		getList = () =>{
			const {focused, list, mouseIn, mouseLeave, mouseEnter, page, totalPage, handleChangePage} =this.props
			const newList = list.toJS();
			const pageList = [];
			if(newList.length){
				for(let i = (page-1)*10; i < page*10; i++) {
					pageList.push(<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>)
				}
			}
			if (focused || mouseIn) {
				return (
				<SearchInfo 
				onMouseEnter={mouseEnter} 
				onMouseLeave= {mouseLeave} >
				<SearchInfoTitle>
					热门搜索
					<SearchInfoSwitch onClick={handleChangePage(page)}>
						换一批
					</SearchInfoSwitch>
				</SearchInfoTitle>
				<SearchInfoList>
					{pageList}
				</SearchInfoList>
			</SearchInfo>
				)
			} else {
				return null
			}
		}
    render() { 
			const {focused, inputFocus, inputBlur} =this.props
			return (
				<HeaderWrapper>
					<Logo></Logo>
					<Nav>
					   <NavItem className='left'>首页</NavItem>
						 <NavItem className='left'>下载App</NavItem>
						 <NavItem className='right'>Aa</NavItem>
						 <NavItem className='right'>登录</NavItem>
						 <SearchWrapper>
						 <CSSTransition
							in={focused}
							timeout={200}
							classNames="slide">
								<NavSearch 
								   className={focused ? "focused" : ""} 
								   onFocus={inputFocus}
									 onBlur={inputBlur}></NavSearch>
              </CSSTransition>
							<i className= {focused ? "iconfont zoom focused" : "iconfont zoom"}>&#xe62a;</i>
							{this.getList()}
						 </SearchWrapper>
					</Nav>
					<Addition>
						<Button className='reg'>注册</Button>
						<Button className='writting'>
							<i className='iconfont'>&#xe624;</i>
							写文章
						</Button>
					</Addition>
				</HeaderWrapper>
			);
		};
}
const mapStateToProps = (state) => {
	return {
		focused: state.getIn(['header','focused']),
		list: state.getIn(['header', 'list']),
		mouseIn: state.getIn(['header', 'mouseIn']),
		page: state.getIn(['header', 'page']),
		totalPage: state.getIn(['header', 'totalPage']),
	}
}
const mapDispatchToProps = (dispatch) => {
  return{
		inputFocus() {
			dispatch(actionCreators.searchFocus())
			dispatch(actionCreators.getHeaderList())
		},
		inputBlur() {
		  dispatch(actionCreators.searchBlur())
		},
		mouseEnter() {
			dispatch(actionCreators.mouseIn())
		},
		mouseLeave() {
			dispatch(actionCreators.mouseOut())
		},
		handleChangePage(page) {
			dispatch(actionCreators.changePage(page+1))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);