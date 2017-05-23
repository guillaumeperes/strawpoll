import React from "react";
import { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert2";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "sweetalert2/dist/sweetalert2.min.css";
import "./PublishPollButton.css";

class PublishPollButton extends Component {
	static propTypes = {
		"match": PropTypes.object.isRequired,
		"location": PropTypes.object.isRequired,
		"history": PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.savePollUrl = "https://api.strawpoll.guillaumeperes.fr/api/poll/";
		this.respondPollPath = "/poll/:poll_id/";
		this.publishPoll = this.publishPoll.bind(this);
	}

	throwSweetError(text) {
		swal({
			"title": "Erreur",
			"titleText": text,
			"type": "error",
			"confirmButtonText": "Fermer",
			"showCloseButton": true
		});
	}

	// TODO : ajouter le user id
	publishPoll(event) {
		event.preventDefault();
		let self = this;
		let store = self.props.createPollForm;
		let data = {};

		// Question et liste des réponses
		if (typeof(store.question) !== "string" || store.question.length === 0) {
			self.throwSweetError("Veuillez renseigner une question");
			return;
		}
		if (typeof(store.answers) !== "object") {
			self.throwSweetError("Format des réponses invalide");
			return;
		}
		let answers = store.answers.filter(function(answer) {
			return answer.answer.length > 0;
		});
		if (answers.length < self.props.minimumAnswersCount) {
			self.throwSweetError("Nombre de réponses insuffisant");
			return;
		}
		answers = answers.sort(function(a, b) {
			if (a.position > b.position) {
				return 1;
			} else if (a.position < b.position) {
				return -1;
			} else {
				return 0;
			}
		});
		let question = {
			"question": store.question,
			"answers": []
		};
		question.answers = answers.map(function(answer) {
			return answer.answer;
		});
		data.questions = [];
		data.questions.push(question);

		// Méthode de contrôle des votes multiples
		if (typeof(store.duplicationCheckId) !== "number") {
			self.throwSweetError("Aucune méthode de contrôle des votes multiples n'a été renseignée");
			return;
		}
		data.duplication_check = store.duplicationCheckId;

		// Has captcha
		if (typeof(store.hasCaptcha) !== "boolean") {
			self.throwSweetError("Le paramètre captcha est invalide");
			return;
		}
		data.has_captcha = store.hasCaptcha;

		// Multiple
		if (typeof(store.multipleAnswers) !== "boolean") {
			self.throwSweetError("Le paramètre des réponses multiples est invalide");
			return;
		}
		data.multiple_answers = store.multipleAnswers;

		// Is draft
		if (typeof(store.isDraft) !== "boolean") {
			self.throwSweetError("Erreur sur le statut du sondage");
			return;
		}
		data.is_draft = store.isDraft;

		// Envoi des données du sondage
		axios.post(self.savePollUrl, data).then(function(result) {
			if (typeof(result.data.data.poll_id) === "number") {
				var next = self.respondPollPath.replace(":poll_id", result.data.data.poll_id);
			}
			swal({
				"title": "Bravo",
				"titleText": result.data.message,
				"type": "success",
				"confirmButtonText": "Continuer vers le sondage",
				"showCloseButton": true
			}).then(function(response) {
				if (typeof(next) !== "undefined") {
					self.props.history.push(next); // Redirection vers la page de réponse
				}
			});
		}).catch(function(error) {
			self.throwSweetError("Une erreur s'est produite.");
		});
	}

	render() {
		return (
			<Button size="huge" primary onClick={this.publishPoll}>{this.props.children}</Button>
		);
	}
}

let mapStateToProps = function(state) {
	return {
		"createPollForm": state.createPollForm.createPollForm,
		"minimumAnswersCount": state.answers.minimumAnswersCount
	};
}

PublishPollButton = connect(mapStateToProps)(PublishPollButton);
PublishPollButton = withRouter(PublishPollButton);

export default PublishPollButton;
