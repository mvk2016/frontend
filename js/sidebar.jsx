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
    var data = this.state.current.data;
    return this.state.visible ? (
      <div id='sidebar'>
        <span onClick={this.handleClose} className='glyphicon glyphicon-remove close'></span>
        <br />
        <br />

        <h1>{this.state.current.roomname}</h1>
        <br />

        <div id='data' className="sidebar_item">
          <div className="sidebar_item_head">
            <h2>Data</h2>
          </div>
          <div className="sidebar_subitem_contaier">
            {data.map((item, index) => (
              <div  key={item.name}
                    className="sidebar_subitem"
                    style={index + 1 === data.length ? {border: 0} : {}}>
                <span>{item.name}</span>
                <span className="right">{item.value}</span>
              </div>
            ))}
          </div>
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
