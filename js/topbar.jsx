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

  switchStyle() {
    if(this.state.context == styles.tempToColor)
      var context = styles.utilToColor;
    else
      var context = styles.tempToColor;
    this.setState({context: context});
    this.props.setStyle(context);
  }

  getBuildingString() {
    //TODO: fix this! 10/10 will remember
    return "KTH Campus"
  }

  render() {
    var data = this.props.data;

    return (
      <div>
        <div id="icon">
          <img src={__dirname + "/../imgs/y-logo-small.png"} className="resize" />
        </div>

        <div id="topbar-title">
          Yanzi smart map
        </div>
        
        <div id="language">
          <button>
            &#9873;
          </button>
        </div>
        
        <div id="building-selector">
          <button>
            &#9281;
          </button>
        </div>
        
        <div id="data-view">
          <button onClick={this.switchStyle} >
            &#8962;
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
