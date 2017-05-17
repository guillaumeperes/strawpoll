import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import "./Footer.css";

export default class Footer extends Component {
	render() {
		return (
			<Segment id="Footer" inverted vertical>
				<Container>
					<Grid stackable divided columns={2}>
						<Grid.Row>
							<Grid.Column width={5}>
								<Header as="h4" inverted>Strawpoll</Header>
								<List inverted link>
									<List.Item as="a" href="https://github.com/guillaumeperes/strawpoll_frontend" target="_blank">Code source</List.Item>
									<List.Item as="a" href="https://github.com/guillaumeperes/strawpoll_backoffice" target="_blank">API</List.Item>
									<List.Item as="a" href="mailto:adam.attafi@gmail.com">Contact</List.Item>
									<List.Item as="a" href="#">Conditions d'utilisation</List.Item>
								</List>
							</Grid.Column>
							<Grid.Column width={7}>
								<Header as="h4" inverted>À propos</Header>
								<p>Application développée par Adam Attafi, Guillaume Peres et Sébastien Verneyre.</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</Segment>
		);
	}
}
