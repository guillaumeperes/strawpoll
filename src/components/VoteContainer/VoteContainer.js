import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import VoteCheckbox from "../VoteCheckbox/VoteCheckbox";
import "./VoteContainer.css";

export default class VoteContainer extends Component {
	constructor(props) {
		super(props);
	}

	renderAnswers() {
		let self = this;
		if (typeof(self.props.answers) === "object" && typeof(self.props.multipleAnswers) === "boolean") {
			let out = self.props.answers.map(function(answer, i) {
				return <VoteCheckbox key={i} answerId={answer.id} answer={answer.answer}></VoteCheckbox>
			});
			return out;
		}
	}

	render() {
		return (
			<Segment padded textAlign="left">
				<Header as="h1">{this.props.question}</Header>
				<Divider horizontal></Divider>
				<div>{ this.renderAnswers() }</div>
			</Segment>
		);
	}
}
