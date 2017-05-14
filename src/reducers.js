import { ANSWER_DELETION } from "./actions.js";
import { combineReducers } from "redux";

const initialState = {
	"answerDeletionEnabled": false
};

function answers(state, action) {
	if (typeof(state) === "undefined") {
		return initialState;
	}

	if (typeof(action) === "object") {
		switch (action.type) {
			case ANSWER_DELETION:
				if (typeof(action.payload) === "boolean") {
					return Object.assign({}, state, {
						"answerDeletionEnabled": action.payload
					});
				}
				break;
			default: 
				return state;
		}
	}

	return state;
}

export default combineReducers({
	answers
});
