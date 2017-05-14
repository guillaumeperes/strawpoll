import React from "react";
import { Component } from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
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
					<Header as="h1"><span className="logoFirst">Straw</span><span className="logoSecond">poll</span></Header>
					<Divider horizontal inverted></Divider>
					<Form>
						<QuestionInput id="inp_question" placeholder="Entrez votre question"></QuestionInput>
						<AnswersList minimum="2"></AnswersList>
						<PollOptions></PollOptions>
						<Container textAlign="center">
							<SavePollButton tooltip="Sauvegarder le sondage pour le publier plus tard">Sauvegarder <Icon name="save right"></Icon></SavePollButton>
							<PublishPollButton>Publier <Icon name="arrow right"></Icon></PublishPollButton>
						</Container>
					</Form>
				</Container>
			</Segment>
		);
	}
}
