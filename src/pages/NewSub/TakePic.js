/*
  *  actJoin.js - Page
  *  This is the page for joining an activity event, using the camera as its main source
  *  of grounding the page. Needs a styled camera format and a way to alternate and
  *  present a styled text page, as the camera can be used for video submissions and
  *  image submissions, with an alternative for option on this for camera roll images
*/

import React from 'react';
import {GLOBALS} from 'src/globals';
import {
  Animated,
  Dimensions,
  Image,
  ActivityIndicator,
  StatusBar,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video'
import TopBar from 'src/comps/TopBar';

export default class NewSub extends React.Component {
  constructor(props){
    super(props);
    // State which checks for recording, duration, general data, and camera mode

    this.state = {
      recording: false,
      previewURI: '',
      duration: 0,
      imageData: null,
      cameraMode: RNCamera.Constants.Type.back,
      compressedData: null,
      finishedSubmitting: false
    }
  }

  async takePicture() {
      if (this.camera) {
        const options = {
          quality: 0.5,
          base64: true,
          mirrorImage: (this.state.cameraMode != RNCamera.Constants.Type.back) ? true : false
        };
      }
    };

    // The render sets up additional features on the cameras view and on the process for The
    // initial setup as well
  render() {
    var renderFinished = () => {
      if(this.state.finishedSubmitting == true){
        return (
          <View style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width,
            }}>
            <View style={{
                position: 'absolute',
                backgroundColor: GLOBALS.backgroundColor,
                height: Dimensions.get('screen').height,
                width: Dimensions.get('screen').width,
                opacity: .8
              }}/>
              <Text style={styles.title}>
                Done
              </Text>
              <Ionicons
                name={'ios-checkmark-circle'} size={100} color={GLOBALS.secondaryColor}
                />
            </View>
          )
        }
      }
      if(this.state.previewURI.length == 0) {
        return (
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style = {styles.container}
              type={this.state.cameraMode}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              />
            <TouchableWithoutFeedback
              onPress={this.takePicture.bind(this)}
              >
              <View style={styles.captureButton}>
                <Foundation name={'record'} size={90} color={'white'}/>
              </View>
            </TouchableWithoutFeedback>
            <TopBar
              left={'CLOSE'}
              right={'REVERSE'}
              leftPress={this.props.navigation.pop}
              rightPress={() => {
                if(this.state.cameraMode == RNCamera.Constants.Type.back){
                  this.setState({cameraMode: RNCamera.Constants.Type.front})
                } else {
                  this.setState({cameraMode: RNCamera.Constants.Type.back})
                }
              }}
              style={{
                position: 'absolute',
                top: 0
              }}
              />
          </View>

        );

      } else {
        return (
          <View style={styles.container}>
            <Image
              source={{uri: 'data:image/jpeg;base64,' + this.state.imageData}}
              style={styles.container}
              />
            <TouchableWithoutFeedback
              onPress={() => this.setState({previewURI: ''})}
              >
              <View style={styles.back}>
                <Ionicons name={'ios-arrow-back'} size={45} color={'white'}/>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              >
              <View style={styles.captureButton}>
                <Ionicons name={'md-arrow-dropup-circle'} size={75} color={GLOBALS.secondaryColor}/>
              </View>
            </TouchableWithoutFeedback>

            {renderFinished()}
          </View>
        )
      }
    }
  }
  const styles = StyleSheet.create({
    container: {
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: GLOBALS.black
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textBoxContainer: {
    },
    notAvailableText: {
      color: 'white',
      fontSize: 12,
      fontFamily: 'HelveticaNeue'
    },
    textBox: {
      height: 50,
      borderColor: GLOBALS.borderColor,
      marginBottom: 15,
      padding: 10,
      marginTop: 5,
      borderWidth: 1,
      backgroundColor: GLOBALS.backgroundColor,
      width: GLOBALS.textBoxWidth,
      borderRadius: 5
    },
    scrollView: {
      width: Dimensions.get('screen').width,
      justifyContent: 'center',
      alignItems: 'center'
    },
    nextButton: {
      backgroundColor: GLOBALS.primaryColor,
      height: 50,
      width: GLOBALS.textBoxWidth,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 15
    },
    nextText: {
      color: GLOBALS.backgroundColor,
      fontSize: 22
    },
    header: {
      flexDirection: 'row',
      alignSelf: "flex-end",
      marginBottom: 10,
      paddingHorizontal: 10,
      padding: 5
    },
    close: {
      position: 'absolute',
      left: 10,
      top: 10,
      minHeight: 44,
      minWidth: 44,
      justifyContent: 'center',
      alignItems: 'center'
    },
    back: {
      position: 'absolute',
      top: 0,
      left: 0,
      margin: 25
    },
    captureButton: {
      position: 'absolute',
      bottom: 0,
      marginBottom: 10,
      height: 100,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center'
    },
    reverseButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      color: 'white',
      fontSize: 25,
      fontFamily: 'HelveticaNeue-Bold',
      marginBottom: 10
    }
  });
