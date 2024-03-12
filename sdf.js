//SDF.js
const axios = require("axios");

// Replace this SPARQL query with the one mentioned above
const sparqlQuery = `
SELECT ?abstract
WHERE {
  <http://dbpedia.org/resource/Madison_Square_and_Madison_Square_Park> dbo:abstract ?abstract .
  FILTER (LANG(?abstract) = 'en')
}
`;

// Set the DBpedia SPARQL endpoint URL
const sparqlEndpoint = "http://dbpedia.org/sparql";

// Set the request headers with an explicit Accept header
const headers = {
  Accept: "application/sparql-results+json",
};

// Set the SPARQL query parameters
const params = {
  query: sparqlQuery,
  format: "json",
};

// Make the SPARQL query request using axios
axios
  .get(sparqlEndpoint, { headers, params })
  .then((response) => {
    // Print the status code and content of the response
    console.log("Status Code:", response.status);
    console.log("Response Content:", response.data);

    // Check if the response is successful
    if (response.status === 200) {
      try {
        // Try to parse the JSON content
        const data = response.data;

        // Extract the abstract
        const abstract = data.results.bindings[0].abstract.value;

        // Print the abstract
        if (abstract) {
          console.log("Colchester Castle Abstract:", abstract);
        } else {
          console.log("Abstract not found for Colchester Castle.");
        }
      } catch (error) {
        console.error("Error processing response:", error);
      }
    }
  })
  .catch((error) => {
    // Print an error message if the request was not successful
    console.error(`Error: ${error.response.status}, ${error.response.data}`);
  });
