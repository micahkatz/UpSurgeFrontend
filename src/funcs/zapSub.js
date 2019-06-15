import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const apiName = 'SubApi';
const apiPath = '/s';
import {GetUID} from './auth'

exports.ZapSub = async (sid) => {
  try {
    var apiResponse
    let uid = await GetUID()
    apiResponse = await API.get(apiName, apiPath + '/zap/' + sid + '/' + uid)
    console.log(JSON.stringify(apiResponse))
  } catch (e) {
    console.log(e);
  }
}
