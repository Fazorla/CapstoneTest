// pages/api/CityGeoLocation.js
import axios from "axios";

export default async function handler(req, res) {
  const { cityName } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A`
    );
    const coordinates = response.data.results[0].geometry.location;
    res.json(coordinates);
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
