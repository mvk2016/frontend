function tempToColor(feature) {
  return {
    fillColor: getTempColor(feature),
    strokeWeight: feature.getProperty('active') ? 1 : 0
  };
}

function getTempColor(feature) {
  var elems = feature.getProperty('data').filter(e => e.name === "temperature");

  if (elems.length > 0) var d = elems[0].value;
  else return "#B7B7B7";

  return  d < 0  ? '#9C2FAE' :
          d < 5  ? '#663FB4' :
          d < 10 ? '#4055B2' :
          d < 13 ? '#587CF7' :
          d < 15 ? '#1DAAF2' :
          d < 17 ? '#159489' :
          d < 19 ? '#1BB31B' :
          d < 22 ? '#1CD31C' :
          d < 25 ? '#FEC031' :
          d < 32 ? '#FD9728' :
          d < 40 ? '#FB582F' :
                   '#FB2210' ;
}

function utilToColor(feature) {
  return {
    fillColor: getUtilColor(feature),
    strokeWeight: feature.getProperty('active') ? 1 : 0
  };
}

function getUtilColor(feature) {
  var util = feature.getProperty('data').filter(e => e.name === "percentage");

  if (util.length > 0) var res = util[0].value;
  else return "#B7B7B7";

  return res < 0.1 ? '#00FF00' :
         res < 0.2 ? '#33FF00' :
         res < 0.3 ? '#66FF00' :
         res < 0.4 ? '#99FF00' :
         res < 0.5 ? '#CCFF00' :
         res < 0.6 ? '#FFFF00' :
         res < 0.7 ? '#FFCC00' :
         res < 0.8 ? '#FF9900' :
         res < 0.9 ? '#FF6600' :
                     '#FF3300' ;
}

function humdToColor(feature) {
  return {
    fillColor: getHumdColor(feature),
    strokeWeight: feature.getProperty('active') ? 1 : 0
  };
}

function getHumdColor(feature) {
  var humd = feature.getProperty('data').filter(e => e.name === "relativeHumidity");

  if (humd.length > 0) var res = humd[0].value;
  else return "#B7B7B7";

  return res < 10 ? '#00FF00' :
         res < 20 ? '#33FF00' :
         res < 30 ? '#66FF00' :
         res < 40 ? '#99FF00' :
         res < 50 ? '#CCFF00' :
         res < 60 ? '#FFFF00' :
         res < 70 ? '#FFCC00' :
         res < 80 ? '#FF9900' :
         res < 90 ? '#FF6600' :
                    '#FF3300' ;
}


module.exports = {
  tempToColor,
  utilToColor,
  humdToColor
}
