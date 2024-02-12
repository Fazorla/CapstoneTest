// pages/api/places/details.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { place_id } = req.query;
  const apiKey = "AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A"; // Replace with your Google Maps API key

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch place details");
    }

    const data = await response.json();

    if (data && data.result) {
      return res.status(200).json({ result: data.result });
    } else {
      console.error("Invalid data structure:", data);
      return res.status(500).json({ error: "Invalid data structure" });
    }
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
