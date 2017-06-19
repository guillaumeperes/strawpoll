import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Modal } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import "./ShareModal.css";

export default class ShareModal extends Component {
	constructor(props) {
		super(props);
		this.shareBasePath = "https://strawpoll.guillaumeperes.fr/poll/:poll_id/";
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleClipboardClick = this.handleClipboardClick.bind(this);
		this.state = {
			"opened": false
		};
	}

	sharePath() {
		if (typeof(this.props.poll) === "number") {
			return this.shareBasePath.replace(":poll_id", this.props.poll);
		}
		return false;
	}

	handleOpen(event) {
		event.preventDefault();
		this.setState({
			"opened": true
		});
	}

	handleClose(event) {
		event.preventDefault();
		toast.dismiss(); // Ferme tous les pop-up à la sortie du modal
		this.setState({
			"opened": false
		});
	}

	handleClipboardClick(event) {
		event.preventDefault();
		toast.dismiss();
		if (copy(this.sharePath())) {
			toast.success("L'URL du sondage a été copiée dans votre presse-papier");
		} else {
			toast.error("Une erreur s'est produite");
		}
	}

	render() {
		return (
			<Modal size="small" open={this.state.opened} trigger={<Button onClick={this.handleOpen} fluid={this.props.triggerFluid} size={this.props.triggerSize} data-tooltip={this.props.triggerTooltip}>{this.props.children}</Button>}>
				<Modal.Header><Icon name="share alternate"></Icon> Partager ce sondage</Modal.Header>
				<Modal.Content>
					<Header as="h4">URL du sondage</Header>
					<Input fluid focus type="text" defaultValue={this.sharePath()} action={<Button data-tooltip="Copier dans le presse-papier" onClick={this.handleClipboardClick}><Icon name="clipboard"></Icon></Button>}></Input>
				</Modal.Content>
				<Modal.Actions>
					<Button primary onClick={this.handleClose}>Fermer</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}
