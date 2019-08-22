/*
  *  actJoinVideo.js - Page
  *  This page is the alternative to actJoin, for when the user would like to submit
  *  a video rather than an image. Could potentially be joined together with actJoin
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
import {NewSub} from 'src/funcs/NewSub'

export default class ActJoin extends React.Component {
  constructor(props){
    super(props);
    // similar states to actJoinVideo
    this.state = {
      recording: false,
      previewURI: '',
      duration: 0,
      cameraMode: RNCamera.Constants.Type.back
    }
    this.handleFinish = this.handleFinish.bind(this)
  }

  async handleFinish() {
    const eid = this.props.navigation.getParam('eid');
    NewSub(eid, this.state.previewURI).then(() => console.log('SUCCESS! CREATED SUB'))
  }
  recordVideo = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      this.setState({recording: true})
      const data = await this.camera.recordAsync(options)
      this.setState({previewURI: data.uri})
      console.log('VIDEO DATA...',JSON.stringify(data))
    }
  }
  stopRecording = async function() {
    if (this.camera) {
      this.camera.stopRecording()
      this.setState({recording: false})
    }
  }
  // render of actJV, with feedback for if it's recording in the form of the outline
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
      var renderFinishText = () => {
        if(this.state.loadingComp == false){
          return (
            <Text style={styles.nextText}>Finish</Text>
          )
        } else {
          return (
            <ActivityIndicator
              size='small'
              color={GLOBALS.backgroundColor}
              />
          )
        }
      }
      var renderRecordButton = () => {
        if(this.state.recording == false){
          return (
            <TouchableWithoutFeedback
              onPress={this.recordVideo.bind(this)}
              >
              <View style={styles.captureButton}>
                <Foundation name={'record'} size={90} color={'white'}/>
              </View>
            </TouchableWithoutFeedback>
          )
        } else {
          return (
            <TouchableWithoutFeedback
              onPress={this.stopRecording.bind(this)}
              >
              <View style={styles.captureButton}>
                <MaterialCommunityIcons name={'stop-circle-outline'} size={75} color={GLOBALS.red}/>
              </View>
            </TouchableWithoutFeedback>
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
            {renderRecordButton()}

            {renderFinished()}
          </View>

        );

      } else {
        return (
          <View style={styles.container}>
            <Video
              source={{uri: this.state.previewURI}}
              style={styles.container}
              repeat={true}
              onLoad={({duration}) => {
                this.setState({duration})
              }}
              />
            <TouchableWithoutFeedback
              onPress={() => this.setState({previewURI: ''})}
              >
              <View style={styles.back}>
                <Ionicons name={'ios-arrow-back'} size={45} color={'white'}/>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={this.handleFinish}
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
// STYLESHEET

  const styles = StyleSheet.create({
    container: {
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: GLOBALS.grey
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
