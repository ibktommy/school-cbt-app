import { testData } from "./data.js";

// Get HTML tags
let form = document.querySelector("form")
let username = document.querySelector('#name')
let formBtn = document.querySelector('.form-btn')
let testBody = document.querySelector('.test-body')
let welcomeNote = document.querySelector('.welcome')
let minutesTag = document.querySelector('.time-minutes')
let secondsTag = document.querySelector('.time-seconds')

let timer;
let minutes = 4;
let seconds = 59;

let subjects = document.querySelectorAll('.subject')

let optionsBox = document.querySelectorAll(".option-box");


// Event Listener on the Options Box
for (let i = 0; i < optionsBox.length; i++) {
	optionsBox[i].addEventListener("click", () => {
		for (let j = 0; j < optionsBox.length; j++) {
			optionsBox[j].style.backgroundColor = "#fff";
			optionsBox[i].style.backgroundColor = "#000";
		}
	});
}

// Event Listener on the Subject Clicked
for (let i = 0; i < subjects.length; i++) {
  subjects[i].addEventListener('click', () => {
    for(let j = 0; j < subjects.length; j++) {
      subjects[j].classList.remove('clicked')
      subjects[i].classList.add('clicked')
    }
  })
}

// Display Question Function
// function displayQuestions () {

// }


// Event Listener on the Form Button
formBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let usernameValue = username.value

  if (usernameValue === undefined || usernameValue === "") {
    alert("Please Enter Your Username!")
  } else {
    username.value = "";
  }

  form.classList.add('hidden');
  testBody.classList.remove('hidden');
  welcomeNote.textContent = `Hello there, ${usernameValue}. Welcome to Computer Based Test App`;
  timer = setInterval(startTimer, 1000)

});


// Start Timer Function
function startTimer () {
  seconds = seconds - 1;

  if (seconds <= 9) {
    secondsTag.innerHTML = "0" + seconds;
  }

  if (seconds > 9) {
    secondsTag.innerHTML = seconds;
  }

  if (seconds === 0 && minutes >= 1) {
    minutes = minutes - 1;
    minutesTag.innerHTML = "0" + minutes;
    seconds = 59;
  } else {
    if (seconds === 0) {
      clearTimer = clearInterval(timer);
    }
  }
}





