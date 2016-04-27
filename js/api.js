var baseUrl = 'api20160426022719.azurewebsites.net'
var apiUrl  = 'http://' + baseUrl + '/api'

/**
 * A wrapper for the fetch API.
 */
function getJson(url) {
  return fetch(apiUrl + url).then(response => {
    if (!response.ok) throw response.status
    return response.json()
  })
}

function getBuildings() {
  return getJson('/buildings')
}

function getFloors(buildingid) {
  return getJson(`/buildings/${buildingid}`)
}

function getFloor(buildingid, floor) {
  return getJson(`/buildings/${buildingid}/floors/${floor}`)
}

function getHistory(roomId, type, startDate, endDate) {
  var url = `/history/${roomId}/${type}?start=${startDate}`
  if(endDate) url += `&end=${endDate}`
  return getJson(url)
}

function addWebSocket(onmessage) {
  var ws = new WebSocket(`ws://${baseUrl}/ws`)
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
