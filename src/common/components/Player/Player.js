import {
  faEllipsisH,
  faHeart,
  faPauseCircle,
  faPlayCircle,
  faRandom,
  faRetweet,
  faStepBackward,
  faStepForward,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
  WebPlaybackSDK,
} from "react-spotify-web-playback-sdk";
import config from "../../../config";
import { setTrack } from "../../../redux/store";
import "./_player.scss";

const PauseResumeButton = ({ volume, setVolume, dispatch }) => {
  const token = "Bearer " + localStorage.getItem("token");

  const [state, setState] = useState({
    device: {
      id: "",
      is_active: true,
      is_private_session: false,
      is_restricted: false,
      name: "",
      type: "",
      volume_percent: 49,
    },
    shuffle_state: false,
    repeat_state: "off",
    timestamp: 0,
    context: null,
    progress_ms: 0,
    item: {
      album: {
        id: "",
        images: [
          {
            url: "",
          },
        ],
        name: "",
        uri: "",
      },
      artists: [
        {
          name: "",
          uri: "",
        },
      ],
      duration_ms: 187973,
      explicit: false,
      is_local: false,
      name: "",
      track_number: 1,
      type: "",
      uri: "",
    },
    currently_playing_type: "track",
    is_playing: true,
  });
  // Read redux data
  const {
    name: name2 = "",
    idx = 0,
    uri,
    song = false,
  } = useSelector((state) => state.track);

  // Player buttons state
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // SDK Functions
  const player = useSpotifyPlayer();
  const device = usePlayerDevice();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const { device_id = "" } = device || {};

  function getPlayerInfo() {
    if (token)
      axios
        .get(config.api.baseUrl + "/me/player", {
          headers: { authorization: token },
        })
        .then((res) => {
          setState(res.data);
        })
        .catch((e) => console.error(e));
  }

  // Seak track
  const seak = () => {
    // if (device === null) return;
    if (token && device_id)
      axios
        .put(
          config.api.baseUrl + "/me/player/seek",
          {},
          {
            headers: {
              authorization: token,
            },
            params: {
              device_id,
              position_ms: 60000,
            },
          }
        )
        .then(() => getPlayerInfo())
        .catch((e) => console.error(e));
  };

  // Next track
  const next = () => {
    if (token && device_id) {
      axios
        .post(
          config.api.baseUrl + "/me/player/next",
          {},
          { headers: { authorization: token } }
        )
        .then(() => getPlayerInfo())
        .catch((e) => console.error(e));
    }
  };

  // Previous track
  const prev = () => {
    if (token && device_id) {
      axios
        .post(
          config.api.baseUrl + "/me/player/previous",
          {},
          { headers: { authorization: token } }
        )
        .then(() => getPlayerInfo())
        .catch((e) => console.error(e));
    }
  };

  // Repeat track/tracks
  const repeat = () => {
    if (token && device_id)
      axios
        .put(
          config.api.baseUrl + "/me/player/repeat",
          {},
          {
            headers: {
              authorization: token,
            },
            params: {
              state:
                state.repeat_mode === "off"
                  ? "track"
                  : state.repeat_mode === "track"
                  ? "context"
                  : "off",
            },
          }
        )
        .then(() => getPlayerInfo())
        .catch((e) => console.error(e));
  };

  // Shuffle tracks
  const shuffle = () => {
    if (token && device_id)
      axios
        .put(
          config.api.baseUrl + "/me/player/shuffle",
          {},
          {
            headers: {
              authorization: token,
            },
            params: {
              state: !state.shuffle,
            },
          }
        )
        .then(() => getPlayerInfo())
        .catch((e) => console.error(e));
  };

  // Play tarck
  const play = () => {
    // if (device === null) return;
    if (token && device_id)
      axios
        .put(
          config.api.baseUrl + "/me/player/play",
          song
            ? { uris: [uri] }
            : { context_uri: uri, offset: { position: idx } },
          {
            headers: {
              authorization: token,
            },
            params: {
              device_id,
            },
          }
        )
        .then(() => getPlayerInfo())
        .catch((e) => {});
  };

  // Resume track
  const resume = () => {
    // if (device === null) return;
    if (token && device_id)
      axios
        .put(
          config.api.baseUrl + "/me/player/play",
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              device_id,
            },
          }
        )
        .then(() => getPlayerInfo())
        .catch((e) => {});
  };

  // Pause track
  const pause = () => {
    // if (device === null) return;
    if (token && device_id)
      axios
        .put(
          config.api.baseUrl + "/me/player/pause",
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              device_id,
            },
          }
        )
        .catch((e) => {});
  };

  // Play track whenever it changes
  useEffect(() => {
    if (player) {
      setStarted(true);
      setPlaying(true);
      axios
        .get(config.api.baseUrl + "/me/player", {
          headers: { authorization: token },
        })
        .then((res) => {
          dispatch(setTrack({ item: res.data.item, idx }));
        })
        .catch((e) => console.error(e));
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name2]);

  if (!(webPlaybackSDKReady && device)) return <div>Loading...</div>;

  const { name, album } = state.item || {};
  const { url } = album?.images[0] || {};

  return (
    <>
      <div className="player__album">
        {url ? <img src={url} alt={name} /> : <span />}
        <p title={name}>
          {name
            ? name.length > 10
              ? name.slice(0, 10) + "..."
              : name
            : "Nothing's playing"}
        </p>
      </div>
      <div className="player__controls">
        <FontAwesomeIcon icon={faStepBackward} onClick={prev} />
        <FontAwesomeIcon
          icon={playing ? faPauseCircle : faPlayCircle}
          onClick={() => {
            if (playing) {
              setPlaying(false);
              pause();
              // pause();
            } else {
              if (started) resume();
              else {
                play();
                setStarted(true);
              }
              setPlaying(true);
            }
          }}
        />
        <FontAwesomeIcon icon={faStepForward} onClick={next} />
      </div>
      <div className="player__seekbar" onClick={seak} />
      <div className="player__actions">
        <FontAwesomeIcon icon={faEllipsisH} />
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon
          icon={faRandom}
          onClick={shuffle}
          style={{ color: state.shuffle_state ? "blue" : null }}
        />
        <FontAwesomeIcon
          icon={faRetweet}
          style={{
            color:
              state.repeat_mode === "track"
                ? "blue"
                : state.repeating === "context"
                ? "green"
                : null,
          }}
          onClick={repeat}
        />
        <FontAwesomeIcon
          icon={faVolumeDown}
          onClick={() => {
            setVolume(volume + 0.1 > 1 ? 0.1 : volume + 0.1);
          }}
        />
      </div>
    </>
  );
};

export default function Player() {
  const dispatch = useDispatch();

  const [volume, setVolume] = useState(0.5);
  const getOAuthToken = useCallback(
    (callback) => callback(localStorage.getItem("token")),
    []
  );

  return (
    <div className="player">
      <WebPlaybackSDK
        deviceName="HurenNlListener"
        playbackStateAutoUpdate={true}
        connectOnInitialized={true}
        playbackStateUpdateDuration_ms={1000}
        getOAuthToken={getOAuthToken}
        volume={volume}
      >
        <PauseResumeButton
          volume={volume}
          setVolume={setVolume}
          dispatch={dispatch}
        />
      </WebPlaybackSDK>
    </div>
  );
}
