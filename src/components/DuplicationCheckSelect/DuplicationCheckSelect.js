import React from "react";
import { Component } from "react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import "./DuplicationCheckSelect.css";

export default class DuplicationCheckSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"duplicationChecks": [],
			"isLoading": false
		}
		this.duplicationChecksUrl = "https://api.strawpoll.guillaumeperes.fr/api/duplicationchecks";
	}

	componentDidMount() {
		let self = this;
		self.setState({
			"duplicationChecks": [],
			"isLoading": true
		});
		axios.get(self.duplicationChecksUrl).then(function(result) {
			if (result.status === 200 && typeof(result.data.duplication_checks) !== "undefined") {
				let items = result.data.duplication_checks.map(function(item) {
					return {
						"value": item.id,
						"text": item.label
					};
				});
				self.setState({
					"duplicationChecks": items,
					"isLoading": false
				});
			}
		}).catch(function(error) {
			self.setState({
				"duplicationChecks": [],
				"isLoading": true
			});
		});
	}

	render() {
		if (this.state.isLoading) {
			var dropdown = <Dropdown placeholder={this.props.label} loading selection fluid options={this.state.duplicationChecks} />
		} else {
			var dropdown = <Dropdown placeholder={this.props.label} selection fluid options={this.state.duplicationChecks} />
		}
		return (
			<Form.Field>{dropdown}</Form.Field>
		);
	}
}
