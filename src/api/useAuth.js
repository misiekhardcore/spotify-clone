import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import config from "../config";

const useAuth = (code) => {
  const history = useHistory();
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("client_id", config.api.clientId);
    params.append("client_secret", config.api.clientSecret);
    params.append("redirect_uri", config.api.redirectURL);
    if (code)
      axios
        .post(config.api.authUrl, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          const { access_token, refresh_token, expires_in } = res.data;
          localStorage.setItem("token", access_token);
          localStorage.setItem("refreshToken", refresh_token);
          localStorage.setItem(
            "expiresIn",
            Date.now() + expires_in * 1000
          );

          history.push("/");
        })
        .catch((e) => {
          history.push("/login");
        });
  }, [code, history]);
};

export default useAuth;
