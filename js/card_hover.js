const cards = document.querySelectorAll(".card-tools");

cards.forEach((card) => {
  const video = card.querySelector("video");

  card.addEventListener("mouseover", () => {
    video.play();
  });

  card.addEventListener("mouseout", () => {
    video.pause();
    video.currentTime = 0;
  });
});
