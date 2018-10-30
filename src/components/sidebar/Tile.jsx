import React, { Component } from 'react'
import { connect } from 'react-redux'
import Image from './../images/Image'

class Tile extends Component {
	constructor(props) {
		super(props)

		this.selectTile = this.selectTile.bind(this)
	}

	selectTile() {
		this.props.dispatch({
			type: 'SELECT_SHOP_TOWER',
			tower: this.props.image || 0
		})
	}

	render() {
		const {selected, image, children} = this.props
		return <button
			className={selected ? "selected tile" : "tile"}
			onClick={this.props.selectTile || this.selectTile}>
			{image && <Image image={image} />}
			{children}
		</button>
	}
}

function mapStateToProps(state, props) {
	return {
		selected: state.shop.selected === props.image ||
			(state.shop.selected === 0 && props.image == null) ||
			(state.shop.selected && state.shop.selected.image &&
				state.shop.selected.image === props.image)
	}
}

export default connect(mapStateToProps)(Tile)
