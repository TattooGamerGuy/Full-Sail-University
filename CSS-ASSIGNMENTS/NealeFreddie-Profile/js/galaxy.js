// Variables to control the galaxy animation
let rotationSpeed = 0.0005; // Adjust this value to change the speed
let starWidth = 5; // Maximum width of stars
let starHeight = 5; // Maximum height of stars

// Function to spawn galaxy stars
function spawnGalaxy() {
  const galaxy = document.getElementById("galaxy");

  // Clear any existing stars
  galaxy.innerHTML = "";

  // Number of stars to create
  const numStars = 1000;

  // Function to create a star
  function createStar() {
    const star = document.createElement("div");

    // Random size and opacity for depth effect
    const size = Math.random() * starWidth + 2; // Random width between 2px and starWidth
    const opacity = Math.random() * 0.7 + 0.3; // Random opacity between 0.3 and 1.0

    // Set style for the star
    star.style.position = "absolute";
    star.style.width = `${size}px`;
    star.style.height = `${size * (starHeight / starWidth)}px`; // Maintain aspect ratio
    star.style.backgroundColor = "white";
    star.style.borderRadius = "50%";
    star.style.opacity = opacity;

    // Random initial position
    const left = Math.random() * 100; // Between 0% and 100%
    const top = Math.random() * 100; // Between 0% and 100%
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;

    // Append the star to the galaxy
    galaxy.appendChild(star);

    // Return the star element with initial position
    return { element: star, left, top };
  }

  // Create multiple stars
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
  }

  // Animate the galaxy
  function animateGalaxy() {
    stars.forEach((starObj) => {
      const star = starObj.element;
      let left = starObj.left;
      let top = starObj.top;

      // Calculate radius from the center
      const centerX = 50; // Center X (50% of the parent)
      const centerY = 50; // Center Y (50% of the parent)
      const offsetX = left - centerX;
      const offsetY = top - centerY;
      const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

      // Calculate the new angle and position
      const currentAngle = Math.atan2(offsetY, offsetX);
      const newAngle = currentAngle + rotationSpeed;

      // New positions based on angle and distance
      const newX = centerX + Math.cos(newAngle) * distance;
      const newY = centerY + Math.sin(newAngle) * distance;

      // Apply the new positions
      star.style.left = `${newX}%`;
      star.style.top = `${newY}%`;

      // Update the star object's position
      starObj.left = newX;
      starObj.top = newY;
    });

    // Call the animation function on the next frame
    requestAnimationFrame(animateGalaxy);
  }

  // Start the animation
  animateGalaxy();
}
