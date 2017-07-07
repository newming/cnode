import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'

class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<div>
					<Header />
					
					<Route path='/' component={Home} />

					<Footer />
				</div>
			</BrowserRouter>
		)
	}
}
export default App