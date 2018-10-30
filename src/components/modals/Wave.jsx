import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from './Modal'
import Select from '../ui/Select'
import Number from '../ui/Number'
import Checkbox from '../ui/Checkbox'

class Wave extends Component {
	constructor(props) {
		super(props)

		this.modal = React.createRef()

		this.state = {
			enemy: "normal",
			amount: 10,
			boundToNextWave: false,
			index: -1
		}

		this.open = this.open.bind(this)
		this.delete = this.delete.bind(this)
		this.cancel = this.cancel.bind(this)
		this.save = this.save.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	open(index) {
		const ids = this.props.waves.map(w => w.id)
		this.setState({
			...this.props.waves[index] || {
				enemy: "normal",
				amount: 10,
				boundToNextWave: false,
				id: Math.max(...(ids.length ? ids : [ 0 ])) + 1
			},
			index
		}, () => {
			this.modal.current.open()
		})
	}

	delete() {
		this.props.dispatch({
			type: 'DELETE_WAVE',
			index: this.state.index
		})
		this.modal.current.close()
	}

	cancel() {
		this.modal.current.close()
	}

	save() {
		this.props.dispatch({
			type: 'SAVE_WAVE',
			index: this.state.index,
			id: this.state.id,
			enemy: this.state.enemy,
			amount: this.state.amount,
			boundToNextWave: this.state.boundToNextWave
		})
		this.modal.current.close()
	}

	onChange(key) {
		return value => this.setState({ [key]: value })
	}

	render() {
		const {enemy, amount, boundToNextWave} = this.state
		return <Modal ref={this.modal} title="Waves" closable={true}>
			<Select options={[
	                { value: 'normal', label: 'Normal' },
	                { value: 'fast', label: 'Fast' }
	            ]}
	            title="Enemy Type"
	            value={enemy}
	            onChange={this.onChange('enemy')} />
			<Number title="Number of Enemies" onChange={this.onChange('amount')} value={amount} />
			<Checkbox title="Spawn next wave immediately"
				onChange={this.onChange('boundToNextWave')} value={boundToNextWave} />
			<div className="modal-footer">
				<button onClick={this.delete}
					style={{borderColor: 'red'}}
					disabled={!this.props.waves[this.state.index]}>
					Delete
				</button>
				<div className="flex-grow" />
				<button onClick={this.cancel}>Cancel</button>
				<button onClick={this.save}>Save</button>
			</div>
		</Modal>
	}
}

function mapStateToProps(state, id) {
	return {
		waves: state.map.waves
	}
}

export default connect(mapStateToProps, null, null, { withRef: true })(Wave)
