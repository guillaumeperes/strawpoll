import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import "./SavePollButton.css";

export default class SavePollButton extends Component {
	render() {
		return (
			<Button fluid={this.props.fluid} primary={this.props.primary} size={this.props.size} data-tooltip={this.props.tooltip}>{this.props.children}</Button>
		);
	}
}
