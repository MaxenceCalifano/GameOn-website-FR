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
const location1 = document.getElementById('location1');
const locations = document.getElementsByName("location");
const termsAndConditions = document.getElementById("checkbox1");

const form = document.querySelector('form')

// An object containing objects for each inputs of the form
// Check properties : is mutable by the corresponding test function and will be read when the form is submitted
// HTMLElement is used by the validate() function, when the form is submitted and the input is not valid (eg : if the user try to click submit whithout filling inputs)
const inputsCheck = {
  first: {
    checked : false,
    HTMLElement : first
  },
  last: {
    checked : false,
    HTMLElement : last
  },
  email: {
    checked : false,
    HTMLElement : email
  },
  birthdate: {
    checked : false,
    HTMLElement : birthdate
  },
  quantity: {
    checked : false,
    HTMLElement : quantity
  },
  location: {
    checked : false,
    HTMLElement : location1
  },
  termsAndConditions: {
    checked : true,
    HTMLElement : termsAndConditions
  },
}

// Set inputsCheck object to default values
const reset = () => {
  inputsCheck.first.checked = false;
  inputsCheck.last.checked = false;
  inputsCheck.email.checked = false;
  inputsCheck.birthdate.checked = false;
  inputsCheck.quantity.checked = false;
  inputsCheck.location.checked = false;

}

// function receives the input to be tested and a function that test it
const testUserInput = (element, checkInput) => {
  if(!checkInput(element)) {
    element.parentElement.dataset.errorVisible = true;
    inputsCheck[element.name].checked = false
  } else {
    element.parentElement.dataset.errorVisible = false
    inputsCheck[element.name].checked = true
  } 
}


// All the inputs test functions

// remove all potential white space before and after text and check if input is longer than two
const checkLength = (element) => {
  if(element.value.trim().length < 2) {
    return false
  } else {
    return true
  }
}

// check the email
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const checkEmail = email => {
  if(emailRegex.test(email.value)) {
    return true
  } else {
    return false
  }
}

// Check if the user is older than 18 years old
const checkBirthdate = birthdate => {
  const birthdayDate = new Date(birthdate.value)
  
  const diff = Date.now() - birthdayDate.getTime()

  const age = new Date(diff).getUTCFullYear() - 1970

  if(age < 18) {
    birthdate.parentElement.dataset.error = "Vous devez être majeur pour vous inscrire"
    return false
  } else if(isNaN(age)) {
    birthdate.parentElement.dataset.error = "Vous devez entrer votre date de naissance."
    return false
  } else {
    return true
  }
}

// check if the input is not less than zero or empty
const checkQuantity = (quantity) => {
  if(quantity.value < 0 || quantity.value === '') {
    return false
  } else {
    return true
  }
}

// Check if at leat one location is checked
const locationsArray = Array.from(locations);
const checkLocations = () => {
  if(locationsArray.some( e => e.checked === true)) {
    return true
  } else {
    return false
  }
}

// Verify if terms are checked
const checkTerms = (terms) => {
  if(terms.checked) {
    return true
  } else {
    return false
  }
}
// End of the inputs test functions


first.addEventListener('blur', () => testUserInput(first, checkLength))
last.addEventListener('blur', () => testUserInput(last, checkLength))
email.addEventListener('blur', () => testUserInput(email, checkEmail))
birthdate.addEventListener('blur', () => testUserInput(birthdate, checkBirthdate))
quantity.addEventListener('blur', () => testUserInput(quantity, checkQuantity))
location1.parentElement.addEventListener('click', () => testUserInput(location1, checkLocations))
termsAndConditions.addEventListener('click', () => testUserInput(termsAndConditions, checkTerms))



// Verifiy before submit, it will count how many inputs are valid and then compare with the number of input whe have,
// if it less then the form can't be submitted
// if it's equal, then whe submit, reset the object and display the validation message
const validate = () => {
  let countInput = 0;
  for ( input in inputsCheck) {
    if(inputsCheck[input].checked) {
      countInput ++;
    } else {
      inputsCheck[input].HTMLElement.parentElement.dataset.errorVisible = true;
    }
  }
  if(countInput === Object.keys(inputsCheck).length) {
      form.reset()
      reset()
      validationMessage.style.display = "flex";
      form.style.display= "none";
  }
}

// Cath submit from the form, prevent reload of the form and execute validate()
  form.addEventListener('submit', (e) => {
  e.preventDefault();
   validate(e)
  })