import React from "react";
import { Component } from "react";
import { Header } from "semantic-ui-react";
import "./AppTitle.css";

export default class AppTitle extends Component {
	render() {
		return (
			<Header id="AppTitle"><span className="logoFirst">Straw</span><span className="logoSecond">poll</span></Header>
		);
	}
}

