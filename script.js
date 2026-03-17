let chaosLevel = 0;
let maxChaos = 25;
let isBroken = false;
let chaosInterval = null;
let audioCtx = null;

const chaosText = document.getElementById("chaosValue");
const msg = document.getElementById("systemMessage");
const overlay = document.querySelector(".overlay");
const buttons = document.querySelectorAll("button");

// =====================
// CLICK EVENT
// =====================
document.addEventListener("click", () => {
  if (isBroken) return;

  chaosLevel++;
  chaosText.textContent = chaosLevel;

  cinematicFlash();
  playGlitchSound();
  applyChaos();
});

// =====================
// CHAOS ENGINE
// =====================
function applyChaos() {
  applyHue();

  if (chaosLevel > 5) glitchText();
  if (chaosLevel > 7) distortUI();
  if (chaosLevel > 9) moveButtons();
  if (chaosLevel > 11) shakeScreen();
  if (chaosLevel > 13) rotateElements();
  if (chaosLevel > 15) systemTalk();
  if (chaosLevel > 17) spawnErrors();
  if (chaosLevel > 19) startAutoChaos();

  if (chaosLevel >= maxChaos) breakReality();
}

// =====================
// EFFECTS
// =====================

// 🎬 flash
function cinematicFlash() {
  overlay.style.background = "rgba(255,255,255,0.05)";
  setTimeout(() => {
    overlay.style.background = "transparent";
  }, 80);
}

// 🎨 hue shift
function applyHue() {
  document.body.style.filter = `hue-rotate(${chaosLevel * 5}deg)`;
}

// 🌀 glitch
function glitchText() {
  document.querySelectorAll(".glitch").forEach(el => {
    if (Math.random() > 0.7) {
      el.style.letterSpacing = "3px";
    }
  });
}

// 📐 distort
function distortUI() {
  document.body.style.transform += ` skew(${rand(-1,1)}deg)`;
}

// 🏃 move buttons
function moveButtons() {
  buttons.forEach(btn => {
    btn.style.transform = `
      translate(${rand(-30,30)}px, ${rand(-30,30)}px)
    `;
  });
}

// 📳 shake
function shakeScreen() {
  document.body.style.transform =
    `translate(${rand(-5,5)}px, ${rand(-5,5)}px)`;
}

// 🔄 rotate
function rotateElements() {
  buttons.forEach(btn => {
    btn.style.transform += ` rotate(${rand(-10,10)}deg)`;
  });
}

// 🤖 system talk
function systemTalk() {
  const messages = [
    "Stop clicking.",
    "You are losing control.",
    "System unstable...",
    "This is your fault.",
    "Why won't you stop?",
    "I told you.",
    "You broke something."
  ];

  msg.textContent = messages[Math.floor(Math.random() * messages.length)];
}

// 💥 fake errors
function spawnErrors() {
  const div = document.createElement("div");

  div.innerText = "⚠ ERROR";
  div.style.position = "fixed";
  div.style.top = Math.random() * window.innerHeight + "px";
  div.style.left = Math.random() * window.innerWidth + "px";
  div.style.color = "red";
  div.style.fontSize = "12px";
  div.style.pointerEvents = "none";

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 2000);
}

// 🤯 auto chaos
function startAutoChaos() {
  if (chaosInterval) return;

  chaosInterval = setInterval(() => {
    chaosLevel++;
    chaosText.textContent = chaosLevel;
    applyChaos();
  }, 1000);
}

// 🔊 sound
function playGlitchSound() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const osc = audioCtx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 200 + Math.random()*800;

  osc.connect(audioCtx.destination);
  osc.start();

  setTimeout(() => osc.stop(), 50);
}

// =====================
// ENDING
// =====================
function breakReality() {
  isBroken = true;

  document.body.innerHTML = `
    <div style="text-align:center;margin-top:20%;color:red">
      <h1>You broke it.</h1>
      <p>There is no undo.</p>
      <br>
      <small>Created by Agus Satria Adhitama</small>
    </div>
  `;
}

// =====================
// SECRET COMMAND
// =====================
let inputBuffer = "";

document.addEventListener("keydown", (e) => {
  if (isBroken) return;

  inputBuffer += e.key.toLowerCase();
  inputBuffer = inputBuffer.slice(-20);

  if (inputBuffer.includes("calm down")) resetSystem();
  if (inputBuffer.includes("more chaos")) chaosLevel += 5;
  if (inputBuffer.includes("who are you")) revealCreator();
});

function resetSystem() {
  chaosLevel = 0;
  location.reload();
}

function revealCreator() {
  document.body.innerHTML = `
    <div style="text-align:center;margin-top:20%;color:#00ffcc">
      <h1>Agus Satria Adhitama</h1>
      <p>The mind behind the chaos.</p>
    </div>
  `;
}

// =====================
// UTIL
// =====================
function rand(min, max) {
  return Math.random() * (max - min) + min;
}