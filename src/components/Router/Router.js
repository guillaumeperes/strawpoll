import React from "react";
import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import CreatePollForm from "../CreatePollForm/CreatePollForm";
import PageNotFound from "../PageNotFound/PageNotFound";

export default class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={CreatePollForm} />
					<Route component={PageNotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}
