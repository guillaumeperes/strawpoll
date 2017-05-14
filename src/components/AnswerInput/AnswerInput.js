import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import "./AnswerInput.css";

class AnswerInput extends Component {
	constructor(props) {
		super(props);
		this.removeAnswer = this.removeAnswer.bind(this);
	}

	removeAnswer(event) {
		event.preventDefault();
		if (typeof(this.props.removeAnswerCallback) === "function") {
			this.props.removeAnswerCallback(this);
		}
	}

	render() {
		return (
			<Form.Field>
				<Input type="text" placeholder={this.props.placeholder} icon={ this.props.answerDeletionEnabled ? <Icon size="large" name="trash" link onClick={this.removeAnswer}></Icon> : false } />
			</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	return {
		"answerDeletionEnabled": state.answers.answerDeletionEnabled
	};
};

AnswerInput = connect(mapStateToProps)(AnswerInput);

export default AnswerInput;
