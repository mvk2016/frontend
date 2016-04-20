var React    = require('react');
var ReactDom = require('react-dom');
var styles   = require('./styles.js');

class Topbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      loaded: true,
      context: styles.tempToColor
    }

    this.setStyle = this.setStyle.bind(this)
    this.isActive = this.isActive.bind(this)
  }

  setStyle(context) {
    return event => {
      this.setState({context: context});
      this.props.setStyle(context);
    }
  }

  isActive(context) {
    return this.state.context === context ? 'active-view': '';
  }

  getBuildingString() {
    //TODO: fix this! 10/10 will remember
    return "KTH Campus";
  }

  render() {
    var data = this.props.data;

    return (
      <div id="topbar">
        <div id="icon">
          <img src={"http://localhost:8000/imgs/y-logo-small.png"} className="resize" />
        </div>

        <div id="topbar-title">
          Yanzi smart map
        </div>
        
        <div onClick={this.setStyle(styles.utilToColor)}
            className={"controller " + this.isActive(styles.utilToColor)}>
            &#9281;
        </div>
        
        <div onClick={this.setStyle(styles.tempToColor)}
             className={"controller " + this.isActive(styles.tempToColor)}>
            &#8451;
        </div>

        <div onClick={this.setStyle(styles.humidityToColor)}
             className={"controller " + this.isActive(styles.humdToColor)}>
           &#128167; 
        </div>

        <div id="location">
          {this.getBuildingString()}
        </div>
      </div>
    )
  }
}

module.exports = Topbar
