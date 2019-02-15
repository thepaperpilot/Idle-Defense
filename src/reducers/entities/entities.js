import util from './../util'

export const DEFAULTS = {
	entities: [],
	selected: null,
	isSelecting: false,
}

function loadMap() {
	return DEFAULTS
}

function selectEntity(state, action) {
	return util.updateObject(state, {
		isSelecting: action.index !== null,
		selected: action.index
	})
}

function addEntities(state, action) {
	return util.updateObject(state, {
		entities: [...state.entities, ...action.entities]
	})
}

function removeEntity(state, action) {
	return util.updateObject(state, {
		entities: [...state.entities.slice(0, action.index),
			...state.entities.slice(action.index + 1)],
		selected: action.index === state.selected ? null : action.index < state.selected ? state.selected - 1 : state.selected,
		isSelecting: action.index === state.selected ? false : state.isSelecting
	})
}

export default util.createReducer(DEFAULTS, {
	'LOAD_MAP': loadMap,
	'SELECT_ENTITY': selectEntity,
	'ADD_ENTITIES': addEntities,
	'REMOVE_ENTITY': removeEntity
})