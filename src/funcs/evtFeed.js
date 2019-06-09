import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const apiName = 'evtApi';
const apiPath = '/evtApi';

exports.FetchEvts = async (LastEvaluatedKey) => {
  try {
    var apiResponse
    if(LastEvaluatedKey){
      apiResponse = await API.get(apiName, apiPath + '/feed/' + LastEvaluatedKey)
    } else {
      apiResponse = await API.get(apiName, apiPath + '/feed')
    }
    newEvents = apiResponse.data.Items
    // checks if there are new items
    if(newEvents.length > 0){
      finishedData = {
        data: newEvents,
        LastEvaluatedKey: (apiResponse.data.LastEvaluatedKey.eid) ? apiResponse.data.LastEvaluatedKey.eid : null
      }
      console.log('finishedData: ' + JSON.stringify(finishedData))
      return finishedData
    } else {
      console.log('THERE WAS AN ERROR. DATA: ' + apiResponse.data)
      return null
    }
  } catch (e) {
    console.log(e);
  }
}
