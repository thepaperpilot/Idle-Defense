import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameLoop from './../gameLoop/GameLoop'
import Tiles from './Tiles'
import Spawn from './Spawn'
import Base from './Base'
import Entities from './Entities'
import Tower from './../towers/Tower'
import Enemy from './../enemies/Enemy'

class Map extends Component {
	constructor(props) {
		super(props)

		this.state = {
			entities: {
				entities: []
			}
		}

		this.entities = React.createRef()
	}

	componentDidMount() {
		this.setState({
			entities: this.entities.current
		})
	}

	render() {
		const {map, specialEntities, running, baseTiles, tileSize} = this.props
		return <GameLoop
			running={this.props.running}
			entities={this.state.entities.entities}>
			<Tiles width={map.width} height={map.height}
				tiles={map.tiles}
				baseTiles={baseTiles}
				tileSize={tileSize}
				onMouseOver={this.props.onMouseOver}
				onMouseOut={this.props.onMouseOut}
				placeTower={this.props.placeTower} />
			<Entities entities={map.entities} ref={this.entities} />
			{specialEntities.map(entity => {
				const props = { key: entity.key, index: entity.index, interactive: running }
				switch (entity.key) {
				case 'base': return <Base {...props} />
				case 'spawn': return <Spawn {...props} />
				default: return null
				}
			})}
		</GameLoop>
	}
}

function mapStateToProps(state, props) {
	const map = props.map || state.map
	const specialEntities = state.constants.specialEntities.map(entity => ({
		key: entity,
		index: map[entity]
	}))
	return {
		map,
		specialEntities,
		baseTiles: state.constants.baseTiles,
		tileSize: state.constants.tileSize
	}
}

export default connect(mapStateToProps)(Map)
