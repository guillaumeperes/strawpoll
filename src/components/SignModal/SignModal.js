import React from "react";
import { Component } from "react";
import { Modal } from "semantic-ui-react";
import { Menu } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import "./SignModal.css";

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

	render() {
		return (
			<Modal trigger={this.props.children} onOpen={this.handleModalOpen}>
				<Modal.Content>
					<Menu pointing secondary stackable>
						<Menu.Item name="login" active={this.state.section === "login"} onClick={this.handleNavigation}>Connexion</Menu.Item>
						<Menu.Item name="register" active={this.state.section === "register"} onClick={this.handleNavigation}>Inscription</Menu.Item>
					</Menu>
					<Divider horizontal inverted></Divider>
					Formulaires
				</Modal.Content>
			</Modal>
		);
	}
}

export default SignModal;
