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

function tempToColor(feature) {
  var elems = feature.properties.data.filter(function(elem) {
    return elem.name == "temperature";
  });

  if (elems.length > 0) {
    var d = elems[0].value;
  } else {
    return "#B7B7B7";
  }

  if (typeof(d) != "number") {
    return "#B7B7B7";
  }

  var x = d < 0     ? '#9C2FAE' :
          d < 5     ? '#663FB4' :
          d < 10    ? '#4055B2' :
          d < 13    ? '#587CF7' :
          d < 15    ? '#1DAAF2' :
          d < 17    ? '#159489' :
          d < 19    ? '#1BB31B' :
          d < 22    ? '#1CD31C' :
          d < 25    ? '#FEC031' :
          d < 32    ? '#FD9728' :
          d < 40    ? '#FB582F' :
                      '#FB2210' ;

  return {
    color: x,
    stroke: 0
  };
}

module.exports = {
  random,
  alwaysBlack,
  redroom,
  tempToColor
}
