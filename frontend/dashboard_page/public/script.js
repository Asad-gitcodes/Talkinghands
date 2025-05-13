// Store the list of ASL signs and their corresponding answers
const signs = [
    { sign: 'A_test.jpg', answer: 'A', hint: 'To perform the letter "A" in ASL, curl your fingers into a fist and keep your thumb resting on the side of your index finger.' },
    { sign: 'B_test.jpg', answer: 'B', hint: 'For "B" in ASL, keep your palm flat and fingers together, with the thumb across the palm.' },
    { sign: 'C_test.jpg', answer: 'C', hint: 'For "C", make a "C" shape with your hand by curving your fingers inward.' },
    { sign: 'D_test.jpg', answer: 'D', hint: 'For the letter "D", extend your index finger and thumb while keeping the other fingers curled in.' },
    { sign: 'E_test.jpg', answer: 'E', hint: 'For "E", curl your fingers toward the palm while keeping the thumb along the side.' },
    { sign: 'F_test.jpg', answer: 'F', hint: 'To make the letter "F", form a circle with the thumb and index finger while keeping the other fingers relaxed.' },
    { sign: 'G_test.jpg', answer: 'G', hint: 'For "G", extend your index finger and thumb to form a small "G" shape, with the other fingers curled in.' },
    { sign: 'H_test.jpg', answer: 'H', hint: 'To make the letter "H", extend your index and middle fingers and keep them together, with the other fingers curled in.' },
    { sign: 'I_test.jpg', answer: 'I', hint: 'For "I", extend your pinky finger while keeping the rest of your fingers curled in.' },
    { sign: 'J_test.jpg', answer: 'J', hint: 'To make "J", start with the "I" position and move your pinky in a small arc to draw the letter "J".' },
    { sign: 'K_test.jpg', answer: 'K', hint: 'For "K", extend your index and middle fingers while keeping the other fingers curled in, with the thumb placed between the index and middle fingers.' },
    { sign: 'L_test.jpg', answer: 'L', hint: 'To make "L", extend your index finger and thumb to form an "L" shape, with the other fingers curled in.' },
    { sign: 'M_test.jpg', answer: 'M', hint: 'For "M", curl your thumb under the first three fingers, keeping them pressed against the palm.' },
    { sign: 'N_test.jpg', answer: 'N', hint: 'For "N", curl your thumb under the first two fingers while keeping them pressed against the palm.' },
    { sign: 'O_test.jpg', answer: 'O', hint: 'To make "O", curl your fingers into a circular shape, with the thumb meeting the tips of the fingers.' },
    { sign: 'P_test.jpg', answer: 'P', hint: 'For "P", extend your index and middle fingers while keeping the other fingers curled in, with the thumb placed between the index and middle fingers.' },
    { sign: 'Q_test.jpg', answer: 'Q', hint: 'To form "Q", extend your thumb and index finger downward, with the rest of the fingers curled in.' },
    { sign: 'R_test.jpg', answer: 'R', hint: 'For "R", cross your index and middle fingers while keeping the rest of the fingers curled in.' },
    { sign: 'S_test.jpg', answer: 'S', hint: 'To make "S", curl your fingers into a fist and place your thumb across the front of the fingers.' },
    { sign: 'T_test.jpg', answer: 'T', hint: 'For "T", curl your fingers into a fist with your thumb placed between your index and middle fingers.' },
    { sign: 'U_test.jpg', answer: 'U', hint: 'To make "U", extend your index and middle fingers together, keeping the other fingers curled in.' },
    { sign: 'V_test.jpg', answer: 'V', hint: 'For "V", extend your index and middle fingers in a "V" shape, keeping the other fingers curled in.' },
    { sign: 'W_test.jpg', answer: 'W', hint: 'To form "W", extend your index, middle, and ring fingers while keeping the other fingers curled in.' },
    { sign: 'X_test.jpg', answer: 'X', hint: 'For "X", curl your index finger to form a hook, with the rest of your fingers curled in.' },
    { sign: 'Y_test.jpg', answer: 'Y', hint: 'To make "Y", extend your pinky and thumb while keeping the other fingers curled in.' },
    { sign: 'Z_test.jpg', answer: 'Z', hint: 'For "Z", draw a "Z" shape in the air using your index finger while keeping the other fingers curled in.' }
];

// Store current question index and score
let currentQuestionIndex = 0;
let score = 0;

// Get the DOM elements
const handSignElement = document.getElementById('hand-sign');
const choicesElement = document.getElementById('choices');
const feedbackElement = document.getElementById('feedback');
const hintButton = document.getElementById('hint-button');

// Function to display a new question
function displayQuestion() {
    const currentSign = signs[currentQuestionIndex];
    // Set the image for the hand sign
    handSignElement.src = `/handimage/${currentSign.sign}`;
    
    // Generate random answers (including the correct one and other random letters)
    const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const randomOptions = options.sort(() => 0.5 - Math.random()).slice(0, 3);
    randomOptions.push(currentSign.answer);
    randomOptions.sort(() => 0.5 - Math.random()); // Shuffle the options
    
    // Display the options
    choicesElement.innerHTML = randomOptions.map(option => {
        return `<button onclick="checkAnswer('${option}')">${option}</button>`;
    }).join('');
}

// Function to check the user's answer
function checkAnswer(selectedAnswer) {
    const currentSign = signs[currentQuestionIndex];
    if (selectedAnswer === currentSign.answer) {
        feedbackElement.textContent = 'Correct! Well done!';
        score++;
        hintButton.style.display = 'none'; // Hide hint button when the answer is correct
    } else {
        feedbackElement.textContent = 'Incorrect. Try again!';
        hintButton.style.display = 'inline-block'; // Show hint button if the answer is incorrect
    }
}

// Function to show the hint
function showHint() {
    const currentSign = signs[currentQuestionIndex];
    alert(currentSign.hint); // Display the hint as an alert or you can render it in the page
    // You can also use other methods to show hints, such as displaying a video or text in the page
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < signs.length) {
        displayQuestion();
        feedbackElement.textContent = '';
        hintButton.style.display = 'none'; // Hide hint button when moving to the next question
    } else {
        feedbackElement.textContent = `Quiz over! Your score: ${score} / ${signs.length}`;
        currentQuestionIndex = 0; // Reset for next quiz
    }
}

// Start the quiz by displaying the first question
displayQuestion();
