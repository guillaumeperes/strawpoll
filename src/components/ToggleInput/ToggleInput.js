import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import "./ToggleInput.css";

export default class ToggleInput extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, data) {
		if (typeof(this.props.handleToggleChange) === "function") {
			this.props.handleToggleChange(data.checked);
		}
	}

	render() {
		return (
			<Form.Field>
				<Checkbox toggle name={this.props.name} label={this.props.label} onChange={this.handleChange}></Checkbox>
			</Form.Field>
		);
	}
}
