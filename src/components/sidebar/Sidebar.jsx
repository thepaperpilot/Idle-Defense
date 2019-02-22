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
					<div className="sidebar-card flex-horiz">
						<div>
							Range:<br/>
							Damage:<br/>
							Fire Rate:
						</div>
						<div>
							{selected.range}<br/>
							{selected.damage}<br/>
							{Math.round(100 * 60 / selected.fireInterval) / 100}/s
						</div>
					</div>
				</ScrollArea>
			</div>}
		</div>
	}
}

function mapStateToProps(state) {
	return {
		selected: state.entities.selected
	}
}

export default connect(mapStateToProps)(Sidebar)
