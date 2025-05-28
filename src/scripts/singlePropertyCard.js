let googleMapsLoaded = false;
let googleMapsLoading = false;

document.addEventListener("DOMContentLoaded", function () {
  loadPropertyData();
});

async function loadPropertyData() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id");

  if (!propertyId) {
    alert("Property not found.");
    return;
  }

  try {
    const response = await fetch("/data/properties.json");
    const properties = await response.json();
    const property = properties.find((p) => p.id == propertyId);

    if (!property) {
      alert("Property not found.");
      return;
    }

    displaySinglePropertyDetails(property);
    await checkIfGoogleMapsIsLoaded();
    initMap(property);
  } catch (error) {
    alert("Failed to load property details:", error);
  }
}

function displaySinglePropertyDetails(property) {
  document.getElementById("property-image").src = property.image;
  document.getElementById("property-title").textContent = property.title;
  document.getElementById(
    "property-price"
  ).textContent = `$${property.price.toLocaleString()}`;
  document.getElementById("property-location").textContent = property.location;
  document.getElementById("property-description").textContent =
    property.description;
}

async function checkIfGoogleMapsIsLoaded() {
  if (googleMapsLoaded) return;
  if (googleMapsLoading) {
    await new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (googleMapsLoaded) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
    return;
  }

  googleMapsLoading = true;
  await loadGoogleMapsAPI();
  googleMapsLoaded = true;
  googleMapsLoading = false;
}

function loadGoogleMapsAPI() {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.Map) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${window.config.GOOGLE_MAPS_API_KEY}&v=weekly&libraries=marker&loading=async&callback=googleMapsReady`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      alert("Failed to load Google Maps API.");
      reject();
    };

    window.googleMapsReady = resolve;
    document.head.appendChild(script);
  });
}

function initMap(property) {
  if (!property?.latitude || !property?.longitude) {
    alert(`Invalid location: ${property.location}`);
    return;
  }

  const lat = property.latitude
  const lng = property.longitude

  if (isNaN(lat) || isNaN(lng)) {
    alert(`Invalid coordinates for: ${property.location}`);
    return;
  }

  try {
    const mapOptions = {
      center: { lat, lng },
      zoom: 15,
      mapId: window.config.GOOGLE_MAPS_ID,
      disableDefaultUI: true,
    };

    const map = new google.maps.Map(document.querySelector(".map"), mapOptions);

    const MarkerClass =
      window.google.maps.marker?.AdvancedMarkerElement || google.maps.Marker;
    new MarkerClass({
      position: { lat, lng },
      map: map,
      title: property.title || "Property Location",
    });
  } catch (error) {
    alert("Map initialization failed:", error);
  }
}
