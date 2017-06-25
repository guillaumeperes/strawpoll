import initialStore from "../initialStore.js";
import { SET_EMAIL_FOR_LOGIN } from "../actions.js";
import { SET_PASSWORD_FOR_LOGIN } from "../actions.js";
import { REMOVE_LOGIN_DATA } from "../actions.js";

let loginForm = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialStore;
	}
	if (typeof(action) !== "object" || typeof(action.type) !== "string") {
		return state;
	}

	// Actions sur le store liées au formulaire de connexion

	if (action.type === SET_EMAIL_FOR_LOGIN) {
		if (typeof(action.payload) === "string") {
			return Object.assign({}, state, {
				"loginForm": Object.assign({}, state.loginForm, {
					"email": action.payload
				})
			});
		}
	} else if (action.type === SET_PASSWORD_FOR_LOGIN) {
		if (typeof(action.payload) === "string") {
			return Object.assign({}, state, {
				"loginForm": Object.assign({}, state.loginForm, {
					"password": action.payload
				})
			});
		}
	} else if (action.type === REMOVE_LOGIN_DATA) {
		return Object.assign({}, state, {
			"loginForm": {}
		});
	}

	return state;
};

export default loginForm;
