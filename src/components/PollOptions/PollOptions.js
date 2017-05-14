import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Segment } from "semantic-ui-react";
import ToggleInput from "../ToggleInput/ToggleInput";
import DuplicationCheckSelect from "../DuplicationCheckSelect/DuplicationCheckSelect";

export default class PollOptions extends Component {
	render() {
		return (
			<Form.Field>
				<Segment textAlign="left" tertiary>
					<ToggleInput label="Autoriser plusieurs réponses"></ToggleInput>
					<ToggleInput label="Utiliser un captcha pour réduire le spam"></ToggleInput>
					<DuplicationCheckSelect label="Dupplication" placeholder="placeholder"></DuplicationCheckSelect>
				</Segment>
			</Form.Field>
		);
	}
}
