/* eslint-disable import/no-anonymous-default-export */
const config = {
  api: {
    baseUrl: "https://api.spotify.com/v1",
    authUrl: "https://accounts.spotify.com/api/token",
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
    redirectURL: process.env.REACT_APP_REDIRECT_URL || "",
  },
};

export default config
