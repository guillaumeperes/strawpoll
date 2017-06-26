import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Pie } from "react-chartjs-2";

export default class QuestionResults extends Component {
	calculateRatio(votes, total) {
		if(!total){
			return 0;
		}
		return Math.round((votes/total)*100);
	}

	renderPie() {
		let self = this;
		if (Array.isArray(this.props.answers)) {
			let data = {
				"labels": [],
				"datasets": []
			};
			this.props.answers.forEach(function(answer) {
				if (typeof(answer.votes) === "number" && typeof(self.props.totalVotes) === "number") {
					data.labels.push(answer.answer + " (" + self.calculateRatio(answer.votes, self.props.totalVotes) + "%)");
				} else {
					data.labels.push(answer.answer);
				}
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
