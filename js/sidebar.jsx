var React     = require('react')
var ReactDom  = require('react-dom')
var LineChart = require('react-chartjs').Line
var Loader    = require('react-loader')

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
    this.getHistory = this.getHistory.bind(this)
  }

  componentDidMount() {
    this.getHistory(this.props.roomid)
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

  getHistory(roomid) {
    this.setState({loaded: false})
    api.getHistory(roomid).then(json => {
      this.setState({history: json, loaded: true})
    })
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
              className='glyphicon glyphicon-remove close'></span>

        <h1>{this.props.name}</h1>

        <div className='sidebar-item'>
          <div className='sidebar-item-head'>
            <h2>Data</h2>
          </div>
          <div className='sidebar-item-list'>
            {
              data.map(item => (
                <div key={item.name}>
                  <span>{item.name}</span>
                  <span className='data-item'>
                    {Math.round(item.value * 10)/10}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
        <div className='sidebar-item'>
          <div className='sidebar-item-head'>
            <h2>Chart</h2>
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
