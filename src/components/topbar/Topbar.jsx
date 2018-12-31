import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Currency from './../ui/Currency'
import Image from './../images/Image'
import './topbar.css'

class Topbar extends Component {
	render() {
		const {wallet} = this.props
		return <div className="topbar">
			{Object.keys(wallet).map(c =>
				<Currency name={c} amount={wallet[c]} key={c} />)}
			<div className="flex-grow" />
			<Link to="/editor"><Image image="toolBrush" alt="editor" /></Link>
			<Link to="/"><Image image="home" /></Link>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		wallet: state.wallet
	}
}

export default connect(mapStateToProps)(Topbar)
