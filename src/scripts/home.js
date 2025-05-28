import { userDropdownMenu } from "./headerNavUpdater.js";

document.addEventListener("DOMContentLoaded", () => {
  loadProperties();
  userDropdownMenu();
});

async function loadProperties() {
  try {
    const response = await fetch("/data/properties.json");
    if (!response.ok) throw new Error("Failed to load properties.");
    const properties = await response.json();

    homePageSwiper(properties.slice(6, 12));
    latestAddedProperties(properties.slice(0, 8));
  } catch (error) {
    alert("Error loading properties:", error);
  }
}

function homePageSwiper(properties) {
  const sliderContainer = document.getElementById("property-slider");

  while (sliderContainer.firstChild) {
    sliderContainer.removeChild(sliderContainer.firstChild);
  }

  const fragment = document.createDocumentFragment();

  properties.forEach((property) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.style.backgroundImage = `url(${property.image})`;
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";
    slide.style.height = "400px";

    fragment.appendChild(slide);
  });

  sliderContainer.appendChild(fragment);

  new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
}

function latestAddedProperties(properties) {
  const propertyList = document.getElementById("property-list");

  while (propertyList.firstChild) {
    propertyList.removeChild(propertyList.firstChild);
  }

  const fragment = document.createDocumentFragment();

  properties.forEach((property) => {
    const propertyItem = document.createElement("div");
    propertyItem.className = "property-item";

    const img = document.createElement("img");
    img.src = property.image;
    img.alt = property.title;
    img.loading = "lazy";
    propertyItem.appendChild(img);

    const title = document.createElement("h3");
    title.className = "property-name";
    title.textContent = property.title;
    propertyItem.appendChild(title);

    const price = document.createElement("p");
    price.className = "property-price";
    price.textContent = `$${property.price.toLocaleString()}`;
    propertyItem.appendChild(price);

    const location = document.createElement("p");
    location.className = "property-location";
    location.textContent = property.location;
    propertyItem.appendChild(location);

    const link = document.createElement("a");
    link.href = `/src/pages/PropertyDetails/singlePropertyCard.html?id=${property.id}`;
    link.className = "btn";
    link.textContent = "View Details";
    propertyItem.appendChild(link);

    fragment.appendChild(propertyItem);
  });

  propertyList.appendChild(fragment);
}
