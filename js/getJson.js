/**
 * A wrapper for the fetch API.
 */
function getJson(url) {
  return fetch(url).then(response => response.json());
}

module.exports = getJson;
