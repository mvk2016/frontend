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
  return {
    color: getTempColor(feature),
    stroke: 0
  };
}

function getTempColor(feature) {
  var elems = feature.getProperty('data').filter(function(elem) {
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

  return  d < 0     ? '#9C2FAE' :
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
}

function utilToColor(feature) {
  return {
    color: getUtilColor(feature),
    stroke: 0
  };
}

function getUtilColor(feature) {
  var maxValues = feature.getProperty('data').filter(function(elem) {
    return elem.name == "maxutilization";
  });

  var currentValues = feature.getProperty('data').filter(function(elem) {
    return elem.name == "currentutilization";
  });

  if (maxValues.length > 0) {
    var max = maxValues[0].value;
  } else {
    return "#B7B7B7";
  }

  if (currentValues.length > 0) {
    var current = currentValues[0].value;
  } else {
    return "#B7B7B7";
  }

  if (typeof(max) != "number" || typeof(current) != "number") {
    return "#B7B7B7";
  }

  if (max <= 0) {
    return "#B7B7B7";
  }

  var res = current/max;

  return  d < 0.1    ? '#00FF00' :
          d < 0.2    ? '#33FF00' :
          d < 0.3    ? '#66FF00' :
          d < 0.4    ? '#99FF00' :
          d < 0.5    ? '#CCFF00' :
          d < 0.6    ? '#FFFF00' :
          d < 0.7    ? '#FFCC00' :
          d < 0.8    ? '#FF9900' :
          d < 0.9    ? '#FF6600' :
                       '#FF3300' ;
}

module.exports = {
  random,
  alwaysBlack,
  redroom,
  tempToColor,
  utilToColor
}
