const cards_tools = document.querySelectorAll(".card-tools");
const cards_projects = document.querySelectorAll(".card");
const cards_veille = document.querySelectorAll(".card-veille");

cards_tools.forEach((card) => {
  const video = card.querySelector("video");

  card.addEventListener("mouseover", () => {
    video.play();
  });

  card.addEventListener("mouseout", () => {
    video.pause();
    video.currentTime = 0;
  });
});

cards_veille.forEach((card) => {
  const video = card.querySelector("video");

  card.addEventListener("mouseover", () => {
    video.play();
  });

  card.addEventListener("mouseout", () => {
    video.pause();
    video.currentTime = 0;
  });
});

cards_projects.forEach((card) => {
  const video = card.querySelector("video");

  card.addEventListener("mouseover", () => {
    video.play();
  });

  card.addEventListener("mouseout", () => {
    video.pause();
    video.currentTime = 0;
  });
});
