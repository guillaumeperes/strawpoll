import React from "react";
import { Component } from "react";
import Header from "../Header/Header";
import Router from "../Router/Router";
import Footer from "../Footer/Footer";

export default class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<main><Router /></main>
				<Footer />
			</div>
		);
	}
}
