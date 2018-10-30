import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Topbar from './topbar/Topbar'
import GameScreen from './screens/GameScreen'
import LevelEditor from './screens/LevelEditor'

class App extends Component {	
	render() {
		return <BrowserRouter>
			<div style={{ height: '100%' }}>
				<Topbar />
				<Route exact path="/" component={GameScreen}/>
				<Route path="/editor" component={LevelEditor}/>
			</div>
		</BrowserRouter>
	}
}

export default App
