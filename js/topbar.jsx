var React    = require('react');
var ReactDom = require('react-dom');
var styles   = require('./styles.js');


class TopbarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      loaded: true,
      context: styles.tempToColor
    }

    this.switchStyle = this.switchStyle.bind(this)
  }

  switchStyle(mode) {
    if (mode == "temperature") {
      var context = styles.tempToColor;
      document.getElementById("temperature-view").className = "active-view";
      document.getElementById("utilization-view").className = "";
    } else if (mode == "utilization") {
      var context = styles.utilToColor;
      document.getElementById("utilization-view").className = "active-view";
      document.getElementById("temperature-view").className = "";
    }
    this.setState({context: context});
    this.props.setStyle(context);
  }

  getBuildingString() {
    //TODO: fix this! 10/10 will remember
    return "KTH Campus";
  }

  render() {
    var data = this.props.data;

    return (
      <div>
        <div id="icon">
          <img src={"http://localhost:8000/imgs/y-logo-small.png"} className="resize" />
        </div>

        <div id="topbar-title">
          Yanzi smart map
        </div>
        
        <div id="controller">
          <button id="language">
            &#9873;
          </button>
        </div>
        
        <div id="controller">
          <button id="utilization-view" onClick={this.switchStyle.bind(this, "utilization")} >
            &#9281;
          </button>
        </div>
        
        <div id="controller">
          <button id="temperature-view" className="active-view" onClick={this.switchStyle.bind(this, "temperature")} >
            &#8451;
          </button>
        </div>
        
        <div id="location">
          {this.getBuildingString()}
        </div>
      </div>
    )
  }
}

function renderTopbar(setStyle) {
  ReactDom.render(
    <TopbarComponent setStyle={setStyle} />,
    document.querySelector('#topbar')
  );
}

module.exports = {
  renderTopbar
}
