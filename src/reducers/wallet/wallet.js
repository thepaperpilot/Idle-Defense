const util = require('./../util')

export const DEFAULTS = {
	mana: 10,
	bones: 1
}

function purchase(state, action) {
	const costs = Object.keys(action.cost).reduce((acc, curr) => {
		acc[curr] = state[curr] - action.cost[curr]
		return acc
	}, {})
	return util.updateObject(state, costs)
}

export default util.createReducer(DEFAULTS, {
	'PURCHASE_TOWER': purchase
})
