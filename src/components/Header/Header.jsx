import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import CreatePollButton from "../CreatePollButton/CreatePollButton";
import SignModal from "../SignModal/SignModal";
import UserActions from "../UserActions/UserActions";
import "./Header.css";

class Header extends Component {
	renderUserActions() {
		if (typeof(this.props.userToken) === "undefined") {
			return (
				<span>
					<SignModal goto="login"><Button compact><Icon name="sign in" size="large"></Icon> Connexion</Button></SignModal>
					<SignModal goto="register"><Button compact><Icon name="signup" size="large"></Icon> Inscription</Button></SignModal>	
				</span>
			);
		} else {
			return <UserActions></UserActions>;
		}
	}

	render() {
		return (
			<div id="Header">
				<CreatePollButton></CreatePollButton>
				{ this.renderUserActions() }
			</div>
		);
	}
}

const mapStateToProps = function(state) {
	return {
		"userToken": state.user.user.token
	};
};

Header = connect(mapStateToProps)(Header);
export default Header;
