import {Storage} from 'aws-amplify'

exports.GetIMG = async (fileName) => {
  return Storage.get(fileName)
};
