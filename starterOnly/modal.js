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