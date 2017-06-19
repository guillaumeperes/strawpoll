import React from "react";
import { Component } from "react";
import { withCookies } from "react-cookie";
import uniqid from "uniqid";
import PropTypes from "prop-types";
import Router from "../Router/Router";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

class App extends Component {
	static propTypes = {
		"cookies": PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.cookieName = "strawpoll_cookie";
	}

	componentDidMount() {
		if (typeof(this.props.cookies.get(this.cookieName)) === "undefined") {
			let value = uniqid();
			let expires = new Date();
			expires.setFullYear(expires.getFullYear() + 5);
			this.props.cookies.set(this.cookieName, value, {
				"path": "/",
				"expires": expires
			});
		}
	}

	render() {
		return (
			<div id="App">
				<ToastContainer autoClose={4000} />
				<Router />
				<Footer />
			</div>
		);
	}
}

export default withCookies(App);
