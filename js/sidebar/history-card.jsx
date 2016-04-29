var React     = require('react')
var Loader    = require('react-loader')
var LineChart = require('react-chartjs').Line

var moment    = require('moment')

var Card      = require('./card.jsx')
var api       = require('../api.js')

class HistoryCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      history: {labels: [], data: []}
    }
    this.getHistory         = this.getHistory.bind(this)
    this.getHistoryCallback = this.getHistoryCallback.bind(this)
  }

  componentDidMount(props) {
    this.getHistory(moment().subtract(1, 'day'), this.props.roomId)  
  }

  componentWillReceiveProps(props) {
    this.getHistory(moment().subtract(1, 'day'), props.roomId)  
  }

  getHistoryCallback(startDate) {
    return () => this.getHistory(startDate)
  }

  getHistory(startDate, roomId = this.props.roomId) {
    this.setState({loaded: false})
    var type = this.props.mapContext
    api.getHistory(roomId, type, startDate.toISOString()).then(json => {
      this.setState({history: json, loaded: true})
    })
  }

  render() {
    var {loaded, history} = this.state
    var chartData = loaded ? {labels: history.labels, datasets:[{data: history.data}]} : false
    return (
      <Card title='Historical Data'>
        <div className='item-range-select'>
          <a onClick={this.getHistoryCallback(moment().subtract(1, 'day'))}>1 Day</a>
          <a onClick={this.getHistoryCallback(moment().subtract(3, 'day'))}>3 Day</a>
          <a onClick={this.getHistoryCallback(moment().subtract(1, 'week'))}>1 Week</a>
          <a onClick={this.getHistoryCallback(moment().subtract(1, 'month'))}>1 Month</a>
        </div>

        <Loader loaded={loaded}>
          <LineChart data={chartData} />
        </Loader>
      </Card>
    )
  }
}

module.exports = HistoryCard
