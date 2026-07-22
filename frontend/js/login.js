async function login(){


    const usuario =
    document.getElementById("usuario").value;


    const password =
    document.getElementById("password").value;



    const respuesta = await fetch(
        "https://inventario-backend-k0jz.onrender.com/api/auth/login",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify({

                usuario,
                password

            })

        }
    );



    const data = await respuesta.json();



    if(respuesta.ok){


        localStorage.setItem(
            "token",
            data.token
        );


        window.location.href =
        "dashboard.html";


    }else{


        document.getElementById("mensaje")
        .innerHTML=data.mensaje;


    }


}
