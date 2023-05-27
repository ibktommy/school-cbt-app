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
let questionContainer = document.querySelector(".question-container");

// Event Listener on the Form Button
formBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let usernameValue = username.value.trim();

	if (usernameValue === undefined || usernameValue === "") {
		alert("Please Enter Your Username!");
		return;
	}
	// usernameValue = "";
	form.classList.add("hidden");

	testBody.classList.remove("hidden");
	welcomeNote.innerHTML = `Hello there, <b>${usernameValue}</b>.<br> Welcome to Computer Based Test App`;
	timer = setInterval(startTimer, 1000);

	fetchSubjectsTabTitle();

	subjectTitleQuestions();

	optionCheckbox();
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

// Fetch subjects Title from Data file
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

// Fetch Subjects Question
function fetchSubjectsQuestion(subject) {
	questionContainer.innerHTML = ""; // Resetting the questionContainer each time the function is called

	let subjectQuestions = quizData[subject].questions;

	subjectQuestions.forEach((eachSubjectQuestion) => {
		const { id, question, optionA, optionB, optionC, optionD } =
			eachSubjectQuestion;
		let questionContent = document.createElement("div");
		questionContent.classList.add("question-content");

		questionContent.innerHTML = `
			<article class="question">
					<div class="question-details">
						<p>Q.[${id}]</p>
						<p>${question}</p>
					</div>
					<div class="question-options">
						<div class="question-options-details">
							<span class="checkbox"></span>
							<span>${optionA}</span>
						</div>
						<div class="question-options-details">
							<span class="checkbox"></span>
							<span>${optionB}</span>
						</div>
						<div class="question-options-details">
							<span class="checkbox"></span>
							<span>${optionC}</span>
						</div>
						<div class="question-options-details">
							<span class="checkbox"></span>
							<span>${optionD}</span>
						</div>
					</div>
				</article>
		`;

		questionContainer.append(questionContent);
	});
}

// Event Listener Function on Each Subject-title that calls fetchSubjectsQuestion function
function subjectTitleQuestions() {
	let subjectTabButtons = document.querySelectorAll(
		".subjects-tab-container button",
	);

	subjectTabButtons.forEach((eachTabButton, index) => {
		fetchSubjectsQuestion(index - index); // Calls fetchSubjectsQuestion with an initial argument of 0
		eachTabButton.addEventListener("click", () => {
			fetchSubjectsQuestion(index);
		});
	});
}

// Event Listener Function for Question-options Checkbox
function optionCheckbox() {
	let questionOptionsDetails = document.querySelectorAll(
		".question-options-details",
	);

	// console.log(questionOptionsDetails);
	for (let i = 0; i < questionOptionsDetails.length; i++) {
		questionOptionsDetails[i].addEventListener("click", () => {
			for (let j = 0; j < questionOptionsDetails.length; j++) {
				questionOptionsDetails[j].classList.remove("clicked");
				questionOptionsDetails[i].classList.add("clicked");
			}
		});
	}
}
