import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Modal } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import "./ShareModal.css";

export default class ShareModal extends Component {
	constructor(props) {
		super(props);
		this.shareBasePath = "https://strawpoll.guillaumeperes.fr/poll/:poll_id/";
		this.handleClipboardClick = this.handleClipboardClick.bind(this);
	}

	sharePath() {
		if (typeof(this.props.poll) === "number") {
			return this.shareBasePath.replace(":poll_id", this.props.poll);
		}
		return false;
	}

	handleClipboardClick(event) {
		event.preventDefault();
		copy(this.sharePath());
	}

	render() {
		return (
			<Modal size="small" trigger={<Button fluid={this.props.triggerFluid} size={this.props.triggerSize} data-tooltip={this.props.triggerTooltip}>{this.props.children}</Button>}>
				<Modal.Header><Icon name="share alternate"></Icon> Partager ce sondage</Modal.Header>
				<Modal.Content>
					<Input fluid type="text" defaultValue={this.sharePath()} action={<Button data-tooltip="Copier dans le presse-papier" onClick={this.handleClipboardClick}><Icon name="clipboard"></Icon></Button>}></Input>
				</Modal.Content>
			</Modal>
		);
	}
}
