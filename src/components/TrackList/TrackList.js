import PropTypes from "prop-types";
import React from "react";
import "./TrackList.css";

// Components
import Track from "../Track/Track";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Track key={track.id} track={track} onAdd={this.props.onAdd} />
          );
        })}
      </div>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  onAdd: PropTypes.func
};

export default TrackList;
