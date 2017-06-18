import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Dimmer } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Statistic } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import AppTitle from "../AppTitle/AppTitle";
import QuestionResults from "../QuestionResults/QuestionResults";
import PageNotFound from "../PageNotFound/PageNotFound";
import ShareButton from "../ShareButton/ShareButton";
import socketio from "socket.io-client";
import axios from "axios";
import "./ResultsPoll.css";

export default class ResultsPoll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"loading": {
				"initialResults": true,
				"realTimeSocket": true
			},
			"pollExists": true,
			"poll": {}
		};
		this.handleBackToVote = this.handleBackToVote.bind(this);
		this.resultsPollUrl = "https://api.strawpoll.guillaumeperes.fr/api/poll/:poll_id/results/";
		this.channelPollUrl = "https://api.strawpoll.guillaumeperes.fr/api/poll/:poll_id/results/channel";
		this.realTimePollUrl = "https://api.strawpoll.guillaumeperes.fr";
		this.respondPollPath = "/poll/:poll_id/";
	}

	throwPollNotFound() {
		this.setState({
			"loading": {
				"initialResults": false,
				"realTimeSocket": false
			},
			"pollExists": false,
			"poll": {}
		});
	}

	parsePollResults(results) {
		let poll = {};
		if (typeof(results.id) === "undefined") {
			return null;
		}
		poll.id = results.id;
		if (typeof(results.duplication_check.label) !== "string") {
			return null;
		}
		poll.duplicationCheck = results.duplication_check.label;
		if (typeof(results.total_votes) !== "number") {
			return null;
		}
		poll.totalVotes = results.total_votes;
		if (typeof(results.total_comments) !== "number") {
			return null;
		}
		poll.totalComments = results.total_comments;
		if (typeof(results.questions) !== "object") {
			return null;
		}
		let errorThrown = false;
		poll.questions = results.questions.map(function(question) {
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
			out.answers = question.answers.map(function(answer) {
				if (typeof(answer.id) !== "number" || typeof(answer.answer) !== "string" || typeof(answer.votes) !== "number") {
					errorThrown = true;
					return false;
				}
				return answer;
			});
			return out;
		});
		if (errorThrown) {
			return null;
		}
		return poll;
	}

	componentDidMount() {
		let self = this;

		if (typeof(self.props.match.params.poll_id) === "undefined") {
			self.throwPollNotFound();
			return;
		}

		// Premiers résultats du sondage
		let resultsRoute = self.resultsPollUrl.replace(":poll_id", self.props.match.params.poll_id);
		axios.get(resultsRoute).then(function(pollResults) {
			if (typeof(pollResults.data.data.results) !== "object") {
				throw new Error("Can't get poll results");
			}
			let poll = self.parsePollResults(pollResults.data.data.results);
			if (typeof(poll) === "undefined") {
				throw new Error("No poll");
			}
			let newState = Object.assign({}, self.state, {
				"loading": Object.assign({}, self.state.loading, {
					"initialResults": false
				}),
				"poll": poll
			});
			self.setState(newState);
		}).catch(function(error) {
			self.throwPollNotFound();
		});

		// Connexion avec l'api en temps réel
		let channelRoute = self.channelPollUrl.replace(":poll_id", self.props.match.params.poll_id);
		axios.get(channelRoute).then(function(channelResults) {
			if (typeof(channelResults.data.data.channel) === "undefined") {
				throw new Error("Can't get poll channel");
			}
			let socket = socketio(self.realTimePollUrl);
			socket.on("connect", function() {
				socket.emit("join_channel", channelResults.data.data.channel);
				let newState = Object.assign({}, self.state, {
					"loading": Object.assign({}, self.state.loading, {
						"realTimeSocket": false
					})
				});
				self.setState(newState);
				socket.on("results", function(pollResults) {
					let poll = self.parsePollResults(pollResults);
					if (typeof(poll) !== "undefined") {
						let newState = Object.assign({}, self.state, {
							"poll": poll
						});
						self.setState(newState);
					}
				});
			});
		}).catch(function() {
			self.throwPollNotFound();
		});

		// Scroll vers le haut de la page
		window.scrollTo(0, 0);
	}

	handleBackToVote(event) {
		event.preventDefault();
		if (typeof(this.props.match.params.poll_id) !== "undefined") {
			let respondPollRoute = this.respondPollPath.replace(":poll_id", this.props.match.params.poll_id);
			this.props.history.push(respondPollRoute);
		}
	}

	renderResults() {
		let out = this.state.poll.questions.map(function(question, i) {
			return <QuestionResults key={i} question={question.question} answers={question.answers}></QuestionResults>
		});
		return out;
	}

	render() {
		if (!this.state.pollExists) {
			return <PageNotFound></PageNotFound>
		} else if (this.state.loading.initialResults || this.state.loading.realTimeSocket) {
			return (
				<Segment vertical id="ResultsPoll" textAlign="center">
					<Container text>
						<AppTitle></AppTitle>
						<Divider horizontal inverted></Divider>
						<Dimmer active page inverted>
							<Loader size="large">Chargement des résultats en cours</Loader>
						</Dimmer>
					</Container>
				</Segment>
			);
		} else {
			return (
				<Segment vertical id="ResultsPoll" textAlign="center">
					<Container text>
						<AppTitle></AppTitle>
						<Divider horizontal inverted></Divider>
						{ this.renderResults() }
						<Divider horizontal inverted></Divider>
						<Statistic inverted horizontal value={this.state.poll.totalVotes} label="votes"></Statistic>
						<Statistic inverted horizontal value={this.state.poll.totalComments} label="commentaires"></Statistic>
						<Divider horizontal inverted></Divider>
						<Grid stackable>
							<Grid.Row only="computer tablet">
								<Grid.Column textAlign="center" width={16}>
									<Button primary size="huge" onClick={this.handleBackToVote}>Retour au vote</Button>
									<ShareButton size="huge" tooltip="Partager ce sondage"><Icon name="share alternate"></Icon> Partager</ShareButton>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row only="mobile">
								<Grid.Column textAlign="center" width={16}>
									<Button primary fluid size="huge" onClick={this.handleBackToVote}>Retour au vote</Button>
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
