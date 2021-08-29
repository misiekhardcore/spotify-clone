// import axios from "axios";
import axios from "axios";
import React, { Component } from "react";
import config from "../../../config";
import "../styles/_discover.scss";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // Get New releases
      axios
        .get(config.api.baseUrl + "/browse/new-releases", {
          headers: { authorization: "Bearer " + token },
          params: {
            country: "NL",
            limit: 10,
            offset: 0,
          },
        })
        .then((res) => {
          this.setState({
            ...this.state,
            newReleases: res.data.albums.items,
          });
        })
        .catch((e) => {
          console.log(e);
        });
      // Get Featured albums
      axios
        .get(config.api.baseUrl + "/browse/featured-playlists", {
          headers: { authorization: "Bearer " + token },
          params: {
            country: "NL",
            limit: 10,
            offset: 0,
            timestamp: new Date().toISOString(),
          },
        })
        .then((res) => {
          this.setState({
            ...this.state,
            playlists: res.data.playlists.items,
          });
        })
        .catch((e) => {
          console.log(e);
        });
      // Get Categories
      axios
        .get(config.api.baseUrl + "/browse/categories", {
          headers: { authorization: "Bearer " + token },
          params: {
            country: "NL",
            limit: 10,
            offset: 0,
          },
        })
        .then((res) => {
          this.setState({
            ...this.state,
            categories: res.data.categories.items.map((item) => ({
              ...item,
              type: "categorie",
            })),
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
