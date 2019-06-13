import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const apiName = 'evtApi';
const apiPath = '/evtApi';
import {GetUID} from './auth'

exports.GetProfile = async (pid) => {
  try {
    var apiResponse

    apiResponse = await API.get(apiName, apiPath + '/getProfile/' + pid)
    console.log(JSON.stringify(apiResponse))
  } catch (e) {
    console.log(e);
  }
}

exports.EditProfile = async () => {
  try {
    var apiResponse
    let uid = await GetUID()

    apiResponse = await API.post(apiName, apiPath + '/editProfile/' + uid + '/JosyahM')
    console.log(JSON.stringify(apiResponse))
  } catch (e) {
    console.log(e);
  }
}
