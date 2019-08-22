import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const uuidv4 = require('uuid/v4'); // used for generating a unique id
import {GetUID} from './auth'; // imports the GetUID func
import {PickVid, UploadVid, GetExt} from './media';

// creates a new event by uploading the data to AWS
exports.NewSub = async (eid, vidPath) => {
  var extention = GetExt(vidPath)
  console.log('HERE IS THE EXTENTION', extention, vidPath)
  // the data being inserted into the DB
  let config = {
    body: {
      eid,
      ts: Math.round((new Date()).getTime() / 1000), // calculates the seconds
      uid: await GetUID(), // retrieves User Id from storage
      sid: uuidv4(),
      ext: extention
    }
  }

  apiName = 'SubApi';
  apiPath = '/s'

  // Use the API module to insert the event to the database
  API.put(apiName, apiPath + '/newSub', config)
  .then((apiResponse) => {
    console.log('response from insert sub: ' + JSON.stringify(apiResponse));
    console.log('video path ' + vidPath, config.body.sid);
    UploadVid(vidPath, config.body.sid, extention).then((apiResponse) => console.log(JSON.stringify(apiResponse)))
  })
}
