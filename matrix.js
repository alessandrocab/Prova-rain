const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);

// Ogni colonna ha una singola lettera e la sua y
const drops = Array(columns).fill().map(() => ({
  y: Math.random() * canvas.height / fontSize,
  char: letters[Math.floor(Math.random() * letters.length)]
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;
  ctx.fillStyle = "#0F0";

  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize;
    const drop = drops[i];

    ctx.fillText(drop.char, x, drop.y * fontSize);

    drop.y += 1;

    // Quando esce dallo schermo, ricomincia da sopra con un nuovo carattere
    if (drop.y * fontSize > canvas.height) {
      drop.y = 0;
      drop.char = letters[Math.floor(Math.random() * letters.length)];
    }
  }
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
