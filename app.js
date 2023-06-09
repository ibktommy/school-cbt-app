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
let minutes = "0o";
let seconds = 15;

let subjectsTabContainer = document.querySelector(".subjects-tab-container");
let questionContainer = document.querySelector(".question-container");

let questionNumbersContainer = document.querySelector(
	".question-number-container",
);

// Create variables that holds and manages test-scores
let correctScores = 0;
let incorrectScores = 0;
let totalScore = 0;

let overallCorrectScores = 0;
let overallIncorrectScores = 0;
let overallTotalScores = 0;

let submitButton = document.querySelector(".submit-btn");
let submitAlertContainer = document.querySelector(".submit-alert-container");
let yesButton = document.querySelector(".yes-btn");
let noButton = document.querySelector(".no-btn");

let testResultContainer = document.querySelector(".test-result-container");
let resultButton = document.querySelector(".result-btn");

// Create Variables that holds and manages scores for final test-result
let sortedResultData = [];
let resultData = [];
let resultDataObject;

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
	welcomeNote.innerHTML = `Hello there, <b>${usernameValue}</b>.<br> Welcome to Computer Based Test App`;
	username.value = "";

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

			if (minutesTag.textContent === "00" && secondsTag.textContent === "00") {
				// End exam when time is up!
				endTestHandler();
			}
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

	//Add Click event to a subject-title clicked to add class to it and remove from others
	for (let i = 0; i < subjectsTitles.length; i++) {
		subjectsTitles[i].addEventListener("click", () => {
			for (let j = 0; j < subjectsTitles.length; j++) {
				subjectsTitles[j].classList.remove("clicked");
				subjectsTitles[j].classList.add("disabled");
				subjectsTitles[i].classList.add("clicked");
				subjectsTitles[i].classList.remove("disabled");
			}

			// Update the over-all-scores when a subject-title is clicked
			overallCorrectScores += correctScores;
			overallIncorrectScores += incorrectScores;
			overallTotalScores += totalScore;

			// Reset the current-scores when a new subject-title is selected
			totalScore = 0;
			correctScores = 0;
			incorrectScores = 0;

			console.log("OverAllCorrect: ", overallCorrectScores);
			console.log("overallIncorrectScores: ", overallIncorrectScores);
			console.log("overallTotalScores: ", overallTotalScores);

			// Calling the Timer function after user selects a subjectTitle for the first time
			subjectsTitles[i].parentElement.classList.add("selected");

			if (
				subjectsTitles[i].parentElement.classList.contains("selected") &&
				overallTotalScores === 0
			) {
				timer = setInterval(startTimer, 1000);
				submitButton.classList.add("active");
			}

			// Pushing the last updated item in the resultData-Array to the sortedResultData-Array when a new subject is selected
			if (resultData.length !== 0 && resultDataObject !== undefined) {
				sortedResultData.push(resultData[resultData.length - 1]);
			}

			resultDataObject = undefined;
			resultData = [];

			console.log(resultDataObject);
			console.log(resultData);
			console.log(sortedResultData);
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
		});
	});
}

function fetchSubjectsQuestion(subjectIndex) {
	let subjectQuestionData = quizData[subjectIndex].questions;

	questionContainer.innerHTML = "";

	subjectQuestionData.forEach((questionData) => {
		const { id, question, optionA, optionB, optionC, optionD } = questionData;

		let questionContentHTML = document.createElement("div");
		questionContentHTML.classList.add("question-content");
		questionContentHTML.classList.add("hidden");
		// questionContentHTML.classList.add(`${subjectQuestionTitle}`);

		questionContentHTML.innerHTML = `
			<article class="question">
				<div class='question-details'>
					<p>Q. [${id}]</p>
					<p>${question}</p>
				</div>

				<div class="question-options">
					<div class='question-options-details'>
						<span class='checkbox'></span>
						<span>${optionA}</span>
					</div>
					<div class='question-options-details'>
						<span class='checkbox'></span>
						<span>${optionB}</span>
					</div>
					<div class='question-options-details'>
						<span class='checkbox'></span>
						<span>${optionC}</span>
					</div>
					<div class='question-options-details'>
						<span class='checkbox'></span>
						<span>${optionD}</span>
					</div>
				</div>
      </article>
		`;

		questionContainer.append(questionContentHTML);
	});
}

