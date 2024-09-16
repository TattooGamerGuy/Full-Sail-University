const themeSelect = document.getElementById("theme-select");
const themeStyleLink = document.getElementById("theme-style");
const profilePicture = document.getElementById("profile-image"); // Access the profile picture element
const algorithmAcademyImage = document.querySelector(
  "[data-hobby='web-development'] img"
); // Access the Algorithm Academy image

themeSelect.addEventListener("change", function () {
  const selectedTheme = this.value;
  themeStyleLink.setAttribute("href", `css/theme/${selectedTheme}`);

  // Change the profile picture based on the selected theme
  if (selectedTheme === "retro-theme.css") {
    profilePicture.src = "images/pixelatedprofilepic.jpg"; // Set pixelated profile pic for Retro theme
    algorithmAcademyImage.src = "images/pixelLogo.jpg"; // Set pixel logo for Retro theme

    // Call spawnGalaxy to create stars for the Retro theme
    spawnGalaxy();
  } else if (selectedTheme === "modern-theme.css") {
    profilePicture.src = "images/nftprofile.jpg"; // Set NFT profile pic for Modern theme
    algorithmAcademyImage.src = "images/algorithm-academy-placeholder.jpg"; // Use modern logo for Modern theme

    // Optionally clear the galaxy if it's not the Retro theme
    clearGalaxy();
  } else {
    profilePicture.src = "images/profile.jpg"; // Revert to the default profile picture
    algorithmAcademyImage.src = "images/algorithm-academy-placeholder.jpg"; // Revert to default image for other themes

    // Optionally clear the galaxy if it's not the Retro theme
    clearGalaxy();
  }
});

// Function to clear the galaxy
function clearGalaxy() {
  const galaxy = document.getElementById("galaxy");
  if (galaxy) {
    galaxy.innerHTML = ""; // Clear all stars from the galaxy container
  }
}
