import React from 'react'
import axios from 'axios'
import {url} from '../config'
import { message, Card, BackTop, Avatar, Input, Button, Icon, Modal } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data: null,
			comment: '',
			reply:'',
			visible: false,
			replyInfo: null,
			collect: false
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
		if (this.props.user.accesstoken) {
			var accesstoken = this.props.user.accesstoken
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
	handleLike(reply_id){
		if (this.props.user.accesstoken) {
			var accesstoken = this.props.user.accesstoken
		}else{
			alert('请先登录')
			return
		}
		axios.post(`${url}/reply/${reply_id}/ups`, {accesstoken})
			.then( res => this.getData() )
			.catch( err => message.error('评论失败'))
	}
	handleCollect(){
		let id = this.props.match.params.id;
		if (this.props.user.accesstoken) {
			var accesstoken = this.props.user.accesstoken
		}else{
			alert('请先登录')
			return
		}
		axios.post(`${url}/topic_collect/collect`, {accesstoken, topic_id: id})
			.then(res => {this.setState({collect: true});message.success('收藏成功')})
			.catch(err => message.error('请求失败'))
	}
	render(){
		let {data, comment, visible, reply, replyInfo, collect} = this.state
		// console.log(data)
		let tabs = {
			ask: '问答',
			job: '招聘',
			share: '分享'
		}
		return(
			<div style={{padding:'10px'}}>
				<Card loading={!data} title={data? `分类：${tabs[data.tab]}` : null} extra={this.props.user.isLogin?<Button type="primary" onClick={this.handleCollect.bind(this)}>{collect? '已收藏' : '收藏'}</Button>:null}>
					{
						data ? (
							<div>
								<h1 style={{textAlign: 'center'}}>{data.title}</h1>
								<div className='topic-desc'>
									<Link to={`/user/${data.author.loginname}`}><Avatar src={data.author.avatar_url}/></Link>
									<span>回复量：{data.reply_count}</span>&nbsp;&nbsp;
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
											<Link to={`/user/${item.author.loginname}`}><Avatar src={item.author.avatar_url} /></Link>
											<div className='comments-right'>
												<div className='comments-header'>
													<span>{item.author.loginname}·{moment(item.create_at).fromNow()}</span>
													<span>
														{ !this.props.user.isLogin ?
															<Icon type="like-o" onClick={this.handleLike.bind(this, item.id)}/> : item.ups.indexOf(this.props.user.user.id)>0 ?
															<Icon type="like" onClick={this.handleLike.bind(this, item.id)}/> :
															<Icon type="like-o" onClick={this.handleLike.bind(this, item.id)} />
														}{item.ups.length}&nbsp;&nbsp;
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
let getUser = ({user}) => ({user})

export default connect(getUser)(Topic)
