var L             = require('leaflet')

var getJson       = require('./getJson')
var styles        = require('./styles.js')
var renderSidebar = require('./sidebar.jsx')

var map = L.map('map')

var currentFloor;

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    maxNativeZoom: 18
}).addTo(map)

map.zoomControl.setPosition("bottomright")

setFloor('/api/geo.json')

function setFloor(url) {
  getJson(url).then(json => addRooms(json))
}

function addRooms(json) {
  function clickHandler(e) {
    renderSidebar(e.target.feature.properties)
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

  if(currentFloor) map.removeLayer(currentFloor)

  currentFloor = L.geoJson(json, {
    style: styles.random,
    onEachFeature: addHandlers
  })

  map.addLayer(currentFloor)
  map.fitBounds(currentFloor.getBounds())
}

function setStyleFunction(style) {
  currentFloor.eachLayer(function(layer) {
    layer.options.style = style
    layer.setStyle(style(layer.feature))
  });
}

function updateRoom(id, newItem) {
  currentFloor.eachLayer(function(layer) {
    var props = layer.feature.properties
    if(props.id === id) {
      props.data = props.data.map(item => item.name == newItem.name ? newItem : item)
      layer.setStyle(layer.options.style(layer.feature))
      renderSidebar(props)
    }
  });
}
