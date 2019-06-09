import {AsyncStorage} from 'react-native'


// stores the userID in AsyncStorage for later use
exports.StoreUID = async (uid) => {
  try {
    await AsyncStorage.setItem('uid', uid);
  } catch (error) {
    console.error(error)
  }
};
// gets the userID from AsyncStorage
exports.GetUID = async (uid) => {
  try {
    const value = await AsyncStorage.getItem('uid');
    if (value !== null) {
      console.log('UID',value)
      return value
    }
  } catch (error) {
    console.error(error)
  }
};
