import { propertySearch } from "./propertiesSearch.js";

document.addEventListener("DOMContentLoaded", () => {
  loadProperties();
  nextPageBtn.addEventListener("click", goToNextPage);
  prevPageBtn.addEventListener("click", goToPrevPage);
  showMoreBtn.addEventListener("click", toggleAdditionalProperties);
});

let allProperties = [];
let filteredProperties = [];
let currentPage = 1;
const propertiesPerPage = 8;
let showAdditionalProperties = false;

const propertyList = document.getElementById("property-grid");
const showMoreBtn = document.querySelector('.show-more-btn');
const nextPageBtn = document.querySelector('.next-page');
const prevPageBtn = document.querySelector('.pagination-button:first-child');

async function loadProperties() {
  try {
    const response = await fetch("/data/properties.json");
    if (!response.ok) throw new Error("Failed to load properties.");

    allProperties = await response.json();
    filteredProperties = [...allProperties];

    setupPropertySearch();
    renderPropertyCards();
    updateNavigationControls();
  } catch (error) {
    alert("Error loading properties:", error);
  }
}

function setupPropertySearch() {
  propertySearch(allProperties, (result) => {
    filteredProperties = result;
    currentPage = 1;
    showAdditionalProperties = false;
    renderPropertyCards();
    updateNavigationControls();
  });
}

function renderPropertyCards() {
  const startIndex = (currentPage - 1) * propertiesPerPage;
  let endIndex = startIndex + propertiesPerPage;

  if (showAdditionalProperties) {
    endIndex = Math.min(
      startIndex + propertiesPerPage + 2,
      filteredProperties.length
    );
  }

  const propertiesToDisplay = filteredProperties.slice(startIndex, endIndex);
  propertyList.innerHTML = "";

  if (filteredProperties.length === 0) {
    displayNoResultsMessage();
    return;
  }

  propertiesToDisplay.forEach(createPropertyCard);
  updateNavigationControls();
}

function createPropertyCard(property) {
  const propertyCard = document.createElement("div");
  propertyCard.classList.add("property-item");

  const img = document.createElement("img");
  img.src = property.image;
  img.alt = property.title;
  img.loading = "lazy";
  propertyCard.appendChild(img);

  const title = document.createElement("h3");
  title.classList.add("property-name");
  title.textContent = property.title;
  propertyCard.appendChild(title);

  const price = document.createElement("p");
  price.classList.add("property-price");
  price.textContent = `$${property.price.toLocaleString()}`;
  propertyCard.appendChild(price);

  const location = document.createElement("p");
  location.classList.add("property-location");
  location.textContent = property.location;
  propertyCard.appendChild(location);

  const link = document.createElement("a");
  link.href = `/src/pages/PropertyDetails/singlePropertyCard.html?id=${property.id}`;
  link.classList.add("btn");
  link.textContent = "View Details";
  propertyCard.appendChild(link);

  propertyList.appendChild(propertyCard);
}

function displayNoResultsMessage() {
  const noResults = document.createElement("div");
  noResults.classList.add("no-results");
  noResults.textContent =
    "There are no properties available based on the given criteria.";
  propertyList.appendChild(noResults);
  nextPageBtn.style.display = "none";
  prevPageBtn.style.display = "none";
  showMoreBtn.style.display = "none";
}

function updateNavigationControls() {
  const totalProperties = filteredProperties.length;
  const totalPages = Math.ceil(totalProperties / propertiesPerPage);
  const currentStartIndex = (currentPage - 1) * propertiesPerPage;
  const showingAllProperties =
    currentStartIndex +
      (showAdditionalProperties ? propertiesPerPage + 2 : propertiesPerPage) >=
    totalProperties;

  const canShowMore =
    currentPage === 1 &&
    currentStartIndex + propertiesPerPage < totalProperties;
  showMoreBtn.style.display = canShowMore ? "block" : "none";
  showMoreBtn.textContent = showAdditionalProperties
    ? "Show Less"
    : "Show More";

  prevPageBtn.style.display = currentPage > 1 ? "block" : "none";
  nextPageBtn.style.display = currentPage < totalPages ? "block" : "none";

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage >= totalPages || showingAllProperties;
}

function toggleAdditionalProperties() {
  showAdditionalProperties = !showAdditionalProperties;
  renderPropertyCards();
}

function goToNextPage() {
  showAdditionalProperties = false;
  currentPage++;
  renderPropertyCards();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToPrevPage() {
  showAdditionalProperties = false;
  currentPage--;
  renderPropertyCards();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
