import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "./SignupButton.css";

export default class SignupButton extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		console.log("Inscription");
	}

	render() {
		return (
			<Button compact onClick={this.handleClick}><Icon name="signup" size="large"></Icon> Inscription</Button>
		);
	}
}
