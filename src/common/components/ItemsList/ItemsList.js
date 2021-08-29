import React from "react";
import TableHeader from "../TableHeader/TableHeader";
import ListItem from "./components/ListItem";
import "./_itemsList.scss";

const ItemsList = ({ list = [], song = false }) => {
  return (
    <ul className="items__list">
      {list.length ? (
        <>
          <TableHeader item={list[0]} />
          {list.map((playlist, idx) => {
            return (
              <ListItem
                key={idx}
                idx={idx}
                item={playlist}
                song={song}
              />
            );
          })}
        </>
      ) : null}
    </ul>
  );
};

export default ItemsList;
