import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert2";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";
import { setEmailForLogin } from "../../actions.js";
import { setPasswordForLogin } from "../../actions.js";
import { closeSignModal } from "../../actions.js";
import { setUserToken } from "../../actions.js";
import { removeLoginData } from "../../actions.js";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	componentWillUnmount() {
		this.props.removeLoginDataInStore();
	}

	handleEmailChange(event, data) {
		if (typeof(data.value) === "string") {
			// TODO : vérifier le format de l'email
			this.props.setEmailForLoginInStore(data.value);
		}
	}

	handlePasswordChange(event, data) {
		if (typeof(data.value) === "string") {
			// TODO : vérifier la complexité du mot de passe
			this.props.setPasswordForLoginInStore(data.value);
		}
	}

	render() {
		return (
			<Form>
				<Form.Field>
					<Header as="h5">Votre adresse e-mail</Header>
					<Input fluid focus type="email" placeholder="E-mail" onChange={this.handleEmailChange}></Input>
				</Form.Field>
				<Form.Field>
					<Header as="h5">Votre mot de passe</Header>
					<Input fluid focus type="password" placeholder="Mot de passe" onChange={this.handlePasswordChange}></Input>
				</Form.Field>
			</Form>
		);
	}
}

const mapStateToFormProps = function(state) {
	return {};
};

const mapDispatchToFormProps = function(dispatch) {
	return {
		"setEmailForLoginInStore": function(email) {
			dispatch(setEmailForLogin(email));
		},
		"setPasswordForLoginInStore": function(password) {
			dispatch(setPasswordForLogin(password));
		},
		"removeLoginDataInStore": function() {
			dispatch(removeLoginData());
		}
	};
};

LoginForm = connect(mapStateToFormProps, mapDispatchToFormProps)(LoginForm);
export { LoginForm };

class LoginActions extends Component {
	static propTypes = {
		"cookies": PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.handleClose = this.handleClose.bind(this);
		this.handleForgotPassword = this.handleForgotPassword.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.loginUrl = "https://api.strawpoll.guillaumeperes.fr/api/login/";
	}

	throwSweetError(text) {
		swal({
			"title": "Erreur",
			"text": text,
			"type": "error",
			"confirmButtonText": "Fermer",
			"allowOutsideClick": false,
			"allowEscapeKey": false,
			"allowEnterKey": false
		}).catch(swal.noop);
	}

	handleClose(event) {
		event.preventDefault();
		this.props.closeSignModal();
	}

	handleForgotPassword(event) {
		event.preventDefault();
		console.log("forgot password");
	}

	handleLogin(event) {
		event.preventDefault();
		let self = this;
		let store = self.props.loginForm;

		let data = {};
		if (typeof(store.email) !== "string" || store.email.length === 0) {
			self.throwSweetError("Veuillez renseigner votre adresse e-mail");
			return;
		}
		data.email = store.email;
		if (typeof(store.password) !== "string" || store.password.length === 0) {
			self.throwSweetError("Veuillez renseigner votre mot de passe");
			return;
		}
		data.password = store.password;

		axios.post(this.loginUrl, data).then(function(result) {
			self.props.closeSignModal();
			if (typeof(result.data.data.token) !== "undefined") {
				let expires = new Date();
				expires.setDate(expires.getDate() + 1);
				self.props.cookies.set("strawpoll_userToken", result.data.data.token, {
					"path": "/",
					"expires": expires
				});
				self.props.setUserTokenInStore(result.data.data.token);
			}
			swal({
				"title": "Bravo !",
				"text": "Vous êtes maintenant connecté à votre compte",
				"type": "success",
				"confirmButtonText": "Fermer",
				"allowOutsideClick": false,
				"allowEscapeKey": false,
				"allowEnterKey": false
			}).catch(swal.noop);
		}).catch(function(error) {
			if (typeof(error.response) !== "undefined") {
				self.throwSweetError(error.response.data.error);
			} else {
				self.throwSweetError("Une erreur inconnue s'est produite");
			}
		});
	}

	render() {
		return (
			<div className="buttons">
				<Button onClick={this.handleClose}>Fermer</Button>
				<Button onClick={this.handleForgotPassword}>Mot de passe oublié</Button>
				<Button primary onClick={this.handleLogin}>Connexion</Button>
			</div>
		);
	}
}

const mapStateToActionsProps = function(state) {
	return {
		"loginForm": state.loginForm.loginForm
	};
}

const mapDispatchToActionsProps = function(dispatch) {
	return {
		"closeSignModal": function() {
			dispatch(closeSignModal());
		},
		"setUserTokenInStore": function(token) {
			dispatch(setUserToken(token));
		}
	};
}

LoginActions = connect(mapStateToActionsProps, mapDispatchToActionsProps)(LoginActions);
LoginActions = withCookies(LoginActions);
export { LoginActions };
