import PropTypes from "prop-types";
import React from "react";
import "./UserPanel.css";

/**
 * A panel to display the logged in users details (from spotify)
 */
class UserPanel extends React.Component {
  render() {
    return (
      <div className="UserPanel">
        <div className="User-name">
          <h3>{this.props.user.name}</h3>
        </div>
        {this.props.user.email !== undefined ? (
          <div className="User-email">
            <p>({this.props.user.email})</p>
          </div>
        ) : null}
      </div>
    );
  }
}

UserPanel.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserPanel;
