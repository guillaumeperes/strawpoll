import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import DuplicationCheckSelect from "../DuplicationCheckSelect/DuplicationCheckSelect";
import { updateHasCaptcha } from "../../actions.js";

class PollOptions extends Component {
	constructor(props) {
		super(props);
		this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
	}

	handleCaptchaChange(event, data) {
		if (typeof(data.checked) === "boolean") {
			this.props.updateCaptchaInStore(data.checked);
		}
	}

	render() {
		return (
			<Segment textAlign="left" tertiary>
				<Header as="h4">Paramètres généraux du sondage</Header>
				<DuplicationCheckSelect label="Contrôler les réponses multiples" />
				<Form.Field>
					<Checkbox toggle label="Utiliser un captcha pour réduire le spam" onChange={this.handleCaptchaChange} />
				</Form.Field>
			</Segment>
		);
	}
}

const mapStateToProps = function(state) {
	return {};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"updateCaptchaInStore": function(value) {
			dispatch(updateHasCaptcha(value));
		}
	};
};

PollOptions = connect(mapStateToProps, mapDispatchToProps)(PollOptions);
export default PollOptions;
