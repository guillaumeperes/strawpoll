import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { Dimmer } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import axios from "axios";
import PageNotFound from "../PageNotFound/PageNotFound";
import AppTitle from "../AppTitle/AppTitle";
import VoteCheckbox from "../VoteCheckbox/VoteCheckbox";
import VoteButton from "../VoteButton/VoteButton";
import "./RespondPollForm.css";

export default class RespondPollForm extends Component {
	constructor(props) {
		super(props);
		this.pollUrl = "https://api.strawpoll.guillaumeperes.fr/api/poll/:poll_id/";
		this.state = {
			"isLoading": true,
			"pollExists": true,
			"poll": {}
		};
	}

	throwPollNotFound() {
		this.setState({
			"isLoading": false,
			"pollExists": false,
			"poll": {}
		});
	}

	componentDidMount() {
		let self = this;
		if (typeof(self.props.match.params.poll_id) === "undefined") {
			self.throwPollNotFound();
			return;
		}
		let route = self.pollUrl.replace(":poll_id", self.props.match.params.poll_id);
		axios.get(route).then(function(result) {
			if (typeof(result.data) === "object") {
				let poll = {};
				poll.id = result.data.id;
				poll.question = result.data.question.question;
				poll.answers = result.data.question.answers.map(function(item) {
					return {
						"id": item.id,
						"text": item.answer
					};
				});
				poll.hasCaptcha = result.data.has_captcha;
				poll.multipleAnswers = result.data.multiple_answers;
				poll.published = result.data.published;
				self.setState({
					"isLoading": false,
					"pollExists": true,
					"poll": poll
				});
			} else {
				self.throwPollNotFound();
			}
		}).catch(function(error) {
			self.throwPollNotFound();
		});
	}

	renderAnswers() {
		let self = this;
		let answers = self.store.answers;
		if (typeof(answers) === "object" && answers.length > 0) {
			let out = answers.map(function(answer) {
				if (self.store.poll.multipleAnswers) {
					// Todo (réponses multiples autorisées)
				} else {
					// Todo (réponses multiples interdites)
				}
			});
		}
	}

	render() {
		if (!this.state.pollExists) {
			return <PageNotFound></PageNotFound>
		} else {
			return (
				<Segment vertical id="RespondPollForm" textAlign="center">
					<Container text>
						<AppTitle></AppTitle>
						<Divider horizontal inverted></Divider>
						{ 
							this.state.isLoading ? (
								<Dimmer active page inverted>
									<Loader size="large">Chargement du sondage en cours</Loader>
								</Dimmer>
							) : (
								<div>
									<Header as="h1" inverted>{this.state.poll.question}</Header>
									<Form>
										<Container textAlign="center">
											<VoteButton>Voter</VoteButton>
										</Container>
									</Form>
								</div>
							) 
						}
					</Container>
				</Segment>
			);
		}
	}
}
