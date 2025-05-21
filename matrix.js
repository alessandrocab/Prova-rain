const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

// Array che contiene per ogni colonna la "y" attuale e la sua scia
const drops = Array(columns).fill().map(() => ({
  y: Math.floor(Math.random() * canvas.height / fontSize),
  trail: []
}));

function draw() {
  // Riempimento trasparente molto leggero per dissolvere le lettere precedenti
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "start";
  ctx.textBaseline = "top";

  drops.forEach((drop, i) => {
    const x = i * fontSize;
    const newChar = letters[Math.floor(Math.random() * letters.length)];

    // Aggiunge nuovo carattere alla cima della scia
    drop.trail.unshift({ char: newChar, age: 0 });

    // Disegna i caratteri della scia con luminosità diversa
    drop.trail.forEach((item, j) => {
      const opacity = Math.max(0, 1 - j * 0.1); // sfuma gradualmente
      ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
      ctx.fillText(item.char, x, (drop.y - j) * fontSize);
    });

    // Aggiorna y (scende)
    drop.y += 1;

    // Rimuove i caratteri troppo vecchi
    if (drop.trail.length > 20) drop.trail.pop();

    // Resetta colonna casualmente
    if (drop.y * fontSize > canvas.height && Math.random() > 0.975) {
      drop.y = 0;
      drop.trail = [];
    }
  });
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
