var React    = require('react')
var ReactDom = require('react-dom')

var api      = require('./api.js')

class Topbar extends React.Component {
  constructor(props) {
    super(props)

    this.handleBuildingChange = this.handleBuildingChange.bind(this)
  }

  handleBuildingChange() {
    var {buildings, buildingName} = this.props
    //find index of next building in list
    var index = buildings.map(b => b.name === buildingName).indexOf(true) + 1
    //if that index exists use its id, else use 0
    var id = buildings[index] ? buildings[index].id : buildings[0].id
    this.props.getBuilding(id)
  }

  render() {
    var {data} = this.props

    var isActive = c => this.props.mapContext === c ? 'active-view': ''

    return (
      <div id='topbar'>
        <div id='icon'>
          <img src={'imgs/y-logo-small.png'} className='resize' />
        </div>

        <div id='topbar-title'>
          Yanzi smart map
        </div>
        
        <div onClick={() => this.props.setMapContext('utilization')}
             className={'controller ' + isActive('utilization')}>
            &#9281;
        </div>
        
        <div onClick={() => this.props.setMapContext('temperature')}
             className={'controller ' + isActive('temperature')}>
            &#8451;
        </div>

        <div onClick={() => this.props.setMapContext('humidity')}
             className={'controller ' + isActive('humidity')}>
           &#128167;
        </div>

        <div id='location' onClick={this.handleBuildingChange}>
          {this.props.buildingName}
        </div>
      </div>
    )
  }
}

module.exports = Topbar
