import React from "react";
import { Component } from "react";
import { Modal } from "semantic-ui-react";
import { Menu } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { LoginForm } from "../LoginForm/LoginForm";
import { LoginActions } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { RegisterActions } from "../RegisterForm/RegisterForm";
import { openSignModal } from "../../actions.js";
import { closeSignModal } from "../../actions.js";
import { navigateSignModal } from "../../actions.js";

class SignModal extends Component {
	constructor(props) {
		super(props);
		this.sections = ["login", "register"];
		this.handleModalOpen = this.handleModalOpen.bind(this);
		this.handleNavigation = this.handleNavigation.bind(this);		
	}

	handleModalOpen() {
		this.props.openSignModal();
		if (this.sections.indexOf(this.props.goto) !== -1) {
			this.props.navigateSignModal(this.props.goto);
		} else {
			this.props.navigateSignModal("login");
		}
	}

	handleNavigation(event, data) {
		event.preventDefault();
		if (this.sections.indexOf(data.name) !== -1) {
			this.props.navigateSignModal(data.name);
		}
	}
	
	renderForm() {
		if (this.props.section === "login") {
			return <LoginForm></LoginForm>;
		} else if (this.props.section === "register") {
			return <RegisterForm></RegisterForm>;
		}
		return <span></span>;
	}

	renderActions() {
		if (this.props.section === "login") {
			return <LoginActions></LoginActions>;
		} else if (this.props.section === "register") {
			return <RegisterActions></RegisterActions>
		}
		return <span></span>;
	}

	render() {
		return (
			<Modal trigger={this.props.children} open={this.props.opened} onOpen={this.handleModalOpen}>
				<Modal.Content>
					<Menu pointing secondary stackable>
						<Menu.Item name="login" active={this.props.section === "login"} onClick={this.handleNavigation}>Connexion</Menu.Item>
						<Menu.Item name="register" active={this.props.section === "register"} onClick={this.handleNavigation}>Inscription</Menu.Item>
					</Menu>
					<Divider horizontal inverted></Divider>
					{ this.renderForm() }
				</Modal.Content>
				<Modal.Actions>
					{ this.renderActions() }
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapStateToProps = function(state) {
	return {
		"opened": state.signModal.signModal.opened,
		"section": state.signModal.signModal.section
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"openSignModal": function() {
			dispatch(openSignModal());
		},
		"closeSignModal": function() {
			dispatch(closeSignModal());
		},
		"navigateSignModal": function(section) {
			dispatch(navigateSignModal(section));
		}
	};
};

SignModal = connect(mapStateToProps, mapDispatchToProps)(SignModal);
export default SignModal;
