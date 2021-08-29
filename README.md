# Spotify Coding Challenge 🎧 for Huren.nl

# How to run it

1. Create account in dashboard and create app
1. Put your ClientID and ClientSecret into config.js file
1. In dashboard add you user to the app and set redirect url to `http://localhost:3000/login`
1. Player sometimes requires a lot of patience  (belive thats a problem with SDK)
1. IMPORTANT! player works only with spotify premium

&nbsp;

# Goals/Outcomes ✨

- To test knowledge of consuming APIs and handling responses
- Loading state and knowing where and how to make multiple API calls efficiently

&nbsp;

# Pre-requisites ✅

- Add your Spotify client ID & secret to `config.js`
  - See https://developer.spotify.com/

&nbsp;

# Requirements 📖

- Fetch and display _Released This Week_ songs
  - Use the API path `new-releases`
- Fetch and display _Featured Playlists_
  - Use the API path `featured-playlists`
- Fetch and display _Browse_ genres
  - Use the API path `categories`
- Loading state/UI _(optional)_

&nbsp;

# Think about 💡

- Taking a look at the Spotify API documentation
- Do you resolve each API request one after the other or in parallel?
- Where do you make the API requests?
- How much logic do you offload out of the UI components?

&nbsp;

# What's Already Been Done 🏁

- Basic app setup
- Basic styling

&nbsp;

# Want some bonus points?

- Make it look good
- Get the player working
