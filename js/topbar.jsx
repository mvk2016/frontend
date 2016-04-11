var React       = require('react');
var ReactDom    = require('react-dom');
var topbar      = document.querySelector('#topbar');


class TopbarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      loaded: true
    }
  }

  render() {
    var data = this.props.data;

      console.log(__dirname + "/../imgs/y-logo-small.png");

    return (
      <div id="topbar">
        <span id="icon">
            <img src={__dirname + "/../imgs/y-logo-small.png"} className="resize" />
        </span>

        <span id="topbar-title">
          Yanzi smart map
        </span>

        <span id="location">
          {getBuildingString()}
        </span>

        <span id="data-view">
          &#8962;
        </span>

        <span id="building-selector"></span>

        <span id="language"></span>
      </div>
    )
  }

}

function getBuildingString() {
  //TODO: fix this! 10/10 will remember
  return "KTH Campus"
}

function renderTopbar() {
  ReactDom.render(
    <TopbarComponent  />,
    topbar
  );
}

module.exports = {
  renderTopbar
}
