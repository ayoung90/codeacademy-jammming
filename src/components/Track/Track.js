import PropTypes from "prop-types";
import React from "react";
import "./Track.css";

class Track extends React.Component {
  renderAction() {
    return (
      <button className="Track-action">
        {this.props.isRemoval ? "-" : "+"}
      </button>
    );
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>
            {this.props.artist} | {this.props.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

Track.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  isRemoval: PropTypes.bool
};

export default Track;
