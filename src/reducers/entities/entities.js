import util from './../util'

export const DEFAULTS = {
	entities: [],
	selected: null,
	isSelecting: false,
	enemiesLeft: 0
}

function loadMap() {
	return DEFAULTS
}

function selectEntity(state, action) {
	const selected = state.entities.find(e => e.id === action.id)
	return util.updateObject(state, {
		isSelecting: action.id != null,
		selected
	})
}

function addEntities(state, action) {
	return util.updateObject(state, {
		entities: [...state.entities, ...action.entities],
		enemiesLeft: state.enemiesLeft + action.entities.reduce((acc, curr) => curr.type.includes('Enemy') ? acc + 1 : acc, 0)
	})
}

function removeEntity(state, action) {
	const entities = state.entities.filter(e => e.id !== action.id)
	const selected = state.selected && entities.find(e => e.id === state.selected.id)
	const isSelecting = selected != null
	const enemiesLeft = state.entities.find(e => e.id === action.id).type.includes('Enemy')
		? state.enemiesLeft - 1 
		: state.enemiesLeft

	return util.updateObject(state, { entities, selected, isSelecting, enemiesLeft })
}

export default util.createReducer(DEFAULTS, {
	'LOAD_MAP': loadMap,
	'SELECT_ENTITY': selectEntity,
	'ADD_ENTITIES': addEntities,
	'REMOVE_ENTITY': removeEntity
})