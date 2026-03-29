const card = document.querySelector(".card");
const music = document.getElementById("music");

let isOpen = false;

card.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    card.classList.add("open");
    music.play();
  } else {
    card.classList.remove("open");
    music.pause();
    music.currentTime = 0; // opcional: reinicia canción
  }
});

card.addEventListener("click", () => {
  if (!isOpen) {
    isOpen = true;
    card.classList.add("open");
    music.play();
  }
});