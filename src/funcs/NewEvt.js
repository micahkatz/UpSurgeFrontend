import {API} from 'aws-amplify'; // interacts with the AWS service using the AWS Amplify SDK
const uuidv4 = require('uuid/v4'); // used for generating a unique id
import {GetUID} from './auth'; // imports the GetUID func

// creates a new event by uploading the data to AWS
exports.NewEvt = async () => {
  // the data being inserted into the DB
  let config = {
    body: {
      eid: uuidv4(), // generates unique userID
      title: 'example', // TODO: the user inputs title
      desc: 'example text', // TODO: the user inputs desc
      ts: Math.round((new Date()).getTime() / 1000), // calculates the seconds
      uid: await GetUID(), // retrieves User Id from storage
      cat: 'SPORTS' // TODO: the user inputs their categories
    }
  }

  apiName = 'EvtsApi';
  apiPath = '/e'

  // Use the API module to insert the event to the database
  try {
    const apiResponse = await API.put(apiName, apiPath, config)
    console.log('response from insert event: ' + JSON.stringify(apiResponse));
  } catch (e) {
    console.log(e);
  }
}
