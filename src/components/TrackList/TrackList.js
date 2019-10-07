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
            <Track
              key={track.id}
              track={track}
              onAdd={this.props.onAdd}
              isRemoval={this.props.isRemoval}
              onRemove={this.props.onRemove}
            />
          );
        })}
      </div>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  onAdd: PropTypes.func,
  isRemoval: PropTypes.bool,
  onRemove: PropTypes.func
};

export default TrackList;
