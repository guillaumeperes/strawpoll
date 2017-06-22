import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Pie } from "react-chartjs-2";
import "./QuestionResults.css";

export default class QuestionResults extends Component {
	calculateRatio(votes, total) {
		return Math.round((votes/total)*100);
	}

	renderPie() {
		let self = this;
		if (typeof(this.props.answers) === "object") {
			let data = {
				"labels": [],
				"datasets": []
			};
			this.props.answers.forEach(function(answer) {
				if (typeof(answer.votes) === "number" && typeof(self.props.totalVotes) === "number") {
					var label = answer.answer + " (" + self.calculateRatio(answer.votes, self.props.totalVotes) + "%)";	
				} else {
					var label = answer.answer;
				}
				data.labels.push(label);
			});
			let dataset = {};
			dataset.data = this.props.answers.map(function(answer) {
				return answer.votes;
			});
			dataset.backgroundColor = this.props.answers.map(function(answer) {
				return answer.color;
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
					{ this.renderPie() }
				</Container>
			</Segment>
		);
	}
}
