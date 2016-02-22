var React     = require('react')
var ReactDom  = require('react-dom')
var LineChart = require('react-chartjs').Line

var getJson   = require('./getJson')

var sidebarwrapper = document.querySelector('#sidebarwrapper')

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      current: {data: []},
      history: {labels: [], datasets: []}
    }

    this.handleClose = this.handleClose.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData(this.props.roomid)
  }

  componentWillReceiveProps(props) {
    if(this.props.roomid === props.roomid) {
      this.setState({visible: !this.state.visible})
    }
    else {
      this.getData(props.roomid)
    }
  }

  getData(roomid) {
    getJson('/api/rooms/' + roomid + '.json').then(json => {
      this.setState({current: json})
    })
    getJson('/api/history/' + roomid + '.json').then(json => {
      this.setState({history: json})
      this.setState({visible: true})
    })
  }

  handleClose() {
    this.setState({visible: false})
  }

  render() {
    return this.state.visible ? (
      <div id='sidebar'>
        <span onClick={this.handleClose} className='glyphicon glyphicon-remove close'></span>
        <h1>{this.state.current.roomname}</h1>
        <div id='data'>
          <h2>Data</h2>
          <ul>
            {this.state.current.data.map(item => (
              <li key={item.name}>{item.name}: {item.value} <i>{item.lastupdate}</i></li>
            ))}
          </ul>
        </div>
        <LineChart data={this.state.history} />
      </div>
    ) : false
  }
}

function renderSidebar(roomid) {
  ReactDom.render(
    <SidebarComponent roomid={roomid} />,
    sidebarwrapper
  )
}

module.exports = renderSidebar
