import React, { Component } from 'react'
import { connect } from 'react-redux'
import Entity from './EntityBase'

class SpecialEntity extends Component {
	render() {
		const {index, image, columns, tileSize, ...props} = this.props
		const x = ((index % columns) + .5) * tileSize
		const y = (Math.floor(index / columns) + .5) * tileSize

		return <Entity x={x} y={y} image={image} {...props} />
	}
}

function mapStateToProps(state, props) {
	return {
		columns: state.map.width,
		tileSize: state.constants.tileSize
	}
}

export default connect(mapStateToProps)(SpecialEntity)
