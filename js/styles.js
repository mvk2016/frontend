function random(feature) {
  var colors = ['black', 'white', 'yellow', 'green', 'red', 'blue'];
  return { 
    color: colors[Math.floor(Math.random() * colors.length)],
    stroke: 0
  }
}

function alwaysBlack(feature) {
  return {
    color: 'black',
    stroke: 0
  }
}

function redroom(feature) {
  return {
    color: feature.properties.id == "redroom" ? 'red' : 'white',
    stroke: 0
  }
}

module.exports = {
  random,
  alwaysBlack,
  redroom
}
