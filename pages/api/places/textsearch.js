// pages/api/places/textsearch.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { query } = req.query;
  const apiKey = "AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A"; // Replace with your API key
  const limit = 50; // Adjust the limit based on your needs

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&language=en&key=${apiKey}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch places from Google Places API");
    }

    const data = await response.json();

    if (data && data.results && Array.isArray(data.results)) {
      // Shuffle the array randomly
      const shuffledResults = data.results.sort(() => 0.5 - Math.random());

      // Select 5 random places
      const randomPlaces = shuffledResults.slice(0, 3);

      // Map the data to match the expected format
      const attractions = randomPlaces.map((place) => ({
        id: place.place_id,
        name: place.name,
        rating: place.rating || null,
        address: place.formatted_address || null,
        photoUrl: place.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
          : null,
      }));

      return res.status(200).json({ attractions });
    } else {
      console.error("Invalid data structure:", data);
      return res.status(500).json({ error: "Invalid data structure" });
    }
  } catch (error) {
    console.error("Error fetching places:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
