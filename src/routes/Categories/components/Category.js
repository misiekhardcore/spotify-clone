import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import ItemsList from "../../../common/components/ItemsList";
import TopBlock from "../../../common/components/TopBlock";
import config from "../../../config";
import "../styles/_category.scss";

const Category = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [category, setCategory] = useState({
    icons: [{ url: "" }],
    name: "",
  });

  useEffect(() => {
    if (token) {
      axios
        .get(
          config.api.baseUrl +
            "/browse/categories/" +
            id +
            "/playlists",
          {
            headers: { authorization: "Bearer " + token },
          }
        )
        .then((res) => setPlaylists(res.data.playlists.items))
        .catch((e) => console.error(e));

      axios
        .get(config.api.baseUrl + "/browse/categories/" + id, {
          headers: { authorization: "Bearer " + token },
        })
        .then((res) => setCategory(res.data))
        .catch((e) => console.error(e));
    }
  }, [id, token]);

  return (
    <div className="category">
      <TopBlock data={category} type={"Category"} />
      <ItemsList list={playlists} />
    </div>
  );
};

export default Category;
