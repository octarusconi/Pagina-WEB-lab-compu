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

  //--------------------//

// Define un objeto modalInfo con información sobre proyectos. Cada clave numérica representa un proyecto específico.
var modalInfo = {
    1: {
      title: "Project 1",
      info: "...",
      link: "#",
      github: "#"
    },
    // Similar para otros proyectos hasta el 6
    6: {
      title: "Project 6",
      info: "...",
      link: "#",
      github: "#"
    }
  };
  
  // Obtiene el elemento modal a partir de su ID. Este es el contenedor que se mostrará/ocultará.
  var modal = document.getElementById('preview');
  
  // Obtiene todos los elementos con la clase "button", que son los botones que abren el modal.
  var btn = document.getElementsByClassName("button");
  
  // Obtiene el primer elemento con la clase "close", que es el botón para cerrar el modal.
  var span = document.getElementsByClassName("close")[0];
  
  // Añade un evento de clic a cada botón. Cada clic llama a la función openModal con el proyecto asociado al botón.
  for(let i = 0; i < btn.length; i++){
    btn[i].addEventListener("click", function() {
      var project = btn[i].parentElement;
      openModal(project);
    })
  };
  
  // Función para abrir el modal. Configura la información del proyecto seleccionado y muestra el modal.
  function openModal(project){
    var id = project.id; // Obtiene el ID del proyecto
    var img = project.getElementsByTagName("img")[0].src; // Obtiene la URL de la imagen del proyecto
    fillOut(id, img); // Llena el modal con la información del proyecto
    modal.style.display = "block"; // Muestra el modal
    document.getElementsByClassName("modal-content")[0].classList.add("scale"); // Añade animación de escala
  }
  
  // Función para llenar el modal con los datos del proyecto seleccionado.
  function fillOut(id, img){
    document.getElementById("title").innerHTML = modalInfo[id].title; // Establece el título
    document.getElementById("info").innerHTML = modalInfo[id].info; // Establece la información
    document.getElementById("img").src = img; // Establece la imagen
    // Configura el enlace "Ver en vivo"
    document.getElementById("live").onclick = function(){
      window.open(modalInfo[id].link,'_blank');
    }
    // Configura el enlace de GitHub
    document.getElementById("github").onclick = function(){
      window.open(modalInfo[id].github,'_blank');
    }
  }
  
  // Función para cerrar el modal. Esto oculta el modal al hacer clic en el botón de cierre.
  span.onclick = function() {
      modal.style.display = "none";
  }
  
  // Función para cerrar el modal al hacer clic fuera de él.
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  