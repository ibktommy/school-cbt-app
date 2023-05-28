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

let questionNumbersContainer = document.querySelector(
	".question-number-container",
);


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
		let subjectTitle = quizObject.subject;

		subjectsTabContainer.innerHTML += `<button>${subjectTitle}</button>`;
	});

	//Select the subjects Titles and add a class to the first item in the Array
	let subjectsTitles = document.querySelectorAll(
		".subjects-tab-container button",
	);
	// subjectsTitles[0].classList.add("clicked");

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

// Event Listener Function on Each Subject-title that calls fetchSubjectsQuestion function
function subjectTitleQuestions() {
	let subjectTabButtons = document.querySelectorAll(
		".subjects-tab-container button",
	);

	subjectTabButtons.forEach((eachTabButton, index) => {
		// fetchSubjectsQuestion(index - index); // Calls fetchSubjectsQuestion with an initial argument of 0
		// fetchQuestionNumbers(0);
		eachTabButton.addEventListener("click", () => {
			fetchSubjectsQuestion(index);
			fetchQuestionNumbers(index);
			displayOneQuestion();
		});
	});
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

// Event Listener Function for Question-options Checkbox
function optionCheckbox() {
	let questionOptionsDetails = document.querySelector(
		".question-options-details",
	);

	for (let i = 0; i < questionOptionsDetails.length; i++) {
		questionOptionsDetails[i].addEventListener("click", () => {
			for (let j = 0; j < questionOptionsDetails.length; j++) {
				questionOptionsDetails[j].classList.remove("clicked");
				questionOptionsDetails[i].classList.add("clicked");
			}
		});
	}
}

// Fetch Questions Numbers
function fetchQuestionNumbers(subject) {
	questionNumbersContainer.innerHTML = "";
	let subjectQuestionsNumber = quizData[subject].questions;

	subjectQuestionsNumber.forEach((question) => {
		let questionNumber = question.id;
		let questionNumberHTML = document.createElement("p");
		questionNumberHTML.innerHTML = `${questionNumber}`;
		questionNumbersContainer.append(questionNumberHTML);
	});

	// Event Listener on each question Number Button
	let questionNumbers = document.querySelectorAll(
		".question-number-container p",
	);

	questionNumbers[0].classList.add("clicked");

	for (let i = 0; i < questionNumbers.length; i++) {
		questionNumbers[i].addEventListener("click", () => {
			for (let j = 0; j < questionNumbers.length; j++) {
				questionNumbers[j].classList.remove("clicked");
				questionNumbers[i].classList.add("clicked");
			}
		});
	}
}

// Display just one of the Questions
function displayOneQuestion() {
	let questionContents = document.querySelectorAll(".question-content");

	questionContents.forEach((eachQuestionContent) => {
		eachQuestionContent.classList.add("hidden");
	});

	let presentQuestion = 0;

	questionContents[presentQuestion].classList.remove("hidden");

	let questionNumbers = document.querySelectorAll(
		".question-number-container p",
	);

	questionNumbers.forEach((questionNumber, index) => {
		questionNumber.addEventListener("click", () => {
			questionContents.forEach((eachQuestionContent) => {
				eachQuestionContent.classList.add("hidden");
			});
			presentQuestion = index;
			questionContents[presentQuestion].classList.remove("hidden");
			console.log(presentQuestion, index);
		});
	});
}
