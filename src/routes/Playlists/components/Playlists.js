import axios from "axios";
import React, { useEffect, useState } from "react";
import DivideHeader from "../../../common/components/DivideHeader/DivideHeader";
import ItemsList from "../../../common/components/ItemsList";
import config from "../../../config";
import "../styles/_playlists.scss";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([
    {
      name: "",
      images: [{ url: "" }],
      description: "",
    },
  ]);

  // Fetch user playlists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      axios
        .get(config.api.baseUrl + "/me/playlists", {
          headers: { authorization: "Bearer " + token },
        })
        .then((res) => {
          setPlaylists(res.data.items);
        })
        .catch((e) => {
          console.error(e);
        });
  }, []);

  return (
    <div className="playlists">
      <DivideHeader text="YOUR PLAYLISTS" />
      {playlists.length ? <ItemsList list={playlists} /> : null}
    </div>
  );
};

export default Playlists;
