import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'pixi.js'
import SVGSprite from './../images/SVGSprite'
import Range from './Range'

class PlacingTower extends Component {
	constructor(props) {
		super(props)

		this.place = this.place.bind(this)
	}

	componentDidMount() {
		const {placing, canPlace, index, columns, tileSize} = this.props

		this.props.stage.addChild(this.container = new Container())
		this.container.x = ((index % columns) + .5) * tileSize
		this.container.y = (Math.floor(index / columns) + .5) * tileSize

		this.container.addChild(this.sprite = new SVGSprite({texture: placing && placing.image}))
		this.container.addChild(this.range = Range(placing ? placing.range : 0, canPlace ? 0x00FF00 : 0xFF0000))
	}

	componentWillReceiveProps(newProps) {
		if(this.props.placing !== newProps.placing) {
			this.container.removeChild(this.sprite)
			this.container.addChild(this.sprite = new SVGSprite({texture: newProps.placing && newProps.placing.image}))
			this.container.removeChild(this.range)
			this.container.addChild(this.range =
				Range(newProps.placing ? newProps.placing.range : 0, newProps.canPlace ? 0x00FF00 : 0xFF0000))
		}
		this.container.alpha = newProps.placing ? 0.5 : 0
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
		return null
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
