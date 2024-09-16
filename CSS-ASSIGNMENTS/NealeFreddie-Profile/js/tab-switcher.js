const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".project-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    const hobby = this.getAttribute("data-hobby");
    const contentElement = document.querySelector(
      `.project-card[data-hobby="${hobby}"]`
    );

    // Remove active class from all tabs
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Add active class to clicked tab
    this.classList.add("active");

    // Hide all project cards
    contents.forEach((content) => (content.style.display = "none"));

    // Show the selected hobby's project card
    if (contentElement) {
      contentElement.style.display = "block";
    }
  });
});
