import { Component } from 'react'
import * as PIXI from 'pixi.js'

class GameLoop extends Component {
	constructor(props) {
		super(props)

		this.update = this.update.bind(this)
	}

	update(delta) {
		if (!this.props.running) return

		// I don't like needing to do all this unwrapping :/
		this.props.entities.forEach(e => {
			if (e.current)
				e.current.getWrappedInstance().update(delta)
		})
	}

	componentDidMount() {
		PIXI.ticker.shared.add(this.update, this)
	}

	componentWillUnmount() {
		PIXI.ticker.shared.remove(this.update, this)
	}

	render() {
		return this.props.children
	}
}

export default GameLoop
