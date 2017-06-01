import initialStore from "../initialStore.js";
import { CREATE_QUESTION_FOR_RESPONSE_IN_STORE } from "../actions.js";
import { ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE } from "../actions.js";
import { REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE } from "../actions.js";

let respondPollForm = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialStore;
	}
	if (typeof(action) !== "object" || typeof(action.type) !== "string") {
		return state;
	}

	switch (action.type) {
		// Ajout d'une question à laquelle il faut répondre
		case CREATE_QUESTION_FOR_RESPONSE_IN_STORE:
			if (typeof(action.payload) === "object") {
				let payload = action.payload;
				if (typeof(payload.question) === "number" && typeof(payload.multipleAnswers) === "boolean") {
					let questions = state.respondPollForm.questions;
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
					return Object.assign({}, state, {
						"respondPollForm": Object.assign({}, state.respondPollForm, {
							"questions": questions
						})
					});
				}
			}
			break;

		// Ajout d'un vote à une question
		case ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE:
			if (typeof(action.payload) === "object") {
				let payload = action.payload;
				if (typeof(payload.question) === "number" && typeof(payload.answer) === "number") {
					let questions = state.respondPollForm.questions;
					let indexQuestion = questions.findIndex(function(question) {
						return question.id === payload.question;
					});
					if (indexQuestion !== -1) {
						let indexAnswer = questions[indexQuestion].answers.findIndex(function(answer) {
							return answer === payload.answer;
						});
						if (indexAnswer === -1) {
							questions[indexQuestion].answers.push(payload.answer);
							return Object.assign({}, state, {
								"respondPollForm": Object.assign({}, state.respondPollForm, {
									"questions": questions
								})
							});
						}
					}
				}
			}
			break;

		// Suppression d'un vote pour une réponse
		case REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE:
			if (typeof(action.payload) === "object") {
				let payload = action.payload;
				if (typeof(payload.question) === "number" && typeof(payload.answer) === "number") {
					let questions = state.respondPollForm.questions;
					let indexQuestion = questions.findIndex(function(question) {
						return question.id === payload.question;
					});
					if (indexQuestion !== -1) {
						let indexAnswer = questions[indexQuestion].answers.findIndex(function(answer) {
							return answer === payload.answer;
						});
						if (indexAnswer !== -1) {
							questions[indexQuestion].answers.splice(indexAnswer, 1);
							return Object.assign({}, state, {
								"respondPollForm": Object.assign({}, state.respondPollForm, {
									"questions": questions
								})
							});
						}
					}
				}
			}
			break;

		default:
			return state;
	}

	return state;
}

export default respondPollForm;
