import Swiper from "swiper";

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

// Partie trainée derrière curseur

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let mouseMoved = false;

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

window.addEventListener("mousemove", (e) => {
  mouseMoved = true;
  updateMousePosition(e.clientX, e.clientY);
});
window.addEventListener("touchmove", (e) => {
  mouseMoved = true;
  updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
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

// Partie blob en arrière-plan

const MIN_SPEED = 1.5;
const MAX_SPEED = 2.5;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class Blob {
  constructor(el) {
    this.el = el;
    const boundingRect = this.el.getBoundingClientRect();
    this.size = boundingRect.width;
    this.initialX = randomNumber(0, window.innerWidth - this.size);
    this.initialY = randomNumber(0, window.innerHeight - this.size);
    this.el.style.top = `${this.initialY}px`;
    this.el.style.left = `${this.initialX}px`;
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.x = this.initialX;
    this.y = this.initialY;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size;
      this.vx *= -1;
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size;
      this.vy *= -1;
    }
    if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.vy *= -1;
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${
      this.y - this.initialY
    }px)`;
  }
}

function initBlobs() {
  const blobEls = document.querySelectorAll(".bouncing-blob");
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

  function update() {
    requestAnimationFrame(update);
    blobs.forEach((blob) => {
      blob.update();
      blob.move();
    });
  }

  requestAnimationFrame(update);
}

initBlobs();

// Partie animation du carousel

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("project-item-visible");
    } else {
      entry.target.classList.remove("project-item-visible");
    }
  });
});

const projectItems = document.querySelectorAll(".project-item");
projectItems.forEach((item) => {
  observer.observe(item);
});