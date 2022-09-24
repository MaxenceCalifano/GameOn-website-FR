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
const firstErrorMessage = first.insertAdjacentHTML('afterend', "");

const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locations = document.getElementById('location1');
const termsAndConditions = document.getElementById("checkbox1");

const form = document.querySelector('form')

const inputsArray = [first, last, email, birthdate, quantity, locations, termsAndConditions]

first.addEventListener('blur', () => testUserInput(first, "Veuillez entrer 2 caractères ou plus pour le champ du prénom"))
last.addEventListener('blur', () => testUserInput(last, "Veuillez entrer 2 caractères ou plus pour le champ du nom"))
email.addEventListener('blur', () => testUserInput(email, "Veuillez entrer une adresse email valide"))
birthdate.addEventListener('blur', () => testUserInput(birthdate, "Vous devez entrer votre date de naissance."))
quantity.addEventListener('blur', () => testUserInput(quantity, "Veuillez indiquer le nombre de tournoi auquel vous avez déjà participé"))
//locations.addEventListener('blur', () => testUserInput(locations, "Vous devez choisir une option."))
//termsAndConditions.addEventListener('blur', () => testUserInput(termsAndConditions, "Vous devez vérifier que vous acceptez les termes et conditions."))



const testUserInput = (element, errorMessage) => {
  if(!element.checkValidity()) {
    element.insertAdjacentHTML('afterend', errorMessage)
  } else {
    element.nextElementSibling.remove()

  }
}

// verifiy before submit
const validate = (e) => {
  for (input of inputsArray) {
    if(!input.checkValidity()) {
      console.log(`${input} est invalide`)
      e.preventDefault();
    } else { console.log(`${input.outerHTML} est valide`)}
  }
  }

  form.addEventListener('submit', (e) => {
   validate(e)
  })