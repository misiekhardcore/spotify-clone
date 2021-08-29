import { createSlice, configureStore } from "@reduxjs/toolkit";
// "spotify:track:5HCyWlXZPP0y6Gqq8TgA20"
const trackSlice = createSlice({
  name: "track",
  initialState: {
    name: "",
    uri: "",
    album: { images: [{ url: "" }] },
    images: [{ url: "" }],
    idx: 0,
    song: false,
  },
  reducers: {
    setUri: (state, action) => ({ ...state, uri: action.payload }),
    setSong: (state, action) => {
      if (action.payload.item.track)
        return {
          ...state,
          ...action.payload.item.track,
          idx: action.payload.idx,
          song: true,
        };
      return {
        ...state,
        ...action.payload.item,
        idx: action.payload.idx,
        song: true,
      };
    },
    setTrack: (state, action) => {
      if (action.payload.item.track)
        return {
          ...state,
          ...action.payload.item.track,
          idx: action.payload.idx,
          uri: state.uri,
          song: false,
        };
      return {
        ...state,
        ...action.payload.item,
        idx: action.payload.idx,
        uri: state.uri,
        song: false,
      };
    },
    setPlaying: (state, action) => ({
      ...state,
      playing: action.payload,
    }),
    setStarted: (state, action) => ({
      ...state,
      started: action.payload,
    }),
    setVolume: (state, action) => ({
      ...state,
      volume: action.payload,
    }),
  },
});

export const {
  setTrack,
  setPlaying,
  setStarted,
  setVolume,
  setUri,
  setSong,
} = trackSlice.actions;

export const store = configureStore({
  reducer: { track: trackSlice.reducer },
});
