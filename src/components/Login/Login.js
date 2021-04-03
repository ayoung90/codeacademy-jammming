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

// Login.propTypes = {
//   user: PropTypes.object.isRequired
// };

export default Login;
