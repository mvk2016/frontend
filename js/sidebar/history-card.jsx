var React     = require('react')
var Loader    = require('react-loader')
var LineChart = require('react-chartjs').Line

var moment    = require('moment')

var Card      = require('./card.jsx')
var api       = require('../api.js')

/**
 * A card that fetches and displays historical data.
 */

class HistoryCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      current: '1day',
      history: {labels: [], data: []}
    }
    this.getHistory = this.getHistory.bind(this)
  }

  /**
   * Called the first time the component is mounted, i.e when a room is first clicked.
   */
  componentDidMount(props) {
    this.getHistory(1, 'day')
  }

  /**
   * Called when a new room is clicked, passing in the new props as a parameter
   */
  componentWillReceiveProps(props) {
    this.getHistory(1, 'day', props.roomId)
  }

  /**
   * Fetches history for the current room, data type is decided by map context.
   */
  getHistory(amount, unit, roomId = this.props.roomId) {
    this.setState({loaded: false, current: amount + unit})
    var startDate = moment().subtract(amount, unit).toISOString() // A format that the API likes
    var {mapContext} = this.props
    api.getHistory(roomId, mapContext, startDate).then(json => {
      this.setState({history: json, loaded: true})
    })
  }

  render() {
    var {loaded, history, current} = this.state
    // Helper function to calculate highligh class for the current range
    var active = (amount, unit) => current === (amount + unit) ? 'active' : ''
    // Format the data to a format that ChartJS likes.
    // Should the state varable already follow this format, perhaps?
    var chartData = loaded ? {labels: history.labels, datasets:[{data: history.data}]} : false
    return (
      <Card title='Historical Data'>
        <div className='item-range-select'>
          <a className={active(1, 'day')} onClick={e => this.getHistory(1, 'day')}>1 Day</a>
          <a className={active(3, 'day')} onClick={e => this.getHistory(3, 'day')}>3 Days</a>
          <a className={active(1, 'week')} onClick={e => this.getHistory(1, 'week')}>1 Week</a>
          <a className={active(1, 'month')} onClick={e => this.getHistory(1, 'month')}>1 Month</a>
        </div>
        <Loader loaded={loaded}>
          {chartData && chartData.labels.length > 0 ?
            <LineChart data={chartData} /> :
            <span className='subtitle'>
              No data available for this period.
            </span>
          }
        </Loader>
      </Card>
    )
  }
}

module.exports = HistoryCard
