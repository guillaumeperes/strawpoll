import React from "react";
import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "../Header/Header";
import CreatePollForm from "../CreatePollForm/CreatePollForm";
import RespondPollForm from "../RespondPollForm/RespondPollForm";
import PageNotFound from "../PageNotFound/PageNotFound";
import ResultsPoll from "../ResultsPoll/ResultsPoll";

export default class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route path="/" component={Header} />
					<Switch>
						<Route exact path="/" component={CreatePollForm} />
						<Route exact path="/poll/:poll_id/" component={RespondPollForm} />
						<Route exact path="/poll/:poll_id/results/" component={ResultsPoll} />
						<Route component={PageNotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
