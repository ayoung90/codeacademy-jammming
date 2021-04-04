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
        <img className="UserIcon" src={this.props.user.icon}></img>
        <h3>{this.props.user.name}</h3>
        {this.props.user.email !== undefined ? (
          <p>({this.props.user.email})</p>
        ) : null}
      </div>
    );
  }
}

UserPanel.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserPanel;
