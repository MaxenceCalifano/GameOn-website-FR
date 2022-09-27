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
const closeConfirmation = document.querySelector(".validationMessage button");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const validationMessage = document.querySelector(".validationMessage");

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

// close confirmation message and reset style to make form appear
closeConfirmation.addEventListener("click", () => {
  closeModal()

  setTimeout(()=> {
    validationMessage.style.display = "none";
    form.style.display= "block";
  }, 1000)
})


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

first.addEventListener('blur', () => testUserInput(first))
last.addEventListener('blur', () => testUserInput(last))
email.addEventListener('blur', () => testUserInput(email))
birthdate.addEventListener('blur', () => testUserInput(birthdate))
quantity.addEventListener('blur', () => testUserInput(quantity))
locations.parentElement.addEventListener('click', () => testUserInput(locations))
termsAndConditions.addEventListener('click', () => testUserInput(termsAndConditions))



const testUserInput = (element, e) => {
  if(!element.validity.valid) {
    // prevent default only on form validation, not on input blur
    if(e !== undefined) {
      e.preventDefault();
    }
    element.parentElement.dataset.errorVisible = true;
  } else {
    element.parentElement.dataset.errorVisible = false
  }
}

// verifiy before submit
const validate = (e) => {
  for (input of inputsArray) {
    testUserInput(input, e)
  }
  const allInputsAreOk = inputsArray.every( input => input.validity.valid === true )
  if (allInputsAreOk) {
    form.reset()
      validationMessage.style.display = "flex";
      form.style.display= "none";
  }
}

  form.addEventListener('submit', (e) => {
  e.preventDefault();
   validate(e)
  })