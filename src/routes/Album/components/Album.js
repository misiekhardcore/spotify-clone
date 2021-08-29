import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ItemsList from "../../../common/components/ItemsList/ItemsList";
import TopBlock from "../../../common/components/TopBlock";
import config from "../../../config";
import "../styles/_album.scss";

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState({
    name: "",
    images: [{ url: "" }],
    description: "",
    artists: [{ name: "" }],
    tracks: { items: [] },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id)
      axios
        .get(config.api.baseUrl + "/albums/" + id, {
          headers: { authorization: "Bearer " + token },
        })
        .then((res) => {
          setAlbum(res.data);
        })
        .catch((e) => {
          console.error(e);
        });
  }, [id]);

  const { tracks } = album;

  return (
    <div className="playlist">
      <TopBlock data={album} type={"Album"} />
      <ItemsList list={tracks.items} />
    </div>
  );
};

export default Album;
