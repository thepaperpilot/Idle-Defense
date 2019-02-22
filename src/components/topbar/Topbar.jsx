import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Currency from './../ui/Currency'
import './topbar.css'

class Topbar extends Component {
	render() {
		const {enabled, wallet, lives} = this.props
		return <div className="topbar">
			{enabled ? <div>
				<Currency name="lives" amount={lives} />
				{Object.keys(wallet).map(c =>
					<Currency name={c} amount={wallet[c]} key={c} />)}
			</div> : null}
			<div className="flex-grow" />
			<Link to="/editor"><img src="images/toolBrush.png" alt="editor" title="editor" /></Link>
			<Link to="/"><img src="images/home.png" alt="home" title="home" /></Link>
		</div>
	}
}

function mapStateToProps(state) {
	if (!state.map)
		return { enabled: false }
	return {
		enabled: true,
		wallet: state.wallet,
		lives: state.map.lives
	}
}

export default connect(mapStateToProps)(Topbar)
