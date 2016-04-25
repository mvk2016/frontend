var React    = require('react')
var ReactDom = require('react-dom')

export class Floorswitch extends React.Component {
  constructor(props) {
    super(props)
    this.handleFloorClick = this.handleFloorClick.bind(this)
  }

  handleFloorClick(num) {
    return event => this.props.onFloorChange(num)
  }
  
  render() {
    var floors = this.props.floors.map(floor => {
      var current = floor === this.props.floor ? ' current-floor-button' : ''
      return (
        <div key={num}
             className={'floor-button' + current}
             onClick={this.handleFloorClick(floor)}>
          {num}
        </div>
      )
    })
    return (
      <div className='floor-switch-container'>
        <div className='floor-switch-heading'>
          FLOOR
        </div>
        {floors}
      </div>
    )
  }
}

module.exports = Floorswitch
