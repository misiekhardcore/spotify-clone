import axios from "axios";
import React, { useEffect, useState } from "react";
import DivideHeader from "../../../common/components/DivideHeader";
import ItemsList from "../../../common/components/ItemsList";
import config from "../../../config";
import "../styles/_top.scss";

const Top = () => {
  const token = localStorage.getItem("token");
  const [toplist, setToplist] = useState([]);

  useEffect(() => {
    if (token)
      axios
        .get(
          config.api.baseUrl + "/browse/categories/toplists/playlists",
          {
            headers: { authorization: "Bearer " + token },
            params: {
              limit: 10,
              offset: 0,
            },
          }
        )
        .then((res) => setToplist(res.data.playlists.items))
        .catch((e) => console.error(e));
  }, [token]);

  return (
    <div className="top">
      <DivideHeader text="Toplists" />
      <ItemsList
        list={toplist.filter(
          (list) => list.owner.display_name === "spotifycharts"
        )}
      />
    </div>
  );
};

export default Top;
