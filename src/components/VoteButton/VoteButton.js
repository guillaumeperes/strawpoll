import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import "./VoteButton.css";

class VoteButton extends Component {
	constructor(props) {
		super(props);
		this.publishVote = this.publishVote.bind(this);
	}

	publishVote(event, data) {
		event.preventDefault();
		console.log("Vote !");
		// TODO
	}

	render() {
		return (
			<Button size="huge" primary onClick={this.publishVote}>{this.props.children}</Button>
		);
	}
}

export default VoteButton;
