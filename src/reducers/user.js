import initialStore from "../initialStore.js";
import { SET_USER_TOKEN } from "../actions.js";

const user = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialStore;
	}
	if (typeof(action) !== "object" || typeof(action.type) !== "string") {
		return state;
	}

	// Actions sur le store lié aux utilisateurs

	if (action.type === SET_USER_TOKEN) {
		if (typeof(action.payload) === "string") {
			return Object.assign({}, state, {
				"user": Object.assign({}, state.user, {
					"token": action.payload
				})
			});
		}
	}

	return state;
};

export default user;
