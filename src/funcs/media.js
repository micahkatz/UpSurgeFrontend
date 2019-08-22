import {Storage} from 'aws-amplify'
import ImagePicker from 'react-native-image-crop-picker';

exports.GetIMG = async (fileName) => {
  return Storage.get(fileName)
};


exports.UploadImg = async (path, mime, eid) => {
  let uri = image.path
  const response = await fetch(uri)
  const blob = await response.blob() // format the data for images
  Storage.put(eid + '.jpeg', blob, {
    contentType: image.mime
  })
}

exports.PickImg = async () => {
  image = await ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    forceJpg: false,
    includeBase64: true
  })
  return image
}

exports.PickVid = async () => {
  video = await ImagePicker.openPicker({
    mediaType: "video"
  })
  return video
}

exports.UploadVid = async (uri, sid, ext) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  Storage.put(sid + '.' + ext, blob, {
    contentType: 'video/' + ext
  })
}
exports.GetExt = (fileName) => {
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(fileName)[1];
  return ext
}