function fetchQuestionNumbers(subjectIndex) {
	let subjectQuestionData = quizData[subjectIndex].questions;

	//Clear the innerHTML when the function is called
	questionNumbersContainer.innerHTML = "";

	// Get the number of each questions and create an HTML elements for it
	subjectQuestionData.forEach((eachQuestionData) => {
		const { id } = eachQuestionData;

		let questionsNumberHTML = document.createElement("p");
		questionsNumberHTML.classList.add("question-number");
		questionsNumberHTML.innerHTML = `${id}`;

		questionNumbersContainer.append(questionsNumberHTML);
	});

	// Selecting the Question Number created and the Question-content so as to  iterate over them
	let questionNumbers = document.querySelectorAll(".question-number");
	let questionContent = document.querySelectorAll(".question-content");

	// questionNumbers[0].classList.add("clicked");
	// questionContent[0].classList.remove("hidden");

	// Adding event Listeners to each Question-Number clicked
	for (let i = 0; i < questionNumbers.length; i++) {
		questionNumbers[i].addEventListener("click", () => {
			let questionOptions = Array.from(
				questionContent[i].firstElementChild.lastElementChild.children,
			);

			// Adding event Listener to the options under each Question Content
			for (let i = 0; i < questionOptions.length; i++) {
				questionOptions[i].addEventListener("click", () => {
					for (let j = 0; j < questionOptions.length; j++) {
						questionOptions[j].classList.remove("clicked");
						questionOptions[i].classList.add("clicked");
					}
				});
			}

			// Adding a class to each question-number such that the question-content for the question-number is displayed and others are hidden
			for (let j = 0; j < questionNumbers.length; j++) {
				questionNumbers[j].classList.remove("clicked");
				questionNumbers[i].classList.add("clicked");

				questionContent[j].classList.add("hidden");
				questionContent[i].classList.remove("hidden");
			}

			// Get the Question-option-Details of each question-content displayed
			let questionOptionsDetails = Array.from(
				questionContent[i].firstElementChild.lastElementChild.children,
			);

			// Function that performs operations on the option selected as the user selects an option
			optionsSelectionHandler(
				questionOptionsDetails,
				subjectQuestionData,
				i,
				subjectIndex,
			);
		});
	}
}

