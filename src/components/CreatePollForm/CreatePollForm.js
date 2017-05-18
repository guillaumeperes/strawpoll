import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import AppTitle from "../AppTitle/AppTitle";
import QuestionInput from "../QuestionInput/QuestionInput";
import AnswersList from "../AnswersList/AnswersList";
import PollOptions from "../PollOptions/PollOptions";
import SavePollButton from "../SavePollButton/SavePollButton";
import PublishPollButton from "../PublishPollButton/PublishPollButton";
import "./CreatePollForm.css";

export default class CreatePollForm extends Component {
	render() {
		return (
			<Segment id="CreatePoll" vertical textAlign="center">
				<Container text>
					<AppTitle></AppTitle>
					<Divider horizontal inverted></Divider>
					<Form>
						<QuestionInput placeholder="Entrez votre question"></QuestionInput>
						<AnswersList minimum="2"></AnswersList>
						<PollOptions></PollOptions>
						<Container textAlign="center">
							<PublishPollButton>Publier</PublishPollButton>
							<SavePollButton tooltip="Sauvegarder le sondage pour le publier plus tard"><Icon name="save"></Icon> Sauvegarder</SavePollButton>
						</Container>
					</Form>
				</Container>
			</Segment>
		);
	}
}
