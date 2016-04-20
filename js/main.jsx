var React    = require('react');
var ReactDom = require('react-dom');

var api = require('./api.js');

var TopBar       = require('./topbar.jsx');
var SideBar      = require('./sidebar.jsx');
var Floorswitch  = require('./floorswitch.jsx');

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentBuildingId: 0,
      floors: ['testfloor'],
      currentFloorId: 'testfloor',
      sidebarProps: null,
      map: null
    }
    
    this.loadBuilding = this.loadBuilding.bind(this);
    this.loadMap      = this.loadMap.bind(this);
    this.setFloor     = this.setFloor.bind(this);
    this.updateRoom   = this.updateRoom.bind(this);

    this.loadMap({
      center: {lat:59.34669, lng: 18.07372},
      zoom: 20,
      mapTypeControl: false,
      streetViewControl: false
    });

    api.addWebSocket(this.updateRoom);
  }

  loadBuilding(buildingid) {
    api.getFloors(buildingid).then(floors => {
      this.setState({
        currentBuildingId: buildingid,
        floors: floors
      });
      if(floors.length > 0)
        this.setFloor(floors[0]);
    });
  }

  loadMap(options) {
    require('google-maps').load(google => {
      var map = new google.maps.Map(document.getElementById('map'), options);
      
      map.data.addListener('click', 
        e => this.setState({sidebarProps: e.feature.R}));
      
      map.data.addListener('mouseover', 
        e => e.feature.setProperty('active', true));
      
      map.data.addListener('mouseout',
        e => e.feature.setProperty('active', false));
      
      this.setState({map: map});
      this.loadBuilding(this.state.currentBuildingId);
    })
  }

  setFloor(floorid) {
    var currentFloor = this.state.currentFloor;
    var map = this.state.map;
    api.getFloor(floorid).then(json => {
      map.data.forEach(feature => map.data.remove)
      this.setState({
        currentFloorId: floorid,
        currentFloor: map.data.addGeoJson(json, {idPropertyName: 'roomid'})
      });
      //map.fitBounds(getBounds(json)); //TODO: implement getBounds
    });
  }

  updateRoom(json) {
    var feature = this.state.map.getFeatureById(json.roomid);
    var oldData = feature.getProperty('data');
    var newData = oldData.map(item => item.name === json.name ? json : item);
    feature.setProperty('data', newData);
    if(json.roomid === sidebarProps.roomid) {
      this.setState({
        sidebarProps: Object.assign({}, sidebarProps, {data: newData})
      })
    }
  }

  render() {
    return (
      <div>
        <TopBar setStyle={x => this.state.map.data.setStyle(x)} />

        <SideBar {...this.state.sidebarProps} />
        
        <Floorswitch floors={this.state.floors}
                     currentFloor={this.state.currentFloorId}
                     onFloorChange={this.setFloor} />
      </div>
    )
  }
}

ReactDom.render(<Main />, document.getElementById('container'));
