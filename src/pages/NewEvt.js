import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import CropImg from 'react-native-image-crop-picker';
import {GLOBALS} from '../globals'
import CloseButton from '../comps/CloseButton'
export default class NewEvt extends Component {
  constructor(props){
    super(props)
    this.state = {
      desc: '',
      title: '',
      rules: [
        {
          text: ''
        }
      ],
      ddOpen: false,
      compType: 'ACT',
      subType: 'IMG',
      base64Data: '',
      subCats: [],
      isActValidated: false
    }
    this.inputs = {}
    this.queueFocus = null
    this.validate = this.validate.bind(this)
    this.onFinished = this.onFinished.bind(this)
    this.newPost = this.newPost.bind(this)
  }
  componentDidUpdate(){
    if(this.queueFocus != null){
      this.inputs[this.queueFocus].focus()
      this.queueFocus = null
    }
  }
  newPost(){
    if(this.state.isActValidated){
      let meta = {
        desc: this.state.desc,
        title: this.state.title,
        rules: this.state.rules,
        compType: this.state.compType,
        timestamp: new Date(),
        postedBy: this.props.store.username,
        _uid: this.props.store.userID,
        subCat: this.state.subCats[0]
      }
      this.props.store.newEvt(meta)
    }
  }
  validate(){
    if(((this.state.title.length > 1) && (this.state.compType.length > 1)) && (this.state.subType.length > 1)){
      this.state.isActValidated = true
    } else {
      this.state.isActValidated = false
    }
  }
  onFinished(subCats){
    this.setState({subCats})
  }
  render() {
    var renderThumbnail = () => {
      if(this.state.base64Data.length != 0) {
        return (
          <Image
            style={styles.thumbnail}
            source={{
              uri: this.state.base64Data
            }}
          />
        )
      }
    }
    var renderSubCats = () => {
      if(this.state.subCats.length > 0) {
        return (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: GLOBALS.grey,
              paddingVertical: 15,
              paddingLeft: 20,
              height: 100
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1
              }}
              contentContainerStyle={{
                padding: 5
              }}
              >
              {
                this.state.subCats.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => Actions.subCats({subCats: this.state.subCats, onFinished: this.onFinished})}
                      key={`${item}-${index}`}
                      style={styles.subCat}>
                      <Text style={styles.subCatText} key={`${item}-${index}`}>{item}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
        )
      } else {
        return (
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPress={() => {
              Actions.subCats({onFinished: this.onFinished})
            }}
            >
            <View style={{
                borderBottomWidth: 1,
                borderColor: GLOBALS.grey,
                paddingVertical: 15,
                marginLeft: 20,
              }}>
              <Text style={{
                  color: GLOBALS.secondaryTextColor,
                  fontFamily: 'HelveticaNeue'
                }}>
                Add Tags
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )
      }
    }

    return (
      <SafeAreaView>
        <CloseButton
          onPress={() =>  this.props.navigation.goBack()}
          />
        <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}>
          <View style={{
              flex: 1,
              alignItems: 'flex-end'
            }}>
            <TouchableOpacity
              onPress={() => {
                CropImg.openPicker({
                  width: GLOBALS.evtPosterHeight,
                  height: GLOBALS.evtPosterWidth,
                  cropping: true,
                  includeBase64: true,
                  compressImageQuality: 1
                })
                .then(image => {
                  this.setState({
                    base64Data: `data:${image.mime};base64,${image.data}`
                  });
                });
              }}
              style={[styles.thumbnail, {
                marginHorizontal: 20
              }]}
              >
              {renderThumbnail()}
              <View style={[styles.thumbnail,{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  opacity: (this.state.base64Data.length > 1) ? 0 : 1
                }]}>
                <MaterialIcons
                  name={'add-a-photo'}
                  size={35}
                  color={GLOBALS.grey}
                  />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput

          placeholder={'Title'}
          maxLength={200}
          style={styles.textInput}
          placeholderTextColor={GLOBALS.secondaryTextColor}
          onChangeText={(title) => {
            this.setState({title})
            this.validate()
          }}
          autoCorrect={false}
          selectionColor={GLOBALS.white}
          clearButtonMode={'while-editing'}
          multiline={false}
          ref={ input => {
            this.inputs['title'] = input;
          }}
          returnKeyType={ "next" }
          onSubmitEditing={() => this.inputs['desc'].focus()}
          />
        <TextInput

          placeholder={'Add a description'}
          maxLength={200}
          style={styles.textInput}
          placeholderTextColor={GLOBALS.secondaryTextColor}
          onChangeText={(desc) => {
            this.setState({desc})
            this.validate()
          }}
          autoCorrect={false}
          selectionColor={GLOBALS.white}
          clearButtonMode={'while-editing'}
          multiline
          ref={ input => {
            this.inputs['desc'] = input;
          }}
          returnKeyType={ "next" }
          />
        <View style={styles.rulesContainer}>
          {
            this.state.rules.map((item, index) => {
              return (
                <View style={styles.rule}>
                  <Text style={styles.ruleNumText}>
                    {index + 1}.
                  </Text>
                  <TextInput
                    key={index}

                    placeholder={'New Rule'}
                    maxLength={200}
                    style={styles.indivRuleInput}
                    placeholderTextColor={GLOBALS.secondaryTextColor}
                    onChangeText={(text) => {
                      let rules = [...this.state.rules];
                      rules[index] = text
                      this.setState({ rules });
                    }}
                    onSubmitEditing={(text) => {
                      this.setState({
                        rules: this.state.rules.concat([{ text }])
                      });
                      let key = 'rule'+((index + 2).toString())
                      this.queueFocus = key
                    }}
                    blurOnSubmit={false}
                    autoCorrect={false}
                    selectionColor={GLOBALS.white}
                    clearButtonMode={'while-editing'}
                    multiline={false}
                    ref={ input => {
                      this.inputs[`rule${index + 1}`] = input;
                    }}
                    />
                  <TouchableWithoutFeedback
                    delayPressIn={0}
                    onPress={() => {
                      if ((index !== -1) && (this.state.rules.length > 1)) {
                        var rules = [...this.state.rules]
                        rules.splice(index, 1);
                        this.setState({rules: []});
                        this.setState({rules: rules});
                      }
                    }}
                    >
                    <View
                      style={{
                        flex: .1,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      >
                      <AntDesign
                        name={'minuscircle'}
                        size={25}
                        color={GLOBALS.red}
                        style={{
                          opacity: (this.state.rules.length > 1) ? 1 : 0
                        }}
                        />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )
            })
          }
        </View>
        {renderSubCats()}
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 50
          }}>
          <TouchableOpacity
            onPress={() => this.setState({subType: 'IMG'})}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Entypo
              name={'camera'}
              size={30}
              color={(this.state.subType == 'IMG') ? GLOBALS.secondaryColor : GLOBALS.secondaryTextColor}
              />
            <Text style={{
                color: (this.state.subType == 'IMG') ? GLOBALS.secondaryColor : GLOBALS.secondaryTextColor,
                fontFamily: 'HelveticaNeue-Medium'
              }}>
              Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({subType: 'VID'})}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Entypo
              name={'video-camera'}
              size={30}
              color={(this.state.subType == 'VID') ? GLOBALS.secondaryColor : GLOBALS.secondaryTextColor}
              />
            <Text style={{
                color: (this.state.subType == 'VID') ? GLOBALS.secondaryColor : GLOBALS.secondaryTextColor,
                fontFamily: 'HelveticaNeue-Medium'
              }}>
              Video
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: GLOBALS.grey,
    width: Dimensions.get('screen').width,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 20,
    color: GLOBALS.white
  },
  indivRuleInput: {
    flex: 1,
    color: GLOBALS.white,
    paddingVertical: 5
  },
  rule: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  ruleNumText: {
    color: GLOBALS.secondaryTextColor,
    flex: .075
  },
  rulesContainer: {
    borderBottomWidth: 1,
    borderColor: GLOBALS.grey,
    padding: 10,
    paddingVertical: 5
  },
  thumbnail: {
    borderRadius: 10,
    height: 75,
    width: 75,
    backgroundColor: '#454545'
  },
  subCat: {
    backgroundColor: GLOBALS.grey,
    borderRadius: 10,
    padding: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCatText: {
    fontFamily: 'HelveticaNeue-Bold',
    color: GLOBALS.secondaryTextColor,
    fontSize: 16
  },
});