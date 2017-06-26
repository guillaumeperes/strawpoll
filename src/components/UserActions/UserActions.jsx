import React from "react";
import { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { removeUserToken } from "../../actions.js";

class UserActions extends Component {
	static propTypes = {
		"cookies": PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {

	}

	handleLogout(event) {
		this.props.cookies.remove("strawpoll_userToken");
		this.props.removeUserTokenInStore();
		toast.success("Vous êtes déconnecté");
	}

	render() {
		return (
			<Dropdown text="Mon compte" icon="user" button labeled className="icon">
				<Dropdown.Menu>
					<Dropdown.Divider />
					<Dropdown.Item onClick={this.handleLogout}>Deconnexion</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

const mapStateToProps = function(state) {
	console.log(state);
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
export default UserActions;
