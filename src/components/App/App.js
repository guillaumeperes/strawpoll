import React from "react";
import { Component } from "react";
import Header from "../Header/Header";
import CreatePollForm from "../CreatePollForm/CreatePollForm";
import Footer from "../Footer/Footer";


export default class App extends Component {
	render() {
		return (
			<div id="App">
				<Header></Header>
				<main id="Content">
					<CreatePollForm></CreatePollForm>
				</main>
				<Footer></Footer>
			</div>
		);
	}
}
