import { ANSWER_DELETION } from "./actions.js";
import { SET_QUESTION_VALUE } from "./actions.js";
import { UPDATE_ANSWER_VALUE } from "./actions.js";
import { REMOVE_ANSWER_VALUE } from "./actions.js";
import { UPDATE_DUPLICATION_CHECK } from "./actions.js";
import { UPDATE_USER } from "./actions.js";
import { UPDATE_HAS_CAPTCHA } from "./actions.js";
import { UPDATE_MULTIPLE_ANSWERS } from "./actions.js";
import { UPDATE_IS_DRAFT } from "./actions.js";
import { combineReducers } from "redux";

// valeur initiale du store

const initialState = {
	"answerDeletionEnabled": false,
	"createPollForm": {
		"duplicationCheckId": false,
		"userId": false,
		"hasCaptcha": false,
		"multipleAnswers": false,
		"isDraft": false,
		"question": "",
		"answers": []
	}
};

// actions sur le store

let answers = function(state, action) {
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

let createPollForm = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialState;
	}

	if (typeof(action) === "object") {
		switch(action.type) {
			case SET_QUESTION_VALUE:
				if (typeof(action.payload) === "string") {
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"question": action.payload
						}) 
					});
				}
				break;
			case UPDATE_ANSWER_VALUE:
				if (typeof(action.payload) === "object") {
					let payload = action.payload;
					if (typeof(payload.position) === "number" && typeof(payload.answer) === "string") {
						let answers = state.createPollForm.answers;
						let index = answers.findIndex(function(item) {
							return item.position === payload.position;
						});
						if (index === -1) {
							answers.push(payload);
						} else {
							answers[index].answer = payload.answer;
						}
						return Object.assign({}, state, {
							"createPollForm": Object.assign({}, state.createPollForm, {
								"answers": answers
							})
						});
					}
				}
				break;
			case REMOVE_ANSWER_VALUE: 
				if (typeof(action.payload) === "number") {
					let answers = state.createPollForm.answers;
					let index = answers.findIndex(function(item) {
						return item.position === action.payload;
					});
					if (index !== -1) {
						answers.splice(index, 1);
					}
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"answers": answers
						})
					});
				}
				break;
			case UPDATE_DUPLICATION_CHECK:
				if (typeof(action.payload) === "number") {
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"duplicationCheckId": action.payload
						})
					});
				}
				break;
			case UPDATE_USER:
				if (typeof(action.payload) === "number") {
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"userId": action.payload
						})
					});
				}
				break;
			case UPDATE_HAS_CAPTCHA:
				if (typeof(action.payload) === "boolean") {
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"hasCaptcha": action.payload
						})
					});
				}
				break;
			case UPDATE_MULTIPLE_ANSWERS:
				if (typeof(action.payload) === "boolean") {
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"multipleAnswers": action.payload
						})
					});
				}
				break;
			case UPDATE_IS_DRAFT:
				if (typeof(action.payload) === "boolean") {
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"isDraft": action.payload
						})
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
	answers,
	createPollForm
});
