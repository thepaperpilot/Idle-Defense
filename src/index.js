import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import { loader } from 'pixi.js'
import './index.css'

window.PIXI.SCALE_MODES.DEFAULT = window.PIXI.SCALE_MODES.NEAREST

loader
	.add('tile', 'images/tile.png')
	.add('cross', 'images/cross.png')
	.add('walkable-1', 'images/walkable-1.png')
	.load(() => {
		const store = createStore(rootReducer, {})

		ReactDOM.render(
			<Provider store={store}>
				<App />
			</Provider>,
			document.getElementById('root')
		)

		registerServiceWorker()
	})
