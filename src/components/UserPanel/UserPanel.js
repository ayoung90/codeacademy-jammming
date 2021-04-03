import PropTypes from "prop-types";
import React from "react";
import "./UserPanel.css";

/**
 * A panel to display the logged in users details (from spotify)
 */
class UserPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="UserPanel">
        <div className="User-name">
          <h3>{this.props.user.name}</h3>
        </div>
      </div>
    );
  }
}

// UserPanel.propTypes = {
//   user: PropTypes.object.isRequired
// };

export default UserPanel;
