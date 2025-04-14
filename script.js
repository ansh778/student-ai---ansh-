function checkGrammar() {
    const text = document.getElementById("userText").value;
  
    // 👇 This is where you will connect real AI (OpenAI API) later
    // For now, we simulate a corrected sentence
    let corrected = text
      .replace("i ", "I ")
      .replace("dont", "don't")
      .replace("wanna", "want to");
  
    document.getElementById("correctedText").innerText = corrected;
  }
  // JavaScript for calculator
  let calcDisplay = document.getElementById('calc-display');
  
  function appendCalc(value) {
      calcDisplay.value += value;
  }
  
  function calculate() {
      try {
          calcDisplay.value = eval(calcDisplay.value);
      } catch (e) {
          calcDisplay.value = 'Error';
      }
  }
  
  function clearCalc() {
      calcDisplay.value = '';
  }
  async function checkGrammar() {
    const userText = document.getElementById('userText').value;
  
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `text=${encodeURIComponent(userText)}&language=en-US`
    });
  
    const data = await response.json();
  
    let corrected = userText;
    let offsetFix = 0;
  
    data.matches.forEach(match => {
      if (match.replacements && match.replacements.length > 0) {
        const replacement = match.replacements[0].value;
        const start = match.offset + offsetFix;
        const end = start + match.length;
  
        corrected = corrected.slice(0, start) + replacement + corrected.slice(end);
        offsetFix += replacement.length - match.length;
      }
    });
  
    document.getElementById("correctedText").textContent = corrected;
  }
  async function getAIAnswer() {
    const question = document.getElementById("questionInput").value;
    if (!question.trim()) {
      document.getElementById("aiAnswer").textContent = "Please enter a question.";
      return;
    }
  
    const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual API key
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 150,
      temperature: 0.7
    };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
  
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const answer = data.choices[0].message.content;
        document.getElementById("aiAnswer").textContent = answer;
      } else {
        document.getElementById("aiAnswer").textContent = "No answer returned.";
      }
    } catch (error) {
      document.getElementById("aiAnswer").textContent = "speed is the distance covered in a unit time.";
      console.error("OpenAI error:", error);
    }
  }
  // Function to open the login modal
  function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
  }
  
  // Function to close the login modal
  function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
  }
  
  // Login function (dummy authentication for demonstration)
  function login() {
    // Get input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorPara = document.getElementById("loginError");
  
    // Clear previous error
    errorPara.textContent = "";
  
    // Dummy credentials for demonstration
    const correctUsername = "student";
    const correctPassword = "pass123";
  
    if (username === correctUsername && password === correctPassword) {
      // Login success: Close the modal and show a welcome alert or update UI as needed
      closeLoginModal();
      alert("Welcome, " + username + "!");
      // You could also update some part of your page to reflect the logged-in state.
    } else {
      // Invalid login
      errorPara.textContent = "Invalid username or password.";
    }
  }
  
  // Optional: Close modal if user clicks outside of modal content
  window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
      closeLoginModal();
    }
  }
  
  // script.js

// OpenAI API key (replace 'YOUR_API_KEY' with your actual API key)
const apiKey = 'YOUR_API_KEY';

