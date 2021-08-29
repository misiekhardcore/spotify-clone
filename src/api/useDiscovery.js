import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";

const useDiscovery = (offset = 0, limit = 10) => {
  const [state, setState] = useState({
    releasedThisWeek: [],
    featured: [],
    browse: [],
    releasedThisWeekMessage: "",
    featuredMessage: "",
  });

  // Get token to use in auth header
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // Get New releases
      axios
        .get(config.api.baseUrl + "/browse/new-releases", {
          headers: { authorization: "Bearer " + token },
          params: {
            country: "NL",
            limit,
            offset,
          },
        })
        .then((res) => {
          setState({
            ...state,
            releasedThisWeek: res.data.albums.items,
            releasedThisWeekMessage: res.data.message,
          });
        })
        .catch((e) => {
          console.error(e);
        });

      // Get Featured albums
      axios
        .get(config.api.baseUrl + "/browse/featured-playlists", {
          headers: { authorization: "Bearer " + token },
          params: {
            country: "NL",
            limit,
            offset,
            timestamp: new Date().toISOString(),
          },
        })
        .then((res) => {
          setState({
            ...state,
            featured: res.data.playlists,
            featuredMessage: res.data.message,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, limit, offset]);
  return state;
};

export default useDiscovery;
