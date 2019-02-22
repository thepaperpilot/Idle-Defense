import { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Sprite } from 'pixi.js'
import Range from './Range'
import Tower from './Tower'

const TextureCache = window.PIXI.utils.TextureCache

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

		if (index === null)
			this.container.alpha = 0

		if (placing) {
			this.container.addChild(this.sprite = new Sprite(TextureCache[placing.image]))
			this.sprite.anchor.set(.5)
			this.container.addChild(this.range = Range(placing.range, canPlace ? 0x00FF00 : 0xFF0000))
		} else {
			this.sprite = null
			this.range = null
		}
	}

	componentWillReceiveProps(newProps) {
		if(this.props.placing !== newProps.placing) {
			if (this.props.placing) {
				this.container.removeChild(this.sprite)
				this.container.removeChild(this.range)
				this.sprite = null
				this.range = null
			} else {
				this.container.addChild(this.sprite = new Sprite(TextureCache[newProps.placing.image]))
				this.sprite.anchor.set(.5)
				this.container.addChild(this.range =
					Range(newProps.placing.range, newProps.canPlace ? 0x00FF00 : 0xFF0000))
			}
		} else if (this.props.placing && this.props.canPlace !== newProps.canPlace) {
			this.container.removeChild(this.range)
			this.container.addChild(this.range =
					Range(newProps.placing.range, newProps.canPlace ? 0x00FF00 : 0xFF0000))
		}

		const { placing, index, columns, tileSize } = newProps
		this.container.alpha = placing && index !== null ? 0.5 : 0
		this.container.x = ((index % columns) + .5) * tileSize
		this.container.y = (Math.floor(index / columns) + .5) * tileSize
	}

	place(shiftKey) {
		if (this.props.canPlace) {
			const {index, placing, tileSize, columns} = this.props
			this.props.dispatch({
				type: 'PURCHASE_TOWER',
				index,
				placing,
				cost: placing.cost,
				shiftKey
			})
			const x = ((index % columns) + .5) * tileSize
			const y = (Math.floor(index / columns) + .5) * tileSize
			this.props.map.current.getWrappedInstance().addEntities(new Tower({
				x, y,
				...placing
			}))
		} else {
			// TODO feedback for no purchase
			if (!shiftKey) {
				this.props.dispatch({
					type: 'SELECT_SHOP_TOWER',
					tower: null
				})
			}
			this.props.dispatch({ type: 'SELECT_ENTITY' })
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
