import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { Dimmer } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import PageNotFound from "../PageNotFound/PageNotFound";
import AppTitle from "../AppTitle/AppTitle";
import VoteContainer from "../VoteContainer/VoteContainer";
import VoteButton from "../VoteButton/VoteButton";
import ShareButton from "../ShareButton/ShareButton";
import "./RespondPollForm.css";

export default class RespondPollForm extends Component {
	constructor(props) {
		super(props);
		this.pollUrl = "https://api.strawpoll.guillaumeperes.fr/api/poll/:poll_id/";
		this.resultsPollPath = "/poll/:poll_id/results/";
		this.handleGoToResults = this.handleGoToResults.bind(this);
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
			if (typeof(result.data) !== "object") {
				throw Error();
			}
			let poll = {};
			if (typeof(result.data.id) === "undefined") {
				throw Error();
			}
			poll.id = result.data.id;
			if (typeof(result.data.has_captcha) !== "boolean") {
				throw Error();
			}
			poll.hasCaptcha = result.data.has_captcha;
			if (typeof(result.data.created) === "undefined") {
				throw Error();
			}
			poll.created = result.data.created;
			if (typeof(result.data.updated) === "undefined") {
				throw Error();
			}
			poll.updated = result.data.updated;
			if (typeof(result.data.published) === "undefined") {
				throw Error();
			}
			poll.published = result.data.published;
			if (typeof(result.data.questions) !== "object") {
				throw Error();
			}
			let errorThrown = false;
			poll.questions = result.data.questions.map(function(question) {
				if (errorThrown) {
					return false;
				}
				let out = {};
				if (typeof(question.id) !== "number") {
					errorThrown = true;
					return false;
				}
				out.id = question.id;
				if (typeof(question.question) !== "string") {
					errorThrown = true;
					return false;
				}
				out.question = question.question;
				if (typeof(question.answers) !== "object") {
					errorThrown = true;
					return false;
				}
				let answers = question.answers.map(function(answer) {
					if (typeof(answer.id) !== "number" || typeof(answer.answer) !== "string") {
						errorThrown = true;
						return false;
					}
					return answer;
				});
				out.answers = answers;
				if (typeof(question.multiple_answers) !== "boolean") {
					errorThrown = true;
					return false;
				}
				out.multipleAnswers = question.multiple_answers;
				return out;
			});
			if (errorThrown) {
				throw Error();
			}
			self.setState({
				"isLoading": false,
				"pollExists": true,
				"poll": poll
			});
		}).catch(function(error) {
			self.throwPollNotFound();
		});

		// Scroll vers le haut de la page
		window.scrollTo(0, 0);
	}

	handleGoToResults(event) {
		event.preventDefault();
		if (typeof(this.props.match.params.poll_id) !== "undefined") {
			let resultsPollRoute = this.resultsPollPath.replace(":poll_id", this.props.match.params.poll_id);
			this.props.history.push(resultsPollRoute);
		}
	}

	renderForm() {
		let out = this.state.poll.questions.map(function(question, i) {
			return <VoteContainer key={i} questionId={question.id} question={question.question} multipleAnswers={question.multipleAnswers} answers={question.answers}></VoteContainer>;
		});
		return out;
	}

	render() {
		if (!this.state.pollExists) {
			return <PageNotFound></PageNotFound>
		}
		if (this.state.isLoading) {
			return (
				<Segment vertical id="RespondPollForm" textAlign="center">
					<Container text>
						<AppTitle></AppTitle>
						<Divider horizontal inverted></Divider>
						<Dimmer active page inverted>
							<Loader size="large">Chargement du sondage en cours</Loader>
						</Dimmer>
					</Container>
				</Segment>
			);
		}
		if (!this.state.isLoading) {
			return (
				<Segment vertical id="RespondPollForm" textAlign="center">
					<Container text>
						<AppTitle></AppTitle>
						<Divider horizontal inverted></Divider>
						<Form>{ this.renderForm() }</Form>
						<Divider horizontal inverted></Divider>
						<Grid stackable>
							<Grid.Row only="computer tablet">
								<Grid.Column textAlign="center" width={16}>
									<VoteButton primary size="huge" poll={this.state.poll.id}>Voter</VoteButton>
									<Button size="huge" data-tooltip="Accéder aux résultats de ce sondage" onClick={this.handleGoToResults}>Résultats</Button>
									<ShareButton size="huge" tooltip="Partager ce sondage"><Icon name="share alternate"></Icon> Partager</ShareButton>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row only="mobile">
								<Grid.Column textAlign="center" width={16}>
									<VoteButton primary fluid size="huge" poll={this.state.poll.id}>Voter</VoteButton>
								</Grid.Column>
								<Grid.Column textAlign="center" width={16}>
									<Button fluid size="huge" data-tooltip="Accéder aux résultats de ce sondage" onClick={this.handleGoToResults}>Résultats</Button>
								</Grid.Column>
								<Grid.Column textAlign="center" width={16}>
									<ShareButton fluid size="huge" tooltip="Partager ce sondage"><Icon name="share alternate"></Icon> Partager</ShareButton>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
				</Segment>
			);
		}
	}
}
