// pages/api/PlaceGeoLocation.js
import axios from "axios";

export default async function handler(req, res) {
  const { placeId } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A`
    );
    const location = response.data.result.geometry.location;
    res.json(location);
  } catch (error) {
    console.error("Error fetching place coordinates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
