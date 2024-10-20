// Función para manejar el envío del formulario
document.getElementById('equipment-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los datos del formulario
    const articleNumber = document.getElementById('article-number').value;
    const equipment = document.getElementById('equipment').value;
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const serial = document.getElementById('serial').value;
    const inventory = document.getElementById('inventory').value;
    const invima = document.getElementById('invima').value;
    const risk = document.getElementById('risk').value;
    const location = document.getElementById('location').value;
    const imageFile = document.getElementById('image').files[0]; // Obtener la imagen seleccionada

    // Validar que se haya seleccionado una imagen
    if (!imageFile) {
        alert("Por favor, selecciona una imagen.");
        return;
    }

    // Leer la imagen como un Data URL (Base64)
    const reader = new FileReader();
    reader.onload = function(event) {
        // Crear un objeto para representar el equipo
        const equipmentData = {
            articleNumber,
            equipment,
            brand,
            model,
            serial,
            inventory,
            invima,
            risk,
            location,
            imageUrl: event.target.result, // Guardar la imagen en Base64
        };

        // Guardar en localStorage
        saveEquipmentToLocalStorage(equipmentData);

        // Limpiar el formulario
        document.getElementById('equipment-form').reset();

        // Mostrar el inventario actualizado
        displayEquipment();
    };
    reader.readAsDataURL(imageFile); // Leer la imagen como Data URL
});

// Función para guardar el equipo en localStorage
function saveEquipmentToLocalStorage(equipmentData) {
    let equipmentList = JSON.parse(localStorage.getItem('equipmentList')) || [];
    equipmentList.push(equipmentData);
    localStorage.setItem('equipmentList', JSON.stringify(equipmentList));
}

// Función para mostrar el inventario
function displayEquipment() {
    const tableBody = document.getElementById('equipment-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de mostrar

    const equipmentList = JSON.parse(localStorage.getItem('equipmentList')) || [];

    equipmentList.forEach((item, index) => { // Agregamos 'index' para identificar el elemento
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.articleNumber;
        row.insertCell(1).textContent = item.equipment;
        row.insertCell(2).textContent = item.brand;
        row.insertCell(3).textContent = item.model;
        row.insertCell(4).textContent = item.serial;
        row.insertCell(5).textContent = item.inventory;
        row.insertCell(6).textContent = item.invima;
        row.insertCell(7).textContent = item.risk;
        row.insertCell(8).textContent = item.location;

        const imgCell = row.insertCell(9);
        const imgElement = document.createElement('img');
        imgElement.src = item.imageUrl; // Ahora utilizará el Data URL almacenado
        imgElement.style.width = '50px'; // Establecer el tamaño de la imagen
        imgCell.appendChild(imgElement);

        // Crear celda para el botón de eliminar
        const actionCell = row.insertCell(10);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            deleteEquipment(index); // Llamar a la función de eliminar
        };
        actionCell.appendChild(deleteButton);
    });
}

// Función para eliminar un equipo
function deleteEquipment(index) {
    let equipmentList = JSON.parse(localStorage.getItem('equipmentList')) || [];
    equipmentList.splice(index, 1); // Eliminar el equipo seleccionado
    localStorage.setItem('equipmentList', JSON.stringify(equipmentList)); // Actualizar localStorage
    displayEquipment(); // Mostrar el inventario actualizado
}

// Al cargar la página, muestra el inventario almacenado
window.onload = displayEquipment;