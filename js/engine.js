window.onload = function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function draw() {
        // Aquí se dibujarán los objetos en el canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'red';
        context.fillRect(50, 50, 100, 100); // Ejemplo de un rectángulo
    }

    function gameLoop() {
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
};

function load() {
    // Función para cargar el juego
}

function start() {
    // Función para iniciar el juego
}

function save() {
    // Función para guardar el juego
}

// Evento para seleccionar objeto
canvas.addEventListener('mousedown', function(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    selectedObject = objects.find(obj =>
        mouseX >= obj.x && mouseX <= obj.x + obj.width &&
        mouseY >= obj.y && mouseY <= obj.y + obj.height
    );
    drawObjects();
});

// Cambiar color del objeto seleccionado
function changeObjectColor(color) {
    if (selectedObject) {
        selectedObject.color = color;
        drawObjects();
    }
}

// Cambiar tamaño del objeto seleccionado
function changeObjectSize(size) {
    if (selectedObject) {
        selectedObject.width = size;
        selectedObject.height = size;
        drawObjects();
    }
}

// Iniciar el juego con un objeto de prueba
function startGame() {
    objects = [];
    createObject(100, 100);
    drawObjects();
}

// Cargar el script Lua cuando inicie el juego
window.onload = function() {
    startGame();
    loadLuaScriptAndRun();
};

// Desmarcar objeto seleccionado
function clearSelection() {
    selectedObject = null;
    drawObjects();
}

// Cambiar color del objeto seleccionado
function changeObjectColor(event) {
    if (selectedObject) {
        selectedObject.color = event.target.value;
        drawObjects();
    }
}

function changeObjectSize(event) {
    if (selectedObject) {
        let newSize = parseInt(event.target.value, 10);
        selectedObject.width = newSize;
        selectedObject.height = newSize;
        drawObjects();
    }
}
});
    }
}

// Iniciar el juego con un objeto de prueba
function startGame() {
    objects = [];
    createObject(100, 100);
    drawObjects();
}Y = e.clientY - rect.top;

  selectedObject = objects.find(obj => mouseX >= obj.x && mouseX <= obj.x + obj.width && mouseY >= obj.y && mouseY <= obj.y + obj.height);

  if (selectedObject) {
    const offsetX = mouseX - selectedObject.x;
    const offsetY = mouseY - selectedObject.y;

    canvas.addEventListener('mousemove', moveObject);

    function moveObject(e) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      selectedObject.x = mouseX - offsetX;
      selectedObject.y = mouseY - offsetY;
      drawObjects();
    }

    canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', moveObject);
    });
  }
});

// Cargar el script Lua cuando inicie el juego
window.onload = function() {
  startGame();
  loadLuaScriptAndRun();
};atón
    });
  }
});

// Desmarcar objeto seleccionado
function clearSelection() {
  selectedObject = null;
  drawObjects();
}

// Cambiar color del objeto seleccionado
function changeObjectColor(event) {
  if (selectedObject) {
    selectedObject.color = event.target.value;
    drawObjects();
  }
}

function changeObjectSize(event) {
    if (selectedObject) {
        let newSize = parseInt(event.target.value, 10);
        selectedObject.width = newSize;
        selectedObject.height = newSize;
        drawObjects();
    }
}

  }
}(selectedObject) {
    const offsetX = mouseX - selectedObject.x;
    const offsetY = mouseY - selectedObject.y;

    canvas.addEventListener('mousemove', moveObject);

    function moveObject(e) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      selectedObject.x = mouseX - offsetX;
      selectedObject.y = mouseY - offsetY;
      drawObjects();
    }

    canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', moveObject);  // Dejar de mover cuando se suelta el ratón
    });
  }
});
