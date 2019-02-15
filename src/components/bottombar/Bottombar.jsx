import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import Tower from './Tower'
import './bottombar.css'

class Bottombar extends Component {	
	render() {
		return <div className="bottombar">
			<ScrollArea speed={0.8} vertical={false} horizontal={true} swapWheelAxes={true}>
				<div className="towers">
					{Object.keys(this.props.towers).map(tower =>
						<Tower tower={tower} key={tower}/>)}
				</div>
			</ScrollArea>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		towers: state.shop.towers
	}
}

export default connect(mapStateToProps)(Bottombar)
