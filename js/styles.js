function generateStyleFunction(converter) {
  return feature => {
      fillColor: convert(feature),
      strokeWeight: feature.getProperty('active') ? 1 : 0
  }
}

function getValue(feature, type) {
  var elem = feature.getProperty('data').filter(e => e.name === type)
  
  if(elem.length > 0) return elem[0].value
  else                return false
}

function getTempColor(feature) {
  var value = getValue(feature, 'temperature')
  if(!value) return '#B7B7B7'

  return  value < 0  ? '#9C2FAE' :
          value < 5  ? '#663FB4' :
          value < 10 ? '#4055B2' :
          value < 13 ? '#587CF7' :
          value < 15 ? '#1DAAF2' :
          value < 17 ? '#159489' :
          value < 19 ? '#1BB31B' :
          value < 22 ? '#1CD31C' :
          value < 25 ? '#FEC031' :
          value < 32 ? '#FD9728' :
          value < 40 ? '#FB582F' :
                       '#FB2210' 
}

function getUtilColor(feature) {
  var value = getValue(feature, 'percentage')
  if(!value) return '#B7B7B7'

  return value < 0.1 ? '#00FF00' :
         value < 0.2 ? '#33FF00' :
         value < 0.3 ? '#66FF00' :
         value < 0.4 ? '#99FF00' :
         value < 0.5 ? '#CCFF00' :
         value < 0.6 ? '#FFFF00' :
         value < 0.7 ? '#FFCC00' :
         value < 0.8 ? '#FF9900' :
         value < 0.9 ? '#FF6600' :
                       '#FF3300' 
}

function getHumdColor(feature) {
  var value = getValue(feature, 'relativeHumidity')
  if(!value) return '#B7B7B7'

  return value < 10 ? '#00FF00' :
         value < 20 ? '#33FF00' :
         value < 30 ? '#66FF00' :
         value < 40 ? '#99FF00' :
         value < 50 ? '#CCFF00' :
         value < 60 ? '#FFFF00' :
         value < 70 ? '#FFCC00' :
         value < 80 ? '#FF9900' :
         value < 90 ? '#FF6600' :
                      '#FF3300' 
}

module.exports = {
  grey: generatestyleFunction(() => '#888'),
  temperature: generatestyleFunction(temerature),
  percentage: generatestyleFunction(percentage),
  relativeHumidity: generatestyleFunction(relativeHumidity)
}
