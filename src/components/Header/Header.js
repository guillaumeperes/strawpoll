import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import "./Header.css";

export default class Header extends Component {
	render() {
		return (
			<div id="Header">
				<Button primary>Connexion</Button>
				<Button>Inscription</Button>
			</div>
		);
	}
}
