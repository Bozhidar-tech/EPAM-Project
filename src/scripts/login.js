document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");

  async function fetchUsers() {
    try {
      const response = await fetch("/data/users.json");
      if (!response.ok) throw new Error("Failed to load users.");
      return await response.json();
    } catch (error) {
      alert("Error loading users:", error);
    }
  }

  function getLocalUsers() {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
      alert("Error loading local users:", error);
    }
  }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const users = await fetchUsers();
      const localStorageUsers = getLocalUsers() || [];

      const allUsers = [...users, ...localStorageUsers].filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.email === user.email)
      );

      const user = allUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            featuredListings: user.featuredListings,
            savedProperties: user.savedProperties,
            propertiesViewed: user.propertiesViewed,
            favoriteProperties: user.favoriteProperties,
            avatar: user.avatar,
          })
        );

        window.location.href = "../UserDashboard/userDashboard.html";
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      alert("Login failed. Please try again.", err);
    }
  });
});
