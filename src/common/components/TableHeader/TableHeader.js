import React from "react";
import "./_tableHeader.scss";

const TableHeader = ({ item }) => {
  const {
    images = [{ url: "" }],
    type = "",
    album = { images: [{ url: "" }] },
  } = item.track || item;

  return (
    <li className="tableheader">
      <p className="tableheader__number">No</p>
      <p className="tableheader__image">
        {images.url || album.images.url ? "Image" : ""}
      </p>
      <p className="tableheader__name">Title</p>
      <p className="tableheader__description">Description</p>
      <p className="tableheader__owner">
        {type === "playlist" ? "Owner" : "Artist"}
      </p>
      <p className="tableheader__duration">
        {type === "track" ? "Duration" : ""}
      </p>
    </li>
  );
};

export default TableHeader;
