var React    = require('react')

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
            <span className='fa fa-pie-chart'></span>
        </div>
        <div onClick={() => this.props.setMapContext('temperature')}
             className={'controller' + isActive('temperature')}>
            <span className='fa fa-fire'></span>
        </div>
        <div onClick={() => this.props.setMapContext('humidity')}
             className={'controller' + isActive('humidity')}>
            <span className='fa fa-tint'></span>
        </div>

        <div className='center' onClick={this.handleBuildingChange}>
          {this.props.buildingName}
        </div>
      </div>
    )
  }
}

module.exports = Topbar
