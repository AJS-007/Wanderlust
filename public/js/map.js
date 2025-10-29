// Geocoding is the process of converting addresses into geographic coordinates (like lat & long) which u can use to place markers on a map or position the map

// Replace with your actual coordinates from the listing object
  
document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  // Set default zoom & center
  const coordinates = mapDiv.dataset.coordinates;
  if (!coordinates) return;

  const [lng, lat] = coordinates.split(",").map(Number);

  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(mapDiv.dataset.title || "Listing Location")
    .openPopup();
});

    