import initialStore from "../initialStore.js";
import { TOGGLE_SIGN_MODAL } from "../actions.js";

const signModal = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialStore;
	}
	if (typeof(action) !== "object" || typeof(action.type) !== "string") {
		return state;
	}

	// Actions sur le store lié au modal de connexion et d'inscription

	if (action.type === TOGGLE_SIGN_MODAL) {
		if (typeof(action.payload) === "boolean") {
			return Object.assign({}, state, {
				"signModal": Object.assign({}, state.signModal, {
					"opened": action.payload
				})
			});
		}
	}

	return state;
};

export default signModal;
