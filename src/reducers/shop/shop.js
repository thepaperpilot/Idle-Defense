const util = require('./../util')

// Fire interval is based on # of ticks - there are 60 ticks per second
export const DEFAULTS = {
	towers: [
		{
			image: 'coin',
			name: 'Basic Tower',
			range: 210,
			rotSpeed: Math.PI / 50,
			fireInterval: 45,
			damage: 2,
			cost: {
				mana: 10,
				bones: 1
			}
		},
		{
			image: 'diamond',
			name: 'Advanced Tower',
			range: 240,
			rotSpeed: Math.PI / 100,
			fireInterval: 60,
			damage: 3,
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
