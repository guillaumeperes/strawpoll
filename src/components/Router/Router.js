import React from "react";
import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import CreatePollForm from "../CreatePollForm/CreatePollForm";
import RespondPollForm from "../RespondPollForm/RespondPollForm";
import PageNotFound from "../PageNotFound/PageNotFound";

export default class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={CreatePollForm} />
					<Route exact path="/poll/:poll_id/" component={RespondPollForm} />
					<Route component={PageNotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}
