async function registerUser() {
    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value;
    const confirmarPassword = document.getElementById("confirmarPassword").value;

    const mensajeEl = document.getElementById("mensaje");
    mensajeEl.innerHTML = "";

    if (!nombre || !usuario || !password || !confirmarPassword) {
        mensajeEl.innerHTML = "Todos los campos son obligatorios";
        return;
    }

    if (password !== confirmarPassword) {
        mensajeEl.innerHTML = "Las contraseñas no coinciden";
        return;
    }

    const respuesta = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, usuario, password, confirmarPassword })
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
        mensajeEl.innerHTML = data.mensaje;
        mensajeEl.classList.remove("text-danger");
        mensajeEl.classList.add("text-success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    } else {
        mensajeEl.innerHTML = data.mensaje || "Error al registrar usuario";
        mensajeEl.classList.remove("text-success");
        mensajeEl.classList.add("text-danger");
    }
}
