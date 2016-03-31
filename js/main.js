var GoogleMapsLoader  = require('google-maps')
var io                = require('socket.io-client')

var api               = require('./apiWrapper.js')
var styles            = require('./styles.js')
var sidebar           = require('./sidebar.jsx')

var map;
var socket = io(api.baseUrl)

GoogleMapsLoader.load(function(google) {
  var mapDiv = document.getElementById('map');

  map = new google.maps.Map(mapDiv, {
    center: {lat: 59.3465985, lng: 18.0737873},
    zoom: 20
  });
})















/*
var L       = require('leaflet')


var currentFloor,
    currentFloorid;



L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    maxNativeZoom: 18
}).addTo(map)

map.zoomControl.setPosition("bottomright")

setFloor('testfloor')

function setFloor(floorid) {
  api.getFloor(floorid).then(json => addRooms(json))
  currentFloorid = floorid;
}

function addRooms(json) {
  function clickHandler(e) {
    sidebar.renderSidebar(currentFloorid, e.target.feature.properties)
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
    style: styles.tempToColor,
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

function updateRoom(roomid, newItem) {
  currentFloor.eachLayer(function(layer) {
    var props = layer.feature.properties
    if(props.roomid === roomid) {
      props.data = props.data.map(item => item.name == newItem.name ? newItem : item)
      layer.setStyle(layer.options.style(layer.feature))
      sidebar.updateSidebar(currentFloorid, props)
    }
  });
}

socket.on('event', data => updateRoom(data.roomid, data.data))
*/