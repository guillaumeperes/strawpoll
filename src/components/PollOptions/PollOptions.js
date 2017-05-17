import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Segment } from "semantic-ui-react";
import ToggleInput from "../ToggleInput/ToggleInput";
import DuplicationCheckSelect from "../DuplicationCheckSelect/DuplicationCheckSelect";
import { connect } from "react-redux";
import { updateMultipleAnswers } from "../../actions.js";
import { updateHasCaptcha } from "../../actions.js";
import "./PollOptions.css";

class PollOptions extends Component {
	constructor(props) {
		super(props);
		this.handleMultipleAnswersChange = this.handleMultipleAnswersChange.bind(this);
		this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
	}

	handleMultipleAnswersChange(checked) {
		if (typeof(checked) === "boolean") {
			this.props.updateMultipleAnswersInStore(checked);
		}
	}

	handleCaptchaChange(checked) {
		if (typeof(checked) === "boolean") {
			this.props.updateCaptchaInStore(checked);
		}
	}

	render() {
		return (
			<Form.Field>
				<Segment textAlign="left" tertiary>
					<ToggleInput handleToggleChange={this.handleMultipleAnswersChange} label="Autoriser plusieurs réponses"></ToggleInput>
					<ToggleInput handleToggleChange={this.handleCaptchaChange} label="Utiliser un captcha pour réduire le spam"></ToggleInput>
					<DuplicationCheckSelect label="Contrôler les réponses multiples"></DuplicationCheckSelect>
				</Segment>
			</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	return {};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"updateCaptchaInStore": function(value) {
			dispatch(updateHasCaptcha(value));
		},
		"updateMultipleAnswersInStore": function(value) {
			dispatch(updateMultipleAnswers(value));
		}
	};
};

PollOptions = connect(mapStateToProps, mapDispatchToProps)(PollOptions);

export default PollOptions;
