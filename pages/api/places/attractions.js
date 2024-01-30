// pages/api/places/attractions.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { input, city } = req.query;
  const apiKey = "AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A"; // Replace with your API key
  const radius = 5000; // Define the radius in meters

  try {
    // Fetch city coordinates using Google Geocoding API
    const geocodingResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        city
      )}&key=${apiKey}`
    );

    if (!geocodingResponse.ok) {
      throw new Error("Failed to fetch city coordinates.");
    }

    const geocodingData = await geocodingResponse.json();

    // Extract the coordinates
    const cityLocation = `${geocodingData.results[0].geometry.location.lat},${geocodingData.results[0].geometry.location.lng}`;

    // Fetch attractions using Google Places API with city coordinates
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=establishment&location=${encodeURIComponent(
        cityLocation
      )}&radius=${encodeURIComponent(radius)}&key=${apiKey}`
    );

    if (!placesResponse.ok) {
      throw new Error("Failed to fetch attractions.");
    }

    const placesData = await placesResponse.json();

    return res.status(200).json(placesData);
  } catch (error) {
    console.error("Error searching for attractions:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
