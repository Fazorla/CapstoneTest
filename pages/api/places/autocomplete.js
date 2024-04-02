// Define an asynchronous handler function to handle requests to the API endpoint
export default async function handler(req, res) {
  // Check if the request method is not GET
  if (req.method !== "GET") {
    return res.status(405).end(); // Return Method Not Allowed status code
  }

  // Extract the 'input' query parameter from the request
  const { input } = req.query;

  try {
    // API key for Google Places Autocomplete API
    const apiKey = "AIzaSyAv9kGCUED097qnEx27Q0n7NyOAuKlmY5A";
    // Fetch autocomplete suggestions from Google Places Autocomplete API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${apiKey}`
    );

    // Check if the response is not okay
    if (!response.ok) {
      throw new Error("Failed to fetch places."); // Throw an error
    }

    // Parse response JSON
    const data = await response.json();
    // Return a successful response with status code 200 and the fetched data as JSON
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error searching for places:", error.message); // Log error
    // Return an error response with status code 500 and a JSON object containing the error message
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