function optionsSelectionHandler(
	questionOptionsDetails,
	subjectQuestionData,
	iterationNumber,
	subjectIndex,
) {
	questionOptionsDetails.forEach((selectedOption) => {
		selectedOption.addEventListener("click", () => {
			let selectedOptionElement = selectedOption.lastElementChild;
			let selectedOptionText = selectedOption.lastElementChild.textContent;
			const { correctAnswer } = subjectQuestionData[iterationNumber];
			totalScore = correctScores + incorrectScores;

			// When User Clicks the Correct Answer in the first instance
			if (
				selectedOptionText === correctAnswer &&
				selectedOptionElement.classList.contains("correct") !== true &&
				selectedOption.parentElement.classList.contains("selected-right") !==
					true
			) {
				selectedOption.parentElement.classList.add("selected-right");
				selectedOptionElement.classList.add("correct");

				// Add incorrect-className to all incorrect-options and add correct-className to the correct-option
				let allOptions = Array.from(selectedOption.parentElement.children);
				allOptions.forEach((optionItem) => {
					if (
						optionItem.lastElementChild.classList.contains("correct") !== true
					) {
						optionItem.lastElementChild.classList.add("incorrect");
					}
				});
				correctScores += 1;
				incorrectScores = incorrectScores;
				totalScore = correctScores + incorrectScores;
			}

			// When User Selects the Correct Answer after having clicked it in the first instance
			if (
				selectedOptionText === correctAnswer &&
				selectedOptionElement.classList.contains("correct") === true
			) {
				correctScores = correctScores;
				totalScore = correctScores + incorrectScores;
			}

			// When User Selects the Incorrect Answer after having clicked the correct answer in the first instance
			if (
				selectedOption.parentElement.classList.contains("selected-right") ===
					true &&
				selectedOptionElement.classList.contains("incorrect") === true &&
				selectedOptionText !== correctAnswer
			) {
				selectedOption.parentElement.classList.remove("selected-right");
				selectedOption.parentElement.classList.add("reselect");

				// Remove correct-className and incorrect-className from the options under a question
				let allOptions = Array.from(selectedOption.parentElement.children);
				allOptions.forEach((optionItem) => {
					optionItem.lastElementChild.classList.remove("correct", "incorrect");
				});
				correctScores -= 1;
				incorrectScores += 1;
				totalScore = correctScores + incorrectScores;
			}

			// When User Selects the Correct Answer after having clicked the correct answer in the first instance and then clicked the Incorrect Answer('s)
			if (
				selectedOption.parentElement.classList.contains("reselect") === true &&
				selectedOptionText === correctAnswer &&
				selectedOptionElement.classList.contains("correct") === true
			) {
				// console.log('Works')
				selectedOption.parentElement.classList.add("selected-right");
				selectedOption.parentElement.classList.remove("reselect");
				selectedOptionElement.classList.add("correct");

				// Add incorrect-className to the options that have incorrect-answers
				let allOptions = Array.from(selectedOption.parentElement.children);
				allOptions.forEach((optionItem) => {
					if (optionItem.lastElementChild.classList.contains("correct")) {
						optionItem.lastElementChild.classList.add("incorrect");
					}
				});
				correctScores = correctScores;
				incorrectScores -= 1;
				totalScore = correctScores + incorrectScores;
			}

			// When User Clicks the Incorrect Answer in the first instance
			if (
				selectedOptionText !== correctAnswer &&
				selectedOption.parentElement.classList.contains("reselect") === false
			) {
				selectedOption.parentElement.classList.add("selected-wrong");
				selectedOptionElement.classList.add("incorrect");

				// Add incorrect-className to all incorrect-options and add correct-className to the correct-option
				let allOptions = Array.from(selectedOption.parentElement.children);
				allOptions.forEach((optionItem) => {
					if (optionItem.lastElementChild.textContent !== correctAnswer) {
						optionItem.lastElementChild.classList.add("incorrect");
					} else {
						optionItem.lastElementChild.classList.add("correct");
					}
				});
				incorrectScores += 1;
				correctScores = correctScores;
				totalScore = incorrectScores + correctScores;
			}

			// When User Selects the Incorrect Answer again after the having clicked it in the first instance
			if (
				selectedOptionText !== correctAnswer &&
				selectedOptionElement.classList.contains("incorrect") === true &&
				selectedOption.parentElement.classList.contains("selected-wrong") ===
					true
			) {
				selectedOption.parentElement.classList.add("reselect");
				incorrectScores = incorrectScores;
				totalScore = correctScores + incorrectScores;
			}

			// When User Selects the Correct Answer having Selected the Incorrect Answer in the first instance
			if (
				selectedOption.parentElement.classList.contains("selected-wrong") ===
					true &&
				selectedOptionText === correctAnswer
			) {
				console.log("Clicked Correct Now");
				selectedOption.parentElement.classList.remove("selected-wrong");
				correctScores += 1;
				totalScore = correctScores + incorrectScores;
			}

			console.log("TotalScore:", totalScore);
			console.log("CorrectScores:", correctScores);
			console.log("IncorrectScores:", incorrectScores);

			let subjectTitle = quizData[subjectIndex].subject;

			resultDataObject = {
				id: subjectIndex,
				subjectTitle: subjectTitle,
				totalScore: totalScore,
				correctScores: correctScores,
				incorrectScores: incorrectScores,
				totalQuestionNumber: subjectQuestionData.length,
			};

			console.log(resultDataObject);
			resultData.push(resultDataObject);

			console.log("overallTotalScores: ", overallTotalScores);
			console.log("OverAllCorrect: ", overallCorrectScores);
			console.log("overallIncorrectScores: ", overallIncorrectScores);
			// Function that monitors the the number of questioned answered by user
			changeSubjectTab(subjectQuestionData);
		});
	});
}

function changeSubjectTab(subjectQuestionData) {
	if (totalScore === subjectQuestionData.length) {
		console.log(totalScore);

		let subjectsTitlesTab = document.querySelectorAll(
			".subjects-tab-container button",
		);

		subjectsTitlesTab.forEach((eachTitlesTab) => {
			if (eachTitlesTab.classList.contains("clicked") === true) {
				eachTitlesTab.classList.add("disabled", "selected");
			} else {
				eachTitlesTab.classList.remove("disabled");
			}
			if (eachTitlesTab.classList.contains("selected") === true) {
				eachTitlesTab.classList.add("disabled");
			}
		});
	}
}

