var React     = require('react')
var ReactDom  = require('react-dom')
var LineChart = require('react-chartjs').Line
var Loader    = require('react-loader')

var api       = require('./apiWrapper.js')

var sidebarwrapper = document.querySelector('#sidebarwrapper')
var currentId;

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
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
    if(this.props.roomid === props.roomid && this.props.data === props.data) {
      this.setState({visible: !this.state.visible})
    }
    else if(this.props.roomid !== props.roomid) {
      this.getHistory(props.roomid)
    }
  }

  getHistory(roomid) {
    this.setState({loaded: false})
    api.getHistory(this.props.floorid, roomid).then(json => {
      this.setState({history: json, loaded: true})
    })
  }

  handleClose() {
    this.setState({visible: false})
  }

  render() {
    var data = this.props.data;
    return this.state.visible ? (
      <div id='sidebar'>
        <span onClick={this.handleClose} className='glyphicon glyphicon-remove close'></span>

        <h1>{this.props.roomname}</h1>

        <div id='data' className="sidebar_item">
          <div className="sidebar_item_head">
            <h2>Data</h2>
          </div>
          <div className="sidebar_subitem_contaier">
            {data.map((item, index) => (
              <div key={item.name} className="sidebar_subitem">
                <span>{item.name}</span>
                <span className="right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sidebar_item">
          <div className="sidebar_item_head">
            <h2>Chart</h2>
          </div>
          <Loader loaded={this.state.loaded}>
            <LineChart data={this.state.history} />
          </Loader>
        </div>
      </div>
    ) : false
  }
}

function renderSidebar(floorid, props) {
  ReactDom.render(
    <SidebarComponent floorid={floorid}
                      roomid={props.roomid}
                      roomname={props.name}
                      data={props.data} />,
    sidebarwrapper
  )
  currentId = props.roomid
}

function updateSidebar(floorid, props) {
  if(props.roomid == currentId) { 
    ReactDom.render(
      <SidebarComponent floorid={floorid}
                        roomid={props.roomid}
                        roomname={props.name}
                        data={props.data} />,
      sidebarwrapper
    )
  }
}

module.exports = {
  renderSidebar,
  updateSidebar
}
