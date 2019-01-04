import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'pixi.js'
import GameLoop from './../gameLoop/GameLoop'
import Entity from './EntityBase'
import SpecialEntity from './SpecialEntity'
import Tower from './../towers/Tower'
import Enemy from './../enemies/Enemy'

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

		let entities = []

		entities = [...this.props.entities.map(entity => {
			switch (entity.type) {
				case 'tower': return new Tower(entity)
				case 'enemy': return new Enemy(entity)
				default: return null
			}
		})]

		entities = [...entities, ...this.props.specialEntities.map(entity => {
			switch (entity.key) {
				case 'base': return new SpecialEntity({...entity, image: 'flag'})
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
		const oldEntity = this.state.entities.find(e => e.id === this.props.selected)
		if (oldEntity)
			oldEntity.deselect()

		const newEntity = this.state.entities.find(e => e.id === newProps.selected)
		if (newEntity)
			newEntity.select()
	}

	addEntities(...entities) {
		entities.forEach(entity =>
			this.props.stage.addChild(entity.sprite))
		this.setState({
			entities: [...this.state.entities, ...entities]
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
		entities: map.entities,
		path: map.path,
		selected: map.isSelecting ? map.selected : -1,
		baseTiles: state.constants.baseTiles,
		tileSize: state.constants.tileSize
	}
}

export default connect(mapStateToProps)(Map)