// Event for when submit-button is clicked
submitButton.addEventListener("click", () => {
	submitAlertContainer.classList.remove("display");
	clearTimer = clearInterval(timer);
});

// Event for when submit-alert-buttons are clicked
noButton.addEventListener("click", () => {
	submitAlertContainer.classList.add("display");
	timer = setInterval(startTimer, 1000);
});

function getTotalResultData(
	resultDataObject,
	resultData,
	sortedResultData,
	quizData,
) {
	// When user ends exam without selecting answering any questions
	if (
		sortedResultData.length === 0 &&
		resultData.length === 0 &&
		resultDataObject === undefined
	) {
		sortedResultData.push(0);
	}

	// Condition that updates sortedResultData when user ends exam after treating the last subject
	if (
		sortedResultData.length === quizData.length - 1 &&
		resultData.length !== 0 &&
		resultDataObject !== undefined
	) {
		sortedResultData.push(resultData[resultData.length - 1]);
		return; //The code below will not work when this condition is met cos of 'return'
	}

	// Condition that runs when user has not reached the last subject and pushes the recent result-data-object into the sorted-result-array when user submits
	if (
		sortedResultData.length !== quizData.length - 1 &&
		resultData.length !== 0 &&
		resultDataObject !== undefined
	) {
		sortedResultData.push(resultData[resultData.length - 1]);
	}

	console.log(resultData);
	console.log(resultData[resultData.length - 1]);
	console.log(sortedResultData);
}

function displayTestResult(sortedResultData) {
	let username = document.querySelector(".test-body h1 b").textContent;
	let usernameHTML = document.querySelector(".test-result-welcome");

	usernameHTML.innerHTML = `<b>${username}</b>, here are the final result of the exam`;

	// console.log(username)
	let resultDetails = document.querySelector(".result");

	let cumulativeCorrectScores = 0;
	let cumulativeQuestionNumbers = 0;

	sortedResultData.forEach((eachResultItem) => {
		const { subjectTitle, correctScores, totalQuestionNumber } = eachResultItem;

		let resultContentHTML = document.createElement("article");
		resultContentHTML.classList.add("result-content");

		resultContentHTML.innerHTML = `
          <h5>${subjectTitle}</h5>
          <p>
						You scored: <b>${correctScores}/${totalQuestionNumber}</b>
					</p>
          <p>${((correctScores / totalQuestionNumber) * 100).toFixed(1)}%</p>
		`;

		resultDetails.append(resultContentHTML);

		// Update cumulativeCorrectScores and cumulativeQuestionNumbers as with each correctScores and totalQuestionNumber
		cumulativeCorrectScores = cumulativeCorrectScores + correctScores;
		cumulativeQuestionNumbers = cumulativeQuestionNumbers + totalQuestionNumber;
	});

	// Add cumulativeCorrectScores and cumulativeQuestionNumbers to the webpage HTML
	let totalNumHTML = document.querySelector(".total-num");
	let totalPercentageHTML = document.querySelector(".total-percentage");

	totalNumHTML.innerHTML = `${cumulativeCorrectScores}/${cumulativeQuestionNumbers}`;
	totalPercentageHTML.innerHTML = `${(
		(cumulativeCorrectScores / cumulativeQuestionNumbers) *
		100
	).toFixed(1)}%`;
}

// Event Listener for when user ends the test
yesButton.addEventListener("click", () => {
	submitAlertContainer.classList.add("display");
	endTestHandler();
});

function endTestHandler() {
	testResultContainer.classList.remove("display");

	getTotalResultData(resultDataObject, resultData, sortedResultData, quizData);

	if (sortedResultData[0] === 0) {
		console.log("Empty");

		let testResultContent = document.querySelector(".test-result");

		testResultContent.classList.add("special-styles");
		let username = document.querySelector(".test-body h1 b").textContent;

		testResultContent.innerHTML = "";

		testResultContent.innerHTML = `
				<h1>
					Dear <b>${username}</b>, you submitted without answering any questions, therefore your test score is "0".
				</h1>
				<p>Thank You!</p>
				<button class="result-btn">Go back to Login</button>
			`;

		let resultButton = document.querySelector(".test-result .result-btn");

		resultButton.addEventListener("click", () => {
			window.location.reload();
		});
	} else {
		displayTestResult(sortedResultData);
	}
}

// Event Listener for when the result-button is clicked
resultButton.addEventListener("click", () => {
	window.location.reload();
});










