import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sprite } from 'react-pixi-fiber'
import SVGAnimation from './../images/SVGAnimation'
import SVGSprite from './../images/SVGSprite'
import * as PIXI from 'pixi.js'

const CLICK_RANGE = 2

class Entity extends Component {
	constructor(props) {
		super(props)

		this.pointerdown = this.pointerdown.bind(this)
		this.pointertap = this.pointertap.bind(this)
		this.click = this.click.bind(this)
	}

	pointerdown(e) {
		const {screenX: x, screenY: y} = e.data.originalEvent
		this.start = {x, y}
	}

	pointertap(e) {
		const {screenX, screenY} = e.data.originalEvent
		 if (Math.abs(this.start.x - screenX) <= CLICK_RANGE &&
		 	Math.abs(this.start.y - screenY) <= CLICK_RANGE)
			(this.props.onclick || this.click)(e)
	}

	click() {
		this.props.dispatch({
			type: 'SELECT_ENTITY',
			index: this.props.index
		})
	}

	render() {
		// Required props
		const {x, y, image, interactive, ...props} = this.props
		const {mouseover, mouseout} = this.props

		const spriteProps = Object.assign({
			anchor: [.5,.5],
			interactive: interactive == null || interactive,
			mouseover: mouseover,
			mouseout: mouseout,
			pointerdown: this.pointerdown,
			pointertap: this.pointertap,
			position: [x, y]
		}, props)

		if (mouseover) spriteProps.mouseover = mouseover
		if (mouseout) spriteProps.mouseout = mouseout

		if (Array.isArray(image)) {
			spriteProps.textures = image
			return <SVGAnimation {...spriteProps} />
		} else if (image in PIXI.utils.TextureCache) {
			spriteProps.texture = PIXI.utils.TextureCache[image]
			return <Sprite {...spriteProps} />
		} else {
			spriteProps.texture = image
			return <SVGSprite {...spriteProps} />
		}
	}
}

export default connect()(Entity)
