const API="http://localhost:3000/api";


let carrito=[];



async function cargarDatos(){


const token=localStorage.getItem("token");


// clientes

let res=await fetch(
`${API}/clientes`,
{
headers:{
Authorization:`Bearer ${token}`
}
});


let clientes=await res.json();


let selectCliente=document.getElementById("cliente");


clientes.forEach(c=>{


selectCliente.innerHTML+=`

<option value="${c.id_cliente}">
${c.nombre}
</option>

`;

});




// productos


res=await fetch(
`${API}/productos`,
{
headers:{
Authorization:`Bearer ${token}`
}
});


let productos=await res.json();


let selectProducto=document.getElementById("producto");


productos.forEach(p=>{


selectProducto.innerHTML+=`

<option 
value="${p.id_producto}"
data-precio="${p.precio}">

${p.nombre}

</option>

`;


});



}



function agregarCarrito(){


let select=document.getElementById("producto");


let id=select.value;


let nombre=
select.options[select.selectedIndex].text;


let precio=
select.options[select.selectedIndex]
.dataset.precio;



let cantidad=
document.getElementById("cantidad").value;



let producto={

id_producto:id,

nombre,

precio:Number(precio),

cantidad:Number(cantidad),

subtotal:Number(precio)*Number(cantidad)

};



carrito.push(producto);



mostrarCarrito();



}



function mostrarCarrito(){


let tabla="";

let total=0;


carrito.forEach((p,index)=>{


total+=p.subtotal;


tabla+=`

<tr>

<td>${p.nombre}</td>

<td>${p.cantidad}</td>

<td>${p.precio}</td>

<td>${p.subtotal}</td>


<td>

<button
class="btn btn-danger btn-sm"
onclick="eliminar(${index})">

X

</button>

</td>


</tr>


`;


});



document.getElementById("carrito").innerHTML=tabla;


document.getElementById("total").innerHTML=total;


}




function eliminar(index){


carrito.splice(index,1);


mostrarCarrito();


}





async function registrarVenta(){


const token=
localStorage.getItem("token");



let venta={


id_cliente:
document.getElementById("cliente").value,


productos:carrito


};



let respuesta=
await fetch(
`${API}/ventas`,
{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},


body:JSON.stringify(venta)


});



let data=
await respuesta.json();



alert(
"Venta registrada ID: "
+data.id_venta
);



carrito=[];


mostrarCarrito();


}



cargarDatos();