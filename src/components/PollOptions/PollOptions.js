import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import ToggleInput from "../ToggleInput/ToggleInput";
import DuplicationCheckSelect from "../DuplicationCheckSelect/DuplicationCheckSelect";
import { connect } from "react-redux";
import { updateHasCaptcha } from "../../actions.js";
import "./PollOptions.css";

class PollOptions extends Component {
	constructor(props) {
		super(props);
		this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
	}

	handleCaptchaChange(checked) {
		if (typeof(checked) === "boolean") {
			this.props.updateCaptchaInStore(checked);
		}
	}

	render() {
		return (
			<Segment textAlign="left" tertiary>
				<Header as="h4">Paramètres généraux du sondage</Header>
				<ToggleInput handleToggleChange={this.handleCaptchaChange} label="Utiliser un captcha pour réduire le spam"></ToggleInput>
				<DuplicationCheckSelect label="Contrôler les réponses multiples"></DuplicationCheckSelect>
			</Segment>
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
		}
	};
};

PollOptions = connect(mapStateToProps, mapDispatchToProps)(PollOptions);

export default PollOptions;
