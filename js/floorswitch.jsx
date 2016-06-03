var React = require('react')

/**
 * Shows a list of floors and allows the user to change the floor.
 * Required props:
 * floor - the current floor
 * floors - a list of all floors
 * onFloorChange - a function that handles the actual floor-switching
 */
function Floorswitch(props) {
  // First, create a list of floors
  var floors = props.floors.map(floor => {
    // Add a highligting class if its the current floor
    var current = floor === props.floor ? ' current-floor-button' : ''

    return (
      <div key={floor}
           className={'floor-button' + current}
           onClick={e => props.onFloorChange(floor)}>
        {floor}
      </div>
    )
  })

  // Then wrap them in some more markup
  return (
    <div className='floor-switch-container'>
      <div className='floor-switch-heading'>
        FLOOR
      </div>
      {floors}
    </div>
  )
}

module.exports = Floorswitch
