import {AsyncStorage} from 'react-native'


// stores the userID in AsyncStorage for later use
exports.StoreUID = async (uid) => {
  try {
    console.log('STORING:',uid.toString())
    await AsyncStorage.setItem('uid', uid.toString());
  } catch (error) {
    console.error('ERROR WITH STORING',error)
  }
};
// gets the userID from AsyncStorage
exports.GetUID = async () => {
  try {
    const value = await AsyncStorage.getItem('uid');
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.error(error)
  }
};
