import React from "react";
import "./_button.scss";
//import config from "../../../../config";

const LoginButton = ({ children }) => {
  const url = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=user-library-modify
  user-library-read%20streaming%20user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;
  return (
    <a className="button" href={url}>
      {children}
    </a>
  );
};

export default LoginButton;
