import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { setEmailForLogin } from "../../actions.js";
import { setPasswordForLogin } from "../../actions.js";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
		}
	};
};

LoginForm = connect(mapStateToFormProps, mapDispatchToFormProps)(LoginForm);
export { LoginForm };

export class LoginActions extends Component {
	constructor(props) {
		super(props);
		this.handleForgotPassword = this.handleForgotPassword.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleForgotPassword(event) {
		event.preventDefault();
		console.log("forgot password");
	}

	handleLogin(event) {
		event.preventDefault();
		console.log("login");
	}

	render() {
		return (
			<div>
				<Button onClick={this.handleForgotPassword}>Mot de passe oublié</Button>
				<Button primary onClick={this.handleLogin}>Connexion</Button>
			</div>
		);
	}
}
