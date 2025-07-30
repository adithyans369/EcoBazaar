document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password })
  });

  const data = await response.json();
  if (data.success) {
    localStorage.setItem("user", email);  // Save user for personalization
    window.location.href = "/index.html";
  } else {
    alert(data.message);
  }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  const response = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password })
  });

  const data = await response.json();
  if (data.success) {
    localStorage.setItem("user", email);  // Save new user
    window.location.href = "/index.html";
  } else {
    alert(data.message);
  }
});
