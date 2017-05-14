// Types d'actions

export const ANSWER_DELETION = "ANSWER_DELETION";

// Déclencheurs

export function toggleAnswerDeletionStatus(newStatus) {
	if (typeof(newStatus) === "boolean") {
		return {
			"type": ANSWER_DELETION,
			"payload": newStatus
		};
	}
}
