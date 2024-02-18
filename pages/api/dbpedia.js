// pages/api/dbpedia.js
import axios from "axios";

export default async function handler(req, res) {
  console.log("Received request:", req.query);

  const { query } = req.query;

  try {
    const dbpediaResponse = await axios.get(
      `https://api.dbpedia-spotlight.org/en/annotate?text=${encodeURIComponent(
        query
      )}`
    );

    console.log("DBpedia API Response:", dbpediaResponse.status);

    const dbpediaData = dbpediaResponse.data;
    res.status(200).json(dbpediaData);
  } catch (error) {
    console.error("Error in API route:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("DBpedia API Error Response:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from DBpedia API");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error during request setup:", error.message);
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
}
