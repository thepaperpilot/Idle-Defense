import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactResizeDetector from 'react-resize-detector'
import { Container, autoDetectRenderer } from 'pixi.js'
import Viewport from 'pixi-viewport'
import './stage.css'

class Stage extends Component {
	constructor(props) {
		super(props)

		this.screen = React.createRef()

		this.onResize = this.onResize.bind(this)
		this.update = this.update.bind(this)
	}

	componentWillMount() {
		// We need to be able to pass down our viewport on our first render,
		// so create everything now and only add it to the DOM after we've mounted
		this.stage = new Container()
		this.renderer = autoDetectRenderer(1, 1, {transparent: true})

        this.renderer.view.style.position = "absolute";
		this.renderer.view.style.display = "block";

		const v = this.viewport = new Viewport({
			screenWidth: 0,
			screenHeight: 0
		})
			.clamp({ direction: 'all' })
			.drag()
			.pinch()
			.wheel()

		v.off('pointdown', v.down)
		v.off('pointercancel', v.up)
		v.off('pointerout', v.up)
		v.off('rightdown', e => {
			e.data.originalEvent = Object.assign({}, e.data.originalEvent, {
				button: 0
			})
			v.down(e)
		})
		v.on('rightup', v.up)
		v.on('rightclick', () => v.plugins.drag.last = false)

		this.stage.addChild(this.viewport)
	}

	componentDidMount() {
		this.screen.current.appendChild(this.renderer.view)
		this.frame = requestAnimationFrame(this.update)

		const { clientWidth, clientHeight } = this.screen.current
		this.onResize(clientWidth, clientHeight)
		this.viewport.fitWorld()
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.frame)
	}

	onResize(width, height) {
		const worldWidth = this.props.worldWidth * this.props.tileSize
		const worldHeight = this.props.worldHeight * this.props.tileSize

		this.renderer.resize(width, height)
		this.viewport.resize(width, height, worldWidth, worldHeight)
		this.viewport.clampZoom({ maxWidth: worldWidth, maxHeight: worldHeight })
	}

	update() {
		this.renderer.render(this.stage)
		this.frame = requestAnimationFrame(this.update)
	}

	render() {
		return <div className="stage" ref={this.screen}>
			<div className="inset" />
			<ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
			{React.Children.map(this.props.children, child => 
				React.cloneElement(child, {stage: this.viewport})
			)}
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

export default connect(mapStateToProps)(Stage)
