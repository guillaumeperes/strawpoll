import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import AnswerInput from "../AnswerInput/AnswerInput";
import { connect } from "react-redux";
import { toggleAnswerDeletionStatus } from "../../actions.js";
import "./AnswersList.css";

class AnswersList extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			"answers": [],
			"position": 0
		}
		this.addAnswer = this.addAnswer.bind(this);
		this.removeAnswer = this.removeAnswer.bind(this);
	}

	componentDidMount() {
		let minimum = typeof(this.props.minimum) !== "undefined" ? this.props.minimum : 2;
		let answers = [];
		for (var i = 0; i < minimum; i++) {
			answers.push(<AnswerInput key={i} position={i} placeholder="Entrez une réponse" removeAnswerCallback={this.removeAnswer}></AnswerInput>);
		}
		this.setState({
			"answers": answers,
			"position": i
		});
		if (answers.length > 2) {
			this.props.toggleAnswerDeletionStatus(true)
		}
	}

	addAnswer(event) {
		event.preventDefault();
		let answers = this.state.answers;
		let position = this.state.position + 1;
		answers.push(<AnswerInput key={position} position={position} placeholder="Entrez une réponse" removeAnswerCallback={this.removeAnswer}></AnswerInput>);
		this.setState({
			"answers": answers,
			"position": position
		});
		if (answers.length > 2) {
			this.props.toggleAnswerDeletionStatus(true)
		}
	}

	removeAnswer(answer) {
		if (typeof(answer) !== "undefined" && typeof(answer.props.position) !== "undefined") {
			let answers = this.state.answers;
			let position = answer.props.position;
			let index = answers.findIndex(function(item) {
				return typeof(item.props.position) !== "undefined" ? item.props.position === position : false;
			});
			if (index !== -1) {
				answers.splice(index, 1);
				this.setState({
					"answers": answers,
					"position": this.state.position
				});
				if (answers.length <= 2) {
					this.props.toggleAnswerDeletionStatus(false);
				}
			}
		}
	}

	render() {
		return (
			<Form.Field>
				{this.state.answers}
				<Button fluid onClick={this.addAnswer}> Ajouter une réponse</Button>
			</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	return {};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"toggleAnswerDeletionStatus": function(newStatus) {
			dispatch(toggleAnswerDeletionStatus(newStatus));
		}
	};
};

AnswersList = connect(mapStateToProps, mapDispatchToProps)(AnswersList);

export default AnswersList;
