import initialStore from "../initialStore.js";
import { UPDATE_DUPLICATION_CHECK } from "../actions.js";
import { UPDATE_USER } from "../actions.js";
import { UPDATE_HAS_CAPTCHA } from "../actions.js";
import { UPDATE_IS_DRAFT } from "../actions.js";
import { CREATE_QUESTION_IN_STORE } from "../actions.js";
import { UPDATE_QUESTION_VALUE } from "../actions.js";
import { REMOVE_QUESTION_IN_STORE } from "../actions.js";
import { TOGGLE_QUESTIONS_DELETION_STATUS } from "../actions.js";
import { UPDATE_MINIMUM_QUESTIONS_COUNT } from "../actions.js";
import { TOGGLE_ANSWERS_DELETION_STATUS_FOR_QUESTION } from "../actions.js";
import { UPDATE_MINIMUM_ANSWERS_COUNT_FOR_QUESTION } from "../actions.js";
import { UPDATE_ANSWER_VALUE_FOR_QUESTION } from "../actions.js";
import { REMOVE_ANSWER_VALUE_FOR_QUESTION } from "../actions.js";
import { UPDATE_MULTIPLE_ANSWERS_FOR_QUESTION } from "../actions.js";

let createPollForm = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialStore;
	}
	if (typeof(action) !== "object" || typeof(action.type) !== "string") {
		return state;
	}

	switch (action.type) {
		// Mise à jour du duplication check id
		case UPDATE_DUPLICATION_CHECK: 
			if (typeof(action.payload) === "number") {
				return Object.assign({}, state, {
					"createPollForm": Object.assign({}, state.createPollForm, {
						"duplicationCheckId": action.payload
					})
				});
			}
			break;

		// Mise à jour du userid ayant créé ce sondage
		case UPDATE_USER: 
			if (typeof(action.payload) === "number") {
				return Object.assign({}, state, {
					"createPollForm": Object.assign({}, state.createPollForm, {
						"userId": action.payload
					})
				});
			}
			break;

		// Met à jour la nécessité ou non d'un captcha pour le sondage
		case UPDATE_HAS_CAPTCHA:
			if (typeof(action.payload) === "boolean") {
				return Object.assign({}, state, {
					"createPollForm": Object.assign({}, state.createPollForm, {
						"hasCaptcha": action.payload
					})
				});
			}
			break;

		// Met à jour le statut du sondage
		case UPDATE_IS_DRAFT: 
			if (typeof(action.payload) === "boolean") {
				return Object.assign({}, state, {
					"createPollForm": Object.assign({}, state.createPollForm, {
						"isDraft": action.payload
					})
				});
			}
			break;

		// Creation de la question dans le store
		case CREATE_QUESTION_IN_STORE:
			if (typeof(action.payload) === "number") {
				let questions = state.createPollForm.questions;
				let index = questions.findIndex(function(item) {
					return item.position === action.payload;
				});
				if (index === -1) {
					questions.push({
						"question": "",
						"position": action.payload,
						"multipleAnswers": false,
						"answersDeletionAuthorized": false,
						"minimumAnswersCount": 2,
						"answers": []
					});
				}
				return Object.assign({}, state, {
					"createPollForm": Object.assign({}, state.createPollForm, {
						"questions": questions
					})
				});
			}
			break;

		// Mise à jour de la valeur d'une question
		case UPDATE_QUESTION_VALUE: 
			if (typeof(action.payload) === "object") {
				let payload = action.payload;
				if (typeof(payload.position) === "number" && typeof(payload.question) === "string") {
					let questions = state.createPollForm.questions;
					let index = questions.findIndex(function(item) {
						return item.position === payload.position;
					});
					if (index === -1) {
						questions.push({
							"question": payload.question,
							"position": payload.position,
							"multipleAnswers": false,
							"answersDeletionAuthorized": false,
							"minimumAnswersCount": 2,
							"answers": []
						});
					} else {
						questions[index].question = payload.question;
					}
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"questions": questions
						})
					});
				}
			}
			break;

		// Suppression d'une question
		case REMOVE_QUESTION_IN_STORE: 
			if (typeof(action.payload) === "number") {
				let questions = state.createPollForm.questions;
				let index = questions.findIndex(function(item) {
					return item.position === action.payload;
				});
				if (index !== -1) {
					questions.splice(index, 1);
				}
				return Object.assign({}, state, {
					"createPollForm": Object.assign({}, state.createPollForm, {
						"questions": questions
					})
				});
			}
			break;

		// Possibilité de supprimer ou non des questions
		case TOGGLE_QUESTIONS_DELETION_STATUS: 
			if (typeof(action.payload) === "boolean") {
				return Object.assign({}, state, {
					"createPollForm": Object.assign({}, state.createPollForm, {
						"questionsDeletionAuthorized": action.payload
					})
				});
			}
			break;

		// Nombre minimum de questions
		case UPDATE_MINIMUM_QUESTIONS_COUNT:
			if (typeof(action.payload) === "number") {
				return Object.assign({}, state, {
					"createPollForm": Object.assign({}, state.createPollForm, {
						"minimumQuestionsCount": action.payload
					})
				});
			}
			break;

		// Possibilité de supprimer des réponses pour une question
		case TOGGLE_ANSWERS_DELETION_STATUS_FOR_QUESTION:
			if (typeof(action.payload) === "object") {
				let payload = action.payload;
				if (typeof(payload.question) === "number" && typeof(payload.status) === "boolean") {
					let questions = state.createPollForm.questions;
					let index = questions.findIndex(function(item) {
						return item.position === payload.question;
					});
					if (index === -1) {
						questions.push({
							"question": "",
							"position": payload.question,
							"multipleAnswers": false,
							"answersDeletionAuthorized": payload.status,
							"minimumAnswersCount": 2,
							"answers": []
						});
					} else {
						questions[index].answersDeletionAuthorized = payload.status;
					}
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"questions": questions
						})
					});
				}
			}
			break;

		// Nombre minimum de réponses pour une question donnée
		case UPDATE_MINIMUM_ANSWERS_COUNT_FOR_QUESTION:
			if (typeof(action.payload) === "object") {
				let payload = action.payload;
				if (typeof(payload.question) === "number" && typeof(payload.value) === "number") {
					let questions = state.createPollForm.questions;
					let index = questions.findIndex(function(item) {
						return item.position === payload.question;
					});
					if (index === -1) {
						questions.push({
							"question": "",
							"position": payload.question,
							"multipleAnswers": false,
							"answersDeletionAuthorized": payload.status,
							"minimumAnswersCount": payload.value,
							"answers": []
						});
					} else {
						questions[index].minimumAnswersCount = payload.value;
					}
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"questions": questions
						})
					});
				}
			}
			break;

		// Ajout d'une réponse à une question
		case UPDATE_ANSWER_VALUE_FOR_QUESTION:
			if (typeof(action.payload) === "object") {
				let payload = action.payload;
				if (typeof(payload.question) === "number" && typeof(payload.position) === "number" && typeof(payload.answer) === "string") {
					let questions = state.createPollForm.questions;
					let indexQuestion = questions.findIndex(function(item) {
						return item.position === payload.question;
					});
					if (indexQuestion === -1) {
						let question = {
							"question": "",
							"position": payload.question,
							"multipleAnswers": false,
							"answersDeletionAuthorized": false,
							"minimumAnswersCount": 2,
							"answers": []
						};
						question.answers.push({
							"position": payload.position,
							"answer": payload.answer
						});
						questions.push(question);
					} else {
						if (typeof(questions[indexQuestion].answers) !== "object") {
							questions[indexQuestion].answers = [];
						}
						let answers = questions[indexQuestion].answers;
						let indexAnswer = answers.findIndex(function(item) {
							return item.position === payload.position;
						});
						if (indexAnswer === -1) {
							answers.push({
								"position": payload.position,
								"answer": payload.answer
							});
						} else {
							answers[indexAnswer].answer = payload.answer;
						}
						questions[indexQuestion].answers = answers;
					}
					return Object.assign({}, state, {
						"createPollForm": Object.assign({}, state.createPollForm, {
							"questions": questions
						})
					});
				}
			}
			break;

		// Suppression d'une réponse à une question
		case REMOVE_ANSWER_VALUE_FOR_QUESTION:
			if (typeof(action.payload) === "object") {
				let payload = action.payload;
				if (typeof(payload.question) === "number" && typeof(payload.position) === "number") {
					let questions = state.createPollForm.questions;
					let indexQuestion = questions.findIndex(function(item) {
						return item.position === payload.question;
					});
					if (indexQuestion !== -1) {
						if (typeof(questions[indexQuestion].answers) === "object") {
							let answers = questions[indexQuestion].answers;
								let indexAnswer = answers.findIndex(function(item) {
								return item.position === payload.position;
							});
							if (indexAnswer !== -1) {
								answers.splice(indexAnswer, 1);
							}
							questions[indexQuestion].answers = answers;
							return Object.assign({}, state, {
								"createPollForm": Object.assign({}, state.createPollForm, {
									"questions": questions
								})
							});
						}
					}
				}
			}
			break;

			// Réponses multiples pour une question
			case UPDATE_MULTIPLE_ANSWERS_FOR_QUESTION: 
				if (typeof(action.payload) === "object") {
					let payload = action.payload;
					if (typeof(payload.question) === "number" && typeof(payload.status) === "boolean") {
						let questions = state.createPollForm.questions;
						let index = questions.findIndex(function(item) {
							return item.position === payload.question;
						});
						if (index === -1) {
							questions.push({
								"question": "",
								"position": payload.question,
								"multipleAnswers": payload.status,
								"answersDeletionAuthorized": false,
								"minimumAnswersCount": 2,
								"answers": []
							});
						} else {
							questions[index].multipleAnswers = payload.status;
						}
						return Object.assign({}, state, {
							"createPollForm": Object.assign({}, state.createPollForm, {
								"questions": questions
							})
						});						
					}
				}
				break;
				
		default: 
			return state;
	}

	return state;
}

export default createPollForm;
