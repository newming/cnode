import React from 'react'
import axios from 'axios'
import {url} from '../config'
import { Tabs, message, Button, BackTop } from 'antd';
const TabPane = Tabs.TabPane;

import ShowTopics from './ShowTopics'

class Home extends React.Component{
	constructor(){
		super()
		this.state={
			data: {
				all: {topics: [], page: 1},
				good: {topics: [], page: 1},
				ask: {topics: [], page: 1},
				share: {topics: [], page: 1},
				job: {topics: [], page: 1}
			},
			tab: 'all'
		}
	}
	getData(tab, page){
		axios.get(`${url}/topics?limit=20&tab=${tab==='all'?'':tab}&page=${page}`)
			.then(res=> {
				let newData = this.state.data;
				newData[tab].topics = [...newData[tab].topics, ...res.data.data];
				newData[tab].page = page;
				this.setState({data: newData})
			})
			.catch(err=> message.error('数据请求失败'))
	}
	componentDidMount(){
		this.getData('all', 1)
	}
	handleChange(key){
		this.setState({tab: key})
		// console.log(key)
		if (this.state.data[key].topics.length===0) {
			this.getData(key, 1)
		}else{
			return
		}
	}
	loadMore(tab){
		this.getData(tab, this.state.data[tab].page+1)
	}
	render(){
		// console.log(this.state.data)
		let {data, tab} = this.state
		return(
			<div>
				<Tabs defaultActiveKey="all" onChange={this.handleChange.bind(this)}>
			    <TabPane tab="全部" key="all">
			    	<ShowTopics data={data.all.topics}/>
			    </TabPane>
			    <TabPane tab="精华" key="good">
				    <ShowTopics data={data.good.topics}/>
			    </TabPane>
			    <TabPane tab="问答" key="ask">
				    <ShowTopics data={data.ask.topics}/>
			    </TabPane>
			    <TabPane tab="分享" key="share">
				    <ShowTopics data={data.share.topics}/>
			    </TabPane>
			    <TabPane tab="招聘" key="job">
			    	<ShowTopics data={data.job.topics}/>
			    </TabPane>
			  </Tabs>
				<Button type='primary' style={{width: '100%'}} onClick={this.loadMore.bind(this, tab)}>加载更多</Button>
				<BackTop />
			</div>
		)
	}
}
export default Home