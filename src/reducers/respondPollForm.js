import initialStore from "../initialStore.js";
import { CREATE_QUESTION_FOR_RESPONSE_IN_STORE } from "../actions.js";
import { ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE } from "../actions.js";
import { REMOVE_ALL_ANSWERS_FOR_QUESTION_FOR_RESPONSE } from "../actions.js";
import { REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE } from "../actions.js";

let respondPollForm = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialStore;
	}
	if (typeof(action) !== "object" || typeof(action.type) !== "string") {
		return state;
	}

	// Actions sur le store liées au formulaire de réponse

	if (action.type === CREATE_QUESTION_FOR_RESPONSE_IN_STORE) {
		// Ajout d'une question à laquelle il faut répondre
		let questions = state.respondPollForm.questions;
		if (typeof(action.payload) === "object") {
			let payload = action.payload;
			if (typeof(payload.question) === "number" && typeof(payload.multipleAnswers) === "boolean") {
				let index = questions.findIndex(function(question) {
					return question.id === payload.question;
				});
				if (index === -1) {
					questions.push({
						"id": payload.question,
						"multipleAnswers": payload.multipleAnswers,
						"answers": []
					});
				}
			}
		}
		return Object.assign({}, state, {
			"respondPollForm": Object.assign({}, state.respondPollForm, {
				"questions": questions
			})
		});
	} else if (action.type === ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE) {
		// Ajout d'un vote à une question
		let questions = state.respondPollForm.questions;
		if (typeof(action.payload) === "object") {
		let payload = action.payload;
			if (typeof(payload.question) === "number" && typeof(payload.answer) === "number") {
				let indexQuestion = questions.findIndex(function(question) {
					return question.id === payload.question;
				});
				if (indexQuestion !== -1) {
					let indexAnswer = questions[indexQuestion].answers.findIndex(function(answer) {
						return answer === payload.answer;
					});
					if (indexAnswer === -1) {
						questions[indexQuestion].answers.push(payload.answer);
					}
				}
			}
		}
		return Object.assign({}, state, {
			"respondPollForm": Object.assign({}, state.respondPollForm, {
				"questions": questions
			})
		});
	} else if (action.type === REMOVE_ALL_ANSWERS_FOR_QUESTION_FOR_RESPONSE) {
		// Suppression de tous les votes d'une question
		let questions = state.respondPollForm.questions;
		if (typeof(action.payload) === "number") {
			let index = questions.findIndex(function(question) {
				return question.id === action.payload;
			});
			if (index !== -1) {
				questions[index].answers = [];
			}
		}
		return Object.assign({}, state, {
			"respondPollForm": Object.assign({}, state.respondPollForm, {
				"questions": questions
			})
		});
	} else if (action.type === REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE) {
		// Suppression d'un vote pour une réponse
		let questions = state.respondPollForm.questions;
		if (typeof(action.payload) === "object") {
			let payload = action.payload;
			if (typeof(payload.question) === "number" && typeof(payload.answer) === "number") {
				let indexQuestion = questions.findIndex(function(question) {
					return question.id === payload.question;
				});
				if (indexQuestion !== -1) {
					let indexAnswer = questions[indexQuestion].answers.findIndex(function(answer) {
						return answer === payload.answer;
					});
					if (indexAnswer !== -1) {
						questions[indexQuestion].answers.splice(indexAnswer, 1);
					}
				}
			}
		}
		return Object.assign({}, state, {
			"respondPollForm": Object.assign({}, state.respondPollForm, {
				"questions": questions
			})
		});
	}

	return state;
}

export default respondPollForm;
