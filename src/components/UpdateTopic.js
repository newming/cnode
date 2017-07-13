import React from 'react';
import Form from './Form';
import {Card, message} from 'antd';
import axios from 'axios';
import {url} from '../config';
import {connect} from 'react-redux';

class UpdateTopic extends React.Component{
  constructor(){
    super()
    this.state={
      data: null
    }
  }
  componentDidMount(){
    let id = this.props.match.params.topic_id
    axios.get(`${url}/topic/${id}?mdrender=false`)
      .then(res=>this.setState({data: res.data.data}))
      .catch(err=>message.error('文章加载失败'))
  }
  handleSubmit(data){
    // console.log(data);
    data.accesstoken = this.props.user.accesstoken;
    data.topic_id = this.props.match.params.topic_id
    axios.post(`${url}/topics/update`, data)
      .then(res=>{
        message.success('更新成功')
        this.props.history.push(`/topic/${res.data.topic_id}`)
      })
      .catch(err=> message.error('更新失败'))
  }
  render(){
    // console.log(this.state.data);
    let {data} = this.state;
    let formContent;
    if (data) {
      formContent = {tab: data.tab, title: data.title, content: data.content}
    }else {
      formContent = {}
    }
    // console.log(formContent);
    return(
      <Card style={{margin: '10px'}}>
        <Form onCancel={()=>this.props.history.goBack()} onSubmit={this.handleSubmit.bind(this)} {...formContent}/>
      </Card>
    )
  }
}

let getUser = ({user}) => ({user})
export default connect(getUser)(UpdateTopic)
