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

class SignModal extends Component {
	constructor(props) {
		super(props);
		this.sections = ["login", "register"];
		this.state = {
			"section": "login"
		};
		this.handleModalOpen = this.handleModalOpen.bind(this);
		this.handleNavigation = this.handleNavigation.bind(this);		
	}

	navigate(section) {
		if (this.sections.indexOf(section) !== -1) {
			this.setState({"section": section});
		}
	}

	handleModalOpen() {
		this.props.openSignModal();
		if (typeof(this.props.section) === "string") {
			this.navigate(this.props.section);
		} else {
			this.navigate("login");
		}
	}

	handleNavigation(event, data) {
		event.preventDefault();
		this.navigate(data.name);
	}

	renderForm() {
		if (this.state.section === "login") {
			return <LoginForm></LoginForm>;
		} else if (this.state.section === "register") {
			return <RegisterForm></RegisterForm>;
		}
		return <span></span>;
	}

	renderActions() {
		if (this.state.section === "login") {
			return <LoginActions></LoginActions>;
		} else if (this.state.section === "register") {
			return <RegisterActions></RegisterActions>
		}
		return <span></span>;
	}

	render() {
		return (
			<Modal trigger={this.props.children} open={this.props.opened} onOpen={this.handleModalOpen}>
				<Modal.Content>
					<Menu pointing secondary stackable>
						<Menu.Item name="login" active={this.state.section === "login"} onClick={this.handleNavigation}>Connexion</Menu.Item>
						<Menu.Item name="register" active={this.state.section === "register"} onClick={this.handleNavigation}>Inscription</Menu.Item>
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
		"opened": state.signModal.signModal.opened
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"openSignModal": function() {
			dispatch(openSignModal());
		},
		"closeSignModal": function() {
			dispatch(closeSignModal());
		}
	};
};

SignModal = connect(mapStateToProps, mapDispatchToProps)(SignModal);
export default SignModal;
