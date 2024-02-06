// pages/api/places/attractions.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { input, city } = req.query;
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
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=establishment&location=${encodeURIComponent(
        cityLocation
      )}&radius=${encodeURIComponent(radius)}&key=${apiKey}`
    );

    if (!placesResponse.ok) {
      throw new Error("Failed to fetch attractions.");
    }

    const placesData = await placesResponse.json();

    // Filter places within the specified radius
    const filteredResults = await Promise.all(
      placesData.predictions.map(async (place) => {
        try {
          // Fetch place details using place_id
          const detailsResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${apiKey}`
          );

          if (!detailsResponse.ok) {
            console.error(
              `Failed to fetch details for place: ${place.place_id}`
            );
            return null;
          }

          const detailsData = await detailsResponse.json();
          const placeLocation = detailsData.result.geometry.location;

          // Calculate distance
          const distance = calculateDistance(
            cityLocation,
            `${placeLocation.lat},${placeLocation.lng}`
          );

          console.log(
            `Place: ${place.description}, Distance: ${distance}, Radius: ${radius}`
          );

          // Include only places within the radius
          return distance <= radius ? place : null;
        } catch (error) {
          console.error(
            `Error processing place: ${place.place_id}`,
            error.message
          );
          return null;
        }
      })
    );

    // Remove null values and return filtered results
    const filteredResultsWithoutNull = filteredResults.filter(Boolean);

    // console.log("Filtered Results:", filteredResultsWithoutNull);

    return res.status(200).json({ predictions: filteredResultsWithoutNull });
  } catch (error) {
    console.error("Error searching for attractions:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to calculate distance between two coordinates
function calculateDistance(coord1, coord2) {
  const [lat1, lng1] = coord1.split(",").map(parseFloat);
  const [lat2, lng2] = coord2.split(",").map(parseFloat);

  const R = 6371000; // Earth radius in meters
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
