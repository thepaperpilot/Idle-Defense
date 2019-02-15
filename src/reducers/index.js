import util from './util'
import map from './map/map'
import shop from './shop/shop'
import wallet from './wallet/wallet'
import entities from './entities/entities'
import CONSTANTS_DEFAULTS from './constants'

const { combineReducers } = require('redux')

const constants = util.createReducer(CONSTANTS_DEFAULTS, {})

export default combineReducers({
	map,
	shop,
	wallet,
	entities,
	constants
})
