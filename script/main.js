const boton_menu = document.querySelector(".button_menu");
const navbar = document.querySelector(".navbar");
const container_navegation = document.querySelector(".container_navegation");
const body = document.body;

let posActual = 0;
let status_button = true;

/* EVENTOS */

boton_menu.addEventListener("click", function () {
  container_navegation.classList.toggle("active_button_menu");

  if (status_button) {
    body.setAttribute("style", "overflow: hidden;");
    navbar.setAttribute("style", "backdrop-filter: none;");
    status_button = false;
  } else {
    body.setAttribute("style", "overflow: visible;");
    navbar.setAttribute("style", "backdrop-filter:blur(10px)");
    status_button = true;
  }
});

/* Para que desaparezca y aparezca el nav cuando hacemos scroll */

window.addEventListener("scroll", function () {
  if (this.window.scrollY > posActual) {
    // bajando scroll
    navbar.classList.remove("active_navbar");
    navbar.classList.add("desactive_navbar");
  } else {
    // subiendo scroll
    navbar.classList.remove("desactive_navbar");
    navbar.classList.add("active_navbar");
  }
  if (this.window.scrollY === 0) {
    navbar.setAttribute("style", "backdrop-filter:none");
    navbar.classList.add("ocultar_box_shadow");
  } else {
    navbar.removeAttribute("style", "backdrop-filter:blur(10px)");
    navbar.classList.remove("ocultar_box_shadow");
  }
  posActual = this.window.scrollY;
});

/* GET a mi db.. */

const db = "/db.json";
fetch(db)
  .then((response) => response.json())
  .then((data) => showData(data))
  .catch((error) => console.log(error));

const showData = (data) => {
  let container = document.getElementById("container_card");
  let container_proyect = document.querySelector(".container_card_proyect");
  for (let i = 0; i < data.actividades_destacadas.length; i++) {
    let actividad = data.actividades_destacadas[i];
    container.innerHTML += `
            <li key=${data.actividades_destacadas[0]}>
                <div class="card">
                    <img src="${actividad.fs_path}" alt=${actividad.title}>
                    <h4>${actividad.title}</h4>
                </div>
            </li>
        `;
  }

  container_proyect.innerHTML = "";
  data.projects.forEach((project, index) => {
    const oddOrEven = index % 2 === 0 ? "even" : "odd"; // Resto de index/2 = 0 ?
    container_proyect.innerHTML += `
          <div class="container_card_proyect ${oddOrEven}">
            <div class="img_effect_proyect">
                <img src="${project.picture}" alt="${project.title}" title="${
      project.title
    }">
            </div>

            <div class="description_card_proyect">
                <p class="text_proyect_import">Proyectos Destacado</p>
                <h3 class="name_card_proyect">${project.title}</h3>
                <div class="information_card_proyect">
                    <p>${project.description}</p>
                </div>
                <div class="container_languages_programing">
                    <ul>
                        ${project.lenguajes
                          .map((tecnology) => `<li>#${tecnology}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="container_links_proyect">
                    <i class="fa-brands fa-github"></i>
                </div>
            </div>
          </div>
        `;
  });
};

// Botón to-top

window.addEventListener("scroll", function () {
  let btnToTop = document.getElementById("btn-to-top");

  if (window.scrollY > 0) {
    console.log("NO BUTTON");
    btnToTop.style.display = "flex";
  } else {
    btnToTop.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario para validar
    if (validateForm()) {
      // Mostrar mensaje de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "El formulario ha sido enviado correctamente.",
        icon: "success",
      }).then(() => {
        form.submit(); // Enviar el formulario si es válido
      });
    }
  });

  function validateForm() {
    // Obtener los valores de los campos
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const agree = document.getElementById("agree").checked;

    let isValid = true;
    let errorMessage = "";

    // Validar campo Nombre
    if (firstName === "") {
      errorMessage += "El nombre es obligatorio.<br>";
      isValid = false;
    }

    // Validar campo Apellido
    if (lastName === "") {
      errorMessage += "El apellido es obligatorio.<br>";
      isValid = false;
    }

    // Validar campo Email
    if (email === "") {
      errorMessage += "El email es obligatorio.<br>";
      isValid = false;
    } else if (!validateEmail(email)) {
      errorMessage += "El email no es válido.<br>";
      isValid = false;
    }

    // Validar que se haya aceptado las políticas de privacidad
    if (!agree) {
      errorMessage += "Debe aceptar las políticas de privacidad.<br>";
      isValid = false;
    }

    // Mostrar mensaje de error si hay campos inválidos
    if (!isValid) {
      Swal.fire({
        title: "Errores en el formulario",
        html: errorMessage,
        icon: "error",
      });
    }

    return isValid;
  }

  function validateEmail(email) {
    // Expresión regular para validar email
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }
});
// carousel
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const newTransformValue = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${newTransformValue}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Inicializa el carrusel
showSlide(currentIndex);