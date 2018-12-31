import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResizeObserver from 'react-resize-observer'
import './stage.css'

class MyStage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			width: 0,
			height: 0
		}

		this.onResize = this.onResize.bind(this)
	}

	onResize(e) {
		this.setState({
			width: e.width,
			height: e.height
		})
	}

	render() {
		const {width, height} = this.state
		const {children, worldWidth, worldHeight, tileSize} = this.props
		const viewbox = [0, 0, worldWidth * tileSize, worldHeight * tileSize]
		return <div className="stage">
			<div className="inset" />
			<svg viewBox={viewbox}>
				{children}
			</svg>
			<ResizeObserver
				onResize={this.onResize}>
			</ResizeObserver>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		worldWidth: state.map.width,
		worldHeight: state.map.height,
		tileSize: state.constants.tileSize
	}
}

export default connect(mapStateToProps)(MyStage)
