var typed = new Typed(".text", {
  strings: ["Photographer", "System Engineer Student", "Junior developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// Crear elementos para la pantalla negra y la pelota
const blackScreen = document.createElement('div');
blackScreen.id = 'blackScreen';
const ball = document.createElement('div');
ball.classList.add('ball');
blackScreen.appendChild(ball);
document.body.appendChild(blackScreen);

// Inicializar variables para el movimiento de la pelota
let posX = 0, posY = 0, velocityX = 2, velocityY = 2;

// Función para generar un color aleatorio en formato RGB
function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

// Función para actualizar la posición de la pelota
function updateBallPosition() {
  const maxX = window.innerWidth - 5; // 50 es el diámetro de la pelota
  const maxY = window.innerHeight - 5;

  posX += velocityX;
  posY += velocityY;

  if (posX > maxX || posX < 0) {
    velocityX *= -1;
    ball.style.backgroundColor = getRandomColor(); // Cambia de color al chocar con paredes horizontales
  }
  if (posY > maxY || posY < 0) {
    velocityY *= -1;
    ball.style.backgroundColor = getRandomColor(); // Cambia de color al chocar con paredes verticales
  }

  ball.style.left = posX + 'px';
  ball.style.top = posY + 'px';

  requestAnimationFrame(updateBallPosition); // Animación continua
}

// Manejar la inactividad
let timeout;
function resetTimer() {
  clearTimeout(timeout);
  blackScreen.style.display = 'none';
  timeout = setTimeout(() => {
    blackScreen.style.display = 'flex';
    updateBallPosition();
  }, 2000); 
}

// Eventos para resetear el temporizador
window.onload = resetTimer;
document.onmousemove = resetTimer;
document.onkeypress = resetTimer;
