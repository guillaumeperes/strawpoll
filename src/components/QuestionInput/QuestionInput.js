import React from "react";
import { Component } from "react";
import { Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import "./QuestionInput.css";

export default class QuestionInput extends Component {
	render() {
		return (
			<Form.Field>
				<Input size="huge" focus id={this.props.id} type="text" placeholder={this.props.placeholder}></Input>
			</Form.Field>
		);
	}
}
