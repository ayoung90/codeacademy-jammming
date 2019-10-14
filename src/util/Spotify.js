let accessToken = "";
const clientId = "05d33c02876540eaa12321f85d2b8e2a";
const redirectUri = "http://localhost:3000/";

const Spotify = {
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
    } else {
      // Get token
      console.log("Getting Token..");
      window.location.replace(
        `https://accounts.spotify.com/authorize?client_id=${clientId}` +
          `&redirect_uri=${redirectUri}` +
          `&response_type=token`
        /** @todo Implement state  */
        //&state=123`
      );
    }
  }
};

export default Spotify;
