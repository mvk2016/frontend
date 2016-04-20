var React    = require('react');
var ReactDom = require('react-dom');
var styles   = require('./styles.js');
var allFloors, 
    currentFloorId;

class FloorSwitchComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      loaded: true
    }
  }

  render() {
    console.log(allFloors);
    return (
      <div className="floor-switch-container">
        <div className="floor-switch-heading">
          FLOOR
        </div>

        {
          allFloors.map(function(thisFloor) {
            console.log(thisFloor);
            var buttonClass = "floor-button";
            if (thisFloor == currentFloorId) {
              buttonClass += " current-floor-button";
            }
            return (
              <button className={buttonClass}>
               {thisFloor}
              </button>
            )
          })
        }


      </div>
    )
  }
}

function renderFloorSwitch(newAllFloors, newCurrentFloorId) {
  allFloors = newAllFloors;
  currentFloorId = newCurrentFloorId;

  ReactDom.render(
    <FloorSwitchComponent allFloors={allFloors}
                          currentFloorId={currentFloorId} />,
    document.querySelector("#floorswitch")
  );
}

module.exports = {
  renderFloorSwitch
}
