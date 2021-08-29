import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/_playlist.scss";
import config from "../../../config";
import ItemsList from "../../../common/components/ItemsList";
import TopBlock from "../../../common/components/TopBlock/TopBlock";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({
    name: "",
    images: [{ url: "" }],
    description: "",
    owner: {},
    followers: {},
    tracks: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id)
      axios
        .get(config.api.baseUrl + "/playlists/" + id, {
          headers: { authorization: "Bearer " + token },
        })
        .then((res) => {
          setPlaylist(res.data);
        })
        .catch((e) => {
          console.error(e);
        });
  }, [id]);

  const { tracks } = playlist;

  return (
    <div className="playlist">
      <TopBlock data={playlist} type={"Playlist"} />
      <ItemsList list={tracks.items} />
    </div>
  );
};

export default Playlist;
