/**
 * A wrapper for the fetch API.
 */
const getJson = url => fetch(url)
  .then(response => response.json());
