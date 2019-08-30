import { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'

const TextureCache = PIXI.utils.TextureCache

class PlacingTile extends Component {
	constructor(props) {
		super(props)

		this.place = this.place.bind(this)
	}

	componentDidMount() {
		const {image, index, columns, tileSize} = this.props

		this.props.stage.addChild(this.container = new PIXI.Container())
		this.container.x = ((index % columns) + .5) * tileSize
		this.container.y = (Math.floor(index / columns) + .5) * tileSize

		this.container.addChild(this.sprite = new PIXI.Sprite(TextureCache[image.image || image || 'cross']))
	}

	componentWillReceiveProps(newProps) {
		const image = this.props.image
		
		if (this.props.image !== newProps.image) {
			this.container.removeChild(this.sprite)
			this.container.addChild(this.sprite = new PIXI.Sprite(TextureCache[image.image || image || 'cross']))
		}
		this.container.alpha = image == null ? 0 : 0.5
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
		return null
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
