import React from "react";
import { Component } from "react";
import { withCookies } from "react-cookie";
import uniqid from "uniqid";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Router from "../Router/Router";
import Footer from "../Footer/Footer";
import { setUserToken } from "../../actions.js";
import { connect } from "react-redux";
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
		// Strawpoll cookie
		if (typeof(this.props.cookies.get(this.cookieName)) === "undefined") {
			let value = uniqid();
			let expires = new Date();
			expires.setFullYear(expires.getFullYear() + 5);
			this.props.cookies.set(this.cookieName, value, {
				"path": "/",
				"expires": expires
			});
		}
		// User token cookie
		if (typeof(this.props.cookies.get("strawpoll_userToken")) !== "undefined") {
			this.props.setUserTokenInStore(this.props.cookies.get("strawpoll_userToken"));
		}
	}

	render() {
		return (
			<div id="App">
				<ToastContainer autoClose={4000} hideProgressBar={true} />
				<Router />
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = function(state) {
	return {};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"setUserTokenInStore": function(token) {
			dispatch(setUserToken(token));
		}
	};
}

App = connect(mapStateToProps, mapDispatchToProps)(App);
App = withCookies(App);
export default App;
