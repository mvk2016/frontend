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
    var {data, mapContext} = this.props

    var isActive = c => c === mapContext ? ' active-view': ''

    return (
      <div id='topbar'>
        <img className='left' src={'imgs/y-logo.png'} />
        <div className='left'>
          Yanzi smart map
        </div>
        
        <div onClick={() => this.props.setMapContext('utilization')}
             className={'controller' + isActive('utilization')}>
            &#9281;
        </div>
        <div onClick={() => this.props.setMapContext('temperature')}
             className={'controller' + isActive('temperature')}>
            &#8451;
        </div>
        <div onClick={() => this.props.setMapContext('humidity')}
             className={'controller' + isActive('humidity')}>
           &#128167;
        </div>

        <div className='center' onClick={this.handleBuildingChange}>
          {this.props.buildingName}
        </div>
      </div>
    )
  }
}

module.exports = Topbar
