(function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const COUNT = 22;
  const MIN_SIZE = 4;
  const MAX_SIZE = 18;

  const COLORS = [
    "rgba(212, 118, 138, VAL)",
    "rgba(232, 165, 180, VAL)",
    "rgba(237, 217, 204, VAL)",
    "rgba(245, 230, 234, VAL)",
    "rgba(253, 246, 240, VAL)",
  ];

  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement("div");
    dot.classList.add("particle");

    const size = random(MIN_SIZE, MAX_SIZE);

    const left = random(0, 100);

    const startY = random(100, 130);

    const dur = random(7, 14);

    const delay = random(-dur, 0);

    const maxOp = randomFloat(0.25, 0.7);

    const color = COLORS[Math.floor(Math.random() * COLORS.length)].replace(
      "VAL",
      maxOp,
    );

    Object.assign(dot.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${startY}%`,
      background: color,
      "--dur": `${dur}s`,
      "--delay": `${delay}s`,
      "--max-opacity": maxOp,
    });

    container.appendChild(dot);
  }

  function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
})();

(function setupRipple() {
  const btn = document.getElementById("joinBtn");
  if (!btn) return;

  btn.addEventListener("click", function (e) {
    const old = btn.querySelector(".ripple");
    if (old) old.remove();

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    Object.assign(ripple.style, {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      top: `${y - size / 2}px`,
      left: `${x - size / 2}px`,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.35)",
      transform: "scale(0)",
      animation: "rippleAnim 0.55s ease-out forwards",
      pointerEvents: "none",
    });

    injectRippleKeyframe();

    btn.appendChild(ripple);

    ripple.addEventListener("animationend", () => ripple.remove());
  });

  function injectRippleKeyframe() {
    if (document.getElementById("ripple-style")) return;

    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

(function setupClickFeedback() {
  const btn = document.getElementById("joinBtn");
  if (!btn) return;

  const originalHTML = btn.innerHTML;

  btn.addEventListener("click", function () {
    if (btn.dataset.clicked === "true") return;
    btn.dataset.clicked = "true";

    btn.innerHTML = `
      <svg style="width:20px;height:20px;flex-shrink:0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
      </svg>
      Abrindo o grupo…
    `;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.dataset.clicked = "false";
    }, 2500);
  });
})();
