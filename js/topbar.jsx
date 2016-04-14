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

  handleButtonClick(e) {
    alert(e.target)
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
        
        <div id="language">
          <button onClick={this.handleButtonClick}>
            &#9873;
          </button>
        </div>
        
        <div id="building-selector">
          <button>
            &#9281;
          </button>
        </div>
        
        <div id="data-view">
          <button>
            &#8962;
          </button>
        </div>
        
        <div id="location">
          {getBuildingString()}
        </div>
      </div>
    )
  }

  /*render() {
    var data = this.props.data;

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
          <button>
            &#8962;
          </button>
        </span>

        <span id="building-selector">
          <button>
            &#9281;
          </button>
        </span>

        <span id="language">
          <button>
            &#9873;
          </button>
        </span>
      </div>
    )
  }*/

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
