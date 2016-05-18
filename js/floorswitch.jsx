var React = require('react')

function Floorswitch(props) {
  var floors = props.floors.map(floor => {
    var current = floor === props.floor ? ' current-floor-button' : ''
    return (
      <div key={floor}
           className={'floor-button' + current}
           onClick={e => props.onFloorChange(floor)}>
        {floor}
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

module.exports = Floorswitch
