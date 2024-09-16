// Get reference to the animated text element
const animatedTextContainer = document.getElementById("animated-text");

// Function to update text based on selected theme
function updateThemeText(theme) {
  let themeText = "";

  switch (theme) {
    case "dark-theme.css":
      themeText = "Welcome to my Profile Page - Select a Theme! -";
      break;
    case "normal-theme.css":
      themeText = "Each theme will display a different color pallet and theme";
      break;
    case "modern-theme.css":
      themeText =
        "Welcome to the Modern Theme - Experience the future of UI design! 🌟";
      break;
    case "retro-theme.css":
      themeText = "Welcome to the Retro Theme - A blast from the past! 🎮";
      break;
    case "pokemon-theme.css":
      themeText = "Welcome to the Pokémon Theme - Gotta code 'em all! ⚡";
      break;
    default:
      themeText = "Welcome!";
  }

  animatedTextContainer.innerText = themeText;
}

// Initial text update when the page loads
const currentTheme = document.getElementById("theme-select").value;
updateThemeText(currentTheme);

// Event listener for theme changes
document.getElementById("theme-select").addEventListener("change", function () {
  const selectedTheme = this.value;
  updateThemeText(selectedTheme);
});
