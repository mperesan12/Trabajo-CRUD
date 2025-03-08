// Variables globales
// Declaramos una constante 'd' para abreviar 'document'
const d = document;

// Seleccionamos los elementos del DOM y los asignamos a variables
let clienteInput = d.querySelector(".cliente"); // Campo de entrada para el cliente
let productoInput = d.querySelector(".producto"); // Campo de entrada para el producto
let precioInput = d.querySelector(".precio"); // Campo de entrada para el precio
let imagenInput = d.querySelector(".imagen"); // Campo de entrada para la imagen
let observacionInput = d.querySelector(".observacion"); // Campo de entrada para las observaciones
let btnGuardar = d.querySelector(".btn-guardar"); // Botón para guardar el pedido
let tabla = d.querySelector(".table tbody"); // Cuerpo de la tabla donde se mostrarán los pedidos

// Agregamos un evento click al botón de guardar
btnGuardar.addEventListener("click", ()=>{
    // Validamos el formulario y obtenemos los datos
    let datos = validarFormulario();
    // Si los datos son válidos, los guardamos
    if (datos != null){
        guardarDatos(datos);
    }
    // Borramos y mostramos los datos en la tabla
    borrarTabla();
    mostrarDatos();
});

// Función para validar los campos del formulario
function validarFormulario(){
    let datosForm;
    // Verificamos si algún campo está vacío
    if (clienteInput.value == "" || productoInput.value == "" || precioInput.value == "" || imagenInput.value == "" || observacionInput.value == ""){
        alert("Todos los campos del formulario son obligatorios");
        return; // Salimos de la función si hay algún campo vacío
    } else {
        // Si todos los campos están llenos, creamos un objeto con los datos
        datosForm = {
            cliente : clienteInput.value,
            producto : productoInput.value,
            precio : precioInput.value,
            imagen : imagenInput.value,
            observacion : observacionInput.value
        }
    }
    
    console.log(datosForm); // Mostramos los datos en la consola para verificar

    // Limpiamos los campos del formulario
    clienteInput.value = "";
    productoInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    observacionInput.value = "";

    return datosForm; // Devolvemos los datos del formulario
}

// Constante para identificar los pedidos en el localStorage
const listadopedidos = "pedidos";

// Función para guardar los datos en localStorage
function guardarDatos(datos){
    let pedidos = [];

    // Extraemos los datos guardados previamente en el localStorage
    let pedidosprevios = JSON.parse(localStorage.getItem(listadopedidos));
    // Validamos los datos guardados previamente
    if (pedidosprevios != null){
        pedidos = pedidosprevios;
    }
    // Agregamos el nuevo pedido al array
    pedidos.push(datos);

    // Guardamos el array actualizado en el localStorage
    localStorage.setItem(listadopedidos, JSON.stringify(pedidos));
    // Mostramos un mensaje de confirmación
    alert("Datos guardados con éxito 👌");
}

// Función para extraer y mostrar los datos guardados en el localStorage
function mostrarDatos(){
    let pedidos = [];
    // Extraemos los datos guardados previamente
    let pedidosprevios = JSON.parse(localStorage.getItem(listadopedidos));
    // Validamos los datos guardados previamente
    if (pedidosprevios != null){
        pedidos = pedidosprevios;
    }

    // Mostramos los datos en la tabla
    pedidos.forEach((p, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${p.cliente} </td>
            <td> ${p.producto} </td>
            <td> ${p.precio} </td>
            <td> <img src="${p.imagen}" width="20%"> </td>
            <td> ${p.observacion} </td>
            <td>
                <span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning">👨‍🏭</span>
                <span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger">✖️</span>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para borrar los datos de la tabla
function borrarTabla(){
    let filas = d.querySelectorAll(".table tbody tr");
    // Removemos cada fila de la tabla
    filas.forEach((f) => {
        f.remove();
    });
}

// Función para eliminar un pedido
function eliminarPedido(pos){
    let pedidos = [];
    // Extraemos los datos guardados previamente
    let pedidosprevios = JSON.parse(localStorage.getItem(listadopedidos));
    // Validamos los datos guardados previamente
    if (pedidosprevios != null){
        pedidos = pedidosprevios;
    }
    // Confirmamos si el usuario quiere eliminar el pedido
    let confirmar = confirm("¿Deseas eliminar el pedido del cliente " + pedidos[pos].cliente + "?");
    if (confirmar){
        // Eliminamos el pedido del array
        pedidos.splice(pos, 1);
        alert("Pedido eliminado con éxito");
        // Guardamos los datos actualizados en el localStorage
        localStorage.setItem(listadopedidos, JSON.stringify(pedidos));
        // Borramos y mostramos los datos actualizados en la tabla
        borrarTabla();
        mostrarDatos();
    }
}

// Función para actualizar un pedido
function actualizarPedido(pos){
    let pedidos = [];
    // Extraemos los datos guardados previamente
    let pedidosprevios = JSON.parse(localStorage.getItem(listadopedidos));
    // Validamos los datos guardados previamente
    if (pedidosprevios != null){
        pedidos = pedidosprevios;
    }
    // Pasamos los datos del pedido al formulario
    clienteInput.value = pedidos[pos].cliente;
    productoInput.value = pedidos[pos].producto;
    precioInput.value = pedidos[pos].precio;
    observacionInput.value = pedidos[pos].observacion;
    // Seleccionamos el botón de actualizar y lo mostramos
    let btnActualizar = d.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");
    // Agregamos un evento click al botón de actualizar
    btnActualizar.addEventListener("click", function(){
        // Actualizamos los datos del pedido
        pedidos[pos].cliente = clienteInput.value;
        pedidos[pos].producto = productoInput.value;
        pedidos[pos].precio = precioInput.value;
        pedidos[pos].observacion = observacionInput.value;
        // Guardamos los datos actualizados en el localStorage
        localStorage.setItem(listadopedidos, JSON.stringify(pedidos));
        alert("El dato fue actualizado con éxito!!");
        
        // Limpiamos los campos del formulario
        clienteInput.value = "";
        productoInput.value = "";
        precioInput.value = "";
        observacionInput.value = "";
        
        // Ocultamos el botón de actualizar y mostramos el de guardar
        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none");

        // Borramos y mostramos los datos actualizados en la tabla
        borrarTabla();
        mostrarDatos();
    });
}

// Evento que se dispara cuando el DOM se ha cargado completamente
d.addEventListener("DOMContentLoaded", function(){
    borrarTabla();
    mostrarDatos();
});
