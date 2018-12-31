import React, { Component } from 'react'
import SVG from './SVG'
import { LoopContext } from './../gameLoop/GameLoop'

class AnimatedSVG extends Component {
	constructor(props) {
		super(props)

		this.state = {
			frame: 0
		}

		// Leaving this undefined made adding to it NaN
		// which would cause an infinite loop in the update function
		// Infinite loops are really hard to debug ;_;
		this.delta = 0

		this.update = this.update.bind(this)
	}

	update(delta) {
		this.delta += delta
		// Originally didn't parenthesize my || and it would OR the boolean with 25
		// Seriously fuck how hard it is to debug infinite loops
		while (this.delta > (this.props.frameDuration || 25)) {
			console.log(this.delta)
			this.delta -= this.props.frameDuration || 25
			const frame = this.state.frame + 1
			this.setState({
				frame: frame === this.props.frames.length ? 0 : frame
			})
		}
	}

	componentDidMount() {
		this.props.subscribe(this.update)
	}

	componentWillUnmount() {
		this.props.unsubscribe(this.update)
	}

	render() {
		const {frames, ...props} = this.props
		const Svg = SVG[frames[this.state.frame]]
		return <Svg {...props} />
	}
}

// contextType isn't working so now I'm doing this
// bs wrapper just to use the Consumer method
// react-redux's connect api is superior change my mind
export default props => <LoopContext.Consumer>
	{value => <AnimatedSVG {...props} {...value} />}
</LoopContext.Consumer>
