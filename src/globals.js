import {
  Dimensions
} from 'react-native'

/*
  GLOBALS are universal variables that can be used across the entire app
*/

exports.GLOBALS = {
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
  extEvtWidth : Dimensions.get('window').width * .9,
  extEvtHeight : Dimensions.get('window').width * 1.1,
  extSubWidth : Dimensions.get('window').width * .3,
  extSubHeight : Dimensions.get('window').width * .5,
  headerHeight: 110,
  lightGrey: '#f2f1f1',
  darkGrey: '#505050',
  grey: '#909090',
}
