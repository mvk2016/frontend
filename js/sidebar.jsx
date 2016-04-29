var React     = require('react')

var moment = require('moment')

var CurrentCard = require('./sidebar/current-card.jsx')
var HistoryCard = require('./sidebar/history-card.jsx')

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }

    this.handleClose = this.handleClose.bind(this)
  }

  componentWillReceiveProps(props) {
    if (props.roomId &&
        this.props.roomId === props.roomId &&
        this.props.data === props.data &&
        this.props.mapContext === props.mapContext) {
      this.setState({visible: !this.state.visible})
    }
    else if(this.props.roomId !== props.roomId) {
      this.setState({visible: true})
    }
  }

  handleClose() {
    this.setState({visible: false});
  }

  render() {
    var {data, name, roomId, mapContext} = this.props
    var {visible} = this.state

    var animation = visible ? 'animate-in' : 'animate-out'
    return (
      <div id='sidebar' className={'animate ' + animation}>
        <span onClick={this.handleClose} className='close'>&#10006;</span>

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
}

module.exports = Sidebar
