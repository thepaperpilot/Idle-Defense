import { Component } from 'react'
import { connect } from 'react-redux'
import Enemy from './../enemies/Enemy'

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
		const {
			enemies,
			wave,
			enemyDelay,
			waveDelay,
			path,
			width,
			tileSize
		} = this.props

		const enemy = Object.assign({
			x: NaN,
			y: NaN,
			width,
			path,
			tileSize,
			type: wave.enemy
		}, enemies[wave.enemy])

		this.props.addEntities(new Enemy(enemy))

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


function mapStateToProps(state, props) {
	const {waves, wave, path, width} = props.map || state.map
	return {
		wave: waves[wave],
		path,
		width,
		tileSize: state.constants.tileSize,
		initialDelay: state.constants.initialDelay,
		waveDelay: state.constants.waveDelay,
		enemyDelay: state.constants.enemyDelay,
		enemies: state.constants.enemies
	}
}

export default connect(mapStateToProps)(WaveSender)
