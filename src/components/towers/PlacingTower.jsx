import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import SVG from './../images/SVG'
import Range from './Range'

class PlacingTower extends Component {
	constructor(props) {
		super(props)

		this.place = this.place.bind(this)
	}

	place(shiftKey) {
		if (this.props.canPlace) {
			const {index, placing} = this.props
			this.props.dispatch({
				type: 'PURCHASE_TOWER',
				index,
				placing,
				cost: placing.cost,
				shiftKey
			})
		} else {
			// TODO feedback for no purchase
			if (!shiftKey) {
				this.props.dispatch({
					type: 'SELECT_SHOP_TOWER',
					tower: null
				})
			}
			this.props.dispatch({
				type: 'SELECT_ENTITY',
				index: null
			})
		}
	}

	render() {
		if (this.props.index == null) return null

		const {placing, canPlace, index, columns, tileSize} = this.props
		const x = ((index % columns) + .5) * tileSize
		const y = (Math.floor(index / columns) + .5) * tileSize

		const Svg = SVG[placing.image]

		return placing ? <g x={x} y={y} alpha={0.5}>
			<Svg />
			<Range
				range={placing.range}
				color={canPlace ? 0x00FF00 : 0xFF0000} />
		</g> : null
	}
}

function mapStateToProps(state, props) {
	const placing = state.shop.towers[state.shop.selected]
	const tile = props.index in state.map.tiles ?
			state.map.tiles[props.index] : state.constants.baseTiles.default
	return {
		canPlace: placing && !tile.hasEntity && tile.buildable &&
			Object.keys(placing.cost).every(k => state.wallet[k] >= placing.cost[k]),
		placing,
		columns: state.map.width,
		tileSize: state.constants.tileSize
	}
}

export default connect(mapStateToProps, null, null, { withRef: true })(PlacingTower)
