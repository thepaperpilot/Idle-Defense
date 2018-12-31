import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-pixi-fiber'
import SVG from './../images/SVG'
import * as PIXI from 'pixi.js'

class PlacingTile extends Component {
	constructor(props) {
		super(props)

		this.place = this.place.bind(this)
	}

	place() {
		const {index, image} = this.props
		if (image == null) return

		if (image === 0) {
			this.props.dispatch({
				type: 'CLEAR_TILE',
				index
			})
		} else if (image.key) {
			this.props.dispatch({
				type: 'PLACE_SPECIAL_ENTITY',
				key: image.key,
				value: index,
			})
		} else if (image.includes('walkable')) {
			this.props.dispatch({
				type: 'TOGGLE_WALKABLE',
				index
			})
		} else {
			this.props.dispatch({
				type: 'PLACE_TILE',
				index,
				image
			})
		}		
	}

	render() {
		if (this.props.index == null) return null

		const {image, index, columns, tileSize} = this.props
		const x = ((index % columns) + .5) * tileSize
		const y = (Math.floor(index / columns) + .5) * tileSize

		const Svg = SVG[image.image || image || 'cross']

		return image == null ? null : <g x={x} y={y} alpha={0.5}>
			<Svg />
		</g>
	}
}

function mapStateToProps(state, props) {
	return {
		image: state.shop.selected,
		columns: state.map.width,
		tileSize: state.constants.tileSize
	}
}

export default connect(mapStateToProps, null, null, { withRef: true })(PlacingTile)
