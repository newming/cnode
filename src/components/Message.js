import React from 'react'
import {url} from '../config'
import axios from 'axios'
import {message, Spin} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'

class Message extends React.Component{
	constructor(){
		super()
		this.state={
			data: null
		}
	}
	componentDidMount(){
		let accesstoken = sessionStorage.accesstoken;
		if (accesstoken) {
			axios.get(`${url}/messages?accesstoken=${accesstoken}`)
				.then(res => this.setState({data: res.data.data}))
				.catch(err => message.error('数据请求失败'))
		}else{
			this.props.history.push('/')
		}
	}
	render(){
		let {data} = this.state
		console.log(data)
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

export default Message