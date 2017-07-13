import React from 'react';
import axios from 'axios';
import {url} from '../config';
import {message, Spin, Card, Button} from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class User extends React.Component{
  constructor(){
    super()
    this.state={
      data: null
    }
  }
  getUserInfo(loginname){
    axios.get(`${url}/user/${loginname}`)
      .then(res => this.setState({data: res.data.data}))
      .catch(err => message.error('数据加载失败'))
  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    let loginname = nextProps.match.params.loginname
    this.getUserInfo(loginname)
  }
  componentDidMount(){
    var loginname = this.props.match.params.loginname;
    this.getUserInfo(loginname)
  }
  render(){
    let {data} = this.state;
    // console.log(data);
    if (this.props.user.isLogin) {
      var loginname = this.props.user.user.loginname;
    }
    let loginnameUrl = this.props.match.params.loginname
    return(
      <div>
        {
          data ? (
            <Card style={{margin: '10px'}}>
              <img src={data.avatar_url} alt='avatar' style={{maxWidth: '100%'}}/>
              <h3>{data.loginname}</h3>
              <p>创建日期：{moment(data.create_at).format('YYYY-MM-DD')}</p>
              <p>积分：{data.score}</p>
              <h2>发布话题:</h2>
              {data.recent_topics.map(item=>(
                <p key={item.id}>
                  <Link to={`/topic/${item.id}`}>{item.title}</Link>
                  {
                    loginname===loginnameUrl?<Button style={{marginLeft: '10px'}}><Link to={`/update/${item.id}`}>更新</Link></Button>:null
                  }
                </p>
              ))}
              <h2>参与回复：</h2>
              {
                data.recent_replies.map(item=>(
                  <p key={item.id}><Link to={`/user/${item.author.loginname}`}>{item.author.loginname}：</Link><Link to={`/topic/${item.id}`}>{item.title}</Link></p>
                ))
              }
            </Card>
          ) : <div style={{textAlign: 'center'}}><Spin size='large'/></div>
        }
      </div>
    )
  }
}
let getUser = ({user}) => ({user})
export default connect(getUser)(User)
