import React, { Component } from 'react'

export const LoopContext = React.createContext()

class GameLoop extends Component {
	constructor(props) {
		super(props)

		this.subscriptions = []

		this.update = this.update.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.unsubscribe = this.unsubscribe.bind(this)
	}

	componentDidMount() {
		this.request = requestAnimationFrame(this.update)
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.request)
	}

	update(timestamp) {
		const delta = timestamp - (this.lastframe || timestamp)
		this.lastframe = timestamp
		this.subscriptions.forEach(s => s(delta))
		this.request = requestAnimationFrame(this.update)
	}

	subscribe(cb) {
		this.subscriptions.push(cb)
	}

	unsubscribe(cb) {
		this.subscriptions.remove(cb)
	}

	render() {
		const value = { subscribe: this.subscribe, unsubscribe: this.unsubscribe }
		return <LoopContext.Provider value={value}>
			{this.props.children}
		</LoopContext.Provider>
	}
}

export default GameLoop
