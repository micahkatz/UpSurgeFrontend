
exports.getTimestamp = (startDate) => {
  var endDate   = new Date();
  var sDate   = new Date(startDate);
  var resultInSec = Math.round((endDate - sDate) / 1000)
  var resultInMin = Math.round(resultInSec / 60)
  var resultInHr = Math.round(resultInMin / 60)
  var resultInDays = Math.round(resultInHr / 24)
  var resultInWeeks = Math.round(resultInDays / 7)
  var resultInYears = Math.round(resultInWeeks / 52)
  var resultInDecades = Math.round(resultInYears / 10)
  var now = false
  var type = ''
  var result
  if(resultInSec < 10){
    now = true
  }
  else if(resultInMin < 1){
    type = 's'
    result = resultInSec
  }
  else if(resultInHr < 1){
    if(resultInMin >= 2){
      type = 'm'
    } else {
      type = 'm'
    }
    result = resultInMin
  }
  else if(resultInDays < 1){
    if(resultInHr >= 2){
      type = 'h'
    } else {
      type = 'h'
    }
    result = resultInHr
  }
  else if(resultInWeeks < 1){
    if(resultInDays >= 2){
      type = 'd'
    } else {
      type = 'd'
    }
    result = resultInDays
  }
  else if(resultInYears < 1){
    if(resultInWeeks >= 2){
      type = 'w'
    } else {
      type = 'w'
    }
    result = resultInWeeks
  }
  else if(resultInDecades < 1){
    if(resultInYears >= 2){
      type = 'y'
    } else {
      type = 'y'
    }
    result = resultInYears
  }
  else if(resultInYears >= 10){
    if(resultInDecades >= 2){
      type = 'decades'
    } else {
      type = 'decade'
    }
    result = resultInDecades
  }

  if(now != true){
    return result.toString() + type
  } else {
    return 'now'
  }
}
