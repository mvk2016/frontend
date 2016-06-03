var React = require('react')

/**
 * The Card component is a wrapper for actual cards,
 * on its own it only displays a card title.
 * For example usage see current-card.jsx or history-card.jsx
 */
function Card(props) {
  return (
    <div className='item'>
      <div className='item-head'>
        <h2>{props.title}</h2>
      </div>
      {props.children}
    </div>
  )
}

module.exports = Card
