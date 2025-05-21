const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);

// Ogni colonna avrà una "scia" di lettere e una y
const drops = Array(columns).fill().map(() => ({
  y: Math.random() * canvas.height / fontSize,
  trail: Array.from({ length: 10 }, () => letters[Math.floor(Math.random() * letters.length)])
}));

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;
  ctx.fillStyle = "#0F0";

  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize;
    const drop = drops[i];

    // Disegna ogni lettera della scia
    for (let j = 0; j < drop.trail.length; j++) {
      const y = (drop.y - j) * fontSize;
      if (y > 0 && y < canvas.height) {
        ctx.fillText(drop.trail[j], x, y);
      }
    }

    drop.y += 1;

    // Quando la scia è uscita completamente, ricomincia con nuove lettere
    if ((drop.y - drop.trail.length) * fontSize > canvas.height) {
      drop.y = 0;
      drop.trail = Array.from({ length: 10 }, () => letters[Math.floor(Math.random() * letters.length)]);
    }
  }
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
