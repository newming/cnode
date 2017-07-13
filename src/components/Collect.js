import React from 'react';
import axios from 'axios';
import {url} from '../config';
import {connect} from 'react-redux';
import {Spin, Button, message} from 'antd';
import ShowTopics from './ShowTopics'
import {Link} from 'react-router-dom';

class Collect extends React.Component{
  constructor(){
    super()
    this.state={
      data: [],
      wait: true
    }
  }
  componentDidMount(){
    let loginname = this.props.user.user.loginname;
    axios.get(`${url}/topic_collect/${loginname}`)
      .then(res => {
        console.log(res);
        this.setState({
          wait: false,
          data: res.data.data
        })
      })
      .catch(err => message.error('请求失败'))
  }
  cancelCollect(topic_id){
    let accesstoken = this.props.user.accesstoken;
    axios.post(`${url}/topic_collect/de_collect`, {topic_id, accesstoken})
      .then(res => {
        this.setState({
          data: this.state.data.filter(item=>item.id!==topic_id)
        })
      })
      .catch(err => message.error('取消失败'))
  }
  render(){
    let {wait, data} = this.state;
    let tabs = {
      job: '招聘',
      ask: '问答',
      share: '分享'
    }
    return(
      <div style={{padding: '10px'}}>
        {
          wait ? <div style={{textAlign: 'center'}}><Spin size='large'/></div> :
          data.map(item=>(
            <div key={item.id} className='topic'>
              <img src={item.author.avatar_url} alt="avatar"/>
              <div>
                <h3 title={item.title}><Link to={`/topic/${item.id}`}>{item.title}</Link></h3>
                <span className='tab'>{item.top?'置顶':item.good?'精华':tabs[item.tab]}</span>
                <span>回复量：<strong>{item.reply_count}</strong></span>
                &nbsp;&nbsp;
                <span>阅读量：<strong>{item.visit_count}</strong></span>
                &nbsp;&nbsp;
                <Button onClick={this.cancelCollect.bind(this, item.id)} type="danger">取消收藏</Button>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

let getUser = ({user}) => ({user})
export default connect(getUser)(Collect)
