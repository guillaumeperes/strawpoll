import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateQuestionValue } from "../../actions.js";
import "./QuestionInput.css";

class QuestionInput extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, data) {
		if (typeof(data.value) === "string" && typeof(this.props.question) === "number") {
			this.props.updateQuestionValueInStore(this.props.question, data.value);
		}
	}

	render() {
		return (
			<Form.Field>
				<Input size="huge" focus id={this.props.id} type="text" placeholder={this.props.placeholder} onChange={this.handleChange}></Input>
			</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	return {};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"updateQuestionValueInStore": function(position, question) {
			dispatch(updateQuestionValue(position, question));
		}
	};
};

QuestionInput = connect(mapStateToProps, mapDispatchToProps)(QuestionInput);

export default QuestionInput;
