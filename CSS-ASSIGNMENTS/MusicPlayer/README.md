# MusicPlayer

## Overview

MusicPlayer is a web-based application that allows users to view and interact with their Spotify playlists. It supports playing MP3 and MP4 files and features a sleek, black design inspired by iPhone aesthetics.

## Features

- **Playlist Display**: Shows the name of the playlist and the currently playing song.
- **Media Controls**: Includes buttons for playing, pausing, and stopping audio and video.
- **Lyrics Display**: Area to show lyrics (requires integration with a lyrics API).
- **Responsive Design**: Optimized for modern web browsers and devices.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/MusicPlayer.git
   cd MusicPlayer
   ```

2. **Open the Application**:

   Open `index.html` in your web browser. You can do this by double-clicking the file or using a local server setup.

## Configuration

### Spotify API Setup

1. **Register Your App**:

   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
   - Create a new application to get your `Client ID` and `Client Secret`.

2. **Update the Client ID and Redirect URI**:
   - Replace `YOUR_CLIENT_ID` in `script.js` with your actual Client ID.
   - Ensure that the `REDIRECT_URI` in `script.js` matches the redirect URI set in your Spotify Developer Dashboard.

### Media Playback

- **Audio**: MP3 files are played using the `<audio>` element.
- **Video**: MP4 files are played using the `<video>` element.

### `index.html`

The HTML file provides the structure of the player:

- **`<h1 id="playlist-name">`**: Displays the name of the playlist.
- **`#now-playing`**: Shows album art and song information.
- **`#media-player`**: Contains the audio and video players.
- **`#player-controls`**: Contains buttons to control playback.
- **`#lyrics-container`**: Displays lyrics (placeholder).

### `styles.css`

The CSS file styles the player with a black, sleek design:

- \*\*
