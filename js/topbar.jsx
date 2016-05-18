var React = require('react')

var api = require('./api.js')

function Topbar(props) {
  var isActive = c => c === props.mapContext ? ' active-view': ''

  return (
    <div id='topbar'>
      <img className='left' src={'imgs/y-logo.png'} />
      <div className='left'>
        Yanzi smart map
      </div>

      <div onClick={() => props.setMapContext('utilization')}
           className={'controller' + isActive('utilization')}>
          <span className='fa fa-pie-chart'></span>
      </div>
      <div onClick={() => props.setMapContext('temperature')}
           className={'controller' + isActive('temperature')}>
          <span className='fa fa-fire'></span>
      </div>
      <div onClick={() => props.setMapContext('humidity')}
           className={'controller' + isActive('humidity')}>
          <span className='fa fa-tint'></span>
      </div>

      <div className='center' onClick={props.nextBuilding}>
        {props.buildingName}
      </div>
    </div>
  )
}

module.exports = Topbar
