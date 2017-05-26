import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import "./VoteCheckbox.css";

class VoteCheckbox extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, data) {
		// TODO
	}

	render() {
		return (
			<Form.Field>
				<Checkbox label={this.props.answer} onChange={this.handleChange}></Checkbox>
			</Form.Field>
		);
	}
}

export default VoteCheckbox;
