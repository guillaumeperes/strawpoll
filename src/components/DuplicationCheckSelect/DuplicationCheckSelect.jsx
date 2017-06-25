import React from "react";
import { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import { udpateDuplicationCheck } from "../../actions.js";

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

	setLoading() {
		this.setState({
			"duplicationChecks": [],
			"isLoading": true
		});
	}

	setOptions(options) {
		this.setState({
			"duplicationChecks": options,
			"isLoading": false
		});
	}

	componentDidMount() {
		let self = this;
		self.setLoading();
		axios.get(self.duplicationChecksUrl).then(function(result) {
			if (typeof(result.data.duplication_checks) !== "undefined") {
				let items = result.data.duplication_checks.map(function(item) {
					return {
						"value": item.id,
						"text": item.label
					};
				});
				self.setOptions(items);
			}
		}).catch(function(error) {
			self.setLoading();
		});
	}

	handleChange(event, data) {
		if (typeof(data.value) === "number") {
			this.props.udpateDuplicationCheckInStore(data.value);
		}
	}

	renderDropdown() {
		if (this.state.isLoading) {
			return <Dropdown placeholder={this.props.label} loading disabled selection fluid options={this.state.duplicationChecks} />
		} else {
			return <Dropdown placeholder={this.props.label} selection fluid options={this.state.duplicationChecks} onChange={this.handleChange} />
		}
	}

	render() {
		return (
			<Form.Field>
				{ this.renderDropdown() }
			</Form.Field>
		);
	}
}

const mapStateToProps = function(state) {
	return {};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"udpateDuplicationCheckInStore": function(id) {
			dispatch(udpateDuplicationCheck(id));
		}
	};
};

DuplicationCheckSelect = connect(mapStateToProps, mapDispatchToProps)(DuplicationCheckSelect);
export default DuplicationCheckSelect;
