// attractionsAPI.js
import { useEffect, useState } from "react";
import axios from "axios";

const fetchDbpediaDescription = async (place) => {
  try {
    const resourceUrl = `https://dbpedia.org/resource/${encodeURIComponent(
      place.name.replace(/\s/g, "_")
    )}`;

    const sparqlQuery = `
      SELECT ?abstract
      WHERE {
        OPTIONAL {
          <${resourceUrl}> dbo:abstract ?abstract .
          FILTER (LANG(?abstract) = 'en')
        }
      }
    `;

    const sparqlEndpoint = "https://dbpedia.org/sparql";
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
          "No description available at this time";
        return { ...place, description };
      } else {
        console.warn("DBpedia API returned no results for:", place.name);
        return {
          ...place,
          description: "No description available at this time",
        };
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/places/textsearch?query=${encodeURIComponent(
          `${city} point of interest`
        )}&limit=1000` // Increase the limit to fetch more attractions
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

  useEffect(() => {
    // Fetch attractions when the city changes or when the component mounts
    fetchData();
  }, [city]); // Include 'city' in the dependency array

  const refetch = async () => {
    // Call fetchData to reload attractions
    await fetchData();
  };

  return { attractions, error, refetch }; // Return refetch function along with attractions and error
};

export default useAttractions;
