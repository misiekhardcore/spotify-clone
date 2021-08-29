import {
  faChartLine,
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import React from "react";
import { useHistory, useLocation } from "react-router";
import useUser from "../../../api/useUser";
import "./_sidebar.scss";

const RenderSideBarOption = ({ link = "", icon = "", text = "" }) => {
  // Used to navigate to other pages
  const history = useHistory();

  // Get Url string to compare with navigation link, if they match, thats the current tab
  const selected =
    useLocation().pathname.split("/")[1] === link.split("/")[1];

  return (
    <div
      className={cx("sidebar__option", {
        "sidebar__option--selected": selected,
      })}
      onClick={() => {
        history.push(link);
      }}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
};

export default function SideBar() {
  // Use the useUser hook to grab user info
  const { display_name, images } = useUser();

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {images[0].url && (
          <img
            className="profile__picture"
            src={images[0].url}
            alt={display_name}
          />
        )}
        <p>{display_name}</p>
      </div>
      <div className="sidebar__options">
        <RenderSideBarOption
          link="/"
          icon={faHeadphonesAlt}
          text="Discovery"
        />
        <RenderSideBarOption
          link="/search"
          icon={faSearch}
          text="Search"
        />
        <RenderSideBarOption
          link="/favourites"
          icon={faHeart}
          text="Favourites"
        />
        <RenderSideBarOption
          link="/playlists"
          icon={faPlayCircle}
          text="Playlists"
        />
        <RenderSideBarOption
          link="/top"
          icon={faChartLine}
          text="Top"
        />
      </div>
    </div>
  );
}
