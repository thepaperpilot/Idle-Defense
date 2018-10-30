import React, { Component } from 'react'
import { connect } from 'react-redux'
import Map from './../map/Map'
import Stage from './../viewport/Stage'
import Sidebar from './../sidebar/EditorSidebar'
import PlacingTile from './../map/PlacingTile'
import './gamescreen.css'

class LevelEditor extends Component {
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

	componentDidMount() {
		this.props.dispatch({ type: 'OPEN_LEVEL_EDITOR' })
	}

	placeTower(index) {
		if (this.state.index === index)
			this.placing.current.getWrappedInstance().place()
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
		return <div className="game editor">
			<Stage>
				<Map
					onMouseOver={this.onMouseOver}
					onMouseOut={this.onMouseOut}
					placeTower={this.placeTower}
					running={false} />
				<PlacingTile ref={this.placing} index={this.state.index} />
			</Stage>
			<Sidebar />
		</div>
	}
}

export default connect()(LevelEditor)
