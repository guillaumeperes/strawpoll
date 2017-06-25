import React from "react";
import { Component } from "react";
import QuestionContainer from "../QuestionContainer/QuestionContainer";
import { connect } from "react-redux";
import { toggleQuestionsDeletionStatus } from "../../actions.js";
import { updateMinimumQuestionsCount } from "../../actions.js";

class QuestionsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"questions": [],
			"position": 0
		};
		this.addQuestion = this.addQuestion.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
	}

	componentDidMount() {
		let minimum = typeof(parseInt(this.props.minimum, 10)) === "number" ? parseInt(this.props.minimum, 10) : 1;
		let questions = [];
		for (var i = 0; i < minimum; i++) {
			questions.push(<QuestionContainer key={i} position={i} removeQuestionCallback={this.removeQuestion}></QuestionContainer>);
		}
		this.setState({
			"questions": questions,
			"position": i
		});
		// Mises à jour du store
		this.props.updateMinimumQuestionsCountInStore(minimum);
		this.props.toggleQuestionsDeletionStatusInStore(false);
	}

	addQuestion(event) {
		event.preventDefault();
		let questions = this.state.questions;
		let position = this.state.position + 1;
		questions.push(<QuestionContainer key={position} position={position} removeQuestionCallback={this.removeQuestion}></QuestionContainer>);
		this.setState({
			"questions": questions,
			"position": position,
		});
		// Mise à jour du store
		if (questions.length > this.props.minimumQuestionsCount) {
			this.props.toggleQuestionsDeletionStatusInStore(true);
		}
	}

	removeQuestion(question) {
		if (typeof(question) === "object" && typeof(question.props.position) !== "undefined") {
			let questions = this.state.questions;
			let index = questions.findIndex(function(item) {
				return item.props.position === question.props.position;
			});
			if (index !== -1) {
				questions.splice(index, 1);
				this.setState({
					"questions": questions,
					"position": this.state.position
				});
				// Mise à jour du store
				if (questions.length <= this.props.minimumQuestionsCount) {
					this.props.toggleQuestionsDeletionStatusInStore(false);
				}
			}
		}
	}

	render() {
		return (
			<div>
				{this.state.questions}
			</div>
		);
	}
}

const mapStateToProps = function(state) {
	return {
		"minimumQuestionsCount": state.createPollForm.minimumQuestionsCount,
		"questionsDeletionAuthorized": state.createPollForm.questionsDeletionAuthorized
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"updateMinimumQuestionsCountInStore": function(value) {
			dispatch(updateMinimumQuestionsCount(value));
		},
		"toggleQuestionsDeletionStatusInStore": function(status) {
			dispatch(toggleQuestionsDeletionStatus(status));
		}
	};
};

QuestionsList = connect(mapStateToProps, mapDispatchToProps)(QuestionsList);

export default QuestionsList;
