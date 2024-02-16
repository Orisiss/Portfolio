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