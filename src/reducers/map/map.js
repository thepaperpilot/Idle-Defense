import util from './../util'
import constants from './../constants'

/*
// TODO map selection
export const DEFAULTS = {
	null
}
*/

// Temporary!
export const DEFAULTS = {
	"width": 20,
	"height": 9,
	"spawn": 0,
	"base": 159,
	"wave": 0,
	"tiles": {
		"0": {
			"base": "walkable",
			"hasEntity": true
		},
		"1": {
			"base": "walkable"
		},
		"2": {
			"base": "walkable"
		},
		"22": {
			"base": "walkable"
		},
		"42": {
			"base": "walkable"
		},
		"62": {
			"base": "walkable"
		},
		"82": {
			"base": "walkable"
		},
		"102": {
			"base": "walkable"
		},
		"122": {
			"base": "walkable"
		},
		"123": {
			"base": "walkable"
		},
		"124": {
			"base": "walkable"
		},
		"125": {
			"base": "walkable"
		},
		"126": {
			"base": "walkable"
		},
		"127": {
			"base": "walkable"
		},
		"128": {
			"base": "walkable"
		},
		"129": {
			"base": "walkable"
		},
		"130": {
			"base": "default",
			"images": [
			"rock-1"
			]
		},
		"149": {
			"base": "walkable"
		},
		"150": {
			"base": "walkable"
		},
		"151": {
			"base": "walkable",
			"hasEntity": true
		},
		"152": {
			"base": "walkable"
		},
		"153": {
			"base": "walkable"
		},
		"154": {
			"base": "walkable"
		},
		"155": {
			"base": "walkable"
		},
		"156": {
			"base": "walkable"
		},
		"157": {
			"base": "walkable"
		},
		"158": {
			"base": "walkable"
		},
		"159": {
			"base": "walkable",
			"hasEntity": true
		}
	},
	"towers": [],
	"waves": [
		{
			"enemy": "normal",
			"amount": 1,
			"delay": 2500,
			"id": 0,
			"modifiers": {
				"speed": 5
			}
		},
		{
			"enemy": "normal",
			"amount": 5,
			"delay": 2500,
			"id": 1
		}
	],
	"path": [],
	"lives": 10
}

export const EMPTY = {
	width: 1,
	height: 1,
	spawn: 0,
	base: 0,
	wave: 0,
	tiles: {},
	towers: [],
	waves: [],
	path: [],
	lives: 10
}

function loadMap(state, action) {
	return util.updateObject(EMPTY, action.map)
}

function placeTower(state, action) {
	// Update tile so it knows it has an entity on it
	const tile = util.updateObject(state.tiles[action.index] || { base: 'default' }, {
		hasEntity: true
	})
	const tiles = util.updateObject(state.tiles, { [action.index]: tile })

	// Add our tower entity
	const x = ((action.index % state.width) + .5) * constants.tileSize
	const y = (Math.floor(action.index / state.width) + .5) * constants.tileSize
	const towers = [...state.towers, {
		x, y,
		...action.placing
	}]

	return util.updateObject(state, { tiles, towers })
}

function addTile(state, action) {
	const images = [...(state.tiles[action.index] || { base: 'default' }).images || [], action.image]
	const tile = util.updateObject(state.tiles[action.index] || { base: 'default' }, {
		images,
		buildable: false,
		walkable: false
	})
	const tiles = util.updateObject(state.tiles, { [action.index]: tile })

	return util.updateObject(state, { tiles })
}

function toggleWalkable(state, action) {
	const tile = util.updateObject(state.tiles[action.index] || { }, {
		base: state.tiles[action.index] &&
		state.tiles[action.index].base === 'walkable' ? 'default' : 'walkable'
	})
	const tiles = util.updateObject(state.tiles, { [action.index]: tile })
	if (JSON.stringify(tiles[action.index]) === '{"base":"default"}')
		delete tiles[action.index]

	return util.updateObject(state, { tiles })
}

