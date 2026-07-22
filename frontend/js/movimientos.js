const API = "https://inventario-backend-k0jz.onrender.com/api/movimientos";



async function cargarMovimientos(){


const token = localStorage.getItem("token");



const respuesta = await fetch(API,{

headers:{

"Authorization":`Bearer ${token}`

}

});



const movimientos = await respuesta.json();



let tabla="";



movimientos.forEach(m=>{


tabla += `

<tr>


<td>
${m.id_movimiento}
</td>


<td>

${m.tipo}

</td>


<td>

${m.producto}

</td>


<td>

${m.cantidad}

</td>


<td>

${new Date(m.fecha).toLocaleString()}

</td>


<td>

${m.observacion}

</td>


</tr>

`;


});



document.getElementById("tablaMovimientos").innerHTML=tabla;



}



cargarMovimientos();
