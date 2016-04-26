var React     = require('react')
var ReactDom  = require('react-dom')
var LineChart = require('react-chartjs').Line
var Loader    = require('react-loader')
var moment    = require('moment')

var api       = require('./api.js')

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      history: {labels: [], datasets: []},
      loaded: false
    }

    this.handleClose = this.handleClose.bind(this)
    this.getHistory  = this.getHistory.bind(this)
  }

  componentDidMount() {
    this.getHistory()
  }

  componentWillReceiveProps(props) {
    if (props.roomid &&
        this.props.roomid === props.roomid &&
        this.props.data === props.data) {
      this.setState({visible: !this.state.visible})
    }
    else if(this.props.roomid !== props.roomid) {
      this.setState({visible: true})
      this.getHistory(props.roomid)
    }
  }

  getHistory(startDate) {
    return event => {
      this.setState({loaded: false})
      var roomid = this.props.roomid
      var type = this.props.mapContext
      api.getHistory(roomid, type, startDate.format()).then(json => {
        this.setState({history: json, loaded: true})
      })
    }
  }

  handleClose() {
    this.setState({visible: false});
  }

  render() {
    var data = this.props.data
    var animation = this.state.visible ? 'animate-in' : 'animate-out'
    return (
      <div id='sidebar' className={'animate ' + animation}>
        <span onClick={this.handleClose} 
              className='sidebar-close'>&#10006;</span>

        <h1>{this.props.name}</h1>

        <div className='sidebar-item'>
          <div className='sidebar-item-head'>
            <h2>Current Data</h2>
          </div>
          <div className='sidebar-item-list'>
            {
              data.map(item => (
                <div key={item.type}>
                  <span>{item.type}</span>
                  <span className='data-item' title={item.collected}>
                    {Math.round(item.value * 10)/10}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
        <div className='sidebar-item'>
          <div className='sidebar-item-head'>
            <h2>Historical Data</h2>
          </div>

          <div className='sidebar-range-select'>
            <a onClick={this.getHistory(moment().subtract(1, 'day'))}>1 Day</a>
            <a onClick={this.getHistory(moment().subtract(3, 'day'))}>3 Day</a>
            <a onClick={this.getHistory(moment().subtract(1, 'week'))}>1 Week</a>
            <a onClick={this.getHistory(moment().subtract(1, 'month'))}>1 Month</a>
          </div>

          <Loader loaded={this.state.loaded}>
            <LineChart data={this.state.history} />
          </Loader>
        </div>
      </div>
    )
  }
}

module.exports = Sidebar
