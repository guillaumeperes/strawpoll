import createPollForm from "./reducers/createPollForm.js";
import respondPollForm from "./reducers/respondPollForm.js";
import loginForm from "./reducers/loginForm.js";
import registerForm from "./reducers/registerForm.js";
import user from "./reducers/user.js";
import signModal from "./reducers/signModal.js";
import { combineReducers } from "redux";

export default combineReducers({
	createPollForm,
	respondPollForm,
	loginForm,
	registerForm,
	user,
	signModal
});
