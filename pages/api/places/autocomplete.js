// pages/api/places/autocomplete.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { input } = req.query;

  try {
    const apiKey = "AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch places.");
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error searching for places:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
