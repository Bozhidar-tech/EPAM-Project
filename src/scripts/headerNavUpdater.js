export function userDropdownMenu() {
  const dropdowns = document.querySelectorAll(".dropdown");
  const userMenu = document.getElementById("user-menu");

  function clearMenu() {
    while (userMenu.firstChild) {
      userMenu.removeChild(userMenu.firstChild);
    }
  }

  function createMenuItem(href, iconClass, text, id = null) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const icon = document.createElement("i");

    icon.className = iconClass;
    a.href = href;
    if (id) a.id = id;
    a.appendChild(icon);
    a.appendChild(document.createTextNode(" " + text));
    li.appendChild(a);

    return li;
  }

  function updateMenu() {
    const currentUser = localStorage.getItem("currentUser");

    if (userMenu) {
      clearMenu();

      if (currentUser) {
        const dashboardItem = createMenuItem(
          "src/pages/UserDashboard/userDashboard.html",
          "fas fa-address-book",
          "Dashboard"
        );

        const logoutItem = createMenuItem(
          "#",
          "fas fa-sign-out-alt",
          "Logout",
          "logout-link"
        );

        userMenu.appendChild(dashboardItem);
        userMenu.appendChild(logoutItem);

        const logoutLink = document.getElementById("logout-link");
        if (logoutLink) {
          logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            updateMenu();
            window.location.href = "/index.html";
          });
        }
      } else {
        const loginItem = createMenuItem(
          "src/pages/Login/login.html",
          "fas fa-sign-in-alt",
          "Login"
        );

        const registerItem = createMenuItem(
          "src/pages/Register/register.html",
          "fas fa-user-plus",
          "Register"
        );

        userMenu.appendChild(loginItem);
        userMenu.appendChild(registerItem);
      }
    }
  }
  updateMenu();

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".submenu");

    if (toggle && menu) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.toggle("active");

        document.querySelectorAll(".submenu.active").forEach((openMenu) => {
          if (openMenu !== menu) openMenu.classList.remove("active");
        });
      });

      toggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          menu.classList.toggle("active");
        }
      });

      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove("active");
        }
      });
    }
  });

  window.addEventListener("storage", updateMenu);
}
