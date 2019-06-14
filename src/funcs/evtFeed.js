import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const apiName = 'EvtsApi';
const apiPath = '/e';
import {GetUID} from './auth'

exports.FetchEvts = async (LastEvaluatedKey) => {
  try {
    var apiResponse

    let uid = await GetUID()
    if(LastEvaluatedKey){
      // apiResponse = await API.get(apiName, apiPath + '/feed/' + LastEvaluatedKey, config)
      apiResponse = await API.get(apiName, apiPath + '/feed/' + uid + '/' + LastEvaluatedKey)
    } else {
      apiResponse = await API.get(apiName, apiPath + '/feed/' + uid)
    }
    console.log(JSON.stringify(apiResponse))
    newEvents = apiResponse.data.Items
    // checks if there are new items
    if(newEvents.length > 0){
      finishedData = {
        data: newEvents,
        LastEvaluatedKey: (apiResponse.data.LastEvaluatedKey.eid) ? apiResponse.data.LastEvaluatedKey.eid : null
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
exports.GetCatFeed = async (LastEvaluatedKey) => {
  try {
    var apiResponse

    let uid = await GetUID()
    if(LastEvaluatedKey){
      // apiResponse = await API.get(apiName, apiPath + '/feed/' + LastEvaluatedKey, config)
      apiResponse = await API.get(apiName, apiPath + '/evtFeed/cat/SPORTS/' + LastEvaluatedKey)
    } else {
      apiResponse = await API.get(apiName, apiPath + '/evtFeed/cat/SPORTS')
    }
    console.log(JSON.stringify(apiResponse))
    newEvents = apiResponse.data.Items
    // checks if there are new items
    if(newEvents.length > 0){
      finishedData = {
        data: newEvents,
        LastEvaluatedCatKey: (apiResponse.data.LastEvaluatedKey.eid) ? apiResponse.data.LastEvaluatedKey.eid : null
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
exports.GetProEvtFeed = async (pid, LastEvaluatedProEvtKey) => {
  try {
    var apiResponse

    let uid = await GetUID()
    if(LastEvaluatedProEvtKey){
      // apiResponse = await API.get(apiName, apiPath + '/feed/' + LastEvaluatedKey, config)
      apiResponse = await API.get(apiName, apiPath + '/evtFeed/profile/' + uid + '/' + LastEvaluatedProEvtKey)
    } else {
      apiResponse = await API.get(apiName, apiPath + '/evtFeed/profile/' + uid)
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
