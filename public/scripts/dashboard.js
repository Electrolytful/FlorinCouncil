// script to add links to other pages on the dashboard

// get box elements from the dashboard
const libraryBox = document.getElementById("library");
const attractionsBox = document.getElementById("attractions");
const recyclingBox = document.getElementById("recycling");

// add event listeners, when clicked navigate to specified page
libraryBox.addEventListener("click", () => {
  window.location.href = "/library";
});

attractionsBox.addEventListener("click", () => {
  window.location.href = "/visit";
});

recyclingBox.addEventListener("click", () => {
  window.location.href = "/recycling/donations";
});
