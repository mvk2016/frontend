var React = require('react')

var Card  = require('./card.jsx')

/**
 * A card that displays current data.
 * Defined as a function as it has no state of its own.
 */

function CurrentCard(props) {
  return (
    <Card title='Current Data'>
      <div className='item-list'>
        {props.data.map(item => (
          <div key={item.type}>
            <span>{item.type}</span>
            <span className='data' title={item.collected}>
              {Math.round(item.value * 10)/10}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

module.exports = CurrentCard
