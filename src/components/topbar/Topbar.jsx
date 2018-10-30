import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Currency from './../ui/Currency'
import './topbar.css'

class Topbar extends Component {
	render() {
		const {wallet} = this.props
		return <div className="topbar">
			{Object.keys(wallet).map(c =>
				<Currency name={c} amount={wallet[c]} key={c} />)}
			<div className="flex-grow" />
			<Link to="/editor"><img src="images/toolBrush.png" alt="editor" title="editor" /></Link>
			<Link to="/"><img src="images/home.png" alt="home" title="home" /></Link>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		wallet: state.wallet
	}
}

export default connect(mapStateToProps)(Topbar)
