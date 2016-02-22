'use strict'

const map = L.map('map')

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    maxNativeZoom: 18
}).addTo(map)

map.zoomControl.setPosition("bottomright")

getJson('/api/geo.json').then(json => addRooms(json))

function addRooms(json) {
  const style = feature => ({
    color: feature.properties.fill,
    stroke: 0
  })

  const clickHandler = e => {
    const id = e.target.feature.properties.id
    if(sidebar.currentId != id) {
      getJson('/api/rooms/' + id + '.json')
        .then(json => {
          sidebar.render(json)
          sidebar.show()
        })
    } else {
      sidebar.toggleShow()
    }
  }

  const hoverHandler = e => {
    e.target.setStyle({
        stroke: 1,
    });
  }
  
  const leaveHandler = e => {
    e.target.setStyle({
        stroke: 0,
    });
  }

  const addHandlers = (feature, layer) => {
    layer.on({
      click: clickHandler,
      mouseover: hoverHandler,
      mouseout: leaveHandler
    })
  }

  const geoJson = L.geoJson(json, {
    style: style,
    onEachFeature: addHandlers
  })

  geoJson.addTo(map)
  map.fitBounds(geoJson.getBounds())
}
