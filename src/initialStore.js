const initialStore = {
	"createPollForm": {
		"questionsDeletionAuthorized": false,
		"minimumQuestionsCount": 1,
		"duplicationCheckId": false,
		"userId": false,
		"hasCaptcha": false,
		"isDraft": false,
		"questions": [],
	},
	"respondPollForm": {
		"questions": [],
		"hasCaptcha": false,
		"captchaStatus": false
	},
	"errors": {},
	"loginForm": {},
	"registerForm": {},
	"user": {},
	"signModal": {
		"opened": false,
		"section": "login"
	}
};

export default initialStore;
