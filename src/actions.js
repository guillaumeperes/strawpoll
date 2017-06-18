// Actions disponibles sur le store

export const UPDATE_DUPLICATION_CHECK = "UPDATE_DUPLICATION_CHECK"; // Mise à jour du duplication check id
export const UPDATE_USER = "UPDATE_USER"; // Mise à jour de l'identifiant du créateur du sondage (s'il est connecté)
export const UPDATE_HAS_CAPTCHA = "UPDATE_HAS_CAPTCHA"; // Utilisation d'un captcha
export const UPDATE_IS_DRAFT = "UPDATE_IS_DRAFT"; // Brouillon
export const CREATE_QUESTION_IN_STORE = "CREATE_QUESTION_IN_STORE";
export const UPDATE_QUESTION_VALUE = "UPDATE_QUESTION_VALUE";
export const REMOVE_QUESTION_IN_STORE = "REMOVE_QUESTION_IN_STORE";
export const TOGGLE_QUESTIONS_DELETION_STATUS = "TOGGLE_QUESTIONS_DELETION_STATUS"; // Possibilité de supprimer des questions
export const UPDATE_MINIMUM_QUESTIONS_COUNT = "UPDATE_MINIMUM_QUESTIONS_COUNT"; // Nombre de questions
export const TOGGLE_ANSWERS_DELETION_STATUS_FOR_QUESTION = "TOGGLE_ANSWERS_DELETION_STATUS_FOR_QUESTION";
export const UPDATE_MINIMUM_ANSWERS_COUNT_FOR_QUESTION = "UPDATE_MINIMUM_ANSWERS_COUNT_FOR_QUESTION";
export const UPDATE_ANSWER_VALUE_FOR_QUESTION = "UPDATE_ANSWER_VALUE_FOR_QUESTION";
export const REMOVE_ANSWER_VALUE_FOR_QUESTION = "REMOVE_ANSWER_VALUE_FOR_QUESTION";
export const UPDATE_MULTIPLE_ANSWERS_FOR_QUESTION = "UPDATE_MULTIPLE_ANSWERS_FOR_QUESTION";

export function udpateDuplicationCheck(id) {
	if (typeof(id) === "number") {
		return {
			"type": UPDATE_DUPLICATION_CHECK,
			"payload": id
		};
	}
	return {};
}

export function updateUser(id) {
	if (typeof(id) === "number") {
		return {
			"type": UPDATE_USER,
			"payload": id
		};
	} 
	return {};
}

export function updateHasCaptcha(value) {
	if (typeof(value) === "boolean") {
		return {
			"type": UPDATE_HAS_CAPTCHA,
			"payload": value,
		};
	}
	return {};
}

export function updateIsDraft(value) {
	if (typeof(value) === "boolean") {
		return {
			"type": UPDATE_IS_DRAFT,
			"payload": value,
		};
	} 
	return {};
}

export function createQuestionInStore(position) {
	if (typeof(position) === "number") {
		return {
			"type": CREATE_QUESTION_IN_STORE,
			"payload": position
		};
	}
	return {};
}

export function updateQuestionValue(position, question) {
	if (typeof(position) === "number" && typeof(question) === "string") {
		return {
			"type": UPDATE_QUESTION_VALUE,
			"payload": {
				"position": position,
				"question": question
			}
		};
	}
	return {};
}

export function removeQuestionInStore(position) {
	if (typeof(position) === "number") {
		return {
			"type": REMOVE_QUESTION_IN_STORE,
			"payload": position
		};
	}
	return {};
}

export function toggleQuestionsDeletionStatus(status) {
	if (typeof(status) === "boolean") {
		return {
			"type": TOGGLE_QUESTIONS_DELETION_STATUS,
			"payload": status
		};
	}
	return {};
}

export function updateMinimumQuestionsCount(value) {
	if (typeof(value) === "number") {
		return {
			"type": UPDATE_MINIMUM_QUESTIONS_COUNT,
			"payload": value
		};
	}
	return {};
}

export function toggleAnswersDeletionStatusForQuestion(question, status) {
	if (typeof(question) === "number" && typeof(status) === "boolean") {
		return {
			"type": TOGGLE_ANSWERS_DELETION_STATUS_FOR_QUESTION,
			"payload": {
				"question": question,
				"status": status
			}
		};
	} 
	return {};
}

export function updateMinimumAnswersCountForQuestion(question, value) {
	if (typeof(question) === "number" && typeof(value) === "number") {
		return {
			"type": UPDATE_MINIMUM_ANSWERS_COUNT_FOR_QUESTION,
			"payload": {
				"question": question,
				"value": value
			}
		};
	}
	return {};
}

export function updateAnswerValueForQuestion(question, position, answer) {
	if (typeof(question) === "number" && typeof(position) === "number" && typeof(answer) === "string") {
		return {
			"type": UPDATE_ANSWER_VALUE_FOR_QUESTION,
			"payload": {
				"question": question,
				"position": position,
				"answer" : answer
			}
		};
	}
	return {};
}

export function removeAnswerValueForQuestion(question, position) {
	if (typeof(question) === "number" && typeof(position) === "number") {
		return {
			"type": REMOVE_ANSWER_VALUE_FOR_QUESTION,
			"payload": {
				"question": question,
				"position": position
			}
		};
	}
	return {};
}

export function updateMultipleAnswersForQuestion(question, status) {
	if (typeof(question) === "number" && typeof(status) === "boolean") {
		return {
			"type": UPDATE_MULTIPLE_ANSWERS_FOR_QUESTION,
			"payload": {
				"question": question,
				"status": status
			}
		};
	}
	return {};
}

export const CREATE_QUESTION_FOR_RESPONSE_IN_STORE = "CREATE_QUESTION_FOR_RESPONSE_IN_STORE";
export const ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE = "ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE";
export const REMOVE_ALL_ANSWERS_FOR_QUESTION_FOR_RESPONSE = "REMOVE_ALL_ANSWERS_FOR_QUESTION_FOR_RESPONSE";
export const REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE = "REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE";

export function createQuestionForResponseInStore(question, multipleAnswers) {
	if (typeof(question) === "number" && typeof(multipleAnswers) === "boolean") {
		return {
			"type": CREATE_QUESTION_FOR_RESPONSE_IN_STORE,
			"payload": {
				"question": question,
				"multipleAnswers": multipleAnswers
			}
		};
	}
	return {};
}

export function addAnswerForQuestionForResponse(question, answer) {
	if (typeof(question) === "number" && typeof(answer) === "number") {
		return {
			"type": ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE,
			"payload": {
				"question": question,
				"answer": answer
			}
		};
	}
	return {};
}

export function removeAllAnswersForQuestionForResponse(question) {
	if (typeof(question) === "number") {
		return {
			"type": REMOVE_ALL_ANSWERS_FOR_QUESTION_FOR_RESPONSE,
			"payload": question
		};
	}
	return {};
}

export function removeAnswerForQuestionForResponse(question, answer) {
	if (typeof(question) === "number" && typeof(answer) === "number") {
		return {
			"type": REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE,
			"payload": {
				"question": question,
				"answer": answer
			}
		};
	}
	return {};
}
