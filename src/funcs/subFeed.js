import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const apiName = 'SubApi';
const apiPath = '/s';
// exports.GetEvtSubs = async (eid, LastEvaluatedEvtSubKey) => {
//   try {
//     var apiResponse
//
//     if(LastEvaluatedEvtSubKey){
//       // apiResponse = await API.get(apiName, apiPath + '/feed/' + LastEvaluatedKey, config)
//       apiResponse = await API.get(apiName, apiPath + '/subFeed/' + eid + '/' + LastEvaluatedEvtSubKey)
//     } else {
//       apiResponse = await API.get(apiName, apiPath + '/subFeed/' + eid)
//     }
//     console.log(JSON.stringify(apiResponse))
//     newEvents = apiResponse.data.Items
//     // checks if there are new items
//     if(newEvents.length > 0){
//       finishedData = {
//         data: newEvents,
//         LastEvaluatedEvtSubKey: (apiResponse.data.LastEvaluatedKey.sid) ? apiResponse.data.LastEvaluatedKey.sid : null
//       }
//       // console.log('finishedData: ' + JSON.stringify(finishedData))
//       return finishedData
//     } else {
//       console.log('THERE IS NOT DATA ' + JSON.stringify(apiResponse.data))
//       return null
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }
exports.GetEvtSubs = async (eid, LastEvaluatedEvtSubKey) => {
  try {
    var apiResponse

    // let uid = await GetUID()
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
      let finishedData = null
      if(apiResponse.data.LastEvaluatedKey != null){
        finishedData = {
          data: newEvents,
          LastEvaluatedKey: apiResponse.data.LastEvaluatedKey.sid
        }
      } else {
        finishedData = {
          data: newEvents,
          LastEvaluatedKey: null
        }
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

exports.GetProSubs = async (pid, LastEvaluatedProEvtKey) => {
  try {
    var apiResponse

    if(LastEvaluatedProEvtKey){
      // apiResponse = await API.get(apiName, apiPath + '/feed/' + LastEvaluatedKey, config)
      apiResponse = await API.get(apiName, apiPath + '/feed/profile/' + pid + '/' + LastEvaluatedProEvtKey)
    } else {
      apiResponse = await API.get(apiName, apiPath + '/feed/profile/' + pid)
    }
    console.log(JSON.stringify(apiResponse))
    newEvents = apiResponse.data.Items
    // checks if there are new items
    if(newEvents.length > 0){
      finishedData = {
        data: newEvents,
        LastEvaluatedProEvtKey: (apiResponse.data.LastEvaluatedKey.eid) ? apiResponse.data.LastEvaluatedKey.eid : null
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
