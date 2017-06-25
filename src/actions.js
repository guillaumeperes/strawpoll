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
export const REMOVE_CREATE_POLL_DATA = "REMOVE_CREATE_POLL_DATA";

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

export function removeCreatePollData() {
	return {
		"type": REMOVE_CREATE_POLL_DATA,
		"payload": null
	};
}

export const CREATE_QUESTION_FOR_RESPONSE_IN_STORE = "CREATE_QUESTION_FOR_RESPONSE_IN_STORE";
export const ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE = "ADD_ANSWER_FOR_QUESTION_FOR_RESPONSE";
export const REMOVE_ALL_ANSWERS_FOR_QUESTION_FOR_RESPONSE = "REMOVE_ALL_ANSWERS_FOR_QUESTION_FOR_RESPONSE";
export const REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE = "REMOVE_ANSWER_FOR_QUESTION_FOR_RESPONSE";
export const REMOVE_RESPONSE_DATA = "REMOVE_RESPONSE_DATA";

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

export function removeResponseData() {
	return {
		"type": REMOVE_RESPONSE_DATA,
		"payload": null
	};
}

export const TOGGLE_SIGN_MODAL = "TOGGLE_SIGN_MODAL";
export const NAVIGATE_SIGN_MODAL = "NAVIGATE_SIGN_MODAL";

export function openSignModal() {
	return {
		"type": TOGGLE_SIGN_MODAL,
		"payload": true
	};
}

export function closeSignModal() {
	return {
		"type": TOGGLE_SIGN_MODAL,
		"payload": false
	};
}

export function navigateSignModal(section) {
	if (typeof(section) === "string") {
		return {
			"type": NAVIGATE_SIGN_MODAL,
			"payload": section
		};
	}
	return {};
}

export const SET_EMAIL_FOR_LOGIN = "SET_EMAIL_FOR_LOGIN";
export const SET_PASSWORD_FOR_LOGIN = "SET_PASSWORD_FOR_LOGIN";
export const REMOVE_LOGIN_DATA = "REMOVE_LOGIN_DATA";

export function setEmailForLogin(email) {
	if (typeof(email) === "string") {
		return {
			"type": SET_EMAIL_FOR_LOGIN,
			"payload": email
		};
	}
	return {};
}

export function setPasswordForLogin(password) {
	if (typeof(password) === "string") {
		return {
			"type": SET_PASSWORD_FOR_LOGIN,
			"payload": password
		};
	};
	return {};
}

export function removeLoginData() {
	return {
		"type": REMOVE_LOGIN_DATA,
		"payload": null
	};
}

export const SET_EMAIL_FOR_REGISTER = "SET_EMAIL_FOR_REGISTER";
export const SET_PASSWORD_FOR_REGISTER = "SET_PASSWORD_FOR_REGISTER";
export const SET_PASSWORD_CONFIRMATION_FOR_REGISTER = "SET_PASSWORD_CONFIRMATION_FOR_REGISTER";
export const REMOVE_REGISTER_DATA = "REMOVE_REGISTER_DATA";

export function setEmailForRegister(email) {
	if (typeof(email) === "string") {
		return {
			"type": SET_EMAIL_FOR_REGISTER,
			"payload": email
		};
	}
	return {};
}

export function setPasswordForRegister(password) {
	if (typeof(password) === "string") {
		return {
			"type": SET_PASSWORD_FOR_REGISTER,
			"payload": password
		};
	};
	return {};
}

export function setPasswordConfirmationForRegister(confirmation) {
	if (typeof(confirmation) === "string") {
		return {
			"type": SET_PASSWORD_CONFIRMATION_FOR_REGISTER,
			"payload": confirmation
		};
	};
	return {};
}

export function removeRegisterData() {
	return {
		"type": REMOVE_REGISTER_DATA,
		"payload": null
	};
}

export const SET_USER_TOKEN = "SET_USER_TOKEN";

export function setUserToken(token) {
	if (typeof(token) === "string") {
		return {
			"type": SET_USER_TOKEN,
			"payload": token
		};
	}
	return {};
}
