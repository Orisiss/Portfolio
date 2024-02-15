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
 * Code to create a trailing effect from the mouse pointer.
 * Gets canvas context, tracks mouse move and idle state.
 * Defines pointer, parameters, trail, and event listeners.
 * Draws quadratic bezier curve trail on canvas by tracking pointer.
 * Updates canvas size on window resize.
 */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let mouseMoved = false;
let mouseInactiveTimer;

const pointer = {
  x: 0.5 * window.innerWidth,
  y: 0.5 * window.innerHeight,
};
const params = {
  pointsNumber: 40,
  widthFactor: 0.3,
  mouseThreshold: 0.6,
  spring: 0.4,
  friction: 0.5,
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
  trail[i] = {
    x: pointer.x,
    y: pointer.y,
    dx: 0,
    dy: 0,
  };
}

const links = document.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    canvas.style.pointerEvents = "none";
  });

  link.addEventListener("mouseout", () => {
    canvas.style.pointerEvents = "all";
  });
});

window.addEventListener("mousemove", (e) => {
  mouseMoved = true;
  updateMousePosition(e.clientX, e.clientY);
});
window.addEventListener("touchmove", (e) => {
  mouseMoved = true;
  updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

document.addEventListener("mousemove", function () {
  clearTimeout(mouseInactiveTimer);
  mouseInactiveTimer = setTimeout(function () {
    mouseMoved = false;
  }, 10000);
});

function updateMousePosition(eX, eY) {
  pointer.x = eX;
  pointer.y = eY;
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);

function update(t) {
  if (!mouseMoved) {
    pointer.x =
      (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
      window.innerWidth;
    pointer.y =
      (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
      window.innerHeight;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var gradient = ctx.createRadialGradient(
    trail[0].x,
    trail[0].y,
    5,
    trail[0].x,
    trail[0].y,
    20
  );
  gradient.addColorStop(0, "white");

  ctx.strokeStyle = gradient;
  trail.forEach((p, pIdx) => {
    const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
    const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
    p.dx += (prev.x - p.x) * spring;
    p.dy += (prev.y - p.y) * spring;
    p.dx *= params.friction;
    p.dy *= params.friction;
    p.x += p.dx;
    p.y += p.dy;
  });

  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);

  for (let i = 1; i < trail.length - 1; i++) {
    const xc = 0.5 * (trail[i].x + trail[i + 1].x);
    const yc = 0.5 * (trail[i].y + trail[i + 1].y);
    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
    ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
    ctx.stroke();
  }
  ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
  ctx.stroke();

  window.requestAnimationFrame(update);
}

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

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
