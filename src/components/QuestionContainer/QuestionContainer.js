import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import QuestionInput from "../QuestionInput/QuestionInput";
import AnswersList from "../AnswersList/AnswersList";
import QuestionOptions from "../QuestionOptions/QuestionOptions";
import { connect } from "react-redux";
import { createQuestionInStore } from "../../actions.js";
import { removeQuestionInStore } from "../../actions.js";
import "./QuestionContainer.css";

class QuestionContainer extends Component {
	constructor(props) {
		super(props);
		this.removeQuestion = this.removeQuestion.bind(this);
	}

	componentDidMount() {
		this.props.createQuestionInStore(this.props.position);
	}

	removeQuestion(event, data) {
		event.preventDefault();
		if (typeof(this.props.removeQuestionCallback) === "function") {
			this.props.removeQuestionCallback(this);
		}
	}

	componentWillUnmount() {
		this.props.removeQuestionInStore(this.props.position);
	}

	render() {
		return (
			<Segment padded>
				<QuestionInput placeholder="Entrez votre question" question={this.props.position}></QuestionInput>
				<AnswersList minimum="2" question={this.props.position}></AnswersList>
				<QuestionOptions question={this.props.position}></QuestionOptions>
			</Segment>
		);
	}
}

let mapStateToProps = function(state) {
	return {};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"createQuestionInStore": function(position) {
			dispatch(createQuestionInStore(position));
		},
		"removeQuestionInStore": function(position) {
			dispatch(removeQuestionInStore(position));
		}
	};
}

QuestionContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
 
export default QuestionContainer;
