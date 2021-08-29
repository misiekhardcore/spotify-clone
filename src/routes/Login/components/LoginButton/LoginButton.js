import React from "react";
import "./_button.scss";
import config from "../../../../config";

const LoginButton = ({ children }) => {
  const url = `https://accounts.spotify.com/authorize?client_id=${config.api.clientId}&response_type=code&redirect_uri=http://localhost:3000/login&scope=user-library-modify
  user-library-read%20streaming%20user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;
  return (
    <a className="button" href={url}>
      {children}
    </a>
  );
};

export default LoginButton;
