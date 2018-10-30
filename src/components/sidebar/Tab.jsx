import React, { Component } from 'react'
import AnimateHeight from 'react-animate-height'
import './tab.css'

class Tab extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: props.openByDefault
		}

		this.titleClick = this.titleClick.bind(this)
	}

	titleClick() {
		this.setState({
			open: !this.state.open
		})
	}

	render() {
		const {title, children} = this.props
		const {open} = this.state

		return <div className="tab">
			<div className={open ? 'tab-header open' : 'tab-header'} onClick={this.titleClick}>
				{title}
			</div>
	        <AnimateHeight duration={500} height={open ? 'auto' : 0}>
				{children}
			</AnimateHeight>
		</div>
	}
}

export default Tab
