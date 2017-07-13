import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {connect} from 'react-redux';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Topic from './components/Topic'
import Message from './components/Message'
import User from './components/User'
import Collect from './components/Collect'
import NoMatch from './components/NoMatch'
import NewTopic from './components/NewTopic';
import UpdateTopic from './components/UpdateTopic';

class App extends React.Component{
	render(){
		let {isLogin} = this.props.user;
		return(
			<Router>
				<div>
					<Header />

					<div style={{minHeight: '300px'}}>
						<Switch>
							<Route path='/' exact component={Home} />
							<Route path='/topic/:id' component={Topic} />
							<Route path='/user/:loginname' component={User} />
							<Route path='/collect' component={props=>isLogin?<Collect {...props} /> : <Redirect to='/'/> } />
							<Route path='/message' render={props=>isLogin ? <Message {...props} /> : <Redirect to='/'/> } />
							<Route path='/newtopic' render={props=>isLogin ? <NewTopic {...props} /> : <Redirect to='/'/> } />
							<Route path='/update/:topic_id' render={props=>isLogin ? <UpdateTopic {...props} /> : <Redirect to='/'/> } />
							<Route component={NoMatch}/>
						</Switch>
					</div>

					<Footer />
				</div>
			</Router>
		)
	}
}
let getUser = ({user}) => ({user});

export default connect(getUser)(App)
