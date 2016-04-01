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

  map.data.addListener('click', event => {
    sidebar.renderSidebar(currentFloorid, event.feature)
    event.feature.setProperty('active', true)
  })

  map.data.addListener('mouseover', event => {
    event.feature.setProperty('active', true)
  })

  map.data.addListener('mouseout', event => {
    event.feature.setProperty('active', false)
  })
  
  map.data.setStyle(styles.tempToColor);
  
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

  currentFloor = map.data.addGeoJson(json, {idPropertyName: 'roomid'});

  map.fitBounds(getBounds(currentFloor))
}

function getBounds(features) {
    var bounds = new google.maps.LatLngBounds();
    features.map(feature => bounds.extend(feature))
    return bounds;
}

function updateRoom(roomid, newItem) {
  var feature = map.data.getFeatureById(roomid);
  feature.setProperty('data', feature.getProperty('data').map(item => item.name == newItem.name ? newItem : item))
}

socket.on('event', data => updateRoom(data.roomid, data.data));
