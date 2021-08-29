import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router";
import config from "../config";

const useRefresh = () => {
  const location = useLocation();
  const refresh = localStorage.getItem("refreshToken");
  const expiresIn = localStorage.getItem("expiresIn");

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", config.api.clientId);
    params.append("client_secret", config.api.clientSecret);
    params.append("refresh_token", refresh);
    if (refresh && expiresIn <= Date.now())
      axios
        .post(config.api.authUrl, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          const { access_token, expires_in } = res.data;
          localStorage.setItem("token", access_token);
          localStorage.setItem(
            "expiresIn",
            Date.now() + expires_in * 1000
          );
        })
        .catch((e) => {
          console.error(e);
        });
  }, [refresh, expiresIn, location]);
};

export default useRefresh;
