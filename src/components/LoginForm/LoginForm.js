import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "./LoginForm.css";

export class LoginForm extends Component {
	render() {
		return (
			<Form>
				<Form.Field>
					<Header as="h5">Votre adresse e-mail</Header>
					<Input fluid focus type="email" placeholder="E-mail"></Input>
				</Form.Field>
				<Form.Field>
					<Header as="h5">Votre mot de passe</Header>
					<Input fluid focus type="password" placeholder="Mot de passe"></Input>
				</Form.Field>
			</Form>
		);
	}
}

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
