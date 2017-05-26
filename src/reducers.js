import createPollForm from "./reducers/createPollForm.js";
import respondPollForm from "./reducers/respondPollForm.js";
import { combineReducers } from "redux";

export default combineReducers({
	createPollForm,
	respondPollForm
});
