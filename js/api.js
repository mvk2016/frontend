var baseUrl = 'localhost:8001'
var apiUrl  = 'http://' + baseUrl + '/api'

/**
 * A wrapper for the fetch API.
 */
function getJson(url) {
  return fetch(apiUrl + url).then(response => response.json())
}

function getFloors(buildingid) {
  return getJson(`/buildings/${buildingid}/floors`)
}

function getFloor(buildingid, floorid) {
  return getJson(`/buildings/${buildingid}/floors/${floorid}`)
}

function getHistory(roomid) {
  return getJson(`/rooms/${roomid}/history`)
}

function addWebSocket(callback) {
  var ws = new WebSocket('ws://' + baseUrl)
  
  ws.onmessage = callback
  
  return ws.close
}

module.exports = {
  baseUrl,
  getJson,
  getFloors,
  getFloor,
  getHistory,
  addWebSocket
};
