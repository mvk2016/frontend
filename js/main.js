var GoogleMapsLoader  = require('google-maps')
var io                = require('socket.io-client')

var api               = require('./apiWrapper.js')
var styles            = require('./styles.js')
var sidebar           = require('./sidebar.jsx')

var map;
var currentFloor,
    currentFloorid;
var socket            = io(api.baseUrl)

/**
  * Load the map into the div with id 'map'
  */
GoogleMapsLoader.load(function(google) {
  var mapDiv = document.getElementById('map');

  map = new google.maps.Map(mapDiv, {
    center: {lat: 59.3465985, lng: 18.0737873},
    zoom: 20
  });
  
  //TODO: move zoom controll

  map.data.addHandler('click', event => {
    sidebar.renderSidebar(currentFloorid, event.feature)
    event.feature.setProperty('active', true)
  })

  map.data.addHandler('mouseover', event => {
    event.feature.setProperty('active', true)
  })

  map.data.addHandler('mouseout', event => {
    event.feature.setProperty('acrive', false)
  })

  setFloor('testfloor');
})

/**
 * Fetch floor data and draw the floor
 */
function setFloor(floorid) {
  api.getFloor(floorid).then(json => addRooms(json));
  currentFloorid = floorid;
}

function addRooms(json) {
  if(currentFloor) map.removeLayer(currentFloor)

  currentFloor = map.data.addGeoJson(json);

  map.fitBounds(getBounds(currentFloor))
}

function getBounds(features) {
    var bounds = new google.maps.LatLngBounds();
    features.map(feature => bounds.extend(feature))
    return bounds;
}













/*



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










var L       = require('leaflet')

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    maxNativeZoom: 18
}).addTo(map)

map.zoomControl.setPosition("bottomright")





*/
