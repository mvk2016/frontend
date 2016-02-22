'use strict'

const sidebar = function() {
  const sideElement = document.querySelector('#sidebar')
  const template = sideElement.querySelector('script').innerHTML
  let currentId = null;

  Mustache.parse(template)

  /**
   * Renders the sidebar and runs the init function.
   */
  const render = function(context) {
    sideElement.innerHTML = Mustache.render(template, context)
    init()
  }

  /**
   * Initializes the sidebar, currently only adds event handlers.
   */
  const init = function() {
    const closeButton = document.querySelector('#sidebar .close')
    closeButton.onclick = () => hide()
  }

  const show = () => sideElement.style.display = 'block'
  const hide = () => sideElement.style.display = 'none'
  const toggleShow = () => {
    const style = sideElement.style
    if(style.display == 'none') style.display = 'block'
    else                        style.display = 'none'
  }

  return {
    render,
    show,
    hide
  }

}()
