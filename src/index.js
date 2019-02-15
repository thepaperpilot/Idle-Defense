import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import { loader } from 'pixi.js'
import './index.css'

//window.PIXI.SCALE_MODES.DEFAULT = window.PIXI.SCALE_MODES.NEAREST

loader
	.add('tile', 'images/tile.png')
	.add('cross', 'images/cross.png')
	.add('walkable-1', 'images/walkable-1.png')
	.add('images/spritesheet_complete.json')
	.add('coin', 'images/coin.png')
	.add('diamond', 'images/diamond.png')
	.add('bush-1', 'images/bush-1.png')
	.add('bush-2', 'images/bush-2.png')
	.add('bush-3', 'images/bush-3.png')
	.add('bush-4', 'images/bush-4.png')
	.add('bush-5', 'images/bush-5.png')
	.add('rock-1', 'images/rock-1.png')
	.add('rock-2', 'images/rock-2.png')
	.add('rock-3', 'images/rock-3.png')
	.load(() => {
		const store = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

		ReactDOM.render(
			<Provider store={store}>
				<App />
			</Provider>,
			document.getElementById('root')
		)

		registerServiceWorker()
	})
