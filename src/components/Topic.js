import React from 'react'
import axios from 'axios'
import {url} from '../config'
import { message, Card, BackTop, Avatar, Input, Button, Icon, Modal } from 'antd';
import moment from 'moment';

class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data: null,
			comment: '',
			reply:'',
			visible: false,
			replyInfo: null
		}
	}
	getData(){
		let id = this.props.match.params.id;
		axios.get(`${url}/topic/${id}`)
			.then(res=> this.setState({data: res.data.data}))
			.catch(err=> message.error('数据请求失败'))
	}
	componentDidMount(){
		this.getData()
	}
	handleComment(type){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		if (type==='comment') {
			var content = this.state.comment;
		}else{
			var content = this.state.reply;
		}
		let data = {accesstoken, content }
		let id = this.state.data.id;
		axios.post(`${url}/topic/${id}/replies`, data)
			.then(res=> {
				this.setState({comment: ''})
				this.getData()
				if (type==='reply') this.setState({visible: false});
			})
			.catch( err => message.error('评论失败'))
	}
	showReply(reply){
		// console.log(reply)
		this.setState({visible: true, replyInfo: reply, reply: `@${reply.author.loginname} `})
	}
	render(){
		let {data, comment, visible, reply, replyInfo} = this.state
		// console.log(data)
		return(
			<div style={{padding:'10px'}}>
				<Card loading={!data}>
					{
						data ? (
							<div>
								<h1 style={{textAlign: 'center'}}>{data.title}</h1>
								<div className='topic-desc'>
									<Avatar src={data.author.avatar_url}/>
									<span>回复量：{data.reply_count}</span>
									<span>阅读量：{data.visit_count}</span>
								</div>
								<div dangerouslySetInnerHTML={{__html: data.content}} className='topic-wrap'/>

								<h1>发表评论：</h1>
								<Input type="textarea" rows={4} value={comment} onChange={e=>this.setState({comment: e.target.value})} placeholder='留下您的评论' />
								<Button type='primary' onClick={this.handleComment.bind(this, 'comment')}>提交</Button>

								<h1>全部回复：</h1>
								{
									data.replies.map(item=>(
										<div className='comments' key={item.id}>
											<Avatar src={item.author.avatar_url} />
											<div className='comments-right'>
												<div className='comments-header'>
													<span>{item.author.loginname}·{moment(item.create_at).fromNow()}</span>
													<span>
														<Icon type="like" />{item.ups.length}&nbsp;&nbsp;
														<Icon type="message" onClick={this.showReply.bind(this, item)}/>
													</span>
												</div>
												<div dangerouslySetInnerHTML={{__html: item.content}} />
											</div>
										</div>
									))
								}
							</div>
						) : null
					}
				</Card>
				<Modal
          title={replyInfo? `回复：${replyInfo.author.loginname}` : '回复：'}
          visible={visible}
          onOk={this.handleComment.bind(this,'reply')}
          onCancel={()=>this.setState({visible: false})}
        >
          <Input type="textarea" rows={4} value={reply} onChange={e=>this.setState({reply: e.target.value})} placeholder='留下您的评论' ref={input=> this.input = input}/>
        </Modal>
				<BackTop />
			</div>
		)
	}
}

export default Topic