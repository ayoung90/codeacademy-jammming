import PropTypes from "prop-types";
import React from "react";
import "./PlayList.css";

//Components
import TrackList from "../TrackList/TrackList";

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  handleSavePlaylist() {
    this.props.onSave();
  }

  render() {
    return (
      <div className="Playlist">
        <input
          defaultValue={this.props.name}
          onChange={this.handleNameChange}
        />
        <TrackList
          onRemove={this.props.onRemove}
          tracks={this.props.tracks}
          isRemoval={true}
        />
        <button className="Playlist-save" onClick={this.handleSavePlaylist}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}
PlayList.propTypes = {
  name: PropTypes.string.isRequired,
  tracks: PropTypes.array.isRequired,
  onRemove: PropTypes.func,
  onNameChange: PropTypes.func,
  onSave: PropTypes.func
};

export default PlayList;
