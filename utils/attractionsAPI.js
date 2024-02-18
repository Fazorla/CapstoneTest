// attractionsAPI.js
import { useEffect, useState } from "react";
import axios from "axios";

const MINIMUM_RATING = 2.0;

const fetchDbpediaDescription = async (place) => {
  try {
    const resourceUrl = `http://dbpedia.org/resource/${encodeURIComponent(
      place.name.replace(/\s/g, "_")
    )}`;

    const sparqlQuery = `
      SELECT ?abstract
      WHERE {
        { 
          <${resourceUrl}> dbo:abstract ?abstract .
          FILTER (LANG(?abstract) = 'en')
        }
        UNION
        {
          ?place rdfs:label ?label .
          ?place dbo:abstract ?abstract .
          FILTER (LANG(?abstract) = 'en')
        }
      }
    `;

    const sparqlEndpoint = "http://dbpedia.org/sparql";
    const headers = {
      Accept: "application/sparql-results+json",
    };
    const params = {
      query: sparqlQuery,
      format: "json",
    };

    const dbpediaResponse = await axios.get(sparqlEndpoint, {
      headers,
      params,
    });

    console.log("DBpedia Response:", dbpediaResponse.data);

    if (dbpediaResponse.status === 200) {
      const data = dbpediaResponse.data;

      if (data.results.bindings.length > 0) {
        const description =
          data.results.bindings[0]?.abstract?.value ||
          "No description available";

        return { ...place, description };
      } else {
        console.warn("DBpedia API returned no results for:", place.name);
        return { ...place, description: "No description available" };
      }
    } else {
      console.error("DBpedia API Error Response:", dbpediaResponse.status);
      return place;
    }
  } catch (error) {
    console.error("Error fetching DBpedia data:", error);
    return place;
  }
};

const useAttractions = (city) => {
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if attractions are already present
        if (attractions.length > 0) {
          return;
        }

        const response = await fetch(
          `/api/places/textsearch?query=${encodeURIComponent(
            `${city} point of interest`
          )}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch attractions for ${city}`);
        }

        const data = await response.json();

        if (data && data.attractions && Array.isArray(data.attractions)) {
          const attractionsWithDescriptions = await Promise.all(
            data.attractions.map(fetchDbpediaDescription)
          );

          setAttractions(attractionsWithDescriptions);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        setError(error);
        console.error(`Error fetching attractions for ${city}:`, error);
      }
    };

    // Only fetch attractions if there are no attractions initially
    fetchData();
  }, [city, attractions]); // Include 'attractions' in the dependency array

  return { attractions, error };
};

export default useAttractions;
