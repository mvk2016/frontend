var React    = require('react');
var ReactDom = require('react-dom');

export class Floorswitch extends React.Component {
  handleFloorChange(num) {
    return event => this.props.onFloorChange(num);
  }
  render() {
    var floors = this.props.floors.map(num => {
      var extra = num === this.props.currentFloor ? " current-floor-button" : '';
      return (
        <div key={num}
             className={"floor-button" + extra}
             onClick={this.handleFloorChange(num)}>
          {num}
        </div>
      )
    })
    return (
      <div className="floor-switch-container">
        <div className="floor-switch-heading">
          FLOOR
        </div>
        {floors}
      </div>
    )
  }
}

module.exports = Floorswitch
