document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector(".register-form");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const users = [];

      users.push(user);
      localStorage.setItem("currentUser", JSON.stringify(users));

      alert(`Welcome ${name}! Registration successful.`);
      registerForm.reset();
      window.location.href = "../UserDashboard/userDashboard.html";
    } catch (error) {
      alert("Registration failed. Please try again.", error);
    }
  });
});
