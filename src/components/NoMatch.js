import React from 'react';
import img from '../images/git.jpg';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
export default class NoMatch extends React.Component{
  render(){
    return(
      <div style={{textAlign:'center', padding: '10px'}}>
        <img src={img} alt='404' style={{maxWidth: '100%'}}/>
        <h1>对不起，您访问的页面不存在。</h1>
        <Button type='primary'><Link to='/'>返回首页</Link></Button>
      </div>
    )
  }
}
