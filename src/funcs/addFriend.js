import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const apiName = 'UserApi';
const apiPath = '/u';
import {GetUID} from './auth'

exports.AddFriend = async () => {
  try {
    var apiResponse

    let uid = await GetUID()
    apiResponse = await API.post(apiName, apiPath + '/addFriend/' + uid + '/examplefriendid2')
    console.log(JSON.stringify(apiResponse))
  } catch (e) {
    console.log(e);
  }
}
