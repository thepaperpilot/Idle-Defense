exports.createReducer = function(initialState, handlers, fallback) {
	return (state = initialState, action) => {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		} else {
			return fallback ? fallback(state, action) : state
		}
	}
}

exports.updateObject = function(oldObject, newValues) {
	return Object.assign({}, oldObject, newValues)
}
