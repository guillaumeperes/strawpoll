import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import { addAnswerForQuestionForResponse } from "../../actions.js";
import { removeAllAnswersForQuestionForResponse } from "../../actions.js";
import { removeAnswerForQuestionForResponse } from "../../actions.js";

class VoteCheckbox extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	isChecked() {
		let self = this;
		let indexQuestion = self.props.questions.findIndex(function(question) {
			return question.id === self.props.questionId;
		});
		if (indexQuestion !== -1) {
			return self.props.questions[indexQuestion].answers.indexOf(self.props.answerId) !== -1;
		}
		return false;
	}

	handleChange(event, data) {
		if (!this.props.multipleAnswers) {
			this.props.removeAllAnswersForQuestionForResponseInStore(this.props.questionId);
		}
		if (typeof(data.checked) === "boolean" && data.checked) {
			this.props.addAnswerForQuestionForResponseInStore(this.props.questionId, this.props.answerId);
		} else if (typeof(data.checked) === "boolean" && !data.checked) {
			this.props.removeAnswerForQuestionForResponseInStore(this.props.questionId, this.props.answerId);
		}
	}

	render() {
		return (
			<Form.Field>
				<Checkbox checked={this.isChecked()} value={this.props.answerId} label={this.props.answer} onChange={this.handleChange}></Checkbox>
			</Form.Field>
		);
	}
}

const mapStateToProps = function(state) {
	if (typeof(state.respondPollForm.respondPollForm.questions) === "object") {
		let questions = state.respondPollForm.respondPollForm.questions.map(function(question) {
			return {
				"id": question.id,
				"answers": question.answers
			}
		});
		return {
			"questions": questions
		};
	}
	return {
		"questions": []
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"addAnswerForQuestionForResponseInStore": function(question, answer) {
			dispatch(addAnswerForQuestionForResponse(question, answer));
		},
		"removeAllAnswersForQuestionForResponseInStore": function(question) {
			dispatch(removeAllAnswersForQuestionForResponse(question));
		},
		"removeAnswerForQuestionForResponseInStore": function(question, answer) {
			dispatch(removeAnswerForQuestionForResponse(question, answer));
		}
	};
};

VoteCheckbox = connect(mapStateToProps, mapDispatchToProps)(VoteCheckbox);

export default VoteCheckbox;
