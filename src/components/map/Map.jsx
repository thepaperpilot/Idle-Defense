import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'pixi.js'
import GameLoop from './../gameLoop/GameLoop'
import Entity from './EntityBase'
import SpecialEntity from './SpecialEntity'
import Tower from './../towers/Tower'

class Map extends Component {
	constructor(props) {
		super(props)

		this.state = {
			entities: []
		}

		this.addEntities = this.addEntities.bind(this)
		this.removeEntity = this.removeEntity.bind(this)
	}

	componentDidMount() {
		const {width, height, tiles, tileSize} = this.props
		this.tiles = new Array(width * height).fill(0).map((e, index) => {
			const tile = tiles[index] ?
				Object.assign({}, this.props.baseTiles[tiles[index].base], tiles[index]) :
				this.props.baseTiles.default
			if (tiles[index]) {
				tile.images = [
					...this.props.baseTiles[tiles[index].base].images,
					...tiles[index].images || []
				]
			}
			const container = new Container()
			tile.images.forEach((image, i) => {
				const x = ((index % width) + .5) * tileSize
				const y = (Math.floor(index / width) + .5) * tileSize
				container.addChild(new Entity({
					x, y,
					interactive: i === 0,
					mouseover: () => this.props.onMouseOver(index),
					mouseout: () => this.props.onMouseOut(index),
					onclick: (e) => this.props.placeTower(index, e.data.originalEvent.shiftKey),
					image
				}).sprite)
			})
			this.props.stage.addChild(container)
			return container
		})

		const entities = [...this.props.towers.map(entity => new Tower(entity)),
			...this.props.specialEntities.map(entity => {
			switch (entity.key) {
				case 'base': return new SpecialEntity({...entity, image: 'flagRed_up'})
				case 'spawn': return new SpecialEntity({...entity, image: 'discRed'})
				default: return null
			}
		})]

		this.addEntities(...entities)
	}
	
	componentWillUnmount() {
		if (this.tiles)
			this.tiles.forEach(tile => {
				this.props.stage.removeChild(tile.sprite)
			})
	}

	componentWillReceiveProps(newProps) {
		if (this.props.selected !== newProps.selected) {
			if (this.state.entities[this.props.selectedIndex])
				this.state.entities[this.props.selectedIndex].deselect()
			if (this.state.entities[newProps.selectedIndex])
				this.state.entities[newProps.selectedIndex].select()
		}
	}

	addEntities(...entities) {
		entities.map(e => {
			e.props.dispatch = this.props.dispatch
			Object.defineProperty(e.props, 'index', {
				get: () => this.state.entities.indexOf(e),
				configurable: true
			})
			return e
		}).forEach(entity =>
			this.props.stage.addChild(entity.sprite))

		this.setState({
			entities: [...this.state.entities, ...entities]
		})

		this.props.dispatch({
			type: 'ADD_ENTITIES',
			entities: entities.map(e => e.props)
		})
	}

	removeEntity(entity) {
		this.props.stage.removeChild(entity.sprite)
		const index = this.state.entities.indexOf(entity)
		if (index >= 0) {
			this.setState({
				entities: [...this.state.entities.slice(0, index),
				...this.state.entities.slice(index + 1)]
			})

			this.props.dispatch({
				type: 'REMOVE_ENTITY',
				index
			})
		}
	}

	render() {
		return <GameLoop
			running={this.props.running}
			props={{
				entities: this.state.entities,
				addEntities: this.addEntities,
				removeEntity: this.removeEntity
			}}>
				{React.Children.map(this.props.children, child => 
					React.cloneElement(child, {
						addEntities: this.addEntities,
						removeEntity: this.removeEntity
					})
				)}
			</GameLoop>
	}
}

function mapStateToProps(state, props) {
	const map = props.map || state.map
	const specialEntities = state.constants.specialEntities.map(entity => ({
		key: entity,
		index: map[entity],
		columns: map.width,
		tileSize: state.constants.tileSize
	}))
	return {
		specialEntities,
		width: map.width,
		height: map.height,
		tiles: map.tiles,
		towers: map.towers,
		path: map.path,
		selected: state.entities.entities[state.entities.selected],
		selectedIndex: state.entities.selected,
		baseTiles: state.constants.baseTiles,
		tileSize: state.constants.tileSize
	}
}

export default connect(mapStateToProps, null, null, { withRef: true })(Map)
