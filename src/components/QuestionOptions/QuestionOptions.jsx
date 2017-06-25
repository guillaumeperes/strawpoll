import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateMultipleAnswersForQuestion } from "../../actions.js";

class QuestionOptions extends Component {
	constructor(props) {
		super(props);
		this.handleMultipleAnswersChange = this.handleMultipleAnswersChange.bind(this);
	}

	handleMultipleAnswersChange(event, data) {
		if (typeof(data.checked) === "boolean") {
			this.props.updateMultipleAnswersForQuestionInStore(this.props.question, data.checked);
		}
	}

	render() {
		return (
			<Segment textAlign="left" tertiary>
				<Header as="h4">Paramètres de la question</Header>
				<Form.Field>
					<Checkbox toggle label="Autoriser plusieurs réponses" onChange={this.handleMultipleAnswersChange}></Checkbox>
				</Form.Field>
			</Segment>
		);
	}
}

const mapStateToProps = function(state) {
	return {};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"updateMultipleAnswersForQuestionInStore": function(question, status) {
			dispatch(updateMultipleAnswersForQuestion(question, status));
		}
	};
};

QuestionOptions = connect(mapStateToProps, mapDispatchToProps)(QuestionOptions);

export default QuestionOptions;
