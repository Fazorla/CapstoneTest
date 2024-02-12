// pages/api/places/random-attractions.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { city } = req.query;
  const apiKey = "AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A"; // Replace with your API key
  const radius = 5000; // Define the radius in meters (adjust as needed)

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
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(
        cityLocation
      )}&radius=${encodeURIComponent(radius)}&key=${apiKey}`
    );

    if (!placesResponse.ok) {
      throw new Error("Failed to fetch attractions.");
    }

    const placesData = await placesResponse.json();

    // Shuffle the array randomly
    const shuffledResults = placesData.results.sort(() => 0.5 - Math.random());

    // Select 10 random places
    const randomPlaces = shuffledResults.slice(0, 10);

    return res.status(200).json({ attractions: randomPlaces });
  } catch (error) {
    console.error("Error fetching random attractions:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
