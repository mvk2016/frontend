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
      current: '1day',
      history: {labels: [], data: []}
    }
    this.getHistory         = this.getHistory.bind(this)
  }

  componentDidMount(props) {
    this.getHistory(1, 'day')
  }

  componentWillReceiveProps(props) {
    this.getHistory(1, 'day', props.roomId)
  }

  getHistory(amount, unit, roomId = this.props.roomId) {
    this.setState({loaded: false, current: amount + unit})
    var startDate = moment().subtract(amount, unit).toISOString()
    var {mapContext, } = this.props
    api.getHistory(roomId, mapContext, startDate).then(json => {
      this.setState({history: json, loaded: true})
    })
  }

  render() {
    var {loaded, history, current} = this.state
    var chartData = loaded ? {labels: history.labels, datasets:[{data: history.data}]} : false
    var active = (amount, unit) => current === (amount + unit) ? 'active' : ''
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
