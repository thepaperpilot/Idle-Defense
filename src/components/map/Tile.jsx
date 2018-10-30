import React, { PureComponent } from 'react'
import Entity from './EntityBase'

class Tile extends PureComponent {
	constructor(props) {
		super(props)

		this.mouseover = this.mouseover.bind(this)
		this.mouseout = this.mouseout.bind(this)
		this.click = this.click.bind(this)
	}

	mouseover() {
		this.props.onMouseOver(this.props.index)
	}

	mouseout() {
		this.props.onMouseOut(this.props.index)
	}

	click(e) {
		this.props.placeTower(this.props.index, e.data.originalEvent.shiftKey)
	}

	render() {
		const {index, columns, tileSize} = this.props
		const x = ((index % columns) + .5) * tileSize
		const y = (Math.floor(index / columns) + .5) * tileSize
		const tile = this.props.tile ?
			Object.assign({}, this.props.baseTiles[this.props.tile.base], this.props.tile) :
			this.props.baseTiles.default
		if (this.props.tile) {
			tile.images = [
				...this.props.baseTiles[this.props.tile.base].images,
				...this.props.tile.images || []
			]
		}

		return tile.images.map((image, i) =>
			<Entity key={i}
				interactive={i === 0}
				mouseover={this.mouseover}
				mouseout={this.mouseout}
				onclick={this.click}
				x={x}
				y={y}
				image={image} />)
	}
}

export default Tile
