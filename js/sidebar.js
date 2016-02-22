const Mustache = require('mustache')

const getJson  = require('./getJson')

const sidebar = function() {
  const sideElement = document.querySelector('#sidebar')
  const template = sideElement.querySelector('script').innerHTML
  let currentId = undefined;

  Mustache.parse(template)

  /**
   * Renders the sidebar and runs the init function.
   */
  function render(context) {
    sideElement.innerHTML = Mustache.render(template, context)
    init()
  }

  const show = () => sideElement.style.display = 'block'
  const hide = () => sideElement.style.display = 'none'

  /**
   * Initializes the sidebar, currently only adds event handlers.
   */
  function init() {
    const closeButton = document.querySelector('#sidebar .close')
    closeButton.onclick = () => hide()
  }

  /**
    * Sets the room and opens the sidebar.
    */
  function setRoom(roomid) {
    if(currentId != roomid) {
      getJson('/api/rooms/' + roomid + '.json')
        .then(json => {
          render(json)
          show()
        })
    } else {
      sideElement.style.display == "none" ? show() : hide()
    }
    currentId = roomid
  }

  return {
    render,
    show,
    hide,
    setRoom
  }

}()

module.exports = sidebar
