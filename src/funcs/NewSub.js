import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const uuidv4 = require('uuid/v4'); // used for generating a unique id
import {GetUID} from './auth'; // imports the GetUID func

// creates a new event by uploading the data to AWS
exports.NewSub = async (eid) => {
  // the data being inserted into the DB
  let config = {
    body: {
      eid: eid,
      ts: Math.round((new Date()).getTime() / 1000), // calculates the seconds
      uid: await GetUID(), // retrieves User Id from storage
      sid: uuidv4()
    }
  }

  apiName = 'evtApi'
  apiPath = '/evtApi'

  // Use the API module to insert the event to the database
  try {
    const apiResponse = await API.put(apiName, apiPath + '/newSub', config)
    console.log('response from insert event: ' + JSON.stringify(apiResponse));
  } catch (e) {
    console.log(e);
  }
}
