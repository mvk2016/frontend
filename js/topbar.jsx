var React    = require('react')
var ReactDom = require('react-dom')

var api      = require('./api.js')
var styles   = require('./styles.js')

class Topbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      context: styles.tempToColor
    }

    this.setStyle = this.setStyle.bind(this)

    this.handleBuildingChange = this.handleBuildingChange.bind(this)
  }

  setStyle(context) {
    return event => {
      this.setState({context})
      this.props.setStyle(context)
    }
  }

  handleBuildingChange() {
    var {buildings, buildingName} = this.state
    //find index of next building in list
    var index = buildings.map(b => b.name === buildingName).indexOf(true) + 1
    //if that index exists use its id, else use 0
    var id = buildings[index] ? buildings[index].id : buildings[0].id
    this.props.setBuilding(id)
  }

  render() {
    var {data} = this.props
    var {tempToColor, utilToColor, humdToColor} = styles

    var isActive = c => this.state.context === c ? 'active-view': ''

    return (
      <div id='topbar'>
        <div id='icon'>
          <img src={'imgs/y-logo-small.png'} className='resize' />
        </div>

        <div id='topbar-title'>
          Yanzi smart map
        </div>
        
        <div onClick={this.setStyle(utilToColor)}
             className={'controller ' + isActive(utilToColor)}>
            &#9281
        </div>
        
        <div onClick={this.setStyle(tempToColor)}
             className={'controller ' + isActive(tempToColor)}>
            &#8451
        </div>

        <div onClick={this.setStyle(humdToColor)}
             className={'controller ' + isActive(humdToColor)}>
           &#128167
        </div>

        <div id='location' onClick={this.handleBuildingChange}>
          {this.props.buildingName}
        </div>
      </div>
    )
  }
}

module.exports = Topbar
