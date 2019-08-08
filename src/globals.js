import {
  Dimensions
} from 'react-native'
exports.GLOBALS = {
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
  extEvtWidth : Dimensions.get('window').width * .9,
  extEvtHeight : Dimensions.get('window').width * 1.1,
  extSubWidth : Dimensions.get('window').width * .3,
  extSubHeight : Dimensions.get('window').width * .5,
  lightGrey: '#e4e4e4',
  darkGrey: '#505050',
  grey: '#909090',
}
