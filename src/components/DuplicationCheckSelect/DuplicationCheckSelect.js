import React from "react";
import { Component } from "react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { udpateDuplicationCheck } from "../../actions.js";
import "./DuplicationCheckSelect.css";

class DuplicationCheckSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"duplicationChecks": [],
			"isLoading": true
		}
		this.duplicationChecksUrl = "https://api.strawpoll.guillaumeperes.fr/api/duplicationchecks";
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		let self = this;
		self.setState({
			"duplicationChecks": [],
			"isLoading": true
		});
		axios.get(self.duplicationChecksUrl).then(function(result) {
			if (typeof(result.data.duplication_checks) !== "undefined") {
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

	handleChange(event, data) {
		if (typeof(data.value) === "number") {
			this.props.udpateDuplicationCheckInStore(data.value);
		}
	}

	render() {
		var dropdown;
		if (this.state.isLoading) {
			dropdown = <Dropdown placeholder={this.props.label} loading disabled selection fluid options={this.state.duplicationChecks} />
		} else {
			dropdown = <Dropdown placeholder={this.props.label} selection fluid options={this.state.duplicationChecks} onChange={this.handleChange} />
		}
		return (
			<Form.Field>{dropdown}</Form.Field>
		);
	}
}

let mapStateToProps = function(state) {
	return {};
};

let mapDispatchToProps = function(dispatch) {
	return {
		"udpateDuplicationCheckInStore": function(id) {
			dispatch(udpateDuplicationCheck(id));
		}
	};
};

DuplicationCheckSelect = connect(mapStateToProps, mapDispatchToProps)(DuplicationCheckSelect);

export default DuplicationCheckSelect;
