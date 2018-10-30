import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Stage } from 'react-pixi-fiber'
import ResizeObserver from 'react-resize-observer'
import Viewport from './Viewport'
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
		return <div className="stage">
			<div className="inset" />
			<Stage width={width} height={height} options={{
				transparent: true,
				antialias: true
			}}>
				<Viewport width={width} height={height}
					worldWidth={worldWidth * tileSize} worldHeight={worldHeight * tileSize}>
					{children}
				</Viewport>
			</Stage>
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
