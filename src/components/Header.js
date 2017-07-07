import React from 'react'
import { Button, Modal, Input, message, Menu, Dropdown, Avatar } from 'antd'
import axios from 'axios'

import {Link} from 'react-router-dom'

import {url} from '../config'

class Header extends React.Component{
	constructor(){
		super()
		this.state={
			isLogin: false,
			visible: false,
			confirmLoading: false,
			input: '3f77acb1-d753-4393-b784-44913190e6a8',
			user: null
		}
	}
	handleOk(){
		this.setState({confirmLoading: true})
		let accesstoken = this.state.input.trim();
		axios.post(`${url}/accesstoken`, {accesstoken})
			.then(res => {
				message.success('登录成功')
				this.setState({
					isLogin: true,
					visible: false,
					confirmLoading: false,
					input: '',
					user: res.data
				})
				sessionStorage.accesstoken = accesstoken
			})
			.catch(err =>{
				message.error('登录失败，请重试')
				this.setState({confirmLoading: false, input: ''})
			})
	}
	handleLogout(){
		this.setState({
			isLogin: false,
			user: null
		})
		sessionStorage.removeItem('accesstoken')
	}
	render(){
		let {isLogin, visible, input, confirmLoading, user} = this.state
		// console.log(user)
		const menu = !isLogin ? null : (
		  <Menu>
		    <Menu.Item>
		      <h3>{user.loginname}</h3>
		    </Menu.Item>
		    <Menu.Item>
		    	<a href="#">个人中心</a>
		    </Menu.Item>
		    <Menu.Item>
		      <Button type="danger" onClick={this.handleLogout.bind(this)}>登出</Button>
		    </Menu.Item>
		  </Menu>
		)
		return(
			<header className='header'>
				<h1><Link to='/'>cnode</Link></h1>
				{
					isLogin ?
					<Dropdown overlay={menu}>
				    <Avatar src={user.avatar_url} />
				  </Dropdown>
					:
					<div>
						<Button type="primary" onClick={()=>this.setState({visible: true})}>登录</Button>
						<Modal
		          title="登录"
		          visible={visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={()=>this.setState({visible: false})}
		          confirmLoading={confirmLoading}
		          cancelText='取消'
		          okText='登录'
		        >
		          <Input placeholder='accesstoken' value={input} onChange={e=>this.setState({input: e.target.value})}/>
		        </Modal>
					</div>
				}
			</header>
		)
	}
}
export default Header