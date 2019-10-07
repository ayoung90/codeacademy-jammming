import PropTypes from "prop-types";
import React from "react";
import "./PlayList.css";

//Components
import TrackList from "../TrackList/TrackList";

class PlayList extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.name} />
        <TrackList tracks={this.props.tracks} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
PlayList.propTypes = {
  name: PropTypes.string.isRequired,
  tracks: PropTypes.array.isRequired
};

export default PlayList;
