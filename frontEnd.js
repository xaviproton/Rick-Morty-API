// Codigo para que se marque en el menu la pagina actual(con el click o el onclick no me salia
//entonces pense en hacer una comparacion de datos y el unico dato que contiene cada elemento del
//menu es un enlace, asi que hice lo que veniamos haciendo en ejrecicios anteriorers pero con los enlaces de cada elemento del menu )

window.addEventListener("DOMContentLoaded", function () {
  let links = document.querySelectorAll("nav ul li a");
  let paginaActual = window.location.pathname;

  for (let i = 0; i < links.length; i++) {
    let enlacePath = links[i].pathname;

    // Comparar el pathname del enlace con el pathname actual
    if (enlacePath === paginaActual) {
      links[i].classList.add("active");
    }
  }
});

/**window es un objeto global en JavaScript que representa la ventana del navegador. 
  -location es una propiedad de window que proporciona información sobre la URL actual de la página.
  -La propiedad "pathname" de location devuelve   la ruta de la URL de la página actual.
  -Entonces, al usar "window.location.pathname", obtengo la URL de la página actual y
    almacenándola en la variable "paginaActual".
  -Utilizo  "window.addEventListener('DOMContentLoaded', function() )"  para que el codigo se ejecute 
    después de que el DOM se haya cargado completamente.
  - "document.querySelectorAll('nav ul li a')" sirve para obtener todos los enlaces dentro 
    del menú de navegación y los guardo en la variable "links"
  -En cada iteración, obtengo la ruta del enlace actual con "links[i].pathname" y 
    la guardamos en la variable "linkPath."

  -Hacem,os una comparacion del linkPath con "paginaActual". Si son iguales, significa que el enlace corresponde 
    a la página actual.
  -Si hay una coincidencia, agrega la clase "active" al enlace utilizando "links[i].classList.add('active')"
    */

//Barra de busqueda_________________________________________________________________________________________________

let formulario = document.querySelector("form");

formulario?.addEventListener("submit", function (event) {
  event.preventDefault(); /**Con esta linea, se evita el envío del formulario por defecto y
   de esta forma anulamos el comportamiento prpedeterminado y asi controlar nosotros el eventos*/

  // obtener el valor del campo de búsqueda
  let inputBusqueda = document.getElementById("search-input");
  let busqueda = inputBusqueda.value.trim(); //"trim() es pra recortar los espacios al final y principio de la barra de busqueda"

  // Verificar si se ingresó un nombre  de personaje de búsqueda válido
  if (busqueda === "") {
    alert("Por favor, ingresa un nombre de personaje válido");
    return;
  }

  // Realizar la búsqueda en la API

  fetch(`https://rickandmortyapi.com/api/character/?name=${busqueda}`)
    .then(function cogerRespuesta(response) {
      if (!response.ok) {
        alert("Error de conexión con la API");
      }
      return response.json();
    })
    .then(function (data) {
      let resultsDiv = document.getElementById("results");

      // Mostrar los resultados de la búsqueda
      if (data.results.length == 0) {
        resultsDiv.innerHTML = "No se encontraron resultados."; //para css div "results" en html, pendiente
      } else {
        document.querySelector(".principal").innerHTML = ""; //con "querySelector (".principal") buscamos al div por la clase con #principal lo invocariomos por la id"
        for (let i = 0; i < data.results.length; i++) {
          let character = data.results[i];
          document.querySelector(".principal").innerHTML += `
          <div class="my-divy">
          <div id="my-divy2">
            <h1>${character.name}</h1>
            <h2>Estado actual:  ${character.status}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p>Especie: ${character.species}</p>
            <p>Lugar de procedencia: ${character.origin.name}</p>
            <p>Residencia actual: ${character.location.name}</p>
            </div>
          </div>`;
        }
      }
    }) //Capturamos el error(si lo hay) y mandamos un mensaje
    .catch((error) => {
      let resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML =
        '<div id="error-message">No hay personajes con ese nombre</div>';
      let errorMessage = document.getElementById("error-message");
      errorMessage.classList.add("show");
      mostrarError("No hay personajes con ese nombre");
    });
});

//Creo un boton para refrescar la pagina una vez ha saltado el mensaje de error
function mostrarBotonRefrescar() {
  let refreshcarButton = document.createElement("button");
  refreshcarButton.textContent = "Vuelve a intentarlo";
  refreshcarButton.addEventListener("click", function () {
    location.reload();
  });
  let errorDiv = document.getElementById("error-message");
  errorDiv.appendChild(refreshcarButton);
}
//Funcion para mostrar el error y esconder la barra de busqewuda cuando se produce el evento
function mostrarError(mensaje) {
  const errorDiv = document.getElementById("error-message");
  const formulario = document.querySelector("form");

  errorDiv.textContent = mensaje;
  errorDiv.style.display = "block";
  formulario.style.display = "none"; // Ocultar el formulario completo
  mostrarBotonRefrescar();
}

// Boton de login

let loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", function () {
  document.getElementById("inicio-sesion").innerHTML = `
      <div id="login-panel" class="login-panel">
      <form id="login-form">
      <label for="username">Nombre de Usuario:</label>
      <input type="text" id="username" name="username" required><br>
    
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>
    
      <button type="submit">Login</button>
    </form>
      </div>
    `;
});

// Codigo del botron de login

let loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "usuario" && password === "contraseña") {
    alert("Inicio de sesión exitoso");
  } else {
    alert("Nombre de usuario o contraseña incorrectos");
  }
});

// Boton de Sign in
let registroButton = document.getElementById("login-button2");

registroButton.addEventListener("click", function () {
  document.getElementById("inicio-sesion").innerHTML = `
    <div id="login-panel" class="login-panel">
    <form id="login-form2">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required><br>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required><br>
    
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" required><br>
    
    <button type="submit">Registrarse</button>
  </form>
    </div>
  `;
});

let loginForm2 = document.getElementById("login-form2");

loginForm2.addEventListener("submit", function (event) {
  event.preventDefault();

  let username = document.getElementById("nombre").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  if (username !== "usuario" && email !== "email") {
    alert("Se ha registrado con éxito");
  } else {
    alert("Ya existe un usuario con esos datos");
  }
});
