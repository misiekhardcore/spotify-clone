import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setSong, setTrack } from "../../../../redux/store";
import "./_listItem.scss";

const shortenDesc = (desc) => {
  if (desc.length > 50) return desc.slice(0, 50) + "...";
  return desc;
};

const secsToDuration = (sec) => {
  const hours = parseInt(sec / 3600000);
  const mins = parseInt(sec / 60000);
  const secs = parseInt((sec % 60000) / 1000);
  const hs = hours > 0 ? hours + ":" : "";
  const ms = (mins < 10 ? "0" : "") + mins + ":";
  const ss = (secs < 10 ? "0" : "") + secs;
  return hs + ms + ss;
};

const ListItem = ({ item, idx, song }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    id = "",
    name = "",
    description = "",
    images = [{ url: "" }],
    owner = { display_name: "" },
    type = "",
    album = { images: [{ url: "" }], name: "" },
    artists = [{ name: "" }],
    duration_ms = "",
  } = item.track || item;

  return (
    <li
      className="list-item animate__animated animate__fadeIn"
      onClick={() => {
        if (type !== "track") history.push("/" + type + "s/" + id);
        else
          song
            ? dispatch(setSong({ item, idx }))
            : dispatch(setTrack({ item, idx }));
      }}
    >
      <p className="list-item__number">{idx + 1}</p>
      {(images.length && images[0].url) || album.images[0].url ? (
        <img
          className="list-item__image"
          src={(images.length && images[0].url) || album.images[0].url}
          alt={name}
        />
      ) : null}
      <p className="list-item__name">{name}</p>
      <p className="list-item__description">
        {shortenDesc(description || album.name)}
      </p>
      <p className="list-item__owner">
        {owner.display_name || artists[0].name}
      </p>
      {duration_ms ? (
        <p className="list-item__duration">
          {secsToDuration(duration_ms)}
        </p>
      ) : null}
    </li>
  );
};

export default ListItem;
