import React from 'react';
import { Radio, Button, Input } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;

export default class Form extends React.Component{
  constructor(props){
    super(props)
    this.state={
      tab: props.tab || 'dev',
      title: props.title || '',
      content: props.content || ''
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      tab: nextProps.tab,
      title: nextProps.title,
      content: nextProps.content
    })
  }
  handleChange(type, e){
    this.setState({[type]: e.target.value})
  }
  handleSubmit(){
    let {tab, title, content} = this.state;
    this.props.onSubmit({tab, title, content})
  }
  render(){
    let {tab, title, content} = this.state;
    // console.log(this.state);
    return(
      <div>
        <span>话题分类：</span>
        <RadioGroup onChange={this.handleChange.bind(this, 'tab')} value={tab}>
          <Radio value='dev'>dev</Radio>
          <Radio value='share'>share</Radio>
          <Radio value='ask'>ask</Radio>
          <Radio value='job'>job</Radio>
        </RadioGroup>
        <br /><br />
        <Input placeholder="请输入标题(>10)" value={title} onChange={this.handleChange.bind(this, 'title')}/>
        <br /><br />
        <TextArea rows={4} value={content} onChange={this.handleChange.bind(this, 'content')} placeholder='主体内容'/>
        <p>注意：话题主体内容为 markdown 语法</p>
        <br />
        <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
        <Button type='danger' onClick={()=>this.props.onCancel()}>取消</Button>
      </div>
    )
  }
}
Form.defaultProps={
  onCancel(){},
  onSubmit(){}
}
