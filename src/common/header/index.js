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
	SearchInfoList
} from './style'
class Header extends Component {
		// 聚焦显示下拉
		getList = (show) =>{
			if (show) {
				return (
				<SearchInfo>
				<SearchInfoTitle>
					热门搜索
					<SearchInfoSwitch>
						换一批
					</SearchInfoSwitch>
				</SearchInfoTitle>
				<SearchInfoList>
				</SearchInfoList>
			</SearchInfo>
				)
			} else {
				return null
			}
		}
    render() { 
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
							in={this.props.focused}
							timeout={200}
							classNames="slide">
								<NavSearch 
								   className={this.props.focused ? "focused" : ""} 
								   onFocus={this.props.inputFocus}
									 onBlur={this.props.inputBlur}></NavSearch>
              </CSSTransition>
							<i className= {this.props.focused ? "iconfont zoom focused" : "iconfont zoom"}>&#xe62a;</i>
							{this.getList(this.props.focused)}
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
		focused: state.getIn(['header','focused'])
	}
}
const mapDispatchToProps = (dispatch) => {
  return{
		inputFocus() {
			dispatch(actionCreators.searchFocus())
		},
		inputBlur() {
		   dispatch(actionCreators.searchBlur())
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);