import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { setQuestionValue } from "../../actions.js";
import "./QuestionInput.css";

class QuestionInput extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, data) {
		if (typeof(data.value) === "string") {
			this.props.setQuestionInStore(data.value);
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
		"setQuestionInStore": function(question) {
			dispatch(setQuestionValue(question));
		}
	};
};

QuestionInput = connect(mapStateToProps, mapDispatchToProps)(QuestionInput);

export default QuestionInput;
