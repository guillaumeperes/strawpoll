import React from "react";
import { Component } from "react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import "./DuplicationCheckSelect.css";

export default class DuplicationCheckSelect extends Component {
	duplicationChecksUrl = "https://api.strawpoll.guillaumeperes.fr/api/duplicationchecks";
	state = {
		"duplicationChecks": []
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let self = this;
		axios.get(this.duplicationChecksUrl).then(function(result) {
			if (result.status == 200 && typeof(result.data.duplication_checks) !== "undefined") {
				let items = result.data.duplication_checks.map(function(item) {
					let out = {
						"value": item.id,
						"text": item.label
					};
					return out;
				});
				self.setState({
					"duplicationChecks": items
				});
			}
		});
	}

	render() {
		return (
			<Form.Field>
				<Dropdown placeholder={this.props.label} label="test" selection fluid options={this.state.duplicationChecks} />
			</Form.Field>
		);
	}
}
