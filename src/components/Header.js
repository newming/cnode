import React from 'react'
import { Button, Modal, Input, message, Menu, Dropdown, Avatar, Badge } from 'antd'
import axios from 'axios'
import {connect} from 'react-redux';
import {login, logout} from '../store/action';
import {Link} from 'react-router-dom'

import {url} from '../config'

class Header extends React.Component{
	constructor(){
		super()
		this.state={
			visible: false,
			confirmLoading: false,
			input: '3f77acb1-d753-4393-b784-44913190e6a8',
			messageCount: 0
		}
	}
	handleOk(){
		this.setState({confirmLoading: true})
		let accesstoken = this.state.input.trim();
		axios.post(`${url}/accesstoken`, {accesstoken})
			.then(res => {
				message.success('登录成功')
				this.setState({
					visible: false,
					confirmLoading: false,
					input: ''
				})
				this.props.dispatch(login(res.data, accesstoken))
				this.getMessage(accesstoken)
			})
			.catch(err =>{
				message.error('登录失败，请重试')
				this.setState({confirmLoading: false, input: ''})
			})
	}
	getMessage(accesstoken){
		axios.get(`${url}/message/count?accesstoken=${accesstoken}`)
			.then(res=> this.setState({messageCount: res.data.data}))
			.catch(err=> console.log('message 获取失败'))
	}
	handleLogout(){
		this.props.dispatch(logout())
	}
	render(){
		let {visible, input, confirmLoading, messageCount} = this.state
		let {user, isLogin} = this.props.user;
		// console.log(this.props);
		const menu = !isLogin ? null : (
		  <Menu>
		    <Menu.Item>
		      <h3>{user.loginname}</h3>
		    </Menu.Item>
		    <Menu.Item>
		    	<Link to={`/user/${user.loginname}`}>个人中心</Link>
		    </Menu.Item>
		    <Menu.Item>
		    	<Link to="/message">消息中心</Link>
		    </Menu.Item>
		    <Menu.Item>
		    	<Link to="/collect">收藏中心</Link>
		    </Menu.Item>
		    <Menu.Item>
		    	<Link to="/newtopic">发布话题</Link>
		    </Menu.Item>
		    <Menu.Item>
		      <Button type="danger" onClick={this.handleLogout.bind(this)}>登出</Button>
		    </Menu.Item>
		  </Menu>
		)
		return(
			<header className='header'>
				<h1><Link to='/' style={{color: '#fff'}}>cnode</Link></h1>
				{
					isLogin ?
					<Dropdown overlay={menu}>
						<Badge count={messageCount}>
					    <Avatar src={user.avatar_url} />
					  </Badge>
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

let getUser = ({user}) => ({user});

export default connect(getUser)(Header)
