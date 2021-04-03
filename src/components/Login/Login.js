import PropTypes from "prop-types";
import React from "react";
import "./Login.css";

/**
 * A page to allow the user to authenticate
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    console.log("URL = " + window.location.href);

    /**@todo this is a band aid. need to move to App.js to init state after redirect */
    if (window.location.href.match("/auth/") !== null) {
      this.login();
    }
  }

  login() {
    this.props.onLogin();
  }

  render() {
    return (
      <div className="Login">
        <h3>Welcome! Please login</h3>
        <button className="LoginButton" onClick={this.login}>
          LOGIN
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func
};

export default Login;
