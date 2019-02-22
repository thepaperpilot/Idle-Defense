import React, { Component } from 'react'
import { connect } from 'react-redux'
import Enemy from './../enemies/Enemy'
import VictoryModal from './../modals/Victory'

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

	componentWillReceiveProps(newProps) {
		if (newProps.enemiesLeft === 0 && newProps.wave && this.sent === newProps.wave.amount) {
			this.props.dispatch({
				type: 'NEXT_WAVE'
			})
			this.timeout = setTimeout(this.sendEnemy, newProps.wave.delay)
			this.sent = 0
		}
	}

	sendEnemy() {
		const {
			enemies,
			wave,
			path,
			width,
			tileSize
		} = this.props

		if (!wave)
			return

		const enemy = Object.assign({
			x: NaN,
			y: NaN,
			width,
			path,
			tileSize,
			type: wave.enemy
		}, enemies[wave.enemy], wave.modifiers)

		this.props.addEntities(new Enemy(enemy))

		this.sent++

		if (this.sent !== wave.amount) {
			this.timeout = setTimeout(this.sendEnemy, wave.delay)
		} else if (wave.boundToNextWave) {
			this.props.dispatch({
				type: 'NEXT_WAVE'
			})
			this.timeout = setTimeout(this.sendEnemy, wave.delay)
			this.sent = 0
		}
	}

	render() {
		return <VictoryModal open={!this.props.wave} />
	}
}


function mapStateToProps(state, props) {
	const {waves, wave, path, width} = props.map || state.map
	return {
		wave: waves[wave],
		path,
		width,
		tileSize: state.constants.tileSize,
		initialDelay: state.constants.delay,
		enemies: state.constants.enemies,
		enemiesLeft: state.entities.enemiesLeft
	}
}

export default connect(mapStateToProps)(WaveSender)
