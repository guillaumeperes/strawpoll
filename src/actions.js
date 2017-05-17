// Types d'actions

export const ANSWER_DELETION = "ANSWER_DELETION"; // Suppression des champs de réponse
export const SET_QUESTION_VALUE = "SET_QUESTION_VALUE"; // Mise à jour de la valeur de la question
export const UPDATE_ANSWER_VALUE = "ADD_ANSWER_VALUE"; // Mise à jour de la valeur d'une réponse
export const REMOVE_ANSWER_VALUE = "REMOVE_ANSWER_VALUE"; // Suppression de la valeur d'une réponse
export const UPDATE_DUPLICATION_CHECK = "UPDATE_DUPLICATION_CHECK"; // Duplication check id
export const UPDATE_USER = "UPDATE_USER"; // Mise à jour de l'identifiant du créateur du sondage (s'il est connecté)
export const UPDATE_HAS_CAPTCHA = "UPDATE_HAS_CAPTCHA"; // Utilisation d'un captcha
export const UPDATE_MULTIPLE_ANSWERS = "UPDATE_MULTIPLE_ANSWERS"; // Sélection de plusieurs réponses sur un sondage
export const UPDATE_IS_DRAFT = "UPDATE_IS_DRAFT"; // Brouillon

// Déclencheurs

export function toggleAnswerDeletionStatus(newStatus) {
	if (typeof(newStatus) === "boolean") {
		return {
			"type": ANSWER_DELETION,
			"payload": newStatus
		};
	}
}

export function setQuestionValue(question) {
	if (typeof(question) === "string") {
		return {
			"type": SET_QUESTION_VALUE,
			"payload": question
		};
	}
}

export function updateAnswerValue(position, answer) {
	if (typeof(position) === "number" && typeof(answer) === "string") {
		return {
			"type": UPDATE_ANSWER_VALUE,
			"payload": {
				"position": position,
				"answer": answer
			}
		};
	}
}

export function removeAnswerValue(position) {
	if (typeof(position) === "number") {
		return {
			"type": REMOVE_ANSWER_VALUE,
			"payload": position
		};
	}
}

export function udpateDuplicationCheck(id) {
	if (typeof(id) === "number") {
		return {
			"type": UPDATE_DUPLICATION_CHECK,
			"payload": id
		};
	}
}

export function updateUser(id) {
	if (typeof(id) === "number") {
		return {
			"type": UPDATE_USER,
			"payload": id
		};
	}
}

export function updateHasCaptcha(value) {
	if (typeof(value) === "boolean") {
		return {
			"type": UPDATE_HAS_CAPTCHA,
			"payload": value,
		};
	}
}

export function updateMultipleAnswers(value) {
	if (typeof(value) === "boolean") {
		return {
			"type": UPDATE_MULTIPLE_ANSWERS,
			"payload": value,
		};
	}
}

export function updateIsDraft(value) {
	if (typeof(value) === "boolean") {
		return {
			"type": UPDATE_IS_DRAFT,
			"payload": value,
		};
	}
}
