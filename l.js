window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 800);
  }, 1500);
});

const card = document.querySelector(".birthdayCard");
const music = document.getElementById("music");
const textElement = document.getElementById("desc");

const text = textElement.getAttribute("data-text");

let isOpen = false;
let i = 0;
let typing = false;
let locked = false;
let heartInterval = null;

// ✍️ TYPEWRITER
function typeWriter() {
  if (i < text.length) {
    textElement.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  } else {
    typing = false;
  }
}

// 💖 CORAZONES
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 15) + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}

// 🎉 CONFETTI
function createConfetti() {
  for (let i = 0; i < 60; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";

    conf.style.left = Math.random() * 100 + "vw";
    conf.style.backgroundColor = `hsl(${Math.random() * 360},100%,50%)`;
    conf.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 5000);
  }
}

// 🎂 INTERACCIÓN PRINCIPAL (UNA SOLA)
card.addEventListener("click", () => {
  if (locked) return;
  locked = true;

  setTimeout(() => {
    locked = false;
  }, 800);

  isOpen = !isOpen;

  if (isOpen) {
    card.classList.add("open");

    // 🎵 Música
    music.currentTime = 0;
    music.volume = 0;
    music.play();

    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 1) {
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 100);

    // 💖 corazones (controlado)
    if (!heartInterval) {
      heartInterval = setInterval(createHeart, 300);
    }

    // 🎉 confetti solo una vez
    createConfetti();

    // ✍️ texto
    setTimeout(() => {
      textElement.innerHTML = "";
      i = 0;
      typing = true;
      typeWriter();
    }, 600);

  } else {
    card.classList.remove("open");

    // 🔇 música
    music.pause();
    music.currentTime = 0;

    // 💖 detener corazones
    clearInterval(heartInterval);
    heartInterval = null;

    // 🔄 reset texto
    textElement.innerHTML = "";
    i = 0;
    typing = false;
  }
});