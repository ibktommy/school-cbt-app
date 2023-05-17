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





