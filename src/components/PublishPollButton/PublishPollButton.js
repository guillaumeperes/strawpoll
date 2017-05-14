import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import "./PublishPollButton.css";

export default class PublishPollButton extends Component {
	render() {
		return (
			<Button size="huge" primary>{this.props.children}</Button>
		);
	}
}
