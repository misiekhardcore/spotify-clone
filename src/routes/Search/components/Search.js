import axios from "axios";
import React, { useEffect, useState } from "react";
import DivideHeader from "../../../common/components/DivideHeader/DivideHeader";
import ItemsList from "../../../common/components/ItemsList";
import config from "../../../config";
import "../styles/_search.scss";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({
    playlists: [],
    tracks: [],
    albums: [],
  });

  let cancel = false;
  useEffect(() => {
    if (cancel) return;
    const token = localStorage.getItem("token");
    if (token && search)
      axios
        .get(config.api.baseUrl + "/search", {
          headers: { authorization: "Bearer " + token },
          params: {
            q: search,
            type: "playlist,track,album",
            limit: 10,
            offset: 0,
          },
        })
        .then((res) => {
          setResults({
            playlists: res.data.playlists.items || [],
            tracks: res.data.tracks.items || [],
            albums: res.data.albums.items || [],
          });
        })
        .catch((e) => console.error(e));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => (cancel = true);
  }, [search]);

  const { tracks, playlists, albums } = results;

  return (
    <div className="search">
      <div className="search__main">
        <h1>Find what you are looking for</h1>
        <input
          type="text"
          value={search}
          placeholder="Search songs, playlists or albums"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {tracks.length ? (
        <>
          <DivideHeader text="SONGS" />
          <ItemsList list={tracks} song={true} />
        </>
      ) : null}
      {playlists.length ? (
        <>
          <DivideHeader text="PLAYLISTS" />
          <ItemsList list={playlists} />
        </>
      ) : null}
      {albums.length ? (
        <>
          <DivideHeader text="ALBUMS" />
          <ItemsList list={albums} />
        </>
      ) : null}
    </div>
  );
};

export default Search;
