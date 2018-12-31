import React, { Component } from 'react'
import { connect } from 'react-redux'
import Map from './../map/Map'
import Stage from './../viewport/Stage'
import Sidebar from './../sidebar/Sidebar'
import Bottombar from './../bottombar/Bottombar'
import PlacingTower from './../towers/PlacingTower'
import RouteFinder from './../map/RouteFinder'
import WaveSender from './../map/WaveSender'
import './gamescreen.css'

class GameScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			index: null
		}

		this.placing = React.createRef()

		this.placeTower = this.placeTower.bind(this)
		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseOut = this.onMouseOut.bind(this)
	}

	placeTower(index, shiftKey) {
		if (this.state.index === index)
			this.placing.current.getWrappedInstance().place(shiftKey)
	}

	onMouseOver(index) {
		this.setState({ index })
	}

	onMouseOut(index) {
		if (this.state.index === index) {
			this.setState({ index: null })
		}
	}

	render() {
		return <div className={this.props.isSelecting ? "game sidebar-is-open" : "game"}>
			<Stage>
				<Map
					onMouseOver={this.onMouseOver}
					onMouseOut={this.onMouseOut}
					placeTower={this.placeTower}
					running={true}>
					<WaveSender />
				</Map>
				<PlacingTower ref={this.placing} index={this.state.index} />
			</Stage>
			<Sidebar />
			<Bottombar />
			<RouteFinder />
		</div>
	}
}

function mapStateToProps(state) {
	return {
		isSelecting: state.map.isSelecting
	}
}

export default connect(mapStateToProps)(GameScreen)
