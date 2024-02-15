/**
 * Code to handle page scroll behavior and back to top button visibility.
 * On DOM load, get reference to back to top button element.
 * On window scroll, check scroll position and show/hide button accordingly.
 * On button click, scroll page back to top.
 * On window load, scroll to top.
 * Replace browser history state to remove scroll position.
 */
document.addEventListener("DOMContentLoaded", function () {
  let backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});
window.onload = function () {
  window.scrollTo(0, 0);
};
history.replaceState({}, document.title, window.location.pathname);

/**
 * Adds mousemove event listeners to update cursor element positions based on mouse coordinates.
 * Adds mousedown/mouseup event listeners to toggle click styles on the cursor elements.
 * Loops through anchor elements and adds mouseover/mouseleave event listeners
 * to toggle hover styles on the cursor.
 */
var cursor = document.querySelector(".cursor");
var cursorinner = document.querySelector(".cursor2");
var a = document.querySelectorAll("a");

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + "px";
  cursorinner.style.top = y + "px";
});

document.addEventListener("mousedown", function () {
  cursor.classList.add("click");
  cursorinner.classList.add("cursorinnerhover");
});

document.addEventListener("mouseup", function () {
  cursor.classList.remove("click");
  cursorinner.classList.remove("cursorinnerhover");
});

a.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hover");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

/**
 * Handles horizontal mouse scrolling for the carousel element.
 * On mousemove over the carousel, calculates the scroll amount based on mouse position
 * and carousel width. Sets a timeout to stop scrolling after 1 second.
 */
const carousel = document.getElementById("carousel");
let isScrolling = false;
carousel.addEventListener("mousemove", (e) => {
  if (isScrolling) return;
  isScrolling = true;
  const carouselWidth = carousel.offsetWidth;
  const maxScrollLeft = carousel.scrollWidth - carouselWidth;
  const mouseX = e.clientX - carousel.getBoundingClientRect().left;
  const scrollDistance = (mouseX / carouselWidth) * maxScrollLeft;
  carousel.scrollLeft = scrollDistance;
  setTimeout(() => {
    isScrolling = false;
  }, 1000);
});
