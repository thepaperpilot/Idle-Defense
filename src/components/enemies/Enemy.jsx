import React, { Component } from 'react'
import { connect } from 'react-redux'
import SVGAnimation from './../images/SVGAnimation'

class Enemy extends Component {
	constructor(props) {
		super(props)

		this.position = 0
		this.interpolation = 0

		this.update = this.update.bind(this)
		this.updatePosition = this.updatePosition.bind(this)
		this.getCoords = this.getCoords.bind(this)
		this.click = this.click.bind(this)
	}

	update(delta) {
		this.interpolation += this.props.speed * delta
		while (this.interpolation > 100) {
			this.position++
			this.interpolation -= 100
		}
		if (this.position >= this.props.path.length) {
			// TODO deal damage
			this.position = 0
		}
		this.props.dispatch({
			type: 'UPDATE_ENTITY',
			index: this.props.index,
			entity: this.updatePosition()
		})
	}

	updatePosition() {
		const {x: currX, y: currY} = this.getCoords(this.props.path[this.position])
		const {x: nextX, y: nextY} = this.getCoords(this.props.path[this.position + 1])
		return {
			x: (currX + (nextX - currX) * this.interpolation / 100) * this.props.tileSize,
			y: (currY + (nextY - currY) * this.interpolation / 100) * this.props.tileSize
		}
	}

	getCoords(index) {
		return {
			x: index % this.props.width + .5,
			y: Math.floor(index / this.props.width) + .5
		}
	}

	click() {
		this.props.dispatch({
			type: 'SELECT_ENTITY',
			index: this.props.index
		})
	}

	render() {
		const {image, x, y} = this.props

		return <SVGAnimation textures={image} x={x} y={y} interactive={true} pointerdown={this.click} />
	}
}

function mapStateToProps(state) {
	return {
		path: state.map.path,
		width: state.map.width,
		tileSize: state.constants.tileSize
	}
}

export default connect(mapStateToProps, null, null, { withRef: true })(Enemy)
