import {
  Dimensions
} from 'react-native'
exports.GLOBALS = {
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
  extEvtWidth : Dimensions.get('window').width * .9,
  extEvtHeight : Dimensions.get('window').width * 1.1
}
