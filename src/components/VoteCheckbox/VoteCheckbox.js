import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import { addAnswerForQuestionForResponse } from "../../actions.js";
import { removeAnswerForQuestionForResponse } from "../../actions.js";
import "./VoteCheckbox.css";

class VoteCheckbox extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, data) {
		if (typeof(data.checked) === "boolean" && data.checked) {
			this.props.addAnswerForQuestionForResponseInStore(this.props.questionId, this.props.answerId);
		} else if (typeof(data.checked) === "boolean" && !data.checked) {
			this.props.removeAnswerForQuestionForResponseInStore(this.props.questionId, this.props.answerId);
		}
	}

	render() {
		return (
			<Form.Field>
				<Checkbox label={this.props.answer} onChange={this.handleChange}></Checkbox>
			</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	return {};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"addAnswerForQuestionForResponseInStore": function(question, answer) {
			dispatch(addAnswerForQuestionForResponse(question, answer));
		},
		"removeAnswerForQuestionForResponseInStore": function(question, answer) {
			dispatch(removeAnswerForQuestionForResponse(question, answer));
		}
	};
};

VoteCheckbox = connect(mapStateToProps, mapDispatchToProps)(VoteCheckbox);

export default VoteCheckbox;
