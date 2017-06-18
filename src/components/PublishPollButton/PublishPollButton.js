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
			"text": text,
			"type": "error",
			"confirmButtonText": "Fermer",
			"allowOutsideClick": false,
			"allowEscapeKey": false,
			"allowEnterKey": false
		}).catch(swal.noop);
	}

	// TODO : ajouter le user id
	publishPoll(event) {
		event.preventDefault();
		let self = this;
		let store = self.props.createPollForm;
		let data = {};

		// Liste des questions
		if (typeof(store.questions) !== "object") {
			self.throwSweetError("Une erreur s'est produite.");
			return;
		}
		if (store.questions.length < store.minimumQuestionsCount) {
			self.throwSweetError("Vous n'avez pas renseigné assez de questions.");
			return;
		}
		let sortedQuestions = store.questions.sort(function(a, b) {
			if (a.position > b.position) {
				return 1;
			} else if (a.position < b.position) {
				return -1;
			} else {
				return 0;
			}
		});
		let errorThrown = false;
		let questions = sortedQuestions.map(function(question) {
			// Vérifie que la valeur de la question est valide
			if (typeof(question.question) !== "string" || question.question.trim().length === 0) {
				self.throwSweetError("Vous avez renseigné une question vide."); // TODO : indiquer sur le formulaire quel input est concerné en le mettant en surbrillance
				errorThrown = true;
				return false;
			}
			// Vérifie que la valeur du paramètre autorisant les réponses multiples est valide
			if (typeof(question.multipleAnswers) !== "boolean") {
				self.throwSweetError("Paramètre des réponses multiple invalide."); // TODO : indiquer sur le formulaire quel input est concerné en le mettant en surbrillance
				errorThrown = true;
				return false;
			}
			// Vérifie la valeur des réponses
			if (typeof(question.answers) !== "object") {
				self.throwSweetError("Format des réponses invalide");
				errorThrown = true;
				return false;
			}
			let answers = question.answers.filter(function(answer) {
				return answer.answer.trim().length > 0;
			});
			if (answers.length < question.minimumAnswersCount) {
				self.throwSweetError("Nombre de réponses insuffisant sur une question."); // TODO : indiquer sur le formulaire la question concernée
				errorThrown = true;
				return false;
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
			let out = {
				"question": question.question,
				"multiple_answers": question.multipleAnswers,
				"answers": []
			};
			out.answers = answers.map(function(answer) {
				return answer.answer;
			});
			return out;
		});
		if (errorThrown) {
			return;
		}
		data.questions = questions;

		// Méthode de contrôle des votes multiples
		if (typeof(store.duplicationCheckId) !== "number") {
			self.throwSweetError("Aucune méthode de contrôle des votes multiples n'a été renseignée");
			return;
		}
		data.duplication_check = store.duplicationCheckId;

		// Has captcha
		if (typeof(store.hasCaptcha) !== "boolean") {
			self.throwSweetError("Veuillez indiquer si le sondage doit comporter un captcha.");
			return;
		}
		data.has_captcha = store.hasCaptcha;

		// Is draft
		if (typeof(store.isDraft) !== "boolean") {
			self.throwSweetError("Erreur sur le statut du sondage.");
			return;
		}
		data.is_draft = store.isDraft;

		// Envoi des données à l'API
		axios.post(self.savePollUrl, data).then(function(result) {
			if (typeof(result.data.data.poll_id) === "number") {
				var next = self.respondPollPath.replace(":poll_id", result.data.data.poll_id);
			}
			swal({
				"title": "Bravo !",
				"text": result.data.message,
				"type": "success",
				"confirmButtonText": "Continuer vers le sondage",
				"allowOutsideClick": false,
				"allowEscapeKey": false,
				"allowEnterKey": false
			}).then(function(response) {
				if (typeof(next) !== "undefined") {
					self.props.history.push(next); // Redirection vers la page de réponse
				}
			}).catch(swal.noop);
		}).catch(function(error) {
			self.throwSweetError("Une erreur s'est produite.");
		});
	}

	render() {
		return (
			<Button fluid={this.props.fluid} size={this.props.size} primary={this.props.primary} onClick={this.publishPoll}>{this.props.children}</Button>
		);
	}
}

let mapStateToProps = function(state) {
	return {
		"createPollForm": state.createPollForm.createPollForm
	};
}

PublishPollButton = connect(mapStateToProps)(PublishPollButton);
PublishPollButton = withRouter(PublishPollButton);

export default PublishPollButton;
