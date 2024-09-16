const playPauseButton = document.getElementById("play-pause");
const songListElement = document.getElementById("song-list");
const volumeControl = document.getElementById("volume-control");
const songImage = document.getElementById("song-image");
let currentSong = null;
let selectedSong = null;
let isPlaying = false;
let songIndex = 0;
let songQueue = [];
const progressBar = document.getElementById("progress-bar");

// Fetch songs from JSON file and populate the song list
fetch("songs/songs.json")
  .then((response) => response.json())
  .then((data) => {
    songQueue = data; // Load the JSON data into the songQueue array

    // Display the songs in the list
    displaySongs(songQueue);
  })
  .catch((error) => console.error("Error fetching song data:", error));

// Function to display the songs in the list
function displaySongs(songs) {
  songListElement.innerHTML = ""; // Clear the song list

  songs.forEach((song, index) => {
    const songCard = document.createElement("div");
    songCard.classList.add("song-card");
    songCard.innerHTML = `
      <img src="${song.image}" alt="${song.title} Art">
      <p class="song-title">${song.title}</p>
      <p class="artist-name">${song.artist}</p>
      <p class="song-length">${song.length}</p>
    `;
    songCard.addEventListener("click", () => playSong(index));
    songListElement.appendChild(songCard); // Append the song card to the list
  });
}

// Play selected song
function playSong(index) {
  songIndex = index;
  const song = songQueue[songIndex];

  if (currentSong) currentSong.pause(); // Pause any existing song
  currentSong = new Audio(song.path);
  currentSong.volume = volumeControl.value; // Set volume to current level
  currentSong.play();
  isPlaying = true;

  // Update song info
  document.querySelector(".song-title").innerText = song.title;
  document.querySelector(".artist-name").innerText = song.artist;
  document.querySelector(".song-length").innerText = song.length;
  songImage.src = song.image; // Set the current song image
  playPauseButton.innerText = "Pause";

  playPauseButton.onclick = togglePlayPause;

  // Update the progress bar based on the current song time
  currentSong.addEventListener("loadedmetadata", () => {
    progressBar.max = currentSong.duration;
  });

  currentSong.addEventListener("timeupdate", () => {
    if (currentSong.duration) {
      progressBar.value = currentSong.currentTime;

      // Calculate percentage of time listened and update the background
      const percentage = (currentSong.currentTime / currentSong.duration) * 100;
      progressBar.style.background = `linear-gradient(to right, #00ff99 ${percentage}%, #333 ${percentage}%)`;
    }
  });
}

// Toggle play/pause functionality
function togglePlayPause() {
  if (isPlaying) {
    currentSong.pause();
    isPlaying = false;
    playPauseButton.innerText = "Play";
  } else {
    currentSong.play();
    isPlaying = true;
    playPauseButton.innerText = "Pause";
  }
}

// Next song
document.getElementById("next").addEventListener("click", () => {
  if (songQueue.length > 0) {
    songIndex = (songIndex + 1) % songQueue.length; // Loop back to start if at the end
    playSong(songIndex);
  }
});

// Previous song
document.getElementById("prev").addEventListener("click", () => {
  if (songQueue.length > 0) {
    songIndex = (songIndex - 1 + songQueue.length) % songQueue.length; // Loop back to end if at the start
    playSong(songIndex);
  }
});

// Volume control
volumeControl.addEventListener("input", (event) => {
  if (currentSong) {
    currentSong.volume = event.target.value;
  }
});

// Tab Switching
function showTab(tabName) {
  const contentTabs = document.querySelectorAll(".content-tab");
  contentTabs.forEach((tab) => {
    tab.style.display = "none"; // Hide all tabs
  });

  document.getElementById(tabName).style.display = "block"; // Show the selected tab
}

// Progress bar interaction for manual scrubbing
progressBar.addEventListener("input", () => {
  if (currentSong) {
    currentSong.currentTime = progressBar.value;
  }
});

// Default to show the Songs tab on load
window.onload = function () {
  showTab("songs");
};

// Progress bar background update when dragging
document.getElementById("progress-bar").addEventListener("input", function () {
  const progressBar = document.getElementById("progress-bar");
  const value = progressBar.value;
  const max = progressBar.max;

  // Calculate percentage of the bar filled based on the progress value
  const percentage = (value / max) * 100;

  // Update the background of the progress bar dynamically
  progressBar.style.background = `linear-gradient(to right, #00ff99 ${percentage}%, #333 ${percentage}%)`;
});
