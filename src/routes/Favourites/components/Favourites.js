import axios from "axios";
import React, { useEffect, useState } from "react";
import DivideHeader from "../../../common/components/DivideHeader";
import ItemsList from "../../../common/components/ItemsList";
import config from "../../../config";
import "../styles/_favourites.scss";

const Favourites = () => {
  const token = localStorage.getItem("token");
  const [favs, setFavs] = useState([]);

  // Fetch list of users top tracks
  useEffect(() => {
    axios
      .get(config.api.baseUrl + "/me/tracks", {
        headers: { authorization: "Bearer " + token },
      })
      .then((res) => setFavs(res.data.items))
      .catch((e) => console.error(e));
  }, [token]);

  return (
    <div className="favourites">
      {favs.length ? (
        <>
          <DivideHeader text="YOUR FAVOURITE SONGS" />
          <ItemsList list={favs} song={true} />
        </>
      ) : (
        <h1>It seams like you don't like any song...</h1>
      )}
    </div>
  );
};

export default Favourites;
