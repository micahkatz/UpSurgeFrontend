import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const apiName = 'SubApi';
const apiPath = '/s';

exports.GetEvtSubs = async (eid, LastEvaluatedEvtSubKey) => {
  try {
    var apiResponse

    if(LastEvaluatedEvtSubKey){
      // apiResponse = await API.get(apiName, apiPath + '/feed/' + LastEvaluatedKey, config)
      apiResponse = await API.get(apiName, apiPath + '/subFeed/' + eid + '/' + LastEvaluatedEvtSubKey)
    } else {
      apiResponse = await API.get(apiName, apiPath + '/subFeed/' + eid)
    }
    console.log(JSON.stringify(apiResponse))
    newEvents = apiResponse.data.Items
    // checks if there are new items
    if(newEvents.length > 0){
      finishedData = {
        data: newEvents,
        LastEvaluatedEvtSubKey: (apiResponse.data.LastEvaluatedKey.sid) ? apiResponse.data.LastEvaluatedKey.sid : null
      }
      // console.log('finishedData: ' + JSON.stringify(finishedData))
      return finishedData
    } else {
      console.log('THERE IS NOT DATA ' + JSON.stringify(apiResponse.data))
      return null
    }
  } catch (e) {
    console.log(e);
  }
}
