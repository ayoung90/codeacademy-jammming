import React from "react";
import "./App.css";

//Components
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";

const DemoSearchResults = [
  { id: 123, name: "Track 1", artist: "artist 1", album: "album 1" },
  { id: 124, name: "Track 2", artist: "artist 2", album: "album 2" },
  { id: 125, name: "Track 3", artist: "artist 3", album: "album 3" }
];

const DemoPlayListTracks = [
  {
    id: 111,
    name: "Aces High",
    artist: "Iron Maiden",
    album: "Number of the Beast"
  },
  {
    id: 112,
    name: "Electric Eye",
    artist: "Judas Preist",
    album: "Pain Killer"
  },
  {
    id: 113,
    name: "Girls, Girls, Girls",
    artist: "Motley Crue",
    album: "Kickstart My Heart"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: DemoSearchResults,
      playListName: "Adam Young 101",
      playListTracks: DemoPlayListTracks
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playListTracks.find(storedTrack => storedTrack.id === track.id)
    ) {
      // Track already exists, no need to add
      return;
    }
    const newTracks = this.state.playListTracks.concat(track);

    this.setState({ playListTracks: newTracks });
  }

  removeTrack(track) {
    const newTracks = this.state.playListTracks.filter(
      storedTrack => storedTrack.id !== track.id
    );

    this.setState({ playListTracks: newTracks });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              results={this.state.searchResults}
            />
            <PlayList
              name={this.state.playListName}
              tracks={this.state.playListTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
