import React from "react";
import "./App.css";

//Components
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";
import UserPanel from "../UserPanel/UserPanel";
import Login from "../Login/Login";
//Integrations
import Spotify from "../../util/Spotify";

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
      user: { name: "Demo User", authenticated: false },
      playListTracks: DemoPlayListTracks
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
    this.login = this.login.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playListTracks.find(storedTrack => storedTrack.id === track.id)
    ) {
      // Track already exists, no need to add
      /**
       * @todo add a nice message
       */
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

  /**
   * Update the playlist name and also clear tracks (new playlist)
   * @param {*} name new playlist name
   */
  updatePlaylistName(name) {
    this.setState({ playListName: name });
    this.setState({ playListTracks: [] });
  }

  /**
   * Save a new playlist & songlist under the entered title
   * @todo add the ability to modify or create new
   */
  savePlaylist() {
    const trackURIs = this.state.playListTracks.map(track => track.id);
    console.log(
      `Tracks to save under '${this.state.playListName}' are.. ${trackURIs}`
    );
    /**
     * @todo integrate with Spotify API
     */
    Spotify.savePlaylist(this.state.playListName, trackURIs);
  }

  /**
   * Execute a search on spotify and fill the search results
   * @param {*} term Search keyword (name / track / album etc)
   */
  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  /**
   * prompt a login to spotify. if the user is already logged in, change to 'authenticated'
   */
  login() {
    let accessToken = Spotify.getAccessToken();

    if (typeof accessToken === "string" && accessToken !== "") {
      this.setState(prevState => {
        let user = Object.assign({}, prevState.user);
        user.authenticated = true;
        return { user };
      });
    } else {
      console.log("auth failed :(");
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {this.state.user.authenticated ? (
            <React.Fragment>
              <UserPanel user={this.state.user} />
              <SearchBar onSearch={this.search} />
              <div className="App-playlist">
                <SearchResults
                  onAdd={this.addTrack}
                  results={this.state.searchResults}
                />
                <PlayList
                  name={this.state.playListName}
                  tracks={this.state.playListTracks}
                  onRemove={this.removeTrack}
                  onNameChange={this.updatePlaylistName}
                  onSave={this.savePlaylist}
                />
              </div>
            </React.Fragment>
          ) : (
            <Login onLogin={this.login} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
