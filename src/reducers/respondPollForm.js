import initialStore from "../initialStore.js";

let respondPollForm = function(state, action) {
	if (typeof(state) === "undefined") {
		return initialStore;
	}

	if (typeof(action) === "object") {
		switch (action.type) {

		}
	}

	return state;
}

export default respondPollForm;
