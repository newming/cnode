import React from 'react'
import axios from 'axios'
import {url} from '../config'
import { message, Card } from 'antd';

class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data: null
		}
	}
	componentDidMount(){
		let id = this.props.match.params.id;
		axios.get(`${url}/topic/${id}`)
			.then(res=> this.setState({data: res.data.data}))
			.catch(err=> message.error('数据请求失败'))
	}
	render(){
		let {data} = this.state
		console.log(data)
		return(
			<div style={{padding:'10px'}}>
				<Card loading={!data}>
					{
						data ? (
							<div>
								<h1>{data.title}</h1>
								<div>
									<img src={data.author.avatar_url} alt="avatar"/>
									<span>回复量：{data.reply_count}</span>
									<span>阅读量：{data.visit_count}</span>
								</div>
								<div dangerouslySetInnerHTML={{__html: data.content}}/>
							</div>
						) : null
					}
				</Card>
			</div>
		)
	}
}

export default Topic