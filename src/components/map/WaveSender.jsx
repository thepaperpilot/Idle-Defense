import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoopContext } from './../gameLoop/GameLoop'

class WaveSender extends Component {
	constructor(props) {
		super(props)

		this.update = this.update.bind(this)
		this.startWave = this.startWave.bind(this)
		this.sendEnemy = this.sendEnemy.bind(this)

		this.delta = 0
		this.startWave()
	}

	update(delta) {
		this.delta += delta
		while (this.delta >= this.delay) {
			this.delta -= this.delay
			if (this.sending)
				this.sendEnemy()
			else
				this.startWave()
		}
	}

	startWave() {
		this.sent = 0
		this.sending = true
		this.delay = this.props.initialDelay
	}

	sendEnemy() {
		const {enemies, wave, enemyDelay, waveDelay} = this.props
		const enemy = Object.assign({
			type: 'enemy',
			id: WaveSender.id++,
			x: NaN,
			y: NaN
		}, enemies[wave.enemy])

		this.props.dispatch({
			type: 'ADD_ENTITY',
			entity: enemy
		})

		this.sent++

		if (this.sent === wave.amount) {
			this.props.dispatch({
				type: 'NEXT_WAVE'
			})
			this.delay = wave.boundToNextWave ? enemyDelay : waveDelay
			this.sending = false
		} else {
			this.delay = enemyDelay
		}
	}

	componentDidMount() {
		this.props.subscribe(this.update)
	}

	componentWillUnmount() {
		this.props.unsubscribe(this.update)
	}

	render() {
		return null
	}
}

WaveSender.id = 0

function mapStateToProps(state, props) {
	const {waves, wave} = props.map || state.map
	return {
		wave: waves[wave],
		initialDelay: state.constants.initialDelay,
		waveDelay: state.constants.waveDelay,
		enemyDelay: state.constants.enemyDelay,
		enemies: state.constants.enemies
	}
}

const WrappedWaveSender = connect(mapStateToProps)(WaveSender)

export default props => <LoopContext.Consumer>
	{value => <WrappedWaveSender {...props} {...value} />}
</LoopContext.Consumer>
