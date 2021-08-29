import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";

const useUser = () => {
  const [state, setState] = useState({
    display_name: "Spotify user",
    images: [{ url: "" }],
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token)
      axios
        .get(config.api.baseUrl + "/me", {
          headers: { authorization: "Bearer " + token },
        })
        .then((res) => {
          setState(res.data);
        })
        .catch((e) => {
          console.error(e);
        });
  }, [token]);
  return state;
};

export default useUser;
