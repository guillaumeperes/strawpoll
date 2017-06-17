import React from "react";
import { Component } from "react";
import CreatePollButton from "../CreatePollButton/CreatePollButton";
import SigninButton from "../SigninButton/SigninButton";
import SignupButton from "../SignupButton/SignupButton";
import "./Header.css";

export default class Header extends Component {
	render() {
		return (
			<div id="Header">
				<CreatePollButton></CreatePollButton>
				<SigninButton></SigninButton>
				<SignupButton></SignupButton>
			</div>
		);
	}
}
