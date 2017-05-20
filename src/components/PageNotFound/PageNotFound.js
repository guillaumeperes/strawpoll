import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppTitle from "../AppTitle/AppTitle";
import "./PageNotFound.css";

class PageNotFound extends Component {
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
		this.props.history.push("/");
	}

	render() {
		return (
			<Segment vertical id="PageNotFound" textAlign="center">
				<Container text>
					<AppTitle></AppTitle>
					<Divider horizontal inverted></Divider>
					<Icon inverted name="map outline" size="huge"></Icon>
					<Header as="h2" inverted>Erreur, cette page est introuvable</Header>
					<Divider horizontal inverted></Divider>
					<Button primary size="large" onClick={this.handleClick}><Icon name="home"></Icon> Revenir à la page d'accueil</Button>
				</Container>
			</Segment>
		);
	}
}

PageNotFound = withRouter(PageNotFound);

export default PageNotFound;
