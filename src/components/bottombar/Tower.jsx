import React, { Component } from 'react'
import { connect } from 'react-redux'
import Currency from './../ui/Currency'
import Image from './../images/Image'

class Tower extends Component {
	constructor(props) {
		super(props)

		this.selectTower = this.selectTower.bind(this)
	}

	selectTower() {
		this.props.dispatch({
			type: 'SELECT_SHOP_TOWER',
			tower: this.props.index
		})
	}

	render() {
		const {image, name, cost} = this.props.tower
		const {wallet, selected} = this.props
		return <div
			className={`tower ${name.split(' ')[0].toLowerCase()} ${selected ? 'selected' : ''}`}
			onClick={this.selectTower}>
			<div className="img-wrapper">
				<Image image={image} />
			</div>
			<p>{name}</p>
			{Object.keys(cost).map(c =>
				<span key={c}
					className={wallet[c] >= cost[c] ? '' : 'cant-afford'}>
					<Currency name={c} amount={cost[c]} />
				</span>)}
		</div>
	}
}

function mapStateToProps(state, props) {
	return {
		tower: state.shop.towers[props.tower],
		index: props.tower,
		wallet: state.wallet,
		selected: props.tower === state.shop.selected
	}
}

export default connect(mapStateToProps)(Tower)
