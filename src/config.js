/* eslint-disable import/no-anonymous-default-export */
export default {
  api: {
    baseUrl: "https://api.spotify.com/v1",
    authUrl: "https://accounts.spotify.com/api/token",
    clientId: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    redirectURL: "http://localhost:3000/login",
  },
};
