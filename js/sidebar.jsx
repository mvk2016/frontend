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

  componentWillReceiveProps(props) {
    if (props.roomId &&
        this.props.roomId === props.roomId &&
        this.props.data === props.data) {
      this.setState({visible: !this.state.visible})
    }
    else if(this.props.roomId !== props.roomId) {
      this.setState({visible: true})
      this.getHistory(moment().subtract(1, 'day'))
    }
  }

  getHistoryCallback(startDate) {
    return () => this.getHistory(startDate)
  }

  getHistory(startDate) {
    this.setState({loaded: false})
    var roomId = this.props.roomId
    var type = this.props.mapContext
    api.getHistory(roomId, type, startDate.toISOString()).then(json => {
      this.setState({history: json, loaded: true})
    })
  }

  handleClose() {
    this.setState({visible: false});
  }

  render() {
    var {data, name} = this.props
    var {loaded, history, visible} = this.state

    var chartData = loaded ? {labels: history.labels, datasets:[{data: history.data}]} : false
    
    var animation = visible ? 'animate-in' : 'animate-out'    
    return (
      <div id='sidebar' className={'animate ' + animation}>
        <span onClick={this.handleClose} 
              className='close'>&#10006;</span>

        <h1>{name}</h1>

        {data.length === 0 ? 
          (<div className='missing'>There are no sensors in this room</div>) : 
          (<div>
            <div className='item'>
              <div className='item-head'>
                <h2>Current Data</h2>
              </div>
              <div className='item-list'>
                {
                  data.map(item => (
                    <div key={item.type}>
                      <span>{item.type}</span>
                      <span className='data' title={item.collected}>
                        {Math.round(item.value * 10)/10}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className='item'>
              <div className='item-head'>
                <h2>Historical Data</h2>
              </div>

              <div className='item-range-select'>
                <a onClick={this.getHistoryCallback(moment().subtract(1, 'day'))}>1 Day</a>
                <a onClick={this.getHistoryCallback(moment().subtract(3, 'day'))}>3 Day</a>
                <a onClick={this.getHistoryCallback(moment().subtract(1, 'week'))}>1 Week</a>
                <a onClick={this.getHistoryCallback(moment().subtract(1, 'month'))}>1 Month</a>
              </div>

              <Loader loaded={loaded}>
                <LineChart data={chartData} />
              </Loader>
            </div>
          </div>
        )}
      </div>
    )
  }
}

module.exports = Sidebar
