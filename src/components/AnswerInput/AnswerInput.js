import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateAnswerValue } from "../../actions.js";
import { removeAnswerValue } from "../../actions.js";
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

	componentWillUnmount() {
		this.props.removeAnswerValueInStore(this.props.position);
	}

	handleChange(event, data) {
		if (typeof(data.value) === "string") {
			this.props.updateAnswerValueInStore(this.props.position, data.value);
		}
	}

	render() {
		return (
			<Form.Field>
				<Input type="text" placeholder={this.props.placeholder} onChange={this.handleChange} icon={ this.props.answerDeletionEnabled ? <Icon size="large" name="trash" link onClick={this.removeAnswer}></Icon> : false } />
			</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	return {
		"answerDeletionEnabled": state.answers.answerDeletionEnabled
	};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"updateAnswerValueInStore": function(position, answer) {
			dispatch(updateAnswerValue(position, answer));
		},
		"removeAnswerValueInStore": function(position) {
			dispatch(removeAnswerValue(position));
		}
	}
};

AnswerInput = connect(mapStateToProps, mapDispatchToProps)(AnswerInput);

export default AnswerInput;
