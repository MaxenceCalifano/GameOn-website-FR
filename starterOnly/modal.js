function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const closeModalBtn = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.setAttribute("closing", "");
  
  modalbg.addEventListener("animationend", () => {
    modalbg.removeAttribute("closing");
    modalbg.style.display= "none";
  }, {once: true})
  
}
// close modal
closeModalBtn.addEventListener("click", closeModal)


// DOM Elements of form
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locations = document.getElementById('location1');
const termsAndConditions = document.getElementById("checkbox1");

const form = document.querySelector('form')

const inputsArray = [first, last, email, birthdate, quantity, locations, termsAndConditions]

// verifiy before submit
const validate = (e) => {
    for (input of inputsArray) {
      if(!input.validity.valid) {
        console.log('oups')
        e.preventDefault();
      }
    }
  }

  form.addEventListener('submit', (e) => {
   // validate(e)
   for (input of inputsArray) {
    if(!input.checkValidity()) {
      console.log(`${input} est invalide`)
      e.preventDefault();
    } else { console.log(`${input.outerHTML} est valide`)}
  }
  })

  //j'ai passer l'événement à validate, ce qui permettra de bloquer l'envoi du formulaire avec prevent default s'il y a une erreur