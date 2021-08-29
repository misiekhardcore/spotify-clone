import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import useRefresh from "../api/useRefresh";
import Album from "./Album/components/Album";
import Category from "./Categories";
import Discover from "./Discover";
import Favourites from "./Favourites/components/Favourites";
import Login from "./Login";
import NotFound from "./NotFound";
import Playlist from "./Playlist";
import Playlists from "./Playlists/components/Playlists";
import Search from "./Search/components/Search";
import Top from "./Top";

export default function Routes() {
  useRefresh();

  const refresh = localStorage.getItem("refreshToken");

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        refresh ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  // Here you'd return an array of routes
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Discover} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/search" component={Search} />
      <PrivateRoute exact path="/playlists" component={Playlists} />
      <PrivateRoute exact path="/playlists/:id" component={Playlist} />
      <PrivateRoute exact path="/categories/:id" component={Category} />
      <PrivateRoute exact path="/favourites" component={Favourites} />
      <PrivateRoute exact path="/albums/:id" component={Album} />
      <PrivateRoute exact path="/top" component={Top} />
      <Route component={NotFound} />
    </Switch>
  );
}