function clearTile(state, action) {
	if (action.index in state.tiles) {
		const tiles = util.updateObject(state.tiles, {
			[action.index]: { base: state.tiles[action.index].base }
		})
		if (tiles[action.index].base === 'default')
			delete tiles[action.index]

		return util.updateObject(state, { tiles })
	} else return state
}

function editColumns(state, action) {
	const diff = action.value - state.width
	if (diff === 0) return state

		const tiles = Object.keys(state.tiles).reduce((acc, curr) => {
			curr = parseInt(curr, 10)
		// Remove tile if its been cut off
		if (curr % state.width >= action.value)
			return acc

		// Change the index if its been moved by the change
		const row = Math.floor(curr / state.width)
		acc[curr + diff * row] = state.tiles[curr]
		return acc
	}, {})

	// Change special entities for new size
	const entities = constants.specialEntities.reduce((acc, curr) => {
		// Add entity
		acc[curr] = Math.floor(state[curr] / state.width) * action.value + // Row
			Math.min(state[curr] % state.width, action.value - 1) // Column

		// Mark the tile as having an entity on it
		// (this should only ever do something when the special entity was
		//  pushed left due to the width shrinking)
		tiles[acc[curr]] = util.updateObject(tiles[acc[curr]] || { base: 'default' }, {
			hasEntity: true
		})

		return acc
	}, {})

	return util.updateObject(state, {
		tiles,
		width: action.value,
		...entities
	})
}

function editMap(state, action) {
	if (action.key === 'width')
		return editColumns(state, action)
	return util.updateObject(state, { [action.key]: action.value })
}

function placeSpecialEntity(state, action) {
	// Mark tile its on as having an entity on it
	const tile = util.updateObject(state.tiles[action.value] || { base: 'default' }, {
		hasEntity: true
	})
	const tiles = util.updateObject(state.tiles, { [action.value]: tile })
	state = util.updateObject(state, { tiles })

	// Store location of special entity in map
	return editMap(state, action)
}

function openLevelEditor() {
	return DEFAULTS
}

function printMap(state) {
	console.log(JSON.stringify(state))
	return state
}

function saveWave(state, action) {
	const { enemy, amount, boundToNextWave, id } = action
	const wave = { enemy, amount, boundToNextWave, id }
	console.log(action)

	let waves
	if (state.waves[action.id]) {
		waves = state.waves.slice()
		waves[waves.findIndex(w => w.id === id)] = wave
	} else {
		waves = [...state.waves, wave]
	}

	return util.updateObject(state, { waves })
}

function moveWave(state, action) {
	const waves = state.waves.slice()
	const t = waves[action.dragIndex]
	waves[action.dragIndex] = waves[action.moveIndex]
	waves[action.moveIndex] = t

	return util.updateObject(state, { waves })
}

function deleteWave(state, action) {
	const waves = state.waves.slice()
	waves.splice(action.index, 1)

	return util.updateObject(state, { waves })
}

function setPath(state, action) {
	return util.updateObject(state, { path: action.path })
}

function nextWave(state, action) {
	return util.updateObject(state, {
		wave: state.wave + 1
	})
}

function loseLife(state, action) {
	return util.updateObject(state, {
		lives: state.lives - 1
	})
}

export default util.createReducer(DEFAULTS, {
	'LOAD_MAP': loadMap,
	'PURCHASE_TOWER': placeTower,
	'PLACE_TILE': addTile,
	'TOGGLE_WALKABLE': toggleWalkable,
	'CLEAR_TILE': clearTile,
	'EDIT_MAP': editMap,
	'PLACE_SPECIAL_ENTITY': placeSpecialEntity,
	'OPEN_LEVEL_EDITOR': openLevelEditor,
	'PRINT_MAP': printMap,
	'SAVE_WAVE': saveWave,
	'MOVE_WAVE': moveWave,
	'DELETE_WAVE': deleteWave,
	'SET_PATH': setPath,
	'NEXT_WAVE': nextWave,
	'LOSE_LIFE': loseLife
})
