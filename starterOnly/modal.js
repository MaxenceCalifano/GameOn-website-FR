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
const locations = document.getElementsByName("location")
const checkbox1 = document.getElementById("checkbox1");

const form = document.querySelector('form')

// REGEX
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

// check string lenght
/* const isShorterThanTwo = (string) => {
    if(string.length < 2) console.log("veuillez remplir ce champ svp")
}

// First and last name
first.addEventListener("blur", () => isShorterThanTwo(first.value))
last.addEventListener("blur", () => isShorterThanTwo(last.value))

// Check email
email.addEventListener("blur", () => {
  if(emailRegex.test(email.value)){
    console.log("ok")

  } else console.log("pas ok")
}) 

// Check contests quantity
quantity.addEventListener('blur', () => {
  quantity.checkValidity() ? checks.quantity = false : ""
})*/


// Every propreties has to be true for the form to be checked
const checks = {
  checkLocations: false,
  termsAndConditions: true
}

// Check if at least one location is selected
const locationsArray = Array.from(locations)
const checksLocations = () => checks.checkLocations = locationsArray.some( e => e.checked === true);

// Check terms ans conditions
//const termsAndConditions = () => checkbox1.checked ? checks.termsAndConditions = true : checks.termsAndConditions = false;

// verifiy before submit
const validate = (e) => {
  checksLocations();

  for (value in checks)
    if(checks[value] === false) {
      e.preventDefault();
      //return console.log('veuillez remplir le champs')
    }
  }

  form.addEventListener('submit', (e) => {
    validate(e)
  })

  //j'ai passer l'événement à validate, ce qui permettra de bloquer l'envoi du formulaire avec prevent default s'il y a une erreur