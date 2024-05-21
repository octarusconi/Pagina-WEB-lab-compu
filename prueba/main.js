let x = 0, y = 0, dirX = 1, dirY = 1;
const speed = 2;
const pallete = ["#ff8800", "#e124ff", "#6a19ff", "#ff2188"];
let dvd = document.getElementById("dvd");
let black = document.getElementById("black");
let content = document.getElementById("content");
dvd.style.backgroundColor = pallete[0];
let prevColorChoiceIndex = 0;
let timeout;
let animating = false;

function getNewRandomColor() {
  const currentPallete = [...pallete];
  currentPallete.splice(prevColorChoiceIndex, 1);
  const colorChoiceIndex = Math.floor(Math.random() * currentPallete.length);
  prevColorChoiceIndex = colorChoiceIndex < prevColorChoiceIndex ? colorChoiceIndex : colorChoiceIndex + 1;
  return currentPallete[colorChoiceIndex];
}

function animate() {
  if (!animating) return;
  const screenHeight = document.body.clientHeight;
  const screenWidth = document.body.clientWidth;
  const dvdWidth = dvd.clientWidth;
  const dvdHeight = dvd.clientHeight;

  if (y + dvdHeight >= screenHeight || y < 0) {
    dirY *= -1;
    dvd.style.backgroundColor = getNewRandomColor();
  }
  if (x + dvdWidth >= screenWidth || x < 0) {
    dirX *= -1;
    dvd.style.backgroundColor = getNewRandomColor();
  }

  x += dirX * speed;
  y += dirY * speed;
  dvd.style.left = x + "px";
  dvd.style.top = y + "px";
  requestAnimationFrame(animate);
}

function startAnimation() {
  black.style.display = 'block';
  content.style.display = 'none';
  animating = true;
  animate();
}

function stopAnimation() {
  black.style.display = 'none';
  content.style.display = 'block';
  animating = false;
}

function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(startAnimation, 2000); // Cambia después de 2 segundos de inactividad
}

// Agregar eventos de interacción
window.onload = resetTimeout;
document.onmousemove = resetTimeout;
document.onkeypress = resetTimeout;
document.onclick = function() {
  if (animating) {
    stopAnimation();
  }
  resetTimeout();
};

window.requestAnimationFrame(animate);
