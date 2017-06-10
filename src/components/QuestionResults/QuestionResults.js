import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import "./QuestionResults.css";

export default class QuestionResults extends Component {
	render() {
		return (
			<Segment padded textAlign="left">
				<Header as="h1">{this.props.question}</Header>
			</Segment>
		);
	}
}
