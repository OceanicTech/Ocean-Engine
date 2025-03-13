let selectedObject = null;
let objects = [];

// Función para crear un nuevo objeto en el canvas
function createObject(x, y) {
    let newObject = {
        x: x,
        y: y,
        width: 50,
        height: 50,
        color: 'white'
    };
    objects.push(newObject);
    drawObjects();
}

// Función para dibujar todos los objetos en el canvas
function drawObjects() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach(obj => {
        context.fillStyle = obj.color;
        context.fillRect(obj.x, obj.y, obj.width, obj.height);
    });
}

// Lógica de movimiento del menú flotante
const menuFloat = document.getElementById('menu_float');
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

menuFloat.addEventListener('mousedown', function(e) {
    if (e.target === menuFloat) {
        isDragging = true;
        dragOffsetX = e.clientX - menuFloat.offsetLeft;
        dragOffsetY = e.clientY - menuFloat.offsetTop;
    }
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        menuFloat.style.left = (e.clientX - dragOffsetX) + 'px';
        menuFloat.style.top = (e.clientY - dragOffsetY) + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

// Funcionalidad para crear un nuevo objeto desde el menú flotante
const createButton = document.createElement('button');
createButton.innerText = 'Crear Objeto';
createButton.onclick = function() {
    createObject(100, 100);
};
menuFloat.appendChild(createButton);

// Funcionalidad para cambiar color del objeto seleccionado
const colorInput = document.createElement('input');
colorInput.type = 'color';
colorInput.oninput = function(e) {
    if (selectedObject) {
        selectedObject.color = e.target.value;
        drawObjects();
    }
};
menuFloat.appendChild(colorInput);

// Funcionalidad para cambiar tamaño del objeto seleccionado
const sizeInput = document.createElement('input');
sizeInput.type = 'range';
sizeInput.min = 10;
sizeInput.max = 200;
sizeInput.oninput = function(e) {
    if (selectedObject) {
        let newSize = parseInt(e.target.value, 10);
        selectedObject.width = newSize;
        selectedObject.height = newSize;
        drawObjects();
    }
};
menuFloat.appendChild(sizeInput);

// Evento para seleccionar y mover objeto
const canvas = document.getElementById('canvas');
canvas.addEventListener('mousedown', function(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    selectedObject = objects.find(obj =>
        mouseX >= obj.x && mouseX <= obj.x + obj.width &&
        mouseY >= obj.y && mouseY <= obj.y + obj.height
    );

    if (selectedObject) {
        const offsetX = mouseX - selectedObject.x;
        const offsetY = mouseY - selectedObject.y;

        function moveObject(e) {
            let newX = e.clientX - rect.left - offsetX;
            let newY = e.clientY - rect.top - offsetY;

            // Asegurar que el objeto no salga del canvas
            newX = Math.max(0, Math.min(newX, canvas.width - selectedObject.width));
            newY = Math.max(0, Math.min(newY, canvas.height - selectedObject.height));

            selectedObject.x = newX;
            selectedObject.y = newY;
            drawObjects();
        }

        function stopMove() {
            canvas.removeEventListener('mousemove', moveObject);
            canvas.removeEventListener('mouseup', stopMove);
        }

        canvas.addEventListener('mousemove', moveObject);
        canvas.addEventListener('mouseup', stopMove);
    }
});