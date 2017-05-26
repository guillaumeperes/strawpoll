import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import ToggleInput from "../ToggleInput/ToggleInput";
import { updateMultipleAnswersForQuestion } from "../../actions.js";
import { connect } from "react-redux";
import "./QuestionOptions.css";

class QuestionOptions extends Component {
	constructor(props) {
		super(props);
		this.handleMultipleAnswersChange = this.handleMultipleAnswersChange.bind(this);
	}

	handleMultipleAnswersChange(checked) {
		if (typeof(checked) === "boolean") {
			this.props.updateMultipleAnswersForQuestionInStore(this.props.question, checked);
		}
	}

	render() {
		return (
			<Segment textAlign="left" tertiary>
				<Header as="h4">Paramètres de la question</Header>
				<ToggleInput handleToggleChange={this.handleMultipleAnswersChange} label="Autoriser plusieurs réponses"></ToggleInput>
			</Segment>
		);
	}
}

let mapStateToProps = function(state) {
	return {};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"updateMultipleAnswersForQuestionInStore": function(question, status) {
			dispatch(updateMultipleAnswersForQuestion(question, status));
		}
	};
};

QuestionOptions = connect(mapStateToProps, mapDispatchToProps)(QuestionOptions);

export default QuestionOptions;
