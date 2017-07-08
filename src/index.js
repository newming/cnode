import React from 'react';
import ReactDOM from 'react-dom';

// import 'antd/dist/antd.css';
import './main.css';

import App from './App'

import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(<App />, document.getElementById('root'))
