import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import CreatePollButton from "../CreatePollButton/CreatePollButton";
import SignModal from "../SignModal/SignModal";
import "./Header.css";

export default class Header extends Component {
	render() {
		return (
			<div id="Header">
				<CreatePollButton></CreatePollButton>
				<SignModal section="login"><Button compact><Icon name="sign in" size="large"></Icon> Connexion</Button></SignModal>
				<SignModal section="register"><Button compact><Icon name="signup" size="large"></Icon> Inscription</Button></SignModal>
			</div>
		);
	}
}
