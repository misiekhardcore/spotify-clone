import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Header from "../components/Header";
import Player from "../components/Player";
import SideBar from "../components/SideBar";

function CoreLayout({ children, history }) {
  return (
    <div className="main">
      <Provider store={store}>
        <SideBar />
        <div className="main__content">
          <Header history={history} />
          <div className="main__content__child">{children}</div>
        </div>
        <Player />
      </Provider>
    </div>
  );
}

export default CoreLayout;
