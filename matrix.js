const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);

const drops = Array.from({ length: columns }, () => ({
  y: Math.floor(Math.random() * -20),
  trail: Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  )
}));

function draw() {
  // Pulizia soft per dissolvenza
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < columns; i++) {
    const x = i * fontSize;
    const drop = drops[i];

    drop.trail.forEach((char, index) => {
      const y = (drop.y - index) * fontSize;
      if (y > 0 && y < canvas.height) {
        ctx.fillText(char, x, y);
      }
    });

    drop.y += 1;

    if ((drop.y - drop.trail.length) * fontSize > canvas.height) {
      // Reset e genera nuova scia statica
      drops[i] = {
        y: 0,
        trail: Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () =>
          letters[Math.floor(Math.random() * letters.length)]
        )
      };
    }
  }
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
