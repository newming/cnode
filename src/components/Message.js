import React from 'react'
import {url} from '../config'
import axios from 'axios'
import {message, Spin, Button} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {connect} from 'react-redux';

class Message extends React.Component{
	constructor(){
		super()
		this.state={
			data: null
		}
	}
	markAll(){
		let accesstoken = this.props.user.accesstoken;
		axios.post(`${url}/message/mark_all`, {accesstoken})
			.then( res => console.log('标记全部为已读成功') )
			.catch( err => console.log('标记全部为已读失败') )
	}
	componentDidMount(){
		// 只要打开就标记全部为已读，但是要在请求所有消息列表后
		let accesstoken = this.props.user.accesstoken;
		if (accesstoken) {
			axios.get(`${url}/messages?accesstoken=${accesstoken}`)
				.then(res => {
					this.setState({data: res.data.data})
					this.markAll()
				})
				.catch(err => message.error('数据请求失败'))
		}else{
			this.props.history.push('/')
		}
	}
	render(){
		let {data} = this.state
		// console.log(this.props)
		return(
			<div style={{padding: '10px'}}>
				{
					data ? (
						<div>
							<h1>未读消息：</h1>
							{
								data.hasnot_read_messages.map(item=>(
									<p key={item.id}>
										{item.author.loginname}&nbsp;&nbsp;
										在文章
										<Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
										{item.type==='reply'? '回复' : '@'}了你
										<span style={{float: 'right'}}>{moment(item.create_at).fromNow()}</span>
									</p>
								))
							}
							<h1>已读消息：</h1>
							{
								data.has_read_messages.map(item=>(
									<p key={item.id}>
										{item.author.loginname}&nbsp;&nbsp;
										在文章
										<Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
										{item.type==='reply'? '回复' : '@'}了你
										<span style={{float: 'right'}}>{moment(item.create_at).fromNow()}</span>
									</p>
								))
							}
						</div>
					)
					:
					<div style={{textAlign: 'center'}}><Spin size='large'/></div>
				}
			</div>
		)
	}
}

let getUser = ({user}) => ({user});

export default connect(getUser)(Message)
