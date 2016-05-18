var React  = require('react')
var moment = require('moment')

var CurrentCard = require('./sidebar/current-card.jsx')
var HistoryCard = require('./sidebar/history-card.jsx')

function Sidebar(props) {
  var {data, name, roomId, mapContext, visible, onClose} = props

  var animation = visible ? 'animate-in' : 'animate-out'
  return (
    <div id='sidebar' className={'animate ' + animation}>
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
