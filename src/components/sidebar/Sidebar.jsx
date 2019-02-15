import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Textfit } from 'react-textfit'
import ScrollArea from 'react-scrollbar'
import './sidebar.css'

class Sidebar extends Component {
	render() {
		const {selected} = this.props

		return <div className="sidebar">
			{selected && <div className="sidebar-content">
				<div className="sidebar-header">
					<Textfit
						mode="single"
						forceSingleModeWidth={true}
						max={35}>
						{selected.name}
					</Textfit>
					<span className="sidebar-type">
						{`${selected.type.charAt(0).toUpperCase()}${selected.type.slice(1)}`}
					</span>
				</div>
				<ScrollArea speed={0.8} vertical={true} horizontal={false}>
					<div className="sidebar-card">
						Range: {selected.range}
					</div>
				</ScrollArea>
			</div>}
		</div>
	}
}

function mapStateToProps(state) {
	return {
		selected: state.entities.entities[state.entities.selected]
	}
}

export default connect(mapStateToProps)(Sidebar)
