import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateAnswerValueForQuestion } from "../../actions.js";
import { removeAnswerValueForQuestion } from "../../actions.js";
import "./AnswerInput.css";

class AnswerInput extends Component {
	constructor(props) {
		super(props);
		this.removeAnswer = this.removeAnswer.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	removeAnswer(event) {
		event.preventDefault();
		if (typeof(this.props.removeAnswerCallback) === "function") {
			this.props.removeAnswerCallback(this);
		}
	}

	handleChange(event, data) {
		if (typeof(data.value) === "string") {
			this.props.updateAnswerValueForQuestionInStore(this.props.question, this.props.position, data.value);
		}
	}

	componentWillUnmount() {
		this.props.removeAnswerValueForQuestionInStore(this.props.question, this.props.position);
	}

	render() {
		let deletionAuthorized = false;
		if (typeof(this.props.answersDeletionAuthorizedByQuestion[this.props.question])) {
			deletionAuthorized = this.props.answersDeletionAuthorizedByQuestion[this.props.question];
		}
		return (
			<Form.Field>
				<Input type="text" placeholder={this.props.placeholder} onChange={this.handleChange} icon={ deletionAuthorized ? <Icon size="large" name="trash" link onClick={this.removeAnswer}></Icon> : false } />
			</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	let questions = state.createPollForm.createPollForm.questions;
	let answersDeletionAuthorizedByQuestion = {};
	questions.forEach(function(question) {
		answersDeletionAuthorizedByQuestion[question.position] = question.answersDeletionAuthorized;
	});
	return {
		"answersDeletionAuthorizedByQuestion": answersDeletionAuthorizedByQuestion
	};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"updateAnswerValueForQuestionInStore": function(question, position, answer) {
			dispatch(updateAnswerValueForQuestion(question, position, answer));
		},
		"removeAnswerValueForQuestionInStore": function(question, position) {
			dispatch(removeAnswerValueForQuestion(question, position));
		}
	}
};

AnswerInput = connect(mapStateToProps, mapDispatchToProps)(AnswerInput);

export default AnswerInput;
