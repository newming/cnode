import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Topic from './components/Topic'
import Message from './components/Message'

class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<div>
					<Header />
					
					<div style={{minHeight: '300px'}}>
						<Route path='/' exact component={Home} />
						<Route path='/topic/:id' component={Topic} />
						<Route path='/message' component={Message} />
					</div>

					<Footer />
				</div>
			</BrowserRouter>
		)
	}
}
export default App