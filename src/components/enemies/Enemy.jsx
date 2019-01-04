import React, { Component } from 'react'
import EntityBase from './../map/EntityBase'

class Enemy extends EntityBase {
	constructor(props) {
		super(props)

		this.position = 0
		this.interpolation = 0
		this.current = this.getCoords(this.props.path[this.position])
		this.target = this.getCoords(this.props.path[this.position + 1])
	}

	update(delta) {
		super.update(delta)

		this.interpolation += this.props.speed * delta
		while (this.interpolation > 100) {
			this.position++
			this.interpolation -= 100
			this.current = this.getCoords(this.props.path[this.position])
			this.target = this.getCoords(this.props.path[this.position + 1])
		}
		if (this.position >= this.props.path.length) {
			// TODO deal damage
			this.position = 0
		}

		const {x, y} = this.updatePosition()
		//this.sprite.position.set(x, y)
	}

	updatePosition() {
		const {x: currX, y: currY} = this.current
		const {x: nextX, y: nextY} = this.target
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
}

function mapStateToProps(state) {
	return {
		path: state.map.path,
		width: state.map.width,
		tileSize: state.constants.tileSize
	}
}

export default Enemy
