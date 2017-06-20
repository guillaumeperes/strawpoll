import initialStore from "../initialStore.js";
import { SET_EMAIL_FOR_REGISTER } from "../actions.js";
import { SET_PASSWORD_FOR_REGISTER } from "../actions.js";
import { SET_PASSWORD_CONFIRMATION_FOR_REGISTER } from "../actions.js";

let registerForm = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialStore;
	}
	if (typeof(action) !== "object" || typeof(action.type) !== "string") {
		return state;
	}

	// Actions sur le store liées au formulaire d'inscription

	if (action.type === SET_EMAIL_FOR_REGISTER) {
		if (typeof(action.payload) === "string") {
			return Object.assign({}, state, {
				"registerForm": Object.assign({}, state.registerForm, {
					"email": action.payload
				})
			});
		}
	} else if (action.type === SET_PASSWORD_FOR_REGISTER) {
		if (typeof(action.payload) === "string") {
			return Object.assign({}, state, {
				"registerForm": Object.assign({}, state.registerForm, {
					"password": action.payload
				})
			});
		}
	} else if (action.type === SET_PASSWORD_CONFIRMATION_FOR_REGISTER) {
		if (typeof(action.payload) === "string") {
			return Object.assign({}, state, {
				"registerForm": Object.assign({}, state.registerForm, {
					"confirmation": action.payload
				})
			});
		}
	}

	return state;
};

export default registerForm;
