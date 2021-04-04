// AUTHENTICATION
let accessToken = "";
const clientId = "05d33c02876540eaa12321f85d2b8e2a";
const redirectUri = "http://localhost:3000/auth/";
const authURL = "https://accounts.spotify.com/authorize?";
/** A space seperated list of scope to request */
const scope = "playlist-modify-private user-read-email";

// SPOTIFY ENDPOINTS
const baseURL = "https://api.spotify.com";
const searchURL = baseURL + "/v1/search?";
const userURL = baseURL + "/v1/me";

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
          `&response_type=token` +
          `&scope=${scope}`
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
   * Default headers for Spotify requests
   * @param {String} method POST, PUT, etc
   * @param {Object} body Object containing body data
   * @returns {Object} Object containing all header values
   */
  postHeaders(method, body) {
    const headerJSON = Spotify.headers();

    if (typeof method === "string") {
      headerJSON["method"] = method;
    }

    if (typeof body === "string") {
      headerJSON["body"] = body;
    }

    return headerJSON;
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
   * Call spotify user API to fetch userID and user details (name, email etc)
   * @returns Object of user details
   */
  getUserDetails() {
    let headers = Spotify.headers();

    return fetch(userURL, headers)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was ${response.status}.`);
        }
        return response.json();
      }) //@todo add error handler..
      .then(
        jsonResponse => {
          return {
            userID: jsonResponse.id,
            name: jsonResponse.display_name,
            email: jsonResponse.email,
            authenticated: true
          };
        },
        error => {
          console.log(
            "There has been a problem with retrieving the userID: ",
            error.message
          );
          return;
          /** @todo send error response to calling function */
        }
      );
  },

  /**
   * - GET current user’s ID
   * - POST a new playlist with the input name to the current user’s Spotify account. Receive the playlist ID back from the request.
   * - POST the track URIs to the newly-created playlist, referencing the current user’s account (ID) and the new playlist (ID)
   * @param {String} playlistName
   * @param {Array<String>} trackURIs
   * @todo break this up into sub functions? (playlist create --> add tracks)
   */
  savePlaylist(playlistName, trackURIs, userID) {
    if (
      playlistName === undefined ||
      trackURIs === undefined ||
      userID === undefined
    ) {
      return;
    }
    let headers = Spotify.headers();
    let playlistID;

    // Create new Playlist
    let url = baseURL + `/v1/users/${userID}/playlists`;
    let body = `{"name":"${playlistName}", "description":"${"created in jammming"}","public":false}`;

    headers = Spotify.postHeaders("POST", body);
    console.log("url = " + url);
    console.log(headers);

    fetch(url, headers)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was ${response.status}.`);
        }
        return response.json();
      }) //@todo add error handler..
      .then(
        jsonResponse => {
          console.log(jsonResponse);
          playlistID = jsonResponse.id;
          console.log("playlistID = " + playlistID);
        },
        error => {
          console.log(
            "There has been a problem with retrieving the playlistID: ",
            error.message
          );
          return;
          /** @todo send error response to calling function */
        }
      )
      .then(() => {
        // add tracks to playlist
        let url = baseURL + `/v1/playlists/${playlistID}/tracks`;
        let formatTracks;
        if (trackURIs.length !== 0) {
          formatTracks = trackURIs.map(track => "spotify:track:" + track);
          //"spotify:track:" + trackURIs.join(",spotify:track:");
          body = `{"uris": ${JSON.stringify(formatTracks)}}`;
        } else {
          //No point adding an empty list
          return;
        }

        headers = Spotify.postHeaders("POST", body);

        fetch(url, headers)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was ${response.status}.`);
            }
            return response.json();
          }) //@todo add error handler..
          .then(
            jsonResponse => {
              console.log(jsonResponse);
              /**
               * @todo Convert to proper success message
               */
              console.log("tracks added!");
            },
            error => {
              console.log(
                "There has been a problem with adding tracks to the playlistID: ",
                error.message
              );
              return;
              /** @todo send error response to calling function */
            }
          );
      });
  }
};

export default Spotify;
