import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from './Modal'

class GameOver extends Component {
	constructor(props) {
		super(props)

		this.modal = React.createRef()

		this.leave = this.leave.bind(this)
		this.retry = this.retry.bind(this)
	}

	componentDidMount() {
		if (this.props.open)
			this.modal.current.open()
	}

	componentWillReceiveProps(newProps) {
		if (this.props.open !== newProps.open)
			this.modal.current[newProps.open ? 'open' : 'close']()
	}

	leave() {
		this.props.dispatch({ type: 'GO_TO_LEVEL_SELECT' })
	}

	retry() {
		this.props.dispatch({ type: 'RESTART_WAVE' })
	}

	render() {
		// TODO just retry the last wave until you succeed automatically
		return <Modal ref={this.modal} title="Game Over">
			<div className="modal-footer">
				<div className="flex-grow" />
				<button onClick={this.leave}>Back to level select</button>
				<button onClick={this.retry}>Retry last wave</button>
			</div>
		</Modal>
	}
}

export default connect()(GameOver)
