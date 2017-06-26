import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert2";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { setEmailForRegister } from "../../actions.js";
import { setPasswordForRegister } from "../../actions.js";
import { setPasswordConfirmationForRegister } from "../../actions.js";
import { closeSignModal } from "../../actions.js";
import { setUserToken } from "../../actions.js";
import { removeRegisterData } from "../../actions.js";

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmationChange = this.handleConfirmationChange.bind(this);
	}

	componentWillUnmount() {
		this.props.removeRegisterDataInStore();
	}

	handleEmailChange(event, data) {
		// TODO : vérifier la validité de l'email côté client
		if (typeof(data.value) === "string") {
			this.props.setEmailForRegisterInStore(data.value);
		}
	}

	handlePasswordChange(event, data) {
		// TODO : vérifier la complexité du mot de passe
		if (typeof(data.value) === "string") {
			this.props.setPasswordForRegisterInStore(data.value);
		}
	}

	handleConfirmationChange(event, data) {
		// TODO : vérifier la complexité du mot de passe
		if (typeof(data.value) === "string") {
			this.props.setPasswordConfirmationForRegisterInStore(data.value);
		}
	}

	render() {
		return (
			<Form>
				<Form.Field>
					<Header as="h5">Adresse e-mail</Header>
					<Input fluid focus type="email" placeholder="E-mail" onChange={this.handleEmailChange}></Input>
				</Form.Field>
				<Form.Field>
					<Header as="h5">Mot de passe</Header>
					<Input fluid focus type="password" placeholder="Mot de passe" onChange={this.handlePasswordChange}></Input>
				</Form.Field>
				<Form.Field>
					<Header as="h5">Confirmation du mot de passe</Header>
					<Input fluid focus type="password" placeholder="Confirmation du mot de passe" onChange={this.handleConfirmationChange}></Input>
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
		"setEmailForRegisterInStore": function(email) {
			dispatch(setEmailForRegister(email));
		},
		"setPasswordForRegisterInStore": function(password) {
			dispatch(setPasswordForRegister(password));
		},
		"setPasswordConfirmationForRegisterInStore": function(confirmation) {
			dispatch(setPasswordConfirmationForRegister(confirmation));
		},
		"removeRegisterDataInStore": function() {
			dispatch(removeRegisterData());
		}
	};
};

RegisterForm = connect(mapStateToFormProps, mapDispatchToFormProps)(RegisterForm);
export { RegisterForm };

class RegisterActions extends Component {
	static propTypes = {
		"cookies": PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.handleClose = this.handleClose.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.registerUrl = "https://api.strawpoll.guillaumeperes.fr/api/register/";
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

	handleRegister(event) {
		event.preventDefault();
		let self = this;
		let store = self.props.registerForm;

		let data = {};
		if (typeof(store.email) !== "string" || store.email.length === 0) {
			self.throwSweetError("Veuillez renseigner une adresse e-mail");
			return;
		}
		data.email = store.email;
		if (typeof(store.password) !== "string" || store.password.length === 0) {
			self.throwSweetError("Veuillez renseigner un mot de passe");
			return;
		}
		data.password = store.password;
		if (typeof(store.confirmation) !== "string" || store.confirmation.length === 0) {
			self.throwSweetError("Veuillez confirmer votre mot de passe");
			return;
		}
		data.confirmation = store.confirmation;
		if (data.password !== data.confirmation) {
			self.throwSweetError("Le mot de passe et sa confirmation doivent être identiques");
			return;
		}

		axios.post(this.registerUrl, data).then(function(result) {
			self.props.closeSignModal();
			if (typeof(result.data.data.token) !== "undefined") {
				self.props.setUserTokenInStore(result.data.data.token);
				let expires = new Date();
				expires.setDate(expires.getDate() + 1);
				self.props.cookies.set("strawpoll_userToken", result.data.data.token, {
					"path": "/",
					"expires": expires
				});
			}
			swal({
				"title": "Bravo !",
				"text": "Vous êtes maintenant inscrit sur le Strawpoll",
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
				<Button primary onClick={this.handleRegister}>Inscription</Button>
			</div>
		);
	}
}

const mapStateToActionsProps = function(state) {
	return {
		"registerForm": state.registerForm.registerForm
	};
};

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

RegisterActions = connect(mapStateToActionsProps, mapDispatchToActionsProps)(RegisterActions);
RegisterActions = withRouter(RegisterActions);
RegisterActions = withCookies(RegisterActions);
export { RegisterActions };
