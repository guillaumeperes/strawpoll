import createPollForm from "./reducers/createPollForm.js";
import respondPollForm from "./reducers/respondPollForm.js";
import loginForm from "./reducers/loginForm.js";
import registerForm from "./reducers/registerForm.js";
import { combineReducers } from "redux";

export default combineReducers({
	createPollForm,
	respondPollForm,
	loginForm,
	registerForm
});
