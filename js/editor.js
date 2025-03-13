let selectedObject = null;
let objects = [];

// Función para crear un nuevo objeto en el canvas
function createObject(x, y, color = 'red', width = 25, height = 25) {
    let newObject = {
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        isResizing: false,
        isDragging: false
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
let isDraggingMenu = false;
let menuOffsetX = 0;
let menuOffsetY = 0;

menuFloat.addEventListener('mousedown', function(e) {
    isDraggingMenu = true;
    menuOffsetX = e.clientX - menuFloat.offsetLeft;
    menuOffsetY = e.clientY - menuFloat.offsetTop;
});

document.addEventListener('mousemove', function(e) {
    if (isDraggingMenu) {
        menuFloat.style.left = (e.clientX - menuOffsetX) + 'px';
        menuFloat.style.top = (e.clientY - menuOffsetY) + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDraggingMenu = false;
});

// Función para crear un nuevo objeto desde el botón del menú flotante
function CreateObj() {
    const canvas = document.getElementById('canvas');
    const centerX = (canvas.width / 2) - 12.5; // 25px width / 2
    const centerY = (canvas.height / 2) - 12.5; // 25px height / 2
    createObject(centerX, centerY);
}

// Funcionalidad para cambiar color del objeto seleccionado
const colorInput = document.getElementById('colorPicker');
colorInput.oninput = function(e) {
    if (selectedObject) {
        selectedObject.color = e.target.value;
        drawObjects();
    }
};

// Funcionalidad para cambiar tamaño del objeto seleccionado
const sizeInput = document.getElementById('sizeSlider');
sizeInput.oninput = function(e) {
    if (selectedObject) {
        let newSize = parseInt(e.target.value, 10);
        selectedObject.width = newSize;
        selectedObject.height = newSize;
        drawObjects();
    }
};

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

        if (isCornerClicked(mouseX, mouseY, selectedObject)) {
            selectedObject.isResizing = true;
        } else {
            selectedObject.isDragging = true;
        }

        function moveObject(e) {
            if (selectedObject.isDragging) {
                let newX = e.clientX - rect.left - offsetX;
                let newY = e.clientY - rect.top - offsetY;

                // Asegurar que el objeto no salga del canvas
                newX = Math.max(0, Math.min(newX, canvas.width - selectedObject.width));
                newY = Math.max(0, Math.min(newY, canvas.height - selectedObject.height));

                selectedObject.x = newX;
                selectedObject.y = newY;
            } else if (selectedObject.isResizing) {
                let newWidth = e.clientX - rect.left - selectedObject.x;
                let newHeight = e.clientY - rect.top - selectedObject.y;

                // Asegurar que el objeto no salga del canvas
                newWidth = Math.max(10, Math.min(newWidth, canvas.width - selectedObject.x));
                newHeight = Math.max(10, Math.min(newHeight, canvas.height - selectedObject.y));

                selectedObject.width = newWidth;
                selectedObject.height = newHeight;
            }
            drawObjects();
        }

        function stopMove() {
            selectedObject.isDragging = false;
            selectedObject.isResizing = false;
            canvas.removeEventListener('mousemove', moveObject);
            canvas.removeEventListener('mouseup', stopMove);
        }

        canvas.addEventListener('mousemove', moveObject);
        canvas.addEventListener('mouseup', stopMove);
    }
});

function isCornerClicked(mouseX, mouseY, obj) {
    const cornerSize = 10;
    return (
        (mouseX >= obj.x + obj.width - cornerSize && mouseX <= obj.x + obj.width &&
        mouseY >= obj.y + obj.height - cornerSize && mouseY <= obj.y + obj.height)
    );
}cornerSize && mouseY <= obj.y + obj.height)
    );
}