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

  loadMap(options) {
    require('google-maps').load(google => {
      var map = new google.maps.Map(document.getElementById('map'), options)
      
      map.data.addListener('click', 
        e => this.setState({
          data: e.feature.getProperty('data'),
          roomId: e.feature.getProperty('roomId'),
          name: e.feature.getProperty('name')
        }))
      
      map.data.addListener('mouseover', 
        e => e.feature.setProperty('active', true))
      
      map.data.addListener('mouseout',
        e => e.feature.setProperty('active', false))

      this.setState({map})
      window.map = map
      this.getBuilding(871073)
      this.setMapContext(this.state.mapContext)
    })
  }

  setMapContext(mapContext) {
    this.setState({mapContext})
    this.state.map.data.setStyle(styles[mapContext] || styles.grey)
  }

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

  getFloors(buildingid) {
    api.getFloors(buildingid).then(({floors}) => {
      this.setState({floors})
      //set current floor to first floor
      if(floors.length > 0) this.setFloor(floors[0])
    })
  }

  setFloor(floor) {
    var {map} = this.state
    api.getFloor(this.state.buildingId, floor).then(json => {
      //remove old features and add new
      map.data.forEach(feature => map.data.remove(feature))
      map.data.addGeoJson(json, {idPropertyName: 'roomId'})
      this.setState({floor})
      //map.fitBounds(getBounds(json)) //TODO: implement getBounds
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

  updateRoom(json) {
    var feature = this.state.map.data.getFeatureById(json.roomId)

    //data recieived was not on the current floor
    if(!feature) return;

    //remove old data item
    var data = feature.getProperty('data').filter(i => i.type !== json.type)
    //add new data item
    data.push({
      roomId: json.roomId,
      type: json.type,
      value: json.value,
      collected: json.collected
    })
    feature.setProperty('data', data)

    //room is shown in sidebar, also update sidebar
    if(json.roomId === sidebarProps.roomId)
      this.setState({sidebarProps: Object.assign({}, sidebarProps, {data})})
  }

  render() {
    return (
      <div>
        <Topbar buildingName={this.state.buildingName}
                buildings={this.state.buildings}
                getBuilding={this.getBuilding}
                setMapContext={this.setMapContext}
                mapContext={this.state.mapContext} />

        <Sidebar data={this.state.data}
                 roomId={this.state.roomId}
                 name={this.state.name}
                 mapContext={this.state.mapContext}/>
        
        <Floorswitch floors={this.state.floors}
                     floor={this.state.floor}
                     onFloorChange={this.setFloor} />
      </div>
    )
  }
}

ReactDom.render(<Main />, document.getElementById('container'))
