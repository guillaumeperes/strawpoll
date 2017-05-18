import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import AnswerInput from "../AnswerInput/AnswerInput";
import { connect } from "react-redux";
import { toggleAnswerDeletionStatus } from "../../actions.js";
import { updateMinimumAnswersCount } from "../../actions.js";
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
			answers.push(<AnswerInput key={i} position={i} placeholder="Entrez une réponse" removeAnswerCallback={this.removeAnswer}></AnswerInput>);
		}
		this.setState({
			"answers": answers,
			"position": i
		});
		// Mises à jour du store
		this.props.updateMinimumAnswersCountInStore(minimum);
		if (answers.length > minimum) {
			this.props.toggleAnswerDeletionStatus(true);
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
		if (answers.length > this.props.minimumAnswersCount) {
			this.props.toggleAnswerDeletionStatus(true)
		}
	}

	removeAnswer(answer) {
		if (typeof(answer) === "object" && typeof(answer.props.position) === "number") {
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
				if (answers.length <= this.props.minimumAnswersCount) {
					this.props.toggleAnswerDeletionStatus(false);
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
		"minimumAnswersCount": state.answers.minimumAnswersCount
	};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"toggleAnswerDeletionStatus": function(newStatus) {
			dispatch(toggleAnswerDeletionStatus(newStatus));
		},
		"updateMinimumAnswersCountInStore": function(value) {
			dispatch(updateMinimumAnswersCount(value));
		}
	};
};

AnswersList = connect(mapStateToProps, mapDispatchToProps)(AnswersList);

export default AnswersList;
