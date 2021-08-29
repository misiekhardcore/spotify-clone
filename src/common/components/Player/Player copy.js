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
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
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

  // Read redux data
  const {
    name = "",
    idx = 0,
    album: {
      images: [{ url = "" }],
    },
    images: [{ url: url2 = "" }],
    uri,
    song = false,
  } = useSelector((state) => state.track);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [repeating, setRepeating] = useState(0);
  const [shuffled, setShuffled] = useState(false);

  const player = useSpotifyPlayer();
  const device = usePlayerDevice();
  const { device_id = "" } = device || {};

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
        .catch((e) => console.error(e));
  };

  const next = () => {
    if (token && device_id)
      axios
        .post(
          config.api.baseUrl + "/me/player/next",
          {},
          { headers: { authorization: token } }
        )
        .catch((e) => console.error(e));
    axios
      .get(config.api.baseUrl + "/me/player", {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatch(setTrack({ item: res.data.item, idx: idx + 1 }));
      })
      .catch((e) => console.error(e));
  };

  const prev = () => {
    if (token && device_id)
      axios
        .post(
          config.api.baseUrl + "/me/player/previous",
          {},
          { headers: { authorization: token } }
        )
        .catch((e) => console.error(e));
    axios
      .get(config.api.baseUrl + "/me/player", {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatch(setTrack({ item: res.data.item, idx: idx - 1 }));
      })
      .catch((e) => console.error(e));
  };

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
                repeating === 1
                  ? "track"
                  : repeating === 2
                  ? "context"
                  : "off",
            },
          }
        )
        .catch((e) => console.error(e));
    setRepeating(repeating + 1 >= 3 ? 0 : repeating + 1);
  };

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
              state: !shuffled,
            },
          }
        )
        .catch((e) => console.error(e));
    setShuffled(!shuffled);
  };

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
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              device_id,
            },
          }
        )
        .catch((e) => {});
  };

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
        .catch((e) => {});
  };

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

  useEffect(() => {
    if (player) {
      setStarted(true);
      setPlaying(true);
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const webPlaybackSDKReady = useWebPlaybackSDKReady();

  if (!webPlaybackSDKReady) return <div>Loading...</div>;
  if (!player) return <p>Loading...</p>;

  return (
    <>
      <div className="player__album">
        {url || url2 ? <img src={url || url2} alt={name} /> : <span />}
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
          style={{ color: shuffled ? "blue" : null }}
        />
        <FontAwesomeIcon
          icon={faRetweet}
          style={{
            color:
              repeating === 1
                ? "blue"
                : repeating === 2
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
