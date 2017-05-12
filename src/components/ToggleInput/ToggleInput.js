import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import "./ToggleInput.css";

export default class ToggleInput extends Component {
	render() {
		return (
			<Form.Field>
				<Checkbox toggle name={this.props.name} label={this.props.label}></Checkbox>
			</Form.Field>
		);
	}
}
