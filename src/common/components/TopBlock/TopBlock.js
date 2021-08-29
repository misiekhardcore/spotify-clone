import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUri } from "../../../redux/store";
import "./_topBlock.scss";

const TopBlock = ({ data, type = "" }) => {
  const dispatch = useDispatch();
  const {
    name = "",
    images = [{ url: "" }],
    icons = [{ url: "" }],
    description = "",
    owner = { display_name: "" },
    artists = [{ name: "" }],
    followers = {},
    uri = "",
  } = data;

  useEffect(() => {
    dispatch(setUri(uri));
  }, [uri, dispatch]);

  return (
    <div className="topblock">
      <div className="topblock__header">
        <img
          className="topblock__image animate__animated animate__fadeIn"
          src={images[0].url || icons[0].url}
          alt={name}
        />
        <div className="description">
          <p>{type}</p>
          <h1 className="topblock__title">{name}</h1>
          <p className="topblock__description">{description}</p>
          {followers.total && (
            <p className="topblock__followers">
              Followed by: <span>{followers.total}</span>
            </p>
          )}
          {(artists[0].name || owner.display_name) && (
            <p className="topblock__owner">
              Created by:{" "}
              <span>{artists[0].name || owner.display_name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBlock;
