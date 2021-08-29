import React from "react";
import { useHistory } from "react-router";
import "../styles/_discover-item.scss";

export default function DiscoverItem({ images, name, id, type }) {
  const history = useHistory();
  return (
    <div
      className="discover-item animate__animated animate__fadeIn"
      onClick={() => {
        if (type) history.push("/" + type + "s/" + id);
      }}
    >
      <div
        className="discover-item__art"
        style={{ backgroundImage: `url(${images[0].url})` }}
      />
      <p className="discover-item__title">{name}</p>
    </div>
  );
}
