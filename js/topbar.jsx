var React     = require('react')
var ReactDom  = require('react-dom')


class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            loaded: true
        }


    }

    render() {
        var data = this.props.data;

        return (
            <div id="topbar">
                <span id="icon"></span>

                <span id="topbar-title"></span>

                <span id="location"></span>

                <span id="data-view"></span>

                <span id="building-selector"></span>

                <span id="language"></span>


            </div>

        )

    }
}