var React  = require('react')
var moment = require('moment')

var CurrentCard = require('./sidebar/current-card.jsx')
var HistoryCard = require('./sidebar/history-card.jsx')
/**
 * The main sidebar component that handles the animation logic,
 * closing the sidebar, checking if there are any sensors in the
 * room, showing a last-updated value, and holds the sidebar-cars.
 */
function Sidebar(props) {
  var {data, name, roomId, mapContext, visible, onClose} = props

  // Select the correct animation class
  var animation = 'animate ' + (visible ? 'animate-in' : 'animate-out')

  return (
    <div id='sidebar' className={animation}>
      <span onClick={onClose} className='close'>&#10006;</span>

      <h1>{name}</h1>

      {data.length === 0 ?
        (<div className='subtitle'>There are no sensors in this room</div>) :
        (<div>
          <div className='subtitle'>
            Updated {moment(data.map(d => d.collected).sort()[0]).fromNow()}
          </div>

          <CurrentCard data={data} />
          <HistoryCard roomId={roomId} mapContext={mapContext} />

        </div>
      )}
    </div>
  )
}

module.exports = Sidebar