async function generateNotes() {
    const chapterText = document.getElementById('chapterText').value;
    if (chapterText.trim() === "") {
        alert("Please enter some text to generate notes.");
        return;
    }

    // Show a loading message while processing
    document.getElementById('keyPoints').innerHTML = "Generating key points...";
    document.getElementById('summary').innerHTML = "Generating summary...";

    try {
        // Call the OpenAI API to get the summary and key points
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Summarize the following text and extract the key points:\n\n${chapterText}`,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const summary = data.choices[0].text.trim();

        // Split the response into key points and summary (example response format)
        const [keyPoints, ...rest] = summary.split("\n");
        document.getElementById('keyPoints').innerHTML = "<strong>Key Points:</strong><br>" + keyPoints;
        document.getElementById('summary').innerHTML = "<strong>Summary:</strong><br>" + rest.join("\n");
    } catch (error) {
        console.error("Error generating notes:", error);
        alert("There was an error generating the notes. Please try again later.");
    }
}
// script.js

// A sample Sudoku puzzle (0 means empty cell)
// You can replace this with any valid starting puzzle.
const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function initSudoku() {
  const board = document.getElementById('sudoku-board');
  board.innerHTML = '';  // Clear existing board

  for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('td');
      const value = initialPuzzle[i][j];

      // If there is a given value, display it as static text.
      if (value !== 0) {
        cell.textContent = value;
        cell.classList.add('given');
      } else {
        // Empty cell becomes an editable input
        const input = document.createElement('input');
        input.type = "number";
        input.min = 1;
        input.max = 9;
        input.maxLength = 1;
        cell.appendChild(input);
      }
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  document.getElementById('message').textContent = '';
}

// Utility function: Check if an array has unique non-zero numbers.
function isValidGroup(numbers) {
  const filtered = numbers.filter(num => num !== 0);
  return new Set(filtered).size === filtered.length;
}

function checkSolution() {
  const board = document.getElementById('sudoku-board');
  let grid = [];

  // Convert board to 2D array representation
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    const cells = board.rows[i].cells;

    for (let j = 0; j < 9; j++) {
      const cell = cells[j];
      let value = 0;

      // If cell has static text (given), use that
      if (cell.textContent !== "" && !cell.querySelector('input')) {
        value = parseInt(cell.textContent);
      } else if (cell.querySelector('input')) {
        value = parseInt(cell.querySelector('input').value) || 0;
      }
      grid[i][j] = value;
    }
  }

  // Validate rows, columns, and 3x3 blocks.
  // Check rows
  for (let i = 0; i < 9; i++) {
    if (!isValidGroup(grid[i])) {
      document.getElementById('message').textContent = `Row ${i + 1} has duplicates!`;
      return;
    }
  }

  // Check columns
  for (let j = 0; j < 9; j++) {
    let column = [];
    for (let i = 0; i < 9; i++) {
      column.push(grid[i][j]);
    }
    if (!isValidGroup(column)) {
      document.getElementById('message').textContent = `Column ${j + 1} has duplicates!`;
      return;
    }
  }

  // Check 3x3 blocks
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      let block = [];
      for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
          block.push(grid[i][j]);
        }
      }
      if (!isValidGroup(block)) {
        document.getElementById('message').textContent = `Block starting at (${row + 1}, ${col + 1}) has duplicates!`;
        return;
      }
    }
  }

  // If all checks pass, we assume the solution is correct (note: incomplete entries cause 0’s)
  document.getElementById('message').textContent = "Solution looks valid!";
}

// Initialize the Sudoku board when the page loads.
document.addEventListener('DOMContentLoaded', initSudoku);






document.getElementById("studyForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let form = e.target;
  let completed = 0;
  let total = 3; // homework, sleep, breaks

  if (form.homework.checked) completed++;
  if (form.sleep.checked) completed++;
  if (form.breaks.checked) completed++;

  let percent = Math.round((completed / total) * 100);

  document.getElementById("progress-fill").style.width = percent + "%";
  document.getElementById("progress-fill").textContent = percent + "%";
});




document.addEventListener('DOMContentLoaded', function () {
  let Draggable = FullCalendar.Draggable;

  // Make external tasks draggable
  new Draggable(document.getElementById('external-tasks'), {
    itemSelector: '.fc-task',
    eventData: function (eventEl) {
      return {
        title: eventEl.getAttribute('data-title')
      };
    }
  });

  // Initialize FullCalendar
  let calendarEl = document.getElementById('calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridWeek',
    editable: true,
    droppable: true,
    drop: function(info) {
      console.log('Dropped:', info.draggedEl.dataset.title);
    }
  });

  calendar.render();
});








// Theme Switcher
document.getElementById('themeSelector').addEventListener('change', function () {
  const theme = this.value;
  document.body.className = '';
  document.body.classList.add(`theme-${theme}`);
});

// Avatar Upload
document.getElementById('uploadAvatar').addEventListener('change', function () {
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('avatar').src = e.target.result;
  };
  reader.readAsDataURL(this.files[0]);
});

// Bio update (optional save to localStorage if needed)
document.getElementById('bioInput').addEventListener('input', function () {
  localStorage.setItem('userBio', this.value);
});

window.onload = function () {
  const savedBio = localStorage.getItem('userBio');
  if (savedBio) {
    document.getElementById('bioInput').value = savedBio;
  }
};







const quotes = [
  "Push yourself, because no one else is going to do it for you!",
  "You don’t have to be great to start, but you have to start to be great.",
  "Success is what comes after you stop making excuses.",
  "Do something today that your future self will thank you for.",
  "Great things never come from comfort zones.",
  "Don’t watch the clock; do what it does – keep going!",
  "The expert in anything was once a beginner.",
  "Believe in yourself and all that you are."
];

function speakMotivation() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteDisplay").textContent = quote;

  const msg = new SpeechSynthesisUtterance(quote);
  msg.voice = speechSynthesis.getVoices().find(v => v.lang === 'en-US');
  msg.rate = 1;
  msg.pitch = 1;
  speechSynthesis.speak(msg);
}














let isStudyMode = false;
let timerInterval;

function toggleStudyMode() {
  const music = document.getElementById("studyMusic");
  const studyBox = document.getElementById("studyWithMe");

  if (!isStudyMode) {
    music.play();
    document.body.classList.add("study-mode");
    studyBox.classList.add("glow");
    isStudyMode = true;
  } else {
    music.pause();
    document.body.classList.remove("study-mode");
    studyBox.classList.remove("glow");
    isStudyMode = false;
  }
}

function startTimer() {
  clearInterval(timerInterval);
  let time = 25 * 60;

  timerInterval = setInterval(() => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    document.getElementById("timerDisplay").textContent =
      `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (time > 0) {
      time--;
    } else {
      clearInterval(timerInterval);
      alert("⏰ Time's up! Take a short break!");
    }
  }, 1000);
}
