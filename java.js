// Lista donde se guardan los contactos
let contactos = [];

// Elementos del HTML
const formulario = document.getElementById("formulario-contacto");
const campoNombre = document.getElementById("nombre");
const campoTelefono = document.getElementById("telefono");
const buscador = document.getElementById("buscador");
const listaContactos = document.getElementById("lista-contactos");
const contador = document.getElementById("contador");
const mensajeVacio = document.getElementById("mensaje-vacio");

// Agregar un contacto
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = campoNombre.value.trim();
    const telefono = campoTelefono.value.trim();

    // Comprobar que los campos no estén vacíos
    if (nombre === "" || telefono === "") {
        alert("Por favor, escribe el nombre y el teléfono.");
        return;
    }

    // Crear el contacto
    const contacto = {
        id: Date.now(),
        nombre: nombre,
        telefono: telefono
    };

    // Guardar el contacto en el arreglo
    contactos.push(contacto);

    // Limpiar los campos
    campoNombre.value = "";
    campoTelefono.value = "";

    mostrarContactos();
    campoNombre.focus();
});

// Mostrar los contactos en la página
function mostrarContactos() {
    listaContactos.innerHTML = "";

    const textoBusqueda = buscador.value.trim().toLowerCase();

    // Filtrar contactos por nombre
    const contactosFiltrados = contactos.filter(function(contacto) {
        return contacto.nombre.toLowerCase().includes(textoBusqueda);
    });

    // Crear los elementos de cada contacto
    contactosFiltrados.forEach(function(contacto) {
        const elemento = document.createElement("li");
        elemento.className = "contacto";

        const datos = document.createElement("div");
        datos.className = "datos-contacto";

        const nombre = document.createElement("p");
        nombre.className = "nombre-contacto";
        nombre.textContent = contacto.nombre;

        const telefono = document.createElement("p");
        telefono.className = "telefono-contacto";
        telefono.textContent = contacto.telefono;

        // Botón para eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.className = "boton-eliminar";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";

        botonEliminar.addEventListener("click", function() {
            eliminarContacto(contacto.id);
        });

        // Agregar los elementos
        datos.appendChild(nombre);
        datos.appendChild(telefono);

        elemento.appendChild(datos);
        elemento.appendChild(botonEliminar);

        listaContactos.appendChild(elemento);
    });

    // Actualizar el contador con el total real
    contador.textContent = contactos.length;

    // Mostrar mensajes según el resultado
    if (contactos.length === 0) {
        mensajeVacio.textContent = "Todavía no agregaste contactos.";
        mensajeVacio.style.display = "block";
    } else if (contactosFiltrados.length === 0) {
        mensajeVacio.textContent = "No se encontraron contactos.";
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";
    }
}

// Eliminar un contacto
function eliminarContacto(id) {
    contactos = contactos.filter(function(contacto) {
        return contacto.id !== id;
    });

    mostrarContactos();
}

// Buscar contactos mientras se escribe
buscador.addEventListener("input", function() {
    mostrarContactos();
});

// Mostrar la página al iniciar
mostrarContactos();