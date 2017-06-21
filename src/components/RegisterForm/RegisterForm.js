import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { setEmailForRegister } from "../../actions.js";
import { setPasswordForRegister } from "../../actions.js";
import { setPasswordConfirmationForRegister } from "../../actions.js";
import axios from "axios";
import "./RegisterForm.css";

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmationChange = this.handleConfirmationChange.bind(this);
	}

	handleEmailChange(event, data) {
		// TODO : vérifier la validité de l'email
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
					<Input fluid focus type="email" placeholder="E-mail" defaultValue={this.props.email} onChange={this.handleEmailChange}></Input>
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
	if (typeof(state.registerForm.registerForm.email) === "string") {
		return {
			"email": state.registerForm.registerForm.email
		};
	}
	return {
		"email": ""
	};
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
		}
	};
};

RegisterForm = connect(mapStateToFormProps, mapDispatchToFormProps)(RegisterForm);
export { RegisterForm };

class RegisterActions extends Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleRegister(event) {
		event.preventDefault();
		let self = this;
		console.log("register");
	}

	render() {
		return (
			<Button primary onClick={this.handleRegister}>Inscription</Button>
		);
	}
}

const mapStateToActionsProps = function(state) {
	return {
		"registerForm": state.registerForm.registerForm
	};
};

RegisterActions = connect(mapStateToActionsProps)(RegisterActions);
export { RegisterActions };
