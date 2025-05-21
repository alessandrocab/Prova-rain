const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

// Ogni colonna ha un array con lettere (scia) e la posizione y attuale
const drops = Array(columns).fill().map(() => ({
  y: Math.floor(Math.random() * canvas.height / fontSize),
  trailLength: Math.floor(Math.random() * 10 + 10) // lunghezza della scia
}));

function draw() {
  // Oscura solo leggermente: la scia svanisce, ma lo sfondo resta
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize;
    const drop = drops[i];

    for (let j = 0; j < drop.trailLength; j++) {
      const char = letters[Math.floor(Math.random() * letters.length)];
      const y = (drop.y - j) * fontSize;
      const opacity = 1 - j / drop.trailLength;
      ctx.fillStyle = `rgba(0, 255, 0, ${opacity.toFixed(2)})`;
      ctx.fillText(char, x, y);
    }

    drop.y += 1;

    if (drop.y * fontSize > canvas.height && Math.random() > 0.975) {
      drop.y = 0;
      drop.trailLength = Math.floor(Math.random() * 10 + 10);
    }
  }
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
