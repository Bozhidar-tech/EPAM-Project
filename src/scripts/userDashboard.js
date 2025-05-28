document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "../Login/login.html";
    return;
  }

  document.getElementById("dashboard-username").textContent = currentUser.name;
  document.getElementById("dashboard-avatar").src = currentUser.avatar;

  function renderProperties(containerId, properties, limit = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;

    properties.slice(0, limit).forEach((property) => {
      const card = document.createElement("div");
      card.className = "property-card";
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        window.location.href = `/src/pages/PropertyDetails/singlePropertyCard.html?id=${property.id}`;
      });

      const img = document.createElement("img");
      img.src = property.image;
      img.alt = property.title;

      const content = document.createElement("div");
      content.className = "property-card-content";

      const title = document.createElement("h4");
      title.textContent = property.title;

      const details = document.createElement("p");
      details.textContent = `${
        property.location
      } • $${property.price.toLocaleString()}`;

      content.appendChild(title);
      content.appendChild(details);
      card.appendChild(img);
      card.appendChild(content);
      container.appendChild(card);
    });
  }

  renderProperties("featured-properties", currentUser.featuredListings || []);
  renderProperties("saved-properties", currentUser.savedProperties || []);
  renderProperties("properties-viewed", currentUser.propertiesViewed || [], 2);
  renderProperties("favorite-properties", currentUser.favoriteProperties || [], 3);

  document.getElementById("logout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href = "/index.html";
  });
});
