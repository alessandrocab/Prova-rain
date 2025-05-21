const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);

// Ogni colonna ha una scia fissa
const drops = Array(columns).fill().map(() => ({
  y: Math.random() * canvas.height / fontSize,
  trail: Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => 
    letters[Math.floor(Math.random() * letters.length)])
}));

function draw() {
  // Leggera opacità per dissolvere lentamente le lettere vecchie
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize;
    const drop = drops[i];

    for (let j = 0; j < drop.trail.length; j++) {
      const y = (drop.y - j) * fontSize;
      if (y > 0 && y < canvas.height) {
        ctx.fillText(drop.trail[j], x, y);
      }
    }

    drop.y += 1;

    if ((drop.y - drop.trail.length) * fontSize > canvas.height) {
      drop.y = 0;
      drop.trail = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () =>
        letters[Math.floor(Math.random() * letters.length)]
      );
    }
  }
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
