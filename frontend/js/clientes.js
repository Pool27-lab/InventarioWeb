const API = "https://inventario-backend-k0jz.onrender.com/api/clientes";


async function cargarClientes(){


const token = localStorage.getItem("token");


const respuesta = await fetch(API,{
headers:{
"Authorization":`Bearer ${token}`
}
});


const clientes = await respuesta.json();


let tabla="";


clientes.forEach(cliente=>{


tabla += `

<tr>

<td>${cliente.id_cliente}</td>

<td>${cliente.nombre}</td>

<td>${cliente.telefono}</td>

<td>${cliente.direccion}</td>


<td>

<button 
class="btn btn-danger btn-sm"
onclick="eliminarCliente(${cliente.id_cliente})">

Eliminar

</button>

</td>


</tr>

`;

});


document.getElementById("tablaClientes").innerHTML=tabla;


}



function mostrarFormulario(){

document.getElementById("formulario").style.display="block";

}




async function guardarCliente(){


const token = localStorage.getItem("token");


const cliente={

nombre:document.getElementById("nombre").value,

telefono:document.getElementById("telefono").value,

direccion:document.getElementById("direccion").value

};



await fetch(API,{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":`Bearer ${token}`

},

body:JSON.stringify(cliente)

});



alert("Cliente registrado");


cargarClientes();


}




async function eliminarCliente(id){


const token = localStorage.getItem("token");


await fetch(`${API}/${id}`,{

method:"DELETE",

headers:{
"Authorization":`Bearer ${token}`
}

});


alert("Cliente eliminado");


cargarClientes();


}



cargarClientes();
