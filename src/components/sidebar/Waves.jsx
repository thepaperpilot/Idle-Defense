import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Tab from './Tab'
import WaveModal from '../modals/Wave'
import Wave from './Wave'

class Waves extends Component {
	constructor(props) {
		super(props)

		this.modal = React.createRef()

		this.openWave = this.openWave.bind(this)
		this.moveWave = this.moveWave.bind(this)
	}

	openWave(id) {
		return () => {
			this.modal.current.getWrappedInstance().open(id)
		}
	}

	moveWave(dragIndex, moveIndex) {
		this.props.dispatch({
			type: 'MOVE_WAVE',
			dragIndex,
			moveIndex
		})
	}

	render() {
		return <Tab title="Waves">
			<button onClick={this.openWave(null)}>Add New Wave</button>
			{this.props.waves.map((wave, i) =>
				<Wave wave={wave} index={i} key={wave.id}
					moveWave={this.moveWave} openWave={this.openWave(i)} />)}
			<WaveModal ref={this.modal} />
		</Tab>
	}
}

function mapStateToProps(state) {
	return {
		waves: state.map.waves
	}
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Waves))
