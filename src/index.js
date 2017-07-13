import React from 'react';
import ReactDOM from 'react-dom';

// import 'antd/dist/antd.css';
import './main.css';

import App from './App'

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import store from './store/reduce';
import { Provider } from 'react-redux'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
