require('whatwg-fetch')

var React    = require('react')
var ReactDom = require('react-dom')

var Topbar      = require('./topbar.jsx')
var Sidebar     = require('./sidebar.jsx')
var Floorswitch = require('./floorswitch.jsx')

var api         = require('./api.js')
var styles      = require('./styles.js')

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buildings: [],
      buildingId: 0,
      buildingName: '',
      floors: [],
      floor: false,
      data: [],
      roomId: false,
      name: false,
      mapContext: 'temperature',
      map: false
    }

    this.loadMap       = this.loadMap.bind(this)
    this.setMapContext = this.setMapContext.bind(this)
    this.getBuilding   = this.getBuilding.bind(this)
    this.nextBuilding  = this.nextBuilding.bind(this)
    this.getFloors     = this.getFloors.bind(this)
    this.setFloor      = this.setFloor.bind(this)
    this.updateRoom    = this.updateRoom.bind(this)

    this.loadMap({
      center: {lat:59.34669, lng: 18.07372},
      zoom: 20,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false
    })

    api.addWebSocket(this.updateRoom)
  }

  /**
   * Loads the map and add a few handlers to it so that we can interact with it.
   */
  loadMap(options) {
    require('google-maps').load(google => {
      var map = new google.maps.Map(document.getElementById('map'), options)
      
      map.data.addListener('click', 
        e => {
          var roomId = e.feature.getProperty('roomId')

          // If the same room is clicked toggle the sidebar, else always open it.
          var visible = roomId === this.state.roomId ? !this.state.visible : true

          this.setState({
                roomId,
                visible,
                data: e.feature.getProperty('data'),
                name: e.feature.getProperty('name')
          })
        })
      
      map.data.addListener('mouseover', 
        e => e.feature.setProperty('active', true))
      
      map.data.addListener('mouseout',
        e => e.feature.setProperty('active', false))

      this.setState({map})
      //window.map = map // useful when debuging

      this.getBuilding(871073) //Could also pass in nothing
      this.setMapContext(this.state.mapContext)
    })
  }

  /**
   * Changes the map context to the provided context.
   * If the provided context doesnt exist it defaults to gray.
   */
  setMapContext(mapContext) {
    this.setState({mapContext})
    this.state.map.data.setStyle(styles[mapContext] || styles.grey)
  }

  /**
   * Changes the building to the next building in the buildings list.
   */
  nextBuilding() {
    var {buildings, buildingName} = this.state
    //find index of next building in list
    var index = buildings.map(b => b.name === buildingName).indexOf(true) + 1
    //if that index exists use its id, else use 0
    var id = buildings[index] ? buildings[index].id : buildings[0].id
    this.getBuilding(id)
  }

  /**
   * Changes current building and gets floors for building.
   */
  getBuilding(id) {
    api.getBuildings().then(({buildings}) => {
      var filtered = buildings.filter(b => b.id === id)
      var building
      if(filtered.length === 1)
        building = filtered[0]
      else if(buildings.length > 0)
        building = buildings[0]
      else
        throw 'No building found'

      this.setState({
        buildings: buildings,
        buildingId: building.id,
        buildingName: building.name
      })
      this.getFloors(building.id)
    })
  }

  /**
   * Gets floors for a building and sets current floor if one exists.
   */
  getFloors(buildingid) {
    api.getFloors(buildingid).then(({floors}) => {
      this.setState({floors})
      //set current floor to first floor
      if(floors.length > 0) this.setFloor(floors[0])
    })
  }

  /**
   * Gets floor data and adds it to the maps.
   */
  setFloor(floor) {
    var {map} = this.state
    api.getFloor(this.state.buildingId, floor).then(json => {
      //remove old features and add new
      map.data.forEach(feature => map.data.remove(feature))
      map.data.addGeoJson(json, {idPropertyName: 'roomId'})
      this.setState({floor, visible: false})
      //map.fitBounds(getBounds(json)) //TODO: implement getBounds to automatically center map around building
    }).catch(code => {
      if(code == 404) {
        console.log("No rooms on that floor.")
        //still remove old rooms and update floor state
        map.data.forEach(feature => map.data.remove(feature))
        this.setState({floor})
      }
      else throw code
    })
  }

  /**
   * Handles incoming websocket messages by adding their data to the map.
   */
  updateRoom(json) {
    var feature = this.state.map.data.getFeatureById(json.roomId)

    // Data recieived was not on the current floor
    if(!feature) return;

    // Remove old data item
    var data = feature.getProperty('data').filter(i => i.type !== json.type)
    // Add new data item
    data.push({
      roomId: json.roomId,
      type: json.type,
      value: json.value,
      collected: json.collected
    })
    // Replace the data property
    feature.setProperty('data', data)

    // If room is shown in sidebar, also update sidebar
    if(json.roomId === sidebarProps.roomId)
      this.setState({sidebarProps: Object.assign({}, sidebarProps, {data})})
  }

  render() {
    return (
      <div>
        <Topbar buildingName={this.state.buildingName}
                nextBuilding={this.nextBuilding}
                setMapContext={this.setMapContext}
                mapContext={this.state.mapContext} />

        <Sidebar data={this.state.data}
                 roomId={this.state.roomId}
                 name={this.state.name}
                 visible={this.state.visible}
                 onClose={() => this.setState({visible: false})}
                 mapContext={this.state.mapContext}/>
        
        <Floorswitch floors={this.state.floors}
                     floor={this.state.floor}
                     onFloorChange={this.setFloor} />
      </div>
    )
  }
}

ReactDom.render(<Main />, document.getElementById('container'))
