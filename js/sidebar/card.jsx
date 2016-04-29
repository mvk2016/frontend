var React = require('react')

class Card extends React.Component {
  render() {
    return (
      <div className='item'>
        <div className='item-head'>
          <h2>{this.props.title}</h2>
        </div>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Card
