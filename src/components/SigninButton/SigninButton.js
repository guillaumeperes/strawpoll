import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "./SigninButton.css";

export default class SigninButton extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		console.log("Connexion");
	}

	render() {
		return (
			<Button compact onClick={this.handleClick}><Icon name="sign in" size="large"></Icon> Connexion</Button>
		);
	}
}
