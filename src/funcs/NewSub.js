import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const uuidv4 = require('uuid/v4'); // used for generating a unique id
import {GetUID} from './auth'; // imports the GetUID func
import {PickVid, UploadVid} from './media';

// creates a new event by uploading the data to AWS
exports.NewSub = async (eid) => {
  // the data being inserted into the DB
  let config = {
    body: {
      eid,
      ts: Math.round((new Date()).getTime() / 1000), // calculates the seconds
      uid: await GetUID(), // retrieves User Id from storage
      sid: uuidv4()
    }
  }

  apiName = 'SubApi';
  apiPath = '/s'

  // Use the API module to insert the event to the database
  try {
    API.put(apiName, apiPath + '/newSub', config)
    .then((apiResponse) => {
      console.log('response from insert sub: ' + JSON.stringify(apiResponse));
      PickVid().then((video) => {
        UploadVid(video, config.body.eid)
      })
    })
  } catch (e) {
    console.error(e)
  }
}
