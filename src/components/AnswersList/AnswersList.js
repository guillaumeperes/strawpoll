import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import AnswerInput from "../AnswerInput/AnswerInput";
import { connect } from "react-redux";
import { toggleAnswersDeletionStatusForQuestion } from "../../actions.js";
import { updateMinimumAnswersCountForQuestion } from "../../actions.js";
import "./AnswersList.css";

class AnswersList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			"answers": [],
			"position": 0
		}
		this.addAnswer = this.addAnswer.bind(this);
		this.removeAnswer = this.removeAnswer.bind(this);
	}

	componentDidMount() {
		let minimum = typeof(parseInt(this.props.minimum, 10)) === "number" ? parseInt(this.props.minimum, 10) : 2;
		let answers = [];
		for (var i = 0; i < minimum; i++) {
			answers.push(<AnswerInput key={i} position={i} question={this.props.question} placeholder="Entrez une réponse" removeAnswerCallback={this.removeAnswer}></AnswerInput>);
		}
		this.setState({
			"answers": answers,
			"position": i
		});
		// Mise à jour du store
		this.props.updateMinimumAnswersCountForQuestionInStore(this.props.question, minimum);
		this.props.toggleAnswersDeletionStatusForQuestionInStore(this.props.question, false);
	}

	addAnswer(event) {
		event.preventDefault();
		let self = this;
		let indexQuestion = self.props.questions.findIndex(function(item) {
			return item.position === self.props.question;
		});
		let minimumAnswersCount = 2;
		if (indexQuestion !== -1) {
			minimumAnswersCount = self.props.questions[indexQuestion].minimumAnswersCount;
		}
		let answers = self.state.answers;
		let position = self.state.position + 1;
		answers.push(<AnswerInput key={position} position={position} question={self.props.question} placeholder="Entrez une réponse" removeAnswerCallback={self.removeAnswer}></AnswerInput>);
		self.setState({
			"answers": answers,
			"position": position
		});
		// Mise à jour du store
		if (answers.length > minimumAnswersCount) {
			this.props.toggleAnswersDeletionStatusForQuestionInStore(self.props.question, true);
		}
	}

	removeAnswer(answer) {
		let self = this;
		let indexQuestion = self.props.questions.findIndex(function(item) {
			return item.position === self.props.question;
		});
		let minimumAnswersCount = 2;
		if (indexQuestion !== -1) {
			minimumAnswersCount = self.props.questions[indexQuestion].minimumAnswersCount;
		}
		if (typeof(answer) === "object" && typeof(answer.props.position) === "number") {
			let answers = self.state.answers;
			let indexAnswer = answers.findIndex(function(item) {
				return item.props.position === answer.props.position;
			});
			if (indexAnswer !== -1) {
				answers.splice(indexAnswer, 1);
				self.setState({
					"answers": answers,
					"position": self.state.position
				});
				// Mise à jour du store
				if (answers.length <= minimumAnswersCount) {
					self.props.toggleAnswersDeletionStatusForQuestionInStore(self.props.question, false);
				}
			}
		}
	}

	render() {
		return (
			<Form.Field>
				{this.state.answers}
				<Button fluid onClick={this.addAnswer}>Ajouter une réponse</Button>
			</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	return {
		"questions": state.createPollForm.createPollForm.questions
	};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"toggleAnswersDeletionStatusForQuestionInStore": function(question, status) {
			dispatch(toggleAnswersDeletionStatusForQuestion(question, status));
		},
		"updateMinimumAnswersCountForQuestionInStore": function(question, value) {
			dispatch(updateMinimumAnswersCountForQuestion(question, value));
		}
	};
};

AnswersList = connect(mapStateToProps, mapDispatchToProps)(AnswersList);

export default AnswersList;
