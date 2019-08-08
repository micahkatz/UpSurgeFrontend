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
});
