// main.js

// Show quote popup for 30s–60s
function showQuote(mood) {
  const quotes = {
    Amazing: "Keep shining, the world needs your light!",
    Good: "Stay positive — good days are ahead!",
    Okay: "Every step forward counts, even the small ones.",
    Low: "It's okay to feel low. Breathe. You’re doing your best.",
    Struggling: "You're not alone. Take it one breath at a time."
  };

  const popup = document.getElementById('quote-popup');
  const quoteText = document.getElementById('quote-text');
  quoteText.innerText = quotes[mood];
  popup.classList.remove('hidden');

  setTimeout(() => {
    popup.classList.add('hidden');
  }, 30000); // 30 seconds
}

// Regenerate challenges
function generateChallenge() {
  const challenges = [
    "Take a deep breath and stretch for 5 minutes.",
    "Write down 3 things you’re grateful for.",
    "Drink a glass of water and smile at yourself.",
    "Do one kind thing for someone today.",
    "Listen to a calming song and close your eyes."
  ];
  const challengeBox = document.getElementById("challenge-text");
  const randomIndex = Math.floor(Math.random() * challenges.length);
  challengeBox.innerText = `"${challenges[randomIndex]}"`;
}


// Show/Hide Activity Popup
function openActivityPopup() {
  document.getElementById('activity-popup').classList.remove('hidden');
  generateActivity(); // Show a challenge immediately
}

function closeActivityPopup() {
  document.getElementById('activity-popup').classList.add('hidden');
}

// Generate Random Activity Challenge
function generateActivity() {
  const activities = [
    "Take a slow, mindful walk and notice 5 things you see.",
    "Drink a cup of warm tea and do nothing else.",
    "Write down 3 things that made you smile today.",
    "Do a 5-minute deep breathing session.",
    "Stretch your body slowly and gently for 3 minutes.",
    "Sit quietly and listen to soothing music for 5 minutes.",
    "Declutter a small corner of your space.",
    "Hug yourself and say something kind aloud."
  ];

  const text = document.getElementById("activity-text");
  const index = Math.floor(Math.random() * activities.length);
  text.innerText = `"${activities[index]}"`;
}

function openGamesPopup() {
  document.getElementById("games-popup").classList.remove("hidden");
}
function closeGamesPopup() {
  document.getElementById("games-popup").classList.add("hidden");
}

function openJournalPopup() {
  document.getElementById("journal-popup").classList.remove("hidden");
}

function closeJournalPopup() {
  document.getElementById("journal-popup").classList.add("hidden");
}

function saveJournal() {
  const entry = document.getElementById("journal-textarea").value;
  if (entry.trim()) {
    alert("Journal saved!");
    localStorage.setItem("journalEntry", entry);
  }
}

function openFriendPopup() {
  document.getElementById("friend-popup").classList.remove("hidden");
}

function closeFriendPopup() {
  document.getElementById("friend-popup").classList.add("hidden");
}

function sendToFriend() {
  const name = document.getElementById("friend-name").value || "Your Friend";
  const msg = document.getElementById("friend-msg").value;
  if (msg.trim()) {
    alert(`${name} says: "I'm always here for you 💜"`);
  }
}

function openTherapistPopup() {
  document.getElementById("therapist-popup").classList.remove("hidden");
}
function closeTherapistPopup() {
  document.getElementById("therapist-popup").classList.add("hidden");
}

function openGamesPopup() {
  const popup = document.getElementById("games-popup");
  popup.classList.remove("hidden");

  const gamesList = document.getElementById("games-list");
  gamesList.innerHTML = `
    <div class="game-option">
      <img src="images/memory.png" alt="Memory Game" class="game-icon" />
      <p>🧠 Memory Flip</p>
    </div>
    <div class="game-option">
      <img src="images/breathing.png" alt="Breathing Game" class="game-icon" />
      <p>🌬️ Breathing Bubble</p>
    </div>
    <div class="game-option">
      <img src="images/puzzle.png" alt="Puzzle Game" class="game-icon" />
      <p>🧩 Calming Puzzle</p>
    </div>
    <div class="game-option">
      <img src="images/tap.png" alt="Tapping Game" class="game-icon" />
      <p>🎯 Focus Tap</p>
    </div>
  `;

  // You can later connect each game-option to a mini-game feature or animation
}
let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Sign Up";
  document.querySelector(".form-box button").innerText = isLogin ? "Login" : "Sign Up";
  document.getElementById("toggle-text").innerHTML = isLogin
    ? "Don't have an account? <a href='#' onclick='toggleForm()'>Sign up</a>"
    : "Already have an account? <a href='#' onclick='toggleForm()'>Login</a>";
}

function handleAuth() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (isLogin) {
    // Login
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "home.html";
    } else {
      alert("Invalid username or password");
    }
  } else {
    // Signup
    if (users.some(u => u.username === username)) {
      alert("Username already exists");
      return;
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully! You can now log in.");
    toggleForm();
  }
}

// Protect home.html
if (window.location.pathname.endsWith("home.html")) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "index.html";
  }
}

// Personalize home page with logged in user
if (window.location.pathname.endsWith("home.html")) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "index.html"; // redirect if not logged in
  } else {
    document.getElementById("username-placeholder").innerText = loggedInUser;
  }
}

// Profile page protection & display
if (window.location.pathname.endsWith("profile.html")) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "index.html";
  } else {
    document.getElementById("profile-username").innerText = loggedInUser;
  }
}

function updatePassword() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const newPassword = document.getElementById("new-password").value.trim();

  if (!newPassword) {
    alert("Please enter a new password");
    return;
  }

  // Update password
  const userIndex = users.findIndex(u => u.username === loggedInUser);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password updated successfully!");
    document.getElementById("new-password").value = "";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}




  let selectedMood = null;
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    window.location.href = "index.html";
  }

  function selectMood(mood) {
    selectedMood = mood;
    document.querySelectorAll('.mood').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
  }

  document.querySelectorAll('.mood').forEach(button => {
    button.addEventListener("click", function() {
      selectMood(this.innerText.split("\n")[1]); // Get mood name from button text
    });
  });

  document.querySelector(".save-btn").addEventListener("click", function() {
    if (!selectedMood) {
      alert("Please select a mood before saving.");
      return;
    }

    // Retrieve existing mood history or empty array
    let moodHistory = JSON.parse(localStorage.getItem(loggedInUser + "_moods")) || [];

    // Add new mood with date
    moodHistory.push({
      mood: selectedMood,
      date: new Date().toLocaleDateString()
    });

    // Save back to localStorage
    localStorage.setItem(loggedInUser + "_moods", JSON.stringify(moodHistory));

    alert("Mood saved successfully!");
  });


