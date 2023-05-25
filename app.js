import { quizData } from "./data.js";

// Get HTML tags
let form = document.querySelector("form");
let username = document.querySelector("#name");
let formBtn = document.querySelector(".form-btn");
let testBody = document.querySelector(".test-body");
let welcomeNote = document.querySelector(".welcome");
let minutesTag = document.querySelector(".time-minutes");
let secondsTag = document.querySelector(".time-seconds");

let timer;
let clearTimer;
let minutes = 4;
let seconds = 59;

let subjectsTabContainer = document.querySelector(".subjects-tab-container");

// Event Listener on the Form Button
formBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let usernameValue = username.value.trim();

	if (usernameValue === undefined || usernameValue === "") {
		alert("Please Enter Your Username!");
		return;
	}
	usernameValue = "";
	form.classList.add("hidden");

	testBody.classList.remove("hidden");
	welcomeNote.innerHTML = `Hello there, <b>${usernameValue}</b>.<br> Welcome to Computer Based Test App`;
	timer = setInterval(startTimer, 1000);

	fetchSubjectsTabTitle();
});

// Start Timer Function
function startTimer() {
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
		seconds = 60;
	} else {
		if (seconds === 0) {
			clearTimer = clearInterval(timer);
		}
	}
}

//Fetch subjects Title from Data file
function fetchSubjectsTabTitle() {
	quizData.forEach((quizObject) => {
		// console.log(quizObject.subject);
		let subjectTitle = quizObject.subject;

		subjectsTabContainer.innerHTML += `<button>${subjectTitle}</button>`;
	});

	//Select the subjects Titles and add a class to the first item in the Array
	let subjectsTitles = document.querySelectorAll(
		".subjects-tab-container button",
	);
	subjectsTitles[0].classList.add("clicked");

	//Add Click event to a subject-title clicked to add class to it and remove from others
	for (let i = 0; i < subjectsTitles.length; i++) {
		subjectsTitles[i].addEventListener("click", () => {
			for (let j = 0; j < subjectsTitles.length; j++) {
				subjectsTitles[j].classList.remove("clicked");
				subjectsTitles[i].classList.add("clicked");
			}
		});
	}
}
