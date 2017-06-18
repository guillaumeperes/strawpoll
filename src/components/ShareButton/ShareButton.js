import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import "./ShareButton.css";

export default class ShareButton extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
	}

	render() {
		return (
			<Button fluid={this.props.fluid} size={this.props.size} data-tooltip={this.props.tooltip} onClick={this.handleClick}>{this.props.children}</Button>
		);
	}
}
