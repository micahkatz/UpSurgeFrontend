import {StyleSheet} from 'react-native';
import {GLOBALS} from './globals'

/*
  styles.js stores global styles for the entire app to use
*/

exports.STYLES = StyleSheet.create({
  evtTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    width: GLOBALS.extEvtWidth * .7,
    fontFamily: 'HelveticaNeue'
  },
  pgTitle: {
    fontFamily: 'HelveticaNeue',
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: GLOBALS.red,
    borderRadius: 10,
    padding: 10
  },
  tagContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: GLOBALS.screenWidth * .45
  },
  boldText: {
    fontFamily: 'HelveticaNeue-Bold'
  }
});
