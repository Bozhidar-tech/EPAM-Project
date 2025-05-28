export function propertySearch(allProperties, loadCallback) {
  const searchInput = document.getElementById("property-search");
  const searchBtn = document.getElementById("search-btn");
  const filtersSection = document.querySelector(".search-filters");
  const typeInput = document.getElementById("property-type");
  const priceInput = document.getElementById("price-range");
  const sortInput = document.getElementById("sort-by");

  let debounceTimeout;

  searchBtn.addEventListener("click", () => searchHandler());
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => searchHandler(), 300);
  });

  filtersSection.addEventListener("change", searchHandler);

  function searchHandler() {
    const filtered = applyFilters(allProperties);
    const sorted = sortProperties(filtered);
    loadCallback(sorted);
  }

  function applyFilters(properties) {
    const searchWord = searchInput.value.toLowerCase();
    const type = typeInput.value;
    const price = priceInput.value;

    return properties.filter((property) => {
      const title = property.title ? property.title.trim().toLowerCase() : "";
      const location = property.location
        ? property.location.trim().toLowerCase()
        : "";

      const searchMatch =
        title.includes(searchWord) || location.includes(searchWord);

      const typeMatch = type === "all" || property.type === type;
      const priceMatch = checkPriceRange(property.price, price);

      return searchMatch && typeMatch && priceMatch;
    });
  }

  function checkPriceRange(price, range) {
    if (range === "all") return true;

    if (range === "1000000") {
      return price >= 1000000;
    }

    const [min, max] = range.split("-").map(Number);
    return price >= min && price <= max;
  }

  function sortProperties(properties) {
    const sort = sortInput.value;

    return [...properties].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }
}
