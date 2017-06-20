import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "./RegisterForm.css";

export class RegisterForm extends Component {
	render() {
		return (
			<Form>
				<Form.Field>
					<Header as="h5">Adresse e-mail</Header>
					<Input fluid focus type="email" placeholder="E-mail"></Input>
				</Form.Field>
				<Form.Field>
					<Header as="h5">Mot de passe</Header>
					<Input fluid focus type="password" placeholder="Mot de passe"></Input>
				</Form.Field>
				<Form.Field>
					<Header as="h5">Confirmation du mot de passe</Header>
					<Input fluid focus type="password" placeholder="Confirmation du mot de passe"></Input>
				</Form.Field>
			</Form>
		);
	}
}

export class RegisterActions extends Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleRegister(event) {
		event.preventDefault();
		console.log("register");
	}

	render() {
		return (
			<Button primary onClick={this.handleRegister}>Inscription</Button>
		);
	}
}
