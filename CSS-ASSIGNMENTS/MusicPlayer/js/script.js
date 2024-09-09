// Initialize playlist and song data
const playlist = [
  {
    id: "song1",
    title: "The Plague Doctor's Lament",
    file: "path/to/song1.mp3",
    lyrics: "lyrics/song1.txt",
  },
  {
    id: "song2",
    title: "Reborn from Shadows",
    file: "path/to/song2.mp3",
    lyrics: "lyrics/song2.txt",
  },
];

let currentSongIndex = 0;
let isPlaying = false;
let isRepeating = false;

// DOM elements
const audioPlayer = document.getElementById("audio-player");
const videoPlayer = document.getElementById("video-player");
const songTitle = document.getElementById("compact-song-title");
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev-song");
const nextButton = document.getElementById("next-song");
const replayButton = document.getElementById("replay");
const repeatButton = document.getElementById("repeat");
const playlistDropdown = document.getElementById("playlist-dropdown");
const songList = document.getElementById("song-list");
const lyricsDiv = document.getElementById("lyrics");
const fileUpload = document.getElementById("file-upload");
const addSongButton = document.getElementById("add-song-button");
const createPlaylistButton = document.getElementById("create-playlist-button");

// Load the song into the player
function loadSong(index) {
  const song = playlist[index];
  audioPlayer.src = song.file;
  songTitle.textContent = song.title;

  // Fetch and display lyrics
  fetch(song.lyrics)
    .then((response) => response.text())
    .then((text) => {
      lyricsDiv.textContent = text;
    })
    .catch(() => {
      lyricsDiv.textContent = "Lyrics not available";
    });

  audioPlayer.play();
  isPlaying = true;
  updatePlayPauseButton();
}

// Update the play/pause button text
function updatePlayPauseButton() {
  playPauseButton.textContent = isPlaying ? "⏸️" : "▶️";
}

// Play or pause the song
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseButton();
});

// Play the next song
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
});

// Play the previous song
prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
});

// Replay the current song from the beginning
replayButton.addEventListener("click", () => {
  audioPlayer.currentTime = 0;
  audioPlayer.play();
  isPlaying = true;
  updatePlayPauseButton();
});

// Toggle repeat mode
repeatButton.addEventListener("click", () => {
  isRepeating = !isRepeating;
  repeatButton.style.backgroundColor = isRepeating ? "#005bb5" : "#007aff";
  audioPlayer.loop = isRepeating;
});

// Handle song end event
audioPlayer.addEventListener("ended", () => {
  if (!isRepeating) {
    nextButton.click();
  }
});

// Load the first song initially
loadSong(currentSongIndex);

// Add songs to the playlist
playlist.forEach((song) => {
  const option = document.createElement("option");
  option.value = song.id;
  option.textContent = song.title;
  playlistDropdown.appendChild(option);
});

// Handle playlist selection
playlistDropdown.addEventListener("change", (event) => {
  const selectedSongId = event.target.value;
  const selectedSongIndex = playlist.findIndex(
    (song) => song.id === selectedSongId
  );
  if (selectedSongIndex !== -1) {
    currentSongIndex = selectedSongIndex;
    loadSong(currentSongIndex);
  }
});

// Handle file upload
fileUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("audio/")) {
      // Add new song to playlist
      const newSong = {
        id: `song${playlist.length + 1}`,
        title: file.name,
        file: url,
        lyrics: "", // Lyrics can be added later
      };
      playlist.push(newSong);
      // Update playlist dropdown
      const option = document.createElement("option");
      option.value = newSong.id;
      option.textContent = newSong.title;
      playlistDropdown.appendChild(option);
      // Load new song automatically
      currentSongIndex = playlist.length - 1;
      loadSong(currentSongIndex);
    }
  }
});

// Handle create playlist button
createPlaylistButton.addEventListener("click", () => {
  alert("Create Playlist feature is not implemented.");
});
