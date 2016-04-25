var baseUrl = 'localhost:8001'
var apiUrl  = 'http://' + baseUrl + '/api'

/**
 * A wrapper for the fetch API.
 */
function getJson(url) {
  return fetch(apiUrl + url).then(response => {
    if (!response.ok) throw response.status
    response.json()
  })
}

function getBuildings() {
  return getJson('/buildings')
}

function getFloors(buildingid) {
  return getJson(`/buildings/${buildingid}/floors`)
}

function getFloor(buildingid, floor) {
  return getJson(`/buildings/${buildingid}/floors/${floor}`)
}

function getHistory(roomid) {
  return getJson(`/rooms/${roomid}/history`)
}

function addWebSocket(onmessage) {
  var ws = new WebSocket('ws://' + baseUrl)
  ws.onmessage = onmessage
  return ws.close
}

module.exports = {
  getBuildings,
  getFloors,
  getFloor,
  getHistory,
  addWebSocket
};
