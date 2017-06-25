import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
import swal from "sweetalert2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

class VoteButton extends Component {
	static propTypes = {
		"match": PropTypes.object.isRequired,
		"location": PropTypes.object.isRequired,
		"history": PropTypes.object.isRequired,
		"cookies": PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.respondPollUrl = "https://api.strawpoll.guillaumeperes.fr/api/poll/:poll_id/answers/";
		this.resultsPollPath = "/poll/:poll_id/results/";
		this.publishVote = this.publishVote.bind(this);
	}

	throwSweetError(text) {
		swal({
			"title": "Erreur",
			"text": text,
			"type": "error",
			"confirmButtonText": "Fermer",
			"allowOutsideClick": false,
			"allowEscapeKey": false,
			"allowEnterKey": false
		}).catch(swal.noop);
	}

	publishVote(event) {
		event.preventDefault();
		let self = this;
		let store = self.props.respondPollForm;
		let data = {};

		if (typeof(store.questions) !== "object" || store.questions.length === 0) {
			self.throwSweetError("Une erreur s'est produite.");
			return;
		}
		let errorThrown = false;
		let answers = store.questions.map(function(question) {
			if (typeof(question.multipleAnswers) !== "boolean" || typeof(question.answers) !== "object") {
				self.throwSweetError("Une erreur s'est produite");
				errorThrown = true;
				return false;
			}
			if (question.answers.length === 0) {
				self.throwSweetError("Veuillez répondre à toutes les questions du sondage");
				errorThrown = true;
				return false;
			}
			if (!question.multipleAnswers && question.answers.length > 1) {
				self.throwSweetError("Veuillez renseigner une unique réponse pour cette question"); // TODO préciser quelle question
				errorThrown = true;
				return false;
			}
			return question.answers;
		});
		if (errorThrown) {
			return;
		}
		data.answers = [].concat.apply([], answers); // réduit le nombre de dimensions de answers à 1

		// Cookie (axios ne semble pas aimer le withCredentials)
		data.strawpoll_cookie = self.props.cookies.get("strawpoll_cookie");

		// Envoi des données à l'api
		let route = self.respondPollUrl.replace(":poll_id", self.props.poll);
		axios.post(route, data).then(function(result) {
			if (typeof(result.data.data.poll_id) === "number") {
				var next = self.resultsPollPath.replace(":poll_id", result.data.data.poll_id);
			}
			swal({
				"title": "Bravo !",
				"text": result.data.message,
				"type": "success",
				"confirmButtonText": "Consulter les résultats",
				"allowOutsideClick": false,
				"allowEscapeKey": false,
				"allowEnterKey": false
			}).then(function(response) {
				if (typeof(next) !== "undefined") {
					self.props.history.push(next); // Redirection vers la page des résultats
				}
			}).catch(swal.noop);
		}).catch(function(error) {
			if (typeof(error.response) !== "undefined") {
				self.throwSweetError(error.response.data.error);
			} else {
				self.throwSweetError("Une erreur s'est produite.");
			}
		});
	}

	render() {
		return (
			<Button fluid={this.props.fluid} size={this.props.size} primary={this.props.primary} onClick={this.publishVote}>{this.props.children}</Button>
		);
	}
}

const mapStateToProps = function(state) {
	return {
		"respondPollForm": state.respondPollForm.respondPollForm
	};
};

VoteButton = connect(mapStateToProps)(VoteButton);
VoteButton = withRouter(VoteButton);
VoteButton = withCookies(VoteButton);

export default VoteButton;
