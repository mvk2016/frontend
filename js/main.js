var L             = require('leaflet')

var getJson       = require('./getJson')
var renderSidebar = require('./sidebar.jsx')

var map = L.map('map')

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    maxNativeZoom: 18
}).addTo(map)

map.zoomControl.setPosition("bottomright")

getJson('/api/geo.json').then(json => addRooms(json))

function addRooms(json) {
  function style(feature) {
    return { 
      color: feature.properties.fill,
      stroke: 0
    }
  }

  function clickHandler(e) {
    renderSidebar(e.target.feature.properties.id)
  }

  function hoverHandler(e) {
    e.target.setStyle({
        stroke: 1,
    });
  }
  
  function leaveHandler(e) {
    e.target.setStyle({
        stroke: 0,
    });
  }

  function addHandlers(feature, layer) {
    layer.on({
      click: clickHandler,
      mouseover: hoverHandler,
      mouseout: leaveHandler
    })
  }

  var geoJson = L.geoJson(json, {
    style: style,
    onEachFeature: addHandlers
  })

  geoJson.addTo(map)
  map.fitBounds(geoJson.getBounds())
}
