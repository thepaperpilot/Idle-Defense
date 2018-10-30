import React, { Component } from 'react'
import { connect } from 'react-redux'

class RouteFinder extends Component {
	constructor(props) {
		super(props)

		this.componentWillReceiveProps(props)
	}

	componentWillReceiveProps(newProps) {
		const { width, height, tiles, base, spawn, baseTiles }
			= newProps

		// Do a quick little bfs to find the optimal path
		const spawnNode = { index: spawn, path: [ spawn ] }
		const visited = [ spawnNode ], visiting = [ spawnNode ]

		const isWalkable = index => {
			if (visited.some(n => n.index === index))
				return false

			if (index in tiles) {
				return 'walkable' in tiles[index] ?
					tiles[index].walkable :
					baseTiles[tiles[index].base].walkable
			}

			return baseTiles.default.walkable
		}

		while (visiting.length) {
			const curr = visiting.splice(0, 1)[0]
			if (curr.index === base) {
				newProps.dispatch({
					type: 'SET_PATH',
					path: curr.path
				})
				break
			}

			const x = curr.index % width
			const y = Math.floor(curr.index / width)

			// Left
			let index = curr.index - 1
			if (x > 0 && isWalkable(index)) {
				const node = { index, path: [...curr.path, index] }
				visiting.push(node)
				visited.push(node)
			}
			// Right
			index = curr.index + 1
			if (x < width - 1 && isWalkable(index)) {
				const node = { index, path: [...curr.path, index] }
				visiting.push(node)
				visited.push(node)
			}
			// Up
			index = curr.index - width
			if (y > 0 && isWalkable(index)) {
				const node = { index, path: [...curr.path, index] }
				visiting.push(node)
				visited.push(node)
			}
			// Down
			index = curr.index + width
			if (y < height - 1 && isWalkable(index)) {
				const node = { index, path: [...curr.path, index] }
				visiting.push(node)
				visited.push(node)
			}
		}
	}

	render() {
		return null
	}
}

function mapStateToProps(state, props) {
	const {width, height, tiles, base, spawn} = props.map || state.map
	return {
		baseTiles: state.constants.baseTiles,
		width,
		height,
		tiles,
		base,
		spawn
	}
}

export default connect(mapStateToProps)(RouteFinder)
