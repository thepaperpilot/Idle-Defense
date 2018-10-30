import React, { Component } from 'react'
import { connect } from 'react-redux'

class WaveSender extends Component {
	constructor(props) {
		super(props)

		this.restart = this.restart.bind(this)
		this.sendEnemy = this.sendEnemy.bind(this)

		this.restart()
	}

	restart() {
		if (this.timeout)
			clearTimeout(this.timeout)
		this.timeout = setTimeout(this.sendEnemy, this.props.initialDelay)
		this.sent = 0
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
			this.timeout = setTimeout(this.sendEnemy, wave.boundToNextWave ? enemyDelay : waveDelay)
		} else {
			this.timeout = setTimeout(this.sendEnemy, enemyDelay)
		}
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

export default connect(mapStateToProps)(WaveSender)
