import { Component } from 'react'
import * as PIXI from 'pixi.js'

class GameLoop extends Component {
	constructor(props) {
		super(props)

		this.update = this.update.bind(this)
	}

	update(delta) {
		if (!this.props.running) return

		console.log(this.props.props.entities.length)
		this.props.props.entities.forEach(e => e.update(delta, this.props.props))
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
