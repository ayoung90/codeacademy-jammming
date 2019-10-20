let accessToken = "";
const clientId = "05d33c02876540eaa12321f85d2b8e2a";
const redirectUri = "http://localhost:3000/";
const authURL = "https://accounts.spotify.com/authorize?";
const searchURL = "https://api.spotify.com/v1/search?";
const userURL = "https://api.spotify.com/v1/me";

const Spotify = {
  /**
   * - Follows one of three paths
   *  - Returns the stored token
   *  - Stores the token provided in the redirect URL with the url supplied expiry
   *  - Redirects the user to Spotify to autenticate in order to fetch a token
   *
   * @returns {String} Access Token
   */
  getAccessToken() {
    console.log("type of token = " + typeof accessToken);
    console.log("value of token = " + accessToken);
    if (typeof accessToken === "string" && accessToken !== "") {
      return accessToken;
    }
    const hrefToken = window.location.href.match(/access_token=([^&]*)/);
    const hrefExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (hrefToken !== null && hrefExpiresIn !== null) {
      /**
       * @todo Implement better regex to split token and expiry from URL
       * completely without needing to do further parsing
       * */
      accessToken = hrefToken[0].split("=")[1];
      const expiryTime = hrefExpiresIn[0].split("=")[1];
      console.log(
        "setting token to: " + accessToken + " | Expiry = " + expiryTime
      );
      window.setTimeout(() => (accessToken = ""), expiryTime * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      // Get token
      console.log("Getting Token..");
      window.location.replace(
        `${authURL}` +
          `client_id=${clientId}` +
          `&redirect_uri=${redirectUri}` +
          `&response_type=token`
        /** @todo Implement state  */
        //&state=123`
      );
    }
  },
  /**
   * Default headers for Spotify requests
   * @returns {Object} Object containing all header values
   */
  headers() {
    return {
      headers: {
        Authorization: `Bearer ${Spotify.getAccessToken()}`
      }
    };
  },
  /**
   * @todo Implement better error handling
   * @param {String} term
   */
  search(term) {
    const headers = Spotify.headers();

    return fetch(
      searchURL + "type=track&q=" + encodeURIComponent(term),
      headers
    )
      .then(response => response.json()) //@todo add error handler..
      .then(jsonResponse => {
        if (jsonResponse.tracks.total === 0) {
          /**
           * @todo implement proper 'No results found error message'
           */
          return {};
        }
        return jsonResponse.tracks.items.map(track => {
          console.log(track);
          /**
           * @todo Validate required fields.
           */
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
      });
  },
  /**
   * - GET current user’s ID
   * - POST a new playlist with the input name to the current user’s Spotify account. Receive the playlist ID back from the request.
   * - POST the track URIs to the newly-created playlist, referencing the current user’s account (ID) and the new playlist (ID)
   * @param {String} playlistName
   * @param {Array<String>} trackURIs
   */
  savePlaylist(playlistName, trackURIs) {
    if (playlistName === undefined && trackURIs === undefined) {
      return;
    }
    const headers = Spotify.headers();
    let userID;

    try {
      fetch(userURL, headers)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was ${response.status}.`);
          }
          return response.json();
        }) //@todo add error handler..
        .then(jsonResponse => {
          console.log(jsonResponse);
          userID = jsonResponse.id;
        });
    } catch (error) {
      console.log(
        "There has been a problem with retrieving the userID: ",
        error.message
      );
      return; /** @todo send error response to calling function */
    }
  }
};

export default Spotify;
