const util = require('./../util')

export const DEFAULTS = {
	towers: [
		{
			image: 'coin',
			name: 'Basic Tower',
			range: 200,
			cost: {
				mana: 10,
				bones: 1
			}
		},
		{
			image: 'diamond',
			name: 'Advanced Tower',
			range: 250,
			cost: {
				mana: 100,
				bones: 1
			}
		}
	],
	selected: null
}

function selectShopTower(state, action) {
	return util.updateObject(state, {
		selected: JSON.stringify(state.selected) === JSON.stringify(action.tower) ? null : action.tower
	})
}

function placeTower(state, action) {
	return action.shiftKey ? state : util.updateObject(state, { selected: null })
}

export default util.createReducer(DEFAULTS, {
	'SELECT_SHOP_TOWER': selectShopTower,
	'PURCHASE_TOWER': placeTower
})
