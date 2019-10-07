let accessToken = "";

const Spotify = {
  getAccessToken() {
    if (typeof accessToken === "string" && accessToken !== "") {
      return accessToken;
    }
    // Get token
  }
};

export default Spotify;
