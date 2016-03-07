var baseUrl = 'localhost:8001'
var apiUrl  = 'http://' + baseUrl + '/api'

/**
 * A wrapper for the fetch API.
 */
function getJson(url) {
  return fetch(url).then(response => response.json());
}

function getFloor(floorid) {
  return getJson(apiUrl + '/floors/' + floorid)
}

function getHistory(floorid, roomid) {
  return getJson(apiUrl + '/floors/' + floorid + '/rooms/' + roomid + '/history')
}

module.exports = {
  baseUrl,
  getJson,
  getFloor,
  getHistory
};
