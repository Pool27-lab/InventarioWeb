async function cargarProductos(){


    const token = localStorage.getItem("token");


    const respuesta = await fetch(

        "http://localhost:3000/api/productos",

        {

            headers:{

                "Authorization":
                `Bearer ${token}`

            }

        }

    );



    const productos = await respuesta.json();



    let tabla="";



    productos.forEach(producto => {


        tabla += `

        <tr>

            <td>${producto.id_producto}</td>

            <td>${producto.codigo}</td>

            <td>${producto.nombre}</td>

            <td>${producto.precio}</td>

            <td>${producto.stock}</td>

            <td>${producto.id_categoria}</td>


            <td>


            <button 
            class="btn btn-warning btn-sm"
            onclick="editarProducto(${producto.id_producto})">

            Editar

            </button>


            <button 
            class="btn btn-danger btn-sm"
            onclick="eliminarProducto(${producto.id_producto})">

            Eliminar

            </button>


            </td>


        </tr>

        `;


    });



    document.getElementById("tablaProductos")
    .innerHTML = tabla;


}

async function guardarProducto(){


const token = localStorage.getItem("token");


const producto={


codigo:
document.getElementById("codigo").value,


nombre:
document.getElementById("nombre").value,


descripcion:
document.getElementById("descripcion").value,


precio:
document.getElementById("precio").value,


stock:
document.getElementById("stock").value,


stock_minimo:
document.getElementById("stock_minimo").value,


id_categoria:
document.getElementById("id_categoria").value


};



const respuesta = await fetch(

"http://localhost:3000/api/productos",

{


method:"POST",


headers:{


"Content-Type":"application/json",


"Authorization":
`Bearer ${token}`


},


body:JSON.stringify(producto)


}


);



const data = await respuesta.json();



alert(data.mensaje);



cargarProductos();



}

async function eliminarProducto(id_producto){


    const confirmar = confirm(
        "¿Desea eliminar este producto?"
    );


    if(!confirmar){
        return;
    }



    const token = localStorage.getItem("token");



    const respuesta = await fetch(

        `http://localhost:3000/api/productos/${id_producto}`,

        {

            method:"DELETE",

            headers:{

                "Authorization":
                `Bearer ${token}`

            }

        }

    );



    const data = await respuesta.json();



    alert(data.mensaje);



    cargarProductos();


}
async function editarProducto(id_producto){


    const nuevoPrecio = prompt(
        "Ingrese nuevo precio:"
    );


    const nuevoStock = prompt(
        "Ingrese nuevo stock:"
    );


    if(!nuevoPrecio || !nuevoStock){

        return;

    }



    const token = localStorage.getItem("token");



    const respuesta = await fetch(

        `http://localhost:3000/api/productos/${id_producto}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json",

                "Authorization":
                `Bearer ${token}`

            },


            body:JSON.stringify({

                precio:nuevoPrecio,

                stock:nuevoStock

            })

        }

    );



    const data = await respuesta.json();



    alert(data.mensaje);



    cargarProductos();


}

cargarProductos();