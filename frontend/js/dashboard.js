async function cargarDashboard(){


    const token = localStorage.getItem("token");


    const respuesta = await fetch(
        "https://inventario-backend-k0jz.onrender.com/api/dashboard",
        {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
    );


    const data = await respuesta.json();


    document.getElementById("productos").innerHTML = data.productos;

    document.getElementById("clientes").innerHTML = data.clientes;

    document.getElementById("ventas").innerHTML = data.ventas;

    document.getElementById("stock").innerHTML = data.stock;


}



function cerrarSesion(){

    localStorage.removeItem("token");

    window.location.href="index.html";

}



cargarDashboard();
