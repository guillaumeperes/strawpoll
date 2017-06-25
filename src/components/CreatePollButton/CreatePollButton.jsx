import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class CreatePollButton extends Component {
	static propTypes = {
		"match": PropTypes.object.isRequired,
		"location": PropTypes.object.isRequired,
		"history": PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		if (this.props.location.pathname !== "/") {
			this.props.history.push("/");
		}
	}

	render() {
		return (
			<Button primary compact onClick={this.handleClick}><Icon name="write" size="large"></Icon> Créer un sondage</Button>
		);
	}
}

CreatePollButton = withRouter(CreatePollButton);

export default CreatePollButton;
