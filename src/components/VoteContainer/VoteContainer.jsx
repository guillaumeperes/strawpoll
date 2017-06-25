import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import VoteCheckbox from "../VoteCheckbox/VoteCheckbox";
import { createQuestionForResponseInStore } from "../../actions.js";

class VoteContainer extends Component {
	componentDidMount() {
		this.props.createQuestionForResponseInStore(this.props.questionId, this.props.multipleAnswers);
	}

	renderAnswers() {
		let self = this;
		if (typeof(self.props.answers) === "object" && typeof(self.props.multipleAnswers) === "boolean") {
			let out = self.props.answers.map(function(answer, i) {
				return <VoteCheckbox key={i} questionId={self.props.questionId} multipleAnswers={self.props.multipleAnswers} answerId={answer.id} answer={answer.answer}></VoteCheckbox>
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

const mapStateToProps = function(state) {
	return {};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"createQuestionForResponseInStore": function(question, multipleAnswers) {
			dispatch(createQuestionForResponseInStore(question, multipleAnswers));
		}
	};
};

VoteContainer = connect(mapStateToProps, mapDispatchToProps)(VoteContainer);

export default VoteContainer;
