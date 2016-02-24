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
        <br />
        <br />

        <h1 className="sidebar_title">{this.state.current.roomname}</h1>
        <br />

        <div id='data' className="sidebar_item">
          <div className="sidebar_item_head">
            <h2 className="sidebar_title">Data</h2>
          </div>
          <div className="sidebar_subitem_contaier">
            {this.state.current.data.map(item => (
                <div className="sidebar_subitem">
                  <p className="sidebar_subitem_text left_align_stretch">{item.name}</p>
                  <p className="sidebar_subitem_text right_align_stretch">{item.value}</p>
                </div>
              //<li key={item.name}>{item.name}: {item.value} <i>{item.lastupdate}</i></li>
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
