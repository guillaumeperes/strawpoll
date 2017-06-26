import React from "react";
import { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { removeUserToken } from "../../actions.js";

class UserActions extends Component {
	static propTypes = {
		"match": PropTypes.object.isRequired,
		"location": PropTypes.object.isRequired,
		"history": PropTypes.object.isRequired,
		"cookies": PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleUserPolls = this.handleUserPolls.bind(this);
		this.userInfoUrl = "https://api.strawpoll.guillaumeperes.fr/api/user/:token/infos/";
		this.userPollsPath = "/user/polls/";
		this.state = {
			"user": {}
		};
	}

	componentDidMount() {
		let self = this;

		// Vérifie si le token existe encore et est valide
		if (typeof(self.props.cookies.get("strawpoll_userToken")) === "undefined") {
			self.props.removeUserTokenInStore();
			toast.error("Une erreur inconnue est survenue, vous avez été déconnecté");
			return;
		}
		// Récupère les infos de l'utilisateur
		let token = self.props.cookies.get("strawpoll_userToken");
		let route = self.userInfoUrl.replace(":token", token);
		axios.get(route).then(function(result) {
			if (typeof(result.data.data.user.email) === "undefined") {
				throw new Error("User email not found");
			}
			self.setState({
				"user": {
					"email": result.data.data.user.email
				}
			});
		}).catch(function(error) {
			toast.error("Une erreur inconnue est survenue, vous avez été déconnecté");
			self.props.cookies.remove("strawpoll_userToken");
			self.props.removeUserTokenInStore();
		});
	}

	componentWillUnmount() {
		this.setState({
			"user": {}
		});
	}

	handleUserPolls(event) {
		// Vérifie si le token existe encore et est valide
		if (typeof(this.props.cookies.get("strawpoll_userToken")) === "undefined") {
			this.props.removeUserTokenInStore();
			toast.error("Une erreur inconnue est survenue, vous avez été déconnecté");
			return;
		}
		// Redirige vers la liste des sondages
		if (this.props.location.pathname !== "/user/polls/") {
			this.props.history.push("/user/polls/");
		}
	}

	handleLogout(event) {
		this.props.cookies.remove("strawpoll_userToken");
		this.props.removeUserTokenInStore();
		toast.success("Vous êtes déconnecté");
	}

	render() {
		return (
			<Dropdown text={this.state.user.email} icon="user" button labeled className="icon">
				<Dropdown.Menu>
					<Dropdown.Item onClick={this.handleUserPolls}>Mes sondages</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={this.handleLogout}>Déconnexion</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

const mapStateToProps = function(state) {
	return {};
};

const mapDispatchToProps = function(dispatch) {
	return {
		"removeUserTokenInStore": function() {
			dispatch(removeUserToken());
		}
	};
};

UserActions = connect(mapStateToProps, mapDispatchToProps)(UserActions);
UserActions = withCookies(UserActions);
UserActions = withRouter(UserActions);
export default UserActions;
