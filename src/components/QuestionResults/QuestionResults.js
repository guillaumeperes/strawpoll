import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Pie } from "react-chartjs-2";
import "./QuestionResults.css";

export default class QuestionResults extends Component {
	renderAnswers() {
		if (typeof(this.props.answers) === "object") {
			let data = {
				"labels": [],
				"datasets": []
			};
			this.props.answers.forEach(function(answer) {
				data.labels.push(answer.answer);
			});
			let dataset = {};
			dataset.data = this.props.answers.map(function(answer) {
				return answer.votes;
			});
			data.datasets.push(dataset);
			return <Pie data={data} />;
		}
	}

	render() {
		return (
			<Segment padded textAlign="left">
				<Header as="h1">{this.props.question}</Header>
				<Container>
					{ this.renderAnswers() }
				</Container>
			</Segment>
		);
	}
}
