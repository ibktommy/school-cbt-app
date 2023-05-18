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

let questions = document.querySelector(".questions");
let questionNumber = 0;

//Event Listener on the Subject Clicked
for (let i = 0; i < subjects.length; i++) {
	subjects[i].addEventListener("click", () => {
		for (let j = 0; j < subjects.length; j++) {
			subjects[j].classList.remove("clicked");
			subjects[i].classList.add("clicked");
		}

		let subjectDataTitle = subjects[i].dataset.title;
		displayQuestions(subjectDataTitle);
	});
}

// Function that gets called for theEvent Listener on the Options Box
function runOptionsBoxClick() {
	let optionsBox = document.querySelectorAll(".option-box");
	for (let i = 0; i < optionsBox.length; i++) {
		optionsBox[i].addEventListener("click", () => {
			for (let j = 0; j < optionsBox.length; j++) {
				optionsBox[j].style.backgroundColor = "#fff";
				optionsBox[i].style.backgroundColor = "#000";
			}
		});
	}
}

// Display Question Function
function displayQuestions(subjectInView) {
	testData.forEach((subjectData) => {
		let subjectTitle = subjectData.subject;

		if (subjectInView === subjectTitle) {
			let subjectQuestions = subjectData.questions;

			const { id, question, optionA, optionB, optionC, optionD } =
				subjectQuestions[questionNumber];

			let questionsHTML = `
            <article class="question-type">
              <div class="question-content">
                <p class="question-num">[${id}]</p>
                <p class="question-text">${question}</p>
              </div>

              <div class="question-options">
                <div class="optionA">
                  <div class="option-box"></div>
                  <p class="option-text">${optionA}</p>
                </div>
                <div class="optionB">
                  <div class="option-box"></div>
                  <p class="option-text">${optionB}</p>
                </div>
                <div class="optionC">
                  <div class="option-box"></div>
                  <p class="option-text">${optionC}</p>
                </div>
                <div class="optionD">
                  <div class="option-box"></div>
                  <p class="option-text">${optionD}</p>
                </div>             
              </div>
            </article>
          `;

			questions.innerHTML = questionsHTML;
			questions.classList.remove("hidden");

			runOptionsBoxClick();
		}
	});
}

// Event Listener on the Form Button
formBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let usernameValue = username.value.trim();

	if (usernameValue === undefined || usernameValue === "") {
		alert("Please Enter Your Username!");
		return;
	}

	form.classList.add("hidden");
	testBody.classList.remove("hidden");
	welcomeNote.textContent = `Hello there, ${usernameValue}. Welcome to Computer Based Test App`;
	timer = setInterval(startTimer, 1000);

	usernameValue = "";
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





